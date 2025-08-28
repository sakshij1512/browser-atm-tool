// server/src/services/runner.js
import { chromium } from "playwright";
import { SELECTORS, PLATFORM_SIGNATURES } from "../../platform.js";

const TIMEOUT = 5000;

// Build scope locators from container selectors (or default to page)
async function buildScopes(page, containerSelectors = []) {
  const scopes = [];
  for (const sel of containerSelectors) {
    const loc = page.locator(sel).first();
    try {
      if ((await loc.count()) > 0) scopes.push(loc);
    } catch {}
  }
  // always include page as the last fallback scope
  scopes.push(page);
  return scopes;
}

// Find the first locator that exists/visible among selectors within scopes
async function findFirst(page, selectors, scopes) {
  if (!selectors || selectors.length === 0) return null;
  for (const scope of scopes) {
    for (const sel of selectors) {
      const loc = (scope === page ? page : scope).locator(sel).first();
      try {
        const count = await loc.count();
        if (count > 0) {
          // try to ensure it’s visible, but don't fail if it isn't
          await loc.waitFor({ state: "visible", timeout: 2500 }).catch(() => {});
          return { locator: loc, selector: sel };
        }
      } catch {}
    }
  }
  return null;
}

// Quick platform detection from HTML
async function detectPlatform(page) {
  const html = await page.content();
  for (const [name, sigs] of Object.entries(PLATFORM_SIGNATURES)) {
    if (sigs.some((r) => r.test(html))) return name;
  }
  // hostname hints
  const host = new URL(page.url()).hostname;
  if (/myshopify\.com/i.test(host)) return "shopify";
  if (/bigcommerce\.com/i.test(host)) return "bigcommerce";
  return "commonFallback";
}

// Try JSON-LD Product fallback
async function jsonLdProduct(page) {
  try {
    const payloads = await page.$$eval('script[type="application/ld+json"]', (nodes) =>
      nodes
        .map((n) => {
          try {
            return JSON.parse(n.textContent || "null");
          } catch {
            return null;
          }
        })
        .filter(Boolean)
    );

    const flat = [];
    const flatten = (x) => {
      if (!x) return;
      if (Array.isArray(x)) x.forEach(flatten);
      else {
        flat.push(x);
        for (const v of Object.values(x)) if (v && typeof v === "object") flatten(v);
      }
    };
    flatten(payloads);

    const prod =
      flat.find((o) => /product/i.test(o?.["@type"])) ||
      flat.find((o) => /product/i.test(o?.type));

    if (!prod) return null;

    const price =
      prod?.offers?.price ||
      prod?.offers?.lowPrice ||
      prod?.offers?.highPrice ||
      prod?.offers?.priceSpecification?.price;

    return {
      name: prod?.name || null,
      price: price ? String(price) : null,
    };
  } catch {
    return null;
  }
}

export async function runTest({ url, platform = "auto", clickIntoCategory = true }) {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const findings = [];
  const errors = { consoleCount: 0, networkFailures: 0 };

  page.on("pageerror", (err) => {
    errors.consoleCount++;
    findings.push({
      type: "console",
      severity: "error",
      message: err.message,
      meta: { stack: String(err.stack || "") },
    });
  });

  page.on("console", (msg) => {
    if (msg.type() === "error") {
      errors.consoleCount++;
      findings.push({ type: "console", severity: "error", message: msg.text() });
    }
  });

  page.on("requestfailed", (req) => {
    errors.networkFailures++;
    findings.push({
      type: "network",
      severity: "warn",
      message: `Request failed: ${req.url()}`,
      meta: { method: req.method(), failure: req.failure() },
    });
  });

  const summary = {
    productChecks: { titleFound: false, priceFound: false, addToCartFound: false },
    images: { total: 0, loaded: 0, broken: 0, brokenSamples: [] },
    errors,
    matched: { title: null, price: null, addToCart: null, values: {} },
  };

  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
    await page.waitForLoadState("networkidle", { timeout: TIMEOUT }).catch(() => {});

    if (platform === "auto") platform = await detectPlatform(page);
    const cfg = SELECTORS[platform] || SELECTORS.commonFallback;

    // Accept common cookie banners if present (best effort)
    await page
      .locator(
        [
          "button:has-text('Accept')",
          "button:has-text('I agree')",
          "button:has-text('Allow all')",
        ].join(", ")
      )
      .first()
      .click({ timeout: 1500 })
      .catch(() => {});

    // Build scopes for targeted querying
    const scopes = await buildScopes(page, cfg.container || []);

    // Heuristic: decide if we're on a product page
    const productTitleProbe =
      (await page.locator((cfg.title || []).join(",")).count().catch(() => 0)) > 0;

    if (!productTitleProbe && cfg.categoryTitle && clickIntoCategory) {
      // likely a category page: click first product and navigate
      const catLink = await findFirst(page, cfg.categoryTitle, scopes);
      if (catLink) {
        await Promise.all([
          page.waitForLoadState("domcontentloaded"),
          catLink.locator.click({ timeout: 4000 }),
        ]).catch(() => {});
        await page.waitForLoadState("networkidle", { timeout: TIMEOUT }).catch(() => {});
      }
    }

    // Rebuild scopes after navigation (if any)
    const scopes2 = await buildScopes(page, cfg.container || []);

    // --- Title
    const titleMatch = await findFirst(page, cfg.title || SELECTORS.commonFallback.title, scopes2);
    if (titleMatch) {
      summary.productChecks.titleFound = true;
      summary.matched.title = titleMatch.selector;
      try {
        summary.matched.values.title = (await titleMatch.locator.innerText()).trim();
      } catch {}
    }

    // --- Price
    const priceMatch = await findFirst(page, cfg.price || SELECTORS.commonFallback.price, scopes2);
    if (priceMatch) {
      summary.productChecks.priceFound = true;
      summary.matched.price = priceMatch.selector;
      try {
        summary.matched.values.price = (await priceMatch.locator.innerText()).trim();
      } catch {}
    }

    // --- Add to Cart
    const atcMatch = await findFirst(
      page,
      cfg.addToCart || SELECTORS.commonFallback.addToCart,
      scopes2
    );
    if (atcMatch) {
      summary.productChecks.addToCartFound = true;
      summary.matched.addToCart = atcMatch.selector;
    }

    // --- JSON-LD fallback if title/price missing
    if (!summary.productChecks.titleFound || !summary.productChecks.priceFound) {
      const ld = await jsonLdProduct(page);
      if (ld) {
        if (!summary.productChecks.titleFound && ld.name) {
          summary.productChecks.titleFound = true;
          summary.matched.title = "jsonld:@type=Product.name";
          summary.matched.values.title = ld.name;
        }
        if (!summary.productChecks.priceFound && ld.price) {
          summary.productChecks.priceFound = true;
          summary.matched.price = "jsonld:@type=Product.offers.price";
          summary.matched.values.price = ld.price;
        }
      }
    }

    // --- Images
    const imgs = page.locator("img");
    summary.images.total = await imgs.count();
    for (let i = 0; i < summary.images.total; i++) {
      const img = imgs.nth(i);
      const ok = await img
        .evaluate((el) => el.complete && Number(el.naturalWidth) > 0)
        .catch(() => false);
      if (ok) summary.images.loaded++;
      else {
        summary.images.broken++;
        const src = (await img.getAttribute("src").catch(() => null)) || "";
        if (src && summary.images.brokenSamples.length < 5) {
          summary.images.brokenSamples.push(src);
        }
      }
    }
  } catch (err) {
    findings.push({ type: "exception", severity: "fatal", message: String(err) });
  } finally {
    await browser.close();
  }

  return { summary, findings, platformUsed: platform, urlTested: url };
}

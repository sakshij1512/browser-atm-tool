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
  scopes.push(page); // fallback
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
          await loc.waitFor({ state: "visible", timeout: 1000 }).catch(() => {});
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
  const host = new URL(page.url()).hostname;
  if (/myshopify\.com/i.test(host)) return "shopify";
  if (/bigcommerce\.com/i.test(host)) return "bigcommerce";
  return "commonFallback";
}

// JSON-LD Product fallback
async function jsonLdProduct(page) {
  try {
    const payloads = await page.$$eval(
      'script[type="application/ld+json"]',
      (nodes) =>
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

  // Console & network error tracking
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
    productChecks: {
      titleFound: false,
      priceFound: false,
      addToCartFound: false,
      descriptionFound: false,
      variantsFound: false,
      availabilityFound: false,
      metaTitleFound: false,
      metaDescriptionFound: false,
    },
    images: {
      total: 0,
      loaded: 0,
      broken: 0,
      brokenSamples: [],
      altMissing: 0,
      invalidDimensions: 0,
    },
    errors,
    matched: {
      title: null,
      price: null,
      addToCart: null,
      description: null,
      variants: [],
      availability: null,
      values: {},
    },
  };

  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 15000 });
    // wait for a key element instead of networkidle
    await page.waitForSelector("h1, title", { timeout: 3000 }).catch(() => {});

    if (platform === "auto") platform = await detectPlatform(page);
    const cfg = SELECTORS[platform] || SELECTORS.commonFallback;

    // Accept cookie banners quickly
    await page
      .locator(["button:has-text('Accept')", "button:has-text('I agree')", "button:has-text('Allow all')"].join(","))
      .first()
      .click({ timeout: 500 })
      .catch(() => {});

    const scopes = await buildScopes(page, cfg.container || []);

    // Product page navigation (category -> product)
    const productTitleProbe = (await page.locator((cfg.title || []).join(",")).count().catch(() => 0)) > 0;
    if (!productTitleProbe && cfg.categoryTitle && clickIntoCategory) {
      const catLink = await findFirst(page, cfg.categoryTitle, scopes);
      if (catLink) {
        await Promise.all([
          page.waitForLoadState("domcontentloaded"),
          catLink.locator.click({ timeout: 2000 }),
        ]).catch(() => {});
        await page.waitForSelector(cfg.title?.[0] || "h1", { timeout: 3000 }).catch(() => {});
      }
    }

    // --- Core product info checks in parallel
    const scopes2 = scopes;
    const [titleMatch, priceMatch, atcMatch, descMatch] = await Promise.all([
      findFirst(page, cfg.title || SELECTORS.commonFallback.title, scopes2),
      findFirst(page, cfg.price || SELECTORS.commonFallback.price, scopes2),
      findFirst(page, cfg.addToCart || SELECTORS.commonFallback.addToCart, scopes2),
      findFirst(page, cfg.description || SELECTORS.commonFallback.description, scopes2),
    ]);

    if (titleMatch) {
      summary.productChecks.titleFound = true;
      summary.matched.title = titleMatch.selector;
      summary.matched.values.title = (await titleMatch.locator.innerText().catch(() => "")).trim();
    }
    if (priceMatch) {
      summary.productChecks.priceFound = true;
      summary.matched.price = priceMatch.selector;
      summary.matched.values.price = (await priceMatch.locator.innerText().catch(() => "")).trim();
    }
    if (atcMatch) {
      summary.productChecks.addToCartFound = true;
      summary.matched.addToCart = atcMatch.selector;
    }
    if (descMatch) {
      summary.productChecks.descriptionFound = true;
      summary.matched.description = descMatch.selector;
      summary.matched.values.description = (await descMatch.locator.innerText().catch(() => "")).trim();
    }

    // --- Variants
    summary.matched.variants = [];
    const variantSelectors = cfg.variants || ["select"];
    for (const sel of variantSelectors) {
      const variantElems = await page.locator(sel).elementHandles();
      if (variantElems.length > 0) {
        summary.productChecks.variantsFound = true;
        for (const ve of variantElems) {
          const options = await ve.evaluate((el) => Array.from(el.options || []).map((o) => o.textContent.trim()));
          summary.matched.variants.push({ selector: sel, options });
        }
        break;
      }
    }

    // --- Availability
    const availMatch = await findFirst(page, cfg.availability || ["availability"], scopes2);
    if (availMatch) {
      summary.productChecks.availabilityFound = true;
      summary.matched.availability = availMatch.selector;
      summary.matched.values.availability = (await availMatch.locator.innerText().catch(() => "")).trim();
    }

    // --- Meta info
    summary.matched.values.metaTitle = await page.title().catch(() => "");
    if (summary.matched.values.metaTitle) summary.productChecks.metaTitleFound = true;
    const metaDesc = await page
      .$eval("head > meta[name='description']", (el) => el.getAttribute("content"))
      .catch(() => null);
    if (metaDesc) {
      summary.productChecks.metaDescriptionFound = true;
      summary.matched.values.metaDescription = metaDesc.trim();
    }

    // --- JSON-LD fallback
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

    // --- Images (capped to 50 for performance)
    const imgs = page.locator("img");
    summary.images.total = await imgs.count();
    const maxImages = Math.min(summary.images.total, 50);

    for (let i = 0; i < maxImages; i++) {
      const img = imgs.nth(i);
      const ok = await img.evaluate((el) => el.complete && el.naturalWidth > 0).catch(() => false);
      if (ok) summary.images.loaded++;
      else {
        summary.images.broken++;
        const src = (await img.getAttribute("src").catch(() => null)) || "";
        if (src && summary.images.brokenSamples.length < 5) summary.images.brokenSamples.push(src);
      }

      const alt = (await img.getAttribute("alt").catch(() => null)) || "";
      if (!alt) summary.images.altMissing++;

      const dims = await img.evaluate((el) => ({ w: el.naturalWidth, h: el.naturalHeight })).catch(() => ({ w: 0, h: 0 }));
      if (!dims.w || !dims.h) summary.images.invalidDimensions++;
    }
  } catch (err) {
    findings.push({ type: "exception", severity: "fatal", message: String(err) });
  } finally {
    await browser.close();
  }

  return { summary, findings, platformUsed: platform, urlTested: url };
}

# 🛠️ Browser ATM Tool

A developer utility to **test eCommerce product pages automatically**.  
It checks for:

- ✅ Product **Title**  
- ✅ Product **Price**  
- ✅ **Add to Cart** button  
- 🖼️ Image validation (detects broken ones)  
- ⚠️ Console errors & network failures  

Supports **BigCommerce**, **Shopify**, and common fallback selectors.

---

## 🚀 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/your-username/browser-atm-tool.git
cd browser-atm-tool


▶️ Running the Tool
Start backend server (Nodejs)

From server/:
node server.js
Runs on http://localhost:4000
 by default.


Start frontend client (React + Vite)

From client/:
npm run dev
Runs on http://localhost:5173


How to use?
1.Open http://localhost:5173 in your browser.
2.Enter a product page URL (Shopify / BigCommerce / other). Ex: "https://cornerstone-light-demo.mybigcommerce.com/scrub-brush/"
3.Click Run Test.

Results are shown in JSON format, for example:

{
  "summary": {
    "productChecks": {
      "titleFound": true,
      "priceFound": true,
      "addToCartFound": true
    },
    "images": {
      "total": 6,
      "loaded": 6,
      "broken": 0,
      "brokenSamples": []
    },
    "errors": {
      "consoleCount": 0,
      "networkFailures": 0
    }
  },
  "findings": [],
  "platformUsed": "bigcommerce",
  "urlTested": "https://cornerstone-light-demo.mybigcommerce.com/scrub-brush/"
}

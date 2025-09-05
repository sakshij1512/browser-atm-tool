export const SELECTORS = {
  bigcommerce: {
    title: [
      "h1.productView-title",
      "h1.product-title",
      "script[type='application/ld+json']::jsonld:@type=Product.name"
    ],
    price: [
      ".price-section .price",
      ".productView-price .price",
      "script[type='application/ld+json']::jsonld:@type=Product.offers.price"
    ],
    description: [
      ".productView-description",
      ".product-description",
      ".product-single__description"
    ],
    addToCart: [
      "button[data-button-type='add-to-cart']",
      "button.add-to-cart",
      "form[action*='cart'] [type='submit']"
    ],
    variants: ["select[name*='option']", ".product-variants select"],
    availability: [".product-availability", ".stock-status"]
  },
  shopify: {
    title: [
      "h1.product-single__title",
      ".product__title",
      "script[type='application/ld+json']::jsonld:@type=Product.name"
    ],
    price: [
      ".product__price",
      ".price-item",
      "p.js-variants-price",
      "script[type='application/ld+json']::jsonld:@type=Product.offers.price"
    ],
    description: [
      ".product-single__description",
      ".product-description",
      ".product__description"
    ],
    addToCart: [
      "form[action*='cart'] [type='submit']",
      "button[name='add']",
      "button:has-text('Add to Cart')"
    ],
    variants: ["select[name*='option']", ".product-variants select"],
    availability: [".product-availability", ".stock-status"]
  },
  commonFallback: {
    title: ["h1", "h2"],
    price: [".price", "[class*='Price']"],
    addToCart: ["button[type='submit']", "button:has-text('Add to Cart')"],
    description: ["p", ".description"],
    variants: ["select"],
    availability: [".availability"]
  }
};

export const PLATFORM_SIGNATURES = {
  shopify: [/cdn\.shopify\.com/, /Shopify.theme/],
  bigcommerce: [/cdn\d*\.bigcommerce\.com/, /bigcommerce/]
};

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
    addToCart: [
      "button[data-button-type='add-to-cart']",
      "button.add-to-cart",
      "form[action*='cart'] [type='submit']"
    ]
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
      "script[type='application/ld+json']::jsonld:@type=Product.offers.price"
    ],
    addToCart: [
      "form[action*='cart'] [type='submit']",
      "button[name='add']",
      "button:has-text('Add to Cart')"
    ]
  },
  commonFallback: {
    title: ["h1", "h2"],
    price: [".price", "[class*='Price']"],
    addToCart: ["button[type='submit']", "button:has-text('Add to Cart')"]
  }
};

export const PLATFORM_SIGNATURES = {
  shopify: [/cdn\.shopify\.com/, /Shopify.theme/],
  bigcommerce: [/cdn\d*\.bigcommerce\.com/, /bigcommerce/]
};

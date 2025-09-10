export const SELECTORS = {
  bigcommerce: {
    title: [
      "h1.productView-title",
      "h1.product-title",
      ".product-title h1",
      "h1[data-test-info-type='productTitle']",
      ".productView-title",
      ".product-single__title",
      "h1[itemprop='name']",
      "script[type='application/ld+json']::jsonld:name"
    ],
    price: [
      ".price-section .price",
      ".productView-price .price",
      ".product-price .price",
      "[data-test-info-type='price']",
      ".price--withTax",
      ".price--withoutTax",
      ".productView-price .price-item",
      ".price-item--sale",
      ".price-item--regular",
      "[data-price]",
      "[itemprop='price']",
      ".money",
      "script[type='application/ld+json']::jsonld:offers.0.price"
    ],
    description: [
      ".productView-description",
      ".product-description",
      ".product-single__description",
      "[data-test-info-type='description']",
      ".productView-info-section .productView-description",
      "[itemprop='description']",
      ".product-details",
      ".tab-content .tab-pane"
    ],
    addToCart: [
      "button[data-button-type='add-to-cart']",
      "button.add-to-cart",
      "form[action*='cart'] [type='submit']",
      "[data-test-info-type='add-to-cart']",
      ".productView-options .form-action button[type='submit']",
      "input[value*='Add to Cart']",
      "button[data-add-to-cart]"
    ],
    variants: [
      "select[name*='option']",
      "select[name*='attribute']",
      "select[data-product-attribute]",
      ".product-variants select",
      ".productView-options select",
      ".form-field select[data-product-attribute]",
      "input[name*='option'][type='radio']",
      "input[name*='attribute'][type='radio']",
      ".productView-options input[type='radio']",
      ".swatch-wrap input",
      ".form-field--swatch input",
      ".color-swatch",
      ".size-swatch",
      ".product-options",
      ".productView-options"
    ],
    availability: [
      ".product-availability",
      ".stock-status",
      ".productView-info .availability",
      "[data-test-info-type='stock']",
      ".inventory-status",
      ".availability-msg",
      ".product-out-of-stock",
      ".product-in-stock",
      ".alert-success",
      ".alert-warning",
      ".alert-danger",
      ".inventory-message"
    ]
  },
  shopify: {
    title: [
      "h1.product-single__title",
      ".product__title",
      "h1.product__title",
      ".product-title h1",
      ".product-form__title",
      "h1[data-product-title]",
      "[itemprop='name']",
      ".product-meta__title",
      "script[type='application/ld+json']::jsonld:name"
    ],
    price: [
      ".product__price",
      ".price-item",
      "p.js-variants-price",
      ".product-form__price",
      ".product__price-wrap .price",
      ".price__current",
      ".product-price .money",
      "[data-price]",
      ".money",
      "[itemprop='price']",
      ".price__sale",
      ".price__regular",
      "script[type='application/ld+json']::jsonld:offers.0.price"
    ],
    description: [
      ".product-single__description",
      ".product-description",
      ".product__description",
      ".product-form__description",
      ".rte",
      "[data-product-description]",
      "[itemprop='description']",
      ".product-content",
      ".product__text"
    ],
    addToCart: [
      "form[action*='cart'] [type='submit']",
      "button[name='add']",
      ".product-form__cart-submit",
      "[data-add-to-cart]",
      ".btn.product-form__cart-submit",
      ".product-form button[type='submit']",
      "input[value*='Add to Cart']",
      ".shopify-payment-button"
    ],
    variants: [
      "select[name*='option']",
      "select[name*='id']",
      "select[data-index]",
      ".product-variants select",
      ".product-form__variants select",
      ".selector-wrapper select",
      ".single-option-selector",
      "input[name*='option'][type='radio']",
      ".product-form__variants input[type='radio']",
      ".variant-input input[type='radio']",
      ".swatch input",
      "[data-variant-input]",
      ".color-swatch",
      ".size-swatch",
      ".variant-swatch",
      ".product-variants",
      ".product-form__variants"
    ],
    availability: [
      ".product-availability",
      ".stock-status",
      ".product-form__inventory",
      ".inventory__text",
      ".product__availability",
      "[data-product-availability]",
      ".availability-status",
      ".stock-level",
      ".product-inventory",
      ".out-of-stock-message",
      ".low-stock-message",
      ".in-stock-message",
      ".product-form__error-message-wrapper",
      ".errors"
    ]
  },
  woocommerce: {
    title: [
      ".product_title",
      "h1.entry-title",
      ".summary .product_title",
      "[itemprop='name']",
      ".woocommerce-product-title"
    ],
    price: [
      ".price",
      ".woocommerce-price-amount",
      ".summary .price",
      "[itemprop='price']",
      ".amount",
      ".money"
    ],
    description: [
      ".woocommerce-product-details__short-description",
      "#tab-description",
      ".product-short-description",
      "[itemprop='description']",
      ".product-description"
    ],
    addToCart: [
      ".single_add_to_cart_button",
      "button[name='add-to-cart']",
      ".cart button[type='submit']",
      "input[value*='Add to Cart']"
    ],
    variants: [
      ".variations select",
      ".variation-selector select",
      ".variations input[type='radio']",
      "table.variations select",
      ".variations td select",
      ".woocommerce-variation-selection select",
      ".product-attributes select"
    ],
    availability: [
      ".stock",
      ".in-stock",
      ".out-of-stock",
      ".availability",
      ".woocommerce-stock-status",
      ".stock-status"
    ]
  },
  magento: {
    title: [
      ".page-title-wrapper h1",
      ".product-info-main .page-title",
      "h1.page-title",
      "[data-ui-id='page-title-wrapper']",
      "[itemprop='name']"
    ],
    price: [
      ".price-box .price",
      ".product-info-price .price",
      "[data-price-type='finalPrice']",
      ".price-wrapper .price",
      "[itemprop='price']",
      ".money",
      "sale-price"
    ],
    description: [
      ".product-info-main .product-info-description",
      ".product.attribute.overview",
      "[itemprop='description']",
      ".product-description"
    ],
    addToCart: [
      "#product-addtocart-button",
      ".action.tocart.primary",
      "button[title='Add to Cart']",
      ".box-tocart button"
    ],
    variants: [
      ".product-options-wrapper select",
      ".swatch-attribute select",
      ".field.configurable select",
      ".swatch-option",
      ".configurable-swatch"
    ],
    availability: [
      ".stock.available",
      ".stock.unavailable",
      ".availability",
      ".product-info-stock-sku .stock"
    ]
  },
  commonFallback: {
    title: [
      "h1",
      "h2",
      "[class*='title' i]",
      "[class*='Title']",
      "[data-testid*='title' i]",
      "[itemprop='name']",
      ".product-name",
      ".item-title",
      ".entry-title",
      "span"
    ],
    price: [
      "[class*='price' i]",
      "[class*='Price']",
      "[data-testid*='price' i]",
      "[data-price]",
      "[itemprop='price']",
      ".cost",
      ".amount",
      ".money",
      ".sale-price",
      ".regular-price",
      ".compare-price",
      "$[0-9]"
    ],
    addToCart: [
      "button[type='submit']",
      "[class*='add-to-cart' i]",
      "[class*='addToCart']",
      "[class*='add-cart' i]",
      "[data-add-to-cart]",
      "button[title*='Add to Cart' i]",
      "input[value*='Add to Cart' i]",
      "a[href*='cart']"
    ],
    description: [
      "p",
      ".description",
      "[class*='description' i]",
      "[class*='Description']",
      ".content",
      ".details",
      "[itemprop='description']",
      ".product-details",
      ".product-info"
    ],
    variants: [
      "select",
      "input[type='radio']",
      "[class*='variant' i]",
      "[class*='option' i]",
      "[class*='selector' i]",
      "[data-variant]",
      "[class*='swatch' i]",
      "[class*='color' i]",
      "[class*='size' i]",
      ".dropdown"
    ],
    availability: [
      "[class*='availability' i]",
      "[class*='stock' i]",
      "[class*='Stock']",
      ".in-stock",
      ".out-of-stock",
      "[data-stock]",
      "[class*='inventory' i]",
      ".available",
      ".unavailable"
    ]
  }
};

export const PLATFORM_SIGNATURES = {
  shopify: [
    /cdn\.shopify\.com/,
    /Shopify\.theme/,
    /shop\.js/,
    /shopify-features/,
    /assets\.shopify/,
    /shopify-payment/
  ],
  bigcommerce: [
    /cdn\d*\.bigcommerce\.com/,
    /bigcommerce/,
    /stencil/,
    /bc-sf-filter/,
    /bigcommerce-api/
  ],
  woocommerce: [
    /wp-content/,
    /woocommerce/,
    /wp-includes/,
    /wp-json.*wc/,
    /wc-ajax/
  ],
  magento: [
    /magento/,
    /mage/,
    /static\/version/,
    /pub\/static/,
    /requirejs-config/
  ]
};

// Enhanced element finder with improved logic
export const findElement = (selectors, context = document, debug = false) => {
  const results = [];
  
  for (const selector of selectors) {
    try {
      let elements = [];
      
      // Handle JSON-LD selectors
      if (selector.includes('::jsonld:')) {
        const [scriptSelector, jsonPath] = selector.split('::jsonld:');
        const scripts = context.querySelectorAll(scriptSelector);
        for (const script of scripts) {
          try {
            const data = JSON.parse(script.textContent);
            const value = getNestedValue(data, jsonPath);
            if (value) {
              elements.push({ element: script, value, selector });
            }
          } catch (e) {
            continue;
          }
        }
      }
      // Handle regex selectors (for price patterns)
      else if (selector.startsWith('$[')) {
        const priceRegex = /\$[\d,]+\.?\d*/g;
        const textElements = context.querySelectorAll('*');
        for (const el of textElements) {
          if (el.children.length === 0 && priceRegex.test(el.textContent)) {
            elements.push(el);
          }
        }
      }
      // Handle text content selectors with case insensitive matching
      else if (selector.includes(':has-text(') || selector.includes(':contains(')) {
        const textMatch = selector.match(/:(?:has-text|contains)\(['"]?([^'"]*?)['"]?\)/i);
        if (textMatch) {
          const baseSelector = selector.split(':')[0];
          const searchText = textMatch[1].toLowerCase();
          const candidateElements = context.querySelectorAll(baseSelector);
          
          for (const el of candidateElements) {
            if (el.textContent.toLowerCase().includes(searchText)) {
              elements.push(el);
            }
          }
        }
      }
      // Handle case-insensitive attribute selectors
      else if (selector.includes(' i]')) {
        const modifiedSelector = selector.replace(' i]', ']');
        const attributeMatch = selector.match(/\[([^*=]+)\*?=['"]?([^'"]*?)['"]?\s+i\]/);
        
        if (attributeMatch) {
          const [, attr, value] = attributeMatch;
          const allElements = context.querySelectorAll('*');
          
          for (const el of allElements) {
            const attrValue = el.getAttribute(attr) || '';
            if (attrValue.toLowerCase().includes(value.toLowerCase())) {
              elements.push(el);
            }
          }
        }
      }
      // Regular selectors with error handling
      else {
        try {
          const found = context.querySelectorAll(selector);
          elements.push(...found);
        } catch (e) {
          // Selector might be invalid, skip it
          continue;
        }
      }
      
      // Filter out elements that are likely not visible or relevant
      elements = elements.filter(el => {
        if (el.element) el = el.element; // Handle JSON-LD results
        return el && 
               el.offsetParent !== null && // Element is visible
               !el.hidden &&
               el.style.display !== 'none' &&
               el.style.visibility !== 'hidden';
      });
      
      if (elements.length > 0) {
        results.push({ selector, elements, count: elements.length });
        if (!debug) {
          return elements[0].element || elements[0]; // Return first match
        }
      }
    } catch (e) {
      if (debug) {
        console.warn(`Selector failed: ${selector}`, e);
      }
    }
  }
  
  return debug ? results : null;
};

// Enhanced platform detection
export const detectPlatform = (html = document.documentElement.outerHTML) => {
  const scores = {};
  
  // Check each platform signature
  Object.entries(PLATFORM_SIGNATURES).forEach(([platform, signatures]) => {
    scores[platform] = 0;
    signatures.forEach(signature => {
      if (signature.test(html)) {
        scores[platform]++;
      }
    });
  });
  
  // Find platform with highest score
  const detectedPlatform = Object.entries(scores)
    .sort(([,a], [,b]) => b - a)[0];
  
  return detectedPlatform[1] > 0 ? detectedPlatform[0] : 'commonFallback';
};

// Smart element finder that tries multiple strategies
export const findProductElement = (elementType, platform = 'auto') => {
  if (platform === 'auto') {
    platform = detectPlatform();
  }
  
  // Try platform-specific selectors first
  let selectors = SELECTORS[platform]?.[elementType] || [];
  
  // Add common fallback selectors
  if (SELECTORS.commonFallback[elementType]) {
    selectors = [...selectors, ...SELECTORS.commonFallback[elementType]];
  }
  
  const element = findElement(selectors);
  
  if (element) {
    return {
      element,
      platform,
      found: true,
      text: element.textContent?.trim() || '',
      value: element.value || element.getAttribute('data-price') || element.textContent?.trim()
    };
  }
  
  // Fallback: use intelligent scanning
  return intelligentScan(elementType);
};

// Intelligent scanning for elements when selectors fail
export const intelligentScan = (elementType) => {
  const strategies = {
    title: () => {
      // Look for the most prominent heading
      const headings = ['h1', 'h2', 'h3'].flatMap(tag => 
        Array.from(document.querySelectorAll(tag))
      );
      
      return headings
        .filter(h => h.offsetParent !== null)
        .sort((a, b) => {
          // Prioritize by tag importance and position
          const tagPriority = { h1: 3, h2: 2, h3: 1 };
          const aRect = a.getBoundingClientRect();
          const bRect = b.getBoundingClientRect();
          
          return (tagPriority[b.tagName.toLowerCase()] || 0) - (tagPriority[a.tagName.toLowerCase()] || 0) ||
                 aRect.top - bRect.top;
        })[0];
    },
    
    price: () => {
      // Look for price patterns
      const priceRegex = /\$[\d,]+(?:\.[\d]{2})?|\$[\d]+|[\d,]+\.[\d]{2}|[\d]+\.[\d]{2}/;
      const elements = Array.from(document.querySelectorAll('*'));
      
      return elements
        .filter(el => el.children.length === 0 && priceRegex.test(el.textContent))
        .sort((a, b) => {
          // Prefer elements with clear price formatting
          const aMatch = a.textContent.match(/\$[\d,]+(?:\.[\d]{2})?/);
          const bMatch = b.textContent.match(/\$[\d,]+(?:\.[\d]{2})?/);
          return (bMatch ? 1 : 0) - (aMatch ? 1 : 0);
        })[0];
    },
    
    addToCart: () => {
      // Look for buttons with cart-related text
      const buttons = Array.from(document.querySelectorAll('button, input[type="submit"], a'));
      return buttons.find(btn => 
        /add.*cart|buy.*now|purchase|order.*now/i.test(btn.textContent || btn.value || btn.title || btn.getAttribute('aria-label') || '')
      );
    },
    
    variants: () => {
      // Look for form controls that might be variants
      const controls = Array.from(document.querySelectorAll('select, input[type="radio"]'));
      return controls.find(ctrl => {
        const context = ctrl.closest('form, .product, .item');
        return context && /option|variant|size|color|style/i.test(
          ctrl.name || ctrl.id || ctrl.className || 
          (ctrl.closest('label')?.textContent || '') +
          (ctrl.closest('.form-group, .field')?.textContent || '')
        );
      });
    },
    
    availability: () => {
      // Look for stock/availability indicators
      const elements = Array.from(document.querySelectorAll('*'));
      return elements.find(el => 
        /stock|available|inventory|in.*stock|out.*stock|sold.*out/i.test(el.textContent) &&
        el.textContent.length < 100 // Avoid long descriptions
      );
    }
  };
  
  const element = strategies[elementType]?.();
  
  return {
    element: element || null,
    platform: 'intelligent-scan',
    found: !!element,
    text: element?.textContent?.trim() || '',
    value: element?.value || element?.textContent?.trim() || ''
  };
};

// Enhanced debug function
export const debugProductPage = (platform = 'auto') => {
  console.log('🔍 Enhanced debugging of product page elements...');
  
  if (platform === 'auto') {
    platform = detectPlatform();
  }
  
  console.log(`🏪 Detected platform: ${platform}`);
  
  const results = {};
  const elementTypes = ['title', 'price', 'description', 'addToCart', 'variants', 'availability'];
  
  elementTypes.forEach(type => {
    console.log(`\n📋 ${type.toUpperCase()} Detection:`);
    const result = findProductElement(type, platform);
    results[type] = result;
    
    if (result.found) {
      console.log(`✅ Found element:`, result.element);
      console.log(`   Text: "${result.text.substring(0, 100)}..."`);
      console.log(`   Value: "${result.value}"`);
    } else {
      console.log(`❌ No ${type} element found`);
      
      // Suggest potential candidates
      const candidates = scanForElements(type);
      if (candidates.length > 0) {
        console.log(`🔍 Potential candidates found:`, candidates.slice(0, 3));
      }
    }
  });
  
  return results;
};

// Enhanced scanning function
export const scanForElements = (elementType) => {
  const keywords = {
    title: ['title', 'name', 'product', 'item'],
    price: ['price', 'cost', 'amount', 'money', 'dollar', '$'],
    description: ['description', 'detail', 'info', 'about', 'overview'],
    addToCart: ['add', 'cart', 'buy', 'purchase', 'order'],
    variants: ['variant', 'option', 'select', 'color', 'size', 'style', 'choice'],
    availability: ['stock', 'availability', 'inventory', 'available', 'sold', 'out']
  };
  
  const searchWords = keywords[elementType] || [];
  const suggestions = [];
  const allElements = document.querySelectorAll('*');
  
  allElements.forEach(el => {
    if (el.offsetParent === null) return; // Skip hidden elements
    
    const text = el.textContent.toLowerCase();
    const className = (el.className || '').toString().toLowerCase();
    const id = (el.id || '').toLowerCase();
    const tagName = el.tagName.toLowerCase();
    
    // Enhanced relevance scoring
    let score = 0;
    searchWords.forEach(keyword => {
      if (className.includes(keyword)) score += 3;
      if (id.includes(keyword)) score += 3;
      if (text.includes(keyword) && text.length < 200) score += 1;
      if (el.name && el.name.toLowerCase().includes(keyword)) score += 2;
    });
    
    // Bonus points for relevant tags
    const relevantTags = {
      title: ['h1', 'h2', 'h3'],
      price: ['span', 'div', 'p'],
      addToCart: ['button', 'input', 'a'],
      variants: ['select', 'input'],
      availability: ['span', 'div', 'p']
    };
    
    if (relevantTags[elementType]?.includes(tagName)) score += 1;
    
    if (score > 0) {
      suggestions.push({
        element: el,
        selector: generateBetterSelector(el),
        text: el.textContent.trim().substring(0, 50),
        className: el.className,
        tagName: tagName,
        score: score
      });
    }
  });
  
  return suggestions
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);
};

// Generate better selectors
const generateBetterSelector = (el) => {
  if (el.id) return `#${el.id}`;
  
  const classes = (el.className || '').toString().trim().split(/\s+/);
  if (classes.length > 0 && classes[0]) {
    return `.${classes[0]}`;
  }
  
  // Try to create a more specific selector
  const tag = el.tagName.toLowerCase();
  const parent = el.parentElement;
  
  if (parent && parent.className) {
    const parentClass = parent.className.toString().trim().split(/\s+/)[0];
    return `.${parentClass} ${tag}`;
  }
  
  return tag;
};

// Helper function to get nested object values (improved)
const getNestedValue = (obj, path) => {
  try {
    return path.split('.').reduce((current, key) => {
      if (!current) return null;
      
      // Handle array notation like "offers.0.price"
      if (key.includes('[') && key.includes(']')) {
        const [arrayKey, indexStr] = key.split('[');
        const index = parseInt(indexStr.replace(']', ''));
        return current[arrayKey]?.[index];
      }
      
      // Handle direct array access
      if (!isNaN(key)) {
        return current[parseInt(key)];
      }
      
      return current[key];
    }, obj);
  } catch (e) {
    return null;
  }
};

// Export main function for easy use
export const getProductData = (platform = 'auto') => {
  const elementTypes = ['title', 'price', 'description', 'addToCart', 'variants', 'availability'];
  const data = {};
  
  elementTypes.forEach(type => {
    const result = findProductElement(type, platform);
    data[type] = {
      element: result.element,
      text: result.text,
      value: result.value,
      found: result.found
    };
  });
  
  return {
    platform: platform === 'auto' ? detectPlatform() : platform,
    data,
    timestamp: new Date().toISOString()
  };
};
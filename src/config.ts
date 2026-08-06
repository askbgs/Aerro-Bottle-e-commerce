/**
 * ============================================================================
 * CASH-ON-DELIVERY (COD) STORE TEMPLATE CONFIGURATION
 * ============================================================================
 * Beginners: You can customize almost the entire store by changing the variables
 * in this file. No coding knowledge required!
 */

export const STORE_CONFIG = {
  // 1. Basic Store Settings
  STORE_NAME: "Aero Bottle", // Change to: "YOUR STORE NAME"
  
  // 2. Product Information
  PRODUCT_NAME: "Aero Smart Thermos", // Change to: "YOUR PRODUCT NAME"
  PRODUCT_DESCRIPTION: "A premium vacuum-insulated flask featuring a modern minimalist design, a touch-sensitive LED temperature display, and intelligent hydration reminders.", // Change to: "YOUR PRODUCT DESCRIPTION"
  PRODUCT_IMAGE_URL: "/src/assets/images/product_hero_1785975613904.jpg", // Automatically uses the beautiful high-end product mockup generated
  
  // 3. Pricing & Currency
  PRICE_PER_UNIT: 49, // Change to your product price (number)
  CURRENCY: "USD", // Change to your local currency, e.g., "USD", "EUR", "AED"
  CURRENCY_SYMBOL: "$", // E.g., "$", "€", "AED"
  
  // 4. Product Variants (Add as many as you'd like)
  VARIANTS: [
    "Matte Obsidian Black", // Change to: "Variant A"
    "Minimalist Alabaster White", // Change to: "Variant B"
    "Nordic Sage Green" // Change to: "Variant C"
  ],

  // 5. Order Form & Country Settings
  DEFAULT_COUNTRY: "United States", // E.g., "United States", "Saudi Arabia", "Germany"
  COUNTRIES: [
    "United States",
    "Canada",
    "United Kingdom",
    "Australia",
    "Germany",
    "France",
    "United Arab Emirates",
    "Saudi Arabia"
  ],

  // 6. Supabase Credentials
  // This is where your customer orders are instantly saved.
  SUPABASE_URL: "https://ancuzwijqbhqhzwncaqo.supabase.co",
  SUPABASE_PUBLISHABLE_KEY: "sb_publishable_dMnCTpzzdu_UAx3xaN4nKA_r35X1uVH",

  // 7. Benefits Section (Showcased in 3 premium cards)
  BENEFITS: [
    {
      id: "benefit-1",
      title: "Free Express Shipping",
      description: "Enjoy zero delivery fees. Your package is dispatched within 24 hours with premium tracking.",
      icon: "Truck" as const
    },
    {
      id: "benefit-2",
      title: "Cash on Delivery",
      description: "No credit card needed. Pay with complete peace of mind only when the package arrives at your doorstep.",
      icon: "Banknote" as const
    },
    {
      id: "benefit-3",
      title: "100% Satisfaction Guarantee",
      description: "Backed by our 30-day hassle-free return policy. If you don't love it, we will make it right.",
      icon: "ShieldCheck" as const
    }
  ],

  // 8. How COD Works (3 Simple Steps)
  HOW_IT_WORKS: [
    {
      step: "01",
      title: "Place Your Order",
      description: "Fill in your delivery address and contact details using our quick form below. No payment required today."
    },
    {
      step: "02",
      title: "Confirm Your Details",
      description: "Our support team will send a quick text or call to verify your shipping details and dispatch your order immediately."
    },
    {
      step: "03",
      title: "Receive & Pay Cash",
      description: "The courier delivers your product directly to your door. Inspect your item and pay cash on delivery."
    }
  ],

  // 9. Frequently Asked Questions (FAQ)
  FAQS: [
    {
      question: "How long does delivery take?",
      answer: "Standard delivery takes 3 to 5 business days depending on your city. We ship with top-tier premium couriers and provide you with an SMS tracking link once dispatched."
    },
    {
      question: "Are there any hidden fees or delivery costs?",
      answer: "No, absolutely none! The price you see on this page is exactly what you pay in cash to the courier. Standard delivery is 100% free."
    },
    {
      question: "What is your return & exchange policy?",
      answer: "We offer a 30-day risk-free warranty. If your product is damaged during shipping or doesn't meet your expectations, simply contact our friendly customer service team for a prompt exchange or full refund."
    }
  ]
};

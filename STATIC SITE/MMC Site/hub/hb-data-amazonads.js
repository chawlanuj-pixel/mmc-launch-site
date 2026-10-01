/* hub/hb-data-amazonads.js: Amazon Ads management page. Reuses the audience-hub template. No result, price or client outcome is stated.
   Brand tags come from content/clients.json. */
window.HUB = {
  "key": "amazonads",
  "wm": "Amazon",
  "eyebrow": "● Amazon Ads",
  "h1": [
    "Amazon ads management",
    [
      "for ",
      "D2C",
      " brands"
    ],
    "in India."
  ],
  "sub": "Sponsored ads, listings and brand content planned together, around stock, and read against total sales rather than ad-attributed sales alone.",
  "tiles": [
    {
      "img": "amazon/listing.jpg",
      "pos": "50% 50%",
      "label": "Listings",
      "note": "Content that converts"
    },
    {
      "img": "amazon/ads.jpg",
      "pos": "50% 50%",
      "label": "Sponsored ads",
      "note": "Keywords and budgets"
    },
    {
      "img": "amazon/stock.jpg",
      "pos": "50% 50%",
      "label": "Stock",
      "note": "Ads follow availability"
    },
    {
      "img": "amazon/report.jpg",
      "pos": "50% 50%",
      "label": "Reporting",
      "note": "Against total sales"
    }
  ],
  "answer": {
    "label": "In short",
    "lead": "Amazon ads management is the work of running sponsored ads on Amazon and improving the listings they send shoppers to, so the ad spend turns into profitable sales.",
    "hl": "profitable sales",
    "who": "Monday Marketing Company (MMC) runs Amazon ads for D2C brands, including The Growing Giraffe, alongside their website and other channels.",
    "points": [
      {
        "icon": "bag",
        "title": "Listing first",
        "text": "Ads only work if the listing they lead to converts."
      },
      {
        "icon": "layers",
        "title": "Ads that follow stock",
        "text": "Spend is planned around what you can actually deliver."
      },
      {
        "icon": "chart",
        "title": "Read against total sales",
        "text": "Not only the sales Amazon attributes to the ads."
      }
    ],
    "image": "amazon/listing.jpg",
    "chip": "Planned around stock"
  },
  "leaks": {
    "style": "stack",
    "note": "Screens are illustrative recreations of each platform's interface, not client data. Platform names and logos belong to their owners.",
    "eyebrow": "Where Amazon ads go wrong",
    "h2a": "Five ways Amazon spend",
    "h2b": "fails to pay back.",
    "lede": "On Amazon the ad, the listing and the stock work as one system. Each stage below is where it breaks, and how we run it."
  },
  "stages": [
    {
      "k": "Fix the listing first",
      "tag": "Listing optimisation",
      "breaks": "Advertising a listing that does not convert.",
      "why": "Ads send shoppers to your listing. A weak title, images or price wastes every click.",
      "does": "We improve titles, bullet points, images and rich content, so the traffic you pay for has a reason to buy.",
      "href": "services.html#brand",
      "img": "amazon/listing.jpg"
    },
    {
      "k": "Structure sponsored ads",
      "tag": "Sponsored ads",
      "breaks": "One campaign with every keyword mixed together.",
      "why": "Mixed campaigns hide which keywords earn and which drain budget.",
      "does": "We separate campaigns by purpose (defending brand terms, finding new ones, targeting products) and set a budget for each.",
      "href": "services.html#revenue",
      "img": "amazon/ads.jpg"
    },
    {
      "k": "Advertise what you can deliver",
      "tag": "Stock and availability",
      "breaks": "Running ads on products that are low or out of stock.",
      "why": "Advertising stock you cannot fulfil wastes spend and can harm rankings and the customer's trust.",
      "does": "We plan ads around inventory, and pause or shift spend when availability changes.",
      "href": "quick-commerce-ads.html",
      "img": "amazon/stock.jpg"
    },
    {
      "k": "Build the brand presence",
      "tag": "Brand store and content",
      "breaks": "A bare listing with nothing to build trust.",
      "why": "Shoppers compare on Amazon. A clear brand store and rich content signal a brand worth buying.",
      "does": "We build brand stores and rich content that present the range clearly and support the ads.",
      "href": "services.html#brand",
      "img": "amazon/store.jpg"
    },
    {
      "k": "Read it against total sales",
      "tag": "Measurement",
      "breaks": "Judging Amazon ads on ad-attributed sales alone.",
      "why": "Ads also lift sales that Amazon does not attribute to them. Reading only attributed sales misjudges what the ads do.",
      "does": "We read ad performance alongside total sales and your margin, so budgets follow what actually adds profit.",
      "href": "performance-marketing.html",
      "img": "amazon/report.jpg"
    }
  ],
  "numbers": {
    "eyebrow": "The numbers we start with",
    "h2a": "Know these four before you",
    "h2b": "advertise on Amazon.",
    "note": "One has a free calculator. Use your own numbers.",
    "cards": [
      {
        "n": "Total sales versus ad sales",
        "d": "How much of your growth the ads really explain."
      },
      {
        "n": "Advertising cost of sale",
        "d": "Ad spend as a share of ad-attributed sales."
      },
      {
        "n": "Break-even ROAS",
        "d": "The ROAS you need to stop losing money.",
        "href": "breakeven-roas-calculator.html"
      },
      {
        "n": "Stock cover",
        "d": "How many days of sales your inventory covers."
      }
    ]
  },
  "brands": {
    "h2a": "A brand we run",
    "h2b": "Amazon ads for.",
    "lede": "The tags show what we run for the brand. On a computer, hover the logo to see the work.",
    "list": [
      {
        "id": "giraffe",
        "svc": [
          "Performance",
          "CRO",
          "Creative",
          "Amazon",
          "Quick commerce"
        ]
      }
    ]
  },
  "beyond": {
    "eyebrow": "Related",
    "h2a": "See where Amazon fits in",
    "h2b": "the wider picture.",
    "cards": [
      {
        "n": "Quick commerce ads",
        "d": "Listings and placements on quick-commerce apps, planned around availability.",
        "img": "pm-v3/channel-quickcommerce.jpg",
        "href": "quick-commerce-ads.html",
        "link": "See quick commerce ads"
      },
      {
        "n": "Performance marketing",
        "d": "Media buying on Meta, Google, Amazon and quick commerce, judged on contribution margin.",
        "img": "pm-v3/channel-meta.jpg",
        "href": "performance-marketing.html",
        "link": "See performance marketing"
      }
    ]
  },
  "faqTitle": [
    "What people ask about Amazon ads",
    "first."
  ],
  "faq": [
    {
      "q": "What is Amazon ads management?",
      "a": "It is the work of running sponsored ads on Amazon and improving the listings and brand content they lead to, so that ad spend turns into profitable sales."
    },
    {
      "q": "Do you also improve listings?",
      "a": "Yes. Titles, bullets, images and rich content are part of the work, because ads only pay back if the listing converts."
    },
    {
      "q": "Why read Amazon results against total sales?",
      "a": "Amazon attributes only some sales to ads. Reading ad results next to total sales and margin gives a truer picture of what the spend adds."
    },
    {
      "q": "Do you guarantee results?",
      "a": "No. We commit to a clear structure, careful stock planning and honest reporting."
    },
    {
      "q": "Is this only for D2C brands?",
      "a": "Amazon is mainly a D2C and product channel. For B2B and education brands, see <a href=\"lead-generation.html\">lead generation</a>."
    },
    {
      "q": "What does it cost?",
      "a": "It depends on scope and, for media, on ad spend, so we quote after the <a href=\"audit.html\">audit call</a>, once we have seen your accounts."
    }
  ],
  "cta": {
    "h2a": "Find out what your Amazon spend",
    "h2b": "really adds.",
    "lede": "On a call, with a senior strategist. We read your Amazon ads against total sales and margin."
  }
};

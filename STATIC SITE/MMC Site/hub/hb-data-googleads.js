/* hub/hb-data-googleads.js: Google Ads management page. Reuses the audience-hub template. No result, price or client outcome is stated.
   Brand tags come from content/clients.json. */
window.HUB = {
  "key": "googleads",
  "wm": "Google",
  "eyebrow": "● Google Ads",
  "h1": [
    "Google Ads management",
    [
      "for ",
      "growing",
      " brands"
    ],
    "in India."
  ],
  "sub": "Search, shopping and video campaigns aimed at buying intent, with brand search kept separate and results judged on profit, not the conversions Google reports.",
  "tiles": [
    {
      "img": "google/search.jpg",
      "pos": "50% 50%",
      "label": "Search",
      "note": "Buying intent"
    },
    {
      "img": "google/feed.jpg",
      "pos": "50% 50%",
      "label": "Shopping",
      "note": "Feeds that sell"
    },
    {
      "img": "google/pmax.jpg",
      "pos": "50% 50%",
      "label": "Automation",
      "note": "Assets and signals"
    },
    {
      "img": "google/report.jpg",
      "pos": "50% 50%",
      "label": "Reporting",
      "note": "Judged on contribution"
    }
  ],
  "answer": {
    "label": "In short",
    "lead": "Google Ads management is the work of running paid campaigns on Google Search, Shopping, YouTube and its automated formats, aimed at people already looking for what you sell.",
    "hl": "already looking for what you sell",
    "who": "Monday Marketing Company (MMC) runs Google Ads for D2C brands and lead-based businesses, judged on contribution margin or the cost of a qualified lead.",
    "points": [
      {
        "icon": "target",
        "title": "Intent first",
        "text": "Search and shopping reach people who are ready to buy or enquire."
      },
      {
        "icon": "grid",
        "title": "Feeds and assets",
        "text": "Product feeds, ad copy and landing pages written for the query."
      },
      {
        "icon": "gauge",
        "title": "Judged on profit",
        "text": "Not on the conversions Google reports."
      }
    ],
    "image": "google/search.jpg",
    "chip": "Aimed at buying intent"
  },
  "leaks": {
    "style": "stack",
    "note": "Screens are illustrative recreations of each platform's interface, not client data. Platform names and logos belong to their owners.",
    "eyebrow": "Where Google Ads go wrong",
    "h2a": "Five ways Google spend gets",
    "h2b": "wasted.",
    "lede": "Google shows your ads to people who are searching, so quality of structure and data decides the result. Each stage below is where spend leaks, and how we run it."
  },
  "stages": [
    {
      "k": "Split by intent",
      "tag": "Search structure",
      "breaks": "Mixing brand and non-brand searches in one campaign.",
      "why": "Brand searches convert easily and can make a campaign look better than it is, hiding wasted spend on generic terms.",
      "does": "We keep brand search separate from generic and competitor searches, and structure campaigns by intent so each can be judged fairly.",
      "href": "services.html#revenue",
      "img": "google/search.jpg"
    },
    {
      "k": "Fix the feed",
      "tag": "Shopping and product feeds",
      "breaks": "Uploading a product feed and leaving it alone.",
      "why": "For Shopping, the feed is the ad. Weak titles, missing attributes and wrong prices limit what shows and who clicks.",
      "does": "We clean and optimise the feed: titles, attributes, categories and pricing, so the right products show for the right searches.",
      "href": "shopify-development.html",
      "img": "google/feed.jpg"
    },
    {
      "k": "Give automation good inputs",
      "tag": "Performance Max and automated campaigns",
      "breaks": "Handing budget to automation with no direction.",
      "why": "Automated campaigns are only as good as the assets, audience signals and conversion data you give them.",
      "does": "We feed them strong creative assets, clear audience signals and accurate conversion data, and check where the spend actually goes.",
      "href": "services.html#revenue",
      "img": "google/pmax.jpg"
    },
    {
      "k": "Reach people who are watching",
      "tag": "YouTube and video",
      "breaks": "Ignoring video, or running it with no follow-up.",
      "why": "Video builds interest before the search, but only pays off if it is joined up with the rest of the account.",
      "does": "We use video to reach and warm audiences, and connect it to search and shopping so interest turns into demand.",
      "href": "ugc-and-video.html",
      "img": "google/video.jpg"
    },
    {
      "k": "Judge it on profit",
      "tag": "Measurement",
      "breaks": "Trusting the conversions Google reports.",
      "why": "Reported conversions can include low-value actions and repeats, and leave out cost of goods and returns.",
      "does": "We set up conversion tracking that matches real business value, and judge campaigns on contribution margin or the cost of a qualified lead.",
      "href": "performance-marketing.html",
      "img": "google/report.jpg"
    }
  ],
  "numbers": {
    "eyebrow": "The numbers we start with",
    "h2a": "Know these four before you",
    "h2b": "scale Google.",
    "note": "Two have free calculators. Use your own numbers.",
    "cards": [
      {
        "n": "Break-even ROAS",
        "d": "The ROAS you need to stop losing money.",
        "href": "breakeven-roas-calculator.html"
      },
      {
        "n": "Unit economics",
        "d": "What each order leaves behind after costs.",
        "href": "unit-economics-calculator.html"
      },
      {
        "n": "Cost per qualified lead",
        "d": "What you pay for a lead your team accepts."
      },
      {
        "n": "Share of spend on brand search",
        "d": "How much of the budget goes to people who already know you."
      }
    ]
  },
  "beyond": {
    "eyebrow": "Related",
    "h2a": "See where Google fits in",
    "h2b": "the wider picture.",
    "cards": [
      {
        "n": "Performance marketing",
        "d": "Media buying on Meta, Google, Amazon and quick commerce, judged on contribution margin.",
        "img": "pm-v3/channel-meta.jpg",
        "href": "performance-marketing.html",
        "link": "See performance marketing"
      },
      {
        "n": "SEO",
        "d": "Technical health, search intent and answer-engine visibility.",
        "img": "seo/aeo.jpg",
        "href": "seo.html",
        "link": "See SEO"
      }
    ]
  },
  "faqTitle": [
    "What people ask about Google Ads",
    "first."
  ],
  "faq": [
    {
      "q": "What is Google Ads management?",
      "a": "It is the work of running paid campaigns across Google Search, Shopping, YouTube and automated formats such as Performance Max, and managing them against the results that matter to the business."
    },
    {
      "q": "Search, Shopping or Performance Max: which do we need?",
      "a": "It depends on what you sell and how people find it. We usually start by separating brand search, then add shopping and automated campaigns where the data supports it."
    },
    {
      "q": "Why keep brand search separate?",
      "a": "Brand searches convert easily and can hide poor performance elsewhere. Keeping them apart lets you judge the rest of the account fairly."
    },
    {
      "q": "How do you measure success?",
      "a": "On contribution margin for D2C brands, and on the cost of a qualified lead for B2B and education, not on the conversions Google reports."
    },
    {
      "q": "Do you guarantee results?",
      "a": "No. We commit to a clear structure, accurate tracking and honest reporting."
    },
    {
      "q": "What does it cost?",
      "a": "It depends on scope and, for media, on ad spend, so we quote after the <a href=\"audit.html\">audit call</a>, once we have seen your accounts."
    }
  ],
  "cta": {
    "h2a": "Find out where your Google spend",
    "h2b": "really goes.",
    "lede": "On a call, with a senior strategist. We read your Google account against your break-even numbers."
  }
};

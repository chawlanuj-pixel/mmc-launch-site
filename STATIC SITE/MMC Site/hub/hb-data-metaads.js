/* hub/hb-data-metaads.js: Meta Ads management page. Reuses the audience-hub template. No result, price or client outcome is stated.
   Brand tags come from content/clients.json. */
window.HUB = {
  "key": "metaads",
  "wm": "Meta",
  "eyebrow": "● Meta Ads",
  "h1": [
    "Meta ads management",
    [
      "for ",
      "growing",
      " brands"
    ],
    "in India."
  ],
  "sub": "Instagram and Facebook campaigns built as one funnel, with creative tested against a single idea and tracking that sends real results back to Meta.",
  "tiles": [
    {
      "img": "meta/structure.jpg",
      "pos": "50% 50%",
      "label": "Structure",
      "note": "Campaigns as one funnel"
    },
    {
      "img": "meta/creative.jpg",
      "pos": "50% 50%",
      "label": "Creative",
      "note": "Tested on one idea"
    },
    {
      "img": "meta/audience.jpg",
      "pos": "50% 50%",
      "label": "Audiences",
      "note": "Who sees it"
    },
    {
      "img": "meta/capi.jpg",
      "pos": "50% 50%",
      "label": "Tracking",
      "note": "Server-side events"
    }
  ],
  "answer": {
    "label": "In short",
    "lead": "Meta ads management is the work of running paid campaigns on Instagram and Facebook: structuring the account, producing and testing creative, and feeding the platform good data.",
    "hl": "feeding the platform good data",
    "who": "Monday Marketing Company (MMC) runs Meta ads for D2C brands, judged on contribution margin, and for B2B and education brands, judged on the cost of a qualified lead.",
    "points": [
      {
        "icon": "layers",
        "title": "One funnel",
        "text": "Prospecting, retargeting and conversion built to work together."
      },
      {
        "icon": "target",
        "title": "Creative on one idea",
        "text": "Versions are tested against a single brand thesis, so each round teaches the next."
      },
      {
        "icon": "link",
        "title": "Real results back to Meta",
        "text": "Purchases, and qualified leads from your CRM, sent through the Conversions API (CAPI)."
      }
    ],
    "image": "meta/capi.jpg",
    "chip": "Judged on profit or lead quality"
  },
  "leaks": {
    "style": "stack",
    "note": "Screens are illustrative recreations of each platform's interface, not client data. Platform names and logos belong to their owners.",
    "eyebrow": "Where Meta ads go wrong",
    "h2a": "Five reasons Meta spend",
    "h2b": "stops paying back.",
    "lede": "Meta rewards good structure, fresh creative and clean data. Each stage below is where accounts lose money, and how we run it."
  },
  "stages": [
    {
      "k": "Structure the account",
      "tag": "Account structure",
      "breaks": "Too many campaigns and audiences, each too small to learn.",
      "why": "Meta's delivery learns from volume. Budgets split across many small ad sets learn slowly and cost more.",
      "does": "We build the account as one funnel of prospecting, retargeting and conversion, with budgets concentrated enough for the platform to learn.",
      "href": "services.html#revenue",
      "img": "meta/structure.jpg"
    },
    {
      "k": "Test creative on one idea",
      "tag": "Creative testing",
      "breaks": "Launching many unrelated ads and picking favourites.",
      "why": "Creative drives much of the difference between accounts. Unrelated tests teach you nothing about why one ad won.",
      "does": "We brief creative against a single brand thesis and test versions systematically, so each round teaches the next.",
      "href": "ugc-and-video.html",
      "img": "meta/creative.jpg"
    },
    {
      "k": "Reach the right people",
      "tag": "Audiences and targeting",
      "breaks": "Over-narrow targeting that limits delivery.",
      "why": "Meta's systems often find buyers better from good signals and broad reach than from hand-picked interests.",
      "does": "We start from what your best customers have in common, test broader reach alongside tighter audiences, and let results decide.",
      "href": "services.html#revenue",
      "img": "meta/audience.jpg"
    },
    {
      "k": "Send real results back",
      "tag": "Conversions API tracking",
      "breaks": "Relying on the browser pixel alone.",
      "why": "Browser tracking misses conversions, and for lead generation it only sees form fills. Meta then optimises on a partial, shallow picture.",
      "does": "We set up the Conversions API (CAPI) so purchases, and for lead businesses the qualified stages from your CRM, reach Meta as server-side events.",
      "href": "lead-generation.html",
      "img": "meta/capi.jpg"
    },
    {
      "k": "Scale against profit",
      "tag": "Budget and scaling",
      "breaks": "Raising spend because platform ROAS looks good.",
      "why": "Platform-reported ROAS leaves out product cost, shipping, returns and fees, so a strong number can hide a loss.",
      "does": "We set budgets against your contribution margin (D2C) or the cost of a qualified lead (B2B and education), and scale only while that holds.",
      "href": "performance-marketing.html",
      "img": "meta/scale.jpg"
    }
  ],
  "numbers": {
    "eyebrow": "The numbers we start with",
    "h2a": "Know these four before you",
    "h2b": "raise a budget.",
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
        "n": "Creative win rate",
        "d": "The share of new creatives that beat the current best."
      }
    ]
  },
  "brands": {
    "h2a": "Some of the brands we run",
    "h2b": "performance ads for.",
    "lede": "The tags show what we run for each. On a computer, hover a logo to see the work.",
    "list": [
      {
        "id": "lepure",
        "svc": [
          "Performance",
          "Web",
          "Creative",
          "Social"
        ]
      },
      {
        "id": "giraffe",
        "svc": [
          "Performance",
          "CRO",
          "Creative",
          "Amazon",
          "Quick commerce"
        ]
      },
      {
        "id": "mittiy",
        "svc": [
          "Performance",
          "CRO",
          "Creative"
        ]
      },
      {
        "id": "awwbaby",
        "svc": [
          "Performance",
          "Web",
          "Creative"
        ]
      },
      {
        "id": "sprnt",
        "svc": [
          "Performance",
          "Web",
          "Creative",
          "Social"
        ]
      },
      {
        "id": "oosh",
        "svc": [
          "Performance",
          "Web",
          "Creative"
        ]
      }
    ]
  },
  "beyond": {
    "eyebrow": "Related",
    "h2a": "See where Meta fits in",
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
        "n": "UGC and video",
        "d": "Creator-style video made to run as ads and refreshed before it tires.",
        "img": "ugc/shoot.jpg",
        "href": "ugc-and-video.html",
        "link": "See UGC and video"
      }
    ]
  },
  "faqTitle": [
    "What people ask about Meta ads",
    "first."
  ],
  "faq": [
    {
      "q": "What is Meta ads management?",
      "a": "It is the work of running paid campaigns on Instagram and Facebook: structuring the account, briefing and testing creative, setting up tracking, and managing budgets against the results that matter to the business."
    },
    {
      "q": "What is the Conversions API (CAPI)?",
      "a": "It sends conversion events from your server or CRM to Meta, instead of relying only on the browser. It helps Meta see purchases it would otherwise miss and, for lead businesses, which leads your team qualified."
    },
    {
      "q": "How do you measure success?",
      "a": "For D2C brands, on contribution margin and blended results, not on platform-reported ROAS. For B2B and education brands, on the cost of a qualified lead or an enrolment."
    },
    {
      "q": "Do you guarantee a ROAS?",
      "a": "No. Nobody can honestly guarantee one. We commit to a clear structure, a creative testing process and honest reporting."
    },
    {
      "q": "Do you work with B2B and education, or only D2C?",
      "a": "All three. The account is set up differently: D2C on orders and margin, B2B and education on qualified leads."
    },
    {
      "q": "What does it cost?",
      "a": "It depends on scope and, for media, on ad spend, so we quote after the <a href=\"audit.html\">audit call</a>, once we have seen your accounts."
    }
  ],
  "cta": {
    "h2a": "Find out what your Meta spend",
    "h2b": "really returns.",
    "lede": "On a call, with a senior strategist. We read your Meta account against your break-even numbers."
  }
};

/* hub/hb-data-guides.js: Guides page. Reuses the audience-hub template. No result, price or client outcome is stated.
   Brand tags come from content/clients.json. */
window.HUB = {
  "key": "guides",
  "wm": "Guides",
  "eyebrow": "● Guides",
  "h1": [
    "Practical guides for",
    [
      "brands that ",
      "measure",
      " what they spend."
    ],
    ""
  ],
  "sub": "Plain-English guides on the numbers and habits behind profitable marketing, each with a free tool to check your own figures.",
  "tiles": [
    {
      "img": "guides/cost.jpg",
      "pos": "50% 50%",
      "label": "Margin",
      "note": "Break-even ROAS"
    },
    {
      "img": "guides/overlap.jpg",
      "pos": "50% 50%",
      "label": "Attribution",
      "note": "Which number to trust"
    },
    {
      "img": "guides/cards.jpg",
      "pos": "50% 50%",
      "label": "Creative",
      "note": "How to test"
    },
    {
      "img": "guides/library.jpg",
      "pos": "50% 50%",
      "label": "Library",
      "note": "Guides and tools"
    }
  ],
  "answer": {
    "label": "In short",
    "lead": "A marketing guide is a plain explanation of one decision, with the method and a worked example, so you can apply it to your own numbers.",
    "hl": "with the method and a worked example",
    "who": "Monday Marketing Company (MMC) writes guides on the decisions that decide whether marketing makes money, each linked to a free calculator or service.",
    "points": [
      {
        "icon": "coin",
        "title": "Method and example",
        "text": "The formula, then a worked example."
      },
      {
        "icon": "layers",
        "title": "Linked to tools",
        "text": "A free calculator beside each guide."
      },
      {
        "icon": "users",
        "title": "Written for founders",
        "text": "Plain English, no jargon left unexplained."
      }
    ],
    "image": "guides/library.jpg",
    "chip": "Three guides to start"
  },
  "leaks": {
    "style": "stack",
    "eyebrow": "The three guides",
    "h2a": "Three decisions that go better",
    "h2b": "with a method.",
    "lede": "Each guide starts from a mistake we see often. Pick the one closest to yours."
  },
  "stages": [
    {
      "k": "Read profit, not ROAS",
      "tag": "Contribution margin and break-even ROAS",
      "breaks": "Judging campaigns on the ROAS a dashboard shows.",
      "why": "Product cost, shipping, fees and returns decide what an order leaves behind, and so the ROAS you need.",
      "does": "The guide shows how to work out your break-even ROAS from your own costs, with a worked example.",
      "href": "guide-contribution-margin-roas.html",
      "img": "guides/cost.jpg"
    },
    {
      "k": "Know which number to trust",
      "tag": "Why platform dashboards over-count",
      "breaks": "Adding up what each platform reports.",
      "why": "Each platform claims the sales it can link to itself, so the totals often exceed your real orders.",
      "does": "The guide shows how to start from store orders, track blended ROAS and check the big decisions with simple tests.",
      "href": "guide-attribution-overlap.html",
      "img": "guides/overlap.jpg"
    },
    {
      "k": "Test instead of guessing",
      "tag": "How D2C brands test creative",
      "breaks": "Making ads on instinct and keeping the loudest.",
      "why": "Without controlled tests, you cannot say why an ad worked, so you cannot repeat it.",
      "does": "The guide shows how to test hooks, angles and formats, read the results and refresh before ads tire.",
      "href": "guide-creative-testing.html",
      "img": "guides/cards.jpg"
    }
  ],
  "beyond": {
    "eyebrow": "Related",
    "h2a": "Keep going with",
    "h2b": "the rest of the library.",
    "cards": [
      {
        "n": "Free growth calculators",
        "d": "Break-even ROAS, unit economics, LTV:CAC, runway, funnel and growth calculators.",
        "img": "res/unit.jpg",
        "href": "tools.html",
        "link": "Open the calculators"
      },
      {
        "n": "D2C marketing glossary",
        "d": "ROAS, CAC, LTV, AOV, RTO and the margin terms in plain English.",
        "img": "res/glossary.jpg",
        "href": "d2c-marketing-glossary.html",
        "link": "Read the glossary"
      }
    ]
  },
  "faqTitle": [
    "What people ask about",
    "the guides."
  ],
  "faq": [
    {
      "q": "Are the guides free?",
      "a": "Yes. There is no email wall."
    },
    {
      "q": "Who are the guides for?",
      "a": "Founders and marketers at D2C brands, and anyone who wants the method behind a marketing decision."
    },
    {
      "q": "Do the guides promise results?",
      "a": "No. They explain a method and use made-up examples to show it. Your own numbers decide the answer."
    },
    {
      "q": "Can someone go through my numbers?",
      "a": "Yes. Bring them to the <a href=\"audit.html\">audit call</a>."
    }
  ],
  "cta": {
    "h2a": "Want a second pair",
    "h2b": "of eyes on your numbers?",
    "lede": "On a call, with a senior strategist. Bring your figures to the audit call."
  }
};

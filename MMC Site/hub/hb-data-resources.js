/* hub/hb-data-resources.js: Resources page. Reuses the audience-hub template. No result, price or client outcome is stated.
   Brand tags come from content/clients.json. */
window.HUB = {
  "key": "resources",
  "wm": "Resources",
  "eyebrow": "● Resources",
  "h1": [
    "Free tools to check",
    [
      "your own ",
      "numbers",
      ""
    ],
    "before you spend."
  ],
  "sub": "Calculators, a plain-English glossary and working notes from the studio. Free to use, with no email wall.",
  "tiles": [
    {
      "img": "res/roas.jpg",
      "pos": "50% 50%",
      "label": "Break-even ROAS",
      "note": "The ROAS you need"
    },
    {
      "img": "res/unit.jpg",
      "pos": "50% 50%",
      "label": "Unit economics",
      "note": "What one order leaves"
    },
    {
      "img": "res/ltv.jpg",
      "pos": "50% 50%",
      "label": "LTV:CAC",
      "note": "When you pay back"
    },
    {
      "img": "res/funnel.jpg",
      "pos": "50% 50%",
      "label": "Funnel",
      "note": "Where it leaks"
    }
  ],
  "answer": {
    "label": "In short",
    "lead": "Marketing resources are the free tools, definitions and working notes that help you make a spending decision with your own numbers instead of an average.",
    "hl": "with your own numbers",
    "who": "Monday Marketing Company (MMC) publishes free calculators and a plain-English glossary for D2C brands, so decisions start from your cost sheet, not a rule of thumb.",
    "points": [
      {
        "icon": "coin",
        "title": "Your costs, not averages",
        "text": "Every calculator starts from your own figures."
      },
      {
        "icon": "gauge",
        "title": "Free, no email wall",
        "text": "Use them without handing over contact details."
      },
      {
        "icon": "layers",
        "title": "Plain English",
        "text": "Terms explained without more jargon."
      }
    ],
    "image": "res/glossary.jpg",
    "chip": "Free to use"
  },
  "leaks": {
    "style": "stack",
    "eyebrow": "Where guessing costs money",
    "h2a": "Five decisions that go better",
    "h2b": "with your own numbers.",
    "lede": "These are the calls brands often make on a rule of thumb. Below is each one, and the free tool that replaces the guess."
  },
  "stages": [
    {
      "k": "Know your break-even ROAS",
      "tag": "Break-even ROAS calculator",
      "breaks": "Chasing a ROAS number you heard elsewhere.",
      "why": "The ROAS a brand needs depends on its own margin, shipping, gateway fees and returns, not on an average.",
      "does": "Enter your costs to see the break-even ROAS your own cost sheet demands.",
      "href": "breakeven-roas-calculator.html",
      "img": "res/roas.jpg"
    },
    {
      "k": "See what one order leaves",
      "tag": "Unit economics calculator",
      "breaks": "Looking at revenue instead of what an order leaves behind.",
      "why": "Between the price and your bank account sit tax, product cost, fulfilment, returns and acquisition cost.",
      "does": "Enter your price and costs to see contribution at each stage, then scale it into a monthly profit and loss.",
      "href": "unit-economics-calculator.html",
      "img": "res/unit.jpg"
    },
    {
      "k": "Work out when customers pay back",
      "tag": "LTV:CAC calculator",
      "breaks": "Comparing lifetime value with acquisition cost using a rough average.",
      "why": "Repeat purchases tail off over time, so the month acquisition is paid back matters as much as the ratio.",
      "does": "Model repeat purchase as a decaying cohort to see lifetime contribution and the payback month.",
      "href": "ltv-cac-calculator.html",
      "img": "res/ltv.jpg"
    },
    {
      "k": "Plan the cash to get to profit",
      "tag": "CAC runway calculator",
      "breaks": "Expecting profit from the first month of ads.",
      "why": "New accounts pay more for customers while they learn, and repeat purchases take time to arrive.",
      "does": "Model falling acquisition cost against repeat purchase to see the months to profit and the cash needed to get there.",
      "href": "cac-runway-calculator.html",
      "img": "res/runway.jpg"
    },
    {
      "k": "Find where the funnel leaks",
      "tag": "Funnel ROAS calculator",
      "breaks": "Fixing the ad when the leak is on the page.",
      "why": "Between an impression and a paid order there are several steps, and the weakest one caps everything after it.",
      "does": "Set spend, CPM and order value, then move the conversion rates between an impression and a paid order.",
      "href": "funnel-roas-calculator.html",
      "img": "res/funnel.jpg"
    }
  ],
  "beyond": {
    "eyebrow": "Related",
    "h2a": "Keep going with",
    "h2b": "the rest of the library.",
    "cards": [
      {
        "n": "Guides",
        "d": "Plain-English guides on break-even ROAS, attribution and creative testing, each with a worked example.",
        "img": "guides/library.jpg",
        "href": "guides.html",
        "link": "Read the guides"
      },
      {
        "n": "Free growth calculators",
        "d": "Break-even ROAS, unit economics, LTV:CAC, runway, funnel and growth calculators. No email wall.",
        "img": "res/unit.jpg",
        "href": "tools.html",
        "link": "Open the calculators"
      },
      {
        "n": "D2C marketing glossary",
        "d": "ROAS, CAC, LTV, AOV, RTO and the margin terms, explained in plain English.",
        "img": "res/glossary.jpg",
        "href": "d2c-marketing-glossary.html",
        "link": "Read the glossary"
      },
      {
        "n": "Insights",
        "d": "Working notes from a studio in operation: breakdowns, playbooks and a founder's journal.",
        "img": "res/insights.jpg",
        "href": "Insights.html",
        "link": "Read the insights"
      }
    ]
  },
  "faqTitle": [
    "What people ask about",
    "the free tools."
  ],
  "faq": [
    {
      "q": "Are the calculators free?",
      "a": "Yes. There is no email wall and no gated download."
    },
    {
      "q": "Do the calculators forecast my results?",
      "a": "No. They show what your own numbers imply. They are not a promise of what a campaign will produce."
    },
    {
      "q": "Who is the glossary for?",
      "a": "Founders and marketers who want ROAS, CAC, LTV and the margin terms explained in plain English."
    },
    {
      "q": "Can someone go through the numbers with me?",
      "a": "Yes. Bring them to the <a href=\"audit.html\">audit call</a> and a senior strategist will read them with you."
    }
  ],
  "cta": {
    "h2a": "Want the numbers",
    "h2b": "read with you?",
    "lede": "On a call, with a senior strategist. Bring your figures to the audit call."
  }
};

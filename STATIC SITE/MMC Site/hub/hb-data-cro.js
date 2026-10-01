/* hub/hb-data-cro.js: Conversion rate optimisation page. Reuses the audience-hub template. No result, price or client outcome is stated.
   Brand tags come from content/clients.json. */
window.HUB = {
  "key": "cro",
  "wm": "CRO",
  "eyebrow": "● Conversion rate optimisation",
  "h1": [
    "Conversion optimisation",
    [
      "that turns ",
      "visitors",
      " into buyers"
    ],
    "in India."
  ],
  "sub": "Find where visitors drop off, then test fixes on product pages, checkout and forms, so the traffic you already pay for produces more orders and enquiries.",
  "tiles": [
    {
      "img": "cro/leaks.jpg",
      "pos": "50% 50%",
      "label": "Find the leaks",
      "note": "Funnel and behaviour"
    },
    {
      "img": "cro/pdp.jpg",
      "pos": "50% 50%",
      "label": "Pages",
      "note": "Where visitors click"
    },
    {
      "img": "cro/cart.jpg",
      "pos": "50% 50%",
      "label": "Checkout",
      "note": "Fewer steps, more orders"
    },
    {
      "img": "cro/forms.jpg",
      "pos": "50% 50%",
      "label": "Forms",
      "note": "Short and clear"
    }
  ],
  "answer": {
    "label": "In short",
    "lead": "Conversion rate optimisation is the work of getting more of your existing visitors to buy or enquire, by finding where they drop off and testing changes.",
    "hl": "more of your existing visitors",
    "who": "Monday Marketing Company (MMC) runs CRO for D2C brands on product pages, carts and checkout, and for B2B and education sites on landing pages and forms.",
    "points": [
      {
        "icon": "chart",
        "title": "Find the leaks",
        "text": "Funnel data and session behaviour show where visitors leave."
      },
      {
        "icon": "window",
        "title": "Fix the pages that matter",
        "text": "Product pages, checkout, landing pages and forms come first."
      },
      {
        "icon": "loop",
        "title": "Test, then keep",
        "text": "Changes are tested against the current page, and only proven ones stay."
      }
    ],
    "image": "cro/pdp.jpg",
    "chip": "Test, then keep what works"
  },
  "leaks": {
    "note": "Screens are illustrative recreations of each platform's interface, not client data. Platform names and logos belong to their owners.",
    "style": "stack",
    "eyebrow": "Where conversions go missing",
    "h2a": "Five places visitors leave",
    "h2b": "without buying.",
    "lede": "You pay to bring visitors in, then lose most of them. Each stage below is where they leave, and the CRO work that keeps them."
  },
  "stages": [
    {
      "k": "Find the real leaks",
      "tag": "Funnel analysis",
      "breaks": "Guessing which page needs a redesign.",
      "why": "Redesigns based on opinion often fix the wrong page. The biggest leak is usually somewhere less obvious.",
      "does": "We analyse funnel steps and session behaviour to find where visitors drop off, and rank the leaks by how much they cost.",
      "href": "audit.html",
      "img": "cro/leaks.jpg"
    },
    {
      "k": "Make the page persuade",
      "tag": "Product and landing pages",
      "breaks": "A page that describes the product but does not answer doubts.",
      "why": "Visitors leave when price, delivery, returns, proof or fit are not clear near the decision.",
      "does": "We rework key pages so the questions a visitor has are answered where they arise, with clear proof and one obvious next step.",
      "href": "services.html#organic",
      "img": "cro/pdp.jpg"
    },
    {
      "k": "Shorten the path to pay",
      "tag": "Cart and checkout",
      "breaks": "A long checkout with surprises at the end.",
      "why": "Extra steps, forced sign-ups and unexpected costs make people abandon a purchase they had already decided on.",
      "does": "We simplify the cart and checkout, including the payment options Indian shoppers expect such as UPI and cash on delivery, and remove friction.",
      "href": "d2c.html",
      "img": "cro/cart.jpg"
    },
    {
      "k": "Make forms easy",
      "tag": "Forms and lead capture",
      "breaks": "Long forms that ask for everything at once.",
      "why": "Most enquiries start on a phone. Every extra field costs you a lead who was already interested.",
      "does": "We test shorter forms, clearer calls to action and options like WhatsApp, so more interested visitors become leads.",
      "href": "lead-generation.html",
      "img": "cro/forms.jpg"
    },
    {
      "k": "Test before you keep",
      "tag": "A/B testing",
      "breaks": "Changing pages and hoping the numbers improve.",
      "why": "Without a test you cannot tell whether a change helped, or whether sales rose for another reason.",
      "does": "We run controlled tests on the changes worth making and keep only what beats the current page, so the gains are real.",
      "href": "audit.html",
      "img": "cro/test.jpg"
    }
  ],
  "numbers": {
    "eyebrow": "The numbers we start with",
    "h2a": "Know these four before you",
    "h2b": "change a page.",
    "note": "Two have free calculators. Use your own numbers.",
    "cards": [
      {
        "n": "Conversion rate by step",
        "d": "The share of visitors who reach each next step."
      },
      {
        "n": "Cart abandonment",
        "d": "How many people start to buy and stop."
      },
      {
        "n": "Funnel ROAS",
        "d": "Where the funnel leaks and what it costs.",
        "href": "funnel-roas-calculator.html"
      },
      {
        "n": "Unit economics",
        "d": "What each order leaves behind after costs.",
        "href": "unit-economics-calculator.html"
      }
    ]
  },
  "brands": {
    "h2a": "Some of the brands we run",
    "h2b": "CRO for.",
    "lede": "The tags show what we run for each. On a computer, hover a logo to see the work.",
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
      },
      {
        "id": "mittiy",
        "svc": [
          "Performance",
          "CRO",
          "Creative"
        ]
      }
    ]
  },
  "beyond": {
    "eyebrow": "Related",
    "h2a": "See where conversion fits in",
    "h2b": "the wider picture.",
    "cards": [
      {
        "n": "D2C brands",
        "d": "Ads, creative, conversion and retention for brands that sell direct to shoppers.",
        "img": "d2c/packing.jpg",
        "href": "d2c.html",
        "link": "See the D2C page"
      },
      {
        "n": "Lead generation",
        "d": "Paid media, landing pages and follow-up funnels connected to your CRM and Meta CAPI.",
        "img": "b2b/qualify.jpg",
        "href": "lead-generation.html",
        "link": "See lead generation"
      }
    ]
  },
  "faqTitle": [
    "What people ask about CRO",
    "first."
  ],
  "faq": [
    {
      "q": "What is conversion rate optimisation?",
      "a": "It is the work of getting more of your existing visitors to buy or enquire, by finding where they drop off and testing changes to the pages, checkout and forms they use."
    },
    {
      "q": "How do you decide what to test?",
      "a": "We start from your funnel data and how visitors actually behave, then rank possible changes by how much the leak costs and how easy the fix is."
    },
    {
      "q": "How long does a test take?",
      "a": "Long enough to be trustworthy, which depends on your traffic. We agree the plan after looking at your numbers."
    },
    {
      "q": "Do you guarantee improvements?",
      "a": "No. We commit to a structured process and honest reporting. Some tests win and some do not, and we keep only what beats the current page."
    },
    {
      "q": "Does CRO work for B2B and education, or only online shops?",
      "a": "It works for all three. For shops it means product pages and checkout. For B2B and education it means landing pages and enquiry forms."
    },
    {
      "q": "What does it cost?",
      "a": "It depends on scope and, for media, on ad spend, so we quote after the <a href=\"audit.html\">audit call</a>, once we have seen your accounts."
    }
  ],
  "cta": {
    "h2a": "Find where your visitors",
    "h2b": "leave.",
    "lede": "On a call, with a senior strategist. We look at your funnel together."
  }
};

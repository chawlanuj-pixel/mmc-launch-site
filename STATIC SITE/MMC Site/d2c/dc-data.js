/* d2c/dc-data.js: copy for the D2C hub.
   Client names and per-brand service tags come from content/clients.json. No result, price or
   client outcome is stated anywhere on this page. */
window.DC_STAGES = [
  { k: "Acquire", breaks: "Scaling ad spend on platform-reported ROAS without checking what each order keeps after costs.",
    does: "Budgets set against your contribution margin, with Meta, Google, Amazon and quick commerce run as one account.",
    href: "performance-marketing.html", link: "Performance marketing", img: "sv/revenue.jpg" },
  { k: "Persuade", breaks: "Running the same three ads until they stop working.",
    does: "A steady flow of creator-style video, statics and landing-page copy, tested against one brand thesis.",
    href: "services.html#content", link: "Content and creative", img: "sv/content.jpg" },
  { k: "Convert", breaks: "Sending paid traffic to a slow product page with a long checkout.",
    does: "Product-page, cart and checkout testing, and Shopify builds tuned for speed.",
    href: "services.html#organic", link: "Conversion and search", img: "d2c/checkout.jpg" },
  { k: "Return", breaks: "Treating every order as a one-off, so each one has to pay its own ad cost.",
    does: "Retention funnels across email, WhatsApp and loyalty that bring customers back, so the first order does not carry everything.",
    href: "services.html#revenue", link: "Retention marketing", img: "d2c/retention.jpg" },
  { k: "Expand", breaks: "Selling on your own site only, or running marketplace ads without looking at stock.",
    does: "Amazon and quick-commerce ads planned around stock and availability, and read against total sales.",
    href: "performance-marketing.html#channels", link: "Amazon and quick commerce", img: "pm-v3/channel-quickcommerce.jpg" }
];
window.DC_NUMBERS = [
  { n: "Unit economics", d: "CM1 to CM3: what one order actually leaves behind.", href: "unit-economics-calculator.html" },
  { n: "Break-even ROAS", d: "The ROAS you need to stop losing money.", href: "breakeven-roas-calculator.html" },
  { n: "CAC runway", d: "How long a new brand burns before it turns.", href: "cac-runway-calculator.html" },
  { n: "LTV : CAC", d: "What a customer is worth and how fast you recover it.", href: "ltv-cac-calculator.html" }
];
/* A selection of D2C brands, with the service tags from the client book (content/clients.json). */
window.DC_BRANDS = [
  { id: "lepure", svc: ["Performance", "Web", "Creative", "Social"] },
  { id: "giraffe", svc: ["Performance", "CRO", "Creative", "Amazon", "Quick commerce"] },
  { id: "mittiy", svc: ["Performance", "CRO", "Creative"] },
  { id: "sprnt", svc: ["Performance", "Web", "Creative", "Social"] },
  { id: "vagakids", svc: ["Performance", "Web", "Creative"] },
  { id: "notic", svc: ["Performance", "Web", "Creative", "Social"] }
];
window.DC_FAQ = [
  { q: "What is D2C marketing?",
    a: "D2C (direct-to-consumer) marketing sells a brand's products straight to shoppers online, with no retailer in between. Acquisition cost, delivery, returns and repeat purchase all sit on the brand's own P&L, so the marketing has to be judged on profit per order, not on platform-reported ROAS." },
  { q: "What does MMC do for D2C brands?",
    a: "Performance media, creative, conversion, retention and brand work, run by one team and measured on contribution margin. The tags on this page show what we run for some of the brands we work with." },
  { q: "Do you run Amazon and quick commerce?",
    a: "Yes. We run Amazon and quick-commerce ads alongside media on the brand's own site. The Growing Giraffe is one brand we run them for." },
  { q: "Do you only work with D2C brands?",
    a: "No. D2C is where we go deepest, but we also work with B2B companies and educational institutes. For them the goal is qualified leads and enrolments rather than orders, so the work is set up differently. See the <a href=\"b2b.html\">B2B</a> and <a href=\"education.html\">education</a> pages." },
  { q: "Which D2C brands is this for?",
    a: "Brands that sell direct online and want ad spend judged on profit. If ROAS alone is the target, or there is no paid media to review yet, we will say so early." },
  { q: "What does it cost?",
    a: "It depends on ad spend and scope, so we quote after the <a href=\"audit.html\">audit call</a>, once we have seen your accounts." }
];

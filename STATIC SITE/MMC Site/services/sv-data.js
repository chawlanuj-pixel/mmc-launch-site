/* services/sv-data.js: the five systems and the FAQ for the Services hub.
   System and service names come from the homepage (GrowthSystems.jsx) and llms.txt.
   Descriptions define what each service is. None states a result, a price or a client outcome. */
window.SV_SYSTEMS = [
  { id: "revenue", n: "I", short: "Revenue", label: "Revenue Accelerators", img: "revenue.jpg", pos: "45% 50%",
    desc: "Performance media that compounds, not just spends.",
    items: [
      { n: "Performance marketing", d: "Meta, Google, Amazon and quick-commerce media run as one account, judged on contribution margin.", href: "performance-marketing.html", link: "Read the performance marketing page" },
      { n: "Lead generation", d: "Paid enquiries for B2B, education and service businesses, connected to a CRM and Meta's Conversions API (CAPI) so campaigns learn from qualified leads, not form fills." , href: "lead-generation.html", link: "Read the lead generation page" },
      { n: "Retention marketing", d: "Funnels across email, WhatsApp and loyalty that nurture enquiries into customers and bring buyers back.", href: "retention-marketing.html", link: "Read the retention marketing page" }
    ] },
  { id: "organic", n: "II", short: "Search", label: "Organic Growth Engines", img: "organic.jpg", pos: "50% 50%",
    desc: "Search authority and on-site conversion architecture.",
    items: [
      { n: "SEO strategy", d: "Technical fixes, topical content and answer-engine coverage for the searches your buyers make.", href: "seo.html", link: "Read the seo page" },
      { n: "CRO for websites", d: "Testing product pages, carts and checkout so the traffic you already pay for turns into orders.", href: "conversion-rate-optimisation.html", link: "Read the conversion rate optimisation page" }
    ] },
  { id: "brand", n: "III", short: "Brand", label: "Brand Foundation Builders", img: "brand.jpg", pos: "50% 50%",
    desc: "Identity, UX and product systems that earn memory.",
    items: [
      { n: "Logo and brand identity", d: "Naming, logo, voice and the guidelines that keep them consistent.", href: "branding.html", link: "Read the branding page" },
      { n: "UI/UX systems", d: "Interface and design systems for websites and apps.", href: "ui-ux-design.html", link: "Read the ui/ux design page" },
      { n: "Packaging strategy", d: "Structure and graphics for the shelf, marketplaces and quick-commerce listings.", href: "packaging-design.html", link: "Read the packaging design page" },
      { n: "Online reputation management (ORM)", d: "Ratings, reviews and replies on Google and review sites, so a buyer, parent or student who checks you finds a trustworthy picture.", href: "online-reputation-management.html", link: "Read the online reputation management page" }
    ] },
  { id: "tech", n: "IV", short: "Technology", label: "Technology Drivers", img: "tech.jpg", pos: "50% 50%",
    desc: "Storefronts and apps that load fast and convert.",
    items: [
      { n: "Shopify and ecommerce development", d: "Storefronts built for speed, checkout and the way your catalogue is browsed.", href: "shopify-development.html", link: "Read the shopify development page" },
      { n: "Website development", d: "Marketing and B2B websites built to load fast and be found.", href: "web-development.html", link: "Read the website development page" },
      { n: "Mobile app development", d: "Apps for brands whose customers come back on their phones.", href: "mobile-app-development.html", link: "Read the mobile app development page" }
    ] },
  { id: "content", n: "V", short: "Content", label: "Content Magnets", img: "content.jpg", pos: "55% 50%",
    desc: "UGC, video and creator systems for modern distribution.",
    items: [
      { n: "UGC and video production", d: "Creator-style video and edits made to run as ads.", href: "ugc-and-video.html", link: "Read the ugc and video production page" },
      { n: "Social media creatives", d: "Statics, carousels and short video for paid and organic social.", href: "social-media-creatives.html", link: "Read the social media creatives page" },
      { n: "Influencer marketing", d: "Creator partnerships briefed against a single brand thesis.", href: "influencer-marketing.html", link: "Read the influencer marketing page" }
    ] }
];

window.SV_START = [
  ["Ad spend keeps rising and profit does not", "revenue", "Revenue Accelerators"],
  ["People visit but very few buy", "organic", "CRO, in Organic Growth Engines"],
  ["Nobody finds us when they search", "organic", "SEO, in Organic Growth Engines"],
  ["The brand looks like everyone else's", "brand", "Brand Foundation Builders"],
  ["The website is slow or hard to use", "tech", "Technology Drivers"],
  ["We cannot produce enough creative", "content", "Content Magnets"]
];

window.SV_FAQ = [
  { q: "What marketing services does MMC offer?",
    a: "Services in five systems: Revenue Accelerators (performance marketing, lead generation, retention), Organic Growth Engines (SEO and conversion), Brand Foundation Builders (identity, UX, packaging), Technology Drivers (Shopify, websites, apps) and Content Magnets (UGC, video, social, influencers)." },
  { q: "Do I have to buy all five systems?",
    a: "No. You can start with one. The audit call shows where your biggest leak is, and we begin there." },
  { q: "Which service should I start with?",
    a: "If ad spend is your biggest cost, start with <a href=\"performance-marketing.html\">performance marketing</a>. If traffic is fine but few visitors buy, start with conversion. If nobody finds you in search, start with SEO. The audit call settles it." },
  { q: "What does it cost?",
    a: "It depends on scope and, for media, on ad spend, so we quote after the audit call." },
  { q: "Which kinds of brands do you work with?",
    a: "D2C brands, B2B companies and educational institutes, plus consumer-facing businesses such as real estate, hospitality and mobility. D2C brands buy on orders and repeat purchases. B2B and education brands buy on qualified leads and enrolments. The work is set up differently for each: see the <a href=\"d2c.html\">D2C</a>, <a href=\"b2b.html\">B2B</a> and <a href=\"education.html\">education</a> pages." }
];

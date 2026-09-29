/* hub/hb-data-b2b.js: B2B hub. Client names and per-brand service tags come from content/clients.json.
   Brands with no recorded services are shown without tags. No result, price or client outcome is stated. */
window.HUB = {
  key: "b2b", wm: "B2B", eyebrow: "● B2B companies",
  h1: ["Marketing for", ["", "B2B", " companies"], "in India."],
  sub: "Lead generation, websites and creative that bring in qualified enquiries, judged on what a lead costs once sales accepts it.",
  tiles: [
    { img: "b2b/call.jpg", pos: "60% 50%", label: "The sales call", note: "Where a lead becomes a conversation" },
    { img: "b2b/casestudy.jpg", pos: "50% 50%", label: "Proof", note: "Case studies and capability decks" },
    { img: "shared/b2b.jpg", pos: "50% 50%", label: "The buying committee", note: "Several people decide" },
    { img: "b2b/seminar.jpg", pos: "50% 50%", label: "Events", note: "Seminars and webinars" }
  ],
  answer: {
    "label": "In short",
    "lead": "B2B marketing wins business from other businesses. Sales cycles are longer, several people take part in the decision, and the goal is a qualified lead rather than a basket.",
    "hl": "a qualified lead",
    "who": "Monday Marketing Company (MMC) builds the website, creative and paid media for B2B companies in India.",
    "points": [
      {
        "icon": "window",
        "title": "Built for a group decision",
        "text": "Website, creative and paid media for a purchase that takes longer and involves several people."
      },
      {
        "icon": "link",
        "title": "Connect the CRM",
        "text": "Leads go to a CRM and Meta's Conversions API (CAPI), so campaigns learn from the leads sales accepts."
      },
      {
        "icon": "gauge",
        "title": "Measure the qualified lead",
        "text": "The work is measured by the cost of a qualified lead."
      }
    ],
    "image": "b2b/seminar.jpg",
    "chip": "Measured by cost of a qualified lead"
  },
  leaks: { style: "stack", eyebrow: "Where B2B leads go missing", h2a: "Five places a buyer slips away.", h2b: "Five services that stop it.", lede: "A B2B sale takes several people and several weeks. Each stage below is a moment where a buyer can go quiet, and the service that keeps the conversation going." },
  stages: [
    { k: "Get found", tag: "Search and paid media", breaks: "A buyer searches for the problem and finds your competitors.", why: "B2B buyers research alone before they contact any supplier, and shortlist from what they find. If you are not there while the problem is live, you are not on the list.", does: "We aim search and paid media at the queries buyers type when the problem is live, and build the SEO that earns visibility between campaigns.", href: "services.html#organic", img: "b2b/found.jpg" },
    { k: "Explain", tag: "Website development", breaks: "The site lists services but never says why you are the safer choice.", why: "A B2B purchase involves several people and real risk. Each needs proof they can forward: case studies, capabilities and answers to their objections.", does: "We build websites, case studies and creative that answer a whole buying committee, not just the first visitor.", href: "services.html#tech", img: "b2b/explain.jpg" },
    { k: "Capture", tag: "Conversion and landing pages", breaks: "A contact page with a long form and no clear next step.", why: "Interested buyers rarely fill a long form for an unknown supplier. They want a demo, a call or a sample with little effort.", does: "We build landing pages and short forms around one next step, such as a demo or a call, and test them so more of your traffic becomes enquiries.", href: "services.html#organic", img: "b2b/capture.jpg" },
    { k: "Qualify", tag: "Lead generation, CRM and Meta CAPI", breaks: "Sales says the leads are poor, and marketing cannot show why.", why: "Optimised on form fills, platforms learn to find the cheapest enquiries, not the ones sales accepts. Volume rises while pipeline quality falls.", does: "We connect leads to your CRM and send the qualified, meeting-booked and won stages back to Meta through the Conversions API (CAPI), so campaigns learn what a good lead looks like.", href: "#quality", img: "b2b/qualify.jpg" },
    { k: "Follow up", tag: "Retention marketing", breaks: "Leads go cold because nobody follows up in the first day, or after.", why: "B2B sales cycles are long. Most leads are not ready at first contact, and the supplier who keeps sensible contact is the one remembered when budget frees up.", does: "We build retention funnels of CRM-triggered email and WhatsApp follow-ups that keep a lead warm until sales is ready.", href: "services.html#revenue", img: "b2b/followup.jpg" }
  ],
  loop: {
    variant: "b",
    img: "b2b/qualify.jpg", imgCaption: "Your CRM, feeding Meta",
    eyebrow: "Lead quality", h2a: "How CRM and Meta CAPI make leads", h2b: "better.",
    lede: "A form fill tells Meta that someone showed interest, not that they were a good lead. Your CRM knows what happened next. The Conversions API (CAPI) carries that back to Meta.",
    steps: [
      { k: "The lead arrives", d: "An ad brings a form fill or an enquiry.", chip: "A form fill" },
      { k: "Your CRM records what happens", d: "Sales marks it qualified, meeting booked, proposal sent or won.", chip: "Qualified · Meeting · Won" },
      { k: "CAPI sends the stage to Meta", d: "The stage goes back to Meta as a server-side event, not a browser guess.", chip: "Server-side event" },
      { k: "Meta learns your best leads", d: "The platform stops chasing cheap form fills and finds more people like the ones sales accepted.", chip: "Better targeting" }
    ],
    returnLabel: "The next ads find more leads like the good ones",
    without: { t: "Optimised for form fills", d: "The platform sees only that a form was submitted. It finds whoever fills forms cheapest, and sales spends its week on leads that never fit." },
    with: { t: "Optimised for qualified leads", d: "The platform sees which leads sales accepted and which became customers. Spend moves toward that kind of buyer, and the cost of a qualified lead becomes the number to watch." }
  },
  numbers: {
    eyebrow: "The numbers we start with", h2a: "Know these four before you", h2b: "spend on leads.",
    note: "Two have free calculators. Use your own numbers.",
    cards: [
      { n: "Cost per qualified lead", d: "What you pay for a lead that sales accepts, not for any form fill." },
      { n: "Lead-to-customer rate", d: "The share of qualified leads that become customers." },
      { n: "CAC runway", d: "How long spend runs before new customers pay it back.", href: "cac-runway-calculator.html" },
      { n: "LTV : CAC", d: "What a customer is worth and how fast you recover the cost of winning one.", href: "ltv-cac-calculator.html" }
    ]
  },
  brands: {
    h2a: "Some of the B2B brands we", h2b: "work with.", lede: "The tags show what we run for each. On a computer, hover a logo to see the work.",
    list: [
      { id: "nmc", svc: ["Web", "Lead generation", "Creative"] },
      { id: "skyfling", svc: ["Web", "Lead generation", "Creative"] },
      { id: "bloom", svc: ["Web", "Lead generation", "Creative", "Social"] },
      { id: "sprouts", svc: ["Web", "Lead generation", "Creative", "Social"] },
      { id: "jsw", svc: [] },
      { id: "learningmate", svc: [] }
    ]
  },
  beyond: {
    eyebrow: "Other audiences", h2a: "Selling to shoppers or students", h2b: "instead?",
    cards: [
      { n: "D2C brands", d: "Ads, creative, conversion and retention for brands that sell direct to shoppers.", img: "d2c/packing.jpg", href: "d2c.html", link: "See the D2C page" },
      { n: "Educational institutes", d: "Websites and lead generation for colleges and education brands, from enquiry to enrolment.", img: "shared/education.jpg", href: "education.html", link: "See the education page" }
    ]
  },
  faqTitle: ["What B2B teams ask", "first."],
  faq: [
    { q: "What is B2B lead generation?", a: "It is the work of bringing in enquiries from other businesses that fit who you sell to, then passing sales the ones worth a conversation. The measure that matters is the cost of a qualified lead, not the number of form fills." },
    { q: "How do CRM and Meta CAPI improve lead quality?", a: "A form fill only tells Meta that someone showed interest. When your leads sit in a CRM, we send what happened next (qualified, meeting booked, won) back to Meta through the Conversions API (CAPI). Meta then learns which leads your sales team actually wants and finds more of them, instead of optimising for the cheapest form fill." },
    { q: "What does MMC do for B2B companies?", a: "Websites, creative, paid media and lead generation, with a CRM and Meta CAPI set up so lead quality can be judged, and retention funnels to follow up. The tags on this page show what we run for some of the brands we work with." },
    { q: "How do you measure it?", a: "On the cost of a qualified lead and how many of those become customers, not on clicks or form fills. Lead quality is judged with your sales team." },
    { q: "Do you work with long sales cycles?", a: "Yes. We plan for several touchpoints and several decision-makers, and set up tracking so that lead quality can be judged, not just lead volume." },
    { q: "Do you only work with B2B companies?", a: "No. We also work with <a href=\"d2c.html\">D2C brands</a> and <a href=\"education.html\">educational institutes</a>. Tell us what you run and we will say which approach fits." },
    { q: "What does it cost?", a: "It depends on scope and, for media, on ad spend, so we quote after the <a href=\"audit.html\">audit call</a>, once we have seen your accounts." }
  ],
  cta: { h2a: "Find what a qualified lead", h2b: "really costs.", lede: "On a call, with a senior strategist. We read your campaigns against what a customer is worth to you." }
};

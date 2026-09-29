# AI by 3minds: AI Sales Agent and AI Landing Page Builder (deep audit)

Scope: https://www.3mindsdigital.com/AI-by-3minds/ai-sales-agent and https://www.3mindsdigital.com/AI-by-3minds/ai-landing-page-builder
No claims fact-checked. All numbers and claims are content to analyse.

## 0. How the pages are built (critical finding)

- The 3mindsdigital.com URLs are a Next.js shell (page title "AI by 3minds") whose only body content is a full-viewport `<iframe src="https://ai-by-3minds.framer.website/ai-sales-agent" style="position:fixed;inset:0;width:100%;height:100%;border:none;z-index:9999">`. The LP page iframes `https://ai-by-3minds.framer.website/ai-landing-page-builder`.
- The real site is a Framer project (generator meta "Framer 0b0b0ac", site id 1Gx3NKHivRzBUJzgzJ0AkP). All copy, assets and motion live on `ai-by-3minds.framer.website`, so I scraped that origin directly (SSR HTML + the Framer .mjs modules + Framer search index).
- Copy note: Framer SSR HTML omits FAQ answers and process-step descriptions (they render client-side). I recovered them from the page modules:
  - Sales: `1guEryjX-l5BFV35XCf3rzeQkELJE6oZsl3fRGuJ_yo.u-xuhOI_.mjs`
  - LP: `d4nfXPphOH7iFuVVn-4eW3UJ2ejIOm8S4TkGLnFpFAg.DAFD19G9.mjs`
  - Base: `https://framerusercontent.com/sites/1Gx3NKHivRzBUJzgzJ0AkP/`
- Sibling pages in the same Framer project (from search index): `/` (home), `/ai-photoshoot`, `/ai-spokesperson-video`, `/ai-video-generation`, an AI UGC page (noindex), `/contact`, and 4 blog posts (titled "... - My Framer Site", i.e. template leftovers).
- Stack: Framer (React) + framer-motion (`motion.hCe_Yo-A.mjs`) + Lenis smooth scroll (`lenis.IVqLnAjT.mjs`, `SmoothScroll_Prod`). Outer shell adds GTM GTM-MZGG5RND, GA4 G-MLVR7G6S0W, Cloudflare Rocket Loader, and a cursor "blob" div that follows mousemove via rAF translate3d (only on `(hover:hover)`).

---

# PAGE 1: AI SALES AGENT

## 1.1 Verbatim copy, in order

Nav (bar): Services (./#services) | Work (https://www.3mindsdigital.com/our-work/) | Get in touch (https://www.3mindsdigital.com/contact-us/)
Mobile/expanded menu: Home (./) | About (./ai-photoshoot, wrong target) | Blog (./, wrong target) | Contact (./contact) | Book a call

**HERO**
- Eyebrow badge: `AI Sales Agent`
- H1: `Your 24/7 AI Powered Sales Partner`
- Sub: `Meet your always-on AI sales agent, built to engage leads, qualify prospects, and close deals while you sleep.` (the words "AI sales agent" are a coloured/shimmer span)
- CTA: `Book a free call` -> https://calendly.com/3mindsdigital-info/introduction

**SECTION 2: Problem/vision**
- H2: `The Future of Sales Is AI-Driven`
- Body: `Today's buyers expect instant responses and personalised attention. Traditional sales teams can't keep up with the speed and scale modern markets demand. Our AI sales agent bridges that gap, offering real-time engagement, lead qualification, and follow-ups without the overhead of human staffing. From B2B SaaS to ecommerce, real estate to finance, businesses are adopting AI-driven sales assistants to capture every opportunity and accelerate deal flow.` (the phrase "AI-driven sales assistants" is highlighted "Colored" text that fills on scroll: `__framer__transformTrigger: onScrollTarget`)

**SECTION 3: Three-step scroll feature (3 variants of one stacked-plate graphic)**
1. H2 `Capture Every Lead in Real Time` - `No more missed opportunities. Our AI Sales Agent engages visitors the moment they interact, whether it's through your website form, LinkedIn message, or WhatsApp inquiry. Leads are captured instantly and qualified automatically.`
2. H2 `Qualify Prospects with Precision` - `Use AI-driven scoring and 50+ filters—like industry, company size, buying intent, and engagement history, to prioritize prospects who are most likely to convert. The agent continuously learns from interactions to improve accuracy.`
3. H2 `Engage Across Every Channel` - `Run multi-touch outreach campaigns across email, LinkedIn, and WhatsApp. From personalized follow-ups to meeting bookings, your AI Sales Agent keeps conversations alive while your team focuses on closing deals.`

**SECTION 4: Benefits**
- Eyebrow: `Hidden Benefits`
- H2: `Why Choose an AI Sales Agent`
- Cards (title / body):
  - `Always-On Engagement` / `Never miss a lead—our agent works round the clock.`
  - `Smarter Qualification` / `Instantly identifies high-quality prospects and filters time-wasters.`
  - `Personalized Pitches` / `Tailors conversations to each prospect for higher close rates.`
  - `Scale Without Hiring` / `Expand sales capacity without expanding payroll.`

**SECTION 5: Integrations**
- H2: `Works Seamlessly With Your Tech Stack`
- Logo flow graphic (no text labels; logos = Gmail, HubSpot, Salesforce, Outreach, Twilio, Zoho CRM, Zapier, lemlist, Clearbit, Cognism, ZoomInfo, BuiltWith)
- CTA (repeat): `Book a free call` -> Calendly

**SECTION 6: Use cases**
- Eyebrow: `Perfect For`
- H2: `Use Cases`
- Cards (photo + title + line):
  - `Lead Capture` / `Greet every website visitor with instant engagement.`
  - `Qualification` / `Ask the right questions to separate buyers from browsers.`
  - `Demo Booking` / `Syncs with calendars to schedule calls in real time.`

**SECTION 7: FAQs (accordion, collapsed by default)**
- Eyebrow: `FAQs`
- H2: `We've Got the Answers You're Looking For`
- Sub: `Quick answers to your AI automation questions.`
- Q1 `How is this different from a chatbot?` A: `Unlike basic bots, our AI sales agent understands context, intent, and can qualify leads instead of just answering FAQs.`
- Q2 `Can it integrate with our CRM?` A: `Yes. It works with leading CRMs and syncs data automatically.`
- Q3 `Is it secure for customer data?` A: `Absolutely. We follow enterprise-grade security and compliance protocols.`
- Q4 `Will it replace my sales team?` A: `Not at all, it empowers them. The AI handles volume and routine tasks, so your team can focus on closing.`

**SECTION 8: Final CTA**
- H2: `Scale Smarter. Sell Faster. Close More.`
- Sub: `Book a Call Today and Start Automating`
- Button: `Deploy Your AI Sales Agent Today` -> https://www.3mindsdigital.com/contact-us/ (button fill rgb(82,82,254))

Footer: only the Framer badge, `Create a free website with Framer, the website builder loved by startups, designers and agencies.` (link https://www.framer.com). No real footer, no pricing, no packages, no form (conversion is Calendly link + contact-us page).

## 1.2 Wireframe / section order and persuasion purpose

| # | Section | Layout | Persuasion purpose |
|---|---|---|---|
| 0 | Sticky pill nav | Dark translucent bar (bg rgba(13,13,13,0.8)), logo, Services/Work/Get in touch, hamburger on mobile | Keep parent-agency navigation; escape hatch |
| 1 | Hero | Centred badge + H1 + sub + primary CTA on black; animated curved-line/plate motif | Promise: always-on, autonomous revenue ("while you sleep"); immediate low-friction CTA (free call) |
| 2 | Future of Sales | Centred large paragraph, key phrase highlights on scroll | Reframe the problem (buyers want instant; humans can't scale); legitimise via industry list (SaaS, ecommerce, real estate, finance) |
| 3 | Capture / Qualify / Engage | Sticky scroll-story: 3D plates graphic on one side, text swaps between 3 headings | Explain "how it works" in 3 verbs mapping to funnel (top to bottom); channel specificity (form, LinkedIn, WhatsApp, email) |
| 4 | Why Choose (Hidden Benefits) | 4 benefit cards | Objection handling: missed leads, quality, personalisation, cost |
| 5 | Tech stack | Logo flow diagram converging on hub | Reduce integration anxiety; borrow credibility of Salesforce/HubSpot brands |
| 6 | Use cases | 3 photo cards | Let prospect self-select their scenario |
| 7 | FAQ | Accordion | Kill four top objections (chatbot comparison, CRM, security, job replacement) |
| 8 | Final CTA | Centred heading + button | Repeat the promise as a rhythmic tri-colon and convert |

## 1.3 Assets (all on framerusercontent.com/images/ unless noted)

Hero/scroll-feature graphic (isometric rounded-diamond "plates", 3D-rendered, transparent PNG/WebP, 1160x521 ratio):
- `Ew1c8PClUnVFFwkgqTcCGZ7DWk.webp` - matte black glossy isometric tray/plate, no content. Base plate (repeated 6x behind each colour plate).
- `btqc4Yt3GOikXaCfvZhhPegm1Lo.webp` - same plate in cyan/turquoise glass.
- `E0nijGdQ3JtZW4Mh6ARHSch9xM.webp` - same plate in mid-blue glass.
- `2G77tMpazW0FGDJLonce6upfX4o.webp` - same plate in royal/cobalt blue glass.
  Placement: Section 3 stacked graphic; the three colour plates pair with the black base per step (cyan, blue, royal blue = 3 states). Type: IMAGE (layered, animated by scroll). Not VIDEO.
  Also `d13zFBAtzvooNSTOwOohK4Fqjk.png` (683x1024, small portrait card component "Border" radius 22) used in a card component; image content not needed for sales page rendering.
- Supporting curved connector lines (white, 1.5px stroke SVG): `/assets/6NkkVQcDWJSAuhcggjC7jf46HU.svg` (M1 0 c0 150 250 75 250 200), `/assets/Rq6dk3tZvSFdOdWVUHCqR9bbinw.svg` (M250 200 c0-125-150-50-150-200), `/assets/tY4igrqHQkt9DtMR5Wlz8d3iAA.svg`, `/assets/juNnTJb4XhIwb2Zm1MqO2UMjhM.svg`, plus two more (UAjP..., cQtO..., returned Access Denied when re-fetched). Type: SVG path lines animated (stroke draw / shimmer), used in "Flow Animation" between platforms and hub.

Integration logos (each rendered as a square 225x225 tile, white background, on the flow diagram; "Platform 1/2/3", "Platform Anim", "Hubspot 1", "Salesforce.com Logo", "Meta Platforms Inc. Logo (cropped)" layer names):
- `h78LlHsYL3rAMwBUPIcrxG1WQYs.jpg` (736x736) - Gmail M logo on white
- `xQZ909jak4Orx9dmnS2nXhz8FM.png` (600x600) - HubSpot wordmark with orange sprocket
- `5H8smsy37jB28CAlTi3O1reVQig.webp` (4000x2250) - Salesforce blue cloud logo
- `gbKNOxUiFDWJEgdCX0s61uuZU.png` (318x159) - Outreach purple icon + wordmark
- `3Um6Iwf1bSgMYZaL2l0EN3hoBA.png` (225) - Twilio red circle logo + wordmark
- `Gt1s8KwnakN47SqmeNwX2Jg3NSo.png` - Zoho CRM multi-colour block logo
- `Hyi91lLH6LxlHZ3BgReWY6PHR0.png` - Zapier orange wordmark
- `DbBdmkl8umuEtIuCRcGXXt8zVsw.png` (1080) - lemlist blue icon + wordmark
- `0CmxO6fn3TmUjVLwFrhRlbAK4.png` - Clearbit blue squares icon + wordmark
- `0PRBVgYUImP3vNEMPwKYlCf1ofM.png` - Cognism navy/purple icon + wordmark
- `OVcpieg7F7i1urWbwAP3jkZ4dYE.png` - ZoomInfo red Z icon + wordmark
- `edrze5WNu3nFubqzLZ09ooxGI.png` - BuiltWith green wordmark
  Type: IMAGE. Note: third-party logos are low-res crops from search results (white boxes), a quality weakness.

Use-case cards (stock photos, all 3 are `<img>` on the Sales page; VIDEO-SLOT-ready on the LP equivalent):
- Lead Capture: `lmvRyezeTYfkwGIOfsPyvZsDCIA.jpg` (6016x4016) - top-down desk shot: two hands hold a smartphone over an open silver laptop keyboard; printed charts (donut charts, line graph, pie chart) and pastel sticky notes spread on a light desk; another hand with a pencil top right.
- Qualification: `AxtjekihjV3b67GawWb6qfISjE.jpg` (3600x2400) - close-up of a handshake over a printed "CONTRACT" page with bar charts, third person's hands holding a pen, blurred bright office, tablet on right.
- Demo Booking: `FLL2f4bD9UpynLPDUSLbVZedE.jpg` (4096x4096) - over-the-shoulder shot of a man in a grey suit typing on a laptop showing a monthly calendar titled "PLAN CALENDAR" with blue and red blocks; plant and sticky-note whiteboard behind. (AI-generated look, garbled calendar text.)

Nav/favicon: `sweDMG1s6fNm728C5HUkt4Xv0D4.png`, `tALVKsKBzGBMwRlH4UgceTbAd8.png` preloaded (logo/favicon assets).
VIDEO: none on the Sales page (no `<video>`).

## 1.4 Image briefs for MMC (literal scenes), Sales page

MMC has no video yet; use images now and swap to video later. Mark video-later slots.

1. Hero graphic (VIDEO-SLOT later: slow looping 3D render, 6-8s, transparent/black bg): 3 isometric rounded-square glass plates stacked with gaps on pure black, plates lit from below in cyan, blue, royal blue; the top plate glows when active. Deliver as 4 transparent PNGs (black base + three colours) 1160x521.
2. Section 3 step images (image now, VIDEO-SLOT later per step): Step 1 "Capture": a WhatsApp-style phone chat screen mockup where a website visitor's message ("Hi, do you have this in size M?") gets an instant reply, timestamp 2:14 AM, with a small "Lead captured" chip. Step 2 "Qualify": a lead-scorecard UI card with 4 filter chips (industry, company size, intent, engagement) and a score ring 87/100 with a "Hot lead" tag. Step 3 "Engage": three-lane timeline UI with email, LinkedIn and WhatsApp icons and a "Meeting booked" confirmation card.
3. Integrations diagram: crisp SVG logos (not photo tiles) flowing along curved lines into a central MMC "AI Agent" hub. Use MMC's actual stack (Shopify, WhatsApp Business, HubSpot/Zoho, Google Sheets, Meta Lead Ads, Razorpay) plus education CRMs (LeadSquared, Salesforce) for that audience.
4. Use case "Lead Capture": desk shot of a D2C founder's phone showing an instant reply chat on a store site, laptop with Shopify admin beside it.
5. Use case "Qualification": a phone screen showing a 3-question chat (budget, timeline, product) with lead tag "Qualified", beside a CRM pipeline board on a laptop.
6. Use case "Demo Booking": laptop screen showing a booking widget (calendar with a slot highlighted, "Confirmed: Thursday 4:30 PM") and a person smiling at the screen; for education, an admissions counsellor's call slot.
7. Final CTA background (optional): dark gradient with a faint chat-bubble pattern.

## 1.5 Animations and interactions (Sales)

Evidence: Framer motion runtime (`motion.hCe_Yo-A.mjs`), Lenis (`lenis.IVqLnAjT.mjs`, `SmoothScroll_Prod.DxM6Wdb4.mjs`), page module props.
- Page-load hero: `trigger:onMount, type:appear` (data-framer-appear-id v98qdw); hero text fades/slides in.
- Scroll-linked text highlight: `__framer__transformTrigger: onScrollTarget` (10 occurrences), the "Colored" text layer changes as the paragraph scrolls (word-by-word colour fill in Section 2).
- Section 3 scroll story: one component with 3 variants (`Variant 1/2/3`, ids bi6m_mTGn / WUPi2onqH / bL1lJkJ_M) that swap on scroll targets; plates re-lit per variant, spring transitions (`type: spring, bounce .2, duration .4`). Headings (`Title 1/2/3`) and descriptions (`Desc 1/2/3`) swap in sync.
- "Screen Saver" component (title literally "Screen Saver": "add background and bouncer elements"): DVD-style bouncing elements used in the integrations area.
- "Flow Animation"/"Platform Anim"/"Arm 1-12"/"Circle Wrap"/"SVG Path": logos travel/appear along curved SVG connector lines toward a centre; "Shimmer" component (`defaultValue #0099FF`, `trigger: appear`, `direction default/reverse`) sweeps along the SVG lines.
- Card entrance: `__framer__enter` + `__framer__animateOnce:true` + `__framer__threshold:.5` (fade/translate up once at 50% visibility) on sections and cards.
- FAQ: accordion with `Closed/Open` states (Faqs component; variants "1st state", "2nd state").
- Use-case cards: linked cards with hover state (each wrapped in `<a>`).
- Header: CTA button hover variant; nav hamburger `Mobile Closed/Expanded`.
- Cursor blob (outer shell only; invisible inside the iframe at z-index 9999 because iframe covers it).
- No typing effect, no chat demo, no marquee on this page (grep of modules: Ticker 0, Lottie 0).

## 1.6 Design tokens (Sales)

- Theme: near-black. Page bg `#000` (token aae92d1e), alt `#050505`, `#0e0e0e`, surfaces `#131415`, `#1a1c1d`, `#222426`, `#33373a`; nav bar rgba(13,13,13,.8); card fill rgba(255,255,255,.05); borders `#e6e6e61a`.
- Text: white `#fff`, muted `#9ba1a5`, `#e6e6e6` (and 60-80% variants), `#ccc`.
- Accents: primary CTA `rgb(82,82,254)` = `#5252fe` (periwinkle/indigo); `#2060df` blue; `#814ac8` purple; `#df7afe` pink-lilac; shimmer `#0099FF`; plate colours cyan/blue/royal blue.
- Type: Figtree (headings, "Figtree Variable" with wght 550, letter-spacing -0.04em), Inter (body, -0.02em / -0.01em). Sizes seen: H1 64px desktop, 56px, 45px tablet/mobile steps; H2 50/40px; card titles 23-28px; body 16-18px; small 15px.
- Buttons: solid #5252fe pill/rounded, white label, hover variant; dark ghost nav button.
- Cards: 8px radius (video/photo cards), 22px radius (image card component), glassy dark surfaces.
- Layout: 1200px desktop frame; breakpoints 1200 / 810-1199 / <810 (Framer Desktop/Tablet/Phone).

## 1.7 SEO / AEO (Sales)

- Framer page `<title>`: `AI Sales Agent for Lead Generation & Automation | AI by 3Minds`
- Meta description: `Deploy AI sales agents to automate lead qualification, customer support, follow-ups, WhatsApp conversations, and conversion workflows for modern businesses.`
- og:title = title; og:description = description; og:type website; og:url https://ai-by-3minds.framer.website/ai-sales-agent; twitter:card summary_large_image; robots `max-image-preview:large`; no og:image set on the Framer page; Framer search index has `keywords: ""`.
- Wrapper on 3mindsdigital.com (what Google sees at the public URL): title `AI by 3minds`, description `3minds Digital - Creative Digital Agency`, canonical `https://www.3mindsdigital.com/AI-by-3minds` (same canonical for both pages, i.e. both sales agent and LP builder canonicalise to the section root), og:title `3minds Digital`, og:url root, og:image opengraph-image.png 600x600. Body = iframe only, so almost zero crawlable text on the branded domain; the indexable content sits on framer.website (duplicate/competing host).
- Headings: H1 `Your 24/7 AI Powered Sales Partner`; H2 x9 as listed; no H3-H6; FAQ questions are `<p>` not headings.
- Schema: none detected (no ld+json). No FAQPage schema despite 4 FAQs (and answers are not in initial HTML).
- Keywords targeted (implied): AI sales agent, lead generation, lead qualification, follow-ups, WhatsApp conversations, customer support, automation, CRM integration, 24/7.
- Internal linking: nav to home, services anchor, work, contact; About link points to /ai-photoshoot (wrong), Blog to root (wrong). No cross-links between AI tools pages, no related services.
- CTA destinations: Calendly `https://calendly.com/3mindsdigital-info/introduction` (hero, tech stack), `https://www.3mindsdigital.com/contact-us/` (final CTA, nav "Get in touch"). No form on-page.
- Images have `alt=None` (all images without alt text).

## 1.8 Weaknesses MMC can beat (Sales)

- Content: no proof (no case study, client logo, metric, demo transcript, screenshot), no pricing or packages, no process/onboarding steps, no channel-specific detail (WhatsApp Business API, template approvals, Indian numbers), no vertical pages. Claims like "50+ filters" unsupported. FAQ is only 4 Qs and hidden from crawlers.
- Design/dev: no live chat demo despite selling a conversational product (biggest missed opportunity: an animated WhatsApp/website chat conversation with typing dots would sell instantly). Integration logos are low-res white square crops. Stock photos are generic and one is visibly AI-garbled. Broken nav targets. Framer badge visible. No footer.
- SEO/AEO: iframe wrapper means the branded domain has thin content and shared canonical; generic meta; no schema (Service, FAQPage, HowTo, Organization); no headings for FAQs; no internal links; no alt text; no og:image per page. MMC can ship real HTML with FAQPage + Service schema, answer-first paragraphs and comparison content ("AI sales agent vs chatbot vs SDR").

---

# PAGE 2: AI LANDING PAGE BUILDER

## 2.1 Verbatim copy, in order

Nav identical to Page 1 (Services | Work | Get in touch; menu Home | About | Blog | Contact | Book a call).

**HERO**
- Eyebrow badge: `AI Landing Page Builder`
- H1: `Launch Pages That Work While You Sleep`
- Sub: `Build high-converting, custom landing pages in hours, fully responsive and powered by AI that understands what makes people click.`
- CTA: `Book a free call` -> https://calendly.com/3mindsdigital-info/introduction
- Hero media: looping webm (VIDEO, see 2.3)

**SECTION 2: Edge (pinned scroll-scrub media)**
- H2: `The Edge of AI Landing Page Creation`
- Body: `Speed is just one part of the story. Real results come from landing pages that reflect your brand and perform, without delays. Our AI Landing Page Builder makes smart design choices, writes clear copy, and builds responsive pages to help your websites go live faster and work better. Made for teams who want control and flexibility, it's a faster, easier way to launch, test, and grow` (no final full stop)
- Behind/alongside: 5 website-screenshot images scrubbed on scroll (see 2.3)

**SECTION 3: Process (4-step sticky tabs, image on right swaps)**
- H2: `Process`
- Leftover template line (rendered, visible in SSR): `My client satisfaction rate exceeds 95%, highlighting my photography's excellence.`
- Steps (labels): `Discover`, `Define`, `Generate`, `Refine`. Descriptions recovered from module (4 strings; mapped to steps by logical order, since the module lists them out of order):
  - Discover: `We understand your brief, landing page goals, brand personality, and the purpose behind the page.` (this is the one rendered in SSR under step 1)
  - Define: `Your inputs, tone, style, structure, and visual cues are translated into clear instructions for the AI.`
  - Generate: `The AI creates an initial layout with design blocks, messaging, and content aligned with your brand direction.`
  - Refine: `Our team reviews, edits, and enhances the output, fine tuning design, copy, and structure for the final page.`
  - Note: step titles are rendered as a component whose default text is "Ogmonk" (template leftover); Active/Inactive variants animate as each step scrolls into focus (`__framer__targets` Active `hS8zYsU6E` / Inactive `kVV1FP1YE`).

**SECTION 4: Benefits**
- Eyebrow: `Hidden Benefits`
- H2: `Why Choose AI Landing Page Builder`
- Cards:
  - `Faster Go-Live Times` / `Launch pages quicker without long production cycles.`
  - `Aligned With Your Brand` / `Design and tone tailored to your brand identity.`
  - `Smarter Design Decisions` / `AI suggests layouts that support your page goals.`
  - `Built to Convert` / `Each page is structured to drive real results.`

**SECTION 5: Where it fits**
- Eyebrow: `Perfect For`
- H2: `Where It Fits`
- Intro: `Startups, e-commerce brands, SaaS teams, and agencies looking to scale landing pages without the time or complexity of traditional development.`
- Cards (video-poster cards, 8px radius, `srcType:Upload`, loop, muted, autoplay, no src yet):
  - `D2C & Ecommerce Brands` / `Quickly build landing pages for new launches, offers, or drops without waiting on design or dev teams.`
  - `Agencies` / `Deliver more client campaigns, run A/B tests faster, and reduce production time using AI-powered page creation.`
  - `SaaS & Product Teams` / `Test features, capture leads, and launch product updates with pages that match your brand and user journey.`

**SECTION 6: FAQs**
- Eyebrow: `FAQs`
- H2: `We've Got the Answers You're Looking For`
- Sub: `Quick answers to your AI automation questions.` (reused from Sales; says "automation")
- Q1 `How fast can I go live with a page?` A: `Most users launch in hours, not days. The AI handles the heavy lifting for you.`
- Q2 `What do I need to get started?` A: `Just your brief, brand details, and goals. The AI takes over from there, no separate design or dev team required.`
- Q3 `How is this different from building landing pages the traditional way?` A: `Traditional builds take time, teams, and iterations. Our AI landing page builder speeds it all up, while still giving you control and brand fit.`
- Q4 `Will my landing page still feel like my brand?` A: `Yes. From fonts to tone of voice, the AI uses your brand inputs to keep everything aligned and on-brand.`

**SECTION 7: Final CTA**
- H2: `Smarter Pages. Faster Launches.`
- Sub: `Book a call and let our AI turn ideas into high converting pages.`
- Button: `Generate My First AI Landing Page` -> https://www.3mindsdigital.com/contact-us/ (fill rgb(82,82,254))

Footer: Framer badge only. No pricing, packages, form or integrations section.

## 2.2 Wireframe / persuasion purpose

| # | Section | Layout | Purpose |
|---|---|---|---|
| 0 | Nav | same pill nav | orientation |
| 1 | Hero + video | Centred badge/H1/sub/CTA, then large looping video (contain-fit, black bg) | Show the product output moving; "while you sleep" promise |
| 2 | Edge | Pinned scroll-scrubbed media (Scroll Media Component, 7 image slots, trigger "text-align-top/middle", length rule "500 per second") with centred H2 + paragraph | Prove design quality by flashing real landing pages as you scroll; explain AI + human control |
| 3 | Process | Sticky 4-step list left, image right swaps per step (Active/Inactive states) | Demystify AI (brief -> instruction -> generation -> human refinement); reassure human oversight |
| 4 | Benefits | 4 cards | Speed, brand fit, smart layouts, conversion |
| 5 | Where it fits | Intro + 3 video cards | Segment self-selection (D2C first, agencies, SaaS) |
| 6 | FAQ | Accordion | Speed, requirements, vs traditional, brand fidelity |
| 7 | Final CTA | Centred | Convert with a "first page" low-commitment framing |

## 2.3 Assets

VIDEO
- Hero: `https://framerusercontent.com/assets/EFy2bsA7jMy4mjnOnRnQTfnI0W4.webm` (1.74 MB; props: preload auto, muted, playsinline, object-fit contain, absolute fill). VIDEO-SLOT. I could not decode frames (no ffmpeg locally), so its scene is not visually verified; context (H1 + Edge section + image set of website screenshots) suggests a screen-recording style animation of a landing page being generated. Treat as unverified.
- Three use-case card videos (VIDEO-SLOT): `srcUrl` is empty, so they currently show only poster images (loop, muted, autoplay, object-fit cover, radius 8). Posters:
  - D2C & Ecommerce: `3mMPpeV6XkNzaUkeHOxR7Qjb6U.jpg` (4283x3426) - a smiling woman with glasses holding a credit card at a laptop beside a smiling bearded man in a tan shirt unpacking a cardboard box with a plaid garment; bright room, blue curtains, plants.
  - Agencies: `AxtjekihjV3b67GawWb6qfISjE.jpg` (same handshake-over-CONTRACT image used on the Sales page "Qualification" card; reused stock).
  - SaaS & Product Teams: `O1D039LqAARW7DtHAhnUi8O7E.jpg` (5600x3738) - seven office colleagues clustered around a laptop on a low table, one leaning in and gesturing at a paper, yellow sofa, wall lettering "MAKE IT GREAT / MAKE IT WORK / MAKE IT SOAR".

Section 2 scroll-scrub images (Scroll Media Component; framerusercontent.com/images/…, 1440 wide):
- `L48paR7yLd1YEqvfRHg2Tk3tPk.webp` (1440x806) - dark-green website slide "Arrivals - Terminal 3 Domestic" with a horizontal carousel of airport advertising photos (Omega watches on LED wall, hanging Roku Gin banner, Mercedes billboard, digital screens) and a "View In 360° View" pill button.
- `ahQzBF6HpojeVaWBr8cWnd858.webp` (1440x914) - website hero screenshot for JTCPL Designs: black-and-white photo of two men at a boardroom table, giant headline strip "ATE. CREATE. EXPERIENCE." (CREATE in orange), orange band below reading "Celebrating 20 Years of Design", hamburger and "Let's Talk..." top bar. (Used twice in sequence.)
- `9Yn5CCVAlphhyJHHWtafgeYrs.webp` (1440x917) - jewellery e-commerce homepage screenshot (SVARAA): promo top bar, nav, serif copper headline "Masterpieces of Excellence", "Shop Now" teal button, "Play Video", arched image of pearl earrings on a teal block, four trust icons row (free shipping, money back, exchange, warranty).
- `MIkCy1ivoABMhLTyxEG5ujl0c.webp` (1440x806) - dark navy jewellery rewards section "Our Rewards Discover The Perks" with tabs (Upto 20% Off ... 60% And Above), four product cards with "Enjoy a 10% discount on Diamond making charges!", "JOIN ENCIRCLE PROGRAM" outline button.
- `xrTSy0864brtCAlKcYGYuSEbPwo.webp` (1440x898) - dark purple online-poker landing page "SPARTAN POKER" with gold headline, illustrated cowboy character on a purple sofa, platform icons row, carousel dots.
  Type: IMAGE (scroll-scrubbed like a frame sequence). These are real client work screenshots (D2C, B2B, gaming), not AI output.

Process step images (right panel, swap per step; from module, order 1-4):
- Discover: `RxFdIRJhGdNti193HzbYMic.webp` - close-up of a red-haired woman with glasses writing "To do list!" on a whiteboard covered with paper phone wireframes and yellow sticky notes.
- Define: `F3vySp6eEC2A4jmhgtUVUlOgTUY.webp` - top-down of hands in an orange knit sleeve holding orange colour swatch cards over printed wireframes, a blue pen, sticky notes.
- Generate: `FB8yEtgyPklVYvNU1NlzjQjMRg.jpg` - white desk with a monitor showing a "Web Design" landing page and many floating web-design layout thumbnails around it, plant and mug.
- Refine: `FZ9jDCetGL7FI3v97cSp9730VY.webp` - woman in black holding a printed two-page wireframe with yellow sticky note, pointing at a block with an orange pencil; grey wireframes on wall behind.
  Type: IMAGE. Mapping of step to image inferred from module order (1-4) and the SSR (Discover shows RxFd).

Other: preloaded `sweDMG1s6fNm728C5HUkt4Xv0D4.png`, `tALVKsKBzGBMwRlH4UgceTbAd8.png` (logos).

## 2.4 Image briefs for MMC (LP builder)

1. Hero VIDEO-SLOT (image now: 16:9 static): a laptop screen (dark bg) showing a landing page being assembled: hero block, testimonial strip, pricing table sliding into place, cursor with a small "AI" tag, timer chip "Live in 2 hrs". Later: 8-10s loop screen recording of a page assembling block by block, muted, 1920x1080 webm+mp4.
2. Edge scroll-scrub set (5-7 IMAGES, 1440x900 browser screenshots, one per vertical): MMC client landing pages, real or mocked: D2C product drop page (product hero, "Buy now", reviews), B2B lead-gen page (headline, form, logos), education admissions page (course hero, "Apply now", fee table), a mobile-frame version of each. Consistent browser chrome.
3. Process images (4, 4:3): Discover = strategist and founder at a table with a printed brief and brand guidelines; Define = designer's hands arranging colour swatches and a type specimen beside a wireframe; Generate = laptop screen showing an AI prompt panel on left and a generated page preview on right; Refine = designer marking redlines on a printed page with a highlighter beside a laptop.
4. Use-case cards (VIDEO-SLOT later, poster image now, 3:2): D2C = product-launch page on a laptop beside a real product box and packing tape; Agencies = split view of two A/B variants of one page with a "B wins" tag; SaaS/Education = feature-launch page on a laptop with a team reviewing; add an education card (school admissions page on laptop with counsellor).
5. Final CTA: dark gradient with a browser window showing a page half generated.

## 2.5 Animations and interactions (LP)

- Hero video: autoplay muted playsinline loop webm via Framer Video component (`Video.B8QeMh80.mjs`), object-fit contain, `preload: auto`.
- Scroll Media Component (custom code component, title "Scroll Media Component"): scroll-scrubbed image sequence/video; props: Images (7 slots), Media Fit, Poster, Length ("Rule of thumb: 500 for each second of the video. So for a 10s video, set length to 5000"), Offset, triggerPosition `text-align-top` / `text-align-middle`, imageFit contain. Pinned/sticky while scrolling through the Edge section.
- Process: Active/Inactive step variants toggle via `__framer__targets` with `__framer__threshold:.5` (`__framer__animateOnce:false`), so step highlight follows scroll position; right-hand image swaps (Image 1-4 / positionX,Y center).
- Entrance: `__framer__enter` + `animateOnce:true` fade-up on every header/card (12 occurrences); hero `appear` on mount (id k8ohq5).
- Use-case cards: linked cards, hover state; video posters with loop/mute/autoplay when src is supplied.
- FAQ accordion; hamburger menu open/close; Lenis smooth scroll site-wide.
- No typing effect, chat demo or marquee.

## 2.6 Design tokens (LP)

Same system as Sales: black bg (#000 / #050505), white text, muted #9ba1a5, translucent white surfaces rgba(255,255,255,.05), borders #e6e6e61a, CTA #5252fe. Type: Figtree Variable for H2 (wght 550, -0.04em) and Inter body; H1 64px scaling to 56/45. Photos radius 8; buttons rounded solid indigo. Layout 1200px frame.

## 2.7 SEO / AEO (LP)

- `<title>`: `AI Landing Page Builder for High Conversion Websites`
- Meta description: `Build high-converting AI-generated landing pages with optimized UX, copywriting, and responsive UI. Perfect for startups, SaaS, and marketing campaigns.`
- H1 `Launch Pages That Work While You Sleep`; H2 x6: `The Edge of AI Landing Page Creation`, `Process`, `Why Choose AI Landing Page Builder`, `Where It Fits`, `We've Got the Answers You're Looking For`, `Smarter Pages. Faster Launches.`; no H3; FAQ Qs are `<p>`.
- Schema none; keywords field empty; images alt None; og image not set; wrapper on 3mindsdigital.com has the same generic meta and shared canonical `/AI-by-3minds` as Page 1.
- Keywords implied: AI landing page builder, AI-generated landing pages, high-converting landing pages, responsive, UX, copywriting, startups, SaaS, marketing campaigns.
- Internal links: same nav as Page 1 with same broken About/Blog targets; no link to sibling AI tools.
- CTAs: Calendly (hero), contact-us (final and nav). No form.

## 2.8 Weaknesses MMC can beat (LP)

- Content: template leftovers visible ("My client satisfaction rate exceeds 95%, highlighting my photography's excellence." under Process; step component default "Ogmonk"; FAQ sub says "AI automation questions"; "Where It Fits" lacks a period/inconsistent punctuation; Edge paragraph missing full stop). No pricing/turnaround tiers, no example output, no before/after, no conversion numbers, no tooling/stack info (Shopify, Webflow, Next.js?), no A/B testing detail, no CRO methodology, no sample gallery link. Use-case videos are empty (posters only). Benefits are generic four-liners.
- Design/dev: the screenshots in the scroll-scrub are shown as flat rasters without device frames; process images are unrelated stock photos (not AI tooling); agencies card reuses the handshake photo from the Sales page; no live "prompt to page" demo which is the obvious hero interaction.
- SEO/AEO: iframe wrapper (thin branded page, duplicate host, same canonical for both pages), no schema (Service, FAQPage, HowTo for the 4-step process would win rich results), no H3s, no alt text, no internal links, no landing-page-specific long tail (Shopify landing page, Meta ads landing page, education admissions landing page), no comparison (AI vs traditional vs template builders).

---

# Cross-page observations for the MMC replication brief

- Pitch pattern: black canvas + single indigo CTA + benefit cards titled "Hidden Benefits" + "Perfect For" segmentation + 4-question FAQ + tri-colon closing line. Both pages share identical section skeleton (badge, H1, sub, CTA, feature story, Hidden Benefits, Perfect For, FAQs, closing CTA), which makes a templated build easy.
- The CTA ladder is Calendly free call (top) then contact-us (bottom); no form.
- MMC leverage: add the three audiences (D2C, B2B, education), real proof, a live chat/prompt demo, pricing bands, schema, real HTML (no iframe).

## What I could not access or verify

- Rendered visual/scroll behaviour was not observed in a browser (no headless browser available); animations are inferred from Framer component props and module code.
- Hero webm `EFy2bsA7jMy4mjnOnRnQTfnI0W4.webm` content not viewed (no ffmpeg); use-case videos have empty srcUrl (not published yet).
- Two SVG connector assets (UAjP2h0lT2nZg3OKnZgPEnLtc, cQtObXMqoOENBJFNHvGo8HO2w) returned AccessDenied when reconstructed from IDs, so their path shapes are unread (their full IDs were copied from module text and may have been mistyped by me).
- Step-to-description mapping in the LP process is inferred by logic; the module lists the four strings out of order.
- WebSearch was not used; source data came directly from the page/module/search-index files.

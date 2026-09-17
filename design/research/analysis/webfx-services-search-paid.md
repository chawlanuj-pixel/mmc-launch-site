# WebFX service pages: search, paid and performance (teardown for MMC)

Scope: 70 WebFX service pages collected 2026-09-15 (every slug starting with seo_services, ppc_services, local_seo_services, amazon_services, digital_advertising_services, lead_generation_services, analytics_services, digital_marketing_services).

Method:
- Quant over all 70 JSON files: `analysis/scripts/webfx_services_quant.py` (tables in `scripts/out/webfx_services_quant.md`) and `analysis/scripts/webfx_services_extra.py` (boilerplate, duplication, CTA placement, proof consistency, FAQ intents; `scripts/out/webfx_services_extra.md`). Hero/FAQ/closing skim of the unread pages: `analysis/scripts/webfx_skim_rest.py`.
- Read in full (26): seo_services, seo_services_ai, seo_services_ai_search_optimization, seo_services_b2b, seo_services_chatgpt_optimization, seo_services_ecommerce, seo_services_enterprise, seo_services_smb, local_seo_services, ppc_services, ppc_services_affordable, ppc_services_ecommerce, ppc_services_enterprise, ppc_services_google_ads_management, amazon_services_advertising, amazon_services_retail_media, digital_advertising_services, digital_advertising_services_youtube, digital_advertising_services_yelp, analytics_services, analytics_services_marketing_mix_modeling, lead_generation_services_lead_management, digital_marketing_services, digital_marketing_services_performance_marketing, digital_marketing_services_conversion_rate_optimization, digital_marketing_services_multi_location.
- The other 44 were skimmed via full H1 to H4 outlines plus title, meta, hero paragraph, first FAQ answer and closing paragraph.

Caveats: `text` is visible text, so carousel slides repeat 2 to 3 times (inflates word counts) and accordion FAQ answers are mostly collapsed (usually only the first answer is captured). Raw schema is truncated at 6,000 characters, so schema counts (FAQPage, Service, Offer) are lower bounds.

## Headline findings

1. **One template, noun-swapped.** 52 of 70 pages (74%) run the same legacy conversion template. Its H2s repeat verbatim: "Pricing custom to you." (49 pages), "Solving key challenges for businesses" (42), "Your search for X ends here" (58), "Unlock a 25% greater marketing ROI with WebFX's award-winning X team" (52 variants). An 8-page 2025-26 redesign (hubs plus AI and enterprise pages) is shorter, more specific and nearly free of duplication.
2. **Proof is plentiful but loose.** The same three SEO/local testimonials (a pediatric dentist, a psychology practice, an IT firm) are the case proof on 42 pages, including Amazon PPC, Walmart, OTT, programmatic, CRO and enterprise PPC. Headline numbers contradict each other across pages, and sometimes on the same page.
3. **Transparent pricing is the strongest differentiator.** A "Starting at $X/month" figure appears on about 60 pages. There is a "How we determine pricing" block on 28 and full tier tables with fee formulas on 15.
4. **Conversion is proposal-led and repetitive.** Median 12 CTA clicks per page, 459 proposal-CTA instances, and one form field ("Enter your website") on every page.
5. **FAQs target search, not objections.** Of 446 visible FAQ questions, 98 are "What is/are X?" and 54 are "How much does X cost?". Only 6 questions, on 4 pages, handle ownership, contracts or minimums.

---

## 1. Service architecture

### 1.1 Disciplines and URL patterns

| Discipline (slug prefix) | Pages | URL pattern | Sub-services in slice |
|---|---|---|---|
| SEO | 18 | `/seo/services/<x>/` | ai, ai-search-optimization (GEO), ai-brand-positioning, chatgpt-optimization, enterprise-ai-search-optimization, b2b, ecommerce, enterprise, smb, consulting, monthly-seo, keyword-research, on-page-seo, off-page-seo, seo-audits, voice-search-content-optimization, wordpress-consultant |
| Local SEO | 1 | `/local-seo/services/` | hub only (pricing calculator per location) |
| PPC | 10 | `/ppc/services/<x>/` | affordable, ai, consultants, ecommerce, enterprise, google-ads-management, google-local-services-ads, landing-page-design, remarketing |
| Amazon | 3 | `/amazon/services/<x>/` | advertising, amazon-seo-listing-optimization-service, retail-media |
| Digital advertising | 12 | `/digital-advertising/services/<x>/` | account-based-marketing, chatgpt, crm-retargeting, geofencing, ott-connected-tv, programmatic, sem, video-advertising, walmart, yelp, youtube |
| Analytics | 3 | `/analytics/services/<x>/` | channel-attribution-forecasting, marketing-mix-modeling |
| Lead generation | 1 | `/lead-generation/services/lead-management/` | lead management |
| Digital marketing (umbrella) | 22 | `/digital-marketing/services/<x>/` | ai, business-consulting, closed-loop-analytics, competitor-analysis, contact-enrichment, conversion-rate-optimization, cookie-consent, digital-due-diligence, digital-recruitment, digital-transformation, ecommerce, ecommerce-pim, end-to-end-marketing-solutions, marketing-operations, multi-location, online-press-releases, packages, performance-marketing, revenue-marketing, revenue-operations, target |

### 1.2 How disciplines are split (manual coding of all 70)

| Split axis | Pages | Examples |
|---|---|---|
| Tactic | 21 | keyword research, on-page, off-page, SEO audits, remarketing, CRM retargeting, geofencing, landing pages, CRO, MMM, attribution, lead management, PIM, press releases |
| Platform | 12 | Google Ads, Google LSAs, Amazon ads, Amazon SEO, Amazon retail media, Walmart, Target Plus, YouTube, Yelp, ChatGPT ads, ChatGPT optimization, WordPress |
| Engagement model | 9 | SEO consulting, PPC consultants, monthly SEO, performance marketing, revenue marketing, end-to-end, digital transformation, due diligence, business consulting |
| Hub | 6 | seo, local seo, ppc, digital advertising, analytics, digital marketing |
| Business model | 6 | ecommerce SEO, ecommerce PPC, ecommerce marketing, B2B SEO, ABM, multi-location |
| AI / emerging | 5 (+1) | AI SEO, GEO, AI brand positioning, AI PPC, AI marketing (+ enterprise GEO) |
| Channel | 4 | SEM, programmatic, OTT/CTV, video |
| Company size | 3 | enterprise SEO ($11,500/mo start), SMB SEO, enterprise PPC |
| Price tier | 2 | affordable PPC, digital marketing packages |
| Use case | 1 | digital recruitment |

Observations:
- **The taxonomy follows keywords, not buyers.** Ecommerce appears three times (`/seo/services/ecommerce/`, `/ppc/services/ecommerce/`, `/digital-marketing/services/ecommerce/`). Marketplaces are scattered: Amazon has its own folder, Walmart sits under digital advertising and Target under digital marketing. SEM (digital advertising), the PPC hub and Google Ads management overlap heavily.
- **Industry pages are absent from this slice.** They live under `/<discipline>/agency/` and `/industries/`. Service pages link to them only lightly (14 body links to agency pages, 30 to industry or location pages).
- **Size and price variants exist mainly to capture modifiers** ("affordable", "enterprise", "small business"). The specialisation is mostly price and team size (see section 3).

### 1.3 Cross-linking (body links only; global mega-menu and footer removed)

| Link target type | Link instances |
|---|---|
| Other service pages | 360 (251 same discipline, 109 other discipline) |
| Case studies / portfolio | 176 |
| Blog | 153 |
| Other (mostly `/learn/` guides, `/martech/`) | 117 |
| Pricing pages (`/seo/pricing/`, `/ppc/pricing/`...) | 83 |
| Industry / location | 30 |
| Agency (industry) pages | 14 |
| Technology (RevenueCloudFX, AdTechFX) | 13 |

- Body links per page: median 12 (p25 7, p75 17, max 65 on seo_services_consulting).
- **Related-services rail:** every page ends with 6 sibling links under a generic H2 such as "Scale your search performance", "Accelerate your ROAS" or "Scale your advertising success" (62 pages). The rail keeps a hub-and-spoke pattern inside each discipline.
- **Table of Contents rail** (57 pages). It carries jump links plus "Learn More / Related Resources" links to `/learn/` and `/pricing/` articles. Relevance is loose: the Amazon retail media page links to "Best Plumbing Marketing Agencies in 2026".
- **Most-linked targets within the slice:** geofencing (13 pages), ChatGPT ads (12), ecommerce SEO (12), end-to-end (11), remarketing, ecommerce PPC, Google Ads management and AI marketing (10 each).
- **Where service pages push people:** every page's header "Get a Proposal" goes to `/free-quote/`. Pricing intent is handed off to a parallel `/pricing/` cluster.

---

## 2. The page template

### 2.1 Families

| Family | Pages | Median words | Notes |
|---|---|---|---|
| A: legacy conversion template | 48 (+4 partial) | 1,914 | near-identical block order, service noun swapped |
| B: 2025-26 redesign | 8 | 1,288 | seo_services, ppc_services, digital_advertising_services, seo_services_enterprise, seo_services_enterprise_ai_search_optimization, seo_services_chatgpt_optimization, digital_advertising_services_yelp, digital_marketing_services_multi_location |
| C: bespoke | 10 | 1,459 | MMM, cookie consent, digital marketing hub, revenue marketing, affordable PPC, landing page design, AI SEO, AI brand positioning, GEO, on-page SEO |

### 2.2 Word counts (visible words, carousels included)

| Group | n | min | p25 | median | p75 | max |
|---|---|---|---|---|---|---|
| All | 70 | 751 | 1,388 | 1,874 | 2,210 | 4,033 |
| Top-level hubs | 6 | 1,212 | 1,323 | 1,914 | 2,297 | 2,345 |
| Sub-service | 64 | 751 | 1,396 | 1,874 | 2,162 | 4,033 |
| PPC | 10 | 1,250 | 1,997 | 2,113 | 2,352 | 4,033 |
| SEO | 18 | 751 | 1,268 | 1,702 | 2,282 | 3,793 |
| Digital advertising | 12 | 942 | 1,590 | 1,796 | 2,158 | 2,492 |
| Digital marketing | 22 | 759 | 1,343 | 1,806 | 1,910 | 2,987 |

- Extremes: shortest is enterprise SEO (751); longest are landing page design (4,033) and SEO consulting (3,793).
- H2s: 794 in total, median 11 per page.
- **Duplication:** for each page, the share of its 8-word phrases that also appear on at least 10 other slice pages is median 23% (p75 35%). The most templated are ecommerce PIM 46%, Target Plus 45%, digital recruitment 42% and due diligence 40%. The least templated are GEO 0%, enterprise SEO 0%, landing page design 1%, SEO hub 1% and MMM 2%.

### 2.3 Canonical template A (the dominant order)

Prevalence comes from exact-string or regex matches across the 70 pages.

0. **Hero stat carousel (sits above the H1).** "93% CLIENT SATISFACTION SCORE / Industry average: 72%" (59 pages), "91% RETENTION RATE / Industry average: 50%" (49), "HIGHER NPS SCORE THAN / Industry average: 16" (48), a one-line Clutch review (58) and "Rated 4.9/5 stars on G2 / Clutch" (61). *Job: borrow trust before the pitch.*
1. **H1 + 2-3 sentence promise + "Send Me a Proposal"** (64 pages). *Job: restate the keyword, name the outcome, offer the next step.*
2. **Trust bar + jump tabs.** "750+ DIGITAL EXPERTS / 30-YEAR TRACK RECORD / 1,100+ REVIEWS / IN-HOUSE TECHNOLOGY" (55) and tab links such as Deliverables / Pricing / Why WebFX / FAQs (66). *Job: scale signal and navigation.*
3. **"What do our X services include?"** (47 exact). Tabbed deliverables; each tab ends with a "Send Me a Proposal" button. *Job: scope.*
4. **Technology block.** "Data-Driven X" / "Data-Powered X" / "Powerful Data Activation for PPC" (32), with "RevenueCloudFX is our proprietary marketing software..." (40) and three stat tiles such as "$500K+ BUILT-IN VALUE" (28). *Job: a moat claim.*
5. **Pricing preview.** "Transparent X Pricing (Tailored to Your Business Goals)" (20) or "Looking for plans and pricing? Get a preview..." (9), with "Starting at $X / month", "How we determine pricing" (28) and "INCLUDED IN ALL PLANS" (22). *Job: pre-qualify and signal openness.*
6. **"Your search for X ends here"** (58) + "When your company partners with WebFX, you:" (49) and 4-9 benefit cards. *Job: reasons to choose.*
7. **Badge "Pricing custom to you. / Starting at $X per month." + "Request a Free Proposal"** (49). *Job: repeat price anchor and CTA.*
8. **Proof.** "Solving key challenges for businesses" with the recycled three-testimonial carousel (42), or named case cards (8). *Job: social proof.*
9. **"Unlock a 25% greater marketing ROI with WebFX's award-winning X team"** (52) plus a 3-column grid: WebFX vs In-House Marketing vs Typical Marketing Agency (58). *Job: objection handling by comparison.*
10. **Education / process.** "Why use/invest in X?" (22), "Our approach to X" or "How we drive results" (process 31%). *Job: SEO depth, persuasion.*
11. **"FAQs about X"** (62 H2s on 60 pages; FAQ block on 67). *Job: long-tail and People Also Ask capture.*
12. **Closing H2** such as "Get started with / Invest in / Grow ... X". The paragraph ends "Contact us online or call us at 888-874-2601" (phone in closing copy on 43% of pages). *Job: final CTA.*
13. **Table of Contents + Related Resources rail** (57).
14. **"View all deliverables in our X" tier table** with Bronze / Silver / Gold / Enterprise columns and a GET STARTED button per column (15), plus "Need more information? Call Us:" (13). *Job: detailed pricing for high-intent readers.*
15. **Reviews rail.** "WebFX has thousands of reviews praising our transparency, communication, and results. 4.9/5 based on over 550 third-party reviews" (60).
16. **Related services rail** (100%).
17. **Sticky footer form.** "Discover how we can help your business grow / Enter your website / Send Me a Proposal!" (70).

The most common exact H2 sequence (6 pages) is: included > tech > ends here > pricing badge > case proof > comparison > why-service > FAQ > closing > related links.

### 2.4 Template B (redesign) order

Seen on ppc_services, seo_services and digital_advertising_services.

1. Hero with a single outcome stat ("15% CPL REDUCTION WITHIN THE FIRST 6 MONTHS", "1.8x FASTER SEO REVENUE GROWTH") and a Clutch quote.
2. Problem framing ("Paid Advertising Isn't Just About Keywords Anymore. WebFX Can Help Your Business Adapt."; "Why the Right Digital Advertising Agency Matters in 2026").
3. Three pillars in tabs ("Expertise / Technology / Adaptability" or "Proactivity").
4. A 10-item deliverables grid.
5. A named employee quote ("How Our PPC Experts Approach Your Success", Kayla J., PPC Analyst).
6. Technology block plus one case, with standalone stat H2s ("141%", "230%", "52%").
7. Pricing card ("PPC Plans Starting At $750 /month for Businesses Looking to Grow in 2026").
8. Reviews, then "Industry Outlook: Ads in ChatGPT and Other LLMs".
9. Comparison grid, then "Work with the Experts at WebFX".
10. Grouped FAQs (service-specific / outsourcing / general), then the related rail.

B pages are shorter and more specific. Yelp and multi-location are the best-written pages in the slice.

---

## 3. Messaging

### 3.1 Core promise

"Revenue, not clicks, proven by our own tech and delivered by a big expert team, at a published price."

Lexicon across the 70 pages (mentions / pages):

| Term | Mentions | Pages |
|---|---|---|
| leads | 689 | 66 |
| AI | 545 | 49 |
| ROI | 506 | 68 |
| revenue | 466 | 68 |
| RevenueCloudFX | 394 | 65 |
| custom / customized | 267 | 65 |
| expert(s) | 200 | 67 |
| transparent / transparency | 158 | 66 |
| ChatGPT | 147 | 27 |
| dedicated | 130 | 51 |
| proprietary | 76 | 48 |
| award-winning | 65 | 45 |
| bottom line | 61 | 34 |
| 2026 | 47 | 22 |
| ROAS | 23 | 12 |
| guarantee | 3 | 3 |

### 3.2 Recurring value props

| Value prop | How it is expressed | Evidence |
|---|---|---|
| Revenue over vanity metrics | "Stop measuring PPC success based solely on clicks." (ppc_services); H4s "Maximize Revenue, Not Just Clicks", "Track Revenue, Not Just Traffic" | ROI/revenue on 68 of 70 pages |
| Proprietary tech | RevenueCloudFX, OmniSEO, AdTechFX; "$500K+ built-in value"; "Powered by IBM Watson" (9 pages); "WebFX is the only SEO company equipped with the power of RevenueCloudFX" (seo_services) | 65 pages |
| Scale of team | "750+ digital experts", "over 3 million hours of combined expertise" (5), "9:1 FXer per client ratio" (seo_services) | 59 pages |
| Transparency | published prices, pricing factors, "Who owns my ad account? You do!" (ppc_services) | 66 pages |
| Custom, not cookie-cutter | "cookie-cutter" used as the foil on 8 pages plus the comparison grid ("Cookie-cutter checklists and solutions") | 65 pages say custom |
| Done for you | "We're a 'do-it-for-me' agency" (lead management), "Set your involvement level" | common in reason cards |
| AI plus human | "Expertise That Balances Human & AI"; "SEO Services Made Smarter with AI, Guided by Experts" | 49 pages mention AI |
| Averages as promises | "Unlock a 25% greater marketing ROI" (31 H2s), "20% increase in ROI" (14), "15% CPL reduction within 6 months" | 52 pages |
| Future-proofing | 2026 year stamps, ChatGPT ads, GEO pages | 22 pages |

### 3.3 How they differentiate

- **Against in-house and "typical agency", not named competitors.** The comparison grid (58 pages) contrasts: an in-house implementation team vs "will need your help implementing"; their own platform vs "third-party tracking... with subscription costs passed to you"; "24/7 help desk" vs "regular, but unreliable support". It is structural (team + tech + support), so it transfers to any service, which is also why it reads as generic.
- **Proprietary software as the moat.** Nearly every "why" card routes back to RevenueCloudFX.
- **Price transparency** as a trust act ("we publish all our prices and deliverables online", amazon_services_advertising).

### 3.4 How sub-service pages specialise

- **Template A pages:** only the H1, deliverables tabs, pricing factors and FAQ nouns change. The hero carousel, trust bar, reason cards, recycled testimonials, comparison grid and reviews rail stay identical.
- **Better specialisation (worth studying):**
  - *Amazon PPC:* ACoS language, Sponsored Brands vs Sponsored Products, Subscribe & Save and Lightning Deals, "We recommend a minimum ad spend of $2,000/month for typical SMB businesses", and a fee table of "$975/mo. or 15% of ad spend, whichever is greater" up to "$12,000/mo. or 10%".
  - *Affordable PPC:* redefines "affordable" as scope ("Right-sized scope based on your goals", "Spend controls and exclusions") with anonymised client tiles listing challenge and initiatives.
  - *Enterprise SEO / PPC:* higher entry price ($11,500), "9+ dedicated specialists per client", CRM integrations, Google Premier Partner criteria.
  - *Yelp:* partner access, "You get to keep your Yelp page", "Tracked revenue instead of Yelp's lead count", 90-day read window, "Advertising on Yelp didn't work for me before. Why try again?".
  - *ChatGPT optimization:* splits visibility from perception ("two different jobs"), with a named ELEVATE process.
  - *MMM:* questions the service answers ("Where should you allocate your budget?"), Google Meridian certified partner, who benefits.
  - *B2B SEO:* pipeline language and a named R.O.C.K.E.T. framework.
  - *Multi-location:* one named 500-location case (KOA, 260% organic revenue).

---

## 4. Copy style

### 4.1 Headline formulas

H1 patterns (70 pages):

| H1 pattern | Pages | Example |
|---|---|---|
| "X Services That [outcome]" | 22 | "PPC Management Services That Turn Ad Spend into Qualified Leads" |
| "X Services: [benefit]" | 13 | "Ecommerce SEO Services: Grow Your Online Sales" |
| "X Services for/to [outcome]" | 13 | "Google Ads Management Services for PPC Growth & ROI" |
| Imperative verb first | 13 | "Make Lead Gen Predictable With B2B SEO Services" |
| Bare keyword | 12 | "Video Advertising Services" |
| Number in H1 | 7 | "Digital Advertising Services That Drive 15% Lower CPL and Higher ROI" |

H2 formulas (794 H2s):

| H2 formula | H2s | Pages |
|---|---|---|
| Closing verbs ("Get started with / Invest in / Grow... X") | 114 | 60 |
| "Scale / Accelerate / Maximize your X" (related rail) | 63 | 62 |
| "FAQs about / on X" | 62 | 60 |
| "Your search for X ends here" | 58 | 58 |
| "Unlock a N% ... with WebFX's award-winning X team" | 52 | 52 |
| "Pricing custom to you." / "Starting at $X per month." | 49 / 49 | 49 |
| "What do (our/your) X services include?" | 47 | 47 |
| "Solving key challenges for businesses" | 42 | 42 |
| "Data-Driven / Data-Powered / Powerful Data Activation for X" | 32 | 32 |
| "Why (use/invest in/choose) X?" | 22 | 21 |
| "Transparent X Pricing" | 20 | 20 |
| Standalone stat as H2 ("141%", "91%", "2018") | 14 | 8 |

### 4.2 Title tag and meta formulas

**Title tags:** median 56 characters (max 64).

| Title feature | Pages |
|---|---|
| No brand in title | 48 |
| Outcome word (ROI, revenue, sales, leads, growth) | 28 |
| Pipe separator | 25 |
| Ends "\| WebFX" | 16 |
| Contains a number | 13 |
| Superlative (Top / Best / Expert / Leading) | 9 |
| Contains % | 7 |
| Bracketed claim | 1 |

Title formulas:
- "[Service] [That / for] [Outcome]", e.g. "Programmatic Advertising Agency That Boosts Your ROI"
- "[Service] | [Claim] | WebFX", e.g. "SEO Consulting Services | Achieve 20% Higher ROI With WebFX", "Business Consulting Services | Unlock 750+ Experts - WebFX"
- Bracketed claim, once: "Top PPC Management Services [25% Lift in PPC Sales]"
- Claim in title: "Account-Based Marketing Agency With $10B in Client Revenue", "Top-Rated Digital Advertising Services That Cut CPL By 15%"

**Meta descriptions:** median 143 characters.

| Meta feature | Pages |
|---|---|
| Names WebFX | 52 |
| Exclamation mark | 37 |
| Ends with a "today / now" CTA | 22 |
| Opens with a question ("Need X?", "Looking for...") | 10 |

The typical formula is "[Need X? / Outcome verb] with WebFX's award-winning X. [Proof or feature]. [Get a free quote / Learn more] now!". Example: "Need PPC management services? Trust WebFX to provide PPC services that accelerate your sales and lead generation efforts. Get a free quote now!" (ppc_services).

### 4.3 Voice and mechanics

- **Plain, short, American SMB register.** Mean sentence length per page is 13 words (p25 12, p75 14); only 6% of sentences exceed 25 words.
- **Company-centric despite the "you" framing.** Median ratio is 81 you/your per 100 we/our/WebFX, so self-reference wins on half the pages.
- **Clichés recur:** "look no further" (5 pages), "no strangers to" (3), "skyrocket" (2), "game changer" (2), "piece of cake", "kiss all those costs goodbye".
- **Em dashes:** median 2 per page, max 16.
- **Keyword stuffing / synonym cycling:**
  - "enterprise SEO" 29 times in 751 words (38.6 per 1,000, seo_services_enterprise); "off-page SEO" 14.9 per 1,000; "remarketing services" 10.3; "Google Ads management services" 17 times (8.6).
  - One Amazon page cycles "PPC services for Amazon", "PPC agency for Amazon", "PPC management agency for Amazon", "PPC company for Amazon" and "advertising companies for Amazon".
  - Keyword insertion breaks grammar: "Grow your revenue with a custom conversion optimization services" (CRO H2); "What can a professional digital marketing company can do for you?" (digital marketing FAQ); "How can small businesses with avoid wasted PPC spend?" (affordable PPC FAQ); "SEO Services for Amazonamazon" (related rail).

### 4.4 CTA wording

The dominant construction is a first-person request for a low-commitment deliverable ("Send Me a Proposal"). Proposal CTAs outnumber quote and strategy CTAs roughly 20 to 1.

| Label | Pages | Instances |
|---|---|---|
| Get a Proposal (header) | 70 | 142 |
| Send Me a Proposal! (sticky footer) | 70 | 70 |
| Send Me a Proposal | 64 | 177 |
| Check out our client testimonials | 59 | 118 |
| Request a Free Proposal | 49 | 49 |
| Get My Custom Quote | 16 | 16 |
| GET STARTED (tier tables) | 15 | 56 |
| Get My / Request My Custom Strategy | 16 | 18 |
| Get My Custom / Free Proposal | 11 | 11 |

Buckets by instance: proposal 459, phone 140, proof 135, get started 56, explore/learn 51, quote 22, strategy 20.

### 4.5 Verbatim lines

| # | Line (verbatim) | Slug | Read |
|---|---|---|---|
| 1 | "Stop measuring PPC success based solely on clicks." | ppc_services | Strong: names the buyer's frustration in 7 words |
| 2 | "Affordable PPC management isn't about buying cheap clicks or cutting corners." | ppc_services_affordable | Strong: reframes a price modifier as scope |
| 3 | "You get a straight answer either way. If the demand in your market will not support advertising yet, you hear that before you commit spend." | digital_advertising_services_yelp | Strong: honesty as differentiation |
| 4 | "Yelp reports leads, and a lead in Yelp's dashboard is not the same thing as a booked job." | digital_advertising_services_yelp | Strong: platform metric vs business metric |
| 5 | "Showing up in a ChatGPT answer and being described well in that answer are two different jobs." | seo_services_chatgpt_optimization | Strong: sharp distinction that structures the page |
| 6 | "Every visitor your site fails to convert is revenue lost." | digital_marketing_services_conversion_rate_optimization | Strong: loss framing |
| 7 | "Every month you market without location-level attribution, budget keeps flowing to markets you only assume are working, while the locations that actually drive revenue stay underfunded." | digital_marketing_services_multi_location | Strong: cost of inaction, no stats |
| 8 | "While not the cheapest choice, WebFX's custom SEO services are worth the investment for small businesses looking to move up market." | seo_services_smb | Strong: admits price position |
| 9 | "Who owns my ad account? You do!" | ppc_services | Strong: kills the biggest agency objection |
| 10 | "If you're debating about investing in PPC management services for Amazon, don't." | amazon_services_advertising | Weak: reads as "don't invest"; keyword-stuffed |
| 11 | "...so we can take care of analyzing your data and implementing optimizations while you sit back and watch the revenue roll in." | analytics_services | Weak: over-promise, cliché |
| 12 | "Well, you can kiss all those costs goodbye with an agency." | digital_marketing_services | Weak: glib, unsupported |
| 13 | "Ecommerce SEO is the online equivalent of placing a huge sign in front of a brick-and-mortar storefront that says, "We carry dog toys!" or "We sell cat supplies!"" | seo_services_ecommerce | Weak: filler analogy on a money page |
| 14 | "WebFX is the only SEO company equipped with the power of RevenueCloudFX. With more than 1 billion billion data points and 1,200+ tool integrations..." | seo_services | Weak: tautological "only" claim plus typo |
| 15 | "Off-Page SEO Services: 100% Genuine and Spam Free" | seo_services_off_page_seo (H1 and title) | Weak: defensive claim puts "spam" in the buyer's head |

---

## 5. Proof inside service pages

### 5.1 Proof inventory

| Proof type | Prevalence | Example | Verifiability |
|---|---|---|---|
| Agency-wide stat tiles with "industry average" | 93% satisfaction vs 72% (59 pages); 91% retention vs 50% (49); NPS vs 16 (48) | hero carousel | No source, no method, no date for either WebFX's figure or the "industry average" |
| Trust bar | 55 pages | "750+ DIGITAL EXPERTS / 30-YEAR TRACK RECORD / 1,100+ REVIEWS" | Partly checkable (Clutch/G2), but see conflicts below |
| Outcome averages as H2 promises | 52 pages | "Unlock a 25% greater marketing ROI..."; "15% CPL REDUCTION WITHIN THE FIRST 6 MONTHS" | Attributed to RevenueCloudFX; no base, sample or period |
| Survey comparator | 5 pages | "1.8x FASTER SEO REVENUE GROWTH over industry average. Source: Deloitte's 2025 CMO Survey." | Only formal "Source:" lines in the slice; compares client growth to a survey average |
| Recycled testimonial carousel | 42 to 44 pages | Hurst Pediatric Dentistry "540% increase in leads from organic search"; Merrimack Valley Psychological Associates "2X revenue in six months"; Net Friends "2X increase in website traffic and leads" | Named and linked, but SEO/local results used on Amazon PPC, Walmart, OTT, programmatic, CRO, enterprise PPC, ecommerce SEO |
| Named case cards | 8 pages, 53 distinct clients (Google Ads page shows 25, local SEO 13) | "2118% YOY INCREASE IN REVENUE FROM AMAZON ADS / York Saw & Knife Co., Inc. / Manufacturing... / 51-200 / B2B / Services: SEO, PPC... / Read Case Study" | Best format: client, industry, employee band, B2B/B2C, services, stack, one metric, link |
| Anonymised challenge tiles | 3 pages | "Jewelry Store Client / CHALLENGE: Drive in-person appointments... / RECENT INITIATIVES: Test performance max campaigns... / 348% INCREASE IN PPC ROAS" | Specific on actions, unverifiable on client |
| Unnamed narrative case | 2 pages (ppc and digital advertising hubs) | "Automation + Human Expertise = Growth": 141% conversions, 230% conv. rate, 52% lower CPL | Clear narrative; no client, period or spend |
| Extreme inline numbers | affordable PPC | "Ceramcor (38,293% increase after a campaign overhaul)"; "Cadd Words: 1,000% over 90 days" (metric not named) | Low credibility |
| Customer quotes | 58 pages | "I have 16 years of industry experience, and WebFX is the best agency I've ever worked with." Flavia A, Review from Clutch.co | First name plus initial; same quote on most pages. Redesign uses role and industry ("Executive, Healthcare (Anonymous Review from Clutch.co)") |
| Employee expert quotes | 7 pages | "Most of the things that quietly hurt organic performance never announce themselves..." Jordan D., Head of Search Performance | Adds expertise without numbers |
| Partner badges / awards | Google Premier Partner (7 pages; enterprise PPC explains criteria incl. "Our 90-day ad spend exceeds $10,000 USD"); Yelp Advertising Partner; Google Meridian MMM Certified Partner; "220+ awards"; "115+ SEO AWARDS Won in 2026 Alone"; Clutch "#1 out of 300,000 businesses" | varies | Checkable; the criteria explanation is a good pattern |

### 5.2 Numbers that conflict across pages or on the same page

This is the clearest sign of weak proof governance.

| Claim | Values found |
|---|---|
| Review count | "1,100+ REVIEWS" (trust bar, 55 pages); "based on over 550 third-party reviews" (60 pages); "860+" (seo_services); schema ratingCount 441 (21 pages) and 437 (1); "thousands of reviews" (60 pages). Many pages show 1,100+, 550 and 441 at once. |
| Headcount | "750+" and "500+ digital marketing experts" on the same page (41 pages); "450+ SMEs" in SEO tier tables; the WordPress page title says "500+ WordPress SEO Experts" while its hero says "750+ WordPress SEO experts" |
| Client revenue | "$10 billion" (34 pages); "$6 billion" (AI marketing, AI PPC, voice search); "$1.5 billion in revenue in the past five years" (ecommerce PPC); header "$10,085,355,239+" |
| Experience | "30 years" (most); "29+ years" (ppc and digital advertising hubs); "With over a decade of experience" (analytics_services) |
| Price | monthly SEO meta says "Plans start from $500/month"; the page says "Starting at $3,000"; ecommerce SEO shows "$2,500 / month" in the pricing card and "$3,000 per month" in the badge |

Outbound citations are rare: business.yelp.com (5), clutch.co (4), support.google.com (4), learn.g2.com (3), wordstream.com (3, including a 2012 post), unbounce.com.

**Verdict:** high proof volume, low precision. Proof is agency-level, not service-level, and its inconsistency is visible to any careful reader. MMC's "four published figures, never invented" rule is an advantage if the four numbers are used consistently and explained.

---

## 6. Conversion design

### 6.1 CTA count and placement

- Clickable CTAs per page (excluding login, menu, carousel arrows): median 12 (p25 11, p75 15, max 26 on digital marketing packages).
- Distinct CTA labels per page: median 7 (max 15).
- In-body CTA buttons (excluding header, phone and sticky footer): median 6 per page, max 13.
- Placement by decile of page text:

| Position | 0-10% | 10-20% | 20-30% | 30-40% | 40-50% | 50-60% | 60-70% | 70-80% | 80-90% | 90-100% |
|---|---|---|---|---|---|---|---|---|---|---|
| CTA buttons | 30 | 62 | 51 | 34 | 32 | 26 | 13 | 29 | 55 | 110 |

CTAs cluster at the hero and deliverables tabs (a button per tab) and again at the bottom (tier-table GET STARTED columns, closing paragraph, reviews rail). The dip at 60-70% is the comparison and education zone.

### 6.2 Forms, phone and proposal framing

- **One field.** "Enter your website" is the only visible field: 154 instances, 2 per page, sticky footer on 70 of 70. The header "Get a Proposal" leads to `/free-quote/` (a multi-step flow starting from the URL).
- **Two inline pricing calculators:** local SEO ("Number of locations" gives "Total monthly cost ($)") and B2B SEO (business size, target market location, industry competition, locations, content creation, then "Calculate").
- **The proposal is framed as a free deliverable.** "receive your digital marketing proposal, which will include a custom strategy, pricing, and flight plan" (digital_marketing_services); "Get started today by requesting a custom proposal, which will provide your team with a flight plan, strategy, and pricing" (local_seo_services).
- **Phone** appears on all 70 (header and footer) and in body copy on 50 pages. Tracking-number variants: 888-874-2601 (50 in body), 888-256-9448 (9), 717-423-8848 (1).

### 6.3 Pricing teasers

| Service | Starting price / model |
|---|---|
| PPC (8 of 10 pages), SEM, programmatic, Yelp, ChatGPT ads, digital advertising hub | $750/mo |
| Ecommerce PPC, YouTube | $975/mo |
| Amazon PPC, Walmart, Target Plus | $1,000/mo (Amazon: "minimum ad spend of $2,000/month" recommended) |
| Amazon SEO | $1,300/mo |
| Geofencing | $550/mo |
| Local SEO | $575 per location/mo; $1,325+ with content |
| CRO | $1,500 badge; tiers $1,800 / $3,600 / $9,200+ |
| SEO (most SEO and digital marketing pages) | $3,000/mo |
| GEO | $3,000/mo; 8 tiers to $68,250 "(6-month commitment)" |
| SMB / B2B SEO tables | $8,600 to $21,400 "Initial campaign investment (Two month duration)", then $2,800 to $9,200/mo "(6 month commitment)" |
| Enterprise SEO | $11,500/mo |
| Performance marketing, press releases | $300/mo (anomalous) |

- **Fee formulas** are shown on 9 pages as % of ad spend: "$975 or 15% of spend, whichever is higher"; "$4,500 or 12% of ad spend, whichever is greater"; "$12,000/mo. or 10% of ad spend" (Amazon); video "15% of ad spend".
- **"How we determine pricing"** (28 pages) lists the factors:
  - Paid: monthly ad spend, reach/international, networks, creative needs.
  - SEO: website size, content needs, consultation needs.
  - Ecommerce SEO: number of products, asset creation, partnership needs.

### 6.4 Objection handling in FAQs

- 446 visible FAQ questions on 67 pages; median 6 per page, max 23 (geofencing).

| Intent | Questions | Pages |
|---|---|---|
| Definition ("What is / are X?") | 98 | 55 |
| Cost / pricing | 54 | 45 |
| AI / ChatGPT / LLMs | 54 | 15 |
| What's included / types | 45 | 28 |
| Worth it / benefits | 43 | 32 |
| How it works | 43 | 24 |
| Other | 39 | 21 |
| Choosing / hiring an agency | 28 | 18 |
| Measurement / results | 14 | 13 |
| Timeline | 10 | 8 |
| Eligibility / fit | 9 | 8 |
| Ownership / contract / minimums | 6 | 4 |

Most common normalised questions (X = service):

| Question | Pages |
|---|---|
| "What are X?" | 26 |
| "How much do X cost?" | 16 (+5 "How much do X services cost?") |
| "What is X?" | 4 |
| "What are X services?" | 4 |
| "What do X include?" | 4 |
| "What are the benefits of X?" | 3 |
| "How does X work?" | 3 |

The rare real-objection questions, and where they appear:
- "Who owns my ad account?", "What is the minimum ad spend for working with your PPC agency?", "What is the minimum contract length for your PPC services?" (ppc_services)
- "Do your SEO management services have a minimum contract length?", "Who will manage my account?", "Should I invest in SEO services in the USA or go abroad?" (seo_services; note the offshore-agency objection)
- "Do PPC consultants own my company's Google Ads account?" (ppc_services_consultants)
- "Can WebFX take over an existing Yelp ads campaign?", "Who owns my Yelp page?", "Advertising on Yelp didn't work for me before. Why try again?" (yelp)

The comparison grid (58 pages) does most of the objection work instead of the FAQ.

---

## 7. SEO and AI-search mechanics

### 7.1 Schema (pages with type; lower bound because of truncation)

| Type | Pages | Notes |
|---|---|---|
| WebPage, BreadcrumbList, Organization, WebSite, SearchAction | 70 | sitewide graph |
| VideoObject | 60 | explainer videos with AI-written descriptions |
| Service | 33 | some use OfferCatalog (8), Offer (9), UnitPriceSpecification (4: priced plans) |
| Product + Brand + AggregateRating | 25 | "PPC Services for Amazon" as a Product with "ratingValue":"4.9","ratingCount":"441" on 21 pages. Self-serving review markup on a service is a policy and credibility risk |
| LocalBusiness (Harrisburg HQ) | 24 | |
| FAQPage | 13 | only 9 with questions captured, although 67 pages have a visible FAQ block, so FAQ schema is inconsistent |
| Article + Person | 1 | ppc_services_affordable (authored page) |
| HowTo | 1 | |

### 7.2 Keyword targeting and depth

- **Keyword model:** one head term per URL, with modifiers split into separate URLs (services / agency / company / consultant / management / packages / affordable / enterprise / ecommerce / B2B / AI).
- **The exact phrase repeats** in H1, first sentence, every "What do our X include / Your search for X / FAQs about X" H2, FAQ questions and alt text.
- **Definition-first rewrites.** Newer rewrites open with an extractable definition sentence, which suits AI Overviews and LLM citation:
  - "Google Ads management services help businesses create, optimize, and manage PPC campaigns to improve leads, sales, and ROI." (google_ads_management)
  - "Small business SEO services help businesses increase visibility, attract qualified traffic, and generate more leads from search engines." (smb)
  - "Keyword research services help businesses discover the search terms their target audience uses..." (keyword_research)
  - The same pattern appears on remarketing, LSAs and AI PPC.
- **The FAQ block mirrors People Also Ask.** "What are X?" and "How much do X cost?" come first, with a 1-2 sentence answer, e.g. "SEO services help your site rank higher, attract more visitors, and drive more revenue." (seo_services).
- **AI-search coverage is a dedicated cluster:** GEO, ChatGPT optimization, AI brand positioning, enterprise GEO, ChatGPT ads, plus OmniSEO tracking. The Yelp page even cites AI-citation behaviour ("91% to 97% of Yelp citations appear in response to prompts that do not name a specific business").
- **Depth vs thin:** pages look long (median 1,874 words) but carousels triplicate text, and a median 23% of phrases are shared templates. The umbrella `/digital-marketing/services/*` pages are the thinnest in unique content (37% to 46% shared). Bespoke 2025-26 pages are 0% to 5% shared.
- **Freshness signals:** every dateModified falls in 2026-05 to 2026-09 (11 in September 2026). "2026" appears in copy on 22 pages and in 7 H1/H2s on 5 pages; related-resources links are year-stamped ("Best Lead Generation Companies [2026 Rankings]").
- **Cannibalisation risk:** SEM vs PPC hub vs Google Ads management; performance marketing vs digital marketing hub vs packages vs end-to-end; three ecommerce pages across SEO, PPC and umbrella.

---

## 8. What MMC should adopt, adapt and avoid

### 8.1 Adopt (specific)

1. **One URL per buyer query, predictable pattern.** Discipline hub first, then platform, model or tactic children. For MMC: performance media hub, then Meta ads, Google ads, Amazon ads, quick commerce ads; conversion and technology hub, then Shopify, websites, CRO. Build a child only where MMC has real delivery and proof.
2. **Definition-first subhead.** The first sentence under the H1 should say what the service is and does in plain words (Google Ads management and SMB SEO patterns). It is extractable by Google and LLMs.
3. **"What's included" tabs** with a short checklist per tab and a link to the related MMC service.
4. **"How we price" factors block**, copying the structure of WebFX's "How we determine pricing": spend, channels, creative volume, markets, scope. Add what every engagement always includes.
5. **Real objection FAQs, placed first:** who owns the ad accounts, minimum commitment and notice, minimum spend, who does the work, what happens if you leave, how long before you judge results. The ppc_services and Yelp FAQs are the model.
6. **Named case cards** with a tag strip (category | stage | model, services, stack) and a link to the full case, used only for MMC clients who have approved it.
7. **Named operator POV quote** per service (WebFX's "How Our PPC Experts Approach Your Success"). This is expertise without numbers.
8. **The "straight answer" fit check** ("If the demand in your market will not support advertising yet, you hear that before you commit spend"). It matches MMC's honesty stance.
9. **Low-friction first step.** A website URL field that opens MMC's existing audit modal. Embed the relevant MMC calculator in context, as WebFX does with its local SEO location calculator.
10. **Supporting mechanics:** Table of Contents jump links, a related-services rail, BreadcrumbList + Service + FAQPage schema, with FAQ answers visible in HTML.

### 8.2 Adapt (for India, D2C and MMC's rules)

1. **Replace WebFX's stat carousel** (unsourced satisfaction, retention and NPS versus "industry average") with MMC's four published figures only: 8.7x median blended ROAS, ₹248Cr+ revenue compounded, 14/14 clients renewed, 27 months median tenure. Use identical wording and order on every page, each with a "how we calculate this" footnote link. The lesson from WebFX's 441/550/860/1,100 review counts is that consistency is the proof.
2. **Swap US platform nouns for Indian buying contexts:** Meta, Google (Search, Performance Max, YouTube), Amazon Ads, quick commerce (Blinkit, Zepto, Swiggy Instamart), Shopify. Use D2C metrics buyers use: blended ROAS, CAC, contribution margin, repeat rate, and COD/RTO where relevant. For B2B use qualified leads and pipeline; for education, cost per application or enrolment.
3. **Pricing in rupees without inventing numbers.** Publish the pricing factors and engagement models. Publish a starting point, minimum spend or commitment only once MMC decides to; mark these as open decisions, not copy.
4. **Proposal becomes audit.** WebFX's "Send Me a Proposal" works because the deliverable is concrete. MMC's equivalent is the audit, so keep one first-person verb family ("Get my free audit", "Book my audit call") and state what the audit contains.
5. **Honest comparison grid.** MMC vs in-house hire vs freelancer vs generalist agency, including rows where in-house is the better choice. WebFX's grid never concedes anything.
6. **Discipline-matched proof only.** If a sub-service has no approved case, show process and operator POV instead of borrowing proof from another discipline.
7. **Date freshness honestly.** Show "Updated [month year]" instead of stamping years into H1s and H2s the way WebFX does ("...in 2026 and Beyond").

### 8.3 Avoid

1. Recycling the same testimonials across unrelated services (WebFX: 42 pages).
2. Averages as promises ("Unlock a 25% greater marketing ROI") and unsourced "industry average" comparisons.
3. Conflicting numbers across pages (reviews 441/550/860/1,100; experts 450/500/750; revenue $1.5B/$6B/$10B; "over a decade" vs 30 years; $500 vs $3,000 starting price).
4. Extreme percentages without metric, baseline or timeframe ("38,293% increase").
5. Keyword stuffing, synonym cycling and keyword insertion that breaks grammar.
6. Product + AggregateRating self-review schema on service pages.
7. CTA sprawl: 12 to 26 CTAs, 7+ label variants and a button under every tab. Pick 5 or 6 placements and one verb family.
8. Near-duplicate sub-service pages (40%+ shared copy) and carousels that triplicate content.
9. Clichés ("look no further", "sit back and watch the revenue roll in", "skyrocket", "game changer", "kiss all those costs goodbye").
10. Stat carousels above the H1 that push the promise down the page.
11. Em dashes (WebFX median 2 per page; banned for MMC).
12. Defensive H1 claims that plant doubt ("100% Genuine and Spam Free").

---

## 9. Recommended MMC service page template

Worked example: a performance media child page, **Meta ads for D2C brands**.

Rules for every section:
- No em dashes.
- The only numbers allowed are MMC's four published figures.
- Anything in [brackets] must be filled with real, approved facts or cut.

| # | Section | Job | Copy direction (MMC voice) |
|---|---|---|---|
| 1 | **Hero:** breadcrumb, H1, definition-first subhead, primary + secondary CTA | Match the query, state the business outcome, give one next step | H1 formula: "[Service] for [audience] that [outcome in their metric]". Example: "Meta ads for D2C brands, run for profit, not just clicks". Subhead: "Meta ads management from Monday Marketing Company plans, launches and scales your Facebook and Instagram campaigns, with creative, tracking and reporting built around blended ROAS and CAC." Primary CTA: "Get my free ads audit" (opens audit modal). Secondary: "See how we price" (anchor). |
| 2 | **Proof strip** | Instant, consistent, verifiable trust | Exactly: "8.7x median blended ROAS", "₹248Cr+ revenue compounded", "14/14 clients renewed", "27 months median tenure". Same order and wording sitewide, plus a "How we calculate these" link. Nothing else numeric. |
| 3 | **Who this is for, and who it isn't** | Qualify; show honesty early | Two short lists. Fit: "You sell online in India and want one team owning media and creative." Not yet a fit: "[condition MMC agrees, e.g. no conversion tracking in place and no plan to add it]". Close with a straight-answer line: "If Meta is not the right next rupee for your brand, the audit will say so." |
| 4 | **The problem, in the buyer's metric** | Name the pain without borrowed stats | Three cards, one line each, e.g. "Platform ROAS looks fine, the bank account disagrees." / "Creative wears out faster than you can brief it." / "Scaling spend quietly breaks your unit economics." |
| 5 | **What's included** (tabs) | Scope clarity; internal links | Tabs: Account structure and strategy; Creative and UGC (link to Creative & UGC page); Tracking (pixel, Conversions API, GA4, Shopify); Testing and scaling; Reporting; Handoff to retention (link). Each tab: 2 sentences plus a 4-item checklist. One CTA after the tabs, not per tab. |
| 6 | **How we work** | Reduce uncertainty about the first weeks | Ordered steps: Audit, Plan, Launch, Test and scale, Monthly review. Add durations only if MMC confirms them; otherwise "Here is the order we do things in, and what you get at each step." |
| 7 | **Operator POV** | Expertise without numbers | A real quote from the named MMC lead for this channel on how they judge a Meta account, with name, role and photo. |
| 8 | **Proof that matches this service** | Specific, approved evidence | 1 to 3 case cards: client name (or approved descriptor), category, stage, model, services and stack tags, 3 initiatives, the result only if the client has approved it, "Read the case" link. If no approved case exists for this service, drop the section; never borrow from another discipline. |
| 9 | **How we price** | Transparency without invented figures | Factors: monthly ad spend, channels in scope, creative volume, markets/languages, retention scope. "Always included": [MMC list]. Commitment and notice period: [MMC to confirm]. Embed the relevant MMC calculator (e.g. break-even ROAS). CTA: "Get a quote for my brand". |
| 10 | **Honest comparison** | Handle "why not in-house or a freelancer?" | Columns: MMC / in-house hire / freelancer / generalist agency. Rows: who makes creative, who owns ad accounts and data (you, in every column MMC can truthfully state), tracking setup, reporting cadence, cost predictability, "better choice when...". Concede where others win. |
| 11 | **FAQs** (6 to 10, answers visible, FAQPage schema) | Objections first, then search definitions | 1 "Who owns the ad accounts and data?" 2 "Is there a minimum spend or contract?" 3 "How long before we judge results?" 4 "Do you make the creative?" 5 "Can you run Amazon and quick commerce alongside Meta?" 6 "How do you report ROAS: platform or blended?" 7 "What happens if we part ways?" 8 "What is Meta ads management?" (two-sentence definition) 9 "How much does Meta ads management cost in India?" (answer with pricing factors, link to section 9). |
| 12 | **Related services + tools rail** | Hub-and-spoke linking | "Pairs well with": Creative & UGC, Retention, Shopify CRO, Google ads. Plus 1 or 2 relevant calculators. |
| 13 | **Closing CTA** | One promise, one action | "Send us your site and your monthly spend. We'll tell you what we would change first, and whether we're the right team to do it." Button: "Get my free audit". Secondary text link: "Prefer to talk? Book a call." |
| 14 | **Sticky mobile CTA** | Persistent low-friction entry | Single button: "Get my free audit" (same modal). |

### 9.1 Page spec

- **Length:** 1,200 to 1,800 unique words. No carousels that duplicate text; tabs render content once.
- **CTAs:** 5 or 6 placements (hero, after tabs, pricing, after proof or comparison, closing, sticky) and one verb family ("audit"). Measure clicks per placement.
- **Title:** "[Service] for [Audience] in India | Monday Marketing Company", 60 characters or fewer, or "[Service] Agency for D2C Brands | MMC". No bracketed claims, no numbers beyond the four.
- **Meta description:** definition, then differentiator, then a calm CTA, e.g. "Meta ads management for D2C brands: media, creative and tracking run by one team and reported on blended ROAS. Get a free audit." No exclamation mark.
- **URL:** `/services/<discipline>/<child>/`, e.g. `/services/performance-media/meta-ads/`.
- **Schema:** BreadcrumbList; Service (provider Organization, areaServed India, serviceType); FAQPage with visible answers. No Product or AggregateRating.
- **Voice:** "you" at least as often as "we" (WebFX sits at 81 per 100); median sentence under 20 words.
- **Banned words:** look no further, skyrocket, game changer, cookie-cutter, guaranteed.
- **Architecture:**
  - Five discipline hubs from MMC's service list (performance media, creative & UGC, retention, conversion & technology, brand & packaging).
  - Platform children under performance media (Meta, Google, Amazon, quick commerce).
  - Model children (D2C, B2B, education) only where there is approved proof and search demand.
  - One page per intent, to avoid WebFX's SEM / PPC / Google Ads overlap.

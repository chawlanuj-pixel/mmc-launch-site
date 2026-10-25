# MMC: SEO, AEO and GEO Growth Plan (PRELIMINARY)

Prepared 2026-09-28 by the SEO Strategy Lead, consolidating Workstreams A to E.
Supporting evidence: `appendix/A-site-audit.md`, `appendix/B-market-research.md`, `appendix/C-aeo-geo-research.md`.

## Read this first

**This plan is preliminary.** No GA4, Search Console, CRM, sales material or case-study results were available. Search research used a US-located search tool that returns titles and URLs only. It does not expose keyword volumes, People Also Ask, AI Overviews or localized SERPs.

- Every volume, CPC and difficulty figure is **not verified**. Where a number would matter, this plan names the tool that verifies it.
- Every SERP observation was made on 2026-09-28, on Google-style results via WebSearch, US-located. India, UK and UAE queries carry market terms but are not localized SERPs.
- "Demand evidence" therefore means SERP density (how many agencies compete for a phrase). It is not search volume.
- Market-size figures are context only, not evidence that buyers search for MMC.
- No claim below promises rankings, leads, citations or AI visibility.

### Five things to decide before any content work

1. **Domain.** The live apex (mondaymarketing.company) is an old WordPress site. `www` 301s to the apex. The new build uses `https://www.` in every canonical, sitemap URL and schema ID. Pick one, then align everything to it.
2. **What is true about MMC.** The repo states different things: a team of four in Thane (llms.txt), 28 employees and areaServed India/UAE/UK/US (schema.json), satellite teams in Bengaluru, Dubai, London and New York (contact page). Only the Thane address is verifiable. Public LinkedIn shows a Pennsylvania HQ and offices in Thane and Indore. One version must be chosen and applied everywhere.
3. **Proof.** The client book lists brands with no results. The headline numbers on the site (8.7x, ₹248Cr+, 27 months, 240+) have no source in the repo. Publish only what MMC can document and has permission to show.
4. **Qualified lead definition** (proposed in Deliverable G, needs MMC sign-off).
5. **Form endpoint.** `MMC_FORM_ENDPOINT` is unset, so every form falls back to mailto. Leads will not reach a CRM.

---

## Deliverable A: Readiness and evidence audit

### Confirmed services and audiences (from the site, not from sales evidence)

| Service | Page exists | Client work recorded in client book | Readiness |
|---|---|---|---|
| Meta ads | meta-ads.html | Performance ads recorded | Ready to lead |
| Google ads | google-ads.html | Performance ads recorded | Ready |
| Amazon ads | amazon-ads.html | Recorded | Ready, needs proof |
| Quick commerce | quick-commerce-ads.html | Recorded | Ready to lead |
| Lead generation | lead-generation.html | Recorded | Ready |
| CRO / web / Shopify | conversion-rate-optimisation, web-development, shopify-development | Web and CRO recorded | Ready, overlapping |
| SEO | seo.html | None recorded | Do not lead with it until proof exists |
| Retention (email, WhatsApp, CRM) | retention-marketing.html | None recorded | Validate proof first |
| Branding, packaging, UI/UX | branding, packaging-design, ui-ux-design | None recorded | Secondary |
| ORM | online-reputation-management.html | None recorded | Secondary |
| Video / performance creative | folded into ugc-and-video.html | Creative recorded | Needs its own decision |
| Influencer | influencer-marketing.html | Not confirmed | Validate |
| PR | No page | Not confirmed | Do not build a page yet |
| Mobile app development | mobile-app-development.html | Not confirmed | Off-brief; decide whether to keep |

Audience hubs: d2c.html, b2b.html, education.html, industries.html. Question for MMC: which services does it want to grow, and which does it only offer as add-ons?

### Site strengths
- One H1 per page, no duplicate titles or descriptions, canonicals and schema present on all pages.
- Prerendered text so crawlers can read content (only if `./build.sh` runs before deploy).
- Real informational assets: 6 calculators, a glossary, 3 guides.
- A wide services footprint with a consistent template.

### Problems (full list in appendix A)
- **Site not live and domain conflicts** (see decision 1). No redirect map for old WordPress URLs (/blog/*, /performance-marketing/, /career/, /portfolio/*).
- **The old live site makes claims the new plan forbids** ("10x Results Guaranteed", "Pay Per Result", "Best in Mumbai"). Retire those URLs at launch with 301s to the nearest new page.
- **Template, placeholder and fictional pages:** Service Detail.html and Job Detail.html are indexed templates in the sitemap. Job Detail advertises a role that may not be real. Insights.html has 8 article cards that all link to `#article`, with unsourced claims. Brand Handbook.html is a fictional DeoBar case study (noindex, but still in the repo).
- **Cannibalization risk:** performance-marketing.html duplicates the four channel pages. b2b.html and education.html embed lead-generation content. industries.html duplicates the audience hubs. Web, Shopify and CRO overlap on redesign intent.
- **Technical:** homepage canonical is `/index.html` while the sitemap uses `/`; encoded-space URLs in the sitemap; JSX compiled in the browser via Babel on every page (Core Web Vitals risk, not measured); cookie banner is cosmetic while GTM and Meta Pixel load unconditionally; no GA4, Clarity or Search Console tag found in the repo (GA4 may sit inside GTM: unchecked).
- **Brand-name collision:** "Monday Marketing Company" competes with monday.com, Monday Creative and others. Branded search returns the site and a LinkedIn page only. No Clutch, GoodFirms, press or review presence was found.
- **No case studies, no blog articles.**

### Existing search visibility and lead performance
Not accessible. Needed: GSC and GA4 for the old WordPress property (this is the only real baseline), CRM export, sales deck.

### Missing inputs (also the request list to MMC)
GA4 + GSC access (old and new), CRM export with lead source and stage, qualified-lead definition, services actually sold and priced, real client results with permission, true team size/offices/markets, source of the headline numbers, www vs apex decision, form endpoint, any Google Partner/Meta Partner status, named strategists willing to be authors.

---

## Deliverable B: Opportunity shortlist

Scoring model: five separate factors, each 1 to 5, never averaged into one hidden number. Size (context only), verified demand (capped at 3 until volumes are pulled), competition (5 = easiest), lead value, MMC fit. Totals in appendix B are a rough ordering only.

### Priority 1 to 3 (first phase)

| # | Combination | Why it made the list | Evidence | Proof needed | Path to qualified lead |
|---|---|---|---|---|---|
| 1 | **Quick-commerce and marketplace ads** (Blinkit, Zepto, Instamart, Flipkart Minutes) for D2C and FMCG brands, India | Newest and least crowded India SERP seen. Cost guides rank and a buyer RFP appeared on LinkedIn | SERP density: fragmented small-agency pages, not directory-locked (2026-09-28, US-located). Client book records quick-commerce work. Volume not verified | Anonymised results with method, named practitioner, platform-specific account examples. **MMC to provide** | Audit request from brands already on or entering quick commerce; supporting cost/ROAS guide feeds it |
| 2 | **D2C performance marketing (Meta + Google), India national** | Strongest fit, highest-value repeat buyer, home market. SERP is fragmented with self-listicles rather than dominant brands | Dense commercial SERPs; the same agencies repeat across cities. Volume not verified | Two or three permissioned D2C case studies with results and dates. **MMC to provide** | Audit request; calculators (break-even ROAS, LTV:CAC) qualify visitors |
| 3 | **Education admissions marketing, India** (conditional) | Niche vertical specialists, many small. Beatable with real admissions proof | Fragmented vertical SERP. Not verified: whether MMC has education clients | At least one real institute case with cost per admission or enquiry-to-admission data. **MMC to provide.** If none exists, drop this slot | Enquiry-form leads from institutes; admissions calculator idea (hypothesis) |

If MMC cannot document education work, the first phase is two combinations, not three. Do not force it.

### Validate or consider later (five)

| Combination | Status | What would move it up |
|---|---|---|
| **UAE: D2C and Amazon.ae performance marketing** | Top overseas candidate. India-based agencies already rank in UAE SERPs. Timezone is IST minus 1.5 hours | Any UAE client work; UAE volumes; Arabic decision |
| **Indian D2C brands going to the US or UAE** (guide/pillar) | Thinnest SERP seen: mostly editorial, few real service pages. Volume unknown | Volume check; proof of any cross-border work |
| **WhatsApp and retention marketing** | Fragmented low-authority SERP, but intent is often bulk messaging (lower quality) | Client retention work (none recorded) |
| **B2B lead generation for Indian B2B/SaaS** | Directory-heavy, and intent skews to outsourced SDR and cold calling | A B2B case study showing paid-led pipeline |
| **One city page (Mumbai/Thane, Bengaluru or Delhi NCR)** | City SERPs are crowded with template pages | GSC city impressions plus genuine local proof. Only verifiable address: Thane |

Deferred with reasons: Hyderabad, Pune (lower size, listicle-heavy), Ireland, NZ, Saudi Arabia (small or local-vendor preference, Arabic), US/UK mainstream "Meta ads agency" and "Shopify CRO agency" (very high competition, entrenched specialists, no MMC proof), US higher-ed enrollment (deep specialists, compliance).

### Ranked market table

| Market | Industry and service | Demand evidence and source | Example query themes (intent) | SERP competition | Buyer value / lead quality | Localization | MMC capability and proof | Evidence gaps | Decision | Confidence | Page type |
|---|---|---|---|---|---|---|---|---|---|---|---|
| India national | D2C, quick commerce, education, retention | SERP density only; WebSearch US-located, 2026-09-28. Volume not verified | "D2C performance marketing agency India" (commercial); "Blinkit Zepto ads agency" (commercial); "education marketing agency admissions" (commercial) | Fragmented; niches easier than B2B | Moderate INR retainers; strong repeat | Indian English; INR; GST | Base market; results unproven | Volumes, GSC, case studies | **Target now** | Medium | Service and audience pages |
| Mumbai, Delhi NCR, Bengaluru | Mixed | Same city templates recur across agencies | "performance marketing agency [city]" (commercial local) | Techmagnate strong in NCR; others moderate | Larger brands and funded startups | Same as India | Team locations unverified | GSC by city, local proof | **Research further**, at most one city | Low to medium | City page only with local proof |
| Hyderabad, Pune | Mixed | Listicle-heavy | As above | Moderate | Lower | Same | None | GSC | **Defer** | Low | None |
| UAE | D2C, Amazon.ae | India-based agencies rank | "Amazon ads agency UAE" (commercial) | Moderate to high | High | English; Arabic optional for D2C; AED; VAT; UAE PDPL | Unverified | Volumes, UAE proof | **Research further** | Medium-low | Service page only if UAE delivery evidenced |
| US (cross-border angle only) | Indian D2C entering US | Thin editorial SERP | "Indian D2C brands entering US market" (informational and commercial) | Low for that intent; very high for generic | High | US English ("DTC"); USD; state privacy laws | No proof seen | Volume, proof | **Research further** | Low | Guide/pillar, not a US city page |
| UK, Canada, Australia, Singapore | Mixed | Directory and listicle-heavy | Generic agency queries | High | Higher retainers | Local spelling, GDPR/PIPEDA/CASL/PDPA | No proof seen | Everything | **Research further** (Australia and Singapore first on time zone) | Low | None yet |
| Ireland, NZ, Saudi Arabia | Mixed | Local-ownership and Arabic signals | Local queries | Moderate | Small or Arabic-first | Arabic (KSA); ZATCA | No proof | Everything | **Defer** | Low | None |

Localization and legal points (time zones, GST export treatment, DPDP, GDPR, UAE PDPL) come from general knowledge, not fetched sources. **Verify with an accountant or counsel before publishing market pages.**

---

## Deliverable C: Search-intent and keyword map

All volumes: **not verified** (verify in Google Keyword Planner per country, Semrush/Ahrefs, and GSC). SERP source for every row: WebSearch, US-located, 2026-09-28. Lead potential is a hypothesis. Confidence reflects SERP-observation reliability only.

### Commercial

| Query cluster | Buyer / industry | Service | Market | SERP page type | Target page | Lead potential | Cannibalization / localization notes |
|---|---|---|---|---|---|---|---|
| Quick commerce marketing / ads agency (Blinkit, Zepto, Instamart) | D2C, FMCG | Quick commerce | India | Small-agency service pages, cost guides | quick-commerce-ads.html | High | Sole owner of this theme; cost guide supports it |
| D2C performance marketing agency India | D2C | Meta + Google | India | Service pages, agency top-lists | d2c.html | High | Owns "D2C" audience intent |
| Performance marketing agency India (generic) | Mixed | Performance | India | Service pages, lists | performance-marketing.html | Medium | Rewrite as overview that routes to channel pages, not a duplicate of them |
| Meta ads agency for D2C | D2C | Meta | India, US | Service pages, listicles | meta-ads.html | High | Channel intent only |
| Google ads agency | D2C, B2B | Google | India | Not surveyed in this pass | google-ads.html | Medium | Not verified |
| Education marketing / admissions agency | Institutes | Admissions | India | Vertical agency pages | education.html | Medium-high | Strip embedded lead-gen duplication |
| WhatsApp marketing agency | D2C, education | Retention | India | Service pages, vendor directory | retention-marketing.html | Medium | Lower-quality intent risk |
| Amazon ads agency (UAE, AU, IN) | Marketplace sellers | Amazon | UAE first | Specialists, directories | amazon-ads.html | Medium | Market variant only if delivery evidenced |
| B2B lead generation agency | B2B, SaaS | Lead gen | India | Directories, listicles | b2b.html / lead-generation.html | Medium | Split intent: SDR outsourcing is not MMC's buyer |
| Shopify CRO agency | D2C on Shopify | CRO | India (US very hard) | Service pages, listicles | conversion-rate-optimisation.html | Medium-high | Merge or clearly separate web-development and shopify-development |
| Performance marketing agency [city] | Mixed | Performance | 5 Indian cities | City pages, Sortlist, listicles | None yet | Medium | Not created; gated |
| Indian D2C brands entering US/UAE | Indian D2C | Cross-border | India to US, UAE | Editorial articles, few service pages | New guide, later a service page | Medium-high | Thin SERP; volume unknown |

### Transactional
| Cluster | Target | Notes |
|---|---|---|
| Request audit, free consultation, proposal | audit.html, contact | Not measured by SERP. Measure through GSC branded and non-branded landing data |
| Agency pricing or cost ("D2C marketing agency pricing", "Blinkit ads cost") | New cost guide plus pricing-approach section | Visible gap. **Conflict to resolve:** llms.txt says MMC does not publish pricing, but Service Detail.html shows tiers. Decide first |

### Informational
| Cluster | Target | Lead potential |
|---|---|---|
| Quick commerce ads: CPC, ROAS, setup | New guide | Medium-high |
| D2C performance marketing strategy | Existing guides plus one new pillar | Medium |
| Break-even ROAS, LTV:CAC, CAC runway | Existing calculators (verify SERP presence) | Medium |
| D2C glossary | d2c-marketing-glossary.html | Low to medium; supports internal linking |
| Education admissions funnels | New guide after proof exists | Medium |
| Cracking the US market for Indian D2C | New guide (after volume check) | Medium |

### Navigational
"Monday Marketing Company", "MMC agency", "mondaymarketing.company": not surveyed. Needs GSC. Branded search returned the site and LinkedIn only, and the name collides with monday.com. Recommendation: use the full legal/brand name plus "Thane" or "performance marketing agency" consistently in titles, schema and directory listings.

---

## Deliverable D: Recommended site architecture

```
Home
├── Services (hub)
│   ├── Performance marketing (overview; routes, does not duplicate)
│   │    ├── Meta ads
│   │    ├── Google ads
│   │    ├── Amazon ads
│   │    └── Quick commerce ads          ← phase-1 priority
│   ├── Lead generation
│   ├── Retention marketing
│   ├── SEO
│   ├── CRO / website (one clear owner for redesign intent)
│   └── Creative, branding, influencer (secondary)
├── Industries
│   ├── D2C                               ← phase-1 priority
│   ├── B2B
│   └── Education                         ← phase-1, conditional
├── Work (real case studies only)
├── Resources: calculators, glossary, guides, cost guide
└── About, Contact, Audit
```

### Rules
- One page owns each query theme (table in Deliverable C).
- performance-marketing.html becomes an overview linking to channel pages; remove the channel sections that duplicate them.
- industries.html either becomes a short index or is folded into the three audience hubs.
- b2b.html and education.html link to lead-generation.html instead of embedding its CRM + CAPI section.
- Decide whether web-development, shopify-development and CRO are one page family with distinct buyers, or merge the weakest.
- Every commercial page links to one relevant case study, one calculator or guide, and the audit CTA.

### Do not create yet
- **City pages** (all five). Crowded with template pages; MMC has no verified local presence beyond Thane. Gate: GSC shows city impressions and MMC has genuine local proof.
- **Country pages** (US, UK, Canada, Australia, Ireland, NZ, Saudi). No evidence of demand or delivery. Gate for UAE: UAE client work plus volume data.
- **Hreflang/language variants.** No localized variants are justified. One English site with `en` and no hreflang is correct until a market page exists. If a UAE page is added later, keep it on the same domain under a subfolder (`/uae/`) with a self-referencing canonical, reciprocal hreflang (`en-IN`, `en-AE`, `x-default`) and no duplicate copy of India pages.
- **PR page**, **"top agencies" self-listicles**, **near-identical service-by-city pages**.
- **Insights articles** as placeholders. Publish real articles or remove the index from the sitemap.

---

## Deliverable E: First-phase page briefs

All three pages already exist in the build, so these are rewrites. Every claim listed under "verify" must be confirmed by MMC before publication. Nothing below is a result or a proof point; those are marked **MMC to provide**.

### 1. Quick commerce ads (`quick-commerce-ads.html`)

- **Goal / buyer / intent:** Marketing head or founder at a D2C or FMCG brand on, or entering, Blinkit, Zepto, Instamart or Flipkart Minutes. Commercial, moving to transactional.
- **Query themes:** quick commerce marketing agency; Blinkit / Zepto / Instamart ads; quick commerce ROAS and cost. Geography: India.
- **Distinct positioning:** how ads, listing, availability and margin interact on quick-commerce platforms, and how MMC reports profit rather than platform ROAS. *(Validate: MMC must confirm this is actually its method.)*
- **Title (≤60):** Quick Commerce Ads Agency: Blinkit, Zepto, Instamart | MMC
- **H1:** Quick commerce advertising for D2C and FMCG brands
- **Meta (≤155):** Plan and run Blinkit, Zepto and Instamart ads with margin in view. See how MMC audits, launches and reports. Request a quick commerce audit.
- **Outline:** who this is for → how quick-commerce advertising differs from Amazon and Meta → what MMC does in the first 30 days → how performance is reported (margin, availability, ROAS) → one anonymised case study (**MMC to provide**) → what it costs to get started or how pricing works (**MMC decision**) → FAQs → audit CTA.
- **Evidence needed:** platform account examples, results with time period and method, named practitioner and reviewer (**MMC to provide**).
- **FAQs (from observed buyer language, confirm with sales calls):** What does quick commerce advertising cost? How is ROAS measured on Blinkit and Zepto? Which categories work? How long before results?
- **Internal links:** amazon-ads, performance-marketing, d2c, the cost guide, relevant calculator.
- **CTA / event:** Request audit; `generate_lead` with `page_type=service`, `service=quick_commerce`.
- **Localization:** Indian English, INR, no market variants.
- **AEO/GEO:** clear opening definition, named author and review date, tables of what's included, visible FAQ with matching FAQPage markup. No promise of citation.
- **Verify before publish:** every statistic, any platform partnership claim, any "official partner" wording, all results.

### 2. D2C marketing (`d2c.html`)

- **Goal / buyer / intent:** D2C founder or growth head weighing agencies. Commercial.
- **Query themes:** D2C performance marketing agency India; D2C marketing agency. Geography: India national.
- **Distinct positioning:** an audience hub about D2C unit economics (contribution margin, CAC, LTV) that routes to channel pages. *(Validate with MMC.)*
- **Title:** D2C Performance Marketing Agency in India | MMC
- **H1:** Performance marketing for D2C brands that watch their margins
- **Meta:** How MMC plans Meta and Google campaigns around contribution margin, CAC and LTV for Indian D2C brands. See the approach and request an audit.
- **Outline:** buyer problems → MMC approach (economics first) → channel routing (Meta, Google, quick commerce, retention) → calculators → case studies (**MMC to provide**) → FAQs → audit CTA.
- **Evidence:** two or three permissioned D2C case studies, named lead strategist (**MMC to provide**).
- **FAQs:** How do agencies price? What is a good ROAS for D2C? When should a brand hire an agency? How is attribution handled?
- **Internal links:** meta-ads, google-ads, quick-commerce-ads, retention-marketing, calculators, glossary, guides.
- **CTA / event:** Request audit; `generate_lead`, `industry=d2c`.
- **Localization:** Indian English; use "D2C" (not "DTC").
- **AEO/GEO:** use the existing calculators as original, methodology-documented assets; cite their formulas.
- **Verify:** all figures, "growth" claims, tool accuracy and a finance reviewer for calculator logic.

### 3. Education (`education.html`) — conditional on proof

- **Goal / buyer / intent:** Admissions head or management at a school, college or coaching institute. Commercial.
- **Query themes:** education marketing agency India; admissions marketing; college promotion. Geography: India.
- **Distinct positioning:** admissions as a funnel from enquiry to enrolment, with counselling-team follow-up. *(Validate: MMC must show it works with institutes.)*
- **Title:** Education Marketing Agency for Admissions in India | MMC
- **H1:** Admissions marketing for schools, colleges and coaching institutes
- **Meta:** Reach parents and students with campaigns built around enquiries, counselling follow-up and enrolments. See MMC's admissions approach and request an audit.
- **Outline:** admissions funnel problems → approach (lead capture, WhatsApp follow-up, tracking to enrolment) → institute case study (**MMC to provide**) → compliance and consent handling → FAQs → CTA.
- **FAQs:** What is cost per enquiry versus cost per admission? Which channels work for schools versus colleges? How do you handle lead quality?
- **Internal links:** lead-generation, retention-marketing, meta-ads, google-ads.
- **CTA / event:** Request audit; `generate_lead`, `industry=education`.
- **Verify:** any admission numbers, institute names, "guaranteed admissions" wording (must not appear).
- **Gate:** publish only with at least one real institute case. Otherwise keep the page live but out of the promotion plan.

### Supporting asset (not a full brief): Quick commerce ads cost and ROAS guide
Informational and transactional-research, India. Cost guides already rank, so this is a visible gap. Requires MMC's real cost ranges or a clearly stated method. Links to page 1.

---

## Deliverable F: 90-day authority and content plan

Roles are proposed for a small team: **SEO lead**, **Content lead**, **Strategist** (delivery expert, reviewer), **Dev**, **Founder**. Effort in S (under 1 day), M (1–3 days), L (over 3 days).

### Days 1–30: Foundations
| Activity | Owner | Effort | Dependency | Outcome | Verification | Confidence |
|---|---|---|---|---|---|---|
| Decide domain, redirect map from old WordPress URLs | Founder + Dev | M | Old GSC/sitemap export | No lost equity at launch | Every old URL returns 301 to one target, checked with a crawler | High |
| Fix P0 list (Deliverable H) | Dev + SEO lead | L | Domain decision | Site crawlable and trackable | Crawl, GSC coverage | High |
| Choose true company facts; align llms.txt, schema, contact | Founder | S | None | Consistent entity information | Manual diff | High |
| Remove or noindex templates and fictional pages | Dev | S | None | No misleading indexed pages | Sitemap and live check | High |
| Set up GA4 + GSC + CRM lead-source capture; wire form endpoint | Dev + SEO lead | M | Endpoint choice | Baseline begins | Test lead flows into CRM with source | High |
| Pull volumes and localized SERPs for phase-1 clusters | SEO lead | M | Keyword tool access | Replace "not verified" with data | Sheet with tool, date, location | Medium |
| Collect proof: 3 to 5 permissioned case studies, named authors | Strategist + Founder | L | Client permission | Enables everything else | Signed permission on file | Medium |

### Days 31–60: Priority pages and proof
| Activity | Owner | Effort | Dependency | Outcome | Verification | Confidence |
|---|---|---|---|---|---|---|
| Rewrite quick-commerce-ads and d2c per briefs | Content lead + Strategist | L | Proof, volumes | Two distinct commercial pages | Editorial and SME review checklist | Medium |
| Restructure performance-marketing overview; remove duplicate channel sections | Content lead | M | Domain fixed | Cannibalization reduced | Query-to-page map, GSC by page | Medium |
| Publish 2 to 3 case studies | Strategist + Content lead | L | Permissions | Proof on pages | Client sign-off | Medium |
| Publish quick-commerce cost and ROAS guide | Content lead | M | MMC cost data | Informational-to-commercial path | Indexed, internal links from page 1 | Medium |
| Education page rewrite (only if proof exists) | Content lead | M | Institute case | Third priority page | Review checklist | Low to medium |

### Days 61–90: Authority and expansion tests
| Activity | Owner | Effort | Dependency | Outcome | Verification | Confidence |
|---|---|---|---|---|---|---|
| Create Clutch and GoodFirms profiles; request reviews from real clients | Founder | M | Client willingness; company registration | Third-party entity signals | Live profiles, real review links | Medium |
| Check partner eligibility (Google, Meta, Amazon Ads, Klaviyo, WhatsApp BSP) against official criteria | Founder | S | Account data | Verifiable badges, if eligible | Official directory listing | Low to medium |
| Pitch expert commentary to trade publications (Afaqs, Exchange4media, Social Samosa, Inc42, YourStory), unpaid | Strategist + Content lead | M | Named experts, original data | Independent mentions | Published links | Low |
| Publish a first original data note: anonymised campaign benchmarks with method | Strategist | L | Client consent, finance review | Original evidence | Method statement live | Low to medium |
| Internal-link and content refresh pass | SEO lead | S | Pages live | Cleaner hubs | Crawl | High |
| Review GSC for city and UAE impressions; decide on one city or UAE page | SEO lead | S | 6+ weeks of GSC data | Data-led expansion decision | Decision recorded against gates | Medium |

Publications' editorial policies were not checked. Partner criteria were not verifiable from official pages in this pass (Shopify Partner Plus-tier requirements look out of reach; Google Partner official page returned an error; Meta's criteria sit behind login). Verify before committing.

---

## Deliverable G: Measurement plan

### Baseline required
Old WordPress GSC (queries, pages, countries, 16 months) and GA4 if present; CRM leads by source and stage for the last 12 months; brand SERP screenshot; current answer-engine mentions (manual test of ChatGPT, Perplexity, Google AI Overviews, Bing Copilot on 15 to 20 fixed queries, logged with date).

### Qualified lead definition (proposal, needs MMC sign-off)
A form or audit submission that (a) is from a business, not a student, job seeker or vendor, (b) is in D2C, B2B or education, (c) states a budget or scope MMC can serve, and (d) is accepted by sales after a first call. Track "submitted", "sales-accepted" and "qualified" separately.

### Tracking and CRM requirements
- Form endpoint live; every form writes landing page, first-touch source, UTM, service, industry and country to CRM.
- GA4 events: `generate_lead`, `audit_start`, `audit_submit`, `calculator_use`, `calculator_lead`, `cta_click`, `phone_or_whatsapp_click`. Consent Mode wired so consent choices actually govern tags.
- CRM stages: new → contacted → qualified → proposal → won/lost, with revenue on won.

### Monthly reporting views
By page, service, intent (informational/commercial/transactional/navigational), and market: impressions, clicks, engaged sessions (GSC and GA4); leads, lead rate, qualified leads; opportunities, pipeline, closed revenue.

### Separated measures
| Type | Metric |
|---|---|
| Leading | Indexed pages, impressions and clicks for target clusters, engaged sessions, calculator use, referring-domain quality, answer-engine mentions |
| Business outcomes | Qualified leads, lead-to-opportunity rate, pipeline, closed revenue by landing page |
| Brand / AI visibility | Fixed-query mention log, branded search impressions, Bing AI Performance report (if available for the property), correct entity details in answers |

Rankings and traffic alone are not success.

### Decision rules (starting points, adjust with baseline)
- **Expand** a page or market when, after at least 90 days, it produces qualified leads or sales-accepted opportunities and the lead-to-opportunity rate is at or above the site average.
- **Revise** when impressions and clicks grow but leads do not: check intent match, proof placement and CTA.
- **Stop or defer** when a page has stable impressions for 6 months with no qualified leads and no better intent evidence, or when a market lacks delivery proof.
- Market pages need GSC impressions from that market plus verified delivery evidence before they are built.

---

## Deliverable H: Prioritized implementation backlog

### P0: Crawling, indexation, tracking, conversion
| Task | Owner | Effort | Dependency | Expected result | Confidence | Completion check |
|---|---|---|---|---|---|---|
| Choose apex vs www; align canonicals, sitemap, schema `@id`, redirects | Founder + Dev | M | Decision | One canonical host | High | Crawl shows single host, no redirect chains |
| Old-WP to new-site 301 map; retire /performance-marketing/ old copy | Dev | M | Old URL export | Equity preserved; risky claims removed | High | Every old URL resolves 301 to intended page |
| Fix homepage canonical (`/` not `/index.html`) | Dev | S | None | Consistent signals | High | Source view, GSC |
| Remove Service Detail.html, Job Detail.html from sitemap; noindex or delete templates | Dev | S | None | No template pages indexed | High | Sitemap and header check |
| Remove encoded-space URLs; add clean URL slugs and redirects | Dev | M | Domain fixed | Clean URLs | High | Crawl |
| Ensure prerender runs on every deploy (`build.sh` in pipeline) | Dev | S | None | AI and search crawlers see content | High | Fetch page without JS |
| Wire form endpoint; write leads to CRM with source | Dev | M | CRM choice | Leads reach sales | High | Test submission traced end to end |
| Add or verify GA4 and Search Console; connect consent to tags | Dev | M | Access | Baseline data | High | Realtime test, GSC verified |
| Robots: allow OAI-SearchBot and PerplexityBot; decide on GPTBot and Google-Extended (training controls, separate from Search) | SEO lead | S | Policy decision | Clear crawler policy | High | robots.txt review |
| Core Web Vitals check; plan to build JSX rather than compile in browser | Dev | L | Baseline test | Faster pages | Medium | PageSpeed/CrUX before and after |
| Resolve company facts (team, offices, areaServed) across llms.txt, schema, contact | Founder | S | Decision | Truthful entity data | High | Manual diff |
| Retire or fix Insights.html placeholder cards and fictional Brand Handbook | Dev + Founder | S | None | No fake proof indexed | High | Sitemap and page check |

### P1: Highest-confidence opportunities
| Task | Owner | Effort | Dependency | Result | Confidence | Check |
|---|---|---|---|---|---|---|
| Rewrite quick-commerce-ads per brief | Content + Strategist | L | Proof | Distinct commercial page | Medium | Review checklist; GSC |
| Rewrite d2c page per brief | Content + Strategist | L | Proof | Owns D2C intent | Medium | Same |
| Restructure performance-marketing overview | Content | M | None | Cannibalization reduced | Medium | Query-to-page map |
| 2 to 3 case studies with permission | Strategist | L | Client sign-off | Proof | Medium | Signed permission |
| Quick-commerce cost and ROAS guide | Content | M | MMC data | Informational feeder | Medium | Indexed; internal links |
| Clutch and GoodFirms profiles, real reviews | Founder | M | Clients | Third-party signals | Medium | Live profiles |
| Volume and localized SERP pull for phase-1 clusters | SEO lead | M | Tool access | Replace unverified data | Medium | Dated sheet |
| Add missing schema (Person for authors, JobPosting if roles are real, accurate Organization) | Dev | S | Author facts | Accurate markup | Medium | Rich Results Test |

### P2: Supporting work and expansion tests
| Task | Owner | Effort | Dependency | Result | Confidence | Check |
|---|---|---|---|---|---|---|
| Education page rewrite (gated by proof) | Content | M | Institute case | Third priority page | Low-medium | Review |
| UAE or cross-border guide test | Content | M | Volume data, proof | Test demand | Low | GSC impressions |
| One city page test (gated) | Content | M | GSC + proof | Local test | Low | Leads by city |
| Original data note | Strategist | L | Consent | Citable evidence | Low-medium | Published with method |
| Partner programs check | Founder | S | Account data | Verifiable badges | Low-medium | Directory listing |
| Publication outreach | Strategist | M | Named experts | Independent mentions | Low | Published links |
| Decide fate of off-brief pages (mobile-app-development, industries.html) | Founder | S | Strategy | Leaner site | Medium | Sitemap |

---

## AEO and GEO notes (confirmed vs speculation)

**Officially confirmed (accessed 2026-09-28; some via secondary coverage, marked in appendix C):**
- Google states there are no extra requirements to appear in AI features: pages must be indexed and snippet-eligible. No special schema or AI files.
- Google's spam policies cover scaled content abuse, site reputation abuse and link spam.
- OpenAI says OAI-SearchBot must be allowed to appear in ChatGPT search; GPTBot is for training. Perplexity says PerplexityBot respects robots.txt.
- Google Search does not use llms.txt (reported via Search Engine Journal and Search Engine Land, not read directly from Google's changelog). No major engine has been shown to use it. Keep the file, claim no benefit.

**Not confirmed, treat as speculation:** chunking formats, entity tricks, FAQ schema as a citation lever.

**Practical stance:** make pages crawlable and indexable, write clearly with named experts and dates, publish original evidence, keep entity details consistent, earn independent mentions. No promise of inclusion.

**Not tested:** direct outputs of ChatGPT, Perplexity, Google AI Overviews and Copilot. Do this manually as part of baseline.

---

## Final review checklist

1. Every opportunity carries SERP-density evidence or is labelled a hypothesis. **Yes; volumes are all unverified.**
2. First phase focused: three combinations, one conditional. **Yes.**
3. Each page has a distinct user, intent and purpose. **Yes, subject to rewriting performance-marketing and b2b/education overlaps.**
4. MMC can support market claims. **Only India is supportable today. Overseas is research-only.**
5. Pipeline over traffic. **Yes, see Deliverable G.**
6. AEO/GEO promises nothing. **Yes.**
7. External claims cited and dated. **Yes in appendices; gaps flagged where sources were secondary or inaccessible.**
8. One coordinated recommendation. **Yes.**

## Known limits of this work
- US-located search only; no volumes, CPCs or difficulty; no PAA or AI Overviews.
- Live-site tracking tags not checked (new site not deployed); ~56,000-word prerender figure is README's, not recounted.
- Competitor schema not inspected; AI engine outputs not tested.
- Partner-program criteria for Google, Meta, Klaviyo and WhatsApp are unverified from official pages.
- Market-size figures vary widely by source and are context only; the GCC figures fetched looked implausible and were not used.
- Localization, tax and legal points are general knowledge and need professional review.

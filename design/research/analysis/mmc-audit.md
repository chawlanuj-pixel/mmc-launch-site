# MMC website audit: current site (18 pages)

Audit date: 15 Sep 2026. Subject: mondaymarketing.company, as served by the local dev server.

**Sources**
- The 18-page corpus (`corpus/mmc/text/*.md` and `corpus/mmc/pages/*.json`). Every file was read.
- Site source, for context only: `README.md`, `llms.txt`, `content/clients.json`, `content/seo.json`, `content/page-audit.json`, `robots.txt`, `sitemap.xml`, plus spot checks of the JSX components and the pre-rendered HTML.
- Nothing in the site folder was modified.

**Conventions**
- Quotes are verbatim. Uppercase in quotes is how the corpus captured the text, which is often CSS-transformed.
- Word counts come from the corpus header (`Words:`), which counts body text only. The build's `page-audit.json` counts are higher because they include the nav and footer.
- "Approved figures" means the four performance numbers the site is allowed to publish:
  - 8.7x median blended ROAS
  - ₹248Cr+ revenue compounded
  - 14/14 clients renewed
  - 27 months tenure
- One wording clash to settle first. The brief calls the tenure figure an "average". Every place the site uses it says "median" ("27mo Median client tenure", "27-month median tenure"). Pick one term and use it everywhere.

---

## 0. Page inventory

| # | Page | URL (as served) | Type | Words | H1 (verbatim) |
|---|---|---|---|---|---|
| 1 | Home | `/index.html` | Sales | 968 | "Performance marketing that survives the P&L." |
| 2 | About | `/About.html` | Brand manifesto | 1,075 | "Built for the way modern brands actually grow." |
| 3 | Our Work | `/Our%20Work.html` | Portfolio | 379 | "25 brands. One common thesis: revenue that compounds." |
| 4 | Service Detail (Meta Ads) | `/Service%20Detail.html` | Service + pricing | 671 | "Meta Ads that compound, not just convert." |
| 5 | Contact | `/Contact.html` | Conversion | 325 | "Let's talk about your brand." |
| 6 | Careers | `/Careers.html` | Recruiting | 757 | "People who write their own briefs." |
| 7 | Job Detail | `/Job%20Detail.html` | Job post + application | 348 | "Senior Meta Buyer" |
| 8 | Insights | `/Insights.html` | Blog index | 440 | "We write what we actually ship." |
| 9 | Privacy | `/Privacy.html` | Legal | 373 | "Privacy Policy" |
| 10 | Terms | `/Terms.html` | Legal | 332 | "Terms & Conditions" |
| 11 | Tools hub | `/tools.html` | Free-tools index | 871 | "The numbers we run before we take a client." |
| 12 | Unit Economics Calculator | `/unit-economics-calculator.html` | Tool | 779 | "What does one order actually leave you?" |
| 13 | Growth Trajectory Calculator | `/growth-trajectory-calculator.html` | Tool | 744 | "Where does this run rate get you?" |
| 14 | CAC Runway Calculator | `/cac-runway-calculator.html` | Tool | 1,061 | "How long until this stops costing money?" |
| 15 | Funnel ROAS Calculator | `/funnel-roas-calculator.html` | Tool | 800 | "Where is your funnel leaking?" |
| 16 | Break-even ROAS Calculator | `/breakeven-roas-calculator.html` | Tool | 716 | "Are your ads actually making money?" |
| 17 | LTV:CAC Calculator | `/ltv-cac-calculator.html` | Tool | 697 | "What is a customer really worth?" |
| 18 | D2C Marketing Glossary | `/d2c-marketing-glossary.html` | Reference | 2,529 | "Every term we use, in plain English." |

**Total: 13,865 words**, split as follows:

| Cluster | Words | Share |
|---|---|---|
| Tools and glossary | 8,197 | 59% |
| Sales pages (Home, About, Work, Service, Contact) | 3,418 | 25% |
| Careers and Job | 1,105 | 8% |
| Legal | 705 | 5% |
| Insights | 440 | 3% |

---

## 1. Business crux

### What MMC sells

Home describes five "systems" sold as one integrated retainer. The exact wording is "Five systems, one team. Most brands buy these from five vendors and spend their week translating between them. Here they share a strategist, a thesis and a P&L."

- **Performance media:** "Meta, Google, Amazon and quick-commerce run as one account structure, budgeted against contribution rather than platform ROAS."
- **Creative & UGC:** "240+ assets a month against a single brand thesis."
- **Retention & lifecycle:** "Email, WhatsApp and loyalty…"
- **Conversion & technology:** "Shopify builds, checkout, speed and CRO."
- **Brand & packaging:** "Identity, packaging and design systems."

Other pages describe the offer differently:
- **Service Detail** sells a single productised retainer, Meta Ads, with three tiers (see pricing below).
- **Stack claim (Home):** "Eighteen platforms across media, checkout, retention and measurement, configured, integrated and operated in-house."

### What the client book says MMC actually does

The recorded service mix (`clients.json`, 15 brands with services) is:

| Service | Brands |
|---|---|
| Performance creative | 15 |
| Website redesign and development | 13 |
| "Performance ads, D2C" | 9 |
| Social media | 7 |
| Lead generation | 6 |
| CRO | 2 |
| Amazon | 1 |
| Quick commerce | 1 |
| Retention & lifecycle | 0 |
| Brand & packaging | 0 |
| SEO | 0 |

Two of the five home "systems" (Retention, Brand & packaging) have no recorded client. Two services that are in the book (Lead generation, Social media) are not among the five systems.

### Engagement and pricing model

All from Service Detail unless noted.

- **Retainer:** "ENGAGEMENT 12-month retainer" and "12-month minimum" (Spark tier).
- **Exit clause, in the same section:** "All packages include a 30-day exit clause. Ad spend billed separately, directly to your card or by invoice. No platform markups."
- **Tiers, priced by ad spend:**
  - "Spark ₹3L / month, Up to ₹10L ad spend"
  - "Compound ₹6L / month, ₹10L – ₹50L ad spend" (badged "MOST COMMON")
  - "Scale ₹12L+ / month, ₹50L+ ad spend"
- Framing line: "Three tiers. Pick by ad spend, not by features."
- **Onboarding and reporting:** "TIME TO LIVE 14 days from kickoff"; "REPORTING Daily · Slack + weekly call".
- **Process (Home):** "Four weeks to a working engine", in four steps:
  - "We dig" (Week 1)
  - "We model" (Week 1–2)
  - "We ship" (Week 2–4)
  - "We compound" (Month 2+)
- **Terms hedge:** "Pricing, packages, and engagement details shown are indicative. Final scope is set in a written engagement letter."
- **Contradiction:** `llms.txt` tells answer engines "The company does not publish pricing, ratings or awards." Service Detail publishes three prices.

### Positioning

- **One-liner (Home hero, source and pre-rendered HTML):** "Media, creative, retention and technology run by one senior team, measured on contribution margin, not on the dashboard screenshot."
- **Thesis words:** contribution margin, P&L, compounding, senior team, systems not vendors.

The company calls itself five different things:

| Self-description | Where |
|---|---|
| "Full-service growth studio · Bengaluru & Mumbai" | Home hero tag |
| "senior-led performance marketing studio for modern consumer brands" | Organization schema |
| "A D2C performance-marketing agency in India" | llms.txt |
| "We're not building another agency. We're building a modern growth company" / "Not a traditional agency." | About |
| "a studio in operation" | Insights |

### Scale claims, and how they conflict

**Money and results**
- "₹248Cr+ Revenue compounded for clients since 2019" (Home). The Organization schema instead says "₹248Cr+ compounded across 24 brands".
- Brand count: "24 Brands scaled" (Home hero, pre-rendered) vs "TRUSTED BY 25 BRANDS" (Home, directly below) vs the Our Work title "Our Work: 14 D2C Brands and ₹248Cr+ Compounded".
- "20+ Platforms operated" (Home hero) vs "Eighteen platforms" (Home partners section).
- "240+ Creative assets shipped every month" (Home) vs "60–80 new creatives per month per brand" (Service Detail).

**Team size**
- "We're four people" (Careers).
- "Founded 2019. A team of four." (llms.txt).
- `"numberOfEmployees": {"value": 28}` (Organization schema).

**Staffing described per client**
- "Full senior pod (2 buyers, 1 strategist, 2 creatives)" (Compound tier).
- "Senior leadership embed" (Scale tier).
- "Reports to Head of Performance… Mentor 1–2 mid-level buyers" (Job Detail).

**Footprint (Contact)**
- "SATELLITE TEAMS Bengaluru Performance + Creative / Dubai Middle-East accounts / London UK + EMEA accounts / New York US D2C accounts".

**Takeaway:** the core proposition (a senior, integrated team that judges marketing on P&L) is coherent and distinctive. The claims around it (size, footprint, service breadth, brand count) contradict one another, and the pricing and contract terms conflict.

---

## 2. Market and audience

### Stated ICP

- **Service Detail:** "BEST FOR D2C brands · ₹3Cr – ₹150Cr"; tiers by monthly ad spend (under ₹10L, ₹10L to ₹50L, ₹50L+).
- **Contact form and audit modal revenue chips:** "Pre-launch / 0–10L", "₹10L – ₹1Cr", "₹1Cr – ₹10Cr", "₹10Cr – ₹50Cr", "₹50Cr+". The form invites brands far below the stated ₹3Cr floor. A Spark retainer is ₹36L a year, which exceeds the total revenue of the bottom two bands.
- **About ("WE ENJOY WORKING WITH"):** "Ambitious founders", "Growth-focused brands", "Businesses willing to evolve", "Teams that genuinely care". These are psychographic and unfalsifiable.
- **Home:** "We are not for everyone. Just for the ones who ship."

### Segments

**Client book:** 25 brands in three types (Our Work filter "All 25 / B2B 9 / D2C 9 / B2C 7").

| Type | Brands |
|---|---|
| B2B | Bloom Edutours, Sprouts Edu Tours, NM Consultings, Skyfling Technologies, Flomate, JSW, LearningMate, Saint-Gobain, Gyproc |
| D2C | Lepure, The Growing Giraffe, Mittiy Made, AwwBaby, Sprnt, Vaga Kids, MyBrownButters, Notic, OOsh |
| B2C | Panda Cabs, MVJ College of Engineering, Anchor by Panasonic, Green Hermitage, Housing.com, Rustomjee, Club Mahindra |

**Mismatch between the book and the site's content:**
- 16 of 25 clients (64%) are not D2C.
- Every tool, the glossary, the only service page, the pricing, the job post, the audit modal and the form placeholder are D2C ecommerce. The placeholder reads: "Retention is flat past D30 and our Meta ROAS keeps slipping…"
- Term counts across the corpus: "D2C" appears 66 times, "B2B" 17, "B2C" 10. The word "education" appears 0 times in live copy.
- The Home creative wall filter offers only "ALL / B2B / D2C". There is no B2C chip, even though B2C is a book category.

### Geographies

- **Home hero tag:** "Bengaluru & Mumbai".
- **Contact HQ:** "Thane · Mumbai"; satellites in Bengaluru, Dubai, London, New York.
- **Organization / ProfessionalService schema `areaServed`:** India, UAE, UK, US. The Service schema says India only.
- **Newsletter:** "2,400 readers across India, US, UK, and UAE."
- **The tools are India-specific:** GST, COD, RTO, "Indian D2C medians", lakh digit grouping ("22,72,727").
- **Job Detail:** "MUMBAI · BENGALURU". The application form offers "Five days at the Thane studio" and "Remote Work from home (Worldwide)". The menu says "Senior Meta Buyer · Mumbai".
- **SEO:** no page targets a city (no "Mumbai"/"Bengaluru" in any sales-page title).

### Buyer roles addressed

- **Founders:** "founder" appears 13 times (e.g. "report straight to founders", "Ambitious founders").
- **Procurement:** once, on the Contact card "FOR PROCUREMENT Request a proposal".
- **Implied, once:** "Brand and performance teams are at war about creative direction." (Service Detail pain 06).
- **Not addressed at all:**
  - CMO or head of marketing
  - CFO, despite the P&L language
  - B2B sales leaders
  - Enterprise brand managers (JSW, Saint-Gobain, Housing.com and Club Mahindra are in the logo wall)
  - Admissions or marketing heads at institutions

### Pains addressed

Service Detail lists six, verbatim:
1. "Your ROAS is slipping every month and creative refreshes aren't fixing it."
2. "Audiences feel exhausted. Frequency is up. New customer rate is flat."
3. "You're running 4 ad accounts across regions and can't see blended performance."
4. "Creative production can't keep pace with the testing volume you need."
5. "iOS attribution is broken and you're flying blind on cohort economics."
6. "Brand and performance teams are at war about creative direction."

Other pains named elsewhere:
- **Home:** vendor sprawl ("five vendors").
- **Calculators:** RTO and COD losses, CAC above break-even, cash burn, funnel leaks, thin first-order profit.

### Objections handled

- "No platform markups"
- "30-day exit clause"
- "No deck, no pitch" (about 14 uses of "no pitch" and variants)
- "NAMED REFERENCE AVAILABLE ON THE CALL"
- "If we're not the right fit, the 30-minute call will tell you that faster than a proposal will."
- "No handoffs to a third party, no 'ask your developer'"
- "Account-level numbers belong to the client, so we don't publish them here."
- "No email wall, no gated PDF"

### Objections ignored

- **Capacity:** four people serving 25 brands, with pods of five per client.
- **Who works on the account:** no names or faces anywhere.
- **Evidence:** zero case studies.
- **How ₹248Cr+ was calculated:** no methodology given.
- **Relevance of ROAS** for lead-gen or enterprise clients.
- **Pricing** for anything other than Meta.
- **Contract length:** 12-month minimum vs 30-day exit.
- **Access and ownership:** ad accounts and data.
- **Lead quality and CRM integration:** there is no CRM in the 18-platform stack.
- **Category experience** outside D2C.

---

## 3. Communication and messaging

### Core promise

"Performance marketing that survives the P&L." (Home H1 and title). It is supported by "measured on contribution margin, not on the dashboard screenshot".

### Value propositions, in the order they recur

1. **Profit over platform metrics.** "budgeted against contribution rather than platform ROAS" (Home); "ROAS is the by-product, not the goal." (Service Detail); the calculators. "contribution" appears 53 times, mostly in tools.
2. **One senior team instead of vendors.** "Five systems, one team."; "No account-manager layer." (Careers); "senior" appears 22 times.
3. **Compounding.** "revenue that compounds" (Our Work, Service Detail); "We compound"; "compound" appears 26 times.
4. **Creative as the lever.** "The ad is the strategy."; "Creative as the lever"; "retention is a creative problem" (testimonial); "Retention is a creative problem before it's a CRM problem." (LTV:CAC closer).
5. **Speed.** "14 days from kickoff", "Four weeks to a working engine", "No three-month discovery."
6. **Honesty and restraint.** "Nothing else is claimed on their behalf." (Home); "Where a number is not ours to publish, we have left it out." (Our Work); "we'd rather say so than list things we can't back" (Careers); "Honesty over polish." (About).
7. **Selectivity.** "We are not for everyone."; "We take on a small number of brands at a time."; "Limited · 8 audits per month" (audit modal); "We turned down ₹4.2Cr of retainer revenue last year." (Insights).

### Message hierarchy per page

| Page | Leads with | Then | Proof used | Closes with |
|---|---|---|---|---|
| Home | P&L promise + hero facts (₹248Cr+, 8.7x, 24 brands, 20+ platforms) | Second stats band (₹248Cr+, 8.7x, 27mo, 240+) > "not for everyone" + 25-name marquee > five systems > ten client cards (services only) > creative wall > stack > process | Anonymous testimonial | "Let's find out what an order is actually worth." + Book a strategy call / Run the numbers yourself |
| About | "Modern businesses don't fail because they lack products. They fail because growth itself has changed, and most teams haven't." | Adjective list > five wall rules > logo marquee (x4) > "Growth is never just one thing." > strategy/execution > culture > "open questions" notebook > long-term > "still evolving" > eight practices > who we like > "A note on the future" | None: zero numbers on page (its meta cites "a 27-month median tenure") | "Let's build something that actually matters." |
| Our Work | "25 brands. One common thesis: revenue that compounds." | 4 approved stats > filterable grid (brand, type, services) | Stats only | "One pod. Five systems. Built for revenue that compounds." + free brand audit |
| Service Detail | "Meta Ads that compound, not just convert." | Stats strip (8.7x, 240+, 14days, ₹3L+) > spec sheet > 6 pains > 4 pillars > Lepure service mix (no results) > 3 tiers > cross-sell | 8.7x, Lepure name | Same block as Our Work |
| Contact | "Let's talk about your brand." Three ways in | Calendly > brief form > locations/hours | None | Brief form |
| Tools hub | "The numbers we run before we take a client." | 6 calculators + glossary cards > "Why these three, in this order" | Implicit expertise | "Or skip the arithmetic and let us run it with you." |
| Calculators (x6) | Question H1 > "A number is not a verdict…" | Instrument > levers > 3 FAQs > cross-links | The model itself; "Every brand we take on gets this model in week one." | Identical 30-minute strategist paragraph |
| Careers | "People who write their own briefs." | Senior / Zero / 5 + 2 > client showcase > six things > disciplines > process > frustrate / do well | Client names | "Small is the job, not a phase we're passing through." |
| Insights | "We write what we actually ship." | Featured essay > 7 cards > newsletter | ₹4.2Cr, 32%, 12 brands, 2,400 readers | Subscribe |

### Consistency across pages

**Consistent**
- Home, Our Work, Service Detail, Tools and calculators share one voice and one thesis (P&L, contribution, compounding, senior, no pitch).
- The closing strategist CTA paragraph is identical on 7 tool pages.

**Inconsistent**
- **About reads like a different company:** abstract, behavioural and brand-led. "Marketing, at its best, is psychology meeting communication." and "Modern marketing isn't just creative any more. It's behavioural." It uses no numbers, never mentions contribution margin and never mentions P&L.
- **The service taxonomy changes by page:**

| Where | Count | Items |
|---|---|---|
| Home | 5 | Five systems |
| Contact form | 6 | "Performance, SEO + Content, Brand & Design, Tech / Site, Creative / UGC, Retention / CRM" |
| Careers | 7 | Disciplines, including "Lead generation" and "Data and measurement" |
| About | 8 | "Eight connected practices": Performance marketing, Branding, Websites, SEO, CRO, Marketplace growth, Content systems, Discoverability strategy |
| Client book | 8 | Service keys |
| llms.txt | 14 | Services including "Mobile App Development" and "Influencer Marketing", with the claim "Each has its own page under the Services hub" (no such hub or pages exist) |

- **The same metric gets different labels:** "Median blended ROAS across the last 12 months" (Home) vs "MEDIAN ROAS" (Our Work, Service Detail stats) vs "8.7× blended" (Home card) vs the title "Meta Ads Management for D2C Brands: 8.7× ROAS". The last one implies Meta platform ROAS, which the site's own glossary says "over-claims badly".
- **The slogan promises AI:** "Design × Marketing × Technology × Content × AI" (nav, footer, schema). There is no AI service or AI content. The only traces are About's "AI-driven discovery" and an "AI Workflow Engineer" role in schema with no posting.

---

## 4. Copy style

### Headline formulas

1. **Contrarian reframe, "X that Y, not Z":**
   - "Performance marketing that survives the P&L."
   - "Meta Ads that compound, not just convert."
   - "The ad is the strategy."
   - "We don't just advise on the stack. We run it."
   - "Retention is a creative problem before it's a CRM problem."
2. **Number + noun, two-beat:**
   - "Five systems, one team."
   - "Four weeks to a working engine."
   - "Four pillars. Every one of them, on every brand."
   - "Three tiers. Pick by ad spend, not by features."
   - "Four steps. Two weeks."
   - "Six things you'd feel in your first month."
3. **Direct question (every calculator H1):**
   - "Are your ads actually making money?"
   - "Where is your funnel leaking?"
   - "What is a customer really worth?"
   - "How long until this stops costing money?"
4. **Exclusion or selectivity:** "We are not for everyone. Just for the ones who ship."
5. **First-person identity statement:** "We write what we actually ship."; "People who write their own briefs."; "Built for the way modern brands actually grow."

### Voice and tone

Confident, founder-to-founder, numerate, anti-agency, dry. On the sales and tool pages the voice is specific and operational ("Hooks tested in the first 3 seconds", "a prepaid nudge at checkout usually does it"). On About it turns abstract and aspirational.

### Sentence length

Average words per sentence (sentences of 4+ words, line-split):

| Page group | Pages and averages |
|---|---|
| Sales and brand | Our Work 6.2, About 6.7, Contact 7.2, Service Detail 7.4, Home 8.3 |
| Tools | 8.5 to 10.9; glossary 10.9; tools hub 13.0 |
| Legal | 9.8 to 11.3 |

Very short, fragment-heavy copy. About stacks fragments to the point of losing sense, e.g. "Think independently. / before being told to / Move fast. / without losing care".

### Verbal tics

- "actually": 32 times across 13 of 18 pages
- "compound": 26
- "no pitch" and variants: 14
- "honest/honestly": 8

"Actually" in three H1s and one meta line starts to sound defensive.

### Jargon

The tool pages define jargon well, and the glossary is excellent ("Jargon never explained with more jargon."). Sales pages still use undefined shorthand:
- "D60 in a quarter"
- "1.4s median LCP"
- "iROAS"
- "CAPI"
- "D7, D30, D90 cohort views"
- "OTE"

None of iROAS, LCP, CAPI, UGC or D-notation cohorts is in the 53-term glossary.

### CTA wording

There are about 16 labels for what are really two actions (book a Calendly call, or submit a brief):
- "BOOK A CALL", "BOOK A STRATEGY CALL", "Book the call", "START THE CONVERSATION"
- "AUDIT MY META ACCOUNT", "BOOK A FREE BRAND AUDIT", "GET A FREE AUDIT", "Request the audit"
- "START A PROJECT", "START SMALL"
- "SEND THE BRIEF", "SEND A BRIEF", "Not ready for a call? Send a brief instead", "Or send a brief instead"
- "WhatsApp the studio", "Request a proposal"

The calculators' micro-CTAs are best-in-class: "Model +10% AOV →", "Model 4% lower →", "Model slower growth →".

### Readability defects

These look like leftovers from em-dash removal:

| Page | Text |
|---|---|
| Privacy | "Deletion, ask us to remove your data." / "Usage data, anonymized pageviews and event data via GA4 and Microsoft Clarity" |
| Glossary | "What the business actually keeps once everything: costs, depreciation and tax - is paid." / "product, shipping, payment fees, returns - but before marketing and salaries" / "A blunt instrument, cheap clicks from the wrong audience cost more" / "moulds, machinery, tooling, software - charged a bit each month" |
| Tools hub | "No email wall, no gated PDF, no drip sequence - put your numbers in" |
| About | Lead-ins ending in a spaced hyphen: "A BRAND DOESN'T GROW BECAUSE OF -", "GROWTH HAPPENS WHEN -", "WE ENJOY WORKING WITH -" |
| Organization schema | "measured on contribution margin: not dashboard ROAS" |

Other errors:
- "CHECKOUT OUR D2C CALCULATORS" (6 calculator pages; should be "Check out").
- "● META ADS · I/V SERVICES IN REVENUE ACCELERATORS" (Service Detail eyebrow, unintelligible).
- "Looking to join the studio? See open roles or write to hr@." (Contact; the address is truncated).

### Best lines (verbatim)

1. "Performance marketing that survives the P&L." (Home H1)
2. "Ten of the twenty-five. Each card carries the brand, the kind of business it is in and exactly the services we run for it. Nothing else is claimed on their behalf." (Home)
3. "We take on a small number of brands at a time. If we're not the right fit, the 30-minute call will tell you that faster than a proposal will." (Home)
4. "Shopify builds, checkout, speed and CRO: the highest-leverage ad you own is the page the ad lands on." (Home)
5. "Twice the budget buys roughly 1,084 orders at exactly the same ROAS. Spend buys volume, not efficiency." (Funnel ROAS)
6. "You want a big-company benefits sheet. We don't have one yet, and we'd rather say so than list things we can't back." (Careers)

Honourable mentions:
- "A run rate quoted off a festive-season month is a marketing claim, not a forecast." (Glossary)
- "Three tiers. Pick by ad spend, not by features." (Service Detail)

### Weakest lines (verbatim)

1. "Ambitious. Creative. Sharp. Modern. Adaptable. Execution-heavy. Founder-led. Growth-obsessed." (About). Eight adjectives, no evidence.
2. "Let's build something that actually matters. Not just campaigns. Not just content. Not just visibility. Something people genuinely remember." (About). Generic; could be any agency.
3. "Honestly? This is one of the most interesting times to be building brands online." (About)
4. "● META ADS · I/V SERVICES IN REVENUE ACCELERATORS" (Service Detail). Internal taxonomy leaking into copy.
5. "Five days in studio. Two from home." next to "5 + 2 STUDIO + HOME DAYS" (Careers). Reads as a seven-day week. The job form describes hybrid as "3 in Office, 2 from home".
6. "We spent ₹4.2Cr last year acquiring customers we'd already paid to acquire once." (Insights). Written as if MMC were a brand with its own customers. The same ₹4.2Cr is reused two posts later: "We turned down ₹4.2Cr of retainer revenue last year."

Also weak:
- "Read the handbooks, not the logo wall." (Our Work meta). No handbooks exist, and the page is now a logo-and-services grid.
- "EST. ONGOING · FOREVER" (About).

---

## 5. Content style and information

### Page types and depth

The word-count table is in section 0.

- **Deepest asset:** the tools cluster (59% of words). Each calculator has:
  - live sliders, with Simple/Advanced toggles on Unit Economics and Break-even
  - charts (cash curve, profit bars, funnel bars, waterfall)
  - full tables (a 36-month projection on CAC Runway; a monthly P&L on Unit Economics)
  - scenario buttons
  - "Share result" and "Download report" (the download calls `window.print()`, so there is no gate)
  - three visible FAQs
  - cross-links to the other calculators
- **Glossary:** 53 terms in 8 categories, each with a definition, formula and "WHY IT MATTERS", plus search and category filters.
- **Thin sales pages:**
  - Our Work: 379 words for a 25-brand portfolio, with no stories.
  - Contact: 325 words.
  - Service Detail: 671 words, and it is the only service page.
- **About:** 1,075 words of manifesto with no facts (no founders, founding story, team, numbers or locations).

### Sales vs educational

- **Educational (tools and glossary):** rigorous, India-specific, genuinely useful, and the strongest differentiator on the site.
- **Sales content:** asserts rather than demonstrates (see section 6).
- **Insights:** would bridge the two, but it is a shell. There are 8 teasers, every card links to `href="#article"` (source `insights/InFeed.jsx`), no article pages exist, and the newest post is dated "FEB 14, 2026", seven months before this audit.

### Formats present

- Interactive calculators (6)
- Glossary with filters
- FAQs (calculators only)
- Pricing table (Service Detail)
- Process timeline (Home)
- Partner stack grid (Home)
- Creative wall with format filters "REELS 9:16 / FEED 4:5 / SQUARE 1:1 / WIDE 16:9" (Home)
- Filterable client grid (Our Work)
- Job description with a two-step application
- Newsletter sign-up
- Calendly embed (Contact)
- WhatsApp deep link

### Formats absent

- Case studies of any kind. `WorkFeatured.jsx` deliberately `return null`, and `llms.txt` says "There is no written case study on the site at present."
- Video: 0 videos on all 18 pages. A local `Video portfolio/` folder holds three MP4s, e.g. "Deepal final - TGG.mp4", and the Home creative section talks about reels.
- Team or founder bios and photos with names.
- Published articles.
- FAQs on Home, Service Detail or Contact.
- Service pages for anything other than Meta (none for Google, Amazon, SEO, web/Shopify, creative/UGC, retention, lead generation, social).
- Industry or vertical pages.
- Location pages.
- Comparison or "why MMC vs in-house/agency" content.
- Reviews or third-party ratings.
- Press or awards.
- Downloadable benchmarks or reports.
- Webinars or events.
- Any lead-gen or B2B tool (e.g. cost per lead, lead-to-sale).

### Other content defects

- **Tools hub:** says the glossary has "39 terms", while the glossary page, its title and schema say 53. The glossary card's button reads "OPEN THE CALCULATOR". The section heading "Why these three, in this order" sits over six calculators.
- **Insights filter counts:** "All 7", "Founder's Journal 1". Eight posts are shown, two of them Founder's Journal. The "EXPERT VOICES" category names no expert.
- **Benchmarks are unsourced:** "Bands on each slider are Indian D2C medians"; "Lift impression → click from 1.2% to the 1.5% median"; "Above 45% … below 28%"; "4–8% is typical". No source or sample size is given, which is a credibility risk because the site's whole brand is numerical honesty.

---

## 6. Proof and trust

### 6a. Every number, by status

**Approved four**

| Figure | Where it appears | Consistency |
|---|---|---|
| ₹248Cr+ revenue compounded | Home hero ("Revenue compounded") and stats band ("Revenue compounded for clients since 2019"); Home meta; Our Work stat + title + OG; Org schema ("across 24 brands"); `llms.txt` ("across the client book") | Denominator varies: 24 brands (schema, hero), 25 brands (marquee), 14 D2C brands (Our Work title); legacy `home-v1` SEO says "across 14 brands". No methodology. |
| 8.7x median blended ROAS | Home hero, stats band ("across the last 12 months"), Performance media card ("8.7× blended"); Our Work ("MEDIAN ROAS"); Service Detail stat, title, meta ("Median 8.7× ROAS, live on your account in 14 days"), schema ("across our D2C book") | Label drifts between blended and plain ROAS, and between a book-wide and a Meta-specific figure. Shown to B2B/B2C visitors where ROAS may not apply. |
| 14/14 renewed | Our Work stat ("BRANDS RENEWED") and meta; audit modal ("14/14 brands renewed last year") | Missing from Home. The modal adds "last year", the others give no timeframe. 14 of what, when the book is 25? |
| 27 months tenure | Home ("27mo Median client tenure: we're measured on staying"); Our Work ("27mo MEDIAN TENURE"); About meta ("27-month median tenure", not in About body) | Always "median" on site; the brief says "average". |

**Other numbers presented as performance, scale or capability claims (outside the four)**

| Number | Page | Risk |
|---|---|---|
| "24 Brands scaled" | Home hero (pre-rendered) | Contradicts 25; "scaled" implies results for brands with no recorded services |
| "20+ Platforms operated" vs "Eighteen platforms" | Home | Self-contradiction on one page |
| "240+ Creative assets shipped every month" / "240+ CREATIVES SHIPPED / MO" / meta "240+ creatives a month" | Home x3, Service Detail | Capacity claim for a team of four; conflicts with per-brand 60–80 |
| "1.4s median LCP" | Home (Conversion & technology card) | Performance claim with no source |
| "D60 in a quarter" (card stat) and testimonial "They fixed our D60 in a quarter." | Home | A client result from an unnamed client; outside the four |
| "14days ONBOARDING" / "The 14-day onboarding sprint" vs "Four weeks to a working engine" | Service Detail, Insights, Home | Compatible but framed differently |
| "The triangulation model we've moved 12 brands onto" | Insights | Unverified count |
| "Cycle time dropped 32%" | Insights | Internal metric, unsourced |
| "We spent ₹4.2Cr last year acquiring customers…" and "We turned down ₹4.2Cr of retainer revenue last year." | Insights | Same figure for two unrelated claims; ₹4.2Cr is also the "before" revenue in the noindexed DeoBar handbook ("₹4.2Cr to ₹24.6Cr revenue", `seo.json`) |
| "2,400 readers across India, US, UK, and UAE" | Insights | Unverified; no archive exists |
| "Limited · 8 audits per month" | Audit modal (all pages) | Scarcity claim |
| "We're four people" / schema 28 employees | Careers / Organization schema | Direct contradiction |
| Pricing ₹3L / ₹6L / ₹12L+, "₹3Cr – ₹150Cr" | Service Detail | Contradicts `llms.txt` "does not publish pricing" |
| "Own ₹50L+ of monthly Meta spend across three D2C accounts", "Personally spent ₹50Cr+ across your career", "₹24L – ₹38L · OTE" | Job Detail | Recruiting; implies MMC's largest accounts spend ₹50L+/month on Meta |
| Response claims: "AVG. RESPONSE 4 HOURS", "inside one working day", "often in four", "within the hour", "RETURNS IN 48 HOURS" | Home, Contact, About, modal | Four different SLAs |

### 6b. The homepage stats band is baked as zeros in the pre-rendered HTML

**This is the most urgent finding.** The static `index.html` (what `prerender.py` produced, and what the README says ChatGPT, Perplexity and Claude read) contains:

> "The part that matters ₹0 Cr+ Revenue compounded for clients since 2019 0.0 × Median blended ROAS across the last 12 months 0 mo Median client tenure: we're measured on staying 0 + Creative assets shipped every month"

- The count-up animation ran from zero and the prerender snapshot caught the start values.
- The hero band above it is baked correctly ("₹248 Cr+ … 8.7 × … 24 … 20 +").
- The other 17 pre-rendered pages were scanned and have no zero-baked counters.
- Browser visitors see the real values, which is why the corpus shows ₹248Cr+.

### 6c. Testimonials

There is exactly one, on Home, and it is anonymous:

> "We'd worked with three agencies before MMC. None of them understood that retention is a creative problem. They fixed our D60 in a quarter." Founder · D2C beauty. NAMED REFERENCE AVAILABLE ON THE CALL

- It carries no name, photo or brand.
- "D2C beauty" does not map clearly to any brand in the client book.
- It embeds a result ("fixed our D60 in a quarter") that falls outside the four approved figures.

### 6d. Case studies

Zero. What exists instead:
- **Our Work:** "Where a number is not ours to publish, we have left it out."
- **Service Detail:** uses Lepure as a service-mix example: "MMC runs four workstreams for Lepure: the website, D2C performance ads, performance creative, and social media." It states "Account-level numbers belong to the client, so we don't publish them here." This is honest, but it is not proof.

**Legacy risk.** `Brand Handbook.html` still exists in the build. Its `seo.json` entry reads "DeoBar Case Study: 3.1× to 11.8× ROAS in 90 Days". It is `noindex`, but `page-audit.json` shows it pre-rendered with Article schema and 42 internal links. Meanwhile:
- DeoBar is not in `clients.json`.
- `WorkFeatured.jsx` states that the featured case study's "entire content was invented".

It is not in the sitemap but may still be reachable by URL. Also still in the build: `home-v1.html` and `home-classic.html`. They are blocked in `robots.txt` (which does not deindex or unpublish) and carry the legacy FAQ "About 60% of our work is D2C…". `home-v1.html` is built from `home/sections-c.jsx`, which contains an Education stat "92k Qualified leads · last yr" that has no source in the client book.

### 6e. Logos

- **Where they appear:** 25 names in the Home and About marquees (About repeats them about 4 times; 102 images on About, 124 on Home).
- **Services recorded:** 15 of the 25. The other 10 were added from a logo pack with `services: []`: Anchor by Panasonic, Flomate, Green Hermitage, Housing.com, JSW, LearningMate, Rustomjee, Saint-Gobain, Gyproc, Club Mahindra.
- **Record quality:** `clients.json` flags these 10 as "a weaker record than anything else in this file" and notes "Gyproc is a Saint-Gobain brand and both are listed separately". Three more (OOsh, Panda Cabs, MVJ College of Engineering) have types and services "read off the artwork", pending confirmation.
- **Hover copy conflicts:** Home says "Hover any one to see the work." For the 10 logo-only brands there is no work to see.
- **Permission claim:** Terms asserts "Client logos and case-study assets are shown with the client's permission". That needs to be true for all 25, especially the enterprise names.
- **Logo fidelity:** the README's known gaps say the logos in `*Logos.jsx` are "hand-drawn approximations of real third-party wordmarks". Check which versions are live.
- **Alt text:** the corpus crawler counted 52 Home images, 15 Our Work images and 5 Careers images without alt, while `page-audit.json` reports 0. These are probably empty `alt=""` on duplicated marquee items. Since logos are proof, the first instance of each should carry the brand name.

### 6f. Partners, awards, people

- **Partner badges:** "PARTNER" labels on Meta Ads, Google Ads and Shopify Plus, with no badge image, directory link or partner ID.
- **TikTok:** "TikTok Ads" is in the stack and "TikTok / Reels-led" is a spend option in the audit modal. TikTok has been unavailable in India since 2020, so for an India-first site this signals template copy unless it refers to international accounts.
- **Awards and press:** none. `llms.txt` confirms "does not publish … ratings or awards".
- **People:**
  - Founders are never named.
  - "Head of Performance" is unnamed.
  - About has one image labelled "The MMC team".
  - There are no Person schema entities and no LinkedIn profiles.
  - The contact CTAs promise "a senior strategist" and "a founding strategist" without names.

**Credibility assessment.** The honesty framing is excellent and rare. But proof rests on four unexplained aggregate numbers, one anonymous quote and a logo wall, 40% of which has no recorded work, while scale claims (four people vs 28 employees, four satellite cities, 240+ assets a month) undermine the four numbers.

---

## 7. Conversion design

### 7a. Conversion paths (from source and captured links)

| Path | Trigger labels | Mechanism |
|---|---|---|
| Book a call | "BOOK A CALL" (nav, footer), "BOOK A STRATEGY CALL", "Book a strategy call", "START THE CONVERSATION", "Book the call" | `window.mmcBookCall()` opens a Calendly overlay; URL slug `calendly.com/mmc-agency-ww/audit-onboarding-calls` |
| Brief / free audit modal | "Not ready for a call? Send a brief instead" (every page), "Or send a brief instead", "BOOK A FREE BRAND AUDIT", "AUDIT MY META ACCOUNT" | `mmcOpenBrief()` opens the `AuditModal` form |
| Contact brief form | "SEND THE BRIEF" | Inline form on Contact |
| WhatsApp | "WhatsApp us", "WhatsApp the studio +91 96194 72727 · reply in the hour" | `wa.me/919619472727` (Contact, About) |
| Proposal | "Request a proposal … sales-in@mondaymarketing.company RETURNS IN 48 HOURS" | Email |
| Inline calendar | "PICK A SLOT Thursday works? Take it." | Calendly embed (Contact) |
| Newsletter | "SUBSCRIBE" (Insights), field "you@brand.com" | Form |
| Job application | "PROCEED TO SCREENING" | Two-step form (Job Detail) |

### 7b. Lead CTA count per page (from corpus CTA lists)

| Page | CTA labels (count) |
|---|---|
| Home | BOOK A STRATEGY CALL (3), BOOK A CALL (2), Send a brief instead (1); plus SEE THE WORK (2), HOW WE BUILD CREATIVE (1), RUN THE NUMBERS YOURSELF (1) |
| About | START THE CONVERSATION (2 + card variant), BOOK A CALL (1), WhatsApp (1), Send a brief (1), See what we do (1), WHAT WE BELIEVE (1) |
| Our Work | BOOK A CALL (1), BOOK A FREE BRAND AUDIT (1), START A PROJECT (1), SEE THE WORK FIRST (1), Send a brief (1) |
| Service Detail | AUDIT MY META ACCOUNT, SEE THE WORK, SEE PACKAGES, START SMALL, MOST COMMON, FOR SCALE, BOOK A FREE BRAND AUDIT, SEE THE WORK FIRST, GET A FREE AUDIT, BOOK A CALL, Send a brief (11 total) |
| Contact | Book the call, SEND THE BRIEF, SEND A BRIEF, BOOK A CALL, WhatsApp, email, inline Calendly, Send a brief (8 routes) |
| Each calculator | Book a strategy call (2), BOOK A CALL (2), Or send a brief instead (1), Send a brief (1), plus Reset / Share / Download / Model buttons |
| Careers | SEE WHERE WE'RE HIRING, OR PITCH US YOUR OWN ROLE, PITCH US YOUR ROLE, VIEW OPEN ROLES, BOOK A CALL, Send a brief |
| Insights | SUBSCRIBE, SUBSCRIBE TO INSIGHTS, BOOK A CALL, Send a brief |
| Privacy / Terms | BOOK A CALL (2), Send a brief (1) |

### 7c. Forms and fields

**1. Audit modal** (global; `aria-label="Free brand audit"`)
- Left panel: "Limited · 8 audits per month", "A 30-minute look at where your momentum is leaking.", three deliverables ("Funnel diagnostic", "Retention forensic", "Creative + brand read"), "14/14 brands renewed last year".
- Fields: "Your name"\*, "Work email"\*, "Brand name"\*, "Website", "Annual revenue · last 12 months"\* (5 chips), "Where you spend most" (chips "Meta + Google", "Amazon + Quick-com", "TikTok / Reels-led", "Email + SMS / Owned", "Mixed · Everything"), "What's the one thing you'd fix tomorrow if you could?".
- That is 7 fields, 4 required. There is no phone or WhatsApp field, even though Contact calls WhatsApp the "QUICKEST" channel.
- Submit button: "Request the audit". Fine print: "No pitch decks · No spam · Reply within 1 working day."

**2. Contact brief form**
- Fields: "YOUR NAME"\*, "WORK EMAIL"\*, "BRAND NAME"\*, "ANNUAL REVENUE · LAST 12 MONTHS"\*, "SYSTEMS YOU'RE INTERESTED IN" (6 chips), "WHAT WOULD YOU FIX TOMORROW?".
- There is no website field (the modal has one), and no "Lead generation" option, even though 6 clients buy it.

**3. Job application** (step 1 of 2)
- Fields: "YOUR FULL NAME"\*, "EMAIL"\*, "PHONE", "LINKEDIN", "CURRENT CTC"\*, "EXPECTED CTC"\*, "NOTICE PERIOD", "RESUME / CV"\* (upload or link), "HOW DO YOU WANT TO WORK?"\* (Onsite / Hybrid / Remote). Step 2 is "4 short role-specific questions".
- This contradicts Careers: "Apply with a single page, no resume required" and "No resume, no cover letter, no portal."

**4. Newsletter:** one email field.

**5. Calculators:** no email capture at all. "Download report" just prints the page. This matches the "No email wall" promise but means zero lead capture from 59% of the site's content, apart from the generic strategy-call block.

### 7d. Lead magnets

- **Free brand audit.** The offer is defined inconsistently:
  - as a 30-minute call: "A 30-minute look…" (modal);
  - as written feedback delivered in "One working day" (Our Work / Service Detail: "We'll read your funnel, retention, creative, and architecture, and come back with the three things to fix first. No pitch. One working day.");
  - as a Meta-only audit: "AUDIT MY META ACCOUNT".
  - The strategy call and the audit are both booked through the same Calendly event, "audit-onboarding-calls".
- **Six free calculators and the glossary** ("No email wall, no gated PDF").
- **Newsletter:** "One letter, every Monday morning." Privacy calls it "the Monday Letter". It has good brand fit but no archive.

### 7e. Broken or mis-targeted CTAs and links

In the pre-rendered DOM the page-specific footer CTA always links to the Calendly audit URL, whatever its label says:

| Label | Page |
|---|---|
| "VIEW OPEN ROLES" | Careers |
| "APPLY FOR THIS ROLE" | Job Detail |
| "SUBSCRIBE TO INSIGHTS" | Insights (source passes `href: "#inf"`; the captured href is Calendly, so verify in a browser) |
| "SEND A BRIEF" | Contact |
| "START A PROJECT" | Our Work |
| "GET A FREE AUDIT" | Service Detail |

Other link problems:
- **"HOW WE BUILD CREATIVE" on Home** goes to `Contact.html` (`home26/showcase.jsx`), not to anything about creative.
- **"SEE THE WORK" on Service Detail** links back to `Service%20Detail.html`, i.e. itself.
- **"SEE THE WORK FIRST"** appears on Our Work, which is already the work page.
- **"VIEW ON MAPS" on Contact** links to the bare domain `https://maps.app.goo.gl/` with no place ID.
- **Insights:** "READ THE ESSAY" and every card link to `#article`.
- **Job Detail:** "Cookies" in the footer self-links.

### 7f. Friction and repetition

- **Offer confusion:** call, free audit, Meta audit, proposal, brief and project are all offered, with four different response SLAs and two phone numbers:
  - +91 96194 72727: WhatsApp, and the sales `ContactPoint` in schema.
  - +91 766 630 9102: footer, Privacy, `llms.txt`, Organization `telephone`.
- **Opening hours conflict (Contact):** "MON–SAT · 10:00 – 19:00 IST" on the card vs "10:00 – 14:00 · Sat" in the hours block.
- **Boilerplate repeated 7 times:** "A number is not a verdict. Nothing here is a judgement on your brand…" and "A calculator tells you where the problem is. It won't tell you which of the five levers to pull first…" appear on the tools hub and all six calculators. "One pod. Five systems. Built for revenue that compounds." is duplicated on Our Work and Service Detail.
- **Qualification gap:** the revenue chips start at "Pre-launch / 0–10L", which invites leads that the ₹3L/month floor rules out. Nothing on the site says who is not a fit in hard terms.
- **Nothing for non-D2C buyers:** there are no lead-gen, B2B or institution fields anywhere in the forms.

---

## 8. Information architecture and SEO

### URL and file naming

Three conventions are mixed:
- Title Case with spaces (percent-encoded): `About.html`, `Our%20Work.html`, `Service%20Detail.html`, `Job%20Detail.html`
- Lowercase: `tools.html`, `index.html`
- Kebab-case: `unit-economics-calculator.html`, `d2c-marketing-glossary.html`

Every URL keeps the `.html` extension. Two URLs are template names rather than topics:
- `Service Detail.html` is the Meta Ads page.
- `Job Detail.html` serves roles through `?role=` query strings. Careers ItemList schema lists 8 such URLs; the sitemap lists only the base.

### Templates in use

| Template | Pages |
|---|---|
| Home | 1 |
| Secondary page hero (`page-hero`) | About, Work, Careers, Insights, Contact, legal |
| Service | 1 |
| Job | 1 |
| Tools hub | 1 |
| Calculator (`page-hero--compact`) | 6 |
| Glossary | 1 |

### Navigation

- **Menu:** Home, Our Work, Free Tools (7 sub-items), About Us, Careers (6 roles with locations), Insights, Contact.
- **There is no Services item** in either the nav or the footer.
- **Footer groups:**
  - "Company": About MMC, Our Work, Insights, Careers, Contact
  - "What we do": "Case studies", "Free tools". There are no case studies, and this is the only "what we do" navigation.
  - "Calculators": six
  - "Reference": Glossary, Privacy, Terms
- **Footer tagline:** "Quietly outperforming, since 2019."

### Internal linking

- **Identical link set everywhere:** every page's captured links resolve to the same 16 internal URLs (7 nav, 7 tools, 2 legal). Nav anchors were captured with empty anchor text; verify that the pre-rendered menu exposes text labels.
- **Service Detail is orphaned:** none of the other 17 pages links to it. It is reachable only through the sitemap.
- **No links out of Our Work:** cards do not link to brand pages, services or tools.
- **No contextual links from sales pages into tools,** except "RUN THE NUMBERS YOURSELF" on Home.
- **The calculators interlink well:** "CHECKOUT OUR D2C CALCULATORS" blocks, and the glossary's "PUT THESE NUMBERS TO WORK". But individual glossary terms don't link to the calculator that computes them, and sales pages never link into the glossary.

### Sitemap and robots

- **Sitemap:** exactly the 18 corpus URLs.
- **robots.txt:** disallows `/admin/`, `/home-classic.html` and `/home-v1.html`, and adds a non-standard `LLM-Content: …/llms.txt` line.
- **Page count mismatch:** the README says "all 36 pages" were pre-rendered (about 56,000 words), so roughly half the built pages are outside the sitemap. That includes the noindexed `Brand Handbook.html` and the legacy homepages.
- **Home canonical mismatch:** the `<link rel=canonical>` is `https://www.mondaymarketing.company/index.html`, while the sitemap and WebPage schema use `https://www.mondaymarketing.company/`. This is a duplicate-URL risk on the most important page.

### Titles

- **Format:** `Topic: Benefit | MMC`. Every title is 50 to 55 characters, within the `seo.json` target of 50 to 60.
- **"Monday Marketing Company" appears in no title.** The acronym "MMC" is ambiguous in search.
- **Only two titles carry geography:** Home ("MMC India") and Job Detail ("Mumbai & Bengaluru").
- **Claims in titles:** "Meta Ads Management for D2C Brands: 8.7× ROAS" and the wrong "Our Work: 14 D2C Brands and ₹248Cr+ Compounded".

### Meta descriptions

- **Lengths:** 141 to 170 characters. Careers is 170, over the 155 limit (flagged in `page-audit.json`).
- **Style:** benefit-led and numerate. For example: "Stop chasing a ROAS number you heard on a podcast. Enter COGS, shipping, gateway fees and RTO to get the exact break-even your own cost sheet demands."
- **Factually wrong:**
  - Our Work: "Read the handbooks, not the logo wall. What we shipped for each brand, why it worked and what we'd have done sooner." No such content exists.
  - About: cites "five connected systems and a 27-month median tenure", but the page says "Eight connected practices" and uses no numbers.

### Schema

**Present**
- Home: `Organization` + `WebSite` + `WebPage` + `BreadcrumbList`
- Contact: `ContactPage` + `ProfessionalService` (hours, two ContactPoints)
- Service Detail: `Service` (category "Revenue Accelerators", areaServed India)
- Job Detail: `JobPosting`
- Our Work: `CollectionPage`
- Careers: `ItemList` of 8 roles
- Calculators: `WebApplication` + `Offer` (price 0) + `FAQPage` (3 visible Qs each)
- Glossary: `DefinedTermSet` (53 `DefinedTerm`) + `FAQPage`
- Breadcrumbs on all pages

**Problems**
- **Organization:** `numberOfEmployees` 28 (vs "four"); description "₹248Cr+ compounded across 24 brands" (vs 25); `telephone` +917666309102 vs sales ContactPoint +919619472727.
- **JobPosting:** `validThrough: 2026-08-01` has expired while the page says "APPLY WINDOW Rolling · open now". `addressLocality: Mumbai`, while the page offers Bengaluru and "Remote Work from home (Worldwide)" with no `jobLocationType`/`TELECOMMUTE`.
- **Careers ItemList:** lists 8 roles. Two ("AI Workflow Engineer", "Account Director · Growth") have no posting (README). The menu shows 6.
- **Glossary FAQPage:** four questions ("What is a good ROAS for a D2C brand?", "What is the difference between ROAS and MER?", "Should LTV be calculated on revenue or contribution?", "What is RTO and why does it matter in India?") that do not appear as visible Q&A on the page, which breaks FAQ rich-result guidelines.
- **Missing entirely:**
  - No `Person` for founders or leaders, so the site has no E-E-A-T entity.
  - No `Blog`/`Article` on Insights.
  - No `ItemList` of clients on Our Work.
  - No `Service` entities for the other systems.
  - The tools hub has only `BreadcrumbList`.

### AI-search readiness

**Strengths**
- Every page is pre-rendered (`prerendered: true` in `page-audit.json`).
- `llms.txt` exists, with a "Figures the company publishes" section and a "How to answer questions about this company" section. Both are strong guardrails.
- Clean canonicals on secondary pages.
- The linkable free-tools surface is exactly what answer engines cite.

**Defects**
1. The pre-rendered Home stats band reads "₹0 Cr+", "0.0 ×", "0 mo", "0 +" (section 6b).
2. `llms.txt` contradicts the site:
   - "does not publish pricing" (Service Detail does);
   - "Each has its own page under the Services hub" (no hub exists);
   - "A D2C performance-marketing agency" (64% of the book is not D2C; About says "Not a traditional agency");
   - "A team of four" (schema says 28).
3. No FAQ content on commercial pages, so common answer-engine questions have nothing to quote. Examples:
   - "How much does MMC charge?"
   - "Does MMC work with colleges?"
   - "Where is MMC based?"
   - "Who founded MMC?"
4. Legacy pages carrying unverified claims remain in the build, blocked only by robots.

---

## 9. Weaknesses and inconsistencies (ranked)

### 1. Zeroed proof in the HTML that answer engines read

Home's second stats band is pre-rendered as "₹0 Cr+ … 0.0 × … 0 mo … 0 +".

- **Impact:** the site's flagship proof reads as zero to the non-JS crawlers the README explicitly built the prerender for.
- **Evidence:** static `index.html` (section 6b).

### 2. Positioning does not match the client book

The site is 100% D2C unit economics, but most of the book is not D2C and the recorded work is mostly web, lead gen, creative and social.

- **Book composition:** 16 of 25 brands are B2B or B2C.
- **Work recorded (of 15 brands with services):** web on 13, creative on 15, lead gen on 6, social on 7. Retention and brand/packaging, two of the five Home "systems", have zero clients.
- **D2C-only surfaces:** every tool, the only service page, the pricing, the audit modal, the form placeholder and `llms.txt`.

### 3. Contradictory scale claims

- **Team:** "We're four people" (Careers) vs `numberOfEmployees: 28` (schema) vs "Full senior pod (2 buyers, 1 strategist, 2 creatives)" per client vs "SATELLITE TEAMS Bengaluru / Dubai / London / New York".
- **Brands:** "24 Brands scaled" vs "TRUSTED BY 25 BRANDS" vs "14 D2C Brands" (Our Work title).
- **Platforms:** "20+ Platforms operated" vs "Eighteen platforms".
- **Output:** "240+ … every month" vs "60–80 … per brand".

### 4. Proof is thin, anonymous and partly outside the approved-figure rule

- Zero case studies.
- One anonymous testimonial, containing an unapproved result ("fixed our D60 in a quarter").
- No named people.
- 10 of 25 logos have no recorded work, yet Home says "Hover any one to see the work."
- Unapproved numbers: "1.4s median LCP", "D60 in a quarter", "12 brands", "32%", "₹4.2Cr" (twice, for different claims), "2,400 readers", "Limited · 8 audits per month".
- Unverified "PARTNER" badges.

### 5. Broken or mislabelled CTAs across the funnel

- "VIEW OPEN ROLES", "APPLY FOR THIS ROLE", "SUBSCRIBE TO INSIGHTS", "SEND A BRIEF", "START A PROJECT" and "GET A FREE AUDIT" all resolve to the sales Calendly.
- "HOW WE BUILD CREATIVE" goes to Contact.
- Service Detail "SEE THE WORK" is a self-link.
- "VIEW ON MAPS" is a placeholder.
- All Insights articles link to `#article`.

### 6. Offer confusion and conflicting service levels

- **Offers:** strategy call vs "free brand audit" (described both as a 30-minute call and as feedback in "One working day") vs "AUDIT MY META ACCOUNT" vs "Request a proposal" vs "START A PROJECT".
- **Response SLAs:** "4 HOURS" vs "one working day" vs "within the hour" vs "48 HOURS".
- **Phone numbers:** two.
- **Hours:** two sets.

### 7. No service architecture

- One service page (Meta Ads), orphaned, at `Service Detail.html`.
- No Services hub or nav item.
- The taxonomy changes by page: 5 systems (Home), 6 (Contact), 7 disciplines (Careers), 8 practices (About), 14 services (`llms.txt`).
- Lead generation, the dominant service for the B2B/B2C half of the book, has no page.

### 8. Commercial terms contradict each other

- "12-month retainer" / "12-month minimum" vs "30-day exit clause" (same page).
- Published pricing vs `llms.txt` "does not publish pricing".
- "BEST FOR D2C brands · ₹3Cr – ₹150Cr" vs form chips starting at "Pre-launch / 0–10L".

### 9. Factual errors in metadata and labels

- Our Work title "14 D2C Brands".
- Our Work meta "Read the handbooks".
- About meta "five connected systems … 27-month median tenure" (not on page).
- Tools hub "39 terms" vs 53.
- "Why these three" over six calculators.
- Glossary card CTA "OPEN THE CALCULATOR".
- Insights "All 7" with 8 posts shown, and "Founder's Journal 1" with 2 shown.
- "CHECKOUT OUR D2C CALCULATORS".
- "I/V SERVICES IN REVENUE ACCELERATORS".
- "write to hr@." (truncated).

### 10. About is generic and off-thesis

- 1,075 words, zero numbers, no founders.
- Stacked adjectives ("Ambitious. Creative. Sharp. Modern…").
- Clichés ("Let's build something that actually matters.").
- "Not a traditional agency" vs `llms.txt` "agency".
- It is the page where a buyer checks who they would be hiring, and it gives them nothing checkable.

### 11. Careers and Job Detail contradict themselves

- "Five days in studio. Two from home." / "5 + 2 STUDIO + HOME DAYS" vs the form's "Hybrid 3 in Office, 2 from home" and "Remote … (Worldwide)".
- "no resume required" vs "RESUME / CV \*".
- "Senior Meta Buyer · Mumbai" (menu) vs "MUMBAI · BENGALURU" (page) vs "Five days at the Thane studio" (form).
- `JobPosting` expired 2026-08-01 while the page says "Rolling · open now".
- 8 roles in schema, 6 in the menu, 2 with no posting.

### 12. Insights is a facade

- 8 teasers, no articles, all `#article`.
- Newest post dated 14 Feb 2026.
- Unverifiable reader count.
- This undercuts "We write what we actually ship."

### 13. Invented or legacy content still in the build

- `Brand Handbook.html`: DeoBar "3.1× to 11.8× ROAS", noindex but pre-rendered, while `WorkFeatured.jsx` says the featured case content was invented.
- `home-v1.html` and `home-classic.html`: robots-blocked only. Legacy FAQ "About 60% of our work is D2C"; the source component carries "92k Qualified leads · last yr".

### 14. Punctuation left over from em-dash removal

Visible on Privacy, Glossary, Tools, About and in Organization schema (see section 4). It reads as sloppy on a site that sells precision.

### 15. Geography and entity muddle

- "Bengaluru & Mumbai" (hero) vs Thane HQ with four satellite cities (Contact).
- areaServed India/UAE/UK/US in Organization schema vs India only in Service schema.
- No city pages, and no city terms in sales-page titles.

### 16. SEO hygiene gaps

- Home canonical `/index.html` vs `/`.
- Spaces and mixed case in URLs.
- Brand name absent from titles.
- Glossary FAQ schema not visible on the page.
- No `Person`, `Article` or client `ItemList` schema.
- Nav captured with empty anchor text.
- Possible empty-alt logos (52 on Home per crawler).

### 17. Calculators capture no leads and use unsourced benchmarks

The deepest 59% of the site converts only through a generic strategy-call paragraph. "Indian D2C medians" are never sourced.

### 18. Privacy and minors

Privacy says "We do not collect data from anyone under 16." India's DPDP Act 2023 defines a child as under 18. This matters if MMC runs student-facing lead gen on client properties or its own site; flag for legal review.

Also minor: Hotjar is listed under cookies but omitted from the "Usage data" line.

---

## 10. Education-sector readiness

### 10a. What exists today

**Clients**

| Client | Type on site | Services recorded | Source quality | Where it appears live |
|---|---|---|---|---|
| Bloom Edutours | B2B | Website redesign and development, Lead generation, Performance creative, Social media | Supplied client record | Home selected work card #1; Home creative wall tile (4:5, "Lead generation"); Home and About marquees; Our Work grid (first); work image `assets/clients/bloom-work.jpg` |
| Sprouts Edu Tours | B2B | Same four services | Supplied client record | Home selected work card #2; creative wall tile (9:16, "Social media"); Careers showcase ("Website · Lead generation · Social"); marquees; Our Work grid |
| MVJ College of Engineering | B2C | Website redesign and development, Lead generation, Performance creative, Social media | `_source: "artwork"`, pending confirmation. `clients.json` notes the artwork "show[s] a website, Meta lead/traffic ads, Google ads and social creative" and "also shows SEO work, which … is not claimed on the site" | Marquees; Our Work grid. Not among Home's ten cards; not filterable on Home (no B2C chip). Local artwork exists: `Case Study/MVJ College.png` |
| LearningMate | B2B | None recorded | `_source: "logo-pack"`, weakest record | Marquees; Our Work grid (no services row) |

Local artwork also exists at `Case Study/Sprouts Edutours.png`. There is no Bloom Edutours file in that folder; its work image lives in `assets/clients/`.

**Typing is inconsistent across the education group.** The two educational-travel operators are typed B2B (they sell to schools). The college is typed B2C (it recruits students). LearningMate, a learning-services company, is B2B. An education page will need its own grouping instead of reusing the B2B/B2C/D2C filter.

**Reusable live copy (verbatim)**
- **Careers, Lead generation discipline:** "For the brands where the sale happens after the click. Forms, qualification, and the CRM handoff that decides whether a lead was worth buying." This is the closest live description of admissions marketing.
- **Insights teaser (not written):** "Building a lead engine when the sale happens offline. Local search, WhatsApp follow-up and landing-page architecture for categories where nobody checks out on the website. What the stack looks like, and the order we assemble it in." This is exactly the admissions use case; the article should exist.
- **Service Detail, "Measurement integrity":** "Server-side Conversion API. Triangulated against GA4 and your platform of record. Weekly modeled vs. measured drift report." It transfers directly to lead-quality measurement.
- **Home process:** "No three-month discovery. The model is built in week one, because everything after it depends on knowing what an order is actually worth." It can be adapted to "what an enrolment is actually worth".
- **Stack items relevant to institutions:** Google Ads, Meta Ads, YouTube, LinkedIn Ads, WhatsApp Business API, MoEngage, GA4.
- **Contact WhatsApp channel:** "Voice note, screenshot, or a single question. We reply within the hour during India work hours."
- **Honesty framing that suits a sector wary of inflated claims:** "Each card carries the brand, the kind of business it is in and exactly the services we run for it. Nothing else is claimed on their behalf."

**Source-only (not live) fragments, for reference**
- `work/WorkBlueprints.jsx` (not rendered): "A website rebuild first, then lead generation and the creative to feed it. Runs across consulting, recruitment, education and consumer services." Usable, since it is consistent with the book.
- `CaseStudies.jsx` (legacy `home-classic`): Bloom Edutours scope "A B2B pipeline build: the website first, then lead generation, with creative and social carrying the story to the people who buy." Usable, since it describes services only.
- `Industries.jsx` (legacy): "Education: K-12 · Higher ed · Educational travel · Skilling". Usable as a segment list only if MMC confirms it serves each segment.
- `home/sections-c.jsx` (legacy `home-v1`): "Education … 92k Qualified leads · last yr". **Do not reuse.** No client-book source; it violates the never-invent rule.
- `FAQ.jsx` (legacy): "About 60% of our work is D2C… The rest is healthcare, real estate, SaaS, education, and hospitality." Unverified, and contradicted by the current book (36% D2C).

### 10b. What is missing

1. **No live education copy at all.** "education", "admission", "student", "college", "enrolment", "school" appear 0 times in live body copy outside client names.
2. **No vertical or industry page,** and no lead-generation, Google Search, SEO or social service page. These are the services the education clients actually buy.
3. **The tools do not fit the category.** COGS, RTO, GST, AOV and COD are meaningless to an institution. Nothing covers:
   - cost per lead, per application or per enrolment;
   - lead-to-counselling-to-application-to-enrolment conversion;
   - counsellor capacity and response time;
   - seat-fill vs intake targets;
   - fee revenue per student and lifetime fee value;
   - admissions-cycle pacing and budget phasing;
   - for edu-tour operators: cost per school partnership or per student booked.
4. **The forms do not fit the category.**
   - They ask for "Brand name", ecommerce revenue bands, and "Where you spend most" with "Amazon + Quick-com" and "TikTok / Reels-led".
   - The placeholder is "Retention is flat past D30 and our Meta ROAS keeps slipping…".
   - Missing fields: institution type (school, college, university, coaching, edtech, edu-travel), programmes, intake/seats, admission season, cities or catchment, current CRM (e.g. LeadSquared, NoPaperForms/Meritto, Salesforce, Zoho), monthly enquiry volume, phone/WhatsApp.
5. **No buyer roles or audiences.**
   - Nothing for trustees or chairpersons, directors or principals, admissions heads, marketing heads or registrars.
   - No distinction between parent and student audiences (they differ between K-12 and higher ed).
   - No school-coordinator audience for edu tours.
6. **No category pains or objections.**
   - Lead quality vs volume, junk and duplicate leads, and counsellor follow-up lag.
   - Aggregator and portal dependence.
   - Seasonality (entrance-result windows, admission deadlines) and open days or campus visits.
   - Reputation and review management.
   - Local search and Google Business Profile for campuses.
   - Parent trust and safety (critical for edu tours).
   - Accreditation and ranking claims.
7. **No compliance content.**
   - Nothing on truthful education advertising (placement, ranking and accreditation claims are regulated and ASCI-scrutinised; needs legal review).
   - Nothing on handling minors' data: Privacy's "under 16" line vs the DPDP definition of a child as under 18.
8. **No education proof.**
   - No education testimonial or named reference.
   - No education creative surfaced beyond two wall tiles.
   - No video.
   - No results, and none can be published unless Bloom Edutours, Sprouts Edu Tours or MVJ supply verifiable numbers.
9. **The approved figures fit education poorly.**
   - "8.7x median blended ROAS" and "₹248Cr+ revenue compounded" are commerce metrics. Leading an institutions page with them would imply they apply to education clients, which is a spirit-of-the-rule risk.
   - "14/14 clients renewed" and "27 months tenure" are category-neutral and safe, but the denominator should be explained (14 of 25).
10. **No CRM or lead-ops capability shown.** The 18-platform stack lists no CRM, call tracking or form-to-counsellor routing, which is the core of admissions marketing.
11. **Only four education clients, one of them without services.** A credible "for institutions" page must be honest about this. It should present MMC as a cross-category growth team with an education practice, not as an education specialist. The education-only positioning belongs to Mediagarh; MMC's counter is measurement and economics rigour applied to enrolment.

### 10c. Implications for an institutions landing page (within the site rules)

- **Proof block:** list Bloom Edutours, Sprouts Edu Tours and MVJ College of Engineering with the exact service mix from `clients.json`. Include LearningMate only after services are recorded. Confirm MVJ's `_source: "artwork"` entry with MMC before publishing it on a vertical page.
- **Figures:** use "14/14 clients renewed" and "27 months tenure", with the median/average wording settled. Omit ROAS and "revenue compounded", or label them explicitly as book-wide commerce figures.
- **Offer:** build around lead quality and cost per enrolment, not ROAS. Adapt the site's strongest asset, the calculator format, into a "cost per enrolment" or "admissions funnel" calculator with no email wall. That keeps the brand's "No email wall" promise and differentiates from agency pitch pages.
- **Content:** publish the existing teaser "Building a lead engine when the sale happens offline." as the anchor article.
- **Form:** give the page its own brief form with institution fields and a WhatsApp number field.
- **Nav:** add Services and Industries items so the page is not orphaned like Service Detail.

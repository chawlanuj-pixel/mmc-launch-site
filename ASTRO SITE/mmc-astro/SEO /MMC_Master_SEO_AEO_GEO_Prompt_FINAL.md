# MMC MASTER PROMPT (FINAL): SEO, AEO and GEO Execution System

Version 3.1 | 2 Oct 2026 (adds Section 16: revenue capture, GEO accelerators, operations) | Owner: Anuj Chawla, Monday Marketing Company
Site: https://www.mondaymarketing.company (Astro static build, React islands, trailing slash, directory URLs)
Inputs that travel with this prompt:
- MMC_Master_Keyword_Universe_v2.xlsx (1,354 keywords; sheets Keywords, Summary, City Intelligence, Exclusions, Weights)
- Website architecture document (73 indexable URLs, templates, schema, internal linking) dated 2 Oct 2026
- mmc-redirects-htaccess.txt / mmc-redirects-netlify-cloudflare.txt (old WordPress site to new site)

No fixed timeline. Work moves phase to phase when exit criteria are met. Every action complies with Section 15 (Compliance Charter).

---

## 0. HOW TO USE

Paste this whole document into the Orchestrator agent (A0). A0 reads Sections 1 to 4 and Section 16, assigns work to the agents in Section 3, enforces the gates in Sections 9 and 10 and the Compliance Charter in Section 15, and reports weekly using Section 14. Every specialist agent reads Sections 1, 2 and 15 before doing anything.

---

## 1. MISSION, POSITIONING AND HOUSE RULES

### Mission
Make Monday Marketing Company the most findable, most cited and most trusted growth partner for D2C brands in India, with credible depth for B2B companies and education brands, a gated foothold in the UAE, and an agency-facing white label offer for the US, Canada and Australia. Success is measured in qualified enquiries and signed retainers (India Rs 75,000 to 1,00,000 a month; international Rs 1.5 to 3 lakh a month), not traffic.

### Positioning (already live; agents preserve it)
- Audience order is always: D2C brands, B2B companies, Education brands. Lead with D2C, never D2C-only.
- The owned idea: measured on contribution margin (CM1 to CM3), not platform ROAS. One senior team and one P&L across media, creative, retention and technology. Every new page reinforces this idea; it is MMC's entity signature for search and AI.
- Five connected systems: Performance media (Meta, Google, Amazon, quick commerce); Creative and UGC; Retention and lifecycle; Conversion and technology (Shopify, CRO); Brand and packaging.
- Founded 2019. Office: 4th Floor, Office No. 105, WeWork Zenia, Hiranandani Business Park, Thane 400607. Cities shown in the footer: Thane, Mumbai, Indore.

### House rules (editorial, from MMC)
- One booking label sitewide: "Book a strategy call".
- No counts of clients, brands or projects. Say "a few of the brands we work with".
- No invented figures. No per-client performance numbers unless the client has given written permission (see Section 6).
- Calculators are "D2C calculators". Title and H1 use the short name plus "calculator".
- Navigation, service-page hero and footer are fixed designs. Agents change copy and data, not these layouts, unless A0 approves.
- Always write "Monday Marketing Company" in full at least once per page (brand collision with monday.com).
- No em dashes in any copy.

### NAP (name, address, phone) standard, used identically everywhere
Monday Marketing Company | 4th Floor, Office No. 105, WeWork Zenia Building, Hiranandani Business Park, Thane 400607, Maharashtra, India | +91 766 630 9102 | sales-in@mondaymarketing.company | https://www.mondaymarketing.company
The old site used +91 96194 72727 and +91 88792 70027. Every external listing must be updated to the standard above.

---

## 2. WHAT WE ARE STARTING FROM (do not rebuild what works)

### Strengths to protect
- Clean architecture: /services/ (16 pages plus 4 performance-marketing platform children), /industries/ (3), /work/ (13), /tools/ (6 calculators), /glossary/ (53 terms), /guides/ (3), /ai-by-mmc/ (6), /audit/, /careers/ (6 JobPostings).
- Answer block, FAQ and JSON-LD on nearly every page. llms.txt present. Self-referencing canonicals. One H1 per page. Sitemap at /sitemap-index.xml.
- A distinct, defensible point of view (contribution margin) with original tools. This is the best GEO asset on the site.

### Known gaps (from the architecture audit)
1. No location pages.
2. Thin editorial: 3 guides; /insights/ duplicates /guides/; no named authors.
3. No founder, team or author pages; no Person schema.
4. Case studies carry no results and little unique text; low inlinks (4 to 17).
5. Several case-study brands are founder-owned ventures (Sprnt, Notic, Skyfling, Flomate, NM Consultings, Panda Cabs). Undisclosed, this is a trust risk.
6. Only 3 industry pages; no verticals.
7. Platform coverage limited to Meta, Google, Amazon, quick commerce.
8. No fees or pricing content.
9. H1s are brand lines; keyword targeting relies on titles and answer blocks. Four titles exceed 60 characters.
10. Preview homepages (home-previous, home-v2, home-v2b) exist in the build.
11. AI crawler policy undefined. No hreflang (correct until /ae/ exists).
12. React islands (Work, About, Contact, Careers, calculators) need a render check.
13. Every page's HTML repeats the mega menu, audit modal and brief form, which lowers the unique-content share per page.

---

## 3. AGENT ROSTER

| Agent | Owns |
|---|---|
| A0 Orchestrator | Sequencing, gates, register, weekly report, escalations to Anuj |
| A1 Technical SEO | Migration, redirects, rendering, CWV, sitemaps, robots, schema validation, index monitoring |
| A2 Keyword Mapping | Workbook to URL map, SERP intent checks, cannibalisation control |
| A3 Internal Linking | Link map, anchors, orphans, TOOLS_FOR and related-blocks data |
| A4 Page Writer | Existing-page optimisation, new service, industry, platform and fee pages |
| A5 Location and International Builder | Location Coverage Ladder pages, /ae/, /white-label/ |
| A6 Proof and E-E-A-T | Case-study rebuilds, permissions, founder and team pages, venture disclosure |
| A7 Schema | JSON-LD per template, kept consistent with visible content |
| A8 AEO/GEO | Answer formats, entity sheet, llms.txt, AI crawler policy, prompt monitoring |
| A9 Authority and PR | Directories, reviews, PR, podcasts, partner ecosystem, research distribution |
| A10 Editorial and Assets | Guides, glossary expansion, calculators, benchmark research |
| A11 Conversion | Forms, booking flow, qualification fields, event tracking |
| A12 Measurement | GSC, GA4, Bing, CRM attribution, dashboards |
| A13 QA | Pre-publish checklist and compliance sign-off |
| A14 Revenue Capture | Calculator email capture, newsletter, nurture sequence, outbound enablement kit, paid-search demand testing (Section 16.1 to 16.3) |
| A15 Brand and Founder Presence | Named method, brand SERP, founder LinkedIn programme, local citations (Section 16.4 to 16.8) |

Human roles (agents cannot replace these; see Section 16.9): Content and SEO Lead (owner), Expert Reviewer (Anuj or a senior strategist), Anuj for permissions and approvals.

Rule: nothing publishes without A2 (intent), A6 (proof), A7 (schema) and A13 (QA) sign-off.

Implementation note for all agents: content lives in JSON under src/data/ and Astro templates. Prefer adding data entries and reusing existing hub templates (Answer block, stages, FAQ, related, TOOLS_FOR) over building new layouts.

---

## 4. PHASES AND EXIT CRITERIA

| Phase | Scope | Exit criteria |
|---|---|---|
| P0 Launch and migration | Sections 5, 16.9 (owner named), 16.10 (consent check) | All old URLs 301 in one hop; www and https forced; preview pages gone; GSC property live; sitemap submitted; tracking firing |
| P1 Optimise existing pages and proof | Sections 6, 7, 16.1, 16.3, 16.4, 16.6, 16.8 | All 73 URLs optimised to spec; founder and team pages live; 3+ case studies upgraded; venture disclosure live; entity sheet complete |
| P2 Gap pages and depth | Sections 8, 16.2, 16.5, 16.7, 16.11 | Fees guide, first industry verticals, platform pages and 10+ guides live and indexed; impressions appearing for P1 clusters |
| P3 Locations and international | Sections 9, 10 | Location Ladder running; /ae/ and /white-label/ live; first qualified non-Mumbai and UAE conversations logged |
| P4 Authority, GEO and compounding (continuous) | Sections 11, 12, 13 | Repeats monthly: improve pages ranking 4 to 20, publish where GSC shows unmet demand, earn links and mentions, prune non-performers |

---

## 5. P0: LAUNCH AND MIGRATION (A1)

1. Redirects. The repo's public/_redirects maps old .html URLs, but the live old site is WordPress (/performance-marketing/, /seo-company-thane/, /career/..., /privacy-policy/ and others). Deploy mmc-redirects-htaccess.txt at the top of .htaccess on Hostinger (Hostinger ignores _redirects), or append the _redirects version on Netlify/Cloudflare. Keep the existing .html rules too.
2. Host: force https and www in one hop (canonicals use https://www.mondaymarketing.company).
3. Preview pages: delete home-previous, home-v2, home-v2b from the build. Redirects to / are only a backup.
4. Staging: the Hostinger preview domain stays blocked (robots disallow plus noindex header) or 301s to production.
5. Tracking: confirm src/layouts/tracking.html fires GA4, GTM and the Meta Pixel (old site IDs: GTM-KC22WQZ7, Pixel 24125282267174885; keep them unless newer IDs are intentional).
6. Rendering check: grep the codebase for client:only. Any page whose main copy sits inside a client:only island gets switched to client:load or client:visible so the HTML is server-rendered. Verify with view-source on /work/, /about/, /contact/, /careers/ and one calculator.
7. Duplicate hubs: 301 /insights/ to /guides/. Update the nav and footer links.
8. Search Console: domain property; submit /sitemap-index.xml; URL Inspection for home and the top 10 pages. Bing Webmaster Tools: import from GSC; enable IndexNow.
9. Monitor for 14 days: 404s, redirect chains, Pages report ("Crawled, currently not indexed" and "Duplicate without user-selected canonical").
10. Old blog posts: if the GSC export shows clicks on any of the 3 old posts, rebuild that post under /guides/ with the same topic and point its redirect there.

---

## 6. P1A: PROOF AND E-E-A-T (A6, A7)

This is the single biggest lever for both rankings and AI citation. Pages without evidence lose to pages with evidence.

### 6.1 Case studies (13 pages under /work/)
Rebuild each to at least 600 words of unique content:
- The brief: category, stage, the problem in the client's words.
- What MMC did: systems used, channels, specific decisions and why (account structure, creative angles, checkout changes, CAPI setup).
- What was built: screens, creative, pages (existing client-approved artwork).
- Outcome: with written permission, publish real metrics or ranges (for example "CAC down 20 to 30 percent over 4 months"). Without permission, publish qualitative outcomes the client confirms in writing, plus a named client quote.
- Services used, linked to the service pages. Industry linked to the industry page.
- Ask 3 clients first for metric permission: The Growing Giraffe, Lepure, MVJ College of Engineering. One permitted number per case study changes how these pages perform.

### 6.2 Venture disclosure
Sprnt, Notic, Skyfling Technologies, Flomate, NM Consultings and Panda Cabs share a founder with MMC. Label them clearly, for example a "Built in-house: our own ventures" section on /work/ and a line on each case study. Disclosed, this signals founder-operator experience. Undisclosed, it reads as padding and is easily discovered.

### 6.3 Logo permissions
Confirm written permission for every logo shown, especially JSW, Saint-Gobain, Gyproc and LearningMate. Remove any logo without it.

### 6.4 People pages (new)
- /about/anuj-chawla/ (founder): role, years and areas of experience, ventures, talks, articles, LinkedIn. Person schema with sameAs.
- /about/team/ plus 3 to 5 specialist pages (performance lead, creative lead, Shopify lead, strategist). Real people only.
- Every guide gets a named author and a "Reviewed by" line linking to these pages. Article schema author becomes a Person.

### 6.5 Trust page
/about/partners/ only for verified partner status (Meta, Google, Shopify, Amazon). Each badge links to the public directory listing that proves it. No unverified badges.

---

## 7. P1B: EXISTING-PAGE OPTIMISATION (A2, A4, A3)

### 7.1 Rules for every existing page
- Title under 60 characters, primary keyword first, "| MMC" last.
- The primary keyword appears in the H1 or the eyebrow directly above it, and in the first sentence of the Answer block. Brand-voice H1s stay; add the keyword without breaking the voice. Example: eyebrow "Meta Ads agency" + H1 "Meta Ads that pay back in profit."
- Answer block: 40 to 60 words, answers the primary query directly, includes "Monday Marketing Company".
- FAQ: 5 to 7 questions taken from People Also Ask and the workbook problem queries for that cluster. Keep the existing cost and guarantee FAQs; they are strong.
- At least 1 case-study link, 1 guide link and 1 calculator link in the body, with descriptive anchors.
- Meta description: 140 to 155 characters, outcome plus qualifier.

### 7.2 Keyword map and fixes for priority URLs
| URL | Primary keyword cluster | Secondary terms (from workbook) | Specific fix |
|---|---|---|---|
| / | Monday Marketing Company; growth partner for D2C brands India | performance marketing agency India, D2C marketing agency | Keep title. Add a 40 to 60 word answer block near the top naming MMC, services, cities served |
| /services/performance-marketing/ | performance marketing agency India | performance marketing for D2C brands, D2C performance marketing agency, performance marketing company | Eyebrow "Performance marketing agency". Add fee-model FAQ linking to the fees guide |
| /services/performance-marketing/meta-ads/ | Meta ads agency India | Facebook ads agency, Instagram ads agency, Facebook ads agency for ecommerce | Title too long (64). Use "Meta Ads Agency in India for D2C and B2B Brands \| MMC" or similar under 60 |
| /services/performance-marketing/google-ads/ | Google ads agency India | Google shopping ads agency, performance max agency, PPC agency | Add Shopping and PMax sections; brand search separation explainer |
| /services/performance-marketing/amazon-ads/ | Amazon ads agency India | Amazon PPC agency, reduce ACoS, Amazon account management | Add an ACoS vs TACoS explainer and link to unit economics calculator |
| /services/performance-marketing/quick-commerce/ | quick commerce ads agency | Blinkit ads, Zepto ads, Instamart ads, how to sell on Blinkit | Title adds Instamart. Becomes a hub for 3 platform child pages (Section 8.3) |
| /services/lead-generation/ | lead generation agency India | B2B lead generation agency, education lead generation | Title too long (64). Split intent: this page = paid lead generation with CRM and CAPI; B2B depth lives on /industries/b2b/ |
| /services/retention-marketing/ | retention marketing agency India | WhatsApp marketing for D2C, Klaviyo agency, email marketing for ecommerce | Add WhatsApp and email child pages (Section 8.3) |
| /services/seo/ | SEO agency for ecommerce India | AEO, GEO agency, AI search visibility | Add an AEO/GEO section with a definition table. Replace "Proof, on the call" with a real proof block once permitted |
| /services/cro/ | CRO agency India | Shopify CRO agency, Shopify conversion rate optimisation, ecommerce CRO | Add a Shopify CRO audit checklist section |
| /services/shopify-development/ | Shopify development agency India | Shopify experts India, Shopify Plus agency, Shopify store redesign | Title too long (63). Add a store list (live URLs) and a migration section |
| /services/web-development/ | website development company India | B2B website design, landing page design | Lead with B2B and education websites; Shopify owns ecommerce |
| /services/ugc-and-video/ | UGC ads agency India | UGC video production, performance creative agency | Add sample creative and the testing process |
| /services/social-media/ | social media creatives agency | ad creative agency, performance creatives | Keep as attach service; low SEO effort |
| /services/influencer-marketing/ | influencer marketing agency for D2C | micro influencer marketing | Low effort |
| /services/branding/ and /services/packaging-design/ | D2C branding agency; packaging design agency India | brand identity, packaging for quick commerce | Link both to each other as a launch bundle |
| /services/ui-ux-design/ | UI UX design agency India | | Low effort |
| /services/mobile-app-development/ | | | Low effort. Do not invest content; consider referring to Skyfling |
| /services/online-reputation-management/ | review management for brands | | Keep strictly to genuine review generation and response. No suppression language |
| /industries/d2c/ | D2C marketing agency India | D2C growth agency, direct to consumer marketing agency | Becomes the D2C hub linking to new verticals (Section 8.2) |
| /industries/b2b/ | B2B lead generation agency India | B2B digital marketing agency, manufacturing marketing | Hub for manufacturing and B2B services verticals |
| /industries/education/ | admission marketing agency | education marketing agency, digital marketing for colleges | Hub for colleges, schools, edu-tours and study abroad verticals |
| /audit/ | free Meta ads audit; paid media audit | Google ads audit, ecommerce marketing audit | Add sections per audit type with anchor links |
| /tools/* | each calculator's own query | break-even ROAS calculator, unit economics calculator, LTV CAC calculator | Add a 300 to 500 word explainer with a worked example and a link to the matching guide |
| /glossary/ | D2C marketing glossary | each term | Plan: give the highest-value terms (ROAS, MER, CAC, LTV, contribution margin, CM1 to CM3, ACoS, TACoS, AOV, CAPI) their own /glossary/{term}/ pages once demand is confirmed |
| /ai-by-mmc/* | AI UGC videos; AI product photoshoot; AI sales agent WhatsApp | | Keep. Verify demand with volumes before expanding |

### 7.3 Internal linking data (A3)
- Extend TOOLS_FOR to industries and guides.
- Add a related-guides map (GUIDES_FOR) so every service page links to 1 to 3 guides.
- Every case study links to its services and industry; every service and industry page links to 2+ case studies.
- Footer: add Locations (once Level 2 pages exist) and /white-label/.
- Anchor mix: exact match at most 20 percent.

---

## 8. P2: GAP PAGES (A4, A10)

Publish in this order. Each page follows the existing hub template and Section 7.1 rules.

### 8.1 Commercial content
1. /guides/agency-fees-india/ "How performance marketing agency fees work in India": fee models (flat retainer, percentage of spend, hybrid), what is included, ad spend vs fee, minimums, how to compare quotes. No MMC price list required; MMC's model can be described in ranges if Anuj approves.
2. /guides/how-to-choose-a-d2c-marketing-agency/
3. /guides/in-house-vs-agency-performance-marketing/

### 8.2 Industry verticals (children of existing industry hubs)
D2C: /industries/d2c/kids-and-baby/, /industries/d2c/fashion/, /industries/d2c/beauty-and-personal-care/, /industries/d2c/food-and-fmcg/ (proof first: kids and baby and fashion have the most clients).
B2B: /industries/b2b/manufacturing/, /industries/b2b/professional-services/.
Education: /industries/education/colleges/, /industries/education/edu-tours/ (Sprouts, Bloom), /industries/education/study-abroad/ (only with a client), /industries/education/schools/.
Each vertical needs category economics in MMC's words, the channel mix, a relevant case study and 5 vertical-specific FAQs. A vertical without a related client waits.

### 8.3 Platform and channel children
Under performance marketing: /quick-commerce/blinkit-ads/, /quick-commerce/zepto-ads/, /quick-commerce/instamart-ads/, /instagram-ads/ (only if distinct from Meta intent in SERPs), /youtube-ads/, /linkedin-ads/ (B2B), /marketplace-ads/ (Flipkart, Myntra, Nykaa).
Under retention: /retention-marketing/whatsapp-marketing/, /retention-marketing/email-marketing/.
Under Shopify: /shopify-development/shopify-migration/, /shopify-development/shopify-plus/ (only if the team can show Plus work).
Rule: A2 checks the SERP first. If Google serves the parent page's intent for a query, do not create a child; add a section to the parent instead.

### 8.4 Guides (problem clusters from the workbook, 10 to 15 first)
Profit and measurement: MER vs ROAS; Meta ROAS high but profit low; how to scale Meta ads without raising CPA; how to reduce CAC for D2C brands.
Conversion: Shopify traffic but no sales; how to improve Shopify conversion rate; high add-to-cart, low purchases; COD and RTO costs.
Quick commerce: how to sell on Blinkit; how to sell on Zepto; Blinkit vs Zepto vs Instamart for brands.
Retention: email vs WhatsApp for ecommerce; how to calculate customer lifetime value.
B2B and education: how to measure cost per qualified lead; admission enquiries vs enrolments.
AI search: SEO vs AEO vs GEO; how to appear in Google AI Overviews.
Each guide: answer in the first 2 to 3 sentences, worked example with stated assumptions, inline calculator where relevant, one primary money-page link, named author.

### 8.5 Linkable research (A10)
"India D2C Paid Media Benchmarks 2026": aggregated, anonymised data from MMC-managed accounts (CPM, CTR, CPA and break-even ranges by category), methodology published, client consent covered by contract or obtained. This is the main earned-link and AI-citation asset. Refresh yearly.

---

## 9. P3A: LOCATION COVERAGE LADDER (A5)

Every location in the workbook is covered; depth is earned. No location skips a level.

| Level | What exists | Entry evidence |
|---|---|---|
| 0 Listed | Named on /locations/ and in Service areaServed | MMC can serve it |
| 1 Section | 200 to 400 unique words in a regional section on /locations/ | Demand in Keyword Planner or Semrush, or GSC impressions |
| 2 City page | /locations/{city}/ | Level 1 gets impressions or leads, plus proof or clear category fit |
| 3 Service x city page | /locations/{city}/{service}/ | City page indexed with impressions; query demand exists; passes the Nano Page Gate |

Starting positions:
- Level 2 now (real presence shown in the footer): Thane, Mumbai, Indore. Confirm Mumbai and Indore are staffed locations before describing them as offices; otherwise describe them as cities served.
- Level 1 candidates: Pune, Bengaluru, Gurugram, Delhi, Navi Mumbai, Surat, Ahmedabad, Hyderabad, Jaipur.
- Level 0: all other India cities in the workbook, and all US, Canada and Australia cities.

City page content: how MMC serves the city (in person or remote, stated plainly), local category context with sources (Surat textiles, Jaipur jewellery, Bengaluru consumer brands), relevant clients with permission, services, local FAQ from that city's SERP. No fake addresses, maps or phone numbers.

### Nano Page Gate (Level 3 and any service x industry x city page)
Publish only with at least 4 of 6, criteria 1 and 2 mandatory: (1) demand evidence; (2) at least 50 percent unique text and 3 combination-specific facts; (3) relevant proof; (4) beatable SERP; (5) budget fit with MMC's retainer floor; (6) MMC can truly deliver it.
Waves: 15, then 30, then up to 40. Each wave unlocks only when 80 percent of the previous wave is indexed and 60 percent shows impressions. Freeze waves if "Crawled, currently not indexed" rises. Zero impressions 60 days after indexing: improve once, then merge with a 301.

### Google Business Profile
One profile for the Thane office, if eligible under GBP guidelines for a staffed location with signage in a coworking space. Exact name "Monday Marketing Company", primary category from the marketing agency set, NAP standard from Section 1. No profiles for cities without a staffed eligible location.

---

## 10. P3B: INTERNATIONAL (A5, A1)

- /ae/ (en-AE) UAE edition: hub, performance marketing, Meta/Snapchat/TikTok paid social, GCC quick commerce (Talabat Mart, Noon Minutes, Careem Quik), and "Taking your Indian D2C brand to the UAE". Pricing language in AED context. State delivery from India with UAE-hours availability, if true. hreflang en (x-default) and en-AE pairs only where a root equivalent exists.
- /white-label/ for agencies in the US, Canada, Australia and UK: Meta ads, Shopify development, performance creatives. US spelling. Process, time-zone overlap, NDA and white-label reporting, sample deliverables.
- No /us/, /ca/ or /au/ folders unless MMC has real clients or presence there.
- Gates: UAE expands only after 2+ qualified UAE conversations once pages are indexed and promoted. White label is deprioritised if no agency enquiries arrive after a full review cycle.

---

## 11. AEO SYSTEM (A8, A4)

- Every commercial page: a 40 to 60 word Answer block that answers the page's primary question and names MMC.
- Every guide: answer first, then depth. Use definition sentences ("Break-even ROAS is..."), comparison tables, numbered steps, and worked examples with stated assumptions.
- FAQs from People Also Ask, sales calls and the workbook. FAQPage schema stays for machine readability; Google shows FAQ rich results only for a small set of sites, so do not count on stars or dropdowns.
- Glossary terms with demand become their own pages with DefinedTerm schema and links to the matching calculator and guide.
- Calculators: each gets a plain-text formula, a worked example and a link to the explaining guide, so answer engines can quote the method.
- Keep dateModified honest. Refresh money pages and top guides every 60 to 90 days with genuinely new information.

---

## 12. GEO SYSTEM (A8, A9)

### 12.1 Entity
- Organization JSON-LD on the home page: name, alternateName "MMC", legalName (confirm with Anuj), url, logo, foundingDate 2019, founder (Person: Anuj Chawla), address, telephone, email, areaServed, knowsAbout (contribution margin, performance marketing, Shopify, quick commerce ads), sameAs (LinkedIn, Instagram, Clutch, GoodFirms, Crunchbase, GBP once live).
- One entity sheet with 25, 50 and 150 word descriptions. Identical across the website, LinkedIn, Instagram bio, Clutch, GoodFirms, DesignRush, Sortlist, Crunchbase, Tracxn, GBP, Justdial (if used), Shopify Partner directory and partner listings.

### 12.2 llms.txt upgrade
Add: the five systems with one-line definitions; the contribution-margin method in 3 sentences; every calculator with its formula; guides list; industries and cities served; the audit offer; NAP; the venture disclosure. Experimental and low cost; no guarantees.

### 12.3 AI crawler policy (default; Anuj may change)
robots.txt keeps User-agent: * Allow: /, plus explicit allow groups for OAI-SearchBot, ChatGPT-User, PerplexityBot, Claude-SearchBot, Claude-User, Googlebot, Bingbot. Training crawlers (GPTBot, Google-Extended, ClaudeBot, CCBot) allowed by default for brand visibility, with the decision commented in the file.

### 12.4 Third-party presence (what assistants read when recommending agencies)
- Clutch and GoodFirms profiles with 10+ genuine client reviews, then a steady flow.
- Outreach for inclusion in "top D2C agencies India", "best Shopify agencies India" and "quick commerce agencies" lists, using proof. Sponsored placements only if clearly labelled.
- Named MMC experts answering genuine questions on Reddit, Quora and LinkedIn about ROAS, contribution margin, quick commerce and Shopify conversion. Helpful, disclosed, never spam.
- YouTube: short explainers of each calculator (also feeds AI answers and Google video results).

### 12.5 Prompt monitoring (weekly; 3 runs per prompt per platform; log platform, date, locale, mention, cited sources, competitors)
Platforms: ChatGPT, Perplexity, Gemini, Google AI Mode, Claude.
1. Best performance marketing agency for D2C brands in India
2. Agency that measures ads on contribution margin, not ROAS
3. How do I calculate break-even ROAS for my D2C brand?
4. Best agency for Blinkit and Zepto ads
5. Meta ads agency for a kidswear brand in India
6. Best Shopify development agency in Mumbai
7. Admission marketing agency for engineering colleges in India
8. B2B lead generation agency for manufacturers in India
9. Agency to help an Indian D2C brand launch in Dubai
10. White label Meta ads agency in India
11. Monday Marketing Company reviews
12. Performance marketing agency in Thane

---

## 13. AUTHORITY AND PR (A9, A10)

Links are earned, never bought.
- P1: claim and complete all directory profiles (Section 12.1); start the review drive with 15 clients.
- P2: founder PR with a data angle (contribution margin vs ROAS; quick commerce ad economics) to Inc42, YourStory, Entrackr, Afaqs, exchange4media, Storyboard18, ET Brand Equity and D2C newsletters; journalist-request platforms (Qwoted, Featured).
- P2 onward: publish and pitch the benchmark report; 6 to 10 podcast appearances; webinars with partners.
- P3 onward: partner ecosystem co-marketing (Shopify apps, GoKwik, Shopflo, Razorpay, MoEngage, WhatsApp BSPs) including case studies on their blogs and directory listings, only where MMC genuinely works with them.
- Ongoing: unlinked brand mentions, broken-link recovery on ecommerce resource pages, original-data guest articles on relevant sites.
- Disallowed: paid links, PBNs, link insertions on irrelevant sites, mass directory blasts, reciprocal schemes.

---

## 14. MEASUREMENT AND REPORTING (A12, A0)

### Qualified lead definition
D2C, B2B or education business; real website; decision-maker or direct access; a need MMC delivers; annual revenue Rs 50 lakh or more (per the contact form rule) and budget compatible with the retainer floor. The existing brief form already captures revenue and budget bands; pass them, plus landing page and source, into the CRM.

### Tracking
GA4 events: book_strategy_call, send_brief, audit_booking, whatsapp_click, phone_click, calculator_use (per tool). AI referral segment: chatgpt.com, perplexity.ai, gemini.google.com, copilot.microsoft.com, claude.ai.

### KPIs (no deadline targets; judged by direction monthly)
Indexed share of published pages (target 90 percent+); non-branded impressions and top-10 keywords by cluster; branded queries at position 1; qualified organic leads by landing page; organic-sourced signed clients and MRR; relevant referring domains and mentions; AI prompt appearances and citations; GSC manual actions and security issues (always zero).

### Weekly report
Shipped URLs; index and technical status; top movers; leads (total, qualified, source pages); authority gains; AI prompt log changes; decisions needed from Anuj; Opportunity and Blocker Register updates.

### Decision rules
- Page ranking 4 to 15 for a commercial query: improve it before writing anything new.
- Query landing on the wrong page: fix with internal links and a dedicated section, or create the correct page.
- City with no demand or impressions after 60 days: no more pages for it.
- Service with no paying client and no proof: no new pages for it.

---

## 15. COMPLIANCE CHARTER

Agents read the current Google Search Essentials, spam policies, helpful-content guidance, GBP guidelines, review snippet guidelines and Google's guidance on AI features and generative AI content before P1.

| Policy | Never | Instead |
|---|---|---|
| Doorway abuse | Near-identical city or service pages | Location Coverage Ladder and Nano Page Gate |
| Scaled content abuse | Mass pages (AI or human) made mainly to rank | Unique proof, data or local substance; waves capped by indexing evidence |
| Keyword stuffing | Unnatural repetition, hidden city lists | Natural language, one topic per page |
| Hidden text and links | Any content users cannot see | All content visible |
| Cloaking and sneaky redirects | Different content for bots; forced geo-redirects | Same content for all; suggest /ae/ with a banner, never force |
| Link spam | Bought links, PBNs, link schemes | Earned links (Section 13) |
| Expired domain abuse | Buying domains to redirect authority | Never |
| Site reputation abuse | Placing content on third-party sites to exploit their ranking | Guest content only with genuine expertise and editorial oversight |
| Scraping | Copying or spinning others' content | Original writing and first-party data |
| Misleading functionality | Tools that do not work as described | Calculators that work and show their formula |
| Reviews | Fake or incentivised reviews; self-serving AggregateRating on the Organization | Genuine reviews on Clutch, GoodFirms and Google |
| GBP | Profiles without a staffed eligible location; keyword-stuffed names | One eligible profile, exact name |
| AI content | Unreviewed AI drafts at scale | AI-assisted drafting allowed; a named MMC expert adds first-hand experience and approves every page |
| Misrepresentation | Fake offices, invented results, undisclosed own ventures presented as clients, unverified badges or logos | Truthful presence, permitted proof, disclosure, verified badges |

Escalation: if unsure, stop and log for A0 and Anuj. Any manual action or security warning in GSC freezes all publishing until resolved.

### Pre-publish QA (A13, every page)
- [ ] Intent matches the SERP; no other URL targets the same primary keyword
- [ ] Title under 60 characters; keyword in H1 or eyebrow and in the Answer block
- [ ] Answer block 40 to 60 words; FAQ 5 to 7 questions
- [ ] Proof present and permitted; every number sourced; venture disclosure where relevant
- [ ] House rules met (audience order, no counts, "Book a strategy call", full brand name, no em dashes)
- [ ] Uniqueness at least 50 percent for location and nano pages; gate score recorded
- [ ] Internal links: up to hub, across to siblings, in from 2+ pages, 1 case study, 1 guide, 1 calculator
- [ ] Schema validated and matching visible content
- [ ] Content present in view-source (server-rendered)
- [ ] CWV acceptable on mobile; images WebP or AVIF with alt text
- [ ] Tracking events fire; form passes qualification fields
- [ ] Named author or reviewer
- [ ] In sitemap; inspected in GSC; IndexNow pinged

---

## 16. ADDITIONS: REVENUE CAPTURE, GEO ACCELERATORS AND OPERATIONS

These items are mandatory and run alongside the phases shown in Section 4. Priority order for A0 when capacity is short: 16.1, 16.3, 16.2, 16.4, 16.9.

### 16.1 Capture calculator and guide traffic (A14, A11) [P1]
The calculators and guides will draw the most organic visitors, but mostly informational ones. Capture them.
- Each calculator gets an optional "Email me this breakdown" field after the result is shown. The email contains the user's inputs, results, what they mean, and one relevant guide. The calculator never requires an email to work.
- Each guide gets one inline signup: "The Margin Memo", a fortnightly email with one idea on profit-led growth (Section 16.4 method), one tool, one example. Signup form on /guides/ and /tools/ hubs too.
- Nurture sequence for new subscribers (5 emails over 3 weeks): 1 the method; 2 break-even ROAS with a worked example; 3 attribution overlap; 4 creative testing or quick commerce, by stated interest; 5 the audit offer with "Book a strategy call".
- Consent: explicit opt-in checkbox, purpose stated, unsubscribe in every email (Section 16.10).
- GA4 events: calculator_email_capture, newsletter_signup. CRM tag "Organic: tool lead". Track subscriber to audit to client conversion monthly.
- Retargeting: organic visitors to calculators and guides feed Meta and Google remarketing audiences through the existing pixel and tags, subject to cookie consent.

### 16.2 Connect SEO assets to outbound sales (A14) [P2]
- Build an outbound enablement kit for the Business Development team: for each calculator, guide and the benchmark report, a 2-line cold-email hook, a LinkedIn message version, and the link with UTM tags (utm_source=outbound, utm_medium=email or linkedin, utm_campaign=asset name).
- Offer a personalised calculator run in outreach ("we ran your category through our break-even ROAS calculator") using only public information or data the prospect shares.
- Report monthly: outbound-sourced visits to assets, replies, meetings booked, and branded search trend in GSC (outbound raises branded search, which strengthens organic and AI trust).

### 16.3 Validate demand with MMC's own Google Ads (A14, A12) [P1]
- Run a small, controlled Google Ads search campaign (budget set by Anuj) on exact and phrase match for P1 service terms and the Level 1 city candidates in Section 9 (for example "performance marketing agency pune", "shopify development company bangalore", "meta ads agency gurgaon").
- Purpose: real impression and search-term data within weeks, and unlocked Keyword Planner averages instead of ranges. Leads from the campaign are a bonus, not the goal.
- Export the search terms report fortnightly into the keyword workbook (new column "Paid search evidence"). Use it as demand evidence for the Location Coverage Ladder and the Nano Page Gate.
- Apply the Exclusions sheet as negative keywords from day one.

### 16.4 Name and own the method (A8, A4) [P1]
- Give MMC's contribution-margin approach a short, ownable name approved by Anuj (working title: "The MMC Margin Method"; alternatives welcome). Check the name is not trademarked or used by another agency.
- Create /method/ (or /about/method/): a 40 to 60 word definition, the steps (cost sheet, contribution margin, break-even ROAS, budget floor, weekly read against the P&L), the calculators that apply each step, and a worked example with stated assumptions.
- Use the name consistently: service pages, guides, llms.txt, Organization knowsAbout, founder bios, PR, podcasts and LinkedIn posts. Assistants cite named frameworks with a single clear source; MMC must be that source.

### 16.5 Statistics pages (A10, A8) [P2]
- /guides/d2c-marketing-statistics-india/ and /guides/quick-commerce-statistics-india/: every statistic with source name, link and date; grouped by topic; a short MMC interpretation under each group; "Last updated" date shown and refreshed quarterly.
- Only cite reputable sources (company filings, government data, established research firms, major trade press). No unsourced numbers. Never present MMC's own data here without the methodology from the benchmark report.
- These pages are built to be linked by writers and cited by AI answers. Pitch them alongside the benchmark report.

### 16.6 Brand SERP control (A15, A9) [P1]
Goal: when someone searches "Monday Marketing Company", page one shows MMC-controlled or MMC-verified results.
- Own and complete: website, LinkedIn company page, Anuj's LinkedIn, Instagram, YouTube channel, Clutch, GoodFirms, Crunchbase, Google Business Profile (if eligible), and press mentions.
- Use the exact full name everywhere. Link all profiles from the website footer and Organization sameAs.
- Track monthly: screenshot of the brand SERP and of searches for "MMC agency Thane" and "Monday Marketing Company reviews". Log any result showing monday.com or unrelated businesses, and strengthen the profiles that should outrank them.
- If a Google Knowledge Panel appears, claim it through Google's verification process.

### 16.7 Founder-led LinkedIn programme (A15, Anuj) [P2, then continuous]
- Anuj posts 3 times a week: one method or numbers post (from the guides and calculators), one build or client story (permitted details only), one point of view on the D2C, B2B or education market.
- A15 drafts from site content and sales calls; Anuj edits in his own voice and approves. No ghost-posted claims he would not stand behind.
- Every fourth post links to a guide, calculator or the benchmark report. Engage with comments within 24 hours.
- Track: follower growth among founders and marketing heads, profile visits, branded search trend, inbound mentions of LinkedIn as the source.

### 16.8 Indian local citations (A15) [P1]
- Create or correct listings on Justdial, Sulekha and IndiaMART (only if relevant to MMC's buyers), plus Bing Places, with the NAP standard from Section 1.
- Audit existing listings found by search for old phone numbers (+91 96194 72727, +91 88792 70027) and update or remove duplicates.
- No listings for cities without a staffed location.

### 16.9 Execution capacity and ownership (A0, Anuj) [P0]
Agents draft, check and organise. They cannot obtain client permissions, interview experts, or supply first-hand experience. Before P1 starts:
- Name one human Content and SEO Lead who owns the plan, the weekly report and the publishing queue.
- Name the Expert Reviewer (Anuj or a senior strategist) with a fixed 3 to 4 hours a week to review drafts and add first-hand detail.
- Realistic throughput at that capacity: 8 to 12 high-quality pages a month (existing-page rewrites count). A0 plans to this capacity; it does not queue more pages than the reviewer can approve.
- Monthly 30-minute review with Anuj: leads, pipeline, what to double down on, what to stop.

### 16.10 Legal and data hygiene (A11, A1) [P0]
- India DPDP Act 2023: forms state the purpose of collection, consent is explicit, and data use matches the privacy policy. The cookie banner must actually block non-essential tracking (GA4, Meta Pixel, remarketing) until consent is given; test it.
- ASCI guidelines: no unsubstantiated performance claims, superlatives or comparative claims without evidence.
- Client contracts: add a clause permitting anonymised, aggregated use of account data for research (needed for the benchmark report and statistics pages), plus a separate opt-in for named case studies and metrics.
- Keep a permissions register (client, what is permitted, date, document link). A6 checks it before publishing any client detail.

### 16.11 Page weight and Core Web Vitals (A1) [P2]
- Test home, one service page, one calculator and one case study on a mid-range Android over throttled 4G (PageSpeed Insights mobile plus field data in GSC once available).
- If LCP exceeds 2.5s or INP exceeds 200ms: lazy-load the audit modal and brief form on first interaction instead of shipping them in every page's HTML, defer GSAP animations below the fold, and keep the mega menu markup lean.
- Removing the repeated modal and form markup from initial HTML also raises each page's share of unique content.

### 16.12 Deliberately not doing (revisit at each Monthly review)
- Hindi or regional-language pages: MMC's buyers search in English. Revisit only if GSC shows meaningful Hindi or Hinglish queries.
- Wikipedia page: MMC does not yet meet notability guidelines and a draft would be removed. Revisit after sustained independent press coverage.
- Programmatic glossary, city or industry pages at scale: spam risk (Section 15).
- Agentic commerce optimisation: not relevant to an agency's buyers yet.

END OF MASTER PROMPT

# WebFX content engine and sitewide SEO system: teardown and India programme for MMC

Prepared 15 Sep 2026. Corpus: 460 live WebFX pages captured today (`corpus/webfx/pages/*.json`). I read all 79 primary pages in full: 20 blog posts plus the blog index, 19 learn pages, 9 statistics pages, 3 glossaries, 3 marketing guides, 10 tool pages (including /seo-checker/) and 14 discipline hubs. Sitewide mechanics were measured by script across all 460 pages. On top of the corpus, three live checks ran in headless Chrome: `https://www.webfx.com/llms.txt`, `robots.txt` and the sitemap index were fetched, and six tools were probed to see what they capture. The probe filled in calculator inputs but submitted no personal data.

Scripts are in `analysis/scripts/`: `wfx_fetch_llms_robots.py`, `wfx_content_batches.py`, `wfx_sitewide_seo.py`, `wfx_content_extras.py`, `wfx_tool_capture_probe.py`, `wfx_india_concepts.py`. Their outputs are in `analysis/webfx-content-seo-raw/` (`sitewide.txt`, `sitewide.json`, `extras.txt`, `tool_probe.json`, `llms.txt`, `robots.txt`, `sitemap_index.xml`, `batches/`).

Page types were assigned from URL slugs: 137 service, 89 industry, 55 case study, 41 pricing, 28 about/brand, 20 blog posts, 19 learn, 14 hubs, 14 technology, 10 location, 10 tools, 9 statistics, 3 glossary, 3 marketing guides, 3 proposal forms, 3 portfolio index, 1 blog index, 1 home.

---

## Executive summary

- WebFX runs a large hub-and-spoke library on one taxonomy (`/{discipline}/`, `/learn/`, `/statistics/`, `/glossary/`, `/pricing/`, `/services/`). Every page doubles as a lead form: the footer website-to-proposal form appears on 460 of 460 pages. The main educational text barely links to commercial pages. Learn pages average 0.7 service links each once the menu and footer are removed. The mega menu does the commercial linking instead: 57 service links on every page.
- The AI-search playbook is modern: answer-first "Key Takeaways", "Summarize in ChatGPT" on 18 of 20 posts, "preferred source on Google" prompts, llms.txt, proprietary AI-search studies, OmniSEO. Quality underneath is uneven. Statistics pages lean on Statista (97 citations across 10 stats pages), contradict each other and carry stale numbers. 125 pages leak an unrendered `[stat ...]` shortcode into author schema. Most hubs, glossaries and stats pages are credited to "WebFX Team".
- Content for India is effectively absent. Across 460 pages there are 0 rupee references, 0 mentions of COD, RTO, UPI, GST, quick commerce or Flipkart, 0 of "contribution margin", 0 of "admission(s)", and 13 mentions of India at all. MMC can win on unit-economics depth, public Indian data compiled with a stated method, education admissions content, and named, accountable expertise.

---

## 1. Content architecture

### 1.1 Layers, URL patterns, scale

| Layer | URL pattern (observed) | Pages in crawl | Median words | Schema pattern | Role |
|---|---|---|---|---|---|
| Discipline resource hub | `/{discipline}/` (seo, ppc, social-media, web-design, content-marketing, digital-advertising, email-marketing, local-seo, lead-generation, amazon, web-development, martech, analytics, digital-marketing) | 14 | 2,142 | Article + Person "WebFX Team" (14/14), no dates (0/14) | Topic map, link router, newsletter pitch |
| Learn guides | `/{discipline}/learn/` (index) and `/{discipline}/learn/{slug}/` | 19 | 1,951 | Article 84%, Person 74%, dates 47% | Mostly agency-selection and ROI content (BOFU) |
| Statistics | `/{discipline}/statistics/`, `/industries/{vertical}/{sub}/statistics/` (two of these now resolve to `/blog/healthcare/statistics-and-factoids/` and `/blog/home-services/statistics-and-facts/`) | 9 (+1 stats blog post) | 1,894 | Article 56%, BlogPosting 22%, dates 100% in schema, visible 22% | Link and citation bait with year-stamped titles |
| Glossary | `/{discipline}/glossary/` (llms.txt also lists `/seo/glossary/`, `/digital-marketing/glossary/`) | 3 | 4,254 | Article + "WebFX Team", no dates, no DefinedTerm | A-Z single page |
| Blog | `/blog/` and `/blog/{category}/{slug}/` (categories seen: ai, healthcare, home-services, industrial, manufacturing, marketing, ppc, seo, social-media, web-design) | 20 + index | 2,002 | BlogPosting 100%, Person 100%, dates 80% | News, research, industry verticals, evergreen explainers |
| Tools | `/tools/`, `/tools/{slug}/`, `/seo-checker/` | 10 | 636 | WebApplication + Offer 80%, FAQPage 20% | Acquisition and lead scoring |
| Marketing guides | `/marketing-guides/{slug}/` | 3 | 157 | WebPage only | Gated PDF (name, email) |

Breadcrumbs mirror the folders on 456/460 pages (for example, Home > PPC > Learn > 4 Ways to Improve Your PPC ROI). URL hygiene is mostly good. Two exceptions: `/blog/seo/2019-search-market-share/` now carries the title "2026 Search Market Share: 5 Hard Truths About Today's Market", and `/digital-marketing/agency/...` is a legacy branch.

### 1.2 How a hub works (same template on all 14)

1. H1 "Learn {X} From The Experts" or "{X} Resources From WebFX", one-sentence promise.
2. A carousel of 6 featured cards, which mixes education with commercial pages. On the SEO hub, "Inside WebFX's AI SEO Pricing: View Plans & Costs" and "AI Brand Positioning Services" sit beside "The Best Local SEO Agencies".
3. Nine category buttons, identical on every hub: Basics, Glossary, Statistics, Technology and tools, SMB, B2B, B2C, Ecommerce, Enterprise.
4. A beginner's guide of alternating blocks: an H2 explainer ("What is SEO?") followed by an H2 "Learn more about..." with an H4 "... resources" list of 5 to 30 article links.
5. A block on working with an agency, with links to services and pricing.
6. Close: newsletter ("Revenue Weekly", "200,000 marketers") plus phone or proposal.

Body link counts per hub range from 22 (web development) to 159 (social media), median about 42.

### 1.3 Internal link flows from content to commercial pages (script-measured)

Method: any href present on at least 60% of all pages is treated as menu/footer template. That gives 139 hrefs: 57 service, 4 pricing, 2 proposal/contact, 10 tools, 16 blog, 16 about, 7 technology, 6 hubs. For each page, the template count per href is subtracted and the remaining body links are classified.

Body links per page, by source type:

| Source type | Body links/page | → Service | → Pricing | → Proposal/contact | → Case study | → Industry | → Tool | → Blog | → Learn/stats/glossary | External | Commercial share (service + pricing + proposal) |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Hub | 50 | 5.1 | 3.0 | 0.0 | 0.1 | 4.3 | 0.4 | 12.9 | 11.5 | 2.1 | 16% |
| Learn | 29 | 0.7 | 1.3 | 0.0 | 1.1 | 4.9 | 0.0 | 10.4 | 5.7 | 4.4 | 7% |
| Statistics | 66 | 1.8 | 0.2 | 0.0 | 2.2 | 6.6 | 0.9 | 9.7 | 3.1 | 37.6 | 3% |
| Glossary | 28 | 3.7 | 0.3 | 0.0 | 0.0 | 3.3 | 0.7 | 10.3 | 7.3 | 1.3 | 14% |
| Blog post | 29 | 1.0 | 0.4 | 0.0 | 2.7 | 1.1 | 0.1 | 11.9 | 0.8 | 2.4 | 5% |
| Tool | 8 | 0.2 | 0.0 | 0.0 | 0.4 | 0.0 | 4.1 | 0.6 | 0.4 | 1.4 | 3% |
| Marketing guide | 2 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 2.3 | 0 | 0% |
| (Service, for contrast) | 16 | 4.9 | 1.4 | 0.0 | 1.3 | 0.4 | 0.1 | 2.7 | 1.9 | 1.2 | 39% |
| (Pricing, for contrast) | 15 | 1.4 | 3.5 | 0.1 | 0.7 | 1.5 | 0.0 | 4.3 | 1.7 | 1.5 | 33% |

With the template included, every content page carries about 57 to 62 service links, 4 to 7 pricing links and 2 proposal links.

How to read this: WebFX's educational layers are link-rich but commercially light. Most internal links go to blog and learn pages and to industry pages (the "{X} for Your Industry" modules). Case-study cards are the main body-level commercial link on blog and stats pages. Conversion depends on three always-present mechanisms rather than on in-text links: the mega menu, the proposal forms and sidebar CTAs.

### 1.4 How content hands off to the proposal form

- **Footer form on every page.** "Discover how we can help your business grow / Enter your website / Send Me a Proposal!" posts to `/free-quote-alt/` (confirmed in the live probe). It is on 460/460 pages. The header "Get a Proposal" button links to `/free-quote/`.
- **Inline website-capture forms beyond the footer, per page:** glossary 1.33, learn 0.95, hub 0.71, blog 0.55, statistics 0.44, tool 0.20. For comparison: service 1.15, location 2.70.
- **Inline proposal, quote or strategy CTAs per page:** statistics 1.9, blog 1.6, glossary 1.0, learn 0.9, hub 0.7, tool 0.6.
- **Blog sidebar modules:**
  - "Try our free Marketing Calculator / Plan Your Marketing Budget" on 14 of 20 posts.
  - "Proven Marketing Strategies / See the Strategy" case-study card.
  - A "[Industry] Case Studies" list.
  - On industry categories, a "Solving key challenges for [industry]" block that maps 4 problems to 1 to 4 service links.
- **Listicles as the bottom of the funnel.** 6 learn pages carry an "Our methodology" scoring table and end with a "Send Me a Proposal" inline form plus three case-study cards.

---

## 2. Content templates and style

### 2.1 Blog post (20 read)

**Section order (top of page):**
1. Category label, then H1.
2. "Published: {date}" (visible on 16/20) and "{N} min. read".
3. A "Summarize in ChatGPT" button (18/20).
4. Author name and job title (named on 13/20; "WebFX Team" or none on 7).
5. "Add WebFX as a preferred source on Google" (20/20).

**Openers:**
- Answer-first posts use a Q&A "Key Takeaways" block (4/20; one of them adds a TL;DR list). An example is the GEO guide's five questions with one-paragraph answers.
- Industry posts use "Powered by 98,500+ hours of healthcare experience"-style badges (7 of the blog posts), a lead paragraph, a jump-link list and an "Explore WebFX {Industry} Marketing Services" button.
- A phone-number paragraph early on ("call us at 888-874-2601").

**Body:** H2 and H3 sections, frequent numbered lists, some HTML tables with a "Table view" fallback for charts. "Expert insights from {First name} {Initial}." pull quotes appear on 2 posts.

**FAQ:** H2 "FAQs" with H4 questions. The answers are collapsed and missing from the rendered text on most pages. FAQPage schema is on 4/20.

**Close:** H2 "{Outcome} with WebFX" plus the phone number, then an author bio paragraph with "View full profile". One post has "Reviewed by: The WebFX team..." and "Last Updated".

**Sidebar and footer:** table of contents, share links, lead-magnet card (marketing calculator, CPC calculator or web design calculator), a "Proven Marketing Strategies" case-study card, "What to read next", "Related Resources", and industry case studies or "Solving key challenges".

**Length:** 1,070 to 5,272 words, median 2,002. VideoObject appears on 40% of posts.

### 2.2 Learn guide (19 read)

**Standard guide:**
- Breadcrumb "HOME PPC LEARN", H1, a 1 to 3 sentence summary, two hero buttons ("View Top Strategies", "View Marketing Services").
- Table of contents, then a results strip ("$10 billion / 24 million / 7.14 million").
- Body sections, then an FAQ.
- Closing pitch plus a sidebar "Earn a 20% greater ROI with WebFX".
- A byline is visible on 1/19 and a visible date on 1/19. Embedded calculators (ROI, conversion rate, CLV, ROAS, CPA) appear on 2 of 19.

**Ranked listicle sub-template (6 pages):**
- Hero summary, then a comparison table (Agency, Best for, Score, Rating).
- Agency cards (location, pricing, employees, score, Clutch reviews, "Why We Picked Them").
- Point-based "Our methodology" table, FAQ, three case-study cards, "Send Me a Proposal" form.
- WebFX is always listed first, even where its own score is lower. Examples: "WebFX Closed-loop attribution 81 / 100" above "VIDEN ... 94 / 100" (`ppc_learn_best_ppc_companies`), and WebFX 88 above Farsiight 95 (`ppc_learn_google_ads_companies`).
- ItemList schema is on 2 of the 6.

The learn layer is not really teaching. Titles include "PPC Experts: What You Should Know Before Hiring PPC Experts", "Why You Shouldn't Use Upwork Freelancers for SEO", "Get a Free PPC Audit" and "7 Benefits of Working with a Google Partner Agency".

### 2.3 Statistics page (9 read, plus WordPress statistics post)

**Title formula:** "{N}+ {Topic} Statistics {You Should Know | Every Marketer Should Know} in {Year}". A year is in 89% of titles and a number in 100%.

**Section order:**
1. H1 and a one-stat intro.
2. A "Top {Topic} Statistics" five-bullet summary (SEO page only).
3. Jump links.
4. Category H2s, each a flat list of one-line stats with inline source hyperlinks. 2 of 10 pages use "(Source)" markers.
5. A closing WebFX pitch, then case study and "Solving key challenges" modules on the industry versions.

**What is missing:** methodology, per-stat dates, per-stat anchors, author visibility and Dataset schema. FAQPage appears on 1 of 9.

**Quality problems (verbatim):**
- `ppc_statistics`: "$160 million was Facebook's ad revenue in the US in 2024. (Source)" and "$9.21 is the highest average CPC for Google Ads, belonging to the legal industry." Meanwhile the Google Ads cost post lists "Legal $71.64".
- `industries_education_higher_education_statistics`: "52. 365,000 students graduated from high school in the year 2020." Item 25 is numbered twice.

### 2.4 Glossary (3 read)

- One long A-Z page (3,221 to 5,629 words) with letter H2s. H4s are used for only some terms, inconsistently.
- Definitions run 1 to 3 sentences, with no formulas and no examples.
- No per-term URLs, DefinedTerm schema, dates or named author.
- Stale entries: "Expanded text ads", "Average position", "Google Optimize", "Modified broad match", and "Google Ads Data Hub was released within the last year to create an opportunity for businesses to manage impression data on Google Ads campaigns." The glossary title says "2026".

### 2.5 Marketing guides (3 read)

- Thin gated landing pages of 148 to 174 words, all with the identical H1 "Download Your Free Guide".
- Form fields: name, email, CAPTCHA and a newsletter checkbox.
- Bullets for "What's inside?", "Why download this guide?" and "Who is WebFX?". The copy claims "25+ years of experience", while the rest of the site says 30.
- No preview content and essentially no body links.

### 2.6 Tool page (10 read)

- H1 tool name, with the calculator first.
- A result, then a CTA card ("Ready to Maximize Your ROAS? / Get Your Free ROAS Strategy").
- "Real results from our clients" with anonymised percentages ("184% Increase in Organic Traffic, Financial Services Provider").
- FAQ accordion, "Other Available Calculators", footer proposal form.
- Very thin: ROAS calculator 198 words, CPC calculator 256 words.
- The marketing budget calculator is the exception at 1,675 words, with visible FAQs and counters ("708 calculator users in 2024", "1,855+ custom strategies created in 2025").

### 2.7 Feature matrix by page type (share of pages; script)

| Feature | Blog | Learn | Stats | Glossary | Hub | Tool | Guide |
|---|---|---|---|---|---|---|---|
| Table of contents | 80% | 95% | 100% | 100% | 43% | 0% | 0% |
| FAQ block (text) | 40% | 58% | 0% | 0% | 36% | 40% | 0% |
| FAQPage schema | 20% | 11% | 11% | 0% | 14% | 20% | 0% |
| Key Takeaways/TL;DR | 20% | 0% | 0% | 0% | 0% | 0% | 0% |
| Visible publish or updated date | 80% | 5% | 22% | 0% | 0% | 0% | 0% |
| Named author (schema) | 65% | 21% | 11% | 0% | 0% | 0% | 0% |
| Read time | 100% | 11% | 22% | 0% | 93% | 0% | 0% |
| "Summarize in ChatGPT" | 90% | 0% | 0% | 0% | 0% | 0% | 0% |
| Preferred-source prompt | 100% | 0% | 22% | 0% | 0% | 0% | 0% |
| Video (VideoObject) | 40% | 47% | 22% | 0% | 50% | 20% | 0% |
| Median words | 2,002 | 1,951 | 1,894 | 4,254 | 2,142 | 636 | 157 |

The "Reviewed by:" line sits almost entirely on pricing pages (40 of 41) and appears on only 1 blog post. "Key Takeaways" is mainly a pricing-page pattern (29 of 41).

### 2.8 Twelve verbatim lines

1. `blog_marketing_roas` (answer-first opener): "Return on ad spend (ROAS) is a marketing metric that measures the amount of revenue earned for every dollar spent on advertising."
2. `blog_marketing_roas` (the benchmark answer): "A good ROAS is usually a 4:1 ratio"
3. `blog_ai_generative_engine_optimization`: "Think of technical SEO as the eligibility layer for GEO."
4. `blog_seo_2019_search_market_share` (URL says 2019, title says 2026): "Nearly 60% of Google searches now end without a click to any website."
5. `blog_social_media_should_you_outsource_your_social_media_marketing` (shows "Published: Jan 1, 2026"): "Pinterest is just 5 years old, but is already the third most popular social network in the US."
6. `seo_learn_best_seo_companies`: "While it seems self-serving to include our SEO agency on this list, the data from our client reviews and results shows that we're indeed one of the best SEO companies in the U.S., especially for small-to-midsized businesses (SMBs)."
7. `seo_learn_how_to_hire_seo_experts`: "Agencies that focused on AI search in 2025 or 2026 are late in the game."
8. `blog_healthcare_dentist_facebook_ads_guide` (elsewhere the site says 30 years and 750+ staff): "With over 20 years of experience and 200+ digital marketing specialists, our team delivers digital marketing for dentists that covers all your dental marketing needs."
9. `blog_marketing_roas` author bio: "When she isn't polishing her Time Magazine Person of the Year Award, she's spending time with her flock of ducks."
10. `marketing_guides_social_media_for_business`: "Because we know how tough marketing can get, we've created this handy guide for you based on our 25+ years of experience in the industry, mailed straight to your inbox."
11. `seo_checker` (sales handoff): "Unhappy with your audit results? Get a score you're happy with."
12. `tools_read_able` (answer-engine writing rule): "Opening sections using the inverted pyramid, which provides an immediate answer to the user's or section's question"

Two more worth noting:
- `blog_home_services_how_to_choose_construction_marketing_agency` has an AI-draft artifact in the body text: "drive leads andhttps://www.webfx.com/digital-marketing/services/?utm_source=chatgpt.com revenue."
- `ppc_learn_free_ppc_audit` sets its qualification gate: "If your business spends more than $1000 per month on PPC ads, you qualify for a free PPC audit from WebFX."

---

## 3. Tools as acquisition

### 3.1 Inventory

The `/tools/` index lists about 30 utilities: KeywordsFX, FAQFox, SERP Racer, Redirect Checker, WikiGrabber, TeamAI, a password generator, "The Internet In Real Time", and more. Carousel clones render each card 2 to 3 times in the HTML. The pages sampled:

| Tool | URL | Words | Inputs | Gate (live probe) | Handoff |
|---|---|---|---|---|---|
| ROAS calculator | /tools/roas-calculator/ | 198 | Revenue, cost; optional break-even (AOV, average order cost) | None. Result appears instantly ("Your ROAS 500.00%"). "Save Results" writes `roas-calculator-results` to localStorage. "AI Interpretation" button. | "Get Your Free ROAS Strategy", footer proposal |
| CPC calculator | /tools/cpc-calculator/ | 256 | Ad spend, clicks, channel (9 options), industry; reverse budget/clicks calculators | None. History in `fx_cpc_calc_history`. "Explain my results" shows "Analyzing your results…". Chart/report download. | "Get expert help with my CPC" |
| Conversion rate calculator | /tools/conversion-rate-calculator/ | 430 | Industry (56 options), conversions, visits; benchmark comparison | None | "Get Your CRO Analysis", "Schedule Free Consultation" |
| Marketing budget calculator (StrategyBuilderFX) | /tools/marketing-calculator/ | 1,675 | Annual revenue, current budget, industry, B2B/B2C, size, growth goal, advanced options | Recommendation ungated (for example "Moderate $16,655"). The PDF is gated: "Enter your email to get your Custom Budget PDF" asks for Full Name and Work Email (Gravity Form with hidden `ajs_anonymous_id`). | "Get My Custom Strategy". Linked from 14/20 blog sidebars as "Plan Your Marketing Budget". |
| Data maturity scorecard | /tools/data-maturity-score-card/ | 843 | Industry, business size, 18 martech checkboxes | None. Score shown ("25"). | "Get Expert Help", RevenueCloudFX, CallTrackerFX, LocalFX upsells |
| SEO checker | /seo-checker/ | 1,146 | Three steps: Website URL, then Your Name, then Your Email Address, plus reCAPTCHA | Report gated by name and email | "Unhappy with your audit results? Get a score you're happy with." Case studies. Promoted on the blog index ("Get Your SEO Score"). |
| Readability test | /tools/read-able/ | 1,140 | URL, text, file upload or embed code | None | Embed snippet (backlinks); "Discover WebFX Content Marketing" |
| Emoji cheat sheet, Lorem Ipsum generator | /tools/... | 255 to 378 | Utility | None | Link magnets; FAQ-rich |
| Calculators embedded in learn pages | e.g. /digital-marketing/learn/how-to-measure-digital-roi/ | n/a | ROI, CR, CLV, ROAS, CPA forms | None | "Get professional help", "View Our Digital Services" |
| Gated guides | /marketing-guides/... | ~160 | Name, email, newsletter opt-in | Gated | Newsletter and nurture |

### 3.2 What the tools capture, and how sales gets the signal (live probe)

- **Anonymous interaction is tracked.** Filling any calculator triggers `form_start` to the Google Ads remarketing tag (AW-1072243529) through a first-party `/5brr/` tag-gateway path. A `t.marketingcloudfx.com/event` POST carries the form structure. On the CPC tool, a Segment track event is named `ppc_tool_use`.
- **Engagement is scored as a lead.** A GA4 conversion named `qualified_lead_madKudu` fired after "Save Results" (ROAS), "Explain my results" (CPC), the PDF popup (budget calculator) and "Get My Score" (data maturity). That event name points to MadKudu lead scoring on tool users. Each page also calls a third-party CloudFront endpoint (`d1ae0zx28z2bae.cloudfront.net/webfx.com`) whose purpose was not determined.
- **Identity is captured only in exchange for a deliverable:** the budget PDF (name, work email), the SEO report (name, email) and gated guides. The footer website field ("Enter your website") is the low-friction bridge from any tool to a proposal.
- **Handoff copy moves from diagnosis to a person.** Examples: "Get expert help with my CPC", "Get Your CRO Analysis", "Get My Custom Strategy". The free PPC audit uses a qualification gate: "$1000 or more each month on PPC" and "five or more individuals".

### 3.3 Implications for MMC

MMC's six calculators already out-think WebFX's. MMC models contribution margin, break-even and runway, while WebFX computes revenue divided by cost. MMC's llms.txt promises "free and requiring no signup". What MMC lacks is the handoff layer:
- a result interpretation in plain words,
- a prefilled "send these numbers to a strategist" action (the existing `AuditModal.jsx` is the natural target),
- an optional "email me this breakdown",
- content around each tool.

Honest, privacy-respecting positioning is a differentiator here, but only if it is true. If MMC calculators compute in the browser and send nothing, say so on the page.

---

## 4. Sitewide SEO mechanics (all 460 pages)

### 4.1 Titles and meta descriptions

| Type | n | Median title length | Title >60 | Brand suffix | Year in title | Median description | Description >160 | Description <120 | H1 = 1 | H1 ≈ title |
|---|---|---|---|---|---|---|---|---|---|---|
| Service | 137 | 56 | 12% | 40% | 1% | 137 | 4% | 15% | 99% | 15% |
| Industry | 89 | 54 | 9% | 18% | 7% | 137 | 0% | 17% | 100% | 31% |
| Case study | 55 | 53 | 11% | 75% | 0% | 121 | 2% | 49% | 100% | 2% |
| Pricing | 41 | 56 | 12% | 10% | 46% | 132 | 2% | 12% | 100% | 39% |
| Blog post | 20 | 52 | 10% | 5% | 40% | 145 | 5% | 5% | 100% | 15% |
| Learn | 19 | 50 | 5% | 32% | 21% | 142 | 0% | 5% | 100% | 21% |
| Hub | 14 | 39 | 7% | 86% | 0% | 130 | 0% | 29% | 100% | 7% |
| Tool | 10 | 52 | 10% | 50% | 0% | 130 | 0% | 40% | 100% | 0% |
| Statistics | 9 | 57 | 0% | 11% | 89% | 129 | 0% | 33% | 100% | 33% |
| Glossary | 3 | 59 | 0% | 33% | 67% | 129 | 0% | 33% | 100% | 0% |

**Title formulas by type:**
- Hubs: "{Topic} Resources | WebFX".
- Statistics: "101 SEO Statistics You Should Know in 2026".
- Glossary: "Social Media Glossary: 59 Social Media Terms to Know in 2026".
- Listicles: "10 Best Adtech Companies in 2026".
- Cost posts: "How Much Do Google Ads Cost in 2026? What Our Data Shows".
- Tools: "ROAS Calculator: Calculate Your Break-Even in Seconds".
- Explainers: "What Is ROAS? Definition + How To Calculate".

Sitewide, 107 of 460 titles carry a brand suffix ("| WebFX" 92, "- WebFX" 15); 289 have no separator. Descriptions follow a question hook, a promise and a soft CTA ("Learn more here!"). Only 3 pages lack a description.

Titles and H1s are deliberately different on most content pages; the H1 matches the title on only 15% of blog posts. Example: title "What Is ROAS? Definition + How To Calculate" against H1 "What Is ROAS? Return on Ad Spend Definition, Formula, and Everything You Need to Know". og:title differs from the title on 452 pages (the Yoast social title "{Title} - WebFX").

Freshness drift, flagged by script:
- `blog_seo_2019_search_market_share`: 2019 in the URL, 2026 in the title.
- `blog_ppc_much_cost_advertise_google_adwords`: 2025 in the description, 2026 in the title.
- `blog_marketing_revenue_marketing`: 2026 in the description, 2027 in the title.
- `blog_social_media_best_social_media_platforms_for_businesses`: H1 "16 Best", H2 "17 best", FAQ heading "in 2025".

### 4.2 H1 patterns

- 452 pages have exactly one H1, 3 have none (proposal forms) and 5 have several (about, about/charities, about/results, careers, a Yelp service page).
- Duplicate H1s on 7 pages. "Download Your Free Guide" is shared by the 3 guides, and "PPC Resource Hub: Grow Your PPC Knowledge" by `/ppc/` and its paginated pages.
- Hub H1s: "Learn {X} From The Experts". Content H1s: long-form keyword-plus-promise phrasing. Tool H1s: the bare tool name.

### 4.3 Canonical, robots meta, robots.txt, sitemaps

- **Canonical** on 459/460 pages, self-referencing on 455. `ppc_page_2` to `ppc_page_4` canonicalise to `/ppc/` (paginated lists folded into page 1). `careers` points to `/fxinternational/`. `free_quote_bv2` has no canonical and is `noindex, follow`.
- **Robots meta** on 458/460: `index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1`. That permits full snippets for AI Overviews and featured snippets.
- **robots.txt:** blocks `ia_archiver`, disallows legacy paths, `/tools/read-able/check.php*` and `/case-studies/`. It uses a non-standard `Noindex: /demo/`. There is no `Sitemap:` line and no rules for GPTBot, ClaudeBot or PerplexityBot, so AI crawlers are allowed by default.
- **Sitemaps:** a Yoast index with post, page, page2, marketing-guide and category sitemaps, lastmod 2026-09-15.

### 4.4 Schema types by page type (share of pages)

Sitewide counts: Organization 460, WebSite+SearchAction 459, BreadcrumbList 456, WebPage 455, VideoObject 192, Person 167, Article 163, AggregateRating 58, Service 55, Product 53, LocalBusiness 46, FAQPage 44, ItemList 31, Offer 27, BlogPosting 25, Dataset 20, HowTo 9, WebApplication 9, DefinedTerm 5.

| Type | n | Article | BlogPosting | Person | FAQPage | HowTo | VideoObject | WebApplication | Service | Product | AggregateRating | Dataset | ItemList | LocalBusiness |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Service | 137 | 4% | 0% | 5% | 18% | 1% | 77% | 1% | 35% | 26% | 29% | 0% | 2% | 25% |
| Industry | 89 | 84% | 2% | 82% | 2% | 0% | 19% | 0% | 1% | 10% | 10% | 0% | 4% | 0% |
| Case study | 55 | 11% | 0% | 0% | 0% | 0% | 9% | 0% | 11% | 0% | 0% | 0% | 11% | 0% |
| Pricing | 41 | 93% | 2% | 71% | 10% | 7% | 22% | 0% | 0% | 0% | 0% | 49% | 24% | 0% |
| Blog post | 20 | 0% | 100% | 100% | 20% | 15% | 40% | 0% | 0% | 0% | 0% | 0% | 0% | 0% |
| Learn | 19 | 84% | 0% | 74% | 11% | 5% | 47% | 0% | 0% | 0% | 0% | 0% | 26% | 0% |
| Hub | 14 | 100% | 0% | 100% | 14% | 0% | 50% | 0% | 0% | 0% | 0% | 0% | 0% | 0% |
| Tool | 10 | 0% | 0% | 0% | 20% | 0% | 20% | 80% | 0% | 0% | 0% | 0% | 0% | 0% |
| Statistics | 9 | 56% | 22% | 67% | 11% | 0% | 22% | 0% | 0% | 0% | 0% | 0% | 0% | 0% |
| Glossary | 3 | 100% | 0% | 100% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 0% |
| Location | 10 | 0% | 0% | 0% | 0% | 0% | 90% | 0% | 0% | 90% | 90% | 0% | 0% | 90% |

Every page carries the same graph skeleton: Organization (with sameAs to Clutch, G2, Capterra and Crunchbase, `foundingDate` 1996, `numberOfEmployees` 501 to 1000), WebSite with SearchAction, WebPage with ReadAction, and BreadcrumbList.

### 4.5 FAQPage, Article, Person, Dataset in detail

- **FAQPage:** 44 pages, mostly services. Rare on the content that most needs it: 1 of 9 statistics pages, 0 glossaries, 4 of 20 posts. Answers are often collapsed in the UI.
- **Article and BlogPosting:** headline, datePublished and dateModified (dates exist on 80% of posts and 100% of stats pages), wordCount, articleSection, thumbnail. 33 of 34 dated blog, learn and stats pages were modified in 2026 (median 28 Jul 2026). Old posts are re-dated as they are refreshed; examples include 2024-04-22 to 2026-05-28 and 2024-09-06 to 2026-08-24.
- **Person:** the "WebFX Team" node is the author on all 14 hubs, all 3 glossaries, 10 of 19 learn pages and 71 industry pages. Its description ships unrendered shortcodes: "The WebFX team includes [stat digital-marketing] digital marketing specialists ... generated [stat revenue-simplified] in revenue". This leak is on 125 pages. Named Person nodes carry `sameAs` LinkedIn and `knowsAbout` values.
- **Dataset:** 20 pages, almost all pricing (49% of pricing pages). None of the statistics pages use it, even though they are the natural fit.

### 4.6 Breadcrumbs, images, word counts

- **Breadcrumbs:** 456/460, matching the folders.
- **Image alt coverage:** about 97 to 98% of images carry alt text on every page type. The typical miss is the same 2 template images per page (for example 40 of 1,294 blog images, 16 of 491 statistics images). Image counts are high but mostly template: median 65 per blog post, 128 per service page.
- **Median words by type:** glossary 4,254; hub 2,142; blog 2,002; learn 1,951; pricing 1,934; statistics 1,894; service 1,836; industry 1,780; case study 819; tool 636; marketing guide 157.

### 4.7 Duplication, boilerplate and QA leaks

- **Boilerplate share.** On service pages, 28% of visible text (median) is in lines repeated on at least 10% of pages: "Rated 4.9/5 stars on Clutch" (121 pages), "CLIENT SATISFACTION SCORE" (120), "WHY IS OUR RETENTION RATE SO HIGH?" (101). Content pages sit at 0 to 3%. Industry blog posts share one "Solving key challenges" block per vertical.
- **Carousel clones duplicate headings in HTML.** On `/ppc/learn/`, each "Programmatic Advertising" or "PPC Services" H3 renders 3 times, and the SEO checker's 10 feature H4s render 2 to 3 times.
- **Duplicate titles:** 6 pages share 2 titles (PPC pagination, free-quote variants).
- **QA leaks found by script:**
  - `[stat ...]` shortcode in JSON-LD on 125 pages.
  - `utm_source=chatgpt.com` in body text on 1 post.
  - "Test Block" visible in a table of contents on 1 learn page.
  - Joke bio on 2 posts.
  - Contradictory company claims:
    - "20 years / 200+ specialists" against "30 years / 750+".
    - "See how WebFX has driven over $6B" against "$10 billion".
    - "$177M ad spend under management" on `/ppc/learn/` against "WebFX has managed over $10 billion in ad spend across 1,500+ clients" in the Google Ads cost post.
    - "25+ years" on the guides.

---

## 5. AI-search readiness

### 5.1 llms.txt (fetched live, 5,424 bytes)

- **Structure:** H1 brand line, blockquote summary ("helps businesses grow revenue through SEO, PPC, AI search optimization..."), then sections Services (4 links), Pricing (4), Glossaries (3), Portfolio (2), Technology (4), "Blog: AI & Search" (5) and Optional (5). 27 links in total.
- **Leads with marketing claims** ("WebFX has driven over $10 billion in client revenue") and gives no guidance on how to use figures.
- **Omits** every statistics page, every tool, the learn guides and all industry content, even though these are their citation assets. `/llms-full.txt` returns 404.
- **Uses llms.txt as a ranking factor on others.** The "best SEO companies" methodology scores agencies on "on-site optimizations (think llms.txt)".

### 5.2 GEO content

- **Education:** `/blog/ai/generative-engine-optimization/` (3,234 words; Q&A Key Takeaways; a 4-part framework; a GEO metrics table; FAQPage, HowTo and DefinedTerm schema). Also `/blog/seo/omniseo-approach/` and `/blog/ai/ai-brand-discovery-research/` ("our analysis of 1,061 domains").
- **Data-led search pieces:** `/blog/seo/2019-search-market-share/` (StatCounter tables with "Table view").
- **Footer links:** "AI Search Benchmarks", "Advertising on ChatGPT", "Brand Discovery in AI Search".
- **Blog index features:** "What 600,000 AI Sessions Reveal About the Content That Wins AI Traffic", "Inside AI Traffic's 796% Growth", "Looking to Appear in Perplexity?".
- **Productised:** OmniSEO visibility tracking is written into posts ("track your online visibility in ChatGPT, Perplexity, Claude, Google, Meta, and Grok"), a free "AI Visibility Audit" and "AI Overview Checker", and the AI SEO pricing page.
- **Distribution hooks:** "Summarize in ChatGPT" (18/20 posts) sends readers into ChatGPT with a WebFX-framed prompt. "Add WebFX as a preferred source on Google" appears on 25 pages. Robots meta allows unlimited snippets.

### 5.3 Answer-first formatting

Where it is used, it works:
- Q&A Key Takeaways in the GEO, Google Ads cost, market share and brand discovery posts.
- "What is ROAS?" definition boxes.
- "At a glance: How to hire SEO experts".
- A direct opening answer on the SEO listicle ("The best SEO companies in 2026 include WebFX, The SEO Works, ...").
- TL;DR bullets on market share.

It is inconsistent. Hubs, glossaries, statistics, most learn pages and older posts open with scene-setting ("In our digital age, it's more important than ever..."). FAQ answers are frequently collapsed. WebFX's own readability tool FAQ spells out the rules it does not apply everywhere: inverted pyramid, lists and tables, "citable information", and "Limiting vague pronouns".

### 5.4 Statistics pages as citation magnets

Volume and freshness signals are strong (101 SEO stats, "2026" titles, 2026 dateModified). Citability is weak:
- Secondhand sourcing. statista.com accounts for 97 of the external citations across 10 stats pages; `social_media_statistics` links Statista 49 times out of 57.
- Everything is US or global. The education page draws on nces.ed.gov (12 citations).
- No methodology, per-stat date or stable anchor.
- Internal contradictions and implausible figures (see 2.3).
- No Dataset schema.

AI engines do quote such lists, but a better-sourced, dated, anchor-addressable page on the same topic is the kind of source they prefer when a prompt carries a local modifier.

### 5.5 E-E-A-T signals

**Positives:**
- Named bylines with job titles and credentialed bios on newer posts (Macy Storm, Sarah Berry, Abby Fields, Lornah Ngugi, Matthew Gibbons, Maria Carpena, Trevin Shirey). Person schema carries `sameAs` LinkedIn.
- "Expert insights from" quotes from practitioners (for example "Colton W., Lead PPC Consultant").
- "Reviewed by" and "Last Updated" on pricing pages.
- Experience-hours badges ("Powered by 237,500+ hours of industrial experience").
- Original research claims (2.37M-query AI Overviews study, a 350-business survey).

**Negatives:**
- Hubs, glossaries, most learn pages and most stats pages are credited to "WebFX Team".
- Expert quotes use first name plus initial only.
- Reviewers are sometimes "WebFX Team".
- Bios contain jokes.
- Author schema leaks shortcodes on 125 pages.
- Self-ranking listicles place WebFX first against its own lower scores.
- Figures about the company itself are inconsistent (4.7).

---

## 6. Strengths MMC must match; weaknesses MMC can exploit in India

### 6.1 Strengths to match (ranked by impact)

1. **One taxonomy across the library.** Hub, learn, statistics, glossary, pricing and tools share consistent URLs and breadcrumbs, so topical clusters are obvious to crawlers and LLMs (1.1).
2. **Every content page captures leads.** Footer proposal form on 460/460 pages, calculators in blog sidebars (14/20), case-study cards, and problem-to-service modules (1.4).
3. **A tool-to-sales machine.** No-signup calculators build usage. Deliverables (PDF, SEO report) capture identity. Engagement is scored as `qualified_lead_madKudu` (3.2).
4. **Freshness routine.** 33 of 34 dated pages modified in 2026, year-stamped stats titles (89%), visible dates on posts (80%).
5. **Answer-first and AI-distribution features:** Q&A Key Takeaways, "Summarize in ChatGPT", preferred-source prompts, unlimited-snippet robots meta, llms.txt.
6. **Proprietary research and a named AI-search product** (OmniSEO), which give LLMs a reason to cite them.
7. **Technical hygiene at scale:** 459/460 canonicals, single H1s, about 97% alt coverage, a consistent schema graph, breadcrumbs everywhere.
8. **Named practitioner bylines with bios** on the newer content.

### 6.2 Weaknesses and gaps MMC can exploit in India (ranked, with evidence)

1. **No India layer.**
   - Mentions across 460 pages: 0 "₹"/INR/rupee, 0 COD or cash on delivery, 0 RTO, 0 UPI, 0 GST, 0 Flipkart/Myntra/Nykaa/Meesho, 0 quick commerce or Blinkit/Zepto/Instamart, 0 Hinglish or regional language.
   - India appears 13 times in total, 7 of them on primary pages, and incidentally ("American Indian/Alaska Native", "India vs England").
   - The 78 primary pages contain 397 dollar amounts.
   - Cost benchmarks are US: "Legal $71.64" CPC and "prioritize Birmingham ($15.53 CPC) over Denver ($59.81 CPC)".
2. **D2C unit economics are absent.** 0 mentions of "contribution margin", 0 of LTV:CAC, 0 of MER. "Break-even ROAS" appears only in the ROAS tool FAQ. The core answer to "what is a good ROAS" is "usually a 4:1 ratio". MMC's calculators and glossary (CM1 to CM3, prepaid ratio, RTO, marketplace commission) are materially deeper.
3. **The education vertical is US K-12 and college, and error-prone.** 0 mentions of "admission(s)", 0 of JEE/NEET/CUET, 0 of cost per admission or enrolment. The only education statistics page cites NCES and contains errors ("365,000 students graduated from high school in the year 2020", a repeated item number). MMC has education-adjacent clients: MVJ College of Engineering, LearningMate, Bloom Edutours, Sprouts Edu Tours (names only, no results).
4. **Statistics pages are not trustworthy enough to cite.** Statista-heavy, US-centric, contradictory ($9.21 against $71.64 legal CPC; "$160 million" Facebook US ad revenue), stale ("By 2024, the number of digital voice assistants will reach 8.4 billion" on a 2025 post), and without methodology or Dataset schema.
5. **E-E-A-T is thin exactly where AI engines look for definitions and numbers.** "WebFX Team" authorship on hubs, glossaries and stats; initial-only experts; joke bios; the schema shortcode leak on 125 pages.
6. **Credibility of the bottom of the funnel.** Self-ranked listicles put WebFX first against lower scores (81 against 94; 88 against 95; 85 against 88). MMC can win Indian buyers with transparent selection checklists that do not rank MMC.
7. **Refreshed but generic content.** A post dated "Published: Jan 1, 2026" still says Pinterest is "5 years old" and tweets are "140 characters". A 2019 URL is retitled 2026. The platform count is 16 against 17. A ChatGPT UTM link sits in body text. "Test Block" appears in a table of contents.
8. **Glossaries** are single A-Z pages with no formulas, no per-term URLs and no DefinedTerm schema, and include dead Google features. MMC already ships DefinedTermSet with formulas for 53 terms.
9. **Tools are thin as pages and US-benchmarked.** ROAS 198 words, CPC 256 words. FAQPage on 2 of 10. Industry benchmark dropdowns have no Indian categories.
10. **llms.txt omits the citation assets** (statistics, tools, glossaries beyond 3, learn pages) and gives LLMs no rules on figures. MMC's llms.txt already has the stronger guardrails section.
11. **Hubs dilute education with sales cards.** Only 16% of hub body links are commercial, while featured carousels push pricing and service pages. That makes the hubs worse reference pages without helping conversion much.
12. **Gated guides are 157-word pages** with duplicate H1s and nothing to rank or cite. MMC can publish the same depth ungated.

---

## 7. Recommended content and SEO programme for MMC

### 7a. Hub-and-spoke architecture for a static HTML site

Principles:
- Organise around page type, so templates, schema, sitemaps and llms.txt sections come from the page type.
- Express hub membership through breadcrumbs, hub pages and related-link blocks rather than deep folders, so one guide can serve both D2C and education without changing URL.
- Use clean directory URLs (`/slug/index.html`).
- Stop publishing URLs with spaces and capitals ("Our%20Work.html", "Service%20Detail.html"). If they are not yet indexed, move them before launch. If they are, add host-level 301s (Netlify `_redirects`, Cloudflare rules or equivalent) and update internal links.

**URL scheme:**

| Section | URL | Page type | Launch or later |
|---|---|---|---|
| D2C growth hub | `/d2c/` | Hub (curated: guides, benchmarks, tools, glossary terms, services, work) | Launch |
| Education marketing hub | `/education/` | Hub (admissions funnel, calendar, benchmarks, cost per admission tool, services) | Launch |
| B2B and offline-sale lead gen hub | `/b2b/` | Hub | Later (month 3) |
| Tools index and tools | `/tools/`, `/tools/{tool}/` (move the six root `.html` calculators here) | Tool | Launch (6 existing + cost per admission) |
| Glossary index and terms | `/glossary/` (keep the full A-Z list), `/glossary/{term}/` | Glossary term | Launch: index + 25 term pages; later up to about 120 |
| Benchmarks (statistics) | `/benchmarks/`, `/benchmarks/{slug}/` | Statistics/Dataset | Launch: 2; later a quarterly refresh plus 4 more |
| Guides | `/guides/`, `/guides/{slug}/` | Evergreen guide or cost guide | Launch: 5; later 12 more |
| Insights | `/insights/`, `/insights/{slug}/` | Dated POV, breakdown, founder note | Launch: 0 to 2 real articles (see the warning below); later 1 or 2 a month |
| Team and author pages | `/about/team/{person}/` | ProfilePage | Launch (needed for bylines) |
| Services, work, about, contact | Owned by the other workstreams; link targets | n/a | n/a |

**Build mechanics (fits the current pre-render pipeline):**
- One content index, for example `content/library.json` with fields slug, type, hub(s), title, description, author, reviewer, published, reviewed, sources, related, glossary terms, tool.
- Generate from it: hub pages, related-link blocks, breadcrumbs, the per-type XML sitemaps (`sitemap-tools.xml`, `sitemap-guides.xml` and so on, with real lastmod), llms.txt sections and JSON-LD. `apply-seo.py` and `apply-schema.py` can read it the same way they read `seo.json` and `schema.json` today.

**Internal-link rules (targets set against WebFX's measured weaknesses):**

| Page type | Required links |
|---|---|
| Guide | ≥3 contextual links to service pages, 1 tool, 2 glossary terms (first mention), 1 benchmark, 1 hub; one end CTA to the audit modal. WebFX learn pages average 0.7 service links. |
| Tool | 2 guides, 1 service, every glossary term used in inputs and outputs, 1 benchmark for defaults. |
| Benchmark | Each stat group links to the tool that uses it. No more than 1 service link per section. |
| Glossary term | Formula, the tool that computes it, 1 guide, 1 service. |
| Hub | Curated reference first. One "Work with MMC" block. Commercial links below about 25% of body links. |

**Warning on current Insights teasers.** The 8 teasers in `insights/InFeed.jsx` contain figures outside MMC's four published numbers: "₹4.2Cr", "moved 12 brands onto", "Cycle time dropped 32%", and "2,400 readers across India, US, UK, and UAE". They also carry publish dates for articles that do not exist. Remove the figures and dates, or verify and approve them, before any teaser is shown or turned into an article.

### 7b. The first 25 pieces

Funnel stages: TOFU = awareness, MOFU = consideration, BOFU = decision.
- Validate query phrasing and volume in Google Keyword Planner (India) and Search Console before briefing. The queries below are intents, not measured volumes.
- Every number must come from a named public source with an as-of date. Illustrative rupee examples must be labelled "Illustrative example, not client data".
- No client results. MMC figures are limited to the four published ones, quoted exactly.
- Candidate public sources below should be checked for availability and current figures at the time of writing.

**Wave 1 (launch, weeks 0 to 4)**

| # | Piece and URL | Type | Target query (intent) | Funnel | Why it can beat WebFX in India |
|---|---|---|---|---|---|
| 1 | Cost per admission calculator, `/tools/cost-per-admission-calculator/`. Inputs in ₹: spend, leads, lead-to-application %, application-to-admission %, counselling cost per lead, fee per student. Outputs: cost per lead, per application, per admission; leads and budget needed per seat target. | Tool | "cost per admission calculator", "cost per enrolment" | MOFU/BOFU | WebFX has 0 "admission" mentions across 460 pages and no education calculator. |
| 2 | Break-even ROAS for Indian D2C: COD, RTO, GST and gateway fees included, `/guides/break-even-roas-india/` | Guide (tool-led) | "break even roas formula", "break even roas india" | MOFU | WebFX's answer is "usually a 4:1 ratio" with no margin math. MMC's calculator already models it. |
| 3 | Contribution margin for D2C: CM1, CM2, CM3 with worked ₹ example, `/guides/contribution-margin-d2c/` | Guide | "contribution margin d2c", "cm1 cm2 cm3" | TOFU/MOFU | 0 WebFX mentions of contribution margin. Pairs with the Unit Economics Calculator. |
| 4 | India D2C and ecommerce benchmarks 2026, `/benchmarks/india-d2c-ecommerce/`. Candidate sources: NPCI UPI monthly statistics, RBI payment indicators, TRAI subscription data, listed-company annual reports (for example FSN E-Commerce, Honasa Consumer), Unicommerce trend reports, Bain "How India Shops Online". | Benchmarks | "d2c statistics india", "india ecommerce statistics 2026" | TOFU (citation) | WebFX stats: 97 Statista citations, US-only, no method, no Dataset. MMC: primary Indian sources, per-stat dates, anchors, Dataset schema. |
| 5 | Meta ads cost in India: CPM and CPC by objective, how to read ranges, what moves them, `/guides/meta-ads-cost-india/`. Sources: Meta Ads Manager reach and cost estimates (dated), public platform documentation. | Cost guide | "facebook ads cost in india", "meta ads cpm india" | MOFU | WebFX quotes USD averages; 0 ₹ on 460 pages. |
| 6 | Higher education and admissions statistics, India, `/benchmarks/india-higher-education-admissions/`. Candidate sources: AISHE (Ministry of Education), NTA registration releases (JEE Main, NEET-UG, CUET-UG), JoSAA seat matrix, AICTE approved-intake dashboard, NIRF data. | Benchmarks | "higher education statistics india", "neet jee cuet registrations" | TOFU (citation) | WebFX's only education stats page is US NCES data with visible errors. |
| 7 | Admissions marketing funnel for Indian colleges: enquiry, application, counselling, admission; WhatsApp follow-up; lead-quality checks, `/guides/college-admissions-marketing-funnel/` | Pillar guide | "college admission marketing strategy", "student recruitment strategy india" | MOFU | No admissions calendar, counselling or WhatsApp workflow anywhere on WebFX. |
| 8 | Glossary term pages, batch 1 (25): RTO, COD, prepaid ratio, CM1, CM2, CM3, MER, blended ROAS, break-even ROAS, CAC payback, quick commerce, marketplace commission, GMV, cost per admission, lead-to-application rate, and more. `/glossary/{term}/` | Glossary | "what is rto in ecommerce", "prepaid ratio meaning", "mer marketing" | TOFU | WebFX glossaries: single page, no formulas, stale Google features, zero Indian commerce terms. MMC's glossary data already has formulas. |

**Wave 2 (weeks 5 to 10)**

| # | Piece and URL | Type | Target query (intent) | Funnel | Why it can beat WebFX in India |
|---|---|---|---|---|---|
| 9 | Google Ads cost in India: CPC ranges by intent and category, budgeting, `/guides/google-ads-cost-india/` (sources: Keyword Planner India forecasts, dated) | Cost guide | "google ads cost in india", "google ads cpc india" | MOFU | WebFX uses US industry CPCs and US city comparisons. |
| 10 | Performance marketing agency pricing models in India: retainer, % of spend, hybrid, performance fees; what should be in scope; how to compare proposals, `/guides/performance-marketing-agency-pricing-india/` | BOFU guide | "performance marketing agency charges india", "digital marketing agency fees india" | BOFU | WebFX lists USD "starting at" prices. MMC does not publish pricing, so it wins on clarity about models, scope and red flags, and states plainly that it does not publish prices. |
| 11 | RTO and COD: how returns to origin change your real CAC, `/guides/rto-cod-real-cac/` | Guide | "how to reduce rto", "cod vs prepaid orders" | MOFU | 0 WebFX mentions of RTO or COD. |
| 12 | Blended ROAS vs MER vs platform ROAS: how to judge an agency's numbers, `/guides/blended-roas-vs-mer-vs-platform-roas/`. Defines how MMC's published "8.7x median blended ROAS" is measured; no other MMC figures. | BOFU guide | "blended roas vs roas", "marketing efficiency ratio" | BOFU | WebFX has no MER or blended ROAS content. This is MMC's positioning ("measured on contribution margin"). |
| 13 | Quick commerce in India: public-data benchmarks, `/benchmarks/quick-commerce-india/`. Candidate sources: Eternal (Zomato) and Swiggy shareholder letters and annual reports. | Benchmarks | "quick commerce statistics india" | TOFU (citation) | 0 WebFX mentions of quick commerce, Blinkit, Zepto or Instamart. |
| 14 | Quick commerce ads on Blinkit, Zepto and Instamart: formats, how costs are charged, how to measure incrementality, `/guides/quick-commerce-ads-india/` | Guide | "blinkit ads", "instamart ads cost" | MOFU | The same gap; MMC lists quick commerce as a service. |
| 15 | Admission-season ad calendar: board results, NTA exams, counselling rounds, when to spend, `/guides/admission-season-ad-calendar/` (sources: NTA, CBSE, JoSAA published schedules) | Guide | "when to start admission campaigns", "admission ads timing" | MOFU | India-specific calendar logic WebFX cannot reproduce. |
| 16 | How to choose an education marketing agency in India: checklist, red flags, questions, no rankings, `/guides/choose-education-marketing-agency-india/` | BOFU checklist | "education marketing agency india" | BOFU | Contrast with WebFX's self-ranked listicles. Transparency is the trust signal. |
| 17 | Seat-fill planner (extends #1): leads, applications and budget needed by intake date, `/tools/seat-fill-planner/` | Tool | "how much to spend on admission ads" | BOFU | No equivalent anywhere in WebFX's tool suite. |

**Wave 3 (weeks 11 to 18)**

| # | Piece and URL | Type | Target query (intent) | Funnel | Why it can beat WebFX in India |
|---|---|---|---|---|---|
| 18 | India digital advertising statistics, `/benchmarks/india-digital-advertising/`. Candidate sources: FICCI-EY Media & Entertainment report, TRAI, DataReportal India. | Benchmarks | "digital advertising statistics india" | TOFU (citation) | WebFX social and PPC stats are US or global and Statista-led. |
| 19 | Marketplace and payment fees in India: fee-schedule tables, `/benchmarks/marketplace-payment-fees-india/`. Sources: Amazon.in and Flipkart seller fee pages, payment gateway pricing pages, CBIC GST rates. | Benchmarks (fee tables) | "amazon seller fees india", "payment gateway charges india" | MOFU | Feeds the Unit Economics Calculator defaults. WebFX: 0 Flipkart, UPI or GST mentions. |
| 20 | LTV:CAC and CAC payback for Indian D2C categories: computing payback from repeat cycles, `/guides/ltv-cac-payback-d2c/` | Guide (tool-led) | "ltv cac ratio", "cac payback period" | MOFU | 0 WebFX mentions of LTV:CAC. MMC has the calculator. |
| 21 | Shopify store cost in India: plan, theme, apps, gateway fees, build options, `/guides/shopify-store-cost-india/` | Cost guide | "shopify website cost india" | MOFU/BOFU | WebFX website costs are in USD and WordPress-centric. |
| 22 | AI search visibility for Indian D2C brands: how ChatGPT, Perplexity and AI Overviews pick brands for Indian prompts (marketplace listings, Hinglish queries, reviews), `/guides/ai-search-visibility-india-d2c/` | Guide | "how to rank in chatgpt india", "ai search optimisation india" | MOFU | WebFX GEO guides use US examples; 0 Hinglish or regional-language coverage. |
| 23 | Lead engines when the sale happens offline: local search, WhatsApp follow-up, landing-page architecture (rewrite of the existing teaser), `/guides/offline-sale-lead-engine/` | Guide | "lead generation for real estate india", "whatsapp lead follow up" | MOFU | WebFX's lead-gen hub is US SMB; WhatsApp appears on 4 of 460 pages. |
| 24 | Retention is the new acquisition: founder POV and method, without the unpublished ₹4.2Cr figure, `/insights/retention-is-the-new-acquisition/` | Insight (named founder) | "d2c retention strategy india" | MOFU | Named, accountable voice against "WebFX Team". Pairs with the LTV:CAC calculator. |
| 25 | Attribution after iOS for Indian D2C: triangulating Meta, GA4, Shopify and marketplace data, without "12 brands" unless verified, `/insights/attribution-triangulation-d2c/` | Insight | "meta vs ga4 vs shopify attribution" | MOFU | WebFX attribution content is product-led (RevenueCloudFX); MMC can be vendor-neutral. |

**Production cadence and ownership.** Given a team of four:
- About 2 pieces a week in wave 1, then about 1.5 a week.
- Every piece has a named author and a named reviewer. The founder reviews numbers and claims.
- Benchmarks get a quarterly re-verification task with a visible changelog.

### 7c. Templates

#### Article template (guides and insights)

- **Head.** Title follows "{Primary intent}: {specific promise} ({India or ₹ modifier where natural})", at most 60 characters. Meta description of 140 to 155 characters that answers the question and names India. Canonical is self. Robots `index, follow, max-snippet:-1, max-image-preview:large`. `hreflang` is not needed for one language. `lang="en-IN"`.
- **Above the fold.**
  - Breadcrumb (Home > Education > Guides > {Title}).
  - H1 (may differ from the title).
  - A one-sentence dek.
  - Byline: author name linked to `/about/team/{person}/`, role, and "Reviewed by {name, role}".
  - "Published {date} · Last reviewed {date}", matching the schema exactly, and read time.
- **Answer box.** A 40 to 60 word direct answer to the H1 question, then 3 to 5 "Key points" bullets. Each bullet is a standalone, sourced sentence.
- **Table of contents** for anything over 1,200 words.
- **Body.**
  - H2s phrased as the questions buyers ask, each opening with a 1 to 2 sentence answer.
  - Formula blocks in plain HTML.
  - At least one HTML `<table>` with `<caption>` and a source line.
  - A worked ₹ example labelled "Illustrative example, not client data".
  - A "What this means for a {D2C brand | college}" box.
  - An embedded link to the relevant calculator with prefilled example inputs in the query string.
- **Evidence rules** (enforced at build):
  - Every number carries a source link and an as-of date.
  - MMC figures only from the four approved strings.
  - No client-specific results.
  - No em dashes.
  - No unrendered placeholders.
- **CTAs.** Mid-article: the calculator. End: "Send us your numbers" (opens the audit modal with context), plus 1 to 2 contextual service links. Then 3 related guides and the glossary terms used.
- **FAQ.** 3 to 6 real questions with answers visible in the HTML. FAQPage schema only when the answers are visible.
- **Author box.** Factual bio, verifiable credentials, LinkedIn. No jokes.
- **Changelog.** "What changed on {date}" list for updates.
- **JSON-LD skeleton:**

```json
{"@context":"https://schema.org","@graph":[
 {"@type":"Article","@id":"https://www.mondaymarketing.company/guides/{slug}/#article",
  "headline":"{H1}","description":"{meta description}","inLanguage":"en-IN",
  "datePublished":"{YYYY-MM-DD}","dateModified":"{YYYY-MM-DD}",
  "author":{"@id":"https://www.mondaymarketing.company/about/team/{author}/#person"},
  "publisher":{"@id":"https://www.mondaymarketing.company/#organization"},
  "mainEntityOfPage":{"@id":"https://www.mondaymarketing.company/guides/{slug}/"},
  "about":[{"@id":"https://www.mondaymarketing.company/glossary/{term}/#term"}],
  "citation":["{source URL 1}","{source URL 2}"],"image":"{og image URL}"},
 {"@type":"WebPage","@id":"https://www.mondaymarketing.company/guides/{slug}/","name":"{title}",
  "reviewedBy":{"@id":"https://www.mondaymarketing.company/about/team/{reviewer}/#person"},
  "lastReviewed":"{YYYY-MM-DD}","isPartOf":{"@id":"https://www.mondaymarketing.company/#website"},
  "breadcrumb":{"@id":"https://www.mondaymarketing.company/guides/{slug}/#breadcrumb"}},
 {"@type":"BreadcrumbList","@id":"https://www.mondaymarketing.company/guides/{slug}/#breadcrumb","itemListElement":[
  {"@type":"ListItem","position":1,"name":"Home","item":"https://www.mondaymarketing.company/"},
  {"@type":"ListItem","position":2,"name":"Education","item":"https://www.mondaymarketing.company/education/"},
  {"@type":"ListItem","position":3,"name":"{H1}"}]},
 {"@type":"Person","@id":"https://www.mondaymarketing.company/about/team/{author}/#person","name":"{Name}",
  "jobTitle":"{Role}","worksFor":{"@id":"https://www.mondaymarketing.company/#organization"},
  "sameAs":["{LinkedIn URL}"],"knowsAbout":["Performance marketing","D2C unit economics"]}
]}
```

Use `BlogPosting` instead of `Article` for `/insights/`. Add a separate FAQPage node only when the answers are visible.

#### Statistics or benchmark page template

- **Title:** "{Topic} Benchmarks India {Year}: {N} Figures From Public Sources". H1 can match.
- **Above the fold:** H1, a dek, "Compiled by {name} · Reviewed by {name} · Last verified {date}", links to "Methodology" and "Download CSV".
- **Top figures box:** 5 headline stats, each with source and date.
- **Stat cards or table rows**, one per figure, each with:
  - a stable anchor (`id="stat-{slug}"`),
  - the figure, what exactly it measures, geography (India, or state if relevant), period,
  - source name and link, source publication date, and notes (definitions and caveats),
  - a "Copy citation" button that outputs "Source: {Source}, via Monday Marketing Company benchmarks, {URL}#stat-{slug}, accessed {date}".
- **Grouped H2 sections** with `<table><caption>` markup.
- **Conflicts shown side by side.** When two sources disagree, show both with definitions rather than picking one silently.
- **Methodology section:**
  - Inclusion rules: official or primary sources first; paywalled secondhand aggregators not used as sole sources; figures older than two years labelled "historical".
  - Update cadence: quarterly.
  - Corrections contact.
- **"How to use these numbers":** links to the calculator that uses each group.
- **Changelog.**
- **JSON-LD:** Article (as above) plus a Dataset node:

```json
{"@type":"Dataset","@id":"https://www.mondaymarketing.company/benchmarks/{slug}/#dataset",
 "name":"{Topic} benchmarks, India {Year}","description":"{what is compiled and how}",
 "creator":{"@id":"https://www.mondaymarketing.company/#organization"},
 "license":"https://creativecommons.org/licenses/by/4.0/","isAccessibleForFree":true,
 "spatialCoverage":{"@type":"Place","name":"India"},"temporalCoverage":"{YYYY}/{YYYY}",
 "variableMeasured":["{variable 1}","{variable 2}"],"dateModified":"{YYYY-MM-DD}",
 "measurementTechnique":"Compilation of published figures from named public sources; see methodology",
 "citation":["{source URL 1}","{source URL 2}"],
 "distribution":[{"@type":"DataDownload","encodingFormat":"text/csv",
   "contentUrl":"https://www.mondaymarketing.company/benchmarks/{slug}/data.csv"}]}
```

Confirm licensing of each source before republishing its figures in CSV form. Where a source forbids redistribution, cite and link only.

#### Tool page template

- **Title:** "{Tool name} Calculator (₹): {what it tells you}". H1 is the tool name, followed by a one-sentence "what this answers".
- **Calculator first.** Inputs in ₹. Defaults labelled "illustrative". State kept in the URL query string, so results can be shared and cited.
- **Results:**
  - deterministic plain-language interpretation (rule-based text, not a black box),
  - a "What would change this" sensitivity line,
  - links to the glossary term for each output.
- **"How this is calculated":** formulas and assumptions in crawlable, pre-rendered HTML, plus a worked example and limitations.
- **Benchmarks:** ranges pulled from the relevant `/benchmarks/` page, with sources.
- **Visible FAQ** (4 to 8 questions). Related tools. Two related guides.
- **Handoff:**
  - "Send these numbers to a strategist" prefills the audit modal with the inputs; the tool stays usable without signup.
  - Optional "Email me this breakdown".
  - If true, a privacy line: "Calculations run in your browser. Nothing is sent unless you choose to send it."
- **E-E-A-T:** "Built by {name}", "Formula reviewed by {name}", "Last updated {date}".
- **JSON-LD:**

```json
{"@type":"WebApplication","@id":"https://www.mondaymarketing.company/tools/{slug}/#app",
 "name":"{Tool name}","url":"https://www.mondaymarketing.company/tools/{slug}/",
 "applicationCategory":"BusinessApplication","operatingSystem":"Any","browserRequirements":"Requires JavaScript",
 "inLanguage":"en-IN","isAccessibleForFree":true,
 "offers":{"@type":"Offer","price":"0","priceCurrency":"INR"},
 "featureList":["{feature 1}","{feature 2}"],
 "creator":{"@id":"https://www.mondaymarketing.company/about/team/{builder}/#person"},
 "publisher":{"@id":"https://www.mondaymarketing.company/#organization"},
 "about":[{"@id":"https://www.mondaymarketing.company/glossary/{term}/#term"}],"dateModified":"{YYYY-MM-DD}"}
```

Add BreadcrumbList and a FAQPage node for the visible FAQ. Glossary term pages carry a `DefinedTerm` (`@id` `/glossary/{term}/#term`, `inDefinedTermSet` pointing to `/glossary/#set`); the glossary index keeps the `DefinedTermSet`.

### 7d. llms.txt and structured data

**llms.txt.** The current MMC file is already stronger than WebFX's on guardrails ("These are the only performance numbers stated on the site", "does not publish pricing", "There is no written case study"). Keep that. Recommended changes:

1. Switch all links to the clean canonical URLs once 7a ships. Today they point to `unit-economics-calculator.html` and `Our%20Work.html`.
2. Add sections in this order:
   - Tools, one line each on what the tool computes and its formula name.
   - Benchmarks, each with "last verified" date and methodology link.
   - Guides, grouped by hub.
   - Glossary: index plus the highest-value term pages.
   - Education.
3. Add a "How to cite" block: preferred citation format, stat anchors (`#stat-{slug}`), and the rule that benchmark figures belong to their original sources, with MMC as compiler.
4. Add "Last updated: {date}" at the top, generated at build.
5. Publish `/llms-full.txt`, generated from the content index: full glossary definitions and formulas, calculator formulas and assumptions, benchmark tables as plain text, and guide answer boxes. WebFX returns 404 here.
6. Keep the "How to answer questions about this company" section in sync with page content. If Insights articles cite anything beyond the four figures, the build should fail.

**robots.txt and sitemaps.**
- Keep the `Sitemap:` line; WebFX lacks one.
- Decide AI crawler policy explicitly and write it down (for example allow `OAI-SearchBot`, `ChatGPT-User`, `PerplexityBot`, `ClaudeBot`, `Google-Extended` by name). `LLM-Content:` is non-standard but harmless.
- Split sitemaps by type with accurate `lastmod` values taken from the content index.

**Sitewide structured data.**
- One Organization node (`@id` `/#organization`) with `sameAs` only for profiles that exist.
- WebSite node.
- A Person node per author and reviewer (`/about/team/{person}/#person`), referenced by `@id` everywhere.
- BreadcrumbList on every page.
- Per page type:
  - Article or BlogPosting on guides and insights.
  - Dataset on benchmarks.
  - WebApplication on tools.
  - DefinedTermSet and DefinedTerm on the glossary.
  - ItemList on hubs.
  - FAQPage only where answers are visible.
- Keep the existing `apply-schema.py` ban on aggregateRating, review, price and award.

**Build-time QA checks** (each maps to a WebFX failure found in this crawl):

| # | Check | WebFX failure it prevents |
|---|---|---|
| 1 | Fail on unrendered tokens in HTML or JSON-LD: `[stat`, `{{`, `TODO`, `undefined`, `Test Block` | Shortcode leak on 125 pages |
| 2 | Fail on `utm_` parameters in internal or body links, especially `utm_source=chatgpt.com` | AI-draft UTM link in body text |
| 3 | Year consistency across URL, title, description, H1/H2 and dateModified | 2019 URL retitled 2026 |
| 4 | Duplicate H1 and duplicate title detection across the site | Shared "Download Your Free Guide" H1 |
| 5 | Numbers need sources: flag any %, ₹, Cr, lakh or "x ROAS" figure without a source link in the same block | Unsourced and contradictory stats |
| 6 | Allowlist for MMC figures (the four approved strings) and a denylist for known unverified strings (₹4.2Cr, "12 brands", 32%, "2,400 readers") | Inconsistent company claims |
| 7 | Visible dates must equal schema dates; author and reviewer must resolve to an existing team page | Re-dated content with no visible date |
| 8 | Em dash detector on all published copy | MMC house rule |
| 9 | Carousel or clone components must not duplicate headings in pre-rendered HTML | Headings cloned 2 to 3 times |

**Measurement.**
- Search Console reports by folder (`/guides/`, `/benchmarks/`, `/tools/`, `/glossary/`).
- Calculator events: used, interpreted, "sent to strategist" (as conversions).
- A monthly AI-citation log: fixed prompt set, India-modified, run in ChatGPT, Perplexity, Gemini and Google AI Mode, recording whether MMC pages are cited.
- Benchmark anchor-link referrals.

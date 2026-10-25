# WebFX pricing: how it publishes and uses prices, and what MMC should do

Scope: all 41 WebFX `/pricing/` pages in the corpus, plus the pricing blocks inside 69 service (sales) pages under `ppc_services*`, `seo_services*`, `social_media_services*`, `web_design_services*`, `content_marketing_services*`. The corpus was collected from the live site on 2026-09-15.

Method
- `scripts/extract_pricing.py` pulls, for every `*pricing*` page: title, H1, meta description, word count, schema types, schema dates and people (by regex, because the corpus cuts schema JSON off at 6,000 characters), byline lines, price ranges, units, fee-model terms, "% of ad spend" sentences, "starting at" lines, CTAs and link targets. Output: `analysis/webfx-pricing-inventory.json` and `.tsv`.
- `scripts/service_pricing_blocks.py` greps service pages for price language (`analysis/webfx-service-pricing-blocks.txt`). `scripts/service_pricing_dedup.py` groups identical plan tables that appear on several pages (`analysis/webfx-service-pricing-dedup.txt`, 123 distinct blocks).
- Read in full (18 pages): seo_pricing, ppc_pricing, social_media_pricing, digital_marketing_pricing, web_design_pricing, seo_pricing_ai_seo, content_marketing_pricing, local_seo_pricing, email_marketing_pricing, ppc_pricing_ecommerce, seo_pricing_enterprise, seo_pricing_ecommerce, web_design_pricing_website_costs, social_media_pricing_how_much_does_facebook_advertising_cost, lead_generation_pricing, web_development_pricing_website_maintenance, digital_advertising_pricing, seo_pricing_how_much_does_seo_audit_cost. For the other 23 I read the intro and every price line.
- Caveats: the text export flattens tables, and some plan tables load by script or as images, so a heading like "View WebFX's SEO packages" can appear with no prices under it. Because the schema strings are truncated, FAQPage and Dataset counts may be undercounted.

---

## 1. Two kinds of pricing content

All 41 pages sit under `/[discipline]/pricing/...`, and most are hybrids. The best split is by how much of WebFX's own pricing each page shows:

| Group | Count | What it is | Pages |
|---|---|---|---|
| (a1) Pure market guide, no WebFX price | 13 | Answers "how much does X cost" using survey or industry ranges; the CTA is a proposal | ppc_pricing_google_remarketing, ppc_pricing_how_much_does_it_cost_to_advertise_on_bing, seo_pricing_is_paying_for_seo_worth_it, digital_marketing_pricing_how_to_balance_your_budget_with_seo_and_ppc, digital_marketing_pricing_is_digital_marketing_cost_effective, digital_marketing_pricing_digital_recruitment, digital_marketing_pricing_channel_partner_marketing, lead_generation_pricing, social_media_pricing_how_much_does_pinterest_advertising_cost, web_design_pricing_wordpress_cost, web_design_pricing_redesign (calculator only), digital_advertising_pricing_sem_pricing (has a "How much does WebFX charge" heading but no price in the text), analytics_pricing ("starts at" figures with no attribution) |
| (a2) Market guide plus a WebFX "Starting at" card | 17 | Market ranges first, then an "An Inside Look at WebFX X Pricing" card; 6 add a calculator | seo_pricing, seo_pricing_ecommerce, seo_pricing_enterprise, seo_pricing_how_much_does_seo_audit_cost, seo_pricing_voice_search, local_seo_pricing, ppc_pricing, digital_marketing_pricing, digital_marketing_pricing_cost_of_marketing, digital_marketing_pricing_reputation_management, digital_advertising_pricing, social_media_pricing, social_media_pricing_how_much_does_linkedin_advertising_cost, email_marketing_pricing, web_design_pricing, web_design_pricing_website_costs, web_development_pricing |
| (b1) Market guide plus a full WebFX plan or rate table | 10 | Tiered table with deliverables, set-up or initial fees, add-ons and "GET STARTED" per column | content_marketing_pricing, ppc_pricing_ecommerce, social_media_pricing_how_much_does_facebook_advertising_cost, social_media_pricing_how_much_does_it_cost_to_advertise_on_twitter, social_media_pricing_how_much_does_social_media_marketing_cost, web_development_pricing_website_maintenance, digital_marketing_pricing_conversion_rate_optimization, web_development_pricing_site_speed_optimization, web_development_pricing_website_security_analysis, web_development_pricing_ada_compliance |
| (b2) Own-plans page | 1 | Headline is WebFX's own price, with an 8-tier table | seo_pricing_ai_seo ("Inside WebFX's AI SEO Pricing: View Plans & Costs") |

WebFX's detailed commercial terms mostly live on the service pages ("Transparent X Pricing" sections, see section 2). The pricing pages act as the education layer that points to them.

### 1a. Inventory of the market guides (a1 + a2 + b1)

Words = visible body words in the corpus (schema `wordCount` runs 20-80% higher). Dates = visible "Last updated/Published" text / schema `dateModified` / year in title or H1. "SVP Sales" = Trevin Shirey, whom the pages introduce as "Senior Vice President of Sales at WebFX".

| # | Page (slug) | Prices | Headline market range in the intro | Models described | WebFX price on page | Notable schema | Words | Author / reviewer | Freshness |
|---|---|---|---|---|---|---|---|---|---|
| 1 | seo_pricing | SEO | $1,000-$5,000/mo; $75-$200/hr; $500-$5,000/project | Retainer, hourly, project, freelancer; business-size table | Card "$3,000/month"; package table not in text; calculator | Dataset, ItemList | 2,095 | Abby Fields / SVP Sales | none / 2026-08-05 / 2026 in H2 |
| 2 | seo_pricing_ecommerce | Ecommerce SEO | $500-$7,500/mo; $25-$100/hr; $100-$5,000/project | Same three | Card $2,500/mo; "four packages" table not in text; calculator | Dataset, VideoObject | 1,578 | Sam Wixted / WebFX Team | Sep 22 2025 / 2026-07-01 / 2026 |
| 3 | seo_pricing_enterprise | Enterprise SEO | $1,001-$7,500/mo (52%) | Monthly, hourly, project; % of budget | Card $11,500/mo; takeaway "plans range from $12,550-$23,750" | Dataset | 1,755 | Kevin Randolph / WebFX Team | Sep 22 2025 / 2026-05-26 / 2026 (body also says "in 2025") |
| 4 | seo_pricing_how_much_does_seo_audit_cost | SEO audit | $101-$750 (43%) | Per audit; size table | Card "$8,600/month" | Dataset | 1,832 | none / Sarah Berry | none / 2026-07-03 / 2026 |
| 5 | seo_pricing_voice_search | Voice search | $100-$5,000/mo; $50-$150/page | Monthly, per page | Card "$600 per page" | Dataset | 2,386 | Sam Wixted / WebFX Team | Sep 23 2025 / 2026-05-28 / 2026 |
| 6 | seo_pricing_is_paying_for_seo_worth_it | Value objection | none | none | none | VideoObject | 1,187 | Abby Fields / SVP Sales | undated |
| 7 | local_seo_pricing | Local SEO | $500-$3,000/mo; $500-$5,000 project; $75-$200+/hr | Retainer, project, hourly; size table | Card $575/mo; per-location calculator; deliverables list | Dataset | 2,486 | Abby Fields / Abby Fields | none / 2026-05-26 / 2026 |
| 8 | ppc_pricing | PPC | $1,000-$10,000/mo; fees "10%-20% of ad spend or $1,000 to $3,000 monthly" | CPC, CPM, performance-based, % of spend; CPC by platform (incl. ChatGPT Ads) | Card $750/mo; calculator from ad spend to management fee | Dataset, ItemList | 1,197 | Abby Fields / SVP Sales | none / pub 2026-06-11 / 2026 |
| 9 | ppc_pricing_ecommerce | Ecommerce PPC | $100-$50,000/mo; management $501-$5,000 | Flat vs % of spend | Card $975; Lite/Pro/Enterprise table with add-ons | Dataset | 2,238 | Celeste Yates / same | May 23 2025 / 2026-06-05 / 2026 |
| 10 | ppc_pricing_google_remarketing | Remarketing | $0.66-$1.23 CPC (meta description) | CPC | none | Person | 2,016 | WebFX Team | undated / title "[2026 Pricing Guide]" |
| 11 | ppc_pricing_how_much_does_it_cost_to_advertise_on_bing | Microsoft Ads | CPC-led | CPC | none | FAQPage | 1,397 | WebFX Team / SVP Sales | undated; body cites 2015 |
| 12 | digital_marketing_pricing | Digital marketing hub | $1,000-$20,000+/mo; $50-$250+/hr; $3,000-$30,000+/project | Retainer, project, hourly; by-service table; % of revenue by industry (Education 12%) | Card $3,000/mo | Dataset, ItemList | 2,160 | Abby Fields / SVP Sales | none / 2026-09-01 / 2026 (takeaway says "in 2025") |
| 13 | digital_marketing_pricing_cost_of_marketing | Marketing budget | $50-$6,000/mo | By channel | Card $3,000/mo | VideoObject | 4,620 | WebFX Team | Feb 27 2025 / 2026-06-11 / none |
| 14 | digital_marketing_pricing_conversion_rate_optimization | CRO | $800-$10,000/mo | Software plus services | 3 plans from $1,500/mo; month-1 set-up $1,500; extra assets $600 each | WebPage, VideoObject (no Article) | 2,199 | none / Abby Fields | none / 2026-05-27 / 2026 |
| 15 | digital_marketing_pricing_reputation_management | Reputation | $151-$5,000 per location; $100-$10,000/mo | Per location, monthly | "$125/month for 1 location" | Article | 1,775 | none / Dan Shaffer | Feb 28 2025 / 2025-11-14 / title 2026 |
| 16 | digital_marketing_pricing_digital_recruitment | Recruitment marketing | $1,000-$20,000/mo | 4 market tiers: Standard $1-5k, Aggressive $5-10k, Advanced $10-15k, Enterprise $15-20k | none | Person | 4,233 | WebFX Team | undated / 2026 |
| 17 | digital_marketing_pricing_channel_partner_marketing | Channel partner | $3,000-$12,000 SMB; $12,000-$30,000 enterprise; up to $200,000 | PPC "5-20% of monthly ad spend" | none | VideoObject | 1,901 | WebFX Team | undated / 2026 |
| 18 | digital_marketing_pricing_how_to_balance_your_budget_with_seo_and_ppc | Budget split | 70/30 or 60/40 SEO/PPC split | none | none | Person | 1,104 | Abby Fields / SVP Sales | undated |
| 19 | digital_marketing_pricing_is_digital_marketing_cost_effective | Value objection | Social $100-$5,000/mo | none | none | ItemList | 1,934 | WebFX Team / SVP Sales | none / 2026-06-29 |
| 20 | digital_advertising_pricing | Digital ads hub | $301-$5,000/mo (64%) | Agency: retainer, hourly, project, performance. Ads: CPC, CPM, CPA, CPV, CPE, CPL, CPS | Card $750/mo | Table, ItemList | 1,726 | Abby Fields / SVP Sales | none / 2026-06-09 / 2026 |
| 21 | digital_advertising_pricing_sem_pricing | SEM | $251-$10,000/mo (meta description: $9,000-$10,000) | none | Heading only | Guide, Dataset | 403 | Celeste Yates / SVP Sales | Jun 4 2025 / 2026-05-29 / H1 "in 2025" |
| 22 | social_media_pricing | Social management hub | $500-$5,000/mo; $35-$150/hr; $40-$150/post | Retainer, hourly, per post, per platform | Card $3,000/mo; 3-network calculator "based on WebFX pricing" | BlogPosting, FAQPage, Dataset, ItemList | 1,803 | Abby Fields (author only) | Published Feb 27 2026 / 2026-05-26 / 2026 |
| 23 | social_media_pricing_how_much_does_social_media_marketing_cost | Social marketing | $100-$5,000/mo management; $1,000-$25,000/yr ads | Management vs ads; set-up fee | Card $3,000; paid social table | Dataset, VideoObject | 2,665 | WebFX Team | Aug 14 2025 / 2025-11-14 (schema published 2024-08-14) / 2026 |
| 24 | social_media_pricing_how_much_does_facebook_advertising_cost | Facebook ads | $0.30-$4.00 CPC; $3-$20 CPM; CPL $8-$25; CPA $8-$55 | CPC, CPM, CPL, CPA; minimum 7-day budgets by objective | "15% of ad spend/month"; Pro/Enterprise table | ItemList (Dataset JSON-LD leaks into visible body text) | 2,183 | Abby Fields / Sarah Berry | none / 2026-05-28 / 2026 |
| 25 | social_media_pricing_how_much_does_it_cost_to_advertise_on_twitter | X ads | $0.26-$0.50 per first action; $1.01-$2 per follow | DIY vs freelancer vs agency table | Same paid social table | HowTo, Dataset, VideoObject | 2,158 | WebFX Team | Sep 11 2025 / 2026-05-28 / 2026 |
| 26 | social_media_pricing_how_much_does_linkedin_advertising_cost | LinkedIn ads | $2-$3 CPC; $5.01-$8 CPM | Platform minimums | "15% of ad spend/month" | FAQPage, HowTo, Dataset | 1,510 | Abby Fields / SVP Sales | none / 2026-05-26 (published 2024-11-05) / 2026 |
| 27 | social_media_pricing_how_much_does_pinterest_advertising_cost | Pinterest ads | $0.00-$0.10 CPC | CPC, CPM, per conversion | none | HowTo, Dataset | 2,780 | WebFX Team | undated / 2026 |
| 28 | content_marketing_pricing | Content | $1,000-$20,000+/mo; blogs $150-$600 | Retainer, freelancer, in-house, per asset | Card $2,000; Basic $1,800 / Aggressive $3,600 / Market Leader $6,000 | Dataset, ItemList | 1,495 | Abby Fields / SVP Sales | Mar 17 2026 / 2026-06-19 / 2026 |
| 29 | email_marketing_pricing | Email | $51-$1,000/mo | Agency vs platform; platform table | Card $300; 5 package headings with no prices in text | Dataset | 2,040 | Abby Fields / Abby Fields | "May 15, 2025" and "April 2, 2025" on the same page / 2026-07-02 / 2026 |
| 30 | lead_generation_pricing | Lead gen | $100-$2,500/mo; CPL by industry $31-$208 (Education $55) | Monthly; agency vs in-house | none | Article | 1,416 | none / Sarah Berry | Feb 28 2025 / 2025-11-14 / 2026 |
| 31 | analytics_pricing | Analytics | $250-$750/mo; "12-15% of your ad spend" | Starting at; % of spend | GA consulting "$250 a month", CRO "$750 a month" (unattributed) | Article only | 1,635 | none / Macy Storm | undated |
| 32 | web_design_pricing | Web design hub | $1,000-$30,000+; "$501-$5,000 each year" | Hourly vs fixed; by budget | Card "$8,000/month"; calculator | Guide, Dataset | 2,311 | Abby Fields / SVP Sales | none / 2026-06-05 / 2026 |
| 33 | web_design_pricing_website_costs | Website cost | "$10 to $100,000+" | DIY vs pro; element table; recurring costs | Card "$8,000/month"; calculator | Dataset, ItemList | 2,611 | none / SVP Sales | none / 2026-05-15 / 2026 |
| 34 | web_design_pricing_redesign | Redesign | $3,000-$75,000 | Agency, freelancer, DIY | Redesign calculator | Guide | 4,584 | none / Sarah Berry | none / 2026-05-27 (published 2024-07-26) / 2026 |
| 35 | web_design_pricing_wordpress_cost | WordPress | $100-$100,000+ | One-time vs annual by business type | none | Person | 1,952 | WebFX Team | none / 2026-05-28 / 2026 |
| 36 | web_development_pricing | Web dev hub | $500-$100,000+; $25-$150+/hr | DIY, freelancer, agency | Card "$16,000/month" | Dataset, ItemList | 1,689 | none / Sarah Berry | none / 2026-04-16 / 2026 |
| 37 | web_development_pricing_website_maintenance | Maintenance | $3,600-$50,000 | Monthly plan vs hourly | Card $300; plans $350 / $550; $150/hr | Guide | 1,736 | none / Sarah Berry | Dec 19 2025 / 2026-05-26 / 2026 |
| 38 | web_development_pricing_site_speed_optimization | Site speed | $50-$12,000; $50-$150/hr | Hourly, flat, hybrid | 3 plans: initial fee plus $1,800-$4,800/mo | Article only | 3,767 | none / Sarah Berry | undated / 2026 |
| 39 | web_development_pricing_ada_compliance | ADA | none | Set-up fee plus licence | $800 + $1,400; $1,250 + $2,500; custom | Article only | 2,094 | none / Macy Storm | undated |
| 40 | web_development_pricing_website_security_analysis | Security audit | $2,000-$100,000/yr | Initial, quarterly, hourly | $2,800 / $4,300 initial; $600/quarter | Person | 1,872 | Matthew Gibbons | undated |

### 1b. The own-plans page

| Page | Tiers and monthly price | Deliverable ladder | Commitment | Schema | Words | Byline | Freshness |
|---|---|---|---|---|---|---|---|
| seo_pricing_ai_seo | Bronze $3,000, Silver $5,250, Gold $7,500, Diamond $12,000, Platinum $23,250, Enterprise $34,500, Enterprise+ $68,250, Global Enterprise+ Custom | Baseline audit 500 to 50,000 prompt×LLM checks; prompt monitoring 50 to 5,000+; flexible assets 3 to 90/month | "6-month commitment" in the column header | WebPage, FAQPage (no Article) | 1,155 | Albert Dandy Velasquez / Abby Fields | Schema 2026-08-05 to 2026-08-14, the newest in the set |

### 1c. Totals across the 41 pages
- Word count: 403 to 4,620, median about 1,900.
- Schema (a floor, given truncation): Dataset 20, ItemList 10, VideoObject 9, FAQPage 4, HowTo 3, Guide 4, Table 1. Person appears on 29; 12 have none.
- `datePublished` in schema: 30 of 41. Undated pages are mostly older guides (Bing, Pinterest, ADA, site speed, security, channel partner).
- Reviewers: SVP Sales 13, "WebFX Team" 11, Sarah Berry 7, Abby Fields 4, Macy Storm 2, four others 1 each. On its own cost guides, WebFX's most common named reviewer is its head of sales.
- Calculators on about 10 pages: SEO (x3), local SEO, PPC (x2), social, web design (x2), redesign.

---

## 2. WebFX's own commercial model

### 2a. Comparison table (from pricing pages plus service-page plan tables)

| Discipline | Public "starting at" anchor | Named tiers and prices | Fee model | Ad-spend bands | One-time / initial fee | Add-ons (examples) | Commitment shown | Where |
|---|---|---|---|---|---|---|---|---|
| SEO (core) | "SEO Plans Starting At $3,000 /month" | Silver $2,800, Gold $5,750, Diamond $9,200 (on-page SEO page); 4-column table $2,800 / $5,750 / $7,400 / $9,200 | Initial campaign, then flat monthly | n/a | "Initial campaign investment: (Two month duration)" $8,600 / $14,500 / $17,800 / $21,400 | Content, outreach, UX or CRO assets 6 / 12 / 24 per quarter; 8 custom dashboards | "(6 month commitment – Subsequent 4 months)" | seo_services, _b2b, _consulting, _keyword_research, _smb, _on_page_seo; seo_pricing |
| Ecommerce SEO | $2,500/mo (pricing page) and "$3,000 per month" (on the same service page) | "four different packages" (not rendered) | Flat | n/a | n/a | n/a | n/a | seo_pricing_ecommerce, seo_services_ecommerce |
| Enterprise SEO | $11,500/mo | Plans "$12,550–$23,750 per month", 80-150 optimised pages | Flat | n/a | n/a | Quarterly content assets | Guide warns "many agencies require a one-year commitment" | seo_pricing_enterprise, seo_services_enterprise |
| AI SEO / GEO | $3,000/mo | 8 tiers, $3,000 to $68,250, then Custom | Flat | n/a | n/a | Flexible assets 3 to 90/month | 6-month | seo_pricing_ai_seo, seo_services_ai_search_optimization |
| SEO audit | "Starting at $8,600/month" | Same figure as the SEO initial campaign | n/a | n/a | n/a | n/a | n/a | seo_pricing_how_much_does_seo_audit_cost, seo_services_seo_audits |
| Local SEO | "$575/per month" | Per-location calculator | Per location per month | n/a | n/a | Call tracking, Business View | n/a | local_seo_pricing |
| Voice search | "$600 per page" | n/a | Per page | n/a | n/a | n/a | n/a | seo_pricing_voice_search |
| PPC (search) | "PPC Plans Starting At $750 /month" | Lite $750 (also shown as $650 and $600), Pro "$975 or 15% of spend, whichever is higher", Enterprise "$4,500 or 12% of ad spend, whichever is greater" or "12% of ad spend +$250/mo. platform fee" | Flat floor plus % of spend, whichever is higher | $100-$5,000; $5,000-$30,000; $30,001+; enterprise management "$50k-$2m/mo" | "Initial Optimization" (month 1): $1,200 / $2,250 / $5,800 | Call-tracking pools $100 / $400/mo; display ad sets $375-$1,500/mo; CTV ads $190-$375/mo; social ads $975/mo; landing-page testing $1,800/mo; weekly data calls $600/mo; extra language $275 or $325/mo; translation and CRO "By Quote" | Not in page text. The PPC hub asks "What is the minimum contract length for your PPC services?" but the answer is collapsed | ppc_services, _ai, _consultants, _enterprise, _remarketing, _affordable; ppc_pricing_ecommerce |
| Ecommerce PPC | $975/mo | Same table | Same | Same | Same | Same | n/a | ppc_services_ecommerce, ppc_pricing_ecommerce |
| Paid social | "Starting at 15% of ad spend / month" | Pro: "$975 or 15% of ad spend, whichever is greater"; Enterprise: "$4,500 or 12% of ad spend, whichever is greater" | Floor plus % | "Required Ad Spend Range" $1,000-$30,000; $30,000+ | "Initial Campaign Investment (Month 1)" $1,975 / $4,250 | Ad-comment monitoring +$300 / +$600/mo; FuelFX assets | n/a | facebook/X/linkedin pricing pages; social_media_services_advertising, _tiktok |
| Enterprise paid social | "Starting at $2,250 per month"; "ad budgets above $15,000 per month" | Sliding ladder: $30,001-$100k: $4,500 or 12%; $100,001-$200k: $12,000 or 10%; $200,001-$400k: $20,000 or 8%; $400,001-$600k: $32,000 or 7%; $600,001-$800k: $42,000 or 6%; $800k+: $48,000 or 5.5% | Declining % with a floor | 6 bands | n/a | n/a | n/a | social_media_services_enterprise_social_advertising |
| Ecommerce paid social | "$1,080 / month" and "15% of ad spend" on the same page | "fixed fee, or a dynamic fee (18% of ad spend)" | Fixed or % | "Minimum recommended ad spend is $2,000/month" | n/a | n/a | n/a | social_media_services_ecommerce_advertising |
| Social media management | $3,000/mo | 3 tiers, ongoing management $3,150 / $4,425 / $5,100 | Flat | "Required Boosted Post Spend" $100 / $200 / $300 | "Setup Fee" $4,650 / $6,525 / $7,500 | Vertical content +$1,200/mo | n/a | social_media_services |
| Influencer | "$750/month" and "$3,000 per month" on the same page | n/a | n/a | n/a | n/a | n/a | n/a | social_media_services_influencer_marketing |
| Content marketing | $2,000/mo | Basic $1,800 (3 assets), Aggressive $3,600 (6), Market Leader $6,000 (10) | Flat by asset count | n/a | n/a | Blog $300 / $450 per page; expert review $562.50 / $750; SEO content analysis $600 / $150 | n/a | content_marketing_pricing, content_marketing_services* |
| Video / infographics / personalisation | "$1,200/video per month"; video $2,000/mo; infographics $2,000 and $3,000; personalisation $250/mo | n/a | n/a | n/a | n/a | n/a | n/a | content_marketing_services_explainer_videos, _infographics, _personalized_website_content |
| Email | $300/mo | 5 plan types named (fully managed, partially managed, lead nurture, drip, design); no prices in text | n/a | n/a | n/a | n/a | n/a | email_marketing_pricing |
| CRO | $1,500/mo (the analytics guide says $750) | 3 plans | Flat | n/a | "Initial Setup Month 1 $1,500" | "Additional CRO & UX Assets = $600 each" | n/a | digital_marketing_pricing_conversion_rate_optimization |
| Web design | "$8,000 / site" (hub) vs "$8,000 per month" (8 other pages) | Conversion design $6,000 / $9,000 per site; landing pages $1,125 / $1,875 / $3,000 (2 / 2-3 / 6-8 weeks) | Project | n/a | n/a | Interactive CTA +$100; CRM forms by quote | n/a | web_design_services*, ppc_services_landing_page_design |
| Web development | "$16,000/month" | n/a | n/a | n/a | n/a | n/a | n/a | web_development_pricing |
| Maintenance | Card $300/mo; plans $350 (WordPress, 500 pages or fewer) / $550 (Enterprise WordPress and WooCommerce) | 2 plans plus hourly | Flat plus hourly | n/a | n/a | $150/hr in 30-minute increments, 1-1.5 hr minimum; urgent restore $250/hr | n/a | web_development_pricing_website_maintenance |
| Site speed | none | 25 hrs: $3,125 + $1,800/mo; 40 hrs: $6,250 + $3,600/mo; 50 hrs: $3,750 + $4,800/mo | Initial plus monthly | n/a | Listed | n/a | n/a | web_development_pricing_site_speed_optimization |
| Security | none | $2,800 initial; $4,300 if the site is already hacked | Project plus quarterly | n/a | Listed | $600/quarter audits; $300/hr urgent fixes | n/a | web_development_pricing_website_security_analysis |
| ADA | none | "$800 setup fee + $1,400 Year 1 License" / "$1,250 setup fee + $2,500" / Custom | Set-up fee plus annual licence | n/a | Listed | Audit "for additional fee" | Annual licence | web_development_pricing_ada_compliance |
| Reputation / chatbot / analytics | $125/mo per location; $1,150/mo; GA consulting $250/mo | n/a | n/a | n/a | n/a | n/a | n/a | reputation, facebook_messenger_chatbot, analytics_pricing |

### 2b. What each tier includes (deliverable ladders)
- **PPC (Lite / Pro / Enterprise):** keywords 2,000 / 10,000 / 10,000. Networks: Google, Local Services Ads, Bing, remarketing, Shopping, ChatGPT and Yelp advertising, plus AdTechFX programmatic at higher tiers. "Up to two personal consultations per month". One-time creative sets grow by tier (2 sets of rapid display ads, then up to 3 custom sets plus CTV ads). Reporting, call-tracking pools and "Campaigns will be managed through client's SEM accounts ... (client will retain Admin/owner access)". Ad spend is always "(paid to networks)".
- **Paid social (Pro / Enterprise):** networks "Pick up to 2" / "Pick up to 3" plus programmatic; campaigns up to 8 / 10; consultations up to 2 / 4; creative sets up to 2 / 4; "All social assets managed through client-owned accounts".
- **SEO (Silver / Gold / Diamond):** keyphrases 150 / 200 / 300; pages optimised 30 / 40 / 60; assets 6 / 12 / 24 per quarter; 8 dashboards; call, lead and revenue tracking.
- **Social management (3 tiers):** boosted posts 2 / 4 / 6; consultations 1 / 2 / 4; monitoring, editorial calendar, reporting.
- **Content (Basic / Aggressive / Market Leader):** 3 / 6 / 10 assets from a list of 17 formats, plus proprietary software named at every tier.
- **AI SEO:** every tier gets the audit, competitor analysis, monitoring and a dedicated consultant; tiers scale audit size, prompts and assets.

### 2c. Effective fees under the "whichever is greater" model
- PPC Pro at $5,000 spend: $975 is 19.5%. The 15% rate only takes over at $6,500. Enterprise at $30,001 costs $4,500 (15%), and 12% only takes over at $37,500. In practice the PPC fee rarely falls below 15% of spend until about $37.5k a month.
- Paid social Pro at the $1,000 spend floor: $975 is 97.5% of spend.
- SEO "Starting at $3,000/month" in practice means $8,600 for the first two months plus 4 × $2,800 = $19,800 over the 6-month commitment, an average of $3,300/month. The anchor sits below what a buyer actually pays.

### 2d. Commercial terms that recur
- Ad spend is billed separately and paid to the networks. The client owns the ad accounts. This is repeated on every PPC and social table.
- A month-1 "initial optimization" or set-up fee appears on almost every recurring service.
- Commitment is disclosed only on SEO and AI SEO (6 months). Hub FAQs ask about minimum contract length without showing an answer in the text.
- Up-routing and down-routing lines: "Budget over $50k/mo? Check out our enterprise campaign management offerings for campaigns from $50k-$2m/mo in ad spend." (ppc_services_affordable) and "While not the cheapest choice, WebFX's custom SEO services are worth the investment for small businesses looking to move up market." (seo_services_smb)

---

## 3. How pricing is framed and sequenced

### 3a. The hybrid-guide template (17 of the 41 follow it closely)
1. **H1 with a year and a bracket tag:** "[Data]", "[+Calculator]", "[350+ Surveyed]".
2. **Byline above the fold:** "Reviewed by: Trevin Shirey".
3. **Answer-first range paragraph** ending "Keep reading to learn more about X pricing!"
4. **Two buttons:** a market one ("View Costs", "Use Cost Calculator", "View Pricing Data") and a WebFX one ("View Pricing", "See Real Pricing", "See WebFX Pricing", "View Pricing Plans").
5. **Credibility box:** "METHODOLOGY:" or "ORIGINAL DATA: We surveyed over 250 U.S-based marketing and sales professionals..."
6. **Jump links,** one of which is always "WebFX Pricing" or "Real Pricing".
7. **"Key Takeaways":** 5 question-and-answer pairs that repeat the ranges.
8. **Market body:** pricing models, a business-size table, per-platform costs, cost factors, then "(X% of respondents)" and "Source Data".
9. **FAQs.**
10. **"An Inside Look at WebFX [X] Pricing" card.** In order: service name, "Starting at $X/month", "Learn More", WEBFX EXPERTISE proof numbers ("750+ PPC and Google Ads specialists", "$15.7M in social media ad spend managed"), HIGHLIGHTS deliverables, "What Sets WebFX Apart - Join the 1,450+ businesses trusting WebFX...", "Too many X providers take a copy-and-paste approach... That's not our style.", then "Get a Custom Quote".
11. **Optional full plan table,** with "GET STARTED" under each column and "Need more information? Call Us: 888-874-2601".
12. **Calculator,** whose result leads to "Get a free proposal" and "View plans".
13. **"Meet WebFX - A world-class digital marketing agency with thousands of reviews applauding our transparency."**
14. **Persistent "Get a Proposal"** linking to `/free-quote/`, present on every page. Five pages route to `/free-quote-alt/`, which looks like a form test.

### 3b. Anchoring
- **Market range first, then a WebFX price that lands mid-range or cheap.**
  - SEO: market $1,000-$5,000, WebFX $3,000.
  - PPC: market fees "10%-20% ... or $1,000 to $3,000", WebFX $750.
  - Web design: market $1,000-$30,000, WebFX $8,000.
- **Premium justified explicitly where WebFX is above market.** Enterprise SEO puts the market at $1,001-$7,500 and WebFX at $11,500, then argues: "maybe an agency charges $12,000 per month, but it comes with enthusiastic recommendations ... In comparison, maybe another agency offers a monthly rate of $2500, but they have less-than-stellar reviews" (seo_pricing_enterprise).
- **"Starting at" is the lowest possible number,** sometimes below the cheapest real tier (SEO $3,000 vs $2,800 plus an $8,600 initial fee; social $3,000 vs $3,150 plus $4,650 set-up; maintenance $300 vs a $350 plan).
- **Percentage anchors for paid media** ("Starting at 15% of ad spend/month") hide the $975 floor until the table.

### 3c. Transparency language vs hedges on the same pages
- **Transparency claims:**
  - "Transparent [X] Pricing" as an H2 on at least 25 service pages.
  - "We value transparency — that's why we publish our pricing and pricing determinants online" (seo_services_b2b).
  - "That's why we publish our plans and prices online, as well as ensure your company owns your Google Ads account" (ppc_pricing_ecommerce).
  - "you can trust that our prices are accurate, up to date, and free from hidden fees" (web_development_pricing_site_speed_optimization).
  - "Stop settling for cookie-cutter SEO and hidden pricing" (seo_services).
- **Hedges:**
  - "Pricing custom to you. Starting at $X per month. Request a Free Proposal" (44 service pages).
  - A "How we determine pricing" block with three factors (for PPC: "Your Ad Spend / Networks and Targeting / Creative Needs").
  - "Use this table as a planning guide rather than a final quote" (seo_pricing_ai_seo).
  - "Each package can easily be customized" (seo_pricing_ecommerce).
  - "By Quote" and "Custom" cells.
  - "Can I negotiate SEO prices? Yes..." (seo_pricing).
  - "Looking for custom plans and pricing? Request a proposal to receive yours." (social_media_services).

### 3d. What sits around the price
- **Before:** proof numbers (awards, headcount, managed spend, "Ecommerce Transactions Driven: 14,936,451").
- **After:** deliverable highlights, then a differentiation line, then "Get a Custom Quote".
- **CTAs:** every price is followed by a quote or proposal CTA, never a buy or sign-up button. The price qualifies the lead; the sale still happens on a call.

---

## 4. Copy style

### 4a. Headline formulas
| Formula | Example (slug) |
|---|---|
| "How Much Does X Cost in [Year]? [Data]" | social_media_pricing_how_much_does_social_media_marketing_cost; email_marketing_pricing (H1) |
| "X Pricing: How Much Does X Cost? [+Free Calculator]" | seo_pricing |
| "X Pricing in [Year] [N+ Surveyed]" | content_marketing_pricing (title) |
| "[N]+ Businesses Asked: How Much Does X Cost?" | web_development_pricing (title); lead_generation_pricing ("[250+ Businesses Asked]") |
| "[Year] X Pricing: How Much Should You Pay?" | web_development_pricing_website_maintenance |
| "How Much Does X Cost in [Year]? Your X Pricing Cheat Sheet" | digital_marketing_pricing_conversion_rate_optimization (H1) |
| "Inside [Brand]'s X Pricing: View Plans & Costs" | seo_pricing_ai_seo |
| "Is Paying for X Worth It?" (objection page) | seo_pricing_is_paying_for_seo_worth_it |

25 of 41 pages use a title tag that differs from the H1. The title carries the bracket tag and the H1 is plainer.

### 4b. Structural devices
- **Answer-first opening:** a number range in the first sentence on 30+ pages.
- **Key Takeaways block** (5 questions and answers) near the top on about 30 pages. Each is a self-contained answer that is easy to extract.
- **Flattened comparison tables:** "PRICING MODEL / AVERAGE COST / BEST FOR / TYPICAL DURATION"; "BUSINESS SIZE / MONTHLY COST / % OF BUSINESSES".
- **Parenthetical evidence** after every range: "(57% of respondents)", followed by "Source Data".
- **"Data roundup" stat tiles** labelled "Source: WebFX".
- **FAQ H3s:** 7 to 16 question headings per page.
- **Upbeat conclusions to value questions:** "Yes, web design is worth the cost!"

### 4c. Verbatim lines
1. "SEO costs an average of $1,000 to $5,000 per month for monthly retainers, $75 to $200 per hour for consulting, and $500 to $5,000 per project for specific tasks or projects." (seo_pricing)
2. "PPC typically costs $1,000 to $10,000 per month with professional management fees ranging from 10% to 20% of ad spend or $1,000 to $3,000 monthly." (ppc_pricing)
3. "METHODOLOGY: We asked 350 marketers to share how much their companies spend on PPC advertising. Keep reading to uncover their answers!" (ppc_pricing)
4. "You've explored SEO prices for different pricing plans, industries, and company sizes, but what about prices from an actual SEO service provider?" (seo_pricing)
5. "Use this table as a planning guide rather than a final quote, since your exact investment depends on your goals, your current AI visibility, and the search experiences your audience uses most." (seo_pricing_ai_seo)
6. "WebFX's AI SEO pricing plans are built to last the pushback from leadership and for the essential budget conversation." (seo_pricing_ai_seo)
7. "Too many search engine optimization providers take a copy-and-paste approach to SEO. That's not our style." (seo_pricing and other SEO guides)
8. "Ongoing Monthly Campaign Investment (Months 2+) $975 or 15% of ad spend, whichever is greater" (social_media_pricing_how_much_does_facebook_advertising_cost)
9. "Yes, you can negotiate SEO prices as a lot of services are often tailored to specific business needs and goals instead of having fixed, one-size-fits-all SEO packages." (seo_pricing)
10. "If your agency doesn't include an audit with their SEO services or includes it as a hidden fee, choose another company." (seo_pricing_how_much_does_seo_audit_cost)

---

## 5. SEO and AI value

**Why the pages exist**
- **They capture cost-intent queries** ("how much does X cost", "X pricing") across the funnel. This corpus has no search-volume data, so volume is not asserted here.
- **The URL tree mirrors the service tree:** `/seo/pricing/enterprise/` sits next to `/seo/services/enterprise/`. Every service has a matching cost page.
- **The cluster is larger than the corpus.** In-body links point to `/martech/pricing/`, `/amazon/pricing/seo/`, `/email-marketing/pricing/smb/` and `/lead-generation/pricing/smb/`, none of which were collected.
- **The pages are built to be the source an answer engine quotes.** Answer-first ranges, Key Takeaways pairs and Dataset schema ("WebFX Marketing Research" data catalogue) all serve that purpose. By placing "Starting at $X" on the same page, WebFX also gets its own price points picked up next to the market range.

**Structured data**
- Article or BlogPosting plus BreadcrumbList on almost all pages.
- Dataset on 20 pages, to present survey ranges as "original research".
- ItemList 10, FAQPage 4, HowTo 3 (platform set-up steps), Guide 4, Table 1.
- On the Facebook ads page, a Dataset JSON-LD block renders as visible body text, a template bug.

**Freshness**
- 31 of 41 put "2026" in the title or H1.
- Schema `dateModified` falls between May and September 2026 on most pages.
- Visible dates often lag (see section 6).
- `digital_marketing_pricing` was modified on 2026-09-01, two weeks before collection, yet its Key Takeaways still say "in 2025". This suggests year strings and dates are bumped in bulk.

**Internal links**
- **To the sale:** every page links to `/free-quote/`. The "Inside Look" card's "Learn More" links to the service hub.
- **In-body links** (sitewide nav and footer excluded, meaning links found on 30% or more of all pages): 1.3 links to `/services/` pages and 2.6 to other `/pricing/` pages on average. The guides mainly link to each other. Two exceptions push harder to sales pages:
  - The social ads guides link to 4-5 social service pages.
  - Ecommerce PPC links to 4 PPC service pages.
- **Back-links:** service pages link back into pricing guides through "Related Resources" (e.g. social_media_services lists "Social Media Management Pricing in 2026").

---

## 6. Risks and weaknesses

**Same product, different price or unit**
- Web design is "$8,000 / site" on web_design_services but "Starting at $8,000/month" on web_design_pricing, web_design_pricing_website_costs and 7 web design service pages. Web development shows "$16,000/month" for what is a project.
- The SEO audit is sold at "Starting at $8,600/month". That is really the 2-month SEO initial campaign. The same page says WebFX includes an audit "at no additional cost" and warns against agencies that charge audits "as a hidden fee".
- PPC Lite costs $750 in four tables, $650 on the remarketing plan cards and $600 in the ecommerce PPC table.
- PPC Enterprise is "$4,500 or 12% ... whichever is greater" in one table and "12% of ad spend +$250/mo. platform fee" in another, and ppc_services_remarketing shows both.
- The extra-language fee is $275 in one table and $325 in another.
- The same page shows two different starting prices in four places:
  - Ecommerce SEO: $2,500 and $3,000.
  - Influencer: $750 and $3,000.
  - Ecommerce paid social: $1,080 and 15% of spend.
  - Infographics: $2,000 and $3,000.
- Enterprise paid social says "Starting at $2,250" and "ad budgets above $15,000", but its ladder starts at $30,001 with a $4,500 floor.
- CRO costs $750 on analytics_pricing and $1,500 on the CRO page. Enterprise SEO shows a $11,500 card next to a "$12,550–$23,750" takeaway.
- In the site speed plans, 50 hours costs $3,750 up front while 40 hours costs $6,250.

**Confusing tier names**
- ppc_pricing_ecommerce labels its table Lite / Pro / Enterprise, then the text says "Our Basic Plan ... our Aggressive Plan and Market Leader Plan".
- "Silver" is $2,800 in SEO and $5,250 in AI SEO. "Diamond" is $9,200 and $12,000. The same metal names mean different prices by product.

**Market figures that contradict themselves**
- 11 pages have a meta description whose figures differ from the body:
  - SEO: "$75-$100 per hour" in the description vs "$75 to $200" in the body and "$51 per hour" in the takeaway. The description also claims a "survey of 500".
  - Content: $5,001-$10,000 vs $1,000-$20,000+.
  - SEM: $9,000-$10,000 vs $251-$10,000.
  - SEO audit: $650-$14,000 vs $101-$750.
  - Facebook: $0.26-$0.30 CPC vs $0.30-$4.00.
  - Website cost: $1,000-$145,000 vs "$10 to $100,000+".
  - Maintenance: "$300 to $60,000 per year" vs $3,600-$50,000.
- Some ranges contradict themselves on one page:
  - Social ads: "$850 to $2,000" in the takeaway vs "$650 to $6,000" in the body.
  - Digital marketing: "$1,000 to $20,000+" in the intro vs "$50 to $6,000 per month on average in 2025" in the takeaway.
  - Maintenance: "$3600 – $50,000" vs "53% spend $2,501 – $25,000 per month".
- Business-size tables go backwards:
  - Web design: large businesses "$100,000 – $150,000", enterprises "$2,501 – $5,000".
  - Ecommerce SEO: startups "$2,501 – $5,000 100%", large businesses "$500 – $5,000".
  - Email: mid-sized "$11 – $100", below small businesses at "$51 – $500".
- Agency is shown cheaper than freelancer: web design agency "$501 – $1000 per year" vs freelancer "$1001 – $5000"; X ads agency "$1-$50" per hour.

**Stale or bumped years**
- 12 pages show a 2025 "Last updated" or "Published" date; 10 of them carry 2026 in the title or H1 (reputation, email, lead gen, ecommerce PPC, ecommerce SEO, enterprise SEO, voice search, X ads, social marketing cost, maintenance).
- The SEM H1 still reads "in 2025".
- The email page shows two different "Last Updated" dates.
- The social marketing cost page shows "August 14, 2025" while its schema says published 2024-08-14.
- The Bing page cites 2015.
- The same "250 U.S.-based marketers" sample underpins 14 topics, with no survey dates.

**Weak evidence and E-E-A-T**
- The most frequent named reviewer is the SVP of Sales (13 pages); 11 pages are reviewed by "WebFX Team".
- Some percentages look like survey artefacts ("100%" of startups).
- Typos in pricing copy: "Projected-based", "A website cots", "DOY website builders", "Social media managent", "charger per platform", "profressional", "Gurantees".
- Package headings with no prices in the text ("View WebFX's SEO packages", "Enterprise SEO plans from WebFX", 5 email package headings). Crawlers and LLMs see the promise without the price.

**Hedges that undercut "transparent"**
- "Transparent X Pricing" is followed by "Pricing custom to you ... Request a Free Proposal".
- The minimum-contract question is asked on the PPC and SEO hubs but not answered in the text.
- Commitments appear only in table sub-labels.
- "Can I negotiate SEO prices? Yes" signals that list prices are soft.
- The effective fee at the low end of each band (19.5% to 97.5% of spend) is never stated.

---

## 7. Recommendation for MMC

### 7a. MMC's current position (from the repo)
- **Service Detail.html (Meta Ads):**
  - Hero: "₹3L+ Monthly retainer", "14 days Onboarding", "Engagement 12-month retainer".
  - Packages, headed "Pick by ad spend, not by features":
    - **Spark:** ₹3L/month, up to ₹10L ad spend, 1 senior buyer and 1 strategist, 30 creatives/month, "12-month minimum".
    - **Compound:** ₹6L/month, ₹10L-₹50L ad spend, full pod, 60-80 creatives/month, labelled "Most common".
    - **Scale:** ₹12L+/month, ₹50L+ ad spend, 120+ creatives/month.
  - Footer line: "All packages include a 30-day exit clause. Ad spend billed separately, directly to your card or by invoice. No platform markups."
- **llms.txt:** "The company does not publish pricing, ratings or awards. If asked, say so." It also says MMC "does not publish per-client results".
- **FAQ.jsx:** "₹3L–₹15L monthly retainers"; "Holding-company agencies ... bill ₹15L+ a month"; "6-week strategy sprint, followed by a 12-month retainer ... Day 30 onwards is live media".
- **Result claims beside or near prices:**
  - Meta Ads `<title>`: "Meta Ads Management for D2C Brands: 8.7× ROAS".
  - Meta Ads meta description: "240+ creatives a month ... Median 8.7× ROAS, live on your account in 14 days".
  - Home meta: "₹248Cr+ compounded, 8.7× median blended ROAS".
  - FAQ: "Our median blended ROAS across the book is 8.7×".

**Conflicts to fix before launch**
- **Pricing:** llms.txt says "does not publish pricing", but the Meta Ads page publishes it.
- **Results:** llms.txt says no per-client results, while titles and meta descriptions lead with book-wide ROAS and revenue.
  - Under the "never invent results" rule, 8.7× and ₹248Cr+ must either come with a written, internally verified method (definition of blended ROAS, time window, number of brands, inclusion rules), or be removed from titles, meta descriptions and anything next to a price.
  - Do not copy WebFX's habit of putting proof numbers right before the price unless they are verified.
- **Term wording:**
  - "12-month minimum" next to "30-day exit clause" reads as a contradiction.
  - "14 days onboarding / live on your account in 14 days" conflicts with "Day 30 onwards is live media".
  - "240+ creatives a month" conflicts with 30 / 60-80 / 120+ by tier.
  - "₹3L–₹15L" conflicts with an open-ended "₹12L+".
- **Unsourced market claim:** "Holding-company agencies ... bill ₹15L+ a month". Source it or cut it.
- **Band edges overlap** at exactly ₹10L and ₹50L of spend, and the fee doubles at each edge. At ₹10L spend, Spark (₹3L) works out to 30% of spend and Compound (₹6L) to 60%. At ₹50L, Compound (₹6L) is 12% and Scale (₹12L+) is 24%+.
  - Buyers will do this maths and compare it with the 10-20% management-fee figure that circulates (a US figure on WebFX, not an Indian benchmark).
  - The MMC fee bundles creative production and a pod, while WebFX sells creative as an add-on, so the comparison is not like for like. The page has to say so, and the bands should read "up to ₹10L" then "above ₹10L".

### 7b. Decision: publish "starting at" retainers with ad-spend bands and full terms for productised services; publish engagement models only for everything else; never publish an add-on price menu

Reasoning:
- **Qualification.** MMC's floor (₹3L/month, brands with ₹3Cr+ revenue) is high for many Indian D2C brands. A visible floor screens out brands that would otherwise use one of the "8 audits per month" slots. WebFX uses "Starting at" and "Budget over $50k/mo?" for the same job.
- **Consistency.** The Meta Ads packages are already public, so a policy of "no pricing" is already untrue. Hiding prices now would create a mismatch between the site, llms.txt and sales calls.
- **Differentiation.** A flat fee by ad-spend band, with "No platform markups", is a real contrast to WebFX's "whichever is greater" percentage model. It also fits MMC's positioning of "contribution margin, not the dashboard screenshot". Frame the fee as a pod and creative retainer, and explain why it is not a percentage of spend. Confirm internally that no percentage component exists before claiming this.
- **Indian D2C buyers** (working assumptions to validate on sales calls):
  - Founders often compare retainer, percentage of spend and freelancer quotes.
  - They care about GST and about who pays the platform.
  - They are wary of long lock-ins.
  - So show "+ GST", "ad spend paid by you to Meta", and the exit terms in the same card as the price, which is WebFX's weakest point.
- **Education buyers** (colleges, edtech, coaching; working assumptions):
  - Budgets are approved in admissions cycles and often by committee.
  - Buyers think in cost per enquiry or cost per admission.
  - Publish engagement models ("admissions-season campaign", "always-on enquiry engine") with scope and "quoted after audit".
  - Never publish or imply a guaranteed cost per enquiry. If benchmarks are cited, attribute and date them.
- **B2B:** engagement model plus "scoped after audit"; no public numbers until MMC has a productised offer.
- **What not to copy:**
  - 30-line add-on menus and price calculators that output quotes (the source of WebFX's drift).
  - Headlines like "[250+ Surveyed]" without a real survey.
  - The SVP of Sales as reviewer.
  - Bulk year bumps.
  - "Starting at" figures below the real cheapest tier.

### 7c. Bringing llms.txt in line with the Meta Ads packages
- **Replace** "The company does not publish pricing, ratings or awards. If asked, say so." with something like: "MMC publishes starting retainers on its Pricing page. Meta Ads: Spark ₹3L/month (ad spend up to ₹10L/month), Compound ₹6L/month (above ₹10L to ₹50L), Scale from ₹12L/month (above ₹50L). Fees are fixed by ad-spend band, exclude GST, and do not include ad spend, which the client pays directly to the platform. Engagements run on a 12-month plan with a 30-day exit clause [final wording from legal]. Other services are quoted after an audit. MMC does not publish ratings or awards."
- **Keep one source of truth** (e.g. `content/pricing.json`) that feeds the Meta Ads page, the pricing page, FAQ.jsx, llms.txt and schema. Add a visible "Prices last reviewed: [date]" line that matches schema `dateModified`.
- **Remove or verify** the ROAS and revenue figures in the same release, so llms.txt ("does not publish per-client results") does not conflict with the titles.

### 7d. (a) Structure for an MMC Pricing and Engagement page (`/pricing`)
1. **H1:** "Pricing and how we work" (or "What MMC costs"). The H1 and title tag say the same thing.
2. **Answer-first paragraph** (2-3 sentences, no results claims): who MMC is for (D2C brands with ₹3Cr-₹150Cr revenue), "Retainers start at ₹3 lakh a month plus GST", "Ad spend is paid by you directly to the platform", the term and exit clause.
3. **Key facts block** (5 visible questions and answers, marked up as FAQPage): What does MMC charge? How is the fee set (ad-spend band, not % of spend)? What is included? What is billed separately? What is the contract and exit?
4. **Meta Ads tier table:** tier, ad-spend band (non-overlapping), monthly retainer, team, creatives/month, reporting cadence, onboarding time. Add a one-line note on what a band change means ("if your spend moves up a band for two consecutive months, we move tiers from the next cycle"; wording to be confirmed).
5. **"Why a flat fee by band":** a short explainer comparing retainer, % of spend and hybrid models neutrally, with no competitor numbers unless sourced.
6. **Other services as engagement models,** one row each: Google Ads, retention (email/WhatsApp), Shopify build (project), UGC production, SEO, education admissions campaigns. Columns: typical scope, billing model (monthly, project, per asset), "Quoted after audit". Add a "from ₹X" only where MMC has a real, repeatable floor from signed proposals.
7. **Billed separately:** ad spend, GST, creator or influencer fees, shoot costs, third-party tools (e.g. Klaviyo), platform subscriptions.
8. **Terms:** engagement length, exit clause, notice, payment timing, account ownership (client owns ad accounts and data), onboarding timeline (one number, consistent with the FAQ).
9. **Who we're not for:** below ₹3Cr revenue, with a pointer to a specialist. This echoes the current FAQ.
10. **How to get a quote:** free audit, then proposal; state the turnaround.
11. **FAQs:** Do you take a percentage of ad spend? Performance-linked fees? Is there a pilot? Is GST extra? Do you work per enquiry for education? Can we pause in off-season?
12. **Schema:** WebPage, FAQPage (visible questions only) and Service with Offer / PriceSpecification (`priceCurrency: INR`, `minPrice`, `unitText: MONTH`) matching the visible table exactly.
13. **Links:** to the Meta Ads service page, the relevant calculators (break-even ROAS, LTV:CAC, unit economics) and the cost guides below.

### 7e. (b) India-specific "how much does X cost" guides MMC can write credibly
Common template, adapted from WebFX but with evidence rules:
- **Headline and date:** H1 "How much does X cost in India? (2026)", with a visible "Last reviewed" date equal to `dateModified`. Refresh or drop the year annually.
- **Opening:** answer-first range with the source named in the same paragraph, then a "What you're actually paying for" table (platform spend / agency fee / production / tools / GST).
- **Body:** a pricing-models table (how it works, suits whom, watch-outs), cost drivers, and a "What MMC charges" box linking to `/pricing` (no proof stats).
- **FAQs** as visible questions with FAQPage schema.
- **Sources and method:** every external figure linked with an access date. If MMC's own anonymised data is used, give count, period, definitions and reviewer. Market prices are inputs and do not count as client results, but any MMC aggregate still needs sign-off.
- **Byline:** named practitioner author plus a practitioner reviewer, not sales.
- **Schema:** Article and FAQPage; Dataset only when MMC publishes an actual dataset.

| # | Working title | Queries | What MMC can say without client results | Figures that need sourcing | Links to |
|---|---|---|---|---|---|
| 1 | Performance marketing agency fees in India: retainer vs % of ad spend vs hybrid | "performance marketing agency fees India", "digital marketing agency retainer India" | How each model works and its incentives; what a retainer should include; red flags (hidden markups, platform fees, lock-ins without exit); MMC's published tiers as a worked example with effective % at band edges | Typical Indian retainer ranges and % of spend norms (not WebFX's US 10-20%); GST rate on agency services (18% commonly applied; confirm with CA); any competitor fee claims, including the "₹15L+" line | /pricing, Meta Ads page, unit-economics calculator |
| 2 | How much does Meta ads management cost in India? | "Meta ads agency cost India", "Facebook ads management charges" | Split between ad spend, management fee and creative; what 30 vs 60-80 vs 120+ creatives a month means operationally; MMC tiers; how to size a test budget in principle | Meta's minimum daily budget in INR (Meta Business Help Centre); GST on Meta ad invoices for Indian advertisers; any CPM, CPC or CPL ranges for India (third-party benchmark reports, dated; or MMC aggregate data with method and sign-off, never presented as a promise) | Meta Ads page, break-even ROAS and funnel ROAS calculators |
| 3 | How much does a Shopify website cost in India? | "Shopify website cost India", "Shopify store development charges" | Line items (plan, theme, apps, payment gateway, domain, design, development, migration, maintenance); DIY vs freelancer vs agency trade-offs; what MMC's Shopify development includes, quoted after scoping | Shopify plan prices in INR and transaction fees (shopify.com/in/pricing); payment gateway rates (Razorpay / PayU / Cashfree pricing pages); theme and app prices (Shopify Theme Store / App Store); development ranges (MMC's own signed-project floors, or a dated public source) | Shopify development page, /pricing |
| 4 | UGC video cost in India: per video, per creator and monthly retainers | "UGC video cost India", "UGC creator rates" | What drives the fee (creator tier, usage rights, whitelisting or partnership ads, raw vs edited, reshoots); how MMC structures UGC inside creative retainers (the Meta page already says "UGC · 50% of volume") | Creator fee ranges (creator platforms' public rate cards, or MMC's aggregated creator invoices with count and period); usage-rights premiums; ASCI influencer/UGC disclosure guidelines (verify current version) | UGC content service page, Meta Ads page |
| 5 | Education lead generation in India: what a cost per enquiry depends on | "cost per lead education India", "admissions lead generation cost" | Definitions (enquiry vs verified lead vs application vs admission); drivers (course fee, city tier, admissions season, channel mix, lead verification); budgeting by funnel stage; MMC's engagement models; an explicit "no one can guarantee a CPL" statement | Any CPL or cost-per-enquiry ranges by course or channel (dated benchmark reports); education portal listing fees (verify publicly); ASCI and any regulator advertising norms for education (verify); admissions calendar assumptions | Education industry page, /pricing |
| 6 | Influencer marketing cost in India: nano to celebrity | "influencer marketing cost India", "Instagram influencer rates India" | Pricing models (per post, per campaign, barter plus fee, affiliate); what an agency fee covers (discovery, contracts, briefs, compliance, reporting); MMC's model | Rate ranges by follower tier (dated third-party reports or platform rate cards); ASCI disclosure rules (verify); GST and TDS treatment of creator payments (confirm with CA) | Influencer marketing service page |
| 7 | Retention marketing cost in India: email, WhatsApp and agency fees | "WhatsApp marketing cost India", "Klaviyo pricing India", "retention agency cost" | Tool cost vs management cost; list size and message volume as drivers; what MMC's retention service includes | WhatsApp Business Platform per-message pricing for India (Meta's published rate card, which changes; date it); Klaviyo plan prices by list size (klaviyo.com/pricing, USD); BSP / partner markups | Retention marketing page, LTV:CAC calculator |
| 8 (defer) | Quick-commerce ads cost in India (Blinkit, Zepto, Instamart) | "Blinkit ads cost" | Ad formats and billing models only | Most rate cards and minimums are not public; high risk of unsourced numbers. Write only once public sources exist | Quick commerce page |

Every guide should also get a short "Sources and assumptions" box. Cost guides must not carry outcome claims ("brands see 3× ROAS"), even as averages.

---

## Files
- Analysis: `analysis/webfx-pricing.md` (this file)
- Scripts: `analysis/scripts/extract_pricing.py`, `analysis/scripts/service_pricing_blocks.py`, `analysis/scripts/service_pricing_dedup.py`
- Data outputs: `analysis/webfx-pricing-inventory.json`, `analysis/webfx-pricing-inventory.tsv`, `analysis/webfx-service-pricing-blocks.txt`, `analysis/webfx-service-pricing-dedup.txt`

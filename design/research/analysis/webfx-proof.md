# WebFX proof audit: portfolio, case studies, results and reviews

**Prepared for:** Monday Marketing Company (MMC) website proof strategy
**Competitor:** WebFX (webfx.com), live-site corpus collected 15 Sep 2026
**Slice:** `/portfolio/` hub, `/portfolio/case-studies/` index, `/portfolio/design-portfolio/`, all 55 individual case study pages, `/about/results/`, `/about/reviews/`. Sitewide proof devices (rating badges, satisfaction/retention tiles, revenue counters) were traced across all 429 corpus pages only where they bear on proof credibility.

**Method**
- `scripts/extract_cases.py` parses every case study JSON: header facts (industry, tenure, strategies), H1, hero stats, results stats, before/after, approach sub-sections, quotes and their attribution lines, team and "hours dedicated", timeframe words, baseline patterns ("from X to Y"), absolute numbers, spend and attribution-method vocabulary, video schema, publish/modify dates. It also matches each page to its index card (industry, company size, B2B/B2C/Split, services, technologies, headline metric). Outputs: `data/webfx_cases.json`, `data/webfx_cases.csv`, `data/extract_summary.txt`.
- `scripts/make_inventory.py` builds the section 1 table. `scripts/claims_sitewide.py` and `scripts/claims_context.py` trace aggregate claims (revenue counter, review counts, satisfaction/retention/NPS tiles) across all pages. `scripts/crosscheck.py` checks old-brand quotes, whether the anonymised metrics can be traced to named cases, video presence and spend disclosure.
- **Read in full (27 case studies):** Calhoun, Mount Wachusett Community College, URAC, KOA, Marketview Liquor, The Roof Detective, Merrimack Valley Psychological Associates, York Saw & Knife, The Difference Card, CenTrak, Kent County Tourism, PaulB Parts, Northside Towing, Cleveland Brothers, Hurst Pediatric Dentistry, HydroWorx, Beiler's Sawmill, Enabling Devices, Resource Furniture, Coquí el Original, Hayward Turnstiles, Ryan Amato Painting, Maryland Sunrooms, Record Head, Thompson Tractor, All Pro Trailer Superstore, StockWise Auto. Together they cover manufacturing, education, healthcare, hospitality/franchise, ecommerce, home and local services, SaaS, finance, tourism, Amazon, GEO/AI search, web design, email and social.
- Caveat: the corpus holds page text, schema and media counts, not the images themselves. So "screenshots" cannot be confirmed visually. No case study body text refers to a screenshot or chart. "Dashboard" (6 mentions) and "reporting" (12) appear only as capability claims. One caption-like line in Thompson Tractor ("Non-branded AI visibility for Thompson Tractor") suggests a chart image.

---

## Executive summary

WebFX wins on **volume, structure and ubiquity** of proof. There are 55 named case studies, filterable by industry, business model, service, size and technology. A revenue counter sits in the site header. Rating badges and satisfaction tiles appear on 100+ service pages, along with 1,100+ "reviews", named team members and hours logged. It feels overwhelming, and that is the point.

Look closely and almost none of it can be checked:

- **167 of 180** stat-block metrics are percentage changes. **1 of 55** case studies gives any start value, and that is keyword count, not an outcome.
- **25 of 55** state no measurement period at all.
- **0 of 55** disclose ad spend, budget or fee.
- **0 of 168** quotes carry a person's name. Only 2 carry even a role.
- The aggregate figures are undefined, unsourced and sometimes contradict each other. Examples: review counts of 550 / 700 / 860 / 1,100+ / "thousands"; a "488%" claim that is misdescribed three different ways; unsourced "industry averages".
- There are visible production errors: a "321% decrease in cost per lead", a community college case describing "campgrounds and camping" keywords, and headlines promising enrolments or revenue that the page never measures.

MMC cannot match WebFX's volume, and doesn't need to. The opening is to be **the agency whose numbers survive scrutiny**: every figure defined, dated, based, spend-contextualised and client-approved. The four published figures should carry their own method notes.

---

## 1. Proof inventory

55 case study pages: 53 appear on the index, and 2 are orphans reachable only by URL (Hayward Turnstiles, Ryan Amato Painting).

**Distribution**
- **Business model (53 index cards):** 26 B2B, 19 B2C, 8 Split.
- **Industries:**
  - Manufacturing 10 (+1 Manufacturing + Ecommerce)
  - Home services 8
  - Ecommerce 7
  - Leisure/travel/food 5
  - Heavy equipment 4
  - Retail (store) 4
  - Transport/logistics 3
  - SaaS, professional services, healthcare, education/info and real estate, 2 each
  - Finance/insurance 1
- **Services tagged:** SEO 53, PPC 28, Local SEO 13, Web design 13, Social 13, GEO 7, Content 6, CRO 4, Email 3, Web dev 2, Amazon 1, YouTube 1, Review management 1, Maintenance 1.
- **Company size:** 11–50 employees 21, 51–200 15, 1–10 6, 201–500 5, 501–1K 1, 1K–5K 3, N/A or blank 4. The book is SMB and mid-market.
- **Ecommerce-tagged cases:** 8. **Cases with a ROAS metric:** 1 (Marketview Liquor, "67% increase in ROAS", with the ROAS value itself never given). WebFX's proof is SEO-centric. It barely evidences performance or paid-social ecommerce, which is MMC's core.

Column notes:
- "Headline metric" is the stat shown on the index card.
- "Timeframe stated" counts metric labels carrying YoY/MoM/QoQ/"6 months", plus any dated period in the prose. "Client since" years are excluded because they don't define a measurement window.
- "Baseline" means a start value for any metric.
- Quote attribution types: *company name* (the line under the quote is just the client's name), *none*, or *role only*. No quote on any page carries a person's name.
- Media: see the screenshot caveat above.

<div style="overflow-x:auto">

| # | Client | Industry | Model / size | Services | Headline metric (index card) | All distinct stat-block metrics | Timeframe stated | Baseline | Quotes (attribution types) | Video | Tenure shown | Hours shown |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 10X Engineered Materials | Manufacturing + Ecommerce | B2B/ecommerce / 11 – 50 | SEO, GEO | 37% INCREASE IN TOTAL AI ANSWERS APPEARANCES | 37% +Total AI Answers Appearances; 48% Higher Visibility Than Closest Competitor; 125% +Overall AI Overview Visibility; 229 Content Syndications For Seed Content Article | **none** | N | Y 3 (company name) | video element ×3, unnamed | Client since 2023 | 3,365+ |
| 2 | All Pro Trailer Superstore | Heavy equipment | B2C / N/A | SEO, Email | 113% INCREASE IN SEO CONVERSIONS | 113% +SEO Conversions; 50% +SEO Conversion Rate; 600% +Leads From Email Marketing; 46% +SEO Users; 948% +Web Visits From Email | **none** | N | Y 4 (company name; none) | Y: testimonial video | Client since 2018 | 3,050+ |
| 3 | ALL-TEST Pro | Manufacturing | B2B / 11 – 50 | SEO, PPC, CRO | 71% INCREASE IN CONTACT FORM SUBMISSIONS | 71% +Contact Form Submissions; 30% −PPC Cost Per Lead; 25% +Leads From Organic Forms | **none** | N | Y 4 (company name; none) | N | 3.6 Years | 530+ |
| 4 | Area Flooring & Tile Inc. | Home services | Split / 1 – 10 | SEO | 51% INCREASE IN NEW USERS YOY | 51% +New Users YoY; 50% +New Sessions YoY | YoY on 2/2 | N | Y 4 (company name; none) | N | 3.8 Years | 380+ |
| 5 | Asbury Electric | Home services | Split/local / 11 – 50 | LocalSEO, SEO, PPC | 50% YOY INCREASE IN IMPRESSIONS FROM LOCAL SEO | 50% YoY +Impressions From Local SEO | YoY on 1/1 | N | Y 2 (company name) | N | Client since 2024 | 502+ |
| 6 | Bar's Products, Inc | Ecommerce | Split/ecommerce / 11 – 50 | SEO, PPC, Content | 53% INCREASE IN GOAL COMPLETIONS | 53% +Goal Completions; 44% +Goal Conversion Rate; 52% +Site Traffic; 49% +Paid Goal Completions; 37% +Visitors From Organic Search; 53% +Conversions | **none** | N | Y 3 (company name; none) | N | 4.5 Years | 125+ |
| 7 | Beiler's Sawmill | Retail (store) | B2B/local / 11 – 50 | SEO, PPC | 78% INCREASE IN LEAD FORM SUBMISSIONS IN FIRST 6 MONTHS | 78% +Lead Form Submissions In First 6 Months; 337% +Calls From PPC Ads; 24% +Phone Calls In First 6 Months; 583% +Form Submissions From Google Ads; 23% +Form Submissions From Social Media; 75% +Phone Calls From Social Media | 6 mo on 2/6; prose: IN FIRST 6 MONTHS | N | Y 1 (company name) | N | Client since 2023 | 500+ |
| 8 | Boss Mechanical Inc. | Home services | B2C/local / 11 – 50 | SEO, PPC | 70% DECREASE IN ORGANIC COST PER LEAD (CPL) | 70% −Organic Cost Per Lead (CPL); 65% +Total Leads; 89% +Keyword Rankings On Page 1 | **none** | N | Y 4 (company name; none) | N | Client since 2022 | 150+ |
| 9 | Bruni and Campisi Plumbing | Home services | B2C/local / 51 – 200 | SEO, PPC, Content | 524% INCREASE IN AD CLICKS | 524% +Ad Clicks; 321% +Goal Completions; 2X +SEO Conversions; 10+ Page +SEO Rankings; 10,000 Youtube Pre-Roll Ad Views; 42X +Facebook Traffic | **none** | N | Y 2 (company name; none) | N | 9.9 Years | 330+ |
| 10 | Calhoun Super Structure | Manufacturing | B2B / 51 – 200 | SEO, PPC | 210% INCREASE IN ONLINE LEAD CONVERSIONS | 210% +Online Lead Conversions; 30% ROI Increase From SEM; 74% +Users; 21% −Bounce Rate | **none** | N | Y 3 (company name; none) | N | Client since 2021 | 1,795+ |
| 11 | CEMB USA | Heavy equipment | B2B / 11 – 50 | SEO | 130% INCREASE IN TOTAL RANKING KEYWORDS | 130% +Total Ranking Keywords; 31% +Organic Leads; 30% −Cost Per Lead | **none** | N | Y 4 (company name; none) | N | Client since 2023 | 256+ |
| 12 | Centrak | SaaS | B2B / 201 – 500 | SEO, PPC, Maint. | 90% DECREASE IN PPC COST PER LEAD | 90% −PPC Cost Per Lead; 11% +Organic Sessions YoY; 10% +Organic Contact Form Submissions YoY | YoY on 2/3; prose: year over year | N | Y 2 (company name; none) | N | Client Since 2016 | 585+ |
| 13 | CH Reed | Manufacturing | B2B/local / 51 – 200 | SEO, LocalSEO | 30% INCREASE IN ORGANIC GOAL COMPLETIONS YOY | 30% +Organic Goal Completions YoY; 40% +Organic Traffic YoY | YoY on 2/2 | N | Y 2 (company name; none) | Y: testimonial video | Client Since 2018 | 230+ |
| 14 | Cleveland Brothers Equipment Company | Heavy equipment | B2B / 1K – 5K | SEO, WebDesign, WebDev | 1 HORIZON INTERACTIVE AWARD | 1 Horizon Interactive Award; 82% +Organic Traffic | **none** | N | Y 1 (company name) | N | 14.1 Years | 2,000+ |
| 15 | Coqui el Original | Ecommerce | B2C/ecommerce / 11 – 50 | SEO | 109% INCREASE IN SEO REVENUE YOY | 109% +SEO Revenue YoY; 215% +Site Sessions YoY; 139% +Organic Search Sessions YoY | YoY on 3/3; prose: quarter, year-over-year | N | Y 4 (company name; none) | N | Client Since 2020 | 775+ |
| 16 | Diamond Event & Tent | Leisure/travel/food | B2C/local / 51 – 200 | SEO, PPC, Social, LocalSEO | 135% INCREASE IN GOOGLE ADS CONVERSIONS | 135% +Google Ads Conversions; 307% +Organic Sessions | **none** | N | Y 4 (company name; none) | N | Client Since 2019 | 965+ |
| 17 | Enabling Devices | Ecommerce | B2B/ecommerce / 11 – 50 | SEO, GEO | 542% INCREASE IN LEADS FROM AI/OMNISEO | 542% +Leads From AI/OmniSEO; 385% +AI Overview Visibility; 105% +Total AI Visibility; 146% More Visibility Than Next Closest Competitor; 56% Coverage For 49 Unique AI Questions Across 10 AI Answer Engines | **none** | N | N | N | Client since 2018 | 1,500+ |
| 18 | Enduric Plumbing Services, Inc. | Home services | Split / 1 – 10 | SEO, WebDesign | 120% INCREASE IN FORM LEADS YOY | 120% +Form Leads YoY; 303% +Organic Sessions YoY | YoY on 2/2 | N | Y 4 (company name; none) | N | Client since 2021 | 955+ |
| 19 | ExpressIT Delivery | Transport/logistics | B2B/local / 51 – 200 | SEO, PPC, Social, CRO, LocalSEO | 74% INCREASE IN PPC LEADS YOY | 74% +PPC Leads YoY; 232% +Organic Website Visits YoY; 109% +Blog Traffic | YoY on 2/3 | N | Y 4 (company name; none) | N | Client Since 2020 | 660+ |
| 20 | Golden Meadows Retrievers | Retail (store) | B2C/local / N/A | SEO, LocalSEO, WebDesign | 105% INCREASE IN ORGANIC FORM SUBMISSIONS YOY | 105% +Organic Form Submissions YoY; 103% +Information Request Forms; 48% +Organic Traffic YoY | YoY on 2/3 | N | Y 1 (company name) | N | 2.5 Years | 121+ |
| 21 | Great Northern Corporation | Manufacturing | B2B / 1K – 5K | SEO, PPC | 109% INCREASE IN ORGANIC TRAFFIC YOY | 109% +Organic Traffic YoY; 103% +Organic Form Submissions; 31% +Form Submissions From Paid Traffic | YoY on 1/3 | N | Y 5 (company name; none) | N | Client since 2020 | 1,150+ |
| 22 | Hayward Turnstiles *(not on index)* | "Outdoor Structures" (sic; turnstile maker) | B2B (from page text) | SEO, PPC, RevenueCloudFX | 2,319% ROI FROM PPC (hero) | 2,319% ROI From PPC; 583% YoY +Revenue Won From PPC; 51% YoY Traffic Increase From PPC | YoY on 2/3 | N | Y 3 (company name; none) | N | Client since 2023 | 450+ |
| 23 | Healthcare Administrative Partners | Prof. services | B2B / 201 – 500 | SEO, Social | 63% INCREASE IN ORGANIC SESSIONS | 63% +Organic Sessions; 7% +Email Subscribers | prose: year-over-year | N | Y 5 (company name; none) | N | Client Since 2015 | 655+ |
| 24 | Hurst Pediatric Dentistry | Healthcare | B2C/local / 1 – 10 | SEO, LocalSEO | 540% INCREASE IN LEADS FROM ORGANIC SEARCH | 3872% +Sessions From SEO; 540% +Leads From Organic Search | **none** | N | Y 3 (company name; none) | N | Client since 2020 | 200+ |
| 25 | HydroWorx | Manufacturing | B2B / 11 – 50 | SEO, PPC, Social, WebDesign | 236% INCREASE IN ORGANIC SESSIONS | 236% +Organic Sessions; 131% +Organic Contact Form Submissions | **none** | N | Y 2 (company name; none) | Y: testimonial video | 8.9 Years | 380+ |
| 26 | IGX Solutions | SaaS | B2B / 11 – 50 | SEO, GEO | 53% INCREASE IN TOTAL BRAND APPEARANCES IN RELEVANT AI CHATBOT QUERIES | 53% +Total Brand Appearances In Relevant AI Chatbot Queries; 30% +Branded Mentions For Unique AI Queries; 6 Leads Within 6 Months Where AI Channels Assisted Organic | 6 mo on 1/3 | N | Y 1 (role only ("Marketing Manager")) | N | Client since 2022 | 4,445+ |
| 27 | Kampgrounds of America, Inc. | Leisure/travel/food | B2C / 501 – 1K | SEO, PPC, Content | 260% INCREASE IN ORGANIC REVENUE | 260% +Organic Revenue; 198% +Organic Transactions; 160% +New Users From Organic Traffic; 150% +Organic Traffic; 15% +Organic Conversion Rate | prose: in a few months | N | Y 5 (company name; none) | N | Client since 2014 | 750+ |
| 28 | Kent County Tourism Corporation | Leisure/travel/food | B2C / 201 – 500 | Social, YouTube, SEO, PPC, Email | 630% INCREASE IN E-NEWSLETTER SIGN-UPS VIA SOCIAL ADVERTISING | 630% +E-Newsletter Sign-Ups Via Social Advertising; 267% +Visitor Guide Requests Via Social Ads; 167% +Contact Form Submissions Via Social Advertising; 109% +Ad Click-Through Rate (CTR); 82% Improvement In Cost Per Lead With Conversions API; 49% +New Users | **none** | N | Y 4 (company name; none) | N | Client since 2019 | 995+ |
| 29 | Marketview Liquor | Ecommerce | B2C/ecommerce/local / 51 – 200 | SEO, LocalSEO, PPC, Social, ReviewMgmt | 95% INCREASE IN REVENUE | 95% +Revenue; 67% +ROAS; 10% +Site Conversion Rate | **none** | N | Y 3 (company name; none) | N | Client since 2015 | 1,629.5+ |
| 30 | Maryland Sunrooms | Retail (store) | B2C / 11 – 50 | SEO, PPC, Content, WebDesign | 670% INCREASE IN CONVERSIONS FROM PAID ADS | 670% +Conversions From Paid Ads; 327% +Website Sessions; 321% −Cost-Per-Lead (CPL) | **none** | N | Y 5 (company name; none) | N | 3.2 Years | 960+ |
| 31 | Merrimack Valley Psychological Associates | Healthcare | B2C/local / 11 – 50 | SEO, LocalSEO, Social, WebDesign | 2X REVENUE IN 6 MONTHS | 2X Revenue In 6 Months; 6 New Team Members Added | 6 mo on 1/2; prose: in the 14 months, six months | N | Y 5 (company name; none) | N | Client Since 2020 | 510+ |
| 32 | Mount Wachusett Community College | Education/info | B2C / 201 – 500 | SEO, PPC, Social | 205% INCREASE IN SOCIAL AD IMPRESSIONS | 205% +Social Ad Impressions; 200% +Paid Ad Conversions; 67% +Social Conversions; 25% +SEO Sessions | **none** | N | Y 5 (company name; none) | N | Client Since 2020 | 1,465+ |
| 33 | Net Friends | Prof. services | B2B / 51 – 200 | SEO, PPC | 96% INCREASE IN ORGANIC SESSIONS YOY | 96% +Organic Sessions YoY; 2X +Website Traffic And Leads | YoY on 1/2 | N | Y 5 (company name; none) | N | 1 Year | 215+ |
| 34 | Northside Towing | Transport/logistics | B2B/local / 1 – 10 | SEO, LocalSEO, PPC | 5X (435%) INCREASE IN ROI FROM GOOGLE AD SPEND | 5X (435%) +ROI From Google Ad Spend; 93% +Organic Traffic YoY; 72% +Calls | YoY on 1/3 | N | Y 4 (company name; none) | N | Client since 2020 | 380+ |
| 35 | Ocean City NJ | Leisure/travel/food | B2C / 11 – 50 | SEO, WebDesign, WebDev | 40% INCREASE IN CONVERSION RATE | 40% +Conversion Rate; 87% +Overall Website Visits; 41% +Time On Site; 129% +Page Views; 11% −Bounce Rate | **none** | N | Y 1 (company name) | N | Client Since 2011 | 375+ |
| 36 | PaulB Hardware | Ecommerce | B2C/ecommerce/local / 51 – 200 | SEO, PPC, LocalSEO | 150% YOY ROI INCREASE | 150% YoY ROI Increase; 75% YoY Conversion Rate Increase; 23% YoY Cost Per Lead Decrease | YoY on 3/3 | N | Y 3 (company name; none) | N | 4.6 Years | 79+ |
| 37 | Polymer Solutions International, Inc. | Manufacturing | B2B / 11 – 50 | SEO, PPC | 126% INCREASE IN YOY PAID SEARCH QUOTE REQUEST CONVERSIONS | 126% +YoY Paid Search Quote Request Conversions; 22% +YoY Organic Traffic; 18% +YoY Organic Quote Submissions | YoY on 3/3 | N | Y 2 (company name; none) | N | 6.6 Years | 480+ |
| 38 | PowerGistics | Manufacturing | B2B / 51 – 200 | SEO, PPC | 77% YOY INCREASE IN ORGANIC SEARCH SESSIONS | 77% YoY +Organic Search Sessions; 19% YoY +Organic Product Page Views | YoY on 2/2; prose: year-over-year | N | Y 4 (company name; none) | N | Client since 2021 | 1,300+ |
| 39 | Property Management, Inc. (PMI) | Real estate/constr. | Split/local / 201 – 500 | SEO | 88% INCREASE IN ORGANIC PAGES PER SESSION | 88% +Organic Pages Per Session | **none** | N | Y 3 (company name; none) | N | Client since 2016 | 200+ |
| 40 | RC Mowers | Manufacturing | B2B / 11 – 50 | SEO, GEO | 1,164% INCREASE IN TRAFFIC FROM AI SOURCES | 1,164% +Traffic From AI Sources; 500% +Core Conversions From AI Sources; 110% Higher Visibility Than Closest Competitor; 47% +Total AI Appearances Since The Start Of The Campaign | **none** | N | N | N | Client since 2023 | 2,590+ |
| 41 | Record Head | Retail (store) | B2C/local / 1 – 10 | SEO, LocalSEO | 242% INCREASE IN ORGANIC SESSIONS | 242% +Organic Sessions; 249% +Organic Users; 257% +Organic New Users | **none** | Y (keywords 3,000→34,000 only) | Y 2 (company name; none) | N | Client since 2016 | 1,090+ |
| 42 | Resource Furniture | Ecommerce | Split/ecommerce / 11 – 50 | SEO, Content | 217% INCREASE IN MOM SEO FORM COMPLETIONS | 217% +MoM SEO Form Completions; 217% +MoM SEO Quote Requests; 108% +MoM SEO Showroom Appointments | MoM on 3/3; prose: year-over-year | N | Y 4 (company name; none) | N | 6.2 Years | 1,600+ |
| 43 | Reynolds Restoration Services | Home services | Split / 51 – 200 | SEO, PPC, CRO, Content, WebDesign | 71% YOY ORGANIC CONTACT FORM SUBMISSION INCREASE | 71% YoY Organic Contact Form Submission Increase; 43% YoY Organic Traffic Increase | YoY on 2/2 | N | Y 3 (company name; none) | N | Client Since 2008 | 333+ |
| 44 | Ryan Amato Painting *(not on index; older layout)* | Home services (painting) | B2C/local (from page text) | SEO, LocalSEO, PPC, Social ads | 125% INCREASE IN ORGANIC TRAFFIC (hero) | 125% +Organic Traffic; 120% +SEO Leads; 60% +Local Traffic; 120% +Local SEO Lead; 60% +Local Traffic To Website; 28% +PPC Clicks | **none** | N | Y 4 (none) | brand video only | not stated | not shown |
| 45 | S. Clyde Weaver | Leisure/travel/food | B2C/local / 51 – 200 | SEO, LocalSEO, PPC, Social, WebDesign | 136% INCREASE IN GROSS ECOMMERCE SALES YOY | 136% +Gross Ecommerce Sales YoY; 10,000 Social Media Followers | YoY on 1/2; prose: year over year | N | Y 3 (company name; none) | N | Client since 2019 | 2,400+ |
| 46 | SelectROW | Real estate/constr. | B2B / 51 – 200 | SEO, PPC, WebDesign | 300% YOY INCREASE IN PPC LEAD FORMS | 300% YoY +PPC Lead Forms; 126% YoY +Organic SEO Traffic | YoY on 2/2 | N | Y 3 (company name; none) | N | Client since 2020 | 485+ |
| 47 | Sharretts Plating Co., Inc. | Manufacturing | B2B / 11 – 50 | SEO, WebDesign, Social | 60% INCREASE IN QUOTE REQUESTS | 60% +Quote Requests; 270% +Organic Traffic | **none** | N | Y 3 (company name; none) | video element ×1, unnamed | Client since 2008 | 188+ |
| 48 | Soundproof Cow | Home services | Split / 11 – 50 | SEO, PPC, WebDesign, Social | 41% YOY INCREASE IN PAID SEARCH ECOMMERCE CONVERSION RATE | 41% YoY +Paid Search Ecommerce Conversion Rate; 11% YoY +Paid Search Revenue | YoY on 2/2; prose: year-over-year | N | Y 1 (company name) | N | Client since 2016 | 2,370+ |
| 49 | Stockwell International | Transport/logistics | B2B / 11 – 50 | SEO | 885% INCREASE IN SEO TRAFFIC | 885% +SEO Traffic; 473% +Clicks | **none** | N | Y 5 (company name; none) | N | 8 Months | 120+ |
| 50 | Stockwise Auto | Ecommerce | B2C/ecommerce / 1 – 10 | SEO | 163% YOY INCREASE IN ORGANIC USERS | 163% YoY +Organic Users; 57% YoY +Organic Revenue; 48% YoY +Organic Transactions | YoY on 3/3; prose: Year-over-year, year-over-year | N | Y 2 (company name; none) | N | 1.2 Years | 340+ |
| 51 | The Difference Card | Finance/insurance | B2B / 51 – 200 | SEO, Social, PPC, CRO, WebDesign | 77% YOY INCREASE IN PRODUCER PROPOSAL REQUESTS | 77% YoY +Producer Proposal Requests; 31.6% +Traffic To Service Pages; 84% YoY +Revenue Attributed To Digital Marketing; 43.1% YoY +Organic Sessions | YoY on 3/4; prose: December 2025, January 2026 | N | Y 4 (company name; none) | N | Client since 2020 | 3,000+ |
| 52 | The Roof Detective | Home services | B2C/local / 11 – 50 | SEO, LocalSEO, GEO | 18.6x REVENUE GROWTH | 18.6x Revenue Growth; 18% +Qualified Leads; 94% −Cost Per Lead | **none** | N | Y 4 (company name; none) | N | (no tenure; meeting cadence: Monthly) | 280 |
| 53 | Thompson Tractor | Heavy equipment | B2B/local / 1K – 5K | GEO, SEO | 586% INCREASE IN TRAFFIC FROM GENERATIVE AI SOURCES | 586% +Traffic From Generative AI Sources; 500% +Leads Driven From AI Platforms; 136% +Visibility In Google AI Overviews; 116% Higher Visibility In LLMs Than Closest Competitor; 38% Avg +SEO Leads YoY; 51 Placements Gained In June MoM | YoY on 1/6; MoM on 1/6; prose: January 2025 | N | Y 2 (company name; role only ("Marketing Manager")) | Y: testimonial video | Client since 2018 | 3,500+ |
| 54 | URAC | Education/info | B2B / 51 – 200 | SEO, GEO | 188% INCREASE IN TRAFFIC FROM AI CHANNELS | 188% +Traffic From AI Channels; 95% Visibility For Tracked AI Questions; 70% Higher Visibility Than Closest Competitor; 62% +Traffic From AI Channels QoQ; 15% +Total AI Answer Appearances | QoQ on 1/5 | N | Y 1 (none) | N | Client since 2021 | 887+ |
| 55 | York Saw & Knife Co., Inc. | Manufacturing | B2B / 51 – 200 | SEO, PPC, Email, Social, Amazon | 2118% YOY INCREASE IN REVENUE FROM AMAZON ADS | 2118% YoY +Revenue From Amazon Ads; 626% YoY +Amazon Sales; 442% YoY +Amazon Units Ordered; 138% YoY +Organic Sessions; 108% YoY +Google Ads Conversions; 20% YoY −Cost Per Conversion | YoY on 6/6 | N | Y 3 (company name; none) | N | 4 Years | 700+ |

</div>

---

## 2. Case study template

### Section order (current template, 53 of 55 pages)

| # | Section | What it does | Formula level |
|---|---|---|---|
| 1 | **Header strip**: INDUSTRY · TENURE ("Client since 2014" on 38 pages; "4.6 Years" style on 14; "Meeting cadence: Monthly" instead on The Roof Detective) · ONGOING STRATEGIES · (Additional Support From) · BUSINESS TECHNOLOGIES | Instant relevance filter: "someone like me, for the service I want, for years". | Rigid |
| 2 | **H1** "How [Client] [verb] with WebFX". 7 H1s carry a number: all six GEO/OmniSEO cases plus The Roof Detective. The meta title often differs from the H1 (e.g. "A Solid SEO Foundation: Calhoun Super Structure and WebFX"). | Outcome promise plus brand/product plug (OmniSEO®). | Rigid |
| 3 | **Intro paragraph**, often boilerplate: "Discover how … Explore the targeted solutions that powered this impressive growth and learn how digital marketing can transform your [business/practice/institution]." | SEO copy and a skim summary. | Copy-paste across MWCC, Merrimack, Northside, PaulB, Hurst, Coquí, Kent County, CenTrak, Cleveland Brothers… |
| 4 | **Hero stat trio**: 126 of 133 hero stats are % changes. | The claim itself. | Rigid |
| 5 | **Hero quote**, attributed to a company name or nothing. | Client voice beside the number. | Rigid |
| 6 | **Before WebFX / After WebFX**, 3 bullets each (53 of 55). | Qualitative problem→state change. No numbers. | Generic phrasing recurs, e.g. "Underutilized digital marketing strategies hindering [X] growth" (MWCC, Merrimack, Northside, PaulB, Maryland Sunrooms). |
| 7 | **About the client**, one paragraph. | Context and legitimacy (founded, locations, notable customers). | Rigid |
| 8 | **WebFX Approach**: three H3 "moves" (49 pages; 5 have two). Each is problem sentence → what WebFX did → vague effect, with quotes between. | Shows competence and method. | Very formulaic; tactics listed without dates, volumes or tests. |
| 9 | **#SeeingTheFX Results** (47) or "Results" (6): repeats the hero stats plus 0–3 more. | Scoreboard. | Rigid |
| 10 | **WebFX Team**: first name + department, and "N+ HOURS DEDICATED TO DRIVING RESULTS" (54 of 55). Median 655 hours, range 79+ (PaulB, "4.6 Years" tenure) to 4,445+ (IGX). | Humanises; implies resourcing. | Rigid |
| 11 | **Lead form** with budget dropdown ($1,500–5,000/month … $50,000+/month). | Conversion and price anchoring. | Rigid |
| 12 | **Related case studies**: cards from the same industry. | Keeps the buyer inside proof. | Rigid |

- **Length:** whole page median 819 words (range 590–1,288). Narrative from H1 to team: median 608 words (443–974). A two-minute read.
- **Metrics per study:** median 3 (range 1–6), 180 in total. **19 studies show two or fewer metrics.**
- **Quotes:** 168 across 53 pages. Enabling Devices and RC Mowers have none.
- **Older layout:** Ryan Amato Painting uses "Meet the business / The challenge / Strategic solutions / Services used / #SeeingTheFX", with results in prose. It is not on the index.

**How formulaic:** very. The template is a fill-in form: same headings, same stat-trio rhythm, same three-move approach, recycled sentences. The cost shows in production errors that a template makes easy (section 5).

### Three headline claims, verbatim
1. **"How The Roof Detective Grew its Revenue by 18.6x with AI Search & SEO."** No baseline, no period, no spend; the header shows "Meeting cadence: Monthly" instead of tenure. The same page claims "94% DECREASE IN COST PER LEAD" and "18% INCREASE IN QUALIFIED LEADS". An 18.6x revenue rise on 18% more qualified leads is left unexplained.
2. **"Thompson Tractor Grows Leads by 500% with AI Search Optimization Services Powered by OmniSEO®."** The stat behind it reads "500% INCREASE IN LEADS DRIVEN FROM AI PLATFORMS". That is a single, new, small-base channel, not total leads, which the same page puts at "38% AVG INCREASE IN SEO LEADS YOY".
3. **"Community College Boosts Enrollment with Help from WebFX."** No enrolment, application or inquiry number appears anywhere on the page. The metrics are "205% INCREASE IN SOCIAL AD IMPRESSIONS", "200% INCREASE IN PAID AD CONVERSIONS", "67% INCREASE IN SOCIAL CONVERSIONS" and "25% INCREASE IN SEO SESSIONS".

Honourable mentions: "How WebFX Helped a Sunroom Company Exceed Their Revenue Goals" (no revenue metric; stat block includes "321% DECREASE IN COST-PER-LEAD (CPL)"), and "3872% INCREASE IN SESSIONS FROM SEO" (Hurst Pediatric Dentistry, no base).

---

## 3. Metrics vocabulary

### Frequency ranking (180 distinct stat-block metrics across 55 pages)

| Rank | Outcome family | Metric instances | Pages using it | Index headline cards (53) | Typical labels |
|---|---|---|---|---|---|
| 1 | **Traffic** (sessions, users, visits, pageviews) | 51 | 37 | 10 | "236% INCREASE IN ORGANIC SESSIONS", "163% YOY INCREASE IN ORGANIC USERS" |
| 2 | **Leads** (forms, calls, quote requests, appointments, sign-ups, goal completions) | 46 | 30 | **17** | "210% INCREASE IN ONLINE LEAD CONVERSIONS", "630% INCREASE IN E-NEWSLETTER SIGN-UPS VIA SOCIAL ADVERTISING" |
| 3 | **AI visibility / AI traffic** (GEO) | 20 | 6 | 6 | "1,164% INCREASE IN TRAFFIC FROM AI SOURCES", "95% VISIBILITY FOR TRACKED AI QUESTIONS" |
| 4 | **Visibility/engagement** (rankings, keywords, impressions, clicks, CTR, bounce) | 15 | 14 | 4 | "130% INCREASE IN TOTAL RANKING KEYWORDS", "524% INCREASE IN AD CLICKS" |
| 5 | **Conversions/transactions/units** | 12 | 10 | 3 | "198% INCREASE IN ORGANIC TRANSACTIONS" |
| 6 | **Revenue/sales** | 12 | 11 | 7 | "95% INCREASE IN REVENUE", "2118% YOY INCREASE IN REVENUE FROM AMAZON ADS" |
| 7 | **Cost per lead/conversion** | 9 | 9 | 2 | "90% DECREASE IN PPC COST PER LEAD" |
| 8 | **Conversion rate** | 7 | 7 | 2 | "41% YOY INCREASE IN PAID SEARCH ECOMMERCE CONVERSION RATE" |
| 9 | **ROI** | 4 | 4 | 2 | "150% YOY ROI INCREASE", "2,319% ROI FROM PPC" |
| 10 | **ROAS** | 1 | 1 | 0 | "67% INCREASE IN ROAS" |
| — | Other (awards, followers, pre-roll views, content syndications, placements, "6 new team members added") | ~10 | ~8 | 2 | "1 HORIZON INTERACTIVE AWARD" as Cleveland Brothers' headline |

### Framing
- **Percent change dominates:** 167/180 (93%). Of the rest, 5 are multipliers ("18.6x", "2X REVENUE IN 6 MONTHS", "42X INCREASE IN FACEBOOK TRAFFIC", "5X (435%)") and 8 are absolute counts, all trivial or input-type ("229 CONTENT SYNDICATIONS", "10,000 SOCIAL MEDIA FOLLOWERS", "6 LEADS WITHIN 6 MONTHS WHERE AI CHANNELS ASSISTED ORGANIC", "51 PLACEMENTS GAINED IN JUNE MOM").
- **No stat block anywhere shows absolute revenue, lead volume, CPL in currency, ROAS value or spend.** The only absolute business outcome in prose is The Difference Card: "assisted 293 closed-won deals worth $5.9M+ in revenue in December 2025 alone".
- **Ratios reported as % change of a ratio:** "67% increase in ROAS", "150% YoY ROI increase", "30% ROI increase from SEM". The reader cannot recover the ROAS/ROI value or how it is defined.
- **Channel slicing inflates percentages:** "from SEO", "from PPC", "from AI sources", "via social ads", "from email". Small new channels produce four-digit lifts (948% web visits from email, 1,164% AI traffic, 2118% Amazon ads revenue after launching the Amazon store with WebFX).
- **Time qualifiers:** 58/180 labels carry one. Mostly YoY; MoM on Resource Furniture (all three headline stats) and Thompson Tractor; QoQ on URAC; "first 6 months" on Beiler's; "in 6 months" on Merrimack.
- **Cost metrics are always framed as decreases.** One is arithmetically impossible: "321% DECREASE IN COST-PER-LEAD (CPL)" (Maryland Sunrooms).

---

## 4. Aggregate proof devices

| Device | Where / how often | Exact wording | Sourcing / footnote |
|---|---|---|---|
| **Revenue counter** | Site header link "REVENUE DRIVEN FOR OUR CLIENTS $10,085,355,239+" → `/about/results/` (H1). "$10 billion" phrasing on 123 pages; Organization schema description. | "$10,085,355,239+ Revenue Driven for Clients"; "generated over $10 billion in revenue for our clients over the past five years" | **None.** No definition of "revenue driven" (attributed? influenced? CRM-closed? tracked ecommerce?), no attribution model, no client count, no date stamp, no audit. False precision to the dollar, then "+". |
| Companion counters | Hub, results page, service pages | "24 million leads generated", "7.14 million calls", "210M Ecommerce Revenue Driven", "1,050+ websites designed", "93,969+ client mentions earned in LLMs" (hub) vs "94K" (home); "24,859,684 leads" (quote form); "14,936,451 ecommerce transactions in the last 5 years" (Amazon) | None. **Stale variants still live:** "$2.4 billion in revenue in the past five years" (analytics pricing) and "6.3 million leads and $2.4 billion" (data warehouse page). "$10B+ in ad spend" managed (digital advertising) reuses the $10B figure for a different quantity. On WebFX's own numbers, ecommerce revenue ($210M) is ~2% of "revenue driven", so the other ~98% is lead-gen or pipeline value by an undisclosed method. |
| **Results page** (`/about/results/`, 675 words) | H1 counter · "How We Do It" (Technology, Trackable Performance, Top-Rated Talent, Data Activation) · "Measurable Business Outcomes" tiles · carousel of 6 anonymised mini-cases (industry label, CHALLENGE, APPROACH bullets, one % stat) | "93% Client Satisfaction Rating", "150% INCREASE IN DIGITAL ROI" (Ecommerce – Tools and Hardware), "32% INCREASE IN INTEREST FORM LEADS" (Franchise), "600% INCREASE IN EMAIL LEADS" (Trucks & Trailers)… | Mini-cases don't link to the named cases. Cross-check: 150% matches PaulB, 260% KOA, 600% All Pro Trailer, 131% HydroWorx (but the named page says "organic contact form submissions", not "SEO leads YoY"), 53% Bar's Products. **"32% interest form leads" matches no case study.** "Trucks & Trailers" lists the challenge "Increase quote forms … through paid advertising" but an all-email approach. |
| **Reviews page** (`/about/reviews/`, 138 words) | Title "1,100+ WebFX Testimonials"; 8 embedded videos (one VideoObject in schema, "Relationship-Driven Digital Marketing", uploaded Jan 2020); categories (Customer Service, Design, Expertise, Social, Results, SEO, PPC, Technology); "Read Written WebFX Reviews" | "learn why our client recommendation score beats the industry average by 488%!"; "15% Avg Increase within 6 Months"; "Join 2K+ Companies Growing with WebFX" | No platform breakdown, no dates. "15% average increase" names no metric. No AggregateRating/Review schema. |
| **Review counts and ratings** | Sitewide badges | "1,100+ REVIEWS" (124 pages); "4.9/5 based on over 550 third-party reviews" (114 pages); "based on 860+ third-party reviews" (case study index, pricing, ~4 pages); "Verified from 700+ third-party reviews" and "#1 RATED AGENCY ON CLUTCH & G2" (home); "thousands of reviews" (case study index, Ryan Amato); "Clutch has personally interviewed more than 250 WebFX clients"; "Rated 4.9/5 stars on Clutch" (121 pages); G2 **"4.8/5" (92 pages) vs "4.9/5" (29 pages)** | Only footnote found sitewide: "*Ratings as of September 2024", on one listicle page. Clutch/G2/Capterra are linked in Organization `sameAs`, not next to the badges. The same snippet, "Flavia A, Review from Clutch.co", repeats on 93 pages. |
| **Satisfaction / retention / NPS tiles** | Service pages | "93% CLIENT SATISFACTION SCORE — Industry average: 72%" (119 pages); "91% RETENTION RATE — Industry average: 50%" (101); "78 NPS SCORE / HIGHER NPS® SCORE THAN — Industry average: 16" (95–98; the 78 is often missing from rendered text) | **No source, survey method, sample size or date for either WebFX's figure or the "industry average".** Elsewhere: "1.8X FASTER LEAD GROWTH THAN INDUSTRY AVERAGE"; RevenueCloudFX "Compare against industry averages based on 1500+ clients and extrinsic data". |
| **The "488%" number** | 21 pages | "client recommendation score that's 488% higher than the nationwide average"; "client satisfaction score of 93% — that's 488% higher than the national…"; "our 488% client satisfaction score" | Arithmetic: 78 ÷ 16 = 4.875, so NPS is **487.5% *of*** the cited average, i.e. ~388% *higher*. Applied to satisfaction (93 vs 72) it would be 29% higher. **One number, three incompatible descriptions, none correct.** |
| **Effort counters** | 54 case pages; industry pages | "N+ HOURS DEDICATED TO DRIVING RESULTS"; "INSIGHTS FROM 61,900+ HOURS OF HIGHER EDUCATION MARKETING EXPERIENCE", with the same 61,900+ labelled "TECHNOLOGY MARKETING EXPERIENCE" on the edtech page (9 pages); "48,000+ hours … home services" | Unsourced, and the 61,900 figure is reused across industries. Per-case hours are an unusual, candid input metric (79+ hours in 4.6 years for PaulB undercuts "literally part of our marketing team"). |
| **Hub "REAL RESULTS" ticker** | `/portfolio/` | 9 anonymised numeric claims ("43% improvement in cost per lead | Industrial Supplier", "34% increase in PPC conversion rate | Higher Education", "184% increase in organic traffic | Financial Services Provider"…) and 5 role-attributed quotes ("U.S. Healthcare Company", "Owner of Home Services Company", "COO of Ecommerce Company") | **None of the 9 numbers can be matched to a named case with the same metric.** 184%, 58%, 34% and 55% appear in no case study at all. |
| **Design portfolio** | `/portfolio/design-portfolio/` | ~150 sites (18 shown + "Load More (132)"), each a one-paragraph client description; hub shows 6 "Award Winning Web Design" sites | Visual proof only. No outcomes, dates or awards named per site. |
| **Video testimonials** | Index "Video Testimonials" (39 video elements; schema names include "Thompson Tractor Testimonial", "Spooky Nook Testimonial"); 4 case pages with named testimonial videos (All Pro Trailer, C.H. Reed, HydroWorx, Thompson Tractor) | — | The strongest authenticity device WebFX has, used sparingly. "Spooky Nook" has no case study. |

---

## 5. Credibility assessment

### Specific vs vague
- **Specific (credible):**
  - Real, named, checkable clients: 55, with logos, locations, founding facts.
  - Tenure from "Client since 2008" to 2024.
  - Named team first names and departments.
  - Service and tech stack per case.
  - Some genuinely specific passages: Record Head "from 3,000 to over 34,000 keywords"; The Difference Card "293 closed-won deals worth $5.9M+ … in December 2025 alone" and "record-setting month for organic sessions in January 2026 — a 43% increase year-over-year"; Enabling Devices' measurement set-up ("custom GA4 segment for separating generative AI traffic", "lead attribution dashboard which includes source attribution from ChatGPT and Perplexity").
- **Vague:** every Before/After bullet; approach sections ("advanced SEM techniques", "data-driven tactics"); quotes like "record-breaking online form submissions" and "dramatic increase in inquiries" that are never quantified; results described as "significant", "substantial", "impressive".

### Missing baselines and timeframes
- **Baselines: 1 of 55** gives any start value (Record Head keywords, a vanity metric). No headline % has its base volume. That makes "3872% increase in sessions from SEO", "2,319% ROI from PPC", "2118% YoY revenue from Amazon ads" and "1,164% traffic from AI sources" uninterpretable. A 1,164% rise can mean 11 → 139 visits.
- **Timeframes: 25 of 55** state no measurement period anywhere. "Client since 2014" (KOA) next to "260% increase in organic revenue" leaves the reader guessing whether that is 2014→2026 or one year. MoM is used as a headline (Resource Furniture 217% MoM: one month vs the previous month, the most cherry-pickable window).
- **Page dates don't help:** `datePublished` is 2025 for 53 of 55 (a bulk migration) and `dateModified` Jun–Sep 2026. Tenure written as "4.6 Years" goes stale silently.

### Attribution method
- Mostly **channel-level analytics attribution** ("from SEO", "from PPC", "from AI sources") via GA4, CRM or the proprietary RevenueCloudFX. No attribution windows, no model, no incrementality or holdout testing.
- "**Assisted** 293 closed-won deals" (Difference Card) and "**revenue attributed to digital marketing**" are multi-touch credit, not causal lift. Kent County's "82% IMPROVEMENT IN COST PER LEAD WITH CONVERSIONS API" counts a tracking upgrade, which increases *measured* conversions, as a performance gain.
- "2,319% ROI from PPC": ROI is never defined (revenue ÷ ad spend? ÷ fee? gross margin?). **No case discloses spend, fee or budget (0 of 55).**
- **"What else changed" is never addressed:** seasonality, pricing, new locations, market recovery, other vendors. Examples:
  - The Difference Card started in the pandemic trough (2020), so YoY recovery flatters.
  - Merrimack "2X REVENUE IN 6 MONTHS" alongside "6 NEW TEAM MEMBERS ADDED" (capacity growth).
  - Hurst Pediatric Dentistry credits "managing local reviews" alongside SEO.
  - Maryland Sunrooms combined a website redesign, geofencing and paid ads, and credits "WebFX" as a whole.

### Anonymisation
Case pages are named, and that is WebFX's strongest credibility asset. The **aggregate** layer, however, is anonymised and untraceable: results page mini-cases, the hub ticker, service-page quotes attributed to "U.S. Healthcare Company", and review snippets with first name plus initial. One anonymised stat (32% interest-form leads) and four ticker stats exist nowhere in the named cases.

### Cherry-picking signals
- **Selection:** 55 cases against "2K+ companies" / "1,500+ clients", roughly 3% of the book. No typical-result or distribution, no churned or failed cases, no negative or flat metrics anywhere.
- **Metric shopping:** each case headlines a different metric family (sessions for one, CPL for the next, AI appearances, awards). There is no consistent KPI, so the best-looking number wins. Cleveland Brothers' headline "metric" is "1 HORIZON INTERACTIVE AWARD". PMI's only metric is "88% INCREASE IN ORGANIC PAGES PER SESSION".
- **Window shopping:** YoY on some, MoM on others, "first 6 months" on others, nothing on most.
- **Different headline metric per placement:** HydroWorx is "131% organic contact form submissions" on the hub and "236% organic sessions" on the index.

### Errors and inconsistencies found

| Error | Evidence |
|---|---|
| Impossible statistic | Maryland Sunrooms: "321% DECREASE IN COST-PER-LEAD (CPL)" |
| Template copy-paste leak | MWCC: "optimizing pages on MWCC's website for key search terms around campgrounds and camping" (text from the KOA case) |
| Headline promise not measured | MWCC "Boosts Enrollment" (no enrolment metric); Maryland Sunrooms "Exceed Their Revenue Goals" (no revenue metric) |
| Name mismatch card vs page | Index "PaulB Hardware" vs page "PaulB Parts"; index "Bar's Products, Inc" vs quote attribution "Bar's Leaks" |
| Taxonomy error | Hayward Turnstiles (turnstile manufacturer) tagged INDUSTRY "Outdoor Structures" |
| Orphaned cases | Hayward Turnstiles and Ryan Amato Painting are live but missing from the index |
| Metric label drift on the same page | Ryan Amato hero "120% INCREASE IN SEO LEADS" vs results "120% INCREASE IN LOCAL SEO LEAD" |
| Recycled old-brand quotes | "WebpageFX" / "Webpage FX" quoted in Bar's Products, CenTrak and Record Head. These quotes predate the rebrand but sit beside current metrics with no date. |
| Aggregate contradictions | Reviews 550 / 700 / 860 / 1,100+ / "thousands"; G2 4.8 vs 4.9; $10B vs $2.4B; "93,969+" vs "94K" LLM mentions; 61,900 hours reused for two industries; "488%" misdescribed three ways |
| Unsourced benchmarks | "Industry average: 72% / 50% / 16" on ~100–120 pages |
| Sloppy production | CenTrak's team blurb is the same two sentences duplicated; Northside Towing's hero quote starts mid-thought ("They have also allowed us…") |

**Net:** WebFX's proof is persuasive at a glance and fragile under inspection. A sceptical buyer, or an AI answer engine summarising "is WebFX credible?", can find these flaws quickly.

---

## 6. Education sector proof

| Case | Actually education? | Model / size | Services | What is measured | What is *not* measured |
|---|---|---|---|---|---|
| **Mount Wachusett Community College (MWCC)**, "Community College Boosts Enrollment with Help from WebFX" | Yes: public two-year college, Massachusetts | B2C / 201–500; client since 2020; 1,465+ hours | SEO, PPC, Social | 205% social ad impressions; 200% paid ad conversions; 67% social conversions; 25% SEO sessions. No periods, no bases. | Enquiries, applications, enrolments, cost per enquiry/application/enrolment, lead-to-enrolment rate, intake/term comparison. Quotes claim "a dramatic increase in inquiries", that WebFX helps "grow our enrollment, reduce our costs", and that the college "can accurately tie those efforts back to our work with WebFx", yet no figure is shown. "Paid ad conversions" is undefined (RFI? application start?). The page also contains the "campgrounds and camping" copy error. |
| **URAC**, "URAC Grows AI Traffic by 188%…" | No: nonprofit healthcare *accreditation* body filed under "Education, Media, Training, & Information Services" | B2B / 51–200; client since 2021 | SEO, GEO | 188% AI-channel traffic; 95% visibility for tracked AI questions; 70% higher visibility than closest competitor; 62% QoQ AI traffic; 15% AI answer appearances; "95+ authoritative backlinks" | Any lead, programme sign-up or accreditation application metric |

Other education proof on the site:
- **Hub ticker:** "34% increase in PPC conversion rate | Higher Education". Anonymised, and it matches no case study.
- **Education industry pages** (higher education, edtech, private schools, technical schools, online education) show a proof carousel of **CenTrak** ("90% decrease in cost per lead", healthcare RTLS SaaS), **MWCC** ("200% increase in paid ad conversions") and **Hurst Pediatric Dentistry** ("540% increase in leads"). Two of the three are not education. The `/industries/education/` page links to KOA and S. Clyde Weaver case studies.
- "INSIGHTS FROM 61,900+ HOURS OF HIGHER EDUCATION MARKETING EXPERIENCE", with the identical figure labelled "technology marketing experience" on the edtech page.
- **No** edtech, K-12, private school, university, coaching or test-prep case study exists.

**Implication for MMC:** WebFX, a 750-person agency, has one real education case, and it doesn't measure enrolments. Education is an open proof category. Funnel-stage proof (enquiry → counselling/demo → application → enrolment, by intake) would beat anything WebFX shows.

---

## 7. What works that MMC must match

1. **Findability of relevant proof.** Every case is filterable by industry, business model (B2B/B2C/Split), service, company size and technology. Buyers self-select "someone like me" in two clicks. MMC should filter its client book by business type (D2C, B2B, B2C, education) and service from day one, even before case studies exist.
2. **A consistent, scannable structure.** Header facts, then outcome, then client voice, then before/after, approach, results, team. Buyers learn the layout once and skim the rest. MMC's template (9a) should be just as predictable, only more rigorous.
3. **Named clients and visible tenure.** "Client since 2014" is itself retention proof. MMC's 14/14 renewed and 27-month median tenure belong on the client book and case pages in the same spirit, with a clear definition.
4. **Real people on the agency side.** Named team members with roles, plus effort (hours). MMC can go further: full names, LinkedIn links, and who does the work each week.
5. **Client voice everywhere,** and video where possible. Four case pages carry named testimonial videos; these are WebFX's hardest-to-fake asset.
6. **Proof placed where decisions happen.** Rating badges and results tiles next to service descriptions and forms; related cases at the foot of every case; a counter in the header linking to a results page.
7. **Proof that tracks the product roadmap.** Six GEO/AI search cases went live as the service launched. MMC should publish proof for what it wants to sell next (e.g. education, B2B lead gen), not only past strengths.
8. **Third-party review presence** (Clutch, G2, Capterra, linked in schema `sameAs`). MMC needs at least one independent review platform with real, linkable reviews.
9. **Budget anchoring on proof pages.** The case study form includes monthly budget bands. MMC can pair proof with spend bands honestly (see 9a).
10. **Service-specific metrics.** Amazon cases show Amazon sales and units, local cases show calls and map impressions. Metrics match the service sold.

---

## 8. Gaps MMC can exploit, ranked

| Rank | Gap | WebFX evidence | MMC counter-move |
|---|---|---|---|
| 1 | **No baselines or absolute values** | 1/55 cases give any start value; 167/180 metrics are % changes; zero absolute revenue, lead, CPL or ROAS values in any stat block | Every result shows *start → end* with units (or an indexed value with the base disclosed as a range, if the client won't share raw numbers). Never publish a % without its base. |
| 2 | **No spend or unit-economics context** | 0/55 disclose ad spend, budget or fee; ROI/ROAS reported as "% increase" of an undefined ratio | State the monthly media spend band, the ROAS/CAC definition and the data source on every case. This is MMC's home turf: blended ROAS is an absolute ratio, not a lift. |
| 3 | **No or unstated measurement windows** | 25/55 no period; MoM headlines; tenure years used in place of results windows | Fixed, dated windows ("Apr–Jun 2025 vs Apr–Jun 2026"), minimum 90 days; name seasonality (Diwali, sale events, admission cycles). |
| 4 | **Aggregate figures undefined and contradictory** | $10,085,355,239+ with no method; $2.4B stale pages; reviews 550/700/860/1,100+; G2 4.8/4.9; "488%" wrong three ways | Four figures, each with definition, population, window, source and "as of" date, rendered from one component so they are identical everywhere, plus a public "How we count" note. |
| 5 | **Unsourced benchmarks** | "Industry average: 72% / 50% / 16" on ~100+ pages with no source | Never compare to an uncited industry average. If MMC uses a benchmark, cite the source and year, or don't use one. |
| 6 | **Weak quote attribution** | 168 quotes, 0 with a person's name, 2 with a role only; old-brand "WebpageFX" quotes undated | Name, role, company, date, and a line saying the client approved the quote. Where a name is withheld, say so ("name withheld at client's request"). |
| 7 | **Visible QA errors** | 321% CPL "decrease"; campground copy in a college case; headline promises (enrolment, revenue) not measured; orphan pages; card/page name mismatch | An editorial and data QA checklist plus client sign-off before publishing. Every headline must be backed by a metric on the page. |
| 8 | **Attribution invisible; "what else changed" ignored** | Channel-sliced "from SEO/AI"; "assisted" deals; a CAPI tracking change counted as a CPL win | A method box on each case (attribution source, window, platform vs store-backend numbers) and a "What else changed" box. |
| 9 | **Selection bias undisclosed** | ~55 cases from 1,500–2,000+ clients; no typical results; no failures | Say how cases are chosen. Pair individual stories with medians (MMC's 8.7x is already a median, which is more honest than a best case). Include "what didn't work". |
| 10 | **Anonymised proof untraceable** | 1 results-page stat and 4 ticker stats match no case | Anonymised examples only with written permission, using spend/size bands and a stable internal reference so they can be verified privately on request. |
| 11 | **Thin sector proof in education and performance D2C** | 1 true education case with no enrolment data; 1 ROAS metric across 55 cases; SEO in 53/55 cases | Own education (funnel-stage metrics by intake) and D2C performance (blended ROAS, CAC, MER, contribution). |
| 12 | **Undated proof** | datePublished 2025 bulk; "4.6 Years" tenure; no "last verified" | "Results window", "Published" and "Last verified" dates on every case and aggregate figure. |

---

## 9. Recommended MMC proof system

### (a) Case study template, more rigorous than WebFX's

**Card (for the client book and filters):**
- Brand, or "Brand name withheld"
- Business type (D2C / B2B / B2C / Education)
- Category
- Services
- Engagement start (month-year, with permission)
- Results window
- "Approved by client on [date]"

**Page sections, in order:**

| # | Section | Required content | Rule that makes it more rigorous than WebFX |
|---|---|---|---|
| 1 | **Snapshot** | Three KPIs, each as *baseline → result*, with units, the window, and the data source in small print | No bare % stat. The % change may appear only beside both values. |
| 2 | **Starting point** | The baseline period (dated) and its numbers; constraints (catalogue size, AOV, stock, brand awareness, previous agency/in-house, tracking state) | Baseline taken from data frozen at kickoff, not reconstructed later. |
| 3 | **Goal and KPI definitions** | What success meant, agreed at kickoff. Examples: *blended ROAS = [store-backend net revenue] ÷ [total paid media spend across channels]*; CAC; MER; CPL; lead-to-sale; for education, cost per enrolment | Definitions written before results, so the metric isn't chosen afterwards. Same KPI family for every case of the same business type (D2C always shows revenue, blended ROAS and CAC or MER). |
| 4 | **Spend context** | Monthly media spend band (e.g. ₹[x]–[y] lakh/month), channel mix, scope of MMC's work | Spend band mandatory; no ROAS/ROI without it. |
| 5 | **What we did** | A month-by-month timeline of key moves: account restructure, creative tests, landing pages, feed fixes, CRM/lead routing. Artefacts: creatives, LP screenshots, structure diagrams. | Dated actions, not generic tactic lists. |
| 6 | **Results table** | Metric · baseline window value · result window value · change · source system | Minimum 90-day windows; like-for-like seasons; MoM only as supporting detail, never as the headline. |
| 7 | **Method and attribution note** | Where numbers come from (Shopify/WooCommerce/CRM/LMS vs Meta/Google platform reporting), attribution windows, blended vs platform ROAS, any incrementality or holdout test, data export date | Required. If platform-reported only, say so. |
| 8 | **What else changed** | Pricing, launches, stockouts, offline/PR, marketplace shifts, other agencies, seasonality, intake dates | Required. "Nothing material" must be stated explicitly and confirmed by the client. |
| 9 | **What didn't work** | Tests that failed and what was learned | Required. It signals honesty and expertise. |
| 10 | **Client voice** | Named person, role, date; video if possible | Quote approved in writing. No undated or pre-engagement quotes. |
| 11 | **Team and cadence** | Named MMC people, roles, months on the account, meeting and reporting cadence | Full names, not first names. |
| 12 | **Verification footer** | "Figures and wording approved by [client role] on [date]. Source exports on file. Last verified [date]." | Re-verify, or mark "historical", after 12 months. |

**Education variant:** replace section 1 KPIs with funnel stages by intake or cohort (enquiries → qualified leads/counselling calls → applications → enrolments), cost per enquiry and cost per enrolment, and enquiry-to-enrolment rate, with the intake calendar as the window. No student personal data in any artefact.

**B2B variant:** leads → qualified (MQL/SQL) → opportunities → closed, cost per qualified lead, sales cycle. State whether revenue is CRM closed-won or pipeline.

**Editorial QA before publishing (the WebFX error list, turned into checks):**
1. Every headline claim is backed by a metric on the page.
2. No decrease exceeds 100%.
3. No text from another case appears.
4. Client name matches across card, page, quote and filters.
5. Every % has a base and window.
6. Spend band and definitions are present.
7. The page is linked from the index.
8. Quote date falls after engagement start.

### (b) Presenting aggregate proof honestly with the four published figures

Only four figures are published: **8.7x median blended ROAS**, **₹248Cr+ revenue compounded**, **14/14 clients renewed**, **27 months median tenure**. Do not add, derive or round any others.

1. **One source of truth.** Render the four figures from a single component or data file so they are identical everywhere (WebFX shows four different review counts). Add an "as of [month year]" stamp beside them.
2. **A "How we count" note** linked from wherever the figures appear. MMC must fill each field from its own records. Do not guess.

   | Figure | Define | Population | Window | Source | Watch-outs |
   |---|---|---|---|---|---|
   | 8.7x median blended ROAS | Blended ROAS = [revenue source] ÷ [all paid media spend] | Which clients count (e.g. D2C accounts with ≥ [n] months of MMC-managed paid media); N | [period] | [store backends / platforms] | Say it is a **median**, not a best case. Show it only where it applies (D2C/ecommerce), not on B2B or education pages without qualification. |
   | ₹248Cr+ revenue compounded | What "revenue compounded" means: cumulative client revenue during MMC engagements? Revenue from MMC-managed channels? | Clients included; N | Since [year] | [source] | "Compounded" can be read as a growth rate. A plain definition beside it prevents the $10B problem (big, precise-looking, undefined). |
   | 14/14 clients renewed | Renewal event = [contract/retainer term ended and was renewed] | The 14 clients whose term came up | [period] | Contracts | Keep it as a fraction. Don't restate it as "100% retention" (renewal ≠ retention, and a percentage hides the small base). |
   | 27 months median tenure | Tenure = start to [today, or end date] | Current and/or past clients (say which); N | As of [date] | Contracts | Median, not mean; say whether active clients are included. |

3. **No counters that tick, no "+" on figures that aren't lower bounds, no false precision.** ₹248Cr+ is fine only if it is a genuine floor.
4. **No invented comparisons.** No "vs industry average" unless a cited source exists.
5. **Link each figure to a proof path:**
   - Tenure and renewals → client book (scope-only cards; start years with permission).
   - ROAS → method note and, once approved, case studies that show blended ROAS with spend bands.
   - Revenue → definition and the cases that contribute.
6. **Change log:** when the figures are recomputed, note the date and what changed. Keep the old values' as-of dates rather than silently overwriting.

### (c) What to show while written case studies don't exist

Use a **proof ladder**, publishing each rung only with client permission:

| Rung | Asset | What it proves | Guardrails |
|---|---|---|---|
| 0 | **Scope-only client cards** (current client book: brand, business type, services), filterable by business type and service | Breadth and relevance ("they work with brands like mine") | No outcome numbers. With permission, add engagement start year and a "renewed" marker, consistent with the 14/14 and 27-month figures. |
| 1 | **Work samples** (ad creatives, UGC scripts, landing pages, email/WhatsApp flows, catalogue/feed fixes, lead-form designs) | Craft and taste | Label "Work sample · results not shown"; client approval for public use; no performance claims. |
| 2 | **Process artefacts** (redacted audit template, account structure diagram, creative testing log format, weekly report template, measurement plan, 30-60-90 onboarding plan, education funnel map) | How MMC thinks and operates; sets up the rigour case studies will show | Any sample report uses clearly labelled dummy data ("Illustrative data"). |
| 3 | **"How we measure" page** (KPI definitions, attribution policy, blended vs platform ROAS, reporting stack, approval policy for claims) | Method credibility before outcomes | Must match how the four figures are computed. |
| 4 | **Named client voice** (quotes and short videos; LinkedIn recommendations; reviews on one third-party platform, e.g. Clutch or Google) | Trust from real people | Name, role, date, approval. Show honest review counts, even if small, with links. |
| 5 | **Anonymised benchmarks, with permission** (e.g. "D2C [category] brand, ₹[x]–[y]L/month spend: blended ROAS [a]→[b], [window]") | Outcome evidence while names can't be shared | Written consent; bands not exact figures; internal reference ID; client sees the exact wording first. Never published without approval. |
| 6 | **Full verified case study** (template 9a) | Everything above, attributable | Published only after sign-off. |

Also useful now:
- A short, plain statement on the work page: "We publish results only with client sign-off. Full case studies are being prepared with [n] clients." Include it only if true, and without fake "coming soon" tiles.
- Named MMC team with roles and verifiable backgrounds.
- For education: scope cards for education clients plus the funnel-stage measurement map, showing *what* MMC tracks before showing results.

### (d) Proof-collection checklist to run with clients now

| # | Step | Details | When |
|---|---|---|---|
| 1 | **Permission tier per client** | Named case study / named quote only / anonymised with category and spend band / nothing public. Get it in writing (email is fine) and log it in a proof register. | This month, for all current clients |
| 2 | **Freeze baselines** | Export and screenshot the pre-engagement period (ideally 90 days), dated. D2C: revenue, orders, AOV, spend by channel, platform and blended ROAS, CAC/MER, CVR, repeat rate. B2B: leads, qualified leads, CPL, pipeline, closed-won. Education: enquiries, applications, enrolments by intake, cost per enquiry/enrolment. | At kickoff (for existing clients, reconstruct from exports and label "reconstructed") |
| 3 | **KPI definition sheet** | Agree metric definitions and the source of truth (Shopify/WooCommerce/CRM/LMS vs ad platforms), attribution windows, blended ROAS formula. Client confirms by email. | Kickoff; revisit yearly |
| 4 | **Monthly data archive** | Same exports each month, same windows, stored read-only with dates. | Monthly |
| 5 | **Spend log** | Media spend by channel and month (the basis for spend bands and ROAS). | Monthly |
| 6 | **"What else changed" log** | Pricing, launches, stockouts, sales events, offline/PR, marketplace changes, other agencies, tracking changes (e.g. CAPI or GA4 changes, so tracking gains aren't counted as performance). | Monthly, a two-line entry |
| 7 | **Test log, including failures** | Hypothesis, dates, result, decision. Feeds "What didn't work". | Per test |
| 8 | **Work-sample archive** | Creatives, landing pages, flows with approval status for public use. | Ongoing |
| 9 | **Client voice capture** | Ask a specific question ("What changed in your business since we started?"). Record name, role, date; ask for a 60-second video. Renewal moments (14/14) are the best time. | Quarterly and at renewal |
| 10 | **Third-party reviews** | After renewal or a milestone, ask for a review on one chosen platform; link to it from the site. | At renewal |
| 11 | **Draft and sign-off** | Client reviews the exact numbers, wording and quote; store the approval email; set a re-verification date (12 months). | Before publishing |
| 12 | **Aggregate figure maintenance** | Recompute the four figures from the register on a fixed cadence; keep the calculation sheet; update "as of" dates and the change log. | Quarterly |
| 13 | **Compliance check** | Confirm claims are substantiated and testimonials genuine, per the ASCI advertising code. Respect NDAs and platform data terms. Keep student or customer personal data out of all proof assets (DPDP Act). | Before publishing |

---

### Files
- Analysis: `analysis/webfx-proof.md` (this file)
- Data: `analysis/data/webfx_cases.json`, `analysis/data/webfx_cases.csv`, `analysis/data/inventory_table.md`, `analysis/data/extract_summary.txt`
- Scripts: `analysis/scripts/extract_cases.py`, `make_inventory.py`, `claims_sitewide.py`, `claims_context.py`, `crosscheck.py`

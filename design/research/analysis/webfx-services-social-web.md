# WebFX service pages: social, creative, content, web, email, martech

Competitive teardown for Monday Marketing Company (MMC). Evidence first. Collected from the live-site corpus on 2026-09-15.

**Scope.** 63 pages whose slug starts with `social_media_services` (17), `content_marketing_services` (13), `martech_services` (13), `web_design_services` (11), `web_development_services` (7), `email_marketing_services` (2). Six are discipline hubs; 57 are sub-service pages.

**Method.**
- `scripts/webfx_social_web_stats.py` (output `scripts/webfx_social_web_stats.txt` and `.json`) covers word counts, H2 section typing and sequences, CTAs, forms, FAQs, schema, numbers, titles and meta, internal links, vocabulary and sentence length.
- `scripts/webfx_social_web_pricing_proof.py` (output `.txt`) covers pricing cards, tier tables, expert quotes, consistency checks, reused proof and typos.
- Read in full (26 pages):
  - Hubs: web design, social, content, email, web development, martech.
  - Social: Instagram, TikTok, design, influencer, ecommerce advertising, consulting.
  - Content: video, infographics, explainer videos, website copywriting.
  - Email: email design.
  - Web design: ecommerce, conversion design, SMB, RainmakerFX, redesign.
  - Web development: site speed, maintenance.
  - Martech: HubSpot, CDP.
- The other 37 pages were skimmed from their title, H1, hero line, H2s and questions.

**Caveats.**
- Carousels repeat their slides two or three times in the crawl, which inflates raw word counts. "Dedup" counts remove the repeats.
- FAQ accordions only expose the first answer in the crawled text. For example, web design shows 2 of 11 answers and social shows 2 of 18.

---

## Headline findings (one screen)

1. **One template runs the whole slice.** It is a factory product: 49 of 63 pages run the same three-block core, "Pricing custom to you" > "Solving key challenges for businesses" > "Unlock a 25% greater marketing ROI" (a comparison table). 56 pages have "Your search for X ends here" and 57 have a FAQ block.
2. **Proof is mostly boilerplate and often mismatched.** The same three SEO case studies appear on 48 or 49 pages: Hurst Pediatric Dentistry (540% organic leads), Merrimack Valley (2X revenue) and Net Friends (2X traffic). They show on email, TikTok, UX and website security pages. One Clutch quote ("Flavia A") heads 46 pages.
3. **The numbers conflict.** Pages give "750+ DIGITAL EXPERTS" and "500+ digital marketing experts" on the same page (47 pages). They cite "$10 billion" and "$6 billion" in revenue, and "1,100+ REVIEWS", "over 550 third-party reviews" and 441 in schema. The web design hub says "120+ DESIGN AWARDS" and "more than 45 design awards" in the same block. Web design sub-pages say "Starting at $8,000 per month" while the hub says "$8,000 / site".
4. **Price transparency is the strongest idea.** 38 pages anchor a starting price and 22 have a "How we determine pricing" card. Tier tables list deliverables per tier. The social hub, for example, offers Bronze/Silver/Gold at 10/20/30 posts and 8/10/12 custom images per month.
5. **Creative is sold as an add-on, never as the growth lever.** Examples: "We provide our social media design services as an add-on", "Vertical Content Creation: Add $1,200/month", "Social Ad Creatives: Up to 2 sets / Up to 4 sets". There are zero mentions of UGC, and zero of before/after, SMS, WhatsApp, Klaviyo or abandoned cart. Shopify appears only as a footer link and in one schema entry. Email has just 2 pages.
6. **Show-the-work is thin.** The same six portfolio tiles (company bios, no design rationale) appear on 9 pages, ecommerce included. The one interactive tool is an 8-dropdown web design cost calculator, on 9 pages.

---

## 1. Service architecture

### 1.1 How disciplines break down

| Discipline (hub URL) | Pages | Split axis | Sub-services |
|---|---|---|---|
| Social `/social-media/services/` | 17 | **Platform** (8), **business model / size** (2), **function** (5), channel-adjacent (2) | Platform: Facebook ads, Instagram marketing, LinkedIn, TikTok, Twitter/X, Pinterest, Snapchat, YouTube SEO. Model/size: ecommerce advertising, enterprise advertising. Function: advertising (umbrella), design, influencer, consulting, Messenger chatbot. Adjacent: Instacart |
| Content `/content-marketing/services/` | 13 | **Deliverable** (video, explainer videos, infographics, blog, website copy, brand voice copy, expert copy) and **funnel/purpose** (MOFU/BOFU, SEO content, brand content placement, personalization, content creation umbrella) | |
| Web design `/web-design/services/` | 11 | **Company size** (SMB, enterprise), **business model** (B2B, ecommerce), **platform** (WordPress), **job** (redesign, conversion design, UX, responsive), **productised package** (RainmakerFX, "website in 30 days") | |
| Web development `/web-development/services/` | 7 | **Platform** (WordPress, CMS), **technical job** (site speed, maintenance, security analysis, ADA compliance) | |
| Email `/email-marketing/services/` | 2 | Design only. The footer also links B2B, SMB and newsletter management outside the crawl slice | |
| Martech `/martech/services/` | 13 | **Vendor platform** (HubSpot, Salesforce, Microsoft Dynamics, Housecall Pro) and **data/AI capability** (AI consulting, AI agents, AI/GPT integration, AI media mix modeling, CDP, CRM integration, data warehouse/ETL, consent management) | |

**Pattern.** Every axis a buyer might search on gets its own URL: platform, deliverable, size, model and job. The pages are near-clones with the keyword swapped. The 90th-percentile page shares about 80% of its lines with sibling pages (see 2.4).

**Gaps relevant to MMC.**
- No Shopify service page sits in this slice. It is only a footer link ("WebFX: Trusted Shopify Web Designers") plus a `Service` schema entry named "Shopify Ecommerce Development Services" on the web development hub.
- Ecommerce web design names "Magento and WooCommerce" and even an H3 "Visa, Mastercard, American Express".
- There are no pages for UGC or creator content, performance creative, landing pages for ads, retention, SMS, lifecycle automation or quick commerce. Instacart is the nearest analogue to quick commerce.
- The only mention of D2C is an H3 "D2C Social Media Advertising" on ecommerce and enterprise advertising.

### 1.2 URL patterns

- `/{discipline}/services/` is the hub. `/{discipline}/services/{sub-service}/` is the sub-page. Pricing and educational content live in parallel trees: `/{discipline}/pricing/...`, `/{discipline}/learn/...` and `/blog/{discipline}/...`.
- Slugs are keyword-first and short (`/instagram-marketing/`, `/tiktok-advertising/`, `/redesign/`, `/smb/`). There are exceptions: `/facebook-advertising-services/` repeats "services", and the brand name `/rainmakerfx/` wastes a slug.
- Crawled tool URLs sit outside the slice: `/web-design/learn/website-design-cost-calculator/` (linked from 9 pages), `/tools/roas-calculator/` and `/tools/conversion-rate-calculator/` (global nav).

### 1.3 Cross-linking

- **Global nav/footer** holds 131 targets present on 80% or more of pages. On-page links outside the nav range from 1 to 27 per page, with a median of 12.
- **Links stay inside their silo.** Social links to social 68 times and content to content 32 times. Web design links to web design 29 times and martech to martech 6 times. Cross-discipline links are almost absent: web development to web design (6), web design to web development (2), web design to martech (1), web design to content (1).
- Body links to targets outside the nav go mostly to `/blog/` (163), then `/social-media/` (112), `/web-design/` (66) and `/content-marketing/` (63).
- **Page-end "More on our X" block** (28 pages): 3 to 11 links split into "Services", "Pricing" and "Learn More" (blog) columns. The social hub footer links Facebook, Instacart, LinkedIn, social advertising, consulting and TikTok. The TikTok page links "How Much Do TikTok Ads Cost?" and "Best Time to Post on TikTok in 2026".
- **Hub-to-spoke sliders.** The social hub carousel has View Instagram / Facebook / Twitter / LinkedIn / TikTok CTAs. The web development hub has 8 "Explore ... Services" CTAs.
- **Sister services inside the page body.** "We offer more than TikTok advertising services" lists SEO, PPC, web and content, with the SEO deliverables pasted under the TikTok page.

---

## 2. The page template

### 2.1 Canonical section order (sub-service page)

From H2 typing across 63 pages. "Pages" counts how many contain the section; "Pos" is its median position from 0 (top) to 1 (bottom).

1. **Stat bar plus hero review** (pre-H1, 59 pages). Shows "91% RETENTION RATE / Industry average: 50%", "93% CLIENT SATISFACTION SCORE / Industry average: 72%", a Clutch quote, "Rated 4.9/5 stars on Clutch" and "HIGHER NPS® SCORE THAN / Industry average: 16". *Job: borrowed trust before the headline.*
2. **H1 plus hero paragraph plus "Send Me a Proposal"** (61 pages) with a single "Enter your website" field. *Job: keyword plus outcome, one low-friction ask.*
3. **Trust ribbon** (54 pages): "750+ DIGITAL EXPERTS · 30-YEAR TRACK RECORD · 1,100+ REVIEWS · IN-HOUSE TECHNOLOGY". Sometimes followed by **anchor tabs** (Deliverables · Pricing · Why WebFX · Hear From Clients · Compare WebFX · FAQs, on 16 pages).
4. **"What do our X services include?"** (INCLUDES, 50 pages, pos 0.07). A tabbed list of 3 to 12 deliverables, where only tab 1's copy is visible in the crawl. "And more!" closes the list on 22 pages. *Job: scope and keyword coverage.*
5. **Technology block** (TECH, 40 pages, pos 0.15). Titled "Data-Driven Digital Marketing", "Technology for Smarter Marketing" or "Platform to Empower Web Design Capabilities". It pitches RevenueCloudFX with stat tiles ("20% AVG INCREASE IN ROI", "$500K+ BUILT-IN VALUE based on the cost of similar tools", "1+ billion DATA POINTS") and a 3-4 feature carousel. *Job: a proprietary moat.*
6. **Pricing card** (PRICING_CARD, 28 pages, pos 0.20). "Transparent [X] Pricing Tailored to Your Business Goals", with "Starting at $X / month", **"How we determine pricing"** (3 factors), **"INCLUDED IN ALL PLANS"** (5-12 bullets) and "Get My Custom Quote". *Job: pre-qualify on budget, reduce fear.*
7. **"Your search for X services ends here"** (WHY_WEBFX, 56 pages, pos 0.27). "Here's why businesses choose to partner with WebFX:" followed by 4-8 H4 reasons (Experience / Results / Technology / Reviews, or "Reclaim your work day / Accelerate your ROI / Grow your bottom-line / Streamline your strategy"). *Job: differentiation.*
8. **Price anchor strip** (PRICE_ANCHOR, 38 pages, pos 0.35): "Pricing custom to you. Starting at $3,000 per month. Request a Free Proposal". *Job: a second CTA with price.*
9. **"Solving key challenges for businesses"** (CHALLENGES, 49 pages, pos 0.44). A carousel of three client stories (540% / 2X / 2X), the same on every page. *Job: outcome proof.*
10. **"Unlock a 25% greater marketing ROI with WebFX's award-winning X team"** (COMPARE, 44 pages, pos 0.56). A three-column table, WebFX vs "In-House Marketing" vs "Typical Marketing Agency", with 4 identical rows everywhere. *Job: kill the DIY and cheaper-agency alternatives.*
11. **Education / benefits / process** (BENEFITS 17, PROCESS 6, OTHER 46, pos 0.67). "Why invest in X?", "How WebFX does influencer marketing" (9 steps), "What industries can benefit from explainer video services?". *Job: long-tail SEO copy.*
12. **"FAQs about X services"** (FAQ, 57 pages, pos 0.78). 1-19 questions, median 5. *Job: SEO/AEO and objections.*
13. **Closing copy block** (CLOSING_COPY, 35 pages, pos 0.73). "Get the best X services for your business", "Invest in X from WebFX", with phone plus "contact us online". Followed by a "Table of Contents" jump list (54 pages).
14. **Plan/deliverables table** (PACKAGES_TABLE, 7 pages with an explicit H2, 9 with tier tables, pos 0.91). "View all deliverables in our X services" or "Explore X plans". *Job: spec sheet for evaluators.*
15. **Reviews badge** ("WebFX has thousands of reviews praising our transparency, communication, and results. 4.9/5 based on over 550 third-party reviews", 48 pages).
16. **"More on our X solutions" link block** (RELATED_FOOTER) and the sitewide "Discover how we can help your business grow / Send Me a Proposal!" footer form.

The most frequent section transitions confirm the spine:

| Transition | Count |
|---|---|
| CHALLENGES > COMPARE | 39 |
| WHY_WEBFX > PRICE_ANCHOR | 37 |
| PRICE_ANCHOR > CHALLENGES | 37 |
| INCLUDES > TECH | 19 |
| TECH > WHY_WEBFX | 19 |
| PRICING_CARD > WHY_WEBFX | 18 |
| FAQ > CLOSING_COPY | 20 |

### 2.2 Variation

| Variant | Pages | What changes |
|---|---|---|
| **Hub pages** (web design, social, content) | 3 | Richer. Expert quote H2 ("How Our Social Media Experts Approach Your Success", "How Our Designers Adapt to Trends and Design Shifts"), anonymised case study cards (#HOWWEDIDIT, SEEINGTHEFX, KEYS TO SUCCESS), "Content Featured In" logos, benefits list, long FAQ (11-18 Qs), and the social hub's Bronze/Silver/Gold table |
| **Web design "show work" variant** (web design hub, B2B, ecommerce, SMB, WordPress, redesign, RainmakerFX; CMS and WordPress dev too) | 9 | Portfolio slider ("Explore our portfolio", 6 tiles) + "100+ Websites Launched in 2023 Alone / 12 weeks on Average to Build a Custom Website / 45 Gold, Silver, and Bronze Design Awards Won" + calculator + hidden-field proposal form ("Request a FREE Proposal Now!") |
| **Martech vendor-consulting variant** (HubSpot, Salesforce, Dynamics, Housecall Pro) | 4 | No pricing card. "Unlock Business Growth with WebFX's Unique Technology Integration with HubSpot", a comparison of "Technology Provider" vs "Other Consulting Companies", and a price chip "$1,000+ /month, digital marketing services ($3K+/month) required" |
| **Older long-copy variant** (video, enterprise web design) | 2 | No stat bar. Long "Why choose WebFX" essays (7 H4s of 80-150 words each) and "Hear From Our Clients" with 3 attributed-by-industry quotes. Video has 46 images vs a median of about 130 |
| **Martech hub** | 1 | Thin: 513 dedup words, list of 14 links, tech block, no FAQ |

### 2.3 Word count distribution

| Set | n | Raw words, median (p25-p75) | Dedup words, median | Page-specific words, median |
|---|---|---|---|---|
| All | 63 | 1,747 (1,512-2,119) | 1,498 | 888 |
| Hubs | 6 | 2,329 (2,007-2,561) | | |
| Sub-pages | 57 | 1,739 (1,512-2,050) | | |
| Social | 17 | 1,572 | | 932 |
| Content | 13 | 1,992 | | 1,102 |
| Web design | 11 | 1,903 | | 821 |
| Web dev | 7 | 1,885 | | 1,012 |
| Martech | 13 | 1,336 | | 774 |
| Email | 2 | 1,996 | | 880 |

- **Longest:** web design hub (3,149), social consulting (2,997), site speed (2,711).
- **Thinnest:** martech hub (744 raw, 106 page-specific), AI agent development (1,040), HubSpot (1,075).
- Page-specific words means lines appearing on 2 or fewer slice pages. Only **about 57%** of a page's deduped text is unique to it. 49 boilerplate lines appear on at least half the pages: stat bar, comparison rows, case study carousel, review badge.

### 2.4 How creative and web services show work

| Mechanism | Where | Quality |
|---|---|---|
| Portfolio slider, 6 tiles (Colonial Golf & Tennis Club, Liftnow, Formula Boats, Creative Materials Corporation, Aligned Orthopedic & Sports Therapy, HomeWell Franchising) | 9 web/dev pages, same six everywhere, ecommerce included | Company "about" blurbs ("Colonial's golf course was first opened in 1910..."). No brief, no before state, no design decision, no metric. "View Full Portfolio" goes off-page |
| Anonymised case cards: industry + solutions + note + one % metric | Web design hub (8 cards, "Manufacturing: Packaging ... 148% INCREASE IN SEO CONV RATE"), content hub and website copywriting (5 cards with "KEYS TO SUCCESS" bullets), social hub (2 cards with "#HOWWEDIDIT" steps) | Better: shows the *levers pulled* ("Expanded Traffic Retargeting to Include Shop Engagers", "Test New Creatives & Bidding Adjustments"). Unverifiable (no names, no dates, no baseline) |
| Named redesign case studies | Redesign page: Cleveland Brothers ("consolidate their four websites into one ... 37% increase in conversions"), Reynolds Building Solutions, Sharrett's Plating | Only named, specific web proof in the slice |
| Maintenance "Results" story | All Pro Trailer Superstore (quote only, no metric) | Weak |
| **Cost calculator** (8 dropdowns) | Web design hub, B2B, ecommerce, SMB, WordPress, redesign, CMS, WordPress dev (9 pages) | Strong idea (see 6.3) |
| Theme gallery | RainmakerFX: "5 theme options", 5 x "See the Theme" | Productised and concrete |
| Before/after | 0 pages | Absent |
| Creative samples (ads, posts, videos, UGC) | 0 pages | Social design, explainer video, infographics and TikTok pages show **no creative work at all**. Videos embedded are agency explainers (45 pages carry VideoObject schema) |

---

## 3. Messaging

### 3.1 Core promises (ranked by how often they appear)

| Promise | Evidence (slug) | Reach |
|---|---|---|
| **Revenue, not activity** | "Professional Web Design Services: Get a Site That Drives Revenue" (web_design_services); "Email Marketing Services That Convert Inboxes Into Revenue" (email_marketing_services); "Turn your social media into a revenue engine with WebFX" (social_media_consulting). "revenue" appears 316 times on all 63 pages; "ROI" 321 times on 61; "leads" 356 times | 63/63 |
| **Measurable ROI uplift via proprietary tech** | "Unlock a 25% greater marketing ROI..." (36 pages) or "...20% increase in ROI..." (8 pages); "20% AVG INCREASE IN ROI" tile; RevenueCloudFX named on 60 pages | 60/63 |
| **Custom, not cookie-cutter** | "Leave cookie-cutter social media strategies behind" (social_media_services); "cookie-cutter" used 58 times on 50 pages; "custom" 326 times | 60/63 |
| **Done for you / time back** | "WebFX is the 'do-it-for-me' agency" (tiktok_advertising); "Reclaim your work day" (email design, conversion design, maintenance); "Time. Effort. Headaches. You save it all" (social_media_services) | about 40 |
| **One roof, full service** | "Hiring multiple marketing companies creates chaos" (tiktok_advertising); "Forget the complexity (and cost) of hiring multiple agencies" (web_design_ecommerce) | 34 ("full-service" on 34 pages) |
| **Dedicated person** | "dedicated" 214 times on 62 pages; "You'll hear from us weekly, if not more" (web_design_services) | 62 |
| **Transparency** | "Transparent X Pricing" H2 (24 pages); "Pricing for our conversion-focused design work is 100% transparent" (conversion_design) | 31 |
| **Scale and longevity** | "750+ DIGITAL EXPERTS · 30-YEAR TRACK RECORD · 1,100+ REVIEWS" ribbon (54) | 54 |
| **Human craft over AI (content only)** | "Content written by professionals, not AI" (4 content pages), while the same pages sell "IBM Watson AI data that informs professional copywriters" | 4 |

### 3.2 Differentiation logic

WebFX differentiates on **infrastructure** (RevenueCloudFX, "$500K+ BUILT-IN VALUE based on the cost of similar tools") and **scale** (headcount, years, reviews), not on craft or point of view.

The comparison table sets up two straw men that are identical on 47 pages:
- **In-House Marketing:** "One or two team members trying to keep up with fast-paced marketing advancements".
- **Typical Marketing Agency:** "Third-party tracking and analysis with subscription costs passed to you", "Cookie-cutter checklists and solutions".

The table never names a real trade-off, such as a specialist boutique being faster or more senior. It also never says who WebFX is *not* for.

### 3.3 How sub-service pages specialise the message

Sub-pages change only four slots. The rest is shared.

1. **Hero statistic about the platform or problem.** "With more than one billion active users each month, Instagram..." (instagram_marketing); "Did you know that there are over 250 million people on Pinterest?" (pinterest); "300 million people actively use Snapchat every month" (snapchat); "Did you know a staggering 74% of people use social media to make purchase decisions?" (ecommerce_advertising); "With the average attention span of today's Internet users peaking at about eight seconds" (explainer_videos). These stats are generic, often dated, and unsourced.
2. **The "includes" list.**
   - Instagram: "1. One-of-a-kind posts ... 3. Aggressive ad campaign ... 8. Daily monitoring".
   - TikTok: "Ad account setup and optimization, Custom TikTok video creation, Mobile optimized ads, Installation of network tracking pixels".
   - Email: "Custom campaign and targeting strategy, Email subscriber list management and segmentation, Professional email copywriting, Custom design and creative theme development, Subject line testing, Full-funnel lead and ROI tracking".
3. **Pricing factors.**
   - Social: "Your Budget / Networks Included / Creative Assets Needs".
   - Email: "Email Frequency / Email Copywriting / Custom Email Design".
   - CDP: "Contact List Size / Monthly Website Visitors / Call Tracking Needs".
   - Chatbot: "Setup Needs / Number of Subscribers / Page Promotion".
   - Web: "Website Functionality Needs / Project Timeline / Digital Marketing Needs".
   This is the most genuinely specialised element.
4. **Keyword in every templated H2** ("Your search for Pinterest advertising services ends here").

**Martech vendor pages** specialise by selling the RevenueCloudFX integration ("By connecting sales and marketing data, 380+ clients (and counting!) have been able to drive an average lift of 20% or more in digital marketing ROI", hubspot_consulting). They gate the offer: "$1,000+ /month, digital marketing services ($3K+/month) required". The consulting is a wedge for the retainer.

**Size/model pages** change little beyond the keyword. The SMB page lists the same deliverables as the hub. The ecommerce page promises "Magento" and "Visa, Mastercard, American Express" rather than conversion rate, AOV or checkout.

### 3.4 How "creative" is sold

Creative is framed in three ways. Only the rarest one is revenue.

| Frame | Examples (slug) | Share |
|---|---|---|
| **Brand consistency / look** | "Good social media marketing is all about high-quality content and consistent branding" (social_media_services_design); "Color scheme that matches the company's website" (design); "stellar, modern email design work" (email design); "Your website is a revenue gateway" (web hub, the exception) | Dominant on design, infographic and explainer pages |
| **Units and add-ons** | "Custom Images per Month 8 / 10 / 12", "Vertical Content Creation Add $1,200/month" (social hub); "Social Ad Creatives: Copywriting & Design Up to 2 sets / Up to 4 sets" (advertising, TikTok); "Starting at $1,200/video per month" (explainer); "We provide our social media design services as an add-on to our social media management or advertising plans" (design); "While we don't offer one-off video production" (content hub) | Every pricing table |
| **Creative as a performance lever** | "Our optimization process is built around getting 1% better every month. That means testing new creatives and messaging to see what converts best" (social hub, Alicia L.); "#HOWWEDIDIT ... Test New Creatives & Bidding Adjustments / Test New Landing Pages ... 500% INCREASE IN CONVERSIONS MOM" (social hub); "Ad copy and design performance testing", "Dynamic ad format testing" (Pro/Enterprise table); "Earn a higher ROI from email with an effective design that leverages conversion rate optimization (CRO) best practices" (email design); "Monthly creative CRO analysis" (personalized content) | A handful of lines on about 6 pages |

**Missing entirely:**
- Hook rate, thumb-stop, creative fatigue, and creative volume or refresh cadence.
- Creator/UGC sourcing and whitelisting or partnership ads.
- Concept testing frameworks, and creative-to-landing-page message match.
- CAC or ROAS by creative.

The influencer page comes closest to a creator model ("campaigns that focus on Nano, Micro and Mid-Tier Influencers tend to have a higher conversion and engagement rates compared to Celebrities!"). Even there it sells process ("Create your creative brief") and shows no content.

**Opening for MMC:** sell creative as the main variable in paid social efficiency, shown with real ads and a testing system. WebFX does not occupy this position.

---

## 4. Copy style

### 4.1 Headline formulas

**H1 (63 pages)**

| Formula | Examples (slug) | Count (approx.) |
|---|---|---|
| `[Service] Services` (bare) | "Snapchat Advertising Services", "Twitter Advertising Services", "Instacart Advertising Services", "Site Speed Optimization Services", "Website Conversion Design Services" | 8 |
| `[Trust adjective] [Service] Services for Your Business` | "Trusted Instagram Marketing Services for Your Business", "Trusted Pinterest Advertising Services for Your Business", "Performance-Driven LinkedIn Advertising Services for Your Business" | 7 |
| `[Service] Services: [Outcome]` | "Ecommerce Social Media Advertising Services: Grow Your Sales", "B2B Web Design Services: Grow Your Revenue", "Professional Web Design Services: Get a Site That Drives Revenue" | 10 |
| `[Service] Services That [Outcome / number]` | "Email Marketing Services That Convert Inboxes Into Revenue", "Content Marketing Services That Boost Traffic by Over 10%", "Microsoft Dynamics 365 Marketing Automation Services That Drive Real ROI" | 8 |
| `[Service] [Services] From WebFX` | "Social Media Design Services From WebFX", "Email Design Services From WebFX", "Website Security Analysis From WebFX" | 5 |
| Outcome-first / productised | "Get a New Website in 30 Days" (rainmakerfx), "Drive Revenue With a Seasoned Video Marketing Agency" (video) | 3 |

The H1 contains the exact service keyword on 60 of 63 pages. The title equals the H1 on 9 pages.

**H2 (templated)**

| H2 template | Pages |
|---|---|
| "FAQs about [X] services" | 57 |
| "Your search for [X] services ends here" | 56 |
| "Solving key challenges for businesses" | 49 |
| "Unlock a [25]% greater marketing ROI with WebFX's award-winning [X] team" | 44 |
| "Pricing custom to you." + "Starting at $[X] per month." | 38 |
| "What do our [X] services include?" (incl. "your"/no pronoun variants) | 28 |
| "Transparent [X] Pricing Tailored to Your Business Goals" | 24 |
| "Get the [X] services you need with WebFX" | 6 |

### 4.2 Title tag and meta description formulas

- **Title:** `[Service] Services | [proof or benefit chip] | WebFX`. Examples: "Responsive Web Design Services | 1K+ Sites Launched | WebFX", "Influencer Marketing Services | 1K - 1+ Million Followers | WebFX", "Blog Writing Services | 100+ Specialized Writers | WebFX".
  - 53/63 titles contain "Services", 31 use pipes, 30 carry the brand, 20 carry a number.
  - Length: median 56 characters, range 37-65.
- **Variants:**
  - Bracket CTR bait: "Social Media Marketing Services [Boost Social ROI by 20%]", "Top Social Media Advertising Services [Boost Sales by 14%]".
  - Listicle bait on commercial pages: "3 Reasons to Invest in Pinterest Advertising Services", "5 Tips for Finding the Best Snapchat Advertising Services".
  - Year freshness: "Email Design Services: What Works In 2026?", "AI Solutions for Businesses: Turn AI into ROI in 2026".
- **Meta description:** `[Question hook]? [Service] from WebFX can [benefit]. Learn more here!`
  - Length: median 134 characters.
  - 46/63 name WebFX, 35 end with "!", 34 carry a CTA verb, 19 open with a question ("Looking for...?", "Want to...?", "Need...?"), 29 name an outcome word.
  - Examples: "Want to promote your business on TikTok? TikTok advertising services can help you market your company effectively. Learn more here!" (tiktok); "Ready to turn your inbox into a revenue machine? WebFX's top-rated email marketing services drive 14% more sales on average. Get a custom proposal now!" (email).

### 4.3 Voice and mechanics

| Metric | Value |
|---|---|
| Second vs first person | "you/your" 38.3 per 1,000 words vs "we/our/us" 27.2 |
| Brand self-reference | "WebFX" 1,119 times, 11.3 per 1,000 words (about 18 per page) |
| Sentence length (non-boilerplate lines of 8+ words) | Median 14 words, p75 20, 9.3% over 25 words. Readable, but padded with qualifiers ("award-winning", "industry-leading", "unprecedented") |
| Core keyword density | Median 5.8 exact-phrase uses per 1,000 deduped words. Highest: "AI solutions" 17.5, "website maintenance services" 11.5, "UX design services" 9.7, "influencer marketing services" 9.4. The web design hub uses "web design services" 22 times |
| Keyword stuffing tells | Awkward exact-match phrases: "website copywriter services", "Your search for a CMP platform ends here", "our Instagram marketing company", "Social media consultation services don't stop once..." |
| Em dashes | 111 in body copy (MMC must not copy this habit) |
| Errors on live pages | "Website maitenance" (web_development_services H3), "Techical support" (website_maintenance), "Strategies let and executed" and "a a full-service" (email_marketing_services), "resonsive" (responsive_web_design FAQ), "AI Agent Development AI Agent Development Services" (H1, ai_agent_development), "Why choose WebFX"s" (conversion_design), "Unmatched client testimonial" (influencer H4), "cannibilization" (content hub, copywriting) |
| Dated references | "Flash or jQuery home page header", "Google Website Optimizer set up" (conversion design table); "Websites Launched in 2023 Alone"; "Twitter Advertising Services"; "nearly 336 million monthly active users" |

### 4.4 CTA wording

- **Primary CTA:** "Send Me a Proposal" (167 instances on 61 pages).
- **Nav CTA:** "Get a Proposal" (131).
- **Price-strip CTA:** "Request a Free Proposal" (38).
- **Pricing-card CTA:** "Get My Custom Quote" (21).
- **Secondary CTAs:** "Check out our client testimonials" (96 on 48 pages), "View Full Portfolio" (9), "See Pricing" (9), "GET STARTED" (13, on tables), "See the Theme" (5, RainmakerFX), "Read Full Case Study" (6).
- **Framing:** the ask is always a *proposal* and first-person ("Me", "My"). Proposal/quote CTAs total 441 vs 110 "learn/discover" CTAs. No page offers a smaller step such as an audit, teardown, sample or call slot. The single "Enter your website" field acts as the micro-commitment.

### 4.5 Verbatim lines: strong and weak

**Strong (worth learning from)**

1. "At the end of the day, conversions are all that matter – you can have all of the traffic in the world, but it's worthless if none of it yields you paying customers or clients." (web_design_services_conversion_design). A clear stance in the first line.
2. "Our optimization process is built around getting 1% better every month. That means testing new creatives and messaging to see what converts best." (social_media_services, Alicia L., Senior Account Executive). A named operator explaining a method.
3. "Feeling stuck on social? Social media consulting helps you stop wasting time on posts that don't convert." (social_media_services_social_media_consulting). It names the pain.
4. "Stop settling for likes without leads. Start making social your most profitable channel." (social_media_services_social_media_consulting). Short and parallel.
5. "Forget creating graphics in Canva or troubleshooting HTML. With our design team, email becomes a breeze." (email_marketing_services_design). A concrete job the buyer hates.
6. "We don't typically recommend organic social media posts without social media advertising." (social_media_services). An opinion inside a pricing card.
7. "Who will own my website? You will! At WebFX, we do not own our clients' websites, and do not recommend hiring an agency that requires ownership" (web_design_services_redesign). A real objection answered.
8. "Please keep in mind that your business doesn't need to be promoted by a celebrity to be successful." (social_media_services_influencer_marketing). It resets expectations.
9. "Better visibility. Higher conversion rates. That's the power of WebFX's website redesign services" (web_design_services_redesign). A rhythmic hero.
10. "While we don't offer one-off video production, we do have a team of video experts..." (content_marketing_services). Honest scoping.

**Weak (avoid)**

11. "WebFX's Instagram marketing services are more than just a service; it's a comprehensive toolkit for unleashing triumph in the dynamic realm of Instagram." (social_media_services)
12. "Your company's success narrative on this platform is enhanced, fortified, and elevated with precision and expertise, ensuring every element for conquest is within your grasp." (social_media_services). Machine-sounding filler on the hub page.
13. "3. Aggressive ad campaign" (social_media_services_instagram_marketing). A deliverable that is not a deliverable.
14. "Unlock a 25% greater marketing ROI with WebFX's award-winning social media team" (identical H2 on 14 pages, including Snapchat, Instacart and chatbot). Unsourced and unspecific.
15. "The combined power of IBM Watson and RevenueCloudFX is unprecedented." (social_media_services_influencer_marketing)
16. "Transparent Social Media Pricing for Ecommerce Businesses Looking to Increase Awareness for Their Products" (social_media_services_ecommerce_advertising). A 14-word H2 whose outcome (awareness) contradicts the H1 ("Grow Your Sales").
17. "Your search for a a full-service email marketing agency ends here" (email_marketing_services). Template seams showing.

---

## 5. Proof inside these pages

### 5.1 Inventory

| Proof type | Coverage | Specifics | Verifiability |
|---|---|---|---|
| **Stat bar: satisfaction and retention** | 59 / 54 pages | "93% CLIENT SATISFACTION SCORE Industry average: 72%"; "91% RETENTION RATE Industry average: 50%"; NPS "HIGHER NPS® SCORE THAN Industry average: 16" (48). Elsewhere "client recommendation score that's 488% higher than the nationwide average" (6) | Low. No survey method, date or source for the industry averages |
| **Third-party ratings** | 60 | "Rated 4.9/5 stars on Clutch" (60); "Rated 4.8/5 stars on G2" (47) vs "Rated 4.9/5 stars on G2" (13) | Medium. Checkable off-site, but inconsistent on-site |
| **Review count** | 54 / 48 | "1,100+ REVIEWS" (54) vs "based on over 550 third-party reviews" (48) vs AggregateRating reviewCount 441 (schema, 12 pages; 1100 and 397 on others) | Low. Three different numbers |
| **Testimonials** | All | Only **18 unique quotes** across 63 pages. Three generic quotes on 47-49 pages each ("Web traffic is up well over 100% and our marketing qualified leads are more than double...", with no name). "Flavia A, Review from Clutch.co" is the hero quote on 46 pages ("I have 16 years of industry experience, and WebFX is the best agency I've ever worked with.") | Low. First name and initial, never service-matched |
| **Client stories (carousel)** | 48-49 | Hurst Pediatric Dentistry "540% Increase in leads from organic search"; Merrimack Valley Psychological Associates "2X Revenue in six months"; Net Friends "2X Increase in website traffic and leads". SEO outcomes shown on email, TikTok, UX, security and chatbot pages | Medium (named, linkable) but **irrelevant to the page** |
| **Anonymised case cards** | 4 hubs | Web: "Manufacturing: Packaging ... Website Redesign, SEO ... 148% INCREASE IN SEO CONV RATE". Social: "Ecommerce: Lifestyle ... Identified Campaign Opportunity That Had Low Purchases and High Ad Frequency / Expanded Traffic Retargeting to Include Shop Engagers ... 270% INCREASE IN REVENUE". Content: "Health Ecommerce ... 32% INCREASE IN ORGANIC REVENUE YOY" | Low (no name, baseline or period), but **the lever lists are persuasive** |
| **Named case studies** | 1-2 | Cleveland Brothers "37% increase in conversions" (redesign); video page "236% Increase in organic sessions / 198% Increase in organic transactions" with "Read Full Case Study" | Medium |
| **Expert voices** | 7 | Paige M. (Digital Content Analyst), Alicia L. (Senior Account Executive), Karley Ice-Kalinay (Director of Social & Media Advertising Operations), Jaci R. / Jaci Reinbold (Design Team Lead / Coach), Danélle W. (Website Design Expert), Nikki Bonner (Project Manager) | Medium. Real names help E-E-A-T. The quotes are opinions, not proof |
| **Scale claims** | 20-56 | "$10 billion" in revenue (26 pages) vs "$6 billion" (6: influencer, explainer, content creation); header "REVENUE DRIVEN FOR OUR CLIENTS $10,085,355,239+"; "24 million leads"; "14.9 million ecommerce transactions"; "3,212,407 hours of expertise"; "165K SOCIAL POSTS FOR CLIENTS"; "$15.7M SOCIAL AD SPEND Managed on Facebook & LinkedIn"; "22.8K CONTENT PAGES WRITTEN in the last 12 months" | Low to medium. Precise-looking but inconsistent |
| **Tech ROI claims** | 44 | "25% greater marketing ROI" (36), "20% increase in ROI" (8), "14% AVERAGE LIFT IN SALES From Email", "10% AVERAGE INCREASE in organic traffic with ai-powered content" | Low. No methodology |
| **Awards** | 52 | "award-winning" (89 uses). "120+ DESIGN AWARDS" next to "more than 45 design awards over 12 years" (web hub); "45 Gold, Silver, and Bronze Design Awards Won" (9 pages) | Low |
| **Partner badges** | 1-2 | "WebFX, a Meta Business Partner" (ecommerce advertising) | High, but underused |
| **Portfolio** | 9 | The same 6 tiles (see 2.4) | Medium (real clients). No outcomes |
| **Expectation tables** | 1 | Site speed "Typical page speed score increases" by starting score ("Current website speed test score of less than 25%: Average of 15% to 30% increase / 20% to 35% / 25% to 50%") | High in intent. It sets honest ranges and even says "Depends. Some sites max at ~75%-~80% due to 3rd party ad scripts" |

### 5.2 Takeaways

- WebFX wins on **volume of proof signals** and loses on **relevance and consistency**. Every page shouts numbers, but a careful buyer finds contradictions within one scroll (750+ vs 500+ experts on 47 pages; 25 vs 30 years on 4 pages; $6bn vs $10bn; review counts).
- The **most credible devices are the least used:** lever lists ("#HOWWEDIDIT"), named expert operators, the site speed expectation table, the ownership FAQ and partner badges.
- MMC's four published figures, used consistently and each with a one-line definition, will read as *more* trustworthy than WebFX's forty.

---

## 6. Conversion design

### 6.1 CTA count and placement

- **Volume:** CTAs excluding nav, carousel arrows and phone run 5-18 per page (median 10). The header phone number (888-874-2601) and "Get a Proposal" appear on all 63 pages.
- **Phone inconsistency:** 888-256-9448 appears on 7 pages and 717-423-8848 on 2. That breaks call tracking and trust.

Typical placement ladder on a sub-service page:

| # | Location | CTA | Page share |
|---|---|---|---|
| 1 | Header | "Get a Proposal" + phone | 63/63 |
| 2 | Hero | "Send Me a Proposal" + "Enter your website" field | 61 |
| 3 | Inside the includes tab | "Send Me a Proposal" | about 45 |
| 4 | Pricing card | "Get My Custom Quote" | 21 |
| 5 | Price strip | "Request a Free Proposal" | 38 |
| 6 | After benefits/process | "Send Me a Proposal" | about 40 |
| 7 | Closing paragraph | "Contact us online or call us at 888-874-2601" | 37 |
| 8 | Review badge | "Check out our client testimonials" | 48 |
| 9 | Tier table | "GET STARTED" per column / "Need more information? Call Us" | 9 |
| 10 | Footer | "Discover how we can help your business grow / Send Me a Proposal!" | 63 |

### 6.2 Forms and fields

| Form | Pages | Fields |
|---|---|---|
| Hero/footer micro-form | 63 (2 instances each) | One field: "Enter your website" |
| Proposal form ("Request a FREE Proposal Now!") | 9 web/dev pages | Name*, Email*, Phone Number*, Company*, Website*, Quote Details, plus hidden fields `ajs_anonymous_id`, `cf_country`, `mcfxlp` (20 inputs in total) |
| Web design cost calculator | 9 | See 6.3 |

The one-field website capture is WebFX's main lead-friction reducer. The URL is enough for a sales team to research before calling.

### 6.3 Interactive pricing: the web design cost calculator

"Need Ballpark Pricing? Use Our Website Design Services Calculator. Get a free, accurate, and instant quote." "Use the drop-downs below to indicate your needs, then click the 'See Pricing' button for a free, instant quote."

| Dropdown | Options |
|---|---|
| Number of Pages | 1-10 / 10-50 / 50-150 / 150-250 / 250+ |
| Responsive Design | Yes |
| Style of Design | Simple / Moderate / High end / World class |
| Database Integration | Basic / Advanced / Full |
| Copywriting # of Pages | 5-10 / 10-25 / 25-50 |
| E-Commerce Functionality | Basic / Advanced / Enterprise |
| SEO with Placement Guarantee | 30 / 80 / 150 |
| CMS | Standard / Advanced / Enterprise |

It appears on the web hub, B2B, ecommerce, SMB, WordPress design, redesign, CMS and WordPress dev, and a dedicated page `/web-design/learn/website-design-cost-calculator/` is linked from 9 pages.

**Weaknesses:**
- The inputs are agency-centric (page counts, "World class"), not buyer outcomes such as catalogue size, integrations or launch date.
- "SEO with Placement Guarantee" is a risky promise.
- Nothing ties the calculator to results or payback.
- The result is gated behind "See Pricing" and the proposal form sits directly below it.

**Nearby price anchors:** "Starting at $8,000 / site"; "Project needs often vary from ~3 months all the way to 12 months"; "12 weeks on Average to Build a Custom Website"; RainmakerFX "Website built in WordPress within 30 days of receiving content" with "3 design hours" and "5 theme options".

### 6.4 Pricing anchors and tier tables

**Starting prices seen** (38 price strips, 22 pricing cards):

| Service | Starting price |
|---|---|
| Social management / design / consulting / influencer / Instacart / AI & martech retainers | $3,000/month |
| Paid social (FB, LinkedIn, TikTok, Pinterest, Snapchat, Twitter) | 15% of ad spend |
| Ecommerce paid social | $1,080/month ("fixed fee, or a dynamic fee (18% of ad spend)", "Minimum recommended ad spend is $2,000/month") |
| Enterprise social | $2,250/month |
| Messenger chatbot | $1,150/month |
| Content, copywriting, infographics, explainers | $2,000/month (explainer strip: $1,200/video) |
| Expert copy | $300/page |
| SEO content | $600/month |
| Personalization | $250/month |
| Email management | $300/month ("Custom email solutions are available at $150 per hour") |
| Email design | $1,000/design |
| CDP | $500/month |
| Site speed | $1,800/month |
| Maintenance | $300/month |
| Web design | $8,000/site; conversion design $6,000/site |
| WordPress dev | "$16,000 per month" (strip) |

**Contradictions on the same page:**
- Infographics: card $2,000/month vs strip $3,000.
- Influencer: $750/month vs $3,000.
- MOFU/BOFU: $2,000 vs $1,000.
- Web design sub-pages: "per month" where the hub says "/ site".

**Tier tables with deliverables per tier:**

| Page | Tiers | Deliverables that scale | Price |
|---|---|---|---|
| social_media_services | BRONZE / SILVER / GOLD | Posts per month 10 / 20 / 30; custom images 8 / 10 / 12; networks 1 / up to 2 / up to 3; FuelFX assets 1 / 1.5 / 2; consultations 1 / 2 / 4; boosted posts 2 / 4 / 6 (spend $100 / $200 / $300); "48 Business Hour or Less Customer Response Time"; vertical content "Add $1,200/month" | Setup $4,650 / $6,525 / $7,500; ongoing $3,150 / $4,425 / $5,100 |
| social_media_services_advertising, tiktok_advertising | Pro / Enterprise | Networks: pick 2 / 3 plus programmatic; campaigns up to 8 / 10; "Social Ad Creatives: Copywriting & Design Up to 2 sets / Up to 4 sets"; display creatives (one time) 16 / 24 ads; CTV 1x15s / 15s+30s; consultations up to 2 / 4; comment monitoring add $300 / $600; "All social assets managed through client-owned accounts" | Month 1 $1,975 / $4,250; months 2+ "$975 or 15% of ad spend, whichever is greater" / "$4,500 or 12%"; ad spend $1,000-$30,000 / $30,000+ |
| content_marketing_services_blog_writing | SEO Copy / Powered Up SEO Copy | ~500 words; research time 60 / 120 mins; E-E-A-T, YMYL, persona matching and industry editor on the higher tier | $300 / $450 per page |
| content_marketing_services_seo_content_writing | Report / report + outline | Pages analysed up to 6 / up to 1 | $600 / $150 |
| web_design_services_conversion_design | Basic / Enhanced | Pages up to 25 / 50; multivariate elements up to 10 / 20; funnel elements 6 / 12; audit 10 / 30 hours; heatmaps, click stream, user testing | $6,000 / $9,000 |
| web_development_services_site_speed_optimization | Bronze / Silver / Gold & Ecommerce | Initial hours 25 / 40 / 50; quarterly hours 15 / 25 / 35; best fit under 250 / under 500 / 500+ pages; host migration one-time $1,500 | Initial $3,125 / $6,250 / $3,750; monthly $1,800 / $3,600 / $4,800; plus a "Typical page speed score increases" table |
| web_development_services_website_maintenance | 3 cards | WordPress Security (daily scans, backups, quarterly patches) > Enhancements ("Bucket of hours each month") > Proactive (firewall, quarterly UX testing, monthly consult) | $350-$550 / $975-$4,500 / $2,650-$4,500 per month |
| email_marketing_services | 2 plans | "Client-Provided Copy" vs "With Professional Copywriting"; "test the emails on 24 clients" | Custom at $150/hour |

**Why the tables work:**
- They convert an intangible retainer into countable units (posts, images, sets, hours, consultations).
- They publish **minimums and ad-spend bands**, which filters leads.
- They state **exclusions**: "The advertising does not include any other ads such as traffic ads, lead ads, shopping feed ads, marketplace ads" and "What don't website maintenance services include?".

**Why they undercut the performance story:** creative is capped at "2 sets" of ads a month, which is low for any serious Meta account.

### 6.5 Objection-handling FAQs

Totals: 386 question headings, a median of 5 per page (range 1-19). Theme assigned by first match.

| Theme | Questions | Pages | Typical wording |
|---|---|---|---|
| Definition ("What is/are X?") | 101 | 48 | "What are social media marketing services?", "What is drip marketing?", "What is HubSpot CRM?" |
| Includes / deliverables | 56 | 43 | "What do our X services include?" (28 normalised repeats) |
| Why hire / do I need an agency | 51 | 37 | "Why hire a social media management agency?", "Do you need an email marketing management service provider?", "Is social media consulting worth it?" |
| Cost | 40 | 33 | "How much do X services cost?" (12 exact repeats), "What determines the cost of social media marketing services?" |
| How it works / process | 16 | 13 | "How do your web design services work?", "What is WebFX's process for influencer marketing?" |
| Platforms / types / tools | 15 | 13 | "What platforms do web design companies work with?", "What ecommerce platforms do you offer social integrations for?" |
| What an agency does | 12 | 10 | "What does a web design agency do?" |
| Benefits / importance | 11 | 11 | "Why is email design important?" |
| Best agencies / choosing | 7 | 7 | "What are the best web design agencies?", "What should I look for in a Facebook advertising agency?" |
| Timeline | 4 | 4 | "How long does a website redesign take?", "How long does a CRM integration take?" |
| Results / measurement | 4 | 4 | "What metrics do Facebook ad services measure?" |
| Difference / comparison | 3 | 3 | "What's the difference between web development and web design?" |
| Ownership / contract / ongoing | 3 | 3 | "Who will own my website?", "Do web design services include domain and hosting setup?" |
| Other (topic education) | 63 | 30 | "What are micrographics?", "What is TOFU, MOFU, and BOFU content?" |

**Read-out:**
- The FAQs are built for **SEO definitions and "cost" queries**, not for objections.
- Few questions touch contract length, lock-in, account ownership (only redesign and "client-owned accounts" in the ads table), what the client must provide (only AI MMM: "What level of involvement do you require from clients?"), time to results, guarantees ("Is 100% ADA compliance guaranteed?"), creative approvals or reporting cadence.
- The redesign page is the exception. It has a separate "FAQs on working with WebFX" block (ownership, speed, team, communication) before its topical FAQs. That is the model to copy.

---

## 7. SEO and AI-search mechanics

### 7.1 Schema

| Type | Pages | Note |
|---|---|---|
| WebPage, BreadcrumbList, WebSite + SearchAction, Organization, ImageObject | 63 | Yoast-style graph |
| VideoObject | 45 | Agency explainer videos |
| Service | 15 | Copy-paste errors: social hub and web design hub declare Service names "SEO Services" / "Content Marketing Services"; LinkedIn page declares "Facebook Advertising Services"; maintenance "Website Maitenance Services"; web dev hub includes "Shopify Ecommerce Development Services" |
| FAQPage + Question/Answer | **12** | Despite 57 pages with FAQ blocks |
| AggregateRating | 12 | ratingValue 4.9, reviewCount 441 (one page says 1100, one 397) |
| Product + Brand + Offer | 10-11 | Services marked up as Product, likely to win review stars (policy risk) |
| LocalBusiness + PostalAddress + GeoCoordinates + OpeningHours | 10 | On hub-type pages |
| OfferCatalog / UnitPriceSpecification | 8 / 3 | AI integration and AI MMM encode "price 3000" |

### 7.2 Keyword targeting

- One exact-match head term per URL, repeated in the title, H1, 3-5 templated H2s, the FAQ header and the link-block header. Median 5.8 uses per 1,000 words.
- Long-tail capture is attempted through FAQ definitions, "cost" questions and listicle-style titles.
- Year stamps ("in 2026", "results in 2027!") signal freshness.

### 7.3 AI-search (AEO/GEO) signals

- **Definition-first heroes on recently refreshed pages.** "Enterprise social media advertising services help large organizations manage paid campaigns across LinkedIn, Meta, TikTok, YouTube, and other leading platforms." "AI and GPT integration services help businesses connect tools like ChatGPT with CRMs..." "Site speed optimization services improve Core Web Vitals, reduce load times, and remove performance bottlenecks..." "Influencer marketing is a digital marketing strategy where brands partner with creators..." These are written to be quoted verbatim by answer engines.
- **First FAQ answer visible, the rest collapsed.** "Web design services include planning, designing, building, and optimizing websites for user experience, responsiveness, SEO, and conversions." In the crawl only 2 of 11 answers on the web hub and 2 of 18 on social expose text. Without FAQPage schema on 51 pages, much of that Q&A may be invisible to extractors.
- **A dedicated AEO product** in content: "Brand Content Placement Services ... optimize your content for AI-generated search results". The nav also links AI search optimization, ChatGPT optimization and GEO blog posts.
- **Table of Contents jump-link block** on 54 pages.

### 7.4 Internal linking

- Strong silo linking with pricing and blog satellites (see 1.3).
- Weak cross-discipline linking: social rarely links web, CRO or email; creative pages never link paid social results.
- Tool pages (cost calculator, ROAS calculator, conversion rate calculator) are linked from nav or 9 pages, not woven into the relevant service copy.

### 7.5 Depth vs thin, and duplication

| Band | Pages |
|---|---|
| Deep, some original substance | Web hub (1,788 page-specific words), enterprise web (2,373), video (2,283), social hub (2,095), social consulting (1,774), content hub (1,716), website copywriting (1,624), site speed (1,555) |
| Thin or duplicate-heavy | Martech hub (106 page-specific words), social design (449), SMB web (434), CDP (740), consent management (500), email design (512), CRM integration (529), AI MMM (529), brand voice copy (544) |

- About 43% of an average page's deduped text is shared boilerplate.
- The same testimonials, carousel and comparison rows sit on 47-49 pages.
- SMB, ecommerce, WordPress, B2B and redesign share the same portfolio and calculator blocks.
- Staleness and errors (see 4.3) signal low maintenance.

**Net:** WebFX relies on domain authority and templated coverage breadth. Quality per page is uneven, which leaves room for a smaller site with fewer, deeper and cleaner pages.

---

## 8. What MMC should adopt, adapt and avoid

### 8.1 Adopt (take the mechanic as is)

| # | Mechanic | WebFX evidence | Why it works |
|---|---|---|---|
| A1 | **"How we scope and price" card** with 3 named cost drivers and an "Included in every engagement" list | 22 pages: "How we determine pricing / Your Budget / Networks Included / Creative Assets Needs" | Answers the first silent question (can I afford this?) without a rate card |
| A2 | **Deliverables-per-tier table** in countable units | Social hub: posts 10/20/30, images 8/10/12, consultations 1/2/4; Pro/Enterprise: "Up to 2 sets / Up to 4 sets" of ad creative | Turns a retainer into something a founder can compare line by line |
| A3 | **Stated minimums, fit bands and exclusions** | "Required Ad Spend Range $1,000 – $30,000 / $30,000+"; "The advertising does not include any other ads such as..."; "What don't website maintenance services include?" | Filters bad-fit leads and builds honesty credit |
| A4 | **Expectation table** that gives ranges by starting point, including "it depends" rows | Site speed "Typical page speed score increases" by starting score, with "Some sites max at ~75%-~80% due to 3rd party ad scripts" | Honest ranges beat hero numbers. It fits MMC's no-invented-results rule if framed as what MMC checks, not what MMC promises |
| A5 | **Lever lists on case cards** ("how we did it") | "#HOWWEDIDIT Identified Campaign Opportunity That Had Low Purchases and High Ad Frequency / Expanded Traffic Retargeting to Include Shop Engagers" | Shows thinking. MMC can publish levers without publishing results |
| A6 | **Named operator quote** with role | Alicia L., Senior Account Executive: "getting 1% better every month... testing new creatives" | E-E-A-T, human, quotable |
| A7 | **"Working with us" FAQ block** separate from topical FAQs | Redesign: "Who will own my website? / How soon can you redesign a website? / Who will I work with? / How will I stay informed?" | Handles the real objections |
| A8 | **Ownership statement** | "we do not own our clients' websites" and "All social assets managed through client-owned accounts" | High trust, zero cost |
| A9 | **One-field micro-commitment** in the hero | "Enter your website" on 63 pages | Low friction. MMC can pass the URL into its existing audit/booking modal |
| A10 | **Definition-first hero and first FAQ answer** (AEO) | "Site speed optimization services improve Core Web Vitals, reduce load times, and remove performance bottlenecks" | Gets quoted by answer engines |
| A11 | **Anchor tabs** under the hero (Deliverables · Pricing · Work · FAQs) | 16 pages | Long pages stay navigable on mobile |
| A12 | **Pricing, calculator and learn satellites linked from the service page** | "More on our X" blocks with Services / Pricing / Learn columns | Captures cost-research traffic and routes it back |

### 8.2 Adapt (right idea, wrong execution for MMC)

| # | WebFX version | MMC adaptation |
|---|---|---|
| D1 | Web design cost calculator driven by page counts and "World class" style | Put MMC's existing calculators **inside** the relevant service pages as the mid-page interactive step, rather than in a separate tools area. Frame inputs in buyer terms (AOV, orders, repeat rate, ad spend, conversion rate) and results as a *diagnostic range*, not a quote or a promise. Hand results into the audit modal. Name only calculators MMC actually has |
| D2 | Stat bar of borrowed trust (93% CSAT vs "industry average") | One **proof strip** carrying only MMC's four published figures, each with a short definition line: **8.7x** median blended ROAS, **₹248Cr+** revenue compounded, **14/14** clients renewed, **27 months** median tenure. Same wording, order and definitions on every page. No industry-average comparisons unless sourced |
| D3 | "In-House vs Typical Agency" straw-man table | An **honest fit table**: "MMC is a fit when... / Not a fit when..." (for example: no product-market fit yet, or wanting one-off assets without testing). Optionally "Do it in-house / Hire freelancers / Studio like MMC" with real trade-offs, including where in-house wins |
| D4 | Creative priced as add-on units ("Add $1,200/month", "2 sets") | Price creative by **testing capacity**: concepts per sprint, variants per concept, refresh cadence and formats (static, video, UGC). State that volume scales with spend. If MMC publishes pricing, use INR with GST noted, or publish only the cost drivers |
| D5 | Same six portfolio tiles everywhere | **Service-matched work only.** Creative page shows ads; Shopify page shows stores; retention page shows flows. Each tile carries brief > insight > what we made > what we tested. No metrics unless client-approved and verifiable |
| D6 | Reused SEO case studies on every page | Case cards per service, with levers and a client-approved outcome or none. If there is no approved number, show the process artefact (test matrix, flow map, CRO backlog) |
| D7 | "Your search for X ends here" reasons (Experience / Results / Technology / Reviews) | "How we work" principles tied to the service ("We brief creators on the offer, not just the product") |
| D8 | Proprietary platform pitch (RevenueCloudFX) | MMC's moat is operating practice, not software: creative testing system, blended reporting (ties to the 8.7x median blended ROAS definition), retention and Shopify under one roof. Show the stack MMC actually uses by name, and do not claim built-in value |
| D9 | Platform-split URLs (Instagram, TikTok...) | Split by **D2C job and India channel** rather than by every network: UGC ads, performance creative, WhatsApp retention, Shopify CRO, quick-commerce listing creative. Only create a sub-page when it has distinct deliverables, work and FAQs |
| D10 | FAQs = definitions + cost | Keep 1-2 definitions for AEO, then answer operational objections: timeline, minimum spend or catalogue fit, creator rights and usage, account ownership, approvals, reporting cadence, notice period, what MMC needs from the brand |
| D11 | FAQPage schema on 12 of 57 FAQ pages; Product schema used to farm stars | Service + FAQPage + BreadcrumbList on every service page. Render answers in HTML (not collapsed-only). No Product/AggregateRating markup for services |

### 8.3 Avoid

1. **Unsourced uplift claims** ("Unlock a 25% greater marketing ROI"), "industry average" comparisons and "award-winning" without naming the award. They breach MMC's honesty rules.
2. **Inconsistent numbers across pages** (750+ vs 500+; $6bn vs $10bn; three review counts). Keep one source of truth for the four figures (a single component or constant).
3. **Irrelevant proof** (SEO stories on email or TikTok pages).
4. **Keyword-swapped clones** with around 43% shared boilerplate, and thin hubs (martech hub, 106 page-specific words).
5. **Generic platform-stat heroes** ("over 250 million people on Pinterest").
6. **Purple filler** ("unleashing triumph in the dynamic realm of Instagram") and non-deliverables ("Aggressive ad campaign").
7. **Listicle or bracket titles on commercial pages** ("5 Tips for Finding the Best Snapchat Advertising Services").
8. **Em dashes** (WebFX has 111). MMC house rule.
9. **Multiple phone numbers and contradictory starting prices** on one page.
10. **Dated tech on the page** (Flash, jQuery headers, Google Website Optimizer) and unfixed typos. A studio selling craft cannot ship "Techical support".
11. **A single heavy ask** ("Send Me a Proposal" 10 times). MMC's audit modal plus calculators already give a ladder, so use it.
12. **"Placement guarantee" style promises** in calculators.

---

## 9. Recommended outlines for three MMC service pages

**Rules applied to all copy below:**
- No invented numbers. Only the four published figures, and only where their definition fits.
- No em dashes.
- Sentences short.
- Indian D2C context first. B2B, B2C and education are mentioned where relevant.

**Shared components across all three pages:**
- **Proof strip:** the four figures with definitions, identical everywhere.
- **Audit/booking modal:** primary CTA, prefilled with the website field.
- **Relevant calculators** embedded mid-page.
- **Schema:** "Working with MMC" FAQ block, Service + FAQPage + BreadcrumbList.
- **Cross-links:** each page links to the other two plus performance media.
- **Primary CTA label** (pick one and keep it sitewide): "Get a free growth audit" or "Book an audit". **Secondary CTA:** "Run the numbers" for the calculator.

### 9.1 Creative & UGC

**Positioning gap:** WebFX sells creative as brand consistency and add-on units. It never mentions UGC, and it shows no ads. MMC sells creative as the lever that decides what paid media can do, and shows the work.

| # | Section | Job | Content and copy direction (MMC voice) |
|---|---|---|---|
| 1 | **Hero** | Definition + stance + micro-ask | H1 direction: "Creative and UGC built to be tested, not just posted". Definition line for AEO: "Performance creative and UGC services plan, produce and test ad creative for Meta, Google, YouTube and marketplaces so paid spend finds winners faster." CTA: website field > audit modal |
| 2 | **Proof strip** | Consistent trust | The four figures with definitions. Keep 8.7x labelled "median blended ROAS across clients" and do not imply it came from creative alone |
| 3 | **Anchor tabs** | Navigation | What we make · How we test · Work · Scope & pricing · FAQs |
| 4 | **The problem, in the buyer's words** | Name the pain | "Your ads are not failing because the targeting is off. They are tired. Same hook, same format, same founder shot for eight weeks." Keep it concrete and unscolding |
| 5 | **What we make** (deliverables grid) | Scope + keywords | Static ads; video ads (hook-led edits, cutdowns for Reels/Shorts); UGC and creator content (brief, sourcing, scripting, shoot direction); founder and expert-led videos; product demos and unboxings; marketplace and quick-commerce listing creative; landing page modules matched to the ad. Each with one line on *when it earns its place* |
| 6 | **How we test** (system, not adjectives) | MMC's differentiator | A 4-step loop: Insight (reviews, comments, returns, sales calls) > Concepts (angles, hooks, offers) > Variants (formats, openings, CTAs) > Read and refresh (kill, iterate, scale). Show a sample test matrix graphic (angles x hooks x formats) with no results. Copy direction: "We brief on angles, not assets. A new colourway is not a new idea." |
| 7 | **Operator quote** | E-E-A-T | A named MMC creative strategist on how they pick hooks or brief creators. Real person, real role, an opinion rather than a result |
| 8 | **Work gallery** (service-matched) | Show, not tell | 6-9 real ads or UGC clips (with client permission). Each card: category (e.g. "D2C skincare"), brief in one line, the insight, what we made, what we tested. Add an outcome only if client-approved and verifiable; otherwise leave it out. Never recycle web or SEO work here |
| 9 | **UGC done properly** | Handle the India-specific risks | Creator selection (fit over follower count; WebFX's own line "your business doesn't need to be promoted by a celebrity" is the right instinct); usage rights and duration in writing; whitelisting/partnership ads permissions; regional language and Hinglish scripts; ASCI disclosure norms for paid collaborations; product seeding logistics |
| 10 | **Scope & pricing card** | Pre-qualify | "How we scope creative": (1) monthly media spend and number of platforms, (2) testing velocity you need (concepts and variants per cycle), (3) production mix (static, edited video, UGC shoots). "Included in every engagement": creative strategist, concept brief per cycle, variant naming and tagging for reporting, refresh calendar, raw file handover. Publish a starting INR price only if MMC decides to; otherwise say "Scoped after a free audit" |
| 11 | **Fit table** | Honest filtering | Fit: running or ready to run paid media; has a product people reorder or recommend; wants a testing rhythm. Not a fit: wants one hero brand film only; no budget to put behind creative |
| 12 | **Calculator** | Interactive step | Embed the most relevant existing MMC calculator (e.g. a ROAS, CAC or break-even style tool if MMC has one), framed as "See how much creative efficiency matters at your spend". Result > audit modal |
| 13 | **FAQs: working with MMC** | Objections | Who owns the raw files and creator content? How long do usage rights last? How many concepts a month? How fast is turnaround? Do you shoot or only edit? Can you work with our in-house designer? Do you need our ad account access? What do you need from us each cycle? |
| 14 | **FAQs: topical** (AEO) | Definitions | What is UGC advertising? What is performance creative? What is creative fatigue and how do you spot it? UGC vs influencer marketing: what is the difference? Answers of 40-70 words, rendered in HTML, with FAQPage schema |
| 15 | **Closing CTA** | Convert | "Send us your last 20 ads. We will tell you which to kill, which to iterate and what to test next." CTA: audit modal |
| 16 | **Related** | Silo + cross-link | Performance media (Meta, Google), Conversion & Technology (landing pages), Retention (post-purchase creative), relevant calculators |

**Meta direction.**
- Title: "Performance Creative & UGC Ads for D2C Brands | Monday Marketing Company".
- Description: "UGC, video and static ads built for testing on Meta, Google and marketplaces. See the work, how we test, and how we scope."
- Avoid the WebFX habits of exclamation marks and "Learn more here!".

### 9.2 Retention (email and WhatsApp)

**Positioning gap:** WebFX has 2 email pages built around newsletters and "Subject line split testing", and mentions WhatsApp, SMS, flows and abandoned cart zero times. For Indian D2C, WhatsApp is often the primary retention channel and COD/RTO matter. MMC owns "retention as a revenue system across email and WhatsApp".

| # | Section | Job | Content and copy direction |
|---|---|---|---|
| 1 | **Hero** | Definition + stance | H1 direction: "Retention that brings customers back, on email and WhatsApp". Definition line: "Retention marketing services design and run the automated flows, campaigns and segments that turn first orders into repeat orders across email and WhatsApp." CTA: website field > audit modal |
| 2 | **Proof strip** | Trust | Four figures. **14/14 renewed** and **27 months median tenure** are the most on-theme here (retention of clients mirrors the service) |
| 3 | **The leak** | Pain | "Most D2C brands pay to acquire the same customer twice. The second order should be the cheapest one you ever get." |
| 4 | **Flows we build** (deliverables grid) | Scope + keywords | Welcome and first-purchase; browse and cart abandonment; COD confirmation and RTO reduction nudges (India-specific); order and shipping updates that also sell; post-purchase education and review requests; replenishment and reorder reminders; win-back; VIP and loyalty; back-in-stock and launch alerts. Each flow: trigger, channel (email, WhatsApp or both), goal |
| 5 | **Channel roles** | Teach and differentiate | A two-column explainer, email vs WhatsApp. What each is good for, consent and opt-in rules, template approval on WhatsApp, frequency discipline, cost per message considerations. Copy direction: "WhatsApp is not a louder email. We use it where a reply or a quick decision matters." |
| 6 | **Segmentation & data** | Show thinking | RFM-style segments, first-order product, discount-seeker vs full-price buyer, COD vs prepaid. Name the platforms MMC actually runs (ESP, WhatsApp BSP, Shopify) and do not list tools MMC does not use |
| 7 | **Campaign calendar** | Tangible deliverables | Monthly cadence expressed as structure, not a promise (e.g. planned campaigns, flow reviews, test slots per month). Tie it to India's sale calendar (festive season, end-of-season sales) |
| 8 | **Creative for retention** | Cross-sell creative | Email design system, WhatsApp template copy, carousel and catalogue messages. Link to Creative & UGC |
| 9 | **Measurement** | Honest reporting | How MMC reads retention: repeat rate, time to second order, revenue from flows vs campaigns, unsubscribe and block rates. State that attributed flow revenue overlaps with other channels, and that is why MMC reports blended. Do not publish lift percentages |
| 10 | **Work** | Show | Flow maps and message screenshots (anonymised with permission): trigger > message 1 > wait > branch. No invented outcomes |
| 11 | **Scope & pricing card** | Pre-qualify | "How we scope retention": (1) list and customer base size and channels live today, (2) number of flows to build vs optimise, (3) campaign volume and creative needs. "Included in every engagement": flow audit, segmentation plan, template approvals handled, monthly flow and campaign review, deliverability and consent checks |
| 12 | **Fit table** | Filter | Fit: steady first-order volume; consumable or repeatable product; willing to collect opt-ins. Not a fit: very low order volume, or wanting blast campaigns without consent |
| 13 | **Calculator** | Interactive | Embed MMC's LTV, repeat-rate or retention calculator if one exists: "See what a small change in repeat rate is worth at your AOV". Result > audit modal |
| 14 | **FAQs: working with MMC** | Objections | Will you migrate our existing flows? Who owns the lists and templates? How do you handle WhatsApp opt-in and template approvals? How long until flows are live? Do you work with our current ESP? How often will you message our customers? What do you need from our team? |
| 15 | **FAQs: topical** (AEO) | Definitions | What is retention marketing? Email vs WhatsApp marketing for D2C: which first? What is an abandoned cart flow? How do you reduce RTO on COD orders with messaging? |
| 16 | **Closing CTA** | Convert | "Share read access to your store and ESP. We will map which flows are missing and which are leaking." |
| 17 | **Related** | Silo | Creative & UGC, Conversion & Technology (post-purchase and account pages), performance media, calculators |

**Meta direction.**
- Title: "Email & WhatsApp Retention Marketing for D2C Brands | Monday Marketing Company".
- Description: "Flows, segments and campaigns that drive repeat orders on email and WhatsApp. See what we build and how we scope it."

### 9.3 Conversion & Technology (Shopify, websites, CRO)

**Positioning gap:** WebFX sells page counts ("Number of Pages 1 – 10"), Magento and WordPress, and "$8,000 / site". It has no Shopify service page in this slice, a CRO table that still lists "Flash or jQuery home page header", and a portfolio of company bios. MMC sells Shopify builds and CRO that paid traffic can actually convert on, tied to the ads that feed them.

| # | Section | Job | Content and copy direction |
|---|---|---|---|
| 1 | **Hero** | Definition + stance | H1 direction: "Shopify stores and landing pages built to convert paid traffic". Definition line: "Conversion and technology services design, build and optimise Shopify stores, websites and landing pages, then test changes so more visitors buy or enquire." CTA: website field > audit modal |
| 2 | **Proof strip** | Trust | Four figures, with the same definitions |
| 3 | **Anchor tabs** | Navigation | Builds · CRO · Work · Scope · FAQs |
| 4 | **The problem** | Pain | "You can buy traffic by the lakh. You cannot buy back a slow product page or a checkout that asks for too much." |
| 5 | **What we build** | Scope + keywords | Shopify store builds and migrations; theme customisation and sections; landing pages matched to ad angles; websites for B2B, education and service brands (lead capture, forms and CRM hand-off); app and integration setup (only those MMC actually implements: payments, checkout, shipping, reviews, subscriptions); tracking setup (pixels, server-side events, GA4) |
| 6 | **CRO programme** | Differentiate from one-off redesigns | Research (analytics, heatmaps, session recordings, customer reviews) > hypothesis backlog prioritised by effort and impact > build and test > ship winners > next cycle. Show a sample backlog table with hypothesis wording only, e.g. "Show delivery date above the fold for pincode-entered users". WebFX's line "any postulation you make is a mere assumption" has the right idea; MMC says it plainly: "We test changes before we call them improvements." |
| 7 | **India checkout realities** | Local authority | COD vs prepaid nudges, pincode serviceability, delivery promise, trust badges and returns clarity, UPI flows, mobile-first speed on mid-range phones. Written as what MMC checks, not what MMC guarantees |
| 8 | **Speed & technical health** (borrow A4) | Expectation setting | A "What usually moves and what usually does not" table: heavy apps and scripts, image weight, theme bloat vs third-party limits. Ranges only if MMC has its own measured data; otherwise qualitative ("Big wins are common when apps pile up. Theme-level fixes help less if third-party scripts dominate.") |
| 9 | **Work gallery** | Show | Real stores and landing pages with permission. Card: category, what was broken, what we changed (screens of before and after layouts), what we tested. Outcomes only if client-approved and verifiable. **Before/after screenshots** are the clearest advantage over WebFX, which has none |
| 10 | **Ownership & handover** | Trust (borrow A8) | "Your store, your theme code, your apps, your accounts. We work in your Shopify admin with staff access and hand over documentation." |
| 11 | **Scope & pricing card** | Pre-qualify | "How we scope": (1) new build, migration or CRO on an existing store, (2) catalogue size and custom functionality, (3) testing volume and traffic level (CRO needs enough sessions to read results). "Included in every engagement": audit, tracking check, QA on mobile, launch checklist, training call, documentation |
| 12 | **Fit table** | Filter | Fit: running or planning paid traffic; enough sessions to test; willing to change pages based on data. Not a fit: wants a brochure site with no traffic plan; wants guaranteed conversion rates |
| 13 | **Calculator** | Interactive | Embed MMC's conversion rate or revenue-impact calculator if available: "See what a small change in conversion rate means at your traffic and AOV". Result > audit modal |
| 14 | **FAQs: working with MMC** | Objections | Do you build on Shopify only? Can you migrate from WooCommerce or a custom site without losing SEO? How long does a build take? Who owns the theme and code? Do you run A/B tests on low traffic? Will you work with our agency or in-house developer? What happens after launch? |
| 15 | **FAQs: topical** (AEO) | Definitions | What is conversion rate optimisation? Shopify vs custom website for Indian D2C? What should a D2C product page include? How do landing pages for ads differ from product pages? |
| 16 | **Closing CTA** | Convert | "Send us your top three paid landing pages. We will send back the first five things we would test." |
| 17 | **Related** | Silo | Creative & UGC (message match), Retention (post-purchase), performance media, calculators |

**Meta direction.**
- Title: "Shopify Development & CRO for D2C Brands | Monday Marketing Company".
- Description: "Shopify builds, landing pages and conversion testing for brands running paid traffic. See the work, the process and how we scope."

### 9.4 Cross-page build notes

- **One proof-strip component** holding the four figures and their definition text, so numbers can never drift (WebFX's biggest credibility leak).
- **One "working with MMC" FAQ source** reused where true: ownership, notice period, reporting cadence, team. Each service page adds its own operational FAQs.
- **Structure first, then length.** Aim for fewer, deeper pages. WebFX's median page has around 900 page-specific words. MMC can match that with real work, levers and FAQs, without clones.
- **Schema:** Service (name matches H1, provider Organization, areaServed India), FAQPage built from the rendered HTML answers, BreadcrumbList. No Product or AggregateRating on service pages.
- **CTA ladder:**
  1. Website field.
  2. Calculator.
  3. Audit modal.
  4. Booking.
  Keep the button label consistent. Do not repeat the same ask ten times.
- **Copy QA checklist before launch:**
  - No em dashes.
  - No numbers outside the four approved figures (plus client-approved case data).
  - No "award-winning" without naming the award.
  - No unsourced platform statistics.
  - Typo pass.
  - Every work sample matches the page's service.

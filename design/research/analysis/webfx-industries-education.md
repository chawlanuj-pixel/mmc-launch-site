# WebFX industries, locations and education pages: teardown, and the blueprint for MMC's education page

Slice: every `industries*` and `locations*` page in the WebFX corpus, with a deep dive on education. Corpus captured 2026-09-15.

---

## 0. Scope, method, caveats

**Pages in scope:** 104 in total: 94 `industries_*` and 10 `locations_*`.

**Read in full (29 pages):**
- **All 10 education pages:** hub, higher-education, private-schools, technical-schools, online-education, edtech, edtech/social-media, higher-education/social-media, higher-education/statistics, higher-education/education-marketing-roi.
- **19 other industry and location pages:**
  - Industry hubs: `industries`, `industries_healthcare`, `industries_home_services`, `industries_professional_services`, `industries_dealers_distributors`.
  - Sub-industry pages: `industries_healthcare_dentist`, `industries_tourism_hospitality_hotels`, `industries_real_estate_property_management`, `industries_industrial_oil_gas`, `industries_retail_ecommerce_ecommerce`.
  - Industry x service pages: `industries_real_estate_property_management_ppc`, `industries_home_services_landscaping_ppc`, `industries_professional_services_architecture_social_media`.
  - Locations: `locations`, `locations_lancaster_pa`, `locations_york_pa`, `locations_harrisburg_pa`, `locations_tampa_fl`, `locations_dallas_tx_ppc`.
- **Education content elsewhere:** `portfolio_case_studies_mwcc_case_study` and `digital_marketing_pricing_digital_recruitment` were read in full. 45 other pages were scanned in context via `edu_mentions.txt`.

**Helper scripts** (in `analysis/scripts/`):

| Script | Output | What it does |
|---|---|---|
| `inventory.py` | `inventory.jsonl` | Title, H1, words, H2 count, FAQ, CTAs, schema and link mix per page |
| `link_universe.py` | `link_universe.txt` | Every `/industries/` and `/locations/` URL linked anywhere in the 433-page corpus |
| `boilerplate.py` | `boilerplate.txt` | Verbatim duplicate lines per page group, plus 5-word shingle Jaccard for chosen pairs |
| `schema_probe.py` | stdout | FAQ, rating, LocalBusiness and date nodes |
| `edu_mentions.py` | `edu_mentions.txt` | Education terms outside the education pages |
| `edu_term_coverage.py` | `edu_term_coverage.txt` | Buyer-term counts in the body copy of each education page |

**Caveats:**
- The corpus cuts the stored JSON-LD string off at 6,000 characters, so schema type counts use the scrape-time `schemaTypes` field. Nodes late in the graph may be missing from the regex probes.
- Many FAQ accordions were captured as questions with no answer text. Where I say "answers not rendered", that describes the capture. The answers may load with JavaScript.
- No sitemap dump exists for WebFX (`webfx-urls.json` is empty). URL counts are therefore a lower bound, taken from links found in the corpus.
- Mediagarh facts come from the sibling analyses `analysis/mediagarh-business.md` and `analysis/mediagarh-proof.md`. MMC facts come from the repo (`MMC Site/content/clients.json`, `llms.txt`, `Industries.jsx`, `sitemap.xml`).

---

## 1. Architecture

### 1.1 Industry taxonomy

**Root: `/industries/`** (184 words)
- H1: "Resources for Your Industry".
- 22 group cards, each "View Resources".
- It is framed as a library, not a sales page: "we've compiled an enormous collection of resources on marketing written by experts".

**Level 2: group hubs, `/industries/{group}/`.** All 21 crawled. Four page generations coexist:

| Generation | Examples | Words | What is on it |
|---|---|---|---|
| Legacy resource list | automotive, education, finance, food-beverage, general, heavy-equipment, insurance, legal, local-consumer-services, real-estate, recreation, retail-ecommerce, tech, tourism (14 hubs) | 85 to 187 | H1 "Explore Digital Marketing Resources for the X Sector", one paragraph, H3 cards |
| Vertical landing hub | healthcare 1,472; home-services 712; industrial 1,360; manufacturing 1,375 | 700 to 1,500 | Stat bar, report download, list of sub-verticals (28 for healthcare, 33 for home services), challenge tabs, "Recommended Playbook" with "Pricing starting at", case carousel, full form with budget bands |
| Long guide hub | professional-services | 1,748 | Q&A guide including costs ("$1,000 to $10,000 per month"), plus 15 sub-industry cards |
| Service sales hub | dealers-distributors | 1,230 | Product/AggregateRating schema, "Starting at $3,000 / month", FAQ |

Franchises (403 words) sits between generations.

**Level 3: sub-industry pages, `/industries/{group}/{sub}/`.**
- 39 crawled.
- Median 1,988 words (range 435 to 3,352).

**Level 4: `/industries/{group}/{sub}/{service-or-resource}/`.**
- Leaf suffixes across the 226 depth-4 URLs linked in the corpus: `seo` 50, `lead-generation` 37, `social-media` 30, `ppc` 17, `statistics` 16, `web-design` 13, `agency` 5, `marketing-budget` 5, `marketing-ideas` 5, `local-seo` 4.
- Group x service pages also exist at depth 3 (`/industries/franchises/seo/`, `/industries/education/agency/`, `/industries/education/marketing-budget/`).

**Scale (lower bound):** 402 unique `/industries/` URLs are linked from the 433 crawled pages. By depth: 1 at depth 1, 22 at depth 2, 153 at depth 3, 226 at depth 4. WebFX's own copy claims "expertise in 200+ industries" (`industries_healthcare_dentist`).

**Taxonomy hygiene problems (evidence from `link_universe.txt`):**
- **Parallel trees:**
  - `/industries/health/` and `/industries/healthcare/`, both holding `doctors-offices-medical-practices`.
  - `/industries/home-repair/` and `/industries/home-services/`, both holding `window-door-companies`.
  - `/industries/industrial/manufacturing/` and `/industries/manufacturing/`.
  - `building-material-suppliers` under both dealers-distributors and industrial.
  - `ehr-companies` under both health and tech.
- **Stuttering URLs:** `/industries/heavy-equipment/heavy-equipment/`, `/industries/insurance/insurance/`, `/industries/retail-ecommerce/ecommerce/`.
- **Resources mixed into money folders:** statistics, trends, "best X agencies", budget and website-examples pages sit beside service pages.
  - Example: `/industries/education/higher-education/statistics/` is titled "60 Education Industry Statistics in 2026", but half of it is K-12, e-learning and upskilling data. It is filed under the wrong parent.

### 1.2 The education tree (26 URLs found; 10 crawled)

- **Hub:** `/industries/education/`
- **Segments:** `higher-education/`, `private-schools/`, `technical-schools/`, `online-education/`, `edtech/`.
  - A "Daycares" card appears in the hub outline, but no link was captured. Childcare actually lives at `/industries/local-consumer-services/childcare-providers/`.
- **Group-level resources:** `agency/`, `ai/`, `best-education-marketing-agencies/`, `marketing-budget/`.
- **Under higher-education:** `agency/`, `best-college-websites/`, `education-marketing-roi/`, `education-trends/`, `email-marketing/`, `future-of-higher-education-marketing/`, `how-to-increase-college-enrollment/`, `how-to-market-a-college/`, `seo/`, `social-media/`, `statistics/`, `student-recruitment-strategies/`, `website-examples/`.
- **Under edtech:** `lead-generation/`, `seo/`, `social-media/`.
- **Not present at all:**
  - public K-12 and school districts
  - coaching and test prep
  - study abroad and international recruitment
  - corporate L&D
  - educational travel
  - anything that sells to schools
  - any non-US market

### 1.3 Location taxonomy

**Hub: `/locations/`** (705 words)
- 33 offices, each with address, phone and "M-F: 9:00am - 5:00pm".
- Three tiers: "Headquarters" (Harrisburg), "Regional Hub" (York, Ft Myers, Ann Arbor, Lancaster, Tampa, Cape Town, Guatemala) and "Satellite Office" (the rest).
- Schema: LocalBusiness with PostalAddress, GeoCoordinates and OpeningHoursSpecification.

**City pages: `/locations/{city-st}/`.** 34 linked in the corpus (plus `new-york-city`, `london-uk`, `toronto-ca`).

**City x service: `/locations/{city}/{service}/`.**
- 22 linked: `ppc` 12, `seo` 9, `generative-engine-optimization` 1.
- Only three services across roughly a dozen cities. This layer is far less programmatic than industries.

### 1.4 Internal linking

**Global navigation**
- The homepage links only to `/industries/` ("Industries We Serve") and `/locations/` ("Locations"). No individual industry is in the nav.
- Every page carries about 109 chrome links (nav and footer).

**Footer modules on the guide template (sub-industry and x-service pages), in order:**
1. "Related Resources": about 10 links inside the vertical.
2. "[Vertical] Case Studies": 2 to 4 links.
3. 3 case cards.
4. "Solving key challenges": 4 pains x 4 service links = 16 service links.
5. "Learn more": Tools (7, including "Lorem Ipsum Generator" and "Hex to RGB Converter"), Guides (6), "Related markets" (4 to 5 siblings) and "Our locations" (5 to 6 cities).

**Industry to location linking is arbitrary.**
- The cities shown rotate and have no link to the page's topic. Higher-education lists Chicago, Cincinnati, Cleveland, Columbus and Norfolk. Technical-schools lists Minneapolis, New Orleans, New York City, Orlando, Los Angeles and Norfolk.
- Norfolk, VA is linked from 51 crawled pages. Other cities get 6 to 16.
- Location pages link back to only one industry URL (the root, via chrome). The linking is one-way and carries no topical relevance.

**City pages link to:**
- their own city x service children
- 5 to 10 other city pages ("Philadelphia digital marketing agency", "Denver digital marketing agency")
- national service pages ("Ecommerce SEO Services", "AI PPC Services")
- a G2 review widget and a Google Maps link

**Education hub:** links only to its 5 segment pages. No case study, service, statistic or resource link.

### 1.5 How programmatic is it?

**Semi-programmatic: a templated shell with an editorial body.**

| Page class | Share of lines (6+ words) repeated verbatim elsewhere in the corpus | Unique words per page |
|---|---|---|
| Education pages | 18% to 34% | 1,100 to 2,600 |
| Industry x service pages | 13% to 44% | 440 to 3,500 |
| City pages | 15% to 22% | 745 to 1,020 |
| New-generation group hubs | industrial 77%, manufacturing 79%, dermatology sub-industry 56% | about 350 |

**What is templated:** hero eyebrow, "We Drive Results for X" box, case cards, pains matrix, "Learn more" block, city trust blocks.

**Token swaps prove the shell is generated:**
- "We Drive Results for Private Schools", "...for Technical Schools", "...for Online Ed Websites", "...for Edtech", "...for Higher Ed Centers".
- "188+ education industry experts" on every education page.
- "Earn a 20% greater ROI with medical marketing experts" (dentist), "...with hotel marketing experts" (hotels) and "...with truck & trailer marketing experts". The last one sits on the dealers-distributors hub, a leak where the token does not even match the page.

**City pages are rewritten per city but share one skeleton.**
- 5-word shingle Jaccard between city pages is only 0.06 to 0.10 (Lancaster vs York 0.09; Tampa vs Ft Myers 0.07; Dallas PPC vs Denver PPC 0.10).
- Identical across all five city pages read:
  - the HydroWorx testimonial
  - "4.5 / 5 198 CUSTOMER REVIEWS"
  - "30+ Years of Experience", "1,100+ Testimonials", "93% Client Satisfaction Rating"
  - "A world-class digital marketing agency near you with thousands of reviews applauding our transparency."

**Estimate:**
- About 400+ industry URLs built from 4 or 5 page templates, with bodies written per page (some clearly AI-assisted, such as the "Key Takeaways" blocks).
- About 55+ location URLs from 2 templates.
- Adding a new vertical costs WebFX one body article. Everything else is inherited.

---

## 2. Page templates

### 2.0 Summary by class (from `inventory.jsonl`)

| Class | n | Median words | Range | Pages with FAQ | Typical schema |
|---|---|---|---|---|---|
| Group hub | 21 | 156 | 85 to 1,748 | 1 | Article + WebPage + BreadcrumbList + Organization; newer hubs add VideoObject |
| Sub-industry | 39 | 1,988 | 435 to 3,352 | 11 | Article + WebPage + Breadcrumb + Person "WebFX Team"; sales variants add Product + AggregateRating |
| Industry x service | 23 | 1,914 | 718 to 4,079 | 7 | Article + WebPage (+ VideoObject) |
| Resource, stats, listicle | 10 | 2,274 | 1,116 to 2,881 | 3 | WebPage (+ Article) |
| City | 6 | 1,130 | 1,067 to 1,255 | 6 | WebPage + LocalBusiness + PostalAddress + GeoCoordinates + OpeningHours + Product + AggregateRating + VideoObject |
| City x service | 3 | 1,210 | 1,069 to 1,336 | 3 | Same as city |

- **FAQPage schema** appears on only 2 of 104 pages (`industries_heavy_equipment_heavy_equipment`, `industries_industrial_oil_gas`), although about 30 pages have FAQ sections.
- **Service schema** appears only on oil and gas.

### 2.1 (a) Group hubs

**Legacy resource list** (education, 121 words):
1. H1 "Explore Digital Marketing Resources for Educational Institutions".
2. One paragraph.
3. Six H3 cards.
4. H4 "Discover how we can help your business grow" with a one-field form ("Enter your website").

- CTAs: "Get a Proposal" (x2), phone (x2), "Send Me a Proposal!".
- No proof, no stats, no FAQ, no services.
- Tagged as Article in schema.

**Vertical landing hub** (healthcare 1,472; home services 712):
1. H1 "Healthcare Marketing" plus a line of hours ("98,500+ hours of expertise").
2. Anchor chips: Industry Resources, Challenges, Services, Case Studies.
3. Stat bar: "$33.8M+ Revenue generated for healthcare companies", "8.5X Lower cost per lead than healthcare industry average", "9.8M Leads driven", "230+ Qualified FXers in healthcare industry".
4. Featured report ("Healthcare State of the Industry Report 2025", "Download the Guide") and 4 popular resources.
5. Sub-vertical list: 28 names, from "Alternative Medicine" to "Urologists".
6. Expert video quote and "Connect with the Experts".
7. Newsletter ("Join 200,000+ savvy marketers").
8. "Healthcare Marketing Challenges": 4 tabs (High Competition, Patient Expectations, Advertising Regulations, Patient Trust), each with a solution paragraph.
9. "Recommended Playbook": SEO/Local SEO "Pricing starting at: $3,000/month"; Paid Search "$650 /month"; RevenueCloudFX.
10. Case carousel. Each card has CHALLENGE, a metric (for example "59% INCREASE IN LOCAL CONVERSIONS MOM") and KEY INITIATIVES bullets.
11. "Work with Our Team" form: Name, Email, Website, Company, Phone, Project Budget (bands from "$1,500-5,000/month" to "$50,000+/month", plus "Unknown"), Comments.
12. Named testimonial.

**Guide hub** (professional services):
- Structured as questions: "What is...", "How much does... cost?", "When should I outsource...?", "How do I choose... agency?".
- Then 15 sub-industry cards.

### 2.2 (b) Sub-industry pages: two variants

**Guide / listicle variant** (all education segments; property management; ecommerce):
1. Breadcrumb "HOME INDUSTRIES EDUCATION".
2. H1 "N strategies".
3. Intro.
4. Eyebrow "INSIGHTS FROM 61,900+ HOURS OF EDUCATION MARKETING EXPERIENCE".
5. "View Marketing Services" button.
6. Table of contents.
7. H2 "Why..." section.
8. H2 "N strategies" with H3 per channel (SEO, PPC, email, social; sometimes website).
9. Optional stat block ("Over 90% of WebFX clients continue partnering with us into year 2 of their campaign.").
10. H2 CTA paragraph with phone.
11. Sidebar "We Drive Results for X / 188+ education industry experts / Renowned for our communication and transparency / Get a Proposal".
12. The standard footer modules (1.4).

- Schema: Article, WebPage, BreadcrumbList, Person "WebFX Team".
- Dates: for example `datePublished 2025-02-27`, `dateModified 2026-05-26` on private-schools.
- CTA counts: "Get a Proposal" x4, "Read Full Case Study" x3, phone x2, "Request a Proposal", "View pricing".

**Service sales variant** (dentist 2,165; hotels 1,740; dealers 1,230; insurance 1,228; dermatology 1,252):
1. H1 "Grow Your Practice With a Top Dental Marketing Company".
2. "Send Me a Proposal".
3. Trust strip: "750+ DIGITAL EXPERTS / 30-YEAR TRACK RECORD / 1,100+ REVIEWS / IN-HOUSE TECHNOLOGY".
4. Service tabs, each with a named staff quote (Jordan Duras).
5. "4.5 / 5 198 CUSTOMER REVIEWS".
6. "CUSTOM DIGITAL MARKETING PLANS Starting at $3,000 / month", then "How we determine your custom strategy", then "INCLUDED IN ALL PLANS" (10 bullets).
7. "Earn a 20% greater ROI with..." plus sub-segment chips ("General Dentistry Cosmetic Dentistry Orthodontics...").
8. Benefits.
9. Pains matrix.
10. Case cards.
11. "Hear from our clients": quote plus metric.
12. FAQs (some answers not rendered).
13. Closing CTA.
14. Learn more: services, pricing guides, locations.

- Schema adds Product "WebFX" with AggregateRating `ratingValue 9.7, bestRating 10, reviewCount 203`.

### 2.3 (c) Industry x service pages: three generations

1. **Beginner guides** ("PPC for Banks: A Beginner's Guide", "6-Minute Guide to PPC for Campgrounds and RV Parks", "5-Step PPC Plan for Forklift Dealers"). 1,600 to 2,700 words, same guide shell.
2. **Service-offer article** (`industries_real_estate_property_management_ppc`, 2,385 words):
   1. H1 "PPC for Property Management: Generate Owner and Tenant Leads Fast".
   2. A "Key Takeaways" block of 5 Q&A bullets (an answer-engine pattern).
   3. Stat call-outs: "75% of people say paid ads make it easier to find what they need."
   4. "$10 billion / 24 million / 7.14 million".
   5. "What to expect": 7 deliverables.
   6. "Why choose WebFX": 5 reasons.
   7. 6 FAQs (answers not rendered).
   8. "PPC Pricing Calculator" (enter ad spend, get management cost).
   9. Guide footer.
3. **Conversion landing page** (`industries_home_services_landscaping_ppc`, 718 words; also window and door, and garage doors):
   1. H1 in trade language: "Maximize Your Route Sheets With Landscaping PPC Services".
   2. Three pain cards: "Fill route sheets with ease / End the feast-of-famine cycle / Win jobs without underbidding".
   3. "How Our Landscaping PPC Management Services Deliver a 25% Higher ROI".
   4. Deliverables list.
   5. Tech trio: Revenue Tracking, AI Insights, Data Integration.
   6. "Pricing Starting At $750 / month for Landscaping Companies".
   7. Featured case (Maryland Sunrooms: 670%, 327%, 321%).
   8. Two carousel cases reused from the home services hub.
   9. Vertical stats: "380+", "48,000+", "$605M".
   10. Form, then FAQ.

   - No guide footer. Only 2 to 4 industry links, so these pages are close to orphans in the internal graph.

### 2.4 (d) City pages

Section order (Lancaster, York, Harrisburg, Tampa; Dallas PPC is the same with service words swapped):
1. Breadcrumb "HOME LOCATIONS".
2. H1 "Meet Your {City} Digital Marketing Agency: WebFX".
3. Paragraph with "$10 billion in revenue".
4. "Get a Free Proposal".
5. Anchor chips: Deliverables, Location, Why Us, Success Stories, Our Services, Get Started.
6. "What You'll Get with Our {City} Digital Marketing Agency": 4 or 5 H3 tabs. Only the first tab is localised.
   - York: "from manufacturers in West Manchester Township to retailers on Market Street to service providers in Hanover Borough".
   - Tampa: "your South Tampa restaurant", "your Brandon-based home services company".
   - Dallas: "corporate relocations, headquarters moves".
7. "Meet WebFX" form ("One of our experts will be in touch within 24 hours!").
8. Location block: address, "Get Directions", phone, hours.
9. "Why Choose WebFX": 3 tabs.
10. "Driving Digital Revenue For Our 1,450+ Satisfied Customers" video and the HydroWorx quote.
11. "Your Dedicated Local Team": 30+ / 1,100+ / 93%. These are company-wide numbers; no local person is named.
12. "Case Study of a {State} Business". The case is state-matched: All Pro Trailer (PA), Hurst Pediatric Dentistry (TX), KOA (FL).
13. Three testimonials, anonymised by industry.
14. Services tabs (Digital Marketing, SEO, AI Search/GEO, PPC, Web Design) linking to city x service pages.
15. "4.5 / 5 198 CUSTOMER REVIEWS".
16. "Inside our {City} office": local trivia ("catch a show at one of the oldest theaters in the U.S., the Fulton Theatre"; "the Dallas World Aquarium").
17. CTA, form.
18. FAQs: address, phone, hours, services.

---

## 3. Education deep-dive

### 3.1 Page by page

| Slug | H1 / title | Words | Promise | Pains named | Channels | Proof | Stats | FAQ |
|---|---|---|---|---|---|---|---|---|
| `industries_education` | "Explore Digital Marketing Resources for Educational Institutions" | 121 | SEO first page, PPC to "your most valuable students", email "campus events" | Competition between colleges | SEO, PPC, email | None | None | No |
| `industries_education_higher_education` | "Higher Education Digital Marketing: 3+ Strategies" (the H2 lists 4) | 1,780 | "grow enrollment, donations, and more" | Enrolment, donors, outdated traditional media | SEO, social (Facebook, Twitter, Pinterest, Instagram), content, email gating | "1,450+ clients" plus template cards | None in body | No |
| `industries_education_private_schools` | Title "4 Proven Strategies"; H1 "How To Boost Your Enrollment Online" | 2,067 | Enrolment, reputation, parent trust | Competition (30,000 US private schools), parents' priorities, alumni, funding | Local SEO, PPC, segmented email, Meta social | "Over 90% ... into year 2" plus cards | EdChoice 50% vs 47%; Millennials 253 min; 70% / 64% | No |
| `industries_education_technical_schools` | "5 Digital Marketing Strategies for Technical Schools" | 2,016 | "grow enrollment via online channels" | Retiring workforce, competition, outdated site, radio ads ignored | Website, SEO, PPC, email, social | "over 750 digital marketing experts" | 94% design; $44.25 email ROI; 6 hrs/week social | No |
| `industries_education_online_education` | "4 Best Digital Marketing Strategies for Online Education" | 1,625 | Attract "your target audience" | None specific | SEO, PPC, email, social | Cards only | None | No |
| `industries_education_edtech` | "7 Most Effective EdTech Marketing Strategies in 2026" | 2,124 | "Capture more market share" | Buyers need to find you; BOFU leakage | SEO, PPC, web design, social ads, email, content, first-party data / CDP | "$10 billion ... 24 million ... 7.14 million" | $605B; 93%; $2 per $1; 75%; 91% | 3 (answers visible) |
| `industries_education_edtech_social_media` | Social media for EdTech guide | 1,587 | Brand, connection, revenue | Competitors are on social | Facebook, LinkedIn, YouTube | "165,000 social posts" | 91%; 47% | 3 (answers not rendered) |
| `industries_education_higher_education_social_media` | "10+ Ways to Boost Social Media Marketing for Higher Education" | 3,224 | Relationships with applicants | Many options for students; reach | 14 tactics; Facebook, Twitter, LinkedIn, Instagram, Snapchat, Pinterest, YouTube | "over 500 client testimonials" | 71%; 90% of 500M Instagram users under 35 | No |
| `industries_education_higher_education_statistics` | "60 Education Industry Statistics to Grow Your Academic Knowledge" | 1,894 | Know the market | n/a | n/a | Cards | 60 US figures, 55 external links | No |
| `industries_education_higher_education_education_marketing_roi` | "Education Marketing ROI: How to Calculate and Improve It" | 1,775 | Calculate and improve ROI | Not knowing which campaigns pay | Analytics, social, ignore vanity metrics, testing, search intent | "over 1,100 client testimonials" | ROI formula example; 28% of internet time on social | No; has an ROI calculator |

### 3.2 What every segment page shares (the education shell)

- **Eyebrow:** "INSIGHTS FROM 61,900+ HOURS OF EDUCATION MARKETING EXPERIENCE". Online education and the ROI page say "HIGHER EDUCATION"; edtech says "TECHNOLOGY".
- **Sidebar:** "We Drive Results for {segment} / 188+ education industry experts / Renowned for our communication and transparency".
- **"Explore our education case studies": CenTrak "90% Decrease in cost per lead", Mount Wachusett Community College "200% Increase in paid ad conversions", Hurst Pediatric Dentistry "540% Increase in leads".**
  - WebFX's own case dataset (`analysis/data/webfx_cases.csv`) tags CenTrak "SaaS & Software" and Hurst "Healthcare, Medical, & Rehabilitation".
  - So 2 of the 3 "education" cards are not education.
  - The related-resources list also carries "URAC OmniSEO Case Study". URAC is tagged to the same broad "Education, Media, Training, & Information Services" bucket as a B2B firm, not an institution recruiting students.
- **Pains matrix, identical on all 9 pages:**

  | Pain | Service links |
  |---|---|
  | "We're not driving enough traffic to our school's website" | SEO, Local SEO, Content, Web Design |
  | "We're opening a new campus" | Web Design, Local SEO, Social, PPC |
  | "We're not attracting new students" | Geofencing, PPC, Social, Content |
  | "We're struggling to secure funding" | Social Ads, Content, PPC, Programmatic |

  The same matrix appears on the edtech pages, where "campus" and "funding" make no sense.
- **Conversion:**
  - The one-field form "Enter your website" / "Send Me a Proposal!".
  - "Get a Proposal", "Request a Proposal", "View pricing".
  - Phone numbers are inconsistent: 888-874-2601 on most pages, 888-601-5359 in the higher-education body.
  - No calendar, chat, WhatsApp, audit or segment-specific offer.
  - The only interactive element is the ROI calculator (Revenue, Marketing Costs, "Solve Calculation").
- **Schema:**
  - Article + WebPage + BreadcrumbList + Person, but edtech pages have no Article.
  - The Person node is a generic "WebFX Team". Its description ships unrendered shortcodes: "The WebFX team includes [stat digital-marketing] digital marketing specialists ... generated [stat revenue-simplified] in revenue and [stat leads-simplified] leads".
  - No FAQPage on any education page.

### 3.3 Buyer-term coverage in body copy (`edu_term_coverage.txt`)

Counted in body copy only, before the shared footer, across the 10 pages.

**Zero mentions on every page:**
- admission
- inquir(y/ies)
- open house
- financial aid
- scholarship
- FERPA / compliance / regulat(ion)
- counsel(lor)
- CRM
- WhatsApp
- international
- intake
- lead quality
- attribution
- retarget / geofenc(ing) (outside footer links)
- TikTok / Reels
- district
- procurement

**Barely present:**
- "application": at most once per page.
- "parent": 22 on private-schools, 2 on higher-education, 0 elsewhere.
- "tuition": once each on 3 pages.
- "campus visit" and "tour": once, on higher-education.

**Read:** WebFX writes about channels, not about the admissions process. The funnel an admissions office actually runs (enquiry, counselling, visit, application, fee, seat) does not exist on these pages.

### 3.4 Verbatim lines (apostrophes normalised)

1. `industries_education`: "With so many colleges for students to choose from, its important that your educational institution stands out among your competition."
2. `industries_education_private_schools`: "Every parent wants what's best for their children, especially when it comes to education. It's no secret that parents do their research when it comes to schooling, and these days they do it online."
3. `industries_education_private_schools`: "50% of private school parents are most likely to list a safe environment as their top priority when choosing a school. That's more than even the 47% who chose academic quality."
4. `industries_education_private_schools`: "For example, you could target the keyword "private elementary school in Scranton." Then, you'd bid 50 cents for every click that you receive."
5. `industries_education_private_schools`: "Interested students and parents: FAQ information, enrollment deadlines, payment and tuition information."
6. `industries_education_technical_schools`: "Now that an increasing number of students are choosing to go to technical schools, and much of the baby boomer work force is retiring from these fields, there are more positions than ever available in these in-demand careers."
7. `industries_education_technical_schools`: "Since first impressions are 94% design-related, the layout and design of your website have a major impact."
8. `industries_education_higher_education`: "So if "Denver college" appears in the titles of your pages, in your body copy, in your page navigation, and so on, you have a much better chance at showing up in searches for "Denver college" than if that phrase only appeared once on a single page."
9. `industries_education_higher_education`: "Pinterest allows you to get a little more creative. For example, you could create a board where you curate pins about dorm decorating or easy foods to cook in the microwave."
10. `industries_education_online_education`: "You choose how much you want to pay for each click based on the keyword, and you can almost always earn that money back from just one sale."
11. `industries_education_edtech`: "Digital marketing for EdTech focuses on promoting education technology to the appropriate audience, like academic directors, administrators, and stakeholders."
12. `industries_education_edtech`: "The EdTech marketing is expected to reach $605 billion by 2027, thanks to the shift to remote classes and online schooling."
13. `industries_education_higher_education_social_media`: "it's important to note that 90% of Instagram's 500 million users are under the age of 35. It's one of the best places to be when you want to reach high school students between 17 and 19 who want to discover their next step in life."
14. `industries_education_higher_education_education_marketing_roi`: "You're a marketer at the esteemed Rivendell University, where you enjoy a beautiful campus and an extensive dining plan."
15. `industries_education_higher_education_education_marketing_roi`: "Just because 300 people liked your latest post on your new STEM program doesn't mean you're getting any money from them."
16. `industries_education_higher_education_statistics`: "365,000 students graduated from high school in the year 2020." (The same page also numbers two items "25.")
17. All segment pages, pains matrix: "Not securing enough funding from alumni or donors? Our experts can help get your school in front of prospective donors' eyes so you can secure the funding you need to run your school and classes."
18. `portfolio_case_studies_mwcc_case_study`, WebFX's only real college case: "WebFX addressed this by optimizing pages on MWCC's website for key search terms around campgrounds and camping." (A copy-paste leak from a campground case.)

### 3.5 Education content elsewhere on WebFX (`edu_mentions.txt`)

**MWCC case study (710 words)**
- Tags: "Client Since 2020", SEO, PPC, Social Media.
- Metrics: "205% INCREASE IN SOCIAL AD IMPRESSIONS", "200% INCREASE IN PAID AD CONVERSIONS", "67% INCREASE IN SOCIAL CONVERSIONS", "25% INCREASE IN SEO SESSIONS".
- The headline says "Community College Boosts Enrollment", yet no enrolment figure, baseline or period is given.
- Five unnamed college quotes. The strongest: "Since working with WebFx we have seen a dramatic increase in inquiries and can accurately tie those efforts back to our work with WebFx."

**Portfolio grid:** "Higher Education | 55% improvement in cost per lead" (no page).

**Channel and pricing pages use education only as examples:**
- Geofencing: "like a college campus".
- Bing pricing: "online business degree" or "Boston business school".
- Conversion-rate tool: "Higher Education & College" is one industry benchmark option.

**Blog, AI brand discovery research:** "EdTech: -4.7 points" in branded search dependency. It is one of the "hardest hit" industries in AI-driven search.

**`digital_marketing_pricing_digital_recruitment`** is about employer HR recruiting ($1,000 to $20,000/month), not student recruitment. This is a keyword-ambiguity trap for "recruitment marketing".

**About, charities, STEMFX, FXBuilds:** schools appear as CSR ("STEMFX offers high school students in Harrisburg ongoing opportunities to learn digital marketing"). Not commercial.

### 3.6 What an Indian institute would find missing

1. **The admissions calendar.**
   - Board results (CBSE, ICSE and state boards, typically May).
   - Entrance exams and counselling windows (JEE Main, KCET, COMEDK, MHT-CET, NEET, CUET, CAT).
   - K-12 admission windows (often October to March for a June or April session).
   - Coaching batches after Class 10 results.
   - Study-abroad intakes.
   - WebFX mentions seasons once (statistics page).
2. **The enquiry-to-admission funnel and its operations:**
   - counsellor capacity and speed-to-lead
   - OTP or WhatsApp verification
   - duplicate and junk leads (including leads bought from education portals)
   - campus visits and demo classes
   - application fee, seat confirmation, management quota vs counselling seats
3. **Who decides and who pays.**
   - Parents pay for K-12 and most undergraduate places.
   - Engineering and medical choices are family decisions.
   - Trustees and chairmen sign the budget.
   - WebFX writes to "a higher education marketer".
4. **Indian channels and formats:**
   - WhatsApp (Business API and click-to-WhatsApp ads)
   - Instagram Reels and YouTube Shorts
   - Google Business Profile per campus
   - regional-language creative (Kannada, Marathi, Hindi, Tamil and others)
   - newspaper admission supplements and hoardings
   - school outreach for colleges
   - education portals and JustDial for schools and coaching
   - None of these appear. WebFX recommends Twitter, Pinterest and Snapchat instead.
5. **Rules and trust:**
   - ASCI expectations for education advertising: claims about placements, rankings, approvals and toppers must be substantiated.
   - CCPA guidelines on misleading coaching-sector ads.
   - UGC and AICTE approval status, NAAC/NBA accreditation and NIRF claims.
   - The DPDP Act 2023: verifiable parental consent for children's data; no tracking or targeted advertising directed at children.
   - Platform limits on targeting teens.
   - WebFX has zero compliance content for education, although its healthcare hub has a whole "Advertising Regulations" tab.
   - Verify the current text of each rule before publishing; this is not legal advice.
6. **India-relevant economics:**
   - cost per admission in rupees
   - first-year fee value and payback
   - seat fill by branch or programme
   - The ROI page uses "$400 / $1100" and a fictional "Rivendell University".
7. **B2B education.** Companies selling to schools (educational travel, school programmes, edtech for schools) have no page. The edtech page gestures at "academic directors, administrators" but never describes a school's buying process: principal, management approval, parent circulars, term calendar.

---

## 4. Copy and messaging patterns for verticalisation

### 4.1 How WebFX makes a generic service feel industry-specific

1. **Hours of experience as a vertical currency.**
   - "61,900+ hours" (education), "98,500+" (healthcare), "48,000+" (home services), "13,400+" (real estate), "179,000+" (retail and ecommerce), "149,000+" (professional services), "38,900+" (hospitality), "100,000+" (dealerships), "237,500+" (industrials).
   - Always paired with a head-count of specialists: "188+ education industry experts", "230+ Qualified FXers in healthcare industry", "140+ hospitality marketing experts on staff".
2. **Trade vocabulary in hero copy on the newest pages:**
   - Landscaping: "route sheets", "feast-of-famine cycle", "low-ballers", "snow removal at office parks", "turf management contract".
   - Property management: "owner and tenant leads".
   - Hotels: "Book More Rooms".
   - Oil and gas: "Grow Your Revenue Well".
   - This is the single most effective device, and education never gets it.
3. **Sub-segment chips** that let a visitor self-identify: "General Dentistry Cosmetic Dentistry Orthodontics Pediatric Dentistry Periodontics"; "Boutique hotels Resort hotels Luxury hotels".
4. **First-person pains mapped to services.** "We're opening a new location", "We have high patient turnover", "We're not selling enough of our vacation/trip packages". Each maps to 4 service links.
5. **Vertical proof numbers:**
   - "$33.8M+ Revenue generated for healthcare companies"
   - "$3M+ REVENUE GENERATED FOR LANDSCAPERS"
   - "60X Lower cost per lead than home services industry average"
   - vertical case carousels with CHALLENGE and KEY INITIATIVES
6. **Vertical pricing anchors:** "Pricing Starting At $750 / month for Landscaping Companies"; "Starting at $3,000 / month" per vertical.
7. **Regulation and E-E-A-T angles where the vertical demands them.**
   - Healthcare: "Advertising Regulations", "Build Trust with Patients".
   - Dentist FAQ: "Are your dental marketing services compliant with current healthcare regulations & standards?"
   - "The WebFX content team includes dental professionals".
8. **Vertical keyword examples:** "technical school in Harrisburg PA", "electrical technology programs Lancaster PA", "private elementary school in Scranton".
9. **Vertical statistics and trend hubs used as link bait:** "60 Education Industry Statistics", "65+ Mind-Blowing Healthcare Marketing Statistics", "70+ Retail Statistics", "8 Home Services Trends Shaping The Industry in 2027".
10. **Vertical tools:** education ROI calculator; property-management PPC pricing calculator.

### 4.2 Where it fails (thin boilerplate and leaks)

1. **Borrowed proof.** Education pages show a SaaS company and a pediatric dentist as "education case studies". The only college case study leaks "campgrounds and camping".
2. **Token-swapped claims that do not fit.**
   - "Earn a 20% greater ROI with truck & trailer marketing experts" on the dealers and distributors hub.
   - "We're opening a new campus" and "We're struggling to secure funding" on edtech.
   - The footer "Increase student enrollment and engagement" on the B2B edtech social page.
3. **Channel-first bodies.** Every education page is "SEO, PPC, email, social" with the segment noun inserted. Online education spends paragraphs defining "digital marketing" and "inbound marketing".
4. **Dated or US-only examples:**
   - Twitter "280 characters"
   - Pinterest dorm boards
   - Snapchat
   - "90% of Instagram's 500 million users"
   - "as of April 2015, mobile-friendliness is an important ranking factor" (ecommerce)
   - bids of "50 cents"
   - NCES and EdChoice data
5. **Numbers that disagree across pages:**
   - Clients: "1,450+ clients" (higher-education) vs "2,000+ happy clients" (hotels, Harrisburg).
   - Reviews and testimonials: "over 500 client testimonials" (higher-education social) vs "over 1,100 client testimonials" (ROI page) vs "1,100+ REVIEWS" vs "198 CUSTOMER REVIEWS" vs schema "reviewCount 203".
   - Revenue: "$10 billion" (edtech) vs "$6 billion in sales" (dentist), both "in the past five years".
   - Phones: 888-874-2601, 888-601-5359, 888-256-9448.
6. **Copy errors that signal no editor:**
   - "its important"
   - "to will create"
   - "The EdTech marketing is expected"
   - "LaLancaster SEO Services"
   - "optimiztion"
   - "dealor"
   - "Reasearch"
   - "feast-of-famine"
   - a statistics page with duplicate numbering and percentages that do not add up ("Of the 4.43 million college students that graduated in 2021: 6% earned associate's degrees. 9% obtained bachelor's degrees...")
7. **Hidden or empty FAQs.** Questions are rendered without answers in the capture (edtech social, property management PPC, oil and gas, city pages).
8. **The hub is a signpost, not a page.** 121 words for the head term "education marketing".

---

## 5. SEO value and risks

### 5.1 Keyword targeting

**Education segments target informational "how to" intent**, not "agency" intent:
- "4 Best Digital Marketing Strategies for Online Education"
- "5 Digital Marketing Strategies for Technical Schools"
- "Higher Education Digital Marketing: 3+ Strategies"

**Commercial intent is split off into separate URLs:**
- `/industries/education/agency/` ("WebFX: Your Education Digital Marketing Agency")
- `/industries/education/higher-education/agency/`
- a self-ranked listicle "The Best Higher Education Marketing Agency: WebFX"
- `/best-education-marketing-agencies/`

**Cannibalisation inside education.** Hub, agency, higher-education, higher-education/agency, how-to-market-a-college, how-to-increase-college-enrollment, student-recruitment-strategies and higher-education/seo all overlap on "college / higher education marketing".

**Title and H1 drift:**
- Private schools: title "4 Proven Strategies", H1 "How To Boost Your Enrollment Online".
- Higher education: title "3+ Strategies", but the H2 lists "4".
- Statistics: title "60 Education Industry Statistics in 2026", H1 "...to Grow Your Academic Knowledge".

**Year stamping.** "2026" in titles, and already "2027" (home services trends; the dealers hub asks "Ready to drive revenue in 2027?"). This forces perpetual refreshes.

**Newer sales pages do target commercial terms well:**
- "Dental Marketing Company | 91% Client Retention Rate | WebFX"
- "Hotel Digital Marketing Services | Book More Rooms | WebFX"
- "PPC for Landscaping | Landscaping PPC Services From WebFX"
- "Oil and Gas Marketing Agency | Why Choose WebFX"

### 5.2 Thin, duplicate and programmatic risk

- **14 of 21 group hubs are 85 to 187 words.** They are navigational, but they are the natural landing URL for head terms like "education marketing agency", and they cannot rank on merit.
- **Body duplication is moderate** (65% to 80% of lines unique on segment pages). A duplicate-content filter is not the main risk.
- **The main risk is low-value scaled content:** generic channel advice repeated across hundreds of verticals, which is exactly what helpfulness and scaled-content policies target.
- **New-generation hubs are 77% to 79% duplicated lines** (industrial vs manufacturing), with "Healthcare" swapped for "Industrial".
- **Parallel trees** (`health/` vs `healthcare/`, `home-repair/` vs `home-services/`) split authority and invite duplicate indexing.

### 5.3 Schema

**Article on commercial hubs and sales pages.** A misclassification. The author is a generic Person, "WebFX Team", with unrendered "[stat ...]" tokens, and no real expert markup, although named staff quotes exist on the page.

**Self-serving ratings.**
- Product "WebFX" with AggregateRating 9.7/10 from 203 reviews appears on 9 industry and location pages.
- Reviews about a business's own organisation are not eligible for review rich results.
- The on-page figure is "4.5 / 5 198 CUSTOMER REVIEWS", which does not match.

**FAQPage underused.** It is on 2 pages, although about 30 pages have FAQ sections.

**Service schema** only on oil and gas. No audience markup anywhere.

**LocalBusiness data is inconsistent on city pages:**
- Lancaster schema `telephone "888-601-5359"` vs on-page "888-874-2601".
- Lancaster street: "24 W King St" (schema) vs "24 West King Street" (page) vs "24 W King St, Suite 202" (FAQ).
- The Tampa page's business address is in St. Petersburg.
- Harrisburg's page phone is 717-609-0360 vs 888-874-2601 on the hub.

### 5.4 Local SEO signals on city pages

**Present:**
- NAP block and "Get Directions" to Google Maps
- hours
- LocalBusiness schema with geo coordinates
- a review widget linking to G2 and Google Maps
- office-and-neighbourhood paragraphs
- state-matched case study
- address and phone FAQs
- links to nearby city pages

**Missing:**
- named local staff
- local client counts (except Harrisburg: "250+ Clients in PA", "400+ FXers in PA")
- local reviews quoted by name
- office photos with captions in the text
- events

**On satellite pages, the "Your Dedicated Local Team" block contains company-wide numbers.**

### 5.5 Doorway-page risk

**City x service pages are the closest to a doorway pattern** (Dallas PPC, Denver PPC, Jacksonville PPC):
- one skeleton
- a localised intro ("Dallas isn't just growing, it's exploding with corporate relocations")
- city trivia
- the same testimonials and numbers

**Mitigations:** real listed addresses, unique intros and a real service. Risk rises for any city without staff.

**Industry pages link to rotating cities with no topical reason.** This looks like link-equity distribution rather than user value.

**Answer engines.** The "Key Takeaways" Q&A blocks and statistics pages are well built for AI citation. Note that WebFX's own research says EdTech lost 4.7 points of branded-search dependency to AI discovery.

---

## 6. Strengths MMC must match and weaknesses MMC can exploit

### 6.1 Strengths to match (ranked)

| Rank | Strength | Evidence | MMC version |
|---|---|---|---|
| 1 | Trade vocabulary and sub-segment self-selection in the hero | Landscaping "route sheets", "feast-of-famine"; dentist chips | Education hero in admissions language (seats, counselling, campus visits, school bookings) and a segment picker |
| 2 | Pains-to-services matrix on every vertical page | "Solving key challenges" 4x4 | Admissions-leak matrix mapped to MMC workstreams and service URLs |
| 3 | Topic cluster depth per vertical | 26 education URLs: segments, stats, ROI, budget, trends | One strong pillar plus 6 to 8 supporting Insights pieces and 1 or 2 tools (not 26 thin URLs) |
| 4 | Interactive tools | ROI calculator; PPC pricing calculator | Cost-per-admission and school-booking pipeline calculators, extending MMC's existing calculator suite |
| 5 | Structured proof slots per vertical | Stat bar; CHALLENGE / KEY INITIATIVES carousel | The same slots filled with scope, method and checkable artefacts until approved numbers exist |
| 6 | Price anchoring and budget qualification | "$750 / month for Landscaping Companies"; budget bands in form | Budget-band field in rupees (bands for MMC to confirm); optional "engagements start from" if MMC chooses to publish |
| 7 | Local entity signals where offices are real | NAP, geo, hours, maps, FAQs | Real Bengaluru and Mumbai NAP on Contact/About with consistent schema |
| 8 | Answer-engine formatting and freshness | "Key Takeaways"; `dateModified` 2026 | Visible Q&A, definitions and a dated "last reviewed" line, prerendered |
| 9 | Dense internal links from vertical to service pages | 16 service links per page | Four workstream links with education-specific anchors, plus back-links from service pages |

### 6.2 Weaknesses to exploit (ranked by impact on an education buyer)

| Rank | Weakness | Evidence | How MMC wins |
|---|---|---|---|
| 1 | Proof is borrowed, mismatched or leaky | CenTrak (SaaS) and Hurst (dentist) as "education case studies"; MWCC "campgrounds and camping"; no enrolment number anywhere | Education-only proof with honest scope, a stated evidence policy, and checkable artefacts (live sites, Meta Ad Library, dated screenshots) |
| 2 | No understanding of admissions operations | 0 mentions of admission, inquiry, counsellor, CRM, WhatsApp, lead quality or attribution | Funnel section with definitions, speed-to-lead, verification and weekly in-season reporting |
| 3 | No calendar or seasonality | 1 passing mention | Interactive admissions calendar by segment and a "start by" date |
| 4 | Wrong buyer and wrong market | Written for a US "higher education marketer"; Scranton, Denver, dollars | Four Indian buyer roles, parent vs student, rupee economics, regional languages |
| 5 | No compliance content for education | 0 hits for compliance or regulation on education pages | ASCI/CCPA claims discipline, DPDP minors' data, ownership of accounts and data |
| 6 | Thin hub and fragmented intent | 121-word hub; 9+ overlapping URLs | One 2,000+ word pillar that owns the head terms |
| 7 | Generic, single-field CTA | "Enter your website" / "Send Me a Proposal!" | Role-aware form, WhatsApp, calendar booking, calculator |
| 8 | Dated channels | Twitter, Pinterest, Snapchat; no Reels, Shorts or WhatsApp | Reels, Shorts, YouTube campus films, click-to-WhatsApp, Google Business Profile per campus |
| 9 | Inconsistent numbers and typos | Clients, reviews, revenue and phone numbers vary; "LaLancaster" | One source of truth (`content/clients.json`), edited copy, identical figures everywhere |
| 10 | No B2B "selling to schools" segment | None on WebFX; Mediagarh has 0 of 42 such clients (`mediagarh-proof.md` 8.10) | Bloom Edutours and Sprouts Edu Tours give MMC an uncontested, truthful position |
| 11 | Schema errors and self-serving ratings | "[stat ...]" tokens; Product/AggregateRating mismatch | Clean Service, FAQPage, BreadcrumbList and Organization; no self-ratings |

**Mediagarh cross-check** (from the sibling analyses). Mediagarh is education-only and admissions-framed. It is also weak where WebFX is weak:
- no segment pages ("Colleges" 32 words, "Schools" 13 words)
- season framing without a calendar
- no copy for principals or admissions heads
- none of these objections addressed: attribution, ownership, compliance, speed-to-lead
- inconsistent scale claims ("30+" to "180+" institutions)

MMC beats both by combining WebFX's structure (matrix, tools, cluster, proof slots) with the operational specificity neither has, and by being the only one of the three whose proof is disciplined.

---

## 7. Recommendation: MMC's vertical architecture

### 7.1 Principles

1. **Few, deep pages.** Build a vertical URL only when three things are true:
   - there is distinct search demand
   - the buyer's funnel is distinct
   - MMC has at least one real client in that vertical
2. **Put segments inside the pillar first** (tabs or anchors that are server-rendered by `prerender.py`). Promote a segment to its own URL only when it has a client and 600+ words of genuinely segment-specific content.
3. **No industry x service pages at launch.** Service pages get an "In education" (or "In D2C") block that links back to the vertical pillar. Add an industry x service URL only when keyword research and a case card both exist.
4. **Every client mention reads from `content/clients.json`.** No numbers against any client until an approved `results` entry exists.

### 7.2 Which industry pages first (from `content/clients.json`)

| Priority | URL | Why | Clients that can appear (as recorded) |
|---|---|---|---|
| 1 | `/industries/d2c-brands/` | The largest block of the book: 9 D2C brands with performance, creative, CRO, Amazon and quick-commerce scope. The four published figures are book-wide and D2C-weighted. Existing calculators and the D2C glossary support it | Lepure, The Growing Giraffe, Mittiy Made, AwwBaby, Sprnt, Vaga Kids, MyBrownButters, Notic; OOsh after confirmation. Group by category only where MMC confirms each brand's category |
| 2 | `/industries/education/` | Requested. Truthful B2B-to-schools angle no competitor holds. Institute demand is high and seasonal | Bloom Edutours, Sprouts Edu Tours (web, lead generation, performance creative, social); MVJ College of Engineering only after confirmation; LearningMate as logo only |
| 3 | `/industries/b2b-services/` | Lead-generation engagements with recorded scope | NM Consultings, Skyfling Technologies; logo-only brands (JSW, Saint-Gobain, Gyproc, Flomate) in a strip, with no services implied |
| 4 | `/industries/real-estate/` | High Indian search and ad demand, and three recognisable logos | Housing.com, Rustomjee, Green Hermitage are logo-pack with empty services. Build only after MMC records what it ran, or the page has nothing true to say |
| 5 | `/industries/travel-hospitality/` | Travel is in the brief, and it overlaps educational travel | Club Mahindra (logo only); Panda Cabs (B2C, pending confirmation); cross-link Bloom and Sprouts |

**Also:**
- **Hold "Healthcare" and "SaaS".** `Industries.jsx` currently lists seven "worlds" (D2C Brands, Healthcare, Real Estate, Education, SaaS, Hospitality, Startups). Healthcare has no client in `clients.json`. Keep those as homepage labels at most until there is a client.
- **Treat "Startups" as a stage, not an industry.** The panel already has a 0 to 1 / 1 to 10 / 10 to 100 stage selector.

### 7.3 URL scheme for the static site

**Current state:**
- Flat files with spaces: `/Our%20Work.html`, `/Service%20Detail.html`, `/Job%20Detail.html`.
- Tools live as root `.html` files.

**Recommended:** folder-based clean URLs, each served as `index.html`, lowercase, hyphenated, with a trailing slash. Canonicals live in `content/seo.json`; BreadcrumbList lives in `content/schema.json`.

```
/industries/                                  hub (short, but with real copy: who we serve and why)
/industries/education/                        pillar (this blueprint)
/industries/d2c-brands/
/industries/b2b-services/
/services/lead-generation/                    and /services/website-design/, /performance-creative/, /social-media/, /cro/
/work/bloom-edutours/                         case pages (scope, artefacts; numbers only when approved)
/work/sprouts-edu-tours/
/tools/cost-per-admission-calculator/
/tools/school-booking-pipeline-calculator/
/insights/education/admissions-calendar-india/   (and other cluster posts)
/glossary/education-funnel/                   (sibling of the D2C glossary)
```

**Also:**
- **301 redirects from the old `.html` names** if the host supports them. Otherwise keep the old files with a canonical to the new URL.
- **Maximum depth of 3 folders.** Avoid WebFX's `/group/sub/service/` expansion and its parallel trees.

### 7.4 City pages for Bengaluru and Mumbai

- **Do not build a city page per service, per industry, or per city MMC does not operate in.** With a small team (`llms.txt` describes "A team of four", per the sibling audit), such pages would be doorway pages by definition.
- **Build at most two location pages, `/locations/bengaluru/` and `/locations/mumbai/`, and only if all of these hold:**
  - A real address (office, co-working or registered) can carry identical NAP everywhere (site, schema, Google Business Profile).
  - Someone on the team can be named as working from or meeting clients in that city.
  - Each page has genuinely local content: who works there, how in-person meetings happen, and local clients once confirmed. MVJ College of Engineering is a Bengaluru institution, so it is relevant there after confirmation.
- **If those conditions are not met,** put both addresses on Contact and About with ProfessionalService/LocalBusiness schema for each, and let the homepage and About target "growth marketing agency in Bengaluru/Mumbai".
- **Put state-level admissions context inside the education pillar and the calendar article,** not on city pages. For example, Karnataka KCET/COMEDK and Maharashtra MHT-CET timing.

---

## 8. Blueprint: MMC's education landing page

### 8.1 Page basics

- **URL:** `/industries/education/`
- **Primary query:** "digital marketing services for educational institutes".
- **Supporting queries** (validate volumes with a keyword tool before finalising):
  - education marketing agency India
  - digital marketing for schools
  - college admission marketing
  - lead generation for colleges
  - school admission marketing agency
  - marketing for coaching institutes
  - digital marketing for edtech companies
  - marketing for educational tour companies
- **Title (50 chars):** "Digital Marketing for Educational Institutes | MMC"
- **Meta description (about 155 chars):** "Admission-season marketing for schools, colleges and coaching, and lead generation for companies that sell to schools. Plan your season with MMC."
- **H1:** "Digital marketing for educational institutes, measured in admissions."
- **Length:** 2,000 to 2,500 visible words, all prerendered including tab content. This beats WebFX's 121-word hub and Mediagarh's 186 to 618-word service pages.
- **Voice:** MMC's existing register. Short declaratives, plain numbers, no hype, sentence case, no em dashes.
- **Avoid these words:** "best", "top", "guaranteed", "skyrocket".

### 8.2 Segments to address

The windows below are typical. Every tab should say "your board, state and programme dates decide", and MMC should verify each year's dates before publishing.

| Segment | Who signs / who decides / who pays | Conversion event | Typical demand windows | MMC relevance today |
|---|---|---|---|---|
| **K-12 schools** (CBSE, ICSE, IB, IGCSE, state board; preschools) | Chairman/trustee signs; principal shapes; parents decide and pay | Enquiry, then campus visit, then application and interaction, then fee paid | Admissions often open October to March for the next session; nursery age-cutoff cycles; transfer enquiries April to June | No client yet: speak through method, not proof |
| **Higher education** (engineering, management, medical and allied, arts and science, universities) | Chairman/chancellor signs; principal/director and admissions head run it; student and family decide | Enquiry, counselling call, campus visit, application, seat confirmation / fee, reporting | Class 12 results (about May); entrance exams (JEE Main January/April, KCET and MHT-CET April/May, COMEDK and NEET May, CUET May/June); counselling rounds about June to September; management-quota decisions about April to August; MBA after CAT (December to April) | MVJ College of Engineering once confirmed |
| **Coaching and test prep** (JEE/NEET, CA, UPSC, CAT, banking, IELTS) | Founder/director; centre heads; parents for school-age students | Scholarship-test or demo registration, attendance, enrolment fee | Two-year batches after Class 10 exams and results (about March to June); dropper batches after results; crash courses before exams | None: method only. Note CCPA coaching-ad guidelines |
| **Skilling and professional programmes** (design, animation, aviation, beauty, IT, nursing) | Founder/director; learner (often an adult) | Webinar or counselling, application, EMI/loan, enrolment | Batch starts (monthly/quarterly); graduation season (about June to August); January | None: method only |
| **Study abroad consultancies** | Founder/branch head; student and parents | Free profile evaluation, counselling, applications, offer, visa, deposit | Applications 6 to 12 months before the September and January intakes | None: method only |
| **EdTech** (B2C and B2B) | Growth or marketing head | Trial/demo, then paid; or school demo, then pilot, then contract | Exam seasons; start of the school year | LearningMate as logo only; no services implied |
| **Selling to schools** (educational travel, school programmes) | School principal/trustee approves; activity coordinator runs it; parents consent and pay | School enquiry, meeting or presentation, proposal, management approval, parent circular, confirmed trip, students per trip | Planning early in the academic year and after mid-terms; trips around breaks; exam months are dead. **Validate against Bloom's and Sprouts' own enquiry and booking months** | **Bloom Edutours, Sprouts Edu Tours** (web, lead generation, performance creative, social) |

### 8.3 Buyer roles and what each needs to read

| Role | Cares about | Page elements that serve them | Objections to pre-empt |
|---|---|---|---|
| Chairman / trustee / promoter | Seats filled, fee revenue, reputation, risk, cost | Admissions framing, cost-per-admission calculator, compliance section, book-wide retention figures | "Agencies promise and vanish"; "Will this embarrass the institution?" |
| Principal / director | Quality of intake, parent trust, staff workload, academic reputation | Parent-facing creative approach, claims discipline, how enquiries reach staff | "Marketing cheapens our brand"; "My team can't handle more calls" |
| Admissions head | Contactable leads, counsellor capacity, speed, seat targets by programme, CRM | Funnel definitions, verification, WhatsApp follow-up, weekly in-season reports, capacity warning in calculator | "Leads are junk"; "Duplicates from portals"; "We get leads after hours" |
| Marketing head | CPL/CPA, creative pipeline, attribution, agency accountability, a budget case to the board | Method section, sample dashboard, workstreams, service links, ownership of accounts | "Reports in impressions"; "Who owns the ad account?" |
| B2B: operator's founder / sales head (Bloom/Sprouts type) | Qualified school meetings, confirmed trips, season pipeline | Selling-to-schools section, pipeline calculator | "Schools don't buy from ads" |

### 8.4 Section-by-section outline

**0. Sticky header (mobile bottom bar)**
- **Job:** keep contact one tap away.
- **Elements:**
  - "Book a funnel audit"
  - WhatsApp icon
  - Call (only if a number is staffed)

**1. Hero**
- **Job:** confirm fit in five seconds; state the promise in admissions terms; let the visitor pick a segment.
- **Copy direction:**
  - H1: "Digital marketing for educational institutes, measured in admissions."
  - Sub: "We plan your season backwards from the seats you need to fill. Website, Google and Meta, performance creative, social media and WhatsApp follow-up, reported as cost per admission."
- **Segment chips** (they scroll to the tabs): School, College or university, Coaching, Skilling, Study abroad, EdTech, We sell to schools.
- **CTAs:** "Book a 30-minute funnel audit" (primary); "Message us on WhatsApp" (secondary).
- **Micro-proof line:** "Education-sector clients: Bloom Edutours, Sprouts Edu Tours." Add MVJ only after confirmation. Never say "institutes we've grown".

**2. Evidence policy**
- **Job:** pre-empt scepticism created by agencies' inflated figures. This is MMC's differentiator.
- **Copy:** "We don't publish client results we can't evidence. Every number we show has a definition, a period and a source we can walk you through on a call."

**3. Where admissions leak (pains matrix)**
- **Job:** prove operational understanding; route to workstreams.
- **Format:** 6 cards. Each card is one sentence in the buyer's words, then "what we change", then a link to a workstream.
  1. "Enquiries come in at 11pm. Counsellors call back at 11am the next day." Speed-to-lead and WhatsApp auto-response. Links to lead generation.
  2. "Half the forms have wrong numbers or students who never pick up." Verification and form design. Links to lead generation and CRO.
  3. "Our website answers everything except fees, hostel and placements." Programme pages and FAQs. Links to website.
  4. "We buy the same portal leads as every college in the city." Own-demand channels. Links to lead generation.
  5. "Our ads look like every other institute's ads." Campus films, student and parent voices, regional language. Links to performance creative.
  6. "The board asks for admissions; the agency sends impressions." Definitions and weekly in-season reporting. Links to the method section.

**4. Segments (tabs, server-rendered)**
- **Job:** let each segment self-identify; capture long-tail search; show segment-native vocabulary.
- **Each tab (120 to 180 words):** who decides, the conversion event, what we run, when demand peaks, and one honest line on MMC's experience with that segment.
- **Example (School tab):** "Parents choose schools. Children rarely do. So we speak to parents: campus walk-throughs, teacher introductions, safety and transport answered up front, and a visit booked in two taps. Demand usually builds from October; plan your creative before Diwali, not after."
- **Selling to schools tab:** points to section 8.

**5. The admissions calendar (interactive)**
- **Job:** create urgency without hype; act as a linkable planning asset.
- **Format:** a 12-month strip with rows per segment. Picking a segment and a target month outputs a "start by" date for site, creative and campaigns.
- **Copy:** "Most institutes start marketing when enquiries should already be arriving. Pick your intake and we'll show you when to start."
- **Label:** "Typical windows. Your board, state and programme dates decide."
- **Link:** to the full calendar article in Insights.

**6. The funnel we build and how we count it (method)**
- **Job:** prove method in place of results; define terms so leads and admissions are never blurred.
- **Diagram:** enquiry, verified enquiry, counselling conversation, visit or demo, application, fee paid / seat confirmed, joined.
- **Each step shows:**
  - a definition
  - who owns it (MMC or your admissions team)
  - the metric reported
- **Also on the page:**
  - the attribution rule in one sentence
  - the in-season cadence (weekly) and off-season cadence (monthly)
  - a sample dashboard labelled "Sample layout, not client data"
- **Link:** to the education funnel glossary.

**7. What we run (workstreams)**
- **Job:** name the scope; pass authority to service pages.
- **Four cards, using the service names in `clients.json` `_services`:**
  - **Website redesign and development:** programme pages, fee and placement FAQs, speed, enquiry forms, campus visit booking. Links to `/services/website-design/`.
  - **Lead generation:** Google Search and Performance Max, Meta lead and click-to-WhatsApp ads, YouTube, remarketing, routing to your counsellors. Links to `/services/lead-generation/`.
  - **Performance creative:** campus films, student and parent voices, Reels and Shorts, regional-language variants, results-season creative. Links to `/services/performance-creative/`.
  - **Social media:** always-on presence, events, admission-season calendar. Links to `/services/social-media/`.
- **Optional fifth card:** conversion rate optimisation, since it is in `_services`.
- **Do not list SEO as a service** unless MMC adds it to `_services`. MVJ artwork shows SEO work, but it is not recorded.

**8. For companies that sell to schools (B2B)**
- **Job:** own the uncontested position truthfully.
- **Copy:** "Some of our education clients don't recruit students. They sell to schools. The buyer is a principal, the approval is a management meeting, and the payment comes from parents. We build for that journey: school-facing website, lead generation that books meetings, creative that parents trust, and social proof a principal can forward."
- **Funnel strip:** school enquiry, meeting, proposal, approval, parent circular, confirmed trip, students per trip.
- **Proof:** Bloom Edutours and Sprouts Edu Tours: website, lead generation, performance creative, social media. No numbers.

**9. The work (checkable proof)**
- **Job:** proof a buyer can verify without trusting MMC's numbers.
- **Cards for Bloom and Sprouts:**
  - segment ("Educational travel, selling to schools")
  - workstreams
  - live site link
  - dated before/after screenshots
  - Meta Ad Library link
  - three creatives
  - social grid
  - a named, titled, dated, written-approved quote once collected
- **MVJ card** only after confirmation. **LearningMate** only in a general logo strip elsewhere, never in this section.
- **Case card format ready for when numbers are approved:** Context, Starting point (baseline and period), What we ran, What changed (metric, before, after, period, source), What else changed, Quote, Approved by and date. (Aligned with `mediagarh-proof.md` 9b.)

**10. Book-wide trust figures, scoped**
- **Job:** company-level credibility without implying education results.
- **Show:** "14/14 clients renewed" and "27 months median tenure", labelled "across MMC's whole client book, not education only".
- **Keep "8.7x median blended ROAS" and "₹248Cr+ revenue compounded" off this page,** or footnote them as book-wide and D2C-weighted. Education buyers read ROAS next to institution logos as an admissions result.
- **Fix first:** the sibling audit found `TrustLayer.jsx` shows a different fourth figure ("4 Countries") from `llms.txt` (27 months). Settle on one set of four with identical labels everywhere.

**11. Cost-per-admission calculator**
- **Job:** lead magnet and proof of thinking. It turns MMC's existing unit-economics calculators into education language.
- **B2C inputs:**
  - seats to fill (per programme, repeatable rows)
  - first-year fee (₹)
  - current or expected cost per enquiry (₹), or a monthly budget
  - enquiry-to-admission rate (user-entered; no invented benchmark; show the formula)
  - contactable-lead share
  - counsellors and calls per counsellor per day
  - season length in weeks
- **B2C outputs:**
  - enquiries needed
  - budget needed
  - cost per admission
  - first-year fee value per ₹1 of marketing
  - peak-week counsellor load
  - a red warning when load exceeds capacity: "Your team can't call these leads back the same day. Fix capacity before adding budget."
- **B2B variant (school-booking pipeline):** schools reached, meetings booked, proposals, confirmed trips, students per trip, average booking value. Outputs: budget per confirmed trip and season value.
- **Delivery:**
  - results shown instantly, no gate
  - optional "Send this plan to my WhatsApp / email"
  - writes to the Airtable Leads table with `source: cpa-calculator`
  - page: `/tools/cost-per-admission-calculator/`, with the widget embedded on the pillar

**12. Compliance and data care**
- **Job:** remove the trustee and principal's risk objection. No competitor page covers it.
- **Points (MMC to confirm policies, and verify current rule texts):**
  - Claims about approvals, accreditation, rankings, placements and toppers are checked against documents before they go into an ad (ASCI education guidance; CCPA guidelines for coaching).
  - Ads for school-age learners speak to parents; minors' data is handled under the DPDP Act 2023, including parental consent, with no tracking-based targeting of children.
  - No bought lead lists.
  - Ad accounts, pixels, website and enquiry data belong to the institution (confirm this is MMC policy before stating it).

**13. How an engagement runs**
- **Job:** reduce friction; show who does the work.
- **Steps (example timeline, MMC to confirm):**
  1. Funnel audit (week 1)
  2. Season plan and budget (week 2)
  3. Site and creative build (weeks 3 to 6)
  4. Live campaigns with weekly in-season reviews
  5. End-of-season report and next-cycle plan
- **Team line:** "The people you meet are the people who run your account."

**14. FAQ** (see 8.6)

**15. Final CTA block**
- **Job:** convert everyone who scrolled.
- **Three side-by-side options:**
  - short form
  - calendar embed ("30-minute admission season funnel audit")
  - WhatsApp
- **Audit deliverable:** a funnel leak map, a landing page review, an ad account review and a season plan outline.

### 8.5 Conversion elements in detail

**Form, step 1 (required, 5 fields):**
1. Name
2. Role: Chairman/Trustee, Principal/Director, Admissions head, Marketing head, Founder/owner, Other
3. Institution or company
4. Segment (same list as the chips)
5. Mobile (WhatsApp), with a consent checkbox

**Form, step 2 (optional):**
- City
- Next intake or season month
- Seats or trips to fill
- Monthly budget band in rupees (MMC to set the bands)
- Website URL
- "What's the biggest leak?" (the 6 pains as options)

**Mapping to the existing Airtable Leads fields:**

| Airtable field | Form field |
|---|---|
| `brand` | institution |
| `url` | website |
| `revenue` | budget band |
| `channel` | segment |
| `challenge` | leak |
| `page` | `/industries/education/` |
| `source` | hero / final / calculator |

**WhatsApp:**
- Click-to-chat with a prefilled message: "Hi MMC, I'm [role] at [institution]. We want to plan [month] admissions."
- Stated response hours and an auto-reply.

**Calendar booking:**
- A 30-minute "Admission season funnel audit" with a named host.
- Embed a scheduler that the site's CSP allows. Mediagarh sends users off-site to Calendly; MMC should keep them on-page.

**Sticky mobile bar:** Book / WhatsApp / (Call).

**Events to track:**
- `seg_select`
- `calendar_tool_use`
- `calc_complete`
- `form_start`
- `form_submit`
- `whatsapp_click`
- `booking_made`
- all with `segment` and `role` parameters

### 8.6 FAQ (12 buyer questions, with answer direction)

Answers marked [confirm] need MMC's sign-off before publishing.

1. **Do you only work with education?**
   No. Most of our clients are D2C brands, alongside B2B, B2C and education clients. What carries over is performance discipline: cost per result, weekly optimisation, creative testing.
2. **What kinds of education businesses do you work with?**
   Today, companies that sell to schools (educational travel). We also take on schools, colleges, coaching and skilling institutes, and we say plainly which we have and haven't run before.
3. **Can you guarantee admissions or a cost per admission?**
   No, and be wary of anyone who does. We commit to definitions, a season plan, weekly reporting and the levers we control.
4. **When should we start for the next admission season?**
   Before enquiries peak, not when they do. Use the calendar tool. As a rule of thumb, site and creative work needs lead time before campaigns go live [confirm the typical lead time].
5. **How much budget do we need?**
   It depends on seats, fees, competition and your conversion rates. The calculator shows the arithmetic. We'll give a range after the audit [confirm whether to publish bands].
6. **How do you measure success: leads, applications or admissions?**
   All three, defined separately. Admissions come from your admissions office or CRM records, not from ad platforms.
7. **Will you work with our counsellors and our CRM?**
   Yes: routing, response-time targets, WhatsApp follow-up and closing the loop on outcomes. Name specific CRMs only if MMC has integrated them [confirm].
8. **How do you deal with fake, duplicate or unreachable enquiries?**
   Verification, form design, audience exclusions, and reporting contactable-lead share every week.
9. **Who owns the ad accounts, website, creatives and data?**
   [confirm policy] The recommended answer is: you do.
10. **Can you make creative in regional languages?**
    [confirm capability]
11. **How do you keep our ads within education advertising rules?**
    Claims about approvals, rankings and placements are checked against documents. For school-age audiences, we target parents and handle minors' data carefully.
12. **We sell to schools, not students. Is this page for us?**
    Yes. See the selling-to-schools section. Bloom Edutours and Sprouts Edu Tours are in this model.

Optional 13th: **Can we see results from your education clients?** Our evidence policy explains what we publish. Figures clients approve for one-to-one sharing can be shown on a call.

### 8.7 Schema (via `content/schema.json`)

- **WebPage** (`@id` `/industries/education/#webpage`): `about` the Service node; `isPartOf` the WebSite; `dateModified`.
- **Service:**
  - `name` "Digital marketing for educational institutes"
  - `serviceType` "Education marketing"
  - `provider` = the MMC Organization `@id`
  - `areaServed` India (add others only if true)
  - `audience`: an Audience with `audienceType` "Schools, colleges, coaching and skilling institutes, edtech companies, companies that sell to schools"
  - `hasOfferCatalog`: an OfferCatalog listing the four or five workstreams, each `itemOffered` Service with `url` pointing to its service page
- **BreadcrumbList:** Home, Industries, Education.
- **FAQPage:** only the Q&As visible on the page, with identical text. Rich results for FAQ are limited, but the markup and visible Q&A help answer engines.
- **Organization:** consistent `@id`, `sameAs`, and address blocks only for real offices. **No AggregateRating or Review about MMC itself.**
- **Calculator page:** WebApplication with `applicationCategory` "BusinessApplication", `offers` price 0.
- **Case pages:** WebPage plus `about` the client Organization. No results markup until numbers are approved.

### 8.8 Linking plan

**Links into the pillar:**
- the homepage Industries panel ("Education" world)
- a nav Industries menu item
- the `/industries/` hub
- Bloom and Sprouts cards on Our Work
- the "In education" block on each of the four service pages
- every education Insights post (in-body link using the anchor "digital marketing for educational institutes" or a close variant)
- both education calculators

**Links out of the pillar:**
- four service pages (workstream cards and the pains matrix)
- `/work/bloom-edutours/` and `/work/sprouts-edu-tours/`
- `/tools/cost-per-admission-calculator/` and `/tools/school-booking-pipeline-calculator/`
- the education funnel glossary
- the admissions calendar article
- the audit modal and contact page

**Supporting Insights cluster** (6 to 8 pieces, each answering one buyer question, dated and reviewed yearly):
1. Admissions calendar for Indian schools, colleges and coaching (updated each year).
2. Enquiry, lead, application, admission: definitions that stop agencies hiding behind leads.
3. How fast should an institute respond to an enquiry, and how to do it on WhatsApp.
4. Cost per admission: how to calculate it and what drives it.
5. What institutes can and can't claim in ads (approvals, rankings, placements, toppers).
6. Parent or student: who to target for school, engineering and coaching admissions.
7. How educational travel and school-programme companies win bookings from principals.
8. Programme landing pages that convert: a checklist for colleges.

Mediagarh already publishes student-behaviour posts (for example "how do Gen Z students search for colleges online"). MMC should differentiate with method, definitions, rules and tools rather than trend listicles.

**Do not create:** city x education pages, education x service pages at launch, or "best education marketing agencies" self-ranked listicles.

### 8.9 Launch checklist specific to this page

- [ ] Confirm the MVJ College of Engineering engagement and services before any mention on the page.
- [ ] Confirm LearningMate logo permission; keep it out of education work.
- [ ] Settle the four trust figures and their labels site-wide (resolve the `TrustLayer.jsx` vs `llms.txt` mismatch).
- [ ] Collect a written-approved quote from Bloom and Sprouts (a decision-maker and an operator).
- [ ] Pull Bloom's and Sprouts' enquiry and booking months to validate the B2B calendar row.
- [ ] Verify this year's exam and counselling dates, and the current ASCI, CCPA and DPDP texts, before publishing the calendar and compliance sections.
- [ ] Decide on ownership policy, budget bands, regional-language capability and lead-time answers for the FAQ.
- [ ] Ship tabs and calculators server-rendered (`prerender.py`); run `audit-pages.py` for word count, H1 and schema.

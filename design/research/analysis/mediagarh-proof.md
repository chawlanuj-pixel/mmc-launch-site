# How Mediagarh proves value, and what MMC should do instead

**Subject:** mediagarh.com, an Indian education-only digital marketing agency (HQ Jodhpur, Rajasthan).
**Sources:** 164 live-site URLs crawled 2026-09-15.
- **Read in full:** all 36 case-study pages that have content, the case-study hub, home, about_us, client_testimonials, our_gallery and best_educational_marketing_company_in_india.
- **Checked for cross-page consistency:** marketing_checklist_for_admissions, contact_us and the web-design service pages.
- **MMC facts:** `MMC Site/llms.txt`, `MMC Site/content/clients.json` and `MMC Site/TrustLayer.jsx`.

**How to read this:**
- "Stated" means the text on the page says it. No location, result or role has been inferred beyond the page text.
- The crawl is text only. Images and videos were counted, not viewed, so logo walls and video testimonials could not be read.

---

## 0. Crawl hygiene: empty pages and duplicate URLs (not analysed)

**24 of the 164 crawled URLs return "Page not found"** (6 words each). 12 of them fall inside this brief's scope:
- 10 are in the case-study family.
- The other two are `home_3` and `old_our_gallery`.

| Live page | Duplicate or dead variant | Status of variant |
|---|---|---|
| client_case_study_svu | client_case_study_shri_venkateshwar_university | 404 |
| client_case_study_isp | client_case_study_international_school_patna | 404 |
| client_case_study_insd | client_case_study_insd_delhi | 404 |
| client_case_study_gd_goenka_health_care_academy | client_case_study_gd_goenka_healthcare_academy | 404 |
| client_case_study_krystal_school_of_excellence | client_case_study_krystal_school_of_excellence_22 | 404 |
| client_case_study_srn_mehta_school | client_case_study_srn_mehta_school_5555 | 404 |
| client_case_study_tsus_school | client_case_study_shree_ram_universal_school_4444 | 404 |
| client_case_study_mindways_study_abroad | client_case_study_mindways | Redirects; identical content (duplicate) |
| education_marketing_client_case_study (hub) | education_marketing_case_studies_22, education_marketing_case_studies_old | 404 (the footer links to /education-marketing-case-studies/, which was not captured) |
| home | home_3 (404), home_old (redirects to /) | 404 / redirect |
| our_gallery | old_our_gallery | 404 |
| (none) | checkcasestudy | 404 (test page) |

**The other 12 not-found URLs** are outside this brief: 12064_2, book_your_slot, branding, education_marketing_company, education_marketing_company_in_india, education_marketing_content_research (and _1), increase_your_admission_pages, lead_automation_agency_for_education_institution, lead_automation_and_nurturing, thirdwave, videos_ad_production_for_education_institution_bangalore.

**Case-study pages the crawl did not capture.** The hub links to 41 case studies. Six were not in the corpus, so only their hub blurb was read: P.K. University, Amber Valley Residential School, ITM University, St. Wilfred's School, BKG Group of Institutes, HKBK Group of Institutions.

**One orphan page.** Apna MBA has a live case page that the hub does not link to.

**The page titled "best educational marketing company in India" contains no proof.** It is an 818-word blog post titled "The Role of Motion Graphics in Educational Marketing company". The URL targets a keyword, and the page carries no proof of any kind.

---

## 1. Proof inventory

**36 unique case studies with content**, grouped by segment. Each row states whether a baseline, a timeframe or a method is given.

**Abbreviations in the table:**
- **LP** = landing pages
- **SMM** = social media
- **Cr** = crore; **L** = lakh
- **"inc."** = the page says "% increase" with no starting value

| # | Client | Type | Location (stated) | Services delivered | Headline result (verbatim or close) | Every metric claimed | Timeframe | Baseline / method given? |
|---|---|---|---|---|---|---|---|---|
| **K-12 schools** | | | | | | | | |
| 1 | Worldview Academy | K-12 ("Global school") | Not stated | Brand guidelines, brochures/hoardings, SMM, website, creatives | "Filled 500+ Premium School Seats In A Matter Of 75 Days" | 523 new admissions; 75% ROAS inc.; 150% post engagement | 75 days; "1 Year & Counting" | No baseline ("lacked an identity"); no method |
| 2 | Shanti Asiatic School | K-12 | Jaipur, Rajasthan | LP, Meta lead gen, SMM, SEO; offline: newspaper ads, hoardings, flyers, auto-rickshaw branding | "150+ Admissions in 3 Months 70% ROAS Growth" | 150+ admissions; 70% ROAS inc.; 95% Instagram followers; first-page SEO | 3 months (no dates) | No / no |
| 3 | SRN Mehta School (page tags it "business school") | K-12, 6,000+ students | Gulbarga, Karnataka | Google awareness + LP, Meta, SMM, creatives, WhatsApp automation | "1100+ Admissions \| Strong Social Media Growth" | 1100+ admissions (headline); tiles: 80+ leads nurtured via WhatsApp, 250% engagement, 90% followers | "around 1.5 years" (tenure only) | No / no. Headline and tiles measure different things |
| 4 | The Shri Ram Universal School (TSUS) | K-12, new school | Ludhiana, Punjab | SMM, LP + Meta, creatives, SEO | "200+ Admissions \| First-Page SEO Rankings" | 200+ admissions; "1st" first-page SEO; 130% followers | None | Implicit zero ("new entrant") / no |
| 5 | International School Patna (ISP) | K-12 | Patna, Bihar | Brand guidelines, Meta, SMM, creatives | "From Online Engagement to Real Admissions \| 265+ in Just Two Years" | Year 1: 120+ admissions; Year 2: 145+; tile: "265+ Quality Admissions Leads"; 85% post interactions; 75% social engagement | Two admission cycles | Year-on-year split only / no |
| 6 | Bodhi International School | K-12 | Jodhpur, Rajasthan | SMM revamp, video, community content, creatives, LP, Google + Meta, SEO, event marketing | "Year 1: 165+ admissions … Year 2: 200+ admissions" | 165+ / 200+ admissions; Rs.2 Cr+ revenue (tile: "2Cr Increase in Revenue"); 1,000% Instagram reach; 563% engagement; 161% post interactions; 20k+ organic YouTube views; 500+ families at offline events | Two consecutive seasons | Year-on-year only / no |
| 7 | The TonsBridge School | K-12 day-boarding | Dehradun, Uttarakhand | Brand narrative, Google + Meta performance, retargeting | "Consistent Enrollment Growth & Enhanced Regional Authority" | 35% more high-quality leads "compared to the previous year"; 100% admission targets met; 90% engagement; 15X ROAS; 145% "growth in digital footprint" | Year-on-year for one metric | Comparator period named (no absolute numbers) / no |
| 8 | Bhartiyam International School | K-12 (CBSE + Cambridge Early Years preschool "Ikebana") | Rudrapur, Uttarakhand | Repositioning, preschool campaign, reels/virtual tours, LP + WhatsApp nurture, hyper-local Meta + Google | "700+ High-Intent Inquiries in One Admission Cycle" | 700+ enquiries; 90% enrolment capacity reached; 82% video engagement; 12X ROAS; 110% online reach; 65% rise in mentions as a "Top Tier" school; 40% better lead-to-campus-visit rate; 50% lower CPL; "premier preschool brand in Rudrapur within 3 months" | One cycle; 3 months (preschool) | No / no |
| **Universities** | | | | | | | | |
| 9 | Suresh Gyan Vihar University (SGVU) | Private university | Rajasthan (implied by the target keyword) | Brand identity + homepage, brochures/standees, video, SMM, 20+ LP, Google Search/Display, Meta, AI-assisted SEO | "driving 2000+ admissions, ₹50+ Cr revenue, and 75%+ ROAS" | 2000+ admissions; ₹50+ Cr ("Increase in Revenue" tile); ROAS 75%+ in the hero but 71X on the tile; 150,000+ video views; 65% Gen Z engagement; 75%+ followers and 40% engagement "within six months"; 38% lead-to-application; 15% fewer drop-offs; 22% lower CPA | Six months (social only) | Qualitative before/after for social; names the tools (SEMrush, AIOSEO) |
| 10 | Aestr by Gyan Vihar | New AI engineering programme (an SGVU sub-brand) | Not stated | Website, LP, Meta awareness + lead gen, creatives, SMM, SEO | "1M+ Reach \| 220% Engagement Boost" | 1M+ reach; 220% engagement; 8,000+ Instagram followers from zero | None | Zero start (launch) / no. No enquiry or admission figure |
| 11 | Rishihood University | Private university | Haryana | Brand campaign, Google Display, PPC/discovery, Meta with lead magnets, creatives, video, nurturing | "Closed 240+ Admissions Worth ₹24 Lakhs Each" | 240+ admissions; ₹24 L per admission; "budget significantly lower than expected"; lower CPL (no figure) | "2025 admission season" | Season named / no |
| 12 | Shri Venkateshwara University (SVU) | University | Not stated | Creatives, SMM, LP, SEO, lead nurturing | "Turning Interest Into Enrollments 220+ in One Academic Cycle" | Headline: 220+ enrolments. Tile: "220+ Quality Leads"; 65% more parent enquiries; 78% engagement | One academic cycle | No / no |
| 13 | Shobhit University | Deemed university | Not stated | LP, Google, Meta, SEO, SMM | Hero reuses Mindways' copy word for word (names "Mindways") | 159.2% Instagram content interactions; 271.1% "Growth in Facebook Performance & Reach in ROAS"; 6+ homepage keywords ranking | "within a short time" | No / no. No enquiry or admission figure |
| **Colleges and higher-education groups** | | | | | | | | |
| 14 | CIMAGE Group of Institutions | College | Patna, Bihar | LP, SMM, Google (search/display/video), Meta, SEO, Career Mahakumbh event, regional influencers, WhatsApp nurture | "1100+ Admissions \| 68% ROAS Growth" | 1100+ (tile: "Increase in Admissions"); 68% ROAS inc.; 95% Instagram followers; first-page SEO. Event: ₹50 L budget → 32,000+ registrations → 18,000+ attendees → 450+ admissions | None | Event spend and funnel stages disclosed; nothing else |
| 15 | CPJ Institute of Management & Technology (CPJIMT) | Management and technology college | Narela, Delhi | Website, LP + Google Ads, SMM, Meta lead gen, creatives, SEO | "60+ Admissions \| 75% ROAS Growth" | 60+ admissions; 75% ROAS inc.; 107.5% followers; 427.6% interactions; Google page 7–8 → page 1 | Started December 2024; "in just 6 months" | **The only numeric pre-engagement baseline on the site** (SEO position); no method |
| 16 | RDJ (Ram Devi Jindal Institute) | Higher-education institute | Not stated ("regional") | LP, SEO, Meta lead gen, creatives, SMM | "60+ Admissions 65% ROAS Growth" | Headline: 60+ admissions. Tile: "60+ Quality Admissions Leads"; 65% ROAS inc.; followers 90% in the text vs 80% on the tile; first-page SEO | None | No / no |
| 17 | MIER College of Education | Teacher education (B.Ed/M.Ed) | Jammu & Kashmir | Repositioning, content, reels, LP, Meta + retargeting | "75+ Admissions in 4 Months with improved local visibility" | 75+ admissions; 137% revenue inc.; 13X ROAS; 65% followers; 55% engagement (stated twice); 38% more lead conversions; 45% lower CPL | 4 months | No / no |
| 18 | AMC Institutions | Higher-education group | Not stated | SMM storytelling, Google, Meta, creatives, short video | "generating 2,393 leads and achieving 6.88X ROAS" | 2,393 leads; ₹1.07 Cr "Attributed Revenue"; 6.88X ROAS | None | No / uses the word "attributed" but never defines it |
| **Business schools and MBA** | | | | | | | | |
| 19 | IZee Business School | Business school (MBA) | Karnataka (Bangalore keywords) | Brand identity, SMM ("80 Days, 40 Companies"), website, SEO, creatives, lead gen, AI lead nurturing, PR/branding | "Generated Admissions Worth ₹6.4 Crores With Targeted Media Campaigns" | ₹6.4 Cr; 120 new admissions; 73% ROAS inc.; 148% followers; first-page SEO. Checklist page: "80 admissions, each generating ₹8 lakhs" | "3 Years & Counting" (tenure only) | No / no |
| 20 | AIMS IBS Business School | Business school | Bengaluru (target keywords) | Brand makeover, SMM, website, SEO, creatives, lead gen, ads, AI nurturing | "Turning Aspirations Into Admissions. 80+ in One Season" | Headline 80+ admissions; tile 60+ new admissions; 56% ROAS inc.; 70% followers; first-page SEO | "One season" (no year) | No / no |
| 21 | Apna MBA | MBA admissions consultancy | Pan-India | Multi-platform lead campaigns (A/B tests, lookalikes), creative/video, automated nurture + retargeting, fee-discount messaging | "DRIVING 400 MBA ADMISSIONS FOR APNA MBA THROUGH TARGETED CAMPAIGNS" | 400 admissions (also given as the target, yet described as "surpassing" it); 30% more engagement and enquiries; "significant boost in its ROI" | None | Target only / no. Older template, not linked from the hub |
| **Paramedical** | | | | | | | | |
| 22 | GD Goenka Healthcare Academy | Paramedical | Not stated | Website, SMM, Meta lead gen, SEO | "Strong ROI \| First-Page SEO Rankings" | 60% growth in admissions; "1st" first-page rankings; 120% Instagram followers | "1.5 Years & Counting" (tenure only) | No / no |
| 23 | Scope (College of Paramedical Education) | Paramedical | Not stated | Creatives, video, Meta + retargeting, LP, Google Business "Call Now" ads | "Scope achieve 300+ admissions … with a 26% ROAS" | 300+ admissions; 40% more lead capture on LP; "26% ROAS Achieved"; 30% more call enquiries | "In just a short span" | No / no |
| **Skilling, vocational and professional courses** | | | | | | | | |
| 24 | LTA School of Beauty | Beauty (CIDESCO/VTCT) | Mumbai (ads also target Pune and Nashik) | Rebrand, website + SEO/Google Business profile, video series, SMM, creatives, programme LP + chatbot, Google + Meta | "125+ Admissions in 4 months From Academy to Industry Leader" | 128 admissions; ₹1.3 Cr ("Increase in Revenue"); 14X ROAS; 24% followers; 45% brand awareness; 52% website visits; 32% more leads in 3 months; 100,000+ video views; 55% and 48% engagement; CTR "40% above industry norms"; 35% fewer drop-offs; 28% lower lead cost | 4 months | No / no |
| 25 | Frameboxx 2.0 | Animation/VFX, 15 centres | "15 Centers Across India" | SMM content, LP iterations, local SEO, creatives, lead gen | "Improved Marketing Efficiency By 37% For 15 Centers Across India" | 37% "marketing efficiency"; 60% ROAS inc.; 45% lead quality; 38% followers; 50+ admissions; 3000+ quality leads | "over 6 months" (in the testimonial) | No; "efficiency" never defined |
| 26 | Krystal School of Excellence | Hospitality and culinary | Not stated | Website, Google + Meta, LP, SMM, creatives, SEO, WhatsApp automation, competitor audit | "90+ Admissions in 3+ Months A Digital Win" | Body: 78 admissions and 800+ quality leads; 59% ROAS inc.; 75% website traffic; 60% rise in enrolments | 3 months; "1 Year & Counting" | No / no |
| 27 | Dunes Aviation Academy | Pilot training, several centres | Not stated | Brochures/banners, SMM makeover, creatives + Meta | "Improved RoI by 6 Times With Just One Extraordinary Campaign" | 60 enrolments; 60% ROAS inc.; 61% rise in enrolments. Checklist page: "60 students for a ₹50 lakh CPL program" | "2 years of focus" | No / no |
| 28 | Srajan International School of Finance (SISF) | Finance school | Not stated | SMM, creatives, SEO, LP, lead funnel | "354 Admissions & More… With A Simple Change" | 354 (body: "above 350"); 79% ROAS inc.; "63 Increase In Followers"; 120% post engagement | "1 Year & Counting" (tenure only) | No / no |
| 29 | Fintelligents | CFA/FRM/CAIA/ACCA courses | "across India and abroad" | Programme LP, Google Search + Display, SMM, creative system, ad videos | Hero reuses Mindways' numbers ("120% more engagement, 3X leads, 25% higher admissions, and a 5x ROAS boost") | 160+ admissions; 22% revenue inc.; ₹90 L+ revenue; 13X ROAS; lead quality 56% and also 38%; 23% lower CPL; 59% engagement | None | No / no |
| 30 | Cloud Intellect | Salesforce (SFDC/SFMC) training | Not stated | Creatives, video, Meta + retargeting, SMM, LP | "In just 3 months … 100+ admissions … and a 475% ROAS" | 100+ admissions; ROAS 475% in the hero but "75% ROAS Achieved" on the tile; ₹45 CPL; 16.5M+ impressions; ₹28.5 L revenue | 3 months from "June" (no year) | Start month only / no |
| 31 | INSD (International School of Design) | Design education franchise | Delhi (hub: "INSD Delhi"); metro and tier-2 cities | Franchise: Meta (lead gen/video/retargeting), creatives, webinar funnel, WhatsApp, video, Google search, VSL landing pages. Admissions: programme campaigns, creative revamp, WhatsApp | "30+ New Franchisees in 24 Months 25x Return On Ad Spend" | Tile: 25+ franchise centres; 32X ROI; 65% lower CPL; ₹3 Cr+ revenue; 95+ admissions; 25% walk-ins and enquiries; 7 Lakh+ profile views; 42% followers. Checklist page: 75+ locations and 600+ admissions | 24 months (the testimonial says "over 2.5 years") | No / no |
| 32 | TechnoSchool | "Education provider" (type unclear) | Not stated | Website, brochures, SMM, LP, creatives, SEO | "Enhanced The Online Base By 60%+ And Drastically Improved The Business" | 70% ROAS inc.; 30% website traffic; 63% followers | "6 Months & Counting" (tenure only) | "nonexistent social channels" / no. No enquiry or admission figure |
| **Coaching and test prep** | | | | | | | | |
| 33 | Prahar Defence Academy | NDA/CDS/AFCAT/SSB coaching | Not stated | LP per exam, Meta + retargeting, SMM, creatives, ad videos | "Building the Next Line of Leaders - 55+ Aspirants Found their Right Choice" | 55+ enrolments; 79% engagement; 9X ROAS; 34% reach; 56% "lead clarity"; 40% lower CPL | None | No / no |
| 34 | AKS IAS | UPSC coaching | Not stated | Website, SMM, LP, creatives, SEO, Google + Meta | "50+ Admissions A Digital Win" | 59+ admissions (tile); 759 Meta leads; 12.2K organic clicks; 899K organic impressions; 4,138+ Google conversions | "1 Year & Counting" (tenure only) | No; counts look like platform exports |
| **Study abroad and edtech** | | | | | | | | |
| 35 | Mindways Study Abroad | Study-abroad consultancy | Not stated | SMM, Meta, Google, creatives, video ads | "From Low Leads to High Enrollments" | Hero: 3X leads, 25% more admissions, 5x ROAS. Tiles: 3.5X overall ROI, 120% engagement, 42% followers, 7 Lakh+ profile views | None | No / no |
| 36 | HeyGuru | Online tutoring (edtech) | Australia, UAE, UK, USA | Print collateral, website, SMM, LP, creatives, Meta performance, video, webinars | "Generated 1,500+ Demo Bookings Through Performance Marketing" | 1,500+ demo bookings; 4 markets; "Multiple" lead-gen campaigns (a word used as a results tile) | "4 Markets & Counting" | No / no |

### Case studies known only from the hub (not crawled)

| Client | Type (from the blurb) | Claim in the blurb |
|---|---|---|
| P.K. University | University | None (visibility and admissions) |
| Amber Valley Residential School | K-12 residential | None (visibility, parent engagement) |
| ITM University | University, two campuses | "generate 2,440 admission leads across two campuses" |
| St. Wilfred's School | K-12, four branches | None (data-led admissions journey, incoming-call optimisation) |
| BKG Group of Institutes | Higher-education group | None |
| HKBK Group of Institutions | Higher-education group | None |

### Site-wide aggregate claims (no case page supports these)

- **Home:** "more than 6 years of experience in the Education space serving 150+ Clients with 80,000+ Admissions".
  - The animated counters "Completed Projects" and "Closed Admissions" render as "0+" in the page HTML.
- **Admissions checklist page:**
  - "After closing 80,000+ Admissions for over 150+ Educational Institutions".
  - "OVER 150+ educational institutes HAVE increased Their Admissions Up to 4x With the Help of THIS ADMISSIONS CHECKLIST".
  - "Get 165% More Admissions … Drive 6x Campus Visits in Just 90 Days".
  - The founder says "After Spending over 500+ million in Advertising" (no currency given).
- **Web design service pages:** "Having served 30+ institutions".
- **About page:** "Mission 2026: To Uplift Lives of 1 Lakh Students".

### How the 36 case studies score on evidence

| Evidence element | Pages (of 36) |
|---|---|
| Admission or enrolment **count** stated | 27 (another 4 give only % or "targets met"; 5 give no enrolment outcome at all: Aestr, Shobhit, TechnoSchool, AMC, HeyGuru) |
| A timeframe for the result | 18 (calendar dates on only 2: CPJIMT "December 2024", Rishihood "2025 admission season"; Cloud Intellect names "June" with no year) |
| Tenure tag only ("1 Year & Counting") | 6 more |
| No timeframe at all | 12 |
| Numeric pre-engagement baseline | 1 (CPJIMT, Google page 7–8) |
| Prior-period comparison | 3 (TonsBridge "previous year"; Bodhi and ISP Year 1 vs Year 2) |
| Media spend disclosed | 1 (CIMAGE event, ₹50 L) |
| ROAS or attribution defined | 0 |
| Page meta description filled in | 0 |

---

## 2. Case study template

### Section structure

There are three variants.

**A. Standard (2024–25, about 24 pages).**

| Order | Block | Evidence |
|---|---|---|
| 1 | Relationship eyebrow: "A Successful Partnership", "1 Year & Counting", "3 Years & Counting", "Built on Mutual Trust" | On every page |
| 2 | "<Client>'s Digital Growth Story" heading, plus 1–2 intro paragraphs | |
| 3 | Scrolling ticker repeating the client name 6 times | |
| 4 | Segment tag ("BUSINESS SCHOOL", "PREMIER K-12 SCHOOL", "UPSC") | Sometimes wrong: SRN Mehta, a K-12 school, is tagged "business school" |
| 5 | **Hero claim** (an H2 led by a number) plus one sentence repeating the numbers | |
| 6 | Challenge / Solution (one or two sentences each), usually under "Cracking The Code for Admissions" | "Cracking The Code" appears on 12 pages |
| 7 | **Results: 3 tiles** (number + label) | |
| 8 | Service breakdown: 4–8 cards ("Landing Pages", "Meta Campaigns", "Ad Creatives", "SEO", "Social Media Growth") | |
| 9 | Optional video-testimonial intro ("In this testimonial, they share how…") | 8 pages |
| 10 | **Testimonial**: text quote + "Name \| Role" | 35 of 36 |
| 11 | "FEATURED WORK": **the same 5 cards on every page** (Frameboxx, IZee, Krystal, Dunes, Worldview), including on those five clients' own pages | 35 of 36 |
| 12 | "Inspired by this Story? Yours could be the next." + REQUEST A PROPOSAL | 36 of 36 |

**B. Long form (late 2025–26: Bhartiyam, Fintelligents, MIER, Prahar, TonsBridge, Bodhi, Cloud Intellect, Scope, Mindways, INSD, LTA).**
- "The Challenge" becomes four named problem cards.
- "Our Solution" becomes per-service cards, each ending "Result: X%" (6 pages).
- Results become 4 tiles.
- The close is "The journey continues…".

**C. Legacy (Apna MBA only).** THE RESULT → THE CHALLENGE → CLIENT TESTIMONIAL (empty in text) → THE ACTION PLAN → RELATED CASE STUDIES.

### Length

Page word counts across the 36 pages:
- Average 577 words (median 533, range 431–943).
- About 130 words of each page are the identical Featured Work block and CTA; the name ticker adds another 12–40.
- Unique narrative is therefore roughly **400–450 words per case**.
- On average there are 1.6 video embeds per page, and 11 pages have two or more.

### How formulaic it is: very

The section order is fixed, and copy has been pasted between clients without editing:

**Other clients' names left in the copy:**
- INSD's challenge says "Mindways struggled with limited reach…".
- Shobhit's hero repeats Mindways' sentence and numbers and still names "Mindways".
- Fintelligents' hero repeats the same Mindways numbers.
- Cloud Intellect's video card says "we created cinematic, story-driven videos that highlighted **Bodhi's** culture".

**Blocks reused word for word:**
- HeyGuru's "Revamped Promotional Materials" paragraph is SGVU's.
- MIER's first "Result: Engagement up 55%, leading directly to enrollment forms" line is LTA's.
- AKS IAS's "Unique Ad Creatives" and "SEO Strategy" text is Krystal's.
- On the AIMS page, "Lead Generation, Done Right" and "Ads Designed for Admissions" are the same paragraph twice.

**Other leftovers:**
- Leftover headings from other pages: "Izee business school" appears in the outlines of the Bhartiyam, MIER, HeyGuru, AKS IAS and AMC pages; "AKS IAS ACADEMY" appears on the HeyGuru and AMC pages.
- Four testimonial quotes are reused across clients (see section 4).

### Three representative headline claims (verbatim)

1. "Closed 240+ Admissions Worth ₹24 Lakhs Each" (Rishihood University)
2. "Filled 500+ Premium School Seats In A Matter Of 75 Days" (Worldview Academy)
3. "Generated Admissions Worth ₹6.4 Crores With Targeted Media Campaigns" (IZee Business School)

The same style also appears in "Improved RoI by 6 Times With Just One Extraordinary Campaign" (Dunes) and "700+ High-Intent Inquiries in One Admission Cycle" (Bhartiyam).

---

## 3. Metrics vocabulary: what education buyers are shown

Ranked by the number of the 36 case pages that use each outcome (checked by script, then by reading).

| Rank | Outcome | Pages | How it is expressed |
|---|---|---|---|
| 1 | Engagement / interactions % | 35 | "563% increase in social media engagement", "Boost In Post Engagement" |
| 2 | **Admission / enrolment count** | 31 mention it (27 give a count) | "150+ Admissions in 3 Months", "Year 1: 165+ … Year 2: 200+" |
| 3 | **ROAS / ROI** | 29 (25 numeric) | Three incompatible forms: a multiple ("13X"), a % increase in ROAS ("73% Increase in ROAS", 12 pages), and a % "achieved" ("26% ROAS Achieved") |
| 4 | Reach / impressions / views | 23 | "1M+ Reach", "16.5M+ Impressions", "7 Lakh+ Profile Views" |
| 5 | Follower growth | 19 | "148% Increase in Followers", "63 Increase In Followers" |
| 6 | First-page SEO rankings | 11 | "1st First-Page Google Rankings", "page 7–8 to page 1" |
| 7 | Cost per lead / CPA | 11 (8 numeric) | "50% reduction in Cost-Per-Lead", "reduced cost per lead to ₹45" |
| 8 | Lead / enquiry counts | 11 | "2,393 Leads Generated", "700+ High-Intent Inquiries", "759 Meta Leads", "1,500+ Demo Bookings", "32,000+ Student Registrations" |
| 9 | **Revenue in ₹** | 10 | "₹50+ Cr", "₹6.4 Crores", "₹1.07 Cr Attributed Revenue", "₹24 Lakhs Each"; often labelled "Increase in Revenue" even when the figure looks like a total |
| 10 | Lead quality % / conversion rate % / website traffic % | 3 each | "Lead quality improved by 56%", "Lead-to-campus-visit conversion rate improved by 40%" |
| 11 | Capacity or target attainment | 3 | "90% Enrollment Capacity Reached", "100% Admission Targets Met", "Achieved enrollment targets" |
| 12 | Segment-specific units | 1 each | Franchise centres (INSD), event registrations → attendance → admissions (CIMAGE), demo bookings (HeyGuru), walk-ins (INSD), call-based enquiries (Scope), "mentions as a Top Tier school" (Bhartiyam) |

**What this says about the market:**
- Buyers expect an **admissions count tied to a season or cycle**, a **ROAS multiple** and a **rupee figure**, in that order. First-page SEO and lower CPL are the supporting cast.
- Social vanity metrics fill every page even though the buyers are trustees and chairmen: engagement appears on 35 pages and followers on 19. They are padding, not what closes the deal.
- Nobody publishes cost per admission, fee payback, the enquiry → application → admission funnel, or campus-visit volume. The one exception is a single 40% lead-to-visit claim.

---

## 4. Credibility assessment

### 4a. The most specific claims, which could in principle be checked

| Claim | Why it is stronger | What is still missing |
|---|---|---|
| CIMAGE Career Mahakumbh: ₹50 L budget → 32,000+ registrations → 18,000+ attendees → 450+ admissions | Discloses spend and every funnel stage, for a public event (implies about ₹1,560 per registration and about ₹11,100 per admission) | Dates, the attribution rule for "admissions directly from the event" |
| CPJIMT: start December 2024, 6 months, Google page 7–8 → page 1 | A real baseline and start date | Which keywords, rank-tracker evidence |
| AMC: 2,393 leads, ₹1.07 Cr "Attributed Revenue", 6.88X ROAS | Non-round numbers and attribution language | The period, the attribution model, the spend |
| AKS IAS: 759 Meta leads, 12.2K organic clicks, 899K impressions, 4,138+ Google conversions | Reads like platform exports | The period. "Conversions" (4,138) against 59 admissions shows conversions are loosely defined |
| ISP 120+ / 145+; Bodhi 165+ / 200+ | Year-on-year splits | The pre-engagement baseline; which years |
| TonsBridge: 35% more high-quality leads than the previous year | The only explicit comparison with a prior period | Absolute numbers, the definition of "high-quality" |
| Rishihood: 2025 admission season | A named season | What "worth ₹24 lakhs each" means (fee over the whole course? It implies ₹57.6 Cr+) |

### 4b. Vague, undefined or inflated

- **Aggregates that cannot be checked against the case studies.**
  - "80,000+ Admissions" across "150+ Clients" in "more than 6 years".
  - Adding up the **highest** admission figure each of the 36 case pages states gives only **about 8,400**. That is roughly 10% of the claim, and several of those figures are labelled "leads" on the page's own tiles.
  - The home counters render "0+" in the HTML.
- **Undefined metrics:**
  - "Improved Marketing Efficiency By 37%"
  - "Enhanced The Online Base By 60%+"
  - "145% Growth in Digital Footprint"
  - "Lead clarity improved by 56%"
  - "65% increase in mentions as a 'Top Tier' school"
  - CTR "40% above industry norms"
  - "271.1% Growth in Facebook Performance & Reach in ROAS"
- **ROAS reported so it cannot be read:**
  - 12 pages give "% increase in ROAS" with no starting ROAS.
  - Scope's "26% ROAS Achieved" and Cloud Intellect's "75% ROAS Achieved" would mean a loss if read literally.
- **Revenue labels:** absolute figures are labelled "Increase in Revenue" (SGVU ₹50+ Cr, LTA ₹1.3 Cr, Bodhi 2Cr). SGVU's own testimonial calls ₹50 Cr "revenue", not an increase.
- **Market-position claims with no evidence:** "rise as one of Patna's most sought-after schools", "Established Ikebana as the premier preschool brand in Rudrapur within 3 months", "LTA dominates CIDESCO searches".
- **Award with no issuer:** "Recognised amongst Top 10 Digital Marketing Industry Leaders" appears on home (×2), about and the checklist page. No awarding body, year or link is given anywhere.
- **Proof by self-reference:** "Search for 'best education marketing agency in India', and you'll see why we keep saying we are experts."
- **Positioning contradicts the roster:** "Our extensive experience focusing solely on colleges and universities" (home), while the case studies include K-12 schools, UPSC and defence coaching, beauty, aviation, a design franchise and online tutoring.

### 4c. Numbers that contradict each other

| Client | Claim A | Claim B |
|---|---|---|
| SVU | "Turning Interest Into Enrollments 220+" (headline) | "220+ Quality Leads" (tile) |
| ISP | "265+ admissions in two years" (120+ and 145+) | "265+ Quality Admissions Leads" (tile) |
| RDJ | "60+ Admissions" (headline); "90% social media follower growth" (text) | "60+ Quality Admissions Leads"; "80% Growth in Instagram Followers" (tiles) |
| AIMS IBS | "80+ in One Season" (twice) | "60+ New Admissions" (tile) |
| Krystal | "90+ Admissions in 3+ Months" | "78 admissions" (next sentence) |
| AKS IAS | "50+ Admissions" | "59+ Admissions" (tile) |
| LTA | "125+ Admissions" | "128" (body, tile, testimonial) |
| Srajan | "354 Admissions" | "above 350" |
| IZee | 120 "New Admissions" (tile) | Checklist page: "80 admissions, each generating ₹8 lakhs" (80 × ₹8 L = the ₹6.4 Cr headline, so 120 is the odd one out) |
| INSD | "30+ New Franchisees in 24 Months", "25x ROAS", "95+ New Admissions" | Tile: "25+ New franchise centres", "32X ROI". Checklist page: "Franchise network expanded to 75+ locations", "600+ admissions". Testimonial: "over 2.5 years" |
| Cloud Intellect | "475% ROAS" (hero) | "75% ROAS Achieved" (tile) |
| SGVU | "75%+ ROAS" (hero) | "71X Increase In ROAS" (tile) |
| Mindways | "5x ROAS boost" (hero, twice) | "3.5X Overall ROI" (tile) |
| Dunes | "Improved RoI by 6 Times" | "60% Increase in ROAS"; 60 enrolments shown next to a "61% Rise in Enrollments" tile. Checklist page: "₹50 lakh CPL program" (CPL misused) |
| SRN Mehta | "1100+ Admissions" (the same figure as CIMAGE) | Tiles: "80+ Leads Nurtured via WhatsApp", engagement, followers |
| Apna MBA | "aimed to secure 400 MBA admissions" | "400 successful MBA admissions … surpassing enrollment targets" |
| Fintelligents | "Lead quality improved by 56%" | "lead quality improved by 38%" (next card) |
| INSD vs Mindways | INSD: "7 Lakh+ Profile Views", "42% Increase in Followers" | Mindways: exactly the same two tiles |
| Fintelligents, Shobhit vs Mindways | Hero "120% more engagement, 3X leads, 25% higher admissions, and a 5x ROAS boost" | The same numbers pasted onto three different clients |

### 4d. Testimonials that have been reused or do not match

- **Same quote, different people:** Dunes (Mukesh Mathur) and Krystal (Chowdhry Md. Talib) carry the identical quote, "Mediagarh has made a big difference for us! Their fresh ideas and commitment…".
- **Same person and quote on two clients:**
  - "Gurpreet Singh Bansal | Chairman" appears on both GD Goenka Healthcare Academy and TSUS. The quote says "our school's digital reputation", which fits TSUS.
  - "Abhishek Jain | Chairman" appears on both CPJIMT and SRN Mehta School. The quote says "From page 7 to page 1 rankings", which is CPJIMT's story. The SRN Mehta page itself says the school is led by Mr. Pritam Mehta and Mr. Chakor Mehta.
- **Paraphrased reuse:** Srajan's quote ("Working with Mediagarh felt like adding true partners… They didn't just boost our numbers—they brought our brand to life in a way we hadn't imagined") mirrors Mindways' quote. Srajan's attribution also copies Dunes' title, "Accountable Manager & COO".
- **Names and roles that differ between pages:**
  - "Mr. Navneet Singh" (case) vs "Mr. Navneer" (testimonials page)
  - "Chowdhry" vs "Chowdhury"
  - "Sunjey Agarwal, Founder & Director" vs "Sunjey Aggarwal, Director"
  - "Pranav Raj Aggarwal" vs "PRANAV AGGARWALL"
  - SGVU "Sunil Sharma" (no role) vs the testimonials page's "Dr. Sudhanshu Sharma, Chief Mentor"
  - ISP "Principal" (unnamed) vs "Ms. Shazma Khan, Director"
  - AIMS "Dr. Venkatesh" vs "Dr Venkatesh A. Arakeri Founder & Director \| Ambika Venkatesh Professor"
- **Testimonial scope narrower than the case study claims:**
  - Bodhi: "We engaged Mediagarh two years ago **for social media marketing**", while the page credits SEO, performance marketing, landing pages and ₹2 Cr+ revenue.
  - Frameboxx's quote is a pre-results endorsement: "I also went through their presentation on what they can do for me, and I'm confident it would bring a lot of value."
- **Voice problems:**
  - LTA's testimonial is signed "Team LTA School of Beauty" and repeats the agency's numbers (128 admissions, ₹1.3 Cr).
  - LTA's challenge section slips into the client's first person ("our enrollment growth had stalled").
  - SGVU's quote repeats the headline numbers word for word.

### 4e. Vanity metrics used as proof

- **Pages with no pipeline outcome at all.** Five case studies rest entirely on vanity metrics: Aestr (reach, engagement, followers), Shobhit (interactions, "Facebook Performance & Reach in ROAS", keywords), TechnoSchool (followers, traffic, ROAS %), AMC (leads and revenue, but no admissions) and HeyGuru (demo bookings).
- **Vanity numbers promoted to results tiles:**
  - "63 Increase In Followers" (Srajan) is 63 people.
  - "7 Lakh+ Profile Views" appears on two clients.
  - "1,000% increase in Instagram reach" (Bodhi).
  - Follower growth appears on 19 of 36 pages and engagement on 35.

### 4f. Site hygiene that undermines trust

- 24 "Page not found" URLs, 8 duplicate case-study URL pairs, and 6 case studies linked from the hub that the crawl did not capture.
- Empty meta descriptions on all 36 case pages.
- Typos in proof content: "International School of **Patana**", "**Fintellignts**", "mier-college-of-**eduction**" (URL), "BOOK FREE **CUNSULT**", "ATTRACTIVE SOCIAL MEDIA **CONTEN**".
- On the testimonials page, one of the 19 names in the outline (Ravindra Singh Vaghela, Bright Education) is missing from the rendered text.
- The testimonials page's meta description is a contact blurb claiming "five branches". The footer lists six cities (Jodhpur, Jaipur, Kolkata, Gurugram, Chennai, Bengaluru), and the contact page gives addresses for two (Jodhpur, Jaipur).

---

## 5. Testimonials and people

### 5a. Every named testimonial

| Person | Role | Institution | Where it appears | Format signal |
|---|---|---|---|---|
| Dr. Zaheesh Moideen | Chairman & Founder | IZee Group of Institutions | Home (×2 in the carousel), IZee page, checklist (×2), testimonials page | Text (+ video section on IZee page) |
| Mr. Pranav Raj Aggarwal | CEO | INSD | Home (×2), checklist (×2), testimonials page | Text |
| Mr. Tarun Kamboj | Director of Marketing | SVU | Home, SVU page, checklist | Text |
| Mr. Sunjey Agarwal | Founder & Director | INSD | INSD page, testimonials page | Text |
| Arastu Sharma | CEO | Aestr by Gyan Vihar | Aestr page | Text |
| Dr. Venkatesh (A. Arakeri) | Founder & Director | AIMS IBS | AIMS page, testimonials page | Text |
| Mr. Bharat Goel | Founder & Trustee | Bhartiyam International School | Bhartiyam page | Text |
| Mr. Namit Bhandari | Director | Bodhi International School | Bodhi page, testimonials page | Text |
| Dr. Neeraj Agarwal | Director | CIMAGE | CIMAGE page | Text |
| Mr. Sumit Mahakalkar | Founder | Cloud Intellect Pvt Ltd | Cloud Intellect page | Text |
| Abhishek Jain | Chairman | CPJIMT (reused on SRN Mehta) | 2 pages | Text |
| Mr. Mukesh Mathur | Accountable Manager & COO | Dunes Aviation | Dunes page, testimonials page | Text + video section |
| Krupa Shukla | Co-Founder | Fintelligents | Fintelligents page | Text |
| Rajesh R. Turakhia | Founder & Director | Frameboxx 2.0 | Frameboxx page, testimonials page | Text + video section |
| Gurpreet Singh Bansal | Chairman | Unclear (used for both GD Goenka and TSUS) | 2 pages | Text |
| Mr. Chowdhry Md. Talib | CEO | Krystal School of Excellence | Krystal page, testimonials page | Text + video section |
| Prof. Adit Gupta | Principal & Director | MIER College of Education | MIER page | Text |
| Mr. Anirudh Gupta | Founder | Mindways | Mindways page (two URLs) | Text |
| Mr. Ashwin Humne | Marketing & Operations Head | Prahar Defence Academy | Prahar page | Text |
| Smita Jindal | Director | RDJ Institute | RDJ page | Text |
| Mr. Sahil Aggarwal | Co-Founder & CEO | Rishihood University | Rishihood page, testimonials page | Text + video section |
| Ankita Arora | Trustee | Scope College of Paramedical Education | Scope page, testimonials page | Text |
| Mr. Dinesh Goyal | Chairman | Shanti Asiatic School | Shanti page | Text |
| Kunwar Shekhar Vijendra | Chancellor | Shobhit University | Shobhit page, testimonials page | Text + video section |
| Mrs. Ankita Namdeo | Accountable Manager & COO | Srajan | Srajan page | Text |
| Sunil Sharma | (no role) | SGVU | SGVU page | Text + "leaders' reflections" video section |
| Mr. Jebaselvan Baskaran Sagayaraj | Founder & CEO | TechnoSchool | TechnoSchool page | Text |
| Mr. Navneet Singh | Founder | Worldview Academy | Worldview page, testimonials page ("Navneer") | Text |
| Manish Wadhwa | CTO & Founder | HeyGuru | HeyGuru page | Text |
| Mr. Vijay Nagar | Chairman | The TonsBridge School | TonsBridge page | Text |
| Mr. S Shashank | Founder & CEO | AKS IAS | AKS IAS page | Text |
| Dr. Yuvaraju B N | (no role) | AMC Institutions | AMC page | Text |
| (unnamed) Principal | Principal | International School Patna | ISP page | Text |
| "Team LTA School of Beauty" | (none) | LTA | LTA page | Text |

**Names that appear only on the testimonials page** (name and role only; no quote text in the crawl):
- Dr. Keshav Badaya, "Hon'ble Secretary" (no institution given)
- Dr. Sudhanshu Sharma, Chief Mentor, SGVU
- Preetam Mehta, Managing Director, SRN Mehta School (his own school's case page carries someone else's quote)
- Mr. Praduman Shukla, Chief Business Officer, Mahendra's Educational Pvt. Ltd
- Mr. Ravindra Singh Vaghela, CEO, Bright Education (outline only)
- Ms. Snehashree Dash, Mentor Expert, APNA MBA
- Ms. Shazma Khan, Director, International School Patna

That makes about **39 named individuals** in total.

### 5b. Roles represented

Counted across the 34 attributions on case pages and home:

| Role | Count |
|---|---|
| Founder / co-founder (incl. Founder & CEO, Director, Trustee or CTO) | 13 |
| Chairman (not described as founder) | 4 |
| CEO (not founder) | 3 |
| Director | 3 |
| COO / Accountable Manager | 2 |
| Marketing head (Director of Marketing; Marketing & Operations Head) | 2 |
| Chancellor, Trustee, Principal & Director | 1 each |
| No role given | 2 |
| Unnamed | 2 |

**Who is missing:**
- 26 of the 30 named people with a role are owners or top leadership.
- None is an **admissions head or counsellor**.
- There are **no parents, students or alumni**.

### 5c. Video vs text

- **Case pages:** all 36 carry a text quote, although Apna MBA's "CLIENT TESTIMONIAL" block is empty in the text, probably because it is a video.
  - 8 pages add a video-testimonial section ("In this testimonial, they share…" on Dunes, Frameboxx, Rishihood and Shobhit; "voices" sections on IZee, Krystal, SRN Mehta and SGVU).
  - The text rarely says what is in the video.
- **Testimonials page:** 19 names and roles appear as headings with no quote text, and the page reports 1 video and 3 images. The quotes are presumably inside media, so the format could not be confirmed from the text crawl.
- **Home:** the carousel has 5 slots but shows only **3 distinct testimonials** (IZee, INSD, SVU). The same three are repeated on the checklist page.

### 5d. Founder and team visibility

- **Pankaj Budhwani** has a different title on each page:
  - "Founder & CEO" on home.
  - "founder and marketing director" on about.
  - "the MD" on the checklist page.
  - His bio says "in the digital marketing space for over a decade" and "aspiring author". Home links his LinkedIn, and a founder quote ("make money for our clients while positively impacting the lives of students") is repeated on home and about.
- **Vanshika Agarwal** is also "founder and managing director". The bio says she is "the better half of Pankaj Budhwani" and started as a law intern, then social media manager.
- **Team:**
  - About lists about 44 staff by name and role: HR, project management, business development, 7 social, 2 content, a creative head, 5–6 designers, 6 video editors, SEO, 1 Meta Ads manager + 1 Meta executive, 4 Google Ads, 4 developers, 4 UI/UX.
  - There are no bios, certifications, LinkedIn links, platform partner status or years of experience for anyone except the founders.
  - Roughly 6 of 44 are paid-media specialists.
- **Gallery:** only culture photos (Diwali 2023/2025, Malaysia Trip 2025, Osian Trip 2024, Ganesh Chaturthi, Workshop 2023, "Mediagarh Scale Up 2026"). There is no client work, client events or award photography.

### 5e. Awards and recognition

| Claim | Where | Source given |
|---|---|---|
| "Recognised amongst Top 10 Digital Marketing Industry Leaders" | Home (×2), about, checklist | **None** (no issuer, year or link) |
| "Mediagarh has connections in the media industry" (PR page) | pr_activities | No coverage is listed |
| Google Business profiles | Home and other pages link two unlabelled share.google URLs | Not labelled as reviews, and no rating or count is shown |
| Platform partner badges (Google Partner, Meta Business Partner) | Not found in text | n/a |

---

## 6. Client roster

**How many clients can be identified:**
- 42 clients have case pages: 41 on the hub plus the orphaned Apna MBA page.
- 2 more are named only on the testimonials page: Mahendra's Educational, Bright Education.
- That gives **about 44 identifiable institutions**, against the "150+ Clients" claimed on home.
- There are logo walls, but the logos cannot be read from the crawl: home has 122 images (73 with no alt text) under "We Love Our Clients"; the checklist page has "BRANDS THAT WE HAVE HELPED"; 41 of the 44 hub card images have no alt text.

### Mix by segment (42 case-study clients)

| Segment | Count | Clients |
|---|---|---|
| K-12 schools | 10 | Worldview, Shanti Asiatic, SRN Mehta, TSUS, ISP, Bodhi, TonsBridge, Bhartiyam, Amber Valley*, St. Wilfred's* |
| Skilling / vocational / professional | 9 | LTA (beauty), Frameboxx (animation), Krystal (hospitality), Dunes (aviation), Srajan (finance), Fintelligents (finance certifications), Cloud Intellect (Salesforce), INSD (design franchise), TechnoSchool |
| Colleges and higher-education groups | 7 | CIMAGE, CPJIMT, RDJ, MIER (B.Ed), AMC, BKG*, HKBK* |
| Universities | 7 | SGVU, Aestr (SGVU programme), Rishihood, SVU, Shobhit, P.K. University*, ITM University* |
| Business schools / MBA | 3 | IZee, AIMS IBS, Apna MBA (consultancy) |
| Paramedical | 2 | GD Goenka Healthcare Academy, Scope |
| Coaching / test prep | 2 | Prahar Defence (NDA/CDS/SSB), AKS IAS (UPSC) |
| Study abroad | 1 | Mindways |
| Edtech (online tutoring) | 1 | HeyGuru |
| Educational travel / B2B services sold to schools | **0** | none |

\* Known only from the hub blurb.

### Geography (stated only)

| Region | Count |
|---|---|
| Rajasthan | 3–4 (Jaipur, Jodhpur, SGVU by keyword) |
| Karnataka | 3 (IZee and AIMS in Bengaluru, SRN Mehta in Gulbarga) |
| Bihar | 2 (Patna ×2) |
| Uttarakhand | 2 (Dehradun, Rudrapur) |
| Delhi | 2 (CPJIMT, INSD) |
| Punjab | 1 |
| Haryana | 1 |
| Maharashtra | 1 (Mumbai) |
| Jammu & Kashmir | 1 |
| Multi-centre or pan-India | 3 (Frameboxx, Apna MBA, Fintelligents) |
| International | 1 (HeyGuru: Australia, UAE, UK, USA) |
| Not stated | about 15 |

**Pattern:** a north-India and tier-2/3-city skew, anchored by the Jodhpur HQ, plus Bengaluru B-schools. There is no metro flagship K-12 school or top-tier university.

### Recognisable names and how logos are used

- **Recognisable nationally or regionally:** Rishihood University, Suresh Gyan Vihar University, Shobhit University, ITM University, INSD, Frameboxx, CIMAGE (Bihar), Mahendra's (coaching), The TonsBridge School (Dehradun).
- **Logos are used as volume signals:** a home logo strip, the checklist brand wall, and a 41-card hub where each card is a logo plus a one-line claim. There are no segment filters and no names in alt text.

---

## 7. Proof that works for education buyers: patterns MMC should match

1. **Frame outcomes by admission cycle or season.** "in One Admission Cycle", "Year 1: 165+ … Year 2: 200+". Buyers plan and judge in seasons, not quarters.
2. **Put a count of enrolments first.** 27 of 36 pages do. For a trustee or chairman, the admissions number is the scoreboard. Revenue is shown as fee value ("₹24 Lakhs Each", "80 admissions, each generating ₹8 lakhs").
3. **Match the testimonial giver to the buyer's role.** Chairman, founder, chancellor, principal: people endorsing an agency to their peers.
4. **Use segment-native language and funnel steps.** Parents and campus visits for K-12; aspirants and demo classes for coaching; franchisees and webinars for franchises; prospectus delivery and WhatsApp nurture; counselling. The Bhartiyam lead → campus-visit claim and the CIMAGE registration → attendance → admission funnel are the best examples.
5. **Show an integrated channel mix that includes offline.** Newspaper ads, hoardings, auto-rickshaw branding, brochures and events (Shanti Asiatic, Bodhi, CIMAGE) sit alongside Meta and Google. Institutions buy one partner for the whole admissions push.
6. **Show local search wins.** "best international school in Jodhpur", "page 7–8 to page 1", "Patna-specific education keywords". Local visibility is concrete to a school owner.
7. **Show tenure and renewal.** "3 Years & Counting", "1.5 Years & Counting", "two consecutive admission seasons". Staying another cycle is read as proof.
8. **Show breadth by segment.** A 41-card grid lets every buyer find "someone like me".
9. **Break down what was built.** Website, landing pages, creatives, social and nurture flows are each named, so buyers can see the scope they are paying for.

---

## 8. Gaps MMC can exploit to look more credible

Ranked by impact on a sceptical education buyer.

| Rank | Gap in Mediagarh's proof | Evidence | How MMC exploits it |
|---|---|---|---|
| 1 | **No method behind any number** | 0 of 36 define ROAS or attribution; 1 of 36 discloses spend; 1 has a numeric baseline; ROAS appears in 3 incompatible forms | Publish a short "How we count" note: definitions (enquiry, qualified enquiry, application, admission/booking), attribution rule, periods. Put a method line under any future figure |
| 2 | **Numbers contradict each other across pages** | 19 conflicts in 4c, several spanning pages (IZee 120 vs 80; INSD 30+ / 25+ / 75+; Cloud Intellect 475% vs 75%) | One source of truth (MMC already has `content/clients.json`) plus an evidence log. Every number appears once and is identical everywhere |
| 3 | **Recycled and mismatched testimonials** | 4 quotes reused across clients; about 8 name or title mismatches; one testimonial describes a narrower scope than the case study claims | Every quote named, titled, dated, approved in writing and used once. Where possible, two voices per client (decision-maker and operator) |
| 4 | **Leads and admissions blurred together** | SVU, ISP and RDJ headlines say admissions or enrolments while their tiles say "leads"; 4,138 "conversions" vs 59 admissions (AKS IAS) | Strict funnel vocabulary and an education glossary, extending MMC's existing D2C glossary format |
| 5 | **Vanity metrics carry the proof** | Engagement on 35 pages, followers on 19; 5 cases with no enrolment outcome | Lead with pipeline economics: cost per qualified enquiry, cost per admission/booking, fee payback. This fits MMC's contribution-margin positioning and existing calculators (Break-even ROAS, CAC Runway, LTV:CAC) |
| 6 | **Aggregates and an award that cannot be verified** | "80,000+ Admissions" vs about 8,400 summed from the case pages; counters render "0+"; "Top 10 Industry Leaders" with no issuer | Publish only scoped, dated figures, never a site-wide admissions total. Where it helps, point buyers to checks outside MMC's control: live sites, Meta Ad Library, Lighthouse scores |
| 7 | **Templated, copy-pasted case pages** | The same Featured Work block on 35 pages; other clients' names left in the copy; wrong segment tags | Fewer, deeper case pages, each specific to one engagement, with dates, "last updated" and a caveats box ("what else changed that season") |
| 8 | **No operator or end-user voices** | 0 admissions heads, counsellors, parents or students among about 39 names | Add the person who handles enquiries (admissions or sales head) describing what changed in their day. Their account is harder to fake and more believable |
| 9 | **Team credentials invisible; founder titles inconsistent** | 44 staff names with no bios or certifications; Pankaj is "Founder & CEO", "founder and marketing director" and "MD" on different pages | A senior team with named responsibilities per workstream. Present MMC's small team (`llms.txt`: "A team of four") honestly as "the people on your account are the principals" |
| 10 | **No B2B education cases at all** | 0 of 42 clients sell to schools (educational travel, school programmes); every Mediagarh case is an institution recruiting students | MMC's Bloom Edutours and Sprouts Edu Tours are B2B educational-travel operators selling to schools. That position is uncontested, and MMC can claim it truthfully without numbers |
| 11 | **Poor hygiene: dead pages, empty metadata, typos** | 24 not-found URLs, 8 duplicate pairs, 36 empty meta descriptions | Clean URLs, structured data and one canonical page per client; MMC's `content/seo.json` and `schema.json` pipeline already supports this |

---

## 9. Recommended proof framework for MMC's education landing page (stronger and honest)

### 9a. What MMC can truthfully use today (from the repo)

| Asset | Status in repo | Use on the education page |
|---|---|---|
| **Bloom Edutours** | `clients.json`: B2B; services web, leadgen, creative, social; supplied by MMC 2026-08-24 | Name, segment ("educational travel, B2B") and the four workstreams. No results |
| **Sprouts Edu Tours** | Same as Bloom | Same as Bloom |
| **MVJ College of Engineering** | `clients.json`: B2C; the same four services, but `"_source": "artwork"` and listed under `_pending_confirmation` (read from mockups) | **Confirm the engagement and services first.** Until then, leave it out of the education case section |
| **LearningMate** | `clients.json`: B2B, `"_source": "logo-pack"`, services empty | Logo in a general "brands we've worked with" strip only. Do not present it as an education marketing engagement or imply any services |
| **The four published figures** | `llms.txt`: 8.7x median blended ROAS; Rs 248Cr+ revenue compounded across the client book; 14 of 14 brands renewed; 27 months median client tenure | See 9b |

**Two honesty points to fix before the education page ships:**

1. **The "four verified figures" are not consistent inside MMC's own site.**
   - `llms.txt` lists 27 months median tenure as the fourth figure.
   - `TrustLayer.jsx` shows "4 Countries · India · UAE · UK · US" in that slot, and labels the others "since 2019", "last 12 months" and "last year".
   - Settle on one set of four, with identical labels everywhere. Mediagarh's weakest point is inconsistency, so MMC must not show the same flaw.
2. **Bloom and Sprouts are not institutes.** They are educational-travel companies whose buyers are schools. Say "education sector" or "selling to schools", not "institutes we've grown". MVJ, once confirmed, is the only institution.

### 9b. Page proof stack, in order

1. **Evidence policy line (above the fold or near the first proof).**
   Example copy: "Every figure on this page has a definition, a period and a source we can show you on a call. We don't publish client results we can't evidence."
   This turns MMC's rule into the differentiator.
2. **"Who we do this for": two education models, stated truthfully.**
   - *Selling to schools (B2B):* Bloom Edutours, Sprouts Edu Tours: website, lead generation, performance creative, social.
   - *Recruiting students (B2C):* MVJ College of Engineering, same four workstreams, **after confirmation**.
   - No numbers, just scope. Show the workstream count the way `CaseStudies.jsx` already does.
3. **Show the work.** This proof needs no numbers, and a buyer can check it independently:
   - Live website link; before/after screenshots, each with a date.
   - Landing page and enquiry form flow.
   - A creative set, with a **Meta Ad Library link** for each brand (third-party, public, checkable).
   - Social grid samples.
   - Page speed before/after (Lighthouse), if MMC rebuilt the site.
4. **How MMC measures education pipelines.** This proves method, not results:
   - A funnel diagram with definitions: enquiry → qualified enquiry → call/visit → proposal/application → booking/admission.
   - Named attribution rule and reporting cadence.
   - A sample dashboard, clearly labelled "Sample layout, not client data".
   - Seasonality calendars:
     - School trip planning windows for B2B.
     - Engineering admissions and counselling windows for B2C.
5. **Retention proof, scoped honestly.**
   - "14 of 14 brands renewed" and "27 months median client tenure" are relevant to any sector, and they are the substantiated version of Mediagarh's "3 Years & Counting" tags.
   - Label them "across MMC's whole client book, not education-only".
   - **Keep "8.7x median blended ROAS" and "₹248Cr+" off this page, or footnote them as book-wide and D2C-weighted.** Mediagarh has taught education buyers to read "13X ROAS" as an admissions result, so an unqualified 8.7x next to education logos invites exactly the misreading MMC's rule forbids.
6. **Client voices.**
   - One named, titled, dated, written-approved quote per client, never reused. Ideally a 60–90 second video.
   - Pair the decision-maker (founder or principal) with the operator (sales, admissions or partnerships lead).
   - Ask them to describe what changed in the process (enquiry handling, lead quality, time saved), not numbers MMC cannot yet evidence.
7. **Tools as proof of thinking.** Extend the calculator suite with:
   - A **Cost per Admission / Fee Payback calculator** (B2C).
   - A **School-Booking Pipeline calculator** (B2B: enquiries → meetings → confirmed trips → students per trip → booking value).
   - An **Education funnel glossary** (enquiry vs lead vs application vs admission).
   None of this exists on Mediagarh.
8. **A ready-made "case card" format for when numbers exist.**
   - Sections: Context (segment, city, programme or trip type, cycle) → Starting point (baseline window and figures) → What we ran (workstreams, dates) → What changed (metric | before | after | period | source) → **What else changed** (fee change, new programme, season effects) → Quote → Approved by / date.
   - The caveats box is the single strongest credibility signal MMC can show against Mediagarh's templated pages.
9. **CTA:** an evidence-first audit ("Enquiry-to-admission funnel audit"). `AuditModal.jsx` already exists.

**What not to do:**
- A site-wide admissions or leads total.
- "% increase" without a base and a period.
- Followers or engagement as outcomes.
- "Top/best agency" or unsourced award claims.
- Reusing a testimonial.
- Listing services for MVJ before confirmation, or for LearningMate at all.
- Calling Bloom or Sprouts "institutes".

### 9c. What to start collecting now

**Metrics per client.** Always capture baseline window, campaign window, spend, source system and a dated export or screenshot.

| Client model | Metrics to log monthly | Baseline to capture now |
|---|---|---|
| **B2B educational travel (Bloom Edutours, Sprouts Edu Tours)** | Website sessions and enquiry form submissions (GA4); **qualified enquiries** (definition: school name + decision-maker role + trip window); cost per qualified enquiry by channel; discovery calls or meetings booked with schools; proposals sent; **trips confirmed**; students per booking; booking value (₹); enquiry-to-booking cycle length in days; repeat schools; share of bookings from digital vs referral; creative CTR and hook rate by format | 8–12 weeks of pre-change enquiry and booking data, or the same season last year; site conversion rate and Lighthouse scores before each redesign ships |
| **B2C college (MVJ College of Engineering, once confirmed)** | Enquiries by programme; cost per enquiry by channel; contactable-lead rate; counselling calls and campus visits; applications started and submitted; application fee paid; **seat confirmations / admissions**; **cost per admission**; fee value of admissions; results per cycle vs the previous cycle | The previous admission cycle's enquiries, applications and admissions by source (from the college's CRM or admissions office) |
| **All education clients** | Workstream start and end dates; assets shipped (pages, creatives, flows) with dates; response time to enquiries if MMC runs nurture | Screenshots of the site, ads and social grid before MMC's work |

**Permissions to secure in writing, per client.** Add a case-study clause with an approval step to every SOW:

1. Logo use (and for which channels).
2. Naming the client together with the services.
3. **Each specific figure**, exactly as it will be worded, with its period.
4. Quote text + name + title + photo.
5. Video testimonial: recording, channels, duration of use.
6. Screenshots of site, ads and dashboards, with masking rules (no student or parent personal data; this is child-related data for schools).
7. Agreement to take reference calls.
8. A re-approval date (for example, annually).

Specific to the current roster:
- **MVJ:** confirm the engagement and services before anything goes live.
- **LearningMate:** confirm logo permission and whether any services should be recorded.

**Formats to produce:**
- The one-page case card from 9b.8.
- Dated before/after site screenshots.
- Meta Ad Library links.
- A 60–90 second client video: decision-maker plus operator.
- Milestone snapshots at 30 days, 90 days and end of cycle.
- A process pack (funnel map, reporting template).
- A private "proof on request" PDF for sales calls, containing figures clients have approved for one-to-one sharing but not for publication.

**Governance:**
- Keep an evidence log (one row per figure): client, figure, definition, period, source, file link, approved (Y/N), approver, approval date.
- Only rows marked approved may reach `content/clients.json` as a `results` entry, which matches the rule already written in that file's `_note`.
- Review quarterly so that every published number stays identical everywhere it appears.

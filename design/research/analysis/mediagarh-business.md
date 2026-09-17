# Mediagarh (mediagarh.com): business, messaging, conversion, IA/SEO and visual review

Competitor analysis for Monday Marketing Company (MMC): its new site and its education landing page.
Scope: business, market, messaging, copy, services, conversion design, site structure/SEO, visual language. Case studies and the blog are only touched where they explain positioning.
Date of review: 15 Sep 2026.

---

## 0. Method, sources and caveats

- **Corpus:** `scratchpad/corpus/mediagarh/text/*.md` and `pages/*.json`, one pair per URL in the 164-URL sitemap (`corpus/mediagarh-urls.json`). I read all the core and service slugs in the brief in full. I also ran sitewide stats over all 164 pages: titles, meta descriptions, schema types, image alt text, duplicate bodies.
- **Live DOM probe:** own tab in headless Chrome at 1440x900 with a desktop UA. It covered 13 URLs: home, 7 service pages, the paid LP, testimonials, contact, the live PR page and the Lead Automation nav target. For each page it captured:
  - H1s and hero copy
  - computed fonts and colours, and Elementor kit tokens
  - fixed/sticky elements and popups
  - forms and their fields
  - tel / WhatsApp / Calendly links
  - third-party scripts
  - counter target values
  - Raw output: `scratchpad/analysis/mg_probe.json`. Script: `scratchpad/mgbiz_shots.py`.
- **Screenshots (6 new, all in `scratchpad/analysis/shots/`):**
  - `mg-home-top.png`
  - `mg-home-scroll1.png`
  - `mg-seo-service-top.png`
  - `mg-increase-admission-lp-top.png`
  - `mg-client-testimonials-top.png`
  - `mg-google-ads-scroll1.png`
- **Screenshots (3 viewed from an earlier job, in `scratchpad/`):**
  - `mg-landing-page-services-for-educational-institution-hero.png`
  - `mg-education-marketing-client-case-study-hero.png`
  - `mg-colleges-hero.png` and `mg-izee-case-hero.png`
- **Caveat 1, the crawl missed hero sections.** The static crawl dropped the Elementor hero on the home page and most service pages. The live DOM does have H1s there, e.g. home "FOR EDUCATION INSTITUTES WHO DREAM BIG...", SEO "AI-POWERED SEO STRATEGIES FOR YOUR INSTITUTION". So:
  - Corpus word counts exclude roughly 30-40 hero words per page.
  - The crawl's "no H1 on 60 of 140 live pages" is **not reliable**. H1 findings below come from the live probe.
- **Caveat 2, numbers.** Proof figures are JavaScript count-up counters that sit at "0" in the HTML. The real target values come from the counters' `data-to-value` attributes, gathered by the probe.
- **Caveat 3, capture conditions.** Screenshots were taken after a 7-second wait with no interaction. Anything that needs a click, or a later timed popup, will not show.

---

## 1. Business crux

### What they are
- **Legal entity:** "Mediagarh Technosoft Private Limited" (terms_and_conditions).
- **Base:** headquartered in Jodhpur, Rajasthan (142 Pal Rd, Ravi Nagar), with a second office in Jaipur (Evershine Tower, Vaishali Nagar).
  - The footer lists offices in Jodhpur, Jaipur, Kolkata (an address in Gariahat), Gurugram, Chennai and Bengaluru.
  - The contact page lists only Jodhpur and Jaipur.
  - The client_testimonials meta description says "five branches".
- **Founders:** Pankaj Budhwani ("Founder & CEO"; "in the digital marketing space for over a decade") and Vanshika Agarwal ("founder and managing director... also the better half of Pankaj Budhwani").
- **Team (about_us):** 44 named staff plus the 2 founders. By role:

| Function | Headcount |
|---|---|
| HR | 2 |
| Project manager | 1 |
| Business development | 3 |
| Social media | 7 |
| Content writers | 2 |
| Creative head | 1 |
| Graphic designers | 5 |
| Video editors | 6 |
| SEO | 3 |
| Google Ads | 4 |
| Meta Ads | 2 |
| Developers | 4 |
| UI/UX | 4 |

  - Roughly half the team is creative and content production. Paid media is 6 people.
  - One project manager against claims of "150+ clients" and a "Dedicated account manager" (seo page) raises a capacity question, though the team page may be incomplete.
- **Tech stack:** WordPress 6.7.7, Elementor 4.1.3, WPForms.
- **Tracking stack (probe):**
  - Google Tag Manager, Google Analytics and Google Ads (doubleclick)
  - Meta Pixel and LinkedIn Insight
  - Three session-replay / heatmap tools: Microsoft Clarity, Contentsquare, Smartlook
  - A script from `bzrcdn.openai.com` (an OpenAI-hosted tag; I did not verify its purpose)
  - `t.mediagarh.in`, loaded on the 404 template

### Service catalogue (as sold)

| Menu item (nav "Services") | Live page | State |
|---|---|---|
| Search Engine Optimization | /seo-agency-for-educational-institutes/ | 522 words; duplicate at /seo/ |
| Social Media Advertising | /social-media-growth-agency-for-educational-institutions/ | 618 words; duplicate at /social-media-advertising/ |
| Web Design & Development | /web-design-and-development-agency-for-education-institutions | 302 words; duplicate at /website-design-development/ |
| Video Ad Production | /videos-ad-production-for-education-institution/ | 186 words; /video-ad-production/ redirects here |
| Creative Designing | /creative-design-agency-for-education-institution | 259 words; duplicate at /creative-designing/; near-duplicate Dubai page |
| Google Ads (Search, Display, Video) | /google-ads-search-display-video/ | 323 words; duplicate at /google-ads-agency-for-education-institution/ |
| Lead Automation & Nurturing | /lead-automation-agency-for-education-institution/ | **404 "Page Not Found"** (probe) |
| Landing Page Services | /landing-page-services-for-educational-institution/# | 80 words of body copy plus a portfolio image block |
| PR Activities | /pr-services-for-educational-institutions/ | Live (H1 "FROM PRESS TO PUBLIC FAME!") but **not in the sitemap**. Two legacy PR pages (/pr-activities/, /pr-activities-1/) remain in the sitemap. |

- **Sold elsewhere on the site:**
  - Home "How We Drive Your Growth": Admission Funnel Setup, Lead Generation, Marketing Automation, PPC Campaigns & SEO, Performance Marketing, Branding & SMM.
  - The creative page adds Branding (logos, colours, visual story), Print (banners, brochures, flyers), UI/UX and Video edits.
  - Print design (60 words) and UI/UX (153 words) pages exist outside the nav.
  - The home meta description adds "reputation management, PR agency".
  - FAQ schema adds Performance Max campaigns.
- **Named in-house constructs:**
  - "LGN 90 funnel" (google_ads)
  - "80 Days, 40 Companies" campaign (IZee)
  - "eduSuccess by Mediagarh" content sub-brand (colleges page thumbnails dated June/July 2026)
  - "Mediagarh Scale Up 2026" (gallery album: "Growth strategies, insights, and winning systems.")
- **Adjacent signals:**
  - The career page advertises an "Admission Counsellor" role.
  - About_us Mission 2026 is student-side: "To Uplift Lives of 1 Lakh Students & their families by Selecting the right institution for education."
  - Together these hint at a counselling or lead-handling capability beyond marketing. This is unverified.

### Engagement model
Nowhere stated: no retainers, sprints, onboarding timeline, reporting cadence or minimum term. What the site does reveal:
- **Sales entry point:** a free call. Every service page's "BOOK FREE CONSULT" goes off-site to Calendly (`calendly.com/mediagarh/your-admissions-strategy-planning-call`). Legacy pages use "REQUEST A PROPOSAL".
- **Service promises:** "Dedicated account manager", "90% Client Retention Rate", "ROI-Focused SEO Campaigns" (seo); "Consistent personalized operations" (home).
- **Terms and conditions** (buyer-relevant):
  - "Clients Agree To Pay Fees As Outlined In The Agreed-Upon Proposal Or Contract... Late Payments May Result In Suspension Of Services. All Fees Are Non-Refundable."
  - "All Intellectual Property Created Or Provided By Mediagarh, Including But Not Limited To Content, Graphics, And Marketing Materials, Remains The Property Of Mediagarh Technosoft Private Limited Unless Otherwise Specified In Writing."
  - Nothing on ownership of ad accounts or data.

### Pricing signals
- No prices, packages or "starts from" anywhere.
- Schema `priceRange: "₹₹"`.
- Paid LP: "Mediagarh is an affordable digital marketing company that values your investment."
- Social hero: "Double your revenue, not your budget"; "without inflating your budget"; "Cost-Effective Marketing".
- The visible /faq/ page lists "What is the cost of digital marketing services?" and "How much do Edtech companies spend on marketing?", but the crawl captured no answers and the FAQPage schema doesn't include those questions.
- **Read:** value/mid-market positioning, sold through a consultative call.

### Positioning statement(s)
- Hero (probe and screenshot): "FOR EDUCATION INSTITUTES WHO DREAM BIG... WE DELIVER THE SKY." Sub-line: "We're Mediagarh, a brand, digital experience & platforms consultancy-agency. We envision, co-create and build brand and digital transformation platforms that deliver revenue, results and love."
- Section headline: "Mediagarh- Simplifying Digital Marketing Goals of Education Institutions".
- Founder quote (home, about_us): "My vision has always been simple—make money for our clients while positively impacting the lives of students."
- FAQ schema: "Mediagarh is a digital marketing agency that works exclusively with education institutions".
- **Net positioning:** India's education-only, full-stack digital marketing agency that delivers admissions. The hero contradicts this by describing a generic "brand, digital experience & platforms consultancy-agency".

### Claimed scale (and its inconsistency)

| Claim | Where |
|---|---|
| "more than 6 years of experience", "150+ Clients", "80,000+ Admissions" | home body; FAQ schema |
| Counters "Completed Projects 150+", "Closed Admissions 80,000+" | home (probe) |
| "Having served 30+ institutions"; counter "Institutions Served 30+" | web design page |
| "100+ Institutions Trust Mediagarh For Creative Designs" | creative page |
| "Trusted by 180+ Schools & Colleges"; "200+ High-Performing Video Ads"; "3X Higher Admission Rates for Our Clients"; "1M+ Views" | video page (probe counters) |
| "15M+ Impressions", "50K+ Leads Generated", "30% Lower Cost-Per-Lead Than Industry Average", "1M+ Views & Engagement" | google_ads (probe counters) |
| "90% Client Retention Rate" | seo |
| "Recognised amongst Top 10 Digital Marketing Industry Leaders" (no awarding body named) | home, about_us |
| "519323+ Increased Organic Reach", "48.23% Increased Engagement Rate", "19% Average Conversion Rate", "63.23% Increased Website Traffic" | paid LP |
| SGVU "2000+ admissions"; ITM "2,440 admission leads across two campuses"; MIER "75+ admissions in four months" | case hub |
| IZee: "₹6.7 crores in revenue" (social) vs "₹6.4 Crores" (IZee case page screenshot) | social vs case |
| TSUS: "200+ new enrollments" in the card copy vs counter "Applications 60+" in the same card | social (probe) |
| Shanti Asiatic: card counter 159% vs tab label "150% Increase In Organic Traffic In Last 9 Months" | seo |

The institution count ranges from 30+ to 180+ depending on the page. No figure carries a date range, baseline or definition (e.g. what a "Closed Admission" is).

---

## 2. Market and audience

### Segments (evidence from client lists, logos and case cards)

| Segment | Evidence |
|---|---|
| K-12 schools | Bodhi International (Jodhpur), Krystal School of Excellence, Shanti Asiatic (Jaipur), SRN Mehta, The Shri Ram Universal School (Ludhiana), Techno School, Bhartiyam, TonsBridge, Amber Valley Residential, St. Wilfred's (4 branches), International School Patna, Seth M.R. Jaipuria (logo), Panbai (logo) |
| Universities | SGVU (Jaipur), Shri Venkateshwara University, Rishihood, Shobhit, P.K. University, ITM University; Alliance University (logo) |
| B-schools and professional colleges | IZee Business School (Karnataka), AIMS IBS, CPJIMT (Delhi), RDJ, Scope Paramedical, GD Goenka Healthcare Academy, MIER College of Education (B.Ed.), CIMAGE (Bihar), HKBK, BKG, AMC, RCM, CIM Canterbury (logos) |
| Coaching and test prep | AKS IAS, Prahar Defence Academy, Career Point (NEET/IIT-JEE logo), Drishti The Vision (logo), Mahendra's, Vidhigya (CLAT), Law Prep Tutorial (Patna), APNA MBA (Odisha), Arise Medical Academy |
| Skilling / vocational / creative | Frameboxx 2.0 and Arena Animation (animation/VFX), LTA School of Beauty (Mumbai), Dunes Aviation Academy, Cloud Intellect (Salesforce), Fintelligents (finance), NIFD Global and INSD (design) |
| Study abroad | Mindways Study Abroad |
| EdTech | HeyGuru; copy repeatedly says "ed-tech", "EdTech brand" |

**Messaging vs client base:**
- The copy targets "colleges, coaching institutes and schools" generically.
- The home page even says "Our extensive experience focusing solely on colleges and universities".
- There are **no segment pages**. "Colleges" (32 words) and "Schools" (13 words) in the nav are blog category stubs, and there are no coaching, skilling or study-abroad pages despite those clients.
- On core and service pages (~7,000 words), "parents" appears once, "coaching" 3 times, "K-12" 0, "skilling" 0, "study abroad" 0.

### Geographies
- Home market is India. Schema `areaServed: India`; ContactPoint lists English and Hindi.
- Client spread stated on site: Rajasthan, Punjab, Bihar, Odisha, Delhi NCR, Karnataka, Mumbai.
- **City pages are mostly a facade.**
  - Every service page ends with pill buttons such as "SEO Services in Dubai / Bangalore / Gurugram".
  - Only one city page is live in the sitemap: /creative-design-agency-for-education-institution-dubai/ ("Best Creative Design Agency for higher education institutes in Dubai"). It is 87% textually identical to the India creative page, and its own city links point to "SEO Services in Bangalore/Gurugram".
  - /videos-ad-production-for-education-institution-bangalore/ is in the sitemap but returns 404.
  - Dubai is the only international play and has no proof behind it.

### Buyer roles addressed
- **Testimonial titles** (client_testimonials, 19 people):
  - Chancellor (Shobhit University)
  - Trustee (Scope College)
  - Hon'ble Secretary
  - Chairman & Founder (IZee)
  - Co-Founder & CEO (Rishihood)
  - Chief Mentor (SGVU)
  - Founder & Director (Frameboxx)
  - CEO (Krystal, INSD, Bright Education)
  - Managing Director (SRN Mehta)
  - Director (Bodhi, ISP, INSD)
  - Founder (Worldview)
  - COO (Dunes)
  - Chief Business Officer (Mahendra's)
  - Mentor Expert (APNA MBA)
  - Director of Marketing (SVU)
  - About 17 of 19 are owners, promoters or C-suite. One is a marketing head.
- **Copy voice** speaks to the owner: "make money for our clients", "your education business thrive" (LP), "educational business owner" (blog).
- **Admissions teams** appear only as blog topics ("Why Counsellor Follow-Ups Fail Even with Good Leads", "Things to Keep in Mind While Hiring Admission Counsellors").
- No copy is written for principals, admissions heads or marketing managers as distinct buyers.

### Pains and objections addressed
- **Missing targets in peak season:** "I chose Mediagarh during our peak admissions season, uncertain if we could meet our targets." (home testimonial)
- **Bad prior agency experiences:** "the best experience we've had compared to other marketing agencies" (home, INSD); "With over 13 years in the industry... my best experience with an agency" (SVU).
- **Transparency and ops hassle:** "transparent operations and results", "hassle-free operations", "smooth operations"; "keep things smooth, stress-free, and totally chill" (home).
- **Speed:** "Our systems and processes are designed to reduce waiting time" (home).
- **Generalist agencies:** FAQ "How is Mediagarh different from a regular digital marketing agency?"
- **Cost:** "reduce ad costs", "Lower Cost-Per-Lead Than Industry Average", "without inflating your budget".
- **Invisibility in search:** "If you're not ranking, you're losing enrollments." (seo hero)

**Objections not addressed anywhere on the core and service pages:**
- price or budget ranges
- contract length and exit
- ownership of ad accounts, pixels, CRM data and creatives
- reporting cadence
- how "admissions" are attributed (leads vs applications vs fee-paid)
- lead verification and quality
- speed-to-lead and counsellor workload
- CRM integration specifics
- regulatory and ethical limits on education ad claims
- parent vs student targeting
- onboarding timeline

### Admission-season framing
- Home H2: "Make the Most of Your Admission Season!"
- Colleges category card: "Next Admission Season In Just 4 Months Away!", with creative text "The colleges that prepare in August win admissions in January."
- Calendly event name: "your-admissions-strategy-planning-call".
- Blog: "Common Paid Marketing Mistakes Schools Make During Admission Season".
- Season is framing only. There is no calendar by segment and no timing tool.

---

## 3. Communication and messaging

- **Core promise:** admissions from an education-only team ("80,000+ Admissions", "Closed Admissions", "turn views into real admissions"). ROI and money come second ("make money for our clients", "focus majorly on the ROI"); brand and visibility come third.
- **Value propositions, in order of repetition:**
  1. Niche education expertise ("Niche Expertise", "deeply embedded in the education marketing space")
  2. Full-stack under one roof
  3. Proven systems and funnels ("Proven Systems & Frameworks", "tested and refined multiple marketing funnels")
  4. Tools and AI ("Advanced Tools", "cutting-edge AI tools", "AI-POWERED")
  5. Hassle-free operations and a dedicated account manager
  6. Cost efficiency

### Vocabulary (core and service pages, ~7,037 words)
- brand 38, engagement 32, admissions 31 (+ admission 7), growth 25, visibility 25, presence 22, lead 22 (+ leads 13), free 16, branding 16, top 15, impactful 14, results 14, AI 13, best 11, expert 11, ROI 9, leading 9, enrollment 7, stunning 7, conversions 7, seamless 6, cost per lead 6, automation 5, data-driven 5.
- **Barely there:** funnel 2, parents 1, CRM 1, counsellor 1.
- **Absent:** fees, price/pricing, WhatsApp, K-12.
- **Reading:** soft reach metrics (brand, engagement, visibility, presence) outweigh hard outcome words (admissions, ROI, cost per lead). "AI" is used as a badge in hero H1s ("AI-POWERED SEO STRATEGIES", "AI-POWERED SOCIAL GROWTH", "AI-POWERED WEBSITE DEVELOPMENT", "AI Driven Marketing Media Company", "Powered by AI") without naming a tool, model or workflow.

### Message hierarchy, home (live order)
1. **Hero:** sky metaphor plus a generic agency description. The header CTA "Get in Touch" opens a popup.
2. **"We Love Our Clients / ...And They Love Us":** logo wall of about 45 logos, then a testimonial slider (IZee, INSD, SVU) with "VIEW CASE STUDY".
3. **WHO IS MEDIAGARH:** 6 years, 150+ clients, 80,000+ admissions.
4. **WHY SHOULD YOU HIRE MEDIAGARH?:** three reasons (sector focus, tested funnels plus AI tools, embedded team).
5. **HOW WE DO MARKETING / OUR BENEFITS:** counters (Completed Projects 150+, Closed Admissions 80,000+, "∞ Positive Vibes").
6. **"Make the Most of Your Admission Season!":** Advanced Tools / Proven Systems & Frameworks / Niche Expertise.
7. **Founder block:** Pankaj Budhwani, "Recognised amongst Top 10 Digital Marketing Industry Leaders".
8. **How We Drive Your Growth:** six service blurbs.
9. **Founder vision quote**, then About Us.
10. **OUR CREATIVE PROWESS:** work gallery.
11. **FREQUENTLY ASKED QUESTIONS:** 10 questions.
12. **LET'S TALK:** "Have a few minutes? We'd love to hear what's on your mind." Then BOOK CONSULTATION.

Proof is strong and early (logos, then testimonials). The mechanism (how they get admissions) is thin and generic. There is no on-page form and no segment routing.

### Message hierarchy, service pages
1. Video-background hero with an ALL-CAPS H1 and a one-sentence claim.
2. "Why choose" paragraph, four pill trust props, then BOOK FREE CONSULT.
3. Sub-service cards.
4. Proof cards with count-up metrics.
5. The same four testimonial cards.
6. City pill links.
7. A one-line closing pitch with BOOK FREE CONSULT.

See section 5.

---

## 4. Copy style

**Headline formulas:**
- ALL-CAPS benefit imperatives: "GET ENROLLMENTS WITH ADVANCED GOOGLE AD CAMPAIGNS", "SUPERCHARGE YOUR SOCIAL MEDIA PRESENCE", "MAXIMISE YOUR GROWTH WITH EXPERT GOOGLE ADS!"
- "AI-POWERED + service": "AI-POWERED SEO STRATEGIES FOR YOUR INSTITUTION", "AI-POWERED SOCIAL GROWTH".
- Slogan and wordplay: "WE DELIVER THE SKY.", "FROM PRESS TO PUBLIC FAME!", "YOUR VISION, OUR CODE, ONE POWERFUL WEBSITE.", "IF YOU CAN THINK IT, WE CAN CREATE IT."
- "WHY CHOOSE Mediagarh FOR SEO?" and "WHY EDUCATIONAL INSTITUTIONS NEED EFFECTIVE PR?"
- Loss framing: "If you're not ranking, you're losing enrollments."
- Metric tabs: "170% Increase In Organic Traffic In Last 9 Months".
- SEO title template: "Best [Service] Agency for Educational Institution(s) | Mediagarh". 31 of 140 live titles contain best/top/leading.

**Voice:** salesy and superlative ("best" ×11, "top" ×15, "leading" ×9 on core pages), padded with stock agency adjectives (impactful, stunning, seamless, supercharge, captivating). It lurches into casual lines ("totally chill", "Wanna Plan a new Project with us?", "Meet The Team : )").

**Sentence length:** service-page cards run 8-18 words. Home and about paragraphs run 30-50 words and are often run-ons.

**Capitalisation:**
- H1s and H2s are set ALL CAPS, some via CSS `text-transform: uppercase`.
- Legal pages Capitalise Every Word ("Welcome To MediaGarh! This Privacy Policy Is Designed To Help You Understand...").
- The brand is spelled both "MediaGarh" (faq, privacy, pr titles) and "Mediagarh".

**Spelling:** US and UK spellings are mixed (optimize/optimise, maximize/maximise, enrollments/enrolments).

**Jargon:** funnels, touchpoints, SMM, PPC, CTR, LGN 90, "ed-tech", "EdBiz". Buyers get acronyms without explanation.

**Grammar and quality problems (verbatim):**
- "Partner with an ed-tech specific marketing team that focus majorly on the ROI" (home)
- "Our strategic funnels ensures that every touchpoint resonates" (home)
- "we focus on getting your institution reach the right people" (home)
- "He expertises in search engine optimisation" and "working on growth for the company which is witnessable" (about_us)
- "targeted ads that actually gets you results!" (social)
- "Tell us a little bit your project." (contact_us)
- "86% Users are stay on your website for more than 15 mins." (website_ui_ux_mediagarh)
- "Lorem Ipsum Dolor Sit Amet Lorem Ipsum Dolor Sit Amet..." (**live placeholder text**, website_ui_ux_mediagarh)
- Spun or machine-paraphrased PR copy: "Another massive part of public family members is occasion making plans", "increase the emblem's exposure", "PR specialists focus on building connections with newshounds", "Chat with our local experts... our accounting experts" (pr_activities)
- "ATTRACTIVE SOCIAL MEDIA CONTEN" (video_mediagarh); "Code CodeCode Optimize for search" (pr_activities_1); "sclaed INSD's presence" (case hub); slug "mier-college-of-eduction"; "Fintellignts".
- Copy pasted onto the wrong page:
  - The UI/UX page closes with "Let's create a powerful ad strategy tailored for your school."
  - The social page carries "Every school has a story–our captivating video ads bring it to life".
  - pr_activities_1 is about website design ("with the right website design agency on board").

**CTA wording** (inconsistent, mostly generic): "Get in Touch", "BOOK CONSULTATION", "BOOK FREE CONSULT", "BOOK A FREE CONSULT", "Get a Free Video Strategy Call", "VIEW CASE STUDY", "READ OUR CASE", "Know More" (×41 on the case hub), "See Full Website", "REQUEST A PROPOSAL", "LET'S DISCUSS", "Call us now", "Schedule a Meeting", "Call Us", "Call for Assistance", "Schedule a Digital Appointment", "Enquire Now With Expert", "Submit", "Apply Now".

### 15 verbatim lines
1. "FOR EDUCATION INSTITUTES WHO DREAM BIG... WE DELIVER THE SKY." (home, H1 and H2)
2. "We're Mediagarh, a brand, digital experience & platforms consultancy-agency. We envision, co-create and build brand and digital transformation platforms that deliver revenue, results and love." (home)
3. "We aim to provide flexible digital solutions that keep things smooth, stress-free, and totally chill." (home)
4. "Search for 'best education marketing agency in India', and you'll see why we keep saying we are experts in this field." (home)
5. "My vision has always been simple—make money for our clients while positively impacting the lives of students." (home, about_us)
6. "Students and parents search online for top institutes. If you're not ranking, you're losing enrollments. Partner with Mediagarh to dominate search results!" (seo_agency_for_educational_institutes, hero)
7. "Partner with Mediagarh to turn social media from an expense into a powerful business investment. Double your revenue, not your budget, with Mediagarh–India's smart education marketing agency." (social_media_growth_agency_for_educational_institutions, hero)
8. "We create and manage high-converting Google ads campaigns designed to increase your admissions instantly." (google_ads_agency_for_education_institution)
9. "Admissions made easy! We craft data-backed ad campaigns that accelerate student inquiries and maximize enrollments for your institution." (google_ads_agency_for_education_institution)
10. "Better visual communication is ready for you—Are you?" (creative_design_agency_for_education_institution)
11. "Videos increase conversions by 80%, and most institutions use YouTube to attract students." (video_ad_production; no source given)
12. "Grow your institution's online presence with Mediagarh, India's top educational SEO agency, accelerating traffic and enrollments–Powered by AI." (seo_agency_for_educational_institutes)
13. "Focus on Growth. We'll handle the Digital." (increase_your_admission_page)
14. "Wanna Plan a new Project with us? Let's Talk" / "Tell us a little bit your project." (contact_us)
15. "Media family members consist of growing and retaining favorable connections with reporters, editors, and other participants of the click." (pr_activities)

---

## 5. Service page template

### Common section order (live sitemap service pages: SEO, Social, Google Ads, Web, Creative, Video, Landing Page, PR)
1. **Hero:** full-width section with an autoplay/muted/loop video background (probe), an ALL-CAPS H1 (Satoshi 900 or Montserrat 800, 65px) and a 30-35px one-sentence sub-line in white.
   - In our capture the hero video had no resolvable source. White text on a white page gave a **blank first viewport** on SEO, Landing Page Services and Client Testimonials (`mg-seo-service-top.png`, `mg-client-testimonials-top.png`, `mg-landing-page-services-...-hero.png`).
2. **Intro and trust props:** "WHY CHOOSE Mediagarh FOR SEO?" / "SUPERCHARGE YOUR SOCIAL MEDIA PRESENCE" / "YOUR INSTITUTION NEEDS A WEBSITE THAT WORKS HARDER, HERE'S WHY".
   - Four pill chips, e.g. "ROI-Focused SEO Campaigns · 90% Client Retention Rate · Dedicated account manager · Comprehensive SEO Solutions", or "Create Viral-Worthy Content · Foster Meaningful Customer Connections...".
   - Then the first BOOK FREE CONSULT.
3. **Sub-service or benefit cards:** On-Page / Technical / Off-Page / Local SEO; Efficient Audience Engagement / Data-Optimized Campaigns / High-Quality Ad Creatives...; Stronger Brand Presence / 24/7 Accessibility / Increased Conversions.
4. **Proof block:**
   - SEO: 6 client cards with "Increase in Organic Traffic / Keywords on first page / CTR".
   - Social: 5 case cards with Total Leads, CPL ₹, Ad Engagement, Applications.
   - Google Ads: stat band plus "LIVE AD CAMPAIGN PREVIEWS". The mockup above it is a **stock US Google Ads dashboard** ("$3.84M", "US - Asthma Patient" keywords; `mg-google-ads-scroll1.png`).
   - Web: 4 "See Full Website" showcases.
   - Landing Page: "PORTFOLIO SHOWCASE" images.
   - **Every proof number is a count-up counter.** In HTML, and in the Google Ads capture after scrolling, they read "0M+ Impressions / 0K+ Leads Generated / 0% Lower Cost-Per-Lead".
5. **Testimonials:** the same four cards on every service page (Rajesh R. Turakhia, Frameboxx; Dr. Zaheesh Moideen, IZee; Preetam Mehta, SRN Mehta; Sunjey Aggarwal, INSD), repeated 3-4 times in carousel markup. There are 9 `<video>` elements per page.
6. **City pills:** "[Service] Services in Dubai / Bangalore / Gurugram".
7. **Closing line and CTA:** e.g. "Admissions made easy!..." then BOOK (A) FREE CONSULT (off-site Calendly).
8. **Global footer:** six offices, service links, social links, WhatsApp icon, "Made in 🇮🇳 with ❤️".

### Depth (body words from corpus, excluding the ~30-40-word hero)

| Page | Words | Meta description | Live H1 | Service-specific proof | Process | FAQ | Pricing / packages |
|---|---|---|---|---|---|---|---|
| SEO | 522 | yes | AI-POWERED SEO STRATEGIES FOR YOUR INSTITUTION | 6 SEO cards (traffic %, keywords, CTR) | no (lists 4 SEO types) | no | no |
| Social Media | 618 | yes | AI-POWERED SOCIAL GROWTH | 5 cases (leads, CPL ₹175-700, applications) | no | no | no |
| Google Ads | 323 | **missing** | GET ENROLLMENTS WITH ADVANCED GOOGLE AD CAMPAIGNS | stats, 3 previews (two identical) | yes, 4 steps: Research / Copy & Creative / Smart Bidding / A/B Testing | no | no |
| Web Design | 302 | yes (generic, no education) | YOUR VISION, OUR CODE, ONE POWERFUL WEBSITE. | 4 site showcases | no | no | no |
| Creative | 259 | **missing** | (not probed) | "100+ institutions" only | no | no | no |
| Creative (Dubai) | 264 | yes | (not probed) | none (Dubai-specific) | no | no | no |
| Video Ads | 186 | yes | VIDEO AD MARKETING | 4 counters | no | no | no |
| Landing Page Services | 80 | **missing** | POWERFUL LANDING PAGES DESIGNED TO MAXIMIZE YOUR ROI | portfolio images; no metrics | no | no | no |
| PR (live, not in sitemap) | n/a | n/a | FROM PRESS TO PUBLIC FAME! | none seen | "Consultation & Strategy" H3 suggests steps | no | no |
| Lead Automation | **404** | | | | | | |
| Print | 60 | **missing** | not in nav | none | no | no | no |
| UI/UX | 153 | yes | not in nav | 4 site showcases (same as Web) | no | no | no |

**What each section does:** hero = keyword-plus-hype claim; chips = trust shorthand; cards = service definition; proof = numbers; testimonials = social proof; city pills = SEO internal links; closing = CTA repeat.

**What's missing on service pages:**
- a visible FAQ on any service page (FAQ exists only on home and /faq/)
- pricing, packages or even ranges
- process, timelines, deliverables and reporting (except the 4-step Google Ads block)
- segment tailoring (school vs college vs coaching)
- service-specific testimonials (the same four everywhere)
- dated, baselined proof, or cost per admission
- links from metric cards to the matching case study (none in link extraction)
- on-page forms (all CTAs leave the site for Calendly)
- team or strategist faces per service
- channel mix guidance (Google vs Meta) outside the blog
- compliance and brand-safety notes

---

## 6. Conversion design

### Every CTA and form

| Location | CTA / form | Destination / fields |
|---|---|---|
| Global header (all pages) | "Get in Touch" (outlined white pill on black) | Opens Elementor popup #12821 (content not captured; needs a click) |
| Home | "VIEW CASE STUDY" ×5 (testimonial slider), "About Us", "BOOK CONSULTATION" under "LET'S TALK / Have a few minutes? We'd love to hear what's on your mind." | Case studies; no on-page form (`forms: []`) |
| Service pages | "BOOK FREE CONSULT" / "BOOK A FREE CONSULT" / "Get a Free Video Strategy Call" ×2 | Off-site `calendly.com/mediagarh/your-admissions-strategy-planning-call`. The web page links a stale `?month=2025-03`. |
| Contact | WPForms: First name, Last name, Email*, Phone*, Institute name*, Message, then "Submit"; heading "Wanna Plan a new Project with us? Let's Talk" | Also 3 phone numbers, 3 emails (pankaj@, kartik.bdm@, nitin@), 2 addresses, "Career" button |
| Paid LP /increase-your-admission-page/ (`mg-increase-admission-lp-top.png`) | Logo-only header (no nav, 4 links total). "Call Us" (tel). **Two identical WPForms** "Schedule a Digital Appointment": Name*, Phone*, Email*, then Submit. "Call for Assistance". **Sticky vertical left tab "Enquire Now With Expert"** (#enquire). | Sections: client logos, About, 4 stats, 4 video testimonials (1:34-1:55), footer contact. No H1 and no meta description. |
| Thank-you | /thank-you/ ("Congratulations! You've successfully submitted the form. We're grateful for your participation...") and /thankyou/ ("Thank you!... Have a great day! Go Home") | Both indexable; no next step (no calendar, WhatsApp, content or expectation-setting) |
| Case hub | "Know More" ×41 | Case pages |
| Legacy PR | "Call us now" ×3, "Schedule a Meeting" ×2 | |
| Orphan template pages | "REQUEST A PROPOSAL" ×3, "LET'S DISCUSS", "READ OUR CASE" ×5 | |
| Career | "Apply Now" ×9 | |

### Channels
- **Phone:** +91 9358934407 is primary. Also 7300008506 and 8696968294 (Jaipur).
  - The client_testimonials meta description gives a different number, 9358692241.
  - One tel link has an encoded trailing space (`tel:9358934407%20`).
- **WhatsApp:** footer icon only, linking to `https://wa.me/9358934407`.
  - That link lacks the 91 country code, so WhatsApp will likely read it as a +93 number and not open the Indian line.
  - There is no floating WhatsApp or call button on home or service pages (probe found no fixed elements).
- **Booking:** off-site Calendly, so there is no embedded scheduler and attribution can break.
- **Popups:** no automatic popup appeared within 7 seconds on any probed page. The only popup is the header click.

### Lead magnets
None on core or service pages: no audit, calculator, benchmark report, checklist download or webinar. A "Marketing Checklist" page (/marketing-checklist-for-admissions/) exists in the sitemap but is not linked from the nav or the service pages we extracted.

### Urgency devices
Season framing only: "Make the Most of Your Admission Season!", and the "Next Admission Season In Just 4 Months Away!" blog card. There are no countdowns and no slot scarcity; /book-your-slot/ is a 404.

### Measurement vs UX
They run three session-replay/heatmap tools plus the Google and Meta pixels, so they are watching behaviour. Yet visible leaks remain:
- blank video-hero first paints
- "0" counters
- a 404 in the Services menu
- a dead "News Letter" nav item (`#`)
- a broken-looking WhatsApp link
- a stale Calendly parameter

---

## 7. Information architecture and SEO

### Structure
- **Global nav:**
  - Home
  - About Us (About Mediagarh, Career, FAQ, Our Gallery, Blog, News Letter [#], Colleges, Schools)
  - Services (9 items)
  - Our Work (Client Testimonials, Case Study)
  - Contact Us
  - "Get in Touch"
- **Segments are buried.** "Colleges" and "Schools" sit under About Us and are blog category listings (32 and 13 words).
- **URL patterns** are three generations of slugs living side by side:
  - Short legacy: /seo/, /social-media-advertising/, /creative-designing/, /landing-page/, /video-ad-production/, /website-design-development/, /google-ads-search-display-video/
  - Keyword-long: /seo-agency-for-educational-institutes/, /social-media-growth-agency-for-educational-institutions/...
  - Template leftovers: /video-mediagarh/, /website-ui-ux-mediagarh/, /home-old/, /home-3/, /12064-2/, /thirdwave/

### Sitemap health: 164 URLs
- **24 URLs (15%) are "Page not found"** (noindex, ~6 words). They are still listed in the sitemap:
  - /12064-2/, /book-your-slot/, /branding/, /checkcasestudy/
  - Case studies: /client-case-study-gd-goenka-healthcare-academy/, /client-case-study-insd-delhi/, /client-case-study-international-school-patna/, /client-case-study-krystal-school-of-excellence-22/, /client-case-study-shree-ram-universal-school-4444/, /client-case-study-shri-venkateshwar-university/, /client-case-study-srn-mehta-school-5555/
  - /education-marketing-case-studies-22/, /education-marketing-case-studies-old/
  - **/education-marketing-company/, /education-marketing-company-in-india/**
  - /education-marketing-content-research/, /education-marketing-content-research-1/
  - /home-3/, /increase-your-admission-pages/
  - **/lead-automation-agency-for-education-institution/**, **/lead-automation-and-nurturing/**
  - /old-our-gallery/, /thirdwave/, /videos-ad-production-for-education-institution-bangalore/
- **Two nav/footer targets are not in the sitemap:** /pr-services-for-educational-institutions/ (live) and /education-marketing-case-studies/ (not checked).

### Duplicate and near-duplicate URL pairs
All of these have identical bodies unless noted, with both URLs self-canonical and both in the sitemap.

| # | URL A | URL B | Note |
|---|---|---|---|
| 1 | / | /home-old/ | identical (1,044 words) |
| 2 | /seo/ | /seo-agency-for-educational-institutes/ | identical (522) |
| 3 | /social-media-advertising/ | /social-media-growth-agency-for-educational-institutions/ | identical (618); nav links B, footer "SMA" links A |
| 4 | /website-design-development/ | /web-design-and-development-agency-for-education-institutions/ | identical (302) |
| 5 | /google-ads-search-display-video/ | /google-ads-agency-for-education-institution/ | identical (323); **nav links A, schema OfferCatalog links B** |
| 6 | /creative-designing/ | /creative-design-agency-for-education-institution/ | identical (259) |
| 7 | /landing-page/ | /landing-page-design-services-for-educational-institutions/ | identical blog post (912) |
| 8 | /video-ad-production/ | /videos-ad-production-for-education-institution/ | A redirects to B; both in sitemap |
| 9 | /client-case-study-mindways/ | /client-case-study-mindways-study-abroad/ | same title, 628 words each |
| 10 | /10-reasons-to-choose-the-best-edtech-marketing-agency/ | /why-your-educational-institution-should-move-online/ | same title, 896 words each |
| 11 | /things-to-keep-in-mind-while-hiring-admission-counsellors/ | .../-2/ | 618 words each |
| 12 | /thank-you/ | /thankyou/ | two indexable thank-you pages |
| 13 | /creative-design-agency-for-education-institution/ | /creative-design-agency-for-education-institution-dubai/ | 87% similar city clone |
| 14 | /pr-activities/ + /pr-activities-1/ | /pr-services-for-educational-institutions/ | two legacy PR pages in the sitemap; the live nav page is outside it |

### Keyword targeting
- **Home title and meta:** "Best Education Marketing Company In India | Mediagarh" / "Best Education Marketing Company in India, digital marketing. Admission marketing, reputation management, PR agency for schools, colleges, and coaching centers."
- **Money-keyword URLs hold unrelated blog posts**, which cannibalises the home page:
  - /best-education-marketing-company-in-india/ = "Content Marketing Without Expertise: Leveraging What You Know"
  - /best-educational-marketing-company-in-india/ = "The Role of Motion Graphics in Educational Marketing company"
  - /digital-marketing-services-in-india/ = "Social Media Marketing: The Cornerstone of Your Institute's Digital Strategy"
  - /landing-page-design-services-for-educational-institutions/ = "How To Optimize Landing Pages for High Admissions?"
  - Meanwhile /education-marketing-company/ and /education-marketing-company-in-india/ are 404s.
- **Titles:**
  - 31 of 140 live titles use best/top/leading.
  - 11 titles contain "Mediagarh - Mediagarh".
  - Some are non-descriptive: "video | Mediagarh - Mediagarh", "website UI UX | Mediagarh - Mediagarh", "thankyou - Mediagarh", "Colleges - Mediagarh".
  - About page title is "Education Marketing Agency for Colleges & Universities".
  - Web design title "Top Website Design & Development Services Agency" has no education keyword.
- **Meta descriptions:**
  - Missing on **53 of 140** live pages (38%). That includes all the case studies, Google Ads, Creative, Landing Page Services, Print, Colleges, Schools and the paid LP.
  - client_testimonials reuses a contact-style description ("In India, we have five branches. Contact us at pankaj@mediagarh.com or 9358692241").
- **H1s (live):** mostly ALL-CAPS slogans without "education/school/college" ("VIDEO AD MARKETING", "AI-POWERED SOCIAL GROWTH", "YOUR VISION, OUR CODE, ONE POWERFUL WEBSITE.", "FROM PRESS TO PUBLIC FAME!"). The paid LP has no H1.

### Schema
- **Sitewide on all 140 live pages:** `ProfessionalService` with:
  - Jodhpur PostalAddress
  - `priceRange ₹₹`
  - `areaServed: India`
  - `knowsAbout` (SEO, Google Ads, Education/College/School/University Marketing...)
  - OfferCatalog of 6 services
  - ContactPoint (English, Hindi)
  - sameAs (FB, IG, LinkedIn, YouTube)
- **Rank Math-style @graph** on 67 pages: LocalBusiness/Organization, WebSite with SearchAction, WebPage, BreadcrumbList.
- **Conflicts inside the schema:**
  - openingHours "Mo-Su 09:00-17:00" in one block vs "Mon-Sat 09:00-18:00" in another
  - two different logo URLs
- **13 service pages** carry a `Service` node with `Audience: "Schools, Colleges, Universities, Educational Institutions"`. It is the **same generic node on every page** (`@id .../services/#service`, `url` = home), not page-specific.
- **BlogPosting + Person** on 65 posts.
- **FAQPage only on /faq/:** 18 Q&As written for LLM-style queries, with entity-rich answers. Examples:
  - "Which is the best education marketing agency in India?" → "Mediagarh is one of India's leading education marketing agencies..."
  - "Which company provides college admissions lead generation in India?"
  - "Does Mediagarh provide PPC advertising for educational institutions?"
  - The **visible** /faq/ page shows a different list and uses raw keyword strings as accordion titles ("Best education marketing agency in India", "College admissions lead generation company India", "EdTech marketing agency India"), a markup/visible-content mismatch.
- **Absent:** Review/AggregateRating (despite 19 testimonials), VideoObject (despite testimonial videos), founder Person on About, and per-case-study markup.

### Internal linking
- Every page carries about 28-31 internal links via the mega nav and footer.
- Service pages do not link their metric cards to the matching case studies.
- The home page links 3 case studies.
- The paid LP is correctly isolated (4 links).
- Link equity is split across duplicates: nav vs footer vs schema point at different twins.

### Images
3,098 images across live pages; **1,874 (60%) have no alt text** (home 73/122, about 85/92).

### AI-search readiness
- **Positives:**
  - A deliberate generative-engine play: the FAQ schema phrases the brand as the answer to "best agency" questions.
  - Consistent entity facts in the FAQ (6 years, 150+ clients, 80,000 admissions, 6 offices, founder name).
  - A large admissions-themed blog with question-style titles.
- **Negatives:**
  - Numbers render as "0" in HTML.
  - Scale claims contradict each other across pages (30+/100+/150+/180+).
  - Service pages are thin, with no FAQs and generic schema.
  - Duplicates and 404s sit in the sitemap.
  - The FAQ schema doesn't match the visible page.
  - Hero copy depends on a video background.
  - No sourced statistics ("Videos increase conversions by 80%").

---

## 8. Visual language (from screenshots and probe)

- **Header:** solid black bar. White wordmark "MEDI▲GARH" with a blue gradient triangle standing in for the "A" (a mountain/"garh" fort cue). Nav: Home / About Us / Services / Our Work / Contact Us. An outlined white rounded "Get in Touch" button on the right, with a dark pill marking the active item.
- **Home hero** (`mg-home-top.png`):
  - Full-bleed night sky, dense stars, dark desert dunes, a lone silhouette on a ridge shining a torch beam into the sky.
  - Cinematic and aspirational, not education-specific: no students, campuses or parents.
  - Type: Satoshi 900 at 65px, white, ALL CAPS, three lines, with a 35px regular sub-paragraph and an animated scroll-chevron gif.
- **Below the hero** (`mg-home-scroll1.png`):
  - White page; two-tone heading "We Love **Our Clients**" (charcoal + blue #3889C9).
  - A dense 5-column logo wall (~45 logos) in rounded white cards with a pale blue glow border.
  - Recognisable Indian education brands: Suresh Gyan Vihar University, Alliance University, Shri Venkateshwara University, IZee, AIMS IBS, CIMAGE, NIFD Global, Career Point, Drishti The Vision, Mahendra's, Apna MBA, Jaipuria School and others.
- **Service pages** (`mg-seo-service-top.png`, LP services hero):
  - The hero area rendered blank white in capture (video background not loaded); the first readable content ("WHY CHOOSE") sits below the fold.
  - Further down: big Satoshi/Montserrat ALL-CAPS headings, light-blue pill chips (#EAF3F9, radius 30px), steel-blue pill buttons.
- **Google Ads page** (`mg-google-ads-scroll1.png`):
  - "EXPERT **GOOGLE ADS!**" two-tone, next to a laptop mockup of a stock US Google Ads dashboard (dollar figures).
  - A light-grey stat band with four huge blue Montserrat numbers reading "0M+ / 0K+ / 0% / 0M+" in capture.
  - Thin blue vertical dividers.
- **Paid LP** (`mg-increase-admission-lp-top.png`), a separate, flatter corporate system:
  - Centred logo on a black strip; left-aligned Montserrat headline ("Partner with the Leading" light, then "Digital Marketing Experts for **Schools & Colleges**" bold with brighter blue #008FDF).
  - A purple/grey line-art illustration of SCHOOL / COLLEGE / UNIVERSITY buildings with paper-plane pins labelled Education / Growth / Success.
  - A bright-blue rounded form band with white inputs and a navy (#003BA0) Submit button; a vertical blue sticky tab at the left edge.
- **Case-study hub** (existing screenshot): dark blue-to-black gradient hero with a cyan light leak, a small blue pill label "Client Case Studies", white Roboto/Poppins "Our Work", and near-black cards with client logos.
- **IZee case page** (existing screenshot): a dark "tech" aesthetic, with a giant grey marquee "IZEE BUSINESS SCHOOL", a 3D chrome version of the triangle mark, and an electric-blue radial glow. Headline: "Generated Admissions Worth ₹6.4 Crores With Targeted Media Campaigns".
- **Colleges category** (existing screenshot):
  - Grayscale photo hero.
  - Cards using the "eduSuccess by Mediagarh" social creatives: condensed heavy display type in red and black, stock photos of students with backpacks and campus buildings, icon rows ("PLAN EARLY / BUILD VISIBILITY / EARN TRUST / DRIVE ADMISSIONS").
  - A tabloid, "news-flash" social style.
- **Palette:**
  - Black (#000) chrome, white body, primary steel blue **#3889C9** (rgb 50,143,201), charcoal headings (#3A3A3A).
  - LP variant: #008FDF / #003BA0.
  - Case pages: navy/black with cyan glows. eduSuccess: red.
  - The Elementor kit still carries the default accent green #61CE70 and default Roboto typography, a sign the global design system was never set up.
- **Type:** 8 families across the site. Satoshi (display), Montserrat (headings, LP), Averta (buttons, footer), Poppins (LP buttons, footer), Roboto (kit default), Albert Sans and Questrial (contact page), Lato (404). Body text falls back to the system stack at 15px.
- **Imagery:** metaphor photography (sky), client logos, stock UI mockups, flat line illustrations, stock student photos in social creatives, a founder portrait and a 44-person team grid. **No real campus, student or parent photography** in heroes.
- **Video:** muted looping background video in service heroes; testimonial videos (9 per service page, 4 on the LP); an S3-hosted MP4 "HOW TO GET ADMISSION" on the video page.
- **Motion cues:** count-up counters, testimonial carousels, marquee text, a scroll gif, entrance animations.
- **Layout rhythm:** dark hero, then white sections with oversized headings (45-65px), grey stat bands and carousels; wide centred containers; pill-rounded controls (radius varies 3/8/10/12/26/30px).
- **Overall:** at least four visual systems coexist (cinematic sky; corporate flat LP; dark neon case pages; tabloid social creatives). Heavy (122 images on home), inconsistent and template-driven. The sky hero is memorable but says nothing about education or outcomes.

---

## 9. Strengths MMC must match

1. **Category ownership.** 100% education focus, repeated across ~140 live pages, 60+ admissions-themed blog posts, schema `knowsAbout`, and an FAQ that answers "best education marketing agency in India" with its own name. A generalist claim will lose to this unless MMC shows education-specific depth.
2. **Recognisable proof at volume.**
   - A ~45-logo wall of known Indian institutions (universities, B-schools, big coaching brands such as Career Point, Drishti and Mahendra's).
   - 19 named senior testimonials (Chancellor, Chairman, Trustee, CEO), several on video.
   - 40+ case-study cards.
3. **Outcomes framed in admissions, not clicks.** "80,000+ Admissions", "2000+ admissions" (SGVU), "2,440 admission leads" (ITM), "75+ admissions in four months" (MIER), "80 new MBA enrollments, ₹6.7 crores in revenue" (IZee), CPLs in ₹ (₹175-₹700).
4. **Full stack under one roof** with a visible in-house team (SEO, Google, Meta, social, video, web/UX, print, PR). Institutions buying "one agency for everything" find this reassuring.
5. **Owner-level buyer resonance and founder visibility.** Testimonials come from promoters; the founder has a face and a mission.
6. **Admission-season urgency and content cadence.** eduSuccess creatives, "4 months away", an admissions-planning Calendly event.
7. **A dedicated paid-traffic LP**: no nav, 3-field form repeated, click-to-call, sticky enquiry tab, video testimonials, logos.
8. **Named frameworks and campaigns** ("LGN 90 funnel", "80 Days, 40 Companies") that make method feel proprietary.
9. **Multi-city footprint signal** (six office cities) and Hindi/English contact.
10. **GEO/AI-answer intent.** They are already seeding LLM-style Q&As in schema; MMC must at least match on structured, answer-first content.

---

## 10. Weaknesses and gaps MMC can exploit (ranked)

1. **Proof is unverifiable and self-contradicting.**
   - All counters are "0" in HTML, and the Google Ads capture showed "0M+ / 0K+ / 0%" after scrolling.
   - Institution counts range from 30+ to 180+ by page.
   - IZee revenue appears as ₹6.7 cr and as ₹6.4 cr.
   - TSUS shows "200+ new enrollments" but "Applications 60+".
   - Shanti shows 159% vs 150%.
   - "Top 10 Digital Marketing Industry Leaders" is unsourced; "Videos increase conversions by 80%" is unsourced.
   - "LIVE AD CAMPAIGN PREVIEWS" sits under a stock US dashboard.
   - No date ranges, baselines, spend bands or cost per admission.
   - *Exploit:* dated, defined, internally consistent metrics, including cost per enquiry, cost per qualified lead and cost per admission, with real INR education dashboards.
2. **Visible quality failures a Chairman or Trustee would notice.**
   - Live lorem ipsum (/website-ui-ux-mediagarh/).
   - Spun PR copy ("public family members", "emblem", "accounting experts").
   - Wrong-page CTAs.
   - Grammar errors across home, about and contact.
   - A 404 inside the Services menu (Lead Automation).
   - Blank video heroes; two thank-you pages; 24 dead URLs in the sitemap; "Mediagarh - Mediagarh" titles.
   - *Exploit:* polish and precision as proof of operational discipline.
3. **The "funnel and automation" claim is hollow on-site.** Home sells "Admission Funnel Setup" and "Marketing Automation... integrating seamlessly with your CRM", but the Lead Automation page is a 404, "CRM" appears once on core pages, there is no speed-to-lead SLA, and no enquiry-to-enrolment workflow is shown. The only named funnel ("LGN 90") is unexplained.
   - *Exploit:* show the full admissions system (ads → LP → WhatsApp/call within minutes → CRM → counsellor → campus visit → fee paid) with stage metrics.
4. **No segment-specific pages or messaging.** "Colleges" and "Schools" are blog stubs; there are no coaching, skilling, study-abroad or K-12 parent-journey pages despite clients in each; "parents" appears once on core pages; home says "focusing solely on colleges and universities".
   - *Exploit:* segment tracks with segment-specific pains, calendars, channels and proof.
5. **Opaque and client-unfriendly commercial model.** No pricing or ranges, no scope, no term or exit. Terms keep IP with Mediagarh "Unless Otherwise Specified In Writing" and make all fees non-refundable. Nothing on ad-account or data ownership.
   - *Exploit:* a transparent engagement model: pilot sprint, scope, reporting cadence, "your accounts, data and creatives stay yours", clear exit.
6. **Thin, duplicated service pages and wasted keyword URLs.**
   - Landing Page Services has 80 words; Print 60.
   - Seven identical service/home twins, plus blog posts sitting on /best-education-marketing-company-in-india/ and /digital-marketing-services-in-india/.
   - /education-marketing-company(-in-india)/ are 404s.
   - Missing meta on 38% of pages; H1s without education keywords.
   - *Exploit:* one strong, canonical, deep education page that can outrank thin pages for "education marketing agency", "admissions lead generation", "landing page for schools/colleges", "Google Ads for colleges".
7. **Leaky conversion design.**
   - No form on home or service pages; every CTA leaves for Calendly.
   - Contact form has 6 fields incl. first/last name.
   - WhatsApp only as a footer icon, and the link appears to be missing the 91 prefix.
   - No mobile sticky WhatsApp/call; no lead magnet, calculator or audit; thank-you pages with no next step; a stale Calendly parameter.
   - *Exploit:* a WhatsApp-first, low-friction flow with an embedded scheduler and a useful free diagnostic.
8. **Soft-metric vocabulary.** "brand/engagement/visibility/presence" (117 mentions) vs "admissions/ROI/cost per lead" (~53); SEO proof is traffic %, keywords and CTR.
   - *Exploit:* outcome language tied to seats filled and fee revenue.
9. **"AI" is a badge, not a capability.** Three hero H1s say "AI-POWERED" with no named tools or workflow.
   - *Exploit:* concrete AI use: lead scoring, WhatsApp auto-qualification, creative testing velocity, counsellor call summaries (only what MMC actually does).
10. **Visual incoherence and weight.** Four visual systems, eight font families, the default Elementor kit, a 122-image home page, 9 videos per service page, no real campus or student imagery in heroes.
    - *Exploit:* one coherent, fast, authentic system built on real institutions and people.
11. **City and international pages are a facade.** Dubai/Bangalore/Gurugram pills on every service page, but one Dubai clone page and a Bangalore 404.
    - *Exploit (later):* real local pages only where MMC has local proof.
12. **Structured data risk.** FAQPage markup doesn't match the visible FAQ; the generic Service node repeats on 13 pages; conflicting opening hours; no Review/VideoObject.
    - *Exploit:* clean, page-specific, visible-equals-markup schema.

---

## 11. Implications for the MMC education landing page

MMC's current site lists Education as industry 04 ("K-12 · Higher ed · Educational travel · Skilling"), and its FAQ says about 60% of work is D2C. Against an education-only rival that is a vulnerability. Don't fight it by claiming to be education-only. Win on **rigour, transparency and a visible admissions system**: "commerce-grade performance marketing applied to seats and fees", backed by a dedicated education pod and real education proof. Specific moves:

1. **Hero: outcome, mechanism, season, proof. No metaphor.**
   - H1 with the category keyword, e.g. "Admissions marketing for schools, colleges and coaching institutes" plus an outcome line such as "More enrolments per rupee, before your admission window closes."
   - Under it, 3 proof chips rendered as **static HTML numbers**, each with period and definition (e.g. "₹X cost per admission, Jan-Jun 2026, [segment]").
   - Primary CTA "Get my admissions plan"; secondary "WhatsApp us" and "Call".
   - Use real campus, student or parent imagery.
   - **Avoid starry-night or sky motifs on this page.** Mediagarh's hero owns "WE DELIVER THE SKY" on a starry sky, and MMC's own `Sky.jsx` scroll effect ends in a starry night sky. On the education page that would look derivative. Give the education LP its own visual cue, or keep the sky effect off it.
2. **Segment switcher above the fold-and-a-half.** K-12 schools / Higher ed (UG/PG, B-schools, professional colleges) / Coaching and test prep / Skilling and vocational / Study abroad and educational travel. Each tab swaps pains, buyer (parent vs student), channels, calendar and proof. Mediagarh has none of this, and MMC already lists "Educational travel" and "Skilling", which Mediagarh doesn't message.
3. **"Where your admissions leak" diagnostic section.** Show the funnel stages (impression → enquiry → contacted within N minutes → counselled → campus visit/demo → application → fee paid), with typical leak points and what MMC fixes at each. This directly exploits their 404 Lead Automation page and hollow funnel claims.
4. **Show the system, not adjectives.**
   - One diagram: channels (Google Search/PMax, Meta lead forms, YouTube) → segment LPs → WhatsApp and call auto-response → CRM → counsellor scripts and SLA dashboard → attribution to fee-paid admission.
   - Include real (anonymised) INR education dashboard screenshots, not stock mockups.
   - Name AI only where concrete (lead scoring, auto-qualification, creative iteration).
5. **Admission calendar planner (interactive).** Pick segment and current month to get "weeks to your window" plus a phased plan (brand/SEO groundwork, then demand capture, then conversion push, then waitlist/late intake). This turns their passive season framing into a tool. It also gives a natural urgency device with no fake scarcity.
6. **Lead magnet that fits the buyer.**
   - An "Admissions Funnel Audit": mystery-shop enquiry response time, form and LP score, CPL benchmark, tracking check. Build it on MMC's existing `AuditModal.jsx`.
   - A **cost-per-admission calculator**: seats to fill × fee × current CPL × stage conversion rates → required budget and revenue. Adapt MMC's existing breakeven-ROAS and CAC calculators.
7. **Conversion design.**
   - On-page short form: Name, WhatsApp number, Institution, Segment, Seats/intake to fill (optional: city).
   - Embedded scheduler, not an off-site hand-off.
   - Sticky mobile bar with WhatsApp (correct `wa.me/91XXXXXXXXXX`) and Call; a stated response time.
   - A thank-you state with next steps (what happens in 24h, WhatsApp confirmation, one relevant case).
   - One CTA verb family used consistently.
8. **Transparent engagement model block.**
   - A defined starting offer (e.g. a 90-day admission sprint, then always-on), what's included, weekly reporting, the people on the pod, onboarding timeline, exit terms.
   - "Your ad accounts, pixels, CRM data and creatives are yours": a quiet contrast with Mediagarh's IP-retention clause (don't name them).
   - Consider "starts from" ranges or budget bands. Mediagarh publishes none, and their own FAQ shows cost is an asked question.
9. **Proof architecture: fewer, deeper, consistent.**
   - 2-3 education case snapshots, each with baseline → actions → outcome, date range, spend band, CPL, cost per admission, and a named decision-maker (role + institution, video if possible).
   - A logo strip of real education clients only (e.g. MVJ College of Engineering already appears in MMC's TrustLayer).
   - Numbers identical everywhere they appear on the site and in schema.
10. **Speak to each buyer role explicitly.** A three-column "what you get" block:
    - Chairman/Trustee: seats filled, fee revenue, cost per admission, brand safety.
    - Principal/Director: reputation, parent trust, quality of intake.
    - Admissions head: lead quality, speed-to-lead, counsellor workload, CRM hygiene.
    - Parent-first copy for K-12; student-first for UG, coaching and skilling.
11. **FAQ that answers the unanswered, with visible text identical to FAQPage schema.**
    - "How much does education marketing cost in India?"
    - "What's a good cost per lead / cost per admission for schools, colleges and coaching?"
    - "Google Ads or Meta for admissions?"
    - "How fast should enquiries be called back?"
    - "Who owns the ad accounts and data?"
    - "How do you measure admissions, not just leads?"
    - "What ad claims are off-limits for education brands?"
    - "When should we start before the admission season?"
12. **SEO / AI-search build.**
    - One canonical URL (e.g. /industries/education/ or /education-marketing-agency/) and no twins.
    - Unique title and meta.
    - H1 with the keyword; static numbers; alt text on every image.
    - Page-specific `Service` schema (audience per segment), `FAQPage` matching the visible FAQ, Organization facts consistent sitewide, VideoObject for testimonials.
    - Answer-first paragraphs (40-60 words) under question H2s so LLMs can quote them.
    - No city clones until there's local proof.
13. **Copy standard as a differentiator.** Indian English consistently (enrolment, optimise), no "best/top/leading", short concrete sentences, every number defined, zero placeholder or typo tolerance.
14. **Visual and performance.**
    - One type system and palette from the MMC Brand Handbook; stay clear of Mediagarh's black header + #3889C9 steel blue + ALL-CAPS Satoshi look.
    - No text over background video; poster-first lazy video testimonials; fast first paint on mobile.
    - Authentic institutional photography (with consent) over stock or line art.

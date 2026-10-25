# Monday Marketing Company (MMC): Website Architecture for SEO, AEO and GEO Planning

Generated from the built Astro site (`dist/`, `src/`, `public/`) on 2026-10-02. Everything below is what the site contains today, not a proposal.

## 1. How to use this document

Give this whole file to ChatGPT or Claude and ask for: (a) a gap analysis against the structure below, (b) a keyword and topic map per page, (c) an AEO plan (featured snippets, People Also Ask, voice), (d) a GEO plan (getting cited by ChatGPT, Perplexity, Gemini, Google AI Overviews), (e) a technical SEO checklist, (f) a 6-month content and link-building roadmap with priorities.

Suggested prompt: *"You are a senior SEO, AEO and GEO strategist. Below is the complete architecture of an Indian marketing agency website. Audit it, find structural gaps against what ranks and gets cited for the target queries, and produce a prioritised 6-month plan. Do not invent metrics; mark anything you cannot verify as an assumption."*

## 2. Business context

- **Brand:** Monday Marketing Company (MMC). Domain: `https://www.mondaymarketing.company`
- **What it is:** India-based growth marketing agency, founded 2019, Thane 400607, Maharashtra. Tagline: Design × Marketing × Technology × Content × AI.
- **Positioning:** Led by D2C performance marketing, but serves three audiences, always listed in this order: **D2C brands, B2B companies, Education brands.** Never D2C-only.
- **Differentiator:** measures on contribution margin (CM1 to CM3), not platform ROAS. One senior team and one P&L across media, creative, retention and technology.
- **Five connected systems:** Performance media (Meta, Google, Amazon, quick commerce) · Creative and UGC · Retention and lifecycle · Conversion and technology (Shopify, CRO) · Brand and packaging.
- **Conversion goal:** "Book a strategy call" (30-minute booking modal), free paid-media audit, brief form, WhatsApp.
- **Contact:** sales-in@mondaymarketing.company · +91 766 630 9102 · WhatsApp wa.me/917666309102
- **Ongoing client names on site:** D2C (Lepure, The Growing Giraffe, Mittiy Made, AwwBaby, Sprnt, OOsh, Notic, Vaga Kids, MyBrownButters), B2B (Bloom Edutours, Sprouts Edu Tours, NM Consultings, Skyfling Technologies, Flomate, JSW, LearningMate, Saint-Gobain, Gyproc), Education (MVJ College of Engineering), Other consumer (Panda Cabs). Editorial rule: no counts of clients or brands, no invented figures, no per-client performance numbers published.

## 3. Technical stack (SEO-relevant)

| Item | Current state |
|---|---|
| Framework | Astro (static output, `build.format: directory`), React islands for interactive parts (calculators, About, Careers, Contact, Work) |
| URLs | Clean directory URLs, **trailing slash enforced** |
| Sitemap | `@astrojs/sitemap` → `/sitemap-index.xml` (home-previous, home-v2, home-v2b variants excluded). `/sitemap.xml` 301s to it |
| robots.txt | `Allow: /`, `Disallow: /admin/`, sitemap declared |
| llms.txt | Present at `/llms.txt`: company summary, five systems, calculators, client book with services per client |
| Redirects | `public/_redirects` (Netlify/Cloudflare format). Maps every legacy `.html` URL (e.g. `/meta-ads.html`) to the new clean URL with 301. Also `ROLE-REDIRECTS.txt` for careers |
| Structured data | JSON-LD on every page (see section 6) |
| Fonts | Self-hosted Raleway and Nunito (woff2) |
| Heavy interactive pages | Calculators, Work, About, Contact, Careers are React islands. Check what is server-rendered vs client-rendered for crawlers and AI bots |
| Tracking | `src/layouts/tracking.html` in the base layout |
| Hosting | Not stated in repo (redirects file suggests Netlify or Cloudflare Pages) |

## 4. Complete URL architecture

Primary hierarchy (indexable pages, with current `<title>` and H1):

```
/                                  Home
│                                  Title: MMC: Growth Partner for D2C, B2B and Education | India
│                                  H1: Performance marketing that survives the P&L.
│
├── /services/                     Services hub (CollectionPage)
│   │                              Title: Marketing Services for D2C, B2B and Education Brands | MMC
│   │
│   ├── /services/performance-marketing/            PILLAR: Performance Marketing for D2C Brands in India
│   │   ├── /services/performance-marketing/meta-ads/          Meta Ads Agency in India for D2C, B2B and Education Brands
│   │   ├── /services/performance-marketing/google-ads/        Google Ads Agency in India
│   │   ├── /services/performance-marketing/amazon-ads/        Amazon Ads Management for D2C Brands in India
│   │   └── /services/performance-marketing/quick-commerce/    Quick Commerce Ads in India: Blinkit, Zepto
│   │
│   ├── /services/lead-generation/                  Lead Generation Agency in India for B2B, Education and D2C
│   ├── /services/retention-marketing/              Retention Marketing in India
│   ├── /services/seo/                              SEO and AI Search Visibility in India
│   ├── /services/cro/                              Conversion Rate Optimisation (CRO) in India
│   ├── /services/shopify-development/              Shopify Marketing and Development for D2C Brands in India
│   ├── /services/web-development/                  Website Development in India
│   ├── /services/mobile-app-development/           Mobile App Development in India
│   ├── /services/ui-ux-design/                     UI/UX Design for Websites and Apps in India
│   ├── /services/ugc-and-video/                    UGC and Video Ads in India
│   ├── /services/social-media/                     Social Media Creatives in India
│   ├── /services/influencer-marketing/             Influencer Marketing for D2C Brands in India
│   ├── /services/branding/                         Branding and Brand Identity in India
│   ├── /services/packaging-design/                 Packaging Design for D2C Brands in India
│   └── /services/online-reputation-management/     Online Reputation Management in India
│
├── /industries/                   Industries hub (CollectionPage)
│   ├── /industries/d2c/           Marketing for D2C Brands in India
│   ├── /industries/b2b/           B2B Lead Generation Agency in India
│   └── /industries/education/     Admission Marketing for Colleges in India
│
├── /ai-by-mmc/                    AI services hub: "Let AI do the heavy lifting. We make sure it grows you."
│   ├── /ai-by-mmc/ugc/                        AI UGC Videos for Ads and Social
│   ├── /ai-by-mmc/video-generation/           AI Video Generation for Ads and Brand Films
│   ├── /ai-by-mmc/photoshoot/                 AI Photoshoot for Brands
│   ├── /ai-by-mmc/spokesperson-video/         AI Spokesperson Video: A Presenter for You
│   ├── /ai-by-mmc/sales-agent/                AI Sales Agent: Chat and WhatsApp Lead Qualification
│   └── /ai-by-mmc/landing-page-builder/       AI Landing Page Builder for Campaigns
│
├── /work/                         Case studies hub: "Real projects, not a slide deck."
│   ├── D2C:        /work/awwbaby/  /work/giraffe/  /work/mittiy/  /work/sprnt/  /work/oosh/  /work/notic/  /work/vagakids/  /work/mbb/
│   ├── B2B:        /work/nmc/  /work/skyfling/  /work/sprouts/
│   ├── Education:  /work/mvj/
│   └── Other:      /work/pandacabs/
│
├── /resources/                    Resources hub (calculators, glossary, insights)
│   ├── /tools/                    D2C calculators hub (CollectionPage + ItemList)
│   │   ├── /tools/unit-economics/         CM1 to CM3, what one order leaves behind
│   │   ├── /tools/breakeven-roas/         ROAS needed to stop losing money
│   │   ├── /tools/ltv-cac/                Lifetime value and CAC payback
│   │   ├── /tools/funnel-roas/            Where the funnel leaks
│   │   ├── /tools/cac-runway/             How long a new brand burns before it turns
│   │   └── /tools/growth-trajectory/      MoM, YoY and 5-year path
│   ├── /glossary/                 D2C Marketing Glossary (53 terms, DefinedTermSet)
│   ├── /insights/                 Insights hub (CollectionPage + ItemList)
│   └── /guides/                   Guides hub (CollectionPage)
│       ├── /guides/attribution-overlap/        Why ad dashboards report more sales than you made
│       ├── /guides/contribution-margin-roas/   Contribution margin and the ROAS you need to break even
│       └── /guides/creative-testing/           How D2C brands test ad creative without guessing
│
├── /audit/                        Free Paid-Media Audit for Brands in India (lead magnet)
├── /about/                        About Monday Marketing Company | Growth Partner in Thane, India (AboutPage)
├── /careers/                      Careers hub (CollectionPage + ItemList)
│   ├── /careers/senior-meta-buyer/  /careers/google-amazon-specialist/  /careers/growth-strategist/
│   ├── /careers/performance-copywriter/  /careers/senior-art-director/  /careers/shopify-engineer/
├── /contact/                      Contact (ContactPage, ProfessionalService, OpeningHoursSpecification)
├── /thank-you/                    Post-submit confirmation (noindex, not in sitemap; fires lead_thank_you + Meta Lead)
├── /privacy/                      Privacy policy
└── /terms/                        Terms and conditions
```

Notes on the structure:
- Services are **flat under `/services/`** except performance marketing, which is a pillar with four platform children. Other possible pillars (e.g. web + Shopify + CRO + UI/UX, or creative: UGC + social + influencer) are not grouped in the URL.
- `/resources/`, `/tools/`, `/insights/`, `/guides/`, `/glossary/` are **parallel top-level URLs**, not nested under `/resources/`. `/resources/` is a hub that links to the others.
- `/insights/` and `/guides/` overlap in purpose (both list the three guides).
- `/industries/` has exactly three children. There are no sub-industry or vertical pages.
- Legacy `.html` URLs (old site) 301 to the above. Two preview variants (home-previous, home-v2, home-v2b) exist in the build and are excluded from the sitemap (confirm they are noindex or removed in production).
- `/admin/` is blocked in robots.txt.
- Forms (Contact brief, brief modal) redirect to `/thank-you/` after submit. Lead delivery: `window.MMC_FORM_ENDPOINT` is NOT set yet, so submissions fall back to opening the visitor's email app (mailto). A real form endpoint is still needed. The Calendly booking flow has no thank-you step.

## 5. Page templates (what each type contains)

| Template | Used by | Typical contents |
|---|---|---|
| **Home** | `/` | Hero, services hover-to-project, brand logo hover-to-project, systems, work rail, on-camera, about studio, disciplines |
| **Service hub page** (`hub/*` components) | All `/services/*`, `/industries/*`, `/resources/`, `/guides/` | Hero, direct **Answer** block, stages/loop, numbers, brands, "AI version" summary, article body, Beyond/related, FAQ, pre-footer CTA, linked D2C calculators (`TOOLS_FOR` map) |
| **Calculator** | `/tools/*` | React tool, WebApplication + Offer schema, FAQ, glossary and guide links |
| **Guide / article** | `/guides/*` | Summary, TOC, body, inline tool, related, next step, Article + FAQPage schema |
| **Case study** | `/work/*` | Brand meta, testimonial block, proof slots, CreativeWork + Organization schema. About 1,000 words of rendered HTML each, much of it likely shared chrome |
| **AI service page** | `/ai-by-mmc/*` | Service + WebPage + FAQPage + Organization schema |
| **Job page** | `/careers/*` | JobPosting schema with salary (MonetaryAmount), location or remote |
| **Company** | About, Contact, Careers hub | React islands, FAQPage on About, Careers hub, Contact |
| **Legal** | Privacy, Terms | WebPage + BreadcrumbList |

Global shell on every page: nav menu (mega menu, `menu-data.ts`), footer, mobile bar, sticky booking bar, audit modal, AI floating button, cookie banner, free-tools strip, pre-footer CTA, proof wall.

## 6. Structured data in place today (from built HTML)

| Page type | `@type` values found |
|---|---|
| Home | Organization, ProfessionalService, WebSite, WebPage, BreadcrumbList, ImageObject, PostalAddress, Country |
| Service pages | Service, WebPage, BreadcrumbList, FAQPage (Question/Answer), Country (areaServed) |
| Industry pages, Audit, Resources | WebPage, BreadcrumbList, FAQPage |
| Hubs (Services, Industries, Guides, Tools, Insights, Careers, Work) | CollectionPage, ItemList (some), BreadcrumbList, FAQPage (some) |
| Guides | Article, WebPage, BreadcrumbList, FAQPage |
| Tools | WebApplication, Offer, Organization, BreadcrumbList, FAQPage |
| Glossary | DefinedTermSet, DefinedTerm, FAQPage, BreadcrumbList |
| Case studies | CreativeWork, Organization, BreadcrumbList (**no Review, no results**) |
| Careers | JobPosting (+ salary, location), CollectionPage on hub |
| About | AboutPage, FAQPage, BreadcrumbList |
| Contact | ContactPage, ContactPoint, ProfessionalService, OpeningHoursSpecification, PostalAddress |

Every audited page has a meta description. No page in the build carries a noindex tag.

## 7. Internal linking logic today

- Mega menu on every page (services, industries, work, resources, AI by MMC, company).
- Each service page links to **relevant D2C calculators** via a fixed map (`TOOLS_FOR` in `src/lib/site.ts`), e.g. Meta Ads → break-even ROAS, unit economics; Lead gen → CAC runway, LTV:CAC; SEO → unit economics, CAC runway.
- Services pages carry related-services blocks, brand/proof blocks and a pre-footer CTA.
- Guides link to calculators (inline tool) and to glossary terms; glossary defines terms used across the site.
- Case studies link back to the services used per client (`work-clients.json`).
- One booking label sitewide: "Book a strategy call". One secondary link per page.

## 8. Content assets available for AEO and GEO

- Direct-answer ("Answer") blocks and FAQPage schema on nearly all commercial pages.
- 53-term glossary with DefinedTerm markup.
- Six calculators (original, citable, tool-based content).
- Three guides on attribution, contribution margin and creative testing (original POV: contribution margin over platform ROAS).
- `llms.txt` with services, tools and the client book.
- A hub "AI version" component (a machine-readable summary block on hub pages).
- Case study pages for 13 brands with services listed, but no published metrics by policy.

## 9. Observed gaps to hand the strategists (structural, not verified against rankings)

1. **No location pages.** Title tags say "India" everywhere; the office is Thane/Mumbai. No city pages (Mumbai, Delhi NCR, Bengaluru, Pune, Hyderabad, Chennai, Ahmedabad, etc.) and no Google Business Profile reference in the repo.
2. **Thin blog.** Only three guides, plus an `/insights/` hub that overlaps `/guides/`. No publishing cadence, no author pages, no author or reviewer markup on Article schema, no dated freshness signals mentioned.
3. **No E-E-A-T pages:** no team or founder pages, no author bios, no awards or certifications page (Google, Meta, Shopify partner status unknown), no reviews or testimonials schema.
4. **Case studies carry no results** by policy, so they are weak as evidence for both rankings and AI citation. Consider qualitative proof, process detail, before/after visuals, and client quotes.
5. **Industries are shallow:** three pages. No vertical depth (e.g. skincare, baby products, food, fashion, ed-tech, colleges, study abroad, SaaS, manufacturing).
6. **Services pillar structure is uneven:** only performance marketing has children. No pages for: Instagram ads, YouTube ads, LinkedIn ads, Flipkart/Myntra/Nykaa ads, WhatsApp marketing, email marketing, ASO, programmatic, marketplace management, Shopify migration, Shopify CRO, website maintenance, etc. Needs keyword research before deciding.
7. **No comparison or "vs" pages, no pricing pages, no "cost of" content,** which are high-intent and heavily cited by AI answers.
8. **No Review or AggregateRating schema,** no `sameAs` confirmation for social profiles (check in Organization JSON-LD), no `logo`/`founder`/`foundingDate` confirmation.
9. **Client-rendered islands** (calculators, Work, Contact, About, Careers): verify the key copy is in the static HTML for crawlers and AI bots.
10. **`/insights/` and `/guides/` and `/resources/` overlap:** decide the canonical content hub.
11. **Titles are long on some pages** (e.g. Lead Generation, Meta Ads, Shopify exceed typical truncation); H1s are brand-voice sentences, not keyword-led, so keyword targeting rests on titles and the Answer block.
12. **Preview homepage variants** exist in the build; confirm they are not publicly accessible or indexable.
13. **AI-crawler policy is undefined:** robots.txt does not mention GPTBot, ClaudeBot, PerplexityBot, Google-Extended, etc. (currently allowed by `User-agent: *`). Decide deliberately.
14. **Hreflang/international:** none; India-only is assumed. Confirm if UAE, US, UK, Singapore or Australia audiences matter.
15. **Image SEO:** alt text, WebP/AVIF, and image sitemap status not audited.
16. **Core Web Vitals and performance** not measured here. Run Lighthouse/CrUX on home, a service page, a calculator and a case study.

## 10. Target audience and query themes to research (starting points only, not volumes)

- **D2C (lead audience):** D2C marketing agency India, Meta ads agency, Google ads agency, Amazon ads agency, quick commerce ads (Blinkit, Zepto, Instamart), Shopify agency India, CRO agency, retention and WhatsApp marketing, UGC agency, influencer marketing agency, packaging design, ROAS vs contribution margin, break-even ROAS, CAC and LTV calculators.
- **B2B:** B2B lead generation agency India, LinkedIn lead gen, demand generation, website redesign for B2B, manufacturing marketing, SaaS marketing India.
- **Education:** admission marketing, college admission leads, education digital marketing agency, study-abroad consultancy marketing, school and university marketing, edu-tours marketing.
- **AI services:** AI UGC videos, AI product photoshoot, AI spokesperson video, AI sales agent for WhatsApp, AI landing page builder.
- **Brand and trust:** "best digital marketing agency in Mumbai/Thane/India", agency reviews, pricing/retainer questions.
- **Informational/AEO:** "what is a good ROAS", "what is contribution margin in D2C", "why Meta ROAS is higher than Shopify revenue", "how to test ad creatives", plus all 53 glossary terms.

## 11. Constraints the plan must respect (brand and editorial rules)

- Audience order always **D2C brands, B2B companies, Education brands**. Lead with D2C, never D2C-only.
- **No counts** of clients, brands or projects. Say "a few of the brands we work with".
- **No invented figures** and no per-client performance numbers.
- One booking label: **"Book a strategy call"**.
- Calculators are branded "D2C calculators". Page title and H1 use the short name plus "calculator".
- Platform imagery (Meta, Google, Amazon, Blinkit, Zepto, Instamart) shows real brands and dashboard-style UIs with an illustrative note.
- Visual-first, literal imagery; the navigation, service-page hero and footer are fixed designs.

## 12. Deliverables to request from ChatGPT and Claude

1. **SEO:** keyword universe and clustering by page and funnel stage; page-by-page title/H1/meta recommendations; internal linking map; new page list prioritised by effort versus impact; local SEO plan (Thane, Mumbai, India); backlink and digital PR plan; technical audit checklist (rendering, CWV, canonicals, sitemaps, redirects, image SEO).
2. **AEO:** question inventory per service and industry; answer-block format standards (40 to 60 word direct answers, tables, lists, step lists); FAQ and HowTo strategy (note Google's reduced rich-result support for FAQ/HowTo); People Also Ask targeting; voice and featured-snippet formats.
3. **GEO:** entity strategy (Organization, founders, services, brand name disambiguation); `llms.txt` improvements; citation-worthy content (original data, definitions, frameworks, calculators); third-party presence plan (Clutch, GoodFirms, LinkedIn, Reddit, Quora, YouTube, Wikipedia/Wikidata if eligible, Crunchbase, Google Business Profile); AI-crawler access policy; a prompt-set to measure share of voice across ChatGPT, Perplexity, Gemini, Claude and Google AI Overviews.
4. **Measurement:** KPI tree (rankings, impressions, AI citations, branded search, qualified leads), GSC, GA4, a monthly reporting template.
5. **Roadmap:** 30/60/90-day and 6-month plan with owners and dependencies.

## 13. Open questions the strategist will need answered

- Which services and audiences are the revenue priorities (rank the 16 services)?
- Primary geography: India-wide, Mumbai, or international?
- Is there an existing Google Search Console, GA4, Google Business Profile, Clutch or LinkedIn presence, and what is the current branded and non-branded traffic?
- Who can write or approve content (founders, strategists), so author-led E-E-A-T is possible?
- Are partner badges (Meta, Google, Shopify) or awards available to show?
- Can any case-study proof be published (quotes, screenshots, qualitative outcomes) despite the no-figures rule?
- Preferred hosting and whether server-side rendering or prerendering is available for the React islands.

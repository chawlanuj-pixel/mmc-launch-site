# MMC Astro V2 plan: mirror Brandconn's architecture, keep MMC's brand

Scope: structure and page architecture only. Nav (`src/components/shell/NavMenu.tsx`, `menu-data.ts`), service-page hero (`src/components/hub/Hero.astro`, `src/components/pages/PageHero.astro`) and footer (`src/components/Footer.astro`) stay untouched.
Sources: Brandconn teardown (5 files) and the V2 repo as of 2026-10-09. Brandconn figures are not fact-checked and none are reused.

Rules that apply to every task below:
- No client or brand counts ("a few of the brands"). No invented numbers, prices, awards, quotes or results.
- No em dashes. Every text block gets a literal scene (photo or real platform UI with an "illustrative" note).
- All internal links go through `href()` / `fixHtml()` in `src/lib/links.ts`; new routes are registered in `src/data/routes.json` only where they replace an old entry.
- Flag for the owner: `NEW-PAGES-BRIEF.md` says "do not use Cormorant Garamond", while this V2 brief wants it as the italic accent. Decide once. The homepage already uses `<em>` accents in H2s, so the accent exists in some form.

---

## 1. Page map: Brandconn page group -> MMC route -> status -> V2 action

Status key: exists = serves the intent with the same depth; thin = route exists but lacks the Brandconn section or intent coverage; missing = no route.

### 1a. Company

| Brandconn group | MMC route today | Status | V2 action |
|---|---|---|---|
| Home `/` | `/` (`src/pages/index.astro`) | exists | Re-order and add sections (see section 2). |
| `/about-us/` | `/about/` (`about.astro`, React island) | exists, but verify key copy is in static HTML | Add team/founder block with Person schema, "how we work" accordion; keep AboutPage + FAQPage. |
| `/testimonials/` (text + video) | none (only `components/work/TestimonialBlock.astro` per case study) | missing | New `/testimonials/` only with quotes recorded in `src/data/work-clients.json` or `case-studies.json`. Reuse the existing "Voices" videos in `public/assets/voices/`. No invented quotes. |
| `/careers/` + role pages | `/careers/`, `/careers/[slug]` (6 roles) | exists | Keep. Add apply form (current flow is mailto per MIGRATION notes). |
| `/contact-us/` | `/contact/` | exists | Keep. Add real form endpoint (`MMC_FORM_ENDPOINT` unset). |
| `/case-studies/` (filterable list) | `/work/` (`work.astro`) | exists | Add filter chips D2C / B2B / Education (data already tagged). |
| Case study detail x5 | `/work/[slug]` (13 brands) | thin | Add results-free proof: before/after visuals, scope, service chips, client quote where recorded, next/prev project pager. |
| `/wordcamp/`, `/brightonseo-uk/` (event pages) | none | missing, skip | Brandconn's are expired event pages; do not copy. |
| `/digital-strategy/` | `/services/` + `/industries/d2c/` | thin | Skip as a separate page. Fold into a new "How we work" section on `/about/` and the homepage accordion. |
| `/audit` / lead magnet (Brandconn only has a hidden "sample audit") | `/audit/` | exists (MMC ahead) | Keep; promote on homepage and every service page. |
| Terms, Privacy | `/terms/`, `/privacy/` | exists | Keep. |

### 1b. Services (Brandconn web/e-com + marketing groups, 24 pages)

| Brandconn page | MMC route | Status | V2 action |
|---|---|---|---|
| web-design-company-india | `/services/web-development/`, `/services/ui-ux-design/` | exists | Add the missing template sections (section 3). |
| wordpress-development, woocommerce-development | none | missing | Decide: MMC is Shopify-led. Add one `/services/web-development/wordpress/` child only if the team does WordPress; otherwise skip (owner call). |
| shopify-development-services | `/services/shopify-development/` | exists | Template upgrade. |
| e-commerce-website-design | `/services/shopify-development/` + `/services/web-development/` | thin | New child `/services/web-development/ecommerce-website-design/` or a section on Shopify page. |
| product-catalog-management, ecommerce-maintenance, website-maintenance | none | missing | One new page `/services/website-maintenance/` (retainer template T2, no invented prices; "talk to us" tiers). |
| ADA compliance, malware/security | none | missing | Low priority. Skip unless the team offers it. |
| paypal-integration, qr-code-menu | none | missing | Skip (off-strategy). Razorpay/GoKwik/Shopflo checkout is covered in the platform strip. |
| seo-services-india | `/services/seo/` | exists | Template upgrade. |
| ai-seo, aeo, geo services (3 pages) | covered inside `/services/seo/` only | thin | Split into 3 children: `/services/seo/ai-seo/`, `/services/seo/aeo/`, `/services/seo/geo/`, cross-linked as a cluster. Highest SEO lever (Brandconn only cross-links AI SEO to AEO/GEO). |
| enterprise-seo-services | none | missing | Optional child `/services/seo/enterprise/` for B2B. Phase 4. |
| google-ads-management | `/services/performance-marketing/google-ads/` | exists | Template upgrade. |
| facebook-marketing | `/services/performance-marketing/meta-ads/` | exists | Template upgrade. |
| social-media-marketing | `/services/social-media/` | exists | Template upgrade. |
| content-marketing | `/guides/` only | thin | New `/services/content-marketing/` page, linked to guides. |
| conversion-rate-optimisation | `/services/cro/` | exists | Template upgrade. |
| google-my-business-profile-optimization | none | missing | New `/services/seo/google-business-profile/` (local, Thane/Mumbai/Indore). |
| online-reputation-management | `/services/online-reputation-management/` | exists | Template upgrade. |
| (MMC extras, no Brandconn equivalent) | Meta, Amazon, quick commerce, lead gen, retention, branding, packaging, UGC, influencer, app dev, AI by MMC (7 pages) | exists | Keep; they are the differentiators. |

### 1c. Outsourcing, industries, resources

| Brandconn group | MMC route | Status | V2 action |
|---|---|---|---|
| `/outsourcing/`, outsource-web-design-india, hire-wordpress / shopify / seo developers (white-label for agencies) | none | missing | Different audience (agencies). Add one `/partners/white-label/` page only if MMC wants agency work. Otherwise skip. Owner call. |
| `/industry/` hub + 26 industry pages (web design x11, SEO x15) | `/industries/` hub + `/industries/d2c/`, `/b2b/`, `/education/` | thin (3 vs 26) | Add vertical children, one visual page per vertical (not split design vs SEO as Brandconn did). Start: D2C skincare, baby and kids, food, fashion; B2B manufacturing, SaaS; Education colleges, study abroad. Route: `/industries/d2c/skincare/` etc. Data in new `src/data/hubs/industries__*.json`. |
| `/blog/` + categories | `/guides/` (3 guides) + `/insights/` hub | thin | Choose `/guides/` as the one hub, make `/insights/` redirect or canonical to it. Publish cadence plan (section 4). |
| `/ebooks-whitepapers/` | `/tools/` (6 calculators), `/glossary/` | exists (MMC ahead) | Add gated "playbook" PDFs later (Phase 4). |
| `/process-documents/` (stub) | none | skip | |
| Locations (Brandconn: 4 office addresses in footer) | none | missing | City pages Mumbai, Thane, Indore, then Delhi NCR, Bengaluru, Pune (Phase 4, `/locations/<city>/`). Footer stays as is. |

---

## 2. Homepage

### 2a. Brandconn's 9 sections (in order)
1. Hero: full-bleed autoplay video, no headline text in HTML.
2. What we do: H1, intro paragraph, 2x2 icon boxes (4 services, unlinked).
3. Outsourcing + Showcase: two parallax half-panels with one link each.
4. How we do it: H2 plus 4-item accordion.
5. Team photo + award, with two count-up counters.
6. Client logo wall (static 6x2 grid).
7. Testimonials: slider (3 quotes) beside a staged photo.
8. What's New: 3 blog cards.
9. CTA band: "Got a project? Let's talk."

### 2b. MMC homepage today (`src/pages/index.astro`, in order)
1. Sticky mobile CTA (`.hn-mcta`)
2. `HeroSystem` (hero)
3. `#clients` brand pager ("A few of the brands we work with", logo tile to project)
4. `#tools` platform ribbon ("We don't just advise on the stack. We run it.")
5. `AboutStudio`
6. `#who` three kinds of business (D2C, B2B, education)
7. `Disciplines` (services hover-to-project, approved)
8. `WorkRail` (work cards)
9. `OnCamera` (recorded voices)
10. `#insights` latest guides
11. `#process` four-step process ("Four weeks to a working engine")
12. `#close` calculators close ("what a customer is actually worth")

### 2c. Gap vs Brandconn (what MMC lacks)
- How-we-do-it accordion with the client's goals (find customers, visibility, engage, reputation): MMC has a stepper, no accordion and no goal framing.
- Proof/outcome strip tied to each audience: MMC has logos and work cards but no labelled "what we run" strip per audience on the first screen.
- Testimonials: none on the homepage (Brandconn has 3).
- FAQ with FAQPage schema: none on the homepage.
- Lead capture: only a sticky button; no inline audit form.
- Closing CTA band with response-time line: `#close` is calculator-led, no form or WhatsApp.
- Services strip linking to every service page (Disciplines hover covers it, keep).

### 2d. Recommended V2 homepage order
Keep the approved hover-to-project sections exactly (`Disciplines`, `#clients`), move the rest around them.

| # | Section | Source | Visual (literal) | Note |
|---|---|---|---|---|
| 1 | Hero: H1, sub, two CTAs ("Book a strategy call", "Get my free audit") | `HeroSystem` | existing hero photography | Poster-first; any video under 1 MB. Keep sticky mobile CTA. |
| 2 | Brand wall, hover-to-project | `#clients` (approved) | real client logos and project previews | Heading stays "A few of the brands we work with". |
| 3 | What we do: H1/H2 intro plus services hover-to-project | `Disciplines` (approved) | project previews | Add one-line link row to the 5 systems. |
| 4 | Three lanes: D2C, B2B, education | `#who` | `AUDIENCES` photos already in `index.astro` | Moves up (Brandconn has no audience split; this is the edge). |
| 5 | Outcome strip: "What we run for each" per audience (qualitative, no numbers) | NEW `components/home/OutcomeStrip.astro` | platform dashboards (Meta, Google, Shopify, WhatsApp) with illustrative note | Content from `work-clients.json` services per client. |
| 6 | Platform ribbon | `#tools` | vendor logos | Unchanged. |
| 7 | How we do it: goals accordion beside a photo | NEW `components/home/HowAccordion.astro` (4 items, wording from `STEPS` + `Answer` copy) | desk/data scene (`/assets/rt/data.jpg`, `/assets/ux/test.jpg`) | Replaces `#process` stepper in place; keep the "Four weeks" wording. |
| 8 | Work rail | `WorkRail` | project images | |
| 9 | Testimonials slider (real quotes only) + "Watch client videos" link | NEW `components/shared/TestimonialSlider.astro`, merge with `OnCamera` | recorded video posters | Hide section if fewer than 2 recorded quotes exist. |
| 10 | Studio / team | `AboutStudio` | team photo | Founder/team names for E-E-A-T once approved. |
| 11 | Calculators band (lead capture 1) | from `#close` `NUMBERS` | calculator UI screenshots | |
| 12 | Latest guides | `#insights` | guide covers | |
| 13 | FAQ (6 to 8 questions, FAQPage schema) | reuse `components/hub/Faq.astro` | people/desk photo beside | New data `src/data/pages/home-faq.json`; add to `jsonld` in `index.astro`. |
| 14 | Closing band with inline audit form + WhatsApp + "reply within 24 hours" only if the team confirms it | `PreFooterCta` pattern | office/team photo | Lead capture 2. |

Also: `home-previous`, `home-v2`, `home-v2b` variants stay excluded from the sitemap; confirm they are noindex.

---

## 3. Service page template

### 3a. Brandconn order
1 hero band + CTA, 2 breadcrumb, 3 intro (H2 + 2-3 paragraphs), 4 proof strip (counters or logo grid), 5 numbered 3x2 grid (01 to 06), 6 icon-card grid, 7 why-us image band, 8 process accordion + illustration, 9 testimonial slider (red band), 10 FAQ accordion, 11 mid CTA band, 12 closing CTA band, 13 footer.

### 3b. MMC today (`src/pages/[...slug].astro`, data from `src/data/hubs/*.json`)
Hero (hub/Hero) -> Answer ("In short") -> Article -> PlatformShowcase (if `H.platform`) -> Stages (leaks vs stages) -> LoopB (if `H.loop`) -> Numbers -> ProcessBand (if `H.process`) -> WhoFor (if `H.who`) -> BrandTiles (if proof) -> Beyond (related) -> AiVersion -> Faq -> FreeToolsStrip -> LinkStrip (guides) -> PreFooterCta -> StickyBookingBar.

### 3c. Mapping and gaps

| Brandconn block | MMC equivalent | Gap |
|---|---|---|
| Hero + CTA | `Hero` (keep as is) | none |
| Breadcrumb bar (visible) | BreadcrumbList in JSON-LD only; visible bar not confirmed in hub components | **Add visible breadcrumb** under the hero. New `components/shared/Breadcrumb.astro` fed by `d.path`. Do not touch `Hero.astro`; place it as the first child of `<main>` after Hero. |
| Intro | `Answer` + `Article` | none (MMC stronger) |
| Proof strip | `BrandTiles` (conditional), `Numbers` | **No qualitative proof strip** when `proofRows` is empty. Add "What we run" strip of platform marks + service chips. |
| Numbered 3x2 grid | `Stages` (variable count) | **Add `components/hub/NumberedGrid.astro`**: 01 to 06 cards, each with a photo thumbnail. Data key `grid` (6 items). |
| Why-us image band | none | **Add `components/hub/WhyUs.astro`**: photo band with 4 to 6 benefit titles (key `why`), grounded in the contribution-margin method. |
| Process accordion + illustration | `ProcessBand` (steps) | **Add accordion variant** `ProcessAccordion.astro` with literal photo beside; reuse `ProcessBand` data. |
| Testimonial slider | none on service pages (only `work/TestimonialBlock`) | **Add `components/shared/TestimonialSlider.astro`**, fed per service from `work-clients.json` (brands that carry the service). Render nothing if no recorded quote. |
| FAQ | `Faq` | none; ensure 6+ Q per page and FAQPage schema (already on nearly all). |
| Mid CTA band | only `StickyBookingBar` and the final CTA | **Add mid-page `components/shared/CtaBand.astro`** after the grid/why-us. |
| Closing CTA | `PreFooterCta` | add inline audit form variant. |
| Sidebar "select an industry" | `Beyond` | fine; add a "Who it is for" link row to the 3 audiences. |
| Author / last updated | none | **Add byline and dateModified** (see section 4). |

Resulting V2 order (all behind optional data keys so existing JSON keeps rendering):
Hero, Breadcrumb, Answer, Article, Platform, NumberedGrid (new), Stages, WhyUs (new), Loop, Numbers, ProcessAccordion (new), WhoFor, BrandTiles or Proof strip, TestimonialSlider (new), Beyond, AiVersion, Faq, CtaBand (new), FreeTools, LinkStrip, PreFooterCta.
Edit points: `src/pages/[...slug].astro`; new components under `src/components/hub/` and `src/components/shared/`; extend JSON in `src/data/hubs/*.json` (keys `grid`, `why`, `accordion`).

---

## 4. SEO / AEO / GEO / technical checklist

### 4a. Already in the repo (verified by grep)
- `public/llms.txt`: company summary, method, systems, free tools, client book.
- `public/robots.txt`: named allow for Googlebot, Bingbot, OAI-SearchBot, ChatGPT-User, PerplexityBot, Claude-SearchBot, Claude-User, and training bots (GPTBot, Google-Extended, ClaudeBot, CCBot); `/admin/` blocked; sitemap declared.
- JSON-LD via `BaseLayout` prop: Organization, ProfessionalService, WebSite, WebPage, BreadcrumbList, Service, FAQPage, CollectionPage, Article (guides, with `dateModified`), DefinedTermSet, WebApplication, JobPosting, ContactPage. `sameAs` present in `src/data/pages/heads.json` and contact data.
- `@astrojs/sitemap` with preview variants filtered (`astro.config.mjs`); `trailingSlash: "always"`; legacy `.html` 301s in `public/_redirects`.
- Canonical, Open Graph and Twitter card tags in `BaseLayout.astro` (single shared `og-card.jpg`).
- Answer block + FAQ on nearly every commercial page; 53-term glossary; calculators.
- Images: `fetchpriority` in `hub/Img.astro`; one preload in `OnCamera.astro`; client logos recompressed.

### 4b. Missing, with file-level tasks

| # | Gap | Task | Files |
|---|---|---|---|
| 1 | No hreflang | India only: add `<link rel="alternate" hreflang="en-IN">` plus `x-default` self-references. Skip multi-region unless owner confirms markets. | `src/layouts/BaseLayout.astro` |
| 2 | Visible breadcrumbs unconfirmed | Add visual breadcrumb component bound to the same data as BreadcrumbList. | new `src/components/shared/Breadcrumb.astro`; `[...slug].astro`, `work/[slug].astro`, `guides/[slug].astro` |
| 3 | Per-page OG image is one shared card | Generate per-section OG images (services, industries, guides, work) and pass `image` prop. | `BaseLayout.astro` (add `image` prop), `public/assets/og/` |
| 4 | OG type always `website` | Set `article` for guides with `article:published_time`, `article:modified_time`. | `BaseLayout.astro`, `src/pages/guides/[slug].astro` |
| 5 | No Person / author / reviewer on Article | Add Person (author, reviewer) to Article JSON-LD and a visible byline plus "Last updated" on guides and service pages. Needs owner-approved names. | `src/data/guides/*.json`, `src/lib/pagehead.ts`, `components/article/Summary.astro` |
| 6 | Service pages lack `dateModified` | Add `dateModified` to WebPage/Service JSON-LD from a `updated` field in each hub JSON. | `src/lib/hub.ts` (`rewriteJsonld`), `src/data/hubs/*.json` |
| 7 | No Review/AggregateRating | Add `Review` only for quotes on the page and only with permission. Never AggregateRating without a verifiable source (Brandconn's was unbacked; do not copy). | testimonial component, `case-studies.json` |
| 8 | No Offer/HowTo | Add `HowTo` for the "how we do it" accordion where steps are real; add `ItemList` to hubs missing it. | `src/lib/hub.ts` |
| 9 | Home has no FAQPage | Add home FAQ and merge FAQPage into `jsonld` in `index.astro`. | `src/pages/index.astro`, `src/data/pages/home-faq.json` |
| 10 | Image formats | Only 6 webp/avif files vs 385 jpg. Add build-time conversion to AVIF/WebP with `<picture>` and explicit width/height. Use Astro `<Image>` or a `sharp` script. | `tools/` (new `optimise-images.mjs`), `hub/Img.astro`, `home/*.astro` |
| 11 | Font loading | Confirm fonts are self-hosted with `font-display: swap` and add `<link rel="preload" as="font">` for the two critical files (DM Sans 400/700; Cormorant italic only if kept). | `BaseLayout.astro`, `src/styles/design-system/colors_and_type.css` |
| 12 | LCP preload | Preload the hero image per page type (home, hub); lazy-load below the fold. | `BaseLayout.astro` (slot or prop `preloadImage`), `HeroSystem.astro`, `hub/Hero.astro` (read-only: pass via prop from `[...slug].astro`; do not edit the hero markup) |
| 13 | Client-rendered islands | Confirm About, Contact, Careers, Work, calculators ship their copy in static HTML. Run `curl` on built output. | `src/pages/about.astro`, `contact.astro`, `work.astro` |
| 14 | `/insights/` overlaps `/guides/` | Pick `/guides/` as canonical hub; redirect `/insights/`. | `public/_redirects`, `sitemap` filter |
| 15 | Sitemap detail | Add `lastmod` (build date or per-page `updated`), and an image sitemap for work pages. | `astro.config.mjs` (`serialize`) |
| 16 | llms.txt freshness | Regenerate to list all new V2 pages; add `llms-full.txt` with the Answer blocks. | `public/llms.txt`, `tools/` script |
| 17 | AEO: answer-first and tables | Add a short comparison table (for example "agency vs in-house vs freelancer", "Meta vs Google vs Amazon for D2C") to the pillar pages; keep 40 to 60 word Answer blocks. | `src/data/hubs/*.json`, `components/hub/Answer.astro` |
| 18 | GEO: citable entities | Add `knowsAbout`, `foundingDate`, `founder`, `logo` to Organization; cite sources; keep glossary and calculators crawlable. | `src/data/pages/heads.json`, `index.astro` |
| 19 | Local SEO | Location pages (Thane, Mumbai, Indore) with LocalBusiness schema, Google Business Profile link. Needs confirmed profile URL. | new `src/pages/locations/[city].astro`, `src/data/locations.json` |
| 20 | Titles too long | Trim titles over about 60 chars (Lead gen, Meta, Shopify). | `src/data/hubs/*.json` |
| 21 | Form endpoint | Set a real form endpoint so leads are not mailto. | `public/assets/mmc-forms.js`, `BaseLayout.astro` |
| 22 | Core Web Vitals not measured | Run Lighthouse on home, a service page, a calculator, a case study before and after V2. | n/a |
| 23 | Pre-launch checks | One h1 per page, no `.html` hrefs, JSON-LD valid, no missing `/assets`, sitemap contains only canonical URLs. | `npx astro build --outDir /tmp/dist-v2`, grep |

---

## 5. Build order (phases)

Phase 0: foundations (no visible change)
- Decide Cormorant question; confirm which Brandconn-only services MMC actually sells (WordPress, maintenance, ADA, white-label).
- Add routes to `src/data/routes.json`; create `home-faq.json`; add `updated` field to hub JSON.
- Files: `src/data/routes.json`, `src/data/hubs/*.json`, `src/lib/hub.ts`.

Phase 1: reusable components (Brandconn kit, MMC look)
- `components/shared/Breadcrumb.astro`, `CtaBand.astro`, `TestimonialSlider.astro`
- `components/hub/NumberedGrid.astro`, `WhyUs.astro`, `ProcessAccordion.astro`
- `components/home/HowAccordion.astro`, `OutcomeStrip.astro`
- Styles in `src/styles/hub-extra.css` and `home-v2b.css` (scope with existing prefixes `hv-`, `hb-`).
- Each needs a literal photo slot; generate scenes with the Higgsfield tools per `NEW-PAGES-BRIEF.md`.

Phase 2: service-page template
- Wire new sections into `src/pages/[...slug].astro` behind optional keys; backfill `grid`, `why`, `accordion` for priority pages first: Meta Ads, Google Ads, Shopify, SEO, CRO, Lead generation.
- Then the remaining 17 hub pages.
- Files: `src/pages/[...slug].astro`, `src/data/hubs/services__*.json`.

Phase 3: homepage
- Re-order `src/pages/index.astro` per 2d; add FAQ, testimonials (only recorded quotes), outcome strip, how-we-do-it accordion, closing form. Do not alter `Disciplines.astro` or the `#clients` pager logic.
- Files: `src/pages/index.astro`, `src/components/home/*`, `src/styles/home-v2b.css`, `mobile-home.css` (keep last import).

Phase 4: SEO/AEO/GEO technical (can run in parallel with 2 and 3)
- Items 1, 4, 6, 9, 11, 12, 14, 15, 16, 20, 21 first (small, high return); then 5, 7, 8, 10, 13, 17, 18.
- Files: `src/layouts/BaseLayout.astro`, `astro.config.mjs`, `src/lib/hub.ts`, `src/lib/pagehead.ts`, `public/llms.txt`, `public/_redirects`, `tools/optimise-images.mjs`.

Phase 5: new pages (largest SEO surface)
- AI-search cluster: `/services/seo/ai-seo/`, `/aeo/`, `/geo/` (data: `src/data/hubs/services__seo__*.json`).
- `/services/content-marketing/`, `/services/website-maintenance/`, `/services/seo/google-business-profile/`.
- Industry verticals: `src/data/hubs/industries__d2c__*.json`, `industries__b2b__*.json`, `industries__education__*.json` (3 to 8 pages).
- `/testimonials/`, `/locations/<city>/`.
- Update `menu-data.ts` entries only if the owner approves; the nav must otherwise stay as is (new pages can be reached from hubs and `LinkStrip` first).

Phase 6: content engine and QA
- Guides cadence (2 per month), author pages, gated playbooks, comparison and "cost of" pages.
- Per `ui-work-needs-agent-review` memory: a UI agent must test every changed template in a browser (all scroll states, phone) before reporting done. Do not use a browser during the build itself.
- Final: `npx astro build --outDir /tmp/dist-v2`, curl/grep checks (item 23), Lighthouse (item 22).

---
## Decisions (recorded 2026-10-09)
- Type: the live site removed Cormorant Garamond by request; headings use Raleway, body Nunito (src/styles/design-system/colors_and_type.css). V2 keeps this. Accent = italic `<em>` in the same family. Ignore the "DM Sans / Cormorant" notes elsewhere.
- Brand: royal blue, sun yellow #FFC528, ink, paper. Nav, service hero (Hero.astro / PageHero.astro) and footer are untouched.
- No new generated imagery in this pass (credit cost). Reuse /public/assets/*. Each agent logs needed new images in V2-IMAGE-NEEDS.md.
- No browser during the build. Verify with `astro build --outDir <own scratch dir>` and curl/grep. One batched browser review at the end.

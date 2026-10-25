# MMC SEO/AEO/GEO audit (read-only), workstreams B/C/E
Local root: `/Users/anuj-mmc/Documents/MMC Aug Launch site/MMC Site` (abbrev `$S`). Checked 2026-09-28.

## 0. Live site state (curl)
- The live domain is NOT the new site. `https://mondaymarketing.company/` (apex) is an old WordPress site (Rank Math + AIOSEO, GTM via gtm4wp, LiteSpeed/Cloudflare). Title "Home - Monday Marketing Company", meta "Marketing is the first foot forward...", canonical = apex, last updated 2024.
- `www.` 301s to apex for everything (`x-redirect-by: WordPress`): `/`, `/robots.txt`, `/index.html`, `/meta-ads.html`. `http://www` 301s to `https://www` (Cloudflare) and then to apex.
- `https://www.mondaymarketing.company/sitemap.xml` returns 404. Apex `/sitemap.xml` 301s to `sitemap_index.xml` (post, page, e-landing-page, portfolio, job-openings and category sitemaps). Apex robots.txt is WordPress default.
- Apex `/llms.txt` is AIOSEO-generated. It calls MMC "Best Digital Marketing & Website Design and Development Agency | Branding Company in Mumbai" and lists old blog posts and WP pages (/performance-marketing/, /career/, /appointments/, /privacy-policy/).
- The new `.html` pages (e.g. `/meta-ads.html`) are not deployed. They only redirect to apex.
- **P0:** every canonical, sitemap URL, og:url and schema `@id` in the new build uses `https://www.`. The live host redirects www to apex. If the new site is deployed with the current WP redirect rule, or www/apex is not chosen and 301-mapped deliberately, you get a redirect loop or canonical/redirect conflict. Pick one host and set canonicals, sitemap, schema and the redirect rule to match.
- **P0:** the old WP URLs (`/blog/*`, `/performance-marketing/`, `/career/`, `/privacy-policy/`, `/portfolio/*`, `/e-landing-page/*`) have no redirect map in the repo. Old rankings, backlinks and the "Mumbai" positioning will be lost.
- The old site's main-domain targeting is "Mumbai digital marketing agency". The new site drops the Mumbai positioning and says nothing local.

## 1. Services MMC actually sells
Sources: sitemap (48 URLs), `$S/services.html` + `services/sv-data.js`, `$S/llms.txt`, `$S/content/seo.json`.

| Candidate | Dedicated page? | Depth (prerendered words) |
|---|---|---|
| Meta performance marketing | `meta-ads.html` | 1,272 words; also covered inside `performance-marketing.html` (1,604) |
| Google performance marketing | `google-ads.html` | 1,175 |
| Performance marketing (umbrella, D2C) | `performance-marketing.html` | 1,604 (pillar) |
| Lead generation (B2B/edu, CRM + Meta CAPI) | `lead-generation.html` | 1,719 |
| SEO and AEO | `seo.html` | 1,186 |
| Web design/dev | `web-development.html`, `shopify-development.html` | 1,188 / 1,194 |
| CRO | `conversion-rate-optimisation.html` | 1,241 |
| Retention (email/WhatsApp/loyalty) | `retention-marketing.html` | 1,218 |
| Social/UGC | `social-media-creatives.html`, `ugc-and-video.html` | 1,148 / 1,191 |
| Influencer/PR | `influencer-marketing.html` (no PR page) | 1,045 |
| Branding, UI-UX | `branding.html`, `packaging-design.html`, `ui-ux-design.html` | 1,078 / 1,058 / 1,018 |
| Video/performance creative | `ugc-and-video.html` only | 1,191 |
| Marketplace / quick-commerce | `amazon-ads.html`, `quick-commerce-ads.html` | 1,164 / 1,156 |
| Also present | `online-reputation-management.html` (1,203), `mobile-app-development.html` (1,031) | |

- No page is "thin" by word count (all above ~1,000 words), but the pages are templated. Each has the same skeleton: "In short", five mistakes, four numbers, brands strip, FAQ (heading pattern in `meta-ads.html`, `google-ads.html`, `seo.html`, `lead-generation.html`). Differentiation is by wording, not by proof, so the depth is uniform and shallow.
- llms.txt also lists "Ecommerce Management" as a service. It has no page. "Ecommerce Management" is not in the sitemap and is not on the candidate list. Confirm it with MMC.
- No PR page, no email-marketing-only page and no video-production-only page. Video is folded into UGC.
- Confirm with MMC whether Shopify, app development and packaging are sold or only illustrative. The client book (`content/clients.json`) shows services actually recorded per client: website redesign/dev, CRO, lead gen, performance ads (D2C), performance creative, social media, Amazon, quick commerce. It records no SEO, retention, branding, packaging, ORM, influencer or app work for any client.
- The "24 brands" claim in schema Organization (`content/schema.json`) does not match the client book (see section 3).

## 2. Audiences
- `d2c.html` (1,195 words), `b2b.html` (1,650), `education.html` (1,854), `industries.html` (997). Same template ("In short", leaks, four numbers, brands, FAQ, CTA). `education.html` is the deepest, with seven parent-journey leaks mapped to seven services and a CRM + CAPI section. `d2c.html` is the shortest of the three but is the stated lead audience.
- Positioning is distinct in wording: D2C = contribution margin and break-even ROAS, B2B = lead quality and CRM, education = enquiry to admission. Proof is identical across the three: the same site-wide stats and a brands strip filtered by client type. The regex scan of these pages finds no per-audience figure other than the global "₹248Cr".
- Client book has types D2C, B2B and a third bucket "B2C" (cab service, college, real-estate, Housing.com, Anchor by Panasonic, Green Hermitage, Rustomjee, Club Mahindra) that has no audience page. Education clients in the book: Bloom Edutours, Sprouts Edu Tours (labelled B2B), MVJ College of Engineering (labelled B2C). The book has no client typed "education".
- `industries.html` largely repeats the three hubs and competes with them.

## 3. Proof inventory (not validated)
- Site-wide stated figures: "8.7x median blended ROAS", "Rs 248Cr+ revenue compounded", "27 months median client tenure", "240+ creative assets a month". Appear in `home26/sections.jsx` (lines ~85-101, 206-209), meta descriptions in `content/seo.json`, `index.html` og tags, schema descriptions, `llms.txt`.
- Inconsistent internal facts to reconcile before publishing:
  - `llms.txt`: "A team of four". `content/schema.json` Organization: `numberOfEmployees` 28 and "across 24 brands". The client book has 22 named entries (13 with a service mix, 9 logo-only).
  - `Our Work.html` description says "Read the handbooks, not the logo wall", but there are no handbooks (see below).
  - Home meta says "8.7x median blended ROAS across the last 12 months" while `llms.txt` says only these three figures are stated. The number of the 240 assets is in llms.txt as "around 240".
- Client book: `content/clients.json` (22 brands: Bloom Edutours, Sprouts Edu Tours, NM Consultings, Skyfling, Lepure, Growing Giraffe, Mittiy Made, AwwBaby, Sprnt, Vaga Kids, MyBrownButters, Notic, OOsh, Panda Cabs, MVJ, plus logo-pack: Anchor by Panasonic, Flomate, Green Hermitage, Housing.com, JSW, LearningMate, Rustomjee, Saint-Gobain, Gyproc, Club Mahindra). The file itself warns that the ten logo-pack brands and three artwork-sourced ones (OOsh, Panda Cabs, MVJ) are unconfirmed for service mix and type. Do not name services for them.
- **P0 (unverifiable/fictional):** `Brand Handbook.html` and `handbook/HbHero.jsx` are the "DeoBar Skin Co." case study. `HbHero.jsx` states in a header comment that the case study is FICTIONAL and DeoBar is not a client. The page is noindex and out of the sitemap, but `content/seo.json` still holds the title "DeoBar Case Study: 3.1x to 11.8x ROAS in 90 Days", and `content/schema.json` still has a note about it. The page is still deployable and reachable by URL (noindex is the only barrier). Keep it dark or delete before launch.
- **P0:** `Service Detail.html` (indexed, in the sitemap) is a template page titled "Meta Ads Management for D2C Brands: 8.7x ROAS". It names Lepure as "Four workstreams, one pod", shows three pricing tiers (Spark, Compound, Scale; rupee ad-spend bands) and has a `Service` schema node. It duplicates `meta-ads.html` (same topic, different content). Add noindex and remove from the sitemap, or repurpose. The pricing tiers contradict `llms.txt` ("does not publish pricing").
- **P0:** `Job Detail.html` (indexed, in the sitemap) is a template job "Senior Meta Buyer, Mumbai & Bengaluru" with the title in `content/seo.json`. Confirm it is a real opening. Otherwise noindex and drop from the sitemap. The old WP site's real openings are Business Development Manager, Performance Marketing Associate, BD Executive, International Sales Executive (Mumbai, Pune, Thane).
- No written case study of a real client exists (`llms.txt`: "There is no written case study on the site at present"; `README.md` line 145: "Only DeoBar has a written case study"). `Our Work.html` is a filterable brand grid only.
- `CaseStudies.jsx` and `home26/showcase.jsx` are homepage components. Neither has per-client results. `content/clients.json` has no `results` arrays.
- `Insights.html`: eight article cards ("What a 90-day performance rebuild actually involves", "The 14-day onboarding sprint, documented", "We replaced our brief template. Cycle time dropped 32%" etc.). All link to `#article` (`insights/InFeed.jsx` lines 46, 82). No article pages exist. The claims and titles are placeholders. **P1:** remove or make them real, since they make claims (32%) that MMC cannot support.
- `About.html` (1,681 words) and `Careers.html` repeat the five-systems, "senior bands, zero account managers" and tenure claims. About the "Careers: Senior Bands, Zero Account Managers" title is an unverifiable claim.

## 4. Locations and markets
Facts on the site:
- HQ address: 4th Floor, Office No. 105, WeWork, Zenia Building, Hiranandani Business Park, Thane 400607, Maharashtra (`contact/CtPage.jsx` lines 256-261; `content/schema.json` Contact/Organization). Phone +91 766 630 9102 (footer, schema), WhatsApp/phone +91 96194 72727 (`Contact.html`, `about/AbCTA.jsx`, wa.me link), email sales-in@mondaymarketing.company. Hours Mon-Fri 10-19 IST, Sat 10-14. Calendly `calendly.com/mmc-agency-ww/audit-onboarding-calls`. Footer: "Thane · Mumbai · Maharashtra".
- Contact page "Satellite teams": Bengaluru (Performance + Creative), Dubai (Middle-East accounts), London (UK + EMEA), New York (US D2C accounts) (`contact/CtPage.jsx` 268-273). Schema `areaServed`: India, UAE, UK, US. `llms.txt` says "A team of four" in Thane. **P0 conflict:** the satellite offices and "US/UK/UAE" service area contradict a four-person Thane team and a client book that contains no non-Indian client. The schema also says 28 employees.
- Job Detail says "Mumbai & Bengaluru". Old WP site says "Mumbai" and lists Mumbai, Pune, Thane roles.
- No hreflang anywhere (`grep hreflang` returns nothing). Language `en` only. Currency is rupees, with India-targeted titles ("... in India"). No LocalBusiness/geo/`sameAs` GBP. Only Instagram and LinkedIn in `sameAs`.
- What MMC can truthfully claim (from evidence): India-based agency, Thane HQ at a WeWork address, founded 2019, serves Indian D2C, B2B and education brands, English. What is unsupported by the repo: offices in Bengaluru/Dubai/London/New York, US/UK/UAE service area, a team of 28, Mumbai office (only "Thane · Mumbai" branding; the WeWork is in Thane).
- Local SEO gap: no "Mumbai/Thane" landing content on the new site, while the old site targeted Mumbai. Decide if that is intended.

## 5. Technical
- **robots.txt** (`$S/robots.txt`): `Allow: /`, disallows `/admin/`, `/home-classic.html`, `/home-v1.html`. It also contains an invalid non-standard line `LLM-Content: ...` (harmless, but not a real directive). Not disallowed: `lead-quality-preview.html` (has noindex meta), `preloader-demo.html`, `preloader-options.html` (no noindex, no canonical, unprerendered, 65-78 words; **P1**, indexable if linked or discovered). Backup files (`Sky.jsx.bak`, `assets/_prev-generic/`, 41MB assets) are not blocked; keep them out of the deploy.
- **Sitemap** (`$S/sitemap.xml`): 48 URLs, all `www` host. Problems:
  - Contains `Job%20Detail.html`, `Service%20Detail.html`, `Our%20Work.html` (encoded spaces; **P0/P1**, mixed-case filenames and spaces are ugly, fragile and hard to redirect. Rename to `/our-work`, `/careers/<slug>`).
  - The homepage is listed as `https://www.mondaymarketing.company/` but the canonical tag on `index.html` is `https://www.mondaymarketing.company/index.html` (see below). Mismatch.
  - Everything has a generic `lastmod`, e.g. 2026-08-23 on the first URLs, with `changefreq`/`priority`.
  - Missing: `Brand Handbook.html` (intended), `lead-quality-preview.html` (correct). Not missing anything else. There is no image, blog or article sitemap (no articles exist).
  - No pages for PR, video production, email marketing, "ecommerce management", case studies, per-client pages, blog posts.
- **Canonicals**: every indexable page has a self canonical with the `www` host and `.html` extension (grep across all `*.html`). **P0:** `index.html` canonical is `.../index.html` but og:url and the sitemap say `/`. Two versions of the homepage will split signals. Standardise on `/`. Canonicals are absolute and correct in form. `lead-quality-preview.html` and preloader pages have none. `Brand Handbook.html` is `noindex, nofollow`.
- **Titles/meta** (`content/seo.json`, 51 entries): no duplicate titles and no duplicate descriptions among pages. Title length 39-62 chars. Only issues flagged by `content/page-audit.json`: `Careers.html` description 170 chars; `industries.html` 159; `guide-attribution-overlap.html` and `guide-contribution-margin-roas.html` titles 62 chars (over 60). Several titles use the "| MMC" suffix while `index.html` uses "| MMC India". Service titles all follow the pattern "X for Brands in India | MMC" (little keyword variation). Homepage title has no keyword that names the service ("Performance Marketing That Survives the P&L").
- **Prerender** (`$S/prerender.py`, `README.md`): each page ships `<div id="root">` and the content appears via Babel in the browser. The build script runs headless Chrome and bakes markup between `<!--prerender-->` markers. Effect: raw HTML now contains the full content and one h1 per page (verified: every page has `<h1` count 1; word counts above are from the baked HTML). Risks: (a) if `./build.sh` is not run before deploy, the site is an empty shell for ChatGPT/Perplexity/Claude; (b) baked markup can be stale relative to JSX; (c) the baked DOM is large and hydrates via React replacing the tree, so no true SSR; (d) `page-audit.json` shows two pages not prerendered (the preloader demos).
- **Performance red flags** (**P1**): React, ReactDOM, Babel-standalone (about 3 MB in the browser), GSAP loaded from `unpkg.com` with in-browser JSX transpile of ~15+ `text/babel` files per page (e.g. `index.html` loads Nav, Menu, AuditModal, Footer, CookieBanner, clients-strip, answer, sections, showcase, partners, app). This delays LCP/INP for real users, and Core Web Vitals will suffer. Home has 124 images (`page-audit.json`), 1 `loading="lazy"` attribute found in raw HTML for `index.html`. Assets folder is 41 MB; `assets/clients/awwbaby.png` and `vagakids.png` are the two files over 800 KB. Third-party dependency on unpkg with no fallback.
- **Structured data** (`content/schema.json`, stamped by `apply-schema.py` between `<!--schema-->` markers): BreadcrumbList on all; Organization + WebSite + WebPage on the homepage; ContactPage + ProfessionalService on Contact; CollectionPage on Our Work; ItemList on Careers; Service on Service Detail. Service hub pages (e.g. `meta-ads.html`) carry BreadcrumbList, WebPage, Service (with areaServed Country) and FAQPage. Guides carry Article + FAQPage. **Gaps:** no `Person` for the guides' authors, no `JobPosting` on Job Detail, no `SoftwareApplication/WebApplication` on the calculators, no `DefinedTermSet` for the glossary, no Review/AggregateRating (correctly none). Organization schema has `areaServed` US/UK/UAE, `numberOfEmployees` 28, "24 brands" (see section 4). Homepage breadcrumb has a single item with no `item` URL.
- **Heading structure**: one h1 per page, h2 patterns are templated (see service hubs). Headings in the raw baked HTML carry inline line breaks (e.g. "Meta ads managementfor growing brandsin India." after tag stripping, so the visible text has `<br>`/spans). Check that the h1 reads as a phrase for crawlers.
- **Internal linking**: homepage links to all 26 service/hub pages and tools (index.html anchor list), `Our Work.html` 13 times, `Contact.html` 9 times. Service pages have "See where X fits in the wider picture" cross-link blocks (`meta-ads.html` links to performance-marketing and UGC; `google-ads.html` to performance-marketing and SEO; `seo.html` to lead-generation and D2C). Footer links to the hubs. **Gap:** no links from services to `Service Detail.html`; guides link into the calculators and glossary. Filenames in links use `.html`, with spaces in `Our Work.html`.
- **llms.txt** (`$S/llms.txt`): good structure (summary, figures, tools, client book, page list with descriptions, answer rules). Problems: says the team is four (conflicts with schema 28), includes phone/address, lists "Ecommerce Management" and "Quick Commerce" services without pages, and says "There is no written case study on the site" and "does not publish pricing". It is a non-standard mixture (has `LLM-Content:` directive in robots.txt).
- **Tracking:** GTM container `GTM-KC22WQZ7` and a Meta Pixel ID `24125282267174885` are in `index.html`'s head (and other pages via the grep hit list). **No GA4 tag, no Clarity, no Search Console verification meta tag in the repo** (grep for `gtag(`, `clarity.ms`, `google-site-verification` returned nothing; GA4 may be configured inside GTM, unconfirmed). Events: `dataLayer.push({event:"lead_submit", cta_source})` in `assets/mmc-forms.js`; a CTA click event in the same area. No `fbq('track','Lead')` was found in the forms or AuditModal (only PageView). No `generate_lead` GA4 event name, no scroll/tool-usage events for calculators.
- **Forms/conversion:** `assets/mmc-forms.js` posts to `window.MMC_FORM_ENDPOINT`. **P0:** the variable is not set in any live page (only shown as examples in `README.md`/`README-FIXES.md` as `hook.eu2.make.com/YOURID`). Until set, every form (audit modal, contact form, job application, Insights newsletter) falls back to `mailto:` to sales-in@, meaning most leads will silently not be captured and Meta CAPI/CRM cannot receive them. Also the `admin/mmc-data.js` leadWebhook is empty by default. Contact page also offers WhatsApp (`wa.me/919619472727`) and Calendly.
- **Cookie banner** (`CookieBanner.jsx`): React banner storing `mmc-cookies-v1`; default toggles have analytics and marketing = true; it does not gate GTM or Meta Pixel (both load unconditionally in the head), so consent choices are cosmetic. **P1** for DPDP/GDPR (UK/UAE claims make it more exposed). The banner is not in the prerender.
- **/admin/**: disallowed and noindex; `admin/mmc-data.js` is loaded from the public homepage (`<script src="admin/mmc-data.js">`), so the admin data layer ships to all visitors.

## 6. Content assets and cannibalization
Informational assets:
- 6 calculators: `unit-economics-calculator.html`, `growth-trajectory-calculator.html`, `cac-runway-calculator.html`, `funnel-roas-calculator.html`, `breakeven-roas-calculator.html`, `ltv-cac-calculator.html` (plus `tools.html` hub, `resources.html` hub).
- `d2c-marketing-glossary.html` (53 terms; 122 KB).
- 3 guides: `guide-contribution-margin-roas.html` (1,420 words), `guide-attribution-overlap.html`, `guide-creative-testing.html` (1,287) with `guides.html` hub.
- `Insights.html`: placeholder cards only (no articles).
- No blog/article pages; no comparison pages, no city pages, no "vs" pages, no pricing/cost explainers, no education-specific guides, no B2B-specific guides.

Cannibalization risks (same intent/keyword, multiple pages):
1. `performance-marketing.html` vs `meta-ads.html` vs `google-ads.html` vs `amazon-ads.html` vs `quick-commerce-ads.html`: the pillar already carries Meta/Google/Amazon/quick-commerce sections (`performance-marketing.html` h3s), so it competes with the channel pages for "Meta ads agency India" etc. Titles are near-identical patterns.
2. `lead-generation.html` vs `meta-ads.html`/`google-ads.html` (lead gen via the same channels) and `b2b.html`/`education.html`, which both embed the "CRM + Meta CAPI" section from `lead-generation.html`.
3. `Service Detail.html` ("Meta Ads Management for D2C Brands: 8.7x ROAS") vs `meta-ads.html`. Direct duplicate topic (P0 above).
4. `online-reputation-management.html` overlaps with `seo.html` (reviews/profiles) and is a distinct service, but has no query demand evidence.
5. `branding.html` vs `packaging-design.html` vs `ui-ux-design.html`: differentiation by service type is clear, but all three target "Brands in India" wording.
6. `web-development.html` vs `shopify-development.html` vs `conversion-rate-optimisation.html` vs `ui-ux-design.html`: overlapping "website redesign" intent. `web-development.html` says "B2B and Education" while Shopify targets D2C.
7. `social-media-creatives.html` vs `ugc-and-video.html` vs `influencer-marketing.html`: shared creator/creative intent.
8. `d2c.html` / `b2b.html` / `education.html` / `industries.html` / `services.html`: hubs repeat the same template and stats; `industries.html` duplicates the three audience hubs.
9. `tools.html` vs `resources.html` (both hubs of the same calculators and glossary), `index.html` vs `home-classic.html`/`home-v1.html` (robots-blocked but live, in repo; make sure they are not deployed).

## 7. Missing inputs needed from MMC
- GA4 property access and confirmation of what GTM-KC22WQZ7 fires (GA4 config, conversion events, Meta CAPI). Search Console for the apex and www properties, including the old WP site's queries, top pages and backlinks (to build the redirect map and know which old pages rank).
- CRM access/export (leads by source, stage, closed-won) and the definition of a "qualified lead" for D2C, B2B and education. Lead-to-client conversion data and average deal size/retainer.
- Sales decks, case-study material and real client results with permission to publish (only 13 of 22 brands have any service mix; none has results). Confirmation of the fictional "DeoBar" removal.
- Truth on: team size (4 vs 28), offices (Thane only vs Bengaluru/Dubai/London/New York), markets served outside India, whether Mumbai is an office, which services are actually sold (SEO, retention, branding, packaging, ORM, apps, ecommerce management), whether pricing tiers may be published, and whether the Meta Buyer job is real.
- Confirmation of the source of 8.7x, Rs 248Cr+, 27 months, 240+ assets a month (inventory only; not validated here).
- Hosting/DNS decision (www vs apex), the deployment target for the static site (current live is WordPress), and who owns the domain/DNS/Cloudflare.
- Form endpoint (Make/Formspree/CRM webhook) and WhatsApp/Calendly ownership; Google Business Profile status; LinkedIn/Instagram handle confirmation; review-platform profiles for `sameAs`.
- Competitor set and target keywords/markets (Mumbai vs India vs global).

## P0 summary
1. Host mismatch (www in build vs apex live) and no redirect map from old WordPress URLs.
2. Fictional DeoBar case study still in repo (noindex only) plus its SEO title in `seo.json`.
3. `Service Detail.html` and `Job Detail.html` are template pages, indexed and in the sitemap; Service Detail duplicates meta-ads and shows pricing tiers.
4. Homepage canonical `/index.html` vs sitemap `/` and og:url `/`.
5. Forms have no endpoint (`MMC_FORM_ENDPOINT` unset), leads fall back to mailto.
6. Contradictory company facts (4 vs 28 staff, offices and US/UK/UAE service area vs client book of Indian brands, 24 vs 22 brands) in schema, contact and llms.txt.
7. No written real case studies; Insights cards are placeholders with unsupported claims.

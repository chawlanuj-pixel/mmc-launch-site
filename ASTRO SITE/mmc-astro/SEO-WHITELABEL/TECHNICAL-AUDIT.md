# Technical SEO audit: white-label section

Scope: the 28 live URLs under `/white-label/` on https://www.mondaymarketing.company, plus the cross-links between them and the direct service pages. Analysis only; nothing in `src`, `public` or `data` was changed.

## Evidence used (and dates)

| Source | What it is | Date |
|---|---|---|
| `dist/` build | Astro static build, `dist/white-label/index.html` dated 17 Oct 2026. Live sitemap lastmod is 18 Oct 2026 and live titles match the build, so dist = live. | Read 22 Oct 2026 |
| Own crawl of `dist/` | Python and BeautifulSoup over all 138 `index.html` files: titles, descriptions, canonicals, robots, hreflang, H1/H2, JSON-LD types, image alt, links inside `<main>` and outside it | 22 Oct 2026 |
| Live checks with curl | Host and protocol redirects, 404s, headers, live sitemap | 22 Oct 2026 |
| Lighthouse 12 (local CLI, headless Chrome, mobile, one run per URL, from an India connection) | `/white-label/` and `/white-label/seo/` | 21 Oct 2026 20:20 UTC |
| House checks run on `dist/` | `tools/v2-check.mjs` (0 fails), `tools/consistency-check.mjs` (0 hard failures, 1 warning on /locations/) | 22 Oct 2026 |
| Source | `src/pages/[...slug].astro`, `src/layouts/BaseLayout.astro`, `src/components/svc2/Close.astro`, `src/lib/site.ts` (TOOLS_FOR), `src/data/hubs/white-label*.json`, `src/data/svc2/white-label*.json`, `src/data/routes.json`, `public/.htaccess` (as built) | 22 Oct 2026 |
| `SEO-INPUTS/internal_all.csv` | Screaming-Frog-style crawl dated 2 Oct 2026. It has 72 URLs and **no white-label URLs** (the section was built later), so it could not be used for this section. | File date 2 Oct 2026 |

## What could not be verified

- **Core Web Vitals field data (CrUX):** not obtained. The PageSpeed Insights API returned "quota exceeded" on 22 Oct 2026, and the section is too new to expect CrUX data anyway. Only lab data is reported below.
- **Backlinks to any white-label URL:** not obtained (Ahrefs not reachable; Semrush connector not exposed in this session and had no API units earlier in the project).
- **Indexing state and history:** not obtained (no Search Console access). Whether each URL is indexed, its impressions, and whether any old URL has history are unknown.
- **Rendering as Googlebot sees it:** inferred from static HTML (the pages are static Astro output; the navigation is a React island that is server-rendered, so its links are in the HTML). Not tested with the URL Inspection tool.
- **Server logs:** not available, so 404 hits on legacy addresses are unknown.

## Errors (fix first)

| # | Finding | Evidence | Fix (specification) |
|---|---|---|---|
| E1 | **Structured data says the white-label service is for India only.** Every white-label `Service` node has `areaServed: {"@type":"Country","name":"India"}` while the visible copy targets agencies in the UK, US, Australia and the Middle East (for example the /white-label/india/ subhead). Markup that contradicts the page weakens trust in it. | JSON-LD in `dist/white-label/*/index.html` | In each `src/data/hubs/white-label*.json` `jsonld` Service node, set `areaServed` to the list of countries the owner confirms (for example United States, United Kingdom, Canada, Australia, United Arab Emirates, Singapore, India) and add `"audience": {"@type":"BusinessAudience","audienceType":"Marketing agencies"}`. Keep it matching the visible text. |
| E2 | **Cannibalisation: hub and /white-label/digital-marketing/ target the same query with near-identical titles.** "White-Label Digital Marketing Services for Agencies \| MMC" vs "White-Label Digital Marketing Services \| MMC". | Crawl | Consolidate into the hub, then 301 (see `REDIRECTS-AND-MIGRATION.csv`, gated on a Search Console check). |
| E3 | **D2C brand calculators and guides are shown to agency buyers.** 19 of 28 white-label pages render "Tools and guides behind the numbers." with unit economics, CAC runway, break-even ROAS and D2C guides; all 28 end with the H2 "A 30-minute look at where your margin is leaking." (a brand audit offer). Cause: `toolsKey` is the last URL segment, so `/white-label/seo/` inherits `TOOLS_FOR["seo"]`. | Crawl of links in `<main>`; `[...slug].astro` line 63; `Close.astro` line 14 | Give white-label pages their own key (for example `toolsKey = "white-label"` when `seg[0] === "white-label"`) with no D2C tools, and show white-label guides and the pricing page instead. Replace the pre-footer heading on white-label pages with an agency close ("Register your agency" or "Book a strategy call"). |

## Warnings

| # | Finding | Evidence | Recommendation |
|---|---|---|---|
| W1 | **The hub does not link most of its children in body copy.** In `<main>` the hub links only 6 of 27 children (seo, india, outsourcing, pricing-models, reporting, reseller-programme). The rest are reachable only through the mega menu and footer. No page is orphaned (the server-rendered menu links every child on all 128 pages that carry it), but the pillar does not pass topical context. | Crawl (links inside `<main>` vs whole page) | Add a grouped services grid to the hub (Table C, "parent to child" rows). |
| W2 | **No direct service page links to its white-label twin in body copy.** For example `/services/seo/` has 31 menu links and 6 footer links to white-label pages, and none in `<main>`. Agencies who land on a direct page get no route. | Crawl | One line per direct page (Table C, "direct twin" rows). |
| W3 | **Geo signals say India.** `<html lang="en-IN">`, `og:locale en_IN`, and self-referencing `hreflang="en-IN"` plus `x-default` on every page including the white-label section. With no alternate URLs, hreflang does nothing useful; `en-IN` is a mild mismatch for pages aimed at agencies abroad. | `BaseLayout.astro` lines 87 to 103 | Low effort: drop the hreflang pair sitewide (there are no alternates) or switch it to `en` + `x-default`; set `lang="en"` and `og:locale="en_GB"` on white-label pages. Hreflang is not needed until a real alternate exists. |
| W4 | **Sitemap lastmod is the build date for nearly every URL** (118 of 122 live entries show 18 Oct 2026). Google ignores lastmod that is not reliable. | Live `sitemap-0.xml` | Use each page's `updated` field (white-label JSON has one) in the sitemap `serialize` step, as guides already do. |
| W5 | **Every white-label page shows the same H2 twice** ("Add SEO without adding headcount." in the CTA band and again in the pre-footer). | Crawl of H2 lists | Keep one; give the other a different, more specific heading. |
| W6 | **"See the work" links to `/work/`, which holds D2C brand case studies; the white-label proof block is empty on all pages** (`proof.tiles: []`). | svc2 JSON; crawl | Do not invent proof. Publish real process artefacts (anonymised sample report, audit page, SOP excerpt) with the illustrative note; until then, point the hero link at the process section rather than `/work/`. |
| W7 | **Thin, non-answering FAQ answers** on commercial questions, for example "Can you invoice in my currency?" "We agree invoicing terms on a call." and "Do you publish prices?" "No." | `white-label__india.json`, `white-label__pricing-models.json` | Replace with concrete facts once the owner supplies them; edit `hub.faq[]` and the `jsonld` FAQPage together. |
| W8 | **Register page title says "India"**: "White-Label Agency Partner Registration India \| MMC". Overseas agencies read that as India-only. | Crawl | Retitle (Table B). |
| W9 | **Two-hop redirect** from `http://mondaymarketing.company/path` (no slash): http bare to https bare, then to https www with slash. Other variants take one hop. | curl, 22 Oct 2026 | Optional: let the `.htaccess` rule handle protocol and host in one hop if Hostinger's force-HTTPS can be turned off. |
| W10 | **`/white-label/seo/index.html` returns 200** (duplicate address). The canonical points to the clean URL, so risk is low. | curl | Optional 301 rule for `*/index.html`. |
| W11 | **Legacy `.html` addresses for white-label pages return 404.** `src/data/routes.json` lists 27 (for example `white-label-seo.html`), but neither `.htaccess` nor `_redirects` covers them. They were probably never public. | curl `/white-label.html`, `/white-label-seo.html` | Add 301s only if Search Console or logs show hits (redirect sheet). |
| W12 | **About one quarter of each page's text is shared template copy** (6-word shingle overlap with other white-label pages ranges 17 to 33 percent; highest pair Jaccard 0.14). Not duplication in the penalty sense, but the identical "It suits digital agencies, web studios, consultancies, freelancers and in-house marketing teams." on every page dilutes ICP targeting. | Shingle comparison of `<main>` text | Write a page-specific "who it suits" for each service. |

## Opportunities

| # | Opportunity | Note |
|---|---|---|
| O1 | Add `hasOfferCatalog` (or an `ItemList`) on the hub listing the child services, plus `audience` on every Service. | Must match visible content. Structured data helps machines read the page; it does not guarantee rich results or AI citations. FAQ rich results are limited by Google to a small set of sites. |
| O2 | Give white-label guides `Article` markup with `dateModified` that changes only when content changes. | Existing guide template already supports it. |
| O3 | Keep `llms.txt` listing the white-label pages (it does today) and add one-line service definitions and the engagement steps. | Experimental, low cost, no guarantee. |
| O4 | Add a visible "Last updated" date on white-label pages (the JSON has `updated`). | Freshness signal for users and answer engines. |
| O5 | Fix W3 by using a page-level `lang`/locale prop rather than a sitewide constant, so later regional pages are possible without a rebuild of the layout. | |

## Checks that passed

| Area | Result |
|---|---|
| Status codes | All 28 white-label URLs return 200 live; nonexistent paths return 404 (custom error handling not checked). |
| Indexability | No `noindex` on any white-label page; robots.txt allows search and AI crawlers (owner's 2 Oct 2026 policy); `/admin/` and `/forms/` disallowed. |
| Canonicals | Self-referencing, absolute, `https://www.` host, trailing slash, on all 28. |
| Host | Bare host 301s to `www` in one hop; canonicals, sitemap and `.htaccess` all use `www`. Note: an older owner decision recorded "non-www" for the Astro V2 snapshot. The live site is `www`; changing it now would be a migration with no gain. Owner to confirm. |
| Sitemap | Live `/sitemap-index.xml` lists all 28 white-label URLs; `/sitemap_index.xml` 301s to it. |
| Titles | All 28 are 60 characters or fewer (36 to 57). |
| Meta descriptions | All 28 are 140 to 160 characters (141 to 160). |
| H1 | Exactly one per page. Most are brand sentences that start with the service name ("White-label SEO that your clients credit to you."); the hub H1 lacks the head term. |
| Breadcrumbs | Visible (svc2 AnswerSpread) and in `BreadcrumbList` JSON-LD. |
| Images | No `<img>` without an `alt` attribute on white-label pages. |
| JSON-LD | Parses on all pages; types WebPage, Service, BreadcrumbList, FAQPage. House checks pass. |
| Lab performance (mobile, one run each) | `/white-label/`: performance 0.99, accessibility 1, SEO 1, LCP 2.1 s, CLS 0.007, TBT 0 ms. `/white-label/seo/`: 0.99, 1, 1, LCP 2.3 s, CLS 0.005, TBT 0 ms. Earlier lab runs in `V2-SPEED.md` and `V2-LIGHTHOUSE.md` were worse (local server, before optimisation). Field data unverified. |
| Pagination | None in the section. |
| JS rendering | Content is static HTML; FAQ and answer blocks are in the HTML source. |

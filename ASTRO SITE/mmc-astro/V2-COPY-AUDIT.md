# V2 copy and content audit (internal)

Scope: all 125 built pages (visible text, titles, descriptions, headings, link text, buttons, alt, JSON-LD), built from the working tree on 12 October 2026. Tool: `tools/consistency-check.mjs`. Rules and house style: COPY-CONSISTENCY.md. Result after fixes: 0 hard failures, 283 warnings, 1,059 findings allowlisted with reasons (tools/consistency-allowlist.json).

## Findings and decisions

| # | Category | Found (before) | Decision | Fixed |
| --- | --- | --- | --- | --- |
| 1 | Brand names | MMC, Monday Marketing Company, AI by MMC used consistently. "Monday Marketing" (no Company) only as the suffix of the three private pricing page titles. | Left the pricing titles (owner-approved pricing page logic). Checker warns elsewhere. | 0 |
| 2 | Audience naming | Two sanctioned forms in use: "D2C brands, B2B companies and educational institutes" (about 35 sentences) and "D2C, B2B and education" (titles, labels). Strays: "education institutions" (branding hub), "an education institution" (CtaBand on 5 pages). No edtech, no D2C-only. | Keep both forms, each in its own place (see COPY-CONSISTENCY.md). Unify strays to "educational institutes". | 2 |
| 3 | White label vs white-label | 1,343 occurrences of "white label" in src, 35 hyphenated. 27 page titles were "White Label X". | Hyphenate the compound adjective before a noun (white-label SEO, partner, services, agency, titles "White-Label ..."). Noun phrase stays open ("white label is how we work", nav label "White label", "white label from India"). | 1,288 source edits across 77 files (29 titles, 26 FAQ headings, 1 h1). Left: RegisterApp.jsx and register-payload.mjs (payload labels, covered by register-payload-check) and svc2 components. |
| 4 | CTA labels | Booking CTA is "Book a strategy call" (745 uses) with one Title Case "Book a Strategy Call" in the contact title (Title Case title family, left). Header pill "Book a call" nav-owned. Variants: "Talk to us" as a related-link card to /contact/ (4 data files), "Request a call" (colleges: a button inside an illustrative form, left), "Get started" only inside FAQ questions. Descriptive links ("See how it works", "Back to careers") are not CTAs. | Related card renamed "Contact MMC" / "See contact options". Other labels are inside illustrations or questions. | 6 |
| 5 | Heading case | Sentence case throughout. Drift: "Ready to try AI Landing Page Builder?" Glossary term headings (acronym expansions) are proper names. About eyebrow is the company name. | Fixed the h2; allowlisted the rest. | 1 |
| 6 | Spelling | Already British: optimisation 343, organisation, colour, centre, programme, catalogue, licence. American hits: "Merchant Center" (Google product name, allowlisted). | No edits needed. | 0 |
| 7 | Numbers, currency, dates | Rupee symbol used on all public pages and calculators (not Rs. as the brief assumed). "Rs." only on the two India private pricing pages and the registration form option lists. US$ only on international pricing pages. Dates all "9 October 2026". Time zone: IST named once on contact and once in the register form. Hours written "10:00 to 19:00" except register options ("9 am to 12 pm"). En dashes in numeric ranges: growth-trajectory (3), cac-runway (1), contact hours (3), about response line (1). | Public convention is the rupee symbol with Indian grouping. Ranges rewritten with "to". | 10 (8 ranges in tools and hours, 2 about and contact line items) |
| 8 | NAP | Phone, address, sales-in@, hr@ consistent everywhere. anuj@ shown on contact and thank-you only as the form-failure fallback. Contact photo caption said "Hiranandani, Thane". Pricing pages write "WeWork Zenia"; contact writes "WeWork, Zenia Building". | Caption now "Hiranandani Business Park, Thane". Both WeWork forms accepted. anuj@ fallback allowlisted. | 1 |
| 9 | Banned patterns | Em dash 0. En dash: 15 distinct (12 are form option values, see owner list). "mockup": packaging page (data 2, component label 1), AI landing page builder alt text 2. Client or brand counts: 0 real. "leading": 1 (fashion hub). Exclamation in headings 0. | Rewrote: "shelf render", "ad layout", "cover design", "a main source of returns". Component label left (svc2 component). | 9 |
| 10 | Link text | No "click here" or bare "read more". | None needed. | 0 |
| 11 | Title and description length | 0 failures (all indexable pages: title <= 60, description 140 to 160). | White-label hyphenation is length-neutral. Re-checked after edits. | 0 |
| 12 | FAQ voice | 6 pages opened more than 40 percent of answers with "Yes" (tools, guides, resources, Indore, white-label reporting, WordPress). FAQ answers are mostly 8 to 35 words, not 40 to 60. | Reworded one or two answers per page. Answer length left (a rewrite). | 7 answers |
| 13 | Alt text | 253 distinct empty alts, almost all card thumbnails beside a heading (acceptable per the Img component note). /audit/ hero image had none. No "image of". | Added descriptive alt to the audit hero. | 1 |
| 14 | White-label and service claims | White-label pages promise no SLA, price, turnaround or results; the word "guarantee" appears only in answers that refuse to guarantee. Service pages: "guaranteed" only in "Not a fit" lists. | None needed. | 0 |
| 15 | Illustrative notes | Standard held on 41 of 44 svc2 notes. Drift: owner "Meta" vs "Meta Platforms" for WhatsApp, "their owners" with a singular "its logo" (ORM), "and ... and", "Shopify" vs "Shopify Inc.", three notes ending "placeholder shapes only" or "No prices". | All unified to the README standard. | 10 |
| 16 | Internal links | No .html, all trailing slash, no absolute self-links in anchors. | None needed. | 0 |
| + | Product names | "Meta ads" and "Google ads" mixed with "Meta Ads" and "Google Ads". | Capitalised as product names. | 58 |

## For the owner (legal or commercial meaning, not changed)

1. Audit modal and contact form option values ("₹10L – ₹1Cr", "0–10L", "In 1–3 months") contain en dashes and are stored in the CRM as written. Changing them to "to" changes stored lead values. Allowlisted.
2. Registration form option lists use "Rs.25 lakh to Rs.1 crore" and "9 am to 12 pm" while the site uses the rupee symbol and 24-hour times. They are payload strings (register-payload.mjs). Warned, not changed.
3. About page "Avg. response · 4 hours" and contact "We reply inside one working day, often in four" are response promises. Pending your decision (noted in src/lib/site.ts).
4. Private pricing page titles end "| Monday Marketing" while one reads "| Monday Marketing Company". Rate card wording, untouched.
5. WhatsApp ownership line now reads "Meta Platforms" everywhere; confirm you are happy naming the legal entity.

## Left for the design agent

- src/components/svc2/panels/PackagingMock.astro: aria label says "shelf mockup". Change to "shelf render", then delete the allowlist entry.
- src/components/svc2/panels/EngagementModels.astro: label "ways to buy white label delivery" should read "white-label delivery".
- Hub platform-showcase note ("Screens are illustrative recreations ...") is a second standard beside the svc2 note. Different component, left.

## Remaining warnings (283)

alt-empty 253 (decorative or captioned thumbnails), answer-lead-words 29 pages (the "In short" lead is 15 to 34 words, target 40 to 60; needs rewriting, not consistency), cta-label 16 descriptive links, currency-format 1 (register form Rs.). 


## In short leads, 2026-10-12

Every hub `answer.lead` under 40 words was rewritten to 45 to 59 words (answer-first, audience, what MMC does, how it is judged; facts reused from each page). Pages with leads in the page file (contact, services, tools, D2C, performance marketing) were edited in their .astro source. The `answer-lead-words` warning is cleared (283 to 269 warnings). Highlight (hl) strings are unchanged. Several pages share one lead, so 28 sources cover the 29 pages.

| Page path | Before (words) | After (words) |
|---|---|---|
| /services/branding/ | 33 | 56 |
| /services/cro/ | 26 | 59 |
| /services/influencer-marketing/ | 22 | 50 |
| /services/lead-generation/ | 26 | 57 |
| /services/mobile-app-development/ | 27 | 58 |
| /services/online-reputation-management/ | 28 | 56 |
| /services/packaging-design/ | 30 | 53 |
| /services/performance-marketing/amazon-ads/ | 28 | 58 |
| /services/performance-marketing/google-ads/ | 28 | 56 |
| /services/performance-marketing/meta-ads/ | 27 | 57 |
| /services/performance-marketing/quick-commerce/ | 28 | 53 |
| /services/retention-marketing/ | 25 | 52 |
| /services/seo/ | 26 | 54 |
| /services/shopify-development/ | 27 | 57 |
| /services/social-media/ | 28 | 54 |
| /services/ugc-and-video/ | 25 | 53 |
| /services/ui-ux-design/ | 32 | 57 |
| /services/web-development/ | 29 | 52 |
| /guides/ | 26 | 59 |
| /industries/ | 21 | 55 |
| /industries/b2b/ | 29 | 57 |
| /industries/education/ | 31 | 56 |
| /resources/ | 25 | 57 |
| /contact/ | 25 | 56 |
| /services/ | 30 | 56 |
| /tools/ | 29 | 55 |
| /industries/d2c/ | 15 | 52 |
| /services/performance-marketing/ | 16 | 55 |

## Warnings pass, 2026-10-13

Baseline: 0 hard failures, 259 warnings (241 `alt-empty`, 18 `cta-label`), 1,045 findings allowlisted. All other warning rules (heading-case, eyebrow-case, white-label-misuse, american-spelling, currency, date, brand and audience naming) already read 0 after the existing allowlist; I re-ran with `--no-allowlist` and confirmed the allowlisted remainder is legitimate (brand and product alt names, INR in JSON-LD, US$ on private pricing pages, glossary term headings, "guarantee" used to refuse a promise).

| Rule | Before | After | What changed |
| --- | --- | --- | --- |
| alt-empty | 241 | 0 | 213 were thumbnails, covers and logos with a caption or name in the same card. The rule is now documented in COPY-CONSISTENCY.md ("Empty alt") and enforced structurally in tools/consistency-check.mjs, so a bare image with no text near it is still flagged. The remaining 28 (audit "what we look at", guide covers, resources tool cards, client logos in svc2 and work cards) are card images with a heading or aria-labelled button beside them and now pass the same rule. No content image was found without a caption. |
| cta-label | 18 | 0 | Fixed: "See the projects behind them" to "See the work" (home), "Start registration" to "Register your agency", "All open roles" to "See open roles" (career pages). In-page jump links (#anchor) and "Back to ..." are wayfinding and exempt in the checker. Allowlisted with reasons: "See all AI by MMC", named calculator cards, glossary links, two white label hub links on the register page. |

Allowlist housekeeping: removed three stale entries that matched nothing (client-count "3 D2C brands", mockup "shelf mockup", eyebrow-case company name). Nothing changed in legal or commercial wording, pricing, FAQ or JSON-LD. Titles and descriptions untouched.

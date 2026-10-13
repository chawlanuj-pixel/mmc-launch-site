# Copy and content rules (enforced by tools/consistency-check.mjs)

DESIGN-CONSISTENCY.md did not exist when this was written, so these rules live here. If the design agent creates it, paste this file in as its "Copy and content rules" section.

Run: `npm run check:build` (builds to `dist-check`, then v2-check, consistency-check, pricing-leak-check, register-payload-check) or `node tools/consistency-check.mjs <dist-dir> [--verbose] [--json]` on any build. Exit 1 means a hard failure. Warnings never fail the run.

## Hard rules (fail)

| Rule id | What it enforces |
| --- | --- |
| em-dash, en-dash | No em dash or en dash in visible text, titles, descriptions, alt, aria or JSON-LD. Write ranges with "to" (4 to 8%, 10:00 to 19:00). |
| mockup | The word "mockup" is not used. The authenticity line is `ARTWORK_LINE` in src/lib/site.ts. |
| client-count | No count of clients, brands or case studies ("9 brands", "twenty-five clients"). Say "a few of the brands". |
| banned-filler | best-in-class, cutting-edge, world-class, state-of-the-art, unlock, supercharge, game-changing, synergy, leading, revolutionary, next-level, seamless. |
| american-spelling | British spelling. List is `AMERICAN` in the script: optimize, organization, color, center, program, catalog, analyze, behavior and similar. Use optimise, organisation, colour, centre, programme, catalogue, analyse, behaviour. |
| click-here, link-text | No "click here". No link whose whole text is "read more", "learn more", "here", "more". |
| heading-exclamation | No exclamation mark in a heading. |
| title-length, description-length | Indexable pages: title at most 60 characters, description 140 to 160. |
| link-html, link-no-trailing-slash, self-link-absolute | Internal links end in a slash, never .html, never an absolute https://www.mondaymarketing.company URL. |
| alt-missing, alt-quality | Every img has an alt attribute. No "image of", "picture of", "photo of" alt text. |
| phone-mismatch, phone-format | Only +91 766 630 9102 (tel:+917666309102, wa.me/917666309102). |
| email-anuj-public | anuj@ is never shown or linked publicly (form-failure fallbacks are allowlisted). Public mail is sales-in@; careers is hr@. |
| address-variant | WeWork Zenia, Hiranandani Business Park, Thane 400607. No half addresses. |
| white-label-form | "whitelabel" is never used. |
| faq-yes-openings | No FAQ opens with "Yes" on more than 40 percent of its answers. |

## Warnings (review, may be legitimate)

cta-label and cta-variant (buttons and links with class btn or data-book: approved set is Book a strategy call, Get my free audit, Send a brief, See the work, Run the numbers, Register your agency, Read the guide, Open the calculator, plus the SECONDARY labels; variants such as Get in touch, Contact us, Let's talk, Talk to us, Get started are flagged), heading-case and eyebrow-case (Title Case or ALL CAPS in markup; CSS may uppercase), audience-naming (edtech, education institutions, D2C-only), brand-naming (Monday Marketing without Company), currency-format (Rs. outside the private pricing pages, INR, US$), date-format (use 9 October 2026), alt-empty (empty alt is fine only when a heading or caption beside the image carries the meaning), white-label-misuse (see below), white-label-promise (SLA, guarantee, turnaround on white-label pages), service-claims, illustrative-note (standard: "Illustrative layout of <view>. Not a client account, no real figures. <Platform> and its logo belong to <owner>."), answer-lead-words (the "In short" lead should be 40 to 60 words), email-unknown.

## House style decisions

- Names: Monday Marketing Company (first mention, schema, legal), MMC (after that), AI by MMC (the AI products).
- Audience triplet: "D2C brands, B2B companies and educational institutes" in sentences; "D2C, B2B and education" in titles and short labels; never D2C only.
- White label: noun phrase stays open ("white label is how we work", "work white label", the nav label "White label"). Compound adjective before a noun is hyphenated ("white-label SEO", "white-label partner", "White-Label SEO Services for Agencies | MMC" in Title Case titles). URLs already use white-label.
- Product names: Meta Ads, Google Ads, Amazon Ads (capital A). WhatsApp belongs to Meta Platforms; Shopify to Shopify Inc.
- Currency: the rupee symbol with Indian grouping (₹1,00,000, ₹2L, ₹1Cr) on public pages and calculators. "Rs." only appears on the private pricing pages and in the registration form option lists. US$ only on the international pricing pages.
- Dates: 9 October 2026. Times: 10:00 to 19:00 IST.
- CTAs: the booking label is `BOOK` in src/lib/site.ts. The header pill "Book a call" is nav-owned.

## Allowlist

tools/consistency-allowlist.json holds the legitimate exceptions. Each entry needs a reason; the script exits 2 if one is missing. Add an entry only when the text is right and the rule is wrong for it. The script prints allowlist entries that no longer match anything so they can be deleted.

## Empty alt

`alt=""` is correct only for (a) purely decorative images (marked aria-hidden, role="presentation" or role="none") and (b) thumbnails, covers and logos whose caption, heading or name sits directly beside them in the same card. Every other image gets a short, concrete alt that says what the picture shows, never "image of".

The checker applies rule (b) structurally: an empty-alt image passes when one of its three nearest ancestors holds 3 to 500 characters of text, or is a link or button with an aria-label. A bare image with no text around it is flagged as `alt-empty` and needs a real alt.

## Wayfinding links

`cta-label` is for conversion links. In-page jump links (href starting with `#`) and "Back to ..." links are wayfinding and are not checked. A descriptive link to a different destination (a named calculator, the glossary, the AI by MMC hub, the white label hub) stays descriptive and is allowlisted with a reason, not forced into the approved set.

## Known and accepted warnings

After the 2026-10-13 warnings pass the build reports 0 warnings, because every remaining finding is in `tools/consistency-allowlist.json` with a reason. Run `node tools/consistency-check.mjs <dir> --no-allowlist` to see them: alt text that is a brand or product name (MMC, Veo, n8n, GA4, JSW); INR in careers JSON-LD and US$ on the private international pricing pages; the glossary headings (term plus acronym); "guaranteed" and "guarantee" used to refuse a promise on service and white label pages; five descriptive navigation labels (see allowlist). The en-dash and anuj@ hard-rule exceptions are CRM form option values and the form-failure fallback.

# Copy for the developer: agency closing section and "Are you an agency?" line

Written 22 Oct 2026 for the white-label pages. Wording only; wire it however suits the components. British spelling, no em dashes, CTA labels from the approved set in COPY-CONSISTENCY.md.

## 1. Agency pre-footer (replaces the D2C closing on all /white-label/ pages)

Use on every page under /white-label/ (and /white-label/register/ if it shows a pre-footer).

| Slot | Text |
|---|---|
| Eyebrow | For agencies |
| Headline, line 1 (h2a) | Bring us your next client. |
| Headline, line 2 (h2b, serif) | We deliver it under your name. |
| Line (lede, follows the "On a call, with a senior strategist. We ..." rule, 123 characters) | On a call, with a senior strategist. We scope your first client, agree overlap hours and show how we work behind your brand. |
| Primary button | Book a strategy call (BOOK from src/lib/site.ts) |
| Secondary link | Register your agency, to /white-label/register/ |

Note: the current secondary link on white-label pages falls back to "How the audit works" (/audit/, the D2C audit). The agency version should use "Register your agency".

## 2. Agency version of the booking modal (replaces "A 30-minute look at where your margin is leaking.")

The D2C line lives in src/components/shell/AuditModal.tsx. When the modal opens from a white-label page, use:

| Slot | Text |
|---|---|
| Eyebrow | 30-minute agency call |
| Headline (serif word in brackets) | A 30-minute call to scope your first [white-label] client. |
| Sub | A senior strategist reviews what your clients ask for, what we would deliver behind your brand, and how hours, the NDA and invoicing work. We never pitch to your clients. |
| List item 01, bold | Scope check |
| List item 01, text | Which services your clients need, and what a written scope for the first one would cover. |
| List item 02, bold | Working terms |
| List item 02, text | The NDA, overlap hours for your time zone, invoicing in Indian rupees or US dollars and the three-month minimum. |
| List item 03, bold | Pilot plan |
| List item 03, text | How a first client would run behind you, with reporting in your format. |
| Button | Book a strategy call |

## 3. "Are you an agency?" line on the 21 direct pages

Pattern, one line in the "Not a fit" or closing section of each direct page:

> Are you an agency? We deliver this under your brand: [link text].

Link text per page (sentence case, keyword-matched, from Table C):

| Direct page | Links to | Link text |
|---|---|---|
| /services/seo/ | /white-label/seo/ | White-label SEO for agencies |
| /services/performance-marketing/google-ads/ | /white-label/ppc/ | White-label PPC and Google Ads for agencies |
| /services/performance-marketing/meta-ads/ | /white-label/meta-ads/ | White-label Facebook and Meta Ads for agencies |
| /services/web-development/ | /white-label/web-development/ | White-label web development for agencies |
| /services/web-development/wordpress/ | /white-label/wordpress-development/ | White-label WordPress development for agencies |
| /services/website-maintenance/ | /white-label/website-maintenance/ | White-label website maintenance for agencies |
| /services/shopify-development/ | /white-label/shopify-development/ | White-label Shopify development for agencies |
| /services/social-media/ | /white-label/social-media-management/ | White-label social media management for agencies |
| /services/content-marketing/ | /white-label/content-marketing/ | White-label content marketing for agencies |
| /services/ugc-and-video/ | /white-label/creative-and-video/ | White-label design, video and UGC for agencies |
| /services/retention-marketing/ | /white-label/email-marketing/ | White-label email marketing for agencies |
| /services/cro/ | /white-label/cro/ | White-label CRO for agencies |
| /services/lead-generation/ | /white-label/lead-generation/ | White-label lead generation for agencies |
| /services/performance-marketing/amazon-ads/ | /white-label/ecommerce/ | White-label ecommerce and Amazon for agencies |
| /services/online-reputation-management/ | /white-label/orm/ | White-label reputation management for agencies |
| /services/seo/geo/ | /white-label/geo-aeo/ | White-label GEO and AEO for agencies |
| /services/mobile-app-development/ | /white-label/app-development/ | White-label app development for agencies |
| /services/ui-ux-design/ | /white-label/web-design/ | White-label web design for agencies |
| /ai-by-mmc/ | /white-label/ai-services/ | White-label AI services for agencies |
| /about/ | /white-label/ | White-label services for agencies |
| /services/ | /white-label/ | White-label services for agencies |

On /about/ and /services/ the sentence reads better as: "Are you an agency? We deliver every service here under your brand: White-label services for agencies."

## 4. Fields and components the copy needs (not done, needs code)

- The svc2 answer spread (src/components/svc2/AnswerSpread.astro) renders article block headings and paragraphs but not `block.table`. The new comparison tables (reselling vs referral vs white-label delivery; overlap hours by region; who does what on the pillar) are in the hub JSON as `table` and also written out as paragraphs. Rendering `blk.table` would show them as tables.
- The new sections sit inside the collapsed "Read the full guide" details. If the owner wants the reseller comparison, overlap hours and SEO provider checklist visible without a click, they need a visible slot.
- Proof tile: the owner can supply an anonymised sample audit. It is pending; the proof section stays empty until the file exists.
- The hero secondary link on white-label pages goes to /work/ ("See the work"), which is D2C work. Consider "Register your agency" instead.

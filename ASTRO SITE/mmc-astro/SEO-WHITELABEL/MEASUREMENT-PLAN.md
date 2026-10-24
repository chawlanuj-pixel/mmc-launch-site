# Measurement plan: organic white-label pipeline

Success metric (from the brief): organic-sourced, ICP-qualified white-label agency partnership opportunities and closed-won partnerships, not traffic.

## 1. What already exists (checked in the repo, 22 Oct 2026)

| System | What it captures today | Gap for this plan |
|---|---|---|
| Google Tag Manager `GTM-KC22WQZ7` (`src/layouts/tracking.html`) | `dataLayer` events `lead_submit` with `cta_source`, and CTA click events (`public/assets/mmc-forms.js`) | Whether GA4 receives them as key events, and whether `page_location` of the white-label page is attached, is unverified (no GA4 access). |
| Register form (`/white-label/register/`, `src/lib/register-payload.mjs`) | Page URL, referrer, UTM parameters, browser time zone, agency details, expected monthly outsourced budget; two emails per registration | Referrer is captured, so organic Google visits can be recognised (referrer google.*, no UTM). |
| MMC CRM (`MMC CRM/`, tables `leads`, `sources`, `activities`, `tags`) | `service`, `service_path`, `market`, UTM fields, `gclid`, `landing_page`, `referrer` per enquiry; statuses New, Contacted, Qualified, Proposal, Won, Lost; status-change history; lead score and tier | No field for lead type (agency vs brand), ICP fit, meeting held, or deal value. |
| Search Console, GA4 data | Not accessible from here | Owner exports below. |

## 2. KPI tree (separates volume from qualified demand)

| Level | Metric | Definition | Source |
|---|---|---|---|
| Visibility | Impressions, non-branded | GSC impressions on pages starting `/white-label/`, queries NOT matching `monday|mmc|mondaymarketing` | GSC |
| Visibility | Average position for the shortlist | Position for the 15 primary keywords in `TABLE-A-shortlist.csv`, by country | GSC (Query + Country) |
| Demand capture | Clicks, non-branded | As above | GSC |
| Engagement | Landing-page conversion rate | White-label enquiries (all forms + register) divided by organic sessions landing on `/white-label/*` | GA4 |
| Volume | White-label enquiries | CRM leads with `service_path` starting `/white-label/` or created from the register form | CRM |
| Volume | Organic white-label enquiries | Above, where first-touch is organic (rule in section 4) | CRM |
| Quality | ICP-qualified agency leads | Organic white-label enquiries tagged `agency` and `icp-fit` (rules in section 3) | CRM |
| Pipeline | Meetings held | Tag `meeting-held` (or status Contacted with a logged call) | CRM |
| Pipeline | Proposals requested | Status reached Proposal | CRM status history |
| Pipeline | Opportunities | Status reached Qualified | CRM |
| Outcome | Closed-won partnerships | Status Won | CRM |
| Outcome | Organic-sourced pipeline value | Sum of expected monthly value x 12 for open Qualified and Proposal leads; actual for Won | CRM (new field) |

## 3. CRM changes to specify (for the CRM owner; not implemented here)

1. Tag `agency` vs `brand` on every lead (the register form is agency by definition; contact forms on white-label pages need a manual check at first contact).
2. Tag `icp-fit` when all are true: an agency, studio or consultancy; sells the service it enquires about to its own clients; budget answer above the owner's floor; country within the served list. Otherwise `icp-no` with a reason.
3. Tag `meeting-held` after the first call.
4. Add a numeric `expected_monthly_value` (currency recorded) at Qualified, and `won_monthly_value` at Won.
5. Keep first-touch: the `sources` row of the first enquiry is the attribution record; never overwrite it.

## 4. Attribution rule (so SEO is not credited with everything)

- **Organic first touch** = first enquiry has no UTM and no gclid/fbclid, the referrer is a search engine (google., bing., duckduckgo., yahoo.) and the landing page starts `/white-label/` or `/guides/` (white-label guides).
- **AI assistant referral** = referrer contains chatgpt.com, perplexity.ai, gemini.google.com, copilot.microsoft.com or claude.ai. Report separately; do not merge into organic.
- **Direct or unknown** = no referrer. Report as its own line; ask "How did you hear about us?" on the first call and store the answer as a tag (`heard-google`, `heard-referral`, `heard-linkedin`, `heard-directory`, `heard-ai-assistant`).
- **Assisted** = later enquiries from the same lead with a different source. Count them as assisted, not sourced.
- Report sourced and assisted side by side every month.

## 5. Measuring change without crediting everything to SEO

1. **Baseline first.** Export the 3 months before changes ship (section 6). Record what was live and when (deployment log with dates).
2. **Change log.** Every title, content or link change in the roadmap gets a date and the URLs touched.
3. **Compare like with like.** Use the same 28-day windows, year-over-year when available; adjust for seasonality only once a year of data exists.
4. **Control group.** Pages changed in a wave are compared with white-label pages not yet changed (for example the P3 pages) over the same window. Movement in both is market or algorithm; movement only in changed pages is more likely the change.
5. **Branded vs non-branded.** Growth in branded queries usually comes from sales, PR or directories, not on-page SEO. Report separately.
6. **Lagging outcomes.** Partnerships close weeks after first touch. Judge SEO on impressions and qualified leads at 90 days; judge revenue at 6 to 12 months.
7. **Small numbers.** A handful of agency leads a quarter is expected at these search volumes. Treat month-to-month changes under 5 qualified leads as noise.

## 6. Exports the owner must provide (cannot be reached from here)

### Google Search Console (property: confirm whether it is the Domain property or `https://www.mondaymarketing.company/`)
1. **Performance > Search results**, date range last 16 months (or since launch), filter **Page contains `/white-label/`**, tabs **Queries**, **Pages**, **Countries**, export each. Repeat with search type **Web** only.
2. Same report, filter **Query does not contain** `monday` (regex `^(?!.*(monday|mmc)).*$`), to get non-branded only.
3. Same report filtered to **Page exactly `/white-label/digital-marketing/`** and **`/white-label/`**, Queries tab: needed before the 301.
4. Same, for **`/white-label/web-design/`** and **`/white-label/web-development/`**: needed for the day-90 merge decision.
5. **Indexing > Pages**: export "Not indexed" reasons and the example URLs; specifically **Not found (404)** (to decide the legacy `.html` redirects) and **Alternate page with proper canonical tag** (index.html duplicates).
6. **URL Inspection** for `/white-label/`, `/white-label/seo/`, `/white-label/ppc/`, `/white-label/india/`: indexed status and rendered HTML screenshot.
7. **Links > Top linked pages (external)**: export, to see whether any white-label URL has links.

### GA4
1. Explore: **Landing page** starting `/white-label/`, dimensions Session default channel group, Session source / medium, Country; metrics Sessions, Engaged sessions, Key events (`lead_submit` and any register event); last 90 days.
2. Confirm which events are marked as key events and that `cta_source` is registered as a custom dimension.
3. Referral report filtered to chatgpt.com, perplexity.ai, gemini.google.com, copilot.microsoft.com, claude.ai.

### Ahrefs (or Semrush with API units)
1. Site Explorer > **Backlinks** and **Referring domains** for `mondaymarketing.company/white-label/` (prefix mode).
2. **Organic keywords** for the same prefix, all countries in scope.
3. **Content gap / Keyword gap**: target `mondaymarketing.company` vs 3 to 5 competitors the owner sees in sales (the US SERP sample on 22 Oct 2026 surfaced, for example, wildnettechnologies.com, thatcompany.com, vendasta.com, clicksgeek.com, seahawkmedia.com; these are SERP neighbours, not confirmed sales competitors).
4. **Keywords Explorer** difficulty and volume for the 57 shortlist keywords in US, UK, CA, AU, AE, SG, IN.

### Google Keyword Planner (same account)
Re-run "Discover new keywords" per market for the seeds that returned no white-label data on 12 Oct 2026: white label shopify, white label wordpress, white label website maintenance, white label content marketing, white label email marketing, white label cro, white label facebook ads, white label meta ads, white label geo, white label aeo, marketing agency outsourcing, digital marketing fulfilment, white label local seo (all markets), seo reseller program. A small spend on the account would show exact volumes instead of ranges.

### CRM
Export of all leads since the white-label pages went live (about 18 Oct 2026) with `service_path`, `landing_page`, `referrer`, UTM fields, status history and tags.

## 7. Reporting cadence

- **Monthly (one page):** non-branded impressions and clicks for `/white-label/*` by country; shortlist positions; organic white-label enquiries; ICP-qualified agency leads; meetings held; proposals; won; pipeline value; AI-assistant referrals; changes shipped that month.
- **Day 90 review:** cannibalisation pairs (hub vs digital-marketing after the 301; web design vs web development; SEO vs reseller programme), local SEO page gate, country page gates.
- **Quarterly:** sourced vs assisted partnerships and value; decide whether to continue, expand or stop the white-label SEO effort (the master plan's own gate: deprioritise white label if no agency enquiries arrive after a full review cycle).

# svc2 data contract (redesigned 7-section service page)

A hub page uses this layout when `src/data/svc2/<hub path with / replaced by __>.json` exists (example: `services__performance-marketing__meta-ads.json`). The hub JSON in `src/data/hubs/` is read as before (stages, leaks, tiles, FAQ). This file adds the svc2 copy. Do not edit components to add a page: write data, and if the service needs a new picture, add one panel or visual file (see the end).

Rules for all copy: no em dashes, no invented numbers, results or client or brand counts, links through `href()`, sentences short and plain.

## Top-level keys
`answer`, `work`, `leak`, `proof`, `days`, `fit`, `close` (copy the shape of the Meta file for answer, proof, days, fit and close; they are unchanged). The two keys below choose the visuals.

## work (section 2, "The work, shown")
| field | meaning | limit |
|---|---|---|
| `panel` | panel kind, one of the list below (default `MetaAdsManager`) | exact name |
| `eyebrow`, `h2a`, `h2b` | small label; headline start; italic accent end | h2 about 9 words total |
| `steps[]` | `{ n: "01", t, d }`: title (verb + object, one sentence) and one sentence of why | title 8 words max, d 25 words max |
| `illustrative` | the single note under the panel | "Illustrative layout of <platform view>. Not a client account, no real figures. <Platform> and its logo belong to <owner>." |

The number of `steps` must equal the panel's step count (build fails otherwise). Scrolling to step N sets `data-step="N"` and the panel shows its state N.

### Panel kinds (src/components/svc2/panels/)
| kind | steps | what the steps show |
|---|---|---|
| `MetaAdsManager` | 5 | structure, creative test, audiences, Conversions API, scale on margin |
| `GoogleAdsAccount` | 5 | campaign list, Search keywords and negatives, Shopping feed, Performance Max, budget by margin |
| `SerpAndAnswer` | 5 | plain results, structured result moves up, featured snippet, AI answer with source, citation tracking |
| `ShopifyAdmin` | 5 | catalogue, product page, speed and apps, checkout payments, retention |
| `CrmLoop` | 5 | lead arrives, WhatsApp thread, pipeline, send back via Conversions API, optimise on qualified leads |
| `Heatmap` | 4 | click heatmap, scroll map, A/B test plan, A/B result |
| `FlowBuilder` | 5 | trigger, post-purchase email, branch, WhatsApp reminder, win-back and live flows |
| `ContentCalendar` | 4 | pillars, drafted posts, approvals, learn and repeat |
| `BriefBoard` | 4 | brief, creators, delivery, test the cuts |
| `AgencyDashboard` | 4 | client view, agency view, client sees / agency sees, report delivery |

Panels carry their own fixed labels (neutral, no figures, no real brands). Only the step titles and the caption come from data.

## leak (section 3, "Where it leaks")
| field | meaning |
|---|---|
| `visual` | visual kind (default `MetaFunnel`) |
| `eyebrow`, `hint` | label; one-line tap hint |
| `barLogo`, `barTitle` | mark and title in the figure bar (default Meta mark, "Funnel view"); `barLogo: ""` hides the mark |
| `pinsLabel` | aria label for the pin list |
| `pins[]` | one `{ x, y, label }` per hub stage, in order. `x`, `y` are percent of the visual stage (top-centre of the pin sits there), `label` is 1 to 2 words |
| visual-specific | `MetaFunnel` also reads `stageLabels[]` (five words, left to right) |

`pins.length` must equal the hub's `stages.length`. Pin text (breaks, why, does) comes from the hub stages. `MetaFunnel` expects five pins at `y: 0` (a row above the funnel); other visuals may place pins anywhere on the picture.

### Visual kinds (src/components/svc2/visuals/)
`MetaFunnel` (five-segment funnel with leak lines).

## Photos and marks
Use only files that exist in `public/assets` (panels crop `d2c/*.jpg`, `meta/creative.jpg`, `ugc/*.jpg` through `panels/crops.ts`) and marks in `public/assets/platforms` (see its README). Never invent a logo. No padlock or lock icons.

## Adding a new kind (small, new files only)
1. Panel: create `panels/<Kind>.astro` using `<Frame>` (shared chrome), step layers `.s2-st .s2-st--N`, scoped styles with its own class prefix, and a header comment stating the step count and what each step shows. Register it in `panels/index.ts` (`panels` and `panelSteps`). Helpers: `s2p-at-N`, `s2p-from-N`, `s2p-only-N`, `s2p-hl-N`.
2. Visual: create `visuals/<Kind>.astro` taking `{ X, pins }` and register it in `visuals/index.ts`.
3. Reduced motion must be respected (no animation without a `prefers-reduced-motion` guard); tap targets 44px or more apply to pins and links.

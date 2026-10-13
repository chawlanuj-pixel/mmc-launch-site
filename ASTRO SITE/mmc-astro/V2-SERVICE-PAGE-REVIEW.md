# V2 service page review (between hero and footer)

Scope: /services/performance-marketing/meta-ads/, /services/seo/, /services/shopify-development/, /services/lead-generation/, /services/cro/, /services/seo/aeo/, /industries/d2c/skincare/. Template: `src/pages/[...slug].astro` rendering `src/data/hubs/*.json`. Hero, nav and footer untouched and not criticised.
Method: headless Chrome (port 9223, own tab, closed after each run), 1440x900, 1280x720, 768x1024, 390x844, full scroll, section-by-section JPEGs. Screenshots and metrics live in `/private/tmp/claude-501/-Users-anuj-mmc-Documents-MMC-Aug-Launch-site/29c3738f-6435-49bf-a2b6-757247cbf2af/scratchpad/shots/svc/` (`<page>-<d|l|t|m>-NN.jpg`, contact sheets `sheet-<page>-<d|m>-N.jpg`, `<page>-<vp>-metrics.json`). Page keys: meta, seo, shop, lead, cro, aeo, skin. No project file was edited.

## 0. The numbers

| Page | Height 1440 | Height 390 | Sections | Images on page | Repeated image files |
|---|---|---|---|---|---|
| meta-ads | 15,112 | 22,241 | 18 | 43 | 6 (structure.jpg x4, audience.jpg x4, capi.jpg x4) |
| seo | 16,623 | 22,925 | 17 | 38 | 5 (pages.jpg x5, aeo.jpg x5) |
| shopify | 14,472 | 20,313 | 17 | 40 | 5 (each shop/* x3-4) |
| lead-gen | 16,346 | 22,628 | 19 | 41 | 7 |
| cro | 14,890 | 21,251 | 18 | 35 | 5 |
| seo/aeo | 15,922 | 21,609 | 17 | 34 | 5 (seo/aeo.jpg x6) |
| skincare | 16,470 | 23,226 | 17 | ~38 | 6 (range.jpg, shoot.jpg, unboxing.jpg, retention.jpg each x4) |

- Every page is 16 to 26 screens long, 17 to 19 sections, about 1,200 to 1,700 words, and no horizontal overflow at any width (scrollWidth equals clientWidth everywhere). No broken images.
- The same 5 photos are used 3 to 6 times each: Stages uses them, NumberedGrid uses them again, WhyUs/ProcessAccordion/Cta reuse them. Visitors see the same laptop-on-a-desk about 4 times per page.
- Between hero and footer, one visitor scrolls roughly 13,500 px (desktop) of which Stages alone is 3,497 px (about 25 percent of the page).

## 1. Defects

Severity: P1 fix before launch, P2 should fix, P3 polish.

| # | Sev | Page / viewport | Where | Problem | Evidence | Fix |
|---|---|---|---|---|---|---|
| 1 | P1 | all pages, 390 | `.stk__card` > `.stk__body` (Stages, `svc-blocks.css`) | Card text is clipped on the right. Cards are scaled by the stacking transform (0.94 to 1.0) but `.stk__body` is wider than its card (body 324-349px inside a card 305-325px), so lines like "Meta's systems often find buyers better fro" and "...tighter audiences, and let" lose words behind the card edge. Reads as broken. | probe on /services/seo/: card w 305.6, body w 324.0 (card 1); card w 324.9, body w 349.2 (card 3). See `meta-m-08.jpg` to `meta-m-10.jpg`, `sheet-meta-m-2.jpg` | Make `.stk__body` `min-width:0; width:100%` and drop `transform: scale` on mobile (or keep scale on a wrapper only). Better: remove stacking on phones. |
| 2 | P1 | all, all viewports | Stages `.stk` section, 3,497 px desktop / 4,100-4,700 px mobile | One block eats a quarter of the page. 5 sticky cards, each a photo plus 4 text layers (stage kicker, leak headline, why, what-we-do box, service link). On mobile each card is taller than the viewport, so the stack never "stacks", it just scrolls. | metrics: leaks 3497 / 4123-4677 | Replace with one pinned scene (see section 3.4) or cut to 3 stages. |
| 3 | P1 | all, 390 | `.cookie` (fixed, 132 px) + `.aifab` (52 px) | Cookie card and AI fab permanently cover the bottom 15 to 20 percent of every phone screenshot, and the cookie card also overlays desktop bottom-right. Until accepted, every section looks cropped, the Stages CTA and card text are hidden. | every `*-m-*.jpg`, `*-d-*.jpg` | Collapse to a one-line bar at 390, auto-minimise after first scroll, and keep `aifab` off while cookie is open. |
| 4 | P2 | seo, seo/aeo, 390 and 1440 | `#beyond` `.dcb` (Beyond) | SEO has 10 cards: section is 2,741 px desktop, 3,376 px mobile (about 4 screens of a related-links list). Same on skincare mobile (1,801). Burns the page right after the pitch. | `seo-d-metrics.json` beyond h 2741; `sheet-seo-m-4.jpg` | Cap at 3 cards with photos, move the rest to a LinkStrip row of text chips. |
| 5 | P2 | all, all | `#guide` Article (seo, aeo, skincare), `.gd__toc` | Article sits after Answer, before the first visual. On seo it is 685 px, aeo 1,723 px, skincare 1,277 px of mostly text with a left sticky TOC that has 2 entries on skincare (a TOC for two links). Answer (750-880 px) + Article = 2 to 3 screens of reading before any proof. | `aeo-d-metrics.json` guide 1723 | Fold Answer + Article into one spread; drop the TOC under 4 headings. |
| 6 | P2 | all desktop | `.ans__card` (Answer, 750-884 px) | Huge card with a tiny cropped image inside a sun-in-arch shape; lead sentence is 4 lines at ~34px then 3 small icon chips ("One funnel / Creative on one idea / Real results back") that scroll horizontally on 390 (third chip cut off at edge). Looks like a hero repeating the hero. | `sheet-meta-d-0.jpg`, `sheet-meta-m-0.jpg` | Convert to a split: big literal photo left, definition + 3 facts right. Remove horizontal chip scroller at phone. |
| 7 | P2 | all | NumberedGrid `.hv2h-grid` | 6 identical cards: 3:2 photo, italic number, title, one line. This is the template look. Photos duplicate Stages (cards 01 to 05 equal stage photos 1 to 5). 1,290 to 1,386 px. | `dups`: meta/structure.jpg x4 | Merge with Stages into one "what we do" block (section 3). |
| 8 | P2 | skincare | Stages/NumberedGrid/Why images | An industries page about skincare shows `meta/scale.jpg` and `cro/pdp.jpg` dashboards and generic laptops; no product, no bathroom shelf, no skin. Visually it is the Meta page with a different title. | `sheet-skin-d-1.jpg`, `sheet-skin-d-5.jpg` | New skincare imagery (section 5). |
| 9 | P2 | aeo | Stages/Grid/ProcessAccordion | `seo/aeo.jpg` used 6 times, `seo/pages.jpg` 5 times. A new page that feels like a reskin of SEO. | aeo dups | Distinct scenes; see section 5. |
| 10 | P2 | all, desktop | `.hv2h-acc` ProcessAccordion, Faq `.mmc-faq` | Accordion list occupies about 55 percent width and the right 45 percent of FAQ is empty white; Faq on desktop is a left column with no visual (934 px mostly blank). Process accordion photo is sticky 4:5 but identical to a stage photo. | `sheet-meta-d-4.jpg` (FAQ), skin `sheet-skin-d-5.jpg` | FAQ: two-column with a contact/person card at right; or 2x grid. Process: horizontal timeline. |
| 11 | P2 | all, 390 | Tap targets | `.hv2h-crumb__link` 28-39 x 44 (width under 44), `.stk__svc` 173 to 295 x 34-37 high (desktop), `.pm-textlink` 179-260 x 32, `.btn--link` 143 x 39, Article inline `A` 23 px high. | metrics `small` | Min-height 44 on `.stk__svc`, `.pm-textlink`, `.btn--link`; padding on crumb links. |
| 12 | P3 | all, 1280x720 | `.stk__card` heights | At 720 high the sticky card (about 690 to 736 px) is taller than the viewport minus nav, so bottom (service link) is cut while pinned. | `stk__card:690-736` | Max-height `calc(100svh - 120px)` and compress copy. |
| 13 | P3 | all | `.hv2h-updated` | A 26 px "Last updated" strip floats between Answer and next section as an orphan line. | `sheet-meta-d-0.jpg` right | Move into the Answer card as a small meta line. |
| 14 | P3 | meta, 390 | `#platform` (PlatformShowcase) | Mobile 1,045 px: mock Ads Manager panel is good but the Meta logo chip is lonely and the note is tiny. Section has 3 ways of saying "illustrative". | `meta-m-04.jpg` | Single caption under the panel. |
| 15 | P3 | skincare, 390 | `#free-tools` 1,766 px, `#read-the-method` 1,069 px | Four calculators and three guides are stacked 1-up on phones. 2,800 px of tools and guides before the final CTA. | `skin-m-metrics.json` | Horizontal snap-scroll, 1.2 cards visible. |
| 16 | P3 | all | Contrast | Ink band `.dcn__card` description text (rgba white about 0.6 on #0B1A5E) is near 4.0:1; `.hv2h-why__cap`, "ILLUSTRATIVE" badge 11 px. `.hv2h-card__d` and `.hv2h-note` #5a6 type at 14 to 15px on paper are acceptable but small. | `sheet-meta-d-3.jpg` | Raise ink-card body to 0.82 alpha, 14px+. |
| 17 | P3 | all | Animation end state | `.n-rise` reveals completed at every scroll position I stopped on (no stuck-hidden elements found after scrolling). Risk only if JS fails: content hidden by default. | n/a | Confirm `.n-rise` has a no-JS visible state. |

Also checked: tablet 768 heights are 16,412 to 19,738 px (SEO worst, because Beyond is 3 per row of 10 cards); hero at 768 is 1,288 px tall (hero is fixed, not criticised, but it pushes Answer far off screen). No sticky bar collisions apart from item 3 (StickyBookingBar was not visible in my captures; cookie card hides the bottom of the page where it would sit).

## 2. Design critique (plain terms)

1. It is one template. Every service page is the same 17 bands in the same order: answer card, grid of 6, 5 stacked cards, photo + 6 bullets, dark number band, accordion + photo, yes/no cards, logo tiles, 3 link cards, FAQ, blue band, tools, guides, CTA. The words change, the shape never does. A visitor reading Meta Ads and then SEO feels they have read the same page twice. That is the "not happy" feeling.
2. It says the same thing five times. "What we do" grid (6 jobs), Stages (5 jobs and what breaks), WhyUs (4 reasons), Numbers (4 numbers), Accordion (4 steps) are all lists of 4 to 6 abstract nouns about the same service. Nothing is shown being done.
3. Photos are all the same photo. The generated laptop-on-a-desk with a blurred plant appears in about 80 percent of images; different dashboards on the same desk. They do not prove anything and they do not look like Monday Marketing. 3minds works because each image is a distinct, specific thing (a product, a person, a place); here every image says "someone is on a laptop".
4. Everything is boxed. Rounded white cards on cream, with 22px radii, on 30 of the 40 blocks. No full-bleed image, no big type moment, no overlap, no scale change. 3mindsdigital is big type, edge-to-edge image, few words per screen. This is the opposite.
5. Reading load before reward. Answer + Updated + Article + (Platform) is 2 to 3 screens with one small image, then the grid. The Answer-first idea is right for AEO, but it is delivered as a card of text, not as a picture of the answer.
6. Mobile is a long scroll of tall cards: 20,000 to 23,000 px, the Stages stack is clipped (defect 1), and the cookie bar sits over everything.
7. Sections carry too little distinction between "pitch" and "proof". Logo tiles are 360 px of tiny logos with no project behind them (hover to project is approved for the homepage, not reused here); there are no results, no screens of real work, no people.
8. Industry pages are service pages with a different name. Skincare has no skincare in it visually.

## 3. Redesign proposal: body between hero and footer

Principles: 7 sections instead of 17; each section is one idea with one big literal visual; no more than ~220 words per section; alternating full-bleed image, split, and ink bands; type does the work (huge H2 with the italic serif accent already in the system); every list is shown, not bulleted.

### 3.1 Proposed order

1. **Answer spread** (replaces breadcrumb strip, Answer, Updated, Article). 
2. **The work, shown** (replaces Platform, NumberedGrid, Stages): "What we actually do in an account/site" as one pinned scene.
3. **Where it leaks** (replaces Stages leaks): a single annotated diagram.
4. **Proof** (replaces WhyUs, Numbers, BrandTiles, TestimonialSlider).
5. **How a first 90 days runs** (replaces ProcessAccordion).
6. **Fit and questions** (WhoFor + Faq merged).
7. **Close**: one CtaBand with a real person/team photo, then one tools+guides strip, then PreFooterCta (keep).

Breadcrumb remains as a small line inside Answer (JSON-LD kept, visual 1 line).

### 3.2 Text wireframe (desktop)

```
[HERO - unchanged]
-------------------------------------------------------------
1 ANSWER SPREAD                       (cream, ~700px)
 crumb: Home / Services / Meta Ads   Updated 9 Oct 2026
 +-----------------------------+  IN SHORT
 |  BIG PHOTO 4:5              |  Meta ads management is the work of ...
 |  (real scene: strategist at |  [3 facts, one line each, no icons]
 |   desk, Ads Manager on 2nd  |  Book a strategy call ->
 |   screen, our account view) |
 +-----------------------------+  (Article body = collapsed "Read the full guide" below, only if >300 words)
-------------------------------------------------------------
2 THE WORK, SHOWN                      (ink band, pinned, ~2.5 viewports)
 left: sticky big Ads Manager-style UI (real logo, illustrative note)
 right: 5 steps scroll past; UI changes per step
   01 Account structure   -> UI shows 3 campaigns merged into 1 funnel
   02 Creative testing    -> UI shows 4 ad thumbnails, 1 winner
   03 Audience            -> ...
   04 CAPI                -> event stream diagram with a "match" tick
   05 Scale on margin     -> contribution margin line, not ROAS
-------------------------------------------------------------
3 WHERE IT LEAKS                       (paper, ~1 viewport)
 H2: Five ways Meta spend goes wrong.
 Full-width annotated screenshot of a funnel with 5 numbered pins;
 hover/tap a pin: breaks / fix, two lines each. Fixed (no scroll stack).
-------------------------------------------------------------
4 PROOF                                (white, 1 viewport)
 3 big project tiles (photo + brand logo + one outcome line + link)
 under it: one-row logo strip (hover-to-project, approved behaviour)
 right of tiles: ONE pull quote with name/role if available, else 
 the 4 numbers we read (2x2 plain type, no cards)
-------------------------------------------------------------
5 FIRST 90 DAYS                        (paper, ~0.8 viewport)
 horizontal timeline: Week 1 audit | Wk 2-3 rebuild | Wk 4-8 test | Wk 9+ scale
 each stop = one 3:2 photo/screen + 2 lines + "You get:" 
 mobile: swipeable snap row
-------------------------------------------------------------
6 FIT + QUESTIONS                      (white)
 left 5/12: Good fit / Not a fit as two lines of big type (no cards)
 right 7/12: FAQ (6 Qs), first open
-------------------------------------------------------------
7 CLOSE
 CtaBand: full-bleed team photo, one sentence, one button
 Tools + Guides: single snap-scroll row, 4 tools + 3 guides
 Related services: 3 text chips (not cards), AiVersion as one chip
[PreFooterCta + FOOTER - unchanged]
```
Target length: about 7 to 8 screens desktop (about 7,000 px, down from 14,500 to 16,600), about 12,000 px mobile (down from 20,300 to 23,200).

### 3.3 Per-section spec

**1 Answer spread.** Layout: 12-col split, photo 5 cols with a literal scene, text 7 cols. Visual: a real photo of the MMC strategist working the account (needs real people; not another laptop plant). Copy: answer-first, 40 to 60 words, the definition sentence, then three single-line specifics ("D2C is judged on contribution margin, B2B and education on cost per qualified lead"). Keep: `Answer.astro` data (lead, hl, points), `Breadcrumb` JSON-LD. Replace: the card chrome, the horizontal chips, the Article block (move to a collapsible "Read the full guide" `details` for SEO text; keep markup in DOM). Drop `hv2h-updated` strip into this block.

**2 The work, shown.** Layout: ink band, sticky left panel (about 55 percent width), steps scroll on right; on phone, panel on top (sticky 40svh) and steps below. Visual: platform-faithful UI per service: Meta Ads Manager (Meta logo), Google Ads, Shopify admin and a product page, Search Console and an AI answer panel for SEO/AEO, a Lighthouse or heatmap for CRO, a CRM pipeline for lead-gen. Each step swaps the panel state (illustrative note once, bottom). Copy: step title = verb + object ("Merge nine small campaigns into one"), one sentence of why, no bullets. Keep: `PlatformShowcase` (extend to all services), NumberedGrid items (as the step list, minus the 6 thumbnails). Cut: 6-card grid.

**3 Where it leaks.** Layout: one wide annotated image with 5 pins; below it, pin text appears in a caption panel. Visual: a single funnel/page screenshot per service with real marks. Copy: the existing `stages[].breaks` as headline per pin, `does` as the fix. Keep: data fields `leaks`, `stages` (one image instead of five). Replace: `Stages.astro` stack. If pinned diagram is too expensive, keep 3 of 5 stages as full-bleed split rows with alternating image side, no sticky scale.

**4 Proof.** Layout: three large project tiles (16:10) then one logo row. Visual: real campaign screens, packaging, store pages, the clients' own content (already in `work-clients.json`). Copy: brand, one outcome sentence per tile in plain words (no counts of clients or brands; respect the no-fact-check and "a few of the brands" rules). Keep: `BrandTiles` data (`proofRows`), `Numbers` metrics as plain 2x2 type beside the tiles, the first sentence of WhyUs as one line under the heading. Cut: WhyUs 6 items, Numbers 4-card band, TestimonialSlider (no recorded quotes exist; use a real client video thumbnail instead if available).

**5 First 90 days.** Layout: horizontal four-stop timeline, photo per stop. Visual: four literal scenes (audit call, whiteboard, creative shoot or UI build, weekly report on a screen). Copy: "Week 1: we read the account against your margin. You get: a one-page audit." Keep: `process` / `accordion` data. Replace: `ProcessAccordion` with `<details>`-free timeline (the accordion hides content that has SEO value; the timeline keeps it visible).

**6 Fit and questions.** Layout: 5/7 split. Keep `WhoFor` data (good/not fit) rendered as two typographic statements with a tick and a cross, no cards; `Faq` data, 6 questions max (current pages run 5 to 6), JSON-LD unchanged. Add a small "Ask us directly" contact card with a person photo at the bottom of the left column, which fills the empty space defect 10.

**7 Close.** `CtaBand` with a full-bleed team photo (replace the 4:3 stage-photo crop), `FreeToolsStrip` + `LinkStrip` merged into one horizontal snap row (tools first), `Beyond` reduced to 3 photo cards at most (SEO: 3 photo cards plus a chip row of the other 7), `AiVersion` as a single chip on the related row.

### 3.4 Component verdicts

| Component | Verdict | Notes |
|---|---|---|
| Hero, Nav, Footer, PreFooterCta | Keep | Fixed by owner rule. |
| Breadcrumb | Merge | One line inside Answer spread; JSON-LD stays. |
| Answer | Keep, restyle | Split with big photo; drop chips. |
| Article (`#guide`, `.gd`) | Merge | Collapsible full guide below Answer; remove TOC when under 4 headings. Visual for each block already exists (`b.img`) so keep one hero image only. |
| PlatformShowcase | Keep, promote | Becomes the pinned scene in section 2 for every service. |
| NumberedGrid | Cut | Duplicates Stages; data becomes steps in section 2. |
| Stages (`.stk`) | Replace | Annotated diagram (section 3) or 3 alternating rows; remove sticky scale stack; fixes defects 1, 2, 12. |
| WhyUs | Cut / merge | One sentence into Proof; photo-plus-6-bullets is the generic pattern. |
| Loop / LoopB (lead-gen, education) | Keep as a feature | One of the few real diagrams; use as the section 3 visual on lead-gen/CRO pages. |
| Numbers | Merge | Four numbers as plain type in Proof. |
| ProcessAccordion | Replace | Horizontal timeline. |
| WhoFor | Merge | With FAQ, typographic. |
| BrandTiles | Keep, upgrade | Add project tiles above logo row; reuse approved logo hover-to-project. |
| TestimonialSlider | Cut until real quotes exist | (No recorded written quotes per V2-IMAGE-NEEDS.) |
| Beyond | Trim | 3 photo cards max; rest as chips. |
| AiVersion | Merge | Chip in related row. |
| Faq | Keep | 2-col with contact card. |
| CtaBand | Keep, restyle | Full-bleed team photo. |
| FreeToolsStrip + LinkStrip | Merge | One snap row on phones. |

### 3.5 Mobile note (390)

- Single column; section 2 panel sticky at 38svh with steps scrolling beneath (not tall cards); section 3 pins become a tap-to-reveal list under a full-width image; section 5 is a snap-scroll row of 82vw cards; section 7 tools+guides snap row, so the page falls from ~21,000 to ~12,000 px.
- Keep gutters at 16 px, all text links min-height 44, collapse the cookie card to one line and hide the AI fab while it is open. No stacking transforms on phone (the clip bug).
- First visible content after hero should be a picture, not a paragraph: put the Answer photo above the text on phone.

### 3.6 Per page variations (so they stop looking the same)

- meta-ads: pinned Ads Manager scene; leak diagram = funnel; proof = ad creatives.
- seo: pinned scene = a SERP + Search Console view; cut Beyond to 3; AEO/GEO/AI SEO appear as a small "4 ways to be found" row of chips.
- shopify: pinned scene = a store admin and a mobile product page; speed diagram is a before/after PageSpeed.
- lead-generation: section 3 = the existing LoopB loop diagram plus a CRM pipeline; keep `quality` block as the section 3 companion.
- cro: pinned scene = a heatmap and a test result; leak diagram = a real PDP with pins.
- seo/aeo: pinned scene = a buyer asking an AI assistant; use illustrative UI with no real brand answers; ends with "what to publish" checklist as the process.
- skincare: lead with a bathroom-shelf photo; pinned scene is a product page with ingredient and routine proof; replenishment reminder on a phone in section 5.

## 4. Per-section verdict (keep / merge / cut)

| Section | Verdict | Reason |
|---|---|---|
| Breadcrumb | Merge | One line inside Answer. |
| Answer | Keep | Core answer-first block, restyled. |
| Updated strip | Merge | Into Answer. |
| Article | Merge | Collapse; keep for SEO. |
| Platform | Keep | Becomes the centrepiece. |
| NumberedGrid | Cut | Template look, duplicate photos. |
| Stages | Replace | 25 percent of the page, clipped on phone. |
| WhyUs | Cut | Generic bullets, repeated photo. |
| Loop | Keep (lead-gen/CRO) | Real diagram. |
| Numbers | Merge | Into Proof. |
| ProcessAccordion | Replace | Timeline. |
| WhoFor | Merge | With FAQ. |
| BrandTiles | Keep, upgrade | Proof row. |
| TestimonialSlider | Cut | No quotes. |
| Beyond | Merge/trim | 3 cards. |
| AiVersion | Merge | Chip. |
| Faq | Keep | 2-col. |
| CtaBand | Keep, restyle | Team photo. |
| FreeTools + LinkStrip | Merge | Snap row. |
| PreFooterCta | Keep | Fixed. |

## 5. Imagery needed (literal scenes, not abstract)

Shared (all pages):
- 1 team photo of MMC people on a client call or at a desk (CtaBand, Answer, FAQ contact card). Real people.
- 4 process scenes: audit call, whiteboard session, build/shoot, weekly report review (timeline).
- Per-service 4:5 "strategist at work" portrait for the Answer spread (7 total).

Per page:
- meta-ads: Ads Manager-style full UI (real Meta logo, illustrative note) in 5 states (structure, creative test, audience, CAPI event stream, margin chart); a phone showing an Instagram reel ad; a funnel annotated screenshot.
- seo: SERP with a featured snippet and an AI Overview panel; a Search Console style report; a content brief on a desk; an internal-link map screen.
- seo/aeo: a buyer typing a purchase question into an AI assistant on a phone (illustrative UI, no real brand answers); a page with a clear answer block highlighted; a question list on a whiteboard. Stop reusing `seo/aeo.jpg`.
- shopify: Shopify admin screen with logo, mobile product page, PageSpeed before/after, checkout on phone.
- lead-generation: CRM pipeline board, a WhatsApp enquiry thread, a form with an accept/reject stamp, the Meta to CRM to CAPI loop as a clean diagram.
- cro: heatmap on a PDP, an A/B test result screen, cart abandonment screen, a form with friction points marked.
- skincare: a bathroom shelf with a routine; a product page with ingredient and review blocks on a phone; a replenishment reminder on a phone; a creator showing a routine to camera; unboxing; a patch-test card.
- Proof: 3 project tiles per service built from real client assets in `public/assets/clients`; real ad creatives and store pages.
- Unique 3:2 distinct thumbnails if NumberedGrid is kept anywhere (6 per service; today only 5 exist, all duplicated).

## 6. Priorities

1. Fix the mobile clip (defect 1) and cookie/FAB overlap (3) now; they are visible bugs, independent of the redesign.
2. Replace Stages and delete NumberedGrid, WhyUs, TestimonialSlider; this removes about 6,000 px per page.
3. Build the pinned Platform scene for Meta first, then clone per service with its own UI.
4. Commission the imagery list above; do not ship the redesign on the current laptop-on-desk set.

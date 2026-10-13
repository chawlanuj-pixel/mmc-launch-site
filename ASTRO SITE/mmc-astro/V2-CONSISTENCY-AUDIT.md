# V2 consistency audit (internal)

Date: 12 October 2026. Scope: make the site read as one product without redesigning any page. The canonical spec this audit
produced is `DESIGN-CONSISTENCY.md` (same folder); the lint that keeps it is `tools/style-lint.mjs`.

Fixed by owner rule and not touched: NavMenu, the service-page hero (`hub/Hero.astro`), the footer, the homepage hover sections.

## Method

Real browser (headless Chrome on :9223, own tab per run, closed after), dev server on :4331. One page per family at 1440x900 and
390x844, values read with `getComputedStyle` after scrolling every page end to end (reveals finished): body, h1/h2/h3 type, the
italic accent inside headings, eyebrows, buttons (rest, forced `:hover`, forced `:focus-visible`), text links, chips, card radius and
shadow, container max-width and the text's left edge, band padding and grounds, breadcrumb, FAQ, closing band, form fields, image
radius, overflow and sub-44px targets. Then real Tab presses through `main` to read the focus ring against its ground.

Pages: `/`, `/services/performance-marketing/meta-ads/` (svc2), `/industries/` (classic template; `/guides/`, `/resources/`,
`/industries/b2b/` and `/industries/education/` are the other classic renders), `/industries/d2c/skincare/`, `/white-label/`,
`/white-label/register/`, `/work/`, `/work/pandacabs/` (case2), `/locations/thane/`, `/services/web-development/woocommerce/`,
`/about/`, `/careers/`, `/contact/`, `/guides/`, `/tools/`, `/tools/ltv-cac/`, `/audit/`, `/pricing-model/in-f886f1d7/`.

Screenshots: `/private/tmp/claude-501/-Users-anuj-mmc-Documents-MMC-Aug-Launch-site/29c3738f-6435-49bf-a2b6-757247cbf2af/scratchpad/shots/rv-consistency/` (`before-*` and `before390-*` = top / mid / end of each page before the pass; `a-*`, `p-*`, `w1920-*`,
`qa*-pin-*` = after, including the pinned-scene release at every width).

## The dominant house style

Taken from `colors_and_type.css`, `home26.css` (the `n-` system every classic page, about, careers, contact, audit, tools and
register use) and the fixed service hero / pre-footer that sit on every page:

- Raleway 800 headings; display H2 clamp(30px, 4.6vw, 66px), line-height 1.0, tracking -0.038em; one italic 600 accent phrase,
  royal blue on light, sun on ink.
- Eyebrow: Nunito 800 12px, tracking 0.2em, uppercase, muted `#5B6478` on light and sun on ink, with a 26px rule before it
  (the hero eyebrow is the same shape in white).
- Primary button: sun pill, `#16329E` text, Nunito 700 13.5px uppercase 0.06em, 55px tall, drawn arrow, lift 1px on hover.
  Secondary: the same type as an underlined link with an arrow, or a ghost pill. Form submits inside white cards use the same
  chrome in blue-700.
- Container: the site spine, `--shell-pad` (text at 81px at 1440) and `--shell-max`, so section copy lines up with the nav logo
  and the hero copy.
- Bands: paper / white / ink (`--grad-ink`), 86 to 115px vertical padding at 1440. FAQ: hairline rows with a 30px ring icon.
  Closing: the shared pre-footer (`.pfc`).
- Cards 22px, large media 28px, inner pieces 14px. Motion on `cubic-bezier(.22,.61,.36,1)` / `(.22,1,.36,1)`.

## Deviations, ranked by visibility

| # | Deviation (before) | Where | Status |
|---|---|---|---|
| 1 | Two primary buttons on one page: the hero and pre-footer use the uppercase sun `.btn--primary`, the svc2 body used `.s2-btn` (sentence case, Nunito 800 16px, royal-blue fill in the answer spread) | every svc2 page: 60+ services, industries, white label, locations, WooCommerce | Fixed: `.s2-btn` now has the house chrome and sun fill; the close link is the house uppercase secondary |
| 2 | svc2 / case2 eyebrows were a third style (12.5px, 0.09em, blue-700, no rule) directly under a hero eyebrow with the rule and wide tracking | svc2, case2 | Fixed: `.s2-eyebrow` and `.c2-eyebrow` match `.n-eyebrow` (sun on ink bands) |
| 3 | Section copy started at 88px (1360px cap) while the nav and hero copy start at 81px; at 1920 the gap was 107px vs 328px | svc2, case2; pricing started at 112px (1280px cap) | Fixed from 721px (768px on pricing): wraps run on `--shell-max` / `--shell-pad`. Phones keep the dense 16px gutter (see Open decisions) |
| 4 | Three FAQ looks: hub ring icon; svc2 filled lavender disc turning sun; case2 paper disc rotating to a sun X. Questions 800 vs 700 | svc2, case2; pricing rate card and terms had no open/close icon at all | Fixed: all use the faq.css ring (blue plus, minus when open), Raleway 700, answers 16px/1.65 `--n-fg-2`. Pricing accordions gained the same icon |
| 5 | Focus rings: blue on ink (svc2 pinned band, photo close, and the hero/pre-footer inside svc2 pages, about 2:1), sun on white (case2 light bands, register form, under 2:1), UA default elsewhere | svc2, case2, register, home form | Fixed in the new families: tokens `--focus-w/offset/color/color-dark`; blue on light, sun on dark. Classic pages still show the browser default on `.btn` (see Left alone) |
| 6 | Register submit: Raleway 800 16px sentence case on blue; ghost with a grey border | `/white-label/register/` | Fixed: house chrome, blue-700 submit (as on /contact/ and the audit modal), house ghost |
| 7 | Form fields: register 12px radius, `#C9D1DE` border, three error reds (`#C0262D`, `#B4232A`, `#7A1A1F`), 0.18 focus ring; pricing dialog 10px radius, `#B33A3A`; home form 1px border with an outline focus | register, pricing, home | Fixed: 1.5px `--field-line`, 14px radius, blue border + 4px 0.14 ring on focus, one error colour `--mmc-error` (#B3261E, already used by the audit modal and home form) |
| 8 | Breadcrumb: shared crumb 14px links 700; svc2 13px 600 with faint separators; case2 links in muted grey | svc2, case2 | Fixed: 14px, blue-700 700 links, `--n-fg-3` "/" with 10px spacing |
| 9 | Radii drift: tiles 26, register card 24, trust cards 18, pricing cards 14 and accordions 12 | svc2, register, pricing | Fixed with `--radius-card` 22 / `--radius-media` 28 / `--radius-in` 14 |
| 10 | Pricing buttons were 12px-radius rectangles; primary sentence case; "Print / save as PDF" wrapped to two lines | pricing | Fixed: pills; primary has the house chrome; action row stays on one line |
| 11 | Pricing eyebrow blue 0.16em; H1/H2 tracking looser than every other page | pricing | Fixed: house eyebrow; H1 -0.035em, H2 -0.03em |
| 12 | Section rhythm: svc2 79px, case2 101px, classic 86 / 115px at 1440 | svc2, case2 | Aligned: svc2 `--band-y-tight` (86px), case2 `--band-y` (115px) |
| 13 | Hard-coded brand hex and easing in the new families (svc2 57, case2 29, register 85, pricing 57 literals; 161 brand literals in panel style blocks; hero easing `(.2,.7,.2,1)`) | new code | Fixed: tokens or token aliases; panel style blocks use `var(--mmc-*)` (platform colours stay literal, allowlisted) |
| 14 | Pricing summaries `.pc-inc` / `.pc-first` 32px tall | pricing | Fixed: 44px |
| 15 | Home left edge 60px (its own 1640px wrap and `--hv-pad`) vs 81px for nav, hero card and every other page; home eyebrows are the V2 skin (12.5px, 0.08em, blue, no rule) | `/` | Left alone: lives in `home-v2b.css` and the approved hover sections; changing it would restyle approved sections. Owner decision |
| 16 | Pre-footer copy starts at 130px at 1440 (its own inner padding) | every page | Left alone: shared older component outside the brief (`prefooter.css`). Recommend aligning `.pfc__in` to `--shell-pad` |
| 17 | `.btn` has no focus-visible rule outside svc2 pages, so classic pages show the browser ring | classic and older pages | Left alone (`styles.css` is not new code). One line fixes it: `.btn:focus-visible { outline: var(--focus-w) solid var(--focus-color); outline-offset: var(--focus-offset); }` plus the dark override |
| 18 | Calculator pages (`/tools/*`) are their own system: 11px uppercase crumb, 15px info buttons, 20px number inputs, 2px focus | tools | Left alone (legacy `tools.css`, top of the lint's legacy list). Sub-44px targets reported below |
| 19 | About page H2s use -0.015em tracking and five sizes; work index hero accent is italic 400 | about, work | Left alone (older pages); fold in when next touched |

## Comparison matrix

Columns: h1 / first h2 as family weight size/line-height tracking colour; number of distinct H2 styles on the page; heading
accent; first eyebrow; distinct filled buttons; focus ring on the first button (forced `:focus-visible`); container class, max,
padding and the text's left edge; FAQ question type and icon; first input; image radius counts; horizontal overflow and the count
of sub-40px targets in `main`.

### Before, 1440

| page | h1 | h2 (first) | h2 variants | em accent | eyebrow | primary button | focus ring | container (text left / max) | FAQ | input | img radius | overflow / small targets |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| home | Raleway 800 99/101 -0.036em #FFFFFF | Raleway 800 48/51 -0.028em #0F1E5E | 2 | italic 600 #FFC528 | 12px 700 0.080em up #16329E dash:n .hn-eyebrow | .btn .btn--primary 55h r999 Nun 700 14 up #FFC528; .hv-cl__btn 44h r50% Nun 400 17 no #FFFFFF | .btn solid 3px rgb(29, 78, 216) off3px | hn-wrap max1640px pad60.48px textLeft60; wk__head max1640px pad60.48px textLeft60 | .hv2-how__list 400 17 #0B1020 icon:12px 0px rgb(11, 16, 32) | 48h b1px #0B1020/0.18 r14 16px | 22x3 | ox0 small:0 |
| svc2-meta | Raleway 700 56/60 -0.035em #FFFFFF | Raleway 800 45/46 -0.040em #0F1E5E | 3 | italic 600 #1D4ED8 | 12px 700 0.220em up #FFFFFF/0.72 dash:y .eyebrow | .btn .btn--primary 55h r999 Nun 700 14 up #FFC528; .s2-btn 52h r999 Nun 800 16 no #1D4ED8; .s2-btn .s2-btn--sun 52h r999 Nun 800 16 no #FFC528 | .btn solid 3px rgb(29, 78, 216) off3px | s2-wrap max1360px pad48px textLeft88 | .s2-wrap 800 15 #16329E icon:none | - | 20x7, 28x1, 26x3, 22x12, 0x1, 14x3 | ox0 small:1 |
| classic-industries | Raleway 700 46/49 -0.035em #FFFFFF | Raleway 800 66/66 -0.038em #0B1020 | 4 | italic 600 #1D4ED8 | 12px 700 0.220em up #FFFFFF/0.72 dash:y .eyebrow | .btn .btn--primary 55h r999 Nun 700 14 up #FFC528 | .btn auto 1px rgb(0, 95, 204) off0px | n-wrap max2160px pad80.64px textLeft81; bt__wrap max2160px pad80.64px textLeft81 | .mmc-faq 700 21 #0B1020 icon:30px 50% rgb(29, 78, 216) | - | 20x7, 999px 999px 26px 26pxx1, 28x3, 22x2, 18x12 | ox0 small:8 |
| ind-skincare | Raleway 700 56/60 -0.035em #FFFFFF | Raleway 800 45/46 -0.040em #0F1E5E | 3 | italic 600 #1D4ED8 | 12px 700 0.220em up #FFFFFF/0.72 dash:y .eyebrow | .btn .btn--primary 55h r999 Nun 700 14 up #FFC528; .s2-btn 52h r999 Nun 800 16 no #1D4ED8; .s2-btn .s2-btn--sun 52h r999 Nun 800 16 no #FFC528 | .btn solid 3px rgb(29, 78, 216) off3px | s2-wrap max1360px pad48px textLeft88 | .s2-wrap 800 15 #16329E icon:none | - | 20x7, 28x1, 22x4, 0x1, 14x7 | ox0 small:1 |
| whitelabel | Raleway 700 56/60 -0.035em #FFFFFF | Raleway 800 45/46 -0.040em #0F1E5E | 3 | italic 600 #1D4ED8 | 12px 700 0.220em up #FFFFFF/0.72 dash:y .eyebrow | .btn .btn--primary 55h r999 Nun 700 14 up #FFC528; .s2-btn 52h r999 Nun 800 16 no #1D4ED8; .s2-btn .s2-btn--sun 52h r999 Nun 800 16 no #FFC528 | .btn solid 3px rgb(29, 78, 216) off3px | s2-wrap max1360px pad48px textLeft88 | .s2-wrap 800 15 #16329E icon:none | - | 20x7, 28x1, 22x4, 0x1, 14x3 | ox0 small:1 |
| register | Raleway 700 56/60 -0.035em #FFFFFF | Raleway 800 66/66 -0.038em #0B1020 | 3 | italic 600 #1D4ED8 | 12px 700 0.220em up #FFFFFF/0.72 dash:y .eyebrow | .btn .btn--primary 55h r999 Nun 700 14 up #FFC528; .wlr-btn 52h r999 Ral 800 16 no #16329E | .btn auto 1px rgb(0, 95, 204) off1px | n-wrap max2160px pad80.64px textLeft81 | .wlr-preview 700 14 #16329E icon:none | 21h b2px #767676 r0 13px | 20x7, 14x1 | ox0 small:5 |
| work | Raleway 700 72/75 -0.030em #0B1020 | Raleway 800 66/66 -0.038em #0B1020 | 3 | italic 400 #16329E | 13px 700 0.060em up #16329E dash:y .cw-hero__eyebrow | .btn .btn--primary 55h r999 Nun 700 14 up #FFC528 | .btn auto 1px rgb(0, 95, 204) off1px | n-wrap max2160px pad80.64px textLeft81; fts__wrap max2160px pad80.64px textLeft81 | .mmc-faq 700 21 #0B1020 icon:30px 50% rgb(29, 78, 216) | - | 22x2, 24x13 | ox0 small:8 |
| case-pandacabs | Raleway 800 115/111 -0.045em #FFFFFF | Raleway 300 52/57 -0.028em #FFFFFF | 1 | italic 600 #FFC528 | 12px 700 0.140em up #FFC528 dash:n .pfc__eyebrow | .btn .btn--primary 55h r999 Nun 700 14 up #FFC528 | .btn auto 1px rgb(0, 95, 204) off0px | - | .c2-faq__list 800 21 #0F1E5E icon:none | - | 22px 22px 0px 0pxx1, 14x5, 28x2, 22x3 | ox0 small:0 |
| loc-thane | Raleway 700 56/60 -0.035em #FFFFFF | Raleway 800 45/46 -0.040em #0F1E5E | 3 | italic 600 #1D4ED8 | 12px 700 0.220em up #FFFFFF/0.72 dash:y .eyebrow | .btn .btn--primary 55h r999 Nun 700 14 up #FFC528; .s2-btn 52h r999 Nun 800 16 no #1D4ED8; .s2-btn .s2-btn--sun 52h r999 Nun 800 16 no #FFC528 | .btn solid 3px rgb(29, 78, 216) off3px | s2-wrap max1360px pad48px textLeft88 | .s2-wrap 800 15 #16329E icon:none | - | 20x7, 28x1, 22x3, 0x1, 14x3 | ox0 small:1 |
| about | Raleway 700 46/49 -0.035em #FFFFFF | Raleway 800 43/47 -0.015em #0E1626 | 6 | italic 600 #1D4ED8 | 12px 700 0.220em up #FFFFFF/0.72 dash:y .eyebrow | .btn .btn--primary 55h r999 Nun 700 14 up #FFC528 | .btn auto 1px rgb(0, 95, 204) off0px | container max2160px pad80.64px textLeft81; n-wrap max2160px pad80.64px textLeft81 | .mmc-faq 700 21 #0B1020 icon:30px 50% rgb(29, 78, 216) | - | 22x4, 0x1, 14x1 | ox0 small:7 |
| careers | Raleway 800 92/90 -0.040em #FFFFFF | Raleway 800 66/66 -0.038em #0B1020 | 2 | italic 600 #FFC528 | 11px 800 0.200em up #5B6478 dash:y .n-eyebrow | .btn .btn--primary 55h r999 Nun 700 14 up #FFC528 | .btn auto 1px rgb(0, 95, 204) off1px | n-wrap max2160px pad80.64px textLeft81 | .mmc-faq 700 21 #0B1020 icon:30px 50% rgb(29, 78, 216) | - | 0x1, 20x1, 18x4, 16x4 | ox0 small:0 |
| contact | Raleway 700 56/60 -0.035em #FFFFFF | Raleway 800 66/66 -0.038em #0B1020 | 1 | italic 600 #1D4ED8 | 12px 700 0.220em up #FFFFFF/0.72 dash:y .eyebrow | .btn .btn--primary 55h r999 Nun 700 14 up #FFC528; .cx-btn 50h r999 Nun 700 14 up #FFC528 | .btn auto 1px rgb(0, 95, 204) off0px | n-wrap max2160px pad80.64px textLeft81 | .mmc-faq 700 21 #0B1020 icon:30px 50% rgb(29, 78, 216) | 52h b1px #0B1020/0.18 r14 16px | 20x7, 999px 999px 26px 26pxx1, 36x1, 22x6 | ox0 small:8 |
| guides | Raleway 700 46/49 -0.035em #FFFFFF | Raleway 800 66/66 -0.038em #0B1020 | 3 | italic 600 #1D4ED8 | 12px 700 0.220em up #FFFFFF/0.72 dash:y .eyebrow | .btn .btn--primary 55h r999 Nun 700 14 up #FFC528 | .btn auto 1px rgb(0, 95, 204) off0px | n-wrap max2160px pad80.64px textLeft81 | .mmc-faq 700 21 #0B1020 icon:30px 50% rgb(29, 78, 216) | - | 20x7, 999px 999px 26px 26pxx1, 28x3, 18x3, 22x1 | ox0 small:8 |
| tools | Raleway 700 56/60 -0.035em #FFFFFF | Raleway 800 66/66 -0.038em #0B1020 | 2 | italic 600 #1D4ED8 | 12px 700 0.220em up #FFFFFF/0.72 dash:y .eyebrow | .btn .btn--primary 55h r999 Nun 700 14 up #FFC528 | .btn auto 1px rgb(0, 95, 204) off1px | n-wrap max2160px pad80.64px textLeft81 | .mmc-faq 700 21 #0B1020 icon:30px 50% rgb(29, 78, 216) | - | 20x7, 999px 999px 26px 26pxx1, 22x10, 18x3 | ox0 small:8 |
| tool-ltv | Raleway 700 35/37 -0.028em #FFFFFF | Raleway 800 20/22 -0.022em #131A2E | 5 | italic 600 #FFC528 | 12px 700 0.140em up #FFC528 dash:n .pfc__eyebrow | .tl-info__btn 15h r50% Ral 700 10 no #FFFFFF; .btn .btn--primary 55h r999 Nun 700 14 up #FFC528 | .tl-act solid 2px rgb(29, 78, 216) off2px | tl-wrap max2160px pad80.64px textLeft81; tx__wrap max820px pad80.64px textLeft391 | .tl-groups 700 13 #131A2E icon:7.8125px 0px rgb(29, 78, 216) | 20h b0px #131A2E r0 17px |  | ox0 small:8 |
| audit | Raleway 700 56/60 -0.035em #FFFFFF | Raleway 800 66/66 -0.038em #0B1020 | 2 | italic 600 #1D4ED8 | 12px 700 0.220em up #FFFFFF/0.72 dash:y .eyebrow | .btn .btn--primary 55h r999 Nun 700 14 up #FFC528 | .btn auto 1px rgb(0, 95, 204) off1px | n-wrap max2160px pad80.64px textLeft81 | .mmc-faq 700 21 #0B1020 icon:30px 50% rgb(29, 78, 216) | - | 20x1, 16x7, 14x3 | ox0 small:3 |
| pricing | - | Raleway 800 36/40 -0.015em #0E1626 | 3 | - | - | .pc-btn .pc-btn--primary 46h r12 Nun 800 16 no #FFC528; .pc-btn 52h r12 Nun 800 16 no #FFFFFF; .pc-btn .pc-btn--ghost 44h r12 Nun 800 16 no #FFFFFF | .pc-stepper__btn solid 3px rgb(29, 78, 216) off2px | pc-wrap max1280px pad32px textLeft112 | .pc-rc-stage 800 17 #0E1626 icon:none | 48h b1px #0F1E5E/0.14 r999 16px |  | ox0 small:0 |
| woo | Raleway 700 56/60 -0.035em #FFFFFF | Raleway 800 45/46 -0.040em #0F1E5E | 3 | italic 600 #1D4ED8 | 12px 700 0.220em up #FFFFFF/0.72 dash:y .eyebrow | .btn .btn--primary 55h r999 Nun 700 14 up #FFC528; .s2-btn 52h r999 Nun 800 16 no #1D4ED8; .s2-btn .s2-btn--sun 52h r999 Nun 800 16 no #FFC528 | .btn solid 3px rgb(29, 78, 216) off3px | s2-wrap max1360px pad48px textLeft88 | .s2-wrap 800 15 #16329E icon:none | - | 20x7, 28x1, 22x4, 0x1, 14x3 | ox0 small:1 |

### After, 1440

| page | h1 | h2 (first) | h2 variants | em accent | eyebrow | primary button | focus ring | container (text left / max) | FAQ | input | img radius | overflow / small targets |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| home | Raleway 800 99/101 -0.036em #FFFFFF | Raleway 800 48/51 -0.028em #0F1E5E | 2 | italic 600 #FFC528 | 12px 700 0.080em up #16329E dash:n .hn-eyebrow | .btn .btn--primary 55h r999 Nun 700 14 up #FFC528; .hv-cl__btn 44h r50% Nun 400 17 no #FFFFFF | .btn solid 3px rgb(29, 78, 216) off3px | hn-wrap max1640px pad60.48px textLeft60; wk__head max1640px pad60.48px textLeft60 | .hv2-how__list 400 17 #0B1020 icon:12px 0px rgb(11, 16, 32) | 48h b1px #0B1020/0.18 r14 16px | 22x3 | ox0 small:0 |
| svc2-meta | Raleway 700 56/60 -0.035em #FFFFFF | Raleway 800 45/46 -0.038em #0F1E5E | 3 | italic 600 #1D4ED8 | 12px 700 0.220em up #FFFFFF/0.72 dash:y .eyebrow | .btn .btn--primary 55h r999 Nun 700 14 up #FFC528; .s2-btn 52h r999 Nun 700 14 up #FFC528; .s2-btn .s2-btn--sun 52h r999 Nun 700 14 up #FFC528 | .btn solid 3px rgb(255, 197, 40) off3px | s2-wrap max2160px pad80.64px textLeft81 | .s2-wrap 800 15 #16329E icon:none | - | 20x7, 28x1, 22x15, 0x1, 14x3 | ox0 small:1 |
| classic-industries | Raleway 700 46/49 -0.035em #FFFFFF | Raleway 800 66/66 -0.038em #0B1020 | 4 | italic 600 #1D4ED8 | 12px 700 0.220em up #FFFFFF/0.72 dash:y .eyebrow | .btn .btn--primary 55h r999 Nun 700 14 up #FFC528 | .btn auto 1px rgb(0, 95, 204) off0px | n-wrap max2160px pad80.64px textLeft81; bt__wrap max2160px pad80.64px textLeft81 | .mmc-faq 700 21 #0B1020 icon:30px 50% rgb(29, 78, 216) | - | 20x7, 999px 999px 26px 26pxx1, 28x3, 22x2, 18x12 | ox0 small:8 |
| ind-skincare | Raleway 700 56/60 -0.035em #FFFFFF | Raleway 800 45/46 -0.038em #0F1E5E | 3 | italic 600 #1D4ED8 | 12px 700 0.220em up #FFFFFF/0.72 dash:y .eyebrow | .btn .btn--primary 55h r999 Nun 700 14 up #FFC528; .s2-btn 52h r999 Nun 700 14 up #FFC528; .s2-btn .s2-btn--sun 52h r999 Nun 700 14 up #FFC528 | .btn solid 3px rgb(255, 197, 40) off3px | s2-wrap max2160px pad80.64px textLeft81 | .s2-wrap 800 15 #16329E icon:none | - | 20x7, 28x1, 22x4, 0x1, 14x7 | ox0 small:1 |
| whitelabel | Raleway 700 56/60 -0.035em #FFFFFF | Raleway 800 45/46 -0.038em #0F1E5E | 3 | italic 600 #1D4ED8 | 12px 700 0.220em up #FFFFFF/0.72 dash:y .eyebrow | .btn .btn--primary 55h r999 Nun 700 14 up #FFC528; .s2-btn 52h r999 Nun 700 14 up #FFC528; .s2-btn .s2-btn--sun 52h r999 Nun 700 14 up #FFC528 | .btn solid 3px rgb(255, 197, 40) off3px | s2-wrap max2160px pad80.64px textLeft81 | .s2-wrap 800 15 #16329E icon:none | - | 20x7, 28x1, 22x4, 0x1, 14x3 | ox0 small:1 |
| register | Raleway 700 56/60 -0.035em #FFFFFF | Raleway 800 66/66 -0.038em #0B1020 | 3 | italic 600 #1D4ED8 | 12px 700 0.220em up #FFFFFF/0.72 dash:y .eyebrow | .btn .btn--primary 55h r999 Nun 700 14 up #FFC528; .wlr-btn 52h r999 Nun 700 14 up #16329E | .btn auto 1px rgb(0, 95, 204) off1px | n-wrap max2160px pad80.64px textLeft81 | .wlr-preview 700 14 #16329E icon:none | 21h b2px #767676 r0 13px | 20x7, 14x1 | ox0 small:5 |
| work | Raleway 700 72/75 -0.030em #0B1020 | Raleway 800 66/66 -0.038em #0B1020 | 3 | italic 400 #16329E | 13px 700 0.060em up #16329E dash:y .cw-hero__eyebrow | .btn .btn--primary 55h r999 Nun 700 14 up #FFC528 | .btn auto 1px rgb(0, 95, 204) off1px | n-wrap max2160px pad80.64px textLeft81; fts__wrap max2160px pad80.64px textLeft81 | .mmc-faq 700 21 #0B1020 icon:30px 50% rgb(29, 78, 216) | - | 22x2, 24x13 | ox0 small:8 |
| case-pandacabs | Raleway 800 115/111 -0.045em #FFFFFF | Raleway 300 52/57 -0.028em #FFFFFF | 1 | italic 600 #FFC528 | 12px 700 0.140em up #FFC528 dash:n .pfc__eyebrow | .btn .btn--primary 55h r999 Nun 700 14 up #FFC528 | .btn solid 3px rgb(255, 197, 40) off3px | - | .c2-faq__list 700 21 #0F1E5E icon:30px 50% rgb(29, 78, 216) | - | 22px 22px 0px 0pxx1, 14x5, 28x2, 22x3 | ox0 small:0 |
| loc-thane | Raleway 700 56/60 -0.035em #FFFFFF | Raleway 800 45/46 -0.038em #0F1E5E | 3 | italic 600 #1D4ED8 | 12px 700 0.220em up #FFFFFF/0.72 dash:y .eyebrow | .btn .btn--primary 55h r999 Nun 700 14 up #FFC528; .s2-btn 52h r999 Nun 700 14 up #FFC528; .s2-btn .s2-btn--sun 52h r999 Nun 700 14 up #FFC528 | .btn solid 3px rgb(255, 197, 40) off3px | s2-wrap max2160px pad80.64px textLeft81 | .s2-wrap 800 15 #16329E icon:none | - | 20x7, 28x1, 22x3, 0x1, 14x3 | ox0 small:1 |
| about | Raleway 700 46/49 -0.035em #FFFFFF | Raleway 800 43/47 -0.015em #0E1626 | 6 | italic 600 #1D4ED8 | 12px 700 0.220em up #FFFFFF/0.72 dash:y .eyebrow | .btn .btn--primary 55h r999 Nun 700 14 up #FFC528 | .btn auto 1px rgb(0, 95, 204) off0px | container max2160px pad80.64px textLeft81; n-wrap max2160px pad80.64px textLeft81 | .mmc-faq 700 21 #0B1020 icon:30px 50% rgb(29, 78, 216) | - | 22x4, 0x1, 14x1 | ox0 small:7 |
| careers | Raleway 800 92/90 -0.040em #FFFFFF | Raleway 800 66/66 -0.038em #0B1020 | 2 | italic 600 #FFC528 | 11px 800 0.200em up #5B6478 dash:y .n-eyebrow | .btn .btn--primary 55h r999 Nun 700 14 up #FFC528 | .btn auto 1px rgb(0, 95, 204) off1px | n-wrap max2160px pad80.64px textLeft81 | .mmc-faq 700 21 #0B1020 icon:30px 50% rgb(29, 78, 216) | - | 0x1, 20x1, 18x4, 16x4 | ox0 small:0 |
| contact | Raleway 700 56/60 -0.035em #FFFFFF | Raleway 800 66/66 -0.038em #0B1020 | 1 | italic 600 #1D4ED8 | 12px 700 0.220em up #FFFFFF/0.72 dash:y .eyebrow | .btn .btn--primary 55h r999 Nun 700 14 up #FFC528; .cx-btn 50h r999 Nun 700 14 up #FFC528 | .btn auto 1px rgb(0, 95, 204) off0px | n-wrap max2160px pad80.64px textLeft81 | .mmc-faq 700 21 #0B1020 icon:30px 50% rgb(29, 78, 216) | 52h b1px #0B1020/0.18 r14 16px | 20x7, 999px 999px 26px 26pxx1, 36x1, 22x6 | ox0 small:8 |
| guides | Raleway 700 46/49 -0.035em #FFFFFF | Raleway 800 66/66 -0.038em #0B1020 | 3 | italic 600 #1D4ED8 | 12px 700 0.220em up #FFFFFF/0.72 dash:y .eyebrow | .btn .btn--primary 55h r999 Nun 700 14 up #FFC528 | .btn auto 1px rgb(0, 95, 204) off0px | n-wrap max2160px pad80.64px textLeft81 | .mmc-faq 700 21 #0B1020 icon:30px 50% rgb(29, 78, 216) | - | 20x7, 999px 999px 26px 26pxx1, 28x3, 18x3, 22x1 | ox0 small:8 |
| tools | Raleway 700 56/60 -0.035em #FFFFFF | Raleway 800 66/66 -0.038em #0B1020 | 2 | italic 600 #1D4ED8 | 12px 700 0.220em up #FFFFFF/0.72 dash:y .eyebrow | .btn .btn--primary 55h r999 Nun 700 14 up #FFC528 | .btn auto 1px rgb(0, 95, 204) off1px | n-wrap max2160px pad80.64px textLeft81 | .mmc-faq 700 21 #0B1020 icon:30px 50% rgb(29, 78, 216) | - | 20x7, 999px 999px 26px 26pxx1, 22x10, 18x3 | ox0 small:8 |
| tool-ltv | Raleway 700 35/37 -0.028em #FFFFFF | Raleway 800 20/22 -0.022em #131A2E | 5 | italic 600 #FFC528 | 12px 700 0.140em up #FFC528 dash:n .pfc__eyebrow | .tl-info__btn 15h r50% Ral 700 10 no #FFFFFF; .btn .btn--primary 55h r999 Nun 700 14 up #FFC528 | .tl-act solid 2px rgb(29, 78, 216) off2px | tl-wrap max2160px pad80.64px textLeft81; tx__wrap max820px pad80.64px textLeft391 | .tl-groups 700 13 #131A2E icon:7.8125px 0px rgb(29, 78, 216) | 20h b0px #131A2E r0 17px |  | ox0 small:8 |
| audit | Raleway 700 56/60 -0.035em #FFFFFF | Raleway 800 66/66 -0.038em #0B1020 | 2 | italic 600 #1D4ED8 | 12px 700 0.220em up #FFFFFF/0.72 dash:y .eyebrow | .btn .btn--primary 55h r999 Nun 700 14 up #FFC528 | .btn auto 1px rgb(0, 95, 204) off1px | n-wrap max2160px pad80.64px textLeft81 | .mmc-faq 700 21 #0B1020 icon:30px 50% rgb(29, 78, 216) | - | 20x1, 16x7, 14x3 | ox0 small:3 |
| pricing | - | Raleway 800 36/39 -0.030em #0E1626 | 3 | - | - | .pc-btn .pc-btn--primary 52h r999 Nun 700 14 up #FFC528; .pc-btn 46h r999 Nun 800 14 no #FFFFFF; .pc-btn .pc-btn--ghost 44h r999 Nun 800 14 no #FFFFFF | .pc-stepper__btn solid 3px rgb(29, 78, 216) off2px | pc-wrap max2160px pad80.64px textLeft81 | .pc-rc-stage 700 17 #0E1626 icon:30px 50% rgba(11, 16, 32, 0.18) | 48h b1px #0F1E5E/0.14 r999 16px |  | ox0 small:0 |
| woo | Raleway 700 56/60 -0.035em #FFFFFF | Raleway 800 45/46 -0.038em #0F1E5E | 3 | italic 600 #1D4ED8 | 12px 700 0.220em up #FFFFFF/0.72 dash:y .eyebrow | .btn .btn--primary 55h r999 Nun 700 14 up #FFC528; .s2-btn 52h r999 Nun 700 14 up #FFC528; .s2-btn .s2-btn--sun 52h r999 Nun 700 14 up #FFC528 | .btn solid 3px rgb(255, 197, 40) off3px | s2-wrap max2160px pad80.64px textLeft81 | .s2-wrap 800 15 #16329E icon:none | - | 20x7, 28x1, 22x4, 0x1, 14x3 | ox0 small:1 |

### Before, 390

| page | h1 | h2 (first) | h2 variants | em accent | eyebrow | primary button | focus ring | container (text left / max) | FAQ | input | img radius | overflow / small targets |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| home | Raleway 800 41/43 -0.036em #FFFFFF | Raleway 800 30/33 -0.028em #0F1E5E | 3 | italic 600 #FFC528 | 12px 700 0.080em up #16329E dash:n .hn-eyebrow | .btn .btn--primary 55h r999 Nun 700 14 up #FFC528; .hv-cl__btn 44h r50% Nun 400 17 no #FFFFFF | - | hn-wrap max1640px pad19.5px textLeft20; wk__head max1640px pad19.5px textLeft20 | .hv2-how__list 400 17 #0B1020 icon:12px 0px rgb(11, 16, 32) | 48h b1px #0B1020/0.18 r14 16px | 22x3 | ox0 small:0 |
| svc2-meta | Raleway 700 31/33 -0.035em #FFFFFF | Raleway 800 28/29 -0.040em #0F1E5E | 3 | italic 600 #1D4ED8 | 12px 700 0.220em up #FFFFFF/0.72 dash:y .eyebrow | .btn .btn--primary 55h r999 Nun 700 14 up #FFC528; .s2-btn 52h r999 Nun 800 16 no #1D4ED8; .s2-btn .s2-btn--sun 52h r999 Nun 800 16 no #FFC528 | - | s2-wrap max1360px pad16px textLeft16 | .s2-wrap 800 15 #16329E icon:none | - | 22x13, 26x3, 0x1, 14x3 | ox0 small:0 |
| classic-industries | Raleway 700 29/31 -0.035em #FFFFFF | Raleway 800 30/30 -0.038em #0B1020 | 4 | italic 600 #1D4ED8 | 12px 700 0.220em up #FFFFFF/0.72 dash:y .eyebrow | .btn .btn--primary 55h r999 Nun 700 14 up #FFC528 | - | n-wrap max2160px pad32px textLeft32; bt__wrap max2160px pad32px textLeft32 | .mmc-faq 700 17 #0B1020 icon:30px 50% rgb(29, 78, 216) | - | 18x13, 20x3, 22x2 | ox0 small:1 |
| ind-skincare | Raleway 700 31/33 -0.035em #FFFFFF | Raleway 800 28/29 -0.040em #0F1E5E | 3 | italic 600 #1D4ED8 | 12px 700 0.220em up #FFFFFF/0.72 dash:y .eyebrow | .btn .btn--primary 55h r999 Nun 700 14 up #FFC528; .s2-btn 52h r999 Nun 800 16 no #1D4ED8; .s2-btn .s2-btn--sun 52h r999 Nun 800 16 no #FFC528 | - | s2-wrap max1360px pad16px textLeft16 | .s2-wrap 800 15 #16329E icon:none | - | 22x5, 0x1, 14x7 | ox0 small:0 |
| whitelabel | Raleway 700 31/33 -0.035em #FFFFFF | Raleway 800 28/29 -0.040em #0F1E5E | 3 | italic 600 #1D4ED8 | 12px 700 0.220em up #FFFFFF/0.72 dash:y .eyebrow | .btn .btn--primary 55h r999 Nun 700 14 up #FFC528; .s2-btn 52h r999 Nun 800 16 no #1D4ED8; .s2-btn .s2-btn--sun 52h r999 Nun 800 16 no #FFC528 | - | s2-wrap max1360px pad16px textLeft16 | .s2-wrap 800 15 #16329E icon:none | - | 22x5, 0x1, 14x3 | ox0 small:0 |
| register | Raleway 700 31/33 -0.035em #FFFFFF | Raleway 800 30/30 -0.038em #0B1020 | 3 | italic 600 #1D4ED8 | 12px 700 0.220em up #FFFFFF/0.72 dash:y .eyebrow | .btn .btn--primary 55h r999 Nun 700 14 up #FFC528; .wlr-btn 52h r999 Ral 800 16 no #16329E | - | n-wrap max2160px pad32px textLeft32 | .wlr-preview 700 14 #16329E icon:none | 24h b2px #767676 r0 16px |  | ox0 small:4 |
| work | Raleway 700 38/40 -0.030em #0B1020 | Raleway 800 30/30 -0.038em #0B1020 | 3 | italic 400 #16329E | 13px 700 0.060em up #16329E dash:y .cw-hero__eyebrow | .btn .btn--primary 55h r999 Nun 700 14 up #FFC528 | - | n-wrap max2160px pad32px textLeft32; fts__wrap max2160px pad32px textLeft32 | .mmc-faq 700 17 #0B1020 icon:30px 50% rgb(29, 78, 216) | - | 18x2, 24x13 | ox0 small:0 |
| case-pandacabs | Raleway 800 44/42 -0.045em #FFFFFF | Raleway 300 30/33 -0.028em #FFFFFF | 1 | italic 600 #FFC528 | 12px 700 0.140em up #FFC528 dash:n .pfc__eyebrow | .btn .btn--primary 55h r999 Nun 700 14 up #FFC528 | - | - | .c2-faq__list 800 17 #0F1E5E icon:none | - | 14px 14px 0px 0pxx1, 14x5, 28x2, 22x3 | ox0 small:0 |
| loc-thane | Raleway 700 31/33 -0.035em #FFFFFF | Raleway 800 28/29 -0.040em #0F1E5E | 3 | italic 600 #1D4ED8 | 12px 700 0.220em up #FFFFFF/0.72 dash:y .eyebrow | .btn .btn--primary 55h r999 Nun 700 14 up #FFC528; .s2-btn 52h r999 Nun 800 16 no #1D4ED8; .s2-btn .s2-btn--sun 52h r999 Nun 800 16 no #FFC528 | - | s2-wrap max1360px pad16px textLeft16 | .s2-wrap 800 15 #16329E icon:none | - | 22x4, 0x1, 14x3 | ox0 small:0 |
| about | Raleway 700 29/31 -0.035em #FFFFFF | Raleway 800 28/30 -0.015em #0E1626 | 5 | italic 600 #1D4ED8 | 12px 700 0.220em up #FFFFFF/0.72 dash:y .eyebrow | .btn .btn--primary 55h r999 Nun 700 14 up #FFC528 | - | container max2160px pad32px textLeft32; n-wrap max2160px pad32px textLeft32 | .mmc-faq 700 17 #0B1020 icon:30px 50% rgb(29, 78, 216) | - | 22x4, 0x1, 14x4 | ox0 small:0 |
| careers | Raleway 800 40/39 -0.040em #FFFFFF | Raleway 800 30/30 -0.038em #0B1020 | 2 | italic 600 #FFC528 | 12px 800 0.200em up #5B6478 dash:y .n-eyebrow | .btn .btn--primary 55h r999 Nun 700 14 up #FFC528 | - | n-wrap max2160px pad32px textLeft32 | .mmc-faq 700 17 #0B1020 icon:30px 50% rgb(29, 78, 216) | - | 0x1, 20x1, 18x4, 16x4 | ox0 small:0 |
| contact | Raleway 700 31/33 -0.035em #FFFFFF | Raleway 800 30/30 -0.038em #0B1020 | 1 | italic 600 #1D4ED8 | 12px 700 0.220em up #FFFFFF/0.72 dash:y .eyebrow | .btn .btn--primary 55h r999 Nun 700 14 up #FFC528; .cx-btn 50h r999 Nun 700 14 up #FFC528 | - | n-wrap max2160px pad32px textLeft32 | .mmc-faq 700 17 #0B1020 icon:30px 50% rgb(29, 78, 216) | 52h b1px #0B1020/0.18 r14 16px | 18x1, 24x1, 22x6 | ox0 small:8 |
| guides | Raleway 700 29/31 -0.035em #FFFFFF | Raleway 800 30/30 -0.038em #0B1020 | 3 | italic 600 #1D4ED8 | 12px 700 0.220em up #FFFFFF/0.72 dash:y .eyebrow | .btn .btn--primary 55h r999 Nun 700 14 up #FFC528 | - | n-wrap max2160px pad32px textLeft32 | .mmc-faq 700 17 #0B1020 icon:30px 50% rgb(29, 78, 216) | - | 18x4, 20x3, 22x1 | ox0 small:1 |
| tools | Raleway 700 31/33 -0.035em #FFFFFF | Raleway 800 30/30 -0.038em #0B1020 | 2 | italic 600 #1D4ED8 | 12px 700 0.220em up #FFFFFF/0.72 dash:y .eyebrow | .btn .btn--primary 55h r999 Nun 700 14 up #FFC528 | - | n-wrap max2160px pad32px textLeft32 | .mmc-faq 700 17 #0B1020 icon:30px 50% rgb(29, 78, 216) | - | 18x4, 22x10 | ox0 small:0 |
| tool-ltv | Raleway 700 24/25 -0.028em #FFFFFF | Raleway 800 20/22 -0.022em #131A2E | 5 | italic 600 #FFC528 | 12px 700 0.140em up #FFC528 dash:n .pfc__eyebrow | .btn .btn--primary 55h r999 Nun 700 14 up #FFC528 | - | tl-wrap max2160px pad32px textLeft32; tx__wrap max820px pad32px textLeft32 | .tl-groups 700 13 #131A2E icon:7.8125px 0px rgb(29, 78, 216) | 45h b0px #131A2E r0 16px |  | ox0 small:8 |
| audit | Raleway 700 31/33 -0.035em #FFFFFF | Raleway 800 30/30 -0.038em #0B1020 | 2 | italic 600 #1D4ED8 | 12px 700 0.220em up #FFFFFF/0.72 dash:y .eyebrow | .btn .btn--primary 55h r999 Nun 700 14 up #FFC528 | - | n-wrap max2160px pad32px textLeft32 | .mmc-faq 700 17 #0B1020 icon:30px 50% rgb(29, 78, 216) | - | 20x1, 16x7, 14x3 | ox0 small:0 |
| pricing | - | Raleway 800 26/29 -0.015em #0E1626 | 2 | - | - | - | - | pc-wrap max1280px pad16px textLeft16 | .pc-rc-stage 800 17 #0E1626 icon:none | 48h b1px #0F1E5E/0.14 r999 16px |  | ox0 small:0 |
| woo | Raleway 700 31/33 -0.035em #FFFFFF | Raleway 800 28/29 -0.040em #0F1E5E | 3 | italic 600 #1D4ED8 | 12px 700 0.220em up #FFFFFF/0.72 dash:y .eyebrow | .btn .btn--primary 55h r999 Nun 700 14 up #FFC528; .s2-btn 52h r999 Nun 800 16 no #1D4ED8; .s2-btn .s2-btn--sun 52h r999 Nun 800 16 no #FFC528 | - | s2-wrap max1360px pad16px textLeft16 | .s2-wrap 800 15 #16329E icon:none | - | 22x5, 0x1, 14x3 | ox0 small:0 |

### After, 390

| page | h1 | h2 (first) | h2 variants | em accent | eyebrow | primary button | focus ring | container (text left / max) | FAQ | input | img radius | overflow / small targets |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| home | Raleway 800 41/43 -0.036em #FFFFFF | Raleway 800 30/33 -0.028em #0F1E5E | 3 | italic 600 #FFC528 | 12px 700 0.080em up #16329E dash:n .hn-eyebrow | .btn .btn--primary 55h r999 Nun 700 14 up #FFC528; .hv-cl__btn 44h r50% Nun 400 17 no #FFFFFF | - | hn-wrap max1640px pad19.5px textLeft20; wk__head max1640px pad19.5px textLeft20 | .hv2-how__list 400 17 #0B1020 icon:12px 0px rgb(11, 16, 32) | 48h b1px #0B1020/0.18 r14 16px | 22x3 | ox0 small:0 |
| svc2-meta | Raleway 700 31/33 -0.035em #FFFFFF | Raleway 800 28/29 -0.038em #0F1E5E | 3 | italic 600 #1D4ED8 | 12px 700 0.220em up #FFFFFF/0.72 dash:y .eyebrow | .btn .btn--primary 55h r999 Nun 700 14 up #FFC528; .s2-btn 52h r999 Nun 700 14 up #FFC528; .s2-btn .s2-btn--sun 52h r999 Nun 700 14 up #FFC528 | - | s2-wrap max2160px pad16px textLeft16 | .s2-wrap 800 15 #16329E icon:none | - | 22x16, 0x1, 14x3 | ox0 small:0 |
| classic-industries | Raleway 700 29/31 -0.035em #FFFFFF | Raleway 800 30/30 -0.038em #0B1020 | 4 | italic 600 #1D4ED8 | 12px 700 0.220em up #FFFFFF/0.72 dash:y .eyebrow | .btn .btn--primary 55h r999 Nun 700 14 up #FFC528 | - | n-wrap max2160px pad32px textLeft32; bt__wrap max2160px pad32px textLeft32 | .mmc-faq 700 17 #0B1020 icon:30px 50% rgb(29, 78, 216) | - | 18x13, 20x3, 22x2 | ox0 small:1 |
| ind-skincare | Raleway 700 31/33 -0.035em #FFFFFF | Raleway 800 28/29 -0.038em #0F1E5E | 3 | italic 600 #1D4ED8 | 12px 700 0.220em up #FFFFFF/0.72 dash:y .eyebrow | .btn .btn--primary 55h r999 Nun 700 14 up #FFC528; .s2-btn 52h r999 Nun 700 14 up #FFC528; .s2-btn .s2-btn--sun 52h r999 Nun 700 14 up #FFC528 | - | s2-wrap max2160px pad16px textLeft16 | .s2-wrap 800 15 #16329E icon:none | - | 22x5, 0x1, 14x7 | ox0 small:0 |
| whitelabel | Raleway 700 31/33 -0.035em #FFFFFF | Raleway 800 28/29 -0.038em #0F1E5E | 3 | italic 600 #1D4ED8 | 12px 700 0.220em up #FFFFFF/0.72 dash:y .eyebrow | .btn .btn--primary 55h r999 Nun 700 14 up #FFC528; .s2-btn 52h r999 Nun 700 14 up #FFC528; .s2-btn .s2-btn--sun 52h r999 Nun 700 14 up #FFC528 | - | s2-wrap max2160px pad16px textLeft16 | .s2-wrap 800 15 #16329E icon:none | - | 22x5, 0x1, 14x3 | ox0 small:0 |
| register | Raleway 700 31/33 -0.035em #FFFFFF | Raleway 800 30/30 -0.038em #0B1020 | 3 | italic 600 #1D4ED8 | 12px 700 0.220em up #FFFFFF/0.72 dash:y .eyebrow | .btn .btn--primary 55h r999 Nun 700 14 up #FFC528; .wlr-btn 52h r999 Nun 700 14 up #16329E | - | n-wrap max2160px pad32px textLeft32 | .wlr-preview 700 14 #16329E icon:none | 24h b2px #767676 r0 16px |  | ox0 small:4 |
| work | Raleway 700 38/40 -0.030em #0B1020 | Raleway 800 30/30 -0.038em #0B1020 | 3 | italic 400 #16329E | 13px 700 0.060em up #16329E dash:y .cw-hero__eyebrow | .btn .btn--primary 55h r999 Nun 700 14 up #FFC528 | - | n-wrap max2160px pad32px textLeft32; fts__wrap max2160px pad32px textLeft32 | .mmc-faq 700 17 #0B1020 icon:30px 50% rgb(29, 78, 216) | - | 18x2, 24x13 | ox0 small:0 |
| case-pandacabs | Raleway 800 44/42 -0.045em #FFFFFF | Raleway 300 30/33 -0.028em #FFFFFF | 1 | italic 600 #FFC528 | 12px 700 0.140em up #FFC528 dash:n .pfc__eyebrow | .btn .btn--primary 55h r999 Nun 700 14 up #FFC528 | - | - | .c2-faq__list 700 17 #0F1E5E icon:30px 50% rgb(29, 78, 216) | - | 14px 14px 0px 0pxx1, 14x5, 28x2, 22x3 | ox0 small:0 |
| loc-thane | Raleway 700 31/33 -0.035em #FFFFFF | Raleway 800 28/29 -0.038em #0F1E5E | 3 | italic 600 #1D4ED8 | 12px 700 0.220em up #FFFFFF/0.72 dash:y .eyebrow | .btn .btn--primary 55h r999 Nun 700 14 up #FFC528; .s2-btn 52h r999 Nun 700 14 up #FFC528; .s2-btn .s2-btn--sun 52h r999 Nun 700 14 up #FFC528 | - | s2-wrap max2160px pad16px textLeft16 | .s2-wrap 800 15 #16329E icon:none | - | 22x4, 0x1, 14x3 | ox0 small:0 |
| about | Raleway 700 29/31 -0.035em #FFFFFF | Raleway 800 28/30 -0.015em #0E1626 | 5 | italic 600 #1D4ED8 | 12px 700 0.220em up #FFFFFF/0.72 dash:y .eyebrow | .btn .btn--primary 55h r999 Nun 700 14 up #FFC528 | - | container max2160px pad32px textLeft32; n-wrap max2160px pad32px textLeft32 | .mmc-faq 700 17 #0B1020 icon:30px 50% rgb(29, 78, 216) | - | 22x4, 0x1, 14x4 | ox0 small:0 |
| careers | Raleway 800 40/39 -0.040em #FFFFFF | Raleway 800 30/30 -0.038em #0B1020 | 2 | italic 600 #FFC528 | 12px 800 0.200em up #5B6478 dash:y .n-eyebrow | .btn .btn--primary 55h r999 Nun 700 14 up #FFC528 | - | n-wrap max2160px pad32px textLeft32 | .mmc-faq 700 17 #0B1020 icon:30px 50% rgb(29, 78, 216) | - | 0x1, 20x1, 18x4, 16x4 | ox0 small:0 |
| contact | Raleway 700 31/33 -0.035em #FFFFFF | Raleway 800 30/30 -0.038em #0B1020 | 1 | italic 600 #1D4ED8 | 12px 700 0.220em up #FFFFFF/0.72 dash:y .eyebrow | .btn .btn--primary 55h r999 Nun 700 14 up #FFC528; .cx-btn 50h r999 Nun 700 14 up #FFC528 | - | n-wrap max2160px pad32px textLeft32 | .mmc-faq 700 17 #0B1020 icon:30px 50% rgb(29, 78, 216) | 52h b1px #0B1020/0.18 r14 16px | 18x1, 24x1, 22x6 | ox0 small:8 |
| guides | Raleway 700 29/31 -0.035em #FFFFFF | Raleway 800 30/30 -0.038em #0B1020 | 3 | italic 600 #1D4ED8 | 12px 700 0.220em up #FFFFFF/0.72 dash:y .eyebrow | .btn .btn--primary 55h r999 Nun 700 14 up #FFC528 | - | n-wrap max2160px pad32px textLeft32 | .mmc-faq 700 17 #0B1020 icon:30px 50% rgb(29, 78, 216) | - | 18x4, 20x3, 22x1 | ox0 small:1 |
| tools | Raleway 700 31/33 -0.035em #FFFFFF | Raleway 800 30/30 -0.038em #0B1020 | 2 | italic 600 #1D4ED8 | 12px 700 0.220em up #FFFFFF/0.72 dash:y .eyebrow | .btn .btn--primary 55h r999 Nun 700 14 up #FFC528 | - | n-wrap max2160px pad32px textLeft32 | .mmc-faq 700 17 #0B1020 icon:30px 50% rgb(29, 78, 216) | - | 18x4, 22x10 | ox0 small:0 |
| tool-ltv | Raleway 700 24/25 -0.028em #FFFFFF | Raleway 800 20/22 -0.022em #131A2E | 5 | italic 600 #FFC528 | 12px 700 0.140em up #FFC528 dash:n .pfc__eyebrow | .btn .btn--primary 55h r999 Nun 700 14 up #FFC528 | - | tl-wrap max2160px pad32px textLeft32; tx__wrap max820px pad32px textLeft32 | .tl-groups 700 13 #131A2E icon:7.8125px 0px rgb(29, 78, 216) | 45h b0px #131A2E r0 16px |  | ox0 small:8 |
| audit | Raleway 700 31/33 -0.035em #FFFFFF | Raleway 800 30/30 -0.038em #0B1020 | 2 | italic 600 #1D4ED8 | 12px 700 0.220em up #FFFFFF/0.72 dash:y .eyebrow | .btn .btn--primary 55h r999 Nun 700 14 up #FFC528 | - | n-wrap max2160px pad32px textLeft32 | .mmc-faq 700 17 #0B1020 icon:30px 50% rgb(29, 78, 216) | - | 20x1, 16x7, 14x3 | ox0 small:0 |
| pricing | - | Raleway 800 26/28 -0.030em #0E1626 | 2 | - | - | - | - | pc-wrap max2160px pad16px textLeft16 | .pc-rc-stage 700 17 #0E1626 icon:30px 50% rgba(11, 16, 32, 0.18) | 48h b1px #0F1E5E/0.14 r999 16px |  | ox0 small:0 |
| woo | Raleway 700 31/33 -0.035em #FFFFFF | Raleway 800 28/29 -0.038em #0F1E5E | 3 | italic 600 #1D4ED8 | 12px 700 0.220em up #FFFFFF/0.72 dash:y .eyebrow | .btn .btn--primary 55h r999 Nun 700 14 up #FFC528; .s2-btn 52h r999 Nun 700 14 up #FFC528; .s2-btn .s2-btn--sun 52h r999 Nun 700 14 up #FFC528 | - | s2-wrap max2160px pad16px textLeft16 | .s2-wrap 800 15 #16329E icon:none | - | 22x5, 0x1, 14x3 | ox0 small:0 |

Reading the after columns: svc2 / industry / white label / location / WooCommerce rows now show one button style (uppercase
13.5px sun), the house eyebrow, -0.038em H2 tracking, text at 81px and a sun ring in the hero; case2 shows the ring FAQ; pricing
shows the spine container, pill buttons and accordion icons; register shows the house submit chrome. The phone rows keep 16px
on dense families by design. The register "input 21h" is the hidden honeypot, not a visible field.

## Recommended canonical spec

`DESIGN-CONSISTENCY.md`: tokens (including the new `--focus-*`, `--mmc-error*`, `--field-line`, `--radius-*`, `--band-y*`,
`--h2-*`, `--ease`, `--mmc-blue-950` added to `colors_and_type.css`), type scale, buttons, chips, cards, bands, spacing, motion,
focus, forms, what each page family may and may not vary, and a new-page checklist.

## Open decisions for the owner

1. **Phone gutter.** Classic pages use 32px side padding on phones (`--shell-pad`); svc2, case2, pricing and the pre-footer use
   16px; home uses 20px. Kept as is because the pinned platform scene and snap rows were tuned at 16px. Pick one.
2. **Home spine and eyebrow** (row 15). Aligning home to 81px and the house eyebrow would make it match every other page but
   touches approved sections.
3. **Very wide screens.** svc2 and case2 now follow the full-bleed spine like the classic pages, so at 1920 the leak diagram and
   proof stage grow to about 1700px wide (checked: no overflow, pinned scene fine). If that reads too big, cap the content grids
   rather than the wrap, so the left edge still matches the hero.

## Copy inconsistencies for the copy agent

Not edited here (copy is theirs):

1. FAQ eyebrow: "Common questions" on hub and svc2 pages, "Questions" on case studies (`case2/CaseFaq.astro`). Heading pattern
   "Questions about [X]." on hubs / svc2 vs "About the [Client] work." on case studies.
2. Case-study breadcrumb starts at "Our work" (no "Home"), every other crumb starts at "Home".
3. Case-study hero secondary link "See what we built" carries a literal down-arrow character; every other secondary uses the drawn arrow.
4. Primary CTA wording: "Book a strategy call" in page bodies, "Book a call" in the nav pill and the phone bar (both fixed; fine if deliberate).
5. Private pricing hero eyebrow reads "MMC pricing model, version 4": an internal version number shown to clients.
6. svc2 pages show "Updated [date]" beside the breadcrumb; classic hubs, case studies and the register page do not.
7. Register form labels are sentence case ("Full name"), contact form labels are 12px uppercase micro-labels. Pick one voice for form labels.

## QA after the pass

- Widths 1440, 1280, 768, 390, 360 and 1920 on Meta Ads, skincare, white label, Thane, WooCommerce, Panda Cabs, register, pricing,
  home and `/industries/`: horizontal overflow 0 at every scroll step, no element escaping the viewport, no console errors.
- Pinned scene (svc2 `.s2-work`), checked in a single tab at 1440, 1280 and 768 plus 360 and 1920: steps advance 1 to 5 (1 to 4 on
  white label), the stage holds at its sticky top (200 / 150 / 84px) and releases with the section; the stage bottom never passes
  the section bottom (overlap -64 to -226px). Release screenshots `qa*-pin-*`.
- Keyboard: 26 to 42 focusables per page tabbed at 1440 and 390; every one shows a 3px ring, sun on the hero, ink bands, the photo
  close and the pre-footer, blue on paper and white.
- FAQ, "Read the full guide", case FAQ and pricing terms toggled open and closed: icon goes plus to minus, ring turns blue.
- Reduced motion: new transitions (buttons, FAQ icons, pricing accordions) are switched off under `prefers-reduced-motion`.
- Build to the scratch `out/consistency`: 125 pages. `node tools/v2-check.mjs`: 0 failures. `node tools/pricing-leak-check.mjs`:
  1819 assertions, 0 failures. `node tools/style-lint.mjs`: strict files clean, no hard errors.
- Not tested: real touch devices, Safari / Firefox, the cookie banner overlap (hidden during runs), the AI FAB panel open state,
  the register form's server error state (needs the live endpoint).

## Lint, today

`node tools/style-lint.mjs` -> strict files clean; legacy warnings: hex 258, ease 25, tap 14, font 23. Top legacy drift:
`tools.css` 46, `ai-by-mmc.css` 30, `dc.css` 21, `pm.css` 20, `hb-article.css` 16, then `FreeToolsStrip`, `LinkStrip` and
`ToolExplainer` (font named directly in `<style>` blocks).

Also noticed: `package.json` scripts `check:consistency` and `check:build` call `tools/consistency-check.mjs`, which does not exist.

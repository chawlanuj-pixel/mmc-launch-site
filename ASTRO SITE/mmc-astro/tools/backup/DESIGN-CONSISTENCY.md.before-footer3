# MMC design consistency spec

The single reference for how a page on mondaymarketing.company looks and behaves, so every page family reads as one product.
Measured from the approved pages (the classic hub template, the service-page hero, the homepage, the Meta Ads svc2 page) and the
tokens in `src/styles/design-system/colors_and_type.css`. The audit behind it is `V2-CONSISTENCY-AUDIT.md` (same folder).

Fixed by owner rule and never restyled here: the nav pill and menu (`NavMenu.tsx`, `shell.css`), the service-page hero
(`src/components/hub/Hero.astro`, `page-hero.css`), the footer, and the homepage hover sections (`#clients` brand pager, Disciplines).

Enforced by `node tools/style-lint.mjs` (see the end of this file).

---

## 1. Tokens

Use `var(--token)`. Never paste the hex. Family files may alias a token (`--s2-blue: var(--mmc-blue)`); they may not restate its value.

| Role | Token | Value |
|---|---|---|
| Royal blue (brand, links, focus on light) | `--mmc-blue` / `--n-blue` | #1D4ED8 |
| Deep royal (button text, pressed, crumb links) | `--mmc-blue-700` / `--n-blue-d` | #16329E |
| Ink (dark bands, headings in new families) | `--mmc-blue-900` / `--n-ink` | #0F1E5E |
| Deepest ink (photo shades) | `--mmc-blue-950` | #0A1546 |
| Blue tints | `--mmc-blue-300`, `--mmc-blue-100`, `--mmc-blue-50` | #6E8FE6, #E3EAFC, #F1F5FE |
| Sun yellow (primary CTA, accents on dark, focus on dark) | `--mmc-yellow` / `--n-sun` | #FFC528 |
| Sun tints | `--mmc-yellow-700/300/100/50` | #D69A00, #FFDA73, #FFF1CC, #FFF9E8 |
| Paper (default ground) | `--mmc-paper` / `--n-paper` | #FBFAF6 |
| White band | `--mmc-white` / `--n-white` | #FFFFFF |
| Surface (quiet panels) | `--mmc-surface` | #F7F8FA |
| Text | `--mmc-text` (body copy colour on paper), `--n-fg` (headings, classic) | #0E1626, #0B1020 |
| Secondary text | `--n-fg-2` | #47506A |
| Muted text, eyebrow on light | `--n-fg-3` | #5B6478 |
| Hairlines | `--n-line` (rows), `--n-line-2` / `--field-line` (field borders, FAQ rings) | rgba(11,16,32,.10 / .18) |
| Dark ground recipe | `--grad-ink` (+ `.ink-ground` for the drifting glow) | gradient |
| Error / success | `--mmc-error`, `--mmc-error-bg`, `--mmc-success`, `--mmc-success-bg` | #B3261E, #FFF8F8, #1B7A3D, #E3F6E9 |

Platform recreations are the one exception: Meta, Google, Amazon, Shopify, WhatsApp, Blinkit, Zepto and Instamart mock-ups
(`src/components/svc2/panels`, `src/components/svc2/visuals`, the `.s2-ui` window chrome) reproduce the real interface colours.
They are allowlisted in the lint and must carry the "illustrative recreation" caption.

## 2. Type

Raleway (`--font-display`) for headings, Nunito (`--font-body`) for everything else. No other face, ever. Always write the
family as `var(--font-display)` / `var(--font-body)`.

| Element | Spec |
|---|---|
| H1 (page heroes other than the fixed service hero) | Raleway 800, tracking -0.035em to -0.045em, line-height 0.94 to 1.04 |
| H2, display | `var(--h2-size)` = clamp(30px, 4.6vw, 66px), Raleway 800, line-height 1.0 to 1.02, `var(--h2-track)` = -0.038em, `text-wrap: balance` (`.n-h2`) |
| H2, compact (split layouts, tool pages) | `var(--h2-size-sm)` = clamp(28px, 3.1vw, 46px), same weight and tracking |
| Italic accent inside a heading | `<em>` or `.n-serif`: Raleway italic 600, tracking -0.01em, royal blue on light, sun on ink. One accent phrase per heading, at the end |
| H3 | Raleway 800, clamp(19px, 1.9vw, 26px) for cards, up to 40px for chapter titles, tracking -0.02em to -0.035em |
| Body | Nunito 400, 16 to 18px, line-height 1.55 to 1.7, `--n-fg-2` or `--mmc-body`, max 58 to 68ch |
| Lede | Nunito 400 to 600, clamp(16px, 1.5vw, 20px), line-height 1.5 to 1.6 |
| Eyebrow | `.n-eyebrow`: Nunito 800, 12px (11px allowed in dense furniture), tracking 0.2em, uppercase, `--n-fg-3` on light, sun on ink, with a 26 x 1.5px rule in `currentColor` before it |
| Small label inside a card (meta, tags) | Nunito 800, 12px, tracking 0.08em to 0.1em, uppercase, `--mmc-blue-700`. Not an eyebrow: no rule |

## 3. Buttons and links

All buttons are pills (`--radius-pill`). One filled button per screen.

| Kind | Spec | Classes |
|---|---|---|
| Primary | Sun fill, `--mmc-blue-700` text, Nunito 700 13.5px, tracking 0.06em, uppercase, padding 16px 26px (52 to 55px tall), arrow after the label. Hover: lift 1px plus a soft sun shadow, arrow grows. Same on paper, white and ink grounds | `.btn.btn--primary` (+ `glow-btn` in heroes), `.s2-btn`, `.cx-btn`, `.pc-btn--primary` |
| Submit inside a white form card | The primary chrome in `--mmc-blue-700` with white text (hover `--mmc-blue`) | `.cx-form .cx-btn`, `.wlr-btn`, audit modal submit |
| Secondary | Text link in the primary's type (uppercase 13.5px 700), underline or drawn arrow; or the ghost pill (transparent, blue text, 1px rgba(blue, .18) border, hover border blue) | `.btn--link`, `.btn--ghost`, `.s2-cta__link`, `.wlr-btn--ghost` |
| Tool controls (steppers, add, copy, print) | Pill, 1.5px blue outline, Nunito 800 14px sentence case, 44px minimum | `.pc-btn`, calculator controls |
| Inline text link | Royal blue, underline offset 3px in body copy; card "go" links are Nunito 800 14 to 15px blue-700 with an arrow that slides 4px on hover | `.s2-link`, `.s2-card__go`, `.c2-textlink` |
| Chips (filters, related links) | 44px tall pill, 1 to 1.5px hairline, white fill, Nunito 800 13.5 to 15px sentence case; hover border blue | `.s2-chips a`, `.c2-chips a`, `.wlr-chip span`, `.cx-chip` |
| Tags on media (Calculator, Guide, D2C) | Small white pill, Nunito 800 11 to 12px uppercase, not interactive | `.s2-card__pic i`, `.c2-pill` |

## 4. Focus

Every interactive element shows a visible ring on keyboard focus.

`outline: var(--focus-w) solid var(--focus-color); outline-offset: var(--focus-offset);` (3px, royal blue, 3px offset) on paper
and white grounds; `var(--focus-color-dark)` (sun) on ink, blue and photo grounds, including the hero and the pre-footer.
Never sun on white (under 2:1) and never blue on ink. Form fields use the field focus instead: border `--mmc-blue` plus
`box-shadow: 0 0 0 4px rgba(var(--mmc-blue-rgb), .14)`.

## 5. Cards, media, radii, shadows

| Piece | Radius | Notes |
|---|---|---|
| Cards, tiles, timeline photos, form cards | `--radius-card` 22px | 1px hairline (`rgba(var(--mmc-ink-rgb), .12)`), white or paper fill, no shadow at rest; hover lifts 4px with `0 16px 34px -18px rgba(15,30,94,.45)` |
| Large feature media (answer photo, leak diagram, case panels, pager cards) | `--radius-media` 28px | soft long shadow allowed |
| Inner pieces (thumbnails in cards, inputs, rate-card rows) | `--radius-in` 14px | |
| Small labels | `--radius-tag` 8px or a pill | |

## 6. Bands and spacing

Pages are a sequence of full-bleed bands. Grounds: paper (default), white, ink (`--grad-ink` or `--mmc-blue-900`), sun (rare,
one per page at most). Alternate paper and white; never two ink bands in a row except a photo close followed by the pre-footer.

| | Spec |
|---|---|
| Container | `max-width: var(--shell-max)`; `padding-inline: var(--shell-pad)` (two gutters, 80px at 1440). Copy lines up with the nav logo and the hero copy. Dense families (svc2, case2, pricing) keep a 16px phone gutter below 721px; the classic `.n-wrap` uses `--shell-pad` (32px) on phones |
| Text measure | prose `--measure` (68ch); headline groups `--measure-wide` (900px) or 1100px |
| Section padding | chapter band `var(--band-y)` = clamp(64px, 8vw, 128px); dense band `var(--band-y-tight)` = clamp(48px, 6vw, 88px) |
| Head to content | clamp(22px, 3vw, 40px) |

## 7. Recurring patterns

- **Breadcrumb**: Nunito 14px, links `--mmc-blue-700` 700 weight with 44px tap height, "/" separators in `--n-fg-3` with 10px
  space, current page `--n-fg` 700. Shared component `src/components/shared/Breadcrumb.astro`; svc2 and case2 restate it inline.
- **FAQ accordion**: `src/components/hub/Faq.astro` + `faq.css` is the baseline. Native `<details>`; eyebrow "Common questions";
  heading "Questions about [X]." with the accent on the topic; hairline rows; question Raleway 700 clamp(17px, 1.6vw, 21px)
  tracking -0.015em; answer Nunito 16px/1.65 `--n-fg-2`, max 68ch; a 30px hairline ring with a 12px blue plus that becomes a
  minus when open, ring turns blue on hover and open. `.s2-faq`, `.c2-q`, `.pc-rc`/`.pc-term` and the svc2 "Read the full guide"
  disclosure all use this icon.
- **Closing CTA band**: the shared pre-footer (`PreFooterCta.astro`, `.pfc`) closes every page above the footer: ink ground,
  sun eyebrow, two-part heading with a sun italic accent, a primary button and an uppercase secondary link. A family may add one
  photo close before it (svc2 `.s2-cta`) using the same button pair.
- **Forms**: label above the field (Nunito 700, 13 to 14.5px sentence case on long forms; 12px uppercase 0.1em allowed on short
  ones); field 48px minimum, 1.5px `--field-line` border, `--radius-in`, Nunito 500 16px (16px stops iOS zoom); field focus as in
  section 4; error = `--mmc-error` border and message with `--mmc-error-bg` fill, message under the field with an icon; required
  fields marked in words or an asterisk, consistently within a form.
- **Motion**: `var(--ease)` (cubic-bezier(.22,.61,.36,1)) for UI, `var(--ease-out)` for reveals and button lifts; durations
  `--dur-quick` 180ms (hover, colour), `--dur-base` 280ms (state change), 800 to 900ms (scroll reveal). Reveals only translate
  up to 26px, always finish, and are switched off by `prefers-reduced-motion`. No transforms on text blocks on phones.
- **Tap targets**: 44 x 44px minimum for anything interactive on touch, including crumb links, chips, FAQ rows, pins and steppers.

## 8. Page families: what may vary

| Family | Files | May vary | Must not vary |
|---|---|---|---|
| Home | `HeroClean`, `home-v2b.css`, `home-v2c.css`, `hero-clean.css` | One-screen fit rules, its wider column (`--hv-pad`), the approved hover sections and their `hn-eyebrow` | Buttons, focus, fields, accent, FAQ icon |
| Service, industry, white-label, location, WooCommerce (svc2) | `src/components/svc2`, `svc2.css`, `src/data/svc2/*.json` | The seven-section order, the pinned platform scene, the leak diagram, the compact H2 on split sections, 16px phone gutter | Eyebrow, H2 tokens, buttons, focus, crumb, FAQ, container from 721px |
| Classic hub (`/industries/`, `/guides/`, `/resources/`, b2b, education) | `[...slug].astro`, hub components, `home26.css` | Section mix | Everything in sections 1 to 7 (it defines them) |
| Case studies (case2) | `src/components/case2`, `case2.css` | Big hero, facts strip, showcase chapters, the client artwork grounds | As svc2 |
| Register (white label) | `register.astro`, `RegisterApp.jsx`, `register.css` | Two-step form, sentence-case labels | Buttons, field style, error colour, focus |
| Pricing (private) | `pricing-model/[token].astro`, `src/islands/pricing`, `pricing.css` | Dense tool layout, sticky summary, compact H2, tool-control buttons | Primary button, focus, eyebrow, accordion icon, field style, container from 768px |
| Older pages (about, careers, contact, guides, tools, glossary, audit) | their own CSS | Hero treatments | Sections 1 to 7 when next touched |

## 9. New-page checklist

1. Build on `BaseLayout` + `Shell`; the hero is either the fixed service hero or a family hero listed above.
2. Wrap content in `.n-wrap` (or the family wrap that aliases `--shell-max` / `--shell-pad`).
3. Bands from the band classes; alternate paper and white; `var(--band-y)` or `var(--band-y-tight)`.
4. Every section head is `.n-eyebrow` + `.n-h2` with one italic accent.
5. One primary (sun) button per screen; secondaries are uppercase links or ghost pills.
6. FAQ from `Faq.astro`; closing band from `PreFooterCta.astro`.
7. Colours, fonts, radii, easing only through tokens.
8. Every text block has a literal image, scene or recreated interface (with the illustrative note for platforms).
9. Tab through the page: a ring on everything, blue on light, sun on dark. Check 1440, 1180, 820, 390 and 360, the pinned
   states, reduced motion, and no horizontal scroll.
10. Run `node tools/style-lint.mjs`; it must end with "No hard errors."

## 10. The lint

`node tools/style-lint.mjs` scans `src/styles/*.css` and every `<style>` block in `src/components`, `src/pages` and
`src/layouts`. It reports, ranked by file:

- **font**: a family named directly instead of `var(--font-*)` (warning); a face other than Raleway, Nunito or a generic fallback
  (hard error anywhere).
- **hex**: a colour not in the token palette (warning; platform mock-ups allowlisted).
- **ease**: a `cubic-bezier()` literal instead of an easing token (warning).
- **tap**: `height` / `min-height` under 44px on an interactive selector outside `(hover: hover)` / `(pointer: fine)` (warning).

Hard errors (exit 1): a new font face anywhere, or any new hex / ease / tap finding in a strict file (svc2, case2, register,
pricing, hero-clean, home-v2c and the svc2 / case2 components) that is not in `tools/style-lint.baseline.json`. Legacy files
only warn (exit 0). After a reviewed exception, accept it with `node tools/style-lint.mjs --update-baseline`. Flags: `--all`
lists every legacy file, `--json` prints machine-readable output.

## Decisions taken (2026-10-12)

- **Form label voice.** Every form uses one label style: sentence case (for example "Full name", "Work email"), 14px, weight 700,
  ink colour token, above the field. Optional fields may carry "(optional)" in muted text (`--fg-3`); a visible required marker
  (`*`) appears only where a form already uses one. Helper text is 13px muted; error text is 13px in `--mmc-error`. Applied to
  contact (`.cx-f`), the audit modal (`.audit__field-label`, `.audit__err`), the home closing form (`.hv2-form`), careers apply
  (`.crp-form`), register (`.wlr-*`) and the pricing quote form (`.pc-field`, `.pc-err`). No uppercase micro-labels on forms.
- **Tools calculators keep their own UI label style**: their labels are field names inside a tool interface, not form labels.
- **"Updated" date** shows on svc2 service and industry pages only (freshness signal), not site-wide.
- **CTA wording.** The nav pill and the phone bar say "Book a call" (space-constrained UI labels); in-page primary CTAs say
  "Book a strategy call".
- **Left as approved:** the home spine / eyebrow treatment and the shared pre-footer inset.
- **Phone gutter** on svc2 and case2 pages stays 16px.
- **Focus ring.** A global `.btn:focus-visible` rule now exists in `styles.css` (design-system focus tokens; dark-ground
  families override to yellow).

## Hub pages: the hubs2 pattern (2026-10-12)

Grandeur, trust and navigation pages, not long reads: big type, large literal photos, few words per screen. Files:
`src/components/hubs2/*`, `src/styles/hubs2.css` (prefix `h2-`, every value a token), data in `src/data/hubs2/*.json`.

| Page | Hero shape | Section rhythm |
|---|---|---|
| `/services/` (`services/index.astro`) | Type-led on paper, then the menu's five groups as a full-width index strip of photos (`DirHero`) | In short with audience links, five group bands (`Group`: photo, one sentence, linked rows; Marketing goes wide in three clusters), ink "Not sure where to start?" (`StartPath`: problems, audit, calculators), work, FAQ, pre-footer |
| `/services/performance-marketing/` | Copy beside a 2 x 2 mosaic of platform scenes, each with the real mark (`.h2-plat`) | In short, four platform chapters (interface photo + illustrative note, "Use it when", link), attribution figure (`.pmc`), calculators (`Calcs`), creative filmstrip, work, FAQ |
| `/industries/` (`IndustriesHub`) | Three tall photo doors: D2C, B2B, education (`.h2-door`) | In short, sector entries grouped by audience (`Verticals`), how we start, work, FAQ |
| `/industries/d2c/`, `/b2b/`, `/education/` (`AudienceHub`) | Copy on paper, the audience's photo bleeding to the right edge, the journey in one line (`AudHero`) | In short, the journey as a numbered route (`Journey`: photo, where it leaks, what we do, service link), calculators (D2C) or the CRM to Meta CAPI loop on ink (B2B, education), work, sectors with related services, FAQ |

Rules: one H1; section heads are `.n-eyebrow` + `.n-h2` with one `.n-serif` accent; one sun button per screen; rows and doors
end in a 44px arrow ring; work tiles come only from `src/lib/work.ts` (brands with a case page, client artwork, the
`ARTWORK_LINE` caption, no counts); platform interfaces carry the illustrative note; `.h2-rv` reveals only below the fold,
always finish (3s CSS fallback) and are off for reduced motion. Visible FAQ and FAQPage JSON-LD come from one list.
The slug template switches a classic hub to hubs2 when `src/data/hubs2/<path with __>.json` exists (delete it to fall back);
title, meta, JSON-LD, FAQ and CTA still come from `src/data/hubs/<path>.json`.

## Small defects fixed (2026-10-13)

Behaviour, legibility and accessibility only; no visual redesign. Backups: `tools/backup/*.before-smalldefects`.

- **Mock-up text floor on phones.** svc2 leak diagrams and pinned-scene frames never draw text under 10px at 360 and 390 wide;
  words that name a leak (chips, chart keys, the "Illustrative" frame note) are 11px where the column allows. Five-column boards
  (`SaRankMap`, `SaSearchTerms`, `SaContentPath`, `AgencyLeak`, `WlDeliveryLeak`) follow the `SaSurfaceMap` pattern below
  440px: sentence case, no tracking, hyphenation, chips stretched to the column, `.s2-fun` side padding 8px. Pins are percentages,
  so they stay aligned. New visuals: no `font-size` under 10px in a phone media query.
- **Tap targets.** Visible size is unchanged; the clickable box grows with a transparent layer: hero `.btn--link` (`page-hero.css`),
  nav logo and "Book a call" (`::before`), the Menu pill (5px transparent border plus `background-clip: padding-box`, because it
  clips its children; hover and open states set `background-color`, not the shorthand), cookie buttons, close and toggles.
- **Menu current page.** The matching link gets `aria-current="page"`; the groups that hold it get `.is-current-group`. Cue: a
  small `--mmc-yellow` dot after the label (the menu ground is blue), underline on the current inner link. The menu opens on the
  current group with its category expanded, focus on that group (desktop primary link, phone root row).
- **Desktop menu keyboard.** Tab order is primary link, its open pane, next primary link; Shift+Tab mirrors it. Collapsed inner
  lists are `inert`. Yellow focus ring on every pane control. Escape closes and returns focus to the Menu button. Mouse
  behaviour is unchanged.
- **Bottom stack.** On the private pricing pages the cookie notice sits above the 73px summary bar (`pricing.css`), still at
  z-index 60 so an opened summary covers it. The dark pill at the bottom centre in dev screenshots is Astro's dev toolbar
  (`astro-dev-toolbar`): it is not in the built site.
- **Contrast.** Pinned-scene steps that are not in view dim to `.68` (was `.38`, 2.4:1); Meta mock "After" pill text uses
  `--mmc-blue`. Lighthouse accessibility: no colour-contrast failures on the eight audited pages.
- **Reduced motion** now also stops the active pinned-scene step's fade (`.s2-work[data-step] .s2-st`).

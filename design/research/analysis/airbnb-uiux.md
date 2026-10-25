# Airbnb as a simplicity reference: brief for MMC round 4

Prepared 15 September 2026. Airbnb (airbnb.co.in) was studied live at 1440px and 390px wide, and every number below comes from the browser's own measurements. Round 3 was reviewed from the `design/mockups/r3/` source and every preview chunk. The same measurements were run on the round 3 preview pages so the two can be compared like for like.

Evidence lives here:
- Airbnb screenshots, raw measurement dumps and a curated `measurements.json`: `scratchpad/refsites/airbnb/`
- Round 3 metrics: `scratchpad/analysis/data/r3-metrics.json`

Airbnb sits on top of 3 Minds as a reference for restraint and interaction. It replaces nothing. The things this brief never changes:
- the nav pill, the service page hero and the footer
- MMC colours, DM Sans with Cormorant Garamond italic
- the 3 Minds section structure: giant full-stop titles, a dark numbered services panel, photo work cards with slash tags, a stats band, a calendar booking block, FAQ and contact tabs
- the approved live services hover and client strip

Nothing is borrowed from Airbnb's own brand: no Rausch pink, no Cereal, no 3D icons, no maps.

---

## A. What makes Airbnb smart and simple

### 1. One filled button per screen
**Evidence.**
- Home at 1440: the only coloured control is the 48px round search button.
- Listing page: exactly one "Check availability" button on desktop and one on mobile.
- Host page: "Get started" is the only gradient button. Everything else is a #222222 pill (Let's talk, Learn about AirCover), a #F2F2F2 grey button (Show more, 132x48) or an underlined link.

**Why it works.** Colour means "do this". The visitor never has to decide which of several equal buttons matters.

### 2. The photo does the colour, the interface stays grey
**Evidence.**
- Text colours: three on home (#222222, #6C6C6C, #C1C1C1 for separators) and four on the listing page.
- The brand colour appears only on the primary action and the active nav icon.
- Surfaces are greys: #F7F7F7 bands, #F2F2F2 buttons, #EBEBEB hover, #DDDDDD image placeholders.

**Why it works.** Every piece of colour on the page belongs to the content, so the photography reads as the product.

### 3. The image is the card
**Evidence.**
- A home row card is 180x213. The image takes 180x171, which is 80% of the height.
- The card has no background, border or shadow.
- Under an 8px gap sit two lines: a 13px/16px w500 title and a 12px/16px w400 grey meta line.
- Search cards follow the same idea at 303px wide with a 4:3 image, then four short 15px/19px lines, one of them clamped with an ellipsis.

**Why it works.** People choose on the picture and use the text to confirm. Less text per card means the eye can scan more cards.

### 4. A small type scale, with tracking only on headings
**Evidence.**
- About 8 font sizes carry the home, listing and host pages.
- Letter-spacing is `normal` for every size of 18px and below.
- It tightens only as size grows: -0.18px at 20px, -0.44px at 22px, -0.96px at 32px, -1.8px at 60px, -2px on the single 100px rating number.
- Weights are 400, 500 and 600, with 700 only on host display type.
- Airbnb's CSS tokens are named by size and line height (`typography-body-text_16_20`, `titles-semibold_18_24`), which shows the scale is a closed list.

**Why it works.** Hierarchy comes from a few clear jumps in size, not from many small tweaks.

### 5. Radius follows the job an element does
**Evidence.**
- Media: 20px, used 172 times on home.
- Badges: 14px on a 26px pill.
- Controls and small surfaces: 12px (the booking card, the date group, Show more buttons). Listing bedroom photos use 8px.
- Things that float or overlay: 32px (the 66px search pill, desktop modals, and mobile sheets at 32px 32px 0 0).
- Pills and circles: fully round.

**Why it works.** The corner tells you what you are looking at before you read it.

### 6. A shadow means "this floats"
**Evidence.**
- Cards and card images have `box-shadow: none` on desktop.
- The home page uses exactly three shadow recipes: badge lift, arrow control, floating panel.
- The booking card gets `0 6px 16px rgba(0,0,0,.12)` plus a 1px #DDDDDD border.
- Modals and sheets get `0 8px 28px rgba(0,0,0,.28)`.
- The listing sub-nav gets only a 1px line shadow.

**Why it works.** Depth is kept for things that sit above the page, so depth itself carries meaning.

### 7. Rows, not walls
**Evidence.**
- Home is 3,379px tall at desktop, about 3.75 viewports.
- It is one repeated pattern: a 20px/24px w600 heading with an arrow, then 7 cards at 180px with 12px gaps. Rows sit about 297px apart.
- Mobile shows 2 cards plus a peek of the third at 165px wide.

**Why it works.** Learn the pattern once and every row reads instantly. Horizontal scrolling holds quantity without adding height.

### 8. Show a little, open the rest on demand
**Evidence.**
- The listing description stops at "The space..." with a 48px grey Show more.
- Amenities show 5 of 56, then "Show all 56 amenities" opens a 780x820 modal on desktop or a full-height sheet on mobile.
- Reviews show 6 of 36.
- Carousel dots show at most 5, with the outer dots scaled to 0.83 and 0.67.

**Why it works.** The page stays short while the depth is still one tap away.

### 9. The action follows the reader
**Evidence.**
- Listing, desktop: the booking card is `position: sticky; top: 80px` at 373px wide for the whole content column.
- A fixed 80px sub-nav (Photos, Amenities, Reviews, Location) appears by scrollY 700.
- Once the card scrolls out (scrollY 3000), that sub-nav gains a price line and a 179x48 "Check availability".
- Listing, mobile: a fixed 127px bottom bar with a 342x48 button is present at every scroll position tested (0, 800, 2000, 3500).
- Host page: the "Get started" button is fixed top right on desktop and in a bottom bar on mobile.

**Why it works.** The reader is always one glance from converting, and the content never has to repeat the button.

### 10. Search broken into plain questions
**Evidence.**
- Desktop search is an 850x66 pill with a 32px radius, split into Where, When and Who. Each has a 12px w500 label over a 14px grey placeholder.
- Focusing one segment greys the whole pill (#EBEBEB) and lifts the active segment onto white (`0 3px 12px rgba(0,0,0,.1)`). The round button grows a "Search" label.
- A panel opens about 12px below and asks one question: suggestion rows with tinted icon tiles, a Dates or Flexible toggle (150x36 chips), or 32px steppers.
- On scroll the whole thing collapses into a small "Anywhere | Anytime | Add guests" pill inside the 96px header.
- Mobile: a 342x56 "Start your search" pill opens a full-screen stack of cards. The open card is 24px radius with 24px padding. Closed cards are 56px tall at 16px radius. A sticky "Clear all | Search" footer sits at the bottom.

**Why it works.** A complex query becomes three short questions, and the collapsed pill always shows your current answers.

### 11. Same content in a modal on desktop, a sheet on mobile
**Evidence.**
- Filters open as a centred 568x820 modal with a 32px radius on desktop, and as a 390x832 bottom sheet from y=12 with a 32px 32px 0 0 radius on mobile.
- Both use a 40% dark scrim, a centred 16px w600 title with a close button, and a sticky footer.
- The footer pairs a quiet "Clear all" with a dark "Show 1,000+ places" button that updates its count live.

**Why it works.** One component, placed where each platform expects it. The button tells you the result before you press it.

### 12. Loading keeps the layout in place
**Evidence.**
- Early frames show image slots already filled with #DDDDDD at their final size and radius, while titles, prices, hearts and badges have rendered (`desktop-home-early1.jpg`).
- Maps paint flat grey before their tiles.
- No spinners and no shimmer nodes were found, even with the network throttled.

**Why it works.** Nothing jumps as content arrives, so the page feels fast.

### 13. Motion is quick and quiet
**Evidence.**
- 151 elements on home transition `transform 0.25s cubic-bezier(0.2, 0, 0, 1)`.
- Springs are stored as CSS `linear()` tokens.
- Hover effects are small: a search segment turns #EBEBEB, search cards fade in 32px photo arrows, and home row cards do not change at all.

**Why it works.** You get feedback without a show.

### 14. Predictable edges and control sizes
**Evidence.**
- Browse pages use 48px side padding.
- Listing content is 1120px wide. The host page is 1440px with 80px gutters and an 848px FAQ column.
- Mobile uses 24px gutters, giving 342px of content.
- Filter pills are always 34px tall with a 24px radius and a 1px #DDDDDD border. Icon circles are 40px (header), 32px (steppers, photo arrows) or 28px (row arrows).
- Icons are 24px.

**Why it works.** Dense content still feels orderly when every edge and control repeats.

### 15. One personal number before any explanation
**Evidence.**
- The host page H1 reads "Your home could make ₹31,528 on Airbnb" at 60px/64px w700 (-1.8px).
- A nights slider and a "Thane · Entire place · 2 bedrooms" pill (418x64, radius 40) drive the number, next to a map.
- Each later section is one centred 60px H2 with three icon features of 2 to 3 lines.
- The FAQ is a plain accordion.

**Why it works.** The page answers "is it worth it for me?" before it makes any claims.

---

## B. Round 3 critique through this lens

### System-level comparison (measured)

| Measure | Airbnb | R3 Home | R3 D2C | R3 Education | R3 Meta Ads | R3 Home mobile | R3 Edu mobile |
|---|---|---|---|---|---|---|---|
| Page height (px) | home 3,379; host 5,732; home mobile 4,069 | 10,695 | 8,614 | 9,851 | 9,710 | 10,800 | 12,271 |
| Content sections (excl. footer) | host 8 | 12 | 9 | 12 | 12 | 10 | 12 |
| Distinct font sizes | about 8 | 26 | 25 | 27 | 32 | 27 | 28 |
| Distinct letter-spacing values | 9 site-wide | 42 | 35 | 47 | 52 | 40 | 47 |
| Text colours | 3 to 4 | 20 | 18 | 19 | 24 | 18 | 18 |
| Shadow recipes | 3 (home) | 7 | 7 | 7 | 7 | 6 | 6 |
| Big 3 Minds buttons / all action labels | 1 filled CTA | 7 / 23 | 7 / 14 | 7 / 12 | 10 / 18 | 8 / 15 | 7 / 11 |
| Slash tags + chips | 1 badge per card | 18 + 33 | 12 + 20 | 6 + 20 | 6 + 16 | 9 + 23 | 6 + 14 |

The radius count is similar: Airbnb uses 13 to 17 distinct values, round 3 uses 11 to 12. The difference is discipline, not the count.
- **Airbnb:** one role gets one radius.
- **Round 3:** the same role gets several values. Photos and cards use 12, 14, 16 and 20px; buttons 4px; tags 6px; chips 50px; FAQ 14px.

Letter-spacing is the clearest single sign of noise. Round 3 applies -0.03em to -0.04em to 14 to 20px body text (`.x-label`, card descriptions, service descriptions, FAQ questions), then adds many one-off values on top.

### Homepage, desktop

1. **The hero has four focal points competing** (`Main-1.jpg`):
   - the H1
   - two reel tiles
   - a floating ₹248Cr card overlapping the reels, with its own "Explore the work" link
   - the "Ready to grow? Say hi" chat bubble over the hero's bottom edge

   The paragraph runs about 280 characters and includes a client list. There are three actions (two buttons plus a link). Airbnb's hero has one field and one button.
2. **The client strip is the wrong component, and it repeats the next title** (`Main-1.jpg`). Round 3 shows a static 80px logo line labelled "Selected work / Impact created for" instead of the approved live hover strip (`clients-strip.jsx`, `NClients`). "Selected work" also duplicates "Our Work." directly below it.
3. **Work cards carry seven elements each** (`Main-1.jpg`): three slash tags, a 20px description, labelled "Audience" and "What we ran" fields, and a VIEW PROJECT button.
   - Six cards produce 18 tags and 6 identical buttons.
   - "What we ran" repeats the tags (Website · Ads · Creative).
   - The image is 660x430 (1.53:1). Only about 60% of each card's height is photo, against 80% on Airbnb.
4. **The Focus section repeats Services** (`Main-2.jpg`). It has two photo panels, each with an eyebrow pill, headline, 4 to 5 chips and a button. Meta & Google, Amazon, Shopify and Retention already appear in the services rows and the hero copy.
5. **The dark services panel doesn't have the approved hover behaviour** (`Main-2.jpg`). Each row carries eight elements: number, italic word, title, description, "Categories" label, 3 to 6 chips, a "2+" counter and an arrow circle. The italic word repeats the title ("Media" / "Performance media"). Per the constraints, round 4 inserts the live `NCapabilities` hover peek unchanged, so only its surroundings are addressed in C.
6. **There are five conversion surfaces in the last 40% of the page** (`Main-2.jpg` to `Main-4.jpg`):
   - the calendar block (Schedule consultation)
   - the FAQ's "Let us know"
   - the contact form (Submit request)
   - the footer's "Book a call"
   - the chat bubble

   The calendar block ("Your numbers. Our senior team. Let's talk.") and the "Get in touch" tabs do the same job twice.
7. **Surfaces are nested** (`Main-3.jpg`). Latest insights sits inside a white 20px card that itself sits on paper, and each insight carries a "Read more" pill. Airbnb never puts a card inside a card on browse pages.
8. **Content comes after the final CTA** (`Main-4.jpg`). A 371-character "Our approach is simple" paragraph sits between the contact form and the footer. The founder cards are two [PHOTO] placeholders.
9. **Shadows fight the calm** (`Main-1.jpg`, `Main-3.jpg`):
   - `rgba(0,0,0,.9) 0 40px 80px -40px` on the reels
   - `.85` on the stat card
   - a blue glow on the chat bubble
   - a separate calendar card shadow

   That is seven recipes where Airbnb uses three.

### D2C hub

1. **The hero repeats the homepage hero pattern** (`D2C-1.jpg`): a breadcrumb, an eyebrow pill with a revenue band, the H1, a 180-character paragraph, two buttons, and a floating "Monday scorecard" over two photos. Three layers of context sit above the headline.
2. **Two numbered lists run back to back** (`D2C-1.jpg`). "Leaks." shows six white cards numbered 01 to 06, and "Services." follows immediately with five dark rows numbered 01 to 05. Problem and solution are split into two sections that each ask the reader to count.
3. **Work cards keep the seven-element anatomy and the repeated VIEW PROJECT buttons** (`D2C-2.jpg`).
4. **The stats band is the homepage band, reordered** (`D2C-2.jpg`). It sits right before a Scorecard with a definitions list, a table and a 12-bar chart. That makes three data visuals on one page: the hero card, the band and the scorecard.
5. **Plans has three identical "Talk to us" buttons** (`D2C-3.jpg`). The calendar block below is a copy of the homepage one, and the FAQ adds "Ask us on WhatsApp". That is 14 action labels in 8,614px. The page has no testimonial or quote at all.

### Education landing page

1. **The segment pills are Airbnb-like but inert** (`Education-1.jpg`). "Choose your institute" offers six 44px pills in a static row. Nothing on the page responds, it does not stick, and "Selling to schools" is a different kind of buyer mixed into the same bar.
2. **Journey is dense and then repeated** (`Education-1.jpg`). Six cards about 190px wide each carry a number circle, a 24px title, a 15px description and a "We track" metric, under a decorative gradient rail. The dark services panel right after repeats the same stages (Websites, Follow-up, Counsellors) as six more rows.
3. **Four dark surfaces sit on one page** (`Education-2.jpg`, `Education-3.jpg`): the services panel, the "Selling to schools" panel, the stats band, and the calculator result panel. The stats band holds descriptors rather than proof (6 institute playbooks, 12mo admissions calendar, 1 team).
4. **Calendar and calculator are two sections for one decision** (`Education-2.jpg`, `Education-3.jpg`). The calendar is a Gantt inside a nested white card with its own button. The calculator shows six sample inputs and a separate "Open the calculator" button, so the tool is shown but cannot be used.
5. **Compliance is a section that should be an FAQ answer** (`Education-3.jpg`). Three check cards titled "Compliant." precede the FAQ.
6. **The page runs 12 sections, 27 font sizes and 47 letter-spacing values over 9,851px.** Testimonials are placeholders (`Education-3.jpg`).

### Service page: Meta Ads (hero and footer fixed, not critiqued)

1. **Actions are scattered because nothing follows the reader** (`Service-1.jpg` to `Service-3.jpg`). There are 18 action labels, 10 of them full buttons:
   - Audit my Meta account (twice), See packages (twice)
   - See the creative work, Meet the team, All D2C work, View project (twice)
   - Start with Spark, Compound and Scale
   - Let us know, Open calculator

   Airbnb's listing has one button that stays with you.
2. **Decoration without information** (`Service-2.jpg`). "A creative engine that never waits for a brief" is a collage of three offset reels with a floating Test log card. It repeats pillar 02 in the dark panel directly above it.
3. **Timeline chrome** (`Service-2.jpg`). "Month one." wraps four 200px cards in 56px week pills and a gradient rail. The step content is only about 90 characters each.
4. **A placeholder block with no job** (`Service-2.jpg`). The lead quote is a [PHOTO] rectangle with a 36px bracketed quote and a "Meet the team" outline button.
5. **Dark surfaces keep alternating** (`Service-1.jpg` to `Service-3.jpg`). After the blue hero come the Pillars panel, the highlighted plan, the compare table's dark MMC column, the dark free-tool card in Related, and a closing dark CTA panel. Round 3's own count is 4 `.x-panel` blocks plus 2 other dark areas.
6. **The widest type spread in round 3** (`Service-1.jpg` to `Service-3.jpg`). The page has 32 font sizes, 52 letter-spacing values and 24 text colours. Some come from the fixed hero, which is excluded from the fixes.

### Homepage, mobile

1. **The hero is 1,040px, about 1.23 screens** (`HomeMobile-1.jpg`). Two full-width 52px buttons stack, then two reels, the ₹248Cr card and the chat bubble overlap one another. The bubble covers the card's label. Only four logos are visible before the fade.
2. **Work cards are 460px each and pile up to 1,689px** (`HomeMobile-1.jpg`, `HomeMobile-2.jpg`). Slash tags wrap and clip ("/QUICK COMMERCE" is cut off). Each card has its own full-width VIEW PROJECT button, and then an outlined VIEW ALL PROJECTS button follows. Airbnb mobile shows cards as a sideways row with a peek.
3. **The services panel runs 1,547px, with every row fully expanded** (`HomeMobile-2.jpg`, `HomeMobile-3.jpg`). This is the approved live component on the homepage, so only its neighbours are changed. Directly after it come two 470px Focus panels with chips and buttons (`HomeMobile-3.jpg`, `HomeMobile-4.jpg`).
4. **The calendar is inline** (`HomeMobile-4.jpg`). The 5-day strip and four time slots work well, but they sit in the page flow where Airbnb would open a sheet.
5. **Nothing sticks for conversion** (`HomeMobile-5.jpg`, `HomeMobile-6.jpg`). FAQ items are 100px-plus white cards. The page is 12.8 screens tall, and after the hero the only persistent action is the chat bubble.

### Education, mobile

1. **The chat bubble covers the tracker card** (`EducationMobile-1.jpg`). It hides the "Campus visits" value. The hero is 972px.
2. **Segment pills scroll sideways with a fade** (`EducationMobile-1.jpg`). This is good, but it doesn't stick and doesn't filter anything.
3. **Three long stacks** (`EducationMobile-1.jpg` to `EducationMobile-4.jpg`): the Journey timeline (1,168px), the services panel (1,748px) and Work plus the schools panel (1,726px). Together they take about 38% of a 12,271px page.
4. **The calendar is unreadable at 390px** (`EducationMobile-4.jpg`, `EducationMobile-5.jpg`). It uses single-letter month labels at 11px and 14px bars, and "Aug to Se" is clipped.
5. **Too many look-alike blocks near the end** (`EducationMobile-5.jpg` to `EducationMobile-7.jpg`):
   - the calculator card with sample inputs and its own button
   - a video plus quote placeholder
   - three compliance cards
   - FAQ
   - a contact block with a 2x2 grid of 44px role pills

   That is 14.5 screens before the footer ends.

---

## C. Prioritised change list

The code references point at the round 3 Python files: `base.py`, `home.py`, `d2c.py`, `edu.py`, `service.py` and `mobile.py`. Each item ends with a constraint check.

### MUST

#### M1. Lock the token set in `base.py`

Add these to `CSS` and replace inline literals with them.

```
:root{
 /* radius: five values, one per role */
 --r-btn:4px;      /* 3 Minds button box and its 48px arrow square, only */
 --r-ctl:12px;     /* inputs, time slots, FAQ rows, grey buttons, icon tiles, closed sheet steps */
 --r-media:20px;   /* every photo, video, work card, focus/insight image, white container, dark panel, stats band, sticky card */
 --r-sheet:32px;   /* modals, bottom sheets (32px 32px 0 0), selector pill panel */
 --r-pill:999px;   /* chips, badges, segment pills, round icon buttons */
 /* shadow: three recipes, only for things that float */
 --sh-lift:0 0 0 1px rgba(15,30,94,.04),0 2px 6px rgba(15,30,94,.06),0 4px 8px rgba(15,30,94,.10);
 --sh-float:0 0 0 1px rgba(15,30,94,.04),0 8px 24px rgba(15,30,94,.12);
 --sh-overlay:0 8px 28px rgba(7,14,42,.28);
 --scrim:rgba(15,30,94,.40);
 /* spacing */
 --s1:4px;--s2:8px;--s3:12px;--s4:16px;--s5:24px;--s6:32px;--s7:48px;--s8:64px;--s9:96px;--s10:128px;
 /* neutrals derived from ink, so no new hues */
 --text:#0E1626; --muted:#4F5A6B; --line:rgba(15,30,94,.12); --tint:rgba(15,30,94,.05); --placeholder:rgba(15,30,94,.08);
}
```

**Radius.** Map every existing value into the five roles.
- 14px and 16px on `.x-card`, work images, focus panels, videos and plan cards become 20px.
- 12px on insight and related images becomes 20px.
- 50px on `.x-chip` becomes 999px.
- 6px on `.x-tag` becomes 999px (see S8).
- 4px time slots, `border-radius:4px` "View project" spans and 4px calendar slots become 12px.
- Keep 4px only on `.x-btn` and `.sq`.

**Shadow.**
- Delete `rgba(0,0,0,.9) 0 40px 80px -40px` (reels), `rgba(0,0,0,.85)` and `rgba(0,0,0,.8)` (hero cards), the blue chat glow `0 14px 30px -10px rgba(29,78,216,.6)`, and `0 30px 70px -40px` (calendar and calculator cards).
- Cards on paper get no shadow. White on #FBFAF6 already separates them.
- Use `--sh-lift` on photo badges and arrows, `--sh-float` on the sticky card, calendar card and active selector segment, and `--sh-overlay` on sheets and modals.

**Decoration.**
- Remove `.x-grid` from every in-page panel. The footer keeps its own texture, unchanged.
- Remove the radial glow `div` in the `hero()` functions of `home.py`, `d2c.py` and `edu.py`.
- `.x-panel` becomes the single two-stop gradient already used in the footer, or flat #0F1E5E.

**Spacing.**
- 128px between desktop sections, replacing the current 90/110/120/130 mix.
- 48px from a section title to its content, replacing 56px.
- 24px card gaps, replacing 12/16/24.
- 24px card padding, replacing 26 to 40px. White containers use 32px.
- Every desktop section uses 48px side padding. The `padding:120px 6px 0` (insights), `24px` (compare, scorecard, calendar) and `40px` (panels) exceptions go.
- Mobile: 72px between sections and 24px content gutters, replacing 16px. Full-bleed panels are inset 12px, like Airbnb's overlay cards. The live nav capsule's logo sits at about 32px, so a 24px text edge still reads as aligned.
- Body copy is capped at 640px.

**Constraint check.** Colours, fonts, nav, service hero and footer are untouched. The neutrals are ink at low alpha.

#### M2. Type scale and tracking (DM Sans, Cormorant accent unchanged)

| Token | Desktop | Mobile | Weight | Letter-spacing | Use |
|---|---|---|---|---|---|
| display | 100/0.92 | 56/0.95 | 600 | -0.08em (3 Minds) | giant section titles with full stop |
| stat | 90/1 | 50/1 | 600 | -0.045em | stats band only |
| h1 | 60/1.02 | 44/1.04 | 600 | -0.04em | page hero (not the fixed service hero) |
| h2 | 32/1.12 | 28/1.14 | 600 | -0.02em | in-section headlines, service row titles (30 becomes 32) |
| h3 | 20/1.3 | 18/1.3 | 600 | -0.01em | card titles, FAQ questions, plan names |
| body | 16/1.5 | 16/1.5 | 400 | 0 | paragraphs, card lines, answers |
| small | 14/1.45 | 14/1.45 | 500 | 0 | labels, meta, tabs, chips text |
| micro | 12/1.35 | 12/1.35 | 600 | 0; +0.06em when uppercase | eyebrows, badges, slash tags |

- **Allowed sizes.** Desktop: 12, 14, 16, 20, 32, 60, 90, 100. Mobile: 12, 14, 16, 18, 28, 44, 50, 56. Ban the half sizes (9.5, 10.5, 11.5, 12.5, 13.5, 14.5, 15.5) and the 22/24/26/30/34/36/38/40/46/54/58/64/84/88px one-offs.
- **Weights.** 400, 500, 600. Remove 700.
- **Text colours.** `--text`, `--muted`, #FFFFFF, `rgba(255,255,255,.72)` on dark, #1D4ED8 for links and the italic accent, and #FFC528 for accent marks and the stat suffix. Green #15803D survives only on data deltas. #9AA3B2, #B6BCC8 and #B45309 go (placeholders use `--muted` at 70% opacity).
- **Where this lands in the code.**
  - `.x-label` drops `letter-spacing:-0.04em` and becomes `small`.
  - The work description spans at 20px -0.035em become `body` 16px.
  - The service description at 16px -0.04em becomes `body` at 0.
  - `faq()` question text at 18px -0.04em becomes `h3`.
  - `.x-btn` keeps 14px w600 uppercase +0.02em.

**Constraint check.** DM Sans stays primary, Cormorant italic stays the accent, and the giant full-stop titles keep their 3 Minds tracking.

#### M3. One primary action per screen, and a label budget

- **Buttons.** One filled `.x-btn` per viewport height, plus the fixed nav's own "BOOK A CALL".
- **Secondary actions** become a text link: 16px w500, underline offset 4px, with the 18px arrow. This replaces `btn_line()` outlined boxes in heroes and closers.
- **Tertiary "show more" actions** become a grey button: 48px tall, `--r-ctl`, background `--tint`, 16px w500 ink. This is Airbnb's 132x48 Show more.
- **Delete these per-item buttons:**
  - "View project" spans in every `work()`
  - "Read more" pills in `insights()`
  - "Talk to us" and "Start with ..." on non-highlighted plans (whole card links instead; the highlighted tier keeps one `.x-btn`)
  - "Let us know" and "Ask us on WhatsApp" under FAQ (contact follows directly)
  - "Meet the team", "See the creative work", "Open the calculator" and "Build my calendar"
- **Label budget per page (desktop).** At most 6 distinct action labels including nav and footer. Round 3 has 11 to 23.
- **Canonical labels:**
  - Home: "Book a strategy call"
  - D2C: "Audit my brand"
  - Education: "Plan my season"
  - Meta Ads: "Get my Meta audit"

  Keep each label to 3 words or 22 characters.
- **Chat bubble.** `chat_bubble()` becomes a 56px icon only, never labelled. On mobile it moves into the sticky bar (M8), and it never overlaps a card.

**Constraint check.** Buttons keep the 3 Minds box and arrow square in MMC colours. The nav and footer CTAs are untouched.

#### M4. Work card anatomy (all pages, desktop and mobile)

Rebuild `work()` in `home.py`, `d2c.py`, `edu.py` and `service.py`, and `m_work_card()` in `mobile.py`.

| Part | Spec |
|---|---|
| Card | the whole card is one link; no background, border, shadow or button |
| Image | `--r-media` 20px; aspect 4:3 (desktop 2-column at 1344 content: 660x495; mobile 342x257, or 300x225 in a row) |
| Slash tags | at most 2, top-left inset 12px, `micro` 12px w600 uppercase, text only ("/WEBSITE", "/ADS") |
| Image dots | bottom centre, 12px from the image bottom: 6px dots, 6px apart, active #FFFFFF, inactive rgba(255,255,255,.6); at most 5 visible, 4th at scale .83, 5th at .67 |
| Hover (desktop) | next arrow: 32px circle, rgba(255,255,255,.9), `--sh-lift`, right-centre inset 12px; no card movement, no image zoom |
| Gap | 12px image to text |
| Line 1 | brand name `h3` 20px w600 ink; right-aligned audience "D2C" or "Education" in `small` muted |
| Line 2 | one outcome or description, `body` 16px muted, clamped to 1 line, 70 characters max |
| Line 3 (optional) | services, `small` muted, "Website · Ads · Creative", 40 characters max |
| Grid | desktop 2 columns, 24px column gap, 48px row gap; 4 cards on home, 4 on D2C, 3 on Education, 2 on service pages |

Delete the "Audience" and "What we ran" labels.

**Constraint check.** The cards stay photographic with slash tags (3 Minds). Only the clutter under the photo goes.

#### M5. Copy length caps (enforce in data lists)

| Element | Cap |
|---|---|
| Page H1 | 8 words |
| Hero paragraph | 1 sentence, 140 characters (home is about 280 today; D2C and Education about 180) |
| Section subline under a giant title | 80 characters |
| Service row description | 90 characters; at most 3 chips; no "Categories" label, no "2+" counter chip |
| Card lines | 70 characters line 2, 40 characters line 3 |
| Stats label | 24 characters; 4 stats at most |
| FAQ | 5 questions per page, 60 characters each; answers 240 characters; "Show all questions" grey button for more |
| Testimonial quote | 160 characters |
| Plan feature bullets | 4 per tier, 40 characters each |
| Buttons | 3 words or 22 characters |
| Anything after the final contact section | nothing; `approach()` is removed from `home.py` |

#### M6. Homepage structure (`home.py build()`)

**Order: 12 content sections become 9.**

1. **Hero** (`hero()`, simplified).
   - Keep: H1, one-sentence subline, the reel pair.
   - Delete: the floating ₹248Cr card, the eyebrow pill and the outlined "See our work" box.
   - Add the growth selector from S1 below the subline, with a text link "Rather talk? Book a strategy call" under it. The fixed nav already carries BOOK A CALL.
   - Height 760px.
2. **Client strip.** Replace `logos()` with the approved live `NClients` two-row marquee exactly as built. See C.6.
3. **Our Work.**
   - Keep the giant title.
   - Add Airbnb-style text tabs under the subline: "All · D2C brands · Educational institutes". They are 14px w500: muted when inactive, ink with a 2px ink underline when active, 48px tall, 24px apart.
   - Show 4 cards with the M4 anatomy, then one grey "View all projects" button.
4. **Services.** The approved live dark numbered panel with its hover peek, untouched. See C.6.
5. **Focus: cut.** Its job, choosing a segment, moves to the hero selector and the Work tabs.
6. **Testimonials** (`voices()`).
   - 3 items (2 quotes and 1 video) in a row with 28px round arrows (background `--tint`) at the right of the title line.
   - Quote cards are white, 20px radius, 32px padding, no border.
   - Each person row has a 40px avatar circle, name `h3`, and role `small` muted.
   - Remove the logos from the quote cards.
7. **Stats band** (`numbers()`). Keep, 4 stats. Its position after Testimonials keeps it away from the other dark panel.
8. **Latest insights** (`insights()`).
   - Remove the white container card.
   - 3 cards: a 3:2 image at 20px radius, a 12px w600 blue category, a 20px w600 title clamped to 2 lines, no excerpt, no Read more.
9. **FAQ** (`questions()`). 5 questions. Remove the "Have more questions? Let us know" block.
10. **Get in touch**, merging `talk()` and `contact()`. These are the 3 Minds contact tabs:
    - "Book a call" (default): the calendar card from `talk()` placed inside the tab.
    - "Send a brief": the 7-field form reduced to 5 (name, mobile, you are a, interested in, goals).
    - "Careers": a link.

    The founders row becomes one line with two 40px avatars.

**Footer** unchanged.

- **Height budget.** 7,500px or less (round 3 is 10,695).
- **Dark surface rule.** Hero, then Services, then Stats band, then Footer. They are never adjacent, and there are at most 2 in-page dark panels.

#### M7. D2C hub structure (`d2c.py build()`)

1. **Hero.** Breadcrumb, H1, one sentence, "Audit my brand" button, "See D2C work" link.
   - Delete the eyebrow pill. The revenue band moves into the Fit line of the FAQ.
   - Either drop the scorecard card or keep it beside the photos without overlapping them. Never both overlapping.
2. **Our Work.** 4 cards (M4), with channel tabs "All · Meta · Amazon & quick commerce · Shopify".
3. **Services.** Merge `leaks()` into `services()` in the dark numbered panel.
   - Each row opens with the leak as a single muted `small` line above the title, for example "ROAS looks healthy. Margin doesn't." over "Meta & Google Ads".
   - Then the description (90 characters max) and at most 3 chips.
   - 5 rows. The marketplace leak maps to row 02.
   - Delete the Leaks card grid.
4. **Scorecard.** Keep the white container, now 32px padding. Keep the definitions and the Week 36 table. Delete the 12-bar chart. Scorecard is the page's one data visual, so the hero card goes (see 1).
5. **Stats band.** Keep it, but not as a verbatim copy of the homepage band. Use D2C-specific labels when MMC supplies them. Otherwise cut it on this page.
6. **Plans.** 3 tiers.
   - The highlighted tier keeps one `.x-btn`. The other two become whole-card links with a "Choose Spark →" text link.
   - Feature bullets are capped at 4.
7. **Testimonials.** Add: 2 D2C quotes and 1 founder video, as on home (the page has none).
8. **FAQ.** 5 questions.
9. **Get in touch.** The contact tabs from M6, replacing the copied `home.talk()` block.

**Height budget.** 7,000px or less (round 3 is 8,614).

#### M8. Education structure (`edu.py build()`)

1. **Hero.** As M7, with "Plan my season". The tracker card may stay but never over the photos.
2. **Segment bar.** Rebuild `segments()` as a sticky category bar.
   - 64px tall, white, `--line` bottom border, sticky at `top: 88px` on desktop (below the fixed nav pill) and `top: 76px` on mobile.
   - Pills are 40px tall with 16px side padding, 14px w600, `--r-pill`. Selected: ink fill with white text. Others: white with a 1px `--line` border.
   - 5 segments: K-12, Colleges, Coaching, Skilling, Study abroad. "Selling to schools" leaves the bar (see 3).
   - On mobile the bar scrolls sideways with a 24px inset, no fade mask, and the last pill cut at the edge (Airbnb's peek).
   - A selected segment changes the Work cards, the service chips and the calendar rows. Show one alternate artboard state to prove it.
3. **Our Work.** 3 cards (M4). "Selling to schools" becomes the third card, with the tag "/SELLING TO SCHOOLS" and the same anatomy. Delete the dark schools panel.
4. **Services.** Merge `journey()` into `services()`.
   - The dark numbered panel keeps 6 rows, ordered by the admissions journey: Ad, Landing page, First reply, Counsellor call, Campus visit, Fee paid.
   - Each row: the journey stage as the muted line, the service as the title, a 90-character description, and a single "We track: Enquiry rate" chip.
   - Delete the 6-card Journey grid and the gradient rail.
5. **Plan.** Merge `calendar()` and `calculator()` into one white container titled "Plan." with two tabs (Airbnb's Dates or Flexible toggle).
   - Tabs are 150x36 pills with `--r-pill`: selected white with `--sh-lift`, inside a `--tint` track.
   - "Season calendar" (default) holds the Gantt.
   - "Cost per admission" holds 4 inputs (budget, enquiries, enquiry to visit, visit to admission) and one result row. The dark mini panel becomes ink text on `--tint`.
   - No buttons inside.
6. **Stats band.** Cut, unless MMC supplies outcome figures, in which case it goes here.
7. **Testimonials.** Video plus quote.
8. **FAQ.** 5 questions. `compliance()` becomes the answer to "How do you handle consent, calling hours and claims?" (240 characters). Delete the Compliant section.
9. **Get in touch.** Keep "Fill next year's seats." with the role pills. Fields go from 6 to 4 (institute and city, segment, phone, email). One `.x-btn`.

**Height budget.** 7,000px or less (round 3 is 9,851). One in-page dark panel.

#### M9. Meta Ads service page structure (`service.py build()`)

1. **Hero.** `sd_hero()` unchanged.
2. **Two-column block** at the 1344px content width.
   - Left column: 880px. Gap: 64px. Right column: 400px for the sticky audit card.
   - **Left column order:**
     1. Fit (`fit()`): the "Strong fit if" list keeps 4 lines. "Probably not yet" becomes 2 muted lines under it.
     2. Pillars (`pillars()`): the dark panel at column width. The row grid collapses from 5 tracks to 3: number and title, description, chips (3 max). The italic word column goes on this page.
     3. Our Work: 2 cards (M4).
     4. Month one (`month_one()`): 4 plain columns with 1px `--line` top borders, "Week 1" as `micro`, title `h3`, 90 characters of `body`. No pills, no rail, no cards.
   - **Right column: the sticky audit card.** This is the Airbnb booking card.
     - Size and position: 400px wide, `position:sticky; top:96px`.
     - Surface: white, `--r-media`, 1px `--line` border, `--sh-float`, 24px padding.
     - Header: "Free Meta audit" `h3`, then 3 facts in `small` muted with 8px gaps ("For D2C brands on Meta", "Live in 14 days", "Plans from ₹3L a month").
     - Fields: two stacked 56px fields in one group box with a 1px `--line` border and `--r-ctl` radius. "Monthly Meta spend" has a chevron; "Website" is the second. Labels are 12px w600 uppercase +0.06em over 16px placeholders.
     - Button: one full-width `.x-btn` "Get my Meta audit" (52px).
     - Microcopy: "Reply within one working day" in 12px muted, centred.
     - Strategist line: a 40px avatar with "[Name], runs your account" in `small`. This replaces `lead()`.
     - The card appears only below the hero, so it never duplicates the hero's white info card on screen.
3. **Plans** (`packages()`) at full width after the column ends. The fixed nav's BOOK A CALL takes over the CTA here, as Airbnb's sub-nav does. The highlighted tier keeps the only button. The compare rows from `compare()` sit directly under the tiers as a plain 4-row table: ink text, a blue check in the MMC column, and no dark column.
4. **FAQ.** 5 questions.
5. **Related.** 3 service cards: 20px image, `h3` title, whole card links. The dark free-tool card becomes a text link inside the FAQ answer about break-even ROAS.
6. **Cut:** `creative()` (becomes the image set on pillar 02 when opened), `lead()` (moves into the sticky card) and `closing()`.

- **Height budget.** 7,500px or less (round 3 is 9,710).
- **Artboard.** Render two states of the sticky card in the static mockup: at the top of the column, and at the column end.

#### M10. Mobile rules (`mobile.py`)

1. **Hero at one screen or less** (760px including the nav), built in `m_hero()`:
   - H1 44px, up to 3 lines
   - subline up to 140 characters
   - the growth selector pill from S1 (342x56), or on sub-pages one full-width `.x-btn`
   - a text link, not a second 52px outlined button
   - a 220px-tall row of two reel tiles (160x220, `--r-media`)

   No floating stat card and no chat bubble inside the hero.
2. **Sticky bottom action bar** on every mobile page, visible once the hero CTA scrolls away:
   - White, 76px tall plus safe area, 12px 24px padding, 1px `--line` top border, no shadow.
   - Contents: a 48px round WhatsApp button (1px `--line` border, ink icon) replacing `chat_bubble()`, then a flex-1 `.x-btn` with the page's canonical label.
   - Render it as a fixed element at the artboard bottom in one frame, and note it on the others.
3. **Work becomes a sideways row.**
   - Cards 300px wide (300x225 image), 12px gap, scroll-snap, 24px left inset, the next card peeking.
   - Show 4. Dots on each image.
   - Section height about 560px instead of 1,689 or 1,726px.
   - No per-card button. One grey "View all projects" button under the row.
4. **Services on hubs (D2C, Education, Meta Ads)** collapse to rows:
   - 72px each: number, title `h3`, chevron. `--line` dividers inside the dark panel.
   - Tapping a row opens the S3 bottom sheet with description, chips and one project image.
   - The homepage's live services component is left as built.
5. **FAQ.** Rows 56px or taller, 16px 20px padding, 8px gaps, first item closed. The page stays under 5 questions.
6. **Calendar (Education)** becomes a vertical list:
   - each row is a phase name in `h3` and "Jan to Apr" in `small` muted, over an 8px bar at `--r-pill` across a 12-column track
   - no single-letter month axis
   - labels never inside bars
7. **Height budgets.** Home mobile 8,000px or less (round 3 is 10,800), Education mobile 8,500px or less (round 3 is 12,271). Both include the fixed 1,398px footer.

**Constraint check (M6 to M10).** Every page keeps the 3 Minds set: giant full-stop titles, a dark numbered panel, photo work cards with slash tags, FAQ and contact tabs, plus a stats band and the calendar block (inside the tabs) on home. The service hero, nav and footer are unchanged, and the approved components are inserted as built.

### SHOULD

#### S1. Hero growth selector ("What are you growing?")

**Desktop** (home `hero()`, dark ground):
- **Pill:** 600x64, white, `--r-pill`.
- **Segments:**
  - Segment 1 "I run a" (12px w600 label over 16px muted value "D2C brand or institute").
  - A 1px `--line` divider.
  - Segment 2 "I need" ("More sales, admissions, a site...").
  - A 48px circle button in #FFC528 with an ink arrow, 8px inset right.
- **Focus state:** the pill turns `rgba(255,255,255,.85)`. The active segment turns white with `--sh-float`. The circle widens to a 120x48 pill reading "Show me".
- **Hover:** a segment's background shifts to `--tint`.
- **Panel:** opens 12px below at the segment's left edge.
  - 360px wide, white, `--r-sheet`, `--sh-float`, 16px padding.
  - Rows are 64px: a 48px icon tile at `--r-ctl` (tint: blue 8% for D2C, #FFC528 at 25% for education), label 16px w600 ink, sub 14px muted.
  - Segment 1 lists the two audiences. Segment 2 lists 4 needs filtered by the chosen audience.
- **Result:** routes to the D2C or Education page, anchored at the matching service row.
- **Artboards:** render two, closed and segment 2 open.

**Mobile:**
- A 342x56 pill (`--r-pill`, 1px `--line` border, `--sh-float`) reading "What are you growing?" in 14px w600.
- Tapping it opens a full-screen paper sheet:
  - Top: close button (40px outlined circle).
  - Open step card: white, `--r-media`, 24px padding, `--sh-float`, listing options as 56px rows.
  - Closed step card: 56px, `--r-ctl`, "I need · Choose", 12px below.
  - Sticky footer: "Clear" text on the left, `.x-btn` "Show me" on the right.

**Constraint check.** The homepage hero isn't a fixed element. Colours are MMC's, and the nav keeps its own CTA.

#### S2. Image dots and hover arrows on work cards

These follow M4 on every work grid. The case image sets are 3 to 5 frames: the site mockup, an ad, a social post, a results screen.
- **Static mockup:** show dots on every card, and an arrow on one card to represent hover.
- **Mobile:** the row scrolls sideways, and each image swipes with scroll-snap.

#### S3. Bottom sheets on mobile, centred modals on desktop

**Sheet spec:**
- 390 wide, starting 12px from the top when full height (or content height up to 90%).
- `--r-sheet` on the top corners only, white, `--sh-overlay`, over a `--scrim`.
- A 40x4 handle bar in `--line` at 8px from the top.
- Header: 56px, centred 16px w600 title, close at 24px.
- Sticky footer: 76px, a 1px `--line` top border, the quiet action on the left and a filled `.x-btn` on the right.

**Desktop modal:** the same content at 568px wide, `--r-sheet`, centred, 40px from the top.

**Use it for:**
- (a) the calendar booking "Book a call": days row, time slots, "Confirm 15:30"
- (b) service row details on hubs (M10.4)
- (c) filtering work by segment or channel on mobile
- (d) "Show all questions" in FAQ

**Constraint check.** These are containers for existing 3 Minds content. They add no new sections.

#### S4. Grey "Show all" button pattern

Use a 48px `--tint` button at `--r-ctl`, 16px w500 ink, with a count in the label ("Show all 12 questions", "View all 18 projects"). It replaces outlined VIEW ALL buttons and the yellow-dot variant.

#### S5. Horizontal rows for Testimonials and Insights

- **Desktop:** 28px round `--tint` arrows at the right of the title line, 8px apart. The disabled state uses the same arrow at 40% opacity.
- **Mobile:** 2 cards plus a peek, 12px gap.

#### S6. Single dark ground treatment

- `.x-panel` loses `.x-grid`.
- Heroes lose the radial glow and the reel shadows (the reels keep the 20px radius).
- At most 2 in-page dark panels per page, never adjacent to each other or to the hero.

#### S7. Placeholder discipline

Bracketed placeholders ([Name], [PHOTO]) render as `--placeholder` blocks at their real size and radius. This is Airbnb's #DDDDDD slot: no gradient avatar circles, no "[PHOTO]" lettering. Show one skeleton artboard for the homepage Work row this way.

#### S8. Slash tags as frosted badges on photos

- `.x-tag` becomes 26px tall, `--r-pill`, 10px side padding.
- Background `rgba(255,255,255,.85)` with `backdrop-filter: blur(16px)`, 1px `rgba(255,255,255,.5)` border, `--sh-lift`.
- Text 12px w600 uppercase +0.06em ink.
- The slash stays.

This mirrors Airbnb's 104x26 "Guest favourite" badge.

**Constraint check.** Slash tags stay. Only their surface changes.

#### S9. Motion tokens

Hover and state changes use `transition: transform .25s cubic-bezier(.2,0,0,1), background-color .25s, box-shadow .2s`.
- Sheets slide up in 300ms on the same curve.
- The selector panel fades and translates 8px in 200ms.
- No bounce on buttons, no scale on cards.

### COULD

- **C1. "Add to brief" toggle.** This is the wishlist heart, reinterpreted.
  - A 32px outline plus icon on each service row and work card (white stroke 2px, fill ink at 50%, drop-shadow `0 2px 6px rgba(7,14,42,.25)`).
  - It fills #FFC528 when toggled.
  - The count shows in the sticky bar and nav CTA as a 20px #FFC528 badge.
  - It pre-fills "Interested in" on the contact form.
- **C2. Live counts in filter actions.** For example "See 4 D2C projects" and "Show 3 institutes' work" after a tab or segment choice, like Airbnb's "Show 1,000+ places".
- **C3. One-number estimator on Education** (host page pattern).
  - Result in `stat` 90px: "[n] enquiries a season".
  - Driven by a 305px slider (seats to fill) and a 342x56 pill ("Pune · College · UG").
  - Replaces the 4-input tab when MMC wants a lighter tool. The number is an illustrative calculation, not a claim.
- **C4. Compact selector pill in the nav area on scroll.** After the hero, a 48px "D2C · More sales" summary pill could show beside the nav on desktop. Use only if it fits the live nav without modifying it. Otherwise skip.
- **C5. Anchor links inside the sticky audit card.** A 14px muted row: "Pillars · Work · Plans · FAQ". It replaces a second sticky sub-nav bar, which would collide with the fixed nav pill.

### C.6 How the rest of the page sits around the approved live components

**Client strip** (`clients-strip.jsx`, `NClients`: two marquee rows; hovering pauses the row and swaps the mark for the work image).
- Place it directly under the homepage hero as the first proof.
- Paper ground, 64px above and below, and its own header only. Delete round 3's "Selected work / Impact created for" row and the `logos()` strip.
- Keep other moving things out of the same viewport: the reels don't autoplay while the strip is on screen, and the chat bubble has no label.
- The next section starts with the "Our Work." giant title, never another logo row.

**Services section** (`home26/sections.jsx`, `NCapabilities`: the pointer-following peek image beside the rows).
- Keep the full content width so the peek panel has room. Nothing sits in a column beside it.
- The section above (Our Work) ends with a grey button, not an image band, so the peek image doesn't sit against a photo edge.
- The section below (Testimonials) opens on paper with its giant title.
- The Stats band follows Testimonials, not Services, so two dark blocks never touch.
- No chips or card grids on either side of it on the homepage. Focus is cut for this reason too.
- On mobile it stays as built. The neighbouring Work row and Testimonials row are sideways rows, which keeps the page short around it.

### C.7 Constraint check summary

| Constraint | How round 4 respects it |
|---|---|
| Nav pill, service hero, footer identical to live | `NAV`, `NAV_M`, `sd_hero()`, `footer()` imported unchanged. Sticky bars sit below the nav (desktop) or at the viewport bottom (mobile). The sticky card starts below the service hero. |
| Colours #1D4ED8, #FFC528, #0F1E5E, #FBFAF6; DM Sans; Cormorant italic | All tokens use these or ink at low alpha. The italic accent stays on title words and full stops. |
| 3 Minds structure | Giant full-stop titles, dark numbered services panel, photo work cards with slash tags, stats band, calendar block, FAQ and contact tabs all remain. The calendar block moves into the contact tab, which is where 3 Minds puts "Schedule a call". |
| Live services hover and client strip | Inserted unchanged. Only placement and neighbours are specified. |
| No number validation | No figure is questioned. Stats changes are about repetition and placement only. |

---

## D. Design direction for round 4

Round 4 keeps the 3 Minds bones and MMC's colours and takes one habit from Airbnb: every screen does one job and says it once.
- **Images lead.** Work is shown as big 4:3 photographs at a 20px radius, each with two slash tags, carousel dots and three plain lines, with no buttons on cards.
- **Tokens are closed lists.** Five radii, three shadows, eight font sizes, three weights and one tracking rule are fixed in `base.py`, so the giant full-stop titles and the dark numbered panel are the only loud things on the page.
- **Actions are few and follow the reader.** The hero asks one plain question ("What are you growing?"). One filled button sits in each viewport. On service pages the action lives in a sticky audit card, and on mobile in a bottom bar.
- **Depth waits until asked for.** Problems merge into services, tools fold into tabs, compliance becomes an answer, and details open in sheets.

Pages get shorter by a third, the approved hover strip and services panel get the quiet around them they need, and a founder or principal can reach the right proof and the right button in under three scrolls.

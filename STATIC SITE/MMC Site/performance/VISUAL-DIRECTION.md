# MMC visual direction: "Above the line"

Performance Marketing page, v2. Supersedes the mood-and-prop set in assets/pm/.

## 1. The big idea

**Margin is the sun, and it only counts when it clears the line.**

MMC's mark is an M with a small yellow sun rising from its base. MMC's argument is that a 3x ROAS can still lose money, that an order is a stack of costs, and that only what rises above break-even is real. So the visual world is one repeatable scene: a **stack of matte slabs (the costs of an order) and one thin taut line (break-even)**, with **one yellow half-disc (contribution margin) either rising above the line or, when the point is the danger, sinking below it.**

Why it is ownable: swap it onto another agency's site and it makes no sense, because the sun-and-line is MMC's logo and MMC's P&L argument in one object. Nobody else has both.

Why it is honest: nothing depicts a result. There are no numbers, charts or screens. Only structure: layers, a threshold, a rising disc.

How it extends to the site:
- Home and About: the same slab world, with the sun rising over a horizon of stacked slabs (the "Quietly outperforming, since 2019" line).
- Other service pages: the same scene, changed by one variable each (creative: slabs become tiles; retention: the stack becomes a loop of returning discs; tech: slabs gain a cut-through channel). The sun and the line never change. They are the brand constants.
- The line can be lifted into the UI: a 1px navy hairline with a small yellow half-disc as section divider, cursor mark or progress marker.

## 2. Visual language

**Subject rules.** Only three actors: slabs (costs, structure), the thread (break-even, discipline), the yellow half-disc (contribution). Variations change how slabs are arranged (staircase, funnel, split, nested, fanned), never what they are. One yellow object per image, always the focal point. The disc is always cut flat and carries a thin off-white or dark gap ring, like the logo's white ring.

**Rendering.** Sculptural still life of matte card, painted wood and paper: real crisp cut edges, tiny grain, soft contact shadows. Chosen over illustration because a tactile "physical ledger" says considered and senior, and over stock photography because every object is invented and on-brand. Chosen over glossy 3D/glass because gloss reads as SaaS hype. It stays diagrammatic enough to be read in one second, with real materiality so it is not clip-art.

**Light.** One large softbox from upper left, short soft shadows, always. Same in every image, on paper or on ink. This is what makes ten images read as one family.

**Colour.** Slabs in brand blue #1D4ED8 and ink #0F1E5E. Grounds: paper #FBFAF6 (default) or ink #07090F (the "danger" and closing beats). Sun yellow #FFC528 only for the half-disc, at most 3 percent of the frame. The thread is navy on paper, off-white on ink.

**Composition and crop-safe areas.** Object lives in the right or lower-right 55-60 percent; left 40 percent and top 30 percent are clean ground for headings and card copy. The thread runs edge to edge so it survives any crop. Wide images keep the object away from edges so `object-fit: cover` is safe at 16:10 through 21:9.

**Banned.** Readable text or numbers; charts, dashboards, UI, platform logos; people and faces; generic D2C props (jars, parcels, magnifiers, desks, laptops, baguettes on scooters); stock-photo bokeh lifestyle; gradients-and-glow "tech" backgrounds; more than one yellow element; glossy glass; any depiction implying a client result or award.

## 3. Section table

| # | Section | Claim | Visitor should feel | Visual and why it is logical | Ratio / placement | Generated? |
|---|---|---|---|---|---|---|
| 1 | Hero card | Paid media run against profit, measured on contribution margin | "These people think in margins" at a glance | The signature scene: stepped slabs below the break-even thread, sun clearly above. It states the whole thesis before a word is read | 16:10, top of hero card, above card body | Yes (hero.jpg) |
| 2 | The short answer | An agency answers for what media returns, judged on contribution | Plain, quotable, calm | None. This is the AEO answer block; a picture competes with the text. Typography only | n/a | No, deliberately |
| 3 | Contribution-margin explainer band | A 3x ROAS can still lose money | A quiet jolt: the same sun, now sinking below the line | The inverse of the hero: slabs (order costs) rise past the line, the sun sinks under it. Dark ground matches the ink band. The live diagram carries the actual arithmetic; the image carries the feeling | 1:1, in `.pm-margin__art` between copy and diagram | Yes (explainer.jpg) |
| 4 | Four channels | One account structure across Meta, Google, Amazon, quick commerce | Order and control, four different structures with one logic | Four slab structures, each expressing the section's own row copy: Meta = one funnel; Google = brand search kept separate from the rest; Amazon = ad sales nested inside total sales; Quick commerce = fast succession of small tiles. No platform marks (the card already carries the real logos) | 3:2 source, shown 16:10, top of each card | Yes, x4 |
| 5 | Process rail (5 steps) | The plan has to survive the maths | Method, sequence | The rail itself is the visual. If a band image is wanted: five slabs rising step by step, the last touching the line with the sun | 21:8 band above the rail, optional | Yes, optional |
| 6 | Who it is for: D2C | Brands that know their margins, or want to | Recognition, not decoration | Best is no image, or a lone slab-and-sun object. A photo of "a founder" would be stock. We offer one restrained object | 4:5, right of the copy | Optional |
| 6b | Education | Admissions and lead-gen are handled separately | "They see my vertical as different" | Same world, one variable changed: the staircase of slabs as stepped enrolment | 4:3, side card | Optional |
| 7 | Proof / logo wall | Nine brands we run paid media for | Credibility | None. The wall already reveals real client work on hover (assets/clients/*-work.jpg). Generated art here would dilute real proof | n/a | No, deliberately |
| 8 | FAQ | Common questions | Ease, scannability | None. Text and details | n/a | No, deliberately |
| 9 | Closing CTA band | Find out what your ad spend really returns | The sun is up. Time to act | The horizon: a long line of slabs, the sun fully risen and centred, dark ground for the void band. Text-safe centre | 21:9, background of the `pm-cta` band under an ink overlay | Yes (closing.jpg) |

## 4. Real material still needed from the client

Real assets beat generated ones in the proof and channel sections. See the hand-off note.

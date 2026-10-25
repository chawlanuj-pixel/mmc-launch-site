# MMC website consistency — review and instruction document

**Review status:** Ready for your decisions. **Website changes:** None.

**Scope:** 72 current local-site routes and 534 sections/nested modules, reviewed on 1 October 2026. This consolidates the earlier 34 overlapping findings into **20 review items**. The latest audited Home discipline and Insights/article designs are used; obsolete descriptions have been removed from the decision list.

**Evidence:** Current page HTML, templates, content data and CSS. Final rendered appearance, responsive fit and interaction execution have not been browser-verified. Layout/colour descriptions refer to the implementation. The appendix is the latest audit snapshot, not a fresh production-site inspection.

## How to use this document

Start with the decision register. Each **R-number** has a recommendation and an editable instruction field below. Reply with an R-number and your direction, or write directly into the fields. You can accept a recommendation, modify it, keep the current design, or defer it. Blank fields mean **not yet decided**.

Example: **“R08: use the Insights calculator cards everywhere, with a compact version on Home. R09: use the service-page photo close on marketing pages; keep a compact dark close on articles and tools.”**

- [Decision register](#decision-register)
- [Detailed review items and instruction fields](#review-items)
- [Free-tool design comparison](#free-tools-comparison)
- [Above-footer design comparison](#pre-footer-comparison)
- [Appendix: every page and section](#page-section-inventory)
- [Source references](#implementation-references)

## Overall direction

The recurring problem is that separate page families implement the same communication independently. Standardise repeated section roles—tool promotion, FAQs, client proof, related content and consultation closings—while retaining layouts suited to articles, calculators, case studies, job applications and legal documents.

<a id="decision-register"></a>
## Decision register

Priority reflects the likely clarity/consistency impact, not a confirmed visual defect. Every item is currently **awaiting your instruction**.

| ID | Review item | Priority | Recommended direction |
|---|---|---|---|
| [R01](#r01) | Service names and grouping | High | One service taxonomy; compact and detailed presentation variants. |
| [R02](#r02) | Booking offer and destination | High | General strategy call plus a clearly scoped paid-media offer. |
| [R03](#r03) | Written brief versus audit request | High | Separate written-brief mode from audit request mode. |
| [R04](#r04) | Labels that do not match their destination | High | Make labels describe their actual destination. |
| [R05](#r05) | Resource library and navigation structure | High | One canonical article library; explicit resource-page roles. |
| [R06](#r06) | Client records and audience labels | Medium | One client record and one primary audience classification. |
| [R07](#r07) | Careers application promise | Medium | Describe the real application flow. |
| [R08](#r08) | Free-tool sections and cards | High | One resource identity; full, compact and inline variants. |
| [R09](#r09) | Section immediately above the footer | High | One standard photo close and one compact text close. |
| [R10](#r10) | FAQ rows and controls | Medium | One FAQ row/control system. |
| [R11](#r11) | Client proof and project interactions | Medium | Separate static logo proof from linked project previews. |
| [R12](#r12) | Related-content cards | Medium | Common type/title/action anatomy for related resources. |
| [R13](#r13) | CRM feedback diagram | Medium | One light feedback-loop diagram with audience-specific copy. |
| [R14](#r14) | Problem/solution and stage sections | Medium | Shared problem/solution rows; stacking only where useful. |
| [R15](#r15) | “In short” summaries | Medium | Full and compact versions of one summary family. |
| [R16](#r16) | Section dimensions and design primitives | Medium | Shared alignment, type, spacing, radii and action primitives. |
| [R17](#r17) | Mobile sticky booking | Medium | Common visibility policy with explicit exceptions. |
| [R18](#r18) | Section surfaces and motion rules | Medium | Explicit surface variants and intentional motion. |
| [R19](#r19) | Repeated actions and content within a page | Medium | Page-level next-step hierarchy and reduced duplication. |
| [R20](#r20) | AI overview URL | Verification | Check deployed directory routing and canonical URL. |

## Suggested review order

1. **Design decisions first:** R08–R16, starting with free tools and closing sections.
2. **Communication decisions:** R01–R07, so the new shared components receive consistent names and offers.
3. **Behaviour and verification:** R17–R20, followed by desktop/mobile visual checks.

**Keep these legitimate differences:** calculator inputs/results; article reading width and contents navigation; case-study project imagery; candidate application flows; legal-document endings; product-specific AI demonstrations. They should share brand primitives without becoming identical page templates.

<a id="review-items"></a>
## Detailed review items and your instructions

<a id="r01"></a>
### R01 — Service names and grouping

**Where:** Home, About, Services, menu and footer.

**Finding:** Home now presents six disciplines. About and Services each describe five systems, with different groupings. Home uses 3D cards, About an editorial list, and Services long photo/text sections.

**Why it differs:** The pages maintain separate catalogues and layouts. Different detail levels are useful; conflicting names, counts and groupings are not.

**Recommendation:** Choose one canonical service taxonomy and reuse its names everywhere. Keep compact overview cards and detailed service sections as related variants.

**Decision needed:** Which service names/grouping should be the master? Any intentional exceptions?

**Your instruction:** _Not yet provided._

<a id="r02"></a>
### R02 — Booking offer and destination

**Where:** Home, service/industry pages, Work, Tools, Contact, menu, footer and AI.

**Finding:** The shared calendar is called a strategy call, audit call, paid-media audit, free audit and brand audit. Non-media services inherit a paid-media checklist. AI “Book a call” links go to Contact instead of opening the calendar.

**Why it differs:** A generic offer was reused across different services, while AI uses separate static links.

**Recommendation:** Use “Book a strategy call” for general consultation. Reserve “Get a paid-media audit” for a genuinely scoped paid-media review. Match each label to its destination and supplied booking context; give non-media services relevant copy.

**Decision needed:** Confirm the general offer, audit offer, and whether they should share a calendar.

**Your instruction:** _Not yet provided._

<a id="r03"></a>
### R03 — Written brief versus audit request

**Where:** Footer, Contact, Audit secondary action and calculator closings.

**Finding:** “Send a brief” opens an audit-framed modal with audit scarcity, diagnostic promises and “Request the audit” as its submit label.

**Why it differs:** The brief helper dispatches the same event used by the audit modal.

**Recommendation:** Provide a brief-specific form mode with project language and “Send brief”. Keep audit-specific promises only in an audit request mode.

**Decision needed:** Confirm brief-form purpose, required fields, and desired submit label.

**Your instruction:** _Not yet provided._

<a id="r04"></a>
### R04 — Labels that do not match their destination

**Where:** Industries scoreboards; Home audience cards; Home client cards/work rail.

**Finding:** Industry links say “Open the calculator”. Home audience links promise “work” but open industry overviews. Bloom and Lepure project actions open the overall Work page while other project actions open case studies.

**Why it differs:** Shared cards assume an action label, and some projects lack their own detail page.

**Recommendation:** Use destination-specific labels. Relabel industry links; label overview destinations as overviews; use a clear portfolio/anchor destination for projects without a detail page.

**Decision needed:** Prefer changing labels or changing destinations? Note any projects that need new pages.

**Your instruction:** _Not yet provided._

<a id="r05"></a>
### R05 — Resource library and navigation structure

**Where:** Resources, Guides, Insights and global menu hints.

**Finding:** Guides and Insights expose the same three articles through different page structures. The current Insights page also has six calculator cards. Some menu hints still promise journal, awards, press or other content that does not reflect current destination sections.

**Why it differs:** Library pages and menu descriptions evolved independently.

**Recommendation:** Use Insights as the canonical article library and Tools as the calculator catalogue. Give Resources a clear umbrella role. Decide whether Guides should redirect or have a distinct purpose. Rewrite menu hints to match actual content.

**Decision needed:** Which pages should remain, and what distinct role should each play?

**Your instruction:** _Not yet provided._

<a id="r06"></a>
### R06 — Client records and audience labels

**Where:** Home carousel/work rail, Work filters, case-study data and brand walls.

**Finding:** Service records differ for some repeated clients. Education projects can be labelled B2C while navigation/filtering uses Education; business model and industry classifications are mixed.

**Why it differs:** Client/service arrays are duplicated, and primary/secondary classifications are not distinguished.

**Recommendation:** Use a single client record. Keep one primary audience label and optional secondary business-model tags. Make abbreviated service lists explicit, such as two highlights plus “+N more”.

**Decision needed:** Confirm the primary audience categories and authoritative client/service records.

**Your instruction:** _Not yet provided._

<a id="r07"></a>
### R07 — Careers application promise

**Where:** Careers overview and six role pages.

**Finding:** The overview promises “One page”, while role pages use a two-step Basics/Screening application with required fields and four questions.

**Why it differs:** Overview copy and the implemented application flow describe different tasks.

**Recommendation:** Keep the functional form and update the overview to describe it accurately. Retain the one-page invitation only for an unlisted-role path if that is the actual process.

**Decision needed:** Keep the two-step form or change the application process?

**Your instruction:** _Not yet provided._

<a id="r08"></a>
### R08 — Free-tool sections and cards

**Where:** Home, D2C, selected service hubs, Resources, Tools, Insights, guides and calculators.

**Finding:** The same resources appear as acronym tiles, metric cards, sticky explanations, photo rows, image grids, inline callouts and text cross-links. Home and D2C promote the same four calculators through notably different designs.

**Why it differs:** Each page family implements its own resource promotion. Metric and resource-link components are also conflated.

**Recommendation:** Create one tool identity with full, compact and inline variants. Use the current Insights image-card anatomy as the starting point for full cards. Keep the name, free-calculator label, purpose and action consistent. Separate static metrics from clickable resources.

**Decision needed:** Which existing tool treatment should be the reference? Confirm allowed variants and curated selections.

**Your instruction:** _Not yet provided._

<a id="r09"></a>
### R09 — Section immediately above the footer

**Where:** All marketing pages; exceptions on Audit, careers roles and legal pages.

**Finding:** Similar booking offers use blue photo cards, a full-photo About band, dark editorial/tool bands, Home’s dark close plus calculators, and AI’s centered yellow close. Several components independently reproduce the blue card.

**Why it differs:** The shared shell supplies the footer, but each page supplies its own closing section.

**Recommendation:** Use one standard photo close for marketing pages and one compact text close for articles/tools. Give Home’s calculators their own reusable module. Keep Audit, application and legal endings task-specific. Decide explicitly whether AI retains its yellow variant.

**Decision needed:** Choose the standard and compact closing references; list any pages allowed a different treatment.

**Your instruction:** _Not yet provided._

<a id="r10"></a>
### R10 — FAQ rows and controls

**Where:** Marketing pages, About, articles, calculators and AI.

**Finding:** FAQs use ruled rows, individual rounded cards, a boxed tool list and animated AI panels, with different toggle symbols and spacing. Current Insights has no FAQ; the articles do.

**Why it differs:** Five independent implementations remain. The editorial refresh introduced a new FAQ design without consolidating the others.

**Recommendation:** Use one FAQ row anatomy and interaction policy, with a reading-width wrapper where needed. Pages may omit FAQs when unnecessary.

**Decision needed:** Prefer ruled rows or individual cards? Confirm the default open/closed behaviour.

**Your instruction:** _Not yet provided._

<a id="r11"></a>
### R11 — Client proof and project interactions

**Where:** Home client carousel/work rail, service/industry walls and Work.

**Finding:** Similar project proof is sometimes a whole-card link and sometimes a non-clickable tile with hover imagery. Service tags and information density change too.

**Why it differs:** Logo proof and project exploration were implemented as overlapping visual concepts.

**Recommendation:** Define a non-interactive logo strip and a clickable project card. Use the project card when preview imagery suggests viewing the work. Keep real video evidence as a separate media format.

**Decision needed:** Which sections should be logo-only proof versus clickable project exploration?

**Your instruction:** _Not yet provided._

<a id="r12"></a>
### R12 — Related-content cards

**Where:** Hub Beyond sections, Home insights, Tools recommendations, article related content and AI.

**Finding:** Related links use unboxed image/text articles, whole-card image links with badges, compact text cards and project previews. The clickable area and resource-type label are inconsistent.

**Why it differs:** Page-specific and destination-specific card families overlap.

**Recommendation:** Use one related-resource card with type/title/action conventions and compact/image variants. Keep portfolio cards evidence-led. Reuse the current GuideCard structure where appropriate.

**Decision needed:** Confirm the card reference and whole-card versus text-link interaction.

**Your instruction:** _Not yet provided._

<a id="r13"></a>
### R13 — CRM feedback diagram

**Where:** B2B and Lead Generation versus Education.

**Finding:** The same lead → CRM stage → Meta CAPI → improved targeting explanation uses a light restrained diagram on two pages and a dark large-icon diagram on Education.

**Why it differs:** The hub template selects either LoopB or Loop using content data. Both implementations remain active.

**Recommendation:** Use the light LoopB layout across all three pages, adapting terminology for leads or admissions. Preserve one feedback-loop visual structure.

**Decision needed:** Choose light LoopB, dark Loop, or another reference.

**Your instruction:** _Not yet provided._

<a id="r14"></a>
### R14 — Problem/solution and stage sections

**Where:** Generic service hubs, D2C, Resources, Guides, Industries and Tools.

**Finding:** Equivalent problem/solution narratives use sticky cards, alternating image rows, and joined red/blue panels. Independent calculator/article choices are sometimes presented as sequential stages.

**Why it differs:** Generic hubs use a data-selected stage variant; D2C and Tools have bespoke layouts.

**Recommendation:** Use shared problem/solution anatomy. Default to normal scrolling rows; reserve sequential/stacked treatments for genuinely sequential content. Libraries should prioritise comparison and quick access.

**Decision needed:** Choose a reference layout and identify any content that should retain stacking.

**Your instruction:** _Not yet provided._

<a id="r15"></a>
### R15 — “In short” summaries

**Where:** Marketing hubs, Performance Marketing, guide articles and AI.

**Finding:** The same summary role appears as a large paper section with icons/photo, an audit-action variant, a dark article takeaway box and an AI short-answer layout.

**Why it differs:** Separate Answer, AnswerCta, article Summary and static AI implementations.

**Recommendation:** Keep full marketing and compact article variants with consistent label, lead emphasis and point hierarchy. Make optional actions an explicit shared option.

**Decision needed:** Confirm summary variants and whether any summary should contain a sales CTA.

**Your instruction:** _Not yet provided._

<a id="r16"></a>
### R16 — Section dimensions and design primitives

**Where:** Home disciplines and adjacent sections; marketing, About, editorial and tool families.

**Finding:** Outer widths, card radii, heading sizes, emphasis, buttons and arrows use local rules. For example, discipline cards use a 1320px wrapper/12px radius; general Home uses a 1640px wrapper/22px cards; editorial cards use 22px and metric cards 18px.

**Why it differs:** Local component scales override the shared system. Same fonts/colours do not ensure consistent alignment or hierarchy.

**Recommendation:** Adopt shared outer alignment, a small radius/type/spacing scale and common button/arrow primitives. Allow narrower prose and explicit content-driven exceptions. Verify actual dimensions in a browser before changing them.

**Decision needed:** Which page/section should establish the visual baseline? List intentional exceptions.

**Your instruction:** _Not yet provided._

<a id="r17"></a>
### R17 — Mobile sticky booking

**Where:** Home, generic hubs and dedicated marketing/article pages.

**Finding:** Home hides its bar when hero/final buttons are visible. Page stickies use hero/closing/cookie conditions; generic hubs add an exception for stacked cards.

**Why it differs:** Three implementations follow different visibility policies.

**Recommendation:** Share one baseline policy and explicit content exceptions. Verify cookie banner, modal, AI launcher, footer and focus behaviour on mobile.

**Decision needed:** Confirm where sticky booking should appear and when it should hide.

**Your instruction:** _Not yet provided._

<a id="r18"></a>
### R18 — Section surfaces and motion rules

**Where:** Global styles plus Home, marketing, editorial, tool and AI families.

**Finding:** Dark surfaces are used for tools, deliverables, diagrams and calls to action without stable defaults. A universal cream section backdrop is disabled through different family-specific exceptions. Scrolling/pinning/animation also varies.

**Why it differs:** Local sections and global backdrop rules both control presentation, sometimes competing for the same pseudo-element.

**Recommendation:** Make surfaces explicit component variants and centralise motion rules. Keep specialised motion only where it demonstrates something useful. Review the CSS cascade before removing overrides; no current rendering failure is asserted.

**Decision needed:** Confirm surface palette and motion preferences; identify showcases that should stay distinctive.

**Your instruction:** _Not yet provided._

<a id="r19"></a>
### R19 — Repeated actions and content within a page

**Where:** Guide articles, Home proof, Contact and pre-footer/footer actions.

**Finding:** The same calculator may appear in a hero, inline callout, article ending and related card. Home repeats clients in two proof sections. Large booking closings precede a footer that asks for booking again.

**Why it differs:** Each section independently adds its own next step; no page-level frequency or hierarchy rule governs their combination.

**Recommendation:** Assign one primary next step to each stage. Retain useful repeated access using compact, consistent links. Remove repeated full promotions where they add no new information.

**Decision needed:** Identify repetitions to keep, reduce or remove; specify each page’s primary action.

**Your instruction:** _Not yet provided._

<a id="r20"></a>
### R20 — AI overview URL

**Where:** Main navigation → AI by MMC overview.

**Finding:** The audited local preview returned 404 for /ai-by-mmc/ but 200 for /ai-by-mmc/index.html; the six explicit service HTML paths worked.

**Why it differs:** Directory-index behaviour can differ between the Astro development server and production hosting.

**Recommendation:** Verify the deployed host and choose one canonical overview URL. Fix links/routing if the same mismatch occurs there. This is not evidence of a production outage.

**Decision needed:** Confirm the intended canonical AI overview URL and deployment target to verify.

**Your instruction:** _Not yet provided._


<a id="free-tools-comparison"></a>
## Free-tool design comparison

The IDs below identify current treatments, not proposed new brand names.

| Treatment | Exact locations | What is on screen according to markup/CSS | Why it differs / decision |
|---|---|---|---|
| T1 — compact dark tiles | Home `#close` | Four abbreviation-led tiles, short titles/descriptions, outline arrow furniture; embedded underneath booking copy. | Local Home component. Use the compact version of a shared tool card. |
| T2 — metric cards | D2C `#numbers`; Meta, Google, Amazon, Quick Commerce, CRO, Shopify, Retention, Lead Generation and B2B `#numbers` | Four translucent cards on ink; some link to calculators while others are static metrics. No photos; uppercase action for links. | Generic metric component also used for resources. Separate interactive tool cards from static metric explanations. |
| T3 — stacked explanations | Resources `#leaks` | Five image-led sticky cards; problem/why/use explanation and calculator link. | Service-stage template reused for a resource library. Prefer catalogue cards with optional expanded explanations. |
| T4 — full catalogue rows | Tools `#tools` | Six calculators plus glossary grouped by decision; numbered images and joined red/blue problem/use panels. | Dedicated Tools implementation. Keep grouping; reduce to the same card family used elsewhere, with optional detail. |
| T5 — image-card grid | Insights `#calculators` | Six white cards with short rectangular images, name, description, “Open the calculator” and a dark circular arrow; separate all-tools and glossary links. | New editorial family. Strong candidate for the full shared resource-card anatomy. |
| T6 — inline tool callout | All three guide articles, within `#article` | Horizontal image + “Free tool” badge + tool label/explanation + circular arrow. Entire callout links. | Reading-column constraint. Keep as the compact horizontal variant of T5. |
| T7 — related resource card | Contribution and attribution guides, `#related` | Calculator is a full image card next to other related content, tagged “Free tool”. | Reuses `GuideCard`, not the dedicated `ix-calc` card on Insights. Merge the common structure; use type data to supply actions. |
| T8 — calculator cross-links | Every individual calculator, between FAQ and closing | Five text cards naming the other calculators, one-line descriptions and small CSS arrows; no photos or “Free” label. | `ToolCrossLinks` component serves people already using a tool. Keep a compact variant, but preserve title/type/action conventions. |
| T9 — contextual action | Performance Marketing `#margin`, FAQ and `#related`; Services `#work`; Resources/Guides `#beyond`; article body links | A mixture of filled buttons, quiet text links, related strips and image-led library links. | The context is explanation or onward navigation rather than a catalogue. Inline links are justified; their wording and button priority should be consistent. |
| T10 — global discovery | Shared menu and footer | Tool names in link lists; glossary is grouped with tools. | Navigation has a different job. Keep list presentation and align canonical names/order with the tool catalogue. |

**Important exceptions:** Education's `#numbers` contains admissions metrics, not free tools. Branding's contains deliverables. Several non-media services contain static success criteria. They should not be reported as missing calculator promotions or have calculators added just to fill a template.

**Inventory mismatch worth resolving:** Resources promotes five calculators; Tools and Insights list six; Home/D2C feature four. A curated selection is legitimate if labelled as such. Resources should either include Growth Trajectory or clearly say it is a selected starting set and link to all six.

<a id="pre-footer-comparison"></a>
## Above-footer design comparison

| Pages | Final content block | Design and contents | Why / decision |
|---|---|---|---|
| Home | `hv-close` | Full ink section; strategy-call pitch, primary button, secondary tools link, then four calculator tiles. | Home combines conversion and self-service in one close. Split tools into their own reusable module or keep this as a documented composite variant. |
| Services, Performance Marketing, D2C | `pages/Cta.astro` → `cta2` | Paper outer band; rounded deep-blue card; audit-call photo and caption; offer, four-item checklist, yellow button, audit explanation link. | Shared marketing CTA. Good baseline anatomy once offer naming is resolved. |
| All generic service/industry/resource hubs, including Guides | `hub/Cta.astro` → `cta2` | Essentially the same blue photo/checklist card, independently implemented with hard-coded paid-media copy. | Unnecessary duplicate component. Consolidate with the previous row and supply content through props. |
| Work index and all 13 case studies | `company/Closing.astro` → `cta2` | Same visual family, but work-review photo/caption and no checklist. Case-study secondary link returns to Work; index links to Audit. | Image and secondary destination fit portfolio context. Preserve as data/options on the same component. |
| Contact | Local `cta2` | Blue photo card with strategy call and in-page brief link; no four-item checklist. | Manually written variant. Use shared CTA and reassess need after the page's main contact choices. |
| Tools index | Local `cta2` | Audit-call photo and strategy-call pitch; secondary “Browse the guides”; no checklist. | Manually written variant. Use shared CTA with tool-specific copy. |
| About | `ab-close` | Full-width photograph under a dark overlay, overlaid text and audit actions; no bounded blue card. | Bespoke company-page design. Offer does not require a different silhouette; align with marketing close unless this is an intentional brand moment. |
| Insights and three guide articles | `editorial/Cta.astro` → `ix-close` | Ink band, text/action columns, yellow booking button and white secondary link; no photo/checklist. | New editorial design deliberately echoes Home. Make this the official compact close or adopt the main marketing close. |
| Six calculators and Glossary | `ToolCTA` → `tl-cta` | Compact ink band, smaller heading, explanatory paragraph, booking and brief buttons. | Task-first context justifies compactness. Share compact-close anatomy and booking language with editorial pages. |
| Audit | FAQ | Booking calendar appears earlier; FAQ is the final content section before footer. | Valid exception: the page already contains the primary conversion task. No extra large marketing close is necessary. |
| Careers overview | `cr-close` | Candidate invitation with “One page” application messaging. | Different audience/action justifies copy and destination; shared base typography/button rules still apply. |
| Six role pages | Role body/application layout | Job description and application form; no separate marketing closing band. | Valid task-page exception. Footer booking pitch remains global chrome rather than part of the application. |
| Privacy and Terms | Legal text | Legal body ends immediately before footer; no marketing close. | Valid document exception. |
| AI overview and six AI service pages | `.band--sunsoft .cta` | Yellow gradient/sunburst band with centered pitch, booking/contact link and overview link. | Separate static sub-brand templates. Sub-brand variation can remain, but unify booking semantics and reusable button rules. |

**Footer distinction:** All non-AI pages share `components/Footer.astro`. AI pages use their own static `.foot` markup with a different logo presentation and link grouping. Do not describe every page as having a different footer; the main inconsistency is the preceding close.

<a id="page-section-inventory"></a>
## Appendix: every page and section

Each page below lists its current content in source/reading order. **Keep** means a difference serves a real content task. **Align** means the section should adopt a shared design or an explicit variant. **Review** means a content/interaction decision or visual test is needed. Nested modules are marked as such; they do not represent additional full-width sections. The inventory does not treat hidden application success states as simultaneously visible content.

Shared nav/footer, cookie banner, booking modal and AI launcher are covered in the review above rather than repeated as content sections on every page. Every entry includes its final section and its free-tool placements (excluding global navigation/footer links).



### Page 1: `/`

Source: [page template](../../mmc-astro/src/pages/index.astro).

| Order / section | Current treatment | Why different / judgment |
|---|---|---|
| 1. **Performance marketing that survives the P&L.** `#top` | Animated blue hero with orbit/loop diagram and inset headline image. | Keep distinctive Home introduction; align base hero type/actions with PageHero. |
| 2. **What we've built for the brands that trust us.** `#clients` | Paged client cards with logos, audience tags, two service highlights and work links. | Align client records and project actions with Work; intentional compact proof variant. |
| 3. **We don't just advise on the stack. We run it.** `#tools` | Slim moving platform-logo ribbon. This is software used by MMC, not free calculators. | Keep platform proof separate from free-tool discovery; avoid using “tools” ambiguously. |
| 4. **Creative, media and tech run as one growth system.** `#studio` | Shaped studio photograph, circular brand badge, editorial copy and principle row. | Keep storytelling composition; align recurring section headings/links with About. |
| 5. **Three kinds of business, one way of working.** `#who` | Three photo audience cards with icons and industry links. | Align with About/industry audience cards and labels; correct “work” destination wording (R04). |
| 6. **Six disciplines. One growth partner.** `#services` | Six discipline cards, 3D artwork, capability chips and diagonal link arrows. | Align with Services/About taxonomy and card hierarchy; dedicated Home implementation (R01). |
| 7. **Real projects, shown properly.** `#work` | Desktop pinned horizontal project rail; vertical fallback for touch/short/reduced-motion views. | Keep portfolio showcase where useful; align project-card actions with other proof (R11, R19). |
| 8. **Videos from the brands we work with.** `#voices` | Client video/testimonial presentation. | Keep video-specific controls and evidence; align heading and caption primitives. |
| 9. **Latest insights, plainly put.** `#insights` | Three image-led guide cards with badges and circular arrows. | Align with current GuideCard rather than maintain a parallel Home card family (R12). |
| 10. **Four weeks to a working engine.** `#process` | Four image step cards with phase numbers and timing labels. | Keep onboarding sequence; align generic step styling with other process sections. |
| 11. **Let's find out what a customer is actually worth.** `#close` | Ink booking section followed by four compact acronym-led calculator tiles. | Align closing CTA and separate/shared selected-tools module (R08, R09). |

**Immediately above the footer:** Let's find out what a customer is actually worth. (`hv-close no-section-bg`).

**Free-tool placements:** `#close`: `/tools/`, `/tools/unit-economics/`, `/tools/breakeven-roas/`, `/tools/cac-runway/`, `/tools/ltv-cac/`


### Page 2: `/about/`

Source: [page template](../../mmc-astro/src/pages/about.astro).

| Order / section | Current treatment | Why different / judgment |
|---|---|---|
| 1. **A marketing agency measured the way your business is measured.** `#top` | Editorial title/meta followed by large studio photograph. | Keep company storytelling hero; align its base type/spacing with the site. |
| 2. **A coordination problem, not a marketing problem** | Two-column narrative with sticky heading and opening drop cap. | Keep: narrative context differs from a service catalogue. |
| 3. **Five systems, one team** `#systems` | Five-system editorial list with images, descriptions and service links. | Align with Home’s six disciplines and Services’ taxonomy before styling (R01). |
| 4. **Five things we would put on the wall** `#principles` | Editorial principles list. | Keep values content; align numbering and heading treatment with other lists. |
| 5. **Three kinds of brand, one way of working** `#who` | Three numbered audience entries with imagery and descriptions. | Align names and card/row hierarchy with Home/Industries; density may vary. |
| 6. **Your numbers on screen first** `#practice` | Image/copy section explaining audit-first working practice. | Align process furniture; overlaps with Audit and Home process but adds company context. |
| 7. **What people ask about MMC** `#faq` | About-specific ruled accordion; independent question and answer spacing. | Align with common FAQ anatomy; bespoke About CSS rather than shared FAQ component (R10). |
| 8. **See what a senior team reads in your numbers.** `#talk` | Full-width photograph with dark overlay and audit actions. | Align main marketing closing pattern; same offer does not require new silhouette (R09). |

**Immediately above the footer:** See what a senior team reads in your numbers. (`ab-close`).

**Free-tool placements:** No dedicated main-content calculator promotion; absence alone is not an inconsistency.


### Page 3: `/services/`

Source: [page template](../../mmc-astro/src/pages/services/index.astro).

| Order / section | Current treatment | Why different / judgment |
|---|---|---|
| 1. **Marketing services for D2C , B2B and education brands.** `#top` | Blue hero; five image tiles link to system sections. | Align taxonomy with Home/About; visual hierarchy already follows shared hero. |
| 2. **In short** `#answer` | Paper summary card: lead, icon points and optional arched photograph. | Align full-summary anatomy; independent article/AI variants do the same job (R15). |
| 3. **Revenue Accelerators** `#revenue` | Alternating photo/text system section with service descriptions and text links. | Keep detailed catalogue density; align taxonomy and service primitives with Home/About (R01). |
| 4. **Organic Growth Engines** `#organic` | Alternating photo/text system section with service descriptions and text links. | Keep detailed catalogue density; align taxonomy and service primitives with Home/About (R01). |
| 5. **Brand Foundation Builders** `#brand` | Alternating photo/text system section with service descriptions and text links. | Keep detailed catalogue density; align taxonomy and service primitives with Home/About (R01). |
| 6. **Technology Drivers** `#tech` | Alternating photo/text system section with service descriptions and text links. | Keep detailed catalogue density; align taxonomy and service primitives with Home/About (R01). |
| 7. **Content Magnets** `#content` | Alternating photo/text system section with service descriptions and text links. | Keep detailed catalogue density; align taxonomy and service primitives with Home/About (R01). |
| 8. **Start from the problem, not the service.** `#start` | Dark problem-led chooser linking visitors to relevant services. | Keep decision aid; distinguish from metric/tool dark bands with clear labels (R18). |
| 9. **A few of the brands we work with.** `#work` | Client proof wall plus a break-even calculator text link. | Align proof cards; tool promotion is incidental and needs clearer separation (R08, R06/T9). |
| 10. **What people ask first.** `#faq` | Ruled marketing accordion rows with unboxed plus/minus controls. | Keep FAQ content; align controls/spacing across About, articles, tools and AI (R10). |
| 11. **Tell us the problem. We will say which system fixes it.** `#talk` | Paper band; blue rounded photo card, audit checklist, primary/secondary actions. | Align: common marketing close; duplicate implementations and service-offer mismatch (R02, R09). |

**Immediately above the footer:** Tell us the problem. We will say which system fixes it. (`n-band n-band--paper cta2`).

**Free-tool placements:** `#work`: `/tools/breakeven-roas/`


### Page 4: `/services/performance-marketing/`

Source: [page template](../../mmc-astro/src/pages/services/performance-marketing/index.astro).

| Order / section | Current treatment | Why different / judgment |
|---|---|---|
| 1. **Performance marketing for D2C brands in India.** `#top` | Blue shared hero with channel chips and a worked-economics visual. | Keep explanatory visual; align with the shared hero shell. |
| 2. **In short** `#answer` | Paper summary card: lead, icon points and optional arched photograph; includes audit action. | Align full-summary anatomy; independent article/AI variants do the same job (R15). |
| 3. **A 3x ROAS can still lose money.** `#margin` | Dark worked example showing ROAS versus margin; calculator button and related tool links. | Keep educational example; align embedded calculator actions with tool-link conventions (R08, R06/T9). |
| 4. **One order. Three dashboards claim it.** `#claims` | White illustrative dashboard-attribution comparison. | Keep explanatory diagram; align illustration labels with guide examples. |
| 5. **The first order loses. The repeat pays.** `#payback` | Paper worked explanation of first-order loss and repeat-purchase payback. | Keep topic-specific numerical visual; align example/callout typography. |
| 6. **Four channels, one account structure.** `#channels` | Four channel descriptions/cards. | Keep channel breakdown; align service-card title/action primitives. |
| 7. **Creative decides who stops scrolling.** `#creative` | Creative-format/examples section. | Keep creative evidence; align image/caption and onward-link styles. |
| 8. **The plan has to survive the maths.** `#process` | Working-process steps connecting economics and delivery. | Keep depth beyond Home summary; align phase names/numbers with it. |
| 9. **D2C brands that know their margins, or want to.** `#who` | Client-fit/qualification section. | Keep fit criteria; align audience/qualification presentation across marketing pages. |
| 10. **A few of the brands we run paid media for.** `#proof` | Paper client-logo wall with service labels and hover work imagery. | Align proof interaction: wall cells are not equivalent to Home’s linked project cards (R11). |
| 11. **What people ask first.** `#faq` | Ruled marketing accordion rows with unboxed plus/minus controls. | Keep FAQ content; align controls/spacing across About, articles, tools and AI (R10). |
| 12. **Related links and free calculators** `#related` | Compact related strip including free calculators and other destinations. | Align compact resource-navigation variant (R08, R06/T9); section lacks its own heading. |
| 13. **Find out what your ad spend really returns.** `#talk` | Paper band; blue rounded photo card, audit checklist, primary/secondary actions. | Align: common marketing close; duplicate implementations and service-offer mismatch (R02, R09). |

**Immediately above the footer:** Find out what your ad spend really returns. (`n-band n-band--paper cta2`).

**Free-tool placements:** `#margin`: `/tools/breakeven-roas/`, `/tools/funnel-roas/`, `/tools/unit-economics/`; `#faq`: `/tools/breakeven-roas/`; `#related`: `/tools/`


### Page 5: `/services/branding/`

Source: [hub template](../../mmc-astro/src/pages/%5B...slug%5D.astro) and [page content](../../mmc-astro/src/data/hubs/services__branding.json).

| Order / section | Current treatment | Why different / judgment |
|---|---|---|
| 1. **Branding and identity that makes you memorable in India.** `#top` | Blue marketing hero with eyebrow, mixed-emphasis heading, actions and image mosaic. | Keep common hero shell; route-specific copy/images are expected. Audit label needs scope check (R02). |
| 2. **In short** `#answer` | Paper summary card: lead, icon points and optional arched photograph. | Align full-summary anatomy; independent article/AI variants do the same job (R15). |
| 3. **Five ways a brand ends up forgettable.** `#leaks` | Paper band with sticky image/text cards, stage counters and onward actions. | Align problem/solution anatomy; stacked variant comes from hub data (R14). |
| 4. **Four parts of a brand that holds together.** `#numbers` | Dark four-card band; static metrics/deliverables/checks. | Keep topic-specific criteria; use a static metric/deliverable variant, not tool-card affordances (R18). |
| 5. **See where branding fits in the wider picture.** `#beyond` | White band; two/three image-and-text related cards; text links rather than whole-card links. | Align with editorial resource cards; same related-content job, generic Beyond component (R12). |
| 6. **What people ask about branding first.** `#faq` | Ruled marketing accordion rows with unboxed plus/minus controls. | Keep FAQ content; align controls/spacing across About, articles, tools and AI (R10). |
| 7. **Find what your brand should stand for.** `#talk` | Paper band; blue rounded photo card, audit checklist, primary/secondary actions. | Align: common marketing close; duplicate implementations and service-offer mismatch (R02, R09). |

**Immediately above the footer:** Find what your brand should stand for. (`n-band n-band--paper cta2`).

**Free-tool placements:** No dedicated main-content calculator promotion; absence alone is not an inconsistency.


### Page 6: `/services/cro/`

Source: [hub template](../../mmc-astro/src/pages/%5B...slug%5D.astro) and [page content](../../mmc-astro/src/data/hubs/services__cro.json).

| Order / section | Current treatment | Why different / judgment |
|---|---|---|
| 1. **Conversion optimisation that turns visitors into buyers in India.** `#top` | Blue marketing hero with eyebrow, mixed-emphasis heading, actions and image mosaic. | Keep common hero shell; route-specific copy/images are expected. Audit label needs scope check (R02). |
| 2. **In short** `#answer` | Paper summary card: lead, icon points and optional arched photograph. | Align full-summary anatomy; independent article/AI variants do the same job (R15). |
| 3. **Five places visitors leave without buying.** `#leaks` | Paper band with sticky image/text cards, stage counters and onward actions. | Align problem/solution anatomy; stacked variant comes from hub data (R14). |
| 4. **Know these four before you change a page.** `#numbers` | Dark four-card band; 2 calculator links plus 2 static metrics. | Align tool cards with shared resource family (R08). |
| 5. **Some of the brands we run CRO for.** `#brands` | Paper client-logo wall with service labels and hover work imagery. | Align proof interaction: wall cells are not equivalent to Home’s linked project cards (R11). |
| 6. **See where conversion fits in the wider picture.** `#beyond` | White band; two/three image-and-text related cards; text links rather than whole-card links. | Align with editorial resource cards; same related-content job, generic Beyond component (R12). |
| 7. **What people ask about CRO first.** `#faq` | Ruled marketing accordion rows with unboxed plus/minus controls. | Keep FAQ content; align controls/spacing across About, articles, tools and AI (R10). |
| 8. **Find where your visitors leave.** `#talk` | Paper band; blue rounded photo card, audit checklist, primary/secondary actions. | Align: common marketing close; duplicate implementations and service-offer mismatch (R02, R09). |

**Immediately above the footer:** Find where your visitors leave. (`n-band n-band--paper cta2`).

**Free-tool placements:** `#numbers`: `/tools/funnel-roas/`, `/tools/unit-economics/`


### Page 7: `/services/influencer-marketing/`

Source: [hub template](../../mmc-astro/src/pages/%5B...slug%5D.astro) and [page content](../../mmc-astro/src/data/hubs/services__influencer-marketing.json).

| Order / section | Current treatment | Why different / judgment |
|---|---|---|
| 1. **Influencer marketing chosen for fit , not follower count.** `#top` | Blue marketing hero with eyebrow, mixed-emphasis heading, actions and image mosaic. | Keep common hero shell; route-specific copy/images are expected. Audit label needs scope check (R02). |
| 2. **In short** `#answer` | Paper summary card: lead, icon points and optional arched photograph. | Align full-summary anatomy; independent article/AI variants do the same job (R15). |
| 3. **Five ways creator budgets are wasted.** `#leaks` | Paper band with sticky image/text cards, stage counters and onward actions. | Align problem/solution anatomy; stacked variant comes from hub data (R14). |
| 4. **Four numbers that show whether creators are worth it.** `#numbers` | Dark four-card band; static metrics/deliverables/checks. | Keep topic-specific criteria; use a static metric/deliverable variant, not tool-card affordances (R18). |
| 5. **See where creators fit in the wider picture.** `#beyond` | White band; two/three image-and-text related cards; text links rather than whole-card links. | Align with editorial resource cards; same related-content job, generic Beyond component (R12). |
| 6. **What people ask about influencer marketing first.** `#faq` | Ruled marketing accordion rows with unboxed plus/minus controls. | Keep FAQ content; align controls/spacing across About, articles, tools and AI (R10). |
| 7. **See who should be talking about your brand.** `#talk` | Paper band; blue rounded photo card, audit checklist, primary/secondary actions. | Align: common marketing close; duplicate implementations and service-offer mismatch (R02, R09). |

**Immediately above the footer:** See who should be talking about your brand. (`n-band n-band--paper cta2`).

**Free-tool placements:** No dedicated main-content calculator promotion; absence alone is not an inconsistency.


### Page 8: `/services/lead-generation/`

Source: [hub template](../../mmc-astro/src/pages/%5B...slug%5D.astro) and [page content](../../mmc-astro/src/data/hubs/services__lead-generation.json).

| Order / section | Current treatment | Why different / judgment |
|---|---|---|
| 1. **Lead generation that brings in qualified leads in India.** `#top` | Blue marketing hero with eyebrow, mixed-emphasis heading, actions and image mosaic. | Keep common hero shell; route-specific copy/images are expected. Audit label needs scope check (R02). |
| 2. **In short** `#answer` | Paper summary card: lead, icon points and optional arched photograph. | Align full-summary anatomy; independent article/AI variants do the same job (R15). |
| 3. **Five mistakes that fill the funnel with the wrong leads.** `#leaks` | Paper band with sticky image/text cards, stage counters and onward actions. | Align problem/solution anatomy; stacked variant comes from hub data (R14). |
| 4. **How CRM and Meta CAPI make leads better.** `#quality` | Light CRM feedback diagram and before/after comparison cards. | Align with Education’s dark version: same explanatory job, variant B selected by data (R13). |
| 5. **Know these four before you spend on leads.** `#numbers` | Dark four-card band; 2 calculator links plus 2 static metrics. | Align tool cards with shared resource family (R08). |
| 6. **Some of the brands we run lead generation for.** `#brands` | Paper client-logo wall with service labels and hover work imagery. | Align proof interaction: wall cells are not equivalent to Home’s linked project cards (R11). |
| 7. **See how it works for your kind of business.** `#beyond` | White band; two/three image-and-text related cards; text links rather than whole-card links. | Align with editorial resource cards; same related-content job, generic Beyond component (R12). |
| 8. **What people ask about lead generation first.** `#faq` | Ruled marketing accordion rows with unboxed plus/minus controls. | Keep FAQ content; align controls/spacing across About, articles, tools and AI (R10). |
| 9. **Find what a qualified lead really costs you.** `#talk` | Paper band; blue rounded photo card, audit checklist, primary/secondary actions. | Align: common marketing close; duplicate implementations and service-offer mismatch (R02, R09). |

**Immediately above the footer:** Find what a qualified lead really costs you. (`n-band n-band--paper cta2`).

**Free-tool placements:** `#numbers`: `/tools/cac-runway/`, `/tools/ltv-cac/`


### Page 9: `/services/mobile-app-development/`

Source: [hub template](../../mmc-astro/src/pages/%5B...slug%5D.astro) and [page content](../../mmc-astro/src/data/hubs/services__mobile-app-development.json).

| Order / section | Current treatment | Why different / judgment |
|---|---|---|
| 1. **Mobile app development for customers who come back in India.** `#top` | Blue marketing hero with eyebrow, mixed-emphasis heading, actions and image mosaic. | Keep common hero shell; route-specific copy/images are expected. Audit label needs scope check (R02). |
| 2. **In short** `#answer` | Paper summary card: lead, icon points and optional arched photograph. | Align full-summary anatomy; independent article/AI variants do the same job (R15). |
| 3. **Five reasons apps get installed and forgotten.** `#leaks` | Paper band with sticky image/text cards, stage counters and onward actions. | Align problem/solution anatomy; stacked variant comes from hub data (R14). |
| 4. **Four numbers that show whether an app is earning its place.** `#numbers` | Dark four-card band; static metrics/deliverables/checks. | Keep topic-specific criteria; use a static metric/deliverable variant, not tool-card affordances (R18). |
| 5. **See where the app fits in the wider picture.** `#beyond` | White band; two/three image-and-text related cards; text links rather than whole-card links. | Align with editorial resource cards; same related-content job, generic Beyond component (R12). |
| 6. **What people ask about apps first.** `#faq` | Ruled marketing accordion rows with unboxed plus/minus controls. | Keep FAQ content; align controls/spacing across About, articles, tools and AI (R10). |
| 7. **Find out if an app is worth it.** `#talk` | Paper band; blue rounded photo card, audit checklist, primary/secondary actions. | Align: common marketing close; duplicate implementations and service-offer mismatch (R02, R09). |

**Immediately above the footer:** Find out if an app is worth it. (`n-band n-band--paper cta2`).

**Free-tool placements:** No dedicated main-content calculator promotion; absence alone is not an inconsistency.


### Page 10: `/services/online-reputation-management/`

Source: [hub template](../../mmc-astro/src/pages/%5B...slug%5D.astro) and [page content](../../mmc-astro/src/data/hubs/services__online-reputation-management.json).

| Order / section | Current treatment | Why different / judgment |
|---|---|---|
| 1. **Online reputation management that earns trust in India.** `#top` | Blue marketing hero with eyebrow, mixed-emphasis heading, actions and image mosaic. | Keep common hero shell; route-specific copy/images are expected. Audit label needs scope check (R02). |
| 2. **In short** `#answer` | Paper summary card: lead, icon points and optional arched photograph. | Align full-summary anatomy; independent article/AI variants do the same job (R15). |
| 3. **Five ways a doubtful buyer is lost before they call.** `#leaks` | Paper band with sticky image/text cards, stage counters and onward actions. | Align problem/solution anatomy; stacked variant comes from hub data (R14). |
| 4. **Four signals a buyer reads before they call.** `#numbers` | Dark four-card band; static metrics/deliverables/checks. | Keep topic-specific criteria; use a static metric/deliverable variant, not tool-card affordances (R18). |
| 5. **See why it matters for your kind of business.** `#beyond` | White band; two/three image-and-text related cards; text links rather than whole-card links. | Align with editorial resource cards; same related-content job, generic Beyond component (R12). |
| 6. **What people ask about reputation first.** `#faq` | Ruled marketing accordion rows with unboxed plus/minus controls. | Keep FAQ content; align controls/spacing across About, articles, tools and AI (R10). |
| 7. **See what people find when they search your name.** `#talk` | Paper band; blue rounded photo card, audit checklist, primary/secondary actions. | Align: common marketing close; duplicate implementations and service-offer mismatch (R02, R09). |

**Immediately above the footer:** See what people find when they search your name. (`n-band n-band--paper cta2`).

**Free-tool placements:** No dedicated main-content calculator promotion; absence alone is not an inconsistency.


### Page 11: `/services/packaging-design/`

Source: [hub template](../../mmc-astro/src/pages/%5B...slug%5D.astro) and [page content](../../mmc-astro/src/data/hubs/services__packaging-design.json).

| Order / section | Current treatment | Why different / judgment |
|---|---|---|
| 1. **Packaging design that earns attention on shelf and on screen.** `#top` | Blue marketing hero with eyebrow, mixed-emphasis heading, actions and image mosaic. | Keep common hero shell; route-specific copy/images are expected. Audit label needs scope check (R02). |
| 2. **In short** `#answer` | Paper summary card: lead, icon points and optional arched photograph. | Align full-summary anatomy; independent article/AI variants do the same job (R15). |
| 3. **Five ways a pack loses the sale before it is read.** `#leaks` | Paper band with sticky image/text cards, stage counters and onward actions. | Align problem/solution anatomy; stacked variant comes from hub data (R14). |
| 4. **Four checks before a pack goes to print.** `#numbers` | Dark four-card band; static metrics/deliverables/checks. | Keep topic-specific criteria; use a static metric/deliverable variant, not tool-card affordances (R18). |
| 5. **See where packaging fits in the wider picture.** `#beyond` | White band; two/three image-and-text related cards; text links rather than whole-card links. | Align with editorial resource cards; same related-content job, generic Beyond component (R12). |
| 6. **What people ask about packaging first.** `#faq` | Ruled marketing accordion rows with unboxed plus/minus controls. | Keep FAQ content; align controls/spacing across About, articles, tools and AI (R10). |
| 7. **See how your pack looks at a glance.** `#talk` | Paper band; blue rounded photo card, audit checklist, primary/secondary actions. | Align: common marketing close; duplicate implementations and service-offer mismatch (R02, R09). |

**Immediately above the footer:** See how your pack looks at a glance. (`n-band n-band--paper cta2`).

**Free-tool placements:** No dedicated main-content calculator promotion; absence alone is not an inconsistency.


### Page 12: `/services/performance-marketing/amazon-ads/`

Source: [hub template](../../mmc-astro/src/pages/%5B...slug%5D.astro) and [page content](../../mmc-astro/src/data/hubs/services__performance-marketing__amazon-ads.json).

| Order / section | Current treatment | Why different / judgment |
|---|---|---|
| 1. **Amazon ads management for D2C brands in India.** `#top` | Blue marketing hero with eyebrow, mixed-emphasis heading, actions and image mosaic. | Keep common hero shell; route-specific copy/images are expected. Audit label needs scope check (R02). |
| 2. **In short** `#answer` | Paper summary card: lead, icon points and optional arched photograph. | Align full-summary anatomy; independent article/AI variants do the same job (R15). |
| 3. **Five ways Amazon spend fails to pay back.** `#leaks` | Paper band with sticky image/text cards, stage counters and onward actions. | Align problem/solution anatomy; stacked variant comes from hub data (R14). |
| 4. **Know these four before you advertise on Amazon.** `#numbers` | Dark four-card band; 1 calculator links plus 3 static metrics. | Align tool cards with shared resource family (R08). |
| 5. **A brand we run Amazon ads for.** `#brands` | Paper client-logo wall with service labels and hover work imagery. | Align proof interaction: wall cells are not equivalent to Home’s linked project cards (R11). |
| 6. **See where Amazon fits in the wider picture.** `#beyond` | White band; two/three image-and-text related cards; text links rather than whole-card links. | Align with editorial resource cards; same related-content job, generic Beyond component (R12). |
| 7. **What people ask about Amazon ads first.** `#faq` | Ruled marketing accordion rows with unboxed plus/minus controls. | Keep FAQ content; align controls/spacing across About, articles, tools and AI (R10). |
| 8. **Find out what your Amazon spend really adds.** `#talk` | Paper band; blue rounded photo card, audit checklist, primary/secondary actions. | Align: common marketing close; duplicate implementations and service-offer mismatch (R02, R09). |

**Immediately above the footer:** Find out what your Amazon spend really adds. (`n-band n-band--paper cta2`).

**Free-tool placements:** `#numbers`: `/tools/breakeven-roas/`


### Page 13: `/services/performance-marketing/google-ads/`

Source: [hub template](../../mmc-astro/src/pages/%5B...slug%5D.astro) and [page content](../../mmc-astro/src/data/hubs/services__performance-marketing__google-ads.json).

| Order / section | Current treatment | Why different / judgment |
|---|---|---|
| 1. **Google Ads management for growing brands in India.** `#top` | Blue marketing hero with eyebrow, mixed-emphasis heading, actions and image mosaic. | Keep common hero shell; route-specific copy/images are expected. Audit label needs scope check (R02). |
| 2. **In short** `#answer` | Paper summary card: lead, icon points and optional arched photograph. | Align full-summary anatomy; independent article/AI variants do the same job (R15). |
| 3. **Five ways Google spend gets wasted.** `#leaks` | Paper band with sticky image/text cards, stage counters and onward actions. | Align problem/solution anatomy; stacked variant comes from hub data (R14). |
| 4. **Know these four before you scale Google.** `#numbers` | Dark four-card band; 2 calculator links plus 2 static metrics. | Align tool cards with shared resource family (R08). |
| 5. **See where Google fits in the wider picture.** `#beyond` | White band; two/three image-and-text related cards; text links rather than whole-card links. | Align with editorial resource cards; same related-content job, generic Beyond component (R12). |
| 6. **What people ask about Google Ads first.** `#faq` | Ruled marketing accordion rows with unboxed plus/minus controls. | Keep FAQ content; align controls/spacing across About, articles, tools and AI (R10). |
| 7. **Find out where your Google spend really goes.** `#talk` | Paper band; blue rounded photo card, audit checklist, primary/secondary actions. | Align: common marketing close; duplicate implementations and service-offer mismatch (R02, R09). |

**Immediately above the footer:** Find out where your Google spend really goes. (`n-band n-band--paper cta2`).

**Free-tool placements:** `#numbers`: `/tools/breakeven-roas/`, `/tools/unit-economics/`


### Page 14: `/services/performance-marketing/meta-ads/`

Source: [hub template](../../mmc-astro/src/pages/%5B...slug%5D.astro) and [page content](../../mmc-astro/src/data/hubs/services__performance-marketing__meta-ads.json).

| Order / section | Current treatment | Why different / judgment |
|---|---|---|
| 1. **Meta ads management for growing brands in India.** `#top` | Blue marketing hero with eyebrow, mixed-emphasis heading, actions and image mosaic. | Keep common hero shell; route-specific copy/images are expected. Audit label needs scope check (R02). |
| 2. **In short** `#answer` | Paper summary card: lead, icon points and optional arched photograph. | Align full-summary anatomy; independent article/AI variants do the same job (R15). |
| 3. **Five reasons Meta spend stops paying back.** `#leaks` | Paper band with sticky image/text cards, stage counters and onward actions. | Align problem/solution anatomy; stacked variant comes from hub data (R14). |
| 4. **Know these four before you raise a budget.** `#numbers` | Dark four-card band; 2 calculator links plus 2 static metrics. | Align tool cards with shared resource family (R08). |
| 5. **Some of the brands we run performance ads for.** `#brands` | Paper client-logo wall with service labels and hover work imagery. | Align proof interaction: wall cells are not equivalent to Home’s linked project cards (R11). |
| 6. **See where Meta fits in the wider picture.** `#beyond` | White band; two/three image-and-text related cards; text links rather than whole-card links. | Align with editorial resource cards; same related-content job, generic Beyond component (R12). |
| 7. **What people ask about Meta ads first.** `#faq` | Ruled marketing accordion rows with unboxed plus/minus controls. | Keep FAQ content; align controls/spacing across About, articles, tools and AI (R10). |
| 8. **Find out what your Meta spend really returns.** `#talk` | Paper band; blue rounded photo card, audit checklist, primary/secondary actions. | Align: common marketing close; duplicate implementations and service-offer mismatch (R02, R09). |

**Immediately above the footer:** Find out what your Meta spend really returns. (`n-band n-band--paper cta2`).

**Free-tool placements:** `#numbers`: `/tools/breakeven-roas/`, `/tools/unit-economics/`


### Page 15: `/services/performance-marketing/quick-commerce/`

Source: [hub template](../../mmc-astro/src/pages/%5B...slug%5D.astro) and [page content](../../mmc-astro/src/data/hubs/services__performance-marketing__quick-commerce.json).

| Order / section | Current treatment | Why different / judgment |
|---|---|---|
| 1. **Quick commerce ads for D2C brands in India.** `#top` | Blue marketing hero with eyebrow, mixed-emphasis heading, actions and image mosaic. | Keep common hero shell; route-specific copy/images are expected. Audit label needs scope check (R02). |
| 2. **In short** `#answer` | Paper summary card: lead, icon points and optional arched photograph. | Align full-summary anatomy; independent article/AI variants do the same job (R15). |
| 3. **Five ways quick-commerce spend goes to waste.** `#leaks` | Paper band with sticky image/text cards, stage counters and onward actions. | Align problem/solution anatomy; stacked variant comes from hub data (R14). |
| 4. **Know these four before you go quick.** `#numbers` | Dark four-card band; 1 calculator links plus 3 static metrics. | Align tool cards with shared resource family (R08). |
| 5. **A brand we run quick-commerce ads for.** `#brands` | Paper client-logo wall with service labels and hover work imagery. | Align proof interaction: wall cells are not equivalent to Home’s linked project cards (R11). |
| 6. **See where quick commerce fits in the wider picture.** `#beyond` | White band; two/three image-and-text related cards; text links rather than whole-card links. | Align with editorial resource cards; same related-content job, generic Beyond component (R12). |
| 7. **What people ask about quick commerce first.** `#faq` | Ruled marketing accordion rows with unboxed plus/minus controls. | Keep FAQ content; align controls/spacing across About, articles, tools and AI (R10). |
| 8. **Find out what quick commerce could add.** `#talk` | Paper band; blue rounded photo card, audit checklist, primary/secondary actions. | Align: common marketing close; duplicate implementations and service-offer mismatch (R02, R09). |

**Immediately above the footer:** Find out what quick commerce could add. (`n-band n-band--paper cta2`).

**Free-tool placements:** `#numbers`: `/tools/breakeven-roas/`


### Page 16: `/services/retention-marketing/`

Source: [hub template](../../mmc-astro/src/pages/%5B...slug%5D.astro) and [page content](../../mmc-astro/src/data/hubs/services__retention-marketing.json).

| Order / section | Current treatment | Why different / judgment |
|---|---|---|
| 1. **Retention marketing that brings buyers back in India.** `#top` | Blue marketing hero with eyebrow, mixed-emphasis heading, actions and image mosaic. | Keep common hero shell; route-specific copy/images are expected. Audit label needs scope check (R02). |
| 2. **In short** `#answer` | Paper summary card: lead, icon points and optional arched photograph. | Align full-summary anatomy; independent article/AI variants do the same job (R15). |
| 3. **Five moments customers and leads drift away.** `#leaks` | Paper band with sticky image/text cards, stage counters and onward actions. | Align problem/solution anatomy; stacked variant comes from hub data (R14). |
| 4. **Know these four before you spend on retention.** `#numbers` | Dark four-card band; 2 calculator links plus 2 static metrics. | Align tool cards with shared resource family (R08). |
| 5. **See where retention fits in the wider picture.** `#beyond` | White band; two/three image-and-text related cards; text links rather than whole-card links. | Align with editorial resource cards; same related-content job, generic Beyond component (R12). |
| 6. **What people ask about retention first.** `#faq` | Ruled marketing accordion rows with unboxed plus/minus controls. | Keep FAQ content; align controls/spacing across About, articles, tools and AI (R10). |
| 7. **Find out what your customers do next.** `#talk` | Paper band; blue rounded photo card, audit checklist, primary/secondary actions. | Align: common marketing close; duplicate implementations and service-offer mismatch (R02, R09). |

**Immediately above the footer:** Find out what your customers do next. (`n-band n-band--paper cta2`).

**Free-tool placements:** `#numbers`: `/tools/ltv-cac/`, `/tools/unit-economics/`


### Page 17: `/services/seo/`

Source: [hub template](../../mmc-astro/src/pages/%5B...slug%5D.astro) and [page content](../../mmc-astro/src/data/hubs/services__seo.json).

| Order / section | Current treatment | Why different / judgment |
|---|---|---|
| 1. **SEO that gets you found by buyers and AI answers in India.** `#top` | Blue marketing hero with eyebrow, mixed-emphasis heading, actions and image mosaic. | Keep common hero shell; route-specific copy/images are expected. Audit label needs scope check (R02). |
| 2. **In short** `#answer` | Paper summary card: lead, icon points and optional arched photograph. | Align full-summary anatomy; independent article/AI variants do the same job (R15). |
| 3. **Five reasons the right searches never reach you.** `#leaks` | Paper band with sticky image/text cards, stage counters and onward actions. | Align problem/solution anatomy; stacked variant comes from hub data (R14). |
| 4. **Four numbers that show whether SEO is working.** `#numbers` | Dark four-card band; static metrics/deliverables/checks. | Keep topic-specific criteria; use a static metric/deliverable variant, not tool-card affordances (R18). |
| 5. **See where SEO fits in the wider picture.** `#beyond` | White band; two/three image-and-text related cards; text links rather than whole-card links. | Align with editorial resource cards; same related-content job, generic Beyond component (R12). |
| 6. **What people ask about SEO first.** `#faq` | Ruled marketing accordion rows with unboxed plus/minus controls. | Keep FAQ content; align controls/spacing across About, articles, tools and AI (R10). |
| 7. **Find out what search is missing about you.** `#talk` | Paper band; blue rounded photo card, audit checklist, primary/secondary actions. | Align: common marketing close; duplicate implementations and service-offer mismatch (R02, R09). |

**Immediately above the footer:** Find out what search is missing about you. (`n-band n-band--paper cta2`).

**Free-tool placements:** No dedicated main-content calculator promotion; absence alone is not an inconsistency.


### Page 18: `/services/shopify-development/`

Source: [hub template](../../mmc-astro/src/pages/%5B...slug%5D.astro) and [page content](../../mmc-astro/src/data/hubs/services__shopify-development.json).

| Order / section | Current treatment | Why different / judgment |
|---|---|---|
| 1. **Shopify development for D2C brands in India.** `#top` | Blue marketing hero with eyebrow, mixed-emphasis heading, actions and image mosaic. | Keep common hero shell; route-specific copy/images are expected. Audit label needs scope check (R02). |
| 2. **In short** `#answer` | Paper summary card: lead, icon points and optional arched photograph. | Align full-summary anatomy; independent article/AI variants do the same job (R15). |
| 3. **Five build mistakes that cost sales later.** `#leaks` | Paper band with sticky image/text cards, stage counters and onward actions. | Align problem/solution anatomy; stacked variant comes from hub data (R14). |
| 4. **Know these four before you build a store.** `#numbers` | Dark four-card band; 2 calculator links plus 2 static metrics. | Align tool cards with shared resource family (R08). |
| 5. **Some of the brands we build websites for.** `#brands` | Paper client-logo wall with service labels and hover work imagery. | Align proof interaction: wall cells are not equivalent to Home’s linked project cards (R11). |
| 6. **See where the store fits in the wider picture.** `#beyond` | White band; two/three image-and-text related cards; text links rather than whole-card links. | Align with editorial resource cards; same related-content job, generic Beyond component (R12). |
| 7. **What people ask about Shopify first.** `#faq` | Ruled marketing accordion rows with unboxed plus/minus controls. | Keep FAQ content; align controls/spacing across About, articles, tools and AI (R10). |
| 8. **Plan a store that sells.** `#talk` | Paper band; blue rounded photo card, audit checklist, primary/secondary actions. | Align: common marketing close; duplicate implementations and service-offer mismatch (R02, R09). |

**Immediately above the footer:** Plan a store that sells. (`n-band n-band--paper cta2`).

**Free-tool placements:** `#numbers`: `/tools/unit-economics/`, `/tools/breakeven-roas/`


### Page 19: `/services/social-media/`

Source: [hub template](../../mmc-astro/src/pages/%5B...slug%5D.astro) and [page content](../../mmc-astro/src/data/hubs/services__social-media.json).

| Order / section | Current treatment | Why different / judgment |
|---|---|---|
| 1. **Social media creatives that keep a brand present in India.** `#top` | Blue marketing hero with eyebrow, mixed-emphasis heading, actions and image mosaic. | Keep common hero shell; route-specific copy/images are expected. Audit label needs scope check (R02). |
| 2. **In short** `#answer` | Paper summary card: lead, icon points and optional arched photograph. | Align full-summary anatomy; independent article/AI variants do the same job (R15). |
| 3. **Five reasons a brand feed does not connect.** `#leaks` | Paper band with sticky image/text cards, stage counters and onward actions. | Align problem/solution anatomy; stacked variant comes from hub data (R14). |
| 4. **Four signals that show whether social is working.** `#numbers` | Dark four-card band; static metrics/deliverables/checks. | Keep topic-specific criteria; use a static metric/deliverable variant, not tool-card affordances (R18). |
| 5. **Some of the brands we make social creatives for.** `#brands` | Paper client-logo wall with service labels and hover work imagery. | Align proof interaction: wall cells are not equivalent to Home’s linked project cards (R11). |
| 6. **See where social fits in the wider picture.** `#beyond` | White band; two/three image-and-text related cards; text links rather than whole-card links. | Align with editorial resource cards; same related-content job, generic Beyond component (R12). |
| 7. **What people ask about social media first.** `#faq` | Ruled marketing accordion rows with unboxed plus/minus controls. | Keep FAQ content; align controls/spacing across About, articles, tools and AI (R10). |
| 8. **See what your feed could say.** `#talk` | Paper band; blue rounded photo card, audit checklist, primary/secondary actions. | Align: common marketing close; duplicate implementations and service-offer mismatch (R02, R09). |

**Immediately above the footer:** See what your feed could say. (`n-band n-band--paper cta2`).

**Free-tool placements:** No dedicated main-content calculator promotion; absence alone is not an inconsistency.


### Page 20: `/services/ugc-and-video/`

Source: [hub template](../../mmc-astro/src/pages/%5B...slug%5D.astro) and [page content](../../mmc-astro/src/data/hubs/services__ugc-and-video.json).

| Order / section | Current treatment | Why different / judgment |
|---|---|---|
| 1. **UGC and video ads made to run as ads in India.** `#top` | Blue marketing hero with eyebrow, mixed-emphasis heading, actions and image mosaic. | Keep common hero shell; route-specific copy/images are expected. Audit label needs scope check (R02). |
| 2. **In short** `#answer` | Paper summary card: lead, icon points and optional arched photograph. | Align full-summary anatomy; independent article/AI variants do the same job (R15). |
| 3. **Five reasons ad creative stops working.** `#leaks` | Paper band with sticky image/text cards, stage counters and onward actions. | Align problem/solution anatomy; stacked variant comes from hub data (R14). |
| 4. **Four signals that show whether creative is working.** `#numbers` | Dark four-card band; static metrics/deliverables/checks. | Keep topic-specific criteria; use a static metric/deliverable variant, not tool-card affordances (R18). |
| 5. **Some of the brands we make creative for.** `#brands` | Paper client-logo wall with service labels and hover work imagery. | Align proof interaction: wall cells are not equivalent to Home’s linked project cards (R11). |
| 6. **See where creative fits in the wider picture.** `#beyond` | White band; two/three image-and-text related cards; text links rather than whole-card links. | Align with editorial resource cards; same related-content job, generic Beyond component (R12). |
| 7. **What people ask about UGC and video first.** `#faq` | Ruled marketing accordion rows with unboxed plus/minus controls. | Keep FAQ content; align controls/spacing across About, articles, tools and AI (R10). |
| 8. **See what your next round of creative should be.** `#talk` | Paper band; blue rounded photo card, audit checklist, primary/secondary actions. | Align: common marketing close; duplicate implementations and service-offer mismatch (R02, R09). |

**Immediately above the footer:** See what your next round of creative should be. (`n-band n-band--paper cta2`).

**Free-tool placements:** No dedicated main-content calculator promotion; absence alone is not an inconsistency.


### Page 21: `/services/ui-ux-design/`

Source: [hub template](../../mmc-astro/src/pages/%5B...slug%5D.astro) and [page content](../../mmc-astro/src/data/hubs/services__ui-ux-design.json).

| Order / section | Current treatment | Why different / judgment |
|---|---|---|
| 1. **UI/UX design that people find easy to use in India.** `#top` | Blue marketing hero with eyebrow, mixed-emphasis heading, actions and image mosaic. | Keep common hero shell; route-specific copy/images are expected. Audit label needs scope check (R02). |
| 2. **In short** `#answer` | Paper summary card: lead, icon points and optional arched photograph. | Align full-summary anatomy; independent article/AI variants do the same job (R15). |
| 3. **Five reasons users struggle with a site or app.** `#leaks` | Paper band with sticky image/text cards, stage counters and onward actions. | Align problem/solution anatomy; stacked variant comes from hub data (R14). |
| 4. **Four signs an interface is working.** `#numbers` | Dark four-card band; static metrics/deliverables/checks. | Keep topic-specific criteria; use a static metric/deliverable variant, not tool-card affordances (R18). |
| 5. **See where UX fits in the wider picture.** `#beyond` | White band; two/three image-and-text related cards; text links rather than whole-card links. | Align with editorial resource cards; same related-content job, generic Beyond component (R12). |
| 6. **What people ask about UI/UX first.** `#faq` | Ruled marketing accordion rows with unboxed plus/minus controls. | Keep FAQ content; align controls/spacing across About, articles, tools and AI (R10). |
| 7. **See where users get stuck.** `#talk` | Paper band; blue rounded photo card, audit checklist, primary/secondary actions. | Align: common marketing close; duplicate implementations and service-offer mismatch (R02, R09). |

**Immediately above the footer:** See where users get stuck. (`n-band n-band--paper cta2`).

**Free-tool placements:** No dedicated main-content calculator promotion; absence alone is not an inconsistency.


### Page 22: `/services/web-development/`

Source: [hub template](../../mmc-astro/src/pages/%5B...slug%5D.astro) and [page content](../../mmc-astro/src/data/hubs/services__web-development.json).

| Order / section | Current treatment | Why different / judgment |
|---|---|---|
| 1. **Website development built to convert and be found in India.** `#top` | Blue marketing hero with eyebrow, mixed-emphasis heading, actions and image mosaic. | Keep common hero shell; route-specific copy/images are expected. Audit label needs scope check (R02). |
| 2. **In short** `#answer` | Paper summary card: lead, icon points and optional arched photograph. | Align full-summary anatomy; independent article/AI variants do the same job (R15). |
| 3. **Five ways a website fails the people who visit.** `#leaks` | Paper band with sticky image/text cards, stage counters and onward actions. | Align problem/solution anatomy; stacked variant comes from hub data (R14). |
| 4. **Four numbers that show whether a site is doing its job.** `#numbers` | Dark four-card band; static metrics/deliverables/checks. | Keep topic-specific criteria; use a static metric/deliverable variant, not tool-card affordances (R18). |
| 5. **Some of the brands we build websites for.** `#brands` | Paper client-logo wall with service labels and hover work imagery. | Align proof interaction: wall cells are not equivalent to Home’s linked project cards (R11). |
| 6. **See where the website fits in the wider picture.** `#beyond` | White band; two/three image-and-text related cards; text links rather than whole-card links. | Align with editorial resource cards; same related-content job, generic Beyond component (R12). |
| 7. **What people ask about websites first.** `#faq` | Ruled marketing accordion rows with unboxed plus/minus controls. | Keep FAQ content; align controls/spacing across About, articles, tools and AI (R10). |
| 8. **Plan a site that gets enquiries.** `#talk` | Paper band; blue rounded photo card, audit checklist, primary/secondary actions. | Align: common marketing close; duplicate implementations and service-offer mismatch (R02, R09). |

**Immediately above the footer:** Plan a site that gets enquiries. (`n-band n-band--paper cta2`).

**Free-tool placements:** No dedicated main-content calculator promotion; absence alone is not an inconsistency.


### Page 23: `/industries/`

Source: [hub template](../../mmc-astro/src/pages/%5B...slug%5D.astro) and [page content](../../mmc-astro/src/data/hubs/industries.json).

| Order / section | Current treatment | Why different / judgment |
|---|---|---|
| 1. **Marketing built for D2C, B2B and education brands in India.** `#top` | Blue marketing hero with eyebrow, mixed-emphasis heading, actions and image mosaic. | Keep common hero shell; route-specific copy/images are expected. Audit label needs scope check (R02). |
| 2. **In short** `#answer` | Paper summary card: lead, icon points and optional arched photograph. | Align full-summary anatomy; independent article/AI variants do the same job (R15). |
| 3. **The same playbook does not fit every business.** `#leaks` | Paper band with sticky image/text cards, stage counters and onward actions. | Align problem/solution anatomy; library choices do not need service-stage storytelling (R14). |
| 4. **Different businesses, different scoreboards.** `#numbers` | Dark four-card scoreboard band; three industry links and one static metric. | Fix “Open the calculator” on industry links; metric component assumes wrong action (R04). |
| 5. **See the work that runs across all three.** `#beyond` | White band; two/three image-and-text related cards; text links rather than whole-card links. | Align with editorial resource cards; same related-content job, generic Beyond component (R12). |
| 6. **What people ask about who we work with.** `#faq` | Ruled marketing accordion rows with unboxed plus/minus controls. | Keep FAQ content; align controls/spacing across About, articles, tools and AI (R10). |
| 7. **Tell us what kind of business you run.** `#talk` | Paper band; blue rounded photo card, audit checklist, primary/secondary actions. | Align: common marketing close; duplicate implementations and service-offer mismatch (R02, R09). |

**Immediately above the footer:** Tell us what kind of business you run. (`n-band n-band--paper cta2`).

**Free-tool placements:** No dedicated main-content calculator promotion; absence alone is not an inconsistency.


### Page 24: `/industries/d2c/`

Source: [page template](../../mmc-astro/src/pages/industries/d2c/index.astro).

| Order / section | Current treatment | Why different / judgment |
|---|---|---|
| 1. **Marketing for D2C brands in India.** `#top` | Blue marketing hero with eyebrow, mixed-emphasis heading, actions and image mosaic. | Keep common hero shell; route-specific copy/images are expected. Audit label needs scope check (R02). |
| 2. **In short** `#answer` | Paper summary card: lead, icon points and optional arched photograph. | Align full-summary anatomy; independent article/AI variants do the same job (R15). |
| 3. **Five places the money leaks.** `#leaks` | Five alternating photo rows with joined problem/solution colour panels. | Align with generic hub problem/solution cards; separate dedicated D2C implementation (R14). |
| 4. **Know these four before you spend another rupee.** `#numbers` | Dark four-card band; four calculator links. | Align tool cards with shared resource family (R08). |
| 5. **Some of the D2C brands we work with.** `#brands` | Paper client-logo wall with service labels and hover work imagery. | Align proof interaction: wall cells are not equivalent to Home’s linked project cards (R11). |
| 6. **D2C is where we go deepest. It is not all we do.** `#beyond` | White band; two/three image-and-text related cards; text links rather than whole-card links. | Align with editorial resource cards; same related-content job, generic Beyond component (R12). |
| 7. **What D2C founders ask first.** `#faq` | Ruled marketing accordion rows with unboxed plus/minus controls. | Keep FAQ content; align controls/spacing across About, articles, tools and AI (R10). |
| 8. **Find where your D2C profit leaks.** `#talk` | Paper band; blue rounded photo card, audit checklist, primary/secondary actions. | Align: common marketing close; duplicate implementations and service-offer mismatch (R02, R09). |

**Immediately above the footer:** Find where your D2C profit leaks. (`n-band n-band--paper cta2`).

**Free-tool placements:** `#numbers`: `/tools/unit-economics/`, `/tools/breakeven-roas/`, `/tools/cac-runway/`, `/tools/ltv-cac/`


### Page 25: `/industries/b2b/`

Source: [hub template](../../mmc-astro/src/pages/%5B...slug%5D.astro) and [page content](../../mmc-astro/src/data/hubs/industries__b2b.json).

| Order / section | Current treatment | Why different / judgment |
|---|---|---|
| 1. **Marketing for B2B companies in India.** `#top` | Blue marketing hero with eyebrow, mixed-emphasis heading, actions and image mosaic. | Keep common hero shell; route-specific copy/images are expected. Audit label needs scope check (R02). |
| 2. **In short** `#answer` | Paper summary card: lead, icon points and optional arched photograph. | Align full-summary anatomy; independent article/AI variants do the same job (R15). |
| 3. **Five places a buyer slips away. Five services that stop it.** `#leaks` | Paper band with sticky image/text cards, stage counters and onward actions. | Align problem/solution anatomy; stacked variant comes from hub data (R14). |
| 4. **How CRM and Meta CAPI make leads better.** `#quality` | Light CRM feedback diagram and before/after comparison cards. | Align with Education’s dark version: same explanatory job, variant B selected by data (R13). |
| 5. **Know these four before you spend on leads.** `#numbers` | Dark four-card band; 2 calculator links plus 2 static metrics. | Align tool cards with shared resource family (R08). |
| 6. **Some of the B2B brands we work with.** `#brands` | Paper client-logo wall with service labels and hover work imagery. | Align proof interaction: wall cells are not equivalent to Home’s linked project cards (R11). |
| 7. **Selling to shoppers or students instead?** `#beyond` | White band; two/three image-and-text related cards; text links rather than whole-card links. | Align with editorial resource cards; same related-content job, generic Beyond component (R12). |
| 8. **What B2B teams ask first.** `#faq` | Ruled marketing accordion rows with unboxed plus/minus controls. | Keep FAQ content; align controls/spacing across About, articles, tools and AI (R10). |
| 9. **Find what a qualified lead really costs.** `#talk` | Paper band; blue rounded photo card, audit checklist, primary/secondary actions. | Align: common marketing close; duplicate implementations and service-offer mismatch (R02, R09). |

**Immediately above the footer:** Find what a qualified lead really costs. (`n-band n-band--paper cta2`).

**Free-tool placements:** `#numbers`: `/tools/cac-runway/`, `/tools/ltv-cac/`


### Page 26: `/industries/education/`

Source: [hub template](../../mmc-astro/src/pages/%5B...slug%5D.astro) and [page content](../../mmc-astro/src/data/hubs/industries__education.json).

| Order / section | Current treatment | Why different / judgment |
|---|---|---|
| 1. **Marketing for colleges and education brands.** `#top` | Blue marketing hero with eyebrow, mixed-emphasis heading, actions and image mosaic. | Keep common hero shell; route-specific copy/images are expected. Audit label needs scope check (R02). |
| 2. **In short** `#answer` | Paper summary card: lead, icon points and optional arched photograph. | Align full-summary anatomy; independent article/AI variants do the same job (R15). |
| 3. **Seven places a family slips away. Seven services that stop it.** `#leaks` | Paper band with sticky image/text cards, stage counters and onward actions. | Align problem/solution anatomy; stacked variant comes from hub data (R14). |
| 4. **How CRM and Meta CAPI bring in better applicants.** `#quality` | Dark CRM flow, large icon tiles, animated connectors and dot comparisons. | Align with B2B/Lead Generation’s light version; default Loop component remains selected (R13). |
| 5. **Know these four before the next intake.** `#numbers` | Dark four-card band; static metrics/deliverables/checks. | Keep topic-specific criteria; use a static metric/deliverable variant, not tool-card affordances (R18). |
| 6. **Some of the education brands we work with.** `#brands` | Paper client-logo wall with service labels and hover work imagery. | Align proof interaction: wall cells are not equivalent to Home’s linked project cards (R11). |
| 7. **Selling to shoppers or businesses instead?** `#beyond` | White band; two/three image-and-text related cards; text links rather than whole-card links. | Align with editorial resource cards; same related-content job, generic Beyond component (R12). |
| 8. **What admissions teams ask first.** `#faq` | Ruled marketing accordion rows with unboxed plus/minus controls. | Keep FAQ content; align controls/spacing across About, articles, tools and AI (R10). |
| 9. **Find what an enrolment really costs.** `#talk` | Paper band; blue rounded photo card, audit checklist, primary/secondary actions. | Align: common marketing close; duplicate implementations and service-offer mismatch (R02, R09). |

**Immediately above the footer:** Find what an enrolment really costs. (`n-band n-band--paper cta2`).

**Free-tool placements:** No dedicated main-content calculator promotion; absence alone is not an inconsistency.


### Page 27: `/resources/`

Source: [hub template](../../mmc-astro/src/pages/%5B...slug%5D.astro) and [page content](../../mmc-astro/src/data/hubs/resources.json).

| Order / section | Current treatment | Why different / judgment |
|---|---|---|
| 1. **Free tools to check your own numbers before you spend.** `#top` | Blue marketing hero with eyebrow, mixed-emphasis heading, actions and image mosaic. | Keep common hero shell; route-specific copy/images are expected. Audit label needs scope check (R02). |
| 2. **In short** `#answer` | Paper summary card: lead, icon points and optional arched photograph. | Align full-summary anatomy; independent article/AI variants do the same job (R15). |
| 3. **Five decisions that go better with your own numbers.** `#leaks` | Paper band with sticky image/text cards, stage counters and onward actions. | Align problem/solution anatomy; library choices do not need service-stage storytelling (R14). |
| 4. **Keep going with the rest of the library.** `#beyond` | White band; two/three image-and-text related cards; text links rather than whole-card links. | Align with editorial resource cards; same related-content job, generic Beyond component (R12). |
| 5. **What people ask about the free tools.** `#faq` | Ruled marketing accordion rows with unboxed plus/minus controls. | Keep FAQ content; align controls/spacing across About, articles, tools and AI (R10). |
| 6. **Want the numbers read with you?** `#talk` | Paper band; blue rounded photo card, audit checklist, primary/secondary actions. | Align: common marketing close; duplicate implementations and service-offer mismatch (R02, R09). |

**Immediately above the footer:** Want the numbers read with you? (`n-band n-band--paper cta2`).

**Free-tool placements:** `#leaks`: `/tools/breakeven-roas/`, `/tools/unit-economics/`, `/tools/ltv-cac/`, `/tools/cac-runway/`, `/tools/funnel-roas/`; `#beyond`: `/tools/`


### Page 28: `/guides/`

Source: [hub template](../../mmc-astro/src/pages/%5B...slug%5D.astro) and [page content](../../mmc-astro/src/data/hubs/guides.json).

| Order / section | Current treatment | Why different / judgment |
|---|---|---|
| 1. **Practical guides for brands that measure what they spend.** `#top` | Blue marketing hero with eyebrow, mixed-emphasis heading, actions and image mosaic. | Keep common hero shell; route-specific copy/images are expected. Audit label needs scope check (R02). |
| 2. **In short** `#answer` | Paper summary card: lead, icon points and optional arched photograph. | Align full-summary anatomy; independent article/AI variants do the same job (R15). |
| 3. **Three decisions that go better with a method.** `#leaks` | Paper band with sticky image/text cards, stage counters and onward actions. | Align problem/solution anatomy; library choices do not need service-stage storytelling (R14). |
| 4. **Keep going with the rest of the library.** `#beyond` | White band; two/three image-and-text related cards; text links rather than whole-card links. | Align with editorial resource cards; same related-content job, generic Beyond component (R12). |
| 5. **What people ask about the guides.** `#faq` | Ruled marketing accordion rows with unboxed plus/minus controls. | Keep FAQ content; align controls/spacing across About, articles, tools and AI (R10). |
| 6. **Want a second pair of eyes on your numbers?** `#talk` | Paper band; blue rounded photo card, audit checklist, primary/secondary actions. | Align: common marketing close; duplicate implementations and service-offer mismatch (R02, R09). |

**Immediately above the footer:** Want a second pair of eyes on your numbers? (`n-band n-band--paper cta2`).

**Free-tool placements:** `#beyond`: `/tools/`


### Page 29: `/insights/`

Source: [page template](../../mmc-astro/src/pages/insights.astro).

| Order / section | Current treatment | Why different / judgment |
|---|---|---|
| 1. **Know what an order earns, then read your ads against it.** `#top` | Shared blue hero with linked guide/tool image tiles and free-access note. | Keep: adapted PageHero; destination choices differ appropriately from sales pages. |
| 2. **Where do you want to start?** `#start` | Three numbered question-led path cards, each leading to a guide. | Keep decision aid; review repetition with the immediately following same-guide catalogue. |
| 3. **All the guides, in one place.** `#guides` | Topic-filter pills and three full image guide cards with reading metadata. | Keep catalogue; use same guide cards on Home and Guides (R05, R12). |
| 4. **Then run the numbers yourself.** `#calculators` | Six image calculator cards, all-tools link and glossary link. | Align as full shared tool-card variant; current strongest common anatomy (R08, R04/T5). |
| 5. **Want it done with you?** `#services` | Three service cards using GuideCard anatomy, plus B2B/Education text links. | Keep consistent card reuse; align with other related-service sections (R12). |
| 6. **Bring your numbers. We will read them with you.** `#talk` | Ink text/action split; yellow strategy-call button; secondary text link; no image. | Align as an official compact close, not a separate editorial design (R09). |

**Immediately above the footer:** Bring your numbers. We will read them with you. (`ix-close ix-dark`).

**Free-tool placements:** `#top`: `/tools/`; `#calculators`: `/tools/`, `/tools/breakeven-roas/`, `/tools/unit-economics/`, `/tools/ltv-cac/`, `/tools/funnel-roas/`, `/tools/cac-runway/`, `/tools/growth-trajectory/`


### Page 30: `/tools/`

Source: [page template](../../mmc-astro/src/pages/tools/index.astro).

| Order / section | Current treatment | Why different / judgment |
|---|---|---|
| 1. **Free calculators to check your numbers before you spend.** `#top` | Blue marketing hero with eyebrow, mixed-emphasis heading, actions and image mosaic. | Keep common hero shell; route-specific copy/images are expected. Audit label needs scope check (R02). |
| 2. **In short** `#answer` | Paper summary card: lead, icon points and optional arched photograph. | Align full-summary anatomy; independent article/AI variants do the same job (R15). |
| 3. **Start from the decision, not the tool.** `#tools` | Decision groups containing six large calculator rows plus glossary; numbered photos and red/blue panels. | Align with full resource cards; detail/grouping justified but independent silhouette is not (R08, R03/T4). |
| 4. **A number is not a verdict.** `#read` | Three photo advice cards and a highlighted recommended tool-order panel. | Keep educational guidance; align callout/card styling with article explanations. |
| 5. **Want the reasoning behind the numbers?** `#beyond` | White band; two/three image-and-text related cards; text links rather than whole-card links. | Align with editorial resource cards; same related-content job, generic Beyond component (R12). |
| 6. **What people ask about the tools.** `#faq` | Ruled marketing accordion rows with unboxed plus/minus controls. | Keep FAQ content; align controls/spacing across About, articles, tools and AI (R10). |
| 7. **Run the numbers with us.** `#talk` | Paper band; blue photo CTA, booking plus brief/guides link; no checklist. | Align: local copy of the shared CTA layout; represent as options on one component (R09). |

**Immediately above the footer:** Run the numbers with us. (`n-band n-band--paper cta2`).

**Free-tool placements:** `#tools`: `/tools/unit-economics/`, `/tools/breakeven-roas/`, `/tools/ltv-cac/`, `/tools/funnel-roas/`, `/tools/cac-runway/`, `/tools/growth-trajectory/`; `#faq`: `/tools/unit-economics/`


### Page 31: `/tools/breakeven-roas/`

Source: [page template](../../mmc-astro/src/pages/tools/breakeven-roas.astro).

| Order / section | Current treatment | Why different / judgment |
|---|---|---|
| 1. **Are your ads actually making money?** | Compact tool hero with question, tool actions and breadcrumb/navigation. | Keep: prioritises inputs/results. Shared by all six calculators. |
| 2. **Calculator workspace** | Calculator workspace: inputs, result cards/chart/table and scenario levers. | Keep: specialised interactive task layout; same shared primitives across the six tools. |
| 3. **Interpretation and explanation** | Interpretation/advice panel and explanation below the calculation. | Keep task-specific interpretation; align body/callout typography with reading components. |
| 4. **Questions this calculator answers** | Tool-family FAQ rows; first answer open in markup. | Align FAQ primitive; tool-specific questions are appropriate (R10). |
| 5. **Other five D2C calculators** | Text-only cards linking to the other five calculators, before the close. | Keep compact resource variant; align title/type/arrow rules with tool cards (R08, R04/T8). |
| 6. **Knowing the number is step one. Hitting it is step two.** | Compact ink CTA; smaller heading, strategy-call and brief buttons. | Align compact close with editorial family; task-page density is justified (R09). |

**Inside the calculator workspace:** Your numbers; Every ROAS, and what it pays you; Three moves, and what each is worth.


**Immediately above the footer:** Knowing the number is step one. Hitting it is step two. (`tl-cta`).

**Free-tool placements:** `page-hero page-hero--compact`: `/tools/`; `tl-cross`: `/tools/unit-economics/`, `/tools/growth-trajectory/`, `/tools/cac-runway/`, `/tools/funnel-roas/`, `/tools/ltv-cac/`


### Page 32: `/tools/cac-runway/`

Source: [page template](../../mmc-astro/src/pages/tools/cac-runway.astro).

| Order / section | Current treatment | Why different / judgment |
|---|---|---|
| 1. **How long until this stops costing money?** | Compact tool hero with question, tool actions and breadcrumb/navigation. | Keep: prioritises inputs/results. Shared by all six calculators. |
| 2. **Calculator workspace** | Calculator workspace: inputs, result cards/chart/table and scenario levers. | Keep: specialised interactive task layout; same shared primitives across the six tools. |
| 3. **Interpretation and explanation** | Interpretation/advice panel and explanation below the calculation. | Keep task-specific interpretation; align body/callout typography with reading components. |
| 4. **Questions this calculator answers** | Tool-family FAQ rows; first answer open in markup. | Align FAQ primitive; tool-specific questions are appropriate (R10). |
| 5. **Other five D2C calculators** | Text-only cards linking to the other five calculators, before the close. | Keep compact resource variant; align title/type/arrow rules with tool cards (R08, R04/T8). |
| 6. **Every brand we take on gets this model in week one.** | Compact ink CTA; smaller heading, strategy-call and brief buttons. | Align compact close with editorial family; task-page density is justified (R09). |

**Inside the calculator workspace:** Your assumptions; Your cash position, month by month; Monthly profit and loss; Two ways to shorten the burn.


**Immediately above the footer:** Every brand we take on gets this model in week one. (`tl-cta`).

**Free-tool placements:** `page-hero page-hero--compact`: `/tools/`; `tl-cross`: `/tools/unit-economics/`, `/tools/growth-trajectory/`, `/tools/funnel-roas/`, `/tools/breakeven-roas/`, `/tools/ltv-cac/`


### Page 33: `/tools/funnel-roas/`

Source: [page template](../../mmc-astro/src/pages/tools/funnel-roas.astro).

| Order / section | Current treatment | Why different / judgment |
|---|---|---|
| 1. **Where is your funnel leaking ?** | Compact tool hero with question, tool actions and breadcrumb/navigation. | Keep: prioritises inputs/results. Shared by all six calculators. |
| 2. **Calculator workspace** | Calculator workspace: inputs, result cards/chart/table and scenario levers. | Keep: specialised interactive task layout; same shared primitives across the six tools. |
| 3. **Interpretation and explanation** | Interpretation/advice panel and explanation below the calculation. | Keep task-specific interpretation; align body/callout typography with reading components. |
| 4. **Questions this calculator answers** | Tool-family FAQ rows; first answer open in markup. | Align FAQ primitive; tool-specific questions are appropriate (R10). |
| 5. **Other five D2C calculators** | Text-only cards linking to the other five calculators, before the close. | Keep compact resource variant; align title/type/arrow rules with tool cards (R08, R04/T8). |
| 6. **You've found the leak. Fixing it is the hard part.** | Compact ink CTA; smaller heading, strategy-call and brief buttons. | Align compact close with editorial family; task-page density is justified (R09). |

**Inside the calculator workspace:** Your numbers; Where people fall out; Where the next order comes from.


**Immediately above the footer:** You've found the leak. Fixing it is the hard part. (`tl-cta`).

**Free-tool placements:** `page-hero page-hero--compact`: `/tools/`; `tl-cross`: `/tools/unit-economics/`, `/tools/growth-trajectory/`, `/tools/cac-runway/`, `/tools/breakeven-roas/`, `/tools/ltv-cac/`


### Page 34: `/tools/growth-trajectory/`

Source: [page template](../../mmc-astro/src/pages/tools/growth-trajectory.astro).

| Order / section | Current treatment | Why different / judgment |
|---|---|---|
| 1. **Where does this run rate get you ?** | Compact tool hero with question, tool actions and breadcrumb/navigation. | Keep: prioritises inputs/results. Shared by all six calculators. |
| 2. **Calculator workspace** | Calculator workspace: inputs, result cards/chart/table and scenario levers. | Keep: specialised interactive task layout; same shared primitives across the six tools. |
| 3. **Interpretation and explanation** | Interpretation/advice panel and explanation below the calculation. | Keep task-specific interpretation; align body/callout typography with reading components. |
| 4. **Questions this calculator answers** | Tool-family FAQ rows; first answer open in markup. | Align FAQ primitive; tool-specific questions are appropriate (R10). |
| 5. **Other five D2C calculators** | Text-only cards linking to the other five calculators, before the close. | Keep compact resource variant; align title/type/arrow rules with tool cards (R08, R04/T8). |
| 6. **A trajectory is a hypothesis. We build the engine that delivers it.** | Compact ink CTA; smaller heading, strategy-call and brief buttons. | Align compact close with editorial family; task-page density is justified (R09). |

**Inside the calculator workspace:** Your numbers; Year one, month by month; The next 5 years; What one more point is worth.


**Immediately above the footer:** A trajectory is a hypothesis. We build the engine that delivers it. (`tl-cta`).

**Free-tool placements:** `page-hero page-hero--compact`: `/tools/`; `tl-cross`: `/tools/unit-economics/`, `/tools/cac-runway/`, `/tools/funnel-roas/`, `/tools/breakeven-roas/`, `/tools/ltv-cac/`


### Page 35: `/tools/ltv-cac/`

Source: [page template](../../mmc-astro/src/pages/tools/ltv-cac.astro).

| Order / section | Current treatment | Why different / judgment |
|---|---|---|
| 1. **What is a customer really worth?** | Compact tool hero with question, tool actions and breadcrumb/navigation. | Keep: prioritises inputs/results. Shared by all six calculators. |
| 2. **Calculator workspace** | Calculator workspace: inputs, result cards/chart/table and scenario levers. | Keep: specialised interactive task layout; same shared primitives across the six tools. |
| 3. **Interpretation and explanation** | Interpretation/advice panel and explanation below the calculation. | Keep task-specific interpretation; align body/callout typography with reading components. |
| 4. **Questions this calculator answers** | Tool-family FAQ rows; first answer open in markup. | Align FAQ primitive; tool-specific questions are appropriate (R10). |
| 5. **Other five D2C calculators** | Text-only cards linking to the other five calculators, before the close. | Keep compact resource variant; align title/type/arrow rules with tool cards (R08, R04/T8). |
| 6. **Retention is a creative problem before it's a CRM problem.** | Compact ink CTA; smaller heading, strategy-call and brief buttons. | Align compact close with editorial family; task-page density is justified (R09). |

**Inside the calculator workspace:** Your numbers; Contribution catching up with CAC; The cheapest growth you have.


**Immediately above the footer:** Retention is a creative problem before it's a CRM problem. (`tl-cta`).

**Free-tool placements:** `page-hero page-hero--compact`: `/tools/`; `tl-cross`: `/tools/unit-economics/`, `/tools/growth-trajectory/`, `/tools/cac-runway/`, `/tools/funnel-roas/`, `/tools/breakeven-roas/`


### Page 36: `/tools/unit-economics/`

Source: [page template](../../mmc-astro/src/pages/tools/unit-economics.astro).

| Order / section | Current treatment | Why different / judgment |
|---|---|---|
| 1. **What does one order actually leave you?** | Compact tool hero with question, tool actions and breadcrumb/navigation. | Keep: prioritises inputs/results. Shared by all six calculators. |
| 2. **Calculator workspace** | Calculator workspace: inputs, result cards/chart/table and scenario levers. | Keep: specialised interactive task layout; same shared primitives across the six tools. |
| 3. **Interpretation and explanation** | Interpretation/advice panel and explanation below the calculation. | Keep task-specific interpretation; align body/callout typography with reading components. |
| 4. **Questions this calculator answers** | Tool-family FAQ rows; first answer open in markup. | Align FAQ primitive; tool-specific questions are appropriate (R10). |
| 5. **Other five D2C calculators** | Text-only cards linking to the other five calculators, before the close. | Keep compact resource variant; align title/type/arrow rules with tool cards (R08, R04/T8). |
| 6. **This is the model we build in week one of every engagement.** | Compact ink CTA; smaller heading, strategy-call and brief buttons. | Align compact close with editorial family; task-page density is justified (R09). |

**Inside the calculator workspace:** Your numbers; From price to what you keep; Three levers, ranked by what they're worth.


**Immediately above the footer:** This is the model we build in week one of every engagement. (`tl-cta`).

**Free-tool placements:** `page-hero page-hero--compact`: `/tools/`; `tl-cross`: `/tools/growth-trajectory/`, `/tools/cac-runway/`, `/tools/funnel-roas/`, `/tools/breakeven-roas/`, `/tools/ltv-cac/`


### Page 37: `/glossary/`

Source: [page template](../../mmc-astro/src/pages/glossary.astro).

| Order / section | Current treatment | Why different / judgment |
|---|---|---|
| 1. **Every term we use, in plain English.** `#top` | Glossary title/intro with tool-family hero styling. | Keep task-focused hero; align its base type and spacing with tool pages. |
| 2. **Search, categories and definitions** | Searchable, grouped glossary definitions with category navigation. | Keep: reference task; it does not need marketing cards for each definition. |
| 3. **Still not sure which number is your problem?** | Compact ink CTA; smaller heading, strategy-call and brief buttons. | Align compact close with editorial family; task-page density is justified (R09). |

**Inside the content body:** Money & margins; Acquisition & media; Funnel & conversion; Retention & lifetime; Commerce & fulfilment; Contribution ladder; P&L lines; Growth.


**Immediately above the footer:** Still not sure which number is your problem? (`tl-cta`).

**Free-tool placements:** `#top`: `/tools/`; `gl-body`: `/tools/unit-economics/`, `/tools/growth-trajectory/`, `/tools/cac-runway/`, `/tools/funnel-roas/`, `/tools/breakeven-roas/`, `/tools/ltv-cac/`


### Page 38: `/guides/attribution-overlap/`

Source: [page template](../../mmc-astro/src/pages/guides/%5Bslug%5D.astro).

| Order / section | Current treatment | Why different / judgment |
|---|---|---|
| 1. **Why ad dashboards report more sales than you made.** `#top` | Shared blue hero; single article image, reading metadata, calculator CTA. | Keep article-specific image/meta; shared PageHero is a positive consistency improvement. |
| 2. **Article reading layout** `#article` | Article shell: breadcrumb, contents sidebar, summary, body, tool callout and next step. | Keep readable inner measure while reusing outer site alignment; nested modules are listed below. |
| 2.1 (nested). **Contents navigation** | Article contents/navigation, separated from the reading column. | Keep: article-specific navigation; use same pattern across all three guides. |
| 2.2 (nested). **In short — key takeaways** | Dark “In short” takeaway box inside the article column. | Keep compact variant; align summary label/structure with marketing Answer (R15). |
| 2.3 (nested). **What attribution overlap is** `#what` | Reading-width text block with topic-specific examples, lists, tables or figures. | Keep: subject changes require different explanatory content, not identical internal layouts. |
| 2.4 (nested). **An illustrative example** `#example` | Reading-width text block with topic-specific examples, lists, tables or figures. | Keep: subject changes require different explanatory content, not identical internal layouts. |
| 2.5 (nested). **Why it happens** `#why` | Reading-width text block with topic-specific examples, lists, tables or figures. | Keep: subject changes require different explanatory content, not identical internal layouts. |
| 2.6 (nested). **How to read your results anyway** `#read` | Reading-width text block with topic-specific examples, lists, tables or figures. | Keep: subject changes require different explanatory content, not identical internal layouts. |
| 2.7 (nested). **Try it — matching free calculator** | Horizontal image/tool callout with “Free tool” badge and circular arrow. | Keep inline variant; align identity with Insights calculator cards (R08, R05/T6). |
| 2.8 (nested). **Send the platforms better signals** `#signals` | Reading-width text block with topic-specific examples, lists, tables or figures. | Keep: subject changes require different explanatory content, not identical internal layouts. |
| 2.9 (nested). **Put it together** `#blend` | Reading-width text block with topic-specific examples, lists, tables or figures. | Keep: subject changes require different explanatory content, not identical internal layouts. |
| 2.10 (nested). **Check your numbers against your store.** | Image-led next-step panel at article end, with onward action(s). | Review duplication with tool callout/related card/final close; preserve one clear next task (R19). |
| 3. **Keep reading.** `#related` | Paper band with other guide cards, then related tools/services where supplied. | Align shared resource-card family; preserve content-type badges and relevant destinations (R12). |
| 4. **Questions people ask about why platform dashboards over-count.** `#faq` | Separate rounded FAQ cards with circular dark plus/minus controls. | Align with ruled marketing FAQ rows; new editorial-specific styling (R10). |
| 5. **Find out what your ads really did.** `#talk` | Ink text/action split; yellow strategy-call button; secondary text link; no image. | Align as an official compact close, not a separate editorial design (R09). |

**Immediately above the footer:** Find out what your ads really did. (`ix-close ix-dark`).

**Free-tool placements:** `#top`: `/tools/funnel-roas/`; `#article`: `/tools/funnel-roas/`; `#related`: `/tools/funnel-roas/`


### Page 39: `/guides/contribution-margin-roas/`

Source: [page template](../../mmc-astro/src/pages/guides/%5Bslug%5D.astro).

| Order / section | Current treatment | Why different / judgment |
|---|---|---|
| 1. **Contribution margin and the ROAS you need to break even.** `#top` | Shared blue hero; single article image, reading metadata, calculator CTA. | Keep article-specific image/meta; shared PageHero is a positive consistency improvement. |
| 2. **Article reading layout** `#article` | Article shell: breadcrumb, contents sidebar, summary, body, tool callout and next step. | Keep readable inner measure while reusing outer site alignment; nested modules are listed below. |
| 2.1 (nested). **Contents navigation** | Article contents/navigation, separated from the reading column. | Keep: article-specific navigation; use same pattern across all three guides. |
| 2.2 (nested). **In short — key takeaways** | Dark “In short” takeaway box inside the article column. | Keep compact variant; align summary label/structure with marketing Answer (R15). |
| 2.3 (nested). **What contribution margin is** `#what` | Reading-width text block with topic-specific examples, lists, tables or figures. | Keep: subject changes require different explanatory content, not identical internal layouts. |
| 2.4 (nested). **Why revenue and platform ROAS mislead** `#why` | Reading-width text block with topic-specific examples, lists, tables or figures. | Keep: subject changes require different explanatory content, not identical internal layouts. |
| 2.5 (nested). **How to work it out, step by step** `#calc` | Reading-width text block with topic-specific examples, lists, tables or figures. | Keep: subject changes require different explanatory content, not identical internal layouts. |
| 2.6 (nested). **Try it — matching free calculator** | Horizontal image/tool callout with “Free tool” badge and circular arrow. | Keep inline variant; align identity with Insights calculator cards (R08, R05/T6). |
| 2.7 (nested). **A worked example** `#example` | Reading-width text block with topic-specific examples, lists, tables or figures. | Keep: subject changes require different explanatory content, not identical internal layouts. |
| 2.8 (nested). **Why returns and failed deliveries change the answer** `#returns` | Reading-width text block with topic-specific examples, lists, tables or figures. | Keep: subject changes require different explanatory content, not identical internal layouts. |
| 2.9 (nested). **How to use break-even ROAS** `#use` | Reading-width text block with topic-specific examples, lists, tables or figures. | Keep: subject changes require different explanatory content, not identical internal layouts. |
| 2.10 (nested). **Work it out with your own numbers** `#tool` | Reading-width text block with topic-specific examples, lists, tables or figures. | Keep: subject changes require different explanatory content, not identical internal layouts. |
| 2.11 (nested). **Now run your own costs.** | Image-led next-step panel at article end, with onward action(s). | Review duplication with tool callout/related card/final close; preserve one clear next task (R19). |
| 3. **Keep reading.** `#related` | Paper band with other guide cards, then related tools/services where supplied. | Align shared resource-card family; preserve content-type badges and relevant destinations (R12). |
| 4. **Questions people ask about contribution margin and break-even ROAS.** `#faq` | Separate rounded FAQ cards with circular dark plus/minus controls. | Align with ruled marketing FAQ rows; new editorial-specific styling (R10). |
| 5. **Have your numbers read with you.** `#talk` | Ink text/action split; yellow strategy-call button; secondary text link; no image. | Align as an official compact close, not a separate editorial design (R09). |

**Immediately above the footer:** Have your numbers read with you. (`ix-close ix-dark`).

**Free-tool placements:** `#top`: `/tools/breakeven-roas/`; `#article`: `/tools/breakeven-roas/`, `/tools/ltv-cac/`, `/tools/unit-economics/`; `#related`: `/tools/breakeven-roas/`; `#faq`: `/tools/breakeven-roas/`


### Page 40: `/guides/creative-testing/`

Source: [page template](../../mmc-astro/src/pages/guides/%5Bslug%5D.astro).

| Order / section | Current treatment | Why different / judgment |
|---|---|---|
| 1. **How D2C brands test ad creative without guessing.** `#top` | Shared blue hero; single article image, reading metadata, calculator CTA. | Keep article-specific image/meta; shared PageHero is a positive consistency improvement. |
| 2. **Article reading layout** `#article` | Article shell: breadcrumb, contents sidebar, summary, body, tool callout and next step. | Keep readable inner measure while reusing outer site alignment; nested modules are listed below. |
| 2.1 (nested). **Contents navigation** | Article contents/navigation, separated from the reading column. | Keep: article-specific navigation; use same pattern across all three guides. |
| 2.2 (nested). **In short — key takeaways** | Dark “In short” takeaway box inside the article column. | Keep compact variant; align summary label/structure with marketing Answer (R15). |
| 2.3 (nested). **Why creative needs a system** `#why` | Reading-width text block with topic-specific examples, lists, tables or figures. | Keep: subject changes require different explanatory content, not identical internal layouts. |
| 2.4 (nested). **What to test** `#vars` | Reading-width text block with topic-specific examples, lists, tables or figures. | Keep: subject changes require different explanatory content, not identical internal layouts. |
| 2.5 (nested). **How to run a test** `#plan` | Reading-width text block with topic-specific examples, lists, tables or figures. | Keep: subject changes require different explanatory content, not identical internal layouts. |
| 2.6 (nested). **Spend the most time on the hook** `#hooks` | Reading-width text block with topic-specific examples, lists, tables or figures. | Keep: subject changes require different explanatory content, not identical internal layouts. |
| 2.7 (nested). **How to read the results** `#read` | Reading-width text block with topic-specific examples, lists, tables or figures. | Keep: subject changes require different explanatory content, not identical internal layouts. |
| 2.8 (nested). **Try it — matching free calculator** | Horizontal image/tool callout with “Free tool” badge and circular arrow. | Keep inline variant; align identity with Insights calculator cards (R08, R05/T6). |
| 2.9 (nested). **Refresh before ads tire** `#fatigue` | Reading-width text block with topic-specific examples, lists, tables or figures. | Keep: subject changes require different explanatory content, not identical internal layouts. |
| 2.10 (nested). **Where MMC fits in** `#mmc` | Reading-width text block with topic-specific examples, lists, tables or figures. | Keep: subject changes require different explanatory content, not identical internal layouts. |
| 2.11 (nested). **Turn your ads into a testing system.** | Image-led next-step panel at article end, with onward action(s). | Review duplication with tool callout/related card/final close; preserve one clear next task (R19). |
| 3. **Keep reading.** `#related` | Paper band with other guide cards, then related tools/services where supplied. | Align shared resource-card family; preserve content-type badges and relevant destinations (R12). |
| 4. **Questions people ask about how D2C brands test creative.** `#faq` | Separate rounded FAQ cards with circular dark plus/minus controls. | Align with ruled marketing FAQ rows; new editorial-specific styling (R10). |
| 5. **Turn your ads into a testing system.** `#talk` | Ink text/action split; yellow strategy-call button; secondary text link; no image. | Align as an official compact close, not a separate editorial design (R09). |

**Immediately above the footer:** Turn your ads into a testing system. (`ix-close ix-dark`).

**Free-tool placements:** `#top`: `/tools/breakeven-roas/`; `#article`: `/tools/breakeven-roas/`


### Page 41: `/work/`

Source: [page template](../../mmc-astro/src/pages/work.astro).

| Order / section | Current treatment | Why different / judgment |
|---|---|---|
| 1. **Real projects, not a slide deck.** | Portfolio-specific oversized editorial hero. | Keep portfolio purpose; align base hero typography. |
| 2. **Thirteen brands, shown in full.** `#cases` | Filtered grid of 13 image-led case-study links with metadata. | Keep catalogue interaction; align project cards/labels with Home. |
| 3. **Every brand on record, by kind.** `#brands` | Grouped client wall by business kind, broader than featured case studies. | Keep broader proof distinct; clarify grouping and interactive vs static cells. |
| 4. **The same discipline. A different job for each kind.** `#kinds` | Industry explanation cards connecting projects to D2C/B2B/Education work. | Align audience-card family; shared audience roles recur on Home/About. |
| 5. **Consumer brands beyond the online shop.** `#beyond-d2c` | Consumer-brand proof beyond the online-shop category. | Keep additional coverage if distinct; clarify business-model vs industry tags. |
| 6. **Questions about our work.** `#faq` | Ruled marketing accordion rows with unboxed plus/minus controls. | Keep FAQ content; align controls/spacing across About, articles, tools and AI (R10). |
| 7. **Want your brand on this wall?** `#talk` | Paper band; rounded blue photo CTA, work-review image; no audit checklist. | Align component implementation; portfolio image/secondary destination are justified options (R09). |

**Immediately above the footer:** Want your brand on this wall? (`n-band n-band--paper cta2`).

**Free-tool placements:** No dedicated main-content calculator promotion; absence alone is not an inconsistency.


### Page 42: `/work/awwbaby/`

Source: [page template](../../mmc-astro/src/pages/work/%5Bslug%5D.astro).

| Order / section | Current treatment | Why different / judgment |
|---|---|---|
| 1. **AwwBaby** | Project title, breadcrumb, audience/service metadata. | Keep: shared case-study hero; no unexplained page-to-page styling variation. |
| 2. **Project artwork** | Large project artwork/proof presentation. | Keep project-specific image content; shared case-study layout. |
| 3. **What this covered / Services on record** | Scope/coverage text alongside recorded services. | Keep: shared factual project summary; one template for all 13 cases. |
| 4. **A few other case studies.** `#more` | Related case-study previews on paper background. | Keep project evidence prominent; align card interaction with Work/Home. |
| 5. **Want your brand on this wall next?** `#talk` | Paper band; rounded blue photo CTA, work-review image; no audit checklist. | Align component implementation; portfolio image/secondary destination are justified options (R09). |

**Immediately above the footer:** Want your brand on this wall next? (`n-band n-band--paper cta2`).

**Free-tool placements:** No dedicated main-content calculator promotion; absence alone is not an inconsistency.


### Page 43: `/work/giraffe/`

Source: [page template](../../mmc-astro/src/pages/work/%5Bslug%5D.astro).

| Order / section | Current treatment | Why different / judgment |
|---|---|---|
| 1. **The Growing Giraffe** | Project title, breadcrumb, audience/service metadata. | Keep: shared case-study hero; no unexplained page-to-page styling variation. |
| 2. **Project artwork** | Large project artwork/proof presentation. | Keep project-specific image content; shared case-study layout. |
| 3. **What this covered / Services on record** | Scope/coverage text alongside recorded services. | Keep: shared factual project summary; one template for all 13 cases. |
| 4. **A few other case studies.** `#more` | Related case-study previews on paper background. | Keep project evidence prominent; align card interaction with Work/Home. |
| 5. **Want your brand on this wall next?** `#talk` | Paper band; rounded blue photo CTA, work-review image; no audit checklist. | Align component implementation; portfolio image/secondary destination are justified options (R09). |

**Immediately above the footer:** Want your brand on this wall next? (`n-band n-band--paper cta2`).

**Free-tool placements:** No dedicated main-content calculator promotion; absence alone is not an inconsistency.


### Page 44: `/work/mbb/`

Source: [page template](../../mmc-astro/src/pages/work/%5Bslug%5D.astro).

| Order / section | Current treatment | Why different / judgment |
|---|---|---|
| 1. **MyBrownButters** | Project title, breadcrumb, audience/service metadata. | Keep: shared case-study hero; no unexplained page-to-page styling variation. |
| 2. **Project artwork** | Large project artwork/proof presentation. | Keep project-specific image content; shared case-study layout. |
| 3. **What this covered / Services on record** | Scope/coverage text alongside recorded services. | Keep: shared factual project summary; one template for all 13 cases. |
| 4. **A few other case studies.** `#more` | Related case-study previews on paper background. | Keep project evidence prominent; align card interaction with Work/Home. |
| 5. **Want your brand on this wall next?** `#talk` | Paper band; rounded blue photo CTA, work-review image; no audit checklist. | Align component implementation; portfolio image/secondary destination are justified options (R09). |

**Immediately above the footer:** Want your brand on this wall next? (`n-band n-band--paper cta2`).

**Free-tool placements:** No dedicated main-content calculator promotion; absence alone is not an inconsistency.


### Page 45: `/work/mittiy/`

Source: [page template](../../mmc-astro/src/pages/work/%5Bslug%5D.astro).

| Order / section | Current treatment | Why different / judgment |
|---|---|---|
| 1. **Mittiy Made** | Project title, breadcrumb, audience/service metadata. | Keep: shared case-study hero; no unexplained page-to-page styling variation. |
| 2. **Project artwork** | Large project artwork/proof presentation. | Keep project-specific image content; shared case-study layout. |
| 3. **What this covered / Services on record** | Scope/coverage text alongside recorded services. | Keep: shared factual project summary; one template for all 13 cases. |
| 4. **A few other case studies.** `#more` | Related case-study previews on paper background. | Keep project evidence prominent; align card interaction with Work/Home. |
| 5. **Want your brand on this wall next?** `#talk` | Paper band; rounded blue photo CTA, work-review image; no audit checklist. | Align component implementation; portfolio image/secondary destination are justified options (R09). |

**Immediately above the footer:** Want your brand on this wall next? (`n-band n-band--paper cta2`).

**Free-tool placements:** No dedicated main-content calculator promotion; absence alone is not an inconsistency.


### Page 46: `/work/mvj/`

Source: [page template](../../mmc-astro/src/pages/work/%5Bslug%5D.astro).

| Order / section | Current treatment | Why different / judgment |
|---|---|---|
| 1. **MVJ College of Engineering** | Project title, breadcrumb, audience/service metadata. | Keep: shared case-study hero; no unexplained page-to-page styling variation. |
| 2. **Project artwork** | Large project artwork/proof presentation. | Keep project-specific image content; shared case-study layout. |
| 3. **What this covered / Services on record** | Scope/coverage text alongside recorded services. | Keep: shared factual project summary; one template for all 13 cases. |
| 4. **A few other case studies.** `#more` | Related case-study previews on paper background. | Keep project evidence prominent; align card interaction with Work/Home. |
| 5. **Want your brand on this wall next?** `#talk` | Paper band; rounded blue photo CTA, work-review image; no audit checklist. | Align component implementation; portfolio image/secondary destination are justified options (R09). |

**Immediately above the footer:** Want your brand on this wall next? (`n-band n-band--paper cta2`).

**Free-tool placements:** No dedicated main-content calculator promotion; absence alone is not an inconsistency.


### Page 47: `/work/nmc/`

Source: [page template](../../mmc-astro/src/pages/work/%5Bslug%5D.astro).

| Order / section | Current treatment | Why different / judgment |
|---|---|---|
| 1. **NM Consultings** | Project title, breadcrumb, audience/service metadata. | Keep: shared case-study hero; no unexplained page-to-page styling variation. |
| 2. **Project artwork** | Large project artwork/proof presentation. | Keep project-specific image content; shared case-study layout. |
| 3. **What this covered / Services on record** | Scope/coverage text alongside recorded services. | Keep: shared factual project summary; one template for all 13 cases. |
| 4. **A few other case studies.** `#more` | Related case-study previews on paper background. | Keep project evidence prominent; align card interaction with Work/Home. |
| 5. **Want your brand on this wall next?** `#talk` | Paper band; rounded blue photo CTA, work-review image; no audit checklist. | Align component implementation; portfolio image/secondary destination are justified options (R09). |

**Immediately above the footer:** Want your brand on this wall next? (`n-band n-band--paper cta2`).

**Free-tool placements:** No dedicated main-content calculator promotion; absence alone is not an inconsistency.


### Page 48: `/work/notic/`

Source: [page template](../../mmc-astro/src/pages/work/%5Bslug%5D.astro).

| Order / section | Current treatment | Why different / judgment |
|---|---|---|
| 1. **Notic** | Project title, breadcrumb, audience/service metadata. | Keep: shared case-study hero; no unexplained page-to-page styling variation. |
| 2. **Project artwork** | Large project artwork/proof presentation. | Keep project-specific image content; shared case-study layout. |
| 3. **What this covered / Services on record** | Scope/coverage text alongside recorded services. | Keep: shared factual project summary; one template for all 13 cases. |
| 4. **A few other case studies.** `#more` | Related case-study previews on paper background. | Keep project evidence prominent; align card interaction with Work/Home. |
| 5. **Want your brand on this wall next?** `#talk` | Paper band; rounded blue photo CTA, work-review image; no audit checklist. | Align component implementation; portfolio image/secondary destination are justified options (R09). |

**Immediately above the footer:** Want your brand on this wall next? (`n-band n-band--paper cta2`).

**Free-tool placements:** No dedicated main-content calculator promotion; absence alone is not an inconsistency.


### Page 49: `/work/oosh/`

Source: [page template](../../mmc-astro/src/pages/work/%5Bslug%5D.astro).

| Order / section | Current treatment | Why different / judgment |
|---|---|---|
| 1. **OOsh** | Project title, breadcrumb, audience/service metadata. | Keep: shared case-study hero; no unexplained page-to-page styling variation. |
| 2. **Project artwork** | Large project artwork/proof presentation. | Keep project-specific image content; shared case-study layout. |
| 3. **What this covered / Services on record** | Scope/coverage text alongside recorded services. | Keep: shared factual project summary; one template for all 13 cases. |
| 4. **A few other case studies.** `#more` | Related case-study previews on paper background. | Keep project evidence prominent; align card interaction with Work/Home. |
| 5. **Want your brand on this wall next?** `#talk` | Paper band; rounded blue photo CTA, work-review image; no audit checklist. | Align component implementation; portfolio image/secondary destination are justified options (R09). |

**Immediately above the footer:** Want your brand on this wall next? (`n-band n-band--paper cta2`).

**Free-tool placements:** No dedicated main-content calculator promotion; absence alone is not an inconsistency.


### Page 50: `/work/pandacabs/`

Source: [page template](../../mmc-astro/src/pages/work/%5Bslug%5D.astro).

| Order / section | Current treatment | Why different / judgment |
|---|---|---|
| 1. **Panda Cabs** | Project title, breadcrumb, audience/service metadata. | Keep: shared case-study hero; no unexplained page-to-page styling variation. |
| 2. **Project artwork** | Large project artwork/proof presentation. | Keep project-specific image content; shared case-study layout. |
| 3. **What this covered / Services on record** | Scope/coverage text alongside recorded services. | Keep: shared factual project summary; one template for all 13 cases. |
| 4. **A few other case studies.** `#more` | Related case-study previews on paper background. | Keep project evidence prominent; align card interaction with Work/Home. |
| 5. **Want your brand on this wall next?** `#talk` | Paper band; rounded blue photo CTA, work-review image; no audit checklist. | Align component implementation; portfolio image/secondary destination are justified options (R09). |

**Immediately above the footer:** Want your brand on this wall next? (`n-band n-band--paper cta2`).

**Free-tool placements:** No dedicated main-content calculator promotion; absence alone is not an inconsistency.


### Page 51: `/work/skyfling/`

Source: [page template](../../mmc-astro/src/pages/work/%5Bslug%5D.astro).

| Order / section | Current treatment | Why different / judgment |
|---|---|---|
| 1. **Skyfling Technologies** | Project title, breadcrumb, audience/service metadata. | Keep: shared case-study hero; no unexplained page-to-page styling variation. |
| 2. **Project artwork** | Large project artwork/proof presentation. | Keep project-specific image content; shared case-study layout. |
| 3. **What this covered / Services on record** | Scope/coverage text alongside recorded services. | Keep: shared factual project summary; one template for all 13 cases. |
| 4. **A few other case studies.** `#more` | Related case-study previews on paper background. | Keep project evidence prominent; align card interaction with Work/Home. |
| 5. **Want your brand on this wall next?** `#talk` | Paper band; rounded blue photo CTA, work-review image; no audit checklist. | Align component implementation; portfolio image/secondary destination are justified options (R09). |

**Immediately above the footer:** Want your brand on this wall next? (`n-band n-band--paper cta2`).

**Free-tool placements:** No dedicated main-content calculator promotion; absence alone is not an inconsistency.


### Page 52: `/work/sprnt/`

Source: [page template](../../mmc-astro/src/pages/work/%5Bslug%5D.astro).

| Order / section | Current treatment | Why different / judgment |
|---|---|---|
| 1. **Sprnt** | Project title, breadcrumb, audience/service metadata. | Keep: shared case-study hero; no unexplained page-to-page styling variation. |
| 2. **Project artwork** | Large project artwork/proof presentation. | Keep project-specific image content; shared case-study layout. |
| 3. **What this covered / Services on record** | Scope/coverage text alongside recorded services. | Keep: shared factual project summary; one template for all 13 cases. |
| 4. **A few other case studies.** `#more` | Related case-study previews on paper background. | Keep project evidence prominent; align card interaction with Work/Home. |
| 5. **Want your brand on this wall next?** `#talk` | Paper band; rounded blue photo CTA, work-review image; no audit checklist. | Align component implementation; portfolio image/secondary destination are justified options (R09). |

**Immediately above the footer:** Want your brand on this wall next? (`n-band n-band--paper cta2`).

**Free-tool placements:** No dedicated main-content calculator promotion; absence alone is not an inconsistency.


### Page 53: `/work/sprouts/`

Source: [page template](../../mmc-astro/src/pages/work/%5Bslug%5D.astro).

| Order / section | Current treatment | Why different / judgment |
|---|---|---|
| 1. **Sprouts Edu Tours** | Project title, breadcrumb, audience/service metadata. | Keep: shared case-study hero; no unexplained page-to-page styling variation. |
| 2. **Project artwork** | Large project artwork/proof presentation. | Keep project-specific image content; shared case-study layout. |
| 3. **What this covered / Services on record** | Scope/coverage text alongside recorded services. | Keep: shared factual project summary; one template for all 13 cases. |
| 4. **A few other case studies.** `#more` | Related case-study previews on paper background. | Keep project evidence prominent; align card interaction with Work/Home. |
| 5. **Want your brand on this wall next?** `#talk` | Paper band; rounded blue photo CTA, work-review image; no audit checklist. | Align component implementation; portfolio image/secondary destination are justified options (R09). |

**Immediately above the footer:** Want your brand on this wall next? (`n-band n-band--paper cta2`).

**Free-tool placements:** No dedicated main-content calculator promotion; absence alone is not an inconsistency.


### Page 54: `/work/vagakids/`

Source: [page template](../../mmc-astro/src/pages/work/%5Bslug%5D.astro).

| Order / section | Current treatment | Why different / judgment |
|---|---|---|
| 1. **Vaga Kids** | Project title, breadcrumb, audience/service metadata. | Keep: shared case-study hero; no unexplained page-to-page styling variation. |
| 2. **Project artwork** | Large project artwork/proof presentation. | Keep project-specific image content; shared case-study layout. |
| 3. **What this covered / Services on record** | Scope/coverage text alongside recorded services. | Keep: shared factual project summary; one template for all 13 cases. |
| 4. **A few other case studies.** `#more` | Related case-study previews on paper background. | Keep project evidence prominent; align card interaction with Work/Home. |
| 5. **Want your brand on this wall next?** `#talk` | Paper band; rounded blue photo CTA, work-review image; no audit checklist. | Align component implementation; portfolio image/secondary destination are justified options (R09). |

**Immediately above the footer:** Want your brand on this wall next? (`n-band n-band--paper cta2`).

**Free-tool placements:** No dedicated main-content calculator promotion; absence alone is not an inconsistency.


### Page 55: `/audit/`

Source: [page template](../../mmc-astro/src/pages/audit/index.astro).

| Order / section | Current treatment | Why different / judgment |
|---|---|---|
| 1. **A free paid-media audit for brands in India.** `#top` | Blue booking-offer hero; “Pick a time” anchor and brief action. | Keep: task-specific actions within shared PageHero. |
| 2. **Four things, in your numbers.** `#looks` | Four audit-scope items. | Keep clear scope list; should match checklist and offer elsewhere. |
| 3. **One call. A clear next step.** `#how` | Short process explanation for the audit call. | Keep audit-specific process; align step furniture with other process sections. |
| 4. **Pick a time that suits you.** `#book` | Ink booking band with embedded calendar and preparation information. | Keep functional conversion section; no need to repeat a full CTA at page end. |
| 5. **Built for brands that buy media.** `#fit` | Three audience/eligibility cards. | Align audience-card hierarchy with Home/Industries; audit fit copy is appropriate. |
| 6. **Before you book.** `#faq` | Ruled marketing accordion rows with unboxed plus/minus controls. | Keep FAQ content; align controls/spacing across About, articles, tools and AI (R10). |

**Immediately above the footer:** Before you book. (`n-band n-band--paper pm-band`).

**Free-tool placements:** No dedicated main-content calculator promotion; absence alone is not an inconsistency.


### Page 56: `/contact/`

Source: [page template](../../mmc-astro/src/pages/contact.astro).

| Order / section | Current treatment | Why different / judgment |
|---|---|---|
| 1. **Let's talk about your growth , in plain words.** `#top` | Blue marketing hero with eyebrow, mixed-emphasis heading, actions and image mosaic. | Keep common hero shell; route-specific copy/images are expected. Audit label needs scope check (R02). |
| 2. **In short** `#answer` | Paper summary card: lead, icon points and optional arched photograph. | Align full-summary anatomy; independent article/AI variants do the same job (R15). |
| 3. **Pick the one that suits you.** `#ways` | Contact-method cards for phone/email and other contact paths. | Keep channel chooser; align action affordances and card surfaces. |
| 4. **Book it, or write it.** `#brief` | Booking versus written-brief choice. | Keep primary contact task; fix brief action opening audit-framed form (R03). |
| 5. **Three steps, no surprises.** `#next` | Three follow-up steps. | Keep expectation-setting; align numbered process primitives. |
| 6. **Start with the page that fits you.** `#who` | Audience/route chooser cards. | Align with recurring audience cards; avoid unnecessary detour from contact task. |
| 7. **The studio is in Thane.** `#find` | Office location, stylised map and visit details. | Keep location-specific module; map is a distinct task, not style drift. |
| 8. **What people ask before getting in touch.** `#faq` | Ruled marketing accordion rows with unboxed plus/minus controls. | Keep FAQ content; align controls/spacing across About, articles, tools and AI (R10). |
| 9. **Ready when you are.** `#talk` | Paper band; blue photo CTA, booking plus brief/guides link; no checklist. | Align: local copy of the shared CTA layout; represent as options on one component (R09). |

**Immediately above the footer:** Ready when you are. (`n-band n-band--paper cta2`).

**Free-tool placements:** No dedicated main-content calculator promotion; absence alone is not an inconsistency.


### Page 57: `/careers/`

Source: [page template](../../mmc-astro/src/pages/careers/index.astro).

| Order / section | Current treatment | Why different / judgment |
|---|---|---|
| 1. **People who write their own briefs.** `#top` | Candidate-facing hero with editorial headline and imagery. | Keep distinct audience; align common hero actions/typography. |
| 2. **Application brief: one page, no resume, no portal** `#job` | Application brief/introduction with illustrative image and requirements. | Review “one page” promise against actual two-step forms (R07). |
| 3. **Four things you would feel in your first month.** `#why` | Four employee-value items. | Keep candidate content; align benefit-card/list primitives. |
| 4. **Where we are hiring.** `#roles` | Open-role cards/list with discipline/location details and application links. | Keep task-specific listings; one common role-card structure. |
| 5. **Four steps. No portal.** `#hiring` | Four illustrated hiring steps. | Keep recruitment workflow; align generic process-step styling. |
| 6. **Small is the job, not a phase.** `#fit` | Fit criteria explaining the small-team working model. | Keep audience qualification; same section purpose as client-fit blocks, different copy. |
| 7. **Questions before you apply.** `#faq` | Ruled marketing accordion rows with unboxed plus/minus controls. | Keep FAQ content; align controls/spacing across About, articles, tools and AI (R10). |
| 8. **One page. That is the application.** `#talk` | Candidate closing invitation, “One page” application message. | Keep candidate CTA exception; correct overview/form mismatch (R07). |

**Immediately above the footer:** One page. That is the application. (`n-band n-band--paper`).

**Free-tool placements:** No dedicated main-content calculator promotion; absence alone is not an inconsistency.


### Page 58: `/careers/google-amazon-specialist/`

Source: [page template](../../mmc-astro/src/pages/careers/%5Bslug%5D.astro).

| Order / section | Current treatment | Why different / judgment |
|---|---|---|
| 1. **Google + Amazon Specialist** `#top` | Role title, breadcrumb, job metadata and apply anchor. | Keep consistent role-page hero; candidate task justifies this variant. |
| 2. **Role description and application layout** | Paper role-content shell with description and application column. | Keep task layout; nested description/form modules follow below. No sales close needed. |
| 2.1 (nested). **The role** | Numbered job-description subsection. | Keep shared text/list structure; role-specific responsibilities are expected. |
| 2.2 (nested). **What you will own** | Numbered job-description subsection. | Keep shared text/list structure; role-specific responsibilities are expected. |
| 2.3 (nested). **You probably are** | Numbered job-description subsection. | Keep shared text/list structure; role-specific responsibilities are expected. |
| 2.4 (nested). **A bonus if you have** | Numbered job-description subsection. | Keep shared text/list structure; role-specific responsibilities are expected. |
| 2.5 (nested). **How hiring works** | Numbered job-description subsection. | Keep shared text/list structure; role-specific responsibilities are expected. |
| 2.6 (nested). **Application form: Basics → Screening** `#apply` | Two-step application sidebar/card; basics and screening fields. | Keep task UI; align promise with Careers overview. Hidden form states are not separate sections. |

**Immediately above the footer:** Role description and application layout (`n-band n-band--paper`).

**Free-tool placements:** No dedicated main-content calculator promotion; absence alone is not an inconsistency.


### Page 59: `/careers/growth-strategist/`

Source: [page template](../../mmc-astro/src/pages/careers/%5Bslug%5D.astro).

| Order / section | Current treatment | Why different / judgment |
|---|---|---|
| 1. **Growth Strategist, D2C** `#top` | Role title, breadcrumb, job metadata and apply anchor. | Keep consistent role-page hero; candidate task justifies this variant. |
| 2. **Role description and application layout** | Paper role-content shell with description and application column. | Keep task layout; nested description/form modules follow below. No sales close needed. |
| 2.1 (nested). **The role** | Numbered job-description subsection. | Keep shared text/list structure; role-specific responsibilities are expected. |
| 2.2 (nested). **What you will own** | Numbered job-description subsection. | Keep shared text/list structure; role-specific responsibilities are expected. |
| 2.3 (nested). **You probably are** | Numbered job-description subsection. | Keep shared text/list structure; role-specific responsibilities are expected. |
| 2.4 (nested). **A bonus if you have** | Numbered job-description subsection. | Keep shared text/list structure; role-specific responsibilities are expected. |
| 2.5 (nested). **How hiring works** | Numbered job-description subsection. | Keep shared text/list structure; role-specific responsibilities are expected. |
| 2.6 (nested). **Application form: Basics → Screening** `#apply` | Two-step application sidebar/card; basics and screening fields. | Keep task UI; align promise with Careers overview. Hidden form states are not separate sections. |

**Immediately above the footer:** Role description and application layout (`n-band n-band--paper`).

**Free-tool placements:** No dedicated main-content calculator promotion; absence alone is not an inconsistency.


### Page 60: `/careers/performance-copywriter/`

Source: [page template](../../mmc-astro/src/pages/careers/%5Bslug%5D.astro).

| Order / section | Current treatment | Why different / judgment |
|---|---|---|
| 1. **Performance Copywriter** `#top` | Role title, breadcrumb, job metadata and apply anchor. | Keep consistent role-page hero; candidate task justifies this variant. |
| 2. **Role description and application layout** | Paper role-content shell with description and application column. | Keep task layout; nested description/form modules follow below. No sales close needed. |
| 2.1 (nested). **The role** | Numbered job-description subsection. | Keep shared text/list structure; role-specific responsibilities are expected. |
| 2.2 (nested). **What you will own** | Numbered job-description subsection. | Keep shared text/list structure; role-specific responsibilities are expected. |
| 2.3 (nested). **You probably are** | Numbered job-description subsection. | Keep shared text/list structure; role-specific responsibilities are expected. |
| 2.4 (nested). **A bonus if you have** | Numbered job-description subsection. | Keep shared text/list structure; role-specific responsibilities are expected. |
| 2.5 (nested). **How hiring works** | Numbered job-description subsection. | Keep shared text/list structure; role-specific responsibilities are expected. |
| 2.6 (nested). **Application form: Basics → Screening** `#apply` | Two-step application sidebar/card; basics and screening fields. | Keep task UI; align promise with Careers overview. Hidden form states are not separate sections. |

**Immediately above the footer:** Role description and application layout (`n-band n-band--paper`).

**Free-tool placements:** No dedicated main-content calculator promotion; absence alone is not an inconsistency.


### Page 61: `/careers/senior-art-director/`

Source: [page template](../../mmc-astro/src/pages/careers/%5Bslug%5D.astro).

| Order / section | Current treatment | Why different / judgment |
|---|---|---|
| 1. **Senior Art Director** `#top` | Role title, breadcrumb, job metadata and apply anchor. | Keep consistent role-page hero; candidate task justifies this variant. |
| 2. **Role description and application layout** | Paper role-content shell with description and application column. | Keep task layout; nested description/form modules follow below. No sales close needed. |
| 2.1 (nested). **The role** | Numbered job-description subsection. | Keep shared text/list structure; role-specific responsibilities are expected. |
| 2.2 (nested). **What you will own** | Numbered job-description subsection. | Keep shared text/list structure; role-specific responsibilities are expected. |
| 2.3 (nested). **You probably are** | Numbered job-description subsection. | Keep shared text/list structure; role-specific responsibilities are expected. |
| 2.4 (nested). **A bonus if you have** | Numbered job-description subsection. | Keep shared text/list structure; role-specific responsibilities are expected. |
| 2.5 (nested). **How hiring works** | Numbered job-description subsection. | Keep shared text/list structure; role-specific responsibilities are expected. |
| 2.6 (nested). **Application form: Basics → Screening** `#apply` | Two-step application sidebar/card; basics and screening fields. | Keep task UI; align promise with Careers overview. Hidden form states are not separate sections. |

**Immediately above the footer:** Role description and application layout (`n-band n-band--paper`).

**Free-tool placements:** No dedicated main-content calculator promotion; absence alone is not an inconsistency.


### Page 62: `/careers/senior-meta-buyer/`

Source: [page template](../../mmc-astro/src/pages/careers/%5Bslug%5D.astro).

| Order / section | Current treatment | Why different / judgment |
|---|---|---|
| 1. **Senior Meta Buyer** `#top` | Role title, breadcrumb, job metadata and apply anchor. | Keep consistent role-page hero; candidate task justifies this variant. |
| 2. **Role description and application layout** | Paper role-content shell with description and application column. | Keep task layout; nested description/form modules follow below. No sales close needed. |
| 2.1 (nested). **The role** | Numbered job-description subsection. | Keep shared text/list structure; role-specific responsibilities are expected. |
| 2.2 (nested). **What you will own** | Numbered job-description subsection. | Keep shared text/list structure; role-specific responsibilities are expected. |
| 2.3 (nested). **You probably are** | Numbered job-description subsection. | Keep shared text/list structure; role-specific responsibilities are expected. |
| 2.4 (nested). **A bonus if you have** | Numbered job-description subsection. | Keep shared text/list structure; role-specific responsibilities are expected. |
| 2.5 (nested). **How hiring works** | Numbered job-description subsection. | Keep shared text/list structure; role-specific responsibilities are expected. |
| 2.6 (nested). **Application form: Basics → Screening** `#apply` | Two-step application sidebar/card; basics and screening fields. | Keep task UI; align promise with Careers overview. Hidden form states are not separate sections. |

**Immediately above the footer:** Role description and application layout (`n-band n-band--paper`).

**Free-tool placements:** No dedicated main-content calculator promotion; absence alone is not an inconsistency.


### Page 63: `/careers/shopify-engineer/`

Source: [page template](../../mmc-astro/src/pages/careers/%5Bslug%5D.astro).

| Order / section | Current treatment | Why different / judgment |
|---|---|---|
| 1. **Shopify Plus Engineer** `#top` | Role title, breadcrumb, job metadata and apply anchor. | Keep consistent role-page hero; candidate task justifies this variant. |
| 2. **Role description and application layout** | Paper role-content shell with description and application column. | Keep task layout; nested description/form modules follow below. No sales close needed. |
| 2.1 (nested). **The role** | Numbered job-description subsection. | Keep shared text/list structure; role-specific responsibilities are expected. |
| 2.2 (nested). **What you will own** | Numbered job-description subsection. | Keep shared text/list structure; role-specific responsibilities are expected. |
| 2.3 (nested). **You probably are** | Numbered job-description subsection. | Keep shared text/list structure; role-specific responsibilities are expected. |
| 2.4 (nested). **A bonus if you have** | Numbered job-description subsection. | Keep shared text/list structure; role-specific responsibilities are expected. |
| 2.5 (nested). **How hiring works** | Numbered job-description subsection. | Keep shared text/list structure; role-specific responsibilities are expected. |
| 2.6 (nested). **Application form: Basics → Screening** `#apply` | Two-step application sidebar/card; basics and screening fields. | Keep task UI; align promise with Careers overview. Hidden form states are not separate sections. |

**Immediately above the footer:** Role description and application layout (`n-band n-band--paper`).

**Free-tool placements:** No dedicated main-content calculator promotion; absence alone is not an inconsistency.


### Page 64: `/privacy/`

Source: [page template](../../mmc-astro/src/pages/privacy.astro).

| Order / section | Current treatment | Why different / judgment |
|---|---|---|
| 1. **Privacy Policy** `#top` | Restrained legal title/date hero. | Keep: document title, not a marketing proposition. |
| 2. **Policy text and contents navigation** | Long-form legal body with contents navigation and policy subheadings. | Keep: document layout; no pre-footer marketing CTA required. |

**Inside the content body:** What we collect; What we don't collect; Cookie policy; Your rights; Data storage & transfer; Changes to this policy; Contact.


**Immediately above the footer:** Policy text and contents navigation (`lg-body`).

**Free-tool placements:** No dedicated main-content calculator promotion; absence alone is not an inconsistency.


### Page 65: `/terms/`

Source: [page template](../../mmc-astro/src/pages/terms.astro).

| Order / section | Current treatment | Why different / judgment |
|---|---|---|
| 1. **Terms & Conditions** `#top` | Restrained legal title/date hero. | Keep: document title, not a marketing proposition. |
| 2. **Policy text and contents navigation** | Long-form legal body with contents navigation and policy subheadings. | Keep: document layout; no pre-footer marketing CTA required. |

**Inside the content body:** Acceptance; About this site; Use of the site; Intellectual property; Job applications; Limitation of liability; Governing law; Contact.


**Immediately above the footer:** Policy text and contents navigation (`lg-body`).

**Free-tool placements:** No dedicated main-content calculator promotion; absence alone is not an inconsistency.


### Page 66: `/ai-by-mmc/index.html`

Source: [static page](../../mmc-astro/public/ai-by-mmc/index.html).

| Order / section | Current treatment | Why different / judgment |
|---|---|---|
| 1. **Let AI do the heavy lifting. We make sure it grows you.** | AI light hero; image/demo-led, split composition. | Keep demo-specific composition; align shared hero typography/actions. Separate static AI template. |
| 2. **The short answer** | Short definition/summary in the AI answer layout. | Align with full/compact summary family; this is the AI version of “In short” (R15). |
| 3. **Pick the bottleneck. We remove it.** `#services` | Six image-led AI service cards with numbers and icons. | Keep as sub-brand catalogue; align shared card hierarchy and action placement. |
| 4. **AI makes it. People check it. Numbers decide.** | Numbered process steps with images; AI workflow vocabulary. | Keep service-specific steps; align step numbers, image treatment and headings. AI-local process component. |
| 5. **Built for the brands we work with.** | Three audience cards: D2C, B2B and education; image/text treatment. | Align with the shared audience-card family. Same segmentation as main site; local AI markup. |
| 6. **What teams ask first.** | AI accordion panels; button toggles and animated answer reveal. | Align FAQ anatomy/controls; independent AI implementation (R10). |
| 7. **Find where AI saves you the most time.** `#talk` | Centered CTA on yellow gradient/sunburst; contact and AI-overview links. | Align booking behaviour; sub-brand colour exception may remain. AI-local closing template (R09). |

**Immediately above the footer:** Find where AI saves you the most time. (`band band--sunsoft`).

**Free-tool placements:** No dedicated main-content calculator promotion; absence alone is not an inconsistency.


### Page 67: `/ai-by-mmc/ai-landing-page-builder.html`

Source: [static page](../../mmc-astro/public/ai-by-mmc/ai-landing-page-builder.html).

| Order / section | Current treatment | Why different / judgment |
|---|---|---|
| 1. **A landing page for every campaign, live fast.** | AI light hero; image/demo-led, split composition. | Keep demo-specific composition; align shared hero typography/actions. Separate static AI template. |
| 2. **The short answer** | Short definition/summary in the AI answer layout. | Align with full/compact summary family; this is the AI version of “In short” (R15). |
| 3. **Four steps from brief to live.** `#how` | Numbered process steps with images; AI workflow vocabulary. | Keep service-specific steps; align step numbers, image treatment and headings. AI-local process component. |
| 4. **Built to be used, not just admired.** | Feature/benefit cards describing the service output. | Keep relevant benefits; align generic benefit-card spacing and headings. |
| 5. **Pages that fit every campaign.** `#scrub` | Service demonstration: scroll-driven page sequence. | Keep the format needed to demonstrate the product. Verify motion/touch access visually; not generic section drift. |
| 6. **The same service, three audiences.** | Three audience cards: D2C, B2B and education; image/text treatment. | Align with the shared audience-card family. Same segmentation as main site; local AI markup. |
| 7. **Before you ask.** | AI accordion panels; button toggles and animated answer reveal. | Align FAQ anatomy/controls; independent AI implementation (R10). |
| 8. **Five other ways to put AI to work.** | Other five AI services presented as onward links/cards. | Keep relevant destinations; align related-resource identity and action treatment (R12). |
| 9. **Ready to try AI Landing Page Builder?** `#talk` | Centered CTA on yellow gradient/sunburst; contact and AI-overview links. | Align booking behaviour; sub-brand colour exception may remain. AI-local closing template (R09). |

**Immediately above the footer:** Ready to try AI Landing Page Builder? (`band band--sunsoft`).

**Free-tool placements:** No dedicated main-content calculator promotion; absence alone is not an inconsistency.


### Page 68: `/ai-by-mmc/ai-photoshoot.html`

Source: [static page](../../mmc-astro/public/ai-by-mmc/ai-photoshoot.html).

| Order / section | Current treatment | Why different / judgment |
|---|---|---|
| 1. **One photo. Every scene your campaign needs.** | AI light hero; image/demo-led, centered composition. | Keep demo-specific composition; align shared hero typography/actions. Separate static AI template. |
| 2. **The short answer** | Short definition/summary in the AI answer layout. | Align with full/compact summary family; this is the AI version of “In short” (R15). |
| 3. **Fourteen scenes from one photo.** `#scenes` | Service demonstration: pinned scene sequence. | Keep the format needed to demonstrate the product. Verify motion/touch access visually; not generic section drift. |
| 4. **Four steps from brief to live.** `#how` | Numbered process steps with images; AI workflow vocabulary. | Keep service-specific steps; align step numbers, image treatment and headings. AI-local process component. |
| 5. **Built to be used, not just admired.** | Feature/benefit cards describing the service output. | Keep relevant benefits; align generic benefit-card spacing and headings. |
| 6. **The same service, three audiences.** | Three audience cards: D2C, B2B and education; image/text treatment. | Align with the shared audience-card family. Same segmentation as main site; local AI markup. |
| 7. **Before you ask.** | AI accordion panels; button toggles and animated answer reveal. | Align FAQ anatomy/controls; independent AI implementation (R10). |
| 8. **Five other ways to put AI to work.** | Other five AI services presented as onward links/cards. | Keep relevant destinations; align related-resource identity and action treatment (R12). |
| 9. **Ready to try AI Photoshoot?** `#talk` | Centered CTA on yellow gradient/sunburst; contact and AI-overview links. | Align booking behaviour; sub-brand colour exception may remain. AI-local closing template (R09). |

**Immediately above the footer:** Ready to try AI Photoshoot? (`band band--sunsoft`).

**Free-tool placements:** No dedicated main-content calculator promotion; absence alone is not an inconsistency.


### Page 69: `/ai-by-mmc/ai-sales-agent.html`

Source: [static page](../../mmc-astro/public/ai-by-mmc/ai-sales-agent.html).

| Order / section | Current treatment | Why different / judgment |
|---|---|---|
| 1. **A sales agent that answers while you sleep.** | AI light hero; image/demo-led, split composition. | Keep demo-specific composition; align shared hero typography/actions. Separate static AI template. |
| 2. **The short answer** | Short definition/summary in the AI answer layout. | Align with full/compact summary family; this is the AI version of “In short” (R15). |
| 3. **Capture / Qualify / Engage** `#story` | Service demonstration: capture/qualify/engage story. | Keep the format needed to demonstrate the product. Verify motion/touch access visually; not generic section drift. |
| 4. **Four steps from brief to live.** `#how` | Numbered process steps with images; AI workflow vocabulary. | Keep service-specific steps; align step numbers, image treatment and headings. AI-local process component. |
| 5. **Built to be used, not just admired.** | Feature/benefit cards describing the service output. | Keep relevant benefits; align generic benefit-card spacing and headings. |
| 6. **The same service, three audiences.** | Three audience cards: D2C, B2B and education; image/text treatment. | Align with the shared audience-card family. Same segmentation as main site; local AI markup. |
| 7. **Works with the tools you already use.** | Dark integrations/platform band. | Keep: platform compatibility is service-specific evidence, not free calculators. |
| 8. **Before you ask.** | AI accordion panels; button toggles and animated answer reveal. | Align FAQ anatomy/controls; independent AI implementation (R10). |
| 9. **Five other ways to put AI to work.** | Other five AI services presented as onward links/cards. | Keep relevant destinations; align related-resource identity and action treatment (R12). |
| 10. **Ready to try AI Sales Agent?** `#talk` | Centered CTA on yellow gradient/sunburst; contact and AI-overview links. | Align booking behaviour; sub-brand colour exception may remain. AI-local closing template (R09). |

**Immediately above the footer:** Ready to try AI Sales Agent? (`band band--sunsoft`).

**Free-tool placements:** No dedicated main-content calculator promotion; absence alone is not an inconsistency.


### Page 70: `/ai-by-mmc/ai-spokesperson-video.html`

Source: [static page](../../mmc-astro/public/ai-by-mmc/ai-spokesperson-video.html).

| Order / section | Current treatment | Why different / judgment |
|---|---|---|
| 1. **A presenter who speaks for your brand, on demand.** | AI light hero; image/demo-led, reversed split composition. | Keep demo-specific composition; align shared hero typography/actions. Separate static AI template. |
| 2. **The short answer** | Short definition/summary in the AI answer layout. | Align with full/compact summary family; this is the AI version of “In short” (R15). |
| 3. **One script. One presenter. One clip.** `#sample` | Service demonstration: video sample/reel. | Keep the format needed to demonstrate the product. Verify motion/touch access visually; not generic section drift. |
| 4. **Four steps from brief to live.** `#how` | Numbered process steps with images; AI workflow vocabulary. | Keep service-specific steps; align step numbers, image treatment and headings. AI-local process component. |
| 5. **Built to be used, not just admired.** | Feature/benefit cards describing the service output. | Keep relevant benefits; align generic benefit-card spacing and headings. |
| 6. **The kind of clip we produce.** | Service demonstration: video sample/reel. | Keep the format needed to demonstrate the product. Verify motion/touch access visually; not generic section drift. |
| 7. **The same service, three audiences.** | Three audience cards: D2C, B2B and education; image/text treatment. | Align with the shared audience-card family. Same segmentation as main site; local AI markup. |
| 8. **Before you ask.** | AI accordion panels; button toggles and animated answer reveal. | Align FAQ anatomy/controls; independent AI implementation (R10). |
| 9. **Five other ways to put AI to work.** | Other five AI services presented as onward links/cards. | Keep relevant destinations; align related-resource identity and action treatment (R12). |
| 10. **Ready to try AI Spokesperson Video?** `#talk` | Centered CTA on yellow gradient/sunburst; contact and AI-overview links. | Align booking behaviour; sub-brand colour exception may remain. AI-local closing template (R09). |

**Immediately above the footer:** Ready to try AI Spokesperson Video? (`band band--sunsoft`).

**Free-tool placements:** No dedicated main-content calculator promotion; absence alone is not an inconsistency.


### Page 71: `/ai-by-mmc/ai-ugc.html`

Source: [static page](../../mmc-astro/public/ai-by-mmc/ai-ugc.html).

| Order / section | Current treatment | Why different / judgment |
|---|---|---|
| 1. **Creator-style videos, without chasing creators.** | AI light hero; image/demo-led, reversed split composition. | Keep demo-specific composition; align shared hero typography/actions. Separate static AI template. |
| 2. **The short answer** | Short definition/summary in the AI answer layout. | Align with full/compact summary family; this is the AI version of “In short” (R15). |
| 3. **One script. One creator. One clip.** `#sample` | Service demonstration: video sample/reel. | Keep the format needed to demonstrate the product. Verify motion/touch access visually; not generic section drift. |
| 4. **Four steps from brief to live.** `#how` | Numbered process steps with images; AI workflow vocabulary. | Keep service-specific steps; align step numbers, image treatment and headings. AI-local process component. |
| 5. **Built to be used, not just admired.** | Feature/benefit cards describing the service output. | Keep relevant benefits; align generic benefit-card spacing and headings. |
| 6. **The kind of clip we produce.** | Service demonstration: video sample/reel. | Keep the format needed to demonstrate the product. Verify motion/touch access visually; not generic section drift. |
| 7. **The same service, three audiences.** | Three audience cards: D2C, B2B and education; image/text treatment. | Align with the shared audience-card family. Same segmentation as main site; local AI markup. |
| 8. **Before you ask.** | AI accordion panels; button toggles and animated answer reveal. | Align FAQ anatomy/controls; independent AI implementation (R10). |
| 9. **Five other ways to put AI to work.** | Other five AI services presented as onward links/cards. | Keep relevant destinations; align related-resource identity and action treatment (R12). |
| 10. **Ready to try AI UGC?** `#talk` | Centered CTA on yellow gradient/sunburst; contact and AI-overview links. | Align booking behaviour; sub-brand colour exception may remain. AI-local closing template (R09). |

**Immediately above the footer:** Ready to try AI UGC? (`band band--sunsoft`).

**Free-tool placements:** No dedicated main-content calculator promotion; absence alone is not an inconsistency.


### Page 72: `/ai-by-mmc/ai-video-generation.html`

Source: [static page](../../mmc-astro/public/ai-by-mmc/ai-video-generation.html).

| Order / section | Current treatment | Why different / judgment |
|---|---|---|
| 1. **Ad films without the film shoot.** | AI light hero; image/demo-led, split composition. | Keep demo-specific composition; align shared hero typography/actions. Separate static AI template. |
| 2. **The short answer** | Short definition/summary in the AI answer layout. | Align with full/compact summary family; this is the AI version of “In short” (R15). |
| 3. **Four steps from brief to live.** `#how` | Numbered process steps with images; AI workflow vocabulary. | Keep service-specific steps; align step numbers, image treatment and headings. AI-local process component. |
| 4. **Built to be used, not just admired.** | Feature/benefit cards describing the service output. | Keep relevant benefits; align generic benefit-card spacing and headings. |
| 5. **Drag through the reel.** | Service demonstration: video sample/reel. | Keep the format needed to demonstrate the product. Verify motion/touch access visually; not generic section drift. |
| 6. **The same service, three audiences.** | Three audience cards: D2C, B2B and education; image/text treatment. | Align with the shared audience-card family. Same segmentation as main site; local AI markup. |
| 7. **Before you ask.** | AI accordion panels; button toggles and animated answer reveal. | Align FAQ anatomy/controls; independent AI implementation (R10). |
| 8. **Five other ways to put AI to work.** | Other five AI services presented as onward links/cards. | Keep relevant destinations; align related-resource identity and action treatment (R12). |
| 9. **Ready to try AI Video Generation?** `#talk` | Centered CTA on yellow gradient/sunburst; contact and AI-overview links. | Align booking behaviour; sub-brand colour exception may remain. AI-local closing template (R09). |

**Immediately above the footer:** Ready to try AI Video Generation? (`band band--sunsoft`).

**Free-tool placements:** No dedicated main-content calculator promotion; absence alone is not an inconsistency.

<a id="implementation-references"></a>
## Source references

- [Shared shell](../../mmc-astro/src/components/Shell.astro): explains why the footer is shared but the preceding section is not.
- [Marketing close](../../mmc-astro/src/components/pages/Cta.astro), [hub close](../../mmc-astro/src/components/hub/Cta.astro), [company/work close](../../mmc-astro/src/components/company/Closing.astro), [current editorial close](../../mmc-astro/src/components/editorial/Cta.astro).
- [Metric/tool cards](../../mmc-astro/src/components/hub/Numbers.astro), [current Insights cards and tool promotion](../../mmc-astro/src/pages/insights.astro), [inline tool](../../mmc-astro/src/components/article/InlineTool.astro), [calculator shared components](../../mmc-astro/src/islands/tools/ToolsShared.jsx).
- [Light CRM loop](../../mmc-astro/src/components/hub/LoopB.astro), [dark CRM loop](../../mmc-astro/src/components/hub/Loop.astro), [hub template selection](../../mmc-astro/src/pages/%5B...slug%5D.astro).
- [Stage variants](../../mmc-astro/src/components/hub/Stages.astro), [related cards](../../mmc-astro/src/components/hub/Beyond.astro), [article related cards](../../mmc-astro/src/components/article/Related.astro).
- [Home discipline component](../../mmc-astro/src/components/home/Disciplines.astro), [discipline sizing](../../mmc-astro/src/styles/disciplines.css), [Home styling](../../mmc-astro/src/styles/home-v2b.css), [current editorial styling](../../mmc-astro/src/styles/insights-v2.css).
- [Universal section backdrop](../../mmc-astro/src/styles/styles.css), [marketing overrides](../../mmc-astro/src/styles/home26.css), [tool overrides](../../mmc-astro/src/styles/tools.css), [CTA card styling](../../mmc-astro/src/styles/answer.css).
## Coverage and working notes

- All 72 routes are listed individually in the appendix; it contains 534 section/module rows.
- Each page identifies its final block before the footer and its main-content free-tool placements.
- Source-level causes are distinguished from design recommendations. Browser-dependent findings remain unverified.
- The original findings have been combined rather than treated as 34 separate implementation tasks. R01–R20 are the reference IDs to use for instructions going forward.
- Only this review document was changed; website source remains unchanged.

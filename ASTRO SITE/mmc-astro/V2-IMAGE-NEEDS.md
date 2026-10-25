
## Homepage (home agent)
Reused existing art everywhere; these would raise quality, none block launch:
- OutcomeStrip: real-logo platform dashboard UIs per audience (Meta Ads Manager D2C, Google Ads B2B lead report, admissions CRM) to replace meta/scale.jpg, google/report.jpg, edu/crm.jpg. Keep the "Illustrative view" note.
- HowAccordion: four literal scenes, one per goal (new customers, visibility, convert and retain, reputation and margin) in 3:2, 1024x688 minimum.
- Calculators band: screenshots of the four calculators (unit economics, break-even ROAS, CAC runway, LTV:CAC) in place of d2c/range.jpg.
- Closing band: a real photo of the MMC team in a client call (home2/closing.jpg is stand-in).
- Testimonials: no recorded written quotes exist, so the section reuses OnCamera video voices. Needs: client-approved written quotes with name and role, or more recorded clips.

## Service template (hub agent)
- NumberedGrid (all 18 service hubs): only 5 photos exist per service and Stages already uses them, so grid cards 01 to 05 reuse the same stage photos and card 06 borrows a generic /assets/services/ or sibling-service photo. Needed: 6 distinct literal thumbnails per service, one per grid card (esp. Meta Ads, Google Ads, Shopify, SEO, CRO, Lead generation).
- WhyUs (every page with `why`): currently reuses stage photo 3. Needed: one portrait (4:5) photo of the MMC team at work on that service (real people, no stock).
- ProcessAccordion (every page): reuses the last stage photo. Needed: one portrait (4:5) desk/workshop scene per service showing the process step.
- CtaBand: reuses tiles[0] photo. Needed: one neutral 4:3 "talk to us" photo (team call or studio).

## SEO layer (technical SEO agent)
- Per-section Open Graph cards (1200x630 or the existing 2400x1260 ratio): services, industries, guides, work, tools, ai-by-mmc. Today every page uses /assets/og-card.jpg. When a file exists, set it in `OG_BY_SECTION` in src/layouts/BaseLayout.astro, or pass `image` per page.

## New pages (new-pages agent, 2026-10-09)
All 13 new hubs reuse existing literal photos under public/assets (seo, sv, orm, d2c, ugc, meta, qc, inf, b2b, edu, google, cro). None block launch. Distinct scenes would raise quality:
- /services/seo/ai-seo/, /aeo/, /geo/: a literal screen scene of a buyer asking an AI assistant a purchase question (illustrative UI, no real brand answers), 3:2. Today all three reuse seo/aeo.jpg and seo/authority.jpg.
- /services/content-marketing/: a content calendar on a desk and a written guide being edited (3:2). Today reuses sv/content.jpg, social/calendar.jpg, guides/library.jpg.
- /services/seo/google-business-profile/: a Google Maps local pack with a business profile card (illustrative, real Google Maps UI styling with the illustrative note), 3:2. Today reuses orm/profile.jpg.
- /industries/d2c/skincare/: a bathroom-shelf routine scene and a replenishment reminder on a phone. Reuses d2c/range.jpg, ugc/shoot.jpg.
- /industries/d2c/baby-and-kids/: a parent opening a gift-ready kids parcel; a size-stage chart. Reuses d2c/unboxing.jpg, ugc/brief.jpg.
- /industries/d2c/food-and-beverage/: a pantry or snack bundle on a table; a quick commerce product listing with real app styling. Reuses d2c/packing.jpg, qc/listing.jpg.
- /industries/d2c/fashion-and-apparel/: a size-guide product page on a phone; a returns pile. Reuses d2c/range.jpg, guides/returns.jpg.
- /industries/b2b/manufacturing/: a plant floor with CNC or fabrication, and a datasheet/RFQ on a desk. Reuses b2b/*.jpg office scenes.
- /industries/b2b/saas-and-software/: a product dashboard demo on a laptop, a trial sign-up screen. Reuses b2b/qualify.jpg, cro/forms.jpg.
- /industries/education/colleges/: a campus open day with prospective students and parents. Reuses edu/campus.jpg.
- /industries/education/study-abroad/: a counselling session with a student and parent, a world map with intake dates. Reuses edu/students.jpg.

## Round 2: white label, WordPress, maintenance (existing photos reused, nothing generated)
Reused under public/assets (web, seo, ux, social, meta, google, rt, cro, amazon, qc, ugc, orm, app, res, company, about2, contact). Dedicated art that would help:
- White label pillar and /white-label/outsourcing/: agency strategist and delivery team on a video call (real, not abstract).
- /white-label/india/: team at desk in the Thane or Indore office, plus a world-clock or overlap-hours scene.
- /white-label/reporting/: a branded monthly report on a laptop with the agency logo area blank.
- /white-label/reseller-programme/ and pricing-models: a one-page package sheet on a desk.
- /services/website-maintenance/: a monthly checklist on a laptop beside a coffee cup (matching the web/ set).
- WordPress: a block editor screen (illustrative, WordPress logo only if the platform-logo rule allows).

## Service redesign preview (/preview/service-meta-ads/, preview only)
The preview reuses existing photos under public/assets only. Nothing is generated. Where a better scene would lift it:
- Answer spread (4:5 portrait): a real MMC strategist at a desk with Meta Ads Manager on the second screen, the account view readable. Today: company/performance.jpg (analyst at two dashboard screens).
- Pinned work panel: no photo needed. It is real HTML/CSS/SVG with the official Meta mark (public/assets/platforms/meta.svg) and an "illustrative" note. If a real screen capture is ever approved, it can replace the states.
- Proof tiles: three project tiles reuse public/assets/clients/<id>-work.jpg. Needed: one Meta ad creative per tile (the real ad, used with the brand's permission) in 16:9.
- First 90 days, four 16:10 scenes (one per stop). Today: about2/callscreen.jpg, about2/huddle.jpg, meta/creative.jpg, meta/scale.jpg. Needed: (1) an audit call with an account on screen, (2) the funnel whiteboard session, (3) a creative review wall with ad variants, (4) a weekly report on a screen with a team member.
- Close band (full bleed, 16:9 or wider): a real MMC team photo, ideally looking toward the camera. Today: company/session.jpg.
- Fit and questions: an optional "Ask us directly" portrait of a named strategist (needs a real person and consent).

## Guides and Work upgrade (guides3 / work3 agent, 2026-10-12)
Existing photos and client artwork only; nothing generated. None block launch.
- /guides/ featured spread reuses guides/review.jpg (two people reading a profit-per-order sheet) so the contribution margin cover is not shown twice. A dedicated landscape (3:2, 1800px wide) of a founder comparing a dashboard ROAS with a printed cost sheet would be stronger.
- Guide text blocks with no picture of their own (they sit between pictured blocks, so no long text run): contribution margin "What contribution margin is", "A worked example" (has a table), "How to use break-even ROAS"; attribution "An illustrative example" (table), "Why it happens"; creative testing "What to test", "How to read the results", "Where MMC fits in". Wanted, 16:9: (1) a single order's costs laid out as receipts on a desk; (2) a creative review on a laptop with three ad variants side by side and a results column (illustrative note); (3) an MMC strategist and a founder at a creative board.
- Guide headers use each guide's cover photo at 2:1; a purpose-shot wide (2:1, 2400px) header per guide would avoid the crop.
- /work/ hero reel uses case2/<id>/web.jpg (Vaga Kids, MVJ College of Engineering, NM Consultings). Nothing needed; more brands with case2 web.jpg art would let the reel rotate.

## About and Careers v3 (about/careers agent, 2026-10-12)
Both pages and the six role pages reuse existing photos (about2, company, contact, careers2, sv, services) and caption them "Illustrative scene(s)". None block launch. Real photos would make these pages honest without the caption:
- /about/ hero (edge to edge, 21:9, 2400px wide minimum): the MMC team at the Thane studio mid-planning. Today about2/huddle.jpg, upscaled at 1440px and wider.
- /about/ "The studio": the real WeWork Zenia building exterior and the MMC desks (4:5 and two 4:3). Today contact/office.jpg is a generic glass building.
- /about/ hero crafts line (Design x marketing x technology x content x AI) has no AI picture on the page: one literal AI scene (a strategist reviewing an AI by MMC tool on screen) so AI has a visual like the other crafts.
- /careers/ hero (portrait column, 4:5 or taller, 1600px tall minimum): the real team at work. Today careers2/studio-wide.jpg (landscape, cropped).
- /careers/ "How we work" (four 4:5 portraits) and "How hiring works" (four 4:3 scenes: a one-page application, a call with the discipline lead, a day's paid work at a desk, meeting the team).
- Role pages: one 1:1 portrait per discipline (performance, creative, strategy, technology) of the real seat; ugc/brief.jpg stands in for the copywriter.

## Hub pages, hubs2 (hubs agent, 2026-10-12)
/services/, /services/performance-marketing/, /industries/, /industries/d2c/, /industries/b2b/ and /industries/education/ reuse existing photos (sv, brand, pack, shop, ugc, d2c, b2b, edu, shared, au, home2, pm-v3, meta, google, amazon, qc, leadgen), AI by MMC sample images (public/ai-by-mmc/assets/img) and client artwork. Nothing generated. None block launch.
- Audience heroes bleed one 1024px-wide photo across about 640 css px; at 2x it is soft. Wanted at 2000px wide minimum, 4:3: a customer opening a delivered order (D2C, today d2c/unboxing.jpg), a sales video call (B2B, today b2b/call.jpg), a college open day with families (education, today edu/campus.jpg).
- /industries/ doors: three tall portraits (3:4, 1400px tall): a D2C team packing orders, a B2B team in a pipeline review, an admissions counselling session. Today d2c/packing.jpg and the AI by MMC samples hub-aud-b2b.jpg and hub-aud-edu.jpg, cropped from landscape.
- Baby and kids sector entry: no literal photo exists. /industries/ uses d2c/unboxing.jpg; /industries/d2c/ uses AwwBaby storefront artwork (case2/awwbaby/hero.jpg). Wanted, 4:3: a parent dressing a toddler or opening a kids' parcel.
- Food and beverage, skincare, manufacturing, SaaS, colleges and study abroad entries use AI by MMC sample images (video-use-d2c, ugc-use-d2c, photoshoot-use-b2b, lp-use-b2b, video-use-edu, photoshoot-use-edu). Real 4:3 scenes per sector would be more honest.
- Avoid stock mock-ups with dollar prices: hub-aud-d2c.jpg shows "$48.00" on the phone, so it is no longer used on the hubs.

# AI by 3minds: AI Photoshoot and AI UGC (deep audit)

Audited 2026-09-28. Claims and numbers are recorded as content only, not fact-checked.

## 0. How the pages are actually built (read this first)

- `https://www.3mindsdigital.com/AI-by-3minds/ai-photoshoot` and `/ai-ugc` are Next.js shells (main 3minds site). Body contains a `position:fixed; inset:0; width/height 100%; z-index:9999` **iframe** pointing at a Framer site:
  - `https://ai-by-3minds.framer.website/ai-photoshoot`
  - `https://ai-by-3minds.framer.website/ai-ugc`
- The shell has NO real content. Shell `<title>` is just "AI by 3minds", description "3minds Digital - Creative Digital Agency", canonical `https://www.3mindsdigital.com/AI-by-3minds` (same for both subpages), og:title "3minds Digital", og:url site root, og:image `https://www.3mindsdigital.com/opengraph-image.png` (600x600). GTM `GTM-MZGG5RND`, GA `G-MLVR7G6S0W`, Cloudflare Rocket Loader. Shell HTML ~15.5 KB each.
- All real copy, media, animation is in the Framer site (Framer generator `0b0b0ac`, site id `1Gx3NKHivRzBUJzgzJ0AkP`, React + Framer Motion, Lenis smooth scroll `SmoothScroll_Prod` + `lenis.mjs`, Figtree/Space Grotesk/Fragment Mono/Inter fonts).
- Framer sibling pages in the same project (from `searchIndex`): `/`, `/ai-photoshoot`, `/ai-video-generation`, `/ai-sales-agent`, `/ai-ugc` (indexed as newer), `/ai-landing-page-builder`, `/ai-spokesperson-video`, `/contact`, `/blog/...` (4 template blog posts titled "My Framer Site"). Framer nav still contains template leftovers: "About" links to `./ai-photoshoot`, "Blog" links to `./`, "Contact" `./contact`.
- Framer footer badge text still present: "Create a free website with Framer, the website builder loved by startups, designers and agencies."
- Method: raw HTML of shell and Framer pages via curl, Framer SSR HTML parsed in document order, Framer `.mjs` component bundles greped for hidden (collapsed) FAQ answers and animation configs, images downloaded and viewed, videos downloaded and thumbnailed, WebSearch for context. WebFetch was not needed because the SSR HTML carried everything.

Shared chrome (both pages, Framer nav): logo (3minds, left) then links: Services (`./#services`), Work (`https://www.3mindsdigital.com/our-work/`), "Get in touch" (`https://www.3mindsdigital.com/contact-us/`, button with two-state text-roll hover: "1st state"/"2nd state" duplicate text). Mobile: hamburger (3 lines, "Mobile Closed"/"Mobile Expanded") with Home, About, Blog, Contact, and a "Book a call" button. Nav is dark/black.

Parent hub (Framer `/`, for context and internal-link model): H2 "Smart teams don't wait. They automate." kicker "Grow with Ai", sub "From custom-built assistants to growth-ready automations, 3minds helps founders unlock AI's potential - starting today." CTAs "Get in touch" and "Request Free Demo" (Calendly `https://calendly.com/3mindsdigital-info/introduction`). "We've tested 500+ AI tools so you don't have to." logo strip. Services H2 "From hours to minutes -thanks to AI" / "Our AI handles the repeat stuff so your team can stay lean and focus on what matters." / "Explore our AI service stack". Six service cards, each with its own CTA copy:
- AI Photoshoots: "Say goodbye to expensive shoots, slow edits, and limited angles. We deliver high-quality, brand-ready photos in minutes - no cameras, no crew, and up to 80% lower cost than traditional setups." CTA "Get studio-quality shots now" -> `./ai-photoshoot`. Video `https://framerusercontent.com/assets/YjK9uE8bCcUWDN4Dwq38DwPUnZk.mp4`.
- AI Video Generation: "Create studio-quality videos in a fraction of the time - no cameras, actors, or post-production teams required. From reels to product explainers, we help you generate videos in minutes." CTA "Create on-brand videos instantly". Video `.../Dj7pQwJYKewBagG7XisRzuWo7Gs.mp4`.
- AI Sales Agent: "Automate your outreach and scale your pipeline - without hiring more sales reps. Our AI Sales Agent creates and runs personalised, multi-touch outreach campaigns across email, LinkedIn, and WhatsApp. It engages leads, nurtures conversations, and books meetings - all while your team focuses on closing deals, not chasing them." CTA "Deploy my AI seller".
- AI UGC Videos: "AI-powered UGC videos help brands turn winning scripts into endless content variations without chasing creators, shoot schedules, or production teams. From product demos to testimonials, you launch more experiments in less time, so every campaign learns, iterates, and scales faster." CTA "Get your UGC Videos". Uses UGC videos `jSbIhs...mp4` and `KW3Xae...mp4`.
- AI Landing Page Builder: "Turn traffic into action with landing pages that adapt, personalize, and convert - built using AI that understands your brand and your audience." CTA "Build my landing page".
- AI Spokesperson Videos: "Whether you're starting from scratch or enhancing an existing system, we offer strategic consulting and develop custom AI projects aligned with your unique goals." (copy mismatch, template leftover) CTA "Book your AI face". Video `.../2aw1ULsZIYkKh2UwgG7VLo.mp4`.
Pattern to copy: every card CTA is first-person outcome copy ("Get studio-quality shots now", "Deploy my AI seller", "Book your AI face"), not "Learn more".

---

# PAGE 1: AI PHOTOSHOOT

URL (shell): https://www.3mindsdigital.com/AI-by-3minds/ai-photoshoot
Content URL: https://ai-by-3minds.framer.website/ai-photoshoot

## 1.1 Verbatim copy, in order

**Nav** (see chrome above; button "Book a call").

**Section: Hero** (Framer name "Hero section")
- Kicker/badge: `AI Photoshoot`
- H1: `Get studio quality photos without a camera` (each word is a separate text node, i.e. word-by-word animated reveal)
- Subhead: `We create hyper-realistic, on-brand product photos using AI, no studio needed. Scalable from 1 to 1,000 SKUs.`
- CTA: `Book a free call` (-> `https://calendly.com/3mindsdigital-info/introduction`; two-state text roll on hover)

**Section: scroll-pinned image grid** (Framer "Main / Scroll / Sticky / Image Grid", trigger "Images Trigger"; no text, images only. See asset table.)

**Section: "Who we are" (renamed template block) = Benefits**
- Badge: `Hidden Benefits`
- H2: `Why AI Photoshoots Work Better`
- Six-cell "Stats grid" (3 unique x2 for desktop/mobile duplicates; 4 unique items, icon + title + description):
  1. `Faster Than Any Agency` / `From brief to brilliance in under 24 hours. Skip the scheduling, setup, and post-production, just send us your input, and we'll handle the rest.`
  2. `Always On-Brand` / `Our AI models adapt to your visual language, tone, and styling rules, so every image looks like it came from your in-house creative team.`
  3. `Unlimited Possibilities` / `From pristine studio backdrops to exotic outdoor scenes, our AI can simulate any environment, angle, or mood, without real-world constraints.`
  4. `Scalable & Cost-Efficient` / `Eliminate production overhead. Whether it's 5 SKUs or 500, we scale your content creation while keeping costs predictable and low.`
  (The Framer "Stats" component has an "Icon and number" slot; here the icon slot holds an icon glyph and the "number" slot holds the benefit title. No counters.)

**Section: "Our Team" (renamed template block) = Where It Fits (audiences)**
- Badge: `Perfect For`
- H2: `Where It Fits`
- Intro: `D2C brands, marketplaces, agencies, and ecommerce teams looking to scale high-quality product visuals without the cost or complexity of traditional shoots.`
- Cards (image + name/role style layout):
  1. `For D2C Brands` / `Launch collections 5x faster with high-quality product shots for every channel.`
  2. `For Marketplaces` / `Maintain consistent image quality across vendors, with minimal source material.`
  3. `For Ecommerce Teams` / `Quick-turn creative for product drops and seasonal refreshes. No overhead.`

**Section: FAQs and CTA**
- Badge: `FAQs`
- H2: `We've Got the Answers You're Looking For`
- Sub: `Quick answers to your AI automation questions.` (template wording, off-topic: "automation")
- Accordion (answers are collapsed, not in SSR HTML; read from component props in the JS bundle):
  1. Q `Do I need to shoot in a white background?` A `Not necessarily. Clear product shape and decent lighting helps.`
  2. Q `Can I reuse the same product for different settings?` A `Yes. Generate as many variations as you want.`
  3. Q `Is this copyright-safe?` A `100%, Images are uniquely generated and rights belong to you.`
  4. Q `Can it generate model shots too?` A `Yes, just describe the look or select a pre-trained avatar.`
- Closing CTA block (H2): `Why shoot again? Let AI do it for you.`
- Sub-line: `Book a Call Today and Start Automating` (template wording)
- Button: `Generate my first photo` (-> `https://www.3mindsdigital.com/contact-us/`)
- Footer: no real footer; only the Framer badge line.

Not present on this page: process steps, pricing/packages, testimonials, logos, case studies, before/after, stats numbers, form fields (all CTAs route out to Calendly or the /contact-us/ page; no on-page form).

## 1.2 Wireframe and persuasion purpose

| # | Section | Layout | Persuasion purpose |
|---|---|---|---|
| 1 | Nav | Dark bar, logo left, 3 links, pill CTA | Keep the parent brand, one-click booking |
| 2 | Hero | Centred: badge, H1 (animated word by word), subhead, single CTA. Behind/around: 3D rotating founder-portrait carousel (5 portraits) | Promise (studio quality, no camera) + scale hook (1 to 1,000 SKUs) + proof by demonstration (the visuals ARE the AI output) |
| 3 | Scroll-pinned image grid | 100vh sticky stage, 5 columns x 3 rows of 200px cells with 100px gaps, 13 tiles that scale/parallax on scroll | Volume and range proof: "same person, any scene, any style" (portfolio-as-animation) |
| 4 | Hidden Benefits | Header + 2x2/3x2 grid of icon cards | Objection handling: speed, brand fit, freedom of scene, cost |
| 5 | Where It Fits | Header + 3 image cards | Self-identification by segment (D2C, marketplace, ecommerce) with a quantified promise ("5x faster") |
| 6 | FAQs | 4-item accordion | Kill the 4 blockers: input quality, reuse, IP, models/people |
| 7 | Closing CTA | Big headline over a glow/ellipse BG, single button | Reframe ("Why shoot again?") then convert |

Flow is: Promise -> Proof (visual) -> Why it works -> Who it is for -> Objections -> CTA. Only 3 CTAs on the page, all to a call/contact.

## 1.3 Assets (image/video table)

All on `https://framerusercontent.com/images/<id>.<ext>` (append `?width=..&height=..` for sized versions; Framer serves `scale-down-to=512/1024/2048` srcset). No video on this page. There are NO `alt` attributes on any image (SEO gap). Every hero/grid portrait shows the SAME young South Asian man with dark hair and a beard/stubble, generated with AI from a single base image. Hero portraits carry a small "Made using AI" sparkle pill in the top-right corner (Google-style AI label).

### Hero rotator (5 portrait tiles, 1002x1280 webp, portrait 4:5), placement: 3D rotating carousel in hero
| Order | Asset id | Literal scene | Type |
|---|---|---|---|
| H1 | BjTRVtNng6FvnbqStMbhhRmYbHs.webp | Man in black t-shirt and watch sitting on a stool in a dark gym, hands clasped over a towel, smiling at camera, cool moody light | IMAGE |
| H2 | Bb4R6jRa5F5mdS6mTXBGkbZFero.webp | Man in dark blazer over black tee on a stage with blue backdrop, mid-talk, pointing with one hand, headset mic | IMAGE |
| H3 | sTaXfLWlTyULUqUtiXlGbz85FU.webp | Man in navy checked shirt and khaki trousers standing on a sunlit path between tall trees, soft green haze, smiling | IMAGE |
| H4 | 0SyhtaA791KCKTh6nCAsu11XVeU.webp | Man in black long-sleeve V-neck at a round wooden cafe table with an open notebook, warm window light, plants behind | IMAGE |
| H5 | fKbQQbAjFJgIEytbu5DajXpZuI.webp | Man in white tee typing on an open laptop at a wooden desk, bookshelf and posters behind, looking at screen | IMAGE |

### Scroll-pinned image grid (13 tiles; Framer names Image 1 to Image 13; listed in DOM order)
| Tile | Asset id (size) | Literal scene | Type |
|---|---|---|---|
| Image 1 | FA2TrXqACp12ElNqu045yCs6ao.jpg (1120x1120) | Man in red Mario-style cap, red tee and denim dungarees holding a gold coin, against a retro pixel-game mural (question block, green pipe, clouds) | IMAGE (costume/fun) |
| Image 2 | In4YDJRqv0R7Fb1oL1k7AWY35uc.jpg (1120x1120) | Man in black polo and khaki chinos, full-length, standing in an empty modern co-working room with green chairs, laptops, hanging plants | IMAGE |
| Image 3 | 6IHcnPIJG0f9C95HnE6IbyOKGwA.jpg (1120x1120) | Man in light-blue shirt seated in black mesh office chair, hands clasped, palm plant against white wall | IMAGE |
| Image 10 | ltiWaEsio5z84ha7tNPLHdhHVm0.jpg (1120x1012) | Man in dark blazer on blue-lit stage, pointing sideways mid-talk | IMAGE |
| Image 7 | vR6YHa7d4x7fRxc66rC7wIGkZ8M.jpg (1120x1120) | Man in black blazer speaking into a handheld mic on a dark stage with a presentation screen behind | IMAGE |
| Image 8 | pkuVHQxYpPeZVLWSf2Z4mzcaI.jpg (1120x1120) | Man in plaid shirt writing in a notebook by candlelight in a log-cabin cafe, dusk trees in window | IMAGE |
| Image 4 | Ft2ynjupdGiSAdi7aZt04KgTwRU.jpg (2240x2240) | Man in black V-neck at cafe table with notebook and phone, warm window light | IMAGE |
| Main | C6ORZDvVMsICyPNf5ym1P9Jqoi8.png (600x756) | The ORIGINAL base photo: man in navy "3minds" polo standing by a low concrete wall outdoors in daylight, hand on hip. Has a black "Base Image" tag in the top-left corner | IMAGE (before-state, key to the concept) |
| Image 11 | j7nFLyPw7Z0AjwVk2UBXI0pvmzM.png (820x1024, webp) | Close-up product shot of a silver handheld game console (d-pad, ABXY buttons, two analog sticks, "Open/Back/Games/Apps" screen labels) on a light grey ground, product studio look | IMAGE (product example) |
| Image 5 | g9NCQEgKUOnqAdL3cZpLERSU8.jpg (1120x1120) | Man in black blazer and tee leaning against a grey concrete wall on a city pavement, hands in pockets | IMAGE |
| Image 9 | j5WlfhAqmF75mdSLKcRgKYx7Pus.jpg (1120x1120) | Man in black blazer holding a mic, gesturing, dark event hall with a blue screen | IMAGE |
| Image 12 | nRfAkaNentE3c38PHz34mdFLyg.jpg (1120x1120) | Man in black tuxedo and bow tie against a grey studio wall, hands in pockets, dramatic side shadow | IMAGE |
| Image 6 | fpFcGBZd1LyE1upHbTa4MT4FSk.jpg (2240x2240) | Man in grey blazer, mustard jumper and cream roll-neck scarf crouching in dry wheat grass under an overcast sky | IMAGE |
| Image 13a | qhVnJfn6Jg5Ggesfmt1WGYfmppk.jpg (1120x1120) | Man shouting/fist-pumping in black jacket in a dark room over a wooden table, intense expression | IMAGE |
| Image 13b | E9KO6sYUT9s1szjWFwOIQPPzU.jpg (1120x1120) | Man in black tee on a stool in a dark gym holding a towel (same look as H1) | IMAGE |
| Image 13c | 4JJT9GCLZ0aeTK0krxgOBQthCE.jpg (1120x1120) | Man in beige blazer at a wooden desk with notebook and mug, chin on hand, looking toward a monitor, window blinds | IMAGE |
(The grid markup is duplicated in the DOM for desktop and mobile; 13 unique images.)

### "Where It Fits" cards (audience cards)
| Card | Asset id (size) | Literal scene | Type |
|---|---|---|---|
| For D2C Brands | lQhaSE5NXAlrkcUFEEpkCuJIoE.png (755x898) | Isometric 3D render of a modular kitchen: L-shaped cream counter, gas hob, sink, pull-out drawers, corner carousel unit, lit pantry column, beige tiled floor | IMAGE |
| For Marketplaces | 31VBdt4PHkaODBagptlJXqV0qk.webp (560x684) | Male model in black t-shirt and shorts holding an orange basketball, studio-grey backdrop, looking off-camera (apparel catalogue shot) | IMAGE |
| For Ecommerce Teams | ujCNbYAr6PjkssXKwxPBVYLMGg.jpeg (1024x1024) | 2x2 collage of women in cream linen outfits carrying a round red crossbody bag with a floral emboss, four angles (front, side, back, cropped) on beige | IMAGE |
Each card image is used twice in DOM (desktop/mobile).

### Other
- Background glow shapes: three inline SVG gradient ellipses in hero (860x208, 860x208, 381x176) in purple-to-pink; FAQ/CTA has an SVG ellipse BG (930x358).
- Nav logos: inline SVG (3minds wordmark).

### MMC image briefs (equivalent, literal, one per slot; VIDEO-SLOT marks where video can replace later)
Because 3minds' concept is "one real base photo becomes many AI scenes", MMC should shoot ONE base photo and generate the rest.
- **Base image (before state, "Base Image" tag)**: a real phone-quality photo of an MMC team member (or a client's real founder) standing outdoors beside a low concrete wall in daylight, wearing a plain navy MMC-branded polo with the logo on the chest, one hand on hip, neutral expression. 4:5, 600x756 minimum. Overlay a black pill labelled "Base Image".
- **Hero rotator x5 (4:5, 1002x1280)**: same person in (1) dark gym on a stool with towel, (2) stage with blazer and headset mic, (3) sunlit tree path in checked shirt, (4) cafe table with notebook, (5) laptop at wooden desk. Add "Made using AI" pill in the top-right. VIDEO-SLOT later: each tile becomes a 3 to 5 second looped clip (subtle head turn and light shift), muted.
- **Scroll grid x13 (1:1, 1120x1120)**: same person as costume (game-character cap, dungarees with a coin), empty co-working space full length, blue shirt in office chair, on a lit stage pointing, handheld-mic speaker, candlelit notebook, blazer against a concrete wall, tuxedo against grey studio wall, crouching in wheat field in coat and scarf, dramatic shouting portrait, gym stool, thinking at a desk. For MMC vary these across our three verticals: D2C founder at a packing table, B2B founder at a boardroom, school principal in a classroom corridor.
- **Product proof tile (Image 11)**: a product hero shot (silver gadget, grey seamless, soft shadow). MMC equivalent: a D2C product (e.g. a serum bottle on a pale-stone plinth with soft window shadow).
- **Where it fits, D2C**: isometric room render of a product-led space (kitchen or wardrobe) or a lifestyle flat lay of a D2C product range on a marble counter.
- **Where it fits, Marketplaces**: a catalogue-style model shot, studio grey backdrop, full torso, holding a prop (ball/bag), same lighting across vendors.
- **Where it fits, Ecommerce**: 2x2 collage of one product in four angles on beige (front, side, back, detail).
- **Closing CTA**: no image, purple/pink ellipse glow.

## 1.4 Animations and interactions (with evidence)

- **Smooth scroll**: Lenis (`SmoothScroll_Prod.mjs`, `lenis.mjs` loaded).
- **Hero word-by-word H1 reveal**: each word is its own text node (SSR shows the H1 as 14 separate spans); Framer "text reveal / appear" effect; enter preset `opacity:0, y:50` (G), `y:60`, `y:100`, `y:150` variants across blocks.
- **Hero 3D rotating carousel ("Main Rotator / Rotator Wrap / Rotator Frame")**: 5 portrait cards rotate around the Y axis: preset `rotateY: 360` and `rotateY: -360` with tween `{duration:5, ease:[.2,0,.8,1]}`; fanned card poses `rotate -31/-21/-13/22/32`, `rotateX -8..21`, `rotateY -14..17`. Spring entry `{bounce:.2, delay:.3, duration:1.2, type:spring}`. Each card has "SAME COLOR" sibling layers (colour-matched shadow/glow).
- **Scroll-pinned grid**: container "Scroll" with child "Sticky" (`position:sticky; top:0; height:100vh; overflow:hidden; padding:25px 0`), inner grid `grid-template-columns: repeat(5, minmax(50px,1fr)); grid-template-rows: repeat(3,200px); gap:100px; height:854px`. Tiles animate (scale / translate) tied to scroll progress via the "Images Trigger" element (typical Framer scroll-linked variant; tiles start scattered and converge, or the reverse).
- **Section appear-on-scroll**: nearly every block uses `__framer__animateOnce:true`, `__framer__threshold:0.5`, `__framer__enter` (opacity 0 + y translate 50 to 150), i.e. fade-up once at 50% visibility.
- **Buttons**: two-state text roll (text duplicated as "1st state" / "2nd state"; on hover the first slides out and second slides in).
- **Nav hover**: same text-roll on links; mobile burger morphs (3 lines).
- **FAQ**: accordion with rotating plus icon ("Icon Holder"), Closed/Open variants.
- **Not present**: no before/after slider, no counters, no marquee on this page (a Framer Ticker component exists in the bundle but with default demo items, unused here).

## 1.5 Design tokens

- Theme: dark. Named colours seen in the Framer token list: `#050505` (near-black page), `#000`, `#131415`, `#1a1c1d`, `#222426`, `#33373a` (surfaces/borders), `#fff` and `#ffffffe6/#ffffffbf` (text hierarchy), `#e6e6e6` (light text), `#9ba1a5` (muted grey), accent purple `#814ac8` (rgb 129,74,200), pink-lilac `#df7afe`, electric indigo `#5252fe` (82,82,254), link blue `#2060df`, `#fafafa`. Card fills use `#ffffff0d` (5% white) and `#0d0d0dcc` (80% black). Body class on shell: `bg-body`.
- Gradients: purple `#814ac8` to pink `#df7afe` on ellipse glows behind hero and CTA.
- Type: Figtree (headings and body; Figtree Variable for H2), Space Grotesk (labels), Fragment Mono (mono kicker/badge), Inter (fallback/inputs). H1 preset 64px desktop / 56px tablet / 45px mobile, Figtree.
- Badges: small pill above each H2 ("Hidden Benefits", "Perfect For", "FAQs", "AI Photoshoot").
- Buttons: pill-shaped, single accent, text-roll hover, arrow-less; nav CTA "Book a call".
- Cards: dark surface (#131415/#0d0d0d at 80%), 1px border `#ffffff1a`-ish, radius large (20px on media in UGC page), 100px gap on the pinned grid.
- Media corners: 10 to 20px radius.

## 1.6 SEO / AEO

- Framer `<title>` (real): `AI Product Photoshoot Services India | AI Fashion & Ecommerce Photography`
- Framer meta description: `Generate high-quality AI product photoshoots for fashion, ecommerce, beauty, and lifestyle brands. Reduce shoot costs with AI-generated product photography and campaign visuals.`
- Framer canonical: `https://ai-by-3minds.framer.website/ai-photoshoot` (points to the Framer subdomain, NOT the 3mindsdigital.com URL). robots: `max-image-preview:large` (indexable).
- Framer OG: title same as title, description same, og:url framer.website; no og:image on the Framer page.
- Headings: one H1 `Get studio quality photos without a camera`; H2s: `Why AI Photoshoots Work Better`, `Where It Fits`, `We've Got the Answers You're Looking For`, `Why shoot again? Let AI do it for you.`; no H3/H4.
- Keywords targeted (implied by title/meta, no keywords tag): AI product photoshoot, AI photoshoot services India, AI fashion photography, AI ecommerce photography, AI-generated product photography, campaign visuals, beauty/lifestyle.
- Schema: none (no `application/ld+json` in shell or Framer page). FAQ content is present but not marked up and collapsed answers are not in the SSR HTML.
- Shell (what Google sees on 3mindsdigital.com): `<title>AI by 3minds</title>`, generic description, canonical to `/AI-by-3minds` for both photoshoot and UGC, single full-page iframe, no text. Framer subdomain is separately indexable and duplicates.
- Internal links: nav Services (`./#services`), Work (`/our-work/`), Get in touch (`/contact-us/`); the page itself has no links to sibling AI pages, no cross-sell, no breadcrumb.
- CTA destinations: `Book a free call` -> Calendly `3mindsdigital-info/introduction`; `Generate my first photo` and nav "Get in touch"/"Book a call" -> `https://www.3mindsdigital.com/contact-us/`.
- Analytics: GA4, GTM, Visual Website Optimizer (`dev.visualwebsiteoptimizer.com`) beacon, Framer events, collectcdn preconnect.
- Search index hint: 3minds' own search index tags the page URL `/ai-photoshoot` with the same title/description.

## 1.7 Gaps and weaknesses MMC can beat

Content
- No proof: no client logos, before/after, sample brief, turnaround table, pricing, package tiers, testimonial, or case study. Only 13 self-portraits of one man.
- Wording is template debris: FAQ sub "Quick answers to your AI automation questions", CTA "Start Automating", nav "About" links to the photoshoot page, "Blog" to home. Shows a rushed page.
- Only 4 FAQs; nothing on: pricing, resolution/file formats, revisions, how many SKUs per package, brand-guideline handling, jewellery/apparel accuracy, retouching, consent for AI models, marketplace compliance (Amazon/Flipkart/Myntra white-background rules).
- No process ("Upload, we generate, you approve") even though the promise is "under 24 hours".
- No vertical depth (fashion, beauty, jewellery, food, furniture each need their own examples). Product shots barely exist: only 1 gadget shot and 3 audience cards. Almost all "photoshoot" proof is a person portrait, not products, which is off-message for a product-photo pitch.
- Claims ("5x faster", "under 24 hours", "1 to 1,000 SKUs") have no support on-page.

Design
- Grid images are all one person, so the range looks narrow. Product diversity would be more persuasive for D2C.
- No before/after slider even though the "Base Image" tag hints at the idea.
- No sticky CTA, no mid-page CTA between sections 4 and 6; page is short.
- Small type on cards; low-contrast grey on black; AI pill "Made using AI" undermines the "indistinguishable" claim.

Development
- Whole page is a full-screen iframe over the real site: breaks URL sharing/history, back button behaviour, accessibility (iframe title "AI by 3minds" only), scroll restoration, analytics attribution, and the parent site's header/footer are hidden.
- Images have no alt text; FAQ answers hidden from HTML; video (on UGC) 10 to 16 MB files with `preload=none`.
- Framer badge and template leftovers in the DOM.

SEO/AEO
- Duplicate shell: both `/ai-photoshoot` and `/ai-ugc` on 3mindsdigital.com share title "AI by 3minds", identical description and one canonical to the hub, so neither can rank. The optimised titles/metas live on framer.website with canonical to framer.website, so link equity does not reach 3mindsdigital.com.
- No schema (Service, FAQPage, BreadcrumbList, Organization), no `sameAs`, no internal linking, no keyword text in body (H1 lacks "AI product photography"), no city/geo variants beyond "India" in the title.
- MMC opportunity: a native HTML page with the real H1 "AI product photoshoots", FAQPage + Service schema, alt text, comparison table (studio shoot vs AI), pricing tiers, vertical sub-pages (fashion, beauty, jewellery, food, education campus/course-launch visuals), and internal links from D2C/B2B/education hubs.

---

# PAGE 2: AI UGC

URL (shell): https://www.3mindsdigital.com/AI-by-3minds/ai-ugc
Content URL: https://ai-by-3minds.framer.website/ai-ugc

## 2.1 Verbatim copy, in order

**Nav**: same as photoshoot.

**Section: Hero** (Framer "3D Stack Hero Graphic", CTA, Background)
- Kicker: `AI-POWERED PERFORMANCE`
- H2 (used as the headline; the page has no H1 in the hero): `Your Brand, Everywhere. No Creator Required.` (Framer layer name was "Viral Customer Videos, Powered by AI.")
- Body: `AI UGC videos that look authentic and convert like real testimonials at a fraction of the cost. Launch 10 variations in the time it takes to brief one creator.` (layer name shows an en dash "testimonials - at a fraction"; rendered as "testimonials at a fraction")
- Primary CTA: `Get My First UGC Video` (-> `https://www.3mindsdigital.com/contact-us/`)
- Secondary CTA: `See Examples` (-> `./ai-ugc#use-case`, anchor scroll)
- Visual: 3 UGC videos in a 3D-stacked graphic (see assets).

**Section: Problem** (Heading 2)
- H2: `UGC works. Getting it doesn't.`
- Paragraph: `Creators are slow. Briefs get misunderstood. Shoots get rescheduled. You end up with 3 usable videos after 3 weeks. By then, the moment has passed. Your competitors are testing 20 creatives a week. You're stuck on one.` (the SSR/component shows the last sentence in the extracted node but it is in the visible text)
- Three pain cards:
  1. `Creator delays = missed windows` / `Content calendars stall when creators ghost or don't match the brief.`
  2. `High cost, unpredictable output` / `You pay per video with no guarantee of performance.`
  3. `Can't scale what's working` / `Found a winning hook? You can't duplicate it across 10 personas overnight.`

**Section: How it works** ("Benefit Fold" with a "progress line")
- H2: `How It Works`
- Sub: `From brief to live in 24 hours`
- Steps (H3 with a number, progress line connects them):
  1. `Share your brief` / `Product, audience, hook idea, key claim. A short form takes 5 minutes.`
  2. `We script and cast` / `Our team writes scripts and picks the right AI avatar for your target persona.`
  3. `AI generates variations` / `Multiple hooks, voices, and edits are reviewed and approved by our team.`
  4. `You test and scale` / `Ad-ready files delivered to your portal. Approve, launch, iterate.`
- Step 1 has a link with href `https://₹` (broken placeholder link, a template/typo bug).

**Section: Use Cases** (anchor `#use-case`)
- H1 (yes, an H1 lower down the page): `Use Cases`
- Sub: `From brief to broadcast in minutes. Our AI engine handles the complexity so you can focus on the strategy.`
- Tabbed/variant showcase: 3 video cards (see assets) plus 2 small SVG icons (`6tTbkXggWgQCAJ4DO2QEdXXmgM.svg`, `11KSGbIZoRSg4pjdnUoif6MKHI.svg`, arrows/controls).

**Section: What you get**
- H2: `What you get?`
- Six benefit cells:
  1. `10x faster` / `Brief to video in 24–48 hours. No scheduling, no reshoots.`
  2. `80% lower cost` / `No creator fees, no travel. Pay for output, not overhead.`
  3. `Infinite variations` / `Test 10 hooks and 5 personas from a single brief.`
  4. `Scripts that convert` / `Written with direct-response principles creatives that sell, not just entertain.`
  5. `Format-ready` / `Delivered in 9:16, 1:1, and 16:9 ready to upload to Meta, YouTube, TikTok.`
  6. `Performance-tested` / `Labelled and structured for ad account testing workflows.`

**Section: Who's it for**
- H2: `Who's it for?`
- Three audience rows/cards (each with a stock photo):
  1. `D2C and E-commerce` / `Run 20 creative tests a week. Find your winner. Scale it without burning the budget on production.`
  2. `Performance marketing` / `Never run out of fresh creatives. Feed ad accounts with volume and variety every week.`
  3. `Agencies` / `Deliver high-volume UGC content to clients without building an in-house creator network.`

**Section: FAQs and CTA**
- Badge: `FAQs`
- H2: `We've Got the Answers You're Looking For`
- Sub: `Quick answers to your AI automation questions.` (template)
- Accordion (answers from JS props):
  1. Q `Do AI UGC videos convert?` A `Yes. Paired with our scripting, they consistently match or outperform human-creator videos in A/B tests.`
  2. Q `Can I choose the persona?` A `Yes. Pick age range, style, language, and tone. We match the avatar to your target audience.`
  3. Q `What formats are delivered?` A `9:16 for Stories and Reels, 1:1 for Feed, 16:9 for YouTube all in one delivery.`
  4. Q `How many variations do I get?` A `Bundles start at 5 and go up to 30+ variations, each testing different hooks, CTAs, or personas.`
- Closing H2: `Launch your first AI UGC video today`
- Sub: `Tell us your product and target audience. Script, avatar, edit, and delivery in 48 hours.`
- Buttons: `Get My UGC Videos Now` (-> `https://www.3mindsdigital.com/contact-us/`) and `Book a Free Call` (-> Calendly `https://calendly.com/3mindsdigital-info/introduction`)
- Footer: Framer badge line only.

Not present: pricing table (only "Bundles start at 5 ... 30+"), testimonials, logos, form fields (the "short form takes 5 minutes" is not on the page), named case studies.

## 2.2 Wireframe and persuasion purpose

| # | Section | Layout | Purpose |
|---|---|---|---|
| 1 | Nav | as page 1 | booking |
| 2 | Hero | Left/centre text: kicker, H2, body, two CTAs; right/behind: 3D stack of three vertical videos over a dark background with glow | Instant demonstration. Vertical Hindi-language testimonial videos for an Indian ayurveda brand say "this is what you get". Two CTAs: buy vs look |
| 3 | Problem | H2 + paragraph + 3 cards (one card has border highlight "Background+Border") | Pain agitation (slow, costly, unscalable creators) |
| 4 | How it works | 4 numbered steps on a vertical progress line that fills on scroll | De-risk: 24 hours, 5-minute brief, human review |
| 5 | Use cases | 3 vertical video cards in a tab/variant carousel with controls | Proof by example; format variety |
| 6 | What you get | 6-cell benefit grid | Quantified outcomes (10x, 80%) plus deliverables (formats, testing structure) |
| 7 | Who's it for | 3 rows with photos | Segment fit (D2C, performance, agencies) |
| 8 | FAQs | 4-item accordion | Conversion, control, formats, volume |
| 9 | CTA | Headline + sub + two buttons | Convert with a 48-hour promise |

Flow is: Promise -> Proof -> Pain -> Process -> Examples -> Benefits -> Audience -> Objections -> CTA (a classic PAS + process page, stronger than the photoshoot page).

## 2.3 Assets

Videos: `https://framerusercontent.com/assets/<id>.mp4`, played with `<video autoplay muted loop playsinline>` in the hero (border-radius 10px, object-fit cover) and `<video loop preload="none" muted playsinline>` in Use Cases (border-radius 20px). Downloaded sizes: 15.7 MB, 12.8 MB, 10.8 MB (heavy). Same three videos are reused in the hero and Use Cases and on the hub page. All three are for the client brand "Maharishi Ayurveda" (gold lotus logo watermark top-right of every clip), with Hindi/Hinglish burned-in captions (highlighted keyword in gold/yellow, white text on dark caption bar).

| Asset | Slot | Literal scene | Type |
|---|---|---|---|
| `KW3XeaqniBSXOmR0WTyQn6SkI34.mp4` (15.7 MB, 9:16) | Hero stack card + Use Case 1 | Woman in cream kurta sitting cross-legged in a warm terracotta living room, hands folded, looking straight to camera, on a textured cream paper frame with the Maharishi Ayurveda logo; caption "aur main bina" with "main" highlighted in gold | VIDEO-SLOT (AI testimonial talking head) |
| `jSbIhsQqPYX0lfMAA4bavyYsTE.mp4` (12.8 MB, 9:16) | Hero stack card + Use Case 2 | Extreme close-up of a smiling man's hand holding a bottle of "Maharishi Ayurveda GLUCOMAP Blood Sugar Management" (60 tablets, white and gold cap, purple label) in front of a blurred orange background; caption "mere doctor ne" with "doctor" in gold | VIDEO-SLOT (product-in-hand demo) |
| `8M1vjUmrzZynguALjbUyRVLt6A.mp4` (10.8 MB, approx 1:1 / 16:10 crop) | Hero stack card + Use Case 3 | Young woman with long dark hair in a green top speaking to camera, inset over a crowded bathroom sink filled with baby-care and skincare bottles, a faucet on the right; caption "aur pata nahi" | VIDEO-SLOT (voiceover creator with product pile b-roll) |

Images (Who's it for stock photos, JPG, very large originals):
| Asset | Literal scene | Placement |
|---|---|---|
| `gdqKe6Kv51dxK742XdHVR3igvJE.jpg` (6000x4000) | Close crop: person in olive quilted vest holding a tablet in one hand and a brown paper mailer in the other, warehouse-ish grey background | "D2C and E-commerce" row |
| `HhwONm9YDnhn7R2gnxu3Eajoco.jpg` (5184x3888) | Overhead of a table with "Marketing Strategy", "Marketing segmentation" and "Trends" papers, colourful bar and pie charts, hands pointing with a pencil | "Performance marketing" row |
| `geulNLJ0TuckcXFBbBSXg7w7y8U.jpg` (5802x3865) | Meeting room: woman at a whiteboard sketching, three colleagues at a wooden table with laptops, a large wall screen showing a website grid, felt acoustic panels | "Agencies" row |
| `6tTbkXggWgQCAJ4DO2QEdXXmgM.svg`, `11KSGbIZoRSg4pjdnUoif6MKHI.svg` | UI icons (carousel arrows/controls) | Use Case slider |
| `sweDMG1s6fNm728C5HUkt4Xv0D4.png` (129x128), `tALVKsKBzGBMwRlH4UgceTbAd8.png` (128x128) | Tiny icons/flags (template assets) | small UI |
(Stock images are shipped at 5000 to 6000 px originals; Framer resizes them via `?width=` query.)

### MMC briefs for each slot
- **Hero stack card 1 (VIDEO-SLOT, 9:16, 1080x1920)**: a woman in her 30s in a cream kurta sitting cross-legged on a rug in a warm-toned home, talking to camera, brand logo top-centre, captions bottom in two-tone (white with one gold keyword). Image-now version: a still of this frame with the caption pill "aur main bina" style burned in.
- **Hero stack card 2 (VIDEO-SLOT, 9:16)**: extreme close-up of a smiling man's hand holding a product bottle facing camera, blurred warm background, caption bottom "my doctor told me..." style. MMC image-now: a hand holding an MMC client's actual product (D2C), label readable.
- **Hero stack card 3 (VIDEO-SLOT, 1:1 or 4:5)**: woman speaking to camera in the lower-left as a round-cropped presenter, over a cluttered sink/shelf of the category's products, caption pill on the upper right.
- **Use Case cards (3, VIDEO-SLOT)**: reuse the three above, plus MMC-specific: (a) D2C skincare unboxing in a bathroom, (b) B2B SaaS founder-to-camera on a laptop call screen, (c) education: a parent in a living room saying why they enrolled their child at a school, with the school crest top-right.
- **Who's it for x3 (1:1 crops of 3:2 photos)**: (1) packer holding a tablet and a courier bag in a small D2C warehouse; (2) desk with printed performance-report charts and a hand pointing with a pencil; (3) 4-person agency meeting around a table with a whiteboard and a wall screen showing ad creatives.
- **Persona cast card (add, 3minds lacks it)**: a row of 6 AI avatars with age/language/tone labels (a literal grid of faces) to sell "Can I choose the persona?".

## 2.4 Animations and interactions

- Lenis smooth scroll (same bundle).
- **Hero "3D Stack Hero Graphic"**: three video cards in a perspective stack: `transformPerspective:1200`, `perspective:1200px`, `perspectiveOrigin:center center`, `rotateY/rotateX` driven by props, spring `{damping:30, stiffness:400, mass:1}` at opacity .8, entry `{opacity:.001, y:150, transformPerspective:1200}`; delayed reveal spring `{bounce:.2, delay:1.7, duration:1.2}`. Videos autoplay muted loop.
- **Background**: `blur(100px)` glow behind the stack.
- **Headline/body**: fade-up (`y:50` to 0, once, threshold 0.5).
- **Pain cards**: staggered fade-up (stagger config present in bundle, 10 hits) with one card highlighted by a border.
- **How it works**: vertical "progress line" component that fills as each numbered step scrolls into view (Framer "Benefit Fold" with scroll-linked progress); step numbers rendered as H3.
- **Use Cases**: horizontally arranged video cards with slider controls; videos use `preload="none"` and start playing on hover/active (no autoplay attributes). Cursor auto.
- **Ticker component** present in the JS bundle (6 mentions) with default demo items; not visibly used.
- **FAQ**: same accordion as page 1.
- **Buttons/nav**: text-roll hover, same as page 1.
- Not present: no counters, no marquee, no before/after slider.

## 2.5 Design tokens

Same system as page 1: near-black `#050505` page, surfaces `#131415/#1a1c1d/#222426/#33373a`, text `#fff`/`#ffffffe6`/`#ffffffbf`/`#9ba1a5`, accent purple `#814ac8`, lilac `#df7afe`, indigo `#5252fe`. Kicker in uppercase mono (Fragment Mono/Space Grotesk): `AI-POWERED PERFORMANCE`. Figtree headings, Inter body. Video cards 20px radius (hero cards 10px). Pain cards dark, one with a border to signal emphasis. Two CTAs: filled primary + outlined/ghost secondary.

## 2.6 SEO / AEO

- Framer `<title>`: `AI UGC Content Creation Services | AI Influencer Videos`
- Framer description: `Generate AI UGC videos, creator-style ads, testimonial videos, and social content for TikTok, Instagram, Meta ads, and ecommerce campaigns at scale.`
- Framer robots: **`noindex`** on this page (so the optimised page can never rank); canonical `https://ai-by-3minds.framer.website/ai-ugc`.
- Shell on 3mindsdigital.com: same generic "AI by 3minds" title and canonical to hub as page 1.
- Headings: no H1 in hero (headline is an H2), H1 is the lower "Use Cases"; H2: `Your Brand, Everywhere. No Creator Required.`, `UGC works. Getting it doesn't.`, `How It Works`, `What you get?`, `Who's it for?`, `We've Got the Answers You're Looking For`, `Launch your first AI UGC video today`; H3: steps 1 to 4 (numeral as H3 text).
- Keywords targeted (from title/meta): AI UGC, UGC content creation, AI influencer videos, creator-style ads, testimonial videos, TikTok, Instagram, Meta ads, ecommerce campaigns.
- Schema: none. FAQ collapsed, not marked up.
- Internal links: nav only; `See Examples` anchors to `#use-case`; hub card links to `./ai-ugc`. Broken step-1 link `https://₹`.
- CTA destinations: `/contact-us/` (x2) and Calendly; nothing to a form on the page.

## 2.7 Gaps and weaknesses MMC can beat

Content
- Strongest claim set (10x faster, 80% lower cost, "match or outperform human-creator videos in A/B tests") has zero proof: no metrics, no named client results, no A/B screenshots. The 3 demo videos are one brand (Maharishi Ayurveda), Hindi only; no English, no B2B, no education example, no multiple personas shown despite selling personas.
- No pricing beyond "Bundles start at 5 ... 30+"; no sample script, brief form preview, avatar gallery, voice samples, languages list, or turnaround table.
- Disclosure and trust issues left unaddressed: platform policies on AI avatars, consent/likeness rights, "AI-generated" labelling for ad platforms.
- Generic stock photos in "Who's it for" (unrelated to UGC), template FAQ subhead ("AI automation"), broken `https://₹` link, inconsistent numbers (24 hours in How it works, 24-48 in benefits, 48 in CTA).
- "See Examples" only jumps to 3 clips; no gallery of variants or hook-test matrix.

Design
- Heavy autoplay videos (10-16 MB each) load in hero; no poster images; no captions toggle; no visible sound control.
- The "Use Cases" title is an H1 far down the page; the section shows only 3 cards.
- No sticky CTA, no numbers strip, no logos.

Development
- iframe embedding as page 1; noindex; 5000-6000 px stock JPGs; videos duplicated across hero and use cases; no `alt`s; no poster/lazy strategy beyond preload none.

SEO/AEO
- Page is `noindex` and canonical to framer.website; the real domain shows a generic shell; no schema; no H1 in the hero; keyword coverage (AI UGC, UGC ads, AI avatar ads, testimonial videos) is in metadata only.
- MMC opportunity: native page, one H1 "AI UGC ads for D2C brands", FAQPage + Service + VideoObject schema, transcripts/captions for each demo video, hook-test matrix visual, vertical variants (D2C, education admissions, B2B SaaS), "AI UGC vs creator UGC" comparison table, cost-per-video table, and internal links to MMC's performance-marketing hub.

---

# 3. Cross-page build notes for MMC (images now, video later)

- Reuse the section skeleton: Hero (with 3D rotating/stacked media) -> pinned scroll gallery (photoshoot) or pain cards + progress-line steps (UGC) -> benefits grid -> audiences -> FAQ -> dual CTA.
- Keep all media slots as fixed-aspect containers with a `poster`/still now and swap for `<video autoplay muted loop playsinline preload="none">` later; keep the same border radius (10 to 20px) and a Lenis-like smooth-scroll.
- Recreate the "Base Image -> AI scenes" story literally: show an original phone photo tagged "Base Image" next to 12 generated scenes, and add a real before/after slider (3minds does not have one).
- Recreate 3D stack with CSS `perspective:1200px; transform: rotateY()/rotateX()` on three 9:16 cards and a spring (`stiffness 400, damping 30`) entrance; hero H1 word-by-word reveal (`y:50` to 0, opacity 0 to 1, once at 50% threshold).
- Copy structure and pitch, not text; write MMC copy for D2C / B2B / education, with segment cards for each.

# 4. What could not be accessed / limits

- No real-time rendering: scroll-triggered animation values (exact tile trajectories of the pinned grid, exact hover timings) are inferred from Framer component props and CSS, not from a browser recording; ffmpeg was unavailable so videos were only thumbnailed at frame 1 (scenes for later frames are unverified, video duration not measured).
- Framer FAQ answers were read from JS component props (reliable); exact mapping of stat-card icon glyphs on page 1 not identified (icons are SVGs in a component, not visible in SSR).
- The four hidden Framer pages' own metadata other than the two audited (e.g. video generation) were only skimmed.
- Third-party facts from WebSearch (parent agency description, client list) were not verified and not used as page content.

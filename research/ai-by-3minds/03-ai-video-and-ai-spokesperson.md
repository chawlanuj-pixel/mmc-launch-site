# AI by 3minds: AI Video Generation and AI Spokesperson Video (deep audit)

Audited 2026-09-28. Content is treated as copy to analyse; nothing fact-checked (per standing rule).

## 0. Critical architecture finding (read first)

- `https://www.3mindsdigital.com/AI-by-3minds/ai-video-generation` and `.../ai-spokesperson-video` are Next.js shells (Cloudflare Rocket Loader, GTM `GTM-MZGG5RND`, GA4 `G-MLVR7G6S0W`). The only visible content is one full-screen iframe:
  `<iframe src="https://ai-by-3minds.framer.website/<slug>" title="AI by 3minds" style="position:fixed;inset:0;width:100%;height:100%;border:none;z-index:9999">`
- The real pages are a separate **Framer** site (generator "Framer 0b0b0ac"): `https://ai-by-3minds.framer.website/ai-video-generation` and `/ai-spokesperson-video`. Sitemap of the Framer site lists: `/`, `/ai-photoshoot`, `/ai-video-generation`, `/ai-spokesperson-video`, `/ai-landing-page-builder`, `/ai-sales-agent`, `/contact`, plus blog posts. `/ai-ugc` exists but is `noindex`.
- Parent-shell head (what Google sees on 3mindsdigital.com): `<title>AI by 3minds</title>`, description "3minds Digital - Creative Digital Agency", canonical `https://www.3mindsdigital.com/AI-by-3minds` (the SECTION root, for both pages), og:title "3minds Digital", og:url `https://www.3mindsdigital.com`, og:image `https://www.3mindsdigital.com/opengraph-image.png?a2587d3fb9ed3564` (600x600). Framer has its own good title/description (section 6) but it sits inside the iframe on a different origin.
- The parent `sitemap.xml` contains NO `ai-by-3minds` URLs (grep returned none). robots.txt: `User-agent: * Allow: /`, sitemap `https://www.3mindsdigital.com/sitemap_index.xml`.
- Extra shell behaviour: a `.blob` div follows the mouse (custom cursor glow) via `mousemove` + `requestAnimationFrame` + `translate3d(calc(Xpx - 50%), calc(Ypx - 50%), 0)`, only when `(hover: hover)`. The iframe sits at z-index 9999 over it, so it is effectively hidden on these pages.
- Fonts on the shell: Next `next/font` variables (5 families). Framer pages use Figtree (Google) plus Inter, Space Grotesk, Fragment Mono in some components.
- Web search shows the SERP entries for these URLs are the Framer titles ("Ai By 3minds - Framer", "videos - Ai By 3minds - Framer") and the shell URL, i.e. indexing is muddled between two origins.
- The header/footer are separate iframes inside Framer: `https://3minds-legacy.vercel.app/footer/private/copy` (x3, footer copy). Footer content is not readable from the Framer HTML.

Method: raw HTML via curl (shell + Framer), Framer `.mjs` chunks downloaded to read CMS-less text props (FAQ answers live in component props, not SSR HTML), all 10 mp4s and 5 images downloaded and viewed (first frame/poster) for literal descriptions. WebFetch/WebSearch used for corroboration only.

---

# PAGE 1: AI Video Generation

Framer URL: `https://ai-by-3minds.framer.website/ai-video-generation`
Body: black. Section names in Framer: `Hero section`, `Who we are`, `Our Team` (x2), `FAQs and CTA`.

## 1.1 Verbatim copy in order

**Header (shared, sticky):** Logo (link `./`), nav links: "Services" (`./#services`), "Work" (`https://www.3mindsdigital.com/our-work/`), button "Get in touch" (`https://www.3mindsdigital.com/contact-us/`). Mobile/overlay menu: "Home" (`./`), "About" (`./ai-photoshoot`, sic, wrong target), "Blog" (`./`, sic), "Contact" (`./contact`), button "Book a call".

**S1 Hero**
- Badge/eyebrow pill: `AI Video Generation`
- H1: `Transform Ideas Into Impactful Videos at Scale`
- Sub: `From social ads to product explainers, we craft stunning, AI-powered videos that are fast, scalable, and tailored to your brand.`
- CTA button: `Book a free call` -> `https://calendly.com/3mindsdigital-info/introduction`
- Video carousel (Framer Slideshow, draggable), each slide has a glass pill button labelled `Pause` (aria toggle), plus Previous/Next arrow buttons (aria-label "Previous"/"Next", images alt "Back Arrow"/"Next Arrow"). 16 slides in DOM = 4 unique videos repeated x4 for loop.

**S2 Why choose ("Who we are")**
- Eyebrow: `Hidden Benefits`
- H2: `Why Choose AI Video Generation`
- 4 benefit cards (icon + title + description; DOM duplicates for two breakpoints):
  1. `Speed That Wins Markets` / `Go from brief to polished video in hours, not weeks.`
  2. `Studio-Grade Quality` / `HD visuals, sharp edits, and dynamic motion, minus the cameras and crew.`
  3. `Ready for Every Market` / `Localized, multilingual content that speaks directly to your audience.`
  4. `Smarter Costs, Bigger Scale` / `Cut up to 70% in production costs while scaling campaigns effortlessly.`
- H2: `The Edge of AI Video Creation`
- Body: `Modern brands don't have the luxury of slow production cycles. With our advanced AI video generation solutions, you can produce professional, conversion-focused content at the pace your campaigns demand. From breathing life into static visuals using an image-to-video AI approach, to creating ai-generated videos that feel indistinguishable from live shoots, we ensure your brand is always ahead, without burning time or budgets.`

**S3 Perfect for ("Our Team" reused as use-case grid)**
- Eyebrow: `Perfect For`
- H2: `Where It Fits`
- Intro: `D2C brands, marketplaces, agencies, and ecommerce teams looking to scale high-quality product visuals without the cost or complexity of traditional videoshoots.`
- Cards (each: looping muted video thumbnail + title + line):
  1. `D2C & Ecommerce Brands` / `Drive more sales with engaging product videos.`
  2. `Agencies` / `Deliver high-volume campaigns without hiring bigger teams.`
  3. `Startups` / `Test, iterate, and launch campaigns faster than competitors.`
  (DOM repeats cards 2 and 3 for breakpoint variants; visually 3 cards.)

**S4 FAQs**
- Eyebrow: `FAQs`
- H2: `We've Got the Answers You're Looking For`
- Sub: `Quick answers to your AI automation questions.`
- Q1 `Can AI really replace a professional shoot?` A: `Absolutely. Our videos are designed to look studio-grade while being faster, smarter, and more affordable.`
- Q2 `Can you turn images into videos?` A: `Yes. With our image-to-video AI solutions, we animate product photos into engaging visuals.`
- Q3 `How quickly can I expect delivery?` A: `Most projects are completed in 48–72 hours.`
- Q4 `Are the videos copyright-safe?` A: `Yes. All outputs are unique and rights belong entirely to your brand.`
- (Answers only exist in component props inside `jhfWJftv…mjs`; not in SSR HTML, so crawlers reading raw HTML do not see them. No FAQPage schema.)

**S5 Closing CTA**
- H2: `Bring Your Message to Life`
- Sub: `Book a call to turn your script into a compelling AI video.`
- Button: `Generate My First AI Video` -> `https://www.3mindsdigital.com/contact-us/`

**Footer:** iframe of `3minds-legacy.vercel.app/footer/private/copy`; plus Framer badge "Create a free website with Framer, the website builder loved by startups, designers and agencies." (free-plan badge; unbranded-cost signal).

**No pricing, packages, process steps, testimonials, logos, or form fields on the page.** Form lives on `/contact-us/` (not audited here) and Calendly.

## 1.2 Wireframe and persuasion purpose

| # | Section | Layout | Persuasion job |
|---|---|---|---|
| 0 | Sticky header | logo left, 2 links + purple "Get in touch" pill | Escape hatch, always-on conversion |
| 1 | Hero | centered badge, 64px H1, sub, purple CTA, then a wide draggable video slideshow | Proof-first: shows outputs (brand ads, animation, product renders) immediately under promise; low-friction "free call" CTA |
| 2 | Why Choose | eyebrow + H2, 4 gradient stat-style cards | Objection handling: speed, quality, multilingual, cost. "Up to 70%" is the anchor number |
| 3 | The Edge | H2 + one paragraph | SEO copy block (keywords "AI video generation", "image-to-video AI", "ai-generated videos") disguised as brand voice |
| 4 | Perfect For | intro + 3 video cards | Self-selection by segment; D2C listed first |
| 5 | FAQ | 4 accordions in glass cards | Kills 4 objections: replaces shoot? images in? how fast? rights? |
| 6 | CTA | H2, sub, button | Second conversion, action verb "Generate My First AI Video" |

## 1.3 Asset inventory (page 1)

All hosted on `framerusercontent.com`. Videos are mp4, `loop muted playsinline preload="none"`, `object-fit:cover`, radius 8px (cards) / 22px (hero slides).

| Slot | URL | Placement | Type | Literal scene (verified from first frame) |
|---|---|---|---|---|
| H-1 | `https://framerusercontent.com/assets/5RUMEmVyxmX6wCqO6fgx8zcbEY.mp4` (40 KB) | Hero slide 1 (and Agencies card? no) | VIDEO-SLOT | Dark navy square frame with a white, bold, geometric "3" logo mark with blue glow on top edge and magenta/orange glow on the lower curve. Animated logo sting. |
| H-2 | `https://framerusercontent.com/assets/1PE6mj8VKJuYQfYr0U0YrGHLE.mp4` (1.3 MB) | Hero slide 2 AND "D2C & Ecommerce Brands" card | VIDEO-SLOT | 3D isometric render of a cream and black modular L-shaped kitchen: gas hob, black sink, pull-out drawers open, tall pantry unit with lit shelves left, corner carousel basket units right, polished beige floor. Product/CGI showcase. |
| H-3 | `https://framerusercontent.com/assets/CrmyJXUFu81yAyCkNkyAtHOBVfk.mp4` (4.6 MB) | Hero slide 3 | VIDEO-SLOT | 3D-cartoon scene: small boy in teal polo pointing up at a red balloon, next to a tall grey cartoon elephant in round yellow glasses and yellow "P" T-shirt shading his eyes; a school building sign reading "PODAR" and trees behind, blue sky. Kids-brand mascot animation. |
| H-4 | `https://framerusercontent.com/assets/wINJuzHJEugkh8JbwcZAx07QSY.mp4` (1.4 MB) | Hero slide 4 AND "Agencies" card | VIDEO-SLOT | Vertical 9:16 ad: red "Anchor" logo tab top-left; a giant white molar tooth on a blue-grey surface being scrubbed by tiny blue-uniformed workers in hard hats on ladders with oversized red toothbrushes; foam pile at base; Anchor toothpaste tube bottom right. Miniature-worker product ad. |
| C-3 | `https://framerusercontent.com/assets/ViRbiGxTzWxrts8neoipVf02No.mp4` (914 KB) | "Startups" card | VIDEO-SLOT | 3D cartoon monkey mascot with red cap marked "W", blue-and-white jacket, red gloves, white-red sneakers, mid-jump with arms out on a flat royal-blue background. |
| Icons | `.../images/VCivQexHseFnsK3qKo6pNOAPrk.svg` (back arrow), `.../images/Ro9jV4dja1QXSw6BC2DzMIAHKY.svg` (next arrow) | Slideshow arrows | image (UI) | Arrow icons. |
| OG | `https://www.3mindsdigital.com/opengraph-image.png?a2587d3fb9ed3564` | Shell og:image | image | 600x600 generic site OG (not page-specific). |

Slot order in hero slideshow: H-1 (logo), H-2 (kitchen), H-3 (elephant), H-4 (tooth), repeated x4.

### MMC image briefs and later-video notes (page 1)

Rule (from memory): literal scenes, one per text block, D2C lead but not D2C-only. Use 16:9 for hero slides, 9:16 for the ad slot, 4:5 for cards.

- **Hero slide A (replaces logo sting):** literal: MMC wordmark on a dark navy 1:1 frame with soft blue/magenta rim light on the letterforms. Video later: 2-second light-sweep logo reveal.
- **Hero slide B (kitchen render):** literal: 3D isometric render of a D2C home-goods product in use, e.g. a modular kitchen or a full-size wardrobe with drawers open, warm light. Video later: camera orbit with drawers sliding open.
- **Hero slide C (mascot):** literal: 3D-cartoon brand mascot (e.g. an owl in a school blazer) pointing at a balloon outside a school gate. This doubles as the **education** proof. Video later: mascot walks, points, blinks, balloon floats up.
- **Hero slide D (vertical ad):** literal: D2C FMCG product (toothpaste/skincare tube) hero on a blue-grey surface with miniature workers in hard hats using oversized brushes/tools on a giant product. Video later: 6-8 s vertical ad, workers move, foam builds.
- **Hero slide E (B2B, MMC addition):** literal: a SaaS-style dashboard on a laptop screen with a presenter's hand pointing, in an office. Video later: screen-record animation of a product explainer.
- **Card "D2C & Ecommerce Brands":** literal: a founder at a table packing a box next to a laptop with an open product page. Video later: image-to-video of the same scene, product lifted from box.
- **Card "Agencies" (MMC: "Agencies & B2B teams"):** literal: 3 people at a whiteboard/monitor reviewing a grid of ad creatives. Video later: creatives cycle on the monitor.
- **Card "Startups" (MMC: "Education & institutions"):** literal: an admissions team member at a desk in front of a campus poster wall. Video later: campus tour reel.
- Icon arrows: MMC draws its own SVGs in brand style.

## 1.4 Animations and interactions (page 1)

Evidence is in SSR inline styles and Framer chunks (`framer.CUSQbnd9.mjs`, `motion.hCe_Yo-A.mjs`, `lenis.IVqLnAjT.mjs`, `SmoothScroll_Prod.DxM6Wdb4.mjs`, `Video.B8QeMh80.mjs`).

1. **Word-by-word blur-in headline (H1 and hero sub):** every word is `<span style="display:inline-block;opacity:0.001;filter:blur(10px);transform:translateY(10px)...">`. Staggered per word to `opacity:1; blur(0); translateY(0)`. Framer "Text Effect / appear" preset. Replicate: split words, CSS `@keyframes` with `animation-delay: i*60ms`, `filter:blur(10px)->0`, `translateY(10px)->0`, ~600ms ease-out.
2. **Badge fade-in:** `data-framer-appear-id`, `opacity:0.001`. Fade-up on load.
3. **Scroll-in section reveal:** containers start `will-change:transform;opacity:0;transform:translateY(150px)` (stat cards), `translateY(60px)` and `translateY(50px)` (other blocks); config `__framer__animateOnce:!0`, `__framer__threshold:.5`, `__framer__styleAppearEffectEnabled`. Play once at 50% visibility. Replicate with IntersectionObserver threshold 0.5, translateY 50-150px to 0, opacity 0 to 1, once.
4. **Smooth scrolling:** Lenis (`lenis.IVqLnAjT.mjs`, `SmoothScroll_Prod`) inertial scroll.
5. **Hero slideshow:** Framer Slideshow component: flex `ul` with `gap:24px`, `transform-style:preserve-3d`, parent `perspective:1200px`, `cursor:grab`, `touch-action:pan-y`, draggable, prev/next arrow buttons, looping via cloned slides (4 videos x4). Each slide has a "Video Play/Pause" pill: `backdrop-filter:blur(25px); background:rgba(255,255,255,.07); border-radius:1000px` with icon + `Pause` label. Slides autoplay muted; button toggles play state.
6. **Card videos:** `preload="none"`, muted loop; in Framer these usually play on hover/in-view (card component is a link `Team card` with hover variant). Exact hover variant not visible in SSR. Treat as: video plays on hover, poster/first frame otherwise.
7. **FAQ accordion:** Framer component with `Closed` / `Open` variants, `data-highlight`, tap toggles; 20px outer radius container, 6px inner card, icon holder rotates (chevron/plus).
8. **Radial-gradient benefit cards:** `background: radial-gradient(128% 134% at 61.4% 77.9%, rgba(13,13,13,.8) 38.47%, rgb(82,82,254) 100%)`, radius 8px. Static gradient, blue glow bottom-right of each card.
9. **FAQ/CTA "BG" blur blob:** `filter: blur(50px)` element behind FAQ cards (ambient glow).
10. **Responsive:** `ssr-variant` classes hide/show desktop/tablet/phone variants (breakpoints 810 and 1200).

## 1.5 Design tokens (page 1)

- Background `#000` (token `--token-aae92d1e…`), text white `#fff`, body copy `rgba(255,255,255,.75)`.
- Card fill `rgba(13,13,13,.8)` (`#0d0d0dcc`), border `1px #222`, FAQ card fill `rgba(255,255,255,.05)`, hairline `rgba(255,255,255,.1)`.
- Accents: primary CTA purple `#814ac8` (rgb 129,74,200) with layered soft box-shadow stack (6 shadows) and 1px white/10% border, radius 6px; blue `#5252fe` (rgb 82,82,254) used in card gradients; link blue `#0099ff` (rgb 0,153,255); secondary text grey `#9ba1a5`; pink `#df7afe`; deep red `#450316` (icon fill ref).
- Type: **Figtree**. H1 64px / weight 600 (bold 900) / letter-spacing -2.2px / line-height 1.1 / centered (tablet and phone step down). H2 (`waKAohxm2`) 50px, Figtree Variable, `wght 550`, letter-spacing -0.04em, line-height 1.1, left aligned. Body (`csUbUKGQ_` / `Qjp1AZZMc`) 16px, weight 500, letter-spacing -0.02em, line-height 1.4em.
- Badge: 1px `#222` border, `rgba(13,13,13,.8)` fill, 6px radius.
- Radii: cards 8px, buttons/FAQ 6px, video slides 22px, pause pill 1000px, FAQ wrapper 20px.
- Dark, high-contrast, glassy; one purple CTA colour.

## 1.6 SEO / AEO (page 1)

- Framer `<title>`: `AI Video Generation Agency | AI Ads, Reels & Marketing Videos`
- Meta description: `Create AI-generated marketing videos, social media ads, product explainers, and branded reels with cinematic quality. Fast AI video production for startups and enterprises.`
- og:title = title, og:description = description, og:type website, og:url `https://ai-by-3minds.framer.website/ai-video-generation`, twitter:card summary_large_image; `robots: max-image-preview:large`; canonical points to the framer.website URL (NOT the 3mindsdigital.com URL) so the branded-domain page canonicalises to `.../AI-by-3minds` and Google may treat the Framer subdomain as the canonical for this content.
- No JSON-LD (0 matches) on any of the pages. No FAQPage, Service, Organization, VideoObject schema.
- Headings: H1 once; H2s: "Why Choose AI Video Generation", "The Edge of AI Video Creation", "Where It Fits", "We've Got the Answers You're Looking For", "Bring Your Message to Life". Eyebrows are `<p>` not headings. Benefit and card titles are `<p>`, not H3.
- Keywords targeted: AI video generation (agency), AI ads, reels, marketing videos, AI-generated marketing videos, social media ads, product explainers, branded reels, image-to-video AI, ai-generated videos, multilingual/localized video, startups and enterprises.
- Internal links: essentially none in body. Header "Services" goes to `./#services` (Framer root), "Work" to 3mindsdigital.com/our-work/, Contact to 3mindsdigital.com/contact-us/. No cross-links between the AI services pages in body.
- CTA destinations: Calendly `https://calendly.com/3mindsdigital-info/introduction` (hero) and `https://www.3mindsdigital.com/contact-us/` (closing).
- Videos have no captions/transcripts/alt; hero videos not marked up; `preload="none"`.

## 1.7 Gaps MMC can beat (page 1)

- **Architecture:** iframe of a third-party subdomain = duplicated/diluted SEO, generic shell title, no schema on the host domain. MMC: native page on own domain, unique title/description/canonical, add Service + FAQPage + VideoObject JSON-LD, put FAQ answers in server HTML.
- **Content:** no process, pricing/packages, turnaround per format, sample deliverables list, tools, or brand-safety detail; no proof (logos, results, testimonials), no comparison "AI vs shoot" table; only 4 FAQs; use cases limited to D2C/agency/startup (no B2B/education). MMC: add "How it works", format list (ads, reels, explainers, product, UGC), deliverables and turnaround, education and B2B use cases, 8-10 FAQs with schema.
- **Design/dev:** Framer template look; nav mislinks ("About" -> photoshoot, "Blog" -> home); 70% claim with no substantiation shown; hero slides are unrelated brands with no captions; no audio option; page depends on iframe (no deep links, scroll-jank, no analytics inheritance).
- **Conversion:** two CTAs only, no form on page, no lead magnet or sample request, no WhatsApp option for India.
- **Accessibility:** slideshow controls lack labels for slides; text at 75% white on black is fine but `#9ba1a5` small text borderline.

---

# PAGE 2: AI Spokesperson Video

Framer URL: `https://ai-by-3minds.framer.website/ai-spokesperson-video`
Sections: `Hero section`, `Who we are`, `Our Team`, `FAQs and CTA`.

## 2.1 Verbatim copy in order

**Header:** same as page 1 (Services / Work / Get in touch; menu Home / About / Blog / Contact / Book a call).

**S1 Hero**
- Badge: `AI Spokesperson Video`
- H1: `Your Brand, Now Speaks` (word-by-word blur reveal like page 1)
- Sub: `Bring your message to life with realistic, on-brand AI spokesperson videos, no shoots, scripts, or delays.`
- CTA: `Book a free call` -> `https://calendly.com/3mindsdigital-info/introduction`
- Video strip (5 talking-head clips, each present twice in DOM for loop/marquee).

**S2 "Who we are"**
- H2: `AI That Speaks for You`
- Body: `Say more with less effort. Our AI-powered Spokesperson videos turn your script into lifelike, talking head content, no cameras, actors, or studios needed. It's a faster, smarter way to produce high quality videos that feel personal, polished, and always on-brand.`
- H2: `How it works?`
- 3 steps (tab/step components in state "off"):
  1. `Provide us with your image and script to get started.`
  2. `We curate the perfect avatar, voice, tone, and language for your brand.`
  3. `Our team creates high quality spokesperson videos for instant use.`
  (Step numerals/icons not extractable from SSR; icons: an Upload icon from Phosphor set is bundled.)

**S3 "See the Magic" (before/after)**
- H2: `See the Magic`
- Sub: `From lengthy shoots to instant videos, see how AI transforms the process.`
- Card `Before`: `You upload a static image and a simple text prompt. No cameras. No crew. No production delays.`
- Card `After`: `You get a fully curated, human-like AI video, complete with voice, expression, and professional polish.`

**S4 Why choose**
- Eyebrow: `Hidden Benefits`
- H2: `Why Choose AI Spokesperson Videos`
- Cards:
  1. `Faster Turnaround` / `From brief to final video in hours, not weeks.`
  2. `On-Brand Messaging` / `Custom avatars that reflect your tone, look, and voice.`
  3. `Cost Effective Scale` / `Eliminate the need for live shoots, studios, or crews.`
  4. `Multiple Use Cases` / `Use across landing pages, email, ads, onboarding, and more.`

**S5 Perfect for**
- Eyebrow: `Perfect For`
- H2: `Where It Fits`
- Sub: `Create lifelike spokesperson videos using AI, cutting the need for studios, actors, or editing time.`
- Card 1 `D2C & Ecommerce Brands` / `Launch product explainers, announcements, or seasonal promos, faster and more affordably than traditional video shoots.`
- Card 2 `Marketing Teams` / `Create campaign videos with brand-approved spokespeople in minutes, no need for multiple versions or reshoots.`
- Card 3 `Agencies & Creators` / `Pitch or deliver client ready video content at scale, without post production or complicated setups.`

**S6 FAQs**
- Eyebrow `FAQs`, H2 `We've Got the Answers You're Looking For`, sub `Quick answers to your AI automation questions.`
- Q1 `How realistic are AI spokesperson videos?` A: `Very. Our avatars have natural speech, gestures, and tone that mimic real human presenters.`
- Q2 `Do I need to write a full script?` A: `Nope! You can provide a message or brief, and the AI can generate a script for you.`
- Q3 `Can I customize the spokesperson look and voice?` A: `Yes, you can choose from pre set avatars or create custom ones that align with your brand.`
- Q4 `Is it suitable for internal training or only marketing?` A: `Both! It works for explainer videos, internal updates, onboarding, and customer support.`

**S7 CTA**
- H2: `AI Videos That Speak Your Brand` (line break after "That")
- Sub: `Share your script, and we'll do the rest.`
- Button: `Generate My First AI Spokesperson Video` -> `https://www.3mindsdigital.com/contact-us/`

Footer iframe as page 1. No pricing, no form fields, no languages list, no testimonials.

## 2.2 Wireframe and persuasion purpose

| # | Section | Layout | Job |
|---|---|---|---|
| 1 | Hero | badge, H1, sub, CTA, strip of talking-head clips | Instantly proves "realistic human on camera" |
| 2 | AI That Speaks for You + How it works | paragraph then 3 numbered steps | Demystify, reduce effort fear ("we do it") |
| 3 | See the Magic | two large cards Before (static image) vs After (video) | The demo: single photo becomes a speaking person |
| 4 | Why Choose | 4 gradient cards | Speed, brand control, cost, versatility |
| 5 | Perfect For | 3 tall portrait image cards with overlay text | Segmenting: D2C, marketing teams, agencies |
| 6 | FAQ | 4 accordions | Realism, scripting, customisation, internal use |
| 7 | CTA | H2 + button | Convert |

## 2.3 Asset inventory (page 2)

| Slot | URL | Placement | Type | Literal scene |
|---|---|---|---|---|
| SP-1 | `https://framerusercontent.com/assets/OQlS8jAG3iyrbaKVAUJ2UCtg.mp4` (3.2 MB) | Hero clip 1 and "After" card | VIDEO-SLOT | Young woman with long dark hair, magenta kurta, smiling and gesturing with both open palms, seated on grey sofa in a bright living room, lamp and potted palm behind, beige curtains. |
| SP-2 | `https://framerusercontent.com/assets/o28Piionu2pisfeFcLgWOItVxOs.mp4` (609 KB) | Hero clip 2 | VIDEO-SLOT | Bearded man in navy blazer and light shirt wearing a call-centre headset, wristwatch, gesturing with both hands at a white desk, dark panelled wall and window behind. |
| SP-3 | `https://framerusercontent.com/assets/XdVwkyx2Nf6QpeRq4LyX0xue2s.mp4` (741 KB) | Hero clip 3 | VIDEO-SLOT | Curly-haired man with moustache in black blazer and white open-collar shirt, hands raised mid-explanation, at a wooden desk in an office with bookshelves, plants and a desk lamp. |
| SP-4 | `https://framerusercontent.com/assets/vpFDECF1qfkgCql0ESfqRjUni6I.mp4` (403 KB) | Hero clip 4 | VIDEO-SLOT | Man in white striped kurta, hands clasped, sitting still on the same grey sofa living room as SP-1 (neutral/listening pose). |
| SP-5 | `https://framerusercontent.com/assets/iCpRd6AvSjsgajJBqVM3BNr3c.mp4` (492 KB) | Hero clip 5 | VIDEO-SLOT | Young man in black suit, mouth open mid-speech, hands folded on a glass-walled meeting table, laptop, white mug, chart printout in a bright corporate office. |
| BEFORE | `https://framerusercontent.com/assets/TNUJ1Q9toDpEVxl4jrqsBeiBZA0.webp` (poster `…/images/TNUJ1Q9toDpEVxl4jrqsBeiBZA0.webp?scale-down-to=1024`) | "Before" card | IMAGE (declared in `<video>` src, webp still) | Young woman, straight dark hair, light-blue denim shirt over white tee, gentle smile, seated on a brown channel-tufted sofa in front of brown and cream patterned curtains. Static portrait, square-ish crop. |
| AFTER-poster | `https://framerusercontent.com/images/YG45MMfaehSb3TdVnuFU9pZsM.webp` | "After" card poster (video = SP-1) | IMAGE + VIDEO-SLOT | Poster for the animated talking clip. |
| PF-1 | `https://framerusercontent.com/images/3mMPpeV6XkNzaUkeHOxR7Qjb6U.jpg?width=4283&height=3426` | Perfect-for card 1 (D2C) | IMAGE | Woman with glasses in denim jacket smiling, holding a bank card and typing on a laptop, next to a bearded man in tan shirt opening a cardboard parcel with a plaid garment, at a white round table, blue curtains and plant behind. |
| PF-2 | `https://framerusercontent.com/images/May8JIw6p5WwwwvbBA47Am0Ns.jpg?width=3328&height=4864` | Card 2 (Marketing Teams), portrait | IMAGE | Dim, moody office: a woman and a grey-haired man in front of a big wall screen filled with blue bar charts and donut charts, two seated colleagues in armchairs in the foreground, plants, pendant lamps, glass windows. |
| PF-3 | `https://framerusercontent.com/images/XrBG60HI8uTL9jC0KL28ZHwyY.jpg?width=3542&height=5313` | Card 3 (Agencies & Creators), portrait | IMAGE | Curly-haired woman in mustard shirt waving/greeting, at a desk with a condenser microphone and a phone on a tripod, blue wall with plant shadows, plant on shelf. Content-creator setup. |
| Chrome | 8+ inline SVG icons (benefit cards), arrows | | image (UI) | Benefit icons (Phosphor). |

Note: PF cards are `video card` / `Perfect for images` component variants with `poster` set and `src` empty, i.e. images now, video-ready. This maps exactly onto MMC's "images now, videos later".

### MMC image briefs and later-video notes (page 2)

Use Indian-context presenters (matches 3minds). Brief pattern: literal, 16:9 head-and-shoulders unless stated.

- **Hero clip 1 (D2C):** literal: woman in a bright magenta or teal kurta, seated on a grey sofa in a sunlit living room, smiling, both palms open, lamp and palm plant behind. Video later: same image driven to speak the MMC script (lip-sync, gestures, blink).
- **Hero clip 2 (B2B):** literal: man in navy blazer with a headset at a white desk, dark wall behind, hand gesture mid-sentence. Video later: talking presenter for a B2B sales explainer.
- **Hero clip 3 (SaaS/D2C founder):** literal: curly-haired founder in black blazer at a wooden desk with shelves and plants explaining with both hands.
- **Hero clip 4 (education):** literal: male principal/counsellor in white kurta seated with hands clasped in a school office with a school crest behind. Video later: "admissions message" avatar.
- **Hero clip 5 (corporate):** literal: young executive in black suit at a glass meeting room table with laptop, mug and a printed chart.
- **Before card:** literal: single passport-style portrait of a smiling woman in a denim shirt on a sofa, framed with a small "Photo + script" chip. Static image stays.
- **After card:** same woman, still first frame with play button and a "waveform + subtitles" overlay. Video later: the same person speaking with voice.
- **Perfect-for D2C:** literal: two people at a white table, one on a laptop with a bank card, the other unboxing a parcel with a garment. (MMC alt: founder holding a product beside a laptop showing a Shopify store.)
- **Perfect-for Marketing Teams:** literal: two people presenting a wall screen of ad-performance charts to two seated colleagues in a moody office. (For MMC: screen shows a ROAS/CAC dashboard.)
- **Perfect-for Agencies and Creators:** literal: creator at a desk with condenser mic and phone on a tripod, waving hello to camera. (MMC could add an education variant: teacher recording a lecture intro.)
- Video later notes: hero clips play muted loop as portrait heads; cards on hover; "After" card plays on click with sound toggle; show a subtitle track for autoplay-muted legibility.

## 2.4 Animations and interactions (page 2)

Same Framer stack as page 1 (Lenis smooth scroll, Framer Motion appear effects).
1. Word-by-word blur/translate reveal on H1 and hero sub (identical `filter:blur(10px)`, `translateY(10px)`, opacity .001 to 1).
2. Hero video strip: 5 clips each rendered twice (10 `<video>` nodes), the doubling pattern of a Framer **Ticker/marquee** (seamless loop) rather than the Slideshow used on page 1; no Pause buttons or arrows found in HTML for this page (unlike page 1). Treat as auto-scrolling horizontal marquee; speed unknown.
3. "How it works" 3-step component with state `off` (three `<a data-framer-name="off">`): step items toggle to an "on" variant, most likely scroll-linked or hover-driven highlighting one step at a time. Exact trigger not derivable from SSR (component JS in `8uWVWTbe…mjs`). Replicate: sticky list, activate step by IntersectionObserver or timed cycle with an accent bar and glow.
4. Before/After cards: two `Default` link components with `<video>` (Before uses a `.webp` src with poster; After uses mp4 + poster). Duplicated in DOM for breakpoints. Likely hover-to-play.
5. Section scroll-reveals `translateY` 50/60/150px, `animateOnce`, threshold .5.
6. Perfect-for cards: image with dark **Overlay** and **Color** layers (`Image Wrap`, `Overlay`, `Text + Button`) so title and copy sit on a gradient over the photo; `video card` variants swap poster for video on hover.
7. FAQ accordion with same `Closed`/`Open` variants and background blur blob.
8. Cursor: none (iframe hides shell blob).

## 2.5 Design tokens (page 2)

Same system as page 1 (black bg, white text, `rgba(255,255,255,.75)` body, Figtree, 64px H1, 50px H2, purple `#814ac8` button, blue `#5252fe` gradient cards, `#222` borders, radii 6/8/20). Extra: image cards use full-bleed photos with dark bottom overlay and white text; "Big/Small/Tablet/Desktop" responsive variants of the cards grid ("Team members grid", "cards", "Wrapper").

## 2.6 SEO / AEO (page 2)

- Framer `<title>`: `AI Spokesperson Video Creation | AI Avatar Video Services`
- Meta description: `Create realistic AI spokesperson videos and AI avatars for ads, product demos, onboarding, training, and social media marketing in multiple languages.`
- robots `max-image-preview:large`; canonical `https://ai-by-3minds.framer.website/ai-spokesperson-video`. No JSON-LD.
- Shell (3mindsdigital.com) head is identical to page 1's: title `AI by 3minds`, description "3minds Digital - Creative Digital Agency", canonical `/AI-by-3minds`.
- Headings: H1 "Your Brand, Now Speaks" (brand-only, no keyword; keyword lives in the eyebrow `<p>` and title); H2s: "AI That Speaks for You", "How it works?", "See the Magic", "Why Choose AI Spokesperson Videos", "Where It Fits", "We've Got the Answers You're Looking For", "AI Videos That Speak Your Brand".
- Keywords targeted (title/meta): AI spokesperson video, AI avatar video services, AI avatars, ads, product demos, onboarding, training, social media, multiple languages. The meta promises "multiple languages", but the body never lists languages or shows a multilingual example (mismatch).
- Internal links: none in body beyond header; CTAs to Calendly and `/contact-us/`.
- Question-style FAQ and "How it works" are good AEO fodder but answers are hidden in component props.

## 2.7 Gaps MMC can beat (page 2)

- H1 has no target keyword and is vague; MMC should use "AI Spokesperson Videos" in H1 or an immediate keyword subhead.
- No language list, voice samples, avatar library, consent/likeness policy, disclosure guidance, or rights statement for custom avatars; no pricing/turnaround; no sample-per-vertical.
- Meta promises multi-language but on-page proof absent: MMC can show Hindi/English/regional (Tamil, Bengali, Marathi) side-by-side clips with subtitles.
- "Before" is a static portrait and "After" a video: no true scripted demo with visible script text; MMC can show script on left, waveform and result on right.
- Missing education and B2B segment cards; MMC can add "Schools and colleges: admission and parent-update videos", "B2B: sales enablement and onboarding".
- Hero has no audio/sound toggle; no captions; no schema (FAQPage, VideoObject, HowTo for the 3 steps); no internal links to sibling AI pages.
- Stock-photo feel in Perfect-For cards; MMC's own art-directed literal scenes beat this.

---

# 3. Shared reference for the MMC "AI by MMC" section build

- **Component set to replicate:** sticky header + purple pill; eyebrow badge; blur-in H1; 16:9 rounded hero video strip (page 1 slideshow with Pause pills; page 2 marquee); 4 gradient benefit cards; "Perfect for" 3-card grid (video card with poster now); FAQ accordion x4; closing CTA. Framer scripts to emulate: Lenis, Framer-Motion-style `appear` (translateY 50-150px, once, threshold .5), word-split blur reveal.
- **Image-now-video-later strategy that 3minds itself uses:** `<video poster="…" preload="none" muted loop playsinline>` with `src` empty until video exists (page 2 Perfect-for cards). MMC should ship every slot as `<video poster=IMG data-src=MP4>`; swap `src` when videos land, no layout change. Aspect ratios: hero 16:9, vertical ad 9:16, portrait cards ~ 2:3, before/after ~ 1:1.
- **Sibling pages in the same section (not audited here):** `/ai-photoshoot`, `/ai-landing-page-builder`, `/ai-sales-agent`, `/ai-ugc` (noindex), `/contact`, blog posts.

## Could not access / limitations

- FAQ answers, step numerals/icons and exact hover/marquee timings are in Framer runtime component code; answers recovered from chunks, but exact animation speeds, easing curves and hover variants for cards, steps and the marquee were inferred, not observed live (no browser rendering available).
- Header/footer iframe content (`3minds-legacy.vercel.app/footer/private/copy`) not captured.
- Videos: no ffmpeg; only first frames were viewed via macOS QuickLook, so motion content beyond frame 1 is unknown. Audio presence in spokesperson clips not checked.
- `/contact-us/` form fields (the destination of both closing CTAs) were out of scope and not fetched.
- The raw Framer sitemap output was truncated in terminal; page list above is from the visible part.

# 3minds "AI by 3minds" hub + the site-wide AI button: audit

Scraped 2026-09-28. Raw HTML, CSS, JS chunks, video and images were fetched directly (curl) and read. Claims and numbers below are recorded as content to analyse. Nothing is fact-checked.

## 0. Headline findings (read this first)

1. **The hub is not a native 3minds page.** `https://www.3mindsdigital.com/AI-by-3minds/` is a Next.js page whose entire body is one full-screen iframe of a separate Framer site:
   `<iframe src="https://ai-by-3minds.framer.website/" title="AI by 3minds" style="position:fixed;inset:0;width:100%;height:100%;border:none;z-index:9999">`
   All real content, SEO and design live at `https://ai-by-3minds.framer.website/`. The 3minds wrapper only supplies a thin `<title>AI by 3minds</title>`, a generic description and a canonical.
2. **There is no free-floating AI button.** The "revolving AI button" is a pill in the fixed top navigation bar (desktop, width >= 1024px), present on every page that uses the nav (verified on `/`, `/aboutus`, `/our-work`, `/contact-us`). It sits as the last item of the centre link row. It is a black pill labelled "AI by 3minds" with an animated iridescent ring (looping video) visible as a 2px border around it. It is not a rotating text ring, orbit or pulse. It is a looping video used as an animated border.
3. On mobile (<1024px) the pill is hidden. The AI entry appears only inside the hamburger menu as a text accordion row "AI by 3Minds".
4. AI is also promoted inside the "Services" mega menu as a dedicated card "AI & Automation" with CTA "Discover AI".

## 1. Hub page: full verbatim copy, in order

Source: SSR HTML of `https://ai-by-3minds.framer.website/` (Framer), text extracted in DOM order. Nothing on the page is in H1; H2/H3 as marked.

### 1.0 Framer top nav (page-level, separate from the 3minds nav)
Links: `Services` (./#services) | `Work` (https://www.3mindsdigital.com/our-work/) | `Get in touch` (https://www.3mindsdigital.com/contact-us/)
Mobile expanded menu: `Home` (./) | `About` (./ai-photoshoot, looks like a mis-link) | `Blog` (./) | `Contact` (./contact)
Nav button: `Book a call` (label duplicated for the hover text-swap "1st state / 2nd state").

### 1.1 Hero
- Eyebrow / badge: `Grow with Ai`
- Sub-paragraph: `From custom-built assistants to growth-ready automations, 3minds helps founders unlock AI's potential - starting today.`
- H2 (this is the hero headline; the page has no H1): `Smart teams don't wait. They automate.`
- CTA 1 (button, links to https://www.3mindsdigital.com/contact-us/): `Get in touch`
- CTA 2 (button, links to https://calendly.com/3mindsdigital-info/introduction): `Request Free Demo`
- Social proof line: `We've tested 500+ AI tools so you don't have to.`
- Logo marquee of AI tools (images only, no alt text; see section 4): OpenAI/ChatGPT, Make, Bolt (b mark), Photoshop, Midjourney, an isometric cube mark (Sora-adjacent/ChatGPT-style mark, unlabelled), Veo 3, Sora, an unlabelled multicolour diamond mark, HubSpot, Runway, Adobe Firefly, n8n, Kling AI, Gemini, Lovable, Kling AI (again), Synthesia.
- Hero background layers (from data-framer-name): `BG`, `Particles holder`, `Void` (a dark particle/void backdrop).

### 1.2 Services section (id="services")
- Section badge (text not present in SSR; appears to be a pill "Services")
- Headline text: `From hours to minutes -thanks to AI`
- H2 / subhead: `Our AI handles the repeat stuff so your team can stay lean and focus on what matters.`
- Section CTA: `Explore our AI service stack`
- Six cards (alternating layout, each with H3, paragraph, CTA link, and a media tile):

1. H3: `AI Photoshoots` (the H3 has a leading invisible U+2060 word-joiner character)
   Body: `Say goodbye to expensive shoots, slow edits, and limited angles. We deliver high-quality, brand-ready photos in minutes - no cameras, no crew, and up to 80% lower cost than traditional setups.`
   CTA: `Get studio-quality shots now` -> `./ai-photoshoot`
   Media: video `YjK9uE8bCcUWDN4Dwq38DwPUnZk.mp4` (before/after handbag shoot).
2. H3: `AI Video Generation`
   Body: `Create studio-quality videos in a fraction of the time - no cameras, actors, or post-production teams required. From reels to product explainers, we help you generate videos in minutes.`
   CTA: `Create on-brand videos instantly` -> `./ai-video-generation`
   Media: video `Dj7pQwJYKewBagG7XisRzuWo7Gs.mp4` (dark cinematic clip).
3. H3: `AI Sales Agent`
   Body: `Automate your outreach and scale your pipeline - without hiring more sales reps. Our AI Sales Agent creates and runs personalised, multi-touch outreach campaigns across email, LinkedIn, and WhatsApp. It engages leads, nurtures conversations, and books meetings - all while your team focuses on closing deals, not chasing them.`
   CTA: `Deploy my AI seller` -> `./ai-sales-agent`
   Media: image `27psZsoeNCXIePPOylpVeT5u0.png` (workflow diagram).
4. H3: `AI UGC Videos ` (trailing space)
   Body: `AI-powered UGC videos help brands turn winning scripts into endless content variations without chasing creators, shoot schedules, or production teams. From product demos to testimonials, you launch more experiments in less time, so every campaign learns, iterates, and scales faster.`
   CTA: `Get your UGC Videos` -> `./ai-ugc`
   Media: two videos `jSbIhsQqPYX0lfMAA4bavyYsTE.mp4` and `KW3XeaqniBSXOmR0WTyQn6SkI34.mp4`.
5. H3: `AI Landing Page Builder`
   Body: `Turn traffic into action with landing pages that adapt, personalize, and convert - built using AI that understands your brand and your audience.`
   CTA: `Build my landing page` -> `./ai-landing-page-builder`
   Media: image `tDrEiNI29fS8xunfm1OHxxcKe8.png` (AI website-builder UI collage).
6. H3: `AI Spokesperson Videos ` (trailing space)
   Body: `Whether you're starting from scratch or enhancing an existing system, we offer strategic consulting and develop custom AI projects aligned with your unique goals.` (note: copy-paste generic consulting text, not spokesperson-specific)
   CTA: `Book your AI face` -> `./ai-spokesperson-video`
   Media: video `2aw1ULsZIYkKh2UwgG7VLo.mp4` (AI presenter).

### 1.3 Case Studies
- Badge: `Case Studies`
- H2: `Real clients. Real wins. Powered by AI.`
- Content: a looping horizontal marquee/carousel of 5 visual tiles (duplicated for the loop), with no visible text in SSR:
  image `FdUgKmyxVx3iWibZruswgaTcZ1M.png`, image `pPfXITEfgKO3mxtjnbnkHYcIxOY.png` (used twice), video `wINJuzHJEugkh8JbwcZAx07QSY.mp4`, image `Ib2pf03zpyKrL48wWpOQcIBd8E.png`, video `mxQOph03citerFiPD4sRPcmGyQ.mp4`. Order in DOM: FdUgK, pPfXI, pPfXI, wINJu (video), Ib2pf, mxQOp (video), then the sequence repeats.
- Visible in the tile art: TriGen Wealth ("Building beyond what's imagined. THE JOURNEY STARTS TODAY."), Wonderla ("Animated Mascot Design"), Nesterra ("Ganesha's blessings with the beauty of Nesterra's fabric"), Anchor toothpaste miniature-workers video, an app onboarding phone UI video ("Experienced faculty"). No client names are given as text.

### 1.4 Testimonials
- Badge: `Testimonials`
- H2: `Don't just take our word for it`
- Sub: `Here's how teams are scaling faster, saving more, and working smarter with AI by 3minds`
- Two testimonial cards (each duplicated for a marquee):
  1. `"The AI assistant they built for us handles 70% of our repetitive tasks. It's like adding a new team member without the overhead."` - `Suman Sharma`, `CEO at TechFlow Solutions` (avatar `IyTJEMLNYgaaDz73JYLgf7PYtY.webp`, a smiling man in a dark blazer and blue shirt in an office chair)
  2. `"We launched 3 landing pages, 5 reels, and a full LinkedIn campaign in 6 days - something that used to take our team 3 weeks. Unreal."` - `Priya Mehta`, `Operations Manager at NexaCorp` (avatar `prJVkx4ybEf6YSyZs9EZDABPto.jpg`, a young woman, stock-photo style)
  (Both names/companies look like placeholders. Recorded as content only.)

### 1.5 Benefits (id="benefits")
- Badge: `Benefits`
- H2: `Why Businesses Choose AI by 3minds`
- Sub: `From scaling operations to elevating customer experience - our AI solutions help you move faster, spend smarter, and focus on what matters most.`
- Six benefit tiles (title + line):
  1. `Boosted productivity` - `Automate repetitive tasks so your team can focus on strategy, creativity, and growth.`
  2. `Reduced operational costs` - `Replace manual workflows with efficient AI agents - saving up to 70% on overhead and execution.`
  3. `24/7 Availability` - `Run your business on autopilot - AI agents work non-stop, with zero downtime.`
  4. `Save money!` - `Cut overhead by automating execution-heavy tasks - no need to hire additional resources for scale.`
  5. `Smarter decisions` - `AI helps you act faster with accurate insights, pattern detection, and real-time analysis for day-to-day decisions.`
  6. `Built to scale` - `Easily scale content, campaigns, and operations without burning out your team or stretching your budget.`

### 1.6 Closing CTA
- H2: `Get Ahead.Stay Ahead. With Us` (sic, no space after the first full stop; likely a line-break in the design)
- Button (x2, hover text swap): `Let's Talk` -> https://www.3mindsdigital.com/contact-us/

### 1.7 Footer
- No footer links, no address, no FAQ, no legal. Only the Framer badge: `Create a free website with Framer, the website builder loved by startups, designers and agencies.` (https://www.framer.com)
- There is no FAQ section on the hub.

### 1.8 Sub-pages (linked from hub cards; covered by other research files)
`/ai-photoshoot`, `/ai-video-generation`, `/ai-sales-agent`, `/ai-ugc`, `/ai-landing-page-builder`, `/ai-spokesperson-video`, `/contact`, plus 4 blog posts:
- `/blog/how-ai-is-transforming-workflow-automation-for-businesses`
- `/blog/5-must-have-ai-tools-to-streamline-your-business`
- `/blog/ai-vs-manual-work-which-one-saves-more-time-money`
- `/blog/the-future-of-ai-automation-how-it-s-changing-business-operations`
On the 3minds domain these are reached as `https://www.3mindsdigital.com/AI-by-3minds/<slug>` (same iframe pattern).

## 2. Structure / wireframe and narrative arc

Order: [Nav] -> Hero -> AI-tools logo marquee -> Services (6 alternating cards) -> Case studies marquee -> Testimonials marquee -> Benefits grid (6) -> Closing CTA -> (Framer badge). Dark theme throughout.

| # | Section | Layout | Job in the pitch |
|---|---|---|---|
| 0 | Nav | Logo left, 3 links, "Book a call" pill right; hamburger on mobile | Keep conversion (call booking) always visible |
| 1 | Hero: badge "Grow with Ai", H2 "Smart teams don't wait. They automate.", sub for founders, two CTAs | Centred text over dark particle/void background | Urgency and identity ("smart teams"); ICP is "founders"; two-tier CTA: low-friction (get in touch) and demo (calendly) |
| 2 | "We've tested 500+ AI tools so you don't have to." + logo strip of ~18 AI tool logos | Infinite horizontal marquee | Borrowed authority: agency as curator/filter of the AI landscape; removes the buyer's tool-choice anxiety |
| 3 | "From hours to minutes -thanks to AI" + 6 service cards | 2-col cards alternating text/media, media = looping video or image | The offer: six productised services, each with a benefit-verb CTA ("Get...", "Create...", "Deploy my...", "Book your AI face"). Outcome-framed ("no cameras, no crew"), cost/time comparison against traditional |
| 4 | Case Studies: "Real clients. Real wins. Powered by AI." | Image/video tile marquee | Proof by output, not by words; shows range: finance, theme parks, textile/festive, FMCG, app UI |
| 5 | Testimonials | Two quote cards in a marquee | Social proof with quantified outcomes (70% of tasks, 3 weeks to 6 days) |
| 6 | Benefits: "Why Businesses Choose AI by 3minds" | 6 tiles (3x2) | Rational justification for the buying committee: productivity, cost, 24/7, smarter decisions, scale |
| 7 | Closing CTA "Get Ahead. Stay Ahead. With Us" + `Let's Talk` | Full-width band | Last conversion push |

Narrative arc: Fear of falling behind -> "we already filtered 500+ tools" -> six concrete services that replace shoots/crews/reps -> proof -> rational benefits -> talk to us. Every service card follows: pain (expensive/slow) -> "no X, no Y" -> speed/cost claim -> first-person or outcome CTA.

Motion cues in DOM: sections and headers have `will-change:transform;opacity:0;transform:translateY(50px)` (scroll-reveal fade-up), text buttons have two states (hover text swap "1st state/2nd state"), marquees loop, particles in hero, Lenis smooth scroll.

## 3. The AI button (nav pill): code, assets, behaviour

### 3.1 Where and when
- Component: the `NavbarHomepage`-style header (`header.nav--homepage`, `position:fixed; top:0; left:0; right:0`), file chunk `https://www.3mindsdigital.com/_next/static/chunks/6643-d37cfd3b504c28d9.js`. CSS in `https://www.3mindsdigital.com/_next/static/css/18d39caa477c0df7.css`.
- Appears on every page using this header. Verified present in HTML on `/`, `/aboutus`, `/our-work`, `/contact-us`.
- Position: last `<li>` in `ul.nav-homepage-links` (centred in the bar via `left:calc(50% - 1px); top:calc(50% - .5px); transform:translate(-50%,-50%); gap:20px`), after "About Us | Services | Our Work | Our Team", separated by thin divider lines.
- Links to: `/AI-by-3minds/` (server HTML has `href="/AI-by-3minds"`, canonicalised to trailing slash in JS).
- Desktop only: `.nav-homepage-links{display:none}` by default, `display:flex` at `min-width:1024px`. Below 1024px the pill does not render.

### 3.2 Markup (as served)
```html
<li><a class="nav-homepage-ai" href="/AI-by-3minds">
  <video class="nav-homepage-ai__spin" loop="" muted="" playsInline="" preload="none" aria-hidden="true"></video>
  <span class="nav-homepage-ai__inner">AI by 3minds</span>
</a></li>
```
React source:
```js
(0,a.jsx)("li",{children:(0,a.jsxs)(o.default,{href:"/AI-by-3minds/",className:"nav-homepage-ai",children:[
  (0,a.jsx)("video",{className:"nav-homepage-ai__spin",ref:p,loop:!0,muted:!0,playsInline:!0,preload:"none","aria-hidden":"true"}),
  (0,a.jsx)("span",{className:"nav-homepage-ai__inner",children:"AI by 3minds"})]})})
```

### 3.3 CSS (verbatim)
```css
.nav--homepage .nav-homepage-ai{position:relative;display:inline-flex;align-items:center;justify-content:center;box-sizing:border-box;width:134px;height:35px;padding:2px;border-radius:90px;overflow:hidden;text-decoration:none;flex-shrink:0;isolation:isolate;-webkit-mask-image:-webkit-radial-gradient(#fff,#000);background:#0000;transform:translateZ(0);backface-visibility:hidden;transition:height .3s ease}
.nav--homepage .nav-homepage-ai__spin{position:absolute;left:0;top:0;width:100%;height:100%;object-fit:cover;object-position:center;transform:scale(1.2);z-index:0;pointer-events:none}
.nav--homepage .nav-homepage-ai__inner{position:relative;z-index:1;display:flex;align-items:center;justify-content:center;width:100%;height:100%;border-radius:90px;font-family:var(--font-dm-sans),"DM Sans",sans-serif;font-size:14px;font-weight:600;letter-spacing:.28px;line-height:normal;white-space:nowrap;background:#000;color:#fff;transition:opacity .2s ease,background-color .3s ease,color .3s ease}
.nav--homepage .nav-homepage-ai:hover .nav-homepage-ai__inner{opacity:.85}
.nav--homepage .nav-homepage-overlay .nav-homepage-ai__inner{background:#000;color:#fff}
.nav--homepage .nav-homepage-scrolled-theme .nav-homepage-ai__inner{background:#f4f4f4;color:#1a1a1a}
```
Header: `.nav--homepage{position:fixed;top:0;left:0;right:0;background:#000;display:flex;justify-content:center;overflow:visible;transition:background-color .3s ease,border-color .3s ease}`. Scrolled state: `.nav-homepage-bar.nav-homepage-scrolled-theme{height:70px;background:#fff;border-bottom:none}`. Scrolled links colour `#1a1a1a`, dividers `#0000001f`, "Start A Project" CTA `#1a1a1a` bg/`#fff` text (default state: `#fff` bg, `#1a1a1a` text, 185x44, radius 4px).

### 3.4 JS (verbatim, lazy video load + scroll theme)
```js
// scroll theme swap: scrolled = window.scrollY > 760 (home only; other pages always "scrolled" theme)
let i=()=>{w(window.scrollY>760)}; window.addEventListener("scroll",i,{passive:!0})
// video is loaded lazily on idle so it never blocks first paint
let e=()=>{let e=p.current; e&&(e.src="https://pub-92e6c519d94e4cfaa06f90db8f64c6a9.r2.dev/navbar/Global.mp4", e.play().catch(()=>{}))},
    i=window.requestIdleCallback;
if(i){ let n=i(e,{timeout:3e3}); ... } else { let n=window.setTimeout(e,2e3); ... }
```
Also the `<head>` has `<link rel="preconnect" href="https://pub-92e6c519d94e4cfaa06f90db8f64c6a9.r2.dev" crossorigin="anonymous"/>` for the video host.

### 3.5 Animation type: exactly what it is
- Not CSS rotation, not SVG text on a path, not a pulse. It is a 16 second looping `<video>` (muted, playsInline, loop, autoplay via JS `play()`) that sits behind a black rounded label. The label (`__inner`) is inset by 2px (the `padding:2px` on the anchor), so only a 2px sliver of the video shows as a shimmering, colour-shifting ring border around the pill. The video is scaled 1.2x and cropped (`object-fit:cover; transform:scale(1.2)`) so the ring's iridescent edge sweeps around the pill.
- Video asset: `https://pub-92e6c519d94e4cfaa06f90db8f64c6a9.r2.dev/navbar/Global.mp4`, 245,227 bytes, 240x300 px, 16.0s, H.264, `Cache-Control: public, max-age=31536000, immutable`, last modified 2026-07-29.
- Literal scene: a black background with a large glassy, iridescent ring/bubble (a lens-like torus with blue, gold, orange and rainbow chromatic edges, a thin bright crescent at the bottom of the inner hole, and a bright highlight at the top). It looks like a chromatic-aberration soap-bubble ring slowly rotating.
- Effect for MMC replication: recreate as an animated conic-gradient border (CSS `@property --a` + `conic-gradient(from var(--a), ...)` rotating) as the image-now fallback, or drop in an equivalent looping video later.
- Hover: inner label opacity drops to `.85` (0.2s ease). No scale/glow. Click: normal navigation to `/AI-by-3minds/`. `aria-hidden="true"` on the video; the link text carries the accessible name.
- Colours: pill fill `#000` with white text on the dark hero state; `#f4f4f4` fill with `#1a1a1a` text on the scrolled (white bar) state. Font DM Sans 14px/600, letter-spacing 0.28px. Size 134x35 px, radius 90px. The ring colours come from the video, not CSS.

### 3.6 Mobile behaviour
Pill hidden below 1024px. In the hamburger overlay (`#hamburgerMenu`, opens `.ham-show` panel) the AI entry is the last accordion row: `<a href="/AI-by-3minds/" class="linkColor font-semibold text-base">AI by 3Minds</a>`. Menu list in JS: Services (with children), Our Work, Our Team, Blogs, Contact Us, then `{id:8,pageName:"AI by 3Minds",pageLink:"/AI-by-3minds/"}`. No animation on mobile.

### 3.7 Second AI entry point: Services mega menu card
Data (JS): `{image:"/AI by 3minds svg.svg",alt:"AI Logo",headline:"AI & Automation",cta_text:"Discover AI",cta_url:"/AI-by-3minds/",color:"#15282F",items:[{title:"AI Photoshoots",link:"/AI-by-3minds/ai-photoshoot"},{title:"AI Video Generation",link:"/AI-by-3minds/ai-video-generation"},{title:"AI Sales Agent",link:"/AI-by-3minds/ai-sales-agent"},{title:"AI UGC Videos",link:"/AI-by-3minds/ai-ugc"},{title:"AI Landing Page Builder",link:"/AI-by-3minds/ai-landing-page-builder"},{title:"AI Spokesperson Videos",link:"/AI-by-3minds/ai-spokesperson-video"}]}`
Left rail of the mega menu ("Our Services") lists the pillar cards (edge, pulse, node, and "ai"), each 103px tall row, with the AI row showing the logo `/AI by 3minds svg.svg` (68x30) + `AI & Automation` + `partner`. Its hover bg is the card colour `#15282F` at 30% opacity; the CTA button is coloured with the same colour. Also linked from the homepage body (a home-page service tile `href="https://www.3mindsdigital.com/AI-by-3minds/"`).
Cursor: site also has a `.blob` custom cursor follower (rAF `translate3d` on mousemove, hover-capable devices only).

## 4. Design system

### 4.1 Hub (Framer) colours
Dark theme. Tokens found: background `#000`, panels `#050505`, `#0d0d0dcc` (badge glass), `#131415`, `#1a1c1d`, `#222`, `#222426`, borders `#222` (1px), text `#fff`, `#ffffffe6`, `#ffffffbf`, `#e6e6e6`, `#e6e6e699`, `#ccc`, muted `#9ba1a5`, accent purples `#814ac8` and `#df7afe`, blues `#5252fe` (`rgb(82,82,254)`), `#2060df`, `#09f`. Gradient accents in purple/pink/blue.
Radii used: 4px, 8px, 18px, 20px, 30px, 1000px/50000px (pills). Buttons are pill-shaped with 1px `#222` borders.
Typography: Figtree (Variable) for the body/headings, Satoshi and Inter also loaded, Space Grotesk placeholder. Font sizes present: 12, 14, 15, 16, 18, 23, 24, 28, 35, 40, 50px.
Motion: Framer Motion (`motion.*.mjs`), Lenis smooth scroll (`lenis.*.mjs`, `SmoothScroll_Prod`), scroll-reveal `translateY(50px)`+opacity, two-state hover text swap on buttons, marquees for logos/case studies/testimonials, `Particles` hero background, `Video` component for lazy looping muted videos. No GSAP/Lottie.

### 4.2 3minds wrapper/nav (Next.js, Tailwind)
Nav font DM Sans; dark hero bar `#000`, scrolled bar `#fff`, ink `#1a1a1a`, soft grey `#f4f4f4`, 3minds mega-menu ink `#202020` / `#585858`, AI card colour `#15282F`; AI tool site body bg `bg-body`. Google Tag Manager `GTM-MZGG5RND`, GA4 `G-MLVR7G6S0W`, Cloudflare Rocket Loader.

### 4.3 Image assets on the hub (all `https://framerusercontent.com/images/<id>`)
| Id | Where | Literal scene |
|---|---|---|
| tALVKsKBzGBMwRlH4UgceTbAd8.png | nav logo (dark) | Navy "Ai" lettermark, italic slab-style |
| sweDMG1s6fNm728C5HUkt4Xv0D4.png | nav logo (light) | White "Ai" lettermark |
| EcMixhcSxRwKPpQESk7BeDSbs.webp | logo strip | White OpenAI/ChatGPT knot logo |
| EO4Zc5TEnLJI1QJmxYp4IFnrKGw.webp | logo strip | Make.com purple three-bar logo |
| OwnWnd7Yyi7kc3zti4swd5yoHHw.webp | logo strip | White italic "b" (Bolt) |
| H385H8MzcdxOp3kMpDt7tZmbw.webp | logo strip | Photoshop "Ps" tile |
| 0WkMFmrDfpz5Bc37xxMMJAcdXq4.webp | logo strip | Midjourney white sailboat outline |
| mnUldM2TNvd3NFC3AwculGdfVU.webp | logo strip | Grey isometric cube mark |
| wb50tlNWrnB1m9XYv8Yb1TjD4.png | logo strip | Google "G" + "Veo 3" |
| ialwxwcMiMRHk2LJKcYnnSXPoU.png | logo strip | Sora cloud mascot + "Sora" |
| UbUz3iJzStV2FI34DdvcEotSU8.png | logo strip | Multicolour gem/diamond mark |
| 3xzhL83ppzox6QuaNXXS1umMTY.webp | logo strip | "HubSpot" wordmark, orange sprocket |
| SUQKLUdqPCjfmEdek3xOSoYqkwY.webp | logo strip | "runway" wordmark |
| f1CqDNcqt2KbikosixD4fU7BXA.webp | logo strip | "Adobe Firefly" wordmark, red Adobe |
| dmBegYyHogP7D0HptDLBJqbyFfA.webp | logo strip | "n8n" node-graph wordmark |
| sLmMtzAsnOVXJoL67lvvE2q5c.webp | logo strip | "KLING AI" wordmark |
| 8WDqGpKQTKXbaM50P4juNyDy950.webp | logo strip | "Gemini" star + wordmark |
| tgnyQiAbTAy54UlusJrcINcS4.webp | logo strip | "Lovable" heart + wordmark |
| KOHywKlEX427a2gH7lbQK4D0U.webp | logo strip | "KLING AI" wordmark (duplicate) |
| UGy6HdImM2dAtTnJKgCJ2f2Qs.webp | logo strip | "synthesia" wordmark |
| 27psZsoeNCXIePPOylpVeT5u0.png | AI Sales Agent card | Dark diagram: "New lead" and "Addify lead" (Slack) -> megaphone "Qualify lead" -> "Add to CRM" (Sheets) and "Send email" (Gmail) |
| tDrEiNI29fS8xunfm1OHxxcKe8.png | AI Landing Page Builder card | Collage of AI website-builder UI screens (Framer-style "Generate Homepage with AI", "Design better sites with AI", "Powerful AI tools") |
| FdUgKmyxVx3iWibZruswgaTcZ1M.png | Case study tile | TriGen Wealth ad: snowy mountain peak at sunrise with wave lines, "Building beyond what's imagined. THE JOURNEY STARTS TODAY." |
| pPfXITEfgKO3mxtjnbnkHYcIxOY.png | Case study tile | Wonderla ad: 3D monkey mascot in red cap and blue jacket, "Animated Mascot Design", blue sky with clouds |
| Ib2pf03zpyKrL48wWpOQcIBd8E.png | Case study tile | Nesterra festive post: gold Ganesha trunk sculpture on green, "Ganesha's blessings with the beauty of Nesterra's fabric", hibiscus |
| IyTJEMLNYgaaDz73JYLgf7PYtY.webp | Testimonial avatar | Smiling man in dark blazer and blue shirt, beige office chair |
| prJVkx4ybEf6YSyZs9EZDABPto.jpg | Testimonial avatar | Young woman, shoulder-length dark hair, teal blurred background |

### 4.4 Video assets (`https://framerusercontent.com/assets/<id>`; use images now, swap video later)
| Id | Size | Where | Literal scene |
|---|---|---|---|
| YjK9uE8bCcUWDN4Dwq38DwPUnZk.mp4 | 2.7 MB | AI Photoshoots card | Before/after triptych: round red tiger-embossed leather handbag on a bare branch/sky, on a woman's shoulder in beige knit, held in desert arch (a "After" label chip) |
| Dj7pQwJYKewBagG7XisRzuWo7Gs.mp4 | 18.4 MB | AI Video Generation card | Very dark cinematic clip: silhouette of a shirtless man stepping over a low object in near-black light (first frame nearly black) |
| jSbIhsQqPYX0lfMAA4bavyYsTE.mp4 | 12.8 MB | AI UGC card | Vertical UGC ad: smiling man holding Maharishi Ayurveda "Glucomap" jar, caption "mere doctor ne" |
| KW3XeaqniBSXOmR0WTyQn6SkI34.mp4 | 15.7 MB | AI UGC card | Vertical ad: woman in cream kurta seated, Maharishi Ayurveda logo, caption "aur main bina" |
| 2aw1ULsZIYkKh2UwgG7VLo.mp4 | 2.6 MB | AI Spokesperson card | Bearded man in black suit, tie, clasped hands at a desk, bookshelf and desk lamp behind (AI presenter) |
| wINJuzHJEugkh8JbwcZAx07QSY.mp4 | 1.4 MB | Case study tile | Anchor toothpaste ad: tiny workers on ladders brushing a giant white tooth with red toothbrushes, foam |
| mxQOph03citerFiPD4sRPcmGyQ.mp4 | 0.26 MB | Case study tile | Blue background phone mock-up: dark app onboarding screen "Experienced faculty" with a gradient teacher icon and "CONTINUE" button |
| navbar/Global.mp4 (r2.dev host, see 3.5) | 0.25 MB | Nav AI pill | Iridescent glass ring on black |

### 4.5 Fonts
Framer hub: Figtree Variable (main), Satoshi, Inter (woff2 files under `https://framerusercontent.com/assets/*.woff2`, e.g. `0E7IMbDzcGABpBwwqNEt60wU0w.woff2` etc.). 3minds site: DM Sans via Next font variables (`/_next/static/media/*.woff2`).

## 5. SEO / AEO

### 5.1 Wrapper (what Google sees on 3minds)
- URL: `https://www.3mindsdigital.com/AI-by-3minds/` (canonical `https://www.3mindsdigital.com/AI-by-3minds`, no trailing slash, while nav links use the trailing slash).
- `<title>`: `AI by 3minds`
- Meta description: `3minds Digital - Creative Digital Agency` (generic, shared with the whole site)
- OG/Twitter: title `3minds Digital`, description `3minds Digital - Creative Digital Agency`, og:url `https://www.3mindsdigital.com` (points at home, not this page), og:image `https://www.3mindsdigital.com/opengraph-image.png?a2587d3fb9ed3564` 600x600, `twitter:card summary_large_image`.
- No H1/H2/H3 in the wrapper HTML. Body is only the iframe. No schema. No indexable text. The wrapper is `class="pt-28 bg-body overflow-x-hidden"` with a `.blob` cursor div.
- Wrapper is essentially a thin-content page; the SEO value sits on the framer.website domain.
- Home page for comparison: `<title>Website & UI UX Design Agency | Marketing Agency in Mumbai`, description begins `3minds is a digital marketing agency that has powered digital growth for brands like Jockey, Dabur, Tata & Titan with UI/UX, SEO & more. Mumbai-based. Call 22-62604852...`; no JSON-LD found in the served HTML. Sitemap index `https://www.3mindsdigital.com/sitemap_index.xml` (post, page, category, post_tag, author sitemaps); `/AI-by-3minds` was not found in these sitemaps. robots.txt: `User-agent: *  Allow: /`.

### 5.2 Framer site (the real hub)
- URL: `https://ai-by-3minds.framer.website/` (canonical is itself)
- `<title>`: `AI Automation Agency India | AI by 3Minds`
- Meta description: `AI by 3Minds helps brands automate content, ecommerce, sales, design, and marketing with AI-powered solutions including AI videos, AI ecommerce, AI sales agents, and generative workflows.`
- OG title = title, og:description = description, og:type website, twitter:card summary_large_image, robots `max-image-preview:large`. No og:image set. No JSON-LD.
- Headings: H1 none. H2: "Smart teams don't wait. They automate." / "Our AI handles the repeat stuff so your team can stay lean and focus on what matters." / "Real clients. Real wins. Powered by AI." / "Don't just take our word for it" / "Why Businesses Choose AI by 3minds" / "Get Ahead.Stay Ahead. With Us". H3: the six service names.
- Sitemap: `https://ai-by-3minds.framer.website/sitemap.xml` lists home, 5 service pages (+ ai-ugc is not listed there, only in nav), `/contact`, 4 blog posts. Search index JSON: `https://framerusercontent.com/sites/1Gx3NKHivRzBUJzgzJ0AkP/searchIndex-dn8rz5G3PTfF.json`.
- Internal links: hub -> 5-6 service pages via card CTAs; -> 3minds `/contact-us/`, `/our-work/`; -> calendly booking. No inbound descriptive anchors beyond the nav pill and mega menu (`AI by 3minds`, `AI & Automation`, `Discover AI`).
- URL structure: hub `/AI-by-3minds/`, services one level below (`/AI-by-3minds/ai-photoshoot` etc.), blog `/blog/<slug>` on the Framer domain.
- Weaknesses to exploit for MMC (analysis, not fact-check): hub content is duplicated across two domains, iframe content is not attributed to the 3minds URL, no H1, no schema, no FAQ, no og:image, title targets "AI Automation Agency India". MMC can build a native page with H1, FAQ + Service/FAQPage schema, and internal links from every page.

## 6. Replication brief for MMC (concise)
- Button: fixed-header pill (or a true floating bottom-right pill as MMC prefers), label "AI by MMC", black fill, 2px iridescent animated border, DM Sans-style 14/600, 134x35, radius 90px, hover opacity .85, link to the AI section. On mobile show it in the menu (3minds hides it), or keep it floating. Colour swap on scroll (`#000/#fff` to `#f4f4f4/#1a1a1a`).
- Animation image-now approach: CSS rotating conic-gradient ring behind the label with a 2px inset; swap to a 16s looping iridescent-ring video later.
- Page: hero (badge, "Smart teams..." style H1, two CTAs) -> tool-logo marquee -> six productised AI services with verb-led CTAs -> case tiles -> testimonials -> six benefits -> closing CTA. Give MMC visuals literal scenes per block (see 4.3/4.4 for the parallel).

## 7. Could not access / caveats
- No true floating (scroll-independent bottom-corner) AI button exists on 3minds; the nearest thing is the nav pill. Not JS-rendered-tested in a real browser (no headless browser available); behaviour was derived from HTML, CSS and the JS chunk source.
- Case study tile card titles, text on the Framer hero badge/section badges and the hover states of Framer buttons are rendered client-side in Framer and are not fully present in SSR HTML; the badge texts "Case Studies", "Testimonials", "Benefits" are present, but the "Services" badge text was not captured.
- The Framer hub's per-section exact font-size/spacing per breakpoint was not extracted (only the font sizes/radii/colour tokens set).
- Framer `.mjs` component bundles were listed but not deconstructed line by line.

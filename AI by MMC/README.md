# AI by MMC (standalone build)

A hub (`index.html`, to become `ai.html` on the live site) and six service pages, plus the floating AI button and nav pill.
Kept outside `MMC Site/` on purpose. Nothing here touches the live site until we merge it.

## Run
Double-click `index.html` (or `start.command` for a local server). `python3 build.py` regenerates every page from the copy in build.py.
The motion needs internet for GSAP, ScrollTrigger and Lenis (jsDelivr). Without it the pages fall back to the static layout.
See `ANIMATION-AUDIT.md` for the reference-vs-build comparison.

## Images (now) and video (later)
- All 146 slots are filled with Higgsfield images (gpt_image_2_5, medium quality). A slot without a file still shows its brief. The list is `assets/img/IMAGE-LIST.txt`.
- Review before publishing: lp-scrub-2 shows a fee in pounds; swap for rupees. Tool and integration names are placeholders. People are AI-generated, so label them as the platforms require.
- Slots tagged "Video later" carry `data-video=""`. Put a file path in it and the slot plays the video, with the image as poster,
  muted and looping, paused off-screen, skipped for reduced motion and data saver.

## The button
- `assets/ai-motion.js` is the scroll and hero motion; `assets/ai.js` injects the floating button (rotating ring, rotating "AI by MMC" text, services panel, drift along the right edge as you scroll).
  It lives outside any React root, so prerender will not bake it. Escape and outside click close it. Reduced motion stops all of it.
- The nav pill (`.pill`) is a CSS conic-gradient ring stand-in for 3minds' looping ring video.

## Merge checklist (later)
1. Copy pages to `MMC Site/` as `ai.html`, `ai-photoshoot.html`, etc. (flat root files; prerender only scans the root). Rename `index.html` to `ai.html` and fix the hub links.
2. Replace the stand-in header and footer with the site's `Nav.jsx`, `Footer.jsx`, `Menu.jsx` and `CookieBanner.jsx`, and load fonts from `design-system/fonts`.
3. Load `assets/ai.js` after `assets/mmc-forms.js` on every page except admin, preloader-demo and home-v1. Move the button up while `.cookie` is showing, hide it under the menu (z 70) and modals, keep the 84px the mobile sticky CTA leaves free.
4. Point the "Book a call" buttons at `window.mmcBookCall("ai-...")`.
5. Register each page in `content/seo.json`, `sitemap.xml` and `llms.txt`; the JSON-LD is already inline in each page.
6. Add the six pages to `Menu.jsx` and `Footer.jsx`, then run `build.sh`.
7. Decide the "five systems" copy question before publishing.

## Copy rules kept
No invented results, prices, counts or awards. No em dashes (build.py asserts it). Tools and integrations lists are placeholders to confirm.

## Products and the sample clip
- Product imagery uses two original example brands, DEWLEAF (pink watermelon serum, skincare) and VELVETTE (black and rose-gold foundation, makeup), styled like premium D2C beauty packaging. No real brand names or logos are used.
- The UGC page carries one sample clip, `assets/video/ugc-sample.mp4` (5 seconds, silent, plays on loop from the same first and last frame). It is about 6.7 MB, so compress before launch.
- The small slot labels are hidden for visitors. Slots meant for future video still carry `data-video`.

## Real motion added (this round)
- UGC and Spokesperson pages each have a "One script. One [creator/presenter]. One clip." phone-frame section with a real looping sample clip (`assets/video/ugc-sample.mp4`, `spokes-sample.mp4`), plus an animated waveform background behind it (`data-mgfx="wave"`, canvas, in `assets/ai-motion.js`).
- Their "Look and feel" reel strips now play 4 real looping clips each (`ugc-reel-1..4.mp4`, `spokes-reel-1..4.mp4`), doubled for the seamless marquee; reel 5 and 6 stay as stills. Background also carries a soft drifting-blob canvas (`data-mgfx="blobs"`).
- The AI Video Generation page's drag slideshow plays 3 real looping clips (`video-show-1..3.mp4`); the 4th slide (sneaker/paper-city) stays a still.
- All clips are silent, muted+loop+playsinline, generated with Higgsfield Kling 3.0 from the existing still as both start and end frame so the loop is clean. `assets/video/` is 39 MB total — compress before launch (ffmpeg isn't available in this environment).
- Ambient background motion (`data-mgfx`) is scoped to the UGC and Spokesperson pages only, per the brief.

## Tool logos
- The hub's "A few of the tools we work with" strip uses real vendor marks (`assets/tools/`), sourced the same way as `MMC Site/assets/platforms/`. See `assets/tools/README.md` for each source.

## Round 3: services grid, icons, longer/diverse clips
- "The six services" is now a bento grid (one big tile + five square tiles), image-led with a gradient scrim, numbered badge, a hover-drawn ring around the icon, pointer-tilt in 3D, and a cursor-follow spotlight (`assets/ai-motion.js`, `[data-svctilt]`).
- Every emoji icon (services grid, related-links chips) is now a stroke-based inline SVG line icon (`ICONS` dict in `build.py`), styled to match the brand's ink/blue.
- UGC reel: 3 of 4 clips are now different niches entirely (sneakers/fashion, home cooking, tech gadget unboxing), not just skincare, each ~12s with an establishing shot, a cut to a close-up and a cut back, generated with Higgsfield's `cinematic_studio_video_v2` (`multi_shots: true`).
- Spokesperson reel: 3 of 4 clips are refreshed the same way (kurta shop, campus, boutique), 12s with real camera cuts. `spokes-reel-3.mp4` is still the original shorter 3s single-shot clip (credits ran out before it could be redone).
- `assets/video/` is now 109MB. This must be compressed (h.264, lower bitrate, maybe 720p) before launch; ffmpeg is not available in this environment to do it here.

## Round 4: "The short answer" redesign
- Was a plain left-border blockquote; now a white card with a gradient hairline border, a chat-bubble icon badge, and three small tag chips (Plain language / One paragraph / Ready for AI answer engines) that describe what an AEO short-answer block is for.
- The paragraph now reveals word by word on scroll (`data-split`, reused from the section headings) instead of appearing all at once.
- Shared by `answer_block()` in build.py, used identically on the hub and all six service pages.

## Round 5: "The six services" as an interactive showcase
- Replaced the static bento grid with a click/hover-to-select showcase: a numbered list on the left (progress bar per row, active row highlighted) and one large image stage on the right that crossfades to match.
- Auto-advances every 5.6s, pauses on hover, and clicking or focusing a row jumps straight to it and restarts the timer. Each stage frame links to that service's page.
- Keyboard and mobile both work: rows are real buttons, the stage frame is a real link, and on narrow screens the stage sits above the list, stacked.
- Logic lives in `assets/ai-motion.js` (`[data-svcx]`), no GSAP dependency, so it still works if the animation libraries fail to load.

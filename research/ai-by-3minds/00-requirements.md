# AI by MMC: Requirements Document (Draft v1)

Sources: research files 01 to 05 in this folder, plus the MMC site audit (delivered in chat, summarised in section 9).
Status: draft for review. Nothing has been built or modified in the site yet.

## 1. Goal

Add an "AI by MMC" section to the MMC site: a hub page, six service pages, and a site-wide entry point (floating button plus nav pill). Match the 3minds concept in animation, copy structure, context and pitch, but build it on MMC's own domain with real SEO. Images now, videos swapped in later.

## 2. What the research found (decisions it drives)

| Finding | Consequence |
|---|---|
| 3minds pages are iframes of a Framer site; no schema, no visible FAQ, canonicals point elsewhere | MMC builds native pages with schema, FAQ markup and internal links. This is our biggest SEO lever. |
| The "revolving button" is a desktop-only nav pill (134x35) with a 16s looping video behind the label, showing as a shimmering border | Replicate as a pill with a CSS conic-gradient ring now; swap in video later. |
| There is no free-floating button on 3minds | The floating button is an MMC addition, per the brief. Default: build both. |
| 3minds pages show no pricing, process detail, proof, B2B or education use cases | MMC adds process, use cases for D2C, B2B and education, and honest proof slots. |
| Competitor gap: AI production tied to a performance loop, education and B2B AI offers, transparent pricing | Positioning: "AI production plus performance, one menu, three entry points". |
| Template leftovers on 3minds (wrong copy, broken links, inconsistent turnaround) | Do not copy. Write MMC copy fresh. |

## 3. Scope

In scope
- Floating AI button (all pages except admin, preloader-demo, home-v1) and desktop nav pill.
- AI hub page and six service pages: AI Photoshoot, AI Video Generation, AI Sales Agent, AI UGC, AI Landing Page Builder, AI Spokesperson Video.
- Menu, footer, sitemap, llms.txt, SEO and schema registration.
- Image set for every slot, with video slots built to accept video later.

Out of scope for v1
- Real video files, live AI tool demos, pricing tables, a chat widget backend.
- Changes to the approved homepage hover sections (services hover-to-project, logo hover-to-project).

## 4. Floating button spec

- Delivered as one dependency-free file, `assets/mmc-ai-fab.js`, modelled on `mmc-preloader.js`. It injects its own style and element into `document.body`, outside `#root`, so prerender never bakes it.
- One script tag added to each page via a script. Excluded: admin, preloader-demo, home-v1.
- Look: circular button, bottom-right, with a rotating conic-gradient ring (blue and sun-yellow from the MMC tokens), a centred "AI" mark, and rotating text around the ring ("AI by MMC"). "Revolving" is delivered as continuous ring rotation, plus a slow drift that moves the button between two anchor positions on scroll so it does not sit on the same content.
- Behaviour: click opens a compact panel listing the six AI services with a one-line description each and a link to the hub. Escape and outside-click close it.
- Layout rules: bottom offset moves up while the cookie banner (z 60, full width) is showing; z-index about 65; hidden while the menu (70), audit modal (100) or Calendly modal (2000) is open; respects the 84px reserved at the right of the mobile sticky CTA; safe-area insets.
- Accessibility: real button with aria-label, aria-expanded, focus-visible outline, 44px minimum target, ring rotation stops under prefers-reduced-motion.
- Timing: on first visit, enter after the preloader would finish (sessionStorage key `mmc-preloader-seen`); no entrance delay otherwise.
- Tracking: push a dataLayer event on open and on each link click, same pattern as `mmc-forms.js`.
- Avoid any class name containing "rise" (prerender strips inline styles from those).

Nav pill
- Added as a link in `Nav.jsx` and as a numbered entry with the six sub-pages in `Menu.jsx`. Desktop only, matching 3minds; mobile gets the menu entry.
- Pill has the same rotating ring as the floating button, at 134x35 scale.

## 5. Page specs

### 5.1 Hub: `ai.html`
Sections, following the 3minds arc but with MMC content:
1. Hero: headline on automating growth work with AI, badge, two CTAs (see the work, book a call).
2. Answer block: a short, plain definition of AI by MMC (for AEO).
3. Six service cards (image-led, hover to reveal a scene, link to each page).
4. Tools strip: logo marquee of tool names the team uses. Text only, no counts.
5. How we work: brief, generate, refine, ship, measure (the performance loop is our differentiator).
6. Three entry points: D2C, B2B, education.
7. Work and proof slots (populate only with real, published work; hide if empty).
8. FAQ (visible, with FAQPage schema).
9. Closing CTA band.

### 5.2 Six service pages
Shared template, data-driven: one `ai-app.jsx` and six `ai-data-*.js` files, following the `hub/` B2B and education model. Each page has: hero with media slot, answer block, how it works (3 to 4 steps), what you get, use cases for D2C, B2B and education, benefits, FAQ (four to six real answers), closing CTA, related-services links, sticky mobile CTA.

Per-page motion (from the 3minds audit, rebuilt with GSAP and CSS, not Framer):
- Photoshoot: word-by-word headline reveal, rotating 3D hero carousel, sticky scroll-driven image grid, base image to many scenes concept.
- Video generation: draggable slideshow hero, benefit cards, three use-case cards.
- Sales agent: three-step scroll story (capture, qualify, engage) on isometric plates, integrations flow diagram, plus an MMC addition: a scripted chat mockup.
- UGC: 3D stack of vertical clips, four steps on a scroll-filled progress line.
- Landing page builder: scroll-scrubbed screenshots of MMC-built pages, four-step process.
- Spokesperson: talking-head clip marquee, how-it-works steps, before and after.

Slugs: flat root files, `ai-photoshoot.html`, `ai-video-generation.html`, `ai-sales-agent.html`, `ai-ugc.html`, `ai-landing-page-builder.html`, `ai-spokesperson-video.html`. Code and copy in an `ai/` folder.

## 6. Copy rules

- Follow the 3minds structure and pitch, but write MMC copy; do not paste theirs.
- No invented results, prices, ratings, awards, turnaround times or counts. Say "a few of the brands", never a number.
- No em dashes.
- Lead with D2C but never D2C-only; include B2B and education in use cases.
- Keep "AI" as part of the existing "Design x Marketing x Technology x Content x AI" tagline; decide whether the "five systems" copy stays (see open questions).

## 7. Image and video plan

- Every text block gets a literal scene (no abstract art). Each service page needs a hero image, a full set of card and step images, and one image per video slot.
- Asset folder: `assets/ai/<page>/`, JPEG, lowercase hyphenated names, 1024x688 (3:2) as the default, 9:16 for UGC and spokesperson slots.
- Every media slot is a fixed-ratio wrapper with `img` and optional `video` fields in the data file, so a `<video>` (muted, loop, playsinline, preload none, poster) drops in without layout change. Reduced-motion and data-saver fall back to the image.
- The full per-slot brief list is in research files 02, 03 and 04 and gets consolidated into a shoot list in the build phase.
- The existing site art direction bans people and text; AI pages need their own direction (people and UI mockups are required here). To be written before generation.

## 8. SEO, AEO and registration checklist (per page)

- `content/seo.json` entry (title 60 or less, description 155 or less).
- Inline JSON-LD: BreadcrumbList, WebPage, FAQPage, and Service where applicable.
- `sitemap.xml` (manual), `llms.txt` (add hub and six pages), footer and menu links.
- Run `build.sh` (needs dev server on 8080 and Chrome debug port) so pages are prerendered; each page needs at least 80 words rendered.
- Internal links: hub to each page, each page to siblings and to D2C, B2B, education and audit.
- Update the stale Menu items found in the audit only if the user approves.

## 9. Site constraints (from the site audit)

- Static site, React and Babel in the browser, no bundler; root-level `.html` files only.
- Cookie banner, mobile sticky CTA and modals all sit near the bottom-right; see section 4.
- 35 files are modified but uncommitted; recommend a branch or commit before build.
- Keep `.n-cap`, `.n-peek`, `.n-wall__*` and `MMC_WORK_ART` untouched.

## 10. Build order

1. Confirm open questions below.
2. Write AI image art direction and shoot list.
3. Generate image set.
4. Build `mmc-ai-fab.js` and the nav pill; wire into all pages.
5. Build hub, then the six pages from the shared template.
6. Register SEO, schema, sitemap, llms.txt, menu, footer.
7. Run `build.sh`, test at desktop and mobile widths, check the collisions listed in section 4.
8. Later: swap in videos.

## 11. Open questions

1. Button: both (assumed), nav pill only, or floating only?
2. "Five systems" copy: keep AI as an add-on menu, or make it a sixth system and update `services.html`, `llms.txt`, the services FAQ and the footer together?
3. Sub-brand names for each AI product (competitors use them)? Or plain names?
4. Pricing: show "from" prices or none? The site policy is none unless you publish them.
5. Image generation: use the Higgsfield tools available in this environment, or supply your own?
6. Commit the current working tree first?

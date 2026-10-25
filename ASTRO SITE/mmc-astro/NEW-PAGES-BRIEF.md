# Fresh pages brief (read fully before you start)

Context: MMC (Monday Marketing Company, Thane, India) is a marketing agency for D2C brands, B2B companies and educational institutes. The 26 service/industry/guide pages, Services, Performance marketing, D2C and Audit were rebuilt in a new visual approach. The pages below were left in the old style and are being rebuilt from scratch in the SAME approach. The old versions are parked in `src/_legacy/pages/` (do not delete them, do not edit them; read them for facts only). The original static site is at `../../STATIC SITE/MMC Site` (served at http://localhost:8080) for reference.

## The new approach (this is what "as per the new approach" means)
- Visual first. Every block of text has a literal photographic scene beside it (people, desks, screens, packaging). No abstract art. Platform imagery (Meta, Google, Amazon, Blinkit, Zepto, Instamart, WhatsApp, Shopify, Instagram) shows the real logo and a recognisable real interface, with a small "illustrative recreation" note where used.
- Page skeleton, reusing the components in `src/components/hub/` (Hero with watermark + 4 photo tiles, Answer "In short" arch card, stacking-card "what you may be doing / what we do instead" section, Numbers, Brands wall with hover-to-project, Beyond related cards, Faq, Cta closing card) and the styles already loaded by BaseLayout. Read `src/components/hub/*`, `src/scripts/hub.ts`, `src/pages/[...slug].astro` and one data file (e.g. `src/data/hubs/services__cro.json`) first. You may add a JSON to `src/data/hubs/` when a page fits the hub schema, or write a bespoke `.astro` page in `src/pages/` that composes the same components plus new sections in the same visual language (rounded 18-32px cards, Raleway display, Nunito body, the blue #16329E/#0F1E5E + yellow #FFC528 palette from `src/styles`). Bespoke sections need their own CSS file imported by the page.
- Design references: 3mindsdigital.com (favourite), firsteconomy.com. Confident, editorial, generous whitespace, real photography. Not templated, not amateur.
- Nav, footer, cookie banner and audit modal come from `src/components/Shell.astro`; do not change them.
- Mobile first: check 390px and 1440px.

## Hard content rules (from the client, non-negotiable)
- Three audiences: D2C, B2B, education. Lead with D2C where a lead is needed, but never write D2C-only copy.
- NO invented claims, results, prices, awards, testimonials, percentages, or stats. NO client or brand counts (never "9 brands", "20+ clients"); say "a few of the brands we work with". Do not name a client as using a service unless `../../STATIC SITE/MMC Site/content/clients.json` records it. Revenue totals stay out of new copy.
- Facts you may use: the site's existing copy (legacy pages, llms.txt in public/, content/*.json in ../MMC Site), the service pages already built. If a fact is not in those, leave it out or write it generally.
- No em dashes anywhere. Do not use the Cormorant Garamond font. Plain, direct sentences. Every page: one h1, title, meta description, canonical, JSON-LD (BreadcrumbList, WebPage, plus the right type, and FAQPage where FAQs exist) through `BaseLayout` props (look at how `[...slug].astro` builds them and reuse `rewriteJsonld` / `fixDeep` from `src/lib`).
- Every internal link goes through `href()` / `fixHtml()` from `src/lib/links.ts`; new pages you create must be added to `src/data/routes.json` only if they replace an old file entry (do not rename existing paths).

## Images
- Generate with the Higgsfield MCP tools (load them with ToolSearch `select:mcp__claude_ai_Higgsfield_ai__generate_image_batch,mcp__claude_ai_Higgsfield_ai__jobs_wait`). Model `gpt_image_2_5`, aspect 3:2, `use_unlim: false`. Prompts are literal editorial photographs ("Editorial photograph of ..., bright natural light"). jobs_wait needs `jobs: [{index, job_id}]`. Budget: at most 14 images for your assignment (about 1 credit each). Download result_url with curl, convert with `sips -s format jpeg -s formatOptions 82 --resampleWidth 1200 in.png --out public/assets/<your-folder>/<name>.jpg`. Reuse existing images in `public/assets/` wherever they already fit (look at what exists first; there are many under sv, d2c, b2b, edu, shared, pm-v3, au, res, guides, meta, google, etc.).
- Images are AI scenes: never show invented numbers as real results on screen.

## Working method
- Use your own dev port (given below) and never navigate a Chrome tab you did not open (helper: `/private/tmp/claude-501/-Users-anuj-mmc-Documents-MMC-Aug-Launch-site/039ebb78-bf3b-4013-b139-0ed5306789db/scratchpad/qb_lib.py`: open_tab, close_tab, vp, ev, shot; Chrome debugging on :9222). Take screenshots at 1440 and 390, look at them, fix what is wrong (overlap, clipped text, contrast, empty gaps), and look again.
- Build test with `npx astro build --outDir /tmp/dist-<yourname>` (never the default dist). Then curl/grep your built HTML: one h1, full text present, no `.html` hrefs, no missing `/assets` files, valid JSON-LD.
- Touch only your own files. Other agents work in parallel on other pages.
- Finish with a short report: files created, images generated (count), what you verified, what you did NOT verify, and any fact you were unsure about and left out.

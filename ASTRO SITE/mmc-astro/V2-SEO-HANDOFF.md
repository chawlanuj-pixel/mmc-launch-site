# V2 SEO handoff (technical SEO / AEO / GEO layer)

Check: `npx astro build --outDir <scratch>` then `node tools/v2-check.mjs <scratch>` (add `--json` for machine output).
After a build, `node tools/build-llms.mjs <scratch>` refreshes public/llms.txt and public/llms-full.txt. `node tools/build-redirects.mjs` rebuilds public/_redirects.

## New BaseLayout props (src/layouts/BaseLayout.astro)
- `image`: absolute URL or /assets path. Default by section via `OG_BY_SECTION` (all point at og-card.jpg for now).
- `ogType="article"`, `publishedTime`, `modifiedTime`: emits og:type article, article:published_time, article:modified_time.
- `preloadImage`: string path, `{href,type,imagesrcset,imagesizes}`, or an array. Emits a high-priority image preload.
- hreflang en-IN and x-default self references, og:locale en_IN, `<html lang="en-IN">`, preload of Nunito-Regular and Raleway-Bold (hashed, self-hosted, all @font-face already use font-display: swap).

## Requests to other owners
1. src/pages/guides/[slug].astro: pass `ogType="article" publishedTime={...} modifiedTime={...}` to BaseLayout. Values: the Article JSON-LD `datePublished` / `dateModified` already in src/data/guides/*.json (2026-09-28).
2. src/pages/[...slug].astro (hubs) and hero owners: pass `preloadImage` with the hero image path for LCP, and `image` if a per-page card exists. Home (src/pages/index.astro): pass the hero image as `preloadImage`.
3. src/lib/guides.ts `guideTitleTag`: contribution-margin-roas title is 61 chars ("... break even | MMC"). Drop "| MMC" or shorten.
4. Descriptions outside 140-160 (all in other agents' files):
   - Guides (src/lib/guides.ts `desc` / src/data/guides): attribution-overlap 99, contribution-margin-roas 106, creative-testing 88, guides hub 125.
   - AI pages (src/data/ai or ai-by-mmc pages): /ai-by-mmc/ 134, photoshoot 124, spokesperson-video 133, video-generation 134.
   - Careers: /careers/ 139, google-amazon-specialist 124, performance-copywriter 105, senior-art-director 125, shopify-engineer 118.
   - /contact/ 139. Work: /work/mbb/ 119, /work/mittiy/ 128, /work/oosh/ 129.
   - /thank-you/ 105 (noindex, can be ignored).
5. Home: built <meta description> comes from src/pages/index.astro, not heads.json `home` (which I updated to 152 chars). If index.astro uses `pageHead("home")`, nothing to do; otherwise align it.
6. Hub JSON titles: all current hub titles are 60 chars or fewer; no hub changes needed.

## /insights/ (task 14)
There is no /insights/ page in V2 (no route, not in the build or sitemap). Insights.html already maps to /guides/ in src/data/routes.json. "insights" appears only as CSS prefix (insights-v2.css) and the GuideCard component folder. Added `/insights`, `/insights/`, `/insights/*` 301s to /guides/ in public/_redirects (harmless alias). Nothing distinct was redirected.

## Form endpoint (task 21)
No endpoint is configured anywhere in the repo. public/assets/mmc-forms.js reads `window.MMC_FORM_ENDPOINT`; unset, every form opens a pre-filled mailto to sales-in@mondaymarketing.company (no lead is stored). The owner must supply one URL: an https endpoint accepting a JSON POST (Formspree, Getform, Web3Forms, Basin, a Make webhook, or own API). BaseLayout now injects it when the build env var `PUBLIC_MMC_FORM_ENDPOINT` is set (for example `PUBLIC_MMC_FORM_ENDPOINT=https://... npx astro build`). Nothing else to edit. Also needed: the receiving side must allow CORS from the site origin. public/admin/mmc-data.js and mmc-popularity.js read the same variable.

## Policy notes (unchanged)
robots.txt: named Allow for Googlebot, Bingbot, OAI-SearchBot, ChatGPT-User, PerplexityBot, Claude-SearchBot, Claude-User. Training bots (GPTBot, Google-Extended, ClaudeBot, CCBot) are allowed by the owner's 2 Oct 2026 decision; opt-out instructions are in the file header.
Hosting: _redirects is Netlify/Cloudflare syntax; Hostinger shared hosting would need .htaccess equivalents.
Organization JSON-LD (home): added `knowsAbout` from the services already named on the site. logo, foundingDate (2019), sameAs (Instagram, LinkedIn) were already present; no founder is stated in the repo, so none was added.

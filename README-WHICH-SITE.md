# Which folder is which

> **Update, 15 Oct 2026.** Current work happens in `ASTRO SITE/mmc-astro/`. It holds everything that was in V2 plus the later work (copy decisions, locations, careers, pricing and more). `Astro V2/` is a stale snapshot and should not be edited. The notes below are from 13 Oct 2026 and are kept for history; where they disagree with this note, this note wins.

Updated 13 Oct 2026. The owner has decided that `Astro V2/` is the launch site: it is what gets deployed to the main site, https://mondaymarketing.company.

| Folder | What it is | Local address | Start it |
|---|---|---|---|
| `Astro V2/` | The launch candidate (Astro 7, clean URLs, new service layout, market pages kept as draft). **This is the one going live.** Deploy steps: `Astro V2/DEPLOY.md`. Checks: `npm run build`, `node tools/v2-check.mjs dist`, `node tools/schema-check.mjs dist`. | any free port except 4332 (shared) | `cd "Astro V2" && npm run dev -- --port <free port>` |
| `ASTRO SITE/mmc-astro/` | The previous baseline (the first Astro rebuild). No longer the launch tree, but not retired: 11 pages exist there that V2 lacks (`/locations/` and the Thane, Mumbai and Indore pages, `/services/web-development/woocommerce/`, `/white-label/register/`, four private pricing pages, a preview), and some keyword edits exist only there (for example its /services/seo/ title). The owner has not yet chosen what to port into V2. Do not edit it; read and compare only. | http://localhost:4331 | `cd "ASTRO SITE/mmc-astro" && npm run dev -- --port 4331` |
| `STATIC SITE/MMC Site/` | The original site: HTML + JSX compiled in the browser, pre-rendered by `build.sh`. Reference / fallback. | http://localhost:8080 | `cd "STATIC SITE/MMC Site" && ./serve.sh` |
| `AI by MMC/` | Standalone AI sub-brand pages. Merges into the Astro site (`public/ai-by-mmc`). | http://localhost:8081 | `cd "AI by MMC" && python3 -m http.server 8081` |

Shared reference material (used by all): `Case Study/`, `logos/`, `design/`, `images/`, `research/`, `SEO Plan/`, `Video portfolio/`.

Rule of thumb: launch work happens in `Astro V2/`. Port anything wanted from `ASTRO SITE/mmc-astro/` into V2 once the owner chooses (the list of differences is in `SEO Plan/on-page-audit/02-issues.md`, item 1). Touch `ASTRO SITE/` and `STATIC SITE/` only to read or compare.

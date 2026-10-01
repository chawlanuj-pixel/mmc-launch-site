# Which folder is which

| Folder | What it is | Local address | Start it |
|---|---|---|---|
| `STATIC SITE/MMC Site/` | The original site: HTML + JSX compiled in the browser, pre-rendered by `build.sh`. Reference / fallback. | http://localhost:8080 | `cd "STATIC SITE/MMC Site" && ./serve.sh` |
| `ASTRO SITE/mmc-astro/` | The rebuild on Astro 7 with clean URLs (`/careers/`). **This is the one going live.** | http://localhost:4331 | `cd "ASTRO SITE/mmc-astro" && npm run dev -- --port 4331` |
| `AI by MMC/` | Standalone AI sub-brand pages. Merges into the Astro site (`public/ai-by-mmc`). | http://localhost:8081 | `cd "AI by MMC" && python3 -m http.server 8081` |

Shared reference material (used by both): `Case Study/`, `logos/`, `design/`, `images/`, `research/`, `SEO Plan/`, `Video portfolio/`.

Rule of thumb: launch work happens in `ASTRO SITE/`. Touch `STATIC SITE/` only to read the original copy or to compare.

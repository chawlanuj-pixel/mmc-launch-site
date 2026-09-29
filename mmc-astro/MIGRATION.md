# MMC Astro migration: working notes

Source (read-only reference, the live static site): `../MMC Site` (served at http://localhost:8080).
Target: this folder. Astro 7, React 18 islands, static output, clean URLs (`src/data/routes.json` maps old file to new path).

Rules for everyone
- Same design, same copy. Do not restyle, reword, or add claims. No em dashes. Never invent numbers, client counts, prices.
- Assets: always absolute (`/assets/...`). Never relative.
- Links: run every internal href through `href()` / `fixHtml()` / `fixDeep()` from `src/lib/links.ts` (old `foo.html` -> new clean path).
- Static by default (.astro). Use a React island (`client:visible` / `client:idle`) only for real interaction: menu state, scroll effects, calculators, modals, hover-to-project.
- Content must be in the server-rendered HTML (no empty shells); check `dist/**/index.html` with curl, not only the browser.
- Page-specific CSS: import it from your own page/component. Do not edit `BaseLayout.astro` CSS imports except to add a truly global file.
- Browser checks: open your own tab (never navigate a shared tab), compare against the original at localhost:8080 at 1440 and 390 widths.
- Global runtime helpers exist as plain scripts in public/: `admin/mmc-data.js`, `assets/mmc-forms.js` (defines `window.mmcBookCall`, `window.mmcOpenBrief`).

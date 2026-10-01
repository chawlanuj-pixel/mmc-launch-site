# Site setup details (answers to item 3)

- **CMS or builder:** None. Custom static site built with Astro 7 (static output, directory URLs, trailing slash) plus React 18 islands and GSAP. Content lives in JSON files under `src/data/` and Astro templates. No WordPress, no Elementor, no SEO plugin. All SEO tags (title, description, canonical, OG, Twitter, JSON-LD) are generated in code (`src/layouts/BaseLayout.astro`, `src/lib/pagehead.ts`, `metaHead.ts`).
- **Final domain:** `https://www.mondaymarketing.company` (set as `site` in `astro.config.mjs`; canonicals and sitemap use it).
- **Staging:** the Hostinger preview URL is a temporary host. The build contains no reference to it in canonicals, so confirm staging is blocked from indexing.
- **Is the domain live with an older site?** NOT ANSWERABLE FROM THE REPO. The `_redirects` file maps the old `.html` URLs (services.html, meta-ads.html, etc.) to the new clean URLs, which implies an older static site exists on the domain. Owner to confirm, and to supply Search Console and GA4 exports.
- **Redirect file format:** `public/_redirects` is Netlify/Cloudflare Pages syntax. It is NOT read by Hostinger shared hosting; if launching on Hostinger the 301s must be re-implemented in `.htaccess` or the host's redirect tool.
- **Sitemap:** `/sitemap-index.xml` auto-generated. **robots.txt:** allow all, disallow `/admin/`.
- **Not provided by the repo (owner must supply):** Search Console and GA4 data, proof bank, partner badges, reviews, pricing, service-by-service client status, team list.

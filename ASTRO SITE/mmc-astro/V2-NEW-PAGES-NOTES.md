# V2 new pages: notes (2026-10-09)

13 hubs added as data only: src/data/hubs/<path with __>.json plus 13 new entries (old-file key -> clean path) appended to src/data/routes.json. No component, layout or existing hub file was edited. [...slug].astro picks them up through its glob.

Pages: /services/seo/ai-seo/, /services/seo/aeo/, /services/seo/geo/, /services/content-marketing/, /services/seo/google-business-profile/, /industries/d2c/{skincare,baby-and-kids,food-and-beverage,fashion-and-apparel}/, /industries/b2b/{manufacturing,saas-and-software}/, /industries/education/{colleges,study-abroad}/.

Follow-ups for component or other owners
- Nothing links to the new pages yet from outside themselves: add to NavMenu/menu-data.ts (SEO children, Content marketing, Industries children), the /industries/ and /industries/<audience>/ hubs (Beyond/Stages cards) and /services/seo/ (Beyond). Owner files, not touched.
- Hero sub-heading and tiles are rendered as for all hubs. A comparison table renders through hub `article.blocks[].table` (Article.astro); the three AI pages, content marketing and GBP use it.
- keys aiseo, aeo, geo, contentmktg, gbp, d2cskin, d2cbaby, d2cfnb, d2cfash, b2bmfg, b2bsaas, educol, edusab are new; closingFor/PreFooterCta use the hub `cta`. TOOLS_FOR and guidesFor have no entry for them (no calculators strip, no guide cards); add in src/lib/site.ts and links-map.ts if wanted. Article text links to /guides/ and /tools/.
- AiVersion MAP has no entry for the new slugs (none needed).
- Verticals have no `proof` brand tiles on purpose (no client claims).
- Not created, owner decision pending: website-maintenance, WordPress, ADA, white-label, testimonials.
- Offices: GBP page states Thane, Mumbai and Indore only, as in the footer and contact data.

## Round 2 (2026-10-09): WordPress, website maintenance, white label cluster

29 data-only hubs, generated and registered in src/data/routes.json (unique file keys, e.g. white-label-seo.html). No component or locked file touched.
- Services: /services/web-development/wordpress/, /services/website-maintenance/.
- Pillar /white-label/ plus 26 children under /white-label/: seo, link-building, geo-aeo, ppc, meta-ads, social-media-management, content-marketing, email-marketing, cro, lead-generation, ecommerce, creative-and-video, web-design, web-development, wordpress-development, website-maintenance, shopify-development, app-development, ai-services, reporting, orm, digital-marketing, outsourcing, reseller-programme, pricing-models, india.
- Linking: pillar table links every child; each child links pillar, three ring siblings, one MMC service page and one more white-label page via Beyond cards. One related card was appended to 17 existing service hubs (web-development, seo, google/meta/amazon ads, social, content, retention, cro, lead-gen, shopify, app, ugc, ORM, geo, ai-seo, ui-ux) so each child has inbound links.
- site.ts TOOLS_FOR and links-map.ts guidesFor have entries for the new slugs. Slugs shared with existing services (seo, cro, web-development, shopify-development, lead-generation, content-marketing) reuse those entries, and AiVersion shows its AI cards on /white-label/web-development/ and /white-label/cro/ because it keys on the last path segment. Acceptable; a component change (key on full path) would fix it.
- Component notes: Beyond grid is two columns, so cards are kept to even counts. Hero/Stages/Numbers sections are omitted on these hubs (optional in the template).
- Suggested nav (locked): Services > Web development > WordPress; Services > Website maintenance; a top-level "White label" item (or footer column) linking /white-label/ with a dropdown of the 8 highest-intent children: seo, ppc, meta-ads, social-media-management, web-development, wordpress-development, shopify-development, outsourcing. Footer: add /white-label/ and /white-label/india/.
- Owner to confirm: all copy states no prices, counts or SLAs; "we sign an NDA", "reports under your brand" are service descriptions.

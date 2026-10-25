# Astro V2: every page worked on, and what was done

Base address while the dev server runs: http://localhost:4332  (start: `cd "Astro V2" && npm run dev -- --port 4332`)

## 1. Homepage
- `/` : new text-led hero (HeroClean, old hero kept as backup), lanes and outcomes merged into one band, "how we do it" accordion, FAQ (with FAQ schema), calculators band, closing audit form, shorter services block on phones, tighter page length. Brand wall and services hover-to-project untouched.

## 2. Existing service pages, redesigned to the new 7-section layout (18)
- `/services/performance-marketing/meta-ads/` (the approved example; preview copy at `/preview/service-meta-ads/`, noindex)
- `/services/performance-marketing/google-ads/`
- `/services/performance-marketing/amazon-ads/`
- `/services/performance-marketing/quick-commerce/`
- `/services/seo/`
- `/services/shopify-development/`
- `/services/cro/`
- `/services/web-development/`
- `/services/ui-ux-design/`
- `/services/mobile-app-development/`
- `/services/lead-generation/`
- `/services/retention-marketing/`
- `/services/social-media/`
- `/services/ugc-and-video/`
- `/services/influencer-marketing/`
- `/services/online-reputation-management/`
- `/services/branding/`
- `/services/packaging-design/`

## 3. NEW service pages (created, on the new layout) (7)
- `/services/seo/ai-seo/`
- `/services/seo/aeo/`
- `/services/seo/geo/`
- `/services/seo/google-business-profile/`
- `/services/content-marketing/`
- `/services/web-development/wordpress/`
- `/services/website-maintenance/`

## 4. NEW industry pages (created, on the new layout) (8)
- `/industries/d2c/skincare/`
- `/industries/d2c/baby-and-kids/`
- `/industries/d2c/food-and-beverage/`
- `/industries/d2c/fashion-and-apparel/`
- `/industries/b2b/manufacturing/`
- `/industries/b2b/saas-and-software/`
- `/industries/education/colleges/`
- `/industries/education/study-abroad/`

## 5. NEW white-label section (created, on the new layout, agency-first) (27)
- `/white-label/` (pillar)
- Marketing: `/white-label/seo/`, `/white-label/link-building/`, `/white-label/geo-aeo/`, `/white-label/ppc/`, `/white-label/meta-ads/`, `/white-label/social-media-management/`, `/white-label/content-marketing/`, `/white-label/email-marketing/`, `/white-label/cro/`, `/white-label/lead-generation/`, `/white-label/ecommerce/`, `/white-label/creative-and-video/`, `/white-label/digital-marketing/`, `/white-label/orm/`
- Build: `/white-label/web-design/`, `/white-label/web-development/`, `/white-label/wordpress-development/`, `/white-label/website-maintenance/`, `/white-label/shopify-development/`, `/white-label/app-development/`, `/white-label/ai-services/`
- Model: `/white-label/reporting/`, `/white-label/outsourcing/`, `/white-label/reseller-programme/`, `/white-label/pricing-models/`, `/white-label/india/`

## 6. Existing pages with smaller edits (hub, copy and SEO only)
- Industry hubs `/industries/`, `/industries/d2c/`, `/industries/b2b/`, `/industries/education/` : links added to the new vertical pages.
- `/services/seo/` : related cards (AI SEO, AEO, GEO, Google Business Profile, content marketing) and a new article block with contextual links.
- `/services/social-media/`, `/guides/` : related cards to content marketing.
- 17 service hubs : one related card each pointing at the new white-label and WordPress pages.
- `/guides/` and the 3 guide pages (`/guides/attribution-overlap/`, `/guides/contribution-margin-roas/`, `/guides/creative-testing/`) : article type with published and modified dates, descriptions fixed, title trimmed to 60.
- `/contact/`, `/careers/` and role pages (`/careers/senior-meta-buyer/`, `/careers/google-amazon-specialist/`, `/careers/senior-art-director/`, `/careers/performance-copywriter/`), `/work/mbb/`, `/work/mittiy/`, `/work/oosh/` : meta descriptions fixed to 140 to 160 characters.
- `/ai-by-mmc/`, `/ai-by-mmc/photoshoot/`, `/ai-by-mmc/video-generation/`, `/ai-by-mmc/spokesperson-video/` : meta descriptions fixed.
- `/insights/` : 301 redirect to `/guides/` (it was never a separate page in V2).

## 7. Site-wide changes (every page)
- Language tags (en-IN and x-default), social image and article settings, font preloads, hero image preload on home and service pages.
- Sitemap with last-modified dates (preview and thank-you pages excluded), regenerated `llms.txt`, new `llms-full.txt`, richer organisation data. `robots.txt` policy unchanged.
- Cookie notice is a compact one-line bar on phones; AI button no longer covers the booking bar.
- Breadcrumb links now meet the 44px tap size on the new layout.

## 8. Not touched
Nav and menu, footer, the service-page hero, `/about/`, `/audit/`, `/tools/*`, `/glossary/`, `/privacy/`, `/terms/`, other `/work/*` pages, other `/careers/*`. Your original `ASTRO SITE/mmc-astro` folder was not changed.

## 9. Added on 2026-10-11 (after the replace)
- New pages: `/services/web-development/woocommerce/`, `/locations/`, `/locations/thane/`, `/locations/mumbai/`, `/locations/indore/` (all on the new 7-section layout).
- `/work/` : filter chips (All, D2C, B2B, Education), work without JavaScript.
- Menu: White label (top-level), WordPress, WooCommerce, website maintenance, AI SEO, AEO, GEO, Google Business Profile, content marketing and the industry verticals added; items numbered 01 to 10.
- Forms: every form emails anuj@mondaymarketing.company through `/forms/send.php` on the live domain (pre-filled email to the same address anywhere else).

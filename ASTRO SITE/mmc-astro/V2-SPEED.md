# V2 speed pass (12 Oct 2026)

All numbers: Lighthouse 13.5, performance category only, own headless Chrome, served by `tools/serve-dist.mjs` (gzip and brotli, Cache-Control per path, ETag, HTTP/1.1 keep-alive; it mimics what the Apache host does after `public/.htaccess`). Mobile = Lighthouse default (simulated Slow 4G, 4x CPU). Desktop = Lighthouse desktop preset. Lighthouse simulates the throttling, so scores on this local server wobble by several points between runs (mobile FCP flips between about 1.1 s and 2.5 s run to run on some pages, which moves those pages between about 76 and 92). Treat mobile figures as a band, not a point.

## Before and after (mobile, then desktop)

| Page | Mobile before | Mobile after | Desktop before | Desktop after |
|---|---|---|---|---|
| / | 67 (FCP 3.9, LCP 6.8, CLS 0.001) | 76 (1.2, 7.2, 0.001) | 97 (0.8, 1.2, 0) | 97 (0.3, 1.3, 0) |
| /services/performance-marketing/meta-ads/ | 40 (4.4, 14.6, **0.993**) | 83 (1.1, 4.7, 0.007) | 94 (0.8, 1.5, 0.004) | 100 (0.3, 0.7, 0.004) |
| /services/seo/ | 49 (2.0, 9.8, **0.992**) | 80 (2.0, 5.0, 0.007) | 88 (0.8, 2.3, 0.005) | 100 (0.3, 0.7, 0.004) |
| /white-label/ | 64 (4.3, 13.2, 0.007) | 76 to 92 (2.6 to 1.1, 5.4 to 3.3, 0.007) | 86 (0.8, 2.4, 0.010) | 100 (0.3, 0.7, 0.004) |
| /industries/d2c/skincare/ | 39 (4.3, 13.2, **0.993**) | 92 (1.1, 3.3, 0.005) | 97 (0.4, 1.0, 0.079) | 100 (0.3, 0.7, 0.003) |
| /work/oosh/ | 65 (3.5, 12.0, 0.099) | 82 (1.0, 5.0, 0.001) | 90 (0.7, 2.1, 0.008) | 99 (0.3, 1.0, 0.008) |
| /white-label/register/ | 70 (1.4, 5.0, **0.218**) | 91 (1.3, 3.5, 0.010) | 94 (0.4, 1.2, **0.118**) | 98 (0.6, 1.0, 0.000) |
| /contact/ | 83 (1.4, 4.5, 0.005) | 96 (1.0, 2.9, 0.005) | 99 (0.3, 0.8, 0.004) | 99 (0.5, 0.8, 0) |

Cells show score (FCP s, LCP s, CLS). TBT is 0 to 10 ms everywhere before and after. Page weight on mobile (transfer, compressed): 1.8 to 3.0 MB before, 0.6 to 1.25 MB after.

Targets: desktop >= 95 met on all 8 pages. CLS <= 0.1 met on all 8 pages, both form factors (it was 0.99 on three mobile pages and 0.12 to 0.22 on the register page). Mobile >= 85 met on 3 to 4 of 8 pages in any given run (skincare, register, contact, and white-label or meta-ads on a good run). Mobile LCP <= 2.5 s NOT met (best 2.9 s, typical 3.3 to 5 s). Why: the simulated LCP counts every byte requested before the observed LCP. On a fast local server that includes about 240 KB of fonts (10 to 12 static weights), 200 to 650 KB of images, 100 KB of JS and about 70 KB of CSS, all of which Lighthouse then "downloads" at 1.6 Mbps. The real (observed) LCP on this server is 70 to 300 ms. What is left is bytes: variable fonts (about 150 KB), fewer eager images, and `client:` islands (see below).

## What moved the needle

1. CLS 0.99 (mobile service pages): the body re-flowed when Nunito Bold arrived late. Fixed by inlined critical CSS (fonts are now discovered with the first paint, not after 160 KB of CSS) plus metric-matched fallback faces (`Nunito Fallback`, `Raleway Fallback`, size-adjust and ascent/descent overrides measured against Arial for every weight) in `src/layouts/BaseLayout.astro`.
2. Render-blocking CSS: FCP 3.9 to 4.4 s down to 1.0 to 2.6 s. `tools/optimise-build.mjs` (beasties) inlines the rules each page uses (about 100 KB raw, 15 to 20 KB gzip per page) and loads the full sheets with `media=print` plus onload swap, with a `<noscript>` fallback. Chosen over `build.inlineStylesheets: "always"` because the shared global sheet is 163 KB (MobileBar.css) and would be repeated in every page; inlining only used rules keeps HTML at 90 to 215 KB raw.
3. Weight: image recompression (`tools/recompress-images.mjs`, 205 files, 24.8 MB to 15.9 MB, same dimensions and names, kept only when PSNR >= 38 dB, originals backed up to the scratchpad), fonts subset to Latin (`tools/subset-fonts.py`, 823 KB to 372 KB for 15 files, same names), and the build step `tools/optimise-build.mjs` shrinks the six 52 px AI menu thumbnails (212 KB each at 1024 px) to 3x copies (`*.t156.jpg`, 8 to 11 KB) and the 2382 px footer logo (62 KB at 158 px) to a 3x copy, makes footer images lazy, and makes `loading="eager"` images below the hero lazy.
4. Desktop CLS 0.12 on the register page: the hero slider rebuilt the mosaic after load. A CSS guard in BaseLayout keeps the mosaic unpainted until `hero-slider.ts` has mounted it (visible without JS, only when the mosaic has two or more tiles).

## Files changed

- `astro.config.mjs`: adds the `mmcOptimise()` integration (runs after every build into any outDir; `MMC_NO_OPTIMISE=1` skips it).
- `tools/optimise-build.mjs` (new), `tools/serve-dist.mjs` (new), `tools/recompress-images.mjs` (new), `tools/subset-fonts.py` (new).
- `src/layouts/BaseLayout.astro`: one `<style data-keep>` block (fallback faces, CLS guard). Font preloads unchanged (Nunito Regular and Raleway Bold only).
- `public/.htaccess`: append-only block (mod_brotli, extra Expires types, `no-cache` for HTML, ETag). No redirect rule touched.
- `public/assets/**` (205 images recompressed in place), `src/styles/design-system/fonts/*.woff2` (subset in place; ttf fallbacks untouched).
- `package.json`: devDependency `beasties`, scripts `optimise` and `serve:dist`.

## Re-run and re-measure

```
npx astro build --outDir /tmp/speed        # the optimiser runs automatically at the end
node tools/serve-dist.mjs /tmp/speed 4399  # gzip + brotli + cache headers
npx lighthouse http://127.0.0.1:4399/ --chrome-flags='--headless=new --no-sandbox' --only-categories=performance   # add --preset=desktop for desktop
node tools/optimise-build.mjs <dist>       # manual re-run on any built folder (idempotent: processed pages carry <meta name="mmc-optimised">)
```

Other agents changing CSS or pages need do nothing: the step reads only built HTML and CSS. Switches: `MMC_NO_OPTIMISE=1` (skip), `MMC_INLINE_FONTS=none|critical|all` (default none; inlining the @font-face rules gave no CLS gain once the fallbacks were in).

## Fonts

Self-hosted woff2, `font-display: swap`, subset to Latin (U+0020-007E, U+00A0-017F, general punctuation, currency incl. the rupee sign, a few math signs). Only Nunito Regular and Raleway Bold are preloaded. Pages still fetch 10 to 12 weights (about 240 KB) because headings and UI use many weights. Recommendation: one variable file per family (Raleway and Nunito both exist as variable fonts) would replace about 10 requests with 2.

## JavaScript and third parties

Transfer per page (mobile run): 98 to 109 KB JS in 14 to 16 requests (react-dom 40 KB, gsap 27 KB, nav and shell islands, the hero slider), 35 to 70 KB CSS. Nothing third-party loads before consent: every request in all 16 runs went to the local origin. GTM and Meta Pixel are consent-gated in `tracking.html`; reCAPTCHA and Calendly load on interaction. All shell islands (NavMenu, CookieBanner, AuditModal, AiFab) are already `client:idle`; `client:load` remains on the calculators, RegisterApp and PricingConfigurator (needed at once on those pages). No preconnect or dns-prefetch is needed, because no third-party host is contacted before interaction. No duplicate or third-party stylesheets exist.

## Videos

No ffmpeg on this machine, so the MP4s (largest 20 MB, `public/assets/voices/*.mp4`, `public/ai-by-mmc/assets/video/*.mp4`) were not recompressed. They do not load on page load: the home page videos are `preload="none"` with no `src` until play is pressed. Recompress them with ffmpeg (h264, crf about 28, faststart) when convenient.

## For the owner and the host

- Enable HTTP/2 (or 3) and Brotli at the host. `.htaccess` cannot switch them on; the rules are guarded and harmless if the module is absent. Hostinger LiteSpeed normally has both.
- Page-file fixes not done here (other agents own those files): (1) `AiFab.tsx` renders six 52 px thumbnails from 1024 px JPGs; point it at pre-sized files and the build-time shrink becomes unnecessary. (2) Mobile LCP text on service heroes sits behind `.reveal` (opacity 0 until JS adds `.in`); letting the hero headline and first paragraph paint without waiting for JS would bring simulated LCP down most. (3) Drop `loading="eager"` plus `fetchpriority="high"` on the second hero mosaic tile (it is below the first tile on phones). (4) Convert hero JPGs to AVIF or WebP via `<picture>` (siblings are not wired).
- Mobile register page, hero slider: `src/scripts/hero-slider.ts` rebuilds the mosaic after load; server-rendering the `is-slider` markup would remove the need for the CSS guard.
- Verification on a fresh build: v2-check 0 failures, consistency-check 0 hard failures, pricing-leak-check 1847 assertions 0 failures (pricing-model pages intact), register-payload-check 344 checks OK. Before and after screenshots on 8 pages at 1440 and 390 differ only by slider timing and JPEG re-encoding (under 0.6 percent of pixels, one 3.7 percent on /contact/ from the auto-advancing hero slider). 12 pages at both widths opened in a browser with no console errors, no failed requests and no horizontal overflow.

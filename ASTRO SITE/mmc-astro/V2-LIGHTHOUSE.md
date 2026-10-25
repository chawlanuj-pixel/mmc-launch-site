# V2 Lighthouse and image audit (11 Oct 2026)

Method: `npx lighthouse` (headless Chrome, default mobile and `--preset=desktop`) against a static build served by `python3 -m http.server` on localhost. Single run each, so treat as indicative. The python server does not gzip and sends no cache headers, so mobile LCP, "unused CSS" and "cache" figures are worse than Hostinger will show once the `.htaccess` compression block is live. Re-run on the live site for real numbers.

| Page | Device | Perf | A11y | BP | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|---|
| / | mobile | 60 | 100 | 100 | 100 | 14.9 s | 0 | 0 ms |
| / | desktop | 82 | 100 | 100 | 100 | 2.7 s | 0 | 0 ms |
| /services/performance-marketing/meta-ads/ | mobile | 56 | 97 | 100 | 100 | 17.5 s | 0.106 | 10 ms |
| /services/performance-marketing/meta-ads/ | desktop | 78 | 97 | 100 | 100 | 3.2 s | 0.045 | 0 ms |
| /services/seo/ | mobile | 56 | 96 | 100 | 100 | 16.7 s | 0.106 | 0 ms |
| /services/seo/ | desktop | 77 | 96 | 100 | 100 | 3.3 s | 0.043 | 0 ms |
| /white-label/ | mobile | 56 | 96 | 100 | 100 | 17.4 s | 0.106 | 0 ms |
| /white-label/ | desktop | 78 | 96 | 100 | 100 | 3.2 s | 0.059 | 0 ms |
| /industries/d2c/skincare/ | mobile | 60 | 96 | 100 | 100 | 15.2 s | 0 | 10 ms |
| /industries/d2c/skincare/ | desktop | 78 | 96 | 100 | 100 | 3.1 s | 0.06 | 0 ms |

## Top failing audits (lowest score first)
- /: LCP (mobile), label-content-name-mismatch, unused-css-rules (~175 KiB), unused-javascript (~80 KiB), cache lifetimes (~3.4 MB), forced reflow.
- Meta Ads: LCP (mobile), layout-shifts (2, CLS 0.106), color-contrast, label-content-name-mismatch, unminified-javascript (10 KiB).
- SEO: LCP (mobile), layout-shifts (2), color-contrast, label-content-name-mismatch, unused-css-rules (~255 KiB).
- White-label: LCP (mobile), layout-shifts (2), color-contrast, label-content-name-mismatch, unminified-javascript.
- Skincare: LCP (mobile), color-contrast, label-content-name-mismatch, unused-css-rules (~250 KiB), cache lifetimes (~2.6 MB).

## What the numbers say
- Mobile FCP is about 6 s on all pages: render-blocking CSS (Shell about 158 KB, svc2 about 164 KB, uncompressed in this test) on simulated slow 4G. LCP then follows FCP. The LCP elements are a hero CTA button on home, the hero mosaic image on service pages and a hero watermark on desktop, so LCP is a CSS delivery problem rather than an image problem.
- Accessibility, best practices and SEO are 96 to 100 everywhere. TBT is near zero.

## Fixed in my files
- `public/.htaccess` (appended only, no redirect touched): gzip/deflate for text, Expires for images and fonts, Cache-Control immutable for /_astro and fonts, 30 days for /assets, HTML not cached.
- Per-section OG cards and og:image width/height/alt, twitter:image(:alt) in BaseLayout.

## Recommendations (other owners)
1. Split or inline critical CSS; load Shell and svc2 CSS with media or preload swap; purge unused rules (about 250 KiB unused on hub pages).
2. Hero mosaic on hub pages: pass `preloadImage` from `[...slug].astro` and add explicit width/height to stop the 2 layout shifts (CLS 0.106 mobile).
3. Fix color-contrast failures (pages score 96 to 97) and label-content-name-mismatch (visible label text must be inside the accessible name).
4. Minify the 10 KiB inline/unminified JS; lazy-load islands below the fold.
5. Run `node tools/optimise-images.mjs --write` and switch heavy images to `<picture>`.

## Oversized files in public (over 300 KB)
Only the videos and three PNGs exceed 300 KB; no photograph exceeds about 321 KB (client logos and JPGs were already recompressed).
| Size | File |
|---|---|
| 19.3 MB | public/assets/voices/curly-1.mp4 |
| 16.6 MB | public/ai-by-mmc/assets/video/spokes-reel-2.mp4 |
| 14.7 MB | public/assets/voices/giraffe-1.mp4 |
| 13.9 MB | public/ai-by-mmc/assets/video/ugc-reel-1.mp4 |
| 12.6 MB | public/assets/voices/giraffe-2.mp4 |
| 12.4 MB | public/ai-by-mmc/assets/video/ugc-reel-2.mp4 |
| 10.5 MB | public/ai-by-mmc/assets/video/spokes-reel-4.mp4 |
| 9.5 MB | public/ai-by-mmc/assets/video/ugc-reel-3.mp4 |
| 9.4 MB | public/ai-by-mmc/assets/video/spokes-reel-1.mp4 |
| 7.0 MB | public/ai-by-mmc/assets/video/ugc-reel-4.mp4 |
| 6.5 MB | public/ai-by-mmc/assets/video/video-show-3.mp4 |
| 6.4 MB | public/ai-by-mmc/assets/video/ugc-sample.mp4 |
| 5.3 MB | public/ai-by-mmc/assets/video/spokes-sample.mp4 |
| 2.9 MB | public/ai-by-mmc/assets/video/video-show-1.mp4 |
| 2.1 MB | public/ai-by-mmc/assets/video/spokes-reel-3.mp4 |
| 1.4 MB | public/ai-by-mmc/assets/video/video-show-2.mp4 |
| 376 KB | public/assets/disciplines/content.png |
| 363 KB | public/assets/disciplines/retention.png |
| 311 KB | public/assets/disciplines/conversion.png |
| 313 KB | public/ai-by-mmc/assets/img/spokes-hero-5.jpg |
| 312 KB | public/ai-by-mmc/assets/img/video-get-2.jpg |
| 310 KB | public/ai-by-mmc/assets/img/ugc-hero-5.jpg |
| 307 KB | public/ai-by-mmc/assets/img/photoshoot-grid-5.jpg |
| 301 KB | public/ai-by-mmc/assets/img/video-use-edu.jpg |

(Fewer than 30 files exceed 300 KB, so this is the full list; a handful more JPGs sit just under it.) Recommend recompressing the MP4s (H.264 CRF 28, 1080p max, `preload="none"`, poster images) and converting the three discipline PNGs to webp. `tools/optimise-images.mjs` is ready (dry run by default; AVIF encoding is slow, run it on one folder at a time).

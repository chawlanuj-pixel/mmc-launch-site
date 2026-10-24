import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import { readdirSync, readFileSync } from "node:fs";
import { mmcOptimise } from "./tools/optimise-build.mjs";
import { mmcPosts, postsSitemap } from "./tools/posts-build.mjs";

// lastmod: guides use their own dateModified (src/data/guides/*.json), hub pages their `updated` field (below), CMS posts updatedAt;
// every other page uses the build date.
const buildDate = new Date().toISOString().slice(0, 10);
const guideLastmod = {};
try {
  for (const f of readdirSync("./src/data/guides")) {
    if (!f.endsWith(".json")) continue;
    const d = JSON.parse(readFileSync("./src/data/guides/" + f, "utf8"));
    const m = JSON.stringify(d).match(/"dateModified":\s*"([^"]+)"/);
    if (d.path && m) guideLastmod["https://www.mondaymarketing.company" + d.path] = m[1];
  }
} catch {}
// Hub and service pages (src/data/hubs/*.json): their own `updated` date, the same date the page shows ("Updated ...") and emits as
// dateModified, so the sitemap, the schema and the visible text agree. Hubs with no `updated` field keep the build date.
// Added 22 Oct 2026 (white-label technical SEO pass). Bump `updated` in the hub JSON when the page content changes.
try {
  for (const f of readdirSync("./src/data/hubs")) {
    if (!f.endsWith(".json")) continue;
    const d = JSON.parse(readFileSync("./src/data/hubs/" + f, "utf8"));
    if (d.path && /^\d{4}-\d{2}-\d{2}$/.test(d.updated || "")) guideLastmod["https://www.mondaymarketing.company" + d.path] ??= d.updated;
  }
} catch {}
// Command Centre articles (src/data/posts.generated.json or env MMC_POSTS_FILE): noindex posts and posts canonical to another URL
// stay out of the sitemap; listed posts (and /blog/) use their updatedAt as lastmod.
const cmsPosts = postsSitemap();
Object.assign(guideLastmod, cmsPosts.lastmod);

export default defineConfig({
  devToolbar: { enabled: false }, // the dark pill at the bottom of the local preview was Astro's dev toolbar; it never ships in the build
  site: "https://www.mondaymarketing.company",
  trailingSlash: "always",
  build: { format: "directory" },
  integrations: [
    react(),
    sitemap({
      // Preview variants, thank-you (noindex) and any /admin/ path stay out of the sitemap.
      filter: (page) => !/\/(home-previous|home-v2|home-v2b|thank-you)\/?$/.test(page) && !/\/pricing-model\//.test(page) && !/\/preview\//.test(page) && !/\/lp\//.test(page) && !/\/admin\//.test(page) && !cmsPosts.exclude.has(page),
      serialize(item) {
        item.lastmod = new Date(guideLastmod[item.url] || buildDate).toISOString();
        return item;
      },
    }),
    // Last integration: after the build it inlines per-page critical CSS and defers the rest (tools/optimise-build.mjs). MMC_NO_OPTIMISE=1 skips it.
    mmcOptimise(),
    // After the build: a CMS page wins over an old redirect rule at the same URL, in the built .htaccess only (tools/posts-build.mjs).
    mmcPosts(),
  ],
});

import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import { readdirSync, readFileSync } from "node:fs";
import { mmcOptimise } from "./tools/optimise-build.mjs";

// lastmod: guides use their own dateModified (src/data/guides/*.json); every other page uses the build date.
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

export default defineConfig({
  devToolbar: { enabled: false }, // the dark pill at the bottom of the local preview was Astro's dev toolbar; it never ships in the build
  site: "https://www.mondaymarketing.company",
  trailingSlash: "always",
  build: { format: "directory" },
  integrations: [
    react(),
    sitemap({
      // Preview variants, thank-you (noindex) and any /admin/ path stay out of the sitemap.
      filter: (page) => !/\/(home-previous|home-v2|home-v2b|thank-you)\/?$/.test(page) && !/\/pricing-model\//.test(page) && !/\/preview\//.test(page) && !/\/admin\//.test(page),
      serialize(item) {
        item.lastmod = new Date(guideLastmod[item.url] || buildDate).toISOString();
        return item;
      },
    }),
    // Last integration: after the build it inlines per-page critical CSS and defers the rest (tools/optimise-build.mjs). MMC_NO_OPTIMISE=1 skips it.
    mmcOptimise(),
  ],
});

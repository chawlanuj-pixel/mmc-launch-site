import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://www.mondaymarketing.company",
  trailingSlash: "always",
  build: { format: "directory" },
  integrations: [react(), sitemap({ filter: (page) => !/\/(home-previous|home-v2|home-v2b|thank-you)\/?$/.test(page) })],
});

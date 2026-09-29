import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://www.mondaymarketing.company",
  trailingSlash: "always",
  build: { format: "directory" },
  integrations: [react(), sitemap()],
});

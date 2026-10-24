// Copies the public site's design tokens and the woff2 fonts into public/admin/ds so the admin uses the same brand source.
// Run after changing src/styles/design-system: node tools/sync-admin-ds.mjs
import { cpSync, mkdirSync, readdirSync, copyFileSync } from "node:fs";
const src = "src/styles/design-system", dst = "public/admin/ds";
mkdirSync(dst + "/fonts", { recursive: true });
copyFileSync(src + "/colors_and_type.css", dst + "/colors_and_type.css");
for (const f of readdirSync(src + "/fonts")) if (f.endsWith(".woff2")) copyFileSync(src + "/fonts/" + f, dst + "/fonts/" + f);
console.log("admin design system synced");

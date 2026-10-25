// Counts inbound internal links per built page. Usage: node tools/v2-inlinks.mjs <dist-dir> [--min=2 path ...]
// Lists pages with zero inbound links (thank-you, admin and noindex preview pages excluded) and the inbound count for new pages.
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
const dist = process.argv[2];
if (!dist) { console.error("usage: node tools/v2-inlinks.mjs <dist-dir>"); process.exit(2); }
const NEW = ["/services/seo/ai-seo/", "/services/seo/aeo/", "/services/seo/geo/", "/services/content-marketing/", "/services/seo/google-business-profile/",
  "/industries/d2c/skincare/", "/industries/d2c/baby-and-kids/", "/industries/d2c/food-and-beverage/", "/industries/d2c/fashion-and-apparel/",
  "/industries/b2b/manufacturing/", "/industries/b2b/saas-and-software/", "/industries/education/colleges/", "/industries/education/study-abroad/"];
const files = [];
(function walk(d) { for (const n of readdirSync(d)) { const p = join(d, n); statSync(p).isDirectory() ? walk(p) : n === "index.html" && files.push(p); } })(dist);
const pathOf = (f) => "/" + relative(dist, f).replace(/index\.html$/, "");
const skip = (p, h) => /thank-you|^\/admin\/|preview/.test(p) || /<meta name="robots" content="[^"]*noindex/.test(h);
const pages = new Map(); const inbound = new Map();
for (const f of files) { const p = pathOf(f); const h = readFileSync(f, "utf8"); pages.set(p, { h, skip: skip(p, h) }); inbound.set(p, new Set()); }
for (const [p, { h }] of pages) {
  const body = h.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, "");
  for (const m of body.matchAll(/<a\s[^>]*?href="([^"#?]+)[^"]*"/g)) {
    let u = m[1]; if (u.startsWith("https://www.mondaymarketing.company")) u = u.slice(35);
    if (!u.startsWith("/")) continue;
    if (!u.endsWith("/")) u += "/";
    if (u !== p && inbound.has(u)) inbound.get(u).add(p);
  }
}
const zero = [...pages].filter(([p, v]) => !v.skip && inbound.get(p).size === 0).map(([p]) => p);
console.log(`pages: ${pages.size}; zero inbound (excluding thank-you/admin/preview/noindex): ${zero.length}`);
zero.forEach((p) => console.log("  ORPHAN " + p));
console.log("\nNew pages, inbound links:");
let bad = 0;
for (const p of NEW) { const s = [...(inbound.get(p) || [])]; if (s.length < 2) bad++; console.log(`  ${s.length}  ${p}  <- ${s.slice(0, 12).join(", ")}`); }
if (bad) { console.log(`FAIL: ${bad} new page(s) under 2 inbound links`); process.exit(1); }

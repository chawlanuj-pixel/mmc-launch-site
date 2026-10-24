// Compares two built sites page by page: title, meta description, canonical, H1, H2/H3 counts, internal link hrefs,
// JSON-LD block count and parse status, and visible word count. Also checks the new page set for duplicate titles
// and descriptions, and that every internal link target exists.
// Usage: node tools/seo-diff.mjs <before-dir> <after-dir>
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join } from "node:path";
const [before, after] = process.argv.slice(2);
if (!before || !after) { console.error("usage: node tools/seo-diff.mjs <before> <after>"); process.exit(1); }
const dec = (s) => (s || "").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;|&#x27;/g, "'");
const txt = (s) => dec(s.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
function walk(dir, out = []) { for (const n of readdirSync(dir)) { const p = join(dir, n); statSync(p).isDirectory() ? walk(p, out) : n === "index.html" && out.push(p); } return out; }
function info(f) {
  const h = readFileSync(f, "utf8");
  const main = (h.match(/<main[\s\S]*?<\/main>/) || [h])[0];
  const body = main.replace(/<(script|style|svg)[\s\S]*?<\/\1>/g, " ");
  const ld = [...h.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]);
  let ldOk = true, ldTypes = [];
  for (const j of ld) { try { const o = JSON.parse(j); (Array.isArray(o) ? o : o["@graph"] || [o]).forEach((x) => ldTypes.push(x["@type"])); } catch { ldOk = false; } }
  const links = [...new Set([...h.matchAll(/<a [^>]*href="(\/[^"#?]*)/g)].map((m) => m[1]))].sort();
  const mainLinks = [...main.matchAll(/<a [^>]*href="(\/[^"#?]*)/g)].map((m) => m[1]);
  return {
    title: txt((h.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || ""),
    desc: dec((h.match(/<meta name="description" content="([^"]*)"/) || [])[1] || ""),
    canon: (h.match(/<link rel="canonical" href="([^"]*)"/) || [])[1] || "",
    h1: txt((h.match(/<h1[\s\S]*?<\/h1>/) || [""])[0]),
    h2: (body.match(/<h2[\s>]/g) || []).length, h3: (body.match(/<h3[\s>]/g) || []).length,
    links, mainLinks, ld: ld.length, ldOk, ldTypes: ldTypes.sort().join(","), words: txt(body).split(" ").filter(Boolean).length,
  };
}
const key = (d, f) => "/" + f.slice(d.length + 1).replace(/index\.html$/, "");
const load = (d) => Object.fromEntries(walk(d).map((f) => [key(d, f), info(f)]));
const B = load(before), A = load(after);
let defects = 0;
const report = [];
for (const p of Object.keys(A).sort()) {
  const a = A[p], b = B[p];
  if (!b) { report.push(`NEW   ${p}  | ${a.title} | words ${a.words} | links ${a.links.length} | ld ${a.ld} (${a.ldTypes})`); continue; }
  const ch = [];
  for (const f of ["title", "desc", "canon", "h1"]) if (a[f] !== b[f]) ch.push(`${f}: "${b[f]}" -> "${a[f]}"`);
  if (a.h2 !== b.h2) ch.push(`h2 ${b.h2}->${a.h2}`);
  if (a.h3 !== b.h3) ch.push(`h3 ${b.h3}->${a.h3}`);
  const add = a.links.filter((x) => !b.links.includes(x)), rem = b.links.filter((x) => !a.links.includes(x));
  if (add.length) ch.push(`+links ${add.join(" ")}`);
  if (rem.length) ch.push(`-links ${rem.join(" ")}`);
  if (a.ld !== b.ld) ch.push(`jsonld ${b.ld}->${a.ld}`);
  if (a.ldTypes !== b.ldTypes) ch.push(`ldTypes ${b.ldTypes} -> ${a.ldTypes}`);
  if (a.words !== b.words) ch.push(`words ${b.words}->${a.words}`);
  if (ch.length) report.push(`CHG   ${p}\n        ` + ch.join("\n        "));
}
for (const p of Object.keys(B)) if (!A[p]) { report.push(`GONE  ${p}`); defects++; }
console.log(report.join("\n"));
// Sitemap diff
const sm = (d) => [...readFileSync(join(d, "sitemap-0.xml"), "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const sb = new Set(sm(before)), sa = sm(after);
console.log("\nSITEMAP added:", sa.filter((u) => !sb.has(u)).join(", ") || "none", "| removed:", [...sb].filter((u) => !sa.includes(u)).join(", ") || "none");
// Duplicates and broken links in the after build
const dup = (f) => { const m = new Map(); for (const [p, i] of Object.entries(A)) { if (!i[f]) continue; (m.get(i[f]) || m.set(i[f], []).get(i[f])).push(p); } return [...m].filter(([, v]) => v.length > 1); };
for (const f of ["title", "desc"]) { const d = dup(f); console.log(`duplicate ${f}s in after build: ${d.length}`); d.forEach(([k, v]) => console.log("   ", k.slice(0, 80), v.join(" "))); }
const dupB = (f) => { const m = new Map(); for (const [p, i] of Object.entries(B)) { if (!i[f]) continue; (m.get(i[f]) || m.set(i[f], []).get(i[f])).push(p); } return [...m].filter(([, v]) => v.length > 1).length; };
console.log(`(duplicates in before build: titles ${dupB("title")}, descriptions ${dupB("desc")})`);
const missing = new Set();
for (const [p, i] of Object.entries(A)) for (const l of i.links) { const t = l.endsWith("/") ? join(after, l, "index.html") : join(after, l); if (!existsSync(t)) missing.add(`${l} (from ${p})`); }
console.log("broken internal link targets in after build:", missing.size); [...missing].slice(0, 20).forEach((x) => console.log("   ", x));
console.log("JSON-LD parse failures:", Object.entries(A).filter(([, i]) => !i.ldOk).map(([p]) => p).join(" ") || "none");
// Inbound contextual (main-body) links to the education pages
for (const tgt of ["/industries/education/", "/industries/education/colleges/"]) {
  const pages = (D) => Object.entries(D).filter(([p, i]) => p !== tgt && i.mainLinks.includes(tgt)).map(([p]) => p);
  const pb = new Set(pages(B)), pa = pages(A);
  console.log(`main-body links to ${tgt}: before ${pb.size} pages, after ${pa.length} pages; new: ${pa.filter((p) => !pb.has(p)).join(" ")}`);
}

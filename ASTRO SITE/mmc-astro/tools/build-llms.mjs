// Regenerates the "Main pages" section of public/llms.txt and writes public/llms-full.txt from a built site.
// Usage: node tools/build-llms.mjs <dist-dir>
// Titles, descriptions and Answer blocks ("In short" lead + who line) are read from the built HTML, so nothing is invented.
// Everything outside the "## Main pages" section of llms.txt is kept as written.
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
const dist = process.argv[2];
if (!dist) { console.error("usage: node tools/build-llms.mjs <dist-dir>"); process.exit(1); }
const SITE = "https://www.mondaymarketing.company";
const sm = readFileSync(join(dist, "sitemap-0.xml"), "utf8");
const urls = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const dec = (s) => s.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;|&#x27;/g, "'");
const text = (s) => dec(s.replace(/<[^>]+>/g, "")).replace(/\s+/g, " ").trim();
function read(u) {
  const p = u.replace(SITE, "");
  const f = join(dist, p, "index.html");
  if (!existsSync(f)) return null;
  const h = readFileSync(f, "utf8");
  const title = text((h.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || "").replace(/\s*\|\s*MMC$/, "");
  const desc = dec((h.match(/<meta name="description" content="([^"]*)"/) || [])[1] || "");
  const lead = (h.match(/class="ans__lead">([\s\S]*?)<\/p>/) || [])[1];
  const who = (h.match(/class="ans__who">([\s\S]*?)<\/p>/) || [])[1];
  return { url: u, path: p, title, desc, answer: [lead, who].filter(Boolean).map(text).join(" ") };
}
const pages = urls.map(read).filter(Boolean);
const group = (p) => {
  if (p.path === "/") return 0;
  if (/^\/(about|careers|contact|privacy|terms)\/?$/.test(p.path) || /^\/careers\//.test(p.path)) return 5;
  if (/^\/work\//.test(p.path) || p.path === "/work/") return 3;
  if (/^\/(guides|tools|glossary|resources)/.test(p.path)) return 4;
  if (/^\/ai-by-mmc/.test(p.path)) return 6;
  if (/^\/(services|industries|audit)/.test(p.path)) return 1;
  return 2;
};
const nice = (p) => (p.path === "/" ? "Home" : p.title);
const listable = pages.filter((p) => !/^\/careers\/.+/.test(p.path) && !/^\/work\/.+/.test(p.path) && !/^\/ai-by-mmc\/.+/.test(p.path) && !/^\/tools\/.+/.test(p.path));
const sections = [[1, "Services, industries and audit"], [2, "White-label and other pages"], [4, "Guides, tools and resources"], [3, "Work"], [5, "Company"], [0, "Home"]];
let main = "## Main pages\n\n";
for (const [g, name] of [[0, ""], ...sections.slice(0, 5)]) {
  const list = listable.filter((p) => group(p) === g);
  if (!list.length) continue;
  if (name) main += `### ${name}\n\n`;
  for (const p of list) main += `- [${nice(p)}](${p.url})${p.desc ? ": " + p.desc : ""}\n`;
  main += "\n";
}
main += "Free tools listed above each have their own page under /tools/. The AI by MMC pages are listed below. Individual client pages are under /work/ and are listed in llms-full.txt.\n\n";
let l = readFileSync("public/llms.txt", "utf8");
const a = l.indexOf("## Main pages"), b = l.indexOf("\n## Services") + 1;
if (a < 0 || b < 0) throw new Error("llms.txt sections not found");
l = l.slice(0, a) + main + l.slice(b);
writeFileSync("public/llms.txt", l);

let full = `# Monday Marketing Company: full page index\n\n> Every public page with its description and, where the page has one, its short answer. Company summary and policies: ${SITE}/llms.txt\n\n`;
for (const p of pages.sort((x, y) => group(x) - group(y) || x.path.localeCompare(y.path))) {
  full += `## ${nice(p)}\n\nURL: ${p.url}\n${p.desc ? "Description: " + p.desc + "\n" : ""}${p.answer ? "Answer: " + p.answer + "\n" : ""}\n`;
}
writeFileSync("public/llms-full.txt", full);
console.log("llms.txt main pages:", listable.length, "| llms-full.txt pages:", pages.length);

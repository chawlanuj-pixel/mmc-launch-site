// SEO report on a built site (Command Centre Phase 4). Dependency-free, read-only, one pass over the HTML.
// Usage: node tools/seo-report.mjs <distDir> [--json] [--fail-on-error] [--limit N]
//   --json            print the full JSON report: { generatedAt, dist, pages, issues: [{ severity, type, url, detail }], summary }
//   --fail-on-error   exit 1 when there is at least one error (default: always exit 0, it only reports)
//   --limit N         text mode: examples printed per issue type (default 5)
// Checks: title (missing, too long, too short, duplicate), meta description (missing, length, duplicate), canonical (missing, not
// absolute, pointing elsewhere), noindex (in the sitemap, or not on the expected private list), img without alt, h1 (missing,
// multiple, duplicate text), JSON-LD that does not parse, broken internal links (targets missing from dist; mailto, tel, # and
// external links ignored; a target that only works through a .htaccess redirect is reported as a warning), .htaccess redirect
// chains, loops, duplicate sources and rules that shadow a built page, and orphan pages (in the sitemap, no inbound internal link).
// Pages under /admin/ and /api/ are tools, not site pages, and are skipped. Severity: error = broken or wrong for search engines;
// warn = worth a look (house length rules: title 60 at most, description 140 to 160).
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, relative, posix } from "node:path";

const args = process.argv.slice(2);
const dist = args.find((a, i) => !a.startsWith("--") && args[i - 1] !== "--limit");
if (!dist) { console.error("usage: node tools/seo-report.mjs <distDir> [--json] [--fail-on-error] [--limit N]"); process.exit(2); }
if (!existsSync(dist)) { console.error(`no such directory: ${dist}`); process.exit(2); }
const JSON_OUT = args.includes("--json");
const FAIL = args.includes("--fail-on-error");
const LIMIT = Number(args[args.indexOf("--limit") + 1]) || 5;
const SITE = "https://www.mondaymarketing.company";
const HOST_RE = /^https?:\/\/(?:www\.)?mondaymarketing\.company(?=\/|$)/i;
const SKIP = /^\/(admin|api)\//;
// noindex is expected on these (private, preview, thank-you, landing pages). Anything else that is noindex is flagged as a warning.
const EXPECTED_NOINDEX = /^\/(pricing-model|preview|thank-you|lp|home-previous|home-v2|home-v2b|admin|404)(\/|$)|^\/404\.html$/;
const t0 = Date.now();

const issues = [];
const add = (severity, type, url, detail) => issues.push({ severity, type, url, detail });
const dec = (s) => String(s || "").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;|&#x27;/g, "'").replace(/&nbsp;/g, " ").replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n));
const text = (s) => dec(String(s || "").replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();

// ---- Walk dist once: every file (for link targets) and every HTML page ----
const files = new Set();
const htmlPages = [];
(function walk(d) {
  for (const n of readdirSync(d)) {
    const p = join(d, n);
    const st = statSync(p);
    if (st.isDirectory()) walk(p);
    else {
      const rel = "/" + relative(dist, p).split("\\").join("/");
      files.add(rel);
      if (n.endsWith(".html")) htmlPages.push({ file: p, rel });
    }
  }
})(dist);
const pathOfHtml = (rel) => rel.endsWith("/index.html") ? rel.slice(0, -"index.html".length) : rel;
const exists = (p) => files.has(p) || files.has(p.endsWith("/") ? p + "index.html" : p + "/index.html");

// ---- Sitemap ----
const smUrls = [];
for (const n of [...files].filter((f) => /^\/sitemap-\d+\.xml$/.test(f))) {
  for (const m of readFileSync(join(dist, n), "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)) smUrls.push(dec(m[1]).trim());
}
const smPaths = new Set(smUrls.map((u) => u.replace(HOST_RE, "") || "/"));

// ---- .htaccess redirect rules ----
const rules = [];
const htFile = join(dist, ".htaccess");
if (existsSync(htFile)) {
  let cond = false, n = 0;
  for (const line of readFileSync(htFile, "utf8").split("\n")) {
    n++;
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    if (/^RewriteCond\b/i.test(t)) { cond = true; continue; }
    const m = t.match(/^RewriteRule\s+(\S+)\s+(\S+)\s+\[([^\]]*)\]/i);
    if (m) {
      const rm = m[3].match(/\bR(?:=(\d+))?\b/);
      if (rm) {
        let re = null;
        try { re = new RegExp(m[1].replace(/\\ /g, " ")); } catch {}
        rules.push({ line: n, pattern: m[1], target: m[2], status: Number(rm[1] || 302), re, conditional: cond });
      }
    }
    cond = false;
  }
}
const ruleFor = (pathNoSlash, except) => rules.find((r) => r !== except && !r.conditional && r.re && r.re.test(pathNoSlash));

// ---- Per page ----
const pages = [];
const titles = new Map(), descs = new Map(), h1s = new Map();
const inbound = new Map();
const pushMap = (m, k, v) => { if (!k) return; if (!m.has(k)) m.set(k, []); m.get(k).push(v); };
const brokenSeen = new Set();

for (const { file, rel } of htmlPages) {
  const url = pathOfHtml(rel);
  if (SKIP.test(url)) continue;
  const h = readFileSync(file, "utf8");
  const body = h.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<noscript[\s\S]*?<\/noscript>|<template[\s\S]*?<\/template>/g, "");
  const robots = (h.match(/<meta name="robots" content="([^"]*)"/) || [])[1] || "";
  const noindex = /noindex/i.test(robots);
  const title = text((h.match(/<title>([\s\S]*?)<\/title>/) || [])[1]);
  const desc = dec((h.match(/<meta name="description" content="([^"]*)"/) || [])[1] || "").trim();
  const canon = (h.match(/<link rel="canonical" href="([^"]*)"/) || [])[1] || "";
  const inSitemap = smPaths.has(url);
  pages.push({ url, noindex, inSitemap });

  // Title and description
  if (!title) add("error", "title-missing", url, "no <title>");
  else if (!noindex) {
    if (title.length > 60) add("warn", "title-too-long", url, `${title.length} chars: ${title}`);
    else if (title.length < 20) add("warn", "title-too-short", url, `${title.length} chars: ${title}`);
    pushMap(titles, title, url);
  }
  if (!desc) add(noindex ? "warn" : "error", "description-missing", url, "no meta description");
  else if (!noindex) {
    if (desc.length > 160) add("warn", "description-too-long", url, `${desc.length} chars`);
    else if (desc.length < 140) add("warn", "description-too-short", url, `${desc.length} chars (house rule 140 to 160)`);
    pushMap(descs, desc, url);
  }

  // Canonical and robots
  if (!canon) add(noindex ? "warn" : "error", "canonical-missing", url, "no rel=canonical");
  else if (!/^https:\/\//.test(canon)) add("error", "canonical-not-absolute", url, canon);
  else if (!noindex && canon !== SITE + url) add("warn", "canonical-elsewhere", url, `canonical is ${canon}`);
  if (noindex && inSitemap) add("error", "noindex-in-sitemap", url, `robots "${robots}" but listed in the sitemap`);
  else if (noindex && !EXPECTED_NOINDEX.test(url)) add("warn", "unintended-noindex", url, `robots "${robots}"`);

  // Headings
  const h1List = [...body.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/g)].map((m) => text(m[1]));
  if (!h1List.length) add("error", "h1-missing", url, "no <h1>");
  else if (h1List.length > 1) add("error", "h1-multiple", url, `${h1List.length} h1: ${h1List.map((x) => x.slice(0, 50)).join(" | ")}`);
  if (h1List.length && !noindex) pushMap(h1s, h1List[0].toLowerCase(), url);

  // Images
  for (const m of body.matchAll(/<img\b([^>]*)>/g)) {
    if (!/\balt(?=\s*=|[\s>\/]|$)/.test(m[1])) add("error", "img-alt-missing", url, (m[1].match(/\bsrc="([^"]*)"/) || [])[1] || "(no src)");
  }

  // JSON-LD
  [...h.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].forEach((m, i) => {
    try { JSON.parse(m[1]); } catch (e) { add("error", "jsonld-invalid", url, `block ${i + 1}: ${e.message}`); }
  });

  // Internal links
  for (const m of body.matchAll(/<a\b[^>]*?\bhref="([^"]*)"/g)) {
    let u = dec(m[1]).trim();
    if (!u || /^(#|mailto:|tel:|javascript:|data:|sms:|whatsapp:)/i.test(u)) continue;
    if (/^(https?:)?\/\//i.test(u)) { if (!HOST_RE.test(u)) continue; u = u.replace(HOST_RE, "") || "/"; }
    let p = u.split("#")[0].split("?")[0];
    if (!p) continue;
    if (!p.startsWith("/")) p = posix.normalize(posix.join(url.endsWith("/") ? url : posix.dirname(url) + "/", p));
    try { p = decodeURI(p); } catch {}
    const target = p.endsWith("/") || /\.[a-z0-9]{2,5}$/i.test(p) ? p : p + "/";
    if (target !== url) pushMap(inbound, target, url);
    if (exists(p)) continue;
    const key = url + " " + p;
    if (brokenSeen.has(key)) continue;
    brokenSeen.add(key);
    const r = ruleFor(p.replace(/^\//, ""));
    if (r) add("warn", "link-to-redirect", url, `${p} only works through the .htaccess redirect on line ${r.line} (to ${r.target})`);
    else add("error", "broken-link", url, `${p} does not exist in the build`);
  }
}

// ---- Site-wide duplicates ----
for (const [t, urls] of titles) if (urls.length > 1) for (const u of urls) add("warn", "title-duplicate", u, `"${t}" also on ${urls.filter((x) => x !== u).slice(0, 3).join(", ")}${urls.length > 4 ? " ..." : ""}`);
for (const [d, urls] of descs) if (urls.length > 1) for (const u of urls) add("warn", "description-duplicate", u, `same description as ${urls.filter((x) => x !== u).slice(0, 3).join(", ")}${urls.length > 4 ? " ..." : ""}`);
for (const [t, urls] of h1s) if (urls.length > 1) for (const u of urls) add("warn", "h1-duplicate", u, `h1 "${t.slice(0, 60)}" also on ${urls.filter((x) => x !== u).slice(0, 3).join(", ")}`);

// ---- Redirects: duplicates, loops, chains, shadowed pages ----
const seenPattern = new Map();
for (const r of rules) {
  if (r.conditional) continue;
  if (seenPattern.has(r.pattern)) add("warn", "redirect-duplicate", "/.htaccess", `line ${r.line} repeats the source ${r.pattern} of line ${seenPattern.get(r.pattern)} (the first one wins)`);
  else seenPattern.set(r.pattern, r.line);
}
for (const r of rules) {
  if (r.conditional || !r.re || /\$\d/.test(r.target)) continue;
  const hops = [r];
  let cur = r, verdict = null;
  for (let i = 0; i < 10; i++) {
    if (/^https?:\/\//i.test(cur.target) && !HOST_RE.test(cur.target)) break; // external: ends here
    const tp = (cur.target.replace(HOST_RE, "") || "/").split("?")[0].replace(/^\//, "");
    const next = ruleFor(tp, null);
    if (!next) break;
    if (hops.includes(next)) { verdict = "loop"; hops.push(next); break; }
    hops.push(next); cur = next;
  }
  const desc = hops.map((x) => `line ${x.line} ${x.pattern} -> ${x.target}`).join("  then  ");
  if (verdict === "loop") add("error", "redirect-loop", "/.htaccess", desc);
  else if (hops.length > 1) add("warn", "redirect-chain", "/.htaccess", `${hops.length} hops: ${desc}`);
}
for (const p of pages) {
  const r = ruleFor(p.url.replace(/^\//, ""));
  if (r) add(p.inSitemap ? "error" : "warn", "redirect-shadows-page", p.url, `.htaccess line ${r.line} (${r.pattern} -> ${r.target}) redirects this built page away`);
}

// ---- Orphans: in the sitemap, no inbound internal link from another page ----
for (const p of pages) if (p.inSitemap && p.url !== "/" && !(inbound.get(p.url) || []).length) add("warn", "orphan-page", p.url, "listed in the sitemap but no other page links to it");
for (const u of smPaths) if (!pages.some((p) => p.url === u)) add("error", "sitemap-url-missing", u, "in the sitemap but not built");

// ---- Output ----
const byType = {};
for (const x of issues) { const k = x.type; byType[k] ||= { severity: x.severity, count: 0 }; byType[k].count++; if (x.severity === "error") byType[k].severity = "error"; }
const errors = issues.filter((x) => x.severity === "error").length;
const report = {
  generatedAt: new Date().toISOString(),
  dist,
  pages: pages.length,
  issues,
  summary: {
    pages: pages.length, indexable: pages.filter((p) => !p.noindex).length, noindex: pages.filter((p) => p.noindex).length,
    sitemapUrls: smPaths.size, redirectRules: rules.length, errors, warnings: issues.length - errors,
    byType, ms: Date.now() - t0,
  },
};
if (JSON_OUT) console.log(JSON.stringify(report, null, 1));
else {
  const order = Object.entries(byType).sort((a, b) => (a[1].severity === b[1].severity ? b[1].count - a[1].count : a[1].severity === "error" ? -1 : 1));
  for (const [type, v] of order) {
    console.log(`${v.severity.toUpperCase().padEnd(5)} ${type}: ${v.count}`);
    for (const x of issues.filter((i) => i.type === type).slice(0, LIMIT)) console.log(`      ${x.url}  ${x.detail}`);
    if (v.count > LIMIT) console.log(`      ... ${v.count - LIMIT} more (--json for all)`);
  }
  const s = report.summary;
  console.log(`\n${s.pages} pages (${s.indexable} indexable, ${s.noindex} noindex), ${s.sitemapUrls} sitemap URLs, ${s.redirectRules} redirect rules: ${s.errors} errors, ${s.warnings} warnings in ${s.ms} ms`);
}
process.exit(FAIL && errors ? 1 : 0);

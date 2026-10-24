// Pre-launch checks on a built site. Usage: node tools/v2-check.mjs <dist-dir> [--json]
// Per page: one h1, title <= 60, description 140-160, canonical self-consistent (absolute, trailing slash, matches the page path),
// hreflang, JSON-LD parses, no internal .html hrefs, no em dash in visible text, no broken /assets /_astro refs.
// Site: sitemap holds only canonical, indexable URLs; robots.txt keeps the named allow rules and states the training-bot decision.
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, relative } from "node:path";
const dist = process.argv[2];
if (!dist) { console.error("usage: node tools/v2-check.mjs <dist-dir>"); process.exit(2); }
const SITE = "https://www.mondaymarketing.company";
const fails = []; const notes = [];
const fail = (page, msg) => fails.push({ page, msg });

const files = [];
(function walk(d) { for (const n of readdirSync(d)) { const p = join(d, n); statSync(p).isDirectory() ? walk(p) : n === "index.html" && files.push(p); } })(dist);
const EM = new RegExp(String.fromCharCode(8212));
const dec = (s) => s.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;|&#x27;/g, "'");
const pathOf = (f) => "/" + relative(dist, f).replace(/index\.html$/, "");
const pageMap = new Map();

for (const f of files) {
  const path = pathOf(f);
  if (path.startsWith("/admin/") || path.startsWith("/assessment/") || path.startsWith("/candidate/")) continue;   // private tool pages, not marketing pages
  const h = readFileSync(f, "utf8");
  const noindex = /<meta name="robots" content="[^"]*noindex/.test(h);
  // Private pricing pages are intentionally noindex (and absent from the sitemap): require the full directive, skip the hreflang rule below.
  if (path.startsWith("/pricing-model/") && !/<meta name="robots" content="noindex, nofollow, noarchive"/.test(h)) fail(path, "private pricing page must be noindex, nofollow, noarchive");
  const body = h.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<noscript[\s\S]*?<\/noscript>/g, "");
  const h1 = (body.match(/<h1[\s>]/g) || []).length;
  if (h1 !== 1) fail(path, `h1 count is ${h1}`);
  const title = dec((h.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || "");
  if (!title) fail(path, "missing title"); else if (title.length > 60) fail(path, `title ${title.length} chars: ${title}`);
  const desc = dec((h.match(/<meta name="description" content="([^"]*)"/) || [])[1] || "");
  if (!desc) fail(path, "missing description"); else if (!noindex && (desc.length < 140 || desc.length > 160)) fail(path, `description ${desc.length} chars`); // noindex pages (thank-you, previews, private pricing) are not search results
  const canon = (h.match(/<link rel="canonical" href="([^"]*)"/) || [])[1];
  if (!canon) fail(path, "missing canonical");
  else {
    if (!noindex && canon !== SITE + path) fail(path, `canonical ${canon} does not match ${SITE + path}`); // a noindex preview may point at the real page
    if (!canon.endsWith("/")) fail(path, "canonical has no trailing slash");
  }
  pageMap.set(SITE + path, { noindex, canon });
  // /white-label/* uses plain "en" (owner decision 22 Oct 2026, BaseLayout); everything else stays en-IN. html lang must agree with hreflang.
  const wantLang = /^\/white-label(\/|$)/.test(path) ? "en" : "en-IN";
  if (!noindex && !new RegExp(`hreflang="${wantLang}" href="[^"]+"`).test(h)) fail(path, `missing hreflang ${wantLang}`);
  if (!noindex && !new RegExp(`<html lang="${wantLang}"[\\s>]`).test(h)) fail(path, `html lang is not ${wantLang}`);
  if (wantLang === "en" && /og:locale" content="en_IN"|hreflang="en-IN"/.test(h)) fail(path, "white-label page still carries an India locale tag");
  [...h.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].forEach((m, i) => {
    try { JSON.parse(m[1]); } catch (e) { fail(path, `JSON-LD block ${i} does not parse`); }
  });
  for (const m of body.matchAll(/\bhref="([^"]*)"/g)) {
    const u = m[1].split("#")[0].split("?")[0];
    if (!u || /^(https?:|mailto:|tel:|\/\/|javascript:)/.test(u)) { if (u.startsWith(SITE) && u.endsWith(".html")) fail(path, `internal .html href ${u}`); continue; }
    if (/\.html$/i.test(u)) fail(path, `internal .html href ${u}`);
  }
  const visible = dec(body.replace(/<[^>]+>/g, " "));
  if (EM.test(visible) || EM.test(title + desc)) fail(path, "em dash in visible text, title or description");
  const seen = new Set();
  for (const m of h.matchAll(/(?:src|href|poster)="(\/(?:assets|_astro|admin)\/[^"?#]+)/g)) {
    const u = decodeURIComponent(m[1]);
    if (seen.has(u)) continue; seen.add(u);
    if (!existsSync(join(dist, u))) fail(path, `broken asset ${u}`);
  }
  for (const m of h.matchAll(/(?:imagesrcset|srcset)="([^"]+)"/g)) for (const part of m[1].split(",")) {
    const u = part.trim().split(/\s+/)[0];
    if (u.startsWith("/") && !seen.has(u) && !existsSync(join(dist, decodeURIComponent(u)))) { seen.add(u); fail(path, `broken asset ${u}`); }
  }
}

// Sitemap
const smFiles = readdirSync(dist).filter((n) => /^sitemap-\d+\.xml$/.test(n));
const smUrls = smFiles.flatMap((n) => [...readFileSync(join(dist, n), "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]));
if (!smUrls.length) fail("sitemap", "no sitemap-N.xml found");
for (const u of smUrls) {
  const p = pageMap.get(u);
  if (!p) fail("sitemap", `${u} has no built page`);
  else {
    if (p.noindex) fail("sitemap", `${u} is noindex`);
    if (p.canon !== u) fail("sitemap", `${u} canonical is ${p.canon}`);
  }
  if (!u.endsWith("/")) fail("sitemap", `${u} lacks trailing slash`);
}
if (!/<lastmod>/.test(smFiles.map((n) => readFileSync(join(dist, n), "utf8")).join(""))) fail("sitemap", "no lastmod");
const missing = [...pageMap].filter(([u, p]) => !p.noindex && !smUrls.includes(u)).map(([u]) => u);
if (missing.length) notes.push(`indexable pages not in sitemap (check they are meant to be hidden): ${missing.join(", ")}`);

// robots.txt
const robots = existsSync(join(dist, "robots.txt")) ? readFileSync(join(dist, "robots.txt"), "utf8") : "";
const groups = robots.split(/\n\s*\n/).map((g) => g.split("\n").filter((l) => !l.startsWith("#") && l.trim()));
const rule = (ua) => { const g = groups.find((g) => g.some((l) => l.toLowerCase() === `user-agent: ${ua.toLowerCase()}`)); return g ? (g.some((l) => /^disallow:\s*\/\s*$/i.test(l)) ? "blocked" : g.some((l) => /^allow:\s*\//i.test(l)) ? "allowed" : "no rule") : "MISSING"; };
for (const ua of ["Googlebot", "Bingbot", "OAI-SearchBot", "ChatGPT-User", "PerplexityBot", "Claude-SearchBot", "Claude-User"]) if (rule(ua) !== "allowed") fail("robots.txt", `${ua}: ${rule(ua)} (expected a named allow)`);
notes.push("training bots (policy as stated in robots.txt, unchanged): " + ["GPTBot", "Google-Extended", "ClaudeBot", "CCBot"].map((u) => `${u}=${rule(u)}`).join(", "));
if (!/^Sitemap:\s*\S+/m.test(robots)) fail("robots.txt", "no Sitemap line");

const byPage = {};
for (const x of fails) (byPage[x.page] ||= []).push(x.msg);
if (process.argv.includes("--json")) console.log(JSON.stringify({ pages: pageMap.size, fails, notes }, null, 1));
else {
  for (const [p, m] of Object.entries(byPage)) { console.log(p); m.forEach((x) => console.log("  - " + x)); }
  notes.forEach((n) => console.log("note: " + n));
  console.log(`\n${pageMap.size} pages, ${smUrls.length} sitemap URLs, ${fails.length} failures on ${Object.keys(byPage).length} pages`);
}
process.exit(fails.length ? 1 : 0);

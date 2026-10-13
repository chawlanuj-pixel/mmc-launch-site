// Data isolation audit for the private pricing pages. Usage: node tools/pricing-leak-check.mjs <dist-dir>
// Asserts, on a finished build, that each of the three pages (and every JS/CSS asset it loads) carries only its own audience's prices,
// that no internal costing key is shipped, and that nothing else on the site, nor the sitemap, llms files or robots.txt, points at the pages.
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, relative, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { listValues, buildAudience } from "../src/lib/pricing.mjs";

const dist = process.argv[2];
if (!dist) { console.error("usage: node tools/pricing-leak-check.mjs <dist-dir>"); process.exit(2); }
const COUNTRIES = JSON.parse(readFileSync(new URL("../src/data/pricing/links.json", import.meta.url), "utf8")).countries;
const SHORT = { "United States": "US", "United Kingdom": "UK", "United Arab Emirates": "UAE" };
const links = JSON.parse(readFileSync(new URL("../src/data/pricing/links.json", import.meta.url), "utf8")).tokens;
const AUD = { india: links.india, international: links.international, whitelabelIndia: links.whitelabelIndia, whitelabelInternational: links.whitelabelInternational };
const CUROF = { india: "inr", international: "usd", whitelabelIndia: "inr", whitelabelInternational: "usd" };
const isWl = (a) => a.startsWith("whitelabel");
const TOKENS = Object.values(AUD);
const fails = [];
const notes = [];
const fail = (where, msg) => fails.push(`${where}: ${msg}`);
let checks = 0;
const ok = (cond, where, msg) => { checks++; if (!cond) fail(where, msg); };

/* ── numbers ─────────────────────────────────────────────── */
const list = listValues();
const wlDataBy = { inr: buildAudience("whitelabelIndia"), usd: buildAudience("whitelabelInternational") };
const wlNums = { inr: new Set(), usd: new Set() };
const allThreshold = new Set();
for (const cur of ["inr", "usd"]) {
  const wlData = wlDataBy[cur];
  for (const s of wlData.sections.concat([{ items: wlData.standardRates.items }])) for (const it of s.items) {
    const p = it.pr[cur];
    for (const k of ["p", "pMax", "min", "minPiece", "minProgramme", "threshold"]) if (typeof p[k] === "number") wlNums[cur].add(p[k]);
    if (p.threshold) allThreshold.add(p.threshold);
  }
  for (const k of Object.keys(wlData.tokens)) if (wlData.tokens[k][cur] !== undefined) wlNums[cur].add(wlData.tokens[k][cur]);
}
// Percentages, spend thresholds and counts are not prices and are the same on every audience, so they are never "leaks".
const allList = new Set([...list.inr, ...list.usd]);
const allWl = new Set([...wlNums.inr, ...wlNums.usd]);
// Allowed figures per audience: list prices, plus derived tokens (minimums, a typical shoot day) and spend thresholds, which are not prices.
const derived = new Set();
const A = { india: { inr: new Set(list.inr) }, international: { usd: new Set(list.usd) }, whitelabelIndia: { inr: new Set(wlNums.inr) }, whitelabelInternational: { usd: new Set(wlNums.usd) } };
for (const aud of ["india", "international"]) {
  const d = buildAudience(aud);
  const cur = CUROF[aud];
  const set = A[aud][cur];
  for (const k of Object.keys(d.tokens)) { set.add(d.tokens[k][cur]); derived.add(d.tokens[k][cur]); }
  for (const s of d.sections) for (const it of s.items) { const p = it.pr[cur]; for (const k of ["p", "pMax", "min", "minPiece", "minProgramme", "threshold"]) if (typeof p[k] === "number") { set.add(p[k]); if (k === "threshold") derived.add(p[k]); } }
}
// Figures quoted in the section notes (video editing ranges) are the owner's own wording for that audience.
const noteFigures = {};
for (const aud of Object.keys(AUD)) for (const cur of ["inr", "usd"]) {
  const set = (noteFigures[aud + cur] = new Set());
  for (const sec of buildAudience(aud).sections) for (const n of sec.notes || []) for (const m of n.matchAll(/(Rs\.|\$)([\d,]+)/g)) if ((m[1] === "Rs." ? "inr" : "usd") === cur) set.add(+m[2].replace(/,/g, ""));
}
const decodeProps = (h) => (h.match(/props="[^"]*"/g) || []).join(" ").replace(/&quot;/g, '"').replace(/&amp;/g, "&");
const indian = (n) => { const s = String(Math.trunc(n)); if (s.length <= 3) return s; const head = s.slice(0, -3).replace(/\B(?=(\d\d)+(?!\d))/g, ","); return head + "," + s.slice(-3); };
const western = (n) => Math.trunc(n).toLocaleString("en-US");
function forms(n) {
  const out = new Set([String(n), indian(n), western(n)]);
  if (!Number.isInteger(n)) out.add(n.toFixed(2));
  return [...out];
}
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
/** Is the number present as a standalone figure? Small numbers (under 100) only count with a currency symbol in front. */
function hasNumber(text, n) {
  const f = forms(n);
  if (n < 100) return f.some((x) => new RegExp("(?:Rs\\.|\\$|US\\$)\\s?" + esc(x) + "(?![\\d,]|\\.\\d)").test(text));
  return f.some((x) => new RegExp("(?<![\\d,.])" + esc(x) + "(?![\\d,]|\\.\\d)").test(text));
}

/* ── build tree helpers ──────────────────────────────────── */
const htmlFiles = [];
(function walk(d) { for (const n of readdirSync(d)) { const p = join(d, n); statSync(p).isDirectory() ? walk(p) : n.endsWith(".html") && htmlFiles.push(p); } })(dist);
const pathOf = (f) => "/" + relative(dist, f).replace(/index\.html$/, "");
const read = (p) => readFileSync(p, "utf8");

function assetsOf(html) {
  const found = new Set();
  const queue = [];
  const add = (u) => { u = u.split("?")[0].split("#")[0]; if (/^\/_astro\/.+\.(js|css)$/.test(u) && !found.has(u)) { found.add(u); queue.push(u); } };
  for (const m of html.matchAll(/(?:href|src|component-url|renderer-url|before-hydration-url)="([^"]+\.(?:js|css))"/g)) add(m[1]);
  for (const m of html.matchAll(/import\s*\(?\s*["'](\/_astro\/[^"']+\.js)["']/g)) add(m[1]);
  while (queue.length) {
    const u = queue.pop();
    const f = join(dist, u);
    if (!existsSync(f)) continue;
    const src = read(f);
    for (const m of src.matchAll(/["'](\.{1,2}\/[^"']+\.(?:js|css))["']/g)) add(resolve(dirname(u), m[1]));
    for (const m of src.matchAll(/["'](\/_astro\/[^"']+\.(?:js|css))["']/g)) add(m[1]);
  }
  return [...found];
}

/* ── per-page checks ─────────────────────────────────────── */
const INTERNAL_KEYS = [/"hours"\s*:/, /internal-man-hours/, /minYield/, /whiteLabelFactor/, /enforceFloor/, /margin-config/, /"internal"\s*:/];
const pageInfo = {};
for (const [aud, token] of Object.entries(AUD)) {
  const f = join(dist, "pricing-model", token, "index.html");
  const where = "page " + aud;
  ok(existsSync(f), where, "built page missing");
  if (!existsSync(f)) continue;
  const html = read(f);
  const assets = assetsOf(html);
  const own = assets.filter((a) => /pc-stepper|pc-tool|PricingConfigurator|pc-sum/.test(read(join(dist, a))) || /pricing/i.test(a));
  pageInfo[aud] = { assets, own };
  const texts = [["html", html], ...assets.map((a) => [a, read(join(dist, a))])];
  const pricingTexts = [["html", html], ...own.map((a) => [a, read(join(dist, a))])];

  // meta
  ok(/<meta name="robots" content="noindex, nofollow, noarchive"/.test(html), where, "robots meta is not 'noindex, nofollow, noarchive'");
  ok(new RegExp(`<link rel="canonical" href="https://www\\.mondaymarketing\\.company/pricing-model/${token}/"`).test(html), where, "canonical is not itself");
  ok(!/"@type":"Offer"|"price"|priceCurrency/.test(html), where, "Offer or price markup found");

  // other tokens
  for (const [a2, t2] of Object.entries(AUD)) if (a2 !== aud) for (const [n, t] of texts) ok(!t.includes(t2), where, `${n} contains the ${a2} token`);

  // internal costing keys, everywhere the page loads
  for (const [n, t] of texts) for (const re of INTERNAL_KEYS) ok(!re.test(t), where, `${n} matches internal key ${re}`);

  // currency text
  const visible = html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, " ");
  if (CUROF[aud] === "usd") {
    for (const [n, t] of pricingTexts) {
      const src = n === "html" ? visible + " " + decodeProps(html) : t;
      ok(!/Rs\.|₹|\bINR\b|\bGST\b|[Rr]upee/.test(src), where, `${n} contains rupee or GST text: ${(src.match(/.{0,30}(Rs\.|₹|\bINR\b|\bGST\b|[Rr]upee).{0,30}/) || [""])[0].trim()}`);
    }
    for (const [n, t] of texts.slice(1)) if (/Rs\.|₹|\bINR\b|\bGST\b/.test(t) && !own.includes(n)) notes.push(`${where}: shared site asset ${n} mentions rupee or GST text (identical on every page of the site)`);
    if (/Rs\.|₹|\bINR\b|\bGST\b/.test(visible)) { /* covered above via html */ }
  }
  if (CUROF[aud] === "inr") {
    for (const [n, t] of pricingTexts) {
      const src = n === "html" ? visible + " " + decodeProps(html) : t;
      ok(!/US\$|\bUSD\b|\$\s?\d|[Dd]ollar/.test(src), where, `${n} contains dollar text: ${(src.match(/.{0,30}(US\$|\bUSD\b|\$\s?\d|[Dd]ollar).{0,30}/) || [""])[0].trim()}`);
    }
    for (const [n, t] of texts.slice(1)) if (/US\$|\bUSD\b/.test(t) && !own.includes(n)) notes.push(`${where}: shared site asset ${n} mentions dollar text (identical on every page of the site)`);
  }

  // wording: US$ pages name their markets instead of "International"; India pages name no other country. Scope is the page's own
  // content (the <main> element, the title and the island props), because the shared nav and footer are identical on every page of the site.
  const mainHtml = (html.match(/<main[\s\S]*<\/main>/) || [html])[0].replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, " ");
  const ownText = mainHtml + " " + (html.match(/<title>[\s\S]*?<\/title>/) || [""])[0] + " " + decodeProps(html);
  if (CUROF[aud] === "usd") {
    ok(!/\bInternational\b/.test(ownText), where, "contains the word International: " + (ownText.match(/.{0,30}\bInternational\b.{0,30}/) || [""])[0]);
    ok(COUNTRIES.every((c) => ownText.includes(SHORT[c] || c)), where, "does not name every market");
  } else {
    const others = COUNTRIES.filter((c) => c !== "India");
    const hit = new RegExp(others.map(esc).join("|") + "|\\bUAE\\b|\\bUK\\b|\\bUS\\b").exec(ownText);
    ok(!hit, where, "India page names another country: " + (hit && hit[0]));
  }

  // numbers: every money figure on the page (visible text and island props) must belong to this audience.
  const props = decodeProps(html).replace(/"qty":\[0,\{[^}]*\}\]/g, "").replace(/"minTotalQty":\[0,\{[\s\S]*?"message":\[0,"[^"]*"\]\}\]/g, "");
  const priceNums = [...props.matchAll(/"(?:p|pMax|min|minPiece|minProgramme|threshold|minProject|shootDay)":\[0,([\d.]+)\]|"(?:p|pMax|min|minPiece|minProgramme|threshold|minProject|shootDay)":([\d.]+)/g)].map((m) => +(m[1] ?? m[2]));
  const money = [...visible.matchAll(/(Rs\.|\$)\s?([\d,]+(?:\.\d+)?)/g)].map((m) => ({ cur: m[1] === "Rs." ? "inr" : "usd", n: +m[2].replace(/,/g, "") }));
  const allowed = (cur) => {
    const set = cur === CUROF[aud] ? A[aud][cur] : new Set();
    return { has: (n) => n === 0 || set.has(n) || noteFigures[aud + cur]?.has(n) };
  };
  for (const { cur, n } of money) ok(allowed(cur).has(n), where, `visible ${cur === "inr" ? "Rs." : "$"}${n} is not one of this audience's figures`);
  const own1 = A[aud][CUROF[aud]];
  for (const n of priceNums) ok(n === 0 || own1.has(n), where, `island price ${n} is not one of this audience's figures`);
  // explicit negatives
  if (isWl(aud)) {
    const ownCur = CUROF[aud];
    const clientOnly = list[ownCur].filter((n) => !wlNums[ownCur].has(n));
    for (const n of clientOnly) ok(!money.some((m) => m.n === n) && !priceNums.includes(n), where, `client-facing list value ${n} appears`);
  } else {
    const wlOnly = [...allWl].filter((n) => !allList.has(n) && !derived.has(n) && !allThreshold.has(n));
    for (const n of wlOnly) ok(!money.some((m) => m.n === n) && !priceNums.includes(n), where, `white-label value ${n} appears`);
  }
  // the pricing script holds no figures at all: it is the same file on all three pages
  for (const a of own.filter((x) => x.endsWith(".js"))) ok(!/Rs\.|US\$|\u20B9|\bGST\b|\bINR\b|\bUSD\b/.test(read(join(dist, a))), where, `${a} contains a currency literal`);
}

/* ── site-wide: nothing links to or mentions the pages ───── */
const NEEDLE = new RegExp(`${TOKENS.map(esc).join("|")}|/pricing-model/|pricing-model(?![s-])`);
let scanned = 0;
const pricingDir = "/pricing-model/";
for (const f of htmlFiles) {
  const p = pathOf(f);
  if (p.startsWith(pricingDir)) continue;
  scanned++;
  const t = read(f);
  const m = t.match(NEEDLE);
  ok(!m, "site " + p, `mentions ${m && m[0]}`);
}
const mustBeClean = ["sitemap-index.xml", "robots.txt", "llms.txt", "llms-full.txt", "_redirects"];
for (const n of readdirSync(dist).filter((x) => /^sitemap-\d+\.xml$/.test(x))) mustBeClean.push(n);
for (const n of mustBeClean) {
  const f = join(dist, n);
  if (!existsSync(f)) { if (n !== "_redirects") notes.push(`${n} not found in the build`); continue; }
  const t = read(f);
  const m = t.match(NEEDLE);
  ok(!m, n, `mentions ${m && m[0]}`);
}
// Every JS and CSS asset that no pricing page loads must be free of the tokens and the path.
const pricingAssets = new Set(Object.values(pageInfo).flatMap((i) => i.assets));
const astroDir = join(dist, "_astro");
let assetScanned = 0;
if (existsSync(astroDir)) for (const n of readdirSync(astroDir)) {
  if (!/\.(js|css)$/.test(n)) continue;
  const t = read(join(astroDir, n));
  assetScanned++;
  const m = t.match(NEEDLE);
  ok(!m, "/_astro/" + n, `mentions ${m && m[0]}`);
}
// No index page for the folder
ok(!existsSync(join(dist, "pricing-model", "index.html")), "folder", "/pricing-model/ has an index page");
const folder = existsSync(join(dist, "pricing-model")) ? readdirSync(join(dist, "pricing-model")) : [];
ok(folder.length === TOKENS.length && folder.every((x) => TOKENS.includes(x)), "folder", `unexpected entries in /pricing-model/: ${folder.join(", ")}`);

/* ── menu, footer and site data: source level ────────────── */
function walkSrc(d, out = []) { for (const n of readdirSync(d)) { const p = join(d, n); if (statSync(p).isDirectory()) walkSrc(p, out); else out.push(p); } return out; }
const srcRoot = fileURLToPath(new URL("../src/", import.meta.url));
const menuFiles = walkSrc(join(srcRoot, "components")).concat(walkSrc(join(srcRoot, "lib")), walkSrc(join(srcRoot, "data")).filter((p) => !p.includes("/data/pricing/")));
let menuScanned = 0;
for (const f of menuFiles) {
  if (/pricing/.test(f) && /lib\/pricing/.test(f)) continue;
  menuScanned++;
  const t = read(f);
  const m = t.match(NEEDLE);
  ok(!m, "source " + relative(srcRoot, f), `mentions ${m && m[0]}`);
}
const publicHt = fileURLToPath(new URL("../public/", import.meta.url));
for (const n of ["robots.txt", "llms.txt", "llms-full.txt"]) {
  const f = join(publicHt, n);
  if (existsSync(f)) ok(!NEEDLE.test(read(f)), "public/" + n, "mentions the pricing pages");
}

/* ── report ──────────────────────────────────────────────── */
console.log("Pricing pages and the assets each loads");
for (const [a, i] of Object.entries(pageInfo)) console.log(`  ${a.padEnd(14)} /pricing-model/${AUD[a]}/  ${i.assets.length} assets (${i.own.length} pricing-specific: ${i.own.map((x) => x.split("/").pop()).join(", ")})`);
console.log(`Scanned ${scanned} other HTML pages, ${assetScanned} JS/CSS assets, sitemap files, llms files, robots.txt, _redirects and ${menuScanned} source files (menu, footer, lib, data).`);
notes.forEach((n) => console.log("note: " + n));
fails.forEach((f) => console.log("FAIL " + f));
console.log(`\n${checks} assertions, ${fails.length} failures`);
process.exit(fails.length ? 1 : 0);

#!/usr/bin/env node
// style-lint: catches design-system drift in new CSS. Spec: DESIGN-CONSISTENCY.md (repo root).
//
// Usage
//   node tools/style-lint.mjs                 ranked report, exit 0 unless there are hard errors
//   node tools/style-lint.mjs --all           also list every legacy warning (default shows the top files only)
//   node tools/style-lint.mjs --json          machine-readable output
//   node tools/style-lint.mjs --update-baseline   accept today's findings in strict files as the baseline
//
// What it scans: src/styles/*.css and every <style> block in src/components, src/pages and src/layouts (.astro).
//
// Rules (W = warning, E = hard error)
//   font     W  font-family names a face directly instead of var(--font-display|body|serif|mono)
//            E  font-family names a face that is not Raleway, Nunito, a generic family or a system fallback (a new font)
//   hex      W  a hex colour that is not in the token palette (colors_and_type.css + home26.css :root + the status colours)
//            E  ...when it is NEW (not in tools/style-lint.baseline.json) in a STRICT file
//   ease     W  a cubic-bezier() literal instead of var(--ease), var(--ease-out), var(--ease-in-out) or var(--ease-soft)
//            E  ...when it is NEW in a STRICT file
//   tap      W  an interactive selector (btn, button, chip, pill, tab, link, cta, summary, pin, toggle) sets height or
//               min-height below 44px outside a (pointer: fine) / (hover: hover) block
//            E  ...when it is NEW in a STRICT file
//
// STRICT files are the redesigned families the consistency pass aligned (see STRICT below). Everything else is legacy:
// it is reported, ranked, and never fails the run.
//
// ALLOWLIST: platform mock-ups must reproduce real interfaces (Meta, Google, Amazon, Shopify, WhatsApp, Blinkit, Zepto,
// Instamart...), so the svc2 panels and visuals, the case-study device frames and the Ads Manager mock-ups may use any
// hex colour. They are still checked for fonts, easings and tap targets.
import { readFileSync, readdirSync, statSync, existsSync, writeFileSync } from "node:fs";
import { join, relative, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const args = new Set(process.argv.slice(2));
const BASELINE_FILE = join(ROOT, "tools", "style-lint.baseline.json");

const STRICT = [
  "src/styles/svc2.css", "src/styles/case2.css", "src/styles/pricing.css", "src/styles/register.css",
  "src/styles/hero-clean.css", "src/styles/home-v2c.css", "src/styles/house.css",
  /^src\/components\/svc2\//, /^src\/components\/case2\//,
];
// Selectors that paint a platform interface (svc2.css draws the Meta-style window chrome around every panel).
const HEX_ALLOW_SEL = /\.s2-(ui|st|fun)(__|\b)(?!-)|\.s2p-|\.pc-printdoc/;
const HEX_ALLOW = [
  /^src\/components\/svc2\/panels\//, /^src\/components\/svc2\/visuals\//, // platform UI recreations
  /^src\/components\/case2\/(Showcases|Pic)\.astro$/,                        // device frames around client artwork
  /ads-?manager/i, /platform/i,                                              // Ads Manager / platform mock-ups elsewhere
];
// Status colours are part of the palette (DESIGN-CONSISTENCY.md, "Forms"); everything else comes from the token files.
const STATUS = ["#B3261E", "#FFF8F8", "#1B7A3D", "#E3F6E9", "#A33A2B", "#FBE6E2"];
const FONTS_OK = /^(raleway|nunito|helvetica neue|helvetica|arial|sans-serif|serif|monospace|system-ui|-apple-system|blinkmacsystemfont|segoe ui|roboto|ui-monospace|sfmono-regular|menlo|consolas|inherit|initial|unset|courier new|courier)$/i;
const INTERACTIVE = /(btn|button|chip|pill|tab\b|tab_|tab-|__tab|link|cta|summary|\bpin\b|-pin|__pin|toggle|close)/i;

const rel = (p) => relative(ROOT, p).split("\\").join("/");
const matches = (f, list) => list.some((m) => (typeof m === "string" ? m === f : m.test(f)));

// ---------- palette ----------
function paletteFrom(file) {
  const out = new Set();
  if (!existsSync(file)) return out;
  const css = readFileSync(file, "utf8");
  for (const block of css.match(/:root\s*\{[\s\S]*?\n\}/g) || []) for (const h of block.match(/#[0-9a-f]{3,8}\b/gi) || []) out.add(norm(h));
  return out;
}
function norm(h) {
  h = h.toUpperCase();
  if (h.length === 4) h = "#" + h.slice(1).split("").map((c) => c + c).join("");
  if (h.length === 9 && h.endsWith("FF")) h = h.slice(0, 7);
  return h;
}
const PALETTE = new Set([
  ...paletteFrom(join(ROOT, "src/styles/design-system/colors_and_type.css")),
  ...paletteFrom(join(ROOT, "src/styles/home26.css")),
  ...STATUS.map(norm), "#FFFFFF", "#000000",
]);

// ---------- sources ----------
function walk(dir, ext, acc = []) {
  if (!existsSync(dir)) return acc;
  for (const n of readdirSync(dir)) {
    const p = join(dir, n);
    if (statSync(p).isDirectory()) walk(p, ext, acc);
    else if (n.endsWith(ext)) acc.push(p);
  }
  return acc;
}
const sources = [];
for (const f of readdirSync(join(ROOT, "src/styles"))) if (f.endsWith(".css")) sources.push({ file: `src/styles/${f}`, css: readFileSync(join(ROOT, "src/styles", f), "utf8"), offset: 0 });
for (const d of ["src/components", "src/pages", "src/layouts"]) {
  for (const p of walk(join(ROOT, d), ".astro")) {
    const src = readFileSync(p, "utf8");
    const re = /<style\b[^>]*>([\s\S]*?)<\/style>/g;
    let m;
    while ((m = re.exec(src))) sources.push({ file: rel(p), css: m[1], offset: src.slice(0, m.index).split("\n").length - 1 });
  }
}

// ---------- scan ----------
const findings = [];
const add = (file, line, rule, msg, key) => findings.push({ file, line, rule, msg, key: `${file}|${rule}|${key}`, strict: matches(file, STRICT) });

for (const { file, css, offset } of sources) {
  const clean = css.replace(/\/\*[\s\S]*?\*\//g, (c) => c.replace(/[^\n]/g, " "));
  const lineAt = (i) => offset + clean.slice(0, i).split("\n").length;
  const hexAllowed = matches(file, HEX_ALLOW);
  // Walk rules: track selector and whether we are inside a fine-pointer / hover media block.
  const ruleRe = /([^{}]+)\{([^{}]*)\}/g;
  const mediaStack = [];
  // crude media tracking: find @media blocks and record their ranges
  const fineRanges = [];
  const mre = /@media[^{]*\((?:pointer:\s*fine|hover:\s*hover|any-pointer:\s*fine)[^{]*\{/g;
  let mm;
  while ((mm = mre.exec(clean))) {
    let depth = 1, i = mm.index + mm[0].length;
    while (i < clean.length && depth) { if (clean[i] === "{") depth++; else if (clean[i] === "}") depth--; i++; }
    fineRanges.push([mm.index, i]);
  }
  const inFine = (i) => fineRanges.some(([a, b]) => i >= a && i < b);
  let r;
  while ((r = ruleRe.exec(clean))) {
    const sel = r[1].trim().replace(/^.*@media[^{]*$/s, "").split("\n").pop().trim();
    const body = r[2];
    const at = r.index + r[1].length;
    if (/^@(font-face|keyframes)/.test(sel) || /^(from|to|\d+%)$/.test(sel)) continue;
    if (/@font-face/.test(r[1])) continue;
    // fonts
    const ff = [...body.matchAll(/font-family\s*:\s*([^;]+)/g)].map((x) => x[1]);
    const fontShort = [...body.matchAll(/(?:^|;|\s)font\s*:\s*([^;]+)/g)].map((x) => x[1]).filter((v) => /["']|,|\b(raleway|nunito|sans-serif|serif)\b/i.test(v) && !/var\(--font/.test(v));
    for (const v of [...ff, ...fontShort]) {
      if (/var\(--font-/.test(v) && !/["']/.test(v.replace(/var\([^)]*\)/g, ""))) continue;
      if (/^\s*(inherit|initial|unset)\s*$/.test(v)) continue;
      // drop functions (clamp(), var(), calc()) so their commas do not split the family list, then peel the
      // shorthand's style / weight / size / line-height tokens off the first family
      let fam = v.replace(/!important/g, "");
      for (let k = 0; k < 4; k++) fam = fam.replace(/[a-z-]+\([^()]*\)/gi, " ");
      const faces = fam.split(",").map((part) => {
        let t = part.trim();
        if (/^["']/.test(t)) return t.replace(/^["']|["']$/g, "");
        let prev;
        do { prev = t; t = t.replace(/^(normal|italic|oblique|bold|bolder|lighter|small-caps|[\d.]+(px|em|rem|%|vw|vh)?|\/\s*[\d.]+(px|em|rem|%)?)\s*/i, "").trim(); } while (t !== prev && t);
        return t.replace(/^\/\S*\s*/, "").replace(/^["']|["']$/g, "");
      }).filter(Boolean);
      const foreign = faces.filter((f) => !FONTS_OK.test(f) && !/^\d/.test(f));
      if (foreign.length) add(file, lineAt(at), "font-new", `new font face "${foreign.join(", ")}" in ${sel.slice(0, 60)}`, `${sel}|${foreign.join(",")}`);
      else add(file, lineAt(at), "font", `font named directly (use var(--font-display) / var(--font-body)) in ${sel.slice(0, 60)}`, `${sel}|${v.trim()}`);
    }
    // hex colours
    if (!hexAllowed && !HEX_ALLOW_SEL.test(sel)) {
      for (const h of body.match(/#[0-9a-fA-F]{3,8}\b/g) || []) {
        const n = norm(h);
        if (!PALETTE.has(n)) add(file, lineAt(at), "hex", `off-palette colour ${h} in ${sel.slice(0, 60)}`, `${sel}|${n}`);
      }
    }
    // easing
    for (const c of body.match(/cubic-bezier\([^)]*\)/g) || []) {
      if (/^\s*--/.test(body.slice(Math.max(0, body.indexOf(c) - 40), body.indexOf(c)).split(";").pop())) continue; // token declaration
      add(file, lineAt(at), "ease", `literal ${c.replace(/\s+/g, "")} (use var(--ease) / var(--ease-out)) in ${sel.slice(0, 60)}`, `${sel}|${c.replace(/\s+/g, "")}`);
    }
    // tap targets
    if (INTERACTIVE.test(sel) && !inFine(r.index) && !/::?(before|after|marker|placeholder)|\b(svg|img|i|b|span)\b\s*$|__(n|c|dot|ic|icon|arr|arrow|lbl|label|t|d|img|logo|tag)\b/.test(sel)) {
      for (const m2 of body.matchAll(/(?:^|;)\s*(min-height|height)\s*:\s*([\d.]+)px/g)) {
        const v = parseFloat(m2[2]);
        if (v > 0 && v < 44 && !/height\s*:\s*[\d.]+px[^;]*;[\s\S]*min-height\s*:\s*(4[4-9]|[5-9]\d)/.test(body)) add(file, lineAt(at), "tap", `${m2[1]} ${v}px on interactive ${sel.slice(0, 60)} (44px minimum)`, `${sel}|${m2[1]}|${v}`);
      }
    }
  }
}

// ---------- baseline ----------
const baseline = existsSync(BASELINE_FILE) ? new Set(JSON.parse(readFileSync(BASELINE_FILE, "utf8")).keys) : null;
if (args.has("--update-baseline")) {
  const keys = [...new Set(findings.filter((f) => f.strict || f.rule === "font-new").map((f) => f.key))].sort();
  writeFileSync(BASELINE_FILE, JSON.stringify({ note: "Accepted style-lint findings in strict files. Regenerate with node tools/style-lint.mjs --update-baseline after a reviewed change.", updated: new Date().toISOString().slice(0, 10), keys }, null, 1) + "\n");
  console.log(`baseline written: ${keys.length} accepted findings -> ${rel(BASELINE_FILE)}`);
  process.exit(0);
}
for (const f of findings) {
  const known = baseline ? baseline.has(f.key) : true; // no baseline yet: nothing is "new"
  f.error = (f.rule === "font-new" && !known) || (f.strict && !known && ["hex", "ease", "tap"].includes(f.rule));
}

// ---------- report ----------
const errors = findings.filter((f) => f.error);
const warns = findings.filter((f) => !f.error);
// exitCode, not process.exit(): a piped stdout must drain before the process ends.
if (args.has("--json")) { process.stdout.write(JSON.stringify({ errors, warnings: warns.length, findings }, null, 1) + "\n"); process.exitCode = errors.length ? 1 : 0; }
else report();
function report() {
const byFile = new Map();
for (const f of warns) { const e = byFile.get(f.file) || { file: f.file, strict: f.strict, n: 0, rules: {} }; e.n++; e.rules[f.rule] = (e.rules[f.rule] || 0) + 1; byFile.set(f.file, e); }
const rank = [...byFile.values()].sort((a, b) => (b.strict - a.strict) || (b.n - a.n));
const totals = warns.reduce((a, f) => ((a[f.rule] = (a[f.rule] || 0) + 1), a), {});
console.log(`style-lint: ${sources.length} style sources, palette ${PALETTE.size} colours`);
console.log(`warnings by rule: ${Object.entries(totals).map(([k, v]) => `${k} ${v}`).join(", ") || "none"}`);
console.log("");
console.log("Strict files (redesigned families; new findings here fail the run):");
const strictRows = rank.filter((r) => r.strict);
if (!strictRows.length) console.log("  clean");
for (const r of strictRows) console.log(`  ${String(r.n).padStart(4)}  ${r.file}  (${Object.entries(r.rules).map(([k, v]) => `${k} ${v}`).join(", ")}, all baselined)`);
console.log("");
const legacy = rank.filter((r) => !r.strict);
const show = args.has("--all") ? legacy : legacy.slice(0, 15);
console.log(`Legacy files, ranked by drift (warnings only; ${legacy.length} files${args.has("--all") ? "" : ", top 15, --all for every file"}):`);
for (const r of show) console.log(`  ${String(r.n).padStart(4)}  ${r.file}  (${Object.entries(r.rules).map(([k, v]) => `${k} ${v}`).join(", ")})`);
if (errors.length) {
  console.log("");
  console.log(`HARD ERRORS (${errors.length}): new drift in strict files or a new font face`);
  for (const e of errors) console.log(`  ${e.file}:${e.line}  [${e.rule}] ${e.msg}`);
  console.log("\nFix them with tokens (DESIGN-CONSISTENCY.md), or if a reviewed exception, run --update-baseline.");
  process.exitCode = 1;
  return;
}
console.log("\nNo hard errors.");
}

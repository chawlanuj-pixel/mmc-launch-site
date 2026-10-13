// Copy and content consistency check on a built site.
// Usage: node tools/consistency-check.mjs <dist-dir> [--verbose] [--json] [--no-allowlist]
// Exit 1 on any HARD failure that is not covered by tools/consistency-allowlist.json. WARN items never fail the run.
// Rules are documented in COPY-CONSISTENCY.md (or the "Copy and content rules" section of DESIGN-CONSISTENCY.md).
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, relative, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const dist = process.argv.find((a, i) => i >= 2 && !a.startsWith("--"));
if (!dist) { console.error("usage: node tools/consistency-check.mjs <dist-dir> [--verbose] [--json]"); process.exit(2); }
const VERBOSE = process.argv.includes("--verbose");
const here = dirname(fileURLToPath(import.meta.url));

// ---- Approved vocabulary (mirrors src/lib/site.ts) ----
const CTA_APPROVED = new Set([
  "Book a strategy call", "Book a call", "Get my free audit", "How the audit works", "Send a brief", "See the work", "See more of our work",
  "Run the numbers yourself", "Run the numbers", "See open roles", "Apply for this role", "Register your agency", "Read the guide", "Open the calculator",
].map((s) => s.toLowerCase()));
const PHONE_DIGITS = "917666309102";
const EMAIL_PUBLIC = new Set(["sales-in@mondaymarketing.company", "hr@mondaymarketing.company", "legal@mondaymarketing.company", "privacy@mondaymarketing.company"]);
const EMAIL_FORM_ONLY = "anuj@mondaymarketing.company";
const NO_META_LENGTH = /^\/(admin|preview|thank-you|pricing-model)\//; // title/description length not enforced

// American spelling list (British is the house style). Add words here, not in the code below.
const AMERICAN = [
  "optimi[sz]\\w*", "organi[sz]ation\\w*", "organiz\\w+", "colors?\\b", "colored", "coloring", "centers?\\b", "centered", "programs?\\b",
  "analyz\\w+", "behaviors?\\b", "favorites?\\b", "catalogs?\\b", "customiz\\w+", "personaliz\\w+", "localiz\\w+", "prioritiz\\w+", "recogniz\\w+",
  "summariz\\w+", "utiliz\\w+", "minimiz\\w+", "maximiz\\w+", "standardiz\\w+", "monetiz\\w+", "categoriz\\w+", "centraliz\\w+", "realiz\\w+", "specializ\\w+",
  "gray\\b", "defense\\b", "judgment\\b", "fulfillment\\b", "traveling", "canceled", "labeled", "neighbor\\w*", "honor\\w*", "theater\\b",
];
const AMERICAN_RE = new RegExp("\\b(?:" + AMERICAN.join("|") + ")", "gi");
const isBritishZ = (w) => /optimis|organis/i.test(w); // optimis*/organis* are British: filtered after match
const BANNED_FILLER = /\b(best-in-class|best in class|cutting-edge|cutting edge|world-class|world class|state-of-the-art|unlock(?:s|ed|ing)?|supercharg\w*|game-?chang\w*|synerg\w+|leading|revolutionar\w+|next-level|seamless(?:ly)?)\b/gi;
const NUM_WORDS = "(?:two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty|thirty|forty|fifty|hundred)(?:[- ](?:one|two|three|four|five|six|seven|eight|nine))?";
const COUNT_RE = new RegExp("(?<![\\w.])(?:[1-9]\\d*(?:,\\d{3})*\\+?|" + NUM_WORDS + ")\\s+(?:(?!ways\\b|places\\b|reasons\\b|things\\b|steps\\b|stages\\b)[A-Za-z0-9]+\\s+)?(?:clients|brands|case studies)\\b", "gi");
// Variants of the booking and contact CTAs that must not appear as button or link labels (warn: context can differ).
const CTA_VARIANTS = /^(get in touch|contact us|let'?s talk|talk to us|book now|book a (free )?(consultation|demo|meeting|chat)|schedule a (call|meeting|demo)|request a (quote|proposal|call)|get started|get a (free )?quote|enquire now|learn more|start now|submit)$/i;
const IMG_ALT_BAD = /^(image|picture|photo|graphic|icon)\b|\b(image|picture|photo|graphic) of\b/i;

// ---- Allowlist: { rule, pages (glob or list, default "*"), match (substring of the finding, optional), reason } ----
let allow = [];
const alPath = join(here, "consistency-allowlist.json");
if (existsSync(alPath) && !process.argv.includes("--no-allowlist")) allow = JSON.parse(readFileSync(alPath, "utf8")).entries || [];
const globRe = (g) => new RegExp("^" + g.replace(/[.+^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*") + "$");
for (const e of allow) { if (!e.reason) { console.error("allowlist entry without a reason: " + JSON.stringify(e)); process.exit(2); } e._pages = (Array.isArray(e.pages) ? e.pages : [e.pages || "*"]).map(globRe); e.used = 0; }
const allowed = (rule, page, snippet) => {
  for (const e of allow) {
    if (e.rule !== rule && e.rule !== "*") continue;
    if (!e._pages.some((r) => r.test(page))) continue;
    if (e.match && !snippet.toLowerCase().includes(e.match.toLowerCase())) continue;
    e.used++; return true;
  }
  return false;
};

// Empty alt is accepted only when the image is a thumbnail or logo inside a small card whose own text (heading, caption, name)
// sits within three levels of the image. A card is an ancestor with 3 to 500 characters of text, or a link or button carrying an aria-label. See COPY-CONSISTENCY.md "Empty alt".
const VOID = new Set(["area","base","br","col","embed","hr","img","input","link","meta","source","track","wbr","path","circle","rect","line","polyline","polygon","use","stop"]);
function emptyAltHasCaption(html, imgIndex) {
  const stack = []; const tag = /<(\/?)([a-zA-Z][\w-]*)\b[^>]*?(\/?)>/g; let m;
  while ((m = tag.exec(html)) && m.index < imgIndex) {
    const name = m[2].toLowerCase();
    if (m[1]) { for (let i = stack.length - 1; i >= 0; i--) if (stack[i].name === name) { stack.length = i; break; } }
    else if (!VOID.has(name) && !m[3]) stack.push({ name, start: m.index + m[0].length });
  }
  for (let up = 0; up < 3 && stack.length - 1 - up >= 0; up++) {
    const el = stack[stack.length - 1 - up];
    const re = new RegExp("<(/?)" + el.name + "\\b[^>]*?(/?)>", "gi"); re.lastIndex = el.start; let depth = 1, end = -1, c;
    while ((c = re.exec(html))) { if (c[1]) { if (--depth === 0) { end = c.index; break; } } else if (!c[2]) depth++; }
    if (end < 0) continue;
    if (/^(a|button)$/.test(el.name) && /\baria-label="[^"]{3,}"/.test(html.slice(html.lastIndexOf("<" + el.name, el.start), el.start))) return true;
    const t = html.slice(el.start, end).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    if (t.length >= 3 && t.length <= 500) return true;
    if (t.length > 500) return false;
  }
  return false;
}

// ---- Helpers ----
const dec = (s) => s.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;|&#x27;/g, "'").replace(/&nbsp;/g, " ").replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n));
const squash = (s) => dec(s.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
const files = [];
(function walk(d) { for (const n of readdirSync(d)) { const p = join(d, n); statSync(p).isDirectory() ? walk(p) : n === "index.html" && files.push(p); } })(dist);
const ctx = (s, i, len) => s.slice(Math.max(0, i - 28), i + len + 28).replace(/\s+/g, " ");

const found = [];
const add = (sev, rule, page, snippet) => found.push({ sev, rule, page, snippet: snippet.slice(0, 220) });
const scan = (rule, sev, re, page, text, label = "", skip) => { re.lastIndex = 0; let m; while ((m = re.exec(text))) { if (skip && skip(m[0])) continue; add(sev, rule, page, (label ? label + ": " : "") + ctx(text, m.index, m[0].length)); } };

for (const f of files) {
  const page = "/" + relative(dist, f).replace(/index\.html$/, "");
  const h = readFileSync(f, "utf8");
  const noindex = /<meta name="robots" content="[^"]*noindex/.test(h);
  const body = h.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<noscript[\s\S]*?<\/noscript>/g, "");
  const title = dec((h.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || "");
  const desc = dec((h.match(/<meta name="description" content="([^"]*)"/) || [])[1] || "");
  const text = squash(body);
  const attrText = [...body.matchAll(/\b(?:alt|aria-label|title|placeholder)="([^"]+)"/g)].map((m) => dec(m[1]));
  const ldStrings = [];
  for (const m of h.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    try { (function w(v, k) { if (typeof v === "string") { if (!/^(@|url|image|logo|item|sameAs|telephone|email|postalCode|opens|closes|dateModified|datePublished|inLanguage)/.test(k || "") && !/^https?:\/\//.test(v)) ldStrings.push(v); } else if (v && typeof v === "object") for (const [kk, vv] of Object.entries(v)) w(vv, kk); })(JSON.parse(m[1])); } catch {}
  }
  const surfaces = [["text", text], ["title", title], ["description", desc], ...attrText.map((t) => ["attr", t]), ...ldStrings.map((t) => ["json-ld", t])];

  for (const [label, s] of surfaces) {
    scan("em-dash", "hard", /—/g, page, s, label);
    scan("en-dash", "hard", /–/g, page, s, label);
    scan("mockup", "hard", /mock-?ups?/gi, page, s, label);
    scan("client-count", "hard", COUNT_RE, page, s, label);
    scan("banned-filler", "hard", BANNED_FILLER, page, s, label);
    scan("american-spelling", "hard", AMERICAN_RE, page, s, label, isBritishZ);
    scan("click-here", "hard", /\bclick here\b/gi, page, s, label);
    scan("currency-format", "warn", /\bINR\b|\bUS\$|\bUSD\b/g, page, s, label);
    if (!page.startsWith("/pricing-model/")) scan("currency-format", "warn", /\bRs\.? ?\d/g, page, s, label);
    scan("date-format", "warn", /\b(?:January|February|March|April|May|June|July|August|September|October|November|December) \d{1,2},? 20\d\d\b|\b\d{1,2}\/\d{1,2}\/20\d\d\b/g, page, s, label);
    scan("audience-naming", "warn", /\bed-?tech\b|\beducation(?:al)? institutions?\b|\beducation institutes\b|\beducational (?:brands|companies)\b|(?<!not )\bD2C[- ]only\b/gi, page, s, label);
    scan("brand-naming", "warn", /\bMonday Marketing\b(?! Company)|\bMonday Marketing Co\b|\bMMC Digital\b|\bAI by Monday\b/g, page, s, label);
    scan("white-label-form", "hard", /\bwhitelabel\b/gi, page, s, label);
  }

  // Headings: exclamation marks, Title Case / ALL CAPS drift
  for (const m of body.matchAll(/<(h[1-6])\b[^>]*>([\s\S]*?)<\/\1>/g)) {
    const t = squash(m[2]);
    if (!t) continue;
    if (/!/.test(t)) add("hard", "heading-exclamation", page, `${m[1]}: ${t}`);
    const words = t.replace(/[^A-Za-z' -]/g, " ").split(/\s+/).filter((w) => w.length > 3);
    const letters = t.replace(/[^A-Za-z]/g, "");
    if (letters.length > 6 && letters === letters.toUpperCase()) add("warn", "heading-case", page, `${m[1]} ALL CAPS: ${t}`);
    else if (words.length >= 4 && words.every((w) => /^[A-Z]/.test(w))) add("warn", "heading-case", page, `${m[1]} Title Case: ${t}`);
  }

  // Title / description length (indexable pages)
  if (!noindex && !NO_META_LENGTH.test(page)) {
    if (!title) add("hard", "title-length", page, "missing title");
    else if (title.length > 60) add("hard", "title-length", page, `${title.length} chars: ${title}`);
    if (!desc) add("hard", "description-length", page, "missing description");
    else if (desc.length < 140 || desc.length > 160) add("hard", "description-length", page, `${desc.length} chars: ${desc}`);
  }

  // Links
  for (const m of body.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)) {
    const attrs = m[1], label = squash(m[2]);
    const href = (attrs.match(/\bhref="([^"]*)"/) || [])[1];
    if (href !== undefined) {
      const u = dec(href);
      const bare = u.split("#")[0].split("?")[0];
      if (/^https?:\/\/(www\.)?mondaymarketing\.company/.test(u)) add("hard", "self-link-absolute", page, u);
      else if (bare && !/^(https?:|mailto:|tel:|\/\/|javascript:)/.test(bare)) {
        if (/\.html?$/i.test(bare)) add("hard", "link-html", page, u);
        else if (bare.startsWith("/") && !bare.endsWith("/") && !/\.[a-z0-9]{2,5}$/i.test(bare)) add("hard", "link-no-trailing-slash", page, u);
      }
      if (u.startsWith("mailto:")) {
        const em = u.slice(7).split("?")[0].toLowerCase();
        if (em === EMAIL_FORM_ONLY) add("hard", "email-anuj-public", page, u);
        else if (!EMAIL_PUBLIC.has(em)) add("warn", "email-unknown", page, u);
      }
      if (u.startsWith("tel:") && u.replace(/\D/g, "") !== PHONE_DIGITS) add("hard", "phone-mismatch", page, u);
      if (/wa\.me\//.test(u) && !u.includes(PHONE_DIGITS)) add("hard", "phone-mismatch", page, u);
    }
    if (/^(read more|learn more|more|here|click here|this page|link)$/i.test(label)) add("hard", "link-text", page, `"${label}" -> ${href}`);
    if (/\b(btn|button|cta)\b/.test((attrs.match(/class="([^"]*)"/) || [])[1] || "") || /data-book/.test(attrs)) {
      const clean = label.replace(/[→›»>↗]+/g, "").trim();
      if (CTA_VARIANTS.test(clean)) add("warn", "cta-variant", page, `"${clean}"`);
      else if (clean && !CTA_APPROVED.has(clean.toLowerCase()) && !/^(go to|back to) /i.test(clean) && !/^#/.test(href || "")) add("warn", "cta-label", page, `"${clean}"`);
    }
    else if (CTA_VARIANTS.test(label)) add("warn", "cta-variant", page, `"${label}" (link)`);
  }
  for (const m of body.matchAll(/<button\b([^>]*)>([\s\S]*?)<\/button>/g)) {
    if (/data-book/.test(m[1])) { const clean = squash(m[2]).replace(/[→›»>↗]+/g, "").trim(); if (clean && !CTA_APPROVED.has(clean.toLowerCase())) add("warn", "cta-label", page, `"${clean}" (button)`); }
  }

  // Images
  for (const m of body.matchAll(/<img\b([^>]*)>/g)) {
    const a = m[1];
    const alt = a.match(/\balt="([^"]*)"/) || (/\balt(?=[\s>\/]|$)/.test(a) ? ["", ""] : null);
    const src = (a.match(/\bsrc="([^"]*)"/) || [])[1] || "";
    if (!alt) add("hard", "alt-missing", page, src);
    else {
      const t = dec(alt[1]);
      if (t === "") { if (!/aria-hidden|role="presentation"|role="none"/.test(a) && !emptyAltHasCaption(body, m.index)) add("warn", "alt-empty", page, src); }
      else if (IMG_ALT_BAD.test(t)) add("hard", "alt-quality", page, `"${t}"`);
      else if (/\.(jpe?g|png|webp|svg)$/i.test(t) || t.length < 4) add("warn", "alt-quality", page, `"${t}"`);
    }
  }

  // NAP
  for (const m of text.matchAll(/\+\s?91[\s-]?\d[\d\s-]{8,13}\d/g)) {
    if (m[0].replace(/\D/g, "") !== PHONE_DIGITS) add("hard", "phone-mismatch", page, ctx(text, m.index, m[0].length));
    else if (m[0] !== "+91 766 630 9102") add("hard", "phone-format", page, ctx(text, m.index, m[0].length));
  }
  for (const m of text.matchAll(/[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\.[a-z]{2,}/gi)) {
    const e = m[0].toLowerCase();
    if (e === EMAIL_FORM_ONLY) add("hard", "email-anuj-public", page, ctx(text, m.index, m[0].length));
    else if (e.endsWith("@mondaymarketing.company") && !EMAIL_PUBLIC.has(e)) add("warn", "email-unknown", page, e);
  }
  for (const m of text.matchAll(/Hiranandani(?! Business Park)|WeWork(?!,? Zenia)|(?<!WeWork )(?<!WeWork, )\bZenia(?! Building)|Thane (?:East|Central)|\b4006(?!07)\d\b/g)) add("hard", "address-variant", page, ctx(text, m.index, m[0].length));

  // Eyebrows: sentence case in the markup (CSS may uppercase them)
  for (const m of body.matchAll(/<(?:p|span|div)\b[^>]*class="[^"]*\b[\w-]*eyebrow\b[^"]*"[^>]*>([\s\S]*?)<\/(?:p|span|div)>/g)) {
    const t = squash(m[1]).replace(/^[\u25CF\u2022\s]+/, "");
    const words = t.replace(/[^A-Za-z' -]/g, " ").split(/\s+/).filter((w) => w.length > 3);
    const letters = t.replace(/[^A-Za-z]/g, "");
    if (letters.length > 6 && letters === letters.toUpperCase() && !/^[A-Z0-9&+ ]+$/.test(t.slice(0, 5))) add("warn", "eyebrow-case", page, `ALL CAPS: ${t}`);
    else if (words.length >= 3 && words.every((w) => /^[A-Z]/.test(w))) add("warn", "eyebrow-case", page, `Title Case: ${t}`);
  }

  // In-short answer lead: 40 to 60 words (warn); FAQ answers must not open with "Yes" more than 40 percent of the time (hard)
  { const lead = body.match(/id="answer"[\s\S]*?<p class="[^"]*lead[^"]*"[^>]*>([\s\S]*?)<\/p>/);
    if (lead) { const n = squash(lead[1]).split(" ").length; if (n < 40 || n > 60) add("warn", "answer-lead-words", page, `${n} words`); }
    for (const m of h.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
      let j; try { j = JSON.parse(m[1]); } catch { continue; }
      for (const n of (Array.isArray(j) ? j : j["@graph"] || [j])) if (n && n["@type"] === "FAQPage" && Array.isArray(n.mainEntity) && n.mainEntity.length >= 3) {
        const qs = n.mainEntity, yes = qs.filter((q) => /^\s*yes\b/i.test(q.acceptedAnswer?.text || "")).length;
        if (yes / qs.length > 0.4) add("hard", "faq-yes-openings", page, `${yes} of ${qs.length} answers open with Yes`);
      }
    }
  }
  for (const m of text.matchAll(/Illustrative layout of [^.]*\.[^.]*\./g)) {
    if (!/Not an? (?:client|real) [a-z ]+, no real [a-z ]+\./.test(m[0].slice(m[0].indexOf(". ") + 2))) add("warn", "illustrative-note", page, m[0].slice(0, 160));
  }
  if (/\b(?:its logo) belong to their|\bthe logo belong/i.test(text)) add("warn", "illustrative-note", page, "owner wording: 'its logo belong to their owners' mixes singular and plural");

  // White label usage. Open form is the noun phrase; the hyphenated form is the compound adjective before a noun.
  if (page.startsWith("/white-label")) {
    scan("white-label-misuse", "warn", /\bwhite label (?:agency|agencies|partner|partners|partnership|services?|work|reseller|resellers|fulfilment|team|model|delivery|SEO|PPC|web|website|development|design|social|reporting|support|plans?|pricing|rate|rates|provider|vendor|solution|solutions|arrangement|setup)\b/gi, page, text, "text");
    scan("white-label-misuse", "warn", /\bwhite-label(?=\s*(?:[.,;:?)]|$|\b(?:is|are|and|or|to|for|with|when|that|if|but|means|here)\b))/gi, page, text, "text");
    scan("white-label-promise", "warn", /\b(?:SLA|guarantee[sd]?|turnaround of|within \d+ (?:hours|days)|\d+[- ]hour turnaround|money-back)\b/gi, page, text, "text");
  }
  if (/^\/services\//.test(page)) scan("service-claims", "warn", /\b(?:we (?:increased|grew|delivered|generated|doubled|tripled)|our clients (?:have )?(?:seen|saw|achieved|got)|guaranteed)\b/gi, page, text, "text");
}

// ---- Apply allowlist, aggregate ----
const kept = found.filter((x) => !allowed(x.rule, x.page, x.snippet));
const groups = new Map();
for (const x of kept) {
  const key = `${x.sev}|${x.rule}|${x.snippet}`;
  if (!groups.has(key)) groups.set(key, { ...x, pages: new Set() });
  groups.get(key).pages.add(x.page);
}
const rows = [...groups.values()];
const hard = rows.filter((r) => r.sev === "hard"), warn = rows.filter((r) => r.sev === "warn");
const byRule = (arr) => { const m = {}; for (const r of arr) (m[r.rule] ||= []).push(r); return m; };

if (process.argv.includes("--json")) {
  console.log(JSON.stringify({ pages: files.length, hard: hard.map((r) => ({ ...r, pages: [...r.pages] })), warn: warn.map((r) => ({ ...r, pages: [...r.pages] })), unusedAllow: allow.filter((e) => !e.used).map((e) => e.rule + " " + (e.match || "")) }, null, 1));
} else {
  const print = (label, arr) => {
    for (const [rule, list] of Object.entries(byRule(arr))) {
      const pageCount = new Set(list.flatMap((r) => [...r.pages])).size;
      console.log(`${label} ${rule}: ${list.length} distinct, ${pageCount} pages`);
      for (const r of list.slice(0, VERBOSE ? 500 : 4)) console.log(`    ${r.snippet}  [${[...r.pages].slice(0, 2).join(", ")}${r.pages.size > 2 ? ` +${r.pages.size - 2}` : ""}]`);
      if (!VERBOSE && list.length > 4) console.log(`    ... ${list.length - 4} more (--verbose)`);
    }
  };
  print("FAIL", hard); print("WARN", warn);
  const unused = allow.filter((e) => !e.used);
  if (unused.length) console.log(`note: ${unused.length} allowlist entries matched nothing: ${unused.map((e) => e.rule + (e.match ? ` "${e.match}"` : "")).join("; ")}`);
  console.log(`\n${files.length} pages, ${hard.length} hard failures, ${warn.length} warnings, ${allow.reduce((n, e) => n + e.used, 0)} findings allowlisted`);
}
process.exitCode = hard.length ? 1 : 0;

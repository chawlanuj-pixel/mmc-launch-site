// Command Centre articles (Phase 4): the loader, validator and inline-HTML sanitiser, in plain JS so that
// astro.config.mjs (sitemap filter and lastmod), tools/ and src/lib/posts.ts all read the posts the same way.
// Contract: command-center/POSTS-CONTRACT.md. Source: src/data/posts.generated.json (committed as []), or the file named by
// env MMC_POSTS_FILE (tests). A malformed post is skipped with a build-time warning; the build never crashes on bad data.
// Nothing here outputs a post's `id` or `seo.keyword`: the normalised object does not carry them.
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";

export const SITE = "https://www.mondaymarketing.company";
export const SECTIONS = ["guides", "blog"];
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const ID_RE = /^[a-z][a-z0-9-]*$/;
const DATE_RE = /^(\d{4})-(\d{2})-(\d{2})$/;
// ids the article template already uses on the page; a block with one of these ids is renamed so ids stay unique.
const RESERVED_IDS = new Set(["main", "top", "article", "related", "faq", "talk", "library", "pg-sticky"]);

const str = (v) => (typeof v === "string" ? v.trim() : "");
const isObj = (v) => v && typeof v === "object" && !Array.isArray(v);

/** Today's date in India (YYYY-MM-DD): a post dated today IST is published even before 05:30 UTC. */
export function todayIST(now = Date.now()) {
  return new Date(now + 5.5 * 3600 * 1000).toISOString().slice(0, 10);
}

function validDate(s) {
  const m = DATE_RE.exec(s || "");
  if (!m) return false;
  const d = new Date(Date.UTC(+m[1], +m[2] - 1, +m[3]));
  return d.getUTCFullYear() === +m[1] && d.getUTCMonth() === +m[2] - 1 && d.getUTCDate() === +m[3];
}

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
/** "2026-10-09" -> "9 October 2026" (house date format). */
export function niceDate(iso) {
  const m = DATE_RE.exec(iso || "");
  return m ? `${+m[3]} ${MONTHS[+m[2] - 1]} ${m[1]}` : "";
}

const escText = (s) => s.replace(/&(?!(?:[a-zA-Z][a-zA-Z0-9]{1,31}|#\d{1,7}|#x[0-9a-fA-F]{1,6});)/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const escAttr = (s) => s.replace(/&(?!(?:[a-zA-Z][a-zA-Z0-9]{1,31}|#\d{1,7}|#x[0-9a-fA-F]{1,6});)/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const decodeAttr = (s) => s.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;|&#x27;/g, "'");

/** An href the templates accept: a site path ("/x/", made to end in a slash) or an https URL. Own-domain https URLs become paths. Anything else: null. */
export function safeHref(raw) {
  let u = decodeAttr(String(raw || "").trim());
  if (!u) return null;
  const own = u.match(/^https:\/\/(?:www\.)?mondaymarketing\.company(\/[^\s]*)?$/i);
  if (own) u = own[1] || "/";
  if (/^\/(?!\/)/.test(u)) {
    if (/[\s<>"'`\\]/.test(u)) return null;
    const m = u.match(/^([^?#]*)([?#].*)?$/);
    let p = m[1];
    if (!p.endsWith("/") && !/\.[a-z0-9]{2,5}$/i.test(p)) p += "/";
    return { href: p + (m[2] || ""), external: false };
  }
  if (/^https:\/\/[a-z0-9.-]+\.[a-z]{2,}(?::\d+)?(?:[/?#][^\s<>"'`]*)?$/i.test(u)) return { href: u, external: true };
  return null;
}

const ALLOWED = new Set(["b", "strong", "i", "em", "a"]);
/**
 * Allowlist sanitiser for the inline HTML in paragraphs, list items, steps, callouts and FAQ answers.
 * Keeps only <b> <strong> <i> <em> and <a href> (site path or https; external links get rel="noopener"), drops every other
 * tag (its text stays, escaped), drops attributes other than href, balances unclosed tags and escapes stray < > &.
 */
export function cleanInline(input) {
  const s = typeof input === "string" ? input : "";
  // Content of script/style/etc. is dropped entirely, not shown as text.
  const src = s.replace(/<(script|style|iframe|object|embed|template|noscript|svg|math)\b[\s\S]*?<\/\1\s*>/gi, "").replace(/<!--[\s\S]*?-->/g, "");
  let out = "";
  const stack = [];
  const re = /<\/?([a-zA-Z][a-zA-Z0-9]*)\b((?:[^>"']|"[^"]*"|'[^']*')*)>/g;
  let last = 0, m;
  while ((m = re.exec(src))) {
    out += escText(src.slice(last, m.index));
    last = re.lastIndex;
    const name = m[1].toLowerCase();
    const closing = m[0][1] === "/";
    if (!ALLOWED.has(name)) continue;
    if (closing) {
      const at = stack.lastIndexOf(name);
      if (at < 0) continue;
      while (stack.length > at) out += `</${stack.pop()}>`;
      continue;
    }
    if (name === "a") {
      if (stack.includes("a")) continue; // no nested links
      const hm = m[2].match(/\bhref\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+))/i);
      const h = hm ? safeHref(hm[1] ?? hm[2] ?? hm[3]) : null;
      if (!h) continue; // a link with an unsafe or missing target keeps its text only
      out += h.external ? `<a href="${escAttr(h.href)}" rel="noopener">` : `<a href="${escAttr(h.href)}">`;
      stack.push("a");
      continue;
    }
    out += `<${name}>`;
    stack.push(name);
  }
  out += escText(src.slice(last));
  while (stack.length) out += `</${stack.pop()}>`;
  return out;
}

/** Plain text from inline HTML (for JSON-LD and word counts). */
export const plainText = (s) => String(s || "").replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/\s+/g, " ").trim();

/** Whole-article word count from the block data (same rule as src/lib/guides.ts wordCount). */
export function wordCount(blocks) {
  const parts = [];
  for (const b of blocks || []) {
    parts.push(b.h || "", ...(b.paras || []), ...(b.list || []), b.cap || "");
    for (const it of b.body || []) { if (it.items) parts.push(...it.items); else parts.push(it.x || ""); }
    (b.steps || []).forEach((s) => parts.push(s.t, s.d));
    if (b.table) parts.push(b.table.caption || "", ...b.table.head, ...b.table.rows.flat());
    if (b.callout) parts.push(b.callout.title, b.callout.text);
  }
  return parts.join(" ").replace(/<[^>]+>/g, " ").replace(/&[a-z]+;/g, " ").split(/\s+/).filter(Boolean).length;
}
export const readMinutes = (blocks) => Math.max(1, Math.ceil(wordCount(blocks) / 220));

function assetExists(root, rel) {
  if (!rel || /(^|\/)\.\.(\/|$)/.test(rel) || /^[a-z]+:|^\//i.test(rel)) return false;
  return existsSync(join(root, "public", "assets", rel));
}

/** Slugs of the repo-managed guides (src/data/guides/*.json): a CMS guide may not take one of these URLs. */
function existingGuideSlugs(root) {
  const out = new Set();
  try {
    for (const f of readdirSync(join(root, "src/data/guides"))) {
      if (!f.endsWith(".json")) continue;
      try { const d = JSON.parse(readFileSync(join(root, "src/data/guides", f), "utf8")); const s = String(d.path || "").replace(/^\/guides\/|\/$/g, ""); if (s) out.add(s); } catch {}
    }
  } catch {}
  return out;
}

function normBlock(b, i, slug, root, warn, usedIds) {
  if (!isObj(b)) { warn(`${slug}: section ${i + 1} is not an object, dropped`); return null; }
  let id = str(b.id), h = str(b.h);
  if (!h) { warn(`${slug}: section ${i + 1} has no heading, dropped`); return null; }
  if (!ID_RE.test(id)) { warn(`${slug}: section ${i + 1} id "${id}" is not kebab-case, dropped`); return null; }
  if (RESERVED_IDS.has(id)) { warn(`${slug}: section id "${id}" is used by the page template, renamed to "${id}-section"`); id = id + "-section"; }
  if (usedIds.has(id)) { warn(`${slug}: duplicate section id "${id}", dropped`); return null; }
  usedIds.add(id);
  const o = { id, h };
  const arr = (v) => (Array.isArray(v) ? v.filter((x) => typeof x === "string" && x.trim()) : []);
  // `body` (written by the editor): paragraphs, sub-headings, lists and quotes in order. Older articles use `paras` and `list`, which still render.
  const body = normBody(b.body);
  if (body.length) o.body = body;
  else {
    const paras = arr(b.paras).map(cleanInline);
    if (paras.length) o.paras = paras;
  }
  const img = str(b.img);
  if (img) {
    if (/^https:\/\//i.test(img)) {
      // A picture from another website (the editor allows it, with a warning). Only a plain https address is kept.
      if (/^https:\/\/[a-z0-9.-]+\.[a-z]{2,}(?::\d+)?(?:\/[^\s<>"'`\\]*)?$/i.test(img)) { o.img = img; }
      else warn(`${slug}: section "${id}" picture address is not a plain https address, picture dropped`);
    } else if (assetExists(root, img)) o.img = img;
    else warn(`${slug}: section "${id}" picture assets/${img} does not exist, picture dropped`);
    if (o.img) {
      const cap = str(b.cap), alt = str(b.alt) || cap;
      if (cap) o.cap = cap;
      o.alt = alt || h;
    }
  }
  const list = body.length ? [] : arr(b.list).map(cleanInline);
  if (list.length) o.list = list;
  if (Array.isArray(b.steps)) {
    const steps = b.steps.filter((s) => isObj(s) && str(s.t)).map((s) => ({ t: str(s.t), d: cleanInline(str(s.d)) }));
    if (steps.length) o.steps = steps;
  }
  if (isObj(b.table)) {
    const head = Array.isArray(b.table.head) ? b.table.head.map((c) => plainText(String(c ?? ""))) : [];
    const rows = Array.isArray(b.table.rows) ? b.table.rows.filter(Array.isArray).map((r) => r.map((c) => plainText(String(c ?? "")))) : [];
    if (head.length && rows.length) o.table = { caption: plainText(str(b.table.caption)), head, rows };
    else warn(`${slug}: section "${id}" table has no head or rows, table dropped`);
  }
  if (isObj(b.callout) && (str(b.callout.title) || str(b.callout.text))) o.callout = { title: str(b.callout.title), text: cleanInline(str(b.callout.text)) };
  // A call-to-action button after the section: primary (yellow button), link (text link with arrow) or book (opens the booking form).
  if (isObj(b.button)) {
    const style = ["primary", "link", "book"].includes(b.button.style) ? b.button.style : "primary";
    const label = plainText(str(b.button.label)).slice(0, 60);
    if (!label) warn(`${slug}: section "${id}" button has no label, button dropped`);
    else if (style === "book") o.button = { label, href: "", style };
    else {
      const hr = safeHref(b.button.href);
      if (hr) o.button = { label, href: hr.href, external: hr.external, style };
      else warn(`${slug}: section "${id}" button link is not a site path or https address, button dropped`);
    }
  }
  return o;
}

/** Ordered section text: [{k:"p"|"quote",x}, {k:"h3",x}, {k:"ul"|"ol",items}]. Inline HTML is cleaned; unknown kinds are dropped. */
function normBody(v) {
  const out = [];
  for (const it of Array.isArray(v) ? v : []) {
    if (!isObj(it)) continue;
    if (it.k === "p" || it.k === "quote") { const x = cleanInline(str(it.x)); if (plainText(x)) out.push({ k: it.k, x }); }
    else if (it.k === "h3") { const x = plainText(str(it.x)); if (x) out.push({ k: "h3", x }); }
    else if ((it.k === "ul" || it.k === "ol") && Array.isArray(it.items)) { const items = it.items.filter((x) => typeof x === "string" && x.trim()).map(cleanInline); if (items.length) out.push({ k: it.k, items }); }
  }
  return out;
}

function normPost(p, i, ctx) {
  const { root, today, warn, guideSlugs } = ctx;
  const label = (isObj(p) && str(p.slug)) || `#${i + 1}`;
  const skip = (why) => { warn(`post ${label} skipped: ${why}`); return null; };
  if (!isObj(p)) return skip("not an object");
  const slug = str(p.slug);
  if (!SLUG_RE.test(slug) || slug.length < 3 || slug.length > 80) return skip(`slug "${slug}" must be 3 to 80 characters of a-z, 0-9 and single hyphens`);
  const section = str(p.section);
  if (!SECTIONS.includes(section)) return skip(`section "${section}" is not guides or blog`);
  if (section === "guides" && guideSlugs.has(slug)) return skip(`/guides/${slug}/ is an existing repo-managed guide`);
  const title = str(p.title);
  if (!title) return skip("no title");
  if (title.length > 110) warn(`${slug}: title is ${title.length} characters (contract: 110 at most)`);
  const desc = str(p.desc);
  if (!desc) return skip("no desc");
  const lead = str(p.lead);
  if (!lead) return skip("no lead (the 'In short' answer)");
  const publishedAt = str(p.publishedAt);
  if (!validDate(publishedAt)) return skip(`publishedAt "${publishedAt}" is not a real YYYY-MM-DD date`);
  if (publishedAt > today) return skip(`publishedAt ${publishedAt} is after today (${today}, IST); it builds on or after that date`);
  let updatedAt = str(p.updatedAt);
  if (!validDate(updatedAt)) { if (updatedAt) warn(`${slug}: updatedAt "${updatedAt}" is not a date, using publishedAt`); updatedAt = publishedAt; }
  if (updatedAt < publishedAt) { warn(`${slug}: updatedAt is before publishedAt, using publishedAt`); updatedAt = publishedAt; }
  if (updatedAt > today) { warn(`${slug}: updatedAt is after today, using today`); updatedAt = today; }
  const heroImg = str(p.hero?.img);
  if (!assetExists(root, heroImg)) return skip(`header picture assets/${heroImg || "(none)"} does not exist`);
  let heroAlt = str(p.hero?.alt);
  if (!heroAlt) { warn(`${slug}: header picture has no alt text, using the title`); heroAlt = title; }
  if (!Array.isArray(p.blocks)) return skip("blocks is not an array");
  const used = new Set();
  const blocks = p.blocks.map((b, k) => normBlock(b, k, slug, root, warn, used)).filter(Boolean);
  if (!blocks.length) return skip("no valid sections");
  if (blocks.length < 3 || blocks.length > 20) warn(`${slug}: ${blocks.length} sections (contract: 3 to 20)`);
  const points = (Array.isArray(p.points) ? p.points : []).filter((x) => isObj(x) && (str(x.title) || str(x.text))).slice(0, 5).map((x) => ({ title: str(x.title), text: str(x.text) }));
  const faq = (Array.isArray(p.faq) ? p.faq : []).filter((x) => isObj(x) && str(x.q) && str(x.a)).slice(0, 10).map((x) => ({ q: str(x.q), a: cleanInline(str(x.a)) }));
  const author = isObj(p.author) && str(p.author.name) ? { name: str(p.author.name), role: str(p.author.role) } : null;
  const seo = isObj(p.seo) ? p.seo : {};
  let canonical = str(seo.canonical);
  if (canonical && !/^https:\/\/[^\s"<>]+$/.test(canonical)) { warn(`${slug}: seo.canonical "${canonical}" is not an absolute https URL, ignored`); canonical = ""; }
  let ogImage = str(seo.ogImage);
  if (ogImage && !assetExists(root, ogImage.replace(/^\/?assets\//, ""))) { warn(`${slug}: seo.ogImage ${ogImage} does not exist, using the header picture`); ogImage = ""; }
  if (ogImage) ogImage = ogImage.replace(/^\/?assets\//, "");
  const cta = isObj(p.cta) ? { h2a: str(p.cta.h2a), h2b: str(p.cta.h2b), lede: str(p.cta.lede) } : { h2a: "", h2b: "", lede: "" };
  const path = `/${section}/${slug}/`;
  const ownUrl = SITE + path;
  const noindex = seo.noindex === true;
  const canonicalUrl = canonical || ownUrl;
  return {
    slug, section, path, url: ownUrl, canonical: canonicalUrl,
    title, short: str(p.short) || title, desc, tag: str(p.tag), tags: (Array.isArray(p.tags) ? p.tags : []).map(str).filter(Boolean),
    author, publishedAt, updatedAt, standfirst: str(p.standfirst), lead, points,
    hero: { img: heroImg, alt: heroAlt }, blocks, faq,
    related: (Array.isArray(p.related) ? p.related : []).map(str).filter((s) => s && s !== slug).slice(0, 4),
    cta,
    seo: { title: str(seo.title), description: str(seo.description), ogImage, noindex },
    // Listed (index pages, sitemap, llms files) only when indexable and canonical to itself.
    indexable: !noindex && canonicalUrl === ownUrl,
    words: wordCount(blocks), mins: readMinutes(blocks),
  };
}

/**
 * Loads and validates the posts. Returns { posts, warnings, file }. Never throws on bad data: an unreadable or non-array file
 * gives zero posts and a warning.
 */
export function loadPosts({ root = process.cwd(), file = process.env.MMC_POSTS_FILE, today = todayIST(), quiet = false } = {}) {
  const warnings = [];
  const warn = (m) => { warnings.push(m); if (!quiet) console.warn(`[posts] ${m}`); };
  const path = resolve(root, file || "src/data/posts.generated.json");
  let raw = [];
  if (!existsSync(path)) warn(`${path} not found, building with no CMS posts`);
  else {
    try { raw = JSON.parse(readFileSync(path, "utf8")); }
    catch (e) { warn(`${path} is not valid JSON (${e.message}), building with no CMS posts`); raw = []; }
    if (!Array.isArray(raw)) { warn(`${path} is not an array, building with no CMS posts`); raw = []; }
  }
  const ctx = { root, today, warn, guideSlugs: existingGuideSlugs(root) };
  const seen = new Set();
  const posts = [];
  raw.forEach((p, i) => {
    const n = normPost(p, i, ctx);
    if (!n) return;
    if (seen.has(n.slug)) { warn(`post ${n.slug} skipped: duplicate slug (slugs are unique across guides and blog)`); return; }
    seen.add(n.slug);
    posts.push(n);
  });
  return { posts, warnings, file: path };
}

// Writes the Command Centre redirects into an .htaccess as ONE generated block (Command Centre Phase 4).
// Usage: node tools/apply-redirects.mjs <path/to/.htaccess> <redirects.json> [--dist <builtSiteDir>] [--dry-run]
//        node tools/apply-redirects.mjs --selftest
// Input: [{ "source": "/old/", "target": "/new/" | "https://...", "type": 301 | 302 }] (type defaults to 301).
// The block sits between "# BEGIN MMC-CMS-REDIRECTS" and "# END MMC-CMS-REDIRECTS" and is replaced on every run (an empty list
// leaves the markers with no rules). If the markers are missing, the block is inserted right before the first line that starts
// "# Add the missing trailing slash" (public/.htaccess carries the empty marker pair at that spot). Every rule is written in the
// style of the existing ones: RewriteRule ^path/?$ <absolute target> [R=301,L].
// Refuses (exit 2, nothing written) when any entry is invalid: source not a plain site path (letters, digits, - _ . ~ /), source "/",
// target equal to source, target not a site path or https URL, duplicate sources, chains or loops between entries (A->B and B->C:
// point A at C instead), a source the file already redirects, a target the file already redirects, a source that is a built page,
// or (with a build) a site-path target that does not exist. --dist defaults to the folder of the .htaccess when that folder holds
// an index.html (i.e. a built site). Exit 1: usage or file errors. Exit 0: written (or --dry-run: printed).
import { readFileSync, writeFileSync, existsSync, renameSync, mkdtempSync, mkdirSync, rmSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { tmpdir } from "node:os";

const SITE = "https://www.mondaymarketing.company";
const BEGIN = "# BEGIN MMC-CMS-REDIRECTS";
const END = "# END MMC-CMS-REDIRECTS";
const ANCHOR = /^# Add the missing trailing slash/;
const PATH_RE = /^\/[A-Za-z0-9._~\-\/]*$/;
const HOST_RE = /^https?:\/\/(?:www\.)?mondaymarketing\.company(?=\/|$)/i;

// Private areas: a redirect from any of these could hand a visitor's private link (the token sits in the URL fragment) to another site.
const FORBIDDEN = /^\/(admin|api|forms|assets|candidate|assessment|_astro|pricing-model)(\/|$)/i;

class Refuse extends Error {}

const norm = (p) => (p.length > 1 ? p.replace(/\/+$/, "") : p); // "/old/" and "/old" are the same source
const sitePath = (t) => {
  if (HOST_RE.test(t)) return t.replace(HOST_RE, "") || "/";
  return t.startsWith("/") ? t : null;
};
const pageExists = (dist, p) => {
  const clean = p.split(/[?#]/)[0];
  return existsSync(join(dist, clean, "index.html")) || (/\.[a-z0-9]{2,5}$/i.test(clean) && existsSync(join(dist, clean)));
};

/** Existing unconditional redirect rules outside the generated block: [{ line, re, pattern }]. */
function existingRules(text) {
  const out = [];
  let cond = false, inBlock = false, n = 0;
  for (const line of text.split("\n")) {
    n++;
    const t = line.trim();
    if (t === BEGIN) { inBlock = true; continue; }
    if (t === END) { inBlock = false; continue; }
    if (!t || t.startsWith("#")) continue;
    if (/^RewriteCond\b/i.test(t)) { cond = true; continue; }
    const m = t.match(/^RewriteRule\s+(\S+)\s+(\S+)\s+\[([^\]]*)\]/i);
    if (m && !cond && !inBlock && /\bR(=\d+)?\b/.test(m[3])) {
      try { out.push({ line: n, pattern: m[1], re: new RegExp(m[1].replace(/\\ /g, " ")) }); } catch {}
    }
    cond = false;
  }
  return out;
}

/** Validates the list and returns the rule lines. Throws Refuse with every problem found. */
export function buildRules(list, { htaccess = "", dist = null } = {}) {
  const problems = [];
  if (!Array.isArray(list)) throw new Refuse("redirects file must hold a JSON array");
  const old = existingRules(htaccess);
  const items = list.map((r, i) => {
    const where = `entry ${i + 1}`;
    if (!r || typeof r !== "object") { problems.push(`${where}: not an object`); return null; }
    const source = typeof r.source === "string" ? r.source.trim() : "";
    const target = typeof r.target === "string" ? r.target.trim() : "";
    const type = r.type === undefined ? 301 : Number(r.type);
    const tag = `${where} (${source || "no source"} -> ${target || "no target"})`;
    let bad = false;
    if (!source.startsWith("/")) { problems.push(`${tag}: source must start with "/"`); bad = true; }
    else if (!PATH_RE.test(source)) { problems.push(`${tag}: source may only contain letters, digits, - _ . ~ and / (no spaces, query strings or regex characters)`); bad = true; }
    else if (norm(source) === "/") { problems.push(`${tag}: the home page "/" cannot be redirected`); bad = true; }
    else if (FORBIDDEN.test(source)) { problems.push(`${tag}: ${source} is a protected address and cannot be redirected`); bad = true; }
    else if (/\/\/|(^|\/)\.\.?(\/|$)/.test(source)) { problems.push(`${tag}: source has an empty or dot segment`); bad = true; }
    if (type !== 301 && type !== 302) { problems.push(`${tag}: type must be 301 or 302`); bad = true; }
    let tPath = null;
    if (!target) { problems.push(`${tag}: no target`); bad = true; }
    else if (/^https:\/\//i.test(target)) {
      if (!/^https:\/\/[A-Za-z0-9.-]+\.[A-Za-z]{2,}(:\d+)?(\/[^\s"'<>\\`]*)?$/.test(target)) { problems.push(`${tag}: target is not a valid https URL`); bad = true; }
      else tPath = HOST_RE.test(target) ? sitePath(target) : null;
    } else if (target.startsWith("/") && !target.startsWith("//")) {
      if (!/^\/[A-Za-z0-9._~\-\/]*(\?[A-Za-z0-9._~\-=&%]*)?(#[A-Za-z0-9._~\-]*)?$/.test(target)) { problems.push(`${tag}: target path has characters that are not allowed`); bad = true; }
      else tPath = target;
    } else { problems.push(`${tag}: target must be a site path ("/new/") or an https URL`); bad = true; }
    if (!bad && tPath !== null && norm(tPath.split(/[?#]/)[0]) === norm(source)) { problems.push(`${tag}: target is the same as the source`); bad = true; }
    return bad ? null : { i, source, target, type, tPath, tag };
  });
  const ok = items.filter(Boolean);
  // Duplicates
  const bySource = new Map();
  for (const it of ok) {
    const k = norm(it.source);
    if (bySource.has(k)) problems.push(`${it.tag}: duplicate source, already used by entry ${bySource.get(k).i + 1}`);
    else bySource.set(k, it);
  }
  // Chains and loops between entries
  for (const it of ok) {
    if (it.tPath === null) continue;
    const next = bySource.get(norm(it.tPath.split(/[?#]/)[0]));
    if (!next || next === it) continue;
    const back = next.tPath !== null && norm(next.tPath.split(/[?#]/)[0]) === norm(it.source);
    problems.push(back
      ? `${it.tag}: loop with entry ${next.i + 1} (${next.source} -> ${next.target})`
      : `${it.tag}: chain, the target is itself redirected by entry ${next.i + 1} (${next.source} -> ${next.target}); point ${it.source} at ${next.target} instead`);
  }
  // Against the rules already in the file, and the built site
  for (const it of ok) {
    const s = norm(it.source).replace(/^\//, "");
    const hitS = old.find((r) => r.re.test(s) || r.re.test(s + "/"));
    if (hitS) problems.push(`${it.tag}: the .htaccess already redirects this source (line ${hitS.line}: ${hitS.pattern}), and that rule runs first`);
    if (it.tPath !== null) {
      const tp = it.tPath.split(/[?#]/)[0].replace(/^\//, "");
      const hitT = tp && old.find((r) => r.re.test(tp));
      if (hitT) problems.push(`${it.tag}: chain, the target is redirected by .htaccess line ${hitT.line} (${hitT.pattern}); use that rule's destination instead`);
    }
    if (dist) {
      if (pageExists(dist, it.source.endsWith("/") ? it.source : it.source + "/") || pageExists(dist, it.source)) problems.push(`${it.tag}: the source is a built page in ${dist}; redirecting it would hide the page`);
      if (it.tPath !== null && !pageExists(dist, it.tPath)) problems.push(`${it.tag}: the target ${it.tPath} is not a page in ${dist}`);
    }
  }
  if (problems.length) throw new Refuse(problems.join("\n"));
  return ok.map((it) => {
    const pat = norm(it.source).replace(/^\//, "").replace(/[.]/g, "\\.");
    const abs = it.tPath !== null && !/^https:/i.test(it.target) ? SITE + it.tPath : it.target;
    return `RewriteRule ^${pat}/?$ ${abs} [R=${it.type},L]`;
  });
}

/** Returns the new .htaccess text with the generated block in place. */
export function applyBlock(text, rules, label = "redirects.json") {
  const block = [BEGIN, `# Generated by tools/apply-redirects.mjs from ${label}. Edit redirects in the Command Centre, not here.`, ...rules, END];
  const lines = text.split("\n");
  const b = lines.findIndex((l) => l.trim() === BEGIN), e = lines.findIndex((l) => l.trim() === END);
  if (b >= 0 || e >= 0) {
    if (b < 0 || e < 0 || e < b) throw new Refuse(`the .htaccess has a broken ${BEGIN} / ${END} pair; fix it by hand first`);
    if (lines.filter((l) => l.trim() === BEGIN).length > 1) throw new Refuse(`the .htaccess has more than one ${BEGIN} line`);
    lines.splice(b, e - b + 1, ...block);
    return lines.join("\n");
  }
  const a = lines.findIndex((l) => ANCHOR.test(l.trim()));
  if (a < 0) throw new Refuse(`no ${BEGIN} markers and no "# Add the missing trailing slash" line to insert before`);
  lines.splice(a, 0, ...block, "");
  return lines.join("\n");
}

function run(htPath, jsonPath, opts) {
  if (!existsSync(htPath)) { console.error(`no such file: ${htPath}`); return 1; }
  if (!existsSync(jsonPath)) { console.error(`no such file: ${jsonPath}`); return 1; }
  let list;
  try { list = JSON.parse(readFileSync(jsonPath, "utf8")); } catch (e) { console.error(`REFUSED: ${jsonPath} is not valid JSON (${e.message}). Nothing written.`); return 2; }
  const text = readFileSync(htPath, "utf8");
  let dist = opts.dist;
  if (!dist && existsSync(join(dirname(htPath), "index.html"))) dist = dirname(htPath);
  try {
    const rules = buildRules(list, { htaccess: text, dist });
    const out = applyBlock(text, rules, jsonPath.split("/").pop());
    if (opts.dryRun) { console.log(out); return 0; }
    if (out !== text) { const tmp = htPath + ".tmp-" + process.pid; writeFileSync(tmp, out); renameSync(tmp, htPath); }
    console.log(`${htPath}: ${rules.length} CMS redirect rule(s) written${dist ? ` (checked against ${dist})` : ""}.`);
    return 0;
  } catch (e) {
    if (e instanceof Refuse) { console.error("REFUSED, nothing written:\n - " + e.message.split("\n").join("\n - ")); return 2; }
    throw e;
  }
}

function selftest() {
  const dir = mkdtempSync(join(tmpdir(), "mmc-redirects-"));
  const dist = join(dir, "dist");
  for (const p of ["", "new", "guides/x", "blog/live"]) { mkdirSync(join(dist, p), { recursive: true }); writeFileSync(join(dist, p, "index.html"), "<h1>x</h1>"); }
  const base = ["<IfModule mod_rewrite.c>", "RewriteEngine On", `RewriteRule ^old-wp/?$ ${SITE}/new/ [R=301,L]`, "",
    "# Add the missing trailing slash on real folders", "RewriteCond %{REQUEST_FILENAME} -d", "RewriteCond %{REQUEST_URI} !/$", `RewriteRule ^(.+)$ ${SITE}/$1/ [R=301,L]`, "</IfModule>", ""].join("\n");
  writeFileSync(join(dist, ".htaccess"), base);
  let pass = 0, fail = 0;
  const t = (name, fn) => { try { fn(); pass++; console.log("  ok   " + name); } catch (e) { fail++; console.log("  FAIL " + name + ": " + e.message); } };
  const refuses = (list, re, d = dist) => { try { buildRules(list, { htaccess: base, dist: d }); } catch (e) { if (e instanceof Refuse && (!re || re.test(e.message))) return; throw new Error("wrong error: " + e.message); } throw new Error("accepted, expected a refusal"); };
  const eq = (a, b) => { if (a !== b) throw new Error(`expected ${JSON.stringify(b)}, got ${JSON.stringify(a)}`); };

  t("valid rules are written in the house style", () => {
    const r = buildRules([{ source: "/old-post/", target: "/new/", type: 301 }, { source: "/promo.html", target: "https://example.com/x", type: 302 }], { htaccess: base, dist });
    eq(r[0], `RewriteRule ^old-post/?$ ${SITE}/new/ [R=301,L]`);
    eq(r[1], "RewriteRule ^promo\\.html/?$ https://example.com/x [R=302,L]");
  });
  t("type defaults to 301", () => eq(buildRules([{ source: "/a-b", target: "/new/" }], { htaccess: base, dist })[0], `RewriteRule ^a-b/?$ ${SITE}/new/ [R=301,L]`));
  t("own-domain https target is kept absolute", () => eq(buildRules([{ source: "/x1/", target: SITE + "/new/" }], { htaccess: base, dist })[0], `RewriteRule ^x1/?$ ${SITE}/new/ [R=301,L]`));
  t("refuses a source without a leading slash", () => refuses([{ source: "old/", target: "/new/" }], /start with/));
  t("refuses regex characters in the source", () => refuses([{ source: "/old(.*)", target: "/new/" }], /may only contain/));
  t("refuses whitespace in the source", () => refuses([{ source: "/old page/", target: "/new/" }], /may only contain/));
  t("refuses the home page", () => refuses([{ source: "/", target: "/new/" }], /home page/));
  t("refuses protected private prefixes as a source", () => { for (const s of ["/candidate/", "/assessment/", "/admin/", "/api/x", "/forms/send.php", "/Candidate/"]) refuses([{ source: s, target: "https://evil.example/" }], /protected address/); });
  t("refuses target equal to source", () => refuses([{ source: "/same/", target: "/same" }], /same as the source/));
  t("refuses a target that is not a path or https", () => refuses([{ source: "/a1/", target: "http://example.com/" }], /site path/));
  t("refuses javascript: targets", () => refuses([{ source: "/a1/", target: "javascript:alert(1)" }], /site path/));
  t("refuses duplicate sources", () => refuses([{ source: "/d1/", target: "/new/" }, { source: "/d1", target: "/guides/x/" }], /duplicate source/));
  t("refuses a chain", () => refuses([{ source: "/c1/", target: "/c2/" }, { source: "/c2/", target: "/new/" }], /chain/, null));
  t("refuses a loop", () => refuses([{ source: "/l1/", target: "/l2/" }, { source: "/l2/", target: "/l1/" }], /loop/, null));
  t("refuses a source the file already redirects", () => refuses([{ source: "/old-wp/", target: "/guides/x/" }], /already redirects/));
  t("refuses a target the file redirects (chain through old rules)", () => refuses([{ source: "/z1/", target: "/old-wp/" }], /chain/, null));
  t("refuses a source that is a built page", () => refuses([{ source: "/blog/live/", target: "/new/" }], /built page/));
  t("refuses a site-path target missing from the build", () => refuses([{ source: "/z2/", target: "/nowhere/" }], /not a page/));
  t("refuses a bad type", () => refuses([{ source: "/z3/", target: "/new/", type: 307 }], /301 or 302/));
  t("inserts before the trailing-slash rule when markers are absent", () => {
    const out = applyBlock(base, ["RewriteRule ^a/?$ x [R=301,L]"]);
    const L = out.split("\n");
    eq(L.indexOf(BEGIN) < L.findIndex((l) => ANCHOR.test(l)), true);
    eq(L.indexOf(BEGIN) > L.findIndex((l) => l.includes("^old-wp")), true);
  });
  t("replaces the block on a second run (idempotent, one block)", () => {
    const once = applyBlock(base, ["RewriteRule ^a/?$ x [R=301,L]"]);
    const twice = applyBlock(once, ["RewriteRule ^b/?$ y [R=301,L]"]);
    eq(twice.split(BEGIN).length - 1, 1);
    eq(twice.includes("^a/?$"), false);
    eq(applyBlock(twice, ["RewriteRule ^b/?$ y [R=301,L]"]), twice);
  });
  t("empty list leaves an empty marked block", () => { const o = applyBlock(base, []); eq(o.includes(BEGIN) && o.includes(END), true); eq(/RewriteRule \^[a-z]/.test(o.slice(o.indexOf(BEGIN), o.indexOf(END))), false); });
  t("CLI refusal writes nothing and exits 2", () => {
    const j = join(dir, "bad.json"); writeFileSync(j, JSON.stringify([{ source: "/new/", target: "/guides/x/" }]));
    const before = readFileSync(join(dist, ".htaccess"), "utf8");
    const code = run(join(dist, ".htaccess"), j, {});
    eq(code, 2); eq(readFileSync(join(dist, ".htaccess"), "utf8"), before);
  });
  t("CLI success writes one block and exits 0", () => {
    const j = join(dir, "good.json"); writeFileSync(j, JSON.stringify([{ source: "/gone-post/", target: "/guides/x/", type: 301 }]));
    eq(run(join(dist, ".htaccess"), j, {}), 0);
    const o = readFileSync(join(dist, ".htaccess"), "utf8");
    eq(o.includes(`RewriteRule ^gone-post/?$ ${SITE}/guides/x/ [R=301,L]`), true);
  });
  rmSync(dir, { recursive: true, force: true });
  console.log(`\nselftest: ${pass} passed, ${fail} failed`);
  return fail ? 1 : 0;
}

const argv = process.argv.slice(2);
if (argv.includes("--selftest")) process.exit(selftest());
const pos = argv.filter((a, i) => !a.startsWith("--") && argv[i - 1] !== "--dist");
const di = argv.indexOf("--dist");
if (pos.length !== 2) { console.error("usage: node tools/apply-redirects.mjs <path/to/.htaccess> <redirects.json> [--dist <builtSiteDir>] [--dry-run] | --selftest"); process.exit(1); }
process.exit(run(resolve(pos[0]), resolve(pos[1]), { dist: di >= 0 ? argv[di + 1] : null, dryRun: argv.includes("--dry-run") }));

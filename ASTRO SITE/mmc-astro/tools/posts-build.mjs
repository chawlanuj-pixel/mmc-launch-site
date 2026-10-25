// Command Centre articles (Phase 4): build-time glue used by astro.config.mjs.
//  - postsSitemap(): the URLs to keep out of the sitemap (noindex or canonical elsewhere) and lastmod (updatedAt) per post URL.
//  - mmcPosts(): an integration that, after the build, stops dist/.htaccess redirecting a URL that is now a CMS page. public/.htaccess
//    sends /blog/ to /guides/ (no blog on the launch site) and three old WordPress /blog/<post>/ URLs elsewhere; when a CMS post or the
//    /blog/ index is built at such a URL, the rule is commented out in the BUILT copy only, with a note. public/.htaccess never changes,
//    so with no posts the deployed file is identical to today's. Only unconditional [R=...] rules are touched (never a rule that
//    follows a RewriteCond, such as the trailing-slash and https/www rules).
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { loadPosts, SITE } from "../src/lib/posts-core.mjs";

export function postsSitemap() {
  const { posts } = loadPosts({ quiet: true });
  const exclude = new Set(posts.filter((p) => !p.indexable).map((p) => p.url));
  const lastmod = {};
  for (const p of posts) if (p.indexable) lastmod[p.url] = p.updatedAt;
  const blog = posts.filter((p) => p.section === "blog" && p.indexable).map((p) => p.updatedAt).sort();
  if (blog.length) lastmod[SITE + "/blog/"] = blog[blog.length - 1];
  return { exclude, lastmod, posts };
}

/** Comments out unconditional redirect rules whose pattern matches one of `paths` ("/blog/", "/blog/x/"). Returns the new text and what changed. */
export function unshadow(htaccess, paths) {
  const lines = htaccess.split("\n");
  const changed = [];
  let prevCond = false;
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    const t = l.trim();
    if (/^RewriteCond\b/i.test(t)) { prevCond = true; continue; }
    const m = t.match(/^RewriteRule\s+(\S+)\s+(\S+)\s+\[([^\]]*)\]/i);
    if (m && !prevCond && /\bR(=\d+)?\b/.test(m[3])) {
      let re = null;
      try { re = new RegExp(m[1].replace(/\\ /g, " ")); } catch {}
      const hit = re && paths.find((p) => re.test(p.replace(/^\//, "")));
      if (hit) { lines[i] = `# [MMC-CMS] disabled at build: ${hit} is now a page. Was: ${l}`; changed.push({ path: hit, rule: t }); }
    }
    if (m || (t && !t.startsWith("#"))) prevCond = false;
  }
  return { text: lines.join("\n"), changed };
}

export function mmcPosts() {
  return {
    name: "mmc-posts",
    hooks: {
      "astro:build:done": ({ dir, logger }) => {
        const out = fileURLToPath(dir);
        const f = join(out, ".htaccess");
        if (!existsSync(f)) return;
        const { posts } = loadPosts({ quiet: true });
        const paths = posts.map((p) => p.path).filter((p) => existsSync(join(out, p, "index.html")));
        if (existsSync(join(out, "blog", "index.html"))) paths.unshift("/blog/");
        if (!paths.length) return;
        const { text, changed } = unshadow(readFileSync(f, "utf8"), paths);
        if (!changed.length) return;
        writeFileSync(f, text);
        for (const c of changed) { const msg = `.htaccess rule disabled in the build because ${c.path} is now a page: ${c.rule}`; if (logger) logger.warn(msg); else console.warn("[posts] " + msg); }
      },
    },
  };
}

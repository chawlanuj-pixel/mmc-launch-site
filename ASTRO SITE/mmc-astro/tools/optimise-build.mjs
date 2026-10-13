// Post-build optimiser. Generic and re-runnable: it reads only the built HTML + CSS in <dist>, never the sources.
//   node tools/optimise-build.mjs <dist>            (also runs automatically after `astro build`, see astro.config.mjs;
//                                                   set MMC_NO_OPTIMISE=1 to skip it for an A/B build)
// What it does to every .html file:
//   1. Critical CSS (beasties): every rule that matches an element in that page is inlined into one <style>; the original
//      stylesheet <link> stays but loads without blocking render (media=print + onload swap, with a <noscript> fallback).
//      Result: first paint no longer waits for 30 to 160 KB of external CSS, and the full sheet still arrives for
//      states JS adds later (menus, modals, hover, reveal).
//   2. Optional font-face inlining, OFF by default: MMC_INLINE_FONTS=critical inlines the @font-face of the two preloaded fonts, =all inlines every face.
//      Measured: no CLS benefit once the size-adjusted fallbacks are in (BaseLayout), and no better mobile score. No preloads are added or removed.
//   <style data-keep> blocks (BaseLayout's fallback faces and CLS guard) are protected from pruning.
//   3. Tiny-image downscale: an <img> declared 64 px or smaller (e.g. the AI menu thumbnails, 52 px) that points at a much larger
//      jpg/png (or an <img> with an inline px size up to 240) gets a 3x-density copy written next to it in <dist> (name.t156.jpg) and its src is rewritten.
//      Originals are untouched. Footer images without a loading attribute, and loading="eager" images
//      after the hero section that are not fetchpriority=high, become loading="lazy".
// Idempotent: a page already processed carries <meta name="mmc-optimised"> and is skipped.
import { readdirSync, readFileSync, writeFileSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { existsSync } from "node:fs";
import Beasties from "beasties";
import sharp from "sharp";

const walk = (d) => readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(join(d, e.name)) : [join(d, e.name)]));

export async function optimise(distDir, { quiet = false } = {}) {
  const dist = resolve(distDir);
  const beasties = new Beasties({
    path: dist, publicPath: "/", logLevel: "silent",
    preload: "media", noscriptFallback: true,
    inlineFonts: false, preloadFonts: false,  // beasties does not inline our faces reliably; step 2 below injects them. Only the 2 layout preloads stay
    pruneSource: false, mergeStylesheets: true, reduceInlineStyles: false, keyframes: "all",
  });
  // Self-hosted @font-face rules (woff2 only), found in the built CSS, so text can use the real font as soon as the preloaded files arrive
  // instead of waiting for the deferred stylesheet. Unused weights cost nothing: a face only downloads when text uses it.
  const faces = new Set();
  for (const f of walk(dist).filter((f) => f.endsWith(".css"))) {
    for (const m of readFileSync(f, "utf8").matchAll(/@font-face\s*\{[^}]*\}/g)) {
      const w = /url\(\s*["']?([^"')]+\.woff2)["']?\s*\)/.exec(m[0]);
      if (!w || /Fallback/.test(m[0])) continue;
      const url = w[1].startsWith("/") ? w[1] : "/_astro/" + w[1].split("/").pop();
      faces.add(m[0].replace(/src:[^;]*;/, `src:url(${url}) format("woff2");`).replace(/\s+/g, " "));
    }
  }
  // Per page: only the faces whose file the page already preloads (the 2 critical ones), so they are usable on first paint without any extra download.
  // MMC_INLINE_FONTS: none (default) | critical | all.
  const faceTagFor = (html) => {
    const pre = new Set([...html.matchAll(/<link[^>]+rel="preload"[^>]+as="font"[^>]*>/g)].map((m) => (/href="([^"]+)"/.exec(m[0]) || [])[1]));
    const mode = process.env.MMC_INLINE_FONTS || "none"; // none | critical | all
    const pick = mode === "none" ? [] : [...faces].filter((f) => mode === "all" || pre.has((/url\(([^)]+)\)/.exec(f) || [])[1]));
    return pick.length ? "<style>" + pick.join("") + "</style>" : "";
  };
  const thumbs = new Map();
  async function thumbFor(src, h) {
    const key = src + "@" + h;
    if (thumbs.has(key)) return thumbs.get(key);
    let res = null;
    const abs = join(dist, src.replace(/^\//, ""));
    if (/\.(jpe?g|png)$/i.test(src) && existsSync(abs)) {
      const meta = await sharp(abs).metadata();
      if (meta.height > h * 1.5) {
        const out = src.replace(/\.(jpe?g|png)$/i, `.t${h}.$1`);
        const img = sharp(abs).resize({ height: h, withoutEnlargement: true });
        await (/png$/i.test(src) ? img.png({ compressionLevel: 9, palette: true }) : img.jpeg({ quality: 80, mozjpeg: true })).toFile(join(dist, out.replace(/^\//, "")));
        res = out;
      }
    }
    thumbs.set(key, res);
    return res;
  }
  async function shrinkTinyImages(html) {
    const tags = [...new Set(html.match(/<img\b[^>]*>/g) || [])];
    for (const t of tags) {
      if (/srcset=/.test(t)) continue;
      const src = (/\ssrc="([^"]+)"/.exec(t) || [])[1];
      if (!src || /^https?:/.test(src)) continue;
      // Authoritative size: inline style px (up to 240) or width/height attributes (up to 64, since CSS may override attributes).
      const sw = +(/style="[^"]*\bwidth:\s*(\d+)px/.exec(t) || [])[1], sh = +(/style="[^"]*\bheight:\s*(\d+)px/.exec(t) || [])[1];
      const aw = +(/\swidth="(\d+)"/.exec(t) || [])[1], ah = +(/\sheight="(\d+)"/.exec(t) || [])[1];
      let h = 0;
      if (sh && sw && sw <= 240 && sh <= 240) h = sh; else if (aw && ah && aw <= 64 && ah <= 64) h = ah;
      if (!h) continue;
      const thumb = await thumbFor(src, h * 3);
      if (thumb) html = html.split(t).join(t.replace(`src="${src}"`, `src="${thumb}"`));
    }
    // loading="eager" images that come after the hero section (<section id="top">) and are not marked fetchpriority=high are below the fold: make them lazy.
    const top = /<section\b[^>]*\bid="top"[^>]*>[\s\S]*?<\/section>/.exec(html);
    if (top) {
      const cut = top.index + top[0].length;
      html = html.slice(0, cut) + html.slice(cut).replace(/<img\b[^>]*\sloading="eager"[^>]*>/g, (t) => (/fetchpriority="high"/.test(t) ? t : t.replace('loading="eager"', 'loading="lazy"')));
    }
    // Images in the footer are never above the fold: lazy-load any that the page did not already mark.
    html = html.replace(/<footer\b[\s\S]*?<\/footer>/g, (ft) => ft.replace(/<img\b(?![^>]*\sloading=)/g, '<img loading="lazy" decoding="async"'));
    return html;
  }
  const files = walk(dist).filter((f) => f.endsWith(".html"));
  let n = 0, skipped = 0, before = 0, after = 0, inlinedMax = 0;
  const queue = files.slice();
  async function worker() {
    for (let f; (f = queue.pop()); ) {
      const html = readFileSync(f, "utf8");
      if (html.includes('name="mmc-optimised"') || !/<link[^>]+rel="stylesheet"/.test(html)) { skipped++; continue; }
      // <style data-keep> blocks (layout-level @font-face fallbacks, CLS guards) are set aside: beasties would prune rules that match no element.
      const kept = [];
      const stripped = html.replace(/<style\b[^>]*\bdata-keep\b[^>]*>[\s\S]*?<\/style>/g, (m) => (kept.push(m.replace(/\sdata-keep(="")?/, "")), ""));
      let out = await shrinkTinyImages(await beasties.process(stripped));
      out = out.replace("</head>", kept.join("") + faceTagFor(html) + '<meta name="mmc-optimised" content="critical-css"></head>');
      writeFileSync(f, out);
      n++; before += html.length; after += out.length; inlinedMax = Math.max(inlinedMax, out.length - html.length);
    }
  }
  await Promise.all([worker(), worker(), worker(), worker()]);
  if (!quiet) console.log(`[optimise-build] ${n} pages processed, ${skipped} skipped. HTML ${(before / 1048576).toFixed(1)} MB -> ${(after / 1048576).toFixed(1)} MB, largest page grew ${(inlinedMax / 1024).toFixed(0)} KB (raw, before gzip).`);
  return { n, skipped };
}

// Astro integration: runs after every build into whatever outDir was used.
export function mmcOptimise() {
  return {
    name: "mmc-optimise-build",
    hooks: { "astro:build:done": async ({ dir }) => { if (process.env.MMC_NO_OPTIMISE) return; await optimise(fileURLToPath(dir)); } },
  };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  const dir = process.argv[2];
  if (!dir) { console.error("usage: node tools/optimise-build.mjs <dist>"); process.exit(1); }
  statSync(dir);
  await optimise(dir);
}

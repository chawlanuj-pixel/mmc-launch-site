// Creates webp and avif siblings (same dimensions) for jpg/png files under public/. Never deletes or overwrites originals.
// Dry run by default. Usage: node tools/optimise-images.mjs [--write] [--min=40000] [dir ...]
// Siblings are only kept when smaller than the original. Wire them in with <picture> afterwards.
import { readdirSync, statSync, existsSync, writeFileSync } from "node:fs";
import { join, extname, resolve } from "node:path";
import sharp from "sharp";
const args = process.argv.slice(2);
const write = args.includes("--write");
const min = Number((args.find((a) => a.startsWith("--min=")) || "--min=40000").split("=")[1]);
const dirs = args.filter((a) => !a.startsWith("--"));
const roots = (dirs.length ? dirs : ["public/assets"]).map((d) => resolve(d));
const walk = (d) => readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(join(d, e.name)) : [join(d, e.name)]));
let before = 0, after = 0, n = 0;
for (const f of roots.flatMap(walk)) {
  if (!/\.(jpe?g|png)$/i.test(f) || /\/og\//.test(f)) continue;
  const size = statSync(f).size;
  if (size < min) continue;
  const base = f.slice(0, -extname(f).length);
  for (const [ext, make] of [[".webp", (s) => s.webp({ quality: 80, effort: 5 })], [".avif", (s) => s.avif({ quality: 55, effort: 4 })]]) {
    if (existsSync(base + ext)) continue;
    const buf = await make(sharp(f)).toBuffer();
    if (buf.length >= size) { console.log("skip (not smaller)", base + ext); continue; }
    n++; before += size; after += buf.length;
    console.log((write ? "write " : "would write ") + base + ext, Math.round(size / 1024) + "KB ->", Math.round(buf.length / 1024) + "KB");
    if (write) writeFileSync(base + ext, buf);
  }
}
console.log(`${n} files, ${(before / 1048576).toFixed(1)}MB -> ${(after / 1048576).toFixed(1)}MB`, write ? "" : "(dry run, pass --write to create)");

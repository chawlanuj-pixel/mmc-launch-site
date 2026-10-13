// Recompresses jpg/png under public/assets IN PLACE at the SAME pixel dimensions and filenames (no page edit needed).
// Safety net: a candidate is only kept when it is at least 10% smaller AND PSNR against the original is >= 38 dB (visually lossless at normal viewing).
// Originals are copied to the backup dir first (default: ./.image-backup, gitignored by being outside src; pass --backup=<dir>).
// Usage: node tools/recompress-images.mjs [--write] [--min=30000] [--backup=<dir>] [dir ...]   (dry run unless --write)
import { readdirSync, statSync, writeFileSync, mkdirSync, copyFileSync, readFileSync } from "node:fs";
import { join, resolve, relative, dirname } from "node:path";
import sharp from "sharp";
const args = process.argv.slice(2);
const write = args.includes("--write");
const min = Number((args.find((a) => a.startsWith("--min=")) || "--min=30000").split("=")[1]);
const backup = resolve((args.find((a) => a.startsWith("--backup=")) || "--backup=.image-backup").split("=")[1]);
const dirs = args.filter((a) => !a.startsWith("--"));
const roots = (dirs.length ? dirs : ["public/assets"]).map((d) => resolve(d));
const walk = (d) => readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(join(d, e.name)) : [join(d, e.name)]));
async function psnr(a, b) {
  const [x, y] = await Promise.all([sharp(a).ensureAlpha().raw().toBuffer({ resolveWithObject: true }), sharp(b).ensureAlpha().raw().toBuffer({ resolveWithObject: true })]);
  if (x.info.width !== y.info.width || x.info.height !== y.info.height) return 0;
  let se = 0; const n = x.data.length;
  for (let i = 0; i < n; i++) { const d = x.data[i] - y.data[i]; se += d * d; }
  return se === 0 ? 99 : 10 * Math.log10((255 * 255) / (se / n));
}
let before = 0, after = 0, kept = 0;
for (const f of roots.flatMap(walk)) {
  if (!/\.(jpe?g|png)$/i.test(f) || /\/og\//.test(f)) continue;
  const orig = readFileSync(f); if (orig.length < min) continue;
  const isPng = /png$/i.test(f);
  const tries = isPng
    ? [() => sharp(orig).png({ palette: true, quality: 92, effort: 10, compressionLevel: 9, dither: 0.5 }).toBuffer(), () => sharp(orig).png({ compressionLevel: 9, effort: 10 }).toBuffer()]
    : [() => sharp(orig).rotate().jpeg({ quality: 78, mozjpeg: true, progressive: true, chromaSubsampling: "4:2:0" }).toBuffer(), () => sharp(orig).rotate().jpeg({ quality: 84, mozjpeg: true, progressive: true }).toBuffer()];
  let best = null;
  for (const t of tries) {
    const buf = await t();
    if (buf.length > orig.length * 0.9) continue;
    const p = await psnr(orig, buf);
    if (p >= 38) { best = { buf, p }; break; }
  }
  if (!best) continue;
  kept++; before += orig.length; after += best.buf.length;
  console.log((write ? "write " : "would write ") + relative(process.cwd(), f), Math.round(orig.length / 1024) + "KB ->", Math.round(best.buf.length / 1024) + "KB", "psnr", best.p.toFixed(1));
  if (write) {
    const b = join(backup, relative(process.cwd(), f)); mkdirSync(dirname(b), { recursive: true }); copyFileSync(f, b);
    writeFileSync(f, best.buf);
  }
}
console.log(`${kept} files, ${(before / 1048576).toFixed(2)}MB -> ${(after / 1048576).toFixed(2)}MB`, write ? "" : "(dry run, pass --write)");

// Photo crops for panel thumbnails. All source photos in public/assets are 1024 x 688.
// crop(src, cx, cy, zoom, boxAspect): cx, cy are the focus point as 0..1 of the photo; zoom 1 = photo width equals box width
// (use 1.6 or more for tight crops); boxAspect = box width / box height. Returns an inline style string (no padlocks, no icons).
const IW = 1024, IH = 688;
export function crop(src: string, cx: number, cy: number, zoom = 2.2, boxAspect = 1): string {
  const zx = zoom;                         // image width / box width
  const zy = (zoom * IH) / IW * boxAspect;  // image height / box height
  const px = zx === 1 ? 50 : ((0.5 - cx * zx) / (1 - zx)) * 100;
  const py = zy === 1 ? 50 : ((0.5 - cy * zy) / (1 - zy)) * 100;
  const c = (n: number) => Math.max(0, Math.min(100, n)).toFixed(1);
  return `background-image:url(${src});background-size:${(zx * 100).toFixed(0)}% auto;background-position:${c(px)}% ${c(py)}%`;
}
/** Named crops of existing photos. Add more here, never invent images. */
export const THUMBS = {
  shirt: crop("/assets/d2c/range.jpg", 0.45, 0.27, 2.4),
  serum: crop("/assets/d2c/range.jpg", 0.66, 0.6, 2.6),
  jar: crop("/assets/d2c/range.jpg", 0.44, 0.72, 2.6),
  candle: crop("/assets/d2c/range.jpg", 0.82, 0.68, 2.6),
  bar: crop("/assets/d2c/range.jpg", 0.17, 0.4, 2.6),
  unbox: crop("/assets/d2c/unboxing.jpg", 0.42, 0.38, 2.0),
  pack: crop("/assets/d2c/packing.jpg", 0.4, 0.5, 1.8),
  phoneAd: crop("/assets/meta/creative.jpg", 0.14, 0.45, 2.2),
} as const;

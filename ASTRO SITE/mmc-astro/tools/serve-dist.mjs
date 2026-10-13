// Static server that mimics the live Apache host after public/.htaccess: gzip + brotli for text types,
// Cache-Control / Expires per path, ETag, HTTP/1.1 keep-alive, directory index, trailing-slash redirect.
// Usage: node tools/serve-dist.mjs <distDir> [port=4399] [--no-compress]
import http from "node:http";
import { readFileSync, statSync, existsSync } from "node:fs";
import { join, extname, resolve, normalize } from "node:path";
import zlib from "node:zlib";
import { createHash } from "node:crypto";

const args = process.argv.slice(2).filter((a) => !a.startsWith("--"));
const root = resolve(args[0] || "dist");
const port = Number(args[1] || 4399);
const compress = !process.argv.includes("--no-compress");
const TYPES = {
  ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "application/javascript; charset=utf-8",
  ".mjs": "application/javascript; charset=utf-8", ".json": "application/json", ".xml": "text/xml", ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".webp": "image/webp", ".avif": "image/avif",
  ".gif": "image/gif", ".ico": "image/x-icon", ".woff2": "font/woff2", ".woff": "font/woff", ".ttf": "font/ttf", ".mp4": "video/mp4", ".webm": "video/webm",
  ".jsx": "application/javascript; charset=utf-8", ".pdf": "application/pdf",
};
const COMPRESSIBLE = /^(text\/|application\/(javascript|json)|image\/svg)/;
const cache = new Map(); // path -> { body, gz, br, etag, mtime }

function load(file) {
  const st = statSync(file);
  const hit = cache.get(file);
  if (hit && hit.mtime === st.mtimeMs) return hit;
  const body = readFileSync(file);
  const type = TYPES[extname(file).toLowerCase()] || "application/octet-stream";
  const e = { body, type, mtime: st.mtimeMs, etag: '"' + createHash("md5").update(body).digest("hex").slice(0, 16) + '"' };
  if (compress && COMPRESSIBLE.test(type) && body.length > 256) {
    e.gz = zlib.gzipSync(body, { level: 6 });
    e.br = zlib.brotliCompressSync(body, { params: { [zlib.constants.BROTLI_PARAM_QUALITY]: 5 } });
  }
  cache.set(file, e);
  return e;
}

function cacheHeaders(path, type) {
  if (type.startsWith("text/html")) return { "Cache-Control": "no-cache" };
  if (path.startsWith("/_astro/")) return { "Cache-Control": "public, max-age=31536000, immutable" };
  if (/\.(woff2|woff|ttf)$/.test(path)) return { "Cache-Control": "public, max-age=31536000, immutable" };
  if (path.startsWith("/assets/")) return { "Cache-Control": "public, max-age=2592000" };
  if (/^(image\/(jpeg|png|webp|avif|svg)|text\/css|application\/javascript)/.test(type)) return { "Cache-Control": "public, max-age=" + (type.startsWith("image") ? 2592000 : 604800) };
  return {};
}

http.createServer((req, res) => {
  let path = decodeURIComponent(new URL(req.url, "http://x").pathname);
  let file = join(root, normalize(path));
  if (!file.startsWith(root)) { res.writeHead(403); return res.end(); }
  if (existsSync(file) && statSync(file).isDirectory()) {
    if (!path.endsWith("/")) { res.writeHead(301, { Location: path + "/" }); return res.end(); }
    file = join(file, "index.html");
  }
  if (!existsSync(file)) { res.writeHead(404, { "Content-Type": "text/plain" }); return res.end("Not found"); }
  const e = load(file);
  const h = { "Content-Type": e.type, ETag: e.etag, Vary: "Accept-Encoding", Connection: "keep-alive", "Keep-Alive": "timeout=15, max=1000", ...cacheHeaders(path, e.type) };
  if (req.headers["if-none-match"] === e.etag) { res.writeHead(304, h); return res.end(); }
  const ae = String(req.headers["accept-encoding"] || "");
  let body = e.body;
  if (e.br && /\bbr\b/.test(ae)) { body = e.br; h["Content-Encoding"] = "br"; }
  else if (e.gz && /\bgzip\b/.test(ae)) { body = e.gz; h["Content-Encoding"] = "gzip"; }
  h["Content-Length"] = body.length;
  res.writeHead(200, h);
  res.end(req.method === "HEAD" ? undefined : body);
}).listen(port, "127.0.0.1", () => console.log(`serving ${root} on http://127.0.0.1:${port}/ (compress=${compress})`));

// Old site links (foo.html, "Our Work.html") to the new clean URLs. Applied to every data string and HTML fragment.
import routes from "../data/routes.json";
const map = routes as Record<string, string>;

/** "lead-generation.html#faq" -> "/services/lead-generation/#faq". Anything that is not a known page is returned unchanged. */
export function href(u: string): string {
  if (!u || /^(https?:|mailto:|tel:|#|\/)/.test(u)) return u;
  const m = u.match(/^([^#?]+)([#?].*)?$/);
  if (!m) return u;
  const page = decodeURIComponent(m[1]);
  return map[page] ? map[page] + (m[2] || "") : u;
}

/** Rewrites href="..." inside an HTML string (FAQ answers, article paragraphs). */
export function fixHtml(s: string): string {
  return (s || "").replace(/href="([^"]+)"/g, (_, u) => `href="${href(u)}"`);
}

/** Walks any data structure and rewrites the link fields and inline HTML in place. */
export function fixDeep<T>(v: T): T {
  if (typeof v === "string") return fixHtml(v) as unknown as T;
  if (Array.isArray(v)) return v.map(fixDeep) as unknown as T;
  if (v && typeof v === "object") {
    const o: Record<string, unknown> = {};
    for (const [k, x] of Object.entries(v as Record<string, unknown>)) o[k] = k === "href" && typeof x === "string" ? href(x) : fixDeep(x);
    return o as T;
  }
  return v;
}

// Head props for the utility pages (about, work, careers, tools, ...): title, description, OG and JSON-LD come from
// the original HTML heads (extracted to src/data/meta/<key>.json); JSON-LD URLs are rewritten to the clean routes.
import { rewriteJsonld } from "./hub";
import { fixDeep } from "./links";

const all = import.meta.glob("../data/meta/*.json", { eager: true, import: "default" }) as Record<string, any>;

export function metaHead(key: string, path: string) {
  const h = all[`../data/meta/${key}.json`];
  if (!h) throw new Error("no meta for " + key);
  return {
    title: h.title as string,
    description: h.description as string,
    ogTitle: h.ogTitle as string | undefined,
    ogDescription: h.ogDescription as string | undefined,
    ogAlt: h.ogAlt as string | undefined,
    noindex: /noindex/.test(h.robots || ""),
    path,
    jsonld: fixDeep(rewriteJsonld(h.jsonld)) as unknown[],
  };
}

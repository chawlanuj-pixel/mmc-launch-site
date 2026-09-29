// Head props for the five hand-built pages: title, description, OG and JSON-LD come from the original HTML heads
// (extracted to src/data/pages/heads.json); JSON-LD URLs are rewritten to the clean routes.
import heads from "../data/pages/heads.json";
import { rewriteJsonld } from "./hub";
import { fixDeep } from "./links";

export type PageKey = "home" | "services" | "pm" | "d2c" | "audit";

export function pageHead(key: PageKey, path: string) {
  const h = (heads as Record<string, any>)[key];
  return {
    title: h.title as string,
    description: h.description as string,
    ogTitle: h.ogTitle as string | undefined,
    ogDescription: h.ogDescription as string | undefined,
    ogAlt: h.ogAlt as string | undefined,
    path,
    jsonld: fixDeep(rewriteJsonld(h.jsonld)) as unknown[],
  };
}

// Display names for service and industry pages. They come from the menu, so a page is called the same thing
// in the nav, on its own H1/eyebrow, on hub cards and in "See ..." links.
import { menuLinks } from "../components/shell/menu-data";
import routes from "../data/routes.json";

const r = routes as Record<string, string>;
const NAMES: Record<string, string> = {};
const walk = (items: any[] | undefined) => (items || []).forEach((i: any) => {
  const url = i.url as string | undefined;
  if (url && r[url]) NAMES[r[url]] = i.name || i.label;
  walk(i.inner); walk(i.sub);
});
walk(menuLinks as any);

/** Name of a page from its route ("/services/seo/") or its old file name ("seo.html#x"). */
export function pageName(u: string): string | undefined {
  const key = (u || "").split("#")[0];
  const path = r[key] || key;
  return NAMES[path];
}
/** "See SEO", "See Meta Ads". Falls back to the given label when the target is not a menu page. */
export function seeLink(u: string, fallback = ""): string {
  const n = pageName(u);
  return n ? `See ${n}` : fallback;
}

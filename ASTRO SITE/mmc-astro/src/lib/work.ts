// The proof layer's one data model. Everything about a brand (display name, label, service tags,
// whether a case-study page exists) is read from src/data/work-clients.json and case-studies.json
// here, and nowhere else. Pages and components must not retype a name or a tag array.
import book from "../data/work-clients.json";
import caseBook from "../data/case-studies.json";

export interface Group { key: string; label: string }
export interface Service { key: string; label: string; short: string }
export interface Brand {
  id: string; name: string; group: string; label: string;
  services: string[]; workArt: boolean; hasCase: boolean; href: string | null;
}
export interface Metric { label: string; value: string; basis: string }
export interface Quote { quote: string; name: string; role?: string }
export interface CaseStudy extends Brand {
  image: string; ratio: string; scope: string; shows: string[];
  timeframe: string | null; basis: string | null; whatWeDid: string | null;
  metrics: Metric[]; team: { name: string; role: string }[]; testimonial: Quote | null;
}

/** The four labels, in filter order. The ONE classification vocabulary. */
export const GROUPS: Group[] = (book as any).groups;
export const GROUP_LABEL: Record<string, string> = Object.fromEntries(GROUPS.map((g) => [g.key, g.label]));
export const groupOrder = (key: string) => GROUPS.findIndex((g) => g.key === key);

/** Service taxonomy, keyed to the menu names, in the one display order. */
export const SERVICES: Service[] = (book as any).services;
const SVC = new Map(SERVICES.map((s) => [s.key, s]));

const caseIds = new Set(((caseBook as any).items as any[]).map((c) => c.id));
/** True only when /work/<id>/ is a real page. Use it before rendering any "See the work" link. */
export const hasCase = (id: string) => caseIds.has(id);

function mk(c: any): Brand {
  const has = hasCase(c.id);
  return {
    id: c.id, name: c.name, group: c.group, label: GROUP_LABEL[c.group],
    services: [...(c.services || [])].sort((a: string, b: string) => SERVICES.findIndex((s) => s.key === a) - SERVICES.findIndex((s) => s.key === b)),
    workArt: !!c.workArt, hasCase: has, href: has ? `/work/${c.id}/` : null,
  };
}

export const BRANDS: Brand[] = ((book as any).clients as any[]).map(mk);
const BY_ID = new Map(BRANDS.map((b) => [b.id, b]));
export const brand = (id: string): Brand | undefined => BY_ID.get(id);
export const brandName = (id: string) => BY_ID.get(id)?.name ?? id;

/** Service tags for a brand, in fixed order. `short` only where space demands. */
export function tagsFor(id: string, short = false): string[] {
  const b = BY_ID.get(id);
  if (!b) return [];
  return b.services.map((k) => (short ? SVC.get(k)?.short : SVC.get(k)?.label)).filter(Boolean) as string[];
}

/** Home curation: ids only. Name, label and tags come from the brand record. */
export const HOME = (book as any).home as { rail: string[]; tiles: string[] };
export const railBrands = () => HOME.rail.map((id) => BY_ID.get(id)!).filter(Boolean);
export const tileBrands = () => HOME.tiles.map((id) => BY_ID.get(id)!).filter(Boolean);

/** Case studies in filter order (D2C, B2B, Education, Other consumer), stable inside a group. */
export const CASES: CaseStudy[] = ((caseBook as any).items as any[])
  .map((it, i) => ({ it, i, b: BY_ID.get(it.id)! }))
  .sort((a, b) => groupOrder(a.b.group) - groupOrder(b.b.group) || a.i - b.i)
  .map(({ it, b }) => ({
    ...b,
    image: it.image, ratio: it.ratio || "3 / 2",
    scope: String(it.scope).replace(/\{name\}/g, b.name),
    shows: it.shows,
    timeframe: it.timeframe ?? null, basis: it.basis ?? null, whatWeDid: it.whatWeDid ?? null,
    metrics: it.metrics || [], team: it.team || [], testimonial: it.testimonial ?? null,
  }));
export const caseById = (id: string) => CASES.find((c) => c.id === id);

/** "A, B and C" */
export function joinList(xs: string[]): string {
  const l = xs.map((x) => (/^Amazon/.test(x) ? x : x.charAt(0).toLowerCase() + x.slice(1)));
  if (l.length <= 1) return l.join("");
  return l.slice(0, -1).join(", ") + " and " + l[l.length - 1];
}

/** The short "What we did" note, built only from the service tags on record. No invented detail. */
export function whatWeDid(c: CaseStudy): string {
  if (c.whatWeDid) return c.whatWeDid;
  const t = tagsFor(c.id);
  if (!t.length) return "";
  return `For ${c.name} we worked on ${joinList(t)}.`;
}

/** Three "More work" picks: same label first, then the other labels in filter order starting after this one. */
export function moreWork(id: string, n = 3): CaseStudy[] {
  const me = caseById(id)!;
  const g = groupOrder(me.group);
  const rank = (c: CaseStudy) => (c.group === me.group ? -1 : (groupOrder(c.group) - g + GROUPS.length) % GROUPS.length);
  return CASES.filter((c) => c.id !== id)
    .map((c, i) => ({ c, i }))
    .sort((a, b) => rank(a.c) - rank(b.c) || a.i - b.i)
    .slice(0, n)
    .map((x) => x.c);
}

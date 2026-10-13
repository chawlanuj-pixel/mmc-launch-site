// Data and helpers for the redesigned case-study template (src/components/case2). A case study uses it when
// src/data/case2/<id>.json exists; otherwise /work/[slug] renders the earlier template.
// Text lives in the JSON; image sizes and backdrop colours come from tools/make-case-crops.mjs (src/data/case2/_crops.json).
// Nothing here invents a metric, a quote, a timeframe or a name: those slots read case-studies.json and stay empty until it holds real data.
import { CASES, tagsFor, joinList, type CaseStudy } from "./work";
import { servicePageFor, industryPageFor } from "./links-map";
import crops from "../data/case2/_crops.json";

const mods = import.meta.glob("../data/case2/*.json", { eager: true, import: "default" }) as Record<string, any>;
export const CASE2: Record<string, any> = {};
for (const [k, v] of Object.entries(mods)) { const id = k.split("/").pop()!.replace(/\.json$/, ""); if (!id.startsWith("_")) CASE2[id] = v; }
export const case2For = (id: string) => CASE2[id] as any | undefined;

export interface Img { src: string; w: number; h: number; bg: string; alt: string; name: string }
const sub = (s: string, c: CaseStudy) => String(s).replace(/\{name\}/g, c.name);
export function cropOf(c: CaseStudy, d: any, name: string): Img {
  const m = (crops as any)[c.id]?.[name];
  if (!m) throw new Error(`case2: no crop "${name}" for ${c.id}. Run node tools/make-case-crops.mjs`);
  return { src: `/assets/case2/${c.id}/${name}.jpg`, w: m.w, h: m.h, bg: m.bg, alt: sub(d.alts?.[name] ?? `{name} artwork`, c), name };
}
/** The text of a data field with the brand name filled in. */
export const t = (s: string, c: CaseStudy) => sub(s, c);

/** Hero crop, used as the thumbnail in pagers and More work. */
export const thumbOf = (c: CaseStudy) => { const d = CASE2[c.id]; return d ? cropOf(c, d, "hero") : null; };

/** Previous and next case study in the filter order, wrapping round. Only brands that use the new template. */
export function pager(id: string) {
  const list = CASES.filter((x) => CASE2[x.id]);
  const i = list.findIndex((x) => x.id === id);
  return { prev: list[(i - 1 + list.length) % list.length], next: list[(i + 1) % list.length] };
}

/** The four plain deliverable facts. Reads the data only. */
export function services(c: CaseStudy) {
  const tags = tagsFor(c.id);
  return c.services.map((k, i) => ({ key: k, label: tags[i], href: servicePageFor(k, c.group) })).filter((x) => x.label);
}

const listOf = (xs: string[]) => (xs.length <= 1 ? xs.join("") : xs.slice(0, -1).join(", ") + " and " + xs[xs.length - 1]);
/** Answer-first FAQ, built only from facts on record (scope, shows, service tags, label). */
export function faqFor(c: CaseStudy, d: any) {
  const sv = services(c);
  const ind = industryPageFor(c.group);
  const lc = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);
  return [
    { q: `What did MMC build for ${c.name}?`, a: `${c.scope} The artwork on this page shows ${listOf(c.shows)}.` },
    { q: `Which MMC services were used for ${c.name}?`, a: `For ${c.name} we worked on ${joinList(sv.map((s) => s.label))}.`, links: sv.filter((s) => s.href).map((s) => ({ label: s.label, href: s.href! })) },
    { q: `What kind of brand is ${c.name}?`, a: `${sub(d.about, c)} It sits in our ${c.label} work${ind ? `, which is covered under ${ind.label}` : ""}.`, links: ind ? [{ label: ind.label, href: ind.href }] : [] },
    { q: `How do I start a similar project?`, a: `Book a strategy call from this page. On the call a senior strategist reads your brand against what a ${c.group === "edu" ? "enrolment" : c.group === "b2b" ? "lead" : "sale"} is worth to you, and we agree where to begin. The audit page explains the next step.`, links: [{ label: "How the audit works", href: "/audit/" }] },
  ];
}
export { CASES };

// Builds the hubs2 audience model from the classic hub JSON (src/data/hubs/<path>.json: copy, FAQ, CTA, which stay the
// SEO source of truth) plus the hubs2 layer (src/data/hubs2/<path>.json: images, journey links, work ids, sectors).
import { closingFor } from "../../lib/prefooter";

export interface AudienceModel {
  source: string;
  jsonld: any[];
  hero: { eyebrow: string; h1: [string, string, string, string]; sub: string; img: string; alt: string; pos?: string; cap?: { label: string; note: string }; route: string[]; next?: { label: string; href: string } };
  lede: { lead: string; hl?: string; img: string; alt: string; pos?: string; points?: { title: string; text: string }[] };
  journey: { eyebrow: string; h2a: string; h2b: string; lede?: string; stages: any[]; reads?: { title: string; note?: string; cards: { n: string; d: string }[] } };
  calcs?: { slugs: string[]; h2a: string; h2b: string; lede?: string; eyebrow?: string; guide?: { label: string; href: string } };
  loop?: any;
  work: { ids: string[]; h2a: string; h2b: string; lede?: string };
  sectors: { eyebrow: string; h2a: string; h2b: string; lede?: string; groups: any[] };
  faq: { title: [string, string?]; items: { q: string; a: string }[] };
  cta: { h2a: string; h2b: string; lede: string; eyebrow?: string; secondary?: any };
}

const h1Of = (h: any): [string, string, string, string] =>
  Array.isArray(h) && Array.isArray(h[1]) ? [h[0], h[1][0] || "", h[1][1] || "", h[1][2] || ""] : [String(h), "", "", ""];

/** Classic hub (fixDeep'd) + hubs2 layer -> audience model. */
export function audienceFromHub(H: any, X: any, jsonld: any[]): AudienceModel {
  const C = closingFor(H.key, H.cta);
  const stages = (H.stages || []).map((s: any, k: number) => ({ ...s, ...(X.journey.stages?.[k] || {}) }));
  return {
    source: H.key,
    jsonld,
    hero: { eyebrow: String(H.eyebrow || "").replace(/^●\s*/, ""), h1: h1Of(H.h1), sub: H.sub, ...X.hero },
    lede: { lead: H.answer.lead, hl: H.answer.hl, points: H.answer.points, ...X.lede },
    journey: {
      eyebrow: X.journey.eyebrow || H.leaks?.eyebrow, h2a: X.journey.h2a, h2b: X.journey.h2b, lede: H.leaks?.lede, stages,
      reads: H.numbers ? { title: H.numbers.h2a + " " + H.numbers.h2b, note: H.numbers.note, cards: H.numbers.cards } : undefined,
    },
    loop: X.loop ? { ...H.loop, img: X.loopImg || H.loop.img } : undefined,
    work: X.work,
    sectors: X.sectors,
    faq: { title: H.faqTitle, items: H.faq },
    cta: { h2a: C.h2a, h2b: C.h2b, lede: C.lede, eyebrow: C.eyebrow, secondary: C.secondary },
  };
}

// Which brands the brand tiles would show for a given set of options. Shared by BrandTiles (to render)
// and the hub template (to decide whether the hero's "See the work" link may point at #proof).
import { CLIENTS } from "./hub";
import { BRANDS } from "./work";

export interface ProofOpts { codes?: string[]; ids?: string[]; types?: string[]; mix?: boolean; max?: number }

// `types` keeps its old meaning: "D2C" = D2C label, "B2B" = B2B label, "B2C" = Education and Other consumer.
const legacyType = (g: string) => (g === "d2c" ? "D2C" : g === "b2b" ? "B2B" : "B2C");

export function proofRows({ codes = [], ids, types, mix = false, max = 6 }: ProofOpts) {
  let rows = BRANDS.map((c) => ({ id: c.id, type: legacyType(c.group), services: c.services })).filter((c) => c.id && CLIENTS[c.id]);
  if (ids) rows = ids.map((i) => rows.find((r) => r.id === i)).filter(Boolean) as typeof rows;
  else {
    rows = rows.filter((r) => r.services.some((s) => codes.includes(s)));
    if (types) rows = rows.filter((r) => types.includes(r.type));
    if (mix) { const d = rows.filter((r) => r.type === "D2C"), o = rows.filter((r) => r.type !== "D2C"); rows = []; for (let i = 0; i < Math.max(d.length, o.length); i++) { if (o[i]) rows.push(o[i]); if (d[i]) rows.push(d[i]); } }
  }
  return rows.slice(0, max);
}

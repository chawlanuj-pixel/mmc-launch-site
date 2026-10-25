// One place that reads roles.json. Careers listing, role pages and (via the helpers below) the menu all use it,
// so counts, titles and chips cannot drift. Do not hand-type a role fact anywhere else.
import data from "../data/roles.json";

export type Role = (typeof data.roles)[number];
export const roles: Role[] = data.roles;
export const hiringProcess = data.hiringProcess;

export interface Step { h?: string; d: string; img?: string }

/** Steps for /careers/ or for the role pages, from the variant that place is pointed at in roles.json. */
export function stepsFor(place: "careersPage" | "rolePages"): Step[] {
  const key = place === "careersPage" ? hiringProcess.careersPageUses : hiringProcess.rolePagesUse;
  return (hiringProcess.variants as Record<string, { steps: Step[] }>)[key].steps;
}
export function processFaq(): string {
  const v = (hiringProcess.variants as Record<string, { faq?: string; steps: Step[] }>)[hiringProcess.careersPageUses];
  return v.faq || v.steps.map((s) => s.d).join(" ");
}

/** Count, e.g. "6 open roles". Never says "senior": the roles are not all senior. */
export const roleCount = roles.length;
export const roleCountLabel = `${roles.length} open roles`;

/** The facts shown as chips, in one fixed order. The mode chip is dropped when the location already says it. */
export const MODE: Record<string, string> = { ONSITE: "Onsite", HYBRID: "Hybrid", REMOTE: "Remote" };
export function chips(r: Role): string[] {
  const out = [r.location];
  const mode = MODE[r.workMode];
  if (mode && !r.location.toLowerCase().includes(mode.toLowerCase())) out.push(mode);
  out.push(r.type, r.band);
  if (r.salary) out.push(r.salary);
  return out;
}

/** Menu rows grouped by discipline, for the nav owner: roles.map(menuRow). Name uses the same location text as the listing. */
export const menuRow = (r: Role) => ({ name: `${r.title} · ${r.location}`, url: `/careers/${r.slug}/` });

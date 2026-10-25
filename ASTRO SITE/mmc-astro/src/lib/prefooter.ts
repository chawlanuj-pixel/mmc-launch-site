// Props for the canonical PreFooterCta, per page. Page-specific headlines come from each page's own data
// (hub JSON `cta`); this file only holds the overrides, the secondary links and the eyebrow exceptions.
// All labels come from site.ts. Lede rule: "On a call, with a senior strategist. We ..." (140 characters at most).
import { SECONDARY } from "./site";

export interface Closing {
  h2a?: string; h2b?: string; lede?: string; eyebrow?: string;
  secondary?: { label: string; href?: string; brief?: boolean } | null;
}

const AUDIT = { label: SECONDARY.audit, href: "/audit/" };
const NUMBERS = { label: SECONDARY.numbers, href: "/tools/" };

/** Default lede when a page has none: answers "what do the first 30 days look like, and who works on the account?" */
export const DEFAULT_LEDE = "On a call, with a senior strategist. We show what your first 30 days would look like and who works on your account.";

/** Hub / guide pages by their data key. Anything not listed uses its JSON `cta` and the audit link. */
const BY_KEY: Record<string, Closing> = {
  guides: { h2a: "Take the guides", h2b: "to your own numbers.", lede: "On a call, with a senior strategist. We apply the method to your cost sheet and your ad accounts.", secondary: NUMBERS },
  resources: { h2a: "Bring your numbers.", h2b: "We will read them with you.", lede: "On a call, with a senior strategist. We read your cost sheet and ad accounts together and show where to start.", secondary: NUMBERS },
  guidecm: { lede: "On a call, with a senior strategist. Bring your cost sheet and we read your ROAS against it.", secondary: NUMBERS },
  guideattr: { secondary: NUMBERS },
  guidecreative: { secondary: NUMBERS },
  industries: { lede: "On a call, with a senior strategist. We say honestly whether we are a fit and who would work on your account." },
};

export function closingFor(key: string, cta: { h2a: string; h2b: string; lede: string }): Required<Pick<Closing, "h2a" | "h2b" | "lede">> & Closing {
  const o = BY_KEY[key] || {};
  return { eyebrow: "Ready when you are", secondary: AUDIT, ...cta, ...o } as any;
}

/** Tool pages and the glossary: eyebrow "Next step", a headline that connects to the tool, nothing unsourced. */
export const TOOL_CLOSINGS: Record<string, Closing & { h2a: string; h2b: string; lede: string }> = {
  "breakeven-roas": { h2a: "Know your break-even ROAS.", h2b: "Then build to beat it.", lede: "On a call, with a senior strategist. We check your break-even against your live accounts and plan the first 30 days." },
  "cac-runway": { h2a: "Plan the burn", h2b: "before you spend.", lede: "On a call, with a senior strategist. We test your runway against real CAC and show what the first 30 days would look like." },
  "funnel-roas": { h2a: "You have found the leak.", h2b: "Now fix it.", lede: "On a call, with a senior strategist. We trace the leak through your funnel and agree what to change first." },
  "growth-trajectory": { h2a: "Test the trajectory", h2b: "against your real numbers.", lede: "On a call, with a senior strategist. We check the run rate and its assumptions, then plan what the next 30 days should test." },
  "ltv-cac": { h2a: "Raise what each customer", h2b: "is worth to you.", lede: "On a call, with a senior strategist. We read your repeat-purchase data and show what to change in the first 30 days." },
  "unit-economics": { h2a: "Fix the order economics", h2b: "before you scale.", lede: "On a call, with a senior strategist. We rebuild your unit economics with you and show where margin is lost." },
  glossary: { h2a: "Still unsure which number", h2b: "is your problem?", lede: "On a call, with a senior strategist. We find the number that matters for your brand and show what to do about it." },
  tools: { h2a: "Run the numbers", h2b: "with us.", lede: "On a call, with a senior strategist. Bring your cost sheet and the question that is stuck. We plan the first 30 days." },
};

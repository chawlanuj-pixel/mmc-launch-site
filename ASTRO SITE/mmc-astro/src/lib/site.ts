// One source of truth for labels, names and facts that used to be hand-typed on every page.
// Rules: one booking label; calculators are "D2C calculators"; no counts of brands, clients or projects; no invented figures.
// Items that still need an owner decision are NOT in here (location, team size, menu stats, response promise).

/** The only booking label. It opens the 30-minute strategy-call booking modal. */
export const BOOK = "Book a strategy call";

/** The approved secondary links. Use one per page. */
export const SECONDARY = {
  audit: "How the audit works",
  brief: "Send a brief",
  work: "See the work",
  moreWork: "See more of our work",
  numbers: "Run the numbers yourself",
  roles: "See open roles",
  apply: "Apply for this role",
} as const;

/** Audience names, always in this order and never D2C-only. */
export const AUDIENCES = ["D2C brands", "B2B companies", "Education brands"] as const;
export const AUDIENCE_LINE = "D2C, B2B and education brands";

/** D2C calculators. Short name is the display name; page title and H1 use the short name plus "calculator". Fixed order. */
export interface Tool { slug: string; short: string; long: string; blurb: string; href: string }
export const TOOLS_LABEL = "D2C calculators";
export const TOOLS: Tool[] = [
  { slug: "unit-economics", short: "Unit economics", long: "Unit economics calculator", blurb: "What one order leaves behind, from CM1 to CM3.", href: "/tools/unit-economics/" },
  { slug: "breakeven-roas", short: "Break-even ROAS", long: "Break-even ROAS calculator", blurb: "The ROAS you need before you start losing money.", href: "/tools/breakeven-roas/" },
  { slug: "ltv-cac", short: "LTV:CAC", long: "LTV:CAC calculator", blurb: "What a customer is worth and how fast you recover it.", href: "/tools/ltv-cac/" },
  { slug: "funnel-roas", short: "Funnel ROAS", long: "Funnel ROAS calculator", blurb: "Which step between an impression and a paid order is leaking.", href: "/tools/funnel-roas/" },
  { slug: "cac-runway", short: "CAC runway", long: "CAC runway calculator", blurb: "How long a new brand burns before it turns.", href: "/tools/cac-runway/" },
  { slug: "growth-trajectory", short: "Growth trajectory", long: "Growth trajectory calculator", blurb: "Where today's run rate actually gets you, month by month.", href: "/tools/growth-trajectory/" },
];
export const toolBySlug = (slug: string) => TOOLS.find((t) => t.slug === slug);

/** Which calculators suit which page type (2 to 4 cards). Pages not listed show none. */
export const TOOLS_FOR: Record<string, string[]> = {
  "performance-marketing": ["breakeven-roas", "funnel-roas", "unit-economics"],
  "meta-ads": ["breakeven-roas", "unit-economics"],
  "google-ads": ["breakeven-roas", "unit-economics"],
  "amazon-ads": ["breakeven-roas", "unit-economics"],
  "quick-commerce": ["breakeven-roas", "unit-economics"],
  "cro": ["funnel-roas", "unit-economics"],
  "lead-generation": ["cac-runway", "ltv-cac"],
  "retention-marketing": ["ltv-cac", "unit-economics"],
  "shopify-development": ["unit-economics", "breakeven-roas"],
  "web-development": ["funnel-roas", "unit-economics"],
  "ui-ux-design": ["funnel-roas"],
  "seo": ["unit-economics", "cac-runway"],
  "social-media": ["breakeven-roas", "unit-economics"],
  "ugc-and-video": ["breakeven-roas", "funnel-roas"],
  "industries-d2c": ["unit-economics", "breakeven-roas", "ltv-cac", "cac-runway"],
  "industries-b2b": ["cac-runway", "ltv-cac"],
  // New hubs. Service pages are looked up by the last path segment, so each has a slug alias beside its key.
  "aiseo": ["unit-economics", "cac-runway"], "ai-seo": ["unit-economics", "cac-runway"],
  "aeo": ["unit-economics", "cac-runway"], "geo": ["unit-economics", "cac-runway"],
  "contentmktg": ["cac-runway", "ltv-cac"], "content-marketing": ["cac-runway", "ltv-cac"],
  "gbp": ["cac-runway", "ltv-cac"], "google-business-profile": ["cac-runway", "ltv-cac"],
  "d2cskin": ["unit-economics", "ltv-cac", "breakeven-roas"],
  "d2cbaby": ["ltv-cac", "unit-economics", "breakeven-roas"],
  "d2cfnb": ["unit-economics", "breakeven-roas", "ltv-cac"],
  "d2cfash": ["breakeven-roas", "funnel-roas", "unit-economics"],
  "b2bmfg": ["cac-runway", "ltv-cac"], "b2bsaas": ["cac-runway", "ltv-cac"],
  // White label and WordPress hubs (path-slug keys; slugs shared with an existing service key reuse that entry).
  "wordpress": ["funnel-roas", "unit-economics"], "website-maintenance": ["funnel-roas", "unit-economics"],
  "white-label": ["unit-economics", "cac-runway"], "ppc": ["breakeven-roas", "unit-economics"], "meta-ads": ["breakeven-roas", "unit-economics"],
  "social-media-management": ["breakeven-roas", "unit-economics"], "email-marketing": ["ltv-cac", "unit-economics"],
  "ecommerce": ["unit-economics", "breakeven-roas"], "creative-and-video": ["breakeven-roas", "funnel-roas"],
  "pricing-models": ["unit-economics", "cac-runway"], "digital-marketing": ["unit-economics", "cac-runway"],
  // WooCommerce and locations hubs (path-slug keys).
  "woocommerce": ["funnel-roas", "unit-economics"], "locations": ["cac-runway", "ltv-cac"],
  "thane": ["cac-runway", "ltv-cac"], "mumbai": ["cac-runway", "ltv-cac"], "indore": ["cac-runway", "ltv-cac"],
};

/** Contact facts that are settled. */
export const PHONE_DISPLAY = "+91 766 630 9102";
export const PHONE_TEL = "+917666309102";
export const WHATSAPP = "https://wa.me/917666309102";
export const TAGLINE = "Design × Marketing × Technology × Content × AI";
export const COMPANY = "Monday Marketing Company";
export const COMPANY_SHORT = "MMC";

/** Authenticity line for client artwork, reused everywhere. */
export const ARTWORK_LINE = "Client-approved artwork presenting the work we built. Illustrative presentation, not a live screenshot and not a result.";

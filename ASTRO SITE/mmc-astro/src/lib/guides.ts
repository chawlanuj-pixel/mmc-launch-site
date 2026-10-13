// THE guide catalogue. One title, one short title and one description per guide, stored once and used by
// /insights/, /guides/, the articles, the homepage insights band and (via `short`) the nav and footer lists.
// Never retype a guide title anywhere else. Read time is computed from the real article text.
export interface GuideMeta {
  slug: string; n: string; tag: string; topic: "margin" | "creative";
  title: string;                     // the one full title: H1-level wording, cards, page <title>
  short: string;                     // the one short title: nav, footer, homepage band, compact lists
  desc: string;                      // the one description, used on every card and as the meta description
  href: string; img: string;
  tool: { label: string; href: string; blurb: string };
  q: string;                         // the reader's question, for the "start here" cards
  stand: string;                     // standfirst under the H1
  after: string;                     // block id after which the inline tool box sits
  tryIt: string;                     // inline tool box line
  next: { h: string; lede: string; label: string; href: string; img: string }; // end-of-article panel
}

export const GUIDES: GuideMeta[] = [
  { slug: "contribution-margin-roas", n: "01", tag: "Margin and measurement", topic: "margin",
    title: "Contribution margin and the ROAS you need to break even",
    short: "Contribution margin and break-even ROAS",
    desc: "What one order leaves behind after product, shipping, fees and returns, and the ROAS a campaign must beat to break even. Includes a calculator for your costs.",
    href: "/guides/contribution-margin-roas/", img: "/assets/guides/cost.jpg",
    tool: { label: "Break-even ROAS calculator", href: "/tools/breakeven-roas/", blurb: "Enter your own costs and get the ROAS your cost sheet demands." }, q: "Is my ROAS actually profitable?",
    stand: "A ROAS can look healthy and still lose money. Here is how to work out what an order really leaves behind, and the ROAS you need to break even.",
    after: "calc", tryIt: "Try it: enter your own costs and see your break-even ROAS.",
    next: { h: "Now run your own costs.", lede: "Enter your order value and costs and get the ROAS your cost sheet demands. Bring the result to a call if you want it read with you.", label: "Open the break-even ROAS calculator", href: "/tools/breakeven-roas/", img: "/assets/res/roas.jpg" } },
  { slug: "attribution-overlap", n: "02", tag: "Margin and measurement", topic: "margin",
    title: "Why ad dashboards report more sales than you made",
    short: "Why ad dashboards over-count sales",
    desc: "Meta, Google and your store each count their own conversions, so the totals never match. Here is why dashboards over-count and how to read results anyway.",
    href: "/guides/attribution-overlap/", img: "/assets/guides/overlap.jpg",
    tool: { label: "Funnel ROAS calculator", href: "/tools/funnel-roas/", blurb: "See which step between an impression and a paid order is leaking." }, q: "Why do Meta, Google and my store disagree?",
    stand: "Add up what Meta, Google and analytics report and you will often get more sales than you made. Here is why, and how to read your results anyway.",
    after: "read", tryIt: "Try it: move the five conversion rates between an impression and a paid order.",
    next: { h: "Check your numbers against your store.", lede: "Start from real orders, then see which step of your funnel loses the most people.", label: "Open the funnel ROAS calculator", href: "/tools/funnel-roas/", img: "/assets/res/funnel.jpg" } },
  { slug: "creative-testing", n: "03", tag: "Creative", topic: "creative",
    title: "How D2C brands test ad creative without guessing",
    short: "How D2C brands test ad creative",
    desc: "A repeatable way to test hooks and angles, read the results against your break-even ROAS and refresh creative before ads tire. Written for D2C brands.",
    href: "/guides/creative-testing/", img: "/assets/guides/cards.jpg",
    tool: { label: "Break-even ROAS calculator", href: "/tools/breakeven-roas/", blurb: "Judge a test by the cost per purchase your break-even ROAS allows." }, q: "How do I find ads that work, not just ads I like?",
    stand: "The ad decides whether the right person stops scrolling. Here is a repeatable way to test hooks and angles, read the results and refresh before ads tire.",
    after: "read", tryIt: "Try it: work out the cost per purchase an ad needs to hit before you call it a winner.",
    next: { h: "Want the tests run for you?", lede: "We plan the tests, make the UGC-style video and static ads, and read the results against your break-even ROAS.", label: "See UGC and video", href: "/services/ugc-and-video/", img: "/assets/ugc/shoot.jpg" } },
];

/** The page <title> for a guide article. */
export const guideTitleTag = (g: GuideMeta) => { const t = `${g.title} | MMC`; return t.length <= 60 ? t : g.title; };
export const guideBySlug = (slug: string) => GUIDES.find((g) => g.slug === slug);

const strip = (s: string) => s.replace(/<[^>]+>/g, " ").replace(/&[a-z]+;/g, " ");

/** Whole-article word count from the block data. */
export function wordCount(blocks: any[]): number {
  const parts: string[] = [];
  for (const b of blocks) {
    parts.push(b.h || "", ...(b.paras || []), ...(b.list || []), b.cap || "");
    (b.steps || []).forEach((s: any) => parts.push(s.t, s.d));
    if (b.table) parts.push(b.table.caption || "", ...b.table.head, ...b.table.rows.flat());
    if (b.callout) parts.push(b.callout.title, b.callout.text);
  }
  return strip(parts.join(" ")).split(/\s+/).filter(Boolean).length;
}
export const readMinutes = (blocks: any[]) => Math.max(1, Math.ceil(wordCount(blocks) / 220));

/** Read time per slug for the index cards. */
export function readTimes(): Record<string, number> {
  const mods = import.meta.glob("../data/guides/*.json", { eager: true, import: "default" }) as Record<string, any>;
  const out: Record<string, number> = {};
  for (const d of Object.values(mods)) out[d.path.replace(/^\/guides\/|\/$/g, "")] = readMinutes(d.hub.article.blocks);
  return out;
}

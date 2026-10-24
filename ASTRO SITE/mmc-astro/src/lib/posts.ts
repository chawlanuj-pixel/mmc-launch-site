// Command Centre articles (Phase 4): typed helpers for the public pages. Loading, validation and the inline-HTML sanitiser live
// in posts-core.mjs (shared with astro.config.mjs and tools/). Contract: command-center/POSTS-CONTRACT.md.
// Repo-managed guides (src/data/guides/*.json, src/lib/guides.ts) are separate and unchanged; CMS guides are listed after them.
import { loadPosts, cleanInline as clean, plainText, niceDate as nice, SITE as SITE_URL } from "./posts-core.mjs";
import { closingFor } from "./prefooter";

export type Section = "guides" | "blog";
export type PostBodyItem = { k: "p" | "quote" | "h3"; x: string } | { k: "ul" | "ol"; items: string[] };
export interface PostBlock {
  id: string; h: string; paras?: string[]; img?: string; cap?: string; alt?: string; list?: string[];
  body?: PostBodyItem[];
  button?: { label: string; href: string; external?: boolean; style: "primary" | "link" | "book" };
  steps?: { t: string; d: string }[];
  table?: { caption: string; head: string[]; rows: string[][] };
  callout?: { title: string; text: string };
}
export interface Post {
  slug: string; section: Section; path: string; url: string; canonical: string;
  title: string; short: string; desc: string; tag: string; tags: string[];
  author: { name: string; role: string } | null;
  publishedAt: string; updatedAt: string; standfirst: string; lead: string;
  points: { title: string; text: string }[];
  hero: { img: string; alt: string };
  blocks: PostBlock[];
  faq: { q: string; a: string }[];
  related: string[];
  cta: { h2a: string; h2b: string; lede: string };
  seo: { title: string; description: string; ogImage: string; noindex: boolean };
  indexable: boolean; words: number; mins: number;
}

export const SITE = SITE_URL as string;
export const cleanInline = clean as (s: string) => string;
export const niceDate = nice as (iso: string) => string;

let cache: Post[] | null = null;
/** Every valid post (including noindex ones, which stay routable). Loaded once per build. */
export function allPosts(): Post[] {
  if (!cache) cache = (loadPosts().posts as Post[]);
  return cache;
}

const newestFirst = (a: Post, b: Post) => (a.publishedAt < b.publishedAt ? 1 : a.publishedAt > b.publishedAt ? -1 : a.updatedAt < b.updatedAt ? 1 : a.updatedAt > b.updatedAt ? -1 : a.slug.localeCompare(b.slug));

/** Published, indexable posts of one section, newest first: what index pages, related cards, sitemap and llms files list. */
export const postsBySection = (section: Section): Post[] => allPosts().filter((p) => p.section === section && p.indexable).sort(newestFirst);
/** Every routable post of one section (noindex included), for getStaticPaths. */
export const routablePosts = (section: Section): Post[] => allPosts().filter((p) => p.section === section);
export const postBySlug = (slug: string): Post | undefined => allPosts().find((p) => p.slug === slug);

export const wordCount = (p: Post) => p.words;
export const readMinutes = (p: Post) => p.mins;

/** Url helpers. */
export const postPath = (p: Pick<Post, "section" | "slug">) => `/${p.section}/${p.slug}/`;
export const postUrl = (p: Pick<Post, "section" | "slug">) => SITE + postPath(p);
export const assetUrl = (rel: string) => SITE + "/assets/" + rel;

/** Display number for a CMS guide: it continues the repo guides' numbering in list order (01 to 04 are the repo guides). */
export function guideNumbers(offset: number): Record<string, string> {
  const out: Record<string, string> = {};
  postsBySection("guides").forEach((p, i) => { out[p.slug] = String(offset + i + 1).padStart(2, "0"); });
  return out;
}

/** <title>: seo.title, else "<title> | MMC" when that fits 60 characters, else the title. */
export const postTitleTag = (p: Post) => p.seo.title || (`${p.title} | MMC`.length <= 60 ? `${p.title} | MMC` : p.title);
export const postDescription = (p: Post) => p.seo.description || p.desc;
export const postOgImage = (p: Post) => "/assets/" + (p.seo.ogImage || p.hero.img);

/** Related cards: the post's own `related` slugs (indexable CMS posts only, unknown ignored). */
export function relatedPosts(p: Post): Post[] {
  const listed = new Set(allPosts().filter((x) => x.indexable).map((x) => x.slug));
  return p.related.filter((s) => listed.has(s)).map((s) => postBySlug(s)!).filter(Boolean);
}

/** Closing band: the section's default from src/lib/prefooter.ts, with the post's own lines when given. */
export function postClosing(p: Post) {
  const base = closingFor(p.section === "guides" ? "guides" : "resources", { h2a: "", h2b: "", lede: "" });
  const own = p.cta.h2a && p.cta.h2b;
  return { ...base, ...(own ? { h2a: p.cta.h2a, h2b: p.cta.h2b } : {}), ...(p.cta.lede ? { lede: p.cta.lede } : {}) };
}

/** /blog/ exists only when at least one blog post is listed (no empty index page). */
export const blogHasIndex = () => postsBySection("blog").length > 0;

/** Breadcrumb trail as [name, path] pairs. */
export function postCrumbs(p: Post): [string, string][] {
  if (p.section === "guides") return [["Home", "/"], ["Resources", "/resources/"], ["Guides", "/guides/"], [p.short, p.path]];
  return blogHasIndex() ? [["Home", "/"], ["Blog", "/blog/"], [p.short, p.path]] : [["Home", "/"], [p.short, p.path]];
}

const breadcrumbLd = (id: string, trail: [string, string][]) => ({
  "@context": "https://schema.org", "@type": "BreadcrumbList", "@id": id + "#breadcrumb",
  itemListElement: trail.map(([name, path], i) => ({ "@type": "ListItem", position: i + 1, name, item: SITE + path })),
});

/** JSON-LD for an article page: BreadcrumbList, WebPage, BlogPosting (blog) or Article (guides), and FAQPage when the FAQ shows. */
export function postJsonld(p: Post): any[] {
  const id = p.url;
  const author = p.author
    ? { "@type": "Person", name: p.author.name, ...(p.author.role ? { jobTitle: p.author.role } : {}) }
    : { "@id": SITE + "/#organization" };
  const out: any[] = [
    breadcrumbLd(id, postCrumbs(p)),
    {
      "@context": "https://schema.org", "@type": "WebPage", "@id": id + "#webpage", url: p.canonical, name: postTitleTag(p), description: postDescription(p),
      isPartOf: { "@id": SITE + "/#website" }, breadcrumb: { "@id": id + "#breadcrumb" }, publisher: { "@id": SITE + "/#organization" },
      inLanguage: "en", mainEntity: { "@id": id + "#article" },
    },
    {
      "@context": "https://schema.org", "@type": p.section === "blog" ? "BlogPosting" : "Article", "@id": id + "#article",
      headline: p.title, description: postDescription(p), image: SITE + postOgImage(p), url: p.canonical,
      datePublished: p.publishedAt, dateModified: p.updatedAt, author, publisher: { "@id": SITE + "/#organization" },
      inLanguage: "en", wordCount: p.words, timeRequired: "PT" + p.mins + "M",
      ...(p.tag ? { articleSection: p.tag } : {}), ...(p.tags.length ? { keywords: p.tags.join(", ") } : {}),
      mainEntityOfPage: { "@id": id + "#webpage" },
      ...(p.section === "guides" || blogHasIndex() ? { isPartOf: { "@id": SITE + (p.section === "blog" ? "/blog/" : "/guides/") + "#webpage" } } : {}),
    },
  ];
  if (p.faq.length) out.push({
    "@context": "https://schema.org", "@type": "FAQPage", "@id": id + "#faq",
    mainEntity: p.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: plainText(f.a) } })),
  });
  return out;
}

/** JSON-LD for /blog/: BreadcrumbList and a CollectionPage listing the posts. */
export function blogIndexJsonld(posts: Post[], title: string, description: string): any[] {
  const id = SITE + "/blog/";
  return [
    breadcrumbLd(id, [["Home", "/"], ["Blog", "/blog/"]]),
    {
      "@context": "https://schema.org", "@type": "CollectionPage", "@id": id + "#webpage", url: id, name: title, description,
      isPartOf: { "@id": SITE + "/#website" }, breadcrumb: { "@id": id + "#breadcrumb" }, publisher: { "@id": SITE + "/#organization" },
      inLanguage: "en", ...(posts[0] ? { dateModified: posts.map((p) => p.updatedAt).sort().pop() } : {}),
      hasPart: posts.map((p) => ({ "@type": "BlogPosting", headline: p.title, description: postDescription(p), url: p.url, datePublished: p.publishedAt })),
    },
  ];
}

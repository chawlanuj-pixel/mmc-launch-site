// Helpers for the shared hub template: JSON-LD URL rewriting, client wordmarks, image sizing.
import routes from "../data/routes.json";
const map = routes as Record<string, string>;
const SITE = "https://www.mondaymarketing.company";

/** Rewrites old https://www.mondaymarketing.company/foo.html(#x) URLs (item, url, @id, breadcrumb) to the clean routes. */
export function rewriteJsonld<T>(blocks: T): T {
  const s = JSON.stringify(blocks).replace(/https:\/\/www\.mondaymarketing\.company\/([^"#\\]+?\.html)(#[^"\\]*)?/g, (all, file, frag) => {
    const key = decodeURIComponent(file);
    const to = map[key];
    if (!to) { console.warn("[hub] jsonld url not in routes:", all); return all; }
    return SITE + to + (frag || "");
  });
  return JSON.parse(s);
}

export const CLIENTS: Record<string, { name: string }> = Object.fromEntries([
  ["bloom", "Bloom Edutours"], ["sprouts", "Sprouts Edu Tours"], ["nmc", "NM Consultings"], ["skyfling", "Skyfling Technologies"],
  ["lepure", "Lepure"], ["giraffe", "The Growing Giraffe"], ["mittiy", "Mittiy Made"], ["awwbaby", "AwwBaby"], ["sprnt", "Sprnt"],
  ["vagakids", "Vaga Kids"], ["mbb", "MyBrownButters"], ["notic", "Notic"], ["oosh", "OOsh"], ["pandacabs", "Panda Cabs"],
  ["mvj", "MVJ College of Engineering"], ["anchor", "Anchor by Panasonic"], ["flomate", "Flomate"], ["greenhermitage", "Green Hermitage"],
  ["housing", "Housing.com"], ["jsw", "JSW"], ["learningmate", "LearningMate"], ["rustomjee", "Rustomjee"], ["saintgobain", "Saint-Gobain"],
  ["gyproc", "Gyproc"], ["clubmahindra", "Club Mahindra"],
].map(([id, name]) => [id, { name }]));

/** Brands that have assets/clients/<id>-work.jpg (from clients-strip.jsx MMC_WORK_ART). */
export const WORK_ART = ["bloom", "sprouts", "nmc", "skyfling", "lepure", "giraffe", "mittiy", "awwbaby", "sprnt", "vagakids", "mbb", "notic", "oosh", "pandacabs", "mvj"];

export function csFit(name: string): number {
  const words = name.split(" ");
  const longest = words.reduce((m, w) => Math.max(m, w.length), 0);
  const half = Math.ceil(name.length / 2);
  const widest = Math.max(longest, words.length > 1 ? half : 0);
  return Math.round(Math.min(1, 10.5 / widest) * 1000) / 1000;
}

export function tilt(key: string): string {
  let h = 0;
  for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) | 0;
  h = Math.abs(h);
  return ((h >> 5) % 2 ? "-" : "") + (5 + (h % 21) / 10).toFixed(1) + "deg";
}

/** "4 / 3" -> [1200, 900] for width/height attributes (CSS aspect-ratio does the real sizing). */
export function dims(ratio: string, w = 1200): [number, number] {
  const [a, b] = ratio.split("/").map((x) => parseFloat(x));
  return [w, Math.round(w / (a / (b || 1)))];
}

// Reads the current static site and writes one JSON per hub page (data + head meta + JSON-LD).
import fs from "node:fs"; import path from "node:path"; import vm from "node:vm";
const SRC = path.resolve("../MMC Site"); const OUT = path.resolve("src/data/hubs");
const routes = JSON.parse(fs.readFileSync("src/data/routes.json", "utf8"));
fs.mkdirSync(OUT, { recursive: true });
const pick = (t, re) => (t.match(re) || [])[1] || "";
const list = [];
for (const f of fs.readdirSync(SRC).filter((x) => x.endsWith(".html"))) {
  const t = fs.readFileSync(path.join(SRC, f), "utf8");
  const m = t.match(/<script src="hub\/(hb-data-[a-z0-9]+)\.js">/);
  if (!m || !routes[f]) continue;
  const win = {}; vm.runInNewContext(fs.readFileSync(path.join(SRC, "hub", m[1] + ".js"), "utf8"), { window: win });
  const ld = [...t.matchAll(/<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/g)].map((x) => JSON.parse(x[1]));
  const page = {
    file: f, path: routes[f], key: win.HUB.key,
    title: pick(t, /<title>([\s\S]*?)<\/title>/), description: pick(t, /<meta name="description" content="([^"]*)"/),
    ogTitle: pick(t, /og:title" content="([^"]*)"/), ogDescription: pick(t, /og:description" content="([^"]*)"/), ogAlt: pick(t, /og:image:alt" content="([^"]*)"/),
    jsonld: ld, hub: win.HUB,
  };
  const slug = routes[f].replace(/^\/|\/$/g, "").replace(/\//g, "__");
  fs.writeFileSync(path.join(OUT, slug + ".json"), JSON.stringify(page, null, 1)); list.push([f, slug]);
}
console.log(list.length, "hub pages"); console.log(list.map((x) => x.join(" -> ")).join("\n"));

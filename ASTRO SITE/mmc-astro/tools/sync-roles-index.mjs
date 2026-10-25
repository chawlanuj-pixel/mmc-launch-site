// Writes data files the admin API needs at runtime (api/_data is blocked from the web by api/.htaccess). Runs before every build.
//  roles.json       slug + title of every role page, so only real role pages can receive applications
//  roles-full.json  full role records, used once by Admin > Jobs > "Import website roles"
//  images.json      every image under public/assets, so the article editor can only pick pictures that exist
//  guides.json      slugs/titles of the repo-managed guides, so a CMS post cannot reuse their addresses
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from "node:fs";
import { join } from "node:path";
const d = JSON.parse(readFileSync("src/data/roles.json", "utf8"));
mkdirSync("public/api/_data", { recursive: true });
writeFileSync("public/api/_data/roles.json", JSON.stringify(d.roles.map((r) => ({ slug: r.slug, title: r.title })), null, 1) + "\n");
writeFileSync("public/api/_data/roles-full.json", JSON.stringify(d.roles) + "\n");

const walk = (dir, base = "") => readdirSync(dir, { withFileTypes: true }).flatMap((e) => e.isDirectory() ? walk(join(dir, e.name), base + e.name + "/") : /\.(jpe?g|png|webp)$/i.test(e.name) && !/^(logo|og)/i.test(e.name) ? [base + e.name] : []);
const imgs = walk("public/assets").filter((p) => p.includes("/")).sort();
writeFileSync("public/api/_data/images.json", JSON.stringify(imgs) + "\n");

const guides = readdirSync("src/data/guides").filter((f) => f.endsWith(".json")).map((f) => { const g = JSON.parse(readFileSync(join("src/data/guides", f), "utf8")); return { slug: String(g.path || "").replace(/^\/guides\/|\/$/g, ""), title: g.title || "" }; });
writeFileSync("public/api/_data/guides.json", JSON.stringify(guides) + "\n");
console.log(`api data: ${d.roles.length} roles, ${imgs.length} images, ${guides.length} guides`);

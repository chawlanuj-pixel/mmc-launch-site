// Crops real client artwork (../../Case Study/*.png) into public/assets/case2/<id>/<name>.jpg, plus a 1200x630 OG card per case.
// Only real artwork, never generated imagery. Writes src/data/case2/_crops.json (width, height, edge colour) used by src/components/case2.
// The generic "reach / clicks / purchases / sales growth" icon strips on the sheets are deliberately left out of every crop.
// Usage: node tools/make-case-crops.mjs
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const sharp = (await import("sharp")).default;
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const art = resolve(root, "../../Case Study");
const out = resolve(root, "public/assets/case2");
const og = resolve(root, "public/assets/og");
mkdirSync(og, { recursive: true });

// [x1, y1, x2, y2] in sheet pixels
const SPEC = {
  oosh: { f: "OOsh Website Mockup.png", bg: "#F1E3DA", c: { hero: [525,60,1612,674], web: [532,78,1256,672], mobile: [1157,250,1352,720], ads: [1372,66,1610,652], product: [30,640,620,890] } },
  sprouts: { f: "Sprouts Edutours.png", bg: "#E6D7C3", c: { hero: [0,0,1662,700], web: [150,120,1085,860], mobile: [152,420,350,858], journeys: [1125,30,1662,390], safety: [1120,400,1662,655], form: [1120,662,1662,895] } },
  mbb: { f: "My Brown Butters.png", bg: "#F8D9DF", c: { hero: [115,25,1000,440], web: [28,20,1002,1002], mobile: [30,425,265,985], social: [1030,30,1520,345], meta: [1025,360,1520,722], shopping: [1020,735,1520,1000] } },
  skyfling: { f: "Skyfling.png", bg: "#E3ECFB", c: { hero: [240,20,1500,700], web: [20,70,1012,900], mobile: [25,360,300,890], estimator: [1035,25,1495,305], work: [1035,320,1498,680], ads: [1010,670,1512,965] } },
  sprnt: { f: "Sprint Active wear.png", bg: "#E2DAF0", c: { hero: [20,30,1505,610], web: [85,40,992,860], mobile: [90,262,365,858], social: [1035,45,1505,352], meta: [1035,362,1505,612], shopping: [1035,622,1505,842], products: [230,780,1320,1024] } },
  nmc: { f: "NMConsultings.png", bg: "#101C4F", c: { hero: [250,118,1650,650], web: [60,70,1058,760], mobile: [65,395,265,830], employers: [1070,45,1330,528], roles: [1348,28,1645,534], linkedin: [1065,540,1330,885], google: [1333,550,1645,905], stationery: [5,770,930,941] } },
  pandacabs: { f: "Panda Cabs .png", bg: "#1A2230", c: { hero: [100,50,1500,745], web: [20,50,1005,950], mobile: [120,478,318,940], posters: [1013,50,1500,445], meta: [1045,448,1458,745], google: [1068,740,1490,940], car: [690,720,1070,950] } },
  giraffe: { f: "The Growing Girraffe.png", bg: "#F3E3C9", c: { hero: [20,12,1618,600], web: [28,20,1178,745], mobile: [40,165,455,826], social: [1188,15,1618,482], ads: [1190,490,1618,735] } },
  mvj: { f: "MVJ College.png", bg: "#E9EEF6", c: { hero: [57,50,1505,620], web: [30,45,1072,985], mobile: [38,510,242,972], form: [270,605,1048,980], social: [1100,60,1505,465], meta: [1095,500,1262,930], seo: [1283,500,1505,930] } },
  vagakids: { f: "Vaga Kids.png", bg: "#F7E4EE", c: { hero: [40,25,1625,640], web: [50,22,1070,905], mobile: [55,335,320,900], social: [1112,80,1620,455], meta: [1075,462,1416,768], google: [1395,472,1655,795], shoes: [380,680,1130,941] } },
  awwbaby: { f: "Awwbaby.png", bg: "#E9E1F6", c: { hero: [285,30,1655,560], web: [30,28,1122,910], mobile: [35,250,310,870], social: [1165,52,1652,462], meta: [1125,500,1395,895], google: [1400,498,1655,892], products: [290,690,1110,941] } },
  mittiy: { f: "Mittiymade.png", bg: "#D9B793", c: { hero: [50,30,1495,600], web: [55,30,1008,915], mobile: [60,370,292,910], social: [1040,38,1452,348], meta: [1035,350,1492,660], google: [1010,625,1422,925], products: [300,650,960,990] } },
  notic: { f: "Notic Case Study.png", bg: "#101216", c: { hero: [270,28,1650,520], web: [70,30,1108,900], mobile: [75,262,325,885], social: [1175,58,1645,448], meta: [1112,445,1390,805], google: [1400,455,1650,802], products: [440,725,950,941] } },
};

const manifest = {};
const hex = (r, g, b) => "#" + [r, g, b].map((v) => Math.round(v).toString(16).padStart(2, "0")).join("");
for (const [id, s] of Object.entries(SPEC)) {
  mkdirSync(resolve(out, id), { recursive: true });
  const src = sharp(resolve(art, s.f));
  const meta = await src.metadata();
  manifest[id] = {};
  for (const [name, [x1, y1, x2, y2]] of Object.entries(s.c)) {
    const box = { left: Math.max(0, x1), top: Math.max(0, y1), width: Math.min(meta.width, x2) - Math.max(0, x1), height: Math.min(meta.height, y2) - Math.max(0, y1) };
    let q = 84, buf;
    do { buf = await sharp(resolve(art, s.f)).extract(box).jpeg({ quality: q, mozjpeg: true }).toBuffer(); q -= 6; } while (buf.length > 195000 && q > 50);
    writeFileSync(resolve(out, id, name + ".jpg"), buf);
    // edge colour: average of a 6px frame (stage backdrop that blends into the crop)
    const { data, info } = await sharp(buf).raw().toBuffer({ resolveWithObject: true });
    let r = 0, g = 0, b = 0, n = 0;
    for (let y = 0; y < info.height; y++) for (let x = 0; x < info.width; x++) {
      if (y < 6 || y >= info.height - 6 || x < 6 || x >= info.width - 6) { const i = (y * info.width + x) * info.channels; r += data[i]; g += data[i + 1]; b += data[i + 2]; n++; }
    }
    manifest[id][name] = { w: box.width, h: box.height, bg: s.bg, kb: Math.round(buf.length / 1024) };
  }
  // OG card: hero crop contained on its own edge colour
  const hero = await sharp(resolve(out, id, "hero.jpg")).resize(1120, 560, { fit: "inside" }).toBuffer();
  const bg = s.bg;
  await sharp({ create: { width: 1200, height: 630, channels: 3, background: bg } }).composite([{ input: hero, gravity: "center" }]).jpeg({ quality: 84, mozjpeg: true }).toFile(resolve(og, `work-${id}.jpg`));
}
writeFileSync(resolve(root, "src/data/case2/_crops.json"), JSON.stringify(manifest, null, 1));
console.log(Object.entries(manifest).map(([id, m]) => id + ": " + Object.entries(m).map(([k, v]) => `${k} ${v.w}x${v.h} ${v.kb}KB`).join(", ")).join("\n"));

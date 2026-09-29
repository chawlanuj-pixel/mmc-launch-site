import React from "react";
import { href } from "../../lib/links";
import { Shot, useCms, pickImg } from "./home-shared.jsx";

const N_FORMATS = [
  { k: "reel",   n: "Reels 9:16",  video: true },
  { k: "feed",   n: "Feed 4:5",    video: true },
  { k: "square", n: "Square 1:1",  video: false },
  { k: "wide",   n: "Wide 16:9",   video: false },
];

/* Brands are the real client book (content/clients.json); the caption is a service MMC genuinely runs for that brand. */
const N_ASSETS = [
  { b: "The Growing Giraffe",   c: "D2C",  f: "square", v: "Quick commerce" },
  { b: "Lepure",                c: "D2C",  f: "reel",   v: "Social media" },
  { b: "Bloom Edutours",        c: "B2B",  f: "feed",   v: "Lead generation" },
  { b: "AwwBaby",               c: "D2C",  f: "square", v: "Performance ads, D2C" },
  { b: "Notic",                 c: "D2C",  f: "reel",   v: "Performance creative" },
  { b: "Mittiy Made",           c: "D2C",  f: "feed",   v: "Performance creative" },
  { b: "Sprnt",                 c: "D2C",  f: "square", v: "Social media" },
  { b: "Vaga Kids",             c: "D2C",  f: "reel",   v: "Performance ads, D2C" },
  { b: "MyBrownButters",        c: "D2C",  f: "square", v: "Performance creative" },
  { b: "Sprouts Edu Tours",     c: "B2B",  f: "reel",   v: "Social media" },
  { b: "Skyfling Technologies", c: "B2B",  f: "wide",   v: "Lead generation" },
  { b: "NM Consultings",        c: "B2B",  f: "feed",   v: "Performance creative" },
  { b: "The Growing Giraffe",   c: "D2C",  f: "wide",   v: "Amazon" },
];
const N_CATS = ["All", "B2B", "D2C"];

/* The creative / UGC section body: two filter rows and the mixed-format grid. */
export default function HomeCreative() {
  const [cat, setCat] = React.useState("All");
  const [fmt, setFmt] = React.useState("All");
  const assets = useCms("Creative", N_ASSETS, (r) => ({
    b: r.brand, c: r.type || r.category || "D2C",
    f: r.format || "reel", v: r.service || r.caption || "", img: pickImg(r.image)
  }));
  const shown = assets.filter((a) => (cat === "All" || a.c === cat) && (fmt === "All" || a.f === fmt));
  const fmtName = (k) => (N_FORMATS.find((f) => f.k === k) || {}).n || k;
  const isVideo = (k) => !!(N_FORMATS.find((f) => f.k === k) || {}).video;

  return (
    <>
      <div className="n-filterset n-rise" suppressHydrationWarning>
        <div className="n-filterrow" role="group" aria-label="Filter creative by client type">
          <b>Client type</b>
          {N_CATS.map((c) => (
            <button type="button" key={c} className={"n-filter" + (cat === c ? " is-on" : "")}
                    aria-pressed={cat === c} onClick={() => setCat(c)}>{c}</button>
          ))}
        </div>
        <div className="n-filterrow" role="group" aria-label="Filter creative by format">
          <b>Format</b>
          <button type="button" className={"n-filter" + (fmt === "All" ? " is-on" : "")}
                  aria-pressed={fmt === "All"} onClick={() => setFmt("All")}>All</button>
          {N_FORMATS.map((f) => (
            <button type="button" key={f.k} className={"n-filter" + (fmt === f.k ? " is-on" : "")}
                    aria-pressed={fmt === f.k} onClick={() => setFmt(f.k)}>{f.n}</button>
          ))}
        </div>
      </div>

      {shown.length === 0 ? (
        <p className="n-lede n-rise">
          Nothing in the library matches that pair of filters yet,{" "}
          <button type="button" className="n-filter" onClick={() => { setCat("All"); setFmt("All"); }}>show everything</button>
        </p>
      ) : (
        <div className="n-mix">
          {shown.map((a) => (
            <div className={"n-asset n-asset--" + a.f} key={a.b + a.f + a.v}>
              <span className="n-asset__fmt">{fmtName(a.f).split(" ")[1] || fmtName(a.f)}</span>
              {isVideo(a.f) && <span className="n-asset__play" aria-hidden="true" />}
              <Shot src={a.img} brand={a.b} tag={a.v} compact />
              <span className="n-asset__meta">
                <span className="n-asset__b">{a.b}</span>
                <span className="n-asset__c">{a.v}</span>
              </span>
            </div>
          ))}
        </div>
      )}

      <div className="n-rise" style={{ marginTop: "clamp(22px,2.6vw,34px)" }}>
        <a className="n-btn n-btn--ink" href={href("Contact.html")}>
          How we build creative<span className="n-btn__arr" aria-hidden="true" />
        </a>
      </div>
    </>
  );
}

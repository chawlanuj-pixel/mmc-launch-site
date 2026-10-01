/* home26/showcase.jsx, creative / UGC portfolio and the websites we've built.

   <Shot> only renders an <img> when it is handed a real src, and falls back to
   a designed brand tile otherwise. That is deliberate: building a conventional
   path for every row fired ~31 404s on every homepage load back when
   assets/work, assets/creative and assets/sites held nothing.

   So a row carries an `img` only when the file genuinely exists. Today that
   means the fifteen brands with case-study artwork at
   assets/clients/<id>-work.jpg, which is the same file the Our Work grid and
   the client wall use, and which is spec'd in assets/clients/README.md. Every
   other row still renders the tile, and a CMS `cover` or `image` field
   overrides either. Add artwork for a brand, then add its `img` here. */

const { useState: sUseState, useEffect: sUseEffect } = React;

/* Content is CMS-driven: when a read-only Airtable token is configured in
   admin/mmc-data.js the rows below are replaced by whatever the base holds, and
   when it is not, these arrays render. The page looks the same either way, so
   Airtable being slow or down never costs a visitor the section. */
function useCms(table, fallback, map) {
  const [rows, setRows] = sUseState(fallback);
  sUseEffect(() => {
    const D = window.MMCData;
    if (!D || !D.content) return;
    let live = true;
    D.content(table, fallback).then((r) => {
      if (!live || !Array.isArray(r) || r === fallback || !r.length) return;
      try {
        const ordered = r.slice().sort((a, b) =>
          (a.order == null ? 1e9 : a.order) - (b.order == null ? 1e9 : b.order));
        const mapped = ordered.map(map).filter((x) => x && x.b);
        if (mapped.length) setRows(mapped);
      } catch (e) { /* malformed row: keep the baked-in copy */ }
    });
    return () => { live = false; };
  }, []);
  return rows;
}

function pickImg(v) {
  if (!v) return "";
  if (Array.isArray(v)) return (v[0] && (v[0].url || v[0].thumbnails &&
    v[0].thumbnails.large && v[0].thumbnails.large.url)) || "";
  return String(v);
}

const splitList = (v) =>
  Array.isArray(v) ? v : String(v || "").split(/\s*[,|]\s*/).filter(Boolean);

function Shot({ src, brand, tag, compact }) {
  // The designed tile is always in the DOM underneath; a real photo fades in
  // over it once it loads. Relying on onError alone fails with loading="lazy",
  // an off-screen image never attempts a fetch, so it never errors either.
  const [loaded, setLoaded] = sUseState(false);
  return (
    <>
      <span className="n-shot" aria-hidden={loaded ? "true" : undefined}>
        <span className="n-shot__b">{brand}</span>
        {!compact && <span className="n-shot__t">{tag}</span>}
      </span>
      {src && (
        <img src={src} alt={brand + ", " + tag} loading="lazy"
             className={"n-shot__img" + (loaded ? " is-on" : "")}
             onLoad={() => setLoaded(true)} onError={() => setLoaded(false)} />
      )}
    </>
  );
}

/* ── Creative & UGC ────────────────────────────────────────────
   Real creative output isn't one shape. Reels are 9:16, feed video and most
   performance statics are 4:5, marketplace and square social are 1:1, and
   banners run wide, so the grid carries all four rather than cropping
   everything into a reel. */

const N_FORMATS = [
  { k: "reel",   n: "Reels 9:16",  video: true },
  { k: "feed",   n: "Feed 4:5",    video: true },
  { k: "square", n: "Square 1:1",  video: false },
  { k: "wide",   n: "Wide 16:9",   video: false },
];

/* Brands are the real client book (content/clients.json). The category is the
   client's business type, because that is a fact MMC holds; the caption is a
   service MMC genuinely runs for that brand. There are no social handles here:
   the client book carries none, and an invented handle on a real company would
   be a fabrication. The format mix is MMC's own output, so it stays. */
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

function NCreative() {
  const [cat, setCat] = sUseState("All");
  const [fmt, setFmt] = sUseState("All");
  const assets = useCms("Creative", N_ASSETS, (r) => ({
    b: r.brand, c: r.type || r.category || "D2C",
    f: r.format || "reel", v: r.service || r.caption || "", img: pickImg(r.image)
  }));
  const shown = assets.filter((a) => (cat === "All" || a.c === cat) && (fmt === "All" || a.f === fmt));
  const fmtName = (k) => (N_FORMATS.find((f) => f.k === k) || {}).n || k;
  const isVideo = (k) => !!(N_FORMATS.find((f) => f.k === k) || {}).video;

  return (
    <section className="n-band n-band--paper" id="creative">
      <div className="n-wrap">
        <div className="n-head n-rise">
          <div className="n-head__l">
            <span className="n-eyebrow">Creative &amp; UGC</span>
            <h2 className="n-h2">The ad is the <span className="n-serif">strategy.</span></h2>
          </div>
          <p className="n-lede">
            240+ assets a month across every placement that matters: reels, feed video, square
            statics and marketplace banners. Shot to feel native, not produced to look like an ad.
          </p>
        </div>

        <div className="n-filterset n-rise">
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
                <Shot src={a.img}
                      brand={a.b} tag={a.v} compact />
                <span className="n-asset__meta">
                  <span className="n-asset__b">{a.b}</span>
                  <span className="n-asset__c">{a.v}</span>
                </span>
              </div>
            ))}
          </div>
        )}

        <div className="n-rise" style={{ marginTop: "clamp(22px,2.6vw,34px)" }}>
          <a className="n-btn n-btn--ink" href="Contact.html">
            How we build creative<span className="n-btn__arr" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ── Client portfolio ────────────────────────────────────────
   The client book verbatim from content/clients.json: the brand, the kind of
   business it is, and the services MMC runs for it. MMC supplied no result for
   any client, so no card carries a figure. The card leads with the name and
   shows the service mix in the slot a metric used to sit in. If real, checkable
   numbers ever arrive for a brand, they belong in clients.json first. */
/* Mirrors content/clients.json, in book order. `img` is present only for the
   brands that actually have a file; see the note at the top of this file. */
const W = (id) => "assets/clients/" + id + "-work.jpg";

const N_FOLIO = [
  { b: "Bloom Edutours",         t: "B2B",   svc: ["Website redesign and development", "Lead generation", "Performance creative", "Social media"], img: W("bloom") },
  { b: "Sprouts Edu Tours",      t: "B2B",   svc: ["Website redesign and development", "Lead generation", "Performance creative", "Social media"], img: W("sprouts") },
  { b: "NM Consultings",         t: "B2B",   svc: ["Website redesign and development", "Lead generation", "Performance creative"], img: W("nmc") },
  { b: "Skyfling Technologies",  t: "B2B",   svc: ["Website redesign and development", "Lead generation", "Performance creative"], img: W("skyfling") },
  { b: "Lepure",                 t: "D2C",   svc: ["Website redesign and development", "Performance ads, D2C", "Performance creative", "Social media"], img: W("lepure") },
  { b: "The Growing Giraffe",    t: "D2C",   svc: ["Conversion rate optimisation", "Performance ads, D2C", "Performance creative", "Amazon", "Quick commerce"], img: W("giraffe") },
  { b: "Mittiy Made",            t: "D2C",   svc: ["Conversion rate optimisation", "Performance ads, D2C", "Performance creative"], img: W("mittiy") },
  { b: "AwwBaby",                t: "D2C",   svc: ["Website redesign and development", "Performance ads, D2C", "Performance creative"], img: W("awwbaby") },
  { b: "Sprnt",                  t: "D2C",   svc: ["Website redesign and development", "Performance ads, D2C", "Performance creative", "Social media"], img: W("sprnt") },
  { b: "Vaga Kids",              t: "D2C",   svc: ["Website redesign and development", "Performance ads, D2C", "Performance creative"], img: W("vagakids") },
  { b: "MyBrownButters",         t: "D2C",   svc: ["Website redesign and development", "Performance ads, D2C", "Performance creative"], img: W("mbb") },
  { b: "Notic",                  t: "D2C",   svc: ["Website redesign and development", "Performance ads, D2C", "Performance creative", "Social media"], img: W("notic") },
  { b: "OOsh",                   t: "D2C",   svc: ["Website redesign and development", "Performance ads, D2C", "Performance creative"], img: W("oosh") },
  { b: "Panda Cabs",             t: "B2C",   svc: ["Website redesign and development", "Lead generation", "Performance creative", "Social media"], img: W("pandacabs") },
  { b: "MVJ College of Engineering", t: "B2C", svc: ["Website redesign and development", "Lead generation", "Performance creative", "Social media"], img: W("mvj") },
  { b: "Anchor by Panasonic",          t: "B2C",   svc: [] },
  { b: "Flomate",                      t: "B2B",   svc: [] },
  { b: "Green Hermitage",              t: "B2C",   svc: [] },
  { b: "Housing.com",                  t: "B2C",   svc: [] },
  { b: "JSW",                          t: "B2B",   svc: [] },
  { b: "LearningMate",                 t: "B2B",   svc: [] },
  { b: "Rustomjee",                    t: "B2C",   svc: [] },
  { b: "Saint-Gobain",                 t: "B2B",   svc: [] },
  { b: "Gyproc",                       t: "B2B",   svc: [] },
  { b: "Club Mahindra",                t: "B2C",   svc: [] },
];

function NBrands() {
  // No metric field is read off the CMS row on purpose: a per-brand number has
  // to come from the client book, not from a stray column in Airtable.
  const folio = useCms("CaseStudies", N_FOLIO, (r) => ({
    b: r.brand, t: r.type || r.category || "",
    svc: splitList(r.services), h: r.url || "", img: pickImg(r.cover)
  }));

  /* Most-opened brand leads, the rest fall in behind it. Ordering runs after
     mount, so the first paint and the pre-rendered markup keep the authored
     order and nothing moves under a pointer mid-hover. */
  const ranked = window.MMCPop ? window.MMCPop.rankAfterMount(folio, (f) => f.b) : folio;

  /* Ten on the homepage; the whole book lives on Our Work, which the button
     below goes to. Brands with case-study artwork are taken first, so the ten
     are ten actual pieces of work rather than a mix of work and placeholder
     tiles. If fewer than ten have artwork the rest fill in behind, in book
     order, so the grid is never short. */
  const HOME_MAX = 10;
  const withArt = ranked.filter((f) => f.img);
  const shown = withArt.concat(ranked.filter((f) => !f.img)).slice(0, HOME_MAX);

  return (
    <section className="n-band n-band--ink" id="work">
      <div className="n-wrap">
        <div className="n-head n-rise">
          <div className="n-head__l">
            <span className="n-eyebrow">Clients</span>
            <h2 className="n-h2">Selected work,<br /><span className="n-serif">and what we run on it.</span></h2>
          </div>
          <p className="n-lede">
            A few of our brands. Each card carries the brand, the kind of business it is in
            and exactly the services we run for it. Nothing else is claimed on their behalf.
          </p>
        </div>

        <div className="n-folio">
          {shown.map((f, i) => (
            <a className={"n-folio__i n-rise d" + Math.min(4, (i % 4) + 1)}
               href={f.h || "Our Work.html"} key={f.b}
               onClick={() => window.MMCPop && window.MMCPop.record(f.b, f.b)}>
              <span className="n-folio__cover">
                <span className="n-folio__tag">{f.t}</span>
                <Shot src={f.img}
                      brand={f.b} tag={f.t} compact />
                {/* The service list used to sit under the card and ran to three
                    rows of pills, which cost more height than the cover itself.
                    It lives on the cover now and is revealed on hover: space
                    the card already reserves, and the list is only interesting
                    once you have chosen a brand. */}
                {f.svc.length > 0 && (
                  <span className="n-folio__reveal">
                    <span className="n-folio__svc">
                      {f.svc.map((x, n) => (
                        <span key={x} style={{ "--n": n }}>{x}</span>
                      ))}
                    </span>
                  </span>
                )}
              </span>
              <span className="n-folio__foot">
                <span className="n-folio__name">
                  {window.MMCLogo
                    ? <window.MMCLogo name={f.b} className="n-folio__logo" />
                    : <b>{f.b}</b>}
                  {/* "0 services" against a real client reads as a claim that
                      MMC does nothing for them. Say nothing instead. */}
                  {f.svc.length > 0 && (
                    <span className="n-folio__count">{f.svc.length} services</span>
                  )}
                </span>
                <span className="n-folio__go" aria-hidden="true">
                  <svg viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
              </span>
            </a>
          ))}
        </div>

        <div className="n-rise" style={{ marginTop: "clamp(26px,3.2vw,42px)" }}>
          <a className="n-btn n-btn--sun" href="Our Work.html">See the work<span className="n-btn__arr" aria-hidden="true" /></a>
        </div>
      </div>
    </section>
  );
}

window.Shot = Shot; window.NCreative = NCreative;
window.NBrands = NBrands;

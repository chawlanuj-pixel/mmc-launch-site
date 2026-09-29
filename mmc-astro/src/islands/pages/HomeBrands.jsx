import React from "react";
import { href } from "../../lib/links";
import { Shot, Wordmark, useCms, pickImg, splitList } from "./home-shared.jsx";

/* Mirrors content/clients.json, in book order. `img` is present only for the brands that actually have a file. */
const W = (id) => "/assets/clients/" + id + "-work.jpg";

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
  { b: "Anchor by Panasonic", t: "B2C", svc: [] },
  { b: "Flomate", t: "B2B", svc: [] },
  { b: "Green Hermitage", t: "B2C", svc: [] },
  { b: "Housing.com", t: "B2C", svc: [] },
  { b: "JSW", t: "B2B", svc: [] },
  { b: "LearningMate", t: "B2B", svc: [] },
  { b: "Rustomjee", t: "B2C", svc: [] },
  { b: "Saint-Gobain", t: "B2B", svc: [] },
  { b: "Gyproc", t: "B2B", svc: [] },
  { b: "Club Mahindra", t: "B2C", svc: [] },
];

/* Logo hover-to-project: the service list is revealed over the cover on hover (CSS). Most-opened brand leads after mount. */
export default function HomeBrands() {
  const folio = useCms("CaseStudies", N_FOLIO, (r) => ({
    b: r.brand, t: r.type || r.category || "",
    svc: splitList(r.services), h: r.url || "", img: pickImg(r.cover)
  }));

  /* Ordering runs after mount so the first paint and the server HTML keep the authored order. */
  const [ranked, setRanked] = React.useState(folio);
  const sig = folio.length + "|" + folio.map((f) => f.b).join("\u0000");
  React.useEffect(() => {
    let live = true;
    setRanked(folio);
    const P = window.MMCPop;
    if (P && P.loadGlobal) P.loadGlobal().then(() => { if (live) setRanked(P.rank(folio, (f) => f.b)); });
    return () => { live = false; };
  }, [sig]);
  const list = ranked.length === folio.length ? ranked : folio;

  /* Ten on the homepage; brands with case-study artwork first. */
  const HOME_MAX = 10;
  const withArt = list.filter((f) => f.img);
  const shown = withArt.concat(list.filter((f) => !f.img)).slice(0, HOME_MAX);

  return (
    <div className="n-folio">
      {shown.map((f, i) => (
        <a suppressHydrationWarning className={"n-folio__i n-rise d" + Math.min(4, (i % 4) + 1)}
           href={f.h || href("Our Work.html")} key={f.b}
           onClick={() => window.MMCPop && window.MMCPop.record(f.b, f.b)}>
          <span className="n-folio__cover">
            <span className="n-folio__tag">{f.t}</span>
            <Shot src={f.img} brand={f.b} tag={f.t} compact />
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
              <Wordmark name={f.b} className="n-folio__logo" />
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
  );
}

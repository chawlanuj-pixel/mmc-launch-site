import React from "react";
import { MMC_GLOSSARY } from "./glossaryData.js";
import { mmcTools } from "./ToolsShared.jsx";

/* tools/Glossary.jsx, the plain-English dictionary for everything the
   calculators and service pages assume you already know. Reads the same
   window.MMC_GLOSSARY the calculator info buttons use. */

function Glossary() {
  const T = mmcTools;
  const { ToolCTA } = T;
  const all = MMC_GLOSSARY || [];
  const cats = ["All"].concat(Array.from(new Set(all.map((t) => t.cat))));

  const [q, setQ] = React.useState("");
  const [cat, setCat] = React.useState("All");

  const needle = q.trim().toLowerCase();
  const shown = all.filter((t) => {
    if (cat !== "All" && t.cat !== cat) return false;
    if (!needle) return true;
    return (t.term + " " + (t.abbr || "") + " " + t.def + " " + (t.matters || ""))
      .toLowerCase().includes(needle);
  });

  // Deep links from the calculator popovers land on a specific term.
  React.useEffect(() => {
    const id = (window.location.hash || "").replace("#", "");
    if (!id) return;
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ block: "center" });
      el.classList.add("is-target");
      const t = setTimeout(() => el.classList.remove("is-target"), 2600);
      return () => clearTimeout(t);
    }
  }, []);

  const grouped = {};
  shown.forEach((t) => { (grouped[t.cat] = grouped[t.cat] || []).push(t); });

  return (
    <>
      <section className="page-hero tl-hero gl-hero" id="top" data-wm="Glossary">
        <span className="page-hero__wm" aria-hidden="true">Glossary</span>
        <div className="tl-wrap">
          <nav className="tl-crumb" aria-label="Breadcrumb">
            <a href="/">Home</a><span aria-hidden="true">·</span>
            <a href="/tools/">Free tools</a><span aria-hidden="true">·</span>
            <span aria-current="page">Glossary</span>
          </nav>
          <h1 className="tl-hero__h gl-hero__h">
            Every term we use, <span className="tl-serif">in plain English.</span>
          </h1>
          <p className="gl-hero__p">
            {all.length} terms from D2C and performance marketing: what each one means,
            how it's calculated, and why it actually matters to your P&amp;L. No jargon
            explained with more jargon.
          </p>
        </div>
      </section>

      <section className="gl-body">
        <div className="tl-wrap">
          <div className="gl-controls">
            <label className="gl-search">
              <span className="gl-search__icon" aria-hidden="true">⌕</span>
              <input
                type="search"
                className="gl-search__input"
                placeholder="Search terms: try ROAS, RTO, contribution…"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                aria-label="Search glossary"
              />
            </label>
            <div className="gl-chips" role="group" aria-label="Filter by category">
              {cats.map((c) => (
                <button key={c} type="button"
                  className={"gl-chip" + (cat === c ? " is-on" : "")}
                  aria-pressed={cat === c}
                  onClick={() => setCat(c)}>{c}</button>
              ))}
            </div>
          </div>

          <p className="gl-count">
            {shown.length === all.length
              ? `Showing all ${all.length} terms`
              : `${shown.length} of ${all.length} terms`}
          </p>

          {shown.length === 0 ? (
            <p className="gl-empty">
              Nothing matches “{q}”. Try a shorter word, or{" "}
              <button type="button" className="gl-reset" onClick={() => { setQ(""); setCat("All"); }}>
                clear the filters
              </button>.
            </p>
          ) : (
            Object.keys(grouped).map((c) => (
              <div className="gl-group" key={c}>
                <h2 className="gl-group__h">{c}</h2>
                <div className="gl-grid">
                  {grouped[c].map((t) => (
                    <article className="gl-card" id={t.id} key={t.id}>
                      <h3 className="gl-card__t">
                        {t.term}
                        {t.abbr && <span className="gl-card__abbr">{t.abbr}</span>}
                      </h3>
                      <p className="gl-card__d">{t.def}</p>
                      {t.formula && <p className="gl-card__f">{t.formula}</p>}
                      {t.matters && (
                        <p className="gl-card__w"><span>Why it matters</span>{t.matters}</p>
                      )}
                    </article>
                  ))}
                </div>
              </div>
            ))
          )}

          <div className="gl-tools">
            <span className="gl-tools__lead">Put these numbers to work</span>
            <div className="tl-cross__grid" style={{ padding: 0 }}>
              {(T.TOOLS || []).map((t) => (
                <a className="tl-cross__card" href={t.slug} key={t.slug}>
                  <span className="tl-cross__name">{t.name}<span className="tl-cross__arr" aria-hidden="true"></span></span>
                  <span className="tl-cross__blurb">{t.blurb}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ToolCTA line="Still not sure which number is your problem?" />
    </>
  );
}


export { Glossary };

import React from "react";

/* insights/InHero.jsx */

function InHero() {
  const [enter, setEnter] = React.useState(false);
  React.useEffect(() => {
    requestAnimationFrame(() => requestAnimationFrame(() => setEnter(true)));
  }, []);
  const clip = (e = "") => "clip-reveal " + (enter ? "in " : "") + e;
  const reveal = (e = "") => "reveal " + (enter ? "in " : "") + e;

  return (
    <section className="page-hero in-hero" id="top" data-wm="Insights">
        <span className="page-hero__wm" aria-hidden="true">Insights</span>
      <div className="container in-hero__inner">
        <div className={"eyebrow " + (enter ? "in" : "")}>Insights · Journal · Playbooks · Breakdowns</div>
        <h1 className="in-hero__h">
          <span className={clip("d1")}><span>We write what we{" "}</span></span>
          <span className={clip("d2")}><span><span className="em-serif">actually</span> ship.</span></span>
        </h1>
        <p className={reveal("d3 in-hero__sub")}>
          Founder's journal, growth breakdowns, and the playbooks we use across the book.
          No content marketing. Just the working notes of a studio in operation.
        </p>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        .in-hero { position: relative; z-index: 1; padding: 140px 0 clamp(56px, 7vw, 80px); }
        .in-hero__inner { max-width: none; }
        .in-hero__h { font-family: var(--font-display); font-weight: 700; font-size: clamp(48px, 6.4vw, 104px); line-height: 0.96; letter-spacing: -0.035em; color: var(--fg-1); margin: 22px 0 28px; }
        .in-hero__h .clip-reveal { display: block; }
        .in-hero__sub { font-family: var(--font-body); font-size: clamp(17px, 1.4vw, 22px); line-height: 1.5; color: var(--fg-2); max-width: 680px; margin: 0; }
      ` }} />
    </section>
  );
}

export { InHero };

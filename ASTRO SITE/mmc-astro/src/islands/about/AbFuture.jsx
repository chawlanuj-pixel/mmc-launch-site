import React from "react";
import { useInViewOnce } from "../shared/utils.jsx";

/* about/AbFuture.jsx, "We like building things that last · MMC is still evolving"
   Two halves of the same idea: long-term thinking + in-progress company. */

function AbFuture() {
  const ref = React.useRef(null);
  const seen = useInViewOnce ? useInViewOnce(ref) : true;

  const lasting = [
    { l: "Branding",        s: "feels timeless" },
    { l: "Acquisition",     s: "becomes scalable" },
    { l: "Communication",   s: "stays consistent" },
    { l: "Digital systems", s: "evolve intelligently" },
  ];

  const adaptingTo = [
    "changing consumer behaviour",
    "new digital ecosystems",
    "AI-driven discovery",
    "creative evolution",
    "the future of online business growth",
  ];

  return (
    <section ref={ref} id="lasting" className="ab-ft" data-screen-label="07 Lasting + evolving">
      <div className="container">
        {/* PART A. We like building things that last */}
        <div className={"ab-ft__a " + (seen ? "in" : "")}>
          <div className="ab-ft__a-l">
            <div className="eyebrow">Long-term thinking</div>
            <h2 className="ab-ft__a-h">
              We like building things<br/>
              that <span className="em-serif" style={{color:"var(--mmc-blue)"}}>last.</span>
            </h2>
            <p className="ab-ft__a-p">
              Quick spikes are exciting. Sustainable growth is far more valuable.
              We think about businesses on a five-to-ten-year horizon, even when the
              project is a six-week sprint.
            </p>
          </div>

          <div className="ab-ft__a-r">
            <span className="ab-ft__a-r-tag">Businesses grow stronger when -</span>
            <ul>
              {lasting.map((x, i) => (
                <li key={x.l} style={{ transitionDelay: `${i * 80}ms` }}>
                  <span className="ab-ft__a-r-l">{x.l}</span>
                  <span className="ab-ft__a-r-dot" aria-hidden="true"></span>
                  <span className="ab-ft__a-r-s">{x.s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Connector */}
        <div className="ab-ft__divider" aria-hidden="true">
          <span></span>
          <span className="ab-ft__divider-mark">·</span>
          <span></span>
        </div>

        {/* PART B, MMC is still evolving */}
        <div className={"ab-ft__b " + (seen ? "in" : "")}>
          <div className="ab-ft__b-stamp">
            <span className="ab-ft__b-stamp-l">Still</span>
            <span className="ab-ft__b-stamp-r">Building</span>
            <span className="ab-ft__b-stamp-sub">est. ongoing · forever</span>
          </div>

          <div className="ab-ft__b-body">
            <div className="eyebrow">In progress</div>
            <h2 className="ab-ft__b-h">
              MMC is still <span className="em-serif" style={{color:"var(--mmc-yellow)"}}>evolving.</span>
              <br/>
              <span className="ab-ft__b-h-mute">Honestly. We like it that way.</span>
            </h2>
            <p className="ab-ft__b-p">
              We don't see ourselves as a finished agency.
              We see MMC as a company constantly adapting to,
            </p>
            <ul className="ab-ft__b-list">
              {adaptingTo.map((x, i) => (
                <li key={x} style={{ transitionDelay: `${i * 70}ms` }}>
                  <span className="ab-ft__b-list-n">{String(i+1).padStart(2,"0")}</span>
                  <span className="ab-ft__b-list-l">{x}</span>
                </li>
              ))}
            </ul>
            <p className="ab-ft__b-foot">
              The future of marketing belongs to businesses that adapt faster
              than the market changes. We're trying to be one of them.
            </p>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .ab-ft { position: relative; z-index: 1; padding: clamp(56px, 8vw, 112px) 0; }

        /* ---- Part A ---- */
        .ab-ft__a {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: clamp(32px, 4vw, 72px);
          align-items: start;
          opacity: 0; transform: translateY(8px);
          transition: opacity 800ms var(--ease-out), transform 800ms var(--ease-out);
        }
        .ab-ft__a.in { opacity: 1; transform: translateY(0); }
        .ab-ft__a-h {
          font-family: var(--font-display); font-weight: 600;
          font-size: clamp(36px, 5vw, 72px); letter-spacing: -0.035em;
          line-height: 0.98; margin: 18px 0 22px; color: var(--fg-1);
        }
        .ab-ft__a-p {
          font-family: var(--font-body); font-size: clamp(16px, 1.2vw, 19px);
          line-height: 1.6; color: var(--fg-2); margin: 0; max-width: 520px;
        }

        .ab-ft__a-r {
          padding: clamp(22px, 2.4vw, 32px) clamp(22px, 2.4vw, 32px);
          background: rgba(255,255,255,0.78);
          border: 1px solid rgba(var(--mmc-blue-rgb), 0.10);
          border-radius: 18px; backdrop-filter: blur(10px);
        }
        .ab-ft__a-r-tag {
          font-family: var(--font-body); font-size: 10.5px; font-weight: 700;
          letter-spacing: 0.22em; text-transform: uppercase;
          color: var(--mmc-yellow); display: block; margin-bottom: 14px;
        }
        .ab-ft__a-r ul { list-style: none; margin: 0; padding: 0; }
        .ab-ft__a-r li {
          display: grid; grid-template-columns: minmax(0, auto) 6px minmax(0, 1fr);
          gap: 14px; align-items: baseline;
          padding: 14px 0;
          border-top: 1px solid rgba(var(--mmc-blue-rgb), 0.12);
          opacity: 0; transform: translateX(-6px);
          transition: opacity 600ms var(--ease-out), transform 600ms var(--ease-out);
        }
        .ab-ft__a-r li:first-child { border-top: 0; padding-top: 4px; }
        .ab-ft__a.in .ab-ft__a-r li { opacity: 1; transform: translateX(0); }
        .ab-ft__a-r-l {
          font-family: var(--font-display); font-weight: 700;
          font-size: clamp(17px, 1.5vw, 22px); letter-spacing: -0.02em;
          color: var(--fg-1);
        }
        .ab-ft__a-r-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--mmc-yellow); align-self: center; transform: translateY(-2px);
        }
        .ab-ft__a-r-s {
          font-family: var(--font-serif); font-style: italic; font-weight: 500;
          font-size: clamp(16px, 1.3vw, 19px);
          color: var(--mmc-blue);
        }

        /* ---- Divider ---- */
        .ab-ft__divider {
          display: flex; align-items: center; gap: 16px;
          margin: clamp(48px, 6vw, 80px) 0;
        }
        .ab-ft__divider span:first-child, .ab-ft__divider span:last-child {
          flex: 1; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(var(--mmc-blue-rgb), 0.22), transparent);
        }
        .ab-ft__divider-mark {
          font-family: var(--font-display); font-weight: 800;
          font-size: 28px; color: var(--mmc-yellow);
          line-height: 0.5;
        }

        /* ---- Part B ---- */
        .ab-ft__b {
          position: relative;
          display: grid; grid-template-columns: 360px 1fr;
          gap: clamp(32px, 4vw, 72px); align-items: start;
          opacity: 0; transform: translateY(8px);
          transition: opacity 800ms var(--ease-out) 200ms,
                      transform 800ms var(--ease-out) 200ms;
        }
        .ab-ft__b.in { opacity: 1; transform: translateY(0); }

        .ab-ft__b-stamp {
          position: relative;
          aspect-ratio: 1 / 1;
          background:
            radial-gradient(ellipse 60% 60% at 50% 60%, rgba(var(--mmc-blue-rgb), 0.10), transparent 75%),
            linear-gradient(180deg, #FAF7F1, #EFE7D2);
          border: 1px solid rgba(var(--mmc-blue-rgb), 0.14);
          border-radius: 20px;
          padding: 28px;
          display: flex; flex-direction: column; justify-content: center; align-items: center;
          gap: 6px;
          isolation: isolate; overflow: hidden;
        }
        .ab-ft__b-stamp::before {
          content: ""; position: absolute;
          left: 50%; top: 85%; width: 240%; aspect-ratio: 1 / 1;
          transform: translate(-50%, 0);
          border: 1px solid var(--mmc-blue);
          opacity: 0.08;
          border-radius: 50%;
        }
        .ab-ft__b-stamp::after {
          content: ""; position: absolute;
          left: 50%; top: 75%; width: 180%; aspect-ratio: 1 / 1;
          transform: translate(-50%, 0);
          border: 1px solid var(--mmc-blue);
          opacity: 0.10;
          border-radius: 50%;
        }
        .ab-ft__b-stamp-l, .ab-ft__b-stamp-r {
          position: relative; z-index: 1;
          font-family: var(--font-display); font-weight: 700;
          font-size: clamp(42px, 4vw, 64px);
          letter-spacing: -0.04em; line-height: 0.9;
          color: var(--mmc-blue);
        }
        .ab-ft__b-stamp-r { color: var(--mmc-yellow); font-style: italic; font-family: var(--font-serif); font-weight: 500; }
        .ab-ft__b-stamp-sub {
          position: relative; z-index: 1;
          margin-top: 12px;
          font-family: var(--font-body); font-size: 10px; font-weight: 700;
          letter-spacing: 0.22em; text-transform: uppercase;
          color: var(--fg-3);
        }

        .ab-ft__b-body { display: flex; flex-direction: column; gap: 18px; }
        .ab-ft__b-h {
          font-family: var(--font-display); font-weight: 600;
          font-size: clamp(34px, 4.6vw, 64px); letter-spacing: -0.035em;
          line-height: 1.02; margin: 8px 0 0; color: var(--fg-1);
        }
        .ab-ft__b-h-mute {
          font-family: var(--font-display); font-weight: 500;
          font-size: clamp(20px, 2vw, 28px); color: var(--fg-2);
          display: block; margin-top: 8px;
        }
        .ab-ft__b-p {
          font-family: var(--font-body); font-size: clamp(16px, 1.2vw, 19px);
          line-height: 1.6; color: var(--fg-2); margin: 0; max-width: 600px;
        }
        .ab-ft__b-list {
          list-style: none; margin: 6px 0; padding: 0;
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 12px 28px;
        }
        .ab-ft__b-list li {
          display: grid; grid-template-columns: 32px 1fr; gap: 10px; align-items: baseline;
          padding: 10px 0;
          border-top: 1px solid rgba(var(--mmc-blue-rgb), 0.14);
          opacity: 0; transform: translateY(6px);
          transition: opacity 600ms var(--ease-out), transform 600ms var(--ease-out);
        }
        .ab-ft__b.in .ab-ft__b-list li { opacity: 1; transform: translateY(0); }
        .ab-ft__b-list-n {
          font-family: var(--font-display); font-weight: 800;
          font-size: 11.5px; letter-spacing: 0.18em;
          color: var(--mmc-yellow); font-variant-numeric: tabular-nums;
        }
        .ab-ft__b-list-l {
          font-family: var(--font-display); font-weight: 600;
          font-size: clamp(15px, 1.2vw, 18px); letter-spacing: -0.015em;
          color: var(--fg-1); text-wrap: balance;
        }
        .ab-ft__b-foot {
          margin: 12px 0 0;
          font-family: var(--font-serif); font-style: italic; font-weight: 500;
          font-size: clamp(17px, 1.4vw, 22px); line-height: 1.45;
          color: var(--mmc-blue); max-width: 660px;
        }

        @media (max-width: 900px) {
          .ab-ft__a { grid-template-columns: 1fr; }
          .ab-ft__b { grid-template-columns: 1fr; }
          .ab-ft__b-stamp { max-width: 320px; }
          .ab-ft__b-list { grid-template-columns: 1fr; }
        }
      ` }} />
    </section>
  );
}

export { AbFuture };

import React from "react";
import { useInViewOnce } from "../shared/utils.jsx";

/* about/AbWhy.jsx, "More than marketing"
   How MMC naturally expanded beyond campaigns + the core belief. */

function AbWhy() {
  const ref = React.useRef(null);
  const seen = useInViewOnce ? useInViewOnce(ref) : true;

  const surfaces = [
    "Performance marketing",
    "Branding",
    "Websites",
    "SEO",
    "CRO",
    "Marketplace growth",
    "Content systems",
    "Discoverability strategy",
  ];

  return (
    <section ref={ref} id="more-than-marketing" className="ab-wh" data-screen-label="08 More than marketing">
      <div className="container">
        <header className={"ab-wh__head " + (seen ? "in" : "")}>
          <div className="eyebrow">More than marketing</div>
          <h2 className="ab-wh__h">
            Over time, MMC{" "}
            <span className="em-serif" style={{color:"var(--mmc-blue)"}}>naturally</span>{" "}
            evolved beyond campaigns.
          </h2>
          <p className="ab-wh__p">
            We didn't sit down and plan a service menu. We followed what real growth needed.
            Today, we work across eight connected practices, because modern businesses need
            connected growth ecosystems, not fragmented execution.
          </p>
        </header>

        {/* Surface chips arranged as a soft constellation */}
        <ul className={"ab-wh__surfaces " + (seen ? "in" : "")}>
          {surfaces.map((s, i) => (
            <li key={s} style={{ transitionDelay: `${i * 60}ms` }}>
              <span className="ab-wh__surface-n">{String(i+1).padStart(2,"0")}</span>
              <span className="ab-wh__surface-l">{s}</span>
            </li>
          ))}
        </ul>

        {/* The core belief, big serif moment */}
        <div className={"ab-wh__belief " + (seen ? "in" : "")}>
          <span className="ab-wh__belief-tag">But at the centre of everything, the same core belief -</span>
          <p className="ab-wh__belief-line">
            Businesses become stronger
            <br/>
            when they become{" "}
            <span className="em-serif" style={{color:"var(--mmc-yellow)"}}>easier</span>{" "}
            to <span className="em-serif" style={{color:"var(--mmc-yellow)"}}>discover</span>,{" "}
            <span className="em-serif" style={{color:"var(--mmc-yellow)"}}>trust</span>,{" "}
            and <span className="em-serif" style={{color:"var(--mmc-yellow)"}}>choose.</span>
          </p>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .ab-wh { position: relative; z-index: 1; padding: clamp(56px, 8vw, 112px) 0; }

        .ab-wh__head { max-width: 880px; margin-bottom: clamp(40px, 5vw, 64px);
          opacity: 0; transform: translateY(8px);
          transition: opacity 700ms var(--ease-out), transform 700ms var(--ease-out); }
        .ab-wh__head.in { opacity: 1; transform: translateY(0); }
        .ab-wh__h {
          font-family: var(--font-display); font-weight: 600;
          font-size: clamp(36px, 5vw, 72px); letter-spacing: -0.035em;
          line-height: 0.98; margin: 18px 0 22px; color: var(--fg-1);
        }
        .ab-wh__p {
          font-family: var(--font-body); font-size: clamp(16px, 1.2vw, 19px);
          line-height: 1.6; color: var(--fg-2); margin: 0; max-width: 700px;
        }

        .ab-wh__surfaces {
          list-style: none; margin: 0 0 clamp(48px, 6vw, 80px); padding: 0;
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: clamp(12px, 1.4vw, 18px);
        }
        .ab-wh__surfaces li {
          position: relative;
          display: flex; flex-direction: column; gap: 14px;
          padding: clamp(20px, 2.4vw, 28px) clamp(18px, 2vw, 24px);
          background: rgba(255,255,255,0.78);
          border: 1px solid rgba(var(--mmc-blue-rgb), 0.10);
          border-radius: 16px;
          backdrop-filter: blur(8px);
          opacity: 0; transform: translateY(8px);
          transition: opacity 600ms var(--ease-out), transform 600ms var(--ease-out),
                      border-color var(--dur-base) var(--ease-out),
                      background var(--dur-base) var(--ease-out);
          aspect-ratio: 1.4 / 1;
          justify-content: space-between;
        }
        .ab-wh__surfaces.in li { opacity: 1; transform: translateY(0); }
        .ab-wh__surfaces li:hover {
          background: rgba(255,255,255,0.96);
          border-color: rgba(var(--mmc-blue-rgb), 0.22);
        }
        .ab-wh__surface-n {
          font-family: var(--font-display); font-weight: 800;
          font-size: 12px; letter-spacing: 0.20em;
          color: var(--mmc-yellow); font-variant-numeric: tabular-nums;
        }
        .ab-wh__surface-l {
          font-family: var(--font-display); font-weight: 600;
          font-size: clamp(18px, 1.6vw, 24px); letter-spacing: -0.025em;
          line-height: 1.15; color: var(--fg-1);
          text-wrap: balance;
        }

        .ab-wh__belief {
          position: relative;
          padding: clamp(48px, 6vw, 88px) clamp(28px, 4vw, 64px);
          background: var(--mmc-blue);
          color: #fff;
          border-radius: 24px;
          box-shadow: 0 40px 80px -28px rgba(var(--mmc-blue-rgb), 0.55);
          overflow: hidden; isolation: isolate;
          opacity: 0; transform: translateY(12px);
          transition: opacity 800ms var(--ease-out) 200ms,
                      transform 800ms var(--ease-out) 200ms;
        }
        .ab-wh__belief.in { opacity: 1; transform: translateY(0); }
        .ab-wh__belief::before {
          content: ""; position: absolute;
          left: 50%; top: 100%; width: 180%; aspect-ratio: 1 / 1;
          transform: translate(-50%, -10%);
          border-radius: 50%;
          border: 1px solid rgba(var(--mmc-yellow-rgb), 0.20);
          z-index: 0;
        }
        .ab-wh__belief::after {
          content: ""; position: absolute;
          left: 50%; top: 100%; width: 140%; aspect-ratio: 1 / 1;
          transform: translate(-50%, -10%);
          border-radius: 50%;
          border: 1px solid rgba(var(--mmc-yellow-rgb), 0.14);
          z-index: 0;
        }
        .ab-wh__belief > * { position: relative; z-index: 1; }
        .ab-wh__belief-tag {
          display: block;
          font-family: var(--font-body); font-size: 10.5px; font-weight: 700;
          letter-spacing: 0.22em; text-transform: uppercase;
          color: var(--mmc-yellow); margin-bottom: 28px;
        }
        .ab-wh__belief-line {
          font-family: var(--font-display); font-weight: 500;
          font-size: clamp(34px, 5.4vw, 88px);
          line-height: 1.04; letter-spacing: -0.035em;
          color: #fff; margin: 0;
          text-wrap: balance;
        }

        @media (max-width: 900px) {
          .ab-wh__surfaces { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 520px) {
          .ab-wh__surfaces { grid-template-columns: 1fr; }
        }
      ` }} />
    </section>
  );
}

export { AbWhy };

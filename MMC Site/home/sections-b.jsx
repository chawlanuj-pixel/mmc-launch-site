/* home/sections-b.jsx: Results (dashboard), Case study, Final CTA */

/* ============================================================ RESULTS / DASHBOARD */
function ResultsV2({ active }) {
  const channels = [
  { name: "Meta", spend: 38, roas: "6.4×" },
  { name: "Google", spend: 28, roas: "9.2×" },
  { name: "Amazon", spend: 16, roas: "12.6×", hot: true },
  { name: "TikTok", spend: 12, roas: "4.8×" },
  { name: "Email", spend: 6, roas: "22.1×", hot: true }];

  return (
    <section className={"sec sec--light sec--flip" + (active ? " is-active" : "")} data-screen-label="05 Results" data-label="Results" id="sec-4">
      <div className="sec__media">
        <div className="dashv2">
          <div className="dashv2__head">
            <span className="dashv2__brand"><span className="dashv2__mark">M</span>Blended performance · 90d</span>
            <span className="dashv2__live"><span className="dashv2__live-dot"></span>Live</span>
          </div>
          <div className="dashv2__hero">
            <div className="dashv2__roas">{active ? <Count to={8.7} decimals={1} run={active} suffix="×" /> : "0.0×"}</div>
            <div className="dashv2__delta">↗ +2.3× vs. industry · 24% MoM</div>
          </div>
          <svg className="dashv2__spark" viewBox="0 0 320 90" preserveAspectRatio="none" aria-hidden="true">
            <defs><linearGradient id="sfill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFC528" stopOpacity="0.4" /><stop offset="100%" stopColor="#FFC528" stopOpacity="0" />
            </linearGradient></defs>
            <path className={"dashv2__sparkfill " + (active ? "in" : "")} d="M0 70 L32 66 L64 68 L96 56 L128 54 L160 42 L192 46 L224 32 L256 30 L288 18 L320 8 L320 90 L0 90 Z" fill="url(#sfill)" />
            <path className={"dashv2__sparkline " + (active ? "in" : "")} d="M0 70 L32 66 L64 68 L96 56 L128 54 L160 42 L192 46 L224 32 L256 30 L288 18 L320 8" fill="none" stroke="#FFC528" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div className="dashv2__channels">
            {channels.map((c, idx) =>
            <div className="dashv2__row" key={c.name}>
                <span className="dashv2__row-n">{c.name}</span>
                <span className="dashv2__row-bar"><span style={{ width: active ? c.spend * 2.3 + "%" : "0%", transitionDelay: idx * 70 + 300 + "ms", background: c.hot ? "var(--mmc-yellow)" : "rgba(255,255,255,0.85)" }}></span></span>
                <span className={"dashv2__row-r " + (c.hot ? "hot" : "")}>{c.roas}</span>
              </div>
            )}
          </div>
        </div>
        <span className="media-tag"><span className="dot"></span>Sample client dashboard</span>
      </div>

      <div className="sec__content">
        <span className="eyebrow2 r d1">Proof in the numbers</span>
        <h2 className="sec__h r d2">Every channel,<br /><span className="serif-accent">one P&amp;L.</span></h2>
        <p className="sec__lead r d3">
          We don't optimize channels in isolation. One blended view of spend, ROAS and
          retention, so the whole engine is tuned to revenue, not vanity metrics.
        </p>
        <div className="stats r d4">
          <div className="stat stat-top"><span className="stat__n"><Count to={98} run={active} /><i>%</i></span><span className="stat__l">D90 retention</span></div>
          <div className="stat stat-top"><span className="stat__n"><Count to={24.6} decimals={1} run={active} /><i>K</i></span><span className="stat__l">New customers · Q1</span></div>
          <div className="stat stat-top"><span className="stat__n"><i>₹</i><Count to={24.6} decimals={1} run={active} /><i>Cr</i></span><span className="stat__l">Net revenue · Q1</span></div>
        </div>
      </div>

      <style>{`
        .dashv2 {
          position: absolute; inset: clamp(28px,4vw,64px);
          background: linear-gradient(160deg, #16329E, #0b1645);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 20px; padding: clamp(22px,2.4vw,32px);
          display: flex; flex-direction: column; gap: clamp(14px,1.6vw,20px);
          box-shadow: 0 40px 90px -40px rgba(11,22,69,0.7);
          color: #fff; z-index: 3;
        }
        .dashv2__head { display: flex; justify-content: space-between; align-items: center; padding-bottom: 14px; border-bottom: 1px solid rgba(255,255,255,0.12); }
        .dashv2__brand { display: inline-flex; align-items: center; gap: 10px; font-family: var(--font-body); font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255,255,255,0.72); }
        .dashv2__mark { width: 26px; height: 26px; border-radius: 7px; background: var(--mmc-yellow); color: var(--mmc-blue-900); font-family: var(--font-display); font-weight: 800; font-size: 13px; display: inline-flex; align-items: center; justify-content: center; }
        .dashv2__live { display: inline-flex; align-items: center; gap: 7px; font-size: 10px; font-weight: 800; letter-spacing: 0.14em; text-transform: uppercase; color: #6EE7A8; }
        .dashv2__live-dot { width: 6px; height: 6px; border-radius: 50%; background: #2BB573; box-shadow: 0 0 0 4px rgba(43,181,115,0.25); }
        .dashv2__hero { display: flex; align-items: baseline; gap: 16px; flex-wrap: wrap; }
        .dashv2__roas { font-family: var(--font-display); font-weight: 800; font-size: clamp(48px,6vw,84px); line-height: 0.9; letter-spacing: -0.04em; color: var(--mmc-yellow); font-variant-numeric: tabular-nums; }
        .dashv2__delta { font-family: var(--font-body); font-size: 12.5px; font-weight: 700; color: #6EE7A8; letter-spacing: 0.02em; }
        .dashv2__spark { width: 100%; height: clamp(60px,8vh,90px); }
        .dashv2__sparkline { stroke-dasharray: 460; stroke-dashoffset: 460; transition: stroke-dashoffset 1500ms var(--ease-out) 300ms; }
        .dashv2__sparkline.in { stroke-dashoffset: 0; }
        .dashv2__sparkfill { opacity: 0; transition: opacity 700ms var(--ease-out) 1100ms; }
        .dashv2__sparkfill.in { opacity: 1; }
        .dashv2__channels { display: flex; flex-direction: column; gap: 10px; }
        .dashv2__row { display: grid; grid-template-columns: 64px 1fr 52px; align-items: center; gap: 14px; }
        .dashv2__row-n { font-family: var(--font-display); font-weight: 700; font-size: 13px; }
        .dashv2__row-bar { height: 7px; background: rgba(255,255,255,0.12); border-radius: 999px; overflow: hidden; }
        .dashv2__row-bar > span { display: block; height: 100%; width: 0; border-radius: 999px; transition: width 1200ms var(--ease-out); }
        .dashv2__row-r { font-family: var(--font-display); font-weight: 800; font-size: 14px; text-align: right; color: #fff; font-variant-numeric: tabular-nums; }
        .dashv2__row-r.hot { color: var(--mmc-yellow); }
        @media (max-width: 920px) { .dashv2 { inset: 16px; padding: 18px; } .dashv2__spark { display: none; } }
      `}</style>
    </section>);

}

/* ============================================================ PORTFOLIO (4 selectable brands)
   Names, types and service mixes come from content/clients.json. MMC supplied no
   per-client numbers, so these cards carry scope only, never a result. */
function CaseV2({ active }) {
  const work = [
    { brand: "Sprnt", tag: "D2C",
      blurb: "One pod on the storefront, the media, the creative and the social that carries the range.",
      services: ["Website redesign and development", "Performance ads, D2C", "Performance creative", "Social media"] },
    { brand: "Panda Cabs", tag: "B2C",
      blurb: "The website, the lead engine running on top of it, and the creative and social that feed both.",
      services: ["Website redesign and development", "Lead generation", "Performance creative", "Social media"] },
    { brand: "The Growing Giraffe", tag: "D2C",
      blurb: "Conversion work on the store, performance media and creative over it, Amazon and quick commerce alongside.",
      services: ["Conversion rate optimisation", "Performance ads, D2C", "Performance creative", "Amazon", "Quick commerce"] },
    { brand: "Bloom Edutours", tag: "B2B",
      blurb: "A website rebuilt around enquiries, then lead generation, with creative and social carrying it.",
      services: ["Website redesign and development", "Lead generation", "Performance creative", "Social media"] },
  ];
  const [i, setI] = React.useState(0);
  const cur = work[i];
  return (
    <section className={"sec sec--dark" + (active ? " is-active" : "")} data-screen-label="08 Portfolio" data-label="Case" id="sec-7">
      <div className="sec__media">
        <div className="ken swapstack">
          {work.map((w, idx) => (
            <div key={idx} className={"swapimg " + (idx === i ? "on" : "")}>
              <image-slot id={"home-case-" + idx} placeholder={"Drop " + w.brand + " hero"} fit="cover" style={{ width: "100%", height: "100%" }}></image-slot>
            </div>
          ))}
        </div>
        {/* Scope, not results, overlaid on the client thumbnail */}
        <div className="caseover" key={"ov" + i}>
          <div className="caseover__m">
            <span className="caseover__n">{cur.tag}</span>
            <span className="caseover__l">Client type</span>
          </div>
          <div className="caseover__m">
            <span className="caseover__n">{String(cur.services.length).padStart(2, "0")}</span>
            <span className="caseover__l">Workstreams live</span>
          </div>
        </div>
        <span className="media-tag" key={"tag" + i}><span className="dot"></span>{cur.tag}</span>
      </div>

      <div className="sec__content">
        <span className="eyebrow2 r d1">Selected work · 24 brands</span>
        <h2 className="sec__h r d2" style={{ fontSize: "clamp(30px,3.2vw,52px)" }}>
          Real brands. <span className="serif-accent">Real systems.</span>
        </h2>

        <div className="caselist r d3">
          {work.map((w, idx) => (
            <button key={w.brand} className={"caselist__row " + (idx === i ? "is-on" : "")}
                    onMouseEnter={() => setI(idx)} onClick={() => setI(idx)}>
              <span className="caselist__brand">{w.brand}</span>
              <span className="caselist__tag">{w.tag}</span>
              <span className="caselist__roas">{w.services.length} services</span>
            </button>
          ))}
        </div>

        <div className="casedetail" key={"d" + i}>
          <p className="casedetail__blurb">{cur.blurb}</p>
          <div className="casedetail__svcs">
            <span className="casedetail__svcs-l">What we run</span>
            <ul>
              {cur.services.map((sv) => <li key={sv}>{sv}</li>)}
            </ul>
          </div>
          <a className="b b--link" href="Our Work.html" style={{ color: "var(--mmc-yellow)" }}>See the client book<span className="arr"></span></a>
        </div>
      </div>

      <style>{`
        .caseover { position: absolute; z-index: 3; top: calc(var(--nav-h) + clamp(10px,1.4vw,18px)); left: clamp(20px,2.5vw,40px); right: clamp(20px,2.5vw,40px); display: flex; gap: 10px; flex-wrap: wrap; animation: sysFadeB 420ms var(--ease-out); }
        @keyframes sysFadeB { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
        .caseover__m { flex: 1; min-width: 130px; display: flex; flex-direction: column; gap: 4px; padding: 13px 16px; border-radius: 12px; background: rgba(10,18,55,0.55); border: 1px solid rgba(255,255,255,0.22); backdrop-filter: blur(12px); }
        .caseover__n { font-family: var(--font-display); font-weight: 800; font-size: clamp(22px,2.2vw,32px); letter-spacing: -0.03em; color: var(--mmc-yellow); line-height: 1; }
        .caseover__l { font-family: var(--font-body); font-size: 10px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(255,255,255,0.78); }

        .caselist { display: flex; flex-direction: column; gap: 2px; max-width: 600px; }
        .caselist__row { width: 100%; display: grid; grid-template-columns: 1fr auto auto; align-items: center; gap: 16px; padding: 15px 6px; border-top: 1px solid rgba(255,255,255,0.14); color: rgba(255,255,255,0.62); text-align: left; transition: all var(--dur-base) var(--ease-out); }
        .caselist__row:last-child { border-bottom: 1px solid rgba(255,255,255,0.14); }
        .caselist__brand { font-family: var(--font-display); font-weight: 700; font-size: clamp(17px,1.6vw,23px); letter-spacing: -0.02em; line-height: 1.1; }
        .caselist__tag { font-family: var(--font-body); font-size: 10.5px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; opacity: 0.6; }
        .caselist__roas { font-family: var(--font-body); font-weight: 700; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--mmc-yellow); opacity: 0; white-space: nowrap; }
        .caselist__row:hover, .caselist__row.is-on { color: #fff; padding-left: 16px; }
        .caselist__row.is-on .caselist__roas { opacity: 0.9; }

        .casedetail { margin-top: 14px; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.16); max-width: 600px; animation: sysFadeB 380ms var(--ease-out); }
        .casedetail__blurb { font-family: var(--font-body); font-size: clamp(14px,1.05vw,16px); line-height: 1.55; color: rgba(255,255,255,0.78); margin: 0 0 14px; max-width: 50ch; }
        .casedetail__svcs { display: flex; flex-direction: column; gap: 9px; padding-top: 12px; border-top: 1.5px solid rgba(255,255,255,0.2); margin-bottom: 16px; }
        .casedetail__svcs-l { font-family: var(--font-body); font-size: 10px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--mmc-yellow); }
        .casedetail__svcs ul { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; gap: 6px; }
        .casedetail__svcs li { font-family: var(--font-body); font-size: 11.5px; font-weight: 600; letter-spacing: 0.02em; color: #fff; padding: 5px 11px; border-radius: 999px; background: rgba(255,255,255,0.10); border: 1px solid rgba(255,255,255,0.18); }
        @media (max-width: 920px) { .caselist__tag { display: none; } }
      `}</style>
    </section>);

}

/* ============================================================ FINAL CTA */
function CtaV2({ active }) {
  return (
    <section className={"sec sec--dark sec--flip" + (active ? " is-active" : "")} data-screen-label="10 Final CTA" data-label="Talk" id="sec-9">
      <div className="sec__media">
        <div className="ken">
          <image-slot id="home-cta" placeholder="Drop a warm team / studio photo" fit="cover" style={{ width: "100%", height: "100%" }}></image-slot>
        </div>
        <span className="media-tag"><span className="dot"></span>Mon–Sat · reply in the hour</span>
      </div>

      <div className="sec__content">
        <span className="eyebrow2 r d1">The last word</span>
        <h2 className="sec__h r d2">Stop renting growth.<br /><span className="serif-accent">Own</span> the engine.</h2>
        <p className="sec__lead r d3">
          One conversation is all it takes. Thirty minutes with a senior who'll tell you the
          three things to fix first, even if you never sign with us.
        </p>
        <div className="actions r d4">
          <a className="b b--sun" href="Contact.html" onClick={(e) => window.mmcBookCall("home-cta", e)}>Book a strategy call<span className="arr"></span></a>
          <a className="b b--ghost-light" href="https://wa.me/919619472727">WhatsApp the studio<span className="arr"></span></a>
        </div>
        <div className="cta__foot r d5">
          <span>Or write to <a href="mailto:sales-in@mondaymarketing.company">sales-in@mondaymarketing.company</a> · we read every line.</span>
        </div>
      </div>

      <style>{`
        .cta__foot { display: flex; align-items: center; gap: 18px; margin-top: 12px; flex-wrap: wrap; font-family: var(--font-body); font-size: 12px; font-weight: 600; letter-spacing: 0.04em; color: rgba(255,255,255,0.6); }
        .cta__logo { height: 26px; width: auto; }
        .cta__foot a { color: var(--mmc-yellow); border-bottom: 1px solid currentColor; }
      `}</style>
    </section>);

}

Object.assign(window, { ResultsV2, CaseV2, CtaV2 });
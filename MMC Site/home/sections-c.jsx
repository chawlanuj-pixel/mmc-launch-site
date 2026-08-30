/* home/sections-c.jsx: Process, Industries, FAQ, Footer
   Each reuses the full-screen split system; interactions differ per section. */

/* ============================================================ PROCESS (numbered timeline) */
function ProcessV2({ active }) {
  const stages = [
  { n: "01", phase: "Week 1", t: "Discovery", d: "We map the brand, the buyer, the market, and the math. No assumptions.", out: ["Brand context doc", "Buyer journey map", "Market read"] },
  { n: "02", phase: "Week 2", t: "Audit", d: "Funnel, retention, creative and architecture: diagnosed line by line.", out: ["Funnel diagnostic", "Retention forensic", "Creative read"] },
  { n: "03", phase: "Week 3", t: "Strategy", d: "A one-page growth thesis. What we fix, in what order, with what math.", out: ["Growth thesis", "90-day roadmap", "Revenue model"] },
  { n: "04", phase: "Week 4", t: "Content & Creative", d: "The single biggest lever: 240+ assets a month, all on one brand thesis.", out: ["UGC + video", "Performance creatives", "Landing-page copy", "Lifecycle flows"], star: true },
  { n: "05", phase: "Day 30+", t: "Execution", d: "A cross-functional pod ships. Performance, creative, retention, tech: together.", out: ["Media activation", "CRM + flows", "Web + tech rollout"] },
  { n: "06", phase: "Weekly", t: "Optimization", d: "We read the data daily, optimize weekly, and re-strategize every quarter.", out: ["Daily monitoring", "Weekly experiments", "Cohort reviews"] },
  { n: "07", phase: "Q2 +", t: "Scale", d: "When the system compounds, we lean in: new channels, geos and SKUs.", out: ["New channel layer", "Geo expansion", "Category extension"] }];

  const [i, setI] = React.useState(3);
  const cur = stages[i];
  return (
    <section className={"sec sec--dark sec--dense" + (active ? " is-active" : "")} data-screen-label="06 Process" data-label="Process" id="sec-5">
      <div className="sec__media">
        <div className="ken swapstack">
          {stages.map((s, idx) =>
          <div key={idx} className={"swapimg " + (idx === i ? "on" : "")}>
              <image-slot id={"home-proc-" + idx} placeholder={"Drop a photo · " + s.t} fit="cover" style={{ width: "100%", height: "100%" }}></image-slot>
            </div>
          )}
        </div>
        <span className="media-tag" key={i}><span className="dot"></span>{cur.phase} · {cur.t}</span>
      </div>
      <div className="sec__content">
        <span className="eyebrow2 r d1">How we build momentum</span>
        <h2 className="sec__h r d2" style={{ fontSize: "clamp(32px,3.4vw,56px)" }}>
          Seven stages. <span className="serif-accent">One engine.</span>
        </h2>
        <ol className="proc2 r d3">
          {stages.map((s, idx) =>
          <li key={s.n} className={"proc2__row " + (idx === i ? "is-on " : "") + (idx < i ? "is-done " : "") + (s.star ? "is-star" : "")}>
              <button onMouseEnter={() => setI(idx)} onClick={() => setI(idx)}>
                <span className="proc2__dot"></span>
                <span className="proc2__n">{s.n}</span>
                <span className="proc2__t">{s.t}{s.star && <em>★</em>}</span>
                <span className="proc2__phase">{s.phase}</span>
              </button>
            </li>
          )}
        </ol>
        <div className="procdetail" key={i}>
          <div className="procdetail__head">
            <span className="procdetail__phase">{cur.phase}</span>
            <span className="procdetail__title">{cur.n} · {cur.t}{cur.star && <em> ★ biggest lever</em>}</span>
          </div>
          <p className="procdetail__desc">{cur.d}</p>
          <div className="procdetail__out">
            <span className="procdetail__out-lbl">What ships</span>
            <ul className="procdetail__list">
              {cur.out.map((o) => <li key={o}>{o}</li>)}
            </ul>
          </div>
        </div>
      </div>
      <style>{`
        .proc2 { list-style:none; margin:4px 0 0; padding:0; position:relative; max-width:560px; }
        .proc2::before { content:""; position:absolute; left:5px; top:14px; bottom:14px; width:2px; background:rgba(255,255,255,0.16); }
        .proc2__row button { width:100%; display:grid; grid-template-columns:28px 30px 1fr auto; align-items:center; gap:12px; padding:9px 6px; color:rgba(255,255,255,0.6); text-align:left; transition:all var(--dur-base) var(--ease-out); }
        .proc2__dot { width:12px; height:12px; border-radius:50%; border:2px solid rgba(255,255,255,0.4); background:var(--ink-royal); position:relative; z-index:1; transition:all var(--dur-base) var(--ease-out); }
        .proc2__row.is-done .proc2__dot { background:rgba(255,255,255,0.5); border-color:rgba(255,255,255,0.5); }
        .proc2__n { font-family:var(--font-display); font-weight:800; font-size:12px; letter-spacing:0.12em; color:var(--mmc-yellow); }
        .proc2__t { font-family:var(--font-display); font-weight:700; font-size:clamp(16px,1.5vw,21px); letter-spacing:-0.015em; }
        .proc2__t em { font-style:normal; color:var(--mmc-yellow); font-size:0.7em; margin-left:8px; }
        .proc2__phase { font-family:var(--font-body); font-size:10px; font-weight:700; letter-spacing:0.14em; text-transform:uppercase; opacity:0.55; }
        .proc2__row:hover button, .proc2__row.is-on button { color:#fff; }
        .proc2__row.is-on .proc2__dot { background:var(--mmc-yellow); border-color:var(--mmc-yellow); box-shadow:0 0 0 5px rgba(255,197,40,0.18); }
        .procdetail { margin-top: 14px; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.16); max-width: 56ch; animation: sysFade 360ms var(--ease-out); }
        @keyframes sysFade { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        .procdetail__head { display: flex; align-items: baseline; gap: 12px; flex-wrap: wrap; margin-bottom: 8px; }
        .procdetail__phase { font-family: var(--font-body); font-size: 10px; font-weight: 800; letter-spacing: 0.16em; text-transform: uppercase; color: var(--mmc-blue-900); background: var(--mmc-yellow); padding: 4px 9px; border-radius: 6px; }
        .procdetail__title { font-family: var(--font-display); font-weight: 700; font-size: clamp(15px,1.3vw,19px); letter-spacing: -0.01em; color: #fff; }
        .procdetail__title em { font-style: normal; font-weight: 700; font-size: 0.7em; letter-spacing: 0.04em; color: var(--mmc-yellow); margin-left: 4px; }
        .procdetail__desc { font-family: var(--font-body); font-size: clamp(14px,1.05vw,16px); line-height: 1.55; color: rgba(255,255,255,0.76); margin: 0 0 12px; }
        .procdetail__out-lbl { display: block; font-family: var(--font-body); font-size: 10px; font-weight: 800; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(255,255,255,0.5); margin-bottom: 8px; }
        .procdetail__list { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: 1fr 1fr; gap: 6px 18px; }
        .procdetail__list li { display: flex; align-items: center; gap: 9px; font-family: var(--font-body); font-size: 13px; font-weight: 600; color: rgba(255,255,255,0.88); }
        .procdetail__list li::before { content: ""; flex-shrink: 0; width: 14px; height: 14px; border-radius: 50%; border: 1.5px solid var(--mmc-yellow); background: radial-gradient(circle at 50% 50%, var(--mmc-yellow) 0 36%, transparent 38%); }
        @media (max-width:920px){ .proc2__row button{ padding:7px 6px; } .proc2__phase{ display:none; } .procdetail__list { grid-template-columns: 1fr; } }
      `}</style>
    </section>);

}

/* ============================================================ INDUSTRIES (selectable tile grid)
   The detail row lists the services we run in each world, from
   content/clients.json (_services). No client name sits beside an industry figure. */
function IndustriesV2({ active }) {
  const list = [
  { n: "01", name: "D2C Brands", stat: "₹148Cr+", lbl: "Compounded D2C revenue", mix: "Performance ads, D2C · Performance creative · Amazon · Quick commerce" },
  { n: "02", name: "Healthcare", stat: "8,400+", lbl: "Monthly bookings driven", mix: "Lead generation · Website redesign and development · Performance creative" },
  { n: "03", name: "Real Estate", stat: "₹62Cr", lbl: "Inventory moved · 12mo", mix: "Lead generation · Performance creative · Social media" },
  { n: "04", name: "Education", stat: "92k", lbl: "Qualified leads · last yr", mix: "Website redesign and development · Lead generation · Social media" },
  { n: "05", name: "SaaS", stat: "3.8×", lbl: "Avg. trial → paid lift", mix: "Website redesign and development · Lead generation · Performance creative" },
  { n: "06", name: "Hospitality", stat: "+62%", lbl: "Direct bookings · YoY", mix: "Social media · Performance creative · Lead generation" },
  { n: "07", name: "Startups", stat: "0 → 1", lbl: "Brand, site, system", mix: "Website redesign and development · Performance creative · Social media" }];

  const [i, setI] = React.useState(0);
  const cur = list[i];
  return (
    <section className={"sec sec--light sec--flip sec--dense" + (active ? " is-active" : "")} data-screen-label="07 Industries" data-label="Industries" id="sec-6">
      <div className="sec__media">
        <div className="ken swapstack">
          {list.map((x, idx) =>
          <div key={idx} className={"swapimg " + (idx === i ? "on" : "")}>
              <image-slot id={"home-ind-" + idx} placeholder={"Drop " + x.name + " imagery"} fit="cover" style={{ width: "100%", height: "100%" }}></image-slot>
            </div>
          )}
        </div>
        <span className="media-tag" key={i}><span className="dot"></span>{cur.n} · {cur.name}</span>
      </div>
      <div className="sec__content">
        <span className="eyebrow2 r d1">Industries we build for</span>
        <h2 className="sec__h r d2" style={{ fontSize: "clamp(32px,3.4vw,56px)" }}>
          One thesis,<br /><span className="serif-accent">seven arenas.</span>
        </h2>
        <div className="ind2 r d3">
          {list.map((x, idx) =>
          <button key={x.name} className={"ind2__tile " + (idx === i ? "is-on" : "")} onMouseEnter={() => setI(idx)} onClick={() => setI(idx)}>
              <span className="ind2__n">{x.n}</span>
              <span className="ind2__name">{x.name}</span>
            </button>
          )}
        </div>
        <div className="ind2__detail" key={i}>
          <div className="ind2__stat"><span className="ind2__stat-n">{cur.stat}</span><span className="ind2__stat-l">{cur.lbl}</span></div>
          <div className="ind2__brands">{cur.mix}</div>
        </div>
      </div>
      <style>{`
        .ind2 { display:grid; grid-template-columns:1fr 1fr; gap:8px; max-width:540px; }
        .ind2__tile { display:flex; align-items:center; gap:12px; padding:13px 16px; border:1.5px solid rgba(29,78,216,0.16); border-radius:12px; background:rgba(255,255,255,0.5); color:var(--mmc-text); text-align:left; transition:all var(--dur-base) var(--ease-out); }
        .ind2__tile:hover { border-color:var(--mmc-blue); transform:translateY(-2px);
          position: relative; z-index: 2;
        }
        .ind2__tile.is-on { background:var(--mmc-blue); border-color:var(--mmc-blue); color:#fff; box-shadow:0 14px 30px -16px rgba(29,78,216,0.6); }
        .ind2__n { font-family:var(--font-display); font-weight:800; font-size:12px; letter-spacing:0.1em; color:var(--mmc-yellow-700); }
        .ind2__tile.is-on .ind2__n { color:var(--mmc-yellow); }
        .ind2__name { font-family:var(--font-display); font-weight:700; font-size:clamp(14px,1.2vw,17px); letter-spacing:-0.01em; }
        .ind2__detail { display:flex; align-items:baseline; gap:20px; flex-wrap:wrap; padding-top:14px; border-top:1.5px solid rgba(29,78,216,0.16); margin-top:4px; opacity:1; }
        .ind2__stat { display:flex; flex-direction:column; gap:3px; }
        .ind2__stat-n { font-family:var(--font-display); font-weight:800; font-size:clamp(28px,3vw,44px); letter-spacing:-0.035em; color:var(--mmc-blue); line-height:0.95; }
        .ind2__stat-l { font-family:var(--font-body); font-size:10.5px; font-weight:700; letter-spacing:0.12em; text-transform:uppercase; color:var(--fg-3); }
        .ind2__brands { font-family:var(--font-body); font-size:13px; font-weight:600; color:var(--fg-2); letter-spacing:0.01em; }
        @media (max-width:920px){ .ind2{ grid-template-columns:1fr 1fr; } }
      `}</style>
    </section>);

}

/* ============================================================ FAQ (accordion) */
function FaqV2({ active }) {
  const items = [
  { q: "Performance agency, brand agency, or tech studio?", a: "A full-service growth studio. Five disciplines: design, marketing, technology, content, AI - sit in one pod per client, so a brand never stitches four vendors to compound." },
  { q: "What does a typical engagement look like?", a: "A 6-week strategy sprint, then a 12-month retainer. First 14 days: audit + roadmap. Days 15–28: creative + platform setup. Day 30 on: live media, weekly creative, quarterly resets." },
  { q: "Which brand sizes do you work with?", a: "Brands doing ₹3Cr → ₹150Cr in annual revenue. Below that we recommend a specialist; above it we partner alongside an in-house team rather than replace it." },
  { q: "Do you only work with D2C brands?", a: "No. About 60% of our work is D2C: beauty, food, apparel, home. The rest is healthcare, real estate, SaaS, education and hospitality. The constant is consumer commerce." },
  { q: "Can you guarantee a specific ROAS?", a: "No serious operator can. We guarantee the system: weekly cadence, transparent reporting, senior strategists, and a 30-day exit clause. Median blended ROAS across the book is 8.7×." },
  { q: "How are you different from a freelancer or a holding-company agency?", a: "Freelancers can't run cross-discipline pods. Holding-co agencies can, but bill ₹15L+ and treat sub-₹50Cr brands as small accounts. MMC is built for the middle: senior pods, real ownership." },
  { q: "What platforms and tools do you run?", a: "Meta, Google, Amazon & TikTok Ads, Shopify, Klaviyo, WebEngage, GA4, Razorpay, GTM, Clarity: plus an in-house AI stack for creative drafting and audience research." },
  { q: "Where are you based, and do you work internationally?", a: "Headquartered in Bengaluru. We run brands across India, UAE, UK and the US: about 30% of our current book is non-India revenue." },
  { q: "How fast can you go live?", a: "Two weeks from kickoff to first paid media. Strategy in week 1, creative + platform integration in week 2, live media in week 3. Most agencies need 60 days; we treat onboarding as a sprint." },
  { q: "How do I start?", a: "Book a 30-minute free brand audit. A senior strategist reads your funnel, retention, creative and architecture, then tells you the three highest-ROI fixes first. No pitch, no pressure." }];

  const [open, setOpen] = React.useState(0);
  return (
    <section className={"sec sec--light sec--flip sec--dense" + (active ? " is-active" : "")} data-screen-label="09 FAQ" data-label="FAQ" id="sec-8">
      <div className="sec__media">
        <div className="ken">
          <image-slot id="home-faq" placeholder="Drop a candid studio / founder photo" fit="cover" style={{ width: "100%", height: "100%" }}></image-slot>
        </div>
        <span className="media-tag"><span className="dot"></span>Answers · plainly</span>
      </div>
      <div className="sec__content">
        <span className="eyebrow2 r d1">Answers · 10 questions</span>
        <h2 className="sec__h r d2" style={{ fontSize: "clamp(30px,3vw,48px)" }}>
          Things worth <span className="serif-accent">asking out loud.</span>
        </h2>
        <div className="faq2 r d3">
          {items.map((it, idx) =>
          <div className={"faq2__item " + (open === idx ? "is-open" : "")} key={idx}>
              <button className="faq2__q" onClick={() => setOpen(open === idx ? -1 : idx)}>
                <span>{it.q}</span>
                <span className="faq2__plus" aria-hidden="true"></span>
              </button>
              <div className="faq2__a"><p>{it.a}</p></div>
            </div>
          )}
        </div>
      </div>
      <style>{`
        .faq2 { max-width:600px; border-top:1px solid rgba(29,78,216,0.16); }
        .faq2__item { border-bottom:1px solid rgba(29,78,216,0.16); }
        .faq2__q { width:100%; display:flex; align-items:center; justify-content:space-between; gap:16px; padding:10px 2px; text-align:left; font-family:var(--font-display); font-weight:700; font-size:clamp(13.5px,1.05vw,16px); letter-spacing:-0.01em; color:var(--mmc-text); transition:color var(--dur-base); }
        .faq2__q:hover { color:var(--mmc-blue); }
        .faq2__item.is-open .faq2__q { color:var(--mmc-blue); }
        .faq2__plus { position:relative; width:14px; height:14px; flex-shrink:0; }
        .faq2__plus::before, .faq2__plus::after { content:""; position:absolute; background:currentColor; border-radius:2px; }
        .faq2__plus::before { left:0; top:6px; width:14px; height:2px; }
        .faq2__plus::after { left:6px; top:0; width:2px; height:14px; transition:transform var(--dur-base) var(--ease-out); }
        .faq2__item.is-open .faq2__plus::after { transform:rotate(90deg); opacity:0; }
        .faq2__a { max-height:0; overflow:hidden; transition:max-height var(--dur-slow) var(--ease-out); }
        .faq2__item.is-open .faq2__a { max-height:320px; }
        .faq2__a p { font-family:var(--font-body); font-size:13.5px; line-height:1.6; color:var(--fg-2); margin:0 0 14px; max-width:54ch; }
      `}</style>
    </section>);

}

/* ============================================================ FOOTER (full sitemap) */
function FooterV2({ active }) {
  return (
    <section className={"sec sec--dark sec--footer" + (active ? " is-active" : "")} data-screen-label="11 Footer" data-label="Contact" id="sec-10">
      <div className="foot">
        <div className="foot__brand r d1">
          <img className="foot__logo" src="assets/logo-wy-tight.png" alt="Monday Marketing Company" />
          <span className="foot__tagline">We don't run ads. We build <span className="serif-accent">revenue engines.</span></span>
        </div>
        <nav className="foot__nav r d1" style={{ fontSize: "30px" }}>
          <a href="About.html">About</a>
          <a href="Our Work.html">Work</a>
          <a href="#sec-4">Process</a>
          <a href="Contact.html">Services</a>
          <a href="Contact.html">Contact</a>
          <a href="Insights.html">Blogs</a>
          <a href="#sec-5">Industries</a>
          <a href="Careers.html">Careers</a>
        </nav>

        <div className="foot__cols r d2">
          <div className="foot__col">
            <span className="foot__col-h">Design</span>
            <a href="Contact.html">Brand Identity</a>
            <a href="Service Detail.html">UI / UX Systems</a>
            <a href="Contact.html">Packaging Design</a>
            <a href="Contact.html">Brand Strategy</a>
          </div>
          <div className="foot__col">
            <span className="foot__col-h">Marketing</span>
            <a href="Contact.html">Performance Marketing</a>
            <a href="Contact.html">SEO Services</a>
            <a href="Contact.html">Retention Marketing</a>
            <a href="Contact.html">CRO for Website</a>
            <a href="Contact.html">Quick Commerce</a>
          </div>
          <div className="foot__col">
            <span className="foot__col-h">Technology</span>
            <a href="Contact.html">Shopify Development</a>
            <a href="Contact.html">Web Development</a>
            <a href="Contact.html">Mobile App Development</a>
            <a href="Contact.html">Ecommerce Management</a>
          </div>
          <div className="foot__col">
            <span className="foot__col-h">Content</span>
            <a href="Contact.html">UGC Content</a>
            <a href="Contact.html">Social Media Creatives</a>
            <a href="Contact.html">Influencer Marketing</a>
            <a href="Service Detail.html">Video Production</a>
          </div>
          <div className="foot__col">
            <span className="foot__col-h">AI</span>
            <a href="Contact.html">AI Innovation Strategy</a>
            <a href="Contact.html">AI Creative Workflows</a>
            <a href="Contact.html">AI Audience Research</a>
            <a href="Contact.html">AI Automation</a>
          </div>
        </div>

        <div className="foot__block r d3">
          <span className="foot__block-h">Industries</span>
          <div className="foot__inline">
            {["D2C", "Healthcare", "Real Estate", "Education", "SaaS", "Hospitality", "Startups", "BFSI", "E-Commerce"].map((x, idx) =>
            <React.Fragment key={x}>
                {idx > 0 && <span className="foot__sep">|</span>}
                <a href="#sec-5">{x}</a>
              </React.Fragment>
            )}
          </div>
        </div>

        <div className="foot__block r d4">
          <span className="foot__block-h">Locations</span>
          <div className="foot__locs">
            <span className="foot__loc"><span className="foot__flag">🇮🇳</span>India</span>
            <span className="foot__loc"><span className="foot__flag">🇦🇪</span>UAE</span>
            <span className="foot__loc"><span className="foot__flag">🇬🇧</span>UK</span>
            <span className="foot__loc"><span className="foot__flag">🇺🇸</span>USA</span>
          </div>
        </div>

        <div className="foot__bar r d5">
          <span className="foot__copy">
            © {new Date().getFullYear()} Monday Marketing Company. All rights reserved.
            <a href="Privacy.html">Privacy</a> · <a href="Terms.html">Terms</a>
          </span>
          <div className="foot__social">
            <a href="#" aria-label="LinkedIn"><svg viewBox="0 0 24 24" width="19" height="19" fill="currentColor"><path d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0zM.25 8.25h4.5V24h-4.5V8.25zM8.5 8.25H12.8v2.15h.06c.6-1.13 2.07-2.32 4.26-2.32 4.56 0 5.4 3 5.4 6.9V24h-4.5v-7.1c0-1.7-.03-3.88-2.36-3.88-2.36 0-2.72 1.85-2.72 3.76V24H8.5V8.25z" /></svg></a>
            <a href="#" aria-label="Instagram"><svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5.5" /><circle cx="12" cy="12" r="4.5" /><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" /></svg></a>
            <a href="#" aria-label="YouTube"><svg viewBox="0 0 24 24" width="19" height="19" fill="currentColor"><path d="M23.5 6.5a3 3 0 0 0-2.1-2.1C19.5 3.9 12 3.9 12 3.9s-7.5 0-9.4.5A3 3 0 0 0 .5 6.5 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.5 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.5zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z" /></svg></a>
            <a href="#" aria-label="X"><svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor"><path d="M18.2 2.2h3.3l-7.2 8.3L23 21.8h-6.6l-5.2-6.8-6 6.8H1.9l7.7-8.8L1.3 2.2H8l4.7 6.2 5.5-6.2zm-1.2 17.6h1.8L7.1 4.1H5.2L17 19.8z" /></svg></a>
            <a href="#" aria-label="Facebook"><svg viewBox="0 0 24 24" width="19" height="19" fill="currentColor"><path d="M24 12a12 12 0 1 0-13.9 11.9v-8.4H7v-3.5h3.1V9.4c0-3 1.8-4.7 4.5-4.7 1.3 0 2.7.24 2.7.24v3h-1.5c-1.5 0-2 .93-2 1.9v2.2h3.4l-.55 3.5h-2.85v8.4A12 12 0 0 0 24 12z" /></svg></a>
            <a href="#" aria-label="Behance"><svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M8.2 8.7c.5 0 1 0 1.4.13.42.1.77.27 1.07.5.3.22.52.52.68.9.15.36.23.8.23 1.32 0 .57-.13 1.04-.4 1.42-.25.38-.64.7-1.15.94.7.2 1.22.55 1.57 1.05.34.5.5 1.1.5 1.8 0 .57-.1 1.05-.32 1.46-.22.4-.5.74-.88 1-.36.26-.78.45-1.26.57-.47.12-.95.18-1.45.18H2V8.7h6.2zm-.37 4.04c.4 0 .74-.1 1-.3.26-.18.38-.5.38-.92 0-.24-.04-.43-.13-.58a.94.94 0 0 0-.35-.35 1.43 1.43 0 0 0-.5-.18 3.2 3.2 0 0 0-.6-.05H4.6v2.38h3.23zm.18 4.25c.22 0 .43-.02.63-.06.2-.04.37-.12.52-.22a1.1 1.1 0 0 0 .36-.42c.1-.18.13-.4.13-.68 0-.54-.15-.92-.45-1.15-.3-.22-.7-.33-1.2-.33H4.6v2.86h3.4zM16.1 16.9c.36.35.88.53 1.55.53.48 0 .9-.12 1.25-.36.34-.24.55-.5.63-.76h2.16c-.35 1.08-.88 1.85-1.6 2.32-.72.46-1.6.7-2.62.7-.7 0-1.35-.12-1.92-.34a4 4 0 0 1-1.44-.97 4.4 4.4 0 0 1-.9-1.5 5.5 5.5 0 0 1-.32-1.92c0-.68.1-1.3.33-1.9a4.4 4.4 0 0 1 2.36-2.5 4.6 4.6 0 0 1 1.9-.37c.78 0 1.46.15 2.04.45.58.3 1.05.7 1.42 1.22.37.5.63 1.08.8 1.74.15.65.2 1.33.16 2.05h-6.4c0 .7.24 1.3.6 1.65zm2.7-4.5c-.3-.3-.72-.47-1.3-.47-.38 0-.7.06-.95.2-.25.12-.45.28-.6.47-.16.2-.26.4-.32.6-.06.22-.1.4-.1.57h3.96c-.06-.62-.27-1.07-.7-1.37zM15 7.3h4.94v1.2H15V7.3z" /></svg></a>
          </div>
        </div>
      </div>
      <style>{`
        .sec--footer { display:block; height:auto; min-height:100vh; }
        .foot { max-width:var(--container-max); margin:0 auto; min-height:100vh; padding:calc(var(--nav-h) + clamp(40px,6vw,88px)) clamp(28px,5vw,72px) clamp(32px,4vw,60px); display:flex; flex-direction:column; justify-content:center; gap:clamp(26px,3.4vw,48px); }
        .foot__brand { display:flex; align-items:center; gap:clamp(18px,2.4vw,32px); flex-wrap:wrap; padding-bottom:clamp(22px,3vw,38px); border-bottom:1px solid rgba(255,255,255,0.14); }
        .foot__logo { height:clamp(44px,4.4vw,64px); width:auto; display:block; }
        .foot__tagline { font-family:var(--font-display); font-weight:700; font-size:clamp(16px,1.5vw,22px); letter-spacing:-0.015em; color:rgba(255,255,255,0.72); }
        .foot__tagline .serif-accent { font-family:var(--font-serif); font-style:italic; font-weight:600; color:var(--mmc-yellow); }
        .foot__nav { display:flex; flex-wrap:wrap; gap:clamp(20px,3vw,56px); padding-bottom:clamp(22px,3vw,38px); border-bottom:1px solid rgba(255,255,255,0.14); }
        .foot__nav a { font-family:var(--font-display); font-weight:700; font-size:clamp(22px,2.3vw,38px); letter-spacing:-0.02em; color:rgba(255,255,255,0.5); transition:color var(--dur-base) var(--ease-out); }
        .foot__nav a:hover { color:#fff; }
        .foot__cols { display:grid; grid-template-columns:repeat(5,1fr); gap:clamp(18px,2vw,36px); padding-bottom:clamp(26px,3.2vw,44px); border-bottom:1px solid rgba(255,255,255,0.14); }
        .foot__col { display:flex; flex-direction:column; gap:12px; }
        .foot__col-h { font-family:var(--font-display); font-weight:700; font-size:clamp(17px,1.4vw,22px); letter-spacing:-0.01em; color:#fff; margin-bottom:6px; }
        .foot__col a { font-family:var(--font-body); font-size:clamp(13px,0.95vw,15px); color:rgba(255,255,255,0.58); transition:color var(--dur-quick) var(--ease-out); width:fit-content; }
        .foot__col a:hover { color:var(--mmc-yellow); }
        .foot__block { display:flex; flex-direction:column; gap:16px; padding-bottom:clamp(22px,3vw,38px); border-bottom:1px solid rgba(255,255,255,0.14); }
        .foot__block-h { font-family:var(--font-display); font-weight:700; font-size:clamp(18px,1.5vw,24px); letter-spacing:-0.01em; color:#fff; }
        .foot__inline { display:flex; flex-wrap:wrap; align-items:center; gap:9px 14px; }
        .foot__inline a { font-family:var(--font-body); font-size:14px; color:rgba(255,255,255,0.58); transition:color var(--dur-quick) var(--ease-out); }
        .foot__inline a:hover { color:#fff; }
        .foot__sep { color:rgba(255,255,255,0.2); font-size:13px; }
        .foot__locs { display:flex; flex-wrap:wrap; gap:14px 30px; }
        .foot__loc { display:inline-flex; align-items:center; gap:10px; font-family:var(--font-body); font-size:16px; font-weight:600; color:#fff; }
        .foot__flag { font-size:21px; line-height:1; }
        .foot__bar { display:flex; align-items:center; justify-content:space-between; gap:18px; flex-wrap:wrap; padding-top:4px; }
        .foot__copy { font-family:var(--font-body); font-size:12.5px; color:rgba(255,255,255,0.5); letter-spacing:0.01em; }
        .foot__copy a { color:rgba(255,255,255,0.72); margin-left:4px; }
        .foot__copy a:hover { color:var(--mmc-yellow); }
        .foot__social { display:flex; align-items:center; gap:20px; }
        .foot__social a { color:rgba(255,255,255,0.6); display:inline-flex; transition:color var(--dur-quick) var(--ease-out), transform var(--dur-quick) var(--ease-out); }
        .foot__social a:hover { color:var(--mmc-yellow); transform:translateY(-2px); }
        @media (max-width:1080px){ .foot__cols{ grid-template-columns:repeat(3,1fr); row-gap:28px; } }
        @media (max-width:640px){ .foot__cols{ grid-template-columns:1fr 1fr; } .foot__nav a{ font-size:22px; } }
      `}</style>
    </section>);

}

Object.assign(window, { ProcessV2, IndustriesV2, FaqV2, FooterV2 });
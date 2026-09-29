/* performance/pm-sections.jsx: sections of the Performance marketing page.

   Copy comes from the copy deck after the joint review. Where a fact is not
   confirmed by MMC the line is either neutral (says how MMC works, claims no
   result) or carries a <Confirm> note, which only shows with ?review in the
   URL. Nothing on this page is a client result: the only figures are the
   labelled illustration in the explainer.

   Client tags come from content/clients.json (perf, amazon, quickcom). */

const { useState: pmUseState, useEffect: pmUseEffect, useRef: pmUseRef } = React;

const PM_AUDIT = "Get a paid-media audit";
const bookCall = (src) => (e) => window.mmcBookCall(src, e);

/* Reviewer-only note. Not rendered at all unless the page is opened with ?review,
   so the pre-rendered HTML that search engines read never contains an internal note. */
const PM_REVIEW = /[?&]review\b/.test(window.location.search);
function Confirm({ children }) {
  return PM_REVIEW ? <span className="pm-confirm">{children}</span> : null;
}

/* Generated art from Higgsfield lives in assets/pm-v2/. Decorative, so alt is empty.
   If a file is absent the <img> removes itself and the layout collapses around it. */
const PM_V3 = ["channel-meta.jpg", "channel-google.jpg", "channel-amazon.jpg", "channel-quickcommerce.jpg", "process.jpg"];
function PmImg({ name, ratio, className = "", eager, pos }) {
  return (
    <img className={"pm-img " + className} src={"assets/" + (name.includes("/") ? "" : PM_V3.includes(name) ? "pm-v3/" : "pm-v2/") + name} alt="" decoding="async"
         loading={eager ? "eager" : "lazy"} style={{ aspectRatio: ratio, objectPosition: pos || "50% 50%" }}
         onError={(e) => e.currentTarget.remove()} />
  );
}

function Arrow() { return <span className="n-btn__arr" aria-hidden="true" />; }

/* ── 1 · Hero: rounded box + watermark kept, content re-ideated ── */
const PM_HERO_TILES = [
  { img: "channel-meta.jpg", pos: "50% 38%", label: "Meta", note: "Reels" },
  { img: "channel-google.jpg", pos: "60% 50%", label: "Google", note: "Search + Shopping" },
  { img: "channel-amazon.jpg", pos: "50% 50%", label: "Amazon", note: "Sponsored ads" },
  { img: "channel-quickcommerce.jpg", pos: "42% 50%", label: "Quick commerce", note: "10-minute delivery" },
];
function PmHero() {
  const [enter, setEnter] = pmUseState(false);
  pmUseEffect(() => { requestAnimationFrame(() => requestAnimationFrame(() => setEnter(true))); }, []);
  const clip = (x = "") => "clip-reveal " + (enter ? "in " : "") + x;
  const reveal = (x = "") => "reveal " + (enter ? "in " : "") + x;
  return (
    <section className="page-hero pm-hero" id="top" data-wm="Services">
      <span className="page-hero__wm" aria-hidden="true">Services</span>
      <div className="container pm-hero__inner">
        <div className="pmh__grid">
          <div className="pmh__l">
            <div className={"eyebrow " + (enter ? "in" : "")}><span>● Performance marketing</span></div>
            <h1 className="pmh__h">
              <span className={clip("d1")}><span>Performance marketing</span></span>
              <span className={clip("d2")}><span>for <span className="em-serif">D2C</span> brands</span></span>
              <span className={clip("d3")}><span>in India.</span></span>
            </h1>
            <p className={reveal("d4 pmh__sub")}>
              Paid media run against profit, not platform screenshots. Monday Marketing Company (MMC)
              is an India-based performance marketing agency for D2C brands, with lead generation for B2B and education.
            </p>
            <div className={reveal("d5 pmh__actions")}>
              <button className="btn btn--primary glow-btn" onClick={bookCall("pm-hero")}>
                <span className="glow-btn__glow" aria-hidden="true"></span>
                <span className="glow-btn__inner">{PM_AUDIT}<span className="arrow"></span></span>
              </button>
              <a className="btn btn--link" href="#proof">See the work<span className="arrow"></span></a>
            </div>
            <ul className={reveal("d6 pmh__chips")} aria-label="Channels we run">
              {PM_HERO_TILES.map((t) => <li key={t.label}>{t.label}</li>)}
            </ul>
          </div>

          <div className={"pmh__r " + (enter ? "in" : "")}>
            <div className="pmh__mosaic">
              {PM_HERO_TILES.map((t, k) => (
                <figure className={"pmh__tile pmh__tile--" + (k + 1)} key={t.label}>
                  <PmImg name={t.img} ratio="1 / 1.05" className="pmh__img" pos={t.pos} eager={k < 2} />
                  <figcaption><b>{t.label}</b><span>{t.note}</span></figcaption>
                </figure>
              ))}
            </div>
            <a className="pmh__check" href="#margin" aria-label="Illustration: a 3x ROAS order that loses 33 rupees. See the maths.">
              <span className="pmh__check-k">The platform says</span>
              <span className="pmh__check-v">3.0x ROAS</span>
              <span className="pmh__check-rule" aria-hidden="true"></span>
              <span className="pmh__check-k">The order keeps</span>
              <span className="pmh__check-v pmh__check-v--loss">−₹33</span>
              <span className="pmh__check-foot">Illustration: one ₹1,000 order, ₹300 contribution. <u>See the maths ↓</u></span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 2 · The short answer ─────────────────────────────────────── */
function PmAnswer() {
  /* The shared "In short" block (assets/answer.jsx). */
  return (
    <window.MmcAnswer
      lead="A performance marketing agency buys and manages paid media for a brand, then answers for what it returns."
      hl="answers for what it returns"
      who="MMC runs the account structure, the creative and the reporting as one system."
      points={[
        { icon: "grid", title: "Four channels", text: "Meta, Google, Amazon and quick commerce." },
        { icon: "layers", title: "One system", text: "Account structure, creative and reporting are run together." },
        { icon: "gauge", title: "Contribution margin", text: "The measure is the profit left after variable costs." }
      ]}
      image="au/look-tracking.jpg"
      chip="Judged on contribution margin"
      cta={{ label: PM_AUDIT, onClick: bookCall("pm-answer") }} />
  );
}

/* ── 3 · Contribution margin vs ROAS ──────────────────────────────
   The diagram is arithmetic on a stated example, not data: a ₹1,000 order
   that keeps ₹300 after product, shipping, fees and returns. Ad spend needed
   to earn that order at a given ROAS is 1,000 / ROAS. Break-even is where ad
   spend equals contribution (3.33x). */
const PM_ORDER = 1000, PM_CONTRIB = 300;
const PM_ROAS = [
  { v: 3, l: "3x ROAS" },
  { v: 1000 / 300, l: "3.3x ROAS" },
  { v: 4, l: "4x ROAS" },
];

function PmMargin() {
  const [i, setI] = pmUseState(0);
  const roas = PM_ROAS[i].v;
  const media = PM_ORDER / roas;
  const left = Math.round(PM_CONTRIB - media);
  const state = Math.abs(left) < 1 ? "even" : left < 0 ? "loss" : "gain";
  const rupee = (n) => "₹" + Math.abs(Math.round(n)).toLocaleString("en-IN");
  const roasTxt = (Math.round(roas * 100) / 100).toString().replace(/(\.\d)0$/, "$1");
  const verdict = state === "loss" ? "Loses " + rupee(-left) + " on this order"
    : state === "gain" ? "Keeps " + rupee(left) + " on this order" : "Break-even: keeps ₹0";
  return (
    <section className="n-band n-band--ink pm-band" id="margin">
      <div className="n-wrap">
        <header className="pmm__head n-rise">
          <span className="n-eyebrow">Contribution margin vs ROAS</span>
          <h2 className="n-h2">A 3x ROAS can still <span className="n-serif">lose money.</span></h2>
          <p>
            ROAS counts revenue, not what that revenue cost to deliver. Product, shipping, fees and returns
            come out first. Switch the ROAS below and watch the same order flip from loss to profit.
          </p>
        </header>

        <div className="pmm__controls n-rise d1">
          <span className="pmm__pick">Pick a ROAS</span>
          <div className="pm-diagram__toggle" role="group" aria-label="Choose a ROAS">
            {PM_ROAS.map((r, k) => (
              <button key={r.l} aria-pressed={k === i} onClick={() => setI(k)}>{r.l}</button>
            ))}
          </div>
          <span className="pmm__tag">Illustration, not a client result · one ₹1,000 order</span>
        </div>

        <div className="pmm__cards n-rise d2" aria-live="polite">
          <article className="pmm__card pmm__card--dash">
            <div className="pmm__card-top"><span>What the ad platform shows</span><i className="pmm__ok">● Looks healthy</i></div>
            <div className="pmm__big">{roasTxt}<span className="pmm__x">x</span> <small>ROAS</small></div>
            <dl>
              <div><dt>Revenue</dt><dd>{rupee(PM_ORDER)}</dd></div>
              <div><dt>Ad spend</dt><dd>{rupee(media)}</dd></div>
            </dl>
            <p className="pmm__card-foot">Revenue ÷ ad spend. Nothing about cost to deliver.</p>
          </article>

          <span className="pmm__vs" aria-hidden="true">vs</span>

          <article className={"pmm__card pmm__card--pl is-" + state}>
            <div className="pmm__card-top"><span>What your P&amp;L shows</span><i className={"pmm__pill is-" + state}>{verdict}</i></div>
            <dl className="pmm__ledger">
              <div><dt>Order value</dt><dd>{rupee(PM_ORDER)}</dd></div>
              <div><dt>Product, shipping, fees, returns</dt><dd>−{rupee(PM_ORDER - PM_CONTRIB)}</dd></div>
              <div className="pmm__sub"><dt>Contribution margin</dt><dd>{rupee(PM_CONTRIB)}</dd></div>
              <div><dt>Ad spend</dt><dd>−{rupee(media)}</dd></div>
              <div className="pmm__total"><dt>Left on the order</dt><dd>{state === "loss" ? "−" + rupee(-left) : state === "gain" ? "+" + rupee(left) : "₹0"}</dd></div>
            </dl>
          </article>
        </div>

        <ol className="pmm__formulas n-rise d3">
          <li><b>ROAS</b><span>revenue ÷ ad spend</span></li>
          <li><b>Contribution margin</b><span>order value − product, shipping, fees, returns</span></li>
          <li><b>Break-even ROAS</b><span>revenue ÷ contribution = <em>3.33x</em> here. Below it, you pay for revenue.</span></li>
        </ol>

        <div className="pmm__cta n-rise d3">
          <a className="n-btn n-btn--sun" href="breakeven-roas-calculator.html">Run your break-even ROAS<Arrow /></a>
          <span className="pm-margin__more">Also free:</span>
          <a className="pm-textlink pm-textlink--quiet" href="funnel-roas-calculator.html">Funnel ROAS</a>
          <a className="pm-textlink pm-textlink--quiet" href="unit-economics-calculator.html">Unit economics</a>
        </div>
        <p className="pm-diagram__note">Assumes ₹700 of the ₹1,000 goes to product, shipping, payment fees and returns. Your cost sheet sets your real number.</p>
      </div>
    </section>
  );
}

/* ── 3b · Same order, three claims ────────────────────────────────
   Illustration: one customer order that several platforms each report under their
   own attribution window. Not client data. */
const PM_CLAIMS = [
  { n: "Meta", mark: "assets/platforms/meta.svg", how: "Saw the Reel, bought within 7 days of clicking" },
  { n: "Google", mark: "assets/platforms/google.svg", how: "Searched the brand name, then bought" },
  { n: "Amazon", mark: "assets/platforms/amazon.svg", how: "Sponsored ad on the way to the same purchase" },
];
function PmClaims() {
  return (
    <section className="n-band n-band--white pm-band" id="claims">
      <div className="n-wrap">
        <header className="pm-head n-rise">
          <span className="n-eyebrow">Attribution</span>
          <h2 className="n-h2">One order. <span className="n-serif">Three dashboards</span> claim it.</h2>
          <p className="n-lede">A customer sees a Reel, searches your brand and buys. Each platform counts the sale under its own rules, so the dashboards add up to more revenue than you banked.</p>
        </header>
        <figure className="pmc n-rise d1" style={{ margin: 0 }} aria-label="Illustration: three platform dashboards each report the same ₹1,000 order, while the bank shows ₹1,000 once">
          <div className="pmc__claims">
            {PM_CLAIMS.map((c) => (
              <article className="pmc__claim" key={c.n}>
                <div className="pmc__who"><img src={c.mark} alt="" width="28" height="28" loading="lazy" /><b>{c.n} reports</b></div>
                <div className="pmc__val">₹1,000</div>
                <div className="pmc__unit">1 purchase</div>
                <p>{c.how}</p>
              </article>
            ))}
          </div>
          <div className="pmc__join" aria-hidden="true"><span></span><span></span><span></span></div>
          <div className="pmc__sum">
            <div className="pmc__sum-l"><span>Dashboards add up to</span><b className="pmc__over">₹3,000</b></div>
            <span className="pmc__ne" aria-hidden="true">≠</span>
            <div className="pmc__sum-r"><span>Actually in your bank</span><b>₹1,000</b></div>
          </div>
          <figcaption className="pmc__note">Illustration, not a client result. One order, one customer, three attribution windows.</figcaption>
        </figure>
        <div className="pmc__how n-rise d2">
          <b>How we handle it</b>
          <p>We judge the account on the total: revenue in your store and bank against total ad spend. Platform numbers are used to compare campaigns inside one platform, not to add up the business.</p>
        </div>
      </div>
    </section>
  );
}

/* ── 3c · First order loses, repeat pays ───────────────────────────
   Stated example: ₹400 to acquire a customer, ₹300 contribution per order,
   repeat orders carry no extra ad cost (a simplification). Cumulative profit
   after N orders = 300N − 400. Not client data. */
const PM_CAC = 400, PM_PER_ORDER = 300, PM_ORDERS = [1, 2, 3, 4];
function PmPayback() {
  const [n, setN] = pmUseState(1);
  const cum = (k) => PM_PER_ORDER * k - PM_CAC;
  const rupee = (v) => (v < 0 ? "−" : v > 0 ? "+" : "") + "₹" + Math.abs(v).toLocaleString("en-IN");
  const MIN = -160, MAX = 860, H = 300;
  const y = (v) => ((MAX - v) / (MAX - MIN)) * H;
  const zero = y(0);
  const now = cum(n);
  return (
    <section className="n-band n-band--paper pm-band" id="payback">
      <div className="n-wrap">
        <div className="pmp">
          <div className="pmp__copy n-rise">
            <span className="n-eyebrow">Payback</span>
            <h2 className="n-h2" style={{ margin: "18px 0 22px" }}>The first order loses. <span className="n-serif">The repeat pays.</span></h2>
            <p>A ₹400 customer who buys once for ₹1,000 is a <b>2.5x ROAS</b>: below break-even, so most dashboards call it a failure. If that customer comes back, the same ad spend turns into profit.</p>
            <p>So for brands with repeat buyers we judge acquisition on how fast a customer pays back, not on the first order alone.</p>
            <div className="pmp__pick" role="group" aria-label="Orders per customer">
              <span>Orders per customer</span>
              {PM_ORDERS.map((k) => (
                <button key={k} aria-pressed={k === n} onClick={() => setN(k)}>{k}</button>
              ))}
            </div>
            <p className="pmp__assume">Assumes ₹400 to acquire a customer, ₹300 contribution per order (30% of ₹1,000), and no extra ad spend on repeat orders. Illustration, not a client result. Your repeat rate sets your real payback.</p>
          </div>
          <figure className="pmp__chart n-rise d1" style={{ margin: 0 }} aria-label="Cumulative profit per customer by number of orders" aria-live="polite">
            <div className="pmp__readout">
              <span>Profit per customer after {n} order{n > 1 ? "s" : ""}</span>
              <b className={now < 0 ? "is-loss" : "is-gain"}>{rupee(now)}</b>
              <i className={now < 0 ? "is-loss" : "is-gain"}>{now < 0 ? "Not paid back yet" : "Paid back by order " + PM_ORDERS.find((k) => cum(k) >= 0)}</i>
            </div>
            <div className="pmp__plot" style={{ height: H }}>
              <div className="pmp__zero" style={{ top: zero }}><span>₹0 · paid back</span></div>
              {PM_ORDERS.map((k) => {
                const v = cum(k), on = k <= n;
                const top = v >= 0 ? y(v) : zero, h = Math.abs(y(v) - zero);
                return (
                  <div className={"pmp__col" + (on ? " is-on" : "")} key={k}>
                    <div className={"pmp__bar " + (v < 0 ? "is-loss" : "is-gain")} style={{ top, height: Math.max(h, 2) }} />
                    <span className="pmp__val" style={{ top: v >= 0 ? y(v) - 24 : zero + h + 6 }}>{rupee(v)}</span>
                    <span className="pmp__lbl">Order {k}</span>
                  </div>
                );
              })}
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
}

/* ── 4 · Channels ─────────────────────────────────────────────── */
const PM_CHANNELS = [
  {
    id: "meta", pos: "50% 40%", img: "channel-meta.jpg", name: "Meta", mark: "assets/platforms/meta.svg", href: "meta-ads.html", link: "Meta Ads, in detail",
    rows: [
      ["Structure", "Prospecting, retargeting and conversion built as one funnel."],
      ["Creative", "New angles tested against a single brand thesis."],
      ["Measurement", "Server-side events checked against GA4 and your store data."],
    ],
    note: "Confirm the server-side events and GA4 cross-check are still how MMC works; the wording comes from the existing Meta page.",
  },
  {
    id: "google", pos: "50% 55%", img: "channel-google.jpg", name: "Google", mark: "assets/platforms/google.svg", href: "google-ads.html", link: "Google Ads, in detail",
    rows: [
      ["Structure", "Search and shopping split by intent, with brand search kept separate."],
      ["Creative", "Feeds, ad copy and landing pages written for the query."],
      ["Measurement", "Judged on contribution, not on the conversions Google reports."],
    ],
    note: "No Google client is recorded. Confirm MMC's Google offer and sub-channels (YouTube, Performance Max, Demand Gen) before this goes live.",
  },
  {
    id: "amazon", pos: "50% 50%", img: "channel-amazon.jpg", name: "Amazon", mark: "assets/platforms/amazon.svg", href: "amazon-ads.html", link: "Amazon Ads, in detail", tag: "We run this for The Growing Giraffe",
    rows: [
      ["Structure", "Sponsored ads sit inside the wider account budget."],
      ["Creative", "Listing content and A+ built alongside the ads."],
      ["Measurement", "Read against total sales, not only ad-attributed sales."],
    ],
    note: "Drafted from general practice. Only The Growing Giraffe is recorded for Amazon; the team should approve these lines.",
  },
  {
    id: "qc", pos: "50% 55%", img: "channel-quickcommerce.jpg", name: "Quick commerce", mark: null, href: "quick-commerce-ads.html", link: "Quick commerce ads, in detail", tag: "We run this for The Growing Giraffe",
    rows: [
      ["Structure", "Platform ads planned with availability and stock."],
      ["Creative", "Tiles and listings made for a scroll of seconds."],
      ["Measurement", "Tracked at blended level, since platform data is thin."],
    ],
    note: "Drafted from general practice. Only The Growing Giraffe is recorded for quick commerce; the team should approve these lines.",
  },
];

function PmChannels() {
  return (
    <section className="n-band n-band--white pm-band" id="channels">
      <div className="n-wrap">
        <div className="pm-head n-rise">
          <span className="n-eyebrow">What we run</span>
          <h2 className="n-h2">Four channels, one <span className="n-serif">account structure.</span></h2>
          <p className="n-lede">Most brands buy these from separate vendors. Here they share a budget, a creative thesis and one definition of a good result.</p>
        </div>
        <div className="pm-channels">
          {PM_CHANNELS.map((c, k) => (
            <article className={"pm-ch n-rise d" + ((k % 2) + 1)} key={c.id}>
              <PmImg name={c.img} ratio="16 / 10" className="pm-ch__img" pos={c.pos} />
              <div className="pm-ch__top">
                <div className="pm-ch__mark">
                  {c.mark ? <img src={c.mark} alt="" loading="lazy" width="32" height="32" /> : (
                    <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M18 3 7 18h7l-2 11 11-15h-7z" fill="#0B1020" /></svg>
                  )}
                  <h3 className="pm-ch__name">{c.name}</h3>
                </div>
                {c.tag && <span className="pm-ch__tag">{c.tag}</span>}
              </div>
              <dl className="pm-ch__list">
                {c.rows.map(([k2, v]) => (<div key={k2}><dt>{k2}</dt><dd>{v}</dd></div>))}
              </dl>
              {c.href
                ? <a className="pm-textlink" href={c.href}>{c.link}<Arrow /></a>
                : <button className="pm-textlink" onClick={bookCall("pm-ch-" + c.id)}>Talk to us about {c.name}<Arrow /></button>}
              <Confirm>{c.note}</Confirm>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 5 · Process rail ─────────────────────────────────────────── */
const PM_STEPS = [
  ["Audit", "What your accounts and unit economics say today."],
  ["Structure", "Campaigns and budgets set against contribution."],
  ["Creative", "Angles briefed, made and tested."],
  ["Scale", "Budget moves to what clears break-even."],
  ["Report", "Performance shown as contribution, not platform ROAS."],
];
function PmProcess() {
  return (
    <section className="n-band n-band--paper pm-band" id="process">
      <div className="n-wrap">
        <div className="pm-head n-rise">
          <span className="n-eyebrow">How it works</span>
          <h2 className="n-h2">The plan has to survive <span className="n-serif">the maths.</span></h2>
        </div>
        <PmImg name="process.jpg" ratio="21 / 9" className="pm-process__img" pos="50% 58%" />
        <div className="pm-rail">
          {PM_STEPS.map(([t, d], k) => (
            <div className={"pm-step n-rise d" + Math.min(4, k + 1)} key={t}>
              <span className="pm-step__n">{k + 1}</span>
              <div><span className="pm-step__t">{t}</span><span className="pm-step__d">{d}</span></div>
            </div>
          ))}
        </div>
        <Confirm>Timings are left out on purpose. Add a week-by-week timeline only once MMC confirms it.</Confirm>
      </div>
    </section>
  );
}

/* ── 6 · Who it's for ─────────────────────────────────────────── */
function PmWho() {
  return (
    <section className="n-band n-band--white pm-band" id="who">
      <div className="n-wrap">
        <div className="pm-who">
          <div className="pm-who__main n-rise">
            <div className="pm-who__text">
              <span className="pm-who__k">Who this is for</span>
              <h2 className="n-h2 pm-who__h" style={{ marginBottom: 24 }}>D2C brands that know their margins, <span className="n-serif">or want to.</span></h2>
              <p>If you sell direct online and want ad spend judged on profit, this is built for you.</p>
              <p>We are not for everyone. If ROAS alone is the target, we will say so early.</p>
            </div>
            <PmImg name="d2c/packing.jpg" ratio="4 / 3" className="pm-who__img" pos="50% 50%" />
          </div>
          <div className="pm-who__side n-rise d2">
            <div className="pm-who__pair">
              <PmImg name="shared/b2b.jpg" ratio="4 / 3" className="pm-who__img2" pos="50% 50%" />
              <PmImg name="shared/education.jpg" ratio="4 / 3" className="pm-who__img2" pos="50% 50%" />
            </div>
            <span className="pm-who__k">B2B or education?</span>
            <p>We also run paid media as lead generation for B2B companies and educational institutes, where the goal is qualified leads and enrolments, not baskets.</p>
            <a className="pm-textlink" href="b2b.html">B2B companies<Arrow /></a>
            <a className="pm-textlink" href="education.html">Education brands<Arrow /></a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 7 · Proof: the homepage logo wall (same markup, filtered) ── */
/* Brands tagged perf in content/clients.json. Service tags only, no figures. */
const PM_PROOF = [
  { id: "lepure", svc: ["Performance", "Web", "Creative", "Social"] },
  { id: "giraffe", svc: ["Performance", "CRO", "Creative", "Amazon", "Quick commerce"] },
  { id: "mittiy", svc: ["Performance", "CRO", "Creative"] },
  { id: "awwbaby", svc: ["Performance", "Web", "Creative"] },
  { id: "sprnt", svc: ["Performance", "Web", "Creative", "Social"] },
  { id: "oosh", svc: ["Performance", "Web", "Creative"] },
];
function pmTilt(key) {
  let h = 0;
  for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) | 0;
  h = Math.abs(h);
  return ((h >> 5) % 2 ? "-" : "") + (5 + (h % 21) / 10).toFixed(1) + "deg";
}
function PmProof() {
  const logos = window.MMC_CLIENT_LOGOS || [];
  const byId = Object.fromEntries(logos.map((l) => [l.id, l]));
  return (
    <section className="n-band n-band--paper pm-band" id="proof">
      <div className="n-wrap">
        <div className="pm-head n-rise" style={{ marginBottom: 0 }}>
          <span className="n-eyebrow">Proof</span>
          <h2 className="n-h2">A few of the brands we run paid media <span className="n-serif">for.</span></h2>
          <p className="n-lede">Hover any one to see the work.</p>
        </div>
        <div className="n-wall pm-wall">
          {PM_PROOF.map((p) => {
            const c = byId[p.id];
            if (!c) return null;
            return (
              <div className="pm-wall__item" key={p.id}>
                <span className="n-wall__cell" title={c.name} style={{ "--n-tilt": pmTilt(p.id) }}>
                  <span className="n-wall__mark">{c.w}</span>
                  {(window.MMC_WORK_ART || []).includes(p.id) && (
                    <img className="n-wall__work" src={"assets/clients/" + p.id + "-work.jpg"} alt="" loading="lazy" decoding="async"
                         onLoad={(e) => e.target.classList.add("is-ready")} onError={(e) => e.target.remove()} />
                  )}
                </span>
                <span className="pm-wall__svc">{p.svc.join(" · ")}</span>
              </div>
            );
          })}
        </div>
        <div className="pm-proof__foot">
          <p>We share account-level numbers on the audit call, not on a public page.</p>
          <button className="pm-textlink" onClick={bookCall("pm-proof")}>See what we would look at in your account<Arrow /></button>
        </div>
        <div className="pm-hidden-until-confirmed" style={{ marginTop: 24 }}>
          <Confirm>Client-approved results go here (client, metric, period), one to three. Also confirm the "shared on the audit call" line is true, and which brands may be shown.</Confirm>
        </div>
      </div>
    </section>
  );
}

/* ── 9 · FAQ ─────────────────────────────────────────────────── */
function PmFaq() {
  const faq = window.PM_FAQ || [];
  return (
    <section className="n-band n-band--white pm-band" id="faq">
      <div className="n-wrap">
        <div className="pm-head n-rise">
          <span className="n-eyebrow">Common questions</span>
          <h2 className="n-h2">What people ask <span className="n-serif">first.</span></h2>
        </div>
        <div className="pm-faq n-rise">
          {faq.map((f, k) => (
            <details key={f.q} open={k === 0}>
              <summary>{f.q}</summary>
              <div className="pm-faq__a">
                <p dangerouslySetInnerHTML={{ __html: f.a }} />
                {f.confirm && <Confirm>{f.confirm}</Confirm>}
              </div>
            </details>
          ))}
        </div>
        <p style={{ marginTop: 30 }}>
          <button className="pm-textlink" onClick={bookCall("pm-faq")}>Still unsure? Book the audit<Arrow /></button>
        </p>
      </div>
    </section>
  );
}

/* ── 10 · Related + closing band ─────────────────────────────── */
function PmRelated() {
  return (
    <section className="n-band n-band--paper pm-band" id="related" style={{ paddingBottom: 0 }}>
      <div className="n-wrap">
        <div className="pm-related">
          <a href="services.html">All services <small>five systems</small></a>
          <a href="d2c.html">D2C brands <small>the whole growth stack</small></a>
          <a href="meta-ads.html">Meta Ads <small>in detail</small></a>
          <a href="tools.html">Free calculators <small>break-even ROAS, unit economics</small></a>
          <a href="Our Work.html">Our work <small>the client book</small></a>
        </div>
        <div className="pm-hidden-until-confirmed" style={{ marginTop: 16 }}>
          <Confirm>Links to the Creative, Retention, Conversion and education pages join this row when those pages exist.</Confirm>
        </div>
      </div>
    </section>
  );
}

function PmCta() {
  return (
    <window.MmcCta h2a="Find out what your ad spend" h2b="really returns." lede="On a call, with a senior strategist. We read your accounts against your break-even ROAS." label={PM_AUDIT} onBook={bookCall("pm-final")} />
  );
}

/* ── Mobile sticky CTA ───────────────────────────────────────────
   Appears once the hero has scrolled away, hides while the cookie banner is on
   screen and while the closing band is in view. Desktop never shows it. */
function PmSticky() {
  const [on, setOn] = pmUseState(false);
  pmUseEffect(() => {
    const tick = () => {
      const hero = document.getElementById("top");
      const talk = document.getElementById("talk");
      const cookie = document.querySelector(".cookie");
      const pastHero = hero ? hero.getBoundingClientRect().bottom < 0 : false;
      const atEnd = talk ? talk.getBoundingClientRect().top < window.innerHeight * 0.9 : false;
      setOn(pastHero && !atEnd && !cookie);
    };
    tick();
    window.addEventListener("scroll", tick, { passive: true });
    window.addEventListener("resize", tick);
    const id = setInterval(tick, 700);   // catches the cookie banner being dismissed
    return () => { window.removeEventListener("scroll", tick); window.removeEventListener("resize", tick); clearInterval(id); };
  }, []);
  return (
    <div className={"pm-sticky" + (on ? " is-on" : "")} aria-hidden={!on}>
      <button tabIndex={on ? 0 : -1} onClick={bookCall("pm-sticky")}>Free paid-media audit</button>
    </div>
  );
}

Object.assign(window, { PmHero, PmAnswer, PmMargin, PmClaims, PmPayback, PmChannels, PmProcess, PmWho, PmProof, PmFaq, PmRelated, PmCta, PmSticky });

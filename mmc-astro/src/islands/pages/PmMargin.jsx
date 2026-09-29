import React from "react";

/* Contribution margin vs ROAS: a stated example, not data. A 1,000 rupee order that keeps 300 after product,
   shipping, fees and returns. Ad spend needed at a given ROAS is 1,000 / ROAS. */
const PM_ORDER = 1000, PM_CONTRIB = 300;
const PM_ROAS = [
  { v: 3, l: "3x ROAS" },
  { v: 1000 / 300, l: "3.3x ROAS" },
  { v: 4, l: "4x ROAS" },
];

export default function PmMargin({ breakeven, funnel, unit }) {
  const [i, setI] = React.useState(0);
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
          <a className="n-btn n-btn--sun" href={breakeven}>Run your break-even ROAS<span className="n-btn__arr" aria-hidden="true" /></a>
          <span className="pm-margin__more">Also free:</span>
          <a className="pm-textlink pm-textlink--quiet" href={funnel}>Funnel ROAS</a>
          <a className="pm-textlink pm-textlink--quiet" href={unit}>Unit economics</a>
        </div>
        <p className="pm-diagram__note">Assumes ₹700 of the ₹1,000 goes to product, shipping, payment fees and returns. Your cost sheet sets your real number.</p>
      </div>
    </section>
  );
}

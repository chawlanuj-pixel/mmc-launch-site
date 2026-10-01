import React from "react";

/* First order loses, repeat pays. Stated example: 400 rupees to acquire a customer, 300 contribution per order,
   repeat orders carry no extra ad cost. Cumulative profit after N orders = 300N - 400. Not client data. */
const PM_CAC = 400, PM_PER_ORDER = 300, PM_ORDERS = [1, 2, 3, 4];

export default function PmPayback() {
  const [n, setN] = React.useState(1);
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

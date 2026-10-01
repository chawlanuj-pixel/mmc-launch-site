/* assets/mmc-popularity.js, ordering the portfolio by what people open.
 * ---------------------------------------------------------------------------
 * WHAT THIS DOES
 * Cards in the client grids are re-ordered so the most-opened brand leads and
 * the rest fall in behind it.
 *
 * "Most opened" has two possible meanings on a static site, and this supports
 * both, preferring the better one whenever it is available:
 *
 *   GLOBAL   every visitor's clicks, counted together. This is the version
 *            worth having: it surfaces the work that actually pulls. It needs
 *            two things configured, neither of which is set yet:
 *              - window.MMC_FORM_ENDPOINT, so a click can be written
 *                server-side (the same webhook the lead forms already use)
 *              - CFG.publicToken / CFG.publicBase in admin/mmc-data.js, so the
 *                counts can be read back
 *            The moment both exist this switches over on its own. No code
 *            change, no rebuild.
 *
 *   LOCAL    this visitor's own clicks, held in their browser. Works today
 *            with zero configuration, and is the fallback whenever the global
 *            counts cannot be reached.
 *
 * Be aware of what LOCAL actually does: it promotes the card the visitor has
 * already opened, which is arguably the one they least need shown again. It
 * earns its place as a graceful degradation, not as the goal.
 *
 * Every click is also pushed to dataLayer, so GA4 records it through GTM
 * regardless of whether either endpoint is configured. That means the data
 * starts accumulating in analytics from today even if the reordering is still
 * running locally.
 *
 * ORDERING IS APPLIED AFTER MOUNT, never during. Re-sorting under a pointer
 * mid-hover would move the card out from under the cursor. The pre-rendered
 * HTML therefore ships in the authored order, which is also what crawlers see.
 */
(function () {
  "use strict";

  var LS_KEY = "mmc.pop.v1";
  var TABLE = "Popularity";       // Airtable table holding { key, clicks }
  var global = null;              // populated if the counts can be read
  var pending = null;

  /* ---- local tally ------------------------------------------------------ */

  function readLocal() {
    try {
      return JSON.parse(localStorage.getItem(LS_KEY) || "{}") || {};
    } catch (e) {
      // Private windows and blocked site-data both throw here.
      return {};
    }
  }

  function writeLocal(map) {
    try { localStorage.setItem(LS_KEY, JSON.stringify(map)); } catch (e) {}
  }

  /* ---- global tally ----------------------------------------------------- */

  /* Reads once per page load and caches. Any failure leaves `global` null and
     the local tally takes over, so a slow or missing Airtable never delays or
     breaks the grid. */
  function loadGlobal() {
    if (pending) return pending;
    var D = window.MMCData;
    if (!D || !D.content) {
      pending = Promise.resolve(null);
      return pending;
    }
    pending = D.content(TABLE, null).then(function (rows) {
      if (!Array.isArray(rows) || !rows.length) return null;
      var m = {};
      rows.forEach(function (r) {
        if (r && r.key) m[String(r.key)] = Number(r.clicks) || 0;
      });
      global = m;
      return m;
    }).catch(function () { return null; });
    return pending;
  }

  /* ---- recording -------------------------------------------------------- */

  function record(key, label) {
    if (!key) return;

    var local = readLocal();
    local[key] = (local[key] || 0) + 1;
    writeLocal(local);

    // GA4 through GTM. This works with no endpoint configured at all, so the
    // real popularity data starts building from today either way.
    try {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "portfolio_open",
        portfolio_key: key,
        portfolio_name: label || key
      });
    } catch (e) {}

    // Server-side increment, if there is somewhere to send it. Fire and forget:
    // a click must never wait on a network round trip before navigating.
    var url = window.MMC_FORM_ENDPOINT;
    if (url) {
      try {
        var body = JSON.stringify({
          type: "portfolio_click",
          key: key,
          name: label || key,
          at: new Date().toISOString(),
          page: location.pathname
        });
        if (navigator.sendBeacon) {
          navigator.sendBeacon(url, new Blob([body], { type: "application/json" }));
        } else {
          fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: body,
            keepalive: true
          }).catch(function () {});
        }
      } catch (e) {}
    }
  }

  /* ---- ordering --------------------------------------------------------- */

  function scoreOf(key) {
    if (global && Object.prototype.hasOwnProperty.call(global, key)) {
      return global[key];
    }
    return readLocal()[key] || 0;
  }

  /* Stable: items nobody has opened keep the order they were authored in,
     rather than being shuffled by whatever the sort happens to do with ties. */
  function rank(items, keyOf) {
    var withIndex = items.map(function (item, i) {
      return { item: item, i: i, score: scoreOf(keyOf(item)) };
    });
    withIndex.sort(function (a, b) {
      if (b.score !== a.score) return b.score - a.score;
      return a.i - b.i;
    });
    return withIndex.map(function (x) { return x.item; });
  }

  /* React hook. Returns the list in authored order on the first render, then
     re-orders once the counts are known. Ordering after mount rather than
     during keeps the pre-rendered markup and the first paint identical.

     It re-ranks whenever the source list changes, because the CMS hook that
     feeds it swaps the baked-in fallback for Airtable rows a moment after
     mount. Keying the effect on [] would have frozen the order against the
     fallback and silently ignored the real data. */
  function useRanked(items, keyOf) {
    var R = window.React;
    var state = R.useState(items);
    var ordered = state[0], setOrdered = state[1];

    var signature = items.length + "|" + items.map(keyOf).join("\u0000");

    R.useEffect(function () {
      var live = true;
      loadGlobal().then(function () {
        if (live) setOrdered(rank(items, keyOf));
      });
      return function () { live = false; };
    }, [signature]);

    /* If the source changed but the effect has not settled yet, hand back the
       new list rather than a stale one holding items that no longer exist. */
    if (ordered.length !== items.length) return items;
    return ordered;
  }

  window.MMCPop = {
    record: record,
    rank: rank,
    useRanked: useRanked,
    rankAfterMount: useRanked,   /* reads better at the call site */
    scoreOf: scoreOf,
    loadGlobal: loadGlobal,
    /* For the dashboard: what this browser has opened, most first. */
    localTally: function () {
      var m = readLocal();
      return Object.keys(m)
        .map(function (k) { return { key: k, clicks: m[k] }; })
        .sort(function (a, b) { return b.clicks - a.clicks; });
    },
    reset: function () { writeLocal({}); }
  };
})();

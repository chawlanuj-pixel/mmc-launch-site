/* assets/mmc-forms.js, lead submission for all MMC forms
 * ---------------------------------------------------------------------------
 * Before this file existed, every form on the site swallowed its data and
 * showed a "thank you" without sending anything. This wires them to a real
 * destination.
 *
 * HOW TO POINT LEADS AT YOUR BACKEND / FORM SERVICE
 * -------------------------------------------------
 * Set ONE value: window.MMC_FORM_ENDPOINT, before this script loads, e.g. add
 *   <script>window.MMC_FORM_ENDPOINT = "https://formspree.io/f/yourid";</script>
 * It must accept a JSON POST. Works with Formspree, Getform, Web3Forms,
 * Basin, a Make.com webhook, or your own API.
 *
 * UNTIL YOU SET IT: submissions fall back to opening a pre-filled email to
 * the sales inbox, so a lead is never silently lost.
 * ---------------------------------------------------------------------------
 */
(function () {
  var ENDPOINT = window.MMC_FORM_ENDPOINT || ""; // <-- set this to go live
  var FALLBACK_EMAIL = "sales-in@mondaymarketing.company";

  function buildMailto(subject, data) {
    var lines = Object.keys(data).map(function (k) {
      var v = data[k];
      if (Array.isArray(v)) v = v.join(", ");
      return k + ": " + (v === undefined || v === null || v === "" ? "-" : v);
    });
    return "mailto:" + FALLBACK_EMAIL +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(lines.join("\n"));
  }

  function submitLead(data, opts) {
    opts = opts || {};
    var subject = opts.subject || "New enquiry, mondaymarketing.company";
    var payload = Object.assign({}, data, {
      _page: (typeof location !== "undefined" ? location.pathname : ""),
      _submittedAt: new Date().toISOString()
    });

    if (ENDPOINT) {
      return fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(payload)
      })
        .then(function (res) {
          return { ok: res.ok, mode: "endpoint", status: res.status };
        })
        .catch(function (err) {
          // Network failed, fall back so the lead still reaches a human.
          try { window.location.href = buildMailto(subject, payload); } catch (e) {}
          return { ok: true, mode: "mailto", error: String(err) };
        });
    }

    // No endpoint configured yet: open the visitor's mail client, pre-filled.
    try { window.location.href = buildMailto(subject, payload); } catch (e) {}
    return Promise.resolve({ ok: true, mode: "mailto" });
  }

  /* One submission must produce one record. MMCData and the code above read the
     same window.MMC_FORM_ENDPOINT by default, so posting through both wrote the
     lead twice. When they share an endpoint MMCData is the writer, because its
     payload carries the submittedAt/status/page fields the dashboard reads back;
     this path then exists only to catch a write that never landed. */
  var _submit = submitLead;
  submitLead = function (payload, opts) {
    opts = opts || {};
    try {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: "lead_submit", cta_source: (payload && payload.source) || "form" });
    } catch (e) {}

    var store = window.MMCData && window.MMCData.submitLead;
    if (!store) return _submit(payload, opts);

    var enriched = Object.assign({ source: opts.subject || "form" }, payload);
    var shared = (window.MMCData.CFG && window.MMCData.CFG.leadWebhook) === ENDPOINT;
    if (!shared) {
      // Separate destinations: both are meant to receive the lead.
      try { store(enriched); } catch (e) {}
      return _submit(payload, opts);
    }

    return store(enriched).then(function (r) {
      if (r && r.ok) return { ok: true, mode: "endpoint", status: r.status };
      try {
        window.location.href = buildMailto(
          opts.subject || "New enquiry, mondaymarketing.company", enriched);
      } catch (e) {}
      return { ok: true, mode: "mailto", error: (r && r.reason) || "store-failed" };
    }).catch(function (err) {
      try {
        window.location.href = buildMailto(
          opts.subject || "New enquiry, mondaymarketing.company", enriched);
      } catch (e) {}
      return { ok: true, mode: "mailto", error: String(err) };
    });
  };

  window.MMCForms = { submitLead: submitLead, buildMailto: buildMailto };
})();

/* ── Booking ──────────────────────────────────────────────────────────────
   Every primary CTA opens the Calendly inline widget in an on-site modal, so
   nobody is thrown into a new tab mid-decision. widget.js is fetched lazily on
   the first booking click rather than on every page load.

   The audit form stays reachable as the secondary path via mmcOpenBrief().
   Both push a dataLayer event so GTM can attribute bookings by source. */
(function () {
  var CALENDLY = "https://calendly.com/mmc-agency-ww/audit-onboarding-calls";
  var WIDGET_JS = "https://assets.calendly.com/assets/external/widget.js";

  var state = "idle";        // idle | loading | ready | failed
  var waiting = [];
  var overlay = null, host = null, lastFocus = null;

  function track(event, source) {
    try {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: event, cta_source: source || "cta" });
    } catch (e) {}
  }

  /* Load Calendly's widget script once, on demand. */
  function loadWidget(cb) {
    if (state === "ready")  { cb(true);  return; }
    if (state === "failed") { cb(false); return; }
    waiting.push(cb);
    if (state === "loading") return;
    state = "loading";

    var css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = "https://assets.calendly.com/assets/external/widget.css";
    document.head.appendChild(css);

    var sc = document.createElement("script");
    sc.src = WIDGET_JS;
    sc.async = true;
    sc.onload = function () {
      state = "ready";
      waiting.splice(0).forEach(function (f) { f(true); });
    };
    sc.onerror = function () {
      state = "failed";
      waiting.splice(0).forEach(function (f) { f(false); });
    };
    document.head.appendChild(sc);
  }

  function injectStyles() {
    if (document.getElementById("mmc-book-styles")) return;
    var st = document.createElement("style");
    st.id = "mmc-book-styles";
    st.textContent = [
      ".mmc-book{position:fixed;inset:0;z-index:2000;display:flex;align-items:center;",
      "justify-content:center;padding:clamp(12px,3vw,40px);visibility:hidden;opacity:0;",
      "transition:opacity 260ms ease,visibility 260ms ease;}",
      ".mmc-book.is-open{visibility:visible;opacity:1;}",
      ".mmc-book__scrim{position:absolute;inset:0;background:rgba(10,19,48,0.72);",
      "backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);}",
      ".mmc-book__sheet{position:relative;width:min(1040px,100%);max-height:calc(100dvh - 24px);",
      "display:flex;flex-direction:column;background:#fff;border-radius:16px;overflow:hidden;",
      "box-shadow:0 30px 90px rgba(10,19,48,0.45);transform:translateY(10px);",
      "transition:transform 320ms cubic-bezier(0.22,0.61,0.36,1);}",
      ".mmc-book.is-open .mmc-book__sheet{transform:none;}",
      ".mmc-book__bar{display:flex;align-items:center;justify-content:space-between;gap:14px;",
      "padding:14px 18px;border-bottom:1px solid rgba(15,30,94,0.10);flex-shrink:0;}",
      ".mmc-book__t{font-family:var(--font-display,Raleway,sans-serif);font-weight:800;",
      "font-size:14px;letter-spacing:-0.01em;color:#0E1626;margin:0;}",
      ".mmc-book__acts{display:flex;align-items:center;gap:8px;}",
      ".mmc-book__tab{font-family:var(--font-body,Nunito,sans-serif);font-size:10.5px;",
      "font-weight:700;letter-spacing:0.11em;text-transform:uppercase;color:#4F5A6B;",
      "text-decoration:underline;text-underline-offset:3px;}",
      ".mmc-book__tab:hover{color:#1D4ED8;}",
      ".mmc-book__x{width:34px;height:34px;border-radius:50%;border:1.5px solid rgba(15,30,94,0.16);",
      "background:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;",
      "font-size:17px;line-height:1;color:#0E1626;flex-shrink:0;}",
      ".mmc-book__x:hover{border-color:#1D4ED8;color:#1D4ED8;}",
      // initInlineWidget injects a bare iframe into the parent. It does not add
      // the .calendly-inline-widget class, so size the host and the iframe itself.
      ".mmc-book__host{height:700px;max-height:calc(100dvh - 96px);min-width:320px;",
      "overflow:auto;-webkit-overflow-scrolling:touch;}",
      ".mmc-book__host iframe,.mmc-book__host .calendly-inline-widget{",
      "display:block;width:100%;height:100%;min-height:640px;border:0;}",
      "@media(max-width:640px){.mmc-book{padding:0;}",
      ".mmc-book__sheet{width:100%;max-height:100dvh;height:100dvh;border-radius:0;}",
      ".mmc-book__host{height:calc(100dvh - 62px);max-height:none;}",
      ".mmc-book__host iframe,.mmc-book__host .calendly-inline-widget{min-height:0;}}",
      ".mmc-book__fail{padding:40px 24px;text-align:center;font-family:var(--font-body,Nunito,sans-serif);",
      "font-size:14px;line-height:1.6;color:#2E3849;}",
      ".mmc-book__fail a{color:#1D4ED8;font-weight:700;}",
      "@media(prefers-reduced-motion:reduce){.mmc-book,.mmc-book__sheet{transition:none;}}"
    ].join("");
    document.head.appendChild(st);
  }

  function build() {
    if (overlay) return;
    injectStyles();

    overlay = document.createElement("div");
    overlay.className = "mmc-book";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-label", "Book a strategy call");
    overlay.innerHTML =
      '<div class="mmc-book__scrim" data-close></div>' +
      '<div class="mmc-book__sheet">' +
        '<div class="mmc-book__bar">' +
          '<p class="mmc-book__t">Book a 30-minute strategy call</p>' +
          '<div class="mmc-book__acts">' +
            '<a class="mmc-book__tab" href="' + CALENDLY + '" target="_blank" rel="noopener noreferrer">Open in a new tab</a>' +
            '<button type="button" class="mmc-book__x" data-close aria-label="Close">&times;</button>' +
          '</div>' +
        '</div>' +
        '<div class="mmc-book__host"></div>' +
      '</div>';

    host = overlay.querySelector(".mmc-book__host");
    overlay.addEventListener("click", function (e) {
      if (e.target.hasAttribute && e.target.hasAttribute("data-close")) close();
    });
    document.body.appendChild(overlay);
  }

  function renderWidget() {
    host.innerHTML = "";
    loadWidget(function (ok) {
      if (!overlay.classList.contains("is-open")) return;
      if (ok && window.Calendly && window.Calendly.initInlineWidget) {
        window.Calendly.initInlineWidget({ url: CALENDLY, parentElement: host });
      } else {
        // Ad blockers and offline states both land here, never a dead end.
        host.innerHTML =
          '<div class="mmc-book__fail">The booking calendar could not load, an ad blocker ' +
          'or network filter may be blocking it.<br><br>' +
          '<a href="' + CALENDLY + '" target="_blank" rel="noopener noreferrer">' +
          'Open the calendar in a new tab</a>, or email ' +
          '<a href="mailto:sales-in@mondaymarketing.company">sales-in@mondaymarketing.company</a>.</div>';
      }
    });
  }

  function onKey(e) { if (e.key === "Escape") close(); }

  function open(source) {
    build();
    lastFocus = document.activeElement;
    overlay.classList.add("is-open");
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    renderWidget();
    var x = overlay.querySelector(".mmc-book__x");
    if (x) x.focus();
  }

  function close() {
    if (!overlay) return;
    overlay.classList.remove("is-open");
    document.body.style.overflow = "";
    document.removeEventListener("keydown", onKey);
    setTimeout(function () { if (host && !overlay.classList.contains("is-open")) host.innerHTML = ""; }, 300);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  window.MMC_CALENDLY = CALENDLY;
  window.mmcCloseBooking = close;

  window.mmcBookCall = function (source, e) {
    if (e && e.preventDefault) e.preventDefault();
    track("book_call_click", source);
    open(source);
  };

  window.mmcOpenBrief = function (e) {
    if (e && e.preventDefault) e.preventDefault();
    track("brief_form_open", "secondary");
    window.dispatchEvent(new CustomEvent("open-audit"));
  };

  /* Mount a permanent, non-modal inline widget into any element. */
  window.mmcInlineCalendly = function (el) {
    if (!el || el.getAttribute("data-mmc-mounted")) return;
    el.setAttribute("data-mmc-mounted", "1");
    injectStyles();
    el.classList.add("mmc-book__host");
    el.style.height = el.style.height || "700px";
    el.style.maxHeight = "none";
    loadWidget(function (ok) {
      if (ok && window.Calendly && window.Calendly.initInlineWidget) {
        window.Calendly.initInlineWidget({ url: CALENDLY, parentElement: el });
      } else {
        el.innerHTML =
          '<div class="mmc-book__fail">The booking calendar could not load. ' +
          '<a href="' + CALENDLY + '" target="_blank" rel="noopener noreferrer">Open it in a new tab</a>.</div>';
      }
    });
  };
})();

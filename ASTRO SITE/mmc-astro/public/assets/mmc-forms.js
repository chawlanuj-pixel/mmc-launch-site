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
  // Live site: forms post to our own PHP receiver (public/forms/send.php), which emails anuj@mondaymarketing.company.
  // Anywhere else (local preview, other hosts) there is no receiver, so submissions open a pre-filled email to the same address.
  var ON_LIVE_SITE = typeof location !== "undefined" && /(^|\.)mondaymarketing\.company$/i.test(location.hostname);
  var ENDPOINT = window.MMC_FORM_ENDPOINT || (ON_LIVE_SITE ? "/forms/send.php" : "");
  var FALLBACK_EMAIL = "anuj@mondaymarketing.company";

  // ── Google reCAPTCHA v3 (invisible). The SITE key is public; the secret stays on the server (public/forms/config.php).
  // Loaded lazily the first time someone touches a form field, only on the live domain, so no Google script runs on pages without a form interaction.
  var RC_KEY = "6LfbwOstAAAAADxJRLsULpa7OHrY5sjfqvBwtGaU";
  var rcLoad = null;
  function loadRecaptcha() {
    if (!ON_LIVE_SITE) return Promise.resolve(false);
    if (rcLoad) return rcLoad;
    rcLoad = new Promise(function (resolve) {
      var done = false, finish = function (v) { if (!done) { done = true; resolve(v); } };
      var sc = document.createElement("script");
      sc.src = "https://www.google.com/recaptcha/api.js?render=" + RC_KEY;
      sc.async = true;
      sc.onload = function () { if (window.grecaptcha && window.grecaptcha.ready) window.grecaptcha.ready(function () { finish(true); }); else finish(false); };
      sc.onerror = function () { finish(false); };
      document.head.appendChild(sc);
      setTimeout(function () { finish(false); }, 8000);
    });
    return rcLoad;
  }
  function captchaToken(action) {
    return loadRecaptcha().then(function (ok) {
      if (!ok || !window.grecaptcha) return "";
      return window.grecaptcha.execute(RC_KEY, { action: action || "mmc_form" }).catch(function () { return ""; });
    }).catch(function () { return ""; });
  }
  window.MMCCaptcha = { token: captchaToken, load: loadRecaptcha, siteKey: RC_KEY };
  // Google asks that the badge is replaced by a visible notice when it is hidden: add it to a form the first time someone uses it.
  function addNotice(form) {
    if (!form || form.querySelector(".rc-note")) return;
    var p = document.createElement("p");
    p.className = "rc-note";
    p.innerHTML = 'This form is protected by reCAPTCHA. The Google <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a> and <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer">Terms of Service</a> apply.';
    form.appendChild(p);
  }
  if (ON_LIVE_SITE && typeof document !== "undefined") {
    document.addEventListener("focusin", function (e) {
      var t = e.target;
      if (t && t.closest && /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)) {
        var f = t.closest("form");
        if (f && (f.querySelector('input[name="_hp"], input[name="company_url"]'))) { loadRecaptcha(); addNotice(f); }
      }
    }, true);
  }

  function buildMailto(subject, data) {
    var lines = Object.keys(data).filter(function (k) { return k !== "_rc" && k !== "_hp"; }).map(function (k) {
      var v = data[k];
      if (Array.isArray(v)) v = v.join(", ");
      return k + ": " + (v === undefined || v === null || v === "" ? "-" : v);
    });
    return "mailto:" + FALLBACK_EMAIL +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(lines.join("\n"));
  }

  // Spam trap: bots fill the hidden `_hp` field, people never see it. Carry a filled one into the payload so the server drops the lead,
  // and remove an empty one so clean submissions carry no `_hp` at all. Used by every send path (endpoint, store, mailto).
  function withHoneypot(payload) {
    try {
      var hps = document.querySelectorAll('input[name="_hp"]'), val = "";
      for (var hi = 0; hi < hps.length; hi++) if (hps[hi].value) { val = hps[hi].value; break; }
      if (val) payload._hp = val; else delete payload._hp;
    } catch (e) {}
    return payload;
  }

  function submitLead(data, opts) {
    opts = opts || {};
    var subject = opts.subject || "New enquiry, mondaymarketing.company";
    var payload = Object.assign({}, data, {
      _page: (typeof location !== "undefined" ? location.pathname : ""),
      _submittedAt: new Date().toISOString()
    });
    withHoneypot(payload);

    if (ENDPOINT) {
      return captchaToken("mmc_form").then(function (tok) {
        if (tok) payload._rc = tok;
        return fetch(ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", "Accept": "application/json" },
          body: JSON.stringify(payload)
        })
          .then(function (res) {
            if (!res.ok) {
              // The receiver refused (captcha, rate limit) or mail is down: open the pre-filled email so a real lead still reaches a human.
              try { window.location.href = buildMailto(subject, payload); } catch (e) {}
              return { ok: true, mode: "mailto", status: res.status };
            }
            return { ok: true, mode: "endpoint", status: res.status };
          })
          .catch(function (err) {
            // Network failed, fall back so the lead still reaches a human.
            try { window.location.href = buildMailto(subject, payload); } catch (e) {}
            return { ok: true, mode: "mailto", error: String(err) };
          });
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

    var enriched = withHoneypot(Object.assign({ source: opts.subject || "form" }, payload));
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

  /* After a lead is submitted, send the visitor to /thank-you/ so the confirmation has its own URL
     (a destination for GA4, Google Ads and Meta conversions). The details the page needs go through
     sessionStorage, not the query string, so no name or email lands in a URL or in analytics.
     In mailto mode the visitor's mail app is opening, so wait a moment before navigating away. */
  function goThanks(kind, result, data) {
    data = data || {};
    try {
      sessionStorage.removeItem("mmc_thanks_fired");
      sessionStorage.setItem("mmc_thanks", JSON.stringify({
        kind: kind || "brief",
        mode: (result && result.mode) || "",
        name: String(data.name || "").split(" ")[0],
        brand: data.brand || "",
        at: Date.now()
      }));
    } catch (e) {}
    var go = function () { window.location.assign("/thank-you/"); };
    if (result && result.mode === "mailto") setTimeout(go, 900); else go();
  }

  /* Phone: keep a leading +, strip spaces, dashes and brackets; accept 8 to 15 digits (E.164 length). Used by every form. */
  function cleanPhone(v) { v = String(v || "").trim(); var plus = v.charAt(0) === "+"; var d = v.replace(/\D/g, ""); return d ? (plus ? "+" : "") + d : ""; }
  function validPhone(v) { var d = cleanPhone(v).replace(/\D/g, ""); return d.length >= 8 && d.length <= 15; }
  var PHONE_MSG = "Please enter a phone or WhatsApp number we can reach you on, with country code if outside India.";

  window.MMCForms = { submitLead: submitLead, buildMailto: buildMailto, goThanks: goThanks, cleanPhone: cleanPhone, validPhone: validPhone, phoneMsg: PHONE_MSG };
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

  /* Keeps Tab inside an open dialog (same logic as the site menu's trap). */
  function trapTab(e, root) {
    if (window.mmcTrapTab) return window.mmcTrapTab(e, root);
    if (e.key !== "Tab" || !root) return;
    var f = Array.prototype.slice.call(root.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), textarea, select, iframe, [tabindex]:not([tabindex="-1"])'
    )).filter(function (n) { return n.offsetParent !== null || n === document.activeElement; });
    if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (!root.contains(document.activeElement)) { e.preventDefault(); first.focus(); }
    else if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
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
      "overflow:auto;-webkit-overflow-scrolling:touch;position:relative;}",
      ".mmc-book__load{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;",
      "pointer-events:none;font-family:var(--font-body,Nunito,sans-serif);font-size:14px;color:#4F5A6B;}",
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
        '<div class="mmc-book__end" tabindex="0" aria-hidden="true"></div>' +
      '</div>';

    host = overlay.querySelector(".mmc-book__host");
    overlay.addEventListener("click", function (e) {
      if (e.target.hasAttribute && e.target.hasAttribute("data-close")) close();
    });
    // Calendly's iframe is cross-origin, so Tab inside it cannot be trapped by a keydown
    // listener; this sentinel catches focus leaving the iframe and returns it to the close button.
    var end = overlay.querySelector(".mmc-book__end");
    if (end) end.addEventListener("focus", function () {
      var x = overlay.querySelector(".mmc-book__x"); if (x) x.focus();
    });
    document.body.appendChild(overlay);
  }

  function renderWidget() {
    host.innerHTML = '<div class="mmc-book__load" role="status">Loading calendar\u2026</div>';
    loadWidget(function (ok) {
      if (!overlay.classList.contains("is-open")) return;
      if (ok && window.Calendly && window.Calendly.initInlineWidget) {
        window.Calendly.initInlineWidget({ url: CALENDLY, parentElement: host });
        var ph = host.querySelector(".mmc-book__load");
        var clear = function () { if (ph && ph.parentNode) ph.parentNode.removeChild(ph); };
        var fr = host.querySelector("iframe");
        if (fr) fr.addEventListener("load", clear);
        setTimeout(clear, 12000);
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

  function onKey(e) {
    if (e.key === "Escape") close();
    else trapTab(e, overlay && overlay.querySelector(".mmc-book__sheet"));
  }

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

  /* A call that passes no source id still reports which page it came from. */
  function pageSource() {
    var p = (location.pathname || "/").replace(/^\/|\/$/g, "").replace(/\//g, "-");
    return "page-" + (p || "home");
  }

  window.mmcBookCall = function (source, e) {
    if (source && source.preventDefault) { e = source; source = null; }
    if (e && e.preventDefault) e.preventDefault();
    source = source || pageSource();
    track("book_call_click", source);
    open(source);
  };

  window.mmcOpenBrief = function (e, source) {
    if (e && e.preventDefault) e.preventDefault();
    track("brief_form_open", source || pageSource() + "-brief");
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

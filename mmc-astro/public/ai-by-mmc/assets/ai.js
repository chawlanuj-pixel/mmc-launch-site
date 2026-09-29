/* AI by MMC: standalone behaviour. Dependency-free, injects the floating button outside any app root
   (same pattern as MMC Site/assets/mmc-preloader.js) so it can be dropped into every page of the live site. */
(function () {
  "use strict";
  var BASE = (document.currentScript && document.currentScript.dataset.base) || "";
  // Same icon set as the "six services" cards on index.html, so the panel,
  // the floating button's menu and the answer-section strip all point at
  // one consistent icon language instead of introducing a second set.
  var ICO = {
    camera: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8h3l1.5-2h7L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z"/><circle cx="12" cy="13.5" r="3.5"/></svg>',
    film: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="1.5"/><path d="M3 9h4M3 15h4M17 9h4M17 15h4M9 5v14M15 5v14"/></svg>',
    chat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5.5h16a1 1 0 0 1 1 1V15a1 1 0 0 1-1 1H9l-4 4v-4H4a1 1 0 0 1-1-1V6.5a1 1 0 0 1 1-1Z"/><path d="M7 9.5h10M7 12.5h6"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="7" y="2.5" width="10" height="19" rx="2"/><path d="M11 19h2"/></svg>',
    layout: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3.5" y="4" width="17" height="16" rx="1.5"/><path d="M3.5 8.5h17M7 12h3M7 15h6"/></svg>',
    mic: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M6 11a6 6 0 0 0 12 0M12 17v4M9 21h6"/></svg>'
  };
  window.__aiIco = ICO;
  var SERVICES = [
    ["ai-photoshoot.html", ICO.camera, "AI Photoshoot", "One photo, every scene"],
    ["ai-video-generation.html", ICO.film, "AI Video Generation", "Ad films without a shoot"],
    ["ai-sales-agent.html", ICO.chat, "AI Sales Agent", "Answers and qualifies leads"],
    ["ai-ugc.html", ICO.phone, "AI UGC", "Creator-style clips at scale"],
    ["ai-landing-page-builder.html", ICO.layout, "AI Landing Page Builder", "Pages for every campaign"],
    ["ai-spokesperson-video.html", ICO.mic, "AI Spokesperson Video", "A presenter that speaks for you"]
  ];
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  function track(name, extra) {
    try { (window.dataLayer = window.dataLayer || []).push(Object.assign({ event: name }, extra || {})); } catch (e) {}
  }

  /* scroll reveal */
  var gsapOn = document.documentElement.classList.contains("gsap-on");
  var io = !gsapOn && "IntersectionObserver" in window && new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: .15 });
  if (!gsapOn) document.querySelectorAll(".rise").forEach(function (el) { io ? io.observe(el) : el.classList.add("in"); });

  /* word-by-word headline reveal */
  document.querySelectorAll("[data-words]").forEach(function (h) {
    var i = 0;
    (function wrap(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (n) {
        if (n.nodeType === 3) {
          var frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(function (t) {
            if (!t) return;
            if (/^\s+$/.test(t)) { frag.appendChild(document.createTextNode(" ")); return; }
            var s = document.createElement("span"); s.className = "w"; s.textContent = t;
            s.style.animationDelay = (0.05 * i++ + 0.1) + "s"; frag.appendChild(s);
          });
          n.parentNode.replaceChild(frag, n);
        } else if (n.nodeType === 1) wrap(n);
      });
    })(h);
  });

  /* button text roll */
  document.querySelectorAll(".btn").forEach(function (b) {
    var t = "";
    Array.prototype.slice.call(b.childNodes).forEach(function (n) { if (n.nodeType === 3) { t += n.textContent; b.removeChild(n); } });
    t = t.trim(); if (!t) return;
    var r = document.createElement("span"); r.className = "roll";
    var a = document.createElement("span"), c = document.createElement("span"); a.textContent = t; c.textContent = t; c.setAttribute("aria-hidden", "true");
    r.appendChild(a); r.appendChild(c); b.insertBefore(r, b.firstChild);
  });

  /* FAQ accordion */
  document.querySelectorAll(".faq__q").forEach(function (b) {
    b.addEventListener("click", function () { var i = b.parentNode, o = i.classList.toggle("open"); b.setAttribute("aria-expanded", o); });
  });
  var firstFaq = document.querySelector(".faq__i .faq__q"); if (firstFaq) firstFaq.click();

  /* image slots: show the image when it exists; swap in video when data-video is set (video-later hook) */
  document.querySelectorAll(".slot").forEach(function (slot) {
    var img = slot.querySelector("img");
    if (img) {
      var ok = function () { slot.classList.add("has-img"); };
      if (img.complete) { img.naturalWidth ? ok() : img.remove(); } else { img.addEventListener("load", ok); img.addEventListener("error", function () { img.remove(); }); }
    }
    var src = slot.getAttribute("data-video");
    if (src && !reduce && !(navigator.connection && navigator.connection.saveData)) {
      var v = document.createElement("video");
      v.muted = true; v.loop = true; v.playsInline = true; v.preload = "none"; v.src = src;
      if (img) v.poster = img.getAttribute("src");
      slot.appendChild(v);
      var vio = new IntersectionObserver(function (es) { es.forEach(function (e) { e.isIntersecting ? v.play().catch(function () {}) : v.pause(); }); });
      vio.observe(slot);
    }
  });

  /* floating AI button */
  if (document.getElementById("ai-fab")) return;
  var wrap = document.createElement("div");
  wrap.id = "ai-fab"; wrap.className = "fab-wrap";
  wrap.innerHTML =
    '<div class="fab-panel" id="ai-fab-panel" role="dialog" aria-label="AI by MMC services"><h4>AI by MMC</h4>' +
    '<p>Six ways we put AI to work on your growth.</p>' +
    SERVICES.map(function (s) {
      return '<a class="item" href="' + BASE + s[0] + '" data-t="' + s[2] + '"><span class="ico" aria-hidden="true">' + s[1] + '</span><span><b>' + s[2] + '</b><span>' + s[3] + '</span></span></a>';
    }).join("") +
    '<a class="all" href="' + BASE + 'index.html">See everything AI by MMC</a></div>' +
    '<button class="fab" type="button" aria-label="Open AI by MMC" aria-expanded="false" aria-controls="ai-fab-panel">' +
    '<span class="fab__ring"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8"/></svg></span>' +
    '<span class="fab__ai">Ask AI by MMC</span></button>';
  document.body.appendChild(wrap);
  var btn = wrap.querySelector(".fab"), panel = wrap.querySelector(".fab-panel");
  function setOpen(o) {
    panel.classList.toggle("open", o); btn.setAttribute("aria-expanded", o);
    if (o) track("ai_fab_open", { page: location.pathname });
  }
  btn.addEventListener("click", function () { setOpen(!panel.classList.contains("open")); });
  if (window.__aiMagnet) window.__aiMagnet(btn, .22);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") setOpen(false); });
  document.addEventListener("click", function (e) { if (!wrap.contains(e.target)) setOpen(false); });
  panel.addEventListener("click", function (e) {
    var a = e.target.closest("a"); if (a) track("ai_fab_link", { to: a.getAttribute("href") });
  });

  /* The button used to drift up and down the right edge on scroll; removed
     in favour of a fixed position, which reads calmer and more premium. */

})();

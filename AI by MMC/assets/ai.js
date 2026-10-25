/* AI by MMC: standalone behaviour. Dependency-free, injects the floating button outside any app root
   (same pattern as MMC Site/assets/mmc-preloader.js) so it can be dropped into every page of the live site. */
(function () {
  "use strict";
  var BASE = (document.currentScript && document.currentScript.dataset.base) || "";
  var SERVICES = [
    ["ai-photoshoot.html", "📸", "AI Photoshoot", "One photo, every scene"],
    ["ai-video-generation.html", "🎬", "AI Video Generation", "Ad films without a shoot"],
    ["ai-sales-agent.html", "💬", "AI Sales Agent", "Answers and qualifies leads"],
    ["ai-ugc.html", "📱", "AI UGC", "Creator-style clips at scale"],
    ["ai-landing-page-builder.html", "🧩", "AI Landing Page Builder", "Pages for every campaign"],
    ["ai-spokesperson-video.html", "🎙️", "AI Spokesperson Video", "A presenter that speaks for you"]
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
    '<span class="fab__ring"></span><span class="fab__core"></span>' +
    '<svg class="fab__text" viewBox="0 0 100 100" aria-hidden="true"><defs><path id="ai-fab-c" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0"/></defs>' +
    '<text><textPath href="#ai-fab-c">AI by MMC • AI by MMC • AI by MMC • </textPath></text></svg>' +
    '<span class="fab__ai">AI</span></button>';
  document.body.appendChild(wrap);
  var btn = wrap.querySelector(".fab"), panel = wrap.querySelector(".fab-panel");
  function setOpen(o) {
    panel.classList.toggle("open", o); btn.setAttribute("aria-expanded", o);
    if (o) track("ai_fab_open", { page: location.pathname });
    /* Opening snaps the button to the bottom edge so its ~520px panel always has
       room above it; closing lets the drift resume from the next scroll tick. */
    if (o) wrap.style.bottom = "calc(20px + env(safe-area-inset-bottom))";
    else window.dispatchEvent(new Event("scroll"));
  }
  btn.addEventListener("click", function () { setOpen(!panel.classList.contains("open")); });
  if (window.__aiMagnet) window.__aiMagnet(btn, .22);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") setOpen(false); });
  document.addEventListener("click", function (e) { if (!wrap.contains(e.target)) setOpen(false); });
  panel.addEventListener("click", function (e) {
    var a = e.target.closest("a"); if (a) track("ai_fab_link", { to: a.getAttribute("href") });
  });

  /* revolving drift: the button orbits along the right edge as the page scrolls */
  if (!reduce) {
    var ticking = false;
    function drift() {
      ticking = false;
      /* On phones the button stays pinned bottom-right: drifting it mid-screen
         covered headlines and CTAs. It also holds still while its panel is open,
         otherwise the panel opens above the viewport. */
      if (innerWidth <= 700) { wrap.style.bottom = "calc(16px + env(safe-area-inset-bottom))"; return; }
      if (panel.classList.contains("open")) return;
      var max = document.documentElement.scrollHeight - innerHeight;
      var p = max > 0 ? scrollY / max : 0;
      var lift = (Math.sin(p * Math.PI * 4) * .5 + .5) * Math.max(0, innerHeight - 260);
      wrap.style.bottom = "calc(" + (20 + lift) + "px + env(safe-area-inset-bottom))";
    }
    addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(drift); } }, { passive: true });
    drift();
    addEventListener("resize", drift);
  }
})();

/* AI by MMC: standalone behaviour. Dependency-free, page behaviour (reveal, headline words, button roll, FAQ, image and video slots). The floating button now lives in the site shell (AiFab). */
(function () {
  "use strict";
  var AIS = document.querySelector(".ai-scope"); if (!AIS) return;
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  function track(name, extra) {
    try { (window.dataLayer = window.dataLayer || []).push(Object.assign({ event: name }, extra || {})); } catch (e) {}
  }

  /* scroll reveal */
  var gsapOn = document.documentElement.classList.contains("gsap-on");
  var io = !gsapOn && "IntersectionObserver" in window && new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: .15 });
  if (!gsapOn) AIS.querySelectorAll(".rise").forEach(function (el) { io ? io.observe(el) : el.classList.add("in"); });

  /* word-by-word headline reveal */
  AIS.querySelectorAll("[data-words]").forEach(function (h) {
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
  AIS.querySelectorAll(".btn").forEach(function (b) {
    var t = "";
    Array.prototype.slice.call(b.childNodes).forEach(function (n) { if (n.nodeType === 3) { t += n.textContent; b.removeChild(n); } });
    t = t.trim(); if (!t) return;
    var r = document.createElement("span"); r.className = "roll";
    var a = document.createElement("span"), c = document.createElement("span"); a.textContent = t; c.textContent = t; c.setAttribute("aria-hidden", "true");
    r.appendChild(a); r.appendChild(c); b.insertBefore(r, b.firstChild);
  });

  /* FAQ accordion */
  AIS.querySelectorAll(".faq__q").forEach(function (b) {
    b.addEventListener("click", function () { var i = b.parentNode, o = i.classList.toggle("open"); b.setAttribute("aria-expanded", o); });
  });
  var firstFaq = AIS.querySelector(".faq__i .faq__q"); if (firstFaq) firstFaq.click();

  /* image slots: show the image when it exists; swap in video when data-video is set (video-later hook) */
  AIS.querySelectorAll(".slot").forEach(function (slot) {
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

})();

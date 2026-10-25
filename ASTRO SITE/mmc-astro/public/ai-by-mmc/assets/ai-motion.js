/* AI by MMC: motion layer. Needs GSAP + ScrollTrigger from the CDN (Lenis dropped on the integrated site: the shell owns scrolling); every effect degrades to the static layout without them.
   Load BEFORE ai.js. Desktop-only pins run inside gsap.matchMedia so phones get the plain layout. */
(function () {
  "use strict";
  var AIS = document.querySelector(".ai-scope"); if (!AIS) return;
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var G = window.gsap, ST = window.ScrollTrigger;
  var root = document.documentElement;
  function $(s, c) { return Array.prototype.slice.call((c || AIS).querySelectorAll(s)); }

  /* ---------- starfield (canvas, no libs) ---------- */
  function stars(cv) {
    var light = cv.getAttribute("data-theme") === "light", ctx = cv.getContext("2d"), dpr = Math.min(2, window.devicePixelRatio || 1), W = 0, H = 0, P = [], mx = -9999, my = -9999, vis = true;
    function size() {
      var r = cv.getBoundingClientRect(); W = r.width; H = r.height;
      cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var n = Math.round(W * H / (light ? 22000 : 9000)); P = [];
      for (var i = 0; i < n; i++) P.push({ x: Math.random() * W, y: Math.random() * H, r: (Math.random() * 1.4 + .3) * (light ? 2.2 : 1), a: Math.random() * 6.28, s: Math.random() * .02 + .005, vx: (Math.random() - .5) * .07, vy: (Math.random() - .5) * .07, sun: Math.random() < .1 });
    }
    size(); window.addEventListener("resize", size);
    var host = cv.parentNode;
    host.addEventListener("pointermove", function (e) { var r = cv.getBoundingClientRect(); mx = e.clientX - r.left; my = e.clientY - r.top; });
    host.addEventListener("pointerleave", function () { mx = my = -9999; });
    if ("IntersectionObserver" in window) new IntersectionObserver(function (es) { vis = es[0].isIntersecting; }).observe(cv);
    (function loop() {
      if (vis) {
        ctx.clearRect(0, 0, W, H);
        for (var i = 0; i < P.length; i++) {
          var p = P[i]; p.a += p.s; p.x += p.vx; p.y += p.vy;
          if (p.x < 0) p.x = W; if (p.x > W) p.x = 0; if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
          var dx = p.x - mx, dy = p.y - my, d = Math.sqrt(dx * dx + dy * dy) || 1, push = d < 150 ? (150 - d) / 150 : 0;
          var x = p.x + dx / d * push * 26, y = p.y + dy / d * push * 26;
          var al = Math.min(1, .3 + .55 * Math.abs(Math.sin(p.a)) + push * .35);
          ctx.fillStyle = light ? (p.sun ? "rgba(214,154,0," : "rgba(29,78,216,") + (al * .38) + ")" : (p.sun ? "rgba(255,197,40," : "rgba(255,255,255,") + al + ")";
          ctx.beginPath(); ctx.arc(x, y, p.r + push * 1.3, 0, 6.283); ctx.fill();
        }
      }
      requestAnimationFrame(loop);
    })();
  }
  if (!reduce) $("canvas.stars").forEach(stars);

  /* ---------- integrations flow: layout always, shimmer with GSAP ---------- */
  var flows = $("[data-flow]").map(function (fl) {
    var chips = $(".flow__n", fl), n = chips.length, W = 1000, H = 520, cx = 500, cy = 260, paths = [];
    chips.forEach(function (c, i) {
      var a = (i / n) * Math.PI * 2 - Math.PI / 2, x = cx + Math.cos(a) * 400, y = cy + Math.sin(a) * 205;
      c.style.left = (x / W * 100) + "%"; c.style.top = (y / H * 100) + "%";
      paths.push({ x: x, y: y, mx: (x + cx) / 2 + Math.sin(a) * 70, my: (y + cy) / 2 - Math.cos(a) * 70 });
    });
    return { el: fl, chips: chips, paths: paths };
  });

  if (reduce || !G || !ST) return;
  G.registerPlugin(ST);
  root.classList.add("gsap-on");

  /* ---------- hero intro ---------- */
  var hero = AIS.querySelector(".hero");
  if (hero) {
    G.from($(".badge, .hero__pre, .hero .lede, .hero__act, .hero__tools", hero), { opacity: 0, y: 30, duration: 1, ease: "power3.out", stagger: .12, delay: .5 });
  }

  /* ---------- scroll reveals (batched + staggered) ---------- */
  G.set($(".rise"), { opacity: 0, y: 60 });
  ST.batch($(".rise"), {
    start: "top 90%", once: true,
    onEnter: function (b) { G.to(b, { opacity: 1, y: 0, duration: 1.1, ease: "power3.out", stagger: .12, overwrite: true }); }
  });

  /* ---------- section headings: word-by-word blur-in on scroll ---------- */
  $("[data-split]").forEach(function (h) {
    var ws = [];
    (function wrap(n) {
      Array.prototype.slice.call(n.childNodes).forEach(function (c) {
        if (c.nodeType === 3) {
          var fr = document.createDocumentFragment();
          c.textContent.split(/(\s+)/).forEach(function (t) {
            if (!t) return;
            if (/^\s+$/.test(t)) { fr.appendChild(document.createTextNode(" ")); return; }
            var s = document.createElement("span"); s.className = "w2"; s.textContent = t; ws.push(s); fr.appendChild(s);
          });
          c.parentNode.replaceChild(fr, c);
        } else if (c.nodeType === 1) wrap(c);
      });
    })(h);
    G.from(ws, { opacity: 0, y: 14, filter: "blur(10px)", duration: .9, ease: "power3.out", stagger: .05, scrollTrigger: { trigger: h, start: "top 86%", once: true } });
  });

  /* ---------- 3D fan carousel ---------- */
  $("[data-fan]").forEach(function (f) {
    var cards = $(".fan__c", f), N = cards.length, cur = 0, hovering = false, visible = true, spacing = f.closest(".hero--center") ? 64 : 54, timer;
    function rel(i) { return ((i - cur + N + Math.floor(N / 2)) % N) - Math.floor(N / 2); }
    function pose(p) {
      var a = Math.abs(p);
      return { xPercent: -50 + p * spacing, yPercent: -50 + a * 3, rotation: p * 7, rotationY: -p * 22, z: -a * 80, scale: 1 - a * .13, opacity: 1 - a * .24, zIndex: 20 - a };
    }
    G.set(f, { transformPerspective: 1400 });
    cards.forEach(function (c, i) { c._p = rel(i); G.set(c, pose(c._p)); });
    G.from(cards, { y: 170, opacity: 0, duration: 1.5, ease: "back.out(1.25)", stagger: .13, delay: .7 });

    function goTo(k) {
      cur = (k + N) % N;
      cards.forEach(function (c, i) {
        var p = rel(i), t = pose(p), wrap = Math.abs(p - c._p) > 2; c._p = p;
        if (wrap) { G.set(c, { xPercent: t.xPercent, yPercent: t.yPercent, rotation: t.rotation, rotationY: t.rotationY, z: t.z, scale: t.scale, opacity: 0, zIndex: t.zIndex }); G.to(c, { opacity: t.opacity, duration: .9, delay: .35 }); }
        else G.to(c, { xPercent: t.xPercent, yPercent: t.yPercent, rotation: t.rotation, rotationY: t.rotationY, z: t.z, scale: t.scale, opacity: t.opacity, zIndex: t.zIndex, duration: 1.25, ease: "power3.inOut", overwrite: "auto" });
      });
    }
    cards.forEach(function (c, i) { c.addEventListener("click", function () { goTo(i); }); });
    function tick() { if (visible && !hovering) goTo(cur + 1); }
    timer = setInterval(tick, 3600);
    f.addEventListener("pointerenter", function () { hovering = true; });
    f.addEventListener("pointerleave", function () { hovering = false; });
    if ("IntersectionObserver" in window) new IntersectionObserver(function (es) { visible = es[0].isIntersecting; }).observe(f);

    var qy = G.quickTo(f, "rotationY", { duration: .9, ease: "power3.out" }), qx = G.quickTo(f, "rotationX", { duration: .9, ease: "power3.out" });
    var host = f.closest(".hero") || f;
    host.addEventListener("pointermove", function (e) {
      var r = host.getBoundingClientRect();
      qy(((e.clientX - r.left) / r.width - .5) * 16); qx(-((e.clientY - r.top) / r.height - .5) * 9);
    });
    G.to(f, { y: -60, ease: "none", scrollTrigger: { trigger: f, start: "top 65%", end: "bottom top", scrub: .6 } });
  });

  /* ---------- step lists: scroll-filled progress bars ---------- */
  $(".steps").forEach(function (ol) {
    $("li", ol).forEach(function (li) {
      var bar = document.createElement("div"); bar.className = "bar"; bar.innerHTML = "<i></i>";
      li.insertBefore(bar, li.firstChild);
      var fill = bar.firstChild;
      ST.create({
        trigger: li, start: "top 80%", end: "top 40%", scrub: .4,
        onUpdate: function (s) { fill.style.transform = "scaleX(" + s.progress + ")"; li.classList.toggle("lit", s.progress > .05); }
      });
    });
  });

  /* ---------- cursor spotlight on cards ---------- */
  $(".card").forEach(function (c) {
    c.addEventListener("pointermove", function (e) { var r = c.getBoundingClientRect(); c.style.setProperty("--mx", (e.clientX - r.left) + "px"); c.style.setProperty("--my", (e.clientY - r.top) + "px"); });
  });

  /* ---------- magnetic primary buttons + floating button ---------- */
  function magnet(el, s) {
    var qx = G.quickTo(el, "x", { duration: .5, ease: "power3.out" }), qy = G.quickTo(el, "y", { duration: .5, ease: "power3.out" });
    el.addEventListener("pointermove", function (e) { var r = el.getBoundingClientRect(); qx((e.clientX - r.left - r.width / 2) * s); qy((e.clientY - r.top - r.height / 2) * s); });
    el.addEventListener("pointerleave", function () { qx(0); qy(0); });
  }
  $("[data-magnet]").forEach(function (b) { magnet(b, .28); });
  window.__aiMagnet = magnet;

  /* ---------- flow diagram shimmer ---------- */
  flows.forEach(function (fl) {
    var ns = "http://www.w3.org/2000/svg", svg = document.createElementNS(ns, "svg");
    svg.setAttribute("viewBox", "0 0 1000 520"); svg.setAttribute("preserveAspectRatio", "none"); svg.setAttribute("aria-hidden", "true");
    var shimmers = [];
    fl.paths.forEach(function (p) {
      var d = "M" + p.x + " " + p.y + " Q" + p.mx + " " + p.my + " 500 260";
      var base = document.createElementNS(ns, "path"); base.setAttribute("d", d); base.setAttribute("fill", "none"); base.setAttribute("stroke", "rgba(255,255,255,.16)"); base.setAttribute("stroke-width", "1.5");
      var sh = document.createElementNS(ns, "path"); sh.setAttribute("d", d); sh.setAttribute("fill", "none"); sh.setAttribute("stroke", "#FFC528"); sh.setAttribute("stroke-width", "2.5"); sh.setAttribute("stroke-linecap", "round");
      sh.setAttribute("pathLength", "500"); sh.setAttribute("stroke-dasharray", "36 464"); sh.style.filter = "drop-shadow(0 0 6px rgba(255,197,40,.9))";
      svg.appendChild(base); svg.appendChild(sh); shimmers.push(sh);
    });
    fl.el.insertBefore(svg, fl.el.firstChild);
    shimmers.forEach(function (s, i) { G.fromTo(s, { strokeDashoffset: 500 }, { strokeDashoffset: 0, duration: 2.6, repeat: -1, ease: "none", delay: i * .3 }); });
    /* The -50% centring only belongs to the desktop ring layout. Under 700px the
       chips are static, flex-wrapped pills (see ai.css); shifting them there
       pushed every chip half a width left and up, so they overlapped. */
    var ring = window.matchMedia("(min-width: 701px)").matches;
    if (ring) G.set(fl.chips, { xPercent: -50, yPercent: -50 });
    /* Phones get the static network from ai-flow-m.js (nodes stay put so labels stay readable). */
    if (ring) G.from(fl.chips, { scale: .3, opacity: 0, stagger: .08, duration: .8, ease: "back.out(1.6)", scrollTrigger: { trigger: fl.el, start: "top 75%", once: true } });
  });

  /* ---------- desktop-only pinned scenes ---------- */
  var mm = G.matchMedia();
  mm.add("(min-width: 901px)", function () {
    var pin = AIS.querySelector(".pin"), st = AIS.querySelector(".story"), sc = AIS.querySelector(".scrub");

    if (pin) {
      root.classList.add("js-pin");
      var base = pin.querySelector(".pin__base"), tiles = $(".pin__t", pin);
      var tl = G.timeline({ scrollTrigger: { trigger: pin, start: "top top", end: "+=1900", pin: true, scrub: .8, invalidateOnRefresh: true, anticipatePin: 1 } });
      tl.fromTo(base, { scale: .82 }, { scale: 1, duration: .5, ease: "power3.out" });
      tiles.forEach(function (t, i) {
        tl.fromTo(t, {
          x: function () { var b = base.getBoundingClientRect(), r = t.getBoundingClientRect(); return (b.left + b.width / 2) - (r.left + r.width / 2) + (parseFloat(G.getProperty(t, "x")) || 0) * 0; },
          y: function () { var b = base.getBoundingClientRect(), r = t.getBoundingClientRect(); return (b.top + b.height / 2) - (r.top + r.height / 2); },
          scale: .3, rotation: G.utils.random(-28, 28), opacity: 0
        }, { x: 0, y: 0, scale: 1, rotation: 0, opacity: 1, duration: 1, ease: "power3.out", immediateRender: true }, .15 + i * .07);
      });
    }

    if (st) {
      root.classList.add("js-story");
      $('a[href="#how"]').forEach(function (a) { a.setAttribute("href", "#story"); });
      var texts = $(".story__t", st), plates = $(".plate", st), active = -1;
      G.set(texts, { opacity: 0, y: 40 });
      G.set(plates, { xPercent: -50, yPercent: -50, opacity: 0, y: 40, scale: .96 });
      var dots = document.createElement("div"); dots.className = "story__dots"; dots.setAttribute("aria-hidden", "true");
      plates.forEach(function () { dots.appendChild(document.createElement("i")); });
      st.querySelector(".story__plates").appendChild(dots);
      function place(idx) {
        plates.forEach(function (p, i) {
          G.to(p, { opacity: i === idx ? 1 : 0, y: i === idx ? 0 : (i < idx ? -36 : 36), scale: i === idx ? 1 : .97, duration: .75, ease: "power3.out", overwrite: "auto" });
          p.classList.toggle("on", i === idx);
        });
        Array.prototype.forEach.call(dots.children, function (d, i) { d.classList.toggle("on", i === idx); });
        texts.forEach(function (t, i) { G.to(t, { opacity: i === idx ? 1 : 0, y: i === idx ? 0 : (i < idx ? -40 : 40), duration: .6, ease: "power3.out", overwrite: "auto" }); });
      }
      place(0); active = 0;
      ST.create({
        trigger: st, start: "top top", end: "+=2400", pin: true, anticipatePin: 1,
        onUpdate: function (s) { var i = Math.min(2, Math.floor(s.progress * 3)); if (i !== active) { active = i; place(i); } }
      });
    }

    if (sc) {
      root.classList.add("js-scrub");
      var pages = $(".bframe__p", sc);
      G.set(pages.slice(1), { yPercent: 100 });
      var tl2 = G.timeline({ scrollTrigger: { trigger: sc, start: "top top", end: "+=2400", pin: true, scrub: .7, anticipatePin: 1 } });
      pages.slice(1).forEach(function (p, i) {
        tl2.to(p, { yPercent: 0, duration: 1, ease: "power2.inOut" }, i * 1.3);
        tl2.to(pages[i], { scale: .95, opacity: .55, duration: 1, ease: "power2.inOut" }, i * 1.3);
      });
      tl2.to({}, { duration: .3 });
    }

    return function () { root.classList.remove("js-pin", "js-story", "js-scrub"); };
  });

  /* ---------- draggable 3D slideshow ---------- */
  $("[data-ss]").forEach(function (ss) {
    var track = ss.querySelector(".ss__track"), slides = $(".ss__s", ss), N = slides.length, i = 0, playing = true, visible = true, dragging = false, sx = 0, tx = 0, moved = 0;
    var pauseBtn = ss.querySelector("[data-pause]");
    function xFor(k) { var s = slides[k]; return ss.clientWidth / 2 - (s.offsetLeft + s.offsetWidth / 2); }
    function render(anim) {
      G.to(track, { x: xFor(i), duration: anim ? .95 : 0, ease: "power3.out", overwrite: "auto" });
      slides.forEach(function (s, k) {
        var d = k - i;
        G.to(s, { scale: d === 0 ? 1 : .84, opacity: d === 0 ? 1 : .42, rotationY: Math.max(-1, Math.min(1, d)) * -16, transformPerspective: 1200, duration: anim ? .95 : 0, ease: "power3.out" });
      });
    }
    function clamp(k) { return Math.max(0, Math.min(N - 1, k)); }
    setTimeout(function () { render(false); }, 60);
    window.addEventListener("resize", function () { render(false); });
    ss.addEventListener("pointerdown", function (e) {
      if (e.target.closest("button")) return;
      dragging = true; moved = 0; sx = e.clientX; tx = G.getProperty(track, "x"); ss.setPointerCapture(e.pointerId);
    });
    ss.addEventListener("pointermove", function (e) { if (!dragging) return; moved = e.clientX - sx; G.set(track, { x: tx + moved }); });
    function up() {
      if (!dragging) return; dragging = false;
      if (Math.abs(moved) > 60) i = clamp(i + (moved < 0 ? 1 : -1));
      render(true);
    }
    ss.addEventListener("pointerup", up); ss.addEventListener("pointercancel", up);
    ss.querySelector("[data-prev]").addEventListener("click", function () { i = clamp(i - 1); render(true); });
    ss.querySelector("[data-next]").addEventListener("click", function () { i = clamp(i + 1); render(true); });
    pauseBtn.addEventListener("click", function () {
      playing = !playing; pauseBtn.setAttribute("aria-pressed", String(!playing)); pauseBtn.lastChild.textContent = playing ? "Pause" : "Play";
    });
    if ("IntersectionObserver" in window) new IntersectionObserver(function (es) { visible = es[0].isIntersecting; }).observe(ss);
    setInterval(function () { if (playing && visible && !dragging) { i = (i + 1) % N; render(true); } }, 4200);
  });

  /* everything is set up: recompute trigger positions once fonts and layout settle */
  window.addEventListener("load", function () { ST.refresh(); });
})();

/* ---------- ambient background motion graphics (waveform + drifting blobs) ---------- */
(function () {
  var AIS = document.querySelector(".ai-scope"); if (!AIS) return;
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return;
  AIS.querySelectorAll("[data-mgfx]").forEach(function (host) {
    host.classList.add("mgfx-host");
    var cv = document.createElement("canvas");
    cv.className = "mgfx"; cv.setAttribute("aria-hidden", "true");
    host.insertBefore(cv, host.firstChild);
    var ctx = cv.getContext("2d"), dpr = Math.min(2, window.devicePixelRatio || 1), W = 0, H = 0, t = 0, vis = true;
    var kind = host.getAttribute("data-mgfx");
    var blobs = Array.from({ length: 4 }, function (_, i) {
      return { a: Math.random() * 6.28, s: .15 + Math.random() * .1, r: .18 + i * .05, hueBlob: i % 2 };
    });
    function size() {
      var r = host.getBoundingClientRect(); W = r.width; H = r.height;
      cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    size(); window.addEventListener("resize", size);
    if ("IntersectionObserver" in window) new IntersectionObserver(function (es) { vis = es[0].isIntersecting; }).observe(host);
    function drawBlobs() {
      ctx.clearRect(0, 0, W, H);
      blobs.forEach(function (b) {
        b.a += b.s * 0.01;
        var cx = W / 2 + Math.cos(b.a) * W * b.r, cy = H * .5 + Math.sin(b.a * 1.3) * H * .3;
        var rad = Math.max(W, H) * .32;
        var g = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad);
        g.addColorStop(0, b.hueBlob ? "rgba(29,78,216,.16)" : "rgba(255,197,40,.14)");
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, rad, 0, 6.283); ctx.fill();
      });
    }
    function drawWave() {
      ctx.clearRect(0, 0, W, H);
      var mid = H / 2, bars = Math.round(W / 10);
      for (var i = 0; i < bars; i++) {
        var x = i * (W / bars);
        var amp = (Math.sin(i * .5 + t * .04) * .5 + .5) * (Math.sin(i * .13 + t * .015) * .5 + .5);
        var h = 6 + amp * H * .32;
        ctx.fillStyle = i % 5 === 0 ? "rgba(255,197,40,.35)" : "rgba(29,78,216,.16)";
        var w = (W / bars) * .5;
        ctx.beginPath();
        ctx.roundRect ? ctx.roundRect(x, mid - h / 2, w, h, w / 2) : ctx.rect(x, mid - h / 2, w, h);
        ctx.fill();
      }
    }
    (function loop() {
      if (vis) { t++; kind === "wave" ? drawWave() : drawBlobs(); }
      requestAnimationFrame(loop);
    })();
  });
})();

/* ---------- "The six services" interactive showcase: click/hover to select, auto-advance ---------- */
(function () {
  var AIS = document.querySelector(".ai-scope"); if (!AIS) return;
  var host = AIS.querySelector("[data-svcx]");
  if (!host) return;
  var items = Array.from(host.querySelectorAll(".svcx__item"));
  var frames = Array.from(host.querySelectorAll(".svcx__frame"));
  var N = items.length, cur = 0, timer = null, hovering = false, visible = true;
  var DUR = 5600;

  function show(i, restartAll) {
    if (i === cur && !restartAll) return;
    items[cur].classList.remove("is-active"); items[cur].setAttribute("aria-pressed", "false");
    frames[cur].classList.remove("is-active"); frames[cur].setAttribute("tabindex", "-1");
    cur = i;
    items[cur].classList.add("is-active"); items[cur].setAttribute("aria-pressed", "true");
    frames[cur].classList.add("is-active"); frames[cur].setAttribute("tabindex", "0");
    items.forEach(function (it, k) {
      var bar = it.querySelector(".svcx__bar i");
      bar.style.animation = "none"; bar.offsetHeight; bar.style.animation = "";
    });
  }
  function next() { show((cur + 1) % N); }
  function restart() {
    clearInterval(timer);
    timer = setInterval(function () { if (!hovering && visible) next(); }, DUR);
  }
  items.forEach(function (it, i) {
    it.addEventListener("click", function () { show(i, true); restart(); });
    it.addEventListener("pointerenter", function () { show(i, true); });
    it.addEventListener("focus", function () { show(i, true); });
  });
  host.addEventListener("pointerenter", function () { hovering = true; });
  host.addEventListener("pointerleave", function () { hovering = false; });
  if ("IntersectionObserver" in window) new IntersectionObserver(function (es) { visible = es[0].isIntersecting; }).observe(host);
  restart();
})();

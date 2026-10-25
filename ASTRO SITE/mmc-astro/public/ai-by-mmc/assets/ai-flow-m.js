/* AI by MMC: phone layout of the "Works with the tools you already use" network (<= 700px).
   Nodes are placed by CSS (see ai-by-mmc.css, "flow on phones"). This script only draws the connections, measured from the real
   rendered boxes so every curve stays attached to its pill and to the hub, and runs a few yellow pulses towards the hub.
   Desktop keeps the ring layout from ai-motion.js. Pulses pause off-screen and are skipped for prefers-reduced-motion. */
(function () {
  "use strict";
  var mq = window.matchMedia("(max-width: 700px)");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var NS = "http://www.w3.org/2000/svg";
  document.querySelectorAll(".ai-scope [data-flow]").forEach(function (fl) {
    var hub = fl.querySelector(".flow__hub"), nodes = [].slice.call(fl.querySelectorAll(".flow__n"));
    if (!hub || !nodes.length) return;
    var svg = null, pulses = [], timer = null, seen = false, next = 0;

    function build() {
      if (svg) { svg.remove(); svg = null; }
      pulses = [];
      if (!mq.matches) return;
      var fr = fl.getBoundingClientRect(), W = fr.width, H = fr.height;
      var hr = hub.getBoundingClientRect(), hx = hr.left - fr.left + hr.width / 2, hy = hr.top - fr.top + hr.height / 2, R = hr.width / 2;
      svg = document.createElementNS(NS, "svg");
      svg.setAttribute("class", "flow__m"); svg.setAttribute("aria-hidden", "true");
      svg.setAttribute("viewBox", "0 0 " + W + " " + H); svg.setAttribute("preserveAspectRatio", "none");
      var rects = nodes.map(function (n) { var r = n.getBoundingClientRect(); return { l: r.left - fr.left, t: r.top - fr.top, w: r.width, h: r.height }; });
      nodes.forEach(function (n, i) {
        var r = rects[i], cx = r.l + r.w / 2, cy = r.t + r.h / 2, dx = hx - cx, dy = hy - cy, len = Math.hypot(dx, dy) || 1;
        /* start on the pill's border, facing the hub: intersect the centre-to-hub ray with the rectangle */
        var k = Math.min(r.w / 2 / (Math.abs(dx) || 1e-6), r.h / 2 / (Math.abs(dy) || 1e-6));
        var sx = cx + dx * k, sy = cy + dy * k;
        var ex = hx - dx / len * R, ey = hy - dy / len * R;
        var mx = (sx + ex) / 2, my = (sy + ey) / 2, nl = Math.hypot(ex - sx, ey - sy) || 1;
        var bend = Math.min(26, nl * .16) * (cx < hx ? 1 : -1) * (i % 2 ? 1 : -1) * 0 + Math.min(24, nl * .14) * (cx < hx ? -1 : 1);
        var qx = mx + (-(ey - sy) / nl) * bend, qy = my + ((ex - sx) / nl) * bend;
        var d = "M" + sx.toFixed(1) + " " + sy.toFixed(1) + " Q" + qx.toFixed(1) + " " + qy.toFixed(1) + " " + ex.toFixed(1) + " " + ey.toFixed(1);
        var base = document.createElementNS(NS, "path");
        base.setAttribute("d", d); base.setAttribute("class", "flow__line"); base.setAttribute("fill", "none"); base.dataset.i = i;
        svg.appendChild(base);
        var pu = document.createElementNS(NS, "path");
        pu.setAttribute("d", d); pu.setAttribute("class", "flow__pulse"); pu.setAttribute("fill", "none"); pu.setAttribute("pathLength", "100");
        pu.addEventListener("animationend", function () { pu.classList.remove("on"); });
        svg.appendChild(pu); pulses.push(pu);
      });
      fl.insertBefore(svg, fl.firstChild);
    }

    function fire() {
      if (!seen || !pulses.length) return;
      var p = pulses[next % pulses.length]; next += 3; /* step by 3 so neighbours rarely light together */
      if (next % pulses.length === 0) next += 1;
      p.classList.remove("on"); void p.getBoundingClientRect(); p.classList.add("on");
    }
    function start() { if (reduce || timer || !svg) return; fire(); timer = setInterval(fire, 1150); }
    function stop() { clearInterval(timer); timer = null; }

    function relayout() { stop(); build(); if (seen) start(); }
    if (window.ResizeObserver) new ResizeObserver(function () { relayout(); }).observe(fl);
    window.addEventListener("resize", relayout);
    (mq.addEventListener ? mq.addEventListener.bind(mq, "change") : mq.addListener.bind(mq))(relayout);
    document.fonts && document.fonts.ready && document.fonts.ready.then(relayout);

    fl.classList.add("flow--m-js");
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          seen = e.isIntersecting;
          if (e.isIntersecting) { fl.classList.add("is-in"); fl.classList.remove("is-off"); start(); } else { fl.classList.add("is-off"); stop(); }
        });
      }, { threshold: .25 }).observe(fl);
    } else { fl.classList.add("is-in"); seen = true; start(); }
    relayout();
  });
})();

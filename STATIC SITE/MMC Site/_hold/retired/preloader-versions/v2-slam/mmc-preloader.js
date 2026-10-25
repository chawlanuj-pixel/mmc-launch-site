/*!
 * MMC preloader - "SLAM" (option 2). Pure vector code animation: inline SVG + vanilla JS + CSS.
 * No video, no raster, no libraries, no network. One pure render(t) driven by one clock.
 * ?mmcpre_t=<sec> freezes at t  |  ?preloader=force|off
 * API: window.MMCPreloader = { play(force), render(t), skip(), freeze(t), DUR, onBeat }
 * onBeat names: 'hit' (1.55) 'lock' (3.10) 'lift' (3.40) 'done' (4.05)
 */
(function () {
  'use strict';
  if (window.MMCPreloader && window.MMCPreloader.__v === 'slam1') return;

  var MAXDT = 0.05, DUR = 4.05, T_LOCK = 3.10, T_LIFT = 3.40, CAP_MS = 6000;
  var NAVY = '#040816', BLUE = '#1A478F', YEL = '#FBB615', WHITE = '#FFFFFF';
  var SX = 347.5, SY = 591.6;
  var M_D = 'M30.38 563.7 L30.38 126.64 C30.38 42.12 123.76 1.2 189.82 54.72 L292.54 137.95 C310.72 152.68 317.76 160.9 347.46 160.9 C377.16 160.9 384.2 152.68 402.38 137.95 L505.1 54.72 C571.16 1.2 664.54 42.12 664.54 126.64 L664.54 563.7 A27.6 27.6 0 0 1 636.94 591.31 L528.88 591.31 A26.67 26.67 0 0 1 502.5 568.59 A156.77 156.77 0 0 0 192.42 568.59 A26.67 26.67 0 0 1 166.04 591.31 L57.98 591.31 A27.6 27.6 0 0 1 30.38 563.7Z';
  var LP_D = 'M30.38 563.7 L30.38 126.64 C30.38 42.12 123.76 1.2 189.82 54.72 L192.42 56.83 L192.42 568.59 A26.67 26.67 0 0 1 166.04 591.31 L57.98 591.31 A27.6 27.6 0 0 1 30.38 563.7Z';
  var BR_D = 'M191.42 56.02 L292.54 137.95 C310.72 152.68 317.76 160.9 347.46 160.9 C377.16 160.9 384.2 152.68 402.38 137.95 L503.5 56.02 L503.5 568.59 L502.5 568.59 A156.77 156.77 0 0 0 192.42 568.59 L191.42 568.59Z';
  var RP_D = 'M502.5 568.59 L502.5 56.83 L505.1 54.72 C571.16 1.2 664.54 42.12 664.54 126.64 L664.54 563.7 A27.6 27.6 0 0 1 636.94 591.31 L528.88 591.31 A26.67 26.67 0 0 1 502.5 568.59Z';
  var SUN_D = 'M237.28 591.36 L457.7 591.36 A18.7 18.7 0 0 0 476.14 569.5 A130.52 130.52 0 0 0 218.84 569.5 A18.7 18.7 0 0 0 237.28 591.36Z';
  var RAYS = [
    { x1: 347.74, y1: 401.65, x2: 347.73, y2: 279.78, w: 15.12, o: 0 },
    { x1: 274.22, y1: 417.76, x2: 234.04, y2: 348.08, w: 14.76, o: 1 },
    { x1: 420.72, y1: 418.5, x2: 460.91, y2: 348.89, w: 14.77, o: 1 },
    { x1: 206.19, y1: 464.05, x2: 170.55, y2: 443.47, w: 14.79, o: 2 },
    { x1: 488.84, y1: 464.81, x2: 524.35, y2: 444.27, w: 14.82, o: 2 }
  ];
  // Outlined Raleway Bold caps, one line, justified to the M width (x 30.38..664.54), baseline y 712
  var WORDS = [{"x0":30.38,"x1":205.3,"d":"M55.3 712V694.2L48.4 707.5H45.4L38.5 694.2V712H33.2V684.9H38.9L46.9 700.3L55 684.9H60.6V712ZM78.9 712.2Q76 712.2 73.5 711Q71.1 709.9 69.4 707.9Q67.6 706 66.7 703.5Q65.7 701 65.7 698.4Q65.7 695.7 66.7 693.3Q67.8 690.8 69.5 688.9Q71.3 687 73.7 685.8Q76.2 684.7 79.1 684.7Q82 684.7 84.4 685.9Q86.8 687.1 88.6 689.1Q90.3 691 91.2 693.5Q92.2 695.9 92.2 698.5Q92.2 701.2 91.2 703.7Q90.2 706.1 88.4 708Q86.6 710 84.2 711.1Q81.8 712.2 78.9 712.2ZM71.1 698.4Q71.1 700.2 71.6 701.8Q72.1 703.5 73.2 704.8Q74.2 706 75.6 706.8Q77.1 707.5 79 707.5Q80.9 707.5 82.4 706.8Q83.9 706 84.9 704.7Q85.8 703.3 86.4 701.7Q86.9 700.1 86.9 698.4Q86.9 696.7 86.3 695.1Q85.8 693.4 84.8 692.2Q83.7 690.9 82.3 690.1Q80.8 689.4 79 689.4Q77 689.4 75.6 690.2Q74.1 691 73.1 692.3Q72.1 693.6 71.6 695.2Q71.1 696.8 71.1 698.4ZM102.6 694.6V712H97.4V684.9H101.6L115.6 702.8V684.9H120.9V712H116.5ZM127.6 712V684.9H137.5Q141.9 684.9 144.9 686.7Q147.9 688.5 149.4 691.6Q150.9 694.7 150.9 698.4Q150.9 702.5 149.2 705.6Q147.6 708.6 144.6 710.3Q141.6 712 137.5 712ZM145.6 698.4Q145.6 695.8 144.6 693.8Q143.6 691.8 141.9 690.6Q140.1 689.5 137.5 689.5H132.9V707.4H137.5Q140.1 707.4 141.9 706.2Q143.7 705.1 144.6 703Q145.6 701 145.6 698.4ZM163.5 684.9H168.8L178.8 712H173.4L170.9 705.2H161.4L158.9 712H153.5ZM169.9 701.5 166.2 690.4 162.3 701.5ZM186 684.9 192.7 697.6 199.5 684.9H205.1L195.3 702.5V712H190.1V702.5L180.3 684.9Z"},{"x0":219.04,"x1":452.1,"d":"M244 712V694.2L237 707.5H234.1L227.1 694.2V712H221.9V684.9H227.5L235.5 700.3L243.6 684.9H249.2V712ZM263.4 684.9H268.7L278.7 712H273.3L270.8 705.2H261.3L258.8 712H253.4ZM269.8 701.5 266.1 690.4 262.2 701.5ZM282.8 712V684.9H294.8Q296.7 684.9 298.3 685.7Q299.9 686.4 301 687.7Q302.2 689 302.8 690.6Q303.4 692.2 303.4 693.9Q303.4 695.6 302.9 697.2Q302.3 698.8 301.2 700Q300 701.2 298.6 701.8L304.7 712H298.9L293.4 702.9H288.1V712ZM288.1 698.3H294.7Q295.7 698.3 296.5 697.7Q297.2 697.1 297.7 696.1Q298.1 695.1 298.1 693.9Q298.1 692.6 297.6 691.6Q297.1 690.7 296.2 690.1Q295.4 689.5 294.5 689.5H288.1ZM309.4 712V684.9H314.6V697.8L326 684.9H331.8L321.4 696.9L332.5 712H326.5L318.1 700.3L314.6 703.9V712ZM354.9 707.4V712H336V684.9H354.5V689.5H341.3V696H352.7V700.3H341.3V707.4ZM380.4 689.5H371.7V712H366.5V689.5H357.8V684.9H380.4ZM384.9 712V684.9H390.2V712ZM402.2 694.6V712H397V684.9H401.2L415.2 702.8V684.9H420.5V712H416.1ZM438.5 712.2Q435.9 712.2 433.5 711.1Q431.2 710.1 429.4 708.2Q427.6 706.3 426.6 703.8Q425.6 701.2 425.6 698.3Q425.6 695.5 426.6 693Q427.6 690.6 429.4 688.7Q431.2 686.8 433.6 685.8Q436 684.7 438.9 684.7Q442.7 684.7 445.4 686.3Q448.1 687.9 449.5 690.6L445.6 693.5Q444.5 691.5 442.7 690.4Q440.8 689.4 438.7 689.4Q436.9 689.4 435.5 690.1Q434.1 690.8 433.1 692.1Q432.1 693.3 431.5 695Q430.9 696.6 430.9 698.4Q430.9 700.4 431.5 702Q432.1 703.7 433.2 704.9Q434.3 706.1 435.8 706.8Q437.2 707.5 439 707.5Q441 707.5 442.9 706.5Q444.8 705.4 446.4 703.3V708.5Q443 712.2 438.5 712.2ZM446.1 701.9H440.6V698.1H450.4V712H446.1Z"},{"x0":465.84,"x1":664.54,"d":"M467 698.3Q467 695.8 467.9 693.4Q468.8 691 470.5 689Q472.3 687.1 474.7 685.9Q477.2 684.7 480.4 684.7Q484.1 684.7 486.9 686.4Q489.6 688 490.9 690.7L486.9 693.4Q486.2 691.9 485.1 691Q484 690.1 482.7 689.8Q481.5 689.4 480.2 689.4Q478.2 689.4 476.8 690.2Q475.3 691 474.3 692.3Q473.3 693.6 472.8 695.2Q472.4 696.8 472.4 698.4Q472.4 700.2 472.9 701.9Q473.5 703.5 474.6 704.8Q475.6 706.1 477.1 706.8Q478.6 707.6 480.3 707.6Q481.6 707.6 482.9 707.2Q484.2 706.7 485.3 705.8Q486.4 704.9 487 703.4L491.3 705.9Q490.5 708 488.7 709.4Q486.9 710.8 484.6 711.5Q482.4 712.2 480.2 712.2Q477.3 712.2 474.8 711Q472.4 709.8 470.7 707.8Q469 705.8 468 703.3Q467 700.8 467 698.3ZM507.6 712.2Q504.6 712.2 502.2 711Q499.7 709.9 498 707.9Q496.3 706 495.3 703.5Q494.4 701 494.4 698.4Q494.4 695.7 495.4 693.3Q496.4 690.8 498.2 688.9Q499.9 687 502.4 685.8Q504.8 684.7 507.7 684.7Q510.6 684.7 513 685.9Q515.5 687.1 517.2 689.1Q518.9 691 519.9 693.5Q520.8 695.9 520.8 698.5Q520.8 701.2 519.8 703.7Q518.8 706.1 517.1 708Q515.3 710 512.9 711.1Q510.4 712.2 507.6 712.2ZM499.7 698.4Q499.7 700.2 500.2 701.8Q500.8 703.5 501.8 704.8Q502.8 706 504.3 706.8Q505.7 707.5 507.6 707.5Q509.5 707.5 511 706.8Q512.5 706 513.5 704.7Q514.5 703.3 515 701.7Q515.5 700.1 515.5 698.4Q515.5 696.7 515 695.1Q514.4 693.4 513.4 692.2Q512.4 690.9 510.9 690.1Q509.4 689.4 507.6 689.4Q505.7 689.4 504.2 690.2Q502.7 691 501.7 692.3Q500.7 693.6 500.2 695.2Q499.7 696.8 499.7 698.4ZM548.1 712V694.2L541.2 707.5H538.2L531.3 694.2V712H526V684.9H531.7L539.7 700.3L547.8 684.9H553.4V712ZM560.2 712V684.9H571.7Q573.5 684.9 575.1 685.7Q576.7 686.4 577.8 687.7Q579 689 579.6 690.6Q580.3 692.2 580.3 693.9Q580.3 696.2 579.2 698.3Q578.2 700.3 576.3 701.6Q574.4 702.9 571.9 702.9H565.4V712ZM565.4 698.3H571.5Q572.5 698.3 573.3 697.8Q574 697.2 574.5 696.2Q574.9 695.2 574.9 693.9Q574.9 692.5 574.4 691.5Q573.9 690.5 573.1 690Q572.3 689.5 571.3 689.5H565.4ZM592.5 684.9H597.8L607.8 712H602.4L599.8 705.2H590.4L587.9 712H582.5ZM598.9 701.5 595.1 690.4 591.2 701.5ZM617.2 694.6V712H611.9V684.9H616.1L630.1 702.8V684.9H635.4V712H631ZM645.2 684.9 651.9 697.6 658.7 684.9H664.4L654.5 702.5V712H649.3V702.5L639.5 684.9Z"}];

  function clamp01(x) { return x < 0 ? 0 : x > 1 ? 1 : x; }
  function seg(t, a, b) { return clamp01((t - a) / (b - a)); }
  function outBack(x, c) { var u = x - 1; return 1 + (c + 1) * u * u * u + c * u * u; }
  function bezier(x1, y1, x2, y2) {
    return function (x) {
      if (x <= 0) return 0; if (x >= 1) return 1;
      var cx = 3 * x1, bx = 3 * (x2 - x1) - cx, ax = 1 - cx - bx;
      var cy = 3 * y1, by = 3 * (y2 - y1) - cy, ay = 1 - cy - by, u = x, i, d, v;
      for (i = 0; i < 8; i++) { v = ((ax * u + bx) * u + cx) * u - x; if (Math.abs(v) < 1e-6) break; d = (3 * ax * u + 2 * bx) * u + cx; if (Math.abs(d) < 1e-6) break; u -= v / d; }
      if (u < 0 || u > 1 || Math.abs(((ax * u + bx) * u + cx) * u - x) > 1e-4) {
        var lo = 0, hi = 1; u = x;
        for (i = 0; i < 30; i++) { v = ((ax * u + bx) * u + cx) * u; if (v < x) lo = u; else hi = u; u = (lo + hi) / 2; }
      }
      return ((ay * u + by) * u + cy) * u;
    };
  }
  var eDoor = bezier(.2, .8, .2, 1), eDrop = bezier(.55, 0, .15, 1), eLift = bezier(.7, 0, .2, 1);
  function f(n) { return Math.round(n * 1000) / 1000; }

  var NS = 'http://www.w3.org/2000/svg';
  function E(tag, a, p) {
    var e = document.createElementNS(NS, tag);
    if (a) for (var k in a) e.setAttribute(k, a[k]);
    if (p) p.appendChild(e);
    return e;
  }
  function A(e, k, v) { var c = '_' + k; if (e[c] === v) return; e[c] = v; e.setAttribute(k, v); }

  var S = { mounted: false, root: null, svg: null, N: {}, vw: 0, vh: 0, K: 1, TX: 0, TY: 0, SAG: 0, HW: 0, D: 0,
            offP: 0, offB: 0, wOff: [0, 0, 0], playing: false, frozen: false, raf: 0, t0: 0, hid: 0, hidAt: 0,
            curT: 0, fired: {}, capTimer: 0, skipAt: 0, skipping: false, rmTimers: [], lockPrev: null, will: false };
  var api = { __v: 'slam1', DUR: DUR, onBeat: null };

  function viewport() {
    var vv = window.visualViewport, w = window.innerWidth || document.documentElement.clientWidth, h = window.innerHeight || document.documentElement.clientHeight;
    if (vv && vv.width && vv.height) { w = Math.round(vv.width); h = Math.round(Math.max(vv.height, h)); }
    return [Math.max(w, 200), Math.max(h, 200)];
  }

  function injectCSS() {
    if (document.getElementById('mmc-pre-css')) return;
    var s = document.createElement('style'); s.id = 'mmc-pre-css';
    s.textContent = '#mmc-pre{position:fixed;left:0;top:0;width:100%;z-index:2147483000;background:transparent;overflow:visible;touch-action:none;-webkit-tap-highlight-color:transparent;cursor:pointer;shape-rendering:geometricPrecision}' +
      '#mmc-pre svg{display:block;position:absolute;left:0;top:0;overflow:visible}' +
      '#mmc-pre .mmc-skip{position:absolute;right:18px;font:600 12px/1 Raleway,"Helvetica Neue",Arial,sans-serif;letter-spacing:.14em;text-transform:uppercase;color:#fff;background:none;border:0;padding:10px 6px;cursor:pointer;opacity:0}' +
      '#mmc-pre .mmc-skip:focus-visible{outline:1px solid #fff;outline-offset:2px}' +
      'html.mmc-pre-lock{overflow:hidden!important;scrollbar-gutter:stable}';
    (document.head || document.documentElement).appendChild(s);
  }

  function build() {
    var N = S.N = {};
    var root = S.root = document.createElement('div');
    root.id = 'mmc-pre'; root.setAttribute('role', 'presentation'); root.setAttribute('aria-hidden', 'true');
    var svg = S.svg = E('svg', { xmlns: NS, 'shape-rendering': 'geometricPrecision' }, root);
    var defs = E('defs', 0, svg);
    N.clip = E('clipPath', { id: 'mmcp-sunclip' }, defs);
    E('rect', { x: 180, y: 300, width: 335, height: 291.36 }, N.clip);
    N.bg = E('path', { fill: NAVY }, svg);
    var lock = N.lock = E('g', 0, svg);
    N.mgroup = E('g', 0, lock);
    N.lp = E('path', { d: LP_D, fill: BLUE }, N.mgroup);
    N.br = E('path', { d: BR_D, fill: BLUE }, N.mgroup);
    N.rp = E('path', { d: RP_D, fill: BLUE }, N.mgroup);
    N.mbody = E('path', { d: M_D, fill: BLUE, display: 'none' }, N.mgroup);
    var sw = E('g', { 'clip-path': 'url(#mmcp-sunclip)' }, lock);
    N.sun = E('path', { d: SUN_D, fill: YEL, display: 'none' }, sw);
    N.rays = RAYS.map(function (r) {
      return E('line', { x1: r.x1, y1: r.y1, x2: r.x1, y2: r.y1, stroke: YEL, 'stroke-width': r.w, 'stroke-linecap': 'round', display: 'none' }, lock);
    });
    N.words = WORDS.map(function (w) { return E('path', { d: w.d, fill: WHITE }, lock); });
    var b = N.skip = document.createElement('button');
    b.type = 'button'; b.className = 'mmc-skip'; b.textContent = 'Skip'; b.tabIndex = -1;
    root.appendChild(b);
  }

  function layout() {
    var v = viewport(), vw = v[0], vh = v[1];
    S.vw = vw; S.vh = vh;
    var SAG = Math.min(260, Math.max(90, 0.18 * vw));
    var K = Math.min(vw * (vw < 700 ? 0.60 : 0.42) / 634.16, vh * 0.56 / 682);
    S.K = K; S.SAG = SAG; S.TX = vw / 2; S.TY = 0.5 * vh;
    S.HW = vw / (2 * K) + 24;
    S.D = vh + SAG + 12;
    var H = vh + 8 + SAG, R = (vw * vw / 4 + SAG * SAG) / (2 * SAG);
    S.root.style.height = H + 'px';
    A(S.svg, 'width', vw); A(S.svg, 'height', H); A(S.svg, 'viewBox', '0 0 ' + vw + ' ' + H);
    A(S.N.bg, 'd', 'M0 0 H' + vw + ' V' + H + ' A' + f(R) + ' ' + f(R) + ' 0 0 0 0 ' + H + ' Z');
    A(S.N.lock, 'transform', 'translate(' + f(S.TX) + ' ' + f(S.TY) + ') scale(' + f(K * 1e3) / 1e3 + ') translate(-347.5 -371)');
    S.offP = S.HW - 135;
    var topY = 371 - S.TY / K;
    S.offB = 568.59 - topY + 20;
    // words: 0 MONDAY from left, 1 MARKETING rises from below, 2 COMPANY from right
    S.wOff[0] = -(WORDS[0].x1 - (347.5 - S.HW) + 20);
    S.wOff[2] = (347.5 + S.HW) - WORDS[2].x0 + 20;
    S.wOff[1] = (vh - S.TY) / K + 371 - 686 + 20;
    S.N.skip.style.top = (vh - 44 - 8) + 'px';
    S.dpr = window.devicePixelRatio || 1;
    S.lockPrev = null;
  }

  function setTr(el, key, tx, ty) {
    var v = 'translate(' + f(tx) + ' ' + f(ty) + ')';
    A(el, 'transform', v);
  }

  function render(t) {
    if (!S.mounted) return;
    var N = S.N, i;
    // 1 DOORS
    var eP = eDoor(seg(t, 0.10, 0.65));
    setTr(N.lp, 0, -S.offP * (1 - eP), 0);
    setTr(N.rp, 0, S.offP * (1 - eP), 0);
    // 2 DROP
    var eB = eDrop(seg(t, 0.66, 1.14));
    setTr(N.br, 0, 0, -S.offB * (1 - eB));
    // 3 THUMP (sine bell, zero at both ends, base line fixed)
    var sb = 1 + 0.035 * Math.pow(Math.sin(Math.PI * seg(t, 1.12, 1.42)), 1.5);
    A(N.mgroup, 'transform', sb === 1 ? 'translate(0 0)' : 'translate(347.5 591.3) scale(' + f(sb * 1e5) / 1e5 + ') translate(-347.5 -591.3)');
    var swap = t >= 1.45;
    A(N.mbody, 'display', swap ? 'inline' : 'none');
    A(N.lp, 'display', swap ? 'none' : 'inline'); A(N.br, 'display', swap ? 'none' : 'inline'); A(N.rp, 'display', swap ? 'none' : 'inline');
    // 4 SUN
    var s = t <= 1.55 ? 0 : outBack(seg(t, 1.55, 2.10), 1.7);
    if (s < 0.004) A(N.sun, 'display', 'none');
    else { A(N.sun, 'display', 'inline'); A(N.sun, 'transform', 'translate(347.5 591.6) scale(' + f(s * 1e4) / 1e4 + ') translate(-347.5 -591.6)'); }
    // 5 RAYS
    for (i = 0; i < 5; i++) {
      var r = RAYS[i], st = 2.00 + 0.05 * r.o, g = t <= st ? 0 : outBack(seg(t, st, st + 0.42), 1.7), el = N.rays[i];
      if (g < 0.002) { A(el, 'display', 'none'); continue; }
      A(el, 'display', 'inline');
      A(el, 'x2', f(r.x1 + g * (r.x2 - r.x1))); A(el, 'y2', f(r.y1 + g * (r.y2 - r.y1)));
      A(el, 'stroke-width', f(r.w * Math.min(1, g / 0.15)));
    }
    // 6 WORDS
    var wS = [2.15, 2.45, 2.30];   // MONDAY, MARKETING (rises), COMPANY
    for (i = 0; i < 3; i++) {
      var e = eDoor(seg(t, wS[i], wS[i] + 0.45)), o = S.wOff[i] * (1 - e);
      if (i === 1) setTr(N.words[i], 0, 0, o); else setTr(N.words[i], 0, o, 0);
    }
    // skip label (a plain text label; fades in and out with the time)
    var so = clamp01((t - 0.8) / 0.2) * (1 - clamp01((t - 3.0) / 0.2));
    if (S.skipping) so = 0;
    if (S.N.skip._o !== so) { S.N.skip._o = so; S.N.skip.style.opacity = so < 0.01 ? 0 : f(so); S.N.skip.style.pointerEvents = so > 0.5 ? 'auto' : 'none'; }
    // LIFT: one rigid translate of the whole root
    if (t >= 3.35 && !S.will) { S.will = true; S.root.style.willChange = 'transform'; }
    var Y = 0;
    if (t > T_LIFT) { Y = -S.D * eLift(seg(t, T_LIFT, DUR)); Y = Math.round(Y * S.dpr) / S.dpr; }
    if (S.root._y !== Y) { S.root._y = Y; S.root.style.transform = Y === 0 ? '' : 'translate3d(0,' + Y + 'px,0)'; }
  }

  function lockScroll(on) {
    var h = document.documentElement;
    if (on) h.classList.add('mmc-pre-lock'); else h.classList.remove('mmc-pre-lock');
  }

  function mount() {
    if (S.mounted) return;
    injectCSS(); build();
    S.mounted = true;
    layout();
    (document.body || document.documentElement).appendChild(S.root);
    window.addEventListener('resize', onResize);
    if (window.visualViewport) window.visualViewport.addEventListener('resize', onResize);
    S.root.addEventListener('pointerdown', onPointer);
    S.N.skip.addEventListener('click', function (ev) { ev.stopPropagation(); doSkip(); });
    S.curT = 0; S.will = false; render(0);
  }
  function onResize() { if (S.mounted) { layout(); render(S.curT || 0); } }
  function unmount() {
    if (!S.mounted) return;
    window.removeEventListener('resize', onResize);
    if (window.visualViewport) window.visualViewport.removeEventListener('resize', onResize);
    window.removeEventListener('keydown', onKey, true);
    S.rmTimers.forEach(clearTimeout); S.rmTimers = [];
    if (S.root && S.root.parentNode) S.root.parentNode.removeChild(S.root);
    S.mounted = false; S.root = null; S.N = {}; S.will = false;
  }
  function onPointer(e) { if (S.playing && S.curT > 0.15) doSkip(); }
  function onKey(e) {
    if (!S.playing) return;
    var k = e.key;
    if (k === 'Escape' || k === 'Enter' || k === ' ' || k === 'Spacebar') { e.preventDefault(); doSkip(); }
  }
  function doSkip() {
    if (!S.playing || S.skipping) return;
    S.skipping = true; S.skipAt = performance.now(); mark();
    S.N.skip.style.opacity = 0;
  }
  function mark() { try { sessionStorage.setItem('mmc-pre-seen', '1'); } catch (e) { } }
  function seen() { try { return sessionStorage.getItem('mmc-pre-seen') === '1'; } catch (e) { return false; } }
  function beat(name, t) {
    var cb = api.onBeat; if (!cb) return;
    try { if (typeof cb === 'function') cb(name, t); else if (cb[name]) cb[name](t); } catch (e) { }
  }

  function finish() {
    if (!S.playing && !S.mounted) return;
    var was = S.playing;
    S.playing = false; S.skipping = false;
    cancelAnimationFrame(S.raf); clearTimeout(S.capTimer);
    try { unmount(); } finally {
      lockScroll(false);
      document.documentElement.classList.add('mmc-pre-done');
      if (was) {
        try { document.dispatchEvent(new Event('mmc:preloader-done')); } catch (e) { }
        beat('done', DUR);
      }
    }
  }
  // failsafe tied to visible time, not wall clock: a hidden tab never trips it
  function watchdog() {
    if (!S.playing) return;
    var n = performance.now();
    if (!document.hidden) S.vis += n - S.wdLast;
    S.wdLast = n;
    if (S.vis >= CAP_MS + 1500) { finish(); return; }
    S.capTimer = setTimeout(watchdog, 250);
  }
  var BEATS = [['hit', 1.55], ['lock', T_LOCK], ['lift', T_LIFT]];
  function tick(now) {
    if (!S.playing) return;
    try {
      if (S.skipping) {
        var k = (performance.now() - S.skipAt) / 180;
        if (k >= 1) { finish(); return; }
        S.root.style.opacity = f(1 - k);
      } else {
        var dt = S.last ? (now - S.last) / 1000 : 0;
        S.last = now;
        if (dt < 0) dt = 0; if (dt > MAXDT) dt = MAXDT;   // a stall or hidden tab never skips a beat
        var t = S.curT + dt;
        S.curT = t;
        if (t >= DUR) { finish(); return; }
        render(t);
        for (var i = 0; i < BEATS.length; i++) if (!S.fired[BEATS[i][0]] && t >= BEATS[i][1]) { S.fired[BEATS[i][0]] = 1; beat(BEATS[i][0], t); }
      }
      S.raf = requestAnimationFrame(tick);
    } catch (err) { finish(); throw err; }
  }

  function reduced() { try { return window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { return false; } }

  function play(force) {
    if (S.playing) return;
    if (!force && seen()) return;
    if (S.mounted) unmount();
    document.documentElement.classList.remove('mmc-pre-done');
    S.frozen = false; S.fired = {}; S.last = 0; S.vis = 0; S.wdLast = performance.now(); S.skipping = false;
    mount(); S.playing = true; lockScroll(true); mark();
    S.curT = 0; S.capTimer = setTimeout(watchdog, 250);
    if (reduced()) {
      S.N.skip.style.display = 'none';
      S.curT = 3.10; render(3.10);
      S.rmTimers.push(setTimeout(function () {
        if (!S.root) return;
        S.root.style.transition = 'opacity .25s linear'; S.root.style.opacity = 0;
      }, 600));
      S.rmTimers.push(setTimeout(finish, 880));
      window.addEventListener('keydown', onKey, true);
      return;
    }
    window.addEventListener('keydown', onKey, true);
    S.raf = requestAnimationFrame(tick);
  }
  function freeze(t) {
    if (S.playing) finish();
    if (S.mounted) unmount();
    mount(); S.frozen = true; S.curT = t; render(t);
    S.root.style.pointerEvents = 'none';
  }

  api.play = play; api.skip = doSkip; api.freeze = freeze;
  api.render = function (t) { if (!S.mounted) return; S.curT = t; render(t); };
  window.MMCPreloader = api;

  var q = /[?&]mmcpre_t=([0-9.]+)/.exec(location.search), pm = /[?&]preloader=(\w+)/.exec(location.search);
  function boot() {
    if (q) { freeze(parseFloat(q[1])); return; }
    if (pm && pm[1] === 'off') return;
    play(!!(pm && pm[1] === 'force'));
  }
  boot();
})();

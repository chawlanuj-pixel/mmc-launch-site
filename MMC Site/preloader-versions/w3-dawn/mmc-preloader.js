/*!
 * MMC preloader - Option 3 "DAWN" (white theme port)
 * Pure vector code animation: inline SVG + vanilla JS + CSS. No video, no raster, no libraries, no network.
 * One deterministic render(t) driven by one clock. ?mmcpre_t=<seconds> freezes at t.
 * API: window.MMCPreloader = { play(force), render(t), skip(), freeze(t), DUR, onBeat }
 */
(function () {
  'use strict';
  if (window.MMCPreloader && window.MMCPreloader.__v === 'w3') return;

  /* ---------------------------------------------------------------- constants */
  var DUR = 4.05, T_LOCK = 3.10, T_LIFT = 3.40, T_HIT = 1.15, CAP_MS = 6000;
  var BG = '#FFFFFF', BLUE = '#1A478F', INK = '#0F1E5E', YEL = '#FBB615', AMBER = '#B87A00', AMBERTX = '#A96B00', TINT = '#FFF1CC';
  var GLOW = [[1.35, '#FFF1CC'], [1.75, '#FFF4D9'], [2.2, '#FFF9EB']];   // flat sun-glow bands (decorative only)
  var SX = 347.5, SY = 591.6, R_SUN = 130.52;
  var M_D = 'M30.38 563.7 L30.38 126.64 C30.38 42.12 123.76 1.2 189.82 54.72 L292.54 137.95 C310.72 152.68 317.76 160.9 347.46 160.9 C377.16 160.9 384.2 152.68 402.38 137.95 L505.1 54.72 C571.16 1.2 664.54 42.12 664.54 126.64 L664.54 563.7 A27.6 27.6 0 0 1 636.94 591.31 L528.88 591.31 A26.67 26.67 0 0 1 502.5 568.59 A156.77 156.77 0 0 0 192.42 568.59 A26.67 26.67 0 0 1 166.04 591.31 L57.98 591.31 A27.6 27.6 0 0 1 30.38 563.7Z';
  var SUN_D = 'M237.28 591.36 L457.7 591.36 A18.7 18.7 0 0 0 476.14 569.5 A130.52 130.52 0 0 0 218.84 569.5 A18.7 18.7 0 0 0 237.28 591.36Z';
  var RAYS = [
    { x1: 347.74, y1: 401.65, x2: 347.73, y2: 279.78, w: 15.12, o: 0 },
    { x1: 274.22, y1: 417.76, x2: 234.04, y2: 348.08, w: 14.76, o: 1 },
    { x1: 420.72, y1: 418.50, x2: 460.91, y2: 348.89, w: 14.77, o: 1 },
    { x1: 206.19, y1: 464.05, x2: 170.55, y2: 443.47, w: 14.79, o: 2 },
    { x1: 488.84, y1: 464.81, x2: 524.35, y2: 444.27, w: 14.82, o: 2 }
  ];
  var WORDS = ['M53.56 712V695.46L47.1 707.78H44.37L37.91 695.46V712H33.01V686.79H38.26L45.72 701.14L53.24 686.79H58.46V712ZM76.6 712.18Q73.84 712.18 71.58 711.11Q69.33 710.05 67.71 708.22Q66.1 706.39 65.21 704.1Q64.32 701.81 64.32 699.4Q64.32 696.88 65.26 694.59Q66.2 692.3 67.85 690.5Q69.5 688.71 71.76 687.66Q74.01 686.62 76.71 686.62Q79.44 686.62 81.7 687.72Q83.95 688.82 85.55 690.66Q87.15 692.51 88.04 694.78Q88.92 697.05 88.92 699.47Q88.92 701.95 88 704.24Q87.08 706.53 85.43 708.33Q83.78 710.12 81.52 711.15Q79.27 712.18 76.6 712.18ZM69.29 699.4Q69.29 701.03 69.79 702.56Q70.29 704.08 71.23 705.27Q72.17 706.46 73.53 707.15Q74.9 707.85 76.64 707.85Q78.41 707.85 79.8 707.12Q81.18 706.39 82.11 705.17Q83.03 703.94 83.51 702.43Q83.99 700.92 83.99 699.4Q83.99 697.76 83.47 696.26Q82.96 694.75 82.02 693.56Q81.08 692.37 79.71 691.68Q78.34 690.98 76.64 690.98Q74.83 690.98 73.46 691.71Q72.1 692.44 71.17 693.65Q70.25 694.85 69.77 696.34Q69.29 697.84 69.29 699.4ZM99.72 695.81V712H94.82V686.79H98.72L111.75 703.41V686.83H116.65V712H112.57ZM124.04 712V686.79H133.2Q137.32 686.79 140.08 688.48Q142.85 690.17 144.24 693.03Q145.62 695.88 145.62 699.36Q145.62 703.2 144.1 706.04Q142.57 708.88 139.78 710.44Q137 712 133.2 712ZM140.69 699.36Q140.69 696.91 139.8 695.05Q138.91 693.18 137.24 692.14Q135.58 691.09 133.2 691.09H128.94V707.7H133.2Q135.61 707.7 137.28 706.62Q138.95 705.54 139.82 703.64Q140.69 701.74 140.69 699.36ZM158.44 686.79H163.41L172.68 712H167.64L165.29 705.72H156.49L154.18 712H149.14ZM164.4 702.27 160.93 691.87 157.3 702.27ZM180.42 686.79 186.63 698.65 192.95 686.79H198.24L189.08 703.2V712H184.22V703.12L175.09 686.79Z',
    'M246.41 712V695.46L239.95 707.78H237.22L230.76 695.46V712H225.86V686.79H231.11L238.57 701.14L246.09 686.79H251.31V712ZM265.55 686.79H270.52L279.79 712H274.75L272.4 705.72H263.6L261.29 712H256.25ZM271.51 702.27 268.04 691.87 264.41 702.27ZM284.69 712V686.79H295.84Q297.57 686.79 299.05 687.5Q300.52 688.22 301.6 689.42Q302.69 690.63 303.27 692.12Q303.86 693.61 303.86 695.17Q303.86 696.77 303.31 698.24Q302.76 699.72 301.73 700.82Q300.7 701.92 299.31 702.52L305.07 712H299.67L294.49 703.55H289.59V712ZM289.59 699.26H295.73Q296.65 699.26 297.36 698.71Q298.07 698.15 298.5 697.23Q298.92 696.31 298.92 695.17Q298.92 693.97 298.43 693.06Q297.93 692.16 297.17 691.62Q296.4 691.09 295.52 691.09H289.59ZM310.43 712V686.83H315.33V698.79L325.91 686.79H331.3L321.65 697.98L331.91 712H326.37L318.52 701.14L315.33 704.47V712ZM353.81 707.7V712H336.31V686.79H353.49V691.09H341.21V697.16H351.82V701.14H341.21V707.7ZM378.63 691.09H370.57V712H365.71V691.09H357.65V686.79H378.63ZM383.89 712V686.79H388.79V712ZM401.07 695.81V712H396.17V686.79H400.08L413.11 703.41V686.83H418.01V712H413.92ZM435.87 712.18Q433.42 712.18 431.23 711.18Q429.05 710.19 427.4 708.43Q425.75 706.67 424.83 704.33Q423.9 701.99 423.9 699.26Q423.9 696.66 424.83 694.37Q425.75 692.08 427.42 690.35Q429.09 688.61 431.32 687.61Q433.56 686.62 436.19 686.62Q439.74 686.62 442.27 688.13Q444.81 689.63 446.09 692.12L442.43 694.82Q441.47 692.94 439.75 691.94Q438.03 690.95 436.01 690.95Q434.41 690.95 433.1 691.62Q431.78 692.3 430.82 693.47Q429.87 694.64 429.35 696.17Q428.84 697.69 428.84 699.4Q428.84 701.21 429.39 702.73Q429.94 704.26 430.95 705.4Q431.96 706.53 433.31 707.19Q434.66 707.85 436.29 707.85Q438.21 707.85 439.97 706.85Q441.72 705.86 443.25 703.94V708.77Q440.09 712.18 435.87 712.18ZM442.89 702.63H437.82V699.04H446.94V712H442.89Z',
    'M474.45 699.22Q474.45 696.91 475.29 694.69Q476.12 692.48 477.72 690.65Q479.32 688.82 481.63 687.74Q483.93 686.65 486.88 686.65Q490.36 686.65 492.9 688.18Q495.43 689.71 496.68 692.16L492.91 694.75Q492.28 693.33 491.25 692.49Q490.22 691.66 489.04 691.32Q487.87 690.98 486.74 690.98Q484.89 690.98 483.52 691.73Q482.16 692.48 481.23 693.68Q480.31 694.89 479.87 696.38Q479.42 697.87 479.42 699.36Q479.42 701.03 479.96 702.57Q480.49 704.12 481.47 705.31Q482.44 706.5 483.81 707.19Q485.18 707.88 486.81 707.88Q487.98 707.88 489.19 707.49Q490.39 707.1 491.42 706.25Q492.45 705.4 493.02 704.05L497.03 706.36Q496.29 708.24 494.6 709.55Q492.91 710.86 490.82 711.54Q488.73 712.21 486.67 712.21Q483.97 712.21 481.73 711.09Q479.5 709.98 477.88 708.11Q476.26 706.25 475.36 703.92Q474.45 701.6 474.45 699.22ZM513.22 712.18Q510.45 712.18 508.2 711.11Q505.95 710.05 504.33 708.22Q502.72 706.39 501.83 704.1Q500.94 701.81 500.94 699.4Q500.94 696.88 501.88 694.59Q502.82 692.3 504.47 690.5Q506.12 688.71 508.38 687.66Q510.63 686.62 513.33 686.62Q516.06 686.62 518.32 687.72Q520.57 688.82 522.17 690.66Q523.77 692.51 524.65 694.78Q525.54 697.05 525.54 699.47Q525.54 701.95 524.62 704.24Q523.7 706.53 522.05 708.33Q520.39 710.12 518.14 711.15Q515.89 712.18 513.22 712.18ZM505.91 699.4Q505.91 701.03 506.41 702.56Q506.9 704.08 507.85 705.27Q508.79 706.46 510.15 707.15Q511.52 707.85 513.26 707.85Q515.03 707.85 516.42 707.12Q517.8 706.39 518.73 705.17Q519.65 703.94 520.13 702.43Q520.61 700.92 520.61 699.4Q520.61 697.76 520.09 696.26Q519.58 694.75 518.64 693.56Q517.7 692.37 516.33 691.68Q514.96 690.98 513.26 690.98Q511.45 690.98 510.08 691.71Q508.71 692.44 507.79 693.65Q506.87 694.85 506.39 696.34Q505.91 697.84 505.91 699.4ZM551.99 712V695.46L545.53 707.78H542.8L536.34 695.46V712H531.44V686.79H536.69L544.15 701.14L551.67 686.79H556.89V712ZM564.28 712V686.79H574.96Q576.7 686.79 578.16 687.5Q579.61 688.22 580.7 689.42Q581.78 690.63 582.38 692.12Q582.99 693.61 582.99 695.17Q582.99 697.3 581.99 699.22Q581 701.14 579.26 702.34Q577.52 703.55 575.14 703.55H569.18V712ZM569.18 699.26H574.86Q575.75 699.26 576.46 698.76Q577.17 698.26 577.59 697.32Q578.02 696.38 578.02 695.17Q578.02 693.86 577.54 692.94Q577.06 692.01 576.3 691.55Q575.53 691.09 574.64 691.09H569.18ZM595.38 686.79H600.35L609.62 712H604.57L602.23 705.72H593.43L591.12 712H586.08ZM601.34 702.27 597.86 691.87 594.24 702.27ZM619.42 695.81V712H614.52V686.79H618.42L631.45 703.41V686.83H636.35V712H632.27ZM646.58 686.79 652.79 698.65 659.11 686.79H664.4L655.24 703.2V712H650.38V703.12L641.25 686.79Z'];
  var WORD_START = [2.15, 2.27, 2.39];

  /* ---------------------------------------------------------------- easing (pure) */
  function clamp01(x) { return x < 0 ? 0 : x > 1 ? 1 : x; }
  function seg(t, a, b) { return clamp01((t - a) / (b - a)); }
  function outCubic(x) { return 1 - Math.pow(1 - x, 3); }
  function outQuart(x) { return 1 - Math.pow(1 - x, 4); }
  function outExpo(x) { return x >= 1 ? 1 : 1 - Math.pow(2, -10 * x); }
  function inOutSine(x) { return -(Math.cos(Math.PI * x) - 1) / 2; }
  function inOutCubic(x) { return x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; }
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
  var liftEase = bezier(0.7, 0, 0.2, 1);
  function f(n) { return Math.round(n * 1000) / 1000; }

  /* ---------------------------------------------------------------- DOM helpers */
  var NS = 'http://www.w3.org/2000/svg';
  function E(tag, a, p) {
    var e = document.createElementNS(NS, tag);
    if (a) for (var k in a) e.setAttribute(k, a[k]);
    if (p) p.appendChild(e);
    return e;
  }
  function A(e, k, v) { var c = '_' + k; if (e[c] === v) return; e[c] = v; e.setAttribute(k, v); }
  function vis(e, on) { A(e, 'visibility', on ? 'visible' : 'hidden'); }

  /* ---------------------------------------------------------------- state */
  var S = { mounted: false, playing: false, frozen: false, skipping: false, root: null, svg: null, N: {},
            vw: 0, vh: 0, K: 1, TX: 0, TY: 0, SAG: 90, HW: 800, RMAX: 1500, dpr: 1,
            raf: 0, last: 0, wall: 0, born: 0, curT: 0, fired: {}, capTimer: 0, tm: [], willChange: false };
  var api = { __v: 'w3', DUR: DUR, onBeat: null };
  var BEATS = [['hit', T_HIT], ['lock', T_LOCK], ['lift', T_LIFT]];

  /* ---------------------------------------------------------------- CSS */
  function injectCSS() {
    if (document.getElementById('mmcd-css')) return;
    var st = document.createElement('style'); st.id = 'mmcd-css';
    st.textContent =
      '#mmc-pre{position:fixed;left:0;top:0;width:100%;z-index:2147483000;overflow:visible;contain:strict;touch-action:none;cursor:pointer;background:transparent;color-scheme:light;-webkit-tap-highlight-color:transparent}' +
      '#mmc-pre svg{display:block;position:absolute;left:0;top:0;shape-rendering:geometricPrecision;overflow:visible}' +
      '#mmc-pre .mmcd-skip{position:absolute;right:6px;padding:12px 14px;font:600 12px/1 "Nunito","Helvetica Neue",Arial,sans-serif;letter-spacing:.06em;color:' + INK + ';opacity:0;pointer-events:none;text-transform:none}' +
      'html.mmcd-lock{overflow:hidden;scrollbar-gutter:stable}';
    (document.head || document.documentElement).appendChild(st);
  }

  /* ---------------------------------------------------------------- build */
  function build() {
    var root = document.createElement('div');
    root.id = 'mmc-pre'; root.setAttribute('role', 'presentation'); root.setAttribute('aria-hidden', 'true');
    var svg = E('svg', { xmlns: NS }, root), N = S.N = {};
    var defs = E('defs', null, svg);
    var cpR = E('clipPath', { id: 'mmcd-rv' }, defs); N.clipC = E('circle', { cx: SX, cy: SY, r: R_SUN }, cpR);
    var cpS = E('clipPath', { id: 'mmcd-sun' }, defs); E('rect', { x: 180, y: 300, width: 335, height: 291.36 }, cpS);
    var cpG = E('clipPath', { id: 'mmcd-glow' }, defs); E('rect', { x: -200, y: 0, width: 1095, height: 591.36 }, cpG);
    var cpB = E('clipPath', { id: 'mmcd-band' }, defs); E('rect', { x: -2000, y: 660, width: 4700, height: 64 }, cpB);
    // hand-off rim (belongs to the lifting root): blue outer band + yellow inner band, drawn beneath the white dome
    N.rimB = E('path', { fill: 'none', stroke: BLUE, 'stroke-linecap': 'butt', 'stroke-linejoin': 'round' }, svg);
    N.rimY = E('path', { fill: 'none', stroke: YEL, 'stroke-linecap': 'butt', 'stroke-linejoin': 'round' }, svg);
    N.bg = E('path', { fill: BG }, svg);
    var lock = N.lock = E('g', null, svg);
    N.hair = E('line', { stroke: INK, 'stroke-linecap': 'butt' }, lock);
    var gg = E('g', { 'clip-path': 'url(#mmcd-glow)' }, lock);
    N.glow = GLOW.slice().reverse().map(function (g) { var e = E('path', { d: SUN_D, fill: g[1] }, gg); e._m = g[0]; return e; });
    E('path', { d: M_D, fill: BLUE, 'clip-path': 'url(#mmcd-rv)' }, lock);
    N.echo = E('path', { fill: 'none', stroke: BLUE, 'stroke-linecap': 'butt' }, lock);
    N.lead = E('path', { fill: 'none', stroke: AMBER, 'stroke-linecap': 'butt' }, lock);
    var sw = E('g', { 'clip-path': 'url(#mmcd-sun)' }, lock);
    N.sun = E('g', null, sw); N.sunP = E('path', { d: SUN_D, fill: YEL, stroke: AMBER, 'stroke-width': 0, 'stroke-linejoin': 'round' }, N.sun);
    N.rays = RAYS.map(function (r) { return E('line', { x1: r.x1, y1: r.y1, x2: r.x1, y2: r.y1, stroke: YEL, 'stroke-linecap': 'round', 'stroke-width': r.w }, lock); });
    N.wp = [];
    N.words = WORDS.map(function (d, i) {
      var g = E('g', { 'clip-path': 'url(#mmcd-band)' }, lock);
      var w = E('g', null, g); N.wp.push(E('path', { d: d, fill: i === 1 ? AMBERTX : BLUE }, w)); return w;
    });
    N.skip = document.createElement('div'); N.skip.className = 'mmcd-skip'; N.skip.textContent = 'Skip'; root.appendChild(N.skip);
    S.root = root; S.svg = svg;
  }

  /* ---------------------------------------------------------------- layout */
  function layout() {
    var vw = S.root.clientWidth || document.documentElement.clientWidth || window.innerWidth;
    var vh = window.innerHeight || document.documentElement.clientHeight;
    if (window.visualViewport && window.visualViewport.height) vh = Math.max(vh, Math.round(window.visualViewport.height));
    S.vw = vw; S.vh = vh; S.dpr = window.devicePixelRatio || 1;
    var SAG = Math.min(260, Math.max(90, .18 * vw)); S.SAG = SAG;
    var K = Math.min(vw * (vw < 700 ? .56 : .42) / 634.16, vh * .50 / 682); S.K = K;
    S.TX = vw / 2; S.TY = .47 * vh; S.HW = vw / (2 * K) + 24;
    var sx = S.TX, sy = S.TY + (SY - 371) * K;
    S.RMAX = Math.hypot(Math.max(sx, vw - sx), Math.max(sy, vh - sy)) / K + 60;
    var H = vh + SAG + 8, R = (vw * vw / 4 + SAG * SAG) / (2 * SAG);
    S.root.style.height = H + 'px';
    A(S.svg, 'width', vw); A(S.svg, 'height', H); A(S.svg, 'viewBox', '0 0 ' + vw + ' ' + H);
    S.svg.style.width = vw + 'px'; S.svg.style.height = H + 'px';
    A(S.N.bg, 'd', 'M0 0H' + vw + 'V' + f(H) + 'A' + f(R) + ' ' + f(R) + ' 0 0 0 0 ' + f(H) + 'Z');
    A(S.N.lock, 'transform', 'translate(' + f(S.TX) + ' ' + f(S.TY) + ') scale(' + f(K * 10000) / 10000 + ') translate(-347.5 -371)');
    S.N.skip.style.top = (vh - 46) + 'px';
    // rim: leading dome arc, extended 30px past both sides (off-screen), widths scale on phones
    var cx = vw / 2, cy = H - SAG + R, ex = 30, bw = vw >= 768 ? 6 : 5, bb = vw >= 768 ? 12 : 10;
    function yAt(x) { return cy - Math.sqrt(Math.max(0, R * R - (x - cx) * (x - cx))); }
    var rd = 'M' + f(-ex) + ' ' + f(yAt(-ex)) + 'A' + f(R) + ' ' + f(R) + ' 0 0 1 ' + f(vw + ex) + ' ' + f(yAt(vw + ex));
    A(S.N.rimB, 'd', rd); A(S.N.rimB, 'stroke-width', 2 * (bb + bw));
    A(S.N.rimY, 'd', rd); A(S.N.rimY, 'stroke-width', 2 * bw);
    S.D = vh + SAG + 12 + 20;
    A(S.N.wp[1], 'fill', 25.2 * K >= 24 ? YEL : AMBERTX);
    S.sc = Math.max(1, 3.2 / (4.5 * K));       // keeps the front at least ~3 px wide on small screens
    S.hw0 = Math.max(2, 2 / K);                // hairline at least 2 px
  }

  /* ---------------------------------------------------------------- render(t): pure function of t */
  function rF(t) { return R_SUN + (S.RMAX - R_SUN) * inOutCubic(seg(t, T_HIT, 2.65)); }
  function arc(r) { return 'M' + f(SX - r) + ' ' + SY + 'A' + f(r) + ' ' + f(r) + ' 0 0 1 ' + f(SX + r) + ' ' + SY; }

  function render(t) {
    var N = S.N, i, p, w;
    // L1 hairline
    p = outExpo(seg(t, .06, .60));
    w = S.hw0 * (1 - inOutSine(seg(t, 2.00, 2.55)));
    if (p > 0 && w >= .05) {
      vis(N.hair, 1);
      A(N.hair, 'x1', f(SX - S.HW * p)); A(N.hair, 'x2', f(SX + S.HW * p));
      A(N.hair, 'y1', f(603 + w / 2)); A(N.hair, 'y2', f(603 + w / 2)); A(N.hair, 'stroke-width', f(w));
    } else vis(N.hair, 0);

    // L2 reveal circle + L3 rings
    var r = rF(t);
    A(N.clipC, 'r', f(r));
    var x = seg(t, T_HIT, 2.65), wl = 4.5 * Math.min(1, x / .06) * Math.pow(1 - x, 1.2);
    if (wl >= .2) { vis(N.lead, 1); A(N.lead, 'd', arc(r)); A(N.lead, 'stroke-width', f(wl * S.sc)); } else vis(N.lead, 0);
    var te = t - .09, re = rF(te), xe = seg(te, T_HIT, 2.65), we = 2.5 * Math.min(1, xe / .06) * Math.pow(1 - xe, 1.2) * S.sc;
    var wlS = wl >= .2 ? wl * S.sc : 0;
    we = Math.min(we, 2 * (r - wlS / 2 - re - .5));
    if (we >= .2) { vis(N.echo, 1); A(N.echo, 'd', arc(re)); A(N.echo, 'stroke-width', f(we)); } else vis(N.echo, 0);

    // L4 sun
    var dy = 132 * (1 - inOutSine(seg(t, .10, 1.10)));
    if (dy >= 131.5) vis(N.sun, 0);
    else {
      vis(N.sun, 1);
      var sw0 = (2 / S.K) * (1 - inOutSine(seg(t, 1.35, 1.85)));   // amber gold-coin edge while the sun is alone on white
      A(N.sunP, 'stroke-width', sw0 < .05 ? 0 : f(sw0));
      var s = 1 + .03 * Math.pow(Math.sin(Math.PI * seg(t, T_HIT, 1.55)), 1.5);
      A(N.sun, 'transform', 'translate(0 ' + f(dy) + ') translate(' + SX + ' ' + SY + ') scale(' + f(s * 10000) / 10000 + ') translate(' + (-SX) + ' ' + (-SY) + ')');
    }

    // flat glow bands (scale only): copies of the sun silhouette that swell around it as it tops out,
    // then gather back into it as the front launches. They rise with the sun and share its baseline clip.
    var gr = inOutSine(seg(t, .35, 1.10)), shr = 1 - outCubic(seg(t, T_HIT, 1.55));
    for (i = 0; i < 3; i++) {
      var ge = N.glow[i], gs = 1 + (ge._m - 1) * gr * shr;
      if (gs <= 1.003 || dy >= 131.5) { vis(ge, 0); continue; }
      vis(ge, 1);
      A(ge, 'transform', 'translate(0 ' + f(dy) + ') translate(' + SX + ' ' + SY + ') scale(' + f(gs * 10000) / 10000 + ') translate(' + (-SX) + ' ' + (-SY) + ')');
    }

    // L5 rays
    for (i = 0; i < 5; i++) {
      var ry = RAYS[i], sj = 1.50 + .10 * ry.o, g = outCubic(seg(t, sj, sj + .55)), e = N.rays[i];
      if (g < .002) { vis(e, 0); continue; }
      vis(e, 1);
      A(e, 'x2', f(ry.x1 + (ry.x2 - ry.x1) * g)); A(e, 'y2', f(ry.y1 + (ry.y2 - ry.y1) * g));
      A(e, 'stroke-width', f(ry.w * Math.min(1, g / .15)));
    }

    // L6 wordmark
    for (i = 0; i < 3; i++) {
      var d = 56 * (1 - outQuart(seg(t, WORD_START[i], WORD_START[i] + .60)));
      if (d >= 55.5) vis(N.words[i], 0); else { vis(N.words[i], 1); A(N.words[i], 'transform', 'translate(0 ' + f(d) + ')'); }
    }

    // skip label (UI only)
    N.skip.style.opacity = f(seg(t, .8, 1.05) * (1 - seg(t, 2.9, 3.1)));

    // hand-off: rigid lift of the whole root
    if (t >= 3.35 && !S.willChange) { S.root.style.willChange = 'transform'; S.willChange = true; }
    var Y = -S.D * liftEase(seg(t, T_LIFT, DUR));
    Y = Math.round(Y * S.dpr) / S.dpr;
    if (S.root._Y !== Y) { S.root._Y = Y; S.root.style.transform = Y === 0 ? '' : 'translate3d(0,' + Y + 'px,0)'; }
  }

  /* ---------------------------------------------------------------- lifecycle */
  function later(fn, ms) { var id = setTimeout(fn, ms); S.tm.push(id); return id; }
  function mount() {
    if (S.mounted) return;
    injectCSS(); build();
    document.documentElement.classList.add('mmcd-lock');
    (document.body || document.documentElement).appendChild(S.root);
    S.mounted = true; S.willChange = false;
    layout();
    window.addEventListener('resize', onResize);
    if (window.visualViewport) window.visualViewport.addEventListener('resize', onResize);
    S.root.addEventListener('click', onSkip);
    S.curT = 0; render(0);
  }
  function onResize() { if (S.mounted) { layout(); render(S.curT); } }
  function unmount() {
    if (!S.mounted) return;
    window.removeEventListener('resize', onResize);
    if (window.visualViewport) window.visualViewport.removeEventListener('resize', onResize);
    window.removeEventListener('keydown', onKey, true);
    document.removeEventListener('visibilitychange', onVis);
    if (S.root.parentNode) S.root.parentNode.removeChild(S.root);
    document.documentElement.classList.remove('mmcd-lock');
    S.mounted = false; S.root = null; S.N = {};
  }
  function mark() { try { sessionStorage.setItem('mmc-pre-seen', '1'); } catch (e) { } }
  function seen() { try { return sessionStorage.getItem('mmc-pre-seen') === '1'; } catch (e) { return false; } }
  function beat(name, t) {
    var cb = api.onBeat; if (!cb) return;
    try { if (typeof cb === 'function') cb(name, t); else if (cb[name]) cb[name](t); } catch (e) { }
  }
  function finish() {
    var was = S.playing;
    S.playing = false; S.skipping = false;
    cancelAnimationFrame(S.raf); clearTimeout(S.capTimer);
    S.tm.forEach(clearTimeout); S.tm = [];
    unmount();
    if (!was) return;
    document.documentElement.classList.add('mmc-pre-done');
    try { document.dispatchEvent(new Event('mmc:preloader-done')); } catch (e) { }
    beat('done', DUR);
  }
  function onVis() { S.last = 0; }   // resume without a time jump
  function tick(now) {
    if (!S.playing || S.skipping) return;
    try {
      // clamp the per-frame advance so a main-thread stall (or hidden tab) slows the sting instead of skipping beats
      var dt = S.last ? (now - S.last) / 1000 : 0; S.last = now; S.wall = now;
      if (dt < 0) dt = 0; if (dt > .05) dt = .05;
      var t = S.curT + dt;
      S.curT = t;
      if (t >= DUR) { finish(); return; }
      render(t);
      for (var i = 0; i < BEATS.length; i++) if (!S.fired[BEATS[i][0]] && t >= BEATS[i][1]) { S.fired[BEATS[i][0]] = 1; beat(BEATS[i][0], t); }
      S.raf = requestAnimationFrame(tick);
    } catch (err) { finish(); if (window.console) console.error(err); }
  }
  function forced() { try { return window.matchMedia('(forced-colors: active)').matches; } catch (e) { return false; } }
  function reduced() { try { return window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { return false; } }

  function onSkip(ev) { if (S.playing && S.curT > .3) doSkip(); }
  function onKey(e) {
    if (!S.playing) return;
    if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') { e.preventDefault(); if (S.curT > .3) doSkip(); }
  }
  function doSkip() {
    if (!S.playing || S.skipping || S.curT >= T_LIFT) return;
    S.skipping = true; mark();
    cancelAnimationFrame(S.raf);
    S.root.style.transition = 'opacity 250ms linear'; S.root.style.opacity = '0';
    later(finish, 270);
  }

  // failsafe tied to animation progress, not wall clock: only fires if frames stopped arriving or the run is absurdly long
  function watchdog() {
    if (!S.playing) return;
    var now = performance.now();
    if (now - S.wall > 4000 || now - S.born > 30000) { finish(); return; }
    S.capTimer = setTimeout(watchdog, 1000);
  }
  function play(force) {
    if (S.playing) return;
    if (!force && seen()) return;
    if (forced()) { mark(); return; }
    if (S.mounted) unmount();
    document.documentElement.classList.remove('mmc-pre-done');
    mount(); S.frozen = false; S.playing = true; S.skipping = false; S.fired = {}; S.last = 0; S.wall = S.born = performance.now();
    mark();
    S.capTimer = setTimeout(watchdog, CAP_MS);
    window.addEventListener('keydown', onKey, true);
    if (reduced()) {
      S.curT = 0; render(T_LOCK); S.N.skip.style.opacity = '0';
      later(function () { if (S.root) { S.root.style.transition = 'opacity 200ms linear'; S.root.style.opacity = '0'; } }, 500);
      later(finish, 720);
      return;
    }
    document.addEventListener('visibilitychange', onVis);
    S.raf = requestAnimationFrame(tick);
  }
  function freeze(t) {
    if (S.playing) finish();
    if (S.mounted) unmount();
    mount(); S.frozen = true; S.curT = t; render(t);
    S.root.style.pointerEvents = 'none';
  }

  api.play = play; api.skip = doSkip; api.freeze = freeze;
  api.render = function (t) { if (!S.mounted) mount(); S.curT = t; render(t); };
  api.easing = { outCubic: outCubic, inOutCubic: inOutCubic, outExpo: outExpo, outQuart: outQuart, bezier: bezier };
  window.MMCPreloader = api;

  /* ---------------------------------------------------------------- boot */
  function boot() {
    var q = /[?&]mmcpre_t=([0-9.]+)/.exec(location.search), pm = /[?&]preloader=(\w+)/.exec(location.search);
    if (q) { freeze(parseFloat(q[1])); return; }
    if (pm && pm[1] === 'off') return;
    play(!!(pm && pm[1] === 'force'));
  }
  boot();
})();

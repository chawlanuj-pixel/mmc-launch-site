/*!
 * MMC preloader v2 - "Drawn, Then Lit"
 * Pure vector code animation: inline SVG + vanilla JS + CSS. No video, no raster, no libraries.
 * One deterministic render(t) driven by one clock. ?mmcpre_t=<seconds> freezes at t.
 * API: window.MMCPreloader = { play(force), render(t), skip(), DUR, onBeat }
 */
(function () {
  'use strict';
  if (window.MMCPreloader && window.MMCPreloader.__v === 2) return;

  /* ------------------------------------------------------------------ constants */
  var DUR = 4.3, T_SNAP = 2.42, T_DUM = 2.95, T_LOCK = 3.6;
  var NW = 9, NAVY = '#040816', BLUE = '#1A478F', LIT = '#7098E8', PEN = '#7FA6F0', YEL = '#FBB615';
  var RING_BASE = '#E4ECFA';
  var SX = 347.5, SY = 591.6;               // pivot (sun / arch centre)
  var CX = 347.5, CY = 348;                 // content centre (mark + wordmark)
  var R_SUN = 130.52, R_ARCH = 156.77, R_RING = 143.65, RING_W = 26.25, R_INNER = 190;
  var CAP_MS = 4500;
  var M_D = 'M30.38 563.7 L30.38 126.64 C30.38 42.12 123.76 1.2 189.82 54.72 L292.54 137.95 C310.72 152.68 317.76 160.9 347.46 160.9 C377.16 160.9 384.2 152.68 402.38 137.95 L505.1 54.72 C571.16 1.2 664.54 42.12 664.54 126.64 L664.54 563.7 A27.6 27.6 0 0 1 636.94 591.31 L528.88 591.31 A26.67 26.67 0 0 1 502.5 568.59 A156.77 156.77 0 0 0 192.42 568.59 A26.67 26.67 0 0 1 166.04 591.31 L57.98 591.31 A27.6 27.6 0 0 1 30.38 563.7Z';
  // the same outline split into two pens that start at the arch apex and meet at the V-notch
  var TRACE_L = 'M347.46 435.05 A156.77 156.77 0 0 0 192.42 568.59 A26.67 26.67 0 0 1 166.04 591.31 L57.98 591.31 A27.6 27.6 0 0 1 30.38 563.7 L30.38 126.64 C30.38 42.12 123.76 1.2 189.82 54.72 L292.54 137.95 C310.72 152.68 317.76 160.9 347.46 160.9';
  var TRACE_R = 'M347.46 435.05 A156.77 156.77 0 0 1 502.5 568.59 A26.67 26.67 0 0 0 528.88 591.31 L636.94 591.31 A27.6 27.6 0 0 0 664.54 563.7 L664.54 126.64 C664.54 42.12 571.16 1.2 505.1 54.72 L402.38 137.95 C384.2 152.68 377.16 160.9 347.46 160.9';
  var SUN_D = 'M237.28 591.36 L457.7 591.36 A18.7 18.7 0 0 0 476.14 569.5 A130.52 130.52 0 0 0 218.84 569.5 A18.7 18.7 0 0 0 237.28 591.36Z';
  var RING_MID = 144.05, RING_STROKE = 27.1;   // outer edge tucks 0.8u under the M so no anti-alias seam shows
  var RING_D = 'M203.41 591.31A144.05 144.05 0 0 1 491.51 591.31';
  var ANCHORS = [[347.46, 435.05], [192.42, 568.59], [57.98, 591.31], [30.38, 126.64], [189.82, 54.72], [292.54, 137.95]];
  // rays: inner end, outer end, width, own direction (a 30-degree family, NOT radial), draw order (centre-out)
  var RAYS = [
    { x1: 347.74, y1: 401.65, x2: 347.73, y2: 279.78, w: 15.12, dx: 0, dy: -1, deg: 90, o: 0 },
    { x1: 274.22, y1: 417.76, x2: 234.04, y2: 348.08, w: 14.76, dx: -0.5, dy: -0.866025, deg: 120, o: 1 },
    { x1: 420.72, y1: 418.5, x2: 460.91, y2: 348.89, w: 14.77, dx: 0.5, dy: -0.866025, deg: 60, o: 1 },
    { x1: 206.19, y1: 464.05, x2: 170.55, y2: 443.47, w: 14.79, dx: -0.866025, dy: -0.5, deg: 150, o: 2 },
    { x1: 488.84, y1: 464.81, x2: 524.35, y2: 444.27, w: 14.82, dx: 0.866025, dy: -0.5, deg: 30, o: 2 }
  ];
  var WORD = 'MONDAY MARKETING COMPANY';
  var FONT = '"Raleway","Helvetica Neue",Arial,sans-serif';

  /* ------------------------------------------------------------------ pure helpers / easing */
  function clamp01(x) { return x < 0 ? 0 : x > 1 ? 1 : x; }
  function seg(t, a, b) { return clamp01((t - a) / (b - a)); }
  function lerp(a, b, x) { return a + (b - a) * x; }
  function outCubic(x) { return 1 - Math.pow(1 - x, 3); }
  function inCubic(x) { return x * x * x; }
  function inOutCubic(x) { return x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; }   // power3.inOut
  function outExpo(x) { return x >= 1 ? 1 : 1 - Math.pow(2, -10 * x); }                          // expo.out
  function outBack(x, c) { c = c == null ? 1.70158 : c; var u = x - 1; return 1 + (c + 1) * u * u * u + c * u * u; } // back.out
  function outSpring(x) { return x <= 0 ? 0 : x >= 1 ? 1 : 1 - Math.pow(2, -9 * x) * Math.cos(x * 9.4); }       // elastic-ish
  function bezier(x1, y1, x2, y2) {                                                             // cubic-bezier solver
    return function (x) {
      if (x <= 0) return 0; if (x >= 1) return 1;
      var cx = 3 * x1, bx = 3 * (x2 - x1) - cx, ax = 1 - cx - bx;
      var cy = 3 * y1, by = 3 * (y2 - y1) - cy, ay = 1 - cy - by, u = x, i, d, v;
      for (i = 0; i < 8; i++) { v = ((ax * u + bx) * u + cx) * u - x; if (Math.abs(v) < 1e-5) break; d = (3 * ax * u + 2 * bx) * u + cx; if (Math.abs(d) < 1e-6) break; u -= v / d; }
      var lo = 0, hi = 1; if (u < 0 || u > 1) { u = x; for (i = 0; i < 20; i++) { v = ((ax * u + bx) * u + cx) * u; if (v < x) lo = u; else hi = u; u = (lo + hi) / 2; } }
      return ((ay * u + by) * u + cy) * u;
    };
  }
  var portalEase = bezier(.7, 0, .2, 1);
  function f(n) { return Math.round(n * 1000) / 1000; }

  /* ------------------------------------------------------------------ DOM helpers */
  var NS = 'http://www.w3.org/2000/svg';
  function E(tag, a, p) {
    var e = document.createElementNS(NS, tag);
    if (a) for (var k in a) e.setAttribute(k, a[k]);
    if (p) p.appendChild(e);
    return e;
  }
  function A(e, k, v) { var c = '_' + k; if (e[c] === v) return; e[c] = v; e.setAttribute(k, v); }
  function draw(el, len, p) { el.setAttribute('stroke-dasharray', len + ' ' + (len + 4)); el.setAttribute('stroke-dashoffset', f(len * (1 - p))); }
  function pol(cx, cy, r, deg) { var a = deg * Math.PI / 180; return [cx + r * Math.cos(a), cy - r * Math.sin(a)]; }

  /* ------------------------------------------------------------------ state */
  var S = { mounted: false, root: null, svg: null, k: 1, vw: 0, vh: 0, x0: 0, y0: 0, W: 0, H: 0, Rmax: 1000,
            playing: false, frozen: false, raf: 0, t0: 0, off: 0, last: 0, nf: 0, sumDt: 0, lite: false, watch: 0, maskOn: false, hval: -1, sunKey: '', capTimer: 0, fired: {}, lastT: -1,
            sw: [], N: {}, grid: [], glyphs: [], gw: [], gwUnit: 0, lastDone: false };
  var api = { __v: 2, DUR: DUR, onBeat: null };
  var BEATS = [['tick', .10], ['compass', .30], ['guides', .80], ['rays', 1.15], ['freeze', 2.25], ['snap', T_SNAP], ['dum', T_DUM], ['wordmark', 3.10], ['portal', T_LOCK], ['done', DUR]];

  /* ------------------------------------------------------------------ CSS */
  function injectCSS() {
    if (document.getElementById('mmc-pre-css')) return;
    var s = document.createElement('style'); s.id = 'mmc-pre-css';
    s.textContent = '#mmc-pre{position:fixed;left:0;top:0;width:100%;height:100%;z-index:99999;visibility:visible;background:' + NAVY + ';contain:strict;overflow:hidden;touch-action:none;-webkit-tap-highlight-color:transparent}' +
      '#mmc-pre.mmc-pre-thru{pointer-events:none;background:transparent}' +
      '#mmc-pre svg{display:block;position:absolute;left:0;top:0;width:100%;height:100%}' +
      '#mmc-pre .mmc-skip{position:absolute;top:18px;right:20px;font:500 12px/1 ' + FONT + ';letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,.6);background:none;border:1px solid rgba(255,255,255,.22);border-radius:99px;padding:9px 14px;cursor:pointer;opacity:0;transition:opacity .3s}' +
      '#mmc-pre .mmc-skip:hover,#mmc-pre .mmc-skip:focus-visible{color:#fff;border-color:rgba(255,255,255,.6);outline:none}' +
      '#mmc-pre.mmc-pre-rm{transition:opacity .25s ease;opacity:0}';
    (document.head || document.documentElement).appendChild(s);
  }

  /* ------------------------------------------------------------------ build */
  function build() {
    var root = document.createElement('div');
    root.id = 'mmc-pre'; root.setAttribute('aria-hidden', 'true'); root.setAttribute('role', 'presentation');
    var svg = E('svg', { xmlns: NS, preserveAspectRatio: 'xMidYMid meet' }); root.appendChild(svg);
    var N = S.N = {}; S.sw = []; S.grid = [];
    var defs = E('defs', 0, svg);
    var cp = E('clipPath', { id: 'mmcp-flood' }, defs); N.clip = E('circle', { cx: SX, cy: SY, r: 0 }, cp);
    var rg = E('radialGradient', { id: 'mmcp-bloom' }, defs);
    E('stop', { offset: 0, 'stop-color': '#FFE9A6', 'stop-opacity': 1 }, rg);
    E('stop', { offset: .28, 'stop-color': YEL, 'stop-opacity': .55 }, rg);
    E('stop', { offset: .62, 'stop-color': '#F59A10', 'stop-opacity': .10 }, rg);
    E('stop', { offset: 1, 'stop-color': '#F59A10', 'stop-opacity': 0 }, rg);
    var fg = E('radialGradient', { id: 'mmcp-flash' }, defs);
    E('stop', { offset: 0, 'stop-color': '#FFFFFF', 'stop-opacity': 1 }, fg);
    E('stop', { offset: .22, 'stop-color': '#FFF4CF', 'stop-opacity': .8 }, fg);
    E('stop', { offset: .55, 'stop-color': '#FBC53A', 'stop-opacity': .28 }, fg);
    E('stop', { offset: 1, 'stop-color': '#F59A10', 'stop-opacity': 0 }, fg);
    N.hz = E('rect', {}, E('clipPath', { id: 'mmcp-hz' }, defs));
    N.hc = E('rect', {}, E('clipPath', { id: 'mmcp-hc' }, defs));
    N.wg = RAYS.map(function (r, i) {
      var g = E('linearGradient', { id: 'mmcp-wg' + i, gradientUnits: 'userSpaceOnUse' }, defs);
      E('stop', { offset: 0, 'stop-color': YEL, 'stop-opacity': 1 }, g);
      E('stop', { offset: .5, 'stop-color': YEL, 'stop-opacity': .5 }, g);
      E('stop', { offset: 1, 'stop-color': YEL, 'stop-opacity': 0 }, g);
      return g;
    });
    var mk = E('mask', { id: 'mmcp-portal', maskUnits: 'userSpaceOnUse' }, defs);
    N.mRect = E('rect', { fill: '#fff' }, mk); N.hole = E('circle', { cx: SX, cy: SY, r: 0, fill: '#000', 'clip-path': 'url(#mmcp-hc)' }, mk);

    N.bg = E('rect', { fill: NAVY }, svg);
    var SQ = 'translate(' + SX + ' ' + SY + ') scale(1 .6) translate(' + (-SX) + ' ' + (-SY) + ')';
    N.bloom = E('circle', { cx: SX, cy: SY, r: 440, fill: 'url(#mmcp-bloom)', opacity: 0, transform: SQ }, E('g', { 'clip-path': 'url(#mmcp-hz)' }, svg));
    // wedges: two nested polygons per ray, angle-locked
    N.wedges = [];
    var gw = E('g', { style: 'mix-blend-mode:screen', opacity: 0 }, svg);
    N.gw = gw;
    RAYS.forEach(function (r, i) { var a = []; for (var w = 0; w < NW; w++) a.push(E('polygon', { fill: w > NW - 3 ? 'url(#mmcp-wg' + i + ')' : 'url(#mmcp-wg' + i + ')', opacity: w > NW - 3 ? .06 : .045 }, gw)); N.wedges.push(a); });

    var world = N.world = E('g', 0, svg);
    var bp = N.bp = E('g', 0, world);
    N.gGrid = E('g', 0, bp);
    var s1 = function (el, px, extra) { S.sw.push([el, px]); return el; };
    // crop marks around the M bounding box
    var c = 22, bx0 = 30.38 - 34, bx1 = 664.54 + 34, by0 = 30.33 - 34, by1 = 591.31 + 34;
    N.crop = E('path', { d: 'M' + bx0 + ' ' + (by0 + c) + 'V' + by0 + 'H' + (bx0 + c) + 'M' + (bx1 - c) + ' ' + by0 + 'H' + bx1 + 'V' + (by0 + c) + 'M' + bx1 + ' ' + (by1 - c) + 'V' + by1 + 'H' + (bx1 - c) + 'M' + (bx0 + c) + ' ' + by1 + 'H' + bx0 + 'V' + (by1 - c),
      fill: 'none', stroke: LIT, 'vector-effect': 'non-scaling-stroke', 'stroke-width': 1, opacity: 0 }, bp);
    N.ghost = E('path', { fill: 'none', stroke: LIT, 'stroke-width': 1, 'vector-effect': 'non-scaling-stroke', opacity: 0 }, bp);
    N.prot = E('path', { fill: 'none', stroke: LIT, 'stroke-width': 1, 'vector-effect': 'non-scaling-stroke', opacity: 0 }, bp);
    N.protArc = s1(E('path', { fill: 'none', stroke: LIT, opacity: 0, d: 'M' + (SX - 340) + ' ' + SY + 'A340 340 0 0 1 ' + (SX + 340) + ' ' + SY }, bp), 1);
    N.gd = []; N.gl = [];
    RAYS.forEach(function (r) {
      N.gd.push(E('line', { stroke: LIT, 'stroke-width': 1, 'vector-effect': 'non-scaling-stroke', opacity: 0 }, bp));
      var tx = E('text', { fill: LIT, 'text-anchor': 'middle', opacity: 0, 'font-family': 'ui-monospace,Menlo,Consolas,monospace' }, bp);
      tx.textContent = r.deg + '°'; N.gl.push(tx);
    });
    N.arc1 = s1(E('path', { fill: 'none', stroke: YEL, d: 'M' + (SX - R_SUN) + ' ' + SY + 'A' + R_SUN + ' ' + R_SUN + ' 0 0 1 ' + (SX + R_SUN) + ' ' + SY, opacity: 0 }, bp), 2);
    N.arc2 = s1(E('path', { fill: 'none', stroke: '#fff', d: 'M' + (SX + R_ARCH) + ' ' + SY + 'A' + R_ARCH + ' ' + R_ARCH + ' 0 0 0 ' + (SX - R_ARCH) + ' ' + SY, opacity: 0 }, bp), 2);
    N.leg1 = E('line', { stroke: YEL, 'stroke-width': 1.5, 'vector-effect': 'non-scaling-stroke', opacity: 0 }, bp);
    N.leg2 = E('line', { stroke: '#fff', 'stroke-width': 1.5, 'vector-effect': 'non-scaling-stroke', opacity: 0 }, bp);
    N.tip1 = E('circle', { fill: YEL, opacity: 0 }, bp); N.tip2 = E('circle', { fill: '#fff', opacity: 0 }, bp);
    N.trL = s1(E('path', { d: TRACE_L, fill: 'none', stroke: PEN, 'stroke-linejoin': 'round', opacity: 0 }, bp), 2);
    N.trR = s1(E('path', { d: TRACE_R, fill: 'none', stroke: PEN, 'stroke-linejoin': 'round', opacity: 0 }, bp), 2);
    N.anch = [];
    for (var side = 0; side < 2; side++) ANCHORS.forEach(function (a, i) {
      if (side && i === 0) return;
      N.anch.push({ el: E('rect', { fill: NAVY, stroke: '#fff', 'stroke-width': 1, 'vector-effect': 'non-scaling-stroke', opacity: 0 }, bp), x: side ? 694.92 - a[0] : a[0], y: a[1], side: side, i: i });
    });
    N.penR = [E('circle', { fill: 'none', stroke: '#fff', 'stroke-width': 1, 'vector-effect': 'non-scaling-stroke', opacity: 0 }, bp), E('circle', { fill: 'none', stroke: '#fff', 'stroke-width': 1, 'vector-effect': 'non-scaling-stroke', opacity: 0 }, bp)];
    N.penD = [E('circle', { fill: '#fff', opacity: 0 }, bp), E('circle', { fill: '#fff', opacity: 0 }, bp)];
    N.axis = E('line', { stroke: '#fff', 'stroke-width': 1, 'vector-effect': 'non-scaling-stroke', x1: 347.46, x2: 347.46, opacity: 0 }, bp);
    N.pivot = E('circle', { r: 11, cx: SX, cy: SY, fill: 'none', stroke: YEL, 'stroke-width': 1, 'vector-effect': 'non-scaling-stroke', opacity: 0 }, bp);
    N.dot = E('circle', { cx: SX, cy: SY, r: 0, fill: YEL, opacity: 0 }, bp);
    N.lock = s1(E('circle', { cx: SX, cy: SY, r: 0, fill: 'none', stroke: YEL, opacity: 0 }, bp), 1.5);

    var mark = N.mark = E('g', 0, world);
    N.mBody = E('path', { d: M_D, fill: BLUE, 'clip-path': 'url(#mmcp-flood)' }, mark);
    N.ring = E('path', { d: RING_D, fill: 'none', stroke: RING_BASE, 'stroke-width': RING_STROKE, opacity: 0 }, mark);
    N.ringHi = E('path', { fill: 'none', stroke: '#fff', 'stroke-width': RING_STROKE, opacity: 0 }, mark);
    N.sun = E('path', { d: SUN_D, fill: YEL, opacity: 0 }, mark);
    N.rays = RAYS.map(function (r) { return E('line', { x1: r.x1, y1: r.y1, x2: r.x1, y2: r.y1, stroke: YEL, 'stroke-width': r.w, 'stroke-linecap': 'round', opacity: 0 }, mark); });
    N.rim = s1(E('circle', { cx: SX, cy: SY, r: 0, fill: 'none', stroke: YEL, opacity: 0 }, mark), 4);

    N.chg = s1(E('circle', { cx: SX, cy: SY, r: 0, fill: 'none', stroke: YEL, opacity: 0 }, svg), 1.5);
    N.bloom2 = E('circle', { cx: SX, cy: SY, r: 440, fill: 'url(#mmcp-bloom)', opacity: 0, transform: SQ }, E('g', { 'clip-path': 'url(#mmcp-hz)', style: 'mix-blend-mode:screen' }, svg));
    N.sw1 = s1(E('circle', { cx: SX, cy: SY, fill: 'none', stroke: YEL, opacity: 0 }, svg), 2);
    N.sw2y = s1(E('circle', { cx: SX, cy: SY, fill: 'none', stroke: YEL, opacity: 0 }, svg), 6);
    N.sw2w = s1(E('circle', { cx: SX, cy: SY, fill: 'none', stroke: '#fff', opacity: 0 }, svg), 3);
    // wordmark: one <text> per glyph
    N.wm = E('g', { fill: '#fff', 'font-family': FONT, 'font-weight': 600 }, svg);
    S.glyphs = [];
    for (var i = 0; i < WORD.length; i++) if (WORD[i] !== ' ') { var g = E('text', { opacity: 0 }, N.wm); g.textContent = WORD[i]; S.glyphs.push({ el: g, i: i }); }
    N.flash = E('rect', { fill: '#FFF1C2', opacity: 0 }, svg);
    N.flashC = E('circle', { cx: SX, cy: SY, r: 900, fill: 'url(#mmcp-flash)', opacity: 0 }, svg);
    N.prim = s1(E('circle', { cx: SX, cy: SY, r: 0, fill: 'none', stroke: YEL, opacity: 0, 'clip-path': 'url(#mmcp-hc)' }, svg), 6);
    N.skip = document.createElement('button');
    N.skip.className = 'mmc-skip'; N.skip.type = 'button'; N.skip.textContent = 'Skip'; N.skip.setAttribute('aria-label', 'Skip intro');
    root.appendChild(N.skip);
    S.svg = svg; S.root = root;
  }

  function measureWord() {
    var svg = S.svg, t = E('text', { 'font-family': FONT, 'font-weight': 600, 'font-size': 100, x: 0, y: 0, opacity: 0 }, svg);
    S.gw = []; var sp = 0;
    for (var i = 0; i < WORD.length; i++) {
      if (WORD[i] === ' ') { S.gw.push(30); continue; }
      t.textContent = WORD[i]; var w = 0;
      try { w = t.getComputedTextLength(); } catch (e) { }
      S.gw.push(w > 1 ? w : 70);
    }
    svg.removeChild(t);
    S.gwSum = S.gw.reduce(function (a, b) { return a + b; }, 0) / 100;   // em
  }

  /* ------------------------------------------------------------------ layout (resize only) */
  function layout() {
    var vw = window.innerWidth || document.documentElement.clientWidth, vh = window.innerHeight || document.documentElement.clientHeight;
    var port = vh > vw, k;
    if (!port) k = Math.min(vw * .46 / 695, vh * .90 / 705); else k = Math.min(vw * .72 / 695, vh * .36 / 621);
    var W = vw / k, H = vh / k, x0 = CX - W / 2, y0 = CY + 10 - H / 2;
    S.k = k; S.vw = vw; S.vh = vh; S.W = W; S.H = H; S.x0 = x0; S.y0 = y0; S.Rmax = Math.hypot(W, H);
    S.rFar = Math.max(Math.hypot(x0 - SX, y0 - SY), Math.hypot(x0 + W - SX, y0 - SY), Math.hypot(x0 - SX, y0 + H - SY), Math.hypot(x0 + W - SX, y0 + H - SY)) * 1.03;
    S.port = port;
    var N = S.N;
    [N.hz, N.hc].forEach(function (e) { A(e, 'x', f(x0 - 4)); A(e, 'y', f(y0 - 4)); A(e, 'width', f(W + 8)); });
    A(N.hz, 'height', f(SY + 2 - (y0 - 4))); A(N.hc, 'height', f(SY + 1 - (y0 - 4)));
    A(S.svg, 'viewBox', f(x0) + ' ' + f(y0) + ' ' + f(W) + ' ' + f(H));
    [N.bg, N.mRect, N.flash].forEach(function (e) { A(e, 'x', f(x0 - 2)); A(e, 'y', f(y0 - 2)); A(e, 'width', f(W + 4)); A(e, 'height', f(H + 4)); });
    var mkm = N.mRect.parentNode; A(mkm, 'x', f(x0 - 4)); A(mkm, 'y', f(y0 - 4)); A(mkm, 'width', f(W + 8)); A(mkm, 'height', f(H + 8));
    S.sw.forEach(function (p) { A(p[0], 'stroke-width', f(p[1] / k)); });
    [N.tip1, N.tip2].forEach(function (e) { A(e, 'r', f(2.6 / k)); });
    N.penD.forEach(function (e) { A(e, 'r', f(2.6 / k)); });
    N.penR.forEach(function (e) { A(e, 'r', f(14)); });
    var fsL = 11 / k; N.gl.forEach(function (e) { A(e, 'font-size', f(fsL)); });
    N.anch.forEach(function (a) { var s = 7 / k; a.s = s; });
    // grid
    while (N.gGrid.firstChild) N.gGrid.removeChild(N.gGrid.firstChild);
    S.grid = [];
    var step = 62, nx0 = Math.ceil((x0 - SX) / step), nx1 = Math.floor((x0 + W - SX) / step);
    var ny0 = Math.ceil((SY - (y0 + H)) / step), ny1 = Math.floor((SY - y0) / step), n;
    for (n = nx0; n <= nx1; n++) S.grid.push({ v: 1, n: n, pos: SX + step * n, el: E('line', { 'vector-effect': 'non-scaling-stroke', 'stroke-width': 1, stroke: LIT, opacity: 0, x1: SX + step * n, x2: SX + step * n }, N.gGrid) });
    for (n = ny0; n <= ny1; n++) S.grid.push({ v: 0, n: n, pos: SY - step * n, el: E('line', { 'vector-effect': 'non-scaling-stroke', 'stroke-width': 1, stroke: LIT, opacity: 0, y1: SY - step * n, y2: SY - step * n }, N.gGrid) });
    // wordmark size + font
    var fs = S.port ? 40 : 34;
    S.fsWord = Math.min(fs, .86 * W / (S.gwSum + .28 * (WORD.length - 1)));
    N.wm.setAttribute('font-size', f(S.fsWord));
    S.wmY = 693 + (S.port ? 10 : 0);
    // hole centre in screen px (for reference)
  }

  /* ------------------------------------------------------------------ init tables from real path geometry */
  function initTables() {
    var N = S.N, n = 360, i, len = N.trL.getTotalLength();
    S.trLen = len; S.tbl = [];
    for (i = 0; i <= n; i++) { var p = N.trL.getPointAtLength(len * i / n); S.tbl.push([p.x, p.y]); }
    N.anch.forEach(function (a) {
      var ax = a.side ? 694.92 - a.x : a.x, best = 1e9, bi = 0;
      for (i = 0; i <= n; i++) { var d = Math.hypot(S.tbl[i][0] - ax, S.tbl[i][1] - a.y); if (d < best) { best = d; bi = i; } }
      a.fr = bi / n;
    });
    var l2 = N.trR.getTotalLength(); S.trLenR = l2;
  }
  function tip(p, mirror) {
    var q = p * (S.tbl.length - 1), i = Math.min(S.tbl.length - 2, q | 0), u = q - i, a = S.tbl[i], b = S.tbl[i + 1];
    var x = lerp(a[0], b[0], u), y = lerp(a[1], b[1], u);
    return [mirror ? 694.92 - x : x, y];
  }

  /* ------------------------------------------------------------------ render(t): pure function of t */
  var ghostKey = -1, protKey = -1;
  function render(t) {
    if (!S.mounted) return;
    t = clamp01(t / DUR) * DUR;
    var N = S.N, k = S.k, Rmax = S.Rmax, i, r, u, e;

    /* ---- world transform (coil, spring, punch, drift, portal exit) */
    var sc = 1;
    if (t >= 2.10 && t < T_SNAP) sc = 1 - .018 * inCubic(seg(t, 2.10, T_SNAP));
    else if (t >= T_SNAP) sc = t < 2.62 ? lerp(.982, 1.012, outBack(seg(t, T_SNAP, 2.62))) : lerp(1.012, 1, outCubic(seg(t, 2.62, 2.80)));
    if (t >= T_DUM) { u = seg(t, T_DUM, 3.25); sc *= 1 + .03 * (u < .3 ? outCubic(u / .3) : 1 - outBack((u - .3) / .7)); }
    sc *= 1 + .018 * seg(t, 3.15, T_LOCK);
    sc *= 1 + .10 * seg(t, T_LOCK, DUR);
    A(N.world, 'transform', 'matrix(' + f(sc) + ' 0 0 ' + f(sc) + ' ' + f(SX * (1 - sc)) + ' ' + f(SY * (1 - sc)) + ')');
    var markA = 1 - seg(t, 3.62, 3.97);
    A(N.mark, 'opacity', f(markA));

    /* ---- blueprint layers */
    var bpA = 1 - seg(t, T_SNAP, T_SNAP + .18);
    if (bpA <= 0) { A(N.bp, 'display', 'none'); } else {
      A(N.bp, 'display', 'inline'); A(N.bp, 'opacity', f(bpA));
      // tick dot
      if (t >= .20 && t < T_SNAP) { var dp = outBack(seg(t, .20, .32)); A(N.dot, 'r', f(7 * dp)); A(N.dot, 'opacity', 1); } else A(N.dot, 'opacity', 0);
      A(N.pivot, 'opacity', t >= .36 && t < 1.3 ? f(.7 * seg(t, .36, .44) * (1 - seg(t, 1.15, 1.3))) : 0);
      // grid, drawn out from the axes through S
      for (i = 0; i < S.grid.length; i++) {
        var g = S.grid[i], an = Math.abs(g.n), st = .28 + .26 * (1 - Math.exp(-an / 5));
        u = outCubic(seg(t, st, st + .32));
        var a = Math.max(.05, .22 - .0055 * an); if (g.n === 0) a = .4;
        if (u <= 0) { A(g.el, 'opacity', 0); continue; }
        A(g.el, 'opacity', f(a));
        if (g.v) { A(g.el, 'y1', f(lerp(SY, S.y0 - 2, u))); A(g.el, 'y2', f(lerp(SY, S.y0 + S.H + 2, u))); }
        else { A(g.el, 'x1', f(lerp(SX, S.x0 - 2, u))); A(g.el, 'x2', f(lerp(SX, S.x0 + S.W + 2, u))); }
      }
      // crop marks
      A(N.crop, 'opacity', f(.55 * seg(t, 1.0, 1.3) * (1 - seg(t, 2.0, 2.2))));
      // compass 1 (yellow, r = sun), swings 180 -> 0 over the top
      u = inOutCubic(seg(t, .40, .80)); var th = 180 - 180 * u, tp = pol(SX, SY, R_SUN, th);
      var leg1A = t < .40 ? 0 : 1 - seg(t, .80, .92);
      A(N.leg1, 'x1', SX); A(N.leg1, 'y1', SY); A(N.leg1, 'x2', f(tp[0])); A(N.leg1, 'y2', f(tp[1])); A(N.leg1, 'opacity', f(.95 * leg1A));
      A(N.tip1, 'cx', f(tp[0])); A(N.tip1, 'cy', f(tp[1])); A(N.tip1, 'opacity', f(leg1A));
      draw(N.arc1, Math.PI * R_SUN, u); A(N.arc1, 'opacity', u > 0 ? 1 : 0);
      // compass 2 (white, r = arch), swings back 0 -> 180
      u = inOutCubic(seg(t, .80, 1.15)); th = 180 * u; tp = pol(SX, SY, R_ARCH, th);
      var leg2A = t < .80 ? 0 : 1 - seg(t, 1.15, 1.23);
      A(N.leg2, 'x1', SX); A(N.leg2, 'y1', SY); A(N.leg2, 'x2', f(tp[0])); A(N.leg2, 'y2', f(tp[1])); A(N.leg2, 'opacity', f(.9 * leg2A));
      A(N.tip2, 'cx', f(tp[0])); A(N.tip2, 'cy', f(tp[1])); A(N.tip2, 'opacity', f(leg2A));
      draw(N.arc2, Math.PI * R_ARCH, u); A(N.arc2, 'opacity', u > 0 ? .9 : 0);
      // ghost ring r=190 (dashed, upper half from the left)
      u = outCubic(seg(t, .95, 1.25)); var gk = Math.round(u * 400);
      if (gk !== ghostKey) { ghostKey = gk; A(N.ghost, 'd', dashedArc(SX, SY, R_INNER, u * 180, 7, 9)); }
      A(N.ghost, 'opacity', u > 0 ? f(.34 * (1 - seg(t, 1.5, 2.25))) : 0);
      // protractor ticks r=340
      u = outCubic(seg(t, 1.05, 1.65)); gk = Math.round(u * 180);
      if (gk !== protKey) { protKey = gk; A(N.prot, 'd', protractor(u)); }
      A(N.prot, 'opacity', u > 0 ? f(.5 * (1 - seg(t, 1.9, 2.3))) : 0);
      draw(N.protArc, Math.PI * 340, u); A(N.protArc, 'opacity', u > 0 ? f(.3 * (1 - seg(t, 1.9, 2.3))) : 0);
      // guides fire along each ray's own bearing, then dim once the ray is drawn
      for (i = 0; i < RAYS.length; i++) {
        r = RAYS[i]; var gs = 1.05 + .06 * r.o; u = outExpo(seg(t, gs, gs + .24));
        var rs = 1.40 + .05 * r.o, dim = seg(t, rs + .22, rs + .40), ga = lerp(.55, .13, dim) * (1 - seg(t, 2.0, 2.3) * .5);
        var sx = r.x1 - r.dx * 70, sy = r.y1 - r.dy * 70, L = Rmax * u;
        e = N.gd[i];
        A(e, 'x1', f(sx)); A(e, 'y1', f(sy)); A(e, 'x2', f(sx + r.dx * L)); A(e, 'y2', f(sy + r.dy * L)); A(e, 'opacity', u > 0 ? f(ga) : 0);
        var lx = r.x1 + r.dx * 165 + r.dy * 0, ly = r.y1 + r.dy * 165;
        var px = -r.dy, py = r.dx; if (px > 0 || (px === 0 && false)) { px = -px; py = -py; }
        if (r.deg === 90) { px = 1; py = 0; } // sits to the right of the vertical
        else if (r.dx > 0) { px = 1; py = 0.35 * 1; } else { px = -1; py = 0.35; }
        A(N.gl[i], 'x', f(lx + px * 16 / k * .6)); A(N.gl[i], 'y', f(ly + 4 / k)); A(N.gl[i], 'opacity', u > .55 ? f(.55 * (1 - dim * .5)) : 0);
        A(N.gl[i], 'text-anchor', r.deg === 90 ? 'start' : r.dx > 0 ? 'start' : 'end');
      }
      // M trace: two pens from the arch apex to the V-notch, meeting at exactly t=2.05
      var tpv = .5 - .5 * Math.cos(Math.PI * seg(t, 1.08, 2.05));
      draw(N.trL, S.trLen, tpv); draw(N.trR, S.trLenR, tpv);
      var trA = tpv > 0 ? .95 : 0; A(N.trL, 'opacity', trA); A(N.trR, 'opacity', trA);
      var tl = tip(tpv, 0), tr = tip(tpv, 1), pa = tpv > 0 ? 1 : 0;
      var penFade = 1 - seg(t, 2.05, 2.22) * .0;
      A(N.penD[0], 'cx', f(tl[0])); A(N.penD[0], 'cy', f(tl[1])); A(N.penD[1], 'cx', f(tr[0])); A(N.penD[1], 'cy', f(tr[1]));
      A(N.penR[0], 'cx', f(tl[0])); A(N.penR[0], 'cy', f(tl[1])); A(N.penR[1], 'cx', f(tr[0])); A(N.penR[1], 'cy', f(tr[1]));
      for (i = 0; i < 2; i++) { A(N.penD[i], 'opacity', pa); A(N.penR[i], 'opacity', f(.55 * pa * (1 - seg(t, 2.05, 2.2)))); }
      for (i = 0; i < N.anch.length; i++) {
        var an2 = N.anch[i], pu = outBack(seg(tpv, an2.fr, an2.fr + .045));
        if (an2.i === 0) pu = outBack(seg(t, 1.08, 1.22));
        var sz = an2.s * pu; A(an2.el, 'width', f(sz)); A(an2.el, 'height', f(sz)); A(an2.el, 'x', f(an2.x - sz / 2)); A(an2.el, 'y', f(an2.y - sz / 2));
        A(an2.el, 'opacity', pu > 0 ? f(.9 * (1 - seg(t, 2.1, 2.3) * .6)) : 0);
      }
      // mirror axis flash
      u = seg(t, 2.05, 2.25);
      if (u > 0 && u < 1) {
        var ax = outCubic(seg(t, 2.05, 2.17));
        A(N.axis, 'y1', f(lerp(SY, S.y0, ax))); A(N.axis, 'y2', f(lerp(SY, S.y0 + S.H, ax)));
        A(N.axis, 'opacity', f(.55 * Math.sin(Math.PI * u)));
      } else A(N.axis, 'opacity', 0);
    }

    /* ---- rays */
    var kickU = seg(t, T_DUM, T_DUM + .35), kick = t >= T_DUM ? 14 * (kickU < .25 ? outCubic(kickU / .25) : 1 - outBack((kickU - .25) / .75)) : 0;
    var shim = .8 * seg(t, 2.6, 2.75), white = t >= T_DUM && t < T_DUM + .04;
    for (i = 0; i < RAYS.length; i++) {
      r = RAYS[i]; e = N.rays[i]; var rs2 = 1.40 + .05 * r.o; u = outCubic(seg(t, rs2, rs2 + .22));
      A(e, 'opacity', u > 0 ? 1 : 0);
      A(e, 'x2', f(lerp(r.x1, r.x2, u))); A(e, 'y2', f(lerp(r.y1, r.y2, u)));
      A(e, 'stroke', white ? '#fff' : YEL);
      var tr2 = '';
      if (kick !== 0 || shim > 0) tr2 = 'rotate(' + f(shim * Math.sin(t * 9 + i * .7)) + ' ' + SX + ' ' + SY + ') translate(' + f(r.dx * kick) + ' ' + f(r.dy * kick) + ')';
      A(e, 'transform', tr2);
    }

    /* ---- flood (hit 1) + sun + ring */
    var fu = seg(t, T_SNAP, 2.78), R1 = 660 * (1 - Math.pow(1 - fu, 2.2));
    A(N.clip, 'r', f(R1));
    A(N.rim, 'r', f(R1)); A(N.rim, 'opacity', fu > 0 && fu < 1 ? f(1 - fu) : 0);
    var sv = t >= T_SNAP, su = outBack(seg(t, T_SNAP, 2.72)), sy = lerp(.55, 1, su);
    A(N.sun, 'opacity', sv ? f(Math.min(1, (t - T_SNAP) / .04)) : 0);
    A(N.sun, 'transform', 'translate(0 591.36) scale(1 ' + f(sy) + ') translate(0 -591.36)');
    A(N.ring, 'opacity', sv ? f(seg(t, T_SNAP, T_SNAP + .06)) : 0);
    // ring highlight sweep
    u = seg(t, T_DUM, 3.45);
    if (u > 0 && u < 1) {
      var ca = lerp(200, -20, u), a0 = Math.min(180, ca + 10), a1 = Math.max(0, ca - 10);
      if (a0 > a1) { var p0 = pol(347.46, 591.82, RING_MID, a0), p1 = pol(347.46, 591.82, RING_MID, a1); A(N.ringHi, 'd', 'M' + f(p0[0]) + ' ' + f(p0[1]) + 'A' + RING_MID + ' ' + RING_MID + ' 0 0 1 ' + f(p1[0]) + ' ' + f(p1[1])); A(N.ringHi, 'opacity', 1); } else A(N.ringHi, 'opacity', 0);
    } else A(N.ringHi, 'opacity', 0);

    /* ---- bloom */
    var b = 0;
    if (t >= T_SNAP) {
      b = .18 * outCubic(seg(t, T_SNAP, 2.72)); if (t < T_DUM) b += .04 * Math.sin(t * 6.5) * seg(t, 2.72, 2.85);
      if (t >= T_DUM) { b = lerp(.9, .35, outCubic(seg(t, T_DUM, 3.55))); b = lerp(b, .22, seg(t, 3.15, T_LOCK)); }
      b *= 1 - seg(t, T_LOCK, 3.95);
    }
    A(N.bloom, 'opacity', f(b)); A(N.bloom2, 'opacity', f(b * .32));
    var bs = 1 + .05 * seg(t, T_DUM, 3.6); A(N.bloom, 'r', f(520 * bs)); A(N.bloom2, 'r', f(520 * bs));

    /* ---- light wedges (angle-locked, only lengthen) */
    var wa = 0; if (t >= T_DUM) { wa = .22 * outCubic(seg(t, T_DUM, 3.2)); if (t > 3.2) wa = lerp(.22, .10, seg(t, 3.2, T_LOCK)); wa *= 1 - seg(t, T_LOCK, 3.9); }
    var WL = Rmax * outExpo(seg(t, T_DUM, 3.6)) + 1;
    for (i = 0; i < RAYS.length; i++) {
      r = RAYS[i];
      if (wa <= 0) { A(N.wedges[i][0], 'opacity', 0); A(N.wedges[i][1], 'opacity', 0); A(N.wedges[i][2], 'opacity', 0); continue; }
      var ox = r.x1 - r.dx * 40, oy = r.y1 - r.dy * 40, ang = Math.atan2(r.dy, r.dx);
      for (var w = 0; w < 3; w++) {
        var ha = [8.5, 4.6, 1.8][w] * Math.PI / 180, p1x = ox + WL * Math.cos(ang - ha), p1y = oy + WL * Math.sin(ang - ha), p2x = ox + WL * Math.cos(ang + ha), p2y = oy + WL * Math.sin(ang + ha);
        A(N.wedges[i][w], 'points', f(ox) + ',' + f(oy) + ' ' + f(p1x) + ',' + f(p1y) + ' ' + f(p2x) + ',' + f(p2y));
        A(N.wedges[i][w], 'opacity', f(wa * [.4, .5, .7][w]));
      }
    }

    /* ---- shockwaves */
    u = seg(t, T_SNAP, 3.3);
    if (u > 0 && u < 1) { A(N.sw1, 'r', f(lerp(155, Rmax * .9, outCubic(u)))); A(N.sw1, 'opacity', f(.4 * (1 - u))); A(N.sw1, 'stroke-width', f(lerp(3, 1, u) / k)); } else A(N.sw1, 'opacity', 0);
    u = seg(t, T_DUM, T_DUM + .75);
    if (u > 0 && u < 1) { var ue = outExpo(u); A(N.sw2y, 'r', f(lerp(155, Rmax, ue))); A(N.sw2y, 'stroke-width', f(lerp(6, 1, ue) / k)); A(N.sw2y, 'opacity', f(1 - u * u)); } else A(N.sw2y, 'opacity', 0);
    u = seg(t, T_DUM + .08, T_DUM + .83);
    if (u > 0 && u < 1) { var uw = outExpo(u); A(N.sw2w, 'r', f(lerp(155, Rmax, uw))); A(N.sw2w, 'stroke-width', f(lerp(3, .8, uw) / k)); A(N.sw2w, 'opacity', f(.8 * (1 - u))); } else A(N.sw2w, 'opacity', 0);

    /* ---- wordmark */
    var spc = lerp(.5, .28, outCubic(seg(t, 3.10, 3.50))) * S.fsWord, wm = 0, tot = 0, cum = 0;
    tot = S.gwSum * S.fsWord + spc * (WORD.length - 1);
    var x = CX - tot / 2, wfade = 1 - seg(t, T_LOCK, T_LOCK + .18);
    var gi = 0;
    for (i = 0; i < WORD.length; i++) {
      var adv = S.gw[i] / 100 * S.fsWord;
      if (WORD[i] !== ' ') {
        var gl = S.glyphs[gi++], ge = outCubic(seg(t, 3.10 + .012 * i, 3.10 + .012 * i + .26));
        A(gl.el, 'x', f(x)); A(gl.el, 'y', f(S.wmY + 10 * (1 - ge))); A(gl.el, 'opacity', f(ge * wfade));
      }
      x += adv + spc;
    }

    /* ---- flashes */
    var fl = 0; if (t >= T_SNAP && t < T_SNAP + .045) fl = .12; else if (t >= T_DUM && t < T_DUM + .045) fl = .18;
    A(N.flash, 'opacity', fl);

    /* ---- portal */
    var thru = t >= T_LOCK;
    if (thru) {
      var pp = portalEase(seg(t, T_LOCK, DUR)), rp = lerp(96, S.rFar, pp);
      A(N.hole, 'r', f(rp)); A(N.prim, 'r', f(rp)); A(N.prim, 'opacity', pp < 1 ? f(1 - seg(t, 3.91, DUR)) : 0);
      document.documentElement.style.setProperty('--mmc-pre-h', f(outCubic(seg(t, T_LOCK, DUR))));
    } else {
      A(N.hole, 'r', 0); A(N.prim, 'opacity', 0);
      document.documentElement.style.setProperty('--mmc-pre-h', 0);
    }
    if (S.root.classList.contains('mmc-pre-thru') !== thru) S.root.classList.toggle('mmc-pre-thru', thru);
    S.root.style.display = (t >= DUR && S.frozen) ? 'none' : '';
    N.skip.style.opacity = (!S.frozen && t > .6 && t < T_LOCK) ? 1 : 0;
    N.skip.style.pointerEvents = N.skip.style.opacity === '1' ? 'auto' : 'none';
  }

  function dashedArc(cx, cy, r, sweep, dash, gap) {
    // dashed upper half arc, from the left (180deg) sweeping clockwise over the top, drawn up to `sweep` degrees
    var d = '', a = 0, da = dash / r * 180 / Math.PI, ga = gap / r * 180 / Math.PI, p0, p1;
    while (a < sweep) {
      var b = Math.min(sweep, a + da); p0 = pol(cx, cy, r, 180 - a); p1 = pol(cx, cy, r, 180 - b);
      d += 'M' + f(p0[0]) + ' ' + f(p0[1]) + 'A' + r + ' ' + r + ' 0 0 1 ' + f(p1[0]) + ' ' + f(p1[1]);
      a = b + ga;
    }
    return d || 'M0 0';
  }
  function protractor(q) {
    var d = '', deg, lo = 90 - 90 * q, hi = 90 + 90 * q, len, p0, p1;
    for (deg = 0; deg <= 180; deg += 5) {
      if (deg < lo - .01 || deg > hi + .01) continue;
      len = deg % 30 === 0 ? 20 : deg % 15 === 0 ? 12 : 6;
      p0 = pol(SX, SY, 340, deg); p1 = pol(SX, SY, 340 + len, deg);
      d += 'M' + f(p0[0]) + ' ' + f(p0[1]) + 'L' + f(p1[0]) + ' ' + f(p1[1]);
    }
    return d || 'M0 0';
  }

  /* ------------------------------------------------------------------ lifecycle */
  function mount() {
    if (S.mounted) return;
    injectCSS(); build();
    (document.body || document.documentElement).appendChild(S.root);
    S.mounted = true;
    measureWord(); layout(); initTables();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { if (S.mounted) { measureWord(); layout(); render(S.curT || 0); } });
    window.addEventListener('resize', onResize);
    S.root.addEventListener('pointerdown', onSkip);
    S.N.skip.addEventListener('click', function (ev) { ev.stopPropagation(); doSkip(); });
    S.curT = 0; render(0);
  }
  function onResize() { if (S.mounted) { layout(); render(S.curT || 0); } }
  function unmount() {
    if (!S.mounted) return;
    window.removeEventListener('resize', onResize);
    window.removeEventListener('keydown', onKey, true);
    window.removeEventListener('wheel', block, { passive: false, capture: true });
    window.removeEventListener('touchmove', block, { passive: false, capture: true });
    if (S.root.parentNode) S.root.parentNode.removeChild(S.root);
    S.mounted = false; ghostKey = protKey = -1;
  }
  function block(e) { if (S.playing && S.curT < T_LOCK) e.preventDefault(); }
  function onSkip() { if (S.playing && S.curT > .6) doSkip(); }
  function onKey(e) { if (S.playing && S.curT > .3 && e.key !== 'Tab') { doSkip(); } }
  function doSkip() {
    if (!S.playing || S.curT >= T_LOCK) return;
    S.off += T_LOCK - S.curT; mark('seen');
  }
  function mark() { try { sessionStorage.setItem('mmc-pre-seen', '1'); } catch (e) { } }
  function seen() { try { return sessionStorage.getItem('mmc-pre-seen') === '1'; } catch (e) { return false; } }
  function beat(name, t) {
    var cb = api.onBeat; if (!cb) return;
    try { if (typeof cb === 'function') cb(name, t); else if (cb[name]) cb[name](t); } catch (e) { }
  }

  function finish() {
    if (!S.playing) return;
    S.playing = false; cancelAnimationFrame(S.raf); clearTimeout(S.capTimer);
    document.removeEventListener('visibilitychange', onVis);
    unmount();
    document.documentElement.style.removeProperty('--mmc-pre-h');
    document.documentElement.classList.add('mmc-pre-done');
    mark();
    try { document.dispatchEvent(new Event('mmc:preloader-done')); } catch (e) { }
    if (document.body) try { document.body.focus({ preventScroll: true }); } catch (e) { }
    beat('done', DUR);
  }
  function onVis() {
    if (document.hidden) S.hidAt = performance.now(); else if (S.hidAt) { S.hid += performance.now() - S.hidAt; S.hidAt = 0; }
  }
  function tick(now) {
    if (!S.playing) return;
    var t = (now - S.t0 - S.hid) / 1000 + S.off;
    S.curT = t;
    if (t >= DUR) { finish(); return; }
    render(t);
    for (var i = 0; i < BEATS.length - 1; i++) if (!S.fired[BEATS[i][0]] && t >= BEATS[i][1]) { S.fired[BEATS[i][0]] = 1; beat(BEATS[i][0], t); if (BEATS[i][0] === 'snap') mark(); }
    S.raf = requestAnimationFrame(tick);
  }

  function reduced() { try { return window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { return false; } }

  function play(force) {
    if (S.playing) return;
    if (!force && seen()) return;
    if (S.mounted) unmount();
    document.documentElement.classList.remove('mmc-pre-done');
    mount(); S.frozen = false; S.playing = true; S.fired = {}; S.off = 0; S.hid = 0;
    if (reduced()) {
      render(3.55); S.root.classList.add('mmc-pre-thru'); S.root.classList.remove('mmc-pre-thru');
      S.root.style.opacity = 0; S.N.skip.style.display = 'none';
      requestAnimationFrame(function () { S.root.style.transition = 'opacity .25s ease'; S.root.style.opacity = 1; });
      setTimeout(function () { if (S.root) S.root.style.opacity = 0; }, 950);
      setTimeout(finish, 1220);
      return;
    }
    window.addEventListener('keydown', onKey, true);
    window.addEventListener('wheel', block, { passive: false, capture: true });
    window.addEventListener('touchmove', block, { passive: false, capture: true });
    document.addEventListener('visibilitychange', onVis);
    S.capTimer = setTimeout(finish, CAP_MS);
    S.t0 = performance.now();
    S.raf = requestAnimationFrame(function (n) { S.t0 = n; tick(n); });
  }
  function freeze(t) {
    if (S.playing) finish();
    mount(); S.frozen = true; S.curT = t; render(t);
    S.root.style.pointerEvents = 'none';
  }

  api.play = play; api.render = function (t) { S.curT = t; render(t); }; api.skip = doSkip; api.freeze = freeze;
  api.easing = { outCubic: outCubic, inOutCubic: inOutCubic, outExpo: outExpo, outBack: outBack, outSpring: outSpring, bezier: bezier };
  window.MMCPreloader = api; window.__mmcPre = api;

  /* ------------------------------------------------------------------ boot */
  var q = /[?&]mmcpre_t=([0-9.]+)/.exec(location.search), pm = /[?&]preloader=(\w+)/.exec(location.search);
  function boot() {
    if (q) { freeze(parseFloat(q[1])); return; }
    if (pm && pm[1] === 'off') return;
    play(pm && pm[1] === 'force');
  }
  boot();
})();

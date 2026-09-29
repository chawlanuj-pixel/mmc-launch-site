/*!
 * MMC preloader - "REACH" (option 7), WHITE version: an audience of yellow dots lands on a hex grid, draws a halftone M, fuses into the brand.
 * Pure vector code animation: inline SVG + vanilla JS + CSS. No video, no raster, no libraries, no fetches.
 * One pure render(t) driven by one clock. ?mmcpre_t=<seconds> freezes at t. ?preloader=off|force.
 * API: window.MMCPreloader = { play(force), render(t), skip(), freeze(t), DUR, onBeat }
 */
(function () {
  'use strict';
  if (window.MMCPreloader && window.MMCPreloader.__v === 7.1) return;

  var DUR = 4.05, T_HIT = 2.40, T_LOCK = 3.10, T_LIFT = 3.40, T_SWAP = 1.94, T_FUSE0 = 1.26, FUSE_SPREAD = .28, FUSE_LEN = .40;
  var BG = '#FFFFFF', BLUE = '#1A478F', INK = '#0F1E5E', YEL = '#FBB615', AMBER = '#B87A00', AMBERTX = '#A96B00', WHITE = '#FFFFFF';
  var SX = 347.5, SY = 591.6, CXM = 347.46, PL = 40, RP = 34.641, RF = 24.2, R1 = 15;
  var M_D = 'M30.38 563.7 L30.38 126.64 C30.38 42.12 123.76 1.2 189.82 54.72 L292.54 137.95 C310.72 152.68 317.76 160.9 347.46 160.9 C377.16 160.9 384.2 152.68 402.38 137.95 L505.1 54.72 C571.16 1.2 664.54 42.12 664.54 126.64 L664.54 563.7 A27.6 27.6 0 0 1 636.94 591.31 L528.88 591.31 A26.67 26.67 0 0 1 502.5 568.59 A156.77 156.77 0 0 0 192.42 568.59 A26.67 26.67 0 0 1 166.04 591.31 L57.98 591.31 A27.6 27.6 0 0 1 30.38 563.7Z';
  var CLIP_OUTER = 'M30.38 563.7 L30.38 126.64 C30.38 42.12 123.76 1.2 189.82 54.72 L292.54 137.95 C310.72 152.68 317.76 160.9 347.46 160.9 C377.16 160.9 384.2 152.68 402.38 137.95 L505.1 54.72 C571.16 1.2 664.54 42.12 664.54 126.64 L664.54 563.7 A27.6 27.6 0 0 1 636.94 591.31 L57.98 591.31 A27.6 27.6 0 0 1 30.38 563.7Z';
  var ARCH_D = 'M166.04 592.5 L166.04 591.31 A26.67 26.67 0 0 0 192.42 568.59 A156.77 156.77 0 0 1 502.5 568.59 A26.67 26.67 0 0 0 528.88 591.31 L528.88 592.5 Z';
  var SUN_D = 'M237.28 591.36 L457.7 591.36 A18.7 18.7 0 0 0 476.14 569.5 A130.52 130.52 0 0 0 218.84 569.5 A18.7 18.7 0 0 0 237.28 591.36Z';
  var RAYS = [
    { x1: 347.74, y1: 401.65, x2: 347.73, y2: 279.78, w: 15.12, o: 0 },
    { x1: 274.22, y1: 417.76, x2: 234.04, y2: 348.08, w: 14.76, o: 1 },
    { x1: 420.72, y1: 418.50, x2: 460.91, y2: 348.89, w: 14.77, o: 1 },
    { x1: 206.19, y1: 464.05, x2: 170.55, y2: 443.47, w: 14.79, o: 2 },
    { x1: 488.84, y1: 464.81, x2: 524.35, y2: 444.27, w: 14.82, o: 2 }
  ];
  RAYS.forEach(function (r) { r.dx = r.x2 - r.x1; r.dy = r.y2 - r.y1; });
  var GL = {"k":0.0368,"words":[{"x":27.66,"g":[["M",0],["O",915],["N",1721],["D",2534],["A",3300],["Y",4022]]},{"x":219.08,"g":[["M",0],["A",915],["R",1637],["K",2352],["E",3071],["T",3722],["I",4391],["N",4727],["G",5540]]},{"x":468.74,"g":[["C",0],["O",736],["M",1542],["P",2457],["A",3130],["N",3852],["Y",4665]]}],"glyphs":{"M":"M653 0V466L471 119H394L212 466V0H74V710H222L432 306L644 710H791V0Z","O":"M377 -5Q299 -5 236 25Q172 55 126 106Q81 158 56 222Q31 287 31 355Q31 426 58 490Q84 555 130 606Q177 656 240 686Q304 715 380 715Q457 715 520 684Q584 653 629 601Q674 549 699 485Q724 421 724 353Q724 283 698 218Q672 154 626 104Q579 53 516 24Q452 -5 377 -5ZM171 355Q171 309 185 266Q199 223 226 190Q252 156 290 136Q329 117 378 117Q428 117 467 138Q506 158 532 192Q558 227 572 270Q585 312 585 355Q585 401 570 444Q556 486 530 520Q503 553 464 572Q426 592 378 592Q327 592 288 572Q250 551 224 517Q198 483 184 441Q171 399 171 355Z","N":"M212 456V0H74V710H184L551 242V709H689V0H574Z","D":"M74 0V710H332Q448 710 526 662Q604 615 643 534Q682 454 682 356Q682 248 639 168Q596 88 518 44Q439 0 332 0ZM543 356Q543 425 518 478Q493 530 446 560Q399 589 332 589H212V121H332Q400 121 447 152Q494 182 518 236Q543 289 543 356Z","A":"M267 710H407L668 0H526L460 177H212L147 0H5ZM435 274 337 567 235 274Z","Y":"M154 710 329 376 507 710H656L398 248V0H261V250L4 710Z","R":"M74 0V710H388Q437 710 478 690Q520 670 550 636Q581 602 598 560Q614 518 614 474Q614 429 598 388Q583 346 554 315Q525 284 486 267L648 0H496L350 238H212V0ZM212 359H385Q411 359 431 374Q451 390 463 416Q475 442 475 474Q475 508 461 534Q447 559 426 574Q404 589 379 589H212Z","K":"M74 0V709H212V372L510 710H662L390 395L679 0H523L302 306L212 212V0Z","E":"M567 121V0H74V710H558V589H212V418H511V306H212V121Z","T":"M605 589H378V0H241V589H14V710H605Z","I":"M74 0V710H212V0Z","G":"M369 -5Q300 -5 238 23Q177 51 130 100Q84 150 58 216Q32 282 32 359Q32 432 58 496Q84 561 131 610Q178 659 241 687Q304 715 378 715Q478 715 550 672Q621 630 657 560L554 484Q527 537 478 565Q430 593 373 593Q328 593 291 574Q254 555 227 522Q200 489 186 446Q171 403 171 355Q171 304 186 261Q202 218 230 186Q259 154 297 136Q335 117 381 117Q435 117 484 145Q534 173 577 227V91Q488 -5 369 -5ZM567 264H424V365H681V0H567Z","C":"M31 360Q31 425 54 488Q78 550 123 602Q168 653 233 684Q298 714 381 714Q479 714 550 671Q622 628 657 559L551 486Q533 526 504 550Q475 573 442 582Q409 592 377 592Q325 592 286 571Q248 550 222 516Q196 482 184 440Q171 398 171 356Q171 309 186 266Q201 222 228 188Q256 155 294 136Q333 116 379 116Q412 116 446 127Q480 138 509 162Q538 186 554 224L667 159Q646 106 598 69Q551 32 492 13Q433 -6 375 -6Q299 -6 236 26Q173 57 128 110Q82 162 56 228Q31 293 31 360Z","P":"M74 0V710H375Q424 710 465 690Q506 670 536 636Q567 602 584 560Q601 518 601 474Q601 414 573 360Q545 306 496 272Q447 238 380 238H212V0ZM212 359H372Q397 359 417 373Q437 387 449 414Q461 440 461 474Q461 511 448 537Q434 563 412 576Q391 589 366 589H212Z"},"dig":{"0":["M353 -10Q276 -9 217 24Q158 57 118 110Q79 164 59 227Q39 290 39 350Q39 414 60 478Q82 542 123 594Q164 647 222 678Q280 710 353 710Q432 710 490 676Q549 642 588 588Q628 534 648 471Q668 408 668 350Q668 285 646 221Q625 157 584 105Q543 53 485 22Q427 -10 353 -10ZM205 350Q206 312 214 274Q223 237 241 206Q259 174 287 155Q315 136 353 136Q394 136 422 156Q450 177 468 210Q485 242 494 279Q502 316 502 350Q502 388 493 426Q484 463 466 494Q447 526 419 545Q391 564 354 564Q314 564 286 544Q257 523 240 491Q222 459 214 422Q205 384 205 350Z",707,[39,-10,668,710]],"1":["M496 144V0H65V144H206V559Q197 547 178 532Q160 518 136 504Q112 491 87 482Q62 473 42 473V620Q69 620 98 634Q126 648 150 666Q174 685 189 700Q204 715 206 716H369V144Z",518,[42,0,496,716]],"2":["M39 0Q39 62 45 108Q51 154 67 190Q83 226 110 254Q138 283 181 309Q214 329 250 348Q285 366 316 386Q347 407 366 434Q386 460 386 495Q386 522 376 540Q365 557 346 566Q326 576 300 576Q268 576 238 564Q208 551 183 534Q158 516 140 497L40 603Q57 622 84 642Q111 662 147 680Q183 697 227 708Q271 718 322 718Q401 718 456 692Q511 665 540 617Q568 569 568 505Q568 463 556 430Q544 396 522 370Q500 343 471 321Q442 299 409 279Q364 254 335 235Q306 216 288 201Q269 186 258 172Q247 158 238 144H569V0Z",619,[39,0,569,718]],"3":["M267 -6Q213 -6 168 6Q122 17 87 40Q52 64 26 96L109 209Q124 190 146 174Q167 159 196 150Q224 141 260 141Q297 141 323 150Q349 160 363 178Q377 197 377 223Q377 253 360 272Q343 292 308 302Q273 311 222 311H190V426H224Q285 426 322 448Q359 471 359 510Q359 532 348 548Q336 565 316 574Q296 582 270 582Q227 582 192 561Q157 540 136 504L33 622Q56 651 96 672Q135 694 184 706Q233 718 285 718Q358 718 413 695Q468 672 499 631Q530 590 530 536Q530 496 514 462Q497 429 467 406Q437 384 398 375Q441 368 474 343Q506 318 524 280Q543 241 543 195Q543 132 508 88Q473 43 411 18Q349 -6 267 -6Z",586,[26,-6,543,718]],"4":["M305 1V150H26V293L356 711H465V293H553V150H465V1ZM185 293H323V471Z",591,[26,1,553,711]],"5":["M270 -9Q192 -9 130 22Q69 54 35 109L125 208Q153 172 192 152Q231 131 271 131Q302 131 325 144Q348 156 361 178Q374 200 374 229Q374 258 362 280Q350 301 328 313Q307 325 280 325Q253 325 230 313Q206 301 193 279H54L137 711H490V565H253L232 444Q239 451 256 456Q274 462 303 462Q371 462 424 432Q477 403 508 352Q538 300 538 233Q538 161 504 106Q469 52 409 22Q349 -9 270 -9Z",575,[35,-9,538,711]],"6":["M569 239Q569 306 536 358Q504 411 448 442Q392 473 321 473Q292 473 267 466Q242 460 223 448Q204 435 190 416Q192 467 208 503Q224 539 253 558Q282 577 320 577Q360 577 395 559Q430 541 455 509L545 611Q503 661 446 688Q389 716 323 716Q236 716 174 670Q111 625 77 538Q43 451 43 327Q43 221 74 146Q106 70 165 30Q224 -10 307 -10Q381 -10 440 24Q500 57 534 113Q569 169 569 239ZM307 125Q278 125 253 140Q228 156 212 182Q197 208 197 238Q197 269 212 294Q227 318 252 332Q277 347 307 347Q337 347 362 332Q387 318 402 294Q417 269 417 239Q417 208 402 182Q386 156 362 140Q337 125 307 125Z",608,[43,-10,569,716]],"7":["M333 565H35V711H585L235 1H54Z",579,[35,1,585,711]],"8":["M566 215Q566 148 530 98Q495 47 435 19Q375 -9 303 -9Q232 -9 172 20Q113 48 77 100Q41 152 41 221Q41 259 56 290Q71 320 94 343Q118 366 140 379Q118 392 100 412Q83 431 72 456Q62 480 62 506Q62 556 84 594Q106 632 142 658Q178 684 220 697Q263 710 303 710Q344 710 387 697Q430 684 466 658Q502 633 524 595Q546 557 546 508Q546 482 535 456Q524 431 506 411Q488 391 466 379Q491 365 514 342Q537 318 552 286Q566 255 566 215ZM404 225Q404 246 396 262Q388 279 374 290Q359 302 341 308Q323 313 303 313Q276 313 253 302Q230 291 216 272Q203 252 203 224Q203 205 212 188Q220 172 234 160Q248 148 266 142Q284 136 304 136Q331 136 354 148Q376 159 390 179Q404 199 404 225ZM224 503Q224 480 236 464Q248 449 266 441Q285 433 303 433Q323 433 341 441Q359 449 371 464Q383 480 383 503Q383 522 372 537Q362 552 344 560Q326 569 303 569Q281 569 263 560Q245 552 234 537Q224 522 224 503Z",607,[41,-9,566,710]],"9":["M38 467Q38 401 70 348Q103 294 160 263Q217 232 287 232Q316 232 340 239Q365 246 384 258Q404 271 417 290Q416 239 400 203Q384 167 356 148Q327 129 287 129Q248 129 212 147Q177 165 152 197L62 95Q105 44 162 17Q219 -10 285 -10Q371 -10 434 36Q497 82 531 168Q565 255 565 379Q565 486 533 561Q501 636 442 676Q383 716 301 716Q226 716 166 682Q107 649 72 593Q38 537 38 467ZM301 581Q330 581 355 566Q380 550 396 524Q411 498 411 467Q411 438 396 413Q381 388 356 374Q331 359 301 359Q271 359 246 374Q221 388 206 413Q191 438 191 467Q191 499 206 524Q222 550 246 566Q271 581 301 581Z",607,[38,-10,565,716]],"x":["M168 525 261 377 271 358 281 377 374 525H539L363 264L543 0H378L280 147L271 166L262 147L164 0H-1L179 261L3 525Z",542,[-1,0,543,525]]}};
  var TWC = 30 / 710, CB = 15, RH = 40, CX_D1 = -38.5, CX_DOT = -17.5, CX_D2 = 3.5, CX_M = 36.5;   /* reach counter: fixed cells, digit cap 30 */

  /* ---------------------------------------------------------------- pure helpers */
  function clamp01(x) { return x < 0 ? 0 : x > 1 ? 1 : x; }
  function seg(t, a, b) { return clamp01((t - a) / (b - a)); }
  function outQuad(x) { return 1 - (1 - x) * (1 - x); }
  function outCubic(x) { var u = 1 - x; return 1 - u * u * u; }
  function inCubic(x) { return x * x * x; }
  function inOutSine(x) { return -(Math.cos(Math.PI * x) - 1) / 2; }
  function inOutQuad(x) { return x < .5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2; }
  function inOutCubic(x) { return x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; }
  function outBack(x, c) { var u = x - 1; return 1 + (c + 1) * u * u * u + c * u * u; }
  function frac(x) { return x - Math.floor(x); }
  function bez(x1, y1, x2, y2) {
    return function (x) {
      if (x <= 0) return 0; if (x >= 1) return 1;
      var cx = 3 * x1, bx = 3 * (x2 - x1) - cx, ax = 1 - cx - bx, cy = 3 * y1, by = 3 * (y2 - y1) - cy, ay = 1 - cy - by, u = x, i, d, v;
      for (i = 0; i < 8; i++) { v = ((ax * u + bx) * u + cx) * u - x; if (Math.abs(v) < 1e-6) break; d = (3 * ax * u + 2 * bx) * u + cx; if (Math.abs(d) < 1e-6) break; u -= v / d; }
      if (u < 0 || u > 1) { var lo = 0, hi = 1; u = x; for (i = 0; i < 30; i++) { v = ((ax * u + bx) * u + cx) * u; if (v < x) lo = u; else hi = u; u = (lo + hi) / 2; } }
      return ((ay * u + by) * u + cy) * u;
    };
  }
  var liftEase = bez(.7, 0, .2, 1);
  /* re-timed easings (white port): the halftone M keeps landing until its read beat, and the fuse starts at once and finishes closing the gaps at 1.9 */
  function landEase(x) { return outQuad(x); }
  function fuseEase(x) { return .5 * x + .5 * inOutSine(x); }
  function sunEase(x) { return .5 * inOutSine(x) + .5 * outQuad(x); }
  function f(n) { return Math.round(n * 1000) / 1000; }
  function g2(n) { return Math.round(n * 100) / 100; }

  /* ---------------------------------------------------------------- DOM helpers */
  var NS = 'http://www.w3.org/2000/svg';
  function E(tag, a, p) { var e = document.createElementNS(NS, tag); if (a) for (var k in a) e.setAttribute(k, a[k]); if (p) p.appendChild(e); return e; }
  function A(e, k, v) { var c = '_' + k; if (e[c] === v) return; e[c] = v; e.setAttribute(k, v); }
  function H(e, hide) { A(e, 'display', hide ? 'none' : 'inline'); }

  /* ---------------------------------------------------------------- hex lattice (built once, cached across replays) */
  var LAT = null, LAT_MS = 0;
  function buildLattice(host) {
    var t0 = performance.now(), cand = [], m, c, x, y, i, n;
    for (m = 0; m < 18; m++) for (c = -10; c < 10; c++) {
      x = CXM + PL * (c + (m & 1 ? .5 : 0)); y = 8 + RP * m;
      if (x < 30.38 - RF || x > 664.54 + RF || y < 1.2 - RF || y > 591.31 + RF) continue;
      cand.push([x, y]);
    }
    var core = [], edge = [], api = true, svg, pf, ps;
    try {
      svg = E('svg', { width: 1, height: 1, viewBox: '0 0 695 621', style: 'position:absolute;left:0;top:0;visibility:hidden' }, host);
      pf = E('path', { d: M_D, fill: '#000' }, svg);
      ps = E('path', { d: M_D, fill: 'none', stroke: '#000', 'stroke-width': 2 * RF, 'stroke-linejoin': 'round' }, svg);
      for (i = 0; i < cand.length; i++) {
        var p = new DOMPoint(cand[i][0], cand[i][1]);
        if (pf.isPointInFill(p)) core.push(cand[i]); else if (ps.isPointInStroke(p)) edge.push(cand[i]);
      }
      if (!core.length) throw 0;
    } catch (e) { api = false; }
    if (svg && svg.parentNode) svg.parentNode.removeChild(svg);
    if (!api) {          /* fallback: flattened polygon, ray cast + segment distance */
      core = []; edge = [];
      var tp = E('path', { d: M_D }), L, poly = [];
      try { tp.setAttribute('d', M_D); (host.firstChild || host).appendChild(tp); L = tp.getTotalLength(); for (i = 0; i < 720; i++) { var q = tp.getPointAtLength(L * i / 720); poly.push([q.x, q.y]); } } catch (e) { }
      if (tp.parentNode) tp.parentNode.removeChild(tp);
      for (i = 0; i < cand.length; i++) {
        x = cand[i][0]; y = cand[i][1];
        var inside = false, md = 1e9, j, k, a, b, dx, dy, tt, ex, ey;
        for (j = 0, k = poly.length - 1; j < poly.length; k = j++) {
          a = poly[j]; b = poly[k];
          if ((a[1] > y) !== (b[1] > y) && x < (b[0] - a[0]) * (y - a[1]) / (b[1] - a[1]) + a[0]) inside = !inside;
          dx = b[0] - a[0]; dy = b[1] - a[1]; tt = clamp01(((x - a[0]) * dx + (y - a[1]) * dy) / (dx * dx + dy * dy || 1));
          ex = a[0] + tt * dx - x; ey = a[1] + tt * dy - y; md = Math.min(md, ex * ex + ey * ey);
        }
        if (inside) core.push(cand[i]); else if (md <= RF * RF) edge.push(cand[i]);
      }
    }
    var all = [], nc = core.length;
    core.forEach(function (p, k) { all.push({ x: p[0], y: p[1], core: 1, ci: k, d: Math.hypot(p[0] - SX, p[1] - SY) }); });
    edge.forEach(function (p) { all.push({ x: p[0], y: p[1], core: 0, ci: -1, d: Math.hypot(p[0] - SX, p[1] - SY) }); });
    var byA = all.slice().sort(function (a, b) { return a.d - b.d; });
    byA.forEach(function (o, k) { o.oa = k / (byA.length - 1); });
    var byC = byA.filter(function (o) { return o.core; });
    byC.forEach(function (o, k) { o.oc = k / (byC.length - 1); });
    var T = { n: all.length, nc: nc, x: [], y: [], core: [], oa: [], a: [], s0: [], ph: [], mg: [] };
    all.forEach(function (o) {   /* core cells first in row-major order, then edge cells */
      T.x.push(o.x); T.y.push(o.y); T.core.push(o.core); T.oa.push(o.oa);
      if (o.core) {
        T.a.push(.20 + .62 * o.oc);
        T.s0.push(.06 + .20 * frac(.7548776662 * (o.ci + 1)));
        T.ph.push(2.399963 * o.ci);
        T.mg.push(60 + 480 * Math.sqrt(frac(.6180339887 * (o.ci + 1))));
      } else { T.a.push(0); T.s0.push(0); T.ph.push(0); T.mg.push(0); }
    });
    T.dx = new Array(T.n); T.dy = new Array(T.n);
    LAT = T; LAT_MS = performance.now() - t0; LAT.api = api;
  }

  /* ---------------------------------------------------------------- state */
  var S = { mounted: false, playing: false, frozen: false, root: null, svg: null, N: {}, vw: 0, vh: 0, K: 1, HW: 0, SAG: 90, RMAX: 1000, dpr: 1,
            raf: 0, at: 0, last: 0, wall: 0, wd: 0, curT: 0, fired: {}, timers: [], ending: false, ry: null };
  var api = { __v: 7.1, DUR: DUR, onBeat: null };

  function css() {
    if (document.getElementById('mmc-pre-css')) return;
    var s = document.createElement('style'); s.id = 'mmc-pre-css';
    s.textContent = '#mmc-pre{position:fixed;left:0;top:0;z-index:2147483000;background:transparent;color-scheme:light;contain:strict;overflow:hidden;touch-action:none;-webkit-tap-highlight-color:transparent;cursor:default}' +
      '#mmc-pre svg{display:block;position:absolute;left:0;top:0;shape-rendering:geometricPrecision}' +
      '#mmc-pre .mmc-skip{position:absolute;right:16px;margin:0;padding:14px 12px;border:0;background:none;color:#0F1E5E;font:600 12px/1 Raleway,"Helvetica Neue",Arial,sans-serif;letter-spacing:.06em;cursor:pointer;opacity:0;-webkit-appearance:none;appearance:none}' +
      '#mmc-pre .mmc-skip:focus-visible{outline:2px solid #1A478F;outline-offset:2px}' +
      '#mmc-pre .mmc-bgf{position:absolute;left:0;top:0;width:100%;background:#fff}' +
      'html.mmc-pre-lock{overflow:hidden;scrollbar-gutter:stable}';
    (document.head || document.documentElement).appendChild(s);
  }

  /* ---------------------------------------------------------------- build */
  function build() {
    var root = document.createElement('div'); root.id = 'mmc-pre'; root.setAttribute('role', 'presentation'); root.setAttribute('aria-hidden', 'true');
    var svg = E('svg', { xmlns: NS }, root), N = S.N = {}, i;
    var defs = E('defs', 0, svg);
    E('path', { d: CLIP_OUTER }, E('clipPath', { id: 'mmcp-co' }, defs));
    E('rect', { x: 180, y: 300, width: 335, height: 291.36 }, E('clipPath', { id: 'mmcp-sun' }, defs));
    E('rect', { x: -2000, y: 660, width: 4700, height: 64 }, E('clipPath', { id: 'mmcp-band' }, defs));
    E('rect', { x: -62, y: -20, width: 124, height: 40 }, E('clipPath', { id: 'mmcp-tag' }, defs));
    N.bgf = document.createElement('div'); N.bgf.className = 'mmc-bgf'; root.insertBefore(N.bgf, svg);   /* CSS white under the svg: first paint is white */
    E('clipPath', { id: 'mmcp-m' }, defs).appendChild(E('path', { d: M_D }));
    N.rimB = E('path', { fill: 'none', stroke: BLUE, 'stroke-linejoin': 'round' }, svg);     /* hand-off rim: under the white dome, lifts rigidly with it */
    N.rimY = E('path', { fill: 'none', stroke: YEL, 'stroke-linejoin': 'round' }, svg);
    N.bg = E('path', { fill: BG }, svg);
    var lock = N.lock = E('g', 0, svg);
    var sw = N.sw = E('g', 0, lock);
    N.disc = E('path', { fill: BLUE, display: 'none' }, E('g', { 'clip-path': 'url(#mmcp-co)' }, sw));
    N.arch = E('path', { d: ARCH_D, fill: BG }, sw);
    N.dotsO = E('path', { fill: AMBER, display: 'none' }, sw);      /* audience dots: yellow coin + amber rim (two flat paths, rim tapers in with the dot) */
    N.dots = E('path', { fill: YEL, display: 'none' }, sw);
    var tag = N.tag = E('g', { display: 'none' }, sw);
    N.tsh = E('rect', { x: -75, y: -26, width: 150, height: 52, rx: 26, fill: BLUE }, tag);   /* flat offset shadow (offset set in layout) */
    N.tbd = E('rect', { x: -75, y: -26, width: 150, height: 52, rx: 26, fill: BG }, tag);      /* thin white keyline so the pill separates from blue discs */
    E('rect', { x: -75, y: -26, width: 150, height: 52, rx: 26, fill: YEL }, tag);
    var tg = E('g', { fill: INK }, E('g', { 'clip-path': 'url(#mmcp-tag)' }, tag));
    N.d1a = E('path', {}, tg); N.d1b = E('path', {}, tg); N.d2a = E('path', {}, tg); N.d2b = E('path', {}, tg);
    E('circle', { cx: CX_DOT, cy: CB - 4.3, r: 4.3 }, tg);
    E('path', { d: GL.glyphs.M, transform: 'translate(' + f(CX_M - 432.5 * TWC) + ' ' + CB + ') scale(' + f(TWC) + ' ' + f(-TWC) + ')' }, tg);
    N.mm = E('path', { d: M_D, fill: BLUE, display: 'none' }, lock);
    N.rip = E('path', { fill: BLUE, display: 'none' }, lock);                 /* ripple dots: blue on white ... */
    N.ripY = E('path', { fill: YEL, display: 'none', 'clip-path': 'url(#mmcp-m)' }, lock);   /* ... and yellow where they cross the blue M */
    var sc = E('g', { 'clip-path': 'url(#mmcp-sun)' }, lock);
    N.sun = E('g', 0, sc); N.sunp = E('path', { d: SUN_D, fill: YEL }, N.sun);
    N.ray = RAYS.map(function (r) { return E('line', { x1: r.x1, y1: r.y1, x2: r.x1, y2: r.y1, stroke: YEL, 'stroke-linecap': 'round', display: 'none' }, lock); });
    N.wg = [];
    GL.words.forEach(function (w) {
      var band = E('g', { 'clip-path': 'url(#mmcp-band)' }, lock), mv = E('g', { fill: BLUE }, band);
      var sg = E('g', { transform: 'translate(' + w.x + ' 712) scale(' + GL.k + ' ' + (-GL.k) + ')' }, mv);
      w.g.forEach(function (g) { E('path', { d: GL.glyphs[g[0]], transform: 'translate(' + g[1] + ' 0)' }, sg); });
      N.wg.push(mv);
    });
    var b = N.skip = document.createElement('button'); b.type = 'button'; b.className = 'mmc-skip'; b.tabIndex = -1; b.textContent = 'Skip';
    root.appendChild(b);
    S.root = root; S.svg = svg;
  }

  /* ---------------------------------------------------------------- layout (init + resize only) */
  function layout() {
    var vw = window.innerWidth || document.documentElement.clientWidth, vh = window.innerHeight || document.documentElement.clientHeight, N = S.N, i;
    var SAG = Math.min(260, Math.max(90, .18 * vw)), K = Math.min(vw * (vw < 700 ? .58 : .42) / 634.16, vh * .5 / 682);
    var TX = vw / 2, TY = .5 * vh, B = vh + 8 + SAG, R = (vw * vw / 4 + SAG * SAG) / (2 * SAG);
    S.vw = vw; S.vh = vh; S.K = K; S.SAG = SAG; S.HW = vw / (2 * K) + 24; S.dpr = window.devicePixelRatio || 1; S.D = vh + SAG + 32;   /* +20: rim (18) + 2 safety, so the last frame is fully off-screen */
    var sx = TX, sy = TY + (SY - 371) * K;
    S.RMAX = Math.hypot(Math.max(sx, vw - sx), sy) / K + 60;
    S.MB = vw < 700 ? 1.25 : 1;
    S.RT = K < .5 ? 10.5 : 8;                       /* travelling dot radius in mark units (bigger on phones) */
    var HB = vh + SAG + 32;                         /* svg/root height: dome + room for the rim below the flanks */
    S.root.style.width = vw + 'px'; S.root.style.height = HB + 'px';
    N.bgf.style.height = vh + 'px';
    A(S.svg, 'width', vw); A(S.svg, 'height', HB); A(S.svg, 'viewBox', '0 0 ' + vw + ' ' + HB);
    A(N.bg, 'd', 'M0 0 H' + f(vw) + ' V' + f(B) + ' A' + f(R) + ' ' + f(R) + ' 0 0 0 0 ' + f(B) + ' Z');
    /* rim = the dome's leading arc, extended 300px past both sides, stroked twice under the white fill: visible = white | yellow | blue | page */
    var ry = vw >= 768 ? 6 : 5, rb = vw >= 768 ? 12 : 10, cyc = vh + 8 + R, ex = 300, ey = cyc - Math.sqrt(Math.max(0, R * R - (vw / 2 + ex) * (vw / 2 + ex)));
    var rd = 'M' + f(-ex) + ' ' + f(ey) + ' A' + f(R) + ' ' + f(R) + ' 0 0 1 ' + f(vw + ex) + ' ' + f(ey);
    A(N.rimB, 'd', rd); A(N.rimY, 'd', rd); A(N.rimB, 'stroke-width', 2 * rb + 2 * ry); A(N.rimY, 'stroke-width', 2 * ry);
    /* tag: flat offset shadow +3px,+3px and a 2px keyline, in mark units at full size */
    var ku = 1 / (K * (vw < 700 ? 1.25 : 1));
    A(N.tsh, 'transform', 'translate(' + f(3 * ku) + ' ' + f(3 * ku) + ')');
    A(N.tbd, 'x', f(-75 - 2 * ku)); A(N.tbd, 'y', f(-26 - 2 * ku)); A(N.tbd, 'width', f(150 + 4 * ku)); A(N.tbd, 'height', f(52 + 4 * ku)); A(N.tbd, 'rx', f(26 + 2 * ku));
    /* wordmark: MARKETING is logo yellow only when its cap height is >= 24px, else deep amber */
    A(N.wg[1], 'fill', 26.1 * K >= 24 ? YEL : AMBERTX);
    A(N.lock, 'transform', 'translate(' + f(TX) + ' ' + f(TY) + ') scale(' + f(K) + ') translate(-347.5 -371)');
    N.skip.style.top = Math.round(vh - 46) + 'px';
    /* scatter offsets: golden-angle directions, reflected inward so every dot starts on screen */
    var mg = 14 / K, x0 = SX - (vw / 2) / K + mg, x1 = SX + (vw / 2) / K - mg, y0 = 371 - TY / K + mg, y1 = 371 + (vh - TY) / K - mg;
    for (i = 0; i < LAT.n; i++) {
      if (!LAT.core[i]) continue;
      var ox = LAT.mg[i] * Math.cos(LAT.ph[i]), oy = LAT.mg[i] * Math.sin(LAT.ph[i]), px = LAT.x[i] + ox, py = LAT.y[i] + oy;
      if (px < x0 || px > x1) ox = -ox; if (py < y0 || py > y1) oy = -oy;
      px = LAT.x[i] + ox; py = LAT.y[i] + oy;
      if (px < x0) ox += x0 - px; else if (px > x1) ox -= px - x1;
      if (py < y0) oy += y0 - py; else if (py > y1) oy -= py - y1;
      LAT.dx[i] = ox; LAT.dy[i] = oy;
    }
  }

  /* ---------------------------------------------------------------- render(t): pure function of t */
  function dglyph(el, ch, cx, by) {
    var g = GL.dig[ch], b = g[2];
    A(el, 'd', g[0]);
    A(el, 'transform', 'translate(' + f(cx - (b[0] + b[2]) / 2 * TWC) + ' ' + f(by) + ') scale(' + f(TWC) + ' ' + f(-TWC) + ')');
  }
  function circ(x, y, r) { var d = 2 * r; return 'M' + g2(x - r) + ' ' + g2(y) + 'a' + g2(r) + ' ' + g2(r) + ' 0 1 0 ' + g2(d) + ' 0a' + g2(r) + ' ' + g2(r) + ' 0 1 0 ' + g2(-d) + ' 0'; }
  function render(t) {
    if (!S.mounted) return;
    t = t < 0 ? 0 : t > DUR ? DUR : t;
    var N = S.N, i, n = LAT.n, solid = t >= T_SWAP;
    H(N.sw, solid); H(N.mm, !solid);
    if (!solid) {
      var X = LAT.x, Y = LAT.y, D = '', P = '', PO = '', RT = S.RT, doDots = t < 1.3, doFuse = t > T_FUSE0, K = S.K, OWK = 1.5 / K;
      for (i = 0; i < n; i++) {
        var core = LAT.core[i], pe = 0, r1 = 0, r, oa = LAT.oa[i];
        if (core) {
          var a = LAT.a[i];
          pe = landEase(seg(t, a, a + .42));
          if (pe > .55) r1 = R1 * outCubic((pe - .55) / .45);
          if (doDots && pe < 1) {
            var sp = outCubic(seg(t, LAT.s0[i], LAT.s0[i] + .10)), rd = RT * sp * (1 - seg(pe, .8, 1));
            if (rd >= .3) { var w = 1 - pe, dx = X[i] + w * LAT.dx[i], dyy = Y[i] + w * LAT.dy[i]; P += circ(dx, dyy, rd); PO += circ(dx, dyy, rd + OWK * Math.min(1, rd * K / 3)); }
          }
        }
        r = r1;
        if (doFuse) { var qf = fuseEase(seg(t, T_FUSE0 + FUSE_SPREAD * oa, T_FUSE0 + FUSE_SPREAD * oa + FUSE_LEN)); r = r1 + (RF - r1) * qf; }
        if (r >= .3) D += circ(X[i], Y[i], r);
      }
      if (D) { H(N.disc, 0); A(N.disc, 'd', D); } else H(N.disc, 1);
      if (P) { H(N.dots, 0); H(N.dotsO, 0); A(N.dots, 'd', P); A(N.dotsO, 'd', PO); } else { H(N.dots, 1); H(N.dotsO, 1); }
      /* reach counter: fixed cells, odometer roll on the tenths digit */
      var st = S.MB * outCubic(seg(t, .10, .30)) * (1 - inCubic(seg(t, T_FUSE0 + .04, T_FUSE0 + .22)));
      if (st < .01) H(N.tag, 1); else {
        H(N.tag, 0);
        A(N.tag, 'transform', 'translate(' + f(CXM) + ' 300) scale(' + f(st) + ')');
        var v = 10 * seg(t, .30, 1.20), nn = Math.min(10, Math.floor(v + 1e-4)), fr = nn >= 10 ? 0 : v - nn, roll = inOutCubic(clamp01((fr - .55) / .45)), r9 = nn === 9 ? roll : 0;
        dglyph(N.d2a, String(nn % 10), CX_D2, CB - roll * RH);
        if (roll > 0) { H(N.d2b, 0); dglyph(N.d2b, String((nn + 1) % 10), CX_D2, CB + RH - roll * RH); } else H(N.d2b, 1);
        dglyph(N.d1a, nn >= 10 ? '1' : '0', CX_D1, CB - r9 * RH);
        if (r9 > 0) { H(N.d1b, 0); dglyph(N.d1b, '1', CX_D1, CB + RH - r9 * RH); } else H(N.d1b, 1);
      }
    }

    /* reach ripple: 36 white dots on a half circle */
    var x = seg(t, T_HIT, T_LOCK), ramp = Math.min(1, x / .08), rr = Math.max(7 * ramp * Math.pow(1 - x, 1.2), 3.2 / S.K * ramp * (1 - seg(x, .9, 1)));   /* >= 3.2px, ends by shrinking in the last 70ms */
    if (rr < .3) { H(N.rip, 1); H(N.ripY, 1); } else {
      var R = 130.52 + (S.RMAX - 130.52) * inOutQuad(x), Q = '';
      for (i = 0; i < 36; i++) { var th = Math.PI * (i + .5) / 36; Q += circ(SX + R * Math.cos(th), SY - R * Math.sin(th), rr); }
      H(N.rip, 0); A(N.rip, 'd', Q); H(N.ripY, 0); A(N.ripY, 'd', Q);
    }
    /* sun */
    var dy = 132 * (1 - sunEase(seg(t, 2.0, 2.4)));
    if (dy >= 131.5) H(N.sun, 1); else {
      var s = 1 + .05 * Math.pow(Math.sin(Math.PI * seg(t, T_HIT, 2.8)), 1.5);
      H(N.sun, 0); A(N.sun, 'transform', 'translate(0 ' + f(dy) + ') translate(347.5 591.6) scale(' + f(s) + ') translate(-347.5 -591.6)');
    }
    /* rays */
    for (i = 0; i < RAYS.length; i++) {
      var ry = RAYS[i], sj = T_HIT + .04 * ry.o, gg = outBack(seg(t, sj, sj + .4), 1.3), ln = N.ray[i];
      if (gg < .002) H(ln, 1); else { H(ln, 0); A(ln, 'x2', f(ry.x1 + ry.dx * gg)); A(ln, 'y2', f(ry.y1 + ry.dy * gg)); A(ln, 'stroke-width', f(ry.w * Math.min(1, gg / .15))); }
    }
    /* wordmark */
    for (i = 0; i < 3; i++) A(N.wg[i], 'transform', 'translate(0 ' + f(56 * (1 - outCubic(seg(t, 2.5 + .07 * i, 2.92 + .07 * i)))) + ')');
    /* skip label */
    var so = seg(t, .8, 1.1) * (1 - seg(t, 2.9, 3.1));
    if (N.skip._o !== so) { N.skip._o = so; N.skip.style.opacity = f(so); N.skip.style.pointerEvents = so > .5 ? 'auto' : 'none'; }
    /* the hand-off: one rigid lift of the whole overlay */
    var Yl = -S.D * liftEase(seg(t, T_LIFT, DUR));
    Yl = Math.round(Yl * S.dpr) / S.dpr;
    if (S.ry !== Yl) { S.ry = Yl; S.root.style.transform = Yl === 0 && t < T_LIFT - .05 ? '' : 'translate3d(0,' + Yl + 'px,0)'; }
    if (t >= T_LIFT - .05 && !S.wc) { S.wc = 1; S.root.style.willChange = 'transform'; }
    if (t >= T_LIFT) S.root.style.pointerEvents = 'none';
  }

  /* ---------------------------------------------------------------- lifecycle */
  function seen() { try { return sessionStorage.getItem('mmc-pre-seen') === '1'; } catch (e) { return false; } }
  function mark() { try { sessionStorage.setItem('mmc-pre-seen', '1'); } catch (e) { } }
  function beat(name, t) { var cb = api.onBeat; if (!cb) return; try { if (typeof cb === 'function') cb(name, t); else if (cb[name]) cb[name](t); } catch (e) { } }
  function later(fn, ms) { var id = setTimeout(fn, ms); S.timers.push(id); }
  function mount() {
    if (S.mounted) return;
    css(); build(); (document.body || document.documentElement).appendChild(S.root);
    if (!LAT) buildLattice(S.root);
    S.root.style.willChange = 'transform';        /* own layer from the start: promoting it at 3.35 would re-rasterise the wordmark (AA shift) during the hold */
    S.mounted = true; S.ry = null; S.wc = 0;
    layout(); render(0);
    window.addEventListener('resize', onResize);
    if (window.visualViewport) window.visualViewport.addEventListener('resize', onResize);
    S.root.addEventListener('pointerdown', onPointer);
    S.N.skip.addEventListener('click', function (ev) { ev.stopPropagation(); doSkip(); });
  }
  function onResize() { if (S.mounted) { layout(); render(S.curT); } }
  function block(e) { if (S.playing && !S.frozen) e.preventDefault(); }
  function unmount() {
    if (!S.mounted) return;
    cancelAnimationFrame(S.raf); clearInterval(S.wd); S.timers.forEach(clearTimeout); S.timers = [];
    window.removeEventListener('resize', onResize);
    if (window.visualViewport) window.visualViewport.removeEventListener('resize', onResize);
    window.removeEventListener('keydown', onKey, true);
    window.removeEventListener('wheel', block, true);
    window.removeEventListener('touchmove', block, true);
    document.removeEventListener('visibilitychange', onVis);
    if (S.root.parentNode) S.root.parentNode.removeChild(S.root);
    document.documentElement.classList.remove('mmc-pre-lock');
    S.mounted = false; S.playing = false; S.frozen = false; S.ending = false; S.root = null;
  }
  function finish(quiet) {
    if (!S.mounted) return;
    var was = S.playing && !S.frozen;
    unmount();
    if (was && !quiet) { try { document.dispatchEvent(new Event('mmc:preloader-done')); } catch (e) { } beat('done', DUR); }
  }
  function fadeOut(ms) {
    if (!S.mounted || S.ending) return;
    S.ending = true; cancelAnimationFrame(S.raf);
    var r = S.root; r.style.transition = 'opacity ' + ms + 'ms linear'; r.style.pointerEvents = 'none';
    void r.offsetWidth; r.style.opacity = 0;
    later(function () { finish(); }, ms + 30);
  }
  function doSkip() {
    if (!S.mounted || !S.playing || S.frozen || S.ending || S.curT >= T_LIFT) return;
    mark(); fadeOut(180);
  }
  function onPointer() { if (S.curT > .1) doSkip(); }
  function onKey(e) { if ((e.key === 'Escape' || e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') && S.curT > .25) { if (e.key !== 'Escape') e.preventDefault(); doSkip(); } }
  function onVis() { S.last = 0; }   // resume from the animation time we had; the per-frame dt clamp does the rest
  var BEATS = [['hit', T_HIT], ['lock', T_LOCK], ['lift', T_LIFT]];
  function tick(now) {
    if (!S.playing || S.ending) return;
    var dt = S.last ? (now - S.last) / 1000 : 0; S.last = now;
    S.at += dt < 0 ? 0 : dt > .05 ? .05 : dt;      // clamp dt: a stall never skips a beat, a hidden tab pauses
    var t = S.at;
    try {
      if (t >= DUR) { S.curT = DUR; render(DUR); finish(); return; }
      S.curT = t;
      var c0 = api.__prof ? performance.now() : 0;
      render(t);
      if (api.__prof) api.__prof.push(performance.now() - c0);
      for (var i = 0; i < BEATS.length; i++) if (!S.fired[BEATS[i][0]] && t >= BEATS[i][1]) { S.fired[BEATS[i][0]] = 1; beat(BEATS[i][0], t); }
    } catch (e) { finish(); return; }
    S.raf = requestAnimationFrame(tick);
  }
  function forced() { try { return window.matchMedia('(forced-colors: active)').matches; } catch (e) { return false; } }
  function reduced() { try { return window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { return false; } }
  function play(force) {
    if (S.playing && !force) return;
    if (!force && seen()) return;
    if (S.mounted) unmount();
    if (forced()) { mark(); return; }              /* forced-colors: no animation, no overlay */
    mark(); mount(); S.playing = true; S.frozen = false; S.fired = {}; S.ending = false;
    window.addEventListener('keydown', onKey, true);
    window.addEventListener('wheel', block, { passive: false, capture: true });
    window.addEventListener('touchmove', block, { passive: false, capture: true });
    document.documentElement.classList.add('mmc-pre-lock');
    if (reduced()) {
      S.curT = 3.1; render(3.1); S.N.skip.style.display = 'none';
      later(function () { if (S.mounted) { S.root.style.transition = 'opacity 200ms linear'; S.root.style.opacity = 0; } }, 500);
      later(function () { finish(); }, 730);
      return;
    }
    document.addEventListener('visibilitychange', onVis);
    S.at = 0; S.last = 0; S.wall = 0;
    S.wd = setInterval(function () { if (!document.hidden && (S.wall += .4) > 7) finish(); }, 400);   // failsafe tied to visible time
    S.raf = requestAnimationFrame(tick);
  }
  function freeze(t) {
    if (S.mounted) unmount();
    mount(); S.frozen = true; S.playing = false; S.curT = t; render(t);
    S.root.style.pointerEvents = 'none';
  }
  api.play = play; api.skip = doSkip; api.freeze = freeze;
  api.render = function (t) { if (!S.mounted) return; S.curT = t; render(t); };
  api.__lattice = function () { return LAT ? { n: LAT.n, core: LAT.nc, edge: LAT.n - LAT.nc, ms: LAT_MS, api: LAT.api } : null; };
  window.MMCPreloader = api;

  var q = /[?&]mmcpre_t=([0-9.]+)/.exec(location.search), pm = /[?&]preloader=(\w+)/.exec(location.search);
  if (q) freeze(parseFloat(q[1]));
  else if (!(pm && pm[1] === 'off')) play(!!(pm && pm[1] === 'force'));
})();

/*!
 * MMC preloader - "COMPOUND" (option 4, WHITE theme): a performance dashboard climbs, then resolves into the brand.
 * Pure vector code animation: inline SVG + vanilla JS + CSS. No video, no raster, no libraries, no fetches.
 * One pure render(t) driven by one clock. ?mmcpre_t=<seconds> freezes at t. ?preloader=off|force.
 * API: window.MMCPreloader = { play(force), render(t), skip(), freeze(t), DUR, onBeat }
 */
(function () {
  'use strict';
  if (window.MMCPreloader && window.MMCPreloader.__v === 4.1) return;

  var DUR = 4.05, T_HIT = 2.40, T_LOCK = 3.10, T_LIFT = 3.40, T_SWAP = 2.06;
  var BG = '#FFFFFF', BLUE = '#1A478F', INK = '#0F1E5E', YEL = '#FBB615', AMBER = '#B87A00', AMBERTX = '#A96B00', WHITE = '#FFFFFF';
  var RIMX = 24;   // extra svg height so the hand-off rim is never cut at the flanks
  var SX = 347.5, SY = 591.6, CXM = 347.46, BASE = 591.31;
  var NB = 9, PITCH = 634.16 / NB, X0 = 30.38;
  var M_D = 'M30.38 563.7 L30.38 126.64 C30.38 42.12 123.76 1.2 189.82 54.72 L292.54 137.95 C310.72 152.68 317.76 160.9 347.46 160.9 C377.16 160.9 384.2 152.68 402.38 137.95 L505.1 54.72 C571.16 1.2 664.54 42.12 664.54 126.64 L664.54 563.7 A27.6 27.6 0 0 1 636.94 591.31 L528.88 591.31 A26.67 26.67 0 0 1 502.5 568.59 A156.77 156.77 0 0 0 192.42 568.59 A26.67 26.67 0 0 1 166.04 591.31 L57.98 591.31 A27.6 27.6 0 0 1 30.38 563.7Z';
  var CLIP_OUTER = 'M30.38 563.7 L30.38 126.64 C30.38 42.12 123.76 1.2 189.82 54.72 L292.54 137.95 C310.72 152.68 317.76 160.9 347.46 160.9 C377.16 160.9 384.2 152.68 402.38 137.95 L505.1 54.72 C571.16 1.2 664.54 42.12 664.54 126.64 L664.54 563.7 A27.6 27.6 0 0 1 636.94 591.31 L57.98 591.31 A27.6 27.6 0 0 1 30.38 563.7Z';
  var DOOR_D = 'M166.04 592.5 L166.04 591.31 A26.67 26.67 0 0 0 192.42 568.59 A156.77 156.77 0 0 1 502.5 568.59 A26.67 26.67 0 0 0 528.88 591.31 L528.88 592.5 Z';
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

  /* ---------------------------------------------------------------- pure helpers */
  function clamp01(x) { return x < 0 ? 0 : x > 1 ? 1 : x; }
  function seg(t, a, b) { return clamp01((t - a) / (b - a)); }
  function outCubic(x) { return 1 - Math.pow(1 - x, 3); }
  function inCubic(x) { return x * x * x; }
  function outExpo(x) { return x >= 1 ? 1 : 1 - Math.pow(2, -10 * x); }
  function inOutSine(x) { return -(Math.cos(Math.PI * x) - 1) / 2; }
  function inOutQuad(x) { return x < .5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2; }
  function inOutCubic(x) { return x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; }
  function outBack(x, c) { var u = x - 1; return 1 + (c + 1) * u * u * u + c * u * u; }
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
  function f(n) { return Math.round(n * 1000) / 1000; }

  /* ---------------------------------------------------------------- M skyline (sampled once at init from the real outline) */
  var HC = [], YTOP = [], YPROF = [], CXS = [];
  (function () {
    var e = Math.exp(2.6), i, j, pts = [];
    function cub(p0, p1, p2, p3, n) { for (var k = 0; k <= n; k++) { var u = k / n, v = 1 - u; pts.push([v * v * v * p0[0] + 3 * v * v * u * p1[0] + 3 * v * u * u * p2[0] + u * u * u * p3[0], v * v * v * p0[1] + 3 * v * v * u * p1[1] + 3 * v * u * u * p2[1] + u * u * u * p3[1]]); } }
    cub([30.38, 126.64], [30.38, 42.12], [123.76, 1.2], [189.82, 54.72], 80);
    cub([292.54, 137.95], [310.72, 152.68], [317.76, 160.9], [347.46, 160.9], 40);
    pts.splice(81, 0, [189.82, 54.72]);
    function prof(x) {
      if (x > CXM) x = 694.92 - x;
      for (var k = 1; k < pts.length; k++) if (pts[k][0] >= x) { var a = pts[k - 1], b = pts[k], d = b[0] - a[0]; return d < 1e-9 ? b[1] : a[1] + (b[1] - a[1]) * (x - a[0]) / d; }
      return pts[pts.length - 1][1];
    }
    for (i = 0; i < NB; i++) {
      var x0 = X0 + PITCH * i, cx = x0 + PITCH / 2, m = 1e9;
      for (j = 0; j <= 32; j++) m = Math.min(m, prof(x0 + PITCH * j / 32));
      HC.push(24 + 476 * (Math.exp(2.6 * i / 8) - 1) / (e - 1));
      YTOP.push(m); YPROF.push(prof(cx)); CXS.push(cx);
    }
  })();

  /* ---------------------------------------------------------------- DOM helpers */
  var NS = 'http://www.w3.org/2000/svg';
  function E(tag, a, p) { var e = document.createElementNS(NS, tag); if (a) for (var k in a) e.setAttribute(k, a[k]); if (p) p.appendChild(e); return e; }
  function A(e, k, v) { var c = '_' + k; if (e[c] === v) return; e[c] = v; e.setAttribute(k, v); }
  function H(e, hide) { A(e, 'display', hide ? 'none' : 'inline'); }

  /* ---------------------------------------------------------------- state */
  var S = { mounted: false, playing: false, frozen: false, root: null, svg: null, N: {}, vw: 0, vh: 0, K: 1, HW: 0, SAG: 90, RMAX: 1000, dpr: 1,
            raf: 0, at: 0, last: 0, wall: 0, wd: 0, curT: 0, fired: {}, timers: [], ending: false, ry: null };
  var api = { __v: 4.1, DUR: DUR, onBeat: null };

  function css() {
    if (document.getElementById('mmc-pre-css')) return;
    var s = document.createElement('style'); s.id = 'mmc-pre-css';
    s.textContent = '#mmc-pre{position:fixed;left:0;top:0;z-index:2147483000;background:transparent;color-scheme:light;contain:strict;overflow:hidden;touch-action:none;-webkit-tap-highlight-color:transparent;cursor:default}' +
      '#mmc-pre svg{display:block;position:absolute;left:0;top:0;shape-rendering:geometricPrecision}' +
      '#mmc-pre .mmc-skip{position:absolute;right:16px;margin:0;padding:8px 10px;border:0;background:none;color:#0F1E5E;font:600 12px/1 Raleway,"Helvetica Neue",Arial,sans-serif;letter-spacing:.06em;cursor:pointer;opacity:0;-webkit-appearance:none;appearance:none}' +
      '#mmc-pre .mmc-skip:focus-visible{outline:2px solid #1A478F;outline-offset:2px}' +
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
    E('rect', { x: -52, y: -38, width: 104, height: 36 }, E('clipPath', { id: 'mmcp-tag' }, defs));
    var rc = E('clipPath', { id: 'mmcp-out', 'clip-rule': 'evenodd' }, defs);
    E('path', { d: 'M-4000 -4000H5000V4000H-4000Z ' + CLIP_OUTER, 'clip-rule': 'evenodd' }, rc);
    /* hand-off rim: white | 6px yellow | 12px blue, strokes of the dome arc drawn UNDER the white dome, same transformed root */
    N.rimB = E('path', { fill: 'none', stroke: BLUE, 'stroke-linejoin': 'round' }, svg);
    N.rimY = E('path', { fill: 'none', stroke: YEL, 'stroke-linejoin': 'round' }, svg);
    N.bg = E('path', { fill: BG }, svg);
    var lock = N.lock = E('g', 0, svg);
    N.base = E('rect', { fill: AMBER, height: 4 }, lock);
    var chart = N.chart = E('g', 0, lock);
    var bars = E('g', { 'clip-path': 'url(#mmcp-co)' }, chart);
    N.bar = []; N.gl = [];
    for (i = 0; i < NB; i++) N.bar.push(E('rect', { fill: BLUE, display: 'none' }, bars));
    for (i = 0; i < NB; i++) N.gl.push(E('rect', { fill: YEL, display: 'none' }, bars));
    N.door = E('path', { d: DOOR_D, fill: BG, display: 'none' }, chart);
    N.lineC = E('path', { fill: 'none', stroke: BG, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', pathLength: 1, display: 'none' }, chart);
    N.line = E('path', { fill: 'none', stroke: AMBER, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', pathLength: 1, display: 'none' }, chart);
    N.dot = []; for (i = 0; i < NB; i++) N.dot.push(E('circle', { fill: WHITE, stroke: AMBER, display: 'none' }, chart));
    var tag = N.tag = E('g', { display: 'none' }, chart);
    E('rect', { x: -47, y: -35, width: 104, height: 40, rx: 20, fill: BLUE }, tag);
    E('rect', { x: -52, y: -40, width: 104, height: 40, rx: 20, fill: YEL }, tag);
    var tt = N.tt = E('g', { 'clip-path': 'url(#mmcp-tag)' }, E('g', 0, tag));
    N.tg = E('g', { fill: INK }, tt);
    N.gCur = E('path', {}, N.tg); N.gNext = E('path', {}, N.tg); N.gTens = E('path', { display: 'none' }, N.tg); N.gX = E('path', { d: GL.dig.x[0] }, N.tg);
    N.mm = E('path', { d: M_D, fill: BLUE, display: 'none' }, lock);
    N.ring = E('path', { fill: 'none', stroke: BG, display: 'none' }, E('g', { 'clip-path': 'url(#mmcp-co)' }, lock));
    N.wave = E('path', { fill: 'none', stroke: BLUE, display: 'none' }, E('g', { 'clip-path': 'url(#mmcp-out)' }, lock));
    N.echo = E('path', { fill: 'none', stroke: AMBER, display: 'none' }, E('g', { 'clip-path': 'url(#mmcp-out)' }, lock));
    var sc = E('g', { 'clip-path': 'url(#mmcp-sun)' }, lock);
    N.sun = E('g', 0, sc); N.sunp = E('path', { d: SUN_D, fill: YEL }, N.sun);
    N.ray = RAYS.map(function (r) { return E('line', { x1: r.x1, y1: r.y1, x2: r.x1, y2: r.y1, stroke: YEL, 'stroke-linecap': 'round', display: 'none' }, lock); });
    N.wg = [];
    GL.words.forEach(function (w) {
      var band = E('g', { 'clip-path': 'url(#mmcp-band)' }, lock), mv = E('g', { fill: N.wg.length === 1 ? AMBERTX : BLUE }, band);
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
    var vw = window.innerWidth || document.documentElement.clientWidth, vh = window.innerHeight || document.documentElement.clientHeight, N = S.N;
    var SAG = Math.min(260, Math.max(90, .18 * vw)), K = Math.min(vw * (vw < 700 ? .58 : .42) / 634.16, vh * .5 / 682);
    var TX = vw / 2, TY = .5 * vh, B = vh + 8 + SAG, R = (vw * vw / 4 + SAG * SAG) / (2 * SAG);
    S.vw = vw; S.vh = vh; S.K = K; S.SAG = SAG; S.HW = vw / (2 * K) + 24; S.dpr = window.devicePixelRatio || 1; S.D = vh + SAG + 12 + RIMX + 8; S.B = B; S.R = R; S.px = vw < 768 ? 5 : 6;
    var sx = TX, sy = TY + (SY - 371) * K;
    S.RMAX = Math.hypot(Math.max(sx, vw - sx), sy) / K + 60;
    S.ts = K < .5 ? 1.5 : 1;
    S.minW = 2.2 / K;
    var SH = vh + SAG + 8 + RIMX;
    S.root.style.width = vw + 'px'; S.root.style.height = SH + 'px';
    A(S.svg, 'width', vw); A(S.svg, 'height', SH); A(S.svg, 'viewBox', '0 0 ' + vw + ' ' + SH);
    A(N.bg, 'd', 'M0 0 H' + f(vw) + ' V' + f(B) + ' A' + f(R) + ' ' + f(R) + ' 0 0 0 0 ' + f(B) + ' Z');
    var hc = Math.min(vw / 2 + 300, R * .97), ry = vh + 8 + R - Math.sqrt(R * R - hc * hc), rp = 'M' + f(vw / 2 - hc) + ' ' + f(ry) + 'A' + f(R) + ' ' + f(R) + ' 0 0 1 ' + f(vw / 2 + hc) + ' ' + f(ry);
    A(N.rimB, 'd', rp); A(N.rimY, 'd', rp); A(N.rimB, 'stroke-width', 2 * (2 * S.px) + 2 * S.px); A(N.rimY, 'stroke-width', 2 * S.px);
    A(N.lock, 'transform', 'translate(' + f(TX) + ' ' + f(TY) + ') scale(' + f(K) + ') translate(-347.5 -371)');
    N.skip.style.top = Math.round(vh - 46) + 'px';
  }

  /* ---------------------------------------------------------------- render(t): pure function of t */
  var TW = 24 / 710, CELL = 22, XA = GL.dig.x[1] * TW, GAPX = 1.5, W2 = 2 * CELL + GAPX + XA;
  function dglyph(el, ch, cx, by) {
    var g = GL.dig[ch], b = g[2];
    A(el, 'd', g[0]);
    A(el, 'transform', 'translate(' + f(cx - (b[0] + b[2]) / 2 * TW) + ' ' + f(by) + ') scale(' + f(TW) + ' ' + f(-TW) + ')');
  }
  function render(t) {
    if (!S.mounted) return;
    t = t < 0 ? 0 : t > DUR ? DUR : t;
    var N = S.N, K = S.K, i, q1 = [], q2 = [], top = [], dy;

    /* baseline */
    var p = outExpo(seg(t, .06, .36)), bw = Math.max(4, 2.6 / K) * (1 - inOutSine(seg(t, 2.45, 2.85)));
    if (p < .001 || bw < .05) H(N.base, 1); else { H(N.base, 0); A(N.base, 'x', f(SX - S.HW * p)); A(N.base, 'width', f(2 * S.HW * p)); A(N.base, 'y', f(604 - bw / 2)); A(N.base, 'height', f(bw)); }

    /* chart stage */
    var solid = t >= T_SWAP;
    H(N.chart, solid); H(N.mm, !solid);
    if (!solid) {
      var g = 14 - 15 * outCubic(seg(t, 1.78, 2.02)), fade = 1 - inOutSine(seg(t, 1.78, 2.02));
      var gh = 20;
      for (i = 0; i < NB; i++) {
        q1[i] = outCubic(seg(t, .20 + .04 * i, .54 + .04 * i)); q2[i] = outCubic(seg(t, 1.10 + .02 * i, 1.42 + .02 * i));
        var tp = BASE - (HC[i] * q1[i] + (BASE - YTOP[i] - HC[i]) * q2[i]), bh = BASE - tp; top[i] = tp;
        var x0 = X0 + PITCH * i, br = N.bar[i], gl = N.gl[i];
        if (bh < .5) { H(br, 1); H(gl, 1); } else {
          H(br, 0); A(br, 'x', f(x0 + g / 2)); A(br, 'width', f(PITCH - g)); A(br, 'y', f(tp)); A(br, 'height', f(592 - tp));
          var ch = Math.min(bh, gh * Math.pow(1 - q1[i], 1.2) + gh * Math.sin(Math.PI * q2[i]));
          var ins = Math.max(4, 2.4 / K), gh2 = ch - ins;
          if (gh2 < .3 || PITCH - g - 2 * ins < 1) H(gl, 1); else { H(gl, 0); A(gl, 'x', f(x0 + g / 2 + ins)); A(gl, 'width', f(PITCH - g - 2 * ins)); A(gl, 'y', f(tp + ins)); A(gl, 'height', f(gh2)); }
        }
      }
      /* arch door */
      var sa = outCubic(seg(t, 1.46, 1.78));
      if (sa < .01) H(N.door, 1); else { H(N.door, 0); A(N.door, 'transform', 'translate(347.5 591.6) scale(' + f(sa) + ') translate(-347.5 -591.6)'); }
      /* dots + trend line */
      var dr = Math.max(8, 3.6 / K), lw = Math.max(5, 3 / K) * fade, cw = 2 * Math.max(2, 1.6 / K) * fade, dd = outCubic(seg(t, .86, 1.06)), P = [];
      for (i = 0; i < NB; i++) {
        var py = Math.max(top[i], YPROF[i]); P.push([CXS[i], py]);
        var r = dr * Math.min(1, q1[i] / .15) * fade, dot = N.dot[i];
        if (r < .2) H(dot, 1); else { H(dot, 0); A(dot, 'cx', f(CXS[i])); A(dot, 'cy', f(py)); A(dot, 'r', f(r)); A(dot, 'stroke-width', f(Math.min(2.2 / K, r * .6))); }
      }
      if (dd < .002 || lw < .1) { H(N.line, 1); H(N.lineC, 1); } else {
        var d = 'M' + f(P[0][0]) + ' ' + f(P[0][1]);
        for (i = 0; i < NB - 1; i++) {
          var a = P[Math.max(0, i - 1)], b = P[i], c = P[i + 1], e = P[Math.min(NB - 1, i + 2)];
          d += 'C' + f(b[0] + (c[0] - a[0]) / 6) + ' ' + f(b[1] + (c[1] - a[1]) / 6) + ' ' + f(c[0] - (e[0] - b[0]) / 6) + ' ' + f(c[1] - (e[1] - b[1]) / 6) + ' ' + f(c[0]) + ' ' + f(c[1]);
        }
        H(N.line, 0); A(N.line, 'd', d); A(N.line, 'stroke-width', f(lw)); A(N.line, 'stroke-dasharray', '1 2'); A(N.line, 'stroke-dashoffset', f(1 - dd));
        H(N.lineC, 0); A(N.lineC, 'd', d); A(N.lineC, 'stroke-width', f(lw + cw)); A(N.lineC, 'stroke-dasharray', '1 2'); A(N.lineC, 'stroke-dashoffset', f(1 - dd));
      }
      /* 1x -> 10x tag riding the last bar */
      var st = Math.min(1, q1[8] / .2) * (1 - inCubic(seg(t, 1.62, 1.78)));
      if (st < .01) H(N.tag, 1); else {
        H(N.tag, 0);
        A(N.tag, 'transform', 'translate(' + f(CXS[8]) + ' ' + f(top[8] - 16) + ') scale(' + f(st * S.ts) + ')');
        var v = 1 + 9 * q1[8], n = Math.min(9, Math.floor(v + 1e-4)), fr = v >= 10 ? 1 : v - n, r9;
        var roll = inOutCubic(clamp01((fr - .4) / .6)), RH = 36, yb = -8, left = -W2 / 2, shift;
        r9 = n === 9 ? roll : 0; shift = -CELL / 2 * (1 - r9);
        A(N.tg, 'transform', 'translate(' + f(shift) + ' 0)');
        var ucx = left + 1.5 * CELL;
        dglyph(N.gCur, String(n % 10), ucx, yb - roll * RH);
        dglyph(N.gNext, String((n + 1) % 10), ucx, yb + RH - roll * RH);
        if (r9 > 0) { H(N.gTens, 0); dglyph(N.gTens, '1', left + CELL / 2, yb + RH * (1 - r9)); } else H(N.gTens, 1);
        A(N.gX, 'transform', 'translate(' + f(left + 2 * CELL + GAPX - GL.dig.x[2][0] * TW) + ' ' + f(yb) + ') scale(' + f(TW) + ' ' + f(-TW) + ')');
      }
    }

    /* result ring: white gap ring while it crosses the M, blue shockwave (2.5px -> 1px) + amber echo once it is out on the white */
    var x = seg(t, T_HIT, T_LOCK), rw = Math.max(9, S.minW * 1.4) * Math.min(1, x / .08) * Math.pow(1 - x, 1.3);
    if (rw < .2) H(N.ring, 1); else {
      var rr = 130.52 + (S.RMAX - 130.52) * inOutQuad(x);
      H(N.ring, 0); A(N.ring, 'd', 'M' + f(SX - rr) + ' 591.6A' + f(rr) + ' ' + f(rr) + ' 0 0 1 ' + f(SX + rr) + ' 591.6'); A(N.ring, 'stroke-width', f(rw));
    }
    var wv = (2.5 - 1.5 * x) * Math.min(1, x / .08) * (1 - seg(x, .914, 1)) / K;
    if (wv < .05) H(N.wave, 1); else {
      var r2 = 130.52 + (S.RMAX - 130.52) * inOutQuad(x);
      H(N.wave, 0); A(N.wave, 'd', 'M' + f(SX - r2) + ' 591.6A' + f(r2) + ' ' + f(r2) + ' 0 0 1 ' + f(SX + r2) + ' 591.6'); A(N.wave, 'stroke-width', f(wv));
    }
    var xe = seg(t, T_HIT + .08, T_LOCK), we = 2 * Math.min(1, xe / .08) * (1 - seg(xe, .9, 1)) / K;
    if (we < .05) H(N.echo, 1); else {
      var r3 = 130.52 + (S.RMAX - 130.52) * inOutQuad(xe);
      H(N.echo, 0); A(N.echo, 'd', 'M' + f(SX - r3) + ' 591.6A' + f(r3) + ' ' + f(r3) + ' 0 0 1 ' + f(SX + r3) + ' 591.6'); A(N.echo, 'stroke-width', f(we));
    }
    /* sun */
    dy = 132 * (1 - inOutSine(seg(t, 2.0, 2.4)));
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
    var Y = -S.D * liftEase(seg(t, T_LIFT, DUR));
    Y = Math.round(Y * S.dpr) / S.dpr;
    if (S.ry !== Y) { S.ry = Y; S.root.style.transform = Y === 0 && t < T_LIFT - .05 ? '' : 'translate3d(0,' + Y + 'px,0)'; }
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
      S.curT = t; render(t);
      for (var i = 0; i < BEATS.length; i++) if (!S.fired[BEATS[i][0]] && t >= BEATS[i][1]) { S.fired[BEATS[i][0]] = 1; beat(BEATS[i][0], t); }
    } catch (e) { finish(); return; }
    S.raf = requestAnimationFrame(tick);
  }
  function reduced() { try { return window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { return false; } }
  function play(force) {
    if (S.playing && !force) return;
    if (!force && seen()) return;
    if (S.mounted) unmount();
    try { if (window.matchMedia('(forced-colors: active)').matches) { mark(); return; } } catch (e) { }
    mark(); mount(); S.playing = true; S.frozen = false; S.fired = {}; S.ending = false;
    window.addEventListener('keydown', onKey, true);
    window.addEventListener('wheel', block, { passive: false, capture: true });
    window.addEventListener('touchmove', block, { passive: false, capture: true });
    document.documentElement.classList.add('mmc-pre-lock');
    if (reduced()) {
      S.curT = 3.1; render(3.1); S.N.skip.style.display = 'none';
      later(function () { if (S.mounted) { S.root.style.transition = 'opacity 250ms ease'; S.root.style.opacity = 0; } }, 600);
      later(function () { finish(); }, 880);
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
  window.MMCPreloader = api;

  var q = /[?&]mmcpre_t=([0-9.]+)/.exec(location.search), pm = /[?&]preloader=(\w+)/.exec(location.search);
  if (q) freeze(parseFloat(q[1]));
  else if (!(pm && pm[1] === 'off')) play(!!(pm && pm[1] === 'force'));
})();

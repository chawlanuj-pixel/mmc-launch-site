/*!
 * MMC preloader - "DIAL" (option 6): a ROAS gauge sweeps up, then its rings close into the brand mark.
 * Pure vector code animation: inline SVG + vanilla JS + CSS. No video, no raster, no libraries, no fetches.
 * One pure render(t) driven by one clock. ?mmcpre_t=<seconds> freezes at t. ?preloader=off|force.
 * API: window.MMCPreloader = { play(force), render(t), skip(), freeze(t), DUR, onBeat }
 */
(function () {
  'use strict';
  if (window.MMCPreloader && window.MMCPreloader.__v === 6) return;

  var DUR = 4.05, T_HIT = 2.40, T_LOCK = 3.10, T_LIFT = 3.40, T_SWAP = 2.02;
  var NAVY = '#040816', BLUE = '#1A478F', YEL = '#FBB615', WHITE = '#FFFFFF';
  var SX = 347.5, SY = 591.6, CX = 347.46, CY = 591.82;
  var A0 = 156.77, P0 = 32.07, P1 = 96.646, G0 = 10, F1 = [.34, .5, .64, .78, .9], MARK = 24, NR = 5, MC = 148.6;
  var M_D = 'M30.38 563.7 L30.38 126.64 C30.38 42.12 123.76 1.2 189.82 54.72 L292.54 137.95 C310.72 152.68 317.76 160.9 347.46 160.9 C377.16 160.9 384.2 152.68 402.38 137.95 L505.1 54.72 C571.16 1.2 664.54 42.12 664.54 126.64 L664.54 563.7 A27.6 27.6 0 0 1 636.94 591.31 L528.88 591.31 A26.67 26.67 0 0 1 502.5 568.59 A156.77 156.77 0 0 0 192.42 568.59 A26.67 26.67 0 0 1 166.04 591.31 L57.98 591.31 A27.6 27.6 0 0 1 30.38 563.7Z';
  var CLIP_OUTER = 'M30.38 563.7 L30.38 126.64 C30.38 42.12 123.76 1.2 189.82 54.72 L292.54 137.95 C310.72 152.68 317.76 160.9 347.46 160.9 C377.16 160.9 384.2 152.68 402.38 137.95 L505.1 54.72 C571.16 1.2 664.54 42.12 664.54 126.64 L664.54 563.7 A27.6 27.6 0 0 1 636.94 591.31 L57.98 591.31 A27.6 27.6 0 0 1 30.38 563.7Z';
  var DOOR_D = 'M166.04 592.5 L166.04 591.31 A26.67 26.67 0 0 0 192.42 568.59 A156.77 156.77 0 0 1 502.5 568.59 A26.67 26.67 0 0 0 528.88 591.31 L528.88 592.5 Z';
  var SUN_D = 'M237.28 591.36 L457.7 591.36 A18.7 18.7 0 0 0 476.14 569.5 A130.52 130.52 0 0 0 218.84 569.5 A18.7 18.7 0 0 0 237.28 591.36Z';
  var RAYS = [
    { x1: 347.74, y1: 401.65, x2: 347.73, y2: 279.78, w: 15.12, s: 2.63 },
    { x1: 274.22, y1: 417.76, x2: 234.04, y2: 348.08, w: 14.76, s: 2.59 },
    { x1: 420.72, y1: 418.50, x2: 460.91, y2: 348.89, w: 14.77, s: 2.67 },
    { x1: 206.19, y1: 464.05, x2: 170.55, y2: 443.47, w: 14.79, s: 2.55 },
    { x1: 488.84, y1: 464.81, x2: 524.35, y2: 444.27, w: 14.82, s: 2.71 }
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
  var liftEase = bez(.7, 0, .2, 1), surge = bez(.4, .25, .25, 1);
  function f(n) { return Math.round(n * 1000) / 1000; }

  /* ---------------------------------------------------------------- DOM helpers */
  var NS = 'http://www.w3.org/2000/svg';
  function E(tag, a, p) { var e = document.createElementNS(NS, tag); if (a) for (var k in a) e.setAttribute(k, a[k]); if (p) p.appendChild(e); return e; }
  function A(e, k, v) { var c = '_' + k; if (e[c] === v) return; e[c] = v; e.setAttribute(k, v); }
  function H(e, hide) { A(e, 'display', hide ? 'none' : 'inline'); }

  /* ---------------------------------------------------------------- state */
  var S = { mounted: false, playing: false, frozen: false, root: null, svg: null, N: {}, vw: 0, vh: 0, K: 1, HW: 0, SAG: 90, dpr: 1,
            raf: 0, at: 0, last: 0, wall: 0, wd: 0, curT: 0, fired: {}, timers: [], ending: false, ry: null };
  var api = { __v: 6, DUR: DUR, onBeat: null };

  function css() {
    if (document.getElementById('mmc-pre-css')) return;
    var s = document.createElement('style'); s.id = 'mmc-pre-css';
    s.textContent = '#mmc-pre{position:fixed;left:0;top:0;z-index:2147483000;background:transparent;contain:strict;overflow:hidden;touch-action:none;-webkit-tap-highlight-color:transparent;cursor:default}' +
      '#mmc-pre svg{display:block;position:absolute;left:0;top:0;shape-rendering:geometricPrecision}' +
      '#mmc-pre .mmc-skip{position:absolute;right:16px;margin:0;padding:8px 10px;border:0;background:none;color:#fff;font:600 12px/1 Raleway,"Helvetica Neue",Arial,sans-serif;letter-spacing:.06em;cursor:pointer;opacity:0;-webkit-appearance:none;appearance:none}' +
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
    E('rect', { x: -110, y: -72, width: 220, height: 78 }, E('clipPath', { id: 'mmcp-rd' }, defs));
    N.bg = E('path', { fill: NAVY }, svg);
    var lock = N.lock = E('g', 0, svg);
    var stage = N.stage = E('g', 0, lock);
    var rings = E('g', { 'clip-path': 'url(#mmcp-co)' }, stage);
    N.rb = []; N.rh = [];
    for (i = 0; i < NR; i++) {
      N.rb.push(E('path', { fill: 'none', stroke: BLUE, 'stroke-linecap': 'butt', pathLength: 1, display: 'none' }, rings));
      N.rh.push(E('path', { fill: 'none', stroke: YEL, 'stroke-linecap': 'butt', pathLength: 1, display: 'none' }, rings));
    }
    N.door = E('path', { d: DOOR_D, fill: NAVY }, stage);
    var rd = N.rd = E('g', { display: 'none' }, stage);
    var rc = E('g', { 'clip-path': 'url(#mmcp-rd)' }, rd);
    N.rg = E('g', { fill: YEL }, rc);
    N.d1c = E('path', {}, N.rg); N.d1n = E('path', {}, N.rg);
    N.dot = E('circle', { r: 7, fill: YEL }, N.rg);
    N.d2c = E('path', {}, N.rg); N.d2n = E('path', {}, N.rg);
    N.gX = E('path', { d: GL.dig.x[0] }, N.rg);
    N.mm = E('path', { d: M_D, fill: BLUE, display: 'none' }, lock);
    N.comet = E('path', { fill: 'none', stroke: YEL, 'stroke-width': 14, 'stroke-linecap': 'butt', display: 'none' }, lock);
    var sc = E('g', { 'clip-path': 'url(#mmcp-sun)' }, lock);
    N.sun = E('g', 0, sc); E('path', { d: SUN_D, fill: YEL }, N.sun);
    N.ray = RAYS.map(function (r) { return E('line', { x1: r.x1, y1: r.y1, x2: r.x1, y2: r.y1, stroke: YEL, 'stroke-linecap': 'round', display: 'none' }, lock); });
    N.wg = [];
    GL.words.forEach(function (w) {
      var band = E('g', { 'clip-path': 'url(#mmcp-band)' }, lock), mv = E('g', { fill: WHITE }, band);
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
    S.vw = vw; S.vh = vh; S.K = K; S.SAG = SAG; S.HW = vw / (2 * K) + 24; S.dpr = window.devicePixelRatio || 1; S.D = vh + SAG + 12;
    S.root.style.width = vw + 'px'; S.root.style.height = (vh + SAG + 8) + 'px';
    A(S.svg, 'width', vw); A(S.svg, 'height', vh + SAG + 8); A(S.svg, 'viewBox', '0 0 ' + vw + ' ' + (vh + SAG + 8));
    A(N.bg, 'd', 'M0 0 H' + f(vw) + ' V' + f(B) + ' A' + f(R) + ' ' + f(R) + ' 0 0 0 0 ' + f(B) + ' Z');
    A(N.lock, 'transform', 'translate(' + f(TX) + ' ' + f(TY) + ') scale(' + f(K) + ') translate(-347.5 -371)');
    N.skip.style.top = Math.round(vh - 46) + 'px';
  }

  /* ---------------------------------------------------------------- render(t): pure function of t */
  var TW = 64 / 710, RH = 84, C1 = -60, CD = -26, C2 = 8, XL = 36;
  function dglyph(el, ch, cx, by) {
    var g = GL.dig[ch], b = g[2];
    A(el, 'd', g[0]);
    A(el, 'transform', 'translate(' + f(cx - (b[0] + b[2]) / 2 * TW) + ' ' + f(by) + ') scale(' + f(TW) + ' ' + f(-TW) + ')');
  }
  function render(t) {
    if (!S.mounted) return;
    t = t < 0 ? 0 : t > DUR ? DUR : t;
    var N = S.N, i, dy;

    var solid = t >= T_SWAP;
    H(N.stage, solid); H(N.mm, !solid);
    if (!solid) {
      var g = G0 - 11 * outCubic(seg(t, 1.66, 1.98)), a = A0, q14 = 0;
      for (i = 0; i < NR; i++) {
        var q1 = outCubic(seg(t, .14 + .05 * i, .74 + .05 * i)), q2 = surge(seg(t, 1 + .05 * i, 1.5 + .05 * i));
        var fi = F1[i] * q1 + (1 - F1[i]) * q2, p = P0 + (P1 - P0) * q2, m = a + p / 2, w = Math.max(22, p - g), rb = N.rb[i], rh = N.rh[i];
        a += p; if (i === NR - 1) q14 = q1;
        if (fi < .004) { H(rb, 1); H(rh, 1); continue; }
        var d = 'M' + f(CX - m) + ' ' + CY + 'A' + f(m) + ' ' + f(m) + ' 0 0 1 ' + f(CX + m) + ' ' + CY, fs = Math.round(fi * 1e5) / 1e5;
        H(rb, 0); A(rb, 'd', d); A(rb, 'stroke-width', f(w)); A(rb, 'stroke-dasharray', fs + ' 2');
        var lf = MARK * Math.min(1, fi / .08) * (1 - seg(fi, .92, 1)) / (Math.PI * m);
        if (lf < .0005) H(rh, 1); else {
          H(rh, 0); A(rh, 'd', d); A(rh, 'stroke-width', f(w)); A(rh, 'stroke-dasharray', (Math.round(lf * 1e5) / 1e5) + ' 2'); A(rh, 'stroke-dashoffset', Math.round((lf - fi) * 1e5) / 1e5);
        }
      }
      /* arch door polish */
      var sa = .86 + .14 * outCubic(seg(t, 1.72, 1.98));
      A(N.door, 'transform', 'translate(347.5 591.6) scale(' + f(sa) + ') translate(-347.5 -591.6)');
      /* ROAS reading: fixed cells, rolling digits, 1.0x -> 5.0x */
      var st = outCubic(seg(t, .06, .26)) * (1 - inCubic(seg(t, 1.5, 1.66)));
      if (st < .01) H(N.rd, 1); else {
        H(N.rd, 0);
        A(N.rd, 'transform', 'translate(347.46 ' + f(540 + 32 * st) + ') scale(' + f(st) + ')');
        var u = 8 * q14, n = Math.min(8, Math.floor(u + 1e-4)), fr = n >= 8 ? 0 : u - n, roll = inOutCubic(clamp01((fr - .4) / .6));
        var ur = (n % 2 === 1) ? roll : 0;
        dglyph(N.d2c, String(n % 2 ? 5 : 0), C2, -roll * RH);
        dglyph(N.d2n, String((n + 1) % 2 ? 5 : 0), C2, RH - roll * RH);
        dglyph(N.d1c, String(1 + (n >> 1)), C1, -ur * RH);
        dglyph(N.d1n, String(1 + ((n + 1) >> 1)), C1, RH - ur * RH);
        A(N.dot, 'cx', CD); A(N.dot, 'cy', -7);
        A(N.gX, 'transform', 'translate(' + f(XL - GL.dig.x[2][0] * TW) + ' 0) scale(' + f(TW) + ' ' + f(-TW) + ')');
      }
    }

    /* sun */
    dy = 132 * (1 - inOutSine(seg(t, 2.0, 2.4)));
    if (dy >= 131.5) H(N.sun, 1); else {
      var s = 1 + .03 * Math.pow(Math.sin(Math.PI * seg(t, T_HIT, 2.8)), 1.5);
      H(N.sun, 0); A(N.sun, 'transform', 'translate(0 ' + f(dy) + ') translate(347.5 591.6) scale(' + f(s) + ') translate(-347.5 -591.6)');
    }
    /* comet round the arch gap */
    var hd = 180 * (1 - inOutSine(seg(t, T_HIT, 2.86))), tl = 180 * (1 - inOutSine(seg(t, 2.52, 2.98)));
    if (tl - hd < .5) H(N.comet, 1); else {
      var ra = Math.PI / 180;
      H(N.comet, 0);
      A(N.comet, 'd', 'M' + f(CX + MC * Math.cos(tl * ra)) + ' ' + f(CY - MC * Math.sin(tl * ra)) + 'A' + MC + ' ' + MC + ' 0 0 1 ' + f(CX + MC * Math.cos(hd * ra)) + ' ' + f(CY - MC * Math.sin(hd * ra)));
    }
    /* rays */
    for (i = 0; i < RAYS.length; i++) {
      var ry = RAYS[i], gg = outBack(seg(t, ry.s, ry.s + .36), 1.3), ln = N.ray[i];
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

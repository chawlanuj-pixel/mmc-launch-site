// Client behaviour for the hub template: reveal-on-scroll, glow buttons, booking buttons, stacking cards,
// lead-quality toggle, floating audit button, brand-wall image state.
const reduce = () => window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)");

/* Reveal on scroll (.n-rise -> .is-in) */
function reveal() {
  if (typeof IntersectionObserver === "undefined") { document.querySelectorAll(".n-rise").forEach((el) => el.classList.add("is-in")); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
  document.querySelectorAll(".n-rise:not(.is-in)").forEach((el) => io.observe(el));
}

/* Booking buttons: data-book="<source>" -> window.mmcBookCall(source, event) */
function booking() {
  document.addEventListener("click", (e) => {
    const b = (e.target as Element).closest("[data-book]") as HTMLElement | null;
    if (!b) return;
    const w = window as any;
    if (w.mmcBookCall) w.mmcBookCall(b.dataset.book, e);
  });
}

/* Cursor glow on .glow-btn */
function glow() {
  window.addEventListener("pointermove", (e) => {
    document.querySelectorAll<HTMLElement>(".glow-btn").forEach((el) => {
      const r = el.getBoundingClientRect();
      if (e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom) {
        el.style.setProperty("--gx", e.clientX - r.left + "px");
        el.style.setProperty("--gy", e.clientY - r.top + "px");
      }
    });
  });
}

/* Stacking cards: sticky cards, scale/dim as the next one covers them, equal heights, keyboard focus. */
function stack() {
  const list = document.querySelector<HTMLElement>("[data-stack]");
  if (!list) return;
  const reduceMq = reduce();
  let raf = 0;
  const cardsOf = () => [...list.querySelectorAll<HTMLElement>(".stk__card")];
  const equalize = () => {
    list.style.setProperty("--stk-h", "0px");
    const hs = cardsOf().map((c) => c.offsetHeight);
    list.style.setProperty("--stk-h", Math.max(0, ...hs) + "px");
  };
  const minH = () => (window.innerWidth >= 760 ? 640 : 560);
  const update = () => {
    raf = 0;
    const cards = cardsOf();
    const on = window.innerHeight >= minH() && !(reduceMq && reduceMq.matches);
    if (!on) { cards.forEach((c) => { c.style.transform = ""; c.style.setProperty("--dim", "0"); }); return; }
    const cover = cards.map((c, i) => {
      const next = cards[i + 1];
      if (!next) return 0;
      const stickTop = parseFloat(getComputedStyle(c).top) || 0;
      const h = c.offsetHeight || 1;
      return Math.min(1, Math.max(0, (stickTop + h - next.getBoundingClientRect().top) / h));
    });
    cards.forEach((c, i) => {
      let depth = 0;
      for (let j = i; j < cover.length; j++) depth += cover[j];
      c.style.transform = depth > 0 ? "scale(" + Math.max(0.84, 1 - depth * 0.03).toFixed(4) + ")" : "";
      c.style.setProperty("--dim", Math.min(0.3, depth * 0.07).toFixed(3));
    });
  };
  const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
  const onSize = () => { equalize(); onScroll(); };
  list.addEventListener("focusin", (e) => {
    const t = e.target as HTMLElement;
    const cards = cardsOf();
    const k = cards.findIndex((c) => c.contains(t));
    const next = cards[k + 1];
    if (k < 0 || !next) return;
    if (window.innerHeight < minH() || (reduceMq && reduceMq.matches)) return;
    const fix = () => {
      const c = cards[k];
      const r = t.getBoundingClientRect();
      const hit = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
      if (r.top >= 60 && r.bottom <= window.innerHeight && hit && t.contains(hit)) return;
      const step = c.offsetHeight + (parseFloat(getComputedStyle(c).marginBottom) || 0);
      const stickTop = parseFloat(getComputedStyle(c).top) || 0;
      window.scrollTo(0, list.getBoundingClientRect().top + window.scrollY + k * step - stickTop);
    };
    fix(); requestAnimationFrame(fix);
  });
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onSize);
  window.addEventListener("load", onSize);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(onSize);
  if (reduceMq && reduceMq.addEventListener) reduceMq.addEventListener("change", onSize);
  equalize();
  update();
}

/* Lead-quality "Without / With" toggle (Loop B) */
function loopB() {
  const root = document.querySelector("[data-lqb]");
  if (!root) return;
  const btns = root.querySelectorAll<HTMLButtonElement>(".lqb__segbtn");
  const panels = root.querySelectorAll<HTMLElement>("[data-panel]");
  btns.forEach((b) => b.addEventListener("click", () => {
    const m = b.dataset.mode;
    btns.forEach((x) => { const on = x.dataset.mode === m; x.classList.toggle("is-on", on); x.setAttribute("aria-pressed", String(on)); });
    panels.forEach((p) => p.classList.toggle("is-on", p.dataset.panel === m));
  }));
}

/* Floating audit button */
function sticky() {
  const box = document.querySelector<HTMLElement>("[data-sticky]");
  if (!box) return;
  const btn = box.querySelector("button")!;
  const tick = () => {
    const hero = document.getElementById("top"), talk = document.getElementById("talk"), cookie = document.querySelector(".cookie");
    const pastHero = hero ? hero.getBoundingClientRect().bottom < 0 : false;
    const atEnd = talk ? talk.getBoundingClientRect().top < window.innerHeight * 0.9 : false;
    const leaks = document.getElementById("leaks");
    const lr = leaks ? leaks.getBoundingClientRect() : null;
    const overStack = window.innerWidth < 760 && lr && lr.top < window.innerHeight && lr.bottom > 0 && !!document.querySelector(".stk__card");
    const on = pastHero && !atEnd && !cookie && !overStack;
    box.classList.toggle("is-on", !!on);
    box.setAttribute("aria-hidden", String(!on));
    btn.tabIndex = on ? 0 : -1;
  };
  tick();
  window.addEventListener("scroll", tick, { passive: true });
  window.addEventListener("resize", tick);
  setInterval(tick, 700);
}

/* Brand wall: wordmark/logo cross-fade and hover-to-project work image state */
function wall() {
  document.querySelectorAll<HTMLImageElement>(".cs-logo__img").forEach((img) => {
    const ok = () => { img.classList.add("is-on"); img.previousElementSibling?.classList.add("is-off"); };
    if (img.complete && img.naturalWidth) ok(); else img.addEventListener("load", ok);
  });
  document.querySelectorAll<HTMLImageElement>(".n-wall__work").forEach((img) => {
    const ok = () => img.classList.add("is-ready");
    if (img.complete && img.naturalWidth) ok(); else { img.addEventListener("load", ok); img.addEventListener("error", () => img.remove()); }
  });
}

reveal(); booking(); glow(); stack(); loopB(); sticky(); wall();

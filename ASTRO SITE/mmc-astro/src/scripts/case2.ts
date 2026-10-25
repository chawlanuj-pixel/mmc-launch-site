// Behaviour for the redesigned case-study page. Everything degrades to readable static content:
// reveals only hide after this script has run, are checked on scroll AND resize AND load (so nothing can stay hidden),
// and reduced motion skips the reveal and the hero drift.
const root = document.documentElement;
const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!reduce) root.classList.add("c2-js");

const items = Array.from(document.querySelectorAll<HTMLElement>(".c2-rv"));
let pending = items.slice();
function reveal() {
  const vh = window.innerHeight || 800;
  pending = pending.filter((el) => {
    const r = el.getBoundingClientRect();
    if (r.top < vh * 0.94 || r.bottom < 0) { el.classList.add("is-in"); return false; }
    return true;
  });
  if (!pending.length) { window.removeEventListener("scroll", tick); window.removeEventListener("resize", tick); }
}
let raf = 0;
function tick() { if (!raf) raf = requestAnimationFrame(() => { raf = 0; reveal(); drift(); }); }

// Hero artwork drifts up slightly while the hero scrolls out (desktop, motion allowed).
const fig = document.querySelector<HTMLElement>("[data-c2-par]");
function drift() {
  if (reduce || !fig) return;
  const y = Math.min(Math.max(window.scrollY, 0), 700);
  fig.style.transform = window.innerWidth > 820 ? `translate3d(0, ${(-y * 0.06).toFixed(1)}px, 0)` : "";
}
window.addEventListener("scroll", tick, { passive: true });
window.addEventListener("resize", tick);
window.addEventListener("load", tick);
reveal();
drift();

// Client behaviour for the Insights index and guide article pages: reveal-on-scroll, booking buttons,
// and a scroll-spy for the article contents sidebar. Kept separate from scripts/hub.ts (the service/
// industry/guide-hub template's stacking-card + sticky-CTA script), since these pages are their own family.

function reveal() {
  const els = document.querySelectorAll(".ed-rise");
  if (typeof IntersectionObserver === "undefined") { els.forEach((el) => el.classList.add("is-in")); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } });
  }, { threshold: 0.1, rootMargin: "0px 0px -6% 0px" });
  els.forEach((el) => io.observe(el));
}

function booking() {
  document.addEventListener("click", (e) => {
    const b = (e.target as Element).closest("[data-book]") as HTMLElement | null;
    if (!b) return;
    const w = window as any;
    if (w.mmcBookCall) w.mmcBookCall(b.dataset.book, e);
  });
}

/* Highlights the active section in the article's contents sidebar as the reader scrolls. */
function toc() {
  const nav = document.querySelector<HTMLElement>("[data-art-toc]");
  if (!nav) return;
  const links = [...nav.querySelectorAll<HTMLAnchorElement>("a")];
  const sections = links
    .map((a) => document.getElementById((a.getAttribute("href") || "").replace("#", "")))
    .filter((s): s is HTMLElement => !!s);
  if (!sections.length) return;
  const setActive = (id: string) => links.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === "#" + id));
  if (typeof IntersectionObserver === "undefined") return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) setActive((e.target as HTMLElement).id); });
  }, { rootMargin: "-15% 0px -70% 0px", threshold: 0 });
  sections.forEach((s) => io.observe(s));
}

reveal(); booking(); toc();

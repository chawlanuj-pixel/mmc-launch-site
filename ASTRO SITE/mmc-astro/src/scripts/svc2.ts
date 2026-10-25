// Behaviour for the preview service page (src/pages/preview/service-meta-ads.astro). Everything degrades to readable static content.
const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
document.documentElement.classList.add("s2-js");

/* 2. Pinned work: pick the step nearest the reading line and tell the panel (data-step on the section). */
function pinned() {
  const sec = document.querySelector<HTMLElement>("[data-s2-work]");
  if (!sec) return;
  const steps = Array.from(sec.querySelectorAll<HTMLElement>(".s2-step"));
  const stage = sec.querySelector<HTMLElement>("[data-s2-stage]")!;
  let raf = 0;
  const run = () => {
    raf = 0;
    const phone = window.matchMedia("(max-width: 900px)").matches;
    // Phones: switch while the new step's heading is already visible under the stage (76% down the free window; the bottom 72px is the sticky CTA bar).
    const sb = stage.getBoundingClientRect().bottom;
    const line = phone ? sb + Math.max(60, window.innerHeight - 72 - sb) * 0.76 : window.innerHeight * 0.5;
    let cur = 0;
    steps.forEach((s, i) => { if (s.getBoundingClientRect().top <= line) cur = i; });
    sec.dataset.step = String(cur + 1);
    steps.forEach((s, i) => s.classList.toggle("is-on", i === cur));
  };
  const tick = () => { if (!raf) raf = requestAnimationFrame(run); };
  window.addEventListener("scroll", tick, { passive: true });
  window.addEventListener("resize", tick);
  run();
}


/* 2b. Phones: platform mock-ups are drawn in em and SVG units and some labels land at 6-10px. Raise anything under the floor
   (11px for secondary labels and chips, 12px for primary text). Inline overrides are removed again on wider screens. */
function mockFloor() {
  const stage = document.querySelector<HTMLElement>("[data-s2-stage]");
  if (!stage) return;
  const mq = window.matchMedia("(max-width: 520px)");
  const SECOND = /chip|lbl|tag|mute|url|cap|foot|nav|st\b|tab|pill|day|hrs|was|star|key|name|logo|file|btn|cta|opt|opt|__n|-n\b|mark/i;
  const apply = () => {
    stage.querySelectorAll<HTMLElement | SVGElement>("[data-fl]").forEach((e) => { (e as HTMLElement).style.removeProperty("font-size"); e.removeAttribute("data-fl"); });
    if (!mq.matches) return;
    stage.querySelectorAll<HTMLElement | SVGElement>(".s2-st *").forEach((e) => {
      if (!Array.from(e.childNodes).some((c) => c.nodeType === 3 && (c.textContent || "").trim())) return;
      const cs = getComputedStyle(e);
      if (cs.display === "none") return;
      const svg = (e as SVGElement).ownerSVGElement && typeof (e as SVGGraphicsElement).getScreenCTM === "function";
      const k = svg ? ((e as SVGGraphicsElement).getScreenCTM()?.a ?? 1) : 1;
      const eff = parseFloat(cs.fontSize) * k;
      const cls = String((e as HTMLElement).className && (e as any).className.baseVal === undefined ? (e as HTMLElement).className : e.getAttribute("class") || "");
      const floor = SECOND.test(cls) || svg ? 11 : 12;
      if (eff < floor - 0.05 && k > 0) { (e as HTMLElement).style.setProperty("font-size", (floor / k).toFixed(2) + "px", "important"); e.setAttribute("data-fl", ""); }
    });
  };
  apply();
  mq.addEventListener("change", apply);
  window.addEventListener("resize", () => { clearTimeout((apply as any).t); (apply as any).t = setTimeout(apply, 150); });
}

/* 3. Leaks: pins and list items share one active index. */
function leaks() {
  const sec = document.querySelector<HTMLElement>("[data-s2-leak]");
  if (!sec) return;
  const pins = Array.from(sec.querySelectorAll<HTMLElement>(".s2-pin"));
  const items = Array.from(sec.querySelectorAll<HTMLElement>(".s2-leakitem"));
  const set = (i: number) => {
    pins.forEach((p, k) => p.classList.toggle("is-on", k === i));
    items.forEach((p, k) => p.classList.toggle("is-on", k === i));
  };
  pins.forEach((p, i) => {
    p.addEventListener("mouseenter", () => set(i));
    p.addEventListener("focus", () => set(i));
    p.addEventListener("click", () => set(i));
  });
  items.forEach((it, i) => it.addEventListener("click", () => set(i)));
}

/* 4. Brands: hover, focus or tap a logo and the stage shows that project. */
function brands() {
  const box = document.querySelector<HTMLElement>("[data-s2-brands]");
  if (!box) return;
  const btns = Array.from(box.querySelectorAll<HTMLElement>("[data-brand]"));
  const set = (id: string) => {
    btns.forEach((b) => b.classList.toggle("is-on", b.dataset.brand === id));
    box.querySelectorAll<HTMLElement>("[data-brand-img]").forEach((e) => e.classList.toggle("is-on", e.dataset.brandImg === id));
    box.querySelectorAll<HTMLElement>("[data-brand-cap]").forEach((e) => e.classList.toggle("is-on", e.dataset.brandCap === id));
  };
  btns.forEach((b) => {
    const id = b.dataset.brand!;
    b.addEventListener("mouseenter", () => set(id));
    b.addEventListener("focus", () => set(id));
    b.addEventListener("click", () => set(id));
  });
}
void reduce;
pinned(); mockFloor(); leaks(); brands();

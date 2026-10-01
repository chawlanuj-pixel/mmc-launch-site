import React from "react";

const ITEMS = [
  { n: "AI photoshoot", h: "/ai-by-mmc/ai-photoshoot.html", img: "/ai-by-mmc/assets/img/hub-photoshoot.jpg" },
  { n: "AI video generation", h: "/ai-by-mmc/ai-video-generation.html", img: "/ai-by-mmc/assets/img/hub-video-generation.jpg" },
  { n: "AI UGC", h: "/ai-by-mmc/ai-ugc.html", img: "/ai-by-mmc/assets/img/hub-ugc.jpg" },
  { n: "AI spokesperson video", h: "/ai-by-mmc/ai-spokesperson-video.html", img: "/ai-by-mmc/assets/img/hub-spokesperson-video.jpg" },
  { n: "AI sales agent", h: "/ai-by-mmc/ai-sales-agent.html", img: "/ai-by-mmc/assets/img/hub-sales-agent.jpg" },
  { n: "AI landing page builder", h: "/ai-by-mmc/ai-landing-page-builder.html", img: "/ai-by-mmc/assets/img/hub-landing-page-builder.jpg" },
];

const WA = "https://wa.me/917666309102?text=" + encodeURIComponent("Hi MMC, I'd like to talk to your AI expert.");
const talk = () => { const w = window as any; if (w.mmcBookCall) w.mmcBookCall("ai-fab-expert"); else window.location.href = "/contact/"; };

/* Floating AI by MMC button. Always on screen; opens a small menu of the six AI services. */
export default function AiFab() {
  const [open, setOpen] = React.useState(false);
  const btn = React.useRef<HTMLButtonElement>(null);
  const panel = React.useRef<HTMLDivElement>(null);
  const root = React.useRef<HTMLDivElement>(null);

  /* Keep clear of the cookie banner: it is z-index 60 and spans the bottom edge, so lift the button above it while it shows. */
  React.useEffect(() => {
    const el = root.current;
    if (!el) return;
    const sync = () => {
      const ck = document.querySelector<HTMLElement>(".cookie");
      const r = ck?.getBoundingClientRect();
      const lift = r && r.height > 0 && getComputedStyle(ck!).display !== "none" ? Math.max(0, window.innerHeight - r.top) + 12 : 0;
      el.style.setProperty("--aifab-lift", lift + "px");
    };
    sync();
    const mo = new MutationObserver(sync);
    mo.observe(document.body, { childList: true, subtree: true });
    const ro = new ResizeObserver(sync);
    ro.observe(document.body);
    window.addEventListener("resize", sync);
    const t = window.setInterval(sync, 700);
    return () => { mo.disconnect(); ro.disconnect(); window.removeEventListener("resize", sync); window.clearInterval(t); };
  }, []);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(false); btn.current?.focus(); } };
    const onDown = (e: MouseEvent) => {
      const t = e.target as Node;
      if (!panel.current?.contains(t) && !btn.current?.contains(t)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    const onOut = (e: FocusEvent) => {
      const n = e.relatedTarget as Node | null;
      if (n && !root.current?.contains(n)) setOpen(false);
    };
    root.current?.addEventListener("focusout", onOut);
    const rootEl = root.current;
    const ft = window.setTimeout(() => panel.current?.querySelector<HTMLElement>("a")?.focus({ preventScroll: true }), 120);
    return () => { window.clearTimeout(ft); document.removeEventListener("keydown", onKey); document.removeEventListener("mousedown", onDown); rootEl?.removeEventListener("focusout", onOut); };
  }, [open]);

  return (
    <div className={"aifab" + (open ? " is-open" : "")} ref={root}>
      <div className="aifab__panel" id="aifab-panel" ref={panel} role="dialog" aria-label="AI by MMC" aria-hidden={!open}>
        <div className="aifab__head">
          <b>AI by MMC</b>
          <span>Made by machines. Checked by people.</span>
        </div>
        <ul className="aifab__list">
          {ITEMS.map((i, k) => (
            <li key={i.h} style={{ "--i": k } as React.CSSProperties}>
              <a href={i.h} tabIndex={open ? 0 : -1}>
                <img src={i.img} alt="" width="52" height="52" loading="lazy" />
                <span>{i.n}</span>
              </a>
            </li>
          ))}
        </ul>
        <div className="aifab__cta" style={{ "--i": ITEMS.length } as React.CSSProperties}>
          <button type="button" className="aifab__talk" tabIndex={open ? 0 : -1} onClick={() => { setOpen(false); talk(); }}>
            <span className="aifab__live" aria-hidden="true" />Talk to our AI expert now
          </button>
          <a className="aifab__wa" href={WA} target="_blank" rel="noopener" tabIndex={open ? 0 : -1} aria-label="Chat with our AI expert on WhatsApp">
            <img src="/assets/platforms/whatsapp.svg" alt="" width="26" height="26" />
          </a>
        </div>
      </div>
      <button type="button" className="aifab__btn" ref={btn} aria-expanded={open} aria-controls="aifab-panel" onClick={() => setOpen((v) => !v)}>
        <span className="aifab__ring" aria-hidden="true" />
        <span className="aifab__mark" aria-hidden="true"><i className="aifab__ai">AI</i><i className="aifab__x">×</i></span>
        <span className="aifab__label"><em>AI by MMC</em><em>Close</em></span>
      </button>
    </div>
  );
}

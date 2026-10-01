/* home/home-app.jsx: composition, scroll-snap active tracking, nav, tweaks */
const { useState, useRef, useEffect } = React;

const SECTIONS = [
  { id: "sec-0", label: "Home",       mode: "dark"  },
  { id: "sec-1", label: "Proof",      mode: "light" },
  { id: "sec-2", label: "Problem",    mode: "dark"  },
  { id: "sec-3", label: "Systems",    mode: "dark"  },
  { id: "sec-4", label: "Results",    mode: "light" },
  { id: "sec-5", label: "Process",    mode: "dark"  },
  { id: "sec-6", label: "Industries", mode: "light" },
  { id: "sec-7", label: "Case",       mode: "dark"  },
  { id: "sec-8", label: "FAQ",        mode: "light" },
  { id: "sec-9", label: "Talk",       mode: "dark"  },
  { id: "sec-10", label: "Contact",   mode: "dark"  },
];

const HOME_TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "mediaWidth": "60%",
  "sun": "#FFC528",
  "hero": "editorial"
}/*EDITMODE-END*/;

function HomeApp() {
  const [active, setActive] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [auditOpen, setAuditOpen] = useState(false);
  const snapRef = useRef(null);
  const menuBtnRef = useRef(null);

  const tweaks = (window.useTweaks ? window.useTweaks(HOME_TWEAK_DEFAULTS) : null);
  const t = tweaks ? tweaks[0] : HOME_TWEAK_DEFAULTS;
  const setTweak = tweaks ? tweaks[1] : () => {};

  // Apply tweak CSS vars
  useEffect(() => {
    document.documentElement.style.setProperty("--media-w", t.mediaWidth);
    document.documentElement.style.setProperty("--mmc-yellow", t.sun);
  }, [t.mediaWidth, t.sun]);

  // Any audit CTA across the page opens the popup form via this event
  useEffect(() => {
    const open = () => window.mmcBookCall();
    window.addEventListener("open-audit", open);
    return () => window.removeEventListener("open-audit", open);
  }, []);

  // Track active section + progress via scroll
  useEffect(() => {
    const el = snapRef.current;
    if (!el) return;
    const onScroll = () => {
      const h = el.clientHeight || 1;
      const idx = Math.round(el.scrollTop / h);
      setActive(Math.max(0, Math.min(SECTIONS.length - 1, idx)));
      setScrolled(el.scrollTop > h * 0.4);
      const max = el.scrollHeight - h;
      setProgress(max > 0 ? (el.scrollTop / max) * 100 : 0);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  // ---- GSAP reveals across the page ----
  const prefersReduced = (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  // Init: hide all reveal targets (or fall back gracefully if gsap missing)
  useEffect(() => {
    const g = window.gsap;
    if (!g) { document.documentElement.classList.add("gsap-off"); return; }
    if (prefersReduced) return;
    g.set(".r", { opacity: 0, y: 26 });
  }, []);

  // Animate the active section's content in; reset the others so re-entry replays
  useEffect(() => {
    const g = window.gsap;
    if (!g || prefersReduced) return;
    const sec = document.getElementById(SECTIONS[active].id);
    if (!sec) return;
    const targets = sec.querySelectorAll(".r");
    g.killTweensOf(targets);
    g.fromTo(targets,
      { opacity: 0, y: 26 },
      { opacity: 1, y: 0, duration: 0.72, stagger: 0.085, ease: "power3.out", overwrite: "auto", delay: 0.08 });
    SECTIONS.forEach((s, i) => {
      if (i === active) return;
      const node = document.getElementById(s.id);
      if (node) g.set(node.querySelectorAll(".r"), { opacity: 0, y: 26 });
    });
  }, [active]);

  const go = (i) => {
    const el = snapRef.current;
    if (!el) return;
    el.scrollTo({ top: i * el.clientHeight, behavior: "smooth" });
  };

  // Keyboard nav
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowDown" || e.key === "PageDown") { e.preventDefault(); go(Math.min(SECTIONS.length - 1, active + 1)); }
      if (e.key === "ArrowUp"   || e.key === "PageUp")   { e.preventDefault(); go(Math.max(0, active - 1)); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  const showBar = active > 0 || scrolled;
  const navMode = SECTIONS[active] ? SECTIONS[active].mode : "dark";

  return (
    <>
      <div className="progress" style={{ width: progress + "%" }}></div>

      <nav className={"topnav topnav--" + navMode + (showBar ? " scrolled" : "") + (menuOpen ? " menu-open" : "")}>
        <a href="#sec-0" onClick={(e) => { e.preventDefault(); go(0); setMenuOpen(false); }}>
          <img className="topnav__logo" src={navMode === "light" ? "assets/logo-blue-tight.png" : "assets/logo-wy-tight.png"} alt="Monday Marketing Company" />
        </a>
        <div className="topnav__right">
          <button className="b b--sun topnav__audit" onClick={() => window.mmcBookCall("home-nav")}>Book a call<span className="arr"></span></button>
          <button
            ref={menuBtnRef}
            className={"hamb " + (menuOpen ? "is-open" : "")}
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}>
            <span className="hamb__label">
              <span className="hamb__word">Menu</span>
              <span className="hamb__word">Close</span>
            </span>
            <span className="hamb__icon" aria-hidden="true"><span></span><span></span><span></span></span>
          </button>
        </div>
      </nav>

      {window.Menu && (
        <window.Menu
          open={menuOpen}
          triggerRef={menuBtnRef}
          onClose={() => setMenuOpen(false)}
          onAudit={() => window.mmcBookCall()}
        />
      )}

      {window.AuditModal && (
        <window.AuditModal open={auditOpen} onClose={() => setAuditOpen(false)} />
      )}

      <div className="dots">
        {SECTIONS.map((s, i) => (
          <div key={s.id} className={"dots__item " + (i === active ? "is-on" : "")} onClick={() => go(i)}>
            <span className="dots__label">{s.label}</span>
            <span className="dots__dot"></span>
          </div>
        ))}
      </div>

      <div className="snap" ref={snapRef}>
        <HeroV2 active={active === 0} layout={t.hero} />
        <ProofV2 active={active === 1} />
        <ProblemV2 active={active === 2} />
        <SystemsV2 active={active === 3} />
        <ResultsV2 active={active === 4} />
        <ProcessV2 active={active === 5} />
        <IndustriesV2 active={active === 6} />
        <CaseV2 active={active === 7} />
        <FaqV2 active={active === 8} />
        <CtaV2 active={active === 9} />
        <FooterV2 active={active === 10} />
      </div>

      {window.TweaksPanel && (
        <window.TweaksPanel title="Tweaks">
          <window.TweakSection label="Hero" />
          <window.TweakRadio
            label="Hero layout"
            value={t.hero}
            onChange={(v) => setTweak("hero", v)}
            options={[
              { value: "editorial", label: "Editorial" },
              { value: "split", label: "Split" },
              { value: "statement", label: "Statement" },
            ]}
          />
          <window.TweakSection label="Layout" />
          <window.TweakRadio
            label="Visual width"
            value={t.mediaWidth}
            onChange={(v) => setTweak("mediaWidth", v)}
            options={[
              { value: "50%", label: "50%" },
              { value: "60%", label: "60%" },
              { value: "66%", label: "66%" },
            ]}
          />
          <window.TweakSection label="Brand" />
          <window.TweakColor
            label="Sun yellow"
            value={t.sun}
            onChange={(v) => setTweak("sun", v)}
            options={["#FFC528", "#FFCB05", "#FFD60A", "#FDB813"]}
          />
        </window.TweaksPanel>
      )}
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<HomeApp />);

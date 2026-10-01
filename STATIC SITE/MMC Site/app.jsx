/* app.jsx, Composes Nav + Menu + Hero + AuditModal + Sky + Footer */

const { useState, useRef, useEffect } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "heroVariant": "manifesto"
}/*EDITMODE-END*/;

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [auditOpen, setAuditOpen] = useState(false);
  const menuBtnRef = useRef(null);

  const tweaks = (window.useTweaks ? window.useTweaks(TWEAK_DEFAULTS) : null);
  const t = tweaks ? tweaks[0] : TWEAK_DEFAULTS;
  const setTweak = tweaks ? tweaks[1] : () => {};

  // Cursor-glow tracker for all .glow-btn elements
  useEffect(() => {
    const onMove = (e) => {
      const targets = document.querySelectorAll(".glow-btn");
      targets.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (
          e.clientX >= r.left && e.clientX <= r.right &&
          e.clientY >= r.top  && e.clientY <= r.bottom
        ) {
          el.style.setProperty("--gx", (e.clientX - r.left) + "px");
          el.style.setProperty("--gy", (e.clientY - r.top)  + "px");
        }
      });
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <>
      <Nav
        menuBtnRef={menuBtnRef}
        menuOpen={menuOpen}
        onOpenMenu={() => setMenuOpen((v) => !v)}
        onAudit={() => window.mmcBookCall()}
      />
      <Menu
        open={menuOpen}
        triggerRef={menuBtnRef}
        onClose={() => setMenuOpen(false)}
        onAudit={() => window.mmcBookCall()}
      />

      <main className="app-main">
        <Hero
          heroVariant={t.heroVariant}
          onAudit={() => window.mmcBookCall()}
        />

        <TrustLayer />
        <GrowthSystems onAudit={() => window.mmcBookCall()} />
        <CaseStudies />
        <Process />
        <Industries />
        <FAQ onAudit={() => window.mmcBookCall()} />
        <FinalCTA onAudit={() => window.mmcBookCall()} />

        <Footer onAudit={() => window.mmcBookCall()} cta={{ label: "Book a strategy call", href: "#cta" }} />
      </main>

      <AuditModal open={auditOpen} onClose={() => setAuditOpen(false)} />
      <window.CookieBanner />

      {window.TweaksPanel && (
        <window.TweaksPanel title="Tweaks">
          <window.TweakSection label="Hero" />
          <window.TweakSelect
            label="Headline variant"
            value={t.heroVariant}
            onChange={(v) => setTweak("heroVariant", v)}
            options={[
              { value: "manifesto", label: "Manifesto · Revenue engines" },
              { value: "editorial", label: "Editorial · Grow on memory" },
              { value: "numbers",   label: "Numbers · ₹248Cr+ compounded" },
            ]}
          />
          <window.TweakSection label="Try it" />
          <window.TweakButton
            label="Open sunrise menu"
            onClick={() => setMenuOpen(true)}
          />
          <window.TweakButton
            label="Open brand audit"
            onClick={() => window.mmcBookCall()}
          />
        </window.TweaksPanel>
      )}

    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

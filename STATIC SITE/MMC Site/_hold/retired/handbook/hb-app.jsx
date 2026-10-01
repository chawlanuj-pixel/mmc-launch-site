/* handbook/hb-app.jsx, Brand Handbook page composer */

const { useState, useRef, useEffect } = React;

function HbApp() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [auditOpen, setAuditOpen] = useState(false);
  const menuBtnRef = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      document.querySelectorAll(".glow-btn").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom) {
          el.style.setProperty("--gx", (e.clientX - r.left) + "px");
          el.style.setProperty("--gy", (e.clientY - r.top) + "px");
        }
      });
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <>
      <window.Nav menuBtnRef={menuBtnRef} menuOpen={menuOpen} onOpenMenu={() => setMenuOpen((v) => !v)} onAudit={() => window.mmcBookCall()} />
      <window.Menu open={menuOpen} triggerRef={menuBtnRef} onClose={() => setMenuOpen(false)} onAudit={() => window.mmcBookCall()} />
      <main className="app-main">
        <window.HbHero onAudit={() => window.mmcBookCall()} />
        <window.HbStory />
        <window.HbServices />
        <window.HbNext />
        <window.ServicesCTA onAudit={() => window.mmcBookCall()} />
        <window.Footer onAudit={() => window.mmcBookCall()} cta={{ label: "Build your handbook", href: "#cta" }} />
      </main>
      <window.AuditModal open={auditOpen} onClose={() => setAuditOpen(false)} />
      <window.CookieBanner />
    </>
  );
}

const hbRoot = ReactDOM.createRoot(document.getElementById("root"));
hbRoot.render(<HbApp />);

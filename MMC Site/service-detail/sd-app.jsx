/* service-detail/sd-app.jsx, Service Detail page composer */

const { useState, useRef, useEffect } = React;

function SdApp() {
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
      <window.Sky />
      <window.Nav
        menuBtnRef={menuBtnRef}
        menuOpen={menuOpen}
        onOpenMenu={() => setMenuOpen((v) => !v)}
        onAudit={() => window.mmcBookCall()}
      />
      <window.Menu
        open={menuOpen}
        triggerRef={menuBtnRef}
        onClose={() => setMenuOpen(false)}
        onAudit={() => window.mmcBookCall()}
      />

      <main className="app-main">
        <window.SdHero onAudit={() => window.mmcBookCall()} />
        <window.SdProblem />
        <window.SdHow />
        <window.SdCase />
        <window.SdPackages onAudit={() => window.mmcBookCall()} />
        <window.SdRelated />
        <window.ServicesCTA onAudit={() => window.mmcBookCall()} />
        <window.Footer onAudit={() => window.mmcBookCall()} cta={{ label: "Get a free audit", href: "#cta" }} />
      </main>

      <window.AuditModal open={auditOpen} onClose={() => setAuditOpen(false)} />
      <window.CookieBanner />
    </>
  );
}

const sdRoot = ReactDOM.createRoot(document.getElementById("root"));
sdRoot.render(<SdApp />);

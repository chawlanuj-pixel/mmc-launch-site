/* legal/legal-app.jsx, Shared composer for Privacy + Terms.
   Reads ?kind=privacy or ?kind=terms from URL. */

const { useState, useRef, useEffect } = React;

function LegalApp() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [auditOpen, setAuditOpen] = useState(false);
  const menuBtnRef = useRef(null);

  // Detect kind by filename
  const path = window.location.pathname.split("/").pop().toLowerCase();
  const kind = path.includes("privacy") ? "privacy" : "terms";

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
      <window.Nav menuBtnRef={menuBtnRef} menuOpen={menuOpen} onOpenMenu={() => setMenuOpen((v) => !v)} onAudit={() => window.mmcBookCall()} />
      <window.Menu open={menuOpen} triggerRef={menuBtnRef} onClose={() => setMenuOpen(false)} onAudit={() => window.mmcBookCall()} />
      <main className="app-main">
        <window.LegalPage kind={kind} />
        <window.Footer onAudit={() => window.mmcBookCall()} />
      </main>
      <window.AuditModal open={auditOpen} onClose={() => setAuditOpen(false)} />
      <window.CookieBanner />
    </>
  );
}

const legalRoot = ReactDOM.createRoot(document.getElementById("root"));
legalRoot.render(<LegalApp />);

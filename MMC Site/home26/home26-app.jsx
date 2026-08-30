/* home26/home26-app.jsx, root mount for the 2026 homepage. */

function Home26App() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [auditOpen, setAuditOpen] = React.useState(false);
  const menuBtnRef = React.useRef(null);
  window.useReveal();

  return (
    <>
      <window.Nav menuBtnRef={menuBtnRef} menuOpen={menuOpen}
                  onOpenMenu={() => setMenuOpen((v) => !v)} onAudit={() => window.mmcBookCall("home-nav")} />
      <window.Menu open={menuOpen} triggerRef={menuBtnRef}
                   onClose={() => setMenuOpen(false)} onAudit={() => window.mmcBookCall("home-menu")} />
      <main className="app-main n-app">
        <window.NHero />
        <window.NNumbers />
        <window.NClients />
        <window.NCapabilities />
        <window.NBrands />
        <window.NCreative />
        <window.NPartners />
        <window.NProcess />
        <window.NQuote />
        <window.NCta />
        <window.Footer onAudit={() => window.mmcBookCall("home-footer")} />
      </main>
      <window.AuditModal open={auditOpen} onClose={() => setAuditOpen(false)} />
      <window.CookieBanner />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Home26App />);

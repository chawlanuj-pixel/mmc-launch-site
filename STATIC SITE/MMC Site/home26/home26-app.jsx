/* home26/home26-app.jsx, root mount for the 2026 homepage. */

/* Homepage section switches. A section with no real data behind it is set to
   false and simply does not render; set it back to true to recall it. Nothing
   else needs to change, then run ./build.sh so the pre-render picks it up.

     numbers   the sun-band stat strip, and the stat strip under the hero
     creative  the Creative & UGC grid (needs real assets)
     capMetric the one-line figure under each capability ("8.7x blended" etc.)

   Re-enable each only once the figures / assets are real and supplied by MMC. */
window.MMC_HOME = Object.assign({
  numbers: false,
  creative: false,
  capMetric: false,
}, window.MMC_HOME || {});

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
        {window.MMC_HOME.numbers && <window.NNumbers />}
        <window.NClients />
        <window.NCapabilities />
        <window.NBrands />
        {window.MMC_HOME.creative && <window.NCreative />}
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

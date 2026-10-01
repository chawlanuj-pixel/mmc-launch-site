/* tools/tools-app.jsx, Root mount for the ToolsHub page. */

function ToolsHubApp() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [auditOpen, setAuditOpen] = React.useState(false);
  const menuBtnRef = React.useRef(null);

  return (
    <>
      <window.Nav menuBtnRef={menuBtnRef} menuOpen={menuOpen} onOpenMenu={() => setMenuOpen((v) => !v)} onAudit={() => window.mmcBookCall()} />
      <window.Menu open={menuOpen} triggerRef={menuBtnRef} onClose={() => setMenuOpen(false)} onAudit={() => window.mmcBookCall()} />
      <main className="app-main">
        <window.ToolsHub />
        <window.Footer onAudit={() => window.mmcBookCall()} />
      </main>
      <window.AuditModal open={auditOpen} onClose={() => setAuditOpen(false)} />
      <window.CookieBanner />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<ToolsHubApp />);

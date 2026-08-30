/* work/WorkPage.jsx, Our Work overview composer */

function WorkPage({ onAudit }) {
  return (
    <>
      <window.WorkHero onAudit={onAudit} />
      <window.WorkFeatured />
      <window.WorkGrid />
      <window.ServicesCTA onAudit={onAudit} />
    </>
  );
}

window.WorkPage = WorkPage;

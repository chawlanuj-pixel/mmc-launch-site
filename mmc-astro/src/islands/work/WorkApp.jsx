import React from "react";
import { WorkHero } from "./WorkHero.jsx";
import { WorkFeatured } from "./WorkFeatured.jsx";
import { WorkGrid } from "./WorkGrid.jsx";
import { ServicesCTA } from "../shared/ServicesCTA.jsx";

/* Page body of Our Work (WorkPage composition; nav, footer and modals live in Shell). */
export default function WorkApp() {
  const onAudit = () => window.mmcBookCall();
  return (
    <>
      <WorkHero onAudit={onAudit} />
      <WorkFeatured />
      <WorkGrid />
      <ServicesCTA onAudit={onAudit} />
    </>
  );
}

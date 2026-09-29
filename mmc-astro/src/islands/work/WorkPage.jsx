import React from "react";
import { ServicesCTA } from "../shared/ServicesCTA.jsx";
import { WorkFeatured } from "./WorkFeatured.jsx";
import { WorkGrid } from "./WorkGrid.jsx";
import { WorkHero } from "./WorkHero.jsx";

/* work/WorkPage.jsx, Our Work overview composer */

function WorkPage({ onAudit }) {
  return (
    <>
      <WorkHero onAudit={onAudit} />
      <WorkFeatured />
      <WorkGrid />
      <ServicesCTA onAudit={onAudit} />
    </>
  );
}


export { WorkPage };

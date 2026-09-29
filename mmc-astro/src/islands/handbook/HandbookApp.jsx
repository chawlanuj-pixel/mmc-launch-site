import React from "react";
import { HbHero } from "./HbHero.jsx";
import { HbStory } from "./HbStory.jsx";
import { HbServices } from "./HbServices.jsx";
import { HbNext } from "./HbNext.jsx";
import { ServicesCTA } from "../shared/ServicesCTA.jsx";
export default function HandbookApp() {
  const onAudit = () => window.mmcBookCall();
  return (
    <>
      <HbHero onAudit={onAudit} />
      <HbStory />
      <HbServices />
      <HbNext />
      <ServicesCTA onAudit={onAudit} />
    </>
  );
}

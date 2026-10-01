import React from "react";
import { AbHero } from "./AbHero.jsx";
import { ClientsStrip } from "../shared/clients.jsx";
import { AbShift } from "./AbShift.jsx";
import { AbThesis } from "./AbThesis.jsx";
import { AbApproach } from "./AbApproach.jsx";
import { AbConnected } from "./AbConnected.jsx";
import { AbFuture } from "./AbFuture.jsx";
import { AbWhy } from "./AbWhy.jsx";
import { AbIndustries } from "./AbIndustries.jsx";
import { AbCTA } from "./AbCTA.jsx";

/* Page body of About (was about/ab-app.jsx minus nav, footer and modals, which live in Shell). */
export default function AboutApp() {
  const onAudit = () => window.mmcBookCall("about");
  return (
    <>
      <AbHero onAudit={onAudit} />
      <ClientsStrip />
      <AbShift />
      <AbThesis />
      <AbApproach />
      <AbConnected />
      <AbFuture />
      <AbWhy />
      <AbIndustries />
      <AbCTA onAudit={onAudit} />
    </>
  );
}

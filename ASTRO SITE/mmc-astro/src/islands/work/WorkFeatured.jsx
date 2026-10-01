import React from "react";

/* work/WorkFeatured.jsx

   This band existed for one purpose: to showcase a single case study in depth.
   Its entire content was invented, a brand name, a revenue ramp, a blended
   ROAS, a D90 retention figure, a date range and a link to a written handbook.

   MMC's real client book (content/clients.json) supplies a business type and a
   service mix per brand and nothing else. There is no case study to put here,
   and moving the old figures onto a real client's name is the one thing this
   page must never do. So the band renders nothing rather than carrying an
   invented result forward under a new label.

   To bring it back, MMC needs to supply, for one named brand: what the work
   was, over what period, and results it can evidence. At that point restore a
   single featured card, and add a matching `results` array to that brand in
   content/clients.json so the number and its owner travel together.

   Until then Our Work runs hero, then the full client book in WorkGrid.
*/

function WorkFeatured() {
  return null;
}

export { WorkFeatured };

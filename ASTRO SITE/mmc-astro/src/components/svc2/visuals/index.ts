// Visual registry for section 3 (LeakDiagram). S.leak.visual is one of these keys. One .astro file per kind in this folder.
// A visual takes { X, pins } (X = S.leak, pins = S.leak.pins as {x, y, label}) and draws only the picture. LeakDiagram draws the
// numbered pin buttons on top of it at left:x%, top:y% of the visual stage, so any visual can host pins.
import MetaFunnel from "./MetaFunnel.astro";

import SaSearchTerms from "./SaSearchTerms.astro";
import SaRankMap from "./SaRankMap.astro";
import SaSurfaceMap from "./SaSurfaceMap.astro";
import SaContentPath from "./SaContentPath.astro";
import SaLocalMap from "./SaLocalMap.astro";
import ShopFunnelLeak from "./ShopFunnelLeak.astro";
import PdpFriction from "./PdpFriction.astro";
import SiteMapLeak from "./SiteMapLeak.astro";
import LeadDropoff from "./LeadDropoff.astro";
import RepeatCurve from "./RepeatCurve.astro";
import FeedGrid from "./FeedGrid.astro";
import VideoRetention from "./VideoRetention.astro";
import CreatorFit from "./CreatorFit.astro";
import AmazonLeak from "./AmazonLeak.astro";
import TileLeak from "./TileLeak.astro";
import ReviewLeak from "./ReviewLeak.astro";
import BrandZones from "./BrandZones.astro";
import ShelfLeak from "./ShelfLeak.astro";
import AgencyLeak from "./AgencyLeak.astro";

import WlDeliveryLeak from "./WlDeliveryLeak.astro";
import IndLeakBoard from "./IndLeakBoard.astro";

export const visuals = { MetaFunnel, SaSearchTerms, SaRankMap, SaSurfaceMap, SaContentPath, SaLocalMap, ShopFunnelLeak, PdpFriction, SiteMapLeak, LeadDropoff, RepeatCurve, FeedGrid, VideoRetention, CreatorFit, AmazonLeak, TileLeak, ReviewLeak, BrandZones, ShelfLeak, AgencyLeak, WlDeliveryLeak, IndLeakBoard } as const;
export type VisualKind = keyof typeof visuals;

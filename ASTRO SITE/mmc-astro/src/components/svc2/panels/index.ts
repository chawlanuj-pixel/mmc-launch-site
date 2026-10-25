// Panel registry for section 2 (PinnedWork). S.work.panel is one of these keys. One .astro file per kind in this folder.
// To add a kind: create panels/<Kind>.astro (header comment: steps + what each step shows), import it here, add it to `panels` and `panelSteps`.
// Every panel takes { W } (= S.work) and renders <Frame> with step layers .s2-st--1 ... .s2-st--N (N = panelSteps[kind]).
import MetaAdsManager from "./MetaAdsManager.astro";
import GoogleAdsAccount from "./GoogleAdsAccount.astro";
import SerpAndAnswer from "./SerpAndAnswer.astro";
import ShopifyAdmin from "./ShopifyAdmin.astro";
import CrmLoop from "./CrmLoop.astro";
import Heatmap from "./Heatmap.astro";
import FlowBuilder from "./FlowBuilder.astro";
import ContentCalendar from "./ContentCalendar.astro";
import BriefBoard from "./BriefBoard.astro";
import AgencyDashboard from "./AgencyDashboard.astro";

import LocalProfile from "./LocalProfile.astro";
import WebBuild from "./WebBuild.astro";
import WpDashboard from "./WpDashboard.astro";
import MaintenanceBoard from "./MaintenanceBoard.astro";
import DesignReview from "./DesignReview.astro";
import AppFlow from "./AppFlow.astro";
import AmazonAds from "./AmazonAds.astro";
import QuickCommerceAds from "./QuickCommerceAds.astro";
import ReviewMonitor from "./ReviewMonitor.astro";
import BrandSystem from "./BrandSystem.astro";
import PackagingMock from "./PackagingMock.astro";

import AiStudio from "./AiStudio.astro";
import ReportBuilder from "./ReportBuilder.astro";
import TeamPod from "./TeamPod.astro";
import ResellerDesk from "./ResellerDesk.astro";
import EngagementModels from "./EngagementModels.astro";
import IndiaDesk from "./IndiaDesk.astro";
import SkincarePdp from "./SkincarePdp.astro";
import BabyGiftHub from "./BabyGiftHub.astro";
import FashionReturns from "./FashionReturns.astro";
import RfqDesk from "./RfqDesk.astro";
import CollegeAdmissions from "./CollegeAdmissions.astro";
import AbroadCounselling from "./AbroadCounselling.astro";

import FoodShelves from "./FoodShelves.astro";
import WooAdmin from "./WooAdmin.astro";

export const panels = { MetaAdsManager, GoogleAdsAccount, SerpAndAnswer, ShopifyAdmin, CrmLoop, Heatmap, FlowBuilder, ContentCalendar, BriefBoard, AgencyDashboard, LocalProfile, WebBuild, WpDashboard, MaintenanceBoard, DesignReview, AppFlow, AmazonAds, QuickCommerceAds, ReviewMonitor, BrandSystem, PackagingMock, AiStudio, ReportBuilder, TeamPod, ResellerDesk, EngagementModels, IndiaDesk, SkincarePdp, BabyGiftHub, FashionReturns, RfqDesk, CollegeAdmissions, AbroadCounselling, FoodShelves, WooAdmin } as const;
/** Number of steps each panel supports. S.work.steps must have exactly this many entries (checked at build). */
export const panelSteps: Record<keyof typeof panels, number> = {
  MetaAdsManager: 5, GoogleAdsAccount: 5, SerpAndAnswer: 5, ShopifyAdmin: 5, CrmLoop: 5, Heatmap: 4, FlowBuilder: 5, ContentCalendar: 4, BriefBoard: 4, AgencyDashboard: 4,
  LocalProfile: 5, WebBuild: 4, WpDashboard: 4, MaintenanceBoard: 5, DesignReview: 5, AppFlow: 4, AmazonAds: 5, QuickCommerceAds: 5, ReviewMonitor: 5, BrandSystem: 4, PackagingMock: 4, IndiaDesk: 4, EngagementModels: 4, ResellerDesk: 4, TeamPod: 4, ReportBuilder: 4, AiStudio: 4, SkincarePdp: 5, BabyGiftHub: 5, FashionReturns: 5, RfqDesk: 5, CollegeAdmissions: 5, AbroadCounselling: 5, FoodShelves: 5, WooAdmin: 5,
};
export type PanelKind = keyof typeof panels;

import type { CSSProperties } from "react";
import SiteNav from "@/components/global/SiteNav";
import Footer from "@/components/global/Footer";
import Hero from "@/modules/home/components/Hero";
import LogoWall from "@/modules/home/components/LogoWall";
import SyncSection from "@/modules/home/components/SyncSection";
import ToolsSection from "@/modules/home/components/ToolsSection";
import WorkersSection from "@/modules/home/components/WorkersSection";
import WebhooksSection from "@/modules/home/components/WebhooksSection";
import Ticker from "@/modules/home/components/Ticker";
import ConnectorOverlay from "@/modules/home/components/ConnectorOverlay";
import SlotMachine from "@/modules/home/components/SlotMachine";
import DevPlatformAnimations from "@/modules/home/components/DevPlatformAnimations";
import ExternalAgentsSectionReal from "@/modules/home/components/ExternalAgentsSectionReal";
import PlatformSectionReal from "@/modules/home/components/PlatformSectionReal";
import EndcapSectionReal from "@/modules/home/components/EndcapSectionReal";

export default function Page() {
  return (
    <div
      className="base_theme__K5IIh devPlatform_palette_theme__rni97 theme_theme__XHAvb"
      style={{ display: "contents" }}
    >
      <div className="globalNavigation_scrollSentinel__gP74N" />
      <SiteNav />
      <main className="layout_layoutBase__qpePC layout_xl__0fxfK dev_page__Lwdlq">
        <Hero />
        <div
          className="surface surfaceNeutral surface_surfaceNeutral__1Cszl section_section__ppkch section_bgSurfaceNeutral__tqyxc section_hasBackground__xdoXy"
          style={{ "--section-paint": "var(--color-background-surface-neutral)" } as CSSProperties}
        >
          <LogoWall />
          <div className="dev_connectorScope__mWJKv">
            <SyncSection />
            <ToolsSection />
            <WebhooksSection />
            <WorkersSection />
            <Ticker />
            <ConnectorOverlay />
          </div>
        </div>
        <ExternalAgentsSectionReal />
        <PlatformSectionReal />
        <EndcapSectionReal />
      </main>
      <div className="snackBar_snackBar__IYfOp">
        <div role="status" className="snackBar_snackBarContent__DqGBm">
          <p className="text_text__cG3pf text_textWeightRegular__lAQvj text_textColorWhite__H70dC text_textSizeBody__4q5Cs" />
        </div>
      </div>
      <div
        className="base_theme__K5IIh dark_palette_theme__mc9Q9 devPlatform_palette_theme__rni97 devPlatform_dark_palette_theme__i1hf_ theme_theme__XHAvb"
        style={{ display: "contents" }}
      >
        <Footer />
      </div>
      <SlotMachine />
      <DevPlatformAnimations />
    </div>
  );
}

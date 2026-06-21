import type { CSSProperties } from "react";
import SiteNav from "@/components/SiteNav";
import Hero from "@/components/Hero";
import LogoWall from "@/components/LogoWall";
import SyncSection from "@/components/SyncSection";
import ToolsSection from "@/components/dev/ToolsSection";
import WorkersSection from "@/components/dev/WorkersSection";
import WebhooksSection from "@/components/dev/WebhooksSection";
import Ticker from "@/components/dev/Ticker";
import ConnectorOverlay from "@/components/dev/ConnectorOverlay";
import SlotMachine from "@/components/dev/SlotMachine";
import DevPlatformAnimations from "@/components/dev/DevPlatformAnimations";
import ExternalAgentsSectionReal from "@/components/dev/ExternalAgentsSectionReal";
import PlatformSectionReal from "@/components/dev/PlatformSectionReal";
import EndcapSectionReal from "@/components/dev/EndcapSectionReal";
import Footer from "@/components/dev/Footer";

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

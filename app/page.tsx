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
      className="base-theme dev-platform-palette-theme theme-theme"
      style={{ display: "contents" }}
    >
      <div className="global-navigation-scroll-sentinel" />
      <SiteNav />
      <main className="layout-layout-base layout-xl dev-page">
        <Hero />
        <div
          className="surface surfaceNeutral surface-surface-neutral section-section section-bg-surface-neutral section-has-background"
          style={{ "--section-paint": "var(--color-background-surface-neutral)" } as CSSProperties}
        >
          <LogoWall />
          <div className="dev-connector-scope">
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
      <div className="snack-bar-snack-bar">
        <div role="status" className="snack-bar-snack-bar-content">
          <p className="text-text text-text-weight-regular text-text-color-white text-text-size-body" />
        </div>
      </div>
      <div
        className="base-theme dark-palette-theme dev-platform-palette-theme dev-platform-dark-palette-theme theme-theme"
        style={{ display: "contents" }}
      >
        <Footer />
      </div>
      <SlotMachine />
      <DevPlatformAnimations />
    </div>
  );
}

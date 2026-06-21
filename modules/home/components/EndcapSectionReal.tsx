/* eslint-disable @next/next/no-img-element */
import type { CSSProperties } from "react";
import home from "@/modules/home/content/home.json";

const c = home.endcap;

/** Endcap section — "Any data. Any tool. Any agent." */
export default function EndcapSectionReal() {
  return (
    <section data-analytics-scroll-point="true" data-analytics-name="DevPlatformDiagram" className="surface surfaceNeutral surface-surface-neutral section-section section-bg-surface-neutral section-has-background section-collapsible" style={{ "--section-paint": "var(--color-background-surface-neutral)" } as CSSProperties}>
      <div className="section-header-header section-header-align-center">
        <div className="section-header-content">
          <h2 className="section-header-heading">{c.heading}</h2>
        </div>
      </div>
      <div className="dev-diagram-container">
        <img alt={c.diagramAlt} loading="lazy" width="1252" height="493" decoding="async" data-nimg="1" className="next-image dev-diagram-desktop" style={{ color: "transparent" } as CSSProperties} src={c.images.diagramDesktop} />
        <img alt={c.diagramAlt} loading="lazy" width="345" height="484" decoding="async" data-nimg="1" className="next-image dev-diagram-mobile" style={{ color: "transparent" } as CSSProperties} src={c.images.diagramMobile} />
      </div>
    </section>
  );
}

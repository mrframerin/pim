/* eslint-disable @next/next/no-img-element */
import type { CSSProperties } from "react";

/** Endcap section — "Any data. Any tool. Any agent." */
export default function EndcapSectionReal() {
  return (
    <section data-analytics-scroll-point="true" data-analytics-name="DevPlatformDiagram" className="surface surfaceNeutral surface_surfaceNeutral__1Cszl section_section__ppkch section_bgSurfaceNeutral__tqyxc section_hasBackground__xdoXy section_collapsible__OYoF5" style={{ "--section-paint": "var(--color-background-surface-neutral)" } as CSSProperties}>
      <div className="sectionHeader_header__7hACT sectionHeader_alignCenter__6RT73">
        <div className="sectionHeader_content__CrL0O">
          <h2 className="sectionHeader_heading__tJvSy">Any data. Any tool. Any agent. All in Notion.</h2>
        </div>
      </div>
      <div className="dev_diagramContainer__Ggb1A">
        <img alt="Diagram of Notion’s developer platform connecting external agents, data sources, and triggers to Notion context and custom agents through CLI, MCP, API, SDK, and workers." loading="lazy" width="1252" height="493" decoding="async" data-nimg="1" className="next-image dev_diagramDesktop__pmAHd" style={{ color: "transparent" } as CSSProperties} src="/vendor/front-static/pages/dev/diagram/diagram.svg" />
        <img alt="Diagram of Notion’s developer platform connecting external agents, data sources, and triggers to Notion context and custom agents through CLI, MCP, API, SDK, and workers." loading="lazy" width="345" height="484" decoding="async" data-nimg="1" className="next-image dev_diagramMobile__fIi_O" style={{ color: "transparent" } as CSSProperties} src="/vendor/front-static/pages/dev/diagram/mobile.svg" />
      </div>
    </section>
  );
}

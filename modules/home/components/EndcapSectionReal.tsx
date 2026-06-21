/* eslint-disable @next/next/no-img-element */
import type { CSSProperties } from "react";
import home from "@/modules/home/content/home.json";

const c = home.endcap;

/** Endcap section — "Any data. Any tool. Any agent." */
export default function EndcapSectionReal() {
  return (
    <section data-analytics-scroll-point="true" data-analytics-name="DevPlatformDiagram" className="surface surfaceNeutral surface_surfaceNeutral__1Cszl section_section__ppkch section_bgSurfaceNeutral__tqyxc section_hasBackground__xdoXy section_collapsible__OYoF5" style={{ "--section-paint": "var(--color-background-surface-neutral)" } as CSSProperties}>
      <div className="sectionHeader_header__7hACT sectionHeader_alignCenter__6RT73">
        <div className="sectionHeader_content__CrL0O">
          <h2 className="sectionHeader_heading__tJvSy">{c.heading}</h2>
        </div>
      </div>
      <div className="dev_diagramContainer__Ggb1A">
        <img alt={c.diagramAlt} loading="lazy" width="1252" height="493" decoding="async" data-nimg="1" className="next-image dev_diagramDesktop__pmAHd" style={{ color: "transparent" } as CSSProperties} src={c.images.diagramDesktop} />
        <img alt={c.diagramAlt} loading="lazy" width="345" height="484" decoding="async" data-nimg="1" className="next-image dev_diagramMobile__fIi_O" style={{ color: "transparent" } as CSSProperties} src={c.images.diagramMobile} />
      </div>
    </section>
  );
}

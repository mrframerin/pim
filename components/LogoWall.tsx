import type { CSSProperties } from "react";

const LOGO_BASE = "/notion-mirror/front-static/logos/generic/en";

/** Logos in the "Trusted by engineers at" marquee (exact order + dimensions). */
const LOGOS: { alt: string; file: string; w: number; h: number }[] = [
  { alt: "OpenAI", file: "openai-blue.svg", w: 66, h: 24 },
  { alt: "Figma", file: "figma-blue.svg", w: 47, h: 24 },
  { alt: "Ramp", file: "ramp-blue.svg", w: 75, h: 24 },
  { alt: "Match Group", file: "matchgroup-blue.svg", w: 74, h: 24 },
  { alt: "Vercel", file: "vercel-blue.svg", w: 79, h: 24 },
  { alt: "NVIDIA", file: "nvidia-blue.svg", w: 93, h: 24 }
];

const MARQUEE_STYLE = {
  "--logo-wall-marquee-item-count-js": 6,
  "--logo-wall-marquee-direction": "reverse",
  "--logo-wall-marquee-justify": "center",
  "--logo-wall-marquee-max-rows": 1
} as CSSProperties;

export default function LogoWall() {
  return (
    <div className="section_section__ppkch dev_logoWallSection__ISBHy">
      <p className="semanticTypography_semanticTypography__mWJkv semanticTypography_variantGlobalContext__VDlwW dev_logoWallEyebrow__JA6pv">
        Trusted by engineers at
      </p>
      <div
        data-analytics-scroll-point="true"
        data-analytics-name="DevPlatformLogoWall"
        className="logoWallMarquee_logoWallMarquee__DBKiq logoWallMarquee_variantMarquee__MVyGq logoWallMarquee_variantMarqueeSm__DfaGA logoWallMarquee_variantWallMd__RCWtC logoWallMarquee_variantWallLg__1TYHB logoWallMarquee_variantWallXl__ArxOR logoWallMarquee_variantWallXxl__1capG logoWallMarquee_hasMaxRows__tdKGa dev_logoWallMarquee__GbxQS logoWallMarquee_isOverflowing__uqT0t"
        style={MARQUEE_STYLE}
      >
        {LOGOS.map((logo) => (
          <span
            key={logo.alt}
            className="semanticTypography_semanticTypography__mWJkv semanticTypography_variantInteractionButtonMedium__HCJEu button_button__bge_I logoWallMarquee_logoWallMarqueeItem__Y3_iz button_ghost__npAbk button_medium__VXS2i"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt={logo.alt}
              loading="eager"
              width={logo.w}
              height={logo.h}
              decoding="async"
              className="next-image logo_logo__xQVjz logo_heightConstrained__wFlX5"
              src={`${LOGO_BASE}/${logo.file}`}
              style={
                {
                  color: "transparent",
                  "--logo-width": logo.w,
                  "--logo-height": logo.h,
                  "--logo-surface-area": 1600,
                  "--logo-max-height": "24px"
                } as CSSProperties
              }
            />
          </span>
        ))}
      </div>
    </div>
  );
}

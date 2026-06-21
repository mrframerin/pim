import type { CSSProperties } from "react";
import home from "@/modules/home/content/home.json";

const c = home.logoWall;

const LOGO_BASE = c.logoBase;

/** Logos in the "Trusted by engineers at" marquee (exact order + dimensions). */
const LOGOS: { alt: string; file: string; w: number; h: number }[] = c.logos;

const MARQUEE_STYLE = {
  "--logo-wall-marquee-item-count-js": 6,
  "--logo-wall-marquee-direction": "reverse",
  "--logo-wall-marquee-justify": "center",
  "--logo-wall-marquee-max-rows": 1
} as CSSProperties;

export default function LogoWall() {
  return (
    <div className="section-section dev-logo-wall-section">
      <p className="semantic-typography-semantic-typography semantic-typography-variant-global-context dev-logo-wall-eyebrow">
        {c.eyebrow}
      </p>
      <div
        data-analytics-scroll-point="true"
        data-analytics-name="DevPlatformLogoWall"
        className="logo-wall-marquee-logo-wall-marquee logo-wall-marquee-variant-marquee logo-wall-marquee-variant-marquee-sm logo-wall-marquee-variant-wall-md logo-wall-marquee-variant-wall-lg logo-wall-marquee-variant-wall-xl logo-wall-marquee-variant-wall-xxl logo-wall-marquee-has-max-rows dev-logo-wall-marquee logo-wall-marquee-is-overflowing"
        style={MARQUEE_STYLE}
      >
        {LOGOS.map((logo) => (
          <span
            key={logo.alt}
            className="semantic-typography-semantic-typography semantic-typography-variant-interaction-button-medium button-button-2 logo-wall-marquee-logo-wall-marquee-item button-ghost button-medium"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt={logo.alt}
              loading="eager"
              width={logo.w}
              height={logo.h}
              decoding="async"
              className="next-image logo-logo logo-height-constrained"
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

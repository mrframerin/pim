import type { CSSProperties } from "react";

/** Inline typography custom-props for the CTA spans. */
const TYPO_STYLE = {
  "--typography-font": "var(--typography-sans-100-medium-font)",
  "--typography-font-sm": "var(--typography-sans-100-medium-font)",
  "--typography-letter-spacing": "var(--typography-sans-100-medium-letter-spacing)",
  "--typography-letter-spacing-sm": "var(--typography-sans-100-medium-letter-spacing)",
  "--typography-color": "inherit"
} as CSSProperties;

const LINKS: {
  k: string;
  label: string;
  href: string;
  external?: boolean;
}[] = [
  { k: "S", label: "Syncs", href: "#sync" },
  { k: "A", label: "Agent tools", href: "#tools" },
  { k: "H", label: "Webhooks", href: "#webhooks" },
  { k: "W", label: "Workers", href: "#workers" },
  { k: "E", label: "External agents", href: "#externalAgents" },
  { k: "P", label: "Platform", href: "#platform" },
  { k: "D", label: "Docs", href: "https://developers.notion.com", external: true }
];

export default function SiteNav() {
  return (
    <div className="global-navigation-global-navigation-wrapper global-navigation-sticky-wrapper global-navigation-is-dev-platform">
      <div
        className="base-theme dev-platform-palette-theme theme-theme"
        style={{ display: "contents" }}
      >
        <nav className="global-navigation-global-navigation" aria-label="Main">
          <div className="global-navigation-container">
            <div className="global-navigation-logo-container">
              <a
                className="global-navigation-logo"
                aria-label="Home"
                href="#top"
              >
                <svg
                  width="36"
                  height="34"
                  viewBox="0 0 36 34"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="global-navigation-logo-stickerized"
                >
                  <path
                    d="M30.378 2.28746H33.189V4.66528H36V31.6222H33.189V34H5.62201V31.6222H2.81101V29.3347H0V2.28746H2.81101V0H30.378V2.28746Z"
                    fill="#fff"
                  />
                  <path
                    d="M28.5202 1.74881V4.12752H7.48243V6.41409H28.522V4.03627H31.3312V6.41409H34.1422V29.7422H31.3339L31.333 8.7928H10.2934V29.7422H31.3312V32.1201H7.39295V29.7422H4.58195V27.4548H1.77094V4.03627H4.58195V1.74881H28.5202Z"
                    fill="var(--notion-logo-fill, var(--color-black))"
                  />
                  <path
                    d="M18.7264 13.3668H20.0863V15.7455H21.5375V18.033H22.8982V20.4108H24.3493V22.6983H25.711V13.4581H24.2599V11.0803H29.9714V13.4581H28.5202V27.4548H24.2599V25.0761H21.4489V22.7895H20.089V20.4108L20.0863 20.4037V20.4108H18.6379V18.1234H17.2753V25.0761H18.7264V27.4548H13.0158V25.0761H14.467L14.4661 13.4581H13.0158V11.0803H18.7264V13.3668Z"
                    fill="var(--notion-logo-fill, var(--color-black))"
                  />
                </svg>
              </a>
            </div>

            <div className="global-navigation-links">
              {LINKS.map((l) => (
                <a
                  key={l.k}
                  className={`global-navigation-dev-platform-link${
                    l.external ? " global-navigation-dev-platform-link-external" : ""
                  }`}
                  aria-keyshortcuts={l.k}
                  href={l.href}
                  {...(l.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  <span className="global-navigation-dev-platform-link-letter">
                    <span className="global-navigation-dev-platform-link-bracket">[</span>
                    <span className="global-navigation-dev-platform-link-char">{l.k}</span>
                    <span className="global-navigation-dev-platform-link-bracket">]</span>
                  </span>
                  <span className="global-navigation-dev-platform-link-label">{l.label}</span>
                </a>
              ))}
            </div>

            <div className="global-navigation-actions">
              <span className="global-navigation-primary-cta">
                <a
                  className="button-button button-button-variant-primary button-button-size-m global-navigation-try-free-cta"
                  href="#"
                >
                  <span
                    className="typography-typography global-navigation-no-wrap"
                    style={TYPO_STYLE}
                  >
                    Get Notion free
                  </span>
                </a>
              </span>
              <span className="global-navigation-secondary-actions">
                <a className="global-navigation-link" href="#">
                  <span className="typography-typography" style={TYPO_STYLE}>
                    Log in
                  </span>
                </a>
              </span>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}

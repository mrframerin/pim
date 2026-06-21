import type { CSSProperties } from "react";
import home from "@/modules/home/content/home.json";

/** Platform section (#platform) — CLI, API, MCP, SDK. 4-card grid; copy-button micro-interactions are a later enhancement. */
export default function PlatformSectionReal() {
  const c = home.platform;
  return (
    <section className="section-section section-collapsible" id="platform" data-analytics-scroll-point="true" data-analytics-name="DevPlatformPlatform">
      <div className="section-header-header section-header-align-start">
        <div className="section-header-content">
          <h2 className="section-header-heading">{c.heading}</h2>
        </div>
      </div>
      <div className="dev-platform-cards">
        <article className="surface surfaceBase surface-surface-base block-block block-block-is-surface-base">
          <div className="block-block-stack">
            <div className="block-block-content dev-platform-card-content">
              <div>
                <h3 className="semantic-typography-semantic-typography semantic-typography-variant-card-title-block dev-platform-card-title">
                  {c.cli.title}
                  {" "}
                  <span className="badge-badge badge-badge-light">{c.cli.badge}</span>
                </h3>
                <p className="semantic-typography-semantic-typography semantic-typography-variant-card-body">{c.cli.body}</p>
              </div>
              <div className="flex flex-row items-center justify-start flex-nowrap inline-auto max-inline-full gap-0 dev-platform-card-cta">
                <div className="pt-8 pb-8 ps-16 pe-48 surface surfaceAccent surface-surface-accent command-cta-command-container">
                  <div className="command-cta-command-mask">
                    <input type="text" readOnly={true} aria-label="Install command" spellCheck="false" autoComplete="off" className="command-cta-command" value={c.cli.command} />
                  </div>
                  <button title="Copy to clipboard" type="button" aria-label="Copy to clipboard" className="icon-button-icon-button icon-button-background-size-fill command-cta-copy-button" data-analytics-name="dev_platform_cli_copy" data-analytics-context="platform">
                    <span aria-hidden="true" className="icon-button-icon">
                      <span className="graphic-graphic command-cta-clipboard-icon" style={{ "--graphic-icon-size": "var(--dimension-spacing-20)" } as CSSProperties}>
                        <svg aria-hidden="true" role="graphics-symbol" viewBox="0 0 20 20" style={{ width: "100%", height: "100%", display: "block", fill: "inherit", flexShrink: "0" } as CSSProperties} className="clipboard">
                          <path d="M11.5 1.5c.768 0 1.41.534 1.58 1.25h.67c1.174 0 2.125.951 2.125 2.125v10.5A2.125 2.125 0 0 1 13.75 17.5h-7.5a2.125 2.125 0 0 1-2.125-2.125v-10.5c0-1.174.951-2.125 2.125-2.125h.67c.17-.716.812-1.25 1.58-1.25zM6.25 4a.875.875 0 0 0-.875.875v10.5c0 .483.392.875.875.875h7.5a.875.875 0 0 0 .875-.875v-10.5A.875.875 0 0 0 13.75 4h-.67a1.626 1.626 0 0 1-1.58 1.25h-3c-.768 0-1.41-.534-1.58-1.25zM8.5 2.75a.375.375 0 0 0-.375.375v.5c0 .207.168.375.375.375h3a.375.375 0 0 0 .375-.375v-.5a.375.375 0 0 0-.375-.375z" />
                        </svg>
                      </span>
                    </span>
                    <span aria-hidden="true" className="icon-button-focus-ring" />
                  </button>
                </div>
              </div>
              <a href={c.cli.ctaHref} className="inline-text-link-inline-link inline-text-link-color-theme inline-text-link-underline-on-hover" target="_self" data-analytics-name="dev_platform_cli_cta" data-analytics-event="click_link" data-analytics-context="platform">
                <span className="inline-text-link-link-content">{c.cli.ctaLabel}</span>
                <span aria-hidden="true" className="arrow-arrow arrow-arrow-after">→</span>
              </a>
            </div>
          </div>
        </article>
        <article className="surface surfaceBase surface-surface-base block-block block-block-is-surface-base">
          <div className="block-block-stack">
            <div className="block-block-content dev-platform-card-content">
              <div>
                <h3 className="semantic-typography-semantic-typography semantic-typography-variant-card-title-block dev-platform-card-title">
                  {c.api.title}
                  {" "}
                </h3>
                <p className="semantic-typography-semantic-typography semantic-typography-variant-card-body">{c.api.body}</p>
              </div>
              <a href={c.api.ctaHref} className="inline-text-link-inline-link inline-text-link-color-theme inline-text-link-underline-on-hover" target="_self" data-analytics-name="dev_platform_api_cta" data-analytics-event="click_link" data-analytics-context="platform">
                <span className="inline-text-link-link-content">{c.api.ctaLabel}</span>
                <span aria-hidden="true" className="arrow-arrow arrow-arrow-after">→</span>
              </a>
            </div>
          </div>
        </article>
        <article className="surface surfaceBase surface-surface-base block-block block-block-is-surface-base">
          <div className="block-block-stack">
            <div className="block-block-content dev-platform-card-content">
              <div>
                <h3 className="semantic-typography-semantic-typography semantic-typography-variant-card-title-block dev-platform-card-title">
                  {c.mcp.title}
                  {" "}
                </h3>
                <p className="semantic-typography-semantic-typography semantic-typography-variant-card-body">{c.mcp.body}</p>
              </div>
              <div className="flex flex-row items-center justify-start flex-nowrap inline-auto max-inline-full gap-0 dev-platform-card-cta">
                <div className="pt-8 pb-8 ps-16 pe-48 surface surfaceAccent surface-surface-accent command-cta-command-container">
                  <div className="command-cta-command-mask">
                    <input type="text" readOnly={true} aria-label="Install command" spellCheck="false" autoComplete="off" className="command-cta-command" value={c.mcp.command} />
                  </div>
                  <button title="Copy to clipboard" type="button" aria-label="Copy to clipboard" className="icon-button-icon-button icon-button-background-size-fill command-cta-copy-button" data-analytics-name="dev_platform_mcp_copy" data-analytics-context="platform">
                    <span aria-hidden="true" className="icon-button-icon">
                      <span className="graphic-graphic command-cta-clipboard-icon" style={{ "--graphic-icon-size": "var(--dimension-spacing-20)" } as CSSProperties}>
                        <svg aria-hidden="true" role="graphics-symbol" viewBox="0 0 20 20" style={{ width: "100%", height: "100%", display: "block", fill: "inherit", flexShrink: "0" } as CSSProperties} className="clipboard">
                          <path d="M11.5 1.5c.768 0 1.41.534 1.58 1.25h.67c1.174 0 2.125.951 2.125 2.125v10.5A2.125 2.125 0 0 1 13.75 17.5h-7.5a2.125 2.125 0 0 1-2.125-2.125v-10.5c0-1.174.951-2.125 2.125-2.125h.67c.17-.716.812-1.25 1.58-1.25zM6.25 4a.875.875 0 0 0-.875.875v10.5c0 .483.392.875.875.875h7.5a.875.875 0 0 0 .875-.875v-10.5A.875.875 0 0 0 13.75 4h-.67a1.626 1.626 0 0 1-1.58 1.25h-3c-.768 0-1.41-.534-1.58-1.25zM8.5 2.75a.375.375 0 0 0-.375.375v.5c0 .207.168.375.375.375h3a.375.375 0 0 0 .375-.375v-.5a.375.375 0 0 0-.375-.375z" />
                        </svg>
                      </span>
                    </span>
                    <span aria-hidden="true" className="icon-button-focus-ring" />
                  </button>
                </div>
                <button type="button" aria-expanded="false" aria-haspopup="menu" className="semantic-typography-semantic-typography semantic-typography-variant-interaction-menu-button menu-button-menu-button menu-button-selected command-cta-menu-button">
                  {c.mcp.agentSelectorLabel}
                  <svg aria-hidden="true" role="graphics-symbol" viewBox="0 0 20 20" style={{ width: "1em", height: "auto", display: "inline-block", fill: "inherit", flexShrink: "0", verticalAlign: "middle" } as CSSProperties} className="arrowChevronSingleDown menu-button-menu-marker-icon">
                    <path d="M9.558 13.442c.244.244.64.244.884 0l5.4-5.4a.625.625 0 0 0-.884-.884L10 12.116 5.042 7.158a.625.625 0 1 0-.884.884z" />
                  </svg>
                </button>
                <div id=":R9en4bm:" role="menu" popover="auto" data-position="bottom-start" className="popover-popover">
                  <div aria-hidden="true" className="popover-popover-shield" />
                  <div className="popover-popover-inner command-cta-popover">
                    <div className="pt-8 pb-8 ps-8 pe-8 surface surfaceBase surface-surface-base">
                      <ul className="flex flex-col items-stretch justify-start flex-nowrap inline-full gap-0 ps-0 mt-0 mb-0 menu-list-menu-list">
                        <li className="menu-list-menu-list-item">
                          <button type="button" role="menuitemradio" aria-checked="true" className="grid items-center inline-full gap-y-0 menu-list-menu-list-item-button menu-list-variant-primary">
                            <span className="semantic-typography-semantic-typography semantic-typography-variant-interaction-menu-list-item-label menu-list-label">{c.mcp.agentOptions[0]}</span>
                          </button>
                        </li>
                        <li className="menu-list-menu-list-item">
                          <button type="button" role="menuitemradio" aria-checked="false" className="grid items-center inline-full gap-y-0 menu-list-menu-list-item-button menu-list-variant-primary">
                            <span className="semantic-typography-semantic-typography semantic-typography-variant-interaction-menu-list-item-label menu-list-label">{c.mcp.agentOptions[1]}</span>
                          </button>
                        </li>
                        <li className="menu-list-menu-list-item">
                          <button type="button" role="menuitemradio" aria-checked="false" className="grid items-center inline-full gap-y-0 menu-list-menu-list-item-button menu-list-variant-primary">
                            <span className="semantic-typography-semantic-typography semantic-typography-variant-interaction-menu-list-item-label menu-list-label">{c.mcp.agentOptions[2]}</span>
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <a href={c.mcp.ctaHref} className="inline-text-link-inline-link inline-text-link-color-theme inline-text-link-underline-on-hover" target="_self" data-analytics-name="dev_platform_mcp_cta" data-analytics-event="click_link" data-analytics-context="platform">
                <span className="inline-text-link-link-content">{c.mcp.ctaLabel}</span>
                <span aria-hidden="true" className="arrow-arrow arrow-arrow-after">→</span>
              </a>
            </div>
          </div>
        </article>
        <article className="surface surfaceBase surface-surface-base block-block block-block-is-surface-base dev-card-sdk">
          <div className="block-block-stack block-direction-row">
            <div className="block-block-content dev-platform-card-content">
              <div>
                <h3 className="semantic-typography-semantic-typography semantic-typography-variant-card-title-block dev-platform-card-title">
                  {c.sdk.title}
                  {" "}
                  <span className="badge-badge badge-badge-light">{c.sdk.badge}</span>
                </h3>
                <p className="semantic-typography-semantic-typography semantic-typography-variant-card-body">{c.sdk.body}</p>
              </div>
              <a href={c.sdk.ctaHref} className="inline-text-link-inline-link inline-text-link-color-theme inline-text-link-underline-on-hover" target="_self" data-analytics-name="dev_platform_sdk_cta" data-analytics-event="click_link" data-analytics-context="platform">
                <span className="inline-text-link-link-content">{c.sdk.ctaLabel}</span>
                <span aria-hidden="true" className="arrow-arrow arrow-arrow-after">→</span>
              </a>
            </div>
            <div className="block-block-media dev-card-media block-media-placement-right">
              <div role="img" aria-label={c.sdk.codeAriaLabel} className="code-asset-code-asset dev-card-code-asset">
                <div aria-hidden="true">
                  <pre className="code-snippet-code-snippet language-typescript" style={{ "--code-snippet-white-space": "pre-wrap", "--code-snippet-white-space-lg": "pre", "--code-snippet-overflow": "hidden", "--code-snippet-overflow-lg": "auto" } as CSSProperties} dangerouslySetInnerHTML={{ __html: c.sdk.codeHtml }} />
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

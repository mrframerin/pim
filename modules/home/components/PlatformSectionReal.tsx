import type { CSSProperties } from "react";
import home from "@/modules/home/content/home.json";
import CommandCopy from "@/components/global/CommandCopy";
import McpCommand from "@/modules/home/components/McpCommand";

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
                <CommandCopy command={c.cli.command} analyticsName="dev_platform_cli_copy" analyticsContext="platform" />
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
              <McpCommand agents={c.mcp.agents} />
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

/**
 * `#workers` — "All of this, on a hosted runtime." (main > [1] > [1.1.3])
 * Static section. The terminal output keeps its exact whitespace/markup via
 * dangerouslySetInnerHTML (same pattern as the code block in SyncSection).
 */
import home from "@/modules/home/content/home.json";

const c = home.workers;

export default function WorkersSection() {
  return (
    <section className="section-section section-collapsible" id="workers" data-analytics-scroll-point="true" data-analytics-name="DevPlatformWorkers">
      <div className="dev-workers-subsection">
        <div className="section-header-header section-header-align-start">
          <div className="section-header-content">
            <h2 className="section-header-heading-non-responsive">{c.heading}</h2>
            <p className="section-header-subheading">{c.subheading}</p>
            <div className="section-header-ctas">
              <a href={c.cta.href} data-analytics-name="dev_platform_workers_read_docs" data-analytics-event="click_link" className="semantic-typography-semantic-typography link-text-link-text link-text-color-variant-primary link-text-has-arrow">
                <span className="link-text-link-content">{c.cta.label}</span>
                <span aria-hidden="true" className="arrow-arrow-2 arrow-arrow-flip-rtl">{c.cta.arrow}</span>
              </a>
            </div>
          </div>
        </div>
        <div className="dev-workers-subsection-terminal-container" id="connector-anchor-workers-subsection-terminal">
          <div role="img" aria-label={c.terminal.ariaLabel} className="terminal-asset-terminal-asset dev-workers-subsection-terminal">
            <div aria-hidden="true">
              <pre className="semantic-typography-semantic-typography semantic-typography-variant-global-code terminal-rich-text-terminal-rich-text" dangerouslySetInnerHTML={{ __html: c.terminal.html }} />
            </div>
          </div>
          <img className="dev-workers-subsection-terminal-icon" src={c.images.terminalIcon} alt="" width="134" height="86" id="connector-anchor-workers-subsection-terminal-icon" />
        </div>
      </div>
    </section>
  );
}

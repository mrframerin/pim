/**
 * `#workers` — "All of this, on a hosted runtime." (main > [1] > [1.1.3])
 * Static section. The terminal output keeps its exact whitespace/markup via
 * dangerouslySetInnerHTML (same pattern as the code block in SyncSection).
 */
import home from "@/modules/home/content/home.json";

const c = home.workers;

export default function WorkersSection() {
  return (
    <section className="section_section__ppkch section_collapsible__OYoF5" id="workers" data-analytics-scroll-point="true" data-analytics-name="DevPlatformWorkers">
      <div className="dev_workersSubsection__wNzMl">
        <div className="sectionHeader_header__7hACT sectionHeader_alignStart__JDnog">
          <div className="sectionHeader_content__CrL0O">
            <h2 className="sectionHeader_headingNonResponsive__YQn3D">{c.heading}</h2>
            <p className="sectionHeader_subheading__51ZJh">{c.subheading}</p>
            <div className="sectionHeader_ctas__WiORJ">
              <a href={c.cta.href} data-analytics-name="dev_platform_workers_read_docs" data-analytics-event="click_link" className="semanticTypography_semanticTypography__mWJkv linkText_linkText__527kz linkText_colorVariantPrimary__h6Nef linkText_hasArrow__2BwWV">
                <span className="linkText_linkContent__1nr8w">{c.cta.label}</span>
                <span aria-hidden="true" className="arrow_arrow___6mKn arrow_arrowFlipRtl__ur0Ug">{c.cta.arrow}</span>
              </a>
            </div>
          </div>
        </div>
        <div className="dev_workersSubsectionTerminalContainer__2bO5t" id="connector-anchor-workers-subsection-terminal">
          <div role="img" aria-label={c.terminal.ariaLabel} className="terminalAsset_terminalAsset__y5TEE dev_workersSubsectionTerminal__SzRIf">
            <div aria-hidden="true">
              <pre className="semanticTypography_semanticTypography__mWJkv semanticTypography_variantGlobalCode__nyDlV terminalRichText_terminalRichText__K1SQk" dangerouslySetInnerHTML={{ __html: c.terminal.html }} />
            </div>
          </div>
          <img className="dev_workersSubsectionTerminalIcon__4t5yM" src={c.images.terminalIcon} alt="" width="134" height="86" id="connector-anchor-workers-subsection-terminal-icon" />
        </div>
      </div>
    </section>
  );
}

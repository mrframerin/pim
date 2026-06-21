/**
 * `#workers` — "All of this, on a hosted runtime." (main > [1] > [1.1.3])
 * Static section: real DOM ported 1:1, original class names kept verbatim.
 * The terminal output keeps its exact whitespace/markup via dangerouslySetInnerHTML
 * (the only sanctioned raw-HTML use — same pattern as the code block in SyncSection).
 */
export default function WorkersSection() {
  return (
    <section className="section_section__ppkch section_collapsible__OYoF5" id="workers" data-analytics-scroll-point="true" data-analytics-name="DevPlatformWorkers">
      <div className="dev_workersSubsection__wNzMl">
        <div className="sectionHeader_header__7hACT sectionHeader_alignStart__JDnog">
          <div className="sectionHeader_content__CrL0O">
            <h2 className="sectionHeader_headingNonResponsive__YQn3D">All of this, on a hosted runtime.</h2>
            <p className="sectionHeader_subheading__51ZJh">Workers are isolated sandboxes managed by Notion, so the code behind your syncs, tools, and workflows runs on our infra instead of your servers.</p>
            <div className="sectionHeader_ctas__WiORJ">
              <a href="https://developers.notion.com/workers/get-started/overview" data-analytics-name="dev_platform_workers_read_docs" data-analytics-event="click_link" className="semanticTypography_semanticTypography__mWJkv linkText_linkText__527kz linkText_colorVariantPrimary__h6Nef linkText_hasArrow__2BwWV">
                <span className="linkText_linkContent__1nr8w">Read the docs</span>
                <span aria-hidden="true" className="arrow_arrow___6mKn arrow_arrowFlipRtl__ur0Ug">→</span>
              </a>
            </div>
          </div>
        </div>
        <div className="dev_workersSubsectionTerminalContainer__2bO5t" id="connector-anchor-workers-subsection-terminal">
          <div role="img" aria-label="A terminal window showing a worker being deployed to a Notion-hosted runtime." className="terminalAsset_terminalAsset__y5TEE dev_workersSubsectionTerminal__SzRIf">
            <div aria-hidden="true">
              <pre className="semanticTypography_semanticTypography__mWJkv semanticTypography_variantGlobalCode__nyDlV terminalRichText_terminalRichText__K1SQk" dangerouslySetInnerHTML={{ __html: "<code class=\"terminalRichText_code__rOL9k\"><small>$</small> ntn deploy worker\r\n<small>[build]</small> Deploying...\r\n<small>[build]</small> Uploading to Notion...\r\n<small>[build]</small> Worker updated...\r\n\r\nCapabilities:\r\n  <small>tool  queryCustomers</small>\r\n  <small>tool  moreOfficeSnacks</small>\r\n  <small>sync  linearTickets</small>\r\n\r\n\r\n</code>" }} />
            </div>
          </div>
          <img className="dev_workersSubsectionTerminalIcon__4t5yM" src="/vendor/front-static/pages/dev/misc/notionCircuit.svg" alt="" width="134" height="86" id="connector-anchor-workers-subsection-terminal-icon" />
        </div>
      </div>
    </section>
  );
}

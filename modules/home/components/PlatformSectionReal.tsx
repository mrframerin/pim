import type { CSSProperties } from "react";

/** Platform section (#platform) — CLI, API, MCP, SDK. 4-card grid; copy-button micro-interactions are a later enhancement. */
export default function PlatformSectionReal() {
  return (
    <section className="section_section__ppkch section_collapsible__OYoF5" id="platform" data-analytics-scroll-point="true" data-analytics-name="DevPlatformPlatform">
      <div className="sectionHeader_header__7hACT sectionHeader_alignStart__JDnog">
        <div className="sectionHeader_content__CrL0O">
          <h2 className="sectionHeader_heading__tJvSy">CLI, API, MCP, SDK — LFG.</h2>
        </div>
      </div>
      <div className="dev_platformCards__F1pvA">
        <article className="surface surfaceBase surface_surfaceBase__UD3lo block_block__NZ57K block_blockIsSurfaceBase__LSebb">
          <div className="block_blockStack__NQPhA">
            <div className="block_blockContent__QSAYI dev_platformCardContent__ZrUdw">
              <div>
                <h3 className="semanticTypography_semanticTypography__mWJkv semanticTypography_variantCardTitleBlock__8yFeJ dev_platformCardTitle__JXzTM">
                  Notion CLI
                  {" "}
                  <span className="badge_badge__4ppzB badge_badgeLight__77Dpi">Beta</span>
                </h3>
                <p className="semanticTypography_semanticTypography__mWJkv semanticTypography_variantCardBody__E_9cg">Let coding agents use token‑efficient commands to build and deploy syncs and tools to our Workers runtime.</p>
              </div>
              <div className="flex flex-row items-center justify-start flex-nowrap inline-auto max-inline-full gap-0 dev_platformCardCta__5XAgR">
                <div className="pt-8 pb-8 ps-16 pe-48 surface surfaceAccent surface_surfaceAccent___PDKt commandCTA_commandContainer__AZ6SG">
                  <div className="commandCTA_commandMask__GCTUb">
                    <input type="text" readOnly={true} aria-label="Install command" spellCheck="false" autoComplete="off" className="commandCTA_command__sAhle" value="curl -fsSL https://ntn.dev | bash" />
                  </div>
                  <button title="Copy to clipboard" type="button" aria-label="Copy to clipboard" className="iconButton_iconButton__wbWve iconButton_backgroundSizeFill__CK2pT commandCTA_copyButton__mgYzA" data-analytics-name="dev_platform_cli_copy" data-analytics-context="platform">
                    <span aria-hidden="true" className="iconButton_icon__sgIFz">
                      <span className="graphic_graphic__jmWdv commandCTA_clipboardIcon__7Rlnz" style={{ "--graphic-icon-size": "var(--dimension-spacing-20)" } as CSSProperties}>
                        <svg aria-hidden="true" role="graphics-symbol" viewBox="0 0 20 20" style={{ width: "100%", height: "100%", display: "block", fill: "inherit", flexShrink: "0" } as CSSProperties} className="clipboard">
                          <path d="M11.5 1.5c.768 0 1.41.534 1.58 1.25h.67c1.174 0 2.125.951 2.125 2.125v10.5A2.125 2.125 0 0 1 13.75 17.5h-7.5a2.125 2.125 0 0 1-2.125-2.125v-10.5c0-1.174.951-2.125 2.125-2.125h.67c.17-.716.812-1.25 1.58-1.25zM6.25 4a.875.875 0 0 0-.875.875v10.5c0 .483.392.875.875.875h7.5a.875.875 0 0 0 .875-.875v-10.5A.875.875 0 0 0 13.75 4h-.67a1.626 1.626 0 0 1-1.58 1.25h-3c-.768 0-1.41-.534-1.58-1.25zM8.5 2.75a.375.375 0 0 0-.375.375v.5c0 .207.168.375.375.375h3a.375.375 0 0 0 .375-.375v-.5a.375.375 0 0 0-.375-.375z" />
                        </svg>
                      </span>
                    </span>
                    <span aria-hidden="true" className="iconButton_focusRing__a1thx" />
                  </button>
                </div>
              </div>
              <a href="https://developers.notion.com/cli/get-started/overview" className="InlineTextLink_inlineLink__oN8YM InlineTextLink_colorTheme__waxe8 InlineTextLink_underlineOnHover__J78xW" target="_self" data-analytics-name="dev_platform_cli_cta" data-analytics-event="click_link" data-analytics-context="platform">
                <span className="InlineTextLink_linkContent__SYI4r">Read the docs</span>
                <span aria-hidden="true" className="Arrow_arrow__oVjWc Arrow_arrowAfter__8m7lp">→</span>
              </a>
            </div>
          </div>
        </article>
        <article className="surface surfaceBase surface_surfaceBase__UD3lo block_block__NZ57K block_blockIsSurfaceBase__LSebb">
          <div className="block_blockStack__NQPhA">
            <div className="block_blockContent__QSAYI dev_platformCardContent__ZrUdw">
              <div>
                <h3 className="semanticTypography_semanticTypography__mWJkv semanticTypography_variantCardTitleBlock__8yFeJ dev_platformCardTitle__JXzTM">
                  Notion API
                  {" "}
                </h3>
                <p className="semanticTypography_semanticTypography__mWJkv semanticTypography_variantCardBody__E_9cg">Turn docs into Markdown and build internal tools with PATs or shared connections.</p>
              </div>
              <a href="https://developers.notion.com/reference/intro" className="InlineTextLink_inlineLink__oN8YM InlineTextLink_colorTheme__waxe8 InlineTextLink_underlineOnHover__J78xW" target="_self" data-analytics-name="dev_platform_api_cta" data-analytics-event="click_link" data-analytics-context="platform">
                <span className="InlineTextLink_linkContent__SYI4r">Read the API docs</span>
                <span aria-hidden="true" className="Arrow_arrow__oVjWc Arrow_arrowAfter__8m7lp">→</span>
              </a>
            </div>
          </div>
        </article>
        <article className="surface surfaceBase surface_surfaceBase__UD3lo block_block__NZ57K block_blockIsSurfaceBase__LSebb">
          <div className="block_blockStack__NQPhA">
            <div className="block_blockContent__QSAYI dev_platformCardContent__ZrUdw">
              <div>
                <h3 className="semanticTypography_semanticTypography__mWJkv semanticTypography_variantCardTitleBlock__8yFeJ dev_platformCardTitle__JXzTM">
                  Notion MCP
                  {" "}
                </h3>
                <p className="semanticTypography_semanticTypography__mWJkv semanticTypography_variantCardBody__E_9cg">Search, read, and edit pages and databases with up to 91% fewer tokens.</p>
              </div>
              <div className="flex flex-row items-center justify-start flex-nowrap inline-auto max-inline-full gap-0 dev_platformCardCta__5XAgR">
                <div className="pt-8 pb-8 ps-16 pe-48 surface surfaceAccent surface_surfaceAccent___PDKt commandCTA_commandContainer__AZ6SG">
                  <div className="commandCTA_commandMask__GCTUb">
                    <input type="text" readOnly={true} aria-label="Install command" spellCheck="false" autoComplete="off" className="commandCTA_command__sAhle" value="claude mcp add --transport http notion https://mcp.notion.com/mcp" />
                  </div>
                  <button title="Copy to clipboard" type="button" aria-label="Copy to clipboard" className="iconButton_iconButton__wbWve iconButton_backgroundSizeFill__CK2pT commandCTA_copyButton__mgYzA" data-analytics-name="dev_platform_mcp_copy" data-analytics-context="platform">
                    <span aria-hidden="true" className="iconButton_icon__sgIFz">
                      <span className="graphic_graphic__jmWdv commandCTA_clipboardIcon__7Rlnz" style={{ "--graphic-icon-size": "var(--dimension-spacing-20)" } as CSSProperties}>
                        <svg aria-hidden="true" role="graphics-symbol" viewBox="0 0 20 20" style={{ width: "100%", height: "100%", display: "block", fill: "inherit", flexShrink: "0" } as CSSProperties} className="clipboard">
                          <path d="M11.5 1.5c.768 0 1.41.534 1.58 1.25h.67c1.174 0 2.125.951 2.125 2.125v10.5A2.125 2.125 0 0 1 13.75 17.5h-7.5a2.125 2.125 0 0 1-2.125-2.125v-10.5c0-1.174.951-2.125 2.125-2.125h.67c.17-.716.812-1.25 1.58-1.25zM6.25 4a.875.875 0 0 0-.875.875v10.5c0 .483.392.875.875.875h7.5a.875.875 0 0 0 .875-.875v-10.5A.875.875 0 0 0 13.75 4h-.67a1.626 1.626 0 0 1-1.58 1.25h-3c-.768 0-1.41-.534-1.58-1.25zM8.5 2.75a.375.375 0 0 0-.375.375v.5c0 .207.168.375.375.375h3a.375.375 0 0 0 .375-.375v-.5a.375.375 0 0 0-.375-.375z" />
                        </svg>
                      </span>
                    </span>
                    <span aria-hidden="true" className="iconButton_focusRing__a1thx" />
                  </button>
                </div>
                <button type="button" aria-expanded="false" aria-haspopup="menu" className="semanticTypography_semanticTypography__mWJkv semanticTypography_variantInteractionMenuButton__ZWXnH menuButton_menuButton__Siywy menuButton_selected__ImcqP commandCTA_menuButton__kQGEY">
                  Claude
                  <svg aria-hidden="true" role="graphics-symbol" viewBox="0 0 20 20" style={{ width: "1em", height: "auto", display: "inline-block", fill: "inherit", flexShrink: "0", verticalAlign: "middle" } as CSSProperties} className="arrowChevronSingleDown menuButton_menuMarkerIcon__1w2CJ">
                    <path d="M9.558 13.442c.244.244.64.244.884 0l5.4-5.4a.625.625 0 0 0-.884-.884L10 12.116 5.042 7.158a.625.625 0 1 0-.884.884z" />
                  </svg>
                </button>
                <div id=":R9en4bm:" role="menu" popover="auto" data-position="bottom-start" className="popover_popover__JN_kC">
                  <div aria-hidden="true" className="popover_popoverShield__w2q6K" />
                  <div className="popover_popoverInner__32bss commandCTA_popover__1luvx">
                    <div className="pt-8 pb-8 ps-8 pe-8 surface surfaceBase surface_surfaceBase__UD3lo">
                      <ul className="flex flex-col items-stretch justify-start flex-nowrap inline-full gap-0 ps-0 mt-0 mb-0 menuList_menuList__Tn7rd">
                        <li className="menuList_menuListItem___Rmlj">
                          <button type="button" role="menuitemradio" aria-checked="true" className="grid items-center inline-full gap-y-0 menuList_menuListItemButton__QXktT menuList_variantPrimary__XdPVz">
                            <span className="semanticTypography_semanticTypography__mWJkv semanticTypography_variantInteractionMenuListItemLabel___7StL menuList_label__SGqyS">Claude</span>
                          </button>
                        </li>
                        <li className="menuList_menuListItem___Rmlj">
                          <button type="button" role="menuitemradio" aria-checked="false" className="grid items-center inline-full gap-y-0 menuList_menuListItemButton__QXktT menuList_variantPrimary__XdPVz">
                            <span className="semanticTypography_semanticTypography__mWJkv semanticTypography_variantInteractionMenuListItemLabel___7StL menuList_label__SGqyS">Codex</span>
                          </button>
                        </li>
                        <li className="menuList_menuListItem___Rmlj">
                          <button type="button" role="menuitemradio" aria-checked="false" className="grid items-center inline-full gap-y-0 menuList_menuListItemButton__QXktT menuList_variantPrimary__XdPVz">
                            <span className="semanticTypography_semanticTypography__mWJkv semanticTypography_variantInteractionMenuListItemLabel___7StL menuList_label__SGqyS">Other</span>
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <a href="https://developers.notion.com/guides/mcp/mcp" className="InlineTextLink_inlineLink__oN8YM InlineTextLink_colorTheme__waxe8 InlineTextLink_underlineOnHover__J78xW" target="_self" data-analytics-name="dev_platform_mcp_cta" data-analytics-event="click_link" data-analytics-context="platform">
                <span className="InlineTextLink_linkContent__SYI4r">Read the docs</span>
                <span aria-hidden="true" className="Arrow_arrow__oVjWc Arrow_arrowAfter__8m7lp">→</span>
              </a>
            </div>
          </div>
        </article>
        <article className="surface surfaceBase surface_surfaceBase__UD3lo block_block__NZ57K block_blockIsSurfaceBase__LSebb dev_cardSdk__FAIRR">
          <div className="block_blockStack__NQPhA block_directionRow__Enme4">
            <div className="block_blockContent__QSAYI dev_platformCardContent__ZrUdw">
              <div>
                <h3 className="semanticTypography_semanticTypography__mWJkv semanticTypography_variantCardTitleBlock__8yFeJ dev_platformCardTitle__JXzTM">
                  Notion Agent SDK
                  {" "}
                  <span className="badge_badge__4ppzB badge_badgeLight__77Dpi">Alpha</span>
                </h3>
                <p className="semanticTypography_semanticTypography__mWJkv semanticTypography_variantCardBody__E_9cg">Bring your Agents into any app. Trigger runs via API, keep multi-turn threads, and stream responses in real time.</p>
              </div>
              <a href="https://notion.pages.dev.notion.co/357b35e6e67f8012bb0dd3f95c9be810?pvs=105" className="InlineTextLink_inlineLink__oN8YM InlineTextLink_colorTheme__waxe8 InlineTextLink_underlineOnHover__J78xW" target="_self" data-analytics-name="dev_platform_sdk_cta" data-analytics-event="click_link" data-analytics-context="platform">
                <span className="InlineTextLink_linkContent__SYI4r">Join the waitlist</span>
                <span aria-hidden="true" className="Arrow_arrow__oVjWc Arrow_arrowAfter__8m7lp">→</span>
              </a>
            </div>
            <div className="block_blockMedia__tgELR dev_cardMedia__rCEVK block_mediaPlacementRight__6o28Y">
              <div role="img" aria-label="A code snippet showing how to use the Agent SDK to create a new agent." className="codeAsset_codeAsset__C1kH7 dev_cardCodeAsset___5NNb">
                <div aria-hidden="true">
                  <pre className="codeSnippet_codeSnippet__Q2VMk language-typescript" style={{ "--code-snippet-white-space": "pre-wrap", "--code-snippet-white-space-lg": "pre", "--code-snippet-overflow": "hidden", "--code-snippet-overflow-lg": "auto" } as CSSProperties} dangerouslySetInnerHTML={{ __html: "<code class=\"language-typescript\">import { NotionAgentsClient } from &quot;@notionhq/agents-client&quot;;\r\n\r\nconst client = new NotionAgentsClient();\r\nconst agent = await client.agents.agent(id);\r\n\r\nawait agent.chat({ \r\n  message: &quot;Hello, World!&quot; \r\n});</code>" }} />
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

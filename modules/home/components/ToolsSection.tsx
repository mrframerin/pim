import type { CSSProperties } from "react";
import ToolChat from "@/modules/home/components/ToolChat";
import home from "@/modules/home/content/home.json";

const c = home.tools;

/** Tools section (#tools) — "Build any tool for your agents."
 *  The first carousel slide's chat is the NDSChatPreviewContent (ToolChat). */
export default function ToolsSection() {
  return (
    <section className="section_section__ppkch section_collapsible__OYoF5" id="tools" data-analytics-scroll-point="true" data-analytics-name="DevPlatformTools">
      <div className="sectionHeader_header__7hACT sectionHeader_alignStart__JDnog" id="connector-anchor-tools-subsection-header">
        <div className="sectionHeader_content__CrL0O">
          <h2 id="connector-anchor-tools-subsection-header-heading" className="sectionHeader_heading__tJvSy">{c.heading}</h2>
          <p className="sectionHeader_subheading__51ZJh">{c.subheading}</p>
        </div>
      </div>
      <div>
        <section className="accordionCarousel_accordionCarousel__2jy_8 dev_toolsAccordionCarousel__q8Q6x" aria-roledescription="carousel" style={{ "--responsive-accordion-carousel-gap": "var(--dimension-spacing-80)" } as CSSProperties}>
          <div className="responsiveAccordionCarousel_root__sfG94 accordionCarousel_accordionCarouselInner__R7YLB">
            <div className="responsiveAccordionCarousel_inner___MXac" style={{ "--responsive-accordion-carousel-grid-columns": "minmax(0, 1fr) minmax(0, 1fr)" } as CSSProperties}>
              <div className="responsiveAccordionCarousel_info__ffjxn">
                <div role="tablist" className="responsiveAccordionCarousel_tablist___ydaL accordionCarouselTabs_accordion__svIk0 dev_toolsAccordionTabs__tcIxP accordionCarouselTabs_accordionFillRemainingHeight__HG4qM">
                  <div role="tab" tabIndex={0} aria-selected="true" className="responsiveAccordionCarousel_tab__05YAX accordionCarouselTabs_accordionTrigger___9KT5">
                    <span className="accordionCarouselTabs_accordionTitleRow__hj9n3">
                      <div className="semanticTypography_semanticTypography__mWJkv semanticTypography_variantCardTitleSummary__lvrMk accordionCarouselTabs_accordionTitle__p8uMW">{c.slides.presentation.tabTitle}</div>
                    </span>
                    <div className="semanticTypography_semanticTypography__mWJkv semanticTypography_variantCardBodySummary__7ucTw accordionCarouselTabs_accordionBody__nkBC6">
                      <div className="surface surfaceBase surface_surfaceBase__UD3lo toolDemo_codeTerminal___cNhP">
                        <div role="img" aria-label={c.slides.presentation.ariaLabel} className="codeTerminalExample_container__GaMXg">
                          <div className="flex flex-row items-center justify-between flex-nowrap inline-full gap-12 codeTerminalExample_toolbar__4Qa1t">
                            <span className="semanticTypography_semanticTypography__mWJkv semanticTypography_variantGlobalCode__nyDlV codeTerminalExample_title__eRQ3k">{c.slides.presentation.filename}</span>
                            <a href={c.slides.presentation.cta.href} data-analytics-name="dev_platform_tools_see_example" data-analytics-context="presentation" className="semanticTypography_semanticTypography__mWJkv semanticTypography_variantInteractionButtonSmall__LAKr_ button_button__bge_I codeTerminalExample_ctaButton__YqSt9 button_ghost__npAbk button_small__undru">
                              <span className="inline-flex flex-row items-center justify-start flex-nowrap inline-auto gap-4 codeTerminalExample_cta__L3sd5">
                                <svg width="25" height="25" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M17.5091 6.68311C11.4214 6.68311 6.5 11.6407 6.5 17.774C6.5 22.6767 9.65328 26.8266 14.0277 28.2955C14.5746 28.4059 14.775 28.0568 14.775 27.7632C14.775 27.5061 14.7569 26.6247 14.7569 25.7064C11.6945 26.3676 11.0567 24.3843 11.0567 24.3843C10.5646 23.099 9.83536 22.7686 9.83536 22.7686C8.83302 22.0892 9.90837 22.0892 9.90837 22.0892C11.0202 22.1626 11.6037 23.2276 11.6037 23.2276C12.5877 24.9168 14.1735 24.4395 14.8115 24.1457C14.9025 23.4295 15.1943 22.9338 15.5042 22.6584C13.0617 22.4013 10.4918 21.4465 10.4918 17.1863C10.4918 15.9744 10.929 14.9829 11.6217 14.2117C11.5124 13.9363 11.1295 12.7977 11.7312 11.2736C11.7312 11.2736 12.6608 10.9798 14.7567 12.4121C15.6541 12.1693 16.5795 12.0458 17.5091 12.0448C18.4387 12.0448 19.3862 12.1735 20.2613 12.4121C22.3574 10.9798 23.287 11.2736 23.287 11.2736C23.8887 12.7977 23.5056 13.9363 23.3963 14.2117C24.1073 14.9829 24.5264 15.9744 24.5264 17.1863C24.5264 21.4465 21.9565 22.3828 19.4958 22.6584C19.8969 23.0072 20.243 23.6682 20.243 24.7149C20.243 26.2022 20.225 27.3959 20.225 27.763C20.225 28.0568 20.4255 28.4059 20.9722 28.2957C25.3467 26.8264 28.5 22.6767 28.5 17.774C28.518 11.6407 23.5786 6.68311 17.5091 6.68311Z" />
                                </svg>
                                {c.slides.presentation.cta.label}
                              </span>
                            </a>
                          </div>
                          <div className="codeTerminalExample_codeSnippetWrapper__DzLKI">
                            <div className="codeTerminalExample_codeSnippetScroll__G2lTC">
                              <pre className="codeSnippet_codeSnippet__Q2VMk language-typescript codeTerminalExample_codeSnippet__4R6iH" style={{ "--code-snippet-white-space": "pre-wrap", "--code-snippet-overflow": "hidden" } as CSSProperties} dangerouslySetInnerHTML={{ __html: c.slides.presentation.codeHtml }} />
                            </div>
                          </div>
                          <pre className="semanticTypography_semanticTypography__mWJkv semanticTypography_variantGlobalCode__nyDlV terminalRichText_terminalRichText__K1SQk codeTerminalExample_terminal__UQ5fq" dangerouslySetInnerHTML={{ __html: c.slides.presentation.terminalHtml }} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div role="tab" tabIndex={-1} aria-selected="false" className="responsiveAccordionCarousel_tab__05YAX accordionCarouselTabs_accordionTrigger___9KT5">
                    <span className="accordionCarouselTabs_accordionTitleRow__hj9n3">
                      <div className="semanticTypography_semanticTypography__mWJkv semanticTypography_variantCardTitleSummary__lvrMk accordionCarouselTabs_accordionTitle__p8uMW">{c.slides.dataWarehouse.tabTitle}</div>
                    </span>
                    <div className="semanticTypography_semanticTypography__mWJkv semanticTypography_variantCardBodySummary__7ucTw accordionCarouselTabs_accordionBody__nkBC6">
                      <div className="surface surfaceBase surface_surfaceBase__UD3lo toolDemo_codeTerminal___cNhP">
                        <div role="img" aria-label={c.slides.dataWarehouse.ariaLabel} className="codeTerminalExample_container__GaMXg">
                          <div className="flex flex-row items-center justify-between flex-nowrap inline-full gap-12 codeTerminalExample_toolbar__4Qa1t">
                            <span className="semanticTypography_semanticTypography__mWJkv semanticTypography_variantGlobalCode__nyDlV codeTerminalExample_title__eRQ3k">{c.slides.dataWarehouse.filename}</span>
                            <a href={c.slides.dataWarehouse.cta.href} data-analytics-name="dev_platform_tools_see_example" data-analytics-context="dataWarehouse" className="semanticTypography_semanticTypography__mWJkv semanticTypography_variantInteractionButtonSmall__LAKr_ button_button__bge_I codeTerminalExample_ctaButton__YqSt9 button_ghost__npAbk button_small__undru">
                              <span className="inline-flex flex-row items-center justify-start flex-nowrap inline-auto gap-4 codeTerminalExample_cta__L3sd5">
                                <svg width="25" height="25" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M17.5091 6.68311C11.4214 6.68311 6.5 11.6407 6.5 17.774C6.5 22.6767 9.65328 26.8266 14.0277 28.2955C14.5746 28.4059 14.775 28.0568 14.775 27.7632C14.775 27.5061 14.7569 26.6247 14.7569 25.7064C11.6945 26.3676 11.0567 24.3843 11.0567 24.3843C10.5646 23.099 9.83536 22.7686 9.83536 22.7686C8.83302 22.0892 9.90837 22.0892 9.90837 22.0892C11.0202 22.1626 11.6037 23.2276 11.6037 23.2276C12.5877 24.9168 14.1735 24.4395 14.8115 24.1457C14.9025 23.4295 15.1943 22.9338 15.5042 22.6584C13.0617 22.4013 10.4918 21.4465 10.4918 17.1863C10.4918 15.9744 10.929 14.9829 11.6217 14.2117C11.5124 13.9363 11.1295 12.7977 11.7312 11.2736C11.7312 11.2736 12.6608 10.9798 14.7567 12.4121C15.6541 12.1693 16.5795 12.0458 17.5091 12.0448C18.4387 12.0448 19.3862 12.1735 20.2613 12.4121C22.3574 10.9798 23.287 11.2736 23.287 11.2736C23.8887 12.7977 23.5056 13.9363 23.3963 14.2117C24.1073 14.9829 24.5264 15.9744 24.5264 17.1863C24.5264 21.4465 21.9565 22.3828 19.4958 22.6584C19.8969 23.0072 20.243 23.6682 20.243 24.7149C20.243 26.2022 20.225 27.3959 20.225 27.763C20.225 28.0568 20.4255 28.4059 20.9722 28.2957C25.3467 26.8264 28.5 22.6767 28.5 17.774C28.518 11.6407 23.5786 6.68311 17.5091 6.68311Z" />
                                </svg>
                                {c.slides.dataWarehouse.cta.label}
                              </span>
                            </a>
                          </div>
                          <div className="codeTerminalExample_codeSnippetWrapper__DzLKI">
                            <div className="codeTerminalExample_codeSnippetScroll__G2lTC">
                              <pre className="codeSnippet_codeSnippet__Q2VMk language-typescript codeTerminalExample_codeSnippet__4R6iH" style={{ "--code-snippet-white-space": "pre-wrap", "--code-snippet-overflow": "hidden" } as CSSProperties} dangerouslySetInnerHTML={{ __html: c.slides.dataWarehouse.codeHtml }} />
                            </div>
                          </div>
                          <pre className="semanticTypography_semanticTypography__mWJkv semanticTypography_variantGlobalCode__nyDlV terminalRichText_terminalRichText__K1SQk codeTerminalExample_terminal__UQ5fq" dangerouslySetInnerHTML={{ __html: c.slides.dataWarehouse.terminalHtml }} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div role="tab" tabIndex={-1} aria-selected="false" className="responsiveAccordionCarousel_tab__05YAX accordionCarouselTabs_accordionTrigger___9KT5">
                    <span className="accordionCarouselTabs_accordionTitleRow__hj9n3">
                      <div className="semanticTypography_semanticTypography__mWJkv semanticTypography_variantCardTitleSummary__lvrMk accordionCarouselTabs_accordionTitle__p8uMW">{c.slides.browser.tabTitle}</div>
                    </span>
                    <div className="semanticTypography_semanticTypography__mWJkv semanticTypography_variantCardBodySummary__7ucTw accordionCarouselTabs_accordionBody__nkBC6">
                      <div className="surface surfaceBase surface_surfaceBase__UD3lo toolDemo_codeTerminal___cNhP">
                        <div role="img" aria-label={c.slides.browser.ariaLabel} className="codeTerminalExample_container__GaMXg">
                          <div className="flex flex-row items-center justify-between flex-nowrap inline-full gap-12 codeTerminalExample_toolbar__4Qa1t">
                            <span className="semanticTypography_semanticTypography__mWJkv semanticTypography_variantGlobalCode__nyDlV codeTerminalExample_title__eRQ3k">{c.slides.browser.filename}</span>
                            <a href={c.slides.browser.cta.href} data-analytics-name="dev_platform_tools_copy_prompt" data-analytics-context="browser" className="semanticTypography_semanticTypography__mWJkv semanticTypography_variantInteractionButtonSmall__LAKr_ button_button__bge_I codeTerminalExample_ctaButton__YqSt9 button_ghost__npAbk button_small__undru">
                              <span className="inline-flex flex-row items-center justify-start flex-nowrap inline-auto gap-4 codeTerminalExample_cta__L3sd5">
                                <svg height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="20" className="NotionIconSvgWrapper_icon__8quiY">
                                  <path d="M5 5.625h1.875v.625L3.125 10l3.75 3.75v.625H5L.625 10zm10.625 0H13.75v.625L17.5 10l-3.75 3.75v.625h1.875L20 10zM7.188 17.5h1.875l3.75-15h-1.876z" fill="currentColor" />
                                </svg>
                                {c.slides.browser.cta.label}
                              </span>
                            </a>
                          </div>
                          <div className="codeTerminalExample_codeSnippetWrapper__DzLKI">
                            <div className="codeTerminalExample_codeSnippetScroll__G2lTC">
                              <pre className="codeSnippet_codeSnippet__Q2VMk language-markdown codeTerminalExample_codeSnippet__4R6iH" style={{ "--code-snippet-white-space": "pre-wrap", "--code-snippet-overflow": "hidden" } as CSSProperties} dangerouslySetInnerHTML={{ __html: c.slides.browser.codeHtml }} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="responsiveAccordionCarousel_mobileDetails__thhWW accordionCarouselTabs_mobileFooter__uf5Cd">
                  <div className="accordionCarouselTabs_mobileAccordionBody__1h4Gl">
                    <div className="semanticTypography_semanticTypography__mWJkv semanticTypography_variantCardTitleSummary__lvrMk">{c.slides.presentation.tabTitle}</div>
                    <div className="semanticTypography_semanticTypography__mWJkv semanticTypography_variantCardBodySummary__7ucTw">
                      <div className="surface surfaceBase surface_surfaceBase__UD3lo toolDemo_codeTerminal___cNhP">
                        <div role="img" aria-label={c.slides.presentation.ariaLabel} className="codeTerminalExample_container__GaMXg">
                          <div className="flex flex-row items-center justify-between flex-nowrap inline-full gap-12 codeTerminalExample_toolbar__4Qa1t">
                            <span className="semanticTypography_semanticTypography__mWJkv semanticTypography_variantGlobalCode__nyDlV codeTerminalExample_title__eRQ3k">{c.slides.presentation.filename}</span>
                            <a href={c.slides.presentation.cta.href} data-analytics-name="dev_platform_tools_see_example" data-analytics-context="presentation" className="semanticTypography_semanticTypography__mWJkv semanticTypography_variantInteractionButtonSmall__LAKr_ button_button__bge_I codeTerminalExample_ctaButton__YqSt9 button_ghost__npAbk button_small__undru">
                              <span className="inline-flex flex-row items-center justify-start flex-nowrap inline-auto gap-4 codeTerminalExample_cta__L3sd5">
                                <svg width="25" height="25" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M17.5091 6.68311C11.4214 6.68311 6.5 11.6407 6.5 17.774C6.5 22.6767 9.65328 26.8266 14.0277 28.2955C14.5746 28.4059 14.775 28.0568 14.775 27.7632C14.775 27.5061 14.7569 26.6247 14.7569 25.7064C11.6945 26.3676 11.0567 24.3843 11.0567 24.3843C10.5646 23.099 9.83536 22.7686 9.83536 22.7686C8.83302 22.0892 9.90837 22.0892 9.90837 22.0892C11.0202 22.1626 11.6037 23.2276 11.6037 23.2276C12.5877 24.9168 14.1735 24.4395 14.8115 24.1457C14.9025 23.4295 15.1943 22.9338 15.5042 22.6584C13.0617 22.4013 10.4918 21.4465 10.4918 17.1863C10.4918 15.9744 10.929 14.9829 11.6217 14.2117C11.5124 13.9363 11.1295 12.7977 11.7312 11.2736C11.7312 11.2736 12.6608 10.9798 14.7567 12.4121C15.6541 12.1693 16.5795 12.0458 17.5091 12.0448C18.4387 12.0448 19.3862 12.1735 20.2613 12.4121C22.3574 10.9798 23.287 11.2736 23.287 11.2736C23.8887 12.7977 23.5056 13.9363 23.3963 14.2117C24.1073 14.9829 24.5264 15.9744 24.5264 17.1863C24.5264 21.4465 21.9565 22.3828 19.4958 22.6584C19.8969 23.0072 20.243 23.6682 20.243 24.7149C20.243 26.2022 20.225 27.3959 20.225 27.763C20.225 28.0568 20.4255 28.4059 20.9722 28.2957C25.3467 26.8264 28.5 22.6767 28.5 17.774C28.518 11.6407 23.5786 6.68311 17.5091 6.68311Z" />
                                </svg>
                                {c.slides.presentation.cta.label}
                              </span>
                            </a>
                          </div>
                          <div className="codeTerminalExample_codeSnippetWrapper__DzLKI">
                            <div className="codeTerminalExample_codeSnippetScroll__G2lTC">
                              <pre className="codeSnippet_codeSnippet__Q2VMk language-typescript codeTerminalExample_codeSnippet__4R6iH" style={{ "--code-snippet-white-space": "pre-wrap", "--code-snippet-overflow": "hidden" } as CSSProperties} dangerouslySetInnerHTML={{ __html: c.slides.presentation.codeHtml }} />
                            </div>
                          </div>
                          <pre className="semanticTypography_semanticTypography__mWJkv semanticTypography_variantGlobalCode__nyDlV terminalRichText_terminalRichText__K1SQk codeTerminalExample_terminal__UQ5fq" dangerouslySetInnerHTML={{ __html: c.slides.presentation.terminalHtml }} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div aria-label="Slide navigation" className="responsiveAccordionCarousel_dots__OUy79 accordionCarouselTabs_dots__I31bd" role="tablist">
                    <button type="button" role="tab" aria-selected="true" aria-label="Go to slide 1" className="responsiveAccordionCarousel_dot__dD7WB accordionCarouselTabs_dot__5E2Kc" />
                    <button type="button" role="tab" aria-selected="false" aria-label="Go to slide 2" className="responsiveAccordionCarousel_dot__dD7WB accordionCarouselTabs_dot__5E2Kc" />
                    <button type="button" role="tab" aria-selected="false" aria-label="Go to slide 3" className="responsiveAccordionCarousel_dot__dD7WB accordionCarouselTabs_dot__5E2Kc" />
                  </div>
                </div>
              </div>
              <div className="responsiveAccordionCarousel_media__Lmr0Y accordionCarouselSlides_slides__jrRhT">
                <div className="accordionCarouselSlides_slidesDesktop__ioewI">
                  <div className="accordionCarouselSlides_slideItemDesktop__gmW7W accordionCarouselSlides_slideItemDesktopActive__rSQnY" role="group" aria-roledescription="slide" aria-label="1 of 3">
                    <div className="accordionCarouselSlide_slide__2qKg0">
                      <div role="img" aria-label={c.slides.presentation.ariaLabel} className="notionAsset_notionAsset__VuHJN toolDemo_chatSlot__GMluV">
                        <div aria-hidden="true" className="surface surfaceBase surface_surfaceBase__UD3lo toolDemo_chatSurface__vnUA7">
                          <div className="toolDemo_chatScaleWrapper__dCM9i">
                            <ToolChat />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="accordionCarouselSlides_slideItemDesktop__gmW7W" role="group" aria-roledescription="slide" aria-label="2 of 3">
                    <div className="accordionCarouselSlide_slide__2qKg0">
                      <div role="img" aria-label={c.slides.dataWarehouse.ariaLabel} className="notionAsset_notionAsset__VuHJN toolDemo_chatSlot__GMluV">
                        <div aria-hidden="true" className="surface surfaceBase surface_surfaceBase__UD3lo toolDemo_chatSurface__vnUA7">
                          <div className="toolDemo_chatScaleWrapper__dCM9i">
                            <div style={{ width: "100%", height: "100%", overflow: "hidden", flex: "1 1 0%", minWidth: "0", minHeight: "0" } as CSSProperties} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="accordionCarouselSlides_slideItemDesktop__gmW7W" role="group" aria-roledescription="slide" aria-label="3 of 3">
                    <div className="accordionCarouselSlide_slide__2qKg0">
                      <div role="img" aria-label={c.slides.browser.ariaLabel} className="notionAsset_notionAsset__VuHJN toolDemo_chatSlot__GMluV">
                        <div aria-hidden="true" className="surface surfaceBase surface_surfaceBase__UD3lo toolDemo_chatSurface__vnUA7">
                          <div className="toolDemo_chatScaleWrapper__dCM9i">
                            <div style={{ width: "100%", height: "100%", overflow: "hidden", flex: "1 1 0%", minWidth: "0", minHeight: "0" } as CSSProperties} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="responsiveAccordionCarousel_track__RWccZ accordionCarouselSlides_slidesMobile__npox8" style={{ transform: "translateX(0%)" } as CSSProperties}>
                  <div className="accordionCarouselSlides_slideItemMobile__e_oae" role="group" aria-roledescription="slide" aria-label="1 of 3">
                    <div className="accordionCarouselSlide_slide__2qKg0">
                      <div role="img" aria-label={c.slides.presentation.ariaLabel} className="notionAsset_notionAsset__VuHJN toolDemo_chatSlot__GMluV">
                        <div aria-hidden="true" className="surface surfaceBase surface_surfaceBase__UD3lo toolDemo_chatSurface__vnUA7">
                          <div className="toolDemo_chatScaleWrapper__dCM9i">
                            <div style={{ width: "100%", height: "100%", overflow: "hidden", flex: "1 1 0%", minWidth: "0", minHeight: "0" } as CSSProperties} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="accordionCarouselSlides_slideItemMobile__e_oae" role="group" aria-roledescription="slide" aria-label="2 of 3">
                    <div className="accordionCarouselSlide_slide__2qKg0">
                      <div role="img" aria-label={c.slides.dataWarehouse.ariaLabel} className="notionAsset_notionAsset__VuHJN toolDemo_chatSlot__GMluV">
                        <div aria-hidden="true" className="surface surfaceBase surface_surfaceBase__UD3lo toolDemo_chatSurface__vnUA7">
                          <div className="toolDemo_chatScaleWrapper__dCM9i">
                            <div style={{ width: "100%", height: "100%", overflow: "hidden", flex: "1 1 0%", minWidth: "0", minHeight: "0" } as CSSProperties} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="accordionCarouselSlides_slideItemMobile__e_oae" role="group" aria-roledescription="slide" aria-label="3 of 3">
                    <div className="accordionCarouselSlide_slide__2qKg0">
                      <div role="img" aria-label={c.slides.browser.ariaLabel} className="notionAsset_notionAsset__VuHJN toolDemo_chatSlot__GMluV">
                        <div aria-hidden="true" className="surface surfaceBase surface_surfaceBase__UD3lo toolDemo_chatSurface__vnUA7">
                          <div className="toolDemo_chatScaleWrapper__dCM9i">
                            <div style={{ width: "100%", height: "100%", overflow: "hidden", flex: "1 1 0%", minWidth: "0", minHeight: "0" } as CSSProperties} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <span className="accordionCarouselSlides_arrowSlot__dDdZf" style={{ "--accordion-carousel-arrow-display": "contents", "--accordion-carousel-arrow-display-xl": "none" } as CSSProperties}>
                  <button aria-label="Next slide" type="button" className="flex items-center justify-center actionButton_actionButton__wgfeI actionButton_primary__kHcxb actionButton_circle__5pYaw accordionCarouselSlides_arrowButton__Yhone accordionCarouselSlides_arrowButtonNext__XDLMo">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12.3333 9.33333V7.25H10.25V9.33333H12.3333ZM10.25 7.25V5.16667H8.16667V7.25H10.25ZM10.25 11.4167V9.33333H8.16667V11.4167H10.25ZM8.16667 5.16667V3.08333H6.08333V5.16667H8.16667ZM8.16667 13.5V11.4167H6.08333V13.5H8.16667ZM6.08333 3.08333V1H4V3.08333H6.08333ZM6.08333 15.5833V13.5H4V15.5833H6.08333Z" fill="#1313BA" />
                    </svg>
                  </button>
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="flex dev_workersSubsectionSpacer__MEK_G" />
    </section>
  );
}

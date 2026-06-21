import type { CSSProperties } from "react";
import FooterGame from "@/components/global/FooterGame";
import CommandCopy from "@/components/global/CommandCopy";

/** Footer (minimal variant). The agent-run game inside dev_footerGameSection is rendered by FooterGame. */
export default function Footer() {
  return (
    <footer data-analytics-scroll-point="true" data-analytics-name="footer" className="surface surfaceBase surface-surface-base footer-minimal-footer-outer footer-minimal-hide-separator">
      <div className="layout-layout-base layout-xl footer-minimal-footer-inner">
        <a className="footer-minimal-logo" aria-label="Notion – Home" href="/product">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 512 160" className="wordmark-wordmark">
            <path fill="#fff" d="m353.491 46.005.001 22.024h16.393v11.185l-16.394-.004.001 32.792 16.393-.003.005 10.727-.078.338c-.395.232-21.496.141-23.78.142l.007-11.015-5.502.003.004-32.978-16.327-.002V68.027l16.324.001.003-22.028zm-38.227 22.027-.001 11.012 5.486-.003v33.153l-5.487.001-.008 11.014-40.233.001-.002-11.015-5.484.002-.001-33.158 5.48.001.018-11.009zm191.239.001-.001 11.007h5.393l.001 44.167-12.856.002.002-31.554.003-12.44-25.334-.002.002 43.995-12.934.002c-.209-18.243-.005-36.903-.005-55.18zm-114.757-.002-.013 55.177-12.921.001.011-55.182zm54.616 0-.007 11.01 5.483-.001v33.154h-5.485l.002 11.013-40.19.002c-.045-3.626.002-7.382.004-11.017l-5.479.004-.002-33.158 5.474.001V68.027zM260.596 46.004l-.002 77.199-18.415.002.001-11.016-5.383.003.006-11.015-5.477.003.003-11.018-5.456.005.002-10.953-5.464-.002.006-11-3.51-.006.002 54.998-12.909.002.015-77.207 18.379.005-.002 11.01 5.48.003-.003 11.01h5.461l-.001 11.012c1.591-.007 3.93-.084 5.46.052l-.002 10.901 5.398-.003-.002 11.01 3.473-.001L247.65 46zm21.878 66.001h25.308l.016-32.79-25.31-.005zm131.151 0 25.264-.002.006-32.788-25.271-.003zm-21.879-66.002a974 974 0 0 1-.018 11.208l-12.916-.002.013-11.21zM142.955 10.765h13.229v11.19h13.228V148.81h-13.228V160H26.457v-11.19H13.228v-10.764H0V10.765h13.228V0h129.727z" />
            <path fill="#1313ba" d="M134.213 8.23v11.194H35.211v10.76h99.01v-11.19h13.22v11.19h13.228v109.78h-13.215l-.005-98.586h-99.01v98.586h99.002v11.189H34.791v-11.189H21.561v-10.765H8.334V18.994h13.228V8.23z" />
            <path fill="#1313ba" d="M88.125 62.903h6.399v11.194h6.829V84.86h6.403v11.19h6.829v10.764h6.408V63.332h-6.829v-11.19h26.878v11.19h-6.829V129.2h-20.049v-11.194h-13.228v-10.76h-6.4V96.051l-.012-.034v.034h-6.816V85.286h-6.412v32.719h6.828v11.194H61.251v-11.194h6.829l-.004-54.673H61.25v-11.19h26.874z" />
          </svg>
        </a>
        <div className="footer-minimal-footer-bottom">
          <button type="button" aria-expanded="false" aria-haspopup="dialog" className="semantic-typography-semantic-typography semantic-typography-variant-interaction-menu-button menu-button-menu-button menu-button-variant-primary language-picker-menu-button devPlatformDarkSurface">
            <span className="inline-flex flex-row items-center justify-start flex-nowrap inline-full gap-8">
              <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="1em" className="notion-icon-svg-wrapper-icon language-picker-menu-button-icon">
                <path d="m6.25 6.013.675 1.8h-1.35zm1.86 1.443c.777-1.022 1.896-1.762 3.28-2.147C10.576 3.534 8.76 2.5 6.25 2.5 2.778 2.5.625 4.475.625 7.656c0 1.622.563 2.928 1.572 3.819L.625 13.047l.469.703a5.6 5.6 0 0 0 3.378-1.134 7.8 7.8 0 0 0 1.778.197c.256 0 .503-.016.747-.035a7.7 7.7 0 0 1-.122-1.372c0-.853.134-1.634.381-2.344h-2.15l-.35.938H3.437l1.876-5h1.875zm5.64 4.206c.31-.28.575-.621.75-1.037h-1.497c.175.416.44.756.75 1.037zm4.053 3.563 1.572 1.572-.469.703a5.6 5.6 0 0 1-3.378-1.134 7.8 7.8 0 0 1-1.778.197c-3.472 0-5.625-1.975-5.625-5.157S10.278 6.25 13.75 6.25s5.625 1.975 5.625 5.156c0 1.622-.562 2.928-1.572 3.819m-1.24-5.85h-2.188v-.937h-1.25v.937h-2.187v1.25h.778a4.4 4.4 0 0 0 1.006 1.725c-.863.425-1.681.544-1.681.544l.437 1.172a6.3 6.3 0 0 0 2.269-.87 6.3 6.3 0 0 0 2.269.87l.437-1.172s-.819-.119-1.681-.544a4.3 4.3 0 0 0 1.006-1.725h.778v-1.25z" fill="currentColor" />
              </svg>
              English (US)
            </span>
            <svg aria-hidden="true" role="graphics-symbol" viewBox="0 0 20 20" style={{ width: "1em", height: "auto", display: "inline-block", fill: "inherit", flexShrink: "0", verticalAlign: "middle" } as CSSProperties} className="arrowChevronSingleDown menu-button-menu-marker-icon">
              <path d="M9.558 13.442c.244.244.64.244.884 0l5.4-5.4a.625.625 0 0 0-.884-.884L10 12.116 5.042 7.158a.625.625 0 1 0-.884.884z" />
            </svg>
          </button>
          <div id=":Radsbm:" role="dialog" aria-label="Change Language" popover="auto" data-position="top-start" className="popover-popover">
            <div aria-hidden="true" className="popover-popover-shield" />
            <div className="popover-popover-inner language-picker-popover">
              <span id=":RadsbmH3:" role="status" aria-live="polite" className="visually-hidden-visually-hidden" />
              <div className="flex flex-col items-stretch justify-start flex-nowrap inline-full gap-8">
                <div className="pt-16 ps-16 pe-16">
                  <div style={{ "--before-width": "0rem", "--after-width": "0rem" } as CSSProperties} className="input-root input-size-medium input-has-before">
                    <span className="input-before">
                      <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="1em" className="notion-icon-svg-wrapper-icon language-picker-search-icon">
                        <path d="M13.963 12.194A6.248 6.248 0 0 0 8.75 2.5a6.25 6.25 0 0 0-6.251 6.25 6.248 6.248 0 0 0 9.694 5.213L15.73 17.5l1.769-1.769zm-5.213.931a4.376 4.376 0 1 1 .002-8.752 4.376 4.376 0 0 1-.002 8.752" fill="currentColor" />
                      </svg>
                    </span>
                    <input id=":RadsbmH1:" type="search" role="combobox" autoComplete="off" aria-label="Search languages" aria-expanded="true" aria-controls=":RadsbmH2:" aria-activedescendant=":RadsbmH2:-item-en-us" aria-autocomplete="list" aria-describedby=":RadsbmH3:" placeholder="Search" readOnly className="input-input language-picker-search-input" value="" />
                  </div>
                </div>
                <div className="scroll-container-scroll-container scroll-container-vertical language-picker-results" style={{ maskImage: "linear-gradient(to bottom, black 0%, black var(--gradient-scroll-size, var(--dimension-spacing-32)), black calc(100% - var(--gradient-scroll-size, var(--dimension-spacing-32))), transparent 100%)" } as CSSProperties}>
                  <div className="pt-4 pb-12 ps-12 pe-12">
                    <ul id=":RadsbmH2:" role="listbox" aria-label="Languages" className="flex flex-col items-stretch justify-start flex-nowrap inline-full gap-0 ps-0 mt-0 mb-0 menu-list-menu-list">
                      <li className="menu-list-menu-list-item">
                        <a role="option" id=":RadsbmH2:-item-en-us" aria-selected="true" aria-current="true" data-locale="en-US" className="inline-full menu-list-menu-list-item-anchor menu-list-variant-primary menu-list-highlighted" href="/en-US">
                          <span className="semantic-typography-semantic-typography semantic-typography-variant-interaction-menu-list-item-label menu-list-label">English (US)</span>
                        </a>
                      </li>
                      <li className="menu-list-menu-list-item">
                        <a role="option" id=":RadsbmH2:-item-id-id" aria-selected="false" data-locale="id-ID" className="inline-full menu-list-menu-list-item-anchor menu-list-variant-primary" href="/id">
                          <span className="semantic-typography-semantic-typography semantic-typography-variant-interaction-menu-list-item-label menu-list-label">Bahasa Indonesia</span>
                        </a>
                      </li>
                      <li className="menu-list-menu-list-item">
                        <a role="option" id=":RadsbmH2:-item-da-dk" aria-selected="false" data-locale="da-DK" className="inline-full menu-list-menu-list-item-anchor menu-list-variant-primary" href="/da">
                          <span className="semantic-typography-semantic-typography semantic-typography-variant-interaction-menu-list-item-label menu-list-label">Dansk</span>
                        </a>
                      </li>
                      <li className="menu-list-menu-list-item">
                        <a role="option" id=":RadsbmH2:-item-de-de" aria-selected="false" data-locale="de-DE" className="inline-full menu-list-menu-list-item-anchor menu-list-variant-primary" href="/de">
                          <span className="semantic-typography-semantic-typography semantic-typography-variant-interaction-menu-list-item-label menu-list-label">Deutsch</span>
                        </a>
                      </li>
                      <li className="menu-list-menu-list-item">
                        <a role="option" id=":RadsbmH2:-item-en-gb" aria-selected="false" data-locale="en-GB" className="inline-full menu-list-menu-list-item-anchor menu-list-variant-primary" href="/en-GB">
                          <span className="semantic-typography-semantic-typography semantic-typography-variant-interaction-menu-list-item-label menu-list-label">English (UK)</span>
                        </a>
                      </li>
                      <li className="menu-list-menu-list-item">
                        <a role="option" id=":RadsbmH2:-item-es-es" aria-selected="false" data-locale="es-ES" className="inline-full menu-list-menu-list-item-anchor menu-list-variant-primary" href="/es-ES">
                          <span className="semantic-typography-semantic-typography semantic-typography-variant-interaction-menu-list-item-label menu-list-label">Español (España)</span>
                        </a>
                      </li>
                      <li className="menu-list-menu-list-item">
                        <a role="option" id=":RadsbmH2:-item-es-la" aria-selected="false" data-locale="es-LA" className="inline-full menu-list-menu-list-item-anchor menu-list-variant-primary" href="/es">
                          <span className="semantic-typography-semantic-typography semantic-typography-variant-interaction-menu-list-item-label menu-list-label">Español (Latinoamérica)</span>
                        </a>
                      </li>
                      <li className="menu-list-menu-list-item">
                        <a role="option" id=":RadsbmH2:-item-fr-fr" aria-selected="false" data-locale="fr-FR" className="inline-full menu-list-menu-list-item-anchor menu-list-variant-primary" href="/fr">
                          <span className="semantic-typography-semantic-typography semantic-typography-variant-interaction-menu-list-item-label menu-list-label">Français (France)</span>
                        </a>
                      </li>
                      <li className="menu-list-menu-list-item">
                        <a role="option" id=":RadsbmH2:-item-it-it" aria-selected="false" data-locale="it-IT" className="inline-full menu-list-menu-list-item-anchor menu-list-variant-primary" href="/it">
                          <span className="semantic-typography-semantic-typography semantic-typography-variant-interaction-menu-list-item-label menu-list-label">Italiano</span>
                        </a>
                      </li>
                      <li className="menu-list-menu-list-item">
                        <a role="option" id=":RadsbmH2:-item-nl-nl" aria-selected="false" data-locale="nl-NL" className="inline-full menu-list-menu-list-item-anchor menu-list-variant-primary" href="/nl">
                          <span className="semantic-typography-semantic-typography semantic-typography-variant-interaction-menu-list-item-label menu-list-label">Nederlands</span>
                        </a>
                      </li>
                      <li className="menu-list-menu-list-item">
                        <a role="option" id=":RadsbmH2:-item-nb-no" aria-selected="false" data-locale="nb-NO" className="inline-full menu-list-menu-list-item-anchor menu-list-variant-primary" href="/nb">
                          <span className="semantic-typography-semantic-typography semantic-typography-variant-interaction-menu-list-item-label menu-list-label">Norsk</span>
                        </a>
                      </li>
                      <li className="menu-list-menu-list-item">
                        <a role="option" id=":RadsbmH2:-item-pt-br" aria-selected="false" data-locale="pt-BR" className="inline-full menu-list-menu-list-item-anchor menu-list-variant-primary" href="/pt">
                          <span className="semantic-typography-semantic-typography semantic-typography-variant-interaction-menu-list-item-label menu-list-label">Português (Brasil)</span>
                        </a>
                      </li>
                      <li className="menu-list-menu-list-item">
                        <a role="option" id=":RadsbmH2:-item-fi-fi" aria-selected="false" data-locale="fi-FI" className="inline-full menu-list-menu-list-item-anchor menu-list-variant-primary" href="/fi">
                          <span className="semantic-typography-semantic-typography semantic-typography-variant-interaction-menu-list-item-label menu-list-label">Suomi</span>
                        </a>
                      </li>
                      <li className="menu-list-menu-list-item">
                        <a role="option" id=":RadsbmH2:-item-sv-se" aria-selected="false" data-locale="sv-SE" className="inline-full menu-list-menu-list-item-anchor menu-list-variant-primary" href="/sv">
                          <span className="semantic-typography-semantic-typography semantic-typography-variant-interaction-menu-list-item-label menu-list-label">Svenska</span>
                        </a>
                      </li>
                      <li className="menu-list-menu-list-item">
                        <a role="option" id=":RadsbmH2:-item-vi-vn" aria-selected="false" data-locale="vi-VN" className="inline-full menu-list-menu-list-item-anchor menu-list-variant-primary" href="/vi">
                          <span className="semantic-typography-semantic-typography semantic-typography-variant-interaction-menu-list-item-label menu-list-label">Tiếng Việt</span>
                        </a>
                      </li>
                      <li className="menu-list-menu-list-item">
                        <a role="option" id=":RadsbmH2:-item-he-il" aria-selected="false" data-locale="he-IL" className="inline-full menu-list-menu-list-item-anchor menu-list-variant-primary" href="/he">
                          <span className="semantic-typography-semantic-typography semantic-typography-variant-interaction-menu-list-item-label menu-list-label">עברית</span>
                        </a>
                      </li>
                      <li className="menu-list-menu-list-item">
                        <a role="option" id=":RadsbmH2:-item-ar-sa" aria-selected="false" data-locale="ar-SA" className="inline-full menu-list-menu-list-item-anchor menu-list-variant-primary" href="/ar">
                          <span className="semantic-typography-semantic-typography semantic-typography-variant-interaction-menu-list-item-label menu-list-label">العربية</span>
                        </a>
                      </li>
                      <li className="menu-list-menu-list-item">
                        <a role="option" id=":RadsbmH2:-item-th-th" aria-selected="false" data-locale="th-TH" className="inline-full menu-list-menu-list-item-anchor menu-list-variant-primary" href="/th">
                          <span className="semantic-typography-semantic-typography semantic-typography-variant-interaction-menu-list-item-label menu-list-label">ภาษาไทย</span>
                        </a>
                      </li>
                      <li className="menu-list-menu-list-item">
                        <a role="option" id=":RadsbmH2:-item-ko-kr" aria-selected="false" data-locale="ko-KR" className="inline-full menu-list-menu-list-item-anchor menu-list-variant-primary" href="/ko">
                          <span className="semantic-typography-semantic-typography semantic-typography-variant-interaction-menu-list-item-label menu-list-label">한국어</span>
                        </a>
                      </li>
                      <li className="menu-list-menu-list-item">
                        <a role="option" id=":RadsbmH2:-item-ja-jp" aria-selected="false" data-locale="ja-JP" className="inline-full menu-list-menu-list-item-anchor menu-list-variant-primary" href="/ja">
                          <span className="semantic-typography-semantic-typography semantic-typography-variant-interaction-menu-list-item-label menu-list-label">日本語</span>
                        </a>
                      </li>
                      <li className="menu-list-menu-list-item">
                        <a role="option" id=":RadsbmH2:-item-zh-cn" aria-selected="false" data-locale="zh-CN" className="inline-full menu-list-menu-list-item-anchor menu-list-variant-primary" href="/zh-CN">
                          <span className="semantic-typography-semantic-typography semantic-typography-variant-interaction-menu-list-item-label menu-list-label">简体中文</span>
                        </a>
                      </li>
                      <li className="menu-list-menu-list-item">
                        <a role="option" id=":RadsbmH2:-item-zh-tw" aria-selected="false" data-locale="zh-TW" className="inline-full menu-list-menu-list-item-anchor menu-list-variant-primary" href="/zh-TW">
                          <span className="semantic-typography-semantic-typography semantic-typography-variant-interaction-menu-list-item-label menu-list-label">繁體中文</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="semantic-typography-semantic-typography semantic-typography-variant-global-context footer-minimal-links">
            <button type="button" data-analytics-name="footer_nav_item" data-analytics-event="click_link" className="semantic-typography-semantic-typography link-text-link-text link-text-color-variant-primary">
              <span className="link-text-link-content">Cookie settings</span>
            </button>
            <a href="https://www.notion.so/28ffdd083dc3473e9c2da6ec011b58ac" data-analytics-name="footer_nav_item" data-analytics-event="click_link" className="semantic-typography-semantic-typography link-text-link-text link-text-color-variant-primary">
              <span className="link-text-link-content">Terms &amp; privacy</span>
            </a>
            <a href="https://www.notion.com/trust/privacy-policy#california" data-analytics-name="footer_nav_item" data-analytics-event="click_link" className="semantic-typography-semantic-typography link-text-link-text link-text-color-variant-primary">
              <span className="link-text-link-content">Your privacy rights</span>
            </a>
          </div>
        </div>
        <div className="footer-minimal-dynamic-content">
          <div className="flex flex-col items-start md:items-center justify-start flex-nowrap inline-full gap-16">
            <div className="flex flex-row items-center justify-start flex-nowrap inline-auto max-inline-full gap-0">
              <CommandCopy command="curl -fsSL https://ntn.dev | bash" analyticsName="dev_platform_cli_copy_button" analyticsContext="endcap" />
            </div>
            <span className="semantic-typography-semantic-typography semantic-typography-variant-global-context dev-cli-callout-text-responsive">
              Start building on the Notion CLI or{" "}
              <a href="https://developers.notion.com/cli/get-started/overview" className="inline-text-link-inline-link inline-text-link-color-inherit" target="_self" data-analytics-name="dev_platform_read_docs" data-analytics-event="click_link" data-analytics-context="endcap">
                <span className="inline-text-link-link-content">read our docs</span>
              </a>
            </span>
          </div>
        </div>
        <span className="semantic-typography-semantic-typography semantic-typography-variant-global-context footer-minimal-copyright">© 2026 Notion Labs, Inc.</span>
      </div>
      <div className="footer-minimal-bottom-content">
        <div className="dev-footer-game-section" data-analytics-scroll-point="true" data-analytics-name="DevPlatformGame">
          <FooterGame />
        </div>
      </div>
    </footer>
  );
}

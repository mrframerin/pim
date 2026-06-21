/* eslint-disable @next/next/no-img-element */
import type { CSSProperties } from "react";
import home from "@/modules/home/content/home.json";

const c = home.externalAgents;

// The 4 cards are heterogeneous — 3 image cards + 1 terminal card — so the JSON
// infers a loose union. Type them as a tuple for precise positional access.
type ImageCard = { title: string; body: string; image: { alt: string; src: string } };
type TerminalCard = { title: string; body: string; terminal: { ariaLabel: string; html: string } };
const cards = c.cards as unknown as [ImageCard, ImageCard, ImageCard, TerminalCard];

/** External agents section — "Bring your favorite agents into Notion." */
export default function ExternalAgentsSectionReal() {
  return (
    <section className="section-section section-collapsible" id="externalAgents" data-analytics-scroll-point="true" data-analytics-name="DevPlatformExternalAgents">
      <div className="section-header-header section-header-align-start">
        <div className="section-header-content">
          <span className="section-header-eyebrow">
            <div className="surface surfaceBase surface-surface-base">
              <span className="badge-badge badge-badge-light">{c.eyebrow}</span>
            </div>
          </span>
          <h2 className="section-header-heading">{c.heading}</h2>
          <p className="section-header-subheading">{c.subheading}</p>
          <div className="section-header-ctas">
            <a href={c.cta.href} data-analytics-name="dev_platform_external_agents_join_waitlist" data-analytics-event="click_link" className="semantic-typography-semantic-typography link-text-link-text link-text-color-variant-primary link-text-has-arrow">
              <span className="link-text-link-content">{c.cta.label}</span>
              <span aria-hidden="true" className="arrow-arrow-2 arrow-arrow-flip-rtl">{c.cta.arrow}</span>
            </a>
          </div>
        </div>
        <div className="dev-external-agent-tabs" aria-hidden="true">
          <div className="icons-tab-list dev-external-agent-tab-colors">
            <div className="icons-tab" style={{ zIndex: "1" } as CSSProperties}>
              <svg className="icons-tab-bg-plate" width="86" height="86" viewBox="0 0 86 86" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M54.0234 1.5V3.02344H62.4043V6.07129H67.7383V9.11914H70.7861V12.167H73.833V15.2139H76.8809V18.2617H79.9287V23.5957H82.9766V31.9766H84.5V54.0234H82.9766V62.4043H79.9287V67.7383H76.8809V70.7861H73.833V73.833H70.7861V76.8809H67.7383V79.9287H62.4043V82.9766H54.0234V84.5H31.9766V82.9766H23.5957V79.9287H18.2617V76.8809H15.2139V73.833H12.167V70.7861H9.11914V67.7383H6.07129V62.4043H3.02344V54.0234H1.5V31.9766H3.02344V23.5957H6.07129V18.2617H9.11914V15.2139H12.167V12.167H15.2139V9.11914H18.2617V6.07129H23.5957V3.02344H31.9766V1.5H54.0234Z" fill="currentColor" stroke="var(--plate-stroke, currentColor)" strokeWidth="3" />
              </svg>
              <img src={c.tabIcons[0]} alt="" width="40" height="40" className="icons-tab-icon" />
            </div>
            <div className="icons-tab" style={{ zIndex: "2" } as CSSProperties}>
              <svg className="icons-tab-bg-plate" width="86" height="86" viewBox="0 0 86 86" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M54.0234 1.5V3.02344H62.4043V6.07129H67.7383V9.11914H70.7861V12.167H73.833V15.2139H76.8809V18.2617H79.9287V23.5957H82.9766V31.9766H84.5V54.0234H82.9766V62.4043H79.9287V67.7383H76.8809V70.7861H73.833V73.833H70.7861V76.8809H67.7383V79.9287H62.4043V82.9766H54.0234V84.5H31.9766V82.9766H23.5957V79.9287H18.2617V76.8809H15.2139V73.833H12.167V70.7861H9.11914V67.7383H6.07129V62.4043H3.02344V54.0234H1.5V31.9766H3.02344V23.5957H6.07129V18.2617H9.11914V15.2139H12.167V12.167H15.2139V9.11914H18.2617V6.07129H23.5957V3.02344H31.9766V1.5H54.0234Z" fill="currentColor" stroke="var(--plate-stroke, currentColor)" strokeWidth="3" />
              </svg>
              <img src={c.tabIcons[1]} alt="" width="40" height="40" className="icons-tab-icon" />
            </div>
            <div className="icons-tab" style={{ zIndex: "3" } as CSSProperties}>
              <svg className="icons-tab-bg-plate" width="86" height="86" viewBox="0 0 86 86" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M54.0234 1.5V3.02344H62.4043V6.07129H67.7383V9.11914H70.7861V12.167H73.833V15.2139H76.8809V18.2617H79.9287V23.5957H82.9766V31.9766H84.5V54.0234H82.9766V62.4043H79.9287V67.7383H76.8809V70.7861H73.833V73.833H70.7861V76.8809H67.7383V79.9287H62.4043V82.9766H54.0234V84.5H31.9766V82.9766H23.5957V79.9287H18.2617V76.8809H15.2139V73.833H12.167V70.7861H9.11914V67.7383H6.07129V62.4043H3.02344V54.0234H1.5V31.9766H3.02344V23.5957H6.07129V18.2617H9.11914V15.2139H12.167V12.167H15.2139V9.11914H18.2617V6.07129H23.5957V3.02344H31.9766V1.5H54.0234Z" fill="currentColor" stroke="var(--plate-stroke, currentColor)" strokeWidth="3" />
              </svg>
              <img src={c.tabIcons[2]} alt="" width="40" height="40" className="icons-tab-icon" />
            </div>
            <div className="icons-tab" style={{ zIndex: "4" } as CSSProperties}>
              <svg className="icons-tab-bg-plate" width="86" height="86" viewBox="0 0 86 86" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M54.0234 1.5V3.02344H62.4043V6.07129H67.7383V9.11914H70.7861V12.167H73.833V15.2139H76.8809V18.2617H79.9287V23.5957H82.9766V31.9766H84.5V54.0234H82.9766V62.4043H79.9287V67.7383H76.8809V70.7861H73.833V73.833H70.7861V76.8809H67.7383V79.9287H62.4043V82.9766H54.0234V84.5H31.9766V82.9766H23.5957V79.9287H18.2617V76.8809H15.2139V73.833H12.167V70.7861H9.11914V67.7383H6.07129V62.4043H3.02344V54.0234H1.5V31.9766H3.02344V23.5957H6.07129V18.2617H9.11914V15.2139H12.167V12.167H15.2139V9.11914H18.2617V6.07129H23.5957V3.02344H31.9766V1.5H54.0234Z" fill="currentColor" stroke="var(--plate-stroke, currentColor)" strokeWidth="3" />
              </svg>
              <img src={c.tabIcons[3]} alt="" width="40" height="40" className="icons-tab-icon" />
            </div>
            <div className="icons-tab" style={{ zIndex: "5" } as CSSProperties}>
              <svg className="icons-tab-bg-plate" width="86" height="86" viewBox="0 0 86 86" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M54.0234 1.5V3.02344H62.4043V6.07129H67.7383V9.11914H70.7861V12.167H73.833V15.2139H76.8809V18.2617H79.9287V23.5957H82.9766V31.9766H84.5V54.0234H82.9766V62.4043H79.9287V67.7383H76.8809V70.7861H73.833V73.833H70.7861V76.8809H67.7383V79.9287H62.4043V82.9766H54.0234V84.5H31.9766V82.9766H23.5957V79.9287H18.2617V76.8809H15.2139V73.833H12.167V70.7861H9.11914V67.7383H6.07129V62.4043H3.02344V54.0234H1.5V31.9766H3.02344V23.5957H6.07129V18.2617H9.11914V15.2139H12.167V12.167H15.2139V9.11914H18.2617V6.07129H23.5957V3.02344H31.9766V1.5H54.0234Z" fill="currentColor" stroke="var(--plate-stroke, currentColor)" strokeWidth="3" />
              </svg>
              <img src={c.tabIcons[4]} alt="" width="40" height="40" className="icons-tab-icon" />
            </div>
          </div>
        </div>
      </div>
      <div className="dev-external-agent-cards">
        <article className="surface surfaceBase surface-surface-base block-block block-block-is-surface-base">
          <div className="block-block-stack">
            <div className="block-block-content">
              <h3 className="semantic-typography-semantic-typography semantic-typography-variant-card-title-block">{cards[0].title}</h3>
              <p className="semantic-typography-semantic-typography semantic-typography-variant-card-body">{cards[0].body}</p>
            </div>
            <div className="block-block-media block-media-placement-right">
              <img alt={cards[0].image.alt} loading="lazy" width="1077" height="717" decoding="async" data-nimg="1" className="next-image" style={{ color: "transparent" } as CSSProperties} srcSet={`${cards[0].image.src} 1x, ${cards[0].image.src} 2x`} src={cards[0].image.src} />
            </div>
          </div>
        </article>
        <article className="surface surfaceBase surface-surface-base block-block block-block-is-surface-base">
          <div className="block-block-stack">
            <div className="block-block-content">
              <h3 className="semantic-typography-semantic-typography semantic-typography-variant-card-title-block">{cards[1].title}</h3>
              <p className="semantic-typography-semantic-typography semantic-typography-variant-card-body">{cards[1].body}</p>
            </div>
            <div className="block-block-media block-media-placement-right">
              <img alt={cards[1].image.alt} loading="lazy" width="1077" height="717" decoding="async" data-nimg="1" className="next-image" style={{ color: "transparent" } as CSSProperties} srcSet={`${cards[1].image.src} 1x, ${cards[1].image.src} 2x`} src={cards[1].image.src} />
            </div>
          </div>
        </article>
        <article className="surface surfaceBase surface-surface-base block-block block-block-is-surface-base">
          <div className="block-block-stack">
            <div className="block-block-content">
              <h3 className="semantic-typography-semantic-typography semantic-typography-variant-card-title-block">{cards[2].title}</h3>
              <p className="semantic-typography-semantic-typography semantic-typography-variant-card-body">{cards[2].body}</p>
            </div>
            <div className="block-block-media block-media-placement-right">
              <img alt={cards[2].image.alt} loading="lazy" width="1077" height="717" decoding="async" data-nimg="1" className="next-image" style={{ color: "transparent" } as CSSProperties} srcSet={`${cards[2].image.src} 1x, ${cards[2].image.src} 2x`} src={cards[2].image.src} />
            </div>
          </div>
        </article>
        <article className="surface surfaceBase surface-surface-base block-block block-block-is-surface-base dev-card-byo-agent">
          <div className="block-block-stack block-direction-row">
            <div className="block-block-content">
              <h3 className="semantic-typography-semantic-typography semantic-typography-variant-card-title-block">{cards[3].title}</h3>
              <p className="semantic-typography-semantic-typography semantic-typography-variant-card-body">{cards[3].body}</p>
            </div>
            <div className="block-block-media block-media-placement-right">
              <div role="img" aria-label={cards[3].terminal.ariaLabel} className="terminal-asset-terminal-asset">
                <div aria-hidden="true">
                  <pre className="semantic-typography-semantic-typography semantic-typography-variant-global-code terminal-rich-text-terminal-rich-text" dangerouslySetInnerHTML={{ __html: cards[3].terminal.html }} />
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

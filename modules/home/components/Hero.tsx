"use client";

import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import home from "@/modules/home/content/home.json";

const c = home.hero;

const HERO_BASE = c.heroBase;

/** Cross-fades through a list of status lines on an interval (matches the
 *  original ~1.8s-per-step cycling). Pauses under prefers-reduced-motion. */
function useStatusCycle(messages: string[], stepMs = 1800, startDelay = 0) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    let interval: ReturnType<typeof setInterval>;
    const fade = setTimeout(() => {
      interval = setInterval(() => {
        setVisible(false);
        setTimeout(() => {
          setIndex((i) => (i + 1) % messages.length);
          setVisible(true);
        }, 250);
      }, stepMs);
    }, startDelay);
    return () => {
      clearTimeout(fade);
      clearInterval(interval);
    };
  }, [messages.length, stepMs, startDelay]);

  return { text: messages[index], visible };
}

/** One floating tool card overlaid on the hero image. */
function DevTool({
  className,
  icon,
  title,
  messages,
  startDelay = 0
}: {
  className: string;
  icon: string;
  title: string;
  messages: string[];
  startDelay?: number;
}) {
  const { text, visible } = useStatusCycle(messages, 1800, startDelay);
  return (
    <div className={`devHeroAsset_heroDevTool__X9wt8 ${className}`}>
      <div className="devTool_devTool__HQ8Uz">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          loading="lazy"
          width={42}
          height={42}
          decoding="async"
          className="next-image devHeroAsset_devToolIcon__Mw79x"
          src={icon}
          style={{ color: "transparent" }}
        />
        <span className="semanticTypography_semanticTypography__mWJkv semanticTypography_variantGlobalCode__nyDlV devTool_devToolTitle__71cm0">
          {title}
        </span>
        <span
          data-visible={visible ? "true" : "false"}
          style={{ opacity: visible ? 1 : 0 }}
          className="semanticTypography_semanticTypography__mWJkv semanticTypography_variantGlobalCode__nyDlV devTool_devToolDescription__317o1 devTool_devToolDescriptionAnimated__Ow_5i"
        >
          <span className="shimmerText_shimmerText___M45a">{text}</span>
        </span>
      </div>
    </div>
  );
}

export default function Hero() {
  const [copied, setCopied] = useState(false);
  const command = c.command;

  const copy = () => {
    navigator.clipboard?.writeText(command).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <div
      className="base_theme__K5IIh dark_palette_theme__mc9Q9 devPlatform_palette_theme__rni97 devPlatform_dark_palette_theme__i1hf_ theme_theme__XHAvb"
      style={{ display: "contents" }}
    >
      <section
        className="surface surfaceBase surface_surfaceBase__UD3lo section_section__ppkch section_bgBase__J7mP8 section_hasBackground__xdoXy isDevPlatformHero dev_heroBleed__1su2e"
        style={{ "--section-paint": "var(--color-background-base)" } as CSSProperties}
      >
        <header className="surface hero_container__aJcVj">
          <div className="hero_hero__B6z_N">
            <h1 className="semanticTypography_semanticTypography__mWJkv semanticTypography_variantGlobalTitle__D1p6b">
              {c.title}
            </h1>
            <p className="semanticTypography_semanticTypography__mWJkv semanticTypography_variantGlobalDeck__VQb79 hero_description__6vjku">
              {c.description}
            </p>
            <div className="flex flex-col items-center justify-start flex-nowrap inline-full gap-16">
              <div className="flex flex-row items-center justify-start flex-nowrap inline-auto max-inline-full gap-0">
                <div className="pt-8 pb-8 ps-16 pe-48 surface surfaceAccent surface_surfaceAccent___PDKt commandCTA_commandContainer__AZ6SG">
                  <div className="commandCTA_commandMask__GCTUb commandCTA_isOverflowing__2oZdo">
                    <input
                      type="text"
                      readOnly
                      aria-label="Install command"
                      spellCheck={false}
                      autoComplete="off"
                      className="commandCTA_command__sAhle"
                      value={command}
                    />
                  </div>
                  <button
                    title={copied ? "Copied!" : "Copy to clipboard"}
                    type="button"
                    aria-label="Copy to clipboard"
                    onClick={copy}
                    className="iconButton_iconButton__wbWve iconButton_backgroundSizeFill__CK2pT commandCTA_copyButton__mgYzA"
                  >
                    <span aria-hidden="true" className="iconButton_icon__sgIFz">
                      <span
                        className="graphic_graphic__jmWdv commandCTA_clipboardIcon__7Rlnz"
                        style={
                          {
                            "--graphic-icon-size": "var(--dimension-spacing-20)"
                          } as CSSProperties
                        }
                      >
                        <svg
                          aria-hidden="true"
                          role="graphics-symbol"
                          viewBox="0 0 20 20"
                          className="clipboard"
                          style={{
                            width: "100%",
                            height: "100%",
                            display: "block",
                            fill: "inherit",
                            flexShrink: 0
                          }}
                        >
                          <path d="M11.5 1.5c.768 0 1.41.534 1.58 1.25h.67c1.174 0 2.125.951 2.125 2.125v10.5A2.125 2.125 0 0 1 13.75 17.5h-7.5a2.125 2.125 0 0 1-2.125-2.125v-10.5c0-1.174.951-2.125 2.125-2.125h.67c.17-.716.812-1.25 1.58-1.25zM6.25 4a.875.875 0 0 0-.875.875v10.5c0 .483.392.875.875.875h7.5a.875.875 0 0 0 .875-.875v-10.5A.875.875 0 0 0 13.75 4h-.67a1.626 1.626 0 0 1-1.58 1.25h-3c-.768 0-1.41-.534-1.58-1.25zM8.5 2.75a.375.375 0 0 0-.375.375v.5c0 .207.168.375.375.375h3a.375.375 0 0 0 .375-.375v-.5a.375.375 0 0 0-.375-.375z" />
                        </svg>
                      </span>
                    </span>
                    <span aria-hidden="true" className="iconButton_focusRing__a1thx" />
                  </button>
                </div>
              </div>
              <span className="semanticTypography_semanticTypography__mWJkv semanticTypography_variantGlobalContext__VDlwW dev_cliCalloutTextCenter__7onaX">
                {c.cliCallout.text}{" "}
                <a
                  href={c.cliCallout.docsHref}
                  className="InlineTextLink_inlineLink__oN8YM InlineTextLink_colorInherit__oGlTG"
                  target="_self"
                >
                  <span className="InlineTextLink_linkContent__SYI4r">{c.cliCallout.docsLabel}</span>
                </a>
              </span>
            </div>
          </div>
        </header>

        <div
          role="img"
          aria-label="A database UI fading into a blueprint-themed UI, with terminal logs for syncs, agent tools, and external agents overlaid on top."
          className="devHeroAsset_devHeroAsset__ToSMR"
        >
          <picture className="devHeroAsset_figure__CKBvi">
            {/*
              Responsive hero screenshot, matching the original:
              desktop = wide ui.webp, tablet = ui-tablet, mobile = ui-mobile2.
            */}
            <source media="(min-width: 1080px)" srcSet={`${HERO_BASE}${c.images.uiDesktop}`} />
            <source media="(min-width: 768px)" srcSet={`${HERO_BASE}${c.images.uiTablet}`} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              fetchPriority="high"
              width={1170}
              height={1755}
              decoding="async"
              className="next-image devHeroAsset_image__OE9F8"
              src={`${HERO_BASE}${c.images.uiMobile}`}
              style={{ color: "transparent" }}
            />
          </picture>

          <DevTool
            className="devHeroAsset_devToolWorkersZendeskSync__v4V4Y"
            icon={`${HERO_BASE}${c.devTools.zendeskSync.icon}`}
            title={c.devTools.zendeskSync.title}
            startDelay={0}
            messages={c.devTools.zendeskSync.messages}
          />
          <span className="devHeroAsset_vertex___Eliv devHeroAsset_zendeskVertex__JHOVr" />
          <span className="devHeroAsset_edge__q6N8g devHeroAsset_zendeskEdgeVertical__mSl_q" />
          <span className="devHeroAsset_edge__q6N8g devHeroAsset_zendeskEdgeHorizontal__xBpo3" />

          <DevTool
            className="devHeroAsset_devToolDataScoutAgentQueryTool__CpCog"
            icon={`${HERO_BASE}${c.devTools.dataScoutQuery.icon}`}
            title={c.devTools.dataScoutQuery.title}
            startDelay={600}
            messages={c.devTools.dataScoutQuery.messages}
          />
          <span className="devHeroAsset_vertex___Eliv devHeroAsset_dataScoutVertex__k3ql2" />
          <span className="devHeroAsset_edge__q6N8g devHeroAsset_dataScoutEdgeVertical__qIE1Y" />
          <span className="devHeroAsset_edge__q6N8g devHeroAsset_dataScoutEdgeHorizontal__ppTyA" />

          <DevTool
            className="devHeroAsset_devToolClaudeCode__oettv"
            icon={`${HERO_BASE}${c.devTools.claudeCode.icon}`}
            title={c.devTools.claudeCode.title}
            startDelay={1200}
            messages={c.devTools.claudeCode.messages}
          />
          <span className="devHeroAsset_vertex___Eliv devHeroAsset_claudeVertex__6v0dP" />
          <span className="devHeroAsset_edge__q6N8g devHeroAsset_claudeEdgeVertical__ELROi" />
          <span className="devHeroAsset_edge__q6N8g devHeroAsset_claudeEdgeHorizontal__MEi6p" />
        </div>

        <aside className="tickerVideo_tickerVideo__YVDH2 dev_keynoteTicker__UBHYM">
          <a
            target="_blank"
            href={c.keynote.href}
            rel="noopener noreferrer"
            aria-label={c.keynote.ariaLabel}
            className="tickerVideo_tickerVideoThumbnail__2yqLI dev_keynoteThumbnail___eRBd"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${HERO_BASE}${c.keynote.thumbnail}`}
              alt={c.keynote.thumbnailAlt}
              className="tickerVideo_tickerVideoThumbnailImage__Q8E2T"
              width={160}
              height={90}
              loading="lazy"
            />
            <div className="tickerVideo_tickerVideoThumbnailOverlay__Q7UP4" />
            <span className="tickerVideo_tickerVideoPlayButton__BfKjZ" aria-hidden="true">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                width="1em"
                className="NotionIconSvgWrapper_icon__8quiY"
              >
                <path d="M15.625 9.375v1.25l-10 5h-1.25V4.375h1.25z" fill="currentColor" />
              </svg>
            </span>
          </a>
          <span className="semanticTypography_semanticTypography__mWJkv semanticTypography_variantGlobalBody__yYPP0">
            <span>{c.keynote.caption}</span>{" "}
            <a
              href={c.keynote.href}
              target="_blank"
              rel="noopener noreferrer"
              className="semanticTypography_semanticTypography__mWJkv linkText_linkText__527kz linkText_colorVariantPrimary__h6Nef linkText_underlineAlways__lY7C_ linkText_hasArrow__2BwWV tickerCta_tickerCta__YNSSM"
            >
              <span className="linkText_linkContent__1nr8w">{c.keynote.linkLabel}</span>
              <span aria-hidden="true" className="arrow_arrow___6mKn arrow_arrowFlipRtl__ur0Ug">
                →
              </span>
            </a>
          </span>
        </aside>
      </section>
    </div>
  );
}

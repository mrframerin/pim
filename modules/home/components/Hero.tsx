"use client";

import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import home from "@/modules/home/content/home.json";
import CommandCopy from "@/components/global/CommandCopy";

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
    <div className={`dev-hero-asset-hero-dev-tool ${className}`}>
      <div className="dev-tool-dev-tool">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          loading="lazy"
          width={42}
          height={42}
          decoding="async"
          className="next-image dev-hero-asset-dev-tool-icon"
          src={icon}
          style={{ color: "transparent" }}
        />
        <span className="semantic-typography-semantic-typography semantic-typography-variant-global-code dev-tool-dev-tool-title">
          {title}
        </span>
        <span
          data-visible={visible ? "true" : "false"}
          style={{ opacity: visible ? 1 : 0 }}
          className="semantic-typography-semantic-typography semantic-typography-variant-global-code dev-tool-dev-tool-description dev-tool-dev-tool-description-animated"
        >
          <span className="shimmer-text-shimmer-text">{text}</span>
        </span>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <div
      className="base-theme dark-palette-theme dev-platform-palette-theme dev-platform-dark-palette-theme theme-theme"
      style={{ display: "contents" }}
    >
      <section
        className="surface surfaceBase surface-surface-base section-section section-bg-base section-has-background isDevPlatformHero dev-hero-bleed"
        style={{ "--section-paint": "var(--color-background-base)" } as CSSProperties}
      >
        <header className="surface hero-container">
          <div className="hero-hero">
            <h1 className="semantic-typography-semantic-typography semantic-typography-variant-global-title">
              {c.title}
            </h1>
            <p className="semantic-typography-semantic-typography semantic-typography-variant-global-deck hero-description">
              {c.description}
            </p>
            <div className="flex flex-col items-center justify-start flex-nowrap inline-full gap-16">
              <div className="flex flex-row items-center justify-start flex-nowrap inline-auto max-inline-full gap-0">
                <CommandCopy command={c.command} />
              </div>
              <span className="semantic-typography-semantic-typography semantic-typography-variant-global-context dev-cli-callout-text-center">
                {c.cliCallout.text}{" "}
                <a
                  href={c.cliCallout.docsHref}
                  className="inline-text-link-inline-link inline-text-link-color-inherit"
                  target="_self"
                >
                  <span className="inline-text-link-link-content">{c.cliCallout.docsLabel}</span>
                </a>
              </span>
            </div>
          </div>
        </header>

        <div
          role="img"
          aria-label="A database UI fading into a blueprint-themed UI, with terminal logs for syncs, agent tools, and external agents overlaid on top."
          className="dev-hero-asset-dev-hero-asset"
        >
          <picture className="dev-hero-asset-figure">
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
              className="next-image dev-hero-asset-image"
              src={`${HERO_BASE}${c.images.uiMobile}`}
              style={{ color: "transparent" }}
            />
          </picture>

          <DevTool
            className="dev-hero-asset-dev-tool-workers-zendesk-sync"
            icon={`${HERO_BASE}${c.devTools.zendeskSync.icon}`}
            title={c.devTools.zendeskSync.title}
            startDelay={0}
            messages={c.devTools.zendeskSync.messages}
          />
          <span className="dev-hero-asset-vertex dev-hero-asset-zendesk-vertex" />
          <span className="dev-hero-asset-edge dev-hero-asset-zendesk-edge-vertical" />
          <span className="dev-hero-asset-edge dev-hero-asset-zendesk-edge-horizontal" />

          <DevTool
            className="dev-hero-asset-dev-tool-data-scout-agent-query-tool"
            icon={`${HERO_BASE}${c.devTools.dataScoutQuery.icon}`}
            title={c.devTools.dataScoutQuery.title}
            startDelay={600}
            messages={c.devTools.dataScoutQuery.messages}
          />
          <span className="dev-hero-asset-vertex dev-hero-asset-data-scout-vertex" />
          <span className="dev-hero-asset-edge dev-hero-asset-data-scout-edge-vertical" />
          <span className="dev-hero-asset-edge dev-hero-asset-data-scout-edge-horizontal" />

          <DevTool
            className="dev-hero-asset-dev-tool-claude-code"
            icon={`${HERO_BASE}${c.devTools.claudeCode.icon}`}
            title={c.devTools.claudeCode.title}
            startDelay={1200}
            messages={c.devTools.claudeCode.messages}
          />
          <span className="dev-hero-asset-vertex dev-hero-asset-claude-vertex" />
          <span className="dev-hero-asset-edge dev-hero-asset-claude-edge-vertical" />
          <span className="dev-hero-asset-edge dev-hero-asset-claude-edge-horizontal" />
        </div>

        <aside className="ticker-video-ticker-video dev-keynote-ticker">
          <a
            target="_blank"
            href={c.keynote.href}
            rel="noopener noreferrer"
            aria-label={c.keynote.ariaLabel}
            className="ticker-video-ticker-video-thumbnail dev-keynote-thumbnail"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${HERO_BASE}${c.keynote.thumbnail}`}
              alt={c.keynote.thumbnailAlt}
              className="ticker-video-ticker-video-thumbnail-image"
              width={160}
              height={90}
              loading="lazy"
            />
            <div className="ticker-video-ticker-video-thumbnail-overlay" />
            <span className="ticker-video-ticker-video-play-button" aria-hidden="true">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                width="1em"
                className="notion-icon-svg-wrapper-icon"
              >
                <path d="M15.625 9.375v1.25l-10 5h-1.25V4.375h1.25z" fill="currentColor" />
              </svg>
            </span>
          </a>
          <span className="semantic-typography-semantic-typography semantic-typography-variant-global-body">
            <span>{c.keynote.caption}</span>{" "}
            <a
              href={c.keynote.href}
              target="_blank"
              rel="noopener noreferrer"
              className="semantic-typography-semantic-typography link-text-link-text link-text-color-variant-primary link-text-underline-always link-text-has-arrow ticker-cta-ticker-cta"
            >
              <span className="link-text-link-content">{c.keynote.linkLabel}</span>
              <span aria-hidden="true" className="arrow-arrow-2 arrow-arrow-flip-rtl">
                →
              </span>
            </a>
          </span>
        </aside>
      </section>
    </div>
  );
}

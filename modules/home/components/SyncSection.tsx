"use client";

import { useEffect, useRef, useState } from "react";
import SyncDatabase from "@/modules/home/components/SyncDatabase";
import home from "@/modules/home/content/home.json";

const c = home.sync;

const TABS_BASE = c.tabsBase;

/** Source tabs (exact icons + labels + stacking order). */
const SOURCE_TABS = c.sourceTabs;

/** Shared "stickerized" background plate behind each source icon. */
const PLATE_PATH =
  "M54.0234 1.5V3.02344H62.4043V6.07129H67.7383V9.11914H70.7861V12.167H73.833V15.2139H76.8809V18.2617H79.9287V23.5957H82.9766V31.9766H84.5V54.0234H82.9766V62.4043H79.9287V67.7383H76.8809V70.7861H73.833V73.833H70.7861V76.8809H67.7383V79.9287H62.4043V82.9766H54.0234V84.5H31.9766V82.9766H23.5957V79.9287H18.2617V76.8809H15.2139V73.833H12.167V70.7861H9.11914V67.7383H6.07129V62.4043H3.02344V54.0234H1.5V31.9766H3.02344V23.5957H6.07129V18.2617H9.11914V15.2139H12.167V12.167H15.2139V9.11914H18.2617V6.07129H23.5957V3.02344H31.9766V1.5H54.0234Z";

/* The pre-highlighted TypeScript snippet (Prism token markup). Embedded as HTML
 * so the syntax highlighting stays exact rather than hand-retranscribed. */
const CODE_HTML = `<span class="token keyword">import</span> <span class="token punctuation">{</span> Worker <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"@notionhq/workers"</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> worker <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Worker</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> tickets <span class="token operator">=</span> worker<span class="token punctuation">.</span><span class="token function">database</span><span class="token punctuation">(</span><span class="token string">"tickets"</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  type<span class="token operator">:</span> <span class="token string">"managed"</span><span class="token punctuation">,</span>
  initialTitle<span class="token operator">:</span> <span class="token string">"Support Tickets"</span><span class="token punctuation">,</span>
  primaryKeyProperty<span class="token operator">:</span> <span class="token string">"Tickets"</span><span class="token punctuation">,</span>
  schema<span class="token operator">:</span> <span class="token punctuation">{</span> properties<span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token string-property property">"Tickets"</span><span class="token operator">:</span> Schema<span class="token punctuation">.</span><span class="token function">title</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token string-property property">"CSAT score"</span><span class="token operator">:</span> Schema<span class="token punctuation">.</span><span class="token function">select</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">{</span> name<span class="token operator">:</span> <span class="token string">"Very satisfied"</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token operator">...</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token string-property property">"Feature tags"</span><span class="token operator">:</span> Schema<span class="token punctuation">.</span><span class="token function">multiSelect</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">{</span> name<span class="token operator">:</span> <span class="token string">"Account access"</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token operator">...</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

worker<span class="token punctuation">.</span><span class="token function">sync</span><span class="token punctuation">(</span><span class="token string">"ticketsSync"</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  database<span class="token operator">:</span> tickets<span class="token punctuation">,</span>
  schedule<span class="token operator">:</span> <span class="token string">"5m"</span><span class="token punctuation">,</span>
  <span class="token function-variable function">execute</span><span class="token operator">:</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token punctuation">{</span>
    changes<span class="token operator">:</span> <span class="token punctuation">(</span><span class="token keyword">await</span> zendesk<span class="token punctuation">.</span>tickets<span class="token punctuation">.</span><span class="token function">list</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>t <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token punctuation">{</span>
      type<span class="token operator">:</span> <span class="token string">"upsert"</span> <span class="token keyword">as</span> <span class="token keyword">const</span><span class="token punctuation">,</span>
      key<span class="token operator">:</span> t<span class="token punctuation">.</span>id<span class="token punctuation">,</span>
      properties<span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token string-property property">"Tickets"</span><span class="token operator">:</span> Builder<span class="token punctuation">.</span><span class="token function">title</span><span class="token punctuation">(</span>t<span class="token punctuation">.</span>subject<span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token string-property property">"CSAT score"</span><span class="token operator">:</span> Builder<span class="token punctuation">.</span><span class="token function">select</span><span class="token punctuation">(</span>t<span class="token punctuation">.</span>csat<span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token string-property property">"Feature tags"</span><span class="token operator">:</span> Builder<span class="token punctuation">.</span><span class="token function">multiSelect</span><span class="token punctuation">(</span><span class="token operator">...</span>t<span class="token punctuation">.</span>tags<span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>`;

export default function SyncSection() {
  const [active, setActive] = useState(0);

  // Sync-demo timeline (offsets in ms from when the demo scrolls into view):
  // terminal text + phase + staggered DB row reveal.
  const demoRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<"intro" | "syncing" | "done">("intro");
  const [terminal, setTerminal] = useState(c.terminal.connecting);
  const [dbMounted, setDbMounted] = useState(false);
  const [revealed, setRevealed] = useState(0);

  useEffect(() => {
    const el = demoRef.current;
    if (!el) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setPhase("done");
      setTerminal(c.terminal.done);
      setDbMounted(true);
      setRevealed(6);
      return;
    }
    const timers: ReturnType<typeof setTimeout>[] = [];
    let started = false;
    const at = (ms: number, fn: () => void) => timers.push(setTimeout(fn, ms));
    const run = () => {
      if (started) return;
      started = true;
      at(680, () => setDbMounted(true));
      at(722, () => setRevealed(1));
      at(1227, () => { setPhase("syncing"); setRevealed(2); });
      at(1444, () => setTerminal(c.terminal.syncing));
      at(1695, () => setRevealed(3));
      at(2262, () => setRevealed(4));
      at(2600, () => setRevealed(5));
      at(2729, () => setRevealed(6));
      at(3206, () => setPhase("done"));
      at(3544, () => setTerminal(c.terminal.done));
    };
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { run(); io.disconnect(); } }),
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => { io.disconnect(); timers.forEach(clearTimeout); };
  }, []);

  return (
    <section
      className="section-section section-collapsible"
      id="sync"
      data-analytics-scroll-point="true"
      data-analytics-name="DevPlatformSync"
    >
      <div
        className="section-header-header section-header-align-start"
        id="connector-anchor-sync-subsection-header"
      >
        <div className="section-header-content">
          <h2 className="section-header-heading">{c.heading}</h2>
          <p className="section-header-subheading">{c.subheading}</p>
        </div>
      </div>

      <div className="flex flex-col items-stretch justify-start flex-nowrap inline-full gap-24">
        <div className="flex flex-row items-center justify-start flex-nowrap inline-full gap-16">
          <div role="tablist" className="icons-tab-list">
            {SOURCE_TABS.map((tab, i) => (
              <button
                key={tab.label}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-label={tab.label}
                onClick={() => setActive(i)}
                className={`icons-tab icons-interactive${
                  i === active ? " icons-active" : ""
                }`}
                style={{ zIndex: SOURCE_TABS.length - i }}
              >
                <svg
                  className="icons-tab-bg-plate"
                  width="86"
                  height="86"
                  viewBox="0 0 86 86"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d={PLATE_PATH}
                    fill="currentColor"
                    stroke="var(--plate-stroke, currentColor)"
                    strokeWidth="3"
                  />
                </svg>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${TABS_BASE}/${tab.icon}`}
                  alt=""
                  width={40}
                  height={40}
                  className="icons-tab-icon"
                />
              </button>
            ))}
          </div>
          <p>{c.andOthers}</p>
        </div>

        <div
          ref={demoRef}
          role="img"
          aria-label={c.demoAriaLabel}
          className="sync-demo-container"
          data-layout="stacked"
          data-phase={phase}
          id="connector-anchor-sync-demo"
        >
          <div aria-hidden="true" className="sync-demo-inner">
            <div className="surface surfaceBase surface-surface-base sync-demo-code-terminal">
              <div id="connector-anchor-database-terminal" className="code-terminal-example-container">
                <div className="flex flex-row items-center justify-between flex-nowrap inline-full gap-12 code-terminal-example-toolbar">
                  <span className="semantic-typography-semantic-typography semantic-typography-variant-global-code code-terminal-example-title">
                    {c.codeCard.filename}
                  </span>
                  <a
                    href={c.codeCard.exampleHref}
                    className="semantic-typography-semantic-typography semantic-typography-variant-interaction-button-small button-button-2 code-terminal-example-cta-button button-ghost button-small"
                  >
                    <span className="inline-flex flex-row items-center justify-start flex-nowrap inline-auto gap-4 code-terminal-example-cta">
                      <svg width="25" height="25" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          fill="currentColor"
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M17.5091 6.68311C11.4214 6.68311 6.5 11.6407 6.5 17.774C6.5 22.6767 9.65328 26.8266 14.0277 28.2955C14.5746 28.4059 14.775 28.0568 14.775 27.7632C14.775 27.5061 14.7569 26.6247 14.7569 25.7064C11.6945 26.3676 11.0567 24.3843 11.0567 24.3843C10.5646 23.099 9.83536 22.7686 9.83536 22.7686C8.83302 22.0892 9.90837 22.0892 9.90837 22.0892C11.0202 22.1626 11.6037 23.2276 11.6037 23.2276C12.5877 24.9168 14.1735 24.4395 14.8115 24.1457C14.9025 23.4295 15.1943 22.9338 15.5042 22.6584C13.0617 22.4013 10.4918 21.4465 10.4918 17.1863C10.4918 15.9744 10.929 14.9829 11.6217 14.2117C11.5124 13.9363 11.1295 12.7977 11.7312 11.2736C11.7312 11.2736 12.6608 10.9798 14.7567 12.4121C15.6541 12.1693 16.5795 12.0458 17.5091 12.0448C18.4387 12.0448 19.3862 12.1735 20.2613 12.4121C22.3574 10.9798 23.287 11.2736 23.287 11.2736C23.8887 12.7977 23.5056 13.9363 23.3963 14.2117C24.1073 14.9829 24.5264 15.9744 24.5264 17.1863C24.5264 21.4465 21.9565 22.3828 19.4958 22.6584C19.8969 23.0072 20.243 23.6682 20.243 24.7149C20.243 26.2022 20.225 27.3959 20.225 27.763C20.225 28.0568 20.4255 28.4059 20.9722 28.2957C25.3467 26.8264 28.5 22.6767 28.5 17.774C28.518 11.6407 23.5786 6.68311 17.5091 6.68311Z"
                        />
                      </svg>
                      {c.codeCard.exampleLabel}
                    </span>
                  </a>
                </div>
                <div className="code-terminal-example-code-snippet-wrapper code-terminal-example-is-overflowing">
                  <div className="code-terminal-example-code-snippet-scroll">
                    <pre
                      className="code-snippet-code-snippet code-terminal-example-code-snippet language-typescript"
                      tabIndex={0}
                      style={
                        {
                          "--code-snippet-white-space": "pre-wrap",
                          "--code-snippet-overflow": "hidden"
                        } as React.CSSProperties
                      }
                    >
                      <code
                        className="language-typescript"
                        dangerouslySetInnerHTML={{ __html: CODE_HTML }}
                      />
                    </pre>
                  </div>
                </div>
                <pre className="semantic-typography-semantic-typography semantic-typography-variant-global-code terminal-rich-text-terminal-rich-text code-terminal-example-terminal">
                  <code className="terminal-rich-text-code">
                    {c.terminal.header}{"\n"}
                    <small
                      className="sync-demo-terminal-line"
                      data-phase={phase}
                      data-visible="true"
                    >
                      <span className="shimmer-text-shimmer-text">{terminal}</span>
                    </small>
                  </code>
                </pre>
              </div>
            </div>
            <div
              id="connector-anchor-database-slot"
              className="notion-asset-notion-asset sync-demo-database-slot"
            >
              <div className="surface surfaceNeutral surface-surface-neutral sync-demo-database-surface">
                {dbMounted && <SyncDatabase revealed={revealed} />}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex dev-workers-subsection-spacer" />
    </section>
  );
}

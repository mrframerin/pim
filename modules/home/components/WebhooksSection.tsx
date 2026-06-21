/* eslint-disable @next/next/no-img-element */
import type { CSSProperties } from "react";
import home from "@/modules/home/content/home.json";

const c = home.webhooks;

const SLOT_BASE = c.slotBase;

type SlotCell = { icon: string; label: string };

const EVENTS: SlotCell[] = c.events;
const ACTIONS: SlotCell[] = c.actions;

// Reels are an exact repetition of the base events/actions (verified 1:1 with
// the original static markup): event reel = 5 events x 10, action reel = 10
// actions x 5 = 50 cells each. The originally-rendered active cell sits at
// index 25 in both reels. SlotMachine drives the live active state at runtime;
// these arrays just reproduce the initial server-rendered DOM exactly.
const EVENT_CELLS: SlotCell[] = Array.from({ length: c.eventRepeat }, () => EVENTS).flat();
const ACTION_CELLS: SlotCell[] = Array.from({ length: c.actionRepeat }, () => ACTIONS).flat();
const ACTIVE_INDEX = c.activeIndex;

const CELL_CLASS = "slot-machine-cell";
const CELL_ACTIVE_CLASS = "slot-machine-cell slot-machine-cell-active";

/** Webhooks section (#webhooks) — "Trigger Notion workflows from anywhere." */
export default function WebhooksSection() {
  return (
    <section className="section-section section-collapsible" id="webhooks" data-analytics-scroll-point="true" data-analytics-name="DevPlatformWebhooks">
      <div className="section-header-header section-header-align-start">
        <div className="section-header-content">
          <h2 className="section-header-heading">{c.heading}</h2>
          <p id="connector-anchor-webhooks-subsection-paragraph" className="section-header-subheading">{c.subheading}</p>
          <div className="section-header-ctas">
            <a href={c.ctaHref} data-analytics-name="dev_platform_webhooks_read_docs" data-analytics-event="click_link" className="semantic-typography-semantic-typography link-text-link-text link-text-color-variant-primary link-text-has-arrow">
              <span className="link-text-link-content">{c.ctaLabel}</span>
              <span aria-hidden="true" className="arrow-arrow-2 arrow-arrow-flip-rtl">→</span>
            </a>
          </div>
        </div>
      </div>
      <div role="img" aria-label={c.ariaLabel} className="surface surfaceBase surface-surface-base slot-machine-slot-machine">
        <div className="slot-machine-reel">
          <div className="slot-machine-reel-track" style={{ transform: "translateY(-2208px)", transition: "transform 600ms cubic-bezier(0.4, 0, 0.2, 1)" } as CSSProperties}>
            {EVENT_CELLS.map((cell, i) => (
              <div key={i} className={i === ACTIVE_INDEX ? CELL_ACTIVE_CLASS : CELL_CLASS}>
                <img src={`${SLOT_BASE}/${cell.icon}`} alt="" className="slot-machine-cell-icon" width="32" height="32" />
                <span className="semantic-typography-semantic-typography semantic-typography-variant-global-code slot-machine-cell-label">{cell.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="slot-machine-center">
          <div className="slot-machine-center-badge">
            <span className="slot-machine-center-arrow-line" aria-hidden="true" />
            <span className="semantic-typography-semantic-typography semantic-typography-variant-global-code slot-machine-center-label">
              <span>
                <span className="slot-machine-center-label-prefix-part">
                  worker
                  .
                </span>
                <span className="slot-machine-center-label-prefix-part">webhook</span>
              </span>
              <span className="slot-machine-center-label-tool">(shipPR)</span>
            </span>
            <span className="slot-machine-center-arrow-line slot-machine-center-arrow-line-with-head" aria-hidden="true" />
          </div>
        </div>
        <div className="slot-machine-reel">
          <div className="slot-machine-reel-track" style={{ transform: "translateY(-2208px)", transition: "transform 600ms cubic-bezier(0.4, 0, 0.2, 1)" } as CSSProperties}>
            {ACTION_CELLS.map((cell, i) => (
              <div key={i} className={i === ACTIVE_INDEX ? CELL_ACTIVE_CLASS : CELL_CLASS}>
                <img src={`${SLOT_BASE}/${cell.icon}`} alt="" className="slot-machine-cell-icon" width="32" height="32" />
                <span className="semantic-typography-semantic-typography semantic-typography-variant-global-code slot-machine-cell-label">{cell.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="slot-machine-lever-mount">
          <button type="button" className="icons-lever" aria-label="Pull lever" data-analytics-name="dev_platform_lever_pull" data-analytics-context="webhooks" data-analytics-event="click_link">
            <svg width="60" height="200" viewBox="0 0 60 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <rect y="74" width="15" height="60" fill="#1313BA" />
              <rect x="16" y="89" width="16" height="30" fill="#1313BA" />
              <rect className="icons-lever-shaft" x="21" y="34" width="6" height="60" fill="#CBCBEF" />
              <path className="icons-lever-handle" d="M30 12H33V15H36V27H33V30H30V33H18V30H15V27H12V15H15V12H18V9H30V12Z" fill="#1313BA" />
            </svg>
          </button>
        </div>
      </div>
      <div className="hidden md:flex dev-workers-subsection-spacer" />
    </section>
  );
}

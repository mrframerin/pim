import type { CSSProperties } from "react";
import home from "@/modules/home/content/home.json";

/*
 * The "Support Tickets" database in the sync demo (NDSDatabasePreviewContent).
 * Uses the design-system class names, so the CSS linked in layout.tsx styles it
 * — no custom CSS needed. Colors are the LTR/light palette values (rebrand later
 * via tokens). `revealed` controls the staggered row fade-in (rowFadeIn ->
 * rowVisible); items are the 5 rows then the footer (index 5).
 */

const content = home.syncDatabase;

const LINE = "1px solid rgb(203, 203, 239)";

/** 20px inline database-property icon (exact original markup). */
function Icon({ name, children }: { name: string; children: React.ReactNode }) {
  return (
    <svg
      aria-hidden="true"
      role="graphics-symbol"
      viewBox="0 0 20 20"
      className={name}
      style={{ width: "20px", height: "20px", display: "block", fill: "currentcolor", flexShrink: 0 } as CSSProperties}
    >
      {children}
    </svg>
  );
}

const COLUMNS = [
  {
    label: content.columns[0],
    flex: "0 0 46%",
    icon: (
      <Icon name="textFormat">
        <path fillRule="evenodd" d="m8.793 12.35 1.124 3.042a.625.625 0 1 0 1.173-.434L7.352 4.846a.988.988 0 0 0-1.854 0L1.761 14.958a.625.625 0 1 0 1.172.434l1.124-3.042zm-.462-1.25L6.425 5.943 4.52 11.1zm9.322-2.381c.345 0 .625.28.625.625v5.83a.625.625 0 1 1-1.25 0v-.204a3.26 3.26 0 0 1-2.21.83c-.903 0-1.742-.342-2.353-.98s-.961-1.537-.961-2.592.35-1.943.968-2.567c.616-.623 1.454-.942 2.346-.942.824 0 1.606.272 2.21.802v-.177c0-.345.28-.625.625-.625m-4.9 3.51c0-.774.252-1.33.608-1.69.358-.362.864-.57 1.457-.57s1.107.209 1.472.573c.361.361.616.917.616 1.686 0 1.503-.966 2.322-2.088 2.322-.582 0-1.088-.217-1.45-.595-.362-.377-.614-.952-.614-1.727" clipRule="evenodd" />
      </Icon>
    )
  },
  {
    label: content.columns[1],
    flex: "0 0 27%",
    icon: (
      <Icon name="arrowTriangleDownCircle">
        <path d="M7.144 8.954a.718.718 0 0 1 .62-1.079h4.472c.554 0 .9.6.62 1.08l-2.236 3.833a.718.718 0 0 1-1.24 0z" />
        <path d="M10 2.375a7.625 7.625 0 1 0 0 15.25 7.625 7.625 0 0 0 0-15.25M3.625 10a6.375 6.375 0 1 1 12.75 0 6.375 6.375 0 0 1-12.75 0" />
      </Icon>
    )
  },
  {
    label: content.columns[2],
    flex: "0 0 27%",
    icon: (
      <Icon name="bulletedList">
        <path d="M7.12 4.875a.625.625 0 1 0 0 1.25h9.6a.625.625 0 1 0 0-1.25zm0 4.5a.625.625 0 1 0 0 1.25h9.6a.625.625 0 1 0 0-1.25zM6.495 14.5c0-.345.28-.625.625-.625h9.6a.625.625 0 1 1 0 1.25h-9.6a.625.625 0 0 1-.625-.625m-2.875-8a1 1 0 1 0 0-2 1 1 0 0 0 0 2m1 3.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0m-1 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
      </Icon>
    )
  }
];

type Badge = { label: string; bg: string; border?: string };
type Row = { title: string; csat: Badge; tags: Badge[] };

const ROWS: Row[] = [
  {
    title: content.rows[0].title,
    csat: { label: content.rows[0].csat, bg: "rgb(255, 255, 255)" },
    tags: [
      { label: content.rows[0].tags[0], bg: "rgba(203, 203, 239, 0.44)" },
      { label: content.rows[0].tags[1], bg: "rgb(203, 203, 239)" }
    ]
  },
  {
    title: content.rows[1].title,
    csat: { label: content.rows[1].csat, bg: "rgba(203, 203, 239, 0.44)" },
    tags: [{ label: content.rows[1].tags[0], bg: "rgb(255, 255, 255)" }]
  },
  {
    title: content.rows[2].title,
    csat: { label: content.rows[2].csat, bg: "rgb(203, 203, 239)" },
    tags: [{ label: content.rows[2].tags[0], bg: "rgba(203, 203, 239, 0.44)" }]
  },
  {
    title: content.rows[3].title,
    csat: { label: content.rows[3].csat, bg: "rgba(203, 203, 239, 0.44)" },
    tags: [{ label: content.rows[3].tags[0], bg: "rgb(203, 203, 239)" }]
  },
  {
    title: content.rows[4].title,
    csat: { label: content.rows[4].csat, bg: "rgba(255, 255, 255, 0)", border: "1px solid rgb(203, 203, 239)" },
    tags: [{ label: content.rows[4].tags[0], bg: "rgba(203, 203, 239, 0.44)" }]
  }
];

function SelectBadge({ label, bg, border }: Badge) {
  return (
    <div
      className="nds-database-preview-content-select-badge"
      style={{ backgroundColor: bg, border: border ?? "1px solid transparent" }}
    >
      <span className="nds-database-preview-content-body">{label}</span>
    </div>
  );
}

const PageIcon = () => (
  <Icon name="page">
    <path d="M13.3 14.25a.55.55 0 0 1-.55.55h-5.5a.55.55 0 1 1 0-1.1h5.5a.55.55 0 0 1 .55.55m-.55-1.95a.55.55 0 1 0 0-1.1h-5.5a.55.55 0 0 0 0 1.1z" />
    <path d="M6.25 2.375A2.125 2.125 0 0 0 4.125 4.5v11c0 1.174.951 2.125 2.125 2.125h7.5a2.125 2.125 0 0 0 2.125-2.125V8.121c0-.563-.224-1.104-.622-1.502L11.63 2.997a2.13 2.13 0 0 0-1.502-.622zM5.375 4.5c0-.483.392-.875.875-.875h3.7V6.25A2.05 2.05 0 0 0 12 8.3h2.625v7.2a.875.875 0 0 1-.875.875h-7.5a.875.875 0 0 1-.875-.875zm8.691 2.7H12a.95.95 0 0 1-.95-.95V4.184z" />
  </Icon>
);

const cell = (extra?: CSSProperties): CSSProperties => ({ borderBlockEnd: LINE, ...extra });

export default function SyncDatabase({ revealed = ROWS.length + 1 }: { revealed?: number }) {
  const fade = (i: number) =>
    `nds-database-preview-content-row-fade-in${i < revealed ? " nds-database-preview-content-row-visible" : ""}`;

  return (
    <div className="nds nds-island-provider-root" data-display-mode="light">
      <div
        className="nds-database-preview-content-container"
        style={{ backgroundColor: "rgb(246, 246, 252)", color: "rgb(19, 19, 186)" }}
      >
        <div className="nds-database-preview-content-title-header">
          <svg height="32" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="32" className="notion-icon-svg-wrapper-icon">
            <path d="M7.5 11.406c0 .403.034.785.09 1.156a7.5 7.5 0 0 1-1.965.25 7.8 7.8 0 0 1-1.778-.196A5.6 5.6 0 0 1 .469 13.75L0 13.047l1.572-1.572C.562 10.581 0 9.275 0 7.656 0 4.475 2.153 2.5 5.625 2.5c2.69 0 4.584 1.19 5.3 3.203C8.772 6.706 7.5 8.731 7.5 11.406m12.5 0c0-3.181-2.153-5.156-5.625-5.156S8.75 8.225 8.75 11.406c0 3.182 2.153 5.156 5.625 5.156a7.8 7.8 0 0 0 1.778-.196 5.6 5.6 0 0 0 3.378 1.134l.469-.703-1.572-1.572c1.01-.894 1.572-2.2 1.572-3.819" fill="currentColor" />
          </svg>
          <h3 className="nds-database-preview-content-title">{content.title}</h3>
        </div>
        <div className="nds-database-preview-content-column">
          <div className="nds-database-preview-content-row" style={{ borderBlockEnd: LINE }}>
            {COLUMNS.map((c) => (
              <div key={c.label} className="nds-database-preview-content-header-cell" style={{ flex: c.flex }}>
                {c.icon}
                <span className="nds-database-preview-content-body">{c.label}</span>
              </div>
            ))}
          </div>
          {ROWS.map((row, i) => (
            <div key={row.title} className={`nds-database-preview-content-row ${fade(i)}`}>
              <div className="nds-database-preview-content-cell" style={cell({ flex: "0 0 46%" })}>
                <PageIcon />
                <span className="nds-database-preview-content-body-medium">{row.title}</span>
              </div>
              <div className="nds-database-preview-content-cell" style={cell({ flex: "0 0 27%", borderInlineStart: LINE })}>
                <SelectBadge {...row.csat} />
              </div>
              <div className="nds-database-preview-content-cell" style={cell({ flex: "0 0 27%", borderInlineStart: LINE })}>
                <div className="nds-database-preview-content-list-cell-content">
                  {row.tags.map((t) => (
                    <SelectBadge key={t.label} {...t} />
                  ))}
                </div>
              </div>
            </div>
          ))}
          <div
            className={`nds-database-preview-content-footer ${fade(ROWS.length)}`}
            style={{ color: "rgba(19, 19, 186, 0.66)" }}
          >
            <Icon name="plus">
              <path d="M10 3.59a.66.66 0 0 1 .66.66v5.09h5.09a.66.66 0 0 1 0 1.32h-5.09v5.09a.66.66 0 0 1-1.32 0v-5.09H4.25a.66.66 0 0 1 0-1.32h5.09V4.25a.66.66 0 0 1 .66-.66" />
            </Icon>
            <span className="nds-database-preview-content-body">{content.footerLabel}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

import home from "@/modules/home/content/home.json";

/** Beta-availability ticker (main > [1] > [1.1.4]). Static, CSS-styled. */
export default function Ticker() {
  const c = home.ticker;
  return (
    <aside className="ticker_ticker__HGAB1">
      <span className="graphic_graphic__jmWdv graphic_isFilled__BAfn_" style={{ "--graphic-icon-size": "var(--dimension-spacing-28)", "--graphic-frame-size": "var(--dimension-spacing-48)", "--graphic-border-radius": "var(--border-radius-200)" } as React.CSSProperties}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="1em" className="NotionIconSvgWrapper_icon__8quiY">
          <path d="M10 2.5c-4.14 0-7.5 3.36-7.5 7.5s3.36 7.5 7.5 7.5 7.5-3.36 7.5-7.5-3.36-7.5-7.5-7.5m-.937 11.325-3.438-3.437L6.95 9.063l2.113 2.112 4.3-4.3L14.688 8.2z" fill="currentColor" />
        </svg>
      </span>
      <span className="semanticTypography_semanticTypography__mWJkv semanticTypography_variantGlobalBody__yYPP0">{c.message}</span>
    </aside>
  );
}

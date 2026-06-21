import home from "@/modules/home/content/home.json";

/**
 * Decorative connector graph overlaid on dev_connectorScope
 * (main > [1] > [1.1.5–33]): 13 vertices + 12 edges + 4 floating icons.
 * Absolutely positioned and animated entirely by the design-system CSS via
 * their exact ids/class names — no JS. Rendered as a fragment so they remain
 * direct children of dev_connectorScope.
 */
export default function ConnectorOverlay() {
  const c = home.connector;
  return (
    <>
      <span className="dev-connector-vertex" id="connector-vertex-1" />
      <span className="dev-connector-vertex" id="connector-vertex-2" />
      <span className="dev-connector-vertex" id="connector-vertex-3" />
      <span className="dev-connector-vertex" id="connector-vertex-4" />
      <span className="dev-connector-vertex" id="connector-vertex-5" />
      <span className="dev-connector-vertex" id="connector-vertex-6" />
      <span className="dev-connector-vertex" id="connector-vertex-7" />
      <span className="dev-connector-vertex" id="connector-vertex-8" />
      <span className="dev-connector-vertex" id="connector-vertex-9" />
      <span className="dev-connector-vertex" id="connector-vertex-10" />
      <span className="dev-connector-vertex" id="connector-vertex-11" />
      <span className="dev-connector-vertex" id="connector-vertex-12" />
      <span className="dev-connector-vertex" id="connector-vertex-13" />
      <span className="dev-connector-edge dev-connector-edge1to2" />
      <span className="dev-connector-edge dev-connector-edge2to3" />
      <span className="dev-connector-edge dev-connector-edge3to4" />
      <span className="dev-connector-edge dev-connector-edge4to5" />
      <span className="dev-connector-edge dev-connector-edge5to6" />
      <span className="dev-connector-edge dev-connector-edge6to7" />
      <span className="dev-connector-edge dev-connector-edge7to8" />
      <span className="dev-connector-edge dev-connector-edge8to9" />
      <span className="dev-connector-edge dev-connector-edge9to10" />
      <span className="dev-connector-edge dev-connector-edge7to11" />
      <span className="dev-connector-edge dev-connector-edge11to12" />
      <span className="dev-connector-edge dev-connector-edge12to13" />
      {/* eslint-disable @next/next/no-img-element */}
      <img alt="" loading="lazy" width="48" height="48" decoding="async" data-nimg="1" className="next-image dev-connector-icon dev-connector-icon1" style={{ color: "transparent" } as React.CSSProperties} src={c.icons.tool} />
      <img alt="" loading="lazy" width="128" height="80" decoding="async" data-nimg="1" className="next-image dev-connector-icon dev-connector-icon2" style={{ color: "transparent" } as React.CSSProperties} src={c.icons.workerRuntime} />
      <img alt="" loading="lazy" width="80" height="80" decoding="async" data-nimg="1" className="next-image dev-connector-icon dev-connector-icon3" style={{ color: "transparent" } as React.CSSProperties} src={c.icons.agent} />
      <img alt="" loading="lazy" width="48" height="48" decoding="async" data-nimg="1" className="next-image dev-connector-icon dev-connector-icon4" style={{ color: "transparent" } as React.CSSProperties} src={c.icons.plug} />
      {/* eslint-enable @next/next/no-img-element */}
    </>
  );
}

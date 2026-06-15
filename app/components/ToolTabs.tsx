"use client";

import { useState } from "react";

const dev = "/notion-mirror/front-static/pages/dev";
const tabs = [
  { label: "Zendesk", icon: "icon_zendesk.svg", title: "Workers > sync:Zendesk" },
  { label: "Salesforce", icon: "icon_cloud.svg", title: "Workers > sync:Salesforce" },
  { label: "Linear", icon: "icon_linear-2.svg", title: "Workers > sync:Linear" }
];

export function ToolTabs() {
  const [active, setActive] = useState(0);
  const tab = tabs[active];

  return (
    <div className="syncDemo">
      <div className="tabRail" role="tablist" aria-label="Sync examples">
        {tabs.map((item, index) => (
          <button
            key={item.label}
            type="button"
            role="tab"
            aria-selected={active === index}
            onClick={() => setActive(index)}
          >
            <img src={`${dev}/tabs/${item.icon}`} alt="" />
            <span>{item.label}</span>
          </button>
        ))}
      </div>
      <div className="syncPanel">
        <div className="terminal">
          <span>{tab.title}</span>
          <pre>{`Found 5 new records...
Mapped schema fields
Upserted rows into Notion
Cursor saved`}</pre>
        </div>
        <div className="databaseMock">
          <strong>Support Tickets</strong>
          {["Priority", "Status", "Owner", "Updated"].map((item) => (
            <div key={item}>
              <span>{item}</span>
              <em>Synced</em>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

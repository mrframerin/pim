"use client";

import { useEffect, useState } from "react";

const dev = "/notion-mirror/front-static/pages/dev";
const items = [
  ["github.svg", "PR merged"],
  ["stripe.svg", "Customer canceled"],
  ["greenhouse.svg", "Candidate signed"],
  ["docusign.svg", "Contract signed"],
  ["zendesk.svg", "Issue escalated"]
];

export function SlotMachine() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setIndex((value) => (value + 1) % items.length), 1800);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="slotMachine">
      <div className="slotReel">
        {items.map(([icon, label], itemIndex) => (
          <div key={label} className={itemIndex === index ? "active" : ""}>
            <img src={`${dev}/slot/${icon}`} alt="" />
            <span>{label}</span>
          </div>
        ))}
      </div>
      <div className="slotCenter">Notion Worker</div>
      <div className="slotOutput">Run workflow -&gt; update database -&gt; notify team</div>
    </div>
  );
}

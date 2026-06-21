import AgentRunGame from "@/components/global/agent-run-game/AgentRunGame";

/**
 * Footer agent-run game ("ntn run") — a native React + Canvas implementation
 * (see ./agent-run-game/). The game shell uses aspect-ratio 900/320, so at the
 * footer's full-bleed width it renders ~1265×450; the 32px top/bottom wrapper
 * padding reproduces the original `.dev_footerGameSection` spacing (that padding
 * lives in a CSS chunk we don't link in our app).
 */
const SECTION_PAD = 32;

export default function FooterGame() {
  return (
    <div style={{ width: "100%", padding: `${SECTION_PAD}px 0`, boxSizing: "border-box" }}>
      <AgentRunGame />
    </div>
  );
}

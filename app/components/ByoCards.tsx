const dev = "/notion-mirror/front-static/pages/dev";
const cards = [
  ["Mention agents", "mention-agents.webp"],
  ["Assign to agents", "assign-to-agents.webp"],
  ["Generate work", "generate.webp"]
];

export function ByoCards() {
  return (
    <div className="byoGrid">
      {cards.map(([title, image]) => (
        <article key={title}>
          <img src={`${dev}/byo/${image}`} alt="" />
          <h3>{title}</h3>
          <p>Purpose-built agent actions rendered with the original local Notion assets.</p>
        </article>
      ))}
    </div>
  );
}

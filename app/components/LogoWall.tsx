const logos = ["openai", "figma", "ramp", "matchgroup", "vercel", "nvidia"];

export function LogoWall() {
  return (
    <section className="logoBand">
      <p>Trusted by engineers at</p>
      <div>
        {logos.map((logo) => (
          <img
            key={logo}
            src={`/notion-mirror/front-static/logos/generic/en/${logo}-blue.svg`}
            alt={logo}
          />
        ))}
      </div>
    </section>
  );
}

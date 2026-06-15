const links = [
  ["S", "Syncs", "#sync"],
  ["A", "Agent tools", "#tools"],
  ["H", "Webhooks", "#webhooks"],
  ["W", "Workers", "#workers"],
  ["E", "External agents", "#externalAgents"],
  ["P", "Platform", "#platform"],
  ["D", "Docs", "https://developers.notion.com"]
];

export function Nav() {
  return (
    <nav className="nav" aria-label="Main">
      <a className="mark" href="#top" aria-label="Notion home">
        <svg width="36" height="34" viewBox="0 0 36 34" fill="none" aria-hidden="true">
          <path d="M30.378 2.28746H33.189V4.66528H36V31.6222H33.189V34H5.62201V31.6222H2.81101V29.3347H0V2.28746H2.81101V0H30.378V2.28746Z" fill="#fff" />
          <path d="M28.5202 1.74881V4.12752H7.48243V6.41409H28.522V4.03627H31.3312V6.41409H34.1422V29.7422H31.3339L31.333 8.7928H10.2934V29.7422H31.3312V32.1201H7.39295V29.7422H4.58195V27.4548H1.77094V4.03627H4.58195V1.74881H28.5202Z" fill="currentColor" />
          <path d="M18.7264 13.3668H20.0863V15.7455H21.5375V18.033H22.8982V20.4108H24.3493V22.6983H25.711V13.4581H24.2599V11.0803H29.9714V13.4581H28.5202V27.4548H24.2599V25.0761H21.4489V22.7895H20.089V20.4108L20.0863 20.4037V20.4108H18.6379V18.1234H17.2753V25.0761H18.7264V27.4548H13.0158V25.0761H14.467L14.4661 13.4581H13.0158V11.0803H18.7264V13.3668Z" fill="currentColor" />
        </svg>
      </a>
      <div className="navLinks">
        {links.map(([key, label, href]) => (
          <a key={key} href={href}>
            <span>[{key}]</span>
            {label}
          </a>
        ))}
      </div>
      <div className="navActions">
        <a href="#" className="primaryButton">Get Notion free</a>
        <a href="#">Log in</a>
      </div>
    </nav>
  );
}

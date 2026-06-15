import { AgentGame } from "./components/AgentGame";
import { ByoCards } from "./components/ByoCards";
import { CommandCopy } from "./components/CommandCopy";
import { Footer } from "./components/Footer";
import { LogoWall } from "./components/LogoWall";
import { Nav } from "./components/Nav";
import { Section } from "./components/Section";
import { SlotMachine } from "./components/SlotMachine";
import { ToolTabs } from "./components/ToolTabs";

const dev = "/notion-mirror/front-static/pages/dev";

export default function Page() {
  return (
    <main className="page">
      <Nav />
      <section className="hero" id="top">
        <div className="heroContent">
          <h1>/dev/notion</h1>
          <p>Not just another CRUD API for your SaaS.</p>
          <CommandCopy context="hero" />
        </div>
        <picture className="heroImage">
          <source media="(min-width: 1080px)" srcSet={`${dev}/hero/ui.webp`} />
          <source media="(min-width: 768px)" srcSet={`${dev}/hero/ui-tablet.webp`} />
          <img src={`${dev}/hero/ui-mobile2.webp`} alt="" />
        </picture>
        <a className="keynote" href="https://youtube.com/live/rpE2rzKO6L0" target="_blank" rel="noreferrer">
          <img src={`${dev}/keynote-ticker/NotionDeveloperPlatform-Keynote.jpg`} alt="" />
          <span>See the Developer Platform in action.</span>
          <strong>Watch the keynote -&gt;</strong>
        </a>
      </section>

      <LogoWall />

      <Section
        id="sync"
        eyebrow="[S] Syncs"
        title="Sync any data source into Notion."
        body="Continuously upsert external records into a Notion Database with Workers, a declarative schema, and a persistent cursor."
      >
        <ToolTabs />
      </Section>

      <Section
        id="tools"
        eyebrow="[A] Agent tools"
        title="Give agents tools that work where your team already does."
        body="Build scoped, auditable tools for creating docs, querying data, generating assets, and taking action across apps."
        tone="blue"
      >
        <ByoCards />
      </Section>

      <Section
        id="webhooks"
        eyebrow="[H] Webhooks"
        title="Trigger Notion workflows from anywhere."
        body="Listen for incoming events from any app, then run workflows with Notion Agents, pages, databases, and external APIs."
      >
        <SlotMachine />
      </Section>

      <Section
        id="workers"
        eyebrow="[W] Workers"
        title="Run durable logic next to your workspace."
        body="Workers keep syncs, tools, and webhooks moving with predictable code paths and visible results."
        tone="dark"
      >
        <div className="terminalGrid">
          <div className="terminal">
            <span>workers/zendeskSync.ts</span>
            <pre>{`worker.sync("zendeskTickets", {
  source: zendesk.search("status:open"),
  database: notion.database("Support Tickets"),
  cursor: state.cursor,
});`}</pre>
          </div>
          <div className="terminal">
            <span>logs</span>
            <pre>{`> found 5 new tickets
> mapped schema fields
> upserted Support Tickets
> cursor saved`}</pre>
          </div>
        </div>
      </Section>

      <Section
        id="externalAgents"
        eyebrow="[E] External agents"
        title="Orchestrate any agent on one shared canvas."
        body="Bring Claude, Cursor, custom agents, and internal systems into the same workflow surface your team uses every day."
      >
        <div className="diagramCard">
          <img src={`${dev}/diagram/diagram.svg`} alt="" />
        </div>
      </Section>

      <Section
        id="platform"
        eyebrow="[P] Platform"
        title="A platform layer for teams and agents."
        body="SDKs, auth scopes, webhooks, syncs, workers, and agent tools in one integrated developer surface."
        tone="blue"
      >
        <div className="platformGrid">
          {["SDKs", "OAuth scopes", "Webhooks", "Workers", "Sync cursors", "Agent tools"].map((item) => (
            <article key={item}>{item}</article>
          ))}
        </div>
      </Section>

      <section className="gameSection" data-analytics-name="DevPlatformGame">
        <div>
          <p className="eyebrow">ENDCAP</p>
          <h2>Ship the agent safely home.</h2>
          <CommandCopy context="footer" />
        </div>
        <AgentGame />
      </section>

      <Footer />
    </main>
  );
}

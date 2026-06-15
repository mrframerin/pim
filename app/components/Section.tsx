import type { ReactNode } from "react";

export function Section({
  id,
  eyebrow,
  title,
  body,
  tone = "light",
  children
}: {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  tone?: "light" | "blue" | "dark";
  children: ReactNode;
}) {
  return (
    <section className={`section ${tone}`} id={id}>
      <div className="sectionHeader">
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <p>{body}</p>
      </div>
      {children}
    </section>
  );
}

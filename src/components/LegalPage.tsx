import { ReactNode } from "react";

type LegalPageProps = {
  eyebrow: string;
  title: string;
  updated: string;
  intro: string;
  children: ReactNode;
};

export function LegalPage({ eyebrow, title, updated, intro, children }: LegalPageProps) {
  return (
    <section className="legal-page">
      <div className="legal-shell">
        <header className="legal-header">
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p>{intro}</p>
          <span>Last updated: {updated}</span>
        </header>
        <article className="legal-content">{children}</article>
      </div>
    </section>
  );
}

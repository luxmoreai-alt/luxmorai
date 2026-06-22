import type { ReactNode } from "react";

type SectionProps = {
  eyebrow?: string;
  title: string;
  intro?: string;
  children: ReactNode;
  tone?: "white" | "soft" | "dark";
};

export function Section({ eyebrow, title, intro, children, tone = "white" }: SectionProps) {
  return (
    <section className={`section-band ${tone === "soft" ? "bg-slate-50" : tone === "dark" ? "bg-slate-950 text-white" : ""}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl">
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h2 className="section-title">{title}</h2>
          {intro && <p className={`mt-4 text-base leading-7 ${tone === "dark" ? "text-slate-300" : "text-slate-600"}`}>{intro}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}

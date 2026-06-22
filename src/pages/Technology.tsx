import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Section } from "../components/Section";
import { featuredTechnologies, technologyGroups } from "../data/technologies";

export function Technology() {
  return (
    <>
      <Section
        eyebrow="Technology Stack"
        title="Tools, platforms, and processes for modern delivery"
        intro="Luxmorai combines frontend engineering, backend systems, cloud infrastructure, testing, analytics, and AI-focused product development."
      >
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {technologyGroups.map((group) => (
            <Link className="stack-card technology-stack-card group" to={`/technology/${group.slug}`} key={group.slug}>
              <group.icon className="h-8 w-8 text-sky-700" />
              <h3>{group.title}</h3>
              <p>{group.summary}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span className="tech-pill" key={item}>
                    {item}
                  </span>
                ))}
              </div>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-sky-700">
                View details
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <section className="section-band bg-slate-950 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div>
            <p className="eyebrow text-amber-300">AI & ML</p>
            <h2 className="section-title">Intelligence layered into practical software</h2>
            <p className="mt-4 text-base leading-7 text-slate-300">
              We use AI where it creates operational value: automation, prediction, search, reporting, recommendations,
              support, and workflow assistance.
            </p>
            <Link className="mt-8 inline-flex items-center gap-2 text-sm font-extrabold text-sky-200" to="/contact">
              Discuss AI solution
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {featuredTechnologies.map((technology) => (
              <article className="technology-feature-card" key={technology.title}>
                <technology.icon className="h-8 w-8 text-amber-300" />
                <h3>{technology.title}</h3>
                <p>{technology.text}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {technology.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

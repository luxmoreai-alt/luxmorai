import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { getTechnologyGroupBySlug, technologyGroups } from "../data/technologies";
import { useSeo } from "../lib/seo";

export function TechnologyDetail() {
  const { slug } = useParams();
  const technology = getTechnologyGroupBySlug(slug);

  useSeo({
    title: technology ? `${technology.title} Services and Technology Capabilities | Luxmor AI` : "Technology Stack | Luxmor AI",
    description: technology
      ? `${technology.summary} Luxmor AI uses ${technology.title.toLowerCase()} to build reliable software, AI workflows, web platforms, mobile apps, and business systems.`
      : "Explore Luxmor AI technology capabilities across AI, cloud, web, backend, data, testing, and software delivery.",
    path: technology ? `/technology/${technology.slug}` : "/technology",
  });

  if (!technology) {
    return <Navigate to="/technology" replace />;
  }

  const relatedTechnologies = technologyGroups.filter((group) => group.slug !== technology.slug).slice(0, 3);

  return (
    <>
      <section className="technology-hero">
        <img className="technology-hero-image" src={technology.image} alt="" aria-hidden="true" />
        <div className="technology-hero-overlay" />
        <div className="relative mx-auto grid min-h-[460px] max-w-7xl content-center px-4 py-16 sm:px-6 lg:px-8">
          <Link className="mb-8 inline-flex w-fit items-center gap-2 text-sm font-extrabold text-sky-100" to="/technology">
            <ArrowLeft className="h-4 w-4" />
            Technology Stack
          </Link>
          <div className="max-w-3xl">
            <p className="eyebrow text-amber-300">Luxmorai Technology</p>
            <technology.icon className="mt-5 h-12 w-12 text-sky-200" />
            <h1 className="mt-4 text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">{technology.title}</h1>
            <p className="mt-6 text-lg leading-8 text-slate-100">{technology.summary}</p>
            <div className="detail-hero-highlights" aria-label={`${technology.title} highlights`}>
              <span><strong>{technology.items.length}</strong> core tools</span>
              <span><strong>{technology.capabilities.length}</strong> delivery capabilities</span>
              <span><strong>1</strong> clear roadmap</span>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link className="primary-button light" to="/contact">
                Start Project
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-band bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div>
            <p className="eyebrow">Overview</p>
            <h2 className="section-title">How we use {technology.title}</h2>
          </div>
          <div className="grid gap-5 text-base leading-8 text-slate-600">
            {technology.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="detail-story-section">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="detail-story-media">
            <img src={technology.image} alt={`${technology.title} technology workspace`} />
            <div><technology.icon className="h-6 w-6" /><span>Built for useful outcomes</span></div>
          </div>
          <div className="detail-story-copy">
            <p className="eyebrow">The Luxmorai way</p>
            <h2>Make {technology.title} work for the business.</h2>
            <p>
              Tools only create value when they fit the product, the people using it, and the work that happens around it. We make those decisions clear before building.
            </p>
            <ul>
              <li>Architecture shaped around real users and workflows</li>
              <li>Secure, observable delivery that teams can maintain</li>
              <li>Practical guidance from first decision to launch</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section-band bg-slate-50">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div>
            <p className="eyebrow">Capabilities</p>
            <h2 className="section-title">What this stack helps us deliver</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {technology.capabilities.map((capability) => (
              <article className="industry-detail-card" key={capability.title}>
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                <div>
                  <h3>{capability.title}</h3>
                  <p>{capability.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-band bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div>
            <p className="eyebrow">Technologies</p>
            <h2 className="section-title">Tools and platforms in this section</h2>
          </div>
          <div className="flex flex-wrap content-start gap-3">
            {technology.items.map((item) => (
              <span className="tech-pill" key={item}>
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section-band bg-slate-50">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div>
            <p className="eyebrow">Use Cases</p>
            <h2 className="section-title">Where this technology fits</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {technology.useCases.map((useCase) => (
              <div className="feature-check" key={useCase}>
                <technology.icon className="h-5 w-5 text-sky-700" />
                <span>{useCase}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-band bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div>
            <p className="eyebrow">Benefits</p>
            <h2 className="section-title">Why this matters for your product</h2>
          </div>
          <div className="grid gap-4">
            {technology.benefits.map((benefit, index) => (
              <article className="sub-service-card" key={benefit.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-band bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <p className="eyebrow">Delivery Process</p>
            <h2 className="section-title">How we move from plan to release</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {technology.process.map((step, index) => (
              <article className="process-card" key={step}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{step}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-band bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="industry-closing-panel">
            <div>
              <p className="eyebrow text-amber-300">Next Step</p>
              <h2>{technology.closing}</h2>
            </div>
            <Link className="primary-button light" to="/contact">
              Talk to us
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section-band bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <p className="eyebrow text-amber-300">Related Technology</p>
            <h2 className="section-title">Explore more parts of the stack</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {relatedTechnologies.map((group) => (
              <Link className="related-service-card group" key={group.slug} to={`/technology/${group.slug}`}>
                <img className="related-service-image" src={group.image} alt="" />
                <div className="related-service-content">
                  <group.icon className="h-7 w-7 text-amber-300" />
                  <h3>{group.title}</h3>
                  <p>{group.summary}</p>
                  <span>
                    View technology
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

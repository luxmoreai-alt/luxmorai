import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { getIndustryBySlug, industries } from "../data/industries";

export function IndustryDetail() {
  const { slug } = useParams();
  const industry = getIndustryBySlug(slug);

  if (!industry) {
    return <Navigate to="/industries" replace />;
  }

  const relatedIndustries = industries.filter((item) => item.slug !== industry.slug).slice(0, 3);

  return (
    <>
      <section className="industry-hero">
        <img className="service-hero-image" src={industry.image} alt={industry.title} />
        <div className="service-hero-overlay" />
        <div className="relative mx-auto grid min-h-[500px] max-w-7xl content-center px-4 py-16 sm:px-6 lg:px-8">
          <Link className="mb-8 inline-flex w-fit items-center gap-2 text-sm font-extrabold text-sky-100" to="/industries">
            <ArrowLeft className="h-4 w-4" />
            All Industries
          </Link>
          <div className="max-w-3xl">
            <p className="eyebrow text-amber-300">Luxmorai Industry</p>
            <h1 className="mt-4 text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">{industry.title}</h1>
            <p className="mt-6 text-lg leading-8 text-slate-100">{industry.text}</p>
            <div className="detail-hero-highlights" aria-label={`${industry.title} highlights`}>
              <span><strong>{industry.useCases.length}+</strong> solution paths</span>
              <span><strong>{industry.trends.length}</strong> technology priorities</span>
              <span><strong>1</strong> delivery partner</span>
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
            <p className="eyebrow">Industry Overview</p>
            <h2 className="section-title">Technology opportunities for {industry.title}</h2>
          </div>
          <div className="grid gap-5 text-base leading-8 text-slate-600">
            {industry.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="detail-story-section">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="detail-story-media">
            <img src={industry.image} alt={`${industry.title} digital operations`} />
            <div><industry.icon className="h-6 w-6" /><span>Built for real operations</span></div>
          </div>
          <div className="detail-story-copy">
            <p className="eyebrow">Our approach</p>
            <h2>Practical digital progress for {industry.title}.</h2>
            <p>
              We connect the customer experience, operational workflows, and decision-making data that matter most to your team, then build in focused, measurable steps.
            </p>
            <ul>
              <li>Experiences that make complex journeys feel simpler</li>
              <li>Connected systems that reduce manual work and blind spots</li>
              <li>Flexible foundations for what your business needs next</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section-band bg-slate-50">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div>
            <p className="eyebrow">Emerging</p>
            <h2 className="section-title">{industry.trendsTitle}</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {industry.trends.map((trend) => (
              <article className="industry-detail-card" key={typeof trend === "string" ? trend : trend.title}>
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                <div>
                  {typeof trend === "string" ? (
                    <p>{trend}</p>
                  ) : (
                    <>
                      <h3>{trend.title}</h3>
                      <p>{trend.text}</p>
                    </>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-band bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div>
            <p className="eyebrow">Use Cases</p>
            <h2 className="section-title">Solutions we can shape for this industry</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {industry.useCases.map((useCase) => (
              <div className="feature-check" key={useCase}>
                <industry.icon className="h-5 w-5 text-sky-700" />
                <span>{useCase}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-band bg-slate-50">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div>
            <p className="eyebrow">Challenges</p>
            <h2 className="section-title">{industry.challengesTitle}</h2>
          </div>
          <div className="grid gap-4">
            {industry.challenges.map((challenge, index) => (
              <article className="sub-service-card" key={typeof challenge === "string" ? challenge : challenge.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  {typeof challenge === "string" ? (
                    <h3>{challenge}</h3>
                  ) : (
                    <>
                      <h3>{challenge.title}</h3>
                      <p>{challenge.text}</p>
                    </>
                  )}
                </div>
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
              <h2>{industry.closing}</h2>
              {industry.closingDetails && (
                <div className="industry-closing-copy">
                  {industry.closingDetails.map((detail) => (
                    <p key={detail}>{detail}</p>
                  ))}
                </div>
              )}
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
            <p className="eyebrow text-amber-300">Related Industries</p>
            <h2 className="section-title">Explore more industries we support</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {relatedIndustries.map((item) => (
              <Link className="related-service-card group" key={item.slug} to={`/industries/${item.slug}`}>
                <img className="related-service-image" src={item.image} alt="" />
                <div className="related-service-content">
                  <item.icon className="h-7 w-7 text-amber-300" />
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  <span>
                    View industry
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

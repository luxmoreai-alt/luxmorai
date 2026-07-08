import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { services, getServiceBySlug } from "../data/services";
import { useSeo } from "../lib/seo";

export function ServiceDetail() {
  const { slug } = useParams();
  const service = getServiceBySlug(slug);

  useSeo({
    title: service ? `${service.title} | Luxmor AI` : "Services | Luxmor AI",
    description: service
      ? `${service.summary} Luxmor AI plans, builds, launches, and supports reliable digital products for growing businesses.`
      : "Explore Luxmor AI services for custom software, AI automation, CRM, web development, mobile apps, digital marketing, design, and testing.",
    path: service ? `/services/${service.slug}` : "/services",
  });

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const relatedServices = services.filter((item) => item.slug !== service.slug).slice(0, 3);

  return (
    <>
      <section className="service-hero">
        <img className="service-hero-image" src={service.image} alt={service.title} />
        <div className="service-hero-overlay" />
        <div className="relative mx-auto grid min-h-[520px] max-w-7xl content-center px-4 py-16 sm:px-6 lg:px-8">
          <Link className="mb-8 inline-flex w-fit items-center gap-2 text-sm font-extrabold text-sky-100" to="/services">
            <ArrowLeft className="h-4 w-4" />
            All Services
          </Link>
          <div className="max-w-3xl">
            <p className="eyebrow text-amber-300">Luxmorai Service</p>
            <h1 className="mt-4 text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">{service.title}</h1>
            <p className="mt-6 text-lg leading-8 text-slate-100">{service.intro}</p>
            <div className="detail-hero-highlights" aria-label={`${service.shortTitle} highlights`}>
              <span><strong>{service.subServices.length}</strong> focused services</span>
              <span><strong>{service.deliverables.length}</strong> delivery outcomes</span>
              <span><strong>{service.technologies.length}</strong> supporting tools</span>
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
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div>
            <p className="eyebrow">Sub Services</p>
            <h2 className="section-title">Five focused ways we deliver this service</h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Each sub-service can stand alone or become part of a complete project plan. Luxmorai keeps the scope clear
              so your team knows exactly what is being built, improved, measured, and supported.
            </p>
          </div>
          <div className="grid gap-4">
            {service.subServices.map((item, index) => (
              <article className="sub-service-card" key={item.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="detail-story-section">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="detail-story-media">
            <img src={service.image} alt={`${service.shortTitle} planning and delivery`} />
            <div><service.icon className="h-6 w-6" /><span>Built around your business</span></div>
          </div>
          <div className="detail-story-copy">
            <p className="eyebrow">How we help</p>
            <h2>More than a service. A practical way forward.</h2>
            <p>
              We shape the work around the people, systems, and outcomes that matter most—so every decision leads toward a clearer, more useful result.
            </p>
            <ul>
              <li>Clear priorities that keep the work focused</li>
              <li>Specialists who connect strategy, design, and delivery</li>
              <li>Support that continues after launch, not just until it</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section-band bg-slate-50">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div>
            <p className="eyebrow">What We Deliver</p>
            <h2 className="section-title">Complete support from plan to launch</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {service.deliverables.map((item) => (
              <div className="feature-check" key={item}>
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-band bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <p className="eyebrow">Service In Pictures</p>
            <h2 className="section-title">Two quick views of how this work comes together</h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              These visuals help explain the planning, design, development, and delivery focus behind {service.shortTitle}.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {service.explainerImages.map((image) => (
              <article className="service-explainer-card" key={image.src}>
                <img src={image.src} alt={image.alt} />
                <p>{image.caption}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-band bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <p className="eyebrow">Our Process</p>
            <h2 className="section-title">A clear path from idea to delivery</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {service.process.map((step, index) => (
              <article className="process-card" key={step}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{step}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-band bg-slate-50">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <p className="eyebrow">Technology Fit</p>
            <h2 className="section-title">Tools selected for your product stage</h2>
          </div>
          <div className="flex flex-wrap content-start gap-3">
            {service.technologies.map((item) => (
              <span className="tech-pill" key={item}>
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section-band bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <p className="eyebrow text-amber-300">Related Services</p>
            <h2 className="section-title">Explore more ways Luxmorai can help</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {relatedServices.map((item) => (
              <Link className="related-service-card group" key={item.slug} to={`/services/${item.slug}`}>
                <img className="related-service-image" src={item.image} alt="" />
                <div className="related-service-content">
                  <item.icon className="h-7 w-7 text-amber-300" />
                  <h3>{item.shortTitle}</h3>
                  <p>{item.summary}</p>
                  <span>
                    View service
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

import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Section } from "../components/Section";
import { services } from "../data/services";
import { useSeo } from "../lib/seo";

export function Services() {
  useSeo({
    title: "Services | AI Software Development, CRM, Web & Mobile Apps | Luxmor AI",
    description:
      "Explore Luxmor AI services including AI automation, custom software development, CRM systems, web development, mobile app development, digital marketing, UI/UX, and testing.",
    path: "/services",
  });

  return (
    <Section
      headingLevel="h1"
      eyebrow="25 Sub Services"
      title="Five service groups for modern businesses"
      intro="Luxmorai covers online marketing, development, mobile apps, software products, and creative quality support through focused sub-services that can be delivered together or separately."
    >
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
        {services.map((service) => (
          <Link className="service-card group" key={service.slug} to={`/services/${service.slug}`}>
            <div className="service-card-images">
              {service.explainerImages.map((image) => (
                <img key={image.src} src={image.src} alt={image.alt} />
              ))}
            </div>
            <service.icon className="h-8 w-8 text-amber-500" />
            <h3>{service.shortTitle}</h3>
            <p>{service.summary}</p>
            <ul className="service-card-list">
              {service.subServices.map((item) => (
                <li key={item.title}>{item.title}</li>
              ))}
            </ul>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-sky-700">
              View details
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </div>
    </Section>
  );
}

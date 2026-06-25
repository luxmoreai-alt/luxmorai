import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Section } from "../components/Section";
import { industries } from "../data/industries";
import { useSeo } from "../lib/seo";

export function Industries() {
  useSeo({
    title: "Industries We Serve | AI and Software Solutions | Luxmor AI",
    description:
      "Luxmor AI builds software, AI automation, web platforms, mobile apps, and digital systems for finance, healthcare, education, ecommerce, manufacturing, logistics, travel, and technology companies.",
    path: "/industries",
  });

  return (
    <Section
      headingLevel="h1"
      tone="soft"
      eyebrow="What We Serve"
      title="Industry-focused software delivery"
      intro="The content direction follows the reference site's broad industry coverage, adapted for Luxmorai's own brand."
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {industries.map((industry) => (
          <Link className="industry-card group" to={`/industries/${industry.slug}`} key={industry.title}>
            <img className="industry-card-image" src={industry.image} alt={`${industry.title} industry`} />
            <industry.icon className="h-7 w-7 text-sky-700" />
            <h3>{industry.title}</h3>
            <p>{industry.text}</p>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-sky-700">
              View industry
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </div>
    </Section>
  );
}

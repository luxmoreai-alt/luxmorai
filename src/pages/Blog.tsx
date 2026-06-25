import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Section } from "../components/Section";
import { blogPosts } from "../data/blogPosts";
import { useSeo } from "../lib/seo";

export function Blog() {
  useSeo({
    title: "Blog | IT Staffing, AI Hiring, Diversity & Tech Careers | Luxmor AI",
    description:
      "Read Luxmor AI insights on IT staffing, AI-powered hiring, contingent workforce trends, sustainable recruitment, diversity, resumes, and technology careers.",
    path: "/blog",
  });

  return (
    <Section
      headingLevel="h1"
      tone="soft"
      eyebrow="Luxmor AI Blog"
      title="Practical guides on IT staffing, AI hiring, and technology careers"
      intro="Explore useful ideas for businesses and professionals around IT staffing, workforce planning, inclusive hiring, AI in recruitment, resumes, and career growth."
    >
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <article className="service-card group" key={post.slug}>
            <Link to={`/blog/${post.slug}`} aria-label={`Read ${post.title}`}>
              <img className="blog-card-image" src={post.image} alt={post.imageAlt} />
            </Link>
            <p className="eyebrow">{post.keyword}</p>
            <h3>{post.title}</h3>
            <p>{post.description}</p>
            <Link className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-sky-700" to={`/blog/${post.slug}`}>
              Read article
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </article>
        ))}
      </div>
    </Section>
  );
}

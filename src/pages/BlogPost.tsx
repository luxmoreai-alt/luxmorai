import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { blogPosts, getBlogPostBySlug } from "../data/blogPosts";
import { pageSchema, useSeo } from "../lib/seo";

export function BlogPost() {
  const { slug } = useParams();
  const post = getBlogPostBySlug(slug);

  useSeo({
    title: post ? `${post.title} | Luxmor AI Blog` : "Blog | Luxmor AI",
    description: post?.description ?? "Read Luxmor AI insights on AI, CRM, automation, and custom software development.",
    path: post ? `/blog/${post.slug}` : "/blog",
    image: post?.image,
    type: "article",
    structuredData: post
      ? [
          pageSchema(`/blog/${post.slug}`, `${post.title} | Luxmor AI Blog`, post.description),
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.description,
            image: post.image,
            author: {
              "@type": "Organization",
              name: "Luxmorai Technologies Pvt Ltd",
            },
            publisher: {
              "@type": "Organization",
              name: "Luxmorai Technologies Pvt Ltd",
              logo: {
                "@type": "ImageObject",
                url: "https://www.luxmorai.com/luxmorai-logo.png",
              },
            },
            mainEntityOfPage: `https://www.luxmorai.com/blog/${post.slug}`,
          },
        ]
      : undefined,
  });

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const relatedPosts = blogPosts.filter((item) => item.slug !== post.slug).slice(0, 3);

  return (
    <>
      <section className="section-band bg-slate-950 text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div>
            <Link className="mb-8 inline-flex items-center gap-2 text-sm font-extrabold text-sky-200" to="/blog">
              <ArrowLeft className="h-4 w-4" />
              Blog
            </Link>
            <p className="eyebrow text-amber-300">{post.keyword}</p>
            <h1 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">{post.title}</h1>
            <p className="mt-6 text-lg leading-8 text-slate-200">{post.description}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {post.relatedKeywords.map((keyword) => (
                <span className="tech-pill" key={keyword}>
                  {keyword}
                </span>
              ))}
            </div>
          </div>
          <img className="blog-hero-image" src={post.image} alt={post.imageAlt} />
        </div>
      </section>

      <section className="section-band bg-white">
        <article className="mx-auto max-w-4xl px-4 text-base leading-8 text-slate-600 sm:px-6 lg:px-8">
          <div className="blog-summary-box">
            <p className="eyebrow">Brief overview</p>
            <h2>What this article explains</h2>
            <p>{post.brief}</p>
          </div>
          {post.sections.map((section) => (
            <section className="mb-10" key={section.heading}>
              <h2 className="section-title mb-4 text-slate-950">{section.heading}</h2>
              <p>{section.body}</p>
            </section>
          ))}
          <div className="industry-closing-panel mt-12">
            <div>
              <p className="eyebrow text-amber-300">Next step</p>
              <h2>Want to apply this inside your business?</h2>
              <p>Luxmor AI can help plan, build, and launch the right system around your workflow.</p>
            </div>
            <Link className="primary-button light" to={post.servicePath}>
              Explore service
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </article>
      </section>

      <section className="section-band bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <p className="eyebrow">Related posts</p>
            <h2 className="section-title">Keep reading</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {relatedPosts.map((item) => (
              <Link className="service-card group" key={item.slug} to={`/blog/${item.slug}`}>
                <img className="blog-card-image" src={item.image} alt={item.imageAlt} />
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-sky-700">
                  Read article
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

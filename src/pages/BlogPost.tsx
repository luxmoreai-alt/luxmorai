import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { BlogImage } from "../components/BlogImage";
import { blogPosts, getBlogPostBySlug } from "../data/blogPosts";
import { ApiBlogPost, getBlogPost, getBlogPosts } from "../lib/api";
import { pageSchema, useSeo } from "../lib/seo";

function isHeadingLike(text: string) {
  const cleanText = text.trim();
  return cleanText.length > 0 && cleanText.length <= 80 && !/[.!?]$/.test(cleanText);
}

function renderArticleBody(body: string) {
  return body
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block, index) => {
      const lines = block
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);

      if (lines.length === 1 && isHeadingLike(lines[0])) {
        return (
          <h3 className="blog-subheading" key={`${lines[0]}-${index}`}>
            {lines[0]}
          </h3>
        );
      }

      if (lines.length > 2 && lines.every((line) => line.length <= 90 && !/[.!?]$/.test(line))) {
        return (
          <ul className="blog-list" key={`${lines[0]}-${index}`}>
            {lines.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        );
      }

      return (
        <p className="blog-paragraph" key={`${block.slice(0, 30)}-${index}`}>
          {lines.join(" ")}
        </p>
      );
    });
}

export function BlogPost() {
  const { slug } = useParams();
  const [apiPosts, setApiPosts] = useState<ApiBlogPost[]>([]);
  const [missingPost, setMissingPost] = useState(false);
  const staticPost = getBlogPostBySlug(slug);
  const post = apiPosts.find((item) => item.slug === slug) ?? staticPost;

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
                url: "https://www.luxmorai.com/luxmorai-logo.jpeg",
              },
            },
            mainEntityOfPage: `https://www.luxmorai.com/blog/${post.slug}`,
          },
        ]
      : undefined,
  });

  useEffect(() => {
    if (!slug) return;

    getBlogPost(slug)
      .then((item) => {
        setApiPosts((current) => [item, ...current.filter((post) => post.slug !== item.slug)]);
        setMissingPost(false);
      })
      .catch(() => {
        setMissingPost(!staticPost);
      });

    getBlogPosts()
      .then((items) => setApiPosts(items))
      .catch(() => undefined);
  }, [slug, staticPost]);

  if (!post && missingPost) {
    return <Navigate to="/blog" replace />;
  }

  if (!post) {
    return <section className="section-band bg-white text-center">Loading article...</section>;
  }

  const staticOnlyPosts = blogPosts.filter((item) => !apiPosts.some((post) => post.slug === item.slug));
  const allPosts = [...apiPosts, ...staticOnlyPosts];
  const relatedPosts = allPosts.filter((item) => item.slug !== post.slug).slice(0, 3);

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
          <BlogImage className="blog-hero-image" src={post.image} alt={post.imageAlt} />
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
            <section className="blog-article-section" key={section.heading}>
              <h2 className="section-title mb-4 text-slate-950">{section.heading}</h2>
              {renderArticleBody(section.body)}
            </section>
          ))}
          <div className="industry-closing-panel blog-closing-panel mt-12">
            <div>
              <p className="eyebrow text-amber-300">Next step</p>
              <h2>Want to apply this inside your business?</h2>
              <p>Luxmor AI can help plan, build, and launch the right system around your workflow.</p>
            </div>
            <Link className="primary-button light" to={post.servicePath}>
              Explore services
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
                <BlogImage className="blog-card-image" src={item.image} alt={item.imageAlt} />
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

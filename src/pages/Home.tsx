import { motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  Check,
  ChevronLeft,
  ChevronRight,
  CloudCog,
  Code2,
  Cpu,
  Layers3,
  LineChart,
  MessageSquareText,
  Rocket,
  ShieldCheck,
  Smartphone,
  Sparkles,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { industries } from "../data/industries";

const services = [
  {
    icon: Bot,
    title: "AI & intelligent automation",
    text: "Turn repetitive work and scattered data into practical, secure AI workflows.",
    href: "/technology/ai-ml",
    number: "01",
  },
  {
    icon: Code2,
    title: "Web & software products",
    text: "High-performance websites, portals, dashboards, APIs, and business platforms.",
    href: "/services/development",
    number: "02",
  },
  {
    icon: Smartphone,
    title: "Mobile app development",
    text: "Thoughtful iOS, Android, and cross-platform experiences built for real users.",
    href: "/services/mobile-apps",
    number: "03",
  },
  {
    icon: CloudCog,
    title: "Cloud & DevOps",
    text: "Reliable infrastructure, automated delivery, monitoring, and scalable cloud systems.",
    href: "/technology/cloud-computing",
    number: "04",
  },
  {
    icon: LineChart,
    title: "Analytics & growth",
    text: "Clear reporting and digital growth systems that connect activity to outcomes.",
    href: "/services/online-marketing",
    number: "05",
  },
  {
    icon: ShieldCheck,
    title: "Quality engineering",
    text: "Testing, performance, and security practices that make every release dependable.",
    href: "/services/creative-design-testing",
    number: "06",
  },
];

const process = [
  { icon: MessageSquareText, step: "Discover", text: "We align on your users, business goals, constraints, and the clearest path forward." },
  { icon: Layers3, step: "Design", text: "We shape the product experience, architecture, and delivery roadmap before building." },
  { icon: Cpu, step: "Build", text: "Our team ships in focused iterations with transparent progress and frequent reviews." },
  { icon: Rocket, step: "Launch & grow", text: "We test, deploy, monitor, and keep improving the product as your needs evolve." },
];

const highlights = [
  ["40+", "Digital capabilities"],
  ["30+", "Modern technologies"],
  ["12", "Industry verticals"],
  ["24/7", "Support mindset"],
];

const heroSlides = [
  {
    src: "/home-slides/ux-design-web.jpg",
    alt: "Designer working with a futuristic digital product interface",
    label: "Luxmorai overview",
    eyebrow: "Luxmorai overview",
    title: "Dependable technology delivery for ambitious teams.",
    description: "We combine practical thinking, thoughtful design, and strong engineering to turn ambitious ideas into products people can rely on.",
    cta: "Explore Luxmorai",
    focus: "How we help",
    services: ["Product strategy", "Custom software", "Mobile experiences"],
    project: "Bring your next digital idea into focus.",
  },
  {
    src: "/home-slides/global-ai-web.jpg",
    alt: "Global artificial intelligence and secure business network",
    label: "Data & AI",
    eyebrow: "Data & AI",
    title: "Turn connected data into better decisions.",
    description: "We shape data platforms and applied AI workflows that help teams see patterns, automate work, and make every decision more useful.",
    cta: "Explore data & AI",
    focus: "Data capabilities",
    services: ["Business intelligence", "Applied AI", "Intelligent automation"],
    project: "Make your data work harder for the business.",
  },
  {
    src: "/home-slides/digital-future-web.jpg",
    alt: "Blue and orange digital technology landscape",
    label: "Fintech",
    eyebrow: "Fintech",
    title: "Financial experiences built for trust and change.",
    description: "From secure customer journeys to clear operational systems, we create financial platforms designed for trust, speed, and change.",
    cta: "Explore fintech solutions",
    focus: "Financial solutions",
    services: ["Customer portals", "Secure payments", "Operational dashboards"],
    project: "Create a more trusted financial journey.",
  },
  {
    src: "/home-slides/smart-city-web.jpg",
    alt: "Smart city connected through cloud and mobile technology",
    label: "Energy & operations",
    eyebrow: "Energy & operations",
    title: "Make operations smarter, clearer, and ready to scale.",
    description: "We connect field data, platforms, and people through digital systems that improve visibility, efficiency, and day-to-day control.",
    cta: "Explore operations solutions",
    focus: "Operational impact",
    services: ["Connected platforms", "Cloud systems", "Performance insights"],
    project: "Give operations a better digital foundation.",
  },
];

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
};

export function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  const activeHeroSlide = heroSlides[activeSlide];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 10000);

    return () => window.clearInterval(timer);
  }, [activeSlide]);

  const showPreviousSlide = () => {
    setActiveSlide((current) => (current - 1 + heroSlides.length) % heroSlides.length);
  };

  const showNextSlide = () => {
    setActiveSlide((current) => (current + 1) % heroSlides.length);
  };

  return (
    <div className="home-page">
      <section className="home-hero home-hero-showcase" aria-roledescription="carousel" aria-label="Luxmorai digital solutions">
        <div className="home-showcase-shell" style={{ gridTemplateColumns: heroSlides.map((_, index) => index === activeSlide ? "minmax(0, 1fr)" : "clamp(4.7rem, 6vw, 6.5rem)").join(" ") }}>
          {heroSlides.map((slide, index) =>
            <motion.div
              className={index === activeSlide ? "home-showcase-stage" : "home-showcase-rail-slot"}
              layout
              transition={{ layout: { duration: 0.62, ease: [0.22, 1, 0.36, 1] } }}
              key={slide.src}
            >
              {index === activeSlide ? (
                <>
                  <div className="home-hero-slider" aria-live="polite">
                    <motion.img
                      className="home-hero-background active"
                      src={slide.src}
                      alt={slide.alt}
                      initial={{ opacity: 0, scale: 1.04 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.52, ease: "easeOut" }}
                    />
                  </div>
                  <div className="home-showcase-shade" />
                  <motion.div
                    className="home-showcase-copy"
                    key={activeHeroSlide.src}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55 }}
                  >
                  <p><Sparkles /> {activeHeroSlide.eyebrow}</p>
                  <h1>{activeHeroSlide.title}</h1>
                  <span>
                    {activeHeroSlide.description}
                  </span>
                  <Link className="home-showcase-link" to="/contact">{activeHeroSlide.cta} <ArrowRight /></Link>
                  </motion.div>
                  <div className="home-showcase-project-card">
                    <span>Have a project in mind?</span>
                    <strong>{activeHeroSlide.project}</strong>
                    <Link to="/contact">Tell us about it <ArrowRight /></Link>
                  </div>
                  <div className="home-showcase-bottom">
                    <div><span>{activeHeroSlide.focus}</span><strong>Ideas, made useful.</strong></div>
                    <div className="home-showcase-proof">{activeHeroSlide.services.map((service) => <span key={service}>{service}</span>)}</div>
                    <div className="home-showcase-controls">
                      <button type="button" onClick={showPreviousSlide} aria-label="Show previous image"><ChevronLeft /></button>
                      <button type="button" onClick={showNextSlide} aria-label="Show next image"><ChevronRight /></button>
                    </div>
                  </div>
                </>
              ) : (
                <button
                  className="home-showcase-rail"
                  type="button"
                  onClick={() => setActiveSlide(index)}
                  aria-label={`Show ${slide.label}`}
                >
                  <img src={slide.src} alt="" />
                  <span>{slide.label}</span>
                  <i>+</i>
                </button>
              )}
            </motion.div>,
          )}
        </div>
      </section>

      <section className="home-trust-strip" aria-label="Luxmorai company highlights">
        <div className="home-container home-highlight-grid">
          <p>One team for your complete digital journey</p>
          {highlights.map(([value, label]) => (
            <div className="home-highlight" key={label}>
              <strong>{value}</strong><span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="home-section home-services-section">
        <div className="home-container">
          <motion.div className="home-heading home-heading-split" {...reveal}>
            <div>
              <p className="home-eyebrow">What we build</p>
              <h2>A complete platform for digital progress.</h2>
            </div>
            <p>From applied AI to dependable digital systems, one collaborative team brings strategy, design, engineering, and growth together.</p>
          </motion.div>
          <div className="home-service-grid">
            {services.map((service, index) => (
              <motion.article className="home-service-card" key={service.title} {...reveal} transition={{ delay: index * 0.05 }}>
                <span className="home-service-number">{service.number}</span>
                <span className="home-service-icon"><service.icon /></span>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <Link to={service.href} aria-label={`Learn more about ${service.title}`}>
                  Learn more <ArrowRight />
                </Link>
              </motion.article>
            ))}
          </div>
          <motion.div className="home-build-footer" {...reveal}>
            <p><span>One connected team</span> Clear thinking, careful delivery, and useful technology at every stage.</p>
            <Link to="/services">Explore all capabilities <ArrowRight /></Link>
          </motion.div>
        </div>
      </section>

      <section className="home-section home-partner-section">
        <div className="home-container home-partner-grid">
          <motion.div className="home-partner-media" {...reveal}>
            <img
              src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=85"
              alt="Product strategy meeting with a collaborative technology team"
            />
            <div className="home-experience-badge"><strong>20+</strong><span>Years of combined experience</span></div>
          </motion.div>
          <motion.div className="home-partner-copy" {...reveal} transition={{ delay: 0.1 }}>
            <p className="home-eyebrow">A better technology partner</p>
            <h2>Smart technology starts with understanding your business.</h2>
            <p>
              Good software is not just clean code. It should remove friction, make teams faster, and create a better
              experience for every person who uses it. That is why we begin with questions, not assumptions.
            </p>
            <div className="home-check-list">
              <span><Check /> Senior attention from discovery to launch</span>
              <span><Check /> Practical choices without unnecessary complexity</span>
              <span><Check /> Transparent progress and accountable delivery</span>
              <span><Check /> Long-term support after your product goes live</span>
            </div>
            <Link className="home-text-link" to="/about">Meet Luxmorai <ArrowRight /></Link>
          </motion.div>
        </div>
      </section>

      <section className="home-section home-process-section">
        <div className="home-container">
          <motion.div className="home-heading home-heading-centered" {...reveal}>
            <p className="home-eyebrow">How we work</p>
            <h2>A clear path from first conversation to lasting value.</h2>
            <p>No black box. You always know what we are building, why it matters, and what comes next.</p>
          </motion.div>
          <div className="home-process-grid">
            {process.map((item, index) => (
              <motion.article className="home-process-card" key={item.step} {...reveal} transition={{ delay: index * 0.08 }}>
                <div className="home-process-top"><span>0{index + 1}</span><item.icon /></div>
                <h3>{item.step}</h3><p>{item.text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section home-industries-section">
        <div className="home-container">
          <motion.div className="home-heading home-heading-split" {...reveal}>
            <div><p className="home-eyebrow home-eyebrow-light">Industry experience</p><h2>Built for the world your business operates in.</h2></div>
            <div><p>We combine technical depth with an understanding of workflows, customers, compliance, and growth.</p><Link to="/industries">View all industries <ArrowRight /></Link></div>
          </motion.div>
          <div className="home-industry-grid">
            {industries.slice(0, 4).map((industry, index) => (
              <motion.article className="home-industry-card" key={industry.slug} {...reveal} transition={{ delay: index * 0.07 }}>
                <img src={industry.image} alt={industry.title} />
                <div className="home-industry-overlay" />
                <div className="home-industry-content">
                  <industry.icon />
                  <h3>{industry.title}</h3>
                  <p>{industry.text}</p>
                  <Link to={`/industries/${industry.slug}`}><ArrowRight /></Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="home-testimonial-section" aria-label="The Luxmorai promise">
        <div className="home-testimonial-shape home-testimonial-shape-one" />
        <div className="home-testimonial-shape home-testimonial-shape-two" />
        <motion.blockquote className="home-testimonial" {...reveal}>
          <span className="home-testimonial-quote" aria-hidden="true">“</span>
          <p className="home-testimonial-kicker">What clients value most</p>
          <p className="home-testimonial-copy">
            Great technology is more than what gets built. It is a partner who listens closely, solves the right problems,
            communicates clearly, and stays accountable from first idea to lasting results.
          </p>
          <footer>
            <strong>The Luxmorai promise</strong>
            <span>Practical delivery, transparent progress, and long-term support.</span>
          </footer>
        </motion.blockquote>
      </section>

      <section className="home-section home-cta-section">
        <div className="home-container">
          <motion.div className="home-cta" {...reveal}>
            <div className="home-cta-shape" />
            <div>
              <p className="home-eyebrow home-eyebrow-light">Have an idea in mind?</p>
              <h2>Let’s build something your business can grow on.</h2>
            </div>
            <div className="home-cta-actions">
              <Link className="home-button home-button-white" to="/contact">Start a conversation <ArrowRight /></Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

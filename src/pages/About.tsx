import { ArrowRight, BadgeCheck, Building2, Check, ChevronRight, Lightbulb, MapPin, Rocket, ShieldCheck, Timer, UsersRound } from "lucide-react";
import { Link } from "react-router-dom";
import { useSeo } from "../lib/seo";

const pillars = [
  {
    icon: Rocket,
    title: "Our Mission",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=900&q=80",
    text:
      "Luxmorai Technologies' mission is to lead with practical technology solutions. We focus on making our clients successful by providing reliable software, thoughtful consulting, and delivery that stays close to real business needs.",
  },
  {
    icon: Lightbulb,
    title: "Our Vision",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=900&q=80",
    text:
      "We envision being a trusted technology partner for growing businesses worldwide. Our goal is to use modern engineering, AI, cloud, mobile, and data-driven systems to create opportunities for long-term growth.",
  },
  {
    icon: ShieldCheck,
    title: "Our Values",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80",
    text:
      "We value integrity, creativity, ownership, and continuous improvement. We work closely with clients, build lasting relationships, and deliver solutions with honesty, quality, and a strong sense of responsibility.",
  },
];

const companyStats = [
  { icon: Timer, value: "97%", label: "Delivered on time" },
  { icon: BadgeCheck, value: "450+", label: "Projects" },
  { icon: UsersRound, value: "50+", label: "Developers" },
  { icon: Building2, value: "6+", label: "Offices" },
];

const officeLocations = [
  {
    city: "Hyderabad",
    position: "left",
    address: "19/3RT, Line 2, Street 5, Prakash Nagar, Begumpet, Hyderabad, Telangana 500016",
    details: ["Head office", "Leadership & operations", "Client delivery coordination"],
  },
  {
    city: "Bangalore",
    position: "center",
    address: "Pritech Rd, Bellandur, Bengaluru, Karnataka 560103",
    details: ["Technology & innovation", "Product engineering", "Client collaboration"],
  },
  {
    city: "Chennai",
    position: "right",
    address: "25H9+8M6, Mount Poonamallee Rd, Porur, Chennai, Tamil Nadu 600116",
    details: ["Digital delivery team", "Web & mobile solutions", "Client support"],
  },
  { city: "Noida", position: "center", details: ["Business operations", "Technology consulting", "Project coordination"] },
  { city: "Coimbatore", position: "left", details: ["Engineering delivery", "Quality-focused development", "Ongoing product support"] },
  { city: "Visakhapatnam", position: "right", details: ["Software development", "Technical delivery", "Client support"] },
];

export function About() {
  useSeo({
    title: "About Luxmor AI | Custom Software and AI Development Company",
    description:
      "Learn about Luxmor AI, a technology partner building custom software, AI solutions, web platforms, mobile apps, cloud systems, and digital products.",
    path: "/about",
  });

  return (
    <>
      <section className="about-hero">
        <div className="about-hero-overlay" />
        <div className="relative mx-auto grid min-h-[370px] max-w-7xl content-center justify-items-center px-4 text-center sm:px-6 lg:px-8">
          <h1>About Us</h1>
          <div className="about-breadcrumb">
            <Link to="/">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <span>About Us</span>
          </div>
        </div>
      </section>

      <section className="about-intro-section">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.95fr_1fr] lg:px-8">
          <div className="about-logo-panel">
            <div className="about-logo-orbit">
              <img src="/luxmorai-logo.png" alt="Luxmorai Technologies Pvt Ltd" />
            </div>
          </div>

          <div className="about-copy">
            <p className="eyebrow">Who We Are</p>
            <h2>Technology that moves your business forward.</h2>
            <p>
              Luxmorai Technologies stands at the forefront of the IT industry, delivering software solutions and
              professional services for clients who want dependable digital execution. We specialize in strategic
              technology initiatives that help businesses move faster, modernize operations, and serve customers better.
            </p>
            <p>
              Our team believes in delivering the best product and services as per client needs and requirements. With
              expertise across web platforms, mobile applications, cloud systems, AI, testing, analytics, and digital
              growth, we help turn ambitious ideas into scalable products.
            </p>
            <p>
              We combine leadership, technical depth, and practical execution so every engagement is built around
              quality, clarity, and measurable business value.
            </p>
            <div className="about-copy-promises">
              <span><Check /> Clear, accountable delivery</span>
              <span><Check /> Senior technical expertise</span>
              <span><Check /> Support that lasts beyond launch</span>
            </div>
          </div>
        </div>
      </section>

      <section className="about-numbers-section" aria-labelledby="about-numbers-title">
        <div className="about-numbers-backdrop" aria-hidden="true" />
        <div className="about-numbers-content mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 id="about-numbers-title">Luxmorai in numbers</h2>
          <div className="about-numbers-grid">
            {companyStats.map((stat) => (
              <article className="about-number" key={stat.label}>
                <stat.icon aria-hidden="true" />
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-locations-section" aria-labelledby="office-locations-title">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="about-locations-heading">
            <h2 id="office-locations-title">Our locations</h2>
            <p>Offices</p>
          </div>
          <div className="about-locations-grid">
            {officeLocations.map((location) => (
              <article className="about-location-card" key={location.city}>
                <div className={`about-location-image about-location-image-${location.position}`} aria-hidden="true" />
                <div className="about-location-copy">
                  <h3>{location.city}</h3>
                  {location.address && <p className="about-location-address">{location.address}</p>}
                  <ul>
                    {location.details.map((detail, index) => (
                      <li key={detail}>{index === 0 ? <MapPin aria-hidden="true" /> : <span aria-hidden="true" />}{detail}</li>
                    ))}
                    <li><span aria-hidden="true" /> India</li>
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-pillars-section">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <p className="eyebrow">Our Core</p>
            <h2 className="section-title mx-auto">Our Core Strengths</h2>
          </div>

          <div className="about-pillars-grid">
            {pillars.map((pillar) => (
              <article className="about-pillar-card" key={pillar.title}>
                <div className="about-pillar-image">
                  <img src={pillar.image} alt={`${pillar.title} at Luxmorai`} />
                  <span>
                    <pillar.icon className="h-7 w-7" />
                  </span>
                </div>
                <h3>{pillar.title}</h3>
                <p>{pillar.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-cta-section">
        <div className="about-cta mx-auto max-w-7xl px-5 py-12 sm:px-10 sm:py-16 lg:px-16">
          <div>
            <p className="about-cta-kicker">Built around your next move</p>
            <h2>Bring the right team into your next big idea.</h2>
            <p>Tell us what you are building. We will help turn it into a clear, capable digital product.</p>
          </div>
          <Link to="/contact">Start a project <ArrowRight /></Link>
        </div>
      </section>
    </>
  );
}

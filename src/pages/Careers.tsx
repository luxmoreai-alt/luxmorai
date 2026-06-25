import { BriefcaseBusiness, Lightbulb, Rocket, Send, ShieldCheck, Users } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import { toast } from "sonner";
import { useSeo } from "../lib/seo";

const categories = ["Development", "Internship", "Testing", "Management", "Designing", "SEO"];

const openings = [
  { title: "Android Developer", category: "Development", experience: "1-4 years", type: "Full time" },
  { title: "React Native Developer", category: "Development", experience: "1-4 years", type: "Full time" },
  { title: "Angular Developer", category: "Development", experience: "1-4 years", type: "Full time" },
  { title: "Node.js Developer", category: "Development", experience: "2-5 years", type: "Full time" },
  { title: "Full Stack Developer", category: "Development", experience: "2-6 years", type: "Full time" },
  { title: "Mobile App Developer", category: "Development", experience: "1-5 years", type: "Full time" },
  { title: "Principal Architect", category: "Management", experience: "8+ years", type: "Full time" },
  { title: "Netsuite Developer", category: "Development", experience: "2-5 years", type: "Full time" },
  { title: "WordPress Developer", category: "Development", experience: "1-4 years", type: "Full time" },
  { title: "SharePoint Developer", category: "Development", experience: "2-5 years", type: "Full time" },
  { title: "MERN Stack Developer", category: "Development", experience: "1-5 years", type: "Full time" },
  { title: "Python Developer", category: "Development", experience: "1-5 years", type: "Full time" },
  { title: "Software Testing Engineer", category: "Testing", experience: "1-4 years", type: "Full time" },
  { title: "UI/UX Designer", category: "Designing", experience: "1-4 years", type: "Full time" },
  { title: "SEO Executive", category: "SEO", experience: "0-3 years", type: "Full time" },
  { title: "Software Developer Intern", category: "Internship", experience: "Fresher", type: "Internship" },
];

const careerFeatures = [
  {
    icon: Rocket,
    title: "Growth-Focused Work",
    text: "Build practical products across software, mobile, AI, cloud, and testing with real ownership.",
  },
  {
    icon: Lightbulb,
    title: "Learning Culture",
    text: "Work with modern tools and delivery teams that help you grow depth, speed, and confidence.",
  },
  {
    icon: ShieldCheck,
    title: "Quality Mindset",
    text: "Be part of a team that values clean execution, dependable delivery, and thoughtful engineering.",
  },
  {
    icon: Users,
    title: "Supportive Team",
    text: "Collaborate with people who communicate clearly, share knowledge, and care about outcomes.",
  },
];

export function Careers() {
  const [activeCategory, setActiveCategory] = useState("Development");
  const fullTimeOpenings = useMemo(() => openings.filter((opening) => opening.type === "Full time").length, []);

  useSeo({
    title: "Careers at Luxmor AI | Software, AI, Mobile, Testing & SEO Jobs",
    description:
      "Explore career opportunities at Luxmor AI across software development, mobile app development, testing, UI/UX design, SEO, internships, and technology leadership roles.",
    path: "/careers",
  });

  const filteredOpenings = useMemo(
    () => openings.filter((opening) => opening.category === activeCategory),
    [activeCategory],
  );

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    toast.success("Career application captured. Our team will review it.");
    event.currentTarget.reset();
  }

  return (
    <>
      <section className="careers-hero">
        <div className="careers-hero-inner mx-auto grid max-w-7xl content-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8">
          <div className="career-hero-copy">
            <p className="eyebrow">Careers</p>
            <h1>Careers</h1>
            <p>
              Build practical digital products with a team focused on software, apps, cloud, AI, testing, and business
              technology.
            </p>
            <p className="career-hero-note">Hands-on mentorship <span /> Real product ownership <span /> Room to grow</p>
            <div className="career-hero-metrics" aria-label="Career quick highlights">
              <div className="career-hero-metric">
                <strong>{openings.length}+</strong>
                <span>open roles</span>
              </div>
              <div className="career-hero-metric">
                <strong>{categories.length}</strong>
                <span>career tracks</span>
              </div>
              <div className="career-hero-metric">
                <strong>{fullTimeOpenings}</strong>
                <span>full-time positions</span>
              </div>
            </div>
            <div className="career-hero-actions">
              <a className="primary-button" href="#career-apply">
                Apply Now
              </a>
              <a className="secondary-button" href="#career-openings">
                View Openings
              </a>
            </div>
          </div>
          <div className="career-hero-media">
            <img
              src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1400&q=80"
              alt="Team collaborating on career opportunities"
            />
            <div className="career-hero-media-note">
              <span>Better, together</span>
              <strong>Good ideas move faster when the whole team is in the room.</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="career-values-section">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div className="career-values-copy">
            <p className="eyebrow">Why Join Us</p>
            <h2>Why build your career with Luxmorai?</h2>
            <p>
              We create opportunities for curious builders who want to work on modern products, sharpen their skills,
              and deliver quality with a supportive team.
            </p>
          </div>

          <div className="career-values-grid">
            {careerFeatures.map((feature) => (
              <article className="career-value-card" key={feature.title}>
                <span className="career-value-icon">
                  <feature.icon className="h-10 w-10" />
                </span>
                <div>
                  <h3>{feature.title}</h3>
                  <p>{feature.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-band bg-slate-50" id="career-openings">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <p className="eyebrow">Current Openings</p>
            <h2 className="section-title mx-auto">Current Openings</h2>
          </div>

          <div className="career-tabs" role="tablist" aria-label="Career categories">
            {categories.map((category) => (
              <button
                className={category === activeCategory ? "active" : ""}
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="career-openings-grid">
            {filteredOpenings.map((opening) => (
              <article className="career-opening-card" key={opening.title}>
                <div className="career-opening-icon">
                  <BriefcaseBusiness className="h-20 w-20" />
                </div>
                <h3>{opening.title}</h3>
                <p>
                  {opening.experience} | {opening.type}
                </p>
                <a href="#career-apply">More Details</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-band bg-white" id="career-apply">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <p className="eyebrow">Come Work With Us</p>
            <h2 className="section-title mx-auto">Come work with us</h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Do not be shy. Drop us a line and our team will get back to you as soon as possible.
            </p>
          </div>

          <form className="career-form" onSubmit={onSubmit}>
            <label>
              Name *
              <input name="name" required />
            </label>
            <label>
              Email *
              <input name="email" required type="email" />
            </label>
            <label>
              Phone No *
              <input name="phone" required />
            </label>
            <label>
              Relevant Exp *
              <input name="relevantExperience" required />
            </label>
            <label>
              Total Exp *
              <input name="totalExperience" required />
            </label>
            <label>
              Current CTC *
              <input name="currentCtc" required />
            </label>
            <label>
              Career Gap (Reason)
              <input name="careerGap" />
            </label>
            <label>
              Expected CTC (Offer if any) *
              <input name="expectedCtc" required />
            </label>
            <label>
              Apply For *
              <select name="role" required defaultValue="">
                <option value="" disabled>
                  Select role
                </option>
                {openings.map((opening) => (
                  <option key={opening.title}>{opening.title}</option>
                ))}
              </select>
            </label>
            <label>
              Message
              <textarea name="message" rows={4} />
            </label>
            <button className="primary-button light" type="submit">
              <Send className="h-4 w-4" />
              Submit Application
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

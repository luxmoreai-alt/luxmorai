import { BriefcaseBusiness, Lightbulb, Rocket, Send, ShieldCheck, Users } from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import {
  CareerJob,
  getCareerJobs,
  sendCareerApplication,
  trackCareerApplication,
  TrackingApplication,
} from "../lib/api";

const categories = ["Development", "Internship", "Testing", "Management", "Designing", "SEO"];

const openings: CareerJob[] = [
  { id: 1, title: "Android Developer", category: "Development", experience: "1-4 years", type: "Full time" },
  { id: 2, title: "React Native Developer", category: "Development", experience: "1-4 years", type: "Full time" },
  { id: 3, title: "Angular Developer", category: "Development", experience: "1-4 years", type: "Full time" },
  { id: 4, title: "Node.js Developer", category: "Development", experience: "2-5 years", type: "Full time" },
  { id: 5, title: "Full Stack Developer", category: "Development", experience: "2-6 years", type: "Full time" },
  { id: 6, title: "Mobile App Developer", category: "Development", experience: "1-5 years", type: "Full time" },
  { id: 7, title: "Principal Architect", category: "Management", experience: "8+ years", type: "Full time" },
  { id: 8, title: "Netsuite Developer", category: "Development", experience: "2-5 years", type: "Full time" },
  { id: 9, title: "WordPress Developer", category: "Development", experience: "1-4 years", type: "Full time" },
  { id: 10, title: "SharePoint Developer", category: "Development", experience: "2-5 years", type: "Full time" },
  { id: 11, title: "MERN Stack Developer", category: "Development", experience: "1-5 years", type: "Full time" },
  { id: 12, title: "Python Developer", category: "Development", experience: "1-5 years", type: "Full time" },
  { id: 13, title: "Software Testing Engineer", category: "Testing", experience: "1-4 years", type: "Full time" },
  { id: 14, title: "UI/UX Designer", category: "Designing", experience: "1-4 years", type: "Full time" },
  { id: 15, title: "SEO Executive", category: "SEO", experience: "0-3 years", type: "Full time" },
  { id: 16, title: "Software Developer Intern", category: "Internship", experience: "Fresher", type: "Internship" },
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
  const [jobs, setJobs] = useState<CareerJob[]>(openings);
  const [activeCategory, setActiveCategory] = useState("Development");
  const [loadingJobs, setLoadingJobs] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState("");
  const [detailJobId, setDetailJobId] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [latestTrackingId, setLatestTrackingId] = useState("");
  const [trackingLoading, setTrackingLoading] = useState(false);
  const [trackingResult, setTrackingResult] = useState<TrackingApplication | null>(null);

  const fullTimeOpenings = useMemo(() => jobs.filter((opening) => opening.type === "Full time").length, [jobs]);
  const detailJob = useMemo(
    () => jobs.find((opening) => String(opening.id) === detailJobId) ?? null,
    [detailJobId, jobs],
  );

  const filteredOpenings = useMemo(
    () => jobs.filter((opening) => opening.category === activeCategory),
    [activeCategory, jobs],
  );

  useEffect(() => {
    let mounted = true;
    setLoadingJobs(true);

    getCareerJobs()
      .then((items) => {
        if (!mounted) return;
        if (items.length > 0) {
          setJobs(items);
          setActiveCategory(items[0].category);
        }
      })
      .catch(() => {
        toast.error("Could not load current openings. Showing default roles for now.");
      })
      .finally(() => {
        if (mounted) setLoadingJobs(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const jobId = String(data.get("jobId") ?? "");
    const selectedJob = jobs.find((job) => String(job.id) === jobId);

    if (selectedJob) {
      data.set("jobId", String(selectedJob.id));
      data.set("role", selectedJob.title);
    }

    setSubmitting(true);
    try {
      const result = await sendCareerApplication(data);
      setLatestTrackingId(result.trackingId);
      toast.success(
        result.emailSent
          ? `Application submitted. Confirmation email sent with number ${result.trackingId}.`
          : `Application submitted. Your application number is ${result.trackingId}.`,
      );
      form.reset();
      setSelectedJobId("");
    } catch {
      toast.error("Application could not be submitted. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  async function onTrackSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setTrackingLoading(true);
    setTrackingResult(null);

    try {
      const application = await trackCareerApplication({
        trackingId: String(data.get("trackingId") ?? "").replace(/\D/g, ""),
        email: String(data.get("email") ?? ""),
        phone: String(data.get("phone") ?? ""),
      });
      setTrackingResult(application);
    } catch {
      toast.error("No application found with those details.");
    } finally {
      setTrackingLoading(false);
    }
  }

  function selectJob(opening: CareerJob) {
    setSelectedJobId(String(opening.id));
    setDetailJobId(String(opening.id));
    requestAnimationFrame(() => {
      document.querySelector("#career-details")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  function renderInlineText(text: string) {
    return text.split(/(\*\*[^*]+\*\*)/g).map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={`${part}-${index}`}>{part.slice(2, -2)}</strong>;
      }
      return <span key={`${part}-${index}`}>{part}</span>;
    });
  }

  function renderJobText(text: string, fallback: string) {
    const lines = (text || fallback).split(/\r?\n/).map((line) => line.trim()).filter(Boolean);

    return lines.map((line, index) => {
      const bullet = line.match(/^[-*•]\s+(.*)$/);
      const heading = line.endsWith(":") && line.length <= 80;

      if (heading) {
        return <h3 key={`${line}-${index}`}>{renderInlineText(line.replace(/\*\*/g, ""))}</h3>;
      }

      if (bullet) {
        return (
          <p className="career-detail-bullet" key={`${line}-${index}`}>
            {renderInlineText(bullet[1])}
          </p>
        );
      }

      return <p key={`${line}-${index}`}>{renderInlineText(line)}</p>;
    });
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
                <strong>{jobs.length}</strong>
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
              <a className="secondary-button" href="http://127.0.0.1:8000/admin/" target="_blank" rel="noreferrer">
                Admin Panel
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
            {loadingJobs && <p className="career-empty-state">Loading current openings...</p>}
            {!loadingJobs && jobs.length === 0 && (
              <p className="career-empty-state">No active openings are posted yet. Add jobs from the admin panel.</p>
            )}
            {filteredOpenings.map((opening) => (
              <article className="career-opening-card" key={opening.id}>
                <div className="career-opening-icon">
                  <BriefcaseBusiness className="h-20 w-20" />
                </div>
                <h3>{opening.title}</h3>
                <p>
                  {opening.experience} | {opening.type}
                </p>
                {opening.location && <p>{opening.location}</p>}
                {opening.description && <span>{opening.description}</span>}
                <button type="button" onClick={() => selectJob(opening)}>
                  More Details
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {detailJob && (
        <section className="career-detail-section" id="career-details">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <article className="career-detail-panel">
              <div className="career-detail-head">
                <div className="career-detail-icon">
                  <BriefcaseBusiness className="h-16 w-16" />
                </div>
                <div>
                  <p className="eyebrow">{detailJob.category}</p>
                  <h2>{detailJob.title}</h2>
                  <div className="career-detail-meta">
                    <span>{detailJob.experience}</span>
                    <span>{detailJob.type}</span>
                    {detailJob.location && <span>{detailJob.location}</span>}
                  </div>
                </div>
              </div>

              <div className="career-detail-content">
                {renderJobText(
                  detailJob.description ?? "",
                  "About the Role:\nWe are seeking a skilled and motivated professional to join our team and contribute to high-quality digital product delivery.\nKey Responsibilities:\n- Work with the team to design, build, and maintain reliable solutions.\n- Collaborate with stakeholders to understand requirements and deliver clear outcomes.\n- Follow quality standards, communicate clearly, and take ownership of assigned work.",
                )}
                {detailJob.requirements && (
                  <>
                    <h3>Required Qualifications:</h3>
                    {renderJobText(detailJob.requirements, "")}
                  </>
                )}
                <h3>How to Apply:</h3>
                <p>Interested candidates can submit their resume and details using the application form below.</p>
              </div>

              <a className="primary-button career-detail-apply" href="#career-apply">
                Apply for this Job
              </a>
            </article>
          </div>
        </section>
      )}

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
              <select
                name="jobId"
                required
                value={selectedJobId}
                onChange={(event) => setSelectedJobId(event.target.value)}
              >
                <option value="" disabled>
                  Select role
                </option>
                {jobs.map((opening) => (
                  <option key={opening.id} value={opening.id}>
                    {opening.title}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Resume *
              <input name="resume" required type="file" accept=".pdf,.doc,.docx" />
            </label>
            <label>
              Message
              <textarea name="message" rows={4} />
            </label>
            <input name="role" type="hidden" value={jobs.find((job) => String(job.id) === selectedJobId)?.title ?? ""} />
            <button className="primary-button light" disabled={submitting || jobs.length === 0} type="submit">
              <Send className="h-4 w-4" />
              {submitting ? "Submitting..." : "Submit Application"}
            </button>
          </form>
          {latestTrackingId && (
            <div className="career-tracking-success">
              <strong>Application submitted successfully.</strong>
              <span>Your application number is {latestTrackingId}. Use this with your email and phone to track status.</span>
            </div>
          )}
        </div>
      </section>

      <section className="career-track-section" id="career-track">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="career-track-grid">
            <div className="career-track-copy">
              <p className="eyebrow">Track Application</p>
              <h2>Check your job application status</h2>
              <p>Enter your application number, email, and phone number to see the latest status from our hiring team.</p>
            </div>

            <form className="career-track-form" onSubmit={onTrackSubmit}>
              <input name="trackingId" required placeholder="Application number, example 98405703" />
              <input name="email" required type="email" placeholder="Email used while applying" />
              <input name="phone" required placeholder="Phone number used while applying" />
              <button className="primary-button" disabled={trackingLoading} type="submit">
                {trackingLoading ? "Checking..." : "Track Status"}
              </button>
            </form>
          </div>

          {trackingResult && (
            <article className="career-track-result">
              <div>
                <span>Application {trackingResult.applicationNumber}</span>
                <h3>{trackingResult.role}</h3>
                <p>{trackingResult.name}</p>
              </div>
              <div className="career-status-card">
                <strong>{trackingResult.status}</strong>
                <p>
                  {trackingResult.statusReason ||
                    "Your application is in our hiring workflow. Please check again later for more details."}
                </p>
              </div>
            </article>
          )}
        </div>
      </section>
    </>
  );
}

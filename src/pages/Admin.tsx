import {
  BriefcaseBusiness,
  CheckCircle2,
  Download,
  FileText,
  LogOut,
  Mail,
  Phone,
  Plus,
  RefreshCw,
  UserRound,
} from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import {
  AdminApplication,
  CareerJob,
  createAdminJob,
  getAdminApplications,
  getAdminJobs,
  toggleAdminJob,
  updateAdminApplicationStatus,
} from "../lib/api";

const statuses = ["new", "reviewing", "shortlisted", "rejected", "hired"];
const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL ?? "careers@admin.com";
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD ?? "Careers@admin@2026";
const ADMIN_AUTH_KEY = "luxmorai-admin-authenticated";

export function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => localStorage.getItem(ADMIN_AUTH_KEY) === "true");
  const [jobs, setJobs] = useState<CareerJob[]>([]);
  const [applications, setApplications] = useState<AdminApplication[]>([]);
  const [activeView, setActiveView] = useState<"jobs" | "applications">("jobs");
  const [loading, setLoading] = useState(true);
  const [savingJob, setSavingJob] = useState(false);
  const [selectedApplicationId, setSelectedApplicationId] = useState<number | null>(null);
  const [status, setStatus] = useState("new");
  const [statusReason, setStatusReason] = useState("");
  const [notes, setNotes] = useState("");

  const selectedApplication = useMemo(
    () => applications.find((application) => application.id === selectedApplicationId) ?? applications[0],
    [applications, selectedApplicationId],
  );

  const openJobs = jobs.length;
  const newApplications = applications.filter((application) => application.status === "new").length;

  function submitLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") ?? "").trim();
    const password = String(data.get("password") ?? "");

    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      toast.error("Invalid admin credentials.");
      return;
    }

    localStorage.setItem(ADMIN_AUTH_KEY, "true");
    setIsAuthenticated(true);
    toast.success("Admin login successful.");
  }

  function logout() {
    localStorage.removeItem(ADMIN_AUTH_KEY);
    setIsAuthenticated(false);
    setJobs([]);
    setApplications([]);
  }

  async function loadDashboard() {
    setLoading(true);
    try {
      const [jobItems, applicationItems] = await Promise.all([getAdminJobs(), getAdminApplications()]);
      setJobs(jobItems);
      setApplications(applicationItems);
      setSelectedApplicationId((current) => current ?? applicationItems[0]?.id ?? null);
    } catch {
      toast.error("Admin data could not be loaded. Check that Django is running.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      loadDashboard();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    setStatus(selectedApplication?.status ?? "new");
    setStatusReason(selectedApplication?.statusReason ?? "");
    setNotes(selectedApplication?.notes ?? "");
  }, [selectedApplication?.id, selectedApplication?.notes, selectedApplication?.status, selectedApplication?.statusReason]);

  async function submitJob(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      title: String(data.get("title") ?? ""),
      category: String(data.get("category") ?? ""),
      experience: String(data.get("experience") ?? ""),
      type: String(data.get("type") ?? ""),
      location: String(data.get("location") ?? ""),
      description: String(data.get("description") ?? ""),
      requirements: String(data.get("requirements") ?? ""),
      isActive: data.get("isActive") === "on",
    };

    setSavingJob(true);
    try {
      const job = await createAdminJob(payload);
      setJobs((current) => [...current, job]);
      toast.success("Job posted successfully.");
      form.reset();
    } catch {
      toast.error("Job could not be posted.");
    } finally {
      setSavingJob(false);
    }
  }

  async function toggleJob(job: CareerJob) {
    try {
      const result = await toggleAdminJob(job.id);
      setJobs((current) => current.map((item) => (item.id === job.id ? result.job : item)));
      toast.success(result.isActive ? "Job is active." : "Job is hidden.");
    } catch {
      toast.error("Job status could not be changed.");
    }
  }

  async function saveApplicationStatus(application: AdminApplication) {
    try {
      const result = await updateAdminApplicationStatus(application.id, status, statusReason, notes);
      const updated = result.application;
      setApplications((current) => current.map((item) => (item.id === application.id ? updated : item)));
      toast.success(result.emailSent ? "Application updated and email sent." : "Application updated.");
    } catch {
      toast.error("Application could not be updated.");
    }
  }

  if (!isAuthenticated) {
    return (
      <section className="admin-page">
        <div className="admin-login-shell">
          <form className="admin-login-card" onSubmit={submitLogin}>
            <p className="eyebrow">Careers Admin</p>
            <h1>Admin Login</h1>
            <label>
              Email
              <input name="email" required type="email" autoComplete="username" />
            </label>
            <label>
              Password
              <input name="password" required type="password" autoComplete="current-password" />
            </label>
            <button className="primary-button" type="submit">
              Login
            </button>
          </form>
        </div>
      </section>
    );
  }

  return (
    <section className="admin-page">
      <div className="admin-shell">
        <div className="admin-hero">
          <div>
            <p className="eyebrow">Careers Admin</p>
            <h1>Manage job posts and applicants</h1>
            <p>Publish roles, review candidate details, download resumes, and track each application from one panel.</p>
          </div>
          <div className="admin-hero-actions">
            <button className="admin-icon-button" type="button" onClick={loadDashboard} aria-label="Refresh admin data">
              <RefreshCw />
            </button>
            <button className="admin-icon-button" type="button" onClick={logout} aria-label="Logout">
              <LogOut />
            </button>
          </div>
        </div>

        <div className="admin-stats">
          <div>
            <BriefcaseBusiness />
            <span>Jobs</span>
            <strong>{openJobs}</strong>
          </div>
          <div>
            <FileText />
            <span>Applications</span>
            <strong>{applications.length}</strong>
          </div>
          <div>
            <CheckCircle2 />
            <span>New</span>
            <strong>{newApplications}</strong>
          </div>
        </div>

        <div className="admin-tabs" role="tablist" aria-label="Admin sections">
          <button className={activeView === "jobs" ? "active" : ""} type="button" onClick={() => setActiveView("jobs")}>
            Job Posting
          </button>
          <button
            className={activeView === "applications" ? "active" : ""}
            type="button"
            onClick={() => setActiveView("applications")}
          >
            Applied Details
          </button>
        </div>

        {loading ? (
          <div className="admin-empty">Loading admin panel...</div>
        ) : activeView === "jobs" ? (
          <div className="admin-grid">
            <form className="admin-form" onSubmit={submitJob}>
              <h2>Post a Job</h2>
              <input name="title" required placeholder="Job title" />
              <div className="admin-form-row">
                <input name="category" required placeholder="Category" />
                <input name="experience" required placeholder="Experience" />
              </div>
              <div className="admin-form-row">
                <input name="type" required placeholder="Full time / Internship" />
                <input name="location" placeholder="Location" />
              </div>
              <textarea name="description" rows={4} placeholder="Job description" />
              <textarea name="requirements" rows={4} placeholder="Requirements" />
              <label className="admin-check">
                <input name="isActive" type="checkbox" defaultChecked />
                Active on careers page
              </label>
              <button className="primary-button" disabled={savingJob} type="submit">
                <Plus className="h-4 w-4" />
                {savingJob ? "Posting..." : "Post Job"}
              </button>
            </form>

            <div className="admin-list">
              <h2>Posted Jobs</h2>
              {jobs.length === 0 ? (
                <p className="admin-empty">No jobs posted yet.</p>
              ) : (
                jobs.map((job) => (
                  <article className="admin-job-row" key={job.id}>
                    <div>
                      <strong>{job.title}</strong>
                      <span>
                        {job.category} | {job.experience} | {job.type}
                      </span>
                    </div>
                    <button type="button" onClick={() => toggleJob(job)}>
                      Hide / Show
                    </button>
                  </article>
                ))
              )}
            </div>
          </div>
        ) : (
          <div className="admin-applications">
            <div className="admin-candidate-list">
              {applications.length === 0 ? (
                <p className="admin-empty">No applications submitted yet.</p>
              ) : (
                applications.map((application) => (
                  <button
                    className={application.id === selectedApplication?.id ? "active" : ""}
                    key={application.id}
                    type="button"
                    onClick={() => setSelectedApplicationId(application.id)}
                  >
                    <small>{application.applicationNumber}</small>
                    <span>{application.name}</span>
                    <strong>{application.role}</strong>
                    <em>{application.status}</em>
                  </button>
                ))
              )}
            </div>

            {selectedApplication && (
              <article className="admin-candidate-detail">
                <div className="admin-candidate-head">
                  <div>
                    <span>
                      <UserRound /> Candidate Profile
                    </span>
                    <h2>{selectedApplication.name}</h2>
                    <p>{selectedApplication.role} | {selectedApplication.applicationNumber}</p>
                  </div>
                  <a href={selectedApplication.resumeUrl} target="_blank" rel="noreferrer">
                    <Download />
                    Resume
                  </a>
                </div>

                <div className="admin-candidate-meta">
                  <span>
                    <Mail /> {selectedApplication.email}
                  </span>
                  <span>
                    <Phone /> {selectedApplication.phone}
                  </span>
                  <span>Total exp: {selectedApplication.totalExperience}</span>
                  <span>Relevant exp: {selectedApplication.relevantExperience}</span>
                  <span>Current CTC: {selectedApplication.currentCtc}</span>
                  <span>Expected CTC: {selectedApplication.expectedCtc}</span>
                </div>

                <div className="admin-status-row">
                  <select
                    value={status}
                    onChange={(event) => setStatus(event.target.value)}
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                  <textarea
                    value={statusReason}
                    onChange={(event) => setStatusReason(event.target.value)}
                    rows={3}
                    placeholder="Reason shown to candidate"
                  />
                  <textarea
                    value={notes}
                    onChange={(event) => setNotes(event.target.value)}
                    rows={3}
                    placeholder="Internal notes for admin only"
                  />
                  <button type="button" onClick={() => saveApplicationStatus(selectedApplication)}>
                    Save Status
                  </button>
                </div>

                {(selectedApplication.careerGap || selectedApplication.message) && (
                  <div className="admin-message-box">
                    {selectedApplication.careerGap && <p>Career gap: {selectedApplication.careerGap}</p>}
                    {selectedApplication.message && <p>{selectedApplication.message}</p>}
                  </div>
                )}
              </article>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

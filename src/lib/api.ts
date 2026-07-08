import axios from "axios";

const defaultApiUrl =
  typeof window === "undefined" ? "http://127.0.0.1:8000/api" : `${window.location.protocol}//${window.location.hostname}:8000/api`;

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? defaultApiUrl,
  timeout: 12000,
});

export type InquiryPayload = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
};

export async function sendInquiry(payload: InquiryPayload) {
  return api.post("/inquiries/", payload);
}

export type CareerJob = {
  id: number;
  title: string;
  category: string;
  experience: string;
  type: string;
  location?: string;
  description?: string;
  requirements?: string;
  isActive?: boolean;
};

export type AdminApplication = {
  id: number;
  applicationNumber: string;
  jobId: number | null;
  role: string;
  name: string;
  email: string;
  phone: string;
  relevantExperience: string;
  totalExperience: string;
  currentCtc: string;
  expectedCtc: string;
  careerGap: string;
  message: string;
  resumeUrl: string;
  status: string;
  statusReason: string;
  notes: string;
  createdAt: string;
};

export type TrackingApplication = {
  id: number;
  applicationNumber: string;
  role: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  statusReason: string;
  createdAt: string;
};

export type JobPayload = {
  title: string;
  category: string;
  experience: string;
  type: string;
  location: string;
  description: string;
  requirements: string;
  isActive: boolean;
};

export async function getCareerJobs() {
  const response = await api.get<{ jobs: CareerJob[] }>("/jobs/");
  return response.data.jobs;
}

export async function sendCareerApplication(payload: FormData) {
  const response = await api.post<{ id: number; trackingId: string; applicationNumber: string; emailSent: boolean; message: string }>(
    "/applications/",
    payload,
  );
  return response.data;
}

export async function trackCareerApplication(payload: { trackingId: string; email: string; phone: string }) {
  const response = await api.post<{ application: TrackingApplication }>("/applications/track/", payload);
  return response.data.application;
}

export async function getAdminJobs() {
  const response = await api.get<{ jobs: CareerJob[] }>("/admin/jobs/");
  return response.data.jobs;
}

export async function createAdminJob(payload: JobPayload) {
  const response = await api.post<{ job: CareerJob }>("/admin/jobs/", payload);
  return response.data.job;
}

export async function toggleAdminJob(jobId: number) {
  const response = await api.post<{ job: CareerJob; isActive: boolean }>(`/admin/jobs/${jobId}/toggle/`);
  return response.data;
}

export async function getAdminApplications() {
  const response = await api.get<{ applications: AdminApplication[] }>("/admin/applications/");
  return response.data.applications;
}

export async function updateAdminApplicationStatus(
  applicationId: number,
  status: string,
  statusReason: string,
  notes: string,
) {
  const response = await api.post<{ application: AdminApplication; emailSent: boolean }>(`/admin/applications/${applicationId}/status/`, {
    status,
    statusReason,
    notes,
  });
  return response.data;
}

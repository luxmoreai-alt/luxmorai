import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "https://luxmoraiback.vercel.app/api";

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 12000,
  headers: {
    "Content-Type": "application/json",
  },
});

export type InquiryPayload = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
};

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
  careerGap?: string;
  message?: string;
  resumeUrl: string;
  status: string;
  statusReason?: string;
  notes?: string;
  createdAt: string;
};

export type TrackingApplication = Pick<
  AdminApplication,
  "id" | "applicationNumber" | "role" | "name" | "email" | "phone" | "status" | "statusReason" | "createdAt"
>;

export type BlogSection = {
  heading: string;
  body: string;
};

export type ApiBlogPost = {
  id: number;
  slug: string;
  title: string;
  description: string;
  image: string;
  imageUrl?: string;
  imageAlt: string;
  brief: string;
  keyword: string;
  relatedKeywords: string[];
  sections: BlogSection[];
  servicePath: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
};

export async function sendInquiry(payload: InquiryPayload) {
  return api.post("/inquiries/", payload);
}

export async function getBlogPosts() {
  const response = await api.get<{ posts: ApiBlogPost[] }>("/blog-posts/");
  return response.data.posts;
}

export async function getBlogPost(slug: string) {
  const response = await api.get<{ post: ApiBlogPost }>(`/blog-posts/${slug}/`);
  return response.data.post;
}

export async function getCareerJobs() {
  const response = await api.get<{ jobs: CareerJob[] }>("/jobs/");
  return response.data.jobs;
}

export async function sendCareerApplication(payload: FormData) {
  const response = await api.post<{ trackingId: string; applicationNumber: string; emailSent: boolean }>(
    "/applications/",
    payload,
    { headers: { "Content-Type": "multipart/form-data" } },
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

export async function getAdminBlogPosts() {
  const response = await api.get<{ posts: ApiBlogPost[] }>("/admin/blog-posts/");
  return response.data.posts;
}

export async function createAdminBlogPost(payload: FormData) {
  const response = await api.post<{ post: ApiBlogPost }>("/admin/blog-posts/", payload, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data.post;
}

export async function updateAdminBlogPost(postId: number, payload: FormData) {
  const response = await api.post<{ post: ApiBlogPost }>(`/admin/blog-posts/${postId}/`, payload, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data.post;
}

export async function toggleAdminBlogPost(postId: number) {
  const response = await api.post<{ post: ApiBlogPost; isPublished: boolean }>(`/admin/blog-posts/${postId}/toggle/`);
  return response.data;
}

export async function createAdminJob(payload: Omit<CareerJob, "id">) {
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
  const response = await api.post<{ application: AdminApplication; emailSent: boolean }>(
    `/admin/applications/${applicationId}/status/`,
    { status, statusReason, notes },
  );
  return response.data;
}

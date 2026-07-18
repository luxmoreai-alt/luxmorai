import axios from "axios";

const API_BASE_URL = import.meta.env.PROD ? "https://luxmoraiback.vercel.app/api" : "/api";
const ADMIN_TOKEN_KEY = "luxmorai-admin-token";

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 12000,
  headers: {
    "Content-Type": "application/json",
  },
});

function getAdminToken() {
  return sessionStorage.getItem(ADMIN_TOKEN_KEY);
}

export function hasAdminSession() {
  return Boolean(getAdminToken());
}

export function clearAdminSession() {
  sessionStorage.removeItem(ADMIN_TOKEN_KEY);
}

api.interceptors.request.use((config) => {
  const token = getAdminToken();
  if (token && String(config.url ?? "").includes("/admin/")) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && String(error.config?.url ?? "").includes("/admin/")) {
      clearAdminSession();
    }
    return Promise.reject(error);
  },
);

export async function authenticateAdmin(email: string, password: string) {
  const response = await api.post<{ token: string; expiresIn: number }>("/admin/auth/login/", { email, password });
  sessionStorage.setItem(ADMIN_TOKEN_KEY, response.data.token);
  return response.data;
}

export async function verifyAdminSession() {
  const response = await api.get<{ authenticated: boolean }>("/admin/auth/session/");
  return response.data.authenticated;
}

export type InquiryPayload = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  privacyConsent: boolean;
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
  currentAddress: string;
  currentPostalCode: string;
  permanentAddress: string;
  permanentPostalCode: string;
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

function resolveApiAssetUrl(url: string) {
  if (!url || !url.startsWith("/api/")) return url;
  return `${API_BASE_URL}${url.slice(4)}`;
}

function normalizeBlogPost(post: ApiBlogPost): ApiBlogPost {
  return {
    ...post,
    image: resolveApiAssetUrl(post.image),
  };
}

export async function sendInquiry(payload: InquiryPayload) {
  return api.post("/inquiries/", payload);
}

export async function getBlogPosts() {
  const response = await api.get<{ posts: ApiBlogPost[] }>("/blog-posts/");
  return response.data.posts.map(normalizeBlogPost);
}

export async function getBlogPost(slug: string) {
  const response = await api.get<{ post: ApiBlogPost }>(`/blog-posts/${slug}/`);
  return normalizeBlogPost(response.data.post);
}

export async function getCareerJobs() {
  const response = await api.get<{ jobs: CareerJob[] }>("/jobs/");
  if (!response.data || !Array.isArray(response.data.jobs)) {
    throw new Error("The careers API returned an invalid jobs response.");
  }
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
  return response.data.posts.map(normalizeBlogPost);
}

export async function createAdminBlogPost(payload: FormData) {
  const response = await api.post<{ post: ApiBlogPost }>("/admin/blog-posts/", payload, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return normalizeBlogPost(response.data.post);
}

export async function updateAdminBlogPost(postId: number, payload: FormData) {
  const response = await api.post<{ post: ApiBlogPost }>(`/admin/blog-posts/${postId}/`, payload, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return normalizeBlogPost(response.data.post);
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

export async function downloadAdminResume(resumePath: string, filename: string) {
  const response = await api.get<Blob>(resumePath, { responseType: "blob" });
  const objectUrl = URL.createObjectURL(response.data);
  const link = document.createElement("a");
  link.href = objectUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(objectUrl);
}

export async function openAdminResume(resumePath: string) {
  const previewWindow = window.open("about:blank", "_blank");
  if (!previewWindow) {
    throw new Error("The browser blocked the resume preview window.");
  }

  previewWindow.opener = null;
  previewWindow.document.title = "Loading resume...";
  previewWindow.document.body.textContent = "Loading resume...";

  try {
    const response = await api.get<Blob>(resumePath, { responseType: "blob" });
    const contentType = String(response.headers["content-type"] ?? response.data.type ?? "application/octet-stream");
    const previewBlob = response.data.type ? response.data : new Blob([response.data], { type: contentType });
    const objectUrl = URL.createObjectURL(previewBlob);
    previewWindow.location.replace(objectUrl);
    window.setTimeout(() => URL.revokeObjectURL(objectUrl), 5 * 60 * 1000);
  } catch (error) {
    previewWindow.close();
    throw error;
  }
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

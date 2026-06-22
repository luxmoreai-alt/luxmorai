import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "https://api.luxmorai.com",
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

export async function sendInquiry(payload: InquiryPayload) {
  return api.post("/inquiries", payload);
}

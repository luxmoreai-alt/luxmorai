import axios from "axios";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mvzjzgql";

export type InquiryPayload = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
};

export async function sendInquiry(payload: InquiryPayload) {
  return axios.post(FORMSPREE_ENDPOINT, payload, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    timeout: 12000,
  });
}

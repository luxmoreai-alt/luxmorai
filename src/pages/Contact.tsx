import { Send } from "lucide-react";
import { FormEvent, useRef, useState } from "react";
import { toast } from "sonner";
import { Section } from "../components/Section";
import { services } from "../data/services";
import { sendInquiry } from "../lib/api";
import { useSeo } from "../lib/seo";

const CONTACT_TOAST_ID = "contact-form";

export function Contact() {
  const [loading, setLoading] = useState(false);
  const isSubmitting = useRef(false);

  useSeo({
    title: "Contact Luxmor AI | Discuss AI, CRM, Software & Automation Projects",
    description:
      "Contact Luxmor AI to discuss AI solutions, CRM development, workflow automation, custom software, web development, mobile apps, and digital product ideas.",
    path: "/contact",
  });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting.current) return;

    isSubmitting.current = true;
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? ""),
      service: String(data.get("service") ?? ""),
      message: String(data.get("message") ?? ""),
    };

    setLoading(true);
    toast.dismiss();
    toast.loading("Sending your inquiry...", { id: CONTACT_TOAST_ID });

    try {
      await sendInquiry(payload);
      toast.success("Inquiry sent successfully.", { id: CONTACT_TOAST_ID });
      form.reset();
    } catch {
      toast.error("We couldn't send your inquiry. Please try again in a moment.", { id: CONTACT_TOAST_ID });
    } finally {
      isSubmitting.current = false;
      setLoading(false);
    }
  }

  return (
    <Section
      headingLevel="h1"
      tone="dark"
      eyebrow="Get In Touch"
      title="Ready to transform your idea into scalable digital reality?"
      intro="Share a few details and the Luxmorai team can shape the right product, service, or technology plan."
    >
      <form className="contact-form" onSubmit={onSubmit}>
        <input name="name" required placeholder="Name" />
        <input name="email" required type="email" placeholder="Email Address" />
        <input name="phone" required placeholder="Phone Number" />
        <select name="service" required defaultValue="">
          <option value="" disabled>
            Select Service
          </option>
          {services.map((service) => (
            <option key={service.slug}>{service.shortTitle}</option>
          ))}
        </select>
        <textarea name="message" required placeholder="Message" rows={5} />
        <button className="primary-button light w-fit" disabled={loading} type="submit">
          <Send className="h-4 w-4" />
          {loading ? "Sending..." : "Submit Inquiry"}
        </button>
      </form>
    </Section>
  );
}

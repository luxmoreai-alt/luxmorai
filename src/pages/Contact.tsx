import { Send } from "lucide-react";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { Section } from "../components/Section";
import { services } from "../data/services";
import { sendInquiry } from "../lib/api";

export function Contact() {
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? ""),
      service: String(data.get("service") ?? ""),
      message: String(data.get("message") ?? ""),
    };

    setLoading(true);
    try {
      await sendInquiry(payload);
      toast.success("Inquiry sent successfully.");
      event.currentTarget.reset();
    } catch {
      toast.info("Inquiry captured locally. Connect an API with VITE_API_URL to submit it live.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Section
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

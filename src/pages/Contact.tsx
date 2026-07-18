import { Mail, Phone, Send } from "lucide-react";
import { FormEvent, useRef, useState } from "react";
import { Link } from "react-router-dom";
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
    title: "Contact Luxmorai Technologies | AI & Software Projects",
    description:
      "Contact Luxmorai Technologies Pvt Ltd to discuss AI, CRM, automation, custom software, web development, mobile apps, cloud solutions, and digital products.",
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
      privacyConsent: data.get("privacyConsent") === "on",
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
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded border border-white/15 bg-white/10 p-6 text-white">
          <h2 className="text-2xl font-black">Talk to Luxmorai</h2>
          <p className="mt-3 text-sm leading-7 text-slate-200">
            Reach our team for software, AI, website, mobile app, CRM, automation, and cloud project discussions.
          </p>
          <div className="mt-6 grid gap-4 text-sm">
            <a className="flex items-center gap-3 hover:text-cyan-200" href="tel:+919884050511">
              <Phone className="h-4 w-4 text-amber-300" />
              +91 9884050511
            </a>
            <a className="flex items-center gap-3 hover:text-cyan-200" href="mailto:info@luxmorai.com">
              <Mail className="h-4 w-4 text-amber-300" />
              info@luxmorai.com
            </a>
          </div>
        </div>
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
          <label className="form-consent form-consent-dark">
            <input name="privacyConsent" required type="checkbox" />
            <span>
              I have read the <Link to="/privacy-policy">Privacy Policy</Link> and consent to Luxmorai processing my
              information to respond to this inquiry.
            </span>
          </label>
          <button className="primary-button light w-fit" disabled={loading} type="submit">
            <Send className="h-4 w-4" />
            {loading ? "Sending..." : "Submit Inquiry"}
          </button>
        </form>
      </div>
    </Section>
  );
}

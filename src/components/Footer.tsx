import { ArrowUpRight, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const links = ["AI & ML", "Software Development", "Mobile Apps", "Website Development", "UI/UX Design", "Digital Marketing"];

const offices = [
  {
    name: "Hyderabad Head Office",
    address: "19/3RT, Line 2, Street 5, Prakash Nagar, Begumpet, Hyderabad, Telangana 500016",
  },
  {
    name: "Bangalore Office",
    address: "Pritech Rd, Bellandur, Bengaluru, Karnataka 560103",
  },
  {
    name: "Chennai Office",
    address: "Olympia Cyberspace, 21/22 Alandur Road, Arulayiammanpet, 2nd Street, Guindy, Chennai, Greater Chennai, Tamil Nadu 600032",
  },
];

export function Footer() {
  return (
    <footer className="site-footer text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_1fr] lg:px-8">
        <div>
          <h3 className="footer-brand-title">Luxmorai Technologies</h3>
          <p className="max-w-md text-sm leading-7 text-slate-300">
            Luxmorai Technologies Pvt Ltd designs scalable digital products for businesses that need reliable software,
            practical AI, and measurable growth.
          </p>
          <div className="footer-brand-pills" aria-label="Luxmorai capabilities">
            <span>AI Products</span>
            <span>Cloud Apps</span>
            <span>Growth Systems</span>
          </div>
        </div>
        <div>
          <h3 className="footer-title">Services</h3>
          <div className="grid gap-2">
            {links.map((link) => (
              <Link key={link} className="footer-link" to="/services">
                {link}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            ))}
            <Link className="footer-link" to="/blog">
              Blog
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
        <div>
          <h3 className="footer-title">Contact</h3>
          <div className="space-y-4 text-sm text-slate-300">
            {offices.map((office) => (
              <p className="flex gap-3 leading-6" key={office.name}>
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                <span><strong className="block text-white">{office.name}</strong>{office.address}</span>
              </p>
            ))}
            <a className="flex gap-3 hover:text-white" href="mailto:info@luxmorai.com">
              <Mail className="mt-0.5 h-4 w-4 text-amber-400" />
              info@luxmorai.com
            </a>
            <a className="flex gap-3 hover:text-white" href="tel:+919884050511">
              <Phone className="mt-0.5 h-4 w-4 text-amber-400" />
              +91 9884050511
            </a>
            <a
              className="flex gap-3 hover:text-white"
              href="https://www.linkedin.com/company/luxmoraipvtltd/"
              target="_blank"
              rel="noreferrer"
              aria-label="Luxmorai Technologies on LinkedIn"
            >
              <Linkedin className="mt-0.5 h-4 w-4 text-amber-400" />
              Luxmorai Technologies on LinkedIn
            </a>
          </div>
        </div>
      </div>
      <div className="footer-legal border-t border-white/10 px-4 py-5 text-xs text-slate-400">
        <span>© 2026 Luxmorai Technologies Pvt Ltd. All rights reserved.</span>
        <nav aria-label="Legal links">
          <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/terms-and-conditions">Terms and Conditions</Link>
        </nav>
      </div>
    </footer>
  );
}

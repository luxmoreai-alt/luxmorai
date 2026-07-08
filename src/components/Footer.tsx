import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const links = ["AI & ML", "Software Development", "Mobile Apps", "Website Development", "UI/UX Design", "Digital Marketing"];

export function Footer() {
  return (
    <footer className="site-footer text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_1fr] lg:px-8">
        <div>
          <span className="footer-logo-frame">
            <img className="h-20 w-auto" src="/luxmorai-logo1.png" alt="Luxmorai" />
          </span>
          <p className="max-w-md text-sm leading-7 text-slate-300">
            Luxmorai Technologies Pvt Ltd designs scalable digital products for businesses that need reliable software,
            practical AI, and measurable growth.
          </p>
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
          </div>
        </div>
        <div>
          <h3 className="footer-title">Contact</h3>
          <div className="space-y-4 text-sm text-slate-300">
            <p className="flex gap-3 leading-6">
              <MapPin className="mt-0.5 h-4 w-4 text-amber-400" />
              <span><strong className="block text-white">Hyderabad Head Office</strong>19/3RT, Line 2, Street 5, Prakash Nagar, Begumpet, Hyderabad, Telangana 500016</span>
            </p>
            <a className="flex gap-3 hover:text-white" href="mailto:hello@luxmorai.com">
              <Mail className="mt-0.5 h-4 w-4 text-amber-400" />
              hello@luxmorai.com
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-slate-400">
        © 2026 Luxmorai Technologies Pvt Ltd. All rights reserved.
      </div>
    </footer>
  );
}

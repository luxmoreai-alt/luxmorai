import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { industries } from "../data/industries";
import { services } from "../data/services";
import { featuredTechnologies, technologyGroups } from "../data/technologies";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Technology", href: "/technology" },
  { label: "Blog", href: "/blog" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [expandedMobileGroup, setExpandedMobileGroup] = useState<string | null>(null);
  const FeaturedTechnologyIcon = featuredTechnologies[0].icon;

  const closeMobileMenu = () => {
    setOpen(false);
    setExpandedMobileGroup(null);
  };

  const toggleMobileGroup = (href: string) => {
    setExpandedMobileGroup((current) => current === href ? null : href);
  };

  const desktopLinkClass = (isActive: boolean) => {
    return isActive ? "bg-sky-50 text-sky-700" : "text-slate-700 hover:bg-slate-100";
  };

  return (
    <header
      className="sticky top-0 z-50 border-b border-slate-200 bg-white shadow-sm"
    >
      <div className="mx-auto flex w-full max-w-none items-center gap-3 px-4 py-2.5 sm:px-6 lg:px-10 2xl:px-14">
        <Link
          to="/"
          className="flex shrink-0 items-center rounded-md bg-white"
          onClick={closeMobileMenu}
          aria-label="Luxmorai Technologies home"
        >
          <img
            className="h-12 w-48 max-w-[62vw] rounded-md object-cover object-[center_43%] sm:h-15 sm:w-52"
            src="/luxmorai-logo.png"
            alt="Luxmorai Technologies Pvt Ltd"
          />
        </Link>

        <nav className="ml-8 hidden min-w-0 flex-1 items-center justify-start gap-1 2xl:ml-12 xl:flex">
          {navItems.map((item) =>
            item.href === "/services" ? (
              <div className="services-nav-group" key={item.href}>
                <NavLink
                  to={item.href}
                  className={({ isActive }) =>
                    `nav-link inline-flex items-center gap-1.5 ${desktopLinkClass(isActive)}`
                  }
                >
                  {item.label}
                  <ChevronDown className="h-4 w-4" />
                </NavLink>
                <div className="services-mega-menu">
                  <div className="services-mega-grid">
                    <div className="services-mega-intro">
                      <span>Our Services</span>
                      <h2>Choose the right digital support</h2>
                      <p>
                        Explore Luxmorai service groups, sub-services, and visual examples before opening a detailed
                        service page.
                      </p>
                      <Link className="services-mega-cta" to="/services">
                        View all services
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                    <div className="services-mega-list">
                      {services.map((service) => (
                        <Link className="services-mega-item" key={service.slug} to={`/services/${service.slug}`}>
                          <service.icon className="h-5 w-5 text-sky-700" />
                          <div>
                            <h3>{service.shortTitle}</h3>
                            <p>{service.subServices.slice(0, 3).map((subService) => subService.title).join(" | ")}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <div className="services-mega-preview">
                      {services.slice(0, 2).map((service) => (
                        <Link className="services-mega-image" key={service.slug} to={`/services/${service.slug}`}>
                          <img src={service.explainerImages[0].src} alt={service.explainerImages[0].alt} />
                          <span>{service.shortTitle}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : item.href === "/industries" ? (
              <div className="services-nav-group" key={item.href}>
                <NavLink
                  to={item.href}
                  className={({ isActive }) =>
                    `nav-link inline-flex items-center gap-1.5 ${desktopLinkClass(isActive)}`
                  }
                >
                  {item.label}
                  <ChevronDown className="h-4 w-4" />
                </NavLink>
                <div className="services-mega-menu industries-mega-menu">
                  <div className="services-mega-grid industries-mega-grid">
                    <div className="industries-mega-list">
                      {industries.map((industry) => (
                        <Link className="industries-mega-item" key={industry.slug} to={`/industries/${industry.slug}`}>
                          <industry.icon className="h-5 w-5 text-sky-700" />
                          <div>
                            <h3>{industry.title}</h3>
                            <p>{industry.text}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <div className="industries-mega-feature">
                      <span>Latest Solution</span>
                      <img src={industries[1].image} alt={`${industries[1].title} solution preview`} />
                      <h3>{industries[1].title} Platforms</h3>
                      <p>Storefronts, order flows, customer portals, and business dashboards built for growth.</p>
                      <Link className="services-mega-cta" to="/industries">
                        View industries
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ) : item.href === "/technology" ? (
              <div className="services-nav-group" key={item.href}>
                <NavLink
                  to={item.href}
                  className={({ isActive }) =>
                    `nav-link inline-flex items-center gap-1.5 ${desktopLinkClass(isActive)}`
                  }
                >
                  {item.label}
                  <ChevronDown className="h-4 w-4" />
                </NavLink>
                <div className="services-mega-menu technology-mega-menu">
                  <div className="services-mega-grid technology-mega-grid">
                    <div className="technology-mega-list">
                      {technologyGroups.map((group) => (
                        <Link className="technology-mega-group" key={group.slug} to={`/technology/${group.slug}`}>
                          <div className="technology-mega-title">
                            <group.icon className="h-5 w-5 text-sky-700" />
                            <h3>{group.title}</h3>
                          </div>
                          <ul>
                            {group.items.slice(0, 6).map((technology) => (
                              <li key={technology}>{technology}</li>
                            ))}
                          </ul>
                        </Link>
                      ))}
                    </div>
                    <div className="technology-mega-feature">
                      <span>AI & ML</span>
                      <FeaturedTechnologyIcon className="h-9 w-9 text-sky-300" />
                      <h3>{featuredTechnologies[0].title}</h3>
                      <p>{featuredTechnologies[0].text}</p>
                      <div>
                        {featuredTechnologies[0].tags.map((tag) => (
                          <em key={tag}>{tag}</em>
                        ))}
                      </div>
                      <Link className="services-mega-cta" to="/technology">
                        View technology stack
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  `nav-link ${desktopLinkClass(isActive)}`
                }
              >
                {item.label}
              </NavLink>
            ),
          )}
        </nav>

        <Link className="mobile-contact-link xl:hidden" to="/contact" onClick={closeMobileMenu}>
          Contact us <ArrowRight className="h-3.5 w-3.5" />
        </Link>

        <button className="icon-button xl:hidden" type="button" onClick={() => { setOpen((value) => !value); setExpandedMobileGroup(null); }} aria-label={open ? "Close navigation" : "Open navigation"}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="mobile-nav-panel xl:hidden">
          <nav className="mobile-nav-list" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <div className="mobile-nav-item" key={item.href}>
                {["/services", "/industries", "/technology"].includes(item.href) ? (
                  <button
                    className="mobile-nav-toggle"
                    type="button"
                    aria-expanded={expandedMobileGroup === item.href}
                    onClick={() => toggleMobileGroup(item.href)}
                  >
                    {item.label}<ChevronDown />
                  </button>
                ) : (
                  <NavLink to={item.href} onClick={closeMobileMenu} className="mobile-nav-link">
                    {item.label}
                  </NavLink>
                )}
                {expandedMobileGroup === "/services" && item.href === "/services" && (
                  <div className="mobile-nav-submenu">
                    {services.map((service) => (
                      <Link
                        className="mobile-nav-submenu-link"
                        key={service.slug}
                        to={`/services/${service.slug}`}
                        onClick={closeMobileMenu}
                      >
                        {service.shortTitle}
                      </Link>
                    ))}
                  </div>
                )}
                {expandedMobileGroup === "/industries" && item.href === "/industries" && (
                  <div className="mobile-nav-submenu">
                    {industries.map((industry) => (
                      <Link
                        className="mobile-nav-submenu-link"
                        key={industry.slug}
                        to={`/industries/${industry.slug}`}
                        onClick={closeMobileMenu}
                      >
                        {industry.title}
                      </Link>
                    ))}
                  </div>
                )}
                {expandedMobileGroup === "/technology" && item.href === "/technology" && (
                  <div className="mobile-nav-submenu">
                    {technologyGroups.map((group) => (
                      <Link
                        className="mobile-nav-submenu-link"
                        key={group.slug}
                        to={`/technology/${group.slug}`}
                        onClick={closeMobileMenu}
                      >
                        {group.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

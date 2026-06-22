import { Brush, ChartNoAxesCombined, Code2, PackageCheck, Smartphone, type LucideIcon } from "lucide-react";

export type SubService = {
  title: string;
  text: string;
};

export type Service = {
  slug: string;
  title: string;
  shortTitle: string;
  summary: string;
  intro: string;
  image: string;
  explainerImages: {
    src: string;
    alt: string;
    caption: string;
  }[];
  icon: LucideIcon;
  subServices: SubService[];
  deliverables: string[];
  process: string[];
  technologies: string[];
};

export const services: Service[] = [
  {
    slug: "online-marketing",
    title: "Online Marketing Services",
    shortTitle: "Online Marketing",
    summary: "SEO, search ads, social campaigns, PPC, and lead systems that bring qualified customers.",
    intro:
      "Luxmorai builds practical marketing systems for businesses that need more visibility, better leads, and cleaner reporting. We combine search, paid media, content, conversion tracking, and lead management so your digital presence can produce measurable business opportunities.",
    image: "https://images.unsplash.com/photo-1557838923-2985c318be48?auto=format&fit=crop&w=1600&q=80",
    explainerImages: [
      {
        src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80",
        alt: "Digital marketing analytics dashboard",
        caption: "Traffic, campaign, and lead reporting that shows where growth is coming from.",
      },
      {
        // Keep this asset in the app so the service card does not depend on an
        // external image host being reachable.
        src: "/home-slides/digital-future-web.jpg",
        alt: "Search marketing planning workspace",
        caption: "Keyword, content, and channel planning for better search visibility.",
      },
    ],
    icon: ChartNoAxesCombined,
    subServices: [
      {
        title: "SEO Services",
        text: "Technical audits, keyword planning, page optimization, content structure, and ranking improvements for long-term organic traffic.",
      },
      {
        title: "Search Engine Marketing",
        text: "Search campaigns built around buyer intent, clear ad groups, landing pages, tracking, and ongoing optimization.",
      },
      {
        title: "Social Media Marketing",
        text: "Brand content, campaign calendars, creative direction, audience targeting, and performance review across key channels.",
      },
      {
        title: "Pay Per Click Management",
        text: "Budget planning, ad setup, conversion tracking, remarketing, bid tuning, and reporting for paid growth.",
      },
      {
        title: "Lead Management System",
        text: "Lead capture forms, CRM routing, follow-up workflows, dashboards, and automation to reduce missed opportunities.",
      },
    ],
    deliverables: [
      "Marketing audit and growth roadmap",
      "SEO and campaign setup",
      "Landing page and conversion guidance",
      "Analytics and lead tracking",
      "Monthly performance reporting",
    ],
    process: [
      "Audit search visibility, competitors, content gaps, and existing conversion paths.",
      "Build a channel plan across SEO, paid campaigns, social, and lead capture.",
      "Launch campaigns with tracking, landing pages, and performance dashboards.",
      "Improve budget allocation, content, and lead quality using monthly results.",
    ],
    technologies: ["Google Analytics", "Search Console", "Google Ads", "Meta Ads", "CRM", "SEO Tools"],
  },
  {
    slug: "development",
    title: "Website & Software Development",
    shortTitle: "Development",
    summary: "Business websites, web apps, CRM software, portals, and ecommerce platforms.",
    intro:
      "We design and build reliable web systems that support real business operations. From fast company websites to custom CRM platforms and ecommerce portals, Luxmorai focuses on clean architecture, responsive interfaces, secure APIs, and maintainable delivery.",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=1600&q=80",
    explainerImages: [
      {
        src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
        alt: "Developer building a responsive website",
        caption: "Frontend and backend development shaped around business workflows.",
      },
      {
        src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=80",
        alt: "Software code on a development screen",
        caption: "Clean, maintainable code for websites, portals, CRM, and ecommerce systems.",
      },
    ],
    icon: Code2,
    subServices: [
      {
        title: "Website Design",
        text: "Modern page layouts, brand-aligned visuals, responsive sections, and conversion-focused interfaces.",
      },
      {
        title: "Website Development",
        text: "Fast, scalable websites with clean frontend code, CMS-ready content structures, and SEO foundations.",
      },
      {
        title: "CRM Software Development",
        text: "Custom CRM modules for leads, customers, follow-ups, teams, reporting, permissions, and sales pipelines.",
      },
      {
        title: "Software Development",
        text: "Custom platforms, dashboards, APIs, admin panels, and workflow systems built around your operations.",
      },
      {
        title: "E-commerce Website Development",
        text: "Product catalogs, carts, checkout flows, payment integration, order management, and customer accounts.",
      },
    ],
    deliverables: [
      "Responsive website or web app",
      "Admin panel and role-based access",
      "API and database integration",
      "Payment or CRM integrations",
      "Deployment and support documentation",
    ],
    process: [
      "Define goals, users, features, data needs, and launch priorities.",
      "Create the information architecture, interface plan, and technical approach.",
      "Build frontend, backend, database, integrations, and admin workflows.",
      "Test performance, security, responsiveness, and release readiness before launch.",
    ],
    technologies: ["React", "TypeScript", "Node.js", "REST APIs", "PostgreSQL", "Cloud Hosting"],
  },
  {
    slug: "mobile-apps",
    title: "Mobile App Development",
    shortTitle: "Mobile Apps",
    summary: "Android, iOS, hybrid, native, Xamarin, and Windows app development.",
    intro:
      "Luxmorai develops mobile applications for customer experiences, internal teams, delivery workflows, bookings, reporting, and commerce. We plan the user journey carefully, connect secure APIs, test on real devices, and support release preparation.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1600&q=80",
    explainerImages: [
      {
        src: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=900&q=80",
        alt: "Mobile app interface design on a phone",
        caption: "Mobile-first screens planned around quick, clear user actions.",
      },
      {
        src: "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?auto=format&fit=crop&w=900&q=80",
        alt: "Mobile application development workspace",
        caption: "Secure API connections, device testing, and app release preparation.",
      },
    ],
    icon: Smartphone,
    subServices: [
      {
        title: "Mobile App Development",
        text: "Complete app planning, interface design, API connection, testing, deployment, and post-launch improvement.",
      },
      {
        title: "Windows App Development",
        text: "Desktop and Windows-focused applications for internal tools, operations, reporting, and productivity workflows.",
      },
      {
        title: "Xamarin App Development",
        text: "Cross-platform applications with shared business logic, native integrations, and efficient maintenance.",
      },
      {
        title: "Hybrid App Development",
        text: "Cost-effective apps that work across platforms while keeping UI, speed, and integrations business-ready.",
      },
      {
        title: "Native App Development",
        text: "Platform-specific Android and iOS builds for stronger performance, device features, and polished interactions.",
      },
    ],
    deliverables: [
      "Android and iOS app builds",
      "Mobile UI and user flows",
      "API, payment, and notification integration",
      "Authentication and user accounts",
      "Store release support",
    ],
    process: [
      "Map app users, core journeys, device needs, integrations, and offline expectations.",
      "Design mobile-first screens with fast access to high-frequency actions.",
      "Develop app features, connect backend services, and validate device behavior.",
      "Prepare release builds, store assets, analytics, and update cycles.",
    ],
    technologies: ["React Native", "Flutter", "Xamarin", "Firebase", "REST APIs", "Google Play"],
  },
  {
    slug: "software-products",
    title: "Business Software Products",
    shortTitle: "Software Products",
    summary: "HR, payroll, CRM, inventory, hospital, and school management software.",
    intro:
      "Our software products are shaped around operational clarity. Luxmorai builds role-based platforms that organize records, approvals, inventory, customers, staff, reports, and daily business processes in one dependable system.",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1600&q=80",
    explainerImages: [
      {
        src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
        alt: "Business software dashboard",
        caption: "Role-based dashboards for records, approvals, operations, and reporting.",
      },
      {
        src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80",
        alt: "Business team reviewing software reports",
        caption: "Management tools that make daily work easier to track and improve.",
      },
    ],
    icon: PackageCheck,
    subServices: [
      {
        title: "HR & Payroll Software",
        text: "Attendance, employee records, salary calculations, leave workflows, payroll reports, and role-based access.",
      },
      {
        title: "CRM Software",
        text: "Lead capture, customer profiles, follow-ups, sales stages, activity history, and team performance reports.",
      },
      {
        title: "Inventory Management",
        text: "Stock tracking, product records, purchases, alerts, billing connections, and inventory movement reports.",
      },
      {
        title: "Hospital Management",
        text: "Patient records, appointments, billing, departments, staff workflows, reports, and secure access control.",
      },
      {
        title: "School Management",
        text: "Student records, attendance, fees, exams, staff management, parent communication, and academic reporting.",
      },
    ],
    deliverables: [
      "Custom modules and dashboards",
      "Secure login and user roles",
      "Reports, exports, and audit trails",
      "Workflow automation",
      "Training and phased rollout",
    ],
    process: [
      "Document departments, records, approvals, reports, and daily operating flows.",
      "Plan modules that remove duplicate entry and keep important data visible.",
      "Build dashboards, forms, permissions, reports, and integrations.",
      "Launch in phases, train users, and improve workflows with real feedback.",
    ],
    technologies: ["React", "Node.js", "PostgreSQL", "MySQL", "Role-Based Access", "Cloud Hosting"],
  },
  {
    slug: "creative-design-testing",
    title: "Creative Design & Testing",
    shortTitle: "Creative Design & QA",
    summary: "UI/UX, logo, brochure, software testing, security testing, and performance checks.",
    intro:
      "Luxmorai combines visual design with quality assurance so your product looks credible and works reliably. We create user-friendly interfaces and brand assets, then test the product for bugs, usability, speed, security, and release confidence.",
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=1600&q=80",
    explainerImages: [
      {
        src: "https://images.unsplash.com/photo-1545235617-9465d2a55698?auto=format&fit=crop&w=900&q=80",
        alt: "UI UX design planning board",
        caption: "User journeys, prototypes, and brand assets prepared for polished handoff.",
      },
      {
        src: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=900&q=80",
        alt: "Software testing and quality review workspace",
        caption: "Testing coverage for usability, stability, performance, and launch confidence.",
      },
    ],
    icon: Brush,
    subServices: [
      {
        title: "UI/UX Design",
        text: "User journeys, wireframes, prototypes, design systems, responsive screens, and developer-ready handoff.",
      },
      {
        title: "Logo Design",
        text: "Brand marks, color direction, typography pairing, usage-ready files, and identity guidance.",
      },
      {
        title: "Brochure Design",
        text: "Company profiles, service brochures, pitch decks, print-ready layouts, and digital marketing documents.",
      },
      {
        title: "Software Testing",
        text: "Functional testing, regression checks, bug reports, release validation, and issue verification.",
      },
      {
        title: "Security Testing",
        text: "Authentication review, form validation, access checks, common vulnerability review, and risk reporting.",
      },
    ],
    deliverables: [
      "Design concepts and final assets",
      "Clickable UI prototypes",
      "Test cases and QA reports",
      "Bug reproduction details",
      "Release readiness checklist",
    ],
    process: [
      "Clarify audience, brand tone, product goals, and release risks.",
      "Create design systems, assets, prototypes, and test coverage plans.",
      "Review interfaces, run QA checks, and document issues clearly.",
      "Polish design details, verify fixes, and prepare launch-ready handoff.",
    ],
    technologies: ["Figma", "Adobe Tools", "Playwright", "Postman", "Lighthouse", "Security Review"],
  },
];

export function getServiceBySlug(slug: string | undefined) {
  return services.find((service) => service.slug === slug);
}

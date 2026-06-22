import {
  Bot,
  Brain,
  CheckCheck,
  Cloud,
  Code2,
  Database,
  Palette,
  Server,
  Settings,
  type LucideIcon,
} from "lucide-react";

export type TechnologyGroup = {
  slug: string;
  title: string;
  summary: string;
  image: string;
  icon: LucideIcon;
  items: string[];
  intro: string[];
  capabilities: { title: string; text: string }[];
  useCases: string[];
  benefits: { title: string; text: string }[];
  process: string[];
  closing: string;
};

export const technologyGroups: TechnologyGroup[] = [
  {
    slug: "ui-design",
    title: "UI Design",
    summary: "Responsive web interfaces, design systems, and frontend experiences.",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1800&q=85",
    icon: Palette,
    items: ["HTML/HTML5", "CSS3", "JavaScript", "TypeScript", "React", "AngularJS", "jQuery", "Tailwind CSS"],
    intro: [
      "UI design is the first layer customers experience, so it must be clear, fast, responsive, and aligned with the business goal.",
      "Luxmorai builds interfaces that combine visual structure, accessibility, reusable components, and frontend engineering discipline.",
    ],
    capabilities: [
      {
        title: "Responsive Interface Design",
        text: "We create layouts that work across desktop, tablet, and mobile screens without losing clarity or conversion focus.",
      },
      {
        title: "Component-Based Frontend",
        text: "Reusable UI components keep pages consistent, easier to maintain, and faster to expand as the product grows.",
      },
      {
        title: "Design System Foundations",
        text: "Colors, spacing, typography, buttons, forms, and cards are organized so your product feels consistent across every page.",
      },
      {
        title: "Performance-Friendly UI",
        text: "Frontend choices are made with loading speed, responsiveness, SEO readiness, and user experience in mind.",
      },
    ],
    useCases: ["Corporate websites", "Dashboards", "Customer portals", "Landing pages", "Admin panels", "Responsive web apps"],
    benefits: [
      { title: "Better usability", text: "Users can understand pages faster and complete actions with less confusion." },
      { title: "Stronger brand trust", text: "Consistent UI details make the business look more reliable and professional." },
      { title: "Faster delivery", text: "Reusable components reduce repeated design and development work." },
    ],
    process: ["Understand user journeys", "Plan layouts and components", "Build responsive UI", "Test across screens"],
    closing: "Good UI design turns complex workflows into simple, confident digital experiences.",
  },
  {
    slug: "server-side",
    title: "Server Side",
    summary: "Stable backend systems, APIs, business logic, and integrations.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1800&q=85",
    icon: Code2,
    items: ["Node.js", "PHP", "Python", "Java", "J2EE", "Spring", "REST APIs", "Enterprise Architecture"],
    intro: [
      "Server-side technology powers the logic, data flow, integrations, security, and reliability behind a digital product.",
      "Luxmorai builds backend systems that are structured for business rules, future expansion, and dependable performance.",
    ],
    capabilities: [
      {
        title: "API Development",
        text: "We build REST APIs that connect web apps, mobile apps, admin panels, CRMs, payment systems, and third-party platforms.",
      },
      {
        title: "Business Logic",
        text: "Backend workflows handle permissions, records, approvals, calculations, notifications, reports, and operational rules.",
      },
      {
        title: "Integration Architecture",
        text: "We connect external tools and internal systems while keeping data flow predictable and maintainable.",
      },
      {
        title: "Secure Backend Foundations",
        text: "Authentication, authorization, validation, logging, and access control are planned into backend delivery.",
      },
    ],
    useCases: ["CRM backends", "ERP systems", "Payment APIs", "Admin workflows", "Mobile app APIs", "Portal logic"],
    benefits: [
      { title: "Operational reliability", text: "Stable backend systems keep daily business workflows running smoothly." },
      { title: "Cleaner integrations", text: "Well-planned APIs reduce manual work and data duplication." },
      { title: "Easier scaling", text: "Good backend architecture makes it easier to add features later." },
    ],
    process: ["Define data and workflows", "Design APIs", "Build backend modules", "Secure and test integrations"],
    closing: "Strong backend engineering gives your product the structure it needs to grow safely.",
  },
  {
    slug: "data-analytics",
    title: "Data & Analytics",
    summary: "Databases, reporting, dashboards, and data-backed decisions.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1800&q=85",
    icon: Database,
    items: ["Oracle", "SQL Database", "PostgreSQL", "MongoDB", "Redis", "Big Data", "Dashboards", "Analytics"],
    intro: [
      "Data and analytics help businesses move from scattered information to clear decisions.",
      "Luxmorai designs databases, reporting systems, dashboards, and analytics workflows that make operational information easier to trust and use.",
    ],
    capabilities: [
      {
        title: "Database Design",
        text: "We plan data models for records, users, transactions, inventory, reports, content, and operational workflows.",
      },
      {
        title: "Dashboards and Reports",
        text: "Business dashboards turn raw data into useful views for sales, operations, finance, marketing, and management teams.",
      },
      {
        title: "Data Integration",
        text: "We connect data from multiple systems so teams can reduce duplicate entry and improve visibility.",
      },
      {
        title: "Performance and Query Planning",
        text: "Indexes, caching, and query structure help applications stay responsive as data volume grows.",
      },
    ],
    useCases: ["Management dashboards", "Sales reports", "Inventory analytics", "Customer insights", "Financial reports", "Operational KPIs"],
    benefits: [
      { title: "Clearer decisions", text: "Teams can act on current data instead of guessing from disconnected spreadsheets." },
      { title: "Reduced manual reporting", text: "Automated reports save time and reduce repeated work." },
      { title: "Better visibility", text: "Important business metrics stay visible to the right users." },
    ],
    process: ["Map data sources", "Design schema and reports", "Build dashboards", "Validate data accuracy"],
    closing: "Useful analytics starts with clean data structure and ends with decisions your team can trust.",
  },
  {
    slug: "testing",
    title: "Testing",
    summary: "Quality checks across product features, integrations, and releases.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1800&q=85",
    icon: CheckCheck,
    items: ["Software Testing", "Unit Testing", "Integration Testing", "System Testing", "Deployment Automation", "Support"],
    intro: [
      "Testing protects product quality before users experience issues in production.",
      "Luxmorai validates features, workflows, integrations, performance, and release readiness through practical quality checks.",
    ],
    capabilities: [
      {
        title: "Functional Testing",
        text: "We verify that forms, flows, buttons, pages, roles, and business rules behave as expected.",
      },
      {
        title: "Integration Testing",
        text: "Connected systems such as APIs, payments, CRMs, databases, and notifications are tested together.",
      },
      {
        title: "Regression Testing",
        text: "Existing features are checked after updates so new changes do not break stable behavior.",
      },
      {
        title: "Release Support",
        text: "Deployment checks, bug verification, and launch support help teams release with more confidence.",
      },
    ],
    useCases: ["Web app QA", "Mobile app testing", "API testing", "Payment testing", "Regression checks", "Release validation"],
    benefits: [
      { title: "Fewer production bugs", text: "Issues are found earlier when they are easier and cheaper to fix." },
      { title: "Higher confidence", text: "Teams can release features with clearer quality signals." },
      { title: "Better user trust", text: "Stable products create fewer support problems and better customer experiences." },
    ],
    process: ["Prepare test scenarios", "Run feature checks", "Document issues", "Verify fixes before release"],
    closing: "Testing turns release uncertainty into a controlled quality process.",
  },
  {
    slug: "cloud-computing",
    title: "Cloud Computing",
    summary: "Cloud platforms, hosting, deployment, scalability, and monitoring.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1800&q=85",
    icon: Cloud,
    items: ["AWS Development", "Google Cloud", "Azure", "Docker", "CI/CD", "Monitoring", "GoDaddy", "Cloud Hosting"],
    intro: [
      "Cloud computing helps businesses deploy products faster, scale infrastructure, and keep systems accessible.",
      "Luxmorai supports cloud hosting, deployment, monitoring, and infrastructure planning for websites, applications, and business platforms.",
    ],
    capabilities: [
      {
        title: "Cloud Deployment",
        text: "We deploy websites, APIs, dashboards, and apps on cloud environments that match performance and budget needs.",
      },
      {
        title: "CI/CD Pipelines",
        text: "Automated build and deployment workflows reduce manual release steps and improve delivery consistency.",
      },
      {
        title: "Monitoring and Reliability",
        text: "Logs, alerts, uptime checks, and performance monitoring help teams catch issues before users are affected.",
      },
      {
        title: "Scalable Hosting",
        text: "Cloud architecture is planned so storage, compute, traffic, and integrations can grow with the product.",
      },
    ],
    useCases: ["Web hosting", "API deployment", "SaaS hosting", "Cloud migration", "DevOps pipelines", "Monitoring setup"],
    benefits: [
      { title: "Faster launches", text: "Cloud deployment helps teams move from development to production quickly." },
      { title: "Flexible scaling", text: "Infrastructure can grow as traffic and data needs increase." },
      { title: "Better operations", text: "Monitoring and automation reduce manual maintenance pressure." },
    ],
    process: ["Assess hosting needs", "Plan environment", "Deploy and configure", "Monitor and optimize"],
    closing: "Cloud computing gives your digital product a reliable place to run, scale, and improve.",
  },
  {
    slug: "web-servers",
    title: "Web Servers",
    summary: "Reliable server environments for web apps and business platforms.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1800&q=85",
    icon: Server,
    items: ["Apache", "NGINX", "Tomcat", "JBoss", "IIS", "Node Server"],
    intro: [
      "Web servers handle requests, route traffic, serve applications, and keep websites and platforms available.",
      "Luxmorai configures server environments that support performance, security, routing, and application stability.",
    ],
    capabilities: [
      {
        title: "Server Configuration",
        text: "We configure application servers, static hosting, reverse proxies, domains, SSL, and routing rules.",
      },
      {
        title: "Performance Setup",
        text: "Caching, compression, process management, and server tuning help pages and APIs respond faster.",
      },
      {
        title: "Security Basics",
        text: "SSL, headers, access controls, environment configuration, and deployment discipline reduce common risks.",
      },
      {
        title: "Application Hosting",
        text: "Server environments are prepared for web apps, APIs, portals, admin panels, and enterprise systems.",
      },
    ],
    useCases: ["Website hosting", "API hosting", "Reverse proxies", "SSL setup", "Application servers", "Production environments"],
    benefits: [
      { title: "Stable availability", text: "Correct server setup keeps applications reachable and predictable." },
      { title: "Improved speed", text: "Server tuning can reduce response time and improve user experience." },
      { title: "Cleaner deployment", text: "Structured environments make updates easier to manage." },
    ],
    process: ["Choose server stack", "Configure environment", "Deploy application", "Test availability and SSL"],
    closing: "Reliable web servers keep your digital product accessible, fast, and easier to maintain.",
  },
  {
    slug: "software-process",
    title: "Software Process",
    summary: "Delivery practices that keep projects clear, stable, and maintainable.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1800&q=85",
    icon: Settings,
    items: ["SDLC", "Agile", "Scrum", "Code Review", "Release Planning", "Documentation"],
    intro: [
      "Software process keeps projects organized from idea to release.",
      "Luxmorai uses practical planning, review, documentation, testing, and release routines so teams know what is being built and why.",
    ],
    capabilities: [
      {
        title: "Project Planning",
        text: "We define scope, user flows, priorities, milestones, and delivery expectations before development begins.",
      },
      {
        title: "Agile Delivery",
        text: "Work is broken into manageable iterations with regular review, feedback, and progress visibility.",
      },
      {
        title: "Code Review and Quality",
        text: "Review habits improve maintainability, reduce avoidable bugs, and keep implementation aligned with standards.",
      },
      {
        title: "Release Documentation",
        text: "Documentation, handoff notes, deployment steps, and support information make long-term maintenance easier.",
      },
    ],
    useCases: ["Product planning", "Agile sprints", "Release management", "Technical documentation", "Handoff process", "QA coordination"],
    benefits: [
      { title: "Clearer delivery", text: "Teams understand priorities, responsibilities, and project status." },
      { title: "Less confusion", text: "Documentation and planning reduce rework and missed expectations." },
      { title: "Better maintainability", text: "Process keeps code, releases, and support easier to manage over time." },
    ],
    process: ["Define scope", "Plan milestones", "Develop and review", "Test and release"],
    closing: "A good software process makes delivery calmer, clearer, and more dependable.",
  },
  {
    slug: "ai-ml",
    title: "AI & ML",
    summary: "Intelligent systems, automation, prediction, and applied AI workflows.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1800&q=85",
    icon: Brain,
    items: ["Python", "TensorFlow", "PyTorch", "OpenAI", "LangChain", "Machine Learning", "Artificial Intelligence", "Agentic AI"],
    intro: [
      "AI and machine learning are most valuable when they solve specific business problems instead of being added only as a trend.",
      "Luxmorai builds practical AI workflows for automation, prediction, search, reporting, recommendations, support, and intelligent assistants.",
    ],
    capabilities: [
      {
        title: "Machine Learning Models",
        text: "We build prediction, classification, recommendation, and anomaly-detection workflows around useful business data.",
      },
      {
        title: "Generative AI Integrations",
        text: "OpenAI and LLM-based workflows can support content, search, summarization, support automation, and internal productivity tools.",
      },
      {
        title: "Agentic Workflows",
        text: "AI agents can help with structured tasks such as research, routing, data extraction, report generation, and workflow assistance.",
      },
      {
        title: "AI Product Integration",
        text: "AI features are connected into web apps, dashboards, CRMs, portals, and business systems with clear guardrails.",
      },
    ],
    useCases: ["AI chatbots", "Recommendation systems", "Predictive analytics", "Document automation", "Agentic workflows", "Smart dashboards"],
    benefits: [
      { title: "Automation", text: "Teams can reduce repetitive manual work and improve response speed." },
      { title: "Better insight", text: "AI can surface patterns, summaries, and predictions from business data." },
      { title: "Smarter products", text: "AI features make platforms more useful, personalized, and efficient." },
    ],
    process: ["Identify useful AI cases", "Prepare data and prompts", "Build model workflow", "Test outputs and safeguards"],
    closing: "Applied AI works best when it is focused, measurable, and connected to real business workflows.",
  },
];

export function getTechnologyGroupBySlug(slug: string | undefined) {
  return technologyGroups.find((group) => group.slug === slug);
}

export const featuredTechnologies = [
  {
    title: "Artificial Intelligence",
    text: "We build intelligent systems using machine learning models, neural networks, and agentic workflows to automate and optimize business operations.",
    icon: Brain,
    tags: ["Python", "TensorFlow", "LangChain", "PyTorch", "OpenAI"],
  },
  {
    title: "Machine Learning",
    text: "Prediction, classification, recommendation, and analytics systems built around useful business data.",
    icon: Bot,
    tags: ["ML Models", "Data Pipelines", "Prediction"],
  },
];

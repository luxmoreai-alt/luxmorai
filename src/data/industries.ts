import {
  Building2,
  GraduationCap,
  HeartPulse,
  Landmark,
  Plane,
  ShoppingBag,
  Truck,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export type Industry = {
  slug: string;
  title: string;
  text: string;
  image: string;
  icon: LucideIcon;
  intro: string[];
  trendsTitle: string;
  trends: (string | { title: string; text: string })[];
  useCases: string[];
  challengesTitle: string;
  challenges: (string | { title: string; text: string })[];
  closing: string;
  closingDetails?: string[];
};

export const industries: Industry[] = [
  {
    slug: "finance",
    title: "Finance",
    text: "Explore innovation, analytics, automation, and secure digital finance.",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1200&q=80",
    icon: Landmark,
    intro: [
      "Technology is both a creative and disruptive force in finance. It unlocks productivity, improves customer experience, and pushes banks and financial firms to rethink legacy business models.",
      "Fintech, advanced analytics, cloud platforms, and automation are helping financial organizations respond to rising customer expectations while managing regulation, security, and speed.",
      "Financial companies now have to improve capitalization, customer confidence, digital onboarding, reporting, and compliance while competing with faster fintech players.",
      "The opportunity is clear: firms that build strong digital capabilities can turn regulation, data, and customer demand into practical growth advantages.",
    ],
    trendsTitle: "Emerging Fintech Trends",
    trends: [
      {
        title: "Blockchain Systems",
        text: "Distributed ledgers can reduce transaction friction, simplify automated agreements, improve transparency, and support faster financial workflows where trust and traceability are important.",
      },
      {
        title: "Sharing Economy and Fintech Partnerships",
        text: "Banks and financial institutions can collaborate with fintech companies to support peer-to-peer transactions, reduce capital risk, increase reach, and build new customer-facing models.",
      },
      {
        title: "Hybrid Cloud Infrastructure",
        text: "A blend of traditional IT, private cloud, and public cloud helps finance teams balance scalability, cost, data protection, and regulatory expectations.",
      },
      {
        title: "RPA and Artificial Intelligence",
        text: "Automation and AI can reduce manual compliance work, simplify underwriting, detect payment fraud, improve service speed, and free teams from repetitive back-office tasks.",
      },
      {
        title: "Advanced Analytics",
        text: "Financial analytics helps teams understand customer behavior, portfolio risk, revenue opportunities, fraud signals, and operational performance with better accuracy.",
      },
      {
        title: "Cybersecurity and Real-Time Monitoring",
        text: "Financial platforms need stronger identity, access control, anomaly detection, audit trails, and continuous monitoring to protect customer trust.",
      },
    ],
    useCases: [
      "Digital banking",
      "Payment platforms",
      "Fraud detection",
      "Customer analytics",
      "Loan workflow automation",
      "Compliance dashboards",
      "KYC and onboarding portals",
      "Financial reporting systems",
    ],
    challengesTitle: "Evolving Fintech Challenges",
    challenges: [
      {
        title: "Legacy Operating Models",
        text: "Older systems, processes, and vendor dependencies make innovation slower. Finance teams need modernization that protects core operations while creating room for transformation.",
      },
      {
        title: "Speed of Technology Change",
        text: "Cybersecurity, big data, digital payments, mobile banking, and fintech disruption force institutions to move faster without compromising reliability.",
      },
      {
        title: "Regulatory Compliance",
        text: "Financial firms spend significant effort on changing regulations. Software must support reporting, auditability, controls, and process improvements.",
      },
      {
        title: "Rising Customer Expectations",
        text: "Customers expect fast mobile experiences, secure access, local support, transparent communication, and consistent service across channels.",
      },
      {
        title: "Competitive Pressure",
        text: "Low margins and new fintech entrants make it difficult to rebuild revenue streams without better data, differentiated products, and reliable digital platforms.",
      },
    ],
    closing: "Finance teams need dependable digital foundations that support present challenges and prepare for future change.",
    closingDetails: [
      "Luxmorai can help financial teams build secure customer portals, dashboards, payment workflows, analytics systems, and automation tools.",
      "The goal is to combine dependable architecture with practical innovation so finance businesses can move faster without losing control.",
    ],
  },
  {
    slug: "logistics-transportation",
    title: "Logistics & Transportation",
    text: "Harness technology for supply chains, fleet systems, visibility, and delivery.",
    image: "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&w=1200&q=80",
    icon: Truck,
    intro: [
      "Logistics companies cannot afford to postpone digital transformation. Customer expectations, global complexity, ecommerce growth, and last-mile pressure are reshaping the industry.",
      "Digital platforms can improve visibility, sustainability, route planning, inventory control, collaboration, and cost management across the logistics value chain.",
      "The logistics industry has to manage global movement, regulations, fluctuating costs, inventory visibility, reverse logistics, and real-time customer communication.",
      "The right technology model helps companies move from reactive shipment handling to connected, data-led supply chain operations.",
    ],
    trendsTitle: "Emerging Transportation Trends",
    trends: [
      {
        title: "Cloud Logistics",
        text: "Cloud-powered systems improve scalability, data sharing, shipment visibility, asset tracking, inventory control, and price transparency across distributed logistics networks.",
      },
      {
        title: "Blockchain Transparency",
        text: "Blockchain can support trusted records, automate commercial processes, reduce paperwork, and improve collaboration between carriers, suppliers, warehouses, and customers.",
      },
      {
        title: "RPA, AI, ML, and AR",
        text: "Automation and intelligence can improve warehouse operations, delivery planning, workforce performance, order handling, and exception management.",
      },
      {
        title: "IoT-Enabled Visibility",
        text: "IoT connects warehouses, vehicles, packages, and delivery routes so teams can monitor location, condition, delays, and last-mile performance in real time.",
      },
      {
        title: "Digital Twins and VR",
        text: "Virtual models help teams simulate material flow, plan inventory, monitor processes, and test changes before implementing them in live operations.",
      },
      {
        title: "Big Data Analytics",
        text: "Logistics analytics can optimize routes, anticipate shipping needs, improve forecasting, reduce risk, and turn high-volume movement data into operational decisions.",
      },
    ],
    useCases: [
      "Fleet management",
      "Shipment tracking",
      "Warehouse automation",
      "Route optimization",
      "Inventory visibility",
      "Reverse logistics workflows",
      "Delivery partner portals",
      "Supply chain dashboards",
    ],
    challengesTitle: "Key Logistics Challenges",
    challenges: [
      {
        title: "Changing Customer Expectations",
        text: "Customers want updates at every stage of the delivery process. Logistics teams need accurate tracking, timely communication, and clear service visibility.",
      },
      {
        title: "Siloed IT Systems",
        text: "Old systems and disconnected departments make transformation difficult. Companies need core system improvements before digital tools can create real value.",
      },
      {
        title: "Cost Optimization Pressure",
        text: "Logistics teams must reduce errors, consolidate shipments, improve utilization, and make data-backed decisions without lowering service performance.",
      },
      {
        title: "Reverse Logistics",
        text: "Ecommerce returns require structured reverse logistics workflows, partner coordination, inventory updates, and customer communication.",
      },
      {
        title: "Inventory Tracking and Visibility",
        text: "Inventory can stay in transit for long periods. Tracking devices, location systems, and tamper-proof processes must be managed carefully.",
      },
      {
        title: "Compliance and Cost Volatility",
        text: "Transportation rules, city restrictions, fuel prices, currency changes, and technology costs add complexity to daily operations.",
      },
    ],
    closing: "The right IT model helps logistics teams move from cost centers to opportunity centers.",
    closingDetails: [
      "Luxmorai can help build shipment portals, route dashboards, warehouse tools, fleet systems, customer tracking views, and logistics reporting platforms.",
      "A connected logistics system gives teams the visibility they need to reduce disorder and improve delivery confidence.",
    ],
  },
  {
    slug: "healthcare",
    title: "Healthcare",
    text: "Modern patient, clinical, telemedicine, and healthcare data solutions.",
    image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&q=80",
    icon: HeartPulse,
    intro: [
      "Healthcare information technology improves patient safety, medical outcomes, data sharing, cost control, and clinical decision-making.",
      "Modern healthcare systems need secure platforms for storing, retrieving, sharing, and using medical information while supporting better patient experiences.",
      "Healthcare technology is not only about apps. It supports diagnosis, treatment planning, hospital workflows, patient communication, billing, compliance, and clinical collaboration.",
      "The best systems help healthcare providers reduce errors, improve patient trust, manage data responsibly, and make care more accessible.",
    ],
    trendsTitle: "Emerging Healthcare Technology Trends",
    trends: [
      {
        title: "AI and Machine Learning",
        text: "AI and ML can support disease identification, diagnosis, treatment planning, epidemic monitoring, research efficiency, and clinical trial analysis.",
      },
      {
        title: "Healthcare Robotics",
        text: "Robots can assist in surgery, lab automation, prosthetics, disinfection, telepresence, and movement of medical supplies across facilities.",
      },
      {
        title: "Computer and Machine Vision",
        text: "Vision systems can help review scans, diagnostics, surgical images, and clinical measurements to reduce human error and improve medical assessment.",
      },
      {
        title: "Wearable Medical Devices",
        text: "Wearables can monitor heart rate, atrial fibrillation, blood pressure, body temperature, activity, and alerts that help providers respond earlier.",
      },
      {
        title: "Genomics and Personalized Care",
        text: "Genomic data combined with analytics can help identify mutations, guide treatment plans, and support more targeted medical decisions.",
      },
      {
        title: "Extended Reality",
        text: "VR, AR, and mixed reality can support surgical training, procedure simulation, therapy, and complex treatment planning.",
      },
    ],
    useCases: [
      "Telemedicine",
      "Imaging and diagnostics",
      "Prediction",
      "Patient experience",
      "Hospital management",
      "Appointment systems",
      "Medical billing",
      "Clinical dashboards",
    ],
    challengesTitle: "Key Healthcare Challenges",
    challenges: [
      {
        title: "Cybersecurity",
        text: "Healthcare data is highly sensitive and attractive to attackers. Systems must protect patient records, access permissions, communication, and compliance requirements.",
      },
      {
        title: "Payment Processing",
        text: "Hospitals and clinics need patient-friendly billing with flexible payment options, digital receipts, and smoother administrative workflows.",
      },
      {
        title: "Scattered Healthcare Data",
        text: "Data spread across departments and providers makes it difficult to create a reliable patient history or a single source of truth.",
      },
      {
        title: "Clinical Decision Support",
        text: "Medical information grows quickly. Decision-support systems can help teams stay informed without overwhelming doctors and staff.",
      },
      {
        title: "Digital Therapeutics",
        text: "Connected health products require new data-sharing models, reimbursement planning, patient monitoring, and regulatory thinking.",
      },
      {
        title: "EHR Implementation",
        text: "Poorly implemented electronic health records can create billing issues, medical errors, and staff frustration unless training and workflows are carefully planned.",
      },
    ],
    closing: "Healthcare needs bold but responsible technology adoption to build safer, more connected patient care.",
    closingDetails: [
      "Luxmorai can support telemedicine portals, hospital management systems, patient dashboards, appointment flows, billing tools, and secure healthcare data platforms.",
      "The focus is better care, lower operational friction, and stronger trust between providers and patients.",
    ],
  },
  {
    slug: "education",
    title: "Education",
    text: "Interactive learning, smart campuses, LMS, analytics, and student platforms.",
    image: "/images/education-learning.png",
    icon: GraduationCap,
    intro: [
      "Education is transforming through technology that improves engagement, collaboration, communication, and efficiency for students and teachers.",
      "When used properly, digital learning platforms can support inclusive, personalized learning for visual, auditory, reading, writing, and kinesthetic learners.",
      "Education technology can reduce teacher workload, support student confidence, improve access, and create personalized learning paths when implemented with care.",
      "The challenge is to use technology as a teaching enabler, not as a distraction from learning quality, critical thinking, and institutional responsibility.",
    ],
    trendsTitle: "Emerging Education Trends",
    trends: [
      {
        title: "Gamified Learning",
        text: "Gamification can make lessons more engaging by using progress, rewards, challenges, and analytics to help students understand their performance.",
      },
      {
        title: "Online Resources and Assessments",
        text: "Digital content, assessments, and MOOCs make learning available beyond location limits while supporting personalized and collaborative education models.",
      },
      {
        title: "Mobile Learning",
        text: "Mobile access lets students learn from preferred environments and schedules, while institutions can use digital signals to understand engagement.",
      },
      {
        title: "Data Management and Predictive Analytics",
        text: "Student performance data helps teachers identify gaps, plan interventions, reduce dropout risk, and support each learner more personally.",
      },
      {
        title: "Blockchain Credentials",
        text: "Distributed records can help verify certificates, credentials, examination data, and academic history with improved trust and transparency.",
      },
      {
        title: "AR, VR, RPA, and Smart Campuses",
        text: "Immersive technologies and automation can improve retention, simulate practical learning, streamline administration, and create better campus experiences.",
      },
      {
        title: "Artificial Intelligence",
        text: "AI learning assistants can support personalized tutoring, content recommendations, language support, and one-to-one attention at scale.",
      },
    ],
    useCases: [
      "Learning management systems",
      "Smart classrooms",
      "Online assessments",
      "Student analytics",
      "Attendance and fee systems",
      "Parent portals",
      "Digital credentials",
      "Virtual learning platforms",
    ],
    challengesTitle: "Key Education Challenges",
    challenges: [
      {
        title: "Connectivity and Access",
        text: "Low internet connectivity, power failures, and high connectivity costs can make digital learning difficult, especially in remote areas.",
      },
      {
        title: "Too Many Edtech Choices",
        text: "Institutions and parents often face too many tools and platforms. Choosing the right fit requires clarity, research, and practical implementation planning.",
      },
      {
        title: "Student Data Privacy",
        text: "Analytics can improve learning outcomes, but student data must be handled ethically with clear privacy policies and access controls.",
      },
      {
        title: "Rising Education Cost",
        text: "Digital tools should reduce friction, not add unnecessary burden. Institutions need cost-conscious platforms that support measurable academic value.",
      },
      {
        title: "Teacher Training",
        text: "Technology changes quickly. Teachers and administrators need practical training so platforms support learning instead of creating confusion.",
      },
      {
        title: "Institutional Capacity",
        text: "Without strong implementation processes, administrative readiness, and IT capacity, education technology can fail to deliver meaningful results.",
      },
    ],
    closing: "Technology will not replace great teachers, but it can amplify great teaching when implemented well.",
    closingDetails: [
      "Luxmorai can build LMS platforms, student portals, assessment systems, parent communication tools, analytics dashboards, and institution management systems.",
      "The goal is to support learning quality, administration, access, and long-term education outcomes.",
    ],
  },
  {
    slug: "retail-ecommerce",
    title: "Retail / Ecommerce",
    text: "Digital storefronts, personalization, checkout, supply chain, and customer journeys.",
    image: "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?auto=format&fit=crop&w=1200&q=80",
    icon: ShoppingBag,
    intro: [
      "Retail is adapting to new shopper expectations, mobile buying, ecommerce growth, and the demand for personalized brand experiences.",
      "Digital retail systems help businesses improve conversion, manage operations, understand customer behavior, and compete in an always-on market.",
      "Customers now expect fast browsing, smooth checkout, personalized recommendations, convenient returns, and consistent experiences across web, mobile, social, and store channels.",
      "Retailers need technology that connects product data, inventory, pricing, payment, logistics, marketing, and customer service into one practical operating model.",
    ],
    trendsTitle: "Emerging Retail Technology Trends",
    trends: [
      {
        title: "Online Shopping Growth",
        text: "Ecommerce continues to reshape retail by changing pricing, promotions, product discovery, and buyer behavior across categories.",
      },
      {
        title: "AI and Machine Learning",
        text: "AI supports chatbots, automated marketing, dynamic pricing, discounting, customer segmentation, and hyper-personalized product experiences.",
      },
      {
        title: "AR, VR, and 3D Product Experiences",
        text: "Virtual try-on, product previews, and 3D visualization help customers understand products before purchasing and reduce uncertainty.",
      },
      {
        title: "IoT and 5G",
        text: "Smart shelves, automated checkout, connected inventory, and faster mobile shopping become easier with IoT devices and stronger connectivity.",
      },
      {
        title: "Data Collection and Analytics",
        text: "Retailers can combine point-of-sale data, website behavior, marketing data, and customer profiles to improve decisions and conversion.",
      },
      {
        title: "Voice Shopping and Social Commerce",
        text: "Voice interfaces and social platforms create new channels for product discovery, customer engagement, and repeat purchase behavior.",
      },
      {
        title: "QR Code Payments",
        text: "QR payments are simple, familiar, and secure for many customers, especially in mobile-first commerce environments.",
      },
    ],
    useCases: [
      "Product recommendations",
      "Personalization",
      "Supply chain optimization",
      "Checkout systems",
      "Inventory management",
      "Customer loyalty portals",
      "Order management",
      "Returns workflows",
    ],
    challengesTitle: "Key Retail Challenges",
    challenges: [
      {
        title: "Cybersecurity",
        text: "Retail platforms handle personal data, payments, loyalty accounts, and order history. They must protect against fraud, attacks, and data misuse.",
      },
      {
        title: "Machine Learning Barriers",
        text: "Useful ML requires reliable data, hosting, integration, and operational skill. Without the right setup, it becomes expensive and hard to maintain.",
      },
      {
        title: "Payment Complexity",
        text: "Customers expect cards, wallets, net banking, cash-on-delivery, and other options. Each adds security, reconciliation, and return-management complexity.",
      },
      {
        title: "Technology Asset Gaps",
        text: "Smaller retailers may struggle to build strong digital infrastructure while competing with larger companies that invest heavily in technology.",
      },
      {
        title: "Hyper-Personalization",
        text: "Personalization requires organized customer data, privacy controls, meaningful segmentation, and systems that can act on insights quickly.",
      },
      {
        title: "Cart Abandonment and Low Conversion",
        text: "Poor checkout design, unclear costs, slow pages, and weak trust signals can lead to abandoned carts and lost revenue.",
      },
    ],
    closing: "Retail growth now depends on using technology to create compelling, convenient, and trusted experiences.",
    closingDetails: [
      "Luxmorai can help create ecommerce platforms, product catalogs, payment flows, customer portals, inventory dashboards, recommendation systems, and marketing automation.",
      "The goal is to make shopping easier for customers and operations clearer for business teams.",
    ],
  },
  {
    slug: "manufacturing",
    title: "Manufacturing",
    text: "Automation, ERP, smart factories, connected products, and industry 4.0.",
    image: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?auto=format&fit=crop&w=1200&q=80",
    icon: Wrench,
    intro: [
      "Manufacturing is being reshaped by Industry 4.0, connected products, intelligent operations, and customer expectations for speed and flexibility.",
      "Smart manufacturing facilities help companies reduce costs, improve visibility, open new revenue streams, and connect the full product lifecycle.",
      "Manufacturers are no longer only makers. They are becoming the connecting thread across design, sourcing, production, quality, logistics, customer usage, and after-sales service.",
      "To stay competitive, manufacturing businesses need better control over raw materials, production planning, supply chains, machine performance, workforce productivity, and customer expectations.",
    ],
    trendsTitle: "Emerging Manufacturing Trends",
    trends: [
      {
        title: "Additive Manufacturing",
        text: "3D printing helps teams design and produce complex parts by building layer by layer. It improves prototyping speed, reduces waste, supports customization, and can change how manufacturers plan the product value chain.",
      },
      {
        title: "AI and Machine Learning",
        text: "AI and ML support smarter decisions from raw material sourcing to production planning and final delivery. They help detect patterns, forecast demand, automate repetitive work, and improve supply chain responsiveness.",
      },
      {
        title: "Cloud Manufacturing",
        text: "Cloud platforms give manufacturers scalable systems for simulation, maintenance, equipment monitoring, integrations, and management. This helps teams reduce infrastructure dependency while keeping operations connected.",
      },
      {
        title: "Industrial IoT and Connectivity",
        text: "IIoT, 5G, edge computing, broadband, and mesh networks connect machines, sensors, products, and teams. This creates real-time visibility into performance, downtime, quality, and production flow.",
      },
      {
        title: "Human-Centered Interfaces",
        text: "Augmented reality, virtual reality, auditory analytics, and computer vision can support training, inspections, guided operations, and safer shop-floor decisions while reducing manual effort.",
      },
      {
        title: "Customization and Connected Products",
        text: "Sensor data and customer signals help manufacturers understand usage patterns and market needs. This supports personalized products, service-based models, and stronger customer relationships.",
      },
      {
        title: "Collaborative Robots",
        text: "Cobots can work alongside people to inspect defects, move materials, support predictive analysis, and reduce hazardous manual tasks without fully replacing human judgment.",
      },
    ],
    useCases: ["ERP systems", "Production dashboards", "Predictive maintenance", "Quality control"],
    challengesTitle: "Key Manufacturing Challenges",
    challenges: [
      {
        title: "Big Data Complexity",
        text: "Manufacturers collect large volumes of machine, quality, inventory, production, and supply chain data. Without strong data standards, this becomes expensive to store, secure, control, and convert into useful insight.",
      },
      {
        title: "Difficult Technology Integration",
        text: "Legacy equipment, isolated departments, and long-running production processes make it difficult to introduce new systems. Teams need careful rollout plans, training, and integration architecture.",
      },
      {
        title: "Cybersecurity Risk",
        text: "Connected factories increase exposure to cyber threats. Attackers can target production facilities, machine networks, intellectual property, and operational systems, which can damage both output and reputation.",
      },
      {
        title: "High Capital Investment",
        text: "AI, RPA, biotechnology, nanotechnology, robotics, and connected infrastructure require serious investment. Manufacturers must balance modernization cost with customer pressure for quality and competitive pricing.",
      },
      {
        title: "Changing Customer Expectations",
        text: "Engineered-to-order and customized products reduce standardization and increase operational complexity. Manufacturers need trained teams and flexible systems to close these expectation gaps.",
      },
      {
        title: "Rigid Project Management",
        text: "Manufacturing projects are highly sensitive to cost, time, safety, and quality. Modern automation and project visibility tools can help teams manage change without losing control.",
      },
      {
        title: "People and Change Management",
        text: "The biggest challenge is often not the technology itself, but insecurity, resistance, and weak change management. A gradual transformation plan helps the workforce adapt with confidence.",
      },
    ],
    closing: "Manufacturers can unlock new possibilities by combining traditional strengths with disruptive technology.",
    closingDetails: [
      "Intelligent manufacturing allows companies to improve speed, reduce production cost, increase trust, and build new service-led business models.",
      "The journey cannot happen overnight. It requires a practical roadmap across people, processes, machines, data, and software.",
      "Luxmorai can help manufacturing businesses plan and build ERP systems, production dashboards, inventory tools, IoT-enabled monitoring, predictive maintenance, and quality-control platforms.",
    ],
  },
  {
    slug: "technology",
    title: "Technology",
    text: "Next-gen software and IT solutions for digital-first companies.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    icon: Building2,
    intro: [
      "Technology companies need scalable platforms, reliable engineering, secure cloud architecture, and fast product delivery.",
      "Luxmorai helps teams plan, build, integrate, and improve digital products that support long-term growth.",
      "Digital-first companies have to move quickly while keeping systems maintainable, secure, and ready for changing customer expectations.",
      "A strong technology foundation connects product strategy, frontend experience, backend services, integrations, analytics, deployment, and support.",
    ],
    trendsTitle: "Technology Priorities",
    trends: [
      {
        title: "Cloud-Native Development",
        text: "Cloud-ready systems help companies scale, deploy faster, manage infrastructure efficiently, and support distributed users.",
      },
      {
        title: "AI-Enabled Workflows",
        text: "AI can improve search, recommendations, automation, reporting, support, and internal productivity when connected to the right business data.",
      },
      {
        title: "Modern Web and Mobile Products",
        text: "Responsive interfaces, mobile-first journeys, fast APIs, and accessible UI patterns are essential for competitive digital products.",
      },
      {
        title: "Secure API Ecosystems",
        text: "APIs connect products, partners, payment systems, CRMs, reporting tools, and customer platforms, but they require careful security and monitoring.",
      },
      {
        title: "DevOps and Release Automation",
        text: "Automated builds, testing, deployments, logging, and monitoring help teams ship faster while reducing production risk.",
      },
    ],
    useCases: [
      "SaaS platforms",
      "Cloud applications",
      "Admin dashboards",
      "API integrations",
      "AI automation tools",
      "Customer portals",
      "Analytics dashboards",
      "DevOps pipelines",
    ],
    challengesTitle: "Common Challenges",
    challenges: [
      {
        title: "Scalability",
        text: "Products must handle growth in users, data, integrations, and features without becoming slow or expensive to maintain.",
      },
      {
        title: "Security",
        text: "Authentication, authorization, API protection, data privacy, and auditability must be built into the product from the beginning.",
      },
      {
        title: "Technical Debt",
        text: "Fast product cycles can create messy architecture. Teams need refactoring plans, code standards, and maintainable delivery practices.",
      },
      {
        title: "Release Speed",
        text: "Businesses need new features quickly, but releases should still be tested, observable, and reversible when issues appear.",
      },
      {
        title: "Integration Complexity",
        text: "Modern products often depend on CRMs, payment gateways, communication tools, analytics, and cloud services that must work reliably together.",
      },
    ],
    closing: "Strong technology architecture gives digital businesses room to move faster with confidence.",
    closingDetails: [
      "Luxmorai can support product engineering, cloud applications, AI workflows, APIs, dashboards, mobile apps, and managed delivery pipelines.",
      "The aim is to help technology businesses build products that are fast to ship and easier to maintain.",
    ],
  },
  {
    slug: "travel",
    title: "Travel",
    text: "Booking, trip planning, customer experience, and operations platforms.",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    icon: Plane,
    intro: [
      "Travel businesses depend on smooth customer journeys, real-time availability, secure payments, and responsive support systems.",
      "Digital platforms help travel companies improve booking, planning, communication, and operational visibility.",
      "Customers expect clear search, transparent pricing, itinerary updates, quick support, and reliable mobile access before, during, and after a trip.",
      "Travel teams need systems that connect inventory, bookings, agents, vendors, payments, customer messages, and operational reporting.",
    ],
    trendsTitle: "Travel Technology Priorities",
    trends: [
      {
        title: "Online Booking Systems",
        text: "Booking engines help customers search availability, compare options, reserve trips, and complete payments with less manual coordination.",
      },
      {
        title: "Customer Portals",
        text: "Portals give travelers access to bookings, invoices, support messages, travel documents, and itinerary changes in one place.",
      },
      {
        title: "Mobile-First Trip Planning",
        text: "Mobile experiences support discovery, booking, check-ins, reminders, maps, support, and travel updates while customers are on the move.",
      },
      {
        title: "Automated Notifications",
        text: "Email, SMS, WhatsApp, and app notifications can reduce support load by keeping customers updated about confirmations, changes, and reminders.",
      },
      {
        title: "Personalized Offers",
        text: "Customer history and preference data can help travel companies recommend packages, upgrades, and relevant services.",
      },
    ],
    useCases: [
      "Booking engines",
      "Travel CRM",
      "Itinerary management",
      "Payment integrations",
      "Agent dashboards",
      "Vendor portals",
      "Customer support workflows",
      "Review and feedback systems",
    ],
    challengesTitle: "Common Challenges",
    challenges: [
      {
        title: "Availability Management",
        text: "Travel inventory changes quickly. Systems must keep availability, pricing, and booking status accurate across teams and vendors.",
      },
      {
        title: "Payment Reliability",
        text: "Payments, refunds, deposits, invoices, and international transactions must be secure, trackable, and easy for customers to complete.",
      },
      {
        title: "Customer Support",
        text: "Travel customers often need fast help during time-sensitive moments. Digital support workflows reduce delays and missed communication.",
      },
      {
        title: "Operational Coordination",
        text: "Agents, vendors, transport providers, hotels, and customers need connected workflows so trip execution stays clear.",
      },
      {
        title: "Trust and Transparency",
        text: "Customers need clear pricing, cancellation policies, confirmation details, and reliable updates to feel confident booking online.",
      },
    ],
    closing: "Travel platforms work best when they make complex journeys feel simple for both customers and teams.",
    closingDetails: [
      "Luxmorai can build booking platforms, travel CRMs, itinerary tools, payment flows, customer portals, and operational dashboards.",
      "The focus is to make travel planning smoother, support faster, and business operations easier to manage.",
    ],
  },
];

export function getIndustryBySlug(slug: string | undefined) {
  return industries.find((industry) => industry.slug === slug);
}

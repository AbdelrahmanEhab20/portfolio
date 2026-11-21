// Single source of truth for the portfolio content.
// Facts come from Abdelrahman's CV and the live sites. Do not invent numbers or clients.
// Items marked TODO need confirmation from Abdelrahman.

export type Category = "Web" | "Mobile" | "SaaS" | "AI" | "Freelance" | "Personal";

export type ProjectLink = {
  label: string; // "Live site", "Demo video", "Admin portal", "GitHub (frontend)" ...
  url: string;
  kind: "live" | "demo" | "github" | "other";
};

export type ScreenshotShot = {
  url: string;
  file: string; // "cover", "02", "m01" ... (saved as .webp)
  theme?: "dark" | "light"; // emulated prefers-color-scheme
  mobile?: boolean; // 390x844 phone instead of 1440x900 desktop
  selector?: string; // scroll this element (e.g. "#pricing") to the top before capturing
};

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  year: string;
  sortDate: string; // YYYY-MM, used for ordering (newest first)
  role: string;
  type: string;
  company?: string;
  status: "Live" | "Private" | "Beta" | "Archived" | "Completed";
  private?: boolean;
  loginRequired?: boolean; // public landing page, app behind a login
  featured?: boolean;
  categories: Category[];
  overview: string;
  whatIDid: string[];
  features: string[];
  stack: string[];
  links: ProjectLink[];
  // "Request a demo" button (WhatsApp, with an email fallback) instead of public demo links.
  requestDemo?: { message: string; emailSubject: string };
  // Public pages the Playwright script may capture (npm run screenshots).
  // Plain URLs: first -> cover + m01, the rest -> 01, 02...  Objects: exact file name, theme and device.
  autoScreenshot?: (string | ScreenshotShot)[];
  mobile?: boolean; // show mobile screenshots in a phone frame
};

export const profile = {
  name: "Abdelrahman Mohamed Ehab",
  shortName: "Abdelrahman Ehab",
  title: "Full Stack Developer",
  location: "Cairo, Egypt",
  availableForFreelance: true,
  email: "abdelrahmanehab3232@gmail.com",
  phone: "",
  whatsapp: "https://wa.me/201116685662",
  linkedin: "https://www.linkedin.com/in/abdelrahman-ehab-71b38615a",
  github: "https://github.com/AbdelrahmanEhab20",
  cv: "/Abdelrahman_Mohamed_Ehab_CV.pdf",
  photo: "/me.webp", // TODO: add a recent professional photo
  hireUrl: "", // TODO: Mostaql / Upwork profile URL, or leave empty to point to Contact
  headline:
    "I build web and mobile products with React, Next.js, TypeScript, Node.js and Flutter — from SaaS dashboards to AI platforms.",
  summary:
    "Full Stack Developer with 4+ years of experience building and shipping web and mobile products for startups and enterprises in Egypt and the UAE. I work across the full stack: Next.js and React frontends, Node.js/Express microservices, Firebase and MongoDB/PostgreSQL data layers, and cross-platform Flutter apps. Recent work includes an enterprise RAG (document AI) platform with real-time streaming chat, and a digital business card SaaS used on web, iOS and Android.",
};

export const services = [
  { title: "Web apps & dashboards", text: "SaaS platforms, admin panels and AI products with React, Next.js and TypeScript.", icon: "LayoutDashboard" },
  { title: "Mobile apps", text: "Cross-platform Flutter apps for Android and iOS, including payments and real-time features.", icon: "Smartphone" },
  { title: "Backend & APIs", text: "Node.js / Express microservices, REST APIs, auth, and Firebase or MongoDB data layers.", icon: "Server" },
  { title: "Landing pages & company websites", text: "Fast, bilingual (Arabic / English), SEO-ready websites that represent your business well.", icon: "Globe" },
];

// Only real, recent testimonials with full name + role/company. Leave empty to hide the section.
export const testimonials: { quote: string; name: string; role: string }[] = [];

export const skills: Record<string, string[]> = {
  Frontend: ["React.js", "Next.js", "TypeScript", "JavaScript (ES6+)", "Redux", "Tailwind CSS", "shadcn/ui", "RTL / Arabic UI", "HTML5", "CSS3 / Sass", "Bootstrap"],
  Backend: ["Node.js", "Express.js", "REST APIs", "Microservices", "JWT Auth", "Server-Sent Events", "BFF pattern"],
  Mobile: ["Flutter", "Dart", "Android & iOS", "Paymob payments"],
  "Databases & Cloud": ["MongoDB / Mongoose", "PostgreSQL", "SQL", "Firebase (Firestore, Cloud Functions, Hosting)", "Vercel", "Azure CI/CD", "AWS"],
  Tools: ["Git & GitHub", "Jira", "Figma", "Postman", "Odoo 11 & 16", "Salla"],
};

export const experience = [
  {
    role: "Frontend Developer (Part-Time)",
    company: "Epsilon AI Analytics",
    dates: "Jun 2026 – Present",
    location: "Remote",
    bullets: [
      "Built the production Next.js frontend of an enterprise RAG (document AI) platform: auth flows, role-based access control and a full admin panel.",
      "Implemented real-time AI chat with Server-Sent Events (SSE) streaming.",
      "Integrated APIs through JWT auth and a Backend-for-Frontend layer; added full Arabic/RTL support.",
      "Prepared the CI/CD pipeline and deployment handoff to Azure.",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "SSE", "Azure"],
    projects: ["epsilon-insai"],
  },
  {
    role: "Full Stack Developer",
    company: "Graviton Ventures",
    dates: "Sep 2024 – Present",
    note: "Full-Time since Dec 2024; Part-Time Sep – Oct 2024",
    location: "UAE (Remote)",
    bullets: [
      "Develop and maintain Flickit, a digital business card platform on web, admin portal, iOS and Android.",
      "Design backend modules, Firestore collections and Cloud Functions, plus frontend pages and components.",
      "Applied database normalization and backup strategies that improved query performance and reduced infrastructure costs.",
      "Lead the Flutter app: package upgrades, memory and secret-leak fixes, deprecated API migration, consistent iOS/Android behaviour.",
      "Set up cloud services and environments for the GovFlow and Silo AI Notes SaaS products for demos and launch.",
    ],
    stack: ["React", "Next.js", "Flutter", "Node.js", "Firebase", "Vercel"],
    projects: ["flickit", "govflow", "silo-ai-notes"],
  },
  {
    role: "Full Stack Developer",
    company: "Lirten Solutions",
    dates: "Jun 2022 – Jan 2025",
    note: "Full-Time Jun 2022 – Oct 2024; Part-Time Nov 2024 – Jan 2025",
    location: "Maadi, Cairo",
    bullets: [
      "Converted Figma designs into responsive React.js websites and web/admin portals, including a reusable admin portal.",
      "Built Flutter/Dart mobile app UIs for Android and iOS.",
      "Developed Node.js/Express microservices: business policies, access rules, validation schemas and REST endpoints.",
    ],
    stack: ["React.js", "Flutter", "Node.js", "Express.js", "MongoDB", "Firebase"],
    links: [{ label: "Company site", url: "https://lirten-dev-website.web.app" }],
  },
];

export const projects: Project[] = [
  {
    slug: "epsilon-insai",
    title: "Epsilon AI — InsAI",
    tagline: "Enterprise document-AI (RAG) platform with real-time streaming chat",
    year: "2026",
    sortDate: "2026-06",
    role: "Frontend Developer",
    type: "Enterprise AI platform",
    company: "Epsilon AI Analytics",
    status: "Live",
    loginRequired: true,
    featured: true,
    categories: ["AI", "SaaS", "Web"],
    overview:
      "Epsilon AI Analytics offers three enterprise AI products in one platform: RAG.INS (chat with your documents and get sourced answers), VOICE.INS (voice queries and spoken AI answers in every language and dialect) and Construct INS (multiple assistants in one workspace, as tabs). I built the production frontend.",
    whatIDid: [
      "Built the full Next.js + TypeScript frontend from scratch to production.",
      "Implemented real-time chat with Server-Sent Events (SSE) streaming responses.",
      "Built auth flows and role-based access control.",
      "Integrated backend APIs through JWT authentication and a Backend-for-Frontend (BFF) layer.",
      "Added full Arabic / RTL support.",
      "Prepared CI/CD and deployment handoff to Azure.",
    ],
    features: [
      "Streaming AI chat over company documents",
      "Admin panel: channels, users, document ingestion, reports",
      "Role-based access control",
      "Product selection landing page",
      "English and Arabic with full RTL",
      "Adjustable text size",
      "Light and dark theme",
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "shadcn/ui", "JWT", "SSE", "Azure"],
    links: [
      { label: "Platform (login required)", url: "https://www.insai.epsilonaiglobal.com/", kind: "live" },
    ],
    requestDemo: {
      message: "Hi Abdelrahman, I'd like a demo of the Epsilon AI platform",
      emailSubject: "Epsilon AI platform demo",
    },
    autoScreenshot: [
      { url: "https://insai.epsilonaiglobal.com/", file: "cover", theme: "dark" },
      { url: "https://insai.epsilonaiglobal.com/", file: "02", theme: "light" },
      { url: "https://insai.epsilonaiglobal.com/", file: "m01", mobile: true },
    ],
  },
  {
    slug: "marpylon-ak-marble",
    title: "Marpylon — AK Marble",
    tagline: "Bilingual natural stone catalog for an Egyptian marble and granite exporter",
    year: "2025",
    sortDate: "2025-12", // TODO: confirm month — this is one of the latest projects
    role: "Freelance Frontend Developer",
    type: "Company website / catalog",
    status: "Live",
    featured: true,
    categories: ["Web", "Freelance"],
    overview:
      "A product-showcase website for Marpylon International Trading's AK Marble brand, presenting marble and granite slabs, blocks and cut-to-size products to international buyers.",
    whatIDid: [
      "Designed and built the frontend as a freelance project.",
      "Built a bilingual English / Arabic experience.",
      "Set up SEO metadata and social sharing previews.",
    ],
    features: [
      "Natural stone catalog: slabs, blocks, cut-to-size",
      "Projects gallery",
      "Request-a-quote flow",
      "English and Arabic",
    ],
    stack: ["React", "Firebase Hosting"], // TODO: confirm exact stack
    links: [{ label: "Live site", url: "https://marpylon.com/", kind: "live" }],
    autoScreenshot: [
      { url: "https://marpylon.com/", file: "cover" },
      { url: "https://marpylon.com/", file: "m01", mobile: true },
      // 01-03 are cropped from manual screenshots (company profile, exotic materials, projects).
      { url: "https://marpylon.com/en/products", file: "04" },
      { url: "https://marpylon.com/en/products/silver-root", file: "05" },
    ],
  },
  {
    slug: "flickit",
    title: "Flickit",
    tagline: "Digital business card platform for web, iOS and Android",
    year: "2024 – Present",
    sortDate: "2024-12",
    role: "Full Stack Developer",
    type: "SaaS product",
    company: "Graviton Ventures",
    status: "Live",
    featured: true,
    categories: ["SaaS", "Mobile", "Web"],
    mobile: true,
    overview:
      "Flickit lets people create and share professional digital contact cards. I maintain and extend the whole platform: the user website, the teams admin portal, the backend and the Flutter mobile app.",
    whatIDid: [
      "Add features across web, admin portal, backend and mobile app.",
      "Design backend modules, Firestore collections and Cloud Functions.",
      "Applied database normalization and backup strategies to improve performance and reduce costs.",
      "Lead the Flutter app: package upgrades, memory and secret-leak fixes, deprecated API migration.",
      "Integrated third-party email services; manage repos and PR reviews.",
    ],
    features: [
      "QR code sharing (works offline)",
      "In-app contact exchange and lead capture",
      "Apple Wallet and Google Wallet cards",
      "Teams admin portal",
    ],
    stack: ["Flutter", "React", "Next.js", "Firebase", "Firestore", "Cloud Functions", "Node.js"],
    links: [
      { label: "Website", url: "https://flickit.me/", kind: "live" },
      { label: "Teams portal", url: "https://teams.flickit.me/", kind: "live" },
    ],
    autoScreenshot: [
      { url: "https://flickit.me/", file: "cover" },
      { url: "https://teams.flickit.me/", file: "01" },
      { url: "https://flickit.me/", file: "02", selector: "#keyFeatures" },
      { url: "https://flickit.me/downloadflickit", file: "03" },
      { url: "https://flickit.me/", file: "m01", mobile: true },
    ],
  },
  {
    slug: "govflow",
    title: "GovFlow",
    tagline: "Workflow management system for governments and enterprises",
    year: "2024 – Present",
    sortDate: "2024-11",
    role: "Full Stack Developer",
    type: "SaaS product",
    company: "Graviton Ventures",
    status: "Beta",
    featured: true,
    categories: ["SaaS", "Web"],
    overview:
      "GovFlow digitizes government and enterprise workflows. I configure its cloud infrastructure, accounts and testing environments for live demos and production readiness.",
    whatIDid: [
      "Configured cloud services, accounts and test environments.",
      "Prepared the system for live demos and production go-live.",
    ],
    features: ["TODO: add 3–4 key features from the demo videos"],
    stack: ["Next.js", "Vercel"], // TODO: confirm
    links: [
      { label: "Landing page", url: "https://mygovflow.com/", kind: "live" },
      { label: "System (beta)", url: "https://test-govflow-beta.vercel.app/login", kind: "live" },
      { label: "Demo videos", url: "https://drive.google.com/drive/folders/1oU_BFN3aGtpexI1FUY5M6dYphtD73Xs_?usp=sharing", kind: "demo" },
    ],
    autoScreenshot: [
      { url: "https://mygovflow.com/", file: "cover" },
      { url: "https://test-govflow-beta.vercel.app/login", file: "01" },
      { url: "https://mygovflow.com/", file: "02", selector: "#features" },
      { url: "https://mygovflow.com/", file: "03", selector: "#benefits" },
      { url: "https://mygovflow.com/", file: "04", selector: "#security" },
      { url: "https://mygovflow.com/", file: "m01", mobile: true },
      { url: "https://mygovflow.com/", file: "m02", mobile: true, selector: "#features" },
    ],
  },
  {
    slug: "silo-ai-notes",
    title: "Silo AI Notes",
    tagline: "AI meeting notes: live transcription, summaries and action items",
    year: "2024 – Present",
    sortDate: "2024-10",
    role: "Full Stack Developer",
    type: "SaaS product",
    company: "Graviton Ventures",
    status: "Live",
    categories: ["SaaS", "AI", "Web"],
    overview:
      "A browser-based AI meeting assistant that captures meeting audio from any platform, transcribes it live and turns it into summaries, action items and decisions — without a bot joining the call. I built it as a SaaS product for the company on Base44, then created a standalone version that can be sold as a custom solution to any company.",
    whatIDid: [
      "Configured the backend data, logic and third-party integrations on Base44 to ship it as a SaaS product.",
      "Refined the UI and fixed details manually after each testing phase.",
      "Built a standalone custom version with its own frontend and backend: frontend on Vercel, backend on Render, data in MongoDB.",
      "Prepared services, accounts and environments for launch.",
    ],
    features: [
      "Works with Zoom, Google Meet, Teams and others",
      "Live transcription",
      "Summaries, owned action items and logged decisions",
      "Multiple inputs: recordings, files, video links, images, text",
    ],
    stack: ["Base44", "React", "Node.js", "MongoDB", "Vercel", "Render"],
    links: [{ label: "Website", url: "https://siloainotes.com/", kind: "live" }],
    autoScreenshot: [
      { url: "https://siloainotes.com/", file: "cover" },
      { url: "https://siloainotes.com/", file: "01", selector: "#how" },
      { url: "https://siloainotes.com/", file: "02", selector: "#capture" },
      { url: "https://siloainotes.com/", file: "03", selector: "#pricing" },
      { url: "https://siloainotes.com/AboutSilo", file: "04" },
      { url: "https://siloainotes.com/playground", file: "05" },
      { url: "https://siloainotes.com/", file: "m01", mobile: true },
    ],
  },
  {
    slug: "sabil-elmoslem",
    title: "Sabil Elmoslem",
    tagline: "Bilingual Islamic web app: prayer times, Qibla, azkar and Quran",
    year: "2025",
    sortDate: "2025-06",
    role: "Creator — design and development",
    type: "Personal project",
    status: "Live",
    categories: ["Web", "Personal"],
    overview:
      "A personal project I designed and built: an everyday Islamic companion in Arabic and English.",
    whatIDid: [
      "Designed and developed the whole app.",
      "Integrated the Aladhan API for prayer times and the AlQuran Cloud API for Quran text and translations.",
      "Built Arabic / English switching with RTL support.",
    ],
    features: [
      "Location-based prayer times",
      "Qibla direction",
      "Morning and evening azkar",
      "Quran reader with tajweed marks and multiple translations",
    ],
    stack: ["Next.js", "Vercel", "Aladhan API", "AlQuran Cloud API"], // TODO: confirm framework
    links: [{ label: "Live site", url: "https://sabil-elmoslem.vercel.app/", kind: "live" }],
    autoScreenshot: ["https://sabil-elmoslem.vercel.app/"],
  },
  {
    slug: "icon-furniture",
    title: "Icon Furniture",
    tagline: "Saudi luxury furniture store on Salla",
    year: "2025",
    sortDate: "2025-03",
    role: "Freelance Developer",
    type: "E-commerce",
    status: "Live",
    categories: ["Web", "Freelance"],
    overview:
      "A Saudi online furniture store built on the Salla platform. I reviewed, tested and improved the storefront.",
    whatIDid: [
      "Reviewed and tested the storefront end to end.",
      "Closed functionality gaps and improved performance.",
    ],
    features: ["Product categories and collections", "Arabic storefront", "Salla checkout"],
    stack: ["Salla", "HTML", "CSS", "JavaScript"],
    links: [{ label: "Live site", url: "https://iconfurniture-sa.com/", kind: "live" }],
    autoScreenshot: [
      { url: "https://iconfurniture-sa.com/", file: "cover" },
      { url: "https://iconfurniture-sa.com/", file: "m01", mobile: true },
      { url: "https://iconfurniture-sa.com/ar/%D9%83%D8%B1%D8%B3%D9%8A-%D8%A7%D8%B3%D8%AA%D8%B1%D8%AE%D8%A7%D8%A1/c567115825", file: "01" }, // lounge chairs category
      { url: "https://iconfurniture-sa.com/ar/%D9%88%D8%AD%D8%AF%D9%87-%D8%B9%D9%85%D9%84-%D8%AF%D9%8A%D9%83%D9%88%D8%B1%D9%8A%D9%87/p1604820902", file: "02" }, // product page
      { url: "https://iconfurniture-sa.com/ar/offers", file: "03" },
      { url: "https://iconfurniture-sa.com/ar/%D9%88%D8%AD%D8%AF%D9%87-%D8%B9%D9%85%D9%84-%D8%AF%D9%8A%D9%83%D9%88%D8%B1%D9%8A%D9%87/p1604820902", file: "m02", mobile: true },
    ],
  },
  {
    slug: "tbh-admin",
    title: "TBH Admin",
    tagline: "Modular workspace-management admin app (10+ modules)",
    year: "2023 – 2025",
    sortDate: "2023-06",
    role: "Full Stack Developer",
    type: "Mobile app",
    company: "Lirten Solutions",
    status: "Completed",
    categories: ["Mobile"],
    mobile: true,
    overview:
      "Admin app for The Business Hub, a business community and workspace in Maadi, used to run the whole space from a phone.",
    whatIDid: [
      "Built the Flutter app UI for Android and iOS.",
      "Built the Node.js backend modules.",
    ],
    features: ["Organizations and users", "Bookings", "Contracts and invoices", "Digital access"],
    stack: ["Flutter", "Dart", "Node.js", "Express.js"],
    links: [{ label: "Demo video", url: "https://drive.google.com/file/d/1zaMkkqKoevoB8OG-0YPK8Q9WyW1bCtns/view?usp=sharing", kind: "demo" }],
  },
  {
    slug: "tbh-member",
    title: "TBH Member",
    tagline: "Member app with room booking and Paymob payments",
    year: "2023 – 2025",
    sortDate: "2023-06",
    role: "Full Stack Developer",
    type: "Mobile app",
    company: "Lirten Solutions",
    status: "Completed",
    categories: ["Mobile"],
    mobile: true,
    overview: "The member-facing app of The Business Hub workspace.",
    whatIDid: ["Built the Flutter app for Android and iOS.", "Integrated Paymob payments."],
    features: ["Room booking", "Paymob payments", "Contract management"],
    stack: ["Flutter", "Dart", "Paymob", "Node.js"],
    links: [{ label: "Demo video", url: "https://drive.google.com/file/d/1nJ57ajvTSb8SIx-kr_XHnjwk33B8csYD/view?usp=sharing", kind: "demo" }],
  },
  {
    slug: "the-business-hub",
    title: "The Business Hub",
    tagline: "Website for a business community and workspace in Maadi",
    year: "2023",
    sortDate: "2023-12",
    role: "Frontend Developer",
    type: "Company website",
    company: "Lirten Solutions",
    status: "Live",
    categories: ["Web"],
    overview: "A single-page React.js website showcasing TBH services, room bookings and inquiries.",
    whatIDid: ["Built the website in React.js from Figma designs."],
    features: ["Services showcase", "Room bookings", "Inquiries"],
    stack: ["React.js", "Firebase Hosting"],
    links: [{ label: "Live site", url: "https://tbh-local-test-a67dc.web.app/", kind: "live" }],
    autoScreenshot: ["https://tbh-local-test-a67dc.web.app/"],
  },
  {
    slug: "innofilament",
    title: "Innofilament",
    tagline: "Product showcase and sales website",
    year: "2023",
    sortDate: "2023-10",
    role: "Frontend Developer",
    type: "Company website",
    company: "Lirten Solutions",
    status: "Live",
    categories: ["Web"],
    overview: "A React.js website for product showcasing, client inquiries and purchases.",
    whatIDid: ["Built the website in React.js."],
    features: ["Product showcase", "Client inquiries", "Purchases"],
    stack: ["React.js", "Firebase Hosting"],
    links: [{ label: "Live site", url: "https://innofilament-local-test.firebaseapp.com", kind: "live" }],
    autoScreenshot: ["https://innofilament-local-test.firebaseapp.com"],
  },
  {
    slug: "stract",
    title: "STRACT",
    tagline: "Freelancing marketplace — selected for AUC Venture Lab",
    year: "2022 – 2023",
    sortDate: "2022-06",
    role: "Full Stack Developer",
    type: "Platform (web + mobile)",
    company: "Lirten Solutions",
    status: "Completed",
    categories: ["Mobile", "Web"],
    mobile: true,
    overview:
      "A freelancing platform connecting clients and freelancers, with wallet, contracts, task tracking and chat. Selected for the AUC Venture Lab (V-Lab) startup program.",
    whatIDid: ["Built Flutter and web UIs.", "Worked on the Node.js microservice backend."],
    features: ["Wallet", "Contracts", "Task tracking", "Real-time chat"],
    stack: ["Flutter", "React.js", "Node.js", "Microservices", "MongoDB"],
    links: [{ label: "Demo video", url: "https://drive.google.com/file/d/1CggyXlwp1Tbnu0VYj7rWQLRx_L6gUyd8/view?usp=sharing", kind: "demo" }],
  },
  {
    slug: "artdeco",
    title: "ArtDeco",
    tagline: "Home-decoration marketplace — ITI graduation project",
    year: "2021 – 2022",
    sortDate: "2022-02",
    role: "Frontend Developer (team of 6)",
    type: "Graduation project",
    status: "Completed",
    categories: ["Web"],
    overview:
      "Built during the ITI Intensive Code Camp: a marketplace where customers get competing offers from verified companies to decorate homes, apartments and offices.",
    whatIDid: ["Built the React frontend with the frontend team."],
    features: ["Real-estate decoration marketplace", "Verified customers and companies", "Competing offers"],
    stack: ["React", "React Router", "Axios", "Tailwind CSS", "Material UI", "Node.js", "MongoDB"],
    links: [
      { label: "GitHub (frontend)", url: "https://github.com/abdallah-emam/clientArtDeco", kind: "github" },
      { label: "GitHub (backend)", url: "https://github.com/mostafa3537/ArtDeco-BackEnd", kind: "github" },
    ],
  },
  {
    slug: "indoor-tracking",
    title: "Indoor Tracking System",
    tagline: "Mobile app + hardware device for indoor navigation",
    year: "2021",
    sortDate: "2021-06",
    role: "Mobile Developer (team project)",
    type: "Graduation project",
    status: "Completed",
    categories: ["Mobile"],
    overview:
      "El Shorouk Academy graduation project: a mobile app paired with a hardware device that determines a user's indoor location and guides them to their destination. We built and tested it on a real floor of our college and demoed it live on graduation discussion day.",
    whatIDid: [
      "Built the Flutter mobile app.",
      "Collected and monitored the positioning data across the college floor used to locate users.",
      "Tested the system live during the graduation project discussion.",
    ],
    features: ["Indoor positioning", "Turn-by-turn guidance to a destination"],
    stack: ["Flutter", "Dart", "Indoor positioning hardware"],
    links: [],
  },
];

export const education = [
  { title: "B.Sc. Computer Science", org: "El Shorouk Academy", dates: "2017 – 2021", note: "Very Good with Honours — top 10 every year" },
  { title: "Full Stack Web Development Track", org: "ITI Intensive Code Camp (MCIT)", dates: "Nov 2021 – Feb 2022" },
];

export const certifications = [
  "MongoDB Node.js Developer Path — MongoDB University (2025)",
  "AWS Cloud Technical Essentials — AWS / Coursera (2024)",
  "SQL: A Practical Introduction — IBM / Coursera (2024)",
  "Master SQL, PostgreSQL, Database — Udemy (2024)",
  "The Ultimate React Course — Udemy (2023)",
  "NodeJS — The Complete Guide — Udemy (2023)",
  "Flutter & Dart — The Complete Guide — Udemy (2022)",
];

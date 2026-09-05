/**
 * Verified Portfolio Data SSOT for Nishant Trivedi
 * All metrics, roles, and project architectures are grounded in verified repository records.
 */

export interface ProjectData {
  id: string;
  chapter: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  githubUrl: string;
  liveUrl?: string;
  recognition?: string;
  stack: string[];
  features: string[];
  architecture?: {
    overview: string;
    flow: { step: string; title: string; desc: string }[];
    codeSnippet?: string;
  };
}

export interface ExperienceData {
  id: string;
  period: string;
  company: string;
  role: string;
  location: string;
  type: "Internship" | "Open Source" | "Leadership";
  contributions: string[];
  technologies: string[];
}

export interface AchievementData {
  id: string;
  title: string;
  badge: string;
  issuerOrVenue: string;
  year: string;
  description: string;
}

export interface CertificationData {
  name: string;
  issuer: string;
  domain: string;
  status: "Verified";
}

export const PERSONAL_INFO = {
  name: "Nishant Trivedi",
  role: "Software Engineer",
  subRole: "Full-Stack · Systems · AI Workflows",
  location: "Lucknow, Uttar Pradesh, India",
  timezone: "IST (UTC +05:30)",
  email: "trivedinishant880@gmail.com",
  education: {
    degree: "B.Tech Computer Science & Engineering",
    institution: "Dr. A.P.J. Abdul Kalam Technical University (AKTU)",
    location: "Lucknow, India",
    period: "July 2024 – September 2028",
  },
  socials: {
    github: "https://github.com/Nish0178",
    linkedin: "https://www.linkedin.com/in/nishant-trivedi-363ba3249",
    instagram: "https://www.instagram.com/nishant_trivedi.2111/",
    leetcode: "https://leetcode.com/u/Nishant_trivedi01111/",
    hackerrank: "https://www.hackerrank.com/profile/trivedinishant81",
    portfolioRepo: "https://github.com/Nish0178/Nishant-Trivedi-Portfolio",
  },
};

export const PROJECTS: ProjectData[] = [
  {
    id: "launchpilot-ai",
    chapter: "CHAPTER 01",
    title: "LaunchPilot AI",
    category: "Full-Stack AI Platform",
    tagline: "Deterministic AI startup validation, SWOT modeling, and synthetic investor simulation.",
    description:
      "Engineered a production-ready startup validation engine that analyzes market feasibility, constructs multi-angle SWOT assessments, questions unit economics via synthetic digital-twin co-founders, and outputs structured investor dossiers.",
    githubUrl: "https://github.com/Nish0178/Launch-pilot",
    liveUrl: "https://launch-pilot-eta.vercel.app",
    recognition: "Top 10 Runner-Up · QBX Arena Hackathon 2026",
    stack: [
      "Next.js 15",
      "TypeScript",
      "Node.js",
      "Express.js",
      "Prisma ORM",
      "SQLite",
      "Gemini 2.5 Flash",
      "Clerk Auth",
      "Tailwind CSS",
      "Render",
    ],
    features: [
      "Deterministic prompt chaining with strict JSON schema parsing",
      "Synthetic digital twin simulation challenging unit economics and GTM strategy",
      "Investor readiness scoring algorithms with dynamic SWOT synthesis",
      "Relational persistence of structured pitch dossiers via Prisma ORM",
    ],
    architecture: {
      overview:
        "User Input → Next.js 15 App Router → Express.js Micro-Router → Prompt Chaining Pipeline → Gemini 2.5 Flash Structured Schema Parser → Prisma ORM Persistence",
      flow: [
        {
          step: "01",
          title: "Constraint Ingestion",
          desc: "Validated TypeScript schemas capturing industry, ICP target personas, monetization parameters, and competitor inputs.",
        },
        {
          step: "02",
          title: "Multi-Pass Prompt Chaining",
          desc: "Hierarchical Gemini API passes synthesizing market viability, competitor gap models, and structured SWOT matrices.",
        },
        {
          step: "03",
          title: "Synthetic Co-Founder Simulation",
          desc: "Persona-driven synthetic simulation interrogating CAC/LTV unit economics, regulatory risk, and defensibility.",
        },
        {
          step: "04",
          title: "Relational Dossier Persistence",
          desc: "Type-safe database persistence with Prisma for versioned investor-readiness reports and pitch decks.",
        },
      ],
      codeSnippet: `// LaunchPilot AI: Deterministic Prompt Chaining & JSON Validation
export async function generateValidationReport(
  input: StartupPayload
): Promise<ValidationReport> {
  const constraintPrompt = buildSystemConstraintPrompt({
    domain: input.industry,
    targetAudience: input.targetPersona,
    monetization: input.pricingModel
  });

  const [market, swot, competitors, score] = await Promise.all([
    geminiClient.generateStructuredJSON<MarketReport>(
      constraintPrompt, input.problemStatement
    ),
    geminiClient.generateStructuredJSON<SWOTReport>(
      constraintPrompt, input.valueProposition
    ),
    geminiClient.generateStructuredJSON<CompetitorAnalysis>(
      constraintPrompt, input.competitors
    ),
    evaluateInvestorReadiness(input)
  ]);

  return prisma.validationReport.create({
    data: {
      userId: input.userId,
      projectName: input.name,
      investorReadinessScore: score.score,
      metrics: { market, swot, competitors },
      simulatedNotes: await runDigitalTwin(input)
    }
  });
}`,
    },
  },
  {
    id: "todopro",
    chapter: "CHAPTER 02",
    title: "TodoPro Engine",
    category: "Full-Stack Task & Productivity System",
    tagline: "Stateless JWT-authenticated productivity engine with weekly velocity charts.",
    description:
      "Architected and deployed a resilient task management engine featuring stateless token authentication, indexed MongoDB document collections for sub-millisecond querying, real-time productivity telemetry, and client PDF/CSV data exports.",
    githubUrl: "https://github.com/Nish0178/todo-pro-web",
    liveUrl: "https://todo-pro-web-frontend.onrender.com",
    stack: [
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "JWT Authentication",
      "Chart.js",
      "jsPDF",
      "Vanilla JavaScript",
      "Render Cloud",
    ],
    features: [
      "Stateless JWT auth with bcrypt-hashed credentials & route authorization guards",
      "Compound MongoDB indexing enabling low-latency task filtering and priority sorting",
      "Interactive productivity telemetry and completion velocity rendered with Chart.js",
      "Client-side document export pipeline supporting PDF and CSV report generation",
    ],
  },
  {
    id: "astrospacious",
    chapter: "CHAPTER 03",
    title: "Astrospacious",
    category: "Commercial Web Platform Delivery",
    tagline: "Responsive commercial web modules, DOM performance, and REST API integrations.",
    description:
      "Contributed to production web development at Astrospacious in an agile squad environment. Focused on engineering responsive cross-device UI modules, integrating Node.js REST endpoints, and optimizing DOM repaint performance.",
    githubUrl: "https://github.com/Nish0178",
    stack: [
      "HTML5",
      "CSS3",
      "JavaScript (ES6+)",
      "Node.js",
      "REST APIs",
      "Responsive Layouts",
      "Agile / Git Flow",
    ],
    features: [
      "Engineered responsive commercial interface modules across mobile, tablet, and desktop",
      "Connected client components with backend REST endpoints with defensive error handling",
      "Audited client scripts and reduced layout repaints to improve page rendering metrics",
      "Managed feature branches, Git pull requests, and peer code reviews during sprint cycles",
    ],
  },
];

export const EXPERIENCES: ExperienceData[] = [
  {
    id: "techdock-labs",
    period: "July 2026 – Present",
    company: "Techdock Labs",
    role: "AI Video Editor Intern",
    location: "Remote / Lucknow",
    type: "Internship",
    contributions: [
      "Engineering multimodal AI video generation workflows utilizing Google Veo, Google Flow, and Claude prompt architectures.",
      "Structuring repeatable prompt frameworks for generative video synthesis and automated asset transformation pipelines.",
      "Managing media storage pipelines and asset hosting workflows on Google Cloud Platform infrastructure.",
    ],
    technologies: ["Google Veo", "Google Flow", "Claude AI", "Prompt Engineering", "GCP", "Asset Pipelines"],
  },
  {
    id: "open-source-connect",
    period: "July 2026 – Present",
    company: "Open Source Connect Global",
    role: "Campus Lead & Contributor",
    location: "Campus / Remote",
    type: "Leadership",
    contributions: [
      "Leading the campus developer chapter, organizing open-source onboarding workshops, and mentoring 50+ students on Git workflows.",
      "Reviewing and submitting pull requests, bug fixes, and documentation improvements to active community repositories.",
      "Facilitating collaborative hack sessions focused on distributed version control and collaborative software development.",
    ],
    technologies: ["Git", "GitHub", "OSS Mentorship", "Code Reviews", "JavaScript", "Python"],
  },
  {
    id: "astrospacious-intern",
    period: "Nov 2025 – Aug 2026",
    company: "ASTROSPACIOUS",
    role: "Web Development Intern",
    location: "Remote",
    type: "Internship",
    contributions: [
      "Developed responsive client interface modules with clean semantic HTML5, modern CSS3 custom properties, and JavaScript.",
      "Integrated backend REST endpoints for dynamic data delivery with structured error fallbacks.",
      "Collaborated in agile sprint cycles, delivering assigned feature tickets and participating in weekly design reviews.",
    ],
    technologies: ["HTML5", "CSS3", "JavaScript", "Node.js", "REST APIs", "Agile Sprints"],
  },
  {
    id: "staxtech",
    period: "Jan 2026 – Apr 2026",
    company: "StaxTech",
    role: "Full-Stack Developer Intern",
    location: "Remote",
    type: "Internship",
    contributions: [
      "Engineered backend REST microservices in Node.js/Express.js with JWT authentication and middleware guards.",
      "Constructed MongoDB schemas with index optimization for high-throughput queries.",
      "Collaborated on API contracts, endpoint testing via Postman, and frontend data integration.",
    ],
    technologies: ["Node.js", "Express.js", "MongoDB", "JWT Auth", "REST APIs", "Postman"],
  },
  {
    id: "techkriti-iitk",
    period: "Jan 2026 – Apr 2026",
    company: "Techkriti, IIT Kanpur",
    role: "Campus Ambassador",
    location: "Campus",
    type: "Leadership",
    contributions: [
      "Represented IIT Kanpur's annual technical festival on campus, driving technical competition participation and hackathon teams.",
      "Coordinated campus technical outreach and managed student delegate registrations.",
    ],
    technologies: ["Technical Outreach", "Event Coordination", "Community Leadership"],
  },
  {
    id: "iit-guwahati",
    period: "Nov 2025 – Feb 2026",
    company: "IIT Guwahati",
    role: "Campus Ambassador",
    location: "Campus",
    type: "Leadership",
    contributions: [
      "Spearheaded technical promotions and student engagement for technical events and collegiate competitions.",
      "Facilitated campus workshops to promote algorithmic problem-solving and software engineering awareness.",
    ],
    technologies: ["Community Building", "Campus Outreach", "Student Engagement"],
  },
];

export const TECHNICAL_STACK = {
  languages: [
    { name: "Java", role: "Primary OOP, Backend Services, Enterprise Algorithms" },
    { name: "JavaScript (ES6+)", role: "Modern Async Web, Dynamic Systems" },
    { name: "TypeScript", role: "Type-Safe Contracts, Interface Architecture" },
    { name: "C++", role: "Systems Foundations, Algorithmic Problem Solving" },
    { name: "C", role: "Low-Level Memory Foundations" },
    { name: "Python", role: "Scripting, Automation, AI Integration" },
    { name: "SQL", role: "Relational Queries, Schema Normalization" },
  ],
  frontend: [
    { name: "React 19 & Next.js 15", role: "App Router, SSR/SSG, Server & Client Components" },
    { name: "Tailwind CSS v4", role: "Utility-First Tokens, Clean Design Systems" },
    { name: "Motion (motion/react)", role: "Spring Physics, Staggered Reveals, Scroll Choreography" },
    { name: "Chart.js", role: "Telemetry Visualization & Analytical Velocity Charts" },
    { name: "HTML5 & CSS3", role: "Semantic Structure, Custom Properties, Responsive Layouts" },
  ],
  backend: [
    { name: "Node.js", role: "High-Concurrency Async Runtime" },
    { name: "Express.js", role: "REST API Microservices, Routing & Middleware Pipelines" },
    { name: "RESTful API Architecture", role: "Stateless Resource Schemas, Defensive Error Handling" },
    { name: "JWT Authentication", role: "Token-Based Stateless Auth & Route Guards" },
  ],
  databases: [
    { name: "MongoDB", role: "Document NoSQL, Aggregation Pipelines & Compound Indexing" },
    { name: "MySQL & PostgreSQL", role: "Relational Relational Integrity, Foreign Keys & Acid Transactions" },
    { name: "SQLite", role: "Embedded Local Storage & Fast Prototyping" },
    { name: "Prisma ORM", role: "Type-Safe Client, Schema Migrations & Queries" },
  ],
  toolsAndCloud: [
    { name: "Git & GitHub", role: "Version Control, Branching Strategy & PR Code Reviews" },
    { name: "Render Cloud", role: "Continuous Deployment Pipelines" },
    { name: "Google Cloud Platform (GCP)", role: "Media Asset Storage & Cloud Services" },
    { name: "Postman", role: "API Debugging, Contract Validation & Testing" },
  ],
  aiEcosystem: [
    { name: "Google Gemini 2.5 Flash", role: "Structured JSON Output, Fast Inference" },
    { name: "Claude (Anthropic)", role: "Complex Prompt Chaining & Architectural Analysis" },
    { name: "OpenAI GPT", role: "Synthetic Twin Simulation & Analysis" },
    { name: "AI Tooling (Cursor, Antigravity, n8n)", role: "Accelerated Systems Engineering" },
  ],
  csFundamentals: [
    { name: "Data Structures & Algorithms", role: "Monotonic Stacks, Trees, Graphs, DP, Sliding Window" },
    { name: "Object-Oriented Programming", role: "Encapsulation, Polymorphism, Design Patterns" },
    { name: "Database Management Systems", role: "Indexing, Transactions, Schema Normalization" },
    { name: "Operating Systems", role: "Process Scheduling, Concurrency, Memory Management" },
  ],
};

export const LEETCODE_METRICS = {
  profileUrl: "https://leetcode.com/u/Nishant_trivedi01111/",
  totalSolvedVerified: "400+",
  languagesBreakdown: {
    java: "400",
    mysql: "13",
    bash: "4",
  },
  contestRating: "1415",
  streakSnapshot: "50 Days Badge 2026",
  globalRankSnapshot: "~283,969",
  coreTopics: [
    { topic: "Arrays & Sliding Window", count: "90+", desc: "Prefix sums, monotonic queues, two pointers" },
    { topic: "Binary Trees & BSTs", count: "65+", desc: "DFS/BFS traversals, LCA, subtree memoization" },
    { topic: "Dynamic Programming", count: "50+", desc: "1D/2D memoization, knapsack, state transitions" },
    { topic: "Graphs & BFS/DFS", count: "40+", desc: "Cycle detection, topological sort, shortest path" },
    { topic: "Linked Lists & Stacks", count: "30+", desc: "LRU caching, pointer reversals, monotonic stacks" },
    { topic: "Binary Search & Math", count: "40+", desc: "Search space reduction, bitwise manipulations" },
  ],
};

export const ACHIEVEMENTS: AchievementData[] = [
  {
    id: "qbx-arena-2026",
    title: "QBX Arena Hackathon 2026",
    badge: "Top 10 Runner-Up",
    issuerOrVenue: "GGES University, Unnao",
    year: "2026",
    description:
      "Recognized nationally for engineering LaunchPilot AI — an AI-powered startup validation and simulation platform.",
  },
  {
    id: "open-source-lead",
    title: "Open Source Connect Global",
    badge: "Campus Lead",
    issuerOrVenue: "Open Source Connect",
    year: "2026",
    description:
      "Spearheaded campus open-source initiative, organizing onboarding workshops and mentoring 50+ developers.",
  },
  {
    id: "winter-of-code",
    title: "Elite Coders Winter of Code",
    badge: "Official Contributor",
    issuerOrVenue: "Elite Coders",
    year: "2026",
    description:
      "Contributed production code patches, algorithmic implementations, and documentation to active OSS repositories.",
  },
  {
    id: "leetcode-discipline",
    title: "Algorithmic Problem Solving",
    badge: "400+ Solved · 1415 Rating",
    issuerOrVenue: "LeetCode",
    year: "2026",
    description:
      "Demonstrated continuous algorithmic rigor across core Data Structures & Algorithms in Java.",
  },
];

export const CERTIFICATIONS: CertificationData[] = [
  { name: "Oracle Cloud Infrastructure AI Foundations Associate", issuer: "Oracle", domain: "Cloud & AI", status: "Verified" },
  { name: "Java (Basic) Skills Assessment", issuer: "HackerRank", domain: "Java", status: "Verified" },
  { name: "Software Engineer Intern Certificate", issuer: "HackerRank", domain: "Problem Solving", status: "Verified" },
  { name: "Data Analysis / Business Intelligence", issuer: "Microsoft / LinkedIn", domain: "Data & BI", status: "Verified" },
  { name: "Web Development with HTML, CSS & JavaScript", issuer: "Simplilearn", domain: "Web Development", status: "Verified" },
  { name: "Front-End Development Foundations", issuer: "DevTown", domain: "Frontend", status: "Verified" },
  { name: "Google Developers Community Member", issuer: "Google", domain: "Community", status: "Verified" },
  { name: "Microsoft Student Chapter Member", issuer: "Microsoft", domain: "Community", status: "Verified" },
];

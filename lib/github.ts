/**
 * GitHub-Driven Project Data Layer for Nishant Trivedi Portfolio
 * 
 * Provides server-side fetching, caching, normalization, eligibility filtering,
 * hybrid curated enrichment, and deduplication for repositories under github.com/Nish0178.
 */

import { PROJECTS as CURATED_PROJECTS, ProjectData } from "./portfolio-data";

export const GITHUB_USERNAME = "Nish0178";

/**
 * Explicit repository exclusion configuration.
 * Always filters out the portfolio meta-repo, tutorial forks, and personal profile README.
 */
export const GITHUB_PROJECT_EXCLUSIONS = [
  "Nishant-Trivedi-Portfolio",
  "first-contributions",
  "Nish0178",
];

/**
 * Server-side cache revalidation interval: 15 minutes (900 seconds).
 */
export const CACHE_REVALIDATION_SECONDS = 900;

export type ProjectSource = "github" | "curated";

export interface GitHubRepositoryRaw {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  fork: boolean;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics?: string[];
  updated_at: string;
  private: boolean;
  owner: {
    login: string;
  };
}

export interface GitHubRepository {
  id: number;
  name: string;
  fullName: string;
  htmlUrl: string;
  homepage: string | null;
  description: string | null;
  language: string | null;
  topics: string[];
  stargazersCount: number;
  forksCount: number;
  updatedAt: string;
  fork: boolean;
  private: boolean;
  owner: {
    login: string;
  };
}

export interface UnifiedProject {
  id: string;
  name: string;
  displayTitle: string;
  category: string;
  tagline?: string;
  description: string | null;
  htmlUrl: string;
  homepage: string | null;
  language: string | null;
  topics: string[];
  stars: number;
  forks: number;
  updatedAt: string;
  featured: boolean;
  chapter?: string;
  source: ProjectSource;
  technologies: string[];
  features?: string[];
  recognition?: string;
  architecture?: {
    overview: string;
    flow: { step: string; title: string; desc: string }[];
    codeSnippet?: string;
  };
  telemetry?: {
    node: string;
    specs: { label: string; value: string; highlight?: boolean }[];
    codeSnippet?: string;
    p95Latency?: string;
  };
}

/**
 * Normalizes raw GitHub REST API object into a clean type-safe representation.
 */
export function normalizeGitHubRepository(raw: GitHubRepositoryRaw): GitHubRepository {
  return {
    id: raw.id,
    name: raw.name,
    fullName: raw.full_name,
    htmlUrl: raw.html_url,
    homepage: raw.homepage && raw.homepage.trim().length > 0 ? raw.homepage.trim() : null,
    description: raw.description && raw.description.trim().length > 0 ? raw.description.trim() : null,
    language: raw.language || null,
    topics: Array.isArray(raw.topics) ? raw.topics : [],
    stargazersCount: typeof raw.stargazers_count === "number" ? raw.stargazers_count : 0,
    forksCount: typeof raw.forks_count === "number" ? raw.forks_count : 0,
    updatedAt: raw.updated_at || new Date().toISOString(),
    fork: Boolean(raw.fork),
    private: Boolean(raw.private),
    owner: {
      login: raw.owner?.login || "",
    },
  };
}

/**
 * Eligibility filter adhering to Section 4:
 * - Owned by Nish0178
 * - Public repositories
 * - Non-fork repositories
 * - Excludes configured meta/contribution repositories
 */
export function filterEligibleRepositories(repos: GitHubRepository[]): GitHubRepository[] {
  return repos.filter((repo) => {
    // 1. Must be owned by Nish0178
    if (repo.owner.login.toLowerCase() !== GITHUB_USERNAME.toLowerCase()) {
      return false;
    }

    // 2. Must be public
    if (repo.private) {
      return false;
    }

    // 3. Must not be a fork
    if (repo.fork) {
      return false;
    }

    // 4. Must not be in exclusion list (case-insensitive check)
    const isExcluded = GITHUB_PROJECT_EXCLUSIONS.some(
      (excluded) => excluded.toLowerCase() === repo.name.toLowerCase()
    );
    if (isExcluded) {
      return false;
    }

    return true;
  });
}

/**
 * Helper to generate human-readable display titles from repository slugs.
 * Examples:
 *   "groweasy-ai-importer" -> "GrowEasy AI Importer"
 *   "Nixzora-frontend"     -> "Nixzora Frontend"
 *   "github-card"          -> "GitHub Card"
 *   "Password-Generator"   -> "Password Generator"
 *   "Netflix_clone"        -> "Netflix Clone"
 */
export function formatProjectTitle(repoName: string): string {
  // Common title overrides for proper casing
  const titleMap: Record<string, string> = {
    "launch-pilot": "LaunchPilot AI",
    "todo-pro-web": "TodoPro Engine",
    "groweasy-ai-importer": "GrowEasy AI Importer",
    "nixzora-frontend": "Nixzora Frontend",
    "github-card": "GitHub Profile Card Generator",
    "password-generator": "Secure Password Generator",
    "netflix_clone": "Netflix Streaming Interface",
  };

  const key = repoName.toLowerCase();
  if (titleMap[key]) {
    return titleMap[key];
  }

  return repoName
    .replace(/[-_]+/g, " ")
    .split(" ")
    .filter(Boolean)
    .map((word) => {
      const lower = word.toLowerCase();
      if (lower === "ai") return "AI";
      if (lower === "ui") return "UI";
      if (lower === "api") return "API";
      if (lower === "jwt") return "JWT";
      if (lower === "db") return "DB";
      if (lower === "oss") return "OSS";
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

/**
 * Maps GitHub repository names to curated project IDs for deduplication.
 */
const REPO_TO_CURATED_ID: Record<string, string> = {
  "launch-pilot": "launchpilot-ai",
  "todo-pro-web": "todopro",
};

/**
 * Fallback static projects list used if GitHub API is unreachable.
 * Ensures the portfolio NEVER renders blank or displays a fatal error screen.
 */
export const FALLBACK_PROJECTS: UnifiedProject[] = [
  {
    id: "launchpilot-ai",
    name: "Launch-pilot",
    displayTitle: "LaunchPilot AI",
    category: "Full-Stack AI Platform",
    tagline: "Deterministic AI startup validation, SWOT modeling, and synthetic investor simulation.",
    description:
      "Engineered a production-ready startup validation engine that analyzes market feasibility, constructs multi-angle SWOT assessments, questions unit economics via synthetic digital-twin co-founders, and outputs structured investor dossiers.",
    htmlUrl: "https://github.com/Nish0178/Launch-pilot",
    homepage: "https://launch-pilot-eta.vercel.app",
    language: "TypeScript",
    topics: ["ai-agent", "gemini-api", "nextjs15", "prisma", "typescript"],
    stars: 1,
    forks: 0,
    updatedAt: "2026-06-21T17:53:37Z",
    featured: true,
    chapter: "CHAPTER 01",
    source: "curated",
    technologies: [
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
    recognition: "Top 10 Runner-Up · QBX Arena Hackathon 2026",
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
      codeSnippet: `export const ValidationSchema = z.object({
  viabilityScore: z.number().min(0).max(100),
  marketFit: z.enum(["HIGH", "MODERATE", "LOW"]),
  techStack: z.array(z.string()),
});`,
    },
    telemetry: {
      node: "NODE // 01",
      specs: [
        { label: "ARCHITECTURE:", value: "Next.js + Express Pipeline" },
        { label: "AI CORE:", value: "Gemini 2.5 Flash", highlight: true },
        { label: "DATABASE:", value: "SQLite via Prisma ORM" },
        { label: "VALIDATION:", value: "Strict Zod Type Schemas" },
        { label: "DATAFLOW:", value: "Client → Express → AI → DB" },
        { label: "DEPLOYMENT:", value: "Vercel (Production)" },
      ],
      codeSnippet: `export const ValidationSchema = z.object({\n  viabilityScore: z.number().min(0).max(100),\n  marketFit: z.enum(["HIGH", "MODERATE", "LOW"]),\n  techStack: z.array(z.string()),\n});`,
    },
  },
  {
    id: "todopro",
    name: "todo-pro-web",
    displayTitle: "TodoPro Engine",
    category: "Full-Stack Task & Productivity System",
    tagline: "Stateless JWT-authenticated productivity engine with weekly velocity charts.",
    description:
      "Full-stack task management application featuring stateless JWT authentication, MongoDB indexing, priority scheduling, dynamic Chart.js productivity telemetry, and client-side jsPDF/CSV report generation.",
    htmlUrl: "https://github.com/Nish0178/todo-pro-web",
    homepage: "https://todo-pro-web-frontend.onrender.com",
    language: "JavaScript",
    topics: ["mongodb", "express", "jwt", "chartjs", "productivity"],
    stars: 1,
    forks: 0,
    updatedAt: "2026-06-02T07:45:11Z",
    featured: true,
    chapter: "CHAPTER 02",
    source: "curated",
    technologies: [
      "JavaScript",
      "Node.js",
      "Express.js",
      "MongoDB Atlas",
      "Mongoose",
      "Chart.js",
      "jsPDF",
      "JWT Auth",
    ],
    features: [
      "Stateless JWT auth with bcrypt-hashed credentials & route authorization guards",
      "Compound MongoDB indexing enabling low-latency task filtering and priority sorting",
      "Interactive productivity telemetry and completion velocity rendered with Chart.js",
      "Client-side document export pipeline supporting PDF and CSV report generation",
    ],
    telemetry: {
      node: "NODE // 02",
      specs: [
        { label: "AUTH PROTOCOL:", value: "Stateless JWT + Bcrypt" },
        { label: "DATABASE:", value: "MongoDB Atlas + Mongoose", highlight: true },
        { label: "VISUALIZATION:", value: "Chart.js Velocity Engine" },
        { label: "DATA EXPORT:", value: "jsPDF + Dynamic CSV" },
        { label: "HOSTING:", value: "Render Cloud Deployment" },
      ],
      p95Latency: "< 120ms",
    },
  },
  {
    id: "astrospacious",
    name: "astrospacious",
    displayTitle: "Astrospacious",
    category: "Commercial Web Platform Delivery",
    tagline: "Responsive commercial web modules, DOM performance, and REST API integrations.",
    description:
      "Commercial web application interfaces and frontend modules built as a Web Development Intern, delivering high-performance UI components, seamless mobile responsiveness, and clean Git collaboration.",
    htmlUrl: "https://github.com/Nish0178",
    homepage: null,
    language: "JavaScript",
    topics: ["react", "responsive-ui", "internship", "dom-optimization"],
    stars: 0,
    forks: 0,
    updatedAt: "2026-08-01T00:00:00Z",
    featured: true,
    chapter: "CHAPTER 03",
    source: "curated",
    technologies: [
      "React.js",
      "Tailwind CSS",
      "JavaScript",
      "HTML5",
      "CSS3",
      "Responsive UI",
      "Git Workflow",
    ],
    features: [
      "Engineered responsive commercial interface modules across mobile, tablet, and desktop",
      "Connected client components with backend REST endpoints with defensive error handling",
      "Audited client scripts and reduced layout repaints to improve page rendering metrics",
      "Managed feature branches, Git pull requests, and peer code reviews during sprint cycles",
    ],
    telemetry: {
      node: "NODE // 03",
      specs: [
        { label: "ORGANIZATION:", value: "ASTROSPACIOUS" },
        { label: "ROLE:", value: "Web Development Intern", highlight: true },
        { label: "DURATION:", value: "Nov 2025 – Aug 2026" },
        { label: "FOCUS:", value: "Commercial UI Architecture" },
        { label: "CONTRIBUTION:", value: "Verified Internship Engineering" },
      ],
    },
  },
  {
    id: "groweasy-ai-importer",
    name: "groweasy-ai-importer",
    displayTitle: "GrowEasy AI Importer",
    category: "TypeScript Automation Service",
    description: "Automated data ingestion and transformation utility built with TypeScript.",
    htmlUrl: "https://github.com/Nish0178/groweasy-ai-importer",
    homepage: "https://groweasy-ai-importer-ten.vercel.app",
    language: "TypeScript",
    topics: ["automation", "ai-importer", "typescript"],
    stars: 0,
    forks: 0,
    updatedAt: "2026-07-15T20:38:05Z",
    featured: false,
    source: "github",
    technologies: ["TypeScript", "Vercel"],
  },
  {
    id: "nixzora-frontend",
    name: "Nixzora-frontend",
    displayTitle: "Nixzora Frontend",
    category: "TypeScript Web Application",
    description: null,
    htmlUrl: "https://github.com/Nish0178/Nixzora-frontend",
    homepage: null,
    language: "TypeScript",
    topics: ["frontend", "typescript"],
    stars: 0,
    forks: 0,
    updatedAt: "2026-07-08T05:36:51Z",
    featured: false,
    source: "github",
    technologies: ["TypeScript"],
  },
  {
    id: "github-card",
    name: "github-card",
    displayTitle: "GitHub Profile Card Generator",
    category: "CSS & Web Presentation",
    description: "Modern GitHub Profile Card Generator & Profile finder",
    htmlUrl: "https://github.com/Nish0178/github-card",
    homepage: "https://nish0178.github.io/github-card/",
    language: "CSS",
    topics: ["github-api", "profile-card", "css"],
    stars: 1,
    forks: 0,
    updatedAt: "2026-06-01T16:44:30Z",
    featured: false,
    source: "github",
    technologies: ["CSS", "JavaScript", "GitHub API"],
  },
  {
    id: "password-generator",
    name: "Password-Generator",
    displayTitle: "Secure Password Generator",
    category: "Cryptographic Utility",
    description: "A secure password generator web application",
    htmlUrl: "https://github.com/Nish0178/Password-Generator",
    homepage: "https://nish0178.github.io/Password-Generator/",
    language: "JavaScript",
    topics: ["security", "generator", "utility"],
    stars: 2,
    forks: 0,
    updatedAt: "2026-03-29T06:56:38Z",
    featured: false,
    source: "github",
    technologies: ["JavaScript", "HTML5", "CSS3"],
  },
  {
    id: "netflix_clone",
    name: "Netflix_clone",
    displayTitle: "Netflix Streaming Interface",
    category: "Frontend UI Architecture",
    description: "Created with CodeSandbox",
    htmlUrl: "https://github.com/Nish0178/Netflix_clone",
    homepage: "https://codesandbox.io/p/github/Nish0178/Netflix_clone",
    language: "HTML",
    topics: ["streaming-ui", "html", "css"],
    stars: 2,
    forks: 0,
    updatedAt: "2026-03-29T06:57:27Z",
    featured: false,
    source: "github",
    technologies: ["HTML5", "CSS3", "JavaScript"],
  },
];

/**
 * Fetches all public repositories for Nish0178 with pagination support.
 * Uses Next.js native fetch revalidation (15 minutes).
 */
export async function fetchGitHubRepositories(): Promise<GitHubRepository[]> {
  const allRepos: GitHubRepository[] = [];
  let page = 1;
  const perPage = 100;
  const maxPages = 5; // Supports up to 500 repositories in the future

  while (page <= maxPages) {
    const url = `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=${perPage}&page=${page}&sort=updated&direction=desc`;
    
    const response = await fetch(url, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "Nishant-Trivedi-Portfolio-Sync",
      },
      next: {
        revalidate: CACHE_REVALIDATION_SECONDS,
      },
    });

    if (!response.ok) {
      throw new Error(`GitHub API responded with status ${response.status}: ${response.statusText}`);
    }

    const data = (await response.json()) as GitHubRepositoryRaw[];
    if (!Array.isArray(data) || data.length === 0) {
      break;
    }

    const normalized = data.map(normalizeGitHubRepository);
    allRepos.push(...normalized);

    // If fewer items returned than perPage, we reached the last page
    if (data.length < perPage) {
      break;
    }

    page++;
  }

  return allRepos;
}

/**
 * Merges discovered GitHub repositories with curated portfolio records:
 * 1. Matches GitHub repositories to curated entries (e.g. Launch-pilot -> LaunchPilot AI).
 * 2. Enriches matched curated entries with live GitHub data (stars, updatedAt, htmlUrl, topics).
 * 3. Preserves purely curated entries (e.g. Astrospacious).
 * 4. Converts newly discovered repositories into normalized UnifiedProject entries.
 * 5. Guarantees deduplication.
 */
export function mergeWithCuratedProjects(
  githubRepos: GitHubRepository[],
  curatedFallback: UnifiedProject[] = FALLBACK_PROJECTS
): UnifiedProject[] {
  const result: UnifiedProject[] = [];
  const processedRepoNames = new Set<string>();
  const processedProjectIds = new Set<string>();

  // Map of lowercase repo names to GitHubRepository
  const githubRepoMap = new Map<string, GitHubRepository>();
  for (const repo of githubRepos) {
    githubRepoMap.set(repo.name.toLowerCase(), repo);
  }

  // 1. Process curated fallback projects (Preserve rich architecture, featured status, order)
  for (const curated of curatedFallback) {
    if (processedProjectIds.has(curated.id)) continue;

    // Check if this curated project corresponds to a GitHub repo
    const matchingRepoName = Object.keys(REPO_TO_CURATED_ID).find(
      (rName) => REPO_TO_CURATED_ID[rName] === curated.id
    ) || curated.name;

    const matchedRepo = githubRepoMap.get(matchingRepoName.toLowerCase());

    if (matchedRepo) {
      // Enrich curated project with live GitHub metadata
      result.push({
        ...curated,
        stars: matchedRepo.stargazersCount,
        forks: matchedRepo.forksCount,
        updatedAt: matchedRepo.updatedAt,
        htmlUrl: matchedRepo.htmlUrl,
        homepage: matchedRepo.homepage || curated.homepage,
        topics: matchedRepo.topics.length > 0 ? matchedRepo.topics : curated.topics,
      });
      processedRepoNames.add(matchedRepo.name.toLowerCase());
    } else {
      // Curated project without direct GitHub repo (e.g. Astrospacious)
      result.push(curated);
    }

    processedProjectIds.add(curated.id);
  }

  // 2. Process remaining eligible GitHub repositories (Automatically discovered projects)
  for (const repo of githubRepos) {
    const lowerName = repo.name.toLowerCase();
    if (processedRepoNames.has(lowerName)) {
      continue;
    }

    // Determine technologies from GitHub metadata
    const techSet = new Set<string>();
    if (repo.language) techSet.add(repo.language);
    repo.topics.forEach((t) => techSet.add(t));

    const discoveredProject: UnifiedProject = {
      id: `gh-${lowerName}`,
      name: repo.name,
      displayTitle: formatProjectTitle(repo.name),
      category: repo.language ? `${repo.language} Repository` : "Open Source Project",
      description: repo.description,
      htmlUrl: repo.htmlUrl,
      homepage: repo.homepage,
      language: repo.language,
      topics: repo.topics,
      stars: repo.stargazersCount,
      forks: repo.forksCount,
      updatedAt: repo.updatedAt,
      featured: false,
      source: "github",
      technologies: Array.from(techSet),
    };

    result.push(discoveredProject);
    processedRepoNames.add(lowerName);
  }

  return sortProjects(result);
}

/**
 * Sorts unified projects:
 * 1. Featured curated projects maintain their chapter order.
 * 2. Secondary/discovered projects are sorted by activity (recent updatedAt descending).
 */
export function sortProjects(projects: UnifiedProject[]): UnifiedProject[] {
  const featured = projects.filter((p) => p.featured);
  const secondary = projects.filter((p) => !p.featured);

  // Maintain chapter order for featured projects
  const chapterOrder: Record<string, number> = {
    "CHAPTER 01": 1,
    "CHAPTER 02": 2,
    "CHAPTER 03": 3,
  };

  featured.sort((a, b) => {
    const orderA = a.chapter ? chapterOrder[a.chapter] || 99 : 99;
    const orderB = b.chapter ? chapterOrder[b.chapter] || 99 : 99;
    return orderA - orderB;
  });

  // Sort secondary projects by updatedAt descending (most recent first)
  secondary.sort((a, b) => {
    const timeA = new Date(a.updatedAt).getTime();
    const timeB = new Date(b.updatedAt).getTime();
    return timeB - timeA;
  });

  return [...featured, ...secondary];
}

/**
 * Master pipeline orchestrator:
 * Attempts to fetch live GitHub data with fallback to curated snapshot.
 * Guarantees zero downtime and zero blank renders.
 */
export async function getUnifiedProjects(): Promise<{
  projects: UnifiedProject[];
  source: "live" | "fallback";
  error?: string;
}> {
  try {
    const rawRepos = await fetchGitHubRepositories();
    const eligibleRepos = filterEligibleRepositories(rawRepos);
    const merged = mergeWithCuratedProjects(eligibleRepos, FALLBACK_PROJECTS);

    return {
      projects: merged,
      source: "live",
    };
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Unknown GitHub fetch error";
    console.warn(`[GitHub Projects Sync] Fallback activated: ${errorMessage}`);

    return {
      projects: FALLBACK_PROJECTS,
      source: "fallback",
      error: errorMessage,
    };
  }
}
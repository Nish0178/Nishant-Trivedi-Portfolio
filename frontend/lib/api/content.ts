/**
 * Public CMS Content Client
 * Fetches dynamic content from Spring Boot backend with seamless static fallbacks to portfolio-data.ts.
 */

import {
  PERSONAL_INFO,
  PROJECTS,
  EXPERIENCES,
  TECHNICAL_STACK,
  ACHIEVEMENTS,
  CERTIFICATIONS,
  LEETCODE_METRICS,
} from "@/lib/portfolio-data";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export interface PublicContentPayload {
  hero: {
    badgeName?: string;
    headlineLine1?: string;
    headlineLine2?: string;
    headlineLine3?: string;
    subRoles?: string[];
    bio?: string;
    ctaPrimaryText?: string;
    ctaPrimaryHref?: string;
    ctaSecondaryText?: string;
    ctaSecondaryHref?: string;
  };
  about: {
    title?: string;
    bioParagraph1?: string;
    bioParagraph2?: string;
    stats?: Array<{
      number: string;
      label: string;
      subtext: string;
      highlight: boolean;
    }>;
  };
  resume: {
    title?: string;
    fileUrl?: string;
    lastUpdated?: string;
    downloadCount?: number;
    visible?: boolean;
  };
  settings: {
    siteTitle?: string;
    metaDescription?: string;
    email?: string;
    location?: string;
    availabilityStatus?: string;
    maintenanceMode?: boolean;
  };
  skills: Array<{
    id?: number;
    category: string;
    name: string;
    roleDesc?: string;
    sortOrder: number;
    visible: boolean;
  }>;
  experiences: Array<{
    id?: number;
    period: string;
    company: string;
    role: string;
    location?: string;
    type?: string;
    contributions?: string;
    technologies?: string;
  }>;
  achievements: Array<{
    id?: number;
    title: string;
    badge: string;
    issuerOrVenue?: string;
    year?: string;
    description?: string;
  }>;
  education: Array<{
    id?: number;
    degree: string;
    institution: string;
    location?: string;
    period: string;
    details?: string;
  }>;
  socials: Array<{
    id?: number;
    platform: string;
    url: string;
    icon?: string;
  }>;
}

export const FALLBACK_PUBLIC_CONTENT: PublicContentPayload = {
  hero: {
    badgeName: "NISHANT",
    headlineLine1: "I BUILD",
    headlineLine2: "DIGITAL",
    headlineLine3: "EXPERIENCES",
    subRoles: ["FULL STACK DEVELOPER", "UI/UX DESIGNER", "DATA SCIENCE"],
    bio: "Building products, systems, and AI-powered experiences across the full stack.",
    ctaPrimaryText: "EXPLORE WORK",
    ctaPrimaryHref: "#work",
    ctaSecondaryText: "INITIALIZE TRANSMISSION",
    ctaSecondaryHref: "#contact",
  },
  about: {
    title: "SYSTEMS BUILDER & FULL-STACK ENGINEER",
    bioParagraph1:
      "I am a computer science undergraduate and software engineer focused on building robust full-stack applications, intelligent AI pipelines, and high-performance digital interfaces.",
    bioParagraph2:
      "With deep experience in Java, Spring Boot, React, Next.js, and modern databases, I approach software engineering from first principles: clean architecture, reliable persistence, and intuitive human experience.",
    stats: [
      { number: "400+", label: "DSA SOLVED", subtext: "Java & LeetCode Verified", highlight: true },
      { number: "B.Tech", label: "AKTU CS '28", subtext: "CSE · Lucknow, IN", highlight: false },
      { number: "10+", label: "PROJECTS & REPOS", subtext: "Full-Stack & AI Tools", highlight: false },
      { number: "TOP 10", label: "HACKATHON RUNNER-UP", subtext: "QBX Arena 2026", highlight: true },
    ],
  },
  resume: {
    title: "Nishant Trivedi — Software Engineer Resume",
    fileUrl: "/resume/Nishant_Trivedi_Resume.pdf",
    lastUpdated: "September 2026",
    downloadCount: 142,
    visible: true,
  },
  settings: {
    siteTitle: "Nishant Trivedi — Personal Engineering Portfolio & Digital Identity",
    metaDescription: "Software engineer building products, systems, and AI-powered experiences across the full stack.",
    email: PERSONAL_INFO.email,
    location: PERSONAL_INFO.location,
    availabilityStatus: "OPEN FOR ROLES & PROJECTS",
    maintenanceMode: false,
  },
  skills: [],
  experiences: EXPERIENCES.map((e) => ({
    id: 0,
    period: e.period,
    company: e.company,
    role: e.role,
    location: e.location,
    type: e.type,
    contributions: e.contributions.join("\n"),
    technologies: e.technologies.join(", "),
  })),
  achievements: ACHIEVEMENTS.map((a) => ({
    id: 0,
    title: a.title,
    badge: a.badge,
    issuerOrVenue: a.issuerOrVenue,
    year: a.year,
    description: a.description,
  })),
  education: [
    {
      id: 0,
      degree: PERSONAL_INFO.education.degree,
      institution: PERSONAL_INFO.education.institution,
      location: PERSONAL_INFO.education.location,
      period: PERSONAL_INFO.education.period,
      details: "Computer Science and Engineering with specialization in System Architecture and AI workflows.",
    },
  ],
  socials: [
    { platform: "GitHub", url: PERSONAL_INFO.socials.github, icon: "github" },
    { platform: "LinkedIn", url: PERSONAL_INFO.socials.linkedin, icon: "linkedin" },
    { platform: "LeetCode", url: PERSONAL_INFO.socials.leetcode, icon: "code" },
    { platform: "Instagram", url: PERSONAL_INFO.socials.instagram, icon: "instagram" },
    { platform: "HackerRank", url: PERSONAL_INFO.socials.hackerrank, icon: "terminal" },
  ],
};

export async function fetchPublicCmsContent(): Promise<PublicContentPayload> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const res = await fetch(`${BACKEND_URL}/api/content/all`, {
      method: "GET",
      headers: { Accept: "application/json" },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      return {
        hero: { ...FALLBACK_PUBLIC_CONTENT.hero, ...(data.hero || {}) },
        about: { ...FALLBACK_PUBLIC_CONTENT.about, ...(data.about || {}) },
        resume: { ...FALLBACK_PUBLIC_CONTENT.resume, ...(data.resume || {}) },
        settings: { ...FALLBACK_PUBLIC_CONTENT.settings, ...(data.settings || {}) },
        skills: Array.isArray(data.skills) && data.skills.length > 0 ? data.skills : FALLBACK_PUBLIC_CONTENT.skills,
        experiences: Array.isArray(data.experiences) && data.experiences.length > 0 ? data.experiences : FALLBACK_PUBLIC_CONTENT.experiences,
        achievements: Array.isArray(data.achievements) && data.achievements.length > 0 ? data.achievements : FALLBACK_PUBLIC_CONTENT.achievements,
        education: Array.isArray(data.education) && data.education.length > 0 ? data.education : FALLBACK_PUBLIC_CONTENT.education,
        socials: Array.isArray(data.socials) && data.socials.length > 0 ? data.socials : FALLBACK_PUBLIC_CONTENT.socials,
      };
    }
  } catch {
    // Graceful fallback if Spring Boot is starting or offline
  }

  return FALLBACK_PUBLIC_CONTENT;
}

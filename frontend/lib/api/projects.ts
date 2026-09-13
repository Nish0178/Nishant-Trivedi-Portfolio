/**
 * Projects API Client
 * Requests repository sync from Spring Boot backend with seamless Next.js fallback.
 */

import { UnifiedProject, FALLBACK_PROJECTS } from "@/lib/github";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

/**
 * Normalizes any raw project object (from Spring Boot DTO, Next.js route, or cache)
 * into a type-safe UnifiedProject conforming strictly to the frontend data contract.
 */
export function normalizeProjectData(raw: Record<string, any>): UnifiedProject {
  const techList: string[] = Array.isArray(raw.technologies)
    ? raw.technologies
    : Array.isArray(raw.tech)
    ? raw.tech
    : raw.language
    ? [raw.language]
    : [];

  const stars = typeof raw.stars === "number"
    ? raw.stars
    : typeof raw.stargazersCount === "number"
    ? raw.stargazersCount
    : 0;

  const forks = typeof raw.forks === "number"
    ? raw.forks
    : typeof raw.forksCount === "number"
    ? raw.forksCount
    : 0;

  const title = String(raw.displayTitle || raw.title || raw.name || "Untitled Project");

  return {
    id: String(raw.id || raw.name || title),
    name: String(raw.name || title),
    displayTitle: title,
    category: String(raw.category || "Engineering Project"),
    tagline: raw.tagline ? String(raw.tagline) : undefined,
    description: raw.description ? String(raw.description) : null,
    htmlUrl: String(raw.htmlUrl || raw.githubUrl || "https://github.com/Nish0178"),
    homepage: raw.homepage || raw.liveUrl || null,
    language: raw.language ? String(raw.language) : null,
    topics: Array.isArray(raw.topics) ? raw.topics : [],
    stars,
    forks,
    updatedAt: String(raw.updatedAt || new Date().toISOString()),
    featured: Boolean(raw.featured ?? raw.curated),
    chapter: raw.chapter ? String(raw.chapter) : undefined,
    source: raw.source || (raw.curated ? "curated" : "github"),
    technologies: techList,
    features: Array.isArray(raw.features) ? raw.features : undefined,
    recognition: raw.recognition ? String(raw.recognition) : undefined,
    architecture: raw.architecture || undefined,
    telemetry: raw.telemetry || undefined,
  };
}

export async function fetchProjects(): Promise<UnifiedProject[]> {
  // 1. Attempt Spring Boot backend first
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const response = await fetch(`${BACKEND_URL}/api/projects`, {
      method: "GET",
      headers: { Accept: "application/json" },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data.projects) && data.projects.length > 0) {
        return data.projects.map(normalizeProjectData);
      }
    }
  } catch {
    // Spring Boot offline or timed out, continue to Next.js internal endpoint fallback
  }

  // 2. Fallback to Next.js API route
  try {
    const internalResponse = await fetch("/api/github/repos");
    if (internalResponse.ok) {
      const internalData = await internalResponse.json();
      if (internalData.success && Array.isArray(internalData.projects) && internalData.projects.length > 0) {
        return internalData.projects.map(normalizeProjectData);
      }
    }
  } catch {
    // Both endpoints unavailable, return verified fallback projects
  }

  // 3. Fallback to curated static registry
  return FALLBACK_PROJECTS.map(normalizeProjectData);
}

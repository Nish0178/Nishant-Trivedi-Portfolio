/**
 * Projects API Client
 * Requests repository sync from Spring Boot backend with seamless Next.js fallback.
 */

import { UnifiedProject, FALLBACK_PROJECTS } from "@/lib/github";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

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
        return data.projects;
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
        return internalData.projects;
      }
    }
  } catch {
    // Both endpoints unavailable, return verified fallback projects
  }

  // 3. Fallback to curated static registry
  return FALLBACK_PROJECTS;
}

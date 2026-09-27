/**
 * Profile CMS API Client
 * Manages profile data retrieval and mutations against the Spring Boot backend.
 */

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
const TOKEN_KEY = "nt_portfolio_admin_jwt";

export interface ProfileRecord {
  name: string;
  headline: string;
  bio: string;
  email: string;
  phone?: string;
  location?: string;
  github?: string;
  linkedin?: string;
  instagram?: string;
  leetcode?: string;
  hackerrank?: string;
  resumeUrl?: string;
  updatedAt?: string;
}

function getAuthHeaders(): HeadersInit {
  const token = typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null;
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export async function fetchAdminProfile(): Promise<ProfileRecord | null> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/admin/profile`, {
      headers: getAuthHeaders(),
    });
    if (res.ok) return await res.json();
    return null;
  } catch {
    return null;
  }
}

export async function updateAdminProfile(profile: ProfileRecord): Promise<ProfileRecord | null> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/admin/profile`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(profile),
    });
    if (res.ok) return await res.json();
    return null;
  } catch {
    return null;
  }
}

export async function fetchPublicProfile(): Promise<ProfileRecord | null> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/content/profile`, {
      headers: { Accept: "application/json" },
    });
    if (res.ok) return await res.json();
    return null;
  } catch {
    return null;
  }
}

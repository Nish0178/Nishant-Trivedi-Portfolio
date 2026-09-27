/**
 * Experience CMS API Client
 * Manages career experience records and mutations against the Spring Boot backend.
 */

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
const TOKEN_KEY = "nt_portfolio_admin_jwt";

export interface ExperienceRecord {
  id?: number;
  period: string;
  company: string;
  role: string;
  location?: string;
  type?: string;
  contributions?: string;
  technologies?: string;
  startDate?: string;
  endDate?: string;
  current?: boolean;
  sortOrder: number;
  visible: boolean;
}

function getAuthHeaders(): HeadersInit {
  const token = typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null;
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export async function fetchAdminExperiences(): Promise<ExperienceRecord[]> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/admin/experiences`, {
      headers: getAuthHeaders(),
    });
    if (res.ok) return await res.json();
    return [];
  } catch {
    return [];
  }
}

export async function saveAdminExperience(exp: Partial<ExperienceRecord>): Promise<ExperienceRecord | null> {
  try {
    const isUpdate = Boolean(exp.id);
    const url = isUpdate
      ? `${BACKEND_URL}/api/admin/experiences/${exp.id}`
      : `${BACKEND_URL}/api/admin/experiences`;
    const method = isUpdate ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: getAuthHeaders(),
      body: JSON.stringify(exp),
    });

    if (res.ok) return await res.json();
    return null;
  } catch {
    return null;
  }
}

export async function deleteAdminExperience(id: number): Promise<boolean> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/admin/experiences/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    return res.ok;
  } catch {
    return false;
  }
}

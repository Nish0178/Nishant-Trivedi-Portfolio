/**
 * Achievements CMS API Client
 * Manages achievements, distinctions, honors, and credentials against the Spring Boot backend.
 */

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
const TOKEN_KEY = "nt_portfolio_admin_jwt";

export interface AchievementRecord {
  id?: number;
  title: string;
  badge: string;
  issuerOrVenue?: string;
  year?: string;
  description?: string;
  url?: string;
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

export async function fetchAdminAchievements(): Promise<AchievementRecord[]> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/admin/achievements`, {
      headers: getAuthHeaders(),
    });
    if (res.ok) return await res.json();
    return [];
  } catch {
    return [];
  }
}

export async function saveAdminAchievement(ach: Partial<AchievementRecord>): Promise<AchievementRecord | null> {
  try {
    const isUpdate = Boolean(ach.id);
    const url = isUpdate
      ? `${BACKEND_URL}/api/admin/achievements/${ach.id}`
      : `${BACKEND_URL}/api/admin/achievements`;
    const method = isUpdate ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: getAuthHeaders(),
      body: JSON.stringify(ach),
    });

    if (res.ok) return await res.json();
    return null;
  } catch {
    return null;
  }
}

export async function deleteAdminAchievement(id: number): Promise<boolean> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/admin/achievements/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    return res.ok;
  } catch {
    return false;
  }
}

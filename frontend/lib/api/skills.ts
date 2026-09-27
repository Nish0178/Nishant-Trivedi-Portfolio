/**
 * Skills CMS API Client
 * Manages skills repertoire and mutations against the Spring Boot backend.
 */

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
const TOKEN_KEY = "nt_portfolio_admin_jwt";

export interface SkillRecord {
  id?: number;
  category: string;
  name: string;
  roleDesc?: string;
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

export async function fetchAdminSkills(): Promise<SkillRecord[]> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/admin/skills`, {
      headers: getAuthHeaders(),
    });
    if (res.ok) return await res.json();
    return [];
  } catch {
    return [];
  }
}

export async function saveAdminSkill(skill: Partial<SkillRecord>): Promise<SkillRecord | null> {
  try {
    const isUpdate = Boolean(skill.id);
    const url = isUpdate
      ? `${BACKEND_URL}/api/admin/skills/${skill.id}`
      : `${BACKEND_URL}/api/admin/skills`;
    const method = isUpdate ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: getAuthHeaders(),
      body: JSON.stringify(skill),
    });

    if (res.ok) return await res.json();
    return null;
  } catch {
    return null;
  }
}

export async function deleteAdminSkill(id: number): Promise<boolean> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/admin/skills/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    return res.ok;
  } catch {
    return false;
  }
}

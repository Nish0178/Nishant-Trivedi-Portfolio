/**
 * Admin API Client
 * Manages authentication, token storage, and CRUD operations against the Spring Boot backend.
 */

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
const TOKEN_KEY = "nt_portfolio_admin_jwt";

export interface AdminUser {
  id: number;
  email: string;
  role: string;
}

export interface AdminAuthResponse {
  success: boolean;
  token?: string;
  message?: string;
  user?: AdminUser;
  error?: string;
}

export interface DashboardStats {
  totalProjects: number;
  visibleProjects: number;
  unreadMessages: number;
  experiencesCount: number;
  skillsCount: number;
  achievementsCount: number;
  lastContentUpdate: string;
  backendStatus: string;
}

export interface ProjectRecord {
  id: string;
  title: string;
  name: string;
  description: string;
  category: string;
  tagline?: string;
  githubUrl?: string;
  liveUrl?: string;
  language?: string;
  technologies?: string;
  features?: string;
  stargazersCount: number;
  forksCount: number;
  featured: boolean;
  visible: boolean;
  sortOrder: number;
  curated: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ExperienceRecord {
  id?: number;
  period: string;
  company: string;
  role: string;
  location?: string;
  type?: string;
  contributions?: string;
  technologies?: string;
  sortOrder: number;
  visible: boolean;
}

export interface SkillRecord {
  id?: number;
  category: string;
  name: string;
  roleDesc?: string;
  sortOrder: number;
  visible: boolean;
}

export interface AchievementRecord {
  id?: number;
  title: string;
  badge: string;
  issuerOrVenue?: string;
  year?: string;
  description?: string;
  sortOrder: number;
  visible: boolean;
}

export interface EducationRecord {
  id?: number;
  degree: string;
  institution: string;
  location?: string;
  period: string;
  details?: string;
  sortOrder: number;
  visible: boolean;
}

export interface SocialRecord {
  id?: number;
  platform: string;
  url: string;
  icon?: string;
  sortOrder: number;
  visible: boolean;
}

export interface ContactMessageRecord {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  ipAddress?: string;
  read: boolean;
  emailStatus: string;
  emailError?: string;
}

// Token helper methods
export function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setStoredToken(token: string): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(TOKEN_KEY, token);
  }
}

export function removeStoredToken(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(TOKEN_KEY);
  }
}

function getAuthHeaders(): HeadersInit {
  const token = getStoredToken();
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

// ============================================================================
// AUTHENTICATION API
// ============================================================================

export async function loginAdmin(email: string, password: string): Promise<AdminAuthResponse> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/admin/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json().catch(() => ({}));
    if (res.ok && data.token) {
      setStoredToken(data.token);
      return { success: true, token: data.token, user: data.user, message: data.message };
    }

    return {
      success: false,
      error: data.message || "Invalid credentials or unauthorized access.",
    };
  } catch (err: unknown) {
    const error = err as Error;
    return {
      success: false,
      error: `Connection failure to authentication server: ${error.message}`,
    };
  }
}

export async function verifyAdminSession(): Promise<AdminUser | null> {
  const token = getStoredToken();
  if (!token) return null;

  try {
    const res = await fetch(`${BACKEND_URL}/api/admin/auth/me`, {
      headers: getAuthHeaders(),
    });

    if (res.ok) {
      return await res.json();
    }
    removeStoredToken();
    return null;
  } catch {
    return null;
  }
}

export function logoutAdmin(): void {
  removeStoredToken();
}

// ============================================================================
// DASHBOARD & STATS
// ============================================================================

export async function fetchDashboardStats(): Promise<DashboardStats | null> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/admin/dashboard/stats`, {
      headers: getAuthHeaders(),
    });
    if (res.ok) return await res.json();
    return null;
  } catch {
    return null;
  }
}

// ============================================================================
// CMS SECTIONS (HERO, ABOUT, RESUME, SITE SETTINGS)
// ============================================================================

export async function fetchAdminSection(sectionKey: string): Promise<Record<string, unknown> | null> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/admin/content/${sectionKey.toLowerCase()}`, {
      headers: getAuthHeaders(),
    });
    if (res.ok) return await res.json();
    return null;
  } catch {
    return null;
  }
}

export async function updateAdminSection(
  sectionKey: string,
  payload: Record<string, unknown>
): Promise<boolean> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/admin/content/${sectionKey.toLowerCase()}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    });
    return res.ok;
  } catch {
    return false;
  }
}

// ============================================================================
// PROJECTS CRUD
// ============================================================================

export async function fetchAdminProjects(): Promise<ProjectRecord[]> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/admin/projects`, {
      headers: getAuthHeaders(),
    });
    if (res.ok) return await res.json();
    return [];
  } catch {
    return [];
  }
}

export async function saveAdminProject(project: Partial<ProjectRecord>): Promise<ProjectRecord | null> {
  try {
    const isUpdate = Boolean(project.id);
    const url = isUpdate
      ? `${BACKEND_URL}/api/admin/projects/${project.id}`
      : `${BACKEND_URL}/api/admin/projects`;
    const method = isUpdate ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: getAuthHeaders(),
      body: JSON.stringify(project),
    });

    if (res.ok) return await res.json();
    return null;
  } catch {
    return null;
  }
}

export async function deleteAdminProject(id: string): Promise<boolean> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/admin/projects/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export const createAdminProject = saveAdminProject;

export async function updateAdminProject(
  id: string,
  project: Partial<ProjectRecord>
): Promise<boolean> {
  const res = await saveAdminProject({ ...project, id });
  return res !== null;
}

// ============================================================================
// EXPERIENCES CRUD
// ============================================================================

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

// ============================================================================
// SKILLS CRUD
// ============================================================================

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

// ============================================================================
// ACHIEVEMENTS CRUD
// ============================================================================

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

// ============================================================================
// EDUCATION CRUD
// ============================================================================

export async function fetchAdminEducation(): Promise<EducationRecord[]> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/admin/education`, {
      headers: getAuthHeaders(),
    });
    if (res.ok) return await res.json();
    return [];
  } catch {
    return [];
  }
}

export async function saveAdminEducation(edu: Partial<EducationRecord>): Promise<EducationRecord | null> {
  try {
    const isUpdate = Boolean(edu.id);
    const url = isUpdate
      ? `${BACKEND_URL}/api/admin/education/${edu.id}`
      : `${BACKEND_URL}/api/admin/education`;
    const method = isUpdate ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: getAuthHeaders(),
      body: JSON.stringify(edu),
    });

    if (res.ok) return await res.json();
    return null;
  } catch {
    return null;
  }
}

export async function deleteAdminEducation(id: number): Promise<boolean> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/admin/education/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    return res.ok;
  } catch {
    return false;
  }
}

// ============================================================================
// SOCIAL LINKS CRUD
// ============================================================================

export async function fetchAdminSocials(): Promise<SocialRecord[]> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/admin/socials`, {
      headers: getAuthHeaders(),
    });
    if (res.ok) return await res.json();
    return [];
  } catch {
    return [];
  }
}

export async function saveAdminSocial(soc: Partial<SocialRecord>): Promise<SocialRecord | null> {
  try {
    const isUpdate = Boolean(soc.id);
    const url = isUpdate
      ? `${BACKEND_URL}/api/admin/socials/${soc.id}`
      : `${BACKEND_URL}/api/admin/socials`;
    const method = isUpdate ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: getAuthHeaders(),
      body: JSON.stringify(soc),
    });

    if (res.ok) return await res.json();
    return null;
  } catch {
    return null;
  }
}

export async function deleteAdminSocial(id: number): Promise<boolean> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/admin/socials/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    return res.ok;
  } catch {
    return false;
  }
}

// ============================================================================
// CONTACT MESSAGES INBOX
// ============================================================================

export async function fetchAdminMessages(): Promise<ContactMessageRecord[]> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/admin/messages`, {
      headers: getAuthHeaders(),
    });
    if (res.ok) return await res.json();
    return [];
  } catch {
    return [];
  }
}

export async function toggleMessageReadStatus(id: number, isRead: boolean): Promise<boolean> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/admin/messages/${id}/read`, {
      method: "PATCH",
      headers: getAuthHeaders(),
      body: JSON.stringify({ isRead }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export const fetchAdminEducations = fetchAdminEducation;

export const markAdminMessageRead = toggleMessageReadStatus;

export async function deleteAdminMessage(id: number): Promise<boolean> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/admin/messages/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    return res.ok;
  } catch {
    return false;
  }
}

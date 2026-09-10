/**
 * Contact API Client
 * Facilitates communication between Next.js frontend and Spring Boot backend.
 */

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactApiResponse {
  success: boolean;
  message: string;
  id?: number;
  errors?: Record<string, string>;
  isOffline?: boolean;
}

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export async function sendContactMessage(payload: ContactPayload): Promise<ContactApiResponse> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000); // 6s timeout

    const response = await fetch(`${BACKEND_URL}/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const data = await response.json().catch(() => null);

    if (response.ok && data) {
      return {
        success: true,
        message: data.message || "Your transmission has been received and logged.",
        id: data.id,
      };
    }

    if (response.status === 400 && data) {
      return {
        success: false,
        message: data.message || "Validation failed. Please verify the submitted details.",
        errors: data.errors,
      };
    }

    return {
      success: false,
      message: (data && data.message) || `Server responded with status ${response.status}.`,
    };
  } catch (error: unknown) {
    const err = error as Error;
    console.warn("Contact dispatch backend connection issue:", err.message);
    return {
      success: false,
      message: "Spring Boot transmission channel unreachable. Please dispatch via direct email.",
      isOffline: true,
    };
  }
}

/**
 * Health API Client
 * Probes Spring Boot /api/health status.
 */

export interface HealthStatus {
  status: "UP" | "DOWN" | "UNKNOWN";
  service?: string;
  timestamp?: string;
}

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export async function checkBackendHealth(): Promise<HealthStatus> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    const res = await fetch(`${BACKEND_URL}/api/health`, {
      method: "GET",
      headers: { Accept: "application/json" },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      return {
        status: data.status === "UP" ? "UP" : "DOWN",
        service: data.service,
        timestamp: data.timestamp,
      };
    }
    return { status: "DOWN" };
  } catch {
    return { status: "DOWN" };
  }
}

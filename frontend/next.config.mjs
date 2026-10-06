import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const backendBaseUrl = (
  process.env.BACKEND_INTERNAL_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:8080"
).replace(/\/$/, "");

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: __dirname,
  transpilePackages: ["motion"],
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: "/api/admin/:path*",
        destination: `${backendBaseUrl}/api/admin/:path*`,
      },
      {
        source: "/api/contact",
        destination: `${backendBaseUrl}/api/contact`,
      },
      {
        source: "/api/projects",
        destination: `${backendBaseUrl}/api/projects`,
      },
      {
        source: "/api/content/:path*",
        destination: `${backendBaseUrl}/api/content/:path*`,
      },
      {
        source: "/api/health",
        destination: `${backendBaseUrl}/api/health`,
      },
    ];
  },
};

export default nextConfig;

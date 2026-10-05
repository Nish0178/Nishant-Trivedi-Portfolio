import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: __dirname,
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: "/api/admin/:path*",
        destination: "http://localhost:8080/api/admin/:path*",
      },
      {
        source: "/api/contact",
        destination: "http://localhost:8080/api/contact",
      },
      {
        source: "/api/projects",
        destination: "http://localhost:8080/api/projects",
      },
      {
        source: "/api/content/:path*",
        destination: "http://localhost:8080/api/content/:path*",
      },
      {
        source: "/api/health",
        destination: "http://localhost:8080/api/health",
      },
    ];
  },
};

export default nextConfig;

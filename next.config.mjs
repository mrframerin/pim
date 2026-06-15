import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: root,
  async rewrites() {
    return {
      fallback: [
        {
          source: "/_next/static/:path*",
          destination: "/notion-mirror/_next/static/:path*"
        }
      ]
    };
  }
};

export default nextConfig;

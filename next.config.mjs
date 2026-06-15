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
          source: "/front-static/:path*",
          destination: "/notion-mirror/front-static/:path*"
        },
        {
          source: "/remote/:path*",
          destination: "/notion-mirror/remote/:path*"
        },
        {
          source: "/_next/static/:path*",
          destination: "/notion-mirror/_next/static/:path*"
        }
      ]
    };
  }
};

export default nextConfig;

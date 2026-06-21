import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: root,
  async rewrites() {
    // Fallback rewrites (run only when no real file/route matches), so the
    // vendored design-system bundle's bare asset requests resolve to public/vendor.
    return {
      fallback: [
        {
          source: "/front-static/:path*",
          destination: "/vendor/front-static/:path*"
        },
        {
          source: "/remote/:path*",
          destination: "/vendor/remote/:path*"
        },
        {
          source: "/_next/static/:path*",
          destination: "/vendor/_next/static/:path*"
        },
        // Compat: the vendored compiled CSS/JS reference their original build
        // paths internally (font url()s, webpack publicPath). Bridge those to
        // public/vendor so the exact same assets resolve — render unchanged.
        {
          source: "/notion-mirror/:path*",
          destination: "/vendor/:path*"
        }
      ]
    };
  }
};

export default nextConfig;

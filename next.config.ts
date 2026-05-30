import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: "/sitemap.xml", destination: "/api/sitemap-index" },
    ];
  },
  experimental: {
    optimizeCss: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Prevent webpack/turbopack from trying to bundle native or WASM modules
  serverExternalPackages: ["@libsql/client", "better-sqlite3"],
  turbopack: {},
};

export default nextConfig;

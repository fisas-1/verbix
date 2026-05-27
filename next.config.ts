import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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

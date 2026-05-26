import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizeCss: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  serverExternalPackages: ["@libsql/client"],
  turbopack: {},
};

export default nextConfig;

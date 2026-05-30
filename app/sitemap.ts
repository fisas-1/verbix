import type { MetadataRoute } from "next";
// /sitemap.xml is intercepted by middleware.ts which returns the proper <sitemapindex>.
// This fallback is never reached in production.
export default function sitemap(): MetadataRoute.Sitemap {
  return [];
}

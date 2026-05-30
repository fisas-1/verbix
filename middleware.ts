import { NextRequest, NextResponse } from "next/server";
import { SITE_URL } from "@/lib/seo";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/sitemap.xml") {
    const now = new Date().toISOString().split("T")[0];
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${SITE_URL}/sitemap-es.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${SITE_URL}/sitemap-ca.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${SITE_URL}/sitemap-en.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>
</sitemapindex>`;

    return new NextResponse(xml, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=86400",
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/sitemap.xml"],
};

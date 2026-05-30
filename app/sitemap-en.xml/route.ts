import { getAllVerbSlugsWithRank } from "@/lib/verbs";
import { SITE_URL } from "@/lib/seo";

const LETTERS = "abcdefghijklmnopqrstuvwxyz".split("");
const GROUPS = ["ar", "er", "ir"];

function priority(rank: number | null): string {
  if (rank === null) return "0.6";
  if (rank <= 10) return "0.8";
  if (rank <= 50) return "0.7";
  return "0.6";
}

export async function GET() {
  const esSlugs = await getAllVerbSlugsWithRank("es");
  const caSlugs = await getAllVerbSlugsWithRank("ca");
  const enSlugs = await getAllVerbSlugsWithRank("en");
  const now = new Date().toISOString().split("T")[0];

  const urls: string[] = [
    `<url><loc>${SITE_URL}/en</loc><lastmod>${now}</lastmod><changefreq>daily</changefreq><priority>1.0</priority></url>`,
    `<url><loc>${SITE_URL}/en/verbos</loc><lastmod>${now}</lastmod><changefreq>weekly</changefreq><priority>0.7</priority></url>`,
    `<url><loc>${SITE_URL}/en/catalan-verbs</loc><lastmod>${now}</lastmod><changefreq>weekly</changefreq><priority>0.6</priority></url>`,
    `<url><loc>${SITE_URL}/en/english-verbs</loc><lastmod>${now}</lastmod><changefreq>weekly</changefreq><priority>0.6</priority></url>`,
    ...GROUPS.map(g => `<url><loc>${SITE_URL}/en/verbos/grupo/${g}</loc><lastmod>${now}</lastmod><changefreq>monthly</changefreq><priority>0.6</priority></url>`),
    ...LETTERS.map(l => `<url><loc>${SITE_URL}/en/verbos/letra/${l}</loc><lastmod>${now}</lastmod><changefreq>monthly</changefreq><priority>0.5</priority></url>`),
    // ES verbs in EN interface
    ...esSlugs.map(({ slug, frequency_rank }) =>
      `<url><loc>${SITE_URL}/en/verb/${slug}</loc><lastmod>${now}</lastmod><changefreq>monthly</changefreq><priority>${priority(frequency_rank)}</priority></url>`
    ),
    // CA verbs in EN interface
    ...caSlugs.map(({ slug, frequency_rank }) =>
      `<url><loc>${SITE_URL}/en/catalan-verb/${slug}</loc><lastmod>${now}</lastmod><changefreq>monthly</changefreq><priority>${priority(frequency_rank)}</priority></url>`
    ),
    // EN verbs in EN interface
    ...enSlugs.map(({ slug, frequency_rank }) =>
      `<url><loc>${SITE_URL}/en/english-verb/${slug}</loc><lastmod>${now}</lastmod><changefreq>monthly</changefreq><priority>${priority(frequency_rank)}</priority></url>`
    ),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=86400" },
  });
}

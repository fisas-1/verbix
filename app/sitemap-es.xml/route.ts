import { getAllVerbSlugsWithRank } from "@/lib/verbs";
import { SITE_URL } from "@/lib/seo";

const TENSE_SLUGS = [
  "presente-indicativo", "preterito-indefinido", "preterito-imperfecto",
  "futuro-simple", "condicional-simple", "subjuntivo-presente", "imperativo",
];
const LETTERS = "abcdefghijklmnopqrstuvwxyz".split("");
const GROUPS = ["ar", "er", "ir"];
const COMPARISON_PAIRS = [
  ["ser", "estar"], ["saber", "conocer"], ["pedir", "preguntar"],
  ["llevar", "traer"], ["ir", "venir"], ["poder", "saber"],
  ["hablar", "decir"], ["hacer", "poner"], ["querer", "amar"],
  ["mirar", "ver"], ["escuchar", "oir"], ["comer", "beber"],
  ["trabajar", "estudiar"], ["comprar", "vender"], ["subir", "bajar"],
  ["abrir", "cerrar"], ["empezar", "terminar"], ["ganar", "perder"],
  ["tener", "haber"], ["ser", "ir"],
];

function priority(rank: number | null): string {
  if (rank === null) return "0.7";
  if (rank <= 10) return "0.9";
  if (rank <= 50) return "0.8";
  return "0.7";
}

export async function GET() {
  const esSlugs = await getAllVerbSlugsWithRank("es");
  const now = new Date().toISOString().split("T")[0];

  const urls: string[] = [
    // Homepage
    `<url><loc>${SITE_URL}/es</loc><lastmod>${now}</lastmod><changefreq>daily</changefreq><priority>1.0</priority></url>`,
    // Verb listing
    `<url><loc>${SITE_URL}/es/verbos</loc><lastmod>${now}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>`,
    `<url><loc>${SITE_URL}/es/verbos/irregulares</loc><lastmod>${now}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>`,
    `<url><loc>${SITE_URL}/es/verbos/regulares</loc><lastmod>${now}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>`,
    // Long-tail
    `<url><loc>${SITE_URL}/es/verbos/mas-usados</loc><lastmod>${now}</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>`,
    `<url><loc>${SITE_URL}/es/verbos/falsos-amigos</loc><lastmod>${now}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>`,
    `<url><loc>${SITE_URL}/es/verbos/irregulares/cambio-radical-eie</loc><lastmod>${now}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>`,
    `<url><loc>${SITE_URL}/es/verbos/irregulares/cambio-radical-oue</loc><lastmod>${now}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>`,
    `<url><loc>${SITE_URL}/es/verbos/irregulares/primera-persona</loc><lastmod>${now}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>`,
    // Group pages
    ...GROUPS.map(g => `<url><loc>${SITE_URL}/es/verbos/grupo/${g}</loc><lastmod>${now}</lastmod><changefreq>monthly</changefreq><priority>0.6</priority></url>`),
    // Letter pages
    ...LETTERS.map(l => `<url><loc>${SITE_URL}/es/verbos/letra/${l}</loc><lastmod>${now}</lastmod><changefreq>monthly</changefreq><priority>0.5</priority></url>`),
    // Tense theory pages
    ...TENSE_SLUGS.map(s => `<url><loc>${SITE_URL}/es/tiempos/${s}</loc><lastmod>${now}</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>`),
    // Comparison pages
    ...COMPARISON_PAIRS.map(([v1, v2]) => `<url><loc>${SITE_URL}/es/comparar/${v1}/${v2}</loc><lastmod>${now}</lastmod><changefreq>monthly</changefreq><priority>0.75</priority></url>`),
    // Verb pages
    ...esSlugs.map(({ slug, frequency_rank }) =>
      `<url><loc>${SITE_URL}/es/verbo/${slug}</loc><lastmod>${now}</lastmod><changefreq>monthly</changefreq><priority>${priority(frequency_rank)}</priority></url>`
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

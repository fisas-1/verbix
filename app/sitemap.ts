import type { MetadataRoute } from "next";
import { getAllVerbSlugsWithRank } from "@/lib/verbs";
import { SITE_URL } from "@/lib/seo";
import { COMPARISON_PAIRS } from "@/app/[lang]/comparar/[verb1]/[verb2]/page";

const ALL_LANGS = ["es", "ca", "en"];
const LETTERS = "abcdefghijklmnopqrstuvwxyz".split("");
const GROUPS = ["ar", "er", "ir"];
const TENSE_SLUGS = [
  "presente-indicativo", "preterito-indefinido", "preterito-imperfecto",
  "futuro-simple", "condicional-simple", "subjuntivo-presente", "imperativo",
];
const NOW = new Date();

function verbPriority(rank: number | null): number {
  if (rank === null) return 0.7;
  if (rank <= 10) return 0.9;
  if (rank <= 50) return 0.8;
  return 0.7;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [esSlugs, caSlugs, enSlugs] = await Promise.all([
    getAllVerbSlugsWithRank("es"),
    getAllVerbSlugsWithRank("ca"),
    getAllVerbSlugsWithRank("en"),
  ]);

  // Spanish verb pages (3 UI languages × priority by rank)
  const esVerbUrls: MetadataRoute.Sitemap = esSlugs.flatMap(({ slug, frequency_rank }) => {
    const p = verbPriority(frequency_rank);
    return [
      { url: `${SITE_URL}/es/verbo/${slug}`, lastModified: NOW, changeFrequency: "monthly" as const, priority: p },
      { url: `${SITE_URL}/ca/verb/${slug}`, lastModified: NOW, changeFrequency: "monthly" as const, priority: Math.max(p - 0.1, 0.5) },
      { url: `${SITE_URL}/en/verb/${slug}`, lastModified: NOW, changeFrequency: "monthly" as const, priority: Math.max(p - 0.1, 0.5) },
    ];
  });

  // Catalan verb pages (3 UI languages)
  const caVerbUrls: MetadataRoute.Sitemap = caSlugs.flatMap(({ slug, frequency_rank }) => {
    const p = verbPriority(frequency_rank);
    return [
      { url: `${SITE_URL}/es/verb-catala/${slug}`, lastModified: NOW, changeFrequency: "monthly" as const, priority: p },
      { url: `${SITE_URL}/ca/verb-catala/${slug}`, lastModified: NOW, changeFrequency: "monthly" as const, priority: p },
      { url: `${SITE_URL}/en/catalan-verb/${slug}`, lastModified: NOW, changeFrequency: "monthly" as const, priority: p },
    ];
  });

  // English verb pages (3 UI languages)
  const enVerbUrls: MetadataRoute.Sitemap = enSlugs.flatMap(({ slug, frequency_rank }) => {
    const p = verbPriority(frequency_rank);
    return [
      { url: `${SITE_URL}/es/verb-ingles/${slug}`, lastModified: NOW, changeFrequency: "monthly" as const, priority: p },
      { url: `${SITE_URL}/ca/verb-angles/${slug}`, lastModified: NOW, changeFrequency: "monthly" as const, priority: p },
      { url: `${SITE_URL}/en/english-verb/${slug}`, lastModified: NOW, changeFrequency: "monthly" as const, priority: p },
    ];
  });

  // Homepage (priority 1.0, daily)
  const homepageUrls: MetadataRoute.Sitemap = ALL_LANGS.map((lang) => ({
    url: `${SITE_URL}/${lang}`,
    lastModified: NOW,
    changeFrequency: "daily" as const,
    priority: 1.0,
  }));

  // Spanish verb listing pages (weekly, 0.6)
  const esListingUrls: MetadataRoute.Sitemap = ALL_LANGS.flatMap((lang) => [
    { url: `${SITE_URL}/${lang}/verbos`, lastModified: NOW, changeFrequency: "weekly" as const, priority: 0.6 },
    { url: `${SITE_URL}/${lang}/verbos/irregulares`, lastModified: NOW, changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${SITE_URL}/${lang}/verbos/regulares`, lastModified: NOW, changeFrequency: "monthly" as const, priority: 0.6 },
    ...GROUPS.map((g) => ({
      url: `${SITE_URL}/${lang}/verbos/grupo/${g}`,
      lastModified: NOW,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...LETTERS.map((l) => ({
      url: `${SITE_URL}/${lang}/verbos/letra/${l}`,
      lastModified: NOW,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ]);

  // Catalan + English verb index pages
  const multiLangIndexUrls: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/es/verbos-catalanes`, lastModified: NOW, changeFrequency: "weekly" as const, priority: 0.6 },
    { url: `${SITE_URL}/es/verbos-ingleses`, lastModified: NOW, changeFrequency: "weekly" as const, priority: 0.6 },
    { url: `${SITE_URL}/ca/verbs-catalans`, lastModified: NOW, changeFrequency: "weekly" as const, priority: 0.6 },
    { url: `${SITE_URL}/ca/verbs-anglesos`, lastModified: NOW, changeFrequency: "weekly" as const, priority: 0.6 },
    { url: `${SITE_URL}/en/catalan-verbs`, lastModified: NOW, changeFrequency: "weekly" as const, priority: 0.6 },
    { url: `${SITE_URL}/en/english-verbs`, lastModified: NOW, changeFrequency: "weekly" as const, priority: 0.6 },
  ];

  const CA_TENSE_SLUGS = ["present-indicatiu","preterit-indefinit","preterit-imperfet","futur-simple","condicional-simple","subjuntiu-present","imperatiu"];
  const EN_TENSE_SLUGS = ["present-indicative","preterite","imperfect","future-simple","conditional","present-subjunctive","imperative"];

  // Tense theory pages (ES + CA + EN)
  const tiemposUrls: MetadataRoute.Sitemap = [
    ...TENSE_SLUGS.map(slug => ({ url: `${SITE_URL}/es/tiempos/${slug}`, lastModified: NOW, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...CA_TENSE_SLUGS.map(slug => ({ url: `${SITE_URL}/ca/temps/${slug}`, lastModified: NOW, changeFrequency: "monthly" as const, priority: 0.75 })),
    ...EN_TENSE_SLUGS.map(slug => ({ url: `${SITE_URL}/en/tenses/${slug}`, lastModified: NOW, changeFrequency: "monthly" as const, priority: 0.8 })),
  ];

  // Comparison pages (ES + CA + EN)
  const compararUrls: MetadataRoute.Sitemap = [
    ...COMPARISON_PAIRS.map(([v1, v2]) => ({ url: `${SITE_URL}/es/comparar/${v1}/${v2}`, lastModified: NOW, changeFrequency: "monthly" as const, priority: 0.75 })),
    ...COMPARISON_PAIRS.map(([v1, v2]) => ({ url: `${SITE_URL}/ca/comparar/${v1}/${v2}`, lastModified: NOW, changeFrequency: "monthly" as const, priority: 0.7 })),
    ...COMPARISON_PAIRS.map(([v1, v2]) => ({ url: `${SITE_URL}/en/compare/${v1}/${v2}`, lastModified: NOW, changeFrequency: "monthly" as const, priority: 0.75 })),
  ];

  return [
    ...homepageUrls,
    ...esListingUrls,
    ...multiLangIndexUrls,
    ...tiemposUrls,
    ...compararUrls,
    ...esVerbUrls,
    ...caVerbUrls,
    ...enVerbUrls,
  ];
}

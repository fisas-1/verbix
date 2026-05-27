import type { MetadataRoute } from "next";
import { getAllVerbSlugs } from "@/lib/verbs";
import { SITE_URL } from "@/lib/seo";

const ALL_LANGS = ["es", "ca", "en"];
const LETTERS = "abcdefghijklmnopqrstuvwxyz".split("");
const GROUPS = ["ar", "er", "ir"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [esSlugs, caSlugs, enSlugs] = await Promise.all([
    getAllVerbSlugs("es"),
    getAllVerbSlugs("ca"),
    getAllVerbSlugs("en"),
  ]);

  // Spanish verb pages (3 UI languages)
  const esVerbUrls: MetadataRoute.Sitemap = esSlugs.flatMap(({ slug }) => [
    { url: `${SITE_URL}/es/verbo/${slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${SITE_URL}/ca/verb/${slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${SITE_URL}/en/verb/${slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
  ]);

  // Catalan verb pages (3 UI languages)
  const caVerbUrls: MetadataRoute.Sitemap = caSlugs.flatMap(({ slug }) => [
    { url: `${SITE_URL}/es/verb-catala/${slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${SITE_URL}/ca/verb-catala/${slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${SITE_URL}/en/catalan-verb/${slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
  ]);

  // English verb pages (3 UI languages)
  const enVerbUrls: MetadataRoute.Sitemap = enSlugs.flatMap(({ slug }) => [
    { url: `${SITE_URL}/es/verb-ingles/${slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${SITE_URL}/ca/verb-angles/${slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${SITE_URL}/en/english-verb/${slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
  ]);

  // Spanish verb listing pages
  const esIndexUrls: MetadataRoute.Sitemap = ALL_LANGS.flatMap((lang) => [
    { url: `${SITE_URL}/${lang}`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 1.0 },
    { url: `${SITE_URL}/${lang}/verbos`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${SITE_URL}/${lang}/verbos/irregulares`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${SITE_URL}/${lang}/verbos/regulares`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 },
    ...GROUPS.map((g) => ({
      url: `${SITE_URL}/${lang}/verbos/grupo/${g}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...LETTERS.map((l) => ({
      url: `${SITE_URL}/${lang}/verbos/letra/${l}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ]);

  // Catalan + English verb index pages
  const multiLangIndexUrls: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/es/verbos-catalanes`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.7 },
    { url: `${SITE_URL}/es/verbos-ingleses`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.7 },
    { url: `${SITE_URL}/ca/verbs-catalans`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.7 },
    { url: `${SITE_URL}/ca/verbs-anglesos`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.7 },
    { url: `${SITE_URL}/en/catalan-verbs`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.7 },
    { url: `${SITE_URL}/en/english-verbs`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.7 },
  ];

  return [...esIndexUrls, ...multiLangIndexUrls, ...esVerbUrls, ...caVerbUrls, ...enVerbUrls];
}

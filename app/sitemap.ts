import type { MetadataRoute } from "next";
import { getAllVerbSlugs } from "@/lib/verbs";
import { SITE_URL } from "@/lib/seo";

const LANGS = ["es"];
const LETTERS = "abcdefghijklmnopqrstuvwxyz".split("");
const GROUPS = ["ar", "er", "ir"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getAllVerbSlugs("es");

  const verbUrls: MetadataRoute.Sitemap = slugs.flatMap(({ slug }) =>
    LANGS.map((lang) => ({
      url: `${SITE_URL}/${lang}/verbo/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    }))
  );

  const indexUrls: MetadataRoute.Sitemap = LANGS.flatMap((lang) => [
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

  return [...indexUrls, ...verbUrls];
}

import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

// Lightweight structural sitemap — no DB queries, loads instantly.
// Verb pages, tense theory and comparison pages are in the language-specific sitemaps.
const NOW = new Date();
const ALL_LANGS = ["es", "ca", "en"];
const GROUPS = ["ar", "er", "ir"];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    // Homepages
    ...ALL_LANGS.map((lang) => ({
      url: `${SITE_URL}/${lang}`,
      lastModified: NOW,
      changeFrequency: "daily" as const,
      priority: 1.0,
    })),

    // Main listing pages
    ...ALL_LANGS.flatMap((lang) => [
      { url: `${SITE_URL}/${lang}/verbos`, lastModified: NOW, changeFrequency: "weekly" as const, priority: 0.8 },
      { url: `${SITE_URL}/${lang}/verbos/irregulares`, lastModified: NOW, changeFrequency: "monthly" as const, priority: 0.7 },
      { url: `${SITE_URL}/${lang}/verbos/regulares`, lastModified: NOW, changeFrequency: "monthly" as const, priority: 0.7 },
      ...GROUPS.map((g) => ({ url: `${SITE_URL}/${lang}/verbos/grupo/${g}`, lastModified: NOW, changeFrequency: "monthly" as const, priority: 0.6 })),
    ]),

    // Multi-language verb index pages
    { url: `${SITE_URL}/es/verbos-catalanes`, lastModified: NOW, changeFrequency: "weekly" as const, priority: 0.6 },
    { url: `${SITE_URL}/es/verbos-ingleses`, lastModified: NOW, changeFrequency: "weekly" as const, priority: 0.6 },
    { url: `${SITE_URL}/ca/verbs-catalans`, lastModified: NOW, changeFrequency: "weekly" as const, priority: 0.6 },
    { url: `${SITE_URL}/ca/verbs-anglesos`, lastModified: NOW, changeFrequency: "weekly" as const, priority: 0.6 },
    { url: `${SITE_URL}/en/catalan-verbs`, lastModified: NOW, changeFrequency: "weekly" as const, priority: 0.6 },
    { url: `${SITE_URL}/en/english-verbs`, lastModified: NOW, changeFrequency: "weekly" as const, priority: 0.6 },

    // ES-only long-tail pages
    { url: `${SITE_URL}/es/verbos/mas-usados`, lastModified: NOW, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${SITE_URL}/es/verbos/falsos-amigos`, lastModified: NOW, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${SITE_URL}/es/verbos/irregulares/cambio-radical-eie`, lastModified: NOW, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${SITE_URL}/es/verbos/irregulares/cambio-radical-oue`, lastModified: NOW, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${SITE_URL}/es/verbos/irregulares/primera-persona`, lastModified: NOW, changeFrequency: "monthly" as const, priority: 0.7 },

    // About / contact / privacy (all langs)
    ...ALL_LANGS.flatMap((lang) => [
      { url: `${SITE_URL}/${lang}/sobre-nosotros`, lastModified: NOW, changeFrequency: "yearly" as const, priority: 0.3 },
      { url: `${SITE_URL}/${lang}/contacto`, lastModified: NOW, changeFrequency: "yearly" as const, priority: 0.3 },
      { url: `${SITE_URL}/${lang}/politica-de-privacidad`, lastModified: NOW, changeFrequency: "yearly" as const, priority: 0.2 },
    ]),
  ];
}

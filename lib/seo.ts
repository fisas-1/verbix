import type { Verb } from "./verbs";
import { t, caVerbMeta, enVerbMeta } from "./i18n";

export const SITE_URL = "https://verblop.xyz";
export const SITE_NAME = "Verblop";

/** Maps UI lang code to og:locale value. */
export function langToOgLocale(lang: string): string {
  if (lang === "ca") return "ca_ES";
  if (lang === "en") return "en_US";
  return "es_ES";
}

/** Returns the two alternate locales for a given UI lang. */
export function alternateOgLocales(lang: string): string[] {
  const all = ["es_ES", "ca_ES", "en_US"];
  return all.filter((l) => l !== langToOgLocale(lang));
}

export function verbTitle(verb: Verb, lang = "es"): string {
  return t(lang).verbTitleTemplate(verb.infinitive);
}

export function verbDescription(verb: Verb, lang = "es"): string {
  return t(lang).verbDescTemplate(verb.infinitive, verb.type, verb.conjugation_group);
}

export function verbCanonical(slug: string, lang = "es"): string {
  if (lang === "es") return `${SITE_URL}/es/verbo/${slug}`;
  return `${SITE_URL}/${lang}/verb/${slug}`;
}

export function verbHreflangs(slug: string): Record<string, string> {
  return {
    es: `${SITE_URL}/es/verbo/${slug}`,
    ca: `${SITE_URL}/ca/verb/${slug}`,
    en: `${SITE_URL}/en/verb/${slug}`,
    "x-default": `${SITE_URL}/es/verbo/${slug}`,
  };
}

// ── Catalan verb SEO ──────────────────────────────────────────────────────────

export function caVerbTitle(verb: Verb, uiLang: string): string {
  return (caVerbMeta[uiLang] ?? caVerbMeta.es).titleTpl(verb.infinitive);
}

export function caVerbDescription(verb: Verb, uiLang: string): string {
  return (caVerbMeta[uiLang] ?? caVerbMeta.es).descTpl(verb.infinitive);
}

export function caVerbCanonical(slug: string, uiLang: string): string {
  if (uiLang === "en") return `${SITE_URL}/en/catalan-verb/${slug}`;
  return `${SITE_URL}/${uiLang}/verb-catala/${slug}`;
}

export function caVerbHreflangs(slug: string): Record<string, string> {
  return {
    es: `${SITE_URL}/es/verb-catala/${slug}`,
    ca: `${SITE_URL}/ca/verb-catala/${slug}`,
    en: `${SITE_URL}/en/catalan-verb/${slug}`,
    "x-default": `${SITE_URL}/es/verb-catala/${slug}`,
  };
}

// ── English verb SEO ──────────────────────────────────────────────────────────

export function enVerbTitle(verb: Verb, uiLang: string): string {
  return (enVerbMeta[uiLang] ?? enVerbMeta.en).titleTpl(verb.infinitive);
}

export function enVerbDescription(verb: Verb, uiLang: string): string {
  return (enVerbMeta[uiLang] ?? enVerbMeta.en).descTpl(verb.infinitive);
}

export function enVerbCanonical(slug: string, uiLang: string): string {
  if (uiLang === "es") return `${SITE_URL}/es/verb-ingles/${slug}`;
  if (uiLang === "ca") return `${SITE_URL}/ca/verb-angles/${slug}`;
  return `${SITE_URL}/en/english-verb/${slug}`;
}

export function enVerbHreflangs(slug: string): Record<string, string> {
  return {
    es: `${SITE_URL}/es/verb-ingles/${slug}`,
    ca: `${SITE_URL}/ca/verb-angles/${slug}`,
    en: `${SITE_URL}/en/english-verb/${slug}`,
    "x-default": `${SITE_URL}/en/english-verb/${slug}`,
  };
}

// ── Index pages ───────────────────────────────────────────────────────────────

export function indexTitle(lang = "es"): string {
  return `${t(lang).heroTitle} | ${SITE_NAME}`;
}

export function indexDescription(lang = "es"): string {
  if (lang === "ca") return `Conjugador de verbs en espanyol gratuït. Conjuga a l'instant més de 500 verbs: present, pretèrit, futur i subjuntiu. Irregulars destacats, exemples reals i quiz interactiu.`;
  if (lang === "en") return `Free Spanish verb conjugator. Conjugate 500+ Spanish verbs instantly: present, past, future and subjunctive. Irregular forms highlighted, real examples and interactive quiz.`;
  return `Conjugador de verbos en español gratis. Conjuga al instante más de 500 verbos: presente, pretérito, futuro y subjuntivo. Irregulares destacados, ejemplos reales y quiz interactivo.`;
}

import type { Verb } from "./verbs";
import { t } from "./i18n";

export const SITE_URL = "https://conjugaweb.com";
export const SITE_NAME = "ConjugaWeb";

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

export function indexTitle(lang = "es"): string {
  return `${t(lang).heroTitle} | ${SITE_NAME}`;
}

export function indexDescription(lang = "es"): string {
  if (lang === "ca") return `Conjuga a l'instant qualsevol verb en espanyol. Tots els temps, tots els modes. Més de 12.000 verbs amb exemples i exercicis interactius.`;
  if (lang === "en") return `Conjugate any Spanish verb instantly. All tenses, all moods. Over 12,000 verbs with examples and interactive exercises.`;
  return `Conjuga cualquier verbo en español al instante. Todos los tiempos, todos los modos. Más de 12.000 verbos con ejemplos y ejercicios interactivos.`;
}

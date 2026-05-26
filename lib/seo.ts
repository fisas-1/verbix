import type { Verb } from "./verbs";

export const SITE_URL = "https://conjugaweb.com";
export const SITE_NAME = "ConjugaWeb";

export function verbTitle(verb: Verb): string {
  return `Conjugar ${verb.infinitive} | Todos los tiempos verbales`;
}

export function verbDescription(verb: Verb): string {
  const typeLabel = verb.type === "irregular" ? "irregular" : "regular";
  return `Conjugación completa de ${verb.infinitive} (verbo ${typeLabel} del grupo -${verb.conjugation_group}). Presente, pasado, futuro, subjuntivo e imperativo con ejemplos.`;
}

export function verbCanonical(slug: string, lang = "es"): string {
  return `${SITE_URL}/${lang}/verbo/${slug}`;
}

export function indexTitle(lang = "es"): string {
  return `Conjugación de verbos en español | ${SITE_NAME}`;
}

export function indexDescription(): string {
  return `Conjuga cualquier verbo en español al instante. Todos los tiempos, todos los modos. Más de 12.000 verbos con ejemplos y ejercicios interactivos.`;
}

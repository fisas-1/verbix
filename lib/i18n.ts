export type Lang = "es" | "ca" | "en";

export interface LangStrings {
  siteTagline: string;
  allVerbs: string;
  irregular: string;
  regular: string;
  conjugate: string;
  inSpanish: string;
  allTenses: string;
  verbTitleTemplate: (infinitive: string) => string;
  verbDescTemplate: (infinitive: string, type: string, group: string) => string;
  verbKeywords: (infinitive: string) => string[];
  nonPersonalForms: string;
  infinitivo: string;
  gerundio: string;
  participio: string;
  infCompuesto: string;
  typeIrregular: string;
  typeRegular: string;
  typeReflexive: string;
  personLabel: string;
  formLabel: string;
  irregularLegend: string;
  moods: { indicativo: string; subjuntivo: string; imperativo: string };
  tenseLabels: Record<string, string>;
  conjugationIn: string;
  relatedVerbsTitle: (group: string) => string;
  aboutVerb: (infinitive: string) => string;
  seoVerbType: (infinitive: string, type: string, group: string, translationEn?: string | null) => string;
  seoIrregular: (infinitive: string, stemChange?: string | null) => string;
  seoRegular: (infinitive: string, group: string) => string;
  seoPresent: (infinitive: string, yo: string, tu: string, el: string) => string;
  heroTitle: string;
  heroDesc: (count: string) => string;
  popularVerbs: string;
  exploreByGroup: string;
  groupDesc: (g: string) => string;
  features: { icon: string; title: string; desc: string }[];
  searchPlaceholder: string;
  quizTitle: string;
  quizQuestion: (current: number, total: number) => string;
  quizCorrect: (score: number) => string;
  quizPrompt: (infinitive: string, tense: string, person: string) => string;
  quizPerfect: string;
  quizGood: string;
  quizRetry: string;
  quizTryAgain: string;
  quizNext: string;
  quizSeeResults: string;
  examplesTitle: string;
  examplesSoon: (infinitive: string) => string;
}

const es: LangStrings = {
  siteTagline: "Conjugación de verbos en español",
  allVerbs: "Todos los verbos",
  irregular: "Irregulares",
  regular: "Regulares",
  conjugate: "Conjugar",
  inSpanish: "en español",
  allTenses: "Todos los tiempos verbales",
  verbTitleTemplate: (v) => `Conjugar ${v} | Todos los tiempos verbales`,
  verbDescTemplate: (v, type, group) =>
    `Conjugación completa de ${v} (verbo ${type === "irregular" ? "irregular" : "regular"} del grupo -${group}). Presente, pasado, futuro, subjuntivo e imperativo con ejemplos.`,
  verbKeywords: (v) => [`conjugar ${v}`, `conjugación ${v}`, `${v} español`],
  nonPersonalForms: "Formas no personales",
  infinitivo: "Infinitivo",
  gerundio: "Gerundio",
  participio: "Participio",
  infCompuesto: "Inf. Compuesto",
  typeIrregular: "Irregular",
  typeRegular: "Regular",
  typeReflexive: "Reflexivo",
  personLabel: "Persona",
  formLabel: "Forma",
  irregularLegend: "Las formas en azul son irregulares.",
  moods: { indicativo: "Indicativo", subjuntivo: "Subjuntivo", imperativo: "Imperativo" },
  conjugationIn: "Conjugación en",
  tenseLabels: {
    presente: "Presente",
    preterito_indefinido: "Pretérito Indefinido",
    preterito_imperfecto: "Pretérito Imperfecto",
    preterito_perfecto: "Pretérito Perfecto Compuesto",
    preterito_pluscuamperfecto: "Pretérito Pluscuamperfecto",
    futuro_simple: "Futuro Simple",
    futuro_compuesto: "Futuro Compuesto",
    condicional_simple: "Condicional Simple",
    condicional_compuesto: "Condicional Compuesto",
    subjuntivo_presente: "Presente de Subjuntivo",
    subjuntivo_imperfecto_ra: "Imperfecto de Subjuntivo (-ra)",
    subjuntivo_imperfecto_se: "Imperfecto de Subjuntivo (-se)",
    subjuntivo_perfecto: "Pretérito Perfecto de Subjuntivo",
    subjuntivo_pluscuamperfecto: "Pluscuamperfecto de Subjuntivo",
    imperativo_afirmativo: "Imperativo Afirmativo",
    imperativo_negativo: "Imperativo Negativo",
  },
  relatedVerbsTitle: (g) => `Otros verbos en -${g}`,
  aboutVerb: (v) => `Sobre el verbo ${v}`,
  seoVerbType: (v, type, group, en) =>
    `${v} es un verbo ${type === "irregular" ? "irregular" : "regular"} de la primera conjugación (verbos en -${group}) en español.${en ? ` Su significado en inglés es "${en}".` : ""}`,
  seoIrregular: (_v, sc) =>
    `Al ser un verbo irregular, algunas de sus formas no siguen los patrones estándar de los verbos regulares.${sc ? ` Presenta el cambio de raíz ${sc} en ciertas personas del presente de indicativo y de subjuntivo.` : ""}`,
  seoRegular: (v, g) =>
    `Al ser un verbo regular del grupo -${g}, sigue las terminaciones estándar para todos los tiempos verbales. Una vez que conoces las reglas de los verbos -${g}, puedes conjugar ${v} y todos los verbos regulares del mismo grupo.`,
  seoPresent: (v, yo, tu, el) =>
    `Para conjugar ${v} en presente de indicativo: yo ${yo}, tú ${tu}, él/ella ${el}.`,
  heroTitle: "Conjugador de verbos en español",
  heroDesc: (count) => `Conjuga al instante cualquiera de los ${count} verbos. Todos los tiempos, todos los modos.`,
  popularVerbs: "Verbos más consultados",
  exploreByGroup: "Explorar por grupo",
  groupDesc: (g) => `Verbos en -${g}`,
  features: [
    { icon: "⚡", title: "Instantáneo", desc: "Resultados sin espera, sin registro." },
    { icon: "📚", title: "Completo", desc: "Todos los tiempos: indicativo, subjuntivo e imperativo." },
    { icon: "🎯", title: "Ejercicios", desc: "Practica con el quiz interactivo por verbo." },
  ],
  searchPlaceholder: "Escribe un verbo, ej: hablar...",
  quizTitle: "Ponte a prueba",
  quizQuestion: (c, t) => `Pregunta ${c}/${t}`,
  quizCorrect: (s) => `${s} correctas`,
  quizPrompt: (v, tense, person) => `¿Cómo se conjuga "${v}" en ${tense} — ${person}?`,
  quizPerfect: "¡Perfecto! Dominas este verbo.",
  quizGood: "¡Muy bien! Sigue practicando.",
  quizRetry: "Repasa las conjugaciones e inténtalo de nuevo.",
  quizTryAgain: "Intentar de nuevo",
  quizNext: "Siguiente",
  quizSeeResults: "Ver resultados",
  examplesTitle: "Ejemplos de uso",
  examplesSoon: (v) => `Próximamente añadiremos ejemplos para ${v}.`,
};

const ca: LangStrings = {
  siteTagline: "Conjugació de verbs en espanyol",
  allVerbs: "Tots els verbs",
  irregular: "Irregulars",
  regular: "Regulars",
  conjugate: "Conjugar",
  inSpanish: "en espanyol",
  allTenses: "Tots els temps verbals",
  verbTitleTemplate: (v) => `Conjugar ${v} en espanyol | Tots els temps verbals`,
  verbDescTemplate: (v, type, group) =>
    `Conjugació completa de ${v} en espanyol (verb ${type === "irregular" ? "irregular" : "regular"} del grup -${group}). Present, passat, futur, subjuntiu i imperatiu amb exemples.`,
  verbKeywords: (v) => [`conjugar ${v}`, `conjugació ${v}`, `verb espanyol ${v}`],
  nonPersonalForms: "Formes no personals",
  infinitivo: "Infinitiu",
  gerundio: "Gerundi",
  participio: "Participi",
  infCompuesto: "Inf. Compost",
  typeIrregular: "Irregular",
  typeRegular: "Regular",
  typeReflexive: "Reflexiu",
  personLabel: "Persona",
  formLabel: "Forma",
  irregularLegend: "Les formes en blau són irregulars.",
  moods: { indicativo: "Indicatiu", subjuntivo: "Subjuntiu", imperativo: "Imperatiu" },
  conjugationIn: "Conjugació en",
  tenseLabels: {
    presente: "Present",
    preterito_indefinido: "Pretèrit indefinit",
    preterito_imperfecto: "Pretèrit imperfet",
    preterito_perfecto: "Pretèrit perfet compost",
    preterito_pluscuamperfecto: "Pretèrit plusquamperfet",
    futuro_simple: "Futur simple",
    futuro_compuesto: "Futur compost",
    condicional_simple: "Condicional simple",
    condicional_compuesto: "Condicional compost",
    subjuntivo_presente: "Present de subjuntiu",
    subjuntivo_imperfecto_ra: "Imperfet de subjuntiu (-ra)",
    subjuntivo_imperfecto_se: "Imperfet de subjuntiu (-se)",
    subjuntivo_perfecto: "Pretèrit perfet de subjuntiu",
    subjuntivo_pluscuamperfecto: "Plusquamperfet de subjuntiu",
    imperativo_afirmativo: "Imperatiu afirmatiu",
    imperativo_negativo: "Imperatiu negatiu",
  },
  relatedVerbsTitle: (g) => `Altres verbs en -${g}`,
  aboutVerb: (v) => `Sobre el verb ${v}`,
  seoVerbType: (v, type, group, translationEn) =>
    `${v} és un verb ${type === "irregular" ? "irregular" : "regular"} del grup -${group} en espanyol.${translationEn ? ` El seu significat en anglès és "${translationEn}".` : ""}`,
  seoIrregular: (_v, sc) =>
    `En ser un verb irregular, algunes de les seves formes no segueixen els patrons estàndard dels verbs regulars.${sc ? ` Presenta el canvi d'arrel ${sc} en certes persones del present d'indicatiu i de subjuntiu.` : ""}`,
  seoRegular: (v, g) =>
    `En ser un verb regular del grup -${g}, segueix les terminacions estàndard per a tots els temps verbals. Un cop coneixes les regles dels verbs -${g}, pots conjugar ${v} i tots els verbs regulars del mateix grup.`,
  seoPresent: (v, yo, tu, el) =>
    `Per conjugar ${v} en present d'indicatiu: yo ${yo}, tú ${tu}, él/ella ${el}.`,
  heroTitle: "Conjugador de verbs en espanyol",
  heroDesc: (count) => `Conjuga a l'instant qualsevol dels ${count} verbs. Tots els temps, tots els modes.`,
  popularVerbs: "Verbs més consultats",
  exploreByGroup: "Explorar per grup",
  groupDesc: (g) => `Verbs en -${g}`,
  features: [
    { icon: "⚡", title: "Instantani", desc: "Resultats sense espera, sense registre." },
    { icon: "📚", title: "Complet", desc: "Tots els temps: indicatiu, subjuntiu i imperatiu." },
    { icon: "🎯", title: "Exercicis", desc: "Practica amb el quiz interactiu per verb." },
  ],
  searchPlaceholder: "Escriu un verb, ex: hablar...",
  quizTitle: "Posa't a prova",
  quizQuestion: (c, t) => `Pregunta ${c}/${t}`,
  quizCorrect: (s) => `${s} correctes`,
  quizPrompt: (v, tense, person) => `Com es conjuga "${v}" en ${tense} — ${person}?`,
  quizPerfect: "Excel·lent! Domines aquest verb.",
  quizGood: "Molt bé! Continua practicant.",
  quizRetry: "Repassa les conjugacions i torna-ho a intentar.",
  quizTryAgain: "Tornar-ho a intentar",
  quizNext: "Següent",
  quizSeeResults: "Veure resultats",
  examplesTitle: "Exemples d'ús",
  examplesSoon: (v) => `Aviat afegirem exemples per a ${v}.`,
};

const en: LangStrings = {
  siteTagline: "Spanish verb conjugation",
  allVerbs: "All verbs",
  irregular: "Irregular",
  regular: "Regular",
  conjugate: "Conjugate",
  inSpanish: "in Spanish",
  allTenses: "All tenses",
  verbTitleTemplate: (v) => `Conjugate ${v} in Spanish | All tenses`,
  verbDescTemplate: (v, type, group) =>
    `Complete conjugation of ${v} in Spanish (${type} -${group} verb). Present, past, future, subjunctive and imperative. With examples and interactive exercises.`,
  verbKeywords: (v) => [`conjugate ${v}`, `spanish verb ${v}`, `${v} conjugation`],
  nonPersonalForms: "Non-personal forms",
  infinitivo: "Infinitive",
  gerundio: "Gerund",
  participio: "Participle",
  infCompuesto: "Compound Inf.",
  typeIrregular: "Irregular",
  typeRegular: "Regular",
  typeReflexive: "Reflexive",
  personLabel: "Person",
  formLabel: "Form",
  irregularLegend: "Forms in blue are irregular.",
  moods: { indicativo: "Indicative", subjuntivo: "Subjunctive", imperativo: "Imperative" },
  conjugationIn: "Conjugation —",
  tenseLabels: {
    presente: "Present",
    preterito_indefinido: "Preterite (Simple Past)",
    preterito_imperfecto: "Imperfect",
    preterito_perfecto: "Present Perfect",
    preterito_pluscuamperfecto: "Past Perfect (Pluperfect)",
    futuro_simple: "Simple Future",
    futuro_compuesto: "Future Perfect",
    condicional_simple: "Conditional",
    condicional_compuesto: "Conditional Perfect",
    subjuntivo_presente: "Present Subjunctive",
    subjuntivo_imperfecto_ra: "Imperfect Subjunctive (-ra)",
    subjuntivo_imperfecto_se: "Imperfect Subjunctive (-se)",
    subjuntivo_perfecto: "Present Perfect Subjunctive",
    subjuntivo_pluscuamperfecto: "Past Perfect Subjunctive",
    imperativo_afirmativo: "Affirmative Imperative",
    imperativo_negativo: "Negative Imperative",
  },
  relatedVerbsTitle: (g) => `Other -${g} verbs`,
  aboutVerb: (v) => `About the verb ${v}`,
  seoVerbType: (v, type, group, translationEn) =>
    `${v} is a ${type === "irregular" ? "irregular" : "regular"} Spanish verb from the -${group} conjugation group.${translationEn ? ` It means "${translationEn}" in English.` : ""}`,
  seoIrregular: (_v, sc) =>
    `As an irregular verb, some of its forms do not follow the standard -${sc ? sc + " " : ""}patterns for regular verbs.${sc ? ` It has a ${sc} stem change in certain persons of the present indicative and subjunctive.` : ""}`,
  seoRegular: (v, g) =>
    `As a regular -${g} verb, it follows the standard endings for all tenses. Once you learn the -${g} verb rules, you can conjugate ${v} and every other regular -${g} verb the same way.`,
  seoPresent: (v, yo, tu, el) =>
    `To conjugate ${v} in the present tense: yo ${yo}, tú ${tu}, él/ella ${el}.`,
  heroTitle: "Spanish verb conjugator",
  heroDesc: (count) => `Conjugate any of the ${count} verbs instantly. All tenses, all moods.`,
  popularVerbs: "Most searched verbs",
  exploreByGroup: "Browse by group",
  groupDesc: (g) => `-${g} verbs`,
  features: [
    { icon: "⚡", title: "Instant", desc: "Results with no waiting, no sign-up." },
    { icon: "📚", title: "Complete", desc: "All tenses: indicative, subjunctive and imperative." },
    { icon: "🎯", title: "Exercises", desc: "Practice with the interactive quiz for each verb." },
  ],
  searchPlaceholder: "Type a verb, e.g. hablar...",
  quizTitle: "Test yourself",
  quizQuestion: (c, t) => `Question ${c}/${t}`,
  quizCorrect: (s) => `${s} correct`,
  quizPrompt: (v, tense, person) => `How is "${v}" conjugated in ${tense} — ${person}?`,
  quizPerfect: "Perfect! You've mastered this verb.",
  quizGood: "Well done! Keep practising.",
  quizRetry: "Review the conjugations and try again.",
  quizTryAgain: "Try again",
  quizNext: "Next",
  quizSeeResults: "See results",
  examplesTitle: "Usage examples",
  examplesSoon: (v) => `Examples for ${v} are coming soon.`,
};

export const TRANSLATIONS: Record<string, LangStrings> = { es, ca, en };

export function t(lang: string): LangStrings {
  return TRANSLATIONS[lang] ?? TRANSLATIONS.es;
}

export function verbSlugPath(lang: string, slug: string): string {
  if (lang === "es") return `/es/verbo/${slug}`;
  return `/${lang}/verb/${slug}`;
}

import type { Verb } from "./verbs";
import { SITE_URL, SITE_NAME } from "./seo";
import { caVerbCanonical, enVerbCanonical, verbCanonical } from "./seo";

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

function termSetName(verbLang: string, uiLang: string): string {
  if (verbLang === "ca") {
    if (uiLang === "es") return "Verbos en catalán";
    if (uiLang === "en") return "Catalan verbs";
    return "Verbs en català";
  }
  if (verbLang === "en") {
    if (uiLang === "es") return "Verbos en inglés";
    if (uiLang === "ca") return "Verbs en anglès";
    return "English verbs";
  }
  // Spanish verbs
  if (uiLang === "ca") return "Verbs en espanyol";
  if (uiLang === "en") return "Spanish verbs";
  return "Verbos en español";
}

function definedTermDesc(verb: Verb, verbLang: string, uiLang: string): string {
  const inf = verb.infinitive;
  if (verbLang === "ca") {
    if (uiLang === "es") return `Conjugación completa del verbo catalán ${inf}`;
    if (uiLang === "en") return `Complete conjugation of the Catalan verb ${inf}`;
    return `Conjugació completa del verb català ${inf}`;
  }
  if (verbLang === "en") {
    if (uiLang === "es") return `Conjugación completa del verbo inglés ${inf}`;
    if (uiLang === "ca") return `Conjugació completa del verb anglès ${inf}`;
    return `Complete conjugation of the English verb ${inf}`;
  }
  // Spanish verbs
  if (uiLang === "ca") return `Conjugació completa del verb espanyol ${inf}`;
  if (uiLang === "en") return `Complete conjugation of the Spanish verb ${inf}`;
  return `Conjugación completa del verbo español ${inf}`;
}

function verbUrl(verb: Verb, uiLang: string, verbLang: string): string {
  if (verbLang === "ca") return `${SITE_URL}${caVerbCanonical(verb.slug, uiLang).replace(SITE_URL, "")}`;
  if (verbLang === "en") return `${SITE_URL}${enVerbCanonical(verb.slug, uiLang).replace(SITE_URL, "")}`;
  return verbCanonical(verb.slug, uiLang);
}

// ─────────────────────────────────────────────────────────────────────────────
// DefinedTerm schema
// ─────────────────────────────────────────────────────────────────────────────

export function generateVerbSchema(verb: Verb, uiLang = "es", verbLang = "es") {
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: verb.infinitive,
    description: definedTermDesc(verb, verbLang, uiLang),
    inDefinedTermSet: {
      "@type": "DefinedTermSet",
      name: termSetName(verbLang, uiLang),
    },
    url: verbUrl(verb, uiLang, verbLang),
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// FAQ schema (4 questions, multilingual)
// ─────────────────────────────────────────────────────────────────────────────

function faqQuestions(verb: Verb, uiLang: string, verbLang: string, presenteForms: string, participio: string) {
  const inf = verb.infinitive;
  const typeAnswer = (lang: string) => {
    const isIrr = verb.type === "irregular";
    const sc = verb.stem_change;
    if (lang === "es") {
      const base = isIrr
        ? `${inf} es un verbo irregular${sc ? ` que sufre el cambio de raíz ${sc}` : ""}.`
        : `${inf} es un verbo regular del grupo -${verb.conjugation_group}.`;
      return base;
    }
    if (lang === "ca") {
      const base = isIrr
        ? `${inf} és un verb irregular${sc ? ` que pateix el canvi d'arrel ${sc}` : ""}.`
        : `${inf} és un verb regular del grup -${verb.conjugation_group}.`;
      return base;
    }
    return isIrr
      ? `${inf} is an irregular verb${sc ? ` with a ${sc} stem change` : ""}.`
      : `${inf} is a regular -${verb.conjugation_group} verb.`;
  };

  const participioAnswer = (lang: string) => {
    if (lang === "es") return `El participio de ${inf} es "${participio}". Se usa para formar tiempos compuestos: he ${participio}, había ${participio}, etc.`;
    if (lang === "ca") return `El participi de ${inf} és "${participio}". S'usa per formar temps compostos: he ${participio}, havia ${participio}, etc.`;
    return `The past participle of ${inf} is "${participio}". It is used to form compound tenses: have ${participio}, had ${participio}, etc.`;
  };

  const exampleAnswer = (lang: string) => {
    if (lang === "es") return `El verbo ${inf} se usa en muchas situaciones cotidianas. Por ejemplo, en presente: "${presenteForms.split(",")[0]?.trim() ?? inf}".`;
    if (lang === "ca") return `El verb ${inf} s'usa en moltes situacions quotidianes. Per exemple, en present: "${presenteForms.split(",")[0]?.trim() ?? inf}".`;
    return `The verb ${inf} is used in many everyday situations. For example, in present tense: "${presenteForms.split(",")[0]?.trim() ?? inf}".`;
  };

  if (uiLang === "ca") {
    return [
      { q: `Com es conjuga ${inf} en present?`, a: `Conjugació de ${inf} en present d'indicatiu: ${presenteForms}` },
      { q: `És ${inf} regular o irregular?`, a: typeAnswer("ca") },
      { q: `Quin és el participi de ${inf}?`, a: participioAnswer("ca") },
      { q: `Com s'usa ${inf} en una frase?`, a: exampleAnswer("ca") },
    ];
  }
  if (uiLang === "en") {
    const lang = verbLang === "en" ? "en" : "en";
    void lang;
    return [
      { q: `How do you conjugate ${inf} in present tense?`, a: `Conjugation of ${inf} in present tense: ${presenteForms}` },
      { q: `Is ${inf} a regular or irregular verb?`, a: typeAnswer("en") },
      { q: `What is the past participle of ${inf}?`, a: participioAnswer("en") },
      { q: `How do you use ${inf} in a sentence?`, a: exampleAnswer("en") },
    ];
  }
  // default es
  return [
    { q: `¿Cómo se conjuga ${inf} en presente?`, a: `Conjugación de ${inf} en presente de indicativo: ${presenteForms}` },
    { q: `¿Es ${inf} regular o irregular?`, a: typeAnswer("es") },
    { q: `¿Cuál es el participio de ${inf}?`, a: participioAnswer("es") },
    { q: `¿Cómo se usa ${inf} en una frase?`, a: exampleAnswer("es") },
  ];
}

export function generateFAQSchema(
  verb: Verb,
  uiLang = "es",
  presenteForms: string,
  participio: string,
  verbLang = "es"
) {
  const questions = faqQuestions(verb, uiLang, verbLang, presenteForms, participio);
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// BreadcrumbList schema (multilingual)
// ─────────────────────────────────────────────────────────────────────────────

export function generateBreadcrumbSchema(
  verb: Verb,
  uiLang = "es",
  verbLang = "es"
) {
  const inf = verb.infinitive;

  const homeLabel = uiLang === "es" ? "Inicio" : uiLang === "ca" ? "Inici" : "Home";
  const homeUrl = `${SITE_URL}/${uiLang}`;

  let indexLabel: string;
  let indexUrl: string;
  let verbLabel: string;
  let verbItemUrl: string;

  if (verbLang === "ca") {
    if (uiLang === "es") {
      indexLabel = "Verbos en catalán";
      indexUrl = `${SITE_URL}/es/verbos-catalanes`;
      verbLabel = `Conjugar ${inf} en catalán`;
      verbItemUrl = `${SITE_URL}/es/verb-catala/${verb.slug}`;
    } else if (uiLang === "en") {
      indexLabel = "Catalan verbs";
      indexUrl = `${SITE_URL}/en/catalan-verbs`;
      verbLabel = `Conjugate ${inf} in Catalan`;
      verbItemUrl = `${SITE_URL}/en/catalan-verb/${verb.slug}`;
    } else {
      indexLabel = "Verbs en català";
      indexUrl = `${SITE_URL}/ca/verbs-catalans`;
      verbLabel = `Conjugar ${inf} en català`;
      verbItemUrl = `${SITE_URL}/ca/verb-catala/${verb.slug}`;
    }
  } else if (verbLang === "en") {
    if (uiLang === "es") {
      indexLabel = "Verbos en inglés";
      indexUrl = `${SITE_URL}/es/verbos-ingleses`;
      verbLabel = `Conjugar ${inf} en inglés`;
      verbItemUrl = `${SITE_URL}/es/verb-ingles/${verb.slug}`;
    } else if (uiLang === "en") {
      indexLabel = "English verbs";
      indexUrl = `${SITE_URL}/en/english-verbs`;
      verbLabel = `Conjugate ${inf} in English`;
      verbItemUrl = `${SITE_URL}/en/english-verb/${verb.slug}`;
    } else {
      indexLabel = "Verbs en anglès";
      indexUrl = `${SITE_URL}/ca/verbs-anglesos`;
      verbLabel = `Conjugar ${inf} en anglès`;
      verbItemUrl = `${SITE_URL}/ca/verb-angles/${verb.slug}`;
    }
  } else {
    // Spanish verbs
    if (uiLang === "ca") {
      indexLabel = "Verbs en espanyol";
      indexUrl = `${SITE_URL}/ca/verbos`;
      verbLabel = `Conjugar ${inf} en espanyol`;
      verbItemUrl = `${SITE_URL}/ca/verb/${verb.slug}`;
    } else if (uiLang === "en") {
      indexLabel = "Spanish verbs";
      indexUrl = `${SITE_URL}/en/verbos`;
      verbLabel = `Conjugate ${inf} in Spanish`;
      verbItemUrl = `${SITE_URL}/en/verb/${verb.slug}`;
    } else {
      indexLabel = "Verbos en español";
      indexUrl = `${SITE_URL}/es/verbos`;
      verbLabel = `Conjugar ${inf}`;
      verbItemUrl = `${SITE_URL}/es/verbo/${verb.slug}`;
    }
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: homeLabel, item: homeUrl },
      { "@type": "ListItem", position: 2, name: indexLabel, item: indexUrl },
      { "@type": "ListItem", position: 3, name: verbLabel, item: verbItemUrl },
    ],
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// HowTo schema (multilingual)
// ─────────────────────────────────────────────────────────────────────────────

export function generateHowToSchema(verb: Verb, uiLang = "es", verbLang = "es") {
  const inf = verb.infinitive;

  if (uiLang === "ca") {
    const verbLangLabel = verbLang === "ca" ? "en català" : verbLang === "en" ? "en anglès" : "en espanyol";
    return {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: `Com conjugar ${inf} ${verbLangLabel}`,
      description: `Guia pas a pas per conjugar el verb ${inf} ${verbLangLabel}`,
      step: [
        { "@type": "HowToStep", position: 1, name: "Identifica el temps verbal", text: "Decideix quin temps verbal necessites: present, passat, futur, subjuntiu o imperatiu." },
        { "@type": "HowToStep", position: 2, name: "Identifica la persona gramatical", text: "Determina la persona gramatical: jo, tu, ell/ella, nosaltres, vosaltres o ells/elles." },
        { "@type": "HowToStep", position: 3, name: "Aplica la terminació correcta", text: `Afegeix la terminació corresponent a l'arrel de ${inf} segons el temps i la persona.` },
        { "@type": "HowToStep", position: 4, name: "Comprova si és irregular", text: `Verifica si ${inf} és irregular en aquell temps. Els verbs irregulars poden canviar l'arrel o les terminacions.` },
      ],
    };
  }

  if (uiLang === "en") {
    const verbLangLabel = verbLang === "ca" ? "in Catalan" : verbLang === "en" ? "in English" : "in Spanish";
    return {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: `How to conjugate ${inf} ${verbLangLabel}`,
      description: `Step-by-step guide to conjugating the verb ${inf} ${verbLangLabel}`,
      step: [
        { "@type": "HowToStep", position: 1, name: "Identify the tense", text: "Decide which tense you need: present, past, future, subjunctive or imperative." },
        { "@type": "HowToStep", position: 2, name: "Identify the person", text: "Determine the grammatical person: I, you, he/she/it, we, you (plural), they." },
        { "@type": "HowToStep", position: 3, name: "Apply the correct ending", text: `Add the appropriate ending to the stem of ${inf} according to the tense and person.` },
        { "@type": "HowToStep", position: 4, name: "Check for irregularities", text: `Verify whether ${inf} is irregular in that tense. Irregular verbs may change their stem or use unique endings.` },
      ],
    };
  }

  // default es
  const verbLangLabel = verbLang === "ca" ? "en catalán" : verbLang === "en" ? "en inglés" : "en español";
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `Cómo conjugar ${inf} ${verbLangLabel}`,
    description: `Guía paso a paso para conjugar el verbo ${inf} ${verbLangLabel}`,
    step: [
      { "@type": "HowToStep", position: 1, name: "Identifica el tiempo verbal", text: "Decide qué tiempo verbal necesitas: presente, pretérito, futuro, subjuntivo o imperativo." },
      { "@type": "HowToStep", position: 2, name: "Identifica la persona gramatical", text: "Determina la persona gramatical: yo, tú, él/ella, nosotros, vosotros o ellos/ellas." },
      { "@type": "HowToStep", position: 3, name: "Aplica la terminación correcta", text: `Añade la terminación correspondiente a la raíz de ${inf} según el tiempo y la persona.` },
      { "@type": "HowToStep", position: 4, name: "Comprueba si es irregular", text: `Verifica si ${inf} es irregular en ese tiempo. Los verbos irregulares pueden cambiar la raíz o las terminaciones.` },
    ],
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// WebSite schema
// ─────────────────────────────────────────────────────────────────────────────

export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/es/verbo/{search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

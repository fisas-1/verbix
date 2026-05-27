import type { Verb } from "./verbs";
import { SITE_URL, SITE_NAME } from "./seo";

export function generateVerbSchema(verb: Verb) {
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: verb.infinitive,
    description: `Conjugación completa del verbo ${verb.infinitive} en español`,
    inDefinedTermSet: {
      "@type": "DefinedTermSet",
      name: "Verbos en español",
    },
    url: `${SITE_URL}/es/verbo/${verb.slug}`,
  };
}

export function generateFAQSchema(verb: Verb, presenteForms: string) {
  const typeAnswer =
    verb.type === "irregular"
      ? `${verb.infinitive} es un verbo irregular${verb.stem_change ? ` que sufre el cambio de raíz ${verb.stem_change}` : ""}.`
      : `${verb.infinitive} es un verbo regular del grupo -${verb.conjugation_group}.`;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `¿Cómo se conjuga ${verb.infinitive} en presente?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Conjugación de ${verb.infinitive} en presente de indicativo: ${presenteForms}`,
        },
      },
      {
        "@type": "Question",
        name: `¿Es ${verb.infinitive} regular o irregular?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: typeAnswer,
        },
      },
      {
        "@type": "Question",
        name: `¿A qué grupo pertenece el verbo ${verb.infinitive}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `El verbo ${verb.infinitive} pertenece al grupo de los verbos terminados en -${verb.conjugation_group}.`,
        },
      },
    ],
  };
}

export function generateBreadcrumbSchema(verb: Verb) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Verbos en español", item: `${SITE_URL}/es/verbos` },
      {
        "@type": "ListItem",
        position: 3,
        name: `Conjugar ${verb.infinitive}`,
        item: `${SITE_URL}/es/verbo/${verb.slug}`,
      },
    ],
  };
}

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

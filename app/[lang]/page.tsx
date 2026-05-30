import type { Metadata } from "next";
import Link from "next/link";
import VerbSearch from "@/components/VerbSearch";
import { getAllVerbsForSearch, getTotalVerbCount, getTopVerbsByLang } from "@/lib/verbs";
import { indexTitle, indexDescription, SITE_NAME, SITE_URL } from "@/lib/seo";
import { t, verbSlugPath, caVerbSlugPath, enVerbSlugPath, caVerbMeta, enVerbMeta } from "@/lib/i18n";
import { generateWebSiteSchema, generateHomeFAQSchema, generateHomeFAQs, generateOrganizationSchema } from "@/lib/schema";

export async function generateStaticParams() {
  return [{ lang: "es" }, { lang: "ca" }, { lang: "en" }];
}

export const revalidate = 86400;

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: indexTitle(lang),
    description: indexDescription(lang),
    alternates: {
      canonical: `${SITE_URL}/${lang}`,
      languages: {
        es: `${SITE_URL}/es`,
        ca: `${SITE_URL}/ca`,
        en: `${SITE_URL}/en`,
        "x-default": `${SITE_URL}/es`,
      },
    },
    openGraph: {
      title: indexTitle(lang),
      description: indexDescription(lang),
      url: `${SITE_URL}/${lang}`,
      siteName: SITE_NAME,
      locale: lang === "ca" ? "ca_ES" : lang === "en" ? "en_US" : "es_ES",
      type: "website",
    },
  };
}

const POPULAR_ES = ["hablar", "ser", "estar", "tener", "hacer", "poder", "decir", "ir", "ver", "dar", "saber", "querer", "volver", "pedir", "dormir", "llegar", "venir", "poner", "salir", "querer"];
const POPULAR_CA = ["ser", "estar", "haver", "tenir", "fer", "poder", "voler", "saber", "anar", "venir", "dir", "donar", "veure", "posar", "portar", "sortir", "arribar", "parlar", "trobar", "viure"];
const POPULAR_EN = ["be", "have", "do", "say", "go", "get", "make", "know", "think", "take", "see", "come", "want", "give", "tell", "find", "feel", "become", "leave", "keep"];

const ABOUT_CONTENT: Record<string, { h2: string; p1: string; p2: string }> = {
  es: {
    h2: "Conjugador de verbos gratuito: español, català e inglés",
    p1: "Verblop es un conjugador de verbos gratuito que cubre tres idiomas: español, català e inglés. Para el español incluye más de 500 verbos con todos los tiempos verbales: presente de indicativo, pretérito indefinido, pretérito imperfecto, pretérito perfecto compuesto, futuro simple, condicional, y los modos subjuntivo e imperativo. Las formas irregulares aparecen destacadas en azul para identificarlas de un vistazo.",
    p2: "La base de datos cubre verbos regulares, irregulares y reflexivos de todos los grupos (-ar, -er, -ir), con cambios de raíz señalados (e→ie, o→ue, e→i). Además de español, también puedes conjugar verbos en català y verbos en inglés. Cada página de verbo incluye un quiz interactivo, ejemplos reales y acceso directo a verbos relacionados. Sin registro, sin anuncios intrusivos.",
  },
  ca: {
    h2: "Conjugador de verbs gratuït: espanyol, català i anglès",
    p1: "Verblop és un conjugador de verbs gratuït que cobreix tres idiomes: espanyol, català i anglès. Per a l'espanyol inclou més de 500 verbs amb tots els temps verbals: present d'indicatiu, pretèrit indefinit, pretèrit imperfet, pretèrit perfet, futur simple, condicional, i els modes subjuntiu i imperatiu. Les formes irregulars apareixen destacades en blau per identificar-les d'una ullada.",
    p2: "La base de dades cobreix verbs regulars, irregulars i reflexius de tots els grups (-ar, -er, -ir), amb canvis d'arrel senyalats (e→ie, o→ue, e→i). A més d'espanyol, també pots conjugar verbs en català i verbs en anglès. Cada pàgina de verb inclou un quiz interactiu, exemples reals i accés directe a verbs relacionats. Sense registre, sense anuncis intrusius.",
  },
  en: {
    h2: "Free verb conjugator: Spanish, Catalan and English",
    p1: "Verblop is a free verb conjugator that covers three languages: Spanish, Catalan and English. For Spanish it includes 500+ verbs with all the main tenses: present indicative, preterite, imperfect, present perfect, simple future, conditional, and both subjunctive and imperative moods. Irregular forms are highlighted in blue so you can spot them at a glance.",
    p2: "The database covers regular, irregular, and reflexive verbs from all conjugation groups (-ar, -er, -ir), with stem changes noted (e→ie, o→ue, e→i). In addition to Spanish, you can also conjugate Catalan verbs and English verbs. Every verb page includes an interactive quiz, real usage examples, and direct links to related verbs. No sign-up required, no intrusive ads.",
  },
};

const FAQ_H2: Record<string, string> = {
  es: "Preguntas frecuentes sobre conjugación verbal",
  ca: "Preguntes freqüents sobre conjugació verbal",
  en: "Frequently asked questions about Spanish conjugation",
};

const STATS: Record<string, string[]> = {
  es: ["500+ verbos", "15 tiempos verbales", "Indicativo · Subjuntivo · Imperativo", "Gratis"],
  ca: ["500+ verbs", "15 temps verbals", "Indicatiu · Subjuntiu · Imperatiu", "Gratuït"],
  en: ["500+ verbs", "15 tenses", "Indicative · Subjunctive · Imperative", "Free"],
};

export default async function HomePage({ params }: PageProps) {
  const { lang } = await params;
  const tr = t(lang);
  const [verbs, total] = await Promise.all([
    getAllVerbsForSearch("es"),
    getTotalVerbCount("es"),
  ]);
  const [caVerbs, enVerbs] = await Promise.all([
    getTopVerbsByLang("ca", 20),
    getTopVerbsByLang("en", 20),
  ]);
  const websiteSchema = generateWebSiteSchema();
  const faqSchema = generateHomeFAQSchema(lang);
  const orgSchema = generateOrganizationSchema();
  const faqs = generateHomeFAQs(lang);
  const about = ABOUT_CONTENT[lang] ?? ABOUT_CONTENT.es;
  const stats = STATS[lang] ?? STATS.es;
  const faqH2 = FAQ_H2[lang] ?? FAQ_H2.es;

  const caLabel = caVerbMeta[lang]?.indexTitle ?? "Verbs en català";
  const enLabel = enVerbMeta[lang]?.indexTitle ?? "English verbs";

  const caIndexHref = lang === "es"
    ? "/es/verbos-catalanes"
    : lang === "ca"
    ? "/ca/verbs-catalans"
    : "/en/catalan-verbs";

  const enIndexHref = lang === "es"
    ? "/es/verbos-ingleses"
    : lang === "ca"
    ? "/ca/verbs-anglesos"
    : "/en/english-verbs";

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />

      {/* Hero */}
      <section className="text-center py-10 px-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-3">
          {tr.heroTitle}
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 mb-8 max-w-lg mx-auto">
          {tr.heroDesc(total.toLocaleString())}
        </p>
        <VerbSearch lang={lang} initialVerbs={verbs} placeholder={tr.searchPlaceholder} ariaLabel={tr.searchAriaLabel} />
      </section>

      {/* Stats bar */}
      <div className="flex flex-wrap justify-center gap-x-5 gap-y-1 text-sm text-gray-500 dark:text-gray-400 py-3 border-y border-gray-100 dark:border-gray-800 mb-6">
        {stats.map((s) => (
          <span key={s} className="flex items-center gap-1">
            <span className="text-green-500 font-bold">✓</span> {s}
          </span>
        ))}
      </div>

      {/* Spanish verbs section */}
      <section className="mt-2">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            {lang === "es" ? "Verbos en español" : lang === "ca" ? "Verbs en espanyol" : "Spanish verbs"}
          </h2>
          <Link href={`/${lang}/verbos`} className="text-xs text-blue-600 dark:text-blue-400 hover:underline">
            {tr.allVerbs} →
          </Link>
        </div>
        <div className="flex flex-wrap gap-2">
          {POPULAR_ES.slice(0, 20).map((slug) => (
            <Link
              key={slug}
              href={verbSlugPath(lang, slug)}
              className="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm font-medium hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            >
              {slug}
            </Link>
          ))}
        </div>
      </section>

      {/* Catalan verbs section */}
      <section className="mt-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            {caLabel}
          </h2>
          <Link href={caIndexHref} className="text-xs text-blue-600 dark:text-blue-400 hover:underline">
            {tr.allVerbs} →
          </Link>
        </div>
        <div className="flex flex-wrap gap-2">
          {(caVerbs.length > 0 ? caVerbs.map((v) => v.slug) : POPULAR_CA).slice(0, 20).map((slugOrStr) => {
            const slug = typeof slugOrStr === "string" ? slugOrStr : slugOrStr;
            return (
              <Link
                key={slug}
                href={caVerbSlugPath(lang, slug)}
                className="px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 text-sm font-medium hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
              >
                {caVerbs.find((v) => v.slug === slug)?.infinitive ?? slug}
              </Link>
            );
          })}
        </div>
      </section>

      {/* English verbs section */}
      <section className="mt-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            {enLabel}
          </h2>
          <Link href={enIndexHref} className="text-xs text-blue-600 dark:text-blue-400 hover:underline">
            {tr.allVerbs} →
          </Link>
        </div>
        <div className="flex flex-wrap gap-2">
          {(enVerbs.length > 0 ? enVerbs.map((v) => v.slug) : POPULAR_EN).slice(0, 20).map((slugOrStr) => {
            const slug = typeof slugOrStr === "string" ? slugOrStr : slugOrStr;
            return (
              <Link
                key={slug}
                href={enVerbSlugPath(lang, slug)}
                className="px-3 py-1.5 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300 text-sm font-medium hover:bg-green-100 dark:hover:bg-green-900/40 transition-colors"
              >
                {enVerbs.find((v) => v.slug === slug)?.infinitive ?? slug}
              </Link>
            );
          })}
        </div>
      </section>

      {/* Feature grid */}
      <section className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {tr.features.map((f) => (
          <div key={f.title} className="rounded-xl border border-gray-200 dark:border-gray-700 p-5">
            <div className="text-2xl mb-2">{f.icon}</div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">{f.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{f.desc}</p>
          </div>
        ))}
      </section>

      {/* About section — keyword-rich SEO text */}
      <section className="mt-12 rounded-xl border border-gray-200 dark:border-gray-700 p-6 bg-gray-50 dark:bg-gray-900/40">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-4">{about.h2}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-3">{about.p1}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{about.p2}</p>
      </section>

      {/* Browse Spanish by group */}
      <section className="mt-10">
        <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
          {tr.exploreByGroup}
        </h2>
        <div className="grid grid-cols-3 gap-3">
          {["ar", "er", "ir"].map((g) => (
            <Link
              key={g}
              href={`/${lang}/verbos/grupo/${g}`}
              className="rounded-xl border border-gray-200 dark:border-gray-700 p-4 text-center hover:border-blue-400 dark:hover:border-blue-500 transition-colors group"
            >
              <span className="block text-2xl font-bold text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                -{g}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 block">
                {tr.groupDesc(g)}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ section — visible + FAQPage schema for rich snippets */}
      <section className="mt-12" aria-label={faqH2}>
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-5">{faqH2}</h2>
        <div className="divide-y divide-gray-200 dark:divide-gray-700 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
          {faqs.map((faq) => (
            <details
              key={faq.q}
              className="group bg-white dark:bg-gray-900 px-5 py-4 open:bg-blue-50 dark:open:bg-blue-900/10"
            >
              <summary className="flex justify-between items-center cursor-pointer list-none text-sm font-semibold text-gray-800 dark:text-gray-200 gap-2">
                <span>{faq.q}</span>
                <span className="shrink-0 text-blue-500 text-lg group-open:rotate-45 transition-transform origin-center">+</span>
              </summary>
              <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}

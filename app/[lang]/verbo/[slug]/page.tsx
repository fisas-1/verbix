import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getVerb, getAllVerbSlugs, getRelatedVerbs, getVerbExamples } from "@/lib/verbs";
import { conjugateVerb, getNonPersonalForms } from "@/lib/conjugate";
import { verbTitle, verbDescription, verbCanonical, SITE_URL } from "@/lib/seo";
import { generateVerbSchema, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/schema";
import ConjugationTable from "@/components/ConjugationTable";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import RelatedVerbs from "@/components/RelatedVerbs";
import ExampleSentences from "@/components/ExampleSentences";
import TenseExplainer from "@/components/TenseExplainer";
import QuizWidget from "@/components/QuizWidget";
import AdUnit from "@/components/AdUnit";

interface PageProps {
  params: Promise<{ lang: string; slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllVerbSlugs("es");
  return slugs.map((s) => ({ lang: "es", slug: s.slug }));
}

export const revalidate = 86400;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  const verb = getVerb(slug, lang);
  if (!verb) return {};
  return {
    title: verbTitle(verb),
    description: verbDescription(verb),
    alternates: {
      canonical: verbCanonical(slug, lang),
      languages: { en: `/en/verb/${slug}`, ca: `/ca/verb/${slug}` },
    },
    openGraph: {
      title: `Conjugar ${verb.infinitive} en español`,
      description: verbDescription(verb),
      type: "website",
    },
  };
}

export default async function VerbPage({ params }: PageProps) {
  const { lang, slug } = await params;
  const verb = getVerb(slug, lang);
  if (!verb) notFound();

  const tenses = conjugateVerb(verb.infinitive, verb.conjugation_group, verb.type, verb.stem_change ?? undefined);
  const nonPersonal = getNonPersonalForms(verb.infinitive, verb.conjugation_group);
  const related = getRelatedVerbs(verb, 8);
  const examples = getVerbExamples(verb.id);
  const presenteForms = tenses
    .find((t) => t.tense === "presente")
    ?.forms.map((f) => `${f.person}: ${f.form}`)
    .join(", ") ?? "";

  const verbSchema = generateVerbSchema(verb);
  const faqSchema = generateFAQSchema(verb, presenteForms);
  const breadcrumbSchema = generateBreadcrumbSchema(verb);

  const typeLabel = verb.type === "irregular" ? "Irregular" : verb.type === "reflexive" ? "Reflexivo" : "Regular";
  const typeColor = verb.type === "irregular"
    ? "bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300"
    : "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300";

  return (
    <>
      {/* JSON-LD Schemas */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(verbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <BreadcrumbNav
        crumbs={[
          { label: "Inicio", href: `/${lang}` },
          { label: "Verbos en español", href: `/${lang}/verbos` },
          { label: `Conjugar ${verb.infinitive}` },
        ]}
      />

      {/* H1 + verb info */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-3">
          Conjugar {verb.infinitive}
        </h1>
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${typeColor}`}>
            {typeLabel}
          </span>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
            -{verb.conjugation_group}
          </span>
          {verb.stem_change && (
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
              {verb.stem_change}
            </span>
          )}
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
          {verb.translation_en && <span>EN: <strong className="text-gray-700 dark:text-gray-300">{verb.translation_en}</strong></span>}
          {verb.translation_ca && <span>CA: <strong className="text-gray-700 dark:text-gray-300">{verb.translation_ca}</strong></span>}
        </div>
      </div>

      {/* AD #1 — Leaderboard below H1 */}
      <div className="flex justify-center my-6">
        <AdUnit slot="1234567890" format="leaderboard" className="ad-leaderboard" />
      </div>

      {/* Non-personal forms */}
      <div className="mb-8 p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
        <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
          Formas no personales
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Infinitivo</p>
            <p className="font-medium text-gray-900 dark:text-gray-100">{verb.infinitive}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Gerundio</p>
            <p className="font-medium text-gray-900 dark:text-gray-100">{nonPersonal.gerundio}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Participio</p>
            <p className="font-medium text-gray-900 dark:text-gray-100">{nonPersonal.participio}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Inf. Compuesto</p>
            <p className="font-medium text-gray-900 dark:text-gray-100">{nonPersonal.infinitivo_compuesto}</p>
          </div>
        </div>
      </div>

      {/* Main conjugation table */}
      <ConjugationTable tenses={tenses} infinitive={verb.infinitive} />

      {/* Tense explainer */}
      <div className="mt-8">
        <TenseExplainer tense="presente" />
      </div>

      {/* Example sentences */}
      <div className="mt-8">
        <ExampleSentences examples={examples} infinitive={verb.infinitive} />
      </div>

      {/* AD #2 — Rectangle in-content (highest CPM) */}
      <div className="flex justify-center my-8">
        <AdUnit slot="0987654321" format="rectangle" className="ad-rectangle" />
      </div>

      {/* Quiz */}
      <QuizWidget tenses={tenses} infinitive={verb.infinitive} />

      {/* SEO text content */}
      <section className="mt-8 prose prose-sm dark:prose-invert max-w-none">
        <h2>Sobre el verbo {verb.infinitive}</h2>
        <p>
          <strong>{verb.infinitive}</strong> es un verbo {verb.type === "irregular" ? "irregular" : "regular"} de la primera conjugación (verbos en -{verb.conjugation_group}) en español.
          {verb.translation_en && ` Su significado en inglés es "${verb.translation_en}".`}
        </p>
        {verb.type === "irregular" && (
          <p>
            Al ser un verbo irregular, algunas de sus formas no siguen los patrones estándar de los verbos regulares terminados en -{verb.conjugation_group}.
            {verb.stem_change && ` Presenta el cambio de raíz ${verb.stem_change} en ciertas personas del presente de indicativo y de subjuntivo.`}
          </p>
        )}
        {verb.type === "regular" && (
          <p>
            Al ser un verbo regular del grupo -{verb.conjugation_group}, sigue las terminaciones estándar para todos los tiempos verbales.
            Una vez que conoces las reglas de los verbos -{verb.conjugation_group}, puedes conjugar <strong>{verb.infinitive}</strong> y todos los verbos regulares del mismo grupo.
          </p>
        )}
        <p>
          Para conjugar <strong>{verb.infinitive}</strong> en presente de indicativo: yo {tenses.find(t => t.tense === "presente")?.forms.find(f => f.person === "yo")?.form},
          tú {tenses.find(t => t.tense === "presente")?.forms.find(f => f.person === "tú")?.form},
          él/ella {tenses.find(t => t.tense === "presente")?.forms.find(f => f.person === "él")?.form}.
        </p>
      </section>

      {/* Related verbs */}
      <div className="mt-8">
        <RelatedVerbs verbs={related} lang={lang} title={`Otros verbos en -${verb.conjugation_group}`} />
      </div>

      {/* AD #3 — Large leaderboard above footer */}
      <div className="flex justify-center mt-10">
        <AdUnit slot="1122334455" format="large-leaderboard" className="ad-large-leaderboard" />
      </div>

      {/* AD #4 — Anchor mobile (sticky bottom) */}
      <AdUnit slot="5544332211" format="anchor" />

      {/* Bottom padding for anchor ad on mobile */}
      <div className="h-16 md:hidden" />
    </>
  );
}

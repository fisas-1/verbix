import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getVerb, getAllVerbSlugs, getRelatedVerbs, getVerbExamples } from "@/lib/verbs";
import { conjugateVerb, getNonPersonalForms } from "@/lib/conjugate";
import { verbTitle, verbDescription, verbCanonical, verbHreflangs } from "@/lib/seo";
import { t } from "@/lib/i18n";
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
  const slugs = await getAllVerbSlugs("es");
  return slugs.map((s) => ({ lang: "es", slug: s.slug }));
}

export const revalidate = 86400;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  const verb = await getVerb(slug, lang);
  if (!verb) return {};
  const hreflangs = verbHreflangs(slug);
  return {
    title: verbTitle(verb, lang),
    description: verbDescription(verb, lang),
    alternates: {
      canonical: verbCanonical(slug, lang),
      languages: hreflangs,
    },
    openGraph: {
      title: verbTitle(verb, lang),
      description: verbDescription(verb, lang),
      type: "website",
    },
  };
}

export default async function VerbPage({ params }: PageProps) {
  const { lang, slug } = await params;
  const verb = await getVerb(slug, lang);
  if (!verb) notFound();

  const tr = t(lang);
  const tenses = conjugateVerb(verb.infinitive, verb.conjugation_group, verb.type, verb.stem_change ?? undefined);
  const nonPersonal = getNonPersonalForms(verb.infinitive, verb.conjugation_group);
  const [related, examples] = await Promise.all([
    getRelatedVerbs(verb, 8),
    getVerbExamples(verb.id),
  ]);
  const presenteForms = tenses
    .find((t) => t.tense === "presente")
    ?.forms.map((f) => `${f.person}: ${f.form}`)
    .join(", ") ?? "";

  const verbSchema = generateVerbSchema(verb);
  const faqSchema = generateFAQSchema(verb, presenteForms);
  const breadcrumbSchema = generateBreadcrumbSchema(verb);

  const typeLabel = verb.type === "irregular" ? tr.typeIrregular : verb.type === "reflexive" ? tr.typeReflexive : tr.typeRegular;
  const typeColor = verb.type === "irregular"
    ? "bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300"
    : "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300";

  const presentTense = tenses.find((t) => t.tense === "presente");
  const yo = presentTense?.forms.find((f) => f.person === "yo")?.form ?? "";
  const tu = presentTense?.forms.find((f) => f.person === "tú")?.form ?? "";
  const el = presentTense?.forms.find((f) => f.person === "él")?.form ?? "";

  return (
    <>
      {/* JSON-LD Schemas */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(verbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <BreadcrumbNav
        crumbs={[
          { label: tr.home, href: `/${lang}` },
          { label: tr.verbsNav, href: `/${lang}/verbos` },
          { label: `${tr.conjugate} ${verb.infinitive}` },
        ]}
      />

      {/* H1 + verb info */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-3">
          {tr.conjugate} {verb.infinitive}
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
          {tr.nonPersonalForms}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
          <div>
            <p className="text-xs text-gray-400 mb-0.5">{tr.infinitivo}</p>
            <p className="font-medium text-gray-900 dark:text-gray-100">{verb.infinitive}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-0.5">{tr.gerundio}</p>
            <p className="font-medium text-gray-900 dark:text-gray-100">{nonPersonal.gerundio}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-0.5">{tr.participio}</p>
            <p className="font-medium text-gray-900 dark:text-gray-100">{nonPersonal.participio}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-0.5">{tr.infCompuesto}</p>
            <p className="font-medium text-gray-900 dark:text-gray-100">{nonPersonal.infinitivo_compuesto}</p>
          </div>
        </div>
      </div>

      {/* Main conjugation table */}
      <ConjugationTable tenses={tenses} infinitive={verb.infinitive} lang={lang} />

      {/* Tense explainer (ES only — prose is in Spanish) */}
      <div className="mt-8">
        <TenseExplainer tense="presente" />
      </div>

      {/* Example sentences */}
      <div className="mt-8">
        <ExampleSentences examples={examples} infinitive={verb.infinitive} lang={lang} />
      </div>

      {/* AD #2 — Rectangle in-content (highest CPM) */}
      <div className="flex justify-center my-8">
        <AdUnit slot="0987654321" format="rectangle" className="ad-rectangle" />
      </div>

      {/* Quiz */}
      <QuizWidget tenses={tenses} infinitive={verb.infinitive} lang={lang} />

      {/* Related verbs */}
      <div className="mt-8">
        <RelatedVerbs verbs={related} lang={lang} title={tr.relatedVerbsTitle(verb.conjugation_group)} />
      </div>

      {/* AD #4 visible — Rectangle before SEO text (slot-rectangle-2) */}
      <div className="flex justify-center my-8">
        <AdUnit slot="slot-rectangle-2" format="rectangle" className="ad-rectangle" />
      </div>

      {/* SEO text content */}
      <section className="mt-0 prose prose-sm dark:prose-invert max-w-none">
        <h2>{tr.aboutVerb(verb.infinitive)}</h2>
        <p>{tr.seoVerbType(verb.infinitive, verb.type, verb.conjugation_group, verb.translation_en)}</p>
        {verb.type === "irregular" && (
          <p>{tr.seoIrregular(verb.infinitive, verb.stem_change)}</p>
        )}
        {verb.type === "regular" && (
          <p>{tr.seoRegular(verb.infinitive, verb.conjugation_group)}</p>
        )}
        <p>{tr.seoPresent(verb.infinitive, yo, tu, el)}</p>
      </section>

      {/* AD #3 — Large leaderboard above footer */}
      <div className="flex justify-center mt-10">
        <AdUnit slot="1122334455" format="large-leaderboard" className="ad-large-leaderboard" />
      </div>

      {/* Anchor mobile sticky (no compta com a visible) */}
      <AdUnit slot="5544332211" format="anchor" />

      {/* Bottom padding for anchor ad on mobile */}
      <div className="h-16 md:hidden" />
    </>
  );
}

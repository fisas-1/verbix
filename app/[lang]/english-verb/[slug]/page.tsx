import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getVerb, getAllVerbSlugs } from "@/lib/verbs";
import { conjugateEnVerb, getEnNonPersonalForms } from "@/lib/conjugate-en";
import { enVerbTitle, enVerbDescription, enVerbCanonical, enVerbHreflangs } from "@/lib/seo";
import { t, enVerbMeta } from "@/lib/i18n";
import ConjugationTable from "@/components/ConjugationTable";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import QuizWidget from "@/components/QuizWidget";
import AdUnit from "@/components/AdUnit";

interface PageProps {
  params: Promise<{ lang: string; slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllVerbSlugs("en");
  return slugs.map((s) => ({ lang: "en", slug: s.slug }));
}

export const revalidate = 86400;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  if (lang !== "en") return {};
  const verb = await getVerb(slug, "en");
  if (!verb) return {};
  return {
    title: enVerbTitle(verb, lang),
    description: enVerbDescription(verb, lang),
    alternates: {
      canonical: enVerbCanonical(slug, lang),
      languages: enVerbHreflangs(slug),
    },
    openGraph: { title: enVerbTitle(verb, lang), description: enVerbDescription(verb, lang), type: "website" },
  };
}

export default async function EnglishVerbPageEn({ params }: PageProps) {
  const { lang, slug } = await params;
  if (lang !== "en") notFound();

  const verb = await getVerb(slug, "en");
  if (!verb) notFound();

  const tr = t(lang);
  const meta = enVerbMeta.en;
  const tenses = conjugateEnVerb(verb.infinitive);
  const nonPersonal = getEnNonPersonalForms(verb.infinitive);
  const typeLabel = verb.type === "irregular" ? tr.typeIrregular : tr.typeRegular;
  const typeColor = verb.type === "irregular"
    ? "bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300"
    : "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300";

  return (
    <>
      <BreadcrumbNav crumbs={[
        { label: tr.home, href: `/${lang}` },
        { label: meta.indexTitle, href: `/en/english-verbs` },
        { label: `${tr.conjugate} ${verb.infinitive}` },
      ]} />

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-3">
          Conjugate {verb.infinitive} <span className="text-blue-600 dark:text-blue-400">{meta.heading}</span>
        </h1>
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${typeColor}`}>{typeLabel}</span>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">English</span>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
          {verb.translation_es && <span>ES: <strong className="text-gray-700 dark:text-gray-300">{verb.translation_es}</strong></span>}
          {verb.translation_ca && <span>CA: <strong className="text-gray-700 dark:text-gray-300">{verb.translation_ca}</strong></span>}
        </div>
      </div>

      <div className="flex justify-center my-6">
        <AdUnit slot="1234567890" format="leaderboard" className="ad-leaderboard" />
      </div>

      <div className="mb-8 p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
        <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
          {tr.nonPersonalForms}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
          <div>
            <p className="text-xs text-gray-400 mb-0.5">{tr.infinitivo}</p>
            <p className="font-medium text-gray-900 dark:text-gray-100">to {verb.infinitive}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-0.5">{tr.gerundio}</p>
            <p className="font-medium text-gray-900 dark:text-gray-100">{nonPersonal.gerundio}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-0.5">{tr.participio}</p>
            <p className="font-medium text-gray-900 dark:text-gray-100">{nonPersonal.participio}</p>
          </div>
        </div>
      </div>

      <ConjugationTable tenses={tenses} infinitive={verb.infinitive} lang={lang} />

      <div className="flex justify-center my-8">
        <AdUnit slot="0987654321" format="rectangle" className="ad-rectangle" />
      </div>

      <QuizWidget tenses={tenses} infinitive={verb.infinitive} lang={lang} />

      <div className="flex justify-center my-8">
        <AdUnit slot="slot-rectangle-2" format="rectangle" className="ad-rectangle" />
      </div>

      <section className="mt-0 prose prose-sm dark:prose-invert max-w-none">
        <h2>{tr.aboutVerb(verb.infinitive)}</h2>
        <p>
          {verb.infinitive} is a {verb.type} English verb.
          {verb.translation_es ? ` Its Spanish equivalent is "${verb.translation_es}".` : ""}
          {verb.translation_ca ? ` In Catalan: "${verb.translation_ca}".` : ""}
        </p>
      </section>

      <div className="flex justify-center mt-10">
        <AdUnit slot="1122334455" format="large-leaderboard" className="ad-large-leaderboard" />
      </div>
      <AdUnit slot="5544332211" format="anchor" />
      <div className="h-16 md:hidden" />
    </>
  );
}

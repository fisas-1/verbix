import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import AdUnit from "@/components/AdUnit";
import { SITE_URL, SITE_NAME } from "@/lib/seo";
import { getVerb } from "@/lib/verbs";
import { conjugateVerb, getNonPersonalForms } from "@/lib/conjugate";
import { COMPARISON_PAIRS, DIFFERENCES } from "@/app/[lang]/comparar/[verb1]/[verb2]/page";

interface PageProps {
  params: Promise<{ lang: string; verb1: string; verb2: string }>;
}

const TENSES_TO_SHOW = ["presente", "preterito_indefinido", "preterito_imperfecto", "futuro_simple", "condicional_simple", "subjuntivo_presente"];
const TENSE_LABELS: Record<string, string> = {
  presente: "Present tense",
  preterito_indefinido: "Preterite (past)",
  preterito_imperfecto: "Imperfect",
  futuro_simple: "Future",
  condicional_simple: "Conditional",
  subjuntivo_presente: "Present subjunctive",
};
const PERSONS_EN = ["I (yo)", "you (tú)", "he/she", "we", "you all", "they"];

export async function generateStaticParams() {
  return COMPARISON_PAIRS.map(([v1, v2]) => ({ lang: "en", verb1: v1, verb2: v2 }));
}
export const revalidate = 86400;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, verb1, verb2 } = await params;
  if (lang !== "en") return {};
  const [v1, v2] = await Promise.all([getVerb(verb1, "es"), getVerb(verb2, "es")]);
  if (!v1 || !v2) return {};
  const canonical = `${SITE_URL}/en/compare/${verb1}/${verb2}`;
  const title = `Difference between ${v1.infinitive} and ${v2.infinitive} in Spanish | Full conjugation`;
  const description = `Learn the difference between the Spanish verbs ${v1.infinitive} and ${v2.infinitive}. Complete conjugation of both verbs with examples and clear explanation for English speakers.`;
  return {
    title: `${title} | ${SITE_NAME}`,
    description,
    alternates: { canonical },
    openGraph: { title: `${title} | ${SITE_NAME}`, description, url: canonical, siteName: SITE_NAME, locale: "en_US" },
  };
}

export default async function ComparePage({ params }: PageProps) {
  const { lang, verb1: v1Slug, verb2: v2Slug } = await params;
  if (lang !== "en") notFound();

  const [v1, v2] = await Promise.all([getVerb(v1Slug, "es"), getVerb(v2Slug, "es")]);
  if (!v1 || !v2) notFound();

  const tenses1 = conjugateVerb(v1.infinitive, v1.conjugation_group, v1.type, v1.stem_change ?? undefined);
  const tenses2 = conjugateVerb(v2.infinitive, v2.conjugation_group, v2.type, v2.stem_change ?? undefined);
  const np1 = getNonPersonalForms(v1.infinitive, v1.conjugation_group);
  const np2 = getNonPersonalForms(v2.infinitive, v2.conjugation_group);

  const diffKey = `${v1.infinitive}-${v2.infinitive}`;
  const diff = DIFFERENCES[diffKey] ?? DIFFERENCES[`${v2.infinitive}-${v1.infinitive}`];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: `What is the difference between ${v1.infinitive} and ${v2.infinitive} in Spanish?`, acceptedAnswer: { "@type": "Answer", text: diff?.es ?? `${v1.infinitive} and ${v2.infinitive} have different meanings and uses in Spanish.` } },
      { "@type": "Question", name: `How do you conjugate ${v1.infinitive} in the present tense?`, acceptedAnswer: { "@type": "Answer", text: tenses1.find(t => t.tense === "presente")?.forms.map(f => `${f.person}: ${f.form}`).join(", ") ?? "" } },
      { "@type": "Question", name: `How do you conjugate ${v2.infinitive} in the present tense?`, acceptedAnswer: { "@type": "Answer", text: tenses2.find(t => t.tense === "presente")?.forms.map(f => `${f.person}: ${f.form}`).join(", ") ?? "" } },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BreadcrumbNav crumbs={[
        { label: "Home", href: "/en" },
        { label: "Spanish verbs", href: "/en/verbos" },
        { label: `${v1.infinitive} vs ${v2.infinitive}` },
      ]} />

      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-2">
        <span className="text-green-600 dark:text-green-400">{v1.infinitive}</span>{" "}vs{" "}
        <span className="text-blue-600 dark:text-blue-400">{v2.infinitive}</span>{" "}in Spanish
      </h1>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">Full conjugation and explanation of the difference</p>

      {diff && (
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-lg p-4 mb-6">
          <h2 className="font-semibold text-amber-900 dark:text-amber-200 mb-2">What is the difference?</h2>
          <p className="text-sm text-amber-800 dark:text-amber-300 mb-2">{diff.es}</p>
          <p className="text-sm text-amber-700 dark:text-amber-400 italic">💡 {diff.tip}</p>
        </div>
      )}

      <AdUnit slot="1234567890" format="leaderboard" className="ad-leaderboard" />

      <div className="grid grid-cols-2 gap-4 mb-6">
        {[{ verb: v1, np: np1 }, { verb: v2, np: np2 }].map(({ verb, np }, i) => (
          <div key={verb.slug} className={`p-3 rounded-lg border ${i === 0 ? "border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20" : "border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20"}`}>
            <Link href={`/en/verb/${verb.slug}`} className={`font-bold text-lg ${i === 0 ? "text-green-700 dark:text-green-400" : "text-blue-700 dark:text-blue-400"} hover:underline`}>{verb.infinitive}</Link>
            <div className="text-xs text-gray-500 mt-1 space-y-0.5">
              <p>Gerund: <strong>{np.gerundio}</strong></p>
              <p>Past participle: <strong>{np.participio}</strong></p>
              {verb.translation_en && <p>Meaning: {verb.translation_en}</p>}
            </div>
          </div>
        ))}
      </div>

      {TENSES_TO_SHOW.map((tenseKey) => {
        const t1 = tenses1.find(t => t.tense === tenseKey);
        const t2 = tenses2.find(t => t.tense === tenseKey);
        if (!t1 || !t2) return null;
        return (
          <div key={tenseKey} className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">{TENSE_LABELS[tenseKey] ?? tenseKey}</h2>
            <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-3 py-2 text-left text-gray-500 w-28">Person</th>
                    <th className="px-3 py-2 text-center text-green-700 dark:text-green-400 font-semibold">{v1.infinitive}</th>
                    <th className="px-3 py-2 text-center text-blue-700 dark:text-blue-400 font-semibold">{v2.infinitive}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {PERSONS_EN.map((person, idx) => {
                    const f1 = t1.forms[idx];
                    const f2 = t2.forms[idx];
                    return (
                      <tr key={person} className="hover:bg-gray-50 dark:hover:bg-gray-800/40">
                        <td className="px-3 py-1.5 text-gray-500 text-xs">{person}</td>
                        <td className={`px-3 py-1.5 text-center font-medium ${f1?.is_irregular ? "text-amber-700 dark:text-amber-400" : "text-green-800 dark:text-green-300"}`}>{f1?.form ?? "—"}</td>
                        <td className={`px-3 py-1.5 text-center font-medium ${f2?.is_irregular ? "text-amber-700 dark:text-amber-400" : "text-blue-800 dark:text-blue-300"}`}>{f2?.form ?? "—"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}

      <AdUnit slot="0987654321" format="rectangle" className="ad-rectangle" />

      <div className="flex gap-4 my-6 flex-wrap">
        <Link href={`/en/verb/${v1.slug}`} className="flex-1 min-w-[140px] text-center py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium text-sm">Full conjugation of {v1.infinitive} →</Link>
        <Link href={`/en/verb/${v2.slug}`} className="flex-1 min-w-[140px] text-center py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm">Full conjugation of {v2.infinitive} →</Link>
      </div>

      <section className="mt-6">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">Other common comparisons</h2>
        <div className="flex flex-wrap gap-2">
          {COMPARISON_PAIRS.filter(([a, b]) => !(a === v1Slug && b === v2Slug)).slice(0, 12).map(([a, b]) => (
            <Link key={`${a}-${b}`} href={`/en/compare/${a}/${b}`} className="px-3 py-1 text-sm rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-green-100 dark:hover:bg-green-900/40 hover:text-green-700 transition-colors">{a} vs {b}</Link>
          ))}
        </div>
      </section>

      <AdUnit slot="1122334455" format="large-leaderboard" className="ad-large-leaderboard" />
    </>
  );
}

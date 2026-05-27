import type { Metadata } from "next";
import Link from "next/link";
import { getVerbsByLetter } from "@/lib/verbs";
import { SITE_NAME } from "@/lib/seo";
import { t, verbSlugPath, dbLang } from "@/lib/i18n";

interface PageProps {
  params: Promise<{ lang: string; letter: string }>;
}

export async function generateStaticParams() {
  const letters = "abcdefghijklmnopqrstuvwxyz".split("");
  return ["es", "ca", "en"].flatMap((lang) =>
    letters.map((letter) => ({ lang, letter }))
  );
}

export const revalidate = 86400;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, letter } = await params;
  const tr = t(lang);
  return {
    title: `${tr.letraPageTitle(letter)} | ${SITE_NAME}`,
    description: tr.letraPageDesc(0, letter),
    alternates: { canonical: `/${lang}/verbos/letra/${letter}` },
  };
}

export default async function LetraPage({ params }: PageProps) {
  const { lang, letter } = await params;
  const tr = t(lang);
  const verbs = await getVerbsByLetter(letter, dbLang(lang));

  return (
    <>
      <div className="mb-8">
        <nav className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          <Link href={`/${lang}`} className="hover:text-blue-600">{tr.home}</Link>
          {" / "}
          <Link href={`/${lang}/verbos`} className="hover:text-blue-600">{tr.verbsNav}</Link>
          {" / "}
          <span className="text-gray-700 dark:text-gray-300">{tr.letraNavLabel(letter)}</span>
        </nav>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-2">
          {tr.letraPageTitle(letter)}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          {tr.verbsFound(verbs.length)}
        </p>
      </div>

      {verbs.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">{tr.letraEmpty}</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {verbs.map((verb) => (
            <Link
              key={verb.slug}
              href={verbSlugPath(lang, verb.slug)}
              className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300 hover:border-blue-400 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors"
            >
              {verb.infinitive}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}

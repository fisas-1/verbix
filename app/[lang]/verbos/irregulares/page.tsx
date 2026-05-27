import type { Metadata } from "next";
import Link from "next/link";
import { getVerbsByType } from "@/lib/verbs";
import { SITE_NAME } from "@/lib/seo";
import { t, verbSlugPath, dbLang } from "@/lib/i18n";

export async function generateStaticParams() {
  return [{ lang: "es" }, { lang: "ca" }, { lang: "en" }];
}

export const revalidate = 86400;

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const tr = t(lang);
  const verbs = await getVerbsByType("irregular", dbLang(lang));
  return {
    title: `${tr.irregularesPageTitle} | ${SITE_NAME}`,
    description: tr.irregularesPageDesc(verbs.length),
    alternates: { canonical: `/${lang}/verbos/irregulares` },
  };
}

export default async function IrregularesPage({ params }: PageProps) {
  const { lang } = await params;
  const tr = t(lang);
  const verbs = await getVerbsByType("irregular", dbLang(lang));

  return (
    <>
      <div className="mb-8">
        <nav className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          <Link href={`/${lang}`} className="hover:text-blue-600">{tr.home}</Link>
          {" / "}
          <Link href={`/${lang}/verbos`} className="hover:text-blue-600">{tr.verbsNav}</Link>
          {" / "}
          <span className="text-gray-700 dark:text-gray-300">{tr.irregular}</span>
        </nav>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-2">
          {tr.irregularesPageTitle}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          {tr.irregularesPageDesc(verbs.length)} {tr.irregularesSubtitle}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {verbs.map((verb) => (
          <Link
            key={verb.slug}
            href={verbSlugPath(lang, verb.slug)}
            className="group flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors"
          >
            <span className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 text-sm">
              {verb.infinitive}
            </span>
            {verb.stem_change && (
              <span className="text-xs text-blue-500 dark:text-blue-400 font-mono">{verb.stem_change}</span>
            )}
          </Link>
        ))}
      </div>
    </>
  );
}

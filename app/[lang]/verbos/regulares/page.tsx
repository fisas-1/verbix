import type { Metadata } from "next";
import Link from "next/link";
import { getVerbsByType } from "@/lib/verbs";
import { SITE_NAME, SITE_URL } from "@/lib/seo";
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
  const verbs = await getVerbsByType("regular", dbLang(lang));
  return {
    title: `${tr.regularesPageTitle} | ${SITE_NAME}`,
    description: tr.regularesPageDesc(verbs.length),
    alternates: { canonical: `${SITE_URL}/${lang}/verbos/regulares` },
  };
}

export default async function RegularesPage({ params }: PageProps) {
  const { lang } = await params;
  const tr = t(lang);
  const verbs = await getVerbsByType("regular", dbLang(lang));

  return (
    <>
      <div className="mb-8">
        <nav className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          <Link href={`/${lang}`} className="hover:text-blue-600">{tr.home}</Link>
          {" / "}
          <Link href={`/${lang}/verbos`} className="hover:text-blue-600">{tr.verbsNav}</Link>
          {" / "}
          <span className="text-gray-700 dark:text-gray-300">{tr.regular}</span>
        </nav>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-2">
          {tr.regularesPageTitle}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          {tr.regularesPageDesc(verbs.length)} {tr.regularesSubtitle}
        </p>
      </div>
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
    </>
  );
}

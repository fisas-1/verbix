import type { Metadata } from "next";
import Link from "next/link";
import { getVerbsByGroup } from "@/lib/verbs";
import { SITE_NAME, SITE_URL } from "@/lib/seo";
import { t, verbSlugPath, dbLang } from "@/lib/i18n";

interface PageProps {
  params: Promise<{ lang: string; group: string }>;
}

export async function generateStaticParams() {
  return ["es", "ca", "en"].flatMap((lang) =>
    ["ar", "er", "ir"].map((group) => ({ lang, group }))
  );
}

export const revalidate = 86400;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, group } = await params;
  const tr = t(lang);
  return {
    title: `${tr.grupoPageTitle(group)} | ${SITE_NAME}`,
    description: tr.grupoPageDesc(0, group),
    alternates: { canonical: `${SITE_URL}/${lang}/verbos/grupo/${group}` },
  };
}

export default async function GrupoPage({ params }: PageProps) {
  const { lang, group } = await params;
  const tr = t(lang);
  const verbs = await getVerbsByGroup(group, dbLang(lang));

  return (
    <>
      <div className="mb-8">
        <nav className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          <Link href={`/${lang}`} className="hover:text-blue-600">{tr.home}</Link>
          {" / "}
          <Link href={`/${lang}/verbos`} className="hover:text-blue-600">{tr.verbsNav}</Link>
          {" / "}
          <span className="text-gray-700 dark:text-gray-300">{tr.grupoNavLabel(group)}</span>
        </nav>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-2">
          {tr.grupoPageTitle(group)}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          {tr.grupoPageDesc(verbs.length, group)}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {verbs.map((verb) => (
          <Link
            key={verb.slug}
            href={verbSlugPath(lang, verb.slug)}
            className="group flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-sm hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors"
          >
            <span className="text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
              {verb.infinitive}
            </span>
            {verb.type === "irregular" && (
              <span className="text-xs text-amber-500 dark:text-amber-400">irr</span>
            )}
          </Link>
        ))}
      </div>
    </>
  );
}

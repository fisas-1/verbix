import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllVerbSlugs, getVerb, getTotalVerbCount } from "@/lib/verbs";
import { t, caVerbMeta, caVerbSlugPath } from "@/lib/i18n";
import { SITE_URL, SITE_NAME } from "@/lib/seo";

export async function generateStaticParams() {
  return [{ lang: "en" }];
}

export const revalidate = 86400;

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  if (lang !== "en") return {};
  const meta = caVerbMeta.en;
  const count = await getTotalVerbCount("ca");
  return {
    title: `${meta.indexTitle} | ${SITE_NAME}`,
    description: meta.indexDesc(count),
    alternates: {
      canonical: `${SITE_URL}/en/catalan-verbs`,
      languages: {
        es: `${SITE_URL}/es/verbos-catalanes`,
        ca: `${SITE_URL}/ca/verbs-catalans`,
        en: `${SITE_URL}/en/catalan-verbs`,
      },
    },
  };
}

export default async function CatalanVerbsEn({ params }: PageProps) {
  const { lang } = await params;
  if (lang !== "en") notFound();

  const tr = t(lang);
  const meta = caVerbMeta.en;
  const slugs = await getAllVerbSlugs("ca");

  const verbs = await Promise.all(
    slugs.slice(0, 200).map((s) => getVerb(s.slug, "ca"))
  );
  const validVerbs = verbs.filter(Boolean);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-2">{meta.indexTitle}</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-6">{meta.indexDesc(slugs.length)}</p>

      <div className="flex flex-wrap gap-2">
        {validVerbs.map((verb) => verb && (
          <Link
            key={verb.slug}
            href={caVerbSlugPath(lang, verb.slug)}
            className="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm font-medium hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            {verb.infinitive}
          </Link>
        ))}
      </div>

      <div className="mt-8 text-sm text-gray-400 dark:text-gray-500">
        {tr.verbsFound(slugs.length)}
      </div>
    </div>
  );
}

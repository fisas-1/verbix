import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllVerbSlugs, getVerb, getTotalVerbCount } from "@/lib/verbs";
import { t, enVerbMeta, enVerbSlugPath } from "@/lib/i18n";
import { SITE_URL, SITE_NAME } from "@/lib/seo";

export async function generateStaticParams() {
  return [{ lang: "ca" }];
}

export const revalidate = 86400;

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  if (lang !== "ca") return {};
  const meta = enVerbMeta.ca;
  const count = await getTotalVerbCount("en");
  return {
    title: `${meta.indexTitle} | ${SITE_NAME}`,
    description: meta.indexDesc(count),
    alternates: {
      canonical: `${SITE_URL}/ca/verbs-anglesos`,
      languages: {
        es: `${SITE_URL}/es/verbos-ingleses`,
        ca: `${SITE_URL}/ca/verbs-anglesos`,
        en: `${SITE_URL}/en/english-verbs`,
      },
    },
  };
}

export default async function VerbsAnglesosCa({ params }: PageProps) {
  const { lang } = await params;
  if (lang !== "ca") notFound();

  const tr = t(lang);
  const meta = enVerbMeta.ca;
  const slugs = await getAllVerbSlugs("en");

  const verbs = await Promise.all(
    slugs.slice(0, 200).map((s) => getVerb(s.slug, "en"))
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
            href={enVerbSlugPath(lang, verb.slug)}
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

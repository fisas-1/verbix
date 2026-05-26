import type { Metadata } from "next";
import Link from "next/link";
import { getVerbsByType } from "@/lib/verbs";
import { SITE_NAME } from "@/lib/seo";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: `Verbos irregulares en español | ${SITE_NAME}`,
    description: "Lista completa de verbos irregulares en español con su conjugación completa. Aprende los patrones de irregularidad.",
    alternates: { canonical: `/${lang}/verbos/irregulares` },
  };
}

export default async function IrregularesPage({ params }: PageProps) {
  const { lang } = await params;
  const verbs = getVerbsByType("irregular", lang);

  return (
    <>
      <div className="mb-8">
        <nav className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          <Link href={`/${lang}`} className="hover:text-blue-600">Inicio</Link>
          {" / "}
          <Link href={`/${lang}/verbos`} className="hover:text-blue-600">Verbos</Link>
          {" / "}
          <span className="text-gray-700 dark:text-gray-300">Irregulares</span>
        </nav>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-2">
          Verbos irregulares en español
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          {verbs.length} verbos irregulares. Las formas irregulares no siguen los patrones de conjugación estándar.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {verbs.map((verb) => (
          <Link
            key={verb.slug}
            href={`/${lang}/verbo/${verb.slug}`}
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

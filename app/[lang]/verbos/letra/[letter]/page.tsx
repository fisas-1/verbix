import type { Metadata } from "next";
import Link from "next/link";
import { getVerbsByLetter } from "@/lib/verbs";
import { SITE_NAME } from "@/lib/seo";

interface PageProps {
  params: Promise<{ lang: string; letter: string }>;
}

export async function generateStaticParams() {
  const letters = "abcdefghijklmnopqrstuvwxyz".split("");
  return letters.map((l) => ({ lang: "es", letter: l }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, letter } = await params;
  return {
    title: `Verbos con ${letter.toUpperCase()} | ${SITE_NAME}`,
    description: `Lista de verbos en español que empiezan por ${letter.toUpperCase()}.`,
    alternates: { canonical: `/${lang}/verbos/letra/${letter}` },
  };
}

export default async function LetraPage({ params }: PageProps) {
  const { lang, letter } = await params;
  const verbs = await getVerbsByLetter(letter, lang);

  return (
    <>
      <div className="mb-8">
        <nav className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          <Link href={`/${lang}`} className="hover:text-blue-600">Inicio</Link>
          {" / "}
          <Link href={`/${lang}/verbos`} className="hover:text-blue-600">Verbos</Link>
          {" / "}
          <span className="text-gray-700 dark:text-gray-300">Letra {letter.toUpperCase()}</span>
        </nav>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-2">
          Verbos que empiezan por {letter.toUpperCase()}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          {verbs.length} verbos encontrados.
        </p>
      </div>

      {verbs.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No hay verbos disponibles para esta letra todavía.</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {verbs.map((verb) => (
            <Link
              key={verb.slug}
              href={`/${lang}/verbo/${verb.slug}`}
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

import type { Metadata } from "next";
import Link from "next/link";
import { getDb } from "@/lib/db";
import type { Verb } from "@/lib/verbs";
import { SITE_NAME } from "@/lib/seo";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: `Todos los verbos en español A-Z | ${SITE_NAME}`,
    description: "Lista completa de verbos en español ordenados alfabéticamente. Haz clic en cualquier verbo para ver su conjugación completa.",
    alternates: { canonical: `/${lang}/verbos` },
  };
}

const ALPHABET = "abcdefghijklmnopqrstuvwxyz".split("");

export default async function VerbosPage({ params }: PageProps) {
  const { lang } = await params;
  const db = getDb();
  const result = await db.execute({
    sql: "SELECT * FROM verbs WHERE lang = ? ORDER BY infinitive ASC",
    args: [lang],
  });
  const verbs = result.rows as unknown as Verb[];

  const grouped: Record<string, Verb[]> = {};
  for (const verb of verbs) {
    const letter = verb.infinitive[0].toLowerCase();
    if (!grouped[letter]) grouped[letter] = [];
    grouped[letter].push(verb);
  }

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-2">
          Verbos en español de la A a la Z
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          {verbs.length} verbos disponibles. Haz clic en cualquier verbo para ver su conjugación completa.
        </p>
      </div>

      {/* Alphabet nav */}
      <nav className="flex flex-wrap gap-1 mb-8" aria-label="Índice alfabético">
        {ALPHABET.map((letter) => (
          <a
            key={letter}
            href={`#letra-${letter}`}
            className={`w-8 h-8 flex items-center justify-center rounded text-sm font-medium transition-colors ${
              grouped[letter]
                ? "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400"
                : "text-gray-300 dark:text-gray-600 cursor-default"
            }`}
          >
            {letter.toUpperCase()}
          </a>
        ))}
      </nav>

      {/* Verbs by letter */}
      <div className="space-y-8">
        {ALPHABET.filter((l) => grouped[l]).map((letter) => (
          <section key={letter} id={`letra-${letter}`}>
            <h2 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300">
                {letter.toUpperCase()}
              </span>
            </h2>
            <div className="flex flex-wrap gap-2">
              {grouped[letter].map((verb) => (
                <Link
                  key={verb.slug}
                  href={`/${lang}/verbo/${verb.slug}`}
                  className="text-sm px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-blue-400 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors"
                >
                  {verb.infinitive}
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}

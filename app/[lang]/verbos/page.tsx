import type { Metadata } from "next";
import Link from "next/link";
import { getDb } from "@/lib/db";
import type { Verb } from "@/lib/verbs";
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
  const dl = dbLang(lang);
  const db = getDb();
  const countResult = await db.execute({
    sql: "SELECT COUNT(*) as count FROM verbs WHERE lang = ?",
    args: [dl],
  });
  const count = (countResult.rows[0] as unknown as { count: number }).count;
  return {
    title: `${tr.verbosPageTitle} | ${SITE_NAME}`,
    description: tr.verbosPageDesc(count),
    alternates: { canonical: `${SITE_URL}/${lang}/verbos` },
  };
}

const ALPHABET = "abcdefghijklmnopqrstuvwxyz".split("");

export default async function VerbosPage({ params }: PageProps) {
  const { lang } = await params;
  const tr = t(lang);
  const dl = dbLang(lang);
  const db = getDb();
  const result = await db.execute({
    sql: "SELECT * FROM verbs WHERE lang = ? ORDER BY infinitive ASC",
    args: [dl],
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
          {tr.verbosPageTitle}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          {tr.verbosPageDesc(verbs.length)}
        </p>
      </div>

      {/* Alphabet nav */}
      <nav className="flex flex-wrap gap-1 mb-8" aria-label={tr.alphabetNavLabel}>
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
                  href={verbSlugPath(lang, verb.slug)}
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

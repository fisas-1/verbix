import type { Metadata } from "next";
import Link from "next/link";
import VerbSearch from "@/components/VerbSearch";
import { getAllVerbsForSearch, getTotalVerbCount } from "@/lib/verbs";
import { indexTitle, indexDescription, SITE_NAME } from "@/lib/seo";
import { generateWebSiteSchema } from "@/lib/schema";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: indexTitle(lang),
    description: indexDescription(),
    alternates: { canonical: `/${lang}` },
  };
}

const POPULAR_VERBS = [
  "hablar", "ser", "estar", "tener", "hacer", "poder", "decir", "ir",
  "ver", "dar", "saber", "querer", "volver", "pedir", "dormir",
];

export default async function HomePage({ params }: PageProps) {
  const { lang } = await params;
  const [verbs, total] = await Promise.all([
    getAllVerbsForSearch(lang),
    getTotalVerbCount(lang),
  ]);
  const schema = generateWebSiteSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Hero */}
      <section className="text-center py-12 px-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-3">
          Conjugador de verbos en español
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 mb-8 max-w-lg mx-auto">
          Conjuga al instante cualquiera de los <strong>{total.toLocaleString()}</strong> verbos. Todos los tiempos, todos los modos.
        </p>
        <VerbSearch lang={lang} initialVerbs={verbs} placeholder="Escribe un verbo, ej: hablar..." />
      </section>

      {/* Popular verbs */}
      <section className="mt-8">
        <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
          Verbos más consultados
        </h2>
        <div className="flex flex-wrap gap-2">
          {POPULAR_VERBS.map((slug) => (
            <Link
              key={slug}
              href={`/${lang}/verbo/${slug}`}
              className="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm font-medium hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            >
              {slug}
            </Link>
          ))}
        </div>
      </section>

      {/* Feature grid */}
      <section className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { icon: "⚡", title: "Instantáneo", desc: "Resultados sin espera, sin registro." },
          { icon: "📚", title: "Completo", desc: "Todos los tiempos: indicativo, subjuntivo e imperativo." },
          { icon: "🎯", title: "Ejercicios", desc: "Practica con el quiz interactivo por verbo." },
        ].map((f) => (
          <div key={f.title} className="rounded-xl border border-gray-200 dark:border-gray-700 p-5">
            <div className="text-2xl mb-2">{f.icon}</div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">{f.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{f.desc}</p>
          </div>
        ))}
      </section>

      {/* Browse by group */}
      <section className="mt-10">
        <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
          Explorar por grupo
        </h2>
        <div className="grid grid-cols-3 gap-3">
          {["ar", "er", "ir"].map((g) => (
            <Link
              key={g}
              href={`/${lang}/verbos/grupo/${g}`}
              className="rounded-xl border border-gray-200 dark:border-gray-700 p-4 text-center hover:border-blue-400 dark:hover:border-blue-500 transition-colors group"
            >
              <span className="block text-2xl font-bold text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                -{g}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 block">
                Verbos en -{g}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

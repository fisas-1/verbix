import type { Metadata } from "next";
import Link from "next/link";
import { getDb } from "@/lib/db";
import { SITE_URL, SITE_NAME } from "@/lib/seo";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import AdUnit from "@/components/AdUnit";

export async function generateStaticParams() { return [{ lang: "es" }]; }
export const revalidate = 86400;
interface PageProps { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  if (lang !== "es") return {};
  return {
    title: `Los 100 verbos más usados en español | Verblop`,
    description: `Lista de los 100 verbos españoles más frecuentes ordenados por uso. Incluye rango, tipo (regular/irregular) y enlace a la conjugación completa de cada uno.`,
    alternates: { canonical: `${SITE_URL}/es/verbos/mas-usados` },
  };
}

export default async function MasUsadosPage({ params }: PageProps) {
  const { lang } = await params;
  if (lang !== "es") return null;

  const db = getDb();
  const result = await db.execute({
    sql: `SELECT infinitive, slug, type, conjugation_group, translation_en, frequency_rank
          FROM verbs WHERE lang = 'es' AND frequency_rank IS NOT NULL
          ORDER BY frequency_rank ASC LIMIT 100`,
    args: [],
  });
  type VRow = { infinitive: string; slug: string; type: string; conjugation_group: string; translation_en: string | null; frequency_rank: number };
  const verbs = result.rows as unknown as VRow[];

  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Los 100 verbos más usados en español",
    numberOfItems: verbs.length,
    itemListElement: verbs.map((v, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: v.infinitive,
      url: `${SITE_URL}/es/verbo/${v.slug}`,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <BreadcrumbNav crumbs={[
        { label: "Inicio", href: "/es" },
        { label: "Verbos en español", href: "/es/verbos" },
        { label: "Los 100 más usados" },
      ]} />

      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-2">
        Los 100 verbos más usados en español
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">
        Dominar estos verbos es el primer paso para hablar español con fluidez.
      </p>

      <AdUnit slot="1234567890" format="leaderboard" className="ad-leaderboard" />

      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 mb-8">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-3 py-2 text-left text-gray-500 dark:text-gray-400 w-12">#</th>
              <th className="px-3 py-2 text-left text-gray-600 dark:text-gray-300">Verbo</th>
              <th className="px-3 py-2 text-left text-gray-600 dark:text-gray-300 hidden sm:table-cell">Significado (EN)</th>
              <th className="px-3 py-2 text-center text-gray-600 dark:text-gray-300">Tipo</th>
              <th className="px-3 py-2 text-center text-gray-600 dark:text-gray-300">Grupo</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {verbs.map((v) => (
              <tr key={v.slug} className="hover:bg-gray-50 dark:hover:bg-gray-800/40">
                <td className="px-3 py-2 text-gray-400 dark:text-gray-500 font-mono text-xs">{v.frequency_rank}</td>
                <td className="px-3 py-2">
                  <Link href={`/es/verbo/${v.slug}`} className="font-semibold text-green-600 dark:text-green-400 hover:underline">
                    {v.infinitive}
                  </Link>
                </td>
                <td className="px-3 py-2 text-gray-500 dark:text-gray-400 hidden sm:table-cell text-xs">{v.translation_en ?? "—"}</td>
                <td className="px-3 py-2 text-center">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    v.type === "irregular"
                      ? "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300"
                      : v.type === "reflexive"
                      ? "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
                      : "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                  }`}>
                    {v.type === "irregular" ? "irreg." : v.type === "reflexive" ? "reflex." : "reg."}
                  </span>
                </td>
                <td className="px-3 py-2 text-center text-gray-500 dark:text-gray-400 text-xs font-mono">-{v.conjugation_group}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <section className="prose prose-sm dark:prose-invert max-w-none mb-6">
        <h2>¿Por qué aprender estos 100 verbos?</h2>
        <p>
          Estudios lingüísticos demuestran que con los 100 verbos más frecuentes del español puedes cubrir
          más del <strong>70% de los verbos que aparecen en conversaciones cotidianas</strong>. Son la base
          imprescindible para cualquier nivel de español, desde A1 hasta B2.
        </p>
        <p>
          La lista incluye verbos regulares e irregulares. Los verbos irregulares más comunes (ser, estar, tener,
          hacer, poder, decir, ir, ver, dar) aparecen en los primeros puestos porque son los más usados en el
          idioma, y también los que más esfuerzo requieren para dominar.
        </p>
        <h3>Cómo usar esta lista</h3>
        <p>
          Haz clic en cualquier verbo para ver su conjugación completa con todos los tiempos, ejemplos de uso
          y ejercicios interactivos. Empieza por los 20 primeros y practica hasta que sean automáticos.
        </p>
      </section>

      <AdUnit slot="1122334455" format="large-leaderboard" className="ad-large-leaderboard" />
    </>
  );
}

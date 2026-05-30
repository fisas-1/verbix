import type { Metadata } from "next";
import Link from "next/link";
import { getDb } from "@/lib/db";
import { conjugateVerb } from "@/lib/conjugate";
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
    title: `Verbos con cambio o→ue en español | Verblop`,
    description: `Lista completa de verbos irregulares con cambio de raíz o→ue: poder, volver, dormir, encontrar... Conjugación del presente con ejemplos.`,
    alternates: { canonical: `${SITE_URL}/es/verbos/irregulares/cambio-radical-oue` },
  };
}

export default async function CambioOUEPage({ params }: PageProps) {
  const { lang } = await params;
  if (lang !== "es") return null;

  const db = getDb();
  const result = await db.execute({
    sql: `SELECT * FROM verbs WHERE lang = 'es' AND stem_change = 'o→ue' ORDER BY frequency_rank ASC`,
    args: [],
  });
  type VRow = { infinitive: string; slug: string; conjugation_group: string; type: string; stem_change: string | null };
  const verbs = result.rows as unknown as VRow[];

  return (
    <>
      <BreadcrumbNav crumbs={[
        { label: "Inicio", href: "/es" },
        { label: "Verbos irregulares", href: "/es/verbos/irregulares" },
        { label: "Cambio o→ue" },
      ]} />

      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-3">
        Verbos con cambio de raíz o→ue
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">{verbs.length} verbos encontrados</p>

      <div className="quick-answer bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-lg p-4 mb-6">
        <p className="font-semibold text-amber-900 dark:text-amber-200 mb-2">¿Qué son los verbos con cambio o→ue?</p>
        <p className="text-sm text-amber-800 dark:text-amber-300">
          La vocal <strong>o</strong> de la raíz cambia a <strong>ue</strong> en las formas tónicas del presente.
          Ejemplo: <em>poder → puedo, puedes, puede, podemos, podéis, pueden</em>.
          Las personas nosotros y vosotros mantienen la <strong>o</strong> original.
        </p>
      </div>

      <AdUnit slot="1234567890" format="leaderboard" className="ad-leaderboard" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {verbs.map((verb) => {
          const tenses = conjugateVerb(verb.infinitive, verb.conjugation_group, verb.type, verb.stem_change ?? undefined);
          const presente = tenses.find(t => t.tense === "presente")?.forms ?? [];
          return (
            <div key={verb.slug} className="border border-gray-200 dark:border-gray-700 rounded-lg p-3">
              <Link href={`/es/verbo/${verb.slug}`} className="font-bold text-green-600 dark:text-green-400 hover:underline text-lg">
                {verb.infinitive}
              </Link>
              <span className="ml-2 text-xs text-gray-400">-{verb.conjugation_group}</span>
              <div className="mt-2 grid grid-cols-2 gap-x-2 text-xs">
                {presente.slice(0, 4).map(f => (
                  <span key={String(f.person)} className={f.is_irregular ? "text-amber-700 dark:text-amber-400 font-medium" : "text-gray-600 dark:text-gray-400"}>
                    {f.person}: {f.form}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <section className="prose prose-sm dark:prose-invert max-w-none mb-6">
        <h2>El cambio o→ue en español</h2>
        <p>
          Los verbos con cambio <strong>o→ue</strong> son el segundo grupo más numeroso de verbos irregulares con
          cambio de raíz. Incluye verbos muy frecuentes como <strong>poder</strong>, <strong>volver</strong>,
          <strong>dormir</strong>, <strong>encontrar</strong> y <strong>recordar</strong>.
        </p>
        <p>
          El patrón es idéntico al de e→ie: el cambio solo ocurre cuando la vocal está <em>tónica</em> (acentuada),
          es decir en yo, tú, él/ella y ellos/ellas. Nosotros y vosotros conservan la <strong>o</strong>.
        </p>
        <p>
          Un caso especial es <strong>jugar</strong>, que sigue el mismo patrón pero con <strong>u→ue</strong>
          (juego, juegas, juega, jugamos, jugáis, juegan). También hay que recordar que <strong>dormir</strong> y
          <strong>morir</strong> (verbos -ir) aplican además el cambio <strong>o→u</strong> en el gerundio y
          la tercera persona del indefinido.
        </p>
      </section>

      <div className="flex flex-wrap gap-2 mt-4">
        <Link href="/es/verbos/irregulares/cambio-radical-eie" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">→ Verbos con cambio e→ie</Link>
        <Link href="/es/verbos/irregulares/primera-persona" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">→ Irregulares en 1.ª persona</Link>
        <Link href="/es/verbos/irregulares" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">→ Todos los irregulares</Link>
      </div>

      <AdUnit slot="1122334455" format="large-leaderboard" className="ad-large-leaderboard" />
    </>
  );
}

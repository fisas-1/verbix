import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/seo";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import AdUnit from "@/components/AdUnit";

export async function generateStaticParams() { return [{ lang: "es" }]; }
export const revalidate = 86400;
interface PageProps { params: Promise<{ lang: string }> }

// Verbs irregular only in 1st person singular present (yo form)
const PRIMERA_PERSONA_VERBS = [
  { infinitive: "hacer", slug: "hacer", yo: "hago", group: "er" },
  { infinitive: "poner", slug: "poner", yo: "pongo", group: "er" },
  { infinitive: "tener", slug: "tener", yo: "tengo", group: "er" },
  { infinitive: "venir", slug: "venir", yo: "vengo", group: "ir" },
  { infinitive: "salir", slug: "salir", yo: "salgo", group: "ir" },
  { infinitive: "saber", slug: "saber", yo: "sé", group: "er" },
  { infinitive: "dar", slug: "dar", yo: "doy", group: "ar" },
  { infinitive: "ver", slug: "ver", yo: "veo", group: "er" },
  { infinitive: "oír", slug: "oir", yo: "oigo", group: "ir" },
  { infinitive: "caer", slug: "caer", yo: "caigo", group: "er" },
  { infinitive: "traer", slug: "traer", yo: "traigo", group: "er" },
  { infinitive: "conocer", slug: "conocer", yo: "conozco", group: "er" },
  { infinitive: "parecer", slug: "parecer", yo: "parezco", group: "er" },
  { infinitive: "aparecer", slug: "aparecer", yo: "aparezco", group: "er" },
  { infinitive: "nacer", slug: "nacer", yo: "nazco", group: "er" },
  { infinitive: "crecer", slug: "crecer", yo: "crezco", group: "er" },
  { infinitive: "producir", slug: "producir", yo: "produzco", group: "ir" },
  { infinitive: "conducir", slug: "conducir", yo: "conduzco", group: "ir" },
  { infinitive: "traducir", slug: "traducir", yo: "traduzco", group: "ir" },
  { infinitive: "reducir", slug: "reducir", yo: "reduzco", group: "ir" },
  { infinitive: "proteger", slug: "proteger", yo: "protejo", group: "er" },
  { infinitive: "elegir", slug: "elegir", yo: "elijo", group: "ir" },
  { infinitive: "corregir", slug: "corregir", yo: "corrijo", group: "ir" },
  { infinitive: "dirigir", slug: "dirigir", yo: "dirijo", group: "ir" },
  { infinitive: "valer", slug: "valer", yo: "valgo", group: "er" },
  { infinitive: "caber", slug: "caber", yo: "quepo", group: "er" },
];

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  if (lang !== "es") return {};
  return {
    title: `Verbos irregulares solo en primera persona (yo) | Verblop`,
    description: `Lista de verbos irregulares en español que solo cambian en la primera persona del singular del presente: hago, pongo, tengo, vengo, salgo, sé, doy...`,
    alternates: { canonical: `${SITE_URL}/es/verbos/irregulares/primera-persona` },
  };
}

export default async function PrimeraPersonaPage({ params }: PageProps) {
  const { lang } = await params;
  if (lang !== "es") return null;

  return (
    <>
      <BreadcrumbNav crumbs={[
        { label: "Inicio", href: "/es" },
        { label: "Verbos irregulares", href: "/es/verbos/irregulares" },
        { label: "Irregulares en 1.ª persona" },
      ]} />

      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-3">
        Verbos irregulares solo en primera persona (yo)
      </h1>

      <div className="quick-answer bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-lg p-4 mb-6">
        <p className="font-semibold text-amber-900 dark:text-amber-200 mb-3">
          Verbos que solo cambian en «yo» del presente
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm">
          {PRIMERA_PERSONA_VERBS.slice(0, 12).map(v => (
            <Link key={v.slug} href={`/es/verbo/${v.slug}`} className="flex justify-between px-2 py-1 rounded bg-white dark:bg-gray-800 hover:bg-green-50 dark:hover:bg-green-900/30 transition-colors">
              <span className="text-gray-700 dark:text-gray-300">{v.infinitive}</span>
              <span className="font-bold text-amber-700 dark:text-amber-400 ml-2">{v.yo}</span>
            </Link>
          ))}
        </div>
      </div>

      <AdUnit slot="1234567890" format="leaderboard" className="ad-leaderboard" />

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
          Lista completa — irregulares en «yo»
        </h2>
        <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-300">Infinitivo</th>
                <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-300">Yo (irregular)</th>
                <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-300">Grupo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {PRIMERA_PERSONA_VERBS.map(v => (
                <tr key={v.slug} className="hover:bg-gray-50 dark:hover:bg-gray-800/40">
                  <td className="px-4 py-2">
                    <Link href={`/es/verbo/${v.slug}`} className="font-medium text-green-600 dark:text-green-400 hover:underline">
                      {v.infinitive}
                    </Link>
                  </td>
                  <td className="px-4 py-2 font-bold text-amber-700 dark:text-amber-400">{v.yo}</td>
                  <td className="px-4 py-2 text-gray-500 dark:text-gray-400">-{v.group}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="prose prose-sm dark:prose-invert max-w-none mb-6">
        <h2>¿Por qué solo cambian en «yo»?</h2>
        <p>
          Estos verbos son irregulares exclusivamente en la primera persona del singular (<em>yo</em>) del presente
          de indicativo. El resto de formas del presente son regulares. Hay dos grandes grupos:
        </p>
        <ul>
          <li><strong>Verbos con «-go» en yo</strong>: hacer→hago, poner→pongo, tener→tengo, venir→vengo, salir→salgo, oír→oigo, caer→caigo, traer→traigo, valer→valgo. El subjuntivo derivado también es irregular: haga, ponga, tenga…</li>
          <li><strong>Verbos -cer/-cir</strong>: conocer→conozco, parecer→parezco, nacer→nazco, producir→produzco, conducir→conduzco. Se añade una <em>z</em> antes de la <em>c</em> ante <em>o/a</em>.</li>
        </ul>
        <p>
          La importancia de memorizar estas formas reside en que el subjuntivo presente se forma a partir de
          la primera persona del indicativo: si <em>yo tengo</em>, el subjuntivo es <em>tenga, tengas, tenga…</em>
        </p>
      </section>

      <div className="flex flex-wrap gap-2 mt-4">
        <Link href="/es/verbos/irregulares/cambio-radical-eie" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">→ Cambio e→ie</Link>
        <Link href="/es/verbos/irregulares/cambio-radical-oue" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">→ Cambio o→ue</Link>
        <Link href="/es/verbos/irregulares" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">→ Todos los irregulares</Link>
      </div>

      <AdUnit slot="1122334455" format="large-leaderboard" className="ad-large-leaderboard" />
    </>
  );
}

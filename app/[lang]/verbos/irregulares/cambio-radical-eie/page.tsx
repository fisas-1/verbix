import type { Metadata } from "next";
import Link from "next/link";
import { getDb } from "@/lib/db";
import { conjugateVerb } from "@/lib/conjugate";
import { SITE_URL, SITE_NAME } from "@/lib/seo";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import AdUnit from "@/components/AdUnit";

export async function generateStaticParams() {
  return [{ lang: "es" }];
}
export const revalidate = 86400;

interface PageProps { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  if (lang !== "es") return {};
  const canonical = `${SITE_URL}/es/verbos/irregulares/cambio-radical-eie`;
  return {
    title: `Verbos con cambio e→ie en español | Verblop`,
    description: `Lista completa de verbos irregulares con cambio de raíz e→ie en español: querer, venir, entender, pensar... Conjugación del presente con todos los ejemplos.`,
    alternates: { canonical },
  };
}

export default async function CambioEIEPage({ params }: PageProps) {
  const { lang } = await params;
  if (lang !== "es") return null;

  const db = getDb();
  const result = await db.execute({
    sql: `SELECT * FROM verbs WHERE lang = 'es' AND stem_change = 'e→ie' ORDER BY frequency_rank ASC`,
    args: [],
  });
  type VRow = { infinitive: string; slug: string; conjugation_group: string; type: string; stem_change: string | null; frequency_rank: number | null };
  const verbs = result.rows as unknown as VRow[];

  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Verbos con cambio de raíz e→ie en español",
    description: "Lista completa de verbos irregulares con cambio e→ie",
    numberOfItems: verbs.length,
    itemListElement: verbs.slice(0, 20).map((v, i) => ({
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
        { label: "Verbos irregulares", href: "/es/verbos/irregulares" },
        { label: "Cambio e→ie" },
      ]} />

      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-3">
        Verbos con cambio de raíz e→ie
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">
        {verbs.length} verbos encontrados
      </p>

      <div className="quick-answer bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-lg p-4 mb-6">
        <p className="font-semibold text-amber-900 dark:text-amber-200 mb-2">¿Qué son los verbos con cambio e→ie?</p>
        <p className="text-sm text-amber-800 dark:text-amber-300">
          Son verbos irregulares cuya vocal <strong>e</strong> de la raíz cambia a <strong>ie</strong> en las personas tónicas
          del presente de indicativo y subjuntivo: yo, tú, él/ella, ellos/ellas. Las personas nosotros y vosotros
          mantienen la <strong>e</strong> original. Ejemplo: <em>querer → quiero, quieres, quiere, queremos, queréis, quieren</em>.
        </p>
      </div>

      <AdUnit slot="1234567890" format="leaderboard" className="ad-leaderboard" />

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
          Lista de verbos con cambio e→ie
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
      </section>

      <section className="prose prose-sm dark:prose-invert max-w-none mb-6">
        <h2>El cambio de raíz e→ie en español</h2>
        <p>
          Los verbos con cambio <strong>e→ie</strong> son uno de los grupos de verbos irregulares más numerosos
          del español. El cambio afecta a la <strong>vocal tónica de la raíz</strong>, es decir, la sílaba que
          recibe el acento en las personas yo, tú, él/ella y ellos/ellas del presente.
        </p>
        <p>
          Este patrón afecta a verbos de los tres grupos: -ar (pensar, empezar, cerrar), -er (querer, entender, perder)
          e -ir (sentir, venir, preferir). Los verbos -ir con este cambio también lo aplican al gerundio y
          en la tercera persona del pretérito indefinido (e→i en estos casos, como sintió, vistió).
        </p>
        <h3>Cómo identificar estos verbos</h3>
        <p>
          Los diccionarios suelen marcarlos con «e:ie» entre paréntesis. En el aula, se aprenden memorizando
          los más frecuentes: querer, poder (o→ue), tener, venir, sentir. Una vez dominados los más comunes,
          el patrón se reconoce fácilmente en verbos nuevos.
        </p>
      </section>

      <div className="mt-4 flex flex-wrap gap-2">
        <Link href="/es/verbos/irregulares/cambio-radical-oue" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
          → Verbos con cambio o→ue
        </Link>
        <Link href="/es/verbos/irregulares/primera-persona" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
          → Verbos irregulares en primera persona
        </Link>
        <Link href="/es/verbos/irregulares" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
          → Todos los verbos irregulares
        </Link>
      </div>

      <AdUnit slot="1122334455" format="large-leaderboard" className="ad-large-leaderboard" />
    </>
  );
}

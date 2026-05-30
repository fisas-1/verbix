import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/seo";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import AdUnit from "@/components/AdUnit";

export async function generateStaticParams() { return [{ lang: "es" }]; }
export const revalidate = 86400;
interface PageProps { params: Promise<{ lang: string }> }

const FALSE_FRIENDS = [
  { es: "embarazar", en_wrong: "to embarrass", en_right: "to make pregnant", es_real: "avergonzar", note: "¡El más famoso! «Estoy embarazada» = «I am pregnant», not embarrassed." },
  { es: "realizar", en_wrong: "to realize", en_right: "to carry out / to fulfill", es_real: "darse cuenta de", note: "«Realizó sus sueños» = «She fulfilled her dreams»" },
  { es: "sensible", en_wrong: "sensible", en_right: "sensitive", es_real: "sensato", note: "A «persona sensible» is emotionally sensitive, not rational." },
  { es: "actual", en_wrong: "actual", en_right: "current / present-day", es_real: "real / verdadero", note: "«El problema actual» = «The current problem»" },
  { es: "recordar", en_wrong: "to record", en_right: "to remember", es_real: "grabar", note: "«¿Recuerdas?» = «Do you remember?»" },
  { es: "largo", en_wrong: "large", en_right: "long", es_real: "grande", note: "«Un camino largo» = «A long road», not a large road." },
  { es: "carpeta", en_wrong: "carpet", en_right: "folder / binder", es_real: "alfombra", note: "La «carpeta» es para papeles, no para el suelo." },
  { es: "asistir", en_wrong: "to assist", en_right: "to attend", es_real: "ayudar", note: "«Asistí a la conferencia» = «I attended the conference»" },
  { es: "molestar", en_wrong: "to molest", en_right: "to bother / to annoy", es_real: "abusar de", note: "«¿Te molesta el ruido?» = «Does the noise bother you?»" },
  { es: "pretender", en_wrong: "to pretend", en_right: "to try / to claim", es_real: "fingir", note: "«Pretendo aprobar» = «I intend to pass»" },
  { es: "introducir", en_wrong: "to introduce (people)", en_right: "to insert / to input", es_real: "presentar", note: "«Introduce el PIN» = «Enter the PIN»" },
  { es: "suceso", en_wrong: "success", en_right: "event / incident", es_real: "éxito", note: "«El suceso fue grave» = «The incident was serious»" },
  { es: "lectura", en_wrong: "lecture", en_right: "reading", es_real: "conferencia / clase magistral", note: "«La lectura del libro» = «Reading the book»" },
  { es: "constipado", en_wrong: "constipated", en_right: "having a cold", es_real: "estreñido", note: "«Estoy constipado» = «I have a cold»" },
  { es: "librería", en_wrong: "library", en_right: "bookstore", es_real: "biblioteca", note: "La «librería» vende libros; la «biblioteca» los presta." },
  { es: "soportar", en_wrong: "to support", en_right: "to tolerate / to bear", es_real: "apoyar", note: "«No le soporto» = «I can't stand him»" },
  { es: "compromiso", en_wrong: "compromise", en_right: "commitment / engagement", es_real: "término medio / acuerdo", note: "«Tengo un compromiso» = «I have a commitment»" },
  { es: "exitoso", en_wrong: "existing", en_right: "successful", es_real: "existente", note: "Viene de «éxito» (success), no de «exist»." },
  { es: "gracioso", en_wrong: "gracious", en_right: "funny / cute", es_real: "amable / cortés", note: "«¡Qué gracioso!» = «How funny!»" },
  { es: "extrañar", en_wrong: "to feel strange", en_right: "to miss (someone)", es_real: "sentirse extraño", note: "«Te extraño» = «I miss you»" },
];

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  if (lang !== "es") return {};
  return {
    title: `Falsos amigos entre español e inglés: verbos y palabras | Verblop`,
    description: `Los 20 falsos amigos más comunes entre español e inglés: embarazar, realizar, sensible, actual... Aprende a no confundirlos con ejemplos reales.`,
    alternates: { canonical: `${SITE_URL}/es/verbos/falsos-amigos` },
  };
}

export default async function FalsosAmigosPage({ params }: PageProps) {
  const { lang } = await params;
  if (lang !== "es") return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FALSE_FRIENDS.slice(0, 5).map(f => ({
      "@type": "Question",
      name: `¿Qué significa «${f.es}» en español?`,
      acceptedAnswer: {
        "@type": "Answer",
        text: `«${f.es}» significa "${f.en_right}" en inglés, NO "${f.en_wrong}". ${f.note}`,
      },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <BreadcrumbNav crumbs={[
        { label: "Inicio", href: "/es" },
        { label: "Verbos en español", href: "/es/verbos" },
        { label: "Falsos amigos" },
      ]} />

      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-2">
        Falsos amigos entre español e inglés
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Palabras que se parecen en inglés y español pero significan cosas completamente distintas.
      </p>

      <div className="quick-answer bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg p-4 mb-6">
        <p className="font-semibold text-red-900 dark:text-red-200 mb-2">⚠️ El error más famoso</p>
        <p className="text-sm text-red-800 dark:text-red-300">
          <strong>«Estoy embarazada»</strong> NO significa «I am embarrassed» sino <strong>«I am pregnant»</strong>.
          Este error ha causado situaciones muy incómodas a estudiantes de español. ¡Memorízalo!
        </p>
      </div>

      <AdUnit slot="1234567890" format="leaderboard" className="ad-leaderboard" />

      <div className="grid grid-cols-1 gap-4 mb-8">
        {FALSE_FRIENDS.map((f) => (
          <div key={f.es} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
              <div>
                {f.es === "recordar" || f.es === "realizar" || f.es === "asistir" || f.es === "introducir" || f.es === "soportar" || f.es === "extrañar" ? (
                  <Link href={`/es/verbo/${f.es.normalize("NFD").replace(/[̀-ͯ]/g, "")}`} className="text-lg font-bold text-green-600 dark:text-green-400 hover:underline">
                    {f.es}
                  </Link>
                ) : (
                  <span className="text-lg font-bold text-gray-800 dark:text-gray-100">{f.es}</span>
                )}
              </div>
              <div className="flex gap-2 text-xs">
                <span className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded line-through">
                  ✗ {f.en_wrong}
                </span>
                <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded">
                  ✓ {f.en_right}
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              Para decir «{f.en_wrong}» en español usa: <strong>{f.es_real}</strong>
            </p>
            <p className="text-xs text-amber-700 dark:text-amber-400 italic">💡 {f.note}</p>
          </div>
        ))}
      </div>

      <section className="prose prose-sm dark:prose-invert max-w-none mb-6">
        <h2>¿Qué son los falsos amigos?</h2>
        <p>
          Los <strong>falsos amigos</strong> (<em>false friends</em> o <em>false cognates</em>) son palabras que
          suenan o se escriben de forma similar en dos idiomas pero tienen significados diferentes. Entre el
          español y el inglés hay cientos de estos falsos amigos, especialmente porque muchas palabras comparten
          raíces latinas pero han evolucionado de manera distinta.
        </p>
        <p>
          El fenómeno es especialmente traicionero porque la similitud visual genera confianza: el estudiante
          «reconoce» la palabra y asume que sabe su significado. Por eso son fuente de malentendidos frecuentes,
          a veces cómicos y a veces embarazosos (en el sentido inglés del término).
        </p>
        <h3>Cómo evitar los errores</h3>
        <p>
          La clave es no asumir. Cuando una palabra española se parece demasiado a una inglesa, desconfía
          y busca su significado real. Especialmente con verbos como <em>realizar</em>, <em>recordar</em>,
          <em>molestar</em>, <em>pretender</em> y <em>soportar</em>.
        </p>
      </section>

      <div className="flex flex-wrap gap-2 mt-4">
        <Link href="/es/verbos/mas-usados" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">→ Los 100 verbos más usados</Link>
        <Link href="/es/verbos/reflexivos" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">→ Verbos reflexivos</Link>
        <Link href="/es/verbos/irregulares" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">→ Verbos irregulares</Link>
      </div>

      <AdUnit slot="1122334455" format="large-leaderboard" className="ad-large-leaderboard" />
    </>
  );
}

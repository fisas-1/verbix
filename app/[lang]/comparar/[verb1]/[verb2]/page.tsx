import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import AdUnit from "@/components/AdUnit";
import { SITE_URL, SITE_NAME } from "@/lib/seo";
import { getVerb } from "@/lib/verbs";
import { conjugateVerb, getNonPersonalForms } from "@/lib/conjugate";

interface PageProps {
  params: Promise<{ lang: string; verb1: string; verb2: string }>;
}

// ── Top 20 comparison pairs ───────────────────────────────────────────────────

export const COMPARISON_PAIRS: [string, string][] = [
  ["ser", "estar"],
  ["saber", "conocer"],
  ["pedir", "preguntar"],
  ["llevar", "traer"],
  ["ir", "venir"],
  ["poder", "saber"],
  ["hablar", "decir"],
  ["hacer", "poner"],
  ["querer", "amar"],
  ["mirar", "ver"],
  ["escuchar", "oir"],
  ["comer", "beber"],
  ["trabajar", "estudiar"],
  ["comprar", "vender"],
  ["subir", "bajar"],
  ["abrir", "cerrar"],
  ["empezar", "terminar"],
  ["ganar", "perder"],
  ["tener", "haber"],
  ["ser", "ir"],
];

// ── Difference explanations ───────────────────────────────────────────────────

export const DIFFERENCES: Record<string, { es: string; tip: string }> = {
  "ser-estar": {
    es: "SER expresa características permanentes o esenciales (identidad, origen, profesión, material, tiempo). ESTAR expresa estados temporales, ubicación, resultados de un proceso y el progreso continuo. La regla general: si puede cambiar, usa ESTAR; si define la esencia, usa SER.",
    tip: "Truco: «La sopa está caliente» (estado temporal) vs «La sopa es buena» (característica del cocinero).",
  },
  "saber-conocer": {
    es: "SABER expresa conocimiento de hechos, datos o habilidades (saber + infinitivo = know how to). CONOCER expresa conocimiento personal de personas, lugares o cosas, es decir, estar familiarizado con algo. Saber es información; conocer es experiencia personal.",
    tip: "Truco: «Sé la respuesta» (dato) vs «Conozco a María» (persona). En inglés ambos son \"know\".",
  },
  "pedir-preguntar": {
    es: "PEDIR significa solicitar algo (hacer una petición, un favor, una comida). PREGUNTAR significa hacer una pregunta, solicitar información. La confusión es habitual: pides un café, pero preguntas la hora.",
    tip: "Truco: «Pedir» = to ask for (quieres obtener algo). «Preguntar» = to ask (quieres información).",
  },
  "llevar-traer": {
    es: "LLEVAR es transportar algo desde el lugar donde estás hacia otro lugar (movimiento que se aleja del hablante). TRAER es transportar algo hacia el lugar donde está el hablante (movimiento que se acerca). La perspectiva del hablante es la clave.",
    tip: "Truco: «Llevo el paraguas al trabajo» (me voy). «Trae el paraguas aquí» (ven hacia mí).",
  },
  "ir-venir": {
    es: "IR implica movimiento que se aleja del lugar donde está el hablante. VENIR implica movimiento hacia el lugar donde está el hablante. La referencia es siempre la posición del hablante. En inglés «come» y «go» funcionan igual.",
    tip: "Truco: «¿Vas al cine?» (te alejas de aquí) vs «¿Vienes al cine conmigo?» (vendrás a donde estoy yo).",
  },
  "poder-saber": {
    es: "PODER expresa capacidad física o posibilidad (circunstancias permiten hacer algo). SABER + infinitivo expresa habilidad aprendida. La diferencia: «No puedo correr» (estoy lesionado) vs «No sé correr» (nunca aprendí).",
    tip: "Truco: «Puedo» = can (I'm able to now). «Sé» = I know how to (I've learned).",
  },
  "hablar-decir": {
    es: "HABLAR es el acto de comunicarse oralmente (hablar con alguien, hablar de algo, hablar un idioma). DECIR es transmitir un mensaje específico o una información concreta. Hablar es el proceso; decir es el contenido.",
    tip: "Truco: «Habla mucho» (genera discurso). «Dice la verdad» (transmite información específica).",
  },
  "hacer-poner": {
    es: "HACER es crear, realizar o provocar algo. PONER es colocar algo en un lugar o añadirle algo a algo. Hacer implica creación o acción; poner implica colocación o adición.",
    tip: "Truco: «Hacer la cama» (realizas la acción) vs «Poner la mesa» (colocas objetos en la mesa).",
  },
  "querer-amar": {
    es: "QUERER es el verbo más versátil: expresa deseo, afecto (entre personas), amor familiar o amor romántico. AMAR expresa un amor más profundo, intenso y literario. En el uso cotidiano, «querer» es más natural entre familiares y amigos; «amar» suena más poético o formal.",
    tip: "Truco: «Te quiero» (everyday expression) es más común que «Te amo» (intense/literary).",
  },
  "mirar-ver": {
    es: "MIRAR es dirigir la vista intencionadamente hacia algo (acción voluntaria). VER es percibir con los ojos, que puede ser involuntario. Miramos porque queremos; vemos porque algo está ahí.",
    tip: "Truco: «Mira la tele» (decides verla) vs «Vi un accidente» (lo percibiste sin buscarlo).",
  },
  "escuchar-oir": {
    es: "ESCUCHAR es prestar atención activa al sonido (acción voluntaria y consciente). OÍR es percibir sonidos de forma pasiva o involuntaria. Escuchamos porque queremos; oímos aunque no queramos.",
    tip: "Truco: «Escucha música» (presta atención) vs «Oigo ruido» (percibo sin querer).",
  },
  "comer-beber": {
    es: "COMER se refiere a ingerir alimentos sólidos. BEBER se refiere a ingerir líquidos. Diferencia simple pero importante: en español siempre distinguimos entre comer y beber (en inglés a veces se usa «drink» para ambos).",
    tip: "Uso cultural: «¿Qué comes?» (platos) vs «¿Qué bebes?» (bebidas). Para desayunar también se puede decir «tomar».",
  },
  "trabajar-estudiar": {
    es: "TRABAJAR es realizar una actividad laboral o esforzarse. ESTUDIAR es aprender o investigar un tema. Son actividades distintas aunque relacionadas: se puede estudiar para trabajar. Ambos son verbos regulares -AR muy frecuentes.",
    tip: "Colocaciones: «trabajar duro/mucho», «estudiar a fondo/de memoria».",
  },
  "comprar-vender": {
    es: "COMPRAR es adquirir algo a cambio de dinero (perspectiva del comprador). VENDER es ceder algo a cambio de dinero (perspectiva del vendedor). Son verbos antónimos que forman parte del vocabulario esencial del comercio.",
    tip: "Truco: «Compro a 10€ y vendo a 15€» (el margen de beneficio). Son regulares: compré, vendí.",
  },
  "subir-bajar": {
    es: "SUBIR expresa movimiento hacia arriba o aumento. BAJAR expresa movimiento hacia abajo o descenso. Son antónimos directos que funcionan tanto en sentido literal (subir escaleras) como figurado (subir el sueldo).",
    tip: "Usos digitales: «subir un archivo» (upload) vs «bajar/descargar» (download).",
  },
  "abrir-cerrar": {
    es: "ABRIR expresa la acción de hacer que algo deje de estar cerrado. CERRAR es la acción opuesta: hacer que algo quede cerrado. Son antónimos directos, regulares (-ir y -ar respectivamente), muy usados en la vida cotidiana.",
    tip: "Atención: el participio de abrir es irregular (abierto) pero cerrar es regular (cerrado).",
  },
  "empezar-terminar": {
    es: "EMPEZAR (también comenzar) indica el inicio de una acción. TERMINAR (también acabar) indica el final. Son los dos extremos de cualquier acción o proceso. Empezar es irregular (e→ie en presente), terminar es regular.",
    tip: "Sinónimos: empezar = comenzar, iniciar, arrancar. Terminar = acabar, finalizar, concluir.",
  },
  "ganar-perder": {
    es: "GANAR expresa victoria, obtención de dinero/beneficio o adquisición. PERDER expresa derrota, extravío de un objeto o desperdicio. Son antónimos en contextos de competición y también en contextos económicos.",
    tip: "Perder es irregular (e→ie): pierdo, pierdes, pierde. Ganar es regular: gano, ganas, gana.",
  },
  "tener-haber": {
    es: "TENER expresa posesión o la obligación «tener que + infinitivo». HABER es el verbo auxiliar que forma tiempos compuestos (he comido, había salido). En el presente «hay» (forma impersonal de haber) indica existencia.",
    tip: "Importante: «hay» (haber impersonal) nunca puede usarse en plural en español estándar: «Hay muchos libros» (no «*Han muchos libros»).",
  },
  "ser-ir": {
    es: "SER e IR tienen exactamente el mismo pretérito indefinido: fui, fuiste, fue, fuimos, fuisteis, fueron. El contexto determina cuál es cuál. Esto es una peculiaridad del español que sorprende a los estudiantes.",
    tip: "Truco: «Fui médico» (ser) vs «Fui al médico» (ir). La preposición o el contexto te indica el verbo.",
  },
};

const TENSES_TO_SHOW = ["presente", "preterito_indefinido", "preterito_imperfecto", "futuro_simple", "condicional_simple", "subjuntivo_presente"];
const TENSE_LABELS: Record<string, string> = {
  presente: "Presente",
  preterito_indefinido: "Pretérito Indefinido",
  preterito_imperfecto: "Pretérito Imperfecto",
  futuro_simple: "Futuro Simple",
  condicional_simple: "Condicional",
  subjuntivo_presente: "Subjuntivo Presente",
};
const PERSONS = ["yo", "tú", "él/ella", "nosotros", "vosotros", "ellos/ellas"];

// ── Static params ─────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  return [
    ...COMPARISON_PAIRS.map(([v1, v2]) => ({ lang: "es", verb1: v1, verb2: v2 })),
    ...COMPARISON_PAIRS.map(([v1, v2]) => ({ lang: "ca", verb1: v1, verb2: v2 })),
  ];
}

export const revalidate = 86400;

// ── Metadata ──────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, verb1, verb2 } = await params;
  if (lang !== "es" && lang !== "ca") return {};
  const v1 = await getVerb(verb1, "es");
  const v2 = await getVerb(verb2, "es");
  if (!v1 || !v2) return {};
  const canonical = `${SITE_URL}/${lang}/comparar/${verb1}/${verb2}`;
  const isCa = lang === "ca";
  const title = isCa
    ? `Diferència entre ${v1.infinitive} i ${v2.infinitive} | Conjugació completa`
    : `Diferencia entre ${v1.infinitive} y ${v2.infinitive} | Conjugación completa`;
  const description = isCa
    ? `Aprèn la diferència entre ${v1.infinitive} i ${v2.infinitive}. Conjugació completa d'ambdós verbs amb exemples i explicació. Resol els teus dubtes ara!`
    : `Aprende la diferencia entre ${v1.infinitive} y ${v2.infinitive}. Conjugación completa de ambos verbos con ejemplos y explicación detallada. ¡Resuelve tus dudas ahora!`;
  const locale = isCa ? "ca_ES" : "es_ES";
  return {
    title: `${title} | ${SITE_NAME}`,
    description,
    alternates: { canonical },
    openGraph: { title: `${title} | ${SITE_NAME}`, description, url: canonical, siteName: SITE_NAME, locale },
  };
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function CompararPage({ params }: PageProps) {
  const { lang, verb1: verb1Slug, verb2: verb2Slug } = await params;
  if (lang !== "es" && lang !== "ca") notFound();

  const [v1, v2] = await Promise.all([
    getVerb(verb1Slug, "es"),
    getVerb(verb2Slug, "es"),
  ]);
  if (!v1 || !v2) notFound();

  const tenses1 = conjugateVerb(v1.infinitive, v1.conjugation_group, v1.type, v1.stem_change ?? undefined);
  const tenses2 = conjugateVerb(v2.infinitive, v2.conjugation_group, v2.type, v2.stem_change ?? undefined);
  const np1 = getNonPersonalForms(v1.infinitive, v1.conjugation_group);
  const np2 = getNonPersonalForms(v2.infinitive, v2.conjugation_group);

  const diffKey = `${v1.infinitive}-${v2.infinitive}`;
  const diff = DIFFERENCES[diffKey] ?? DIFFERENCES[`${v2.infinitive}-${v1.infinitive}`];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `¿Cuál es la diferencia entre ${v1.infinitive} y ${v2.infinitive}?`,
        acceptedAnswer: { "@type": "Answer", text: diff?.es ?? `${v1.infinitive} y ${v2.infinitive} son verbos con significados y usos distintos en español. Consulta la tabla de conjugaciones para comparar sus formas.` },
      },
      {
        "@type": "Question",
        name: `¿Cómo se conjuga ${v1.infinitive} en presente?`,
        acceptedAnswer: { "@type": "Answer", text: tenses1.find(t => t.tense === "presente")?.forms.map(f => `${f.person}: ${f.form}`).join(", ") ?? "" },
      },
      {
        "@type": "Question",
        name: `¿Cómo se conjuga ${v2.infinitive} en presente?`,
        acceptedAnswer: { "@type": "Answer", text: tenses2.find(t => t.tense === "presente")?.forms.map(f => `${f.person}: ${f.form}`).join(", ") ?? "" },
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE_URL}/es` },
      { "@type": "ListItem", position: 2, name: "Comparar verbos", item: `${SITE_URL}/es/comparar` },
      { "@type": "ListItem", position: 3, name: `${v1.infinitive} vs ${v2.infinitive}`, item: `${SITE_URL}/es/comparar/${verb1Slug}/${verb2Slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <BreadcrumbNav
        crumbs={[
          { label: "Inicio", href: "/es" },
          { label: "Verbos en español", href: "/es/verbos" },
          { label: `${v1.infinitive} vs ${v2.infinitive}` },
        ]}
      />

      {/* H1 */}
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-2">
        Diferencia entre <span className="text-green-600 dark:text-green-400">{v1.infinitive}</span> y{" "}
        <span className="text-blue-600 dark:text-blue-400">{v2.infinitive}</span>
      </h1>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
        Conjugación completa y explicación de la diferencia
      </p>

      {/* Difference box */}
      {diff && (
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-lg p-4 mb-6">
          <h2 className="font-semibold text-amber-900 dark:text-amber-200 mb-2">
            ¿Cuál es la diferencia?
          </h2>
          <p className="text-sm text-amber-800 dark:text-amber-300 leading-relaxed mb-2">{diff.es}</p>
          <p className="text-sm text-amber-700 dark:text-amber-400 italic">💡 {diff.tip}</p>
        </div>
      )}

      <AdUnit slot="1234567890" format="leaderboard" className="ad-leaderboard" />

      {/* Non-personal forms */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {[{ verb: v1, np: np1 }, { verb: v2, np: np2 }].map(({ verb, np }, i) => (
          <div key={verb.slug} className={`p-3 rounded-lg border ${i === 0 ? "border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20" : "border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20"}`}>
            <Link href={`/es/verbo/${verb.slug}`} className={`font-bold text-lg ${i === 0 ? "text-green-700 dark:text-green-400" : "text-blue-700 dark:text-blue-400"} hover:underline`}>
              {verb.infinitive}
            </Link>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 space-y-0.5">
              <p>Gerundio: <strong>{np.gerundio}</strong></p>
              <p>Participio: <strong>{np.participio}</strong></p>
              {verb.translation_en && <p>EN: {verb.translation_en}</p>}
            </div>
          </div>
        ))}
      </div>

      {/* Parallel conjugation tables */}
      {TENSES_TO_SHOW.map((tenseKey) => {
        const t1 = tenses1.find((t) => t.tense === tenseKey);
        const t2 = tenses2.find((t) => t.tense === tenseKey);
        if (!t1 || !t2) return null;
        return (
          <div key={tenseKey} className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
              {TENSE_LABELS[tenseKey] ?? tenseKey}
            </h2>
            <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-3 py-2 text-left text-gray-500 dark:text-gray-400 w-24">Persona</th>
                    <th className="px-3 py-2 text-center text-green-700 dark:text-green-400 font-semibold">{v1.infinitive}</th>
                    <th className="px-3 py-2 text-center text-blue-700 dark:text-blue-400 font-semibold">{v2.infinitive}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {PERSONS.map((person, idx) => {
                    const f1 = t1.forms[idx];
                    const f2 = t2.forms[idx];
                    return (
                      <tr key={person} className="hover:bg-gray-50 dark:hover:bg-gray-800/40">
                        <td className="px-3 py-1.5 text-gray-500 dark:text-gray-400 text-xs">{person}</td>
                        <td className={`px-3 py-1.5 text-center font-medium ${f1?.is_irregular ? "text-amber-700 dark:text-amber-400" : "text-green-800 dark:text-green-300"}`}>
                          {f1?.form ?? "—"}
                        </td>
                        <td className={`px-3 py-1.5 text-center font-medium ${f2?.is_irregular ? "text-amber-700 dark:text-amber-400" : "text-blue-800 dark:text-blue-300"}`}>
                          {f2?.form ?? "—"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}

      <AdUnit slot="0987654321" format="rectangle" className="ad-rectangle" />

      {/* Links to full conjugation pages */}
      <div className="flex gap-4 my-6 flex-wrap">
        <Link href={`/es/verbo/${v1.slug}`} className="flex-1 min-w-[140px] text-center py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium text-sm transition-colors">
          Conjugar {v1.infinitive} completo →
        </Link>
        <Link href={`/es/verbo/${v2.slug}`} className="flex-1 min-w-[140px] text-center py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm transition-colors">
          Conjugar {v2.infinitive} completo →
        </Link>
      </div>

      {/* Other comparisons */}
      <section className="mt-6">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">Otras comparaciones frecuentes</h2>
        <div className="flex flex-wrap gap-2">
          {COMPARISON_PAIRS.filter(([a, b]) => !(a === verb1Slug && b === verb2Slug)).slice(0, 12).map(([a, b]) => (
            <Link
              key={`${a}-${b}`}
              href={`/es/comparar/${a}/${b}`}
              className="px-3 py-1 text-sm rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-green-100 dark:hover:bg-green-900/40 hover:text-green-700 dark:hover:text-green-400 transition-colors"
            >
              {a} vs {b}
            </Link>
          ))}
        </div>
      </section>

      <AdUnit slot="1122334455" format="large-leaderboard" className="ad-large-leaderboard" />
    </>
  );
}

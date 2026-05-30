import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import AdUnit from "@/components/AdUnit";
import { SITE_URL, SITE_NAME } from "@/lib/seo";
import { getAllVerbSlugs } from "@/lib/verbs";
import { conjugateVerb } from "@/lib/conjugate";
import { getDb } from "@/lib/db";

interface PageProps {
  params: Promise<{ lang: string; slug: string }>;
}

// ── Tense data ────────────────────────────────────────────────────────────────

interface TenseData {
  slug: string;
  h1: string;
  metaTitle: string;
  metaDesc: string;
  intro: string;
  formation: string;
  endings: { person: string; ar: string; er: string; ir: string }[];
  commonErrors: string[];
  usage: string;
  exampleVerbs: string[];
}

const TENSES: Record<string, TenseData> = {
  "presente-indicativo": {
    slug: "presente-indicativo",
    h1: "El presente de indicativo en español",
    metaTitle: "Presente de indicativo en español: uso y conjugación",
    metaDesc:
      "Aprende cuándo y cómo usar el presente de indicativo en español. Reglas de conjugación, verbos irregulares y ejemplos reales.",
    intro:
      "El presente de indicativo es el tiempo verbal más usado en español. Expresa acciones que ocurren en este momento, hábitos y verdades generales. Es el primer tiempo que aprenden los estudiantes porque sirve de base para entender todos los demás.",
    formation:
      "Para conjugar un verbo en presente de indicativo se elimina la terminación del infinitivo (-ar, -er, -ir) y se añaden las terminaciones correspondientes. Los verbos regulares siguen siempre el mismo patrón; los irregulares presentan cambios en la raíz o en la terminación.",
    endings: [
      { person: "yo", ar: "-o", er: "-o", ir: "-o" },
      { person: "tú", ar: "-as", er: "-es", ir: "-es" },
      { person: "él/ella", ar: "-a", er: "-e", ir: "-e" },
      { person: "nosotros", ar: "-amos", er: "-emos", ir: "-imos" },
      { person: "vosotros", ar: "-áis", er: "-éis", ir: "-ís" },
      { person: "ellos/ellas", ar: "-an", er: "-en", ir: "-en" },
    ],
    commonErrors: [
      "Confundir las terminaciones -er e -ir en la persona nosotros (comemos vs. vivimos).",
      "Olvidar que los verbos con cambio de raíz (e→ie, o→ue) solo cambian en las formas tónicas.",
      "Usar el presente donde en inglés se usa el present continuous: «Estudio» puede traducirse como «I study» o «I am studying».",
    ],
    usage:
      "El presente de indicativo se usa para: (1) acciones que ocurren ahora mismo («Estoy cansado»), (2) hábitos y rutinas («Como a las dos»), (3) verdades universales («El agua hierve a 100 °C»), (4) el presente histórico para dar viveza a una narración («Colón llega a América en 1492»), y (5) futuro próximo cuando hay referencia temporal («Mañana viajo a Madrid»).",
    exampleVerbs: ["hablar", "comer", "vivir", "ser", "ir", "tener", "hacer", "poder", "querer", "decir"],
  },

  "preterito-indefinido": {
    slug: "preterito-indefinido",
    h1: "El pretérito indefinido en español",
    metaTitle: "Pretérito indefinido en español: uso y conjugación",
    metaDesc:
      "Aprende el pretérito indefinido en español: cuándo usarlo, cómo formarlo y los verbos irregulares más importantes. Con ejemplos y ejercicios.",
    intro:
      "El pretérito indefinido (también llamado pretérito perfecto simple) expresa acciones pasadas que se consideran terminadas y completamente separadas del presente. Es uno de los tiempos pasados más importantes del español y el que más confusión genera en estudiantes de inglés.",
    formation:
      "Se forma añadiendo las terminaciones del indefinido a la raíz del infinitivo. Los verbos irregulares más comunes (ser, ir, estar, tener, hacer, venir, poder, poner, saber, querer) tienen raíces propias que hay que memorizar.",
    endings: [
      { person: "yo", ar: "-é", er: "-í", ir: "-í" },
      { person: "tú", ar: "-aste", er: "-iste", ir: "-iste" },
      { person: "él/ella", ar: "-ó", er: "-ió", ir: "-ió" },
      { person: "nosotros", ar: "-amos", er: "-imos", ir: "-imos" },
      { person: "vosotros", ar: "-asteis", er: "-isteis", ir: "-isteis" },
      { person: "ellos/ellas", ar: "-aron", er: "-ieron", ir: "-ieron" },
    ],
    commonErrors: [
      "Confundir el indefinido con el imperfecto: el indefinido narra eventos puntuales, el imperfecto describe situaciones continuas.",
      "Olvidar el acento en «yo hablé», «él habló» (sin acento cambia el significado).",
      "Los verbos ser e ir tienen el mismo indefinido (fui, fuiste, fue…); el contexto indica cuál es.",
    ],
    usage:
      "Se usa para: (1) acciones pasadas con tiempo determinado («Ayer fui al médico»), (2) acciones que interrumpen otra («Estaba leyendo cuando sonó el teléfono»), (3) una serie de acciones pasadas consecutivas («Entró, saludó y se sentó»), (4) períodos de tiempo ya cerrados («Viví en París tres años»).",
    exampleVerbs: ["hablar", "comer", "vivir", "ser", "ir", "estar", "tener", "hacer", "poder", "venir"],
  },

  "preterito-imperfecto": {
    slug: "preterito-imperfecto",
    h1: "El pretérito imperfecto en español",
    metaTitle: "Pretérito imperfecto en español: uso y conjugación",
    metaDesc:
      "Guía completa del pretérito imperfecto en español. Aprende la diferencia con el indefinido, las terminaciones y los usos más importantes.",
    intro:
      "El pretérito imperfecto describe situaciones pasadas que no se presentan como terminadas, hábitos del pasado y descripciones en el pasado. A diferencia del indefinido, no enfatiza el inicio ni el fin de la acción. Es fundamental para contar historias y describir el pasado.",
    formation:
      "El imperfecto es muy regular: solo hay tres verbos irregulares (ser, ir, ver). Las terminaciones son las mismas para -er e -ir. La primera y tercera persona del singular son idénticas, por lo que a veces se necesita el pronombre para distinguirlas.",
    endings: [
      { person: "yo", ar: "-aba", er: "-ía", ir: "-ía" },
      { person: "tú", ar: "-abas", er: "-ías", ir: "-ías" },
      { person: "él/ella", ar: "-aba", er: "-ía", ir: "-ía" },
      { person: "nosotros", ar: "-ábamos", er: "-íamos", ir: "-íamos" },
      { person: "vosotros", ar: "-abais", er: "-íais", ir: "-íais" },
      { person: "ellos/ellas", ar: "-aban", er: "-ían", ir: "-ían" },
    ],
    commonErrors: [
      "Usar el indefinido cuando se necesita el imperfecto para describir el fondo de una historia.",
      "Olvidar que «ser», «ir» y «ver» son los únicos irregulares: era/iba/veía.",
      "Confundir «había» (imperfecto de haber) con «hubo» (indefinido), que tienen significados distintos.",
    ],
    usage:
      "Se usa para: (1) hábitos pasados («De niño, jugaba al fútbol todos los días»), (2) descripciones en el pasado («Era alto y tenía ojos azules»), (3) acciones continuas o en progreso («Cuando llegaste, yo dormía»), (4) tiempo, edad y estado mental en el pasado («Eran las tres / Tenía veinte años / Estaba nervioso»), (5) cortesía («Quería preguntarte algo»).",
    exampleVerbs: ["hablar", "comer", "vivir", "ser", "ir", "ver", "estar", "tener", "poder", "querer"],
  },

  "futuro-simple": {
    slug: "futuro-simple",
    h1: "El futuro simple en español",
    metaTitle: "Futuro simple en español: uso y conjugación",
    metaDesc:
      "Aprende el futuro simple en español: terminaciones, verbos irregulares, diferencia con «ir a + infinitivo» y ejemplos reales.",
    intro:
      "El futuro simple expresa acciones que ocurrirán después del momento presente. Se forma de manera muy sencilla: se añaden las terminaciones directamente al infinitivo completo (sin cortar la terminación), lo que lo hace uno de los tiempos más fáciles de aprender en español.",
    formation:
      "Las terminaciones del futuro son las mismas para los tres grupos (-ar, -er, -ir) y se añaden al infinitivo completo. Solo unos pocos verbos irregulares cambian la raíz del infinitivo antes de añadir las terminaciones: decir→dir-, hacer→har-, poder→podr-, poner→pondr-, querer→querr-, saber→sabr-, salir→saldr-, tener→tendr-, valer→valdr-, venir→vendr-.",
    endings: [
      { person: "yo", ar: "-é", er: "-é", ir: "-é" },
      { person: "tú", ar: "-ás", er: "-ás", ir: "-ás" },
      { person: "él/ella", ar: "-á", er: "-á", ir: "-á" },
      { person: "nosotros", ar: "-emos", er: "-emos", ir: "-emos" },
      { person: "vosotros", ar: "-éis", er: "-éis", ir: "-éis" },
      { person: "ellos/ellas", ar: "-án", er: "-án", ir: "-án" },
    ],
    commonErrors: [
      "Añadir las terminaciones a la raíz en lugar de al infinitivo completo (incorrecto: «hablaré» → correcto manteniendo el infinitivo «hablar+é»).",
      "Olvidar que los irregulares solo cambian la raíz, no las terminaciones: «tendré», no «*teneré».",
      "Confundir el futuro de probabilidad («Serán las tres» = «It must be three o'clock») con el futuro real.",
    ],
    usage:
      "Se usa para: (1) predicciones y acciones futuras («Mañana lloverá»), (2) promesas («Te llamaré»), (3) probabilidad en el presente («¿Dónde estará Juan?»), (4) mandatos con matiz formal («No matarás»). En la lengua coloquial, se prefiere «ir a + infinitivo» para el futuro próximo («Voy a llamarte» > «Te llamaré»).",
    exampleVerbs: ["hablar", "comer", "vivir", "ser", "ir", "tener", "hacer", "poder", "decir", "venir"],
  },

  "condicional-simple": {
    slug: "condicional-simple",
    h1: "El condicional simple en español",
    metaTitle: "Condicional simple en español: uso y conjugación",
    metaDesc:
      "Guía completa del condicional simple en español. Usos, terminaciones, irregulares y diferencia con el futuro.",
    intro:
      "El condicional simple (también llamado potencial simple) expresa acciones hipotéticas, deseos educados y probabilidad en el pasado. Se forma exactamente igual que el futuro: sobre el infinitivo completo, con los mismos verbos irregulares. En inglés equivale a «would + infinitive».",
    formation:
      "Las terminaciones del condicional son las del imperfecto de haber (-ía, -ías, -ía, -íamos, -íais, -ían) y se añaden al infinitivo completo. Los mismos verbos que son irregulares en el futuro simple también lo son en el condicional: decir→dir-, hacer→har-, poder→podr-, etc.",
    endings: [
      { person: "yo", ar: "-ía", er: "-ía", ir: "-ía" },
      { person: "tú", ar: "-ías", er: "-ías", ir: "-ías" },
      { person: "él/ella", ar: "-ía", er: "-ía", ir: "-ía" },
      { person: "nosotros", ar: "-íamos", er: "-íamos", ir: "-íamos" },
      { person: "vosotros", ar: "-íais", er: "-íais", ir: "-íais" },
      { person: "ellos/ellas", ar: "-ían", er: "-ían", ir: "-ían" },
    ],
    commonErrors: [
      "Confundir el condicional con el imperfecto (terminaciones similares -ía): contexto es clave.",
      "Usar el condicional donde se necesita el subjuntivo en las oraciones condicionales: «Si tuviera dinero, viajaría» (no «*Si tendría»).",
      "Olvidar que la primera y tercera persona del singular son idénticas.",
    ],
    usage:
      "Se usa para: (1) hipótesis y condiciones («Si pudiera, viviría en París»), (2) peticiones educadas («¿Podrías ayudarme?»), (3) probabilidad en el pasado («Serían las diez cuando llegó»), (4) deseos («Me gustaría verte»), (5) el condicional del estilo indirecto («Dijo que vendría»).",
    exampleVerbs: ["hablar", "comer", "vivir", "ser", "ir", "tener", "hacer", "poder", "querer", "venir"],
  },

  "subjuntivo-presente": {
    slug: "subjuntivo-presente",
    h1: "El presente de subjuntivo en español",
    metaTitle: "Presente de subjuntivo en español: uso y conjugación",
    metaDesc:
      "Aprende el presente de subjuntivo en español: cuándo usarlo, cómo formarlo y los verbos irregulares principales. La guía más completa.",
    intro:
      "El presente de subjuntivo es el tiempo del subjuntivo más usado. Expresa deseos, emociones, dudas, posibilidades y situaciones hipotéticas. Su uso es uno de los aspectos más difíciles para los estudiantes de español porque en inglés el subjuntivo casi ha desaparecido.",
    formation:
      "Se forma a partir de la primera persona del presente de indicativo (quitando la -o final) y añadiendo las terminaciones opuestas: los verbos -ar toman terminaciones de -er, y los verbos -er/-ir toman terminaciones de -ar. Esto explica por qué verbos irregulares en la primera persona del presente (como hacer→hago, poner→pongo) mantienen esa irregularidad en todo el subjuntivo.",
    endings: [
      { person: "yo", ar: "-e", er: "-a", ir: "-a" },
      { person: "tú", ar: "-es", er: "-as", ir: "-as" },
      { person: "él/ella", ar: "-e", er: "-a", ir: "-a" },
      { person: "nosotros", ar: "-emos", er: "-amos", ir: "-amos" },
      { person: "vosotros", ar: "-éis", er: "-áis", ir: "-áis" },
      { person: "ellos/ellas", ar: "-en", er: "-an", ir: "-an" },
    ],
    commonErrors: [
      "Olvidar usar el subjuntivo después de «que» cuando hay cambio de sujeto con verbos de deseo/emoción: «Quiero que vengas» (no «*Quiero que vienes»).",
      "Confundir el presente de subjuntivo con el presente de indicativo en la tercera persona: «(él) hable» vs «(él) habla».",
      "No reconocer los disparadores del subjuntivo: ojalá, quizás, tal vez, para que, cuando (futuro), aunque, etc.",
    ],
    usage:
      "Se usa tras: (1) expresiones de deseo («Quiero que estudies»), (2) expresiones de emoción («Me alegra que estés aquí»), (3) expresiones de duda o negación («Dudo que venga»), (4) expresiones impersonales («Es importante que practiques»), (5) conjunciones («para que», «aunque», «cuando» + futuro), (6) «ojalá».",
    exampleVerbs: ["hablar", "comer", "vivir", "ser", "ir", "estar", "tener", "hacer", "poder", "venir"],
  },

  "imperativo": {
    slug: "imperativo",
    h1: "El imperativo en español",
    metaTitle: "El imperativo en español: formas afirmativas y negativas",
    metaDesc:
      "Aprende el imperativo en español: formas afirmativas y negativas, verbos irregulares, posición de los pronombres y ejemplos reales.",
    intro:
      "El imperativo se usa para dar órdenes, instrucciones, consejos o peticiones. En español tiene formas afirmativas y negativas que son diferentes, y la posición de los pronombres cambia según el tipo. Es esencial para la comunicación cotidiana.",
    formation:
      "El imperativo afirmativo de «tú» es igual a la tercera persona del singular del presente de indicativo (habla, come, escribe). Las demás formas del imperativo afirmativo (nosotros, vosotros, ellos, usted) son iguales al subjuntivo presente. El imperativo negativo se forma con «no» + subjuntivo presente para todas las personas.",
    endings: [
      { person: "tú (afirm.)", ar: "-a", er: "-e", ir: "-e" },
      { person: "él/usted", ar: "-e (subj.)", er: "-a (subj.)", ir: "-a (subj.)" },
      { person: "nosotros", ar: "-emos (subj.)", er: "-amos (subj.)", ir: "-amos (subj.)" },
      { person: "vosotros", ar: "-ad", er: "-ed", ir: "-id" },
      { person: "ellos/ustedes", ar: "-en (subj.)", er: "-an (subj.)", ir: "-an (subj.)" },
    ],
    commonErrors: [
      "Confundir el imperativo afirmativo con el negativo: «¡Habla!» vs «¡No hables!» (formas completamente distintas).",
      "Olvidar los imperativos irregulares: di (decir), haz (hacer), ve (ir), pon (poner), sal (salir), sé (ser), ten (tener), ven (venir).",
      "Colocar mal los pronombres: en el afirmativo van después del verbo unidos («Dímelo»), en el negativo van antes («No me lo digas»).",
    ],
    usage:
      "Se usa para: (1) órdenes directas («¡Siéntate!»), (2) instrucciones («Mezcla los ingredientes»), (3) consejos («Estudia más»), (4) peticiones corteses con «por favor» («Por favor, cierra la ventana»), (5) prohibiciones con el imperativo negativo («¡No corras!»). Con «usted/ustedes» el tono es más formal.",
    exampleVerbs: ["hablar", "comer", "vivir", "ser", "ir", "tener", "hacer", "venir", "poner", "decir"],
  },
};

const TENSE_SLUGS = Object.keys(TENSES);

// ── Static params ─────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  return TENSE_SLUGS.map((slug) => ({ lang: "es", slug }));
}

export const revalidate = 86400;

// ── Metadata ──────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  if (lang !== "es") return {};
  const data = TENSES[slug];
  if (!data) return {};
  const canonical = `${SITE_URL}/es/tiempos/${slug}`;
  return {
    title: `${data.metaTitle} | ${SITE_NAME}`,
    description: data.metaDesc,
    alternates: { canonical },
    openGraph: {
      title: `${data.metaTitle} | ${SITE_NAME}`,
      description: data.metaDesc,
      url: canonical,
      siteName: SITE_NAME,
      locale: "es_ES",
    },
  };
}

// ── Helper: get DB sample conjugations for the example verbs ──────────────────

async function getExampleConjugations(tenseKey: string, verbSlugs: string[]) {
  const db = getDb();
  const placeholders = verbSlugs.map(() => "?").join(",");
  const result = await db.execute({
    sql: `SELECT infinitive, slug, type, conjugation_group, has_stem_change, stem_change
          FROM verbs WHERE lang = 'es' AND slug IN (${placeholders})
          ORDER BY frequency_rank ASC`,
    args: verbSlugs,
  });

  return result.rows.map((row) => {
    const r = row as unknown as {
      infinitive: string; slug: string; type: string;
      conjugation_group: string; has_stem_change: number; stem_change: string | null;
    };
    const tenses = conjugateVerb(r.infinitive, r.conjugation_group, r.type, r.stem_change ?? undefined);
    const tenseData = tenses.find((t) => t.tense === tenseKey);
    return { infinitive: r.infinitive, slug: r.slug, forms: tenseData?.forms ?? [] };
  });
}

// Map slug → conjugateVerb tense key
const SLUG_TO_TENSE_KEY: Record<string, string> = {
  "presente-indicativo": "presente",
  "preterito-indefinido": "preterito_indefinido",
  "preterito-imperfecto": "preterito_imperfecto",
  "futuro-simple": "futuro_simple",
  "condicional-simple": "condicional_simple",
  "subjuntivo-presente": "subjuntivo_presente",
  "imperativo": "imperativo_afirmativo",
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function TiempoPage({ params }: PageProps) {
  const { lang, slug } = await params;
  if (lang !== "es") notFound();
  const data = TENSES[slug];
  if (!data) notFound();

  const tenseKey = SLUG_TO_TENSE_KEY[slug] ?? "presente";
  const examples = await getExampleConjugations(tenseKey, data.exampleVerbs);

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `Cómo conjugar verbos en ${data.h1.replace("El ", "").replace(" en español", "")}`,
    description: data.metaDesc,
    step: [
      { "@type": "HowToStep", position: 1, name: "Identifica el grupo verbal", text: "Determina si el verbo es -ar, -er o -ir mirando la terminación del infinitivo." },
      { "@type": "HowToStep", position: 2, name: "Elimina la terminación del infinitivo", text: "Quita -ar, -er o -ir para obtener la raíz del verbo." },
      { "@type": "HowToStep", position: 3, name: "Añade la terminación correcta", text: `Añade la terminación del ${data.h1.toLowerCase()} según la persona gramatical.` },
      { "@type": "HowToStep", position: 4, name: "Comprueba si el verbo es irregular", text: "Algunos verbos cambian la raíz o tienen formas especiales. Consúltalos en la tabla de conjugación." },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE_URL}/es` },
      { "@type": "ListItem", position: 2, name: "Tiempos verbales", item: `${SITE_URL}/es/tiempos` },
      { "@type": "ListItem", position: 3, name: data.h1, item: `${SITE_URL}/es/tiempos/${slug}` },
    ],
  };

  const PERSONS_ES = ["yo", "tú", "él/ella", "nosotros", "vosotros", "ellos/ellas"];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <BreadcrumbNav
        crumbs={[
          { label: "Inicio", href: "/es" },
          { label: "Tiempos verbales", href: "/es/tiempos" },
          { label: data.h1 },
        ]}
      />

      {/* H1 */}
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-4">{data.h1}</h1>

      {/* Quick answer box for featured snippets */}
      <div className="quick-answer bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-6">
        <p className="font-semibold text-green-900 dark:text-green-200 mb-2">
          ¿Cómo se forman las terminaciones del {data.h1.replace("El ", "").replace(" en español", "")}?
        </p>
        <div className="overflow-x-auto">
          <table className="text-sm w-full">
            <thead>
              <tr className="text-green-700 dark:text-green-300">
                <th className="text-left pr-4 pb-1">Persona</th>
                <th className="pr-4 pb-1 text-center">-AR</th>
                <th className="pr-4 pb-1 text-center">-ER</th>
                <th className="pb-1 text-center">-IR</th>
              </tr>
            </thead>
            <tbody>
              {data.endings.map((row) => (
                <tr key={row.person} className="border-t border-green-100 dark:border-green-800">
                  <td className="pr-4 py-1 font-medium text-gray-700 dark:text-gray-300">{row.person}</td>
                  <td className="pr-4 py-1 text-center font-mono text-green-800 dark:text-green-300">{row.ar}</td>
                  <td className="pr-4 py-1 text-center font-mono text-green-800 dark:text-green-300">{row.er}</td>
                  <td className="py-1 text-center font-mono text-green-800 dark:text-green-300">{row.ir}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AdUnit slot="1234567890" format="leaderboard" className="ad-leaderboard" />

      {/* Introduction */}
      <section className="prose prose-sm dark:prose-invert max-w-none mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">¿Qué es y cuándo se usa?</h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{data.intro}</p>
      </section>

      {/* Usage */}
      <section className="prose prose-sm dark:prose-invert max-w-none mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">Usos principales</h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{data.usage}</p>
      </section>

      {/* Formation */}
      <section className="prose prose-sm dark:prose-invert max-w-none mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">Cómo se forma</h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{data.formation}</p>
      </section>

      {/* Common errors */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">Errores más comunes</h2>
        <ul className="space-y-2">
          {data.commonErrors.map((err, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
              <span className="text-red-500 mt-0.5 flex-shrink-0">✗</span>
              <span>{err}</span>
            </li>
          ))}
        </ul>
      </section>

      <AdUnit slot="0987654321" format="rectangle" className="ad-rectangle" />

      {/* Example conjugation table */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
          10 verbos conjugados en {data.h1.replace("El ", "").replace(" en español", "")}
        </h2>
        <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-3 py-2 text-left font-semibold text-gray-600 dark:text-gray-300 sticky left-0 bg-gray-50 dark:bg-gray-800">Verbo</th>
                {PERSONS_ES.map((p) => (
                  <th key={p} className="px-2 py-2 text-center font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap">{p}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {examples.map(({ infinitive, slug: verbSlug, forms }) => (
                <tr key={verbSlug} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="px-3 py-2 font-medium sticky left-0 bg-white dark:bg-gray-900">
                    <Link href={`/es/verbo/${verbSlug}`} className="text-green-600 dark:text-green-400 hover:underline">
                      {infinitive}
                    </Link>
                  </td>
                  {forms.slice(0, 6).map((f, i) => (
                    <td key={i} className={`px-2 py-2 text-center ${f.is_irregular ? "text-amber-700 dark:text-amber-400 font-semibold" : "text-gray-700 dark:text-gray-300"}`}>
                      {f.form}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          Las formas en <span className="text-amber-600 dark:text-amber-400 font-semibold">naranja</span> son irregulares.
        </p>
      </section>

      {/* Links to verb pages */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">Conjuga estos verbos</h2>
        <div className="flex flex-wrap gap-2">
          {examples.map(({ infinitive, slug: verbSlug }) => (
            <Link
              key={verbSlug}
              href={`/es/verbo/${verbSlug}`}
              className="px-3 py-1.5 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-green-100 dark:hover:bg-green-900/40 hover:text-green-700 dark:hover:text-green-300 transition-colors"
            >
              Conjugar {infinitive}
            </Link>
          ))}
        </div>
      </section>

      {/* Other tenses navigation */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">Otros tiempos verbales</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {TENSE_SLUGS.filter((s) => s !== slug).map((s) => (
            <Link
              key={s}
              href={`/es/tiempos/${s}`}
              className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300 hover:border-green-400 hover:text-green-700 dark:hover:text-green-400 transition-colors"
            >
              {TENSES[s].h1.replace(" en español", "")}
            </Link>
          ))}
        </div>
      </section>

      <AdUnit slot="1122334455" format="large-leaderboard" className="ad-large-leaderboard" />
    </>
  );
}

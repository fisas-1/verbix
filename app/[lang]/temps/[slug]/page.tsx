import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import AdUnit from "@/components/AdUnit";
import { SITE_URL, SITE_NAME } from "@/lib/seo";
import { conjugateVerb } from "@/lib/conjugate";
import { getDb } from "@/lib/db";

interface PageProps {
  params: Promise<{ lang: string; slug: string }>;
}

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

const TENSES_CA: Record<string, TenseData> = {
  "present-indicatiu": {
    slug: "present-indicatiu",
    h1: "El present d'indicatiu en espanyol",
    metaTitle: "Present d'indicatiu en espanyol: ús i conjugació",
    metaDesc: "Aprèn quan i com usar el present d'indicatiu en espanyol. Regles de conjugació, verbs irregulars i exemples reals.",
    intro: "El present d'indicatiu és el temps verbal més usat en espanyol. Expressa accions que ocorren en aquest moment, hàbits i veritats generals. És el primer temps que aprenen els estudiants.",
    formation: "Per conjugar un verb en present s'elimina la terminació de l'infinitiu (-ar, -er, -ir) i s'afegeixen les terminacions corresponents. Els verbs regulars segueixen sempre el mateix patró; els irregulars presenten canvis en l'arrel o en la terminació.",
    endings: [
      { person: "yo", ar: "-o", er: "-o", ir: "-o" },
      { person: "tú", ar: "-as", er: "-es", ir: "-es" },
      { person: "él/ella", ar: "-a", er: "-e", ir: "-e" },
      { person: "nosotros", ar: "-amos", er: "-emos", ir: "-imos" },
      { person: "vosotros", ar: "-áis", er: "-éis", ir: "-ís" },
      { person: "ellos/ellas", ar: "-an", er: "-en", ir: "-en" },
    ],
    commonErrors: [
      "Confondre les terminacions -er i -ir en la persona nosotros (comemos vs. vivimos).",
      "Oblidar que els verbs amb canvi d'arrel (e→ie, o→ue) només canvien en les formes tòniques.",
      "Usar el present on en català s'usaria el present continu: «Estudio» pot traduir-se com «Estic estudiant».",
    ],
    usage: "El present d'indicatiu s'usa per: (1) accions que ocorren ara mateix, (2) hàbits i rutines, (3) veritats universals, (4) present històric per donar vivesa a una narració, (5) futur proper amb referència temporal.",
    exampleVerbs: ["hablar", "comer", "vivir", "ser", "ir", "tener", "hacer", "poder", "querer", "decir"],
  },
  "preterit-indefinit": {
    slug: "preterit-indefinit",
    h1: "El pretèrit indefinit en espanyol",
    metaTitle: "Pretèrit indefinit en espanyol: ús i conjugació",
    metaDesc: "Aprèn el pretèrit indefinit en espanyol: quan usar-lo, com formar-lo i els verbs irregulars. Amb exemples i exercicis.",
    intro: "El pretèrit indefinit (també anomenat pretèrit perfet simple) expressa accions passades considerades acabades i completament separades del present. És un dels temps passats més importants de l'espanyol.",
    formation: "S'afegeixen les terminacions de l'indefinit a l'arrel de l'infinitiu. Els verbs irregulars més comuns (ser, ir, estar, tener, hacer, venir, poder, poner, saber, querer) tenen arrels pròpies que cal memoritzar.",
    endings: [
      { person: "yo", ar: "-é", er: "-í", ir: "-í" },
      { person: "tú", ar: "-aste", er: "-iste", ir: "-iste" },
      { person: "él/ella", ar: "-ó", er: "-ió", ir: "-ió" },
      { person: "nosotros", ar: "-amos", er: "-imos", ir: "-imos" },
      { person: "vosotros", ar: "-asteis", er: "-isteis", ir: "-isteis" },
      { person: "ellos/ellas", ar: "-aron", er: "-ieron", ir: "-ieron" },
    ],
    commonErrors: [
      "Confondre l'indefinit amb l'imperfet: l'indefinit narra esdeveniments puntuals.",
      "Oblidar l'accent en «yo hablé», «él habló».",
      "Els verbs ser i ir tenen el mateix indefinit (fui, fuiste…): el context indica quin és.",
    ],
    usage: "S'usa per: (1) accions passades amb temps determinat, (2) accions que interrompen una altra, (3) una sèrie d'accions passades consecutives, (4) períodes de temps ja tancats.",
    exampleVerbs: ["hablar", "comer", "vivir", "ser", "ir", "estar", "tener", "hacer", "poder", "venir"],
  },
  "preterit-imperfet": {
    slug: "preterit-imperfet",
    h1: "El pretèrit imperfet en espanyol",
    metaTitle: "Pretèrit imperfet en espanyol: ús i conjugació",
    metaDesc: "Guia completa del pretèrit imperfet en espanyol. Diferència amb l'indefinit, terminacions i usos principals.",
    intro: "El pretèrit imperfet descriu situacions passades que no es presenten com acabades, hàbits del passat i descripcions en el passat. Diferent de l'indefinit, no emfatitza l'inici ni el final de l'acció.",
    formation: "L'imperfet és molt regular: només hi ha tres verbs irregulars (ser, ir, ver). Les terminacions són les mateixes per a -er i -ir.",
    endings: [
      { person: "yo", ar: "-aba", er: "-ía", ir: "-ía" },
      { person: "tú", ar: "-abas", er: "-ías", ir: "-ías" },
      { person: "él/ella", ar: "-aba", er: "-ía", ir: "-ía" },
      { person: "nosotros", ar: "-ábamos", er: "-íamos", ir: "-íamos" },
      { person: "vosotros", ar: "-abais", er: "-íais", ir: "-íais" },
      { person: "ellos/ellas", ar: "-aban", er: "-ían", ir: "-ían" },
    ],
    commonErrors: [
      "Usar l'indefinit quan es necessita l'imperfet per descriure el fons d'una història.",
      "Oblidar que «ser», «ir» i «ver» són els únics irregulars.",
      "Confondre «había» (imperfet de haber) amb «hubo» (indefinit).",
    ],
    usage: "S'usa per: (1) hàbits passats, (2) descripcions en el passat, (3) accions contínues o en curs, (4) temps, edat i estat mental en el passat.",
    exampleVerbs: ["hablar", "comer", "vivir", "ser", "ir", "ver", "estar", "tener", "poder", "querer"],
  },
  "futur-simple": {
    slug: "futur-simple",
    h1: "El futur simple en espanyol",
    metaTitle: "Futur simple en espanyol: ús i conjugació",
    metaDesc: "Aprèn el futur simple en espanyol: terminacions, verbs irregulars, diferència amb «ir a + infinitiu» i exemples.",
    intro: "El futur simple expressa accions que ocorreran després del moment present. Les terminacions s'afegeixen directament a l'infinitiu complet, el que el fa un dels temps més fàcils d'aprendre.",
    formation: "Les terminacions del futur són les mateixes per als tres grups (-ar, -er, -ir) i s'afegeixen a l'infinitiu complet. Verbs irregulars canvien l'arrel: decir→dir-, hacer→har-, poder→podr-, poner→pondr-...",
    endings: [
      { person: "yo", ar: "-é", er: "-é", ir: "-é" },
      { person: "tú", ar: "-ás", er: "-ás", ir: "-ás" },
      { person: "él/ella", ar: "-á", er: "-á", ir: "-á" },
      { person: "nosotros", ar: "-emos", er: "-emos", ir: "-emos" },
      { person: "vosotros", ar: "-éis", er: "-éis", ir: "-éis" },
      { person: "ellos/ellas", ar: "-án", er: "-án", ir: "-án" },
    ],
    commonErrors: [
      "Afegir les terminacions a l'arrel en lloc de l'infinitiu complet.",
      "Oblidar que els irregulars només canvien l'arrel, no les terminacions.",
      "Confondre el futur de probabilitat amb el futur real.",
    ],
    usage: "S'usa per: (1) prediccions i accions futures, (2) promeses, (3) probabilitat en el present, (4) mandats formals. En la llengua col·loquial es prefereix «ir a + infinitiu» per al futur proper.",
    exampleVerbs: ["hablar", "comer", "vivir", "ser", "ir", "tener", "hacer", "poder", "decir", "venir"],
  },
  "condicional-simple": {
    slug: "condicional-simple",
    h1: "El condicional simple en espanyol",
    metaTitle: "Condicional simple en espanyol: ús i conjugació",
    metaDesc: "Guia completa del condicional simple en espanyol. Usos, terminacions, irregulars i diferència amb el futur.",
    intro: "El condicional simple expressa accions hipotètiques, desitjos educats i probabilitat en el passat. En anglès i català equivalent a «would + infinitiu».",
    formation: "Les terminacions s'afegeixen a l'infinitiu complet, com el futur. Els mateixos verbs irregulars en futur també ho són en condicional.",
    endings: [
      { person: "yo", ar: "-ía", er: "-ía", ir: "-ía" },
      { person: "tú", ar: "-ías", er: "-ías", ir: "-ías" },
      { person: "él/ella", ar: "-ía", er: "-ía", ir: "-ía" },
      { person: "nosotros", ar: "-íamos", er: "-íamos", ir: "-íamos" },
      { person: "vosotros", ar: "-íais", er: "-íais", ir: "-íais" },
      { person: "ellos/ellas", ar: "-ían", er: "-ían", ir: "-ían" },
    ],
    commonErrors: [
      "Confondre el condicional amb l'imperfet (terminacions similars -ía).",
      "Usar el condicional on es necessita el subjuntiu: «Si tuviera dinero, viajaría» (no «*Si tendría»).",
    ],
    usage: "S'usa per: (1) hipòtesis i condicions, (2) peticions educades, (3) probabilitat en el passat, (4) desitjos.",
    exampleVerbs: ["hablar", "comer", "vivir", "ser", "ir", "tener", "hacer", "poder", "querer", "venir"],
  },
  "subjuntiu-present": {
    slug: "subjuntiu-present",
    h1: "El present de subjuntiu en espanyol",
    metaTitle: "Present de subjuntiu en espanyol: ús i conjugació",
    metaDesc: "Aprèn el present de subjuntiu en espanyol: quan usar-lo, com formar-lo i els verbs irregulars principals.",
    intro: "El present de subjuntiu és el temps del subjuntiu més usat. Expressa desitjos, emocions, dubtes i situacions hipotètiques. El seu ús és un dels aspectes més difícils per als estudiants.",
    formation: "Es forma a partir de la primera persona del present d'indicatiu (traient la -o final) i afegint les terminacions oposades: els verbs -ar prenen terminacions de -er i viceversa.",
    endings: [
      { person: "yo", ar: "-e", er: "-a", ir: "-a" },
      { person: "tú", ar: "-es", er: "-as", ir: "-as" },
      { person: "él/ella", ar: "-e", er: "-a", ir: "-a" },
      { person: "nosotros", ar: "-emos", er: "-amos", ir: "-amos" },
      { person: "vosotros", ar: "-éis", er: "-áis", ir: "-áis" },
      { person: "ellos/ellas", ar: "-en", er: "-an", ir: "-an" },
    ],
    commonErrors: [
      "Oblidar usar el subjuntiu després de «que» amb canvi de subjecte i verbs de desig.",
      "No reconèixer els disparadors del subjuntiu: ojalá, quizás, para que, cuando (futur)...",
    ],
    usage: "S'usa després de: (1) expressions de desig, (2) expressions d'emoció, (3) expressions de dubte o negació, (4) expressions impersonals, (5) conjuncions.",
    exampleVerbs: ["hablar", "comer", "vivir", "ser", "ir", "estar", "tener", "hacer", "poder", "venir"],
  },
  "imperatiu": {
    slug: "imperatiu",
    h1: "L'imperatiu en espanyol",
    metaTitle: "L'imperatiu en espanyol: formes afirmatives i negatives",
    metaDesc: "Aprèn l'imperatiu en espanyol: formes afirmatives i negatives, verbs irregulars, posició dels pronoms i exemples.",
    intro: "L'imperatiu s'usa per donar ordres, instruccions, consells o peticions. En espanyol té formes afirmatives i negatives que són completament diferents.",
    formation: "L'imperatiu afirmatiu de «tú» és igual a la tercera persona del singular del present. Les altres formes s'extreuen del subjuntiu present. L'imperatiu negatiu es forma amb «no» + subjuntiu present.",
    endings: [
      { person: "tú (afirm.)", ar: "-a", er: "-e", ir: "-e" },
      { person: "él/usted", ar: "-e (subj.)", er: "-a (subj.)", ir: "-a (subj.)" },
      { person: "nosotros", ar: "-emos (subj.)", er: "-amos (subj.)", ir: "-amos (subj.)" },
      { person: "vosotros", ar: "-ad", er: "-ed", ir: "-id" },
      { person: "ellos/ustedes", ar: "-en (subj.)", er: "-an (subj.)", ir: "-an (subj.)" },
    ],
    commonErrors: [
      "Confondre l'imperatiu afirmatiu amb el negatiu: «¡Habla!» vs «¡No hables!»",
      "Oblidar els imperatius irregulars: di, haz, ve, pon, sal, sé, ten, ven.",
      "Col·locar malament els pronoms: afirmatiu van darrere; negatiu van davant.",
    ],
    usage: "S'usa per: (1) ordres directes, (2) instruccions, (3) consells, (4) peticions corteses, (5) prohibicions amb l'imperatiu negatiu.",
    exampleVerbs: ["hablar", "comer", "vivir", "ser", "ir", "tener", "hacer", "venir", "poner", "decir"],
  },
};

const TENSE_SLUGS_CA = Object.keys(TENSES_CA);

const SLUG_TO_TENSE_KEY: Record<string, string> = {
  "present-indicatiu": "presente",
  "preterit-indefinit": "preterito_indefinido",
  "preterit-imperfet": "preterito_imperfecto",
  "futur-simple": "futuro_simple",
  "condicional-simple": "condicional_simple",
  "subjuntiu-present": "subjuntivo_presente",
  "imperatiu": "imperativo_afirmativo",
};

const PERSONS_ES = ["yo", "tú", "él/ella", "nosotros", "vosotros", "ellos/ellas"];

export async function generateStaticParams() {
  return TENSE_SLUGS_CA.map((slug) => ({ lang: "ca", slug }));
}
export const revalidate = 86400;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  if (lang !== "ca") return {};
  const data = TENSES_CA[slug];
  if (!data) return {};
  const canonical = `${SITE_URL}/ca/temps/${slug}`;
  return {
    title: `${data.metaTitle} | ${SITE_NAME}`,
    description: data.metaDesc,
    alternates: { canonical },
    openGraph: { title: `${data.metaTitle} | ${SITE_NAME}`, description: data.metaDesc, url: canonical, siteName: SITE_NAME, locale: "ca_ES" },
  };
}

async function getExampleConjugations(tenseKey: string, verbSlugs: string[]) {
  const db = getDb();
  const placeholders = verbSlugs.map(() => "?").join(",");
  const result = await db.execute({
    sql: `SELECT infinitive, slug, type, conjugation_group, has_stem_change, stem_change FROM verbs WHERE lang = 'es' AND slug IN (${placeholders}) ORDER BY frequency_rank ASC`,
    args: verbSlugs,
  });
  return (result.rows as unknown as { infinitive: string; slug: string; type: string; conjugation_group: string; has_stem_change: number; stem_change: string | null }[]).map((row) => {
    const tenses = conjugateVerb(row.infinitive, row.conjugation_group, row.type, row.stem_change ?? undefined);
    const tenseData = tenses.find((t) => t.tense === tenseKey);
    return { infinitive: row.infinitive, slug: row.slug, forms: tenseData?.forms ?? [] };
  });
}

export default async function TempsPage({ params }: PageProps) {
  const { lang, slug } = await params;
  if (lang !== "ca") notFound();
  const data = TENSES_CA[slug];
  if (!data) notFound();

  const tenseKey = SLUG_TO_TENSE_KEY[slug] ?? "presente";
  const examples = await getExampleConjugations(tenseKey, data.exampleVerbs);

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `Com conjugar verbs en ${data.h1.replace("El ", "").replace("L'", "").replace(" en espanyol", "")}`,
    description: data.metaDesc,
    step: [
      { "@type": "HowToStep", position: 1, name: "Identifica el grup verbal", text: "Determina si el verb és -ar, -er o -ir mirant la terminació de l'infinitiu." },
      { "@type": "HowToStep", position: 2, name: "Elimina la terminació", text: "Elimina -ar, -er o -ir per obtenir l'arrel del verb." },
      { "@type": "HowToStep", position: 3, name: "Afegeix la terminació correcta", text: `Afegeix la terminació corresponent al ${data.h1.replace(" en espanyol", "").toLowerCase()}.` },
      { "@type": "HowToStep", position: 4, name: "Comprova si és irregular", text: "Verifica si el verb és irregular en aquell temps." },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <BreadcrumbNav crumbs={[
        { label: "Inici", href: "/ca" },
        { label: "Temps verbals", href: "/ca/temps" },
        { label: data.h1 },
      ]} />

      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-4">{data.h1}</h1>

      <div className="quick-answer bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-6">
        <p className="font-semibold text-green-900 dark:text-green-200 mb-2">Com es formen les terminacions?</p>
        <div className="overflow-x-auto">
          <table className="text-sm w-full">
            <thead><tr className="text-green-700 dark:text-green-300">
              <th className="text-left pr-4 pb-1">Persona</th>
              <th className="pr-4 pb-1 text-center">-AR</th>
              <th className="pr-4 pb-1 text-center">-ER</th>
              <th className="pb-1 text-center">-IR</th>
            </tr></thead>
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

      <section className="prose prose-sm dark:prose-invert max-w-none mb-6">
        <h2>Quan i com s'usa</h2>
        <p>{data.intro}</p>
        <h2>Usos principals</h2>
        <p>{data.usage}</p>
        <h2>Com es forma</h2>
        <p>{data.formation}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">Errors més comuns</h2>
        <ul className="space-y-2">
          {data.commonErrors.map((err, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
              <span className="text-red-500 mt-0.5 shrink-0">✗</span>
              <span>{err}</span>
            </li>
          ))}
        </ul>
      </section>

      <AdUnit slot="0987654321" format="rectangle" className="ad-rectangle" />

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">10 verbs conjugats</h2>
        <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-3 py-2 text-left sticky left-0 bg-gray-50 dark:bg-gray-800">Verb</th>
                {PERSONS_ES.map((p) => <th key={p} className="px-2 py-2 text-center font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap text-xs">{p}</th>)}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {examples.map(({ infinitive, slug: vs, forms }) => (
                <tr key={vs} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="px-3 py-2 font-medium sticky left-0 bg-white dark:bg-gray-900">
                    <Link href={`/ca/verb/${vs}`} className="text-green-600 dark:text-green-400 hover:underline">{infinitive}</Link>
                  </td>
                  {forms.slice(0, 6).map((f, i) => (
                    <td key={i} className={`px-2 py-2 text-center ${f.is_irregular ? "text-amber-700 dark:text-amber-400 font-semibold" : "text-gray-700 dark:text-gray-300"}`}>{f.form}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">Altres temps verbals</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {TENSE_SLUGS_CA.filter((s) => s !== slug).map((s) => (
            <Link key={s} href={`/ca/temps/${s}`} className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300 hover:border-green-400 hover:text-green-700 dark:hover:text-green-400 transition-colors">
              {TENSES_CA[s].h1.replace(" en espanyol", "").replace("El ", "").replace("L'", "")}
            </Link>
          ))}
        </div>
      </section>

      <AdUnit slot="1122334455" format="large-leaderboard" className="ad-large-leaderboard" />
    </>
  );
}

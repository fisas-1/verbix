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
  englishComparison: string;
  exampleVerbs: string[];
}

const TENSES_EN: Record<string, TenseData> = {
  "present-indicative": {
    slug: "present-indicative",
    h1: "The Spanish Present Indicative (Presente de indicativo)",
    metaTitle: "Spanish present indicative: how to conjugate and use it",
    metaDesc: "Complete guide to the Spanish present tense: conjugation rules, irregular verbs, stem changes and real examples. Perfect for English speakers learning Spanish.",
    intro: "The Spanish present tense (presente de indicativo) is the most common tense and the first one learners master. It expresses current actions, habits, general truths, and near-future events.",
    formation: "Remove the -ar, -er, or -ir ending from the infinitive to find the stem, then add the correct ending. Regular verbs follow predictable patterns; irregular verbs may change their stem or use unique endings.",
    endings: [
      { person: "I (yo)", ar: "-o", er: "-o", ir: "-o" },
      { person: "you (tú)", ar: "-as", er: "-es", ir: "-es" },
      { person: "he/she (él/ella)", ar: "-a", er: "-e", ir: "-e" },
      { person: "we (nosotros)", ar: "-amos", er: "-emos", ir: "-imos" },
      { person: "you all (vosotros)", ar: "-áis", er: "-éis", ir: "-ís" },
      { person: "they (ellos/ellas)", ar: "-an", er: "-en", ir: "-en" },
    ],
    commonErrors: [
      "Confusing -er and -ir endings in the nosotros form: comemos (we eat) vs. vivimos (we live).",
      "Forgetting that stem-changing verbs (e→ie, o→ue) only change in stressed syllables — NOT in nosotros/vosotros.",
      "Translating English progressive with present: «Estudio» = both «I study» AND «I am studying».",
    ],
    usage: "Use it for: (1) actions happening right now, (2) habits and routines, (3) universal truths, (4) historical present, (5) near-future with a time marker («Mañana viajo» = I'm traveling tomorrow).",
    englishComparison: "The Spanish present covers both English simple present («I speak») and present continuous («I am speaking»). To distinguish, use estar + gerund for actions in progress: «Estoy hablando» = «I am speaking».",
    exampleVerbs: ["hablar", "comer", "vivir", "ser", "ir", "tener", "hacer", "poder", "querer", "decir"],
  },
  "preterite": {
    slug: "preterite",
    h1: "The Spanish Preterite (Pretérito indefinido)",
    metaTitle: "Spanish preterite tense: conjugation and when to use it",
    metaDesc: "Master the Spanish preterite tense: how to conjugate it, irregular verbs, and the difference with the imperfect. With real examples for English speakers.",
    intro: "The Spanish preterite (pretérito indefinido) expresses completed past actions at a specific moment in time. It is one of two main past tenses and one of the most important to master as an English speaker.",
    formation: "Add the preterite endings to the infinitive stem. Many common verbs (ser, ir, estar, tener, hacer, venir, poder, poner, saber, querer) have completely irregular preterite stems that must be memorized.",
    endings: [
      { person: "I (yo)", ar: "-é", er: "-í", ir: "-í" },
      { person: "you (tú)", ar: "-aste", er: "-iste", ir: "-iste" },
      { person: "he/she (él/ella)", ar: "-ó", er: "-ió", ir: "-ió" },
      { person: "we (nosotros)", ar: "-amos", er: "-imos", ir: "-imos" },
      { person: "you all (vosotros)", ar: "-asteis", er: "-isteis", ir: "-isteis" },
      { person: "they (ellos/ellas)", ar: "-aron", er: "-ieron", ir: "-ieron" },
    ],
    commonErrors: [
      "Using the preterite when the imperfect is needed: preterite = completed action; imperfect = ongoing/habitual.",
      "Forgetting accents: «hablé» and «habló» — without accents the meaning changes.",
      "Ser and ir share identical preterite forms (fui, fuiste…): context tells them apart.",
    ],
    usage: "Use it for: (1) specific completed past events («Yesterday I went to the doctor»), (2) actions that interrupt ongoing actions, (3) a series of sequential past events, (4) finished time periods.",
    englishComparison: "The preterite corresponds to English simple past («I spoke», «she ran»). Unlike English, Spanish has a SECOND past tense (imperfect) for background descriptions and habitual past actions. This distinction does not exist in English.",
    exampleVerbs: ["hablar", "comer", "vivir", "ser", "ir", "estar", "tener", "hacer", "poder", "venir"],
  },
  "imperfect": {
    slug: "imperfect",
    h1: "The Spanish Imperfect (Pretérito imperfecto)",
    metaTitle: "Spanish imperfect tense: when to use it vs. the preterite",
    metaDesc: "Learn the Spanish imperfect tense: habitual past, descriptions, and ongoing actions. How it differs from the preterite. Essential for English speakers.",
    intro: "The Spanish imperfect (pretérito imperfecto) describes past habits, ongoing states, and background descriptions. It is the second main past tense and the main source of confusion for English speakers.",
    formation: "The imperfect is highly regular. Only three verbs are irregular: ser (era), ir (iba), ver (veía). The -er and -ir endings are identical.",
    endings: [
      { person: "I (yo)", ar: "-aba", er: "-ía", ir: "-ía" },
      { person: "you (tú)", ar: "-abas", er: "-ías", ir: "-ías" },
      { person: "he/she (él/ella)", ar: "-aba", er: "-ía", ir: "-ía" },
      { person: "we (nosotros)", ar: "-ábamos", er: "-íamos", ir: "-íamos" },
      { person: "you all (vosotros)", ar: "-abais", er: "-íais", ir: "-íais" },
      { person: "they (ellos/ellas)", ar: "-aban", er: "-ían", ir: "-ían" },
    ],
    commonErrors: [
      "Using the preterite for background descriptions — use imperfect instead.",
      "Thinking the imperfect = «used to» only. It also translates as «was -ing» and simple past for states.",
      "Forgetting that ser, ir, ver are the only three irregular imperfects.",
    ],
    usage: "Use it for: (1) past habits («I used to eat at noon»), (2) past descriptions («She was tall»), (3) ongoing past actions («It was raining»), (4) time, age, mental states in the past.",
    englishComparison: "The imperfect covers three English structures: «used to + verb» (habitual), «was/were + -ing» (ongoing), and simple past for states (not events). Key question: was the action a completed EVENT? → preterite. Was it a BACKGROUND STATE or HABIT? → imperfect.",
    exampleVerbs: ["hablar", "comer", "vivir", "ser", "ir", "ver", "estar", "tener", "poder", "querer"],
  },
  "future-simple": {
    slug: "future-simple",
    h1: "The Spanish Future Tense (Futuro simple)",
    metaTitle: "Spanish future tense: conjugation, irregular verbs and uses",
    metaDesc: "Learn the Spanish future tense: how to form it, irregular verbs, and when to use it vs. «ir a + infinitive». Complete guide for English speakers.",
    intro: "The Spanish future tense (futuro simple) expresses future actions. It is formed by adding endings directly to the full infinitive — one of the easiest tenses to form.",
    formation: "Add the same set of endings to ALL infinitives (-ar/-er/-ir) without removing the infinitive ending. Only ~12 verbs change their stem: decir→dir-, hacer→har-, poder→podr-, poner→pondr-, querer→querr-, saber→sabr-, salir→saldr-, tener→tendr-, valer→valdr-, venir→vendr-.",
    endings: [
      { person: "I (yo)", ar: "-é", er: "-é", ir: "-é" },
      { person: "you (tú)", ar: "-ás", er: "-ás", ir: "-ás" },
      { person: "he/she (él/ella)", ar: "-á", er: "-á", ir: "-á" },
      { person: "we (nosotros)", ar: "-emos", er: "-emos", ir: "-emos" },
      { person: "you all (vosotros)", ar: "-éis", er: "-éis", ir: "-éis" },
      { person: "they (ellos/ellas)", ar: "-án", er: "-án", ir: "-án" },
    ],
    commonErrors: [
      "Adding endings to the stem instead of the full infinitive.",
      "Forgetting that irregular verbs only change the stem, not the endings.",
      "Confusing the future of probability («Will it be 3pm?» = ¿Serán las 3?) with a real future.",
    ],
    usage: "Use it for: (1) predictions and future actions, (2) promises, (3) probability/supposition about the present, (4) formal commands (biblical style). In spoken Spanish, «ir a + infinitive» is more common for near future.",
    englishComparison: "Corresponds to English «will + verb». However, for near-future plans (English «going to»), Spanish speakers often prefer «ir a + infinitive»: «Voy a llamarte» (I'm going to call you) rather than «Te llamaré».",
    exampleVerbs: ["hablar", "comer", "vivir", "ser", "ir", "tener", "hacer", "poder", "decir", "venir"],
  },
  "conditional": {
    slug: "conditional",
    h1: "The Spanish Conditional (Condicional simple)",
    metaTitle: "Spanish conditional tense: conjugation and when to use it",
    metaDesc: "Master the Spanish conditional tense: how to form it, irregular verbs, and polite requests. Complete guide for English speakers learning Spanish.",
    intro: "The Spanish conditional (condicional simple) expresses hypothetical actions, polite requests, and probability in the past. It corresponds to English «would + verb».",
    formation: "Same as the future: add endings to the full infinitive. Same set of ~12 irregular stems as the future tense (decir→dir-, hacer→har-, poder→podr-, etc.).",
    endings: [
      { person: "I (yo)", ar: "-ía", er: "-ía", ir: "-ía" },
      { person: "you (tú)", ar: "-ías", er: "-ías", ir: "-ías" },
      { person: "he/she (él/ella)", ar: "-ía", er: "-ía", ir: "-ía" },
      { person: "we (nosotros)", ar: "-íamos", er: "-íamos", ir: "-íamos" },
      { person: "you all (vosotros)", ar: "-íais", er: "-íais", ir: "-íais" },
      { person: "they (ellos/ellas)", ar: "-ían", er: "-ían", ir: "-ían" },
    ],
    commonErrors: [
      "Using conditional after «si» (if): «Si tuviera dinero, viajaría» — NEVER «*Si tendría dinero».",
      "Confusing the conditional with the imperfect (both end in -ía): context is key.",
      "Using «would» for habitual past (English habit) — Spanish uses the imperfect, not conditional.",
    ],
    usage: "Use it for: (1) hypothetical situations with «if» clauses, (2) polite requests («¿Podrías ayudarme?»), (3) probability in the past, (4) reported speech («She said she would come»).",
    englishComparison: "Corresponds to «would + verb» in most contexts. Important exception: «I would always eat there» (habitual past) = «Siempre comía allí» (imperfect), NOT conditional. «Would» for habit → imperfect. «Would» for hypothesis → conditional.",
    exampleVerbs: ["hablar", "comer", "vivir", "ser", "ir", "tener", "hacer", "poder", "querer", "venir"],
  },
  "present-subjunctive": {
    slug: "present-subjunctive",
    h1: "The Spanish Present Subjunctive (Presente de subjuntivo)",
    metaTitle: "Spanish present subjunctive: how to form and use it",
    metaDesc: "Complete guide to the Spanish present subjunctive: when to use it, how to form it, and triggers. The toughest Spanish tense explained for English speakers.",
    intro: "The Spanish present subjunctive is one of the most challenging aspects for English speakers because English has almost abandoned it. It expresses desires, emotions, doubts, recommendations, and hypothetical situations.",
    formation: "Formed from the first-person singular of the present indicative (drop the -o): this captures any yo irregularity. Then add the opposite vowel: -ar verbs use -e endings; -er/-ir verbs use -a endings.",
    endings: [
      { person: "I (yo)", ar: "-e", er: "-a", ir: "-a" },
      { person: "you (tú)", ar: "-es", er: "-as", ir: "-as" },
      { person: "he/she (él/ella)", ar: "-e", er: "-a", ir: "-a" },
      { person: "we (nosotros)", ar: "-emos", er: "-amos", ir: "-amos" },
      { person: "you all (vosotros)", ar: "-éis", er: "-áis", ir: "-áis" },
      { person: "they (ellos/ellas)", ar: "-en", er: "-an", ir: "-an" },
    ],
    commonErrors: [
      "Not using subjunctive after «que» when there is a change of subject + verb of desire/emotion.",
      "Missing the subjunctive trigger: ojalá, quizás, tal vez, para que, cuando (future), aunque, etc.",
      "Confusing present subjunctive with present indicative: «(él) hable» vs. «(él) habla».",
    ],
    usage: "Required after: (1) wish verbs + que (quiero que vengas), (2) emotional expressions (me alegra que estés aquí), (3) doubt or denial (dudo que venga), (4) impersonal expressions (es importante que estudies), (5) certain conjunctions.",
    englishComparison: "English uses «that he be», «I suggest that she study» (rare). In Spanish it is mandatory in these contexts. English speakers often say «que viene» when «que venga» is needed — the subjunctive cannot be skipped.",
    exampleVerbs: ["hablar", "comer", "vivir", "ser", "ir", "estar", "tener", "hacer", "poder", "venir"],
  },
  "imperative": {
    slug: "imperative",
    h1: "The Spanish Imperative (Imperativo)",
    metaTitle: "Spanish imperative mood: affirmative and negative commands",
    metaDesc: "Learn the Spanish imperative: affirmative and negative commands, irregular forms, pronoun placement. Essential guide for English speakers.",
    intro: "The Spanish imperative is used for commands, instructions, advice, and requests. It has separate affirmative and negative forms, which is one of the trickiest aspects for English speakers.",
    formation: "Affirmative tú: same as 3rd person singular present. Other affirmative forms equal the present subjunctive. Negative imperative: «no» + present subjunctive for ALL persons.",
    endings: [
      { person: "tú (affirm.)", ar: "-a", er: "-e", ir: "-e" },
      { person: "él/usted", ar: "-e (subj.)", er: "-a (subj.)", ir: "-a (subj.)" },
      { person: "nosotros", ar: "-emos (subj.)", er: "-amos (subj.)", ir: "-amos (subj.)" },
      { person: "vosotros", ar: "-ad", er: "-ed", ir: "-id" },
      { person: "ellos/ustedes", ar: "-en (subj.)", er: "-an (subj.)", ir: "-an (subj.)" },
    ],
    commonErrors: [
      "Affirmative ≠ negative: «¡Habla!» but «¡No hables!» (completely different forms).",
      "Forgetting irregular affirmative forms: di (decir), haz (hacer), ve (ir/ver), pon, sal, sé, ten, ven.",
      "Pronoun placement: affirmative → attached after verb («Dímelo»); negative → before verb («No me lo digas»).",
    ],
    usage: "Use for: (1) direct commands («Sit down!» = ¡Siéntate!), (2) instructions (recipes, manuals), (3) advice, (4) polite requests with «por favor», (5) prohibitions with negative imperative.",
    englishComparison: "English has one imperative (\"Speak!\", \"Don't speak!\"). Spanish has separate affirmative and negative forms, uses subjunctive for formal/plural commands (usted/ustedes), and attaches object pronouns to affirmative verbs. More complex but very regular once learned.",
    exampleVerbs: ["hablar", "comer", "vivir", "ser", "ir", "tener", "hacer", "venir", "poner", "decir"],
  },
};

const TENSE_SLUGS_EN = Object.keys(TENSES_EN);

const SLUG_TO_TENSE_KEY: Record<string, string> = {
  "present-indicative": "presente",
  "preterite": "preterito_indefinido",
  "imperfect": "preterito_imperfecto",
  "future-simple": "futuro_simple",
  "conditional": "condicional_simple",
  "present-subjunctive": "subjuntivo_presente",
  "imperative": "imperativo_afirmativo",
};

const PERSONS_EN = ["I (yo)", "you (tú)", "he/she (él/ella)", "we (nosotros)", "you all (vosotros)", "they (ellos/ellas)"];

export async function generateStaticParams() {
  return TENSE_SLUGS_EN.map((slug) => ({ lang: "en", slug }));
}
export const revalidate = 86400;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  if (lang !== "en") return {};
  const data = TENSES_EN[slug];
  if (!data) return {};
  const canonical = `${SITE_URL}/en/tenses/${slug}`;
  return {
    title: `${data.metaTitle} | ${SITE_NAME}`,
    description: data.metaDesc,
    alternates: { canonical },
    openGraph: { title: `${data.metaTitle} | ${SITE_NAME}`, description: data.metaDesc, url: canonical, siteName: SITE_NAME, locale: "en_US" },
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

export default async function TensesPage({ params }: PageProps) {
  const { lang, slug } = await params;
  if (lang !== "en") notFound();
  const data = TENSES_EN[slug];
  if (!data) notFound();

  const tenseKey = SLUG_TO_TENSE_KEY[slug] ?? "presente";
  const examples = await getExampleConjugations(tenseKey, data.exampleVerbs);

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to conjugate Spanish verbs in the ${data.h1.replace("The Spanish ", "").replace(/\s*\(.+\)/, "")}`,
    description: data.metaDesc,
    step: [
      { "@type": "HowToStep", position: 1, name: "Find the verb group", text: "Determine if the verb is -ar, -er, or -ir by looking at the infinitive ending." },
      { "@type": "HowToStep", position: 2, name: "Find the stem", text: "Remove the -ar, -er, or -ir ending to get the verb stem." },
      { "@type": "HowToStep", position: 3, name: "Add the correct ending", text: `Add the ${data.slug} ending for each grammatical person.` },
      { "@type": "HowToStep", position: 4, name: "Check for irregularities", text: "Verify whether the verb is irregular in this tense and apply any stem changes." },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <BreadcrumbNav crumbs={[
        { label: "Home", href: "/en" },
        { label: "Spanish tenses", href: "/en/tenses" },
        { label: data.h1.replace("The Spanish ", "").replace(/\s*\(.+\)/, "") },
      ]} />

      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-4">{data.h1}</h1>

      {/* Quick answer */}
      <div className="quick-answer bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-6">
        <p className="font-semibold text-green-900 dark:text-green-200 mb-2">Endings at a glance</p>
        <div className="overflow-x-auto">
          <table className="text-sm w-full">
            <thead><tr className="text-green-700 dark:text-green-300">
              <th className="text-left pr-4 pb-1">Person</th>
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
        <h2>What is it and when to use it?</h2>
        <p>{data.intro}</p>
        <h2>Main uses</h2>
        <p>{data.usage}</p>
        <h2>How to form it</h2>
        <p>{data.formation}</p>
        <h2>Comparison with English</h2>
        <p className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded p-3 not-prose text-sm text-blue-900 dark:text-blue-200">{data.englishComparison}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">Common mistakes</h2>
        <ul className="space-y-2">
          {data.commonErrors.map((err, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
              <span className="text-red-500 mt-0.5 shrink-0">✗</span><span>{err}</span>
            </li>
          ))}
        </ul>
      </section>

      <AdUnit slot="0987654321" format="rectangle" className="ad-rectangle" />

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">10 verbs conjugated</h2>
        <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-3 py-2 text-left sticky left-0 bg-gray-50 dark:bg-gray-800">Verb</th>
                {PERSONS_EN.map((p) => <th key={p} className="px-2 py-2 text-center font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap text-xs">{p}</th>)}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {examples.map(({ infinitive, slug: vs, forms }) => (
                <tr key={vs} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="px-3 py-2 font-medium sticky left-0 bg-white dark:bg-gray-900">
                    <Link href={`/en/verb/${vs}`} className="text-green-600 dark:text-green-400 hover:underline">{infinitive}</Link>
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
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">Other Spanish tenses</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {TENSE_SLUGS_EN.filter((s) => s !== slug).map((s) => (
            <Link key={s} href={`/en/tenses/${s}`} className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300 hover:border-green-400 hover:text-green-700 dark:hover:text-green-400 transition-colors">
              {TENSES_EN[s].h1.replace("The Spanish ", "").replace(/\s*\(.+\)/, "")}
            </Link>
          ))}
        </div>
      </section>

      <AdUnit slot="1122334455" format="large-leaderboard" className="ad-large-leaderboard" />
    </>
  );
}

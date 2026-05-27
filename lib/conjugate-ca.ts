import irregularData from "@/data/seed/irregular-stems-ca.json";
import type { TenseConjugation, ConjugatedForm, Mood, Tense } from "./conjugate";

export type CaPerson = "jo" | "tu" | "ell/ella" | "nosaltres" | "vosaltres" | "ells/elles";
const CA_PERSONS: CaPerson[] = ["jo", "tu", "ell/ella", "nosaltres", "vosaltres", "ells/elles"];

// Auxiliary "haver" forms used in compound tenses
const HAVER: Record<string, Record<CaPerson, string>> = {
  present: {
    "jo": "he", "tu": "has", "ell/ella": "ha",
    "nosaltres": "hem", "vosaltres": "heu", "ells/elles": "han",
  },
  imperfect: {
    "jo": "havia", "tu": "havies", "ell/ella": "havia",
    "nosaltres": "havíem", "vosaltres": "havíeu", "ells/elles": "havien",
  },
  future: {
    "jo": "hauré", "tu": "hauràs", "ell/ella": "haurà",
    "nosaltres": "haurem", "vosaltres": "haureu", "ells/elles": "hauran",
  },
  conditional: {
    "jo": "hauria", "tu": "hauries", "ell/ella": "hauria",
    "nosaltres": "hauríem", "vosaltres": "hauríeu", "ells/elles": "haurien",
  },
  subj_present: {
    "jo": "hagi", "tu": "hagis", "ell/ella": "hagi",
    "nosaltres": "hàgim", "vosaltres": "hàgiu", "ells/elles": "hagin",
  },
  subj_imperfect: {
    "jo": "hagués", "tu": "haguessis", "ell/ella": "hagués",
    "nosaltres": "haguéssim", "vosaltres": "haguéssiu", "ells/elles": "haguessin",
  },
};

// Periphrastic past auxiliary "anar"
const ANAR_PRET: Record<CaPerson, string> = {
  "jo": "vaig", "tu": "vas", "ell/ella": "va",
  "nosaltres": "vam", "vosaltres": "vau", "ells/elles": "van",
};

// Regular -ar endings
const AR_ENDINGS: Record<string, Record<CaPerson, string>> = {
  present:    { "jo": "o", "tu": "es", "ell/ella": "a", "nosaltres": "em", "vosaltres": "eu", "ells/elles": "en" },
  imperfect:  { "jo": "ava", "tu": "aves", "ell/ella": "ava", "nosaltres": "àvem", "vosaltres": "àveu", "ells/elles": "aven" },
  future:     { "jo": "aré", "tu": "aràs", "ell/ella": "arà", "nosaltres": "arem", "vosaltres": "areu", "ells/elles": "aran" },
  conditional:{ "jo": "aria", "tu": "aries", "ell/ella": "aria", "nosaltres": "aríem", "vosaltres": "aríeu", "ells/elles": "arien" },
  subj_present: { "jo": "i", "tu": "is", "ell/ella": "i", "nosaltres": "em", "vosaltres": "eu", "ells/elles": "in" },
  subj_imperfect: { "jo": "és", "tu": "essis", "ell/ella": "és", "nosaltres": "éssim", "vosaltres": "éssiu", "ells/elles": "essin" },
};

// Regular -ir pure endings (dormir, sentir)
const IR_PURE_ENDINGS: Record<string, Record<CaPerson, string>> = {
  present:    { "jo": "o", "tu": "s", "ell/ella": "", "nosaltres": "im", "vosaltres": "iu", "ells/elles": "en" },
  imperfect:  { "jo": "ia", "tu": "ies", "ell/ella": "ia", "nosaltres": "íem", "vosaltres": "íeu", "ells/elles": "ien" },
  future:     { "jo": "iré", "tu": "iràs", "ell/ella": "irà", "nosaltres": "irem", "vosaltres": "ireu", "ells/elles": "iran" },
  conditional:{ "jo": "iria", "tu": "iries", "ell/ella": "iria", "nosaltres": "iríem", "vosaltres": "iríeu", "ells/elles": "irien" },
  subj_present: { "jo": "i", "tu": "is", "ell/ella": "i", "nosaltres": "im", "vosaltres": "iu", "ells/elles": "in" },
  subj_imperfect: { "jo": "és", "tu": "essis", "ell/ella": "és", "nosaltres": "éssim", "vosaltres": "éssiu", "ells/elles": "essin" },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getIrreg(infinitive: string): Record<string, any> | undefined {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (irregularData as Record<string, any>)[infinitive];
}

function getRoot(infinitive: string): string {
  if (infinitive.endsWith("ar")) return infinitive.slice(0, -2);
  if (infinitive.endsWith("er")) return infinitive.slice(0, -2);
  if (infinitive.endsWith("re")) return infinitive.slice(0, -2);
  if (infinitive.endsWith("ir")) return infinitive.slice(0, -2);
  return infinitive.slice(0, -2);
}

function getParticiple(infinitive: string, group: string, irreg?: Record<string, string>): string {
  if (irreg?.participle) return irreg.participle;
  const root = getRoot(infinitive);
  if (group === "ar") return root + "at";
  if (group === "er" || infinitive.endsWith("re")) return root + "ut";
  return root + "it"; // -ir
}

function getGerund(infinitive: string, group: string, irreg?: Record<string, string>): string {
  if (irreg?.gerund) return irreg.gerund;
  const root = getRoot(infinitive);
  if (group === "ar") return root + "ant";
  if (group === "ir") return root + "int";
  return root + "ent"; // -er/-re
}

export function conjugateCaVerb(
  infinitive: string,
  group: string,
): TenseConjugation[] {
  const irreg = getIrreg(infinitive);
  const root = getRoot(infinitive);
  const participle = getParticiple(infinitive, group, irreg);
  const gerund = getGerund(infinitive, group, irreg);
  const isAr = group === "ar";
  const endings = isAr ? AR_ENDINGS : IR_PURE_ENDINGS;

  function fromIrreg(tenseKey: string): ConjugatedForm[] | null {
    const data = irreg?.[tenseKey] as Record<CaPerson, string> | undefined;
    if (!data) return null;
    return CA_PERSONS.map((p) => ({
      person: p,
      form: data[p] ?? "—",
      is_irregular: true,
    }));
  }

  function regular(tenseKey: string, stemOverride?: string): ConjugatedForm[] {
    const e = endings[tenseKey];
    if (!e) return CA_PERSONS.map((p) => ({ person: p, form: "—", is_irregular: false }));
    const stem = stemOverride ?? root;
    return CA_PERSONS.map((p) => ({
      person: p,
      form: stem + e[p],
      is_irregular: false,
    }));
  }

  function buildTense(tenseKey: string, stemOverride?: string): ConjugatedForm[] {
    return fromIrreg(tenseKey) ?? regular(tenseKey, stemOverride);
  }

  // For future/conditional: use full infinitive as stem
  function buildFutureOrConditional(tenseKey: string): ConjugatedForm[] {
    if (irreg?.[tenseKey]) return fromIrreg(tenseKey)!;
    const e = endings[tenseKey];
    if (!e) return CA_PERSONS.map((p) => ({ person: p, form: "—", is_irregular: false }));
    return CA_PERSONS.map((p) => ({
      person: p,
      form: infinitive + e[p],
      is_irregular: false,
    }));
  }

  function compound(haverTense: string): ConjugatedForm[] {
    const aux = HAVER[haverTense];
    return CA_PERSONS.map((p) => ({
      person: p,
      form: `${aux[p]} ${participle}`,
      is_irregular: false,
    }));
  }

  function periphrastic(): ConjugatedForm[] {
    return CA_PERSONS.map((p) => ({
      person: p,
      form: `${ANAR_PRET[p]} ${infinitive}`,
      is_irregular: false,
    }));
  }

  function buildImperative(): ConjugatedForm[] {
    const irregImp = irreg?.imperative as Record<CaPerson, string> | undefined;
    const subjForms = buildTense("subj_present");
    const presForms = buildTense("present");

    return CA_PERSONS.map((p) => {
      if (p === "jo") return { person: p, form: "—", is_irregular: false };
      if (irregImp?.[p]) return { person: p, form: irregImp[p], is_irregular: true };
      if (p === "tu") {
        // tú imperative = 3rd sg present for -ar; or 2nd sg present minus -s for -ir
        const el = presForms.find((f) => f.person === "ell/ella")?.form ?? root + (isAr ? "a" : "");
        return { person: p, form: el, is_irregular: false };
      }
      const subj = subjForms.find((f) => f.person === p)?.form ?? "—";
      return { person: p, form: subj, is_irregular: false };
    });
  }

  function buildNegImperative(): ConjugatedForm[] {
    const subjForms = buildTense("subj_present");
    return CA_PERSONS.map((p) => {
      if (p === "jo") return { person: p, form: "—", is_irregular: false };
      const subj = subjForms.find((f) => f.person === p)?.form ?? "—";
      return { person: p, form: subj === "—" ? "—" : `no ${subj}`, is_irregular: false };
    });
  }

  const presentForms = buildTense("present");
  const imperfectForms = buildTense("imperfect");
  const futureForms = buildFutureOrConditional("future");
  const condForms = buildFutureOrConditional("conditional");
  const subjPresForms = buildTense("subj_present");
  const subjImpForms = buildTense("subj_imperfect");

  return [
    { tense: "presente" as Tense, label: "Present", mood: "indicativo" as Mood, forms: presentForms },
    { tense: "preterito_indefinido" as Tense, label: "Pretèrit perifràstic", mood: "indicativo" as Mood, forms: periphrastic() },
    { tense: "preterito_imperfecto" as Tense, label: "Pretèrit imperfet", mood: "indicativo" as Mood, forms: imperfectForms },
    { tense: "preterito_perfecto" as Tense, label: "Pretèrit perfet", mood: "indicativo" as Mood, forms: compound("present") },
    { tense: "preterito_pluscuamperfecto" as Tense, label: "Plusquamperfet", mood: "indicativo" as Mood, forms: compound("imperfect") },
    { tense: "futuro_simple" as Tense, label: "Futur simple", mood: "indicativo" as Mood, forms: futureForms },
    { tense: "futuro_compuesto" as Tense, label: "Futur perfet", mood: "indicativo" as Mood, forms: compound("future") },
    { tense: "condicional_simple" as Tense, label: "Condicional simple", mood: "indicativo" as Mood, forms: condForms },
    { tense: "condicional_compuesto" as Tense, label: "Condicional perfet", mood: "indicativo" as Mood, forms: compound("conditional") },
    { tense: "subjuntivo_presente" as Tense, label: "Present de subjuntiu", mood: "subjuntivo" as Mood, forms: subjPresForms },
    { tense: "subjuntivo_imperfecto_ra" as Tense, label: "Imperfet de subjuntiu", mood: "subjuntivo" as Mood, forms: subjImpForms },
    { tense: "subjuntivo_perfecto" as Tense, label: "Pretèrit perfet de subjuntiu", mood: "subjuntivo" as Mood, forms: compound("subj_present") },
    { tense: "subjuntivo_pluscuamperfecto" as Tense, label: "Plusquamperfet de subjuntiu", mood: "subjuntivo" as Mood, forms: compound("subj_imperfect") },
    { tense: "imperativo_afirmativo" as Tense, label: "Imperatiu afirmatiu", mood: "imperativo" as Mood, forms: buildImperative() },
    { tense: "imperativo_negativo" as Tense, label: "Imperatiu negatiu", mood: "imperativo" as Mood, forms: buildNegImperative() },
  ];
}

export function getCaNonPersonalForms(
  infinitive: string,
  group: string,
): { gerundio: string; participio: string; infinitivo_compuesto: string } {
  const irreg = getIrreg(infinitive);
  const participle = getParticiple(infinitive, group, irreg);
  const gerund = getGerund(infinitive, group, irreg);
  return {
    gerundio: gerund,
    participio: participle,
    infinitivo_compuesto: `haver ${participle}`,
  };
}

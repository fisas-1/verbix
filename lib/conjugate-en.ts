import type { TenseConjugation, ConjugatedForm, Mood, Tense } from "./conjugate";

export type EnPerson = "I" | "you" | "he/she/it" | "we" | "you (pl.)" | "they";
const EN_PERSONS: EnPerson[] = ["I", "you", "he/she/it", "we", "you (pl.)", "they"];

interface EnIrregForms {
  past: string;
  past_participle: string;
  present_participle?: string;
  present_3sg?: string;
  present_1sg?: string;
  present_pl?: string;
  past_1sg?: string;
  past_pl?: string;
}

const IRREGULAR: Record<string, EnIrregForms> = {
  be: {
    past: "was", past_participle: "been", present_participle: "being",
    present_1sg: "am", present_3sg: "is", present_pl: "are",
    past_1sg: "was", past_pl: "were",
  },
  have: { past: "had", past_participle: "had", present_participle: "having", present_3sg: "has" },
  do: { past: "did", past_participle: "done", present_participle: "doing", present_3sg: "does" },
  say: { past: "said", past_participle: "said", present_participle: "saying" },
  go: { past: "went", past_participle: "gone", present_participle: "going", present_3sg: "goes" },
  get: { past: "got", past_participle: "got" },
  make: { past: "made", past_participle: "made" },
  know: { past: "knew", past_participle: "known" },
  think: { past: "thought", past_participle: "thought" },
  take: { past: "took", past_participle: "taken" },
  see: { past: "saw", past_participle: "seen" },
  come: { past: "came", past_participle: "come" },
  find: { past: "found", past_participle: "found" },
  give: { past: "gave", past_participle: "given" },
  tell: { past: "told", past_participle: "told" },
  feel: { past: "felt", past_participle: "felt" },
  become: { past: "became", past_participle: "become" },
  leave: { past: "left", past_participle: "left" },
  put: { past: "put", past_participle: "put" },
  mean: { past: "meant", past_participle: "meant" },
  keep: { past: "kept", past_participle: "kept" },
  let: { past: "let", past_participle: "let" },
  begin: { past: "began", past_participle: "begun" },
  show: { past: "showed", past_participle: "shown" },
  hear: { past: "heard", past_participle: "heard" },
  run: { past: "ran", past_participle: "run", present_participle: "running" },
  hold: { past: "held", past_participle: "held" },
  bring: { past: "brought", past_participle: "brought" },
  write: { past: "wrote", past_participle: "written" },
  sit: { past: "sat", past_participle: "sat", present_participle: "sitting" },
  stand: { past: "stood", past_participle: "stood" },
  lose: { past: "lost", past_participle: "lost" },
  pay: { past: "paid", past_participle: "paid" },
  meet: { past: "met", past_participle: "met" },
};

function get3sg(base: string, irreg?: EnIrregForms): string {
  if (irreg?.present_3sg) return irreg.present_3sg;
  if (base.endsWith("s") || base.endsWith("sh") || base.endsWith("ch") || base.endsWith("x") || base.endsWith("z")) return base + "es";
  if (base.endsWith("y") && !"aeiou".includes(base[base.length - 2])) return base.slice(0, -1) + "ies";
  if (base.endsWith("o")) return base + "es";
  return base + "s";
}

function getIng(base: string, irreg?: EnIrregForms): string {
  if (irreg?.present_participle) return irreg.present_participle;
  // Drop silent -e
  if (base.endsWith("e") && !base.endsWith("ee")) return base.slice(0, -1) + "ing";
  // Double final consonant (CVC pattern)
  const last = base[base.length - 1];
  const secondLast = base[base.length - 2];
  const thirdLast = base[base.length - 3];
  const isConsonant = (c: string) => c && !"aeiou".includes(c);
  const isVowel = (c: string) => c && "aeiou".includes(c);
  if (base.length >= 3 && isConsonant(last) && isVowel(secondLast) && isConsonant(thirdLast) && !["w", "x", "y"].includes(last)) {
    return base + last + "ing";
  }
  return base + "ing";
}

function getPast(base: string, irreg?: EnIrregForms): string {
  if (irreg?.past) return irreg.past;
  if (base.endsWith("e")) return base + "d";
  if (base.endsWith("y") && !"aeiou".includes(base[base.length - 2])) return base.slice(0, -1) + "ied";
  return base + "ed";
}

function getPP(base: string, irreg?: EnIrregForms): string {
  return irreg?.past_participle ?? getPast(base, irreg);
}

function form(p: EnPerson): ConjugatedForm {
  return { person: p, form: "", is_irregular: false };
}

export function conjugateEnVerb(infinitive: string): TenseConjugation[] {
  const irreg = IRREGULAR[infinitive];
  const ing = getIng(infinitive, irreg);
  const past = getPast(infinitive, irreg);
  const pp = getPP(infinitive, irreg);
  const sg3 = get3sg(infinitive, irreg);

  function presentSimple(): ConjugatedForm[] {
    return EN_PERSONS.map((p) => {
      let f: string;
      if (p === "I") f = irreg?.present_1sg ?? infinitive;
      else if (p === "he/she/it") f = sg3;
      else f = irreg?.present_pl ?? infinitive;
      return { person: p, form: f, is_irregular: !!irreg };
    });
  }

  function presentContinuous(): ConjugatedForm[] {
    const aux: Record<EnPerson, string> = {
      "I": "am", "you": "are", "he/she/it": "is",
      "we": "are", "you (pl.)": "are", "they": "are",
    };
    return EN_PERSONS.map((p) => ({ ...form(p), form: `${aux[p]} ${ing}` }));
  }

  function presentPerfect(): ConjugatedForm[] {
    const aux: Record<EnPerson, string> = {
      "I": "have", "you": "have", "he/she/it": "has",
      "we": "have", "you (pl.)": "have", "they": "have",
    };
    return EN_PERSONS.map((p) => ({ ...form(p), form: `${aux[p]} ${pp}`, is_irregular: !!irreg }));
  }

  function pastSimple(): ConjugatedForm[] {
    return EN_PERSONS.map((p) => {
      let f = past;
      if (p === "I" && irreg?.past_1sg) f = irreg.past_1sg;
      if ((p === "we" || p === "you (pl.)" || p === "they") && irreg?.past_pl) f = irreg.past_pl;
      return { person: p, form: f, is_irregular: !!irreg };
    });
  }

  function pastContinuous(): ConjugatedForm[] {
    const aux: Record<EnPerson, string> = {
      "I": "was", "you": "were", "he/she/it": "was",
      "we": "were", "you (pl.)": "were", "they": "were",
    };
    return EN_PERSONS.map((p) => ({ ...form(p), form: `${aux[p]} ${ing}` }));
  }

  function pastPerfect(): ConjugatedForm[] {
    return EN_PERSONS.map((p) => ({ ...form(p), form: `had ${pp}`, is_irregular: !!irreg }));
  }

  function futurSimple(): ConjugatedForm[] {
    return EN_PERSONS.map((p) => ({ ...form(p), form: `will ${infinitive}` }));
  }

  function futureGoingTo(): ConjugatedForm[] {
    const aux: Record<EnPerson, string> = {
      "I": "am going to", "you": "are going to", "he/she/it": "is going to",
      "we": "are going to", "you (pl.)": "are going to", "they": "are going to",
    };
    return EN_PERSONS.map((p) => ({ ...form(p), form: `${aux[p]} ${infinitive}` }));
  }

  function conditional(): ConjugatedForm[] {
    return EN_PERSONS.map((p) => ({ ...form(p), form: `would ${infinitive}` }));
  }

  function conditionalPerfect(): ConjugatedForm[] {
    return EN_PERSONS.map((p) => ({ ...form(p), form: `would have ${pp}`, is_irregular: !!irreg }));
  }

  return [
    { tense: "presente" as Tense, label: "Present Simple", mood: "indicativo" as Mood, forms: presentSimple() },
    { tense: "presente_continuo" as Tense, label: "Present Continuous", mood: "indicativo" as Mood, forms: presentContinuous() },
    { tense: "preterito_perfecto" as Tense, label: "Present Perfect", mood: "indicativo" as Mood, forms: presentPerfect() },
    { tense: "preterito_indefinido" as Tense, label: "Past Simple", mood: "indicativo" as Mood, forms: pastSimple() },
    { tense: "preterito_continuo" as Tense, label: "Past Continuous", mood: "indicativo" as Mood, forms: pastContinuous() },
    { tense: "preterito_pluscuamperfecto" as Tense, label: "Past Perfect", mood: "indicativo" as Mood, forms: pastPerfect() },
    { tense: "futuro_simple" as Tense, label: "Future Simple (will)", mood: "indicativo" as Mood, forms: futurSimple() },
    { tense: "futuro_going_to" as Tense, label: "Future (going to)", mood: "indicativo" as Mood, forms: futureGoingTo() },
    { tense: "condicional_simple" as Tense, label: "Conditional", mood: "indicativo" as Mood, forms: conditional() },
    { tense: "condicional_compuesto" as Tense, label: "Conditional Perfect", mood: "indicativo" as Mood, forms: conditionalPerfect() },
  ];
}

export function getEnNonPersonalForms(
  infinitive: string,
): { gerundio: string; participio: string; infinitivo_compuesto: string } {
  const irreg = IRREGULAR[infinitive];
  const pp = getPP(infinitive, irreg);
  const ing = getIng(infinitive, irreg);
  return {
    gerundio: ing,
    participio: pp,
    infinitivo_compuesto: `to have ${pp}`,
  };
}

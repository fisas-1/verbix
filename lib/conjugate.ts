import irregularStems from "@/data/seed/irregular-stems.json";

export type Mood = "indicativo" | "subjuntivo" | "imperativo" | "no_personal";
export type Tense =
  | "presente"
  | "preterito_indefinido"
  | "preterito_imperfecto"
  | "preterito_perfecto"
  | "preterito_pluscuamperfecto"
  | "futuro_simple"
  | "futuro_compuesto"
  | "condicional_simple"
  | "condicional_compuesto"
  | "subjuntivo_presente"
  | "subjuntivo_imperfecto_ra"
  | "subjuntivo_imperfecto_se"
  | "subjuntivo_perfecto"
  | "subjuntivo_pluscuamperfecto"
  | "subjuntivo_futuro"
  | "imperativo_afirmativo"
  | "imperativo_negativo";

export type Person =
  | "yo"
  | "tú"
  | "él"
  | "nosotros"
  | "vosotros"
  | "ellos";

export interface ConjugatedForm {
  person: Person;
  form: string;
  is_irregular: boolean;
}

export interface TenseConjugation {
  tense: Tense;
  label: string;
  mood: Mood;
  forms: ConjugatedForm[];
}

const PERSONS: Person[] = ["yo", "tú", "él", "nosotros", "vosotros", "ellos"];

const AR_ENDINGS: Record<string, Record<Person, string>> = {
  presente: { yo: "o", tú: "as", él: "a", nosotros: "amos", vosotros: "áis", ellos: "an" },
  preterito_indefinido: { yo: "é", tú: "aste", él: "ó", nosotros: "amos", vosotros: "asteis", ellos: "aron" },
  preterito_imperfecto: { yo: "aba", tú: "abas", él: "aba", nosotros: "ábamos", vosotros: "abais", ellos: "aban" },
  futuro_simple: { yo: "é", tú: "ás", él: "á", nosotros: "emos", vosotros: "éis", ellos: "án" },
  condicional_simple: { yo: "ía", tú: "ías", él: "ía", nosotros: "íamos", vosotros: "íais", ellos: "ían" },
  subjuntivo_presente: { yo: "e", tú: "es", él: "e", nosotros: "emos", vosotros: "éis", ellos: "en" },
  subjuntivo_imperfecto_ra: { yo: "ara", tú: "aras", él: "ara", nosotros: "áramos", vosotros: "arais", ellos: "aran" },
  subjuntivo_imperfecto_se: { yo: "ase", tú: "ases", él: "ase", nosotros: "ásemos", vosotros: "aseis", ellos: "asen" },
};

const ER_ENDINGS: Record<string, Record<Person, string>> = {
  presente: { yo: "o", tú: "es", él: "e", nosotros: "emos", vosotros: "éis", ellos: "en" },
  preterito_indefinido: { yo: "í", tú: "iste", él: "ió", nosotros: "imos", vosotros: "isteis", ellos: "ieron" },
  preterito_imperfecto: { yo: "ía", tú: "ías", él: "ía", nosotros: "íamos", vosotros: "íais", ellos: "ían" },
  futuro_simple: { yo: "é", tú: "ás", él: "á", nosotros: "emos", vosotros: "éis", ellos: "án" },
  condicional_simple: { yo: "ía", tú: "ías", él: "ía", nosotros: "íamos", vosotros: "íais", ellos: "ían" },
  subjuntivo_presente: { yo: "a", tú: "as", él: "a", nosotros: "amos", vosotros: "áis", ellos: "an" },
  subjuntivo_imperfecto_ra: { yo: "iera", tú: "ieras", él: "iera", nosotros: "iéramos", vosotros: "ierais", ellos: "ieran" },
  subjuntivo_imperfecto_se: { yo: "iese", tú: "ieses", él: "iese", nosotros: "iésemos", vosotros: "ieseis", ellos: "iesen" },
};

const IR_ENDINGS: Record<string, Record<Person, string>> = {
  presente: { yo: "o", tú: "es", él: "e", nosotros: "imos", vosotros: "ís", ellos: "en" },
  preterito_indefinido: { yo: "í", tú: "iste", él: "ió", nosotros: "imos", vosotros: "isteis", ellos: "ieron" },
  preterito_imperfecto: { yo: "ía", tú: "ías", él: "ía", nosotros: "íamos", vosotros: "íais", ellos: "ían" },
  futuro_simple: { yo: "é", tú: "ás", él: "á", nosotros: "emos", vosotros: "éis", ellos: "án" },
  condicional_simple: { yo: "ía", tú: "ías", él: "ía", nosotros: "íamos", vosotros: "íais", ellos: "ían" },
  subjuntivo_presente: { yo: "a", tú: "as", él: "a", nosotros: "amos", vosotros: "áis", ellos: "an" },
  subjuntivo_imperfecto_ra: { yo: "iera", tú: "ieras", él: "iera", nosotros: "iéramos", vosotros: "ierais", ellos: "ieran" },
  subjuntivo_imperfecto_se: { yo: "iese", tú: "ieses", él: "iese", nosotros: "iésemos", vosotros: "ieseis", ellos: "iesen" },
};

function getRoot(infinitive: string, group: string): string {
  if (group === "ar") return infinitive.slice(0, -2);
  if (group === "er") return infinitive.slice(0, -2);
  if (group === "ir") return infinitive.slice(0, -2);
  return infinitive.slice(0, -2);
}

function applyStemChange(
  root: string,
  stemChange: string,
  person: Person
): string {
  const stressedPersons: Person[] = ["yo", "tú", "él", "ellos"];
  if (!stressedPersons.includes(person)) return root;

  if (stemChange === "e→ie") return root.replace(/e(?=[^aeiouáéíóú]*$)/, "ie");
  if (stemChange === "o→ue") return root.replace(/o(?=[^aeiouáéíóú]*$)/, "ue");
  if (stemChange === "e→i") return root.replace(/e(?=[^aeiouáéíóú]*$)/, "i");
  if (stemChange === "u→ue") return root.replace(/u(?=[^aeiouáéíóú]*$)/, "ue");
  return root;
}

function getHaber(tense: string, person: Person): string {
  const haberForms: Record<string, Record<Person, string>> = {
    presente: { yo: "he", tú: "has", él: "ha", nosotros: "hemos", vosotros: "habéis", ellos: "han" },
    preterito_imperfecto: { yo: "había", tú: "habías", él: "había", nosotros: "habíamos", vosotros: "habíais", ellos: "habían" },
    futuro_simple: { yo: "habré", tú: "habrás", él: "habrá", nosotros: "habremos", vosotros: "habréis", ellos: "habrán" },
    condicional_simple: { yo: "habría", tú: "habrías", él: "habría", nosotros: "habríamos", vosotros: "habríais", ellos: "habrían" },
    subjuntivo_presente: { yo: "haya", tú: "hayas", él: "haya", nosotros: "hayamos", vosotros: "hayáis", ellos: "hayan" },
    subjuntivo_imperfecto_ra: { yo: "hubiera", tú: "hubieras", él: "hubiera", nosotros: "hubiéramos", vosotros: "hubierais", ellos: "hubieran" },
  };
  return haberForms[tense]?.[person] ?? "haber";
}

function getParticiple(infinitive: string, group: string, irregular?: Record<string, string>): string {
  if (irregular?.participio) return irregular.participio;
  const root = getRoot(infinitive, group);
  if (group === "ar") return root + "ado";
  return root + "ido";
}

function getGerund(infinitive: string, group: string, irregular?: Record<string, string>): string {
  if (irregular?.gerundio) return irregular.gerundio;
  const root = getRoot(infinitive, group);
  if (group === "ar") return root + "ando";
  return root + "iendo";
}

export function conjugateVerb(
  infinitive: string,
  group: string,
  type: string,
  stemChange?: string
): TenseConjugation[] {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const irregularData = (irregularStems as Record<string, any>)[infinitive];
  const endings = group === "ar" ? AR_ENDINGS : group === "er" ? ER_ENDINGS : IR_ENDINGS;
  const root = getRoot(infinitive, group);
  const participle = getParticiple(infinitive, group, irregularData);
  const gerund = getGerund(infinitive, group, irregularData);

  function conjugateTense(tenseKey: string): ConjugatedForm[] {
    return PERSONS.map((person) => {
      const irregTense = irregularData?.[tenseKey] as Record<Person, string> | undefined;
      if (irregTense?.[person]) {
        return { person, form: irregTense[person], is_irregular: true };
      }

      const tenseEndings = endings[tenseKey];
      if (!tenseEndings) return { person, form: "—", is_irregular: false };

      let r = root;
      if (stemChange && type === "irregular") {
        r = applyStemChange(root, stemChange, person);
      }

      // Future and conditional use full infinitive + ending
      if (tenseKey === "futuro_simple" || tenseKey === "condicional_simple") {
        const irregFuture = (irregularData as Record<string, Record<Person, string>>)?.[tenseKey];
        if (irregFuture?.[person]) return { person, form: irregFuture[person], is_irregular: true };
        return { person, form: infinitive + tenseEndings[person], is_irregular: false };
      }

      return { person, form: r + tenseEndings[person], is_irregular: false };
    });
  }

  function compoundTense(haberTense: string): ConjugatedForm[] {
    return PERSONS.map((person) => ({
      person,
      form: `${getHaber(haberTense, person)} ${participle}`,
      is_irregular: false,
    }));
  }

  function subjuntivoImperfectoRaForms(): ConjugatedForm[] {
    const irregPret = (irregularData?.preterito_indefinido as Record<Person, string>) ?? {};
    return PERSONS.map((person) => {
      const base3sg = irregPret["ellos"] ?? (root + (group === "ar" ? "aron" : "ieron"));
      const stem = base3sg.replace(/ron$/, "");
      const suffixes: Record<Person, string> = {
        yo: "ra", tú: "ras", él: "ra", nosotros: "ramos", vosotros: "rais", ellos: "ran",
      };
      const accent: Record<Person, boolean> = {
        yo: false, tú: false, él: false, nosotros: true, vosotros: false, ellos: false,
      };
      let form = stem + suffixes[person];
      if (accent[person]) {
        form = stem.slice(0, -1) + stem.slice(-1).replace(/a/, "á").replace(/e/, "é").replace(/i/, "í") + suffixes[person];
      }
      return { person, form, is_irregular: type === "irregular" };
    });
  }

  function imperativoAfirmativo(): ConjugatedForm[] {
    const irregImp = (irregularData?.imperativo_afirmativo as Record<Person, string>) ?? {};
    return PERSONS.map((person) => {
      if (person === "yo") return { person, form: "—", is_irregular: false };
      if (irregImp[person]) return { person, form: irregImp[person], is_irregular: true };

      const subjForms = conjugateTense("subjuntivo_presente");
      const subjMap: Record<Person, string> = Object.fromEntries(
        subjForms.map((f) => [f.person, f.form])
      ) as Record<Person, string>;

      if (person === "tú") {
        // regular: 3rd person singular present indicative
        const presForms = conjugateTense("presente");
        const presEl = presForms.find((f) => f.person === "él")?.form ?? root + "a";
        return { person, form: presEl, is_irregular: false };
      }
      return { person, form: subjMap[person] ?? "—", is_irregular: false };
    });
  }

  function imperativoNegativo(): ConjugatedForm[] {
    const subjForms = conjugateTense("subjuntivo_presente");
    return PERSONS.map((person) => {
      if (person === "yo") return { person, form: "—", is_irregular: false };
      const subj = subjForms.find((f) => f.person === person)?.form ?? "—";
      return { person, form: subj === "—" ? "—" : `no ${subj}`, is_irregular: false };
    });
  }

  return [
    { tense: "presente", label: "Presente", mood: "indicativo", forms: conjugateTense("presente") },
    { tense: "preterito_indefinido", label: "Pretérito Indefinido", mood: "indicativo", forms: conjugateTense("preterito_indefinido") },
    { tense: "preterito_imperfecto", label: "Pretérito Imperfecto", mood: "indicativo", forms: conjugateTense("preterito_imperfecto") },
    { tense: "preterito_perfecto", label: "Pretérito Perfecto Compuesto", mood: "indicativo", forms: compoundTense("presente") },
    { tense: "preterito_pluscuamperfecto", label: "Pretérito Pluscuamperfecto", mood: "indicativo", forms: compoundTense("preterito_imperfecto") },
    { tense: "futuro_simple", label: "Futuro Simple", mood: "indicativo", forms: conjugateTense("futuro_simple") },
    { tense: "futuro_compuesto", label: "Futuro Compuesto", mood: "indicativo", forms: compoundTense("futuro_simple") },
    { tense: "condicional_simple", label: "Condicional Simple", mood: "indicativo", forms: conjugateTense("condicional_simple") },
    { tense: "condicional_compuesto", label: "Condicional Compuesto", mood: "indicativo", forms: compoundTense("condicional_simple") },
    { tense: "subjuntivo_presente", label: "Presente de Subjuntivo", mood: "subjuntivo", forms: conjugateTense("subjuntivo_presente") },
    { tense: "subjuntivo_imperfecto_ra", label: "Imperfecto de Subjuntivo (-ra)", mood: "subjuntivo", forms: subjuntivoImperfectoRaForms() },
    { tense: "subjuntivo_imperfecto_se", label: "Imperfecto de Subjuntivo (-se)", mood: "subjuntivo", forms: conjugateTense("subjuntivo_imperfecto_se") },
    { tense: "subjuntivo_perfecto", label: "Pretérito Perfecto de Subjuntivo", mood: "subjuntivo", forms: compoundTense("subjuntivo_presente") },
    { tense: "subjuntivo_pluscuamperfecto", label: "Pluscuamperfecto de Subjuntivo", mood: "subjuntivo", forms: compoundTense("subjuntivo_imperfecto_ra") },
    { tense: "imperativo_afirmativo", label: "Imperativo Afirmativo", mood: "imperativo", forms: imperativoAfirmativo() },
    { tense: "imperativo_negativo", label: "Imperativo Negativo", mood: "imperativo", forms: imperativoNegativo() },
  ];
}

export function getNonPersonalForms(
  infinitive: string,
  group: string,
  irregular?: Record<string, string>
): { gerundio: string; participio: string; infinitivo_compuesto: string; gerundio_compuesto: string } {
  const gerundio = getGerund(infinitive, group, irregular);
  const participio = getParticiple(infinitive, group, irregular);
  return {
    gerundio,
    participio,
    infinitivo_compuesto: `haber ${participio}`,
    gerundio_compuesto: `habiendo ${participio}`,
  };
}

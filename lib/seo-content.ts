import type { Verb } from "./verbs";
import type { TenseConjugation } from "./conjugate";

interface VerbSeoContent {
  intro: string;
  presentUsage: string;
  pastFuture: string;
  irregularities: string;
  expressions: string;
  related: string;
}

// Known expressions per verb (top 50)
const EXPRESSIONS: Record<string, string[]> = {
  hablar: ["hablar por los codos (to talk a lot)", "no hablar más del asunto (to drop the subject)", "hablar en plata (to speak plainly)"],
  ser: ["ser pan comido (to be a piece of cake)", "ser la leche (to be amazing/terrible)", "no es para tanto (it's no big deal)"],
  estar: ["estar en las nubes (to daydream)", "estar hecho polvo (to be exhausted)", "estar al tanto (to be up to date)"],
  tener: ["tener ganas de (to feel like)", "no tener pelos en la lengua (to be outspoken)", "tener en cuenta (to keep in mind)"],
  hacer: ["hacer la vista gorda (to turn a blind eye)", "hacer las paces (to make up)", "hacerse el tonto (to play dumb)"],
  poder: ["no poder más (to be at one's limit)", "a más no poder (as much as possible)", "puede que (maybe)"],
  decir: ["dicho y hecho (no sooner said than done)", "¿qué quieres decir? (what do you mean?)", "es decir (that is to say)"],
  ir: ["ir al grano (to get to the point)", "ir de mal en peor (to go from bad to worse)", "irse por las ramas (to beat around the bush)"],
  ver: ["ya veremos (we'll see)", "ver las estrellas (to see stars / be in great pain)", "a ver (let's see)"],
  dar: ["dar en el clavo (to hit the nail on the head)", "dar igual (not to matter)", "dar a luz (to give birth)"],
  saber: ["saber a (to taste like)", "que yo sepa (as far as I know)", "saber de memoria (to know by heart)"],
  querer: ["querer decir (to mean)", "quien bien te quiere te hará llorar (tough love)", "como quieras (as you wish)"],
  llegar: ["llegar a tiempo (to arrive on time)", "llegar lejos (to go far in life)", "llegar a ser (to become)"],
  venir: ["venir al caso (to be relevant)", "venir como anillo al dedo (to fit perfectly)", "venir bien (to suit)"],
  poner: ["poner en marcha (to set in motion)", "poner al día (to bring up to date)", "poner verde a alguien (to criticize harshly)"],
  salir: ["salir adelante (to get ahead)", "salir el tiro por la culata (to backfire)", "salir a la luz (to come to light)"],
  volver: ["volver a + infinitivo (to do again)", "volver en sí (to come back to one's senses)", "volverse loco (to go crazy)"],
  conocer: ["conocer de vista (to know by sight)", "dar a conocer (to make known)", "conocer el paño (to know the ropes)"],
  vivir: ["vivir al día (to live from day to day)", "vivir del cuento (to live off others)", "costar vida y milagros (to cost a lot)"],
  sentir: ["lo siento (I'm sorry)", "sentir en el alma (to deeply regret)", "¡qué pena! (what a shame!)"],
  trabajar: ["trabajar como una mula (to work like a mule)", "trabajo en equipo (teamwork)", "buen trabajo (good job)"],
  escribir: ["escribir a mano (to write by hand)", "escribir entre líneas (to read between the lines)", "poner por escrito (to put in writing)"],
  buscar: ["buscarle tres pies al gato (to look for trouble)", "buscarse la vida (to fend for oneself)", "buscar con lupa (to scrutinize)"],
  encontrar: ["encontrarse bien/mal (to feel well/unwell)", "encontrar la horma de su zapato (to meet one's match)"],
  recordar: ["si mal no recuerdo (if I remember correctly)", "que en paz descanse (may he/she rest in peace)"],
  empezar: ["empezar con buen pie (to start on the right foot)", "de principio a fin (from start to finish)"],
  escuchar: ["escucha (listen up)", "hacer oídos sordos (to turn a deaf ear)"],
  estudiar: ["estudiar de memoria (to memorize)", "estudiar a fondo (to study thoroughly)"],
  comprar: ["comprar a granel (to buy in bulk)", "comprar gato por liebre (to be swindled)"],
  comer: ["comer como un cerdo (to eat like a pig)", "comer el coco (to brainwash)", "no hay mal que por bien no venga (every cloud has a silver lining)"],
};

// Related verbs per verb
const RELATED: Record<string, string[]> = {
  hablar: ["decir", "contar", "comunicar", "charlar"],
  ser: ["estar", "parecer", "resultar", "convertirse"],
  estar: ["ser", "encontrarse", "hallarse", "quedarse"],
  tener: ["poseer", "contar", "disponer", "mantener"],
  hacer: ["realizar", "efectuar", "crear", "producir"],
  poder: ["conseguir", "lograr", "ser capaz", "permitirse"],
  decir: ["hablar", "contar", "mencionar", "afirmar"],
  ir: ["venir", "marchar", "dirigirse", "acudir"],
  ver: ["mirar", "observar", "contemplar", "visualizar"],
  dar: ["entregar", "ofrecer", "proporcionar", "donar"],
  saber: ["conocer", "entender", "comprender", "manejar"],
  querer: ["amar", "desear", "anhelar", "apreciar"],
  llegar: ["arribar", "venir", "aparecer", "alcanzar"],
  venir: ["llegar", "acudir", "aparecer", "presentarse"],
  poner: ["colocar", "situar", "ubicar", "depositar"],
  salir: ["marcharse", "irse", "partir", "escapar"],
  volver: ["regresar", "retornar", "reaparecer", "repetir"],
  conocer: ["saber", "reconocer", "identificar", "familiarizarse"],
  vivir: ["residir", "habitar", "existir", "morar"],
  sentir: ["notar", "percibir", "experimentar", "emocionarse"],
  trabajar: ["laborar", "funcionar", "operar", "esforzarse"],
  escribir: ["redactar", "anotar", "transcribir", "componer"],
  buscar: ["investigar", "explorar", "rastrear", "indagar"],
  encontrar: ["hallar", "descubrir", "localizar", "topar"],
  recordar: ["acordarse", "memorizar", "rememorar", "evocar"],
  empezar: ["comenzar", "iniciar", "arrancar", "abrir"],
  escuchar: ["oír", "atender", "prestar atención", "escuchar"],
  estudiar: ["aprender", "investigar", "analizar", "repasar"],
  comprar: ["adquirir", "obtener", "conseguir", "pagar"],
  comer: ["alimentarse", "ingerir", "degustar", "consumir"],
};

export function generateVerbSeoContent(
  verb: Verb,
  tenses: TenseConjugation[],
  lang = "es"
): VerbSeoContent | null {
  if (lang === "ca") return generateVerbSeoContentCA(verb, tenses);
  if (lang === "en") return generateVerbSeoContentEN(verb, tenses);
  if (lang !== "es") return null;

  const { infinitive, type, conjugation_group, stem_change, translation_en } = verb;
  const isIrr = type === "irregular";
  const isRef = type === "reflexive";
  const group = conjugation_group.toUpperCase();
  const trans = translation_en ? ` (en inglés: "${translation_en}")` : "";

  // Get present tense forms
  const presenteTense = tenses.find((t) => t.tense === "presente");
  const yo = presenteTense?.forms.find((f) => f.person === "yo")?.form ?? `${infinitive.slice(0, -2)}o`;
  const tu = presenteTense?.forms.find((f) => f.person === "tú")?.form ?? "";
  const el = presenteTense?.forms.find((f) => f.person === "él")?.form ?? "";
  const nos = presenteTense?.forms.find((f) => f.person === "nosotros")?.form ?? "";

  // Get indefinido forms
  const indefinidoTense = tenses.find((t) => t.tense === "preterito_indefinido");
  const yoPret = indefinidoTense?.forms.find((f) => f.person === "yo")?.form ?? "";
  const elPret = indefinidoTense?.forms.find((f) => f.person === "él")?.form ?? "";

  // Get futuro forms
  const futuroTense = tenses.find((t) => t.tense === "futuro_simple");
  const yoFut = futuroTense?.forms.find((f) => f.person === "yo")?.form ?? "";

  // §1 Intro
  const typeLabel = isIrr
    ? `irregular${stem_change ? ` con cambio de raíz ${stem_change}` : ""}`
    : isRef
    ? "reflexivo"
    : `regular del grupo -${conjugation_group}`;

  const intro = `El verbo "${infinitive}"${trans} es uno de los verbos más utilizados del español. Se trata de un verbo ${typeLabel}. Conjugar ${infinitive} es fundamental para cualquier estudiante de español, ya que aparece en innumerables situaciones cotidianas: en conversaciones familiares, contextos laborales y comunicación digital. La conjugación de ${infinitive} sigue el patrón del grupo -${conjugation_group}${isIrr ? ", aunque presenta formas irregulares que conviene memorizar" : " de forma completamente regular"}.`;

  // §2 Present
  const presentUsage = `El uso de ${infinitive} en presente es muy frecuente. ${isIrr && stem_change ? `Ten en cuenta que en presente ${infinitive} sufre el cambio de raíz ${stem_change} en las personas tónicas (yo, tú, él/ella, ellos/ellas). ` : ""}Las formas del presente de indicativo son: yo ${yo}, tú ${tu}, él/ella ${el}, nosotros ${nos}. Cómo usar ${infinitive} en presente: expresa acciones habituales («Siempre ${yo} cuando puedo»), estados actuales («Ahora mismo ${el}») y verdades generales. En frases interrogativas: «¿${tu.charAt(0).toUpperCase() + tu.slice(1)} mucho?» Es uno de los tiempos que más se trabajan en el nivel A1-A2 del MCER.`;

  // §3 Past & future
  const pastFuture = `El ${infinitive} en pasado también tiene gran importancia. En pretérito indefinido: yo ${yoPret}, él/ella ${elPret}${isIrr ? " (formas irregulares que hay que memorizar)" : " (sigue la conjugación regular)"}. El indefinido de ${infinitive} se usa para acciones pasadas completadas: «Ayer ${yoPret} durante horas». En pretérito imperfecto indica hábitos o acciones continuas en el pasado. Para el futuro simple: yo ${yoFut}, lo que permite expresar predicciones y promesas: «Mañana ${yoFut} sin falta». La diferencia entre el pretérito de ${infinitive} e imperfecto es clave: el indefinido enfatiza el resultado, el imperfecto la continuidad.`;

  // §4 Irregularities
  let irregularities: string;
  if (isIrr && stem_change) {
    irregularities = `${infinitive} es un verbo irregular con cambio de raíz ${stem_change}. Este cambio afecta a las personas con acento en la raíz (yo, tú, él/ella, ellos/ellas) pero NO a nosotros ni vosotros. ${stem_change === "e→ie" ? `Por ejemplo, la "e" de la raíz se convierte en "ie": hablar → hablo pero querer → quiero.` : stem_change === "o→ue" ? `La "o" de la raíz se convierte en "ue" en las formas tónicas.` : stem_change === "e→i" ? `La "e" de la raíz se convierte en "i" en las formas tónicas y en el gerundio.` : ""} Al conjugar ${infinitive}, recuerda siempre aplicar este cambio en las formas correspondientes.`;
  } else if (isIrr) {
    irregularities = `${infinitive} es un verbo irregular con formas propias que se apartan del patrón regular del grupo -${conjugation_group}. Especialmente en el presente de indicativo (${yo}), el pretérito indefinido y el futuro/condicional. Estas formas irregulares son muy frecuentes, por lo que vale la pena memorizarlas. La práctica constante con ${infinitive} hará que estas formas se vuelvan automáticas.`;
  } else if (isRef) {
    irregularities = `${infinitive} es un verbo reflexivo, lo que significa que siempre va acompañado de un pronombre reflexivo (me, te, se, nos, os, se). Al conjugarlo, el pronombre reflexivo concuerda con el sujeto: yo me ${yo.replace(/me |se /g, "")}, tú te ${tu.replace(/me |te /g, "")}… La posición del pronombre cambia según el modo: en indicativo e imperfecto va antes del verbo, en infinitivo y gerundio puede ir detrás.`;
  } else {
    irregularities = `${infinitive} es un verbo completamente regular del grupo -${conjugation_group}. Esto significa que sigue exactamente el mismo patrón de terminaciones que todos los verbos regulares de este grupo. Una vez que conoces las terminaciones (-${conjugation_group === "ar" ? "o, -as, -a, -amos, -áis, -an" : conjugation_group === "er" ? "o, -es, -e, -emos, -éis, -en" : "o, -es, -e, -imos, -ís, -en"}), puedes conjugar ${infinitive} en cualquier tiempo sin problemas adicionales.`;
  }

  // §5 Expressions
  const exprList = EXPRESSIONS[infinitive];
  const expressions = exprList
    ? `El verbo ${infinitive} aparece en varias expresiones y frases hechas del español: ${exprList.join("; ")}. Conocer estas expresiones te permitirá sonar más natural cuando hablas español y entender mejor a los hablantes nativos.`
    : `El verbo ${infinitive} se usa en múltiples expresiones del español cotidiano. Por ejemplo: "${infinitive} bien/mal algo" (to do something well/badly), "sin ${infinitive}" (without ${translation_en?.replace("to ", "") ?? infinitive}). Aprende estas colocaciones para enriquecer tu vocabulario y sonar más natural en conversaciones.`;

  // §6 Related verbs
  const relatedList = RELATED[infinitive];
  const related = relatedList
    ? `Verbos relacionados con ${infinitive}: ${relatedList.map((r) => `**${r}**`).join(", ")}. Si ya dominas ${infinitive}, estos verbos sinónimos o antónimos te ayudarán a ampliar tu vocabulario y expresarte con mayor precisión en español.`
    : `Si quieres ampliar tu vocabulario relacionado con "${infinitive}", explora también: verbos del mismo grupo -${conjugation_group} como ${conjugation_group === "ar" ? "hablar, trabajar, estudiar" : conjugation_group === "er" ? "comer, beber, comprender" : "vivir, escribir, recibir"}. Practica la conjugación de todos ellos para consolidar los patrones de este grupo verbal.`;

  return { intro, presentUsage, pastFuture, irregularities, expressions, related };
}

// ─────────────────────────────────────────────────────────────────────────────
// CATALÀ
// ─────────────────────────────────────────────────────────────────────────────
function generateVerbSeoContentCA(verb: Verb, tenses: TenseConjugation[]): VerbSeoContent {
  const { infinitive, type, conjugation_group, stem_change, translation_en } = verb;
  const isIrr = type === "irregular";
  const isRef = type === "reflexive";
  const trans = translation_en ? ` (en anglès: "${translation_en}")` : "";

  const presenteTense = tenses.find((t) => t.tense === "presente");
  const yo = presenteTense?.forms.find((f) => f.person === "yo")?.form ?? "";
  const tu = presenteTense?.forms.find((f) => f.person === "tú")?.form ?? "";
  const el = presenteTense?.forms.find((f) => f.person === "él")?.form ?? "";
  const nos = presenteTense?.forms.find((f) => f.person === "nosotros")?.form ?? "";

  const indefinidoTense = tenses.find((t) => t.tense === "preterito_indefinido");
  const yoPret = indefinidoTense?.forms.find((f) => f.person === "yo")?.form ?? "";
  const elPret = indefinidoTense?.forms.find((f) => f.person === "él")?.form ?? "";

  const futuroTense = tenses.find((t) => t.tense === "futuro_simple");
  const yoFut = futuroTense?.forms.find((f) => f.person === "yo")?.form ?? "";

  const typeLabel = isIrr
    ? `irregular${stem_change ? ` amb canvi d'arrel ${stem_change}` : ""}`
    : isRef ? "reflexiu" : `regular del grup -${conjugation_group}`;

  const intro = `El verb "${infinitive}"${trans} és un dels verbs més utilitzats de l'espanyol. Es tracta d'un verb ${typeLabel}. Conjugar ${infinitive} és fonamental per a qualsevol estudiant d'espanyol, ja que apareix en innombrables situacions quotidianes. La conjugació de ${infinitive} segueix el patró del grup -${conjugation_group}${isIrr ? ", tot i que presenta formes irregulars que convé memoritzar" : " de forma completament regular"}.`;

  const presentUsage = `L'ús de ${infinitive} en present és molt freqüent. ${isIrr && stem_change ? `Tingues en compte que en present ${infinitive} pateix el canvi d'arrel ${stem_change} en les persones tòniques. ` : ""}Les formes del present d'indicatiu són: yo ${yo}, tú ${tu}, él/ella ${el}, nosotros ${nos}. Com usar ${infinitive} en present: expressa accions habituals, estats actuals i veritats generals.`;

  const pastFuture = `El ${infinitive} en passat és igualment important. En pretèrit indefinit: yo ${yoPret}, él/ella ${elPret}${isIrr ? " (formes irregulars que cal memoritzar)" : " (segueix la conjugació regular)"}. L'indefinit s'usa per a accions passades completades: «Ahir ${yoPret} durant hores». Per al futur simple: yo ${yoFut}, la qual cosa permet expressar prediccions i promeses. La diferència entre el pretèrit indefinit i l'imperfet de ${infinitive} és clau: l'indefinit emfatitza el resultat, l'imperfet la continuïtat.`;

  const irregularities = isIrr && stem_change
    ? `${infinitive} és un verb irregular amb canvi d'arrel ${stem_change}. Aquest canvi afecta les persones amb accent a l'arrel (yo, tú, él/ella, ellos/ellas) però NO a nosotros ni vosotros. Al conjugar ${infinitive}, recorda sempre aplicar aquest canvi en les formes corresponents.`
    : isRef
    ? `${infinitive} és un verb reflexiu que sempre va acompanyat d'un pronom reflexiu (me, te, se, nos, os, se). En conjugar-lo, el pronom concorda amb el subjecte. La posició del pronom canvia segons el mode verbal.`
    : isIrr
    ? `${infinitive} és un verb irregular amb formes pròpies que s'aparten del patró regular del grup -${conjugation_group}. Especialment en el present d'indicatiu (${yo}), el pretèrit indefinit i el futur/condicional. La pràctica constant farà que aquestes formes es tornin automàtiques.`
    : `${infinitive} és un verb completament regular del grup -${conjugation_group}. Segueix exactament el mateix patró de terminacions que tots els verbs regulars d'aquest grup. Un cop coneixes les terminacions, pots conjugar ${infinitive} en qualsevol temps sense dificultats addicionals.`;

  const exprList = EXPRESSIONS[infinitive];
  const expressions = exprList
    ? `El verb ${infinitive} apareix en diverses expressions i frases fetes de l'espanyol: ${exprList.join("; ")}. Conèixer aquestes expressions et permetrà sonar més natural quan parles espanyol.`
    : `El verb ${infinitive} s'usa en múltiples expressions de l'espanyol quotidià. Aprèn les col·locacions més freqüents per enriquir el teu vocabulari i sonar més natural en les converses.`;

  const relatedList = RELATED[infinitive];
  const related = relatedList
    ? `Verbs relacionats amb ${infinitive}: ${relatedList.join(", ")}. Si ja domines ${infinitive}, aquests verbs sinònims o antònims t'ajudaran a ampliar el teu vocabulari en espanyol.`
    : `Per ampliar el teu vocabulari relacionat amb "${infinitive}", explora també els verbs del mateix grup -${conjugation_group}. Practica la conjugació de tots ells per consolidar els patrons d'aquest grup verbal.`;

  return { intro, presentUsage, pastFuture, irregularities, expressions, related };
}

// ─────────────────────────────────────────────────────────────────────────────
// ANGLÈS
// ─────────────────────────────────────────────────────────────────────────────
function generateVerbSeoContentEN(verb: Verb, tenses: TenseConjugation[]): VerbSeoContent {
  const { infinitive, type, conjugation_group, stem_change, translation_en } = verb;
  const isIrr = type === "irregular";
  const isRef = type === "reflexive";
  const meaning = translation_en ? ` meaning "${translation_en}"` : "";

  const presenteTense = tenses.find((t) => t.tense === "presente");
  const yo = presenteTense?.forms.find((f) => f.person === "yo")?.form ?? "";
  const tu = presenteTense?.forms.find((f) => f.person === "tú")?.form ?? "";
  const el = presenteTense?.forms.find((f) => f.person === "él")?.form ?? "";

  const indefinidoTense = tenses.find((t) => t.tense === "preterito_indefinido");
  const yoPret = indefinidoTense?.forms.find((f) => f.person === "yo")?.form ?? "";
  const elPret = indefinidoTense?.forms.find((f) => f.person === "él")?.form ?? "";

  const futuroTense = tenses.find((t) => t.tense === "futuro_simple");
  const yoFut = futuroTense?.forms.find((f) => f.person === "yo")?.form ?? "";

  const typeLabel = isIrr
    ? `irregular${stem_change ? ` with a ${stem_change} stem change` : ""}`
    : isRef ? "reflexive" : `regular -${conjugation_group} verb`;

  const intro = `The Spanish verb "${infinitive}"${meaning} is one of the most commonly used verbs in Spanish. It is a ${typeLabel} verb. Mastering how to conjugate ${infinitive} is essential for any Spanish learner, as it appears in countless everyday situations — from casual conversation to formal writing. The conjugation of ${infinitive} follows the -${conjugation_group} verb pattern${isIrr ? ", though it has irregular forms you will need to memorize" : " perfectly regularly"}.`;

  const presentUsage = `How to conjugate ${infinitive} in the present tense: yo ${yo}, tú ${tu}, él/ella ${el}. ${isIrr && stem_change ? `Important: ${infinitive} has a ${stem_change} stem change that affects stressed forms (yo, tú, él/ella, ellos/ellas) but NOT nosotros/vosotros. ` : ""}The present tense of ${infinitive} is used for habits, current states, and general truths. Unlike English, Spanish does not distinguish between simple present ("I ${translation_en?.replace("to ", "") ?? infinitive}") and present continuous ("I am -ing") — both can use the present indicative.`;

  const pastFuture = `The past tense of ${infinitive} in Spanish has two forms. The preterite (pretérito indefinido): yo ${yoPret}, él/ella ${elPret}${isIrr ? " (irregular forms — must be memorized)" : ""}. Use the preterite for completed past actions at a specific time. The imperfect (pretérito imperfecto) expresses habitual past actions and background descriptions — equivalent to "used to" or "was -ing" in English. For the future tense of ${infinitive}: yo ${yoFut}. This is the key challenge for English speakers: Spanish has TWO past tenses, not one.`;

  const irregularities = isIrr && stem_change
    ? `${infinitive} is irregular due to a ${stem_change} stem change. This change happens in the stressed syllable in the present tense: yo, tú, él/ella, and ellos/ellas change the stem, but nosotros and vosotros do NOT. This is called a "boot verb" or "shoe verb" pattern because if you draw a line around the changed forms on a conjugation chart, it looks like a shoe. Common mistake: applying the change to ALL persons, including nosotros.`
    : isRef
    ? `${infinitive} is a reflexive verb, always used with a reflexive pronoun (me, te, se, nos, os, se). The reflexive pronoun must agree with the subject. In affirmative commands, the pronoun attaches to the end of the verb. In negative commands, it goes before. English speakers often struggle with reflexive verbs because English rarely uses them.`
    : isIrr
    ? `${infinitive} is irregular in Spanish. Its main irregularities occur in the present tense (${yo}), the preterite, and the future/conditional. These forms must be memorized — there is no shortcut. However, since ${infinitive} is a high-frequency verb, you will encounter it so often that the forms become natural quickly.`
    : `Good news: ${infinitive} is a completely regular -${conjugation_group} verb! This means it follows the standard -${conjugation_group} conjugation pattern with no exceptions. Once you learn the regular endings for -${conjugation_group} verbs, you can conjugate ${infinitive} in any tense without any surprises.`;

  const exprList = EXPRESSIONS[infinitive];
  const expressions = exprList
    ? `Common Spanish expressions with ${infinitive}: ${exprList.join("; ")}. Learning these phrases will help you sound more natural and understand native speakers better.`
    : `The verb ${infinitive} appears in many common Spanish expressions and collocations. Studying these phrases in context — rather than as isolated words — is the fastest way to make the conjugation of ${infinitive} feel natural.`;

  const relatedList = RELATED[infinitive];
  const related = relatedList
    ? `Verbs related to ${infinitive}: ${relatedList.join(", ")}. Mastering ${infinitive} first will give you a strong foundation for these related verbs, which share similar patterns or meanings.`
    : `To expand your vocabulary around the concept of "${translation_en ?? infinitive}", explore other -${conjugation_group} verbs like ${conjugation_group === "ar" ? "hablar, trabajar, estudiar" : conjugation_group === "er" ? "comer, beber, comprender" : "vivir, escribir, recibir"}. Practicing these together reinforces the -${conjugation_group} conjugation pattern.`;

  return { intro, presentUsage, pastFuture, irregularities, expressions, related };
}

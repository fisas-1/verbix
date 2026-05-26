const TENSE_EXPLANATIONS: Record<string, { title: string; when: string; example: string }> = {
  presente: {
    title: "Presente de Indicativo",
    when: "Acciones habituales, estados actuales, verdades universales o acciones que ocurren en este momento.",
    example: "Yo hablo español. (I speak Spanish.)",
  },
  preterito_indefinido: {
    title: "Pretérito Indefinido",
    when: "Acciones completadas en un tiempo pasado concreto y delimitado.",
    example: "Ayer hablé con mi madre. (Yesterday I spoke with my mother.)",
  },
  preterito_imperfecto: {
    title: "Pretérito Imperfecto",
    when: "Acciones habituales en el pasado, descripciones de estados pasados o acciones en progreso.",
    example: "Cuando era niño, hablaba mucho. (When I was a child, I used to talk a lot.)",
  },
  preterito_perfecto: {
    title: "Pretérito Perfecto Compuesto",
    when: "Acciones pasadas con relevancia en el presente o que acaban de ocurrir.",
    example: "He hablado con él esta mañana. (I have spoken with him this morning.)",
  },
  futuro_simple: {
    title: "Futuro Simple",
    when: "Acciones que sucederán en el futuro o para expresar probabilidad en el presente.",
    example: "Mañana hablaré con el jefe. (Tomorrow I will speak with the boss.)",
  },
  condicional_simple: {
    title: "Condicional Simple",
    when: "Acciones hipotéticas, cortesía o probabilidad en el pasado.",
    example: "Si pudiera, hablaría con ella. (If I could, I would speak with her.)",
  },
  subjuntivo_presente: {
    title: "Presente de Subjuntivo",
    when: "Expresar deseos, emociones, dudas, hipótesis o mandatos indirectos.",
    example: "Espero que hables más. (I hope you speak more.)",
  },
};

interface TenseExplainerProps {
  tense: string;
}

export default function TenseExplainer({ tense }: TenseExplainerProps) {
  const info = TENSE_EXPLANATIONS[tense];
  if (!info) return null;

  return (
    <div className="rounded-lg bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 p-4">
      <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-1 text-sm">{info.title}</h3>
      <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">{info.when}</p>
      <p className="text-sm font-mono text-gray-600 dark:text-gray-400 italic">{info.example}</p>
    </div>
  );
}

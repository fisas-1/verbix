import type { VerbExample } from "@/lib/verbs";

interface ExampleSentencesProps {
  examples: VerbExample[];
  infinitive: string;
}

const TENSE_LABELS: Record<string, string> = {
  presente: "Presente",
  preterito_indefinido: "Pretérito Indefinido",
  preterito_imperfecto: "Pretérito Imperfecto",
  futuro_simple: "Futuro",
  subjuntivo_presente: "Subjuntivo Presente",
  condicional_simple: "Condicional",
};

export default function ExampleSentences({ examples, infinitive }: ExampleSentencesProps) {
  if (examples.length === 0) {
    return (
      <section>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Ejemplos de uso
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm italic">
          Próximamente añadiremos ejemplos para <strong>{infinitive}</strong>.
        </p>
      </section>
    );
  }

  return (
    <section>
      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Ejemplos de uso
      </h2>
      <ul className="space-y-3">
        {examples.map((ex) => (
          <li key={ex.id} className="flex flex-col gap-0.5">
            <div className="flex items-start gap-2">
              {ex.tense && (
                <span className="shrink-0 mt-0.5 text-xs bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 px-2 py-0.5 rounded font-medium">
                  {TENSE_LABELS[ex.tense] ?? ex.tense}
                </span>
              )}
              <p className="text-gray-900 dark:text-gray-100 font-medium">{ex.sentence}</p>
            </div>
            {ex.translation_en && (
              <p className="text-sm text-gray-500 dark:text-gray-400 italic ml-0 pl-0">
                {ex.translation_en}
              </p>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

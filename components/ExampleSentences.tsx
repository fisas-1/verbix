import type { VerbExample } from "@/lib/verbs";
import { t } from "@/lib/i18n";

interface ExampleSentencesProps {
  examples: VerbExample[];
  infinitive: string;
  lang?: string;
}

export default function ExampleSentences({ examples, infinitive, lang = "es" }: ExampleSentencesProps) {
  const tr = t(lang);
  const tenseLabels = tr.tenseLabels;

  if (examples.length === 0) {
    return (
      <section>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          {tr.examplesTitle}
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm italic">
          {tr.examplesSoon(infinitive)}
        </p>
      </section>
    );
  }

  return (
    <section>
      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
        {tr.examplesTitle}
      </h2>
      <ul className="space-y-3">
        {examples.map((ex) => (
          <li key={ex.id} className="flex flex-col gap-0.5">
            <div className="flex items-start gap-2">
              {ex.tense && (
                <span className="shrink-0 mt-0.5 text-xs bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 px-2 py-0.5 rounded font-medium">
                  {tenseLabels[ex.tense] ?? ex.tense}
                </span>
              )}
              <p className="text-gray-900 dark:text-gray-100 font-medium">{ex.sentence}</p>
            </div>
            {ex.translation_en && (
              <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                {ex.translation_en}
              </p>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

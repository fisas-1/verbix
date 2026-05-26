'use client';

import { useState } from "react";
import type { TenseConjugation } from "@/lib/conjugate";

interface ConjugationTableProps {
  tenses: TenseConjugation[];
  infinitive: string;
}

const MOOD_LABELS = {
  indicativo: "Indicativo",
  subjuntivo: "Subjuntivo",
  imperativo: "Imperativo",
  no_personal: "Formas no personales",
};

const PERSON_LABELS: Record<string, string> = {
  yo: "yo",
  tú: "tú",
  él: "él / ella",
  nosotros: "nosotros",
  vosotros: "vosotros",
  ellos: "ellos / ellas",
};

export default function ConjugationTable({ tenses, infinitive }: ConjugationTableProps) {
  const [activeMood, setActiveMood] = useState<"indicativo" | "subjuntivo" | "imperativo">("indicativo");

  const moods = ["indicativo", "subjuntivo", "imperativo"] as const;
  const filteredTenses = tenses.filter((t) => t.mood === activeMood);

  return (
    <section className="w-full">
      {/* Mood tabs */}
      <div className="flex gap-1 mb-6 border-b border-gray-200 dark:border-gray-700">
        {moods.map((mood) => (
          <button
            key={mood}
            onClick={() => setActiveMood(mood)}
            className={`px-4 py-2 text-sm font-medium rounded-t-md transition-colors ${
              activeMood === mood
                ? "bg-blue-600 text-white border-b-2 border-blue-600"
                : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            }`}
          >
            {MOOD_LABELS[mood]}
          </button>
        ))}
      </div>

      {/* Tense tables */}
      <div className="space-y-8">
        {filteredTenses.map((tenseData) => (
          <div key={tenseData.tense}>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
              Conjugación en {tenseData.label}
            </h2>
            <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-800">
                    <th className="px-4 py-3 text-left text-gray-600 dark:text-gray-400 font-medium w-1/3">
                      Persona
                    </th>
                    <th className="px-4 py-3 text-left text-gray-600 dark:text-gray-400 font-medium">
                      Forma
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {tenseData.forms.map((form) => (
                    <tr
                      key={form.person}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                    >
                      <td className="px-4 py-3 text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wide">
                        {PERSON_LABELS[form.person] ?? form.person}
                      </td>
                      <td className="px-4 py-3 font-medium">
                        {form.form === "—" ? (
                          <span className="text-gray-400">—</span>
                        ) : (
                          <span
                            className={
                              form.is_irregular
                                ? "text-blue-600 dark:text-blue-400 font-semibold"
                                : "text-gray-900 dark:text-gray-100"
                            }
                          >
                            {form.form}
                            {form.is_irregular && (
                              <span className="ml-2 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-1.5 py-0.5 rounded">
                                irr
                              </span>
                            )}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
        <span className="inline-block w-3 h-3 bg-blue-100 dark:bg-blue-900/30 rounded mr-1"></span>
        Las formas en{" "}
        <span className="text-blue-600 dark:text-blue-400 font-semibold">azul</span> son irregulares.
      </p>
    </section>
  );
}

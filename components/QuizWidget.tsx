'use client';

import { useState, useMemo } from "react";
import type { TenseConjugation } from "@/lib/conjugate";
import { t } from "@/lib/i18n";

interface QuizWidgetProps {
  tenses: TenseConjugation[];
  infinitive: string;
  lang?: string;
}

interface Question {
  prompt: string;
  correct: string;
  options: string[];
}

function generateQuestions(
  tenses: TenseConjugation[],
  infinitive: string,
  quizPrompt: (v: string, tense: string, person: string) => string
): Question[] {
  const pool: { tense: string; person: string; form: string }[] = [];
  for (const t of tenses) {
    for (const f of t.forms) {
      if (f.form !== "—" && !f.form.startsWith("no ")) {
        pool.push({ tense: t.label, person: f.person, form: f.form });
      }
    }
  }

  const allForms = pool.map((p) => p.form);
  const shuffled = [...pool].sort(() => Math.random() - 0.5).slice(0, 5);

  return shuffled.map(({ tense, person, form }) => {
    const distractors = allForms
      .filter((f) => f !== form)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    const options = [form, ...distractors].sort(() => Math.random() - 0.5);
    return {
      prompt: quizPrompt(infinitive, tense, person),
      correct: form,
      options,
    };
  });
}

export default function QuizWidget({ tenses, infinitive, lang = "es" }: QuizWidgetProps) {
  const tr = t(lang);
  const questions = useMemo(
    () => generateQuestions(tenses, infinitive, tr.quizPrompt),
    [tenses, infinitive, tr.quizPrompt]
  );
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  function handleAnswer(option: string) {
    if (selected !== null) return;
    setSelected(option);
    if (option === questions[current].correct) {
      setScore((s) => s + 1);
    }
  }

  function next() {
    if (current + 1 >= questions.length) {
      setFinished(true);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
    }
  }

  function restart() {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  }

  if (questions.length === 0) return null;

  const q = questions[current];

  return (
    <section>
      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
        {tr.quizTitle}
      </h2>

      {finished ? (
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-6 text-center">
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
            {score}/{questions.length}
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {score === questions.length
              ? tr.quizPerfect
              : score >= 3
              ? tr.quizGood
              : tr.quizRetry}
          </p>
          <button
            onClick={restart}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            {tr.quizTryAgain}
          </button>
        </div>
      ) : (
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-5">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {tr.quizQuestion(current + 1, questions.length)}
            </span>
            <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
              {tr.quizCorrect(score)}
            </span>
          </div>

          <p className="text-gray-900 dark:text-gray-100 font-medium mb-4">{q.prompt}</p>

          <div className="grid grid-cols-2 gap-2">
            {q.options.map((option) => {
              let variant = "border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 text-gray-900 dark:text-gray-100";
              if (selected !== null) {
                if (option === q.correct) {
                  variant = "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300";
                } else if (option === selected) {
                  variant = "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300";
                }
              }
              return (
                <button
                  key={option}
                  onClick={() => handleAnswer(option)}
                  disabled={selected !== null}
                  className={`p-3 rounded-lg border-2 text-sm font-medium transition-colors ${variant} disabled:cursor-default`}
                >
                  {option}
                </button>
              );
            })}
          </div>

          {selected !== null && (
            <div className="mt-4 flex justify-end">
              <button
                onClick={next}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                {current + 1 >= questions.length ? tr.quizSeeResults : tr.quizNext}
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

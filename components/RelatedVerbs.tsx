import Link from "next/link";
import type { Verb } from "@/lib/verbs";
import { verbSlugPath } from "@/lib/i18n";

interface RelatedVerbsProps {
  verbs: Verb[];
  lang?: string;
  title?: string;
}

export default function RelatedVerbs({ verbs, lang = "es", title = "Verbos relacionados" }: RelatedVerbsProps) {
  if (verbs.length === 0) return null;
  return (
    <section>
      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {verbs.map((verb) => (
          <Link
            key={verb.slug}
            href={verbSlugPath(lang, verb.slug)}
            className="group flex flex-col p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors"
          >
            <span className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {verb.infinitive}
            </span>
            {verb.translation_en && (
              <span className="text-xs text-gray-400 dark:text-gray-500 mt-0.5 truncate">
                {verb.translation_en}
              </span>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}

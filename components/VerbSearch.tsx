'use client';

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Fuse from "fuse.js";

interface VerbItem {
  infinitive: string;
  slug: string;
  translation_en: string | null;
}

interface VerbSearchProps {
  lang?: string;
  placeholder?: string;
  initialVerbs?: VerbItem[];
}

export default function VerbSearch({ lang = "es", placeholder = "Busca un verbo...", initialVerbs = [] }: VerbSearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<VerbItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [verbs, setVerbs] = useState<VerbItem[]>(initialVerbs);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const fuseRef = useRef<Fuse<VerbItem> | null>(null);

  useEffect(() => {
    if (initialVerbs.length > 0) {
      fuseRef.current = new Fuse(initialVerbs, {
        keys: ["infinitive"],
        threshold: 0.3,
        distance: 100,
      });
      setVerbs(initialVerbs);
    }
  }, [initialVerbs]);

  useEffect(() => {
    if (!query.trim() || !fuseRef.current) {
      setResults([]);
      setIsOpen(false);
      return;
    }
    const found = fuseRef.current.search(query).slice(0, 8).map((r) => r.item);
    setResults(found);
    setIsOpen(found.length > 0);
    setSelectedIndex(-1);
  }, [query]);

  function navigate(slug: string) {
    setQuery("");
    setIsOpen(false);
    router.push(`/${lang}/verbo/${slug}`);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!isOpen) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, -1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0) {
        navigate(results[selectedIndex].slug);
      } else if (results.length > 0) {
        navigate(results[0].slug);
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  }

  return (
    <div className="relative w-full max-w-xl mx-auto">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => results.length > 0 && setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 150)}
          placeholder={placeholder}
          className="w-full px-4 py-3 pl-12 text-base rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-colors shadow-sm"
          aria-label="Buscar verbo"
          autoComplete="off"
        />
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      {isOpen && results.length > 0 && (
        <ul className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg overflow-hidden">
          {results.map((verb, i) => (
            <li key={verb.slug}>
              <button
                className={`w-full text-left px-4 py-3 flex justify-between items-center transition-colors ${
                  i === selectedIndex
                    ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                    : "hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-100"
                }`}
                onMouseDown={() => navigate(verb.slug)}
              >
                <span className="font-medium">{verb.infinitive}</span>
                {verb.translation_en && (
                  <span className="text-sm text-gray-400 dark:text-gray-500">{verb.translation_en}</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

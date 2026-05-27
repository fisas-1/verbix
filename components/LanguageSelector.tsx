'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const LANGS = [
  { code: "es", label: "ES" },
  { code: "ca", label: "CA" },
  { code: "en", label: "EN" },
];

function getAlternatePath(pathname: string, targetLang: string): string {
  const match = pathname.match(/^\/(es|ca|en)(\/.*)?$/);
  if (!match) return `/${targetLang}`;

  const rest = match[2] ?? "";

  // /xx/verbo/slug → switch verbo↔verb
  if (rest.startsWith("/verbo/")) {
    const slug = rest.slice("/verbo/".length);
    if (targetLang === "es") return `/es/verbo/${slug}`;
    return `/${targetLang}/verb/${slug}`;
  }
  if (rest.startsWith("/verb/")) {
    const slug = rest.slice("/verb/".length);
    if (targetLang === "es") return `/es/verbo/${slug}`;
    return `/${targetLang}/verb/${slug}`;
  }

  return `/${targetLang}${rest}`;
}

interface LanguageSelectorProps {
  currentLang: string;
}

export default function LanguageSelector({ currentLang }: LanguageSelectorProps) {
  const pathname = usePathname();

  useEffect(() => {
    try {
      localStorage.setItem("preferredLang", currentLang);
    } catch {
      // ignore
    }
  }, [currentLang]);

  return (
    <div className="flex items-center gap-0.5 text-xs font-semibold border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
      {LANGS.map(({ code, label }) => {
        const href = getAlternatePath(pathname, code);
        const isActive = code === currentLang;
        return (
          <Link
            key={code}
            href={href}
            aria-current={isActive ? "page" : undefined}
            className={`px-2.5 py-1.5 transition-colors ${
              isActive
                ? "bg-blue-600 text-white"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100"
            }`}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
}

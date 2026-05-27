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

  // Spanish verbs: /xx/verbo/slug ↔ /xx/verb/slug
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

  // Catalan verbs: /es/verb-catala/slug, /ca/verb-catala/slug, /en/catalan-verb/slug
  if (rest.startsWith("/verb-catala/")) {
    const slug = rest.slice("/verb-catala/".length);
    if (targetLang === "en") return `/en/catalan-verb/${slug}`;
    return `/${targetLang}/verb-catala/${slug}`;
  }
  if (rest.startsWith("/catalan-verb/")) {
    const slug = rest.slice("/catalan-verb/".length);
    if (targetLang === "en") return `/en/catalan-verb/${slug}`;
    return `/${targetLang}/verb-catala/${slug}`;
  }

  // English verbs: /es/verb-ingles/slug, /ca/verb-angles/slug, /en/english-verb/slug
  if (rest.startsWith("/verb-ingles/")) {
    const slug = rest.slice("/verb-ingles/".length);
    if (targetLang === "es") return `/es/verb-ingles/${slug}`;
    if (targetLang === "ca") return `/ca/verb-angles/${slug}`;
    return `/en/english-verb/${slug}`;
  }
  if (rest.startsWith("/verb-angles/")) {
    const slug = rest.slice("/verb-angles/".length);
    if (targetLang === "es") return `/es/verb-ingles/${slug}`;
    if (targetLang === "ca") return `/ca/verb-angles/${slug}`;
    return `/en/english-verb/${slug}`;
  }
  if (rest.startsWith("/english-verb/")) {
    const slug = rest.slice("/english-verb/".length);
    if (targetLang === "es") return `/es/verb-ingles/${slug}`;
    if (targetLang === "ca") return `/ca/verb-angles/${slug}`;
    return `/en/english-verb/${slug}`;
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

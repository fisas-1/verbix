'use client';

import { useState, useEffect } from "react";
import Link from "next/link";

const COOKIE_KEY = "cookie_consent";

const STRINGS: Record<string, { text: string; accept: string; policy: string }> = {
  es: {
    text: "Usamos cookies propias y de terceros (Google AdSense, Google Analytics) para mejorar tu experiencia y mostrarte anuncios relevantes.",
    accept: "Aceptar",
    policy: "Política de privacidad",
  },
  ca: {
    text: "Fem servir galetes pròpies i de tercers (Google AdSense, Google Analytics) per millorar la teva experiència i mostrar-te anuncis rellevants.",
    accept: "Acceptar",
    policy: "Política de privadesa",
  },
  en: {
    text: "We use our own and third-party cookies (Google AdSense, Google Analytics) to improve your experience and show you relevant ads.",
    accept: "Accept",
    policy: "Privacy policy",
  },
};

interface CookieBannerProps {
  lang: string;
}

export default function CookieBanner({ lang }: CookieBannerProps) {
  const [visible, setVisible] = useState(false);
  const s = STRINGS[lang] ?? STRINGS.es;

  useEffect(() => {
    try {
      if (!localStorage.getItem(COOKIE_KEY)) setVisible(true);
    } catch {
      // ignore
    }
  }, []);

  function accept() {
    try {
      localStorage.setItem(COOKIE_KEY, "accepted");
    } catch {
      // ignore
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900 dark:bg-gray-950 text-white px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm shadow-lg border-t border-gray-700">
      <p className="text-gray-200 text-xs sm:text-sm leading-snug max-w-2xl">
        {s.text}{" "}
        <Link
          href={`/${lang}/politica-de-privacidad`}
          className="underline text-blue-300 hover:text-blue-200"
        >
          {s.policy}
        </Link>
      </p>
      <button
        onClick={accept}
        className="shrink-0 px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-md transition-colors"
      >
        {s.accept}
      </button>
    </div>
  );
}

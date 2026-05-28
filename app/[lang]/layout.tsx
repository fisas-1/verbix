import Link from "next/link";
import Image from "next/image";
import { SITE_NAME } from "@/lib/seo";
import { t } from "@/lib/i18n";
import LanguageSelector from "@/components/LanguageSelector";
import CookieBanner from "@/components/CookieBanner";

interface LangLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export default async function LangLayout({ children, params }: LangLayoutProps) {
  const { lang } = await params;
  const tr = t(lang);
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-30 bg-white/90 dark:bg-gray-950/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link
            href={`/${lang}`}
            className="flex items-center gap-2 text-xl font-bold text-blue-600 dark:text-blue-400 tracking-tight"
          >
            <Image
              src="/logo.png"
              alt=""
              width={36}
              height={36}
              className="rounded-full"
              priority
            />
            {SITE_NAME}
          </Link>
          <nav className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
            <Link href={`/${lang}/verbos`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors hidden sm:block">
              {tr.allVerbs}
            </Link>
            <Link href={`/${lang}/verbos/irregulares`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors hidden md:block">
              {tr.irregular}
            </Link>
            <LanguageSelector currentLang={lang} />
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-6">
        {children}
      </main>

      <footer className="border-t border-gray-200 dark:border-gray-800 py-8 mt-8">
        <div className="max-w-3xl mx-auto px-4 text-center text-sm text-gray-500 dark:text-gray-400">
          <p className="mb-2">
            <strong className="text-gray-700 dark:text-gray-300">{SITE_NAME}</strong> — {tr.siteTagline}
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-3">
            <Link href={`/${lang}/verbos`} className="hover:text-blue-600 dark:hover:text-blue-400">{tr.allVerbs}</Link>
            <Link href={`/${lang}/verbos/irregulares`} className="hover:text-blue-600 dark:hover:text-blue-400">{tr.irregular}</Link>
            <Link href={`/${lang}/verbos/regulares`} className="hover:text-blue-600 dark:hover:text-blue-400">{tr.regular}</Link>
            <Link href={`/${lang}/verbos/grupo/ar`} className="hover:text-blue-600 dark:hover:text-blue-400">{tr.groupDesc("ar")}</Link>
            <Link href={`/${lang}/verbos/grupo/er`} className="hover:text-blue-600 dark:hover:text-blue-400">{tr.groupDesc("er")}</Link>
            <Link href={`/${lang}/verbos/grupo/ir`} className="hover:text-blue-600 dark:hover:text-blue-400">{tr.groupDesc("ir")}</Link>
          </div>
          <div className="flex flex-wrap justify-center gap-3 text-xs text-gray-400 dark:text-gray-500">
            <Link href={`/${lang}/sobre-nosotros`} className="hover:text-blue-600 dark:hover:text-blue-400">
              {lang === "ca" ? "Sobre nosaltres" : lang === "en" ? "About" : "Sobre nosotros"}
            </Link>
            <Link href={`/${lang}/politica-de-privacidad`} className="hover:text-blue-600 dark:hover:text-blue-400">
              {lang === "ca" ? "Privadesa" : lang === "en" ? "Privacy" : "Privacidad"}
            </Link>
            <Link href={`/${lang}/contacto`} className="hover:text-blue-600 dark:hover:text-blue-400">
              {lang === "ca" ? "Contacte" : lang === "en" ? "Contact" : "Contacto"}
            </Link>
          </div>
        </div>
      </footer>
      <CookieBanner lang={lang} />
    </div>
  );
}

import Link from "next/link";
import { SITE_NAME } from "@/lib/seo";

interface LangLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export default async function LangLayout({ children, params }: LangLayoutProps) {
  const { lang } = await params;
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-30 bg-white/90 dark:bg-gray-950/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link
            href={`/${lang}`}
            className="text-xl font-bold text-blue-600 dark:text-blue-400 tracking-tight"
          >
            {SITE_NAME}
          </Link>
          <nav className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <Link href={`/${lang}/verbos`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Todos los verbos
            </Link>
            <Link href={`/${lang}/verbos/irregulares`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors hidden sm:block">
              Irregulares
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-6">
        {children}
      </main>

      <footer className="border-t border-gray-200 dark:border-gray-800 py-8 mt-8">
        <div className="max-w-3xl mx-auto px-4 text-center text-sm text-gray-500 dark:text-gray-400">
          <p className="mb-2">
            <strong className="text-gray-700 dark:text-gray-300">{SITE_NAME}</strong> — Conjugación de verbos en español
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href={`/${lang}/verbos`} className="hover:text-blue-600 dark:hover:text-blue-400">Índice A-Z</Link>
            <Link href={`/${lang}/verbos/irregulares`} className="hover:text-blue-600 dark:hover:text-blue-400">Irregulares</Link>
            <Link href={`/${lang}/verbos/regulares`} className="hover:text-blue-600 dark:hover:text-blue-400">Regulares</Link>
            <Link href={`/${lang}/verbos/grupo/ar`} className="hover:text-blue-600 dark:hover:text-blue-400">Verbos -ar</Link>
            <Link href={`/${lang}/verbos/grupo/er`} className="hover:text-blue-600 dark:hover:text-blue-400">Verbos -er</Link>
            <Link href={`/${lang}/verbos/grupo/ir`} className="hover:text-blue-600 dark:hover:text-blue-400">Verbos -ir</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

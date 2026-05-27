import type { Metadata } from "next";
import Link from "next/link";
import VerbSearch from "@/components/VerbSearch";
import { getAllVerbsForSearch, getTotalVerbCount, getTopVerbsByLang } from "@/lib/verbs";
import { indexTitle, indexDescription, SITE_NAME } from "@/lib/seo";
import { t, verbSlugPath, caVerbSlugPath, enVerbSlugPath, caVerbMeta, enVerbMeta } from "@/lib/i18n";
import { generateWebSiteSchema } from "@/lib/schema";

export async function generateStaticParams() {
  return [{ lang: "es" }, { lang: "ca" }, { lang: "en" }];
}

export const revalidate = 86400;

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: indexTitle(lang),
    description: indexDescription(lang),
    alternates: { canonical: `/${lang}` },
  };
}

const POPULAR_ES = ["hablar", "ser", "estar", "tener", "hacer", "poder", "decir", "ir", "ver", "dar", "saber", "querer", "volver", "pedir", "dormir", "llegar", "venir", "poner", "salir", "querer"];
const POPULAR_CA = ["ser", "estar", "haver", "tenir", "fer", "poder", "voler", "saber", "anar", "venir", "dir", "donar", "veure", "posar", "portar", "sortir", "arribar", "parlar", "trobar", "viure"];
const POPULAR_EN = ["be", "have", "do", "say", "go", "get", "make", "know", "think", "take", "see", "come", "want", "give", "tell", "find", "feel", "become", "leave", "keep"];

export default async function HomePage({ params }: PageProps) {
  const { lang } = await params;
  const tr = t(lang);
  const [verbs, total] = await Promise.all([
    getAllVerbsForSearch("es"),
    getTotalVerbCount("es"),
  ]);
  const [caVerbs, enVerbs] = await Promise.all([
    getTopVerbsByLang("ca", 20),
    getTopVerbsByLang("en", 20),
  ]);
  const schema = generateWebSiteSchema();

  const caLabel = caVerbMeta[lang]?.indexTitle ?? "Verbs en català";
  const enLabel = enVerbMeta[lang]?.indexTitle ?? "English verbs";

  const caIndexHref = lang === "es"
    ? "/es/verbos-catalanes"
    : lang === "ca"
    ? "/ca/verbs-catalans"
    : "/en/catalan-verbs";

  const enIndexHref = lang === "es"
    ? "/es/verbos-ingleses"
    : lang === "ca"
    ? "/ca/verbs-anglesos"
    : "/en/english-verbs";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Hero */}
      <section className="text-center py-10 px-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-3">
          {tr.heroTitle}
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 mb-8 max-w-lg mx-auto">
          {tr.heroDesc(total.toLocaleString())}
        </p>
        <VerbSearch lang={lang} initialVerbs={verbs} placeholder={tr.searchPlaceholder} ariaLabel={tr.searchAriaLabel} />
      </section>

      {/* Spanish verbs section */}
      <section className="mt-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            {lang === "es" ? "Verbos en español" : lang === "ca" ? "Verbs en espanyol" : "Spanish verbs"}
          </h2>
          <Link href={`/${lang}/verbos`} className="text-xs text-blue-600 dark:text-blue-400 hover:underline">
            {tr.allVerbs} →
          </Link>
        </div>
        <div className="flex flex-wrap gap-2">
          {POPULAR_ES.slice(0, 20).map((slug) => (
            <Link
              key={slug}
              href={verbSlugPath(lang, slug)}
              className="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm font-medium hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            >
              {slug}
            </Link>
          ))}
        </div>
      </section>

      {/* Catalan verbs section */}
      <section className="mt-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            {caLabel}
          </h2>
          <Link href={caIndexHref} className="text-xs text-blue-600 dark:text-blue-400 hover:underline">
            {tr.allVerbs} →
          </Link>
        </div>
        <div className="flex flex-wrap gap-2">
          {(caVerbs.length > 0 ? caVerbs.map((v) => v.slug) : POPULAR_CA).slice(0, 20).map((slugOrStr) => {
            const slug = typeof slugOrStr === "string" ? slugOrStr : slugOrStr;
            return (
              <Link
                key={slug}
                href={caVerbSlugPath(lang, slug)}
                className="px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 text-sm font-medium hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
              >
                {caVerbs.find((v) => v.slug === slug)?.infinitive ?? slug}
              </Link>
            );
          })}
        </div>
      </section>

      {/* English verbs section */}
      <section className="mt-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            {enLabel}
          </h2>
          <Link href={enIndexHref} className="text-xs text-blue-600 dark:text-blue-400 hover:underline">
            {tr.allVerbs} →
          </Link>
        </div>
        <div className="flex flex-wrap gap-2">
          {(enVerbs.length > 0 ? enVerbs.map((v) => v.slug) : POPULAR_EN).slice(0, 20).map((slugOrStr) => {
            const slug = typeof slugOrStr === "string" ? slugOrStr : slugOrStr;
            return (
              <Link
                key={slug}
                href={enVerbSlugPath(lang, slug)}
                className="px-3 py-1.5 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300 text-sm font-medium hover:bg-green-100 dark:hover:bg-green-900/40 transition-colors"
              >
                {enVerbs.find((v) => v.slug === slug)?.infinitive ?? slug}
              </Link>
            );
          })}
        </div>
      </section>

      {/* Feature grid */}
      <section className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {tr.features.map((f) => (
          <div key={f.title} className="rounded-xl border border-gray-200 dark:border-gray-700 p-5">
            <div className="text-2xl mb-2">{f.icon}</div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">{f.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{f.desc}</p>
          </div>
        ))}
      </section>

      {/* Browse Spanish by group */}
      <section className="mt-10">
        <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
          {tr.exploreByGroup}
        </h2>
        <div className="grid grid-cols-3 gap-3">
          {["ar", "er", "ir"].map((g) => (
            <Link
              key={g}
              href={`/${lang}/verbos/grupo/${g}`}
              className="rounded-xl border border-gray-200 dark:border-gray-700 p-4 text-center hover:border-blue-400 dark:hover:border-blue-500 transition-colors group"
            >
              <span className="block text-2xl font-bold text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                -{g}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 block">
                {tr.groupDesc(g)}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

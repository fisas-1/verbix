import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME, SITE_URL } from "@/lib/seo";
import { t } from "@/lib/i18n";

export async function generateStaticParams() {
  return [{ lang: "es" }, { lang: "ca" }, { lang: "en" }];
}

interface PageProps {
  params: Promise<{ lang: string }>;
}

const CONTENT: Record<string, { title: string; desc: string; body: string[] }> = {
  es: {
    title: `Sobre nosotros | ${SITE_NAME}`,
    desc: `Conoce el proyecto ${SITE_NAME}: el conjugador de verbos en español más completo de la web.`,
    body: [
      `${SITE_NAME} es un conjugador de verbos en español gratuito y sin registro. Nuestro objetivo es ofrecer la conjugación más completa y precisa de cualquier verbo en español, con todos los tiempos verbales, modos e irregularidades.`,
      `Creemos que aprender gramática debe ser fácil y accesible para todos. Por eso ${SITE_NAME} está disponible en español, catalán e inglés, sin necesidad de cuenta ni pago.`,
      `La base de datos de verbos cubre los verbos más utilizados del español moderno, con información sobre el grupo de conjugación, irregularidades, cambios de raíz y traducciones al inglés y catalán.`,
      `Si tienes sugerencias, errores que reportar o simplemente quieres ponerte en contacto, visita nuestra página de contacto.`,
    ],
  },
  ca: {
    title: `Sobre nosaltres | ${SITE_NAME}`,
    desc: `Descobreix el projecte ${SITE_NAME}: el conjugador de verbs en espanyol més complet de la xarxa.`,
    body: [
      `${SITE_NAME} és un conjugador de verbs en espanyol gratuït i sense registre. El nostre objectiu és oferir la conjugació més completa i precisa de qualsevol verb en espanyol, amb tots els temps verbals, modes i irregularitats.`,
      `Creiem que aprendre gramàtica ha de ser fàcil i accessible per a tothom. Per això ${SITE_NAME} està disponible en espanyol, català i anglès, sense necessitat de compte ni pagament.`,
      `La base de dades de verbs cobreix els verbs més utilitzats de l'espanyol modern, amb informació sobre el grup de conjugació, irregularitats, canvis d'arrel i traduccions a l'anglès i el català.`,
      `Si tens suggeriments, errors a reportar o simplement vols posar-te en contacte, visita la nostra pàgina de contacte.`,
    ],
  },
  en: {
    title: `About us | ${SITE_NAME}`,
    desc: `Learn about ${SITE_NAME}: the most complete Spanish verb conjugator on the web.`,
    body: [
      `${SITE_NAME} is a free, no-registration Spanish verb conjugator. Our goal is to provide the most complete and accurate conjugation of any Spanish verb, covering all tenses, moods, and irregularities.`,
      `We believe that learning grammar should be easy and accessible to everyone. That is why ${SITE_NAME} is available in Spanish, Catalan, and English, with no account or payment needed.`,
      `Our verb database covers the most widely used verbs in modern Spanish, with information on conjugation group, irregularities, stem changes, and translations into English and Catalan.`,
      `If you have suggestions, errors to report, or simply want to get in touch, visit our contact page.`,
    ],
  },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const c = CONTENT[lang] ?? CONTENT.es;
  return {
    title: c.title,
    description: c.desc,
    alternates: {
      canonical: `${SITE_URL}/${lang}/sobre-nosotros`,
      languages: {
        es: `${SITE_URL}/es/sobre-nosotros`,
        ca: `${SITE_URL}/ca/sobre-nosotros`,
        en: `${SITE_URL}/en/sobre-nosotros`,
      },
    },
  };
}

export default async function SobreNosotrosPage({ params }: PageProps) {
  const { lang } = await params;
  const tr = t(lang);
  const c = CONTENT[lang] ?? CONTENT.es;
  const headings: Record<string, string> = {
    es: "Sobre nosotros",
    ca: "Sobre nosaltres",
    en: "About us",
  };

  return (
    <article className="prose prose-sm dark:prose-invert max-w-none">
      <nav className="not-prose text-sm text-gray-500 dark:text-gray-400 mb-6">
        <Link href={`/${lang}`} className="hover:text-blue-600">{tr.home}</Link>
        {" / "}
        <span className="text-gray-700 dark:text-gray-300">{headings[lang] ?? headings.es}</span>
      </nav>
      <h1>{headings[lang] ?? headings.es}</h1>
      {c.body.map((p, i) => <p key={i}>{p}</p>)}
    </article>
  );
}

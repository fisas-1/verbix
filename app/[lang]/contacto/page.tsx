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

const CONTENT: Record<string, { title: string; desc: string; heading: string; intro: string; email: string }> = {
  es: {
    title: `Contacto | ${SITE_NAME}`,
    desc: `Contacta con el equipo de ${SITE_NAME} para dudas, sugerencias o informar de errores.`,
    heading: "Contacto",
    intro: `Para cualquier consulta, sugerencia o para reportar un error de conjugación, puedes escribirnos a:`,
    email: "m.fisas.v@gmail.com",
  },
  ca: {
    title: `Contacte | ${SITE_NAME}`,
    desc: `Contacta amb l'equip de ${SITE_NAME} per a dubtes, suggeriments o per reportar errors.`,
    heading: "Contacte",
    intro: `Per a qualsevol consulta, suggeriment o per reportar un error de conjugació, pots escriure'ns a:`,
    email: "m.fisas.v@gmail.com",
  },
  en: {
    title: `Contact | ${SITE_NAME}`,
    desc: `Contact the ${SITE_NAME} team for questions, suggestions, or to report conjugation errors.`,
    heading: "Contact",
    intro: `For any questions, suggestions, or to report a conjugation error, you can reach us at:`,
    email: "m.fisas.v@gmail.com",
  },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const c = CONTENT[lang] ?? CONTENT.es;
  return {
    title: c.title,
    description: c.desc,
    alternates: {
      canonical: `${SITE_URL}/${lang}/contacto`,
      languages: {
        es: `${SITE_URL}/es/contacto`,
        ca: `${SITE_URL}/ca/contacto`,
        en: `${SITE_URL}/en/contacto`,
      },
    },
  };
}

export default async function ContactoPage({ params }: PageProps) {
  const { lang } = await params;
  const tr = t(lang);
  const c = CONTENT[lang] ?? CONTENT.es;

  return (
    <article className="prose prose-sm dark:prose-invert max-w-none">
      <nav className="not-prose text-sm text-gray-500 dark:text-gray-400 mb-6">
        <Link href={`/${lang}`} className="hover:text-blue-600">{tr.home}</Link>
        {" / "}
        <span className="text-gray-700 dark:text-gray-300">{c.heading}</span>
      </nav>
      <h1>{c.heading}</h1>
      <p>{c.intro}</p>
      <p>
        <a href={`mailto:${c.email}`} className="text-blue-600 dark:text-blue-400 underline">
          {c.email}
        </a>
      </p>
    </article>
  );
}

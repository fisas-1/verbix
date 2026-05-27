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

const META: Record<string, { title: string; desc: string }> = {
  es: {
    title: `Política de privacidad | ${SITE_NAME}`,
    desc: `Política de privacidad de ${SITE_NAME}: uso de cookies, Google AdSense, Google Analytics y derechos RGPD.`,
  },
  ca: {
    title: `Política de privadesa | ${SITE_NAME}`,
    desc: `Política de privadesa de ${SITE_NAME}: ús de galetes, Google AdSense, Google Analytics i drets RGPD.`,
  },
  en: {
    title: `Privacy Policy | ${SITE_NAME}`,
    desc: `Privacy policy of ${SITE_NAME}: use of cookies, Google AdSense, Google Analytics, and GDPR rights.`,
  },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const m = META[lang] ?? META.es;
  return {
    title: m.title,
    description: m.desc,
    alternates: {
      canonical: `${SITE_URL}/${lang}/politica-de-privacidad`,
      languages: {
        es: `${SITE_URL}/es/politica-de-privacidad`,
        ca: `${SITE_URL}/ca/politica-de-privacidad`,
        en: `${SITE_URL}/en/politica-de-privacidad`,
      },
    },
  };
}

export default async function PrivacyPage({ params }: PageProps) {
  const { lang } = await params;
  const tr = t(lang);
  const headings: Record<string, string> = {
    es: "Política de privacidad",
    ca: "Política de privadesa",
    en: "Privacy Policy",
  };
  const heading = headings[lang] ?? headings.es;

  if (lang === "ca") {
    return (
      <article className="prose prose-sm dark:prose-invert max-w-none">
        <nav className="not-prose text-sm text-gray-500 dark:text-gray-400 mb-6">
          <Link href={`/${lang}`} className="hover:text-blue-600">{tr.home}</Link>
          {" / "}
          <span className="text-gray-700 dark:text-gray-300">{heading}</span>
        </nav>
        <h1>{heading}</h1>
        <p>Última actualització: 27 de maig de 2026</p>

        <h2>1. Responsable del tractament</h2>
        <p>
          El responsable del tractament de les dades és l&apos;operador de <strong>{SITE_NAME}</strong> ({SITE_URL}).
          Podeu contactar-nos a <a href="mailto:m.fisas.v@gmail.com">m.fisas.v@gmail.com</a>.
        </p>

        <h2>2. Dades que recollim</h2>
        <p>
          No recollim dades personals directament. No obstant això, els nostres serveis de tercers poden recollir
          informació d&apos;ús anònim tal com s&apos;explica a continuació.
        </p>

        <h2>3. Google AdSense i galetes publicitàries</h2>
        <p>
          Fem servir <strong>Google AdSense</strong> per mostrar anuncis. Google AdSense utilitza galetes
          (<em>cookies</em>) per personalitzar els anuncis mostrats als usuaris. Google pot recopilar informació sobre
          les vostres visites a aquest lloc i a altres llocs per proporcionar anuncis sobre béns i serveis del vostre
          interès. Per obtenir més informació sobre com Google utilitza les dades, visiteu{" "}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
            policies.google.com/privacy
          </a>.
        </p>
        <p>
          Podeu inhabilitar la personalització d&apos;anuncis visitant{" "}
          <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">
            www.google.com/settings/ads
          </a>.
        </p>

        <h2>4. Google Analytics</h2>
        <p>
          Fem servir <strong>Google Analytics</strong> per analitzar l&apos;ús del lloc web. Google Analytics recull
          informació anònima sobre les pàgines que visiteu, el temps que hi passeu i com hi heu arribat. Aquesta
          informació s&apos;utilitza per millorar el lloc web. Podeu inhabilitar Google Analytics instal·lant l&apos;
          <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">
            extensió d&apos;inhabilitació del navegador de Google Analytics
          </a>.
        </p>

        <h2>5. Galetes</h2>
        <p>
          Fem servir galetes funcionals (per recordar les vostres preferències d&apos;idioma i el consentiment de
          galetes) i galetes de tercers (Google AdSense i Google Analytics). Podeu gestionar les galetes a través de la
          configuració del vostre navegador.
        </p>

        <h2>6. Drets RGPD</h2>
        <p>
          En virtut del Reglament General de Protecció de Dades (RGPD), teniu els drets següents:
        </p>
        <ul>
          <li><strong>Accés:</strong> dret a obtenir confirmació de si tractem les vostres dades personals.</li>
          <li><strong>Rectificació:</strong> dret a corregir les dades inexactes.</li>
          <li><strong>Supressió:</strong> dret a sol·licitar l&apos;eliminació de les vostres dades personals.</li>
          <li><strong>Oposició:</strong> dret a oposar-vos al tractament de les vostres dades.</li>
          <li><strong>Portabilitat:</strong> dret a rebre les vostres dades en un format estructurat.</li>
        </ul>
        <p>
          Per exercir qualsevol d&apos;aquests drets, poseu-vos en contacte amb nosaltres a{" "}
          <a href="mailto:m.fisas.v@gmail.com">m.fisas.v@gmail.com</a>.
        </p>

        <h2>7. Canvis a aquesta política</h2>
        <p>
          Podem actualitzar aquesta política de privadesa periòdicament. Els canvis seran efectius en el moment de
          publicar-los en aquest lloc.
        </p>
      </article>
    );
  }

  if (lang === "en") {
    return (
      <article className="prose prose-sm dark:prose-invert max-w-none">
        <nav className="not-prose text-sm text-gray-500 dark:text-gray-400 mb-6">
          <Link href={`/${lang}`} className="hover:text-blue-600">{tr.home}</Link>
          {" / "}
          <span className="text-gray-700 dark:text-gray-300">{heading}</span>
        </nav>
        <h1>{heading}</h1>
        <p>Last updated: 27 May 2026</p>

        <h2>1. Data Controller</h2>
        <p>
          The data controller is the operator of <strong>{SITE_NAME}</strong> ({SITE_URL}).
          You can contact us at <a href="mailto:m.fisas.v@gmail.com">m.fisas.v@gmail.com</a>.
        </p>

        <h2>2. Data We Collect</h2>
        <p>
          We do not collect personal data directly. However, our third-party services may collect anonymous usage
          information as explained below.
        </p>

        <h2>3. Google AdSense and Advertising Cookies</h2>
        <p>
          We use <strong>Google AdSense</strong> to display advertisements. Google AdSense uses cookies to
          personalise the ads shown to users. Google may collect information about your visits to this site and other
          sites to provide ads about goods and services of interest to you. For more information about how Google uses
          data, visit{" "}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
            policies.google.com/privacy
          </a>.
        </p>
        <p>
          You can opt out of personalised advertising by visiting{" "}
          <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">
            www.google.com/settings/ads
          </a>.
        </p>

        <h2>4. Google Analytics</h2>
        <p>
          We use <strong>Google Analytics</strong> to analyse website usage. Google Analytics collects anonymous
          information about the pages you visit, how long you spend on them, and how you arrived. This information
          is used to improve the website. You can opt out of Google Analytics by installing the{" "}
          <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">
            Google Analytics opt-out browser add-on
          </a>.
        </p>

        <h2>5. Cookies</h2>
        <p>
          We use functional cookies (to remember your language preferences and cookie consent) and third-party
          cookies (Google AdSense and Google Analytics). You can manage cookies through your browser settings.
        </p>

        <h2>6. GDPR Rights</h2>
        <p>Under the General Data Protection Regulation (GDPR), you have the following rights:</p>
        <ul>
          <li><strong>Access:</strong> the right to obtain confirmation of whether we process your personal data.</li>
          <li><strong>Rectification:</strong> the right to correct inaccurate data.</li>
          <li><strong>Erasure:</strong> the right to request deletion of your personal data.</li>
          <li><strong>Objection:</strong> the right to object to the processing of your data.</li>
          <li><strong>Portability:</strong> the right to receive your data in a structured format.</li>
        </ul>
        <p>
          To exercise any of these rights, contact us at{" "}
          <a href="mailto:m.fisas.v@gmail.com">m.fisas.v@gmail.com</a>.
        </p>

        <h2>7. Changes to This Policy</h2>
        <p>
          We may update this privacy policy from time to time. Changes will take effect upon being published on
          this site.
        </p>
      </article>
    );
  }

  return (
    <article className="prose prose-sm dark:prose-invert max-w-none">
      <nav className="not-prose text-sm text-gray-500 dark:text-gray-400 mb-6">
        <Link href={`/${lang}`} className="hover:text-blue-600">{tr.home}</Link>
        {" / "}
        <span className="text-gray-700 dark:text-gray-300">{heading}</span>
      </nav>
      <h1>{heading}</h1>
      <p>Última actualización: 27 de mayo de 2026</p>

      <h2>1. Responsable del tratamiento</h2>
      <p>
        El responsable del tratamiento de los datos es el operador de <strong>{SITE_NAME}</strong> ({SITE_URL}).
        Puedes contactarnos en <a href="mailto:m.fisas.v@gmail.com">m.fisas.v@gmail.com</a>.
      </p>

      <h2>2. Datos que recogemos</h2>
      <p>
        No recogemos datos personales directamente. Sin embargo, nuestros servicios de terceros pueden recopilar
        información de uso anónima tal como se explica a continuación.
      </p>

      <h2>3. Google AdSense y cookies publicitarias</h2>
      <p>
        Utilizamos <strong>Google AdSense</strong> para mostrar anuncios. Google AdSense utiliza cookies para
        personalizar los anuncios mostrados a los usuarios. Google puede recopilar información sobre tus visitas a
        este sitio y a otros sitios para ofrecer anuncios sobre bienes y servicios de tu interés. Para más
        información sobre cómo Google utiliza los datos, visita{" "}
        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
          policies.google.com/privacy
        </a>.
      </p>
      <p>
        Puedes inhabilitar la personalización de anuncios visitando{" "}
        <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">
          www.google.com/settings/ads
        </a>.
      </p>

      <h2>4. Google Analytics</h2>
      <p>
        Utilizamos <strong>Google Analytics</strong> para analizar el uso del sitio web. Google Analytics recopila
        información anónima sobre las páginas que visitas, el tiempo que pasas en ellas y cómo has llegado a ellas.
        Esta información se usa para mejorar el sitio web. Puedes inhabilitar Google Analytics instalando el{" "}
        <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">
          complemento de inhabilitación del navegador de Google Analytics
        </a>.
      </p>

      <h2>5. Cookies</h2>
      <p>
        Utilizamos cookies funcionales (para recordar tus preferencias de idioma y el consentimiento de cookies) y
        cookies de terceros (Google AdSense y Google Analytics). Puedes gestionar las cookies a través de la
        configuración de tu navegador.
      </p>

      <h2>6. Derechos RGPD</h2>
      <p>
        En virtud del Reglamento General de Protección de Datos (RGPD), tienes los siguientes derechos:
      </p>
      <ul>
        <li><strong>Acceso:</strong> derecho a obtener confirmación de si tratamos tus datos personales.</li>
        <li><strong>Rectificación:</strong> derecho a corregir los datos inexactos.</li>
        <li><strong>Supresión:</strong> derecho a solicitar la eliminación de tus datos personales.</li>
        <li><strong>Oposición:</strong> derecho a oponerte al tratamiento de tus datos.</li>
        <li><strong>Portabilidad:</strong> derecho a recibir tus datos en un formato estructurado.</li>
      </ul>
      <p>
        Para ejercer cualquiera de estos derechos, contacta con nosotros en{" "}
        <a href="mailto:m.fisas.v@gmail.com">m.fisas.v@gmail.com</a>.
      </p>

      <h2>7. Cambios en esta política</h2>
      <p>
        Podemos actualizar esta política de privacidad periódicamente. Los cambios serán efectivos en el momento de
        publicarlos en este sitio.
      </p>
    </article>
  );
}

import type { Metadata } from "next";
import { Inter, Montserrat, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ARCCPCE | Asociación Regional Centroamericana y Caribe de Profesionales de la Ciencia Enfermería",
  description: "Portal oficial de ARCCPCE. Asociación civil de alto nivel científico con sede en San José, Costa Rica. Micro-observatorio de salud regional, padrón oficial de acreditación, guías clínicas y articulación gremial en Centroamérica y el Caribe.",
  keywords: [
    "ARCCPCE",
    "Asociación Regional Centroamericana y Caribe de Profesionales de la Ciencia Enfermería",
    "Enfermería Costa Rica",
    "Enfermería Centroamérica",
    "Colegio de Enfermeras",
    "Ciencia Enfermera",
    "Cuidados Críticos",
    "Homologación de Enfermería",
    "Salud Pública Centroamérica",
    "COMISCA",
    "SICA Enfermería",
    "Padrón Regional de Enfermería",
    "Micro-Observatorio de Salud",
  ],
  authors: [{ name: "ARCCPCE Consejo Directivo", url: "https://arccpce.pages.dev" }],
  creator: "ARCCPCE",
  publisher: "Asociación Regional Centroamericana y Caribe de Profesionales de la Ciencia Enfermería",
  metadataBase: new URL("https://arccpce.pages.dev"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ARCCPCE | Asociación Regional Centroamericana y Caribe de Profesionales de la Ciencia Enfermería",
    description: "Plataforma oficial de acreditación, homologación transfronteriza y herramientas clínicas para la ciencia enfermera en Centroamérica y el Caribe.",
    url: "https://arccpce.pages.dev",
    siteName: "ARCCPCE",
    locale: "es_CR",
    type: "website",
    images: [
      {
        url: "/assets/images/logo.jpeg",
        width: 800,
        height: 800,
        alt: "Logotipo Oficial de ARCCPCE",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ARCCPCE | Asociación Regional Centroamericana y Caribe de Profesionales de la Ciencia Enfermería",
    description: "Plataforma oficial de acreditación, herramientas de decisión clínica y desarrollo científico de la enfermería.",
    images: ["/assets/images/logo.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/assets/images/logo.jpeg",
    apple: "/assets/images/logo.jpeg",
  },
};

const jsonLdData = {
  "@context": "https://schema.org",
  "@type": "MedicalOrganization",
  name: "Asociación Regional Centroamericana y Caribe de Profesionales de la Ciencia Enfermería (ARCCPCE)",
  alternateName: "ARCCPCE",
  url: "https://arccpce.pages.dev",
  logo: "https://arccpce.pages.dev/assets/images/logo.jpeg",
  image: "https://arccpce.pages.dev/assets/images/logo.jpeg",
  description: "Asociación civil científica y gremial de profesionales de la enfermería para la homologación, desarrollo científico y articulación sanitaria en Centroamérica y el Caribe.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "San José",
    addressCountry: "CR",
  },
  contactPoint: {
    "@type": "ContactPoint",
    email: "arccpce@gmail.com",
    telephone: "+506-7237-0244",
    contactType: "official secretariat",
    areaServed: ["CR", "GT", "SV", "HN", "NI", "PA", "DO"],
    availableLanguage: ["Spanish"],
  },
  areaServed: [
    { "@type": "Country", name: "Costa Rica" },
    { "@type": "Country", name: "Guatemala" },
    { "@type": "Country", name: "El Salvador" },
    { "@type": "Country", name: "Honduras" },
    { "@type": "Country", name: "Nicaragua" },
    { "@type": "Country", name: "Panama" },
    { "@type": "Country", name: "Dominican Republic" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
      </head>
      <body className={`${inter.variable} ${montserrat.variable} ${playfair.variable} bg-slate-50 text-slate-800 font-sans antialiased selection:bg-[#002b7f] selection:text-white`}>
        {children}
      </body>
    </html>
  );
}

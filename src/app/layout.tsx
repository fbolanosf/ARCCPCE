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
  description: "Plataforma oficial de ARCCPCE. Asociación civil regional con sede en San José, Costa Rica. Unidos transformamos la ciencia enfermera para el bienestar de nuestras comunidades.",
  icons: {
    icon: "/assets/images/logo.jpeg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${inter.variable} ${montserrat.variable} ${playfair.variable} bg-slate-50 text-slate-800 font-sans antialiased selection:bg-[#002b7f] selection:text-white`}>
        {children}
      </body>
    </html>
  );
}

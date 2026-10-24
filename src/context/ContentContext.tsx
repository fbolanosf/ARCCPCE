"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import type { NewsItem } from "@/app/api/news/route";

export interface SiteSectionsContent {
  presidentMessage: {
    period: string;
    headline: string;
    quote: string;
    paragraphs: string[];
  };
  vision: {
    title: string;
    description: string;
  };
  mission: {
    title: string;
    description: string;
  };
  contact: {
    email: string;
    phone: string;
    whatsappUrl: string;
    address: string;
  };
}

export const DEFAULT_SITE_CONTENT: SiteSectionsContent = {
  presidentMessage: {
    period: "2026 – 2028",
    headline: "Un hito histórico para la articulación científica de Mesoamérica y el Caribe",
    quote: "La ciencia enfermera no solo asiste: investiga, lidera políticas sanitarias, defiende la salud comunitaria e innova con rigor deontológico.",
    paragraphs: [
      "La conformación de ARCCPCE marca el inicio de una nueva era para los profesionales de la ciencia enfermera en Centroamérica y el Caribe. Nacemos como una respuesta colegiada, ética y estrictamente científica a las profundas asimetrías sanitarias que enfrentan nuestros países.",
      "Nuestro horizonte es claro: homologar competencias clínicas de práctica avanzada, defender el ejercicio libre y digno de la profesión, e incidir directamente en las mesas técnicas de los ministerios de salud y organismos multilaterales.",
    ],
  },
  vision: {
    title: "Nuestra Visión",
    description:
      "Que ARCCPCE sea el referente regional en el impulso de acciones colaborativas científico-educativas, fortalecimiento del liderazgo transformacional y gobernanza sólida en la Enfermería, orientados a la salud integral, sostenibilidad ambiental y adopción ética de la transformación digital.",
  },
  mission: {
    title: "Nuestra Misión",
    description:
      "Promover la articulación y representatividad de los profesionales de la Ciencia Enfermería en Centroamérica y el Caribe, impulsando la excelencia profesional, la integración científico-académica, la autonomía gremial y la incidencia activa en políticas de salud.",
  },
  contact: {
    email: "arccpce@gmail.com",
    phone: "+506 7237-0244",
    whatsappUrl: "https://wa.me/50672370244",
    address: "San José, Costa Rica",
  },
};

export const INITIAL_NEWS: NewsItem[] = [
  {
    id: "post-onehealth",
    title: 'Cuidar la Vida en Todas sus Formas: Salud Pública, Ciencia Enfermería y Bienestar Animal bajo el enfoque de "Una Salud"',
    summary:
      "La Salud Pública también es cuidar la Salud Animal por eso tenemos que trabajar fuerte interinstitucional para desarrollar estrategias de convivencias humanas y animal. Nos vemos.",
    category: "institucional",
    sourceName: "Comunicado Oficial de Presidencia ARCCPCE",
    url: "#comunicado-onehealth",
    date: "2026-10-23",
    imageUrl: "/assets/images/salud-publica-salud-animal.jpg",
    featured: true,
  },
  {
    id: "ops-epa-2026",
    title: "Ampliación del ámbito de práctica de la enfermería: Formación, regulación y mercado de trabajo",
    summary:
      "Estudio comparado de la OPS en Brasil, Chile, Colombia, Costa Rica y México. Los hallazgos confirman que la atención primaria de salud concentra el mayor potencial para el desempeño de la enfermería de práctica avanzada (EPA), ampliando el acceso, reduciendo costos y elevando la calidad asistencial.",
    category: "ops",
    sourceName: "PAHO-WHO / Publicación Oficial",
    url: "https://iris.paho.org/items/9b7fa6eb-7fea-4124-9e13-3e8d6a258daa",
    date: "2026-10-20",
    imageUrl: "/assets/images/ampliacion-ambito-practica-enfermeria-ops.png",
  },
  {
    id: "fb-1",
    title: "Constitución Oficial y Juramentación de la Junta Directiva de ARCCPCE",
    summary:
      "La Asociación Regional Centroamericana y Caribe de Profesionales de la Ciencia Enfermería inicia formalmente su misión histórica de articulación gremial, científica y sociopolítica desde San José, Costa Rica para toda la región.",
    category: "facebook",
    sourceName: "Página Oficial de Facebook ARCCPCE",
    url: "https://www.facebook.com/profile.php?id=61576498572279",
    date: "2026-03-24",
    imageUrl: "/assets/images/equipo-clinico.jpeg",
    featured: false,
  },
  {
    id: "fb-2",
    title: "Discurso Presidencial: Visibilizar la Ciencia Enfermera en la Toma de Decisiones",
    summary:
      "Publicación íntegra de las palabras del Dr. José Eduardo Carvajal Obando destacando la urgencia de incidir en las políticas públicas de salud y defender la autonomía profesional de las enfermeras y enfermeros.",
    category: "facebook",
    sourceName: "Página Oficial de Facebook ARCCPCE",
    url: "https://www.facebook.com/profile.php?id=61576498572279",
    date: "2026-03-22",
    imageUrl: "/assets/images/discurso-presidencia.jpeg",
  },
  {
    id: "ops-1",
    title: "OPS insta a invertir en el liderazgo y condiciones laborales de la enfermería en Centroamérica y el Caribe",
    summary:
      "El informe regional de la OPS enfatiza que la enfermería representa más del 56% de la fuerza laboral sanitaria y es la piedra angular para alcanzar la Cobertura Universal de Salud en la región mesoamericana.",
    category: "ops",
    sourceName: "Organización Panamericana de la Salud (OPS/OMS)",
    url: "https://www.paho.org/es/temas/enfermeria",
    date: "2026-03-20",
  },
  {
    id: "scielo-1",
    title: "Competencias de Práctica Avanzada en Enfermería para la Atención Primaria en Mesoamérica",
    summary:
      "Estudio sobre la implementación del rol de enfermería de práctica avanzada (EPA) y los marcos normativos necesarios para reducir la brecha resolutiva en zonas rurales y periféricas.",
    category: "scielo",
    sourceName: "Revista Latino-Americana de Enfermagem (SciELO)",
    url: "https://www.scielo.br/j/rlae/",
    date: "2026-03-18",
    doi: "10.1590/1518-8345.6821.3990",
  },
  {
    id: "scielo-2",
    title: "Evidencia Científica y Gestión del Cuidado en la Práctica Clínica Hospitalaria",
    summary:
      "Investigación indexada sobre protocolos de seguridad del paciente, farmacovigilancia y liderazgo de enfermería en unidades de cuidados intensivos y atención comunitaria.",
    category: "scielo",
    sourceName: "Revista Brasileira de Enfermagem (SciELO)",
    url: "https://www.scielo.br/j/reben/",
    date: "2026-03-16",
    doi: "10.1590/0034-7167-2025-0142",
  },
  {
    id: "ops-2",
    title: "Informe Mundial sobre la Enfermería: Cobertura Sanitaria Universal y Datos Globales",
    summary:
      "Hoja informativa oficial de la OMS/OPS con directrices estratégicas globales sobre la dotación de personal, retención en zonas rurales y educación de calidad para el gremio.",
    category: "ops",
    sourceName: "Organización Mundial de la Salud (OMS)",
    url: "https://www.who.int/es/news-room/fact-sheets/detail/nursing-and-midwifery",
    date: "2026-03-14",
  },
  {
    id: "video-1",
    title: "Transformación Digital y Tele-enfermería: Innovación en Comunidades Remotas",
    summary:
      "Seminario regional sobre herramientas de teleconsulta, monitorización remota de pacientes crónicos y registros clínicos electrónicos coordinados por profesionales de la ciencia enfermera.",
    category: "video",
    sourceName: "OPS TV / Canal Regional de Salud",
    url: "https://www.youtube.com/watch?v=6ZfuNTqbHE8",
    videoId: "6ZfuNTqbHE8",
    date: "2026-03-10",
  },
];

interface ContentContextType {
  news: NewsItem[];
  siteContent: SiteSectionsContent;
  addNewsItem: (item: Omit<NewsItem, "id">) => void;
  updateNewsItem: (id: string, item: Partial<NewsItem>) => void;
  deleteNewsItem: (id: string) => void;
  updateSiteContent: (newContent: Partial<SiteSectionsContent>) => void;
  resetToDefaults: () => void;
  exportBackupJson: () => string;
  importBackupJson: (jsonString: string) => boolean;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

const NEWS_STORAGE_KEY = "arccpce_managed_news_v1";
const CONTENT_STORAGE_KEY = "arccpce_managed_content_v1";

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [news, setNews] = useState<NewsItem[]>(INITIAL_NEWS);
  const [siteContent, setSiteContent] = useState<SiteSectionsContent>(DEFAULT_SITE_CONTENT);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedNews = localStorage.getItem(NEWS_STORAGE_KEY);
      if (storedNews) {
        const parsed = JSON.parse(storedNews);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setNews(parsed);
        }
      }

      const storedContent = localStorage.getItem(CONTENT_STORAGE_KEY);
      if (storedContent) {
        const parsed = JSON.parse(storedContent);
        if (parsed && typeof parsed === "object") {
          setSiteContent((prev) => ({ ...prev, ...parsed }));
        }
      }
    } catch {
      // Ignorar fallas de lectura en SSR
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(NEWS_STORAGE_KEY, JSON.stringify(news));
    } catch {
      // Manejar cuota de almacenamiento si la imagen es muy grande
    }
  }, [news, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(CONTENT_STORAGE_KEY, JSON.stringify(siteContent));
    } catch {
      // Ignorar
    }
  }, [siteContent, isLoaded]);

  const addNewsItem = (itemData: Omit<NewsItem, "id">) => {
    const newItem: NewsItem = {
      ...itemData,
      id: `item-${Date.now()}`,
    };
    setNews((prev) => [newItem, ...prev]);
  };

  const updateNewsItem = (id: string, updatedFields: Partial<NewsItem>) => {
    setNews((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedFields } : item))
    );
  };

  const deleteNewsItem = (id: string) => {
    setNews((prev) => prev.filter((item) => item.id !== id));
  };

  const updateSiteContent = (newContent: Partial<SiteSectionsContent>) => {
    setSiteContent((prev) => ({
      ...prev,
      ...newContent,
    }));
  };

  const resetToDefaults = () => {
    setNews(INITIAL_NEWS);
    setSiteContent(DEFAULT_SITE_CONTENT);
    try {
      localStorage.removeItem(NEWS_STORAGE_KEY);
      localStorage.removeItem(CONTENT_STORAGE_KEY);
    } catch {
      // Ignorar
    }
  };

  const exportBackupJson = () => {
    return JSON.stringify({ news, siteContent, exportedAt: new Date().toISOString() }, null, 2);
  };

  const importBackupJson = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.news && Array.isArray(parsed.news)) {
        setNews(parsed.news);
      }
      if (parsed.siteContent && typeof parsed.siteContent === "object") {
        setSiteContent(parsed.siteContent);
      }
      return true;
    } catch {
      return false;
    }
  };

  return (
    <ContentContext.Provider
      value={{
        news,
        siteContent,
        addNewsItem,
        updateNewsItem,
        deleteNewsItem,
        updateSiteContent,
        resetToDefaults,
        exportBackupJson,
        importBackupJson,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error("useContent debe ser utilizado dentro de un ContentProvider");
  }
  return context;
}

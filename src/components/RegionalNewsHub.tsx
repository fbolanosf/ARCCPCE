"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Newspaper,
  BookOpen,
  Play,
  X,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  FileText,
  Activity,
  Globe2,
  Calendar,
  Sparkles,
  Facebook,
  RefreshCw,
  ZoomIn,
  Megaphone,
} from "lucide-react";
import type { NewsItem } from "@/app/api/news/route";

const DEFAULT_NEWS: NewsItem[] = [
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
  {
    id: "video-2",
    title: '"En voz de Enfermería" el Dr. José Eduardo Carvajal Obando',
    summary:
      'Entrevista y mensaje especial del Dr. José Eduardo Carvajal Obando, Presidente de ARCCPCE, en el espacio "En voz de Enfermería", abordando los desafíos gremiales, la visibilidad científica y la autonomía del ejercicio profesional en la región.',
    category: "video",
    sourceName: "En voz de Enfermería / Facebook Video",
    url: "https://www.facebook.com/share/v/1Ly2uiE5hH/",
    date: "2026-10-23",
  },
];

type CategoryFilter = "all" | "institucional" | "facebook" | "ops" | "scielo" | "video";

export default function RegionalNewsHub() {
  const [filter, setFilter] = useState<CategoryFilter>("all");
  const [news, setNews] = useState<NewsItem[]>(DEFAULT_NEWS);
  const [activeVideo, setActiveVideo] = useState<{
    id?: string;
    url?: string;
    title: string;
    sourceName: string;
    isFacebook?: boolean;
  } | null>(null);
  const [previewImage, setPreviewImage] = useState<{ src: string; title: string } | null>(null);

  useEffect(() => {
    fetch("/api/news")
      .then((res) => res.json())
      .then((res) => {
        if (res && res.data && Array.isArray(res.data) && res.data.length > 0) {
          setNews(res.data);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveVideo(null);
        setPreviewImage(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filteredNews = news.filter((item) => {
    if (filter === "all") return true;
    return item.category === filter;
  });

  const featuredItem = filteredNews.find((item) => item.featured) || filteredNews[0];
  const gridItems = filteredNews.filter((item) => item.id !== featuredItem?.id);

  return (
    <section id="actualidad" className="py-20 bg-gradient-to-b from-white via-sky-50/40 to-slate-50 text-slate-800 border-y border-slate-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Cabecera de la Sección Luminosa */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-[#002b7f] text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
            <Activity className="w-4 h-4 text-[#ce1126]" />
            Vigilancia del Conocimiento y Práctica Clínica
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900">
            Centro de Inteligencia y Actualidad Sanitaria
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            Actualización diaria de publicaciones oficiales de <strong>ARCCPCE en Facebook</strong>, directrices estratégicas de la <strong>OPS/OMS</strong> y literatura indexada en <strong>SciELO</strong> para toda la región.
          </p>
        </div>

        {/* Ticker / Barra de Indicadores Rápidos con Notificación de Actualización Diaria */}
        <div className="mb-10 bg-white border border-slate-200/90 shadow-sm rounded-2xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-[#002b7f] shrink-0">
              <TrendingUp className="w-5 h-5 text-[#002b7f]" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                Métricas Clave OPS Regional
              </span>
              <span className="text-xs sm:text-sm text-slate-800 font-bold">
                59% Fuerza Sanitaria Global <span className="text-slate-400 font-normal">•</span> 80% Cuidados en APS <span className="text-slate-400 font-normal">•</span> 7 Países Articulados
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <a
              href="https://www.facebook.com/profile.php?id=61576498572279"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-bold text-white bg-[#1877f2] hover:bg-[#166fe5] px-3.5 py-2 rounded-xl shadow-sm transition-all"
            >
              <Facebook className="w-4 h-4" />
              <span>Seguir en Facebook</span>
            </a>
          </div>
        </div>

        {/* Pestañas de Filtro Interactivas */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {[
            { id: "all", label: "Todos los Contenidos", icon: Newspaper },
            { id: "institucional", label: "Comunicados Oficiales", icon: Megaphone },
            { id: "facebook", label: "Publicaciones Facebook ARCCPCE", icon: Facebook },
            { id: "ops", label: "Noticias OPS/OMS", icon: Globe2 },
            { id: "scielo", label: "Investigación SciELO", icon: BookOpen },
            { id: "video", label: "Webinars & Videos", icon: Play },
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = filter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as CategoryFilter)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 border ${
                  isSelected
                    ? "bg-[#002b7f] text-white border-[#002b7f] shadow-md shadow-[#002b7f]/20 scale-105"
                    : "bg-white text-slate-700 border-slate-200 hover:border-sky-300 hover:text-[#002b7f] shadow-sm"
                }`}
              >
                <Icon className={`w-4 h-4 ${tab.id === 'facebook' && !isSelected ? 'text-[#1877f2]' : ''}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Bento Grid Elegante Luminoso */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Tarjeta Destacada Principal (Bento Grande - 7 Columnas) */}
          {featuredItem && (
            <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-sky-300 transition-all duration-300 group">
              <div>
                {featuredItem.imageUrl && (
                  <div
                    onClick={() =>
                      featuredItem.imageUrl &&
                      setPreviewImage({
                        src: featuredItem.imageUrl,
                        title: featuredItem.title,
                      })
                    }
                    className="relative w-full h-72 sm:h-80 md:h-96 rounded-2xl overflow-hidden mb-6 border border-slate-200 bg-amber-50/50 cursor-pointer group/img flex items-center justify-center shadow-inner"
                    title="Haga clic para ver el afiche completo en alta resolución"
                  >
                    <Image
                      src={featuredItem.imageUrl}
                      alt={featuredItem.title}
                      fill
                      className="object-contain p-2 group-hover/img:scale-[1.02] transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-slate-900/0 group-hover/img:bg-slate-900/20 transition-colors flex items-center justify-center">
                      <span className="opacity-0 group-hover/img:opacity-100 transition-opacity bg-slate-900/85 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-lg flex items-center gap-2 backdrop-blur-xs">
                        <ZoomIn className="w-4 h-4 text-amber-300" />
                        <span>Ver Afiche Completo</span>
                      </span>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                  <span className="font-bold text-[#002b7f]">{featuredItem.sourceName}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" /> {featuredItem.date}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-900 mb-3 group-hover:text-[#002b7f] transition-colors leading-snug">
                  {featuredItem.title}
                </h3>

                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                  {featuredItem.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between flex-wrap gap-3">
                <span className="text-xs text-slate-500 font-semibold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#c49a45]" /> Cobertura Sanitaria Regional
                </span>
                <div className="flex items-center gap-2">
                  {featuredItem.imageUrl && (
                    <button
                      onClick={() =>
                        featuredItem.imageUrl &&
                        setPreviewImage({
                          src: featuredItem.imageUrl,
                          title: featuredItem.title,
                        })
                      }
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 px-3.5 py-2.5 rounded-xl transition-all shadow-xs cursor-pointer"
                    >
                      <ZoomIn className="w-4 h-4 text-[#002b7f]" />
                      <span>Ver Afiche Completo</span>
                    </button>
                  )}
                  {featuredItem.category === "facebook" ? (
                    <a
                      href={featuredItem.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-white bg-[#1877f2] hover:bg-[#166fe5] px-4 py-2.5 rounded-xl transition-all shadow-sm"
                    >
                      <Facebook className="w-4 h-4" />
                      <span>Ver en Facebook</span>
                      <ExternalLink className="w-4 h-4 text-blue-200" />
                    </a>
                  ) : featuredItem.category !== "institucional" ? (
                    <a
                      href={featuredItem.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-white bg-[#002b7f] hover:bg-[#001d57] px-4 py-2.5 rounded-xl transition-all shadow-sm"
                    >
                      <span>Leer Documento Oficial</span>
                      <ExternalLink className="w-4 h-4 text-sky-200" />
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#002b7f] bg-sky-50 px-3.5 py-2 rounded-xl border border-sky-100">
                      <Megaphone className="w-4 h-4 text-[#ce1126]" />
                      <span>Difusión Oficial ARCCPCE</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Columna Derecha: Tarjetas Secundarias (Bento Lateral - 5 Columnas) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            {gridItems.slice(0, 3).map((item) => {
              const isVideo = item.category === "video";
              const isSciELO = item.category === "scielo";
              const isFacebook = item.category === "facebook";

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-slate-200/90 p-5 hover:border-sky-300 hover:shadow-md transition-all duration-300 flex flex-col justify-between group shadow-sm"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md border flex items-center gap-1 ${
                        isFacebook
                          ? "bg-blue-50 text-[#1877f2] border-blue-200"
                          : item.category === "ops"
                          ? "bg-sky-50 text-[#002b7f] border-sky-200"
                          : item.category === "scielo"
                          ? "bg-amber-50 text-[#c49a45] border-amber-200"
                          : "bg-emerald-50 text-emerald-700 border-emerald-200"
                      }`}>
                        {isFacebook && <Facebook className="w-3 h-3 text-[#1877f2]" />}
                        {isFacebook && "Publicación Facebook"}
                        {item.category === "ops" && "Directriz OPS/OMS"}
                        {item.category === "scielo" && "Investigación SciELO"}
                        {item.category === "video" && "Webinar & Formación"}
                      </span>
                      <span className="text-[11px] text-slate-500 flex items-center gap-1 font-medium">
                        <Calendar className="w-3 h-3 text-slate-400" /> {item.date}
                      </span>
                    </div>

                    <h4 className="font-bold text-slate-900 text-sm mb-2 group-hover:text-[#002b7f] transition-colors line-clamp-2 leading-snug">
                      {item.title}
                    </h4>

                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 mb-3">
                      {item.summary}
                    </p>

                    {item.doi && (
                      <div className="text-[11px] font-mono text-slate-500 mb-3 flex items-center gap-1">
                        <FileText className="w-3 h-3 text-[#002b7f]" /> DOI: <span className="text-slate-700 font-semibold">{item.doi}</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500 font-medium truncate max-w-[180px]">
                      {item.sourceName}
                    </span>

                    {isVideo ? (
                      <button
                        onClick={() =>
                          setActiveVideo({
                            id: item.videoId,
                            url: item.url,
                            title: item.title,
                            sourceName: item.sourceName,
                            isFacebook: item.url.includes("facebook.com"),
                          })
                        }
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#002b7f] hover:bg-[#001d57] px-3.5 py-1.5 rounded-lg transition-all shadow-sm cursor-pointer"
                      >
                        <Play className="w-3.5 h-3.5 fill-current text-sky-200" />
                        <span>Ver Sesión</span>
                      </button>
                    ) : (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#002b7f] hover:text-[#0284c7] transition-colors"
                      >
                        <span>{isFacebook ? "Abrir Post" : isSciELO ? "Acceder al Paper" : "Detalles"}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Inferior con Acceso Directo a Afiliación */}
        <div className="mt-10 bg-white border border-slate-200 shadow-sm p-6 sm:p-7 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="text-left">
            <h4 className="font-bold text-slate-900 text-base">
              ¿Deseas divulgar una investigación clínica o experiencia gremial?
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              El Comité Científico de ARCCPCE evalúa proyectos académicos y publicaciones de toda Centroamérica y el Caribe.
            </p>
          </div>
          <a
            href="#afiliacion"
            onClick={(e) => {
              e.preventDefault();
              const target = document.getElementById("afiliacion") || document.getElementById("contacto");
              if (target) {
                target.scrollIntoView({ behavior: "smooth" });
              } else {
                window.location.hash = "contacto";
              }
            }}
            className="w-full sm:w-auto bg-[#002b7f] hover:bg-[#001d57] text-white font-bold text-xs sm:text-sm py-3 px-6 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer"
          >
            <span>Postular investigación al Comité</span>
            <ChevronRight className="w-4 h-4 text-sky-200" />
          </a>
        </div>
      </div>

      {/* Modal de Imagen / Afiche Completo en Alta Resolución */}
      {previewImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-3 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setPreviewImage(null)}
        >
          <div
            className="relative w-full max-w-3xl max-h-[92vh] bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Cabecera del Visor */}
            <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-slate-50/80 shrink-0">
              <span className="text-xs font-bold text-[#002b7f] uppercase tracking-wider flex items-center gap-2">
                <Megaphone className="w-4 h-4 text-[#ce1126]" /> Afiche Oficial • Visualización Completa
              </span>
              <button
                onClick={() => setPreviewImage(null)}
                className="p-1.5 rounded-full bg-white hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200 transition-colors cursor-pointer"
                aria-label="Cerrar visor de afiche"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Contenedor de la Imagen Íntegra */}
            <div className="relative flex-1 overflow-auto p-3 sm:p-5 flex items-center justify-center bg-slate-100/50">
              <div className="relative w-full max-w-lg aspect-[3/4] sm:aspect-[4/5] max-h-[75vh]">
                <Image
                  src={previewImage.src}
                  alt={previewImage.title}
                  fill
                  className="object-contain rounded-xl drop-shadow-md"
                  priority
                />
              </div>
            </div>

            {/* Pie de Visor */}
            <div className="p-3.5 border-t border-slate-100 bg-white flex items-center justify-between flex-wrap gap-2 text-xs text-slate-600 shrink-0">
              <span className="font-medium truncate max-w-md">{previewImage.title}</span>
              <a
                href={previewImage.src}
                download="Afiche_Una_Salud_ARCCPCE.jpg"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-[#002b7f] hover:underline flex items-center gap-1"
              >
                <span>Abrir archivo original</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Video Flotante Seguro */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-slate-50">
              <span className="text-xs font-bold text-[#002b7f] uppercase tracking-wider flex items-center gap-2">
                <Play className="w-4 h-4 fill-current text-[#002b7f]" /> {activeVideo.sourceName}
              </span>
              <button
                onClick={() => setActiveVideo(null)}
                className="p-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200 transition-colors cursor-pointer"
                aria-label="Cerrar reproductor"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative w-full aspect-video bg-black flex items-center justify-center">
              {activeVideo.isFacebook && activeVideo.url ? (
                <iframe
                  src={`https://www.facebook.com/plugins/video.php?height=314&href=${encodeURIComponent(activeVideo.url)}&show_text=false&width=560&t=0`}
                  title={activeVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full border-0"
                />
              ) : activeVideo.id ? (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${activeVideo.id}?autoplay=1&rel=0`}
                  title={activeVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full border-0"
                />
              ) : (
                <div className="p-6 text-center text-white">
                  <p className="text-sm mb-4">Reproducción externa disponible</p>
                  {activeVideo.url && (
                    <a
                      href={activeVideo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-[#1877f2] hover:bg-[#166fe5] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-md"
                    >
                      <Facebook className="w-4 h-4" />
                      <span>Ver directamente en Facebook</span>
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Pie del Reproductor con enlace oficial */}
            <div className="p-3.5 border-t border-slate-100 bg-white flex items-center justify-between flex-wrap gap-2 text-xs text-slate-600">
              <span className="font-semibold text-slate-800 truncate max-w-lg">{activeVideo.title}</span>
              {activeVideo.url && (
                <a
                  href={activeVideo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-[#002b7f] hover:text-[#0284c7] flex items-center gap-1 hover:underline"
                >
                  <span>{activeVideo.isFacebook ? "Abrir en Facebook" : "Abrir en YouTube"}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

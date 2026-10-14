"use client";

import React, { useState } from "react";
import metricsData from "@/data/regional-metrics.json";
import mapVectorData from "@/data/central-america-svg.json";
import { RegionalMetric } from "@/types";
import { BarChart3, Download, ShieldCheck, Award, AlertCircle, ArrowUpRight, CheckCircle2, RefreshCw } from "lucide-react";
import RegionalMobilityModal from "@/components/RegionalMobilityModal";

// Bounding boxes calculadas con padding para cada país
const countryViewBoxes: Record<string, string> = {
  CR: "245.1 325.1 137.5 138.1",
  GT: "41.7 95.3 158.8 171.5",
  SV: "110.1 212.8 106.9 73.8",
  HN: "134.1 140.5 229.4 152.6",
  NI: "188.5 192.7 175.0 178.1",
  PA: "337.7 380.3 217.4 112.4",
  DO: "692.2 22.6 147.7 109.1",
};

export default function RegionalObservatory() {
  const [selectedCountryId, setSelectedCountryId] = useState<string>("CR");
  const [isMobilityOpen, setIsMobilityOpen] = useState<boolean>(false);
  const countries = metricsData as RegionalMetric[];

  const currentCountry = countries.find((c) => c.id === selectedCountryId) || countries[0];
  const countrySvgData = (mapVectorData.members as Record<string, { id: string; name: string; d: string }>)[currentCountry.id];

  const handleDownloadGuide = () => {
    const contactElem = document.getElementById("contacto");
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="observatorio" className="py-20 bg-gradient-to-b from-white via-sky-50/50 to-slate-50 text-slate-800 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabecera de Sección Luminosa */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-[#002b7f] text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
            <BarChart3 className="w-4 h-4 text-[#ce1126]" />
            Micro-Observatorio de la Ciencia Enfermera
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900">
            Observatorio y Métricas del Gremio en la Región
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            Indicadores abiertos estandarizados por la <strong>Organización Panamericana de la Salud (OPS)</strong> y la <strong>OMS</strong> para comparar la densidad profesional, marcos de recertificación y homologación entre naciones hermanas.
          </p>
        </div>

        {/* Selector de Países (Tabs Horizontales Limpias y Vivas) */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {countries.map((c) => {
            const isSelected = c.id === selectedCountryId;
            return (
              <button
                key={c.id}
                onClick={() => setSelectedCountryId(c.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 border ${
                  isSelected
                    ? "bg-[#002b7f] text-white border-[#002b7f] shadow-md shadow-[#002b7f]/20 scale-105"
                    : "bg-white text-slate-700 border-slate-200 hover:border-sky-300 hover:text-[#002b7f] shadow-sm"
                }`}
              >
                <span className="text-base">{c.flag}</span>
                <span>{c.name}</span>
              </button>
            );
          })}
        </div>

        {/* Panel Detallado del País Seleccionado */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Columna Izquierda: Tarjetas de Métricas Duras + Silueta Integrada del País */}
          <div className="lg:col-span-5 space-y-5">
            {/* Tarjeta de Densidad Profesional con Silueta Integrada Elegante */}
            <div className="relative bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Densidad Profesional (Por 10,000 hab.)
                </span>
                <span className="text-xs font-bold text-[#002b7f] bg-sky-100/70 px-2 py-0.5 rounded-md border border-sky-200">
                  Reporte OPS/OMS
                </span>
              </div>

              <div className="flex items-baseline gap-3 my-2">
                <span className="text-4xl sm:text-5xl font-black font-display text-[#002b7f]">
                  {currentCountry.ratioPer10k}
                </span>
                <span className="text-xs text-slate-600 font-medium">
                  / Meta OPS: <strong className="text-[#ce1126]">{currentCountry.whoBenchmark}</strong>
                </span>
              </div>

              {/* Barra Comparativa */}
              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden border border-slate-200 mt-2 mb-2">
                <div
                  className="bg-gradient-to-r from-[#0284c7] to-[#002b7f] h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.min((currentCountry.ratioPer10k / currentCountry.whoBenchmark) * 100, 100)}%` }}
                />
              </div>

              <p className="text-[11px] text-slate-500 mb-5">
                Representa el {Math.round((currentCountry.ratioPer10k / currentCountry.whoBenchmark) * 100)}% del umbral óptimo recomendado para Cobertura Universal de Salud.
              </p>

              {/* Silueta del País (Directa sobre el fondo, sin ventana ni marcos) */}
              <div className="relative pt-4 border-t border-slate-100 flex flex-col items-center justify-center">
                {/* Resplandor radial difuminado natural de fondo */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-48 h-32 bg-gradient-to-tr from-sky-400/20 via-[#002b7f]/15 to-transparent rounded-full blur-2xl transform scale-110" />
                </div>

                {/* Contenedor de la Silueta Vectorial */}
                {countrySvgData && countryViewBoxes[currentCountry.id] && (
                  <div className="relative z-10 w-full h-32 flex items-center justify-center py-1">
                    <svg
                      viewBox={countryViewBoxes[currentCountry.id]}
                      className="w-full h-full max-h-28 transition-all duration-500 transform hover:scale-105 filter drop-shadow-[0_8px_16px_rgba(0,43,127,0.22)]"
                    >
                      <defs>
                        <linearGradient id={`silhouette-grad-${currentCountry.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#0284c7" />
                          <stop offset="50%" stopColor="#002b7f" />
                          <stop offset="100%" stopColor="#081e3e" />
                        </linearGradient>
                      </defs>
                      <path
                        d={countrySvgData.d}
                        fill={`url(#silhouette-grad-${currentCountry.id})`}
                        stroke="#ffffff"
                        strokeWidth="1.2"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                )}

                <div className="flex items-center justify-between w-full mt-2 pt-1 text-[11px] text-slate-400">
                  <span className="font-semibold text-slate-500">Silueta Territorial Oficial</span>
                  <span className="font-mono text-[10px] text-slate-400">{currentCountry.name}</span>
                </div>
              </div>
            </div>

            {/* Rol en la Red y Desafío Estructural */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div>
                <span className="text-xs font-bold uppercase text-[#c49a45] tracking-wider block mb-1">
                  Rol Estratégico en ARCCPCE
                </span>
                <p className="text-sm font-bold text-slate-800">{currentCountry.role}</p>
              </div>
              <div className="pt-2 border-t border-slate-100">
                <span className="text-xs font-bold uppercase text-[#ce1126] tracking-wider flex items-center gap-1 mb-1">
                  <AlertCircle className="w-3.5 h-3.5 text-[#ce1126]" /> Reto Primario del Gremio
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">{currentCountry.primaryChallenge}</p>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Estado de Regulación, Homologación y Descarga (Limpia y espaciosa) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{currentCountry.flag}</span>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-900">
                    {currentCountry.name} ({currentCountry.capital})
                  </h3>
                  <span className="text-xs text-[#0284c7] font-bold">Marco Jurídico y Homologación Profesional</span>
                </div>
              </div>

              <div className="space-y-3.5 text-sm">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <span className="text-xs font-bold text-[#c49a45] uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#c49a45]" /> Órgano Rector y Recertificación
                  </span>
                  <p className="text-slate-700 text-xs sm:text-sm font-medium leading-relaxed">{currentCountry.licensingStatus}</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <span className="text-xs font-bold text-[#002b7f] uppercase tracking-wider flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-[#002b7f]" /> Nivel de Formación Académica
                  </span>
                  <p className="text-slate-700 text-xs sm:text-sm font-medium leading-relaxed">{currentCountry.academicLevel}</p>
                </div>

                <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-150 space-y-1">
                  <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Movilidad Regional
                  </span>
                  <p className="text-slate-700 text-xs sm:text-sm font-medium leading-relaxed">{currentCountry.mobilityStatus}</p>
                </div>
              </div>
            </div>

            {/* CTA de Descarga de Guía de Homologación y Simulador */}
            <div className="pt-5 border-t border-slate-100 flex flex-col gap-4">
              <div className="text-xs text-slate-500 leading-relaxed">
                Documento oficial de consulta para homologación de títulos y ejercicio transfronterizo.
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                <button
                  type="button"
                  onClick={() => setIsMobilityOpen(true)}
                  className="w-full h-11 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-[13px] font-semibold shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 text-center"
                >
                  <RefreshCw className="w-4 h-4 text-emerald-100 shrink-0" />
                  <span className="truncate">Simular Homologación</span>
                </button>
                <button
                  type="button"
                  onClick={handleDownloadGuide}
                  className="w-full h-11 px-4 bg-[#002b7f] hover:bg-[#001d57] text-white rounded-xl text-xs sm:text-[13px] font-semibold shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 text-center"
                >
                  <Download className="w-4 h-4 text-sky-200 shrink-0" />
                  <span className="truncate">Descargar Guía</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-white/80 shrink-0" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Simulación de Homologación y Movilidad */}
      <RegionalMobilityModal
        isOpen={isMobilityOpen}
        onClose={() => setIsMobilityOpen(false)}
        defaultOriginId={currentCountry.id}
      />
    </section>
  );
}

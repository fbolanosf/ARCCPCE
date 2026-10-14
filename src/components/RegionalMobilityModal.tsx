"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  ArrowRight,
  ShieldCheck,
  FileCheck2,
  Clock,
  Building2,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  GraduationCap,
  Sparkles,
  Scale,
} from "lucide-react";
import metricsData from "@/data/regional-metrics.json";
import type { RegionalMetric } from "@/types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  defaultOriginId?: string;
}

export default function RegionalMobilityModal({
  isOpen,
  onClose,
  defaultOriginId = "CR",
}: Props) {
  const countries = metricsData as RegionalMetric[];

  const [originId, setOriginId] = useState<string>(defaultOriginId);
  const [destId, setDestId] = useState<string>(
    defaultOriginId === "PA" ? "CR" : "PA"
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (defaultOriginId) {
      setOriginId(defaultOriginId);
      if (defaultOriginId === destId) {
        const alt = countries.find((c) => c.id !== defaultOriginId);
        if (alt) setDestId(alt.id);
      }
    }
  }, [defaultOriginId]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const originCountry = countries.find((c) => c.id === originId) || countries[0];
  const destCountry = countries.find((c) => c.id === destId) || countries[1];

  const isSameCountry = originId === destId;

  const handleInvert = () => {
    const temp = originId;
    setOriginId(destId);
    setDestId(temp);
  };

  const handleGoToContact = () => {
    onClose();
    setTimeout(() => {
      const contactElem =
        document.getElementById("afiliacion") ||
        document.getElementById("contacto");
      if (contactElem) {
        contactElem.scrollIntoView({ behavior: "smooth" });
      }
    }, 150);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabecera del Modal */}
        <div className="bg-gradient-to-r from-sky-50 via-white to-blue-50/70 p-6 sm:p-7 border-b border-slate-200/90 flex items-start justify-between relative">
          <div className="space-y-1 pr-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-extrabold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              Mesa Técnica de Homologación ARCCPCE
            </div>
            <h3 className="text-xl sm:text-2xl font-black font-display text-slate-900">
              Simulador de Movilidad y Homologación Profesional
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
              Consulte los requisitos regulatorios, colegios rectores y tiempos estimados de validación curricular entre los países miembros.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white hover:bg-slate-100 text-slate-500 hover:text-slate-800 border border-slate-200 transition-colors shrink-0 shadow-xs"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cuerpo del Simulador con Scroll */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-slate-800">
          {/* Selectores de País de Origen y Destino */}
          <div className="grid grid-cols-1 sm:grid-cols-11 gap-3 sm:gap-4 items-center bg-slate-50/90 p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs">
            {/* Origen (5 cols) */}
            <div className="sm:col-span-5 space-y-1.5">
              <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider block">
                País de Graduación / Origen
              </label>
              <select
                value={originId}
                onChange={(e) => setOriginId(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-bold text-slate-900 focus:outline-none focus:border-[#002b7f] shadow-xs cursor-pointer"
              >
                {countries.map((c) => (
                  <option key={`orig-${c.id}`} value={c.id}>
                    {c.flag} {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Botón Invertir (1 col) */}
            <div className="sm:col-span-1 flex justify-center py-1 sm:py-0">
              <button
                type="button"
                onClick={handleInvert}
                title="Invertir países"
                className="w-9 h-9 rounded-xl bg-white border border-slate-300 hover:border-[#002b7f] hover:bg-sky-50 text-[#002b7f] flex items-center justify-center transition-all shadow-xs"
              >
                <ArrowRight className="w-4 h-4 transform sm:rotate-0 rotate-90" />
              </button>
            </div>

            {/* Destino (5 cols) */}
            <div className="sm:col-span-5 space-y-1.5">
              <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider block">
                País de Ejercicio / Destino
              </label>
              <select
                value={destId}
                onChange={(e) => setDestId(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-bold text-slate-900 focus:outline-none focus:border-[#002b7f] shadow-xs cursor-pointer"
              >
                {countries.map((c) => (
                  <option key={`dest-${c.id}`} value={c.id}>
                    {c.flag} {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Mensaje de Mismo País o Resultados */}
          {isSameCountry ? (
            <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm">
                <span className="font-bold block">Ha seleccionado el mismo país como origen y destino.</span>
                Para simular un proceso de homologación transfronteriza, elija dos naciones diferentes entre los 7 países miembros de ARCCPCE.
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Resumen del Corredor de Movilidad */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-sky-50/60 to-slate-50 border border-sky-100 flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl sm:text-3xl">{originCountry.flag}</span>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                  <span className="text-2xl sm:text-3xl">{destCountry.flag}</span>
                  <div>
                    <span className="text-xs sm:text-sm font-bold text-slate-900 block">
                      Corredor Bilateral: {originCountry.name} ➔ {destCountry.name}
                    </span>
                    <span className="text-[11px] text-emerald-700 font-semibold">
                      Convenio de Cooperación Mutua ARCCPCE Activo
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-slate-200 text-xs text-slate-700 font-bold shadow-xs">
                  <Clock className="w-3.5 h-3.5 text-[#002b7f]" />
                  <span>Plazo estimado: 4 a 8 semanas</span>
                </div>
              </div>

              {/* Comparativa Paso a Paso */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Paso 1: Certificación en Origen */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#002b7f] uppercase tracking-wider">
                    <Building2 className="w-4 h-4 text-[#002b7f]" />
                    Paso 1: Validación en Origen ({originCountry.name})
                  </div>
                  <div className="space-y-2 text-xs text-slate-600">
                    <p>
                      <strong>Órgano Acreditador:</strong> {originCountry.licensingStatus}
                    </p>
                    <p>
                      <strong>Nivel Académico Base:</strong> {originCountry.academicLevel}
                    </p>
                    <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 text-[11px] text-slate-500">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Requiere certificación de idoneidad ética y título apostillado.
                    </div>
                  </div>
                </div>

                {/* Paso 2: Inscripción y Colegiatura en Destino */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    Paso 2: Registro en Destino ({destCountry.name})
                  </div>
                  <div className="space-y-2 text-xs text-slate-600">
                    <p>
                      <strong>Colegio / Consejo Receptor:</strong> {destCountry.licensingStatus}
                    </p>
                    <p>
                      <strong>Estatus de Movilidad:</strong> {destCountry.mobilityStatus}
                    </p>
                    <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 text-[11px] text-slate-500">
                      <Scale className="w-3.5 h-3.5 text-[#002b7f]" />
                      Sujeto a tablas de equivalencia curricular del Consejo Técnico de Salud.
                    </div>
                  </div>
                </div>
              </div>

              {/* Requisitos y Checklist de Documentos */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-3">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <FileCheck2 className="w-4 h-4 text-[#002b7f]" /> Requisitos Documentales Estándar (DPC ARCCPCE)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#002b7f]" />
                    <span>Título universitario original con apostilla de La Haya.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#002b7f]" />
                    <span>Certificación de materias y horas clínicas de internado.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#002b7f]" />
                    <span>Constancia de buena conducta profesional emitida por el colegio de origen.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#002b7f]" />
                    <span>Pasaporte Profesional Digital DPC avalado por ARCCPCE.</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Pie del Modal con Acciones */}
        <div className="p-5 sm:p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-slate-500 text-center sm:text-left">
            ¿Requiere asesoría legal y curricular directa de la Secretaría Regional?
          </span>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-white text-xs font-bold transition-all shadow-xs"
            >
              Cerrar
            </button>
            <button
              type="button"
              onClick={handleGoToContact}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#002b7f] hover:bg-[#001d57] text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-1.5 shrink-0"
            >
              <span>Iniciar Asesoría en Formulario</span>
              <ArrowRight className="w-4 h-4 text-sky-200" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

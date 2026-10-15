"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Activity,
  Brain,
  ShieldCheck,
  Scale,
  Pill,
  Droplets,
  Clock,
  AlertCircle,
  FileCheck2,
  Stethoscope,
  ArrowRight,
  Sparkles,
  Gauge,
  HelpCircle,
  CheckCircle2,
} from "lucide-react";

type StationTab = "infusion" | "glasgow" | "braden" | "balance" | "dosificacion";

export default function ClinicalCareStation() {
  const [activeTab, setActiveTab] = useState<StationTab>("infusion");

  // ==================== 1. ESTADOS CALCULADORA INFUSIÓN ====================
  const [infusionVolume, setInfusionVolume] = useState<number>(1000);
  const [infusionHours, setInfusionHours] = useState<number>(8);
  const [dropFactor, setDropFactor] = useState<number>(20); // 10, 15, 20 macrogotero, 60 microgotero

  const mlPerHour = infusionHours > 0 ? Math.round((infusionVolume / infusionHours) * 10) / 10 : 0;
  const dropsPerMinute = infusionHours > 0 ? Math.round((infusionVolume * dropFactor) / (infusionHours * 60)) : 0;

  // ==================== 2. ESTADOS ESCALA DE GLASGOW ====================
  const [ocularResponse, setOcularResponse] = useState<number>(4);
  const [verbalResponse, setVerbalResponse] = useState<number>(5);
  const [motorResponse, setMotorResponse] = useState<number>(6);

  const glasgowTotal = ocularResponse + verbalResponse + motorResponse;

  const getGlasgowDiagnosis = (score: number) => {
    if (score >= 13) {
      return {
        severity: "Trauma Leve / Estado de Alerta Óptimo",
        badgeClass: "bg-emerald-50 text-emerald-800 border-emerald-200",
        barClass: "bg-emerald-600",
        description: "Paciente consciente, orientado y con reflejos de protección de vía aérea preservados. Requiere monitorización neurológica periódica cada 4 a 6 horas.",
      };
    }
    if (score >= 9) {
      return {
        severity: "Trauma Craneoencefálico Moderado",
        badgeClass: "bg-amber-50 text-amber-800 border-amber-200",
        barClass: "bg-amber-500",
        description: "Compromiso neurológico evidente con tendencia a la letargia o confusión. Evaluación neurológica horaria y considerar neuroimagen inmediata.",
      };
    }
    return {
      severity: "Trauma Grave / Criterio de Manejo Avanzado de Vía Aérea",
      badgeClass: "bg-rose-50 text-[#ce1126] border-rose-200",
      barClass: "bg-[#ce1126]",
      description: "Puntuación crítica (GCS menor o igual a 8). Alto riesgo de pérdida de reflejos protectores. Requiere aseguramiento inmediato de vía aérea e ingreso a UCI.",
    };
  };

  const glasgowDiag = getGlasgowDiagnosis(glasgowTotal);

  // ==================== 3. ESTADOS ESCALA DE BRADEN ====================
  const [bradenSensorial, setBradenSensorial] = useState<number>(4);
  const [bradenHumedad, setBradenHumedad] = useState<number>(4);
  const [bradenActividad, setBradenActividad] = useState<number>(4);
  const [bradenMovilidad, setBradenMovilidad] = useState<number>(4);
  const [bradenNutricion, setBradenNutricion] = useState<number>(3);
  const [bradenFriccion, setBradenFriccion] = useState<number>(3);

  const bradenTotal = bradenSensorial + bradenHumedad + bradenActividad + bradenMovilidad + bradenNutricion + bradenFriccion;

  const getBradenDiagnosis = (score: number) => {
    if (score <= 12) {
      return {
        category: "Riesgo Muy Alto",
        badgeClass: "bg-rose-50 text-[#ce1126] border-rose-200",
        directives: [
          "Colchón de aire alternante o superficie especial de redistribución de presión (SEMR)",
          "Cambios posturales rigurosos cada 2 horas con protección sacra y taloneras hidrocelulares",
          "Aplicación de ácidos grasos hiperoxigenados (AGHO) en zonas de prominencia ósea",
          "Optimización calórico-proteica con soporte nutricional clínico",
        ],
      };
    }
    if (score <= 14) {
      return {
        category: "Riesgo Moderado",
        badgeClass: "bg-amber-50 text-amber-800 border-amber-200",
        directives: [
          "Programa de cambios posturales sistemáticos cada 2 a 3 horas",
          "Uso de superficies dinámicas reductoras de presión",
          "Mantenimiento de piel limpia, hidratada y libre de exceso de humedad",
          "Vigilancia continua de ingesta dietética proteica",
        ],
      };
    }
    if (score <= 18) {
      return {
        category: "Riesgo Bajo",
        badgeClass: "bg-sky-50 text-[#002b7f] border-sky-200",
        directives: [
          "Fomentar deambulación activa y cambios de decúbito asistidos",
          "Hidratación tópica emoliente y control diario de piel",
          "Supervisión de aportes hídricos y nutricionales en cada turno",
        ],
      };
    }
    return {
      category: "Sin Riesgo Aparente",
      badgeClass: "bg-emerald-50 text-emerald-800 border-emerald-200",
      directives: [
        "Cuidados generales de higiene cutánea y movilización habitual",
        "Reevaluación de la escala en cada cambio de condición clínica o 48 horas",
      ],
    };
  };

  const bradenDiag = getBradenDiagnosis(bradenTotal);

  // ==================== 4. ESTADOS BALANCE HÍDRICO ====================
  const [oralIntake, setOralIntake] = useState<number>(300);
  const [ivFluids, setIvFluids] = useState<number>(1000);
  const [bloodInfusion, setBloodInfusion] = useState<number>(0);
  const [medDilution, setMedDilution] = useState<number>(150);

  const [urineOutput, setUrineOutput] = useState<number>(900);
  const [drainLosses, setDrainLosses] = useState<number>(100);
  const [digestiveLosses, setDigestiveLosses] = useState<number>(50);

  const [patientWeightKg, setPatientWeightKg] = useState<number>(70);
  const [shiftHours, setShiftHours] = useState<number>(8);

  const insensibleLosses = Math.round(patientWeightKg * 0.5 * shiftHours);
  const totalIntake = oralIntake + ivFluids + bloodInfusion + medDilution;
  const totalOutput = urineOutput + drainLosses + digestiveLosses + insensibleLosses;
  const netFluidBalance = totalIntake - totalOutput;

  // ==================== 5. ESTADOS DOSIFICACIÓN FARMACOLÓGICA ====================
  const [prescribedDose, setPrescribedDose] = useState<number>(75);
  const [availableStock, setAvailableStock] = useState<number>(100);
  const [diluentVolume, setDiluentVolume] = useState<number>(2);

  const calculatedVolumeToAdminister =
    availableStock > 0 ? Math.round(((prescribedDose * diluentVolume) / availableStock) * 100) / 100 : 0;

  // Scroll suave al formulario de afiliación completando especialidad
  const handleApplyToCommittee = () => {
    const affiliationElem = document.getElementById("afiliacion") || document.getElementById("contacto");
    if (affiliationElem) {
      affiliationElem.scrollIntoView({ behavior: "smooth" });
    }
    const specialtyInput = document.getElementById("specialtyInput") as HTMLInputElement | null;
    if (specialtyInput) {
      specialtyInput.value = "Comisión de Cuidados Críticos y Práctica Clínica";
      specialtyInput.focus();
    }
  };

  return (
    <section
      id="estacion-clinica"
      className="py-20 bg-gradient-to-br from-white via-slate-50/70 to-sky-50/30 relative overflow-hidden my-14 border-y border-slate-200/80 scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabecera Institucional Sobria y Elegante */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 text-[#002b7f] text-[11px] font-semibold uppercase tracking-wider mb-3 shadow-xs">
            <Activity className="w-3.5 h-3.5 text-[#0284c7]" strokeWidth={1.75} />
            Instrumental Clínico Hospitalario • Estandarización Regional ARCCPCE
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 tracking-tight">
            Estación de Decisión Clínica & Métricas del Cuidado
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-3 leading-relaxed">
            Herramientas interactivas estandarizadas de alta precisión para el ejercicio profesional hospitalario, monitorización hemodinámica y seguridad del paciente en Centroamérica y el Caribe.
          </p>
        </div>

        {/* Navegador de Pestañas Vectorial (Tab Selector Formal Sin Emojis) */}
        <div className="bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200 flex flex-wrap gap-1.5 justify-center max-w-4xl mx-auto mb-10 shadow-xs">
          <button
            onClick={() => setActiveTab("infusion")}
            className={`cursor-pointer ${
              activeTab === "infusion"
                ? "bg-white text-sky-950 font-semibold shadow-sm border border-slate-200/60 rounded-xl px-4 py-2.5 text-xs flex items-center gap-2"
                : "text-slate-600 hover:text-sky-900 hover:bg-white/60 font-medium rounded-xl px-4 py-2.5 text-xs transition-all flex items-center gap-2"
            }`}
          >
            <Activity className="w-4 h-4 text-[#0284c7]" strokeWidth={1.75} />
            <span>Infusión y Goteo</span>
          </button>

          <button
            onClick={() => setActiveTab("glasgow")}
            className={`cursor-pointer ${
              activeTab === "glasgow"
                ? "bg-white text-sky-950 font-semibold shadow-sm border border-slate-200/60 rounded-xl px-4 py-2.5 text-xs flex items-center gap-2"
                : "text-slate-600 hover:text-sky-900 hover:bg-white/60 font-medium rounded-xl px-4 py-2.5 text-xs transition-all flex items-center gap-2"
            }`}
          >
            <Brain className="w-4 h-4 text-[#002b7f]" strokeWidth={1.75} />
            <span>Escala de Coma de Glasgow</span>
          </button>

          <button
            onClick={() => setActiveTab("braden")}
            className={`cursor-pointer ${
              activeTab === "braden"
                ? "bg-white text-sky-950 font-semibold shadow-sm border border-slate-200/60 rounded-xl px-4 py-2.5 text-xs flex items-center gap-2"
                : "text-slate-600 hover:text-sky-900 hover:bg-white/60 font-medium rounded-xl px-4 py-2.5 text-xs transition-all flex items-center gap-2"
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-emerald-600" strokeWidth={1.75} />
            <span>Escala Braden (UPP)</span>
          </button>

          <button
            onClick={() => setActiveTab("balance")}
            className={`cursor-pointer ${
              activeTab === "balance"
                ? "bg-white text-sky-950 font-semibold shadow-sm border border-slate-200/60 rounded-xl px-4 py-2.5 text-xs flex items-center gap-2"
                : "text-slate-600 hover:text-sky-900 hover:bg-white/60 font-medium rounded-xl px-4 py-2.5 text-xs transition-all flex items-center gap-2"
            }`}
          >
            <Scale className="w-4 h-4 text-amber-600" strokeWidth={1.75} />
            <span>Balance Hídrico Dinámico</span>
          </button>

          <button
            onClick={() => setActiveTab("dosificacion")}
            className={`cursor-pointer ${
              activeTab === "dosificacion"
                ? "bg-white text-sky-950 font-semibold shadow-sm border border-slate-200/60 rounded-xl px-4 py-2.5 text-xs flex items-center gap-2"
                : "text-slate-600 hover:text-sky-900 hover:bg-white/60 font-medium rounded-xl px-4 py-2.5 text-xs transition-all flex items-center gap-2"
            }`}
          >
            <Pill className="w-4 h-4 text-[#ce1126]" strokeWidth={1.75} />
            <span>Dosificación Farmacológica</span>
          </button>
        </div>

        {/* Workspace Central Amplio de Alta Definición con Ilustración Isométrica Exterior */}
        <div className="relative max-w-5xl mx-auto">
          {/* Ilustración Isométrica de Enfermera Externa (ubicada por fuera de la ventana a la izquierda en pantallas grandes) */}
          <div className="hidden xl:flex flex-col items-center absolute -left-72 2xl:-left-80 top-6 w-64 pointer-events-none z-10 select-none">
            {/* Halo de luz suave difusa */}
            <div className="absolute inset-0 bg-sky-200/35 rounded-full blur-2xl -z-10" />
            <div className="relative w-60 h-72">
              <Image
                src="/assets/illustrations/iso_nurse_medication.png"
                alt="Enfermera profesional administrando y calibrando perfusión clínica intravenosa"
                fill
                sizes="240px"
                className="object-contain filter drop-shadow-[0_12px_24px_rgba(0,43,127,0.14)]"
                priority
              />
            </div>
            <div className="mt-1 bg-white/95 backdrop-blur-xs px-3.5 py-1.5 rounded-full border border-sky-100 shadow-sm text-center">
              <span className="text-[10px] font-bold text-[#002b7f] tracking-wide block">
                Seguridad & Dosificación
              </span>
              <span className="text-[9px] text-slate-500 block leading-tight">
                Protocolo Internacional ARCCPCE
              </span>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-900/[0.03] p-6 sm:p-8 md:p-10">
          {/* ========================================================
              TAB 1: INFUSIÓN Y VELOCIDAD DE GOTEO
             ======================================================== */}
          {activeTab === "infusion" && (
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-[#0284c7]" strokeWidth={1.75} />
                    <h3 className="text-xl font-extrabold text-slate-900 font-display">
                      Cálculo de Infusión Continua y Goteo Gravitacional
                    </h3>
                  </div>
                  <p className="text-slate-500 text-xs mt-1">
                    Determinación de flujo volumétrico en bombas de infusión y frecuencia de goteo en equipos de perfusión.
                  </p>
                </div>
                <span className="text-[11px] font-mono text-slate-500 bg-slate-50 px-3 py-1 rounded-lg border border-slate-200 w-fit">
                  Fórmula: (Volumen × Factor) ÷ (Horas × 60)
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-slate-700 text-xs font-bold uppercase tracking-wider mb-2">
                    Volumen a Infundir (mL)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      inputMode="decimal"
                      min={1}
                      value={infusionVolume}
                      onChange={(e) => setInfusionVolume(Math.max(0, Number(e.target.value)))}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-800 focus:outline-none focus:border-[#0284c7] transition-all bg-slate-50/50"
                    />
                    <span className="absolute right-4 top-2.5 text-xs font-semibold text-slate-400">mL</span>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 text-xs font-bold uppercase tracking-wider mb-2">
                    Tiempo de Perfusión (Horas)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      inputMode="decimal"
                      min={0.1}
                      step={0.5}
                      value={infusionHours}
                      onChange={(e) => setInfusionHours(Math.max(0.1, Number(e.target.value)))}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-800 focus:outline-none focus:border-[#0284c7] transition-all bg-slate-50/50"
                    />
                    <span className="absolute right-4 top-2.5 text-xs font-semibold text-slate-400">Horas</span>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 text-xs font-bold uppercase tracking-wider mb-2">
                    Factor de Calibración
                  </label>
                  <select
                    value={dropFactor}
                    onChange={(e) => setDropFactor(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#0284c7] transition-all bg-slate-50/50"
                  >
                    <option value={20}>Macrogotero Estándar (20 gtt/mL)</option>
                    <option value={15}>Macrogotero Sangre / Derivados (15 gtt/mL)</option>
                    <option value={10}>Macrogotero Soluciones Densas (10 gtt/mL)</option>
                    <option value={60}>Microgotero Pediátrico / UCI (60 gtt/mL)</option>
                  </select>
                </div>
              </div>

              {/* Cuadrícula de Resultados de Alta Precisión */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                <div className="p-6 rounded-2xl bg-sky-50/60 border border-sky-100/90 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#0284c7]">
                      Bomba de Infusión
                    </span>
                    <Clock className="w-4 h-4 text-[#0284c7]" strokeWidth={1.75} />
                  </div>
                  <div>
                    <span className="text-4xl font-black font-display text-slate-900">{mlPerHour}</span>
                    <span className="text-xs font-semibold text-slate-500 ml-2">mL / hora</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-2">
                    Flujo horario continuo programable en bomba volumétrica digital.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-emerald-50/60 border border-emerald-100/90 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
                      Goteo Gravitacional
                    </span>
                    <Droplets className="w-4 h-4 text-emerald-600" strokeWidth={1.75} />
                  </div>
                  <div>
                    <span className="text-4xl font-black font-display text-slate-900">{dropsPerMinute}</span>
                    <span className="text-xs font-semibold text-slate-500 ml-2">gotas / minuto</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-2">
                    Frecuencia de caída calculada con factor de {dropFactor} gtt/mL para infusión por cámara.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 2: ESCALA DE COMA DE GLASGOW
             ======================================================== */}
          {activeTab === "glasgow" && (
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <Brain className="w-5 h-5 text-[#002b7f]" strokeWidth={1.75} />
                    <h3 className="text-xl font-extrabold text-slate-900 font-display">
                      Escala de Coma de Glasgow (GCS)
                    </h3>
                  </div>
                  <p className="text-slate-500 text-xs mt-1">
                    Evaluación estandarizada del nivel de consciencia en pacientes neurocríticos y traumatizados.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-600">Puntaje Actual:</span>
                  <span className="text-2xl font-black font-display text-[#002b7f]">{glasgowTotal} / 15</span>
                </div>
              </div>

              {/* Tres Dominios de Evaluación */}
              <div className="space-y-6">
                {/* 1. Ocular */}
                <div>
                  <span className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    1. Apertura Ocular (O) • 1 a 4 puntos
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { pts: 4, label: "Espontánea" },
                      { pts: 3, label: "Al estímulo verbal" },
                      { pts: 2, label: "Al estímulo doloroso" },
                      { pts: 1, label: "Ninguna respuesta" },
                    ].map((opt) => (
                      <button
                        key={opt.pts}
                        type="button"
                        onClick={() => setOcularResponse(opt.pts)}
                        className={`p-3 rounded-xl border text-xs font-semibold transition-all text-left flex flex-col justify-between cursor-pointer ${
                          ocularResponse === opt.pts
                            ? "bg-[#002b7f] text-white border-[#002b7f] shadow-xs"
                            : "bg-slate-50/70 border-slate-200 text-slate-700 hover:border-sky-300 hover:bg-white"
                        }`}
                      >
                        <span className="font-extrabold">{opt.pts} pts</span>
                        <span className="text-[11px] mt-1 leading-snug">{opt.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Verbal */}
                <div>
                  <span className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    2. Respuesta Verbal (V) • 1 a 5 puntos
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                    {[
                      { pts: 5, label: "Orientado y conversa" },
                      { pts: 4, label: "Confuso y desorientado" },
                      { pts: 3, label: "Palabras inapropiadas" },
                      { pts: 2, label: "Sonidos incomprensibles" },
                      { pts: 1, label: "Ninguna respuesta" },
                    ].map((opt) => (
                      <button
                        key={opt.pts}
                        type="button"
                        onClick={() => setVerbalResponse(opt.pts)}
                        className={`p-3 rounded-xl border text-xs font-semibold transition-all text-left flex flex-col justify-between cursor-pointer ${
                          verbalResponse === opt.pts
                            ? "bg-[#002b7f] text-white border-[#002b7f] shadow-xs"
                            : "bg-slate-50/70 border-slate-200 text-slate-700 hover:border-sky-300 hover:bg-white"
                        }`}
                      >
                        <span className="font-extrabold">{opt.pts} pts</span>
                        <span className="text-[11px] mt-1 leading-snug">{opt.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Motora */}
                <div>
                  <span className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    3. Respuesta Motora (M) • 1 a 6 puntos
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                    {[
                      { pts: 6, label: "Obedece órdenes" },
                      { pts: 5, label: "Localiza el dolor" },
                      { pts: 4, label: "Retira al dolor" },
                      { pts: 3, label: "Flexión anormal (decorticación)" },
                      { pts: 2, label: "Extensión anormal (descerebración)" },
                      { pts: 1, label: "Ninguna respuesta" },
                    ].map((opt) => (
                      <button
                        key={opt.pts}
                        type="button"
                        onClick={() => setMotorResponse(opt.pts)}
                        className={`p-3 rounded-xl border text-xs font-semibold transition-all text-left flex flex-col justify-between cursor-pointer ${
                          motorResponse === opt.pts
                            ? "bg-[#002b7f] text-white border-[#002b7f] shadow-xs"
                            : "bg-slate-50/70 border-slate-200 text-slate-700 hover:border-sky-300 hover:bg-white"
                        }`}
                      >
                        <span className="font-extrabold">{opt.pts} pts</span>
                        <span className="text-[11px] mt-1 leading-snug">{opt.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Panel de Diagnóstico Clínico Dinámico */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Estratificación Clínica
                    </span>
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${glasgowDiag.badgeClass}`}>
                      {glasgowDiag.severity}
                    </span>
                  </div>
                  <span className="text-xs font-mono font-semibold text-slate-600">
                    O{ocularResponse} V{verbalResponse} M{motorResponse} = {glasgowTotal} pts
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {glasgowDiag.description}
                </p>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 3: ESCALA DE BRADEN (RIESGO DE UPP)
             ======================================================== */}
          {activeTab === "braden" && (
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-600" strokeWidth={1.75} />
                    <h3 className="text-xl font-extrabold text-slate-900 font-display">
                      Escala de Braden • Prevención de Lesiones por Presión (UPP)
                    </h3>
                  </div>
                  <p className="text-slate-500 text-xs mt-1">
                    Evaluación sistemática de riesgo para guiar intervenciones preventivas en pacientes hospitalizados.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-600">Puntaje Braden:</span>
                  <span className="text-2xl font-black font-display text-emerald-700">{bradenTotal} / 23</span>
                </div>
              </div>

              {/* 6 Dominios en Grid de 2 Columnas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-slate-700 text-xs font-bold uppercase tracking-wider mb-2">
                    1. Percepción Sensorial
                  </label>
                  <select
                    value={bradenSensorial}
                    onChange={(e) => setBradenSensorial(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 bg-slate-50/50"
                  >
                    <option value={1}>1 punto: Completamente limitada</option>
                    <option value={2}>2 puntos: Muy limitada</option>
                    <option value={3}>3 puntos: Ligeramente limitada</option>
                    <option value={4}>4 puntos: Sin limitaciones</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 text-xs font-bold uppercase tracking-wider mb-2">
                    2. Exposición a la Humedad
                  </label>
                  <select
                    value={bradenHumedad}
                    onChange={(e) => setBradenHumedad(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 bg-slate-50/50"
                  >
                    <option value={1}>1 punto: Constantemente húmeda</option>
                    <option value={2}>2 puntos: Muy húmeda</option>
                    <option value={3}>3 puntos: Ocasionalmente húmeda</option>
                    <option value={4}>4 puntos: Raramente húmeda</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 text-xs font-bold uppercase tracking-wider mb-2">
                    3. Actividad Física
                  </label>
                  <select
                    value={bradenActividad}
                    onChange={(e) => setBradenActividad(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 bg-slate-50/50"
                  >
                    <option value={1}>1 punto: Encamado</option>
                    <option value={2}>2 puntos: En silla</option>
                    <option value={3}>3 puntos: Deambula ocasionalmente</option>
                    <option value={4}>4 puntos: Deambula frecuentemente</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 text-xs font-bold uppercase tracking-wider mb-2">
                    4. Movilidad Corporal
                  </label>
                  <select
                    value={bradenMovilidad}
                    onChange={(e) => setBradenMovilidad(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 bg-slate-50/50"
                  >
                    <option value={1}>1 punto: Completamente inmóvil</option>
                    <option value={2}>2 puntos: Muy limitada</option>
                    <option value={3}>3 puntos: Ligeramente limitada</option>
                    <option value={4}>4 puntos: Sin limitaciones</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 text-xs font-bold uppercase tracking-wider mb-2">
                    5. Patrón Nutricional
                  </label>
                  <select
                    value={bradenNutricion}
                    onChange={(e) => setBradenNutricion(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 bg-slate-50/50"
                  >
                    <option value={1}>1 punto: Muy pobre</option>
                    <option value={2}>2 puntos: Probablemente inadecuada</option>
                    <option value={3}>3 puntos: Adecuada</option>
                    <option value={4}>4 puntos: Excelente</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 text-xs font-bold uppercase tracking-wider mb-2">
                    6. Fricción y Cizallamiento
                  </label>
                  <select
                    value={bradenFriccion}
                    onChange={(e) => setBradenFriccion(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 bg-slate-50/50"
                  >
                    <option value={1}>1 punto: Problema constante</option>
                    <option value={2}>2 puntos: Problema potencial</option>
                    <option value={3}>3 puntos: No existe problema aparente</option>
                  </select>
                </div>
              </div>

              {/* Panel de Estratificación y Cuidados Preventivos */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Nivel de Riesgo Evaluado
                  </span>
                  <span className={`text-xs font-bold px-3 py-0.5 rounded-full border ${bradenDiag.badgeClass}`}>
                    {bradenDiag.category} ({bradenTotal} puntos)
                  </span>
                </div>
                <div className="pt-2 border-t border-slate-200/60">
                  <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Directrices de Cuidado Preventivo Inmediato:
                  </span>
                  <ul className="space-y-1 text-xs text-slate-600">
                    {bradenDiag.directives.map((dir, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" strokeWidth={2} />
                        <span>{dir}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 4: BALANCE HÍDRICO DINÁMICO
             ======================================================== */}
          {activeTab === "balance" && (
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <Scale className="w-5 h-5 text-amber-600" strokeWidth={1.75} />
                    <h3 className="text-xl font-extrabold text-slate-900 font-display">
                      Balance Hídrico Dinámico del Paciente
                    </h3>
                  </div>
                  <p className="text-slate-500 text-xs mt-1">
                    Cuantificación de ingresos, egresos y pérdidas insensibles para control del estado de volemia.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-600">Balance Neto:</span>
                  <span
                    className={`text-2xl font-black font-display ${
                      netFluidBalance >= 0 ? "text-emerald-700" : "text-[#ce1126]"
                    }`}
                  >
                    {netFluidBalance >= 0 ? `+${netFluidBalance}` : netFluidBalance} mL
                  </span>
                </div>
              </div>

              {/* Cuadrícula de Entradas y Salidas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Columna Entradas */}
                <div className="p-5 rounded-2xl bg-sky-50/40 border border-sky-100 space-y-4">
                  <span className="block text-xs font-bold uppercase tracking-wider text-[#002b7f]">
                    Entradas (Líquidos Administrados)
                  </span>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block text-slate-600 font-semibold mb-1">Vía Oral / Enteral</label>
                      <input
                        type="number"
                        inputMode="decimal"
                        value={oralIntake}
                        onChange={(e) => setOralIntake(Number(e.target.value))}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 font-semibold mb-1">Fluidoterapia IV</label>
                      <input
                        type="number"
                        inputMode="decimal"
                        value={ivFluids}
                        onChange={(e) => setIvFluids(Number(e.target.value))}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 font-semibold mb-1">Hemoderivados</label>
                      <input
                        type="number"
                        inputMode="decimal"
                        value={bloodInfusion}
                        onChange={(e) => setBloodInfusion(Number(e.target.value))}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 font-semibold mb-1">Dilución de Fármacos</label>
                      <input
                        type="number"
                        inputMode="decimal"
                        value={medDilution}
                        onChange={(e) => setMedDilution(Number(e.target.value))}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white font-bold"
                      />
                    </div>
                  </div>
                  <div className="pt-2 border-t border-sky-200/60 flex justify-between text-xs font-bold text-[#002b7f]">
                    <span>Total Ingresos:</span>
                    <span>{totalIntake} mL</span>
                  </div>
                </div>

                {/* Columna Salidas */}
                <div className="p-5 rounded-2xl bg-rose-50/30 border border-rose-100 space-y-4">
                  <span className="block text-xs font-bold uppercase tracking-wider text-[#ce1126]">
                    Salidas (Pérdidas Cuantificadas)
                  </span>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block text-slate-600 font-semibold mb-1">Diuresis</label>
                      <input
                        type="number"
                        inputMode="decimal"
                        value={urineOutput}
                        onChange={(e) => setUrineOutput(Number(e.target.value))}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 font-semibold mb-1">Drenajes Quirúrgicos</label>
                      <input
                        type="number"
                        inputMode="decimal"
                        value={drainLosses}
                        onChange={(e) => setDrainLosses(Number(e.target.value))}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 font-semibold mb-1">Pérdidas Digestivas</label>
                      <input
                        type="number"
                        inputMode="decimal"
                        value={digestiveLosses}
                        onChange={(e) => setDigestiveLosses(Number(e.target.value))}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 font-semibold mb-1">
                        Pérdidas Insensibles
                      </label>
                      <div className="px-3 py-2 rounded-xl border border-slate-200 bg-slate-100 font-bold text-slate-700">
                        {insensibleLosses} mL
                      </div>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-rose-200/60 flex justify-between text-xs font-bold text-[#ce1126]">
                    <span>Total Egresos:</span>
                    <span>{totalOutput} mL</span>
                  </div>
                </div>
              </div>

              {/* Ajuste de Parámetros de Pérdidas Insensibles */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-slate-700 uppercase tracking-wider">Parámetros Clínicos:</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-500">Peso:</span>
                    <input
                      type="number"
                      inputMode="decimal"
                      value={patientWeightKg}
                      onChange={(e) => setPatientWeightKg(Math.max(1, Number(e.target.value)))}
                      className="w-16 px-2 py-1 rounded-lg border border-slate-300 font-bold text-center"
                    />
                    <span className="text-slate-500">kg</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-500">Turno:</span>
                    <select
                      value={shiftHours}
                      onChange={(e) => setShiftHours(Number(e.target.value))}
                      className="px-2 py-1 rounded-lg border border-slate-300 font-bold bg-white"
                    >
                      <option value={6}>6 horas</option>
                      <option value={8}>8 horas</option>
                      <option value={12}>12 horas</option>
                      <option value={24}>24 horas</option>
                    </select>
                  </div>
                </div>
                <span className="text-[11px] text-slate-400 italic">
                  Fórmula estándar: (Peso × 0.5) × Horas de turno
                </span>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 5: DOSIFICACIÓN FARMACOLÓGICA
             ======================================================== */}
          {activeTab === "dosificacion" && (
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <Pill className="w-5 h-5 text-[#ce1126]" strokeWidth={1.75} />
                    <h3 className="text-xl font-extrabold text-slate-900 font-display">
                      Dilución y Dosificación Farmacológica Hospitalaria
                    </h3>
                  </div>
                  <p className="text-slate-500 text-xs mt-1">
                    Regla de tres asistencial para cálculo exacto de alícuotas y volúmenes de medicamentos parenterales.
                  </p>
                </div>
                <span className="text-[11px] font-mono text-slate-500 bg-slate-50 px-3 py-1 rounded-lg border border-slate-200 w-fit">
                  Volumen = (Dosis Indicada × Volumen Presentación) ÷ Concentración Disponible
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-slate-700 text-xs font-bold uppercase tracking-wider mb-2">
                    Dosis Prescrita
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      inputMode="decimal"
                      value={prescribedDose}
                      onChange={(e) => setPrescribedDose(Math.max(0, Number(e.target.value)))}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-800 bg-slate-50/50"
                    />
                    <span className="absolute right-4 top-2.5 text-xs font-semibold text-slate-400">mg</span>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 text-xs font-bold uppercase tracking-wider mb-2">
                    Presentación Comercial (Stock)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      inputMode="decimal"
                      value={availableStock}
                      onChange={(e) => setAvailableStock(Math.max(0.1, Number(e.target.value)))}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-800 bg-slate-50/50"
                    />
                    <span className="absolute right-4 top-2.5 text-xs font-semibold text-slate-400">mg</span>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 text-xs font-bold uppercase tracking-wider mb-2">
                    Volumen de Disolución
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      inputMode="decimal"
                      value={diluentVolume}
                      onChange={(e) => setDiluentVolume(Math.max(0.1, Number(e.target.value)))}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-800 bg-slate-50/50"
                    />
                    <span className="absolute right-4 top-2.5 text-xs font-semibold text-slate-400">mL</span>
                  </div>
                </div>
              </div>

              {/* Resultado Destacado de Alta Precisión */}
              <div className="p-7 rounded-2xl bg-gradient-to-r from-sky-50/80 via-white to-emerald-50/70 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
                    Volumen Preciso a Extraer y Administrar:
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-black font-display text-[#002b7f]">
                      {calculatedVolumeToAdminister}
                    </span>
                    <span className="text-base font-bold text-slate-600">mL</span>
                  </div>
                </div>
                <div className="max-w-md text-xs text-slate-600 bg-white/80 p-3.5 rounded-xl border border-slate-200 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-amber-900">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                    <span>Principio de Seguridad Farmacológica:</span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-slate-500">
                    Verifique siempre los 5 correctos (paciente, medicamento, dosis, vía y horario). En fármacos de alto riesgo (heparinas, electrolitos concentrados, insulina) aplique doble chequeo independiente.
                  </p>
                </div>
              </div>
            </div>
          )}
          </div>
        </div>

        {/* Banner de Vinculación Académica y Gremial */}
        <div className="mt-10 max-w-5xl mx-auto p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 text-[#002b7f] shadow-xs">
              <Stethoscope className="w-5 h-5" strokeWidth={1.75} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 font-display">
                ¿Deseas participar en la estandarización de guías clínicas o proponer nuevos algoritmos de decisión para la región?
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Los comités técnicos de ARCCPCE integran expertos hospitalarios de los 7 países miembros.
              </p>
            </div>
          </div>

          <button
            onClick={handleApplyToCommittee}
            className="shrink-0 bg-[#002b7f] hover:bg-[#001d57] text-white text-xs font-bold py-3 px-5 rounded-xl transition-all shadow-sm flex items-center gap-2 cursor-pointer"
          >
            <span>Postular a la Comisión de Cuidados Críticos y Práctica Clínica</span>
            <ArrowRight className="w-4 h-4 text-sky-200" />
          </button>
        </div>
      </div>
    </section>
  );
}

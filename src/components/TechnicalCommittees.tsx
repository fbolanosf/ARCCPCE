"use client";

import React from "react";
import { Activity, Stethoscope, BookOpen, MonitorSmartphone, ArrowRight, ShieldCheck } from "lucide-react";

interface Committee {
  id: string;
  name: string;
  shortDesc: string;
  focus: string;
  deliverable: string;
  icon: React.ReactNode;
  badge: string;
}

const COMMITTEES: Committee[] = [
  {
    id: "criticos",
    name: "Comisión de Cuidados Críticos y Soporte Vital Avanzado",
    shortDesc: "Enfoque en UCI, emergencias, reanimación avanzada y estandarización de protocolos en paciente crítico regional.",
    focus: "Unidades de Cuidados Intensivos (UCI), Trauma y Soporte Hemodinámico",
    deliverable: "Guías Clínicas Mesoamericanas de Cuidados Críticos",
    icon: <Activity className="w-6 h-6 text-emerald-600" />,
    badge: "Alta Complejidad",
  },
  {
    id: "salud-publica",
    name: "Comisión de Salud Pública, Epidemiología y APS",
    shortDesc: "Atención primaria, programas de inmunización, vigilancia epidemiológica comunitaria y determinantes sociales.",
    focus: "Atención Primaria en Salud (APS), Redes Comunitarias y Vacunación",
    deliverable: "Protocolo Regional de Cobertura Sanitaria Universal",
    icon: <Stethoscope className="w-6 h-6 text-[#002b7f]" />,
    badge: "Impacto Comunitario",
  },
  {
    id: "docencia",
    name: "Comisión de Liderazgo, Docencia e Investigación Científica",
    shortDesc: "Homologación curricular, bioética, formación continua y fomento de publicaciones indexadas regionales.",
    focus: "Acreditación Académica, Posgrados y Líneas de Investigación SciELO",
    deliverable: "Marco de Homologación Curricular y Revistas Científicas",
    icon: <BookOpen className="w-6 h-6 text-[#c49a45]" />,
    badge: "Academia & Ciencia",
  },
  {
    id: "tele-enfermeria",
    name: "Comisión de Tele-Enfermería y Tecnologías en Salud",
    shortDesc: "Transformación digital, triaje remoto, registro clínico electrónico y tele-asistencia en áreas remotas.",
    focus: "Salud Digital, Tele-monitoreo de Crónicos y Seguridad de Datos Clínicos",
    deliverable: "Estándar de Interoperabilidad y Tele-cuidado ARCCPCE",
    icon: <MonitorSmartphone className="w-6 h-6 text-sky-600" />,
    badge: "Innovación 4.0",
  },
];

export default function TechnicalCommittees() {
  const handleJoinCommittee = (committeeName: string) => {
    const affiliationElem = document.getElementById("afiliacion") || document.getElementById("contacto");
    if (affiliationElem) {
      affiliationElem.scrollIntoView({ behavior: "smooth" });
    }

    // Si el campo de especialidad existe, asignamos el comité seleccionado
    const specialtyInput = document.getElementById("specialtyInput") as HTMLInputElement | null;
    if (specialtyInput) {
      specialtyInput.value = committeeName;
      specialtyInput.focus();
    } else {
      const input = document.querySelector('input[placeholder*="Especialidad"]') as HTMLInputElement | null;
      if (input) {
        input.value = committeeName;
        input.focus();
      }
    }
  };

  return (
    <section id="comites" className="py-16 bg-slate-50/60 border-t border-slate-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabecera */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-[#002b7f] text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Órganos Científicos Consultivos
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 tracking-tight">
            Comités Técnicos Regionales
          </h2>
          <p className="text-slate-600 text-sm mt-2.5 leading-relaxed">
            Espacios colegiados interdisciplinarios dedicados a normar la práctica, elevar la evidencia y liderar el desarrollo científico de la enfermería en Centroamérica y el Caribe.
          </p>
        </div>

        {/* Grid de 4 Comités */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {COMMITTEES.map((com) => (
            <div
              key={com.id}
              className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:shadow-md hover:border-emerald-300 transition-all duration-300 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    {com.icon}
                  </div>
                  <span className="text-[11px] font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full uppercase tracking-wider border border-slate-200">
                    {com.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-bold font-display text-slate-900 group-hover:text-[#002b7f] transition-colors leading-snug">
                    {com.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                    {com.shortDesc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-1.5 text-xs">
                  <div className="flex items-start gap-1.5 text-slate-500">
                    <span className="font-bold text-slate-700 shrink-0">Núcleo:</span>
                    <span>{com.focus}</span>
                  </div>
                  <div className="flex items-start gap-1.5 text-slate-500">
                    <span className="font-bold text-emerald-700 shrink-0">Entregable:</span>
                    <span className="text-slate-700 font-medium">{com.deliverable}</span>
                  </div>
                </div>
              </div>

              <div className="pt-5 mt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => handleJoinCommittee(com.name)}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-emerald-600 text-slate-800 hover:text-white border border-slate-200 hover:border-emerald-600 font-bold text-xs transition-all duration-200 flex items-center justify-center gap-2 group-hover:shadow-xs"
                >
                  <span>Participar en esta Comisión</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

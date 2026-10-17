"use client";

import React, { useState } from "react";
import { Award, Globe2, ShieldCheck, GraduationCap, Building2, MapPin, Users, CheckCircle2 } from "lucide-react";

interface NationalExpert {
  name: string;
  profession: string;
  credentials: string[];
}

interface InternationalExpert {
  name: string;
  country: string;
  flagCode: string;
  distinction: string;
}

const NATIONAL_EXPERTS: NationalExpert[] = [
  {
    name: "Dra. Carmen Loaiza Madriz",
    profession: "Enfermera Profesional",
    credentials: [
      "Excoordinadora Nacional de Enfermería de la Caja Costarricense de Seguro Social (CCSS)",
      "Expresidenta del Colegio de Enfermeras de Costa Rica (CECR)",
      "Socia Fundadora de ARCCPCE",
    ],
  },
  {
    name: "Mag. Griselda Ugalde Salazar",
    profession: "Enfermera Profesional Obstétrica y Salud Pública",
    credentials: [
      "Exprofesora de la Universidad de Costa Rica (UCR)",
      "Expresidenta del Colegio de Enfermeras de Costa Rica (CECR)",
      "Especialista en Salud Materno-Infantil y Salud Pública Regional",
    ],
  },
  {
    name: "Dra. Nery Parada Bonilla",
    profession: "Enfermera Profesional",
    credentials: [
      "Exdirectora de la Dirección de Planificación del CENDEISSS - CCSS",
      "Exdirectora de la Escuela de Enfermería",
      "Exdecana de la Facultad de Ciencias de la Salud de la Universidad Latina de Costa Rica",
    ],
  },
  {
    name: "Dr. Otto Calvo Quirós",
    profession: "Enfermero Profesional Epidemiólogo • Salud Mental y Psiquiatría",
    credentials: [
      "Director de Enfermería del Área de Salud Carmen Montes de Oca",
      "Miembro de Junta Directiva del Colegio de Enfermeras de Costa Rica (Periodo 2014-2016)",
      "Vicepresidente de la Asociación Deportiva Máster de Atletismo (2018-2019)",
    ],
  },
  {
    name: "Dra. Silvia Beirute Bonilla",
    profession: "Enfermera Profesional",
    credentials: [
      "Exdirectora de la Dirección de Enfermería del Hospital México (CCSS)",
      "Líder en Gestión Hospitalaria de Alta Complejidad y Calidad del Cuidado",
      "Referente Nacional en Servicios Quirúrgicos y Cuidados Especializados",
    ],
  },
  {
    name: "Dra. Patricia Robles Yglesias",
    profession: "Enfermera Profesional",
    credentials: [
      "Exdecana de la Facultad de Enfermería de la Universidad Iberoamericana (UNIBE)",
      "Líder en Educación Superior y Formación Científica del Talento Humano en Enfermería",
      "Asesora Académica y Referente en Docencia Universitaria en Ciencias de la Salud",
    ],
  },
];

const INTERNATIONAL_EXPERTS: InternationalExpert[] = [
  {
    name: "Dr. Jesús Molina Mula",
    country: "España",
    flagCode: "ES",
    distinction: "Investigador y Catedrático en Práctica Basada en Evidencia y Toma de Decisiones en Salud",
  },
  {
    name: "Dr. José Ramón Martínez Riera",
    country: "España",
    flagCode: "ES",
    distinction: "Catedrático, Exdirector General de Salud Pública y Referente en Enfermería Comunitaria y Familiar",
  },
  {
    name: "Dra. Mercedes Gómez",
    country: "España",
    flagCode: "ES",
    distinction: "Líder Académica Internacional en Metodología del Cuidado y Gestión Sanitaria",
  },
  {
    name: "Dra. Evangelina Benítez",
    country: "México",
    flagCode: "MX",
    distinction: "Referente en Liderazgo Profesional, Educación Continua y Políticas de Salud en Enfermería",
  },
  {
    name: "Dra. Juana Jiménez Sánchez",
    country: "México",
    flagCode: "MX",
    distinction: "Exdirectora de Enfermería de la DGCES - Secretaría de Salud de México y Consultora Internacional",
  },
  {
    name: "Dra. Judith Shamian",
    country: "Canadá",
    flagCode: "CA",
    distinction: "Expresidenta del Consejo Internacional de Enfermeras (CIE / ICN) y Expresidenta de la CNA de Canadá",
  },
  {
    name: "Dra. Maria Antonieta Rubio Tyrrell",
    country: "Brasil",
    flagCode: "BR",
    distinction: "Catedrática Emérita de la EEAN / UFRJ y Referente Panamericana de Políticas Públicas de Enfermería",
  },
];

export default function ExpertCouncils() {
  const [activeTab, setActiveTab] = useState<"national" | "international">("national");

  return (
    <section id="consejo-expertos" className="py-20 bg-gradient-to-b from-slate-50 via-white to-sky-50/30 border-t border-slate-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabecera */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 text-[#002b7f] text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
            <Award className="w-4 h-4 text-[#ce1126]" />
            Órganos Consultivos de Alto Nivel Científico
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 tracking-tight">
            Consejo de Expertos de la Ciencia Enfermería
          </h2>
          <p className="text-slate-600 text-sm mt-3 leading-relaxed">
            Máxima instancia consultiva, deontológica y de asesoría estratégica de la ARCCPCE, integrada por figuras históricas y líderes del más alto calibre nacional e internacional.
          </p>

          {/* Conmutador de Pestañas Nacional / Internacional */}
          <div className="mt-8 inline-flex p-1.5 rounded-2xl bg-slate-100 border border-slate-200 shadow-xs">
            <button
              onClick={() => setActiveTab("national")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "national"
                  ? "bg-[#002b7f] text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
              }`}
            >
              <Building2 className="w-4 h-4 text-sky-300" />
              <span>Consejo de Expertos Nacionales ({NATIONAL_EXPERTS.length})</span>
            </button>
            <button
              onClick={() => setActiveTab("international")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "international"
                  ? "bg-[#002b7f] text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
              }`}
            >
              <Globe2 className="w-4 h-4 text-emerald-400" />
              <span>Consejo de Expertos Internacionales ({INTERNATIONAL_EXPERTS.length})</span>
            </button>
          </div>
        </div>

        {/* Panel Consejo Nacional */}
        {activeTab === "national" && (
          <div className="space-y-6">
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-50 text-[#002b7f] flex items-center justify-center font-bold border border-sky-100">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold font-display text-slate-900 text-sm sm:text-base">
                    Consejo de Expertos de la Ciencia Enfermería Nacionales
                  </h3>
                  <p className="text-xs text-slate-500">
                    Costa Rica • Liderazgo histórico en la Seguridad Social, Colegiatura y Formación Universitaria
                  </p>
                </div>
              </div>
              <span className="text-[11px] font-semibold text-[#002b7f] bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
                Sede Central Regional
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {NATIONAL_EXPERTS.map((expert, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-6 border border-slate-200/90 hover:border-sky-300 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div className="w-9 h-9 rounded-xl bg-slate-50 group-hover:bg-[#002b7f] group-hover:text-white text-[#002b7f] border border-slate-200 flex items-center justify-center transition-colors">
                        <GraduationCap className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold text-[#ce1126] uppercase tracking-wider bg-rose-50 px-2.5 py-0.5 rounded-md border border-rose-100">
                        Experta Nacional
                      </span>
                    </div>

                    <h4 className="text-base font-extrabold font-display text-slate-900 group-hover:text-[#002b7f] transition-colors leading-snug">
                      {expert.name}
                    </h4>
                    <p className="text-xs font-bold text-sky-800 mt-1 mb-3">
                      {expert.profession}
                    </p>

                    <div className="space-y-2 pt-3 border-t border-slate-100 text-xs text-slate-600">
                      {expert.credentials.map((cred, cIdx) => (
                        <div key={cIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{cred}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Panel Consejo Internacional */}
        {activeTab === "international" && (
          <div className="space-y-6">
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold border border-emerald-100">
                  <Globe2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold font-display text-slate-900 text-sm sm:text-base">
                    Consejo de Expertos de la Ciencia Enfermería Internacionales
                  </h3>
                  <p className="text-xs text-slate-500">
                    Red Global de Consultoría • España, México, Canadá y Brasil
                  </p>
                </div>
              </div>
              <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Alianza Global ARCCPCE
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {INTERNATIONAL_EXPERTS.map((expert, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-6 border border-slate-200/90 hover:border-emerald-300 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div className="w-9 h-9 rounded-xl bg-emerald-50 group-hover:bg-emerald-700 group-hover:text-white text-emerald-700 border border-emerald-200 flex items-center justify-center transition-colors">
                        <Award className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider bg-slate-100 px-2.5 py-0.5 rounded-md border border-slate-200 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#002b7f]" />
                        {expert.country}
                      </span>
                    </div>

                    <h4 className="text-base font-extrabold font-display text-slate-900 group-hover:text-emerald-800 transition-colors leading-snug">
                      {expert.name}
                    </h4>

                    <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-600">
                      <p className="leading-relaxed font-medium">
                        {expert.distinction}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Consejero Internacional</span>
                    <span className="font-bold text-[#002b7f]">ARCCPCE</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

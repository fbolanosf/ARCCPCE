"use client";

import React from "react";
import { Award, Scroll, Calendar, MapPin, Building, ShieldCheck } from "lucide-react";

interface FoundingMember {
  name: string;
  role?: string;
  distinction?: string;
}

const FOUNDING_MEMBERS: FoundingMember[] = [
  { name: "Dr. José Eduardo Carvajal Obando", role: "Presidente de la Junta Directiva (2026-2028)", distinction: "Presidente Fundacional • Convocante & Ponente Inaugural" },
  { name: "Dra. Marlen Calvo Solano", role: "Socia Fundadora", distinction: "Palabras de Clausura Oficial" },
  { name: "Lic. Álvaro Sánchez", role: "Socio Fundador", distinction: "Lectura del Acta de Constitución" },
  { name: "Teresita Mayela García Browne", role: "Socia Fundadora" },
  { name: "Patricia Yolanda Robles Yglesias", role: "Socia Fundadora" },
  { name: "María del Rocío Monge Quirós", role: "Socia Fundadora" },
  { name: "Karla Tatiana Mena Páez", role: "Socia Fundadora" },
  { name: "Josué Paniagua Sánchez", role: "Socio Fundador" },
  { name: "Marlene de los Ángeles Agüero Arce", role: "Socia Fundadora" },
  { name: "Patricia Quesada Steller", role: "Socia Fundadora" },
  { name: "Alejandra Trejos Chacón", role: "Socia Fundadora" },
  { name: "Janet Elizabeth Morales Salazar", role: "Fiscal de la Junta Directiva (2026-2028)", distinction: "Fiscalía Deontológica & Socia Fundadora" },
  { name: "Emérita Angélica Martínez Retana", role: "Socia Fundadora" },
  { name: "Carmen María Loaiza Madriz", role: "Socia Fundadora" },
  { name: "Fulvia Elizondo Saborío", role: "Socia Fundadora" },
  { name: "Dra. Rebeca Moya Masís", role: "Socia Fundadora", distinction: "Asesora de Mercadeo de la Asociación" },
  { name: "Dr. Carlos Siri Adema", role: "Miembro Honorario & Socio Fundador", distinction: "Decano de la Facultad de Ciencias de la Salud • Universidad Latina de Costa Rica" },
];

export default function FoundingMembers() {
  return (
    <section id="socios-fundadores" className="py-20 bg-gradient-to-b from-white via-sky-50/40 to-slate-50 border-t border-slate-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabecera */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-[#002b7f] text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
            <Scroll className="w-4 h-4 text-[#ce1126]" />
            Acta Solemne de Constitución
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 tracking-tight">
            Socios Fundadores de ARCCPCE
          </h2>
          <p className="text-slate-600 text-sm mt-3 leading-relaxed">
            Profesionales firmantes del acta de constitución oficial de la Asociación Regional Centroamericana y Caribe de Profesionales de la Ciencia Enfermería.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-500 mt-4 pt-3 border-t border-slate-200/60 max-w-xl mx-auto">
            <span className="flex items-center gap-1.5 text-slate-700">
              <Calendar className="w-4 h-4 text-[#ce1126]" /> 19 de marzo de 2026
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 text-slate-700">
              <Building className="w-4 h-4 text-[#002b7f]" /> Universidad Latina de Costa Rica, Sede San Pedro
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 text-slate-700">
              <MapPin className="w-4 h-4 text-emerald-600" /> San José, Costa Rica
            </span>
          </div>
        </div>

        {/* Cita Solemne del Acta */}
        <div className="mb-12 max-w-4xl mx-auto p-6 rounded-2xl bg-white border-l-4 border-[#002b7f] border-y border-r border-slate-200 shadow-sm text-center sm:text-left">
          <p className="text-xs sm:text-sm text-slate-700 font-medium italic leading-relaxed">
            "Promover y defender el acceso universal a la salud y la seguridad social en todos los países miembros de la Región, abogando por políticas públicas que garanticen servicios de salud de calidad y equitativos para la población, especialmente en comunidades vulnerables."
          </p>
          <span className="block text-[11px] font-bold text-[#002b7f] uppercase tracking-wider mt-2.5 not-italic">
            — Compromiso Fundacional • Ley de Asociaciones N° 218 de Costa Rica
          </span>
        </div>

        {/* Grid de Socios Fundadores */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {FOUNDING_MEMBERS.map((member, index) => {
            const isPresident = index === 0;
            return (
              <div
                key={index}
                className={`p-5 rounded-2xl border transition-all duration-300 flex items-start gap-3.5 group shadow-xs hover:shadow-md ${
                  isPresident
                    ? "bg-gradient-to-br from-white to-sky-50/80 border-[#002b7f]/40 sm:col-span-2 lg:col-span-3"
                    : "bg-white border-slate-200/90 hover:border-sky-300"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-sm font-bold shadow-xs ${
                    isPresident
                      ? "bg-[#002b7f] text-white"
                      : "bg-sky-50 text-[#002b7f] border border-sky-100 group-hover:bg-[#002b7f] group-hover:text-white transition-colors"
                  }`}
                >
                  {isPresident ? <ShieldCheck className="w-5 h-5 text-yellow-300" /> : <Award className="w-5 h-5" />}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-2">
                    <h4 className="font-bold font-display text-slate-900 text-sm sm:text-base group-hover:text-[#002b7f] transition-colors truncate">
                      {member.name}
                    </h4>
                  </div>
                  <span className="inline-block text-[11px] font-semibold text-[#ce1126] uppercase tracking-wider mt-0.5">
                    {member.role || "Socio Fundador"}
                  </span>
                  {member.distinction && (
                    <p className="text-xs text-slate-500 mt-1 font-medium">
                      {member.distinction}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

"use client";

import React from "react";
import Image from "next/image";
import { Shield, Award, Calendar, MapPin, CheckCircle } from "lucide-react";

interface BoardMember {
  role: string;
  name: string;
  badge?: string;
  isPrimary?: boolean;
}

const BOARD_MEMBERS: BoardMember[] = [
  { role: "Presidente", name: "Dr. José Eduardo Carvajal Obando", badge: "Presidencia", isPrimary: true },
  { role: "Vicepresidenta", name: "Dra. Marlen Calvo Solano", badge: "Vicepresidencia", isPrimary: true },
  { role: "Secretaria", name: "Dra. Patricia Quesada Steller", badge: "Secretaría General" },
  { role: "Tesorero", name: "Dr. Josué Paniagua Sánchez", badge: "Tesorería y Finanzas" },
  { role: "Fiscal", name: "Dra. Janet Morales Salazar", badge: "Fiscalía Deontológica" },
  { role: "Vocal 1", name: "Dr. Fibier Olmos Venegas", badge: "Vocalía I" },
  { role: "Vocal 2", name: "Dr. Marco Antonio Obando Rodríguez", badge: "Vocalía II" },
];

export default function BoardOfDirectors() {
  return (
    <section id="junta-directiva" className="py-20 bg-slate-50 border-t border-slate-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabecera de Sección */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-[#002b7f] text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
            <Shield className="w-4 h-4 text-[#ce1126]" />
            Gobernanza Institucional
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 tracking-tight">
            Mesa Directiva 2026 – 2028
          </h2>
          <p className="text-slate-600 text-sm mt-3 leading-relaxed">
            Órgano directivo electo para liderar la Asociación Regional Centroamericana y Caribe de Profesionales de la Ciencia Enfermería (ARCCPCE).
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-500 mt-4 pt-3 border-t border-slate-200/60 max-w-xl mx-auto">
            <span className="flex items-center gap-1.5 text-slate-700">
              <Calendar className="w-4 h-4 text-[#ce1126]" /> Período Oficial 2026 – 2028
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 text-slate-700">
              <MapPin className="w-4 h-4 text-[#002b7f]" /> San José, Costa Rica
            </span>
          </div>
        </div>

        {/* Bloque Principal: Fotografía Oficial + Miembros */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
          {/* Fotografía Oficial de la Junta Directiva 2026 */}
          <div className="lg:col-span-6 bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-sm">
            <div className="relative h-80 sm:h-96 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 group">
              <Image
                src="/assets/images/junta-directiva-2026-2028.jpeg"
                alt="Fotografía Oficial de la Mesa Directiva ARCCPCE 2026-2028"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-5 text-white">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#eab308] bg-white/10 px-2.5 py-0.5 rounded-full border border-white/15 w-fit mb-1">
                  Fotografía Oficial • Período 2026-2028
                </span>
                <h4 className="text-base sm:text-lg font-bold font-display text-white">
                  Mesa Directiva Electa de ARCCPCE
                </h4>
                <p className="text-xs text-slate-300">
                  Acto solemne de juramentación y toma de posesión • San José, Costa Rica
                </p>
              </div>
            </div>
            <div className="mt-4 p-3.5 rounded-xl bg-sky-50/70 border border-sky-100 text-xs text-slate-700 flex items-center gap-2.5">
              <CheckCircle className="w-4 h-4 text-[#002b7f] shrink-0" />
              <span>Gobernanza democrática constituida bajo la <strong>Ley de Asociaciones N° 218</strong> de Costa Rica.</span>
            </div>
          </div>

          {/* Lista de Miembros Directivos */}
          <div className="lg:col-span-6 space-y-3">
            {BOARD_MEMBERS.map((member, idx) => {
              return (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between gap-3 group ${
                    member.isPrimary
                      ? "bg-white border-[#002b7f]/30 shadow-xs hover:border-[#002b7f] hover:shadow-md"
                      : "bg-white/90 border-slate-200 hover:border-sky-300 hover:bg-white"
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-sm font-bold shadow-xs ${
                        member.isPrimary
                          ? "bg-[#002b7f] text-white"
                          : "bg-sky-50 text-[#002b7f] border border-sky-100 group-hover:bg-[#002b7f] group-hover:text-white transition-colors"
                      }`}
                    >
                      {member.isPrimary ? <Shield className="w-5 h-5 text-yellow-300" /> : <Award className="w-5 h-5" />}
                    </div>
                    <div className="min-w-0">
                      <span className="block text-[11px] font-extrabold uppercase tracking-wider text-[#ce1126]">
                        {member.role}
                      </span>
                      <h4 className="font-bold font-display text-slate-900 text-sm sm:text-base group-hover:text-[#002b7f] transition-colors truncate">
                        {member.name}
                      </h4>
                    </div>
                  </div>

                  {member.badge && (
                    <span className="shrink-0 text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200/80 group-hover:bg-sky-50 group-hover:text-[#002b7f] group-hover:border-sky-200 transition-colors">
                      {member.badge}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

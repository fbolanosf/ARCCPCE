"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ShieldCheck, Award, QrCode, Sparkles, CheckCircle2 } from "lucide-react";

export default function DigitalPassportCard() {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="w-full max-w-md mx-auto perspective-1000">
      <div
        onClick={() => setIsFlipped(!isFlipped)}
        className="relative group cursor-pointer transition-all duration-500 transform-gpu hover:scale-[1.02]"
      >
        {/* Glow exterior suave en azul y oro */}
        <div className="absolute -inset-1 bg-gradient-to-r from-sky-300 via-amber-200 to-rose-200 rounded-3xl blur-md opacity-50 group-hover:opacity-80 transition duration-500" />

        {/* Tarjeta de Acreditación Digital: Blanca, Elegante, Patriótica */}
        <div className="relative rounded-2xl bg-gradient-to-br from-white via-slate-50 to-blue-50/40 p-6 text-slate-800 border-2 border-slate-200 shadow-xl overflow-hidden">
          {/* Marca de Agua sutil de fondo */}
          <div className="absolute -right-8 -bottom-8 w-44 h-44 opacity-5 pointer-events-none rounded-full bg-[#002b7f] blur-xl" />

          {/* Encabezado de la Credencial */}
          <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-white p-1 border-2 border-[#002b7f] flex items-center justify-center shadow-sm">
                <Image
                  src="/assets/images/logo.jpeg"
                  alt="ARCCPCE"
                  width={36}
                  height={36}
                  className="rounded-full object-cover"
                />
              </div>
              <div>
                <span className="text-[11px] font-black tracking-widest text-[#002b7f] uppercase block">
                  PASAPORTE DIGITAL DPC
                </span>
                <span className="text-[9px] text-slate-500 font-bold tracking-wider">
                  ARCCPCE • COSTA RICA & REGIÓN
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full border border-emerald-300">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" /> VERIFICADO
              </span>
            </div>
          </div>

          {/* Cuerpo de la Credencial */}
          <div className="grid grid-cols-12 gap-3 items-center">
            {/* Foto de Perfil */}
            <div className="col-span-4 flex flex-col items-center">
              <div className="w-20 h-24 rounded-xl bg-white border-2 border-[#002b7f] overflow-hidden relative shadow-md flex items-center justify-center">
                <Image
                  src="/assets/images/logo.jpeg"
                  alt="Fotografía Afiliado"
                  width={80}
                  height={96}
                  className="object-cover"
                />
                <div className="absolute bottom-0 inset-x-0 bg-[#002b7f] text-[8px] text-center text-white py-0.5 font-bold">
                  DPC-2026
                </div>
              </div>
              <span className="text-[9px] font-mono font-bold text-slate-500 mt-1">FOLIO: CR-7492</span>
            </div>

            {/* Datos Personales */}
            <div className="col-span-8 space-y-1.5 pl-2 text-xs">
              <div>
                <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold block">Miembro Titular</span>
                <p className="font-extrabold text-slate-900 text-sm">Licda. Colegiada Regional</p>
              </div>

              <div>
                <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold block">Especialidad</span>
                <p className="text-slate-700 text-xs font-semibold">Cuidados Críticos & Salud Pública</p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-200">
                <div>
                  <span className="text-[8px] uppercase text-slate-400 font-bold block">Sede Emisión</span>
                  <p className="font-extrabold text-[#002b7f] text-[11px]">San José, CR</p>
                </div>
                <div>
                  <span className="text-[8px] uppercase text-slate-400 font-bold block">Vigencia</span>
                  <p className="font-extrabold text-[#ce1126] text-[11px]">2026 - 2028</p>
                </div>
              </div>
            </div>
          </div>

          {/* Pie de Tarjeta con QR */}
          <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 p-1 flex items-center justify-center shadow-sm">
                <QrCode className="w-7 h-7 text-[#002b7f]" />
              </div>
              <div className="text-[9px] text-slate-600 leading-tight font-medium">
                <span className="font-bold text-slate-800 block">Validación QR Inmediata</span>
                Acreditación interinstitucional
              </div>
            </div>

            <div className="text-right flex items-center gap-1 text-[10px] text-[#002b7f] font-bold bg-sky-100/80 px-2 py-1 rounded-md border border-sky-200">
              <Sparkles className="w-3 h-3 text-[#c49a45]" /> DPC Certificado
            </div>
          </div>
        </div>
      </div>
      <p className="text-center text-xs text-slate-500 mt-2.5 font-medium">
        ✨ Credencial digital entregada a todo profesional de enfermería al formalizar su afiliación a ARCCPCE.
      </p>
    </div>
  );
}

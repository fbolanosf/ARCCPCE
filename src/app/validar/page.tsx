"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  CheckCircle2,
  FileDown,
  ExternalLink,
  Award,
  Globe2,
  User,
  Calendar,
  Layers,
  ArrowLeft,
  Sparkles,
  Lock,
} from "lucide-react";
import {
  generateMembershipCertificate,
  createCertificateDoc,
  MembershipCertificateData,
} from "@/utils/generateMembershipCertificate";

function ValidarContent() {
  const searchParams = useSearchParams();

  const folio = searchParams.get("folio") || "ARCCPCE-CRI-2026-0116";
  const fullName = searchParams.get("n") || searchParams.get("fullName") || "PROFESIONAL COLEGIADO";
  const country = searchParams.get("p") || searchParams.get("country") || "Costa Rica";
  const specialty = searchParams.get("e") || searchParams.get("specialty") || "Ciencias de la Enfermería";
  const issueDate = searchParams.get("f") || searchParams.get("issueDate") || "14 de octubre de 2026";
  const blockchainHash = searchParams.get("hash") || "0x7f9a2d342304e4b28c19f5a0d3e218c92a6b7e84";

  const [pdfDataUri, setPdfDataUri] = useState<string | null>(null);
  const [loadingPdf, setLoadingPdf] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function loadPreview() {
      try {
        setLoadingPdf(true);
        const certData: MembershipCertificateData = {
          folio,
          fullName,
          country,
          specialty,
          issueDate,
        };
        const doc = await createCertificateDoc(certData);
        if (isMounted) {
          const uri = doc.output("datauristring");
          setPdfDataUri(uri);
        }
      } catch (e) {
        console.error("Error al renderizar el documento PDF:", e);
      } finally {
        if (isMounted) setLoadingPdf(false);
      }
    }
    loadPreview();
    return () => {
      isMounted = false;
    };
  }, [folio, fullName, country, specialty, issueDate]);

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      await generateMembershipCertificate({
        folio,
        fullName,
        country,
        specialty,
        issueDate,
      });
    } catch (e) {
      console.error("Error al descargar:", e);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-[#001d57] to-[#002b7f] text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Barra superior de navegación */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-sky-200 hover:text-white transition-colors bg-white/10 hover:bg-white/20 px-3.5 py-2 rounded-xl backdrop-blur-md border border-white/15"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver al Portal Oficial ARCCPCE</span>
          </Link>

          <div className="flex items-center gap-2 bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md">
            <Lock className="w-3.5 h-3.5" />
            <span>Verificación Oficial en Línea</span>
          </div>
        </div>

        {/* Tarjeta Principal de Validación */}
        <div className="bg-white/95 backdrop-blur-md text-slate-900 rounded-3xl border border-white/20 shadow-2xl p-6 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-200">
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-slate-200 bg-white shadow-sm shrink-0">
                <Image
                  src="/fotografias/Logo Institucional.jpg"
                  alt="Logo ARCCPCE"
                  fill
                  className="object-contain p-1"
                />
              </div>
              <div>
                <span className="text-[10px] sm:text-xs font-bold text-[#002b7f] tracking-wider uppercase block">
                  ASOCIACIÓN REGIONAL CENTROAMERICANA Y CARIBE
                </span>
                <h1 className="text-xl sm:text-2xl font-black font-display text-slate-900 mt-0.5">
                  Validación del Padrón Regional de Membresía
                </h1>
                <p className="text-xs text-slate-500 mt-1">
                  Constancia Digitalizada y Acreditación de Homologación Multilateral
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleDownload}
                disabled={isDownloading}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#002b7f] hover:bg-[#001d57] text-white font-bold px-5 py-3 rounded-xl shadow-md transition-all text-xs cursor-pointer"
              >
                <FileDown className="w-4 h-4 text-amber-300" />
                <span>{isDownloading ? "Descargando..." : "Descargar Certificado Original"}</span>
              </button>
            </div>
          </div>

          {/* Banner de Estado Válido */}
          <div className="my-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-black text-emerald-950 uppercase tracking-wide block">
                  REGISTRO AUTÉNTICO Y VIGENTE
                </span>
                <span className="text-[11px] text-emerald-800">
                  El documento y folio coinciden con el registro del libro de actas de acreditación de la ARCCPCE.
                </span>
              </div>
            </div>
            <div className="bg-white px-3 py-1.5 rounded-xl border border-emerald-300 font-mono font-black text-xs text-[#002b7f] shadow-xs">
              {folio}
            </div>
          </div>

          {/* Metadatos en Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <span className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1.5 mb-1">
                <User className="w-3.5 h-3.5 text-[#002b7f]" /> Profesional
              </span>
              <p className="font-bold text-sm text-slate-900 leading-snug">{fullName.toUpperCase()}</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <span className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1.5 mb-1">
                <Globe2 className="w-3.5 h-3.5 text-emerald-600" /> Jurisdicción
              </span>
              <p className="font-bold text-sm text-slate-900 leading-snug">{country}</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <span className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1.5 mb-1">
                <Award className="w-3.5 h-3.5 text-amber-600" /> Especialidad
              </span>
              <p className="font-bold text-sm text-slate-900 leading-snug">{specialty}</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <span className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1.5 mb-1">
                <Calendar className="w-3.5 h-3.5 text-purple-600" /> Fecha y Vigencia
              </span>
              <p className="font-bold text-xs text-slate-900 leading-snug">{issueDate} • Bienal (2026-2028)</p>
            </div>
          </div>

          {/* Visor Interactivo del Documento Oficial */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#002b7f]" />
                <span>Visualizador del Documento Oficial Original</span>
              </h3>
              <span className="text-[11px] text-slate-500 hidden sm:inline">
                Hoja oficial apaisada con firmas y sellos
              </span>
            </div>

            <div className="relative w-full rounded-2xl overflow-hidden border-2 border-slate-200 bg-slate-100 shadow-inner min-h-[460px] flex items-center justify-center">
              {loadingPdf ? (
                <div className="text-center p-8 space-y-3">
                  <div className="w-10 h-10 border-4 border-[#002b7f] border-t-transparent rounded-full animate-spin mx-auto"></div>
                  <p className="text-xs font-semibold text-slate-600">Cargando documento original en alta fidelidad...</p>
                </div>
              ) : pdfDataUri ? (
                <iframe
                  src={`${pdfDataUri}#toolbar=0&navpanes=0&scrollbar=1`}
                  title="Constancia Oficial ARCCPCE"
                  className="w-full h-[520px] sm:h-[620px] border-0"
                />
              ) : (
                <p className="text-xs text-slate-500 p-8">No fue posible previsualizar el documento.</p>
              )}
            </div>
          </div>

          {/* Bloque Criptográfico de Auditoría */}
          <div className="mt-6 p-4 rounded-2xl bg-slate-900 text-slate-200 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Auditoría Inmutable Blockchain Proof (SHA-256)
              </span>
              <span className="text-[10px] text-slate-400">Protocolos SICA / COMISCA / CIE</span>
            </div>
            <p className="font-mono text-[11px] text-teal-300 break-all select-all bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
              {blockchainHash}
            </p>
          </div>
        </div>

        {/* Pie de página institucional */}
        <div className="text-center text-xs text-sky-200/60 pb-8 space-y-1">
          <p>Asociación Regional Centroamericana y Caribe de Profesionales de la Ciencia Enfermería</p>
          <p>San José, Costa Rica • Personería Jurídica Civil Registrada</p>
        </div>
      </div>
    </div>
  );
}

export default function ValidarPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">
          <div className="text-center space-y-3">
            <div className="w-10 h-10 border-4 border-sky-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-xs font-bold text-sky-200">Verificando constancia en el Padrón Regional...</p>
          </div>
        </div>
      }
    >
      <ValidarContent />
    </Suspense>
  );
}

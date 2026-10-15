"use client";

import React, { useState, useEffect } from "react";
import QRCode from "qrcode";
import { QrCode, Share2, Copy, Check, ExternalLink, Smartphone, Download, Sparkles } from "lucide-react";

export default function SharePortalCard() {
  const [qrUrl, setQrUrl] = useState<string>("");
  const [currentOrigin, setCurrentOrigin] = useState<string>("https://arccpce.pages.dev");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const origin = typeof window !== "undefined" && window.location.origin ? window.location.origin : "https://arccpce.pages.dev";
    setCurrentOrigin(origin);

    QRCode.toDataURL(origin, {
      width: 320,
      margin: 1.5,
      color: {
        dark: "#001d57",
        light: "#ffffff",
      },
    })
      .then((url) => setQrUrl(url))
      .catch((err) => console.error("Error generating portal QR:", err));
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentOrigin);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      console.warn("Clipboard access denied:", e);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "ARCCPCE | Portal Oficial",
          text: "Asociación Regional Centroamericana y Caribe de Profesionales de la Ciencia Enfermería",
          url: currentOrigin,
        });
      } catch (err) {
        // Ignorar si el usuario cancela
      }
    } else {
      handleCopy();
    }
  };

  return (
    <section id="compartir" className="py-16 bg-gradient-to-br from-slate-900 via-[#001d57] to-[#002b7f] text-white border-t border-white/10 relative overflow-hidden">
      {/* Círculos decorativos de fondo */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-8 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Columna Izquierda: Información y Acciones */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-400/20 text-sky-200 text-xs font-semibold border border-sky-400/30">
                <Share2 className="w-3.5 h-3.5 text-sky-300" />
                <span>Conexión Rápida & Difusión Regional</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-white leading-tight">
                Escanea y Comparte el Portal Oficial de ARCCPCE
              </h2>

              <p className="text-slate-300 text-sm leading-relaxed max-w-xl">
                Accede de forma instantánea a todas las herramientas clínicas, micro-observatorio sanitario, reglamentos y padrón de adscripción gremial directamente desde tu teléfono móvil.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={handleNativeShare}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-sky-500 to-[#0284c7] hover:from-sky-400 hover:to-sky-600 text-white font-bold py-3 px-5 rounded-xl text-xs shadow-lg transition-all cursor-pointer"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Compartir Enlace</span>
                </button>

                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-5 rounded-xl text-xs border border-white/20 transition-all cursor-pointer"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-sky-200" />}
                  <span>{copied ? "¡Enlace Copiado!" : "Copiar Enlace"}</span>
                </button>

                {qrUrl && (
                  <a
                    href={qrUrl}
                    download="QR_ARCCPCE_Portal_Oficial.png"
                    className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white font-semibold py-3 px-4 rounded-xl text-xs border border-white/10 transition-all"
                  >
                    <Download className="w-4 h-4 text-amber-300" />
                    <span>Guardar Código QR</span>
                  </a>
                )}
              </div>

              {/* Indicador de URL */}
              <div className="pt-2">
                <span className="text-[11px] font-mono text-sky-200/80 bg-black/30 px-3 py-1.5 rounded-lg border border-white/10 inline-block">
                  {currentOrigin}
                </span>
              </div>
            </div>

            {/* Columna Derecha: Tarjeta con Código QR Dinámico */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border-4 border-white/80 max-w-xs w-full text-center space-y-4">
                <div className="flex items-center justify-center gap-2 text-[#002b7f] font-black text-sm uppercase tracking-wide">
                  <Smartphone className="w-4 h-4 text-[#ce1126]" />
                  <span>Acceso Móvil Inmediato</span>
                </div>

                <div className="relative p-3 bg-slate-50 rounded-2xl border border-slate-200 shadow-inner flex items-center justify-center min-h-[220px]">
                  {qrUrl ? (
                    <img
                      src={qrUrl}
                      alt="Código QR de la plataforma ARCCPCE"
                      className="w-48 h-48 sm:w-52 sm:h-52 object-contain rounded-lg"
                    />
                  ) : (
                    <div className="w-10 h-10 border-4 border-[#002b7f] border-t-transparent rounded-full animate-spin"></div>
                  )}
                </div>

                <p className="text-[11px] text-slate-500 font-medium leading-snug">
                  Apunta con la cámara de tu smartphone para abrir la plataforma oficial sin escribir la dirección.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

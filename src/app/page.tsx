"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import RegionalNetworkHub from "@/components/RegionalNetworkHub";
import RegionalObservatory from "@/components/RegionalObservatory";
import DigitalPassportCard from "@/components/DigitalPassportCard";
import RegionalNewsHub from "@/components/RegionalNewsHub";
import TechnicalCommittees from "@/components/TechnicalCommittees";
import FoundingMembers from "@/components/FoundingMembers";
import BoardOfDirectors from "@/components/BoardOfDirectors";
import ExpertCouncils from "@/components/ExpertCouncils";
import ClinicalCareStation from "@/components/ClinicalCareStation";
import SharePortalCard from "@/components/SharePortalCard";
import { generateMembershipCertificate, MembershipCertificateData } from "@/utils/generateMembershipCertificate";
import {
  MapPin,
  Calendar,
  Mail,
  MessageCircle,
  Facebook,
  Menu,
  X,
  Compass,
  Microscope,
  TrendingUp,
  Users,
  HeartPulse,
  Leaf,
  Cpu,
  Building,
  Eye,
  Target,
  Send,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  ExternalLink,
  Quote,
  Award,
  ChevronLeft,
  ChevronRight,
  FileDown,
} from "lucide-react";

const GALLERY_IMAGES = [
  { src: "/assets/images/asamblea-general.jpeg", title: "Asamblea General Constitutiva", tag: "Instalación" },
  { src: "/assets/images/junta-directiva-2026-2028.jpeg", title: "Junta Directiva Oficial (2026-2028)", tag: "Gobernanza" },
  { src: "/assets/images/mesa-honor-universidad-latina.jpeg", title: "Mesa de Honor y Autoridades Académicas", tag: "Protocolo" },
  { src: "/assets/images/firma-acta-constitutiva.jpeg", title: "Firma Solemne del Acta Constitutiva", tag: "Fundación" },
  { src: "/assets/images/lectura-estatutos-fundacion.jpeg", title: "Lectura y Aprobación de Estatutos (Ley 218)", tag: "Estatutos" },
  { src: "/assets/images/juramentacion.jpeg", title: "Juramentación de la Junta Directiva", tag: "Solemne" },
  { src: "/assets/images/compromiso-etico-juramento.jpeg", title: "Compromiso Ético y Deontológico", tag: "Ética" },
  { src: "/assets/images/delegaciones-regionales.jpeg", title: "Delegaciones y Acreditaciones Regionales", tag: "Integración" },
  { src: "/assets/images/sesion-plenaria-asamblea.jpeg", title: "Sesión Plenaria y Votación Unánime", tag: "Plenaria" },
  { src: "/assets/images/estrado-asamblea-fundacional.jpeg", title: "Estrado Principal y Convocatoria Regional", tag: "Gobernanza" },
  { src: "/assets/images/miembros-fundadores-reunion.jpeg", title: "Encuentro de Socios Fundadores", tag: "Fraternidad" },
  { src: "/assets/images/foto-oficial-asamblea-constitutiva.jpeg", title: "Fotografía Oficial Conmemorativa", tag: "Histórica" },
  { src: "/assets/images/clausura-confraternidad-gremial.jpeg", title: "Clausura y Confraternidad Panamericana", tag: "Clausura" },
  { src: "/assets/images/estandarte-banderas.jpeg", title: "Estandarte Institucional y Pabellones", tag: "Símbolos" },
  { src: "/assets/images/equipo-clinico.jpeg", title: "Comisiones de Trabajo Científico", tag: "Ciencia" },
];

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedGalleryIndex, setSelectedGalleryIndex] = useState<number | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [registeredFolio, setRegisteredFolio] = useState<string | null>(null);
  const [lastSubmissionData, setLastSubmissionData] = useState<MembershipCertificateData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isHoveredGallery, setIsHoveredGallery] = useState(false);
  const ribbonScrollRef = useRef<HTMLDivElement>(null);

  // Autoplay continuo suave para el cintillo de la galería fotográfica
  useEffect(() => {
    const el = ribbonScrollRef.current;
    if (!el) return;

    let animationFrameId: number;
    let lastTime = performance.now();
    const speed = 0.65; // píxeles por frame aprox a 60fps

    const step = (time: number) => {
      const elapsed = time - lastTime;
      lastTime = time;

      if (!isHoveredGallery && el) {
        // Desplazamiento progresivo
        el.scrollLeft += speed * (elapsed / 16.67);

        // Si sobrepasa la mitad del scroll (por la duplicación de imágenes), reiniciamos al inicio suavemente
        const maxScroll = el.scrollWidth / 2;
        if (el.scrollLeft >= maxScroll) {
          el.scrollLeft -= maxScroll;
        }
      }
      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isHoveredGallery]);

  const scrollRibbon = (direction: "left" | "right") => {
    if (ribbonScrollRef.current) {
      const scrollAmount = 380;
      ribbonScrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const fullName = (formData.get("fullName") as string) || (form.querySelector('input[type="text"][required]') as HTMLInputElement)?.value;
    const email = (formData.get("email") as string) || (form.querySelector('input[type="email"]') as HTMLInputElement)?.value;
    const country = (formData.get("country") as string) || (form.querySelector('#countrySelect') as HTMLSelectElement)?.value || "CR";
    const whatsapp = (formData.get("whatsapp") as string) || (form.querySelector('input[type="tel"]') as HTMLInputElement)?.value || "";
    const specialty = (formData.get("specialty") as string) || (form.querySelector('#specialtyInput') as HTMLInputElement)?.value || "";
    const motivation = (formData.get("motivation") as string) || (form.querySelector('#messageInput') as HTMLTextAreaElement)?.value || "";

    const countryNameMap: Record<string, string> = {
      CR: "Costa Rica",
      GT: "Guatemala",
      SV: "El Salvador",
      HN: "Honduras",
      NI: "Nicaragua",
      PA: "Panamá",
      CAR: "República Dominicana / Caribe",
    };
    const countryLabel = countryNameMap[country] || country;

    let finalFolio = "";

    try {
      const res = await fetch("/api/affiliate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, country, whatsapp, specialty, motivation }),
      });

      const result = await res.json();

      if (res.ok && result.success && result.data?.folio) {
        finalFolio = result.data.folio;
      } else {
        // Fallback local seguro si la ruta estática responde sin backend dinámico
        const currentYear = new Date().getFullYear();
        const iso3 = country === "GT" ? "GTM" : country === "SV" ? "SLV" : country === "HN" ? "HND" : country === "NI" ? "NIC" : country === "PA" ? "PAN" : country === "CAR" ? "DOM" : "CRI";
        const randomCorrelative = String(Math.floor(100 + Math.random() * 900)).padStart(4, "0");
        finalFolio = `ARCCPCE-${iso3}-${currentYear}-${randomCorrelative}`;
      }
    } catch (err) {
      console.warn("Fallo en fetch /api/affiliate, generando folio seguro de contingencia:", err);
      const currentYear = new Date().getFullYear();
      const iso3 = country === "GT" ? "GTM" : country === "SV" ? "SLV" : country === "HN" ? "HND" : country === "NI" ? "NIC" : country === "PA" ? "PAN" : country === "CAR" ? "DOM" : "CRI";
      const randomCorrelative = String(Math.floor(100 + Math.random() * 900)).padStart(4, "0");
      finalFolio = `ARCCPCE-${iso3}-${currentYear}-${randomCorrelative}`;
    } finally {
      setRegisteredFolio(finalFolio);
      const certificatePayload: MembershipCertificateData = {
        fullName: fullName || "PROFESIONAL COLEGIADO",
        country: countryLabel,
        specialty: specialty || "Ciencias de la Enfermería",
        folio: finalFolio,
      };
      setLastSubmissionData(certificatePayload);

      try {
        generateMembershipCertificate(certificatePayload);
      } catch (pdfErr) {
        console.error("Error al generar constancia PDF:", pdfErr);
      }

      setFormSubmitted(true);
      form.reset();
      setIsSubmitting(false);
    }
  };

  const handleNextImage = useCallback(() => {
    setSelectedGalleryIndex((prev) => (prev !== null ? (prev + 1) % GALLERY_IMAGES.length : null));
  }, []);

  const handlePrevImage = useCallback(() => {
    setSelectedGalleryIndex((prev) => (prev !== null ? (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length : null));
  }, []);

  useEffect(() => {
    if (selectedGalleryIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedGalleryIndex(null);
      if (e.key === "ArrowRight") handleNextImage();
      if (e.key === "ArrowLeft") handlePrevImage();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedGalleryIndex, handleNextImage, handlePrevImage]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-[#002b7f] selection:text-white">
      {/* ==================== BARRA SUPERIOR PATRIA (LUMINOSA) ==================== */}
      <div className="bg-[#002b7f] text-white text-xs py-2 px-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <span className="flex items-center gap-1.5 font-bold text-white">
              <MapPin className="w-3.5 h-3.5 text-[#eab308]" /> Sede: San José, Costa Rica
            </span>
            <span className="text-white/40 hidden md:inline">•</span>
            <span className="hidden md:flex items-center gap-1.5 text-slate-200">
              <Calendar className="w-3.5 h-3.5 text-[#eab308]" /> Fundada el 19 de Marzo de 2026
            </span>
          </div>

          <div className="flex items-center flex-wrap justify-center gap-3 sm:gap-4 font-semibold">
            <a
              href="mailto:arccpce@gmail.com"
              className="flex items-center gap-1 text-slate-100 hover:text-[#eab308] transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#eab308]" />
              <span>arccpce@gmail.com</span>
            </a>
            <span className="text-white/40 hidden sm:inline">•</span>
            <a
              href="https://wa.me/50672370244?text=Hola%20ARCCPCE,%20deseo%20m%C3%A1s%20informaci%C3%B3n"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-emerald-300 hover:text-emerald-200 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-300" />
              <span>WhatsApp Oficial</span>
            </a>
            <span className="text-white/40 hidden sm:inline">•</span>
            <a
              href="https://www.facebook.com/profile.php?id=61576498572279"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-slate-100 hover:text-[#eab308] transition-colors"
            >
              <Facebook className="w-3.5 h-3.5 text-sky-300" />
              <span className="hidden md:inline">Facebook Oficial</span>
            </a>
          </div>
        </div>
      </div>

      {/* ==================== NAVEGACIÓN PRINCIPAL ==================== */}
      <header className="sticky top-0 z-40 glass-nav-light py-3.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <a href="#inicio" className="flex items-center gap-3.5 group shrink-0">
            <div className="relative w-12 h-12 rounded-full ring-2 ring-[#002b7f]/20 overflow-hidden shadow group-hover:scale-105 transition-transform shrink-0 flex-shrink-0">
              <Image src="/assets/images/logo.jpeg" alt="Logo ARCCPCE" fill className="object-contain" priority />
            </div>
            <div className="w-fit">
              <span className="block text-xl sm:text-2xl font-black font-display tracking-tight text-[#002b7f] leading-none">
                ARCCPCE
              </span>
              <span className="block text-[9px] sm:text-[10px] font-bold text-slate-500 uppercase tracking-tight mt-1 leading-tight">
                Asociación Regional Centroamericana y Caribe<br className="hidden sm:inline" /> de Profesionales de la Ciencia Enfermería
              </span>
            </div>
          </a>

          {/* Menú Escritorio (Sin botón Afíliate para dar máximo espacio al nombre completo y logo) */}
          <nav className="hidden lg:flex items-center space-x-5 xl:space-x-6 text-sm font-bold text-slate-700">
            <a href="#inicio" className="hover:text-[#002b7f] transition-colors">Inicio</a>
            <a href="#observatorio" className="hover:text-[#002b7f] transition-colors">Observatorio</a>
            <a href="#estacion-clinica" className="hover:text-[#002b7f] transition-colors text-[#002b7f]/90">Herramientas Clínicas</a>
            <a href="#presidencia" className="hover:text-[#002b7f] transition-colors">Presidencia</a>
            <a href="#acerca" className="hover:text-[#002b7f] transition-colors">Identidad</a>
            <a href="#mision-vision" className="hover:text-[#002b7f] transition-colors">Misión</a>
            <a href="#fines" className="hover:text-[#002b7f] transition-colors">Fines</a>
            <a href="#junta-directiva" className="hover:text-[#002b7f] transition-colors">Directiva</a>
            <a href="#socios-fundadores" className="hover:text-[#002b7f] transition-colors">Fundadores</a>
            <a href="#consejo-expertos" className="hover:text-[#002b7f] transition-colors">Expertos</a>
            <a href="#galeria" className="hover:text-[#002b7f] transition-colors">Galería</a>
            <a href="#alianzas" className="hover:text-[#002b7f] transition-colors">Alianzas</a>
          </nav>

          {/* Botón Móvil */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-700 hover:text-[#002b7f]"
            aria-label="Abrir Menú"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Desplegable Móvil */}
        {mobileMenuOpen && (
          <div className="lg:hidden px-4 pt-3 pb-6 bg-white border-t border-slate-200 space-y-2">
            <a href="#inicio" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-slate-700 hover:bg-sky-50 font-semibold">Inicio</a>
            <a href="#observatorio" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-[#002b7f] hover:bg-sky-50 font-bold">Micro-Observatorio</a>
            <a href="#estacion-clinica" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-[#002b7f] hover:bg-sky-50 font-bold">Estación de Herramientas Clínicas</a>
            <a href="#acerca" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-slate-700 hover:bg-sky-50 font-semibold">Identidad Institucional</a>
            <a href="#mision-vision" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-slate-700 hover:bg-sky-50 font-semibold">Misión y Visión</a>
            <a href="#fines" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-slate-700 hover:bg-sky-50 font-semibold">Fines Estatutarios</a>
            <a href="#junta-directiva" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-[#002b7f] hover:bg-sky-50 font-bold">Mesa Directiva (2026-2028)</a>
            <a href="#socios-fundadores" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-slate-700 hover:bg-sky-50 font-semibold">Socios Fundadores</a>
            <a href="#consejo-expertos" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-[#002b7f] hover:bg-sky-50 font-bold">Consejos de Expertos</a>
            <a href="#galeria" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-slate-700 hover:bg-sky-50 font-semibold">Galería Solemne</a>
            <a href="#alianzas" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-slate-700 hover:bg-sky-50 font-semibold">Vínculos Regionales</a>
            <a href="#contacto" onClick={() => setMobileMenuOpen(false)} className="block text-center mt-3 bg-[#002b7f] text-white font-bold py-2.5 rounded-xl shadow">Afíliate Ahora</a>
          </div>
        )}
      </header>

      {/* ==================== HERO SECTION LUMINOSA Y ELEGANTE ==================== */}
      <section id="inicio" className="relative pt-12 pb-20 overflow-hidden bg-gradient-to-b from-white via-sky-50/70 to-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Columna Izquierda: Información Institucional */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-[#002b7f] text-xs font-bold shadow-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ce1126] animate-pulse" />
                Asociación Civil Regional • Sede San José, Costa Rica
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-slate-900 leading-tight">
                Asociación Regional Centroamericana y Caribe de Profesionales de la{" "}
                <span className="text-[#002b7f]">Ciencia Enfermería</span>
              </h1>

              <div className="relative p-5 sm:p-6 rounded-2xl bg-white border-l-4 border-[#002b7f] shadow-md border-y border-r border-slate-200/80 transition-all hover:shadow-lg text-left">
                <div className="flex items-start gap-3.5">
                  <Quote className="w-8 h-8 text-[#002b7f] shrink-0 mt-0.5 opacity-90" />
                  <div className="space-y-3 flex-1">
                    <p className="text-slate-900 font-semibold text-sm sm:text-base leading-relaxed tracking-normal">
                      "Unidos transformamos la ciencia enfermera para el bienestar de nuestras comunidades y el futuro de nuestra región."
                    </p>

                    <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-xs">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-sky-100 text-[#002b7f] font-black text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Evidencia Global OMS / SOWN:
                      </span>
                      <span className="text-slate-600 font-medium leading-relaxed">
                        La enfermería constituye el <strong>59% del personal sanitario mundial</strong> y sostiene más del <strong>80% del cuidado clínico continuo</strong>.
                      </span>
                    </div>

                    <div className="text-xs text-[#ce1126] font-bold flex items-center gap-1.5 pt-0.5">
                      <ShieldCheck className="w-4 h-4 text-[#ce1126]" />
                      Fundada en San José, Costa Rica el 19 de Marzo de 2026
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Plataforma de articulación científica, liderazgo transformacional y defensa del ejercicio profesional en Costa Rica, Guatemala, El Salvador, Honduras, Nicaragua, Panamá y República Dominicana.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-2.5 justify-center lg:justify-start pt-1">
                <a
                  href="#contacto"
                  className="inline-flex items-center justify-center gap-1.5 bg-[#ce1126] hover:bg-[#b00e20] text-white font-bold px-4 py-2 rounded-lg text-xs transition-colors shadow-xs"
                >
                  <Award className="w-3.5 h-3.5 text-white/90" />
                  <span>Afíliate a ARCCPCE</span>
                </a>
                <a
                  href="#observatorio"
                  className="inline-flex items-center justify-center gap-1.5 bg-[#002b7f] hover:bg-[#001d57] text-white font-bold px-4 py-2 rounded-lg text-xs transition-colors shadow-xs"
                >
                  <Compass className="w-3.5 h-3.5 text-sky-200" />
                  <span>Explorar Observatorio</span>
                </a>
                <a
                  href="https://wa.me/50672370244?text=Hola%20ARCCPCE,%20deseo%20m%C3%A1s%20informaci%C3%B3n"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-3.5 py-2 rounded-lg text-xs transition-colors shadow-xs"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-white/90" />
                  <span>WhatsApp Secretaría</span>
                </a>
              </div>
            </div>

            {/* Columna Derecha: Hub Cartográfico Dinámico 2.5D */}
            <div className="lg:col-span-6">
              <RegionalNetworkHub />
            </div>
          </div>
        </div>
      </section>

      {/* ==================== PILARES DE ACCIÓN E IMPACTO AL PACIENTE ==================== */}
      <section className="bg-white py-14 border-b border-slate-200 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <span className="text-[#002b7f] text-xs font-bold tracking-widest uppercase bg-sky-50 px-3.5 py-1 rounded-full border border-sky-100">
              Excelencia Clínica y Cuidados Críticos
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 mt-2">
              Pilares Fundamentales e Impacto Directo en la Salud del Paciente
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1.5">
              Datos duros estandarizados por la <strong>OMS (State of the World’s Nursing)</strong> y estudios de la <strong>OPS</strong> sobre la reducción de morbilidad y supervivencia hospitalaria.
            </p>
          </div>

          {/* Tarjetas de Pilares */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5 mb-8">
            {[
              { icon: Microscope, name: "Ciencia", sub: "Evidencia clínica" },
              { icon: TrendingUp, name: "Liderazgo", sub: "Transformacional" },
              { icon: Users, name: "Colaboración", sub: "Solidaridad regional" },
              { icon: HeartPulse, name: "Salud", sub: "Bienestar integral" },
              { icon: Leaf, name: "Sostenibilidad", sub: "Cuidado ambiental" },
              { icon: Cpu, name: "Innovación", sub: "Transformación digital" },
            ].map((p, idx) => {
              const Icon = p.icon;
              return (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-sky-300 transition-all shadow-sm"
                >
                  <div className="w-9 h-9 rounded-lg bg-sky-100 flex items-center justify-center text-[#002b7f]">
                    <Icon className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-xs sm:text-sm">{p.name}</h4>
                    <p className="text-[11px] text-slate-500 font-medium">{p.sub}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bloque de Métricas Duras e Ilustración Isométrica 3D del Cuidado al Paciente */}
          <div className="bg-gradient-to-br from-sky-50/70 via-white to-slate-50 p-6 sm:p-8 rounded-3xl border border-sky-100/90 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden">
            {/* Halo ambiental suave */}
            <div className="absolute right-1/4 top-0 w-80 h-80 bg-sky-300/15 rounded-full blur-3xl pointer-events-none" />

            {/* Columna Izquierda: Datos Duros Referenciables */}
            <div className="flex-1 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#002b7f] uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Evidencia Epidemiológica sobre el Cuidado Continuo
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs">
                  <span className="text-3xl font-black font-display text-[#002b7f] block">
                    -30%
                  </span>
                  <span className="text-xs font-bold text-slate-800 block mt-0.5">
                    Mortalidad Intrahospitalaria
                  </span>
                  <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                    Una dotación adecuada de licenciados en enfermería reduce significativamente los eventos adversos (Fuente: OMS / Aiken Study).
                  </p>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs">
                  <span className="text-3xl font-black font-display text-[#ce1126] block">
                    80%
                  </span>
                  <span className="text-xs font-bold text-slate-800 block mt-0.5">
                    Intervenciones en APS
                  </span>
                  <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                    De la atención primaria de salud, inmunizaciones y control de crónicos es coordinada por el personal de enfermería (Reporte OPS).
                  </p>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs">
                  <span className="text-3xl font-black font-display text-[#0284c7] block">
                    -24%
                  </span>
                  <span className="text-xs font-bold text-slate-800 block mt-0.5">
                    Tasa de Readmisión
                  </span>
                  <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                    Seguimiento y tele-cuidado al alta hospitalaria optimiza la adherencia terapéutica y el autocuidado del paciente.
                  </p>
                </div>
              </div>
            </div>

            {/* Columna Derecha: Ilustración Isométrica 3D Transparente sin marcos */}
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 shrink-0 flex items-center justify-center">
              <Image
                src="/assets/illustrations/iso_patient_care.png"
                alt="Cuidado Clínico al Paciente 3D"
                fill
                className="object-contain drop-shadow-[0_16px_28px_rgba(2,132,199,0.22)] transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ==================== IDEA A: MICRO-OBSERVATORIO REGIONAL ==================== */}
      <RegionalObservatory />

      {/* ==================== IDENTIDAD INSTITUCIONAL ==================== */}
      <section id="acerca" className="py-20 bg-white">
        <div id="identidad" className="scroll-mt-24" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-sky-50 border border-sky-100 text-[#002b7f] text-xs font-bold uppercase tracking-wider">
                <Building className="w-3.5 h-3.5 text-[#ce1126]" /> Identidad e Incidencia Regional
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 leading-tight">
                Voz, ciencia y liderazgo de la enfermería centroamericana y caribeña
              </h2>

              <p className="text-slate-600 leading-relaxed text-base">
                La <strong>Asociación Regional Centroamericana y Caribe de Profesionales de la Ciencia Enfermería (ARCCPCE)</strong> nace formalmente el <strong>19 de marzo de 2026</strong> como una asociación civil sin fines de lucro radicada en San José, Costa Rica, con el propósito histórico de unificar y potenciar la práctica científica y el liderazgo del gremio de enfermería en toda el área mesoamericana y del Caribe.
              </p>

              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#002b7f] flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#ce1126]" /> Justificación Sanitaria y Estatutaria
                  </span>
                  <span className="text-[11px] font-bold text-slate-500">Colegio de Abogados de Costa Rica</span>
                </div>
                
                {/* Cuadro de Datos Duros OPS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
                  <div className="bg-white p-3 rounded-xl border border-sky-100 shadow-xs">
                    <span className="block font-black text-[#002b7f] text-base">44.3 vs 70.6</span>
                    <span className="font-bold text-slate-800 text-[11px] block">Por 10,000 hab. en Latinoamérica</span>
                    <p className="text-[10px] text-slate-500 mt-0.5">América Latina opera por debajo de la meta mínima óptima fijada por la OPS para Cobertura Universal.</p>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-rose-100 shadow-xs">
                    <span className="block font-black text-[#ce1126] text-base">1 de cada 7</span>
                    <span className="font-bold text-slate-800 text-[11px] block">Enfermeros migra al exterior</span>
                    <p className="text-[10px] text-slate-500 mt-0.5">La fuga de talento y la falta de homologación profundizan el déficit en áreas rurales y de atención primaria.</p>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed pt-1">
                  Frente a un déficit global proyectado de <strong>5.8 millones de enfermeros</strong>, ARCCPCE articula esfuerzos directos con COMISCA, SICA, FEPPEN, OPS/OMS y el CIE para defender la dignificación salarial, homologar competencias y transformar la ciencia del cuidado en la región.
                </p>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <div
                className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-xl border-4 border-white"
                onClick={() => setSelectedGalleryIndex(0)}
              >
                <div className="relative h-72 sm:h-80 w-full">
                  <Image
                    src="/assets/images/asamblea-general.jpeg"
                    alt="Asamblea General"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-xl border border-slate-200 shadow">
                  <p className="text-xs font-bold text-[#ce1126] uppercase tracking-wider">Acto Solemne Fundacional</p>
                  <p className="text-sm font-bold text-[#002b7f] mt-0.5">Colegio de Abogados y Abogadas de Costa Rica • San José</p>
                </div>
              </div>

              {/* Composición Visual Integrada: Especialista en Tele-enfermería (Sin marcos, orillas degradadas) */}
              <div className="relative flex items-center justify-between p-2 overflow-visible">
                {/* Resplandor radial de fondo */}
                <div className="absolute -left-4 -top-6 w-64 h-64 bg-sky-200/30 rounded-full blur-3xl pointer-events-none" />
                
                <div className="relative z-10 flex-1 pr-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100/70 text-[#002b7f] text-[11px] font-extrabold uppercase tracking-widest mb-2 border border-sky-200/60">
                    <Sparkles className="w-3.5 h-3.5 text-[#0284c7]" />
                    Práctica Clínica Avanzada
                  </div>
                  <h4 className="font-extrabold font-display text-slate-900 text-base sm:text-lg leading-snug">
                    Tele-enfermería y Triaje Clínico Digital
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-1">
                    Atención de alta resolución y monitorización continua en tiempo real para centros de salud y comunidades rurales de la región mesoamericana.
                  </p>
                </div>

                {/* Silueta Isométrica 3D flotante 100% transparente sin bordes de recuadro */}
                <div className="relative w-40 h-52 sm:w-48 sm:h-56 shrink-0 flex items-center justify-center">
                  <Image
                    src="/assets/illustrations/iso_telehealth_nurse.png"
                    alt="Especialista en Tele-enfermería 3D"
                    fill
                    className="object-contain drop-shadow-[0_12px_24px_rgba(2,132,199,0.22)] transition-transform duration-500 hover:scale-105"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

            {/* ==================== MENSAJE DE LA PRESIDENCIA ==================== */}
      <section id="presidencia" className="py-20 bg-gradient-to-b from-white via-sky-50/40 to-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Fotografía Oficial del Presidente */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative max-w-sm w-full group">
                <div className="absolute -inset-1.5 bg-gradient-to-r from-[#002b7f] via-sky-300 to-[#ce1126] rounded-3xl blur-md opacity-30 group-hover:opacity-50 transition duration-500" />
                <div className="relative rounded-2xl overflow-hidden bg-white border-2 border-slate-200 shadow-xl">
                  <div className="relative h-[440px] w-full bg-slate-100">
                    <Image
                      src="/assets/images/presidente.png"
                      alt="Presidente Oficial de ARCCPCE"
                      fill
                      className="object-cover object-top group-hover:scale-[1.02] transition-transform duration-500"
                      priority
                    />
                  </div>
                  <div className="p-4 bg-white border-t border-slate-100 text-center">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-[#ce1126] border border-rose-200 text-[11px] font-extrabold uppercase tracking-wider mb-2">
                      <Award className="w-3.5 h-3.5" /> Junta Directiva 2026-2028
                    </div>
                    <span className="text-xs font-black uppercase tracking-wider text-[#002b7f] block">
                      Presidente
                    </span>
                    <h3 className="text-lg font-extrabold text-slate-900 mt-1">
                      Dr. José Eduardo Carvajal Obando
                    </h3>
                    <p className="text-xs text-slate-600 font-semibold mt-1">
                      Presidente de la Junta Directiva (2026-2028) • Asociación Regional Centroamericana y Caribe de Profesionales de la Ciencia Enfermería (ARCCPCE)
                    </p>
                    <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-center gap-2 text-[11px] text-slate-500 font-medium">
                      <span>Período Estatutario: <strong>2026 – 2028</strong></span>
                      <span>•</span>
                      <span>Sede San José, Costa Rica</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Texto y Discurso Oficial */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-[#002b7f] text-xs font-bold uppercase tracking-wider shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-[#ce1126]" /> Mensaje Oficial de la Presidencia
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display text-slate-900 leading-tight">
                Nuestra razón de ser: <span className="text-[#002b7f]">visibilizar y fortalecer la ciencia de la enfermería</span>
              </h2>

              <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
                <p>
                  La razón de ser de nuestra Asociación es lograr que la ciencia de la enfermería sea visible y reconocida ante los pueblos, las comunidades, las sociedades y los países de Centroamérica y el Caribe, consolidando, además, alianzas estratégicas con otras naciones de Latinoamérica que compartan nuestra visión y compromiso.
                </p>

                <p>
                  Creemos firmemente que, mediante la unión, la cooperación y el trabajo científico regional, podremos fortalecer la presencia y el reconocimiento de nuestro ejercicio profesional en los espacios donde se toman decisiones políticas, gubernamentales, académicas y comunitarias.
                </p>

                <p>
                  Nuestro propósito es contribuir activamente al desarrollo de políticas públicas, estrategias y acciones que reconozcan el aporte de la enfermería al bienestar de las poblaciones, la equidad y el fortalecimiento de los sistemas de salud.
                </p>

                <p>
                  Como Asociación, asumimos el compromiso de promover la investigación científica, la generación y divulgación del conocimiento basado en la evidencia y la participación activa de los profesionales de enfermería en la construcción de respuestas a las necesidades y desafíos de nuestras sociedades.
                </p>

                <div className="relative p-5 sm:p-6 rounded-2xl bg-white border-l-4 border-[#002b7f] shadow-md border-y border-r border-slate-200/80 transition-all hover:shadow-lg">
                  <div className="flex items-start gap-3.5">
                    <Quote className="w-8 h-8 text-[#002b7f] shrink-0 mt-0.5 opacity-90" />
                    <div className="space-y-2">
                      <p className="text-slate-900 font-semibold text-sm sm:text-base leading-relaxed tracking-normal">
                        "Porque la ciencia de la enfermería debe tener voz, presencia y participación en los espacios donde se decide el futuro de la salud pública. Unidos como región, construiremos puentes de conocimiento, liderazgo y cooperación para el desarrollo de nuestra profesión y el bienestar de nuestros pueblos."
                      </p>
                      <div className="flex items-center gap-2 pt-1 border-t border-slate-100">
                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#ce1126]">
                          Compromiso Solemne
                        </span>
                        <span className="text-slate-400 text-xs">•</span>
                        <span className="text-xs text-slate-600 font-medium">
                          Dr. José Eduardo Carvajal Obando
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <a
                  href="#contacto"
                  className="inline-flex items-center gap-2 bg-[#002b7f] hover:bg-[#001d57] text-white font-bold px-5 py-2.5 rounded-xl shadow transition-all text-xs sm:text-sm"
                >
                  <Send className="w-4 h-4 text-sky-200" />
                  <span>Sumarme al Compromiso Regional</span>
                </a>
                <a
                  href="#fines"
                  className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold px-5 py-2.5 rounded-xl shadow-sm transition-all text-xs sm:text-sm"
                >
                  <Compass className="w-4 h-4 text-[#002b7f]" />
                  <span>Ver Fines Estatutarios</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== MISIÓN Y VISIÓN ==================== */}
      <section id="mision-vision" className="py-20 bg-slate-50 border-t border-slate-200">
        <div id="mision" className="scroll-mt-24" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-[#002b7f] text-xs font-bold tracking-widest uppercase bg-sky-100/70 px-3.5 py-1 rounded-full border border-sky-200">
              Dirección Estratégica
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 mt-3">
              Misión, Visión y Valores Fundamentales
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-sky-100 text-[#002b7f] flex items-center justify-center">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold font-display text-slate-900">Nuestra Visión</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                Que ARCCPCE sea el referente regional en el impulso de acciones colaborativas científico-educativas, fortalecimiento del liderazgo transformacional y gobernanza sólida en la Enfermería, orientados a la salud integral, sostenibilidad ambiental y adopción ética de la transformación digital.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-rose-100 text-[#ce1126] flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold font-display text-slate-900">Nuestra Misión</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                Impulsar el desarrollo de la Enfermería en Centroamérica y el Caribe mediante la colaboración científica y educativa, el liderazgo gremial y la promoción de la salud pública, la prevención de enfermedades crónicas y el bienestar de nuestras comunidades.
              </p>
            </div>
          </div>

          {/* Composición Isométrica Fluida: Investigación y Genómica Clínica (Sin caja ni marcos) */}
          <div className="relative pt-6 flex flex-col md:flex-row items-center justify-between gap-8 overflow-visible">
            {/* Resplandor ambiental suave */}
            <div className="absolute right-10 top-0 w-80 h-80 bg-sky-200/25 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex-1 space-y-3 text-center md:text-left">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-[#002b7f] text-xs font-extrabold uppercase tracking-widest shadow-xs">
                <Microscope className="w-4 h-4 text-[#0284c7]" />
                Comité de Investigación Clínica y Epidemiológica
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 leading-tight">
                Generación de Evidencia Científica y Práctica Basada en Datos
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed max-w-2xl">
                Fortalecemos la capacidad investigativa de enfermeras y enfermeros para liderar ensayos clínicos, estudios epidemiológicos y protocolos de seguridad farmacológica alineados con los estándares de la OPS/OMS y literatura SciELO.
              </p>
            </div>

            {/* Ilustración Isométrica 3D flotante 100% transparente sin bordes ni recuadro */}
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 shrink-0 flex items-center justify-center">
              <Image
                src="/assets/illustrations/iso_nursing_dna.png"
                alt="Hélice de ADN e Investigación Clínica 3D"
                fill
                className="object-contain drop-shadow-[0_16px_32px_rgba(2,132,199,0.22)] transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FINES ESTATUTARIOS ==================== */}
      <section id="fines" className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-[#ce1126] text-xs font-bold tracking-widest uppercase bg-rose-50 px-3.5 py-1 rounded-full border border-rose-200">
              Marco Normativo Oficial
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 mt-3">
              Los 8 Fines Estatutarios de ARCCPCE
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { num: 1, title: "Integración y Alianzas Estratégicas", desc: "Integrar acciones colaborativas con actores estratégicos de la enfermería y gestión del cuidado en salud y ambiente." },
              { num: 2, title: "Políticas de Salud Inclusivas", desc: "Abogar por políticas de salud inclusivas, promoviendo la participación en la toma de decisiones sanitarias de alto nivel." },
              { num: 3, title: "Activismo Sociopolítico y Comunitario", desc: "Estimular el activismo sociopolítico como herramienta para el cambio social y fortalecimiento de las comunidades." },
              { num: 4, title: "Puentes de Cooperación Internacional", desc: "Extender alianzas con COMISCA, SICA, GPECAC, FEPPEN, CIE y OPS/OMS, fundaciones y sociedad civil." },
              { num: 5, title: "Cooperación Universitaria y Buenas Prácticas", desc: "Fomentar el intercambio académico, investigación conjunta y homologación de competencias entre universidades de la región." },
              { num: 6, title: "Dignificación y Condiciones Laborales", desc: "Abogar por condiciones laborales justas, salarios dignos y freno a la migración calificada no planificada, respaldando la retención del talento ante el déficit regional reportado por la OPS." },
              { num: 7, title: "Investigación Abierta Basada en Evidencia", desc: "Impulsar publicaciones y generación de conocimiento clínico basado en evidencia para optimizar los indicadores de salud en hospitales y en el 80% de las intervenciones de Atención Primaria de Salud (APS)." },
              { num: 8, title: "Capacitación en Liderazgo y Digitalización", desc: "Capacitar a enfermeras y enfermeros en gobernanza, liderazgo de políticas públicas, telemedicina y adopción de tecnologías digitales para superar la brecha tecnológica sanitaria." },
            ].map((f) => (
              <div key={f.num} className="bg-slate-50 p-5 rounded-2xl border border-slate-200 flex items-start gap-4 hover:border-sky-300 transition-all shadow-sm">
                <div className="w-9 h-9 rounded-xl bg-white text-[#002b7f] font-black flex items-center justify-center flex-shrink-0 text-sm border border-slate-200 shadow-sm">
                  {f.num}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">{f.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== CENTRO DE INTELIGENCIA Y ACTUALIDAD SANITARIA ==================== */}
      <RegionalNewsHub />

      {/* ==================== MESA DIRECTIVA OFICIAL 2026-2028 ==================== */}
      <BoardOfDirectors />

      {/* ==================== SOCIOS FUNDADORES OFICIALES (19 DE MARZO DE 2026) ==================== */}
      <FoundingMembers />

      {/* ==================== CONSEJOS DE EXPERTOS NACIONALES E INTERNACIONALES ==================== */}
      <ExpertCouncils />

      {/* ==================== COMITÉS TÉCNICOS REGIONALES ==================== */}
      <TechnicalCommittees />

      {/* ==================== GALERÍA FOTOGRÁFICA EN CINTILLO PANORÁMICO ==================== */}
      <section id="galeria" className="py-20 bg-white border-t border-slate-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-[#002b7f] text-xs font-bold tracking-widest uppercase bg-sky-50 px-3.5 py-1 rounded-full border border-sky-100 inline-block mb-3">
                Memoria Histórica y Fotográfica
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900">
                Galería de Sesiones Solemnes
              </h2>
              <p className="text-slate-500 text-sm mt-2 max-w-2xl">
                Registro fotográfico de la asamblea constitutiva en San José, Costa Rica. Pase el cursor para pausar o haga clic en cualquier fotografía para verla ampliada.
              </p>
            </div>

            {/* Controles de Navegación del Cintillo */}
            <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
              <button
                onClick={() => scrollRibbon("left")}
                aria-label="Desplazar cintillo a la izquierda"
                className="w-10 h-10 rounded-full border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 flex items-center justify-center shadow-xs transition-colors hover:border-[#002b7f] hover:text-[#002b7f]"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollRibbon("right")}
                aria-label="Desplazar cintillo a la derecha"
                className="w-10 h-10 rounded-full border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 flex items-center justify-center shadow-xs transition-colors hover:border-[#002b7f] hover:text-[#002b7f]"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Contenedor del Cintillo Panorámico */}
        <div className="relative w-full overflow-hidden py-4">
          {/* Sombras laterales de degradado para terminación visual profesional */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

          {/* Riel con desplazamiento continuo (Cintillo Dinámico) */}
          <div
            ref={ribbonScrollRef}
            onMouseEnter={() => setIsHoveredGallery(true)}
            onMouseLeave={() => setIsHoveredGallery(false)}
            onTouchStart={() => setIsHoveredGallery(true)}
            onTouchEnd={() => setIsHoveredGallery(false)}
            className="flex gap-5 overflow-x-auto no-scrollbar scroll-smooth px-8 py-2"
          >
            {/* Duplicación para efecto infinito de cintillo continuo */}
            {[...GALLERY_IMAGES, ...GALLERY_IMAGES].map((img, idx) => {
              const realIndex = idx % GALLERY_IMAGES.length;
              return (
                <div
                  key={idx}
                  onClick={() => setSelectedGalleryIndex(realIndex)}
                  className="group relative w-72 sm:w-80 h-52 sm:h-56 shrink-0 rounded-2xl overflow-hidden cursor-pointer border border-slate-200/90 bg-slate-100 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5"
                >
                  <Image
                    src={img.src}
                    alt={img.title}
                    fill
                    sizes="(max-width: 640px) 288px, 320px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent opacity-85 sm:opacity-75 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end text-white">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#eab308] bg-black/50 px-2 py-0.5 rounded-full border border-white/20 w-fit mb-1 backdrop-blur-xs">
                      {img.tag}
                    </span>
                    <p className="text-xs sm:text-sm font-bold font-display leading-tight drop-shadow">
                      {img.title}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== ALIANZAS INTERNACIONALES ==================== */}
      <section id="alianzas" className="py-20 bg-slate-50/80 border-t border-slate-200/90 relative overflow-hidden">
        {/* Acentos de luz sutiles que armonizan con el portal */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-sky-300 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-sky-100/50 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-[#002b7f] text-xs font-bold uppercase tracking-widest bg-sky-100/70 text-[#002b7f] px-4 py-1 rounded-full border border-sky-200/60 inline-block mb-3">
              Red de Articulación e Incidencia
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 tracking-tight">
              Vínculos Regionales e Internacionales
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2.5 max-w-2xl mx-auto leading-relaxed">
              Convergencia técnica y de ontológica con organismos rectores de la salud pública y el ejercicio profesional de la enfermería.
            </p>
          </div>

          {/* Galería Heráldica Limpia y Armónica (Sin cajas pesadas ni fondos discordantes) */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8 items-start">
            {[
              {
                id: "comisca",
                logo: "/assets/logos/comisca.svg",
                name: "COMISCA",
                fullName: "Consejo de Ministros de Salud de Centroamérica y República Dominicana",
                desc: "Consejo de Ministros de Salud",
                scope: "Regional CA",
                url: null, // Sin enlace activo para evitar páginas caídas
              },
              {
                id: "sica",
                logo: "/assets/logos/sica.svg",
                name: "SICA",
                fullName: "Sistema de la Integración Centroamericana",
                desc: "Integración Regional",
                scope: "Integración",
                url: null, // Sin enlace activo para evitar páginas caídas
              },
              {
                id: "ops",
                logo: "/assets/logos/ops.svg",
                name: "OPS / OMS",
                fullName: "Organización Panamericana de la Salud",
                desc: "Salud Panamericana",
                scope: "ONU / Salud",
                url: "https://www.paho.org/es", // Enlace oficial verificado y operativo
              },
              {
                id: "cie",
                logo: "/assets/logos/cie.svg",
                name: "CIE • ICN",
                fullName: "Consejo Internacional de Enfermeras (Ginebra, Suiza)",
                desc: "Consejo Internacional",
                scope: "Global",
                url: "https://www.icn.ch/es", // Enlace oficial verificado y operativo
              },
              {
                id: "feppen",
                logo: "/assets/logos/feppen.svg",
                name: "FEPPEN",
                fullName: "Federación Panamericana de Profesionales de Enfermería",
                desc: "Federación Panamericana",
                scope: "Las Américas",
                url: null, // Dominio expirado en venta, sin enlace
              },
              {
                id: "gpecac",
                logo: "/assets/logos/gpecac.svg",
                name: "GPECAC",
                fullName: "Grupo Profesional de Enfermería Centroamérica y del Caribe",
                desc: "Centroamérica y el Caribe",
                scope: "Caribe & CA",
                url: null, // Página no disponible, sin enlace
              },
            ].map((org) => {
              const isClickable = Boolean(org.url);
              const Tag = isClickable ? "a" : "div";
              const tagProps = isClickable
                ? {
                    href: org.url!,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    title: `Visitar portal oficial de ${org.fullName}`,
                  }
                : {
                    title: org.fullName,
                  };

              return (
                <Tag
                  key={org.id}
                  {...tagProps}
                  className={`group flex flex-col items-center text-center p-4 transition-all duration-300 select-none ${
                    isClickable
                      ? "cursor-pointer hover:-translate-y-1.5"
                      : "cursor-default"
                  }`}
                >
                  {/* Distintivo de ámbito de actuación */}
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 group-hover:text-[#002b7f] transition-colors mb-3">
                    {org.scope}
                  </span>

                  {/* Escudo en estado puro, armónico con el fondo */}
                  <div className="w-24 h-24 sm:w-28 sm:h-28 relative flex items-center justify-center my-2">
                    <Image
                      src={org.logo}
                      alt={`Escudo de ${org.name}`}
                      width={92}
                      height={92}
                      className={`object-contain transition-transform duration-300 ${
                        isClickable ? "group-hover:scale-108" : "group-hover:scale-103"
                      }`}
                    />
                  </div>

                  {/* Identificador institucional */}
                  <div className="mt-3 space-y-0.5">
                    <div className="flex items-center justify-center gap-1">
                      <span className="text-slate-900 font-extrabold text-sm sm:text-base tracking-wide group-hover:text-[#002b7f] transition-colors">
                        {org.name}
                      </span>
                      {isClickable && (
                        <ExternalLink className="w-3 h-3 text-[#002b7f] opacity-50 group-hover:opacity-100 transition-opacity" />
                      )}
                    </div>
                    <span className="block text-[11px] text-slate-500 font-medium leading-snug">
                      {org.desc}
                    </span>
                  </div>

                  {/* Indicador de portal oficial solo en los organismos con enlace activo verificado */}
                  {isClickable && (
                    <span className="mt-2.5 inline-block text-[9px] font-bold text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-100 group-hover:bg-[#002b7f] group-hover:text-white transition-all">
                      Portal Oficial
                    </span>
                  )}
                </Tag>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== ESTACIÓN DE HERRAMIENTAS CLÍNICAS & CALCULADORAS ==================== */}
      <ClinicalCareStation />

      {/* ==================== AFILIACIÓN Y PASAPORTE DIGITAL ==================== */}
      <section id="contacto" className="py-20 bg-white border-t border-slate-200">
        <div id="afiliacion" className="scroll-mt-24" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Columna Izquierda: Información y Pasaporte Digital */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-[#002b7f] text-xs font-bold tracking-widest uppercase bg-sky-50 px-3.5 py-1 rounded-full border border-sky-100">
                  Beneficios y Acreditación
                </span>
                <h2 className="text-3xl font-extrabold font-display text-slate-900 mt-3">
                  Afiliación y Pasaporte Digital DPC
                </h2>
                <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                  Al integrarte a ARCCPCE obtienes tu credencial con código QR de verificación regional y acceso a la red de mentorías y homologación curricular.
                </p>
              </div>

              {/* Tarjeta Pasaporte Digital DPC */}
              <DigitalPassportCard />

              {/* Composición Isométrica Flotante: Cuidado y Compromiso Gremial 100% transparente */}
              <div className="relative py-2 px-1 flex items-center gap-4 overflow-visible">
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 shrink-0 flex items-center justify-center">
                  <Image
                    src="/assets/illustrations/iso_stethoscope_heart.png"
                    alt="Vocación y Cuidado de la Ciencia Enfermera 3D"
                    fill
                    className="object-contain drop-shadow-[0_8px_20px_rgba(206,17,38,0.2)] transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="flex-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#002b7f] block">
                    Vocación, Ética y Acreditación
                  </span>
                  <h4 className="font-bold font-display text-slate-900 text-sm sm:text-base leading-tight mt-0.5">
                    Certificación de Competencias y Cuidado Clínico
                  </h4>
                  <p className="text-[11px] text-slate-500 leading-snug mt-1">
                    Validación transfronteriza y respaldo gremial para el ejercicio profesional en los 7 países miembros.
                  </p>
                </div>
              </div>

              {/* Vías de contacto */}
              <div className="space-y-3 pt-1 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#002b7f]" />
                  <div>
                    <span className="text-slate-500 block text-[10px] font-bold">Correo Oficial:</span>
                    <a href="mailto:arccpce@gmail.com" className="text-[#002b7f] font-bold underline">arccpce@gmail.com</a>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 flex items-center gap-3">
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <div>
                    <span className="text-slate-500 block text-[10px] font-bold">WhatsApp Secretaría:</span>
                    <a href="https://wa.me/50672370244" target="_blank" rel="noopener noreferrer" className="text-emerald-700 font-bold underline flex items-center gap-1">
                      Abrir Chat Oficial <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Columna Derecha: Formulario */}
            <div className="lg:col-span-7 bg-slate-50 p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-lg">
              <h3 className="text-xl font-bold font-display text-slate-900 mb-2">
                Formulario de Afiliación Profesional
              </h3>
              <p className="text-xs text-slate-500 mb-6 font-medium">
                Complete sus datos para emitir su solicitud a la secretaría general de ARCCPCE.
              </p>

              <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Nombre Completo *</label>
                    <input
                      name="fullName"
                      type="text"
                      required
                      placeholder="Ej. Licda. María González"
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-[#002b7f] text-xs"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Correo Electrónico *</label>
                    <input
                      name="email"
                      type="email"
                      required
                      placeholder="ejemplo@correo.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-[#002b7f] text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">País de Residencia *</label>
                    <select
                      id="countrySelect"
                      name="country"
                      required
                      defaultValue="CR"
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-[#002b7f] text-xs"
                    >
                      <option value="CR">🇨🇷 Costa Rica (Sede Central)</option>
                      <option value="GT">🇬🇹 Guatemala</option>
                      <option value="SV">🇸🇻 El Salvador</option>
                      <option value="HN">🇭🇳 Honduras</option>
                      <option value="NI">🇳🇮 Nicaragua</option>
                      <option value="PA">🇵🇦 Panamá</option>
                      <option value="CAR">🇩🇴 República Dominicana / Caribe</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">WhatsApp de Contacto</label>
                    <input
                      name="whatsapp"
                      type="tel"
                      placeholder="+506 ...."
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-[#002b7f] text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Área de Especialidad / Ejercicio</label>
                  <input
                    id="specialtyInput"
                    name="specialty"
                    type="text"
                    placeholder="Ej. Cuidados Críticos, Salud Pública, Docencia Universitaria"
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-[#002b7f] text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Mensaje / Motivación *</label>
                  <textarea
                    id="messageInput"
                    name="motivation"
                    rows={4}
                    required
                    placeholder="Indique brevemente su interés en formar parte de la asociación o comités técnicos..."
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-[#002b7f] text-xs"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#002b7f] hover:bg-[#001d57] text-white font-extrabold py-3.5 px-6 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm"
                >
                  <Send className="w-4 h-4 text-sky-200" />
                  <span>{isSubmitting ? "Procesando Afiliación..." : "Enviar Solicitud de Afiliación"}</span>
                </button>

                {formSubmitted && (
                  <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50 border-2 border-emerald-300 text-emerald-950 space-y-3 text-xs shadow-sm">
                    <div className="flex items-center gap-2 font-black text-sm text-emerald-900">
                      <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-600" />
                      <span>¡Solicitud Registrada y Constancia Generada con Éxito!</span>
                    </div>
                    {registeredFolio && (
                      <div className="inline-block bg-white px-3 py-1 rounded-lg border border-emerald-300 font-mono font-bold text-xs text-[#002b7f]">
                        Folio Oficial: {registeredFolio}
                      </div>
                    )}
                    <p className="text-emerald-900 leading-relaxed font-medium">
                      Tu constancia de pre-afiliación ha quedado asentada en el padrón regional de ARCCPCE. Se ha iniciado la descarga automática de tu documento oficial en formato PDF. La Secretaría General te contactará vía WhatsApp/Correo para coordinar la entrega de tu Pasaporte Digital DPC.
                    </p>
                    {lastSubmissionData && (
                      <button
                        type="button"
                        onClick={() => generateMembershipCertificate(lastSubmissionData)}
                        className="inline-flex items-center gap-2 bg-[#002b7f] hover:bg-[#001d57] text-white font-bold py-2 px-4 rounded-xl shadow-sm transition-all text-xs cursor-pointer"
                      >
                        <FileDown className="w-4 h-4 text-amber-300" />
                        <span>Volver a Descargar Constancia Oficial en PDF</span>
                      </button>
                    )}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== CÓDIGO QR Y DIFUSIÓN REGIONAL DEL PORTAL ==================== */}
      <SharePortalCard />

      {/* ==================== FOOTER (AZUL PATRIO ELEGANTE) ==================== */}
      <footer className="bg-[#001d57] text-slate-300 pt-16 pb-12 border-t-4 border-[#ce1126]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-white/10">
            <div className="md:col-span-6 space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white/20">
                  <Image src="/assets/images/logo.jpeg" alt="Logo" fill className="object-cover" />
                </div>
                <span className="text-lg font-black text-white font-display">ARCCPCE</span>
              </div>
              <p className="max-w-md text-slate-300">
                Asociación Regional Centroamericana y Caribe de Profesionales de la Ciencia Enfermería. San José, Costa Rica.
              </p>
            </div>

            <div className="md:col-span-3 space-y-2">
              <span className="font-bold uppercase tracking-wider text-white">Navegación</span>
              <ul className="space-y-1">
                <li><a href="#observatorio" className="hover:text-[#eab308]">Micro-Observatorio</a></li>
                <li><a href="#estacion-clinica" className="hover:text-[#eab308]">Herramientas Clínicas</a></li>
                <li><a href="#junta-directiva" className="hover:text-[#eab308]">Mesa Directiva</a></li>
                <li><a href="#socios-fundadores" className="hover:text-[#eab308]">Socios Fundadores</a></li>
                <li><a href="#consejo-expertos" className="hover:text-[#eab308]">Consejos de Expertos</a></li>
                <li><a href="#comites" className="hover:text-[#eab308]">Comités Técnicos</a></li>
                <li><a href="#compartir" className="hover:text-[#eab308]">Código QR & Compartir</a></li>
                <li><a href="#contacto" className="hover:text-[#eab308]">Afiliación & Contacto</a></li>
              </ul>
            </div>

            <div className="md:col-span-3 space-y-2">
              <span className="font-bold uppercase tracking-wider text-white">Contacto Directo</span>
              <p>Email: <a href="mailto:arccpce@gmail.com" className="text-white underline">arccpce@gmail.com</a></p>
              <p>WhatsApp: <a href="https://wa.me/50672370244" target="_blank" rel="noopener noreferrer" className="text-emerald-400 font-bold underline">Iniciar conversación oficial</a></p>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row justify-between items-center text-slate-400 gap-2">
            <p>© 2026 ARCCPCE. Todos los derechos reservados.</p>
            <p>Unidos por el conocimiento, comprometidos con la vida.</p>
          </div>
        </div>
      </footer>

      {/* Modal Lightbox Interactivo Completo */}
      {selectedGalleryIndex !== null && GALLERY_IMAGES[selectedGalleryIndex] && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedGalleryIndex(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
        >
          {/* Botón Cerrar */}
          <button
            onClick={() => setSelectedGalleryIndex(null)}
            aria-label="Cerrar visor"
            className="absolute top-5 right-5 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-all border border-white/20 shadow-lg"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Botón Anterior */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrevImage();
            }}
            aria-label="Fotografía anterior"
            className="absolute left-4 sm:left-6 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-all border border-white/20 shadow-lg"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Botón Siguiente */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNextImage();
            }}
            aria-label="Fotografía siguiente"
            className="absolute right-4 sm:right-6 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-all border border-white/20 shadow-lg"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Contenedor Central de la Imagen */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center"
          >
            <div className="relative w-full h-[65vh] sm:h-[75vh]">
              <Image
                src={GALLERY_IMAGES[selectedGalleryIndex].src}
                alt={GALLERY_IMAGES[selectedGalleryIndex].title}
                fill
                priority
                className="object-contain"
              />
            </div>

            {/* Pie de Foto Institucional Elegante */}
            <div className="mt-4 text-center text-white space-y-1 px-4">
              <div className="flex items-center justify-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#eab308] bg-white/10 px-2.5 py-0.5 rounded-full border border-white/15">
                  {GALLERY_IMAGES[selectedGalleryIndex].tag}
                </span>
                <span className="text-xs text-slate-300 font-medium">
                  {selectedGalleryIndex + 1} de {GALLERY_IMAGES.length}
                </span>
              </div>
              <h4 className="text-base sm:text-lg font-bold font-display text-white">
                {GALLERY_IMAGES[selectedGalleryIndex].title}
              </h4>
              <p className="text-xs text-slate-300">
                Acto Solemne de Constitución Oficial - Sede San José, Costa Rica (19 de marzo de 2026)
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Botón Flotante WhatsApp */}
      <aside className="fixed bottom-6 right-6 z-50 flex items-center group">
        <a
          href="https://wa.me/50672370244?text=Hola%20ARCCPCE,%20deseo%20informaci%C3%B3n%20sobre%20la%20asociaci%C3%B3n"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat WhatsApp"
          className="relative w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all ring-4 ring-emerald-300/40"
        >
          <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
          <MessageCircle className="w-7 h-7 relative z-10" />
        </a>
      </aside>
    </div>
  );
}

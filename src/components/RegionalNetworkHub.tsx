"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  ExternalLink,
  X,
  Shield,
  Building,
  UserCheck,
  Activity,
  Users,
  Sparkles,
  ZoomIn,
  ZoomOut,
  RotateCcw,
} from "lucide-react";
import mapData from "@/data/central-america-svg.json";

export interface DelegationLeader {
  name: string;
  role: string;
  specialty: string;
  institution: string;
  email: string;
}

export interface HubCountry {
  id: string;
  name: string;
  capital: string;
  flag: string;
  isHeadquarters?: boolean;
  status: string;
  x: number;
  y: number;
  affiliatesCount: number;
  activeWorkingGroups: number;
  primaryStrategicFocus: string;
  leaders: DelegationLeader[];
}

const REGIONAL_NODES: Record<string, HubCountry> = {
  CR: {
    id: "CR",
    name: "Costa Rica",
    capital: "San José",
    flag: "🇨🇷",
    isHeadquarters: true,
    status: "Sede Central Fundacional",
    x: 321.4,
    y: 393.2,
    affiliatesCount: 48,
    activeWorkingGroups: 5,
    primaryStrategicFocus: "Gobernanza regional, armonización de competencias clínicas y secretaría permanente.",
    leaders: [
      {
        name: "Dr. José Eduardo Carvajal Obando",
        role: "Presidente de la Junta Directiva (2026-2028)",
        specialty: "Presidencia Fundacional • Convocante & Ponente Inaugural",
        institution: "Consejo Regional ARCCPCE • San José",
        email: "presidencia@arccpce.org",
      },
      {
        name: "Dra. Marlen Calvo Solano",
        role: "Vicepresidenta de la Junta Directiva (2026-2028)",
        specialty: "Vicepresidencia • Socia Fundadora • Clausura Oficial",
        institution: "Consejo Regional ARCCPCE • San José",
        email: "vicepresidencia@arccpce.org",
      },
      {
        name: "Dra. Patricia Quesada Steller",
        role: "Secretaria de la Junta Directiva (2026-2028)",
        specialty: "Secretaría General • Socia Fundadora",
        institution: "Consejo Regional ARCCPCE • San José",
        email: "secretaria@arccpce.org",
      },
      {
        name: "Dr. Josué Paniagua Sánchez",
        role: "Tesorero de la Junta Directiva (2026-2028)",
        specialty: "Tesorería y Finanzas • Socio Fundador",
        institution: "Consejo Regional ARCCPCE • San José",
        email: "tesoreria@arccpce.org",
      },
      {
        name: "Dra. Janet Morales Salazar",
        role: "Fiscal de la Junta Directiva (2026-2028)",
        specialty: "Fiscalía Deontológica • Socia Fundadora",
        institution: "Consejo Regional ARCCPCE • San José",
        email: "fiscalia@arccpce.org",
      },
      {
        name: "Dr. Fibier Olmos Venegas",
        role: "Vocal 1 de la Junta Directiva (2026-2028)",
        specialty: "Vocalía I de Gestión Científica",
        institution: "Consejo Regional ARCCPCE • San José",
        email: "vocal1@arccpce.org",
      },
      {
        name: "Dr. Marco Antonio Obando Rodríguez",
        role: "Vocal 2 de la Junta Directiva (2026-2028)",
        specialty: "Vocalía II de Gobernanza Regional",
        institution: "Consejo Regional ARCCPCE • San José",
        email: "vocal2@arccpce.org",
      },
      {
        name: "Lic. Álvaro Sánchez",
        role: "Socio Fundador Abogado",
        specialty: "Asesoría Legal • Lectura del Acta de Constitución",
        institution: "Asamblea Constitutiva ARCCPCE",
        email: "costarica@arccpce.org",
      },
      {
        name: "Teresita Mayela García Browne",
        role: "Socia Fundadora",
        specialty: "Firmante de Acta Constitutiva",
        institution: "Asamblea Constitutiva ARCCPCE",
        email: "costarica@arccpce.org",
      },
      {
        name: "Patricia Yolanda Robles Yglesias",
        role: "Socia Fundadora",
        specialty: "Firmante de Acta Constitutiva",
        institution: "Asamblea Constitutiva ARCCPCE",
        email: "costarica@arccpce.org",
      },
      {
        name: "María del Rocío Monge Quirós",
        role: "Socia Fundadora",
        specialty: "Firmante de Acta Constitutiva",
        institution: "Asamblea Constitutiva ARCCPCE",
        email: "costarica@arccpce.org",
      },
      {
        name: "Karla Tatiana Mena Páez",
        role: "Socia Fundadora",
        specialty: "Firmante de Acta Constitutiva",
        institution: "Asamblea Constitutiva ARCCPCE",
        email: "costarica@arccpce.org",
      },
      {
        name: "Alejandra Trejos Chacón",
        role: "Socia Fundadora",
        specialty: "Firmante de Acta Constitutiva",
        institution: "Asamblea Constitutiva ARCCPCE",
        email: "costarica@arccpce.org",
      },
      {
        name: "Emérita Angélica Martínez Retana",
        role: "Socia Fundadora",
        specialty: "Firmante de Acta Constitutiva",
        institution: "Asamblea Constitutiva ARCCPCE",
        email: "costarica@arccpce.org",
      },
      {
        name: "Carmen María Loaiza Madriz",
        role: "Socia Fundadora",
        specialty: "Firmante de Acta Constitutiva",
        institution: "Asamblea Constitutiva ARCCPCE",
        email: "costarica@arccpce.org",
      },
      {
        name: "Dra. Rebeca Moya Masís",
        role: "Socia Fundadora • Asesora de Mercadeo",
        specialty: "Asesoría Estratégica de Mercadeo y Comunicación",
        institution: "Asociación Regional ARCCPCE",
        email: "costarica@arccpce.org",
      },
      {
        name: "Dr. Carlos Siri Adema",
        role: "Miembro Honorario • Socio Fundador",
        specialty: "Decano de la Facultad de Ciencias de la Salud",
        institution: "Universidad Latina de Costa Rica",
        email: "costarica@arccpce.org",
      },
    ],
  },
  GT: {
    id: "GT",
    name: "Guatemala",
    capital: "Ciudad de Guatemala",
    flag: "🇬🇹",
    status: "Delegación Nacional Oficial",
    x: 102.9,
    y: 220.2,
    affiliatesCount: 34,
    activeWorkingGroups: 4,
    primaryStrategicFocus: "Investigación traslacional, bioética y atención primaria en comunidades.",
    leaders: [
      {
        name: "Dra. Karen Lorena Dubon De Paz",
        role: "Representante Oficial de Guatemala",
        specialty: "Educación, Investigación, Innovación",
        institution: "Universidad Mariano Gálvez de Guatemala",
        email: "guatemala@arccpce.org",
      },
      {
        name: "Lic. Leticia Bacilia Gomez de Leon de Huinac",
        role: "Representante Oficial de Guatemala",
        specialty: "Gestión Gremial y Práctica Clínica",
        institution: "Delegación ARCCPCE Guatemala",
        email: "guatemala@arccpce.org",
      },
    ],
  },
  SV: {
    id: "SV",
    name: "El Salvador",
    capital: "San Salvador",
    flag: "🇸🇻",
    status: "Delegación Nacional Oficial",
    x: 146.6,
    y: 253.2,
    affiliatesCount: 29,
    activeWorkingGroups: 3,
    primaryStrategicFocus: "Protocolos avanzados de soporte vital, triaje de urgencias y terapia intensiva.",
    leaders: [
      {
        name: "Mag. Cruz Barahona",
        role: "Representante Oficial de El Salvador",
        specialty: "Gestión Gremial y Práctica Clínica",
        institution: "Delegación ARCCPCE El Salvador",
        email: "elsalvador@arccpce.org",
      },
    ],
  },
  HN: {
    id: "HN",
    name: "Honduras",
    capital: "Tegucigalpa",
    flag: "🇭🇳",
    status: "Comité Nacional de Enlace",
    x: 215.4,
    y: 240.2,
    affiliatesCount: 26,
    activeWorkingGroups: 3,
    primaryStrategicFocus: "Resiliencia de centros de salud comunitarios, inmunización preventiva y nutrición.",
    leaders: [
      {
        name: "Mag. Orbelia López",
        role: "Representante Oficial de Honduras",
        specialty: "Educación, Investigación e Innovación",
        institution: "Universidad Católica de Honduras",
        email: "honduras@arccpce.org",
      },
    ],
  },
  NI: {
    id: "NI",
    name: "Nicaragua",
    capital: "Managua",
    flag: "🇳🇮",
    status: "Comité Nacional de Enlace",
    x: 247.9,
    y: 312.4,
    affiliatesCount: 22,
    activeWorkingGroups: 2,
    primaryStrategicFocus: "Reducción de mortalidad neonatal, humanización de cuidados perinatales y lactancia.",
    leaders: [
      {
        name: "Delegación Nicaragua",
        role: "Coordinación de Enlace Nacional",
        specialty: "Salud Materno-Infantil & Neonatología",
        institution: "Asociaciones Profesionales de Nicaragua",
        email: "nicaragua@arccpce.org",
      },
    ],
  },
  PA: {
    id: "PA",
    name: "Panamá",
    capital: "Ciudad de Panamá",
    flag: "🇵🇦",
    status: "Comité Nacional de Enlace",
    x: 476.1,
    y: 428.1,
    affiliatesCount: 31,
    activeWorkingGroups: 4,
    primaryStrategicFocus: "Farmacovigilancia, seguridad del paciente e innovación de políticas sanitarias.",
    leaders: [
      {
        name: "Delegación Panamá",
        role: "Coordinación de Enlace Nacional",
        specialty: "Farmacovigilancia & Políticas Sanitarias",
        institution: "Asociación Nacional de Enfermeras de Panamá",
        email: "panama@arccpce.org",
      },
    ],
  },
  DO: {
    id: "DO",
    name: "Rep. Dominicana",
    capital: "Santo Domingo",
    flag: "🇩🇴",
    status: "Nodo Caribe Oficial",
    x: 801.4,
    y: 75.8,
    affiliatesCount: 27,
    activeWorkingGroups: 3,
    primaryStrategicFocus: "Tele-enfermería, expedientes electrónicos integrados y acreditación regional de competencias.",
    leaders: [
      {
        name: "Delegación República Dominicana",
        role: "Coordinación Nodo Caribe",
        specialty: "Informática en Salud & Transformación Digital",
        institution: "Colegio Dominicano de Profesionales de Enfermería",
        email: "caribe@arccpce.org",
      },
    ],
  },
};

const SAN_JOSE_COORDS = { x: 321.4, y: 393.2 };

export default function RegionalNetworkHub() {
  const [selectedCountryId, setSelectedCountryId] = useState<string | null>(null);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedCountry = selectedCountryId ? REGIONAL_NODES[selectedCountryId] : null;

  // Zoom controlado exclusivamente mediante los botones de zoom
  const handleZoomIn = () => {
    setScale((prev) => Math.min(2.4, Number((prev + 0.25).toFixed(2))));
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(0.85, Number((prev - 0.25).toFixed(2))));
  };

  const handleReset = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
    setSelectedCountryId(null);
  };

  // Arrastre con Mouse
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX - position.x, y: e.clientY - position.y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStartRef.current.x,
      y: e.clientY - dragStartRef.current.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Soporte táctil
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      dragStartRef.current = {
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y,
      };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    setPosition({
      x: e.touches[0].clientX - dragStartRef.current.x,
      y: e.touches[0].clientY - dragStartRef.current.y,
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Cerrar Drawer con tecla Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedCountryId(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleJoinDelegation = useCallback((country: HubCountry) => {
    setSelectedCountryId(null);
    const affiliationSection = document.getElementById("contacto");
    if (affiliationSection) {
      affiliationSection.scrollIntoView({ behavior: "smooth" });
      const countrySelect = document.getElementById("afiliacion-pais") as HTMLSelectElement | null;
      if (countrySelect) {
        countrySelect.value = country.name;
        countrySelect.dispatchEvent(new Event("change", { bubbles: true }));
      }
    }
  }, []);

  const makeArcPath = (from: { x: number; y: number }, to: { x: number; y: number }) => {
    const dx = to.x - from.x;
    const midX = (from.x + to.x) / 2;
    const midY = (from.y + to.y) / 2 - Math.abs(dx) * 0.18;
    return `M ${from.x} ${from.y} Q ${midX} ${midY} ${to.x} ${to.y}`;
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[520px] sm:h-[560px] flex items-center justify-center select-none bg-transparent"
      style={{
        maskImage: "radial-gradient(ellipse 90% 85% at center, black 60%, transparent 95%)",
        WebkitMaskImage: "radial-gradient(ellipse 90% 85% at center, black 60%, transparent 95%)",
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Halo de degradado marino difuso y orgánico (se funde 100% con el fondo del Hero) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 75% 65% at 50% 50%, rgba(224, 242, 254, 0.65) 0%, rgba(240, 249, 255, 0.35) 45%, transparent 75%)",
        }}
      />
      <div className="absolute w-[280px] h-[280px] rounded-full bg-amber-100/50 blur-3xl pointer-events-none translate-x-10 translate-y-16" />

      {/* 1. Barra de Controles Superiores Flotante (Blanca, Nítida, Accesible) */}
      <div className="absolute top-2 right-2 flex items-center gap-2 z-30 pointer-events-auto">
        <div className="flex items-center gap-1 bg-white/95 backdrop-blur-md border border-slate-200/90 p-1 rounded-xl shadow-md transition-all">
          <button
            type="button"
            onClick={handleZoomIn}
            className="w-8 h-8 rounded-lg hover:bg-sky-50 active:bg-sky-100 text-[#002b7f] flex items-center justify-center transition-all cursor-pointer font-bold text-sm"
            title="Acercar (Zoom In)"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleZoomOut}
            className="w-8 h-8 rounded-lg hover:bg-sky-50 active:bg-sky-100 text-[#002b7f] flex items-center justify-center transition-all cursor-pointer font-bold text-sm"
            title="Alejar (Zoom Out)"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="px-2.5 h-8 rounded-lg hover:bg-sky-50 active:bg-sky-100 text-[#002b7f] flex items-center gap-1.5 transition-all cursor-pointer text-xs font-bold"
            title="Restablecer posición inicial"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>

      {/* 2. Cartografía SVG Integrada Directamente sobre el Hero */}
      <div
        className="w-full h-full flex items-center justify-center transition-transform duration-75 cursor-grab active:cursor-grabbing"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${scale})`,
          transformOrigin: "center center",
        }}
      >
        <svg
          viewBox="0 0 900 520"
          className="w-full h-full max-w-[940px] max-h-[540px] overflow-visible"
        >
          <defs>
            <linearGradient id="lightArcGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.9" />
              <stop offset="60%" stopColor="#0284c7" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#002b7f" stopOpacity="0.75" />
            </linearGradient>

            <filter id="soft-drop" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#002b7f" floodOpacity="0.10" />
            </filter>
            <filter id="selected-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#0284c7" floodOpacity="0.30" />
            </filter>
          </defs>

          {/* 2.1 Países del Contexto Vecino (México, Colombia, Cuba, Jamaica, etc.) en tono neutro suave */}
          <g className="opacity-60">
            {mapData.neighbors.map((n) => (
              <path
                key={n.id}
                d={n.d}
                fill="#f1f5f9"
                stroke="#cbd5e1"
                strokeWidth="0.85"
                strokeDasharray="2 3"
              />
            ))}
          </g>

          {/* 2.2 Países Miembros de ARCCAPROCE en Colores Institucionales Claros */}
          <g className="cursor-pointer">
            {Object.values(mapData.members).map((m) => {
              const node = REGIONAL_NODES[m.id];
              const isSelected = selectedCountryId === m.id;
              const isHq = node?.isHeadquarters;

              return (
                <path
                  key={m.id}
                  d={m.d}
                  fill={
                    isSelected
                      ? isHq
                        ? "#fef3c7"
                        : "#e0f2fe"
                      : isHq
                      ? "#fffbeb"
                      : "#f0f9ff"
                  }
                  stroke={
                    isSelected
                      ? isHq
                        ? "#f59e0b"
                        : "#0284c7"
                      : isHq
                      ? "#f59e0b"
                      : "#002b7f"
                  }
                  strokeWidth={isSelected ? 2.5 : isHq ? 2.0 : 1.5}
                  filter={isSelected ? "url(#selected-glow)" : "url(#soft-drop)"}
                  className="transition-all duration-300 hover:fill-sky-100 hover:stroke-[#0284c7]"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedCountryId(m.id);
                  }}
                />
              );
            })}
          </g>

          {/* 2.3 Arcos de Red Curvos con Partículas Luminosas */}
          <g className="pointer-events-none">
            {Object.values(REGIONAL_NODES)
              .filter((n) => !n.isHeadquarters)
              .map((target) => {
                const pathD = makeArcPath(SAN_JOSE_COORDS, { x: target.x, y: target.y });
                const isTargetSelected = selectedCountryId === target.id;

                return (
                  <g key={target.id}>
                    <path
                      d={pathD}
                      fill="none"
                      stroke={isTargetSelected ? "#0284c7" : "url(#lightArcGradient)"}
                      strokeWidth={isTargetSelected ? 2.4 : 1.5}
                      strokeOpacity={isTargetSelected ? 0.95 : 0.65}
                      className="transition-all duration-300"
                    />

                    <path
                      d={pathD}
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="2.8"
                      strokeDasharray="8 70"
                      className="animate-flow-dash"
                    />
                  </g>
                );
              })}
          </g>

          {/* 2.4 Nodos de Capitales con Pulso de Radar */}
          <g>
            {Object.values(REGIONAL_NODES).map((node) => {
              const isHq = node.isHeadquarters;
              const isSelected = selectedCountryId === node.id;

              return (
                <g
                  key={node.id}
                  transform={`translate(${node.x}, ${node.y})`}
                  className="cursor-pointer group"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedCountryId(node.id);
                  }}
                >
                  {isHq ? (
                    <>
                      <circle
                        r="18"
                        fill="none"
                        stroke="#f59e0b"
                        strokeWidth="1.5"
                        className="animate-ping opacity-60"
                        style={{ animationDuration: "2.2s" }}
                      />
                      <circle
                        r="11"
                        fill="none"
                        stroke="#fbbf24"
                        strokeWidth="1.6"
                        className="animate-pulse opacity-80"
                      />
                    </>
                  ) : (
                    <circle
                      r="12"
                      fill="none"
                      stroke="#0284c7"
                      strokeWidth="1.3"
                      className="animate-ping opacity-50"
                      style={{ animationDuration: "2.8s" }}
                    />
                  )}

                  <circle
                    r={isHq ? 6.5 : 4.8}
                    fill={isHq ? "#f59e0b" : "#002b7f"}
                    stroke="#ffffff"
                    strokeWidth={isHq ? 2.4 : 1.8}
                    className="transition-transform duration-300 group-hover:scale-125"
                    style={{
                      filter: isHq
                        ? "drop-shadow(0 0 6px rgba(245, 158, 11, 0.7))"
                        : "drop-shadow(0 0 5px rgba(0, 43, 127, 0.5))",
                    }}
                  />

                  <text
                    x={isHq ? 10 : 8}
                    y={isHq ? -10 : -7}
                    fill={isHq ? "#b45309" : "#002b7f"}
                    fontSize={isHq ? 12 : 11}
                    fontWeight={isHq ? "bold" : "600"}
                    className="pointer-events-none drop-shadow-sm tracking-wide font-sans"
                  >
                    {node.capital}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>
      </div>

      {/* 3. Leyenda Inferior Sutil */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 pointer-events-none z-20">
        <span className="inline-block px-4 py-1.5 bg-white/95 border border-slate-200/90 rounded-full text-slate-700 font-semibold text-xs shadow-md backdrop-blur-md">
          Haz clic en cualquier país o arrastra para explorar la red regional
        </span>
      </div>

      {/* 4. Drawer Lateral Derecho de Delegaciones (100% Claro, Elegante, Luminoso) */}
      <div
        className={`absolute top-0 right-0 h-full w-full sm:w-84 md:w-96 bg-white/95 backdrop-blur-xl border-l-2 border-slate-200/90 p-6 z-40 text-slate-800 shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-y-auto ${
          selectedCountry
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-full pointer-events-none"
        }`}
      >
        {selectedCountry && (
          <>
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <span className="text-3xl drop-shadow-sm">{selectedCountry.flag}</span>
                  <div>
                    <h4 className="text-xl font-extrabold text-[#002b7f] leading-tight">
                      {selectedCountry.name}
                    </h4>
                    <p className="text-xs text-[#0284c7] font-bold">{selectedCountry.capital}</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedCountryId(null)}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Cerrar panel de delegación"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider bg-sky-50 text-[#002b7f] px-2.5 py-1 rounded-md border border-sky-200">
                <Shield className="w-3.5 h-3.5 text-[#002b7f]" />
                {selectedCountry.status}
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#002b7f]">
                  <UserCheck className="w-3.5 h-3.5 text-[#0284c7]" />
                  {selectedCountry.leaders.length > 1
                    ? `Miembros y Liderazgo Oficial (${selectedCountry.leaders.length})`
                    : "Liderazgo y Enlace Oficial"}
                </div>

                <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
                  {selectedCountry.leaders.map((leader, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-50 rounded-xl p-3 border border-slate-200/90 space-y-1 text-xs"
                    >
                      <h5 className="font-extrabold text-sm text-slate-900">{leader.name}</h5>
                      <p className="text-[#002b7f] font-semibold text-[11px]">{leader.role}</p>
                      <div className="text-slate-600 text-[11px] pt-1 border-t border-slate-200 space-y-0.5">
                        <div className="flex items-center gap-1.5">
                          <Activity className="w-3 h-3 text-[#0284c7] shrink-0" />
                          <span className="truncate">{leader.specialty}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Building className="w-3 h-3 text-[#0284c7] shrink-0" />
                          <span className="truncate">{leader.institution}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-center pt-1">
                <div className="p-2.5 rounded-xl bg-sky-50 border border-sky-100">
                  <span className="text-[11px] text-slate-500 block">Colegiados Adscritos</span>
                  <span className="text-base font-extrabold text-[#002b7f] flex items-center justify-center gap-1">
                    <Users className="w-3.5 h-3.5 text-[#0284c7]" />
                    {selectedCountry.affiliatesCount}
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-100">
                  <span className="text-[11px] text-slate-500 block">Grupos de Trabajo</span>
                  <span className="text-base font-extrabold text-emerald-700 flex items-center justify-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    {selectedCountry.activeWorkingGroups} Activos
                  </span>
                </div>
              </div>

              <div className="text-xs text-slate-700 bg-amber-50/70 p-2.5 rounded-xl border border-amber-200">
                <span className="font-bold text-[#b45309] block text-[11px] mb-0.5">
                  Eje Prioritario de Red:
                </span>
                {selectedCountry.primaryStrategicFocus}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => handleJoinDelegation(selectedCountry)}
                className="w-full bg-[#002b7f] hover:bg-[#001d57] text-white font-extrabold text-xs py-3 px-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Unirme a la Delegación de {selectedCountry.name}</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </>
        )}
      </div>

      <style jsx>{`
        @keyframes flowDash {
          0% {
            stroke-dashoffset: 78;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
        .animate-flow-dash {
          animation: flowDash 2.4s linear infinite;
        }
      `}</style>
    </div>
  );
}

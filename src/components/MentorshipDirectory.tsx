"use client";

import React, { useState } from "react";
import { Mentor } from "@/types";
import { Users, Microscope, MessageSquare } from "lucide-react";

const MENTORS: Mentor[] = [
  {
    id: "m1",
    name: "Dra. Carolina Monge Argüello",
    country: "Costa Rica",
    flag: "🇨🇷",
    specialty: "Salud Pública",
    institution: "Universidad de Costa Rica / Hospital San Juan de Dios",
    bio: "Especialista en epidemiología comunitaria y gobernanza en sistemas de salud de Centroamérica.",
    activeResearch: "Modelos de Atención Primaria en Zonas Rurales y Sostenibilidad Ambiental",
  },
  {
    id: "m2",
    name: "Dr. Jorge Morales Estrada",
    country: "Guatemala",
    flag: "🇬🇹",
    specialty: "Educación e Investigación",
    institution: "Facultad de Ciencias Médicas USAC",
    bio: "Pionero en metodologías de simulación clínica y homologación curricular regional.",
    activeResearch: "Integración de Inteligencia Artificial y Ética en la Ciencia Enfermera",
  },
  {
    id: "m3",
    name: "MSc. Claudia Rivas Henríquez",
    country: "El Salvador",
    flag: "🇸🇻",
    specialty: "Cuidados Intensivos",
    institution: "Hospital Nacional Rosales",
    bio: "Líder en protocolos de soporte vital avanzado y gestión de enfermería en emergencias.",
    activeResearch: "Prevención de Infecciones Asociadas a la Atención en UCI Pediátrica",
  },
  {
    id: "m4",
    name: "Lic. Marlon Mendoza Salgado",
    country: "Panamá",
    flag: "🇵🇦",
    specialty: "Gestión Sanitaria",
    institution: "Complejo Hospitalario Dr. Arnulfo Arias Madrid",
    bio: "Consultor en políticas salariales, retención del talento humano y liderazgo gremial.",
    activeResearch: "Impacto del Liderazgo de Enfermería en la Reducción de Tiempos Quirúrgicos",
  },
  {
    id: "m5",
    name: "MSc. Wendy Santos Pineda",
    country: "Honduras",
    flag: "🇭🇳",
    specialty: "Salud Pública",
    institution: "Escuela de Enfermería UNAH",
    bio: "Investigadora en determinantes sociales de la salud y salud materno-infantil.",
    activeResearch: "Vigilancia Nutricional y Redes de Apoyo Comunitario",
  },
  {
    id: "m6",
    name: "Dr. Rafael Almonte Reyes",
    country: "República Dominicana",
    flag: "🇩🇴",
    specialty: "Educación e Investigación",
    institution: "Universidad Autónoma de Santo Domingo (UASD)",
    bio: "Coordinador de posgrados y bioética en el Caribe insular.",
    activeResearch: "Teleenfermería y Seguimiento Remoto en Pacientes Crónicos",
  },
];

type SpecialtyFilter = "Todas" | Mentor["specialty"];

export default function MentorshipDirectory() {
  const [filter, setFilter] = useState<SpecialtyFilter>("Todas");

  const filteredMentors = filter === "Todas" ? MENTORS : MENTORS.filter((m) => m.specialty === filter);

  const handleContactMentor = (mentor: Mentor) => {
    const contactElem = document.getElementById("contacto");
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: "smooth" });
      const messageInput = document.getElementById("messageInput") as HTMLTextAreaElement | null;
      if (messageInput) {
        messageInput.value = `Deseo solicitar contacto / mentoría académica con ${mentor.name} (${mentor.country}) en el área de ${mentor.specialty}.`;
      }
    }
  };

  return (
    <section id="mentoria" className="py-20 bg-slate-50 text-slate-800 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-[#002b7f] text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
            <Users className="w-4 h-4 text-[#ce1126]" />
            Cooperación Científica Interinstitucional
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900">
            Red de Asesoría y Mentoría Transfronteriza
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            Conectamos a profesionales e investigadores noveles con mentores senior en Centroamérica y el Caribe para desarrollo de tesis, publicaciones científicas y proyectos en salud pública.
          </p>
        </div>

        {/* Filtros de Especialidad */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
          {(["Todas", "Salud Pública", "Cuidados Intensivos", "Educación e Investigación", "Gestión Sanitaria"] as SpecialtyFilter[]).map((cat) => {
            const isActive = filter === cat;
            return (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all border ${
                  isActive
                    ? "bg-[#002b7f] text-white border-[#002b7f] shadow-md shadow-[#002b7f]/20 scale-105"
                    : "bg-white text-slate-700 border-slate-200 hover:border-sky-300 hover:text-[#002b7f] shadow-sm"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Grid de Mentores */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMentors.map((m) => (
            <div
              key={m.id}
              className="bg-white hover:bg-white p-6 rounded-2xl border border-slate-200 hover:border-[#0284c7] transition-all duration-300 shadow-sm hover:shadow-lg flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{m.flag}</span>
                  <span className="text-[11px] font-bold text-[#002b7f] bg-sky-50 border border-sky-100 px-2.5 py-0.5 rounded-full">
                    {m.specialty}
                  </span>
                </div>

                <div>
                  <h3 className="text-base sm:text-lg font-bold font-display text-slate-900 group-hover:text-[#002b7f] transition-colors">
                    {m.name}
                  </h3>
                  <span className="text-xs text-[#ce1126] font-bold">{m.country}</span>
                  <p className="text-xs text-slate-500 mt-0.5 font-medium">{m.institution}</p>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">{m.bio}</p>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-[11px]">
                  <span className="text-slate-500 font-bold block mb-0.5 flex items-center gap-1">
                    <Microscope className="w-3.5 h-3.5 text-[#0284c7]" /> Línea de Investigación Activa:
                  </span>
                  <span className="text-slate-700 font-medium">{m.activeResearch}</span>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100">
                <button
                  onClick={() => handleContactMentor(m)}
                  className="w-full bg-[#002b7f] hover:bg-[#001d57] text-white font-bold text-xs py-2.5 px-4 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Agendar Consulta / Mentoría</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

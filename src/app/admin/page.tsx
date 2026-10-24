"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useContent } from "@/context/ContentContext";
import type { NewsItem } from "@/app/api/news/route";
import {
  ShieldCheck,
  Lock,
  User,
  LogOut,
  Plus,
  Edit2,
  Trash2,
  Upload,
  Eye,
  Save,
  RotateCcw,
  Download,
  FileText,
  Calendar,
  ExternalLink,
  ChevronRight,
  Sparkles,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  X,
  Newspaper,
  BookOpen,
  Globe2,
  Facebook,
  Play,
  Megaphone,
} from "lucide-react";

// Credenciales administrativas seguras por defecto
const ADMIN_USER = "admin";
const ADMIN_PASS = "arccpce2026!";
const AUTH_KEY = "arccpce_auth_session_active";

export default function AdminPage() {
  const {
    news,
    siteContent,
    addNewsItem,
    updateNewsItem,
    deleteNewsItem,
    updateSiteContent,
    resetToDefaults,
    exportBackupJson,
    importBackupJson,
  } = useContent();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState("");
  const [activeTab, setActiveTab] = useState<"news" | "sections" | "backup">("news");

  // Estado del formulario de noticias
  const [isEditingNews, setIsEditingNews] = useState(false);
  const [currentNewsId, setCurrentNewsId] = useState<string | null>(null);
  const [newsTitle, setNewsTitle] = useState("");
  const [newsSummary, setNewsSummary] = useState("");
  const [newsCategory, setNewsCategory] = useState<NewsItem["category"]>("institucional");
  const [newsSourceName, setNewsSourceName] = useState("");
  const [newsUrl, setNewsUrl] = useState("");
  const [newsDate, setNewsDate] = useState("");
  const [newsImageUrl, setNewsImageUrl] = useState("");
  const [newsFeatured, setNewsFeatured] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Estado del formulario de contenidos de secciones
  const [editVisionTitle, setEditVisionTitle] = useState("");
  const [editVisionDesc, setEditVisionDesc] = useState("");
  const [editMissionTitle, setEditMissionTitle] = useState("");
  const [editMissionDesc, setEditMissionDesc] = useState("");
  const [editContactEmail, setEditContactEmail] = useState("");
  const [editContactPhone, setEditContactPhone] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Comprobar autenticación previa en localStorage
  useEffect(() => {
    try {
      const session = sessionStorage.getItem(AUTH_KEY);
      if (session === "true") {
        setIsAuthenticated(true);
      }
    } catch {
      // Ignorar en SSR
    }
  }, []);

  // Cargar valores iniciales de secciones
  useEffect(() => {
    if (siteContent) {
      setEditVisionTitle(siteContent.vision?.title || "");
      setEditVisionDesc(siteContent.vision?.description || "");
      setEditMissionTitle(siteContent.mission?.title || "");
      setEditMissionDesc(siteContent.mission?.description || "");
      setEditContactEmail(siteContent.contact?.email || "");
      setEditContactPhone(siteContent.contact?.phone || "");
    }
  }, [siteContent]);

  const showNotification = (message: string, type: "success" | "error" = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (usernameInput.trim() === ADMIN_USER && passwordInput === ADMIN_PASS) {
      setIsAuthenticated(true);
      setLoginError("");
      try {
        sessionStorage.setItem(AUTH_KEY, "true");
      } catch {
        // Ignorar
      }
    } else {
      setLoginError("Usuario o contraseña incorrectos. Verifique sus credenciales.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    try {
      sessionStorage.removeItem(AUTH_KEY);
    } catch {
      // Ignorar
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showNotification("Por favor seleccione un archivo de imagen válido (JPG, PNG, WEBP).", "error");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64String = event.target?.result as string;
      setNewsImageUrl(base64String);
      showNotification("Imagen cargada y lista para publicar.");
    };
    reader.readAsDataURL(file);
  };

  const resetNewsForm = () => {
    setIsEditingNews(false);
    setCurrentNewsId(null);
    setNewsTitle("");
    setNewsSummary("");
    setNewsCategory("institucional");
    setNewsSourceName("ARCCPCE Oficial");
    setNewsUrl("");
    setNewsDate(new Date().toISOString().split("T")[0]);
    setNewsImageUrl("");
    setNewsFeatured(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const startEditNews = (item: NewsItem) => {
    setIsEditingNews(true);
    setCurrentNewsId(item.id);
    setNewsTitle(item.title);
    setNewsSummary(item.summary);
    setNewsCategory(item.category);
    setNewsSourceName(item.sourceName);
    setNewsUrl(item.url || "");
    setNewsDate(item.date);
    setNewsImageUrl(item.imageUrl || "");
    setNewsFeatured(Boolean(item.featured));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSaveNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsTitle.trim() || !newsSummary.trim()) {
      showNotification("El título y el resumen de la noticia son obligatorios.", "error");
      return;
    }

    const payload = {
      title: newsTitle.trim(),
      summary: newsSummary.trim(),
      category: newsCategory,
      sourceName: newsSourceName.trim() || "ARCCPCE Oficial",
      url: newsUrl.trim() || "#",
      date: newsDate || new Date().toISOString().split("T")[0],
      imageUrl: newsImageUrl || undefined,
      featured: newsFeatured,
    };

    if (currentNewsId) {
      updateNewsItem(currentNewsId, payload);
      showNotification("Noticia actualizada con éxito.");
    } else {
      addNewsItem(payload);
      showNotification("Nueva noticia publicada correctamente.");
    }

    resetNewsForm();
  };

  const handleDeleteNews = (id: string, title: string) => {
    if (window.confirm(`¿Está seguro de que desea eliminar la publicación: "${title}"?`)) {
      deleteNewsItem(id);
      showNotification("Noticia eliminada correctamente.");
    }
  };

  const handleSaveSections = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteContent({
      vision: {
        title: editVisionTitle.trim() || siteContent.vision.title,
        description: editVisionDesc.trim() || siteContent.vision.description,
      },
      mission: {
        title: editMissionTitle.trim() || siteContent.mission.title,
        description: editMissionDesc.trim() || siteContent.mission.description,
      },
      contact: {
        ...siteContent.contact,
        email: editContactEmail.trim() || siteContent.contact.email,
        phone: editContactPhone.trim() || siteContent.contact.phone,
      },
    });
    showNotification("Secciones de la página actualizadas con éxito.");
  };

  // Pantalla de Inicio de Sesión
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
          <div className="relative w-20 h-20 mx-auto rounded-full overflow-hidden shadow-lg border-2 border-white mb-4 bg-white">
            <Image src="/assets/images/logo.jpeg" alt="Logo ARCCPCE" fill className="object-contain p-1" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900">
            Panel de Control Editorial
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-600">
            Asociación Regional Centroamericana y Caribe de Profesionales de la Ciencia Enfermería
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
          <div className="bg-white py-8 px-6 shadow-xl rounded-2xl border border-slate-200 sm:px-10">
            <form onSubmit={handleLogin} className="space-y-5">
              {loginError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-[#ce1126]" />
                  <span>{loginError}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Usuario Administrativo
                </label>
                <div className="relative rounded-xl shadow-xs">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={usernameInput}
                    onChange={(e) => setUsernameInput(e.target.value)}
                    placeholder="admin"
                    className="block w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:ring-2 focus:ring-[#002b7f] focus:bg-white outline-hidden transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Contraseña de Acceso
                </label>
                <div className="relative rounded-xl shadow-xs">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type="password"
                    required
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="••••••••••••"
                    className="block w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:ring-2 focus:ring-[#002b7f] focus:bg-white outline-hidden transition-all"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-white bg-[#002b7f] hover:bg-[#001d57] focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-[#002b7f] transition-all cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4 text-sky-200" />
                  <span>Ingresar al Administrador</span>
                </button>
              </div>
            </form>

            <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <Link href="/" className="inline-flex items-center gap-1 hover:text-[#002b7f] font-semibold transition-colors">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Volver al Portal Público</span>
              </Link>
              <span className="text-[11px] text-slate-400">Acceso Seguro SSL</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Panel Principal de Administración
  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      {/* Notificación Flotante */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-xl text-sm font-bold border transition-all animate-in slide-in-from-top-3 ${
          notification.type === "success"
            ? "bg-emerald-50 text-emerald-800 border-emerald-300 shadow-emerald-500/10"
            : "bg-rose-50 text-rose-800 border-rose-300 shadow-rose-500/10"
        }`}>
          {notification.type === "success" ? (
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-[#ce1126] shrink-0" />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Barra Superior del Panel */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="relative w-9 h-9 rounded-full overflow-hidden border border-slate-200 bg-white">
              <Image src="/assets/images/logo.jpeg" alt="Logo" fill className="object-contain" />
            </div>
            <div>
              <span className="text-base font-extrabold text-[#002b7f] font-display block leading-none">
                ARCCPCE CMS
              </span>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                Gestión de Contenidos y Noticias
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-700 transition-colors"
            >
              <Eye className="w-3.5 h-3.5 text-[#002b7f]" />
              <span>Ver Portal en Vivo</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </Link>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-xs font-bold text-rose-700 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5 text-[#ce1126]" />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </div>

        {/* Pestañas de Navegación del CMS */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex border-t border-slate-100 gap-1 overflow-x-auto">
          {[
            { id: "news", label: "Noticias & Comunicados", count: news.length, icon: Newspaper },
            { id: "sections", label: "Identidad & Misión / Visión", icon: BookOpen },
            { id: "backup", label: "Copia de Seguridad & Respaldos", icon: Download },
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 py-3 px-4 border-b-2 font-bold text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? "border-[#002b7f] text-[#002b7f] bg-sky-50/50"
                    : "border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
                    isSelected ? "bg-[#002b7f] text-white" : "bg-slate-200 text-slate-700"
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </header>

      {/* Contenedor del Contenido Activo */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ==================== PESTAÑA 1: GESTIÓN DE NOTICIAS ==================== */}
        {activeTab === "news" && (
          <div className="space-y-8">
            {/* Formulario de Crear / Editar Noticia */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-7">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6 flex-wrap gap-2">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 font-display flex items-center gap-2">
                    {isEditingNews ? (
                      <>
                        <Edit2 className="w-5 h-5 text-amber-500" />
                        <span>Editando Publicación</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-5 h-5 text-[#002b7f]" />
                        <span>Nueva Publicación o Noticia</span>
                      </>
                    )}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Complete los campos para publicar contenido directo en la sección informativa del portal.
                  </p>
                </div>

                {isEditingNews && (
                  <button
                    onClick={resetNewsForm}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 text-xs font-bold hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Cancelar Edición</span>
                  </button>
                )}
              </div>

              <form onSubmit={handleSaveNews} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                  {/* Título */}
                  <div className="md:col-span-8">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Título de la Publicación *
                    </label>
                    <input
                      type="text"
                      required
                      value={newsTitle}
                      onChange={(e) => setNewsTitle(e.target.value)}
                      placeholder="Ej. Convocatoria Regional para Seminario de Práctica Clínica Avanzada"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:ring-2 focus:ring-[#002b7f] focus:bg-white outline-hidden transition-all"
                    />
                  </div>

                  {/* Categoría */}
                  <div className="md:col-span-4">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Categoría / Tipo de Contenido
                    </label>
                    <select
                      value={newsCategory}
                      onChange={(e) => setNewsCategory(e.target.value as NewsItem["category"])}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:ring-2 focus:ring-[#002b7f] focus:bg-white outline-hidden transition-all"
                    >
                      <option value="institucional">Comunicado Oficial ARCCPCE</option>
                      <option value="ops">Directriz OPS/OMS</option>
                      <option value="facebook">Publicación Facebook</option>
                      <option value="scielo">Investigación SciELO</option>
                      <option value="video">Webinar & Video</option>
                    </select>
                  </div>

                  {/* Resumen */}
                  <div className="md:col-span-12">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Resumen o Contenido Principal *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={newsSummary}
                      onChange={(e) => setNewsSummary(e.target.value)}
                      placeholder="Escriba aquí los detalles principales del comunicado, hallazgos o evento gremial..."
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:ring-2 focus:ring-[#002b7f] focus:bg-white outline-hidden transition-all"
                    />
                  </div>

                  {/* Fuente / Emisor */}
                  <div className="md:col-span-4">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Fuente o Entidad Emisora
                    </label>
                    <input
                      type="text"
                      value={newsSourceName}
                      onChange={(e) => setNewsSourceName(e.target.value)}
                      placeholder="Ej. Junta Directiva ARCCPCE / OPS"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:ring-2 focus:ring-[#002b7f] focus:bg-white outline-hidden transition-all"
                    />
                  </div>

                  {/* Enlace Oficial o Web */}
                  <div className="md:col-span-5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Enlace Web de Referencia (URL)
                    </label>
                    <input
                      type="text"
                      value={newsUrl}
                      onChange={(e) => setNewsUrl(e.target.value)}
                      placeholder="https://ejemplo.org/documento"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:ring-2 focus:ring-[#002b7f] focus:bg-white outline-hidden transition-all"
                    />
                  </div>

                  {/* Fecha */}
                  <div className="md:col-span-3">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Fecha de Publicación
                    </label>
                    <input
                      type="date"
                      value={newsDate}
                      onChange={(e) => setNewsDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:ring-2 focus:ring-[#002b7f] focus:bg-white outline-hidden transition-all"
                    />
                  </div>

                  {/* Subida Sencilla de Imagen */}
                  <div className="md:col-span-12 bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <span className="block text-xs font-bold uppercase tracking-wider text-slate-800">
                          Imagen o Afiche Ilustrativo
                        </span>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Seleccione una foto desde su computadora. Se optimizará y guardará automáticamente.
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <input
                          type="file"
                          accept="image/*"
                          ref={fileInputRef}
                          onChange={handleImageUpload}
                          className="hidden"
                          id="admin-image-upload"
                        />
                        <label
                          htmlFor="admin-image-upload"
                          className="inline-flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 rounded-xl text-xs font-bold shadow-xs cursor-pointer transition-colors"
                        >
                          <Upload className="w-3.5 h-3.5 text-[#002b7f]" />
                          <span>Elegir Imagen</span>
                        </label>

                        {newsImageUrl && (
                          <button
                            type="button"
                            onClick={() => {
                              setNewsImageUrl("");
                              if (fileInputRef.current) fileInputRef.current.value = "";
                            }}
                            className="inline-flex items-center gap-1 text-xs text-rose-600 hover:text-rose-800 font-semibold cursor-pointer"
                          >
                            <X className="w-3.5 h-3.5" />
                            <span>Quitar</span>
                          </button>
                        )}
                      </div>
                    </div>

                    {newsImageUrl && (
                      <div className="mt-3 flex items-center gap-3 pt-3 border-t border-slate-200">
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-slate-300 bg-white shrink-0">
                          <Image src={newsImageUrl} alt="Vista previa" fill className="object-contain" />
                        </div>
                        <div className="text-xs text-slate-600">
                          <span className="font-bold text-emerald-600 block flex items-center gap-1">
                            <CheckCircle className="w-3.5 h-3.5" /> Imagen cargada y lista
                          </span>
                          <span className="text-[11px] text-slate-500">Se mostrará en la tarjeta y en el visor ampliado.</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Publicación Destacada */}
                  <div className="md:col-span-12 flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="newsFeatured"
                      checked={newsFeatured}
                      onChange={(e) => setNewsFeatured(e.target.checked)}
                      className="w-4 h-4 text-[#002b7f] rounded-md border-slate-300 focus:ring-[#002b7f]"
                    />
                    <label htmlFor="newsFeatured" className="text-xs font-bold text-slate-800 cursor-pointer">
                      Destacar como tarjeta principal en la cabecera del Centro de Noticias
                    </label>
                  </div>
                </div>

                {/* Botón Guardar */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                  {isEditingNews && (
                    <button
                      type="button"
                      onClick={resetNewsForm}
                      className="px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      Cancelar
                    </button>
                  )}
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#002b7f] hover:bg-[#001d57] text-white text-xs sm:text-sm font-bold shadow-md transition-all cursor-pointer"
                  >
                    <Save className="w-4 h-4 text-sky-200" />
                    <span>{isEditingNews ? "Guardar Modificaciones" : "Publicar Noticia Ahora"}</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Listado de Noticias Existentes */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-100 flex items-center justify-between flex-wrap gap-2 bg-slate-50">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">
                    Publicaciones Activas ({news.length})
                  </h4>
                  <p className="text-xs text-slate-500">
                    Ordene, edite o elimine las noticias visibles en el sitio web oficial.
                  </p>
                </div>
                <span className="text-[11px] font-bold text-[#002b7f] bg-sky-100/70 px-3 py-1 rounded-full border border-sky-200">
                  Actualización en Vivo
                </span>
              </div>

              <div className="divide-y divide-slate-100">
                {news.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors"
                  >
                    <div className="flex items-start gap-3.5 flex-1 min-w-0">
                      {item.imageUrl ? (
                        <div className="relative w-14 h-14 rounded-lg overflow-hidden border border-slate-200 bg-slate-100 shrink-0">
                          <Image src={item.imageUrl} alt={item.title} fill className="object-contain" />
                        </div>
                      ) : (
                        <div className="w-14 h-14 rounded-lg bg-sky-50 border border-sky-100 flex items-center justify-center text-[#002b7f] shrink-0">
                          <Newspaper className="w-6 h-6 text-[#002b7f]" />
                        </div>
                      )}

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${
                            item.category === "facebook"
                              ? "bg-blue-50 text-[#1877f2] border-blue-200"
                              : item.category === "ops"
                              ? "bg-sky-50 text-[#002b7f] border-sky-200"
                              : item.category === "scielo"
                              ? "bg-amber-50 text-[#c49a45] border-amber-200"
                              : "bg-emerald-50 text-emerald-700 border-emerald-200"
                          }`}>
                            {item.category}
                          </span>
                          {item.featured && (
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-rose-50 text-[#ce1126] border border-rose-200">
                              Principal
                            </span>
                          )}
                          <span className="text-[11px] text-slate-500 flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-slate-400" /> {item.date}
                          </span>
                        </div>

                        <h5 className="font-bold text-slate-900 text-sm truncate mb-0.5">
                          {item.title}
                        </h5>
                        <p className="text-xs text-slate-600 line-clamp-1">
                          {item.summary}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                      <button
                        onClick={() => startEditNews(item)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                        title="Editar publicación"
                      >
                        <Edit2 className="w-3.5 h-3.5 text-amber-500" />
                        <span>Editar</span>
                      </button>

                      <button
                        onClick={() => handleDeleteNews(item.id, item.title)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold transition-colors cursor-pointer"
                        title="Eliminar publicación"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-[#ce1126]" />
                        <span>Eliminar</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==================== PESTAÑA 2: SECCIONES PRINCIPALES ==================== */}
        {activeTab === "sections" && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-7">
            <div className="pb-4 border-b border-slate-100 mb-6">
              <h3 className="text-lg font-bold text-slate-900 font-display flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#002b7f]" />
                <span>Textos de Identidad y Misión / Visión</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Edite los textos institucionales que se proyectan directamente en la página de inicio.
              </p>
            </div>

            <form onSubmit={handleSaveSections} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Visión */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#002b7f]">
                    Título de la Visión
                  </label>
                  <input
                    type="text"
                    value={editVisionTitle}
                    onChange={(e) => setEditVisionTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 text-sm focus:ring-2 focus:ring-[#002b7f] outline-hidden"
                  />

                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Descripción de la Visión
                  </label>
                  <textarea
                    rows={4}
                    value={editVisionDesc}
                    onChange={(e) => setEditVisionDesc(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 text-sm focus:ring-2 focus:ring-[#002b7f] outline-hidden"
                  />
                </div>

                {/* Misión */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#ce1126]">
                    Título de la Misión
                  </label>
                  <input
                    type="text"
                    value={editMissionTitle}
                    onChange={(e) => setEditMissionTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 text-sm focus:ring-2 focus:ring-[#002b7f] outline-hidden"
                  />

                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Descripción de la Misión
                  </label>
                  <textarea
                    rows={4}
                    value={editMissionDesc}
                    onChange={(e) => setEditMissionDesc(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 text-sm focus:ring-2 focus:ring-[#002b7f] outline-hidden"
                  />
                </div>

                {/* Datos de Contacto Directo */}
                <div className="md:col-span-2 p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                  <span className="block text-xs font-bold uppercase tracking-wider text-slate-800">
                    Canales de Contacto Oficiales
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">
                        Correo Electrónico Oficial
                      </label>
                      <input
                        type="email"
                        value={editContactEmail}
                        onChange={(e) => setEditContactEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 text-sm focus:ring-2 focus:ring-[#002b7f] outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">
                        Número de Teléfono / WhatsApp
                      </label>
                      <input
                        type="text"
                        value={editContactPhone}
                        onChange={(e) => setEditContactPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 text-sm focus:ring-2 focus:ring-[#002b7f] outline-hidden"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#002b7f] hover:bg-[#001d57] text-white text-xs sm:text-sm font-bold shadow-md transition-all cursor-pointer"
                >
                  <Save className="w-4 h-4 text-sky-200" />
                  <span>Guardar Textos de Secciones</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ==================== PESTAÑA 3: RESPALDOS Y SEGURIDAD ==================== */}
        {activeTab === "backup" && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-7 space-y-6">
            <div className="pb-4 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 font-display flex items-center gap-2">
                <Download className="w-5 h-5 text-[#002b7f]" />
                <span>Copias de Seguridad y Restauración</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Descargue un archivo de respaldo con todas sus noticias e imágenes, o restaure el portal a su estado predeterminado.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Exportar */}
              <div className="p-6 rounded-2xl bg-sky-50/60 border border-sky-100 space-y-3">
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <Download className="w-4 h-4 text-[#002b7f]" />
                  <span>Descargar Copia de Seguridad</span>
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Genera un archivo JSON con todos los artículos, textos y enlaces guardados en el CMS.
                </p>
                <button
                  onClick={() => {
                    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(exportBackupJson());
                    const downloadAnchor = document.createElement("a");
                    downloadAnchor.setAttribute("href", dataStr);
                    downloadAnchor.setAttribute("download", `arccpce_backup_${new Date().toISOString().split("T")[0]}.json`);
                    document.body.appendChild(downloadAnchor);
                    downloadAnchor.click();
                    downloadAnchor.remove();
                    showNotification("Copia de seguridad descargada exitosamente.");
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#002b7f] hover:bg-[#001d57] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4 text-sky-200" />
                  <span>Descargar Archivo JSON</span>
                </button>
              </div>

              {/* Restaurar valores originales */}
              <div className="p-6 rounded-2xl bg-rose-50/60 border border-rose-100 space-y-3">
                <h4 className="font-bold text-rose-900 text-sm flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-[#ce1126]" />
                  <span>Restaurar Valores Predeterminados</span>
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Reinicia las noticias y textos a su configuración original de fábrica.
                </p>
                <button
                  onClick={() => {
                    if (window.confirm("¿Está seguro de que desea restaurar los contenidos a los valores iniciales de fábrica?")) {
                      resetToDefaults();
                      showNotification("Valores predeterminados restaurados.");
                    }
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-rose-100 border border-rose-300 text-rose-800 text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4 text-[#ce1126]" />
                  <span>Restaurar Predeterminados</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

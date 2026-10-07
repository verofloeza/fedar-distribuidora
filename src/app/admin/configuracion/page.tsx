"use client";

import React, { useState, useEffect } from "react";
import {
  Phone,
  MessageSquare,
  Mail,
  MapPin,
  Clock,
  Truck,
  FileText,
  Save,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
  Link2,
  Eye,
  Building2,
  Share2,
  RotateCcw,
} from "lucide-react";
import { CompanyConfig, DEFAULT_COMPANY_CONFIG } from "@/types/company";
import { useCompanyConfig } from "@/context/CompanyContext";

export default function AdminConfiguracionPage() {
  const { refreshConfig } = useCompanyConfig();

  const [formData, setFormData] = useState<CompanyConfig>(DEFAULT_COMPANY_CONFIG);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Cargar configuración existente
  useEffect(() => {
    async function loadConfig() {
      try {
        const res = await fetch("/api/admin/config");
        const data = await res.json();
        if (data.success && data.config) {
          setFormData(data.config);
        }
      } catch (err) {
        console.error("Error al cargar configuración:", err);
      } finally {
        setLoading(false);
      }
    }
    loadConfig();
  }, []);

  const handleChange = (field: keyof CompanyConfig, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const res = await fetch("/api/admin/config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMsg(data.message || "Error al guardar los cambios.");
      } else {
        setSuccessMsg("¡Datos de la empresa y contacto actualizados con éxito!");
        setFormData(data.config);
        await refreshConfig();
        setTimeout(() => setSuccessMsg(""), 4000);
      }
    } catch (err: any) {
      setErrorMsg("Error de conexión al guardar los datos.");
    } finally {
      setSaving(false);
    }
  };

  const handleResetDefaults = () => {
    if (confirm("¿Deseas restaurar los valores por defecto del sistema?")) {
      setFormData(DEFAULT_COMPANY_CONFIG);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-[#12355B]" />
        <span className="text-sm font-semibold text-[#0F1B2D]">
          Cargando configuración de la empresa...
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 sm:gap-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#184677]/10 text-[#12355B] text-xs font-bold uppercase tracking-wider mb-2">
            <Building2 className="w-3.5 h-3.5 text-[#E0A93B]" />
            <span>Configuración General</span>
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#0F1B2D] uppercase tracking-tight">
            Datos de la Empresa y Contacto
          </h1>
          <p className="text-sm text-[#5A6472] mt-1">
            Modificá los teléfonos, WhatsApp, enlace de lista de precios, redes sociales y ubicación visibles en toda la web.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleResetDefaults}
            className="px-4 py-2.5 rounded-xl border border-[#DDD8CE] bg-white hover:bg-[#FAF9F6] text-[#5A6472] hover:text-[#0F1B2D] font-semibold text-xs sm:text-sm flex items-center gap-2 transition-colors cursor-pointer"
            title="Restaurar valores iniciales"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="hidden sm:inline">Restablecer</span>
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={saving}
            className="px-5 py-2.5 rounded-xl bg-[#12355B] hover:bg-[#0A1F36] text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-md cursor-pointer disabled:opacity-70"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Guardando...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4 text-[#E0A93B]" />
                <span>Guardar Cambios</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Alertas */}
      {successMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-sm text-emerald-800 flex items-center gap-3 shadow-xs animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span className="font-medium">{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-sm text-rose-800 flex items-center gap-3 shadow-xs animate-in fade-in">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          <span className="font-medium">{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* Columna Principal: Campos del formulario (8 columnas) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Bloque 1: Teléfonos & WhatsApp */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#DDD8CE] shadow-sm flex flex-col gap-5">
            <div className="flex items-center gap-3 pb-3 border-b border-[#F0ECE1]">
              <div className="w-9 h-9 rounded-xl bg-[#E0A93B]/20 text-[#8A5F12] flex items-center justify-center">
                <Phone className="w-4.5 h-4.5" />
              </div>
              <div>
                <h2 className="font-heading font-extrabold text-lg text-[#0F1B2D] uppercase">
                  Teléfonos de Contacto
                </h2>
                <p className="text-xs text-[#5A6472]">
                  Línea fija, fax y número oficial de WhatsApp.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Teléfono Fijo */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#0F1B2D]">
                  Teléfono Fijo / Fax (Visible)
                </label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  placeholder="Ej: (011) 4880-6934"
                  className="h-11 px-3.5 bg-[#FAF9F6] border border-[#CFC9BD] focus:border-[#12355B] focus:bg-white rounded-xl text-sm text-[#0F1B2D] outline-hidden transition-all"
                />
                <span className="text-[11px] text-[#8A96A5]">
                  Formato visible en TopBar, Footer y Contacto.
                </span>
              </div>

              {/* Teléfono Fijo Discado */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#0F1B2D]">
                  Discado Directo (Sólo números)
                </label>
                <input
                  type="text"
                  value={formData.phoneRaw}
                  onChange={(e) => handleChange("phoneRaw", e.target.value)}
                  placeholder="Ej: 01148806934"
                  className="h-11 px-3.5 bg-[#FAF9F6] border border-[#CFC9BD] focus:border-[#12355B] focus:bg-white rounded-xl text-sm text-[#0F1B2D] font-mono outline-hidden transition-all"
                />
                <span className="text-[11px] text-[#8A96A5]">
                  Utilizado para el enlace clickeable tel:
                </span>
              </div>

              {/* WhatsApp Visible */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#0F1B2D]">
                  WhatsApp (Visible)
                </label>
                <input
                  type="text"
                  value={formData.whatsapp}
                  onChange={(e) => handleChange("whatsapp", e.target.value)}
                  placeholder="Ej: 11 2874-3375"
                  className="h-11 px-3.5 bg-[#FAF9F6] border border-[#CFC9BD] focus:border-[#12355B] focus:bg-white rounded-xl text-sm text-[#0F1B2D] outline-hidden transition-all"
                />
                <span className="text-[11px] text-[#8A96A5]">
                  Número con espacios para fácil lectura.
                </span>
              </div>

              {/* WhatsApp Internacional */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#0F1B2D]">
                  WhatsApp Internacional (Sin +, ej: 54911...)
                </label>
                <input
                  type="text"
                  value={formData.whatsappNumber}
                  onChange={(e) => handleChange("whatsappNumber", e.target.value)}
                  placeholder="Ej: 5491128743375"
                  className="h-11 px-3.5 bg-[#FAF9F6] border border-[#CFC9BD] focus:border-[#12355B] focus:bg-white rounded-xl text-sm text-[#0F1B2D] font-mono outline-hidden transition-all"
                />
                <span className="text-[11px] text-[#8A96A5]">
                  Código de país y área para generar el link wa.me
                </span>
              </div>
            </div>

            {/* Mensaje Predeterminado WhatsApp */}
            <div className="flex flex-col gap-1.5 pt-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#0F1B2D]">
                Mensaje Predeterminado de WhatsApp
              </label>
              <textarea
                rows={2}
                value={formData.whatsappMessage}
                onChange={(e) => handleChange("whatsappMessage", e.target.value)}
                placeholder="Hola FEDAR! Quisiera consultar por la lista de precios y el sistema de gaveteros."
                className="p-3 bg-[#FAF9F6] border border-[#CFC9BD] focus:border-[#12355B] focus:bg-white rounded-xl text-sm text-[#0F1B2D] outline-hidden transition-all resize-none"
              />
              <span className="text-[11px] text-[#8A96A5]">
                Texto que aparecerá escrito cuando el cliente presione el botón flotante de WhatsApp.
              </span>
            </div>
          </div>

          {/* Bloque 2: Lista de Precios */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#DDD8CE] shadow-sm flex flex-col gap-5">
            <div className="flex items-center gap-3 pb-3 border-b border-[#F0ECE1]">
              <div className="w-9 h-9 rounded-xl bg-[#12355B]/10 text-[#12355B] flex items-center justify-center">
                <FileText className="w-4.5 h-4.5" />
              </div>
              <div>
                <h2 className="font-heading font-extrabold text-lg text-[#0F1B2D] uppercase">
                  Link de Lista de Precios
                </h2>
                <p className="text-xs text-[#5A6472]">
                  Enlace directo a archivo descargable (PDF, Excel, Google Drive, Dropbox, etc.).
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#0F1B2D]">
                URL / Link de la Lista de Precios
              </label>
              <div className="relative flex items-center">
                <input
                  type="url"
                  value={formData.priceListUrl}
                  onChange={(e) => handleChange("priceListUrl", e.target.value)}
                  placeholder="https://drive.google.com/... o https://tu-sitio.com/lista.pdf"
                  className="w-full h-11 pl-9 pr-3 bg-[#FAF9F6] border border-[#CFC9BD] focus:border-[#12355B] focus:bg-white rounded-xl text-sm text-[#0F1B2D] outline-hidden transition-all"
                />
                <Link2 className="w-4 h-4 text-[#8A96A5] absolute left-3 pointer-events-none" />
              </div>
              <span className="text-[11px] text-[#8A96A5]">
                Si completás este campo, el botón de &quot;Descargar Lista&quot; redirigirá directamente a este enlace. Si se deja vacío, el sistema generará el archivo dinámico con las categorías vigentes.
              </span>
            </div>
          </div>

          {/* Bloque 3: Datos del Local & Empresa */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#DDD8CE] shadow-sm flex flex-col gap-5">
            <div className="flex items-center gap-3 pb-3 border-b border-[#F0ECE1]">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <Building2 className="w-4.5 h-4.5" />
              </div>
              <div>
                <h2 className="font-heading font-extrabold text-lg text-[#0F1B2D] uppercase">
                  Datos del Local & Empresa
                </h2>
                <p className="text-xs text-[#5A6472]">
                  Email de ventas, dirección del depósito/local, horarios y políticas de despacho.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#0F1B2D]">
                  Correo Electrónico Oficial
                </label>
                <div className="relative flex items-center">
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    placeholder="ventas@fedardistribuidora.com.ar"
                    className="w-full h-11 pl-9 pr-3 bg-[#FAF9F6] border border-[#CFC9BD] focus:border-[#12355B] focus:bg-white rounded-xl text-sm text-[#0F1B2D] outline-hidden transition-all"
                  />
                  <Mail className="w-4 h-4 text-[#8A96A5] absolute left-3 pointer-events-none" />
                </div>
              </div>

              {/* Dirección */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#0F1B2D]">
                  Dirección / Localidad
                </label>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => handleChange("address", e.target.value)}
                    placeholder="Buenos Aires, Argentina"
                    className="w-full h-11 pl-9 pr-3 bg-[#FAF9F6] border border-[#CFC9BD] focus:border-[#12355B] focus:bg-white rounded-xl text-sm text-[#0F1B2D] outline-hidden transition-all"
                  />
                  <MapPin className="w-4 h-4 text-[#8A96A5] absolute left-3 pointer-events-none" />
                </div>
              </div>

              {/* Horario de Atención */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#0F1B2D]">
                  Horario de Atención
                </label>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={formData.hours}
                    onChange={(e) => handleChange("hours", e.target.value)}
                    placeholder="Lunes a Viernes de 8:00 a 18:00 hs"
                    className="w-full h-11 pl-9 pr-3 bg-[#FAF9F6] border border-[#CFC9BD] focus:border-[#12355B] focus:bg-white rounded-xl text-sm text-[#0F1B2D] outline-hidden transition-all"
                  />
                  <Clock className="w-4 h-4 text-[#8A96A5] absolute left-3 pointer-events-none" />
                </div>
              </div>

              {/* Envíos / Despachos */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#0F1B2D]">
                  Leyenda de Envíos
                </label>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={formData.shipping}
                    onChange={(e) => handleChange("shipping", e.target.value)}
                    placeholder="Envíos a todo el país por el transporte de tu elección"
                    className="w-full h-11 pl-9 pr-3 bg-[#FAF9F6] border border-[#CFC9BD] focus:border-[#12355B] focus:bg-white rounded-xl text-sm text-[#0F1B2D] outline-hidden transition-all"
                  />
                  <Truck className="w-4 h-4 text-[#8A96A5] absolute left-3 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Slogan */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#0F1B2D]">
                Slogan / Bajada de Marca (Footer)
              </label>
              <input
                type="text"
                value={formData.slogan}
                onChange={(e) => handleChange("slogan", e.target.value)}
                placeholder="Accesorios para ferreterías, buloneras y repuesteros"
                className="h-11 px-3.5 bg-[#FAF9F6] border border-[#CFC9BD] focus:border-[#12355B] focus:bg-white rounded-xl text-sm text-[#0F1B2D] outline-hidden transition-all"
              />
            </div>
          </div>

          {/* Bloque 4: Redes Sociales */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#DDD8CE] shadow-sm flex flex-col gap-5">
            <div className="flex items-center gap-3 pb-3 border-b border-[#F0ECE1]">
              <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center">
                <Share2 className="w-4.5 h-4.5" />
              </div>
              <div>
                <h2 className="font-heading font-extrabold text-lg text-[#0F1B2D] uppercase">
                  Redes Sociales
                </h2>
                <p className="text-xs text-[#5A6472]">
                  Enlaces oficiales a los perfiles de la distribuidora.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {/* Instagram */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#0F1B2D] flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#C1356B]"></span>
                  <span>Instagram URL</span>
                </label>
                <input
                  type="url"
                  value={formData.instagramUrl}
                  onChange={(e) => handleChange("instagramUrl", e.target.value)}
                  placeholder="https://instagram.com/fedardistribuidora"
                  className="h-11 px-3.5 bg-[#FAF9F6] border border-[#CFC9BD] focus:border-[#12355B] focus:bg-white rounded-xl text-sm text-[#0F1B2D] outline-hidden transition-all"
                />
              </div>

              {/* Facebook */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#0F1B2D] flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#1877F2]"></span>
                  <span>Facebook URL</span>
                </label>
                <input
                  type="url"
                  value={formData.facebookUrl}
                  onChange={(e) => handleChange("facebookUrl", e.target.value)}
                  placeholder="https://facebook.com/fedardistribuidora"
                  className="h-11 px-3.5 bg-[#FAF9F6] border border-[#CFC9BD] focus:border-[#12355B] focus:bg-white rounded-xl text-sm text-[#0F1B2D] outline-hidden transition-all"
                />
              </div>

              {/* YouTube */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#0F1B2D] flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF0000]"></span>
                  <span>YouTube URL</span>
                </label>
                <input
                  type="url"
                  value={formData.youtubeUrl}
                  onChange={(e) => handleChange("youtubeUrl", e.target.value)}
                  placeholder="https://youtube.com/@fedardistribuidora"
                  className="h-11 px-3.5 bg-[#FAF9F6] border border-[#CFC9BD] focus:border-[#12355B] focus:bg-white rounded-xl text-sm text-[#0F1B2D] outline-hidden transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Columna Lateral: Vista Previa en Vivo (4 columnas) */}
        <div className="lg:col-span-4 flex flex-col gap-6 sticky top-6">
          <div className="bg-[#0F1B2D] text-white rounded-3xl p-6 border border-[#25364C] shadow-xl flex flex-col gap-5">
            <div className="flex items-center justify-between border-b border-[#25364C] pb-3">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-[#E0A93B]" />
                <span className="font-heading font-extrabold text-xs uppercase tracking-wider text-[#A5BCD4]">
                  Vista Previa en Vivo
                </span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#E0A93B]/20 text-[#E0A93B] text-[10px] font-bold uppercase">
                Atención Comercial
              </span>
            </div>

            <div className="flex flex-col gap-3.5 text-sm">
              {/* Teléfono */}
              <div className="flex items-center gap-3 text-[#C9D6E3]">
                <div className="w-8 h-8 rounded-lg bg-[#E0A93B]/20 text-[#E0A93B] flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] uppercase text-[#8A96A5] font-semibold">Tel/Fax</div>
                  <div className="font-bold text-white text-sm">{formData.phone || "Sin definir"}</div>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-center gap-3 text-[#C9D6E3]">
                <div className="w-8 h-8 rounded-lg bg-[#25D366]/20 text-[#25D366] flex items-center justify-center shrink-0">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] uppercase text-[#8A96A5] font-semibold">WhatsApp</div>
                  <div className="font-bold text-white text-sm">{formData.whatsapp || "Sin definir"}</div>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-3 text-[#C9D6E3]">
                <div className="w-8 h-8 rounded-lg bg-white/10 text-white flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] uppercase text-[#8A96A5] font-semibold">Correo</div>
                  <div className="font-bold text-white text-xs truncate max-w-[200px]">
                    {formData.email || "Sin definir"}
                  </div>
                </div>
              </div>

              {/* Dirección */}
              <div className="flex items-center gap-3 text-[#C9D6E3]">
                <div className="w-8 h-8 rounded-lg bg-[#E0A93B]/20 text-[#E0A93B] flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] uppercase text-[#8A96A5] font-semibold">Ubicación</div>
                  <div className="font-semibold text-white text-xs">
                    {formData.address || "Buenos Aires, Argentina"}
                  </div>
                </div>
              </div>

              {/* Horarios */}
              <div className="flex items-center gap-3 text-[#C9D6E3]">
                <div className="w-8 h-8 rounded-lg bg-white/10 text-white flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] uppercase text-[#8A96A5] font-semibold">Horario</div>
                  <div className="text-xs text-[#C9D6E3]">{formData.hours || "Sin definir"}</div>
                </div>
              </div>
            </div>

            {/* Redes Sociales Preview */}
            <div className="pt-3 border-t border-[#25364C] flex items-center justify-between">
              <span className="text-xs text-[#8A96A5] font-semibold">Redes Activas:</span>
              <div className="flex items-center gap-2">
                {formData.instagramUrl && (
                  <span className="w-7 h-7 rounded-full bg-[#C1356B] flex items-center justify-center text-[10px] font-bold">
                    IG
                  </span>
                )}
                {formData.facebookUrl && (
                  <span className="w-7 h-7 rounded-full bg-[#1877F2] flex items-center justify-center text-[10px] font-bold">
                    FB
                  </span>
                )}
                {formData.youtubeUrl && (
                  <span className="w-7 h-7 rounded-full bg-[#FF0000] flex items-center justify-center text-[10px] font-bold">
                    YT
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-900 flex items-start gap-2.5 leading-relaxed">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>
              Los cambios que guardes aquí se aplican inmediatamente en el encabezado, pie de página, botones de WhatsApp flotantes y páginas de contacto y lista de precios.
            </span>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full h-12 rounded-xl bg-[#12355B] hover:bg-[#0A1F36] text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer disabled:opacity-70"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Guardando cambios...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4 text-[#E0A93B]" />
                <span>Guardar Configuración</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

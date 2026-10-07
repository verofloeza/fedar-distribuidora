"use client";

import React from "react";
import Link from "next/link";
import { Phone, MessageSquare, Truck, FileText, UserCheck } from "lucide-react";
import { useCompanyConfig } from "@/context/CompanyContext";
import { useModals } from "@/context/ModalContext";

interface TopBarProps {
  onOpenPriceListModal?: () => void;
  onOpenLoginModal?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  onOpenPriceListModal,
  onOpenLoginModal,
}) => {
  const modals = useModals();
  const { config } = useCompanyConfig();

  const handleOpenPriceList = onOpenPriceListModal || modals.openPriceListModal;
  const handleOpenLogin = onOpenLoginModal || modals.openLoginModal;

  return (
    <div className="bg-[#0A1F36] text-[#C9D6E3] text-[13px] sm:text-[14px] border-b border-[#142C4B] select-none">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-20 h-11 flex items-center justify-between">
        {/* Info Contacto & Envíos */}
        <div className="flex items-center gap-3 sm:gap-6 flex-wrap overflow-hidden py-1">
          <a
            href={`tel:${config.phoneRaw}`}
            className="flex items-center gap-1.5 hover:text-white transition-colors whitespace-nowrap"
          >
            <Phone className="w-3.5 h-3.5 text-[#E0A93B]" />
            <span>Tel/Fax {config.phone}</span>
          </a>

          <span className="hidden sm:inline text-[#3B5474]">|</span>

          <a
            href={config.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-white transition-colors whitespace-nowrap"
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
            <span>WhatsApp {config.whatsapp}</span>
          </a>

          <span className="hidden md:inline text-[#3B5474]">|</span>

          <div className="hidden md:flex items-center gap-1.5 text-[#9CB3CC] whitespace-nowrap">
            <Truck className="w-3.5 h-3.5 text-[#E0A93B]" />
            <span>Envíos a todo el país</span>
          </div>
        </div>

        {/* Acciones Rápidas */}
        <div className="flex items-center gap-4 sm:gap-7 shrink-0">
          {config.priceListUrl ? (
            <a
              href={config.priceListUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-white hover:text-[#E0A93B] font-medium transition-colors cursor-pointer text-xs sm:text-[14px]"
            >
              <FileText className="w-3.5 h-3.5 text-[#E0A93B]" />
              <span>Lista de precios</span>
            </a>
          ) : (
            <Link
              href="/lista-de-precios"
              className="flex items-center gap-1 text-white hover:text-[#E0A93B] font-medium transition-colors cursor-pointer text-xs sm:text-[14px]"
            >
              <FileText className="w-3.5 h-3.5 text-[#E0A93B]" />
              <span>Lista de precios</span>
            </Link>
          )}

          <button
            onClick={handleOpenLogin}
            className="flex items-center gap-1 text-white hover:text-[#E0A93B] font-medium transition-colors cursor-pointer text-xs sm:text-[14px]"
          >
            <UserCheck className="w-3.5 h-3.5 text-[#E0A93B]" />
            <span>Ingresar</span>
          </button>
        </div>
      </div>
    </div>
  );
};

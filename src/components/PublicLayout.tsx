"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { TopBar } from "@/components/TopBar";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";

export const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <main className="flex-1">{children}</main>;
  }

  return (
    <>
      {/* 1. Barra superior de contacto */}
      <TopBar />

      {/* 2. Barra de Navegación Principal */}
      <Navbar />

      {/* 3. Contenido Principal */}
      <main className="flex-1">
        {children}
      </main>

      {/* 4. Footer General */}
      <Footer />

      {/* 5. Botón Flotante de WhatsApp */}
      <WhatsAppFloat />
    </>
  );
};

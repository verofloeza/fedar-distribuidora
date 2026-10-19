"use client";

import React from "react";
import { PackageCheck, Users, FileSpreadsheet, Truck } from "lucide-react";

export const FeaturesBar: React.FC = () => {
  const features = [
    {
      icon: PackageCheck,
      title: "Stock permanente y fácil reposición",
      description: "Artículos y medidas siempre disponibles para entrega inmediata.",
    },
    {
      icon: Users,
      title: "Atención personalizada",
      description: "Visita periodica del corredor en CABA Y GBA, y asesoramiento de nuestro dpto. de ventas vía telefónica o WhatsApp.",
    },
    {
      icon: FileSpreadsheet,
      title: "Lista de precios",
      description: "Siempre actualizada para que puedas consultarla o descargarla.",
    },
    {
      icon: Truck,
      title: "Envíos a todo el país",
      description: "Hacemos envíos a todo el país por el transporte que nos designes.",
    },
  ];

  return (
    <section className="bg-white border-b border-[#DDD8CE]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#E7E2D8]">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="py-7 sm:py-8 px-4 sm:px-6 lg:px-8 first:pl-0 last:pr-0 flex items-start gap-4 group"
              >
                <div className="w-11 h-11 rounded-xl bg-[#F4EFE6] group-hover:bg-[#12355B] text-[#12355B] group-hover:text-[#E0A93B] flex items-center justify-center shrink-0 transition-all duration-300">
                  <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                </div>
                <div className="flex flex-col gap-1">
                  <h2 className="font-semibold text-[16px] sm:text-[17px] text-[#0F1B2D]">
                    {item.title}
                  </h2>
                  <p className="text-[13px] sm:text-[14px] text-[#5A6472] leading-[1.45]">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

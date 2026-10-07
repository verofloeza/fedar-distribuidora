import { COMPANY_DATA } from "@/data/products";

export interface CompanyConfig {
  name: string;
  fullName: string;
  slogan: string;
  phone: string;
  phoneRaw: string;
  whatsapp: string;
  whatsappNumber: string;
  whatsappMessage: string;
  whatsappUrl: string;
  email: string;
  address: string;
  shipping: string;
  priceListUrl: string;
  facebookUrl: string;
  instagramUrl: string;
  youtubeUrl: string;
  hours: string;
}

export const DEFAULT_COMPANY_CONFIG: CompanyConfig = {
  name: COMPANY_DATA.name || "FEDAR",
  fullName: COMPANY_DATA.fullName || "FEDAR Distribuidora Mayorista",
  slogan: COMPANY_DATA.slogan || "Accesorios para ferreterías, buloneras y repuesteros",
  phone: COMPANY_DATA.phone || "(011) 4880-6934",
  phoneRaw: COMPANY_DATA.phoneRaw || "01148806934",
  whatsapp: COMPANY_DATA.whatsapp || "11 2874-3375",
  whatsappNumber: COMPANY_DATA.whatsappNumber || "5491128743375",
  whatsappMessage:
    COMPANY_DATA.whatsappMessage ||
    "Hola FEDAR! Quisiera consultar por la lista de precios y el sistema de gaveteros.",
  whatsappUrl: COMPANY_DATA.whatsappUrl || "",
  email: COMPANY_DATA.email || "ventas@fedardistribuidora.com.ar",
  address: COMPANY_DATA.address || "Buenos Aires, Argentina",
  shipping: COMPANY_DATA.shipping || "Envíos a todo el país por el transporte de tu elección",
  priceListUrl: "",
  facebookUrl: COMPANY_DATA.facebookUrl || "https://facebook.com",
  instagramUrl: COMPANY_DATA.instagramUrl || "https://instagram.com",
  youtubeUrl: COMPANY_DATA.youtubeUrl || "https://youtube.com",
  hours: COMPANY_DATA.hours || "Lunes a Viernes de 8:00 a 18:00 hs",
};

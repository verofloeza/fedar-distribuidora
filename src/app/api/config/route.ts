import { NextResponse } from "next/server";
import { getCompanyConfig } from "@/lib/companyConfig";

// GET: Obtener configuración pública de la empresa
export async function GET() {
  try {
    const config = await getCompanyConfig();
    return NextResponse.json({
      success: true,
      config,
    });
  } catch (error: any) {
    console.error("Error al obtener configuración pública:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error al obtener configuración.",
        error: error?.message,
      },
      { status: 500 }
    );
  }
}

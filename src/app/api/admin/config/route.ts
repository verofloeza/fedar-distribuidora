import { NextRequest, NextResponse } from "next/server";
import { getCompanyConfig, saveCompanyConfig } from "@/lib/companyConfig";

// GET: Obtener configuración para el panel admin
export async function GET() {
  try {
    const config = await getCompanyConfig();
    return NextResponse.json({
      success: true,
      config,
    });
  } catch (error: any) {
    console.error("Error al obtener configuración admin:", error);
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

// PUT / POST: Guardar configuración desde el panel admin
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const updatedConfig = await saveCompanyConfig(body);

    return NextResponse.json({
      success: true,
      message: "Configuración guardada correctamente.",
      config: updatedConfig,
    });
  } catch (error: any) {
    console.error("Error al guardar configuración:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error al guardar la configuración.",
        error: error?.message,
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  return PUT(req);
}

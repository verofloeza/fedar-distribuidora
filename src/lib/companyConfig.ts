import { query } from "@/lib/db";
import { CompanyConfig, DEFAULT_COMPANY_CONFIG } from "@/types/company";

export type { CompanyConfig };
export { DEFAULT_COMPANY_CONFIG };

/**
 * Asegura que la tabla de configuración exista en la base de datos
 */
async function ensureConfigTable(): Promise<void> {
  try {
    await query(`
      CREATE TABLE IF NOT EXISTS CONFIGURACION (
        CF_CLAVE VARCHAR(100) NOT NULL PRIMARY KEY,
        CF_VALOR TEXT,
        CF_ACTUALIZADO TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);
  } catch (error) {
    console.warn("No se pudo verificar o crear la tabla CONFIGURACION:", error);
  }
}

/**
 * Obtiene toda la configuración de la empresa combinando la DB con los valores por defecto
 */
export async function getCompanyConfig(): Promise<CompanyConfig> {
  await ensureConfigTable();

  const config: CompanyConfig = { ...DEFAULT_COMPANY_CONFIG };

  try {
    const rows = await query<{ CF_CLAVE: string; CF_VALOR: string }>(
      "SELECT CF_CLAVE, CF_VALOR FROM CONFIGURACION"
    );

    if (rows && rows.length > 0) {
      for (const row of rows) {
        if (row.CF_CLAVE in config) {
          (config as any)[row.CF_CLAVE] = row.CF_VALOR ?? "";
        }
      }
    }
  } catch (error) {
    console.error("Error al leer configuración de base de datos:", error);
  }

  // Generar campos derivados si faltan o si cambiaron
  if (!config.phoneRaw && config.phone) {
    config.phoneRaw = config.phone.replace(/\D/g, "");
  }

  if (!config.whatsappNumber && config.whatsapp) {
    const cleanNum = config.whatsapp.replace(/\D/g, "");
    config.whatsappNumber = cleanNum.startsWith("54") ? cleanNum : `549${cleanNum}`;
  }

  const encodedMsg = encodeURIComponent(
    config.whatsappMessage || "Hola FEDAR! Quisiera consultar por la lista de precios."
  );
  config.whatsappUrl = `https://wa.me/${config.whatsappNumber || "5491128743375"}?text=${encodedMsg}`;

  return config;
}

/**
 * Actualiza uno o más valores de configuración en la DB
 */
export async function saveCompanyConfig(
  newValues: Partial<CompanyConfig>
): Promise<CompanyConfig> {
  await ensureConfigTable();

  for (const [key, value] of Object.entries(newValues)) {
    if (value !== undefined && key !== "whatsappUrl") {
      await query(
        `INSERT INTO CONFIGURACION (CF_CLAVE, CF_VALOR) 
         VALUES (?, ?) 
         ON DUPLICATE KEY UPDATE CF_VALOR = VALUES(CF_VALOR)`,
        [key, String(value)]
      );
    }
  }

  return getCompanyConfig();
}

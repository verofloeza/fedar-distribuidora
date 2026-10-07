"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { CompanyConfig, DEFAULT_COMPANY_CONFIG } from "@/types/company";

interface CompanyContextType {
  config: CompanyConfig;
  loading: boolean;
  refreshConfig: () => Promise<void>;
}

const CompanyContext = createContext<CompanyContextType>({
  config: DEFAULT_COMPANY_CONFIG,
  loading: false,
  refreshConfig: async () => {},
});

export const CompanyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<CompanyConfig>(DEFAULT_COMPANY_CONFIG);
  const [loading, setLoading] = useState(true);

  const fetchConfig = async () => {
    try {
      const res = await fetch("/api/config", { cache: "no-store" });
      const data = await res.json();
      if (data.success && data.config) {
        setConfig(data.config);
      }
    } catch (err) {
      console.error("Error al cargar la información de la empresa:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConfig();
  }, []);

  return (
    <CompanyContext.Provider value={{ config, loading, refreshConfig: fetchConfig }}>
      {children}
    </CompanyContext.Provider>
  );
};

export const useCompanyConfig = (): CompanyContextType => {
  return useContext(CompanyContext);
};

"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Currency = "GBP" | "USD" | "EUR";

interface CurrencyConfig {
  code: Currency;
  symbol: string;
  label: string;
}

const currencies: Record<Currency, CurrencyConfig> = {
  GBP: { code: "GBP", symbol: "£", label: "United Kingdom" },
  USD: { code: "USD", symbol: "$", label: "United States" },
  EUR: { code: "EUR", symbol: "€", label: "Europe" },
};

interface CurrencyContextType {
  currency: Currency;
  currencyConfig: CurrencyConfig;
  setCurrency: (currency: Currency) => void;
  formatPrice: (price: number) => string;
  currencies: typeof currencies;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<Currency>("GBP");

  const currencyConfig = currencies[currency];

  const formatPrice = (price: number): string => {
    return `${currencyConfig.symbol}${price.toFixed(2)}`;
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        currencyConfig,
        setCurrency,
        formatPrice,
        currencies,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
}

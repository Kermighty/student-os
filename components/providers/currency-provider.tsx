"use client";

import { createContext, useContext, useMemo, useState } from "react";

import { DEFAULT_CURRENCY, resolveCurrencyCode, type CurrencyCode } from "@/lib/currency";

type CurrencyContextValue = {
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode | string) => void;
};

const CurrencyContext = createContext<CurrencyContextValue>({
  currency: DEFAULT_CURRENCY,
  setCurrency: () => {},
});

export function CurrencyProvider({ initialCurrency, children }: { initialCurrency: CurrencyCode | string; children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>(() => resolveCurrencyCode(initialCurrency));

  const value = useMemo<CurrencyContextValue>(
    () => ({ currency, setCurrency: (next) => setCurrencyState(resolveCurrencyCode(next)) }),
    [currency],
  );

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useCurrency() {
  return useContext(CurrencyContext);
}

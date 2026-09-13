"use client";

import { useCallback } from "react";

import { useCurrency } from "@/components/providers/currency-provider";
import { formatCurrency } from "@/lib/currency";

/**
 * Returns a formatter bound to the signed-in user's preferred currency so money
 * re-renders instantly when the preference changes in Settings.
 */
export function useCurrencyFormatter() {
  const { currency } = useCurrency();
  return useCallback((value: number | string) => formatCurrency(value, currency), [currency]);
}

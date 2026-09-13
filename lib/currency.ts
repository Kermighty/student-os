export const SUPPORTED_CURRENCIES = [
  { code: "PHP", label: "Philippine Peso", symbol: "₱", locale: "en-PH", fractionDigits: 2 },
  { code: "USD", label: "US Dollar", symbol: "$", locale: "en-US", fractionDigits: 2 },
  { code: "EUR", label: "Euro", symbol: "€", locale: "de-DE", fractionDigits: 2 },
  { code: "JPY", label: "Japanese Yen", symbol: "¥", locale: "ja-JP", fractionDigits: 0 },
] as const;

export type CurrencyCode = (typeof SUPPORTED_CURRENCIES)[number]["code"];

export const DEFAULT_CURRENCY: CurrencyCode = "PHP";

export function isCurrencyCode(value: unknown): value is CurrencyCode {
  return typeof value === "string" && SUPPORTED_CURRENCIES.some((currency) => currency.code === value);
}

export function resolveCurrencyCode(value: unknown): CurrencyCode {
  return isCurrencyCode(value) ? value : DEFAULT_CURRENCY;
}

export function formatCurrency(value: number | string, currency: CurrencyCode | string = DEFAULT_CURRENCY) {
  const resolved = resolveCurrencyCode(currency);
  const definition = SUPPORTED_CURRENCIES.find((item) => item.code === resolved) ?? SUPPORTED_CURRENCIES[0];

  return new Intl.NumberFormat(definition.locale, {
    style: "currency",
    currency: definition.code,
    minimumFractionDigits: definition.fractionDigits,
    maximumFractionDigits: definition.fractionDigits,
  }).format(Number(value));
}

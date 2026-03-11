const formatterCache = new Map<string, Intl.NumberFormat>();
const currencySymbolCache = new Map<string, string>();

const getFormatter = (locale: string, currency: string) => {
  const cacheKey = `${locale}-${currency}`;
  let formatter = formatterCache.get(cacheKey);
  if (!formatter) {
    formatter = new Intl.NumberFormat(locale, { style: "currency", currency });
    formatterCache.set(cacheKey, formatter);
  }
  return formatter;
};

const getCurrencySymbol = (locale: string, currency: string) => {
  const cacheKey = `${locale}-${currency}`;
  let symbol = currencySymbolCache.get(cacheKey);
  if (!symbol) {
    const parts = getFormatter(locale, currency).formatToParts(0);
    symbol = parts.find((part) => part.type === "currency")?.value ?? currency;
    currencySymbolCache.set(cacheKey, symbol);
  }
  return symbol;
};

const shrinkValue = (value: number, divisor: number, precision: number) =>
  (value / divisor).toFixed(precision).replace(/\.0$/, "");

// basic formatter
export const formatCurrency = (
  value: number,
  currency: string = "VND",
  locale: string = "vi-VN",
): string => getFormatter(locale, currency).format(value);

// advanced formattter
export function fCurrencyShorten(
  value: number,
  currency: string = "VND",
  locale: string = "vi-VN",
): string {
  const symbol = getCurrencySymbol(locale, currency);
  if (!value) return `0 ${symbol}`;
  const abs = Math.abs(value);

  if (abs >= 1e9)
    return `${shrinkValue(value, 1e9, abs >= 1e10 ? 0 : 1)} tỷ ${symbol}`;
  if (abs >= 1e6)
    return `${shrinkValue(value, 1e6, abs >= 1e7 ? 0 : 1)}tr ${symbol}`;

  return getFormatter(locale, currency).format(value);
}

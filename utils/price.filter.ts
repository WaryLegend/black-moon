// Price-filter logic
interface PriceItem {
  basePrice?: number;
}
export function priceFiltering<T extends PriceItem>(
  items: T[],
  priceFilterValue?: string,
): T[] {
  if (!priceFilterValue || priceFilterValue === "all") return items;

  const price = (p: PriceItem) => p.basePrice ?? 0;

  if (priceFilterValue.startsWith("under-")) {
    const max = Number(priceFilterValue.replace("under-", ""));
    return isNaN(max) ? items : items.filter((p) => price(p) < max);
  }

  if (priceFilterValue.startsWith("above-")) {
    const min = Number(priceFilterValue.replace("above-", ""));
    return isNaN(min) ? items : items.filter((p) => price(p) > min);
  }

  const [minStr, maxStr] = priceFilterValue.split("-");
  const min = Number(minStr);
  const max = Number(maxStr);

  if (!isNaN(min) && !isNaN(max)) {
    return items.filter((p) => price(p) >= min && price(p) <= max);
  }

  return items;
}

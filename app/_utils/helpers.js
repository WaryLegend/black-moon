import { colord, extend } from "colord";
import mixPlugin from "colord/plugins/mix";
import namesPlugin from "colord/plugins/names";
import a11yPlugin from "colord/plugins/a11y";
extend([mixPlugin, namesPlugin, a11yPlugin]);

// set first letter to captital
export function capitalizeFirst(str) {
  if (!str) return "";

  // Step 1: detect all-uppercase (ignoring non-letters)
  const isAllUpper = /^[^a-z]*[A-Z][^a-z]*$/.test(str);
  if (isAllUpper) {
    str = str.toLowerCase();
  }

  // Step 2: capitalize sentences + words
  return str
    .toLowerCase()
    .replace(/(^\s*[a-z])|([.!?]\s*[a-z])/g, (match) => match.toUpperCase())
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export const formatCurrency = (value) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
    value,
  );

export function getQuantityTextColor(value) {
  const TEXT_COLORS = {
    LOW: "#FF0000", // Red
    MEDIUM: "#DAA520", // Yellow
    GOOD: "#008000", // Green
    NEUTRAL: "#808080",
  };

  const THRESHOLDS = {
    LOW: 9,
    MEDIUM: 25,
  };

  if (!Number.isFinite(value) || value <= 0) return TEXT_COLORS.NEUTRAL; // Default to red for invalid input

  if (value <= THRESHOLDS.LOW) return TEXT_COLORS.LOW;
  if (value <= THRESHOLDS.MEDIUM) return TEXT_COLORS.MEDIUM;
  return TEXT_COLORS.GOOD;
}

export function getTextColor(name) {
  const base = colord(name);
  if (!base.isValid()) {
    return {
      color: "",
      backgroundColor: "",
      style: { color: "", backgroundColor: "" },
    };
  }
  // Special case: WHITE
  if (base.isEqual(colord("#fff"))) {
    return {
      color: "#fff",
      backgroundColor: "#e8e8e8",
      style: { color: "#fff", backgroundColor: "#e8e8e8" },
    };
  }
  // Special case: BLACK
  if (base.isEqual(colord("#000000"))) {
    return {
      color: "#000",
      backgroundColor: "#979797",
      style: { color: "#000", backgroundColor: "#979797" },
    };
  }
  // Normal colors logic
  const bg = base
    .mix("#ffffff", 0.75) // 75% white → pastel, not washed
    .desaturate(0.05); // keep identity, but softer

  return {
    color: base.toHex(),
    backgroundColor: bg.toHex(),
    style: { color: base.toHex(), backgroundColor: bg.toHex() },
  };
}

// Sorting logic
export function sortData(data, field, direction = "asc", locale = "vi") {
  // Defensive – no sort requested → return
  if (!field) return [...data];

  return [...data].sort((a, b) => {
    let aVal = a[field];
    let bVal = b[field];
    // special handling per field (add more as needed) ----
    // === 1. NUMERIC FIELDS ===
    if (typeof aVal === "number" && typeof bVal === "number") {
      aVal = Number(aVal);
      bVal = Number(bVal);
    }
    // === 2. DATE FIELDS ===
    else if (field === "createdDate") {
      aVal = new Date(aVal).getTime();
      bVal = new Date(bVal).getTime();
    }
    // === 3. STRING FIELDS (locale-aware) ===
    else {
      aVal = String(aVal);
      bVal = String(bVal);
      const collator = new Intl.Collator(locale, {
        sensitivity: "base",
        numeric: true,
      });
      return collator.compare(aVal, bVal) * (direction === "asc" ? 1 : -1);
    }
    // === 4. Final comparison ===
    if (aVal < bVal) return direction === "asc" ? -1 : 1;
    if (aVal > bVal) return direction === "asc" ? 1 : -1;
    return 0;
  });
}

// Price-filter logic
export function priceFilter(items, priceFilterValue) {
  if (!priceFilterValue || priceFilterValue === "all") {
    return items;
  }
  const price = (p) => p.basePrice ?? 0;
  // under-X
  if (priceFilterValue.startsWith("under-")) {
    const max = Number(priceFilterValue.replace("under-", ""));
    if (!isNaN(max)) {
      return items.filter((p) => price(p) < max);
    }
  }
  // above-X
  else if (priceFilterValue.startsWith("above-")) {
    const min = Number(priceFilterValue.replace("above-", ""));
    if (!isNaN(min)) {
      return items.filter((p) => price(p) > min);
    }
  }
  // X-Y range
  else {
    const [minStr, maxStr] = priceFilterValue.split("-");
    const min = Number(minStr);
    const max = Number(maxStr);

    if (!isNaN(min) && !isNaN(max)) {
      return items.filter((p) => price(p) >= min && price(p) <= max);
    }
  }
  return items;
}

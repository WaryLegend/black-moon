import { colord, extend } from "colord";
import mixPlugin from "colord/plugins/mix";
import namesPlugin from "colord/plugins/names";
import a11yPlugin from "colord/plugins/a11y";
extend([mixPlugin, namesPlugin, a11yPlugin]);

import { format, formatDistance, parseISO } from "date-fns";
import { vi } from "date-fns/locale";
import { toZonedTime } from "date-fns-tz";

const TZ = "Asia/Ho_Chi_Minh";

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

export function fCurrencyShorten(value) {
  if (!value) return "0 đ";
  const abs = Math.abs(value);

  if (abs >= 1e9) return (value / 1e9).toFixed(1).replace(".0", "") + " tỷ ₫";
  if (abs >= 1e6)
    return (value / 1e6).toFixed(abs >= 1e7 ? 0 : 1).replace(".0", "") + "tr ₫";
  // if (abs >= 1e3) return Math.round(value / 1e3) + "k ₫";

  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value);
}

export const formatNumber = (num, suffix = "") => {
  if (typeof num !== "number" || isNaN(num)) return "";

  if (num >= 1e9)
    return `${(num / 1e9).toFixed(2).replace(/\.?0+$/, "")}tỷ${suffix}`;
  if (num >= 1e6)
    return `${(num / 1e6).toFixed(2).replace(/\.?0+$/, "")}tr${suffix}`;
  if (num >= 1e3)
    return `${(num / 1e3).toFixed(2).replace(/\.?0+$/, "")}k${suffix}`;

  return `${num}${suffix}`;
};

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
    else if (field === "createdAt") {
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

// date formatter
export const fDate = (dateString) =>
  format(toZonedTime(parseISO(dateString), TZ), "dd-MM-yyyy", {
    locale: vi,
  });
// date and time formatter
export const fDateTime = (dateString) =>
  format(toZonedTime(parseISO(dateString), TZ), "dd-MM-yyyy HH:mm:ss", {
    locale: vi,
  });
// get date distance (3 days ago, yesterday, 10 ngày trước,...)
export const fDateDistance = (dateString) =>
  formatDistance(toZonedTime(parseISO(dateString), TZ), new Date(), {
    addSuffix: true,
    locale: vi,
  });

// phone number format
export const formatMobile = (mobile) => {
  if (!mobile) return null;
  // Xóa hết ký tự không phải số
  const cleaned = mobile.replace(/\D/g, "");
  // Trường hợp Việt Nam: 10 hoặc 11 số
  if (cleaned.length === 10) {
    return cleaned.replace(/(\d{4})(\d{3})(\d{3})/, "$1.$2.$3");
    // 0901234567 → 0901.234.567
  }
  if (cleaned.length === 11) {
    return cleaned.replace(/(\d{1})(\d{4})(\d{3})(\d{3})/, "$1 $2.$3.$4");
    // 84901234567 → 84 901.234.567
  }
  // Nếu lạ quá thì trả nguyên bản có dấu chấm mỗi 3–4 số
  return cleaned.replace(/(\d{3,4})(?=\d)/g, "$1.").replace(/\.$/, "");
};

// apply role style
export function getRoleStyle(role) {
  const roles = {
    admin: "bg-purple-50 text-purple-800 border-purple-200",
    staff: "bg-blue-50 text-blue-800 border-blue-200",
  };
  return (
    roles[role?.toLowerCase()] ||
    "bg-primary-200 text-primary-800 border-primary-300"
  );
}

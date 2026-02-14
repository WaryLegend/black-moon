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
export function capitalizeFirst(str: string): string {
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

export const formatCurrency = (value: number): string =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
    value,
  );

export function fCurrencyShorten(value: number): string {
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

export const formatNumber = (num: number, suffix = ""): string => {
  if (typeof num !== "number" || isNaN(num)) return "";

  if (num >= 1e9)
    return `${(num / 1e9).toFixed(2).replace(/\.?0+$/, "")}tỷ${suffix}`;
  if (num >= 1e6)
    return `${(num / 1e6).toFixed(2).replace(/\.?0+$/, "")}tr${suffix}`;
  if (num >= 1e3)
    return `${(num / 1e3).toFixed(2).replace(/\.?0+$/, "")}k${suffix}`;

  return `${num}${suffix}`;
};

export function getQuantityTextColor(value: number): string {
  const TEXT_COLORS = {
    LOW: "#FF0000", // Red
    MEDIUM: "#DAA520", // Yellow
    GOOD: "#008000", // Green
    NEUTRAL: "#808080",
  } as const;

  if (!Number.isFinite(value) || value <= 0) return TEXT_COLORS.NEUTRAL;
  if (value <= 9) return TEXT_COLORS.LOW;
  if (value <= 25) return TEXT_COLORS.MEDIUM;
  return TEXT_COLORS.GOOD;
}

export interface TextColorStyle {
  color: string;
  backgroundColor: string;
  style: {
    color: string;
    backgroundColor: string;
  };
}

export function getTextColor(name: string): TextColorStyle {
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
type SortDirection = "asc" | "desc";

export function sortData<T extends Record<string, unknown>>(
  data: T[],
  field?: keyof T,
  direction: SortDirection = "asc",
  locale = "vi",
): T[] {
  if (!field) return [...data];

  return [...data].sort((a, b) => {
    let aVal = a[field];
    let bVal = b[field];

    if (typeof aVal === "number" && typeof bVal === "number") {
      return (aVal - bVal) * (direction === "asc" ? 1 : -1);
    }

    if (field === "createdAt") {
      return (
        (new Date(aVal as string).getTime() -
          new Date(bVal as string).getTime()) *
        (direction === "asc" ? 1 : -1)
      );
    }

    const collator = new Intl.Collator(locale, {
      sensitivity: "base",
      numeric: true,
    });

    return (
      collator.compare(String(aVal), String(bVal)) *
      (direction === "asc" ? 1 : -1)
    );
  });
}

// Price-filter logic
interface PriceItem {
  basePrice?: number;
}
export function priceFilter<T extends PriceItem>(
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

// date formatter
export const fDate = (dateString: string): string =>
  format(toZonedTime(parseISO(dateString), TZ), "dd-MM-yyyy", {
    locale: vi,
  });
// date and time formatter
export const fDateTime = (dateString: string): string =>
  format(toZonedTime(parseISO(dateString), TZ), "dd-MM-yyyy HH:mm:ss", {
    locale: vi,
  });
// get date distance (3 days ago, yesterday, 10 ngày trước,...)
export const fDateDistance = (dateString: string): string =>
  formatDistance(toZonedTime(parseISO(dateString), TZ), new Date(), {
    addSuffix: true,
    locale: vi,
  });

// phone number format
export const formatMobile = (mobile?: string): string | null => {
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
type Role = "admin" | "staff" | "manager" | string;

export function getRoleStyle(role?: Role) {
  const roles: Record<string, string> = {
    admin: "bg-purple-50 text-purple-800 border-purple-200",
    manager: "bg-green-50 text-green-800 border-green-200",
    staff: "bg-blue-50 text-blue-800 border-blue-200",
  };
  return (
    roles[role?.toLowerCase() ?? ""] ||
    "bg-primary-200 text-primary-800 border-primary-300"
  );
}

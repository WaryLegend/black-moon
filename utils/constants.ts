// constants.ts

// Pagination size/length
export const PAGE_SIZE = 10;

export const GROUPS = {
  women: { label: "Nữ", href: "/" },
  men: { label: "Nam", href: "/men" },
  kids: { label: "Trẻ\u00A0em", href: "/kids" },
};

// 👉 for table display
export const groupLabels = Object.fromEntries(
  Object.entries(GROUPS).map(([key, val]) => [key, val.label]),
);

// 👉 for navigation (Homepage page naviagtion)
export const grouplinks = Object.values(GROUPS).map(({ href, label }) => ({
  href,
  label,
}));

// 👉 for radio option, filter, select, ...
export const groupOptions = Object.entries(GROUPS).map(
  ([value, { label }]) => ({
    value,
    label,
  }),
);

const genderLabels = {
  MALE: "Nam",
  FEMALE: "Nữ",
  OTHER: "-",
} as const;

export function getGenderLabel(gender?: keyof typeof genderLabels | null) {
  if (!gender) return "-";
  return genderLabels[gender];
}

// filter Price
export const PRICES_RANGE = [
  { label: "Tất cả giá", value: "all" },
  { label: "Dưới 199.000 VND", value: "under-199000" },
  {
    label: "199.000 VND - 299.000 VND",
    value: "199000-299000",
  },
  {
    label: "299.000 VND - 399.000 VND",
    value: "299000-399000",
  },
  {
    label: "399.000 VND - 499.000 VND",
    value: "399000-499000",
  },
  {
    label: "499.000 VND - 799.000 VND",
    value: "499000-799000",
  },
  {
    label: "799.000 VND - 999.000 VND",
    value: "799000-999000",
  },
  {
    label: "Trên 999.000 VND",
    value: "above-999000",
  },
];

// Star ⭐ rating length 5/5, 10/10 ?
export const STAR_LENGTH = 5;

// Order status
export const ORDER_STATUS = {
  pending: { label: "Pending", color: "bg-yellow-100 text-yellow-800" },
  processing: { label: "Processing", color: "bg-blue-100 text-blue-800" },
  shipping: { label: "Shipping", color: "bg-purple-100 text-purple-800" },
  delivered: { label: "Delivered", color: "bg-green-100 text-green-800" },
  cancelled: { label: "Cancelled", color: "bg-red-100 text-red-800" },
  returned: { label: "Returned", color: "bg-orange-100 text-orange-800" },
};

// apply role style
const ROLE_STYLES = {
  admin: "bg-purple-50 text-purple-800 border-purple-200",
  manager: "bg-green-50 text-green-800 border-green-200",
  staff: "bg-blue-50 text-blue-800 border-blue-200",
} as const;
const DEFAULT_ROLE_STYLE = "bg-primary-200 text-primary-800 border-primary-300";

export function getRoleStyle(role?: string) {
  if (!role) return DEFAULT_ROLE_STYLE;

  const key = role.trim().toLowerCase();

  return ROLE_STYLES[key as keyof typeof ROLE_STYLES] ?? DEFAULT_ROLE_STYLE;
}

// Apply color for quanity
export function setQuantityColor(value: number): string {
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

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

//clothes Size
export const SIZES = [
  { value: "xs", label: "XS" },
  { value: "s", label: "S" },
  { value: "m", label: "M" },
  { value: "l", label: "L" },
  { value: "xl", label: "XL" },
  { value: "xxl", label: "XXL" },
  { value: "xxxl", label: "XXXL" },
];

//clothes color
export const COLORS = [
  { value: "orange", label: "Cam" },
  { value: "pink", label: "Hồng" },
  { value: "brown", label: "Nâu" },
  { value: "green", label: "Lục" },
  { value: "blue", label: "Lam" },
  { value: "white", label: "Trắng" },
  { value: "black", label: "Đen" },
];

// filter Price
export const PRICES = [
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

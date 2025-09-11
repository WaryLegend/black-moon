// Pagination size/length
export const PAGE_SIZE = 10;

// constants.js
export const groups = {
  women: { label: "Nữ", href: "/" },
  men: { label: "Nam", href: "/men" },
  kids: { label: "Trẻ\u00A0em", href: "/kids" },
};

// 👉 for table display
export const groupLabels = Object.fromEntries(
  Object.entries(groups).map(([key, val]) => [key, val.label]),
);

// 👉 for navigation (Homepage page naviagtion)
export const grouplinks = Object.values(groups).map(({ href, label }) => ({
  href,
  label,
}));

// 👉 for radio option, filter, select, ...
export const groupOptions = Object.entries(groups).map(
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
  { value: "white", label: "Trắng" },
  { value: "blue", label: "Lam" },
  { value: "green", label: "Lục" },
  { value: "black", label: "Đen" },
  { value: "brown", label: "Nâu" },
  { value: "pink", label: "Hồng" },
  { value: "orange", label: "Cam" },
];

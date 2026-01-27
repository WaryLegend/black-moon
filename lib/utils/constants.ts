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
  packing: { label: "Packing", color: "bg-blue-100 text-blue-800" },
  shipping: { label: "Shipping", color: "bg-purple-100 text-purple-800" },
  delivered: { label: "Delivered", color: "bg-green-100 text-green-800" },
  cancelled: { label: "Cancelled", color: "bg-red-100 text-red-800" },
  returned: { label: "Returned", color: "bg-orange-100 text-orange-800" },
};

export const formatCurrency = (value) =>
  new Intl.NumberFormat("vi", { style: "currency", currency: "VND" }).format(
    value,
  );

export const formatCurrency = (value) =>
  new Intl.NumberFormat("vi", { style: "currency", currency: "VND" }).format(
    value,
  );

export function getQuantityTextColor(value) {
  const TEXT_COLORS = {
    LOW: "#FF0000", // Red
    MEDIUM: "#DAA520", // Yellow
    GOOD: "#008000", // Green
  };

  const THRESHOLDS = {
    LOW: 9,
    MEDIUM: 25,
  };

  if (!Number.isFinite(value)) return TEXT_COLORS.LOW; // Default to red for invalid input

  if (value <= THRESHOLDS.LOW) return TEXT_COLORS.LOW;
  if (value <= THRESHOLDS.MEDIUM) return TEXT_COLORS.MEDIUM;
  return TEXT_COLORS.GOOD;
}

export function getTextColor(text) {
  const TEXT_COLORS = {
    BLACK: { color: "#0f0f0f", backgroundColor: "#8a8a8a" },
    WHITE: { color: "#FFFFFF", backgroundColor: "#9ca3af" },
    BLUE: { color: "#1D4ED8", backgroundColor: "#dbeafe" },
    GREEN: { color: "#15803D", backgroundColor: "#dcfce7" },
    BROWN: { color: "#7A3E00", backgroundColor: "#f5e6d3" },
    PINK: { color: "#DB2777", backgroundColor: "#fce7f3" },
    ORANGE: { color: "#FFa500", backgroundColor: "#fff7ed" },
  };

  const style = TEXT_COLORS[text.toUpperCase()];

  return {
    style, // --> {object}
    color: style?.color, // --> color only value
  };
}

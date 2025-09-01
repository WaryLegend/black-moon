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
    BLACK: { color: "#0f0f0f" },
    WHITE: { color: "#FFFFFF", backgroundColor: "#0f0f0f" },
    BLUE: { color: "#1D4ED8" },
    GREEN: { color: "#15803D" },
    BROWN: { color: "#7A3E00" },
    PINK: { color: "#DB2777" },
    ORANGE: { color: "#FFa500" },
  };

  const style = TEXT_COLORS[text.toUpperCase()];

  return {
    style, // --> {object}
    color: style?.color, // --> color value
  };
}

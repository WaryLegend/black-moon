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
    BLACK: { color: "#0f0f0f", backgroundColor: "#3d3d3d" },
    WHITE: { color: "#FFFFFF", backgroundColor: "#bbc1ca" },
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
    backgroundColor: style?.backgroundColor, // --> bg color only
  };
}

import { colord, extend } from "colord";
import mixPlugin from "colord/plugins/mix";
import namesPlugin from "colord/plugins/names";
import a11yPlugin from "colord/plugins/a11y";
extend([mixPlugin, namesPlugin, a11yPlugin]);

export interface TextColorStyle {
  color: string;
  backgroundColor: string;
  style: {
    color: string;
    backgroundColor: string;
  };
}
// return color for text and background for better visual
export function getTextColorStyle(name: string): TextColorStyle {
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
      backgroundColor: "#9ca3af",
      style: { color: "#fff", backgroundColor: "#9ca3af" },
    };
  }
  // Special case: BLACK
  if (base.isEqual(colord("#000000"))) {
    return {
      color: "#000",
      backgroundColor: "#5A5C5E",
      style: { color: "#000", backgroundColor: "#5A5C5E" },
    };
  }
  // Normal colors logic
  const bg = base
    .mix("#ffffff", 0.7) // 70% white → pastel, not washed
    .desaturate(0.05); // keep identity, but softer

  return {
    color: base.toHex(),
    backgroundColor: bg.toHex(),
    style: { color: base.toHex(), backgroundColor: bg.toHex() },
  };
}

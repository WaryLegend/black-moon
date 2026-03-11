export const fNumberShorten = (num: number, suffix = ""): string => {
  if (typeof num !== "number" || isNaN(num)) return "";

  if (num >= 1e9)
    return `${(num / 1e9).toFixed(2).replace(/\.?0+$/, "")}tỷ${suffix}`;
  if (num >= 1e6)
    return `${(num / 1e6).toFixed(2).replace(/\.?0+$/, "")}tr${suffix}`;
  if (num >= 1e3)
    return `${(num / 1e3).toFixed(2).replace(/\.?0+$/, "")}k${suffix}`;

  return `${num}${suffix}`;
};

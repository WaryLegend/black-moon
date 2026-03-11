// set first letter to captital
export function capitalizeFirst(str: string): string {
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

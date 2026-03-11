// Sorting logic
type SortDirection = "asc" | "desc";

export function sortData<T extends Record<string, unknown>>(
  data: T[],
  field?: keyof T,
  direction: SortDirection = "asc",
  locale = "vi",
): T[] {
  if (!field) return [...data];

  return [...data].sort((a, b) => {
    let aVal = a[field];
    let bVal = b[field];

    if (typeof aVal === "number" && typeof bVal === "number") {
      return (aVal - bVal) * (direction === "asc" ? 1 : -1);
    }

    if (field === "createdAt") {
      return (
        (new Date(aVal as string).getTime() -
          new Date(bVal as string).getTime()) *
        (direction === "asc" ? 1 : -1)
      );
    }

    const collator = new Intl.Collator(locale, {
      sensitivity: "base",
      numeric: true,
    });

    return (
      collator.compare(String(aVal), String(bVal)) *
      (direction === "asc" ? 1 : -1)
    );
  });
}

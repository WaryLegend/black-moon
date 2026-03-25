export type SortDirection = "asc" | "desc";
export type SortValue = `${string}-${SortDirection}`;

export type SortOption = {
  value: SortValue;
  label: string;
};

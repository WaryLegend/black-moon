import { ReactNode } from "react";
import { SortOption } from "@/types/sort";
import FirstChosenFilter from "./FirstChosenFilter";

type SortByProps = {
  options: SortOption[];
  label?: string | ReactNode;
  className?: string;
};

// SortBy reuses FirstChosenFilter with "sortBy" field for consistency.
function SortBy({ options, label = "Sort by", className = "" }: SortByProps) {
  return (
    <FirstChosenFilter
      label={label}
      filterField="sortBy"
      options={options}
      className={className}
    />
  );
}

export default SortBy;

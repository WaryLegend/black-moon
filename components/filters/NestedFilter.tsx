import type { ReactNode } from "react";
import type { FilterConfig, FilterState } from "@/types/filter";
import Filter from "./Filter";

type NestedFilterProps = {
  label?: string;
  className?: string;
  filters: FilterConfig[];
  onFilterChange?: (field: string, value: FilterState[string]) => void;
  localFilterState?: FilterState;
  children?: ReactNode;
};

// NestedFilter lays out a list of Filter components and can inject extra controls via children.
function NestedFilter({
  label = "Filter",
  className = "",
  filters,
  onFilterChange,
  localFilterState = {},
  children,
}: NestedFilterProps) {
  return (
    <div className={`flex flex-wrap items-center gap-2 p-1 ${className}`}>
      {label && <label className="font-semibold">{label}</label>}
      {children}
      {filters.map((fil) => (
        <Filter
          key={fil?.filterField}
          filterField={fil?.filterField}
          options={fil?.options}
          selectProps={fil?.selectProps}
          onFilterChange={onFilterChange}
          loadOptions={fil?.loadOptions}
          // for local state view only (via SideFilter)
          value={localFilterState?.[fil.filterField]}
        />
      ))}
    </div>
  );
}

export default NestedFilter;

import Filter from "./Filter";

function NestedFilter({
  label = "Filter",
  className = "",
  filters,
  onFilterChange,
  localFilterState = [],
  children,
}) {
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

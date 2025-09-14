import Filter from "./Filter";

function NestedFilter({ filters, label = "Filter", className }) {
  return (
    <div className={`flex items-center gap-2 p-1 ${className}`}>
      {label && <label className="font-semibold">{label}</label>}
      {filters.map((fil) => (
        <Filter
          key={fil?.filterField}
          filterField={fil?.filterField}
          options={fil?.options}
          selectProps={fil?.selectProps}
        />
      ))}
    </div>
  );
}

export default NestedFilter;

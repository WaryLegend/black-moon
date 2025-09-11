import Filter from "./Filter";

function NestedFilter({ filters }) {
  return (
    <div className="flex items-center gap-2 p-1">
      <label className="font-semibold">Filter</label>

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

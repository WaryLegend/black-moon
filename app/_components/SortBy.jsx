import FirstChosenFilter from "@/app/_components/Filters/FirstChosenFilter";

function SortBy({ options, label = "Sort by", className = "" }) {
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

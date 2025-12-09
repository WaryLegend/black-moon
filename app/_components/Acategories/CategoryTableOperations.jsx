import TabFilter from "@/app/_components/Filters/TabFilter";
import { groupOptions } from "@/app/_utils/constants";
import SortBy from "@/app/_components/SortBy";

function CategoryTableOperations() {
  return (
    <div className="flex flex-wrap items-center gap-3 md:gap-6 lg:gap-8">
      <TabFilter
        filterField="group"
        options={[{ value: "all", label: "All" }, ...groupOptions]}
      />

      <SortBy
        options={[
          { value: "createdAt-desc", label: "Date (recent first)" },
          { value: "createdAt-asc", label: "Date (earlier first)" },
          { value: "name-asc", label: "Name (A-Z)" },
          { value: "name-desc", label: "Name (Z-A)" },
          { value: "group-asc", label: "Group (A-Z)" },
          { value: "group-desc", label: "Group (Z-A)" },
        ]}
      />
    </div>
  );
}

export default CategoryTableOperations;

"use client";

import Filter from "@/components/filters/Filter";
import SearchFilter from "@/components/filters/SearchFilter";
import SortBy from "@/components/filters/SortBy";
import { loadTargetGroupSlugOptions } from "./useTargetGroupOptions";

function CategoryTableOperations() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <SearchFilter placeholder="Search by name or slug" />

      <Filter
        filterField="groups"
        selectProps={{
          isAsync: true,
          isMulti: true,
          minWidth: 260,
          isAnimated: true,
          placeholder: "Filter groups",
        }}
        loadOptions={loadTargetGroupSlugOptions}
      />

      <SortBy
        options={[
          { value: "createdAt-desc", label: "Date (recent first)" },
          { value: "createdAt-asc", label: "Date (earlier first)" },
          { value: "name-asc", label: "Name (A-Z)" },
          { value: "name-desc", label: "Name (Z-A)" },
        ]}
      />
    </div>
  );
}

export default CategoryTableOperations;

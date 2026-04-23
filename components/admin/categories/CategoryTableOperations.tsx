"use client";

import Filter from "@/components/filters/Filter";
import SearchFilter from "@/components/filters/SearchFilter";
import SortBy from "@/components/filters/SortBy";
import { loadTargetGroupSlugOptions } from "./useTargetGroupOptions";

function CategoryTableOperations() {
  return (
    <div className="flex w-full flex-wrap items-center gap-3">
      <SearchFilter placeholder="Search by name or slug" className="min-w-60" />

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

      <div className="ml-0 sm:ml-auto">
        <SortBy
          options={[
            { value: "createdAt-desc", label: "Date (recent first)" },
            { value: "createdAt-asc", label: "Date (earlier first)" },
            { value: "name-asc", label: "Name (A-Z)" },
            { value: "name-desc", label: "Name (Z-A)" },
          ]}
        />
      </div>
    </div>
  );
}

export default CategoryTableOperations;

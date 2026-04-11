"use client";

import Filter from "@/components/filters/Filter";
import SearchFilter from "@/components/filters/SearchFilter";
import SortBy from "@/components/filters/SortBy";

import { loadCategorySlugOptions } from "./useCategoryOptions";

function ProductTableOperations() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <SearchFilter placeholder="Search by name or slug" />

      <Filter
        filterField="categories"
        selectProps={{
          isAsync: true,
          isMulti: true,
          minWidth: 250,
          isAnimated: true,
          placeholder: "Filter category",
        }}
        loadOptions={loadCategorySlugOptions}
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

export default ProductTableOperations;

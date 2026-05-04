"use client";

import Filter from "@/components/filters/Filter";
import SearchFilter from "@/components/filters/SearchFilter";
import SortBy from "@/components/filters/SortBy";
import TabFilter from "@/components/filters/TabFilter";

import { loadCategorySlugOptions } from "./useCategoryOptions";

function ProductTableOperations() {
  return (
    <div className="flex w-full flex-wrap items-center gap-3">
      <SearchFilter placeholder="Search by name or slug" className="min-w-60" />

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

      <TabFilter
        label="Featured"
        filterField="isFeatured"
        options={[
          { value: "true", label: "True" },
          { value: "false", label: "False" },
        ]}
      />

      <div className="ml-0 sm:ml-auto">
        <SortBy
          options={[
            { value: "createdAt-desc", label: "Date (recent first)" },
            { value: "createdAt-asc", label: "Date (earlier first)" },
            { value: "name-asc", label: "Name (A-Z)" },
            { value: "name-desc", label: "Name (Z-A)" },
            { value: "isFeatured-desc", label: "Featured first" },
            { value: "isFeatured-asc", label: "Not featured first" },
          ]}
        />
      </div>
    </div>
  );
}

export default ProductTableOperations;

"use client";

import Filter from "@/components/filters/Filter";
import SearchFilter from "@/components/filters/SearchFilter";
import SortBy from "@/components/filters/SortBy";
import { COLOR_OPTIONS, SIZE_OPTIONS } from "@/utils/constants";

import { loadProductSlugOptions } from "./useProductOptions";

export default function ProductVariantTableOperations() {
  return (
    <div className="flex w-full flex-wrap items-center gap-3">
      <SearchFilter
        placeholder="Search by SKU or product name"
        className="min-w-75"
      />

      <Filter
        filterField="products"
        selectProps={{
          isAsync: true,
          isMulti: true,
          minWidth: 250,
          isAnimated: true,
          closeMenuOnSelect: false,
          placeholder: "Filter products",
        }}
        loadOptions={loadProductSlugOptions}
      />

      <div className="flex flex-wrap gap-3">
        <Filter
          filterField="colors"
          options={COLOR_OPTIONS}
          selectProps={{
            isMulti: true,
            minWidth: 160,
            isAnimated: true,
            placeholder: "Colors",
            isClearable: true,
            closeMenuOnSelect: false,
          }}
        />

        <Filter
          filterField="sizes"
          options={SIZE_OPTIONS}
          selectProps={{
            isMulti: true,
            minWidth: 140,
            isAnimated: true,
            placeholder: "Sizes",
            isClearable: true,
            closeMenuOnSelect: false,
          }}
        />
      </div>

      <div className="ml-0 sm:ml-auto">
        <SortBy
          options={[
            { value: "createdAt-desc", label: "Date (recent first)" },
            { value: "createdAt-asc", label: "Date (earlier first)" },
            { value: "price-asc", label: "Price (lowest first)" },
            { value: "price-desc", label: "Price (highest first)" },
            { value: "quantity-asc", label: "Quantity (lowest first)" },
            { value: "quantity-desc", label: "Quantity (highest first)" },
          ]}
        />
      </div>
    </div>
  );
}

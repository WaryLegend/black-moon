"use client";

import Filter from "@/components/filters/Filter";
import SideFilter from "@/components/filters/SideFilter";
import SortBy from "@/components/filters/SortBy";
import type { FilterConfig } from "@/types/filter";
import { COLOR_OPTIONS, PRICE_RANGES, SIZE_OPTIONS } from "@/utils/constants";
import { useIsMobile } from "@/hooks/useIsMobile";

function ProductFilter() {
  const isMobile = useIsMobile();

  const filters: FilterConfig[] = [
    {
      filterField: "colors",
      options: COLOR_OPTIONS,
      selectProps: {
        minWidth: "8rem",
        isMulti: true,
        isClearable: true,
        closeMenuOnSelect: false,
        isAnimated: true,
        placeholder: "Màu sắc",
      },
    },
    {
      filterField: "sizes",
      options: SIZE_OPTIONS,
      selectProps: {
        minWidth: "7rem",
        isMulti: true,
        isClearable: true,
        closeMenuOnSelect: false,
        isAnimated: true,
        placeholder: "Kích cỡ",
      },
    },
    {
      filterField: "priceRange",
      options: PRICE_RANGES,
      selectProps: {
        minWidth: "16rem",
        placeholder: "Giá",
      },
    },
  ];

  return (
    <div className="flex w-full flex-wrap items-center gap-2">
      <SideFilter filters={filters} />

      {!isMobile && (
        <div className="hidden flex-wrap items-center gap-2 md:flex">
          {filters.map((filter) => (
            <Filter
              key={filter.filterField}
              filterField={filter.filterField}
              options={filter.options}
              selectProps={filter.selectProps}
              loadOptions={filter.loadOptions}
            />
          ))}
        </div>
      )}
      <div className="ml-auto">
        <SortBy
          label={
            <div className="hidden font-medium sm:block">Sắp xếp theo</div>
          }
          options={[
            { value: "createdAt-desc", label: "Ngày (gần đây)" },
            { value: "createdAt-asc", label: "Ngày (trước đây)" },
            { value: "name-asc", label: "Tên sản phẩm (A-Z)" },
            { value: "name-desc", label: "Tên sản phẩm (Z-A)" },
            { value: "price-asc", label: "Từ thấp đến cao" },
            { value: "price-desc", label: "Từ cao đến thấp" },
          ]}
        />
      </div>
    </div>
  );
}

export default ProductFilter;

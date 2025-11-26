"use client";

import { useColorsAndSizes } from "@/app/_context/ColorsAndSizesContext";
import { PRICES_RANGE } from "@/app/_utils/constants";
import NestedFilter from "@/app/_components/Filters/NestedFilter";
import SideFilter from "@/app/_components/SideFilter";

const priceFilters = {
  filterField: "basePrice",
  options: PRICES_RANGE,
  selectProps: {
    minWidth: "16rem",
    placeholder: "Giá",
  },
};

function ProductFilter() {
  const { colors, sizes } = useColorsAndSizes();

  const productsfilters = [
    {
      filterField: "color",
      options: colors,
      selectProps: {
        minWidth: "5rem",
        isMulti: true,
        isClearable: true,
        closeMenuOnSelect: false,
        isAnimated: true,
        placeholder: "Màu sắc",
      },
    },
    {
      filterField: "size",
      options: sizes,
      selectProps: {
        minWidth: "3rem",
        isMulti: true,
        isClearable: true,
        closeMenuOnSelect: false,
        isAnimated: true,
        placeholder: "Kích cỡ",
      },
    },
  ];

  const filters = [...productsfilters, priceFilters];

  return (
    <div className="flex items-center gap-1">
      {/* Optimized for smaller-screens and mobiles */}
      <SideFilter filters={filters} />

      <div className="hidden md:block">
        <NestedFilter filters={filters} label="" />
      </div>
    </div>
  );
}

export default ProductFilter;

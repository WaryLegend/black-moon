"use client";

import { COLORS, PRICES, SIZES } from "@/app/_utils/constants";
import { getTextColor } from "@/app/_utils/helpers";
import NestedFilter from "@/app/_components/Filters/NestedFilter";
import SideFilter from "@/app/_components/SideFilter";

const filters = [
  {
    filterField: "size",
    options: SIZES,
    selectProps: {
      minWidth: "3rem",
      isMulti: true,
      isClearable: true,
      closeMenuOnSelect: false,
      isAnimated: true,
      placeholder: "Kích thước",
    },
  },
  {
    filterField: "color",
    options: COLORS,
    selectProps: {
      minWidth: "5rem",
      isMulti: true,
      isClearable: true,
      closeMenuOnSelect: false,
      isAnimated: true,
      getOptionStyle: (label) => getTextColor(label).style,
      placeholder: "Màu sắc",
    },
  },
  {
    filterField: "variantPrice",
    options: PRICES,
    selectProps: {
      minWidth: "16rem",
      placeholder: "Giá",
    },
  },
];

function ProductFilter() {
  return (
    <div className="flex items-center gap-2">
      {/* Optimized for smaller-screens and mobiles */}
      <SideFilter filters={filters} />

      <div className="hidden md:block">
        <NestedFilter filters={filters} label="" />
      </div>
    </div>
  );
}

export default ProductFilter;

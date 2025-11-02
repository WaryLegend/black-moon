"use client";

import NestedFilter from "@/app/_components/Filters/NestedFilter";
import { searchProducts } from "@/app/_lib/data-service";
import { COLORS, PRICES, SIZES } from "@/app/_utils/constants";

const staticFilters = [
  {
    filterField: "color",
    options: COLORS,
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
    options: SIZES,
    selectProps: {
      minWidth: "3rem",
      isMulti: true,
      isClearable: true,
      closeMenuOnSelect: false,
      isAnimated: true,
      placeholder: "Kích cỡ",
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

function VariantTableOperations() {
  const productFilter = {
    filterField: "productId",
    loadOptions: searchProducts,
    selectProps: {
      minWidth: "15rem",
      isMulti: true,
      isClearable: true,
      closeMenuOnSelect: false,
      isAnimated: true,
      placeholder: "Tên sản phẩm",
      isAsync: true,
    },
  };

  const filters = [productFilter, ...staticFilters];

  return (
    <div className="flex items-center justify-end">
      <NestedFilter filters={filters} />
    </div>
  );
}

export default VariantTableOperations;

"use client";

import NestedFilter from "@/components/filters/NestedFilter";
import { useColorsAndSizes } from "@/contexts/ColorsAndSizesContext";
import { searchProducts } from "@/lib/data-service";
import { PRICES_RANGE } from "@/utils/constants";

const priceFilters = {
  filterField: "variantPrice",
  options: PRICES_RANGE,
  selectProps: {
    minWidth: "16rem",
    placeholder: "Giá",
  },
};

function VariantTableOperations() {
  const { colors, sizes } = useColorsAndSizes();

  const variantFilter = [
    {
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
    },
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

  const filters = [...variantFilter, priceFilters];

  return (
    <div className="flex items-center justify-end">
      <NestedFilter filters={filters} />
    </div>
  );
}

export default VariantTableOperations;

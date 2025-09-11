import NestedFilter from "@/app/_components/Filters/NestedFilter";

const filters = [
  {
    filterField: "category",
    options: [],
    selectProps: {
      minWidth: "10rem",
      isMulti: true,
      isClearable: true,
      isSearchable: true,
      closeMenuOnSelect: false,
      isAnimated: true,
      placeholder: "Thể loại",
    },
  },
  {
    filterField: "basePrice",
    options: [
      { label: "Tất cả giá", value: "all" },
      { label: "Dưới 199.000 VND", value: "under-199000" },
      {
        label: "199.000 VND - 299.000 VND",
        value: "199000-299000",
      },
      {
        label: "299.000 VND - 399.000 VND",
        value: "299000-399000",
      },
      {
        label: "399.000 VND - 499.000 VND",
        value: "399000-499000",
      },
      {
        label: "499.000 VND - 799.000 VND",
        value: "499000-799000",
      },
      {
        label: "799.000 VND - 999.000 VND",
        value: "799000-999000",
      },
      {
        label: "Trên 999.000 VND",
        value: "above-999000",
      },
    ],
    selectProps: {
      minWidth: "16rem",
      placeholder: "Giá",
    },
  },
];

function ProductTableOperations() {
  return (
    <div className="flex items-center justify-end">
      <NestedFilter filters={filters} />
    </div>
  );
}

export default ProductTableOperations;

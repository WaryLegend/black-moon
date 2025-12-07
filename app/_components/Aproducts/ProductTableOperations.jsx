import NestedFilter from "@/app/_components/Filters/NestedFilter";
import TabFilter from "@/app/_components/Filters/TabFilter";
import { getAllCategories } from "@/app/_lib/data-service";
import {
  groupLabels,
  groupOptions,
  PRICES_RANGE,
} from "@/app/_utils/constants";

const staticFilters = [
  {
    filterField: "basePrice",
    options: PRICES_RANGE,
    selectProps: {
      minWidth: "16rem",
      placeholder: "Giá",
    },
  },
];

async function ProductTableOperations() {
  const categories = await getAllCategories();

  const categoryOptions = categories.map((cat) => {
    const groupDisplay = groupLabels[cat.group] ?? cat.group;
    return {
      label: `${cat.name} - (${groupDisplay})`,
      value: cat.id,
    };
  });

  const categoryFilter = {
    filterField: "category",
    options: categoryOptions,
    selectProps: {
      minWidth: "15rem",
      isMulti: true,
      isClearable: true,
      isSearchable: true,
      closeMenuOnSelect: false,
      isAnimated: true,
      placeholder: "Tên thể loại",
    },
  };
  const filters = [categoryFilter, ...staticFilters];

  return (
    <div className="flex items-center justify-end">
      <NestedFilter filters={filters}>
        <TabFilter
          filterField="group"
          options={[{ value: "all", label: "All" }, ...groupOptions]}
        />
      </NestedFilter>
    </div>
  );
}

export default ProductTableOperations;

import { getCategories } from "@/app/_lib/data-service";
import AddCategory from "@/app/_components/Acategories/AddCategory";
import CategoryTable from "@/app/_components/Acategories/CategoryTable";

async function CategoryTableAndBtns({ searchParams }) {
  const page = Number(searchParams.page) || 1;
  const { filters, sortBy } = parseQueryParams(searchParams);

  const { data: categories, total } = await getCategories({
    page,
    filters,
    sortBy,
  });

  return (
    <>
      <CategoryTable categories={categories} total={total} />
      <AddCategory />
    </>
  );
}

function parseQueryParams(searchParams) {
  const filters = {};
  const sortBy = {};

  // Group filter (single-select)
  const group = searchParams.group;
  if (group && group !== "all") filters.group = group;

  // Sort by
  const sort = searchParams.sortBy;
  if (sort) {
    const [field, direction] = sort.split("-");
    sortBy.field = field;
    sortBy.direction = direction;
  }

  return { filters, sortBy };
}

export default CategoryTableAndBtns;

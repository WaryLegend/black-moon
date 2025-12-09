"use client";

import { useGetCategories } from "./useGetCategories";
import AddCategory from "@/app/_components/Acategories/AddCategory";
import CategoryTable from "@/app/_components/Acategories/CategoryTable";
import Spinner from "@/app/_components/Spinner";

function CategoryTableAndBtns({ searchParams }) {
  const page = Number(searchParams.page) || 1;
  const { filters, sortBy } = parseQueryParams(searchParams);

  const { isLoading, categories, total } = useGetCategories({
    page,
    filters,
    sortBy,
  });

  if (isLoading)
    return (
      <Spinner color="var(--color-accent-600)" className="my-10 self-center" />
    );

  return (
    <div className="flex flex-col gap-4">
      <CategoryTable categories={categories} total={total} />
      <AddCategory />
    </div>
  );
}

function parseQueryParams(searchParams) {
  const filters = {};
  const sortBy = {};

  // Group filter (single-select)
  const group = searchParams.group;
  if (group && group !== "all") filters.group = group;

  // Sort by
  const sort = searchParams.sortBy || "createdAt-desc";
  if (sort) {
    const [field, direction] = sort.split("-");
    sortBy.field = field;
    sortBy.direction = direction;
  }

  return { filters, sortBy };
}

export default CategoryTableAndBtns;

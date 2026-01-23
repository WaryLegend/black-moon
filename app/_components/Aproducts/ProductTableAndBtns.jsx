"use client";

import { useProducts } from "./useProducts";
import AddProduct from "@/app/_components/Aproducts/AddProduct";
import ProductTable from "@/app/_components/Aproducts/ProductTable";
import Spinner from "@/app/_components/Spinner";

function ProductTableAndBtns({ searchParams }) {
  const page = Number(searchParams.page) || 1;
  const { filters, sortBy } = parseQueryParams(searchParams);

  const { isLoading, products, total } = useProducts({
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
      <ProductTable products={products} total={total} />
      <AddProduct />
    </div>
  );
}

function parseQueryParams(searchParams) {
  const filters = {};
  const sortBy = {};

  // group (single)
  const group = searchParams.group;
  if (group) filters.group = group;
  // category (multi)
  const category = searchParams.category;
  if (category) filters.category = category.split(",");
  // price (single)
  const basePrice = searchParams.basePrice;
  if (basePrice) filters.basePrice = basePrice;

  // Sort by
  const sort = searchParams.sortBy || "createdAt-desc";
  if (sort) {
    const [field, direction] = sort.split("-");
    sortBy.field = field;
    sortBy.direction = direction;
  }
  return { filters, sortBy };
}

export default ProductTableAndBtns;

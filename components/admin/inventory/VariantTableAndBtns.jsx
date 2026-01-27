"use client";

import AddVariant from "./AddVariant";
import VariantTable from "./VariantTable";
import { useVariants } from "./useVariants";
import Spinner from "@/components/ui/Spinner";

function VariantTableAndBtns({ searchParams }) {
  const page = Number(searchParams.page) || 1;
  const { filters, sortBy } = parseQueryParams(searchParams);

  const { isLoading, variants, total } = useVariants({
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
      <VariantTable variants={variants} total={total} />
      <AddVariant />
    </div>
  );
}

function parseQueryParams(searchParams) {
  const filters = {};
  const sortBy = {};

  // product name (multi)
  const productId = searchParams.productId;
  if (productId) filters.productId = productId.split(",");
  // color (multi)
  const color = searchParams.color;
  if (color) filters.color = color.split(",");
  // size (multi)
  const size = searchParams.size;
  if (size) filters.size = size.split(",");
  // price (single)
  const variantPrice = searchParams.variantPrice;
  if (variantPrice) filters.variantPrice = variantPrice;

  // Sort by
  const sort = searchParams.sortBy || "createdAt-desc";
  if (sort) {
    const [field, direction] = sort.split("-");
    sortBy.field = field;
    sortBy.direction = direction;
  }
  return { filters, sortBy };
}

export default VariantTableAndBtns;

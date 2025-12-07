import { getVariants } from "@/app/_lib/data-service";
import AddVariant from "@/app/_components/Ainventory/AddVariant";
import VariantTable from "@/app/_components/Ainventory/VariantTable";

async function VariantTableAndBtns({ searchParams }) {
  const page = Number(searchParams.page) || 1;
  const { filters, sortBy } = parseQueryParams(searchParams);

  const { data: variants, total } = await getVariants({
    page,
    filters,
    sortBy,
  });

  return (
    <>
      <VariantTable variants={variants} total={total} />
      <AddVariant />
    </>
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
  const sort = searchParams.sortBy;
  if (sort) {
    const [field, direction] = sort.split("-");
    sortBy.field = field;
    sortBy.direction = direction;
  }
  return { filters, sortBy };
}

export default VariantTableAndBtns;

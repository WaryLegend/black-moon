import AddProduct from "@/app/_components/Aproducts/AddProduct";
import ProductTable from "@/app/_components/Aproducts/ProductTable";
import { getProducts } from "@/app/_lib/data-service";

async function ProductTableAndBtns({ searchParams }) {
  const page = Number(searchParams.page) || 1;
  const { filters, sortBy } = parseQueryParams(searchParams);

  const { data: products, total } = await getProducts({
    page,
    filters,
    sortBy,
  });

  return (
    <>
      <ProductTable products={products} total={total} />
      <AddProduct />
    </>
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
  const sort = searchParams.sortBy;
  if (sort) {
    const [field, direction] = sort.split("-");
    sortBy.field = field;
    sortBy.direction = direction;
  }
  return { filters, sortBy };
}

export default ProductTableAndBtns;

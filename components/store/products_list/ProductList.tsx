import ProductItem from "./ProductItem";
import type { CategorySummary } from "@/types/categories";
import type { ProductSummary } from "@/types/products";

type ProductListProps = {
  products: ProductSummary[];
  category?: CategorySummary;
};

function ProductList({ products, category }: ProductListProps) {
  return (
    <ul className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-2 py-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} category={category} />
      ))}
    </ul>
  );
}

export default ProductList;

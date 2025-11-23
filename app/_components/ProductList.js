import ProductItem from "@/app/_components/ProductItem";

function ProductList({ products }) {
  return (
    <ul className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-2 py-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </ul>
  );
}

export default ProductList;

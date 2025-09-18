import ProductItem from "@/app/_components/ProductItem";

function ProductList({ products }) {
  return (
    <ul className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-2 p-5">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </ul>
  );
}

export default ProductList;

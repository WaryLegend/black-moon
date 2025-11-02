import Image from "next/image";
import test from "@/public/test-product.jpg";
import ProductList from "@/app/_components/ProductList";
import ViewProductLink from "@/app/_components/ViewProductLink";
import SortBy from "@/app/_components/SortBy";

function ProductSection({ products }) {
  if (!products) return "No product";
  // get first product of list as presenter
  const productId = products[0]?.id;

  return (
    <div className="grid">
      <div className="flex flex-wrap items-center justify-between pb-3">
        <div className="font-semibold">{products.length} Sản phẩm</div>
        <SortBy
          label="Sắp xếp theo"
          className="ml-auto"
          options={[
            { value: "createdDate-desc", label: "Ngày (gần đây)" },
            { value: "createdDate-asc", label: "Ngày (trước đây)" },
            { value: "name-asc", label: "Tên sản phẩm (A-Z)" },
            { value: "name-desc", label: "Tên sản phẩm (Z-A)" },
            { value: "price-asc", label: "Giá bán (thấp → cao)" },
            { value: "price-desc", label: "Giá bán (cao → thấp)" },
          ]}
        />
      </div>
      <div className="flex justify-center">
        <div className="relative h-100 max-h-200 w-full max-w-7xl lg:h-150">
          <Image
            src={test} // get the category image
            fill
            placeholder="blur"
            alt="product"
            className="aspect-[3/4] rounded-sm object-cover"
          />
          <ViewProductLink productId={productId} disabled={!products?.length} />
        </div>
      </div>
      {/* products of a category */}
      <ProductList products={products} />
    </div>
  );
}

export default ProductSection;

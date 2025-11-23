import { getProductsByCategoryId } from "@/app/_lib/data-service";
import ProductList from "@/app/_components/ProductList";
import ViewProductLink from "@/app/_components/ViewProductLink";
import SortBy from "@/app/_components/SortBy";
import NoProductsFound from "@/app/_components/NoProductsFound";
import ImageCarousel from "@/app/_components/ImageCarousel";

async function ProductSection({ category }) {
  const { products } = await getProductsByCategoryId(category?.id);

  if (!products) return <NoProductsFound />;

  const firstProductId = products?.[0]?.id;

  return (
    <div className="grid">
      <div className="flex flex-wrap items-center justify-between pb-3">
        <div className="font-semibold">{products?.length} Sản phẩm</div>
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
      <div className="relative w-full">
        <ImageCarousel
          images={[category?.image, category?.image, category?.image]}
        />
        <ViewProductLink
          productId={firstProductId}
          disabled={!products?.length}
        />
      </div>
      {/* products of a category */}
      <ProductList products={products} />
    </div>
  );
}

export default ProductSection;

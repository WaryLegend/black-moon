import StickyFilterWrapper from "@/app/_components/StickyFilterWrapper";
import ProductFilter from "@/app/_components/ProductFilter";
import Link from "next/link";
import ProductSection from "@/app/_components/ProductSection";
import BreadCrumbNav from "@/app/_components/BreadCrumbNav";

// fetch products by categoryId
const products = [
  { id: 1, name: "ĐỒ MẶC NGOÀI" },
  { id: 2, name: "QUẦN" },
  { id: 3, name: "HEATTECH" },
  { id: 4, name: "ĐỒ BẦU" },
  { id: 5, name: "ÁO THUN, ÁO NI & ÁO GIẢ LÔNG CỪU" },
  { id: 6, name: "AIRism" },
  { id: 7, name: "Đồ mặc nhà" },
];

// const products = [];

async function Page({ params }) {
  //use this to fetch products
  const { categoryId } = await params;

  return (
    <div className="flex flex-col gap-1 md:gap-4">
      {/* sub-header, title, navigation */}
      <BreadCrumbNav params={params} />
      {/* filters */}
      <StickyFilterWrapper>
        <ProductFilter />
      </StickyFilterWrapper>

      {/* products section */}
      {products?.length ? (
        <ProductSection products={products} />
      ) : (
        <span className="bg-accent-100 rounded-sm p-10 text-center">
          <p className="text-2xl font-semibold">
            Tên_thể_loại chưa có sản phẩm nào.{" "}
            <Link
              href={href}
              className="text-accent-600 hover:text-accent-700 text-lg font-normal underline"
            >
              Quay lại
            </Link>
          </p>
        </span>
      )}
    </div>
  );
}

export default Page;

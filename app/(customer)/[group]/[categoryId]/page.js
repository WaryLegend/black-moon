import StickyFilterWrapper from "@/app/_components/StickyFilterWrapper";
import ProductFilter from "@/app/_components/ProductFilter";
import ProductSection from "@/app/_components/ProductSection";
import BreadCrumbNav from "@/app/_components/BreadCrumbNav";
import { ParamsProvider } from "@/app/_context/NavParamsContext";
import NoProductsFound from "@/app/_components/NoProductsFound";

export const metadata = {
  title: "Name of category",
};

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

// const products = []; // for testing empty

export default async function Page({ params }) {
  const trueParams = await params;

  //use this to fetch products
  // const {categoryId} = trueParams; // later use

  return (
    <ParamsProvider params={trueParams}>
      <div className="flex flex-col gap-1 md:gap-4">
        {/* sub-header, title, navigation */}
        <BreadCrumbNav />
        {/* filters */}
        <StickyFilterWrapper>
          <ProductFilter />
        </StickyFilterWrapper>

        {/* products section */}
        {products?.length ? (
          <ProductSection products={products} />
        ) : (
          <NoProductsFound />
        )}
      </div>
    </ParamsProvider>
  );
}

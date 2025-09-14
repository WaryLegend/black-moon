import AddProduct from "@/app/_components/products/AddProduct";
import ProductTable from "@/app/_components/products/ProductTable";
import ProductTableOperations from "@/app/_components/products/ProductTableOperations";
import SortBy from "@/app/_components/SortBy";
import Spinner from "@/app/_components/Spinner";
import { Suspense } from "react";

export const metadata = {
  title: "Products",
};

export default function Page() {
  return (
    <>
      <div>
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold">All products</h1>
          <SortBy
            options={[
              { value: "createdDate-desc", label: "Date (recent first)" },
              { value: "createdDate-asc", label: "Date (earlier first)" },
              { value: "name-asc", label: "Name (A-Z)" },
              { value: "name-desc", label: "Name (Z-A)" },
              { value: "price-asc", label: "Price (lowest first)" },
              { value: "price-desc", label: "Price (highest first)" },
            ]}
          />
        </div>

        <ProductTableOperations />
      </div>

      <div className="flex flex-col gap-4">
        <Suspense callback={<Spinner color="var(--color-accent-800)" />}>
          <ProductTable />
          <AddProduct />
        </Suspense>
      </div>
    </>
  );
}

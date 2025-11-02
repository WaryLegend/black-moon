import ProductTableAndBtns from "@/app/_components/products/ProductTableAndBtns";
import ProductTableOperations from "@/app/_components/products/ProductTableOperations";
import SortBy from "@/app/_components/SortBy";
import Spinner from "@/app/_components/Spinner";
import { Suspense } from "react";

export const metadata = {
  title: "Products",
};

export default async function Page({ searchParams }) {
  const filterParams = await searchParams;

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
              { value: "category-asc", label: "Category (A-Z)" },
              { value: "category-desc", label: "Category (Z-A)" },
              { value: "basePrice-asc", label: "Price (lowest first)" },
              { value: "basePrice-desc", label: "Price (highest first)" },
            ]}
          />
        </div>

        <ProductTableOperations />
      </div>

      <div className="flex flex-col gap-4">
        <Suspense
          fallback={
            <Spinner
              color="var(--color-accent-600)"
              className="my-0.5 self-center"
            />
          }
        >
          <ProductTableAndBtns searchParams={filterParams} />
        </Suspense>
      </div>
    </>
  );
}

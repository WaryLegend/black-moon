import AddProduct from "@/app/_components/products/AddProduct";
import ProductTable from "@/app/_components/products/ProductTable";
import ProductTableOperations from "@/app/_components/products/ProductTableOperations";
import Spinner from "@/app/_components/Spinner";
import { Suspense } from "react";

export const metadata = {
  title: "Products",
};

export default function Page() {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">All products</h1>
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

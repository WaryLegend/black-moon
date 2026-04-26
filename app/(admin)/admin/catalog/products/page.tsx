import ProductTableAndBtns from "@/components/admin/products/ProductTableAndBtns";
import ProductTableOperations from "@/components/admin/products/ProductTableOperations";
import { AppPageProps } from "@/types/page-props";
import type { ProductsPageSearchParams } from "@/types/products";

export const metadata = {
  title: "Products",
};

export default async function ProductsPage({
  searchParams,
}: AppPageProps<unknown, ProductsPageSearchParams>) {
  const query = await searchParams;

  return (
    <>
      <header className="flex flex-col items-center justify-between gap-3 sm:items-start">
        <h1 className="text-3xl font-semibold">All products</h1>
        <ProductTableOperations />
      </header>
      <ProductTableAndBtns searchParams={query} />
    </>
  );
}

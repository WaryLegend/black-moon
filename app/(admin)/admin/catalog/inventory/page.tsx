import ProductVariantTableAndBtns from "@/components/admin/inventory/ProductVariantTableAndBtns";
import ProductVariantTableOperations from "@/components/admin/inventory/ProductVariantTableOperations";
import type { AppPageProps } from "@/types/page-props";
import type { ProductVariantsPageSearchParams } from "@/types/products";

export const metadata = {
  title: "Inventory",
};

export default async function InventoryPage({
  searchParams,
}: AppPageProps<{}, ProductVariantsPageSearchParams>) {
  const query = await searchParams;

  return (
    <>
      <header className="flex flex-col items-center justify-between gap-3 lg:items-start">
        <h1 className="text-3xl font-semibold">All product variants</h1>
        <ProductVariantTableOperations />
      </header>

      <ProductVariantTableAndBtns searchParams={query} />
    </>
  );
}

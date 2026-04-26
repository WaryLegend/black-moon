import ProductVariantTableAndBtns from "@/components/admin/inventory/ProductVariantTableAndBtns";
import ProductVariantTableOperations from "@/components/admin/inventory/ProductVariantTableOperations";
import type { AppPageProps } from "@/types/page-props";
import type { ProductVariantsPageSearchParams } from "@/types/products";
import Link from "next/link";
import { FaHistory } from "react-icons/fa";

export const metadata = {
  title: "Inventory",
};

export default async function InventoryPage({
  searchParams,
}: AppPageProps<unknown, ProductVariantsPageSearchParams>) {
  const query = await searchParams;

  return (
    <>
      <header className="flex flex-col items-center justify-between gap-3">
        <div className="flex w-full flex-wrap items-center justify-between gap-3">
          <h1 className="text-3xl font-semibold">All product variants</h1>
          <Link
            href="/admin/catalog/inventory/history"
            className="text-accent-600 hover:text-accent-700 flex items-center gap-1 hover:underline"
          >
            <FaHistory /> View stock history
          </Link>
        </div>
        <ProductVariantTableOperations />
      </header>

      <ProductVariantTableAndBtns searchParams={query} />
    </>
  );
}

import InventoryHistoryTableAndDetails from "@/components/admin/inv-history/InventoryHistoryTableAndDetails";
import InventoryHistoryTableOperations from "@/components/admin/inv-history/InventoryHistoryTableOperations";
import InvHeader from "@/components/admin/inv-history/InvHeader";
import type { InventoryHistoryPageSearchParams } from "@/types/inventory-history";
import type { AppPageProps } from "@/types/page-props";

export const metadata = {
  title: "Inventory History",
};

export default async function InventoryHistoryPage({
  searchParams,
}: AppPageProps<unknown, InventoryHistoryPageSearchParams>) {
  const query = await searchParams;

  return (
    <>
      <header className="flex flex-col items-center justify-between gap-3 sm:items-start">
        <InvHeader />
        <InventoryHistoryTableOperations />
      </header>

      <InventoryHistoryTableAndDetails searchParams={query} />
    </>
  );
}

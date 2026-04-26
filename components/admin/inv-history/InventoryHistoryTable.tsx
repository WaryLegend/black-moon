"use client";

import Pagination from "@/components/ui/Pagination";
import Table from "@/components/ui/Table";
import type {
  InventoryHistoryListMeta,
  InventoryHistorySummary,
} from "@/types/inventory-history";

import InventoryHistoryRow from "./InventoryHistoryRow";

type InventoryHistoryTableProps = {
  rows: InventoryHistorySummary[];
  meta?: InventoryHistoryListMeta;
};

export default function InventoryHistoryTable({
  rows,
  meta,
}: InventoryHistoryTableProps) {
  const { totalItems: total, pageSize } = meta ?? {};

  return (
    <Table columns="0.5fr 1.2fr 0.6fr 0.6fr 0.6fr 1fr 1.3fr 1fr">
      <Table.Header>
        <div>ID</div>
        <div>SKU</div>
        <div>Order</div>
        <div>Old Qty</div>
        <div>New Qty</div>
        <div>Type</div>
        <div>Timestamp</div>
        <div>Created By</div>
      </Table.Header>

      <Table.Body
        data={rows}
        render={(history) => (
          <InventoryHistoryRow key={history.id} history={history} />
        )}
      />

      <Table.Footer>
        <Pagination total={total ?? 0} pageSize={pageSize} />
      </Table.Footer>
    </Table>
  );
}

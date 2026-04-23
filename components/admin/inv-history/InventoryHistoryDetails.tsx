import { fDateTime } from "@/utils/date";
import type { InventoryHistorySummary } from "@/types/inventory-history";
import type { ReactNode } from "react";

import InventoryHistoryActor from "./InventoryHistoryActor";
import { capitalizeFirst } from "@/utils/capitalize";
import { cn } from "@/utils/cn";

type InventoryHistoryDetailsProps = {
  history: InventoryHistorySummary;
  onCloseModal?: () => void;
};

export default function InventoryHistoryDetails({
  history,
}: InventoryHistoryDetailsProps) {
  const {
    id,
    orderId,
    productVariant,
    typeOfChange,
    changeInQuantity,
    quantityAfterChange,
    timestamp,
    createdAt,
    createdByUser,
    updatedByUser,
    notes,
  } = history;

  const oldQty = quantityAfterChange - changeInQuantity;
  const change =
    changeInQuantity > 0 ? `+${changeInQuantity}` : String(changeInQuantity);

  return (
    <div className="flex min-w-[min(92vw,44rem)] flex-col gap-4">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold">Inventory History Detail</h2>
        <p className="text-primary-500 text-sm">
          Chi tiết bản ghi thay đổi tồn kho #{id}.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <Info label="History ID" value={`#${String(id)}`} />
        <Info label="Order ID" value={orderId ? String(orderId) : "−"} />
        <Info label="SKU" value={productVariant?.sku ?? "−"} />
        <Info
          label="Type"
          className="text-primary-700 font-semibold italic"
          value={capitalizeFirst(typeOfChange?.replace("_", " ")) ?? "−"}
        />
        <Info label="Old Quantity" className="text-accent-600" value={oldQty} />
        <Info
          label="New Quantity"
          className="text-accent-600"
          value={
            <>
              {quantityAfterChange}{" "}
              <span
                className={
                  changeInQuantity > 0
                    ? "font-semibold text-green-600"
                    : changeInQuantity < 0
                      ? "font-semibold text-red-600"
                      : "text-primary-600"
                }
              >
                ({change})
              </span>
            </>
          }
        />
        <Info label="Timestamp" value={fDateTime(timestamp)} />
        <Info label="Created At" value={fDateTime(createdAt)} />
        <Info
          label="Created By"
          value={
            <InventoryHistoryActor user={createdByUser} tooltipPosition="top" />
          }
        />
        <Info
          label="Updated By"
          value={
            <InventoryHistoryActor user={updatedByUser} tooltipPosition="top" />
          }
        />
      </div>

      <div className="border-primary-200 bg-primary-50 rounded-lg border p-3">
        <p className="text-primary-700 mb-1 text-sm font-semibold">Notes</p>
        <p className="text-primary-600 text-sm whitespace-pre-wrap">
          {notes ?? "(Không có ghi chú)"}
        </p>
      </div>

      {productVariant?.product ? (
        <div className="border-primary-200 bg-primary-50 rounded-lg border p-3">
          <p className="text-primary-700 mb-2 text-sm font-semibold">Product</p>
          <div className="grid gap-2 sm:grid-cols-2">
            <Info label="Product Name" value={productVariant.product.name} />
            <Info label="Product Slug" value={productVariant.product.slug} />
            <Info label="Color" value={productVariant.color ?? "-"} />
            <Info label="Size" value={productVariant.size ?? "-"} />
          </div>
        </div>
      ) : null}
    </div>
  );
}

function Info({
  label,
  value,
  className,
}: {
  label: string;
  value: ReactNode;
  className?: string;
}) {
  return (
    <div className="space-y-0.5">
      <p className="text-primary-500 text-xs tracking-wide uppercase">
        {label}
      </p>
      <div className={cn(`text-primary-800 text-[1rem]`, className)}>
        {value}
      </div>
    </div>
  );
}

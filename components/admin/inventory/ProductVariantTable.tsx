"use client";

import Pagination from "@/components/ui/Pagination";
import SelectionCheckbox from "@/components/ui/SelectionCheckbox";
import Table from "@/components/ui/Table";
import ProductVariantRow from "@/components/admin/inventory/ProductVariantRow";
import type {
  ProductVariantListMeta,
  ProductVariantSummary,
} from "@/types/products";

type ProductVariantTableProps = {
  variants: ProductVariantSummary[];
  meta?: ProductVariantListMeta;
  selectedIds: number[];
  onToggleAll: (checked: boolean) => void;
  onToggleOne: (variantId: number, checked: boolean) => void;
};

export default function ProductVariantTable({
  variants,
  meta,
  selectedIds,
  onToggleAll,
  onToggleOne,
}: ProductVariantTableProps) {
  const pageIds = variants.map((variant) => variant.id);
  const allSelected =
    pageIds.length > 0 && pageIds.every((id) => selectedIds.includes(id));
  const partiallySelected = selectedIds.length > 0 && !allSelected;

  const { totalItems: total, pageSize } = meta ?? {};

  return (
    <Table columns="0.6fr 0.8fr 1.4fr 1fr 0.8fr 1fr 0.8fr 0.5fr 0.8fr">
      <Table.Header>
        <div className="flex items-center gap-2">
          <SelectionCheckbox
            checked={allSelected}
            indeterminate={partiallySelected}
            onChange={onToggleAll}
            ariaLabel="Select all variants on current page"
          />
          <span className="text-primary-500 text-[0.65rem] font-medium normal-case">
            All
          </span>
        </div>
        <div>Image</div>
        <div>SKU</div>
        <div>Color</div>
        <div>Size</div>
        <div>Price</div>
        <div>Quantity</div>
        <div>Deleted</div>
        <div></div>
      </Table.Header>

      <Table.Body
        data={variants}
        render={(variant) => (
          <ProductVariantRow
            key={variant.id}
            variant={variant}
            isSelected={selectedIds.includes(variant.id)}
            onSelect={(checked) => onToggleOne(variant.id, checked)}
          />
        )}
      />

      <Table.Footer>
        <Pagination total={total ?? 0} pageSize={pageSize} />
      </Table.Footer>
    </Table>
  );
}

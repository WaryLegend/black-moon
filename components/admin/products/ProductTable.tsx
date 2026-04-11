"use client";

import Table from "@/components/ui/Table";
import Pagination from "@/components/ui/Pagination";
import SelectionCheckbox from "@/components/ui/SelectionCheckbox";
import type { ProductSummary } from "@/types/products";

import ProductRow from "./ProductRow";

type ProductTableProps = {
  products: ProductSummary[];
  total: number;
  selectedIds: number[];
  onToggleAll: (checked: boolean) => void;
  onToggleOne: (productId: number, checked: boolean) => void;
};

function ProductTable({
  products,
  total,
  selectedIds,
  onToggleAll,
  onToggleOne,
}: ProductTableProps) {
  const pageIds = products.map((product) => product.id);
  const allSelected =
    pageIds.length > 0 && pageIds.every((id) => selectedIds.includes(id));
  const partiallySelected = selectedIds.length > 0 && !allSelected;

  return (
    <Table columns="0.7fr 0.9fr 2fr 1.6fr 1.3fr 0.8fr 1fr">
      <Table.Header>
        <div className="flex items-center gap-2">
          <SelectionCheckbox
            checked={allSelected}
            indeterminate={partiallySelected}
            onChange={onToggleAll}
            ariaLabel="Select all on current page"
          />
          <span className="text-primary-500 text-[0.65rem] font-medium normal-case">
            All
          </span>
        </div>
        <div>Image</div>
        <div>Name</div>
        <div>Slug</div>
        <div>Category</div>
        <div>Deleted</div>
        <div></div>
      </Table.Header>

      <Table.Body
        data={products}
        render={(product) => (
          <ProductRow
            key={product.id}
            product={product}
            isSelected={selectedIds.includes(product.id)}
            onSelect={(checked) => onToggleOne(product.id, checked)}
          />
        )}
      />

      <Table.Footer>
        <Pagination count={total} />
      </Table.Footer>
    </Table>
  );
}

export default ProductTable;

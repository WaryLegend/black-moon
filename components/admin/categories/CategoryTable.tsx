"use client";

import Table from "@/components/ui/Table";
import CategoryRow from "./CagetoryRow";
import Pagination from "@/components/ui/Pagination";
import SelectionCheckbox from "@/components/ui/SelectionCheckbox";
import { CategorySummary } from "@/types/categories";

type CategoryTableProps = {
  categories: CategorySummary[];
  total: number;
  selectedIds: number[];
  onToggleAll: (checked: boolean) => void;
  onToggleOne: (categoryId: number, checked: boolean) => void;
};

function CategoryTable({
  categories,
  total,
  selectedIds,
  onToggleAll,
  onToggleOne,
}: CategoryTableProps) {
  // Logic hiển thị checkbox tổng: Tính toán tại chỗ để UI luôn chính xác
  const pageIds = categories.map((c) => c.id);
  const allSelected =
    pageIds.length > 0 && pageIds.every((id) => selectedIds.includes(id));
  const partiallySelected = selectedIds.length > 0 && !allSelected;

  return (
    <Table columns="0.8fr 0.9fr 1.8fr 1.8fr 1.2fr 0.8fr 1fr">
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
        <div>Group</div>
        <div>Deleted</div>
        <div></div>
      </Table.Header>
      <Table.Body
        data={categories}
        render={(category) => (
          <CategoryRow
            category={category}
            key={category.id}
            isSelected={selectedIds.includes(category.id)}
            onSelect={(checked) => onToggleOne(category.id, checked)}
          />
        )}
      />
      <Table.Footer>
        <Pagination count={total} />
      </Table.Footer>
    </Table>
  );
}

export default CategoryTable;

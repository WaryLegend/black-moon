"use client";

import Table from "@/components/ui/Table";
import GroupRow from "./GroupRow";
import Pagination from "@/components/ui/Pagination";
import SelectionCheckbox from "@/components/ui/SelectionCheckbox";
import type { TargetGroupSummary } from "@/types/groups";

type GroupTableProps = {
  groups: TargetGroupSummary[];
  total: number;
  selectedIds: number[];
  onToggleAll: (checked: boolean) => void;
  onToggleOne: (groupId: number, checked: boolean) => void;
};

export default function GroupTable({
  groups,
  total,
  selectedIds,
  onToggleAll,
  onToggleOne,
}: GroupTableProps) {
  // Logic hiển thị checkbox tổng: Tính toán tại chỗ để UI luôn chính xác
  const pageIds = groups.map((c) => c.id);
  const allSelected =
    pageIds.length > 0 && pageIds.every((id) => selectedIds.includes(id));
  const partiallySelected = selectedIds.length > 0 && !allSelected;

  return (
    <Table columns="0.8fr 2fr 2fr 1fr 1fr">
      <Table.Header>
        <div className="flex items-center gap-2">
          <SelectionCheckbox
            checked={allSelected}
            indeterminate={partiallySelected}
            onChange={onToggleAll}
            ariaLabel="Select all groups on current page"
          />
          <span className="text-primary-500 text-[0.65rem] font-medium normal-case">
            All
          </span>
        </div>
        <div>Name</div>
        <div>Slug</div>
        <div>Deleted</div>
        <div></div>
      </Table.Header>
      <Table.Body
        data={groups}
        render={(group) => (
          <GroupRow
            group={group}
            key={group.id}
            isSelected={selectedIds.includes(group.id)}
            onSelect={(checked) => onToggleOne(group.id, checked)}
          />
        )}
      />
      <Table.Footer>
        <Pagination count={total} />
      </Table.Footer>
    </Table>
  );
}

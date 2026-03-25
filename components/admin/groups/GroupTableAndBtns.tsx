"use client";

import { useEffect, useMemo } from "react";
import toast from "react-hot-toast";

import BulkSelectionToast from "@/components/ui/BulkSelectionToast";
import Spinner from "@/components/ui/Spinner";
import {
  normalizeSortField,
  parseListSearchParams,
  parsePageParam,
} from "@/utils/searchParams";
import type {
  GroupsPageSearchParams,
  TargetGroupSort,
  TargetGroupSortField,
} from "@/types/groups";

import { useGroups } from "./useGroups";
import { useBulkSoftDeleteGroups } from "./useBulkSoftDeleteGroups";
import AddGroup from "./AddGroup";
import GroupTable from "./GroupTable";
import { useBulkRestoreGroups } from "./useBulkRestoreGroups";
import { useTableSelection } from "@/hooks/useTableSelection";

const SORT_FIELDS: TargetGroupSortField[] = ["createdAt", "name"];

type GroupsTableAndBtnsProps = {
  searchParams: GroupsPageSearchParams;
};

function GroupsTableAndBtns({ searchParams }: GroupsTableAndBtnsProps) {
  const page = parsePageParam(searchParams.page);
  const { sortBy } = parseQueryParams(searchParams);

  const { isPending, groups, total } = useGroups({
    page,
    sortBy,
  });
  const { mutate: bulkSoftDelete, isPending: isBulkDeleting } =
    useBulkSoftDeleteGroups();
  const { mutate: bulkRestore, isPending: isBulkRestoring } =
    useBulkRestoreGroups();
  const isAnyActionPending = isBulkDeleting || isBulkRestoring;

  // Tính pageIds để Hook biết danh sách ID của trang hiện tại
  const pageIds = useMemo(() => groups?.map((c) => c.id) || [], [groups]);
  const { selectedIds, handleToggleAll, handleToggleOne, clearSelection } =
    useTableSelection(pageIds);

  // Tìm các items được chọn để biết trạng thái isDeleted của chúng
  const selectedItems = useMemo(
    () => groups.filter((c) => selectedIds.includes(c.id)),
    [groups, selectedIds],
  );
  const hasActive = selectedItems.some((c) => !c.isDeleted);
  const hasDeleted = selectedItems.some((c) => c.isDeleted);

  // Reset selection khi chuyển trang (Tránh chọn nhầm data cũ)
  useEffect(() => {
    clearSelection();
  }, [page, clearSelection]);

  useEffect(() => {
    if (selectedIds.length === 0) {
      toast.remove("bulk-selection");
      return;
    }

    toast.custom(
      () => (
        <BulkSelectionToast
          selectedCount={selectedIds.length}
          disabled={isAnyActionPending}
          onCancel={clearSelection}
          actions={[
            // Nếu có ít nhất 1 cái CHƯA XÓA trong list chọn -> Hiện nút Xóa
            ...(hasActive
              ? [
                  {
                    label: "Mark as deleted",
                    variant: "danger" as const,
                    onClick: () =>
                      bulkSoftDelete(selectedIds, {
                        onSuccess: clearSelection,
                      }),
                  },
                ]
              : []),
            // Nếu có ít nhất 1 cái ĐÃ XÓA trong list chọn -> Hiện nút Khôi phục
            ...(hasDeleted
              ? [
                  {
                    label: "Restore all",
                    onClick: () =>
                      bulkRestore(selectedIds, { onSuccess: clearSelection }),
                  },
                ]
              : []),
          ]}
        />
      ),
      { id: "bulk-selection", duration: Infinity, position: "bottom-center" },
    );
    return () => {
      toast.remove("bulk-selection");
    };
  }, [
    selectedIds,
    hasActive,
    hasDeleted,
    isAnyActionPending,
    clearSelection,
    bulkSoftDelete,
    bulkRestore,
  ]);

  if (isPending)
    return (
      <Spinner color="var(--color-accent-600)" className="my-10 self-center" />
    );

  return (
    <div className="flex flex-col gap-4">
      <GroupTable
        groups={groups}
        total={total}
        selectedIds={selectedIds}
        onToggleAll={handleToggleAll}
        onToggleOne={handleToggleOne}
      />
      <AddGroup />
    </div>
  );
}

function parseQueryParams(searchParams: GroupsPageSearchParams): {
  sortBy: TargetGroupSort;
} {
  const { sortBy } = parseListSearchParams(searchParams, {
    defaultSort: "createdAt-desc",
  });

  const field = normalizeSortField(sortBy.field, SORT_FIELDS, "createdAt");

  return {
    sortBy: {
      field,
      direction: sortBy.direction,
    },
  };
}

export default GroupsTableAndBtns;

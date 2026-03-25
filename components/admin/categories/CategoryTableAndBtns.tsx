"use client";

import { useEffect, useMemo } from "react";
import toast from "react-hot-toast";

import type {
  CategoriesPageSearchParams,
  CategorySort,
  CategorySortField,
  ListCategoriesFilters,
} from "@/types/categories";

import { useCategories } from "./useCategories";
import AddCategory from "./AddCategory";
import CategoryTable from "./CategoryTable";
import Spinner from "@/components/ui/Spinner";
import {
  normalizeSortField,
  parseListSearchParams,
  parsePageParam,
} from "@/utils/searchParams";
import { useBulkSoftDeleteCategories } from "./useBulkSoftDeleteCategories";
import { useTableSelection } from "@/hooks/useTableSelection";
import { useBulkRestoreCategories } from "./useBulkRestoreCategories";
import BulkSelectionToast from "@/components/ui/BulkSelectionToast";

const SORT_FIELDS: CategorySortField[] = ["createdAt", "name"];

type CategoryTableAndBtnsProps = {
  searchParams: CategoriesPageSearchParams;
};

function CategoryTableAndBtns({ searchParams }: CategoryTableAndBtnsProps) {
  const page = parsePageParam(searchParams.page);
  const { filters, sortBy } = parseQueryParams(searchParams);
  const groupsFilterKey = (filters.groups ?? []).join(",");

  const { isPending, categories, total } = useCategories({
    page,
    filters,
    sortBy,
  });
  const { mutate: bulkSoftDelete, isPending: isBulkDeleting } =
    useBulkSoftDeleteCategories();
  const { mutate: bulkRestore, isPending: isBulkRestoring } =
    useBulkRestoreCategories();

  const isAnyActionPending = isBulkDeleting || isBulkRestoring;

  // Tính pageIds để Hook biết danh sách ID của trang hiện tại
  const pageIds = useMemo(
    () => categories?.map((c) => c.id) || [],
    [categories],
  );
  const { selectedIds, handleToggleAll, handleToggleOne, clearSelection } =
    useTableSelection(pageIds);

  // Tìm các items được chọn để biết trạng thái isDeleted của chúng
  const selectedItems = useMemo(
    () => categories.filter((c) => selectedIds.includes(c.id)),
    [categories, selectedIds],
  );
  const hasActive = selectedItems.some((c) => !c.isDeleted);
  const hasDeleted = selectedItems.some((c) => c.isDeleted);

  // Reset selection khi filter hoặc chuyển trang (Tránh chọn nhầm data cũ)
  useEffect(() => {
    clearSelection();
  }, [page, filters.search, groupsFilterKey, clearSelection]);

  // Quản lý Toast tập trung
  useEffect(() => {
    if (selectedIds.length === 0) {
      toast.remove("bulk-selection");
      return;
    }

    toast.custom(
      () => (
        <BulkSelectionToast
          confirmLabel="Mark as deleted"
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
      <CategoryTable
        categories={categories}
        total={total}
        selectedIds={selectedIds}
        onToggleAll={handleToggleAll}
        onToggleOne={handleToggleOne}
      />
      <AddCategory />
    </div>
  );
}

function parseQueryParams(searchParams: CategoriesPageSearchParams): {
  filters: ListCategoriesFilters;
  sortBy: CategorySort;
} {
  const { filters, sortBy } = parseListSearchParams<ListCategoriesFilters>(
    searchParams,
    {
      filterConfig: {
        groups: {
          allowMulti: true,
          splitCommaValues: true,
          parseItem: (value) => {
            const normalized = value.trim().toLowerCase();
            return normalized ? normalized : undefined;
          },
        },
        search: {
          parse: (value) => {
            const normalized = value.trim();
            return normalized ? normalized : undefined;
          },
        },
      },
      defaultSort: "createdAt-desc",
    },
  );

  const normalizedField = normalizeSortField(
    sortBy.field,
    SORT_FIELDS,
    "createdAt",
  );

  return {
    filters,
    sortBy: {
      field: normalizedField,
      direction: sortBy.direction,
    },
  };
}

export default CategoryTableAndBtns;

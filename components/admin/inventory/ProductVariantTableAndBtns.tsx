"use client";

import { useEffect, useMemo } from "react";
import toast from "react-hot-toast";

import BulkSelectionToast from "@/components/ui/BulkSelectionToast";
import Spinner from "@/components/ui/Spinner";
import { useTableSelection } from "@/hooks/useTableSelection";
import type {
  ListProductVariantsFilters,
  ProductVariantSort,
  ProductVariantSortField,
  ProductVariantsPageSearchParams,
} from "@/types/products";
import {
  normalizeSortField,
  parseListSearchParams,
  parsePageParam,
} from "@/utils/searchParams";

import AddProductVariant from "./AddProductVariant";
import ProductVariantTable from "./ProductVariantTable";
import { useBulkRestoreProductVariants } from "./useBulkRestoreProductVariants";
import { useBulkSoftDeleteProductVariants } from "./useBulkSoftDeleteProductVariants";
import { useProductVariants } from "./useProductVariants";

const SORT_FIELDS: ProductVariantSortField[] = [
  "createdAt",
  "price",
  "quantity",
];

type ProductVariantTableAndBtnsProps = {
  searchParams: ProductVariantsPageSearchParams;
};

export default function ProductVariantTableAndBtns({
  searchParams,
}: ProductVariantTableAndBtnsProps) {
  const page = parsePageParam(searchParams.page);
  const { filters, sortBy } = parseQueryParams(searchParams);
  const productsFilterKey = (filters.products ?? []).join(",");
  const colorsFilterKey = (filters.colors ?? []).join(",");
  const sizesFilterKey = (filters.sizes ?? []).join(",");

  const { isPending, variants, total } = useProductVariants({
    page,
    filters,
    sortBy,
  });

  const { mutate: bulkSoftDelete, isPending: isBulkDeleting } =
    useBulkSoftDeleteProductVariants();
  const { mutate: bulkRestore, isPending: isBulkRestoring } =
    useBulkRestoreProductVariants();

  const isAnyActionPending = isBulkDeleting || isBulkRestoring;

  const pageIds = useMemo(
    () => variants.map((variant) => variant.id),
    [variants],
  );
  const { selectedIds, handleToggleAll, handleToggleOne, clearSelection } =
    useTableSelection(pageIds);

  const selectedItems = useMemo(
    () => variants.filter((variant) => selectedIds.includes(variant.id)),
    [variants, selectedIds],
  );

  const hasActive = selectedItems.some((variant) => !variant.isDeleted);
  const hasDeleted = selectedItems.some((variant) => variant.isDeleted);

  useEffect(() => {
    clearSelection();
  }, [
    page,
    filters.search,
    productsFilterKey,
    colorsFilterKey,
    sizesFilterKey,
    clearSelection,
  ]);

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
            ...(hasDeleted
              ? [
                  {
                    label: "Restore all",
                    onClick: () =>
                      bulkRestore(selectedIds, {
                        onSuccess: clearSelection,
                      }),
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

  if (isPending) {
    return (
      <Spinner color="var(--color-accent-600)" className="my-10 self-center" />
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <ProductVariantTable
        variants={variants}
        total={total}
        selectedIds={selectedIds}
        onToggleAll={handleToggleAll}
        onToggleOne={handleToggleOne}
      />
      <AddProductVariant />
    </div>
  );
}

function parseQueryParams(searchParams: ProductVariantsPageSearchParams): {
  filters: ListProductVariantsFilters;
  sortBy: ProductVariantSort;
} {
  const { filters, sortBy } = parseListSearchParams<ListProductVariantsFilters>(
    searchParams,
    {
      filterConfig: {
        search: {
          parse: (value) => {
            const normalized = value.trim();
            return normalized ? normalized : undefined;
          },
        },
        products: {
          allowMulti: true,
          splitCommaValues: true,
          parseItem: (value) => {
            const normalized = value.trim().toLowerCase();
            return normalized ? normalized : undefined;
          },
        },
        colors: {
          allowMulti: true,
          splitCommaValues: true,
          parseItem: (value) => {
            const normalized = value.trim().toUpperCase();
            return normalized ? normalized : undefined;
          },
        },
        sizes: {
          allowMulti: true,
          splitCommaValues: true,
          parseItem: (value) => {
            const normalized = value.trim().toUpperCase();
            return normalized ? normalized : undefined;
          },
        },
      },
      defaultSort: "createdAt-desc",
    },
  );

  const field = normalizeSortField(sortBy.field, SORT_FIELDS, "createdAt");

  return {
    filters,
    sortBy: {
      field,
      direction: sortBy.direction,
    },
  };
}

"use client";

import { useEffect, useMemo } from "react";
import toast from "react-hot-toast";

import BulkSelectionToast from "@/components/ui/BulkSelectionToast";
import Spinner from "@/components/ui/Spinner";
import { useTableSelection } from "@/hooks/useTableSelection";
import type {
  ListProductsFilters,
  ProductSort,
  ProductSortField,
  ProductsPageSearchParams,
} from "@/types/products";
import {
  normalizeSortField,
  parseListSearchParams,
  parsePageParam,
} from "@/utils/searchParams";

import AddProduct from "./AddProduct";
import ProductTable from "./ProductTable";
import { useBulkRestoreProducts } from "./useBulkRestoreProducts";
import { useBulkSoftDeleteProducts } from "./useBulkSoftDeleteProducts";
import { useProducts } from "./useProducts";

const SORT_FIELDS: ProductSortField[] = ["createdAt", "name"];

type ProductTableAndBtnsProps = {
  searchParams: ProductsPageSearchParams;
};

function ProductTableAndBtns({ searchParams }: ProductTableAndBtnsProps) {
  const page = parsePageParam(searchParams.page);
  const { filters, sortBy } = parseQueryParams(searchParams);

  const { isPending, products, meta } = useProducts({
    page,
    filters,
    sortBy,
  });

  const { mutate: bulkSoftDelete, isPending: isBulkDeleting } =
    useBulkSoftDeleteProducts();
  const { mutate: bulkRestore, isPending: isBulkRestoring } =
    useBulkRestoreProducts();

  const isAnyActionPending = isBulkDeleting || isBulkRestoring;

  const pageIds = useMemo(
    () => products.map((product) => product.id),
    [products],
  );
  const { selectedIds, handleToggleAll, handleToggleOne, clearSelection } =
    useTableSelection(pageIds);

  const selectedItems = useMemo(
    () => products.filter((product) => selectedIds.includes(product.id)),
    [products, selectedIds],
  );
  const categoriesFilterKey = (filters.categories ?? []).join(",");
  const hasActive = selectedItems.some((product) => !product.isDeleted);
  const hasDeleted = selectedItems.some((product) => product.isDeleted);

  useEffect(() => {
    clearSelection();
  }, [page, filters.search, categoriesFilterKey, clearSelection]);

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
      <ProductTable
        products={products}
        meta={meta}
        selectedIds={selectedIds}
        onToggleAll={handleToggleAll}
        onToggleOne={handleToggleOne}
      />
      <AddProduct />
    </div>
  );
}

function parseQueryParams(searchParams: ProductsPageSearchParams): {
  filters: ListProductsFilters;
  sortBy: ProductSort;
} {
  const { filters, sortBy } = parseListSearchParams<ListProductsFilters>(
    searchParams,
    {
      filterConfig: {
        search: {
          parse: (value) => {
            const normalized = value.trim();
            return normalized ? normalized : undefined;
          },
        },
        categories: {
          allowMulti: true,
          splitCommaValues: true,
          parseItem: (value) => {
            const normalized = value.trim().toLowerCase();
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

export default ProductTableAndBtns;

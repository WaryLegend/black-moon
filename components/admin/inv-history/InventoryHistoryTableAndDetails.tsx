"use client";

import Spinner from "@/components/ui/Spinner";
import type {
  InventoryHistoryPageSearchParams,
  InventoryHistorySort,
  InventoryHistorySortField,
  InventoryHistoryType,
  ListInventoryHistoryFilters,
} from "@/types/inventory-history";
import {
  normalizeSortField,
  parseListSearchParams,
  parsePageParam,
} from "@/utils/searchParams";

import InventoryHistoryTable from "./InventoryHistoryTable";
import { useInventoryHistory } from "./useInventoryHistory";

const SORT_FIELDS: InventoryHistorySortField[] = ["timestamp", "createdAt"];

const TYPE_FILTER_VALUE_TO_ENUM: Record<string, InventoryHistoryType> = {
  manual_update: "MANUAL_UPDATE",
  excel_import: "EXCEL_IMPORT",
  sale: "SALE",
  return: "RETURN",
  order_cancel: "ORDER_CANCEL",
};

type InventoryHistoryTableAndDetailsProps = {
  searchParams: InventoryHistoryPageSearchParams;
};

export default function InventoryHistoryTableAndDetails({
  searchParams,
}: InventoryHistoryTableAndDetailsProps) {
  const page = parsePageParam(searchParams.page);
  const { filters, sortBy } = parseQueryParams(searchParams);

  const { isPending, rows, total } = useInventoryHistory({
    page,
    filters,
    sortBy,
  });

  if (isPending) {
    return (
      <Spinner color="var(--color-accent-600)" className="my-10 self-center" />
    );
  }

  return <InventoryHistoryTable rows={rows} total={total} />;
}

function parseQueryParams(searchParams: InventoryHistoryPageSearchParams): {
  filters: ListInventoryHistoryFilters;
  sortBy: InventoryHistorySort;
} {
  const { filters, sortBy } = parseListSearchParams<ListInventoryHistoryFilters>(
    searchParams,
    {
      filterConfig: {
        search: {
          parse: (value) => {
            const normalized = value.trim();
            return normalized ? normalized : undefined;
          },
        },
        type: {
          parse: (value) => {
            const normalized = value.trim().toLowerCase();
            return TYPE_FILTER_VALUE_TO_ENUM[normalized];
          },
        },
      },
      defaultSort: "timestamp-desc",
    },
  );

  const field = normalizeSortField(sortBy.field, SORT_FIELDS, "timestamp");

  return {
    filters,
    sortBy: {
      field,
      direction: sortBy.direction,
    },
  };
}

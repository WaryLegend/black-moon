import type { SortDirection } from "@/types/sort";

export const INVENTORY_HISTORY_TYPE_VALUES = [
  "MANUAL_UPDATE",
  "EXCEL_IMPORT",
  "SALE",
  "RETURN",
  "ORDER_CANCEL",
] as const;

export type InventoryHistoryType =
  (typeof INVENTORY_HISTORY_TYPE_VALUES)[number];

export type InventoryHistoryPageSearchParams = {
  page?: string;
  search?: string;
  type?: string;
  sortBy?: string;
};

export type InventoryHistorySummary = {
  id: number;
  orderId: number | null;
  changeInQuantity: number;
  quantityAfterChange: number;
  typeOfChange: InventoryHistoryType;
  notes: string | null;
  timestamp: string;
  createdAt: string;
  createdByUser: {
    id: number;
    email: string;
    firstName: string | null;
    lastName: string | null;
    fullName: string | null;
    role: string | null;
  } | null;
  updatedByUser: {
    id: number;
    email: string;
    firstName: string | null;
    lastName: string | null;
    fullName: string | null;
    role: string | null;
  } | null;
  productVariant: {
    id: number;
    sku: string;
    color: string | null;
    size: string | null;
    product: {
      id: number;
      name: string;
      slug: string;
    } | null;
  } | null;
};

export type InventoryHistoryListMeta = {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
};

export type InventoryHistoryListResponse = {
  items: InventoryHistorySummary[];
  meta: InventoryHistoryListMeta;
};

export type ListInventoryHistoryFilters = {
  search?: string;
  type?: InventoryHistoryType;
};

export type InventoryHistorySortField = "timestamp" | "createdAt";

export type InventoryHistorySort = {
  field: InventoryHistorySortField;
  direction: SortDirection;
};

export type ListInventoryHistoryParams = {
  page?: number;
  filters?: ListInventoryHistoryFilters;
  sortBy?: InventoryHistorySort;
};

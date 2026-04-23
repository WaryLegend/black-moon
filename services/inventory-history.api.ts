import httpClient from "@/lib/http/httpClient";
import { joinApiPath } from "@/lib/constants/api";
import type {
  InventoryHistoryListResponse,
  ListInventoryHistoryParams,
} from "@/types/inventory-history";

const INVENTORY_HISTORY_BASE_PATH = joinApiPath("/inventory-history");

const buildListEndpoint = (params: ListInventoryHistoryParams = {}) => {
  const query = new URLSearchParams();

  if (params.page && Number.isFinite(params.page) && params.page > 0) {
    query.set("page", String(params.page));
  }

  if (params.filters?.search?.trim()) {
    query.set("search", params.filters.search.trim());
  }

  if (params.filters?.type) {
    query.set("type", params.filters.type);
  }

  if (params.sortBy?.field) {
    query.set("sortField", params.sortBy.field);
    query.set("sortOrder", params.sortBy.direction);
  }

  const queryString = query.toString();
  return queryString
    ? `${INVENTORY_HISTORY_BASE_PATH}?${queryString}`
    : INVENTORY_HISTORY_BASE_PATH;
};

export const inventoryHistoryApi = {
  list(params: ListInventoryHistoryParams = {}) {
    return httpClient.get<InventoryHistoryListResponse>(
      buildListEndpoint(params),
    );
  },
};

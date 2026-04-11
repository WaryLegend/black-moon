import httpClient from "@/lib/http/httpClient";
import { joinApiPath } from "@/lib/constants/api";
import type {
  BulkIdsTargetGroupsDto,
  BulkRestoreResponse,
  BulkSoftDeleteResponse,
  CreateTargetGroupDto,
  ListTargetGroupsParams,
  TargetGroupsListResponse,
  TargetGroupSummary,
  UpdateTargetGroupDto,
} from "@/types/groups";

const TARGET_GROUPS_BASE_PATH = joinApiPath("/target-groups");

const buildListEndpoint = (params: ListTargetGroupsParams = {}) => {
  const query = new URLSearchParams();

  if (params.page && Number.isFinite(params.page) && params.page > 0) {
    query.set("page", String(params.page));
  }

  if (params.sortBy?.field) {
    query.set("sortField", params.sortBy.field);
    query.set("sortOrder", params.sortBy.direction);
  }

  const queryString = query.toString();
  return queryString
    ? `${TARGET_GROUPS_BASE_PATH}?${queryString}`
    : TARGET_GROUPS_BASE_PATH;
};

export const targetGroupsApi = {
  list(params: ListTargetGroupsParams = {}) {
    return httpClient.get<TargetGroupsListResponse>(buildListEndpoint(params));
  },

  create(payload: CreateTargetGroupDto) {
    return httpClient.post<TargetGroupSummary>(
      TARGET_GROUPS_BASE_PATH,
      payload,
    );
  },

  update(groupId: number, payload: UpdateTargetGroupDto) {
    return httpClient.patch<TargetGroupSummary>(
      `${TARGET_GROUPS_BASE_PATH}/${groupId}`,
      payload,
    );
  },

  bulkSoftDelete(payload: BulkIdsTargetGroupsDto) {
    return httpClient.patch<BulkSoftDeleteResponse>(
      `${TARGET_GROUPS_BASE_PATH}/bulk/soft-delete`,
      payload,
    );
  },

  bulkRestore(payload: BulkIdsTargetGroupsDto) {
    return httpClient.patch<BulkRestoreResponse>(
      `${TARGET_GROUPS_BASE_PATH}/bulk/restore`,
      payload,
    );
  },
};

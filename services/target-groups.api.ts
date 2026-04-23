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

const appendIfPresent = (formData: FormData, key: string, value?: unknown) => {
  if (value === undefined || value === null) return;

  if (typeof value === "string") {
    const trimmed = value.trim();
    if (trimmed === "") return;
    formData.append(key, trimmed);
    return;
  }

  formData.append(key, String(value));
};

const buildTargetGroupFormData = (
  payload: CreateTargetGroupDto | UpdateTargetGroupDto,
  imageFile?: File | null,
) => {
  const formData = new FormData();

  appendIfPresent(formData, "name", payload.name);
  appendIfPresent(formData, "slug", payload.slug);

  if (imageFile) {
    formData.append("image", imageFile);
  }

  return formData;
};

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

  create(payload: CreateTargetGroupDto, imageFile?: File | null) {
    const formData = buildTargetGroupFormData(payload, imageFile);
    return httpClient.post<TargetGroupSummary>(
      TARGET_GROUPS_BASE_PATH,
      formData,
    );
  },

  update(
    groupId: number,
    payload: UpdateTargetGroupDto,
    imageFile?: File | null,
  ) {
    const formData = buildTargetGroupFormData(payload, imageFile);
    return httpClient.patch<TargetGroupSummary>(
      `${TARGET_GROUPS_BASE_PATH}/${groupId}`,
      formData,
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

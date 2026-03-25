import type { SortDirection } from "@/types/sort";

export type GroupsPageSearchParams = {
  page?: string;
  sortBy?: string;
};

export type TargetGroupSummary = {
  id: number;
  name: string;
  slug: string;
  isDeleted?: boolean;
  createdAt: string;
  updatedAt: string;
};

export type BulkIdsTargetGroupsDto = {
  ids: number[];
};

export type BulkSoftDeleteResponse = {
  success: boolean;
  updatedCount: number;
};

export type BulkRestoreResponse = BulkSoftDeleteResponse;

export type TargetGroupsListMeta = {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
};

export type TargetGroupsListResponse = {
  items: TargetGroupSummary[];
  meta: TargetGroupsListMeta;
};

export type TargetGroupSortField = "createdAt" | "name";

export type TargetGroupSort = {
  field: TargetGroupSortField;
  direction: SortDirection;
};

export type ListTargetGroupsParams = {
  page?: number;
  sortBy?: TargetGroupSort;
};

export type CreateTargetGroupDto = {
  name: string;
  slug?: string;
};

export type UpdateTargetGroupDto = Partial<CreateTargetGroupDto>;

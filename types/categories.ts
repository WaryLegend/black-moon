import type { SortDirection } from "@/types/sort";

export type CategoriesPageSearchParams = {
  page?: string;
  search?: string;
  groups?: string;
  sortBy?: string;
};

export type CategorySummary = {
  id: number;
  name: string;
  slug: string;
  imageUrl: string | null;
  imageName: string | null;
  isDeleted?: boolean;
  targetGroup: {
    id: number;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type CategoriesListMeta = {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
};

export type CategoriesListResponse = {
  items: CategorySummary[];
  meta: CategoriesListMeta;
};

export type ListCategoriesFilters = {
  groups?: string[];
  search?: string;
};

export type CategorySortField = "createdAt" | "name";

export type CategorySort = {
  field: CategorySortField;
  direction: SortDirection;
};

export type ListCategoriesParams = {
  page?: number;
  filters?: ListCategoriesFilters;
  sortBy?: CategorySort;
};

export type CreateCategoryDto = {
  name: string;
  slug?: string;
  imageUrl?: string;
  imageName?: string;
  targetGroupId: number;
};

export type UpdateCategoryDto = Partial<CreateCategoryDto>;

export type BulkIdsCategoriesDto = {
  ids: number[];
};

export type BulkSoftDeleteResponse = {
  success: boolean;
  updatedCount: number;
};

export type BulkRestoreResponse = BulkSoftDeleteResponse;

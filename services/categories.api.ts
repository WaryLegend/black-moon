import httpClient from "@/lib/http/httpClient";
import type {
  CategoriesListResponse,
  CreateCategoryDto,
  ListCategoriesParams,
  UpdateCategoryDto,
  CategorySummary,
  BulkIdsCategoriesDto,
  BulkSoftDeleteResponse,
  BulkRestoreResponse,
} from "@/types/categories";

const CATEGORIES_BASE_PATH = "/api/v1/categories";

const buildListEndpoint = (params: ListCategoriesParams = {}) => {
  const query = new URLSearchParams();

  if (params.page && Number.isFinite(params.page) && params.page > 0) {
    query.set("page", String(params.page));
  }

  if (params.filters?.groups?.length) {
    query.set("groups", params.filters.groups.join(","));
  }

  if (params.filters?.search?.trim()) {
    query.set("search", params.filters.search.trim());
  }

  if (params.sortBy?.field) {
    query.set("sortField", params.sortBy.field);
    query.set("sortOrder", params.sortBy.direction);
  }

  const queryString = query.toString();
  return queryString
    ? `${CATEGORIES_BASE_PATH}?${queryString}`
    : CATEGORIES_BASE_PATH;
};

const appendIfPresent = (formData: FormData, key: string, value?: unknown) => {
  if (value === undefined || value === null) return;

  const normalized = typeof value === "string" ? value.trim() : value;
  if (normalized === "") return;

  formData.append(key, String(normalized));
};

const buildCategoryFormData = (
  payload: CreateCategoryDto | UpdateCategoryDto,
  imageFile?: File | null,
) => {
  const formData = new FormData();

  appendIfPresent(formData, "name", payload.name);
  appendIfPresent(formData, "slug", payload.slug);
  appendIfPresent(formData, "imageUrl", payload.imageUrl);
  appendIfPresent(formData, "imageName", payload.imageName);
  appendIfPresent(formData, "targetGroupId", payload.targetGroupId);

  if (imageFile) {
    formData.append("image", imageFile);
  }

  return formData;
};

export const categoriesApi = {
  list(params: ListCategoriesParams = {}) {
    return httpClient.get<CategoriesListResponse>(buildListEndpoint(params));
  },

  create(payload: CreateCategoryDto, imageFile?: File | null) {
    const formData = buildCategoryFormData(payload, imageFile);
    return httpClient.post<CategorySummary>(CATEGORIES_BASE_PATH, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  update(
    categoryId: number,
    payload: UpdateCategoryDto,
    imageFile?: File | null,
  ) {
    const formData = buildCategoryFormData(payload, imageFile);
    return httpClient.patch<CategorySummary>(
      `${CATEGORIES_BASE_PATH}/${categoryId}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      },
    );
  },

  bulkSoftDelete(payload: BulkIdsCategoriesDto) {
    return httpClient.patch<BulkSoftDeleteResponse>(
      `${CATEGORIES_BASE_PATH}/bulk/soft-delete`,
      payload,
    );
  },

  bulkRestore(payload: BulkIdsCategoriesDto) {
    return httpClient.patch<BulkRestoreResponse>(
      `${CATEGORIES_BASE_PATH}/bulk/restore`,
      payload,
    );
  },
};

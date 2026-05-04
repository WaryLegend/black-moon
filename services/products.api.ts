import httpClient from "@/lib/http/httpClient";
import { joinApiPath } from "@/lib/constants/api";
import type {
  BulkIdsProductsDto,
  BulkProductsResponse,
  CreateProductDto,
  CreateProductResponse,
  CreateProductVariantDto,
  CreateProductVariantsResponse,
  ListProductVariantsParams,
  ListProductsParams,
  ProductDetailSummary,
  ProductSummary,
  ProductVariantSummary,
  ProductVariantsListResponse,
  ProductsListResponse,
  UpdateProductDescriptionDto,
  UpdateProductDto,
  UpdateProductVariantDto,
} from "@/types/products";

const PRODUCTS_BASE_PATH = joinApiPath("/products");
const PRODUCT_VARIANTS_BASE_PATH = joinApiPath("/product-variants");

const appendIfPresent = (formData: FormData, key: string, value?: unknown) => {
  if (value === undefined || value === null) return;
  // Skip empty strings for plain scalar fields.
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (trimmed === "") return;
    formData.append(key, trimmed);
    return;
  }

  formData.append(key, String(value));
};

const buildListEndpoint = (params: ListProductsParams = {}) => {
  const query = new URLSearchParams();

  if (params.page && Number.isFinite(params.page) && params.page > 0) {
    query.set("page", String(params.page));
  }

  if (params.filters?.search?.trim()) {
    query.set("search", params.filters.search.trim());
  }

  if (params.filters?.categories?.length) {
    query.set("categories", params.filters.categories.join(","));
  }

  if (params.filters?.isFeatured !== undefined) {
    query.set("isFeatured", String(params.filters.isFeatured));
  }

  if (params.sortBy?.field) {
    query.set("sortField", params.sortBy.field);
    query.set("sortOrder", params.sortBy.direction);
  }

  const queryString = query.toString();
  return queryString
    ? `${PRODUCTS_BASE_PATH}?${queryString}`
    : PRODUCTS_BASE_PATH;
};

const buildProductFormData = (
  payload: CreateProductDto | UpdateProductDto,
  imageFiles?: File[],
) => {
  const formData = new FormData();

  appendIfPresent(formData, "name", payload.name);
  appendIfPresent(formData, "slug", payload.slug);
  if ("baseSku" in payload) {
    appendIfPresent(formData, "baseSku", payload.baseSku);
  }
  if ("categoryId" in payload) {
    appendIfPresent(formData, "categoryId", payload.categoryId);
  }
  if ("descriptions" in payload && payload.descriptions !== undefined) {
    formData.append("descriptions", JSON.stringify(payload.descriptions));
  }

  if ("variantMatrix" in payload && payload.variantMatrix) {
    formData.append("variantMatrix", JSON.stringify(payload.variantMatrix));
  }

  if ((payload as UpdateProductDto).imageIdsInOrder !== undefined) {
    formData.append(
      "imageIdsInOrder",
      JSON.stringify((payload as UpdateProductDto).imageIdsInOrder),
    );
  }

  if ((payload as UpdateProductDto).newImageOrders !== undefined) {
    formData.append(
      "newImageOrders",
      JSON.stringify((payload as UpdateProductDto).newImageOrders),
    );
  }

  if ((payload as UpdateProductDto).descriptionIdsInOrder !== undefined) {
    formData.append(
      "descriptionIdsInOrder",
      JSON.stringify((payload as UpdateProductDto).descriptionIdsInOrder),
    );
  }

  if ((payload as UpdateProductDto).newDescriptions !== undefined) {
    formData.append(
      "newDescriptions",
      JSON.stringify((payload as UpdateProductDto).newDescriptions),
    );
  }

  if ((payload as UpdateProductDto).newDescriptionOrders !== undefined) {
    formData.append(
      "newDescriptionOrders",
      JSON.stringify((payload as UpdateProductDto).newDescriptionOrders),
    );
  }

  imageFiles?.forEach((imageFile) => {
    formData.append("images", imageFile);
  });

  return formData;
};

const buildVariantFormData = (
  payload: UpdateProductVariantDto,
  imageFile?: File | null,
) => {
  const formData = new FormData();

  appendIfPresent(formData, "price", payload.price);
  appendIfPresent(formData, "quantity", payload.quantity);
  appendIfPresent(formData, "notes", payload.notes);

  if (imageFile) {
    formData.append("image", imageFile);
  }

  return formData;
};

const buildVariantListEndpoint = (params: ListProductVariantsParams = {}) => {
  const query = new URLSearchParams();

  if (params.page && Number.isFinite(params.page) && params.page > 0) {
    query.set("page", String(params.page));
  }

  if (params.filters?.search?.trim()) {
    query.set("search", params.filters.search.trim());
  }

  if (params.filters?.products?.length) {
    query.set("products", params.filters.products.join(","));
  }

  if (params.filters?.colors?.length) {
    query.set("colors", params.filters.colors.join(","));
  }

  if (params.filters?.sizes?.length) {
    query.set("sizes", params.filters.sizes.join(","));
  }

  if (params.sortBy?.field) {
    query.set("sortField", params.sortBy.field);
    query.set("sortOrder", params.sortBy.direction);
  }

  const queryString = query.toString();
  return queryString
    ? `${PRODUCT_VARIANTS_BASE_PATH}?${queryString}`
    : PRODUCT_VARIANTS_BASE_PATH;
};

export const productsApi = {
  list(params: ListProductsParams = {}) {
    return httpClient.get<ProductsListResponse>(buildListEndpoint(params));
  },

  getBySlug(slug: string) {
    return httpClient.get<ProductSummary>(`${PRODUCTS_BASE_PATH}/${slug}`);
  },

  getById(productId: number) {
    return httpClient.get<ProductDetailSummary>(
      `${PRODUCTS_BASE_PATH}/id/${productId}`,
    );
  },

  create(payload: CreateProductDto, imageFiles: File[] = []) {
    const formData = buildProductFormData(payload, imageFiles);
    return httpClient.post<CreateProductResponse>(PRODUCTS_BASE_PATH, formData);
  },

  update(
    productId: number,
    payload: UpdateProductDto,
    imageFiles: File[] = [],
  ) {
    if (!imageFiles.length) {
      return httpClient.patch<ProductDetailSummary>(
        `${PRODUCTS_BASE_PATH}/${productId}`,
        payload,
      );
    }

    const formData = buildProductFormData(payload, imageFiles);
    return httpClient.patch<ProductDetailSummary>(
      `${PRODUCTS_BASE_PATH}/${productId}`,
      formData,
    );
  },

  updateDescription(payload: UpdateProductDescriptionDto) {
    return httpClient.patch<{ success: boolean }>(
      `${PRODUCTS_BASE_PATH}/description/update`,
      payload,
    );
  },

  bulkSoftDelete(payload: BulkIdsProductsDto) {
    return httpClient.patch<BulkProductsResponse>(
      `${PRODUCTS_BASE_PATH}/bulk/soft-delete`,
      payload,
    );
  },

  bulkRestore(payload: BulkIdsProductsDto) {
    return httpClient.patch<BulkProductsResponse>(
      `${PRODUCTS_BASE_PATH}/bulk/restore`,
      payload,
    );
  },

  createVariant(payload: CreateProductVariantDto) {
    return httpClient.post<CreateProductVariantsResponse>(
      PRODUCT_VARIANTS_BASE_PATH,
      payload,
    );
  },

  listVariants(params: ListProductVariantsParams = {}) {
    return httpClient.get<ProductVariantsListResponse>(
      buildVariantListEndpoint(params),
    );
  },

  bulkSoftDeleteVariants(payload: BulkIdsProductsDto) {
    return httpClient.patch<BulkProductsResponse>(
      `${PRODUCT_VARIANTS_BASE_PATH}/bulk/soft-delete`,
      payload,
    );
  },

  bulkRestoreVariants(payload: BulkIdsProductsDto) {
    return httpClient.patch<BulkProductsResponse>(
      `${PRODUCT_VARIANTS_BASE_PATH}/bulk/restore`,
      payload,
    );
  },

  updateVariant(
    variantId: number,
    payload: UpdateProductVariantDto,
    imageFile?: File | null,
  ) {
    const body = buildVariantFormData(payload, imageFile);

    return httpClient.patch<ProductVariantSummary>(
      `${PRODUCT_VARIANTS_BASE_PATH}/${variantId}`,
      body,
    );
  },
};

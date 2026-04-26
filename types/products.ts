import type { SortDirection } from "@/types/sort";

export type ProductsPageSearchParams = {
  page?: string;
  search?: string;
  categories?: string;
  sortBy?: string;
};

export type ProductVariantsPageSearchParams = {
  page?: string;
  search?: string;
  products?: string;
  colors?: string;
  sizes?: string;
  sortBy?: string;
};

export type ProductCategorySummary = {
  id: number;
  name: string;
  slug?: string;
};

export type ProductImageSummary = {
  id: number;
  imageUrl: string | null;
  imageName?: string | null;
};

export type ProductDescriptionSummary = {
  id: number;
  title: string;
  contentHtml: string;
  plainText: string;
  displayOrder: number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};

export type ProductSummary = {
  id: number;
  name: string;
  slug: string;
  baseSku: string;
  isDeleted?: boolean;
  isFeatured?: boolean;
  category: ProductCategorySummary;
  descriptions?: ProductDescriptionSummary[];
  variants?: ProductVariantSummary[];
  images: ProductImageSummary[];
  createdAt: string;
  updatedAt: string;
};

export type ProductsListMeta = {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
};

export type ProductsListResponse = {
  items: ProductSummary[];
  meta: ProductsListMeta;
};

export type CreateProductResponse = {
  product: ProductSummary;
  variantCreatedCount: number;
};

export type ListProductsFilters = {
  search?: string;
  categories?: string[];
};

export type ProductSortField = "createdAt" | "name";

export type ProductSort = {
  field: ProductSortField;
  direction: SortDirection;
};

export type ListProductsParams = {
  page?: number;
  filters?: ListProductsFilters;
  sortBy?: ProductSort;
};

export type CreateProductDto = {
  name: string;
  slug?: string;
  baseSku: string;
  categoryId: number;
  descriptions?: CreateProductDescriptionDto[];
  variantMatrix?: {
    basePrice?: number;
    pairs: CreateProductVariantPair[];
  };
};

export type CreateProductDescriptionDto = {
  title: string;
  contentHtml: string;
  plainText: string;
  isDeleted?: boolean;
};

export type UpdateProductDto = {
  name?: string;
  slug?: string;
  imageIdsInOrder?: number[];
  newImageOrders?: number[];
  descriptionIdsInOrder?: number[];
  newDescriptions?: CreateProductDescriptionDto[];
  newDescriptionOrders?: number[];
};

export type UpdateProductDescriptionDto = {
  id: number;
  title?: string;
  contentHtml?: string;
  plainText?: string;
  isDeleted?: boolean;
};

export type BulkIdsProductsDto = {
  ids: number[];
};

export type BulkProductsResponse = {
  success: boolean;
  updatedCount: number;
};

export type ProductVariantSummary = {
  id: number;
  product?: {
    id: number;
    name: string | null;
    slug: string;
    isDeleted: boolean;
  } | null;
  sku: string;
  color: string | null;
  size: string | null;
  price: number | null;
  quantity: number | null;
  image: {
    id: number;
    imageUrl: string | null;
    imageName: string | null;
  } | null;
  isDeleted?: boolean;
};

export type CreateVariantMatrixItem = {
  color: string;
  size: string;
  price: number;
  quantity: number;
};

export type CreateProductVariantPair = {
  color: string;
  size: string;
};

export type CreateProductVariantDto = {
  productId: number;
  basePrice?: number;
  pairs: CreateProductVariantPair[];
};

export type ProductVariantSortField = "createdAt" | "price" | "quantity";

export type ProductVariantSort = {
  field: ProductVariantSortField;
  direction: SortDirection;
};

export type ListProductVariantsFilters = {
  search?: string;
  products?: string[];
  colors?: string[];
  sizes?: string[];
};

export type ListProductVariantsParams = {
  page?: number;
  filters?: ListProductVariantsFilters;
  sortBy?: ProductVariantSort;
};

export type ProductVariantListMeta = ProductsListMeta;

export type ProductVariantsListResponse = {
  items: ProductVariantSummary[];
  meta: ProductVariantListMeta;
};

export type CreateProductVariantsResponse = {
  createdCount: number;
  items: ProductVariantSummary[];
};

export type UpdateProductVariantDto = {
  price?: number;
  quantity?: number;
  notes?: string;
};

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
  slug: string;
};

export type ProductImageSummary = {
  id: number;
  imageUrl: string | null;
  imageName: string | null;
  imageOrder: number | null;
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
  minPrice: number;
  maxPrice: number;
  isDeleted: boolean;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
  category: ProductCategorySummary | null;
  images: ProductImageSummary[];
  options: {
    colors: string[];
    sizes: string[];
  };
  reviews: {
    total: number;
    avgRating: number;
  };
};

export type ProductDetailSummary = {
  id: number;
  name: string;
  slug: string;
  baseSku: string;
  minPrice: number;
  maxPrice: number;
  isDeleted: boolean;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
  category: ProductCategorySummary | null;
  images: ProductImageSummary[];
  descriptions: ProductDescriptionSummary[];
  variants: ProductVariantSummary[];
  reviews?: {
    total: number;
    avgRating: number;
  };
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
  product: ProductDetailSummary;
  variantCreatedCount: number;
};

export type ListProductsFilters = {
  search?: string;
  categories?: string[];
  colors?: string[];
  sizes?: string[];
  priceRange?: PriceRange;
  isFeatured?: boolean;
};

export type PriceRange = {
  minPrice?: number;
  maxPrice?: number;
};

export type ProductSortField = "createdAt" | "name" | "price" | "isFeatured";

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
  isFeatured?: boolean;
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
  sku: string;
  color: string | null;
  size: string | null;
  quantity: number | null;
  price: number | null;
  createdAt: string;
  updatedAt: string;
  image: {
    id: number;
    imageUrl: string | null;
    imageName: string | null;
  } | null;
  isDeleted: boolean;
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

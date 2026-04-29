import { ProductSort } from "@/types/products";

export type PriceRange = {
  minPrice?: number;
  maxPrice?: number;
};

export type StoreCategoryPageSearchParams = {
  page?: string;
  colors?: string;
  sizes?: string;
  priceRange?: string;
  sortBy?: string;
};

export type ListPublicProductsFilters = {
  search?: string;
  categories?: string[];
  colors?: string[];
  sizes?: string[];
  priceRange?: PriceRange;
};

export type ListPublicProductsParams = {
  page?: number;
  filters?: ListPublicProductsFilters;
  sortBy?: ProductSort;
};

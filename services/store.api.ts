import { cache } from "react";
import { joinApiPath } from "@/lib/constants/api";
import { apiFetch } from "@/lib/next-server/api";
import type { CategorySummary } from "@/types/categories";
import type {
  ProductDetailSummary,
  ProductsListResponse,
} from "@/types/products";
import type { ListPublicProductsParams } from "@/types/storepage";

const CATEGORIES_PUBLIC_PATH = joinApiPath("/categories");
const PRODUCTS_BASE_PATH = joinApiPath("/products");
const PRODUCTS_PUBLIC_PATH = joinApiPath("/products/public");

export const getCategoryBySlug = cache(
  async (slug: string): Promise<{ category: CategorySummary | null }> => {
    try {
      const url = `${CATEGORIES_PUBLIC_PATH}/${encodeURIComponent(slug)}`;
      const category = await apiFetch<CategorySummary>(url, {
        revalidate: 300,
      });
      return { category };
    } catch (error) {
      console.error("Error fetching category by slug:", error);
      return { category: null };
    }
  },
);

export const getPublicProductBySlug = cache(
  async (slug: string): Promise<ProductDetailSummary | null> => {
    try {
      const url = `${PRODUCTS_BASE_PATH}/${encodeURIComponent(slug)}`;
      return await apiFetch<ProductDetailSummary>(url, { revalidate: 0 });
    } catch (error) {
      console.error("Error fetching product by slug:", error);
      return null;
    }
  },
);

const buildProductsQuery = (params: ListPublicProductsParams): string => {
  const query = new URLSearchParams();

  if (params.page && Number.isFinite(params.page) && params.page > 0) {
    query.set("page", String(params.page));
  }

  if (params.filters?.categories?.length) {
    query.set("categories", params.filters.categories.join(","));
  }

  if (params.filters?.colors?.length) {
    query.set("colors", params.filters.colors.join(","));
  }

  if (params.filters?.sizes?.length) {
    query.set("sizes", params.filters.sizes.join(","));
  }

  if (params.filters?.priceRange) {
    const payload = {
      ...(params.filters.priceRange.minPrice !== undefined
        ? { minPrice: params.filters.priceRange.minPrice }
        : {}),
      ...(params.filters.priceRange.maxPrice !== undefined
        ? { maxPrice: params.filters.priceRange.maxPrice }
        : {}),
    };

    if (Object.keys(payload).length) {
      query.set("priceRange", JSON.stringify(payload));
    }
  }

  if (params.sortBy?.field) {
    query.set("sortField", params.sortBy.field);
    query.set("sortOrder", params.sortBy.direction);
  }

  const queryString = query.toString();
  return queryString
    ? `${PRODUCTS_PUBLIC_PATH}?${queryString}`
    : PRODUCTS_PUBLIC_PATH;
};

export async function getPublicProducts(
  params: ListPublicProductsParams,
): Promise<ProductsListResponse> {
  const url = buildProductsQuery(params);
  return apiFetch<ProductsListResponse>(url, { revalidate: 60 });
}

"use client";

import type { FilterOption } from "@/types/filter";
import { productsApi } from "@/services/products.api";

const CACHE_TTL = 5 * 60 * 1000;

let productOptionsCache: {
  optionsBySlug: FilterOption[];
  optionsById: FilterOption[];
  loadedAt: number;
} = {
  optionsBySlug: [],
  optionsById: [],
  loadedAt: 0,
};

async function fetchAllProductOptions() {
  const now = Date.now();

  if (
    productOptionsCache.loadedAt &&
    now - productOptionsCache.loadedAt < CACHE_TTL &&
    productOptionsCache.optionsBySlug.length
  ) {
    return productOptionsCache;
  }

  const optionsBySlug: FilterOption[] = [];
  const optionsById: FilterOption[] = [];
  let page = 1;
  let totalPages = 1;

  while (page <= totalPages) {
    const response = await productsApi.list({
      page,
      sortBy: { field: "name", direction: "asc" },
    });

    response.items.forEach((product) => {
      optionsBySlug.push({
        value: product.slug,
        label: product.name,
      });

      optionsById.push({
        value: product.id,
        label: product.name,
      });
    });

    totalPages = response.meta.totalPages || 1;
    page += 1;
  }

  productOptionsCache = {
    optionsBySlug,
    optionsById,
    loadedAt: now,
  };

  return productOptionsCache;
}

function filterOptions(options: FilterOption[], inputValue: string) {
  const keyword = inputValue.trim().toLowerCase();
  if (!keyword) return options;

  return options.filter(
    (option) =>
      option.label.toLowerCase().includes(keyword) ||
      String(option.value).toLowerCase().includes(keyword),
  );
}

export async function loadProductSlugOptions(inputValue: string) {
  const { optionsBySlug } = await fetchAllProductOptions();
  return filterOptions(optionsBySlug, inputValue);
}

export async function loadProductIdOptions(inputValue: string) {
  const { optionsById } = await fetchAllProductOptions();
  return filterOptions(optionsById, inputValue);
}

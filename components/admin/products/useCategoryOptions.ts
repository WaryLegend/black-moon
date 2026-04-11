"use client";

import type { FilterOption } from "@/types/filter";
import { categoriesApi } from "@/services/categories.api";

const CACHE_TTL = 5 * 60 * 1000;

let categoryOptionsCache: {
  optionsBySlug: FilterOption[];
  optionsById: FilterOption[];
  loadedAt: number;
} = {
  optionsBySlug: [],
  optionsById: [],
  loadedAt: 0,
};

async function fetchAllCategoryOptions() {
  const now = Date.now();

  if (
    categoryOptionsCache.loadedAt &&
    now - categoryOptionsCache.loadedAt < CACHE_TTL &&
    categoryOptionsCache.optionsBySlug.length
  ) {
    return categoryOptionsCache;
  }

  const optionsBySlug: FilterOption[] = [];
  const optionsById: FilterOption[] = [];
  let page = 1;
  let totalPages = 1;

  while (page <= totalPages) {
    const response = await categoriesApi.list({
      page,
      sortBy: { field: "name", direction: "asc" },
    });

    response.items.forEach((category) => {
      const groupName = category.targetGroup?.name?.trim();
      const normalizedGroup = groupName ? groupName.toLowerCase() : "";
      const label = normalizedGroup
        ? `${category.name} (${normalizedGroup})`
        : category.name;

      optionsBySlug.push({
        value: category.slug,
        label,
      });

      optionsById.push({
        value: category.id,
        label: normalizedGroup
          ? `${category.name} (${normalizedGroup})`
          : category.name,
      });
    });

    totalPages = response.meta.totalPages || 1;
    page += 1;
  }

  categoryOptionsCache = {
    optionsBySlug,
    optionsById,
    loadedAt: now,
  };

  return categoryOptionsCache;
}

const filterOptions = (options: FilterOption[], inputValue: string) => {
  const keyword = inputValue.trim().toLowerCase();

  if (!keyword) return options;

  return options.filter((option) =>
    option.label.toLowerCase().includes(keyword),
  );
};

export async function loadCategorySlugOptions(inputValue: string) {
  const { optionsBySlug } = await fetchAllCategoryOptions();
  return filterOptions(optionsBySlug, inputValue);
}

export async function loadCategoryIdOptions(inputValue: string) {
  const { optionsById } = await fetchAllCategoryOptions();
  return filterOptions(optionsById, inputValue);
}

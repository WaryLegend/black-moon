"use client";

import type { FilterOption } from "@/types/filter";
import { targetGroupsApi } from "@/services/target-groups.api";

const CACHE_TTL = 5 * 60 * 1000;

let groupsCache: {
  optionsBySlug: FilterOption[];
  optionsById: FilterOption[];
  loadedAt: number;
} = {
  optionsBySlug: [],
  optionsById: [],
  loadedAt: 0,
};

async function fetchAllTargetGroups() {
  const now = Date.now();
  if (
    groupsCache.loadedAt &&
    now - groupsCache.loadedAt < CACHE_TTL &&
    groupsCache.optionsBySlug.length
  ) {
    return groupsCache;
  }

  const items: Array<{ id: number; name: string; slug: string }> = [];
  let page = 1;
  let totalPages = 1;

  while (page <= totalPages) {
    const response = await targetGroupsApi.list({
      page,
      sortBy: { field: "name", direction: "asc" },
    });

    items.push(...response.items);
    totalPages = response.meta.totalPages || 1;
    page += 1;
  }

  groupsCache = {
    optionsBySlug: items.map((item) => ({
      value: item.slug,
      label: `${item.name} (${item.slug})`,
    })),
    optionsById: items.map((item) => ({
      value: item.id,
      label: `${item.name} (${item.slug})`,
    })),
    loadedAt: now,
  };

  return groupsCache;
}

const filterOptions = (options: FilterOption[], inputValue: string) => {
  const keyword = inputValue.trim().toLowerCase();
  if (!keyword) return options;

  return options.filter((option) =>
    option.label.toLowerCase().includes(keyword),
  );
};

export async function loadTargetGroupSlugOptions(inputValue: string) {
  const { optionsBySlug } = await fetchAllTargetGroups();
  return filterOptions(optionsBySlug, inputValue);
}

export async function loadTargetGroupIdOptions(inputValue: string) {
  const { optionsById } = await fetchAllTargetGroups();
  return filterOptions(optionsById, inputValue);
}

import { cache } from "react";
import { joinApiPath } from "@/lib/constants/api";
import { apiFetch } from "@/lib/next-server/api"; // Import hàm apiFetch mới
import type { TargetGroupSummary } from "@/types/groups";
import type { HomeCategory, HomeTargetGroup } from "@/types/homepage";

type ListEnvelope<T> = {
  items?: T[];
  data?: T[];
};

type PublicCategoryPayload = {
  id: number;
  name: string;
  slug: string;
  imageUrl?: string | null;
  targetGroup?: { slug?: string };
};

const TARGET_GROUPS_PUBLIC_PATH = joinApiPath("/target-groups/public");
const CATEGORIES_PUBLIC_PATH = joinApiPath("/categories/public");

const normalizeList = <T>(payload: T[] | ListEnvelope<T>): T[] => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload.items)) return payload.items;
  if (Array.isArray(payload.data)) return payload.data;
  return [];
};

const toHomeTargetGroup = (group: TargetGroupSummary): HomeTargetGroup => ({
  id: group.id,
  name: group.name,
  slug: group.slug,
  imageUrl: group.imageUrl,
});

const toHomeCategory = (
  category: PublicCategoryPayload,
  fallbackGroupSlug: string,
): HomeCategory => ({
  id: category.id,
  name: category.name,
  slug: category.slug,
  imageUrl: category.imageUrl ?? null,
  groupSlug: category.targetGroup?.slug || fallbackGroupSlug,
});

export const getPublicTargetGroups = cache(
  async (): Promise<HomeTargetGroup[]> => {
    try {
      const query = new URLSearchParams({ sortOrder: "asc" });
      const url = `${TARGET_GROUPS_PUBLIC_PATH}?${query.toString()}`;

      const payload = await apiFetch<
        TargetGroupSummary[] | ListEnvelope<TargetGroupSummary>
      >(url, {
        next: { revalidate: 86400 }, // 1 day
      });

      return normalizeList(payload)
        .map(toHomeTargetGroup)
        .filter((group) => group.slug.trim().length > 0);
    } catch (error) {
      console.error("Error fetching public target groups:", error);
      return [];
    }
  },
);

export const getPublicCategoriesByGroupSlug = cache(
  async (groupSlug: string): Promise<HomeCategory[]> => {
    const query = new URLSearchParams({ groups: groupSlug });
    const url = `${CATEGORIES_PUBLIC_PATH}?${query.toString()}`;

    const payload = await apiFetch<
      PublicCategoryPayload[] | ListEnvelope<PublicCategoryPayload>
    >(url, {
      next: { revalidate: 600 }, // 10 minutes
    });

    return normalizeList(payload).map((category) =>
      toHomeCategory(category, groupSlug),
    );
  },
);

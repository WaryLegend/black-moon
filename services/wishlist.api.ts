import { apiClient } from "@/lib/http/apiClient";
import { joinApiPath } from "@/lib/constants/api";
import type {
  CreateWishlistDto,
  WishlistResponse,
  WishlistSort,
  WishlistUserListResponse,
} from "@/types/wishlist";

const WISHLISTS_BASE_PATH = joinApiPath("/wishlists");

const buildWishlistQuery = (params: {
  page?: number;
  sortBy?: WishlistSort;
}) => {
  const query = new URLSearchParams();

  if (params.page && Number.isFinite(params.page) && params.page > 0) {
    query.set("page", String(params.page));
  }

  if (params.sortBy) {
    query.set("sortField", params.sortBy.field);
    query.set("sortOrder", params.sortBy.order);
  }

  return query.toString();
};

export const wishlistApi = {
  async getByUser(params: { page?: number; sortBy?: WishlistSort } = {}) {
    const query = buildWishlistQuery(params);
    const url = query
      ? `${WISHLISTS_BASE_PATH}/me?${query}`
      : `${WISHLISTS_BASE_PATH}/me`;
    const response = await apiClient.get<WishlistUserListResponse>(url);
    return response.data;
  },

  async create(payload: CreateWishlistDto) {
    const response = await apiClient.post<WishlistResponse>(
      WISHLISTS_BASE_PATH,
      payload,
    );
    return response.data;
  },

  async remove(id: number) {
    const response = await apiClient.delete<{ success: boolean }>(
      `${WISHLISTS_BASE_PATH}/${id}`,
    );
    return response.data;
  },
};

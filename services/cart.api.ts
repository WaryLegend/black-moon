import { apiClient } from "@/lib/http/apiClient";
import { joinApiPath } from "@/lib/constants/api";
import type {
  CartResponse,
  CreateCartItemDto,
  MergeCartDto,
  UpdateCartItemDto,
} from "@/types/cart";

const CARTS_BASE_PATH = joinApiPath("/carts");

export const cartApi = {
  async getByUser() {
    const response = await apiClient.get<CartResponse>(
      `${CARTS_BASE_PATH}/user`,
    );
    return response.data;
  },

  async addItem(payload: CreateCartItemDto) {
    const response = await apiClient.post<CartResponse>(
      `${CARTS_BASE_PATH}/items`,
      payload,
    );
    return response.data;
  },

  async updateItem(itemId: number, payload: UpdateCartItemDto) {
    const response = await apiClient.patch<CartResponse>(
      `${CARTS_BASE_PATH}/items/${itemId}`,
      payload,
    );
    return response.data;
  },

  async removeItem(itemId: number) {
    const response = await apiClient.delete<{ success: boolean }>(
      `${CARTS_BASE_PATH}/items/${itemId}`,
    );
    return response.data;
  },

  async clearCart() {
    const response = await apiClient.delete<{ success: boolean }>(
      `${CARTS_BASE_PATH}/user/items`,
    );
    return response.data;
  },

  async mergeCart(payload: MergeCartDto) {
    const response = await apiClient.post<CartResponse>(
      `${CARTS_BASE_PATH}/user/merge`,
      payload,
    );
    return response.data;
  },
};

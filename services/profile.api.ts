import httpClient from "@/lib/http/httpClient";
import type { CurrentAccount, ProfileDetails } from "@/types/profile";
import type { ApiResponse } from "@/services/auth.api";
import { joinApiPath } from "@/lib/constants/api";

const USERS_BASE_PATH = joinApiPath("/users");

export type UpdateProfilePayload = Partial<ProfileDetails>;

const normalizeApiResponse = <T>(
  payload: ApiResponse<T> | T,
): ApiResponse<T> => {
  if (payload !== null && typeof payload === "object" && "data" in payload) {
    return payload as ApiResponse<T>;
  }

  return {
    data: payload as T,
  };
};

export const profileApi = {
  async getMe() {
    const raw = await httpClient.get<
      ApiResponse<CurrentAccount> | CurrentAccount
    >(`${USERS_BASE_PATH}/me`);

    return normalizeApiResponse(raw);
  },

  async updateProfile(payload: UpdateProfilePayload) {
    const raw = await httpClient.patch<
      ApiResponse<CurrentAccount> | CurrentAccount
    >(`${USERS_BASE_PATH}/me`, payload);

    return normalizeApiResponse(raw);
  },

  async updateAvatar(file: File) {
    const formData = new FormData();
    formData.append("avatar", file);

    const raw = await httpClient.put<
      ApiResponse<CurrentAccount> | CurrentAccount
    >(`${USERS_BASE_PATH}/me/avatar`, formData);

    return normalizeApiResponse(raw);
  },
};

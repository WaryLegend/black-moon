"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { profileApi, type UpdateProfilePayload } from "@/services/profile.api";
import type { CurrentAccount } from "@/types/profile";
import { CURRENT_ACCOUNT_QUERY_KEY } from "@/hooks/useCurrentAccount";

export function useEditProfile() {
  const queryClient = useQueryClient();

  return useMutation<CurrentAccount, any, UpdateProfilePayload>({
    mutationKey: ["users", "me", "update"],
    mutationFn: async (payload) => {
      const response = await profileApi.updateProfile(payload);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(CURRENT_ACCOUNT_QUERY_KEY, data);
      queryClient.invalidateQueries({ queryKey: CURRENT_ACCOUNT_QUERY_KEY });
      toast.success("Cập nhật thông tin thành công");
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ??
        error?.message ??
        "Cập nhật thông tin thất bại";
      toast.error(message);
    },
  });
}

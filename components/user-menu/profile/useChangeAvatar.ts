"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { profileApi } from "@/services/profile.api";
import type { CurrentAccount } from "@/types/profile";
import { CURRENT_ACCOUNT_QUERY_KEY } from "@/hooks/useCurrentAccount";

export function useChangeAvatar() {
  const queryClient = useQueryClient();

  return useMutation<CurrentAccount, any, File>({
    mutationKey: ["users", "me", "avatar"],
    mutationFn: async (file) => {
      const response = await profileApi.updateAvatar(file);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(CURRENT_ACCOUNT_QUERY_KEY, data);
      queryClient.invalidateQueries({ queryKey: CURRENT_ACCOUNT_QUERY_KEY });
      toast.success("Ảnh đại diện đã được cập nhật");
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ??
        error?.message ??
        "Cập nhật ảnh đại diện thất bại";
      toast.error(message);
    },
  });
}

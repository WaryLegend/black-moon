"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { usersApi } from "@/services/users.api";
import type { UpdateUserProfileDto, UserSummary } from "@/types/users";

type UpdateUserVariables = {
  userId: number;
  payload: UpdateUserProfileDto;
};

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation<UserSummary, any, UpdateUserVariables>({
    mutationKey: ["users", "update"],
    mutationFn: ({ userId, payload }) => usersApi.update(userId, payload),
    onSuccess: () => {
      toast.success("Cập nhật người dùng thành công");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ??
        error?.message ??
        "Không thể cập nhật người dùng";
      toast.error(message);
    },
  });
}

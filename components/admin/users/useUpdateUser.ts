"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { usersApi } from "@/services/users.api";
import type { UpdateUserProfileDto, UserSummary } from "@/types/users";
import { resolveToastErrorMessage } from "@/lib/http/errorMessages";

type UpdateUserVariables = {
  userId: number;
  payload: UpdateUserProfileDto;
};

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation<UserSummary, unknown, UpdateUserVariables>({
    mutationKey: ["users", "update"],
    mutationFn: ({ userId, payload }) => usersApi.update(userId, payload),
    onSuccess: () => {
      toast.success("Cập nhật người dùng thành công");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      toast.error(
        resolveToastErrorMessage(error, "Không thể cập nhật người dùng"),
      );
    },
  });
}

"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { usersApi } from "@/services/users.api";
import type { UpdateUserActivationDto, UserSummary } from "@/types/users";
import { resolveToastErrorMessage } from "@/lib/http/errorMessages";

type UpdateUserActivationVariables = {
  userId: number;
  payload: UpdateUserActivationDto;
  resourceName?: string;
};

export function useUpdateUserActivation() {
  const queryClient = useQueryClient();

  return useMutation<UserSummary, unknown, UpdateUserActivationVariables>({
    mutationFn: ({ userId, payload }) =>
      usersApi.updateActivation(userId, payload),
    onSuccess: (_, variables) => {
      const subject = variables.resourceName ?? "người dùng";
      toast.success(
        variables.payload.activated
          ? `Đã kích hoạt ${subject}`
          : `Đã khóa ${subject}`,
      );
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      toast.error(
        resolveToastErrorMessage(
          error,
          "Không thể cập nhật trạng thái người dùng",
        ),
      );
    },
  });
}

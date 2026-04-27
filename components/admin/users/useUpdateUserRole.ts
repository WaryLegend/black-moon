"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { usersApi } from "@/services/users.api";
import type { UpdateUserRoleDto, UserSummary } from "@/types/users";
import { resolveToastErrorMessage } from "@/lib/http/errorMessages";

type UpdateUserRoleVariables = {
  userId: number;
  payload: UpdateUserRoleDto;
};

export function useUpdateUserRole() {
  const queryClient = useQueryClient();

  return useMutation<UserSummary, unknown, UpdateUserRoleVariables>({
    mutationKey: ["users", "update-role"],
    mutationFn: ({ userId, payload }) => usersApi.updateRole(userId, payload),
    onSuccess: () => {
      toast.success("Cập nhật phân quyền thành công");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      toast.error(
        resolveToastErrorMessage(error, "Không thể cập nhật phân quyền"),
      );
    },
  });
}

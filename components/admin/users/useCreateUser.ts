"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { usersApi } from "@/services/users.api";
import type { CreateUserDto, UserSummary } from "@/types/users";

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation<UserSummary, any, CreateUserDto>({
    mutationKey: ["users", "create"],
    mutationFn: (payload) => usersApi.create(payload),
    onSuccess: () => {
      toast.success("Tạo người dùng thành công");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ??
        error?.message ??
        "Không thể tạo người dùng";
      toast.error(message);
    },
  });
}

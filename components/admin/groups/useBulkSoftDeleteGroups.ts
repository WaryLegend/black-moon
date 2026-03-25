"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { targetGroupsApi } from "@/services/target-groups.api";

export function useBulkSoftDeleteGroups() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["target-groups", "bulk-soft-delete"],
    mutationFn: (ids: number[]) => targetGroupsApi.bulkSoftDelete({ ids }),
    onSuccess: (data) => {
      toast.success(`Đã đánh dấu xóa ${data.updatedCount} groups`);
      queryClient.invalidateQueries({ queryKey: ["target-groups"] });
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ??
        error?.message ??
        "Không thể đánh dấu xóa groups";
      toast.error(message);
    },
  });
}

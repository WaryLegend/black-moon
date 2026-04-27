"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { targetGroupsApi } from "@/services/target-groups.api";
import { resolveToastErrorMessage } from "@/lib/http/errorMessages";

export function useBulkSoftDeleteGroups() {
  const queryClient = useQueryClient();

  return useMutation<{ updatedCount: number }, unknown, number[]>({
    mutationKey: ["target-groups", "bulk-soft-delete"],
    mutationFn: (ids: number[]) => targetGroupsApi.bulkSoftDelete({ ids }),
    onSuccess: (data) => {
      toast.success(`Đã đánh dấu xóa ${data.updatedCount} groups`);
      queryClient.invalidateQueries({ queryKey: ["target-groups"] });
    },
    onError: (error) => {
      toast.error(
        resolveToastErrorMessage(error, "Không thể đánh dấu xóa groups"),
      );
    },
  });
}

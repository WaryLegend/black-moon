"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { targetGroupsApi } from "@/services/target-groups.api";

export function useBulkRestoreGroups() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["target-groups", "bulk-restore"],
    mutationFn: (ids: number[]) => targetGroupsApi.bulkRestore({ ids }),
    onSuccess: (data) => {
      toast.success(`Đã khôi phục ${data.updatedCount} groups`);
      queryClient.invalidateQueries({ queryKey: ["target-groups"] });
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ??
        error?.message ??
        "Không thể khôi phục groups. Vui lòng thử lại";
      toast.error(message);
    },
  });
}

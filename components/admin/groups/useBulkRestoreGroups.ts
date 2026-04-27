"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { targetGroupsApi } from "@/services/target-groups.api";
import { resolveToastErrorMessage } from "@/lib/http/errorMessages";

export function useBulkRestoreGroups() {
  const queryClient = useQueryClient();

  return useMutation<{ updatedCount: number }, unknown, number[]>({
    mutationKey: ["target-groups", "bulk-restore"],
    mutationFn: (ids: number[]) => targetGroupsApi.bulkRestore({ ids }),
    onSuccess: (data) => {
      toast.success(`Đã khôi phục ${data.updatedCount} groups`);
      queryClient.invalidateQueries({ queryKey: ["target-groups"] });
    },
    onError: (error) => {
      toast.error(
        resolveToastErrorMessage(
          error,
          "Không thể khôi phục groups. Vui lòng thử lại",
        ),
      );
    },
  });
}

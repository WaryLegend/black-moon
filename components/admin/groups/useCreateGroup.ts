"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { targetGroupsApi } from "@/services/target-groups.api";
import type { CreateTargetGroupDto, TargetGroupSummary } from "@/types/groups";

export function useCreateGroup() {
  const queryClient = useQueryClient();

  return useMutation<TargetGroupSummary, any, CreateTargetGroupDto>({
    mutationKey: ["target-groups", "create"],
    mutationFn: (payload) => targetGroupsApi.create(payload),
    onSuccess: () => {
      toast.success("Tạo nhóm thành công");
      queryClient.invalidateQueries({ queryKey: ["target-groups"] });
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ??
        error?.message ??
        "Không thể tạo nhóm";
      toast.error(message);
    },
  });
}

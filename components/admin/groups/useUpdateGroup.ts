"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { targetGroupsApi } from "@/services/target-groups.api";
import type { TargetGroupSummary, UpdateTargetGroupDto } from "@/types/groups";

type UpdateGroupVariables = {
  groupId: number;
  payload: UpdateTargetGroupDto;
};

export function useUpdateGroup() {
  const queryClient = useQueryClient();

  return useMutation<TargetGroupSummary, any, UpdateGroupVariables>({
    mutationKey: ["target-groups", "update"],
    mutationFn: ({ groupId, payload }) =>
      targetGroupsApi.update(groupId, payload),
    onSuccess: () => {
      toast.success("Cập nhật nhóm thành công");
      queryClient.invalidateQueries({ queryKey: ["target-groups"] });
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ??
        error?.message ??
        "Không thể cập nhật nhóm";
      toast.error(message);
    },
  });
}

"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { targetGroupsApi } from "@/services/target-groups.api";
import type { TargetGroupSummary, UpdateTargetGroupDto } from "@/types/groups";
import { resolveToastErrorMessage } from "@/lib/http/errorMessages";

type UpdateGroupVariables = {
  groupId: number;
  payload: UpdateTargetGroupDto;
  imageFile?: File | null;
};

export function useUpdateGroup() {
  const queryClient = useQueryClient();

  return useMutation<TargetGroupSummary, unknown, UpdateGroupVariables>({
    mutationKey: ["target-groups", "update"],
    mutationFn: ({ groupId, payload, imageFile }) =>
      targetGroupsApi.update(groupId, payload, imageFile),
    onSuccess: () => {
      toast.success("Cập nhật nhóm thành công");
      queryClient.invalidateQueries({ queryKey: ["target-groups"] });
    },
    onError: (error) => {
      toast.error(resolveToastErrorMessage(error, "Không thể cập nhật nhóm"));
    },
  });
}

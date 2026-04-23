"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { targetGroupsApi } from "@/services/target-groups.api";
import type { CreateTargetGroupDto, TargetGroupSummary } from "@/types/groups";

type CreateGroupVariables = {
  payload: CreateTargetGroupDto;
  imageFile?: File | null;
};

export function useCreateGroup() {
  const queryClient = useQueryClient();

  return useMutation<TargetGroupSummary, any, CreateGroupVariables>({
    mutationKey: ["target-groups", "create"],
    mutationFn: ({ payload, imageFile }) =>
      targetGroupsApi.create(payload, imageFile),
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

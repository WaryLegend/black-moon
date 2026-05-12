"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { systemConfigsApi } from "@/services/system-configs.api";
import type {
  SystemConfigItem,
  UpdateSystemConfigDto,
} from "@/types/system-configs";
import { resolveToastErrorMessage } from "@/lib/http/errorMessages";

type UpdateSystemConfigVariables = {
  key: string;
  payload: UpdateSystemConfigDto;
};

export function useUpdateSystemConfig() {
  const queryClient = useQueryClient();

  return useMutation<SystemConfigItem, unknown, UpdateSystemConfigVariables>({
    mutationKey: ["system-configs", "update"],
    mutationFn: ({ key, payload }) => systemConfigsApi.update(key, payload),
    onSuccess: () => {
      toast.success("System config updated.");
      queryClient.invalidateQueries({ queryKey: ["system-configs"] });
    },
    onError: (error) => {
      toast.error(
        resolveToastErrorMessage(error, "Unable to update system config."),
      );
    },
  });
}

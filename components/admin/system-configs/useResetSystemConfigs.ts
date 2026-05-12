"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { systemConfigsApi } from "@/services/system-configs.api";
import type { ResetSystemConfigsResponse } from "@/types/system-configs";
import { resolveToastErrorMessage } from "@/lib/http/errorMessages";

export function useResetSystemConfigs() {
  const queryClient = useQueryClient();

  return useMutation<ResetSystemConfigsResponse, unknown>({
    mutationKey: ["system-configs", "reset"],
    mutationFn: () => systemConfigsApi.resetDefaults(),
    onSuccess: (data) => {
      toast.success(`Reset ${data.updatedCount} configs to defaults.`);
      queryClient.invalidateQueries({ queryKey: ["system-configs"] });
    },
    onError: (error) => {
      toast.error(
        resolveToastErrorMessage(error, "Unable to reset system configs."),
      );
    },
  });
}

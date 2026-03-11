import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { authApi, type ApiResponse } from "@/services/auth.api";
import type { AuthResponse } from "@/types/auth";
import { useWebSocket } from "@/contexts/websocket.context";

export function useActivateAccount() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { connect } = useWebSocket();

  return useMutation<ApiResponse<AuthResponse>, any, string>({
    mutationFn: authApi.activateAccount,

    onSuccess: async () => {
      toast.success("Tài khoản của bạn đã được kích hoạt!");

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["cart"] }),
        queryClient.invalidateQueries({ queryKey: ["user", "me"] }),
      ]);

      setTimeout(connect, 100);
      router.push("/");
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Không thể kích hoạt tài khoản",
      );
    },
  });
}

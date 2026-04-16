import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { authApi, type ApiResponse } from "@/services/auth.api";
import type { AuthResponse, LoginCredentials } from "@/types/auth";
import { useWebSocket } from "@/contexts/websocket.context";

export function useLogin(returnUrl?: string) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { connect } = useWebSocket();

  return useMutation<ApiResponse<AuthResponse>, any, LoginCredentials>({
    mutationKey: ["user", "login"],
    mutationFn: authApi.login,

    onSuccess: async () => {
      toast.success("Đăng nhập thành công");

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["user", "me"] }),
        queryClient.invalidateQueries({ queryKey: ["cart"] }),
      ]);

      setTimeout(connect, 100);

      router.push(returnUrl || "/");
    },

    onError: (error: any) => {
      const response = error?.response;

      if (!response) {
        // Network/system errors are handled globally in QueryClientProvider.
        return;
      }

      switch (response.status) {
        case 401:
          toast.error("Email hoặc mật khẩu không chính xác");
          break;

        case 403:
          toast.error("Tài khoản không tồn tại");
          break;

        default:
          toast.error(response.data?.message || "Đăng nhập thất bại");
      }
    },
  });
}

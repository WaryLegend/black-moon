import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { authApi } from "@/services/auth.api";
import type { AuthResponse, LoginCredentials } from "@/types/auth";
import { useUserStore } from "@/contexts/UserStore";
import { useWebSocket } from "@/contexts/websocket.context";
import { tokenManager } from "@/lib/auth/tokenManager";

export function useLogin(returnUrl?: string) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { connect } = useWebSocket();

  const setUserAuth = useUserStore((s) => s.setAuthenticated);

  type ApiResponse<T> = {
    error?: string | null;
    message?: string;
    data: T;
  };

  return useMutation<ApiResponse<AuthResponse>, any, LoginCredentials>({
    mutationKey: ["user", "login"],
    mutationFn: authApi.login,

    onSuccess: (response) => {
      const user = response?.data?.user;
      const accessToken = response?.data?.access_token;

      if (!user) {
        toast.error("Không thể đăng nhập. Vui lòng thử lại.");
        return;
      }

      if (!user.activated) {
        toast("Tài khoản chưa được xác thực");
        router.push(
          `verify-otp?${new URLSearchParams({
            email: user.email,
            ...(returnUrl && { returnUrl }),
          }).toString()}`,
        );
        return;
      }

      if (accessToken && !tokenManager.getAccessToken()) {
        tokenManager.setAccessToken(accessToken);
      }

      setUserAuth(user);

      toast.success(
        user.firstName
          ? `Chào mừng, ${user.lastName || ""} ${user.firstName}!`
          : "Đăng nhập thành công",
      );

      queryClient.invalidateQueries({ queryKey: ["cart"] });

      setTimeout(connect, 100);

      router.push(returnUrl || "/");
    },

    onError: (error: any) => {
      const response = error?.response;

      if (!response) {
        toast.error("Không thể kết nối đến server");
        return;
      }
      switch (response.status) {
        case 401:
          toast.error("Email hoặc mật khẩu không chính xác");
          break;

        case 403:
          toast.error("Tài khoản không có quyền truy cập vào mục này");
          break;

        case 500:
          toast.error("Lỗi hệ thống. Vui lòng thử lại sau");
          break;

        default:
          toast.error(response.data?.message || "Đăng nhập thất bại");
      }
    },
  });
}

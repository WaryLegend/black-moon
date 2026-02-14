"use client";

import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/services/auth.api";
import { useRouter } from "next/navigation";
import { useAdminStore } from "@/contexts/AdminStore";
import { AuthResponse, LoginCredentials } from "@/types/auth";
import { tokenManager } from "@/lib/auth/tokenManager";
import toast from "react-hot-toast";

export function useAdminLogin() {
  const router = useRouter();
  const setAdminAuth = useAdminStore((state) => state.setAuthenticated);

  type ApiResponse<T> = {
    error?: string | null;
    message?: string;
    data: T;
  };

  return useMutation<ApiResponse<AuthResponse>, any, LoginCredentials>({
    mutationKey: ["admin", "login"],
    mutationFn: authApi.adminLogin,

    onSuccess: (response) => {
      const admin = response?.data?.user;
      const accessToken = response?.data?.access_token;

      if (accessToken && !tokenManager.getAccessToken()) {
        tokenManager.setAccessToken(accessToken);
      }

      setAdminAuth(admin);

      toast.success(
        admin.firstName
          ? `Chào mừng, ${admin.lastName || ""} ${admin.firstName}!`
          : "Đăng nhập thành công",
      );

      router.replace("/admin/dashboard");
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

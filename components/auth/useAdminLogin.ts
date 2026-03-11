"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi, type ApiResponse } from "@/services/auth.api";
import { useRouter } from "next/navigation";
import { AuthResponse, LoginCredentials } from "@/types/auth";
import toast from "react-hot-toast";

export function useAdminLogin() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<AuthResponse>, any, LoginCredentials>({
    mutationKey: ["admin", "login"],
    mutationFn: authApi.adminLogin,

    onSuccess: async () => {
      toast.success("Đăng nhập thành công");
      await queryClient.invalidateQueries({ queryKey: ["user", "me"] });
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
          toast.error("Tài khoản không tồn tại");
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

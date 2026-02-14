import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { authApi } from "@/services/auth.api";

export function useActivateAccount() {
  const router = useRouter();
  const queryClient = useQueryClient();

  type ApiResponse<T> = {
    error?: string | null;
    message?: string;
    data: T;
  };

  return useMutation<ApiResponse<null>, any, string>({
    mutationFn: authApi.activateAccount,

    onSuccess: () => {
      toast.success("Tài khoản của bạn đã được kích hoạt!");

      queryClient.invalidateQueries({ queryKey: ["cart"] });
      router.push("/");
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Không thể kích hoạt tài khoản",
      );
    },
  });
}

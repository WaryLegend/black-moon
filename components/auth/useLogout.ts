import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { authApi } from "@/services/auth.api";
import { useUserStore } from "@/contexts/UserStore";
import { useWebSocket } from "@/contexts/websocket.context";
import toast from "react-hot-toast";
import { useAdminStore } from "@/contexts/AdminStore";

export function useLogout({
  redirect,
  isAdmin = false,
}: {
  redirect?: string;
  isAdmin?: boolean;
}) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const resetUser = useUserStore((s) => s.resetAuthenticated);
  const resetAdmin = useAdminStore((s) => s.resetAuthenticated);
  const { disconnect } = useWebSocket();

  return useMutation<void, any, void>({
    mutationKey: ["logout"],
    mutationFn: async () => {
      try {
        await authApi.logout();
      } catch (error) {
        console.warn(
          "Logout API failed, continuing anyway:",
          error instanceof Error ? error.message : String(error),
        );
      } finally {
        if (isAdmin) resetAdmin();
        else resetUser();
      }
    },
    onMutate: () => {
      // Show toast.promise when mutation starts
      toast.promise(authApi.logout(), {
        loading: "Đang đăng xuất...",
        success: "Đăng xuất thành công",
        error: "Có lỗi xảy ra khi đăng xuất",
      });
    },

    onSettled: () => {
      queryClient.clear();
      disconnect();

      if (isAdmin) router.replace("/admin/login");
      else router.replace(redirect || "/");
    },
  });
}

import { useQuery } from "@tanstack/react-query";

import { authApi } from "@/services/auth.api";
import type { AuthResponse } from "@/types/auth";

export function useGoogleCallback() {
  type ApiResponse<T> = {
    error?: string | null;
    message?: string;
    data: T;
  };

  return useQuery<ApiResponse<Partial<AuthResponse>>>({
    queryKey: ["user", "google-session"],
    queryFn: authApi.refresh,
    retry: false,
    refetchOnWindowFocus: false,
  });
}

import type {
  LoginCredentials,
  RegisterCredentials,
  AuthResponse,
  RegisterResponse,
} from "@/types/auth";
import httpClient from "@/lib/http/httpClient";
import { tokenManager } from "@/lib/auth/tokenManager";

interface ApiResponse<T> {
  error?: string | null;
  message?: string;
  data: T;
}

export const authApi = {
  login: async (data: LoginCredentials) => {
    const response = await httpClient.post<ApiResponse<AuthResponse>>(
      "/api/v1/auth/login",
      data,
    );
    console.log("🔐 Login response:", response.message);

    // Response structure is { status, data: { access_token, user } }
    if (response?.data?.access_token) {
      // Save in memory (for Bearer header)
      tokenManager.setAccessToken(response.data.access_token);
      // Save in cookie (for middleware)
      await setTokenCookie(response.data.access_token);
    }
    return response;
  },

  register: async (data: RegisterCredentials) => {
    const response = await httpClient.post<ApiResponse<RegisterResponse>>(
      "/api/v1/auth/register",
      data,
    );
    return response;
  },

  refresh: async () => {
    try {
      // Gọi refresh token endpoint, cookie sẽ được gửi tự động
      const response = await httpClient.get<ApiResponse<Partial<AuthResponse>>>(
        "/api/v1/auth/refresh",
      );

      if (response?.data?.access_token) {
        tokenManager.setAccessToken(response.data.access_token);
        await setTokenCookie(response.data.access_token);
      }

      return response;
    } catch (error) {
      tokenManager.clearTokens();
      throw error;
    }
  },

  sendVerificationEmail: async (email: string) => {
    const response = await httpClient.get<ApiResponse<null>>(
      `/api/v1/auth/send-activation-email?email=${email}`,
    );
    return response;
  },

  activateAccount: async (key: string) => {
    const response = await httpClient.post<ApiResponse<null>>(
      `/api/v1/auth/activate?key=${key}`,
    );
    return response;
  },

  logout: async () => {
    try {
      // Clear tokens FIRST
      tokenManager.clearTokens();

      await fetch("/api/auth/clear-token", {
        method: "POST",
      });

      const response = await httpClient.post<ApiResponse<null>>(
        "/api/v1/auth/logout",
        { refresh_token: null },
      );

      return response;
    } catch (error) {
      console.warn(
        "Logout API failed (tokens already cleared):",
        (error as any)?.message ?? error,
      );
      return null;
    }
  },

  forgotPassword: async (data: { email: string }) => {
    const response = await httpClient.post<ApiResponse<null>>(
      "/api/v1/auth/recover-password-code",
      data,
    );
    return response;
  },

  // run in BE
  // google: async (code: string) => {
  //   const response = await httpClient.post<ApiResponse<AuthResponse>>(
  //     `/api/v1/auth/google`,
  //     { code },
  //   );

  //   console.log("📦 Google login response:", response);

  //   if (response?.data?.access_token) {
  //     tokenManager.setAccessToken(response.data.access_token);
  //     await setTokenCookie(response.data.access_token);
  //     console.log("🔐 Token saved in authApi.google");
  //   }

  //   return response;
  // },

  verifyOtp: async (data: { email: string; activationCode: string }) => {
    const response = await httpClient.post<ApiResponse<AuthResponse>>(
      "/api/v1/auth/activate-code",
      data,
    );

    if (response?.data?.access_token) {
      tokenManager.setAccessToken(response.data.access_token);
      await setTokenCookie(response.data.access_token);
      console.log("🔐 Token saved in authApi.verifyOtp");
    }
    return response;
  },

  verifyResetPasswordCode: async (data: {
    email: string;
    resetCode: string;
  }) => {
    const response = await httpClient.post<ApiResponse<null>>(
      "/api/v1/auth/verify-reset-code",
      data,
    );
    return response;
  },

  resetPassword: async (data: {
    email: string;
    resetCode: string;
    newPassword: string;
    confirmPassword: string;
  }) => {
    const response = await httpClient.post<ApiResponse<null>>(
      "/api/v1/auth/reset-password-code",
      data,
    );
    return response;
  },

  adminLogin: async (data: LoginCredentials) => {
    const response = await httpClient.post<ApiResponse<AuthResponse>>(
      "/api/v1/workspace/login",
      data,
    );

    console.log("🔐 Admin login response:", response.message);

    if (response?.data?.access_token) {
      tokenManager.setAccessToken(response.data.access_token);
      await setTokenCookie(response.data.access_token);
    }

    return response;
  },
};

async function setTokenCookie(token: string) {
  await fetch("/api/auth/set-token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ access_token: token }),
  });
}

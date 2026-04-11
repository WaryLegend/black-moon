import type {
  LoginCredentials,
  RegisterCredentials,
  ResetPasswordCredentials,
  ChangePasswordCredentials,
  ForgotPasswordCredentials,
  AuthResponse,
  RegisterResponse,
} from "@/types/auth";
import httpClient from "@/lib/http/httpClient";
import { tokenManager } from "@/lib/auth/tokenManager";
import { clearAccessTokenCookie } from "@/lib/auth/accessTokenCookie";
import { persistAccessToken } from "@/lib/auth/persistAccessToken";
import { joinApiPath } from "@/lib/constants/api";

export interface ApiResponse<T> {
  error?: string | null;
  message?: string;
  data: T;
}

const AUTH_BASE_PATH = joinApiPath("/auth");

const normalizeApiResponse = <T>(
  payload: ApiResponse<T> | T,
): ApiResponse<T> => {
  if (payload !== null && typeof payload === "object" && "data" in payload) {
    return payload as ApiResponse<T>;
  }

  return {
    data: payload as T,
  };
};

const extractAccessToken = (payload?: AuthResponse | null): string | null =>
  payload?.accessToken ?? null;

export const authApi = {
  login: async (data: LoginCredentials) => {
    const raw = await httpClient.post<AuthResponse>(
      `${AUTH_BASE_PATH}/login`,
      data,
    );
    const response = normalizeApiResponse(raw);

    await persistAccessToken(extractAccessToken(response.data));
    return response;
  },

  adminLogin: async (data: LoginCredentials) => {
    const raw = await httpClient.post<AuthResponse>(
      `${AUTH_BASE_PATH}/workspace/login`,
      data,
    );
    const response = normalizeApiResponse(raw);

    await persistAccessToken(extractAccessToken(response.data));
    return response;
  },

  register: async (data: RegisterCredentials) => {
    const raw = await httpClient.post<RegisterResponse>(
      `${AUTH_BASE_PATH}/register`,
      data,
    );
    return normalizeApiResponse(raw);
  },

  refresh: async (refreshToken?: string | null) => {
    try {
      const payload = refreshToken ? { refreshToken } : {};

      const raw = await httpClient.post<AuthResponse>(
        `${AUTH_BASE_PATH}/refresh`,
        payload,
      );
      const response = normalizeApiResponse(raw);

      await persistAccessToken(extractAccessToken(response.data));
      return response;
    } catch (error) {
      tokenManager.clearTokens();
      await clearAccessTokenCookie();
      throw error;
    }
  },

  sendVerificationEmail: async (email: string) => {
    const raw = await httpClient.get<void>(
      `${AUTH_BASE_PATH}/send-email-activation`,
      {
        params: { email },
      },
    );
    return normalizeApiResponse(raw);
  },

  activateAccount: async (key: string) => {
    const raw = await httpClient.get<AuthResponse>(
      `${AUTH_BASE_PATH}/activate`,
      {
        params: { key },
      },
    );
    const response = normalizeApiResponse(raw);

    await persistAccessToken(extractAccessToken(response.data));
    return response;
  },

  logout: async () => {
    try {
      const raw = await httpClient.post<{ success: boolean }>(
        `${AUTH_BASE_PATH}/logout`,
        {},
      );
      return normalizeApiResponse(raw);
    } finally {
      tokenManager.clearTokens();
      await clearAccessTokenCookie();
    }
  },

  forgotPassword: async (data: ForgotPasswordCredentials) => {
    const raw = await httpClient.post<void>(
      `${AUTH_BASE_PATH}/recover-password-code`,
      data,
    );
    return normalizeApiResponse(raw);
  },

  verifyOtp: async (data: { email: string; activationCode: string }) => {
    const raw = await httpClient.post<AuthResponse>(
      `${AUTH_BASE_PATH}/activate-code`,
      data,
    );
    const response = normalizeApiResponse(raw);

    await persistAccessToken(extractAccessToken(response.data));
    return response;
  },

  verifyResetPasswordCode: async (data: {
    email: string;
    resetCode: string;
  }) => {
    const raw = await httpClient.post<void>(
      `${AUTH_BASE_PATH}/verify-reset-code`,
      data,
    );
    return normalizeApiResponse(raw);
  },

  resetPassword: async (data: ResetPasswordCredentials) => {
    const raw = await httpClient.post<void>(
      `${AUTH_BASE_PATH}/reset-password-code`,
      data,
    );
    return normalizeApiResponse(raw);
  },

  changePassword: async (data: ChangePasswordCredentials) => {
    const raw = await httpClient.post<void>(
      `${AUTH_BASE_PATH}/change-password`,
      data,
    );
    return normalizeApiResponse(raw);
  },
};

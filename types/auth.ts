export type LoginCredentials = {
  email: string;
  password: string;
};

export type RegisterCredentials = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  birthDate?: string;
  gender?: string;
};

export type ForgotPasswordCredentials = {
  email: string;
};

export type ResetPasswordCredentials = {
  email: string;
  resetCode: string;
  newPassword: string;
  confirmPassword: string;
};

export type ChangePasswordCredentials = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export interface AccountInfo {
  id: number;
  email: string;
  firstName: string | null;
  lastName: string | null;
  avatar: string | null;
  activated: boolean;
}

export type Role = {
  id: number;
  name: string;
};

export interface AuthUser extends AccountInfo {
  role: Role | null;
}

export type User = AuthUser;
export type Admin = AuthUser;

export interface AuthResponse {
  accessToken: string | null;
  refreshToken: string | null;
}

export interface RegisterResponse {
  id: number;
  email: string;
  firstName: string | null;
  lastName: string | null;
}

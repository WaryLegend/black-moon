import {
  loginSchema,
  registerSchema,
  resetPasswordSchema,
} from "@/schemas/auth.schema";
import { z } from "zod";

// Derive types from schemas
export type LoginCredentials = z.infer<typeof loginSchema>;
export type RegisterCredentials = z.infer<typeof registerSchema>;
export type ResetPasswordCredentials = z.infer<typeof resetPasswordSchema>;

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

export interface User extends AccountInfo {
  role: Role;
}

export interface Admin extends AccountInfo {
  role: Role;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  user: User | Admin;
}

export interface RegisterResponse {
  message: string;
}

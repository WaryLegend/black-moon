import type { ProfileDetails } from "@/types/profile";
import type { SortDirection } from "@/types/sort";

export type UsersPageSearchParams = {
  page?: string;
  role?: string;
  activated?: string;
  sortBy?: string;
};

export type UserRoleSummary = {
  id: number;
  name: string;
  priority: number;
};

export type UserSummary = {
  id: number;
  email: string;
  activated: boolean;
  createdAt: string;
  lastLogin: string | null;
  role: UserRoleSummary | null;
  profile: ProfileDetails | null;
};

export type UsersListMeta = {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
};

export type UsersListResponse = {
  items: UserSummary[];
  meta: UsersListMeta;
};

export type ListUsersFilters = {
  role?: string;
  activated?: boolean;
};

export type ListUsersSortField = "createdAt" | "firstName" | "lastName";

export type ListUsersSort = {
  field: ListUsersSortField;
  direction: SortDirection;
};

export type ListUsersParams = {
  page?: number;
  filters?: ListUsersFilters;
  sortBy?: ListUsersSort;
  search?: string;
};

type ProfileInputFields = {
  firstName?: string | null;
  lastName?: string | null;
  phoneNumber?: string | null;
  gender?: ProfileDetails["gender"];
  birthDate?: string | null;
};

export type CreateUserDto = ProfileInputFields & {
  email: string;
  password: string;
  roleName: string;
  activated?: boolean;
};

export type UpdateUserProfileDto = ProfileInputFields;

export type UpdateUserRoleDto = {
  roleName: string;
};

export type UpdateUserActivationDto = {
  activated: boolean;
};

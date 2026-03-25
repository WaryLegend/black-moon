import httpClient from "@/lib/http/httpClient";
import type {
  CreateUserDto,
  ListUsersParams,
  UpdateUserActivationDto,
  UpdateUserProfileDto,
  UpdateUserRoleDto,
  UserSummary,
  UsersListResponse,
} from "@/types/users";

const USERS_BASE_PATH = "/api/v1/users";

const buildListEndpoint = (params: ListUsersParams = {}): string => {
  const query = new URLSearchParams();
  const { page, filters, sortBy, search } = params;

  if (page && Number.isFinite(page) && page > 0) {
    query.set("page", String(page));
  }

  if (filters?.role) {
    query.set("role", filters.role.trim().toUpperCase());
  }

  if (filters?.activated !== undefined) {
    query.set("activated", String(filters.activated));
  }

  if (search?.trim()) {
    query.set("search", search.trim());
  }

  if (sortBy?.field) {
    query.set("sortField", sortBy.field);
    query.set("sortOrder", sortBy.direction);
  }

  const queryString = query.toString();
  return queryString ? `${USERS_BASE_PATH}?${queryString}` : USERS_BASE_PATH;
};

export const usersApi = {
  async list(params: ListUsersParams = {}) {
    const endpoint = buildListEndpoint(params);
    return httpClient.get<UsersListResponse>(endpoint);
  },

  async create(payload: CreateUserDto) {
    return httpClient.post<UserSummary>(USERS_BASE_PATH, payload);
  },

  async update(userId: number, payload: UpdateUserProfileDto) {
    return httpClient.patch<UserSummary>(
      `${USERS_BASE_PATH}/${userId}`,
      payload,
    );
  },

  async updateActivation(userId: number, payload: UpdateUserActivationDto) {
    return httpClient.patch<UserSummary>(
      `${USERS_BASE_PATH}/${userId}/activation`,
      payload,
    );
  },

  async updateRole(userId: number, payload: UpdateUserRoleDto) {
    return httpClient.patch<UserSummary>(
      `${USERS_BASE_PATH}/${userId}/role`,
      payload,
    );
  },
};

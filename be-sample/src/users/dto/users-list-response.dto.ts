import { UserResponseDto } from './user-response.dto';

export class UsersListResponseDto {
  items: UserResponseDto[];
  meta: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };
}

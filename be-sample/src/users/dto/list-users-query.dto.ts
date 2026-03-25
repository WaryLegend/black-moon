import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsIn,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';

export type UserSortField = 'createdAt' | 'firstName' | 'lastName';
export type UserSortOrder = 'asc' | 'desc';

export class ListUsersQueryDto {
  @Transform(({ value }) => {
    if (value === undefined || value === null || value === '') {
      return 1;
    }
    const parsed = Number(value);
    return Number.isNaN(parsed) ? 1 : parsed;
  })
  @IsInt()
  @IsPositive()
  page = 1;

  @Transform(({ value }) => {
    if (typeof value !== 'string') {
      return undefined;
    }
    const normalized = value.trim();
    return normalized ? normalized.toUpperCase() : undefined;
  })
  @IsOptional()
  @IsString()
  role?: string;

  @Transform(({ value }) => {
    if (value === undefined || value === null || value === '') {
      return undefined;
    }
    if (typeof value === 'boolean') {
      return value;
    }
    if (typeof value === 'string') {
      const normalized = value.trim().toLowerCase();
      if (normalized === 'true') {
        return true;
      }
      if (normalized === 'false') {
        return false;
      }
    }
    return undefined;
  })
  @IsOptional()
  @IsBoolean()
  activated?: boolean;

  @Transform(({ value }) => {
    if (typeof value !== 'string') {
      return undefined;
    }
    const normalized = value.trim();
    return normalized.length ? normalized : undefined;
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  search?: string;

  @IsOptional()
  @IsIn(['createdAt', 'firstName', 'lastName'])
  sortField: UserSortField = 'createdAt';

  @IsOptional()
  @IsIn(['asc', 'desc'])
  sortOrder: UserSortOrder = 'desc';
}

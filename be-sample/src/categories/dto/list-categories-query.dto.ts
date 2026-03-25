import { Transform } from 'class-transformer';
import {
  IsArray,
  IsIn,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';

export type CategorySortField = 'createdAt' | 'name';
export type CategorySortOrder = 'asc' | 'desc';

export class ListCategoriesQueryDto {
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
    if (value === undefined || value === null || value === '') {
      return undefined;
    }

    const values = Array.isArray(value)
      ? value
      : typeof value === 'string'
        ? value.split(',')
        : [value];

    const normalized = values
      .map((item) => String(item).trim().toLowerCase())
      .filter((item) => item.length > 0);

    return normalized.length ? Array.from(new Set(normalized)) : undefined;
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  groups?: string[];

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
  @IsIn(['createdAt', 'name'])
  sortField: CategorySortField = 'createdAt';

  @IsOptional()
  @IsIn(['asc', 'desc'])
  sortOrder: CategorySortOrder = 'desc';
}

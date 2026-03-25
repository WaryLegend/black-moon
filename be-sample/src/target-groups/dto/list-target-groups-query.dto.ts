import { Transform } from 'class-transformer';
import {
  IsIn,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';

export type TargetGroupSortField = 'createdAt' | 'name';
export type TargetGroupSortOrder = 'asc' | 'desc';

export class ListTargetGroupsQueryDto {
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
    return normalized.length ? normalized : undefined;
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  search?: string;

  @IsOptional()
  @IsIn(['createdAt', 'name'])
  sortField: TargetGroupSortField = 'createdAt';

  @IsOptional()
  @IsIn(['asc', 'desc'])
  sortOrder: TargetGroupSortOrder = 'desc';
}

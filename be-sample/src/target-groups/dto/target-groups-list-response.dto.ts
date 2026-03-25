import { TargetGroupResponseDto } from './target-group-response.dto';

export class TargetGroupsListResponseDto {
  items: TargetGroupResponseDto[];
  meta: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };
}

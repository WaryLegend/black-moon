import { CategoryResponseDto } from './category-response.dto';

export class CategoriesListResponseDto {
  items: CategoryResponseDto[];
  meta: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };
}

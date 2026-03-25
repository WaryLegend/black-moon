export class CategoryResponseDto {
  id: number;
  name: string;
  slug: string;
  imageUrl: string | null;
  imageName: string | null;
  targetGroup: {
    id: number;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
}

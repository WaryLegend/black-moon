export class ProductResponseDto {
  id: number;
  name: string | null;
  description: string | null;
  price: number | null;
  slug: string | null;
  isFeatured: boolean;
  colorDefault: string | null;
  category: { id: number; name: string | null } | null;
  variants: Array<{
    id: number;
    sku: string | null;
    color: string | null;
    size: string | null;
    quantity: number | null;
    differencePrice: number | null;
  }>;
  images: Array<{
    id: number;
    publicUrl: string | null;
    gcsUrl: string | null;
  }>;
}

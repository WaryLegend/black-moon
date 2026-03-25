export class ProductResponseDto {
  id: number;
  name: string | null;
  description: string | null;
  slug: string | null;
  isFeatured: boolean;
  category: { id: number; name: string | null; slug: string } | null;
  variants: Array<{
    id: number;
    sku: string | null;
    color: string | null;
    size: string | null;
    quantity: number | null;
    price: number | null;
  }>;
  images: Array<{
    id: number;
    publicUrl: string | null;
    gcsUrl: string | null;
  }>;
}

export class OrderResponseDto {
  id: number;
  code: string | null;
  orderDate: string | null;
  status: string | null;
  paymentStatus: string | null;
  paymentMethod: string | null;
  total: number | null;
  finalTotal: number | null;
  items: Array<{
    id: number;
    productVariantId: number | null;
    quantity: number | null;
    unitPrice: number | null;
    finalPrice: number | null;
  }>;
}

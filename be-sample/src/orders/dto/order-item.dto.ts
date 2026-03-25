import { IsInt } from 'class-validator';

export class OrderItemDto {
  @IsInt()
  productVariantId: number;

  @IsInt()
  quantity: number;
}

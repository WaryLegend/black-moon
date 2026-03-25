import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, OrderStatus, PaymentStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderResponseDto } from './dto/order-response.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: number, dto: CreateOrderDto): Promise<OrderResponseDto> {
    if (!dto.items?.length) {
      throw new BadRequestException('Order items are required');
    }

    const itemsData = [] as Array<{
      productVariantId: number;
      quantity: number;
      unitPrice: Prisma.Decimal;
      finalPrice: Prisma.Decimal;
    }>;

    let total = 0;

    for (const item of dto.items) {
      const variant = await this.prisma.productVariant.findUnique({
        where: { id: item.productVariantId },
        include: { product: true },
      });
      if (!variant || !variant.product || variant.product.isDeleted) {
        throw new NotFoundException('Product variant not found');
      }
      if (variant.quantity !== null && variant.quantity < item.quantity) {
        throw new BadRequestException('Insufficient stock');
      }
      if (!variant.price) {
        throw new BadRequestException('Missing variant price');
      }

      const unitPrice = variant.price.toNumber();
      const finalPrice = unitPrice * item.quantity;

      total += finalPrice;
      itemsData.push({
        productVariantId: variant.id,
        quantity: item.quantity,
        unitPrice: new Prisma.Decimal(unitPrice),
        finalPrice: new Prisma.Decimal(finalPrice),
      });
    }

    const order = await this.prisma.order.create({
      data: {
        user: { connect: { id: userId } },
        orderDate: new Date(),
        status: OrderStatus.PENDING,
        paymentStatus: PaymentStatus.PENDING,
        paymentMethod: dto.paymentMethod,
        total: new Prisma.Decimal(total),
        finalTotal: new Prisma.Decimal(total),
        shippingFirstName: dto.shipping.firstName,
        shippingLastName: dto.shipping.lastName,
        shippingFullName: dto.shipping.fullName,
        shippingPhoneNumber: dto.shipping.phoneNumber,
        shippingAddress: dto.shipping.address,
        shippingWardId: dto.shipping.wardId,
        shippingWard: dto.shipping.ward,
        shippingDistrictId: dto.shipping.districtId,
        shippingDistrict: dto.shipping.district,
        shippingProvinceId: dto.shipping.provinceId,
        shippingProvince: dto.shipping.province,
        shippingCountry: dto.shipping.country,
        lineItems: {
          create: itemsData.map((item) => ({
            productVariant: { connect: { id: item.productVariantId } },
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            finalPrice: item.finalPrice,
          })),
        },
      },
      include: { lineItems: true },
    });

    return this.toOrderResponse(order);
  }

  async getMyOrders(userId: number): Promise<OrderResponseDto[]> {
    const orders = await this.prisma.order.findMany({
      where: { userId },
      include: { lineItems: true },
      orderBy: { createdAt: 'desc' },
    });
    return orders.map((order) => this.toOrderResponse(order));
  }

  async getById(userId: number, orderId: number): Promise<OrderResponseDto> {
    const order = await this.prisma.order.findFirst({
      where: { id: orderId, userId },
      include: { lineItems: true },
    });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return this.toOrderResponse(order);
  }

  private toOrderResponse(order: {
    id: number;
    code: string | null;
    orderDate: Date | null;
    status: OrderStatus | null;
    paymentStatus: PaymentStatus | null;
    paymentMethod: string | null;
    total: Prisma.Decimal | null;
    finalTotal: Prisma.Decimal | null;
    lineItems: Array<{
      id: number;
      productVariantId: number | null;
      quantity: number | null;
      unitPrice: Prisma.Decimal | null;
      finalPrice: Prisma.Decimal | null;
    }>;
  }): OrderResponseDto {
    return {
      id: order.id,
      code: order.code,
      orderDate: order.orderDate ? order.orderDate.toISOString() : null,
      status: order.status,
      paymentStatus: order.paymentStatus,
      paymentMethod: order.paymentMethod,
      total: order.total ? order.total.toNumber() : null,
      finalTotal: order.finalTotal ? order.finalTotal.toNumber() : null,
      items: order.lineItems.map((item) => ({
        id: item.id,
        productVariantId: item.productVariantId,
        quantity: item.quantity,
        unitPrice: item.unitPrice ? item.unitPrice.toNumber() : null,
        finalPrice: item.finalPrice ? item.finalPrice.toNumber() : null,
      })),
    };
  }
}

import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderResponseDto } from './dto/order-response.dto';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(
    @CurrentUser() user: { id: number },
    @Body() dto: CreateOrderDto,
  ): Promise<OrderResponseDto> {
    return this.ordersService.create(user.id, dto);
  }

  @Get('my')
  getMyOrders(
    @CurrentUser() user: { id: number },
  ): Promise<OrderResponseDto[]> {
    return this.ordersService.getMyOrders(user.id);
  }

  @Get(':id')
  getById(
    @CurrentUser() user: { id: number },
    @Param('id') id: string,
  ): Promise<OrderResponseDto> {
    return this.ordersService.getById(user.id, Number(id));
  }
}

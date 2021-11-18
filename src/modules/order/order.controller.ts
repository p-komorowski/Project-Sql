import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Roles } from '../auth/decorators/role.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Role } from '../user/enum/role.enum';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Order } from './entity/order.entity';
import { OrderService } from './order.service';

@ApiTags('Order')
@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  @Roles(Role.User)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create order for logged user' })
  @ApiResponse({ status: 200, description: 'Order created.' })
  @ApiUnauthorizedResponse({ description: 'User not logged in.' })
  async addBasketToOrder() {
   return this.orderService.createOrder();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  @Roles(Role.Moderator)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Show list of placed orders' })
  @ApiResponse({ status: 200, description: 'Order list shown' })
  @ApiUnauthorizedResponse({ description: 'User not logged in.' })
  async getAllOrders(): Promise<Order[]> {
    return this.orderService.getAllOrders();
  }
}

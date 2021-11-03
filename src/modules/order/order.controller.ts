import { Controller, Get, Post, UseGuards } from "@nestjs/common";
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { Roles } from "../auth/decorators/role.decorator";
import { JwtAuthGuard } from "../auth/strategy/jwt-auth.guard";
import { Role } from "../auth/strategy/models/role.enum";
import { RolesGuard } from "../auth/strategy/roles.guard";
import { Order } from "./entity/order.entity";
import { OrderService } from "./order.service";

@ApiTags("Order")
@Controller("order")
export class OrderController {
  constructor(private orderService: OrderService) {}

  
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  @Roles(Role.User)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create order for logged yser' })
  @ApiResponse({ status: 200, description: 'Order created.' })
  @ApiUnauthorizedResponse({ description: 'User not logged in.' })
  async addBasketToOrder() {
    await this.orderService.createOrder();
  }

  
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  @Roles(Role.User)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Show list of places orders' })
  @ApiResponse({ status: 200, description: 'Order list shown' })
  @ApiUnauthorizedResponse({ description: 'User not logged in.' })
  async getAllOrders():Promise<Order[]>{
   return await this.orderService.getAllOrders()
  }
  
}

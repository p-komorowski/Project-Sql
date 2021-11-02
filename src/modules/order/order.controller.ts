import { Controller, Post, UseGuards } from "@nestjs/common";
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/strategy/jwt-auth.guard";
import { OrderService } from "./order.service";

@ApiTags("Order")
@Controller("order")
export class OrderController {
  constructor(private orderService: OrderService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create order for logged yser' })
  @ApiResponse({ status: 200, description: 'Order created.' })
  @ApiUnauthorizedResponse({ description: 'User not logged in.' })
  async addBasketToOrder() {
    await this.orderService.createOrder();
  }
}

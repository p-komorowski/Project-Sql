import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/strategy/jwt-auth.guard";
import { BasketService } from "./basket.service";
import { shoppingBasket } from "./entity/shopping_basket.entity";

@Controller("basket")
export class BasketController {
  constructor(private basketService: BasketService) {}
  
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllProducts(): Promise<shoppingBasket[]> {
    return await this.basketService.getProducts();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async addProduct(@Body() productData: shoppingBasket): Promise<string> {
    return this.basketService.insertProduct(productData);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":basket_id")
  async removeProduct(@Param("basket_id") basket_id: string) {
    await this.basketService.deleteProduct(basket_id);
  }
}

import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { BasketService } from "./basket.service";
import { shoppingBasket } from "./basket_entity/shopping_basket.entity";

@Controller("basket")
export class BasketController {
  constructor(private basketService: BasketService) {}
  @Get()
  async getAllProducts(): Promise<shoppingBasket[]> {
    return await this.basketService.getProducts();
  }

  @Post()
  async addProduct(@Body() productData: shoppingBasket): Promise<string> {
    return this.basketService.insertProduct(productData);
  }

  @Delete(":basket_id")
  async removeProduct(@Param("basket_id") basket_id: string) {
    await this.basketService.deleteProduct(basket_id);
  }
}

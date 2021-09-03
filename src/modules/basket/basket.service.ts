import { Injectable } from "@nestjs/common";
import { BasketRepository } from "./basket.repository";
import { shoppingBasket } from "./basket_entity/shopping_basket.entity";

@Injectable()
export class BasketService {
  constructor(private readonly repository: BasketRepository) {}

  async insertProduct(newBasket: shoppingBasket): Promise<any> {
    return this.repository.save(newBasket);
  }

  public async getProducts(): Promise<shoppingBasket[]> {
    return this.repository.findAll();
  }

  async deleteProduct(basket_id: string): Promise<void> {
    await this.repository.delete(basket_id);
  }
}

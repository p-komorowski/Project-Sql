import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BasketRepository } from "./repository/basket.repository";
import { shoppingBasket } from "./entity/shopping_basket.entity";

@Injectable()
export class BasketService {
  constructor(@InjectRepository(shoppingBasket)
              private readonly repository: BasketRepository) {}

  async insertProduct(newBasket: shoppingBasket): Promise<any> {
    return this.repository.save(newBasket);
  }

  public async getProducts(): Promise<shoppingBasket[]> {
    return this.repository.find();
  }

  async deleteProduct(basket_id: string): Promise<void> {
    await this.repository.delete(basket_id);
  }
}

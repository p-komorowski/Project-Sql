import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BasketDto } from "./dto/basket.dto";
import { BasketBooks } from "./entities/basket_books.entity";
import { BasketRepository } from "./repository/basket.repository";

@Injectable()
export class BasketService {
  constructor(
    @InjectRepository(BasketBooks)
    private readonly repository: BasketRepository
  ) {}

  async insertProduct(newBasket: BasketDto): Promise<any> {
    return this.repository.save(newBasket);
  }

  public async getProducts(): Promise<BasketBooks[]> {
    return this.repository.find();
  }

  async deleteProduct(basket_id: string): Promise<void> {
    await this.repository.delete(basket_id);
  }
}

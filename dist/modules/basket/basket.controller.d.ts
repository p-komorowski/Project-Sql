import { BasketService } from './basket.service';
import { BasketDto } from './dto/basket.dto';
import { shoppingBasket } from './entity/basket.entity';
export declare class BasketController {
  private basketService;
  constructor(basketService: BasketService);
  getAllProducts(): Promise<shoppingBasket[]>;
  addProduct(productData: BasketDto): Promise<string>;
  removeProduct(basket_id: string): Promise<void>;
}

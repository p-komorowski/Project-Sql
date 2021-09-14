import { BasketService } from "./basket.service";
import { shoppingBasket } from "./entity/shopping_basket.entity";
export declare class BasketController {
    private basketService;
    constructor(basketService: BasketService);
    getAllProducts(): Promise<shoppingBasket[]>;
    addProduct(productData: shoppingBasket): Promise<string>;
    removeProduct(basket_id: string): Promise<void>;
}

import { BasketRepository } from "./repository/basket.repository";
import { shoppingBasket } from "./entity/shopping_basket.entity";
export declare class BasketService {
    private readonly repository;
    constructor(repository: BasketRepository);
    insertProduct(newBasket: shoppingBasket): Promise<any>;
    getProducts(): Promise<shoppingBasket[]>;
    deleteProduct(basket_id: string): Promise<void>;
}

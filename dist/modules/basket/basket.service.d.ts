import { BasketDto } from "./dto/basket.dto";
import { shoppingBasket } from "./entity/basket.entity";
import { BasketRepository } from "./repository/basket.repository";
export declare class BasketService {
    private readonly repository;
    constructor(repository: BasketRepository);
    insertProduct(newBasket: BasketDto): Promise<any>;
    getProducts(): Promise<shoppingBasket[]>;
    deleteProduct(basket_id: string): Promise<void>;
}

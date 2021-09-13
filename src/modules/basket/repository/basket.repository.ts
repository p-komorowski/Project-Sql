import { EntityRepository, Repository } from "typeorm";
import { shoppingBasket } from "../entity/shopping_basket.entity";

@EntityRepository(shoppingBasket)
export class BasketRepository extends Repository<shoppingBasket> {}

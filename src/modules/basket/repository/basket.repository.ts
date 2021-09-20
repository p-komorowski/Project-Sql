import { EntityRepository, Repository } from "typeorm";
import { shoppingBasket } from "../entity/basket.entity";

@EntityRepository(shoppingBasket)
export class BasketRepository extends Repository<shoppingBasket> {}

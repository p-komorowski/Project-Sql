
import { EntityRepository, Repository } from "typeorm";
import { Basket } from "../entities/basket.entity";
import { BasketBooks } from "../entities/basket_book.entity";


@EntityRepository(Basket)
export class BasketRepository extends Repository<Basket> {}

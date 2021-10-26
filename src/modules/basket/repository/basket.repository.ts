
import { EntityRepository, Repository } from "typeorm";
import { Basket } from "../entities/basket.entity";
import { BasketBooks } from "../entities/basket_book.entity";


@EntityRepository(BasketBooks)
export class BasketBooksRepository extends Repository<BasketBooks> {}

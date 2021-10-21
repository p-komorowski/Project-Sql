
import { EntityRepository, Repository } from "typeorm";
import { BasketBooks } from "../entities/basket_book.entity";


@EntityRepository(BasketBooks)
export class BasketRepository extends Repository<BasketBooks> {}

import { EntityRepository, Repository } from "typeorm";
import { BasketBooks } from "../entities/basket_books.entity";

@EntityRepository(BasketBooks)
export class BasketRepository extends Repository<BasketBooks> {}

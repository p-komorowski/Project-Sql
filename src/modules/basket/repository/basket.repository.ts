import { EntityRepository, Repository } from "typeorm";
import { BasketBook } from "../entities/basket_book.entity";

@EntityRepository(BasketBook)
export class BasketBooksRepository extends Repository<BasketBook> {}

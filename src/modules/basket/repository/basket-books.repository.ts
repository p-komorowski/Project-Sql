import { EntityRepository, Repository } from 'typeorm';
import { BasketBook } from '../entities/basket-book.entity';

@EntityRepository(BasketBook)
export class BasketBooksRepository extends Repository<BasketBook> {}

import { Book } from '../entities/book.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Book)
export class BooksRepository extends Repository<Book> {}

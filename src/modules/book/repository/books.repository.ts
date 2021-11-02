import { Book } from "../entity/book.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Book)
export class BooksRepository extends Repository<Book> {}

import { Books } from "../entity/books.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Books)
export class BooksRepository extends Repository<Books> {}

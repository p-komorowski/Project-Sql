import { Books } from "../entity/book.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Books)
export class BooksRepository extends Repository<Books> {}

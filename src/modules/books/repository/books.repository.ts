import { Books } from "../entity/books.entity";
import {EntityRepository, Repository} from "typeorm";

@EntityRepository(Books)
export class BooksRepository extends Repository<Books> {}

// BooksRepository extenduje klase Repository<> i pozwala uzywac jej wszystkich metod do oblusgi zapytan i polaczenia do bazy

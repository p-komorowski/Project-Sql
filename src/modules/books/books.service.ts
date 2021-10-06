import { Injectable } from "@nestjs/common";
import { BooksRepository } from "./repository/books.repository";
import { Books } from "./entity/books.entity";
import { Connection } from "typeorm";
import { BookDto } from "./dto/books.dto";
import { RequestContextProvider } from "../../middleware/request-context.middleware";

@Injectable()
export class BooksService {
  private booksRepository: BooksRepository;
  constructor(private readonly connection: Connection) {
    this.booksRepository = this.connection.getCustomRepository(BooksRepository);
  }

  async insertProduct(newProduct: BookDto): Promise<Books> {
    return this.booksRepository.save(newProduct);
  }

  public async getProducts(): Promise<Books[]> {
    const currentUser = RequestContextProvider.currentUser();
    return this.booksRepository.find();
  }

  async deleteProduct(IBSN: string): Promise<void> {
    await this.booksRepository.delete(IBSN);
  }
}

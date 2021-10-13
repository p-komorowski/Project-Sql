import { Injectable } from "@nestjs/common";
import { BooksRepository } from "./repository/books.repository";
import { Books } from "./entity/book.entity";
import { Connection } from "typeorm";
import { BookDto } from "./dto/book.dto";
import { RequestContextProvider } from "../../middleware/request-context.middleware";
import { BasketRepository } from "../basket/repository/basket.repository";
import { BasketBooksDto } from "../basket/dto/basket_book.dto";
import { Basket } from "../basket/entities/basket.entity";
import { BasketBooks } from "../basket/entities/basket_book.entity";

@Injectable()
export class BooksService {
  private booksRepository: BooksRepository;
  private basketRepository: BasketRepository
  constructor(private readonly connection: Connection) {
    this.booksRepository = this.connection.getCustomRepository(BooksRepository);
  }

  async insertProduct(newProduct: BookDto): Promise<Books> {
    return this.booksRepository.save(newProduct);
  }

  public async getProducts(): Promise<Books[]> {
    //const currentUser = RequestContextProvider.currentUser();
    return this.booksRepository.find();
  }

   public async getBook(IBSN:string): Promise<Books> {
     const test = await this.booksRepository.findOne({
      where: {
        IBSN:IBSN,
      },
    })
    return test

  }
  
  async deleteProduct(IBSN: string): Promise<void> {
    await this.booksRepository.delete(IBSN);
  }
}

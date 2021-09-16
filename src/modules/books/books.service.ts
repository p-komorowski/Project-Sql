import { Injectable } from "@nestjs/common";
import { BooksRepository } from "./repository/books.repository";
import { Books } from "./entity/books.entity";

import { Connection } from "typeorm";

@Injectable()
export class BooksService {
  private booksRepository: BooksRepository;
  constructor(
      private readonly connection: Connection
  ) {
      this.booksRepository = this.connection.getCustomRepository(BooksRepository);
  }


  async insertProduct(newProduct: Books): Promise<Books> {
    return this.booksRepository.save(newProduct);
  }

  public async getProducts(): Promise<Books[]> {
    const id: string = '56757456';
    return this.booksRepository.find({
      where: {
        IBSN: id
      }
    });
  }

  async deleteProduct(IBSN: string): Promise<void> {
    await this.booksRepository.delete(IBSN);
  }
}

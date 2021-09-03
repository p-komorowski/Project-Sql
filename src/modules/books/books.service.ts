import { Injectable } from "@nestjs/common";
import { BooksRepository } from "./books.repository";
import { Books } from "./books_entity/books.entity";

@Injectable()
export class BooksService {
  constructor(private readonly repository: BooksRepository) {}

  async insertProduct(newProduct: Books): Promise<any> {
    return this.repository.save(newProduct);
  }

  public async getProducts(): Promise<Books[]> {
    return this.repository.findAll();
  }

  async deleteProduct(IBSN: string): Promise<void> {
    await this.repository.delete(IBSN);
  }
}

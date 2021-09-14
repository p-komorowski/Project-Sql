import { Injectable } from "@nestjs/common";
import { BooksRepository } from "./repository/books.repository";
import { Books } from "./entity/books.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class BooksService {
  constructor(@InjectRepository(Books)
              private readonly repository: BooksRepository) {}

  async insertProduct(newProduct: Books): Promise<Books> {
    return this.repository.save(newProduct);
  }

  public async getProducts(): Promise<Books[]> {
    const id: string = '56757456';
    return this.repository.find({
      where: {
        IBSN: id
      }
    });
  }

  async deleteProduct(IBSN: string): Promise<void> {
    await this.repository.delete(IBSN);
  }
}

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BooksService } from "../book/book.service";
import { BookDto } from "../book/dto/book.dto";
import { Books } from "../book/entity/book.entity";
import { BooksRepository } from "../book/repository/books.repository";
import { BasketDto } from "./dto/basket.dto";
import { BasketBooksDto } from "./dto/basket_book.dto";
import { BasketBooks } from "./entities/basket_book.entity";
import { BasketRepository } from "./repository/basket.repository";


@Injectable()
export class BasketService {
  constructor(
    @InjectRepository(BasketBooks)
    private readonly repository: BasketRepository,
    private readonly booksRepository: BooksRepository,
    private readonly booksService:BooksService,
  ) {}

  async insertProduct(newBasket: BasketDto): Promise<any> {
    return this.repository.save(newBasket);
  }

  public async getProducts(): Promise<BasketBooks[]> {
    return this.repository.find();
  }

  async deleteProduct(basket_id: string): Promise<void> {
    await this.repository.delete(basket_id);
  }

 async GetBookByIBSN(book:BasketBooksDto): Promise<Books>{
   const test = await this.booksService.getBook(book.IBSN)
   return test
 }

  async deleteBooks(IBSN: string): Promise<void> {
    await this.repository.delete(IBSN);
  }
}

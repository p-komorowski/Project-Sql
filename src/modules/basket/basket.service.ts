import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RequestContextProvider } from "../../middleware/request-context.middleware";
import { BooksService } from "../book/book.service";
import { BookDto } from "../book/dto/book.dto";
import { Books } from "../book/entity/book.entity";
import { BooksRepository } from "../book/repository/books.repository";
import { BasketDto } from "./dto/basket.dto";
import { Basket } from "./entities/basket.entity";
import { BasketBooks } from "./entities/basket_book.entity";
import { BasketRepository } from "./repository/basket.repository";


@Injectable()
export class BasketService {
  constructor(
    @InjectRepository(BasketBooks)
    private readonly repository: BasketRepository,
    private readonly booksService:BooksService
  ) {}

  // async insertProduct(newBasket: BasketDto): Promise<any> {
  //   return this.repository.save(newBasket);
  // }

  public async getProducts(): Promise<BasketBooks[]> {
    return this.repository.find();
  }

  async deleteProduct(basket_id: string): Promise<void> {
    await this.repository.delete(basket_id);
  }

 async insertBookInBasket(dto:BookDto): Promise<any>{
  // 1book
  // basket
// basket
const book = await this.booksService.getBook(dto.IBSN);

  const currentUser = RequestContextProvider.currentUser();

  const basket = new BasketBooks(book) 

  const basketBooks = new BasketBooks({book,basket});

  basketBooks.basket = basket;
  basketBooks.books =book

  const savedBasket = await this.repository.save(basket.books); 


  const basket1 = new Basket({basketId:basket.id, userId:currentUser.id})
  basket1.books.push(book)
  await this.repository.update(basket1.basketId, basket1)
  return savedBasket
 }

//  async create(addedBook: BookDto): Promise<Books> {
//   const book = new Books(addedBook);
//   return this.repository.save(book);
// }


  async deleteBooks(IBSN: string): Promise<void> {
    await this.repository.delete(IBSN);
  }
}

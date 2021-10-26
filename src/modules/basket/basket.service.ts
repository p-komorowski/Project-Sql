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
import { BasketBooksRepository } from "./repository/basket.repository";
import { BasketRepository } from "./repository/basketBooks.repository";



@Injectable()
export class BasketService {
  constructor(
    @InjectRepository(Basket)
    private readonly basketRepository: BasketRepository,
    @InjectRepository(BasketBooks)
    private readonly basketBooksRepository: BasketBooksRepository,
    private readonly booksService:BooksService
  ) {}

 

  public async getProducts(): Promise<BasketBooks[]> {
    return this.basketBooksRepository.find();
  }

  async deleteProduct(basket_id: string): Promise<void> {
    await this.basketRepository.delete(basket_id);
  }


  // public async getUserBasket(userId: string): Promise <Basket[]>{
  //   const basket = await this.basketBooksRepository.find({
  //     where:{
  //       userId: userId
  //     }
  //   })
  //    return basket
  //  }

 

 async insertBookInBasket(dto:BookDto): Promise<any>{
  const book = await this.booksService.getBook(dto.IBSN);
  const currentUser = RequestContextProvider.currentUser();

  const basketBooks = new BasketBooks();
  basketBooks.books = book
  basketBooks.quantity = 1

  const basket = new Basket();
  basket.user = currentUser;
  basket.basketBooks = [basketBooks]
  
  
  // const basketBooks = new BasketBooks({book,basket});
  // basketBooks.basket = basket;
  // basketBooks.books = book;

  // const savedBasket = await this.repository.save(basketBooks); 

  // const basket1 = new Basket({basketId:basket.id, userId:currentUser.id})
  // basket1.books.push(book)
 
  await this.basketRepository.save(basket)
  
 }


//  async createBasket(newBasket: BasketDto): Promise<any> {
//   return this.repository.save(newBasket);
// }

//  async deleteBooks(IBSN: string): Promise<void> {
//   await this.repository.delete(IBSN);
// }
//  async create(addedBook: BookDto): Promise<Books> {
//   const book = new Books(addedBook);
//   return this.repository.save(book);
// }


  // async getBasket(basketId:string): Promise<Basket>{
  //   const basket = await this.repository.findOne(basketId)
  //   return basket
  // }


  
}

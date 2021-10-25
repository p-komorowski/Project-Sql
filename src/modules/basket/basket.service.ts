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
import { BasketBooksRepository } from "./repository/basketBooks.repository";


@Injectable()
export class BasketService {
  constructor(
    @InjectRepository(BasketBooks)
    @InjectRepository(Basket)
    private readonly repository: BasketRepository,
    private readonly basketRepository: BasketBooksRepository,
    private readonly booksService:BooksService
  ) {}

 

  public async getProducts(): Promise<BasketBooks[]> {
    return this.repository.find();
  }

  async deleteProduct(basket_id: string): Promise<void> {
    await this.repository.delete(basket_id);
  }


  public async getUserBasket(userId: string): Promise <Basket[]>{
    const basket = await this.basketRepository.find({
      where:{
        userId: userId
      }
    })
     return basket
   }

 

 async insertBookInBasket(dto:BookDto): Promise<any>{
  const book = await this.booksService.getBook(dto.IBSN);

  const currentUser = RequestContextProvider.currentUser();

  const basket = new BasketBooks(book);
console.log(basket)
  const basketBooks = new BasketBooks({book,basket});
console.log(basketBooks)
  // basketBooks.basket = basket;
  // basketBooks.books = book;

  const savedBasket = await this.repository.save(basketBooks); 
  console.log(savedBasket)
  const basket1 = new Basket({basketId:basket.IBSN, userId:currentUser.id})
  basket1.books.push(book)
  await this.repository.update(basket1.basketId, basket1)
  return savedBasket
 }


//  async createBasket(newBasket: BasketDto): Promise<any> {
//   return this.repository.save(newBasket);
// }

 async deleteBooks(IBSN: string): Promise<void> {
  await this.repository.delete(IBSN);
}
//  async create(addedBook: BookDto): Promise<Books> {
//   const book = new Books(addedBook);
//   return this.repository.save(book);
// }


  // async getBasket(basketId:string): Promise<Basket>{
  //   const basket = await this.repository.findOne(basketId)
  //   return basket
  // }


  
}

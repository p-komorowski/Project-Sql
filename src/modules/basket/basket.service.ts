import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RequestContextProvider } from "../../middleware/request-context.middleware";
import { LoginDto } from "../auth/dto/login.dto";
import { BooksService } from "../book/book.service";
import { BookDto } from "../book/dto/book.dto";
import { Books } from "../book/entity/book.entity";
import { BooksRepository } from "../book/repository/books.repository";
import { User } from "../user/entities";
import { userRepository } from "../user/repository/user.repository";
import { UsersService } from "../user/user.service";
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
    @InjectRepository(userRepository)
    private readonly userRepository: userRepository,
    private readonly booksService:BooksService,
    private readonly userService: UsersService,
  ) {}

 

  public async getBasket(): Promise<Basket[]> {
    return this.basketRepository.find();
  }

  async deleteBasket(basket_id: BasketBooks): Promise<void> {
    await this.basketRepository.delete(basket_id);
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
  const user = await this.userRepository.findOne(currentUser.id);
 
  const findBasket = await this.basketRepository.find({relations: ["user"]})
  console.log(findBasket)

  if(!findBasket){
  let user1 = currentUser;
  await this.userRepository.save(user1)
  const basketBooks = new BasketBooks();
  basketBooks.books = book
  await this.basketBooksRepository.save(basketBooks)

  const basket = new Basket();
  basket.user = user1;
  basket.basketBooks = [basketBooks]

  await this.basketRepository.save(basket)
  
  } else {
    let newUser = currentUser;
    await this.userRepository.save(newUser)
    const newBasketBooks = new BasketBooks();
    newBasketBooks.books = book
    await this.basketBooksRepository.save(newBasketBooks)
  
    const basket = new Basket();
    basket.user = newUser;
    basket.basketBooks = [newBasketBooks]
  
    await this.basketRepository.save(basket)
  
  throw new Error("nie gotowe")
  }

  // let user1 = currentUser;
  // await this.userRepository.save(user1)
  // const basketBooks = new BasketBooks();
  // basketBooks.books = book
  // await this.basketBooksRepository.save(basketBooks)

  // const basket = new Basket();
  // basket.user = user1;
  // basket.basketBooks = [basketBooks]

  // await this.basketRepository.save(basket)
 }



  async getUser(user:LoginDto): Promise<User>{
    const user1 = await this.userService.findById(user)
    console.log(user1)
    return user1
  }
  
}

import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RequestContextProvider } from "../../middleware/request-context.middleware";
import { LoginDto } from "../auth/dto/login.dto";
import { BooksService } from "../book/book.service";
import { BookDto } from "../book/dto/book.dto";
import { User } from "../user/entities";
import { userRepository } from "../user/repository/user.repository";
import { UsersService } from "../user/user.service";
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
    private readonly booksService: BooksService,
    private readonly userService: UsersService
  ) {}

  public async getBasket(): Promise<Basket[]> {
    return this.basketRepository.find();
  }

  async deleteBasket(basket_id: BasketBooks): Promise<void> {
    await this.basketRepository.delete(basket_id);
  }

  public async getBasketForUser(user: User): Promise<Basket> {
    const userWithRelations = await this.userRepository.findOne({
      where: {
        id: user.id,
      },
      relations: ["basket"],
    });
    return userWithRelations.basket;
  }

  async insertBookInBasket(dto: BookDto): Promise<any> {
    const book = await this.booksService.getBook(dto.IBSN);
    const currentUser = RequestContextProvider.currentUser();

    let basket = null;
    const userWithRelations = await this.userRepository.findOne({
      where: {
        id: currentUser.id,
      },
      relations: ["basket"],
    });
    basket = userWithRelations.basket;
    if (!basket) {
      basket = new Basket();
      basket.user = currentUser;

    }
    
    let ibsn = book.IBSN;
    let bid = basket.id;

    const items = await this.basketBooksRepository
      .createQueryBuilder("basketBooks")
      .leftJoinAndSelect("basketBooks.basket", "basket")
      .leftJoinAndSelect("basketBooks.books", "books")
      .where('basketBooks.books = :booksId', { ibsn })
      .andWhere('basketBooks.basket = :basketId', { bid })
      .getParameters();
    if(items){
      throw new UnauthorizedException("book already in basket")
    }
    const basketBooks = new BasketBooks();
    basketBooks.books = book;
    basketBooks.count = 1;
    await this.basketBooksRepository.save(basketBooks);

    basket.basketBooks = [basketBooks];

    await this.basketRepository.save(basket);
  }

  async getUser(user: LoginDto): Promise<User> {
    const user1 = await this.userService.findById(user);
    console.log(user1);
    return user1;
  }
}

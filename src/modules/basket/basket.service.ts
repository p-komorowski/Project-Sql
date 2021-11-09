import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RequestContextProvider } from '../../middleware/request-context.middleware';
import { LoginDto } from '../auth/dto/login.dto';
import { BooksService } from '../book/book.service';
import { BookDto } from '../book/dto/book.dto';
import { Customer } from '../user/entities';
import { UserRepository } from '../user/repository/user.repository';
import { UsersService } from '../user/user.service';
import { BasketBookDto } from './dto/basket-book.dto';
import { BasketBook, Basket } from './entities/index';
import { BasketBooksRepository } from './repository/basket.repository';
import { BasketRepository } from './repository/basket-books.repository';

@Injectable()
export class BasketService {
  constructor(
    @InjectRepository(Basket)
    private readonly basketRepository: BasketRepository,
    @InjectRepository(BasketBook)
    private readonly basketBooksRepository: BasketBooksRepository,
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly booksService: BooksService,
    private readonly userService: UsersService,
  ) {}

  public async getBasket(): Promise<Basket[]> {
    return this.basketRepository.find();
  }

  async deleteBookFromBasket(IBSN: string): Promise<void> {
    const currentUser = RequestContextProvider.currentUser();
    const userBasket = await this.getBasketForUser(currentUser);
    if (!userBasket) {
      throw new UnauthorizedException(
        'cannot delete because user did not have a basket',
      );
    }
    const basketBook = await this.getBasketBookForBasket(IBSN, userBasket.id);
    if (!basketBook) {
      throw new UnauthorizedException(
        'cannot delete because there is no such book in user basket',
      );
    }
    await this.basketBooksRepository.remove(basketBook);
  }

  async getBasketForUser(user: Customer): Promise<Basket> {
    const userWithRelations = await this.userRepository.findOne({
      where: {
        id: user.id,
      },
      relations: ['basket'],
    });
    return userWithRelations.basket;
  }

  async getBasketBookForBasket(
    IBSN: string,
    basketId: string,
  ): Promise<BasketBook> {
    return this.basketBooksRepository
      .createQueryBuilder('basketBook')
      .leftJoinAndSelect('basketBook.book', 'book')
      .where('book.IBSN = :IBSN', { IBSN: IBSN })
      .andWhere('basketBook.basketId = :bId', { bId: basketId })
      .getOne();
  }

  async insertBookInBasket(dto: BookDto): Promise<any> {
    const book = await this.booksService.getBook(dto.IBSN);
    const currentUser = RequestContextProvider.currentUser();
    let basket = null;
    const userWithRelations = await this.userRepository.findOne({
      where: {
        id: currentUser.id,
      },
      relations: ['basket'],
    });

    basket = userWithRelations.basket;
    if (!basket) {
      basket = new Basket();
      basket.customer = currentUser;
      await this.basketRepository.save(basket);
    }
    const basketBookWithThisBook = await this.getBasketBookForBasket(
      book.IBSN,
      basket.id,
    );
    if (basketBookWithThisBook) {
      throw new UnauthorizedException('book already in basket');
    }
    await this.basketBooksRepository.save({
      book: book,
      count: 1,
      basket: basket,
    });
  }

  async getBooksInUserBasket(): Promise<BasketBook[]> {
    const user = RequestContextProvider.currentUser();
    const userBasket = await this.getBasketForUser(user);
    const userBasketBooks = await this.basketBooksRepository.find({
      relations: ['book', 'basket'],
      where: {
        basket: userBasket,
      },
    });
    return userBasketBooks;
  }

  async getUser(user: LoginDto): Promise<Customer> {
    const user1 = await this.userService.findById(user);
    return user1;
  }

  async getUserById(id: number): Promise<Customer> {
    return this.userRepository.findOne(id);
  }

  async updateCountOfBookInBasket(
    IBSN: string,
    count: BasketBookDto,
  ): Promise<BasketBook> {
    const currentUser = RequestContextProvider.currentUser();
    const userBasket = await this.getBasketForUser(currentUser);
    if (!userBasket) {
      throw new UnauthorizedException(
        'cannot update because user did not have a basket',
      );
    }
    const basketBook = await this.getBasketBookForBasket(IBSN, userBasket.id);
    if (!basketBook) {
      throw new UnauthorizedException(
        'cannot update because there is no such book in user basket',
      );
    }
    await this.basketBooksRepository.update(basketBook.id, count);
    return basketBook;
  }
}

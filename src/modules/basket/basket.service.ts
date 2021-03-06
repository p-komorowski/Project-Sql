import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { RequestContextProvider } from '../../middleware/request-context.middleware';
import { LoginDto } from '../auth/dto/index';
import { BooksService } from '../book/book.service';
import { BookDto } from '../book/dto/index';
import { UserResponseDto } from '../user/dto/user-response.dto';
import { Customer } from '../user/entities';
import { UserRepository } from '../user/repository/user.repository';
import { UsersService } from '../user/user.service';
import { BasketBookDto } from './dto/index';
import { BasketBook, Basket } from './entities';
import { BasketBooksRepository } from './repository/basket-books.repository';
import { BasketRepository } from './repository/basket.repository';

@Injectable()
export class BasketService {
  constructor(
    @InjectRepository(Basket)
    private readonly basketRepository: BasketRepository,
    @InjectRepository(BasketBook)
    private readonly basketBooksRepository: BasketBooksRepository,
    @InjectRepository(Customer)
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
      throw new BadRequestException(
        'cannot delete because user did not have a basket',
      );
    }
    const basketBook = await this.getBasketBookForBasket(IBSN, userBasket.id);
    if (!basketBook) {
      throw new BadRequestException(
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

  async insertBookInBasket(dto: BookDto): Promise<BasketBook> {
    const book = await this.booksService.getBook(dto.IBSN);

    const currentUser = RequestContextProvider.currentUser();

    const userWithRelations = await this.userRepository.findOne({
      where: {
        id: currentUser.id,
      },
      relations: ['basket'],
    });

    let basket = userWithRelations.basket;
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
      throw new BadRequestException('book already in basket');
    }
    return this.basketBooksRepository.save({
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

  async getUser(user: LoginDto): Promise<UserResponseDto> {
    const result = await this.userService.findById(user);
    return plainToClass(UserResponseDto, result);
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
      throw new BadRequestException(
        'cannot update because user did not have a basket',
      );
    }
    const basketBook = await this.getBasketBookForBasket(IBSN, userBasket.id);
    if (!basketBook) {
      throw new BadRequestException(
        'cannot update because there is no such book in user basket',
      );
    }

    basketBook.count = count.count;
    return this.basketBooksRepository.save(basketBook);
  }
}

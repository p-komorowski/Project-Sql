import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksService } from '../book/book.service';
import { Book } from '../book/entity/book.entity';
import { BooksRepository } from '../book/repository/book.repository';
import { OrderService } from '../order/order.service';
import { OrderRepository } from '../order/repository/order.repository';
import { UserRepository } from '../user/repository/user.repository';
import { UsersService } from '../user/user.service';
import { BasketController } from './basket.controller';
import { BasketService } from './basket.service';
import { Basket } from './entities/basket.entity';
import { BasketBook } from './entities/basket-book.entity';
import { BasketBooksRepository } from './repository/basket.repository';
import { BasketRepository } from './repository/basket-books.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BasketBook,
      Basket,
      Book,
      BasketBooksRepository,
      BasketRepository,
      UserRepository,
    ]),
  ],
  providers: [
    BasketService,
    BasketRepository,
    BooksRepository,
    BooksService,
    BasketBooksRepository,
    UsersService,
    OrderService,
    OrderRepository,
  ],
  controllers: [BasketController],
})
export class BasketModule {}

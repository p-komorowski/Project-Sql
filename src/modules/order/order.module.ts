import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BasketService } from '../basket/basket.service';
import { Basket } from '../basket/entities/basket.entity';
import { BasketBook } from '../basket/entities/basket-book.entity';
import { BooksService } from '../book/book.service';
import { Book } from '../book/entity/book.entity';
import { BooksRepository } from '../book/repository/book.repository';
import { UserRepository } from '../user/repository/user.repository';
import { UsersService } from '../user/user.service';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderRepository } from './repository/order.repository';
import { BasketBooksRepository } from '../basket/repository/basket-books.repository';
import { BasketRepository } from '../basket/repository/basket.repository';
import { entities } from '../../config';
@Module({
  imports: [
    TypeOrmModule.forFeature(entities),
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
  controllers: [OrderController],
})
export class OrderModule {}

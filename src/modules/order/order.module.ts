import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BasketService } from '../basket/basket.service';
import { BooksService } from '../book/book.service';
import { BooksRepository } from '../book/repository/book.repository';
import { UsersService } from '../user/user.service';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderRepository } from './repository/order.repository';
import { BasketBooksRepository } from '../basket/repository/basket-books.repository';
import { BasketRepository } from '../basket/repository/basket.repository';
import { entities } from '../../config';
import { PriceHistoryRepository } from '../book/repository/price-history.repostiory';
@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  providers: [
    BasketService,
    BasketRepository,
    BooksRepository,
    BooksService,
    BasketBooksRepository,
    UsersService,
    OrderService,
    OrderRepository,
    PriceHistoryRepository,
  ],
  controllers: [OrderController],
})
export class OrderModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BasketRepository } from '../../../modules/basket/repository/basket.repository';
import { BasketController } from '../../../modules/basket/basket.controller';
import { BasketService } from '../../../modules/basket/basket.service';
import { Basket, BasketBook } from '../../../modules/basket/entities';
import { BooksService } from '../../../modules/book/book.service';
import { BooksRepository } from '../../../modules/book/repository/book.repository';
import { Book } from '../../../modules/book/entity/book.entity';
import { BasketModule } from '../../../modules/basket/basket.module';
import { OrderModule } from '../../../modules/order/order.module';
import { Order } from '../../../modules/order/entity';
import { OrderService } from '../../../modules/order/order.service';

@Module({
  imports: [
    BooksRepository,
    BasketModule,
    OrderModule,
    OrderService,
    TypeOrmModule.forFeature([
      Basket,
      OrderModule,
      BasketBook,
      Order,
      Book,
      BasketRepository,
    ]),
  ],
  providers: [
    OrderService,
    BooksService,
    BasketService,
    BasketRepository,
    OrderModule,
  ],
  controllers: [BasketController],
})
export class TestAppModule {}

import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BooksService } from "../book/book.service";
import { Books } from "../book/entity/book.entity";
import { BooksRepository } from "../book/repository/books.repository";
import { BasketController } from "./basket.controller";
import { BasketService } from "./basket.service";
import { Basket } from "./entities/basket.entity";
import { BasketBooks } from "./entities/basket_book.entity";
import { BasketBooksRepository } from "./repository/basket.repository";
import { BasketRepository } from "./repository/basketBooks.repository";


@Module({
  imports: [TypeOrmModule.forFeature([BasketBooks,Basket,Books,BasketBooksRepository,BasketRepository])],
  providers: [BasketService, BasketRepository,BooksRepository,BooksService,BasketBooksRepository],
  controllers: [BasketController],
})
export class BasketModule {}

import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BooksService } from "../book/book.service";
import { BooksRepository } from "../book/repository/books.repository";
import { BasketController } from "./basket.controller";
import { BasketService } from "./basket.service";
import { BasketBooks } from "./entities/basket_book.entity";
import { BasketRepository } from "./repository/basket.repository";
import { BasketBooksRepository } from "./repository/basketBooks.repository";

@Module({
  imports: [TypeOrmModule.forFeature([BasketBooks])],
  providers: [BasketService, BasketRepository,BooksRepository,BooksService,BasketBooksRepository],
  controllers: [BasketController],
})
export class BasketModule {}

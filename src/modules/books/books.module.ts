import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BooksService } from "../books/books.service";
import { Books } from "../books/books_entity/books.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Books])],
  providers: [BooksService],
})
export class BooksModule {}

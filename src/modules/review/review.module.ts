import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from '../../config';
import { BooksController } from '../book/book.controller';
import { BooksService } from '../book/book.service';
import { BooksRepository } from '../book/repository/book.repository';
import { UserModule } from '../user/user.module';
import { ReviewRepository } from './repository/review.repository';

@Module({
  imports: [TypeOrmModule.forFeature(entities), UserModule],
  controllers: [BooksController],
  providers: [BooksService, BooksRepository, ReviewRepository],
})
export class BooksModule {}

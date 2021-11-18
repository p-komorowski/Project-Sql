import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksService } from './book.service';
import { entities } from '../../config';
import { BooksRepository } from './repository/book.repository';
import { UserModule } from '../user/user.module';
import { BooksController } from './book.controller';
import { ReviewService } from '../review/review.service';
import { ReviewRepository } from '../review/repository/review.repository';

@Module({
  imports: [TypeOrmModule.forFeature(entities), UserModule],
  controllers: [BooksController],
  providers: [BooksService, BooksRepository, ReviewService, ReviewRepository],
})
export class BooksModule {}

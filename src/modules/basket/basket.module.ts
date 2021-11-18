import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksService } from '../book/book.service';
import { UsersService } from '../user/user.service';
import { BasketController } from './basket.controller';
import { BasketService } from './basket.service';

import { entities } from '../../config';
@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  providers: [BooksService, UsersService, BasketService],
  controllers: [BasketController],
})
export class BasketModule {}

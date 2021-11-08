import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksService } from './book.service';
import { entities } from '../../config';
import { BooksRepository } from './repository/book.repository';
import { UserModule } from '../user/user.module';
import { BooksController } from './book.controller';

@Module({
    imports: [TypeOrmModule.forFeature(entities), UserModule],
    controllers: [BooksController],
    providers: [BooksService, BooksRepository],
})
export class BooksModule {}

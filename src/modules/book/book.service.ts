import { Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { BooksRepository } from './repository/book.repository';
import { Book } from './entity/book.entity';
import { BookDto } from './dto/book.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BooksService {
  logger: Logger;
  constructor(
    @InjectRepository(Book)
    private readonly booksRepository: BooksRepository,
  ) {
    this.logger = new Logger(BooksService.name);
  }
  async insertProduct(newProduct: BookDto): Promise<Book> {
    return this.booksRepository.save(newProduct);
  }

  public async getProducts(page: number = 1, take: number): Promise<Book[]> {
    return this.booksRepository.find({
      relations: ['review'],
      take: take,
      skip: take * (page - 1),
    });
  }

  public async getBook(IBSN: string): Promise<Book> {
    this.logger.debug(`[getBook] start fetching for a book with id: ${IBSN}`);
    const book = await this.booksRepository.findOne({
      relations: ['review'],
      where: {
        IBSN: IBSN,
      },
    });
    if (!book) {
      throw new UnauthorizedException('cannot find book');
    }
    return book;
  }

  async changePriceOfBook(IBSN: string, price: number) {
    const book = await this.getBook(IBSN);
    if (!book) {
      throw new NotFoundException('book does not exist');
    }

    return this.booksRepository.save({ ...book, price: price });
  }

  async deleteProduct(IBSN: string): Promise<void> {
    await this.booksRepository.delete(IBSN);
  }
}

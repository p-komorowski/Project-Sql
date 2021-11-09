import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { BooksRepository } from './repository/book.repository';
import { Book } from './entity/book.entity';
import { Connection } from 'typeorm';
import { BookDto } from './dto/book.dto';

@Injectable()
export class BooksService {
  logger: Logger;
  private booksRepository: BooksRepository;
  constructor(private readonly connection: Connection) {
    this.booksRepository = this.connection.getCustomRepository(BooksRepository);
    this.logger = new Logger(BooksService.name);
  }

  async insertProduct(newProduct: BookDto): Promise<Book> {
    return this.booksRepository.save(newProduct);
  }

  public async getProducts(page: number = 1, take: number): Promise<Book[]> {
    return this.booksRepository.find({
      relations: ['review'],
      take: take,
      skip: 2 * (page - 1),
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
      throw new UnauthorizedException('book does not exist');
    }
    book.price = price;

    return this.booksRepository.save(book);
  }

  async deleteProduct(IBSN: string): Promise<void> {
    await this.booksRepository.delete(IBSN);
  }
}

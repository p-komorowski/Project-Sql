import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { BooksRepository, PriceHistoryRepository } from './repository/index';
import { Book, PriceHistory } from './entities';
import { BookDto, BookResponseDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';

@Injectable()
export class BooksService {
  logger: Logger;
  constructor(
    @InjectRepository(Book)
    private readonly booksRepository: BooksRepository,
    @InjectRepository(PriceHistory)
    private readonly priceHistoryRepostiory: PriceHistoryRepository,
  ) {
    this.logger = new Logger(BooksService.name);
  }
  async insertProduct(newProduct: BookDto): Promise<Book> {
    return this.booksRepository.save(newProduct);
  }

  public async getProducts(
    page: number = 1,
    take: number,
  ): Promise<BookResponseDto[]> {
    const result = await this.booksRepository.find({
      relations: ['review', 'priceHistory'],
      take: take,
      skip: take * (page - 1),
    });

    return plainToClass(BookResponseDto, result);
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
      throw new BadRequestException('cannot find book');
    }
    return book;
  }

  async changePriceOfBook(IBSN: string, price: number) {
    const book = await this.getBook(IBSN);
    if (!book) {
      throw new NotFoundException('book does not exist');
    }

    if (book.price == price) {
      throw new BadRequestException('cannot update when price is the same');
    }

    this.priceHistoryRepostiory.save({
      IBSN: IBSN,
      previousPrice: book.price,
      currentPrice: price,
      book: book,
    });
    return this.booksRepository.save({ ...book, price: price });
  }

  async deleteProduct(IBSN: string): Promise<void> {
    await this.booksRepository.delete(IBSN);
  }
}

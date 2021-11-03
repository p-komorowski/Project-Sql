import { Injectable, UnauthorizedException } from "@nestjs/common";
import { BooksRepository } from "./repository/book.repository";
import { Book } from "./entity/book.entity";
import { Connection } from "typeorm";
import { BookDto } from "./dto/book.dto";
import { ReviewRepository } from "../review/repository/review.repository";
import { ReviewDto } from "../review/dto/review.dto";

@Injectable()
export class BooksService {
  private booksRepository: BooksRepository;
  private reviewRepository: ReviewRepository;
  constructor(private readonly connection: Connection) {
    this.booksRepository = this.connection.getCustomRepository(BooksRepository);
    this.reviewRepository =
      this.connection.getCustomRepository(ReviewRepository);
  }

  async insertProduct(newProduct: BookDto): Promise<Book> {
    return this.booksRepository.save(newProduct);
  }

  public async getProducts(): Promise<Book[]> {
    return this.booksRepository.find({
      relations: ["review"],
    });
  }

  public async getBook(IBSN: string): Promise<Book> {
    const book = await this.booksRepository.findOne({
      relations: ["review"],
      where: {
        IBSN: IBSN,
      },
    });
    if (!book) {
      throw new UnauthorizedException("cannot find book");
    } else {
      return book;
    }
  }

  async addReviewToBook(dto: ReviewDto) {
    const book = await this.getBook(dto.IBSN);
    if (!book) {
      throw new UnauthorizedException("book does not exist");
    }

    const newReview = await this.reviewRepository.create({
      review: dto.review,
    });
    newReview.book = book;

    return await this.reviewRepository.save(newReview);
  }

  async changePriceOfBook(IBSN: string, price: number) {
    const book = await this.getBook(IBSN);
    if (!book) {
      throw new UnauthorizedException("book does not exist");
    }
    book.price = price;

    return await this.booksRepository.save(book);
  }

  async deleteProduct(IBSN: string): Promise<void> {
    await this.booksRepository.delete(IBSN);
  }

  async deleteReview(id: string): Promise<void> {
    await this.reviewRepository.delete(id);
  }
  
}

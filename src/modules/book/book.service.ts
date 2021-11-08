import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { BooksRepository } from './repository/book.repository';
import { Book } from './entity/book.entity';
import { Connection } from 'typeorm';
import { BookDto } from './dto/book.dto';
import { ReviewRepository } from '../review/repository/review.repository';
import { ReviewDto } from '../review/dto/review.dto';
import { Review } from '../review/entity/review.entity';

@Injectable()
export class BooksService {
    logger: Logger;
    private booksRepository: BooksRepository;
    private reviewRepository: ReviewRepository;
    constructor(private readonly connection: Connection) {
        this.booksRepository =
            this.connection.getCustomRepository(BooksRepository);
        this.reviewRepository =
            this.connection.getCustomRepository(ReviewRepository);
        this.logger = new Logger(BooksService.name);
    }

    async insertProduct(newProduct: BookDto): Promise<Book> {
        return this.booksRepository.save(newProduct);
    }

    public async getProducts(page: number = 1): Promise<Book[]> {
        return this.booksRepository.find({
            relations: ['review'],
            take: 5,
            skip: 2 * (page - 1),
        });
    }

    public async getBook(IBSN: string): Promise<Book> {
        this.logger.debug(
            `[getBook] start fetching for a book with id: ${IBSN}`,
        );
        const book = await this.booksRepository.findOne({
            relations: ['review'],
            where: {
                IBSN: IBSN,
            },
        });
        if (!book) {
            throw new UnauthorizedException('cannot find book');
        } else {
            return book;
        }
    }

    async addReviewToBook(dto: ReviewDto) {
        const book = await this.getBook(dto.IBSN);
        if (!book) {
            throw new UnauthorizedException('book does not exist');
        }

        const newReview = await this.reviewRepository.create({
            review: dto.review,
        });
        newReview.book = book;

        return this.reviewRepository.save(newReview);
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

    async deleteReviews(IBSN: string, review_ids: string[]): Promise<Review[]> {
        const reviews = await this.reviewRepository
            .createQueryBuilder('review')
            .where('review.id IN (:...review)', { review: review_ids })
            .andWhere('review.bookIBSN = :IBSN', { IBSN: IBSN })
            .getMany();

        return this.reviewRepository.remove(reviews);
    }
}

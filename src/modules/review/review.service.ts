import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Connection } from 'typeorm';
import { BooksService } from '../book/book.service';
import { ReviewDto } from './dto/review.dto';
import { Review } from './entity/review.entity';
import { ReviewRepository } from './repository/review.repository';

@Injectable()
export class ReviewService {
    constructor(
        private bookService: BooksService,
        private reviewRepository: ReviewRepository,
        private readonly connection: Connection,
    ) {
        this.reviewRepository =
            this.connection.getCustomRepository(ReviewRepository);
    }

    async deleteReviews(IBSN: string, review_ids: string[]): Promise<Review[]> {
        const reviews = await this.reviewRepository
            .createQueryBuilder('review')
            .where('review.id IN (:...review)', { review: review_ids })
            .andWhere('review.bookIBSN = :IBSN', { IBSN: IBSN })
            .getMany();

        return this.reviewRepository.remove(reviews);
    }

    async addReviewToBook(dto: ReviewDto) {
        const book = await this.bookService.getBook(dto.IBSN);
        if (!book) {
            throw new UnauthorizedException('book does not exist');
        }

        const newReview = await this.reviewRepository.create({
            review: dto.review,
        });
        newReview.book = book;

        return this.reviewRepository.save(newReview);
    }
}

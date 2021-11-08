import { UnauthorizedException } from '@nestjs/common';
import { BooksService } from 'src/modules/book/book.service';
import { EntityRepository, Repository } from 'typeorm';
import { ReviewDto } from '../dto/review.dto';
import { Review } from '../entity/review.entity';

@EntityRepository(Review)
export class ReviewRepository extends Repository<Review> {
    bookService: BooksService;
    async addReviewToBook(dto: ReviewDto) {
        const book = await this.bookService.getBook(dto.IBSN);
        if (!book) {
            throw new UnauthorizedException('book does not exist');
        }

        const newReview = await this.create({
            review: dto.review,
        });
        newReview.book = book;

        return this.save(newReview);
    }

    async deleteReview(id: string): Promise<void> {
        await this.delete(id);
    }
}

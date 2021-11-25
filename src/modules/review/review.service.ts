import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BooksService } from '../book/book.service';
import { ReviewDto } from './dto/review.dto';
import { Review } from './entity/review.entity';
import { ReviewRepository } from './repository/review.repository';

@Injectable()
export class ReviewService {
  constructor(
    private bookService: BooksService,
    @InjectRepository(Review)
    private readonly reviewRepository: ReviewRepository,
  ) {}

  async deleteReviews(IBSN: string, review_ids: string[]): Promise<void> {
    await this.reviewRepository
      .createQueryBuilder('review')
      .delete()
      .from('review')
      .andWhere('review.bookIBSN = :IBSN', { IBSN: IBSN })
      .where('review.id IN (:...review)', { review: review_ids })
      .execute();
  }

  async addReviewToBook(dto: ReviewDto): Promise<Review> {
    const book = await this.bookService.getBook(dto.IBSN);
    if (!book) {
      throw new UnauthorizedException('book does not exist');
    }

    const newReview = await this.reviewRepository.create({
      review: dto.review,
    });
    newReview.book = book;

    return this.reviewRepository.save({
      ...newReview,
      book,
    });
  }
}

import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { ReviewResponseDto } from '../../../modules/review/dto/review-response.dto';
import { PriceHistoryResponseDto } from './price-history-response.dto';

@Exclude()
export class BookResponseDto {
  @Expose()
  @ApiProperty({ type: String, description: 'IBSN' })
  IBSN: string;

  @Expose({ name: 'title' })
  @ApiProperty({ type: String, description: 'Title of book' })
  Title: string;

  @Expose({ name: 'price' })
  @ApiProperty({ type: Number, description: 'Number of book' })
  Price: number;

  @Expose({ name: 'author' })
  @ApiProperty({ type: String, description: 'Author of book' })
  Author: string;

  @Expose({ name: 'count' })
  @ApiProperty({ type: Number, description: 'Count of book' })
  Count: number;

  @Expose({ name: 'review' })
  @ApiProperty({ type: ReviewResponseDto, description: 'Review response' })
  @Type(() => ReviewResponseDto)
  BookReview: ReviewResponseDto;

  @Expose({ name: 'priceHistory' })
  @ApiProperty({ type: PriceHistoryResponseDto, description: 'Price history response' })
  @Type(() => PriceHistoryResponseDto)
  PriceHistory: PriceHistoryResponseDto;
}

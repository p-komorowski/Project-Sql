import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { ReviewResponseDto } from '../../../modules/review/dto';
import { PriceHistoryResponseDto } from './index';

@Exclude()
export class BookResponseDto {
  @Expose()
  @ApiProperty({ type: String, description: 'IBSN' })
  IBSN: string;

  @Expose({ name: 'title' })
  @ApiProperty({ type: String, description: 'Title of book' })
  title: string;

  @Expose({ name: 'price' })
  @ApiProperty({ type: Number, description: 'Number of book' })
  price: number;

  @Expose({ name: 'author' })
  @ApiProperty({ type: String, description: 'Author of book' })
  author: string;

  @Expose({ name: 'count' })
  @ApiProperty({ type: Number, description: 'Count of book' })
  count: number;

  @Expose({ name: 'review' })
  @ApiProperty({ type: ReviewResponseDto, description: 'Review response' })
  @Type(() => ReviewResponseDto)
  bookReview: ReviewResponseDto;

  @Expose({ name: 'priceHistory' })
  @ApiProperty({ type: PriceHistoryResponseDto, description: 'Price history response' })
  @Type(() => PriceHistoryResponseDto)
  priceHistory: PriceHistoryResponseDto;
}

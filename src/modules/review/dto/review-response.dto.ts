import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ReviewResponseDto {
  @Expose({ name: 'id' })
  @ApiProperty({ type: String, description: 'ID of review' })
  ReviewID: string;

  @Expose({ name: 'review' })
  @ApiProperty({ type: String, description: 'Review of book' })
  Review: string;
}

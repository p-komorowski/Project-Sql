import { Exclude, Expose } from 'class-transformer';
import { IsArray, IsString } from 'class-validator';

@Exclude()
export class DeleteReviewDto {
  @Expose()
  @IsArray()
  review_ids: string[];
}

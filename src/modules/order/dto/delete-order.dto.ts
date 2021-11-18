import { Exclude, Expose } from 'class-transformer';
import { IsArray, IsString } from 'class-validator';

@Exclude()
export class DeleteReviewDto {
  @Expose()
  @IsArray()
  @IsString({ each: true })
  reviewIds: string[];
}

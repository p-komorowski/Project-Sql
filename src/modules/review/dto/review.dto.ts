import { Exclude, Expose } from 'class-transformer';
import { IsString } from 'class-validator';

@Exclude()
export class ReviewDto {
    @Expose()
    @IsString()
    review: string;

    @Expose()
    @IsString()
    IBSN: string;
}
